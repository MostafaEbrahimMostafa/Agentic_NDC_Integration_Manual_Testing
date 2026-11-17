# QA Execution Report — Round 13 full run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 63 test cases (all rows of the file)

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-09-30T13:54:14.037Z
**Ended:** 2026-09-30T14:33:38.442Z
**Status:** COMPLETE
**Execution Duration:** 39m 24s ([View Time Breakdown](20260930-165414_SeatMap-GulfAir-KSA-Round13_TimeBreakdown.html))
**Prior runs:** Rounds 1-12 (see NDC_Integration/Artifacts/Logs/)

## Scope note

Full-suite run: all 63 rows of SeatMap_TestCases.csv (GulfAir / KSA, staging ndc-integration-stg-ne-3). Every row was executed or explicitly classified: 29 fresh Search -> FareConfirm -> AddPassenger -> GetSeatMap (or Hold) chains were built for them (about 285 API calls in total, several chains run in parallel), the rest are read-only checks of shared seat maps, documentation rows or rows that cannot run for GulfAir (no bundle/ancillary capability, SeatAfterHold and FareConfirmAfterHold unsupported, no forcing mechanism, other suppliers out of scope). HEADLINE: BUG-16 (Book returns an error while silently creating the booking) did NOT reproduce - all 16 Book calls returned a clean 200 with a PNR (34-56 seconds each) and so did the 3 BookAfterHold calls. All other previously open defects reproduced unchanged, and one NEW defect was found (BUG-18: Retrieve under-reports the per-passenger seat total on multi-seat bookings). Environment note: GulfAir returns an empty seatMapDetails (0 rows) for departures from about 2027-08-03 and no offers after about mid-July 2027, so all chains use May-June 2027 dates. The disk log was written in batches after each group of calls rather than per test case in real time, so each test case's reporting_started_at/reporting_ended_at brackets a real JSONL append + Markdown re-render taken at write-up time, not at verdict time. BND-02, BND-03, BND-04, BIZ-02 and VAL-08 were re-recorded once after a wider scan of all seat maps found AvailableFree live. The x-api-key is never written to the log; raw OriginalSupplierRequest/Response payloads (credentials, recipient details) are replaced by a redaction marker.

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 35
- Failed: 15
- Blocked: 13
- Failed test cases: TC-SEATMAP-VAL-04, TC-SEATMAP-REG-02, TC-BOOK-NEG-06, TC-BOOK-VAL-06, TC-SEATAFTERHOLD-POS-01, TC-SEATAFTERHOLD-INT-04, FLOW-V2-49-SEATFIELD, FLOW-V2-50-SEATFIELD, FLOW-V2-CANDIDATE-SM-HOLD-01, TC-BOOK-BIZ-05, TC-BOOK-NEG-12, TC-SEATMAP-NEG-01, TC-SEATMAP-NEG-02, TC-SEATMAP-NEG-04, TC-SEATMAP-SEC-01
- Blocked test cases: TC-BOOK-INT-03, TC-SEATAFTERHOLD-VAL-01, TC-SEATAFTERHOLD-NEG-01, TC-SEATAFTERHOLD-NEG-02, FLOW-V2-CANDIDATE-SM-HOLD-02, FLOW-V2-CANDIDATE-SM-HOLD-03, FLOW-V2-CANDIDATE-SM-HOLD-01-NEG, TC-BOOK-NEG-09, TC-BOOK-BIZ-07, TC-BOOK-INT-04, TC-SEATAFTERHOLD-VAL-02, TC-SEATMAP-INT-02, TC-SEATMAP-INT-03

## Test case results

### TC-SEATMAP-POS-02 — PASS

- **Test Case:** Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-06-11, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 200 - pnr ONUNXZ, bookingToken TPC60517146715D3092026, gdsPNR "", ticket 722136997100 (36.1s)
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Confirmed. GetSeatMap returned non-empty offerId/responseId (identical to the AddPassenger values); Book accepted them and created a real ticketed PNR. The Postman collection-variable assignment itself is script-side and not observable over raw HTTP - verified the field mapping it relies on (resp.offerId/resp.responseId) instead. BUG-16 (Book 409 with a silently created booking, Round 12) did NOT reproduce on this call: a clean 200 with a PNR. Unchanged from Rounds 1-11.
- **Status:** PASS
- **Evidence:** GetSeatMap responseId == AddPassenger responseId; offerId equal; Book echoed pnr ONUNXZ, ticket 722136997100, Book latency 36.1s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 137 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr ONUNXZ, bookingToken TPC60517146715D3092026, tickets 722136997100

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.PAX1.setSegmentsSeats.GF-GF161-GF161-2027061202-2027061204-O = {cellCode "12C", cellId = the verbatim cellDetails.cellID from the GetSeatMap response} for seat 12C (AvailablePaid, 60.00 SAR, GulfAir/KSA, BAH-RUH 2027-06-12, GF161, 1 ADT)
- **Response:** 200 - pnr ORUXWA, seat 12C attached and echoed: passengersSelectedSeats.PAX1 = {cellCode 12C, price 60 SAR}; passengerSeats[0] = {12C, 60 SAR}
- **Expected:** Book accepts the token despite the field-name casing difference (response cellID vs request cellId) and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** Accepted. The request sent the response's cellID value verbatim under the lowercase-d field name cellId; Book returned 200, attached seat 12C and echoed it at three places (top-level passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats, priceDetails.totalSelectedSeats). The casing difference is cosmetic (case-insensitive JSON binding). Unchanged from Rounds 1-11. BUG-16 did not reproduce on this call.
- **Status:** PASS
- **Evidence:** Book 200 in 46.1s; pnr ORUXWA; echoed cellCode 12C price 60 SAR in all three locations

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr ORUXWA, bookingToken TPC60517146716D3092026, tickets 722136997152

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer E2 (BAH-JED 2027-06-16) with seat cellCode 15B but cellId = the cellID issued for seat 15C on a different offer E1 (BAH-JED 2027-06-15); two independent Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap chains
- **Response:** 200 - pnr RFMLTX ticketed (722136997201) after 37.1s; passengersSelectedSeats came back as an empty object {}; totalSelectedSeatsAmount 0.00; no error
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07). The foreign cellId was not rejected: Book ran the full supplier round-trip, created and ticketed a real booking, and silently dropped the seat (passengersSelectedSeats {} and no seat fee) instead of returning an error. Seat 15B was neither attached nor refused.
- **Status:** FAIL
- **Evidence:** Book 200 in 37.1s; pnr RFMLTX, ticket 722136997201; passengersSelectedSeats {} ; priceDetails totalAmount 1143 = base 790 + tax 353, totalSelectedSeatsAmount 0

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 5 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 6 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 7 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 8 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 9 &mdash; Book:** FAIL &mdash; 200 - pnr RFMLTX, bookingToken TPC60517146717D3092026, tickets 722136997201

### TC-SEATMAP-BND-02 — PASS

- **Test Case:** Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid, Blocked, and Occupied, and that Aisle-category cells carry no seatPriceDetails.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** All GetSeatMap responses captured this round (34 distinct segments, aircraft 320/321/32N/32Q, ~6,470 seat cells) enumerated cell-by-cell for distinct cellCategory / cellAvailability / paxCellAvailability values; the two representative maps are chain A and chain H
- **Response:** 200 - cellCategory {Seat, Aisle, NoSeat}; cellAvailability {AvailablePaid}; paxCellAvailability {AvailablePaid, AvailableFree}; Aisle cells never priced
- **Expected:** cellCategory in {Seat, Aisle}; cellAvailability/paxCellAvailability in {AvailablePaid, Blocked, Occupied}; Aisle cells carry no seatPriceDetails; a new value is logged and flagged, not hard-failed
- **Actual:** No Blocked or Occupied value appeared anywhere. Two values outside the expected sets were found and are flagged, not failed (8.3 policy): cellCategory "NoSeat" (a taken/absent seat, cellDetails null) and paxCellAvailability "AvailableFree" (seat 8E, the bassinet seat, on the A320 GF103 flights: overall cellAvailability stays AvailablePaid while every passenger entry says AvailableFree at 0.00 SAR - 6 passenger entries across 5 maps). Every Aisle cell has cellDetails null, so no price.
- **Status:** PASS
- **Evidence:** cellCategory: Seat/Aisle/NoSeat; cellAvailability: AvailablePaid only; paxCellAvailability: AvailablePaid + AvailableFree (6 entries, all 0.00 SAR, cell 8E on GF103); Aisle cells with cellDetails: 0; Blocked/Occupied cells: 0

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-10, 32Q):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells
  - **Hop 2 &mdash; GetSeatMap (chain H, BAH-DMM 2027-06-19, 320, ADT+CHD):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-BIZ-02 — PASS

- **Test Case:** Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap
- **Request:** Every priced cell in all GetSeatMap responses this round - seatPriceDetailsByPassenger.&lt;pax&gt; {totalPrice, basePrice, taxesPrice} checked (7,060 cell/passenger pairs; chain A is the representative map)
- **Response:** 200 - chain A: 174 pairs (60 SAR x54, 120 SAR x12, 40 SAR x108); across all maps: 7,060 pairs, all in SAR
- **Expected:** totalPrice.amount == basePrice.amount + taxesPrice.amount, same currency, for every priced cell/passenger pair
- **Actual:** 0 mismatches in 7,060 pairs. basePrice equals totalPrice everywhere and taxesPrice is 0.00 SAR (GulfAir does not split a seat charge into base and tax); the free bassinet seat 8E is 0 = 0 + 0. All amounts are in SAR.
- **Status:** PASS
- **Evidence:** pairs=7060, mismatches=0, currency mismatches=0; chain A 9A: total 60.00 = base 60.00 + taxes 0.00 SAR; 8E: 0.00 = 0.00 + 0.00 SAR

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-10, 32Q):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells

### TC-SEATMAP-REG-02 — FAIL

- **Test Case:** Verify seatMapDetails.&lt;segment&gt;.{cabinLayoutsByDeck, rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails}}} structure matches the fuller schema captured 2026-08-10, AND flag/tolerate the flat-columns supplier variant (no zones[]/zoneId) confirmed present in a saved example.
- **Category:** Regression
- **Endpoint Name:** GetSeatMap
- **Request:** Full schema diff of chain A's live GetSeatMap response against SPEC.md 2.7's documented field list
- **Response:** 200 - all documented fields present (zones[] layout shape, not the flat-columns variant), plus undocumented fields: top-level isFareCheckRequired, passengersDetails.&lt;pax&gt;.{birthDate, documentNumber, passengersSeatMapAvailability}
- **Expected:** Every key listed in SPEC.md 2.7 present and correctly typed; at least one of the zones[]/zoneId or flat columns[] layout shapes accepted
- **Actual:** Every documented key is present and correctly typed: cabinLayoutsByDeck.Main.zones[].{zoneId,columns,cabinClass}, rows[].{rowNumber,deck,zoneId,cells[]}, cellDetails.{cellID,cellCode,cellAvailability,name,description,seatPriceDetails,seatPriceDetailsByPassenger,cellCharacteristics}. GulfAir uses the zones[]/zoneId shape and rows[] carry zoneId. The response also carries 4 fields SPEC.md 2.7 does not list (isFareCheckRequired, passengersSeatMapAvailability, birthDate, documentNumber) and a NoSeat cellCategory - the same schema drift flagged in every prior round, so kept FAIL for continuity; nothing is missing or mistyped.
- **Status:** FAIL
- **Evidence:** top-level keys: flightSegments,isFareCheckRequired,offerId,passengersDetails,responseId,seatMapDetails,supplier; passengersDetails.PAX1 keys: birthDate,documentNumber,name,passengerTypeCode,passengersSeatMapAvailability; row keys: cells,deck,rowNumber,zoneId

### TC-BOOK-POS-03 — PASS

- **Test Case:** Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly.
- **Category:** Positive
- **Endpoint Name:** Book
- **Request:** POST api/v2/FlightBooking/Book - ResponseId/selectedOfferId = getSeatMapResponceID/getSeatMapOfferId, passengersSelectedSeats.PAX1.setSegmentsSeats.GF-GF161-GF161-2027061202-2027061204-O = {cellCode "12C", cellId &lt;verbatim cellID&gt;} (one passenger, one segment)
- **Response:** 200 - pnr ORUXWA, gdsPNR "", bookingToken TPC60517146716D3092026, ticket 722136997152; passengersSelectedSeats.PAX1.GF-GF161-GF161-2027061202-2027061204-O = {12C, 60 SAR}
- **Expected:** HTTP 200; pnr/bookingToken/gdsPNR returned; top-level passengersSelectedSeats echoes {cellCode, price}; selectedOffer.passengerFareBreakdown[].passengerSeats has the same {cellCode, price}; priceDetails.totalSelectedSeats/totalSelectedSeatsAmount reflect the same price
- **Actual:** All echoes match exactly: passengersSelectedSeats.PAX1.&lt;segment&gt; = {12C, 60.00 SAR}; passengerSeats[0] = {12C, 60.00 SAR}; priceDetails.totalSelectedSeats = [{12C, 60.00 SAR}]; totalSelectedSeatsAmount = 60.00 SAR. Unchanged from Rounds 1-6 and 11.
- **Status:** PASS
- **Evidence:** Book 200 in 46.1s; pnr ORUXWA ticket 722136997152; totalSelectedSeatsAmount 60.00 SAR == seat price 60.00 SAR

### TC-BOOK-NEG-05 — PASS

- **Test Case:** Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with cellCode 8A - a cell the seat map lists as NoSeat (all of row 8; GulfAir returns no Blocked/Occupied cells, a taken seat becomes NoSeat) - run 1 with its null cellId, run 2 with the cellId of a different seat (9A); chain A's unbooked offer, BAH-RUH 2027-06-10
- **Response:** Run 1: 400 NotEmptyValidator "CellId is required." in 0.1s, no pnr. Run 2: 200 - pnr OPTCTH ticketed (722136997210) after 35.9s, passengersSelectedSeats {}, no seat fee (total 993.00 SAR), no error
- **Expected:** Request rejected (exact status UNKNOWN) with no booking created; or, if a PNR is created, it must NOT reflect the unavailable seat as attached - either outcome logged precisely
- **Actual:** Both outcomes the test allows, and no unavailable seat was ever attached. Run 1 (the real null cellId of an unavailable cell) is rejected by a generic null-cellId check, not by an availability check. Run 2 (unavailable code + a borrowed valid token) is NOT rejected: Book created and ticketed a booking and silently left the seat out (passengersSelectedSeats {}), with no error telling the caller the seat was dropped - the same silent-drop pattern as BUG-07. Blocked/Occupied cells do not exist for this supplier, so NoSeat is the closest unavailable state.
- **Status:** PASS
- **Evidence:** run 1: 400 A0001 NotEmptyValidator "CellId is required." (0.1s); run 2: 200, pnr OPTCTH, passengersSelectedSeats {}, priceDetails.totalSelectedSeatsAmount 0, totalAmount 993

  - **Hop 1 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells
  - **Hop 2 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again.
  - **Hop 3 &mdash; Book:** PASS &mdash; 200 - pnr OPTCTH, bookingToken TPC60517146727D3092026, tickets 722136997210

