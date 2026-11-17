# QA Execution Report — Round 22 "Real Clock Experiment" — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 63 test cases (all rows of the file), Galileo / EGY

**Environment:** staging &middot; https://ndc-supplier-integration.azurewebsites.net/
**Supplier:** Galileo  **Credentials Selector:** EGY
**Started:** 2026-10-11T11:29:36.213Z
**Ended:** 2026-10-11T12:02:31.355Z
**Status:** COMPLETE
**Execution Duration:** 32m 55s ([View Time Breakdown](20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment_TimeBreakdown.html))
**Prior runs:** Rounds 1-21 (Galileo/EGY: first run) (see NDC_Integration/Artifacts/Logs/)

## Scope note

Run note (Real Clock Experiment, Round 22): full-suite run - all 63 rows of SeatMap_TestCases.csv (all V2) against Galileo / EGY on the NON-STAGING host https://ndc-supplier-integration.azurewebsites.net/ (explicitly requested). Book/Hold/BookAfterHold were run under that request and created live Galileo reservations (see Cleanup); CancelAfterHold/Void were not called. KEY ENVIRONMENT FACT: Book and BookAfterHold cannot complete for Galileo/EGY here - Galileo fails the ticketing step (invalid credit card / FOP CHECK DATE) - so 28 cases that need a booking are BLOCKED. To avoid piling up orphan reservations, positive-path Book calls were not repeated once the cause was proven on 3 independent attempts (SV, SV, MS); Book was still called where its request validation is the point (seat negatives, multi-passenger shapes, field omissions: 10 calls reached the supplier). FLOW-V2-49-SEATFIELD reuses chain C instead of a second Book. Galileo seat maps work for SV and MS carriers only (flights chosen automatically; a NE and an XY flight were used to reach the supplier-failure path). Execution layout as in Rounds 20-21: a standalone Node harness with the V2 collection bodies; the verdict write-up of all 63 cases happened after the last API call. Calls were run in small parallel groups (Galileo tolerated it). Probes made before this log was opened (searches, FareConfirm, AddPassenger and GetSeatMap on candidate routes and carriers; no Book or Hold) are not logged.

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 21
- Failed: 14
- Blocked: 28
- Failed test cases: TC-SEATMAP-REG-02, TC-SEATAFTERHOLD-POS-01, TC-SEATAFTERHOLD-INT-04, FLOW-V2-50-SEATFIELD, FLOW-V2-CANDIDATE-SM-HOLD-01, TC-BOOK-BIZ-05, TC-BOOK-NEG-09, TC-BOOK-NEG-12, TC-SEATMAP-NEG-01, TC-SEATMAP-NEG-02, TC-SEATMAP-NEG-04, TC-SEATMAP-NEG-05, TC-SEATMAP-VAL-08, TC-SEATMAP-BIZ-03
- Blocked test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-BOOK-POS-03, TC-BOOK-BIZ-04, TC-BOOK-INT-03, TC-BOOK-BND-03, TC-BOOK-REG-02, TC-SEATAFTERHOLD-VAL-01, TC-SEATAFTERHOLD-NEG-01, TC-SEATAFTERHOLD-NEG-02, FLOW-V2-49-SEATFIELD, FLOW-V2-CANDIDATE-SM-HOLD-02, FLOW-V2-CANDIDATE-SM-HOLD-03, FLOW-V2-CANDIDATE-SM-HOLD-01-NEG, TC-BOOK-BIZ-06, TC-BOOK-VAL-07, TC-BOOK-BIZ-07, TC-BOOK-VAL-08, TC-BOOK-REG-03, TC-BOOK-NEG-10, TC-BOOK-NEG-11, TC-SEATMAP-BND-03, TC-RETRIEVE-REG-01, TC-BOOK-INT-04, TC-SEATAFTERHOLD-VAL-02, TC-SEATMAP-INT-02, TC-SEATMAP-INT-03, TC-BOOK-POS-04

## Test case results

### TC-SEATMAP-POS-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (Galileo/EGY, SV386 CAI-JED 2026-11-19, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 409 NDC-INT-UNC-Z9999 after 32.6 s - host error 12008 "INVALID CREDIT CARD DETAILS ... failed at Ticketing stage and still at the hold state with gdsPnr HNC0JP"; no pnr/bookingToken returned
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Half confirmed, half blocked. GetSeatMap returned non-empty offerId/responseId (both re-issued: different from AddPassenger's), and Book accepted them as its ResponseId/selectedOfferId (no ID or validation error; it ran the full supplier round-trip). It then failed at Galileo's ticketing step, so no pnr/bookingToken/gdsPNR came back. Book cannot complete for Galileo/EGY on this host. All 10 Book calls that passed request validation ended with the same HTTP 409 NDC-INT-UNC-Z9999 (host error 12008: "INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr ..."), after 31-51 s, and returned no pnr/bookingToken; all 3 BookAfterHold calls fail the same way (409, "Indicates FOP application failed: CHECK DATE"). This looks like an expired or invalid form-of-payment card on the EGY Galileo credentials (an environment problem, not an API defect), so no booking can be created or read back. The Postman collection-variable assignment is script-side and not observable over raw HTTP.
- **Status:** BLOCKED
- **Evidence:** GetSeatMap responseId == AddPassenger responseId: false; offerId equal: false; Book 409 in 32.6 s (gdsPnr HNC0JP); same failure on 9 other Book attempts (31-51 s)

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 84 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JP]

### TC-SEATMAP-VAL-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.&lt;passenger GUID&gt;.setSegmentsSeats.4BdS+DUqWDKA.. = {cellCode "33-E", cellId = the verbatim cellDetails.cellID "33-E~0B5" from the GetSeatMap response} for seat 33-E (AvailablePaid, 70 AED, Galileo/EGY, SV386 CAI-JED 2026-11-20, 1 ADT)
- **Response:** 409 NDC-INT-UNC-Z9999 after 41.8 s (ticketing failure, gdsPnr HNC0JN); no pnr, so no echo of the seat to inspect
- **Expected:** Book accepts the token despite the field-name casing difference (response cellID vs request cellId) and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** Blocked. The request itself was accepted: it carried the response's cellID verbatim under the lowercase-d name cellId and passed all seat validation (the same endpoint rejects any mismatched or unavailable seat with a 400 in 0.1 s, see TC-BOOK-NEG-06/VAL-06/NEG-05), so the casing difference is cosmetic. But the booking then failed at ticketing, so the seat echo (attached seat, price, the three echo locations) cannot be verified. Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created.
- **Status:** BLOCKED
- **Evidence:** request cellId == GetSeatMap cellID byte for byte ("33-E~0B5"); Book reached the supplier (41.8 s) and failed at ticketing; no pnr

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 91 offers, offer[0] totalAmount 390 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JN]

### TC-SEATMAP-VAL-04 — PASS

- **Test Case:** [SeatMap][Request] Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer E2 (SV386 CAI-JED 2026-11-22) with seat cellCode 34-F but cellId = the cellID issued for seat 33-H on a different offer E1 (SV386 CAI-JED 2026-11-21); two independent Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap chains
- **Response:** 400 NDC-INT-TEC-A0001 in 0.1s: "Seat 'CellCode' value '34-F' does not match the seat identified by 'CellId' ('33-H') for passenger ... on segment ..."; no booking created
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID embeds the originating offer and is bound to the offer it was issued for
- **Actual:** Rejected as expected, and BUG-07 did NOT reproduce. Galileo decodes the cellId, finds it names seat 33-H (the other offer's seat), compares it with the submitted cellCode 34-F and refuses the request with a specific 400 in 0.1 s, before any supplier call; no booking and no held reservation were created. This is the first supplier on which the foreign-cellId check works (GulfAir and FlyAdeal accept it and silently drop the seat). Note the check is code-vs-id consistency; whether an id of the SAME seat number from another offer is refused was not separable here (the token is just "&lt;seat&gt;~0B5").
- **Status:** PASS
- **Evidence:** Book 400 in 0.1s; Context: Seat 'CellCode' value '34-F' does not match the seat identified by 'CellId' ('33-H'); no pnr, no gdsPnr

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 84 offers, offer[0] totalAmount 390 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Search:** PASS &mdash; 200 - 74 offers, offer[0] totalAmount 380 AED
  - **Hop 6 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 7 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 8 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 9 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [Seat 'CellCode' value '34-F' does not match the seat identified by 'CellId' ('33-H') for passenger 'aaea5479-ef62-409c-ba43-5bc6d6ef1e55' on segment 'nDOS+DTqWDKAeeceTAAAAA=='.]

### TC-SEATMAP-BND-02 — PASS

- **Test Case:** [SeatMap][Response] Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid, Blocked, and Occupied, and that Aisle-category cells carry no seatPriceDetails.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** Inspected all 18 seat maps captured this round (19 segments, 4890 seat cells; SV A330 330/333 and MS A320neo 32N), cell by cell
- **Response:** cellAvailability: {"Blocked":121,"AvailablePaid":4766,"Occupied":3}; paxCellAvailability: {"Blocked":154,"AvailablePaid":6371,"Occupied":3}; cellCategory: {"Seat":4890,"Aisle":1263,"NoSeat":392}
- **Expected:** Every cellCategory is Seat or Aisle; every cellAvailability/paxCellAvailability is AvailablePaid, Blocked or Occupied; Aisle cells carry no seatPriceDetails; new values are logged and flagged, not hard-failed
- **Actual:** All three expected availability values appear, and nothing else (AvailablePaid 4766, Blocked 121, Occupied 3; no AvailableFree). All 1263 Aisle cells have cellDetails null, so none carries a price. One value outside the expected set is flagged, not failed (8.3 policy): cellCategory "NoSeat" on 392 cells (cellDetails null; a taken or absent seat position, already known from GulfAir). Occupied is rare on Galileo (3 cells), Blocked common (121).
- **Status:** PASS
- **Evidence:** distinct cellAvailability Blocked/AvailablePaid/Occupied; paxCellAvailability Blocked/AvailablePaid/Occupied; Aisle cells with cellDetails!=null: 0; NoSeat cells 392

### TC-SEATMAP-BIZ-02 — PASS

- **Test Case:** [SeatMap][Response] Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap
- **Request:** Computed totalPrice - (basePrice + taxesPrice) for every priced seat/passenger pair in all 18 seat maps
- **Response:** 6528 priced pairs, 0 mismatches; currency AED on all 6528
- **Expected:** totalPrice.amount == basePrice.amount + taxesPrice.amount for every priced cell/passenger pair, in the same currency
- **Actual:** 0 mismatches in 6528 pairs and 0 currency mismatches. Galileo puts the whole seat charge in basePrice (taxesPrice 0.00 AED); amounts seen on bookable seats: 40, 50, 70, 80, 130, 150, 160 AED.
- **Status:** PASS
- **Evidence:** 6528 pairs checked, mismatches 0, currencies {"AED":6528}; example 33-H: 80 AED = base 80 AED + tax 0 AED

### TC-SEATMAP-REG-02 — FAIL

- **Test Case:** [SeatMap][Response] Verify seatMapDetails.&lt;segment&gt;.{cabinLayoutsByDeck, rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails}}} structure matches the fuller schema captured 2026-08-10, AND flag/tolerate the flat-columns supplier variant (no zones[]/zoneId) confirmed present in a saved example.
- **Category:** Regression
- **Endpoint Name:** GetSeatMap
- **Request:** Compared the live GetSeatMap response (Galileo/EGY, SV386 CAI-JED 2026-11-17, 2 ADT + CHD + INF) key for key with the schema in SPEC.md 2.7; schema shape checked on all 19 segments
- **Response:** top-level keys: supplier, offerId, responseId, isFareCheckRequired, flightSegments, passengersDetails, seatMapDetails; passengersDetails keys: passengerTypeCode, name, birthDate, documentNumber, passengersSeatMapAvailability
- **Expected:** Every key listed in SPEC.md 2.7 present and correctly typed; at least one of the zones[]/zoneId or flat columns[] layout shapes accepted
- **Actual:** Every documented key is present and correctly typed (zones[]/zoneId layout on all 19 segments; every row carries a zoneId declared in its deck; cellDetails complete with cellID/cellCode/cellAvailability/name/description/seatPriceDetails/seatPriceDetailsByPassenger/cellCharacteristics). The response also carries fields SPEC.md 2.7 does not list: top-level offerId, responseId, isFareCheckRequired, and passengersDetails.&lt;paxRef&gt;.{birthDate, documentNumber, passengersSeatMapAvailability}, plus the NoSeat cell category. Same schema drift flagged in every prior round, so kept FAIL for continuity; nothing is missing or mistyped. Layout variant for the supplier log: Galileo uses zones[] (not the flat columns[] variant).
- **Status:** FAIL
- **Evidence:** Top-level keys: supplier, offerId, responseId, isFareCheckRequired, flightSegments, passengersDetails, seatMapDetails; passengersDetails keys: passengerTypeCode, name, birthDate, documentNumber, passengersSeatMapAvailability; cabinLayoutsByDeck.Main.zones[0] = {zoneId, columns, cabinClass}

### TC-BOOK-POS-03 — BLOCKED

- **Test Case:** [Book][Request] Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly.
- **Category:** Positive
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book with a single-passenger, single-segment passengersSelectedSeats (seat 33-E, cellId copied verbatim) using ResponseId/selectedOfferId from GetSeatMap (Galileo/EGY, SV386 CAI-JED 2026-11-20)
- **Response:** 409 NDC-INT-UNC-Z9999 after 41.8 s (ticketing failure, gdsPnr HNC0JN); no pnr, no passengersSelectedSeats echo
- **Expected:** HTTP 200; pnr/bookingToken/gdsPNR returned; response top-level passengersSelectedSeats.T1.S1 == {cellCode, price}; selectedOffer.passengerFareBreakdown[].passengerSeats contains the same {cellCode, price}; priceDetails.totalSelectedSeats/totalSelectedSeatsAmount reflect the same price
- **Actual:** Blocked. Book cannot complete for Galileo/EGY on this host. All 10 Book calls that passed request validation ended with the same HTTP 409 NDC-INT-UNC-Z9999 (host error 12008: "INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr ..."), after 31-51 s, and returned no pnr/bookingToken; all 3 BookAfterHold calls fail the same way (409, "Indicates FOP application failed: CHECK DATE"). This looks like an expired or invalid form-of-payment card on the EGY Galileo credentials (an environment problem, not an API defect), so no booking can be created or read back. The seat selection itself passed Book's validation (a mismatched or unavailable seat gets a 400 in 0.1 s on this supplier; this one ran the full supplier round-trip), but the response shape with the echoed seat cannot be captured. For reference only, the Hold endpoint (not Book) echoes a seat on this supplier: Hold with seat 33-H returned passengersSelectedSeats {33-H, 80 AED} and totalSelectedSeatsAmount 80 AED (see FLOW-V2-50-SEATFIELD).
- **Status:** BLOCKED
- **Evidence:** Book 409 in 41.8 s, gdsPnr HNC0JN; request passengersSelectedSeats key = passenger GUID from GetSeatMap passengersDetails (not "PAX1")

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 91 offers, offer[0] totalAmount 390 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JN]

