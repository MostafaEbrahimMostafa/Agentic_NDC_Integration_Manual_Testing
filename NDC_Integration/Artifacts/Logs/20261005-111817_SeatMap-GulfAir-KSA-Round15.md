# QA Execution Report — Round 15 targeted run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 3 test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-10-05T11:18:17.7567426Z
**Ended:** 2026-10-05T11:26:36.393Z
**Status:** COMPLETE
**Execution Duration:** 8m 19s ([View Time Breakdown](20261005-111817_SeatMap-GulfAir-KSA-Round15_TimeBreakdown.html))
**Prior runs:** Rounds 1-13 (see NDC_Integration/Artifacts/Logs/)

## Summary

- Test cases logged: 3 of 3 planned
- Passed: 1
- Failed: 2
- Blocked: 0
- Failed test cases: TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04

## Test case results

### TC-SEATMAP-POS-02 — PASS

- **Test Case:** Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-06-11, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 200 - pnr SYYMDC, bookingToken TPC60517147092D5102026, gdsPNR "", ticket 722137000408 (30.6s)
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Confirmed. GetSeatMap returned non-empty offerId/responseId (identical to the AddPassenger values); Book accepted them and created a real ticketed PNR. The Postman collection-variable assignment itself is script-side and not observable over raw HTTP - verified the field mapping it relies on (resp.offerId/resp.responseId) instead. BUG-16 did not reproduce on this call. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** GetSeatMap responseId == AddPassenger responseId; offerId equal; Book echoed pnr SYYMDC, ticket 722137000408, Book latency 30.6s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails with 161 cells 
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr SYYMDC, bookingToken TPC60517147092D5102026, ticket 722137000408

### TC-SEATMAP-VAL-03 — FAIL

- **Test Case:** Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.PAX1.setSegmentsSeats.&lt;segment&gt; = {cellCode 12D, cellId = the verbatim cellDetails.cellID from the GetSeatMap response} (AvailablePaid, GulfAir/KSA, BAH-RUH 2027-06-12, GF161, 1 ADT); repeated on a fresh flight with seat 10C (BAH-RUH 2027-06-18)
- **Response:** 200 both times - pnr STHFNE and SRMWVW ticketed; passengersSelectedSeats {} ; totalSelectedSeatsAmount 0.00; Retrieve of SRMWVW also shows no seat
- **Expected:** Book accepts the token despite the field-name casing difference (response cellID vs request cellId) and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** The casing difference is not the problem (the token is bound and the request is accepted) but the seat is NOT attached: Book returns 200, ticketed booking, empty passengersSelectedSeats and no seat fee, on two independent flights, and Retrieve confirms the booking holds no seat. Regression from Rounds 1-13, where the same call attached the seat (Round 13: 12C, 60 SAR). New defect BUG-19. BUG-16 did not reproduce.
- **Status:** FAIL
- **Evidence:** Attempt 1: seat 12D, pnr STHFNE, ticket 722137000341, passengersSelectedSeats {}; Attempt 2 (fresh flight): seat 10C, pnr SRMWVW, ticket 722137000342, passengersSelectedSeats {}, totalSelectedSeatsAmount 0.00; Retrieve 200 shows passengersSelectedSeats {}. Both request cellIds equal the GetSeatMap cellID byte for byte.

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails with 210 cells 
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr STHFNE, ticket 722137000341; passengersSelectedSeats {} ; seat not attached: passengersSelectedSeats {} and totalSelectedSeatsAmount 0.00
  - **Hop 6 &mdash; Search:** PASS &mdash; 200 - 25 offers
  - **Hop 7 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 8 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 9 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails with 196 cells 
  - **Hop 10 &mdash; Book:** FAIL &mdash; 200 - pnr SRMWVW, ticket 722137000342; passengersSelectedSeats {} ; seat not attached: passengersSelectedSeats {} and totalSelectedSeatsAmount 0.00
  - **Hop 11 &mdash; Retrieve:** FAIL &mdash; 200 - passengersSelectedSeats {} ; totalSelectedSeatsAmount 0.00

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer E2 (BAH-JED 2027-06-16) with seat cellCode 15B but cellId = the cellID issued for seat 15C on a different offer E1 (BAH-JED 2027-06-15); two independent Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap chains
- **Response:** 200 - pnr SNUMQV ticketed (722137000340) after 30s; passengersSelectedSeats came back as an empty object {}; totalSelectedSeatsAmount 0.00; no error
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07). The foreign cellId was not rejected: Book ran the full supplier round-trip, created and ticketed a real booking, and silently dropped the seat instead of returning an error. Caveat: because VAL-03 now shows even a valid same-offer cellId is dropped (BUG-19), this run cannot show whether the cross-offer binding is checked at all; the verdict is FAIL either way because no rejection occurred.
- **Status:** FAIL
- **Evidence:** Book 200 in 30011ms; pnr SNUMQV, ticket 722137000340; passengersSelectedSeats {} ; priceDetails totalAmount 1143.00, totalSelectedSeatsAmount 0

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails with 196 cells (offer E1) 
  - **Hop 5 &mdash; Search:** PASS &mdash; 200 - 20 offers
  - **Hop 6 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 7 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 8 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails with 196 cells (offer E2) 
  - **Hop 9 &mdash; Book:** FAIL &mdash; 200 - pnr SNUMQV ticketed (722137000340) after 30s; passengersSelectedSeats {} ; totalSelectedSeatsAmount 0.00; no error

