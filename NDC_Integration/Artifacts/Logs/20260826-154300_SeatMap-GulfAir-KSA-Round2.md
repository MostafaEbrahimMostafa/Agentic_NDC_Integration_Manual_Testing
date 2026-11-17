# QA Execution Report — Round 2 Regression — NDC_Integration/TestCases/SeatMap_TestCases.csv (canonical, 63 test cases)

**Environment:** staging (non-default host — user-specified) &middot; https://ndc-integration-stg-ne-2.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-08-26T11:15:00Z
**Ended:** 2026-08-26T13:23:10Z
**Status:** COMPLETE
**Prior run:** [20260825-103032_SeatMap-GulfAir-KSA](20260825-103032_SeatMap-GulfAir-KSA.md) (Round 1, 2026-08-25) — this is a second full pass over the same supplier/selector/host, plus 3 test cases added to the canonical file on 2026-08-24 that were not present in Round 1's 60-row source (`TC-SEATMAP-VAL-11`, `TC-SEATMAP-BND-04`, `TC-BOOK-POS-04`).

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 35
- Failed: 13
- Blocked: 15

### Pre-flow discovery (blocking, resolved before Test Case 1 could run)

`AddPassenger` for GulfAir/KSA now enforces a business rule (HTTP 400, `PredicateValidator: "Invalid travel document information"`) requiring `passengersList.<pax>.name.{first,middle,last}` to **exactly** match `travelDocument.name.{first,middle,last}` — including the middle name. The V2 Postman collection's own saved `AddPassenger` example (top-level `name.middle="kady"`, `travelDocument.name.middle=""`) — the exact payload Round 1 used successfully one day earlier — is now rejected. Isolated via 6 live variants (date/document-number/nationality/gender/casing changes had no effect; only making the two name objects self-consistent succeeded). This is new since Round 1 and blocks the entire V2 chain (GetSeatMap/Book/Hold all sit downstream of AddPassenger) for anyone using the shipped example verbatim. Worked around for the rest of this run by sending a self-consistent passenger name. See Findings below.

## Test case results

(63 entries; unchanged-from-Round-1 results are reported concisely with an explicit "unchanged" note — full detail for anything that changed, is new, or is a defect.)

### TC-SEATMAP-POS-01 [Positive] — Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails

- Request: POST api/V2/SeatMap/Seat — GulfAir/KSA BAH-RUH 2026-10-16, GF169
- Response: 200 — all four fields present/non-null, 30 rows / 210 cells
- Status: **PASS** (unchanged from Round 1)

### TC-SEATMAP-VAL-05 [Validation] — cellCharacteristics.description consistent with padisCode

- padisCode still literal `"Unknown"` on every cell; description strings self-consistent
- Status: **PASS** (unchanged)

### TC-SEATMAP-VAL-06 [Validation] — Aisle cells column/cellDetails=null, Seat cells populated

- **FIXED since Round 1.** The row-8/column-E cell previously mis-tagged `cellCategory="Aisle"` while carrying real Occupied-seat data is now correctly tagged `cellCategory="Seat"`. Full 210-cell scan: **0/210 violations** (Round 1: 1/210).
- Status: **PASS** (Round 1: FAIL)

### TC-SEATMAP-VAL-07 [Validation] — window/aisle/legroom attributes derivable from description

- Same classification pattern as Round 1 (8A/8F=WINDOW, 8C/8D=AISLE_SEAT, 8B=CENTER+bassinet)
- Status: **PASS** (unchanged)

### TC-SEATMAP-VAL-08 [Validation] — seatPriceDetails populated for Paid, null for Blocked/Occupied

- 179/179 AvailablePaid cells populated; the 1 Occupied cell (8E) has seatPriceDetails=null, cellID=null
- Status: **PASS** (unchanged)

### TC-SEATMAP-VAL-09 [Validation] — cellCode uniqueness

- 180/180 unique
- Status: **PASS** (unchanged)

### TC-SEATMAP-VAL-10 [Validation] — rowNumber/zoneId/column domain constraints

- 30 unique rows, 1 zoneId per deck, columns restricted to {A-F,null}
- Status: **PASS** (unchanged)

### TC-SEATMAP-BND-02 [Boundary] — cellAvailability enum + Aisle cells carry no pricing

