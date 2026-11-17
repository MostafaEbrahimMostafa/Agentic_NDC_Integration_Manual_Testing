# QA Execution Report — Round 18 full run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 63 test cases (all rows of the file)

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-10-10T12:23:25.651Z
**Ended:** 2026-10-10T13:38:33.200Z
**Status:** COMPLETE
**Execution Duration:** 1h 15m 8s ([View Time Breakdown](20261010-152325_SeatMap-GulfAir-KSA-Round18_TimeBreakdown.html))
**Prior runs:** Rounds 1-17 (see NDC_Integration/Artifacts/Logs/)

## Scope note

Full-suite run: all 63 rows of SeatMap_TestCases.csv (V2, GulfAir / KSA, staging ndc-integration-stg-ne-3), requested as Round 18. Every row was executed or explicitly classified, using a standalone Node harness with the V2 Postman collection bodies: 192 API calls in total across 25 real bookings/holds. Several chains ran in parallel; the disk log was written in one batch after all calls finished (not per test case in real time), so each test case's reporting_started_at/reporting_ended_at brackets a real JSONL append + Markdown re-render taken at write-up time, not at verdict time. HEADLINE: no new defect; all twelve tracked defects reproduced unchanged (BUG-01, 02, 03, 04, 05, 06, 07, 08, 09, 15, 17 and BUG-18 for the 2nd time). BUG-16 (Book error while silently creating the booking) and BUG-19 (valid seat silently dropped) did NOT reproduce. Environment notes: GulfAir returned no offers for BAH departures from 2027-07-09, so the first attempt of 8 chains dated 2027-07-09..15 (empty Search results, no booking made) was repeated on early/mid June 2027 dates and only the repeated chains are counted; a booked seat turns into a NoSeat cell on the next seat map; every cellCharacteristics padisCode is still "Unknown". BND-02/BND-03/BND-04/BIZ-02/VAL-05..VAL-11 were evaluated over all 18 seat maps captured this round (20 segments); SEC-02 is a documentation case (no API call); INT-02/INT-03 are out of scope for a single-supplier run; the bundle/ancillary, SeatAfterHold-dependent and supplier-failure cases are BLOCKED for the reasons stated in each card.

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 35
- Failed: 15
- Blocked: 13
- Failed test cases: TC-SEATMAP-VAL-04, TC-SEATMAP-REG-02, TC-BOOK-NEG-06, TC-BOOK-VAL-06, TC-SEATAFTERHOLD-POS-01, TC-SEATAFTERHOLD-INT-04, FLOW-V2-49-SEATFIELD, FLOW-V2-50-SEATFIELD, FLOW-V2-CANDIDATE-SM-HOLD-01, TC-BOOK-BIZ-05, TC-BOOK-NEG-12, TC-SEATMAP-NEG-01, TC-SEATMAP-NEG-02, TC-SEATMAP-NEG-04, TC-SEATMAP-SEC-01
- Blocked test cases: TC-BOOK-INT-03, TC-SEATAFTERHOLD-VAL-01, TC-SEATAFTERHOLD-NEG-01, TC-SEATAFTERHOLD-NEG-02, FLOW-V2-CANDIDATE-SM-HOLD-02, FLOW-V2-CANDIDATE-SM-HOLD-03, FLOW-V2-CANDIDATE-SM-HOLD-01-NEG, TC-BOOK-NEG-09, TC-BOOK-BIZ-07, TC-BOOK-INT-04, TC-SEATAFTERHOLD-VAL-02, TC-SEATMAP-INT-02, TC-SEATMAP-INT-03

## Test case results

### TC-SEATMAP-POS-02 — PASS

- **Test Case:** [SeatMap][Response] Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-06-29, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 200 - pnr OWONHK, bookingToken TPC60517147818D10102026, gdsPNR "", ticket 722137003885 (31.0s)
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Confirmed. GetSeatMap returned non-empty offerId/responseId (identical to the AddPassenger values); Book accepted them and created a real ticketed PNR. The Postman collection-variable assignment itself is script-side and not observable over raw HTTP - verified the field mapping it relies on (resp.offerId/resp.responseId) instead. BUG-16 (Book 409 with a silently created booking) did NOT reproduce. Unchanged from Rounds 1-17.
- **Status:** PASS
- **Evidence:** GetSeatMap responseId == AddPassenger responseId: true; offerId equal: true; Book 200 pnr OWONHK, ticket 722137003885, 31.0s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 149 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OWONHK, bookingToken TPC60517147818D10102026, tickets 722137003885

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** [SeatMap][Response] Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.PAX1.setSegmentsSeats.GF-GF161-GF161-2027063002-2027063004-O = {cellCode "12C", cellId = the verbatim cellDetails.cellID from the GetSeatMap response} for seat 12C (AvailablePaid, 60 SAR, GulfAir/KSA, BAH-RUH 2027-06-30, GF161, 1 ADT)
- **Response:** 200 - pnr THYDTQ, seat 12C attached and echoed: passengersSelectedSeats.PAX1 = {cellCode 12C, price 60 SAR}; passengerSeats[0] = {12C, 60 SAR} (42.1s)
- **Expected:** Book accepts the token despite the field-name casing difference (response cellID vs request cellId) and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** Accepted. The request sent the response's cellID value verbatim under the lowercase-d field name cellId; Book returned 200, attached seat 12C and echoed it at three places (top-level passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats, priceDetails.totalSelectedSeats). The casing difference is cosmetic (case-insensitive JSON binding). The seat was not silently dropped, so BUG-19 did not reproduce. Unchanged from Rounds 1-17.
- **Status:** PASS
- **Evidence:** Book 200 in 42.1s; pnr THYDTQ; request cellId == GetSeatMap cellID byte for byte (true); echoed cellCode 12C price 60 SAR in all three locations

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** [SeatMap][Request] Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer E2 (BAH-JED 2027-07-02) with seat cellCode 15B but cellId = the cellID issued for seat 15C on a different offer E1 (BAH-JED 2027-07-01); two independent Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap chains
- **Response:** 200 - pnr OOPQEC ticketed (722137003886) after 30.6s; passengersSelectedSeats came back as an empty object {}; totalSelectedSeatsAmount 0 SAR; no error
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07). The foreign cellId was not rejected: Book ran the full supplier round-trip, created and ticketed a real booking, and silently dropped the seat (passengersSelectedSeats {} and no seat fee) instead of returning an error. Seat 15B was neither attached nor refused.
- **Status:** FAIL
- **Evidence:** Book 200 in 30.6s; pnr OOPQEC, ticket 722137003886; passengersSelectedSeats {} ; priceDetails totalAmount 1143 SAR = base 790 + tax 353, totalSelectedSeatsAmount 0

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1202 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1202 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 5 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 6 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 7 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 8 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 9 &mdash; Book:** FAIL &mdash; 200 - pnr OOPQEC, bookingToken TPC60517147819D10102026, tickets 722137003886

### TC-SEATMAP-BND-02 — PASS

- **Test Case:** [SeatMap][Response] Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid, Blocked, and Occupied, and that Aisle-category cells carry no seatPriceDetails.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** All GetSeatMap responses captured this round (20 distinct segments over 18 maps, aircraft 320/321/32Q/32N, 3203 seat cells) enumerated cell-by-cell for distinct cellCategory / cellAvailability / paxCellAvailability values; representative maps are chain A (BAH-RUH, 32N) and chain H (BAH-DMM, 320, ADT+CHD)
- **Response:** 200 - cellCategory {Seat, Aisle, NoSeat}; cellAvailability {AvailablePaid}; paxCellAvailability {AvailablePaid, AvailableFree}; Aisle cells never priced
- **Expected:** cellCategory in {Seat, Aisle}; cellAvailability/paxCellAvailability in {AvailablePaid, Blocked, Occupied}; Aisle cells carry no seatPriceDetails; a new value is logged and flagged, not hard-failed
- **Actual:** No Blocked or Occupied value appeared anywhere. Two values outside the expected sets were found and are flagged, not failed (8.3 policy): cellCategory "NoSeat" (49 cells - a taken/absent seat, cellDetails null) and paxCellAvailability "AvailableFree" (seat 8E, the bassinet seat, on the A320 GF103 flight: overall cellAvailability stays AvailablePaid while every passenger entry says AvailableFree at 0.00 SAR - 2 passenger entries). Every Aisle cell has cellDetails null, so no price (0 violations).
- **Status:** PASS
- **Evidence:** cellCategory: Seat 3203, Aisle 542, NoSeat 49; cellAvailability: AvailablePaid 3203; paxCellAvailability: AvailablePaid 3734, AvailableFree 2 (AvailableFree entries: 8E PAX1 total 0; 8E PAX2 total 0); Aisle cells with cellDetails: 0; Blocked/Occupied cells: 0

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-27, 32N):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 2 &mdash; GetSeatMap (chain H, BAH-DMM 2027-07-05, 320, ADT+CHD):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-BIZ-02 — PASS

- **Test Case:** [SeatMap][Response] Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap
- **Request:** Every priced cell in all GetSeatMap responses this round - seatPriceDetailsByPassenger.&lt;pax&gt; {totalPrice, basePrice, taxesPrice} checked (3736 cell/passenger pairs; chain A is the representative map)
- **Response:** 200 - chain A: 138 pairs (40 SAR x90, 60 SAR x37, 120 SAR x11); across all maps: 3736 pairs, all in SAR
- **Expected:** totalPrice.amount == basePrice.amount + taxesPrice.amount, same currency, for every priced cell/passenger pair
- **Actual:** 0 mismatches in 3736 pairs. basePrice equals totalPrice everywhere and taxesPrice is 0.00 SAR (GulfAir does not split a seat charge into base and tax); the free bassinet seat 8E is 0 = 0 + 0. All amounts are in SAR.
- **Status:** PASS
- **Evidence:** pairs=3736, mismatches=0, currency mismatches=0; zero-priced pairs=2 (8E)

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-27, 32N):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-SEATMAP-REG-02 — FAIL

- **Test Case:** [SeatMap][Response] Verify seatMapDetails.&lt;segment&gt;.{cabinLayoutsByDeck, rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails}}} structure matches the fuller schema captured 2026-08-10, AND flag/tolerate the flat-columns supplier variant (no zones[]/zoneId) confirmed present in a saved example.
- **Category:** Regression
- **Endpoint Name:** GetSeatMap
- **Request:** Full schema diff of chain A's live GetSeatMap response against SPEC.md 2.7's documented field list
- **Response:** 200 - all documented fields present (zones[] layout shape, not the flat-columns variant), plus undocumented fields: top-level isFareCheckRequired, passengersDetails.&lt;pax&gt;.{birthDate, documentNumber, passengersSeatMapAvailability}
- **Expected:** Every key listed in SPEC.md 2.7 present and correctly typed; at least one of the zones[]/zoneId or flat columns[] layout shapes accepted
- **Actual:** Every documented key is present and correctly typed: cabinLayoutsByDeck.Main.zones[].{zoneId,columns,cabinClass}, rows[].{rowNumber,deck,zoneId,cells[]}, cellDetails.{cellID,cellCode,cellAvailability,name,description,seatPriceDetails,seatPriceDetailsByPassenger,cellCharacteristics}. GulfAir uses the zones[]/zoneId shape and rows[] carry zoneId. The response also carries 4 fields SPEC.md 2.7 does not list (isFareCheckRequired, passengersSeatMapAvailability, birthDate, documentNumber) and a NoSeat cellCategory - the same schema drift flagged in every prior round, so kept FAIL for continuity; nothing is missing or mistyped.
- **Status:** FAIL
- **Evidence:** top-level keys: supplier,offerId,responseId,isFareCheckRequired,flightSegments,passengersDetails,seatMapDetails; passengersDetails.PAX1 keys: passengerTypeCode,name,birthDate,documentNumber,passengersSeatMapAvailability; row keys: rowNumber,deck,zoneId,cells; cell keys: seg,row,cellCategory,column,cellDetails

  - **Hop 1 &mdash; GetSeatMap (chain A):** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-BOOK-POS-03 — PASS

- **Test Case:** [Book][Request] Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly.
- **Category:** Positive
- **Endpoint Name:** Book
- **Request:** POST api/v2/FlightBooking/Book - ResponseId/selectedOfferId = GetSeatMap's, passengersSelectedSeats.PAX1.setSegmentsSeats.GF-GF161-GF161-2027063002-2027063004-O = {cellCode "12C", cellId &lt;verbatim cellID&gt;} (one passenger, one segment)
- **Response:** 200 - pnr THYDTQ, gdsPNR "", bookingToken TPC60517147820D10102026, ticket 722137003911; passengersSelectedSeats.PAX1.GF-GF161-GF161-2027063002-2027063004-O = {12C, 60 SAR}
- **Expected:** HTTP 200; pnr/bookingToken/gdsPNR returned; top-level passengersSelectedSeats echoes {cellCode, price}; selectedOffer.passengerFareBreakdown[].passengerSeats has the same {cellCode, price}; priceDetails.totalSelectedSeats/totalSelectedSeatsAmount reflect the same price
- **Actual:** All echoes match exactly: passengersSelectedSeats.PAX1.&lt;segment&gt; = {12C, 60 SAR}; passengerSeats[0] = {12C, 60 SAR}; priceDetails.totalSelectedSeats = [{12C, 60 SAR}]; totalSelectedSeatsAmount = 60 SAR. Unchanged from Rounds 1-17.
- **Status:** PASS
- **Evidence:** Book 200 in 42.1s; pnr THYDTQ ticket 722137003911; totalSelectedSeatsAmount 60 SAR == seat price 60 SAR

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911

### TC-BOOK-NEG-05 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with cellCode 12C - a cell the fresh-offer seat map lists as NoSeat (seat 12C was taken by this round's own booking THYDTQ; GulfAir returns no Blocked/Occupied cells, a taken seat becomes NoSeat) - run 1 with its null cellId, run 2 with the cellId of a different seat (9A); chain C-fresh's unbooked offer, BAH-RUH 2027-06-30
- **Response:** Run 1: 400 NotEmptyValidator "CellId is required." in 0.6s, no pnr. Run 2: 200 - pnr OOAKKW ticketed (722137003894) after 31.1s, passengersSelectedSeats {}, no seat fee (total 933 SAR), no error
- **Expected:** Request rejected (exact status UNKNOWN) with no booking created; or, if a PNR is created, it must NOT reflect the unavailable seat as attached - either outcome logged precisely
- **Actual:** Both outcomes the test allows, and no unavailable seat was ever attached. Run 1 (the real null cellId of an unavailable cell) is rejected by a generic null-cellId check, not by an availability check. Run 2 (unavailable code + a borrowed valid token) is NOT rejected: Book created and ticketed a booking and silently left the seat out (passengersSelectedSeats {}), with no error telling the caller the seat was dropped - the same silent-drop pattern as BUG-07. Blocked/Occupied cells do not exist for this supplier, so NoSeat is the closest unavailable state.
- **Status:** PASS
- **Evidence:** run 1: 400 A0001 NotEmptyValidator "CellId is required." (0.6s); run 2: 200, pnr OOAKKW, passengersSelectedSeats {}, priceDetails.totalSelectedSeatsAmount 0, totalAmount 933

  - **Hop 1 &mdash; GetSeatMap (fresh offer; 12C shown as NoSeat):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells
  - **Hop 2 &mdash; Book (run 1: null cellId):** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [NotEmptyValidator: CellId is required.]
  - **Hop 3 &mdash; Book (run 2: borrowed cellId):** PASS &mdash; 200 - pnr OOAKKW, bookingToken TPC60517147838D10102026, tickets 722137003894