### TC-BOOK-NEG-05 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats = {cellCode "30-D", cellId "30-D~0B5" (the real id from the GetSeatMap)} for a cell whose cellAvailability is Blocked (SV386 CAI-JED 2026-12-19, 1 ADT)
- **Response:** 400 NDC-INT-TEC-A0001 in 0.1s: "Seat '30-D~0B5' is not available for passenger ... on segment .... Run the SeatMap step first and select a seat returned for this passenger."; no booking created
- **Expected:** Request is rejected (exact status UNKNOWN); no booking is created, or if one is created it must NOT show the unavailable seat as attached
- **Actual:** Rejected cleanly and quickly (0.1 s, before any supplier call) with a specific, on-point message, and no booking or held reservation was created. The blocked cell is refused even though its seat-map entry shows a price (160 AED, see BUG-20) - Book trusts the passenger allow-list, which correctly excludes it (blocked seats are absent from the passenger's allow-list). Occupied seats were not targeted separately (only 3 Occupied cells existed in the round).
- **Status:** PASS
- **Evidence:** Book 400 in 0.1s; cell 30-D cellAvailability Blocked, absent from the passenger's passengersSeatMapAvailability list; no pnr

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 80 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [Seat '30-D~0B5' is not available for passenger 'b2afcfbb-3a6d-40d8-b128-3509481caf1a' on segment '4BdS+DUqWDKAsHJfTAAAAA=='. Run the SeatMap step first and select a seat returned for this passenger.]

### TC-BOOK-NEG-06 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with seat cellCode "21-K" and a tampered cellId "21-KXXXX" (the genuine token is "21-K~0B5"; the last 4 of its 8 characters replaced) (MS901 CAI-DXB 2026-11-23, 1 ADT)
- **Response:** 400 NDC-INT-TEC-A0001 in 0.1s: "Seat 'CellCode' value '21-K' does not match the seat identified by 'CellId' ('21-KXXXX') for passenger ... on segment ..."; no booking created
- **Expected:** Request is rejected (exact status UNKNOWN) since the tampered token should fail the server-side decode/signature check
- **Actual:** Rejected with a structured 400 in 0.1 s and no booking created (BUG-06, where GulfAir accepted a tampered cellId, did NOT reproduce on Galileo). The token here is short (8 characters), so "the last ~10 characters" was applied as: last 4 replaced with XXXX. The server reads the token as a seat reference and compares it with cellCode, so the tamper is caught as a code/id mismatch rather than by a signature check.
- **Status:** PASS
- **Evidence:** Book 400 in 0.1s; token length 8 -&gt; tampered "21-KXXXX"; no pnr

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 64 offers, offer[0] totalAmount 735 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [Seat 'CellCode' value '21-K' does not match the seat identified by 'CellId' ('21-KXXXX') for passenger '87b7bae4-bcfc-45ca-a104-e44212cf71e1' on segment 'vJuS+DVqWDKAACpZTAAAAA=='.]

### TC-BOOK-VAL-06 — PASS

- **Test Case:** [Book][Request] Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with cellCode "35-F" but the cellId of seat 33-D ("33-D~0B5") (SV386 CAI-JED 2026-11-24, 1 ADT)
- **Response:** 400 NDC-INT-TEC-A0001 in 0.1s: "Seat 'CellCode' value '35-F' does not match the seat identified by 'CellId' ('33-D') ..."; no booking created
- **Expected:** UNKNOWN - resolve live: the API trusts cellId alone, rejects the request outright, or books the wrong seat under the wrong displayed code
- **Actual:** Resolved: Galileo rejects the mismatch outright with a specific 400 in 0.1 s and creates nothing. It does not trust one field over the other (unlike GulfAir, which trusts cellCode and ignores the cellId, BUG-06). A third case in the same family, a made-up seat code "99-Z" with a real cellId, is rejected the same way (see TC-BOOK-NEG-09 notes). Both fields must be kept in sync in every future case.
- **Status:** PASS
- **Evidence:** Book 400 in 0.1s; message names both values; no pnr. Also L Book (cellCode 99-Z + cellId of 21-H): 400, same message form

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 77 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [Seat 'CellCode' value '35-F' does not match the seat identified by 'CellId' ('33-D') for passenger 'adc8f0a5-e671-40c6-bf91-6c42185e5307' on segment '4BdS+DUqWDKAhHEfTAAAAA=='.]

### TC-BOOK-BIZ-04 — BLOCKED

- **Test Case:** [Book][Response] Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected.
- **Category:** Business Rule
- **Endpoint Name:** Book (price reconciliation)
- **Request:** Book with exactly one paid seat, then totalAmount vs base + tax + ancillaries + seat and vs the pre-seat total; not reachable (Book cannot complete)
- **Response:** No Book response exists (every Book ends 409 at ticketing). Reference only: the Hold response for a one-seat offer carries totalAmount 650 AED = base 240 AED + tax 330 AED + ancillaries 0 AED + seat 80 AED
- **Expected:** totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount, and totalAmount(after) == totalAmount(before seat selection) + totalSelectedSeatsAmount; any mismatch is a defect
- **Actual:** Blocked for Book. Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created, so Book's priceDetails cannot be read. The same arithmetic was checked on the Hold path (the only path that returns a priced seat): 240 AED + 330 AED + 0 AED + 80 AED = 650 AED, and 570 AED (FareConfirm) + 80 AED = 650 AED; the seat amount is included in totalAmount there. This is supporting evidence only, not a pass for Book.
- **Status:** BLOCKED
- **Evidence:** Book 409 at ticketing on all 10 attempts; Hold (pnr 7JRHGS) priceDetails.totalAmount 650 AED, totalSelectedSeatsAmount 80 AED, FareConfirm total 570 AED

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 77 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Hold (reference only):** PASS &mdash; 200 - pnr 7JRHGS, gdsPNR HNC0K5, holdExpirationDate 2026-12-09T23:59:00+02:00, seats ["33-H 80 AED"]

### TC-BOOK-INT-03 — BLOCKED

- **Test Case:** [Book][Request] Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously on one call.
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck -&gt; Book
- **Request:** GetOfferBundles on the chain A offer (SV386 CAI-JED 2026-11-17) to obtain a bundle code
- **Response:** 409 OperationNotSupported "This action is not currently supported by the selected supplier." / "Galileo does not exists" (haveBundles false on all 41 FareConfirm calls this round, offerHasAncillary false on all)
- **Expected:** Resolved live: Book accepts selectedBundles, PassengersSelectedAncillaries and passengersSelectedSeats together and reflects them (accepted, partial or rejected)
- **Actual:** Not executable for Galileo: it exposes no bundle capability (GetOfferBundles is rejected 409 OperationNotSupported; haveBundles false and offerHasAncillary false on all 41 offers), so the bundle and ancillary halves of the combination cannot be built. Independently, Book cannot complete on this host (ticketing failure), so the combined request could not be read back anyway. The call to Book was not made for this case (it would only add another orphan hold).
- **Status:** BLOCKED
- **Evidence:** GetOfferBundles 409 OperationNotSupported; FareConfirm flags over 41 calls: haveBundles true 0, offerHasAncillary true 0

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 80 offers, offer[0] totalAmount 1350 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1860 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; GetOfferBundles:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]

### TC-BOOK-BND-03 — BLOCKED

- **Test Case:** [Book][Request] Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries.
- **Category:** Boundary
- **Endpoint Name:** Book (0 / 1 / multiple passengersSelectedSeats entries)
- **Request:** (a) Book with passengersSelectedSeats omitted (SV386 CAI-JED 2026-11-19); (b) one passenger, one segment, seat 33-E (SV386 CAI-JED 2026-11-20); (c) two passengers x two segments = 4 seats on a round trip (SV386 CAI-JED 2026-12-06 + SV309 JED-CAI 2026-12-12)
- **Response:** (a) 409 after 32.6 s, (b) 409 after 41.8 s, (c) 409 after 42.0 s - all NDC-INT-UNC-Z9999 ticketing failures (gdsPnr HNC0JP, HNC0JN, HNC0K2); no pnr in any
- **Expected:** (a) Book succeeds with no seat; (b) succeeds as in POS-03; (c) UNKNOWN - confirm live whether multiple passengers/segments nest correctly as sibling keys
- **Actual:** Blocked: none of the three variants can complete (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). What could be established: all three request shapes, including the 2-passenger x 2-segment nesting in (c) (2 passenger keys, each with 2 segment keys), passed Book's request validation and reached the supplier, so the nesting is at least accepted by the API's validation. Whether the 4 seats are attached and echoed, and whether a two-journey Book returns a pnr (BUG-21 on FlyAdeal), is unknown.
- **Status:** BLOCKED
- **Evidence:** (a) HNC0JP (b) HNC0JN (c) HNC0K2: 409 ticketing failures after 32.6/41.8/42.0 s; (c) request: 2 passenger keys x 2 segment keys

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 200 offers, offer[0] totalAmount 1700 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2040 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 2 segment(s), 600 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0K2]

### TC-BOOK-REG-02 — BLOCKED

- **Test Case:** [Book][Response] Verify passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema going forward.
- **Category:** Regression
- **Endpoint Name:** Book (response schema)
- **Request:** Snapshot of a full Book response with a seat selected, diffed against SPEC.md 2.9; not available (Book cannot complete)
- **Response:** No Book 200 response exists: all 10 Book calls that reached the supplier ended 409 at ticketing
- **Expected:** passengersSelectedSeats, passengerSeats, paxTotalSeatAmount, totalSelectedSeats and totalSelectedSeatsAmount are present and correctly typed whenever a seat has been selected; no pre-existing field regressed
- **Actual:** Blocked: there is no Book response to inspect (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). For reference, the Retrieve response of the held one-seat reservation carries the same five fields (passengersSelectedSeats, passengerFareBreakdown[].passengerSeats and paxTotalSeatAmount, priceDetails.totalSelectedSeats and totalSelectedSeatsAmount) correctly typed, while the Hold and PnrReprice responses carry only three of them (no passengerSeats / paxTotalSeatAmount); that is Hold/Retrieve, not Book, so it does not satisfy this case.
- **Status:** BLOCKED
- **Evidence:** Book 409 on all 10 attempts; Retrieve (pnr 7JRHGS) fields present: passengersSelectedSeats, passengerSeats, paxTotalSeatAmount, totalSelectedSeats, totalSelectedSeatsAmount

### TC-SEATAFTERHOLD-POS-01 — FAIL

- **Test Case:** [SeatAfterHold][Request] Discovery case -- submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; SeatAfterHold
- **Request:** SeatAfterHold with the documented 6-field body (supplier Galileo, credentialsSelector EGY, pnr 7JQQC8, gdsPNR HNC0JS, bookingToken, surName Ibrahim) against a live Held PNR (MS901 CAI-DXB 2026-12-13, holdExpirationDate 2026-12-13T23:59:00+02:00)
- **Response:** 409 OperationNotSupported "This action is not currently supported by the selected supplier." / Context "Galileo does not exists" in 0.1s
- **Expected:** UNKNOWN by design - establish ground truth: a 200 with a seat-map-like payload, a follow-up call, or an error demanding more fields
- **Actual:** Ground truth: STILL REPRODUCES (BUG-03, 11th confirmed occurrence overall; first on Galileo). SeatAfterHold rejects Galileo outright at supplier level before reading any field: 409 OperationNotSupported, with the same odd wording ("Galileo does not exists") used for GulfAir and FlyAdeal. The Hold itself works (200, pnr 7JQQC8, gdsPNR HNC0JS, holdExpirationDate 2026-12-13T23:59:00+02:00), so the Held PNR the endpoint needs exists; the endpoint is simply not implemented for this supplier. The real request contract stays unknown.
- **Status:** FAIL
- **Evidence:** Hold 200 pnr 7JQQC8; SeatAfterHold 409 OperationNotSupported in 0.1s; Context OperationNotSupported = "Galileo does not exists"

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 61 offers, offer[0] totalAmount 735 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr 7JQQC8, gdsPNR HNC0JS, holdExpirationDate 2026-12-13T23:59:00+02:00, seats []
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]

### TC-SEATAFTERHOLD-VAL-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Confirm whether a seat/cell field is required beyond the 6 documented fields, by inspecting the response/error from TC-SEATAFTERHOLD-POS-01.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** Attempt 1: the 6-field body; attempt 2: the same body plus a guessed passengersSelectedSeats (Pax1 -&gt; segment X -&gt; {cellCode 33-A, cellId x}) against a live Held PNR
- **Response:** Both attempts: 409 OperationNotSupported ("Galileo does not exists"), identical Context
- **Expected:** UNKNOWN - resolve empirically: whether a seat/cell field is required beyond the 6 documented fields
- **Actual:** Blocked. The rejection is supplier-level and does not depend on the body (both attempts return the identical 409), so neither reaches field validation and the real request contract still cannot be learned. Unchanged from the GulfAir and FlyAdeal rounds (BUG-03).
- **Status:** BLOCKED
- **Evidence:** attempt 1 409, attempt 2 409, Context identical (OperationNotSupported = "Galileo does not exists")

  - **Attempt 1 of 2 - 6-field body:** HTTP 409
  - **Attempt 2 of 2 - 6 fields + guessed passengersSelectedSeats:** HTTP 409

### TC-SEATAFTERHOLD-NEG-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination.
- **Category:** Negative
- **Endpoint Name:** Hold (x2) -&gt; SeatAfterHold
- **Request:** SeatAfterHold with pnr 7JQQC8 (Hold H1) but gdsPNR HNC0JT and the bookingToken of Hold H2 (7JPY8H)
- **Response:** 409 OperationNotSupported "Galileo does not exists" in 0.5s
- **Expected:** Request is rejected (exact status UNKNOWN per 7.9), analogous to FareConfirmAfterHold/BookAfterHold same-class mismatched-identity negative cases
- **Actual:** Actually attempted, but not meaningfully testable: the supplier-level 409 fires before any identity matching, so a mismatched identity cannot be told apart from a valid one. Both Holds were genuinely created (H1 and H2, same supplier/selector).
- **Status:** BLOCKED
- **Evidence:** H1 pnr 7JQQC8/HNC0JS, H2 pnr 7JPY8H/HNC0JT; mixed SeatAfterHold 409 OperationNotSupported

  - **Hop 1 &mdash; Hold:** PASS &mdash; 200 - pnr 7JQQC8, gdsPNR HNC0JS, holdExpirationDate 2026-12-13T23:59:00+02:00, seats []
  - **Hop 2 &mdash; Hold:** PASS &mdash; 200 - pnr 7JPY8H, gdsPNR HNC0JT, holdExpirationDate 2026-12-14T23:59:00+02:00, seats []
  - **Hop 3 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]

### TC-SEATAFTERHOLD-NEG-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed.
- **Category:** Negative
- **Endpoint Name:** Hold -&gt; SeatAfterHold (after expiry)
- **Request:** Not run: needs a Hold whose holdExpirationDate has passed; the shortest expiry seen this round is 2026-12-13T23:59:00+02:00 (the departure day of each flight, 23:59 +02:00), about two months away
- **Response:** no calls
- **Expected:** Request is rejected (exact status UNKNOWN), consistent with FareConfirmAfterHold on an expired hold
- **Actual:** Blocked. Unlike GulfAir (BUG-04: holdExpirationDate always null), Galileo returns a real holdExpirationDate on all 8 Holds this round (the departure date at 23:59 +02:00), so an expiry exists, but the earliest is about two months away and cannot be waited for. SeatAfterHold also rejects Galileo outright (BUG-03), so the expired-hold behaviour would not be visible anyway.
- **Status:** BLOCKED
- **Evidence:** holdExpirationDate on 8/8 Holds: 7JPZHS 2026-12-20, 7JQQC8 2026-12-13, 7JPY8H 2026-12-14, 7JRDOH 2026-12-15, 7JQITP 2026-12-16, 7JQVNU 2026-12-17, 7JRKKF 2026-12-18, 7JRHGS 2026-12-09

  - **Hop 1 &mdash; Hold:** BLOCKED &mdash; 200 - pnr 7JQQC8, gdsPNR HNC0JS, holdExpirationDate 2026-12-13T23:59:00+02:00, seats []

### TC-SEATAFTERHOLD-SEC-02 — PASS