- cellAvailability ∈ {AvailablePaid, Occupied}; 0 Aisle cells with pricing
- Status: **PASS** (unchanged)

### TC-SEATMAP-BND-03 [Boundary] — AvailableFree/AvailableAfterReservation

- Not observed (same fallback outcome as Round 1)
- Status: **PASS** (unchanged)

### TC-SEATMAP-BIZ-02 [Business Rule] — seatPriceDetailsByPassenger.totalPrice reconciles to basePrice+taxesPrice

- **FIXED since Round 1.** basePrice now equals the real seat charge with a valid currency (was 0/null-currency); taxesPrice=0 SAR (valid currency); totalPrice reconciles exactly. Sample: cell 8A totalPrice=120.00, basePrice=120.00, taxesPrice=0 → 120.00=120.00+0. **0/179 mismatches** (Round 1: 179/179).
- Status: **PASS** (Round 1: FAIL)

### TC-SEATMAP-BIZ-03 [Business Rule] — cellAvailability vs paxCellAvailability independently reported

- Structural check holds (single-ADT chain, same caveat as Round 1)
- Status: **PASS** (unchanged)

### TC-SEATMAP-BIZ-04 [Business Rule] — real-time inventory (exploratory)

- No concurrent-session mechanism available
- Status: **BLOCKED** (unchanged)

### TC-SEATMAP-REG-02 [Regression] — full schema match, no undocumented keys

- Still 2 undocumented fields: `isFareCheckRequired`, `passengersDetails.<pax>.passengersSeatMapAvailability` — SPEC.md §2.7 not yet amended since Round 1's proposal
- Status: **FAIL** (unchanged)

### TC-SEATMAP-NEG-01 [Negative] — GetSeatMap rejected when isSeatMapRequired=false

- Still 200 with full seatMapDetails — not rejected
- Status: **FAIL** (unchanged)

### TC-SEATMAP-NEG-02 [Negative] — cross-offer ResponseId/selectedOfferId rejected

- Still 200 accepted (Chain A responseId + Chain B offerId)
- Status: **FAIL** (unchanged)

### TC-SEATMAP-NEG-03 [Negative] — fabricated ResponseId/selectedOfferId rejected

- **IMPROVED since Round 1.** Now HTTP 409 with a clean, specific message (`AsyncPredicateValidator: "The selected offer is invalid, expired, or could not be found..."`) instead of Round 1's generic HTTP 500 "ServerError".
- Status: **PASS** (unchanged verdict, underlying error-hygiene defect fixed) — TransactionId `468fcc67-f10d-4c58-a08e-d78c89d59ec4`

### TC-SEATMAP-NEG-04 [Negative] — mandatory field omission sweep

- omit supplier→400; omit credentialsSelector→400; **omit ResponseId→200 (still not rejected)**; omit selectedOfferId→400
- Status: **FAIL** (unchanged)

### TC-SEATMAP-NEG-05 [Negative] — graceful failure (no stack trace leak)

- Reusing NEG-03 evidence — now an even cleaner 409 (was 500), still no leakage either way
- Status: **PASS** (unchanged, underlying shape improved)

### TC-SEATMAP-SEC-01 [Security] — universal security checks

- (1) bad x-api-key→401; (2) bad Client-Id→401; (3) cross-tenant→409 OperationNotSupported "TravelportNdc does not exists"
- Status: **PASS** (unchanged)

### TC-SEATMAP-SEC-02 [Security] — documentation case

- No API call, per definition
- Status: **PASS** (unchanged)

### TC-SEATMAP-INT-02 [Integration] — multi-protocol structural comparison

- Out of scope (single-supplier run)
- Status: **BLOCKED** (unchanged)

### TC-SEATMAP-INT-03 [Integration] — capability-matrix sweep

- Out of scope (single-supplier run); GulfAir's own row reconfirmed SeatMap=Supported live
- Status: **BLOCKED** (unchanged)

### TC-SEATMAP-POS-02 [Positive] — GetSeatMap's IDs feed Book directly

- Confirmed again via the clean chain (pnr PACYNU)
- Status: **PASS** (unchanged)

### TC-SEATMAP-VAL-03 [Validation] — cellID casing round-trips into Book's cellId