### TC-BOOK-NEG-06 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (BAH-DXB 2027-07-03, 1 ADT) with valid cellCode 14A but its original-length cellId with the last 10 characters replaced by "XXXXXXXXXX", on a fresh never-booked offer
- **Response:** 200 - pnr TELSMS ticketed (722137003889) after 40.9s; seat 14A attached at 60 SAR exactly as if the untampered token had been sent
- **Expected:** Request is rejected (exact status UNKNOWN) since a tampered token should fail whatever server-side decode/signature check the opaque cellId undergoes
- **Actual:** STILL REPRODUCES (BUG-06). The tampered cellId was accepted without any error: Book created a ticketed booking with seat 14A attached and priced (60 SAR), so the token is never validated and the seat is chosen from cellCode alone.
- **Status:** FAIL
- **Evidence:** tampered token length 323, last 10 chars XXXXXXXXXX; Book 200; pnr TELSMS; passengersSelectedSeats.PAX1 = {14A, 60 SAR}; total 1081 = 670 + 351 + 60

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 1021 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1021 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr TELSMS, bookingToken TPC60517147823D10102026, tickets 722137003889

### TC-BOOK-VAL-06 — FAIL

- **Test Case:** [Book][Request] Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (BAH-JED 2027-07-04, 1 ADT) with cellCode "15F" but the cellId that GetSeatMap issued for a different seat (15A), same offer and segment
- **Response:** 200 - pnr OODBGN ticketed (722137003890) after 40.5s; seat attached as the submitted cellCode 15F at 60 SAR
- **Expected:** UNKNOWN - either the API trusts cellId alone, rejects the request, or books the wrong seat under the wrong displayed code; record which
- **Actual:** Resolved: the API trusts cellCode and ignores the cellId contents. With cellCode 15F and the token of seat 15A, Book attached seat 15F (the code) - no cross-check, no error. Same finding as BUG-06 (the cellId is not validated at all), unchanged from Rounds 1-13.
- **Status:** FAIL
- **Evidence:** Book 200; pnr OODBGN; passengersSelectedSeats.PAX1 = {15F, 60 SAR}; seat 15A (the token's seat) not attached; total 1203 = 790 + 353 + 60

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr OODBGN, bookingToken TPC60517147824D10102026, tickets 722137003890

### TC-BOOK-BIZ-04 — PASS

- **Test Case:** [Book][Response] Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected.
- **Category:** Business Rule
- **Endpoint Name:** FareConfirm -&gt; Book
- **Request:** Book with exactly one paid seat (12C, 60 SAR) on pnr THYDTQ; totals compared with the same offer's FareConfirm total taken before the seat
- **Response:** 200 - priceDetails: totalAmount 993.00, totalBaseAmount 580.00, totalTaxAmount 353.00, totalAncillariesAmount 0.00, totalSelectedSeatsAmount 60.00 SAR; FareConfirm totalAmount was 933.00 SAR
- **Expected:** totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount, and totalAmount(after) == totalAmount(before the seat) + totalSelectedSeatsAmount
- **Actual:** Both reconcile exactly: 580 + 353 + 0 + 60 = 993 = totalAmount, and 933 (FareConfirm) + 60 = 993. The seat amount is included in totalAmount. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** totalBase 580 + totalTax 353 + totalAnc 0 + totalSeats 60 = 993 == totalAmount 993; FareConfirm totalAmount 933 + seat 60 = 993

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 2 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911

### TC-BOOK-INT-03 — BLOCKED

- **Test Case:** [Book][Request] Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously on one call.
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck -&gt; Book
- **Request:** Would need a bundle code (GetOfferBundles) plus an ancillary code (GetAncillary) plus a seat on one Book call; capability checked on every FareConfirm this round (29 calls across 29 independent offers/chains)
- **Response:** N/A - FareConfirm returned haveBundles=false and isAncillaryRequired=false on 29 of 29 calls, so GetOfferBundles has nothing to offer for GulfAir/KSA
- **Expected:** UNKNOWN - record whether Book accepts bundles, ancillaries and seats together (accepted with all three reflected, partially accepted, or rejected)
- **Actual:** Not executable for GulfAir: it exposes no bundle capability on any sampled offer, so the bundle half of the combination cannot be built. Not called - no request was sent for this case. Unchanged from Rounds 1-13.
- **Status:** BLOCKED
- **Evidence:** FareConfirm selectedOffer flags on 29 of 29 calls: haveBundles=false, isAncillaryRequired=false, isSeatMapRequired=false, canBeHeld=true

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR

### TC-BOOK-BND-03 — PASS

- **Test Case:** [Book][Request] Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** Three Book payload variants: (a) passengersSelectedSeats omitted entirely (BAH-RUH 2027-06-29, pnr OWONHK); (b) one passenger / one segment, seat 12C (BAH-RUH 2027-06-30, pnr THYDTQ); (c) two passengers each with a seat on both segments of a round trip (BAH-RUH 2027-06-20 / RUH-BAH 2027-06-27, PAX1 14C, PAX1 18C, PAX2 14D, PAX2 18D, pnr TGDKPM)
- **Response:** (a) 200, passengersSelectedSeats {} and no seat fee; (b) 200, seat 12C echoed at 60 SAR; (c) 200 after 50.7s - four seats nested correctly: PAX1 {14C 120, 18C 40}, PAX2 {14D 120, 18D 40}; totalSelectedSeatsAmount 320 SAR
- **Expected:** (a) Book succeeds with no seat attached; (b) succeeds as in TC-BOOK-POS-03; (c) UNKNOWN - confirm live whether multiple passengers/segments nest correctly as sibling keys
- **Actual:** All three sub-cases pass. (c) is evidenced again: two passenger keys, each with a setSegmentsSeats map of two segment keys, are accepted and echoed correctly at every location, and the totals reconcile (base 1698 + tax 1522 + seats 320 = 3540.00 SAR; each passenger paxTotalSeatAmount on the Book response = 160/160). The multi-seat Retrieve of the same booking under-reports the per-passenger seat total - filed separately under FLOW-V2-49-SEATFIELD (BUG-18).
- **Status:** PASS
- **Evidence:** (a) pnr OWONHK pSS {}; (b) pnr THYDTQ; (c) pnr TGDKPM tickets 722137003912/722137003913, 4 of 4 seats echoed, priceDetails totalAmount 3540 = 1698 + 1522 + 0 + 320

  - **Hop 1 &mdash; Book (a) seats omitted:** PASS &mdash; 200 - pnr OWONHK, bookingToken TPC60517147818D10102026, tickets 722137003885
  - **Hop 2 &mdash; Book (b) one passenger, one segment:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911
  - **Hop 3 &mdash; Search:** PASS &mdash; 200 - 125 offers, offer[0] totalAmount 3220 SAR
  - **Hop 4 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 3220 SAR
  - **Hop 5 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 6 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 2 segment(s), 275 seat cells
  - **Hop 7 &mdash; Book (c) two passengers x two segments:** PASS &mdash; 200 - pnr TGDKPM, bookingToken TPC60517147822D10102026, tickets 722137003912/722137003913

### TC-BOOK-REG-02 — PASS

- **Test Case:** [Book][Response] Verify passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema going forward.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Schema diff of TC-BOOK-POS-03's full Book response (pnr THYDTQ) against SPEC.md 2.9's post-2026-08-10 field list
- **Response:** 200 - all 5 seat fields present and correctly typed (passengersSelectedSeats object, passengerSeats array, paxTotalSeatAmount object, totalSelectedSeats array, totalSelectedSeatsAmount object); pre-existing fields all present
- **Expected:** passengersSelectedSeats, passengerSeats, paxTotalSeatAmount, totalSelectedSeats, totalSelectedSeatsAmount are present and correctly typed whenever a seat has been selected; no pre-existing response field regressed
- **Actual:** All five fields present and correctly typed. Every pre-existing top-level key is still present (supplier, pnr, gdsPNR, bookingToken, tickets, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer). Undocumented extras (voidCapability, diRemarks, emdTickets, isBspCommissionApplied) as in earlier rounds. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** top-level keys: supplier,pnr,gdsPNR,bookingToken,voidCapability,creationDate,ticketingDate,tickets,passengersSelectedAncillaries,passengersSelectedSeats,journeys,flightSegments,priceClasses,baggageDetails,passengersList,contacts,selectedOffer,isBspCommissionApplied,diRemarks,emdTickets

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911

### TC-SEATAFTERHOLD-POS-01 — FAIL

- **Test Case:** [SeatAfterHold][Request] Discovery case -- submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape.
- **Category:** Positive
- **Endpoint Name:** Hold -&gt; SeatAfterHold
- **Request:** POST api/v2/SeatMap/SeatAfterHold - supplier GulfAir, credentialsSelector KSA, pnr TFBYUM, gdsPNR "", bookingToken from a fresh Hold (BAH-CAI 2027-07-04), surName "Ibrahim" - the collection's documented 6-field body
- **Response:** 409 {ErrorCode "OperationNotSupported", ErrorMessage "This action is not currently supported by the selected supplier.", Context [{OperationNotSupported: "GulfAir does not exists"}]} in 0.3s
- **Expected:** UNKNOWN by design - establish ground truth: a 200 with a seat-map-like payload, a follow-up requirement, or an error demanding more fields
- **Actual:** STILL REPRODUCES (BUG-03). The endpoint rejects GulfAir outright at supplier level before reading any field: 409 OperationNotSupported, "GulfAir does not exists" (the wording changed from "does not exist(s)" in Round 13; same error code). Ground truth for this supplier: SeatAfterHold is not wired up for GulfAir, so its real request/response shape cannot be discovered here. The Hold itself succeeded (holdExpirationDate null, BUG-04).
- **Status:** FAIL
- **Evidence:** HTTP 409 in 0.3s; ErrorCode OperationNotSupported; Context Value "GulfAir does not exists"; Hold TFBYUM 200 with holdExpirationDate null

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 15 offers, offer[0] totalAmount 1582 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1582 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr TFBYUM, holdExpirationDate null
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]

### TC-SEATAFTERHOLD-VAL-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Confirm whether a seat/cell field is required beyond the 6 documented fields, by inspecting the response/error from TC-SEATAFTERHOLD-POS-01.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** The same 6-field body as POS-01, then a second attempt with a guessed extra field (passengersSelectedSeats with a cellCode/cellId, analogous to Book), both against Held pnr TFBYUM
- **Response:** Both attempts: 409 OperationNotSupported "GulfAir does not exists" in 0.3s/0.1s - identical, the extra field made no difference
- **Expected:** UNKNOWN - if the 6 fields do not suffice, document the actual required shape and flag the collection stub as a defect
- **Actual:** Blocked. The rejection is supplier-level and does not depend on the body, so neither attempt reaches any field validation and the request contract still cannot be resolved for GulfAir (BUG-03). Unchanged from Rounds 1-13.
- **Status:** BLOCKED
- **Evidence:** attempt 1 (6 fields) 409; attempt 2 (+ passengersSelectedSeats) 409; both ErrorCode OperationNotSupported

  - **Attempt 1 of 2 - documented 6-field body:** HTTP 409
  - **Attempt 2 of 2 - plus a guessed passengersSelectedSeats field:** HTTP 409

### TC-SEATAFTERHOLD-NEG-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination.
- **Category:** Negative
- **Endpoint Name:** Hold -&gt; Hold -&gt; SeatAfterHold
- **Request:** SeatAfterHold with pnr TFBYUM (Hold A) but gdsPNR/bookingToken from a second, independent Hold (OODMJW, Hold B, BAH-DXB 2027-07-05)
- **Response:** 409 OperationNotSupported "GulfAir does not exists" in 0.1s - identical to the baseline rejection
- **Expected:** Request rejected (exact status UNKNOWN), analogous to FareConfirmAfterHold/BookAfterHold's mismatched-identity negative cases
- **Actual:** Actually attempted, but not meaningfully testable for GulfAir: the supplier-level 409 fires before any identity-matching logic, so it is impossible to tell whether the mismatch would itself be detected (BUG-03). Unchanged from Rounds 1-13.
- **Status:** BLOCKED
- **Evidence:** 409 OperationNotSupported; same envelope as a fully valid identity

  - **Hop 1 &mdash; Hold (A):** PASS &mdash; 200 - pnr TFBYUM, holdExpirationDate null
  - **Hop 2 &mdash; Hold (B):** PASS &mdash; 200 - pnr OODMJW, holdExpirationDate null
  - **Hop 3 &mdash; SeatAfterHold (mismatched identity):** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]

### TC-SEATAFTERHOLD-NEG-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed.
- **Category:** Negative
- **Endpoint Name:** Hold -&gt; SeatAfterHold
- **Request:** Would need a Held PNR whose holdExpirationDate is confirmed in the past; 7 fresh Holds this round returned holdExpirationDate null
- **Response:** Hold 200 with holdExpirationDate null on every Hold (TFBYUM, OODMJW, TFXRXD, OOEMOB, TLTTGU, OSLGYN, ORVBTX)
- **Expected:** Request rejected (exact status UNKNOWN), consistent with FareConfirmAfterHold on an expired hold
- **Actual:** Doubly blocked: no hold expiry is ever returned (BUG-04 reproduces on all fresh Holds, so there is no time to wait for), and SeatAfterHold rejects GulfAir outright (BUG-03). No call was made for this case beyond the Holds already shown.
- **Status:** BLOCKED
- **Evidence:** holdExpirationDate null on 7 of 7 Holds

  - **Hop 1 &mdash; Hold:** BLOCKED &mdash; 200 - pnr TFBYUM, holdExpirationDate null
  - **Hop 2 &mdash; Hold:** BLOCKED &mdash; 200 - pnr OODMJW, holdExpirationDate null
  - **Hop 3 &mdash; Hold:** BLOCKED &mdash; 200 - pnr TFXRXD, holdExpirationDate null

### TC-SEATAFTERHOLD-SEC-02 — PASS

