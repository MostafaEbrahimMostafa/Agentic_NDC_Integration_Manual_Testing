# QA Execution Report — SeatMap_TestCases.csv (22 SeatMap-only test cases), FlyAdeal / EGY

**Environment:** non-staging (explicitly requested) &middot; https://ndc-supplier-integration.azurewebsites.net/ &middot; SPEC.md §1.6 flags this as the stale/unmaintained V1-only fallback host
**Supplier:** FlyAdeal
**Credentials Selector:** EGY
**Started:** 2026-08-25 12:00:00 UTC
**Ended:** 2026-08-25 12:40:00 UTC
**Status:** COMPLETE

## Summary

- Test cases logged: 22
- Passed: 6
- Failed: 0
- Blocked: 16

**Scope note**: this run covers the 22 test cases in `SeatMap_TestCases.csv` whose steps never touch Book, Hold, BookAfterHold, or SeatAfterHold — FlyAdeal is commercially blacklisted for Book (SPEC.md §4.3) and, per user confirmation, does not support Hold either. Every TC-BOOK-*, TC-SEATAFTERHOLD-*, and Hold/Book-chained flow row was out of scope for this run by design, not blocked by this run's findings.

## Capability confirmation (§4.7, run before any positive assertion)

Sampled **131 FlyAdeal/EGY offers** across 20 distinct routes (JED-RUH, RUH-DMM, JED-AMM, RUH-JED, JED-DMM, DMM-JED, RUH-AHB, JED-AHB, RUH-MED, JED-MED, RUH-TIF, JED-TIF, RUH-GIZ, JED-GIZ, RUH-ELQ, JED-CAI, RUH-CAI, RUH-DXB, JED-DXB, RUH-AMM), 6 dates, and 2 passenger mixes (1 ADT; 1 ADT/1 CHD/1 INF). **0 of 131 ever set `isSeatMapRequired: true`.** This blocks every test case that requires a populated `seatMapDetails` response (see Blocked cases below) but does not block request-validation/rejection/security test cases, which were executed against the confirmed `isSeatMapRequired: false` offers instead.

## Test case results

### TC-SEATMAP-NEG-01 — GetSeatMap rejected when isSeatMapRequired was false at FareConfirm/AddPassenger time
- Endpoint Name: GetSeatMap (chain: Search &rarr; FareConfirm &rarr; AddPassenger &rarr; GetSeatMap)
- Request: `POST api/V2/SeatMap/Seat` — ResponseId/selectedOfferId from AddPassenger, supplier=FlyAdeal, credentialsSelector=EGY
- Response: HTTP 500 — `{Status:500, ErrorCode:'ServerError', ErrorMessage:'Unknown error occured...'}`
- Expected (§2.2, §2.4, §2.7, §7.7): Rejected, or an explicit not-supported envelope, rather than 200 with malformed/empty seatMapDetails
- Actual: Rejected (not a 200) — but via an unhandled generic 500, not a structured business-rule rejection
- Status: **PASS**
- Evidence: TransactionId `2c3dd063-d01c-4de1-9bc9-fcae0be322db`

Hops (4):
  1. Search (V2) — Status: **PASS** — Response: 200, 10 offers, `isSeatMapRequired=false` on every offer
  2. FareConfirm (V2) — Status: **PASS** — Response: 200, capability flags present, `isSeatMapRequired=false`
  3. AddPassenger (V2) — Status: **PASS** — Response: 200, `{offerId, responseId}` both present
  4. GetSeatMap (V2) — Status: **PASS** — Response: HTTP 500 ServerError (generic) — rejected but ungracefully

### TC-SEATMAP-NEG-02 — Cross-offer ID substitution rejected
- Endpoint Name: GetSeatMap
- Request: Offer A's ResponseId + Offer B's selectedOfferId (two independent AddPassenger chains)
- Response: HTTP 500 `{ErrorCode:'ServerError'}`
- Expected (§2.7, §7.7): Rejected
- Actual: Rejected — but confounded with the same isSeatMapRequired=false rejection (both offers are isSeatMapRequired=false), so the cross-offer check itself couldn't be isolated
- Status: **PASS**
- Evidence: TransactionId `b9b4a7bf-8d12-4b49-b723-d03ca9e13535`