### TC-BOOK-NEG-06 — FAIL

- **Test Case:** Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (BAH-DXB 2027-06-17, 1 ADT) with valid cellCode 14A but its 323-character cellId with the last 10 characters replaced by "XXXXXXXXXX", on a fresh never-booked offer
- **Response:** 200 - pnr RALBKE ticketed (722136997204) after 50.7s; seat 14A attached at 60.00 SAR exactly as if the untampered token had been sent
- **Expected:** Request is rejected (exact status UNKNOWN) since a tampered token should fail whatever server-side decode/signature check the opaque cellId undergoes
- **Actual:** STILL REPRODUCES (BUG-06). The tampered cellId was accepted without any error: Book created a ticketed booking with seat 14A attached and priced (60.00 SAR), so the token is never validated and the seat is chosen from cellCode alone.
- **Status:** FAIL
- **Evidence:** tampered token length 323 (same as original), last 10 chars XXXXXXXXXX; Book 200; pnr RALBKE; passengersSelectedSeats.PAX1 = {14A, 60 SAR}; total 1141 = 730 + 351 + 60

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 1081 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1081 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr RALBKE, bookingToken TPC60517146719D3092026, tickets 722136997204

### TC-BOOK-VAL-06 — FAIL

- **Test Case:** Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (BAH-JED 2027-06-18, 1 ADT) with cellCode "15F" but the cellId that GetSeatMap issued for a different seat (15A), same offer and segment
- **Response:** 200 - pnr OWBPFD ticketed (722136997153) after 51.9s; seat attached as the submitted cellCode 15F at 60.00 SAR
- **Expected:** UNKNOWN - either the API trusts cellId alone, rejects the request, or books the wrong seat under the wrong displayed code; record which
- **Actual:** Resolved: the API trusts cellCode and ignores the cellId contents. With cellCode 15F and the token of seat 15A, Book attached seat 15F (the code) - no cross-check, no error. Same finding as BUG-06 (the cellId is not validated at all), unchanged from Rounds 1-6.
- **Status:** FAIL
- **Evidence:** Book 200; pnr OWBPFD; passengersSelectedSeats.PAX1 = {15F, 60 SAR}; seat 15A (the token's seat) not attached; total 1203 = 790 + 353 + 60

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr OWBPFD, bookingToken TPC60517146720D3092026, tickets 722136997153

### TC-BOOK-BIZ-04 — PASS

- **Test Case:** Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected.
- **Category:** Business Rule
- **Endpoint Name:** FareConfirm -&gt; Book
- **Request:** Book with exactly one paid seat (12C, 60 SAR) on pnr ORUXWA; totals compared with the same offer's FareConfirm total taken before the seat
- **Response:** 200 - priceDetails: totalAmount 993.00, totalBaseAmount 580.00, totalTaxAmount 353.00, totalAncillariesAmount 0.00, totalSelectedSeatsAmount 60.00 SAR; FareConfirm totalAmount was 933.00 SAR
- **Expected:** totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount, and totalAmount(after) == totalAmount(before the seat) + totalSelectedSeatsAmount
- **Actual:** Both reconcile exactly: 580.00 + 353.00 + 0.00 + 60.00 = 993.00 = totalAmount, and 933.00 (FareConfirm) + 60.00 = 993.00. The seat amount is included in totalAmount. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** totalBase 580 + totalTax 353 + totalAnc 0 + totalSeats 60 = 993 == totalAmount 993; FareConfirm totalAmount 933 + seat 60 = 993

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 2 &mdash; Book:** PASS &mdash; 200 - pnr ORUXWA, bookingToken TPC60517146716D3092026, tickets 722136997152

### TC-BOOK-INT-03 — BLOCKED

- **Test Case:** Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously on one call.
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck -&gt; Book
- **Request:** Would need a bundle code (GetOfferBundles) plus an ancillary code (GetAncillary) plus a seat on one Book call; capability checked on every FareConfirm this round (51 calls across 25 independent offers/chains)
- **Response:** N/A - FareConfirm returned haveBundles=false and isAncillaryRequired=false on 51 of 51 calls, so GetOfferBundles has nothing to offer for GulfAir/KSA
- **Expected:** UNKNOWN - record whether Book accepts bundles, ancillaries and seats together (accepted with all three reflected, partially accepted, or rejected)
- **Actual:** Not executable for GulfAir: it exposes no bundle capability on any sampled offer, so the bundle half of the combination cannot be built. Not called - no request was sent for this case. Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** FareConfirm selectedOffer flags on 51 of 51 calls: haveBundles=false, isAncillaryRequired=false, isSeatMapRequired=false, canBeHeld=true

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR

### TC-BOOK-BND-03 — PASS

- **Test Case:** Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** Three Book payload variants: (a) passengersSelectedSeats omitted entirely (BAH-JED 2027-05-04, pnr RMNHIG); (b) one passenger / one segment, seat 12C (BAH-RUH 2027-06-12, pnr ORUXWA); (c) two passengers each with a seat on both segments of a round trip (BAH-RUH 2027-05-17 / RUH-BAH 2027-05-24, PAX1 14C+18C, PAX2 14D+18D, pnr OOBWZB)
- **Response:** (a) 200, passengersSelectedSeats {} and no seat fee; (b) 200, seat 12C echoed at 60 SAR; (c) 200 after 56.2s - four seats nested correctly: PAX1 {seg1 14C 60, seg2 18C 40}, PAX2 {seg1 14D 60, seg2 18D 40}; totalSelectedSeatsAmount 200 SAR
- **Expected:** (a) Book succeeds with no seat attached; (b) succeeds as in TC-BOOK-POS-03; (c) UNKNOWN - confirm live whether multiple passengers/segments nest correctly as sibling keys
- **Actual:** All three sub-cases pass. (c) is now directly evidenced: two passenger keys, each with a setSegmentsSeats map of two segment keys, are accepted and echoed correctly at every location, and the totals reconcile (base 1698 + tax 1522 + seats 200 = 3420.00 SAR; each passenger paxTotalSeatAmount 100 = 60 + 40 on the Book response). The multi-seat Retrieve of the same bookings under-reports the per-passenger seat total - filed separately under FLOW-V2-49-SEATFIELD (BUG-18).
- **Status:** PASS
- **Evidence:** (a) pnr RMNHIG pSS {}; (b) pnr ORUXWA; (c) pnr OOBWZB tickets 722136997211/722136997212, 4 of 4 seats echoed, priceDetails totalAmount 3420 = 1698 + 1522 + 0 + 200

  - **Hop 1 &mdash; Book (a) seats omitted:** PASS &mdash; 200 - pnr RMNHIG, bookingToken TPC60517146722D3092026, tickets 722136997155
  - **Hop 2 &mdash; Book (b) one passenger, one segment:** PASS &mdash; 200 - pnr ORUXWA, bookingToken TPC60517146716D3092026, tickets 722136997152
  - **Hop 3 &mdash; Search:** PASS &mdash; 200 - 125 offers, offer[0] totalAmount 3220 SAR
  - **Hop 4 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 3220 SAR
  - **Hop 5 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 6 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 2 segment(s), 328 seat cells
  - **Hop 7 &mdash; Book (c) two passengers x two segments:** PASS &mdash; 200 - pnr OOBWZB, bookingToken TPC60517146734D3092026, tickets 722136997211/722136997212

### TC-BOOK-REG-02 — PASS

- **Test Case:** Verify passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema going forward.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Schema diff of TC-BOOK-POS-03's full Book response (pnr ORUXWA) against SPEC.md 2.9's post-2026-08-10 field list
- **Response:** 200 - all 5 seat fields present and correctly typed (passengersSelectedSeats object, passengerSeats array, paxTotalSeatAmount object, totalSelectedSeats array, totalSelectedSeatsAmount object); pre-existing fields all present
- **Expected:** passengersSelectedSeats, passengerSeats, paxTotalSeatAmount, totalSelectedSeats, totalSelectedSeatsAmount are present and correctly typed whenever a seat has been selected; no pre-existing response field regressed
- **Actual:** All five fields present and correctly typed. Every pre-existing top-level key is still present (supplier, pnr, gdsPNR, bookingToken, tickets, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer). Undocumented extras (voidCapability, diRemarks, emdTickets, isBspCommissionApplied) as in earlier rounds. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** top-level keys: supplier,pnr,gdsPNR,bookingToken,voidCapability,creationDate,ticketingDate,tickets,passengersSelectedAncillaries,passengersSelectedSeats,journeys,flightSegments,priceClasses,baggageDetails,passengersList,contacts,selectedOffer,isBspCommissionApplied,diRemarks,emdTickets

### TC-SEATAFTERHOLD-POS-01 — FAIL

- **Test Case:** Discovery case -- submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape.
- **Category:** Positive
- **Endpoint Name:** Hold -&gt; SeatAfterHold
- **Request:** POST api/v2/SeatMap/SeatAfterHold - supplier GulfAir, credentialsSelector KSA, pnr OTANEN, gdsPNR "", bookingToken from a fresh Hold (BAH-CAI 2027-05-18), surName "Ibrahim" - the collection's documented 6-field body
- **Response:** 409 {ErrorCode "OperationNotSupported", ErrorMessage "This action is not currently supported by the selected supplier.", Context [{OperationNotSupported: "GulfAir does not exist(s)"}]} in 0.5s
- **Expected:** UNKNOWN by design - establish ground truth: a 200 with a seat-map-like payload, a follow-up requirement, or an error demanding more fields
- **Actual:** STILL REPRODUCES (BUG-03). The endpoint rejects GulfAir outright at supplier level before reading any field: 409 OperationNotSupported, "GulfAir does not exist(s)". Ground truth for this supplier: SeatAfterHold is not wired up for GulfAir, so its real request/response shape cannot be discovered here. The Hold itself succeeded (holdExpirationDate null, BUG-04).
- **Status:** FAIL
- **Evidence:** HTTP 409 in 0.5s; ErrorCode OperationNotSupported; Context Value "GulfAir does not exist(s)"; Hold OTANEN 200 with holdExpirationDate null

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 15 offers, offer[0] totalAmount 1812 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1812 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr OTANEN, holdExpirationDate null
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.

### TC-SEATAFTERHOLD-VAL-01 — BLOCKED

- **Test Case:** Confirm whether a seat/cell field is required beyond the 6 documented fields, by inspecting the response/error from TC-SEATAFTERHOLD-POS-01.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** The same 6-field body as POS-01, then a second attempt with a guessed extra field (passengersSelectedSeats with a cellCode/cellId, analogous to Book), both against Held pnr OTANEN
- **Response:** Both attempts: 409 OperationNotSupported "GulfAir does not exist(s)" in 0.1-0.5s - identical, the extra field made no difference
- **Expected:** UNKNOWN - if the 6 fields do not suffice, document the actual required shape and flag the collection stub as a defect
- **Actual:** Blocked. The rejection is supplier-level and does not depend on the body, so neither attempt reaches any field validation and the request contract still cannot be resolved for GulfAir (BUG-03). Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** attempt 1 (6 fields) 409; attempt 2 (+ passengersSelectedSeats) 409; both ErrorCode OperationNotSupported

  - **Attempt 1 of 2 - documented 6-field body:** HTTP 409
  - **Attempt 2 of 2 - plus a guessed passengersSelectedSeats field:** HTTP 409

### TC-SEATAFTERHOLD-NEG-01 — BLOCKED

- **Test Case:** Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination.
- **Category:** Negative
- **Endpoint Name:** Hold -&gt; Hold -&gt; SeatAfterHold
- **Request:** SeatAfterHold with pnr OTANEN (Hold A) but gdsPNR/bookingToken from a second, independent Hold (OOESWB, Hold B, BAH-DXB 2027-05-19)
- **Response:** 409 OperationNotSupported "GulfAir does not exist(s)" in 0.1s - identical to the baseline rejection
- **Expected:** Request rejected (exact status UNKNOWN), analogous to FareConfirmAfterHold/BookAfterHold's mismatched-identity negative cases
- **Actual:** Actually attempted, but not meaningfully testable for GulfAir: the supplier-level 409 fires before any identity-matching logic, so it is impossible to tell whether the mismatch would itself be detected (BUG-03). Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** 409 OperationNotSupported; same envelope as a fully valid identity

  - **Hop 1 &mdash; Hold:** PASS &mdash; 200 - pnr OTANEN, holdExpirationDate null
  - **Hop 2 &mdash; Hold:** PASS &mdash; 200 - pnr OOESWB, holdExpirationDate null
  - **Hop 3 &mdash; SeatAfterHold (mismatched identity):** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.

### TC-SEATAFTERHOLD-NEG-02 — BLOCKED

- **Test Case:** Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed.
- **Category:** Negative
- **Endpoint Name:** Hold -&gt; SeatAfterHold
- **Request:** Would need a Held PNR whose holdExpirationDate is confirmed in the past; three fresh Holds this round returned holdExpirationDate null (H1, H2, HA)
- **Response:** Hold 200 with holdExpirationDate null on every Hold (OTANEN, OOESWB, OWRLBM)
- **Expected:** Request rejected (exact status UNKNOWN), consistent with FareConfirmAfterHold on an expired hold
- **Actual:** Doubly blocked: no hold expiry is ever returned (BUG-04 reproduces on 3 fresh Holds, so there is no time to wait for), and SeatAfterHold rejects GulfAir outright (BUG-03). No call was made for this case beyond the Holds already shown.
- **Status:** BLOCKED
- **Evidence:** holdExpirationDate null on Holds OTANEN, OOESWB, OWRLBM

  - **Hop 1 &mdash; Hold:** BLOCKED &mdash; 200 - pnr OTANEN, holdExpirationDate null
  - **Hop 2 &mdash; Hold:** BLOCKED &mdash; 200 - pnr OOESWB, holdExpirationDate null
  - **Hop 3 &mdash; Hold:** BLOCKED &mdash; 200 - pnr OWRLBM, holdExpirationDate null

### TC-SEATAFTERHOLD-SEC-02 — PASS

- **Test Case:** Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to SeatAfterHold.
- **Category:** Security
- **Endpoint Name:** SeatAfterHold
- **Request:** The POS-01 body with (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier/selector switched to TravelportNdc/UAE against the GulfAir hold, (3b) credentialsSelector switched to UAE
- **Response:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 409 OperationNotSupported "TravelportNdc does not exist(s)"; (3b) 409 OperationNotSupported "GulfAir does not exist(s)"
- **Expected:** All three rejected - exact status/error shape UNKNOWN; reuse the envelope the same checks produce on other endpoints
- **Actual:** All rejected. The two auth-header checks return the same 401 AuthenticationError envelope every other endpoint returns. The cross-tenant variants are rejected too, but by the endpoint's supplier-level 409 rather than by a tenant check, so they do not prove the credentialsSelector boundary is enforced here (compare BUG-17 on GetSeatMap). Unchanged from Rounds 1-6 for checks (1) and (2).
- **Status:** PASS
- **Evidence:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 409 OperationNotSupported; (3b) 409 OperationNotSupported

  - **Attempt 1 of 4 - invalid x-api-key:** HTTP 401
  - **Attempt 2 of 4 - invalid Client-Id:** HTTP 401
  - **Attempt 3 of 4 - cross-tenant: supplier TravelportNdc/UAE:** HTTP 409
  - **Attempt 4 of 4 - cross-tenant: credentialsSelector UAE:** HTTP 409

### TC-SEATAFTERHOLD-INT-04 — FAIL

- **Test Case:** Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points and comparing outcomes.
- **Category:** Integration
- **Endpoint Name:** Hold -&gt; SeatAfterHold flow (3 candidate positions)
- **Request:** Three Hold-branch chains differing only in when SeatAfterHold is called: A (BAH-JED 2027-05-20) right after Hold; B (BAH-DMM 2027-05-21) after FareConfirmAfterHold; C (BAH-RUH 2027-05-25) after BookAfterHold - each continued to Retrieve
- **Response:** SeatAfterHold 409 OperationNotSupported at all three positions; FareConfirmAfterHold (PnrReprice) 409 OperationNotSupported on all three chains; BookAfterHold 200 on all three; Retrieve shows no seat in any chain (passengersSelectedSeats {}, bookings ticketed)
- **Expected:** UNKNOWN - record which position(s) SeatAfterHold accepts and whether the final Retrieve shows a seat; more than one accepted position is itself a finding
- **Actual:** Not resolvable for GulfAir. SeatAfterHold rejects at every position with the identical supplier-level 409, so the outcome is not position-dependent (BUG-03), and no chain ends with a seat. New: FareConfirmAfterHold is also rejected for GulfAir (409 OperationNotSupported), so positions B and C could not even be reached the way the chain intends. Ground truth for the flow position stays UNKNOWN.
- **Status:** FAIL
- **Evidence:** A: SAH 409, PnrReprice 409, BookAfterHold 200 (OWRLBM ticket 722136997158); B: PnrReprice 409, SAH 409, BookAfterHold 200 (OODBGD); C: PnrReprice 409, BookAfterHold 200 (OWZVVL), SAH 409; all Retrieve pSS {}

  - **Hop 1 &mdash; Hold:** PASS &mdash; 200 - pnr OWRLBM, holdExpirationDate null
  - **Hop 2 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 3 &mdash; Hold:** PASS &mdash; 200 - pnr OODBGD, holdExpirationDate null
  - **Hop 4 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 6 &mdash; Hold:** PASS &mdash; 200 - pnr OWZVVL, holdExpirationDate null
  - **Hop 7 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 8 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr OWZVVL, bookingToken TPC60517146731D3092026, tickets 722136997157
  - **Hop 9 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 10 &mdash; Retrieve:** PASS &mdash; 200

### FLOW-V2-49-SEATFIELD — FAIL

- **Test Case:** Verify the existing SM-enrichment Family-A flow now chains Book's ResponseId/selectedOfferId from GetSeatMap's output and that Book's passengersSelectedSeats field is exercised, not left unused.
- **Category:** Flow
- **Endpoint Name:** Flow (Family A: AP-SM-BK-RT)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (seats 14C and 14D) -&gt; Book (ResponseId/selectedOfferId = GetSeatMap's, passengersSelectedSeats on both legs) -&gt; Retrieve; round trip BAH-RUH 2027-05-03 / RUH-BAH 2027-05-10, 1 ADT, pnr OOERGR; second Retrieve repeated to confirm
- **Response:** Book 200 (50.9s): both seats echoed, totalSelectedSeatsAmount 120, paxTotalSeatAmount 120, totalAmount 1730.00. Retrieve 200: both seats echoed and priceDetails identical, BUT passengerFareBreakdown[0].paxTotalSeatAmount = 60.00 (Book: 120.00) and paxTotalAmount = 1670.00 (Book: 1730.00)
- **Expected:** Per-family state check (6.3 Family A) plus seat-specific checks: Book and Retrieve both echo passengersSelectedSeats matching the selection; totalSelectedSeatsAmount non-zero and reconciles into totalAmount
- **Actual:** Book and Retrieve both echo the two seats (14C, 14D) and priceDetails.totalSelectedSeatsAmount = 120.00 reconciles into totalAmount 1730.00 (849 + 761 + 0 + 120) on both. But the Retrieve response is internally inconsistent for a multi-seat booking: the passenger line shows paxTotalSeatAmount 60.00 while its passengerSeats hold two 60.00 seats (120.00), and paxTotalAmount 1670.00 (= 849 + 761 + 60) does not equal the Book response's 1730.00 or the offer total, so the per-passenger totals no longer sum to totalAmount. It reproduced on a second Retrieve and on the two-passenger round trip (paxTotalSeatAmount 60 for seats worth 100 each, per-passenger totals summing to 3340 against 3420). Round 6's round-trip Retrieve was consistent (240 for two 120 seats), so this is a new defect (BUG-18).
- **Status:** FAIL
- **Evidence:** Book passengerFareBreakdown[0]: paxTotalSeatAmount 120, paxTotalAmount 1730; Retrieve (2 calls): paxTotalSeatAmount 60, paxTotalAmount 1670, passengerSeats [14C 60, 14D 60]; two-passenger booking OOBWZB: Retrieve per-pax seat total 60 vs 100, per-pax totals 1670+1670 = 3340 vs totalAmount 3420

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 125 offers, offer[0] totalAmount 1610 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1610 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 2 segment(s), 358 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OOERGR, bookingToken TPC60517146726D3092026, tickets 722136997209
  - **Hop 6 &mdash; Retrieve:** FAIL &mdash; 200
  - **Hop 7 &mdash; Retrieve:** FAIL &mdash; 200

### FLOW-V2-50-SEATFIELD — FAIL

- **Test Case:** Verify that GetSeatMap's chosen seat cannot be attached via Hold directly, and must instead go through the new SeatAfterHold endpoint.
- **Category:** Flow
- **Endpoint Name:** Flow (Family B: AP-SM-HD)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (seat 14C) -&gt; Hold with passengersSelectedSeats included on the Hold body (fresh never-held offer, BAH-RUH 2027-05-26) -&gt; FareConfirmAfterHold (PnrReprice) -&gt; Retrieve
- **Response:** Hold 200 (25.1s) - pnr RKECRA, holdExpirationDate null, passengersSelectedSeats.PAX1 = {14C, 60 SAR}, totalSelectedSeatsAmount 60; FareConfirmAfterHold 409 OperationNotSupported; Retrieve 200 - bookingStatus "OnHold", seat 14C still echoed
- **Expected:** UNKNOWN - confirm live whether Hold silently ignores an unrecognized passengersSelectedSeats field, rejects it, or (surprisingly) accepts it; check whether Retrieve shows passengersSelectedSeats without a SeatAfterHold call
- **Actual:** STILL REPRODUCES (BUG-08). Hold does not ignore or reject the field: it accepts it, prices the seat into the held offer (totalSelectedSeatsAmount 60.00) and Retrieve shows the seat on the OnHold booking, all without any SeatAfterHold call. This contradicts SPEC.md 1.10 item 6 / 2.10, which describe Hold as having no seat field. New: FareConfirmAfterHold (PnrReprice) is rejected for GulfAir with 409 OperationNotSupported, so the flow cannot reach its documented fourth step.
- **Status:** FAIL
- **Evidence:** Hold echoed passengersSelectedSeats.PAX1 = {14C, 60 SAR}; Retrieve OnHold with the same seat; PnrReprice 409 ErrorCode OperationNotSupported "GulfAir does not exist(s)"; holdExpirationDate null (BUG-04)

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 200 - pnr RKECRA, holdExpirationDate null
  - **Hop 6 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 7 &mdash; Retrieve:** PASS &mdash; 200

### FLOW-V2-CANDIDATE-SM-HOLD-01 — FAIL

- **Test Case:** Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold, before FareConfirmAfterHold.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-A)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold (pnr OWRLBM, BAH-JED 2027-05-20) -&gt; SeatAfterHold immediately after Hold -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Response:** SeatAfterHold 409 OperationNotSupported; FareConfirmAfterHold 409 OperationNotSupported; BookAfterHold 200 (ticket 722136997158); Retrieve 200 - no seat
- **Expected:** UNKNOWN by design - if this position is right, SeatAfterHold succeeds and Retrieve shows the seat; if wrong, SeatAfterHold or a later step rejects
- **Actual:** STILL REPRODUCES (BUG-03). The chain fails at the SeatAfterHold hop: GulfAir is rejected outright (409 OperationNotSupported). It was continued to the end for information: FareConfirmAfterHold is also unsupported for GulfAir (409), BookAfterHold finalizes the booking and the final Retrieve carries no seat.
- **Status:** FAIL
- **Evidence:** SAH 409 OperationNotSupported "GulfAir does not exist(s)"; PnrReprice 409; BookAfterHold 200 pnr OWRLBM; Retrieve pSS {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1202 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1202 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr OWRLBM, holdExpirationDate null
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 6 &mdash; PnrReprice:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 7 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr OWRLBM, bookingToken TPC60517146728D3092026, tickets 722136997158
  - **Hop 8 &mdash; Retrieve:** FAIL &mdash; 200

### FLOW-V2-CANDIDATE-SM-HOLD-02 — BLOCKED

- **Test Case:** Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-B)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold (pnr OODBGD, BAH-DMM 2027-05-21) -&gt; FareConfirmAfterHold -&gt; SeatAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Response:** FareConfirmAfterHold 409 OperationNotSupported; SeatAfterHold 409 OperationNotSupported; BookAfterHold 200 (ticket 722136997213); Retrieve 200 - no seat
- **Expected:** UNKNOWN by design - same logic as candidate 01, testing whether re-pricing must come before or after the seat
- **Actual:** Blocked. The chain cannot be built as designed: its third step (FareConfirmAfterHold) is rejected for GulfAir, and SeatAfterHold is rejected at supplier level regardless of position, so the before/after-re-pricing question cannot be answered. Executed to the end this round (Rounds 1-6 reasoned this one blocked without running it).
- **Status:** BLOCKED
- **Evidence:** PnrReprice 409; SAH (position B) 409; BookAfterHold 200 pnr OODBGD; Retrieve pSS {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1372 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1372 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr OODBGD, holdExpirationDate null
  - **Hop 5 &mdash; PnrReprice:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 6 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 7 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr OODBGD, bookingToken TPC60517146730D3092026, tickets 722136997213
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200

### FLOW-V2-CANDIDATE-SM-HOLD-03 — BLOCKED

- **Test Case:** Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-C)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold (pnr OWZVVL, BAH-RUH 2027-05-25) -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; SeatAfterHold -&gt; Retrieve
- **Response:** FareConfirmAfterHold 409 OperationNotSupported; BookAfterHold 200 (ticket 722136997157); SeatAfterHold 409 OperationNotSupported; Retrieve 200 - no seat
- **Expected:** UNKNOWN by design - rejected if seat selection is a pre-ticketing step only, or accepted with the seat shown on Retrieve if post-finalization changes are allowed
- **Actual:** Blocked. SeatAfterHold is rejected with the same supplier-level 409 after the booking is finalized, exactly as at every other position, so it says nothing about whether post-finalization seat changes are allowed. Executed to the end this round (Rounds 1-6 reasoned this one blocked without running it).
- **Status:** BLOCKED
- **Evidence:** PnrReprice 409; BookAfterHold 200 pnr OWZVVL; SAH (position C) 409; Retrieve pSS {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr OWZVVL, holdExpirationDate null
  - **Hop 5 &mdash; PnrReprice:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 6 &mdash; BookAfterHold:** PASS &mdash; 200 - pnr OWZVVL, bookingToken TPC60517146731D3092026, tickets 722136997157
  - **Hop 7 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG — BLOCKED

- **Test Case:** Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken triple carried over from a different, unrelated Hold call earlier in the same test session.
- **Category:** Flow
- **Endpoint Name:** Flow (candidate SM-Hold-A, negative)
- **Request:** Chain of candidate 01 up to Hold (pnr OWRLBM), then SeatAfterHold with the pnr/gdsPNR/bookingToken of an earlier, unrelated Hold (OTANEN)
- **Response:** 409 OperationNotSupported "GulfAir does not exist(s)" in 0.5s - identical to the baseline rejection
- **Expected:** Request rejected (exact status UNKNOWN), same class as TC-SEATAFTERHOLD-NEG-01 but inside a full flow context
- **Actual:** Actually attempted; the supplier-level rejection (BUG-03) fires before any identity check, so a stale identity cannot be told apart from a valid one. Not meaningfully testable for GulfAir. Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** 409 OperationNotSupported with a stale pnr/token; same envelope as the valid-identity baseline

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1202 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1202 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr OWRLBM, holdExpirationDate null
  - **Hop 5 &mdash; SeatAfterHold (stale identity):** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.

### TC-BOOK-BIZ-05 — FAIL

- **Test Case:** Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** AddPassenger (ADT PAX1 + CHD PAX2, BAH-DMM 2027-06-19) -&gt; GetSeatMap (exit-row seat 10A, description EXIT_ROW_SEAT) -&gt; Book assigning 10A to the CHD passenger PAX2 and 15F to the ADT
- **Response:** 200 - pnr OODUCQ, both passengers ticketed (722136997202/722136997203) after 52.1s; PAX2 (CHD) seat 10A 60.00 SAR echoed, no error
- **Expected:** Automatable assertion: the request is rejected (candidate error RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD, UNKNOWN - record the exact code) and no pnr is created
- **Actual:** STILL REPRODUCES in its worsened form (BUG-09). GetSeatMap itself lists the exit-row cell 10A in the CHD passenger's allow-list and prices it for the CHD; Book then accepts the CHD in an exit-row seat with zero validation, creates the PNR and tickets both passengers. No child/exit-row restriction exists anywhere in the flow.
- **Status:** FAIL
- **Evidence:** CHD PAX2 allow-list contains 10A (24 of 24 exit-row cells offered); Book 200; pnr OODUCQ; passengersSelectedSeats.PAX2 = {10A, 60 SAR}; total 2655 = base 1829 + tax 706 + seats 120

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 2535 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr OODUCQ, bookingToken TPC60517146718D3092026, tickets 722136997202/722136997203

### TC-BOOK-NEG-07 — PASS

- **Test Case:** Validate Book rejects a request that assigns the same seat cell to two different passengers.
- **Category:** Negative
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Two-ADT chain (BAH-CAI 2027-06-20); Book with PAX1 and PAX2 both selecting the identical cellCode/cellId (17C) for the same segment
- **Response:** 400 NDC-INT-TEC-A0001 in 0.1s: "Seat '17C' is assigned to multiple passengers on segment 'GF-GF79-GF79-2027062000-2027062003-O'."; no pnr
- **Expected:** Request rejected before any supplier round-trip (candidate error DUPLICATE_SEAT_SELECTION_IN_REQUEST, exact status UNKNOWN); no pnr created
- **Actual:** Rejected cleanly and fast (0.1s, so before any supplier call) with a specific, on-point validation message naming the seat and segment. The candidate code DUPLICATE_SEAT_SELECTION_IN_REQUEST is not used - the envelope is the generic 400 NDC-INT-TEC-A0001 with the message in Context. No booking was created. Unchanged from Rounds 5-6. (This is a different scenario from BUG-07, which is a cross-offer cellId.)
- **Status:** PASS
- **Evidence:** HTTP 400 in 0.1s; ErrorCode NDC-INT-TEC-A0001; Context: Seat '17C' is assigned to multiple passengers; no pnr in the response

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 15 offers, offer[0] totalAmount 3164 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 3164 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again.

### TC-BOOK-NEG-08 — PASS

- **Test Case:** Validate Book rejects a request where the same passenger selects two different seats on the same segment.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (BAH-RUH 2027-05-27, 1 ADT) with a hand-built raw JSON body that repeats the same segmentRefId key twice under passengersSelectedSeats.PAX1.setSegmentsSeats - first entry seat 14C, second entry seat 14D (a normal JSON client cannot produce this; the body was written as raw text)
- **Response:** 200 - pnr OSEOSA ticketed (722136997222) after 49.4s; only the second seat (14D, 60.00 SAR) attached; the first was silently discarded; no error
- **Expected:** UNKNOWN - setSegmentsSeats is an object keyed by segmentRefId, so a duplicate cannot be submitted by a normal client; document the constraint and verify the last-value-wins behavior is understood rather than asserting a specific API rejection
- **Actual:** Constraint documented and behavior observed: in valid JSON the segment key can appear only once, and when a raw body forces the duplicate the server keeps the LAST value (seat 14D) and drops the first (14C) without any error or warning. So two different seats on one segment for one passenger is impossible to express, and a client bug that repeats the key is silently resolved to the last entry.
- **Status:** PASS
- **Evidence:** raw body carried the segment key twice; response passengersSelectedSeats.PAX1.&lt;segment&gt; = {14D, 60 SAR}; seat 14C absent; total 1053

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OSEOSA, bookingToken TPC60517146737D3092026, tickets 722136997222

### TC-BOOK-BIZ-06 — PASS

- **Test Case:** Verify an Infant (INF) passenger travelling on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** AddPassenger (ADT PAX1 + INF PAX2, ParentPaxRefId = Pax1, BAH-RUH 2027-06-23) -&gt; GetSeatMap (only PAX1/ADT appears) -&gt; Book with a seat (14C) for the ADT only; INF absent from passengersSelectedSeats
- **Response:** 200 - pnr RICPGV, both passengers ticketed (722136997205/722136997206) after 55.2s; PAX1 (ADT) paxTotalSeatAmount 60.00, PAX2 (INF) paxTotalSeatAmount 0.00 with passengerSeats []; totalSelectedSeatsAmount 60.00
- **Expected:** Book succeeds; the INF has paxTotalSeatAmount 0 (or absent) and no passengerSeats; the ADT paxTotalSeatAmount matches the seat price; totalSelectedSeatsAmount equals only the ADT seat price, not double-counted
- **Actual:** All assertions hold. The infant needs no placeholder entry in passengersSelectedSeats: INF paxTotalSeatAmount 0.00 SAR with empty passengerSeats, ADT 60.00 SAR, totalSelectedSeatsAmount 60.00 SAR (once). Fare lines: ADT 993.00 + INF 111.00 = 1104.00 = totalAmount. Unchanged from Rounds 5-6.
- **Status:** PASS
- **Evidence:** passengerFareBreakdown: PAX1 ADT seats [14C 60 SAR] seatTotal 60; PAX2 INF seats [] seatTotal 0; totalSelectedSeatsAmount 60; passengersList.PAX2.parentPaxRefId "PAX1"

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 1044 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1044 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr RICPGV, bookingToken TPC60517146721D3092026, tickets 722136997205/722136997206

### TC-BOOK-NEG-09 — BLOCKED

- **Test Case:** Validate graceful rollback (no orphaned PNR or charge) when the supplier's seat allocation call fails or times out after Book is submitted with a seat selection.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Best available attempt to provoke a supplier-side seat-allocation failure from the request alone: Book (BAH-JED 2027-05-28, 1 ADT) with a schema-valid but non-existent cellCode "99Z" and a real cellId borrowed from another seat
- **Response:** 200 - pnr REPIRE ticketed (722136997159) after 34.1s; passengersSelectedSeats {}; no seat fee; no error
- **Expected:** Response is an error (candidate HTTP 422/502) and either no pnr is returned or a follow-up Retrieve shows the booking without the failed seat and without a seat fee; exact behavior UNKNOWN and environment-dependent
- **Actual:** Blocked: a supplier-side allocation failure cannot be forced from the request. The probe did not provoke one - the invalid code was accepted and silently dropped (booking ticketed without a seat, no fee), the same silent-drop pattern seen in TC-BOOK-NEG-05 and BUG-07. No rollback path was exercised. A test double or a team-coordinated failure trigger is still needed. Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** Book 200; pnr REPIRE; passengersSelectedSeats {}; totalSelectedSeatsAmount 0; totalAmount 1143

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 200 - pnr REPIRE, bookingToken TPC60517146736D3092026, tickets 722136997159

### TC-BOOK-VAL-07 — PASS

- **Test Case:** Validate that submitting a second, different passengersSelectedSeats selection supersedes an earlier selection made earlier in the same test session (late seat-change-before-submission).
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** One Book request built with seat 12C then sent once (no second selection is ever transmitted) - pnr ORUXWA
- **Response:** 200 - only seat 12C appears in passengersSelectedSeats / passengerSeats / totalSelectedSeats
- **Expected:** Book succeeds and reflects exactly the seat that was transmitted; no other/earlier seat appears anywhere in the response
- **Actual:** The single Book call carried cell 12C and the response reflects only 12C at every location (60.00 SAR); no other cell code appears. This is a client-side construction check: only one Book is ever sent, so there is no cached/earlier selection to leak. Every Book sent this round is checked the same way.
- **Status:** PASS
- **Evidence:** transmitted cellCode 12C; response cellCodes found: [12C]

### TC-BOOK-BIZ-07 — BLOCKED

- **Test Case:** Validate a designated wheelchair-accessible seat can be selected for a passenger flagged for special assistance, and the assignment is preserved.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Would need a wheelchair-accessible cell identified from cellCharacteristics/description; every GetSeatMap response this round (34 distinct segments, ~6,470 seat cells) scanned for such a value
- **Response:** N/A - no wheelchair / WCHR / accessible value in the 15-value description vocabulary
- **Expected:** UNKNOWN - Book/Retrieve succeed with the seat attached; any SSR-linkage behavior found is a new SPEC.md finding
- **Actual:** Not executable: the vocabulary (CHARGEABLE_SEAT, LEG_SPACE_SEAT, FRONT_OF_CABIN, SEAT_WITH_BASSINET_FACILITY, BULKHEAD_SEAT, LEFT/RIGHT_SIDE_OF_AIRCRAFT, CENTER_SEAT, AISLE_SEAT, WINDOW, OVER_WING_SEAT_S, EXIT_ROW_SEAT, PREFERRED_SEAT_PREFERENTIAL_SEAT, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL) contains no wheelchair designation. Two values are new since Round 6: NOT_ALLOWED_FOR_INFANTS (exit rows) and NOT_ALLOWED_FOR_MEDICAL (exit rows and a few rear rows) - restrictions, not accessibility markers. Not called.
- **Status:** BLOCKED
- **Evidence:** description values across all maps: 15 distinct, none wheelchair-related; NOT_ALLOWED_FOR_INFANTS on exit-row cells only; NOT_ALLOWED_FOR_MEDICAL on exit-row cells and rear-row cells

  - **Hop 1 &mdash; GetSeatMap:** BLOCKED &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells

### TC-BOOK-VAL-08 — PASS

- **Test Case:** Verify the currency code is consistent (not a generic placeholder like "string") across every seat-price object in one Book response.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Book response with one paid seat (pnr ORUXWA) - every seat-related price.currency value collected and compared
- **Response:** 200 - 5 seat-related currency values, all "SAR"
- **Expected:** Every seat-related price.currency identical (matching the offer currency) and none equal to the literal "string" or null/empty
- **Actual:** All five values are "SAR" (passengersSelectedSeats price, passengerSeats price, paxTotalSeatAmount, totalSelectedSeatsAmount, totalSelectedSeats price); none is "string", null or empty. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** currency values: SAR,SAR,SAR,SAR,SAR

### TC-BOOK-REG-03 — PASS

- **Test Case:** Verify selectedOffer.passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount when exactly one seat is selected.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Book response for one paid seat on one passenger (pnr ORUXWA, seat 12C) - passengerSeats[0].price.amount compared with paxTotalSeatAmount.amount
- **Response:** 200 - passengerSeats[0].price = 60.00 SAR; paxTotalSeatAmount = 60.00 SAR
- **Expected:** The two amounts are exactly equal and in the same currency; any mismatch is a confirmed defect
- **Actual:** 60.00 == 60.00 SAR, same currency. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** selectedOffer.passengerFareBreakdown[0].passengerSeats[0].price {60, SAR}; paxTotalSeatAmount {60, SAR}

### TC-BOOK-NEG-10 — PASS

- **Test Case:** Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object ({}) rather than omitted.
- **Category:** Negative
- **Endpoint Name:** AddPassenger -&gt; Book
- **Request:** Book (BAH-DXB 2027-05-06, 1 ADT) with passengersSelectedSeats sent explicitly as an empty object {} (field present, not omitted)
- **Response:** 200 - pnr OUDTDR ticketed (722136997156) after 37.2s; passengersSelectedSeats {} in the response; totalSelectedSeatsAmount 0.00 SAR
- **Expected:** Book succeeds (HTTP 200), no seat fee (totalSelectedSeatsAmount 0 or absent), passengersSelectedSeats empty/absent in the response, no 500-level error from the explicit empty object
- **Actual:** Succeeded exactly as expected: HTTP 200, real ticketed PNR, passengersSelectedSeats {} echoed, totalSelectedSeatsAmount 0.00 SAR (totalSelectedSeats []), no error. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** Book 200; pnr OUDTDR; passengersSelectedSeats {}; totalSelectedSeatsAmount {0, SAR}; totalAmount 1081

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 1081 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1081 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 - pnr OUDTDR, bookingToken TPC60517146725D3092026, tickets 722136997156

### TC-BOOK-NEG-11 — PASS

- **Test Case:** Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object.
- **Category:** Negative
- **Endpoint Name:** AddPassenger -&gt; Book
- **Request:** Book (BAH-DMM 2027-05-07, 1 ADT) with passengersSelectedSeats.PAX1.setSegmentsSeats sent as an empty object {} (passenger key present, no segment/cell)
- **Response:** 200 - pnr OWXBXK ticketed (722136997207) after 34.5s; passengersSelectedSeats {}; no seat attached
- **Expected:** Book succeeds; no seat attached for the passenger; no error from the otherwise-empty nested object
- **Actual:** Succeeded exactly as expected: HTTP 200, real ticketed PNR, no seat, totalSelectedSeatsAmount 0.00 SAR, no error. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** Book 200; pnr OWXBXK; passengersSelectedSeats {}; totalSelectedSeatsAmount {0, SAR}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1372 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1372 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 - pnr OWXBXK, bookingToken TPC60517146723D3092026, tickets 722136997207

### TC-BOOK-NEG-12 — FAIL

- **Test Case:** Validate Book rejects requests with each mandatory field individually omitted: ResponseId/fareConfirmResponseId, selectedOfferId/SelectedOfferId, supplier, credentialsSelector.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** 4 variants of a no-seat Book payload, each on its own fresh offer, with exactly one mandatory field removed: ResponseId (BAH-JED 2027-05-09), selectedOfferId (BAH-DXB 2027-05-11), supplier (BAH-DMM 2027-05-12), credentialsSelector (BAH-CAI 2027-05-14)
- **Response:** omit ResponseId -&gt; 200, real PNR OWUAIY created and ticketed (722136997208) after 35.2s; omit selectedOfferId -&gt; 400; omit supplier -&gt; 400; omit credentialsSelector -&gt; 400
- **Expected:** All four runs rejected (exact status UNKNOWN); no pnr created in any run
- **Actual:** STILL REPRODUCES (BUG-05). Three runs are cleanly rejected with a 400 in under a second (omit selectedOfferId: 400 NDC-INT-TEC-A0001 "The selected offer is invalid, expired, or could not be found"; omit supplier / credentialsSelector: 400 errorCode 1001 naming the missing field) - no 500s, so BUG-13 stays resolved. Omitting ResponseId is accepted: Book returns 200 and creates a real ticketed PNR, although ResponseId is a documented required field. (Rounds 5-6 recorded this case as PASS with the ResponseId run set aside; the expected result says all four must be rejected, so it is recorded as FAIL here.)
- **Status:** FAIL
- **Evidence:** omit ResponseId 200, pnr OWUAIY, ticket 722136997208; omit selectedOfferId 400 A0001; omit supplier 400 1001 "Select a valid Supplier"; omit credentialsSelector 400 1001 "Select a valid CredentialsSelector"

  - **Attempt 1 of 4 - ResponseId omitted (BAH-JED 2027-05-09):** HTTP 200
  - **Attempt 2 of 4 - selectedOfferId omitted (BAH-DXB 2027-05-11):** HTTP 400
  - **Attempt 3 of 4 - supplier omitted (BAH-DMM 2027-05-12):** HTTP 400
  - **Attempt 4 of 4 - credentialsSelector omitted (BAH-CAI 2027-05-14):** HTTP 400

### TC-SEATMAP-VAL-05 — PASS

- **Test Case:** Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - every cellCharacteristics[] (padisCode + description) pair across all 174 seat cells read
- **Response:** 200 - 780 characteristics entries, every padisCode = "Unknown"; 11 distinct description strings
- **Expected:** For every padisCode observed, description must not contradict its known meaning per the PADIS reference table; codes outside the table are logged, not failed
- **Actual:** GulfAir's adapter never populates a real padisCode (780 of 780 are "Unknown"), so no code can contradict its description; the description strings are self-describing enums (CHARGEABLE_SEAT, FRONT_OF_CABIN, WINDOW, LEFT/RIGHT_SIDE_OF_AIRCRAFT, CENTER_SEAT, AISLE_SEAT, OVER_WING_SEAT_S, EXIT_ROW_SEAT, PREFERRED_SEAT_PREFERENTIAL_SEAT, LEG_SPACE_SEAT). Logged, not failed. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** characteristics=780, padisCode Unknown=780; descriptions: CHARGEABLE_SEAT 174, PREFERRED_SEAT_PREFERENTIAL_SEAT 120, LEFT_SIDE 87, RIGHT_SIDE 87, WINDOW 58, CENTER 58, AISLE 58, FRONT_OF_CABIN 54, OVER_WING 48, EXIT_ROW 24, LEG_SPACE 12

### TC-SEATMAP-BND-03 — PASS

- **Test Case:** Verify AvailableFree is accepted as a real cellAvailability value (confirmed via saved example) and confirm live whether AvailableAfterReservation is also real, beyond the four now-evidenced values (AvailablePaid, Blocked, Occupied, AvailableFree).
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap sampled across 34 distinct GulfAir/KSA segments on four aircraft types (BAH to RUH, JED, DXB, DMM, CAI; the A320 GF103 map is the representative one) - every cell scanned for cellAvailability / paxCellAvailability values
- **Response:** 200 - AvailableFree seen live: seat 8E on the A320 (GF103, BAH-DMM) has paxCellAvailability "AvailableFree" for every passenger with all three prices 0.00 SAR while cellAvailability is "AvailablePaid"; AvailableAfterReservation never seen
- **Expected:** AvailableFree confirmed via the saved AirArabia example; AvailableAfterReservation still UNKNOWN - if never observed, record it as an unconfirmed QC-checklist-only candidate
- **Actual:** New live evidence: AvailableFree is a real value on GulfAir too, at the per-passenger level (8E, the bassinet seat, on all 5 GF103 maps sampled, 6 passenger entries). It differs from the saved AirArabia example in one respect: the AirArabia AvailableFree cells carry null pricing, whereas GulfAir returns explicit 0.00 SAR price objects (total = base + taxes = 0) and keeps the overall cellAvailability at AvailablePaid. AvailableAfterReservation was not observed in any of the 34 segments and stays an unconfirmed candidate.
- **Status:** PASS
- **Evidence:** GF103 (equipment 320) maps: 8E paxCellAvailability AvailableFree x6 entries, totalPrice 0 SAR; overall cellAvailability AvailablePaid; no cell anywhere shows AvailableAfterReservation

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-10, 32Q):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells
  - **Hop 2 &mdash; GetSeatMap (chain H, BAH-DMM 2027-06-19, 320, ADT+CHD):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-VAL-06 — PASS

- **Test Case:** Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - every cell partitioned by cellCategory; Aisle / Seat / NoSeat cells checked for column and cellDetails
- **Response:** 200 - 30 Aisle, 174 Seat, 6 NoSeat cells
- **Expected:** Aisle implies column null and cellDetails null; Seat implies column non-null and cellDetails a populated object
- **Actual:** 0 violations. All 30 Aisle cells have column null and cellDetails null; all 174 Seat cells have a letter column (A-F) and a populated cellDetails object. The 6 NoSeat cells (row 8) have a real column letter and cellDetails null - outside this rule, noted only.
- **Status:** PASS
- **Evidence:** Aisle=30 violations=0; Seat=174 violations=0; NoSeat=6 (column A-F, cellDetails null)

### TC-RETRIEVE-REG-01 — PASS

- **Test Case:** Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed (Retrieve After Issue).
- **Category:** Regression
- **Endpoint Name:** Retrieve
- **Request:** Two Retrieve calls on the same pnr/gdsPNR/bookingToken (ORUXWA, seat 12C): #1 immediately after Book, #2 taken 14 minutes later
- **Response:** Both 200 - bookingStatus "Booked", ticketStatus "Booked" (ticket 722136997152); passengersSelectedSeats / passengerSeats / totalSelectedSeats / totalSelectedSeatsAmount identical in both (12C, 60.00 SAR)
- **Expected:** passengersSelectedSeats/passengerSeats/totalSelectedSeats/totalSelectedSeatsAmount in Retrieve #2 identical to Retrieve #1 - the seat does not disappear or change once ticketing completes
- **Actual:** The seat-related fields are byte-for-byte identical across both Retrieves. GulfAir tickets synchronously at Book time (ticket number and ticketingDate exist from the first Retrieve), so no Booked-to-ticketed transition can be observed on this supplier - best-effort per the test's own timing note; the persistence assertion holds. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** Retrieve #1 (2026-09-30T14:05:34.341Z) vs #2 (2026-09-30T14:19:43.887Z): seat fields identical; ticketingDate 2026-09-30 in both

  - **Hop 1 &mdash; Retrieve:** PASS &mdash; 200
  - **Hop 2 &mdash; Retrieve:** PASS &mdash; 200

### TC-BOOK-INT-04 — BLOCKED

- **Test Case:** Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent (both resolve to the same journey).
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Would need GetOfferBundles to return a JourneyKey/bundle code to submit next to a seat; capability re-checked on the same 51 FareConfirm calls
- **Response:** N/A - haveBundles=false on 51 of 51 FareConfirm calls
- **Expected:** Book succeeds; response reflects both the bundle and the seat without either overriding the other's pricing
- **Actual:** Not executable for GulfAir - no bundle capability on any sampled offer, so no JourneyKey/bundle code exists to cross-check against a seat's segmentRefId. Not called. Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** haveBundles=false on 51 of 51 FareConfirm calls

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR

### TC-SEATAFTERHOLD-VAL-02 — BLOCKED

- **Test Case:** Once SeatAfterHold's real contract is confirmed (TC-SEATAFTERHOLD-VAL-01), validate it rejects a seat/passenger reference that does not belong to the passengers established at AddPassenger/Hold time for this pnr.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** Sequenced behind TC-SEATAFTERHOLD-VAL-01 (which never resolved a request shape); a Held pnr with a known passenger set exists (OTANEN) but there is no confirmed passenger/seat field to reference a foreign passenger with
- **Response:** N/A - no request sent; every SeatAfterHold call this round returned 409 OperationNotSupported for GulfAir
- **Expected:** UNKNOWN - blocked on VAL-01 resolving the real request shape; then expect rejection analogous to AddPassenger's cross-field validation
- **Actual:** Still blocked: SeatAfterHold rejects GulfAir outright (BUG-03), so the confirmed request shape this case depends on does not exist yet. Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** SeatAfterHold 409 OperationNotSupported on 9 calls this round

  - **Hop 1 &mdash; Hold:** PASS &mdash; 200 - pnr OTANEN, holdExpirationDate null
  - **Hop 2 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier.

### TC-SEATMAP-POS-01 — PASS

- **Test Case:** Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails, matching the flight/segments established at FareConfirm.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap (GulfAir/KSA, BAH-RUH 2027-06-10, GF161, 1 ADT) with ResponseId/selectedOfferId = AddPassenger's IDs, after a fresh Search -&gt; FareConfirm -&gt; AddPassenger
- **Response:** 200 - supplier GulfAir, flightSegments (1 segment), passengersDetails (PAX1), seatMapDetails (1 segment, 30 rows, 174 seat cells)
- **Expected:** HTTP 200; supplier, flightSegments, passengersDetails, seatMapDetails all present and non-null; every seatMapDetails segment key also in flightSegments and in the offer's segments from FareConfirm/AddPassenger
- **Actual:** All four blocks present and non-null. The single seatMapDetails key GF-GF161-GF161-2027061002-2027061004-O appears identically in flightSegments and in FareConfirm's flightSegments (no orphan in either direction). AddPassenger's response carries only offerId/responseId (no segment list), so the segment cross-check is against FareConfirm. Unchanged from Rounds 1-6.
- **Status:** PASS
- **Evidence:** seatMapDetails keys=1, flightSegments keys=1, FareConfirm flightSegments keys=1, all equal; seat cells 174; correlationId d068eee2-a9f7-456a-bc88-f054ad15936b

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells

### TC-SEATMAP-NEG-01 — FAIL

- **Test Case:** Validate GetSeatMap is rejected (or returns an explicit not-supported response) when called for an offer whose isSeatMapRequired flag was false at FareConfirm/AddPassenger time.
- **Category:** Negative
- **Endpoint Name:** FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap called with AddPassenger IDs from two independent offers whose FareConfirm showed isSeatMapRequired=false (chain A BAH-RUH 2027-06-10, chain A2 BAH-JED 2027-06-13)
- **Response:** 200 on both chains - a fully populated seatMapDetails (30 rows / 28 rows) instead of a rejection
- **Expected:** GetSeatMap is rejected, or returns an explicit not-supported envelope, rather than a 200 with populated data
- **Actual:** STILL REPRODUCES (BUG-15). FareConfirm reports isSeatMapRequired=false (and haveBundles=false) on both offers, yet GetSeatMap returns HTTP 200 with a complete seat map on both. The flag is not enforced.
- **Status:** FAIL
- **Evidence:** FareConfirm selectedOffer.isSeatMapRequired=false on chains A and A2; GetSeatMap 200 with 174 and 161 seat cells respectively

  - **Hop 1 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993 SAR
  - **Hop 2 &mdash; GetSeatMap:** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells
  - **Hop 3 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 4 &mdash; GetSeatMap:** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells

### TC-SEATMAP-NEG-02 — FAIL

- **Test Case:** Validate GetSeatMap is rejected when the request otherwise targets a valid offer but no segment of that offer's itinerary is being queried (i.e., the offer/response pair does not correspond to any real segment).
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap with ResponseId from chain A's AddPassenger (BAH-RUH) but selectedOfferId from chain A2's (BAH-JED), and the reverse pairing
- **Response:** 200 both directions - run 1 returned the BAH-JED map (28 rows), run 2 the BAH-RUH map (30 rows)
- **Expected:** Request rejected (exact status UNKNOWN); no seatMapDetails returned for a pair that does not belong together
- **Actual:** STILL REPRODUCES (BUG-01). Both mismatched pairings were accepted with HTTP 200 and a full seat map; the result follows selectedOfferId and ResponseId is ignored.
- **Status:** FAIL
- **Evidence:** run 1 (respA+offerA2): 200, 28 rows (JED segment GF181); run 2 (respA2+offerA): 200, 30 rows (RUH segment GF161)

  - **Attempt 1 of 2 - ResponseId from chain A, selectedOfferId from chain A2:** HTTP 200
  - **Attempt 2 of 2 - ResponseId from chain A2, selectedOfferId from chain A:** HTTP 200

### TC-SEATMAP-NEG-03 — PASS

- **Test Case:** Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** Run 1: GetSeatMap with a fabricated GUID ResponseId and a fabricated selectedOfferId string. Run 2: a genuine ResponseId/selectedOfferId pair from chain B's AddPassenger, already consumed by a completed Book (pnr ONUNXZ)
- **Response:** Run 1: 400 NDC-INT-TEC-A0001 "Invalid request..." (context: SelectedOfferId "Failed to deserialize the selected offer") in 0.1s. Run 2: 200 - the full seat map (23 rows, 137 seat cells) is still returned
- **Expected:** Both runs rejected (exact status UNKNOWN); no seatMapDetails returned for either
- **Actual:** Run 1 (a genuinely fabricated pair) is cleanly rejected with a structured 400. Run 2 is NOT rejected: a real pair keeps working after its offer has been booked - IDs are not invalidated by use. Recorded PASS on the established basis of Rounds 1-6 (the fabricated-pair rejection is the defect check; reading a seat map for an already-booked offer is idempotent and is not tracked as a defect), but note the literal expected result for run 2 is not met.
- **Status:** PASS
- **Evidence:** run 1: 400 A0001 SelectedOfferId "Failed to deserialize the selected offer"; run 2: 200, 137 seat cells, pair already booked (pnr ONUNXZ)

  - **Attempt 1 of 2 - fabricated ResponseId / selectedOfferId:** HTTP 400
  - **Attempt 2 of 2 - genuine pair already consumed by a booking:** HTTP 200

### TC-SEATMAP-NEG-04 — FAIL

- **Test Case:** Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** 4 variants of a valid GetSeatMap body (chain A's AddPassenger IDs), each with exactly one mandatory field removed: supplier, credentialsSelector, ResponseId, selectedOfferId
- **Response:** omit supplier -&gt; 400; omit credentialsSelector -&gt; 400; omit ResponseId -&gt; 200 (full seat map); omit selectedOfferId -&gt; 400
- **Expected:** All four runs rejected (exact status UNKNOWN); no seatMapDetails returned in any run
- **Actual:** STILL REPRODUCES (BUG-02). Three of four runs are cleanly rejected with a 400 validation envelope (errorCode 1001, naming the missing field). Omitting ResponseId is accepted: HTTP 200 with the complete seat map, even though ResponseId is a documented required field.
- **Status:** FAIL
- **Evidence:** omit supplier 400 "Select a valid Supplier"; omit credentialsSelector 400 "Select a valid CredentialsSelector"; omit selectedOfferId 400 "The SelectedOfferId field is required."; omit ResponseId 200 with 30 rows

  - **Attempt 1 of 4 - supplier omitted:** HTTP 400
  - **Attempt 2 of 4 - credentialsSelector omitted:** HTTP 400
  - **Attempt 3 of 4 - ResponseId omitted:** HTTP 200
  - **Attempt 4 of 4 - selectedOfferId omitted:** HTTP 400

### TC-SEATMAP-NEG-05 — PASS

- **Test Case:** Validate GetSeatMap fails gracefully (a structured error, not a raw 500/stack trace) when the underlying supplier call fails or times out.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** No GetSeatMap supplier failure could be forced or occurred naturally. Error paths that could be exercised were inspected instead: a fabricated offer, a malformed JSON body and garbage ID values; plus a naturally occurring supplier failure on a neighbouring endpoint (FareConfirm, chain R4) as a reference
- **Response:** GetSeatMap: 400 structured envelope on all three probes (A0001 for the fabricated offer; errorCode 1001 "Validation errors occurred" for the malformed body and garbage IDs), no stack trace or raw supplier XML. FareConfirm R4: 409 NDC-INT-UNC-Z9999 "Error occurred while getting response from GF supplier" with the raw upstream SOAP request (including credentials) embedded
- **Expected:** A structured business-error envelope rather than an unhandled exception, stack trace or raw supplier XML; no internal type names or raw supplier payloads in the error body
- **Actual:** GetSeatMap's own error paths are graceful and structured. The half of the test that needs a real supplier failure could not be run for GetSeatMap, and the one natural supplier failure seen this round (on FareConfirm) does leak the raw upstream request and credentials in its envelope (BUG-11 re-confirmed) - so graceful supplier-failure handling is verified for the request-validation paths only. Recorded PASS on the established basis of Rounds 1-6.
- **Status:** PASS
- **Evidence:** fabricated offer 400 A0001; malformed body 400 errorCode 1001 (SeatMapRequestDto / $.ResponseId); garbage IDs 400 errorCode 1001; reference: FareConfirm R4 409 Z9999 with OriginalSupplierRequest present (credential values not recorded here)

  - **Attempt 1 of 4 - fabricated offer ids:** HTTP 400
  - **Attempt 2 of 4 - malformed JSON body:** HTTP 400
  - **Attempt 3 of 4 - non-GUID ResponseId and garbage selectedOfferId:** HTTP 400
  - **Reference - naturally occurring supplier failure at FareConfirm (not GetSeatMap):** HTTP 200

### TC-SEATMAP-VAL-07 — PASS

- **Test Case:** Verify seat attributes relevant to customer-facing seat selection (window, aisle, extra legroom/exit row) are programmatically derivable from cellCharacteristics for every Seat-category cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - all 174 Seat cells' cellCharacteristics read and classified as window / aisle / extra-legroom / exit-row
- **Response:** 200 - 780 characteristics; every padisCode "Unknown"; window/aisle/centre and exit-row/legroom markers present in description text
- **Expected:** For codes in the PADIS table the derived classification must not contradict column position or description text; codes outside the table are logged, not failed
- **Actual:** Every Seat cell's description carries a window/aisle/centre marker and a left/right-side marker, and 0 of 174 contradict the cell's column (A/F=WINDOW, C/D=AISLE_SEAT, B/E=CENTER_SEAT; A-C=LEFT, D-F=RIGHT). Extra legroom (LEG_SPACE_SEAT, 12 cells) and exit row (EXIT_ROW_SEAT, 24 cells, rows 18-21) are derivable from the text too. padisCode is "Unknown" everywhere, so the attributes are only derivable from description text (logged, not failed). Unchanged from Rounds 1-12.
- **Status:** PASS
- **Evidence:** column/description mismatches 0 of 174; WINDOW 58, AISLE_SEAT 58, CENTER_SEAT 58; EXIT_ROW_SEAT 24 (rows 18-21); LEG_SPACE 12; OVER_WING 48; padisCode Unknown 780/780

### TC-SEATMAP-VAL-08 — PASS

- **Test Case:** Verify seatPriceDetails/seatPriceDetailsByPassenger is populated (non-null) for every AvailablePaid cell and null/absent for every Blocked or Occupied cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Every cell of chain A's GetSeatMap response (and a cross-check over all maps) partitioned by cellAvailability; seatPriceDetails / seatPriceDetailsByPassenger presence checked per partition
- **Response:** 200 - chain A: 174 cells AvailablePaid; 36 further cells have cellDetails null (30 Aisle, 6 NoSeat); across all maps: 6,474 seat cells, all AvailablePaid
- **Expected:** Every AvailablePaid cell has populated seatPriceDetailsByPassenger; every Blocked/Occupied cell has null pricing
- **Actual:** AvailablePaid: every one of the ~6,470 seat cells has seatPriceDetailsByPassenger with totalPrice, basePrice and taxesPrice populated. The Blocked/Occupied half could not be exercised - no Blocked or Occupied cell exists for this supplier (taken seats appear as NoSeat with null cellDetails, so no pricing). No non-paid cell carries pricing (0 violations). The aggregate seatPriceDetails is null on every cell.
- **Status:** PASS
- **Evidence:** AvailablePaid n=6474 (all maps), missing byPax price=0; non-paid cells with pricing=0; Blocked/Occupied cells=0; chain A: AvailablePaid 174, byPax 174

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-10, 32Q):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** Verify cellCode is unique across all cells within one flight segment's seatMapDetails.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - every cellCode in the single segment collected and checked for duplicates
- **Response:** 200 - 174 Seat cells, 174 distinct cellCode values
- **Expected:** No cellCode repeats within one segment (a duplicate is a confirmed defect)
- **Actual:** No duplicates: 174 cellCodes, 174 unique (rows 9-38, columns A-F).
- **Status:** PASS
- **Evidence:** cellCodes=174 unique=174 duplicates=0 (segment GF-GF161-GF161-2027061002-2027061004-O)

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** Verify structural uniqueness and domain constraints across decks/zones/rows/columns: rowNumber unique within a segment, zoneId unique within a deck, column values restricted to {A,B,C,D,E,F,null}.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - cabinLayoutsByDeck and rows[] checked for uniqueness and column domain
- **Response:** 200 - 1 deck (Main), 1 zone (Cabin1, ECONOMY, columns A,B,C,null,D,E,F), 30 rows numbered 8-37
- **Expected:** rowNumber unique within the segment; zoneId unique within a deck; every non-null column in A-F; null column only on Aisle cells
- **Actual:** All four constraints hold: 30 row numbers, 30 unique; 1 zone in deck Main; Seat-cell columns are exactly {A,B,C,D,E,F}; the 30 null-column cells are all Aisle-category. Every row's deck/zoneId resolves to the declared layout.
- **Status:** PASS
- **Evidence:** rows=30 unique=30; decks=1; zones=1 (Main:Cabin1); seat columns A-F (29 each); null-column non-Aisle cells=0; rows with unresolved deck/zone=0

### TC-SEATMAP-BIZ-03 — PASS

- **Test Case:** Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported, may legitimately differ for the same cell, and are NOT required to list every passenger on the offer.
- **Category:** Business Rule
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap for a fresh 2-passenger offer (ADT + CHD, BAH-DMM 2027-06-19, A320) - every cell compared against each passenger's passengersSeatMapAvailability allow-list and per-passenger availability
- **Response:** 200 - 120 seat cells; PAX1 and PAX2 each have a 120-code allow-list; every cell's seatPriceDetailsByPassenger lists both PAX1 and PAX2
- **Expected:** A passenger listed in a cell's seatPriceDetailsByPassenger also has that cellCode in their allow-list; absence is valid and completeness is NOT asserted; overall and per-passenger availability may legitimately differ
- **Actual:** Internally consistent: 240 passenger-cell price entries (120 x 2), 0 listed for a cell absent from that passenger's allow-list, 0 allow-list codes without a priced cell. GulfAir lists every passenger on every cell, so the "absence is valid" branch could not be exercised (not required). Per-passenger and overall availability DO legitimately differ on one cell: 8E (bassinet seat) is AvailablePaid overall but AvailableFree for both passengers at 0.00 SAR. For context: the CHD passenger is offered every exit-row cell (24 of 24), the already-tracked BUG-09.
- **Status:** PASS
- **Evidence:** cells=120; listed-pax-set [PAX1,PAX2]=120 cells; listed-but-not-in-allow-list=0; allow-list-but-not-priced=0; paxCellAvailability != cellAvailability on 8E only (AvailableFree vs AvailablePaid); CHD PAX2 on 24/24 EXIT_ROW_SEAT cells

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 2535 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-BIZ-04 — PASS

- **Test Case:** Exploratory -- confirm GetSeatMap reflects real-time supplier inventory rather than a cached/stale snapshot.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; GetSeatMap
- **Request:** GetSeatMap #1 (chain C, BAH-RUH 2027-06-12, seat 12C AvailablePaid) -&gt; seat 12C taken by chain C's Book (pnr ORUXWA) -&gt; GetSeatMap #2 with the same offer ids -&gt; GetSeatMap on a fresh offer for the same flight
- **Response:** Call #1: 12C = Seat / AvailablePaid (60.00 SAR), 179 seat cells. After the booking: #2 (same offer) and a fresh-offer map both return 12C as NoSeat with cellDetails null (178 seat cells)
- **Expected:** UNKNOWN - if reliably forceable, the cell availability transitions between the calls, confirming a live supplier round-trip rather than a cached response
- **Actual:** CONFIRMED live inventory (as in Rounds 11-12). The seat was taken by this session's own booking, and both the same-offer re-read and a fresh-offer seat map dropped it immediately. A taken seat is still not reported as cellAvailability "Occupied": the cell becomes cellCategory "NoSeat" with cellDetails null. Response headers carry a CorrelationId only - no Cache-Control or ETag.
- **Status:** PASS
- **Evidence:** Row 12 seat C: AvailablePaid (before) -&gt; NoSeat/null (same-offer #2 and fresh offer); seat cells 179 -&gt; 178; response headers: content-encoding, content-type, correlationid, date, server (no Cache-Control/ETag)

  - **Hop 1 &mdash; GetSeatMap (call #1, baseline):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 2 &mdash; Book (occupy 12C):** PASS &mdash; 200 - pnr ORUXWA, bookingToken TPC60517146716D3092026, tickets 722136997152
  - **Hop 3 &mdash; GetSeatMap (call #2, same offer):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells
  - **Hop 4 &mdash; GetSeatMap (fresh offer, same flight):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells

### TC-SEATMAP-SEC-01 — FAIL

- **Test Case:** Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap.
- **Category:** Security
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid KSA offer: (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier/selector switched to TravelportNdc/UAE, (3b) same supplier GulfAir with credentialsSelector switched to UAE; extra probes: empty x-api-key, bogus selector ZZZ, omitted selector
- **Response:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 400 NDC-INT-TEC-A0001; (3b) 200 - the full seat map was returned; extras: empty key 401, bogus selector 400, omitted selector 400
- **Expected:** All three variants rejected (exact status/error shape UNKNOWN; reuse the envelope other endpoints produce)
- **Actual:** Two of the three checks pass cleanly; the third half-passes. A wrong supplier is rejected (400), but switching only credentialsSelector to another valid one for the same supplier (GulfAir/UAE) is NOT rejected: GetSeatMap returns the complete seat map for an offer created under KSA. credentialsSelector is still not enforced as an authorization boundary on GetSeatMap (BUG-17, 3rd round in a row).
- **Status:** FAIL
- **Evidence:** control 200; bad key 401 AuthenticationError; bad Client-Id 401; supplier switch 400 NDC-INT-TEC-A0001 "Failed to deserialize the selected offer"; GulfAir/UAE with a KSA offer 200 (full seat map, same responseId); empty key 401; ZZZ 400; omitted 400

  - **Control - valid headers, GulfAir/KSA (baseline):** HTTP 200
  - **Attempt 1 of 4 - invalid x-api-key:** HTTP 401
  - **Attempt 2 of 4 - invalid Client-Id:** HTTP 401
  - **Attempt 3 of 4 - cross-tenant: supplier switched to TravelportNdc/UAE:** HTTP 400
  - **Attempt 4 of 4 - cross-tenant: same supplier GulfAir, credentialsSelector switched KSA -&gt; UAE:** HTTP 200
  - **Extra probe - empty x-api-key:** HTTP 401
  - **Extra probe - bogus credentialsSelector (ZZZ):** HTTP 400
  - **Extra probe - credentialsSelector omitted:** HTTP 400

### TC-SEATMAP-SEC-02 — PASS

- **Test Case:** Record that supplier-side authentication security (this API's own credentials presented to the airline/GDS backend) and request/response logging are not independently verifiable through this API's black-box contract, and identify the correct verification channel for each.
- **Category:** Documentation
- **Endpoint Name:** GetSeatMap (documentation)
- **Request:** N/A - documentation/scope-boundary case, no live API call
- **Response:** N/A
- **Expected:** Documented per 1.5/1.8/PRD 7: AC8 (supplier-side authentication) and the logging half of AC9 are confirmable only via a backend credential/config audit and log/observability review, not through this suite; AC9 graceful-error half is covered by TC-SEATMAP-NEG-05
- **Actual:** Documented as specified; SPEC.md 1.5 and 1.8 and NDC_PRD.md Gap #1 (hardcoded x-api-key/Client-Id) re-checked and still say the same. AC8/AC9 must not be marked covered by API tests without the paired backend/config/log audit. Unchanged from Rounds 1-12.
- **Status:** PASS
- **Evidence:** No API call made, per the test case's own definition; SPEC.md headings 1.5 and 1.8 present (2/2) and the PRD Gap #1 line present (1/1)

### TC-SEATMAP-INT-02 — BLOCKED

- **Test Case:** Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols.
- **Category:** Integration
- **Endpoint Name:** GetSeatMap (multi-supplier)
- **Request:** Requires GetSeatMap against at least three suppliers spanning distinct native protocols (NDC XML/SOAP, EDIFACT, Navitaire)
- **Response:** N/A - out of scope: this run's scope is fixed to Supplier GulfAir, Credentials Selector KSA; no other supplier was called
- **Expected:** Every supplier's GetSeatMap response conforms to the identical schema documented in SPEC.md 2.7 regardless of native protocol
- **Actual:** Not executed - a cross-supplier comparison cannot be built from one supplier. GulfAir's own response shape was checked on 34 segments and is stable (see VAL-10, VAL-11, REG-02). Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** no calls made; scope Supplier=GulfAir/KSA only

### TC-SEATMAP-INT-03 — BLOCKED

- **Test Case:** Capability-matrix sweep -- run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable per SPEC.md §4.6, and record pass/fail per supplier.
- **Category:** Integration
- **Endpoint Name:** GetSeatMap (capability sweep)
- **Request:** Requires a full-roster sweep across every SPEC.md 4.6 supplier; only GulfAir/KSA was in scope. GulfAir's own row was re-confirmed live from the seat maps captured this round
- **Response:** GulfAir/KSA row: GetSeatMap 200 with a populated seatMapDetails on 34 of 34 segments sampled (BAH to RUH, JED, DXB, DMM, CAI); all other suppliers out of scope
- **Expected:** Every confirmed-capable supplier's GetSeatMap call succeeds with a populated seatMapDetails; not-capable suppliers fail gracefully; a per-supplier pass/fail table is maintained
- **Actual:** Not executed as a sweep. GulfAir/KSA is confirmed SeatMap-supported for the 7th round (with the caveat that seat maps are empty for departures after about early August 2027, and Search returns no offers after about mid-July 2027). No other supplier was called. Unchanged from Rounds 1-6.
- **Status:** BLOCKED
- **Evidence:** GulfAir/KSA: 34 of 34 sampled segments returned a populated seatMapDetails; departures from 2027-08-03 returned an empty seatMapDetails (0 rows)

### TC-SEATMAP-VAL-11 — PASS

- **Test Case:** Verify passengersSeatMapAvailability.&lt;paxRef&gt;.&lt;segmentRefId&gt; (the top-level per-passenger allow-list of cellCodes) stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - passengersDetails.PAX1.passengersSeatMapAvailability keys and allow-list checked against flightSegments / seatMapDetails
- **Response:** 200 - PAX1 allow-list keyed by segmentRefId then deck name ("Main"), 174 cellCodes
- **Expected:** Every segmentRefId key under passengersSeatMapAvailability matches the casing used elsewhere in the response; every allow-listed cellCode is a real cell in that segment
- **Actual:** The allow-list key is the full segmentRefId and matches the seatMapDetails/flightSegments key character-for-character; all 174 allow-listed codes exist as real cells and every AvailablePaid cell is on the list (0 missing). The block is nested one level deeper than SPEC.md describes (segment -&gt; deck "Main" -&gt; cellCode array). No casing inconsistency for GulfAir.
- **Status:** PASS
- **Evidence:** allow-list segment keys=1 (identical casing); deck keys [Main]; allow-list length 174; codes not present as cells=0; paid cells missing from allow-list=0

### TC-SEATMAP-BND-04 — PASS

- **Test Case:** Confirm live whether any cellCategory value beyond {Seat, Aisle} (e.g. Lavatory/Bathroom, Bulkhead, Galley, Closet, ExitRow, StairsToUpperDeck, WingBox, StorageBin, RestrictedZone, NoSeat, Other, per the full backend enum) is ever returned.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap across 34 distinct segments on four narrowbody aircraft types (320, 321, 32N, 32Q; all single deck) - every cellCategory value recorded
- **Response:** 200 - cellCategory values observed: Seat, Aisle, NoSeat
- **Expected:** UNKNOWN - record every distinct value beyond Seat/Aisle; do not assume Seat/Aisle are exhaustive or that the C# enum names match what the API serializes
- **Actual:** Beyond Seat and Aisle, only "NoSeat" was observed (a taken or absent seat; cellDetails null; matches CellCategory.md's NoSeat member). No Lavatory/Bathroom/Galley/Bulkhead/ExitRow/StairsToUpperDeck category appeared, and no widebody or double-deck aircraft is available to GulfAir/KSA in this sample, so the Lavatory-vs-Bathroom naming question stays unresolved.
- **Status:** PASS
- **Evidence:** distinct cellCategory values across ~7,000 cells: Seat, Aisle, NoSeat; equipment 320, 321, 32N, 32Q; decks: Main only

  - **Hop 1 &mdash; GetSeatMap (chain A, BAH-RUH 2027-06-10, 32Q):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 174 seat cells
  - **Hop 2 &mdash; GetSeatMap (chain H, BAH-DMM 2027-06-19, 320, ADT+CHD):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-BOOK-POS-04 — PASS

- **Test Case:** Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step.
- **Category:** Positive
- **Endpoint Name:** Book -&gt; Retrieve
- **Request:** Book with seat 12C (pnr ORUXWA) then an immediate Retrieve with no ticketing action taken in between
- **Response:** Retrieve 200 - bookingStatus "Booked", ticketStatus "Booked" (ticket 722136997152); passengersSelectedSeats.PAX1 = {12C, 60 SAR}; totalSelectedSeatsAmount 60.00 SAR
- **Expected:** Immediate post-Book Retrieve already shows the seat attached and priced while bookingStatus/ticketStatus still reads un-ticketed; if already ticketed with no intervening action, record it as a finding
- **Actual:** The seat is attached at Book time: Retrieve, taken right after Book with no other action, shows passengersSelectedSeats, passengerSeats and totalSelectedSeatsAmount populated. GulfAir tickets synchronously at Book (a ticket number and ticketingDate exist immediately), so there is no un-ticketed window to isolate - the same caveat as every prior round. The core assertion holds.
- **Status:** PASS
- **Evidence:** Retrieve #1: bookingStatus Booked, ticketStatus Booked, ticketingDate 2026-09-30T00:00:00, seat 12C 60.00 SAR; identical to the Book echo

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr ORUXWA, bookingToken TPC60517146716D3092026, tickets 722136997152
  - **Hop 2 &mdash; Retrieve:** PASS &mdash; 200

## Findings

### Defects

- **[FLOW-V2-49-SEATFIELD] BUG-18 (new) &mdash; Retrieve under-reports the per-passenger seat total on a multi-seat booking: paxTotalSeatAmount counts only one seat, so paxTotalAmount and the sum of the passenger totals fall short of priceDetails.totalAmount. The Book response for the same booking is correct.** Field: `selectedOffer.passengerFareBreakdown[].paxTotalSeatAmount / paxTotalAmount (Retrieve response)`. Expected: paxTotalSeatAmount {"amount":120,"currency":"SAR"} for two 60.00 seats, paxTotalAmount 1730.00, matching the Book response. **Impact:** A caller reading a booking back through Retrieve sees a seat total (60.00 instead of 120.00) and a per-passenger fare (1670.00 instead of 1730.00) that no longer add up to the booking total, so any invoice, refund or reconciliation built from the passenger lines is short by the missing seat(s). Not present in Round 6 (a round-trip Retrieve showed 240 for two 120 seats), so this looks like a regression. Evidence: Round-trip pnr OOERGR (seats 14C + 14D, 60.00 each): Book paxTotalSeatAmount 120 / paxTotalAmount 1730; Retrieve (called twice) paxTotalSeatAmount 60 / paxTotalAmount 1670 while passengerSeats lists both seats and priceDetails.totalSelectedSeatsAmount is 120 / totalAmount 1730. Two-passenger round trip pnr OOBWZB (four seats): Book per-passenger seat total 100 each; Retrieve 60 each, per-passenger totals 1670 + 1670 = 3340 vs totalAmount 3420. One-seat booking ORUXWA is unaffected (60 = 60).
- **[TC-SEATMAP-NEG-02] BUG-01 (occurrence 7, not new) &mdash; GetSeatMap accepts a ResponseId and selectedOfferId taken from two different offers and returns a full seat map; the result follows selectedOfferId and ResponseId is ignored.** Field: `ResponseId / selectedOfferId`. Expected: 4xx validation error for a ResponseId/selectedOfferId pair that does not belong together. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-3, 5, 6 (Round 4 blocked by an outage); not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** The pair is not cross-validated, so a wrong or mixed-up identifier pair silently returns another itinerary's seat map instead of failing, and ResponseId adds no protection. Evidence: ResponseId of chain A (BAH-RUH) with selectedOfferId of chain A2 (BAH-JED): 200, 28 rows (JED map); reverse pairing: 200, 30 rows (RUH map).
- **[TC-SEATMAP-NEG-04] BUG-02 (occurrence 7, not new) &mdash; GetSeatMap documents ResponseId as required, but a request that omits it still returns HTTP 200 with the full seat map; the other three mandatory fields are rejected with 400.** Field: `ResponseId`. Expected: 400 validation error naming ResponseId, like supplier, credentialsSelector and selectedOfferId. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-3, 5, 6 (not reproduced in Round 4); not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** A required field is not enforced, so integrations that forget ResponseId work by accident and the documented contract cannot be trusted. Evidence: omit supplier 400 "Select a valid Supplier"; omit credentialsSelector 400; omit selectedOfferId 400 "The SelectedOfferId field is required."; omit ResponseId 200 with 30 rows.
- **[TC-SEATMAP-NEG-01] BUG-15 (occurrence 7, not new) &mdash; GetSeatMap returns HTTP 200 with a complete seat map for offers whose FareConfirm reports isSeatMapRequired=false; the flag is not enforced.** Field: `isSeatMapRequired (FareConfirm) vs GetSeatMap response`. Expected: Rejection or an explicit not-supported envelope for an offer with isSeatMapRequired=false. **History:** Failing since Round 1 (2026-08-25), filed as its own BUG-15 in Round 5; reproduced Rounds 1-6; not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** The capability flag cannot be used to decide whether to show seat selection, and callers get seat data for offers that are not flagged as seat-map offers. Evidence: FareConfirm selectedOffer.isSeatMapRequired=false on all 51 calls this round; GetSeatMap 200 with 174 and 161 seat cells on chains A and A2.
- **[TC-SEATMAP-SEC-01] BUG-17 (occurrence 3, not new) &mdash; GetSeatMap does not reject a request whose credentialsSelector differs from the one the offer was created under (same supplier, different valid selector).** Field: `credentialsSelector`. Expected: 4xx rejection (offer not found / not authorized for this credentialsSelector), as happens when the supplier is switched. **History:** First observed Round 11 (2026-09-29); reproduced Round 12 (2026-09-30); reproduced again Round 13 (2026-09-30). **Impact:** credentialsSelector is the per-tenant boundary; a caller holding an offerId/responseId from one tenant (KSA) can read that offer's seat map through another tenant's selector (UAE), so cross-tenant isolation rests only on offer IDs being unguessable. Other offer-consuming endpoints were not tested. Evidence: Offer created under GulfAir/KSA; GetSeatMap with GulfAir/UAE -&gt; 200, full seat map, same responseId; supplier switched to TravelportNdc/UAE -&gt; 400 NDC-INT-TEC-A0001; invalid key / Client-Id -&gt; 401.
- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 9, not new) &mdash; Book accepts a cellId that was issued for a different offer's seat map: it runs the full booking, tickets it, and silently drops the seat (empty passengersSelectedSeats, no fee) instead of returning an error.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, with no booking created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7, 11, 12 (Round 4 blocked by an outage); reproduced again Round 13 (2026-09-30). **Impact:** The cellId token is not validated, so a stale or foreign token produces a booking with no seat and no error - the caller believes a seat was reserved. The same silent drop also happens for an unavailable or non-existent cellCode (TC-BOOK-NEG-05, TC-BOOK-NEG-09). Evidence: Book on offer E2 (cellCode 15B) with the cellId of seat 15C from offer E1: 200, pnr RFMLTX, passengersSelectedSeats {}, totalSelectedSeatsAmount 0, no error.
- **[TC-BOOK-NEG-06] BUG-06 (occurrence 7, not new) &mdash; Book accepts a tampered cellId (last 10 characters replaced) and books the seat named by cellCode; the token is never validated (also true for a cellId belonging to a different seat, TC-BOOK-VAL-06).** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx rejection of a token that fails the server-side decode/signature check. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-6; not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** The opaque cellId adds no integrity protection; the seat is chosen from the free-text cellCode alone, so forged or mismatched tokens are accepted. Evidence: Book (cellCode 14A, cellId with trailing XXXXXXXXXX): 200, pnr RALBKE, seat 14A attached at 60.00 SAR; Book (cellCode 15F, cellId of 15A): 200, pnr OWBPFD, seat 15F attached.
- **[TC-BOOK-NEG-12] BUG-05 (occurrence 7, not new) &mdash; Book documents ResponseId as required, but a Book request that omits it is accepted and creates a real, ticketed PNR; the other three mandatory fields are rejected with 400.** Field: `ResponseId`. Expected: 400 validation error naming ResponseId, no PNR created. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-6; not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** A required field is unenforced on the highest-blast-radius endpoint, and a malformed request still produces a real ticketed booking. Evidence: omit ResponseId 200, pnr OWUAIY; omit selectedOfferId 400 A0001; omit supplier 400 1001; omit credentialsSelector 400 1001.
- **[TC-BOOK-BIZ-05] BUG-09 (occurrence 9, not new) &mdash; A child passenger can be assigned an exit-row seat: GetSeatMap offers and prices all 24 exit-row cells to the CHD, and Book accepts the assignment, creates the PNR and tickets both passengers.** Field: `passengersSelectedSeats.&lt;paxRef&gt; (CHD) / GetSeatMap passengersSeatMapAvailability`. Expected: Exit-row cells absent from the CHD passenger's allow-list, and Book rejecting the assignment (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD) with no PNR created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 9, re-confirmed Round 12; reproduced again Round 13 (2026-09-30). **Impact:** A safety rule (no children in exit rows) is enforced nowhere in the API; the seat map even labels exit rows NOT_ALLOWED_FOR_INFANTS and NOT_ALLOWED_FOR_MEDICAL but has no child restriction, so any client that calls the API directly can ticket a child in an exit row. Evidence: ADT + CHD offer (BAH-DMM 2027-06-19): PAX2 (CHD) allow-list contains 10A and all 24 exit-row cells; Book 200, pnr OODUCQ, PAX2 seat 10A 60.00 SAR, both passengers ticketed.
- **[TC-SEATAFTERHOLD-POS-01] BUG-03 (occurrence 7, not new) &mdash; SeatAfterHold rejects every call for supplier GulfAir with HTTP 409 OperationNotSupported ("GulfAir does not exist(s)") before reading any field, while GulfAir offers are Hold-capable and Hold succeeds.** Field: `SeatAfterHold response (supplier registration)`. Expected: 200 with the seat-selection response (or a documented validation error), or GulfAir being flagged as not supporting the operation before Hold is offered. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-6; not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** The Hold branch has no working seat-selection path for GulfAir, and six dependent test cases (VAL-01, NEG-01, NEG-02, VAL-02, INT-04, the candidate flows) cannot be evaluated. The same supplier-level 409 is now also returned by FareConfirmAfterHold (PnrReprice). Evidence: SeatAfterHold 409 OperationNotSupported on 9 of 9 calls with valid credentials (every chain position, mismatched and stale identities, extra field, cross-tenant variants); Hold OTANEN 200 in the same run.
- **[TC-SEATAFTERHOLD-NEG-02] BUG-04 (occurrence 7, not new) &mdash; Hold returns holdExpirationDate null for GulfAir on every call, so a Held booking has no known expiry.** Field: `holdExpirationDate`. Expected: "2026-10-01T14:32:10Z" (a future ISO-8601 timestamp). **History:** First observed Round 1 (2026-08-25); reproduced every round through Round 6; not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** Downstream cannot compute when a hold lapses, so expiry-based cleanup, the expired-hold negative tests and any customer-facing hold timer cannot work. Evidence: holdExpirationDate null on 6 of 6 Hold calls this round (OTANEN, OOESWB, OWRLBM, OODBGD, OWZVVL, RKECRA).
- **[FLOW-V2-50-SEATFIELD] BUG-08 (occurrence 7, not new) &mdash; Hold, documented as having no seat field, accepts passengersSelectedSeats, prices the seat into the held offer and Retrieve shows it on the OnHold booking, with no SeatAfterHold call.** Field: `Hold request: passengersSelectedSeats`. Expected: The field ignored or rejected (per the documented contract), or the contract updated to say Hold honors seats. **History:** First observed Round 1 (2026-08-25); reproduced Rounds 1-3, 5, 6 (Round 4 blocked by an outage); not exercised Rounds 7-12; reproduced again Round 13 (2026-09-30). **Impact:** The documented asymmetry between the Book and Hold branches is wrong for GulfAir, and an unvalidated seat selection (same unvalidated cellId as BUG-06/07) can be attached to a hold. Evidence: Hold RKECRA with passengersSelectedSeats.PAX1 {14C}: 200, seat echoed at 60.00 SAR, totalSelectedSeatsAmount 60; Retrieve bookingStatus OnHold with the same seat.

### Unknown-resolutions

- **[TC-SEATMAP-BND-03]** cellAvailability/paxCellAvailability value "AvailableFree" is real on GulfAir too, but at the per-passenger level: seat 8E (bassinet seat) on the A320 GF103 flights shows paxCellAvailability AvailableFree for every passenger with explicit 0.00 SAR price objects, while the overall cellAvailability stays AvailablePaid. Differs from the AirArabia example, whose AvailableFree cells have null pricing. Evidence: 6 passenger entries across 5 GF103 segments; totalPrice = basePrice = taxesPrice = 0 SAR; AvailableAfterReservation still not observed in 34 segments
- **[TC-SEATMAP-BND-04]** cellCategory "NoSeat" is a real value: a taken or absent seat is returned as cellCategory NoSeat with cellDetails null and column set (it never becomes Occupied/Blocked). No other category appeared on 34 narrowbody segments (aircraft 320, 321, 32N, 32Q). Evidence: 6 NoSeat cells in row 8 on chain A; a seat taken by a booking (12C) turned into NoSeat on the next GetSeatMap (TC-SEATMAP-BIZ-04)
- **[FLOW-V2-CANDIDATE-SM-HOLD-02]** FareConfirmAfterHold (PnrReprice) is not supported for GulfAir: 409 OperationNotSupported "GulfAir does not exist(s)" on 5 of 5 calls, the same envelope as SeatAfterHold. BookAfterHold works without it (200, ticketed), so the documented Family B chain cannot be followed step by step for this supplier. Evidence: PnrReprice 409 on Hold chains HA, HB, HC, F50 and the F50 flow; BookAfterHold 200 on HA, HB, HC
- **[TC-BOOK-NEG-08]** When a raw Book body repeats the same segmentRefId key twice under setSegmentsSeats, the server keeps the last value and drops the first without any error (System.Text.Json-style last-wins). Evidence: raw body with seats 14C then 14D on one segment: booked seat 14D only, pnr OSEOSA
- **[TC-BOOK-NEG-09]** A schema-valid but non-existent cellCode ("99Z", with a real cellId borrowed from another seat) and an unavailable cellCode (NoSeat 8A with a borrowed cellId) are both accepted by Book with HTTP 200 and silently dropped: a ticketed booking is created with no seat and no fee. Same silent-drop family as BUG-07; a null cellId is the only rejected form (400 "CellId is required."). Evidence: pnr REPIRE (99Z) and OPTCTH (8A): passengersSelectedSeats {}, totalSelectedSeatsAmount 0
- **[TC-BOOK-BIZ-07]** GulfAir seat descriptions now include two restriction values not seen in Round 6: NOT_ALLOWED_FOR_INFANTS (exit-row cells only) and NOT_ALLOWED_FOR_MEDICAL (exit-row cells plus a few rear rows). There is still no wheelchair/accessibility value and no NOT_ALLOWED_FOR_CHILDREN value. Evidence: 15 distinct description values over ~6,470 seat cells
- **[TC-BOOK-NEG-07]** Book rejects a duplicate seat inside one request in 0.1s (before any supplier call) with the generic envelope {ErrorCode NDC-INT-TEC-A0001, Context "Seat '17C' is assigned to multiple passengers on segment ..."}; the candidate code DUPLICATE_SEAT_SELECTION_IN_REQUEST is not used. Validation errors come in two envelope shapes: PascalCase {Status, ErrorCode "NDC-INT-TEC-A0001"} and camelCase {status, errorCode "1001"}. Evidence: NEG-07 400 A0001; GetSeatMap/Book omit-field probes 400 errorCode 1001

### Also re-confirmed

- **[TC-SEATMAP-NEG-05] BUG-11** &mdash; A naturally occurring supplier failure on FareConfirm (chain R4, BAH-CAI 2027-05-13) returned 409 NDC-INT-UNC-Z9999 with the raw upstream SOAP request, including live apiKey/secretKey, in OriginalSupplierRequest (values not recorded here)
- **[TC-BOOK-BIZ-05] BUG-09** &mdash; CHD offered every exit-row seat (24 of 24) in the seat map itself, also seen in TC-SEATMAP-BIZ-03

### Not reproduced

- **BUG-16** (Book returns an error while silently creating the booking) &mdash; exercised by TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-BOOK-POS-03, TC-BOOK-BND-03. All 16 Book calls (34-56 seconds each) and all 3 BookAfterHold calls returned a clean HTTP 200 with a pnr and bookingToken; none returned 409 NDC-INT-UNC-Z9999 or 500. Round 12 saw the failure on 4 of 4 Book calls, Rounds 9-11 saw none, so it is intermittent - recommend a wider re-verification before closing.

## Proposed SPEC.md updates

- §2.7 &mdash; status: *pending*
  - **Old:** "`cellCategory` observed values (updated 2026-08-10): `Seat`, `Aisle` — `UNKNOWN` whether galley/lavatory/exit-row-only markers exist as further distinct categories; not observed."
  - **New:** "`cellCategory` observed values (updated 2026-09-30): `Seat`, `Aisle`, `NoSeat` (a taken or absent seat: `cellDetails` null, `column` set; GulfAir, 34 narrowbody segments). Galley/lavatory/exit-row-only markers remain `UNKNOWN`; not observed on any narrowbody sample."
  - **Correction:** Also proposed in Round 11 and still pending; re-confirmed Round 13 (TC-SEATMAP-BND-04).

- §2.7 / §8.3 &mdash; status: *pending*
  - **Old:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples."
  - **New:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-09-30): `AvailablePaid`, `AvailableFree`, `Blocked`, `Occupied`. `AvailableFree` is confirmed live for GulfAir at the per-passenger level (`paxCellAvailability`, explicit 0.00 price objects, overall `cellAvailability` stays `AvailablePaid`) and in the AirArabia example (null pricing). GulfAir never returns `Blocked`/`Occupied` (a taken seat becomes `cellCategory` `NoSeat`). `AvailableAfterReservation` remains unconfirmed."
  - **Correction:** Evidence: TC-SEATMAP-BND-02/BND-03, 6 passenger entries across 5 GF103 segments.

- §2.7 &mdash; status: *pending*
  - **Old:** "`[Observed example, V2, confirmed against the fuller raw example added 2026-08-10]` full shape, per segment inside `seatMapDetails`"
  - **New:** "Response also carries top-level `offerId`, `responseId` and `isFareCheckRequired`, and `passengersDetails.&lt;paxRef&gt;` carries `birthDate`, `documentNumber` and `passengersSeatMapAvailability` keyed segmentRefId -&gt; deck name -&gt; cellCode[] (GulfAir, 2026-09-30). Full shape, per segment inside `seatMapDetails`"
  - **Correction:** Documents the schema drift TC-SEATMAP-REG-02 has reported in every round.

- §2.7a / §2.12 &mdash; status: *pending*
  - **Old:** "Exact position in the Hold-branch chain is `UNKNOWN`"
  - **New:** "For GulfAir, `SeatAfterHold` AND `FareConfirmAfterHold` (`PnrReprice`) both return HTTP 409 `OperationNotSupported` ("GulfAir does not exist(s)") at every chain position (2026-09-30, 9 and 5 calls); `BookAfterHold` succeeds without them. The chain position stays `UNKNOWN` until a supplier that supports the endpoint is tested."
  - **Correction:** Evidence: TC-SEATAFTERHOLD-INT-04 and the three candidate flows.

- §2.10 / §1.10 item 6 &mdash; status: *pending*
  - **Old:** "the Hold branch's `Hold`/`BookAfterHold` requests were **not** updated with this field (confirmed absent from both saved examples)"
  - **New:** "Live-confirmed 2026-09-30 for GulfAir: `Hold` accepts `passengersSelectedSeats`, prices the seat into the held offer and echoes it (also on `Retrieve` while `OnHold`), without any `SeatAfterHold` call (BUG-08). The saved example still omits the field."
  - **Correction:** Evidence: FLOW-V2-50-SEATFIELD, pnr RKECRA.

## Cleanup / follow-up

Live artifacts left behind this round (22):

- **needs_void_cancel** &mdash; pnr ONUNXZ (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-11, 1 ADT, ticket 722136997100, no seat) from the POS-02 Book. Staging test booking; void/cancel via the platform team if it should not remain.
- **needs_void_cancel** &mdash; pnr ORUXWA (TC-BOOK-POS-03) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-12, 1 ADT, seat 12C 60.00 SAR, ticket 722136997152) - shared by POS-03, VAL-03, REG-02, REG-03, VAL-08, BIZ-04, VAL-07, POS-04 and RETRIEVE-REG-01. Staging test booking.
- **needs_void_cancel** &mdash; pnr RFMLTX (TC-SEATMAP-VAL-04) &mdash; Real ticketed GulfAir/KSA booking (BAH-JED 2027-06-16, 1 ADT, ticket 722136997201, no seat attached). Evidence for BUG-07 - keep until triaged.
- **needs_void_cancel** &mdash; pnr RALBKE (TC-BOOK-NEG-06) &mdash; Real ticketed GulfAir/KSA booking (BAH-DXB 2027-06-17, 1 ADT, seat 14A 60.00 SAR, ticket 722136997204). Evidence for BUG-06.
- **needs_void_cancel** &mdash; pnr OWBPFD (TC-BOOK-VAL-06) &mdash; Real ticketed GulfAir/KSA booking (BAH-JED 2027-06-18, 1 ADT, seat 15F 60.00 SAR, ticket 722136997153).
- **needs_void_cancel** &mdash; pnr OODUCQ (TC-BOOK-BIZ-05) &mdash; Real ticketed GulfAir/KSA booking (BAH-DMM 2027-06-19, ADT + CHD, CHD in exit-row seat 10A, tickets 722136997202/722136997203). Evidence for BUG-09.
- **needs_void_cancel** &mdash; pnr RICPGV (TC-BOOK-BIZ-06) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-23, ADT + INF, ADT seat 14C 60.00 SAR, tickets 722136997205/722136997206).
- **needs_void_cancel** &mdash; pnr OPTCTH (TC-BOOK-NEG-05) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-10, 1 ADT, no seat, ticket 722136997210) created by the NEG-05 run-2 probe (unavailable seat code with a borrowed cellId).
- **needs_void_cancel** &mdash; pnr OUDTDR (TC-BOOK-NEG-10) &mdash; Real ticketed GulfAir/KSA booking (BAH-DXB 2027-05-06, 1 ADT, no seat, ticket 722136997156).
- **needs_void_cancel** &mdash; pnr OWXBXK (TC-BOOK-NEG-11) &mdash; Real ticketed GulfAir/KSA booking (BAH-DMM 2027-05-07, 1 ADT, no seat, ticket 722136997207).
- **needs_void_cancel** &mdash; pnr OWUAIY (TC-BOOK-NEG-12) &mdash; Real ticketed GulfAir/KSA booking (BAH-JED 2027-05-09, 1 ADT, ticket 722136997208) created by a Book that omitted ResponseId. Evidence for BUG-05.
- **needs_void_cancel** &mdash; pnr RMNHIG (TC-BOOK-BND-03) &mdash; Real ticketed GulfAir/KSA booking (BAH-JED 2027-05-04, 1 ADT, no seat, ticket 722136997155).
- **needs_void_cancel** &mdash; pnr OOBWZB (TC-BOOK-BND-03) &mdash; Real ticketed GulfAir/KSA round-trip booking (BAH-RUH 2027-05-17 / RUH-BAH 2027-05-24, 2 ADT, four seats, tickets 722136997211/722136997212). Evidence for BUG-18.
- **needs_void_cancel** &mdash; pnr OOERGR (FLOW-V2-49-SEATFIELD) &mdash; Real ticketed GulfAir/KSA round-trip booking (BAH-RUH 2027-05-03 / RUH-BAH 2027-05-10, 1 ADT, seats 14C+14D 120.00 SAR, ticket 722136997209). Evidence for BUG-18.
- **family_b_hold** &mdash; pnr RKECRA (FLOW-V2-50-SEATFIELD) &mdash; Held (not finalized) GulfAir/KSA booking with seat 14C attached via Hold (BUG-08); holdExpirationDate is null (BUG-04) so no expiry is known - cancel via the platform team.
- **family_b_hold** &mdash; pnr OTANEN (TC-SEATAFTERHOLD-POS-01) &mdash; Held, not finalized: SeatAfterHold POS-01/VAL-01/SEC-02/NEG-01 probes (BAH-CAI 2027-05-18). holdExpirationDate null (BUG-04).
- **family_b_hold** &mdash; pnr OOESWB (TC-SEATAFTERHOLD-NEG-01) &mdash; Held, not finalized: second Hold for the SeatAfterHold NEG-01 mismatched identity (BAH-DXB 2027-05-19). holdExpirationDate null (BUG-04).
- **needs_void_cancel** &mdash; pnr OWRLBM (FLOW-V2-CANDIDATE-SM-HOLD-01) &mdash; Real ticketed GulfAir/KSA booking (BAH-JED 2027-05-20, 1 ADT, no seat, ticket 722136997158) finalized through BookAfterHold after a Hold; also used by TC-SEATAFTERHOLD-INT-04.
- **needs_void_cancel** &mdash; pnr OODBGD (FLOW-V2-CANDIDATE-SM-HOLD-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-DMM 2027-05-21, 1 ADT, no seat, ticket 722136997213) finalized through BookAfterHold after a Hold; also used by TC-SEATAFTERHOLD-INT-04.
- **needs_void_cancel** &mdash; pnr OWZVVL (FLOW-V2-CANDIDATE-SM-HOLD-03) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-05-25, 1 ADT, no seat, ticket 722136997157) finalized through BookAfterHold after a Hold; also used by TC-SEATAFTERHOLD-INT-04.
- **needs_void_cancel** &mdash; pnr OSEOSA (TC-BOOK-NEG-08) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-05-27, 1 ADT, seat 14D 60.00 SAR, ticket 722136997222) created by the duplicate-JSON-key probe.
- **needs_void_cancel** &mdash; pnr REPIRE (TC-BOOK-NEG-09) &mdash; Real ticketed GulfAir/KSA booking (BAH-JED 2027-05-28, 1 ADT, no seat, ticket 722136997159) created by the non-existent-seat-code probe.