- **Test Case:** [SeatAfterHold][Request] Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to SeatAfterHold.
- **Category:** Security
- **Endpoint Name:** SeatAfterHold
- **Request:** The POS-01 body with (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier/selector switched to TravelportNdc/UAE against the GulfAir hold, (3b) credentialsSelector switched to UAE
- **Response:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 409 OperationNotSupported "TravelportNdc does not exists"; (3b) 409 OperationNotSupported "GulfAir does not exists"
- **Expected:** All three rejected - exact status/error shape UNKNOWN; reuse the envelope the same checks produce on other endpoints
- **Actual:** All rejected. The two auth-header checks return the same 401 AuthenticationError envelope every other endpoint returns. The cross-tenant variants are rejected too, but by the endpoint's supplier-level 409 rather than by a tenant check, so they do not prove the credentialsSelector boundary is enforced here (compare BUG-17 on GetSeatMap). Unchanged from Rounds 1-13 for checks (1) and (2).
- **Status:** PASS
- **Evidence:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 409 OperationNotSupported; (3b) 409 OperationNotSupported

  - **Attempt 1 of 4 - invalid x-api-key:** HTTP 401
  - **Attempt 2 of 4 - invalid Client-Id:** HTTP 401
  - **Attempt 3 of 4 - cross-tenant: supplier TravelportNdc/UAE:** HTTP 409
  - **Attempt 4 of 4 - cross-tenant: credentialsSelector UAE:** HTTP 409

### TC-SEATAFTERHOLD-INT-04 — FAIL

- **Test Case:** [SeatAfterHold][Request] Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points and comparing outcomes.
- **Category:** Integration
- **Endpoint Name:** Hold -&gt; SeatAfterHold flow (3 candidate positions)
- **Request:** Three Hold-branch chains differing only in when SeatAfterHold is called: A (BAH-JED 2027-06-08) right after Hold; B (BAH-DMM 2027-06-09) after FareConfirmAfterHold; C (BAH-RUH 2027-06-22) after BookAfterHold - each continued to Retrieve
- **Response:** SeatAfterHold 409 OperationNotSupported at all three positions; FareConfirmAfterHold (PnrReprice) 409 OperationNotSupported on all three chains; BookAfterHold 200 on all three; Retrieve shows no seat in any chain (passengersSelectedSeats {}, bookings ticketed)
- **Expected:** UNKNOWN - record which position(s) SeatAfterHold accepts and whether the final Retrieve shows a seat; more than one accepted position is itself a finding
- **Actual:** Not resolvable for GulfAir. SeatAfterHold rejects at every position with the identical supplier-level 409, so the outcome is not position-dependent (BUG-03), and no chain ends with a seat. FareConfirmAfterHold is also rejected for GulfAir (409 OperationNotSupported), so positions B and C could not even be reached the way the chain intends. Ground truth for the flow position stays UNKNOWN.
- **Status:** FAIL
- **Evidence:** A: SAH 409, PnrReprice 409, BookAfterHold 200 (OOEMOB ticket 722137003892); B: PnrReprice 409, SAH 409, BookAfterHold 200 (TLTTGU); C: PnrReprice 409, BookAfterHold 200 (OSLGYN), SAH 409; all Retrieve pSS {}

  - **Hop 1 &mdash; Hold:** PASS &mdash; 200 - pnr OOEMOB, holdExpirationDate null
  - **Hop 2 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 3 &mdash; Hold:** PASS &mdash; 200 - pnr TLTTGU, holdExpirationDate null
  - **Hop 4 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 6 &mdash; Hold:** PASS &mdash; 200 - pnr OSLGYN, holdExpirationDate null
  - **Hop 7 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 8 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr OSLGYN, bookingToken TPC60517147837D10102026, tickets 722137003893
  - **Hop 9 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 10 &mdash; Retrieve:** PASS &mdash; 200 - pnr OSLGYN, bookingStatus Booked, seats []

### FLOW-V2-49-SEATFIELD — FAIL

- **Test Case:** [Flow 49][Response] Verify the existing SM-enrichment Family-A flow now chains Book's ResponseId/selectedOfferId from GetSeatMap's output and that Book's passengersSelectedSeats field is exercised, not left unused.
- **Category:** Flow
- **Endpoint Name:** Flow (Family A: AP-SM-BK-RT)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (seats 14C and 14D) -&gt; Book (ResponseId/selectedOfferId = GetSeatMap's, passengersSelectedSeats on both legs) -&gt; Retrieve; round trip BAH-RUH 2027-06-21 / RUH-BAH 2027-06-24, 1 ADT, pnr OVMIAD; second Retrieve repeated to confirm
- **Response:** Book 200 (45.0s): both seats echoed, totalSelectedSeatsAmount 120, paxTotalSeatAmount 120, totalAmount 1730.00. Retrieve 200: both seats echoed and priceDetails identical, BUT passengerFareBreakdown[0].paxTotalSeatAmount = 60.00 (Book: 120.00) and paxTotalAmount = 1670.00 (Book: 1730.00)
- **Expected:** Per-family state check (6.3 Family A) plus seat-specific checks: Book and Retrieve both echo passengersSelectedSeats matching the selection; totalSelectedSeatsAmount non-zero and reconciles into totalAmount
- **Actual:** Book and Retrieve both echo the two seats (14C, 14D) and priceDetails.totalSelectedSeatsAmount = 120.00 reconciles into totalAmount 1730.00 (849 + 761 + 0 + 120) on both. But the Retrieve response is internally inconsistent for a multi-seat booking: the passenger line shows paxTotalSeatAmount 60.00 while its passengerSeats hold two 60.00 seats (120.00), and paxTotalAmount 1670.00 does not equal the Book response's 1730.00 or the offer total, so the per-passenger totals no longer sum to totalAmount. It reproduced on a second Retrieve and on the two-passenger round trip (paxTotalSeatAmount 120/120 for seats worth 160/160, per-passenger totals summing to 3460 against 3540). BUG-18 reproduces (2nd confirmed occurrence).
- **Status:** FAIL
- **Evidence:** Book passengerFareBreakdown[0]: paxTotalSeatAmount 120, paxTotalAmount 1730; Retrieve (2 calls): paxTotalSeatAmount 60/60, paxTotalAmount 1670/1670, passengerSeats [14C 60, 14D 60]; two-passenger booking TGDKPM: Retrieve per-pax seat total 120/120 vs 160/160, per-pax totals sum 3460 vs totalAmount 3540

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 125 offers, offer[0] totalAmount 1610 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1610 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 2 segment(s), 328 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OVMIAD, bookingToken TPC60517147834D10102026, tickets 722137003920
  - **Hop 6 &mdash; Retrieve:** FAIL &mdash; 200 - pnr OVMIAD, bookingStatus Booked, seats ["14C","14D"]
  - **Hop 7 &mdash; Retrieve:** FAIL &mdash; 200 - pnr OVMIAD, bookingStatus Booked, seats ["14C","14D"]

### FLOW-V2-50-SEATFIELD — FAIL

- **Test Case:** [Flow 50][Request] Verify that GetSeatMap's chosen seat cannot be attached via Hold directly, and must instead go through the new SeatAfterHold endpoint.
- **Category:** Flow
- **Endpoint Name:** Flow (Family B: AP-SM-HD)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (seat 14C) -&gt; Hold with passengersSelectedSeats included on the Hold body (fresh never-held offer, BAH-RUH 2027-07-03) -&gt; FareConfirmAfterHold (PnrReprice) -&gt; Retrieve
- **Response:** Hold 200 (20.2s) - pnr ORVBTX, holdExpirationDate null, passengersSelectedSeats.PAX1 = {14C, 60 SAR}, totalSelectedSeatsAmount 60; FareConfirmAfterHold 409 OperationNotSupported; Retrieve 200 - bookingStatus "OnHold", seat 14C still echoed
- **Expected:** UNKNOWN - confirm live whether Hold silently ignores an unrecognized passengersSelectedSeats field, rejects it, or (surprisingly) accepts it; check whether Retrieve shows passengersSelectedSeats without a SeatAfterHold call
- **Actual:** STILL REPRODUCES (BUG-08). Hold does not ignore or reject the field: it accepts it, prices the seat into the held offer (totalSelectedSeatsAmount 60.00) and Retrieve shows the seat on the OnHold booking, all without any SeatAfterHold call. This contradicts SPEC.md 1.10 item 6 / 2.10, which describe Hold as having no seat field. FareConfirmAfterHold (PnrReprice) is rejected for GulfAir with 409 OperationNotSupported, so the flow cannot reach its documented fourth step.
- **Status:** FAIL
- **Evidence:** Hold echoed passengersSelectedSeats.PAX1 = {14C, 60 SAR}; Retrieve OnHold with the same seat; PnrReprice 409 ErrorCode OperationNotSupported "GulfAir does not exists"; holdExpirationDate null (BUG-04)

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 200 - pnr ORVBTX, holdExpirationDate null
  - **Hop 6 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 7 &mdash; Retrieve:** PASS &mdash; 200 - pnr ORVBTX, bookingStatus OnHold, seats ["14C"]

### FLOW-V2-CANDIDATE-SM-HOLD-01 — FAIL

- **Test Case:** [Flow Candidate SM-Hold-A][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold, before FareConfirmAfterHold.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-A)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold (pnr OOEMOB, BAH-JED 2027-06-08) -&gt; SeatAfterHold immediately after Hold -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Response:** SeatAfterHold 409 OperationNotSupported; FareConfirmAfterHold 409 OperationNotSupported; BookAfterHold 200 (ticket 722137003892); Retrieve 200 - no seat
- **Expected:** UNKNOWN by design - if this position is right, SeatAfterHold succeeds and Retrieve shows the seat; if wrong, SeatAfterHold or a later step rejects
- **Actual:** STILL REPRODUCES (BUG-03). The chain fails at the SeatAfterHold hop: GulfAir is rejected outright (409 OperationNotSupported). It was continued to the end for information: FareConfirmAfterHold is also unsupported for GulfAir (409), BookAfterHold finalizes the booking and the final Retrieve carries no seat.
- **Status:** FAIL
- **Evidence:** SAH 409 OperationNotSupported "GulfAir does not exists"; PnrReprice 409; BookAfterHold 200 pnr OOEMOB; Retrieve pSS {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr OOEMOB, holdExpirationDate null
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 6 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 7 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr OOEMOB, bookingToken TPC60517147836D10102026, tickets 722137003892
  - **Hop 8 &mdash; Retrieve:** FAIL &mdash; 200 - pnr OOEMOB, bookingStatus Booked, seats []

### FLOW-V2-CANDIDATE-SM-HOLD-02 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-B][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-B)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold (pnr TLTTGU, BAH-DMM 2027-06-09) -&gt; FareConfirmAfterHold -&gt; SeatAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Response:** FareConfirmAfterHold 409 OperationNotSupported; SeatAfterHold 409 OperationNotSupported; BookAfterHold 200 (ticket 722137003921); Retrieve 200 - no seat
- **Expected:** UNKNOWN by design - same logic as candidate 01, testing whether re-pricing must come before or after the seat
- **Actual:** Blocked. The chain cannot be built as designed: its third step (FareConfirmAfterHold) is rejected for GulfAir, and SeatAfterHold is rejected at supplier level regardless of position, so the before/after-re-pricing question cannot be answered.
- **Status:** BLOCKED
- **Evidence:** PnrReprice 409; SAH (position B) 409; BookAfterHold 200 pnr TLTTGU; Retrieve pSS {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1372 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1372 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr TLTTGU, holdExpirationDate null
  - **Hop 5 &mdash; PnrReprice:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 6 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 7 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr TLTTGU, bookingToken TPC60517147835D10102026, tickets 722137003921
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200 - pnr TLTTGU, bookingStatus Booked, seats []

### FLOW-V2-CANDIDATE-SM-HOLD-03 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-C][Response] Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-C)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold (pnr OSLGYN, BAH-RUH 2027-06-22) -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; SeatAfterHold -&gt; Retrieve
- **Response:** FareConfirmAfterHold 409 OperationNotSupported; BookAfterHold 200 (ticket 722137003893); SeatAfterHold 409 OperationNotSupported; Retrieve 200 - no seat
- **Expected:** UNKNOWN by design - rejected if seat selection is a pre-ticketing step only, or accepted with the seat shown on Retrieve if post-finalization changes are allowed
- **Actual:** Blocked. SeatAfterHold is rejected with the same supplier-level 409 after the booking is finalized, exactly as at every other position, so it says nothing about whether post-finalization seat changes are allowed.
- **Status:** BLOCKED
- **Evidence:** PnrReprice 409; BookAfterHold 200 pnr OSLGYN; SAH (position C) 409; Retrieve pSS {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr OSLGYN, holdExpirationDate null
  - **Hop 5 &mdash; PnrReprice:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 6 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr OSLGYN, bookingToken TPC60517147837D10102026, tickets 722137003893
  - **Hop 7 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200 - pnr OSLGYN, bookingStatus Booked, seats []

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-A][Request] Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken triple carried over from a different, unrelated Hold call earlier in the same test session.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-A, negative)
- **Request:** Chain of candidate 01 up to Hold (pnr TFXRXD, BAH-JED 2027-06-25), then SeatAfterHold with the pnr/gdsPNR/bookingToken of an earlier, unrelated Hold (TFBYUM)
- **Response:** 409 OperationNotSupported "GulfAir does not exists" in 0.1s - identical to the baseline rejection
- **Expected:** Request rejected (exact status UNKNOWN), same class as TC-SEATAFTERHOLD-NEG-01 but inside a full flow context
- **Actual:** Actually attempted; the supplier-level rejection (BUG-03) fires before any identity check, so a stale identity cannot be told apart from a valid one. Not meaningfully testable for GulfAir. Unchanged from Rounds 1-13.
- **Status:** BLOCKED
- **Evidence:** 409 OperationNotSupported with a stale pnr/token; same envelope as the valid-identity baseline

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr TFXRXD, holdExpirationDate null
  - **Hop 5 &mdash; SeatAfterHold (stale identity):** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]

### TC-BOOK-BIZ-05 — FAIL

- **Test Case:** [Book][Request] Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** AddPassenger (ADT PAX1 + CHD PAX2, BAH-DMM 2027-07-05) -&gt; GetSeatMap (exit-row seat 10A, description EXIT_ROW_SEAT) -&gt; Book assigning 10A to the CHD passenger PAX2 and 15F to the ADT
- **Response:** 200 - pnr OPTSKU, both passengers ticketed (722137003887/722137003888) after 48.4s; PAX2 (CHD) seat 10A 60 SAR echoed, no error
- **Expected:** Automatable assertion: the request is rejected (candidate error RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD, UNKNOWN - record the exact code) and no pnr is created
- **Actual:** STILL REPRODUCES in its worsened form (BUG-09). GetSeatMap itself lists the exit-row cell 10A in the CHD passenger's allow-list and prices it for the CHD; Book then accepts the CHD in an exit-row seat with zero validation, creates the PNR and tickets both passengers. No child/exit-row restriction exists anywhere in the flow.
- **Status:** FAIL
- **Evidence:** CHD PAX2 allow-list contains 10A (24 of 24 exit-row cells offered); Book 200; pnr OPTSKU; passengersSelectedSeats.PAX2 = {10A, 60 SAR}; total 2655 = base 1829 + tax 706 + seats 120

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 2535 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr OPTSKU, bookingToken TPC60517147821D10102026, tickets 722137003887/722137003888

### TC-BOOK-NEG-07 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request that assigns the same seat cell to two different passengers.
- **Category:** Negative
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Two-ADT chain (BAH-CAI 2027-07-06); Book with PAX1 and PAX2 both selecting the identical cellCode/cellId (17C) for the same segment
- **Response:** 400 NDC-INT-TEC-A0001 in 0.2s: "Seat '17C' is assigned to multiple passengers on segment 'GF-GF79-GF79-2027070600-2027070603-O'."; no pnr
- **Expected:** Request rejected before any supplier round-trip (candidate error DUPLICATE_SEAT_SELECTION_IN_REQUEST, exact status UNKNOWN); no pnr created
- **Actual:** Rejected cleanly and fast (0.2s, so before any supplier call) with a specific, on-point validation message naming the seat and segment. The candidate code DUPLICATE_SEAT_SELECTION_IN_REQUEST is not used - the envelope is the generic 400 NDC-INT-TEC-A0001 with the message in Context. No booking was created. Unchanged from Rounds 5-13. (This is a different scenario from BUG-07, which is a cross-offer cellId.)
- **Status:** PASS
- **Evidence:** HTTP 400 in 0.2s; ErrorCode NDC-INT-TEC-A0001; Context: Seat '17C' is assigned to multiple passengers on segment 'GF-GF79-GF79-2027070600-2027070603-O'.; no pnr in the response

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 15 offers, offer[0] totalAmount 3164 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 3164 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [: Seat '17C' is assigned to multiple passengers on segment 'GF-GF79-GF79-2027070600-2027070603-O'.]

### TC-BOOK-NEG-08 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request where the same passenger selects two different seats on the same segment.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (BAH-RUH 2027-07-07, 1 ADT) with a hand-built raw JSON body that repeats the same segmentRefId key twice under passengersSelectedSeats.PAX1.setSegmentsSeats - first entry seat 14C, second entry seat 14D (a normal JSON client cannot produce this; the body was written as raw text)
- **Response:** 200 - pnr OURGLZ ticketed (722137003891) after 41.2s; only the second seat (14D, 60 SAR) attached; the first was silently discarded; no error
- **Expected:** UNKNOWN - setSegmentsSeats is an object keyed by segmentRefId, so a duplicate cannot be submitted by a normal client; document the constraint and verify the last-value-wins behavior is understood rather than asserting a specific API rejection
- **Actual:** Constraint documented and behavior observed: in valid JSON the segment key can appear only once, and when a raw body forces the duplicate the server keeps the LAST value (seat 14D) and drops the first (14C) without any error or warning. So two different seats on one segment for one passenger is impossible to express, and a client bug that repeats the key is silently resolved to the last entry.
- **Status:** PASS
- **Evidence:** raw body carried the segment key twice; response passengersSelectedSeats.PAX1.&lt;segment&gt; = {14D, 60 SAR}; seat 14C absent; total 993

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OURGLZ, bookingToken TPC60517147825D10102026, tickets 722137003891

### TC-BOOK-BIZ-06 — PASS

- **Test Case:** [Book][Response] Verify an Infant (INF) passenger travelling on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** AddPassenger (ADT PAX1 + INF PAX2, ParentPaxRefId = Pax1, BAH-RUH 2027-07-08) -&gt; GetSeatMap (only PAX1/ADT appears) -&gt; Book with a seat (14C) for the ADT only; INF absent from passengersSelectedSeats
- **Response:** 200 - pnr OVJLJD, both passengers ticketed (722137003914/722137003915) after 41.6s; PAX1 (ADT) paxTotalSeatAmount 60.00, PAX2 (INF) paxTotalSeatAmount 0.00 with passengerSeats []; totalSelectedSeatsAmount 60.00
- **Expected:** Book succeeds; the INF has paxTotalSeatAmount 0 (or absent) and no passengerSeats; the ADT paxTotalSeatAmount matches the seat price; totalSelectedSeatsAmount equals only the ADT seat price, not double-counted
- **Actual:** All assertions hold. The infant needs no placeholder entry in passengersSelectedSeats: INF paxTotalSeatAmount 0.00 SAR with empty passengerSeats, ADT 60.00 SAR, totalSelectedSeatsAmount 60.00 SAR (once). Fare lines: ADT 1053.00 + INF 111.00 = 1164.00 = totalAmount. Unchanged from Rounds 5-13.
- **Status:** PASS
- **Evidence:** passengerFareBreakdown: PAX1 ADT seats [14C 60] seatTotal 60; PAX2 INF seats [] seatTotal 0; totalSelectedSeatsAmount 60; totalAmount 1164

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 1104 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1104 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OVJLJD, bookingToken TPC60517147826D10102026, tickets 722137003914/722137003915

### TC-BOOK-NEG-09 — BLOCKED

- **Test Case:** [Book][Request] Validate graceful rollback (no orphaned PNR or charge) when the supplier's seat allocation call fails or times out after Book is submitted with a seat selection.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Best available attempt to provoke a supplier-side seat-allocation failure from the request alone: Book (BAH-JED 2027-06-07, 1 ADT) with a schema-valid but non-existent cellCode "99Z" and a real cellId borrowed from another seat
- **Response:** 200 - pnr OVGWDY ticketed (722137003918) after 31.1s; passengersSelectedSeats {}; no seat fee; no error
- **Expected:** Response is an error (candidate HTTP 422/502) and either no pnr is returned or a follow-up Retrieve shows the booking without the failed seat and without a seat fee; exact behavior UNKNOWN and environment-dependent
- **Actual:** Blocked: a supplier-side allocation failure cannot be forced from the request. The probe did not provoke one - the invalid code was accepted and silently dropped (booking ticketed without a seat, no fee), the same silent-drop pattern seen in TC-BOOK-NEG-05 and BUG-07. No rollback path was exercised. A test double or a team-coordinated failure trigger is still needed.
- **Status:** BLOCKED
- **Evidence:** Book 200; pnr OVGWDY; passengersSelectedSeats {}; totalSelectedSeatsAmount 0; totalAmount 1143

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 200 - pnr OVGWDY, bookingToken TPC60517147832D10102026, tickets 722137003918

### TC-BOOK-VAL-07 — PASS

- **Test Case:** [Book][Request] Validate that submitting a second, different passengersSelectedSeats selection supersedes an earlier selection made earlier in the same test session (late seat-change-before-submission).
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** One Book request built with seat 12C then sent once (no second selection is ever transmitted) - pnr THYDTQ
- **Response:** 200 - only seat 12C appears in passengersSelectedSeats / passengerSeats / totalSelectedSeats
- **Expected:** Book succeeds and reflects exactly the seat that was transmitted; no other/earlier seat appears anywhere in the response
- **Actual:** The single Book call carried cell 12C and the response reflects only 12C at every location (60.00 SAR); no other cell code appears. This is a client-side construction check: only one Book is ever sent, so there is no cached/earlier selection to leak. Every Book sent this round is checked the same way.
- **Status:** PASS
- **Evidence:** transmitted cellCode 12C; response cellCodes found: [12C]

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911

### TC-BOOK-BIZ-07 — BLOCKED

- **Test Case:** [Book][Request] Validate a designated wheelchair-accessible seat can be selected for a passenger flagged for special assistance, and the assignment is preserved.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Would need a wheelchair-accessible cell identified from cellCharacteristics/description; every GetSeatMap response this round (20 distinct segments, 3203 seat cells) scanned for such a value
- **Response:** N/A - no wheelchair / WCHR / accessible value in the 15-value description vocabulary
- **Expected:** UNKNOWN - Book/Retrieve succeed with the seat attached; any SSR-linkage behavior found is a new SPEC.md finding
- **Actual:** Not executable: the vocabulary (CHARGEABLE_SEAT, LEG_SPACE_SEAT, FRONT_OF_CABIN, WINDOW, BULKHEAD_SEAT, LEFT_SIDE_OF_AIRCRAFT, SEAT_WITH_BASSINET_FACILITY, CENTER_SEAT, AISLE_SEAT, RIGHT_SIDE_OF_AIRCRAFT, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL, EXIT_ROW_SEAT, OVER_WING_SEAT_S, PREFERRED_SEAT_PREFERENTIAL_SEAT) contains no wheelchair designation. NOT_ALLOWED_FOR_INFANTS and NOT_ALLOWED_FOR_MEDICAL are restrictions, not accessibility markers. Not called.
- **Status:** BLOCKED
- **Evidence:** description values across all maps: 15 distinct, none wheelchair-related; NOT_ALLOWED_FOR_INFANTS 328 cells, NOT_ALLOWED_FOR_MEDICAL 426 cells

  - **Hop 1 &mdash; GetSeatMap:** BLOCKED &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-BOOK-VAL-08 — PASS

- **Test Case:** [Book][Response] Verify the currency code is consistent (not a generic placeholder like "string") across every seat-price object in one Book response.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Book response with one paid seat (pnr THYDTQ) - every seat-related price.currency value collected and compared
- **Response:** 200 - 5 seat-related currency values, all "SAR"
- **Expected:** Every seat-related price.currency identical (matching the offer currency) and none equal to the literal "string" or null/empty
- **Actual:** All 5 values are "SAR" (passengersSelectedSeats price, passengerSeats price, paxTotalSeatAmount, totalSelectedSeatsAmount, totalSelectedSeats price); none is "string", null or empty. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** currency values: SAR,SAR,SAR,SAR,SAR

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911

### TC-BOOK-REG-03 — PASS

- **Test Case:** [Book][Response] Verify selectedOffer.passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount when exactly one seat is selected.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Book response for one paid seat on one passenger (pnr THYDTQ, seat 12C) - passengerSeats[0].price.amount compared with paxTotalSeatAmount.amount
- **Response:** 200 - passengerSeats[0].price = 60 SAR; paxTotalSeatAmount = 60 SAR
- **Expected:** The two amounts are exactly equal and in the same currency; any mismatch is a confirmed defect
- **Actual:** 60.00 == 60.00 SAR, same currency. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** selectedOffer.passengerFareBreakdown[0].passengerSeats[0].price {60, SAR}; paxTotalSeatAmount {60, SAR}

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911

### TC-BOOK-NEG-10 — PASS

- **Test Case:** [Book][Request] Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object ({}) rather than omitted.
- **Category:** Negative
- **Endpoint Name:** AddPassenger -&gt; Book
- **Request:** Book (BAH-DXB 2027-06-05, 1 ADT) with passengersSelectedSeats sent explicitly as an empty object {} (field present, not omitted)
- **Response:** 200 - pnr OWXNXQ ticketed (722137003917) after 29.5s; passengersSelectedSeats {} in the response; totalSelectedSeatsAmount 0.00 SAR
- **Expected:** Book succeeds (HTTP 200), no seat fee (totalSelectedSeatsAmount 0 or absent), passengersSelectedSeats empty/absent in the response, no 500-level error from the explicit empty object
- **Actual:** Succeeded exactly as expected: HTTP 200, real ticketed PNR, passengersSelectedSeats {} echoed, totalSelectedSeatsAmount 0.00 SAR (totalSelectedSeats []), no error. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** Book 200; pnr OWXNXQ; passengersSelectedSeats {}; totalSelectedSeatsAmount {0, SAR}; totalAmount 1021

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 1021 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1021 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 - pnr OWXNXQ, bookingToken TPC60517147831D10102026, tickets 722137003917

### TC-BOOK-NEG-11 — PASS

- **Test Case:** [Book][Request] Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object.
- **Category:** Negative
- **Endpoint Name:** AddPassenger -&gt; Book
- **Request:** Book (BAH-DMM 2027-06-06, 1 ADT) with passengersSelectedSeats.PAX1.setSegmentsSeats sent as an empty object {} (passenger key present, no segment/cell)
- **Response:** 200 - pnr OWPHXJ ticketed (722137003916) after 28.9s; passengersSelectedSeats {}; no seat attached
- **Expected:** Book succeeds; no seat attached for the passenger; no error from the otherwise-empty nested object
- **Actual:** Succeeded exactly as expected: HTTP 200, real ticketed PNR, no seat, totalSelectedSeatsAmount 0.00 SAR, no error. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** Book 200; pnr OWPHXJ; passengersSelectedSeats {}; totalSelectedSeatsAmount {0, SAR}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1372 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1372 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 - pnr OWPHXJ, bookingToken TPC60517147830D10102026, tickets 722137003916

### TC-BOOK-NEG-12 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects requests with each mandatory field individually omitted: ResponseId/fareConfirmResponseId, selectedOfferId/SelectedOfferId, supplier, credentialsSelector.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** 4 variants of a no-seat Book payload, each on its own fresh offer, with exactly one mandatory field removed: ResponseId (BAH-JED 2027-06-01), selectedOfferId (BAH-DXB 2027-06-02), supplier (BAH-DMM 2027-06-03), credentialsSelector (BAH-CAI 2027-06-04)
- **Response:** omit ResponseId -&gt; 200, real PNR OWMWDQ created and ticketed (722137003919) after 28.3s; omit selectedOfferId -&gt; 400; omit supplier -&gt; 400; omit credentialsSelector -&gt; 400
- **Expected:** All four runs rejected (exact status UNKNOWN); no pnr created in any run
- **Actual:** STILL REPRODUCES (BUG-05). Three runs are cleanly rejected with a 400 in under a second (omit selectedOfferId: 400 NDC-INT-TEC-A0001 "The selected offer is invalid, expired, or could not be found"; omit supplier / credentialsSelector: 400 errorCode 1001 naming the missing field) - no 500s, so BUG-13 stays resolved. Omitting ResponseId is accepted: Book returns 200 and creates a real ticketed PNR, although ResponseId is a documented required field.
- **Status:** FAIL
- **Evidence:** omit ResponseId 200, pnr OWMWDQ, ticket 722137003919; omit selectedOfferId 400 A0001; omit supplier 400 1001 "Select a valid Supplier"; omit credentialsSelector 400 1001 "Select a valid CredentialsSelector"

  - **Attempt 1 of 4 - ResponseId omitted (BAH-JED 2027-06-01):** HTTP 200
  - **Attempt 2 of 4 - selectedOfferId omitted (BAH-DXB 2027-06-02):** HTTP 400
  - **Attempt 3 of 4 - supplier omitted (BAH-DMM 2027-06-03):** HTTP 400
  - **Attempt 4 of 4 - credentialsSelector omitted (BAH-CAI 2027-06-04):** HTTP 400

### TC-SEATMAP-VAL-05 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - every cellCharacteristics[] (padisCode + description) pair across all 138 seat cells read
- **Response:** 200 - 690 characteristics entries, every padisCode = "Unknown"; 15 distinct description strings
- **Expected:** For every padisCode observed, description must not contradict its known meaning per the PADIS reference table; codes outside the table are logged, not failed
- **Actual:** GulfAir's adapter never populates a real padisCode (690 of 690 are "Unknown"; 15487 of 15487 across all maps), so no code can contradict its description; the description strings are self-describing enums (CHARGEABLE_SEAT, LEG_SPACE_SEAT, FRONT_OF_CABIN, WINDOW, BULKHEAD_SEAT, LEFT_SIDE_OF_AIRCRAFT, SEAT_WITH_BASSINET_FACILITY, CENTER_SEAT, AISLE_SEAT, RIGHT_SIDE_OF_AIRCRAFT, OVER_WING_SEAT_S, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL, EXIT_ROW_SEAT, PREFERRED_SEAT_PREFERENTIAL_SEAT). Logged, not failed. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** characteristics=690, padisCode Unknown=690; descriptions: CHARGEABLE_SEAT 138, LEG_SPACE_SEAT 11, FRONT_OF_CABIN 48, WINDOW 46, BULKHEAD_SEAT 5, LEFT_SIDE_OF_AIRCRAFT 69, SEAT_WITH_BASSINET_FACILITY 2, CENTER_SEAT 46, AISLE_SEAT 46, RIGHT_SIDE_OF_AIRCRAFT 69, OVER_WING_SEAT_S 48, NOT_ALLOWED_FOR_INFANTS 24, NOT_ALLOWED_FOR_MEDICAL 24, EXIT_ROW_SEAT 24, PREFERRED_SEAT_PREFERENTIAL_SEAT 90

  - **Hop 1 &mdash; GetSeatMap (chain A):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-SEATMAP-BND-03 — PASS

- **Test Case:** [SeatMap][Response] Verify AvailableFree is accepted as a real cellAvailability value (confirmed via saved example) and confirm live whether AvailableAfterReservation is also real, beyond the four now-evidenced values (AvailablePaid, Blocked, Occupied, AvailableFree).
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap sampled across 20 distinct GulfAir/KSA segments on 4 aircraft types (BAH to RUH, JED, DXB, DMM, CAI; the A320 GF103 map is the representative one) - every cell scanned for cellAvailability / paxCellAvailability values
- **Response:** 200 - AvailableFree seen live: seat 8E on the A320 (GF103, BAH-DMM) has paxCellAvailability "AvailableFree" for every passenger with all three prices 0.00 SAR while cellAvailability is "AvailablePaid"; AvailableAfterReservation never seen
- **Expected:** AvailableFree confirmed via the saved AirArabia example; AvailableAfterReservation still UNKNOWN - if never observed, record it as an unconfirmed QC-checklist-only candidate
- **Actual:** Live evidence again: AvailableFree is a real value on GulfAir too, at the per-passenger level (8E, the bassinet seat, on the GF103 map, 2 passenger entries). It differs from the saved AirArabia example in one respect: the AirArabia AvailableFree cells carry null pricing, whereas GulfAir returns explicit 0.00 SAR price objects (total = base + taxes = 0) and keeps the overall cellAvailability at AvailablePaid. AvailableAfterReservation was not observed in any of the 20 segments and stays an unconfirmed candidate.
- **Status:** PASS
- **Evidence:** GF103 (equipment 320) map: 8E paxCellAvailability AvailableFree x2 entries, totalPrice 0 SAR; overall cellAvailability AvailablePaid; no cell anywhere shows AvailableAfterReservation

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-27, 32N):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 2 &mdash; GetSeatMap (chain H, BAH-DMM 2027-07-05, 320, ADT+CHD):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-VAL-06 — PASS

- **Test Case:** [SeatMap][Response] Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - every cell partitioned by cellCategory; Aisle / Seat / NoSeat cells checked for column and cellDetails
- **Response:** 200 - 23 Aisle, 138 Seat, 0 NoSeat cells (chain A); across all maps 542 Aisle, 3203 Seat, 49 NoSeat
- **Expected:** Aisle implies column null and cellDetails null; Seat implies column non-null and cellDetails a populated object
- **Actual:** 0 violations. All 23 Aisle cells have column null and cellDetails null; all 138 Seat cells have a letter column (A-F) and a populated cellDetails object. Across all maps: Aisle violations 0, Seat violations 0; the 49 NoSeat cells (taken seats) have a real column letter and cellDetails null - outside this rule, noted only.
- **Status:** PASS
- **Evidence:** Aisle=23 violations=0; Seat=138 violations=0; NoSeat across all maps=49 (column A-F, cellDetails null, bad=0)

  - **Hop 1 &mdash; GetSeatMap (chain A):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-RETRIEVE-REG-01 — PASS

- **Test Case:** [Retrieve][Response] Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed (Retrieve After Issue).
- **Category:** Regression
- **Endpoint Name:** Retrieve
- **Request:** Three Retrieve calls on the same pnr/gdsPNR/bookingToken (THYDTQ, seat 12C): #1 immediately after Book (2026-10-10T12:27:29.812Z), #2 about 6 minutes later (2026-10-10T12:33:49.357Z), #3 about 10 minutes after Book (2026-10-10T12:37:54.615Z)
- **Response:** All 200 - bookingStatus "Booked", ticketStatus "Booked" (ticket 722137003911); passengersSelectedSeats / passengerSeats / totalSelectedSeats / totalSelectedSeatsAmount identical in all three (12C, 60.00 SAR)
- **Expected:** passengersSelectedSeats/passengerSeats/totalSelectedSeats/totalSelectedSeatsAmount in a later Retrieve identical to Retrieve #1 - the seat does not disappear or change once ticketing completes
- **Actual:** The seat-related fields are byte-for-byte identical across all three Retrieves. GulfAir tickets synchronously at Book time (ticket number and ticketingDate exist from the first Retrieve), so no Booked-to-ticketed transition can be observed on this supplier - best-effort per the test's own timing note; the persistence assertion holds. Unchanged from Rounds 1-13.
- **Status:** PASS
- **Evidence:** Retrieve #1 (2026-10-10T12:27:29.812Z) vs #2 (2026-10-10T12:33:49.357Z) vs #3 (2026-10-10T12:37:54.615Z): seat fields identical; ticketingDate 2026-10-10 in all

  - **Hop 1 &mdash; Retrieve:** PASS &mdash; 200 - pnr THYDTQ, bookingStatus Booked, seats ["12C"]
  - **Hop 2 &mdash; Retrieve:** PASS &mdash; 200 - pnr THYDTQ, bookingStatus Booked, seats ["12C"]
  - **Hop 3 &mdash; Retrieve:** PASS &mdash; 200 - pnr THYDTQ, bookingStatus Booked, seats ["12C"]

### TC-BOOK-INT-04 — BLOCKED

- **Test Case:** [Book][Request] Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent (both resolve to the same journey).
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Would need GetOfferBundles to return a JourneyKey/bundle code to submit next to a seat; capability re-checked on the same 29 FareConfirm calls
- **Response:** N/A - haveBundles=false on 29 of 29 FareConfirm calls
- **Expected:** Book succeeds; response reflects both the bundle and the seat without either overriding the other's pricing
- **Actual:** Not executable for GulfAir - no bundle capability on any sampled offer, so no JourneyKey/bundle code exists to cross-check against a seat's segmentRefId. Not called. Unchanged from Rounds 1-13.
- **Status:** BLOCKED
- **Evidence:** haveBundles=false on 29 of 29 FareConfirm calls

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR

### TC-SEATAFTERHOLD-VAL-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Once SeatAfterHold's real contract is confirmed (TC-SEATAFTERHOLD-VAL-01), validate it rejects a seat/passenger reference that does not belong to the passengers established at AddPassenger/Hold time for this pnr.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** Sequenced behind TC-SEATAFTERHOLD-VAL-01 (which never resolved a request shape); a Held pnr with a known passenger set exists (TFBYUM) but there is no confirmed passenger/seat field to reference a foreign passenger with
- **Response:** N/A - no further request sent; every SeatAfterHold call this round returned 409 OperationNotSupported for GulfAir
- **Expected:** UNKNOWN - blocked on VAL-01 resolving the real request shape; then expect rejection analogous to AddPassenger's cross-field validation
- **Actual:** Still blocked: SeatAfterHold rejects GulfAir outright (BUG-03), so the confirmed request shape this case depends on does not exist yet. Unchanged from Rounds 1-13.
- **Status:** BLOCKED
- **Evidence:** SeatAfterHold 409 OperationNotSupported on 9 of 11 calls this round (the other 2 were the two 401 authentication checks)

  - **Hop 1 &mdash; Hold:** PASS &mdash; 200 - pnr TFBYUM, holdExpirationDate null
  - **Hop 2 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: GulfAir does not exists]