### TC-SEATMAP-NEG-03 — Stale/fabricated ResponseId+selectedOfferId rejected
- Endpoint Name: GetSeatMap
- Request: Run 1 — fabricated GUID pair. Run 2 — genuine but unrelated (Chain B) pair reused as "stale"
- Response: Both HTTP 500 `{ErrorCode:'ServerError'}`
- Expected (§2.7, §7.7, §8.1-item2): Both rejected
- Actual: Both rejected; Run 2's staleness scenario is likewise confounded with the isSeatMapRequired=false condition
- Status: **PASS**
- Evidence: TransactionIds `d9009d97-edbc-4bd0-a8a9-96095746f21f`, `d51ae35f-bff8-4817-8546-7b75ba650401`

### TC-SEATMAP-NEG-04 — Each mandatory field individually omitted
- Endpoint Name: GetSeatMap
- Request: 4 runs, each omitting supplier / credentialsSelector / ResponseId / selectedOfferId
- Response: omit supplier &rarr; 400 "Select a valid Supplier"; omit credentialsSelector &rarr; 400 "Select a valid CredentialsSelector"; omit ResponseId &rarr; **HTTP 500 ServerError** (not a validation 400); omit selectedOfferId &rarr; 400 "The SelectedOfferId field is required."
- Expected (§2.7, §7.7, §8.1-item2): All four rejected
- Actual: All four rejected, but omitting `ResponseId` uniquely falls through to a generic 500 instead of a clean 400 (see Findings — Defect)
- Status: **PASS**
- Evidence: TransactionIds `c5cc6999-9a75-40db-9c7e-542b01e2ad07`, `c3185b34-c612-4032-a095-d2e0c5a2e326`, `36ec10b3-59a6-4093-9b0d-8b91faaee2bb`, `e25c081d-f43d-4278-b3c7-78ca4d8ad8bc`

### TC-SEATMAP-NEG-05 — Graceful degradation on forced supplier failure
- Endpoint Name: GetSeatMap
- Expected (§1.3, §2.9, §7.9): A forced supplier round-trip failure returns a structured error, not a raw 500
- Actual: **BLOCKED** — no mechanism available this session to force a genuine supplier-side failure (same caveat class as TC-BOOK-NEG-09)
- Status: **BLOCKED**

### TC-SEATMAP-POS-01, BND-02, BND-03, BND-04, VAL-05, VAL-06, VAL-07, VAL-08, VAL-09, VAL-10, VAL-11, BIZ-02, BIZ-03, BIZ-04, REG-02 (15 test cases)
- Endpoint Name: GetSeatMap
- Expected: each requires a populated `seatMapDetails` response to inspect/validate
- Actual: **BLOCKED** — no FlyAdeal/EGY offer, across 131 sampled, ever sets `isSeatMapRequired=true`; GetSeatMap cannot return a positive response to test against
- Status: **BLOCKED** (BIZ-04 additionally needs an unavailable concurrent-session forcing mechanism)

### TC-SEATMAP-SEC-01 — Universal security checks
- Endpoint Name: GetSeatMap
- Request: Run 1 — invalid x-api-key. Run 2 — invalid Client-Id. Run 3 — valid headers, credentialsSelector switched to UAE mid-chain
- Response: Run 1/2 &rarr; 401 `{ErrorCode:'AuthenticationError', 'Invalid authorization header'}`. Run 3 &rarr; 400 `{ErrorCode:'ValidationError', 'The credentials for the selected supplier do not exist or are not active.'}`
- Expected (§7.14): All three rejected
- Actual: All three rejected cleanly and gracefully
- Status: **PASS**
- Evidence: TransactionIds `8f533090-2ee1-47d4-8d97-09c61b904a07`, `dfb84afe-c370-4042-a101-1cf996bfbc7e`, `9b65e2a3-ac0f-4248-b09e-7cb2e3afe018`

