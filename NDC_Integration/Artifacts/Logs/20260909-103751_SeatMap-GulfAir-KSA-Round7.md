# QA Execution Report — Round 7 targeted re-verification — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 3 test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04

**Environment:** staging (STAG_ENV default host) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-09-09T10:37:51.864Z
**Ended:** 2026-09-09T10:47:09.724Z
**Status:** COMPLETE
**Prior runs:** [Round 1](20260825-103032_SeatMap-GulfAir-KSA.md), [Round 2](20260826-154300_SeatMap-GulfAir-KSA-Round2.md), [Round 3](20260830-093343_SeatMap-GulfAir-KSA-Round3.md), [Round 4](20260830-090507_SeatMap-GulfAir-KSA-Round4.md), [Round 5](20260830-143810_SeatMap-GulfAir-KSA-Round5.md), and [Round 6](20260906-092818_SeatMap-GulfAir-KSA-Round6.md)

## Summary

- Test cases logged: 3 of 3 planned
- Passed: 2
- Failed: 1
- Blocked: 0

### Scope note

This is a targeted, user-requested partial re-run — only TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, and
TC-SEATMAP-VAL-04 were re-executed (not the full 63-case SeatMap_TestCases.csv suite). Two independent
chains were built fresh against the current staging host to exercise these three cases: Chain A
(BAH-RUH, 2027-06-10, 1 ADT) and Chain B (BAH-JED, 2027-06-13, 2 ADT).

## Test case results

### TC-SEATMAP-POS-02 [Positive] — Verify GetSeatMap sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as ResponseId/selectedOfferId when SeatMap precedes it

- Endpoint Name: GetSeatMap -> Book
- Request: Book POST api/v2/FlightBooking/Book - ResponseId/selectedOfferId sourced directly from GetSeatMap's own responseId/offerId (chain A, BAH-RUH 2027-06-10)
- Response: 200 - pnr=QCSIXR, seat 8B attached; succeeded using GetSeatMap's IDs with no AddPassenger IDs re-sent
- Expected: GetSeatMap's offerId/responseId feed Book's ResponseId/selectedOfferId directly
- Actual: Confirmed on ne-3 (2nd time), unchanged from Rounds 1-6
- Status: **PASS**
- Evidence: Book request ResponseId/selectedOfferId == GetSeatMap response's responseId/offerId verbatim; pnr QCSIXR

Hops (2):
  1. GetSeatMap - Status: **PASS** - Expected: 200, offerId/responseId non-empty - Actual: 200, populated - Evidence: segment GF-GF161-GF161-2027061002-2027061004-O, PAX1 present
  2. Book - Status: **PASS** - Expected: 200, pnr/bookingToken/gdsPNR returned, seat echoed - Actual: 200, matches exactly - Evidence: pnr QCSIXR

### TC-SEATMAP-VAL-03 [Validation] — Verify cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite casing difference (cellID vs cellId)

- Endpoint Name: GetSeatMap -> Book
- Request: Book submitted with passengersSelectedSeats.PAX1.setSegmentsSeats.<seg> = {cellCode:'8B', cellId:<verbatim cellID from GetSeatMap>}
- Response: 200 - seat 8B correctly attached and echoed in passengersSelectedSeats and priceDetails
- Expected: Book accepts the token despite the cellID/cellId casing mismatch
- Actual: Accepted; the casing difference is cosmetic, unchanged from Rounds 1-6
- Status: **PASS**
- Evidence: Book(QCSIXR) response passengersSelectedSeats.PAX1.GF-GF161-GF161-2027061002-2027061004-O={cellCode:'8B',price:{amount:120.00,currency:'SAR'}}

### TC-SEATMAP-VAL-04 [Validation] — Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer

- Endpoint Name: Book
- Request: Book using Chain B's (2-ADT, BAH-JED) ResponseId/selectedOfferId, but passengersSelectedSeats.PAX1.cellId taken from Chain A's (BAH-RUH) GetSeatMap response, cellCode=Chain B's own valid code (8A)
- Response: 200 - pnr=QCHUJQ, booking created, but passengersSelectedSeats came back as an empty object {} - silently dropped, not rejected
- Expected: Request rejected (400 ValidationError) since cellId appears to embed offer-bound metadata
- Actual: STILL REPRODUCES (BUG-07, 7th consecutive round including this 2nd ne-3 run) - accepted with no error at all; booking created and the seat selection silently vanished
- Status: **FAIL**
- Evidence: pnr QCHUJQ, passengersSelectedSeats:{}, totalSelectedSeatsAmount:{amount:0,currency:'SAR'}

## Findings

- **Defect** — [TC-SEATMAP-VAL-04] BUG-07 (recurrence, 7th consecutive round): Book silently drops a
  cross-offer cellId's seat selection instead of rejecting the request. A seat fee the customer
  believes they paid for is never attached and never charged, with no error surfaced at all — the
  booking (pnr QCHUJQ) proceeds as if seat selection was never requested. Expected: HTTP 400
  ValidationError rejecting the request before booking. (SPEC.md §2.7, §2.9, §7.7)

## Proposed SPEC.md updates

No new SPEC.md updates proposed this round — BUG-07's live behavior was already confirmed and
recorded in Round 3-6's reports; this round only re-confirms it is still unresolved.

## Cleanup / follow-up

- **needs_void_cancel** — PNR `QCSIXR` (TC-SEATMAP-POS-02) — Baseline seat-selection booking
  (BAH-RUH 2027-06-10, seat 8B, 120.00 SAR). Primary evidence for TC-SEATMAP-POS-02/VAL-03.
- **needs_void_cancel** — PNR `QCHUJQ` (TC-SEATMAP-VAL-04) — Cross-offer cellId Book (BUG-07
  evidence), BAH-JED 2027-06-13, 2 ADT.