- **Test Case:** [SeatAfterHold][Request] Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to SeatAfterHold.
- **Category:** Security
- **Endpoint Name:** SeatAfterHold
- **Request:** Three variants of the 6-field body: (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier switched to GulfAir/KSA, (3b) same supplier with credentialsSelector KSA (Held PNR from Galileo/EGY)
- **Response:** (1) 401 AuthenticationError, (2) 401 AuthenticationError, (3a) 409 OperationNotSupported, (3b) 409 OperationNotSupported
- **Expected:** All three rejected - exact status/error shape UNKNOWN; reuse the envelope the same checks produce on other endpoints (7.14)
- **Actual:** All rejected. The two auth-header checks return exactly the same 401 AuthenticationError envelope ("Invalid authorization header") every other endpoint returns. The cross-tenant variants are refused with the supplier-level 409 OperationNotSupported, so they never reach an identity check; that is a rejection, but it says nothing about tenant isolation for this endpoint (it would be the same for a legitimate call). Recorded PASS on that basis.
- **Status:** PASS
- **Evidence:** (1) 401, (2) 401 (same envelope as GetSeatMap SEC-01), (3a) 409, (3b) 409

  - **Attempt 1 of 4 - invalid x-api-key:** HTTP 401
  - **Attempt 2 of 4 - invalid Client-Id:** HTTP 401
  - **Attempt 3 of 4 - supplier GulfAir/KSA:** HTTP 409
  - **Attempt 4 of 4 - credentialsSelector KSA:** HTTP 409

### TC-SEATAFTERHOLD-INT-04 — FAIL

- **Test Case:** [SeatAfterHold][Request] Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points and comparing outcomes.
- **Category:** Integration
- **Endpoint Name:** Hold branch (3 chains) -&gt; SeatAfterHold
- **Request:** Three Hold chains differing only in when SeatAfterHold is called: A (right after Hold), B (after PnrReprice = FareConfirmAfterHold), C (after BookAfterHold), each followed by Retrieve
- **Response:** SeatAfterHold: 409 OperationNotSupported at positions A, B and C; PnrReprice 200 on A and B and C; BookAfterHold 409 (ticketing/FOP failure) on A, B and C; Retrieve 200 OnHold on all three
- **Expected:** UNKNOWN - record which position(s) SeatAfterHold accepts and whether the final Retrieve shows a seat; more than one accepted position would itself be a finding
- **Actual:** Not resolvable for Galileo. SeatAfterHold rejects at every position with the identical supplier-level 409, so the outcome is not position-dependent (BUG-03, 11th occurrence). The rest of the chain behaves normally except the final step: Hold 200, PnrReprice (FareConfirmAfterHold) 200, but BookAfterHold fails at ticketing on all three chains (409 "Indicates FOP application failed: CHECK DATE"), so no chain reaches a booked state; Retrieve shows bookingStatus OnHold with no seat. No position can be promoted to the correct flow.
- **Status:** FAIL
- **Evidence:** A/B/C SeatAfterHold all 409 OperationNotSupported; PnrReprice 200 (A, B, C); BookAfterHold 409 x3; Retrieve 200 OnHold x3, passengersSelectedSeats {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 63 offers, offer[0] totalAmount 735 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr 7JRDOH, gdsPNR HNC0JW, holdExpirationDate 2026-12-15T23:59:00+02:00, seats []
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]
  - **Hop 6 &mdash; PnrReprice (FareConfirmAfterHold):** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, seats []
  - **Hop 7 &mdash; BookAfterHold:** FAIL &mdash; 409 NDC-INT-UNC-Z9999 [3539: UR Modify Service Error. - Indicates FOP application failed: CHECK DATE - UR Modify Service Error.]
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200 - pnr 7JRDOH, bookingStatus OnHold, seats []
  - **Hop 9 &mdash; Hold:** PASS &mdash; 200 - pnr 7JQITP, gdsPNR HNC0JX, holdExpirationDate 2026-12-16T23:59:00+02:00, seats []
  - **Hop 10 &mdash; PnrReprice (FareConfirmAfterHold):** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, seats []
  - **Hop 11 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]
  - **Hop 12 &mdash; BookAfterHold:** FAIL &mdash; 409 NDC-INT-UNC-Z9999 [3539: UR Modify Service Error. - Indicates FOP application failed: CHECK DATE - UR Modify Service Error.]
  - **Hop 13 &mdash; Retrieve:** PASS &mdash; 200 - pnr 7JQITP, bookingStatus OnHold, seats []
  - **Hop 14 &mdash; Hold:** PASS &mdash; 200 - pnr 7JQVNU, gdsPNR HNC0JZ, holdExpirationDate 2026-12-17T23:59:00+02:00, seats []
  - **Hop 15 &mdash; PnrReprice (FareConfirmAfterHold):** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, seats []
  - **Hop 16 &mdash; BookAfterHold:** FAIL &mdash; 409 NDC-INT-UNC-Z9999 [3539: UR Modify Service Error. - Indicates FOP application failed: CHECK DATE - UR Modify Service Error.]
  - **Hop 17 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]
  - **Hop 18 &mdash; Retrieve:** PASS &mdash; 200 - pnr 7JQVNU, bookingStatus OnHold, seats []

### FLOW-V2-49-SEATFIELD — BLOCKED

- **Test Case:** [Flow 49][Response] Verify the existing SM-enrichment Family-A flow now chains Book's ResponseId/selectedOfferId from GetSeatMap's output and that Book's passengersSelectedSeats field is exercised, not left unused.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck -&gt; Book -&gt; Retrieve
- **Request:** The flow's chain executed once as chain C (SV386 CAI-JED 2026-11-20, 1 ADT, seat 33-E): GetSeatMap isFareCheckRequired = false, so FareCheck is skipped; Book with ResponseId/selectedOfferId from GetSeatMap and the seat
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200 (300 seat cells, 33-E AvailablePaid), Book 409 after 41.8 s (ticketing failure, gdsPnr HNC0JN); Retrieve not reachable
- **Expected:** Per-family state check (6.3 Family A) plus: Book/Retrieve both echo passengersSelectedSeats matching the selection; selectedOffer.priceDetails.totalSelectedSeatsAmount non-zero and reconciles into totalAmount
- **Actual:** Blocked at the Book hop. The first four hops pass and Book's seat validation accepts the selection, but the booking fails at Galileo ticketing (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created), so there is no pnr to Retrieve and none of the seat-echo or price-reconciliation assertions can be checked. This case reuses chain C instead of a second Book, to avoid creating another orphan held reservation for a result that is already known.
- **Status:** BLOCKED
- **Evidence:** hops 1-4 200; Book 409 NDC-INT-UNC-Z9999 (12008 INVALID CREDIT CARD DETAILS, gdsPnr HNC0JN); isFareCheckRequired false

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 91 offers, offer[0] totalAmount 390 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JN]

### FLOW-V2-50-SEATFIELD — FAIL

- **Test Case:** [Flow 50][Request] Verify that GetSeatMap's chosen seat cannot be attached via Hold directly, and must instead go through the new SeatAfterHold endpoint.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Hold (+passengersSelectedSeats) -&gt; PnrReprice -&gt; Retrieve
- **Request:** Hold with passengersSelectedSeats {&lt;passenger GUID&gt;: {&lt;segment&gt;: {cellCode 33-H, cellId 33-H~0B5}}} on the offer from GetSeatMap (SV386 CAI-JED 2026-12-09, 1 ADT); run 1 sent the same Hold with the AddPassenger ids instead of the GetSeatMap ids
- **Response:** Hold 200 pnr 7JRHGS, gdsPNR HNC0K5, holdExpirationDate 2026-12-09T23:59:00+02:00; passengersSelectedSeats = {33-H, 80 AED}; totalSelectedSeatsAmount 80 AED; PnrReprice 200 and Retrieve 200 (bookingStatus OnHold) both show seat 33-H. Run 1 (AddPassenger ids): 400 "Seat '33-H~0B5' is not available for passenger ... Run the SeatMap step first"
- **Expected:** UNKNOWN - confirm live whether Hold ignores an unrecognized passengersSelectedSeats field, rejects it, or accepts it; check whether passengersSelectedSeats/passengerSeats appear in Retrieve without a SeatAfterHold call
- **Actual:** STILL REPRODUCES (BUG-08, 10th confirmed occurrence overall; first on Galileo). Hold, documented as having no seat field, accepts passengersSelectedSeats, validates it against the seat map (with the GetSeatMap ids; with the AddPassenger ids it is rejected 400), prices the seat into the held offer (totalSelectedSeatsAmount 80 AED, totalAmount 650 AED = FareConfirm 570 + 80) and Retrieve shows seat 33-H on the OnHold booking, all without a SeatAfterHold call (which Galileo does not support, BUG-03). Two further inconsistencies on the same booking are filed as new/recurring defects: (a) BUG-25 (new): the passenger identifier changes between responses - the Hold response keys passengersSelectedSeats by the seat-map GUID (a97ff227...), while PnrReprice and Retrieve key it by qX/yJ4adT32Qj4+g5yOzYg== and the PnrReprice passengerFareBreakdown[].passengerRefId is yet another value (4BdS+DUq... vs qX/yJ4ad... in Hold/Retrieve); (b) BUG-18 (5th occurrence): Hold/PnrReprice/Retrieve list paxTotalAmount 570 AED (the pre-seat fare) although priceDetails.totalAmount is 650 AED, so the passenger lines do not add up to the booking total; Hold and PnrReprice also omit passengerSeats/paxTotalSeatAmount that Retrieve shows.
- **Status:** FAIL
- **Evidence:** Hold 200 pnr 7JRHGS; Retrieve pnr 7JRHGS bookingStatus OnHold, seat 33-H 80 AED, totalSelectedSeatsAmount 80 AED; passengersSelectedSeats key: Hold a97ff227-869d-4f7d-908f-8fa0e723b362 / PnrReprice qX/yJ4adT32Qj4+g5yOzYg== / Retrieve qX/yJ4adT32Qj4+g5yOzYg==; passengerRefId: Hold qX/yJ4adT32Qj4+g5yOzYg== / PnrReprice 4BdS+DUqWDKAOmOfTAAAAA== / Retrieve qX/yJ4adT32Qj4+g5yOzYg==

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 77 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 200 - pnr 7JRHGS, gdsPNR HNC0K5, holdExpirationDate 2026-12-09T23:59:00+02:00, seats ["33-H 80 AED"]
  - **Hop 6 &mdash; PnrReprice (FareConfirmAfterHold):** FAIL &mdash; 200 - selectedOffer.totalAmount 650 AED, seats ["33-H 80 AED"]
  - **Hop 7 &mdash; Retrieve:** FAIL &mdash; 200 - pnr 7JRHGS, bookingStatus OnHold, seats ["33-H 80 AED"]
  - **Hop 8 &mdash; Hold (run 1, AddPassenger ids):** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [Seat '33-H~0B5' is not available for passenger '74938ec1-399d-4be8-8c41-c40f88421e8b' on segment 'vJuS+DVqWDKA9PpZTAAAAA=='. Run the SeatMap step first and select a seat returned for this passenger.]

### FLOW-V2-CANDIDATE-SM-HOLD-01 — FAIL

- **Test Case:** [Flow Candidate SM-Hold-A][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold, before FareConfirmAfterHold.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; SeatAfterHold -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Request:** Candidate chain A on Galileo/EGY (MS901 CAI-DXB 2026-12-15): Hold, then SeatAfterHold immediately, then PnrReprice, BookAfterHold, Retrieve
- **Response:** Hold 200 (pnr 7JRDOH); SeatAfterHold 409 OperationNotSupported; PnrReprice 200; BookAfterHold 409 (FOP application failed: CHECK DATE); Retrieve 200 bookingStatus OnHold, no seat
- **Expected:** UNKNOWN by design: if this position is correct, SeatAfterHold succeeds and the final Retrieve shows the seat; if wrong, SeatAfterHold or a later step rejects
- **Actual:** STILL REPRODUCES (BUG-03). The chain fails at the SeatAfterHold hop: Galileo is rejected outright (409 OperationNotSupported). It was continued to the end for the record: PnrReprice (FareConfirmAfterHold) 200, BookAfterHold fails at ticketing (409 "Indicates FOP application failed: CHECK DATE", the same card problem that blocks Book), Retrieve shows an OnHold booking with no seat. Candidate A cannot succeed on this supplier.
- **Status:** FAIL
- **Evidence:** SeatAfterHold 409 OperationNotSupported in 0.2s; BookAfterHold 409; Retrieve OnHold, passengersSelectedSeats {}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 63 offers, offer[0] totalAmount 735 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr 7JRDOH, gdsPNR HNC0JW, holdExpirationDate 2026-12-15T23:59:00+02:00, seats []
  - **Hop 5 &mdash; SeatAfterHold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]
  - **Hop 6 &mdash; PnrReprice (FareConfirmAfterHold):** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, seats []
  - **Hop 7 &mdash; BookAfterHold:** FAIL &mdash; 409 NDC-INT-UNC-Z9999 [3539: UR Modify Service Error. - Indicates FOP application failed: CHECK DATE - UR Modify Service Error.]
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200 - pnr 7JRDOH, bookingStatus OnHold, seats []

### FLOW-V2-CANDIDATE-SM-HOLD-02 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-B][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; SeatAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Request:** Candidate chain B on Galileo/EGY (Hold pnr 7JQITP): Hold, PnrReprice, then SeatAfterHold, then BookAfterHold, Retrieve
- **Response:** Hold 200; PnrReprice 200; SeatAfterHold 409 OperationNotSupported; BookAfterHold 409 (FOP failure); Retrieve 200 OnHold, no seat
- **Expected:** UNKNOWN by design - same logic as candidate 01, testing whether re-pricing must happen before or after the seat is attached
- **Actual:** Blocked. The chain ran to the end, but SeatAfterHold is rejected at supplier level at this position as at every other (BUG-03), and BookAfterHold fails at ticketing, so the case says nothing new about whether re-pricing must precede the seat. Mutually exclusive with candidates 01 and 03, which fail identically.
- **Status:** BLOCKED
- **Evidence:** SeatAfterHold 409 OperationNotSupported; PnrReprice 200; BookAfterHold 409; Retrieve OnHold

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 72 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr 7JQITP, gdsPNR HNC0JX, holdExpirationDate 2026-12-16T23:59:00+02:00, seats []
  - **Hop 5 &mdash; PnrReprice (FareConfirmAfterHold):** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, seats []
  - **Hop 6 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]
  - **Hop 7 &mdash; BookAfterHold:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [3539: UR Modify Service Error. - Indicates FOP application failed: CHECK DATE - UR Modify Service Error.]
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200 - pnr 7JQITP, bookingStatus OnHold, seats []