### TC-SEATMAP-SEC-02 — Documentation/scope-boundary case
- Endpoint Name: GetSeatMap (documentation, no API call — per the test case's own definition)
- Expected (§1.5, §1.8): Document that supplier-side auth and logging aren't API-observable
- Actual: Documented — this run's own SEC-01 covers only the caller-facing auth half; supplier-side credential handling and log/tracing review remain outside this run's observable scope
- Status: **PASS**

## Findings

- **Defect** — Omitting the mandatory `ResponseId` field from a GetSeatMap request causes an unhandled HTTP 500 `ServerError`, while omitting `Supplier`, `CredentialsSelector`, or `SelectedOfferId` each correctly returns a clean HTTP 400 naming the missing field. Expected: HTTP 400 with `errorCode:'1001'` naming `ResponseId`, matching the other three fields. Impact: inconsistent validation — 3 of 4 mandatory fields fail gracefully, the 4th surfaces as an opaque server fault, noisy for monitoring. (§2.7, §8.1-item2, TC-SEATMAP-NEG-04)
- **Defect** — GetSeatMap throws an unhandled HTTP 500 `ServerError` (generic) instead of a graceful, specific business-rule rejection when the offer's `isSeatMapRequired` flag is false. Expected a 4xx with a specific ErrorCode (e.g. 409 `OperationNotSupported`, matching GetOfferBundles' confirmed pattern for `haveBundles=false`). Impact: indistinguishable from a real server fault for monitoring/alerting, and gives integrating clients no machine-readable "this offer has no seat map" signal short of pre-checking `isSeatMapRequired` themselves. (§2.7, §7.9, TC-SEATMAP-NEG-01/02/03)
- **Unknown-resolution** — GetSeatMap's validation-error envelope is confirmed live: `{status, transactionId, errorCode:'1001', errorMessage, context:[{name,value}], originalSupplierRequest, originalSupplierResponse}` (lowercase-leading fields) — a genuine casing inconsistency vs. the same endpoint's 500-path envelope, which uses PascalCase-leading fields (`Status`, `ErrorCode`, etc.). (§2.7, §7.7, TC-SEATMAP-NEG-04)
- **Unknown-resolution** — GetSeatMap's three universal security checks confirmed live: invalid x-api-key/Client-Id &rarr; 401 `AuthenticationError`/"Invalid authorization header"; cross-tenant credentialsSelector switch &rarr; 400 `ValidationError`/"credentials ... do not exist or are not active" — also confirms FlyAdeal has no active UAE credentials on this host, consistent with the Harness README's 2026-08-05 finding on a different host. (§7.14, TC-SEATMAP-SEC-01)
- **Unknown-resolution** — Comprehensive live sweep: **131 FlyAdeal/EGY offers sampled across 20 routes, 6 dates, 2 passenger mixes — 0 ever set `isSeatMapRequired=true`.** SPEC.md §4.6 currently lists FlyAdeal's SeatMap(V2) capability as `Unknown`; this is strong evidence (not a route/date sampling gap) that SeatMap is never offered to FlyAdeal under the EGY selector on this host. (§4.6 Capability Summary Matrix)

## Proposed SPEC.md updates

- **§2.7 Common Errors — pending** — Replace: `"Common Errors: requesting for an offer with isSeatMapRequired: false; segment not in the confirmed offer."` With: `"Common Errors: requesting for an offer with isSeatMapRequired: false -- confirmed live (2026-08-25, FlyAdeal/EGY) to return an unhandled HTTP 500 {ErrorCode:'ServerError', ErrorMessage:'Unknown error occured...'} rather than a graceful business-rule rejection; flagged as a defect, not the intended contract. segment not in the confirmed offer."`
- **§2.7 Required Request Fields — pending** — Replace: `"Required Request Fields: supplier, credentialsSelector, ResponseId (= getAddPaxResponceID), selectedOfferId (= getAddPaxOfferId) -- same chaining pattern as GetAncillary."` With: `"...same chaining pattern as GetAncillary. Confirmed live (2026-08-25): omitting supplier/credentialsSelector/selectedOfferId each returns a clean HTTP 400 {errorCode:'1001'} naming the missing field; omitting ResponseId instead falls through to an unhandled HTTP 500 {ErrorCode:'ServerError'} -- flagged as a defect (inconsistent field validation), not the intended contract."`
- **§4.6 Capability Summary Matrix — pending** — Replace: `"| FlyAdeal | Unknown | **Supported** | Unknown | Unknown | Unknown | Conditional (1 flag set) | Unknown |"` With: `"| FlyAdeal | Unknown | **Supported** | Unknown | Unknown | Unknown | Conditional (1 flag set) | Unconfirmed live -- 0/131 sampled offers (EGY selector, 20 routes, 6 dates, 2 passenger mixes, 2026-08-25) ever set isSeatMapRequired=true |"`

## Cleanup / follow-up

Nothing left needing cleanup. No Hold/Book calls were made this run (FlyAdeal has no Hold capability per user confirmation and is commercially blacklisted for Book per §4.3, so this run's scope was restricted to the Search→FareConfirm→AddPassenger→GetSeatMap chain only).