- Accepted every time this run
- Status: **PASS** (unchanged)

### TC-BOOK-POS-03 [Positive] — Book accepts a single seat selection and echoes it correctly

- 200, pnr=PACYNU, seat 9C=60.00 SAR echoed exactly (BAH-JED GF181, 2026-11-22)
- Status: **PASS** (unchanged)

### TC-BOOK-BIZ-04 [Business Rule] — totalAmount includes totalSelectedSeatsAmount

- 490.00 + 353.00 + 0 + 60.00 = 903.00 = totalAmount, reconciles exactly
- Status: **PASS** (unchanged)

### TC-BOOK-REG-02 [Regression] — seat-related response schema present

- All 5 fields present and typed correctly
- Status: **PASS** (unchanged)

### TC-BOOK-REG-03 [Regression] — passengerSeats[].price.amount == paxTotalSeatAmount.amount

- 60.00 == 60.00
- Status: **PASS** (unchanged)

### TC-BOOK-VAL-08 [Validation] — currency consistency across seat-price objects

- All "SAR", none placeholder/null
- Status: **PASS** (unchanged)

### TC-RETRIEVE-REG-01 [Regression] — seat persists after ticketing

- GulfAir still tickets synchronously at Book time; Retrieve matches Book field-for-field
- Status: **PASS** (unchanged)

### TC-SEATAFTERHOLD-POS-01 [Positive] — discovery case

- Still HTTP 409 `OperationNotSupported`, Context `"GulfAir does not exists"` — reconfirmed against a **fresh** Hold (pnr=PAFNVL) one day later
- Status: **FAIL** (unchanged) — TransactionId `67bda0d5-f405-4ca8-abfe-f2959d20bc4c`

### TC-SEATAFTERHOLD-VAL-01 [Validation] — required-field completeness

- Still blocked by the supplier-level 409
- Status: **BLOCKED** (unchanged)

### TC-SEATAFTERHOLD-VAL-02 [Validation] — passenger-reference validation

- Sequenced behind VAL-01, itself blocked
- Status: **BLOCKED** (unchanged)

### TC-SEATAFTERHOLD-NEG-01 [Negative] — mismatched pnr/gdsPNR/bookingToken

- Still indistinguishable from the baseline 409
- Status: **BLOCKED** (unchanged) — TransactionId `4fd10ea5-df1b-4c94-8311-2f3855a8aa21`

### TC-SEATAFTERHOLD-NEG-02 [Negative] — expired Hold

- Doubly blocked: base 409 + holdExpirationDate still null
- Status: **BLOCKED** (unchanged)

### TC-SEATAFTERHOLD-SEC-02 [Security] — universal security checks

- 401/401 for bad key/client, short-circuit before business logic; cross-tenant skipped (same reasoning as Round 1)
- Status: **PASS** (unchanged)

### TC-SEATAFTERHOLD-INT-04 [Integration] — chain-position determination

- Position A still fails at the first hop; B/C not independently re-tested (same reasoning)
- Status: **FAIL** (unchanged)

### TC-BOOK-NEG-12 [Negative] — mandatory field omission sweep on Book

- omit supplier→400; omit credentialsSelector→400; **omit ResponseId→200, pnr=PAWHEK, ticketed**; **omit selectedOfferId→500 ServerError**
- Status: **FAIL** (unchanged)

### TC-BOOK-NEG-05 [Negative] — Occupied cell rejected

- 400 "CellId is required" (Occupied cells never carry a real cellID to submit)
- Status: **PASS** (unchanged)

### TC-BOOK-NEG-06 [Negative] — tampered cellId

- Still 200, pnr=PAGULD, ticketed despite a corrupted cellId
- Status: **FAIL** (unchanged)

### TC-BOOK-VAL-06 [Validation] — cellCode/cellId mismatch

- Still 200, pnr=PRKTIQ, seat resolved from cellCode alone, ignoring cellId's real identity
- Status: **FAIL** (unchanged)

### TC-SEATMAP-VAL-04 [Validation] — cross-offer cellId in Book

- Still 200, pnr=PBJRZR, ticketed with `passengersSelectedSeats:{}` — seat silently dropped
- Status: **FAIL** (unchanged)

### TC-BOOK-NEG-07 [Negative] — duplicate seat, two passengers