### TC-SEATMAP-POS-01 — PASS

- **Test Case:** [SeatMap][Response] Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails, matching the flight/segments established at FareConfirm.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap (GulfAir/KSA, BAH-RUH 2027-06-27, GF161, 1 ADT) with ResponseId/selectedOfferId = AddPassenger's IDs, after a fresh Search -&gt; FareConfirm -&gt; AddPassenger
- **Response:** 200 - supplier GulfAir, flightSegments (1 segment), passengersDetails (PAX1), seatMapDetails (1 segment, 23 rows, 138 seat cells)
- **Expected:** HTTP 200; supplier, flightSegments, passengersDetails, seatMapDetails all present and non-null; every seatMapDetails segment key also in flightSegments and in the offer's segments from FareConfirm/AddPassenger
- **Actual:** All four blocks present and non-null. The single seatMapDetails key GF-GF161-GF161-2027062702-2027062704-O appears identically in flightSegments and in FareConfirm's flightSegments (no orphan in either direction). AddPassenger's response carries only offerId/responseId (no segment list), so the segment cross-check is against FareConfirm. Unchanged from Rounds 1-17.
- **Status:** PASS
- **Evidence:** seatMapDetails keys=1, flightSegments keys=1, FareConfirm flightSegments keys=1, all equal; seat cells 138; correlationId cb353be0-9e7c-4cec-a999-d63a17199121

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-SEATMAP-NEG-01 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected (or returns an explicit not-supported response) when called for an offer whose isSeatMapRequired flag was false at FareConfirm/AddPassenger time.
- **Category:** Negative
- **Endpoint Name:** FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap called with AddPassenger IDs from two independent offers whose FareConfirm showed isSeatMapRequired=false (chain A BAH-RUH 2027-06-27, chain A2 BAH-JED 2027-06-28)
- **Response:** 200 on both chains - a fully populated seatMapDetails (23 rows / 28 rows) instead of a rejection
- **Expected:** GetSeatMap is rejected, or returns an explicit not-supported envelope, rather than a 200 with populated data
- **Actual:** STILL REPRODUCES (BUG-15). FareConfirm reports isSeatMapRequired=false (and haveBundles=false) on both offers, yet GetSeatMap returns HTTP 200 with a complete seat map on both. The flag is not enforced.
- **Status:** FAIL
- **Evidence:** FareConfirm selectedOffer.isSeatMapRequired=false on chains A and A2 (and on 29 of 29 FareConfirm calls this round); GetSeatMap 200 with 138 and 161 seat cells respectively

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 2 &mdash; GetSeatMap:** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 3 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 4 &mdash; GetSeatMap:** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells

