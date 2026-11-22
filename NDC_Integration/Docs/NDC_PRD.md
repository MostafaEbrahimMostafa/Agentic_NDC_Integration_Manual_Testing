# NDC Flight Engine Test Automation Framework — Product Requirements Document

## 1. Executive Summary

This framework is a Java/TestNG/RestAssured test automation suite that exercises the NDC Flight Engine's full airline-booking lifecycle — **Search → FareConfirm → Bundle/Upsell → AddPax → Book/Hold → Retrieve → Void** — against 38 supplier/agency test-data targets and two parallel API contract versions (V1 legacy, V2 current), selectable per JVM run via `-Dagency` and `-DapiVersion` (`TestDataHelper.java:72,82`, `config.properties`). It exists to catch two classes of risk that manual testing cannot cover economically: (1) booking-flow regressions in any one of dozens of supplier integrations, and (2) behavioral drift between the V1 and V2 API contracts as both are maintained in parallel (`EndpointResolver.java` — every endpoint has a distinct V1/V2 path, e.g. `api/FlightSearch/Search` vs `api/v2/FlightSearch/Search`). The framework runs one supplier per JVM/test execution (agency is a single resolved static value, not a loop over suppliers), which is a deliberate design constraint rooted in the shared static state architecture described in Section 5.

> **Update 2026-11-12 — scope extension to the NDC API Integration itself.** Sections 1–11 (Part I) describe the Java automation framework. **Part II (Sections 12–20)** was added from an analysis of the companion manual/API QA repository: `NDC_Integration/SPEC.md`, the V1/V2 and supplier Postman collections, 23 test-case CSVs, the run logs and bug reports under `NDC_Integration/Artifacts/`, and the user-story analyses. It documents the API under test: its real endpoint surface (now 20 routes, not 11), environments, live-confirmed supplier capabilities, contract behaviour, cross-supplier defects and in-flight features. Where Part II contradicts Part I, Part II reflects later, live-observed evidence (see §20).

## 2. Problem Statement

Without this framework, validating a single booking-flow change requires manually re-running the 7-step chain (Search/FareConfirm/Bundle/AddPax/Book-or-Hold/Retrieve/Void) against each of ~38 supplier targets, in both V1 and V2, across up to 9 environments (`config.properties` lines 38-47, plus `TestDataHelper.Environment` enum listing STG/STG8/STG3/INT3/local/STG5/UAT/AutoSTG/PROD/release/ndcWtStaging — 11 named environments total). Two concrete risk classes this framework targets:

-   **Supplier regression risk**: each supplier integration has distinct capabilities (bundle support, hold-vs-direct-book, ancillary types) encoded per-scenario in test-data JSON (`hasBundle`, `bookingFlow`, `hasSeatMap`/`hasAncillary` fields consumed in `BaseAirlineTest.runSearchAndStash`, lines 1309-1365). A change to shared orchestration code (`PerformAPIsAssertions.java`) risks silently breaking a subset of suppliers whose flow branches differently (e.g. `canBeHeldFalseSuppliers` must skip Hold entirely).
-   **V1/V2 contract drift risk**: `ACTIVE_API_VERSION` changes which endpoint path is hit for every one of the 11 endpoints (Search, FareConfirm, Bundle, Upsell, AddPax, Ancillary, SeatMap, Book, Hold, BookAfterHold, FareConfirmAfterHold, Retrieve, Void, CancelAfterHold) and changes runtime behavior — V1 skips AddPax entirely and routes FareConfirm output directly to booking (`BaseAirlineTest.registerDirectBookingFlowForV1`, lines 571-584; `isV1Execution()` branches in `runFareConfirmFlow` and `runBundleFlow`). A V1-only code path bug would not surface unless the suite is explicitly run with `-DapiVersion=V1`.
-   **Booking-state correctness risk**: bookings that reach `SUCCESS` must be independently retrievable (`Retrieve`) and cancellable/voidable, and price totals reported by the API must reconcile against the passenger-fare-breakdown the API itself returned (`ValidatorHelper.calculateTotalAmountForPaxBigDecimal`, referenced throughout `PerformAPIsAssertions`) — a class of bug that only surfaces by chaining real API responses together, not by unit-testing any single endpoint in isolation.

## 3. Goals & Non-Goals

**Goals (grounded in current code):**

-   Validate the 7-step NDC booking chain end-to-end per supplier, per API version, per environment, with soft-assertion business-rule checks at every step (`PerformAPIsAssertions.AssertionFlags`, one boolean switch per endpoint).
-   Support both direct-Book and Hold→FareConfirmAfterHold→BookAfterHold branches, plus a separate CancelHold terminal branch, driven by a `bookingFlow` field in test data (`book`/`holdbook`/`cancelhold`) rather than per-supplier hardcoding.
-   Support supplier-conditional enrichment steps — Bundle, Upsell, PreSeatMap, GetAncillary — each independently toggled per scenario (`hasBundle`, `hasUpsell`, `hasSeatMap`, `hasAncillary` flags) and gated so booking waits for all enabled enrichments (`routePostAddPaxEnrichmentCandidate`, `BaseAirlineTest.java:645-669`).
-   Validate negative/error-path handling per endpoint (Search, FareConfirm, AddPax, Book, Hold, Bundle, Upsell) via a dedicated `NegativeScenarioTest` class and per-endpoint negative payload folders.
-   Produce ExtentReports HTML output and SLF4J/Logback file logs per run, with correlation-ID tracing threaded through failures for supplier support escalation.

**Non-Goals (inferred from what the code does *not* do — not stated as a formal charter anywhere in the repo):**

-   **Load/performance testing**: no throughput, concurrency-ramp, or latency-SLA assertions exist anywhere in the assertion classes; `response.getTime()` is logged (`PerformAPIsAssertions.logRequestCompletion`) but never asserted against a threshold.
-   **Security testing**: no auth-bypass, injection, or fuzzing test paths exist; the framework's own credential handling is flagged as tech debt (Section 7/8), not hardened.
-   **Multi-supplier-in-one-run comparison**: despite `AllSuppliersBook`/`AllSuppliersHold` TestData folders existing, no corresponding `AllSuppliersTests.java` test class exists in the current tree (only `OneSupplierTest`, `SelectedOneSupplierTest`, `NegativeTest` packages exist per the Glob results) — the framework validates one configured supplier per JVM run, not a fan-out across all suppliers in a single execution.
-   **UI/front-end testing**: this is a pure API framework (RestAssured only); no browser driver dependency exists in `pom.xml`.

## 4. Current Scope & Capabilities

### 4.1 Supplier/Agency Coverage

`src/test/resources/TestData/` contains **50 top-level directories**. After excluding directories that are demonstrably framework/shared-data folders, not suppliers — `AllSuppliersBook`, `AllSuppliersHold`, `FareConfirmResponses`, `NegativeAddPax`, `NegativeBook`, `NegativeBundle.Bundle`, `NegativeFareConfirm`, `NegativeHold`, `NegativeSearch`, `NegativeUpsell`, `SharedAddPax`, `Production` (12 folders) — **38 directories remain** that `TestDataProviders.discoverAvailableAgencyNames()` (`TestDataProviders.java:331-346`) would treat as valid `-Dagency` values:

Aegean, AegeanV21, AirArabia, AirBlue, AirCairo, AirIndia, Amadeus, AmadeusNDC, EGY AirSial, EGY Ajet, EgyptAir, ElJazeera, Emirates, EmiratesV17, EmiratesV21, FlyAdeal, FlyDubai, FlyNas, Galileo, GLC, GulfAir, Indigo, KSA Aegean, KSA EgyptAir, KSA TKConnect, KSAEgyptAir, Nesma, OmainAir, ProdGTWFlyNas, ProdGTWGalileo, ProdGTWJazeera, RiyadhAir, SabreNDC, SereneAir, SpiceJet, TkConnect, TravelPortNDC, UAEAmadeusNDC