- 400, clean message naming the exact conflicting seat/segment
- Status: **PASS** (unchanged)

### TC-BOOK-NEG-08 [Negative] — same passenger, two seats on one segment

- Untestable-by-construction (object-keyed schema), confirmed again
- Status: **PASS** (unchanged)

### TC-BOOK-NEG-09 [Negative] — forced supplier seat-allocation failure

- No forcing mechanism available
- Status: **BLOCKED** (unchanged)

### TC-BOOK-VAL-07 [Validation] — late seat-change-before-send

- Reasoning-based, confirmed via this run's own Book calls
- Status: **PASS** (unchanged)

### TC-BOOK-BIZ-05 [Business Rule] — CHD passenger assigned an exit-row seat rejected server-side

- **WORSE than Round 1.** Round 1: the seat selection was silently dropped (safety outcome achieved by accident). Round 2: the exit-row seat (11B, `EXIT_ROW_SEAT`) is **actually attached, priced (60.00 SAR), and ticketed** for the CHD passenger (PAX2), pnr=PRENFE — no rejection, no drop, and no validation of any kind.
- Status: **FAIL** (unchanged verdict, materially worse manifestation — see Findings)

### TC-BOOK-BIZ-06 [Business Rule] — INF-on-lap, no seat fee

- Deprioritized again this run in favor of higher-value findings already surfacing
- Status: **BLOCKED** (unchanged)

### TC-BOOK-BIZ-07 [Business Rule] — wheelchair-accessible seat

- No WHEELCHAIR/WCHR/ACCESSIBLE characteristic found in any sample this run either
- Status: **BLOCKED** (unchanged)

### TC-BOOK-NEG-10 [Negative] — explicit empty passengersSelectedSeats {}

- 200, pnr=PTTXIO, ticketed, no seat fee
- Status: **PASS** (unchanged)

### TC-BOOK-NEG-11 [Negative] — explicit empty setSegmentsSeats {}

- 200, pnr=PAXMIE, ticketed, no seat attached
- Status: **PASS** (unchanged)

### TC-BOOK-INT-03 [Integration] — Bundle+Ancillary+Seat combined

- haveBundles=false for GulfAir reconfirmed this run
- Status: **BLOCKED** (unchanged)

### TC-BOOK-INT-04 [Integration] — Bundle+Seat journey consistency

- Same capability gap
- Status: **BLOCKED** (unchanged)

### TC-BOOK-BND-03 [Boundary] — 0/1/multi passenger-segment seat selections

- (a)/(b) confirmed via this run's own evidence; (c) multi-segment still unavailable (every sampled GulfAir route this run was single-segment)
- Status: **PASS** (unchanged)

### FLOW-V2-49-SEATFIELD [Flow] — Family A SM-enrichment flow

- Search→FareConfirm→AddPassenger→GetSeatMap→Book→Retrieve, all PASS, pnr=PACYNU, totals reconcile
- Status: **PASS** (unchanged)

Hops (6): Search PASS · FareConfirm PASS (isSeatMapRequired=false, non-gating) · AddPassenger PASS · GetSeatMap PASS (seat 9C) · Book PASS (pnr PACYNU, seat echoed) · Retrieve PASS (identical fields)

### FLOW-V2-50-SEATFIELD [Flow] — seat-on-Hold (Family B)

- Still 200, Hold **accepts and echoes** `passengersSelectedSeats` directly (pnr=PABXQM, seat 8A=120.00 SAR) — contradicts §2.10's documented contract
- Status: **FAIL** (unchanged)

### FLOW-V2-CANDIDATE-SM-HOLD-01 [Flow] — SeatAfterHold immediately after Hold

- Hold PASS (pnr=PAFNVL) → SeatAfterHold FAIL (409 "GulfAir does not exists")
- Status: **FAIL** (unchanged)

### FLOW-V2-CANDIDATE-SM-HOLD-02 [Flow] — SeatAfterHold after FareConfirmAfterHold

- Reasoned-BLOCKED (supplier-level rejection, not position-dependent)
- Status: **BLOCKED** (unchanged)

### FLOW-V2-CANDIDATE-SM-HOLD-03 [Flow] — SeatAfterHold after BookAfterHold