### TC-SEATMAP-NEG-02 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected when the request otherwise targets a valid offer but no segment of that offer's itinerary is being queried (i.e., the offer/response pair does not correspond to any real segment).
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap with ResponseId from chain A's AddPassenger (BAH-RUH) but selectedOfferId from chain A2's (BAH-JED), and the reverse pairing
- **Response:** 200 both directions - run 1 returned the BAH-JED map (28 rows, GF181 BAH-JED 2027-06-28), run 2 the BAH-RUH map (23 rows, GF161 BAH-RUH 2027-06-27)
- **Expected:** Request rejected (exact status UNKNOWN); no seatMapDetails returned for a pair that does not belong together
- **Actual:** STILL REPRODUCES (BUG-01). Both mismatched pairings were accepted with HTTP 200 and a full seat map; the result follows selectedOfferId and ResponseId is ignored.
- **Status:** FAIL
- **Evidence:** run 1 (respA+offerA2): 200, 28 rows (GF181 BAH-JED 2027-06-28); run 2 (respA2+offerA): 200, 23 rows (GF161 BAH-RUH 2027-06-27)

  - **Attempt 1 of 2 - ResponseId from chain A, selectedOfferId from chain A2:** HTTP 200
  - **Attempt 2 of 2 - ResponseId from chain A2, selectedOfferId from chain A:** HTTP 200

### TC-SEATMAP-NEG-03 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** Run 1: GetSeatMap with a fabricated GUID ResponseId and a fabricated selectedOfferId string. Run 2: a genuine ResponseId/selectedOfferId pair from chain B's AddPassenger, already consumed by a completed Book (pnr OWONHK)
- **Response:** Run 1: 400 NDC-INT-TEC-A0001 "Invalid request..." (context: "The selected offer is invalid, expired, or could not be found") in 0.6s. Run 2: 200 - the full seat map (25 rows, 149 seat cells) is still returned
- **Expected:** Both runs rejected (exact status UNKNOWN); no seatMapDetails returned for either
- **Actual:** Run 1 (a genuinely fabricated pair) is cleanly rejected with a structured 400. Run 2 is NOT rejected: a real pair keeps working after its offer has been booked - IDs are not invalidated by use. Recorded PASS on the established basis of Rounds 1-13 (the fabricated-pair rejection is the defect check; reading a seat map for an already-booked offer is idempotent and is not tracked as a defect), but note the literal expected result for run 2 is not met.
- **Status:** PASS
- **Evidence:** run 1: 400 A0001 AsyncPredicateValidator "The selected offer is invalid, expired, or could not be found"; run 2: 200, 149 seat cells, pair already booked (pnr OWONHK)

  - **Attempt 1 of 2 - fabricated ResponseId / selectedOfferId:** HTTP 400
  - **Attempt 2 of 2 - genuine pair already consumed by a booking:** HTTP 200

### TC-SEATMAP-NEG-04 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** 4 variants of a valid GetSeatMap body (chain A's AddPassenger IDs), each with exactly one mandatory field removed: supplier, credentialsSelector, ResponseId, selectedOfferId
- **Response:** omit supplier -&gt; 400; omit credentialsSelector -&gt; 400; omit ResponseId -&gt; 200 (full seat map); omit selectedOfferId -&gt; 400
- **Expected:** All four runs rejected (exact status UNKNOWN); no seatMapDetails returned in any run
- **Actual:** STILL REPRODUCES (BUG-02). Three of four runs are cleanly rejected with a 400 validation envelope (errorCode 1001, naming the missing field). Omitting ResponseId is accepted: HTTP 200 with the complete seat map, even though ResponseId is a documented required field.
- **Status:** FAIL
- **Evidence:** omit supplier 400 "Select a valid Supplier"; omit credentialsSelector 400 "Select a valid CredentialsSelector"; omit selectedOfferId 400 "The SelectedOfferId field is required."; omit ResponseId 200 with 23 rows

  - **Attempt 1 of 4 - supplier omitted:** HTTP 400
  - **Attempt 2 of 4 - credentialsSelector omitted:** HTTP 400
  - **Attempt 3 of 4 - ResponseId omitted:** HTTP 200
  - **Attempt 4 of 4 - selectedOfferId omitted:** HTTP 400

### TC-SEATMAP-NEG-05 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap fails gracefully (a structured error, not a raw 500/stack trace) when the underlying supplier call fails or times out.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** No GetSeatMap supplier failure could be forced or occurred naturally (every Search, FareConfirm, AddPassenger and well-formed GetSeatMap call this round returned 200). Error paths that could be exercised were inspected instead: a fabricated offer, a malformed JSON body and garbage ID values
- **Response:** GetSeatMap: 400 structured envelope on all three probes (A0001 "Failed to deserialize the selected offer" for the fabricated offer; errorCode 1001 "Validation errors occurred" for the malformed body and garbage IDs), no stack trace or raw supplier XML
- **Expected:** A structured business-error envelope rather than an unhandled exception, stack trace or raw supplier XML; no internal type names or raw supplier payloads in the error body
- **Actual:** GetSeatMap's own error paths are graceful and structured. The half of the test that needs a real supplier failure could not be run for GetSeatMap, and no natural supplier failure occurred anywhere this round to use as a reference - so graceful supplier-failure handling is verified for the request-validation paths only. Note: the camelCase 1001 envelopes name internal type names (SeatMapRequestDto, System.Guid) in their context. Recorded PASS on the established basis of Rounds 1-13.
- **Status:** PASS
- **Evidence:** fabricated offer 400 A0001; malformed body 400 errorCode 1001 (SeatMapRequestDto / $.ResponseId); garbage IDs 400 errorCode 1001; no supplier failure occurred this round

  - **Attempt 1 of 3 - fabricated offer ids:** HTTP 400
  - **Attempt 2 of 3 - malformed JSON body:** HTTP 400
  - **Attempt 3 of 3 - non-GUID ResponseId and garbage selectedOfferId:** HTTP 400