(`UAE Agency` is ambiguous — it exists as both a TestData folder and an `agencyClaims.json` entry but its role wasn't confirmed from code; excluded from the count of 38, called out separately in Section 11.)

This **substantiates** CLAUDE.md's "40+ suppliers" claim in spirit, but with a caveat worth stating precisely: several of the 38 are not independent GDS/airline integrations but **version or regional variants of the same integration** — `Aegean`/`AegeanV21`, `Emirates`/`EmiratesV17`/`EmiratesV21`, `EgyptAir`/`KSAEgyptAir`/`KSA EgyptAir`, `TkConnect`/`KSA TKConnect`, and the `ProdGTW*` folders (production-gateway/mocked variants of Galileo, FlyNas, and Jazeera per `IsMocked: true` in `agencyClaims.json`). "40+ suppliers" is accurate as a count of test-data targets, not as a count of distinct backend systems.

`src/test/resources/config/suppliers.json` — the only other supplier registry in the repo — covers a much smaller subset: 2 suppliers in `haveBundleTrueSuppliers`, 5 in `canBeHeldFalseSuppliers`, 14/10/5/5 across the four ancillary-support lists. Most of the 38 TestData suppliers (e.g., `Aegean`, `AirBlue`, `Amadeus`, `GulfAir`, `Nesma`, `OmainAir`, `RiyadhAir`, `SabreNDC`, `TravelPortNDC`) have **no entry at all** in `suppliers.json`. Full detail in Section 8.

### 4.2 Test Groups (from `testng.xml` comments and `@Test(groups=...)` annotations)

Group

Steps included (per `testng.xml` comment block, lines 47-57)

Verified in code

`smoke`

Search → FareConfirm → AddPax → Book/Hold chain through Retrieve+Void

`OneSupplierTests`/`SelectedOneSupplierTests` annotate nearly every step method with `smoke`

`regression`

Search → FareConfirm → AddPax (currently the group wired into `testng.xml`'s active `<test>` block, line 76)

Confirmed — `regression` stops short of Book in the doc's table but code shows `testBook` in `OneSupplierTests` is NOT tagged `regression` (only `smoke`,`retrieve`), consistent with the doc

`retrieve`

Search → FareConfirm → AddPax → Book → Void+Retrieve

Confirmed via `testRetrieve`/`testVoid` group tags

`Cancel`

Search → FareConfirm → AddPax → Hold → CancelHold

`SelectedOneSupplierTests.testCancelHold`

`bundle`

Search → FareConfirm (+Bundle)

`testBundle` group tag

`upsell`

Search → Upsell (SelectedOneSupplierTests only)

`testUpsell` group tag; absent from `OneSupplierTests`

`PreSeatMap`, `Ancillary`

Enrichment-step-specific groups, `SelectedOneSupplierTests` only

`testSeatMap`, `testGetAncillary`

`negative-Search`, `negative-fareconfirm`, `negative-upsell`, `negative-test`

Error-path validation, `NegativeScenarioTest`

Confirmed

**Drift note**: `testng.xml`'s only active `<test>` block runs `SelectedOneSupplierTests` filtered to `regression` group only (lines 67-82); `OneSupplierTests` and an `AllSuppliersTests` class referenced in commented-out XML (lines 85-96) are **not currently wired into the suite** — `AllSuppliersTests.java` doesn't exist in the source tree at all (only `OneSupplierTest`, `SelectedOneSupplierTest`, `NegativeTest` packages were found). The doc's package tree (`SupplierTest/LCC/...`) describing per-supplier classes like `GalileoTests.java`/`AirArabiaTests.java` does **not match the current architecture** — the actual design is one generic, config-driven test class (`OneSupplierTests`/`SelectedOneSupplierTests`) parameterized by `-Dagency`, not one Java class per supplier. This is the single largest doc/code drift point (see Section 8).

### 4.3 V1 vs V2 Contract Comparison Capability

Implemented via `ApiVersion` enum + `EndpointResolver` switch statement (one `case V1 -> ... / case V2 -> ...` per endpoint, 11 endpoints total, `EndpointResolver.java`). Selected once per JVM via `-DapiVersion` / `config.properties` (default `V1`, `TestDataHelper.java:54`). Runtime behavior genuinely branches on version, not just the URL:

-   V1 skips AddPax and routes FareConfirm/Bundle output straight to booking (`registerDirectBookingFlowForV1`).
-   `validAddPaxData` data provider returns an empty array outright under V1 (`BaseAirlineTest.java:2039-2042`).
-   V1's Book/Hold payload builder loads a separate shared template (`SharedAddPaxV1.json`) and injects `paymentDetails` from the search payload; V2 uses `SharedAddPaxV2.json` (`PayloadLoader.java:801-874` vs `121-206`).

**Coverage caveat**: there is no code path that runs both V1 and V2 for the same supplier in a single execution and diffs the results — "comparison" happens by running the same suite twice with different `-DapiVersion` values and comparing reports/logs externally, not by an in-framework comparator.

### 4.4 Environments

9 environment entries configured in `config.properties` (STG, AutoSTG, STG3, STG5, STG8, INT3, local, UAT, release, ndcWtStaging — 10 actually, plus `PROD` hardcoded only in the `Environment` enum with no `config.properties` override) resolved via `TestDataHelper.Environment` enum + `resolveBaseUrl` (properties override → enum built-in default). `PROD` exists specifically to gate booking: `BaseAirlineTest.shouldSkipBookingInProduction()` skips the Book endpoint unless `-DallowProductionBooking=true` is explicitly passed — a genuine safety guard, not aspirational.

### 4.5 Supplier Capability Matrix (`suppliers.json` coverage)

Cross-referencing the five capability lists in `suppliers.json` against the 38 TestData supplier folders (case-insensitive match, per `SuppliersConfigLoader.getSupportedAncillaryTypes` and `ValidatorHelper`'s `.toLowerCase()` normalization):

Supplier (TestData folder)

Bundle=true

CanBeHeld=false

Baggage anc.

Meal anc.

Other anc.

Seat anc.

FlyNas

✓

✓

✓

✓

✓

✓

GLC

✓

✓

✓

SereneAir

✓

✓

✓

SpiceJet

✓

✓

✓

✓

✓

FlyAdeal

✓

Galileo

✓

AirCairo

✓

✓

EgyptAir

✓

TravelPortNDC

✓

✓

AirIndia

✓

✓

TkConnect

✓

✓

AirArabia

✓

✓

RiyadhAir

✓

✓

FlyDubai

✓

✓

*(remaining 24 folders — no entry in any list)*

**14 of 38** TestData suppliers (37%) have at least one `suppliers.json` capability entry; the other 24 — including `Aegean`, `AegeanV21`, `AirBlue`, `Amadeus`, `AmadeusNDC`, `EGY AirSial`, `EGY Ajet`, `Emirates`/`EmiratesV17`/`EmiratesV21`, `GulfAir`, `KSA Aegean`, `KSA EgyptAir`, `KSA TKConnect`, `KSAEgyptAir`, `Nesma`, `ProdGTWFlyNas`, `ProdGTWGalileo`, `ProdGTWJazeera`, `SabreNDC`, `UAEAmadeusNDC` — fall through to implicit defaults (no bundle, can-be-held, no special ancillary handling) regardless of their actual capability, unless a given test scenario's own `hasBundle`/`bookingFlow` JSON field overrides it (the mechanism that actually controls flow — see Gap #14, Section 8).

This cross-reference also surfaced two more name mismatches beyond `Indego`/`Indigo` (Gap #3), both in `supportBaggageAncillary` / `supportMealAncillary`:

-   `suppliers.json` lists `"ElJazeeraV4"`; the TestData folder is `ElJazeera` — no match, so `ElJazeera` gets none of the baggage/meal ancillary capability it's apparently entitled to.
-   `suppliers.json` lists `"OmanAirV17"`; the TestData folder is `OmainAir` — no match (also note the folder name itself may be a typo of "OmanAir"). Same effect.

## 5. Architecture Overview

```
Test classes (OneSupplierTests / SelectedOneSupplierTests / NegativeScenarioTest, extend BaseAirlineTest)
  -> Orchestrator: PerformAPIsAssertions.java (RestAssured POST, response wrapping, AssertionFlags-gated validation dispatch)
    -> Validators: Utils/Assertions/*.java (20 classes, SoftAssert-based, one per endpoint × positive/negative)
      -> Helpers/Loaders: ResponsePathsHelper (JsonPath constant catalog), PayloadLoader (payload builders per endpoint),
         ValidatorHelper (price reconciliation), TestDataHelper (env/version/agency resolution), SuppliersConfigLoader
        -> Reporting: ReportManager (ExtentReports) + ReportLogger/AssertionLoggerHelper (SLF4J+Logback, file-only API traffic log)
```

**Two-tier assertion model** (the extensibility contract, per `doc/automation-testing-guide.md` Section D and confirmed in code): adding a new field check means (1) add a JsonPath constant/accessor to `ResponsePathsHelper.java`, (2) add a `SoftAssert`-based validation method to the matching `*Assertions.java` class, (3) call it from the matching orchestrator method in `PerformAPIsAssertions.java`, gated behind that endpoint's `AssertionFlags` boolean. `AssertionFlags` (`PerformAPIsAssertions.java:77-174`) is a real, load-bearing runtime switchboard — every endpoint's business assertions are individually toggleable, and `BaseAirlineTest.setUp()` calls `disableAll()` at suite start (line 1228), meaning **assertions must be explicitly enabled by a test class or they silently don't run** — this is worth flagging to new engineers as a common source of "why isn't my assertion firing" confusion.

**Thread-safety constraint**: `BaseAirlineTest` holds 13 `CopyOnWriteArrayList<Map<String,Object>>` static fields (`validSearchOfferIds`, `validFareConfirmOffers`, `validBookOffers`, etc., lines 117-129) that chain each endpoint step's output into the next step's TestNG `@DataProvider`. This is explicitly called out in both the class Javadoc and `testng.xml`'s header comment as a **hard suite-isolation rule**: two concrete test classes must never share a `<test>` block, because the lists are JVM-static and would cross-contaminate offer IDs between suites running in the same block. `testng.xml`'s only currently-active suite avoids this by running a single class; the commented-out alternative blocks demonstrate the correct one-class-per-`<test>` pattern.

**Booking-context propagation pattern**: rather than passing typed DTOs between endpoint steps, the framework mutates a single `Map<String,Object>` context object per offer (`selectedOfferFromSearch`) that accumulates keys as it passes through Search → FareConfirm → Bundle → AddPax → Book/Hold. This is a deliberate, documented design choice ("the chained DataProviders pass this same mutable instance through later endpoint tests instead of copying it into a custom DTO", `BaseAirlineTest.java:1331-1334`) rather than an oversight, but it means field-name typos in `.get()`/`.put()` calls fail silently at runtime (return `null`) rather than at compile time.

## 6. Functional Requirements

ID

Description

Status

Evidence

FR-1

Run full booking chain for one configured supplier via `-Dagency`

Implemented

`SelectedOneSupplierTests.java`, `TestDataHelper.SUPPLIER_NAME`

FR-2

Run full booking chain across all offers returned by Search for one supplier

Implemented

`OneSupplierTests.testSearch` → `runSearchAndStashAllOffers`

FR-3

Add a new supplier end-to-end without new Java test classes

Implemented (differs from documented process)

Adding a supplier = create `TestData/{Name}/Search/*.json` + optional `suppliers.json`/`agencyClaims.json` entries; no new `.java` file needed. **Contradicts** `doc/automation-testing-guide.md` Section E, which instructs creating `{Agency}Tests.java` + `{Agency}DataProvider.java` per supplier — that per-class pattern is not what the current architecture does

FR-4

Add a new assertion (two-tier model: extraction → validation → orchestrator call)

Implemented

`ResponsePathsHelper.java`, `*Assertions.java`, `PerformAPIsAssertions.java`; process matches doc Section D accurately

FR-5

Run by group (smoke/regression/retrieve/negative/Cancel/bundle/upsell/PreSeatMap/Ancillary)

Implemented

`@Test(groups=...)` across test classes; `testng.xml` `<groups><run><include.../>`

FR-6

Run by environment via `-Dtest.environment`

Implemented

`TestDataHelper.resolveEnvironment`, 10 environments in `config.properties`/enum

FR-7

Run by API version via `-DapiVersion` (V1/V2)

Implemented

`TestDataHelper.resolveApiVersion`, `EndpointResolver.java`

FR-8

Parallel execution via `-DparallelClasses -Dthreads=N`

Partially implemented / risky

Surefire/TestNG support parallel execution generically, but the static `CopyOnWriteArrayList` chaining model requires one class per `<test>` block (Section 5); parallelizing multiple *different* suite classes in the same block is explicitly documented as unsafe

FR-9

Skip booking automatically in production unless explicitly overridden

Implemented

`BaseAirlineTest.shouldSkipBookingInProduction()` + `-DallowProductionBooking=true`

FR-10

HTML report generation per run, dated

Implemented

`ReportManager` (ExtentReports), `target/test-output/Extent Report/{date}/`

FR-11

File logging of all API request/response traffic, separate from console

Implemented

`PerformAPIsAssertions.API_LOG` routed to dedicated "ApiResponse" logback logger, never printed to console

FR-12

Per-agency credential/header handling

Partial / inconsistent with doc

`agencyClaims.json` (single file, all agencies) exists under `headers/`, but the actual `x-api-key`/`client-id` sent on every request are **hardcoded in `PerformAPIsAssertions.performPost()`**, not read from any per-agency file — see Guardrail note below and Section 7/8

FR-13

Negative-path validation per endpoint (Search, FareConfirm, AddPax, Book, Hold, Bundle, Upsell)

Implemented

`NegativeScenarioTest.java`, `NegativeXxxAssertions.java` classes, `TestDataProviders` negative-folder providers

FR-14

Supplier capability gating (bundle support, hold support, ancillary types)

Partially implemented — data-driven per-scenario overrides config-file gating

Two competing mechanisms exist: (a) `suppliers.json` capability lists consumed by `SuppliersConfigLoader`/`ValidatorHelper` for ancillary-type assertions, and (b) per-test-case `hasBundle`/`bookingFlow` flags in the JSON payload itself, consumed directly in `BaseAirlineTest.runSearchAndStash`. (b) is the actual flow-control mechanism; (a) only affects a narrower set of ancillary assertions and is stale for most suppliers (Section 8)

FR-15

V1/V2 in-framework result comparison

Missing

No code diffs V1 vs V2 responses within a single run; comparison is external (run twice, compare reports manually)

FR-16

Multi-supplier fan-out in a single execution

Missing / partially built

`TestData/AllSuppliersBook`, `AllSuppliersHold` folders and their `TestDataProviders` methods exist, but no corresponding `AllSuppliersTests.java` test class exists in the current source tree to consume them

## 7. Non-Functional Requirements

-   **Parallelism/thread-safety**: `CopyOnWriteArrayList` is mandatory for any shared static flow-state collection (Mandatory Rule, enforced by convention not by a compiler/lint check); the suite-isolation constraint (Section 5) is the practical boundary on how much parallelism is safe.
-   **Logging discipline**: `AssertionLoggerHelper` (`info`/`debug`/`warn`/`error`, `tcStart`/`tcPass`/`tcFail`) is the only sanctioned logging path; raw API traffic is routed to a dedicated file-only SLF4J logger (`ApiResponse`) so it never pollutes console output (`PerformAPIsAssertions.API_LOG`, line 212).
-   **Reporting**: ExtentReports HTML dashboards per method (`target/test-output/Extent Report/{date}/`), SLF4J+Logback rolling file logs (`logs/{date}/ndc-api-tests.0.log`), separate `logback-test.xml` (local) vs `logback-ci.xml` (CI/CD JSON) configs referenced in the doc.
-   **Code quality gates**: `-Penforce-quality` Maven profile flips Checkstyle/PMD/SpotBugs/JaCoCo/OWASP-dependency-check from advisory (`failOnViolation=false` by default, `pom.xml` lines 15-21) to hard-failing (`pom.xml` lines 300-334). JaCoCo minimum line coverage is `0.50` in both modes. OWASP dependency-check CVSS fail threshold tightens from 11 (effectively disabled) to 7 under the enforce-quality profile.
-   **Security/credential handling — open risk, explicitly flagged per Guardrails**: `PerformAPIsAssertions.performPost()` (`PerformAPIsAssertions.java:262`) sends a hardcoded `x-api-key` and `client-id` header on **every** request regardless of agency, environment, or `agencyClaims.json` content. This is confirmed current behavior, not resolved tech debt — no code path reads a header value from `agencyClaims.json` or any `headers/{agency}Headers.json` file (the latter doesn't exist; only `agencyClaims.json` does, and its consumer was not found wired into request construction in the files reviewed). Per this project's guardrails, the actual key value is not reproduced here.

## 8. Known Gaps, Tech Debt, and Risks

#   

Finding

Evidence

1

Hardcoded API credentials sent on every request, ignoring per-agency identity

`PerformAPIsAssertions.java:262` — `.header("x-api-key", "ttdb2dc2-...")`, `.header("client-id", "NDC-Core")`

2

`suppliers.json` capability lists are stale relative to the 38-supplier TestData set — most suppliers (Aegean, AirBlue, AirCairo, AirIndia, Amadeus, AmadeusNDC, EGY variants, Emirates variants, GulfAir, KSA variants, Nesma, OmainAir, ProdGTW*, RiyadhAir, SabreNDC, TravelPortNDC, UAEAmadeusNDC) have zero entries across all five capability lists

`src/test/resources/config/suppliers.json` (full file read) vs TestData directory listing

3

Name mismatch between `suppliers.json` and the actual supplier identifier: config lists `"Indego"` in `haveBundleTrueSuppliers`/`canBeHeldFalseSuppliers`, but the TestData folder (and therefore the actual `-Dagency`/`SUPPLIER_NAME` value) is `Indigo`. Lookup is case-insensitive (`ValidatorHelper.java:1196`, `.toLowerCase()`) but not spelling-tolerant, so `Indigo` never matches `"indego"`

`suppliers.json:4-11` vs `TestData/Indigo/` directory

4

Doc/code architecture drift: `doc/automation-testing-guide.md` Section E instructs creating one `{Agency}Tests.java` + `{Agency}DataProvider.java` class pair per new supplier, and Section B's package tree shows per-supplier classes (`GalileoTests.java`, `AmadeusTests.java`) under a `SupplierTest/LCC/` package. The actual codebase has no `LCC` package and no per-supplier test classes at all — supplier selection is entirely data/config-driven through `OneSupplierTests`/`SelectedOneSupplierTests` + `-Dagency`

`doc/automation-testing-guide.md` lines 96-120, 666-1016 vs actual `Glob` of `src/test/java/SupplierTest/**/*.java` (only `OneSupplierTest`, `SelectedOneSupplierTest`, `NegativeTest`, `Shared` packages exist)

5

`testng.xml`'s only active suite runs `SelectedOneSupplierTests` filtered to the `regression` group, which per the file's own comment table stops at AddPax (no Book/Retrieve/Void) — meaning the wired-in CI/default `mvn clean test` invocation does not exercise the booking/retrieve/void steps at all unless the group filter is changed or removed

`testng.xml:67-82`

6

`AllSuppliersTests.java` referenced in `testng.xml`'s commented-out block and matched by dedicated `TestDataProviders` methods (`allSuppliersBookSearchData`, `allSuppliersHoldSearchData`) does not exist in the source tree — half-built capability

`testng.xml:85-89`, `TestDataProviders.java:142-154`, confirmed absent via `Glob`

7

No in-framework V1-vs-V2 response comparator exists; "compares behavior between two API contract versions" (CLAUDE.md) is currently achieved only by running the whole suite twice with different `-DapiVersion` values and comparing Extent reports/logs by hand

`EndpointResolver.java`, `TestDataHelper.java` — no diff/compare utility found

8

`headers/{agency}Headers.json` mechanism described in the doc (Section E, Step 4) does not exist — the only file in `headers/` is `agencyClaims.json`, a single combined file keyed by agency name containing agency/branch/user IDs, not HTTP headers, and it was not found wired into `performPost()`

Doc lines 770-784 vs `Glob src/test/resources/headers/*.json` → only `agencyClaims.json`

9

`GulfAir` test data is mid-restructure on the current branch (git status shows dozens of `R` renames moving files out of `GulfAir/Search/` up to `GulfAir/`, plus one still-modified file at the old path) — this is in-progress work, not a defect, but any PRD consumer should know the GulfAir dataset's on-disk shape is currently in flux

`git status --short` (session start)

10

Assertions are globally disabled by default at suite start (`AssertionFlags.disableAll()` in `BaseAirlineTest.setUp()`) and must be explicitly re-enabled per endpoint by test-class code — not found to be a problem in the reviewed test classes, but it is a sharp edge for a new contributor adding a test class who forgets to enable the relevant flag(s)

`BaseAirlineTest.java:1228`, `PerformAPIsAssertions.java:143-156`

11

`suppliers.json`'s `supportBaggageAncillary`/`supportMealAncillary` lists reference `"ElJazeeraV4"`, which does not match the actual TestData folder `ElJazeera` (case-insensitive match still fails — different strings, not just casing)

`suppliers.json` baggage/meal lists vs `TestData/ElJazeera/` directory

12

Same class of mismatch: `suppliers.json` references `"OmanAirV17"` in `supportBaggageAncillary`/`supportMealAncillary`; the TestData folder is `OmainAir` — no match

`suppliers.json` baggage/meal lists vs `TestData/OmainAir/` directory

13

`OneSupplierDataProvider.negativeSearchDataProvider()` and `OneSupplierDataProvider.AddPaxDataProvider()` are defined but not referenced by any `@Test(dataProvider=...)` in `OneSupplierTests.java` (which only uses `positiveSearchDataProvider`, `validFareConfirmData`, `bundleDataProvider`, `validAddPaxData`, `validBookData`, `validHoldData`, `validFareConfirmAfterHoldData`, `validCancelHoldData`, `validBookAfterHoldData`, `validRetrieveData`, `validVoidData`) — dead/orphaned provider code, same pattern as the `AllSuppliersTests` gap (#6)

`OneSupplierDataProvider.java:25-39` vs full `OneSupplierTests.java` (228 lines, no matching `dataProvider` string)

14

**New as of 2026-08-10 — framework has zero coverage of the SeatMap API surface added to the V2 Postman collection this same date.** The V2 collection gained a new `SeatAfterHold` endpoint (`api/v2/SeatMap/SeatAfterHold`, seat selection for an already-Held PNR) and the existing `Book` endpoint gained an active `passengersSelectedSeats` request/response field (direct-booking seat selection). Neither has any corresponding case in `EndpointResolver`, any builder in `PayloadLoader`, nor any reference anywhere in `src/` — confirmed by exhaustive source grep (`SeatAfterHold`, `passengersSelectedSeats`, `FareRules` all return zero matches). The existing `PreSeatMapAssertions`/`testSeatMap`/`PreSeatMap` group (§4.2) covers only the pre-existing `GetSeatMap` ("browse the seat map") call, not either new mechanism for actually attaching a seat to a booking. This is a genuine capability the live API now exposes that this framework cannot exercise at all — distinct from Gap #6/#13's dead-code pattern, this is *missing* code for *existing* API surface.

`NDC_Integration/SPEC.md` §1.2 (#16/#17), §2.7a, §2.9, §2.10 (companion QA repo, reverse-engineered from the same Postman collection update) vs. `grep -rn "SeatAfterHold\|passengersSelectedSeats\|FareRules" src/` (zero matches, this review)

## 9. Roadmap Candidates (proposals — not commitments)

-   Externalize the hardcoded `x-api-key`/`client-id` in `PerformAPIsAssertions.performPost()` to environment variables or a genuine per-agency headers file, closing Gap #1/#8. Flagged per this project's guardrails as a credential-handling change requiring explicit sign-off before implementation.
-   Reconcile `suppliers.json` against the full 38-supplier TestData set (Gap #2), and fix the `Indego`/`Indigo` spelling mismatch (Gap #3) so bundle/hold capability gating is accurate for suppliers currently falling through to default behavior.
-   Update `doc/automation-testing-guide.md` Sections B and E to describe the actual config-driven `OneSupplierTests`/`SelectedOneSupplierTests` architecture instead of the per-supplier-class pattern that no longer exists (Gap #4) — this is a direct instruction in CLAUDE.md's own "Doc review" playbook.
-   Either build `AllSuppliersTests.java` to consume the already-existing `AllSuppliersBook`/`AllSuppliersHold` test data and providers, or remove the orphaned data/provider methods if multi-supplier fan-out is no longer intended (Gap #6).
-   Consider a lightweight in-framework V1/V2 response comparator (e.g., run both versions for the same scenario and assert structural/price parity) rather than relying on manual double-run comparison (Gap #7).
-   Widen negative-test coverage to the enrichment endpoints (SeatMap, GetAncillary, CancelAfterHold) which currently have positive-flow assertions (`AssertionFlags.PRE_SEAT_MAP`, `ANCILLARY`, `CANCEL_HOLD`) but no corresponding `NegativeXxx` classes or `testng.xml` group, unlike Search/FareConfirm/AddPax/Book/Hold/Bundle/Upsell.
-   Build framework support for the new `SeatAfterHold` endpoint and `Book`'s `passengersSelectedSeats` field (Gap #14): add an `EndpointResolver` case + `PayloadLoader` builder for `SeatAfterHold`, extend the existing `Book`/`PreSeatMapAssertions` machinery to assert on `passengersSelectedSeats`/`passengerSeats`/`totalSelectedSeats(Amount)`, and decide whether `SeatAfterHold` needs its own `AssertionFlags` entry and `testng.xml` group (mirroring `PreSeatMap`) once its live chain position and response shape are confirmed (tracked as `UNKNOWN` in `SPEC.md` §2.7a — resolve that before implementing, not in parallel with it).
-   Fix the `ElJazeeraV4`/`ElJazeera` and `OmanAirV17`/`OmainAir` name mismatches (Gaps #11, #12) alongside the `Indego`/`Indigo` fix (Gap #3) in the same pass, since all three are the same root cause: `suppliers.json` entries were never reconciled against the actual TestData folder names.
-   Remove `OneSupplierDataProvider.negativeSearchDataProvider()` and `AddPaxDataProvider()` (Gap #13) if they're confirmed dead, or wire them into `OneSupplierTests` if they were meant to cover a gap (negative search / multi-supplier-hold AddPax) that `OneSupplierTests` currently has no test method for.

### 9.1 Indicative Roadmap Timeline (proposal — not a commitment)

The framework is already implemented and in active use; this reflects incremental hardening phases, not a from-scratch build. Sequencing follows dependency order (config/data fixes before code changes that rely on them) and reconciles with the Known Gaps in Section 8.

Phase

Scope

Closes

Rough estimate

1 — Data/config reconciliation

Fix the three `suppliers.json` name mismatches (`Indego`/`Indigo`, `ElJazeeraV4`/`ElJazeera`, `OmanAirV17`/`OmainAir`); backfill capability entries for the 24 suppliers with none

Gaps #2, #3, #11, #12

3-5 days

2 — Credential remediation

Externalize the hardcoded `x-api-key`/`client-id` in `PerformAPIsAssertions.performPost()`; decide whether `agencyClaims.json` becomes the credential source or a new per-agency headers mechanism is built

Gaps #1, #8

1 week — requires explicit security/credential-handling sign-off per this project's guardrails before starting

3 — Documentation correction

Rewrite `doc/automation-testing-guide.md` Sections B and E to describe the actual `-Dagency`-driven `OneSupplierTests`/`SelectedOneSupplierTests` architecture, removing the per-supplier-class instructions that no longer apply

Gap #4

2-3 days

4 — Dead-code decision

Either wire up `AllSuppliersTests` (build the class to consume the existing `AllSuppliersBook`/`AllSuppliersHold` providers) and the orphaned `OneSupplierDataProvider` methods, or delete both if the capability is no longer wanted

Gaps #6, #13

1 week to build; ~1 day to delete

5 — V1/V2 parity tooling

Evaluate and, if justified, build a lightweight in-framework comparator that runs both API versions for the same scenario and asserts structural/price parity, rather than relying on two manual runs

Gap #7

2 weeks (spike + implementation)

6 — Negative coverage expansion

Add negative-path assertion classes and `testng.xml` groups for SeatMap, GetAncillary, and CancelAfterHold

(Roadmap item, no numbered gap)

Ongoing, ~2-3 days per endpoint

## 10. Success Metrics

No success metrics, dashboards, or CI quality gates tied to test outcomes were found in the repository (no CI pipeline config file was located in the paths reviewed, and `JaCoCo`'s 50% line-coverage gate only fires under the opt-in `-Penforce-quality` profile). Proposed candidates, clearly labeled as proposals:

-   % of the 38 supplier targets with both V1 and V2 test-data coverage and a passing `smoke` group run in the last N days.
-   Defect-escape rate: production/UAT incidents traceable to a booking-flow step that had assertion coverage disabled (`AssertionFlags`) at the time.
-   CI wall-clock budget per supplier per group (currently unmeasured; `response.getTime()` is logged per call but never aggregated or asserted).
-   Ratio of suppliers with an accurate, current `suppliers.json` capability entry vs. total suppliers (currently ~13/38 have any entry, per Section 8 Gap #2).

## 11. Open Questions / Assumptions Needed From Stakeholders

-   Is the per-supplier-class architecture described in `doc/automation-testing-guide.md` (Section E) an intentional target the team is migrating *toward*, or documentation that simply wasn't updated after a refactor to the current config-driven model? This materially changes whether Gap #4 is a doc fix or a code-migration task.
-   Is `AllSuppliersTests` (Gap #6) abandoned scope or a pending deliverable? The test data and providers exist; the test class doesn't.
-   What is the intended relationship between `suppliers.json` (code-consumed capability flags) and the per-test-case `hasBundle`/`bookingFlow` fields in TestData JSON (also code-consumed, and the one that actually drives flow routing)? Are these meant to be reconciled into one source of truth, or is the dual mechanism intentional (one for flow control, one for a narrower set of ancillary-type assertions)?
-   Is there a CI pipeline (GitHub Actions, Azure DevOps, Jenkins) that runs this suite on a schedule or on PRs? No CI config file was found in the directories reviewed — if one exists elsewhere, it should be the actual source for "current test groups run in CI" rather than inferring from `testng.xml`'s currently-checked-in state.
-   What is the business/compliance driver, if any, for the credential-externalization work (Gap #1/#8) — is there a specific incident, audit finding, or deadline, or is it purely hygiene?
-   Budget, timeline, and ownership for any of the Section 9 roadmap items — none of this was discoverable from the repository and must come from stakeholders directly.
-   Status of the in-progress `GulfAir` test-data restructure visible in `git status` (Gap #9) — should the PRD's supplier list treat GulfAir's final on-disk shape as the flat structure being moved *to*, or is that restructure itself part of unrelated in-flight work this PRD shouldn't assume is finished?
-   **What is `SeatAfterHold`'s exact position in the Hold-branch chain, and what is its real request/response shape?** (Gap #14) The Postman collection's own saved example has no seat/cell field, no response example, and no test script — the 6-field body observed (`supplier`, `credentialsSelector`, `pnr`, `gdsPNR`, `bookingToken`, `surName`) may be an incomplete stub. This must be confirmed against the live API (or the team that added it) before any framework implementation work begins — building `EndpointResolver`/`PayloadLoader` support against a guessed contract risks encoding the wrong shape permanently.

---

# Part II — NDC API Integration Scope (live-confirmed, added 2026-11-12)

**Scope of Part II.** This part covers the **NDC Integration API** (the supplier-abstraction layer), not the Java framework. Sources: `NDC_Integration/SPEC.md` (QA source of truth), `Postman_Collection/Collection_V1|V2/*.json`, `NDC_Integration/TestCases/*.csv`, `NDC_Integration/Artifacts/Logs/*` and `Artifacts/BugReports/*` (runs 2026-08-05 → 2026-11-12), and `Artifacts/Analysis/UserStoryAnalysis/*.md`. Labels: **Confirmed live** = observed on a staging host in a logged run (run slug cited); **Collection** = present in a Postman collection but not exercised live; **Unknown** = no evidence. Facts are per supplier + `credentialsSelector` + host on the date stated. Staging builds changed between runs, so re-confirm a fact before relying on it.

## 12. API Product Overview

### 12.1 What the API is

A single JSON contract in front of airline/GDS back ends (IATA NDC XML/JSON, EDIFACT, Navitaire, Open Travel, GDS native). Each request selects the back end with the body fields `supplier` and `credentialsSelector`, and authenticates with static headers (`x-api-key`, `Client-Id`). The API is versioned by URL path (V1 = no version segment, V2 = `api/v2|V2/...`); there is no version negotiation. No Refund, Exchange or PNR-modification endpoint is live in either version (SPEC §1.9). **Reissue (ticket exchange) is planned for V2** as a common, supplier-agnostic interface (story "Implement Oman Air Reissue", analyzed 2026-11-17). Its contract exists but has not been shared with QA, and no route is in any collection yet (§12.2 #21–24, §17.1).

### 12.2 Full endpoint surface (supersedes the 11-endpoint list in §1/§2)

| # | Endpoint | V1 path | V2 path | Status / evidence |
|---|---|---|---|---|
| 1 | Search | `api/FlightSearch/Search` | `api/V2/FlightSearch/Search` | Confirmed live, all runs |
| 2 | **Availability** (page 1 and next pages, same URL) | — | `api/V2/FlightSearch/Availability` | **New.** Confirmed live: Galileo/EGY ne-4 (2026-11-10), SabreNdc/EGY ne-7 (2026-11-11/12). Not in Part I. |
| 3 | **SelectAvailability** | — | `api/V2/FlightSearch/SelectAvailability` | **New.** Confirmed live (same runs). Output feeds FareConfirm. |
| 4 | FareConfirm | `api/FlightSearch/FareConfirm` | `api/v2/FlightSearch/FareConfirm` | Confirmed live |
| 5 | Upselling | `api/FlightSearch/UpSelling` | `api/v2/FlightSearch/UpSelling` | Confirmed live (SabreNdc); 409 on AirArabiaPlus, AirIndia |
| 6 | FareRules | — | `api/v2/FlightSearch/FareRules` | Collection (added 2026-08-10); 409 OperationNotSupported on AirArabiaPlus, AirIndia; no positive result anywhere |
| 7 | GetOfferBundles | `api/bundles/GetOfferBundles` | `api/V2/bundles/GetOfferBundles` | Confirmed live (AirArabiaPlus, AirIndia, FlyAdeal) |
| 8 | AddPassenger | — | `api/v2/Passenger/AddPassengerDetails` | Confirmed live |
| 9 | GetAncillary | — | `api/v2/Ancillary/GetAncillary` | Confirmed live (AirArabiaPlus, AirIndia, Galileo baggage only) |
| 10 | GetSeatMap | — | `api/V2/SeatMap/Seat` | Confirmed live (GulfAir, FlyAdeal, Galileo SV/MS, AirArabiaPlus, AirIndia) |
| 11 | SeatAfterHold | — | `api/v2/SeatMap/SeatAfterHold` | Collection only; 409 OperationNotSupported on every supplier tried (AirArabiaPlus, AirIndia, FlyAdeal, Galileo). No positive example exists. |
| 12 | FareCheck | — | `api/v2/Ancillary/FareCheck` | Confirmed live (AirArabiaPlus); 409 on SabreNdc, Galileo, AirIndia |
| 13 | Book | `api/FlightBooking/Book` | `api/v2/FlightBooking/Book` | Confirmed live |
| 14 | Hold | `api/FlightBooking/Hold` | `api/v2/FlightBooking/Hold` | Confirmed live |
| 15 | **HoldVersion2** | `api/FlightBooking/HoldVersion2` | — | **New, unexplained.** Appears only in `NDC Integrations_Ancillary Galileo avilability Copy.postman_collection.json`. Purpose and status Unknown (§20). |
| 16 | FareConfirmAfterHold (PnrReprice) | `api/FlightBooking/PnrReprice` | `api/v2/FlightBooking/PnrReprice` | Confirmed live |
| 17 | BookAfterHold | `api/FlightBooking/BookAfterHold` | `api/V2/FlightBooking/BookAfterHold` | Confirmed live |
| 18 | Retrieve | `api/FlightBooking/RetrieveBooking` | `api/v2/FlightBooking/Retrieve` | Confirmed live |
| 19 | CancelAfterHold | `api/FlightBooking/CancelAfterHold` | `api/V2/FlightBooking/CancelAfterHold` | Confirmed live (SabreNdc, TravelportNdc) |
| 20 | Void | `api/FlightBooking/Void` | `api/V2/FlightBooking/Void` | Confirmed live (SabreNdc V1+V2; TravelportNdc V2, and V1 from ne-5 Round 2) |
| 21 | **Reissue Search** | — | path TBD | **Planned (V2 only).** Contract exists, not shared with QA; not in any collection; no live evidence (§17.1). |
| 22 | **Reissue Validation / Review** | — | path TBD | **Planned (V2 only).** Same status as #21. |
| 23 | **Reissue (commit)** — the "Reissue Action" NDCCore calls | — | path TBD | **Planned (V2 only).** Same status as #21. Carries the form of payment. |
| 24 | **Reissue Lookup** (Reissue PNR lookup) | — | path TBD | **Planned (V2 only).** Same status as #21. |

Unsupported operations seen in error bodies but with no route in any collection: `ReleasePnr`, refund quota (AirArabiaPlus, 409 OperationNotSupported).

### 12.3 Booking chains (correct order confirmed live)

| Chain | Order | Evidence |
|---|---|---|
| Classic V1 | Search → FareConfirm (or Upselling) → [GetOfferBundles] → Book or Hold (passengers inline) → Retrieve → Void / PnrReprice → BookAfterHold / CancelAfterHold | SPEC §3.1; SabreNdc V1 Round 2 |
| Classic V2, no enrichment | Search → FareConfirm → AddPassenger → Book/Hold (uses AddPassenger ids) | All V2 runs |
| V2 ancillary | Search → FareConfirm → AddPassenger → GetAncillary → GetSeatMap → **FareCheck (with seats)** → Book (FareCheck ids) | AirArabiaPlus Round 3 (2026-11-08) |
| V2 bundle | Search → FareConfirm → GetOfferBundles → AddPassenger → **GetAncillary (`selectedBundles`)** → GetSeatMap → FareCheck → Book (`selectedBundles` + ancillaries + seats) | AirArabiaPlus Round 3. Book with only `selectedBundles` is silently ignored. |
| Availability (V2) | Availability → NextAvailability (same URL with `availabilityId`+`responseId`, while `hasMoreResults`) → SelectAvailability → FareConfirm → (classic V2 chain) | Galileo ne-4, SabreNdc ne-7 |
| Seats on Hold | Galileo and AirArabiaPlus accept seats and baggage directly on **Hold** (not via SeatAfterHold); they appear in Retrieve | Galileo Round 3, AirArabiaPlus regression |
| Reissue (V2, **planned, not live**) | Ticketed Booked PNR (Book or BookAfterHold → Retrieve) → Reissue Search → Validation/Review → Reissue (commit, with payment) → **new Reissue PNR** → Retrieve / Reissue Lookup → [repeat reissue] / [Void] | User story + Q&A 2026-11-17 (`Re-Issue_Analysis.md`); no run yet |

**ID hand-off rules confirmed live:** Book/Hold take the ids of the **last** enrichment call (AddPassenger → GetAncillary → GetSeatMap → FareCheck); SelectAvailability returns the same `responseId` as Availability plus a new `offerId`; page-1 Availability ids stay selectable after page 2; AddPassenger can be called once per FareConfirm offer; Galileo seat requests are keyed by the passenger GUID from GetSeatMap, other suppliers by `Pax<n>`; `cellId` must be sent exactly as returned (Galileo keeps a trailing `~`). Staging publishes Swagger at `/swagger/index.html` (per-area JSON under `/swagger/<Area>/swagger.json` on ne-6).

## 13. Environments and Tenancy

| Host | Used for | Notes |
|---|---|---|
| `ndc-integration-stg-ne-1` (Azure Container Apps) | BUG-18 verification, AirArabiaPlus (2026-11-11) | Search ~20 s |
| `ndc-integration-stg-ne-3` | Default `STAG_ENV`; SabreNdc, TravelportNdc, Amadeus, AirIndia | Main staging host |
| `ndc-integration-stg-ne-4` | Galileo Availability | — |
| `ndc-integration-stg-ne-5` | TravelportNdc Void | Same key as ne-3 |
| `ndc-integration-stg-ne-6` | AirArabiaPlus (One-API) | `AirArabiaPlus_USA_ne6` environment |
| `ndc-integration-stg-ne-7` | SabreNdc Availability | — |
| `ndc-integration-stg-ne-8` | Amadeus pax-name round 1 | Enforces different name rules from ne-3 |
| `ndc-supplier-integration` | FlyAdeal, Galileo SeatMap, AirIndia Round 2 | V1 collection default; SPEC §1.6 calls it stale, yet it is the only host with AirIndia inventory |
| `localhost:7194` | Developer only | Hard-coded `{{localUrl}}` in the Galileo collection (Galileo BUG-11) |

**Implication:** Part I §4.4 lists the framework's named environments (STG, STG3, INT3, UAT …); the QA side uses `ne-N` hosts. The mapping between the two naming schemes is not documented (§20). Different `ne` hosts run different builds and rules (e.g. Amadeus name limits differ between ne-3 and ne-8), so a result is valid only for its host.

**Active credential selectors (confirmed live):** SabreNdc = EGY only (UAE, KSA inactive); TravelportNdc = UAE and EGY (KSA inactive); AirIndia = EGY only; AirArabiaPlus = USA; Galileo, Amadeus, FlyAdeal = EGY; GulfAir = KSA. Under one selector a supplier may serve only some carriers: AirArabiaPlus/USA books only G9, while E5 and 3O return almost nothing.

## 14. Live Supplier Capability Matrix

This matrix supersedes the static `suppliers.json` view in §4.5 for the suppliers listed. ✔ = works live, ✖ = 409 OperationNotSupported (or equivalent), ⚠ = endpoint answers but has a blocking defect, — = not tested.

| Supplier / selector (host) | Carriers live | Upsell | Bundle | Ancillary | SeatMap | FareCheck | Hold | BookAfterHold | CancelHold | Void | Source run |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SabreNdc / EGY (ne-3, ne-7) | QR, AA (US domestic only); SV none | ✔ | ✖ | ✖ | ✖ | ✖ | ✔ (~5.4-day window) | ✔ | ⚠ Retrieve stays OnHold | ✔ FullVoidOnlyAllowed | 2026-10-22 → 11-12 |
| TravelportNdc / UAE (ne-3, ne-5) | QR, EK, RJ; SV none | ⚠ V1 no `selectedOffer` | ✖ (`haveBundles` false) | — | — | — | ✔ | ✔ (EK transient errors) | ✔ | ✔ V2; V1 fixed on ne-5 | 2026-10-26 → 11-01 |
| AirArabiaPlus / USA (ne-6, ne-1) | G9 only (E5 none, 3O sporadic) | ✖ | ✔ | ✔ (baggage per journey, meal per segment) | ✔ | ✔ | ✔ (~75 min) | ⚠ tickets expired hold | ✖ | ✖ | 2026-11-08 → 11-11 |
| Galileo / EGY (ne-4, supplier-integration) | MS, SV, NE, others | — | ✖ | ⚠ journey baggage only | ✔ SV/MS only | ✖ | ✔ | ⚠ fails 3 ways | — | — | 2026-10-11, 11-10 |
| AirIndia / EGY (supplier-integration) | AI, 22 routes | ✖ | ✔ | ✔ | ✔ | ✖ | ✖ (`canBeHeld` false) | ✖ | ✖ | ✖ | 2026-11-02 |
| AirIndia / EGY (ne-3) | **No inventory** (1,618 searches empty) | ✖ | — | — | — | ✖ | ✖ | ✖ | ✖ | ✖ | 2026-11-02 |
| Amadeus / EGY (ne-3, ne-8, V1) | Many (CAI-JED ~70 offers) | — | — | — | — | — | ✔ | — | ✖ | — (Book 500) | 2026-10-29, 11-01 |
| GulfAir / KSA (staging, V2) | GF (BAH departures 2027-03 → 07) | — | — | — | ✔ | — | ✔ | — | — | — | SeatMap Rounds 1–20 |
| FlyAdeal / EGY (supplier-integration) | F3 (Nov 2026 → Mar 2027) | — | ✔ (required for SeatMap/Book) | — | ✔ | — | ✖ | — | — | — | SeatMap Round 21 |
| FlyNas / EGY | Offers returned (7) | — | — | — | — | — | — | — | — | — | Sabre Round 2 probe |
| FlyDubai / EGY | 409 internal error on Search | | | | | | | | | | Sabre Round 2 probe |
| Glc / EGY | 0 offers | | | | | | | | | | Sabre Round 2 probe |
| `Emirates` (V1) | **Invalid enum value**, not a valid supplier identifier | | | | | | | | | | 2026-08-05 |

**Booking-completion caveats:** Galileo/EGY direct Book fails ("FOP SELECTED NOT AUTHORIZED FOR CARRIER" or "INVALID CREDIT CARD") and leaves orphan held GDS PNRs. Amadeus/EGY V1 Book returns 500 for every valid booking. FlyAdeal Book leaves unticketed "Booked" PNRs with empty `gdsPNR`/`bookingToken`. So Families A/C/D/E (SPEC §5.2) cannot currently pass end to end for Galileo, Amadeus or FlyAdeal.

## 15. Cross-Cutting Contract Behaviour (confirmed live)

### 15.1 Error model

| Case | HTTP | Shape / code |
|---|---|---|
| Request validation / binding | 400 | camelCase envelope, `errorCode` `1001` (often leaks `.NET`/`*Dto` type names) |
| Business pre-check (e.g. pax rules) | 400 | PascalCase envelope, `NDC-INT-TEC-A0001` |
| Operation not supported by supplier | 409 | `OperationNotSupported`, context "`<Supplier>` does not exists" |
| Supplier failure / unmapped supplier error | 409 | `NDC-INT-UNC-Z9999`, often with `ErrorMessage == ErrorCode` and raw supplier payload |
| Stale / unavailable offer | 409 | `NDC-INT-BYP-A0001` |
| Repeat Void / cancelled trip | 409 | `NDC-INT-BYP-A0003` (Travelport) |
| Bad / missing `x-api-key` or `Client-Id` | 401 | `AuthenticationError` (**except Retrieve**, see §16) |
| Unknown `availabilityId` | 404 | `NotFoundResource` |
| Account or concurrency limits | 409 | `ReachedTALimit` (Sabre), "Too Many Requests Processing", Navitaire `NoBookingInState` |

Two envelope casings coexist on the same API, so clients cannot parse errors with one model. The server issues its own `CorrelationId` as a **response header**, not in the body.

### 15.2 Booking-state fields

- **`voidCapability`** (unified-void user story): live values are `FullVoidOnlyAllowed` and `VoidNotAllowed`. The literal `"None"` leaks on Hold and held Retrieve (SabreNdc), and the field is absent or `null` on PnrReprice. Book on SabreNdc returns `FullVoidOnlyAllowed` and Hold returns `VoidNotAllowed` from build B (2026-11-05).
- **`bookingStatus`**: observed `Booked`, `OnHold`, `FullyCanceled`, `UnKnown`. V1 Retrieve omits it (SabreNdc, TravelportNdc).
- **Void request:** `voidTickets` items must be objects `{ticketNumber, carrierCode, ticketStatus}` (strings → 400). An omitted or empty list voids all tickets. Void on a held booking: SabreNdc returns 400 "Only fulfilled, ticketed orders can be voided". TravelportNdc returned 200 `voided:false` and cancelled the hold in Round 1 (ne-5, 2026-10-26), then 409 Z9999 BUSINESS_CONFLICT with the hold kept in Round 2 (2026-10-27). Partial void is not honoured: any list voids everything.
- **Hold windows:** AirArabiaPlus ~75 min, SabreNdc ~5.4 days, Galileo to fare deadline (e.g. 2026-12-10), TravelportNdc QR ~1 week before departure. `holdExpirationDate` uses `Z` in V1 and `+02:00` in V2 (TravelportNdc).

### 15.3 Passenger rules (live)

- Party: adult required; ADT+CHD+INF ≤ 9 (infants count); INF ≤ ADT; one infant per adult, and the parent must be ADT. A 10-passenger request with infants returns an empty 200 instead of a validation error on some suppliers.
- Names (Amadeus, host-dependent): letters and spaces only; ne-8 caps each name at 25 characters and the full string at 59; ne-3 allows names of 2–50 letters, a single-passenger string of 57 or less and an ADT+INF pair of 51 or less. Hyphens, apostrophes and accented letters are rejected (AirArabiaPlus too).
- `ParentPaxRefId` is **ignored**: infants attach to adults in order of appearance (Amadeus, AirArabiaPlus ne-6 and ne-1). The fix for AirArabiaPlus BUG-18 (ADO 65513) did not work on ne-1 (2026-11-11).

### 15.4 Pricing

Price reconciliation (taxes + base = total) holds on most chains. Known exceptions:

- Seats must also be sent on FareCheck, otherwise Book adds a 5% seat tax (AirArabiaPlus).
- AirIndia Book drops the AB0500 tax on India-UAE.
- V1 paid-bundle multi-pax totals are mismatched (AirIndia).
- TravelportNdc V2 Book per-type amounts are already multiplied by count.
- FareConfirm reprices ~3% of SabreNdc offers below Search.
- V2 Retrieve lists one fare entry per passenger, while Search/Book list one per type.

### 15.5 Performance profile (observed, not SLA)

| Operation | Observed |
|---|---|
| Search | 3 s (GulfAir, Sabre) → 20 s (ne-1). The first call after idle can take up to 120 s (cold start). A silent supplier failure returns an empty 200 after ~15 s. |
| Book | 16–23 s (Sabre/Travelport), 30–50 s (GulfAir), ~45 s (V1, 6 pax) |
| Void | ~10–17 s |
| Unknown ids on V1 FareConfirm / Retrieve | Hangs ~135 s (AirIndia) |
| Safe parallelism | 4–6 workers. Sabre: one process. FlyAdeal: none. |

There is still no latency SLA (Part I §3 Non-Goals). SabreNdc BUG-12 (Book median 22 s vs 16 s) is the only latency defect logged.

## 16. Cross-Supplier Defect Themes (open as of last run)

Severity is as filed in each run's bug report. Each row is a pattern seen on more than one supplier or build. Per-run detail is in `Artifacts/BugReports/<slug>/`.

| # | Theme | Severity | Seen on (latest) |
|---|---|---|---|
| D1 | Retrieve ignores missing/invalid `x-api-key` and `Client-Id` (all other endpoints return 401) | Critical | SabreNdc ne-3 (2026-11-05), AirArabiaPlus ne-6 |
| D2 | Retrieve ignores `bookingToken` / works under another `credentialsSelector` (cross-tenant read) | Critical | AirIndia, AirArabiaPlus (USA booking read under EGY) |
| D3 | Hold/Book accept a mismatched or stale AddPassenger id pair | Critical | TravelportNdc, SabreNdc |
| D4 | `ResponseId` never validated on FareConfirm/Book (wrong, missing or cross-search accepted) | High | SabreNdc, AirIndia, Galileo, AirArabiaPlus |
| D5 | Repeat Book creates a second live PNR (no idempotency) | High | SabreNdc, AirArabiaPlus |
| D6 | Credentials or raw supplier payloads in error bodies and in `isDebug=true` responses (TargetBranch, WSSE username, SOAP security header, PII) | High | AirIndia, Galileo, SabreNdc ne-7, Amadeus, TravelportNdc |
| D7 | `ParentPaxRefId` ignored; Retrieve nulls infant parent | High | Amadeus, AirArabiaPlus, TravelportNdc |
| D8 | Void ignores `surName`, `bookingToken` content and `voidTickets` subset (voids all) | High | SabreNdc, TravelportNdc |
| D9 | `voidCapability` missing or `"None"` outside the two-value enum | High | SabreNdc (partly fixed build B), TravelportNdc, AirIndia (absent) |
| D10 | Retrieve after CancelAfterHold still shows `OnHold` | High | SabreNdc (V2, build B) |
| D11 | Failed Book leaves orphan GDS PNRs that cannot be cancelled via the API | High | TravelportNdc EK, Galileo |
| D12 | BookAfterHold tickets an expired hold | High | AirArabiaPlus |
| D13 | Two concurrent bookings received the same `bookingToken` | High | TravelportNdc (2 of 102) |
| D14 | Two error envelopes; `.NET`/DTO type-name leaks; unmapped Z9999 | Medium | All suppliers tested |
| D15 | Supplier timeout surfaces as empty `offers: []` with 200 instead of an error | Medium | AirIndia ne-3, AirArabiaPlus 3O, infant searches |
| D16 | Intermittent HTTP 500s and malformed ids returning 500 instead of 400 | Medium | SabreNdc build B, AirArabiaPlus, V2 Book without AddPassenger (Travelport) |
| D17 | V1 contract gaps: no tax items, no `paxTotalAmount`, no `bookingStatus`, Upselling returns `upsellOffers[]` not `selectedOffer` | High | TravelportNdc V1 (2026-08-05), SabreNdc V1 |

**Fixed and confirmed live:** SabreNdc repeat Void now returns 409 (was 200). Unknown offerId returns 400 (was 500). Retrieve/BookAfterHold `voidCapability` is fixed on build B. TravelportNdc V1 Void works and pnr/bookingToken/gdsPNR are now required (ne-5).

## 17. Features and User Stories in Scope (beyond the core chain)

| Feature | API surface | Status (2026-11-12) | Evidence |
|---|---|---|---|
| SeatMap + seat on Book / SeatAfterHold | GetSeatMap, Book `passengersSelectedSeats`, SeatAfterHold | Seat-on-Book works (GulfAir, FlyAdeal, AirArabiaPlus). SeatAfterHold unsupported everywhere tried. 22 rounds run. | `SeatMap_TestCases.csv`, SeatMap Round 1–22 logs |
| Galileo NDC Availability flow | Availability, Next, SelectAvailability, FareConfirm | Implemented. NextAvailability times out on some routes, and round-trip Select offers fail FareConfirm (409 4522). 215 TCs: 148/65/2. | `Galileo_Availability_Analysis.md`, Galileo Round 3 |
| SabreNdc Availability (port) | Same | Works for QR with no Galileo-style timeouts. Partial run 133/237: 112/20/1. g4–g8 not yet run. | SabreNdc ne-7 Round 2 |
| SabreNdc Void (INTI-WT1-T3230-035) | Void, `voidCapability` | Implemented. D8/D9 open. | `SabreNdc_Void_Analysis.md` |
| Unified Void Capability mapping (5 ACs) | `voidCapability` on Book/Hold/Retrieve/BookAfterHold/PnrReprice | Partially implemented. Expected values for unsupported suppliers and Hold are still open questions. | `VoidUnified_TestCases.csv` (67), SabreNdc rounds 1–2 |
| Shared Flights `HasSeat` flag (V2 only) | Search/FareConfirm `flightSegments`, Book/Hold rejection | **Not run.** Field name, casing and the supplier that returns shared flights are unknown. | `SharedFlights_Analysis.md`, `SharedFlights_TestCases.csv` (18) |
| FlyAdeal Bundle | GetOfferBundles → SeatMap/Book `selectedBundles` | Bundles required for SeatMap/Book. Codes FLY/FLYM/FLYP (domestic), FCAI/FINT (international). | `FlyAdeal_Bundle_Analysis.md`, Round 21 |
| Amadeus passenger-name limits | Hold/Book pre-check | Rules differ by host (§15.3). 9 bugs. Amadeus bookings cannot be cleaned up via the API. | Amadeus pax-name runs |
| AirArabiaPlus (Air Arabia One-API aggregator) | Full V2 chain | First full cycle: 397 TCs = 234/40/123, 24 bugs. Only G9 is bookable. | `AirArabiaPlus_OneAPI_Regression_TestCases.csv` |
| ParentPaxRefId fix (ADO 65513) | AddPassenger/Hold/Book/Retrieve | **Not fixed** on ne-1 (2026-11-11). | BUG-18 verification run |
| Reissue ("Implement Oman Air Reissue") | Reissue Search, Validation/Review, Reissue, Reissue Lookup (V2, §12.2 #21–24) | **Analyzed, not implemented or tested** (2026-11-17). Contract exists but not shared; first-round supplier undecided. See §17.1. | `Re-Issue_Analysis.md`, `Resources/Re-Issue_Feature/` (story + PRD v0.1 draft) |

### 17.1 Reissue feature (planned, V2)

**Source:** `Resources/Re-Issue_Feature/Re-Issue_User_Story.md`, the draft `OmanAir_Reissue_PRD_v0.1.pdf` (2026-11-15, every contract item TBD), and the stakeholder answers recorded in `Artifacts/Analysis/UserStoryAnalysis/Re-Issue_Analysis.md` (2026-11-17). Nothing below has been confirmed live. Today SPEC.md §1.9/§4.6 still say Exchange/re-issue = "Not Supported (No Endpoint)", and the supplier matrix shows Re-Issue = N/A for every supplier, including `OmanAirV17`.

**Scope (agreed):**

- **Version:** V2 only. V1 is out of scope.
- **Layer:** QA tests the Integration-layer endpoints that NDCCore calls (`Client-Id: NDC-Core`), not NDCCore itself.
- **Supplier:** a common, supplier-agnostic interface. The story names Oman Air (`OmanAirV17`, routes MCT–DXB, AMD–CAI, AUH–ADL), but the first-round supplier, `credentialsSelector` and `ne-N` host are not decided.
- **Process gate:** a kick-off with the CORE team before implementation. This is not testable through the API.

**Business rules (agreed):**

| Area | Rule |
|---|---|
| Eligibility | Ticketed **Booked** PNRs only. Held, voided, cancelled and partly flown bookings are rejected. |
| Date change | A single segment/direction **or** the whole itinerary. |
| Destination change | Origin and destination can both change. |
| Booking class change | Cabin and RBD, upgrade and downgrade. |
| Trip type change | **Not supported**, although the story's AC 2 lists it. Treat it as a negative case (expect rejection). |
| Combinations | Several criteria can change in one reissue. |
| Per-ticket reissue / split | Reissue is per passenger ticket. Reissuing a subset splits those passengers into a new PNR, the reissue result is on the new PNR, and the original and new PNRs are linked and updated. An infant moves with its adult (it cannot be split alone); a child can be split alone. |
| Whole-PNR reissue | Also produces a **new Reissue PNR**. |
| Repeat reissue | Allowed "where applicable"; the condition is undecided. |
| Penalties | Returned in the existing `rulesAndPenalties` text format (`Penalty Rule: (PenaltyType => Exchange), ...`). |
| Change fee | Supplier-provided, included in the reissue amount. |
| Discount | The Business rule is not approved; until it is, no discount is applied. |
| Payment | The form of payment is sent in the Reissue (commit) request. |
| Errors | The existing model (§15.1): 400 validation, 409 business/supplier conflict, 401 authentication. |
| Security | 401 on missing or invalid `x-api-key`/`Client-Id` on every reissue endpoint. Reissue Lookup must not return data under another `credentialsSelector` (do not repeat D1/D2). |
| Void after reissue | A reissued ticket can be voided (within the void window). |
| Test environment | Staging tickets can be reissued repeatedly; clean up with Void. |

**Testability today:** every reissue field-level assertion is BLOCKED until the contract is shared and SPEC.md gains the endpoints (§1.2, §2, §3, §4.6, §5/§6 need additions). Test cases can be drafted at behaviour level now. They use V2 Families A/D (SPEC §5.4) to arrange a ticketed booking and Family C for cleanup.

## 18. QA Assets and Coverage Inventory

- **Test cases:** 23 CSVs, ~2,570 rows in `NDC_Integration/TestCases/` (generic, V1, V2, SeatMap, Void, VoidUnified, SharedFlights, plus per-supplier regression and availability suites), in the Azure DevOps title format.
- **Request sources:**
  - `Postman_Collection/Collection_V1` (11 endpoints).
  - `Collection_V2`: the master V2 collection (17 endpoints), plus AirArabiaPlus and Galileo-availability variants.
  - Environments `STAG_ENV` and `AirArabiaPlus_USA_ne6`.
- **Harnesses:** `NDC_Integration/Harness/` (`V2/lib.js` chain client, `Galileo/`, `SabreNdc/`, `AirArabiaPlus/` runners, PowerShell V1 runners).
- **Workflow:** the `.claude/Skills` pipeline runs analyze-user-story → generate-test-cases → execute-test-cases → generate-qa-report → generate-bug-report → update-spec-from-findings, with `SPEC.md` as the living contract.
- **Evidence:** per-run `.jsonl` / `.md` / `.html` / `_TimeBreakdown.html` under `Artifacts/Logs/`, one folder per run under `Artifacts/BugReports/` (40+ runs), search sweeps under `Artifacts/SearchSweep/`, and an unknown-resolution tracker (`Artifacts/Analysis/UnknownResolutionTracker.md`, items still unassigned).
- **Coverage gaps:** BLOCKED rates are high because suppliers lack capability or inventory (e.g. SabreNdc V2 183/212 blocked, AirIndia ne-3 372/484). BLOCKED means "not executable on this supplier", not "passed". Cases that need an overnight ticket (void window, BIZ-01/BIZ-04) or midnight timing (BND-02) remain blocked in every round.

## 19. Operational Constraints for Testing

- **Supplier-only scope:** a supplier-scoped run sends no calls to other suppliers. Cross-supplier rows are recorded BLOCKED.
- **Inventory depletion:** about 100 test bookings sold out the AirArabiaPlus SHJ→COK low-fare seats. Spread routes and dates.
- **Route/date windows (as of 2026-11):**
  - G9: 10 Nov to 31 Dec 2026.
  - GulfAir: BAH departures March to early July 2027.
  - FlyAdeal: November 2026 to March 2027.
  - SabreNdc: offers to about D+250.
  - Re-check a single empty Search before concluding there is no inventory.
- **Cleanup limits:**
  - No API cleanup for Amadeus (CancelAfterHold 409), AirArabiaPlus (Void/Cancel 409) or FlyAdeal.
  - Orphan GDS PNRs from failed Books (TravelportNdc, Galileo) cannot be cancelled.
  - Live leftovers are listed in each run log's Cleanup section. Family B flows leave dangling holds by design (SPEC §5.2).
- **Concurrency:** run SabreNdc and FlyAdeal sequentially. Avoid more than 4–6 parallel chains elsewhere. Parallel Holds on one offer collide (INFANT QUOTA EXCEEDED, FLIGHT IS LOCKED).
- **Credential hygiene:**
  - The staging `x-api-key` is hard-coded in the collections, in `SPEC.md` §1.5 and in `Harness/_shared/lib.js` (see Gap #1).
  - `isDebug=true` responses can contain supplier credentials, so do not paste them into tickets unredacted.

## 20. Corrections to Part I and Additional Open Questions

**Corrections from live evidence:**

1. §1/§2 "11 endpoints": the live V2 surface is 17 endpoints plus Availability/SelectAvailability (and an unexplained `HoldVersion2`), so 20 routes in total (§12.2). Gap #14 understates the drift: FareRules, Availability and SelectAvailability are also unsupported by the framework.
2. §4.1 lists `Emirates` among valid `-Dagency` targets, but `Emirates` is rejected as an invalid supplier enum on the live V1 API.
3. §4.5 / §10 count inconsistency: 14 of 38 vs ~13/38 suppliers with `suppliers.json` entries. §4.5's 14 is the cross-referenced figure.
4. §4.5 "implicit defaults (can-be-held)": live data contradicts `suppliers.json` for several suppliers. AirIndia `canBeHeld` is false. AirArabiaPlus and SabreNdc have no bundles. The capability truth must come from a live FareConfirm (SPEC §4.7), not config.
5. §7 credential note: beyond being hard-coded, the static key is **not enforced at all on Retrieve** (D1). This raises Gap #1 from hygiene to a live security defect.
6. New supplier identifiers in use but absent from the 38-folder roster: `AirArabiaPlus`, `SabreNdc` (spelling), `TravelportNdc`, `Glc`.

**Additional open questions (API scope):**

- What is `HoldVersion2` (V1 path in the Galileo collection)? Is it a replacement for Hold, and for which suppliers?
- Is SeatAfterHold supported by any supplier yet? Every supplier tried returns 409.
- What are the expected `voidCapability` values for unsupported suppliers and for Hold (unified-void ACs)? Is `"None"` ever valid?
- Should E5 and 3O be bookable under AirArabiaPlus/USA, and should SV be served by SabreNdc/EGY and TravelportNdc/UAE?
- Which `ne-N` host maps to which named environment (STG, STG3, INT3, UAT…), and which host is the release-candidate gate?
- What is the target error contract: one envelope casing, and a mapped code for supplier errors instead of Z9999?
- What is the official void window per supplier (same calendar day vs 24 h)? The overnight cases are still unverified.

**Reissue open questions (§17.1, from `Re-Issue_Analysis.md`, 2026-11-17):**

- When will the Reissue contract (paths, request/response fields, error codes) be shared with QA?
- Which supplier(s), `credentialsSelector` and `ne-N` host does the first round target? Which `supplier` value applies (`OmanAirV17` vs `OmainAir`, Gap #12)?
- The story says "Oman Air" and includes Trip Type; the answers say common interface and no trip-type change. Will the story owner update the story?
- What makes a repeat reissue "applicable": fare rules, a maximum count, or a time limit?
- Which response fields expose the original ↔ new PNR link, and which `bookingStatus` does Retrieve show for a Reissue PNR?
- How is residual value handled when the new fare is lower (forfeit, refund, EMD)?
- Is the supplier change fee a separate line, and in which currency? Where does the `rulesAndPenalties` text appear (Search, Review or both)?
- What are the payment field names and accepted forms of payment?
- How long is a Review valid? Is there a change cut-off before departure, or a response-time target?
- What is the recovery if the split succeeds but the reissue fails? Is the commit idempotent per review id? What happens on a price change between Review and Reissue?
- What are the reissue-specific error codes inside the existing model?
- Which capability flag will gate Reissue per supplier (supplier matrix / `suppliers.json`)?
- Which supplier returns shared flights for the `HasSeat` story, and what are the field's exact name and casing?