### FLOW-V2-CANDIDATE-SM-HOLD-03 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-C][Response] Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; SeatAfterHold -&gt; Retrieve
- **Request:** Candidate chain C on Galileo/EGY (Hold pnr 7JQVNU): Hold, PnrReprice, BookAfterHold, then SeatAfterHold, Retrieve
- **Response:** Hold 200; PnrReprice 200; BookAfterHold 409 (FOP failure); SeatAfterHold 409 OperationNotSupported; Retrieve 200 OnHold
- **Expected:** UNKNOWN by design: if seat selection is a pre-ticketing step only, expect rejection once the booking is finalized; otherwise the seat is attached
- **Actual:** Blocked. BookAfterHold fails at ticketing (so the booking is never finalized) and SeatAfterHold is rejected at supplier level exactly as at every other position (BUG-03), so the post-finalization behaviour cannot be observed. Mutually exclusive with candidates 01 and 02.
- **Status:** BLOCKED
- **Evidence:** BookAfterHold 409 FOP failure; SeatAfterHold 409 OperationNotSupported; Retrieve OnHold, no seat

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 61 offers, offer[0] totalAmount 615 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr 7JQVNU, gdsPNR HNC0JZ, holdExpirationDate 2026-12-17T23:59:00+02:00, seats []
  - **Hop 5 &mdash; PnrReprice (FareConfirmAfterHold):** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, seats []
  - **Hop 6 &mdash; BookAfterHold:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [3539: UR Modify Service Error. - Indicates FOP application failed: CHECK DATE - UR Modify Service Error.]
  - **Hop 7 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200 - pnr 7JQVNU, bookingStatus OnHold, seats []

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-A][Request] Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken triple carried over from a different, unrelated Hold call earlier in the same test session.
- **Category:** Flow
- **Endpoint Name:** Hold (x2) -&gt; SeatAfterHold
- **Request:** Fresh Hold (pnr 7JRKKF), then SeatAfterHold using the pnr/gdsPNR/bookingToken of the earlier, unrelated Hold H1 (pnr 7JQQC8)
- **Response:** Hold 200; SeatAfterHold 409 OperationNotSupported "Galileo does not exists" in 0.1s
- **Expected:** Request is rejected (exact status UNKNOWN), same class as TC-SEATAFTERHOLD-NEG-01 but inside a full flow context
- **Actual:** Actually attempted; the supplier-level rejection (BUG-03) fires before any identity check, so a stale identity cannot be told apart from a valid one. Both Holds were genuinely created.
- **Status:** BLOCKED
- **Evidence:** HN Hold 7JRKKF/HNC0K6; H1 7JQQC8; SeatAfterHold 409 OperationNotSupported

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 73 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Hold:** PASS &mdash; 200 - pnr 7JRKKF, gdsPNR HNC0K6, holdExpirationDate 2026-12-18T23:59:00+02:00, seats []
  - **Hop 5 &mdash; SeatAfterHold:** BLOCKED &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Galileo does not exists]

### TC-BOOK-BIZ-05 — FAIL

- **Test Case:** [Book][Request] Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger (ADT+CHD) -&gt; GetSeatMap -&gt; Book
- **Request:** Book assigning the CHD passenger to exit-row seat 31-A (cell description: "Seat not allowed for infant; Seat not allowed for medical; PaidGeneralSeat; ExitRow; Seat not suitable for child; Left side of aircraft; Window; Overwing row") and the ADT to 33-J (SV386 CAI-JED 2026-11-25, 1 ADT + 1 CHD)
- **Response:** 409 NDC-INT-UNC-Z9999 after 51.2 s - the request passed Book's seat validation, ran the supplier round-trip and failed only at ticketing (gdsPnr HNC0JV); no validation error for the child in the exit row
- **Expected:** Server-side rejection (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD) and no pnr created
- **Actual:** STILL REPRODUCES (BUG-09, 12th confirmed occurrence overall; first on Galileo). GetSeatMap lists all 12 exit-row cells (31-A... and 53-A...) in the CHD passenger's allow-list and prices them, although every one of those cells is itself described "Seat not suitable for child" (padis IE). Book then accepts the assignment: instead of a 0.1 s validation 400 (what the same endpoint returns for an unavailable or mismatched seat), it ran the full supplier call for 51.2 s and failed only at the unrelated ticketing step. The booking therefore reached Galileo with a child in an exit row; whether the seat stayed on the held reservation (HNC0JV) cannot be read back. The safety rule is not enforced by the API.
- **Status:** FAIL
- **Evidence:** CHD allow-list contains 12/12 exit cells, 12 of them labelled "Seat not suitable for child"; Book 409 after 51.2 s (not a 0.1 s 400); gdsPnr HNC0JV

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 74 offers, offer[0] totalAmount 760 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1330 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JV] [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JV]

### TC-BOOK-NEG-07 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request that assigns the same seat cell to two different passengers.
- **Category:** Negative
- **Endpoint Name:** AddPassenger (2 ADT) -&gt; GetSeatMap -&gt; Book
- **Request:** Book assigning the identical seat 22-B (same cellCode/cellId) to two different passengers on the same segment (MS901 CAI-DXB 2026-11-26, 2 ADT)
- **Response:** 400 NDC-INT-TEC-A0001 in 0.1s: "Seat '22-B' is assigned to multiple passengers on segment ..."; no booking created
- **Expected:** Request rejected (candidate DUPLICATE_SEAT_SELECTION_IN_REQUEST) before any supplier round-trip; exact status UNKNOWN; no pnr created
- **Actual:** Rejected cleanly and fast (0.1 s, so before any supplier call) with a specific, on-point validation message naming the seat and the segment; no booking or held reservation was created. The candidate error code DUPLICATE_SEAT_SELECTION_IN_REQUEST is not used: the real shape is the generic NDC-INT-TEC-A0001 with the explanation in Context[].Value (FlyAdeal additionally returned a PredicateValidator entry).
- **Status:** PASS
- **Evidence:** Book 400 in 0.1s; ErrorCode NDC-INT-TEC-A0001; Context: Seat '22-B' is assigned to multiple passengers on segment ...; no pnr

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 67 offers, offer[0] totalAmount 1230 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1750 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [Seat '22-B' is assigned to multiple passengers on segment 'vJuS+DVqWDKAQfsZTAAAAA=='.]

### TC-BOOK-NEG-08 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request where the same passenger selects two different seats on the same segment.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book (duplicate segment key)
- **Request:** Valid JSON cannot carry two entries under one object key, so two raw Book bodies were sent with the same segment key repeated under one passenger: (1) seat 33-F then 34-C (both valid), (2) valid 33-F first then an invalid cellCode 99-Z second
- **Response:** (1) 409 after 39.1 s (reached ticketing; no validation error); (2) 400 in 0.1 s naming only the second entry: "Seat 'CellCode' value '99-Z' does not match the seat identified by 'CellId' ('34-C')..."
- **Expected:** UNKNOWN - documents that setSegmentsSeats is object-keyed (a true duplicate cannot be sent) and verifies the last-value-wins behaviour is understood, rather than asserting a rejection
- **Actual:** Constraint documented and behaviour observed: in valid JSON a segment key can appear only once, and when a raw body forces the duplicate the server keeps the LAST value and discards the first without any error (run 2: only the second entry, 99-Z, is validated and named in the error; the valid first entry 33-F is never mentioned). Run 1 (two valid seats) was accepted by validation and failed only at ticketing, so the booking-level outcome (34-C attached) cannot be read back, but run 2 proves which value wins. Same as GulfAir (Round 20) and FlyAdeal (Round 21).
- **Status:** PASS
- **Evidence:** run 1 409 (gdsPnr HNC0JY); run 2 400 names 99-Z only

  - **Attempt 1 of 2 - 33-F then 34-C (both valid):** HTTP 409
  - **Attempt 2 of 2 - valid 33-F first, invalid 99-Z second:** HTTP 400

### TC-BOOK-BIZ-06 — BLOCKED

- **Test Case:** [Book][Response] Verify an Infant (INF) passenger travelling on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger (ADT+INF) -&gt; GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats only for the ADT (33-L); the INF has no entry at all (SV386 CAI-JED 2026-11-28, 1 ADT + 1 INF)
- **Response:** 409 NDC-INT-UNC-Z9999 after 49.1 s (ticketing failure, gdsPnr HNC0K3); no pnr
- **Expected:** Book/Retrieve succeed; INF paxTotalSeatAmount 0 (or absent) and no passengerSeats; the ADT seat price equals the ADT paxTotalSeatAmount; totalSelectedSeatsAmount counts only the ADT
- **Actual:** Blocked: no booking can be completed, so the response and Retrieve assertions cannot be checked (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). What was established: the ADT-only seat request with no INF entry passed Book's request validation (it reached the supplier, no 400). The seat map also treats the infant correctly: the INF is listed in passengersDetails with an empty allow-list (0 seats) and has no seatPriceDetailsByPassenger entry on any cell.
- **Status:** BLOCKED
- **Evidence:** Book 409 after 49.1 s (gdsPnr HNC0K3); INF allow-list length 0; INF price entries on all cells 0

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 82 offers, offer[0] totalAmount 640 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 930 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0K3] [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0K3]

### TC-BOOK-NEG-09 — FAIL

- **Test Case:** [Book][Request] Validate graceful rollback (no orphaned PNR or charge) when the supplier's seat allocation call fails or times out after Book is submitted with a seat selection.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book (supplier-side failure after submission)
- **Request:** Book with a seat selection (seat 33-E, valid cellCode/cellId, SV386 CAI-JED 2026-11-20) in a scenario where the supplier-side step fails after the request is accepted - here Galileo's ticketing step (invalid credit card on the credentials), which fails reproducibly (10 of 10 Book calls that reach the supplier)
- **Response:** 409 NDC-INT-UNC-Z9999 (host error 12008) after 41.8 s; no pnr and no bookingToken in the response; the message itself says the reservation "failed at Ticketing stage and still at the hold state with gdsPnr HNC0JN"
- **Expected:** Response is an error; either no pnr is returned, or a Retrieve shows the booking without the failed seat and without a fee - i.e. no orphaned booking or charge is left behind (candidate HTTP 422/502; exact behaviour UNKNOWN)
- **Actual:** Executed on a real supplier-side failure (not the seat-allocation failure the case names, but the same property: the supplier rejects a step after Book was accepted). Result: the API returns a generic 409 with no pnr/bookingToken, but the supplier reservation is NOT rolled back - Galileo keeps a live held PNR (HNC0JN) that the caller can neither retrieve (no pnr/bookingToken) nor cancel, and the only handle is a gdsPnr buried in the free-text error message. Every one of the 10 failed Books left such an orphan (HNC0JP, HNC0JN, HNC0JQ, HNC0JV, HNC0JY, HNC0K0, HNC0K1, HNC0K2, HNC0K3, HNC0K4). This violates "no orphaned booking" and is filed as new defect BUG-24 (related to BUG-16/BUG-12, where Book errors hid a created booking). The cause here (invalid card) is environmental; the missing rollback and the missing identifiers in the error are not.
- **Status:** FAIL
- **Evidence:** 10 Book calls -&gt; 10 409 responses, each naming a distinct held gdsPnr (HNC0JP, HNC0JN, HNC0JQ, HNC0JV, HNC0JY, HNC0K0, HNC0K1, HNC0K2, HNC0K3, HNC0K4); none returns pnr or bookingToken; error body fields: Status, TransactionId, ErrorCode, ErrorMessage, Context, OriginalSupplierRequest, OriginalSupplierResponse

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 91 offers, offer[0] totalAmount 390 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Book:** FAIL &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JN]

### TC-BOOK-VAL-07 — BLOCKED

- **Test Case:** [Book][Request] Validate that submitting a second, different passengersSelectedSeats selection supersedes an earlier selection made earlier in the same test session (late seat-change-before-submission).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book (seat changed before sending)
- **Request:** Build a Book request with seat A, replace it with seat B before sending, send once; Book should reflect only seat B
- **Response:** Not run as a Book: Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created, so Book's echo cannot be read; calls would only add orphan reservations
- **Expected:** Book succeeds and reflects cell B only; cell A appears nowhere in the response; cell A's availability is unaffected by the abandoned selection
- **Actual:** Blocked. This is a client-side construction check whose only observable is Book's echo of exactly what was sent, and Book cannot complete on this host. Supporting observation on the Hold path: the one Hold carrying a single seat (33-H) echoes exactly that seat and no other; and after it, seat 33-H turned Occupied while no other cell changed (see TC-SEATMAP-BIZ-04).
- **Status:** BLOCKED
- **Evidence:** Book 409 at ticketing on every attempt; Hold with one seat echoes only 33-H

### TC-BOOK-BIZ-07 — BLOCKED

- **Test Case:** [Book][Request] Validate a designated wheelchair-accessible seat can be selected for a passenger flagged for special assistance, and the assignment is preserved.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; Retrieve (wheelchair-accessible seat)
- **Request:** Identify a wheelchair-accessible cell from cellCharacteristics/description, book it for a passenger needing assistance, read it back
- **Response:** Cell identified: padisCode "H" ("Handicapped") appears on 110 seat cells across the 18 maps (no wheelchair-assistance SSR field exists in the V2 request); Book not run (cannot complete)
- **Expected:** Book/Retrieve succeed with the seat attached like any other paid seat; any SSR linkage is a new SPEC.md 2.9 finding
- **Actual:** Blocked at the Book step (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). Unlike GulfAir and FlyAdeal, whose seat vocabularies have no wheelchair marker, Galileo does expose one: padisCode H "Handicapped" on 110 cells, so a suitable cell can be identified; the part that cannot be done is booking it and reading the assignment back. The V2 AddPassenger/Book schema still has no special-assistance field to carry a WCHR code alongside the seat.
- **Status:** BLOCKED
- **Evidence:** padisCode H "Handicapped" on 110 of 4890 seat cells (e.g. ); related marker "Seat not allowed for medical" on 280 cells

### TC-BOOK-VAL-08 — BLOCKED

- **Test Case:** [Book][Response] Verify the currency code is consistent (not a generic placeholder like "string") across every seat-price object in one Book response.
- **Category:** Validation
- **Endpoint Name:** Book (response currency consistency)
- **Request:** Collect every seat-related price.currency in one Book response with a paid seat and compare them; not reachable (Book cannot complete)
- **Response:** No Book response exists. Reference only: the Hold response for a one-seat offer has 3 seat-related currency values, all "AED"
- **Expected:** Every seat-related price.currency value is identical (the offer currency) and none is a placeholder such as "string" or empty
- **Actual:** Blocked for Book (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). Supporting evidence from the Hold response: the 3 seat-related currency values (passengersSelectedSeats price, totalSelectedSeatsAmount, totalSelectedSeats price) are all "AED", equal to the offer currency, none a placeholder; all 6528 seat-map price entries are also AED. Not a pass for Book.
- **Status:** BLOCKED
- **Evidence:** Hold seat-related currencies: AED (3 values); seat map price entries AED 6528

### TC-BOOK-REG-03 — BLOCKED

- **Test Case:** [Book][Response] Verify selectedOffer.passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount when exactly one seat is selected.
- **Category:** Regression
- **Endpoint Name:** Book (passengerSeats vs paxTotalSeatAmount)
- **Request:** Book with exactly one seat; compare passengerSeats[0].price.amount with paxTotalSeatAmount.amount; not reachable (Book cannot complete)
- **Response:** No Book response exists. Reference only: Retrieve of the held one-seat reservation has passengerSeats[0] 80 AED and paxTotalSeatAmount 80 AED (equal)
- **Expected:** The two amounts are exactly equal (same currency); any mismatch is a confirmed defect against 2.9
- **Actual:** Blocked for Book (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). On the only path that returns both fields (Retrieve of the held reservation) they agree: 80 AED == 80 AED. Hold and PnrReprice responses carry neither field (see BUG-18 on FLOW-V2-50-SEATFIELD). Supporting evidence only.
- **Status:** BLOCKED
- **Evidence:** Retrieve pnr 7JRHGS: passengerSeats[0].price 80 AED; paxTotalSeatAmount 80 AED

### TC-BOOK-NEG-10 — BLOCKED

- **Test Case:** [Book][Request] Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object ({}) rather than omitted.
- **Category:** Negative
- **Endpoint Name:** AddPassenger -&gt; Book (passengersSelectedSeats = {})
- **Request:** Book identical to a no-seat baseline except passengersSelectedSeats is present as an empty object {} (NE170 CAI-JED 2026-11-30, 1 ADT)
- **Response:** 409 NDC-INT-UNC-Z9999 after 31.9 s (ticketing failure, gdsPnr HNC0K1); no 400 or 500 for the empty-object shape
- **Expected:** Book succeeds (HTTP 200), no seat fee, passengersSelectedSeats empty/absent in the response, no 500 from the explicit empty object
- **Actual:** Blocked: the success half cannot be shown (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). The shape half is answered: the explicit empty object passed request validation and reached the supplier (no 400, no 500), so it is not mishandled as a bad request.
- **Status:** BLOCKED
- **Evidence:** Book 409 after 31.9 s (gdsPnr HNC0K1); no validation error

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 71 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0K1]

### TC-BOOK-NEG-11 — BLOCKED