- Reasoned-BLOCKED
- Status: **BLOCKED** (unchanged)

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG [Flow] — stale Hold identity into SeatAfterHold

- Tested this run as TC-SEATAFTERHOLD-NEG-01; same baseline 409, adds no new information
- Status: **BLOCKED** (unchanged)

### TC-SEATMAP-VAL-11 [Validation] — NEW (2026-08-24 addendum) — passengersSeatMapAvailability casing consistency

- `passengersSeatMapAvailability.PAX1`'s key is the full segmentRefId string, matching `flightSegments`/`seatMapDetails` keys character-for-character — no casing inconsistency observed for GulfAir (unlike the AirArabia example the test case cites)
- Status: **PASS** (new coverage, no defect found)

### TC-SEATMAP-BND-04 [Boundary] — NEW (2026-08-24 addendum) — cellCategory beyond {Seat, Aisle}

- Only Seat/Aisle observed across all GulfAir samples this run too (narrowbody single-aisle equipment on every sampled route)
- Status: **PASS** (new coverage, same inconclusive-but-consistent outcome as BND-03's treatment)

### TC-BOOK-POS-04 [Positive] — NEW (2026-08-24 addendum) — seat committed at Book time, independent of ticketing

- Immediate post-Book Retrieve (pnr=PACYNU) already shows the seat attached/priced. Caveat: GulfAir tickets synchronously at Book time, so there is no distinct un-ticketed window to isolate the "before payment" half of AC5 — only that seat-attachment doesn't *depend* on a separate step.
- Status: **PASS** (new coverage, core assertion holds; same synchronous-ticketing caveat as TC-RETRIEVE-REG-01)

## Findings

**Of Round 1's 11 defects: 3 FIXED, 8 STILL REPRODUCE. 4 NEW defects found in Round 2.**

### Round 1 defects — FIXED

- **[TC-SEATMAP-VAL-06]** Aisle/Seat partition violation (row 8, column E) — no longer reproduces; cell now correctly tagged.
- **[TC-SEATMAP-BIZ-02]** seatPriceDetails price-reconciliation — basePrice now correctly carries the seat charge; reconciles exactly.
- **[TC-SEATMAP-NEG-03]** Generic HTTP 500 on fabricated IDs — now a clean HTTP 409 with a specific validation message.

### Round 1 defects — STILL REPRODUCE (unchanged)

- **[TC-SEATMAP-NEG-02]** Cross-offer ResponseId/selectedOfferId still accepted (200).
- **[TC-SEATMAP-NEG-04 / TC-BOOK-NEG-12]** ResponseId still not enforced as required on GetSeatMap or Book; omitting it on Book still creates a real ticketed booking (pnr PAWHEK). Omitting selectedOfferId on Book still produces a generic 500.
- **[TC-SEATAFTERHOLD-POS-01]** SeatAfterHold still rejects GulfAir outright (409 "GulfAir does not exists"), reconfirmed against a fresh Hold (pnr PAFNVL).
- **[Hold holdExpirationDate]** Still null for GulfAir, reconfirmed on 3 fresh Holds this run (PAFNVL, PABXQM, PTCQRH).
- **[TC-BOOK-VAL-06 / TC-BOOK-NEG-06]** Book still trusts cellCode over cellId and does not decode/verify a tampered cellId (pnr PRKTIQ, PAGULD).
- **[TC-SEATMAP-VAL-04]** Cross-offer cellId still silently dropped rather than rejected (pnr PBJRZR, `passengersSelectedSeats:{}`).
- **[FLOW-V2-50-SEATFIELD]** Hold still silently accepts and honors `passengersSelectedSeats` directly (pnr PABXQM), contradicting its documented contract.

### NEW defects (Round 2 only)

- **[TC-BOOK-BIZ-05 — WORSENED]** A CHD (child) passenger assigned an emergency exit-row seat is no longer silently dropped as in Round 1 — the exit-row seat (11B) is now **actually attached, priced, and ticketed** (pnr PRENFE) with zero server-side validation. This is a real airline safety/regulatory rule going completely unenforced, and is a materially worse outcome than Round 1's accidental silent-drop. **Severity: High.**
- **[AddPassenger name-consistency regression]** AddPassenger now rejects (HTTP 400 "Invalid travel document information") the exact passenger payload — including the V2 Postman collection's own saved example — that succeeded in Round 1, because the top-level `name` and `travelDocument.name` objects don't match exactly (a middle-name-only mismatch is enough). Blocks the entire V2 chain for anyone using the shipped example. **Severity: High.**
- **[Book credential leak on duplicate-submission error]** A Book retry against an already-consumed offer returns HTTP 409 with the full raw supplier SOAP request/response verbatim in `OriginalSupplierRequest`/`OriginalSupplierResponse` — including the travel agency's **plaintext apiKey and secretKey** — with `isDebug=false` on the originating Search. This is unconditional, not gated by any debug flag. **Severity: Critical.**
- **[Book latency / lost order confirmation]** A live Book call exceeded 180 seconds; the client gave up, but a retry proved the original attempt had already succeeded and ticketed server-side — with **no pnr ever returned** to the caller for that real booking. Every other Book call this run (and every Book call in Round 1) completed well under 60s. **Severity: High.**

## Proposed SPEC.md updates

- **§2.5 — pending** — Document AddPassenger's newly-confirmed (2026-08-26) exact-name-match requirement between `passengersList.<pax>.name` and `travelDocument.name`, and flag that the collection's own saved example violates it.
- **§2.7 — pending** — Update the 2026-08-25 price-reconciliation defect note to reflect the 2026-08-26 fix (basePrice now correctly populated).
- **§2.7 — pending** — Update the 2026-08-25 Aisle/Seat partition defect note to reflect the 2026-08-26 fix (row 8/E now correctly tagged).
- **§2.7 — pending** — Update the 2026-08-25 generic-500 defect note to reflect the 2026-08-26 fix (now a clean 409).
- *(Round 1's still-pending §2.7/§4.6/§2.10 proposals for the undocumented response fields, GulfAir's SeatMap capability row, and Hold's undocumented seat-acceptance remain open and unchanged by this run.)*

## Cleanup / follow-up

- **needs_void_cancel — UNKNOWN PNR** — Orphaned real GulfAir booking (offer GF-OFFER-2, BAH-RUH GF169 2026-10-16, seat 8B) — ticketed server-side per a 409 duplicate-detection message on retry, but no pnr was ever returned to this run. **Cannot be retrieved or voided without the PNR** — flag to the team to locate via GulfAir's Order Management page.
- **needs_void_cancel — PRXDVH** — Real booking created incidentally by a test-script bug (BAH-RUH 2026-10-19) before being fixed; not a deliberate test result.
- **needs_void_cancel — PAWHEK** — Created/ticketed by the ResponseId-omission defect (BAH-RUH, 2026-11-01).
- **needs_void_cancel — PAGULD** — Created/ticketed while proving Book doesn't validate a tampered cellId (BAH-CAI, 2026-10-23).
- **needs_void_cancel — PRKTIQ** — Created/ticketed while proving cellCode drives seat resolution over cellId (BAH-DXB, 2026-10-26).
- **needs_void_cancel — PBJRZR** — Created/ticketed while proving a cross-offer cellId is silently dropped (BAH-DMM, 2026-11-15).
- **needs_void_cancel — PTTXIO** — Created while testing explicit-empty passengersSelectedSeats (BAH-JED, 2026-11-09).
- **needs_void_cancel — PACYNU** — Clean baseline booking for 8 test cases (BAH-JED GF181, 2026-11-22, seat 9C).
- **needs_void_cancel — PAXMIE** — Created while testing explicit-empty setSegmentsSeats (BAH-JED, 2026-11-23).
- **needs_void_cancel — PRENFE — HIGH PRIORITY** — 2-passenger (ADT+CHD) booking; the CHD (PAX2) actually has the exit-row seat 11B attached (BAH-JED GF181, 2026-11-25) — flag given the safety-defect finding above.
- **family_b_hold — PAFNVL** — Held (GulfAir BAH-RUH GF169, 2026-11-19), never progressed. holdExpirationDate null.
- **family_b_hold — PABXQM** — Held with seat 8A attached directly via Hold (undocumented behavior), never progressed.
- **family_b_hold — PTCQRH** — Held (GulfAir BAH-JED, 2026-10-27) to source security-check material, never progressed.
