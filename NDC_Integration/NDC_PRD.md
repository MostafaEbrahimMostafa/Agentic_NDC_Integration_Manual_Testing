# NDC Flight Engine Test Automation Framework — Product Requirements Document

## 1. Executive Summary

This framework is a Java/TestNG/RestAssured test automation suite that exercises the NDC Flight Engine's full airline-booking lifecycle — **Search → FareConfirm → Bundle/Upsell → AddPax → Book/Hold → Retrieve → Void** — against 38 supplier/agency test-data targets and two parallel API contract versions (V1 legacy, V2 current), selectable per JVM run via `-Dagency` and `-DapiVersion` (`TestDataHelper.java:72,82`, `config.properties`). It exists to catch two classes of risk that manual testing cannot cover economically: (1) booking-flow regressions in any one of dozens of supplier integrations, and (2) behavioral drift between the V1 and V2 API contracts as both are maintained in parallel (`EndpointResolver.java` — every endpoint has a distinct V1/V2 path, e.g. `api/FlightSearch/Search` vs `api/v2/FlightSearch/Search`). The framework runs one supplier per JVM/test execution (agency is a single resolved static value, not a loop over suppliers), which is a deliberate design constraint rooted in the shared static state architecture described in Section 5.

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

## 9. Roadmap Candidates (proposals — not commitments)

-   Externalize the hardcoded `x-api-key`/`client-id` in `PerformAPIsAssertions.performPost()` to environment variables or a genuine per-agency headers file, closing Gap #1/#8. Flagged per this project's guardrails as a credential-handling change requiring explicit sign-off before implementation.
-   Reconcile `suppliers.json` against the full 38-supplier TestData set (Gap #2), and fix the `Indego`/`Indigo` spelling mismatch (Gap #3) so bundle/hold capability gating is accurate for suppliers currently falling through to default behavior.
-   Update `doc/automation-testing-guide.md` Sections B and E to describe the actual config-driven `OneSupplierTests`/`SelectedOneSupplierTests` architecture instead of the per-supplier-class pattern that no longer exists (Gap #4) — this is a direct instruction in CLAUDE.md's own "Doc review" playbook.
-   Either build `AllSuppliersTests.java` to consume the already-existing `AllSuppliersBook`/`AllSuppliersHold` test data and providers, or remove the orphaned data/provider methods if multi-supplier fan-out is no longer intended (Gap #6).
-   Consider a lightweight in-framework V1/V2 response comparator (e.g., run both versions for the same scenario and assert structural/price parity) rather than relying on manual double-run comparison (Gap #7).
-   Widen negative-test coverage to the enrichment endpoints (SeatMap, GetAncillary, CancelAfterHold) which currently have positive-flow assertions (`AssertionFlags.PRE_SEAT_MAP`, `ANCILLARY`, `CANCEL_HOLD`) but no corresponding `NegativeXxx` classes or `testng.xml` group, unlike Search/FareConfirm/AddPax/Book/Hold/Bundle/Upsell.
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