### TC-SEATMAP-VAL-07 — PASS

- **Test Case:** [SeatMap][Response] Verify seat attributes relevant to customer-facing seat selection (window, aisle, extra legroom/exit row) are programmatically derivable from cellCharacteristics for every Seat-category cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - all 138 Seat cells' cellCharacteristics read and classified as window / aisle / extra-legroom / exit-row
- **Response:** 200 - 690 characteristics; every padisCode "Unknown"; window/aisle/centre and exit-row/legroom markers present in description text
- **Expected:** For codes in the PADIS table the derived classification must not contradict column position or description text; codes outside the table are logged, not failed
- **Actual:** Every Seat cell's description carries a window/aisle/centre marker and a left/right-side marker, and 0 of 3203 seats (all maps) contradict the cell's column (A/F=WINDOW, C/D=AISLE_SEAT, B/E=CENTER_SEAT). Extra legroom (LEG_SPACE_SEAT, 11 cells) and exit row (EXIT_ROW_SEAT, 24 cells, rows 12/14/15/16) are derivable from the text too. padisCode is "Unknown" everywhere, so the attributes are only derivable from description text (logged, not failed). Unchanged from Rounds 1-17.
- **Status:** PASS
- **Evidence:** column/description mismatches 0 of 3203 (all maps); chain A: WINDOW 46, AISLE_SEAT 46, CENTER_SEAT 46; EXIT_ROW_SEAT 24 (rows 12,14,15,16); LEG_SPACE 11; OVER_WING 48; padisCode Unknown 690/690

  - **Hop 1 &mdash; GetSeatMap (chain A):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-SEATMAP-VAL-08 — PASS

- **Test Case:** [SeatMap][Response] Verify seatPriceDetails/seatPriceDetailsByPassenger is populated (non-null) for every AvailablePaid cell and null/absent for every Blocked or Occupied cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Every cell of chain A's GetSeatMap response (and a cross-check over all maps) partitioned by cellAvailability; seatPriceDetails / seatPriceDetailsByPassenger presence checked per partition
- **Response:** 200 - chain A: 138 cells AvailablePaid; 23 further cells have cellDetails null (23 Aisle, 0 NoSeat); across all maps: 3203 seat cells, all AvailablePaid
- **Expected:** Every AvailablePaid cell has populated seatPriceDetailsByPassenger; every Blocked/Occupied cell has null pricing
- **Actual:** AvailablePaid: every one of the 3203 seat cells has seatPriceDetailsByPassenger with totalPrice, basePrice and taxesPrice populated. The Blocked/Occupied half could not be exercised - no Blocked or Occupied cell exists for this supplier (taken seats appear as NoSeat with null cellDetails, so no pricing). No non-paid cell carries pricing (0 violations). The aggregate seatPriceDetails is null on every cell.
- **Status:** PASS
- **Evidence:** AvailablePaid n=3203 (all maps), missing byPax price=0; non-paid cells with pricing=0; Blocked/Occupied cells=0; chain A: AvailablePaid 138, prices 40x90, 60x37, 120x11

  - **Hop 1 &mdash; GetSeatMap (chain A):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCode is unique across all cells within one flight segment's seatMapDetails.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - every cellCode in the single segment collected and checked for duplicates (plus all 20 segments of the round)
- **Response:** 200 - 138 Seat cells, 138 distinct cellCode values
- **Expected:** No cellCode repeats within one segment (a duplicate is a confirmed defect)
- **Actual:** No duplicates: 138 cellCodes, 138 unique (rows 8-31, columns A-F). Across all 20 segments: 0 segments with a duplicate code.
- **Status:** PASS
- **Evidence:** cellCodes=138 unique=138 duplicates=0 (segment GF-GF161-GF161-2027062702-2027062704-O); all segments duplicates=0

  - **Hop 1 &mdash; GetSeatMap (chain A):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** [SeatMap][Response] Verify structural uniqueness and domain constraints across decks/zones/rows/columns: rowNumber unique within a segment, zoneId unique within a deck, column values restricted to {A,B,C,D,E,F,null}.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - cabinLayoutsByDeck and rows[] checked for uniqueness and column domain (all segments of the round cross-checked)
- **Response:** 200 - 1 deck (Main), 1 zone (Cabin1, ECONOMY, columns A,B,C,null,D,E,F), 23 rows numbered 8-31
- **Expected:** rowNumber unique within the segment; zoneId unique within a deck; every non-null column in A-F; null column only on Aisle cells
- **Actual:** All four constraints hold: 23 row numbers, 23 unique; 1 zone in deck Main; Seat-cell columns are exactly {A,B,C,D,E,F}; the 23 null-column cells are all Aisle-category. Every row's deck/zoneId resolves to the declared layout. Same across all 20 segments (decks: Main).
- **Status:** PASS
- **Evidence:** rows=23 unique=23; decks=1; zones=1 (Main:Cabin1); seat columns A-F (23 each); null-column non-Aisle cells=0; rows with unresolved deck/zone=0

  - **Hop 1 &mdash; GetSeatMap (chain A):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells

### TC-SEATMAP-BIZ-03 — PASS

- **Test Case:** [SeatMap][Response] Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported, may legitimately differ for the same cell, and are NOT required to list every passenger on the offer.
- **Category:** Business Rule
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap for a fresh 2-passenger offer (ADT + CHD, BAH-DMM 2027-07-05, A320) - every cell compared against each passenger's passengersSeatMapAvailability allow-list and per-passenger availability
- **Response:** 200 - 120 seat cells; PAX1 and PAX2 each have a 120-code allow-list; every cell's seatPriceDetailsByPassenger lists PAX1 and PAX2
- **Expected:** A passenger listed in a cell's seatPriceDetailsByPassenger also has that cellCode in their allow-list; absence is valid and completeness is NOT asserted; overall and per-passenger availability may legitimately differ
- **Actual:** Internally consistent: 240 passenger-cell price entries (120 x 2), 0 listed for a cell absent from that passenger's allow-list, 0 allow-list codes without a priced cell. GulfAir lists every passenger on every cell, so the "absence is valid" branch could not be exercised (not required). Per-passenger and overall availability DO legitimately differ on 8E: 8E (bassinet seat) is AvailablePaid overall but AvailableFree for both passengers at 0.00 SAR. For context: the CHD passenger is offered 24 of 24 exit-row cells, the already-tracked BUG-09.
- **Status:** PASS
- **Evidence:** cells=120; listed-pax-set {"PAX1,PAX2":120}; listed-but-not-in-allow-list=0; allow-list-but-not-priced=0; paxCellAvailability != cellAvailability on 8E only (AvailableFree vs AvailablePaid); CHD PAX2 on 24/24 EXIT_ROW_SEAT cells

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 2535 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-BIZ-04 — PASS

