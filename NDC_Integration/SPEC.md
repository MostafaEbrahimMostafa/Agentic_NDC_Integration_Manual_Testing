# NDC Integration API — QA Source-of-Truth Specification

> **Purpose of this document**: This is the single source of truth for **manual testing** of the NDC (New Distribution Capability) Integration Layer, covering (1) isolated single-endpoint request/response validation, (2) integration testing between endpoints, and (3) end-to-end flow testing across 89 defined flows (24 for API V1, 65 for API V2), gated by supplier capability. It is derived by reverse-engineering the V1 and V2 Postman collections, the shared Postman environment, the NDC PRD (which documents the underlying Java/TestNG/RestAssured automation framework that exercises this same API), and supporting supplier-capability documents. It does not merely restate those documents — business logic, validation rules, and dependencies not explicitly written down are **inferred** from script behavior and payload structure, and every such inference is labeled `INFERRED`. Anything that could not be determined from the available sources is labeled `UNKNOWN` rather than guessed.
>
> **Source documents consumed**: `NDC_Integration/NDC_PRD.md`, `Postman_Collection/Collection_V1/NDC_Integrations_Staging_Scripts_V1.postman_collection.json`, `Postman_Collection/Collection_V2/NDC_Integrations_Staging_Scripts_V2.postman_collection.json`, `Postman_Collection/Environment/STAG_ENV.postman_environment.json`, `NDC_Integration/Resources/flow.md`, `NDC_Integration/Resources/Integration 1_ Supplier Features & Routes.md`, `NDC_Integration/Resources/Airline Booking Availability (Production Credentials).md`, `NDC_Integration/Resources/supplier_matrix_template.md` (this last file is an empty column-header template only — it contributed the target schema for the capability matrix, not data). As of 2026-08-10, also: `NDC_Integration/Resources/Sample_API_Req&Res_V2.md`, `NDC_Integration/Resources/Seat map - Seatmap.md`, and `NDC_Integration/Resources/SeatMap QC Execution Checklist.md` — the latter two are QC-authored reference documents (not Postman-collection artifacts) and are treated as a **secondary, cross-checked source**: where they name a field/value that conflicts with the directly-inspected Postman collection JSON, the conflict is flagged (§2.7, §2.9) rather than silently merged.

---

## 1. Project Overview

### 1.1 Purpose

The NDC Integration Layer is a **supplier-abstraction API** sitting in front of ~38–50 airline/GDS supplier back ends (Amadeus, Sabre, Galileo, TravelportNDC, EgyptAir, Emirates, TkConnect, FlyNas, FlyAdeal, Air Arabia, FlyDubai, Indigo, SpiceJet, Oman Air, Salam Air, AlJazeera, Air Blue, Air Sial, SereneAir, Aegean, AJet, AirCairo, GLC, GulfAir, FlyCham, RiyadhAir, and others — see §4 Supplier Capabilities). A single caller-facing contract (`api/FlightSearch/*`, `api/FlightBooking/*`, `api/bundles/*`, and in V2 also `api/Passenger/*`, `api/Ancillary/*`, `api/SeatMap/*`) normalizes each supplier's native protocol (IATA NDC XML/JSON, EDIFACT, Navitaire, Open Travel, proprietary GDS formats — see the Supplier Features table, §4.1) into one JSON request/response shape. Callers drive a flight booking from **Search → FareConfirm (or Upsell) → \[Bundle/Ancillary/SeatMap enrichment\] → Book (direct) or Hold → FareConfirmAfterHold → BookAfterHold → Retrieve → Void/CancelHold**.

`INFERRED`: The PRD describes a Java/TestNG automation framework (`NDC Flight Engine Test Automation Framework`) that exercises this exact endpoint set against the same 38-supplier roster in both V1 and V2, and is the primary evidence for business logic that is not visible in the Postman collections alone (e.g., that V1 skips AddPax entirely, that assertions are soft-asserted and price-reconciled, that Book is auto-skipped in production). Where this document cites that framework's behavior, it is because the Postman collections implement the identical endpoints and — per the collection's own test scripts — the identical price-reconciliation logic, so the framework's documented behavior is a reliable proxy for API behavior even though the Postman collections themselves carry no Java code.

### 1.2 Supported APIs

| # | Logical Endpoint | V1 Path | V2 Path | Introduced In |
|---|---|---|---|---|
| 1 | Search | `POST api/FlightSearch/Search` | `POST api/V2/FlightSearch/Search` | V1 |
| 2 | FareConfirm | `POST api/FlightSearch/FareConfirm` | `POST api/v2/FlightSearch/FareConfirm` | V1 |
| 3 | Upselling | `POST api/FlightSearch/UpSelling` | `POST api/v2/FlightSearch/UpSelling` | V1 |
| 4 | GetOfferBundles | `POST api/bundles/GetOfferBundles` | `POST api/V2/bundles/GetOfferBundles` | V1 |
| 5 | AddPassenger | *not available* | `POST api/v2/Passenger/AddPassengerDetails` | **V2 only** |
| 6 | GetAncillary | *not available* | `POST api/v2/Ancillary/GetAncillary` | **V2 only** |
| 7 | GetSeatMap | *not available* | `POST api/V2/SeatMap/Seat` | **V2 only** |
| 8 | FareCheck | *not available* | `POST api/v2/Ancillary/FareCheck` | **V2 only** |
| 9 | Book | `POST api/FlightBooking/Book` | `POST api/v2/FlightBooking/Book` | V1 |
| 10 | Hold | `POST api/FlightBooking/Hold` | `POST api/v2/FlightBooking/Hold` | V1 |
| 11 | FareConfirmAfterHold | `POST api/FlightBooking/PnrReprice` | `POST api/v2/FlightBooking/PnrReprice` | V1 |
| 12 | BookAfterHold | `POST api/FlightBooking/BookAfterHold` | `POST api/V2/FlightBooking/BookAfterHold` | V1 |
| 13 | RetrieveBooking | `POST api/FlightBooking/RetrieveBooking` | `POST api/v2/FlightBooking/Retrieve` | V1 (path itself renamed in V2 — `RetrieveBooking` → `Retrieve`) |
| 14 | CancelAfterHold (a.k.a. CancelHold) | `POST api/FlightBooking/CancelAfterHold` | `POST api/V2/FlightBooking/CancelAfterHold` | V1 |
| 15 | Void | `POST api/FlightBooking/Void` | `POST api/V2/FlightBooking/Void` | V1 |
| 16 | SeatAfterHold | *not available* | `POST api/v2/SeatMap/SeatAfterHold` | **V2 only — added 2026-08-10, see §2.7a. No saved example/test script exists yet; treat as immature/under-specified.** |
| 17 | FareRules | *not available* | `POST api/v2/FlightSearch/FareRules` | **V2 only — added 2026-08-10 in the same collection update as #16. Out of scope for this document's SeatMap focus; noted here only for completeness (takes `fareConfirmResponseId`+`selectedOfferId`, no saved example).** |

`INFERRED`: Path casing differs inconsistently between V1/V2 and even within V2 itself (`api/V2/...` vs `api/v2/...` appear on different endpoints in the same V2 collection — e.g. Search/Bundles/SeatMap/BookAfterHold/CancelAfterHold/Void use `V2` while FareConfirm/Upselling/AddPassenger/Ancillary/Book/Hold/PnrReprice/Retrieve use `v2`). If the underlying route matching is case-sensitive this is a latent defect; if case-insensitive it is cosmetic only. **Testing Note**: verify case-sensitivity of the routing layer once, then this is not a per-endpoint concern — see §7 Testing Strategy.

The PRD additionally documents an **11-endpoint enumeration in its own terms** (Search, FareConfirm, Bundle, Upsell, AddPax, Ancillary, SeatMap, Book, Hold, BookAfterHold, FareConfirmAfterHold, Retrieve, Void, CancelAfterHold) that matches this table one-for-one, confirming the Postman collections are a faithful, complete representation of the endpoint surface the framework targets.

`INFERRED` **drift as of this update**: endpoints #16 (SeatAfterHold) and #17 (FareRules) were added to the V2 Postman collection on 2026-08-10 and have **no corresponding case** in the automation framework's `EndpointResolver`/`PayloadLoader`/`PreSeatMapAssertions` (confirmed by source grep — zero matches for `SeatAfterHold`, `passengersSelectedSeats`, or `FareRules` anywhere in `src/`). The PRD's 11-endpoint framework enumeration is therefore now **stale relative to the Postman-collection-derived API surface** by 2 endpoints (17 vs. 11, and a materially changed `Book` payload — see §2.9). This is flagged as a new Gap in `NDC_PRD.md` §8; this SPEC.md remains the more current source for the SeatMap-adjacent surface until the framework catches up.

### 1.3 Architecture

```
Caller
  │
  ▼
NDC Integration Layer  (baseUrl: https://ndc-integration-stg-ne-3.azurewebsites.net/  [staging])
  │  - Single normalized JSON contract per endpoint (V1 and V2 contracts differ — see §1.7)
  │  - Every request carries: supplier, credentialsSelector, plus endpoint-specific payload
  │  - Header-based static auth (x-api-key + Client-Id) — NOT per-supplier (see §1.5)
  ▼
Supplier Adapter Layer (per `supplier` field value)
  │  - Translates normalized request into the native supplier protocol:
  │    IATA NDC XML/JSON, EDIFACT (Sabre/ATPCO), Navitaire, Open Travel XML, proprietary GDS formats
  │  - See §4.1 Supplier Features & Routes for the protocol/format matrix
  ▼
Supplier Back End (airline or GDS system, e.g. Amadeus, Sabre, Galileo, FlyNas, EgyptAir, ...)
```

`INFERRED`: The adapter layer itself is not visible in the Postman collections (no separate "adapter" endpoint exists) — its existence is inferred from (a) the PRD's description of `EndpointResolver` routing per-version and (b) the fact that a single normalized request body (e.g., `Book`) must work identically for suppliers with fundamentally different native protocols (IATA XML vs Navitaire vs EDIFACT — see §4.1), which is only possible via a translation layer.

### 1.4 Versions

Two parallel, independently versioned API contracts exist side by side, selected by the caller via the **URL path** (not a header or query parameter) — there is no version-negotiation mechanism; the caller must know in advance which version a given integration/test expects.

