# QA Execution Report — Round 16 targeted run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 3 test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-10-07T14:24:13.050Z
**Ended:** 2026-10-07T14:35:48.539Z
**Status:** COMPLETE
**Execution Duration:** 11m 35s ([View Time Breakdown](20261007-172413_SeatMap-GulfAir-KSA-Round16_TimeBreakdown.html))
**Prior runs:** Rounds 1-15 (see NDC_Integration/Artifacts/Logs/)

## Run note

Run note: in each chain the harness called FareConfirm on up to 6 offers looking for isSeatMapRequired=true (never true for GulfAir - known since Rounds 12/13; GetSeatMap works regardless and offerHasSeat=true); only the last FareConfirm of each chain was used and is logged as the hop. All 149 AvailablePaid cells on the VAL-03 flight (GF163) priced 0 SAR, so the seat attach was proven via the cellCode echo plus Retrieve, not a seat fee.

## Summary

- Test cases logged: 3 of 3 planned
- Passed: 2
- Failed: 1
- Blocked: 0
- Failed test cases: TC-SEATMAP-VAL-04

## Test case results

### TC-SEATMAP-POS-02 — PASS

- **Test Case:** Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-06-13, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 200 - pnr OWOYWN, bookingToken TPC60517147661D7102026, gdsPNR "", ticket 722137002457 (30.1s)
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Confirmed. GetSeatMap returned non-empty offerId/responseId (identical to the AddPassenger values); Book accepted them and created a real ticketed PNR. The Postman collection-variable assignment itself is script-side and not observable over raw HTTP - verified the field mapping it relies on (resp.offerId/resp.responseId) instead. BUG-16 did not reproduce on this call. Unchanged from Rounds 1-15.
- **Status:** PASS
- **Evidence:** GetSeatMap responseId == AddPassenger responseId; offerId equal; Book echoed pnr OWOYWN, ticket 722137002457, Book latency 30.1s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails, offerId/responseId returned
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OWOYWN, bookingToken TPC60517147661D7102026, ticket 722137002457 (30.1s)

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.PAX1.setSegmentsSeats.&lt;segment&gt; = {cellCode 17C, cellId = the verbatim cellDetails.cellID from the GetSeatMap response} (AvailablePaid, GulfAir/KSA, BAH-RUH 2027-06-14, GF163, 1 ADT)
- **Response:** 200 - pnr RKMCKV, ticket 722137002584; passengersSelectedSeats PAX1/&lt;segment&gt; = {cellCode 17C, price 0 SAR}; Retrieve shows the same
- **Expected:** Book accepts the token despite the field-name casing difference (response cellID vs request cellId) and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** Confirmed. The cellID was accepted verbatim under the lowercase-d cellId request key and seat 17C was attached and echoed in passengersSelectedSeats and passengerFareBreakdown[].passengerSeats; Retrieve confirms it persisted. Casing difference is cosmetic. BUG-19 (Round 15: valid seat silently dropped) did NOT reproduce. Note: all 149 AvailablePaid cells on this flight are priced 0 SAR (paxCellAvailability AvailableFree), so the attach is proven by the cellCode echo, not by a seat fee.
- **Status:** PASS
- **Evidence:** Book 200, pnr RKMCKV, ticket 722137002584; passengersSelectedSeats.PAX1.GF-GF163-GF163-2027061409-2027061410-O.cellCode=17C; passengerSeats=[{17C}]; Retrieve repeats 17C; request cellId equals GetSeatMap cellID byte for byte

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails with 149 AvailablePaid cells (GF163)
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr RKMCKV, ticket 722137002584; passengersSelectedSeats PAX1/&lt;segment&gt;/17C price 0 SAR (36.9s)
  - **Hop 6 &mdash; Retrieve:** PASS &mdash; 200 - seat 17C persisted

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer E2 (BAH-JED 2027-06-20) with seat cellCode 8A but cellId = the cellID issued for seat 19A on a different offer E1 (BAH-JED 2027-06-19); two independent Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap chains
- **Response:** 200 - pnr OOQACT ticketed (722137002461) after 31s; passengersSelectedSeats came back as an empty object {}; totalSelectedSeatsAmount 0.00; no error
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07). The foreign cellId was not rejected: Book ran the full supplier round-trip, created and ticketed a real booking, and silently dropped the seat instead of returning an error. New diagnostic this round: VAL-03 shows a valid same-offer cellId DOES attach (BUG-19 gone), so the drop here suggests the foreign token is detected as not-matching but is swallowed instead of rejected - the defect is the missing error.
- **Status:** FAIL
- **Evidence:** Book 200 in 30502ms; pnr OOQACT, ticket 722137002461; passengersSelectedSeats {}; totalSelectedSeatsAmount 0 SAR

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails (offer E1)
  - **Hop 5 &mdash; Search:** PASS &mdash; 200 - 20 offers
  - **Hop 6 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 7 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 8 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails (offer E2)
  - **Hop 9 &mdash; Book:** FAIL &mdash; 200 - pnr OOQACT ticketed (722137002461) after 31s; passengersSelectedSeats {} ; totalSelectedSeatsAmount 0.00; no error

## Findings

### Defects

- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 11, not new) &mdash; Book accepts a cellId that was issued for a different offer's seat: it runs the full booking, tickets it, and silently drops the seat (empty passengersSelectedSeats, no fee) instead of returning an error.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, with no booking created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7, 11, 12, 13, 15 (Round 4 blocked by an outage); reproduced again Round 16 (2026-10-07). **Impact:** A stale or foreign seat token yields a real ticketed booking with no seat and no error, so the caller believes the seat selection succeeded. With BUG-19 not reproducing this round, VAL-03 shows valid tokens attach, so the foreign token is evidently detected but swallowed rather than rejected. Evidence: Book on offer E2 (cellCode 8A) with the cellId of seat 19A from offer E1: 200, pnr OOQACT, ticket 722137002461, passengersSelectedSeats {}, totalSelectedSeatsAmount 0, no error.

### Not reproduced

- **BUG-19** (Book silently drops a valid same-offer seat selection) &mdash; exercised by TC-SEATMAP-VAL-03. Round 15 reproduced 2 of 2 (seats 12D, 10C dropped). Round 16 VAL-03 seat 17C on GF163 attached and persisted through Retrieve on the first attempt. Caveat: this flight prices every seat at 0 SAR, unlike the 60 SAR seats of Rounds 13/15, so re-verify on a flight with paid seats before closing; only 1 attempt this round.
- **BUG-16** (Book returns an error while silently creating the booking) &mdash; exercised by TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04. All 3 Book calls (30-37 seconds each) returned a clean HTTP 200 with a pnr and bookingToken; none returned 409 NDC-INT-UNC-Z9999 or 500. Intermittent across rounds, so recommend a wider re-verification before closing.

## Proposed SPEC.md updates

No SPEC.md updates proposed this run.

## Cleanup / follow-up

Live artifacts left behind this round (3):

- **needs_void_cancel** &mdash; pnr OWOYWN (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-13, 1 ADT, ticket 722137002457, no seat). Staging test booking; void/cancel via the platform team if it should not remain.
- **needs_void_cancel** &mdash; pnr RKMCKV (TC-SEATMAP-VAL-03) &mdash; Real ticketed booking (BAH-RUH 2027-06-14, 1 ADT, ticket 722137002584) with seat 17C attached (0 SAR).
- **needs_void_cancel** &mdash; pnr OOQACT (TC-SEATMAP-VAL-04) &mdash; Real ticketed booking (BAH-JED 2027-06-20, 1 ADT, ticket 722137002461, no seat attached). Evidence for BUG-07 - keep until triaged.