## Findings

### Defects

- **[TC-SEATMAP-VAL-03] BUG-19 (occurrence 1, not new) &mdash; Book accepts a valid, same-offer seat selection (cellCode plus the verbatim cellID from GetSeatMap), returns 200 and ticketed booking, but silently does not attach the seat: passengersSelectedSeats is {} and no seat fee is charged. Retrieve confirms the booking holds no seat.** Field: `passengersSelectedSeats`. Expected: {"PAX1":{"&lt;segmentRefId&gt;":{"cellCode":"12D","price":{"amount":60,"currency":"SAR"}}}}. **History:** New in Round 15 (2026-10-05). Rounds 1-13 attached the seat on the same call (Round 13: seat 12C, 60 SAR). Reproduced 2 of 2 times this round on two independent flights (BAH-RUH 2027-06-12 seat 12D, BAH-RUH 2027-06-18 seat 10C). **Impact:** The caller believes a paid seat was reserved but the passenger travels without it; passengersSelectedSeats, passengerSeats and the seat fee are all missing, so every seat-selection flow built on Book is broken for GulfAir/KSA on staging. Evidence: Book 200, pnr STHFNE (seat 12D) and pnr SRMWVW (seat 10C): passengersSelectedSeats {}, totalSelectedSeatsAmount 0.00 SAR; request cellId equals the GetSeatMap cellID exactly; Retrieve of SRMWVW also shows passengersSelectedSeats {}.
- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 10, not new) &mdash; Book accepts a cellId that was issued for a different offer's seat: it runs the full booking, tickets it, and silently drops the seat (empty passengersSelectedSeats, no fee) instead of returning an error.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, with no booking created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7, 11, 12, 13 (Round 4 blocked by an outage); reproduced again Round 15 (2026-10-05). **Impact:** The cellId token is not validated, so a stale or foreign token produces a booking with no seat and no error. This round the silent drop also happens for a valid same-offer cellId (BUG-19), so the cross-offer binding itself can no longer be told apart from the general seat drop. Evidence: Book on offer E2 (cellCode 15B) with the cellId of seat 15C from offer E1: 200, pnr SNUMQV, passengersSelectedSeats {}, totalSelectedSeatsAmount 0, no error.

### Not reproduced

- **BUG-16** (Book returns an error while silently creating the booking) &mdash; exercised by TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04. All 4 Book calls (30-31 seconds each) returned a clean HTTP 200 with a pnr and bookingToken; none returned 409 NDC-INT-UNC-Z9999 or 500. Intermittent across rounds (Round 12 failed 4 of 4, Rounds 9-11 and 13 none), so recommend a wider re-verification before closing.

## Proposed SPEC.md updates

No SPEC.md updates proposed this round (earlier pending proposals are unchanged).

## Cleanup / follow-up

Live artifacts left behind this round (4):

- **needs_void_cancel** &mdash; pnr SYYMDC (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-11, 1 ADT, ticket 722137000408, no seat). Staging test booking; void/cancel via the platform team if it should not remain.
- **needs_void_cancel** &mdash; pnr STHFNE (TC-SEATMAP-VAL-03) &mdash; Real ticketed booking (BAH-RUH 2027-06-12, 1 ADT, ticket 722137000341) - seat 12D requested but not attached. Evidence for BUG-19.
- **needs_void_cancel** &mdash; pnr SRMWVW (TC-SEATMAP-VAL-03) &mdash; Real ticketed booking (BAH-RUH 2027-06-18, 1 ADT, ticket 722137000342) - seat 10C requested but not attached; Retrieve shows no seat. Evidence for BUG-19.
- **needs_void_cancel** &mdash; pnr SNUMQV (TC-SEATMAP-VAL-04) &mdash; Real ticketed booking (BAH-JED 2027-06-16, 1 ADT, ticket 722137000340, no seat attached). Evidence for BUG-07 - keep until triaged.