| Aspect | V1 | V2 |
|---|---|---|
| Path segment | `api/FlightSearch/...`, `api/FlightBooking/...` (no version segment) | `api/v2/...` / `api/V2/...` |
| Endpoint count | 11 | 17 (as of 2026-08-10; was 15 — see §1.2 #16/#17) |
| Passenger data collection | Passed directly in `Book`/`Hold` payload (`passengersList`) — **no separate AddPassenger step** | Separate `AddPassenger` step (`api/v2/Passenger/AddPassengerDetails`) between FareConfirm/Bundle and the enrichment/booking steps |
| Ancillary services | Not available (no `GetAncillary`/`FareCheck` endpoints) | `GetAncillary` + `FareCheck` endpoints; ancillary selections passed via `PassengersSelectedAncillaries` on Book/Hold |
| Seat selection | Not available | `GetSeatMap` endpoint to browse; seats attach to a booking via **two asymmetric mechanisms** (added 2026-08-10, §2.7/§2.7a/§2.9): direct-Book carries an inline `passengersSelectedSeats` field, while the Hold branch has no such field on `Hold`/`BookAfterHold` and must instead call the new standalone `SeatAfterHold` endpoint against an already-held PNR |
| Fare re-validation before booking | Not available as a distinct step | `FareCheck` endpoint (used only in Bundle+Ancillary / SeatMap+Ancillary flow combinations per flow.md) |
| Bundles | Available (`GetOfferBundles`) | Available (`GetOfferBundles`), can be combined with AddPassenger/Ancillary/SeatMap |
| Retrieve path name | `RetrieveBooking` | `Retrieve` |
| `ADT_Count`/`CHD_Count`/`INF_Count` collection variables | Defined (default `2`/`2`/`2`) — consumed by test-script price reconciliation | **Not defined in the V2 collection**, yet V2 request test scripts (Hold, FareConfirmAfterHold, BookAfterHold) still call `pm.collectionVariables.get("ADT_Count")` etc. `INFERRED` **defect/gap**: unless a tester manually adds these three variables to the V2 environment/collection, those price-reconciliation assertions will silently evaluate against `undefined`, producing `NaN` comparisons that may falsely pass or throw. Flag as a Testing Note (§7) rather than silently fix.

Full endpoint-by-endpoint contract differences are in §2 (Endpoint Specifications); business-logic-level V1/V2 differences are in §1.7.

### 1.5 Authentication

Both V1 and V2 use **static, hardcoded HTTP headers** on every request — there is no OAuth/bearer-token flow, no per-supplier credential header, and no session/cookie state visible anywhere in either collection:

| Header | Value (staging) | Notes |
|---|---|---|
| `x-api-key` | `ttdb2dc2-58c5-481c-84b5-95350a3a7978-f61360c2-f536-4b19-9a25-97b8f17ce4dc` | Identical across **every** request in both collections, all suppliers |
| `Client-Id` / `client-id` (casing varies per request) | `NDC-Core` | Identical across every request |
| `CorrelationId` | Present but **disabled** on `CI_FlightSearchRequest` only in V1; absent everywhere else | `INFERRED`: intended for support-escalation tracing (per PRD §7 "correlation-ID tracing threaded through failures") but not actually wired into the working request set — a request-tracing gap |

`INFERRED` (confirmed by PRD §7/§5 Gap #1): this is a known, explicitly-flagged tech-debt item in the framework this API serves — `x-api-key`/`Client-Id` are sent identically regardless of `supplier`, `credentialsSelector`, or environment. **Testing implication**: authentication itself is not a meaningful per-supplier or per-flow test dimension (there's exactly one static key to test: valid vs invalid/missing `x-api-key`, valid vs invalid `Client-Id` — see §7 Security Tests). The real "identity" selection happens through the **body-level** `supplier` + `credentialsSelector` fields, not headers — this is the actual per-tenant/per-credential-set mechanism and is where negative-auth-adjacent testing should focus (invalid `supplier`, invalid `credentialsSelector` combination, mismatched `Credentials_Selector` region).

### 1.6 Environment

Single Postman environment supplied: `STAG_ENV`.

| Variable | Default Value | Purpose |
|---|---|---|
| `baseUrl` | `https://ndc-integration-stg-ne-3.azurewebsites.net/` | Staging host; overrides the V1 collection's own default (`https://ndc-supplier-integration.azurewebsites.net/`) — **Testing Note**: the two base URLs are different hosts entirely, so if the environment is not selected, requests silently go to a different (possibly stale/unmaintained) staging host |
| `Supplier_Name` | `TravelportNdc` | Selects which supplier adapter handles the request — this is the primary "which supplier am I testing" switch for every manual test session |
| `Credentials_Selector` | `UAE` | Selects which credential/region set the adapter uses for the chosen supplier — `INFERRED` this models multi-tenant/multi-region credential sets per supplier (e.g., a supplier certified for both UAE and KSA agencies) |

No other environment-scoped variables exist. All other state (`searchResponseId`, `offerId`, `fareConfirmResponseId`, `pnr`, `bookingToken`, `gdsPNR`, etc.) is **collection-scoped**, set by test scripts at runtime and consumed by the next request in the chain — this is the Postman-native equivalent of the PRD's "mutable `Map<String,Object>` context object" pattern (PRD §5), and it means: **running requests out of order, or against a different supplier mid-chain, produces stale/mismatched IDs that the API is expected to reject** — this is a first-class negative-test scenario (§7).

`INFERRED`: `Credentials_Selector` = `"UAE"` combined with `Supplier_Name` = `"TravelportNdc"` in the shipped environment is simply whatever the last tester was working on — **not a canonical default test scenario**. Any endpoint/flow test must explicitly choose (and document) its `Supplier_Name`/`Credentials_Selector` pairing per §4 Supplier Capabilities before asserting pass/fail, since capability (Bundle/Hold/Ancillary support) is supplier-dependent.

### 1.7 Supplier Concept

Every request body carries two fields that together select the live backend and its credential context:

- **`supplier`** (string, required on every endpoint): one of the ~38–50 supplier identifiers (e.g., `TravelportNdc`, `FlyNas`, `EgyptAir`, `Emirates`, `SabreNDC`, `Amadeus`, `AirArabia`, `RiyadhAir`, ...). `[Confirmed live 2026-08-05]` supplier-name matching is case-**insensitive** but spelling-exact: `TravelportNdc` / `TravelportNDC` / `travelportndc` all resolve identically (67 offers each), while `Indego` is rejected as an invalid enum value and `Indigo` is accepted — the PRD's documented name-mismatch bugs (`Indego` vs `Indigo`, `ElJazeeraV4` vs `ElJazeera`, `OmanAirV17` vs `OmainAir`) are spelling bugs, not casing bugs. Also, `Emirates` is **not** a valid enum value on the live V1 API — it fails deserialization to `NDC.Integrations.Application.Dtos.Api.Supplier` in every casing tried — so it must not be cited as a valid supplier identifier example. An unrecognized or misspelled `supplier` value is expected to fail distinctly from a recognized-but-incapable supplier (see §2 Search endpoint negative cases).
- **`credentialsSelector`** (string, required on every endpoint): selects the credential/region context for that supplier (e.g., `UAE`). `UNKNOWN`: the full enumeration of valid selector values per supplier was not present in any source document — must be confirmed against the live adapter config before writing supplier-specific negative tests for this field.

Every downstream endpoint in a chain re-sends both `supplier` and `credentialsSelector` on every call (Search, FareConfirm, Book, Hold, Retrieve, Void, etc. all repeat them) — `INFERRED` this is a stateless-per-call authorization re-check, not just a session anchor, meaning **a chain that changes `supplier`/`credentialsSelector` mid-flow is testable as a negative case** (e.g., Search with supplier A, then FareConfirm with supplier B using A's `searchResponseId`/`offerId` — expected to fail, exact behavior `UNKNOWN`, needs confirmation but is a high-value negative test per §7).

### 1.8 Credentials

`INFERRED` from the "Airline Booking Availability (Production Credentials)" document and PRD §7: this project distinguishes **technical connectivity** (does the adapter exist and does auth succeed) from **commercial/business authorization** (is this specific supplier/airline actually allowed to be booked and ticketed in production). The whitelist/blacklist document is a **business policy gate layered on top of the technical API** — a supplier can be technically reachable (Search/FareConfirm succeed) while being commercially blacklisted for booking. See §4.3 for the full whitelist/blacklist table. This is a distinct dimension from the supplier *capability* matrix (§4.2) and both must be checked independently when scoping a flow test: **capability** answers "can this supplier technically do X", **credentials/whitelist** answers "are we allowed to actually do X with this supplier in this environment."

`UNKNOWN`: the actual value of the production `x-api-key`/credential secrets is intentionally not reproduced in this document (per this project's own credential-handling guardrail, echoed from the PRD's Gap #1 finding) — QA engineers should obtain live staging/production credentials through the team's standard secret-distribution channel, not from this file.

### 1.9 Capabilities (Summary)

Full detail in §4; summarized here for orientation:

- **Universal across all suppliers** (every flow in flow.md assumes these work): Search, FareConfirm (or Upselling as an alternative fare-selection path), Book, Retrieve.
- **Supplier-conditional** (must be checked per supplier before scheduling a flow, §4.2): Bundle/GetOfferBundles, Hold→FareConfirmAfterHold→BookAfterHold, CancelAfterHold, Void, and (V2-only) AddPassenger-adjacent enrichments GetAncillary/GetSeatMap/FareCheck.
- **Not implemented anywhere in either API version** (no corresponding endpoint exists in either collection): Refund, Exchange, PNR modification/re-issue outside the Void/CancelHold terminal actions. Any flow or test case referencing Refund/Exchange is out of scope for this API surface — mark such requests as `Not Supported (No Endpoint)`, not as a supplier gap.

### 1.10 Version Differences (Business Logic)

Beyond the path/endpoint differences in §1.4, the following **behavioral** differences are `INFERRED` primarily from the PRD (§4.3, §2 FR-7) and cross-checked against the collections' payload shapes:

1. **AddPax routing**: V1 has no AddPassenger endpoint — passenger data is embedded directly in the `Book`/`Hold` request body (`passengersList`, `contactsList`). V2 requires a dedicated `AddPassenger` call after FareConfirm/Bundle and before Book/Hold/enrichment steps; V2's `Book`/`Hold` bodies observed in the collection carry **no `passengersList` at all** — passenger identity is presumed carried server-side against the `ResponseId`/`selectedOfferId` established by AddPassenger. This is the single largest structural difference between the two contracts.
2. **Direct-booking shortcut**: `INFERRED` (PRD §4.3, `registerDirectBookingFlowForV1`) — V1 routes FareConfirm (or Bundle) output straight into Book/Hold without any intermediate passenger step, consistent with (1).
3. **Fare re-validation**: V2 introduces `FareCheck` as an explicit step, used in flow.md specifically in combination with Bundle+Ancillary, SeatMap+Ancillary, and their supersets — `INFERRED` this exists because ancillary/seat selection can change the priced total, and `FareCheck` re-validates price before the caller commits to Book/Hold. V1 has no equivalent because it has no ancillary/seat selection to invalidate the fare.
4. **Price reconciliation test logic is identical across both versions** — the same "taxes match / base amount matches / grand total matches" `pm.test` assertions appear verbatim in both collections' Search, FareConfirm, Upselling, Book, Hold, Retrieve, FareConfirmAfterHold, and BookAfterHold test scripts, confirming both versions are expected to honor the same pricing-integrity contract (see §2 for the formula) — this is the one piece of business logic proven identical across versions, not inferred.
5. **No in-framework V1↔V2 comparator**: `INFERRED` (PRD §4.3 coverage caveat, Gap #7) confirmed by the fact that neither Postman collection references the other — comparing V1 vs V2 behavior for the same supplier/scenario is a **manual, external** QA activity (run the same logical scenario in both collections, diff results by hand). This document's Integration/Flow sections are written to make that manual diff tractable.
6. **Seat-selection attach point differs by branch, added 2026-08-10** (§2.7/§2.7a/§2.9/§2.10): V1 has no seat-selection concept at all (consistent with (1) — no ancillary/seat model exists). In V2, the direct-Book branch accepts seats **inline** on the `Book` request itself (`passengersSelectedSeats`); the Hold branch's `Hold`/`BookAfterHold` requests were **not** updated with this field (confirmed absent from both saved examples) and instead require calling the new, separately-versioned `SeatAfterHold` endpoint against the PNR produced by `Hold`. `INFERRED` this asymmetry is *why* `SeatAfterHold` exists as a distinct endpoint rather than the Hold payload simply gaining the same field Book did — but the exact chain position (before/after `FareConfirmAfterHold`, before/after `BookAfterHold`) is `UNKNOWN` and must be confirmed live (§2.7a).

---

## 2. Endpoint Specifications

**Conventions used in this section:**
- Every endpoint is documented once, covering both V1 and V2 where both exist; differences are called out inline.
- "Response Mapping" fields are drawn either from an actual saved example response in the V2 collection (`INFERRED` label omitted — these are ground truth, marked **`[Observed example]`**) or from fields the test scripts read via `pm.response.json()` (marked `INFERRED` from script behavior). V1 has **no saved example responses** at all (`"response": []` on every V1 request) — V1 response shapes are inferred entirely from its test scripts, which are near-identical to V2's, so V1 response shape is assumed structurally identical to the equivalent V2 example unless a V1-specific script proves otherwise.
- All monetary fields observed follow the shape `{ "amount": <number>, "currency": <ISO 4217 string> }`.
- `credentialsSelector`/`supplier` are omitted from the "Required Request Fields" table only when a field-by-field table follows immediately — they are implicitly required on **every** endpoint (see §1.7) and are listed explicitly once per endpoint for completeness.

---

### 2.1 Search

**Purpose**: Query a supplier for available flight offers on one or more origin/destination/date criteria, for a specified passenger mix. This is the entry point of every flow — every one of the 89 flows in flow.md begins with Search.

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightSearch/Search` | `{{baseUrl}}api/V2/FlightSearch/Search` |
| Method | POST | POST |

**Headers**: `x-api-key` (static secret, §1.5), `Client-Id`/`client-id` = `NDC-Core`. `CorrelationId` present-but-disabled in V1's saved request only — not functionally sent.

**Authentication**: Header-based static key only (§1.5); real authorization is the body's `supplier` + `credentialsSelector` pair.

**Required Inputs** (caller-supplied, pre-request): a valid `Supplier_Name` and `Credentials_Selector` environment selection (§1.6); at least one origin/destination/date search criterion; passenger type/count mix.

**Optional Inputs**: `searchModifiers.filterationCriteria.preferredAirlines` (V1 example shows an array of 2-letter carrier codes) and — `INFERRED` from the name — likely sibling filters (cabin, restricted airlines, direct-only) that were not exercised in either collection's saved request bodies; **`UNKNOWN`** beyond `preferredAirlines`, needs confirmation against live API/Swagger before writing exhaustive filter test cases.

**Required Request Fields**:

| Field | Type | Notes |
|---|---|---|
| `supplier` | string | Supplier identifier (§1.7) |
| `credentialsSelector` | string | Credential/region selector (§1.7) |
| `searchCriteria` | array of `{origin, destination, date}` | At least one entry observed in both collections; `INFERRED` multi-city (>1 entry) is supported since it's modeled as an array, **not directly evidenced** — mark as `UNKNOWN`/needs-confirmation for multi-city-specific test cases |
| `searchCriteria[].origin` / `.destination` | string (IATA 3-letter code) | e.g. `CAI`, `JED` |
| `searchCriteria[].date` | string (`YYYY-MM-DD`) | Departure date |
| `passengers` | array of `{passengerTypeCode, count}` | Observed values: `ADT`, `CHD`, `INF` |

**Optional Request Fields**: `isdebug` (boolean — observed `true` in both collections' saved requests; `INFERRED` toggles verbose `supplierRequest`/`supplierResponse` echo fields in the response, since those two fields are present in the V2 example response, §2.1 Response Mapping — a debug/diagnostic passthrough of the raw supplier SOAP/XML request+response, extremely useful for supplier-level troubleshooting during manual testing); `searchModifiers.filterationCriteria.preferredAirlines`.

**Request Rules / Validation** (`INFERRED`):
- `passengers[].count` presumably must be ≥1 when the type is present at all (no zero-count examples observed); `UNKNOWN` whether omitting a passenger type entirely (e.g., no CHD/INF at all) vs. sending `count: 0` are handled identically.
- **Total passenger count across all types (`ADT`+`CHD`+`INF` combined) must not exceed 9** — a confirmed business rule (standard industry/GDS booking-unit limit), not inferred from the collections. This is a hard upper bound the API is expected to enforce regardless of supplier; a search request totaling 10 or more passengers is a first-class negative/boundary test (§7.8) and should be rejected — exact rejection behavior (4xx at Search itself vs. accepted-then-rejected downstream) is `UNKNOWN`, confirm live.
- `searchCriteria[].date` must be a real, presumably future, date — the collections' saved dates are always ahead of the environment's export date, consistent with airline search semantics (no reason to expect past-date search to succeed).
- `origin`/`destination` must be valid IATA airport codes recognized by the target supplier's route network (§4.1 Supplier Routes) — searching a route the supplier does not fly is a **valid negative/boundary test**, expected to return zero offers rather than an error (`UNKNOWN` — confirm whether it's an empty `offers: []` 200 response or a 4xx).

**Dynamic Values**: `responseId` (returned, becomes `searchResponseId`), `offerId` (per offer, becomes `offerId` collection variable for the first offer by convention — `selectedOffer = responseJson.offers[0]`, i.e. **the test script always selects the first offer in the array**, not a specific fare/price — a hardcoded convention worth noting for boundary testing, e.g. what if `offers` is empty?).

**Dependencies**: None upstream (entry point). Downstream: FareConfirm and Upselling both require `searchResponseId` + a chosen `offerId` from this response.

**Business Logic**:
- `INFERRED`: server performs live availability query against the supplier back end (evidenced by the V2 example's `supplierRequest`/`supplierResponse` fields containing a real OTA/SOAP round trip) and normalizes results into the `offers[]` array.
- Price-integrity contract (**proven, not inferred** — identical `pm.test` logic appears in both V1 and V2's Search... wait, V2 Search test script is actually empty per our earlier finding; only **V1** Search has this check): for each `offer`, per passenger type: `sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount`; `sum((paxBaseAmount.amount + taxes) * paxCount)` reconciles to `priceDetails.totalAmount.amount`; `priceDetails.totalBaseAmount.amount == sum(paxBaseAmount * paxCount)`; `priceDetails.totalTaxAmount.amount == sum(taxes * paxCount)`. **Version difference**: this reconciliation is asserted in **V1 Search only** — the V2 Search test script only sets `searchResponseId`/`offerId` and asserts nothing else (`INFERRED` test-coverage gap, §7).

**Expected Success Response** `[Observed example, V2]` — HTTP 200:
```
responseId, supplier,
journeys: { <segmentRefId>: {origin, destination, numberOfStops, segmentRefIds[]} },
flightSegments: { <segmentRefId>: {origin, destination, departureDateTime, arrivalDateTime, departureTerminal, arrivalTerminal, flightTime, operatingCarrierCode, operatingFlightNumber, marketingCarrierCode, marketingFlightNumber, equipment} },
priceClasses: { <ref>: {priceClassName, fareDescription, rulesAndPenalties} },
baggageDetails: { <ref>: {carryOnBaggage, checkInBaggage} },
offers: [ {
    offerId,                       // opaque, long encoded/compressed token — NOT a simple UUID (see Dynamic Values)
    offerJourneys: [segmentRefId],
    passengerFareBreakdown: [ {paxTotalAmount, passengerTypeCode, paxTotalTaxAmount, paxBaseAmount, taxesAndFees[{code, amount}], segmentDetails[{segmentRefId, priceClassRefId, baggageDetailsRefId, cabinCode, rbd}], discount} ],
    priceDetails: {totalAmount, totalTaxAmount, totalBaseAmount, taxesAndFees[], discount},
    refundability, haveBundles, canBeHeld,
    isDealCodeApplied, appliedDealCode, isPromoted, appliedPromotionCode,
    isAncillaryRequired, offerHasAncillary, isBaggageRequired, isMealRequired, isSeatMapRequired
} ],
supplierRequest,   // raw upstream request (XML/SOAP observed for AirArabia) — present when isdebug=true
supplierResponse   // raw upstream response
```
**Critical field**: `offers[].haveBundles` / `canBeHeld` / `offerHasAncillary` / `isSeatMapRequired` are **per-offer, per-search-result capability flags returned live by the supplier**, not static config — `INFERRED` this is the authoritative, real-time source of truth for "can I Bundle/Hold/Ancillary/SeatMap this specific offer," which should **take precedence over the static supplier capability matrix in §4.2** when the two disagree (the static matrix tells you what to expect before searching; the live `offers[]` flags tell you what's actually true for this specific search result, right now). **Testing Note**: every flow-gating decision in §5 (Flow Analysis) should be spot-checked against these live flags, since capability can vary by route/date/fare, not just by supplier.

**Expected Failure Responses**: `UNKNOWN` — no negative example response was present in either collection. `INFERRED` candidates to verify live: 400 for missing required fields (`supplier`, `searchCriteria`, `passengers`), 401/403 for invalid `x-api-key`, a supplier-specific error/empty-offers response for an unrecognized `supplier` value or a route the supplier doesn't serve.

**Response Mapping**: see block above. Fields consumed downstream: `responseId` → `searchResponseId`; `offers[0].offerId` → `offerId`.

**Response Validation Rules**: (1) `offers` array non-empty for a valid, serviced route/date; (2) every offer's price reconciliation holds (V1: enforced by script; V2: not enforced by script but still a valid manual-test assertion); (3) `offerId` is a non-empty opaque string safe to round-trip verbatim into FareConfirm.

**IDs Generated**: `responseId` (→ `searchResponseId`), `offers[].offerId` (→ `offerId` for the selected offer).

**IDs Required By Next Endpoint**: none (entry point).

**Common Errors**: malformed date format; unrecognized `supplier` string (§1.7 spelling-sensitivity); route not served by supplier → empty `offers[]`.

**Edge Cases**: zero passengers of any type; single-passenger search; maximum passenger count (`UNKNOWN` upper bound — cross-reference supplier capability doc's "Max Passenger Count" column, itself empty/`UNKNOWN` in the source template); one-way vs. round-trip (only one-way examples observed — `searchCriteria` as an array suggests round-trip = 2 entries, `UNKNOWN`, needs confirmation); multi-city (3+ `searchCriteria` entries) — `UNKNOWN`.

**Negative Cases**: missing `supplier`; missing `searchCriteria`; invalid IATA code (e.g., `"XXX"` or lowercase `"cai"` — case-sensitivity `UNKNOWN`); past date; passenger count of 0 for all types; invalid `credentialsSelector` for the given `supplier`.

**Testing Notes**: Because the test script always takes `offers[0]`, single-endpoint isolated tests of Search should **also** assert on the full `offers[]` array shape (count, ordering/sort criteria if any — `UNKNOWN` sort order guarantee), not just the first element, since that's what a real caller-facing UI would need. Confirm live whether `isdebug: false`/omitted suppresses `supplierRequest`/`supplierResponse` (bandwidth/security consideration for production).

---

### 2.2 FareConfirm

**Purpose**: Re-confirm/re-price a specific offer selected from Search results, returning a `selectedOffer` with guaranteed-current pricing and (in V2) capability flags for downstream Bundle/AddPassenger/Ancillary/SeatMap decisions. This is the standard fare-selection path; **Upselling (§2.3) is the alternative path** — a flow uses one or the other, not both (confirmed by flow.md: every flow lists either FareConfirm or Upselling, never both in sequence before Book/Hold).

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightSearch/FareConfirm` | `{{baseUrl}}api/v2/FlightSearch/FareConfirm` |
| Method | POST | POST |

**Headers**: standard (§1.5).

**Required Inputs**: a prior Search response (`searchResponseId`, selected `offerId`).

**Required Request Fields** (V1):

| Field | Type |
|---|---|
| `supplier` | string |
| `credentialsSelector` | string |
| `searchResponseId` | string (from Search) |
| `selectedOfferId` | string (from Search's `offers[].offerId`) |

**Required Request Fields** (V2) — **field name difference**: V2 uses `ResponseId` (capital R) in place of V1's `searchResponseId`:

| Field | Type |
|---|---|
| `supplier` | string |
| `credentialsSelector` | string |
| `ResponseId` | string (from Search's `responseId`) |
| `selectedOfferId` | string |

`INFERRED` **naming inconsistency, testing note**: V1 calls this field `searchResponseId`; V2 calls it `ResponseId`. A test harness parameterized across both versions must not assume a shared field name — this is a genuine contract difference, not a typo (it recurs consistently across V2's FareConfirm, Upselling, GetOfferBundles, AddPassenger, GetAncillary calls, all of which use `ResponseId`/`CredentialsSelector` PascalCase-leaning keys instead of V1's camelCase).

**Optional Request Fields**: none observed.

**Request Rules**: `searchResponseId`/`ResponseId` and `selectedOfferId` must both originate from the **same** prior Search call and correspond to a still-valid, unexpired offer — `UNKNOWN` exact TTL, but see §3 Integration Analysis for the general expiration risk pattern common to all `responseId`-keyed flows.

**Business Logic**:
- V1: price-reconciliation test identical to Search's (§2.1) — proven, script-enforced.
- V2: `INFERRED` **no price-reconciliation test exists in the V2 FareConfirm script** (only sets `fareConfirmResponseId`/`fareConfirmSelectedOfferId`) — a coverage gap relative to V1, flagged for §7.
- V2's `selectedOffer` carries additional capability flags not present in V1's response: `haveBundles`, `canBeHeld`, `isAncillaryRequired`, `offerHasAncillary`, `isBaggageRequired`, `isMealRequired`, `isSeatMapRequired` (`[Observed example]`) — these are the **authoritative per-offer gates** for whether to route into GetOfferBundles / Hold / GetAncillary / GetSeatMap next (see §3 Integration Analysis, §5 Flow Analysis). V1's FareConfirm response was not captured as an example, but since V1 has no Ancillary/SeatMap concept at all, `UNKNOWN` whether V1's `selectedOffer` carries `haveBundles`/`canBeHeld` equivalents — `INFERRED` it likely does carry at least `haveBundles`/`canBeHeld` since V1 supports Bundle and Hold.

**Expected Success Response** `[Observed example, V2]`:
```
responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails,
selectedOffer: {
    offerId, offerJourneys, passengerFareBreakdown, priceDetails, refundability,
    haveBundles, canBeHeld,
    isDealCodeApplied, appliedDealCode, isPromoted, appliedPromotionCode,
    isAncillaryRequired, offerHasAncillary, isBaggageRequired, isMealRequired, isSeatMapRequired
}
```

**Expected Failure Responses**: `UNKNOWN` (no example). `INFERRED`: stale/expired/mismatched `searchResponseId`+`selectedOfferId` pair should 4xx or return a supplier-level "offer no longer available" error — high-value negative test (§7).

**Response Mapping**: `responseId` → `fareConfirmResponseId`; `selectedOffer.offerId` → `selectedOfferId` (V1) / `fareConfirmSelectedOfferId` (V2).

**Response Validation Rules**: price reconciliation (V1 enforced, V2 recommended manual check per above); `selectedOffer.offerId` present and non-empty; (V2) capability flags present and boolean-typed.

**IDs Generated**: `responseId` → `fareConfirmResponseId`; `selectedOffer.offerId` → `selectedOfferId`/`fareConfirmSelectedOfferId`.

**IDs Required By Next Endpoint**: `searchResponseId`/`ResponseId` + `offerId` from **Search** (input); produces `fareConfirmResponseId` + `selectedOfferId` consumed by GetOfferBundles, AddPassenger (V2), and directly by Book/Hold (V1).

**Common Errors**: offer/search ID mismatch or expiry; supplier-side price change invalidating the original offer.

**Edge Cases**: re-confirming the same offer twice in a row (idempotency — `UNKNOWN`); confirming an offer whose underlying inventory sold out between Search and FareConfirm (a realistic race condition worth a manual test, expected to surface as a distinct "offer unavailable" error rather than a generic 500).

**Negative Cases**: mismatched `searchResponseId`/`selectedOfferId` from two different Search calls; expired offer; wrong `supplier` value relative to the one used at Search time (§1.7).

**Testing Notes**: Because V2 introduces the capability flags here, **isolated single-endpoint testing of V2 FareConfirm should explicitly assert on all six flags** even though the collection's own script doesn't — they are the pivot point for every downstream branch in the V2 flow tree (§5).

---

### 2.3 Upselling

**Purpose**: Alternative to FareConfirm — presents the caller with upsell offer(s) (e.g., higher fare class/bundle) tied to the same Search result, letting the caller pick a richer fare product instead of the originally-searched one. `INFERRED` from field name `upsellOffers` (plural, V2 observed) that Upselling can return **multiple** upsell options per original offer, unlike FareConfirm's single `selectedOffer`.

| | V1 | V2 |
|---|---|---|
| URL | `{{requestUrl}}api/FlightSearch/UpSelling` ⚠ | `{{baseUrl}}api/v2/FlightSearch/UpSelling` |
| Method | POST | POST |

⚠ **Testing Note / Defect**: V1's Upselling request uses the `{{requestUrl}}` collection variable instead of `{{baseUrl}}` — `requestUrl` is defined as an **empty** collection variable in V1 (§1.4) and is **not** set anywhere in the shipped `STAG_ENV` environment. As shipped, running V1 Upselling as-is will produce a malformed URL (empty host). This must be fixed locally (set `requestUrl` = the same value as `baseUrl`) before V1 Upselling can be tested — flag this to the team as a collection defect, don't silently work around it without recording it.

**Required Request Fields** (V1) — identical shape to FareConfirm:

| Field | Type |
|---|---|
| `supplier`, `credentialsSelector` | string |
| `searchResponseId` | string |
| `selectedOfferId` | string |

**Required Request Fields** (V2) — note the field-name/casing pattern differs *yet again* from both V1-Upselling and V2-FareConfirm:

| Field | Type |
|---|---|
| `supplier` | string |
| `CredentialsSelector` | string — **PascalCase here**, unlike V2 FareConfirm's lowercase `credentialsSelector` |
| `ResponseId` | string |
| `selectedOfferId` | string |

`INFERRED` **testing note**: V2's `CredentialsSelector` capitalization on Upselling specifically (vs. `credentialsSelector` everywhere else in V2) is very likely a copy-paste inconsistency in the collection rather than an intentional contract difference — `UNKNOWN` whether the live API is case-sensitive on JSON key matching (most JSON deserializers are case-insensitive by default in .NET, which would make this cosmetic) — worth a single confirmatory test, not a per-flow concern.

**Business Logic**: Same price-reconciliation contract as FareConfirm when present (V1: enforced by script, using `selectedOffer` — `INFERRED` **inconsistency**: V1's Upselling test script reads `resp.selectedOffer.offerId` [singular], while V2's Upselling script reads `resp.upsellOffers[0]` [plural array] — i.e. **V1's Upselling response shape mirrors FareConfirm's single-offer shape, while V2's Upselling response shape mirrors Search's multi-offer array shape**. This is a meaningful, evidenced V1/V2 structural difference, not just a naming one.

**Expected Success Response**:
- V1 (`INFERRED` from script): same shape as FareConfirm's `selectedOffer`.
- V2 (`INFERRED` from script, no saved example): `{ responseId, upsellOffers: [ {offerId, ...fare breakdown fields matching Search's offers[] shape} ] }`.

**Response Mapping**: V1 → `fareConfirmResponseId`, `selectedOfferId` (reuses FareConfirm's variable names — confirms Upselling is a drop-in alternative to FareConfirm in the chain). V2 → `upSellingResponseId`, `upSellingSelectedOfferId` (**distinct** variable names from FareConfirm's `fareConfirmResponseId`/`fareConfirmSelectedOfferId`) — `INFERRED` **testing note**: since V2 downstream steps (GetOfferBundles, AddPassenger) are shown in the collection consuming `fareConfirmResponseId`/`fareConfirmSelectedOfferId` specifically, an Upselling-based V2 flow requires the tester to manually carry `upSellingResponseId`/`upSellingSelectedOfferId` forward **as if** they were `fareConfirmResponseId`/`fareConfirmSelectedOfferId` — the collection does not do this substitution automatically. This is an important manual-testing mechanic: **when executing a V2 Upselling-based flow, treat `upSellingResponseId` → the `ResponseId` input of the next step, and `upSellingSelectedOfferId` → its `selectedOfferId` input**, exactly analogous to how FareConfirm's outputs are consumed.

**IDs Generated**: V1: `fareConfirmResponseId`, `selectedOfferId`. V2: `upSellingResponseId`, `upSellingSelectedOfferId`.

**IDs Required By Next Endpoint**: Search's `searchResponseId`/`ResponseId` + `offerId` (input). Output feeds GetOfferBundles/AddPassenger/Book/Hold exactly where FareConfirm's output would (§3).

**Common Errors / Negative Cases**: same class as FareConfirm (stale/mismatched offer refs); additionally, requesting Upselling for a supplier/offer that has no upsell products available — `UNKNOWN` exact response (empty `upsellOffers[]` vs. error).

**Testing Notes**: Confirm the V1 `requestUrl` defect (above) is either fixed in the collection or documented as a required local environment override before scheduling any V1 Upselling-based flow (flows 7–12, 19–24, 85–89 per flow.md).

---

### 2.4 GetOfferBundles

**Purpose**: Retrieve available fare bundle options (e.g., "Value"/"Premium"/"Ultimate" bundles bundling baggage/seat/meal/flexibility) for a confirmed offer, for suppliers that support bundling.

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/bundles/GetOfferBundles` | `{{baseUrl}}api/V2/bundles/GetOfferBundles` |
| Method | POST | POST |

**Required Request Fields** (V1): `supplier`, `credentialsSelector`, `fareConfirmResponseId`, `selectedOfferId`.
**Required Request Fields** (V2): `supplier`, `credentialsSelector`, `ResponseId` (= `fareConfirmResponseId`), `selectedOfferId` (= `fareConfirmSelectedOfferId`).

**Dependencies**: Must follow FareConfirm (or Upselling, per §2.3's ID-substitution note) — requires that step's `fareConfirmResponseId`/`selectedOfferId`.

**Business Logic** `[Confirmed live 2026-08-05, V1/TravelportNdc]`: calling GetOfferBundles for an offer whose `haveBundles` is `false` returns an explicit **HTTP 409**, **not** an empty `bundleChoices` — confirmed on both chaining paths (via FareConfirm, FLOW-V1-21-NEG, and via Upselling, FLOW-V1-24-NEG) with the uniform unsupported-operation envelope `{ErrorCode:'OperationNotSupported', ErrorMessage:'This action is not currently supported by the selected supplier.'}`. The Upselling ladder preserves the flag faithfully (`haveBundles=false` on all 3 tiers, matching 67/67 Search offers). **Caveat**: TravelportNdc lacks the bundle capability entirely, so this 409 is the per-**supplier** capability rejection and is indistinguishable here from a per-**offer** `haveBundles` guard; isolating the per-offer flag still requires a bundle-capable supplier serving both bundled and non-bundled offers, which was not available on this environment.

**Expected Success Response** `[Observed example, V2]`:
```
{
  offerJourneys: { <segmentRefId>: {origin, destination, bundleReferences: [bundleCode, ...]} },
  bundleChoices: {
    <bundleCode>: {
      bundleCode, bundleName,   // e.g. "Premium", "Value", "Ultimate"
      bundlePrices: [ {passengerType, totalPrice, totalTax, feePrice} ],
      includedServices: [ <string tags, e.g. "BAGGAGE", "MEAL", "SEAT_MAP", "FLEXI_CHARGES", plus free-text rule descriptions> ]
    }, ...
  }
}
```
`INFERRED`: `includedServices` mixes machine-readable tags (`BAGGAGE`, `MEAL`, `SEAT_MAP`, `FLEXI_CHARGES`) with human-readable free-text rule strings in the same array (observed in the example) — a caller must not assume every array element is a clean enum tag; this is a real response-shape quirk worth a dedicated response-validation test (assert the known tag values are a subset of the array, not that the array equals a fixed set).

**Response Mapping**: `offerJourneys.<key>.key`(!) — `INFERRED` **defect**: the test script for GetOfferBundles reads `resp.offerJourneys.key` (i.e., a literal property named `key` directly on the `offerJourneys` object), but the observed example response's `offerJourneys` is a **map keyed by segmentRefId** with no `key` property at all inside it — `resp.offerJourneys.key` would evaluate to `undefined` against the real observed shape. This is a **script/response-shape mismatch bug** in both collections (V1 and V2 test scripts are worded identically: `var JourneyKey1 = resp.offerJourneys.key;`). `JourneyKey1` is therefore very likely always being set to `undefined` in practice. Flag prominently in §7 Testing Notes — `JourneyKey1` does not appear to be consumed by any other request in either collection anyway (`INFERRED` dead variable), so this bug may be inert, but it should still be reported.

**Response Validation Rules**: `bundleChoices` keys should match the `bundleReferences` listed per journey in `offerJourneys`; each bundle's `bundlePrices` should have one entry per passenger type present in the itinerary.

**IDs Generated**: none consumed downstream (per above, `JourneyKey1` appears unused/broken). The **bundle code** the tester selects (e.g., `"66569"`) is what must be threaded manually into the next step's `selectedBundles` field (V1 Book/Hold body has a `"selectedBundles": []` array — `INFERRED` this is where chosen bundle code(s) go, though every saved request body in both collections leaves it empty, meaning **no observed example exercises a non-empty bundle selection** — `UNKNOWN` exact object shape expected inside `selectedBundles[]`, needs confirmation before writing Bundle-flow positive tests).

**IDs Required By Next Endpoint**: `fareConfirmResponseId`/`selectedOfferId` (unchanged, passed through) plus the caller's chosen bundle code into the following Book/Hold/AddPassenger step's `selectedBundles`.

**Common Errors**: calling for a non-bundle-capable supplier; stale `fareConfirmResponseId`.

**Testing Notes**: Given the `JourneyKey1` scripting bug above, **do not rely on `JourneyKey1` for chaining** in any flow test — thread `fareConfirmResponseId`/`selectedOfferId` through directly instead, exactly as the request bodies already show.

### 2.5 AddPassenger *(V2 only)*

**Purpose**: Attach passenger and contact details to a confirmed offer, as a discrete step before booking/enrichment. This is the single largest structural addition in V2 over V1 (§1.10) — V1 embeds this same data directly in Book/Hold instead.

| | V2 |
|---|---|
| URL | `{{baseUrl}}api/v2/Passenger/AddPassengerDetails` |
| Method | POST |

**Required Inputs**: FareConfirm/Upselling output (`fareConfirmResponseId`/`ResponseId`, `fareConfirmSelectedOfferId`/`selectedOfferId`).

**Required Request Fields**:

| Field | Type |
|---|---|
| `supplier`, `credentialsSelector` | string |
| `ResponseId` | string (from FareConfirm's `responseId`) |
| `selectedOfferId` | string |
| `passengersList` | object keyed by pax ref (`Pax1`, `Pax6`, `Pax10`, ...) — see field detail below |
| `contactsList` | object keyed by contact ref (`"0"`, ...) |

**`passengersList.<PaxRef>` fields** (`INFERRED` from the request body, both V1-embedded and V2-standalone use the identical shape):

| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. `Mr`, `Miss`, `MSTR`, `MS` — `INFERRED` case/format is not normalized (mixed casing observed side-by-side in the same request) |
| `name.first`, `.middle`, `.last` | string | `middle` may be empty string |
| `nationality`, `residentCountry` | string (ISO country code) | |
| `birthDate` | ISO-8601 datetime string | |
| `gender` | string (`male`/`female`, lowercase observed) | |
| `passengerTypeCode` | string (`ADT`/`CHD`/`INF`) | |
| `contactRefId` | string | keys into `contactsList` |
| `ParentPaxRefId` | string, **INF only** | must reference a valid `ADT` pax key in the same `passengersList` — links infant to accompanying adult |
| `travelDocument.*` | nested object mirroring passenger name/nationality/DOB, plus `expirationDate`, `issuanceDate`, `documentNumber`, `documentType` (`PASSPORT` observed), `issuanceCountryCode` | |

**`contactsList.<ref>` fields**: `Email`, `phone.{type, countryDialingCode, phoneNumber}`, `Address.{Line1, Line2, City, CountryCode}`.

**Request Rules / Validation** (`INFERRED`):
- Every `INF` passenger must carry a valid `ParentPaxRefId` pointing to an `ADT` entry present in the same request.
- `contactRefId` must resolve to a key present in `contactsList`.
- Passenger count/type mix should match what was declared at Search time (`ADT_Count`/`CHD_Count`/`INF_Count`) — **not verified by any script**, but a mismatch is a strong candidate for a supplier-side rejection; `UNKNOWN` exact behavior.
- `documentType` — only `PASSPORT` observed; `UNKNOWN` other accepted values (national ID, etc.) — likely supplier-dependent (GDS vs. LCC document requirements differ per §4.1).

**Business Logic**: `INFERRED` — this call finalizes passenger identity server-side against the given `ResponseId`/`selectedOfferId`; all subsequent V2 steps (GetAncillary, GetSeatMap, FareCheck, Book, Hold) reference passengers by short ref codes (`A1`, `C2`, `travelerRefId_1`, etc. — observed in later steps) rather than resending full passenger data, implying AddPassenger is what establishes that ref-code mapping server-side.

**Expected Success Response** `[Observed example, V2]` — deliberately minimal:
```
{ offerId, responseId }
```
`INFERRED`: the `offerId` returned here is a **new/re-encoded offer token** distinct from the `fareConfirmSelectedOfferId` passed in (the observed example's returned `offerId` is a different opaque string than what a same-flow FareConfirm would have produced) — treat it as authoritative going forward, do not keep reusing the FareConfirm-era `offerId`.

**Response Mapping**: `offerId` → `getAddPaxOfferId`; `responseId` → `getAddPaxResponceID` (**typo in the collection's own variable name** — `Responce` not `Response` — cosmetic but worth knowing so a tester searching the collection for "Response" doesn't miss it).

**Response Validation Rules**: both `offerId` and `responseId` present and non-empty; `INFERRED` no price/fare data is returned here at all, so there is nothing to price-reconcile at this step — consistent with the empty test-assertion-titles observed.

**IDs Generated**: `getAddPaxOfferId`, `getAddPaxResponceID` — these become the primary `ResponseId`/`selectedOfferId` pair for every subsequent V2 step in a no-bundle flow (GetAncillary, GetSeatMap directly reference them per the collection).

**IDs Required By Next Endpoint**: consumed by GetAncillary and GetSeatMap directly. **Testing Note**: flows that insert GetOfferBundles *before* AddPassenger (per flow.md's bundle-flow ordering, e.g. flow 31+) must decide whether Bundle's or AddPassenger's offer/response IDs are the ones carried forward — the collection's saved requests show GetAncillary/GetSeatMap consuming AddPassenger's IDs (`getAddPaxOfferId`/`getAddPaxResponceID`), **not** Bundle's, so `INFERRED` the correct ordering when both are present is: FareConfirm → GetOfferBundles (uses FareConfirm IDs) → AddPassenger (uses FareConfirm IDs, returns new IDs) → GetAncillary/GetSeatMap (uses AddPassenger's new IDs) — matching flow.md's literal endpoint order.

**Common Errors**: invalid/missing `ParentPaxRefId` for an infant; `contactRefId` not found in `contactsList`; passenger count mismatch vs. Search.

**Negative Cases**: missing required passenger fields (name, birthDate, documentNumber); expired travel document (`expirationDate` in the past); infant without a parent reference; duplicate `contactRefId` across contact types.

**Testing Notes**: This endpoint has the richest input payload of any in the API — prioritize boundary/negative field-validation testing here (name length, special characters, non-ASCII names — the observed data is all Latin-script; `UNKNOWN` non-Latin name handling, relevant for many of the 38 suppliers' home markets).

---

### 2.6 GetAncillary *(V2 only)*

**Purpose**: Retrieve available ancillary services (baggage, meal, seat, other) per passenger/segment, for suppliers/offers that support ancillary sales.

| | V2 |
|---|---|
| URL | `{{baseUrl}}api/v2/Ancillary/GetAncillary` |
| Method | POST |

**Required Request Fields**: `supplier`, `credentialsSelector`, `ResponseId` (= `getAddPaxResponceID`), `selectedOfferId` (= `getAddPaxOfferId`).

**Dependencies**: Must follow AddPassenger (per §2.5's ID-chaining note).

**Business Logic**: `INFERRED` gated by FareConfirm's `offerHasAncillary`/`isAncillaryRequired` flags (§2.2) — calling GetAncillary for an offer with `offerHasAncillary: false` is a valid negative/boundary test.

**Expected Success Response** `[Observed example, V2]`:
```
{
  supplier, isFareCheckRequired,      // boolean — INFERRED signals whether FareCheck (§2.8) must be called before Book/Hold once ancillaries are selected
  offerId, responseId,
  journeys, flightSegments,           // same shape as Search/FareConfirm
  passengersAncillariesAvailabilty: {  // NOTE: "Availabilty" — typo present in the actual field name, not a transcription error
    <paxRef>: { passengerTypeCode, name, segmentAncillariesAvailability: {<segmentRefId>: [<opaque ancillary code string>, ...]}, journeyAncillariesAvailability: {} }
  },
  segmentsAncillariesDetails: { <segmentRefId>: [ {name, code, price, description, availableCount, ancillaryCategory} ] },   // ancillaryCategory observed: "Baggage", "Meal" (also "Seat", "Other" per PRD's ancillary-type taxonomy)
  journeysAncillariesDetails: {}
}
```
`INFERRED` **API defect, worth flagging**: `passengersAncillariesAvailabilty` is misspelled in the live API's own JSON response (missing the second "i" in "Availability") — this is not a Postman-collection artifact, it's in the observed real response body. Any strongly-typed client/automation code binding to this field must match the misspelling exactly. Document this for the dev team; do not silently treat it as a documentation typo in test assertions.

**Response Mapping**: `offerId` → `ANCofferId`; `responseId` → `ANCresponseId`.

**Response Validation Rules**: `ancillaryCategory` values should be constrained to the known taxonomy (`Baggage`, `Meal`, `Seat`, `Other` — per PRD §4.5's ancillary-type columns); `availableCount` is nullable (observed `null` for baggage in the example, `1000` for meal) — `INFERRED` `null` means "unlimited/not tracked" rather than "zero available," worth an explicit assertion distinguishing `null` from `0`.

**IDs Generated**: `ANCofferId`, `ANCresponseId` — consumed by FareCheck and by Book/Hold's `PassengersSelectedAncillaries` (which references ancillary codes obtained here).

**IDs Required By Next Endpoint**: feeds FareCheck (`selectedOfferId`/`ResponseId` = `ANCofferId`/`ANCresponseId`) and the ancillary **codes** themselves feed Book/Hold's `PassengersSelectedAncillaries.<paxRef>.SetSegmentsAncillaries.<segmentRefId>[].AncillaryCode`.

**Common Errors**: calling for an offer with no ancillary support; stale AddPassenger IDs.

**Negative Cases**: requesting ancillaries for a segment not part of the confirmed offer; requesting for a passenger ref not established in AddPassenger.

**Testing Notes**: `isFareCheckRequired` should be asserted and used to decide whether the flow must include FareCheck before Book/Hold — this is a **live, response-driven branch point**, analogous to FareConfirm's capability flags (§2.2), and should override any static assumption about whether FareCheck is "supposed to" be in a given flow.

---

### 2.7 GetSeatMap *(V2 only)*

**Purpose**: Retrieve the seat map (row/cell layout, availability, pricing) for the confirmed offer's flight segments.

| | V2 |
|---|---|
| URL | `{{baseUrl}}api/V2/SeatMap/Seat` |
| Method | POST |

**Required Request Fields**: `supplier`, `credentialsSelector`, `ResponseId` (= `getAddPaxResponceID`), `selectedOfferId` (= `getAddPaxOfferId`) — same chaining pattern as GetAncillary.

**Business Logic**: `INFERRED` gated by FareConfirm's `isSeatMapRequired` flag (§2.2).

**Expected Success Response** `[Observed example, V2]`:
```
{
  supplier,
  flightSegments,       // standard shape, includes "equipment" (aircraft type, e.g. "A320-174" — populated here even when null at Search/FareConfirm time)
  passengersDetails: { <paxRef>: {passengerTypeCode, name} },
  seatMapDetails: {
    <segmentRefId>: {
      rows: [ { rowNumber, cells: [ {cellCategory, cellDetails} ] } ]
    }
  }
}
```
`[Observed example, V2, confirmed against the fuller raw example added 2026-08-10]` full shape, per segment inside `seatMapDetails`: `cabinLayoutsByDeck.<Deck>.zones[].{zoneId, columns[]}`, plus `rows[].{rowNumber, deck, zoneId, cells[].{cellCategory, column, cellDetails}}`. `cellDetails` is a proper nested JSON object — **superseding the prior stringified/`ToString()`-dump description below, now resolved**: `{cellID, cellCode, cellAvailability, name, description, seatPriceDetails, seatPriceDetailsByPassenger: {<paxRef>: {paxCellAvailability, totalPrice, basePrice, taxesPrice}}, cellCharacteristics: [{padisCode, description}]}`.

`cellCategory` observed values (updated 2026-08-10): `Seat`, `Aisle` — `UNKNOWN` whether galley/lavatory/exit-row-only markers exist as further distinct categories; not observed.

Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples. `NDC_Integration/Resources/SeatMap QC Execution Checklist.md` §10/§29 (a QC checklist, not a Postman-collection artifact) additionally lists `AvailableFree` and a likely-typo'd `AvailableAferReservation` (probably intended as `AvailableAfterReservation`) as allowed values — **neither is observed in any saved example or collection response to date**; treat both as unconfirmed candidates pending live confirmation (§7.9), not as confirmed enum members. Do not merge the two sources' enumerations without evidence. `cellDetails.cellID` is an opaque, long base64-encoded token distinct from the short human-readable `cellCode` (e.g. `"12E"`) — **this `cellID` is the exact value that must be copied verbatim into Book's `passengersSelectedSeats.<paxRef>.setSegmentsSeats.<segmentRefId>.cellId` (§2.9)**. Note the **casing mismatch**: the response field is `cellID` (capital ID) while Book's request field is `cellId` (lowercase d) — `INFERRED` cosmetic/likely case-insensitive JSON deserialization, but flag as a testing note (§7) — do not assume a tester or integration will spot this casing difference by inspection.

**Response Mapping** (updated 2026-08-10): CI_SeatMapRQ's test script was newly added in this update — it now sets `pm.collectionVariables.set("getSeatMapOfferId", resp.offerId)` and `pm.collectionVariables.set("getSeatMapResponceID", resp.responseId)` (note the collection's own spelling: `getSeatMapResponceID`, not `...ResponseID`). This **supersedes the previous "no variables set" behavior** documented below. **Critically**, the collection's own saved `Book` example (§2.9) now sources its `ResponseId`/`selectedOfferId` from these two GetSeatMap-produced variables instead of AddPassenger's `getAddPaxResponceID`/`getAddPaxOfferId` — meaning **when a flow includes GetSeatMap immediately before Book, GetSeatMap's output (not AddPassenger's) becomes the authoritative `ResponseId`/`selectedOfferId` pair for that Book call.** The seat **cellCode/cellID** the tester selects must still be manually carried into Book's `passengersSelectedSeats` (no automatic capture of the *chosen* cell exists — only the offer/response IDs are auto-chained).

**IDs Generated** (updated 2026-08-10): `getSeatMapOfferId` (= `resp.offerId`), `getSeatMapResponceID` (= `resp.responseId`) — both newly wired; previously none were captured automatically (see historical note immediately below).

*(Historical, pre-2026-08-10 behavior, kept for context)*: no collection variables were set from this response at all — the seat **code** (e.g., `cellCode: "1A"`) had to be manually carried into Book/Hold's `PassengersSelectedAncillaries...AncillaryCode` for the `Seat` category, analogous to ancillary codes from GetAncillary. This mechanism (routing seat selection through the ancillary field) appears to have been **superseded** by the dedicated `passengersSelectedSeats` field (§2.9), though `PassengersSelectedAncillaries` remains present (commented-out) on Book's saved example — `UNKNOWN` whether the old ancillary-category `Seat` routing still works server-side or is now dead.

**Common Errors**: requesting for an offer with `isSeatMapRequired: false`; segment not in the confirmed offer.

**Testing Notes**: The chosen seat's `cellCode` **and** `cellID` must still be copied by hand into Book's `passengersSelectedSeats` (§2.9) — only the offer/response-level IDs are auto-chained now, not the specific cell selection. This remains a natural point for tester error in manual E2E testing; call this out explicitly in test case steps (§7). Additionally, **verify live whether the `cellID` token is offer/response-scoped and expires** — it is a long encoded blob that appears to embed `ResponseId`/`OfferId`/passenger-ref metadata (visible when base64-decoded), so a `cellID` obtained from one GetSeatMap call is unlikely to be valid against a different `ResponseId`/`selectedOfferId` — a high-value negative test (§7) is submitting a `cellID` from one search/offer against a different offer's Book call.

---

### 2.7a SeatAfterHold *(V2 only, added 2026-08-10)*

**Purpose**: Attach/select seat(s) on a booking that has already been **Held** (via §2.10), as the Hold branch's dedicated seat-selection entry point — since, unlike Book, neither `Hold` nor `BookAfterHold` accepts the `passengersSelectedSeats` field (confirmed absent from both saved examples; see §1.10 item 6, §2.9, §2.10).

| | V2 |
|---|---|
| URL | `{{baseUrl}}/api/v2/SeatMap/SeatAfterHold` |
| Method | POST |

**Required Request Fields** (`[Observed example, V2]` — the entire saved request body): `supplier`, `credentialsSelector`, `pnr`, `gdsPNR`, `bookingToken`, `surName`. `INFERRED`: this is the exact same identity-quadruple (`pnr`/`gdsPNR`/`bookingToken`/`surName`) used by FareConfirmAfterHold (§2.12) — every "act on an existing Held PNR" endpoint in this API appears to standardize on this field set, which is a genuinely useful, internally-consistent contract observation.

**`UNKNOWN` — flag prominently before writing deterministic test cases**:
- **The saved request body has no seat/cell field at all** (no `cellCode`, `cellId`, or `passengersSelectedSeats`-shaped field anywhere) — only the four identity fields plus `surName`. Either (a) this saved example is an incomplete stub captured before the real payload shape was finalized, or (b) the real contract requires additional fields not yet reflected in the collection. **Do not assume the 6-field body shown is complete** — this is the single least-specified request shape in the entire API surface as of this update.
- **No saved response example exists at all** (`"response": []`) — response shape is entirely `UNKNOWN`.
- **No test script/event exists** — no `pm.test`, no `pm.collectionVariables.set(...)` of any kind. Nothing is auto-chained from this call.
- **Exact position in the Hold-branch chain is `UNKNOWN`** — candidates, none confirmed: immediately after `Hold` and before `FareConfirmAfterHold`; between `FareConfirmAfterHold` and `BookAfterHold`; or after `BookAfterHold` (before ticketing). The identity fields alone (`pnr`/`gdsPNR`/`bookingToken`) don't disambiguate, since all three are expected to remain stable across `Hold`→`FareConfirmAfterHold`→`BookAfterHold` (§2.13 Testing Notes). `INFERRED` best-guess placement, by analogy to the direct-Book branch's pattern (seat selection happens after the offer/passenger identity is established but before final commitment): **Hold → SeatAfterHold → FareConfirmAfterHold → BookAfterHold** — but this is a guess, not evidence, and must be confirmed live.
- Whether a fresh `GetSeatMap` call is still needed to *discover* available cells/`cellID` tokens for an already-Held PNR (GetSeatMap's existing request shape takes `ResponseId`/`selectedOfferId`, not `pnr` — so it's `UNKNOWN` whether the same GetSeatMap call works post-Hold, or whether seat discovery for the Hold branch works differently).

**Common Errors / Negative Cases**: entirely `UNKNOWN` — no examples exist. Candidates to verify live: calling with a mismatched `pnr`/`bookingToken` pair; calling after the hold has expired (`holdExpirationDate` passed, §2.10); calling on a supplier with no seat-management capability.

**Testing Notes**: Given the complete absence of a saved example, test script, or response shape, this endpoint should be treated as a **discovery/exploratory** target first, not a deterministic regression target — send the known 6 fields, capture the real response, and only then derive positive/negative assertions from what's actually returned. `SeatMap_TestCases.md` includes explicit exploratory test cases for this endpoint rather than asserting a guessed shape as fact. Also verify the field-name casing `surName` (lowercase s, matching §2.12's `surName`) is intentional and not itself a defect, given `Book`'s response elsewhere uses `PascalCase`-leaning keys inconsistently (§2.2).

---

### 2.8 FareCheck *(V2 only)*

**Purpose**: Re-validate/re-price the offer after ancillary and/or seat selections have been made, before committing to Book/Hold. Used in flow.md specifically in the Bundle+Ancillary, SeatMap+Ancillary, and Bundle+SeatMap+Ancillary flow families (flows 43–48, 60–71 per flow.md) — i.e., whenever **both** an ancillary-adjacent selection (GetAncillary or GetSeatMap) is present, `INFERRED` FareCheck is the step that reconciles their price impact before booking.

| | V2 |
|---|---|
| URL | `{{baseUrl}}api/v2/Ancillary/FareCheck` |
| Method | POST |

**Required Request Fields**: `supplier`, `credentialsSelector`, `selectedOfferId` (= `ANCofferId`), `ResponseId` (= `ANCresponseId`), `PassengersSelectedAncillaries` — a nested object keyed by passenger ref (e.g. `A1`, `C2`), each with `SetSegmentsAncillaries: {<segmentRefId>: [{AdditionalServiceCategory, AncillaryCode, Quantity}]}`. `AncillaryCode` values observed are **opaque gzip+base64-encoded tokens** (matching the `code` field returned by GetAncillary's `segmentsAncillariesDetails`) — not human-readable IDs; they must be copied verbatim from GetAncillary's response, never hand-constructed.

**Business Logic**: `INFERRED` re-prices the offer including ancillary costs; the response's `selectedOffer.passengerFareBreakdown[].paxTotalAncillaryAmount`/`passengerAncillaries[]` (per the observed example) confirms this — FareCheck is where ancillary pricing first appears attached to the offer total, distinct from GetAncillary's response (which only lists available options + their standalone prices, not a re-priced total).

**Expected Success Response** `[Observed example, V2]`:
```
{
  supplier, responseId, journeys, flightSegments, priceClasses, baggageDetails,
  passengersDetails, passengersSelectedAncillaries,   // echoes the selections just made, resolved to descriptive names
  selectedOffer: {
    offerId, offerJourneys,
    passengerFareBreakdown: [ {passengerRefId, paxTotalAmount, paxTotalAncillaryAmount, passengerAncillaries:[{ancillaryCode, amount}], passengerTypeCode, paxTotalTaxAmount, paxBaseAmount, taxesAndFees, segmentDetails, discount} ],
    priceDetails, refundability, isDealCodeApplied, appliedDealCode, isPromoted, appliedPromotionCode
  }
}
```
`INFERRED`: Note `selectedOffer` here **lacks** the `haveBundles`/`canBeHeld`/`isAncillaryRequired`/etc. capability flags that FareConfirm's `selectedOffer` carries (§2.2) — those flags are a FareConfirm-specific/first-touch concept; by FareCheck time the flow has already committed to its enrichment path, so they're presumably no longer needed. **Testing Note**: do not expect capability flags on FareCheck's response.

**Response Mapping**: `selectedOffer.offerId` → `fareConfirmSelectedOfferId` (**overwrites** the earlier FareConfirm-era value!) and also → `fareCheckOfferId`. `INFERRED`: the collection's test script for FareCheck has a **commented-out** line — `// pm.collectionVariables.set('fareConfirmResponseId', resp.selectedOffer.offerId)` — meaning a tester at some point disabled propagating FareCheck's `responseId` forward, and only the offerId variables update. `UNKNOWN`/worth confirming whether `fareConfirmResponseId` should actually be refreshed here too (if FareCheck returns a new `responseId` distinct from what GetAncillary supplied, and Book/Hold subsequently reference the **stale** `fareConfirmResponseId`, that would be a latent chaining bug — flag as a Testing Note, verify live).

**Response Validation Rules**: `paxTotalAncillaryAmount` + base/tax reconciles into `paxTotalAmount`; `priceDetails.totalAmount` includes ancillary costs (compare against the pre-ancillary FareConfirm/AddPassenger-era total to confirm the delta equals the sum of selected ancillary prices — a strong, high-value manual price-integrity test unique to this endpoint).

**IDs Generated**: `fareConfirmSelectedOfferId` (overwritten), `fareCheckOfferId`.

**Common Errors**: ancillary selection referencing a code not returned by GetAncillary/GetSeatMap for that segment; quantity exceeding `availableCount`.

**Testing Notes**: Given the commented-out `responseId` propagation noted above, **explicitly verify which `responseId` Book/Hold actually need** when a flow includes FareCheck, rather than assuming the collection's variable chaining is complete/correct — this is a documented soft spot.

---

### 2.9 Book

**Purpose**: Commit the confirmed (and optionally bundled/ancillary-enriched) offer to a live booking (PNR) immediately — the direct-booking path, as opposed to Hold (§2.10).

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightBooking/Book` | `{{baseUrl}}api/v2/FlightBooking/Book` |
| Method | POST | POST |

**Required Request Fields** (V1): `Supplier`/`supplier` (`[Confirmed live 2026-08-05, TravelportNdc]` case-**insensitive** — Book succeeded with both the documented capital-`S` `Supplier` (FLOW-V1-01, pnr 8EIQ8N) and lowercase `supplier` (TC-BOOK-VAL-01), each returning 200 with a real PNR; the capital-S note was a documentation artifact, not a constraint), `credentialsSelector`, `fareConfirmResponseId`, `selectedOfferId`, `passengersList` (full inline passenger objects, same shape as AddPassenger §2.5), `contactsList`, `selectedBundles` (array, empty in every observed example).

**Required Request Fields** (V2) — **markedly different, and the saved example changed again on 2026-08-10**: the current saved V2 Book request body carries `ResponseId`, `selectedOfferId`, `supplier`, `credentialsSelector`, and (now active/uncommented) `passengersSelectedSeats` — **no `passengersList` at all**, consistent with §1.10's AddPassenger-replaces-inline-passengers rule. `INFERRED` **caveat, updated**: this saved example's `ResponseId`/`selectedOfferId` now reference `{{getSeatMapResponceID}}`/`{{getSeatMapOfferId}}` (GetSeatMap's output, §2.7) — it was captured mid-way through a **SeatMap-flow** test run, **replacing** the previously-documented ancillary-flow example (which had used `{{ANCResponseID}}`/`{{ANCofferId}}`; that example no longer exists in the collection as of this update). It is a real, working example of "Book after AddPassenger+GetSeatMap," not necessarily the *minimal* Book payload for a plain no-enrichment V2 flow (flows 25–30), nor is an ancillary-flow example still directly available. For a plain V2 flow with no Bundle/Ancillary/SeatMap, `INFERRED` the minimal required fields are still `supplier`, `credentialsSelector`, `ResponseId` (= AddPassenger's `getAddPaxResponceID`), `selectedOfferId` (= AddPassenger's `getAddPaxOfferId`) — `UNKNOWN`, not directly evidenced by any currently-saved example, flag as needing confirmation before writing the flow-25 positive test.

**`passengersSelectedSeats.<paxRef>` shape** (V2, added 2026-08-10 — the actively-demonstrated new field): `{ "setSegmentsSeats": { "<segmentRefId>": { "cellCode": "12E", "cellId": "<opaque base64 token, copied verbatim from GetSeatMap's `seatMapDetails.<segment>.rows[].cells[].cellDetails.cellID`, §2.7>" } } }`. Multiple segments per passenger presumably nest as sibling keys under `setSegmentsSeats`; multiple passengers as sibling keys under `passengersSelectedSeats` — `UNKNOWN`/not directly evidenced beyond the single-passenger, single-segment example shown, since the observed request only selects one seat for one passenger ref (`T1`/`S1`).

**`PassengersSelectedAncillaries.<paxRef>` shape** (V2, when ancillaries are part of the flow) — **still schema-documented but no longer the active saved example** (shown commented-out in the current Book request, alongside a commented-out `selectedBundles`/`bspCommissionType`): `SetSegmentsAncillaries: {<segmentRefId or compound-key>: [{AdditionalServiceCategory, AncillaryCode, Quantity}]}`, optionally also `SetJourneysAncillaries` (journey-level rather than segment-level ancillaries, e.g. a through-fare baggage allowance spanning multiple segments — observed in an earlier example). `UNKNOWN`: whether `passengersSelectedSeats`, `PassengersSelectedAncillaries`, and `selectedBundles` can all be populated **simultaneously** on one Book call (combining Bundle+Ancillary+SeatMap in a single direct-book request) — the commented-out-ness of the other two in the current example suggests this combination is not yet demonstrated/verified, only individually schema-plausible. High-value integration test: submit all three together and confirm the API accepts the combination.

**Business Logic**: price-reconciliation script identical to Search/FareConfirm — **present in V1's Book test script, absent from V2's Book test script** (`INFERRED` from the extract — no assertion titles were found for V2 Book) — another version-specific coverage gap (§7).

**Expected Success Response** `[Observed example, V2]`:
```
{
  supplier, pnr, gdsPNR, bookingToken,
  voidCapability,           // e.g. "VoidNotAllowed" — INFERRED a live, booking-specific flag indicating whether Void is currently possible for this PNR (see §2.14)
  creationDate, ticketingDate, tickets,
  passengersSelectedAncillaries,   // echoes selections
  passengersSelectedSeats,  // ADDED 2026-08-10, [Observed example, V2]: { <paxRef>: { <segmentRefId>: { cellCode, price } } } — top-level echo of the seat(s) attached via passengersSelectedSeats on the request
  journeys, flightSegments, priceClasses, baggageDetails,
  passengersList,           // NOTE: present in the RESPONSE even though absent from this request — server resolves/echoes full passenger records established via AddPassenger
  contacts,
  selectedOffer: {
    offerId, offerJourneys,
    passengerFareBreakdown: [ { ..., passengerSeats: [{cellCode, price}], paxTotalSeatAmount, ... } ],  // ADDED 2026-08-10, per-passenger seat cost breakdown, sibling to the existing passengerAncillaries/paxTotalAncillaryAmount
    priceDetails: { ..., totalSelectedSeats: [{cellCode, price}], totalSelectedSeatsAmount, ... },       // ADDED 2026-08-10, offer-level seat cost aggregate, sibling to totalPassengersAncillaries/totalAncillariesAmount
    refundability, isDealCodeApplied, appliedDealCode, isPromoted, appliedPromotionCode
  },
  isBspCommissionApplied
}
```
`INFERRED` important: `voidCapability` is a **per-booking, live** capability flag — the same "trust the live response over any static matrix" principle as §2.1's offer-level flags applies here for Void-eligibility testing (§4.2, §2.14).

**Response Mapping**: `pnr` → `pnr`; `bookingToken` → `bookingToken`; `gdsPNR` → `gdsPNR`.

**Response Validation Rules**: `pnr`/`bookingToken` non-empty; (V1, and recommended-but-unenforced in V2) price reconciliation; `tickets` populated when the supplier issues tickets synchronously at booking time (`INFERRED` supplier-dependent — GDS/IATA suppliers with ticketing-system reach per §4.1 may ticket asynchronously, meaning `tickets` could be `null` immediately after Book and only populate by Retrieve time — a timing-sensitive assertion, not a hard failure if null immediately post-Book). **Added 2026-08-10, `UNKNOWN`, needs live confirmation**: when a seat is selected, does `selectedOffer.priceDetails.totalAmount` include `totalSelectedSeatsAmount` in its sum (i.e. `totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount`)? None of the existing V1/V2 price-reconciliation test scripts (§1.10 item 4) were observed summing a seat amount into their assertions — this is a strong candidate coverage gap, analogous to the pre-existing Ancillary-amount gap flagged at §2.8, and should be an explicit manual price-integrity test for every SeatMap-enriched flow (§7).

**IDs Generated**: `pnr`, `bookingToken`, `gdsPNR` — the three IDs every terminal action (Retrieve, Void, BookAfterHold, CancelAfterHold, FareConfirmAfterHold) depends on from this point forward.

**IDs Required By Next Endpoint**: `fareConfirmResponseId`+`selectedOfferId` (V1) as input; V2 input is now branch-dependent — `getAddPaxResponceID`+`getAddPaxOfferId` for a no-enrichment or ancillary-only flow (`UNKNOWN`-confirm, no longer directly evidenced by a saved example per above), or `getSeatMapResponceID`+`getSeatMapOfferId` when the flow includes GetSeatMap (**`[Observed example, V2]` as of 2026-08-10** — this is what the collection's current saved example actually does). Produces `pnr`/`bookingToken`/`gdsPNR` consumed by Retrieve and Void.

`INFERRED` **new cross-source conflict, added 2026-08-10**: `NDC_Integration/Resources/Sample_API_Req&Res_V2.md`'s own "Book || Hold Request" example (a document this SPEC treats as source material, §0 source list) and `NDC_Integration/Resources/SeatMap QC Execution Checklist.md`'s Part 3 "Request Level Validation" both name Book's mandatory fields as `fareConfirmResponseId`/`SelectedOfferId` — the **V1-style field names**, not V2's `ResponseId`/`selectedOfferId` (or the GetSeatMap-chained `getSeatMapResponceID`/`getSeatMapOfferId` documented above). This directly contradicts what the live Postman collection's own saved `CI_FlightBookRequest` example actually sends (confirmed by direct inspection of the collection JSON, not inferred). **Do not silently pick a side**: either (a) the Sample doc/QC checklist were written against an earlier or V1-flavored draft of the Book contract and are now stale, or (b) the API genuinely accepts both field-name pairs (e.g. via case-insensitive/alias binding), which would itself be worth documenting rather than assuming. Confirm live which field name(s) the current staging API actually honors before treating either source as authoritative, and fold the answer back into this section — this is the same class of naming-inconsistency risk already flagged for `credentialsSelector`/`Credentials_Selector` casing at §2.10.

**Common Errors**: stale/expired offer reference; inventory sold out between FareConfirm/AddPassenger and Book (a realistic race, same class as §2.2's edge case); malformed/incomplete passenger data (V1) rejected by the supplier.

**Negative Cases**: booking with a `selectedOfferId` that doesn't match the `fareConfirmResponseId`/`ResponseId` given; booking twice with the same offer reference (double-booking attempt — `UNKNOWN` whether idempotently rejected or produces two PNRs); booking a blacklisted supplier/route in a production-like environment (§1.8, §4.3 — business-policy rejection, distinct from a technical error).

**Expected Failure Responses** `[Confirmed live 2026-08-05, V1/TravelportNdc]`: a mismatched `selectedOfferId`/`fareConfirmResponseId` pair returns HTTP 400 with the standard error envelope `{Status:400, TransactionId:<guid>, ErrorCode:'ValidationError', ErrorMessage:'Business validation error occured. Please check your request.', Context:[{Value:<detail>}]}`. No PNR is created. NOTE: `Context` currently leaks the internal .NET DTO type name — see defect log.

**Testing Notes**: **`shouldSkipBookingInProduction`** (`INFERRED`, PRD §4.4/FR-9): the adjacent automation framework auto-skips Book specifically when running against a `PROD`-classified environment, unless explicitly overridden. The Postman collections themselves have no such guard (Postman has no concept of "skip this request in this environment") — **manual testers must apply this rule themselves**: never execute Book against a production base URL without explicit, documented authorization, regardless of what `Supplier_Name`/`Credentials_Selector` is configured. This is the single highest-blast-radius action in the entire API surface (real money/real PNR creation) and deserves its own checklist item in §7.

---

### 2.10 Hold

**Purpose**: Reserve the offer (create a PNR / booking-in-progress) **without** immediate ticketing/payment commitment, to be finalized later via FareConfirmAfterHold → BookAfterHold, or abandoned via CancelAfterHold. The alternate branch to Book, for suppliers where `canBeHeld: true` (§2.1, §2.2 capability flags; §4.2 static matrix).

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightBooking/Hold` | `{{baseUrl}}api/v2/FlightBooking/Hold` |
| Method | POST | POST |

**Required Request Fields**: same shape family as Book (§2.9) — V1 embeds full `passengersList`/`contactsList`; V2's saved example carries `fareConfirmResponseId`, `selectedOfferId` (= `getAddPaxOfferId`), `supplier`, `credentialsSelector` (note: the saved V2 Hold body has `"credentialsSelector": "{{credentialsSelector}}"` — **lowercase-first collection-variable reference, which does not match the environment's actual variable name `Credentials_Selector`** — `INFERRED` **defect**: this placeholder would resolve to an empty/undefined value at runtime unless a tester manually defines a `credentialsSelector` collection variable; the correct reference should be `{{Credentials_Selector}}` per the environment file. Flag as a collection bug, do not silently fix without recording it), plus `PassengersSelectedAncillaries` (when applicable).

**Business Logic**: price-reconciliation script present in **both** V1 and V2 Hold test scripts (confirmed — this is one of the two V2 booking-family endpoints, along with FareConfirmAfterHold and BookAfterHold, that retained the price check, unlike V2's Book/Retrieve).

**Expected Success Response** (`INFERRED` from V2 script + shape family; no distinct saved example beyond what Book/Retrieve show, but response shape should mirror Book's with one key addition):
```
{ ..., holdExpirationDate, ... }   // INFERRED present based on it appearing in Retrieve's observed example (§2.11) as a Hold-specific field
```
`holdExpirationDate` is the **critical time-boxing field** for every Hold-based flow (flows 2,4–6,8,10–12,14,16–18,20,22–24 in V1; the equivalent V2 families) — see §3 Integration Analysis for expiration-window handling.

**Response Mapping**: `pnr` → `pnr`; `bookingToken` → `bookingToken`; `gdsPNR` → `gdsPNR` (identical to Book).

**IDs Generated**: `pnr`, `bookingToken`, `gdsPNR` — same trio as Book, but the booking is **not yet finalized**; must proceed through FareConfirmAfterHold before BookAfterHold, or be abandoned via CancelAfterHold.

**Common Errors**: calling Hold for a `canBeHeld: false` supplier/offer (§4.2 — e.g. `INFERRED` FlyNas, GLC per Integration doc's explicit `Hold=NO`/`-` markers) — expected to fail; this is a first-class negative test per supplier.

**Negative Cases**: Hold on a non-holdable supplier (expect rejection); Hold twice on the same offer.

**Testing Notes**: Fix or flag the `{{credentialsSelector}}`/`{{Credentials_Selector}}` casing mismatch (above) before running any V2 Hold-based flow test — otherwise the request may silently send an empty credentials selector.

**Seat selection, added 2026-08-10**: Hold's saved request body was **not** updated with a `passengersSelectedSeats` field (confirmed absent, unlike Book, §2.9/§1.10 item 6) — attaching a seat to a Held booking cannot be done on the Hold call itself. It must go through the new `SeatAfterHold` endpoint (§2.7a) after Hold produces `pnr`/`gdsPNR`/`bookingToken`. Any SeatMap-enrichment flow that proceeds via Hold (rather than direct Book) should therefore route seat selection through `SeatAfterHold`, not through Hold's payload — treat a test that tries to pass `passengersSelectedSeats` directly on Hold as a negative/schema-rejection case pending live confirmation of whether the field is silently ignored or rejected.

---

### 2.11 RetrieveBooking / Retrieve

**Purpose**: Fetch the current state of a booking (Booked or Held) by its PNR/booking token — used after every Book/Hold/BookAfterHold in every flow to confirm state, and standalone as a booking-status check.

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightBooking/RetrieveBooking` | `{{baseUrl}}api/v2/FlightBooking/Retrieve` |
| Method | POST | POST |

**Required Request Fields**: `supplier`, `credentialsSelector`, `pnr`, `gdsPnr`/`gdsPNR` (casing varies — V1/V2 both observed using `gdsPnr` in this endpoint specifically, vs. `gdsPNR` elsewhere — `INFERRED` cosmetic, likely case-insensitive server-side deserialization, but note for exact-match request-shape tests), `bookingToken`.

**Business Logic**: price-reconciliation script present in **V1 only** — `INFERRED` **V2's Retrieve has no test script assertions at all** (confirmed by the extract — no variable refs, no assertion titles), the most complete test-coverage gap of any V2 endpoint relative to its V1 counterpart.

**Expected Success Response** `[Observed example — V2, though captured under a mislabeled/reused "CI_CancelHold" example slot, see Testing Note]`:
```
{
  fareType, bookedCredentialsSelector, holdExpirationDate, bookingStatus,
  supplier, pnr, gdsPNR, bookingToken,
  tickets,                    // populated once ticketed; null/absent pre-ticketing
  passengersSelectedAncillaries,
  passengersSelectedSeats,    // ADDED 2026-08-10, [Observed example, V2, OmanAirV17]: { <paxRef>: { <segmentRefId>: { cellCode, price } } } — confirmed genuine (not just theoretical), same shape as Book's echo (§2.9)
  journeys, flightSegments, priceClasses, baggageDetails,
  passengersList, contacts,
  selectedOffer: {
    offerId, offerJourneys,
    passengerFareBreakdown: [ { ..., passengerSeats: [{cellCode, price}], paxTotalSeatAmount, ... } ],  // ADDED 2026-08-10
    priceDetails: { ..., totalSelectedSeats: [{cellCode, price}], totalSelectedSeatsAmount, ... },       // ADDED 2026-08-10
    refundability, isDealCodeApplied, appliedDealCode, isPromoted, appliedPromotionCode
  },
  isBspCommissionApplied
}
```
`[Confirmed live 2026-08-05, V1/TravelportNdc]` `bookingStatus` does **not exist** in V1's RetrieveBooking response at all — verified absent on a ticketed PNR. Observed top-level keys instead: `tickets`, `creationDate`, `ticketingDate`, `fareType` (null), `bookedCredentialsSelector`, `holdExpirationDate` (null), `supplier`, `pnr`, `gdsPNR`, `bookingToken`, `journeys`, `flightSegments`, `priceClasses`, `baggageDetails`, `passengersList`, `contacts`, `selectedOffer`, `isBspCommissionApplied`. Booked state is currently only inferable from `tickets[].ticketStatus` (observed value: `Booked`); the held-to-booked transition is separately observable as `tickets` empty→populated and `holdExpirationDate` set→cleared. **Treat the missing `bookingStatus` as an open defect, not a documentation gap** — every flow's post-Retrieve assertion in §6.3/§6.4 that references `bookingStatus` must be rewritten against these substitute signals until the field is added.

**Testing Note on source of this example**: this Retrieve response shape was recovered from **two saved example responses attached to the `CI_CancelHold` request** in the V2 collection, both mislabeled with the example name `"CI_RetreiveBooking"` — an evident copy-paste-while-building artifact (a tester built CancelHold by duplicating a Retrieve example and never renamed it, or attached leftover Retrieve examples for reference). Treat these as genuine historical Retrieve responses (their content, structure, and PNRs are self-consistent and plausible), **not** as documentation of what CancelHold itself returns (§2.13 CancelHold's own response is `UNKNOWN` — no genuine example exists for it).

**Response Mapping**: none captured onward (Retrieve is typically a terminal validation step in a flow, not a chaining step) — except where a flow continues (e.g., Retrieve after Hold, before BookAfterHold) in which case `pnr`/`gdsPNR`/`bookingToken` already held in collection variables from the prior Hold step are simply reused, not re-extracted from Retrieve's response.

**IDs Generated**: none new.

**Common Errors**: PNR/token mismatch; retrieving a cancelled booking `[Confirmed live 2026-08-05]` **fails** with HTTP 409, `ErrorCode: NDC-INT-BYP-A0003`, `ErrorMessage: 'Reservation is already cancelled'`, `Context: 'TERMINAL: RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED'` — it does **not** succeed-and-report-terminal-status as previously inferred.

**Edge Cases**: retrieving immediately after Hold (before `holdExpirationDate`) vs. retrieving after expiration (§3 Integration Analysis) — expected `bookingStatus` transition on expiry is `UNKNOWN`, high-value exploratory test.

**Testing Notes**: Given V2's total lack of script assertions here, **manual testing must supply the price-reconciliation and `bookingStatus` checks itself** — do not rely on "the collection will catch it."

---

### 2.12 FareConfirmAfterHold (PnrReprice)

**Purpose**: Re-price/re-confirm a Held booking before finalizing it via BookAfterHold — the Hold-branch equivalent of FareConfirm, ensuring the price hasn't drifted during the hold window.

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightBooking/PnrReprice` | `{{baseUrl}}api/v2/FlightBooking/PnrReprice` |
| Method | POST | POST |

**Required Request Fields**: `supplier`, `credentialsSelector`, `pnr`, `gdsPNR`, `bookingToken`, `surName` (string, observed empty `""` in both saved examples — `INFERRED` optional/rarely-needed disambiguator field, possibly for suppliers that require a surname match to re-access a PNR; `UNKNOWN` when it's actually mandatory).

**Business Logic**: price-reconciliation script present in **both** V1 and V2 — one of the endpoints where V2 retained full parity with V1.

**Response Mapping**: none new captured (script only re-validates pricing against `selectedOffer`, no new IDs set).

**IDs Required By Next Endpoint**: `pnr`/`gdsPNR`/`bookingToken` (unchanged, passed through to BookAfterHold).

**Common Errors**: calling after the hold has expired (`holdExpirationDate` passed) — `INFERRED` expected to fail or return a price/availability change that must be re-accepted; exact behavior `UNKNOWN`, high-value exploratory/negative test.

**Testing Notes**: This is the natural place to test **price-drift scenarios** — hold an offer, wait, re-confirm, and check whether the reported price differs from the original Hold price (requires a live environment where fares can plausibly move, likely hard to force deterministically — mark as an opportunistic/exploratory test rather than a deterministic regression case).

---

### 2.13 BookAfterHold

**Purpose**: Finalize a Held (and FareConfirmAfterHold-revalidated) booking into a committed booking — the Hold branch's equivalent of Book.

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightBooking/BookAfterHold` | `{{baseUrl}}api/V2/FlightBooking/BookAfterHold` |
| Method | POST | POST |

**Required Request Fields**: `supplier`, `credentialsSelector`, `pnr`, `gdsPnr`/`gdsPNR`, `bookingToken` — no passenger data (already attached via Hold/AddPassenger).

**Business Logic**: price-reconciliation script present in both versions (confirmed, same as Hold/FareConfirmAfterHold).

**Expected Success Response** `[Observed example, V2]`: same top-level shape as Book (§2.9) — `supplier, pnr, gdsPNR, bookingToken, voidCapability, creationDate, tickets, passengersSelectedAncillaries, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer, isBspCommissionApplied` — notably **lacks** `ticketingDate` which Book's example had — `UNKNOWN` whether that's a real difference or just this particular example's supplier not populating it.

**Response Mapping**: `pnr`/`bookingToken`/`gdsPNR` re-set (idempotent — should be unchanged from the Hold-era values, a good equality assertion).

**IDs Generated**: none new (reconfirms existing trio).

**Common Errors**: booking-after-hold on an expired hold; mismatched `pnr`/`bookingToken` pair.

**Testing Notes**: Assert `pnr` returned here **equals** the `pnr` from the original Hold call — a same-PNR-throughout invariant is implicit in every Hold-branch flow (flows 2,4,5,8,10,11,... per §5) and worth an explicit regression check.

**Seat selection, added 2026-08-10**: like Hold (§2.10), BookAfterHold's saved request body carries no `passengersSelectedSeats` field. `UNKNOWN`: if `SeatAfterHold` (§2.7a) is called on the PNR before BookAfterHold, does BookAfterHold's response then echo `passengersSelectedSeats`/`passengerSeats`/`totalSelectedSeats` the same way Book's and Retrieve's do (§2.9, §2.11)? Not directly evidenced either way — a high-value test once `SeatAfterHold`'s chain position (§2.7a) is confirmed live.

---

### 2.14 CancelAfterHold (CancelHold)

**Purpose**: Abandon a Held (not yet finalized) booking, releasing the inventory — the terminal action for Hold-branch flows that don't proceed to BookAfterHold (flows 6,12,18,24 in V1; equivalent V2 families).

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightBooking/CancelAfterHold` | `{{baseUrl}}api/V2/FlightBooking/CancelAfterHold` |
| Method | POST | POST |

**Required Request Fields** (V1): `supplier`, `credentialsSelector`, `pnr`, `gdsPNR`, `bookingToken`.
**Required Request Fields** (V2) — **defect**: `{"supplier" : "{{Supplier_Name}}", "credentialsSelector" : {{Credentials_Selector}}, "pnr": ..., "gdsPNR": ..., "bookingToken": ...}` — `INFERRED` the V2 saved request body is **missing quotes around `{{Credentials_Selector}}`**, making the raw body **invalid JSON** once Postman substitutes the variable (it would render as `"credentialsSelector" : UAE,` — a bare, unquoted token — a JSON parse error). This must be fixed (add quotes) before this request can even be sent successfully. Flag prominently as a collection defect in §7 — this is not a business-logic inference, it is a literal syntax bug in the saved request body.

**Business Logic**: `UNKNOWN` — neither collection has a test script on this request at all (no price check, no variable capture) in either version.

**Expected Success Response** `[Confirmed live 2026-08-05, V1/TravelportNdc, reproduced across two independent runs]`: HTTP 200 with `{cancelled: true, message: 'Reservation cancelled successfully.'}` — a minimal two-field acknowledgement. It does **not** echo `pnr` and does **not** contain `bookingStatus`. Verification that the cancel took effect must come from a follow-up Retrieve, which returns HTTP 409 `NDC-INT-BYP-A0003` `'Reservation is already cancelled'` (`Context: 'TERMINAL: RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED'`).

**Response Mapping**: none.

**IDs Generated**: none.

**Common Errors**: cancelling an already-booked (non-held) PNR; cancelling after hold expiration; cancelling twice.

**Testing Notes**: Given (a) the JSON-syntax defect and (b) zero script coverage, this is the **least-validated endpoint in the entire collection** — prioritize it for dedicated manual single-endpoint testing (isolated request/response validation, §7) precisely because automation coverage here is effectively nonexistent. After cancelling, a follow-up Retrieve should show a cancelled/terminated `bookingStatus` — treat that as the primary success signal until a genuine CancelHold response example is obtained.

---

### 2.15 Void

**Purpose**: Void a just-issued ticket (within the airline's void window, typically same-day) — the terminal action for direct-Book flows that end with Void (flows 3,9,15,21 in V1; equivalent V2 families) rather than simply retrieving and stopping.

| | V1 | V2 |
|---|---|---|
| URL | `{{baseUrl}}api/FlightBooking/Void` | `{{baseUrl}}api/V2/FlightBooking/Void` |
| Method | POST | POST |

**Required Request Fields**: `supplier`, `credentialsSelector`, `pnr`, `gdsPNR` (V2 saved example shows this as a **literal empty string `""`**, not a variable reference — `INFERRED` either a copy-paste leftover from a supplier that doesn't use a `gdsPNR` at all, or an oversight; compare against V1's `"{{gdsPNR}}"` which does reference the variable — a version-specific request-shape difference worth confirming isn't a bug), `bookingToken`, `surName` (observed hardcoded `"Tallat"` in both saved examples — matches the test passenger data's surname, `INFERRED` required for void authorization/matching), `voidTickets` (array, empty `[]` in every saved example — `UNKNOWN` exact shape when populated, presumably ticket numbers to selectively void vs. void-all-when-empty).

**Business Logic**: `UNKNOWN` — no test script on Void in either collection.

**Expected Success Response**: `UNKNOWN` for a void-eligible booking — not observed this run. `[Confirmed live 2026-08-05, V1/TravelportNdc]`: Void is **not supported** for this supplier at all — even a freshly-ticketed, in-window booking returns HTTP 409 `{ErrorCode: 'OperationNotSupported', ErrorMessage: 'This action is not currently supported by the selected supplier.', Context: [{Name:'OperationNotSupported', Value:'TravelportNdc does not exists'}]}` (NOTE: the Context value is misleading — the supplier exists and serves Search/FareConfirm/Book/Hold/Retrieve; only Void is absent). `INFERRED` by analogy with Book's `voidCapability` field (§2.9) — a booking must have `voidCapability` indicating void-is-currently-possible (not `"VoidNotAllowed"`) for this call to plausibly succeed on a supplier that *does* support it; this is a **live, time-boxed capability**, not a static per-supplier flag (§4.2 lists Void as a supplier-level capability, but the *specific booking's* eligibility is additionally time-gated by the void window).

**Response Mapping**: none.

**Common Errors**: voiding outside the void window; voiding a booking whose `voidCapability` was already `"VoidNotAllowed"` at Book time; voiding with an incorrect `surName`.

**Negative Cases**: Void on a supplier from §4.1's route table where the `Void` column is blank/unmarked (`INFERRED` not confirmed-supported — e.g., most suppliers besides EgyptAir/Oman Air/AirCairo per the Integration doc); Void twice on the same ticket.

**Testing Notes**: Because `gdsPNR` is hardcoded empty in the one V2 example, **verify live whether Void requires `gdsPNR` for GDS-routed suppliers** (Amadeus, Sabre, Galileo, TravelportNDC per §4.1) even though the LCC-supplier example (AirArabia) didn't need it — this is plausibly a supplier-type-dependent required field, not universally optional.

## 3. Integration Analysis

This section explains how every endpoint connects to every other endpoint — the ID/data dependencies, business dependencies, and timing constraints that make the 89 flows in §5 work (or correctly fail).

### 3.1 Master Chain Diagram

```
                                          ┌─ (V2 only) ─────────────────────────────────────────┐
                                          │                                                       │
Search ──┬──> FareConfirm ──┬──> [GetOfferBundles] ──> [AddPassenger] ──┬──> [GetAncillary] ──┬──> [GetSeatMap] ──> [FareCheck] ──┐
         │                  │                                          │                      │                                  │
         └──> Upselling ────┘         (V1: no AddPassenger —           └──────────────────────┴──────────────────────────────────┤
              (alternate to           FareConfirm/Bundle output                                                                   │
               FareConfirm,           routes directly to Book/Hold)                                                              │
               not both)                                                                                                          ▼
                                                                                                                    ┌────── Book ──────┐
                                                                                                                    │                    │
                                                                                                                    └──── Hold ──┐       │
                                                                                                                                 │       │
                                                                                                            FareConfirmAfterHold │       │
                                                                                                              (PnrReprice)        │       │
                                                                                                                     │            │       │
                                                                                                                     ▼            │       │
                                                                                                                Retrieve ◄────────┘       │
                                                                                                                     │                     │
                                                                                            ┌────────────────────────┼─────────────────────┘
                                                                                            │                        │
                                                                                            ▼                        ▼
                                                                                     BookAfterHold ──> Retrieve      Retrieve
                                                                                            │                        │
                                                                                            ▼                        ▼
                                                                                          Void                 Void / CancelAfterHold
                                                                                     (direct-Book branch)      (Hold branch: Void after
                                                                                                                 BookAfterHold, or
                                                                                                                 CancelAfterHold instead
                                                                                                                 of BookAfterHold)
```

Every arrow above is an **ID hand-off**, detailed in §3.2. Every bracketed `[Step]` is V2-only and/or supplier-capability-conditional (§4.2) — the un-bracketed spine (Search → FareConfirm/Upselling → Book **or** Hold → FareConfirmAfterHold → BookAfterHold → Retrieve → Void/CancelAfterHold) is the one path every flow in §5 shares.

### 3.2 Endpoint-to-Endpoint Connections

For each connection: **Input dependency** (what must exist before calling), **Output dependency** (what it produces for the next call), **Business dependency** (the capability/state precondition), **Required IDs**, **Timing/Expiration**, **Supplier restrictions**, **Validation rules**.

#### Search → FareConfirm / Upselling
- **Input dependency**: none (Search is the entry point).
- **Output dependency**: `responseId` (V1: `searchResponseId`; V2: same field name `responseId` in the response, but consumed as `ResponseId` in the next request body per §2.2), one `offerId` from `offers[]` (test-script convention: always `offers[0]`, §2.1).
- **Business dependency**: the chosen offer must still be live/available — no explicit TTL was found in any document; `INFERRED` short-lived (industry-standard availability windows are typically minutes, not hours) — treat as **`UNKNOWN` exact expiration, but assume it is short** and test both "immediate FareConfirm" (positive) and "delayed FareConfirm, e.g. 10+ minutes later" (boundary/negative) explicitly.
- **Required IDs**: `searchResponseId`/`responseId` + `offerId`.
- **Timing/Expiration**: `UNKNOWN` exact window — flag as a confirmation item with the dev team; test empirically by delaying FareConfirm calls by increasing intervals until failure is observed, then document the actual threshold back into this spec.
- **Supplier restrictions**: none at this hop — Search/FareConfirm are the two universally-supported endpoints (§4.2).
- **Validation rules**: `offerId` passed to FareConfirm/Upselling must be byte-for-byte identical to what Search returned (these are opaque encoded tokens, §2.1 — any mutation, truncation, or re-encoding will invalidate it).

#### FareConfirm/Upselling → GetOfferBundles *(V2 and V1, conditional)*
- **Input dependency**: FareConfirm's (or Upselling's, per §2.3's ID-substitution rule) `fareConfirmResponseId`/`selectedOfferId`.
- **Output dependency**: bundle choices; no reliable chained ID (§2.4's `JourneyKey1` bug) — the **bundle code** itself (e.g. `"66569"`) is what a human tester carries forward into `selectedBundles`.
- **Business dependency**: `haveBundles: true` on the FareConfirm/Upselling response (§2.2) — calling this for a `haveBundles: false` offer is the primary negative/boundary test for this hop.
- **Required IDs**: `fareConfirmResponseId`, `selectedOfferId` (unchanged, passed through).
- **Timing/Expiration**: same offer-freshness window as FareConfirm → Book/Hold below (bundles are priced against the same confirmed offer).
- **Supplier restrictions**: per §4.2 — e.g. `INFERRED` FlyNas, GLC, SereneAir, SpiceJet, FlyAdeal, Air Arabia are bundle-capable per the source documents; most GDS suppliers (Amadeus, Sabre, Galileo, TravelportNDC) show no bundle marking in either source (`UNKNOWN`/likely not supported for those).
- **Validation rules**: returned `bundleChoices` keys should be a subset of `offerJourneys.<segment>.bundleReferences`.

#### FareConfirm/Upselling → AddPassenger *(V2 only)*
- **Input dependency**: `fareConfirmResponseId`/`fareConfirmSelectedOfferId` (or `upSellingResponseId`/`upSellingSelectedOfferId` if the Upselling path was used, §2.3) — **or**, when Bundle is also in the flow, still FareConfirm's original IDs (GetOfferBundles does not mint new ones, §2.4) — i.e. **AddPassenger always consumes FareConfirm/Upselling's IDs directly, regardless of whether Bundle sits in between**.
- **Output dependency**: `getAddPaxOfferId`, `getAddPaxResponceID` — a **new** ID pair that supersedes FareConfirm's from this point forward.
- **Business dependency**: none beyond a valid, live offer — AddPassenger is universal in V2 (no capability gate).
- **Required IDs**: as above.
- **Timing/Expiration**: same offer-freshness window.
- **Supplier restrictions**: none (V2-universal step).
- **Validation rules**: every `INF` passenger's `ParentPaxRefId` must resolve within the same request's `passengersList` (§2.5).

#### AddPassenger → GetAncillary / GetSeatMap *(V2 only, conditional)*
- **Input dependency**: `getAddPaxOfferId`/`getAddPaxResponceID`.
- **Output dependency**: GetAncillary → `ANCofferId`/`ANCresponseId` + a catalog of ancillary codes; GetSeatMap → seat cell codes (not auto-captured, §2.7).
- **Business dependency**: `offerHasAncillary`/`isAncillaryRequired` (from FareConfirm, carried forward conceptually) for GetAncillary; `isSeatMapRequired` for GetSeatMap. **These two steps are siblings, not sequential dependents of each other** — flow.md shows both orderings across different flow families (GetAncillary-then-GetSeatMap in flows 60–71, GetSeatMap-only in 49–59, GetAncillary-only in 37–48) — `INFERRED` they can run in either order or independently since both consume the *same* AddPassenger-era IDs, not each other's output.
- **Required IDs**: `getAddPaxOfferId`/`getAddPaxResponceID` (both endpoints consume the same pair, independently).
- **Supplier restrictions**: per §4.2 ancillary/seat capability columns.
- **Validation rules**: ancillary/seat codes selected later (at Book/Hold/FareCheck time) must have been present in this step's response catalog — a code not present here is an automatic negative test for the downstream step.

#### GetAncillary (+ GetSeatMap) → FareCheck *(V2 only, conditional)*
- **Input dependency**: `ANCofferId`/`ANCresponseId` (from GetAncillary) plus the tester's chosen ancillary codes (from GetAncillary) and/or seat codes (from GetSeatMap, manually carried).
- **Output dependency**: `fareConfirmSelectedOfferId` (overwritten!) + `fareCheckOfferId` — re-priced offer including ancillary/seat costs.
- **Business dependency**: `isFareCheckRequired: true` on GetAncillary's response (§2.6) — `INFERRED` **the live-authoritative signal for whether this hop is mandatory**, overriding any assumption drawn purely from flow.md's flow list.
- **Required IDs**: `ANCofferId`/`ANCresponseId` in, `fareCheckOfferId` out.
- **Timing/Expiration**: same offer-freshness family — plus `UNKNOWN` whether ancillary/seat *inventory* (as opposed to the fare offer itself) has its own, possibly shorter, availability window (seat maps in particular are highly perishable in real airline systems — `INFERRED` risk, not evidenced, flag as exploratory test).
- **Validation rules**: price delta between pre-FareCheck and post-FareCheck totals should equal the sum of selected ancillary/seat prices (§2.8).

#### FareConfirm (direct, V1) / AddPassenger-or-FareCheck (V2) → Book
- **Input dependency**: V1 — `fareConfirmResponseId`/`selectedOfferId` directly from FareConfirm/Upselling (no intermediate step required, even if Bundle was called — Bundle doesn't mint new IDs, §2.4). V2 — `getAddPaxResponceID`/`getAddPaxOfferId` (no-enrichment flows) or `fareCheckOfferId`/its `responseId` (enrichment flows) — `UNKNOWN` exactly which ID pair Book/Hold expect when GetAncillary/GetSeatMap ran but FareCheck did not (a flow shape not present in flow.md's list, so not directly testable from the given flows, but worth a boundary awareness note).
- **Output dependency**: `pnr`, `bookingToken`, `gdsPNR`.
- **Business dependency**: none beyond a live offer (Book is universal, §4.2) — but **production booking is auto-skip-gated** per §2.9's Testing Note; commercial whitelist/blacklist (§4.3) is an additional business gate independent of technical capability.
- **Timing/Expiration**: the tightest window in the whole chain — inventory can sell out between FareConfirm/AddPassenger/FareCheck and Book; `INFERRED` this is a real race condition worth deliberately testing by introducing a delay before Book.
- **Supplier restrictions**: whitelist/blacklist (§4.3) — a commercially-blacklisted supplier/airline should be blocked from Book even if technically reachable through Search/FareConfirm.
- **Validation rules**: price reconciliation (§2.9); returned `pnr` non-empty and (`INFERRED`) matches the target supplier's typical PNR format (6-character alphanumeric observed in examples — `C6D9FZ`, `FEJNSR`).

#### FareConfirm-or-AddPassenger/FareCheck → Hold
- Same input/output/business shape as → Book, **except** gated by `canBeHeld: true` (§2.1/§2.2 live flag; §4.2 static matrix) rather than being universal, and produces a **`holdExpirationDate`** in addition to `pnr`/`bookingToken`/`gdsPNR`.
- **Timing/Expiration**: `holdExpirationDate` is the defining constraint of the entire Hold branch — FareConfirmAfterHold and BookAfterHold **must** occur before this timestamp; CancelAfterHold can occur any time up to (and, `UNKNOWN`, possibly after) it. **No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after `holdExpirationDate` has passed** — this is a gap in the given flow list and a high-value **additional** exploratory test to propose (§7), not a documented flow.
- **Supplier restrictions**: per §4.2 Hold column — `INFERRED` universally supported except a small explicitly-marked set (FlyNas, GLC per the Integration doc's explicit `NO`/`-` marks) — cross-referenced against the Airline Booking Availability doc's blanket note **"Hold For All Is Allowed"**, which appears to **contradict** the per-supplier technical marks. This conflict is flagged, not resolved, in §4.4 — treat per-supplier Hold-capability as `UNKNOWN`/needs-live-confirmation for FlyNas and GLC specifically until the discrepancy is resolved with the business/dev team.

#### Hold → Retrieve → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve
- **Input dependency** (each hop): `pnr`/`gdsPNR`/`bookingToken` — **unchanged and identical** across this entire sub-chain (§2.13's same-PNR invariant).
- **Output dependency**: FareConfirmAfterHold re-validates price (no new IDs); BookAfterHold finalizes the booking (no new IDs, same trio confirmed).
- **Business dependency**: must occur before `holdExpirationDate`.
- **Validation rules**: `bookingStatus` (from Retrieve, §2.11) should read "Held" immediately after Hold, and transition to a booked/ticketed status only after BookAfterHold — **this is the primary flow-state assertion for every Hold-branch flow** (§7).

#### Book/BookAfterHold → Retrieve → Void
- **Input dependency**: `pnr`/`gdsPNR`/`bookingToken`, plus (`INFERRED`) `voidCapability` from the Book/BookAfterHold response should be checked before attempting Void — a booking reporting `voidCapability: "VoidNotAllowed"` should not be expected to Void successfully.
- **Business dependency**: void window (typically same-day/24-hour in real airline systems — `UNKNOWN` exact window enforced by this API, exploratory test candidate) + per-supplier Void support (§4.2 — only EgyptAir/Oman Air/AirCairo explicitly marked `Void=yes` in the Integration doc; all others `UNKNOWN`/unmarked).
- **Validation rules**: a subsequent Retrieve after Void should show a voided/cancelled `bookingStatus`.

#### Hold → CancelAfterHold (alternative terminal branch, bypassing BookAfterHold)
- **Input dependency**: `pnr`/`gdsPNR`/`bookingToken` from Hold.
- **Business dependency**: must occur before `holdExpirationDate`; **must not** have already proceeded to BookAfterHold (a flow either does BookAfterHold+Void **or** CancelAfterHold — never both, per every flow in flow.md).
- **Validation rules**: `UNKNOWN` beyond a follow-up Retrieve confirming a cancelled status (§2.14) — this endpoint has essentially no built-in validation in either collection, so manual testing must supply all of it.

### 3.3 Cross-Cutting ID Lifecycle Table

| ID | Produced By | Consumed By | Lifetime / Expiration |
|---|---|---|---|
| `searchResponseId` / `responseId` (Search) | Search | FareConfirm, Upselling | `UNKNOWN`, assume short (availability-window-bound) |
| `offerId` (Search) | Search | FareConfirm, Upselling | Same as above — tied to `searchResponseId` |
| `fareConfirmResponseId` / `selectedOfferId` | FareConfirm (or Upselling, renamed per §2.3) | GetOfferBundles, AddPassenger (V2), Book/Hold (V1 direct) | `UNKNOWN`, likely short; re-priced/refreshed at each downstream confirm-type step |
| `upSellingResponseId` / `upSellingSelectedOfferId` | Upselling (V2) | Must be manually substituted wherever `fareConfirmResponseId`/`fareConfirmSelectedOfferId` is expected next (§2.3) | Same family as above |
| `getAddPaxOfferId` / `getAddPaxResponceID` | AddPassenger (V2) | GetAncillary, GetSeatMap, Book/Hold (V2, no-enrichment path) | `UNKNOWN` |
| `ANCofferId` / `ANCresponseId` | GetAncillary (V2) | FareCheck | `UNKNOWN` |
| `fareCheckOfferId` | FareCheck (V2) | Book/Hold (V2, enrichment path) | `UNKNOWN` |
| `pnr` / `bookingToken` / `gdsPNR` | Book or Hold | Retrieve, FareConfirmAfterHold, BookAfterHold, CancelAfterHold, Void | Lifetime of the booking itself — not time-boxed the way offer IDs are, but the **actions available change** based on `bookingStatus`/`voidCapability`/`holdExpirationDate` |
| `holdExpirationDate` | Hold | (implicit constraint on) FareConfirmAfterHold, BookAfterHold, CancelAfterHold | Hard deadline — actions after this point are `UNKNOWN`/untested by the given flow list, high-value exploratory target |

### 3.4 Supplier Restrictions on Integration Points

See §4.2 for the full capability matrix. The integration-specific takeaway: **every bracketed step in §3.1's diagram is a potential flow-skip point**, and the correct test design is not "does this flow work" in isolation but "does the flow correctly **skip** a step the target supplier doesn't support, and correctly **fail/reject** if a tester forces that step anyway." Both directions (correct skip, correct rejection-when-forced) are first-class test cases per §7.

## 4. Supplier Capabilities

### 4.0 Sources and Their Reliability

Three source documents contribute supplier-capability data, and they **do not fully agree with each other**. This section presents each, then a merged matrix, then an explicit list of conflicts — per this document's ground rules, conflicts are flagged, not silently resolved.

1. **`Integration 1: Supplier Features & Routes.md`** — a hand-maintained table with clean, parseable columns (`Bundle`, `UpSelli`, `Cancel`, `Void`, `Hold`) per supplier, plus test routes and a supplier-attribute table (Standard/Data Format/Supplier Type/Software Company/Reach Type/Offer Type). Treated as the **primary structured source** for Bundle/Upsell/Cancel/Void/Hold because its table structure survived intact.
2. **PRD §4.5** (`suppliers.json` cross-reference) — describes the automation framework's own capability config file, cross-referenced against its 38-supplier TestData set. Its underlying markdown table's column alignment was **not recoverable** beyond confirming *how many* of the six capability flags (`Bundle=true`, `CanBeHeld=false`, `Baggage`, `Meal`, `Other`, `Seat` ancillary support) are set per supplier — except for `FlyNas` and `SpiceJet`, whose rows have enough checkmarks to align unambiguously with all/most columns. Treated as a **secondary, count-only corroborating source** for every other supplier (e.g. "GLC has 3 of 6 flags set" is usable; "which 3" is not, beyond what Integration1.md separately confirms).
3. **`Airline Booking Availability (Production Credentials).md`** — a commercial whitelist/blacklist, a **different dimension entirely** (§1.8): it governs whether a supplier/airline may be booked/ticketed at all in production, independent of technical capability. See §4.3.

### 4.1 Supplier Features & Routes (source table, reproduced)

| Supplier | Standard | Data Format | Supplier Type | Software Company | Reach Type | Offer Type |
|---|---|---|---|---|---|---|
| SabreNdc | IATA | Json | GDS | Sabre | Email | Offer Based |
| Flyadeal | Navitaire | Json | LCC | — | Ticketing Sys | Journey based |
| Indigo | — | XML | LCC | Travelport | Email | Offer Based, Journey based |
| Galileo | — | XML | GDS | Travelport | Email | Offer Based, Journey based |
| FlyNas | Navitaire | XML | LCC | — | Email | Journey based |
| FlyDubai | — | — | — | — | — | Journey based |
| AirCairo | IATA | XML | LCC | TPConnect | Ticketing Sys | Offer Based |
| EgyptAir | IATA | XML | LCC | TPConnect | Ticketing Sys | Offer Based |
| TravelportNdc | — | Json | GDS | Travelport | Ticketing Sys | Journey based |
| SabreAtpco | EDIFACT | Json | GDS | Sabre | Email | Journey based |
| ElJazeera | Navitaire | Json | LCC | — | Email | Journey based |
| AirBlue | — | XML | LCC | AirBlue | Email | Journey based |
| Glc | — | — | LCC | — | — | Offer Based |
| SereneAir | — | — | — | — | — | Journey based |
| Amadeus | — | — | — | — | — | Journey based |
| AegeanV21 | IATA | XML | LCC | Accelya | Ticketing Sys | Journey based, Offer Based |
| EmiratesV21 | IATA | XML | LCC | Accelya | Ticketing Sys | Journey based, Offer Based |
| EmiratesV17 | IATA | XML | LCC | Accelya | Ticketing Sys | Journey based, Offer Based |
| AirIndia | Navitaire | Json | LCC | — | Email | Journey based |
| TKConnect | IATA | XML | LCC | TKConnect | Ticketing Sys | Offer Based |
| SpiceJet | Navitaire | XML | LCC | — | Email | Journey based |
| ElJazeeraV4 | Navitaire | Json | LCC | El Jazeera | Email | Journey based |
| AmadeusNDC | — | — | — | — | — | Journey based |
| OmanAirV17 | IATA | XML | LCC | Accelya | Ticketing Sys | Offer Based, Journey based |
| AJet | IATA | XML | LCC | — | Email | Offer Based |
| AirSial | — | Json | LCC | — | Email | Journey based |
| Ethiopian | IATA | XML | LCC | — | Email | Journey based |
| AirArabia | Open Travel | XML | LCC | ACCELAERO | Email | Offer Based |
| RiyadhAir | IATA | XML | LCC | Flyr RX | Ticketing Sys | Journey based, Offer Based |
| GulfAir | IATA | XML | LCC | TPConnect | Ticketing Sys, Email | Journey based, Offer Based |
| FlyCham | — | — | — | — | — | Journey based |

`INFERRED`: this table is why a single normalized API contract genuinely needs a supplier-adapter layer (§1.3) — the underlying protocols span IATA XML, EDIFACT, Navitaire, Open Travel XML, and JSON, across GDS and LCC/direct-airline integration types, with three reach mechanisms (Email, Ticketing System, both). Two rows (`ElJazeera` vs `ElJazeeraV4`, `OmanAirV17` — note this table itself never even lists a plain `OmanAir`) directly corroborate the PRD's Gap #11/#12 name-mismatch findings (§4.4).

### 4.2 Bundle / Upsell / Cancel / Void / Hold Matrix (source table, reproduced)

| Supplier | Bundle | Upsell | Cancel | Void | Hold |
|---|---|---|---|---|---|
| Amadeus / NDC | Unknown | Unknown | Unknown | Unknown | **Yes** |
| Sabre / NDC | Unknown | Unknown | **Yes** | Unknown | **Yes** |
| Galileo | Unknown | Unknown | Unknown | Unknown | **Yes** |
| Travelport NDC | Unknown | Unknown | Unknown | Unknown | **Yes** |
| EgyptAir | Unknown | Unknown | **Yes** | **Yes** | **Yes** |
| Emirates | Unknown | Unknown | Unknown | Unknown | **Yes** |
| Turkish (TkConnect) | Unknown | Unknown | Unknown | Unknown | **Yes** |
| FlyNas | **Yes** | Unknown | Unknown | Unknown | **No** |
| FlyAdeal | **Yes** | Unknown | Unknown | Unknown | Unknown |
| Air Arabia | **Yes** | Unknown | Unknown | Unknown | Unknown |
| FlyDubai | Unknown | Unknown | Unknown | Unknown | Unknown |
| Indigo | Unknown | Unknown | Unknown | Unknown | Unknown |
| SpiceJet | Unknown | Unknown | Unknown | Unknown | **Yes** |
| Oman Air | Unknown | Unknown | **Yes** | **Yes** | **Yes** |
| Salam Air | Unknown | Unknown | Unknown | Unknown | Unknown |
| AlJazeera V4 | Unknown | Unknown | Unknown | Unknown | **Yes** |
| Air Blue | Unknown | Unknown | Unknown | Unknown | **Yes** |
| Air Sial | Unknown | Unknown | Unknown | Unknown | Unknown |
| SereneAir | Unknown | Unknown | Unknown | Unknown | Unknown |
| Aegean | Unknown | Unknown | Unknown | Unknown | **Yes** |
| AJET | Unknown | Unknown | Unknown | Unknown | **Yes** |
| AirCairo | Unknown | Unknown | **Yes** | **Yes** | **Yes** |
| GLC | **No** (explicit `-`) | Unknown | Unknown | Unknown | **No** (explicit `-`) |
| GulfAir | Unknown | Unknown | Unknown | Unknown | **Yes** |
| FlyCham | **No** (explicit) | **No** (explicit) | Unknown | Unknown | Unknown |

**Reading note**: a blank cell in the source table means "not recorded" (`Unknown`), not "confirmed unsupported" — only `GLC`'s `-` marks and `FlyCham`'s explicit `NO` are treated as confirmed-negative. This distinction matters for test planning: an `Unknown` cell means "confirm live before scheduling a flow that needs this capability," not "skip this flow."

### 4.3 Commercial Whitelist / Blacklist (Production Credentials doc, reproduced)

This is independent of technical capability (§1.8) — a supplier can be technically capable (§4.2) while commercially blocked here, or vice versa.

| Category | Whitelisted | Blacklisted |
|---|---|---|
| **LCCs (by supplier)** | *(none listed)* | Fly Dubai, Air Arabia Egypt (E5), Air Arabia G9, Air Arabia UAE (3L), Air Arabia (3O), Serene Air, Air India, Indigo, Air Blue, Jazeera, FlyNas, Air Cairo, FlyAdeal, SpiceJet, Salam Air, Fly Jinnah |
| **GDSs (by airline riding the GDS)** | MS: Egyptair, Emirates, Saudi Arabian Airlines, Kuwait, Gulf, Middle East, Royal Jordanian, Nesma | Air Cairo, Nile Air, UJ: AlMasria Universal Airlines (marked "?? will check" in source — unconfirmed), BG: Biman Bangladesh Airlines (marked "?? will check" — unconfirmed), PK: Pakistan International Airlines (marked "?? will check" — unconfirmed), Etihad Airways |
| **NDCs (by supplier)** | Egyptair, Aegean, Emirates, Turkish | Air Cairo, GLC (**"Per request — inform us first before issuing any ticket"**, i.e. conditional-not-outright-blacklisted) |

**Blanket policy note (source doc, verbatim intent)**: *"Hold For All Is Allowed"* — a business-policy statement that Hold should be permitted across all suppliers.

**GDS roster referenced by this doc**: Galileo, TravelPortNDC, SabreNDC, SabreATPCO, Amadeus, AmadeusNDC (this is just the GDS-type supplier list, not itself a whitelist).

`INFERRED` **note on `Indigo` appearing twice** in the LCC-blacklist list (source doc lists it once mid-list and once at the very end) — likely a duplication artifact in the source, not a meaningful signal; not corrected here per this project's "don't invent, flag instead" rule.

### 4.4 Known Source Conflicts (flagged, not resolved)

These are direct disagreements between §4.2 (Integration doc) and PRD §4.5 (`suppliers.json`), surfaced during cross-referencing. **Do not silently pick a side** — confirm live with the dev/business team before relying on either for a specific supplier's flow gating:

| Supplier | Integration doc (§4.2) says | PRD/`suppliers.json` (§4.5) says | Conflict |
|---|---|---|---|
| `AirCairo` | Hold = **Yes** | `CanBeHeld = false` is one of the 5 suppliers in that list (PRD narrative names it as an example) | **Direct contradiction on Hold support** |
| `EgyptAir` | Hold = **Yes** | Has ≥1 capability flag set, `INFERRED` plausibly `CanBeHeld=false` per the same pattern as AirCairo/Galileo | Possible contradiction — column unresolved, flagged as risk |
| `Galileo` | Hold = **Yes** | Has exactly 1 capability flag set, `INFERRED` plausibly `CanBeHeld=false` (Galileo is a GDS, and the PRD narrative specifically calls out `canBeHeldFalseSuppliers` as a 5-member list that a change to shared code "risks silently breaking") | Possible contradiction — column unresolved, flagged as risk |
| `GLC` | Bundle = **No** (explicit `-`) | `Bundle=true` explicitly named in PRD's cross-reference table | **Direct contradiction on Bundle support** |
| `SereneAir` | All capabilities Unknown (blank row) | `Bundle=true`, `CanBeHeld=false` both explicitly named | Integration doc simply has no data here — not a contradiction, but a **gap** worth filling |
| `SpiceJet` | Hold = **Yes** | `CanBeHeld=false` pattern strongly implied (5 of 6 flags set, `SpiceJet` explicitly named alongside `FlyNas` as having a full/near-full capability row) | **Likely contradiction on Hold support** |
| `FlyNas` | Bundle = **Yes**, Hold = **No** | `Bundle=true`, `CanBeHeld=false`, all 4 ancillary types — **fully consistent** | **No conflict** — cross-validated, high confidence |

**Testing implication**: for `AirCairo`, `EgyptAir`, `Galileo`, `SpiceJet`, and `GLC` specifically, **treat Hold/Bundle capability as `UNKNOWN` pending live confirmation**, not as whatever either source claims — schedule a cheap, isolated "call Hold and see what happens" confirmation test for each before running any multi-step Hold-branch flow (§5) against them. This is exactly the kind of discrepancy §2.1/§2.2's live per-offer capability flags (`canBeHeld`, `haveBundles`) exist to resolve at runtime — when in doubt, trust the live flag over either static document.

### 4.5 Full Supplier Roster (38 TestData Targets, per PRD §4.1)

`Aegean`, `AegeanV21`, `AirArabia`, `AirBlue`, `AirCairo`, `AirIndia`, `Amadeus`, `AmadeusNDC`, `EGY AirSial`, `EGY Ajet`, `EgyptAir`, `ElJazeera`, `Emirates`, `EmiratesV17`, `EmiratesV21`, `FlyAdeal`, `FlyDubai`, `FlyNas`, `Galileo`, `GLC`, `GulfAir`, `Indigo`, `KSA Aegean`, `KSA EgyptAir`, `KSA TKConnect`, `KSAEgyptAir`, `Nesma`, `OmainAir`, `ProdGTWFlyNas`, `ProdGTWGalileo`, `ProdGTWJazeera`, `RiyadhAir`, `SabreNDC`, `SereneAir`, `SpiceJet`, `TkConnect`, `TravelPortNDC`, `UAEAmadeusNDC`.

`INFERRED`: several of these are **version/regional variants of the same underlying integration**, not independent systems (per PRD §4.1) — `Aegean`/`AegeanV21`, `Emirates`/`EmiratesV17`/`EmiratesV21`, `EgyptAir`/`KSAEgyptAir`/`KSA EgyptAir`, `TkConnect`/`KSA TKConnect`, and the `ProdGTW*` folders (production-gateway/mocked variants of FlyNas, Galileo, Jazeera). When a capability is confirmed for the base name, `INFERRED` it likely (not certainly) applies to its variants too — verify at least once per variant rather than assuming, since a "V21" or "KSA" variant may exist precisely *because* something differs.

**Two evidenced name-mismatch bugs** directly affect capability lookups (PRD Gaps #3, #11, #12): `suppliers.json` references `"Indego"` (not `Indigo`), `"ElJazeeraV4"` (not `ElJazeera`), and `"OmanAirV17"` (not `OmainAir`, which itself may be a typo of "OmanAir"). Because the lookup is case-insensitive but not spelling-tolerant, **these three suppliers silently receive zero capability flags regardless of their true capability** — `INFERRED` **testing implication**: for `Indigo`, `ElJazeera`, and `OmainAir` specifically, do not trust "no capability entry found" as evidence of "not supported" — it is equally, if not more, likely evidence of this known lookup-mismatch bug. Treat all three as `UNKNOWN` pending live/manual confirmation, same as §4.4's conflicted suppliers.

### 4.6 Capability Summary Matrix (Supported / Not Supported / Conditional / Unknown)

Universal endpoints (same for all 38 suppliers, not repeated per row): **Search = Supported**, **FareConfirm = Supported**, **Book = Supported**, **Retrieve = Supported**, **AddPassenger (V2) = Supported** (universal V2 step, no capability gate found), **Refund = Not Supported (No Endpoint, any version)**, **Exchange = Not Supported (No Endpoint, any version)**.

| Supplier | Upsell | Bundle | Hold | CancelHold | Void | Ancillary (any type) | SeatMap (V2) |
|---|---|---|---|---|---|---|---|
| Amadeus / AmadeusNDC / UAEAmadeusNDC | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |
| SabreNDC | Unknown | Unknown | Supported | Supported | Unknown | Unknown | Unknown |
| Galileo / ProdGTWGalileo | Unknown | Unknown | **Conditional** (§4.4 conflict) | Unknown | Unknown | Unknown | Unknown |
| TravelPortNDC | Unknown | Unknown | Supported | Unknown | Unknown | Conditional (2 flags set, type unresolved) | Unknown |
| EgyptAir / KSAEgyptAir / KSA EgyptAir | Unknown | Unknown | **Conditional** (§4.4 conflict) | Supported | Supported | Unknown (1 flag set) | Unknown |
| Emirates / EmiratesV17 / EmiratesV21 | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |
| TkConnect / KSA TKConnect | Unknown | Unknown | Supported | Unknown | Unknown | Conditional (2 flags set) | Unknown |
| FlyNas / ProdGTWFlyNas | Unknown | **Supported** | **Not Supported** (cross-validated) | Unknown | Unknown | **Supported** (Baggage, Meal, Other, Seat — full house) | Unknown |
| FlyAdeal | Unknown | **Supported** | Unknown | Unknown | Unknown | Conditional (1 flag set) | Unknown |
| AirArabia | Unknown | **Supported** | Unknown | Unknown | Unknown | Conditional (2 flags set) | **Supported** (V2 example response captured, §2.7) |
| FlyDubai | Unknown | Unknown | Unknown | Unknown | Unknown | Conditional (2 flags set) | Unknown |
| Indigo | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown (name-mismatch bug, §4.5) | Unknown |
| SpiceJet | Unknown | **Conditional** (§4.4 conflict) | **Conditional** (§4.4 conflict) | Unknown | Unknown | Conditional (3 flags set) | Unknown |
| Oman Air / OmainAir | Unknown | Unknown | Supported | Supported | Supported | Unknown (name-mismatch bug, §4.5) | Unknown |
| Salam Air | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown |
| AlJazeera V4 / ElJazeera / ProdGTWJazeera | Unknown | Unknown | Supported | Unknown | Unknown | Unknown (name-mismatch bug, §4.5) | Unknown |
| AirBlue | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |
| EGY AirSial | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown |
| SereneAir | Unknown | **Conditional** (§4.4 gap) | **Conditional** (§4.4 gap) | Unknown | Unknown | Conditional (1 flag set) | Unknown |
| Aegean / AegeanV21 / KSA Aegean | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |
| EGY Ajet | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |
| AirCairo | Unknown | Unknown | **Conditional** (§4.4 conflict) | Supported | Supported | Conditional (2 flags set) | Unknown |
| GLC | Unknown | **Conditional** (§4.4 conflict) | **Not Supported** (both sources agree) | Unknown | Unknown | Conditional (Baggage flag set) | Unknown |
| GulfAir | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |
| FlyCham | **Not Supported** (explicit) | **Not Supported** (explicit) | Unknown | Unknown | Unknown | Unknown | Unknown |
| RiyadhAir | Unknown | Unknown | Unknown | Unknown | Unknown | Conditional (2 flags set) | Unknown |
| AirIndia | Unknown | Unknown | Unknown | Unknown | Unknown | Conditional (2 flags set) | Unknown |
| Nesma | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown |

`INFERRED` **AirArabia SeatMap note**: marked `Supported` above with higher confidence than most other `Unknown` cells in this matrix, because §2.7's saved V2 example response is a **live, observed** SeatMap result for `AirArabia` specifically — direct evidence, not a document cross-reference. This is a reminder that a single genuine Postman example outweighs any number of ambiguous static-doc checkmarks.

`Nesma` appears only in §4.3's commercial whitelist (NDC-whitelisted) with **zero** technical capability data in either other source — a supplier that is commercially clear to use but technically uncharacterized; schedule a full capability-discovery pass (Search → check every live flag) before any flow test targets it.

### 4.7 Recommended Pre-Flow Capability Confirmation Procedure

Because of the volume of `Unknown`/`Conditional` cells above, **before scheduling any flow from §5 against a given supplier**, run this cheap confirmation sequence once and record the result back into a living copy of §4.6 (this static document will drift out of date the moment live behavior is confirmed):
1. Search with that supplier → inspect `offers[].haveBundles`, `.canBeHeld`, `.offerHasAncillary`, `.isSeatMapRequired` (§2.1) for the returned offer(s).
2. FareConfirm the chosen offer → re-confirm the same flags plus `isAncillaryRequired`/`isBaggageRequired`/`isMealRequired` (§2.2) — these are more authoritative than Search's, since FareConfirm is closer to the actual bookable offer.
3. Only then decide which of the 89 flows in §5 are executable for that supplier, per the "Required Capabilities" column there.

## 5. Flow Analysis

Source: `NDC_Integration/Resources/flow.md`. This section maps all 89 flows to supplier capability (§4) and API version (§1.4), without duplicating flow.md's own listing verbatim — instead it decomposes every flow into **(fare-selection method) × (enrichment combination) × (terminal-state family)**, which is the actual generative structure behind the 89 numbers (confirmed by exact reconstruction below), then gives one table row per flow with a compact endpoint-code chain.

### 5.1 Endpoint Code Legend (used in the Endpoints column, §5.4)

`SR`=Search, `FC`=FareConfirm, `UP`=Upselling, `BDL`=GetOfferBundles, `AP`=AddPassenger *(V2 only)*, `ANC`=GetAncillary *(V2 only)*, `SM`=GetSeatMap *(V2 only)*, `FCK`=FareCheck *(V2 only)*, `BK`=Book, `HD`=Hold, `FCAH`=FareConfirmAfterHold, `RT`=Retrieve, `BAH`=BookAfterHold, `CXL`=CancelAfterHold, `VD`=Void.

### 5.2 Terminal-State Families (A–F)

Every flow ends in exactly one of six terminal shapes. This is the single most useful grouping for test design — **every flow sharing a family shares the same expected end-state and negative-path shape** (§6 Flow Validation elaborates the state checks per family in full; this table only names them):

| Family | Shape | Meaning |
|---|---|---|
| **A** | `...BK-RT` | Direct book, single retrieve confirms it. Simplest positive path. |
| **B** | `...HD-FCAH-RT` | Hold, re-confirm, retrieve — and **stop**. `INFERRED` **test-hygiene concern**: no flow in this family proceeds to BookAfterHold or CancelAfterHold, meaning **every Family-B flow execution leaves a dangling Held booking** in the target environment with nothing to clean it up (§6, §7). |
| **C** | `...BK-RT-VD` | Direct book, retrieve, then void the ticket. |
| **D** | `...HD-FCAH-RT-BAH-RT` | Hold branch carried through to a finalized booking, confirmed twice (after Hold and after BookAfterHold). |
| **E** | `...HD-FCAH-RT-BAH-RT-VD` | Hold branch finalized, then voided. The most endpoint-dense positive path. |
| **F** | `...HD-FCAH-RT-CXL` | Hold branch abandoned via CancelAfterHold instead of finalized. |

### 5.3 Enrichment Combination Legend (V2 sub-groupings)

| Code | Meaning | Endpoints inserted (after FareConfirm/Upselling, before Book/Hold) |
|---|---|---|
| `NONE` | No enrichment | *(V1: nothing; V2: `AP` only)* |
| `BDL` | Bundle only | `BDL` *(V1: before Book/Hold directly; V2: before `AP`)* |
| `ANC` | Ancillary only | `AP`→`ANC` *(V2 only)* |
| `BDL+ANC` | Bundle + Ancillary | `BDL`→`AP`→`ANC`→`FCK` *(V2 only)* |
| `SM` | Seat management only | `AP`→`SM`→`FCK` *(V2 only)* |
| `BDL+SM` | Bundle + Seat management | `BDL`→`AP`→`SM`→`FCK` *(V2 only)* |
| `SM+ANC` | Seat management + Ancillary | `AP`→`ANC`→`SM`→`FCK` *(V2 only)* |
| `BDL+SM+ANC` | Bundle + Seat management + Ancillary | `BDL`→`AP`→`ANC`→`SM`→`FCK` *(V2 only)* |

### 5.4 Full Flow Matrix

**Columns**: Flow # · Version · Fare Selection · Enrichment · Family · Endpoints (coded, §5.1) · Required Capabilities (§4) · Risk Level. Description/Preconditions/Expected Result/Negative Paths are **not** repeated per row — they are fully specified once per (Family × Enrichment) combination in §6, since that is what actually varies; this table's job is to tell you *which* combination each flow number is, and flag anything anomalous in flow.md's own text (marked in the **Notes** column).

| # | Ver | Fare Sel. | Enrichment | Fam. | Endpoints | Required Capabilities | Risk | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | V1 | FareConfirm | NONE | A | SR-FC-BK-RT | none beyond universal | High | |
| 2 | V1 | FareConfirm | NONE | B | SR-FC-HD-FCAH-RT | Hold | Low-Med | Dangling Hold (§5.2 Family B) |
| 3 | V1 | FareConfirm | NONE | C | SR-FC-BK-RT-VD | Void | High | |
| 4 | V1 | FareConfirm | NONE | D | SR-FC-HD-FCAH-RT-BAH-RT | Hold | High | |
| 5 | V1 | FareConfirm | NONE | E | SR-FC-HD-FCAH-RT-BAH-RT-VD | Hold, Void | High | |
| 6 | V1 | FareConfirm | NONE | F | SR-FC-HD-FCAH-RT-CXL | Hold, CancelHold | Medium | |
| 7 | V1 | Upselling | NONE | A | SR-UP-BK-RT | Upsell | High | Depends on `requestUrl` fix, §2.3 |
| 8 | V1 | Upselling | NONE | B | SR-UP-HD-FCAH-RT | Upsell, Hold | Low-Med | Dangling Hold; `requestUrl` fix |
| 9 | V1 | Upselling | NONE | C | SR-UP-BK-RT-VD | Upsell, Void | High | `requestUrl` fix |
| 10 | V1 | Upselling | NONE | D | SR-UP-HD-FCAH-RT-BAH-RT | Upsell, Hold | High | `requestUrl` fix |
| 11 | V1 | Upselling | NONE | E | SR-UP-HD-FCAH-RT-BAH-RT-VD | Upsell, Hold, Void | High | `requestUrl` fix |
| 12 | V1 | Upselling | NONE | F | SR-UP-HD-FCAH-RT-CXL | Upsell, Hold, CancelHold | Medium | `requestUrl` fix |
| 13 | V1 | FareConfirm | BDL | A | SR-FC-BDL-BK-RT | Bundle | High | |
| 14 | V1 | FareConfirm | BDL | B | SR-FC-BDL-HD-FCAH-RT | Bundle, Hold | Low-Med | Dangling Hold |
| 15 | V1 | FareConfirm | BDL | C | SR-FC-BDL-BK-RT-VD | Bundle, Void | High | |
| 16 | V1 | FareConfirm | BDL | B | SR-FC-BDL-HD-FCAH-RT | Bundle, Hold | Low-Med | **Duplicate of #14** verbatim in flow.md — not a distinct scenario |
| 17 | V1 | FareConfirm | BDL | D | SR-FC-BDL-HD-FCAH-RT-BAH-RT | Bundle, Hold | High | |
| 18 | V1 | FareConfirm | BDL | F | SR-FC-BDL-HD-FCAH-RT-CXL | Bundle, Hold, CancelHold | Medium | |
| 19 | V1 | Upselling | BDL | A | SR-UP-BDL-BK-RT | Upsell, Bundle | High | `requestUrl` fix |
| 20 | V1 | Upselling | BDL | B | SR-UP-BDL-HD-FCAH-RT | Upsell, Bundle, Hold | Low-Med | Dangling Hold; `requestUrl` fix |
| 21 | V1 | Upselling | BDL | C | SR-UP-BDL-BK-RT-VD | Upsell, Bundle, Void | High | `requestUrl` fix |
| 22 | V1 | Upselling | BDL | D | SR-UP-BDL-HD-FCAH-RT-BAH-RT | Upsell, Bundle, Hold | High | `requestUrl` fix |
| 23 | V1 | Upselling | BDL | E | SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD | Upsell, Bundle, Hold, Void | High | `requestUrl` fix |
| 24 | V1 | Upselling | BDL | F | SR-UP-BDL-HD-FCAH-RT-CXL | Upsell, Bundle, Hold, CancelHold | Medium | `requestUrl` fix |
| 25 | V2 | FareConfirm | NONE | A | SR-FC-AP-BK-RT | none beyond universal | High | |
| 26 | V2 | FareConfirm | NONE | B | SR-FC-AP-HD-FCAH-RT | Hold | Low-Med | Dangling Hold |
| 27 | V2 | FareConfirm | NONE | C | SR-FC-AP-BK-RT-VD | Void | High | |
| 28 | V2 | FareConfirm | NONE | D | SR-FC-AP-HD-FCAH-RT-BAH-RT | Hold | High | |
| 29 | V2 | FareConfirm | NONE | E | SR-FC-AP-HD-FCAH-RT-BAH-RT-VD | Hold, Void | High | |
| 30 | V2 | FareConfirm | NONE | F | SR-FC-AP-HD-FCAH-RT-CXL | Hold, CancelHold | Medium | |
| 31 | V2 | FareConfirm | BDL | A | SR-FC-BDL-AP-BK-RT | Bundle | High | |
| 32 | V2 | FareConfirm | BDL | B | SR-FC-BDL-AP-HD-FCAH-RT | Bundle, Hold | Low-Med | Dangling Hold |
| 33 | V2 | FareConfirm | BDL | C | SR-FC-BDL-AP-BK-RT-VD | Bundle, Void | High | |
| 34 | V2 | FareConfirm | BDL | D | SR-FC-BDL-AP-HD-FCAH-RT-BAH-RT | Bundle, Hold | High | |
| 35 | V2 | FareConfirm | BDL | E | SR-FC-BDL-AP-HD-FCAH-RT-BAH-RT-VD | Bundle, Hold, Void | High | |
| 36 | V2 | FareConfirm | BDL | F | SR-FC-BDL-AP-HD-FCAH-RT-CXL | Bundle, Hold, CancelHold | Medium | |
| 37 | V2 | FareConfirm | ANC | A | SR-FC-AP-ANC-BK-RT | Ancillary | High | |
| 38 | V2 | FareConfirm | ANC | B | SR-FC-AP-ANC-HD-FCAH-RT | Ancillary, Hold | Low-Med | Dangling Hold |
| 39 | V2 | FareConfirm | ANC | C | SR-FC-AP-ANC-BK-RT-VD | Ancillary, Void | High | |
| 40 | V2 | FareConfirm | ANC | D | SR-FC-AP-ANC-HD-FCAH-RT-BAH-RT | Ancillary, Hold | High | |
| 41 | V2 | FareConfirm | ANC | E | SR-FC-AP-ANC-HD-FCAH-RT-BAH-RT-VD | Ancillary, Hold, Void | High | |
| 42 | V2 | FareConfirm | ANC | F | SR-FC-AP-ANC-HD-FCAH-RT-CXL | Ancillary, Hold, CancelHold | Medium | |
| 43 | V2 | FareConfirm | BDL+ANC | A | SR-FC-BDL-AP-ANC-FCK-BK-RT | Bundle, Ancillary | High | |
| 44 | V2 | FareConfirm | BDL+ANC | B | SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT | Bundle, Ancillary, Hold | Low-Med | Dangling Hold |
| 45 | V2 | FareConfirm | BDL+ANC | C | SR-FC-BDL-AP-ANC-FCK-BK-RT-VD | Bundle, Ancillary, Void | High | |
| 46 | V2 | FareConfirm | BDL+ANC | D | SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT-BAH-RT | Bundle, Ancillary, Hold | High | |
| 47 | V2 | FareConfirm | BDL+ANC | E | SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT-BAH-RT-VD | Bundle, Ancillary, Hold, Void | High | |
| 48 | V2 | FareConfirm | BDL+ANC | F | SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT-CXL | Bundle, Ancillary, Hold, CancelHold | Medium | |
| 49 | V2 | FareConfirm | SM | A | SR-FC-AP-SM-FCK-BK-RT | SeatMap | High | |
| 50 | V2 | FareConfirm | SM | B | SR-FC-AP-SM-FCK-HD-FCAH-RT | SeatMap, Hold | Low-Med | Dangling Hold |
| 51 | V2 | FareConfirm | SM | C | SR-FC-AP-SM-FCK-BK-RT-VD | SeatMap, Void | High | |
| 52 | V2 | FareConfirm | SM | D | SR-FC-AP-SM-FCK-HD-FCAH-RT-BAH-RT | SeatMap, Hold | High | |
| 53 | V2 | FareConfirm | SM | F | SR-FC-AP-SM-FCK-HD-FCAH-RT-CXL | SeatMap, Hold, CancelHold | Medium | **Family E (Hold+BookAfterHold+Void) absent from this enrichment group** — flow.md has no seat-management-only Void-after-BookAfterHold flow; not an error, just an asymmetry vs. other enrichment groups (all of which have 6 flows; this group has 5) |
| 54 | V2 | FareConfirm | BDL+SM | A | SR-FC-BDL-AP-SM-FCK-BK-RT | Bundle, SeatMap | High | |
| 55 | V2 | FareConfirm | BDL+SM | B | SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT | Bundle, SeatMap, Hold | Low-Med | Dangling Hold |
| 56 | V2 | FareConfirm | BDL+SM | C | SR-FC-BDL-AP-SM-FCK-BK-RT-VD | Bundle, SeatMap, Void | High | |
| 57 | V2 | FareConfirm | BDL+SM | D | SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT-BAH-RT | Bundle, SeatMap, Hold | High | |
| 58 | V2 | FareConfirm | BDL+SM | E | SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT-BAH-RT-VD | Bundle, SeatMap, Hold, Void | High | |
| 59 | V2 | FareConfirm | BDL+SM | F | SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT-CXL | Bundle, SeatMap, Hold, CancelHold | Medium | |
| 60 | V2 | FareConfirm | SM+ANC | A | SR-FC-AP-ANC-SM-FCK-BK-RT | Ancillary, SeatMap | High | |
| 61 | V2 | FareConfirm | SM+ANC | B | SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT | Ancillary, SeatMap, Hold | Low-Med | Dangling Hold |
| 62 | V2 | FareConfirm | SM+ANC | C | SR-FC-AP-ANC-SM-FCK-BK-RT-VD | Ancillary, SeatMap, Void | High | |
| 63 | V2 | FareConfirm | SM+ANC | D | SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT | Ancillary, SeatMap, Hold | High | |
| 64 | V2 | FareConfirm | SM+ANC | E | SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT-VD | Ancillary, SeatMap, Hold, Void | High | |
| 65 | V2 | FareConfirm | SM+ANC | F | SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT-CXL | Ancillary, SeatMap, Hold, CancelHold | Medium | |
| 66 | V2 | FareConfirm | BDL+SM+ANC | A | SR-FC-BDL-AP-ANC-SM-FCK-BK-RT | Bundle, Ancillary, SeatMap | High | |
| 67 | V2 | FareConfirm | BDL+SM+ANC | B | SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT | Bundle, Ancillary, SeatMap, Hold | Low-Med | Dangling Hold |
| 68 | V2 | FareConfirm | BDL+SM+ANC | C | SR-FC-BDL-AP-ANC-SM-FCK-BK-RT-VD | Bundle, Ancillary, SeatMap, Void | High | |
| 69 | V2 | FareConfirm | BDL+SM+ANC | D | SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT | Bundle, Ancillary, SeatMap, Hold | High | |
| 70 | V2 | FareConfirm | BDL+SM+ANC | E | SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT-VD | Bundle, Ancillary, SeatMap, Hold, Void | High | |
| 71 | V2 | FareConfirm | BDL+SM+ANC | F | SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-CXL | Bundle, Ancillary, SeatMap, Hold, CancelHold | Medium | flow.md literally repeats `FareCheck` twice in this flow's step list — `INFERRED` copy-paste typo, treat as a single `FCK` call |
| 72 | V2? | Upselling | NONE | A | SR-UP-(AP?)-BK-RT | Upsell | High | flow.md omits `AddPassenger` for flows 72–89 despite being in the 25–89/"V2" range and every V2 endpoint from Book onward structurally expecting AddPassenger's IDs (§3.2) — `INFERRED` **likely a documentation omission**; confirm with the team whether AddPassenger must still be inserted before Book/Hold here |
| 73 | V2? | Upselling | NONE | B | SR-UP-(AP?)-HD-FCAH-RT | Upsell, Hold | Low-Med | Same AddPassenger-omission note as #72; dangling Hold |
| 74 | V2? | Upselling | NONE | C | SR-UP-(AP?)-BK-RT-VD | Upsell, Void | High | Same AddPassenger-omission note as #72 |
| 75 | V2? | Upselling | NONE | D | SR-UP-(AP?)-HD-FCAH-RT-BAH-RT | Upsell, Hold | High | Same AddPassenger-omission note as #72 |
| 76 | V2? | Upselling | NONE | E | SR-UP-(AP?)-HD-FCAH-RT-BAH-RT-VD | Upsell, Hold, Void | High | Same AddPassenger-omission note as #72 |
| 77 | V2? | Upselling | NONE | F | SR-UP-(AP?)-HD-FCAH-RT-CXL | Upsell, Hold, CancelHold | Medium | Same AddPassenger-omission note as #72 |
| 78 | V2? | **FareConfirm** | BDL | A | SR-FC-BDL-(AP?)-BK-RT | Bundle | High | flow.md's own section header claims flows 72–89 use "Upselling instead of FareConfirm," but #78–83 literally list **FareConfirm**, not Upselling — `INFERRED` a direct self-contradiction in the source document, not resolved here; also omits AddPassenger (see #72's note) |
| 79 | V2? | FareConfirm | BDL | B | SR-FC-BDL-(AP?)-HD-FCAH-RT | Bundle, Hold | Low-Med | Same notes as #78; dangling Hold |
| 80 | V2? | FareConfirm | BDL | C | SR-FC-BDL-(AP?)-BK-RT-VD | Bundle, Void | High | Same notes as #78 |
| 81 | V2? | FareConfirm | BDL | B | SR-FC-BDL-(AP?)-HD-FCAH-RT | Bundle, Hold | Low-Med | **Duplicate of #79** verbatim in flow.md; same notes as #78 |
| 82 | V2? | FareConfirm | BDL | D | SR-FC-BDL-(AP?)-HD-FCAH-RT-BAH-RT | Bundle, Hold | High | Same notes as #78 |
| 83 | V2? | FareConfirm | BDL | F | SR-FC-BDL-(AP?)-HD-FCAH-RT-CXL | Bundle, Hold, CancelHold | Medium | Same notes as #78 |
| 84 | V2? | Upselling | BDL | A | SR-UP-BDL-(AP?)-BK-RT | Upsell, Bundle | High | flow.md's step list matches; AddPassenger-omission note as #72 applies |
| 85 | **V1‡** | Upselling | BDL | B | SR-UP-BDL-(AP?)-HD-FCAH-RT | Upsell, Bundle, Hold | Low-Med | ‡ flow.md **explicitly labels this "for V1"** despite being numbered 85, inside the document's own declared "V2 Flows 25–89" range — a direct labeling contradiction; structurally identical to V1 flow #20. **Resolve with the team which endpoint set (V1 or V2 base paths) this flow is actually meant to exercise before scheduling it** — do not assume either silently |
| 86 | **V1‡** | Upselling | BDL | C | SR-UP-BDL-(AP?)-BK-RT-VD | Upsell, Bundle, Void | High | Same ‡ note as #85; structurally identical to V1 flow #21 |
| 87 | **V1‡** | Upselling | BDL | D | SR-UP-BDL-(AP?)-HD-FCAH-RT-BAH-RT | Upsell, Bundle, Hold | High | Same ‡ note as #85; structurally identical to V1 flow #22 |
| 88 | **V1‡** | Upselling | BDL | E | SR-UP-BDL-(AP?)-HD-FCAH-RT-BAH-RT-VD | Upsell, Bundle, Hold, Void | High | Same ‡ note as #85; structurally identical to V1 flow #23 |
| 89 | **V1‡** | Upselling | BDL | F | SR-UP-BDL-(AP?)-HD-FCAH-RT-CXL | Upsell, Bundle, Hold, CancelHold | Medium | Same ‡ note as #85; structurally identical to V1 flow #24 |

`(AP?)` in the Endpoints column = the disputed/likely-omitted AddPassenger step discussed in flows 72–89's Notes.

### 5.5 Flow-Numbering Anomalies Summary (do not silently resolve — confirm with the team)

1. **#16 is a verbatim duplicate of #14** (both: `Search-FareConfirm-GetBundle-Hold-FareConfirmAfterHold-Retrieve`).
2. **#81 is a verbatim duplicate of #79** (both: `Search-FareConfirm-GetBundle-Hold-FareConfirmAfterHold-Retrieve`).
3. **#71 repeats the `FareCheck` step name twice** in flow.md's own text (`...FareCheck - FareCheck - Hold...`) — treated here as a single FareCheck call.
4. **Flows 72–89 never mention `AddPassenger`** despite sitting inside flow.md's declared "V2 Flows 25–89" range, and despite every other V2 flow (25–71) explicitly listing it, and despite §3.2's dependency analysis showing V2's Book/Hold structurally expect AddPassenger-derived IDs. Treated throughout as `(AP?)` — likely-omitted-in-shorthand, not confirmed either way.
5. **Flows 78–83 use FareConfirm, not Upselling**, directly contradicting flow.md's own section header immediately above them ("form 72 to 89 follow same logic as above but with Upselling instead of FareConfirm..."). Presented here exactly as flow.md's per-flow text literally states (FareConfirm), with the contradiction flagged rather than silently corrected to Upselling.
6. **Flows 85–89 are explicitly labeled "for V1"** in flow.md's own per-flow text, despite being numbered within the file's declared 25–89 "V2" range. Presented here with version marked `V1‡` and flagged for team confirmation — do not assume this means "run flows 85-89 against the V1 endpoint set" without confirming, since it directly conflicts with the document's own section structure.
7. **Enrichment group `SM` (flows 49–53) has only 5 members**, missing the Family-E (Hold→BookAfterHold→Void) variant that every other enrichment group has — flow.md simply does not define a "seat-management-only, held-then-booked-then-voided" flow. Not an error to fix; a coverage gap worth proposing as an **additional** test if the team wants full symmetry (§7).
8. **New, added 2026-08-10 — not yet modeled in flow.md at all**: every `SM`/`BDL+SM`/`SM+ANC`/`BDL+SM+ANC` flow row in §5.4 whose Family is B/D/E/F (i.e., every SeatMap flow that goes through Hold rather than direct Book) is written against the *pre-2026-08-10* understanding that seat selection only happens via GetSeatMap before Book/Hold. It does **not** account for the new `SeatAfterHold` endpoint (§2.7a), which is the Hold branch's actual seat-attach mechanism (§1.10 item 6, §2.10). flow.md has no flow variant that inserts `SeatAfterHold` between `Hold` and `FareConfirmAfterHold`/`BookAfterHold`. **Do not silently insert `SeatAfterHold` into the existing SM-enrichment Hold flows** — treat this as a net-new flow family pending team confirmation of `SeatAfterHold`'s exact chain position (§2.7a), and propose it as an addition to flow.md rather than editing flow.md unilaterally. `SeatMap_TestCases.md` covers this as clearly-labeled exploratory/candidate flow test cases.

## 6. Flow Validation

Because every flow in §5 is a (Family × Enrichment × Fare-Selection) composition, and every flow **within the same Family** shares an identical state-machine shape, this section validates **per Family**, then layers on the **per-Enrichment** additions. Apply both to whichever specific flow number you're executing (§5.4 tells you which Family/Enrichment a given flow # is). This avoids restating identical validation logic 89 times while still giving every flow a fully-specified validation path.

### 6.1 Universal Preconditions (every flow, every family)

1. `Supplier_Name` + `Credentials_Selector` chosen and confirmed live-capable for the flow's required capabilities (§4.7 procedure) before starting.
2. Environment confirmed non-production, **or** production Book explicitly authorized (§2.9 Testing Note) if the flow includes Book/BookAfterHold.
3. Collection variables reset/clean at flow start — carrying over stale `pnr`/`bookingToken`/`offerId` etc. from a previous flow run is a real risk given the collection-scoped variable model (§1.6) and should be explicitly guarded against (clear collection variables or re-run Search first).

### 6.2 Universal Required IDs and Propagation (every flow)

| Stage | ID(s) established | Must equal / derive from |
|---|---|---|
| After Search | `searchResponseId`/`responseId`, `offerId` | New each run |
| After FareConfirm/Upselling | `fareConfirmResponseId` (or `upSellingResponseId`, §2.3), `selectedOfferId` | Derived from Search's IDs |
| After GetOfferBundles *(if BDL)* | none new (IDs pass through unchanged) | FareConfirm/Upselling's IDs |
| After AddPassenger *(V2 only)* | `getAddPaxOfferId`, `getAddPaxResponceID` | Derived from FareConfirm/Upselling's IDs — **supersedes** them for all subsequent V2 steps |
| After GetAncillary *(if ANC)* | `ANCofferId`, `ANCresponseId` | Derived from AddPassenger's IDs |
| After GetSeatMap *(if SM)* | (none auto-captured — seat `cellCode` manual) | Derived from AddPassenger's IDs |
| After FareCheck *(if ANC and/or SM)* | `fareConfirmSelectedOfferId` (overwritten), `fareCheckOfferId` | Derived from GetAncillary's IDs |
| After Book **or** Hold | `pnr`, `bookingToken`, `gdsPNR` (+ `holdExpirationDate` if Hold) | Derived from whichever ID pair was current at that point (V1: FareConfirm/Upselling/Bundle's; V2: AddPassenger's or FareCheck's) |
| Through Retrieve/FareConfirmAfterHold/BookAfterHold/Void/CancelAfterHold | `pnr`/`bookingToken`/`gdsPNR` | **Unchanged** — same-PNR invariant (§2.13 Testing Note) holds for the rest of the flow |

**Validation after every endpoint** (generic — apply at each hop regardless of family): (a) HTTP 200 and parseable JSON; (b) the ID(s) this step is documented to produce (§2.x "IDs Generated") are present and non-empty; (c) where a price-reconciliation script exists for this endpoint/version (§2.x "Business Logic" notes exactly which do and don't), the taxes/base/total reconcile per the formula in §2.1; (d) any capability flag this step returns (§2.1/§2.2's `haveBundles`/`canBeHeld`/etc.) is consistent with what the previous step already reported — a flag flipping between FareConfirm and, say, AddPassenger for the same offer would itself be a defect worth reporting.

### 6.3 Per-Family Expected States

#### Family A — `...Book-Retrieve`
- **Expected booking state**: `bookingStatus` (via Retrieve) = a booked/confirmed status (exact string `UNKNOWN`, §2.11 — record the actual observed value the first time and use it as the regression baseline going forward).
- **Expected offer state**: `selectedOffer` on both Book's and Retrieve's responses should match (same `offerId`, same `priceDetails.totalAmount`).
- **Expected passenger state**: `passengersList` on Retrieve should match what was submitted (V1: at Book; V2: at AddPassenger) — same names, types, document numbers.
- **Expected payment state**: `UNKNOWN` — no payment/card endpoint exists anywhere in either collection; `INFERRED` payment is either handled entirely supplier-side (BSP settlement — `isBspCommissionApplied` field observed on Book's response, §2.9) or out of scope for this API entirely. Do not expect a payment-state field beyond `isBspCommissionApplied`.
- **Expected retrieve state**: full booking object as in §2.11's observed shape, `tickets` populated if the supplier ticket-issues synchronously at Book time (supplier-dependent, §2.9).

#### Family B — `...Hold-FareConfirmAfterHold-Retrieve` (no finalization)
- **Expected booking state**: `bookingStatus` = a held (not yet ticketed) status; `holdExpirationDate` present and in the future at the time of Retrieve.
- **Expected offer state**: price after FareConfirmAfterHold should match Hold's original price (no drift) in the common case — a mismatch is itself the price-drift exploratory scenario noted in §2.12, not necessarily a bug.
- **Expected passenger/payment/ancillary/seat/bundle state**: same as Family A's shape but reflecting a held, not a booked, PNR.
- **Test-hygiene note** (repeated from §5.2): this family leaves a live Held booking in the target environment with no cleanup step in the flow itself — **manual testers should track and eventually CancelAfterHold every Family-B execution out-of-band**, or accept that it will expire naturally at `holdExpirationDate` and consume no further action. Recommend logging every Family-B run's `pnr` in a shared tracking sheet for environment hygiene.

#### Family C — `...Book-Retrieve-Void`
- All of Family A's expectations through Retrieve, **plus**:
- **Expected booking state after Void**: a subsequent (manual, not scripted — §2.15) Retrieve should show a voided `bookingStatus`.
- **Expected payment state**: `INFERRED` void should reverse any BSP commission implication (`isBspCommissionApplied`) — `UNKNOWN`, not evidenced, exploratory check.
- Voiding only succeeds within the window implied by `voidCapability` (§2.9/§2.15) — a Family-C flow attempted outside that window is expected to fail at the Void step specifically, not earlier.

#### Family D — `...Hold-FareConfirmAfterHold-Retrieve-BookAfterHold-Retrieve`
- Family B's expectations through the first Retrieve, **plus**:
- **Expected booking state after BookAfterHold**: `bookingStatus` transitions from held to booked/confirmed; `pnr`/`bookingToken`/`gdsPNR` **unchanged** from Hold (§2.13 same-PNR invariant — treat any change here as a defect).
- **Expected offer/passenger state**: unchanged from the Hold-era values, now attached to a finalized booking.

#### Family E — `...Hold-FareConfirmAfterHold-Retrieve-BookAfterHold-Retrieve-Void`
- Family D's expectations, **plus** Family C's Void expectations applied to the now-finalized (ex-Held) booking.

#### Family F — `...Hold-FareConfirmAfterHold-Retrieve-CancelAfterHold`
- Family B's expectations through the first Retrieve, **plus**:
- **Expected booking state after CancelAfterHold**: `UNKNOWN` exact response/status (§2.14 — zero script coverage, no genuine example) — `INFERRED` a follow-up Retrieve should show a cancelled/terminated `bookingStatus`, distinct from both the held and the booked states seen in other families. **This is the weakest-validated end-state in the entire flow set** — prioritize manually confirming it once per supplier family rather than assuming.

### 6.4 Per-Enrichment Additions to State Validation

Layer these on top of whichever Family (§6.3) applies, for flows carrying the corresponding enrichment code (§5.3):

- **`BDL` (Bundle) — Expected bundle state**: if a non-empty bundle was selected (§2.4 — no observed example actually exercises this, flagged there as `UNKNOWN` shape), the booking's final `priceDetails.totalAmount` should reflect the bundle's `feePrice` added to the base offer price; `includedServices` tags from the chosen bundle (e.g. baggage/seat/meal inclusions) should be reflected in the booking's baggage/ancillary state without a separate ancillary charge for the same item (an included-in-bundle baggage allowance should not also appear as a separately-priced ancillary line — a valuable cross-field consistency check).
- **`ANC` (Ancillary) — Expected ancillary state**: `passengersSelectedAncillaries` on Book/Hold/Retrieve should list exactly the ancillary codes selected at GetAncillary/FareCheck time, with matching `AdditionalServiceCategory`/quantity; `paxTotalAncillaryAmount` (per §2.8's FareCheck example) should equal the sum of selected ancillary prices; a category not selected should not appear.
- **`SM` (SeatMap) — Expected seat state**: the chosen `cellCode` should appear as a `Seat`-category entry in `passengersSelectedAncillaries`, priced per what GetSeatMap/FareCheck reported for that cell; `cellAvailability` for that specific cell should read as no-longer-available if the same seat map were re-queried post-booking (`UNKNOWN`, exploratory — GetSeatMap has no post-booking re-query example to confirm against).
- **`FCK` (FareCheck, implied by ANC and/or SM)**: the final booking price should equal FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total — this is the definitive "did ancillary pricing actually get carried through to the booking" check, and the single highest-value price-integrity assertion in any enrichment-bearing flow.

### 6.5 Expiration- and Timing-Sensitive Validation

- **Offer freshness** (Search/FareConfirm/Upselling/Bundle/AddPassenger/Ancillary/SeatMap/FareCheck IDs, §3.3): `UNKNOWN` exact TTL — validate that a flow executed **without artificial delay** (the normal case) succeeds, and treat any flow deliberately executed with injected delay between steps as a distinct boundary test, not a variant of the same positive flow.
- **Hold window** (`holdExpirationDate`, families B/D/E/F): validate FareConfirmAfterHold/BookAfterHold/CancelAfterHold all occur **before** this timestamp in the standard positive-path execution of any Hold-branch flow; a deliberately-delayed-past-expiration attempt is the boundary/negative counterpart (§7) not covered by any flow.md-listed flow number.
- **Void window** (families C/E): validate Void is attempted promptly after Book/BookAfterHold in the standard positive path; a deliberately-delayed attempt is again a boundary/negative counterpart, not a listed flow.

## 7. Manual Testing Strategy

This section operationalizes §1–§6 into the three testing levels named in the original brief — single-endpoint isolated validation, integration between endpoints, and end-to-end flow testing — plus the cross-cutting dimensions (regression, smoke, sanity, negative, boundary, error handling, business rules, data validation, supplier validation, version validation).

### 7.1 Endpoint Testing (isolated request/response validation)

For each of the 15 endpoints in §2, execute it **standalone** (not as part of a chain) using the most recently valid IDs available (captured from a prior chain run), and validate:
- Request schema conformance to the Required/Optional Request Fields tables (§2.x per endpoint).
- Header behavior (§1.5) — valid key, invalid key, missing key.
- Response schema conformance to the Expected Success Response block (§2.x) — every field present, correctly typed.
- Version-specific field-name differences are exercised **both ways** — e.g., confirm V1's `searchResponseId` vs. V2's `ResponseId` are each required/accepted only in their own version's endpoint (§2.2), not cross-compatible.
- Every defect flagged inline in §2 (V1 Upselling's broken `requestUrl`, V2 GetOfferBundles' `JourneyKey1` script bug, V2 Hold's `{{credentialsSelector}}` casing mismatch, V2 CancelHold's unquoted-JSON-variable bug, V2 Void's hardcoded-empty `gdsPNR`) gets its own dedicated isolated test, since these are exactly the kind of defect single-endpoint testing is positioned to catch before they're masked by a longer chain's own error handling.

### 7.2 Integration Testing (between adjacent endpoints)

For each connection documented in §3.2, test the **hand-off** specifically, independent of the full flow:
- Positive: correct ID(s) from the upstream step produce a valid downstream call.
- Negative: stale, mismatched, or cross-supplier IDs from the upstream step are rejected by the downstream call (§3.2's "Business dependency"/"Validation rules" per connection).
- Capability-gate integration: calling a downstream step the upstream step's capability flags say is unsupported (e.g., GetOfferBundles when `haveBundles: false`) — confirm rejection, not silent success.
- ID-substitution correctness for the Upselling-instead-of-FareConfirm path (§2.3) and the AddPassenger-instead-of-inline-passengers path (§2.5/§1.10) — these are the two places a tester must manually substitute one ID set for another, and are natural sources of test-execution error worth explicitly rehearsing.

### 7.3 End-to-End Testing (full flows, §5/§6)

- Schedule flows **only** after §4.7's capability-confirmation procedure has been run for the target supplier — do not run a flow requiring Hold against a supplier whose Hold capability is `Unknown`/`Conditional` (§4.4/§4.6) without first confirming live.
- Execute the full family-appropriate validation (§6.3) after **every** step, not just at the end — catching a failure at, say, the AddPassenger hop is cheaper and more diagnostic than only checking the final Retrieve.
- Track every Family-B (§5.2/§6.3) execution's `pnr` for later cleanup or expiry, per the test-hygiene note.
- Run both V1 and V2 versions of structurally-equivalent flows (e.g., V1 flow #1 vs. V2 flow #25) against the same supplier/route where both exist, and **diff the results by hand** (§1.10 — no in-framework comparator exists) — this is the primary mechanism for catching V1/V2 behavioral drift, and should be a standing regression activity, not a one-time check.

### 7.4 Regression

- Maintain a running baseline of "known good" response shapes per endpoint per supplier (starting from the `[Observed example]` blocks in §2 where available) and diff future runs against them — schema drift (a field renamed, removed, or retyped) is a regression even if the flow otherwise "passes."
- Re-run the full §5.4 matrix (or a representative supplier-capability-filtered subset, §7.6) after any change to a shared orchestration concern (per the PRD's own framework, this is exactly the risk class the equivalent Java suite exists to catch — the same logic applies to this API's callers).

### 7.5 Smoke

Minimum viable confidence check before deeper testing: Search → FareConfirm → Book → Retrieve (V1 flow #1 shape) and Search → FareConfirm → AddPassenger → Book → Retrieve (V2 flow #25 shape), one supplier per version, both against staging. If either fails, do not proceed to broader flow testing until resolved.

### 7.6 Sanity

After a targeted fix (e.g., a specific endpoint's bug), re-run only the directly-affected endpoint (§7.1) plus the one or two flows that exercise it (§5.4), not the full 89-flow matrix — reserve the full matrix for scheduled regression passes (§7.4).

### 7.7 Negative Testing

Consolidated from every endpoint's "Negative Cases" (§2.x) and connection's rejection scenarios (§3.2):
- Missing required fields (per endpoint, §2.x Required Request Fields tables).
- Invalid/malformed `supplier` (unrecognized string, wrong case/spelling per §1.7's evidenced name-mismatch bugs).
- Invalid/mismatched `credentialsSelector` for the given supplier.
- Stale, expired, or cross-request ID mixing (searchResponseId from one call with offerId from another, etc., §3.3).
- Capability-gate violations (Bundle/Hold/Ancillary/SeatMap/Void/CancelHold called against a supplier/offer that doesn't support it, §4/§6.3).
- Timing violations (post-hold-expiration FareConfirmAfterHold/BookAfterHold/CancelAfterHold; post-void-window Void — §6.5).
- The five collection-level defects flagged in §2 (requestUrl, JourneyKey1, credentialsSelector casing, unquoted JSON variable, hardcoded empty gdsPNR) — confirm each one's actual live failure mode (malformed URL error vs. timeout vs. JSON parse error vs. silent wrong-value) rather than assuming.

### 7.8 Boundary Testing

- Passenger counts: 0 of a given type, 1, the collection's own default of 2 (V1 `ADT_Count`/`CHD_Count`/`INF_Count`), the confirmed maximum of **9 total passengers** across `ADT`+`CHD`+`INF` combined (§2.1), and 10 (one over the limit — the primary negative/boundary case for this rule).
- Infant-to-adult ratio: an infant with no matching `ParentPaxRefId` adult present (§2.5 negative case) and, if technically constructible, more infants than adults (real airline rule is typically 1 infant per adult — `UNKNOWN` whether this API enforces it or defers to the supplier).
- Ancillary quantity: 0, 1, and a quantity exceeding `availableCount` (§2.8).
- Date boundaries: today, far future, past (negative), and right at any discovered offer/hold expiration boundary (§6.5).
- String boundaries: empty/very long passenger names, non-Latin script names (§2.5 Testing Note — not exercised by any observed example).

### 7.9 Error Handling

For every endpoint, confirm the **shape** of an error response (status code, body structure) since **no negative/error example exists in either collection** (`UNKNOWN` across the board, §2.x) — this is a foundational gap: before any other negative test can assert "the right error," the team must first discover *what an error even looks like* from this API. Treat "characterize the error response envelope" as a first-round, high-priority exploratory task, not an assumption.

### 7.10 Business Rules

- Price reconciliation (§2.1's formula) at every endpoint that returns pricing, in both versions, noting where the collection itself doesn't enforce it (V2 Search/FareConfirm/Book/Retrieve, §2.x) — manual testing must supply what the automation doesn't.
- Same-PNR invariant through the Hold→...→BookAfterHold chain (§2.13).
- Infant-must-have-parent rule (§2.5).
- Commercial whitelist/blacklist enforcement (§4.3) — attempt a booking-affecting action against a blacklisted supplier/airline and confirm it's blocked at the business layer, not just left to fail downstream at the supplier.
- Production-booking auto-skip discipline (§2.9 Testing Note) — since Postman has no automatic guard, this is a **process control**, not a technical one: enforce it via team checklist/review, not tooling.

### 7.11 Data Validation

Field-level validation per the Required/Optional Request Fields tables in §2.x, with particular attention to the fields this document could only characterize loosely: `documentType` enumeration (§2.5), `cellCategory`/`cellAvailability` enumerations (§2.7), `bookingStatus` enumeration (§2.11), ancillary `ancillaryCategory` enumeration (§2.6) — **use live testing to fill in these `UNKNOWN` enumerations and feed the results back into this spec.**

### 7.12 Supplier Validation

Run §4.7's capability-confirmation procedure for every supplier the team actually intends to test flows against, prioritizing (a) the suppliers with conflicting capability data (§4.4: AirCairo, EgyptAir, Galileo, SpiceJet, GLC) and (b) the suppliers affected by name-mismatch bugs (§4.5: Indigo, ElJazeera, OmainAir) — these seven suppliers carry the highest risk of a test being scheduled against a capability the supplier doesn't actually have (or vice versa).

### 7.13 Version Validation

- Confirm every documented V1/V2 field-name and behavior difference in §1.10/§2.x empirically at least once (e.g., V1 Search's price-check vs. V2 Search's absence of one; V1 FareConfirm's price-check vs. V2's absence).
- Confirm the path-casing inconsistency (§1.2 — `V2` vs. `v2` across different V2 endpoints) doesn't matter functionally (single confirmatory test, not per-endpoint).
- Confirm the `ADT_Count`/`CHD_Count`/`INF_Count` collection-variable gap in V2 (§1.4) doesn't silently corrupt price-check results once those variables are manually added for testing purposes.

### 7.14 Security Tests

Scope is narrow given the flat, static authentication model (§1.5):
- Valid vs. invalid vs. missing `x-api-key`.
- Valid vs. invalid `Client-Id`.
- `supplier`/`credentialsSelector` used as an implicit authorization boundary — attempt to access/act on a booking (`pnr`/`bookingToken`) using a **different** `supplier`/`credentialsSelector` than the one that created it (a cross-tenant access attempt) — `UNKNOWN` expected behavior, high-value test given this is the API's actual (body-level, not header-level) authorization mechanism.
- Injection-style payloads in free-text fields (passenger names, addresses, `surName` on Void/FareConfirmAfterHold) — standard input-sanitization hygiene check, not evidenced as a known risk but not evidenced as tested either.
- `isdebug: true` on Search (§2.1) exposes raw `supplierRequest`/`supplierResponse` (observed containing supplier credentials in the SOAP header, e.g. `wsse:Username`/`wsse:Password` in the AirArabia example!) — `INFERRED` **this is a real, evidenced sensitive-data-exposure risk**: the observed Search example response's `supplierResponse`/`supplierRequest` fields contain what appear to be live supplier account credentials (`WONDERTRAVELSG9` / a password value) in plaintext within the JSON response body. **Flag this to the security/dev team explicitly** — verify whether `isdebug` is disabled by default in production and whether this response data is logged/cached anywhere downstream. This is the single most concrete security finding available from the provided materials.

## 8. Test Case Generation Rules

This section is written so that **another AI agent, given only this SPEC.md**, can mechanically generate the eight test categories below for any endpoint (§2) or flow (§5), without needing the original PRD or Postman collections.

### 8.1 Per-Endpoint Generation Recipe

For endpoint `E`, using its §2.`n` entry:

1. **Positive tests**: one per row of "Required Request Fields" (all-present, valid-value case) plus one per documented optional field (present vs. absent, both valid). Assert against "Expected Success Response" and every "Response Validation Rule."
2. **Negative tests**: one per field in "Negative Cases" (§2.`n`) plus a generic sweep — each required field individually omitted, individually set to an invalid type (string where a number/array is expected and vice versa), individually set to an empty string/array/object. Assert a 4xx (exact code `UNKNOWN` per §7.9 — first confirm live, then encode as the expected value going forward).
3. **Boundary tests**: derive from any field with a stated or `INFERRED` cardinality — passenger counts (§2.1/§2.5), ancillary quantity (§2.8), array fields (`searchCriteria`, `passengersList`, `bundleReferences`) at 0/1/many. Where this document marks a bound `UNKNOWN`, generate the test with a placeholder bound and flag it for the tester to confirm rather than skipping it.
4. **Validation tests**: one per "Request Rules"/"Request Validation" bullet in §2.`n` — e.g., AddPassenger's `ParentPaxRefId` must resolve, `contactRefId` must resolve (§2.5); FareCheck's `AncillaryCode` must have originated from GetAncillary (§2.8).
5. **Business Rule tests**: one per "Business Logic" bullet in §2.`n` — principally the price-reconciliation formula (§2.1) applied to this endpoint's response, and any capability-flag-consistency check (§6.2d).
6. **Security tests**: apply §7.14's three universal checks (api-key, client-id, cross-tenant `supplier`/`credentialsSelector` access) to every endpoint uniformly; apply the injection-payload check to every endpoint accepting free-text fields (names, addresses, `surName`).
7. **Integration tests**: one per row of "IDs Required By Next Endpoint" / "Dependencies" in §2.`n`, executed as the two-endpoint hand-off described in §3.2/§7.2 (not the full flow).
8. **Regression tests**: snapshot the endpoint's `[Observed example]` response (§2.`n`, where available) as the baseline; generate a schema-diff assertion (every key present, every type unchanged) to run on every future test pass.

### 8.2 Per-Flow Generation Recipe

For flow `#N` in §5.4:

1. Resolve `#N`'s row to its (Version, Fare Selection, Enrichment, Family) tuple.
2. Pull the endpoint chain from the Endpoint Code Legend (§5.1) expansion in that row.
3. Pull preconditions from §6.1 (universal) + §4.7 (capability confirmation for the chosen supplier).
4. Pull the ID-propagation table from §6.2, filtered to the steps actually present in this flow's chain.
5. Pull state-validation assertions from §6.3 (matching Family) + §6.4 (matching Enrichment code(s)) + §6.5 (if the flow includes Hold or Void).
6. **Positive test** = the flow executed exactly as chained, all assertions from steps 3–5 passing.
7. **Negative tests** = the flow with one deliberate injected fault per hop (an invalid/stale ID substituted at that hop, per §7.2's integration-negative pattern) — generate one negative variant per hop in the chain, not just one per flow.
8. **Regression test** = re-execution of the positive test on a schedule (§7.4), diffed against the last-known-good full response set for every step, not just the final Retrieve.

### 8.3 Field/Value Domains Reference (for automated boundary/negative generation)

| Field | Known values | Source |
|---|---|---|
| `passengerTypeCode` | `ADT`, `CHD`, `INF` | §2.1, §2.5 |
| `passengers[].count` (total, all types combined) | Confirmed max **9**; min 1 per included type (0/omission behavior `UNKNOWN`) | §2.1 |
| `documentType` | `PASSPORT` (only value observed) | §2.5 |
| `gender` | `male`, `female` (request); `Male`, `Female` (response, capitalized differently — §2.9's echo shows capitalized) | §2.5, §2.9 |
| `additionalServiceCategory`/`AdditionalServiceCategory`/`ancillaryCategory` | `Baggage`, `Meal`, `Seat`, `Other` (per PRD taxonomy; only `Baggage`/`Meal` directly observed in a response example) | §2.6, §2.8, PRD §4.5 |
| `cellCategory` | `Seat`, `Aisle` (observed, updated 2026-08-10); others `UNKNOWN` | §2.7 |
| `cellAvailability`/`paxCellAvailability` | `AvailablePaid`, `Blocked`, `Occupied` (observed, updated 2026-08-10 — `Blocked` added); `AvailableFree`/`AvailableAfterReservation` are unconfirmed candidates per a QC-checklist source only, not yet observed | §2.7 |
| `cellDetails.cellID` (response) vs. `passengersSelectedSeats...cellId` (request) | Same opaque base64 token; **casing differs between response (`cellID`) and request (`cellId`)** — added 2026-08-10 | §2.7, §2.9 |
| `voidCapability` | `VoidNotAllowed` (observed); others `UNKNOWN` (presumably a "void allowed" counterpart) | §2.9 |
| `bookingStatus` | `UNKNOWN` enumeration — not captured in any observed example showing a non-nominal state | §2.11 |
| `refundability` | `UnKnown` (observed literal value — note unusual capitalization) | §2.1, §2.2 |
| API version marker | `V1` / `V2` (path segment only; casing itself inconsistent, §1.2) | §1.2 |

Where a domain is marked `UNKNOWN`/incomplete above, a generated test should still assert "value is one of the currently-known set OR log-and-flag if a new value appears" rather than hard-failing on an unrecognized-but-possibly-valid value — this keeps generated regression tests from being brittle against legitimate enum growth.

### 8.4 Priority Ordering for Automated Suites

When budget/time forces prioritization, generate and run in this order (highest defect-detection value first, per this document's own findings):
1. The five concretely-evidenced collection defects (§2: V1 Upselling `requestUrl`, V2 GetOfferBundles `JourneyKey1`, V2 Hold `credentialsSelector` casing, V2 CancelHold unquoted-JSON, V2 Void hardcoded-empty `gdsPNR`) and the one evidenced security finding (§7.14, `isdebug` credential exposure).
2. Smoke flows (§7.5).
3. The seven supplier-capability-conflict suppliers' confirmation tests (§7.12).
4. Full endpoint-level positive+negative+business-rule tests (§8.1 items 1,2,5) for all 17 endpoints (§1.2), both versions — note that 2 of the 17 (`SeatAfterHold`, `FareRules`, both added 2026-08-10) currently have **no saved example/test script** and should be treated as discovery/exploratory targets first (§2.7a), not deterministic regression targets, until their live behavior is confirmed.
5. Full flow matrix (§5.4), capability-filtered per supplier (§4.6/§4.7).
6. Boundary/security/integration-negative sweeps (§8.1 items 3,6,7; §8.2 item 7).
7. Scheduled regression re-runs (§7.4/§8.1 item 8/§8.2 item 8) going forward.

---

## Appendix: Document Maintenance

This SPEC.md is a **living document** by necessity — it encodes a large number of `UNKNOWN` values and flagged conflicts that live testing will resolve over time (exact ID TTLs, exact error response shapes, exact `bookingStatus`/`cellAvailability`/`voidCapability` enumerations, the seven supplier-capability conflicts in §4.4, the flow-numbering anomalies in §5.5, and the five collection defects and one security finding threaded through §2/§7). **Every time one of these is confirmed live, update the corresponding section directly** (replace the `UNKNOWN`/`INFERRED` marker with the confirmed fact and its evidence) rather than accumulating confirmation results in a separate document — this file is the intended single source of truth, and it stays trustworthy only if confirmed facts are folded back into it promptly.

### Change Log

- **2026-08-10**: Folded in a Postman collection (`NDC_Integrations_Staging_Scripts_V2.postman_collection.json`) and Sample-Req/Res doc (`Sample_API_Req&Res_V2.md`) update covering SeatMap and the Book/Hold-with-SeatMap surface. Additions: two new V2 endpoints, `SeatAfterHold` (§1.2 #16, §2.7a — immature, no saved example/script) and `FareRules` (§1.2 #17, out of scope here); Book gained an active `passengersSelectedSeats` request field (§2.9) and corresponding response fields (`passengersSelectedSeats`, `passengerSeats`, `totalSelectedSeats`/`totalSelectedSeatsAmount`), also now confirmed present on Retrieve (§2.11); GetSeatMap gained variable-chaining (`getSeatMapOfferId`/`getSeatMapResponceID`, §2.7) that now supersedes AddPassenger's IDs as Book's input whenever GetSeatMap runs; confirmed Hold/BookAfterHold were **not** given the same seat field (§2.10/§2.13), which is the evidenced reason `SeatAfterHold` exists as a separate endpoint. New test cases generated in `NDC_Integration/TestCases/SeatMap_TestCases.csv`. Corresponding gap logged in `NDC_PRD.md` §8 (framework has zero source-code references to any of this new surface). flow.md was **not** modified — §5.5 item 8 flags that it has no flow variant for the new Hold→SeatAfterHold path yet.
- **2026-08-10 (same day, second pass)**: Cross-checked two additional QC-authored resources — `NDC_Integration/Resources/Seat map - Seatmap.md` (an informal TC-SM-*/TC-INT-*-style test table) and `NDC_Integration/Resources/SeatMap QC Execution Checklist.md` (a 35-point structured QC checklist, Parts 1–7) — against this SPEC and the directly-inspected Postman collection. Surfaced and flagged two new conflicts rather than silently merging: (1) both resources name Book's mandatory fields as V1-style `fareConfirmResponseId`/`SelectedOfferId`, contradicting the live V2 collection's actual `ResponseId`/`selectedOfferId` (§2.9); (2) the QC checklist's `cellAvailability` enum includes unconfirmed `AvailableFree`/`AvailableAfterReservation` values not observed in any saved example (§2.7, §8.3). Generated ~24 additional test cases in `SeatMap_TestCases.csv` covering exit-row restriction, duplicate-seat rejection, infant-on-lap, supplier-allocation rollback, currency/amount cross-field consistency, empty-object edge cases, and post-ticketing seat persistence — drawn from concrete scenarios and candidate error codes (`RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD`, `DUPLICATE_SEAT_SELECTION_IN_REQUEST`, `INVALID_SEAT_METADATA`, etc.) named in those two resources but not yet confirmed live. Both resource files were themselves updated in place with cross-references to this SPEC and the flagged conflicts, per the request that these test cases are intended for future automation.