- **Test Case:** [Book][Request] Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book (&lt;pax&gt;.setSegmentsSeats = {})
- **Request:** Book with passengersSelectedSeats.&lt;passenger GUID&gt;.setSegmentsSeats = {} (the passenger key exists but selects no segment/cell) (MS901 CAI-DXB 2026-12-01, 1 ADT)
- **Response:** 409 NDC-INT-UNC-Z9999 after 32.2 s (ticketing failure, gdsPnr HNC0K4). A first run keyed the passenger as "Pax1" (as the collection does): 400 "Passenger with reference 'Pax1' does not exist in the booking metadata" in 0.1 s
- **Expected:** Book succeeds; no seat attached; no error from the otherwise-empty nested object
- **Actual:** Blocked: the success half cannot be shown (Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created). Two findings: with the real passenger key (the GUID from the seat map's passengersDetails) the empty setSegmentsSeats passes validation and reaches the supplier; and the key must be that GUID, not the collection's "Pax1"/"PAX1" - an unknown key is a clean 400, so every future seat case on Galileo must read the passenger key from GetSeatMap.
- **Status:** BLOCKED
- **Evidence:** Book 409 after 32.2 s (gdsPnr HNC0K4); run 1 with key "Pax1": 400 in 0.1s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 63 offers, offer[0] totalAmount 735 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 875 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 [12008: Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0K4]

### TC-BOOK-NEG-12 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects requests with each mandatory field individually omitted: ResponseId/fareConfirmResponseId, selectedOfferId/SelectedOfferId, supplier, credentialsSelector.
- **Category:** Negative
- **Endpoint Name:** Book (each mandatory field omitted)
- **Request:** Four Book runs on four fresh offers, each omitting one mandatory field: ResponseId (CAI-JED), selectedOfferId (CAI-DXB), supplier (CAI-RUH), credentialsSelector (CAI-KWI)
- **Response:** omit ResponseId: 409 after 30.7 s (accepted by validation, failed at ticketing, gdsPnr HNC0K0); omit selectedOfferId: 400 NDC-INT-TEC-A0001 "required passenger or offer information is missing or incomplete" in 0.1 s; omit supplier: 400 code 1001 "Select a valid Supplier"; omit credentialsSelector: 400 code 1001 "Select a valid CredentialsSelector"
- **Expected:** All four runs are rejected; no pnr created in any run
- **Actual:** STILL REPRODUCES (BUG-05, 11th confirmed occurrence overall; first on Galileo): omitting ResponseId is not rejected - Book ran the full supplier round-trip (30.7 s) and created a held reservation (HNC0K0) before failing at ticketing, so ResponseId is not actually required. The other three omissions are cleanly rejected with a 400 in 0.1 s (supplier and credentialsSelector with the 1001 validation envelope; selectedOfferId with a clean NDC-INT-TEC-A0001 message, so BUG-22 - the HTTP 500 seen on FlyAdeal - did NOT reproduce).
- **Status:** FAIL
- **Evidence:** omit ResponseId 409 (ticketing, gdsPnr HNC0K0) | omit selectedOfferId 400 | omit supplier 400 | omit credentialsSelector 400

  - **Run 1 of 4 - ResponseId omitted:** HTTP 409
  - **Run 2 of 4 - selectedOfferId omitted:** HTTP 400
  - **Run 3 of 4 - supplier omitted:** HTTP 400
  - **Run 4 of 4 - credentialsSelector omitted:** HTTP 400

### TC-SEATMAP-VAL-05 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Paired every cellCharacteristics padisCode with its description across all 18 seat maps (17942 pairs) and checked each pair against the canonical PADIS reference table (Resources/SeatResources/PadisSeatCharacteristic.md)
- **Response:** 18 distinct code/description pairs, all 18 codes present in the reference table, 0 contradictions
- **Expected:** For every padisCode observed, the description must not contradict the code's known meaning per the canonical reference table; codes outside it are logged, not failed
- **Actual:** 0 contradictions. All 18 codes observed (B, CH, I, K, W, _9, A, H, E, L, LS, OW, RS, _1A, _1B, IE, O, _1W) exist in the reference table and every description means what its code means. Two non-contradicting oddities are logged: (1) the wording is not the canonical text for 10 of 18 codes (e.g. W "Window" vs "Window seat", A "Aisle" vs "Aisle seat", E "ExitRow" vs "Exit and emergency exit", K "Bulkhead" vs "Bulkhead seat", L "ExtraLegRoom" vs "Leg space seat", CH "PaidGeneralSeat" vs "Chargeable seat"), although the source comment says descriptions are computed from the shared table for every supplier; (2) the four codes that start with a digit are returned with a leading underscore (_9, _1A, _1B, _1W instead of 9, 1A, 1B, 1W). Seat cells' own description string always equals its characteristics' descriptions joined with "; " (0 exceptions).
- **Status:** PASS
- **Evidence:** 18 pairs; 0 contradictions; wording differs from the reference for B, CH, K, W, A, H, E, L, OW, O; underscore-prefixed: _9, _1A, _1B, _1W

### TC-SEATMAP-BND-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify AvailableFree is accepted as a real cellAvailability value (confirmed via saved example) and confirm live whether AvailableAfterReservation is also real, beyond the four now-evidenced values (AvailablePaid, Blocked, Occupied, AvailableFree).
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** Scanned every cellAvailability/paxCellAvailability value in all 18 Galileo seat maps (4890 seat cells, SV A330 and MS A320neo, public fares) for AvailableFree and AvailableAfterReservation
- **Response:** Values seen: cellAvailability {"Blocked":121,"AvailablePaid":4766,"Occupied":3}; paxCellAvailability {"Blocked":154,"AvailablePaid":6371,"Occupied":3}. AvailableFree: 0; AvailableAfterReservation: 0
- **Expected:** AvailableFree confirmed live (known from the saved AirArabia example and earlier rounds); AvailableAfterReservation confirmed or recorded as an unconfirmed candidate
- **Actual:** Not observable on this supplier. Galileo's maps contain only AvailablePaid, Blocked and Occupied (every bookable seat is a paid seat on the public fares sampled; no bundle or fare class with free seat selection exists because Galileo has no bundles), so neither value appears and this supplier cannot confirm them. AvailableFree stays confirmed from GulfAir (Round 20, passenger level) and FlyAdeal (Round 21, cell level); AvailableAfterReservation remains unconfirmed after 4890 more seat cells.
- **Status:** BLOCKED
- **Evidence:** distinct cellAvailability Blocked/AvailablePaid/Occupied; AvailableFree 0; AvailableAfterReservation 0 (4890 seat cells)

### TC-SEATMAP-VAL-06 — PASS

- **Test Case:** [SeatMap][Response] Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Partitioned every cell of all 18 seat maps by cellCategory and checked column/cellDetails presence
- **Response:** 1263 Aisle cells, 4890 Seat cells, 392 NoSeat cells; 0 violations
- **Expected:** Aisle implies column null AND cellDetails null; Seat implies column non-null AND cellDetails a populated object; no cell violates this
- **Actual:** 0 violations. All 1263 Aisle cells have column null and cellDetails null; all 4890 Seat cells have a letter column (A, B, C, D, E, F, H, J, K, L) and a populated cellDetails object. The 392 NoSeat cells (not covered by this rule) have cellDetails null and keep their column letter.
- **Status:** PASS
- **Evidence:** Aisle with column/cellDetails non-null: 0; Seat with null column/cellDetails: 0; NoSeat with cellDetails: 0

### TC-RETRIEVE-REG-01 — BLOCKED

- **Test Case:** [Retrieve][Response] Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed (Retrieve After Issue).
- **Category:** Regression
- **Endpoint Name:** Book -&gt; Retrieve #1 -&gt; (ticketing) -&gt; Retrieve #2
- **Request:** Book with a seat, Retrieve immediately, wait for ticketing, Retrieve again and compare the seat fields; not reachable
- **Response:** No booking ever reaches ticketing: every Book ends 409 at the ticketing step and every BookAfterHold ends 409 (FOP application failed); the only readable reservations are OnHold (e.g. Retrieve 7JRHGS: bookingStatus OnHold, tickets none)
- **Expected:** Seat fields in Retrieve #2 (after ticketing) are identical to Retrieve #1; the seat does not disappear or change once ticketing completes
- **Actual:** Blocked: the booked-to-ticketed transition never happens on this host (invalid credit card on the Galileo credentials), so there is no "after issue" Retrieve to compare. The Hold-path Retrieve itself works and shows the seat (33-H) on the OnHold booking.
- **Status:** BLOCKED
- **Evidence:** Book 409 x10, BookAfterHold 409 x3; Retrieve 7JRHGS bookingStatus OnHold

### TC-BOOK-INT-04 — BLOCKED

- **Test Case:** [Book][Request] Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent (both resolve to the same journey).
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book (bundle + seat)
- **Request:** A Book carrying both selectedBundles (JourneyKey + SelectedBundleCode) and a seat for a segment of the same journey; needs a bundle code from GetOfferBundles
- **Response:** GetOfferBundles is rejected for Galileo (409 OperationNotSupported); haveBundles false on all 41 FareConfirm calls
- **Expected:** Book succeeds; the response reflects both the bundle and the seat without either overriding the other's pricing
- **Actual:** Not executable for Galileo: no bundle capability (GetOfferBundles 409 OperationNotSupported, haveBundles false on all 41 offers), so no JourneyKey/bundle code exists to cross-check against a seat's segmentRefId. Book also cannot complete on this host.
- **Status:** BLOCKED
- **Evidence:** GetOfferBundles 409 OperationNotSupported; haveBundles true on 0 of 41 offers

### TC-SEATAFTERHOLD-VAL-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Once SeatAfterHold's real contract is confirmed (TC-SEATAFTERHOLD-VAL-01), validate it rejects a seat/passenger reference that does not belong to the passengers established at AddPassenger/Hold time for this pnr.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** Re-check the confirmed SeatAfterHold request shape (needs the real contract from TC-SEATAFTERHOLD-VAL-01)
- **Response:** SeatAfterHold rejects Galileo outright (409 OperationNotSupported on all 13 calls this round), so no confirmed request shape exists
- **Expected:** Per the confirmed contract: field validation and chaining behave consistently with Book's passengersSelectedSeats
- **Actual:** Still blocked: SeatAfterHold is not supported for Galileo (BUG-03), so the confirmed request shape this case depends on does not exist. Unchanged from the GulfAir and FlyAdeal rounds.
- **Status:** BLOCKED
- **Evidence:** SeatAfterHold 409 OperationNotSupported on every call (H1 x6 incl. security variants, HA, HB, HC, HN x2)

### TC-SEATMAP-POS-01 — PASS

- **Test Case:** [SeatMap][Response] Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails, matching the flight/segments established at FareConfirm.
- **Category:** Positive
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap with ResponseId/selectedOfferId from AddPassenger (Galileo/EGY, SV386 CAI-JED 2026-11-17, 2 ADT + CHD + INF)
- **Response:** 200 in 2.4s - 300 seat cells, 82 aisle, 28 no-seat cells, rows 30-70; passengersDetails lists 4 passengers (ADT, ADT, CHD, INF)
- **Expected:** HTTP 200; supplier, flightSegments, passengersDetails, seatMapDetails all present and non-null; every segmentRefId key in seatMapDetails also appears in flightSegments and in the FareConfirm/AddPassenger segments (no orphan segments in either direction)
- **Actual:** Confirmed. All four blocks are present and non-null. The single seatMapDetails key (nDOS+DTqWDKAxpUeTAAAAA==) appears identically in the seat map's flightSegments and in FareConfirm's flightSegments; no orphan in either direction. Capability notes: FareConfirm reports isSeatMapRequired=false (BUG-15), but the seat map works for this flight. Seat maps are carrier-dependent on Galileo: SV (A330 330/333) and MS (A320neo 32N) return maps; NE and XY return 409 (see TC-SEATMAP-NEG-05).
- **Status:** PASS
- **Evidence:** 200; keys supplier, offerId, responseId, isFareCheckRequired, flightSegments, passengersDetails, seatMapDetails; segment key nDOS+DTqWDKAxpUeTAAAAA== identical in FareConfirm.flightSegments

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 80 offers, offer[0] totalAmount 1350 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1860 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells

### TC-SEATMAP-NEG-01 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected (or returns an explicit not-supported response) when called for an offer whose isSeatMapRequired flag was false at FareConfirm/AddPassenger time.
- **Category:** Negative
- **Endpoint Name:** FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap for an offer whose FareConfirm reported isSeatMapRequired=false (Galileo/EGY, MS673 CAI-JED 2026-12-20)
- **Response:** 200 in 1.1s - a complete seat map with 120 seat cells
- **Expected:** Rejected, or an explicit unsupported-operation envelope, rather than a 200 with a seat map
- **Actual:** STILL REPRODUCES (BUG-15, 11th confirmed occurrence overall; first on Galileo). The capability flag says no seat map is required/offered (isSeatMapRequired false and offerHasSeat false on all 41 FareConfirm responses this round), yet GetSeatMap returns HTTP 200 with a complete seat map. The flag does not describe the real capability: it is false for SV and MS flights that have working maps and also for NE/NP/XY flights that return 409.
- **Status:** FAIL
- **Evidence:** FareConfirm selectedOffer.isSeatMapRequired false on 41/41 calls (offerHasSeat true on 0); GetSeatMap 200 with a full seat map

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 62 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 580 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-NEG-02 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected when the request otherwise targets a valid offer but no segment of that offer's itinerary is being queried (i.e., the offer/response pair does not correspond to any real segment).
- **Category:** Negative
- **Endpoint Name:** GetSeatMap (cross-offer ids)
- **Request:** Two GetSeatMap calls mixing the ids of two real offers: (1) ResponseId of offer A (MS673 CAI-JED 2026-12-20) + selectedOfferId of offer B (SV386 CAI-JED 2026-12-21); (2) the reverse
- **Response:** (1) 200 - seat map of SV386 CAI-JED 2026-12-21 (offer B); (2) 200 - seat map of MS673 CAI-JED 2026-12-20 (offer A)
- **Expected:** Both mismatched pairings are rejected; no seatMapDetails returned
- **Actual:** STILL REPRODUCES (BUG-01, 11th confirmed occurrence overall; first on Galileo). Both mismatched pairings were accepted with HTTP 200 and a full seat map; the result follows selectedOfferId in both directions and the ResponseId is never cross-checked against it.
- **Status:** FAIL
- **Evidence:** run 1 200 (selectedOfferId of B -&gt; SV386 CAI-JED 2026-12-21); run 2 200 (selectedOfferId of A -&gt; MS673 CAI-JED 2026-12-20)

  - **Attempt 1 of 2 - ResponseId of A + selectedOfferId of B:** HTTP 200
  - **Attempt 2 of 2 - ResponseId of B + selectedOfferId of A:** HTTP 200

### TC-SEATMAP-NEG-03 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap (invalid / stale ids)
- **Request:** Run 1: fabricated ResponseId/selectedOfferId. Run 2: the genuine pair from before AddPassenger was submitted a second time on the same offer (superseded). Control: the fresh pair from the second AddPassenger
- **Response:** Run 1: 400 NDC-INT-TEC-A0001 "SelectedOfferId: Failed to deserialize the selected offer." in 0.1 s. Run 2: 200 with a full seat map. Control: 200
- **Expected:** Both runs rejected (status UNKNOWN); no seatMapDetails returned
- **Actual:** Run 1 (a genuinely fabricated pair) is cleanly rejected with a structured 400. Run 2 is NOT rejected: the superseded pair still works, because the offer id is self-contained and re-running AddPassenger does not invalidate the earlier ids. Recorded PASS on the established basis of every earlier round (the fabricated-pair rejection is the defect check; re-reading a seat map for an old pair is idempotent), but the literal expected result for run 2 is not met.
- **Status:** PASS
- **Evidence:** run 1 400; run 2 200 (stale pair accepted); control 200

  - **Attempt 1 of 3 - fabricated ids:** HTTP 400
  - **Attempt 2 of 3 - stale ids (superseded AddPassenger):** HTTP 200
  - **Attempt 3 of 3 - control, fresh ids:** HTTP 200

### TC-SEATMAP-NEG-04 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap (each mandatory field omitted)
- **Request:** Four GetSeatMap runs on four fresh offers, each omitting one mandatory field: supplier, credentialsSelector, ResponseId, selectedOfferId
- **Response:** omit supplier: 400 (1001 "Select a valid Supplier"); omit credentialsSelector: 400 (1001 "Select a valid CredentialsSelector"); omit ResponseId: 200 with a full seat map (300 seats); omit selectedOfferId: 400 (1001 "The SelectedOfferId field is required")
- **Expected:** All four runs rejected; no seatMapDetails returned
- **Actual:** STILL REPRODUCES (BUG-02, 11th confirmed occurrence overall; first on Galileo). Three of four runs are cleanly rejected with the 400 validation envelope (errorCode 1001, naming the missing field). Omitting ResponseId is accepted and returns the full seat map, so the field GetSeatMap documents as required is not required.
- **Status:** FAIL
- **Evidence:** omit supplier 400 | omit credentialsSelector 400 | omit ResponseId 200 (accepted) | omit selectedOfferId 400

  - **Run 1 of 4 - supplier omitted:** HTTP 400
  - **Run 2 of 4 - credentialsSelector omitted:** HTTP 400
  - **Run 3 of 4 - ResponseId omitted:** HTTP 200
  - **Run 4 of 4 - selectedOfferId omitted:** HTTP 400

### TC-SEATMAP-NEG-05 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap fails gracefully (a structured error, not a raw 500/stack trace) when the underlying supplier call fails or times out.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap (supplier-side failure)
- **Request:** Real supplier-side failures of the GetSeatMap round-trip, found on Galileo: a NE flight (NE174 CAI-JED 2026-12-29) and an XY flight (XY566 CAI-JED 2026-12-30), plus three malformed requests (fabricated ids, malformed JSON, non-GUID ResponseId)
- **Response:** NE: 409 NDC-INT-UNC-Z9999, Context "101: Seat Map is unavailable - Seat Map is unavailable" in 0.5s. XY: 409 NDC-INT-UNC-Z9999, Context "9: Connection with vendor is experiencing problems" after 95.5s. Both bodies carry the extra fields OriginalSupplierRequest and OriginalSupplierResponse. Malformed requests: 400 structured envelopes (1001 / NDC-INT-TEC-A0001) in 0.1-0.3 s
- **Expected:** A structured business-error envelope ({Status, TransactionId, ErrorCode, ErrorMessage, Context}), not an unhandled exception, and no internal type names or raw supplier payloads leaked into the error body
- **Actual:** Half passes, half fails. The envelope itself is structured and consistent (Status/TransactionId/ErrorCode/ErrorMessage/Context; the 409s repeat the generic code NDC-INT-UNC-Z9999 in both ErrorCode and ErrorMessage), the malformed-request errors are clean 400s, and no stack trace or .NET type name leaks. But both supplier-failure responses also carry OriginalSupplierRequest and OriginalSupplierResponse, i.e. the raw upstream payloads (a pre-run probe of the same NE call showed a raw Travelport SeatMapReq SOAP envelope with its TargetBranch/AuthorizedBy attributes; values deliberately not recorded here) - the BUG-11 pattern, reproduced on Galileo and on every Book 409 as well (10 of 10). The XY failure also took 95.5s to return. BUG-11 (supplier payload/credential leak in error bodies), 9th confirmed occurrence overall.
- **Status:** FAIL
- **Evidence:** NE 409 (0.5 s), XY 409 (95.5 s): body fields Status, TransactionId, ErrorCode, ErrorMessage, Context, OriginalSupplierRequest, OriginalSupplierResponse; Book 409 bodies carry the same two fields (10 of 10); malformed requests 400

  - **Attempt 1 of 5 - fabricated offer ids:** HTTP 400
  - **Attempt 2 of 5 - malformed JSON body:** HTTP 400
  - **Attempt 3 of 5 - non-GUID ResponseId / garbage selectedOfferId:** HTTP 400
  - **Attempt 4 of 5 - NE flight: supplier says Seat Map is unavailable:** HTTP 409
  - **Attempt 5 of 5 - XY flight: supplier connection problem (95.5 s):** HTTP 409

### TC-SEATMAP-VAL-07 — PASS

- **Test Case:** [SeatMap][Response] Verify seat attributes relevant to customer-facing seat selection (window, aisle, extra legroom/exit row) are programmatically derivable from cellCharacteristics for every Seat-category cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Classified every seat cell of 18 maps from its cellCharacteristics padisCodes and compared the result with the cell's position in its row and its own description (4890 seats)
- **Response:** 1168 window (W), 2372 aisle (A), 1294 centre (_9) seats plus 56 window-without-window (_1W) cells; 228 exit-row (E), 56 extra-legroom (L), 61 bassinet (B), 110 handicapped (H) cells; 0 contradictions
- **Expected:** For codes in the canonical reference table, the derived classification must not contradict column position or description text; codes outside it are logged, not failed
- **Actual:** 0 contradictions. Every one of the 4890 seats carries exactly one position marker (window W / _1W, aisle A or centre _9); all 1168 window seats are at the edge of their row, all 2372 aisle seats touch an Aisle cell, no centre seat does, and the description text always matches the codes. Exit rows (228 cells) are derivable from E; 168 of them also carry "Seat not suitable for child" and "Seat not allowed for infant/medical" (the other 60 exit cells, on the A320neo, carry no restriction flags). The new BUG-23 pattern (one code on every seat) did not appear: K (Bulkhead) appears only on 30 cells.
- **Status:** PASS
- **Evidence:** window 1168 (bad 0), aisle 2372 (bad 0), centre 1294 (bad 0), unmarked 0; exit E 228

### TC-SEATMAP-VAL-08 — FAIL

- **Test Case:** [SeatMap][Response] Verify seatPriceDetails/seatPriceDetailsByPassenger is populated (non-null) for every AvailablePaid cell and null/absent for every Blocked or Occupied cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Grouped every seat cell of 18 maps by cellAvailability and checked seatPriceDetails/seatPriceDetailsByPassenger presence per group
- **Response:** AvailablePaid 4766 cells: 0 without per-passenger prices. Blocked 121 cells: 121 carry priced per-passenger entries and a populated seatPriceDetails. Occupied 3 cells: priced too. seatPriceDetails is non-null on all 4890 seats
- **Expected:** Every AvailablePaid cell has populated per-passenger prices; every Blocked/Occupied cell has seatPriceDetails null
- **Actual:** The AvailablePaid half holds (4766 of 4766). The Blocked/Occupied half fails: all 121 Blocked and all 3 Occupied cells carry a real price (e.g. Blocked 30-D: 160.00 AED per passenger, paxCellAvailability "Blocked") in seatPriceDetailsByPassenger, and the aggregate seatPriceDetails is populated on every cell (none is null, unlike FlyAdeal where only the aggregate was null). A client that shows prices from these fields would offer a price for seats that cannot be bought. This is BUG-20, 2nd confirmed occurrence overall (first on Galileo after FlyAdeal in Round 21).
- **Status:** FAIL
- **Evidence:** Blocked 121/121 priced; Occupied 3/3 priced; seatPriceDetails null: 0 of 4890; paid cells without price: 0

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCode is unique across all cells within one flight segment's seatMapDetails.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Collected every cellCode per flight segment in all 18 maps (19 segments) and checked uniqueness
- **Response:** 4890 seat cells, 0 duplicate cellCodes in any of the 19 segments (codes like 31-A, 33-H: row number, hyphen, column letter)
- **Expected:** cellCode is unique across all cells within one segment's seatMapDetails
- **Actual:** No duplicates: every segment lists each seat code once (4890 codes over 19 segments, rows 21-70 depending on equipment). 0 segments with a duplicate code.
- **Status:** PASS
- **Evidence:** segments checked 19; segments with a duplicate cellCode: 0

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** [SeatMap][Response] Verify structural uniqueness and domain constraints across decks/zones/rows/columns: rowNumber unique within a segment, zoneId unique within a deck, column values restricted to {A,B,C,D,E,F,null}.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Checked rowNumber uniqueness, zoneId uniqueness per deck and the column domain on all 19 segments
- **Response:** 0 repeated row numbers, 0 repeated zoneIds (one zone "1" in deck Main per segment), seat columns A, B, C, D, E, F, H, J, K, L; null column only on Aisle cells
- **Expected:** No rowNumber repeats within a segment; no zoneId repeats within a deck; every non-null column is one of A-F; null columns only on Aisle cells
- **Actual:** Three of four constraints hold exactly: no row number repeats (19 segments), one zone per deck with no repeat, and a null column appears only on Aisle cells (1263; the 392 NoSeat cells keep a column). The fourth is flagged, not failed: the column domain. Galileo's wide-body A330 maps use A, C, D, E, F, H, J, L and some A320neo layouts B/K as well, so letters outside A-F appear (H, J, K, L; G and I are skipped, the usual airline convention). The A-F domain in this case comes from a 6-abreast sample and is too narrow; this is a test-specification update, not an API defect.
- **Status:** PASS
- **Evidence:** row duplicates 0; zone duplicates 0; rows without a declared zone 0; seat columns observed ABCDEFHJKL

### TC-SEATMAP-BIZ-03 — FAIL

- **Test Case:** [SeatMap][Response] Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported, may legitimately differ for the same cell, and are NOT required to list every passenger on the offer.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap
- **Request:** Compared every per-passenger seatPriceDetailsByPassenger entry with the passenger's own allow-list (passengersDetails.&lt;pax&gt;.passengersSeatMapAvailability) in 18 maps (6528 entries)
- **Response:** 6371 of 6528 entries are for allow-listed cells; 157 (Blocked 154, Occupied 3) are priced entries for cells missing from the passenger's allow-list; 0 bookable cells missing a priced entry for an allowed passenger
- **Expected:** Structural consistency: a passenger absent from a cell's price list is valid when not eligible; allow-listed cells carry that passenger's price entry; paxCellAvailability need not equal the overall value
- **Actual:** Consistent for every bookable seat (all 6371 allow-listed entries are priced, every allow-listed code exists as a cell, paxCellAvailability always equals the cell's cellAvailability, and the infant is correctly absent from every cell with an empty allow-list: 0 entries, 0 allowed). It fails the other direction: 157 priced entries exist for Blocked/Occupied cells the passenger is not allowed to select (the allow-list excludes them), i.e. the price list still advertises seats that cannot be bought - the same defect as TC-SEATMAP-VAL-08 (BUG-20).
- **Status:** FAIL
- **Evidence:** entries 6528; in allow-list 6371; priced but not allow-listed 157 ({"Blocked":154,"Occupied":3}); paid cells missing a passenger price 0; INF entries 0

### TC-SEATMAP-BIZ-04 — PASS

- **Test Case:** [SeatMap][Response] Exploratory -- confirm GetSeatMap reflects real-time supplier inventory rather than a cached/stale snapshot.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Hold (seat 33-H) -&gt; GetSeatMap (x2)
- **Request:** GetSeatMap #1 (33-H AvailablePaid); a Hold that selects seat 33-H (SV386 CAI-JED 2026-12-09); GetSeatMap #2 on the same offer; and a fresh Search/FareConfirm/AddPassenger/GetSeatMap on the same flight
- **Response:** #1: 33-H AvailablePaid; after the Hold: 33-H Occupied on the same offer (1.9s) and on the fresh offer; no other cell changed state
- **Expected:** UNKNOWN - resolve empirically: the cell transitions (AvailablePaid -&gt; Occupied) between the two calls, confirming a live supplier round-trip rather than a cached snapshot
- **Actual:** CONFIRMED live inventory (as for GulfAir and FlyAdeal). The seat taken by this session's own held reservation (pnr 7JRHGS) turned Occupied on the very next seat map, both on the same offer and on a completely fresh offer for the same flight. The seat map is read live from the supplier, not cached; a Hold (not only a ticketed booking) is enough to take the seat.
- **Status:** PASS
- **Evidence:** 33-H: AvailablePaid -&gt; Occupied (same offer) and Occupied (fresh offer); same flight SV386 CAI-JED 2026-12-09

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 77 offers, offer[0] totalAmount 380 AED
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 5 &mdash; Hold (takes the seat):** PASS &mdash; 200 - pnr 7JRHGS, gdsPNR HNC0K5, holdExpirationDate 2026-12-09T23:59:00+02:00, seats ["33-H 80 AED"]
  - **Hop 6 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells
  - **Hop 7 &mdash; Search:** PASS &mdash; 200 - 87 offers, offer[0] totalAmount 380 AED
  - **Hop 8 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 570 AED, isSeatMapRequired false, haveBundles false, canBeHeld true
  - **Hop 9 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 10 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 300 seat cells

### TC-SEATMAP-SEC-01 — PASS

- **Test Case:** [SeatMap][Request] Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap.
- **Category:** Security
- **Endpoint Name:** GetSeatMap (auth and tenant isolation)
- **Request:** GetSeatMap on one valid offer with: control (valid), (1) corrupted x-api-key, (2) corrupted Client-Id, (3a) supplier switched to GulfAir/KSA, (3b) same supplier with credentialsSelector KSA; plus a probe of UAE
- **Response:** control 200; (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 400 NDC-INT-TEC-A0001 ("Failed to deserialize the selected offer"); (3b) 400 ("The credentials for the selected supplier do not exist or are not active"); UAE probe 400, same message
- **Expected:** All three checks rejected (shape UNKNOWN; reuse the envelope of other endpoints)
- **Actual:** All three checks are rejected: the two header checks with the same 401 envelope as every other endpoint, and the cross-tenant checks with a 400. Two caveats. The wrong-supplier message is misleading ("deserialize the selected offer"). And BUG-17 (a different VALID credentialsSelector for the same supplier accepted against another selector's offer) could not be tested: Galileo has credentials only for EGY on this host - KSA and UAE both answer "credentials ... do not exist or are not active" - so the selector check is a credentials-existence check here, not proof that an offer is tied to its selector.
- **Status:** PASS
- **Evidence:** control 200; run 1 401; run 2 401; run 3a 400; run 3b 400 (KSA has no Galileo credentials); UAE probe 400

  - **Control - valid headers:** HTTP 200
  - **Run 1 of 4 - corrupted x-api-key:** HTTP 401
  - **Run 2 of 4 - corrupted Client-Id:** HTTP 401
  - **Run 3 of 4 - other supplier GulfAir/KSA:** HTTP 400
  - **Run 4 of 4 - credentialsSelector KSA:** HTTP 400

### TC-SEATMAP-SEC-02 — PASS

- **Test Case:** [SeatMap][Documentation] Record that supplier-side authentication security (this API's own credentials presented to the airline/GDS backend) and request/response logging are not independently verifiable through this API's black-box contract, and identify the correct verification channel for each.
- **Category:** Security
- **Endpoint Name:** Documentation
- **Request:** Documentation check only: supplier-side authentication (AC8) and logging (AC9) are not testable through the caller-facing API
- **Response:** No API call; SPEC.md 1.5/1.8 and NDC_PRD.md Gap #1 re-read
- **Expected:** Recorded as not testable from the API: AC8/AC9 belong to a backend configuration and log audit; hardcoded x-api-key/Client-Id gap documented
- **Actual:** Documented as specified. Supplier-side credential handling (AC8) is a backend credential-storage/config audit item, and logging (AC9) is a log/observability audit item; neither can be asserted through the caller-facing API. Relevant to AC8: Galileo error bodies on this host return raw supplier requests (BUG-11), which is evidence for that audit.
- **Status:** PASS
- **Evidence:** documentation only

### TC-SEATMAP-INT-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols.
- **Category:** Integration
- **Endpoint Name:** GetSeatMap (cross-supplier schema)
- **Request:** Compare the GetSeatMap schema across 3+ suppliers with different native protocols; only Galileo/EGY is in scope this round
- **Response:** Galileo's own response shape is stable across 19 segments, 2 carriers and 3 equipment types (A330 330/333, A320neo 32N): identical key set, zones[] layout, cellDetails shape
- **Expected:** Every supplier's response conforms to the identical schema; differences limited to data values
- **Actual:** Not executed - a cross-supplier comparison cannot be built from one supplier. Within Galileo the schema is identical for SV and MS flights and for 2 and 4 passenger maps. Across suppliers, the earlier rounds recorded GulfAir and FlyAdeal with the same zones[] layout; Galileo adds only supplier data (real PADIS characteristics, NoSeat cells, GUID passenger keys).
- **Status:** BLOCKED
- **Evidence:** 19 segments, 18 maps: same top-level keys (supplier, offerId, responseId, isFareCheckRequired, flightSegments, passengersDetails, seatMapDetails)

### TC-SEATMAP-INT-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Capability-matrix sweep -- run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable per SPEC.md §4.6, and record pass/fail per supplier.
- **Category:** Integration
- **Endpoint Name:** GetSeatMap (capability sweep)
- **Request:** Sweep over every supplier believed seat-map-capable; only Galileo/EGY in scope, so its capability row was established from 41 FareConfirm calls and the seat maps captured
- **Response:** Galileo/EGY row: SeatMap SUPPORTED for SV (A330) and MS (A320neo) flights; NE flight 409 "Seat Map is unavailable"; XY flight 409 "Connection with vendor is experiencing problems" (95.5 s); Hold SUPPORTED (canBeHeld true on 41/41); Bundles NOT supported (409 OperationNotSupported); Ancillary: offerHasAncillary false on all; SeatAfterHold NOT supported; Book blocked (ticketing/FOP)
- **Expected:** Every confirmed-capable supplier's GetSeatMap succeeds with a populated seatMapDetails; not-capable suppliers fail gracefully; a per-supplier pass/fail table is maintained
- **Actual:** Not executed as a sweep: only Galileo/EGY is in scope, so the supplier table cannot be built. Galileo/EGY's row for the living capability table: seat map SUPPORTED but carrier-dependent (isSeatMapRequired false on every offer, BUG-15); Hold supported (returns holdExpirationDate); PnrReprice (FareConfirmAfterHold) supported; Book NOT completable on this host (invalid credit card: 409 at ticketing; BookAfterHold the same); GetOfferBundles and SeatAfterHold NOT supported (409 OperationNotSupported "Galileo does not exists").
- **Status:** BLOCKED
- **Evidence:** FareConfirm flags over 41 offers: seatReq false 41, hold true 41, bundles true 0, ancillary true 0

### TC-SEATMAP-VAL-11 — PASS

- **Test Case:** [SeatMap][Response] Verify passengersSeatMapAvailability.&lt;paxRef&gt;.&lt;segmentRefId&gt; (the top-level per-passenger allow-list of cellCodes) stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Checked the allow-list keys (passengersDetails.&lt;paxRef&gt;.passengersSeatMapAvailability.&lt;segmentRefId&gt;) against the seatMapDetails/flightSegments keys, and every allow-listed code against a real cell, on 18 maps
- **Response:** Key nDOS+DTqWDKAxpUeTAAAAA== identical (character for character) in passengersSeatMapAvailability, seatMapDetails and flightSegments; 0 allow-listed codes without a cell; 0 allow-listed codes that are not AvailablePaid
- **Expected:** (1) every segmentRefId key matches the casing used elsewhere in the response; (2) every cellCode in a passenger's allow-list corresponds to a real cell in that segment's seatMapDetails
- **Actual:** Both assertions hold. The allow-list is nested per passenger (passengersDetails.&lt;paxRef&gt;.passengersSeatMapAvailability.&lt;segmentRefId&gt;.&lt;deck&gt; = [codes]) rather than a top-level block (documentation drift, see REG-02), its segment key equals the seatMapDetails/flightSegments key exactly, every listed code exists as a cell in that segment, and every listed code is an AvailablePaid cell (Blocked/Occupied are excluded; the infant's list is empty).
- **Status:** PASS
- **Evidence:** segment key nDOS+DTqWDKAxpUeTAAAAA== in all three places; allow-listed codes without a cell: 0; allow-listed non-AvailablePaid cells: 0

### TC-SEATMAP-BND-04 — PASS

- **Test Case:** [SeatMap][Response] Confirm live whether any cellCategory value beyond {Seat, Aisle} (e.g. Lavatory/Bathroom, Bulkhead, Galley, Closet, ExitRow, StairsToUpperDeck, WingBox, StorageBin, RestrictedZone, NoSeat, Other, per the full backend enum) is ever returned.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** Scanned every cellCategory value in all 18 seat maps, including wide-body A330 (330/333) equipment
- **Response:** cellCategory values: {"Seat":4890,"Aisle":1263,"NoSeat":392}
- **Expected:** UNKNOWN - resolve empirically: record every distinct category observed; do not assume Seat/Aisle are exhaustive or that the C# enum names match what the API serializes
- **Actual:** Resolved for this supplier, including wide-body equipment: only Seat, Aisle and NoSeat are ever returned (NoSeat on 392 cells: a taken or absent seat position with cellDetails null, matching CellCategory.md's NoSeat member). Galley, lavatory/bathroom, bulkhead, closet, door, exit-row and stairs categories do not exist on Galileo even on the A330: they are not drawn as cells at all, and exit rows / bulkhead / extra legroom are expressed through cellCharacteristics (E, K, L) instead. The Lavatory-vs-Bathroom naming question therefore stays open for any supplier.
- **Status:** PASS
- **Evidence:** distinct cellCategory Seat/Aisle/NoSeat; A330 equipment 330/333 on 14 segments

### TC-BOOK-POS-04 — BLOCKED

- **Test Case:** [Book][Response] Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step.
- **Category:** Positive
- **Endpoint Name:** AddPassenger -&gt; GetSeatMap -&gt; Book -&gt; Retrieve
- **Request:** Book with a seat, then an immediate Retrieve with no ticketing action in between, comparing bookingStatus with the seat fields; not reachable
- **Response:** No Book succeeds, so there is nothing to Retrieve after Book. Reference only: Retrieve right after a seat-carrying Hold (pnr 7JRHGS) shows bookingStatus OnHold with seat 33-H, price 80 AED and totalSelectedSeatsAmount 80 AED
- **Expected:** The immediate post-Book Retrieve already shows the seat and its price while bookingStatus still reads un-ticketed (e.g. Booked, not Ticketed)
- **Actual:** Blocked: Book cannot complete for Galileo/EGY on this host: every Book that reaches the supplier fails at the ticketing step (invalid credit card on the credentials), so no booking is created. On the Hold path the seat is attached to the reservation immediately (visible on Retrieve before any ticketing), which suggests the same at Book time, but that is not this case.
- **Status:** BLOCKED
- **Evidence:** Book 409 x10; Hold Retrieve 7JRHGS: OnHold, seat 33-H

## Findings

### Defects

- **[TC-SEATMAP-NEG-02] BUG-01 (occurrence 11, not new) &mdash; GetSeatMap accepts a ResponseId and selectedOfferId taken from two different offers and returns a full seat map; the result follows selectedOfferId and ResponseId is never cross-checked (now also on Galileo).** Field: `ResponseId / selectedOfferId`. Expected: 4xx rejection of a mismatched pair. **History:** First observed Round 1 (2026-08-25); confirmed 10 times through Round 21 (2026-10-11); reproduced for the first time on Galileo/EGY in Round 22 (2026-10-11). **Impact:** A caller can read the seat map of any offer it can name, regardless of the search it belongs to. Evidence: ResponseId of offer A + selectedOfferId of offer B -&gt; 200, SV386 map (300 seats); reverse -&gt; 200, MS673 map (120 seats).
- **[TC-SEATMAP-NEG-04] BUG-02 (occurrence 11, not new) &mdash; GetSeatMap documents ResponseId as required, but a request that omits it still returns HTTP 200 with the full seat map; the other three mandatory fields are rejected with a 400 (now also on Galileo).** Field: `ResponseId`. Expected: 400 naming the missing ResponseId. **History:** First observed Round 1 (2026-08-25); confirmed 10 times through Round 21 (2026-10-11); reproduced for the first time on Galileo/EGY in Round 22 (2026-10-11). **Impact:** The documented contract is not enforced, so clients cannot rely on validation errors to catch a missing field. Evidence: omit supplier 400, credentialsSelector 400, selectedOfferId 400, ResponseId 200 (300-seat map).
- **[TC-SEATAFTERHOLD-POS-01] BUG-03 (occurrence 11, not new) &mdash; SeatAfterHold rejects every call for supplier Galileo with HTTP 409 OperationNotSupported ("Galileo does not exists") before reading any field, while the endpoint is presented as a normal step of the Hold branch (same behaviour as GulfAir and FlyAdeal).** Field: `SeatAfterHold response (supplier registration)`. Expected: A working SeatAfterHold, or a documented per-supplier unsupported status and a clear error message. **History:** First observed Round 1 (2026-08-25); confirmed 10 times through Round 21 (2026-10-11); reproduced for the first time on Galileo/EGY in Round 22 (2026-10-11). **Impact:** The Hold branch cannot add seats for Galileo, and the error wording is misleading. Evidence: H1 Hold 200 pnr 7JQQC8; SeatAfterHold 409 OperationNotSupported; same on 13 calls (all positions, security variants).
- **[TC-BOOK-NEG-12] BUG-05 (occurrence 11, not new) &mdash; Book documents ResponseId as required, but a Book request that omits it is accepted and runs the full supplier booking (on Galileo it created a held reservation before failing at ticketing); supplier, credentialsSelector and selectedOfferId omissions are rejected with a 400.** Field: `ResponseId`. Expected: 400 for a missing ResponseId. **History:** First observed Round 1 (2026-08-25); confirmed 10 times through Round 21 (2026-10-11); reproduced for the first time on Galileo/EGY in Round 22 (2026-10-11). **Impact:** A malformed Book creates supplier reservations; the documented mandatory field is not mandatory. Evidence: omit ResponseId: 409 after 30.7 s, held reservation HNC0K0; other three omissions 400 in 0.1 s.
- **[FLOW-V2-50-SEATFIELD] BUG-08 (occurrence 10, not new) &mdash; Hold, documented as having no seat field, accepts passengersSelectedSeats, prices the seat into the held offer and Retrieve shows it on the OnHold booking, with no SeatAfterHold call.** Field: `Hold request: passengersSelectedSeats`. Expected: The field ignored or rejected, or the contract updated to say Hold honours seats. **History:** First observed Round 1 (2026-08-25); confirmed 9 times through Round 20 (2026-10-10); not exercised Round 21 (Hold unsupported); reproduced for the first time on Galileo/EGY in Round 22 (2026-10-11). **Impact:** The documented asymmetry between the Book and Hold branches is wrong for Galileo; a seat can be attached to a hold. Evidence: Hold pnr 7JRHGS with seat 33-H: 200, totalSelectedSeatsAmount 80 AED, totalAmount 650 = 570 + 80; Retrieve OnHold shows 33-H.
- **[TC-BOOK-BIZ-05] BUG-09 (occurrence 12, not new) &mdash; A child passenger can be assigned an exit-row seat: GetSeatMap offers and prices all exit-row cells to the CHD (each labelled "Seat not suitable for child"), and Book accepts the assignment and sends it to the supplier.** Field: `passengersSelectedSeats.&lt;paxRef&gt; (CHD) / GetSeatMap passengersSeatMapAvailability`. Expected: Exit-row cells absent from the CHD allow-list and Book rejecting the assignment (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD). **History:** First observed Round 1 (2026-08-25); confirmed 11 times through Round 20 (2026-10-10); not exercised Round 21; reproduced for the first time on Galileo/EGY in Round 22 (2026-10-11). **Impact:** A child-in-exit-row safety rule is enforced nowhere in the API, even though the seat map itself labels the cells as unsuitable for children. On the A320neo (MS) exit rows carry no restriction flags at all. Evidence: ADT + CHD offer (CAI-JED 2026-11-25): CHD allow-list contains 12 exit cells, all "Seat not suitable for child"; Book with CHD in 31-A -&gt; 409 after 51 s at ticketing (gdsPnr HNC0JV), not a 0.1 s validation 400.
- **[TC-SEATMAP-NEG-05] BUG-11 (occurrence 9, not new) &mdash; Generic supplier-side error responses (GetSeatMap 409 for NE and XY flights, and every failed Book 409) carry OriginalSupplierRequest and OriginalSupplierResponse, i.e. the raw upstream payloads, although isDebug was never set.** Field: `OriginalSupplierRequest / OriginalSupplierResponse (error bodies)`. Expected: Both fields omitted from caller-facing error responses (or credential-bearing parts removed server-side). **History:** First observed Round 2 (2026-08-26) on Book; widened to GetSeatMap in Round 4; reconfirmed through Round 13 (8 confirmations); not exercised Rounds 15-21 (no generic supplier error occurred); reproduced Round 22 (2026-10-11) on Galileo/EGY. **Impact:** Raw supplier requests (Travelport SOAP with branch and authorisation attributes) are exposed to every caller on any supplier error. Values were deliberately not recorded in these artifacts. Evidence: NE GetSeatMap 409 and XY GetSeatMap 409: body fields Status, TransactionId, ErrorCode, ErrorMessage, Context, OriginalSupplierRequest, OriginalSupplierResponse; same on 10 of 10 failed Book calls.
- **[TC-SEATMAP-NEG-01] BUG-15 (occurrence 11, not new) &mdash; GetSeatMap returns HTTP 200 with a complete seat map for offers whose FareConfirm reports isSeatMapRequired=false; on Galileo the flag is false (and offerHasSeat false) on all 41 offers, including carriers that have working seat maps and carriers that do not.** Field: `isSeatMapRequired (FareConfirm) vs GetSeatMap response`. Expected: Rejection or an explicit not-supported envelope for isSeatMapRequired=false offers, and a flag that reflects the real capability. **History:** First observed Round 1 (2026-08-25); confirmed 10 times through Round 21 (2026-10-11); reproduced for the first time on Galileo/EGY in Round 22 (2026-10-11). **Impact:** The capability flag cannot be used to decide whether to show seat selection. Evidence: isSeatMapRequired false on 41/41 FareConfirm calls; GetSeatMap 200 with 120 seats on the flagged offer.
- **[FLOW-V2-50-SEATFIELD] BUG-18 (occurrence 5, not new) &mdash; On a booking with one 80 AED seat the per-passenger paxTotalAmount (570 AED) excludes the seat while priceDetails.totalAmount is 650 AED, so the passenger lines do not add up to the booking total; Hold and PnrReprice also omit passengerSeats/paxTotalSeatAmount that Retrieve shows.** Field: `selectedOffer.passengerFareBreakdown[].paxTotalAmount (Hold, PnrReprice, Retrieve)`. Expected: paxTotalAmount 650 AED (fare + seat), with passengerSeats and paxTotalSeatAmount present on every response that lists passengerFareBreakdown. **History:** First observed Round 13 (2026-09-30); reproduced Rounds 18, 20 and 21; reproduced again Round 22 (2026-10-11), here on the Hold/Retrieve path of Galileo/EGY. **Impact:** Invoices, refunds or reconciliation built from the passenger lines are short by the seat amount. Evidence: Retrieve pnr 7JRHGS: paxTotalAmount 570, paxTotalSeatAmount 80, priceDetails.totalAmount 650.
- **[TC-SEATMAP-VAL-08] BUG-20 (occurrence 2, not new) &mdash; Blocked and Occupied seats carry real prices: all 121 Blocked and 3 Occupied cells have priced per-passenger entries and a populated aggregate seatPriceDetails (paxCellAvailability "Blocked"/"Occupied").** Field: `seatPriceDetails / seatPriceDetailsByPassenger (Blocked and Occupied cells)`. Expected: seatPriceDetails null (and no per-passenger price) for Blocked/Occupied cells. **History:** First observed Round 21 (2026-10-11) on FlyAdeal/EGY; reproduced Round 22 (2026-10-11) on Galileo/EGY. **Impact:** A client that renders prices from these fields offers prices for seats that cannot be bought. Evidence: Blocked 30-D: 160.00 AED per passenger; 121/121 Blocked cells priced over 18 maps.
- **[TC-BOOK-NEG-09] BUG-24 (occurrence 1, not new) &mdash; When Galileo fails the ticketing step after Book was accepted, the API returns a generic 409 with no pnr and no bookingToken, but the supplier reservation is not rolled back: a live held PNR remains, identifiable only by a gdsPnr inside the free-text error message.** Field: `Book error response (409 NDC-INT-UNC-Z9999) / supplier reservation state`. Expected: Either the held reservation is cancelled before the error is returned, or the error carries pnr/bookingToken so the caller can retrieve or cancel it. **History:** First observed Round 22 (2026-10-11), Galileo/EGY. Related to BUG-16 (Round 12) and BUG-12 (Round 2), where a Book error hid a created booking. **Impact:** Every failed Book leaves an untraceable held reservation at the supplier (10 of 10 this round), which the caller cannot Retrieve or cancel through the API. Evidence: Failed Books left held gdsPnrs HNC0JP, HNC0JN, HNC0JQ, HNC0JV, HNC0JY, HNC0K0, HNC0K1, HNC0K2, HNC0K3, HNC0K4; none returned pnr or bookingToken.
- **[FLOW-V2-50-SEATFIELD] BUG-25 (occurrence 1, not new) &mdash; The passenger identifier is not stable across the responses of one booking: Hold keys passengersSelectedSeats by the seat-map passenger GUID, PnrReprice and Retrieve key it by a base64 reference, and the PnrReprice passengerRefId differs again from the Hold/Retrieve value.** Field: `passengersSelectedSeats.&lt;paxRef&gt; key and passengerFareBreakdown[].passengerRefId (Hold vs PnrReprice vs Retrieve)`. Expected: One identifier per passenger in every response. **History:** First observed Round 22 (2026-10-11), Galileo/EGY. **Impact:** A client matching seats or fares to passengers by key cannot do so across Hold, PnrReprice and Retrieve. Evidence: Hold key a97ff227-...; PnrReprice and Retrieve key qX/yJ4adT32Qj4+g5yOzYg==; passengerRefId Hold/Retrieve qX/yJ4..., PnrReprice 4BdS+DUq...

### Unknown-resolutions

- **[TC-BOOK-POS-03]** Environment blocker: Book cannot complete for Galileo/EGY on https://ndc-supplier-integration.azurewebsites.net/. Every Book that passes validation fails at Galileo's ticketing step (409 NDC-INT-UNC-Z9999, host error 12008 "INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state"), and BookAfterHold fails with "Indicates FOP application failed: CHECK DATE". The form-of-payment on the EGY credentials looks expired or invalid; nothing in the request can change it. Until it is fixed 28 of the 63 cases stay BLOCKED. Evidence: 10 Book calls and 3 BookAfterHold calls, all 409
- **[TC-SEATMAP-POS-01]** Galileo seat-map support is carrier-dependent: SV (A330 330/333) and MS (A320neo 32N) flights return full maps; a NE flight returns 409 "Seat Map is unavailable" (0.5 s) and an XY flight 409 "Connection with vendor is experiencing problems" after 95.5 s. FareConfirm reports isSeatMapRequired=false for all of them. Evidence: NE/XY GetSeatMap 409; SV/MS 200
- **[TC-BOOK-NEG-11]** Galileo seat requests are keyed by the passenger GUID from GetSeatMap passengersDetails, not Pax1/PAX1 (an unknown key gives 400 "Passenger with reference 'Pax1' does not exist in the booking metadata"), and seat validation needs the GetSeatMap ids (Hold with the AddPassenger ids and a seat gives 400 "Seat ... is not available for passenger ... Run the SeatMap step first"). cellCode looks like 33-H and cellID like 33-H~0B5. Evidence: N run 1 400; S Hold run 1 400; S Hold 200
- **[TC-BOOK-VAL-06]** Galileo validates seats server-side, before any supplier call (0.1 s, 400 NDC-INT-TEC-A0001): a cellCode that does not match the seat named by cellId (tampered, foreign-offer, fabricated code), the same seat for two passengers, and a Blocked seat are all refused with specific messages. BUG-06 and BUG-07 therefore do not apply to Galileo. Evidence: E, F, G, I, L, NB Book 400
- **[TC-SEATAFTERHOLD-NEG-02]** Galileo Hold returns a real holdExpirationDate (the departure day at 23:59 +02:00) on all 8 Holds; PnrReprice (FareConfirmAfterHold) works; GetOfferBundles and SeatAfterHold return 409 OperationNotSupported ("Galileo does not exists"). BUG-04 does not apply to Galileo. Evidence: Holds 7JPZHS, 7JQQC8, 7JPY8H, 7JRDOH, 7JQITP, 7JQVNU, 7JRKKF, 7JRHGS
- **[TC-BOOK-BIZ-07]** Galileo seat characteristics are real PADIS codes (not "Unknown"): B, CH, I, K, W, _9, A, H ("Handicapped", 110 cells = a wheelchair marker), E, L, LS, OW, RS, _1A, _1B, IE, O, _1W. The four digit-leading codes carry a leading underscore and 11 of 18 descriptions differ in wording from the canonical table. Evidence: agg.padisDesc
- **[TC-SEATMAP-VAL-10]** Wide-body seat columns extend beyond A-F (A, C, D, E, F, H, J, L on the A330; B and K on some layouts); G and I are skipped. The A-F domain in TC-SEATMAP-VAL-10 is too narrow for wide-body equipment. Evidence: columns ABCDEFHJKL
- **[TC-SEATMAP-BIZ-04]** Galileo seat inventory is live: seat 33-H turned Occupied on the next seat map (same offer and fresh offer) after a Hold that selected it. A Hold, not only a ticketed booking, takes the seat. Evidence: S GetSeatMap #2 / S-fresh
- **[TC-SEATMAP-SEC-01]** Galileo has credentials only for credentialsSelector EGY on this host (KSA and UAE both answer "credentials ... do not exist or are not active"), so BUG-17 cannot be tested for Galileo. Evidence: SEC-01 run 3b, UAE probe
- **[TC-BOOK-BIZ-05]** On the MS A320neo exit rows (60 cells) carry the E (exit) code but none of the infant/child/medical restriction codes, while on SV A330 maps every exit cell (168) carries them; restriction data is supplier/equipment dependent. Evidence: exit cell tally per equipment
- **[FLOW-V2-CANDIDATE-SM-HOLD-01]** Schedule drift observed on MS901 CAI-DXB: FareConfirm/PnrReprice show departure 04:20 (flightTime 200) while the Hold and Retrieve responses of the same booking show 04:25 (flightTime 195). Possibly an airline schedule change in the PNR; flagged for follow-up, not filed as a defect. Evidence: HA FareConfirm vs HA Hold flightSegments

### Also re-confirmed

- **[TC-SEATMAP-BIZ-03] BUG-20** &mdash; Same priced-but-unbuyable seats seen from the allow-list side: 157 priced entries for cells missing from the passenger's allow-list
- **[TC-SEATAFTERHOLD-INT-04] BUG-03** &mdash; SeatAfterHold 409 OperationNotSupported at all three chain positions
- **[FLOW-V2-CANDIDATE-SM-HOLD-01] BUG-03** &mdash; SeatAfterHold 409 OperationNotSupported right after Hold

### Not reproduced

- **BUG-04** (Hold returns holdExpirationDate null) &mdash; exercised by TC-SEATAFTERHOLD-NEG-02. Galileo returned a real holdExpirationDate on all 8 Holds.
- **BUG-06** (Book accepts a tampered cellId) &mdash; exercised by TC-BOOK-NEG-06. Rejected with a 400 in 0.1 s.
- **BUG-07** (Book accepts a cellId from another offer) &mdash; exercised by TC-SEATMAP-VAL-04. Rejected with a 400 in 0.1 s; first supplier where the check works.
- **BUG-17** (GetSeatMap does not tie credentialsSelector to the offer) &mdash; exercised by TC-SEATMAP-SEC-01. Not testable: only EGY credentials exist for Galileo.
- **BUG-19** (Valid seat silently not attached by Book) &mdash; exercised by TC-BOOK-POS-03, TC-SEATMAP-VAL-03. Not exercised: no Book completes (ticketing failure), so seat attachment cannot be observed.
- **BUG-21** (Round-trip Book returns pnr null) &mdash; exercised by TC-BOOK-BND-03. Not exercised: the round-trip Book failed at ticketing before returning.
- **BUG-22** (Book without selectedOfferId returns HTTP 500) &mdash; exercised by TC-BOOK-NEG-12. A clean 400 on Galileo.
- **BUG-23** (padis K on every seat) &mdash; exercised by TC-SEATMAP-VAL-07. K (Bulkhead) appears on 30 of 4890 seats only.

## Proposed SPEC.md updates

- §4.6 &mdash; status: *pending*
  - **Old:** "| Galileo / ProdGTWGalileo | Unknown | Unknown | **Conditional** (§4.4 conflict) | Unknown | Unknown | Unknown | Unknown |"
  - **New:** "| Galileo / ProdGTWGalileo | Unknown | **Not Supported** (GetOfferBundles 409 OperationNotSupported, haveBundles false, 2026-10-11) | **Supported** (Hold 200 with holdExpirationDate; PnrReprice 200; BookAfterHold/Book blocked at ticketing on the non-staging host: invalid credit card) | **Not Supported** (SeatAfterHold 409 OperationNotSupported "Galileo does not exists") | **Not offered** (offerHasAncillary false) | Unknown | **Supported, carrier-dependent** (SV, MS 200; NE, XY 409; isSeatMapRequired false on every offer, BUG-15) |"
  - **Correction:** Confirmed Round 22 (TC-SEATMAP-INT-03, TC-SEATAFTERHOLD-POS-01, TC-BOOK-INT-03).

- §2.9 &mdash; status: *pending*
  - **Old:** "**`passengersSelectedSeats.&lt;paxRef&gt;` shape** (V2, added 2026-08-10 — the actively-demonstrated new field):"
  - **New:** "**`passengersSelectedSeats.&lt;paxRef&gt;` shape** (V2, added 2026-08-10 — the actively-demonstrated new field). **Galileo (confirmed 2026-10-11): &lt;paxRef&gt; is the passenger GUID from GetSeatMap `passengersDetails` (not Pax1/PAX1), cellCode is "&lt;row&gt;-&lt;column&gt;" (33-H) and cellID "&lt;cellCode&gt;~&lt;3 chars&gt;"; seats are validated server-side (mismatch, duplicate, Blocked -&gt; 400 NDC-INT-TEC-A0001 in 0.1 s) and need the GetSeatMap ResponseId/selectedOfferId.**"
  - **Correction:** TC-BOOK-NEG-06/VAL-06/NEG-07/NEG-11.

- §2.10 &mdash; status: *pending*
  - **Old:** "`holdExpirationDate` is the **critical time-boxing field** for every Hold-based flow"
  - **New:** "`holdExpirationDate` is the **critical time-boxing field** for every Hold-based flow. **Galileo (2026-10-11): returned on every Hold as the departure day at 23:59 +02:00; Hold also accepts and prices passengersSelectedSeats (BUG-08) when given the GetSeatMap ids.**"
  - **Correction:** TC-SEATAFTERHOLD-NEG-02, FLOW-V2-50-SEATFIELD.

- §2.7 / §8.3 &mdash; status: *pending*
  - **Old:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples."
  - **New:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-10-11): `AvailablePaid`, `AvailableFree`, `Blocked`, `Occupied`. Galileo shows AvailablePaid, Blocked and Occupied only; its seat characteristics are real PADIS codes including H (Handicapped), four digit-leading codes are returned with a leading underscore (_9, _1A, _1B, _1W), seat columns on wide-body equipment extend beyond A-F (H, J, K, L), and Blocked/Occupied cells carry prices (BUG-20)."
  - **Correction:** TC-SEATMAP-VAL-05/VAL-10/BND-03/VAL-08.

- §2.9 &mdash; status: *pending*
  - **Old:** "(new paragraph - no existing text covers a ticketing failure after Book)"
  - **New:** "**Failure mode (Galileo, 2026-10-11): when the supplier rejects the ticketing step after Book was accepted, Book returns 409 NDC-INT-UNC-Z9999 with host error 12008 and no pnr/bookingToken, and the supplier reservation stays in hold state (gdsPnr only in the message text); the caller cannot retrieve or cancel it (BUG-24).**"
  - **Correction:** TC-BOOK-NEG-09.

## Cleanup / follow-up

Live artifacts left behind this round (18):

- **family_b_hold** &mdash; pnr 7JPZHS (gdsPNR HNC0JR) (TC-SEATAFTERHOLD-NEG-01) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-20T23:59:00+02:00
- **family_b_hold** &mdash; pnr 7JQQC8 (gdsPNR HNC0JS) (TC-SEATAFTERHOLD-POS-01) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-13T23:59:00+02:00
- **family_b_hold** &mdash; pnr 7JPY8H (gdsPNR HNC0JT) (TC-SEATAFTERHOLD-NEG-01) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-14T23:59:00+02:00
- **family_b_hold** &mdash; pnr 7JRDOH (gdsPNR HNC0JW) (TC-SEATAFTERHOLD-INT-04) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-15T23:59:00+02:00
- **family_b_hold** &mdash; pnr 7JQITP (gdsPNR HNC0JX) (TC-SEATAFTERHOLD-INT-04) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-16T23:59:00+02:00
- **family_b_hold** &mdash; pnr 7JQVNU (gdsPNR HNC0JZ) (TC-SEATAFTERHOLD-INT-04) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-17T23:59:00+02:00
- **family_b_hold** &mdash; pnr 7JRKKF (gdsPNR HNC0K6) (FLOW-V2-CANDIDATE-SM-HOLD-01-NEG) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-18T23:59:00+02:00
- **family_b_hold** &mdash; pnr 7JRHGS (gdsPNR HNC0K5) (FLOW-V2-50-SEATFIELD) &mdash; Held, not finalized (Book/BookAfterHold fail at ticketing); expires 2026-12-09T23:59:00+02:00
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0JP (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "B Book (no seat, ResponseId/selectedOfferId from GetSeatMap)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0JN (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "C Book (seat 33-E)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0JQ (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "A2 Book (MS901, no seat, carrier-specificity probe)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0JV (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "H Book (CHD in exit row 31-A)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0JY (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "J Book (raw body, duplicate segment key: 33-F then 34-C)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0K0 (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "O Book omit ResponseId (CAI-JED 2026-12-02)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0K1 (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "M Book (passengersSelectedSeats = {})"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0K2 (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "P Book (2 pax x 2 segments)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0K3 (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "K Book (seat 33-L for ADT only)"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)
- **needs_void_cancel** &mdash; pnr gdsPNR HNC0K4 (no pnr/bookingToken returned) (TC-BOOK-NEG-09) &mdash; Orphan held reservation left by the failed Book "N Book (&lt;pax&gt;.setSegmentsSeats = {})"; only the gdsPnr is known, so it cannot be retrieved or cancelled through the API (BUG-24)