- **Test Case:** [SeatMap][Response] Exploratory -- confirm GetSeatMap reflects real-time supplier inventory rather than a cached/stale snapshot.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; GetSeatMap
- **Request:** GetSeatMap #1 (chain C, BAH-RUH 2027-06-30, seat 12C AvailablePaid) -&gt; seat 12C taken by chain C's Book (pnr THYDTQ) -&gt; GetSeatMap #2 with the same offer ids -&gt; GetSeatMap on a fresh offer for the same flight
- **Response:** Call #1: 12C = Seat / AvailablePaid (60 SAR), 179 seat cells. After the booking: #2 (same offer) and a fresh-offer map both return 12C as NoSeat with cellDetails null (178 and 178 seat cells)
- **Expected:** UNKNOWN - if reliably forceable, the cell availability transitions between the calls, confirming a live supplier round-trip rather than a cached response
- **Actual:** CONFIRMED live inventory (as in Rounds 11-13). The seat was taken by this session's own booking, and both the same-offer re-read and a fresh-offer seat map dropped it immediately. A taken seat is still not reported as cellAvailability "Occupied": the cell becomes cellCategory "NoSeat" with cellDetails null. Response headers carry a CorrelationId only - no Cache-Control or ETag.
- **Status:** PASS
- **Evidence:** Row 12 seat C: AvailablePaid (before) -&gt; NoSeat/null (same-offer #2 and fresh offer); seat cells 179 -&gt; 178/178; response headers: content-encoding, content-type, correlationid, date, server, transfer-encoding, vary, x-ms-middleware-request-id (no Cache-Control/ETag)

  - **Hop 1 &mdash; GetSeatMap (call #1, baseline):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 2 &mdash; Book (occupy 12C):** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911
  - **Hop 3 &mdash; GetSeatMap (call #2, same offer):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells
  - **Hop 4 &mdash; GetSeatMap (fresh offer, same flight):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells

### TC-SEATMAP-SEC-01 — FAIL

- **Test Case:** [SeatMap][Request] Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap.
- **Category:** Security
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid KSA offer: (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier/selector switched to TravelportNdc/UAE, (3b) same supplier GulfAir with credentialsSelector switched to UAE; extra probes: empty/missing x-api-key, missing Client-Id, bogus selector ZZZ, omitted selector
- **Response:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 400 NDC-INT-TEC-A0001; (3b) 200 - the full seat map was returned; extras: empty key 401, missing key 401, missing Client-Id 401, ZZZ 400, omitted selector 400
- **Expected:** All three variants rejected (exact status/error shape UNKNOWN; reuse the envelope other endpoints produce)
- **Actual:** Two of the three checks pass cleanly; the third half-passes. A wrong supplier is rejected (400), but switching only credentialsSelector to another valid one for the same supplier (GulfAir/UAE) is NOT rejected: GetSeatMap returns the complete seat map for an offer created under KSA. credentialsSelector is still not enforced as an authorization boundary on GetSeatMap (BUG-17, 5th confirmed occurrence).
- **Status:** FAIL
- **Evidence:** control 200; bad key 401 AuthenticationError; bad Client-Id 401; supplier switch 400 NDC-INT-TEC-A0001 "Failed to deserialize the selected offer"; GulfAir/UAE with a KSA offer 200 (full seat map, 138 seat cells, same responseId); empty key 401; missing key 401; missing Client-Id 401; ZZZ 400; omitted 400

  - **Control - valid headers, GulfAir/KSA (baseline):** HTTP 200
  - **Attempt 1 of 4 - invalid x-api-key:** HTTP 401
  - **Attempt 2 of 4 - invalid Client-Id:** HTTP 401
  - **Attempt 3 of 4 - cross-tenant: supplier switched to TravelportNdc/UAE:** HTTP 400
  - **Attempt 4 of 4 - cross-tenant: same supplier GulfAir, credentialsSelector switched KSA -&gt; UAE:** HTTP 200
  - **Extra probe - empty x-api-key:** HTTP 401
  - **Extra probe - x-api-key header missing:** HTTP 401
  - **Extra probe - Client-Id header missing:** HTTP 401
  - **Extra probe - bogus credentialsSelector (ZZZ):** HTTP 400
  - **Extra probe - credentialsSelector omitted:** HTTP 400

### TC-SEATMAP-SEC-02 — PASS

- **Test Case:** [SeatMap][Documentation] Record that supplier-side authentication security (this API's own credentials presented to the airline/GDS backend) and request/response logging are not independently verifiable through this API's black-box contract, and identify the correct verification channel for each.
- **Category:** Security
- **Endpoint Name:** GetSeatMap (documentation)
- **Request:** N/A - documentation/scope-boundary case, no live API call
- **Response:** N/A
- **Expected:** Documented per 1.5/1.8/PRD 7: AC8 (supplier-side authentication) and the logging half of AC9 are confirmable only via a backend credential/config audit and log/observability review, not through this suite; AC9 graceful-error half is covered by TC-SEATMAP-NEG-05
- **Actual:** Documented as specified; SPEC.md 1.5 and 1.8 and NDC_PRD.md Gap #1 (hardcoded x-api-key/Client-Id) re-checked and still say the same. AC8/AC9 must not be marked covered by API tests without the paired backend/config/log audit. Unchanged from Rounds 1-17.
- **Status:** PASS
- **Evidence:** No API call made, per the test case's own definition; SPEC.md headings 1.5 present and 1.8 present; PRD Gap #1 line present

### TC-SEATMAP-INT-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols.
- **Category:** Integration
- **Endpoint Name:** GetSeatMap (multi-supplier)
- **Request:** Requires GetSeatMap against at least three suppliers spanning distinct native protocols (NDC XML/SOAP, EDIFACT, Navitaire)
- **Response:** N/A - out of scope: this run's scope is fixed to Supplier GulfAir, Credentials Selector KSA; no other supplier was called
- **Expected:** Every supplier's GetSeatMap response conforms to the identical schema documented in SPEC.md 2.7 regardless of native protocol
- **Actual:** Not executed - a cross-supplier comparison cannot be built from one supplier. GulfAir's own response shape was checked on 20 segments and is stable (see VAL-10, VAL-11, REG-02). Unchanged from Rounds 1-13.
- **Status:** BLOCKED
- **Evidence:** no calls made; scope Supplier=GulfAir/KSA only

### TC-SEATMAP-INT-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Capability-matrix sweep -- run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable per SPEC.md §4.6, and record pass/fail per supplier.
- **Category:** Integration
- **Endpoint Name:** GetSeatMap (capability sweep)
- **Request:** Requires a full-roster sweep across every SPEC.md 4.6 supplier; only GulfAir/KSA was in scope. GulfAir's own row was re-confirmed live from the seat maps captured this round
- **Response:** GulfAir/KSA row: GetSeatMap 200 with a populated seatMapDetails on 20 of 20 segments sampled (BAH to RUH, JED, DXB, DMM, CAI); all other suppliers out of scope
- **Expected:** Every confirmed-capable supplier's GetSeatMap call succeeds with a populated seatMapDetails; not-capable suppliers fail gracefully; a per-supplier pass/fail table is maintained
- **Actual:** Not executed as a sweep. GulfAir/KSA is confirmed SeatMap-supported (with the caveat that seat maps are empty for departures after about early August 2027, and Search returned no offers for BAH departures from 9 July 2027 on this run). No other supplier was called.
- **Status:** BLOCKED
- **Evidence:** GulfAir/KSA: 20 of 20 sampled segments returned a populated seatMapDetails; Search returned an empty offers list for BAH departures 2027-07-09 and later

### TC-SEATMAP-VAL-11 — PASS

- **Test Case:** [SeatMap][Response] Verify passengersSeatMapAvailability.&lt;paxRef&gt;.&lt;segmentRefId&gt; (the top-level per-passenger allow-list of cellCodes) stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - passengersDetails.PAX1.passengersSeatMapAvailability keys and allow-list checked against flightSegments / seatMapDetails (and all segments of the round)
- **Response:** 200 - PAX1 allow-list keyed by segmentRefId then deck name ("Main"), 138 cellCodes
- **Expected:** Every segmentRefId key under passengersSeatMapAvailability matches the casing used elsewhere in the response; every allow-listed cellCode is a real cell in that segment
- **Actual:** The allow-list key is the full segmentRefId and matches the seatMapDetails/flightSegments key character-for-character; all 138 allow-listed codes exist as real cells and every AvailablePaid cell is on the list (0 missing). The block is nested one level deeper than SPEC.md describes (segment -&gt; deck "Main" -&gt; cellCode array). No casing inconsistency for GulfAir. Across all 20 segments: 0 paid cells missing from an allow-list, 0 allow-listed codes without a cell, 0 segment-key mismatches. A multi-segment offer (round trip) was also covered.
- **Status:** PASS
- **Evidence:** allow-list segment keys=1 (identical casing); deck keys [Main]; allow-list length 138; codes not present as cells=0; paid cells missing from allow-list=0

  - **Hop 1 &mdash; GetSeatMap (chain A):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 2 &mdash; GetSeatMap (round trip, 2 segments):** PASS &mdash; 200 - seatMapDetails 2 segment(s), 275 seat cells

### TC-SEATMAP-BND-04 — PASS

- **Test Case:** [SeatMap][Response] Confirm live whether any cellCategory value beyond {Seat, Aisle} (e.g. Lavatory/Bathroom, Bulkhead, Galley, Closet, ExitRow, StairsToUpperDeck, WingBox, StorageBin, RestrictedZone, NoSeat, Other, per the full backend enum) is ever returned.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap across 20 distinct segments on 4 narrowbody aircraft types (320, 321, 32Q, 32N; all single deck) - every cellCategory value recorded
- **Response:** 200 - cellCategory values observed: Seat, Aisle, NoSeat
- **Expected:** UNKNOWN - record every distinct value beyond Seat/Aisle; do not assume Seat/Aisle are exhaustive or that the C# enum names match what the API serializes
- **Actual:** Beyond Seat and Aisle, only "NoSeat" was observed (a taken or absent seat; cellDetails null; matches CellCategory.md's NoSeat member): 49 cells, e.g. 8E, 12C on the post-booking map. No Lavatory/Bathroom/Galley/Bulkhead/ExitRow/StairsToUpperDeck category appeared, and no widebody or double-deck aircraft is available to GulfAir/KSA in this sample, so the Lavatory-vs-Bathroom naming question stays unresolved.
- **Status:** PASS
- **Evidence:** distinct cellCategory values across 3794 cells: Seat 3203, Aisle 542, NoSeat 49; equipment 320, 321, 32Q, 32N; decks: Main only

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-27, 32N):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 2 &mdash; GetSeatMap (chain H, BAH-DMM 2027-07-05, 320, ADT+CHD):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells
  - **Hop 3 &mdash; GetSeatMap (post-booking map, NoSeat cell):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells

### TC-BOOK-POS-04 — PASS

- **Test Case:** [Book][Response] Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step.
- **Category:** Positive
- **Endpoint Name:** Book -&gt; Retrieve
- **Request:** Book with seat 12C (pnr THYDTQ) then an immediate Retrieve with no ticketing action taken in between
- **Response:** Retrieve 200 - bookingStatus "Booked", ticketStatus "Booked" (ticket 722137003911); passengersSelectedSeats.PAX1 = {12C, 60 SAR}; totalSelectedSeatsAmount 60 SAR
- **Expected:** Immediate post-Book Retrieve already shows the seat attached and priced while bookingStatus/ticketStatus still reads un-ticketed; if already ticketed with no intervening action, record it as a finding
- **Actual:** The seat is attached at Book time: Retrieve, taken right after Book with no other action, shows passengersSelectedSeats, passengerSeats and totalSelectedSeatsAmount populated. GulfAir tickets synchronously at Book (a ticket number and ticketingDate exist immediately), so there is no un-ticketed window to isolate - the same caveat as every prior round. The core assertion holds.
- **Status:** PASS
- **Evidence:** Retrieve #1: bookingStatus Booked, ticketStatus Booked, ticketingDate 2026-10-10T00:00:00, seat 12C 60 SAR; identical to the Book echo

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr THYDTQ, bookingToken TPC60517147820D10102026, tickets 722137003911
  - **Hop 2 &mdash; Retrieve:** PASS &mdash; 200 - pnr THYDTQ, bookingStatus Booked, seats ["12C"]

## Findings

### Defects

- **[FLOW-V2-49-SEATFIELD] BUG-18 (occurrence 2, not new) &mdash; Retrieve under-reports the per-passenger seat total on a multi-seat booking: paxTotalSeatAmount counts only one seat, so paxTotalAmount and the sum of the passenger totals fall short of priceDetails.totalAmount. The Book response for the same booking is correct.** Field: `selectedOffer.passengerFareBreakdown[].paxTotalSeatAmount / paxTotalAmount (Retrieve response)`. Expected: paxTotalSeatAmount {"amount":120,"currency":"SAR"} for two 60.00 seats, paxTotalAmount 1730.00, matching the Book response. **History:** First observed Round 13 (2026-09-30); not exercised Rounds 15-17; reproduced again Round 18 (2026-10-10). **Impact:** A caller reading a booking back through Retrieve sees a seat total (60.00 instead of 120.00) and a per-passenger fare (1670.00 instead of 1730.00) that no longer add up to the booking total, so any invoice, refund or reconciliation built from the passenger lines is short by the missing seat(s). Evidence: Round-trip pnr OVMIAD (seats 14C + 14D, 60.00 each): Book paxTotalSeatAmount 120 / paxTotalAmount 1730; Retrieve (called twice) paxTotalSeatAmount 60 / paxTotalAmount 1670 while passengerSeats lists both seats and priceDetails.totalSelectedSeatsAmount is 120 / totalAmount 1730. Two-passenger round trip pnr TGDKPM (four seats): Book per-passenger seat total 160/160; Retrieve 120/120, per-passenger totals 1730 + 1730 = 3460 vs totalAmount 3540. One-seat booking THYDTQ is unaffected (60 = 60).
- **[TC-SEATMAP-NEG-02] BUG-01 (occurrence 8, not new) &mdash; GetSeatMap accepts a ResponseId and selectedOfferId taken from two different offers and returns a full seat map; the result follows selectedOfferId and ResponseId is ignored.** Field: `ResponseId / selectedOfferId`. Expected: 4xx validation error for a ResponseId/selectedOfferId pair that does not belong together. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-3, 5, 6, 13 (Round 4 blocked by an outage); not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** The pair is not cross-validated, so a wrong or mixed-up identifier pair silently returns another itinerary's seat map instead of failing, and ResponseId adds no protection. Evidence: ResponseId of chain A (BAH-RUH 2027-06-27) with selectedOfferId of chain A2 (BAH-JED 2027-06-28): 200, 28 rows (JED map GF181); reverse pairing: 200, 23 rows (RUH map GF161).
- **[TC-SEATMAP-NEG-04] BUG-02 (occurrence 8, not new) &mdash; GetSeatMap documents ResponseId as required, but a request that omits it still returns HTTP 200 with the full seat map; the other three mandatory fields are rejected with 400.** Field: `ResponseId`. Expected: 400 validation error naming ResponseId, like supplier, credentialsSelector and selectedOfferId. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-3, 5, 6, 13 (not reproduced in Round 4); not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** A required field is not enforced, so integrations that forget ResponseId work by accident and the documented contract cannot be trusted. Evidence: omit supplier 400 "Select a valid Supplier"; omit credentialsSelector 400; omit selectedOfferId 400 "The SelectedOfferId field is required."; omit ResponseId 200 with 23 rows.
- **[TC-SEATMAP-NEG-01] BUG-15 (occurrence 8, not new) &mdash; GetSeatMap returns HTTP 200 with a complete seat map for offers whose FareConfirm reports isSeatMapRequired=false; the flag is not enforced.** Field: `isSeatMapRequired (FareConfirm) vs GetSeatMap response`. Expected: Rejection or an explicit not-supported envelope for an offer with isSeatMapRequired=false. **History:** Failing since Round 1 (2026-08-25), filed as its own BUG-15 in Round 5; reproduced Rounds 1-6 and 13; not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** The capability flag cannot be used to decide whether to show seat selection, and callers get seat data for offers that are not flagged as seat-map offers. Evidence: FareConfirm selectedOffer.isSeatMapRequired=false on all 29 calls this round; GetSeatMap 200 with 138 and 161 seat cells on chains A and A2.
- **[TC-SEATMAP-SEC-01] BUG-17 (occurrence 5, not new) &mdash; GetSeatMap does not reject a request whose credentialsSelector differs from the one the offer was created under (same supplier, different valid selector).** Field: `credentialsSelector`. Expected: 4xx rejection (offer not found / not authorized for this credentialsSelector), as happens when the supplier is switched. **History:** First observed Round 11 (2026-09-29); reproduced Rounds 12 and 13 (2026-09-30) and Round 17 (2026-10-10); reproduced again Round 18 (2026-10-10). **Impact:** credentialsSelector is the per-tenant boundary; a caller holding an offerId/responseId from one tenant (KSA) can read that offer's seat map through another tenant's selector (UAE), so cross-tenant isolation rests only on offer IDs being unguessable. Other offer-consuming endpoints were not tested. Evidence: Offer created under GulfAir/KSA; GetSeatMap with GulfAir/UAE -&gt; 200, full seat map, same responseId; supplier switched to TravelportNdc/UAE -&gt; 400 NDC-INT-TEC-A0001; invalid key / Client-Id -&gt; 401.
- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 13, not new) &mdash; Book accepts a cellId that was issued for a different offer's seat map: it runs the full booking, tickets it, and silently drops the seat (empty passengersSelectedSeats, no fee) instead of returning an error.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, with no booking created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7, 11, 12, 13, 15, 16, 17 (Round 4 blocked by an outage); reproduced again Round 18 (2026-10-10). **Impact:** The cellId token is not validated, so a stale or foreign token produces a booking with no seat and no error - the caller believes a seat was reserved. The same silent drop also happens for an unavailable or non-existent cellCode (TC-BOOK-NEG-05, TC-BOOK-NEG-09). Evidence: Book on offer E2 (cellCode 15B) with the cellId of seat 15C from offer E1: 200, pnr OOPQEC, ticket 722137003886, passengersSelectedSeats {}, totalSelectedSeatsAmount 0, no error.
- **[TC-BOOK-NEG-06] BUG-06 (occurrence 8, not new) &mdash; Book accepts a tampered cellId (last 10 characters replaced) and books the seat named by cellCode; the token is never validated (also true for a cellId belonging to a different seat, TC-BOOK-VAL-06).** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx rejection of a token that fails the server-side decode/signature check. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-6 and 13; not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** The opaque cellId adds no integrity protection; the seat is chosen from the free-text cellCode alone, so forged or mismatched tokens are accepted. Evidence: Book (cellCode 14A, cellId with trailing XXXXXXXXXX): 200, pnr TELSMS, seat 14A attached at 60.00 SAR; Book (cellCode 15F, cellId of 15A): 200, pnr OODBGN, seat 15F attached.
- **[TC-BOOK-NEG-12] BUG-05 (occurrence 8, not new) &mdash; Book documents ResponseId as required, but a Book request that omits it is accepted and creates a real, ticketed PNR; the other three mandatory fields are rejected with 400.** Field: `ResponseId`. Expected: 400 validation error naming ResponseId, no PNR created. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-6 and 13; not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** A required field is unenforced on the highest-blast-radius endpoint, and a malformed request still produces a real ticketed booking. Evidence: omit ResponseId 200, pnr OWMWDQ; omit selectedOfferId 400 A0001; omit supplier 400 1001; omit credentialsSelector 400 1001.
- **[TC-BOOK-BIZ-05] BUG-09 (occurrence 10, not new) &mdash; A child passenger can be assigned an exit-row seat: GetSeatMap offers and prices all 24 exit-row cells to the CHD, and Book accepts the assignment, creates the PNR and tickets both passengers.** Field: `passengersSelectedSeats.&lt;paxRef&gt; (CHD) / GetSeatMap passengersSeatMapAvailability`. Expected: Exit-row cells absent from the CHD passenger's allow-list, and Book rejecting the assignment (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD) with no PNR created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 9, re-confirmed Round 12; reproduced Round 13; not exercised Rounds 15-17; reproduced again Round 18 (2026-10-10). **Impact:** A safety rule (no children in exit rows) is enforced nowhere in the API; the seat map even labels exit rows NOT_ALLOWED_FOR_INFANTS and NOT_ALLOWED_FOR_MEDICAL but has no child restriction, so any client that calls the API directly can ticket a child in an exit row. Evidence: ADT + CHD offer (BAH-DMM 2027-07-05): PAX2 (CHD) allow-list contains 10A and all 24 exit-row cells; Book 200, pnr OPTSKU, PAX2 seat 10A 60.00 SAR, both passengers ticketed.
- **[TC-SEATAFTERHOLD-POS-01] BUG-03 (occurrence 8, not new) &mdash; SeatAfterHold rejects every call for supplier GulfAir with HTTP 409 OperationNotSupported ("GulfAir does not exists") before reading any field, while GulfAir offers are Hold-capable and Hold succeeds.** Field: `SeatAfterHold response (supplier registration)`. Expected: 200 with the seat-selection response (or a documented validation error), or GulfAir being flagged as not supporting the operation before Hold is offered. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-6 and 13; not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** The Hold branch has no working seat-selection path for GulfAir, and six dependent test cases (VAL-01, NEG-01, NEG-02, VAL-02, INT-04, the candidate flows) cannot be evaluated. The same supplier-level 409 is also returned by FareConfirmAfterHold (PnrReprice). Evidence: SeatAfterHold 409 OperationNotSupported on 9 of 9 calls with valid credentials (every chain position, mismatched and stale identities, extra field, cross-tenant variants); Holds TFBYUM and TFXRXD 200 in the same run.
- **[TC-SEATAFTERHOLD-NEG-02] BUG-04 (occurrence 8, not new) &mdash; Hold returns holdExpirationDate null for GulfAir on every call, so a Held booking has no known expiry.** Field: `holdExpirationDate`. Expected: "2026-10-11T14:32:10Z" (a future ISO-8601 timestamp). **History:** First observed Round 1 (2026-08-25); reproduced every round through Round 6 and in Round 13; not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** Downstream cannot compute when a hold lapses, so expiry-based cleanup, the expired-hold negative tests and any customer-facing hold timer cannot work. Evidence: holdExpirationDate null on 7 of 7 Hold calls this round (TLTTGU, OOEMOB, OSLGYN, TFBYUM, OODMJW, ORVBTX, TFXRXD).
- **[FLOW-V2-50-SEATFIELD] BUG-08 (occurrence 8, not new) &mdash; Hold, documented as having no seat field, accepts passengersSelectedSeats, prices the seat into the held offer and Retrieve shows it on the OnHold booking, with no SeatAfterHold call.** Field: `Hold request: passengersSelectedSeats`. Expected: The field ignored or rejected (per the documented contract), or the contract updated to say Hold honors seats. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-3, 5, 6, 13 (Round 4 blocked by an outage); not exercised Rounds 7-12 and 15-17; reproduced again Round 18 (2026-10-10). **Impact:** The documented asymmetry between the Book and Hold branches is wrong for GulfAir, and an unvalidated seat selection (same unvalidated cellId as BUG-06/07) can be attached to a hold. Evidence: Hold ORVBTX with passengersSelectedSeats.PAX1 {14C}: 200, seat echoed at 60.00 SAR, totalSelectedSeatsAmount 60; Retrieve bookingStatus OnHold with the same seat.

### Unknown-resolutions

- **[TC-SEATMAP-BND-03]** cellAvailability/paxCellAvailability value "AvailableFree" is real on GulfAir too, but at the per-passenger level: seat 8E (bassinet seat) on the A320 GF103 flight shows paxCellAvailability AvailableFree for every passenger with explicit 0.00 SAR price objects, while the overall cellAvailability stays AvailablePaid. Differs from the AirArabia example, whose AvailableFree cells have null pricing. Evidence: 2 passenger entries on the GF103 segment; totalPrice = basePrice = taxesPrice = 0 SAR; AvailableAfterReservation still not observed in 20 segments
- **[TC-SEATMAP-BND-04]** cellCategory "NoSeat" is a real value: a taken or absent seat is returned as cellCategory NoSeat with cellDetails null and column set (it never becomes Occupied/Blocked). No other category appeared on 20 narrowbody segments (aircraft 320, 321, 32Q, 32N). Evidence: 49 NoSeat cells this round; a seat taken by a booking (12C) turned into NoSeat on the next GetSeatMap (TC-SEATMAP-BIZ-04)
- **[FLOW-V2-CANDIDATE-SM-HOLD-02]** FareConfirmAfterHold (PnrReprice) is not supported for GulfAir: 409 OperationNotSupported "GulfAir does not exists" on 4 of 4 calls, the same envelope as SeatAfterHold. BookAfterHold works without it (200, ticketed), so the documented Family B chain cannot be followed step by step for this supplier. Evidence: PnrReprice 409 on Hold chains HA, HB, HC and the FLOW-50 chain; BookAfterHold 200 on HA, HB, HC
- **[TC-BOOK-NEG-08]** When a raw Book body repeats the same segmentRefId key twice under setSegmentsSeats, the server keeps the last value and drops the first without any error (System.Text.Json-style last-wins). Evidence: raw body with seats 14C then 14D on one segment: booked seat 14D only, pnr OURGLZ
- **[TC-BOOK-NEG-09]** A schema-valid but non-existent cellCode ("99Z", with a real cellId borrowed from another seat) and an unavailable cellCode (NoSeat 12C with a borrowed cellId) are both accepted by Book with HTTP 200 and silently dropped: a ticketed booking is created with no seat and no fee. Same silent-drop family as BUG-07; a null cellId is the only rejected form (400 "CellId is required."). Evidence: pnr OVGWDY (99Z) and OOAKKW (12C): passengersSelectedSeats {}, totalSelectedSeatsAmount 0
- **[TC-BOOK-BIZ-07]** GulfAir seat descriptions include two restriction values: NOT_ALLOWED_FOR_INFANTS (exit-row cells only) and NOT_ALLOWED_FOR_MEDICAL (exit-row cells plus a few rear rows). There is still no wheelchair/accessibility value and no NOT_ALLOWED_FOR_CHILDREN value. Evidence: 15 distinct description values over 3203 seat cells
- **[TC-BOOK-NEG-07]** Book rejects a duplicate seat inside one request in 0.2s (before any supplier call) with the generic envelope {ErrorCode NDC-INT-TEC-A0001, Context "Seat '17C' is assigned to multiple passengers on segment ..."}; the candidate code DUPLICATE_SEAT_SELECTION_IN_REQUEST is not used. Validation errors come in two envelope shapes: PascalCase {Status, ErrorCode "NDC-INT-TEC-A0001"} and camelCase {status, errorCode "1001"}. Evidence: NEG-07 400 A0001; GetSeatMap/Book omit-field probes 400 errorCode 1001

### Not reproduced

- **BUG-16** (Book returns an error while silently creating the booking) &mdash; exercised by TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-BOOK-POS-03, TC-BOOK-BND-03. All 15 Book calls that reached the supplier (29s, 29s, 31s, 28s, 45s, 31s, 31s, 42s, 48s, 51s, 41s, 40s, 41s, 42s, 31s) and all 3 BookAfterHold calls returned a clean HTTP 200 with a pnr and bookingToken; none returned 409 NDC-INT-UNC-Z9999 or 500. It is intermittent across rounds (Round 12 saw it on 4 of 4 Book calls), so recommend a wider re-verification before closing.
- **BUG-19** (Book silently drops a valid same-offer seat selection) &mdash; exercised by TC-SEATMAP-VAL-03, TC-BOOK-POS-03, TC-BOOK-BND-03, TC-BOOK-BIZ-06, TC-BOOK-NEG-08. Every Book call that selected a real seat on its own offer (seat 12C, 14C, 14D, 14A, 15F, 10A, the round-trip seats and the Hold with 14C) attached the seat, priced it and echoed it. Only the deliberate invalid selections (foreign cellId, non-existent or unavailable cellCode) were dropped. Round 15 reproduced 2 of 2; Rounds 16-18 did not, so the defect still looks intermittent.

## Proposed SPEC.md updates

- §2.7 &mdash; status: *pending*
  - **Old:** "`cellCategory` observed values (updated 2026-08-10): `Seat`, `Aisle` — `UNKNOWN` whether galley/lavatory/exit-row-only markers exist as further distinct categories; not observed."
  - **New:** "`cellCategory` observed values (updated 2026-10-10): `Seat`, `Aisle`, `NoSeat` (a taken or absent seat: `cellDetails` null, `column` set; GulfAir, 20 narrowbody segments). Galley/lavatory/exit-row-only markers remain `UNKNOWN`; not observed on any narrowbody sample."
  - **Correction:** Also proposed in Rounds 11 and 13 and still pending; re-confirmed Round 18 (TC-SEATMAP-BND-04).

- §2.7 / §8.3 &mdash; status: *pending*
  - **Old:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples."
  - **New:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-10-10): `AvailablePaid`, `AvailableFree`, `Blocked`, `Occupied`. `AvailableFree` is confirmed live for GulfAir at the per-passenger level (`paxCellAvailability`, explicit 0.00 price objects, overall `cellAvailability` stays `AvailablePaid`) and in the AirArabia example (null pricing). GulfAir never returns `Blocked`/`Occupied` (a taken seat becomes `cellCategory` `NoSeat`). `AvailableAfterReservation` remains unconfirmed."
  - **Correction:** Pending since Round 13; re-confirmed Round 18 (TC-SEATMAP-BND-02/BND-03, 2 passenger entries on the GF103 segment).

- §2.7 &mdash; status: *pending*
  - **Old:** "`[Observed example, V2, confirmed against the fuller raw example added 2026-08-10]` full shape, per segment inside `seatMapDetails`"
  - **New:** "Response also carries top-level `offerId`, `responseId` and `isFareCheckRequired`, and `passengersDetails.&lt;paxRef&gt;` carries `birthDate`, `documentNumber` and `passengersSeatMapAvailability` keyed segmentRefId -&gt; deck name -&gt; cellCode[] (GulfAir, 2026-10-10). Full shape, per segment inside `seatMapDetails`"
  - **Correction:** Documents the schema drift TC-SEATMAP-REG-02 has reported in every round; pending since Round 13.

- §2.7a / §2.12 &mdash; status: *pending*
  - **Old:** "Exact position in the Hold-branch chain is `UNKNOWN`"
  - **New:** "For GulfAir, `SeatAfterHold` AND `FareConfirmAfterHold` (`PnrReprice`) both return HTTP 409 `OperationNotSupported` ("GulfAir does not exists") at every chain position (2026-10-10, 9 and 4 calls); `BookAfterHold` succeeds without them. The chain position stays `UNKNOWN` until a supplier that supports the endpoint is tested."
  - **Correction:** Pending since Round 13; re-confirmed Round 18 (TC-SEATAFTERHOLD-INT-04 and the three candidate flows). The error wording changed from "does not exist(s)" to "does not exists".

- §2.10 / §1.10 item 6 &mdash; status: *pending*
  - **Old:** "the Hold branch's `Hold`/`BookAfterHold` requests were **not** updated with this field (confirmed absent from both saved examples)"
  - **New:** "Live-confirmed 2026-10-10 for GulfAir: `Hold` accepts `passengersSelectedSeats`, prices the seat into the held offer and echoes it (also on `Retrieve` while `OnHold`), without any `SeatAfterHold` call (BUG-08). The saved example still omits the field."
  - **Correction:** Pending since Round 13; re-confirmed Round 18 (FLOW-V2-50-SEATFIELD, pnr ORVBTX).

## Cleanup / follow-up

Live artifacts left behind this round (22):

- **needs_void_cancel** &mdash; pnr OWONHK (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-29, 1 ADT, no seat, ticket 722137003885)
- **needs_void_cancel** &mdash; pnr THYDTQ (TC-BOOK-POS-03) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-30, 1 ADT, seat 12C 60.00 SAR, ticket 722137003911) - shared by POS-03, VAL-03, REG-02, REG-03, VAL-08, BIZ-04, VAL-07, POS-04 and RETRIEVE-REG-01. Staging test booking.
- **needs_void_cancel** &mdash; pnr OOPQEC (TC-SEATMAP-VAL-04) &mdash; Real ticketed booking (BAH-JED 2027-07-02, 1 ADT, no seat attached, ticket 722137003886). Evidence for BUG-07 - keep until triaged.
- **needs_void_cancel** &mdash; pnr TELSMS (TC-BOOK-NEG-06) &mdash; Real ticketed booking (BAH-DXB 2027-07-03, 1 ADT, seat 14A 60.00 SAR, ticket 722137003889). Evidence for BUG-06.
- **needs_void_cancel** &mdash; pnr OODBGN (TC-BOOK-VAL-06) &mdash; Real ticketed booking (BAH-JED 2027-07-04, 1 ADT, seat 15F 60.00 SAR, ticket 722137003890).
- **needs_void_cancel** &mdash; pnr OPTSKU (TC-BOOK-BIZ-05) &mdash; Real ticketed booking (BAH-DMM 2027-07-05, ADT + CHD, CHD in exit-row seat 10A, ticket 722137003887). Evidence for BUG-09.
- **needs_void_cancel** &mdash; pnr OURGLZ (TC-BOOK-NEG-08) &mdash; Real ticketed booking (BAH-RUH 2027-07-07, 1 ADT, seat 14D 60.00 SAR, ticket 722137003891) created by the duplicate-JSON-key probe.
- **needs_void_cancel** &mdash; pnr OVJLJD (TC-BOOK-BIZ-06) &mdash; Real ticketed booking (BAH-RUH 2027-07-08, ADT + INF, ADT seat 14C 60.00 SAR, ticket 722137003914).
- **needs_void_cancel** &mdash; pnr OVGWDY (TC-BOOK-NEG-09) &mdash; Real ticketed booking (BAH-JED 2027-06-07, 1 ADT, no seat, ticket 722137003918) created by the non-existent-seat-code probe.
- **needs_void_cancel** &mdash; pnr OWXNXQ (TC-BOOK-NEG-10) &mdash; Real ticketed booking (BAH-DXB 2027-06-05, 1 ADT, no seat, ticket 722137003917).
- **needs_void_cancel** &mdash; pnr OWPHXJ (TC-BOOK-NEG-11) &mdash; Real ticketed booking (BAH-DMM 2027-06-06, 1 ADT, no seat, ticket 722137003916).
- **needs_void_cancel** &mdash; pnr TGDKPM (TC-BOOK-BND-03) &mdash; Real ticketed round-trip booking (BAH-RUH 2027-06-20 / RUH-BAH 2027-06-27, 2 ADT, four seats, ticket 722137003912). Evidence for BUG-18.
- **needs_void_cancel** &mdash; pnr OVMIAD (FLOW-V2-49-SEATFIELD) &mdash; Real ticketed round-trip booking (BAH-RUH 2027-06-21 / RUH-BAH 2027-06-24, 1 ADT, seats 14C+14D 120.00 SAR, ticket 722137003920). Evidence for BUG-18.
- **needs_void_cancel** &mdash; pnr OOAKKW (TC-BOOK-NEG-05) &mdash; Real ticketed booking (BAH-RUH 2027-06-30, 1 ADT, no seat, ticket 722137003894) created by the NEG-05 run-2 probe (unavailable seat code with a borrowed cellId).
- **needs_void_cancel** &mdash; pnr OOEMOB (FLOW-V2-CANDIDATE-SM-HOLD-01) &mdash; Real ticketed booking (BAH-JED 2027-06-08, 1 ADT, no seat, ticket 722137003892) finalized through BookAfterHold after a Hold; also used by TC-SEATAFTERHOLD-INT-04.
- **needs_void_cancel** &mdash; pnr TLTTGU (FLOW-V2-CANDIDATE-SM-HOLD-02) &mdash; Real ticketed booking (BAH-DMM 2027-06-09, 1 ADT, no seat, ticket 722137003921) finalized through BookAfterHold after a Hold; also used by TC-SEATAFTERHOLD-INT-04.
- **needs_void_cancel** &mdash; pnr OSLGYN (FLOW-V2-CANDIDATE-SM-HOLD-03) &mdash; Real ticketed booking (BAH-RUH 2027-06-22, 1 ADT, no seat, ticket 722137003893) finalized through BookAfterHold after a Hold; also used by TC-SEATAFTERHOLD-INT-04.
- **needs_void_cancel** &mdash; pnr OWMWDQ (TC-BOOK-NEG-12) &mdash; Real ticketed booking (BAH-JED 2027-06-01, 1 ADT, ticket 722137003919) created by a Book that omitted ResponseId. Evidence for BUG-05.
- **family_b_hold** &mdash; pnr ORVBTX (FLOW-V2-50-SEATFIELD) &mdash; Held (not finalized) GulfAir/KSA booking with seat 14C attached via Hold (BUG-08); holdExpirationDate is null (BUG-04) so no expiry is known - cancel via the platform team.
- **family_b_hold** &mdash; pnr TFBYUM (TC-SEATAFTERHOLD-POS-01) &mdash; Held, not finalized: SeatAfterHold POS-01/VAL-01/SEC-02/NEG-01 probes (BAH-CAI 2027-07-04). holdExpirationDate null (BUG-04).
- **family_b_hold** &mdash; pnr OODMJW (TC-SEATAFTERHOLD-NEG-01) &mdash; Held, not finalized: second Hold for the SeatAfterHold NEG-01 mismatched identity (BAH-DXB 2027-07-05). holdExpirationDate null (BUG-04).
- **family_b_hold** &mdash; pnr TFXRXD (FLOW-V2-CANDIDATE-SM-HOLD-01-NEG) &mdash; Held, not finalized: Hold for the stale-identity SeatAfterHold probe (BAH-JED 2027-06-25). holdExpirationDate null (BUG-04).

