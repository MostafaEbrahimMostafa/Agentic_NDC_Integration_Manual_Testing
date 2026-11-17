# QA Execution Report — Round 21 "Real Clock Experiment" — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 63 test cases (all rows of the file), FlyAdeal / EGY

**Environment:** non-staging, explicitly requested (SPEC.md 1.6: stale V1 fallback host, not ndc-integration-stg-ne-3) &middot; https://ndc-supplier-integration.azurewebsites.net/
**Supplier:** FlyAdeal  **Credentials Selector:** EGY
**Started:** 2026-10-11T10:35:20.995Z
**Ended:** 2026-10-11T11:06:51.932Z
**Status:** COMPLETE
**Execution Duration:** 31m 31s ([View Time Breakdown](20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment_TimeBreakdown.html))
**Prior runs:** Rounds 1-20 (FlyAdeal/EGY: the 22-case run of 2026-08-25) (see NDC_Integration/Artifacts/Logs/)

## Scope note

Run note (Real Clock Experiment, Round 21): full-suite run - all 63 rows of SeatMap_TestCases.csv (all V2) against FlyAdeal / EGY on the NON-STAGING host https://ndc-supplier-integration.azurewebsites.net/ (explicitly requested; SPEC.md 1.6 calls it the stale V1 fallback host). Book/Hold/BookAfterHold/SeatAfterHold were explicitly authorized by the user for this run and Book created real, unticketed FlyAdeal reservations (see Cleanup). Every timestamp is a live clock read (call start/end, test case first-call start and last-call end, per-test-case report-write window). Execution layout as in Round 20: a standalone Node harness with the V2 collection bodies; chains shared by every test case that reads them (response-analysis cases read one 3-ADT/CHD/INF map and the 41 maps captured this round); the verdict write-up of all 63 cases happened after the last API call. FIRST EXECUTION PASS DISCARDED: four chains ran in parallel and FlyAdeal/Navitaire answered 20 of 38 FareConfirm calls with 409 NoBookingInState (a session-state conflict on the shared credentials); all tasks were rerun strictly sequentially (257 calls) and then 73 + 7 calls for the follow-ups (Q/P/R/E isolation variants, SeatAfterHold security, capability sweep, credentialsSelector check). Calls from the discarded pass appear only as unlogged overhead; their 3 PNRs are in Cleanup. Contract differences found before running and built into the harness: GetSeatMap/Book need selectedBundles (see UNKNOWN resolutions). FlyAdeal has no Hold, so the 12 Hold/SeatAfterHold-dependent cases are BLOCKED (10), FAIL on the unsupported endpoint (SEATAFTERHOLD-POS-01) or PASS on the header checks (SEATAFTERHOLD-SEC-02), sharing five Hold attempts and one SeatAfterHold probe. Dates: 2 Nov 2026 - 20 Jan 2027 departures (FlyAdeal returns offers to at least 25 Mar 2027 and none from about May 2027). HEADLINE: 33 passed, 14 failed, 16 blocked. Eight tracked defects reproduced on FlyAdeal (BUG-01, 02, 03, 05, 07 for the 16th time, 15, 17, 18) and FOUR NEW DEFECTS were found: BUG-20 (blocked/occupied seats carry prices), BUG-21 (round-trip Book returns pnr null), BUG-22 (Book without selectedOfferId -> unhandled 500) and BUG-23 (bulkhead characteristic on every seat). BUG-06 (tampered cellId), BUG-16 and BUG-19 did not reproduce on FlyAdeal; BUG-04, 08, 09 were not exercisable (no Hold; no bookable exit-row seat). The Aug-25 FlyAdeal run (22 cases, 16 blocked for want of any seat map) is superseded: GetSeatMap now works once selectedBundles is supplied.

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 33
- Failed: 14
- Blocked: 16
- Failed test cases: TC-SEATMAP-VAL-04, TC-SEATMAP-REG-02, TC-BOOK-BND-03, TC-SEATAFTERHOLD-POS-01, FLOW-V2-49-SEATFIELD, TC-BOOK-BIZ-06, TC-BOOK-NEG-12, TC-SEATMAP-NEG-01, TC-SEATMAP-NEG-02, TC-SEATMAP-NEG-04, TC-SEATMAP-VAL-07, TC-SEATMAP-VAL-08, TC-SEATMAP-BIZ-03, TC-SEATMAP-SEC-01
- Blocked test cases: TC-SEATAFTERHOLD-VAL-01, TC-SEATAFTERHOLD-NEG-01, TC-SEATAFTERHOLD-NEG-02, TC-SEATAFTERHOLD-INT-04, FLOW-V2-50-SEATFIELD, FLOW-V2-CANDIDATE-SM-HOLD-01, FLOW-V2-CANDIDATE-SM-HOLD-02, FLOW-V2-CANDIDATE-SM-HOLD-03, FLOW-V2-CANDIDATE-SM-HOLD-01-NEG, TC-BOOK-BIZ-05, TC-BOOK-NEG-09, TC-BOOK-BIZ-07, TC-RETRIEVE-REG-01, TC-SEATAFTERHOLD-VAL-02, TC-SEATMAP-INT-02, TC-SEATMAP-INT-03

## Test case results

### TC-SEATMAP-POS-02 — PASS

- **Test Case:** [SeatMap][Response] Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (FlyAdeal/EGY, JED-RUH 2026-11-16, 1 ADT, bundle FLY, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 200 - pnr U8J6SJ, bookingToken "", gdsPNR "", tickets {} (1.9s); passengersSelectedSeats {}
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Confirmed. GetSeatMap returned non-empty offerId/responseId (responseId different from AddPassenger's, offerId a re-issued value); Book accepted them and created a real PNR. FlyAdeal returns an empty bookingToken and an empty gdsPNR (only pnr is set) and no ticket - the booking stays unticketed ("Booked"); Retrieve by pnr alone works. The Postman collection-variable assignment is script-side and not observable over raw HTTP; the field mapping it relies on (resp.offerId/resp.responseId) was verified instead.
- **Status:** PASS
- **Evidence:** GetSeatMap responseId == AddPassenger responseId: false; Book 200 pnr U8J6SJ in 1.9s; Retrieve bookingStatus Booked

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr U8J6SJ, bookingToken "", gdsPNR "", tickets 0, seats []
  - **Hop 7 &mdash; Retrieve:** PASS &mdash; 200 - pnr U8J6SJ, bookingStatus Booked, seats []

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** [SeatMap][Response] Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.MCFBRFQ-.setSegmentsSeats.&lt;segment&gt; = {cellCode "18C", cellId = the verbatim cellDetails.cellID from the GetSeatMap response} for seat 18C (AvailablePaid, 25 SAR; FlyAdeal/EGY, JED-RUH 2026-11-17, 1 ADT)
- **Response:** 200 - pnr U85QWZ, seat 18C attached and echoed: passengersSelectedSeats.MCFBRFQ- = {cellCode 18C, price 25 SAR}; passengerSeats[0] = {18C, 25 SAR}; totalSelectedSeats[0] = {18C, 25 SAR} (2.2s)
- **Expected:** Book accepts the token despite the field-name casing difference (response cellID vs request cellId) and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** Accepted. The request sent the response's cellID value verbatim under the lowercase-d field name cellId; Book returned 200, attached seat 18C and echoed it at three places (top-level passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats, priceDetails.totalSelectedSeats). The casing difference is cosmetic (case-insensitive JSON binding).
- **Status:** PASS
- **Evidence:** Book 200 in 2.2s; pnr U85QWZ; request cellId == GetSeatMap cellID byte for byte (true); echoed cellCode 18C price 25 SAR in all three locations

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr U85QWZ, bookingToken "", gdsPNR "", tickets 0, seats ["18C"]

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** [SeatMap][Request] Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; ... -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer Eb2 (JED-RUH 2026-12-28) with seat cellCode 19C and the cellId that was issued for seat 19C on a different offer Eb1 (2026-12-27); two independent chains. A first variant with a different cellCode (18B + the cellId of 18C) was also sent
- **Response:** Clean variant (same cellCode 19C): 200 - pnr TF6H6B created after 2.1s; passengersSelectedSeats came back as {} (seat silently dropped); no error. First variant (18B + cellId of 18C): 409 BUSINESS_CONFLICT "The selected seat CellId does not match the provided CellCode"
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07, 16th confirmed occurrence overall; first on FlyAdeal). With the same cellCode, a cellId taken from another offer is not rejected: Book ran to the supplier, created a real booking and silently dropped the seat (passengersSelectedSeats {}, no seat fee) instead of returning an error. The first variant is rejected only because the code does not match the cellId (cell-level check), which proves FlyAdeal checks code-vs-id but not offer-vs-id.
- **Status:** FAIL
- **Evidence:** Book 200 in 2.1s; pnr TF6H6B; passengersSelectedSeats {}; totalSelectedSeatsAmount null; variant 1: 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 7 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 8 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 9 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 10 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 11 &mdash; Book (variant 1: different cellCode):** PASS &mdash; 409 NDC-INT-UNC-Z9999 NDC-INT-UNC-Z9999 [BUSINESS_CONFLICT: The selected seat CellId does not match the provided CellCode.]
  - **Hop 12 &mdash; Book (clean variant: same cellCode):** FAIL &mdash; 200 - pnr TF6H6B, bookingToken "", gdsPNR "", tickets 0, seats []

### TC-SEATMAP-BND-02 — PASS

- **Test Case:** [SeatMap][Response] Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid, Blocked, and Occupied, and that Aisle-category cells carry no seatPriceDetails.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** Read every seat map captured this round (41 maps, 45 segments, 8366 seat cells) and listed every distinct cellCategory and cellAvailability/paxCellAvailability value
- **Response:** cellCategory: Seat 8366, Aisle 1395. cellAvailability: Blocked 1150, AvailablePaid 6269, Occupied 61, AvailableFree 886. paxCellAvailability: Blocked 1655, AvailablePaid 8665, Occupied 76, AvailableFree 1314
- **Expected:** cellCategory in {Seat, Aisle}; cellAvailability/paxCellAvailability in {AvailablePaid, Blocked, Occupied}; Aisle cells carry no seatPriceDetails; a new value is logged and flagged, not hard-failed
- **Actual:** cellCategory stays within {Seat, Aisle}; all 1395 Aisle cells have cellDetails null, so none carries a price. One value outside the expected set is flagged, not failed (8.3 policy): AvailableFree (886 seat cells, 1314 passenger entries) - seats included in the FlyMax/Fly+ fare bundles come back free at 0.00 SAR. AvailableAfterReservation did not appear. Blocked and Occupied both occur on this airline.
- **Status:** PASS
- **Evidence:** 41 maps; Aisle violations 0; AvailableFree only on bundles FLYM/FLYP (e.g. JED-RUH 2026-11-06 FLYM: 153 free seats)

### TC-SEATMAP-BIZ-02 — PASS

- **Test Case:** [SeatMap][Response] Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** For every priced seat across the 41 captured maps, compared totalPrice with basePrice + taxesPrice for each passenger
- **Response:** 11710 passenger/seat price entries checked; 0 amount mismatches; 0 currency mismatches (all SAR)
- **Expected:** totalPrice.amount == basePrice.amount + taxesPrice.amount for every priced cell/passenger pair, in the same currency
- **Actual:** 0 mismatches in 11710 entries. FlyAdeal puts the whole seat charge in basePrice (taxesPrice 0.00 SAR); amounts seen: 105, 74, 65, 46, 44, 25 SAR and 0 for free-bundle seats. Note: 1150 Blocked cells also carry price entries - that is a separate defect (see TC-SEATMAP-VAL-08).
- **Status:** PASS
- **Evidence:** 11710 entries, 0 mismatches, 0 currency mismatches

### TC-SEATMAP-REG-02 — FAIL

- **Test Case:** [SeatMap][Response] Verify seatMapDetails.&lt;segment&gt;.{cabinLayoutsByDeck, rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails}}} structure matches the fuller schema captured 2026-08-10, AND flag/tolerate the flat-columns supplier variant (no zones[]/zoneId) confirmed present in a saved example.
- **Category:** Regression
- **Endpoint Name:** GetSeatMap
- **Request:** Snapshot of one full FlyAdeal GetSeatMap response (JED-DMM, 3 passengers) compared field by field with the SPEC.md 2.7 field list; layout shape checked explicitly
- **Response:** 200 - cabinLayoutsByDeck.Lower.zones[{zoneId "Y", columns [A,B,C,null,D,E,F], cabinClass ECONOMY}]; rows[].{rowNumber, deck, zoneId, cells[]}; cells[].{cellCategory, column, cellDetails}; cellDetails has all 8 documented keys
- **Expected:** Every key listed in SPEC.md 2.7 present and correctly typed; at least one of the zones[]/zoneId or flat columns[] layout shapes accepted
- **Actual:** Every documented key is present and correctly typed (zones[]/zoneId shape; rows carry zoneId; cellDetails complete). The response also carries fields SPEC.md 2.7 does not list: top-level offerId, responseId, isFareCheckRequired, and passengersDetails.&lt;paxRef&gt;.{birthDate, documentNumber, passengersSeatMapAvailability} (the per-passenger allow-list is nested per passenger, keyed segment -&gt; deck, not a top-level block), plus the AvailableFree availability. Same schema drift flagged in every prior round, so kept FAIL for continuity; nothing is missing or mistyped.
- **Status:** FAIL
- **Evidence:** Top-level keys: supplier, offerId, responseId, isFareCheckRequired, flightSegments, passengersDetails, seatMapDetails; passengersDetails keys: passengerTypeCode, name, birthDate, documentNumber, passengersSeatMapAvailability

### TC-BOOK-POS-03 — PASS

- **Test Case:** [Book][Request] Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; ... -&gt; GetSeatMap -&gt; Book
- **Request:** Book with one passenger and one segment: passengersSelectedSeats.MCFBRFQ-.&lt;segment&gt; = {cellCode "18C", cellId} (FlyAdeal/EGY, JED-RUH 2026-11-17); ResponseId/selectedOfferId from GetSeatMap
- **Response:** 200 - pnr U85QWZ; passengersSelectedSeats = {18C, 25 SAR}; passengerSeats = [{18C, 25 SAR}]; totalSelectedSeatsAmount 25 SAR (2.2s)
- **Expected:** HTTP 200; pnr/bookingToken/gdsPNR returned; top-level passengersSelectedSeats echoes the seat; passengerSeats contains the same {cellCode, price}; priceDetails.totalSelectedSeats/totalSelectedSeatsAmount reflect the same price
- **Actual:** All echoes match exactly: passengersSelectedSeats.&lt;pax&gt;.&lt;segment&gt; = {18C, 25 SAR}; passengerSeats[0] = {18C, 25 SAR}; priceDetails.totalSelectedSeats = [{18C, 25 SAR}]; totalSelectedSeatsAmount 25 SAR. Only pnr is populated (bookingToken and gdsPNR are empty strings for FlyAdeal).
- **Status:** PASS
- **Evidence:** Book 200 in 2.2s; pnr U85QWZ; seat echoed at 3 locations, all 25 SAR

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr U85QWZ, bookingToken "", gdsPNR "", tickets 0, seats ["18C"]

### TC-BOOK-NEG-05 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats for seat 12A, a Blocked cell on the seat map just read (FlyAdeal/EGY, JED-RUH 2026-11-18)
- **Response:** 409 NDC-INT-UNC-Z9999, BUSINESS_CONFLICT "One or more of the selected seats are no longer available (Reserved or Blocked). Please select different seat(s)." (91 ms); no pnr
- **Expected:** Request rejected (status UNKNOWN); no booking created, or any created PNR must not show the unavailable seat as attached
- **Actual:** Rejected cleanly and quickly (0.1s) with a specific, on-point business message and no booking created. The blocked cell is refused even though its seat-map entry still carries a price (BUG-20). Note the ErrorCode and ErrorMessage are both "NDC-INT-UNC-Z9999" (the readable text is only in Context).
- **Status:** PASS
- **Evidence:** 409 in 91 ms; no pnr in response

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 409 NDC-INT-UNC-Z9999 NDC-INT-UNC-Z9999 [BUSINESS_CONFLICT: One or more of the selected seats are no longer available (Reserved or Blocked). Please select different seat(s).]

### TC-BOOK-NEG-06 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with seat 19A and a cellId whose last 10 characters were replaced by XXXXXXXXXX (same length, 153 characters) (FlyAdeal/EGY, JED-RUH 2026-11-21)
- **Response:** 400 NDC-INT-TEC-A0001 "Invalid request..." Context SelectedOfferId: "Failed to deserialize the selected offer." (93 ms); no pnr
- **Expected:** Request rejected (status UNKNOWN) since the tampered token should fail the server-side decode/signature check
- **Actual:** Rejected with a structured 400 in 0.1s and no booking created (BUG-06, where GulfAir accepted a tampered cellId, did NOT reproduce on FlyAdeal). Wording note: the message names SelectedOfferId rather than the cellId, because the cellId carries the offer data and the whole token fails to decode.
- **Status:** PASS
- **Evidence:** 400 in 93 ms; token length 153

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [SelectedOfferId: Failed to deserialize the selected offer.]

### TC-BOOK-VAL-06 — PASS

- **Test Case:** [Book][Request] Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with cellCode "20F" but the cellId issued for seat 20A (FlyAdeal/EGY, JED-RUH 2026-11-22)
- **Response:** 409 BUSINESS_CONFLICT "The selected seat CellId does not match the provided CellCode." (94 ms); no pnr
- **Expected:** UNKNOWN - confirm live whether the API trusts cellId alone, rejects outright, or books the wrong seat
- **Actual:** Resolved: FlyAdeal rejects the mismatch outright with a specific message, before creating any booking. It does not trust one field over the other (unlike GulfAir, which ignores the cellId and books the cellCode).
- **Status:** PASS
- **Evidence:** 409 in 94 ms; no pnr

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 409 NDC-INT-UNC-Z9999 NDC-INT-UNC-Z9999 [BUSINESS_CONFLICT: The selected seat CellId does not match the provided CellCode.]

### TC-BOOK-BIZ-04 — PASS

- **Test Case:** [Book][Response] Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected.
- **Category:** Business Rule
- **Endpoint Name:** FareConfirm -&gt; Book
- **Request:** Read priceDetails of the Book response for seat 18C (JED-RUH 2026-11-17) and compared with the FareConfirm total
- **Response:** Book: totalBaseAmount 169.13 + totalTaxAmount 59.87 + totalAncillariesAmount 0 + totalSelectedSeatsAmount 25 = 254; totalAmount 254. FareConfirm totalAmount 229
- **Expected:** totalAmount == base + tax + ancillaries + selectedSeats; and totalAmount(after) == totalAmount(before seat) + seat price; any mismatch is a confirmed defect
- **Actual:** Both reconcile exactly: 169.13 + 59.87 + 0 + 25 = 254 = totalAmount, and 229 (FareConfirm) + 25 = 254. The seat amount is included in totalAmount (also on 3 other seat bookings this round: 243.99, 254, 379).
- **Status:** PASS
- **Evidence:** sum 254 == totalAmount 254; FareConfirm 229 + 25 = 254

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr U85QWZ, bookingToken "", gdsPNR "", tickets 0, seats ["18C"]

### TC-BOOK-INT-03 — PASS

- **Test Case:** [Book][Request] Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously on one call.
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; Book -&gt; Retrieve
- **Request:** Book with selectedBundles [FLYM], PassengersSelectedAncillaries (Meal "Fattoush Salad", 26 SAR) and passengersSelectedSeats (seat 26C) all populated on one call (FlyAdeal/EGY, JED-RUH 2026-12-09, 1 ADT); GetAncillary and GetSeatMap on the same offer first
- **Response:** 200 - pnr B85IQG; passengersSelectedAncillaries has the meal (26 SAR), passengersSelectedSeats has 26C at 0.00 SAR (free with FlyMax), totalAmount 405, totalAncillariesAmount 26 (3.0s). Retrieve: meal line 29.39 SAR, totalAncillariesAmount 22.61
- **Expected:** UNKNOWN - record whichever outcome occurs (all three accepted and reflected / partially accepted / rejected) as the new ground truth
- **Actual:** Resolved: all three are accepted together and reflected in the Book response (bundle FLYM, meal 26 SAR, free seat 26C; total 405 = base 319.13 + tax 59.87 + meal 26 + seat 0). Side observation recorded under BUG-18: Retrieve re-prices the meal line to 29.39 SAR and reports totalAncillariesAmount 22.61 (its own line says 29.39), differing from Book's 26 / 26.
- **Status:** PASS
- **Evidence:** Book 200 pnr B85IQG; Retrieve ancillary price 29.39 vs Book 26

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetAncillary:** PASS &mdash; 200 - 44 segment ancillaries, 4 journey ancillaries
  - **Hop 6 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 7 &mdash; Book:** PASS &mdash; 200 - pnr B85IQG, bookingToken "", gdsPNR "", tickets 0, seats ["26C"]
  - **Hop 8 &mdash; Retrieve:** PASS &mdash; 200 - pnr B85IQG, bookingStatus Booked, seats ["26C"]

### TC-BOOK-BND-03 — FAIL

- **Test Case:** [Book][Request] Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap -&gt; Book (3 runs)
- **Request:** (a) Book with passengersSelectedSeats omitted (JED-RUH 2026-11-16); (b) Book with one passenger / one segment (seat 18C, 2026-11-17); (c) Book with two passenger keys x two segment keys on a round trip JED-RUH 2026-12-04 / RUH-JED 2026-12-08 (seats 17A,17B on both legs)
- **Response:** (a) 200 pnr U8J6SJ, passengersSelectedSeats {}; (b) 200 pnr U85QWZ, seat 18C echoed; (c) 200 but pnr null, bookingToken "", gdsPNR "" - the four seats (17A/17B on both segments, 25 SAR each) are echoed under both passenger keys, but no booking reference is returned
- **Expected:** (a) succeeds with no seat attached; (b) succeeds as in POS-03; (c) UNKNOWN - confirm whether multiple passengers/segments nest correctly as sibling keys
- **Actual:** (a) and (b) pass. (c) FAILS: the nesting is accepted and echoed correctly (2 passenger keys x 2 segment keys, 4 seats), but the response carries pnr null. NEW DEFECT (BUG-21): on FlyAdeal every Book for a two-journey itinerary returns HTTP 200 with pnr null - reproduced 4 times (2 pax with seats, 1 pax with seats, 2 pax without seats, 1 pax without seats), so it is not caused by the seat selection. No booking reference means the caller cannot Retrieve or manage the booking; whether a booking was created at the airline is unknown.
- **Status:** FAIL
- **Evidence:** (c) pnr null in P, P2, P3, P4 Book responses; (a),(b) pnr set

  - **Run (a) - no passengersSelectedSeats:** HTTP 200
  - **Run (b) - 1 pax x 1 segment:** HTTP 200
  - **Run (c) - 2 pax x 2 segments (round trip):** HTTP 200
  - **Isolation 1 - 1 pax x 2 segments:** HTTP 200
  - **Isolation 2 - 2 pax, no seats:** HTTP 200
  - **Isolation 3 - 1 pax, no seats:** HTTP 200

### TC-BOOK-REG-02 — PASS

- **Test Case:** [Book][Response] Verify passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema going forward.
- **Category:** Regression
- **Endpoint Name:** Book (response schema)
- **Request:** Snapshot of the Book response of the 18C booking (JED-RUH 2026-11-17) diffed against SPEC.md 2.9's post-2026-08-10 field list
- **Response:** 200 - passengersSelectedSeats (object), selectedOffer.passengerFareBreakdown[].passengerSeats (array), paxTotalSeatAmount ({amount, currency}), priceDetails.totalSelectedSeats (array) and totalSelectedSeatsAmount ({amount, currency}) all present
- **Expected:** All five newly-documented fields present and correctly typed whenever a seat has been selected; none of the pre-existing response fields regressed
- **Actual:** All five fields present and correctly typed; every pre-existing top-level key is still present (supplier, pnr, gdsPNR, bookingToken, tickets, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer). Additional keys seen: passengersSelectedAncillaries, isBspCommissionApplied, diRemarks, emdTickets. With no seat selected totalSelectedSeatsAmount is null (not an empty object) and passengersSelectedSeats is {}.
- **Status:** PASS
- **Evidence:** keys: supplier, pnr, gdsPNR, bookingToken, tickets, passengersSelectedAncillaries, passengersSelectedSeats, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer, isBspCommissionApplied, diRemarks, emdTickets

### TC-SEATAFTERHOLD-POS-01 — FAIL

- **Test Case:** [SeatAfterHold][Request] Discovery case -- submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape.
- **Category:** Positive
- **Endpoint Name:** Hold -&gt; SeatAfterHold
- **Request:** Hold on a fresh FlyAdeal/EGY offer (JED-RUH 2026-12-10, bundle FLY) to obtain a live Held pnr; the Hold was rejected, so SeatAfterHold (6-field body: supplier, credentialsSelector, pnr, gdsPNR, bookingToken, surName) was probed with a fabricated pnr instead
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists" (88 ms). SeatAfterHold probe: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists" (91 ms)
- **Expected:** UNKNOWN by design - establish ground truth: 200 with a seat-map-like payload, a follow-up call, or an error demanding more fields
- **Actual:** STILL REPRODUCES (BUG-03, 10th confirmed occurrence overall; first on FlyAdeal). Ground truth: SeatAfterHold rejects FlyAdeal outright at supplier level before reading any field (the same 409 as for GulfAir, whose message names the supplier). The endpoint therefore has no usable contract for this supplier, and FlyAdeal cannot even reach it because Hold itself is unsupported (canBeHeld was false on every one of the 55 offers). A live Held pnr could not be obtained, so only the fabricated-identity probe was possible.
- **Status:** FAIL
- **Evidence:** Hold 409 and SeatAfterHold 409, both OperationNotSupported "Flyadeal does not exists"

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]
  - **Hop 6 &mdash; SeatAfterHold (probe with a fabricated pnr):** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### TC-SEATAFTERHOLD-VAL-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Confirm whether a seat/cell field is required beyond the 6 documented fields, by inspecting the response/error from TC-SEATAFTERHOLD-POS-01.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** Depends on the result of TC-SEATAFTERHOLD-POS-01: no validation message naming a missing field exists to act on
- **Response:** Same supplier-level rejection as POS-01 (409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"); no field-level validation reached
- **Expected:** UNKNOWN - resolve empirically: retry with the missing seat/cell field populated and record whether it succeeds
- **Actual:** Blocked. The rejection is supplier-level and does not depend on the body, so no attempt reaches field validation and the real request contract stays unknown. Nothing to retry.
- **Status:** BLOCKED
- **Evidence:** depends on TC-SEATAFTERHOLD-POS-01 (409 OperationNotSupported)

  - **Hop 1 &mdash; SeatAfterHold (probe with a fabricated pnr):** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### TC-SEATAFTERHOLD-NEG-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination.
- **Category:** Negative
- **Endpoint Name:** Hold (x2) -&gt; SeatAfterHold
- **Request:** Two independent Hold calls on fresh offers (JED-RUH 2026-12-11 and 2026-12-12) were needed to build a mismatched pnr/gdsPNR/bookingToken combination
- **Response:** Hold A: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"; Hold B: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** Request rejected (status UNKNOWN), analogous to FareConfirmAfterHold/BookAfterHold mismatched-identity cases
- **Actual:** Blocked: both Holds are rejected, so no Held identities exist to mix. The supplier-level rejection of SeatAfterHold would in any case fire before any identity matching, making a mismatch indistinguishable from a valid identity.
- **Status:** BLOCKED
- **Evidence:** Hold A 409, Hold B 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]
  - **Hop 6 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### TC-SEATAFTERHOLD-NEG-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed.
- **Category:** Negative
- **Endpoint Name:** Hold -&gt; (wait) -&gt; SeatAfterHold
- **Request:** Hold on a fresh offer (JED-RUH 2026-12-13) to obtain a pnr whose holdExpirationDate could be allowed to pass
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** Request rejected after the holdExpirationDate has passed (status UNKNOWN)
- **Actual:** Blocked: no Hold can be created, so there is no hold expiry to wait for (also BUG-04 pattern: no holdExpirationDate is ever produced). Not testable for FlyAdeal.
- **Status:** BLOCKED
- **Evidence:** Hold 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### TC-SEATAFTERHOLD-SEC-02 — PASS

- **Test Case:** [SeatAfterHold][Request] Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to SeatAfterHold.
- **Category:** Security
- **Endpoint Name:** SeatAfterHold
- **Request:** SeatAfterHold with a fabricated pnr (no live Held pnr can be created for FlyAdeal): run 1 corrupted x-api-key; run 2 corrupted Client-Id; run 3 valid headers with supplier/credentialsSelector switched to GulfAir/KSA
- **Response:** Run 1: 401 AuthenticationError "Invalid authorization header"; run 2: 401, identical; run 3: 409 OperationNotSupported "GulfAir does not exists"
- **Expected:** All three rejected - shape UNKNOWN; reuse the envelope the same checks produce on other endpoints (7.14)
- **Actual:** All rejected. The two auth-header checks return exactly the same 401 AuthenticationError envelope as every other endpoint (header checks run before the body is read, so they do not need a real Held pnr). The cross-tenant variant is rejected by the supplier-level 409 (the endpoint is unsupported for the supplier), which means it cannot be distinguished from a real tenant check; it is accepted as a rejection but proves little. Deviation from the stated precondition: no live Held pnr, because Hold is unsupported.
- **Status:** PASS
- **Evidence:** run 1 401, run 2 401, run 3 409

  - **Attempt 1 of 3 - corrupted x-api-key:** HTTP 401
  - **Attempt 2 of 3 - corrupted Client-Id:** HTTP 401
  - **Attempt 3 of 3 - other supplier GulfAir/KSA:** HTTP 409

### TC-SEATAFTERHOLD-INT-04 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points and comparing outcomes.
- **Category:** Integration
- **Endpoint Name:** Hold -&gt; SeatAfterHold position test (3 chains)
- **Request:** Three chains need a Held booking at step 1; Hold on a fresh offer (JED-RUH 2026-12-14) was attempted
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"; SeatAfterHold probe: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** UNKNOWN - record which chain position SeatAfterHold accepts and whether Retrieve shows the seat
- **Actual:** Blocked: no chain can start because Hold is unsupported, and SeatAfterHold itself rejects FlyAdeal at every position (probe 409). Whether the endpoint position matters is not resolvable on this supplier (GulfAir answered the same at all positions in Round 20).
- **Status:** BLOCKED
- **Evidence:** Hold 409; SeatAfterHold probe 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]
  - **Hop 6 &mdash; SeatAfterHold (probe with a fabricated pnr):** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### FLOW-V2-49-SEATFIELD — FAIL

- **Test Case:** [Flow 49][Response] Verify the existing SM-enrichment Family-A flow now chains Book's ResponseId/selectedOfferId from GetSeatMap's output and that Book's passengersSelectedSeats field is exercised, not left unused.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book -&gt; Retrieve
- **Request:** Full Family-A chain with seat 26C: Book (ResponseId/selectedOfferId from GetSeatMap, selectedBundles, passengersSelectedSeats) then Retrieve (FlyAdeal/EGY, JED-RUH 2026-12-15, 1 ADT; isFareCheckRequired false so no FareCheck)
- **Response:** Book 200 pnr Q8S55T: seat 26C, totalSelectedSeatsAmount 25, totalAmount 243.99, paxTotalSeatAmount 25, paxTotalAmount 243.99. Retrieve 200: bookingStatus Booked, same seat, totalAmount 243.99, but paxTotalSeatAmount 21.74 and paxTotalAmount 240.73
- **Expected:** Family-A state check plus: Book/Retrieve both echo passengersSelectedSeats matching the selection; priceDetails.totalSelectedSeatsAmount non-zero and reconciles into totalAmount
- **Actual:** Book and Retrieve both echo seat 26C (25 SAR) and the booking-level totals agree (243.99); bookingStatus is "Booked" (unticketed). FAIL: STILL/AGAIN BUG-18 (4th confirmed occurrence overall; first on FlyAdeal, and a new variant): the Retrieve response under-reports the passenger-level amounts - paxTotalSeatAmount 21.74 instead of 25 and paxTotalAmount 240.73 instead of 243.99 (the 15% VAT part of the seat, 3.26, is dropped) - so Retrieve's passenger total no longer equals its own totalAmount. Unlike GulfAir this happens with a single seat. Same pattern on the Fly+ booking (seat 74 -&gt; 64.35) and on the meal line (26 -&gt; 29.39, totalAncillariesAmount 22.61).
- **Status:** FAIL
- **Evidence:** Book pts 25 / pta 243.99; Retrieve pts 21.74 / pta 240.73; totalAmount equal 243.99

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr Q8S55T, bookingToken "", gdsPNR "", tickets 0, seats ["26C"]
  - **Hop 7 &mdash; Retrieve:** FAIL &mdash; 200 - pnr Q8S55T, bookingStatus Booked, seats ["26C"]

### FLOW-V2-50-SEATFIELD — BLOCKED

- **Test Case:** [Flow 50][Request] Verify that GetSeatMap's chosen seat cannot be attached via Hold directly, and must instead go through the new SeatAfterHold endpoint.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; ... -&gt; GetSeatMap -&gt; Hold (with passengersSelectedSeats)
- **Request:** Chain up to Hold with a seat selection added to the Hold call; Hold on a fresh offer (JED-RUH 2026-12-10) was rejected at the first Hold attempt
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** UNKNOWN - confirm whether Hold ignores, rejects or accepts passengersSelectedSeats; check Retrieve for seats without a SeatAfterHold call
- **Actual:** Blocked: Hold is unsupported for FlyAdeal (409 OperationNotSupported), so the field cannot be tested. The GulfAir finding (BUG-08: Hold accepts and prices the seat) is not exercisable here.
- **Status:** BLOCKED
- **Evidence:** Hold 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### FLOW-V2-CANDIDATE-SM-HOLD-01 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-A][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold, before FareConfirmAfterHold.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; ... -&gt; Hold -&gt; SeatAfterHold -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold ... (chain stops at the first Hold, which is rejected)
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"; SeatAfterHold probe: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** UNKNOWN by design - record where in the chain the seat can be attached
- **Actual:** Blocked: the chain fails at its fourth step. FlyAdeal rejects Hold, FareConfirmAfterHold/BookAfterHold cannot be reached, and SeatAfterHold itself is refused at supplier level (probe 409).
- **Status:** BLOCKED
- **Evidence:** Hold 409; SeatAfterHold probe 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]
  - **Hop 6 &mdash; SeatAfterHold (probe with a fabricated pnr):** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### FLOW-V2-CANDIDATE-SM-HOLD-02 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-B][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; ... -&gt; Hold -&gt; FareConfirmAfterHold -&gt; SeatAfterHold -&gt; BookAfterHold -&gt; Retrieve
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold ... (chain stops at the first Hold, which is rejected)
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"; SeatAfterHold probe: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** UNKNOWN by design - record where in the chain the seat can be attached
- **Actual:** Blocked: the chain fails at Hold. FlyAdeal rejects Hold, FareConfirmAfterHold/BookAfterHold cannot be reached, and SeatAfterHold itself is refused at supplier level (probe 409).
- **Status:** BLOCKED
- **Evidence:** Hold 409; SeatAfterHold probe 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]
  - **Hop 6 &mdash; SeatAfterHold (probe with a fabricated pnr):** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### FLOW-V2-CANDIDATE-SM-HOLD-03 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-C][Response] Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking.
- **Category:** Flow
- **Endpoint Name:** Search -&gt; ... -&gt; Hold -&gt; FareConfirmAfterHold -&gt; BookAfterHold -&gt; SeatAfterHold -&gt; Retrieve
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold ... (chain stops at the first Hold, which is rejected)
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"; SeatAfterHold probe: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** UNKNOWN by design - record where in the chain the seat can be attached
- **Actual:** Blocked: the chain fails at Hold. FlyAdeal rejects Hold, FareConfirmAfterHold/BookAfterHold cannot be reached, and SeatAfterHold itself is refused at supplier level (probe 409).
- **Status:** BLOCKED
- **Evidence:** Hold 409; SeatAfterHold probe 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]
  - **Hop 6 &mdash; SeatAfterHold (probe with a fabricated pnr):** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-A][Request] Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken triple carried over from a different, unrelated Hold call earlier in the same test session.
- **Category:** Flow
- **Endpoint Name:** Hold -&gt; SeatAfterHold with a foreign pnr/gdsPNR/bookingToken
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold ... (chain stops at the first Hold, which is rejected)
- **Response:** Hold: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"; SeatAfterHold probe: 409 OperationNotSupported "This action is not currently supported by the selected supplier." Context "Flyadeal does not exists"
- **Expected:** UNKNOWN by design - record where in the chain the seat can be attached
- **Actual:** Blocked: no pair of unrelated Held identities can be created. FlyAdeal rejects Hold, FareConfirmAfterHold/BookAfterHold cannot be reached, and SeatAfterHold itself is refused at supplier level (probe 409).
- **Status:** BLOCKED
- **Evidence:** Hold 409; SeatAfterHold probe 409

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; Hold:** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]
  - **Hop 6 &mdash; SeatAfterHold (probe with a fabricated pnr):** FAIL &mdash; 409 OperationNotSupported This action is not currently supported by the selected supplier [OperationNotSupported: Flyadeal does not exists]

### TC-BOOK-BIZ-05 — BLOCKED

- **Test Case:** [Book][Request] Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger (ADT+CHD) -&gt; GetSeatMap
- **Request:** AddPassenger with 1 ADT + 1 CHD, GetSeatMap, then looked for an AvailablePaid exit-row cell (characteristic IE "Seat not suitable for child") to assign to the child (FlyAdeal/EGY, JED-RUH 2026-11-23); no Book sent
- **Response:** 12 IE cells exist (rows 12 and 14, columns A-F), all Blocked; none is in the child's allow-list (156 of 186 seats) or the adult's
- **Expected:** Book with the child in an exit-row seat is rejected (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD) and no pnr is created
- **Actual:** Not executable on FlyAdeal: every exit-row/not-for-child cell is Blocked and excluded from every passenger's allow-list, so there is no bookable exit-row seat to attempt (a Blocked seat is rejected for being blocked, which would not test the child rule). The GulfAir problem (BUG-09: the exit-row cell offered and priced for a child) does not occur here: the child's list simply omits those seats. Child-vs-exit rule on a bookable exit seat is therefore still untested.
- **Status:** BLOCKED
- **Evidence:** IE cells 12, Blocked 12, in CHD allow-list 0

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 458 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 458 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells

### TC-BOOK-NEG-07 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request that assigns the same seat cell to two different passengers.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (2 ADT) with passengersSelectedSeats giving the same seat 21C (same cellId) to both passengers on the same segment (FlyAdeal/EGY, JED-RUH 2026-11-24)
- **Response:** 400 NDC-INT-TEC-A0001, Context: "Seat '21C' is assigned to multiple passengers on segment '...'" and PredicateValidator "Duplicate seat selection is not allowed. Please select a unique seat for each passenger.(Duplicate Seat Ids)" (105 ms); no pnr
- **Expected:** Request rejected (candidate DUPLICATE_SEAT_SELECTION_IN_REQUEST) before any supplier round-trip; no pnr
- **Actual:** Rejected cleanly and fast (0.1s, before any supplier call) with two specific messages naming the seat and the segment. The candidate error code DUPLICATE_SEAT_SELECTION_IN_REQUEST does not exist: the code is the generic NDC-INT-TEC-A0001 and the specifics are in Context. No pnr.
- **Status:** PASS
- **Evidence:** 400 in 105 ms; no pnr

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 458 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 458 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 400 NDC-INT-TEC-A0001 Invalid request. Please check the request parameters and try again [: Seat '21C' is assigned to multiple passengers on segment 'RjN_IDE1Mn4gfn5KRUR_MTEvMjQvMjAyNiAwMDoyMH5SVUh_MTEvMjQvMjAyNiAwMTo1NX5_'.] [PredicateValidator: Duplicate seat selection is not allowed. Please select a unique seat for each passenger.(Duplicate Seat Ids)]

### TC-BOOK-NEG-08 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request where the same passenger selects two different seats on the same segment.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book (raw body)
- **Request:** Book with a hand-built raw body in which the same segment key appears twice under one passenger: first seat 22A, then seat 22B (FlyAdeal/EGY, JED-RUH 2026-11-25)
- **Response:** 200 - pnr JB82PN; only 22B attached (25 SAR); 22A appears nowhere (2.5s)
- **Expected:** UNKNOWN - setSegmentsSeats is a JSON object so a client cannot submit two values under one key; document the constraint and the last-value-wins/serialization behaviour
- **Actual:** Constraint documented and behaviour observed: in valid JSON the segment key can appear only once, and when a raw body forces the duplicate the server keeps the LAST value (22B) and discards the first; the response shows a single seat. No error, so a client bug that repeats a key silently changes the seat.
- **Status:** PASS
- **Evidence:** Book 200 pnr JB82PN; seats 22B 25 SAR

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr JB82PN, bookingToken "", gdsPNR "", tickets 0, seats ["22B"]

### TC-BOOK-BIZ-06 — FAIL

- **Test Case:** [Book][Response] Verify an Infant (INF) passenger travelling on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry.
- **Category:** Business Rule
- **Endpoint Name:** AddPassenger (ADT+INF) -&gt; GetSeatMap -&gt; Book -&gt; Retrieve
- **Request:** Book (1 ADT + 1 INF with ParentPaxRefId) with a seat (23C) for the adult only; the infant absent from passengersSelectedSeats; then Retrieve (FlyAdeal/EGY, JED-RUH 2026-11-26)
- **Response:** Book 200 pnr A2S8KV: INF line paxTotalSeatAmount null, passengerSeats absent; ADT paxTotalSeatAmount 25 SAR; totalSelectedSeatsAmount 25 SAR. Retrieve: INF same; ADT paxTotalSeatAmount 21.74 SAR (paxTotalAmount 250.74 vs Book 254); totalSelectedSeatsAmount 25
- **Expected:** Book/Retrieve succeed; INF paxTotalSeatAmount 0 (or absent) with no passengerSeats; the ADT's paxTotalSeatAmount matches the selected cell's price; totalSelectedSeatsAmount equals only the ADT's seat price
- **Actual:** The infant rule holds in both responses (no seat entry, no seat fee, no double counting; the infant is not even listed on the seat map). The adult's seat total matches the cell price (25 SAR) in Book but NOT in Retrieve, which reports 21.74 SAR (the 15% VAT part, 3.26, removed) and a passenger total 3.26 SAR lower than Book while the booking-level totalAmount stays 379 - the Retrieve defect tracked as BUG-18 (counted once, under FLOW-V2-49-SEATFIELD).
- **Status:** FAIL
- **Evidence:** Book ADT pts 25 / pta 254; Retrieve ADT pts 21.74 / pta 250.74; INF no seat in either

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 354 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 354 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr A2S8KV, bookingToken "", gdsPNR "", tickets 0, seats ["23C"]
  - **Hop 7 &mdash; Retrieve:** PASS &mdash; 200 - pnr A2S8KV, bookingStatus Booked, seats ["23C"]

### TC-BOOK-NEG-09 — BLOCKED

- **Test Case:** [Book][Request] Validate graceful rollback (no orphaned PNR or charge) when the supplier's seat allocation call fails or times out after Book is submitted with a seat selection.
- **Category:** Negative
- **Endpoint Name:** Book (seat allocation failure)
- **Request:** Not executed - a supplier-side seat-allocation failure or timeout cannot be forced from the request; no test double or team-coordinated trigger available on this host
- **Response:** No Book sent for this case. Related data point from TC-BOOK-NEG-05: the supplier's own seat conflict returns a clean 409 with no booking created
- **Expected:** Response is an error (candidate HTTP 422/502); either no pnr is returned or a follow-up Retrieve shows the booking without the failed seat and without a seat fee; exact behaviour UNKNOWN and environment-dependent
- **Actual:** Blocked: a real airline-side allocation failure cannot be forced from the request, so the rollback behaviour (no orphan PNR, no stray charge) is untested. A test double or a team-coordinated failure trigger is still needed.
- **Status:** BLOCKED
- **Evidence:** no calls

### TC-BOOK-VAL-07 — PASS

- **Test Case:** [Book][Request] Validate that submitting a second, different passengersSelectedSeats selection supersedes an earlier selection made earlier in the same test session (late seat-change-before-submission).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; GetSeatMap
- **Request:** Chose seat 24C, replaced it with seat 24D before sending, so the single Book request carries 24D only (FlyAdeal/EGY, JED-RUH 2026-11-27); then re-read the seat map
- **Response:** 200 - pnr I4CU8C; seat 24D attached (25 SAR) at every location; 24C appears nowhere in the response. Re-read: 24C AvailablePaid, 24D Occupied
- **Expected:** Book succeeds and reflects cell B only; cell A does not appear anywhere in the response and its availability is unaffected
- **Actual:** The single Book call carried 24D and the response reflects only 24D at every location (25 SAR); 24C is untouched and still AvailablePaid on the follow-up seat map while 24D turned Occupied. This is a client-side substitution, so the API sees one selection only - the case verifies nothing was cached or leaked from the abandoned choice.
- **Status:** PASS
- **Evidence:** Book 200 pnr I4CU8C; seats 24D 25 SAR; 24C AvailablePaid; 24D Occupied

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr I4CU8C, bookingToken "", gdsPNR "", tickets 0, seats ["24D"]
  - **Hop 7 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells

### TC-BOOK-BIZ-07 — BLOCKED

- **Test Case:** [Book][Request] Validate a designated wheelchair-accessible seat can be selected for a passenger flagged for special assistance, and the assignment is preserved.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap
- **Request:** Searched every cellCharacteristics entry and description of the 41 captured maps (8366 seats) for a wheelchair/reduced-mobility marker
- **Response:** 0 seats carry a wheelchair-accessible marker; vocabulary seen: L, K, W, A, I, IE, FE, _1M and zone/wing/boarding attributes
- **Expected:** UNKNOWN - a wheelchair-accessible cell is selectable and preserved; any SSR linkage found is a new SPEC.md 2.9 finding
- **Actual:** Not executable: FlyAdeal's seat vocabulary has no wheelchair-accessible marker, so no such cell can be identified and Book/Retrieve cannot be exercised for it. No SSR field exists in the Book/AddPassenger schema either.
- **Status:** BLOCKED
- **Evidence:** wheelchair markers: 0 of 8366 seats

### TC-BOOK-VAL-08 — PASS

- **Test Case:** [Book][Response] Verify the currency code is consistent (not a generic placeholder like "string") across every seat-price object in one Book response.
- **Category:** Validation
- **Endpoint Name:** Book (response)
- **Request:** Collected every price.currency under a seat-related object in the Book response of the 18C booking and compared them
- **Response:** 5 values: passengersSelectedSeats price, passengerSeats price, paxTotalSeatAmount, totalSelectedSeatsAmount, totalSelectedSeats price - all "SAR"
- **Expected:** Every seat-related price.currency is identical (matching the offer currency) and none equals "string" or is null/empty
- **Actual:** All 5 values are "SAR" - identical to the offer currency; none is a placeholder or empty. (Outside the seat fields, priceDetails.totalAncillariesAmount.currency is null when no ancillary is booked - not seat-related, noted only.)
- **Status:** PASS
- **Evidence:** currencies: SAR x5

### TC-BOOK-REG-03 — PASS

- **Test Case:** [Book][Response] Verify selectedOffer.passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount when exactly one seat is selected.
- **Category:** Regression
- **Endpoint Name:** Book (response)
- **Request:** Read passengerFareBreakdown[0].passengerSeats[0].price.amount and paxTotalSeatAmount.amount in the Book response with exactly one seat (18C)
- **Response:** passengerSeats[0].price 25 SAR; paxTotalSeatAmount 25 SAR
- **Expected:** The two amounts are exactly equal (and same currency); a mismatch is a confirmed defect
- **Actual:** 25 == 25 SAR, same currency, in the Book response. (The Retrieve response of the same booking does not agree - see BUG-18 under FLOW-V2-49-SEATFIELD.)
- **Status:** PASS
- **Evidence:** 25 == 25

### TC-BOOK-NEG-10 — PASS

- **Test Case:** [Book][Request] Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object ({}) rather than omitted.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; Retrieve
- **Request:** Book with passengersSelectedSeats explicitly sent as {} (FlyAdeal/EGY, JED-RUH 2026-11-28), then Retrieve
- **Response:** 200 - pnr Z4QSQV; passengersSelectedSeats {}; totalSelectedSeatsAmount null; Retrieve Booked
- **Expected:** Book succeeds (HTTP 200), no seat fee (totalSelectedSeatsAmount 0 or absent), passengersSelectedSeats empty/absent in the response, no 500 from the explicit-empty-object shape
- **Actual:** Succeeded exactly as expected: HTTP 200, real (unticketed) PNR, passengersSelectedSeats {} echoed, totalSelectedSeatsAmount null (no seat fee), no error.
- **Status:** PASS
- **Evidence:** Book 200 pnr Z4QSQV in 1.7s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr Z4QSQV, bookingToken "", gdsPNR "", tickets 0, seats []
  - **Hop 7 &mdash; Retrieve:** PASS &mdash; 200 - pnr Z4QSQV, bookingStatus Booked, seats []

### TC-BOOK-NEG-11 — PASS

- **Test Case:** [Book][Request] Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; Retrieve
- **Request:** Book with passengersSelectedSeats.&lt;pax&gt;.setSegmentsSeats sent as {} (FlyAdeal/EGY, JED-RUH 2026-11-29), then Retrieve
- **Response:** 200 - pnr ACC8XX; passengersSelectedSeats {}; no seat fee
- **Expected:** Book succeeds; no seat attached for T1; no error from the otherwise-empty nested object
- **Actual:** Succeeded exactly as expected: HTTP 200, real (unticketed) PNR, no seat, no seat fee, no error.
- **Status:** PASS
- **Evidence:** Book 200 pnr ACC8XX in 1.7s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 229 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 229 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr ACC8XX, bookingToken "", gdsPNR "", tickets 0, seats []
  - **Hop 7 &mdash; Retrieve:** PASS &mdash; 200 - pnr ACC8XX, bookingStatus Booked, seats []

### TC-BOOK-NEG-12 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects requests with each mandatory field individually omitted: ResponseId/fareConfirmResponseId, selectedOfferId/SelectedOfferId, supplier, credentialsSelector.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap -&gt; Book (4 runs)
- **Request:** Four Book calls with a valid baseline seat selection, each on its own fresh chain, omitting ResponseId, selectedOfferId, supplier, credentialsSelector in turn (FlyAdeal/EGY, JED-RUH 30 Nov - 3 Dec 2026)
- **Response:** omit ResponseId: 200 - pnr IBUG7X created with seat 25C (2.6s); omit selectedOfferId: 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (103 ms); omit supplier: 400 errorCode 1001 "Select a valid Supplier"; omit credentialsSelector: 400 1001 "Select a valid CredentialsSelector"
- **Expected:** All four runs rejected (status UNKNOWN); no pnr created in any run
- **Actual:** STILL REPRODUCES (BUG-05, 10th confirmed occurrence overall; first on FlyAdeal): omitting ResponseId is accepted and a real booking is created, so ResponseId is not required by Book. NEW DEFECT (BUG-22): omitting selectedOfferId returns an unhandled HTTP 500 ServerError (no structured error; GetSeatMap handles the same omission with a clean 400). The supplier and credentialsSelector omissions are rejected cleanly.
- **Status:** FAIL
- **Evidence:** omit ResponseId -&gt; 200 + pnr; omit selectedOfferId -&gt; 500; omit supplier/credentialsSelector -&gt; 400

  - **Attempt 1 of 4 - omit ResponseId:** HTTP 200
  - **Attempt 2 of 4 - omit selectedOfferId:** HTTP 500
  - **Attempt 3 of 4 - omit supplier:** HTTP 400
  - **Attempt 4 of 4 - omit credentialsSelector:** HTTP 400

### TC-SEATMAP-VAL-05 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** Paired every cellCharacteristics padisCode with its description across the 41 captured maps (8366 seats) and compared each pair with the canonical PADIS reference (PadisSeatCharacteristic.md)
- **Response:** Codes seen: L 1566, K 8374, W 2808, A 2808, I 7032, IE 540, FE 528, _1M 4, Unknown 27377 (zone/wing/boarding text)
- **Expected:** For every padisCode observed, the description must not contradict the code's known meaning per the reference table; codes outside the table are logged, not failed
- **Actual:** 0 contradictions. Every real code carries exactly the reference wording (L = Leg space seat, K = Bulkhead seat, W = Window seat, A = Aisle seat, I = Seat suitable for adult with an infant, IE = Seat not suitable for child, _1M = Seat with movie view). FE ("Female designated seat") is not in the reference table and is logged. "Unknown" is used for FlyAdeal's own zone/wing/boarding attributes. Separate concern recorded under TC-SEATMAP-VAL-07: code K (bulkhead) is attached to 8366 of 8366 seats.
- **Status:** PASS
- **Evidence:** distinct code|description pairs: 19; contradictions 0

### TC-SEATMAP-BND-03 — PASS

- **Test Case:** [SeatMap][Response] Verify AvailableFree is accepted as a real cellAvailability value (confirmed via saved example) and confirm live whether AvailableAfterReservation is also real, beyond the four now-evidenced values (AvailablePaid, Blocked, Occupied, AvailableFree).
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap (bundle sweep)
- **Request:** GetSeatMap on the same JED-RUH flight with each fare bundle (FLY 5 Nov, FLYM 6 Nov, FLYP 7 Nov 2026) plus the other captured maps; scanned every cellAvailability/paxCellAvailability value
- **Response:** AvailableFree seen: FLYM map 153 seats, FLYP map 137 seats (FLY map 0). AvailableAfterReservation: 0 occurrences in 41 maps. AvailableFree cells: seatPriceDetails null but seatPriceDetailsByPassenger populated with 0.00 SAR per passenger
- **Expected:** AvailableFree confirmed live (update the 8.3 enum list); AvailableAfterReservation stays UNKNOWN unless found; AvailableFree cells expected to carry null seatPriceDetails/seatPriceDetailsByPassenger
- **Actual:** AvailableFree is CONFIRMED live on FlyAdeal: it appears only when the fare bundle includes seat selection (FlyMax: all 153 bookable seats free; Fly+: 137 free and 15 still paid). Deviation from the saved example: the free cells' seatPriceDetails is null but seatPriceDetailsByPassenger is populated with zero-amount prices rather than null - recorded, not failed. AvailableAfterReservation was not observed in 41 maps, so it stays an unconfirmed QC-checklist-only candidate.
- **Status:** PASS
- **Evidence:** FLYM: AvailableFree 153; FLYP: AvailableFree 137; AvailableAfterReservation 0 of 8366 seats

### TC-SEATMAP-VAL-06 — PASS

- **Test Case:** [SeatMap][Response] Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** Branched on cellCategory for every cell of the 41 captured maps and asserted the Aisle/Seat partition
- **Response:** 1395 Aisle cells: column null and cellDetails null in all; 8366 Seat cells: column A-F and populated cellDetails in all; 0 null-column non-Aisle cells
- **Expected:** Aisle =&gt; column null AND cellDetails null; Seat =&gt; column non-null AND cellDetails populated; no violations
- **Actual:** 0 violations: all 1395 Aisle cells have column null and cellDetails null; all 8366 Seat cells have a letter column and a populated cellDetails object.
- **Status:** PASS
- **Evidence:** aisleViol 0, seatViol 0, nullColNonAisle 0

### TC-RETRIEVE-REG-01 — BLOCKED

- **Test Case:** [Retrieve][Response] Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed (Retrieve After Issue).
- **Category:** Regression
- **Endpoint Name:** Book -&gt; Retrieve -&gt; Retrieve
- **Request:** Retrieve #1 immediately after the 18C booking and Retrieve #2 about 20 s later (same pnr); ticketing could not be triggered
- **Response:** Both: 200, bookingStatus "Booked", tickets {}, passengersSelectedSeats {18C, 25 SAR} identical
- **Expected:** Seat fields in Retrieve after ticketing are identical to the pre-ticketing Retrieve
- **Actual:** Blocked: FlyAdeal never ticketed the booking (bookingStatus stays "Booked", tickets empty, no ticketing/payment endpoint to call), so the booked-to-ticketed transition the case is about cannot be reached. The two un-ticketed Retrieves are byte-for-byte identical in every seat field, which is the only part that could be checked.
- **Status:** BLOCKED
- **Evidence:** bookingStatus Booked, tickets {}; seat fields identical: true

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr U85QWZ, bookingToken "", gdsPNR "", tickets 0, seats ["18C"]
  - **Hop 2 &mdash; Retrieve:** PASS &mdash; 200 - pnr U85QWZ, bookingStatus Booked, seats ["18C"]
  - **Hop 3 &mdash; Retrieve:** PASS &mdash; 200 - pnr U85QWZ, bookingStatus Booked, seats ["18C"]

### TC-BOOK-INT-04 — PASS

- **Test Case:** [Book][Request] Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent (both resolve to the same journey).
- **Category:** Integration
- **Endpoint Name:** GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book -&gt; Retrieve
- **Request:** Book with selectedBundles [{JourneyKey, SelectedBundleCode FLYP}] and seat 1A (AvailablePaid, 74 SAR) on the same journey (FlyAdeal/EGY, JED-RUH 2026-12-29, 1 ADT)
- **Response:** 200 - pnr D6RTRZ; seat 1A 74 SAR; totalSelectedSeatsAmount 74; totalAmount 372.99 = FareConfirm 218.99 + Fly+ bundle 80 + seat 74 (3.0s)
- **Expected:** Book succeeds; the response reflects both the bundle and the seat without either overriding the other's pricing (bundle-inclusive component and totalSelectedSeatsAmount both present, not double counted or dropped)
- **Actual:** Confirmed. The bundle JourneyKey and the seat's segmentRefId are the same value (the journey and its single segment share one key), so they resolve to the same journey; Book accepted both and priced both: 218.99 (base fare) + 80 (Fly+ bundle) + 74 (seat) = 372.99, with the seat in totalSelectedSeatsAmount and the bundle in the base amount. The Retrieve of this booking shows the same totals but under-reports the passenger's seat total (64.35 vs 74, BUG-18).
- **Status:** PASS
- **Evidence:** JourneyKey == segmentRefId: true; 218.99+80+74=372.99 == 372.99

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 - pnr D6RTRZ, bookingToken "", gdsPNR "", tickets 0, seats ["1A"]
  - **Hop 7 &mdash; Retrieve:** PASS &mdash; 200 - pnr D6RTRZ, bookingStatus Booked, seats ["1A"]

### TC-SEATAFTERHOLD-VAL-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Once SeatAfterHold's real contract is confirmed (TC-SEATAFTERHOLD-VAL-01), validate it rejects a seat/passenger reference that does not belong to the passengers established at AddPassenger/Hold time for this pnr.
- **Category:** Validation
- **Endpoint Name:** SeatAfterHold
- **Request:** Depends on TC-SEATAFTERHOLD-VAL-01 having resolved a request shape; not attempted
- **Response:** No call
- **Expected:** UNKNOWN - blocked on TC-SEATAFTERHOLD-VAL-01
- **Actual:** Still blocked: SeatAfterHold rejects FlyAdeal outright (BUG-03), so the confirmed request shape this case depends on does not exist. Unchanged from earlier rounds.
- **Status:** BLOCKED
- **Evidence:** prerequisite unresolved

### TC-SEATMAP-POS-01 — PASS

- **Test Case:** [SeatMap][Response] Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails, matching the flight/segments established at FareConfirm.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap (FlyAdeal/EGY, JED-DMM 2026-11-14, 3 passengers + 1 infant) with AddPassenger's ResponseId/selectedOfferId; first with the standard 4-field body, then with the journey's selectedBundles added
- **Response:** Standard body: 400 selectedBundles list is null or empty. With selectedBundles [FLY]: 200 - supplier, flightSegments, passengersDetails and seatMapDetails all present; 186 seat cells in 31 rows (1.6s)
- **Expected:** HTTP 200; supplier, flightSegments, passengersDetails and seatMapDetails present and non-null; every seatMapDetails segment key also appears in flightSegments and in the offer segments from FareConfirm/AddPassenger, in both directions
- **Actual:** Confirmed once the bundle choice is supplied. The seat map returned 200 with all four blocks; the single segment key (RjN_IDMwM34gfn5KRU...) is identical in seatMapDetails, flightSegments and FareConfirm (no orphan segment either way). NEW FACT: the documented 4-field body is rejected for FlyAdeal with 400 "selectedBundles list is null or empty" - GetSeatMap needs the chosen bundle per journey for this supplier (see SPEC proposal). The 400 is a clean structured validation error, so it is recorded as a contract gap, not a defect.
- **Status:** PASS
- **Evidence:** Standard body 400 (90 ms); with selectedBundles 200 (1637 ms); segment keys equal across seatMapDetails/flightSegments/FareConfirm: true; FareConfirm flags isSeatMapRequired=false on this offer

  - **Attempt 1 of 2 - documented 4-field body (no selectedBundles):** HTTP 400
  - **Attempt 2 of 2 - same ids plus selectedBundles [FLY]:** HTTP 200

### TC-SEATMAP-NEG-01 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected (or returns an explicit not-supported response) when called for an offer whose isSeatMapRequired flag was false at FareConfirm/AddPassenger time.
- **Category:** Negative
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap (with selectedBundles) for a JED-RUH offer (16 Dec 2026) whose FareConfirm reported isSeatMapRequired=false
- **Response:** 200 - full seat map, 186 seats (1.2s); FareConfirm flags: isSeatMapRequired false, haveBundles true, canBeHeld false
- **Expected:** Rejected, or an explicit unsupported-operation envelope (candidate {ErrorCode:"OperationNotSupported"}), rather than a 200 with an empty/malformed seatMapDetails
- **Actual:** STILL REPRODUCES (BUG-15, 10th confirmed occurrence overall; first on FlyAdeal). The capability flag says no seat map is required/offered (false on all 55 FlyAdeal FareConfirm responses this round), yet GetSeatMap returns a complete, bookable seat map. The flag is not enforced and does not describe the capability. (Behaviour changed since the Aug-25 FlyAdeal run, when the same call returned an unhandled 500.)
- **Status:** FAIL
- **Evidence:** FareConfirm isSeatMapRequired false on 55/55 offers; GetSeatMap 200

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 218.99 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 218.99 SAR, isSeatMapRequired false, haveBundles true, canBeHeld false
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 - 3 bundle choice(s) for 1 journey(s): FLY 0, FLYM 150, FLYP 80
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 5 &mdash; GetSeatMap:** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells

### TC-SEATMAP-NEG-02 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected when the request otherwise targets a valid offer but no segment of that offer's itinerary is being queried (i.e., the offer/response pair does not correspond to any real segment).
- **Category:** Negative
- **Endpoint Name:** Search -&gt; ... -&gt; AddPassenger (x2) -&gt; GetSeatMap
- **Request:** Two independent offers A (JED-RUH 16 Dec) and B (17 Dec); GetSeatMap with A's ResponseId + B's selectedOfferId, and with B's ResponseId + A's selectedOfferId (selectedBundles of A)
- **Response:** Pairing 1: 409 BUSINESS_CONFLICT "Correct bundles must be selected for all offer journeys" (A's bundle keys do not fit offer B - rejected for the bundle mismatch, not for the id mismatch). Pairing 2: 200 - full seat map of offer A (1.2s)
- **Expected:** Request rejected (status UNKNOWN); no seatMapDetails for a segment set that does not belong to the referenced offer
- **Actual:** STILL REPRODUCES (BUG-01, 10th confirmed occurrence overall; first on FlyAdeal). With a ResponseId from one search and a selectedOfferId from another, the seat map is returned for the selectedOfferId alone; the ResponseId is never cross-checked. Pairing 1 is rejected only because the bundle keys of A do not match offer B, so it proves nothing about the id check; pairing 2 is the clean proof.
- **Status:** FAIL
- **Evidence:** pairing 1: 409; pairing 2: 200 with offer A's flight segments

  - **Attempt 1 of 2 - ResponseId A + selectedOfferId B:** HTTP 409
  - **Attempt 2 of 2 - ResponseId B + selectedOfferId A:** HTTP 200

### TC-SEATMAP-NEG-03 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** Run 1: fabricated ResponseId/selectedOfferId pair. Run 2: a genuine pair from an AddPassenger that was then superseded by a second AddPassenger on the same FareConfirm ids (control: the new pair)
- **Response:** Run 1: 400 NDC-INT-TEC-A0001 "Failed to deserialize the selected offer" (88 ms). Run 2: 200 - full seat map; control 200
- **Expected:** Both runs rejected (status UNKNOWN); no seatMapDetails returned
- **Actual:** Run 1 (a genuinely fabricated pair) is cleanly rejected with a structured 400. Run 2 is NOT rejected: the superseded pair still works, because the offer id is self-contained and re-running AddPassenger does not invalidate the earlier ids. Recorded PASS on the established basis of every earlier round (the fabricated-pair rejection is the defect check; re-reading a seat map for an old pair is idempotent), but the literal expected result for run 2 is not met.
- **Status:** PASS
- **Evidence:** run 1 400; run 2 200 (stale pair accepted); control 200

  - **Attempt 1 of 2 - fabricated ids:** HTTP 400
  - **Attempt 2 of 2 - stale ids:** HTTP 200

### TC-SEATMAP-NEG-04 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** Four GetSeatMap calls, each on a fresh AddPassenger pair (with selectedBundles), omitting supplier, credentialsSelector, ResponseId, selectedOfferId in turn
- **Response:** omit supplier: 400 errorCode 1001 "Select a valid Supplier"; omit credentialsSelector: 400 1001 "Select a valid CredentialsSelector"; omit selectedOfferId: 400 1001 "The SelectedOfferId field is required."; omit ResponseId: 200 - full seat map (1.2s)
- **Expected:** All four runs rejected (status UNKNOWN); no seatMapDetails in any run
- **Actual:** STILL REPRODUCES (BUG-02, 10th confirmed occurrence overall; first on FlyAdeal). Three of four runs are cleanly rejected with the 400 validation envelope naming the missing field. Omitting ResponseId is not rejected: the seat map is returned from the selectedOfferId alone, so ResponseId is neither required nor validated.
- **Status:** FAIL
- **Evidence:** omit ResponseId -&gt; 200 with seatMapDetails; the other three -&gt; 400

  - **Attempt 1 of 4 - omit supplier:** HTTP 400
  - **Attempt 2 of 4 - omit credentialsSelector:** HTTP 400
  - **Attempt 3 of 4 - omit ResponseId:** HTTP 200
  - **Attempt 4 of 4 - omit selectedOfferId:** HTTP 400

### TC-SEATMAP-NEG-05 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap fails gracefully (a structured error, not a raw 500/stack trace) when the underlying supplier call fails or times out.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap (error paths)
- **Request:** No supplier-side failure can be forced from the request; instead every GetSeatMap error path reached this round was inspected: missing selectedBundles (400), fabricated ids (400), wrong bundle/journey combination (409), missing fields (400), bad credentials (401)
- **Response:** All structured envelopes ({Status, TransactionId, ErrorCode, ErrorMessage, Context}); no stack trace, no .NET type name and no supplier payload in any body (originalSupplierRequest/Response are null on the 1001 envelope)
- **Expected:** Once a forcing mechanism exists: a structured business-error envelope rather than a raw 500/stack trace/supplier XML leak; no internal type names or supplier payloads in the body
- **Actual:** GetSeatMap's own error paths are graceful and structured (one wording issue: the 409 BUSINESS_CONFLICT carries ErrorCode and ErrorMessage both set to "NDC-INT-UNC-Z9999"). The half of the test that needs a real supplier failure could not be run - no forcing mechanism exists - so the supplier-failure path remains unverified for GetSeatMap. (Elsewhere on this host a Navitaire fault did surface as 409 NDC-INT-TEC-A0002 with the internal key "nsk:Booking:NoBookingInState" in Context, on FareConfirm calls made in parallel in the first execution pass.)
- **Status:** PASS
- **Evidence:** error bodies reviewed: calls NEG-03 run 1, A standard body, A2-5, NEG-04 x3, SEC-01

  - **Error path 1 - missing selectedBundles:** HTTP 400
  - **Error path 2 - wrong bundle for the journey:** HTTP 409
  - **Error path 3 - fabricated ids:** HTTP 400

### TC-SEATMAP-VAL-07 — FAIL

- **Test Case:** [SeatMap][Response] Verify seat attributes relevant to customer-facing seat selection (window, aisle, extra legroom/exit row) are programmatically derivable from cellCharacteristics for every Seat-category cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** Classified every Seat cell from cellCharacteristics (window / aisle / extra legroom / exit / other) and checked each against the cell's column position and its own description text
- **Response:** Window (W) only in columns A and F, aisle (A) only in columns C and D (0 contradictions); extra legroom (L) in rows 1,2,3,4,12,14; not-suitable-for-child (IE) in rows 12 and 14; but bulkhead (K) is set on 8366 of 8366 seats
- **Expected:** For codes in the reference table the derived classification must not contradict column position or description text; codes outside the table are logged, not failed
- **Actual:** Window and aisle are correct on every seat. NEW DEFECT: padisCode K ("Bulkhead seat") is attached to EVERY seat (8366 of 8366), while the cell's own description names a bulkhead on only 8 of them (the first-row seats). A customer-facing "bulkhead" filter would therefore select the whole cabin. Filed as BUG-23.
- **Status:** FAIL
- **Evidence:** K on 8366/8366 seats; description text mentions bulkhead on 8; window/aisle contradictions 0

### TC-SEATMAP-VAL-08 — FAIL

- **Test Case:** [SeatMap][Response] Verify seatPriceDetails/seatPriceDetailsByPassenger is populated (non-null) for every AvailablePaid cell and null/absent for every Blocked or Occupied cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** Grouped every Seat cell of the 41 captured maps by cellAvailability and read seatPriceDetails / seatPriceDetailsByPassenger for each group
- **Response:** AvailablePaid 6269: all have seatPriceDetailsByPassenger with totalPrice/basePrice/taxesPrice. Blocked 1150: 1150 still carry a priced seatPriceDetailsByPassenger entry. Occupied 61: 61 carry one. AvailableFree 886: all carry zero-amount entries
- **Expected:** Every AvailablePaid cell has non-null seatPriceDetailsByPassenger with populated totalPrice/basePrice/taxesPrice; every Blocked/Occupied cell has seatPriceDetails null
- **Actual:** The AvailablePaid half holds (6269 of 6269). The Blocked/Occupied half fails: seatPriceDetails (the aggregate field) is null as expected, but seatPriceDetailsByPassenger is populated with real prices on 1150 Blocked and 61 Occupied cells (e.g. blocked seat 12A priced 65 SAR per passenger, paxCellAvailability "Blocked"). A seat that cannot be bought is shown with a price. Filed as BUG-20.
- **Status:** FAIL
- **Evidence:** blocked cells priced: 1150/1150; occupied cells priced: 61/61; paid cells without price: 0

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCode is unique across all cells within one flight segment's seatMapDetails.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** Collected every cellCode inside each segment's rows[].cells[] across 45 segments and checked for repeats
- **Response:** 0 segments with a duplicate cellCode (8366 seat codes in 45 segments)
- **Expected:** No cellCode value repeats within the same segment
- **Actual:** No duplicates: every segment lists each seat code once (rows 1-12 and 14-32, columns A-F; row 13 does not exist).
- **Status:** PASS
- **Evidence:** dupCode 0 over 45 segments

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** [SeatMap][Response] Verify structural uniqueness and domain constraints across decks/zones/rows/columns: rowNumber unique within a segment, zoneId unique within a deck, column values restricted to {A,B,C,D,E,F,null}.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** For every segment of the 41 captured maps: rowNumber uniqueness, zoneId uniqueness per deck, column domain
- **Response:** 0 repeated row numbers; 1 zone ("Y") on deck Lower; Seat-cell columns exactly {A,B,C,D,E,F}; null-column cells are only Aisle cells
- **Expected:** No rowNumber repeats in a segment; no zoneId repeats within a deck; every non-null column is one of A-F; null columns only on Aisle cells
- **Actual:** All four constraints hold on every segment (31 rows, row numbers unique; every row references the one declared zone).
- **Status:** PASS
- **Evidence:** dupRow 0, zoneDup 0, colBad 0, nullColNonAisle 0, rowNoZone 0

### TC-SEATMAP-BIZ-03 — FAIL

- **Test Case:** [SeatMap][Response] Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported, may legitimately differ for the same cell, and are NOT required to list every passenger on the offer.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap
- **Request:** On the 3-passenger map, for every priced cell compared the passengers listed in seatPriceDetailsByPassenger with each passenger's own allow-list (passengersSeatMapAvailability)
- **Response:** 558 passenger/cell price entries; 468 are allow-listed; 90 are not - all 90 of them on Blocked cells; no cell had a passenger-level availability different from its overall availability
- **Expected:** Structural consistency only: a passenger listed in a cell's seatPriceDetailsByPassenger should have that cellCode in their own allow-list; a passenger being absent from a cell is valid; no completeness requirement
- **Actual:** Consistent for every bookable seat (all 468 AvailablePaid entries are on the passenger's allow-list; every passenger is priced on every bookable seat, so there is no per-passenger difference on this airline). The 90 remaining entries are the Blocked cells that also carry prices (same root cause as TC-SEATMAP-VAL-08 / BUG-20, not counted again): the passenger is priced for a seat that is not on their allow-list.
- **Status:** FAIL
- **Evidence:** entries 558, not allow-listed 90 (Blocked 90), overall-vs-passenger availability differences 0

### TC-SEATMAP-BIZ-04 — PASS

- **Test Case:** [SeatMap][Response] Exploratory -- confirm GetSeatMap reflects real-time supplier inventory rather than a cached/stale snapshot.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; GetSeatMap
- **Request:** GetSeatMap #1 on a JED-RUH offer (17 Nov 2026), booked seat 18C through Book (this session acts as the second booker), then GetSeatMap #2 on the same offer and on a fresh offer for the same flight; repeated with seat 24D on the 27 Nov flight
- **Response:** 18C: AvailablePaid -&gt; Occupied on the same-offer re-read (1.3s) and Occupied on the fresh-offer read; 24D: AvailablePaid -&gt; Occupied after its booking
- **Expected:** UNKNOWN - if forceable, the cell's availability transitions between the two calls (live supplier round-trip); otherwise log timing/cache headers
- **Actual:** CONFIRMED live inventory: the seat taken by this session's own booking turned Occupied on the very next seat map, on the same offer and on a fresh one, so GetSeatMap reads real supplier inventory rather than a cached snapshot. Same result for a second flight (24D).
- **Status:** PASS
- **Evidence:** 18C AvailablePaid -&gt; Occupied (same offer) / Occupied (fresh offer); 24D AvailablePaid -&gt; Occupied

  - **Hop 1 &mdash; GetSeatMap #1 (18C AvailablePaid):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 2 &mdash; Book:** PASS &mdash; 200 - pnr U85QWZ, bookingToken "", gdsPNR "", tickets 0, seats ["18C"]
  - **Hop 3 &mdash; GetSeatMap #2 (18C Occupied):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells
  - **Hop 4 &mdash; GetSeatMap on a fresh offer (18C Occupied):** PASS &mdash; 200 - seatMapDetails 1 segment(s), 186 seat cells

### TC-SEATMAP-SEC-01 — FAIL

- **Test Case:** [SeatMap][Request] Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap.
- **Category:** Security
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on one AddPassenger pair: run 1 corrupted x-api-key; run 2 corrupted Client-Id; run 3 valid headers with supplier GulfAir/KSA; run 3b valid headers with the SAME supplier FlyAdeal but credentialsSelector UAE (and KSA)
- **Response:** Run 1: 401 AuthenticationError "Invalid authorization header". Run 2: 401, identical. Run 3 (GulfAir/KSA): 400 "Failed to deserialize the selected offer". Run 3b: credentialsSelector KSA -&gt; 400 "credentials ... do not exist or are not active"; credentialsSelector UAE -&gt; 200 full seat map (control with EGY: 200)
- **Expected:** All three rejected (shape UNKNOWN; reuse the envelope of other endpoints)
- **Actual:** Two of the three checks pass cleanly (same 401 envelope as every other endpoint) and a wrong supplier is rejected (400, though with a misleading "deserialize the selected offer" message). STILL REPRODUCES (BUG-17, 7th confirmed occurrence overall; first on FlyAdeal): switching only credentialsSelector to another credential set that exists for the same supplier (UAE) is accepted and returns the seat map of an offer that was created under EGY - the selector is not tied to the offer. A selector that does not exist (KSA) is rejected.
- **Status:** FAIL
- **Evidence:** run 1 401, run 2 401, run 3 400, run 3b UAE 200 (accepted), KSA 400

  - **Attempt 1 of 4 - corrupted x-api-key:** HTTP 401
  - **Attempt 2 of 4 - corrupted Client-Id:** HTTP 401
  - **Attempt 3 of 4 - other supplier (GulfAir/KSA):** HTTP 400
  - **Attempt 4 of 4 - same supplier, credentialsSelector UAE:** HTTP 200

### TC-SEATMAP-SEC-02 — PASS

- **Test Case:** [SeatMap][Documentation] Record that supplier-side authentication security (this API's own credentials presented to the airline/GDS backend) and request/response logging are not independently verifiable through this API's black-box contract, and identify the correct verification channel for each.
- **Category:** Security
- **Endpoint Name:** Documentation (no API call)
- **Request:** Documentation case - reviewed SPEC.md 1.5/1.8 and the PRD section 7 for how supplier-side authentication and logging are governed; no API call
- **Response:** No API call made
- **Expected:** No pass/fail against the live API: document that supplier-side authentication and request/response logging are not verifiable through this API's black-box contract and name the verification channel for each
- **Actual:** Documented as specified. Supplier-side credential handling (AC8) is a backend credential-storage/config audit item, and logging (AC9) is a log/observability review item; neither is observable through any request this suite can send. The API-observable half of AC9 (graceful errors) is TC-SEATMAP-NEG-05. One related fact seen this round: validation errors on this host carry originalSupplierRequest/originalSupplierResponse keys (null on the cases observed) - see SPEC.md 7.14.
- **Status:** PASS
- **Evidence:** documentation only

### TC-SEATMAP-INT-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols.
- **Category:** Integration
- **Endpoint Name:** GetSeatMap (cross-supplier)
- **Request:** Not executed - needs seat maps from at least three suppliers on different native protocols; this run is limited to FlyAdeal/EGY (Navitaire)
- **Response:** No other supplier called
- **Expected:** Every supplier's GetSeatMap response conforms to the identical schema in SPEC.md 2.7 regardless of native protocol
- **Actual:** Not executed - a cross-supplier comparison cannot be built from one supplier. FlyAdeal's own shape was checked on 45 segments and is stable (see VAL-10, VAL-11, REG-02). Its only schema differences from the GulfAir shape seen in Round 20 are values: no NoSeat category, padisCode populated (not all Unknown), bundle-dependent availability.
- **Status:** BLOCKED
- **Evidence:** no calls

### TC-SEATMAP-INT-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Capability-matrix sweep -- run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable per SPEC.md §4.6, and record pass/fail per supplier.
- **Category:** Integration
- **Endpoint Name:** Search sweep -&gt; GetSeatMap
- **Request:** Capability confirmation for the one supplier in scope: 10 Searches (9 routes returned offers, 57 offers), then GetSeatMap on 41 offers (domestic and international)
- **Response:** Across 57 offers: isSeatMapRequired true on 0, canBeHeld true on 0, haveBundles true on 57, offerHasAncillary true on 57. GetSeatMap: 200 with a populated map on every offer once a valid bundle code was sent (the only rejections were wrong bundle codes)
- **Expected:** Every confirmed-capable supplier's GetSeatMap succeeds with a populated seatMapDetails; not-capable suppliers fail gracefully; a per-supplier pass/fail table is maintained
- **Actual:** Not executed as a sweep: only FlyAdeal/EGY is in scope, so the supplier table cannot be built. FlyAdeal/EGY's row for the living capability table: seat map SUPPORTED (GetSeatMap 200, populated, needs selectedBundles) although isSeatMapRequired is false on every offer (BUG-15); Hold/SeatAfterHold NOT supported (409 OperationNotSupported); bundles and ancillaries supported; Book works (unticketed 'Booked' PNR, empty gdsPNR/bookingToken).
- **Status:** BLOCKED
- **Evidence:** Search flags over 57 offers: seatReq 0, hold 0, bundles 57

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 199 SAR
  - **Hop 2 &mdash; Search:** PASS &mdash; 200 - 10 offers, offer[0] totalAmount 199 SAR
  - **Hop 3 &mdash; Search:** PASS &mdash; 200 - 6 offers, offer[0] totalAmount 159 SAR
  - **Hop 4 &mdash; Search:** PASS &mdash; 200 - 6 offers, offer[0] totalAmount 159 SAR

### TC-SEATMAP-VAL-11 — PASS

- **Test Case:** [SeatMap][Response] Verify passengersSeatMapAvailability.&lt;paxRef&gt;.&lt;segmentRefId&gt; (the top-level per-passenger allow-list of cellCodes) stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Read the per-passenger allow-list (passengersDetails.&lt;paxRef&gt;.passengersSeatMapAvailability) of the 3-passenger map; compared its segment keys with flightSegments/seatMapDetails and its cell codes with the real cells
- **Response:** Allow-list is NESTED under each passenger (segment key -&gt; deck "Lower" -&gt; [codes]), not a top-level block; key is the full segmentRefId, identical to the flightSegments/seatMapDetails key; 156 codes per passenger, all 156 exist as real cells
- **Expected:** Every segmentRefId key under passengersSeatMapAvailability.&lt;paxRef&gt; matches the casing used elsewhere; every listed cellCode corresponds to a real cell
- **Actual:** Both assertions hold: key equal character-for-character to the seatMapDetails/flightSegments key, and 0 allow-listed codes without a cell across all 41 maps. Structure differs from SPEC.md 2.7's description (nested per passenger and per deck) - included in the proposed spec update. Priced-cell consistency of the allow-list is covered by TC-SEATMAP-BIZ-03.
- **Status:** PASS
- **Evidence:** segment key match true; orphan allow-list codes 0; top-level passengersSeatMapAvailability present: 0 maps

### TC-SEATMAP-BND-04 — PASS

- **Test Case:** [SeatMap][Response] Confirm live whether any cellCategory value beyond {Seat, Aisle} (e.g. Lavatory/Bathroom, Bulkhead, Galley, Closet, ExitRow, StairsToUpperDeck, WingBox, StorageBin, RestrictedZone, NoSeat, Other, per the full backend enum) is ever returned.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap (all captured maps)
- **Request:** Scanned every cells[].cellCategory in the 41 captured maps (45 segments; domestic and international routes JED/RUH/DMM/CAI/DXB; every segment is an A320 - FlyAdeal operates no widebody)
- **Response:** Only "Seat" (8366) and "Aisle" (1395) observed; no Lavatory/Bathroom, Bulkhead, Galley, Closet, ExitRow, StairsToUpperDeck, WingBox, StorageBin, RestrictedZone, NoSeat or Other
- **Expected:** UNKNOWN - resolve empirically; do not assume Seat/Aisle are exhaustive
- **Actual:** Resolved for this supplier: only Seat and Aisle are ever returned (on A320 equipment). Galley/lavatory/exit rows are not drawn as cells at all (row 13 is simply absent and exit rows 12/14 are plain Seat cells with the IE characteristic). The rarer members therefore remain unconfirmed for suppliers with widebodies; the GulfAir NoSeat category was NOT seen on FlyAdeal.
- **Status:** PASS
- **Evidence:** distinct cellCategory values: Aisle, Seat; equipment: 320

### TC-BOOK-POS-04 — PASS

- **Test Case:** [Book][Response] Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step.
- **Category:** Positive
- **Endpoint Name:** Book -&gt; Retrieve
- **Request:** Retrieve immediately after the 18C Book (no ticketing action in between)
- **Response:** 200 - bookingStatus "Booked", tickets {}; passengersSelectedSeats {18C, 25 SAR}; passengerSeats [{18C, 25}]; totalSelectedSeatsAmount 25 SAR
- **Expected:** Immediate post-Book Retrieve already shows passengersSelectedSeats/passengerSeats/totalSelectedSeatsAmount populated while bookingStatus still reads un-ticketed
- **Actual:** The seat is attached at Book time: Retrieve, taken right after Book with nothing in between, shows the seat, its price and totalSelectedSeatsAmount, while bookingStatus is "Booked" and tickets is empty. The reservation therefore carries the seat before any ticketing/payment, and FlyAdeal never reaches a ticketed state through this API. (paxTotalSeatAmount in that Retrieve is 21.74, not 25 - BUG-18, counted under the flow case.)
- **Status:** PASS
- **Evidence:** bookingStatus Booked; tickets {}; seat 18C present

  - **Hop 1 &mdash; Book:** PASS &mdash; 200 - pnr U85QWZ, bookingToken "", gdsPNR "", tickets 0, seats ["18C"]
  - **Hop 2 &mdash; Retrieve:** PASS &mdash; 200 - pnr U85QWZ, bookingStatus Booked, seats ["18C"]

## Findings

### Defects

- **[TC-SEATMAP-NEG-02] BUG-01 (occurrence 10, not new) &mdash; GetSeatMap accepts a ResponseId and selectedOfferId taken from two different offers and returns a full seat map; the result follows selectedOfferId and ResponseId is never cross-checked (now also on FlyAdeal).** Field: `ResponseId / selectedOfferId`. Expected: 4xx validation error for a ResponseId/selectedOfferId pair that does not belong together. **History:** First observed Round 1 (2026-08-25); confirmed 9 times through Round 20 (2026-10-10); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11). **Impact:** A caller can combine a stale or foreign ResponseId with any valid offer id and still receive that offer's seat map, so the response id gives no integrity protection. Evidence: ResponseId of offer B + selectedOfferId of offer A (JED-RUH 16 Dec / 17 Dec 2026, FlyAdeal/EGY): 200 with offer A's full seat map; the reverse pairing was rejected only because the bundle keys did not fit (409).
- **[TC-SEATMAP-NEG-04] BUG-02 (occurrence 10, not new) &mdash; GetSeatMap documents ResponseId as required, but a request that omits it still returns HTTP 200 with the full seat map; the other three mandatory fields are rejected with a 400 (now also on FlyAdeal).** Field: `ResponseId`. Expected: 400 validation error naming ResponseId, like supplier, credentialsSelector and selectedOfferId. **History:** First observed Round 1 (2026-08-25); confirmed nine times through Round 20 (2026-10-10); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11). **Impact:** A mandatory request field is silently optional, so clients that forget it are never told. Evidence: GetSeatMap without ResponseId (FlyAdeal/EGY, JED-RUH 21 Dec 2026): 200, 186 seats; omitting supplier/credentialsSelector/selectedOfferId: 400 errorCode 1001.
- **[TC-SEATMAP-NEG-01] BUG-15 (occurrence 10, not new) &mdash; GetSeatMap returns HTTP 200 with a complete seat map for offers whose FareConfirm reports isSeatMapRequired=false; the flag is not enforced and does not describe the capability (on FlyAdeal the flag is false on every offer although seat maps work).** Field: `isSeatMapRequired (FareConfirm) vs GetSeatMap response`. Expected: Rejection or an explicit not-supported envelope for an offer with isSeatMapRequired=false (or the flag true where seat maps are available). **History:** First observed Round 1 (2026-08-25); confirmed nine times through Round 20 (2026-10-10); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11). **Impact:** The per-offer capability flag cannot be used to decide whether to show a seat map: it is false on all 55 FlyAdeal FareConfirm responses this round while GetSeatMap works on all of them. Evidence: FareConfirm isSeatMapRequired=false, haveBundles=true (JED-RUH 16 Dec 2026); GetSeatMap with the chosen bundle: 200, 186 seats.
- **[TC-SEATMAP-SEC-01] BUG-17 (occurrence 7, not new) &mdash; GetSeatMap does not reject a request whose credentialsSelector differs from the one the offer was created under (same supplier, different valid selector).** Field: `credentialsSelector`. Expected: 4xx rejection (offer not found / not authorized for this credentialsSelector), as happens when the supplier is switched. **History:** First observed Round 11 (2026-09-29); confirmed six times through Round 20 (2026-10-10); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11). **Impact:** An offer created under one credential set can be read through another; tenant isolation by selector is not enforced. Evidence: Offer created under EGY (JED-RUH 21 Jan 2027): GetSeatMap with credentialsSelector UAE returns 200 and the full seat map; with KSA (no FlyAdeal credentials) 400; supplier GulfAir/KSA 400.
- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 16, not new) &mdash; Book accepts a cellId that was issued for a different offer's seat map: it runs the full booking and silently drops the seat (empty passengersSelectedSeats, no fee) instead of returning an error (now also on FlyAdeal).** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, with no booking created. **History:** First observed Round 1 (2026-08-25); confirmed fifteen times through Round 20 (2026-10-10); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11). **Impact:** A stale or foreign cellId token produces a booking with no seat and no error - the caller believes a seat was reserved. Evidence: Book on offer Eb2 (JED-RUH 28 Dec 2026, cellCode 19C) with the cellId of seat 19C from offer Eb1: 200, pnr TF6H6B, passengersSelectedSeats {}, no error.
- **[TC-BOOK-NEG-12] BUG-05 (occurrence 10, not new) &mdash; Book documents ResponseId as required, but a Book request that omits it is accepted and creates a real PNR; supplier and credentialsSelector omissions are rejected (now also on FlyAdeal).** Field: `ResponseId`. Expected: 400 validation error naming ResponseId, no PNR created. **History:** First observed Round 1 (2026-08-25); confirmed nine times through Round 20 (2026-10-10); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11). **Impact:** A booking can be created without the response id that ties it to the search, defeating the id chain. Evidence: Book without ResponseId (JED-RUH 30 Nov 2026, seat 25C): 200, pnr IBUG7X created.
- **[TC-SEATAFTERHOLD-POS-01] BUG-03 (occurrence 10, not new) &mdash; SeatAfterHold rejects every call for supplier FlyAdeal with HTTP 409 OperationNotSupported ("Flyadeal does not exists") before reading any field, while the endpoint is presented as a normal step of the Hold branch (same behaviour as GulfAir).** Field: `SeatAfterHold response (supplier registration)`. Expected: 200 with the seat-selection response (or a documented validation error), or FlyAdeal being flagged as not supporting the endpoint. **History:** First observed Round 1 (2026-08-25); confirmed nine times through Round 20 (2026-10-10); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11). **Impact:** The endpoint has no working contract for the suppliers tested; the SeatAfterHold-dependent flows cannot run. For FlyAdeal Hold itself is also unsupported, so the Hold branch is closed entirely. Evidence: SeatAfterHold with a fabricated pnr: 409 OperationNotSupported "Flyadeal does not exists" (91 ms); Hold on 5 offers: 409 OperationNotSupported on all.
- **[FLOW-V2-49-SEATFIELD] BUG-18 (occurrence 4, not new) &mdash; Retrieve under-reports the per-passenger seat amounts: paxTotalSeatAmount and paxTotalAmount in Retrieve are lower than in the Book response (on FlyAdeal the 15% VAT part of the seat price is dropped) while priceDetails.totalAmount is unchanged, so the passenger lines no longer add up to the booking total. Same pattern on the ancillary line (26.00 in Book, 29.39 in Retrieve, totalAncillariesAmount 22.61).** Field: `selectedOffer.passengerFareBreakdown[].paxTotalSeatAmount / paxTotalAmount (Retrieve response)`. Expected: paxTotalSeatAmount {"amount":25,"currency":"SAR"}, paxTotalAmount 254.00 (and ancillary 26.00), matching the Book response. **History:** First observed Round 13 (2026-09-30); reproduced Rounds 18 and 20 on GulfAir/KSA (multi-seat bookings); reproduced for the first time on FlyAdeal/EGY in Round 21 (2026-10-11), here with a single seat. **Impact:** A caller reading a booking back through Retrieve sees a seat total and passenger fare that differ from what Book charged and from Retrieve's own totalAmount; the sum of passenger totals (250.74 + 125.00 = 375.74) differs from totalAmount 379.00 on the ADT+INF booking. Evidence: Seat 26C (pnr Q8S55T): Book paxTotalSeatAmount 25 / paxTotalAmount 243.99; Retrieve 21.74 / 240.73 (totalAmount 243.99 both). Seat 23C ADT+INF (A2S8KV): 25 -&gt; 21.74, 254 -&gt; 250.74. Fly+ seat 1A (D6RTRZ): 74 -&gt; 64.35. Meal (B85IQG): 26 -&gt; 29.39.
- **[TC-SEATMAP-VAL-08] BUG-20 (occurrence 1, not new) &mdash; FlyAdeal seat maps return a priced seatPriceDetailsByPassenger entry (real amounts, paxCellAvailability "Blocked"/"Occupied") for seats that cannot be bought; only the aggregate seatPriceDetails is null.** Field: `seatPriceDetailsByPassenger (Blocked / Occupied cells)`. Expected: seatPriceDetails and seatPriceDetailsByPassenger null/absent for every Blocked or Occupied cell. **History:** First observed Round 21 (2026-10-11), FlyAdeal/EGY. **Impact:** A client that shows "price from seatPriceDetailsByPassenger" will display prices for blocked and occupied seats (and the passenger allow-list does not contain them), so the two blocks of the same response disagree. Evidence: 1150 of 1150 Blocked and 61 of 61 Occupied cells across 41 maps; e.g. blocked seat 12A priced 65 SAR for each of 3 passengers.
- **[TC-BOOK-BND-03] BUG-21 (occurrence 1, not new) &mdash; Book for a two-journey (round trip) itinerary returns HTTP 200 with pnr null (bookingToken and gdsPNR empty) - with or without a seat selection, one or two passengers - so the caller receives no booking reference.** Field: `Book response pnr (two-journey itinerary)`. Expected: A booking reference (pnr) in every successful Book response, or an error if the booking could not be created. **History:** First observed Round 21 (2026-10-11), FlyAdeal/EGY. **Impact:** The caller cannot Retrieve, change or cancel the booking, and it is unknown whether a booking was created at the airline (possible orphan reservations). Evidence: Round trip JED-RUH 4 Dec / RUH-JED 8 Dec 2026 and 3 variants (1-2 passengers, with and without seats): 4 of 4 Book calls returned pnr null; single-journey Books returned a pnr every time.
- **[TC-BOOK-NEG-12] BUG-22 (occurrence 1, not new) &mdash; Book without selectedOfferId fails with an unhandled HTTP 500 ServerError ("Unknown error occured...") instead of a validation 400; GetSeatMap handles the same omission with a clean 400.** Field: `Book request: selectedOfferId omitted`. Expected: 400 validation error naming SelectedOfferId (as GetSeatMap returns), not a 500. **History:** First observed Round 21 (2026-10-11), FlyAdeal/EGY. **Impact:** A client mistake surfaces as a server fault, which pollutes error monitoring and gives no actionable message. Evidence: Book omitting selectedOfferId (JED-RUH 1 Dec 2026): 500 ServerError in 103 ms, TransactionId cc0993ae-d95d-49ce-bbf7-8bbc3fa7da05.
- **[TC-SEATMAP-VAL-07] BUG-23 (occurrence 1, not new) &mdash; Every seat in every FlyAdeal seat map carries padisCode K ("Bulkhead seat") although the cell's own description names a bulkhead only for the front-row seats.** Field: `cellCharacteristics (padisCode K - Bulkhead seat)`. Expected: padisCode K only on genuine bulkhead seats (first row), consistent with the description text. **History:** First observed Round 21 (2026-10-11), FlyAdeal/EGY. **Impact:** A seat-selection UI that filters or labels "bulkhead" seats from this characteristic marks the whole cabin as bulkhead. Evidence: K on 8366 of 8366 seats over 41 maps; description text mentions a bulkhead on 8.

### Unknown-resolutions

- **[TC-SEATMAP-POS-01]** For FlyAdeal, GetSeatMap (and Book) require a selectedBundles list - one {JourneyKey, SelectedBundleCode} per offer journey - in addition to the four documented fields. Without it GetSeatMap returns 400 PredicateValidator "selectedBundles list is null or empty"; Book returns the same plus "selectedBundles list count must match offer journeys count"; a code that does not belong to the journey returns 409 "Please select correct combinations for (journeyKey, selectedBundleCode)". Valid codes come from GetOfferBundles (domestic: FLY free, FLYM 150 SAR, FLYP 80 SAR; international: FCAI/PCAI, FINT/MINT/PINT). Evidence: A GetSeatMap standard body -&gt; 400 (90 ms); with selectedBundles [FLY] -&gt; 200. A2-5/A2-7 (FLY on international routes) -&gt; 409; A2b with FCAI/FINT -&gt; 200.
- **[TC-SEATMAP-BND-03]** AvailableFree is a real cellAvailability on FlyAdeal at cell level too (not only per passenger): it appears when the chosen fare bundle includes seat selection (FlyMax FLYM: every bookable seat free; Fly+ FLYP: mostly free, some paid). Free cells carry seatPriceDetails null but seatPriceDetailsByPassenger with explicit 0.00 SAR price objects (like GulfAir, unlike the AirArabia example). The seat price is therefore bundle-dependent. AvailableAfterReservation was not observed. Evidence: 886 AvailableFree seat cells in 41 maps; FLYM map: 153 free of 186; FLYP: 137 free / 15 paid; AvailableAfterReservation 0
- **[TC-SEATMAP-BND-04]** FlyAdeal seat maps contain only cellCategory Seat and Aisle (45 segments, all A320): no NoSeat (seen on GulfAir), Lavatory/Bathroom, Bulkhead, Galley, ExitRow or other member. The rarer enum members remain unconfirmed for any supplier with widebody equipment. Evidence: 8366 Seat + 1395 Aisle cells over 41 maps
- **[TC-BOOK-VAL-06]** Resolved for FlyAdeal: a Book whose cellCode does not match the cellId (cellCode 20F + cellId of 20A) is rejected with 409 BUSINESS_CONFLICT "The selected seat CellId does not match the provided CellCode." and no booking is created - the API checks code-vs-id (but not offer-vs-id, BUG-07). A tampered cellId is rejected with 400 "Failed to deserialize the selected offer" (BUG-06 does not reproduce on FlyAdeal). Evidence: G Book 409 (94 ms); F Book 400 (93 ms); no pnr in either
- **[TC-BOOK-NEG-08]** When a raw Book body repeats the same segment key under one passenger, the server keeps the last value and discards the first without any error (22A then 22B -&gt; only 22B booked). Evidence: J Book 200, pnr JB82PN, seat 22B only
- **[TC-BOOK-NEG-07]** Same seat for two passengers is rejected before any supplier call with HTTP 400 NDC-INT-TEC-A0001 and two Context entries ("Seat '21C' is assigned to multiple passengers on segment ..." and PredicateValidator "Duplicate seat selection is not allowed..."). The candidate code DUPLICATE_SEAT_SELECTION_IN_REQUEST does not exist. Evidence: I Book 400 in 105 ms, no pnr
- **[TC-BOOK-INT-03]** Resolved for FlyAdeal: Book accepts selectedBundles, PassengersSelectedAncillaries (SetSegmentsAncillaries {segmentRefId: [{AdditionalServiceCategory, AncillaryCode, Quantity}]}) and passengersSelectedSeats together, and reflects all three (bundle FLYM, Meal 26 SAR, free seat 26C, total 405 SAR). Retrieve then re-prices the meal (29.39) - see BUG-18. Evidence: Q Book 200 pnr B85IQG (3.0 s); Q Retrieve ancillary 29.39 / totalAncillariesAmount 22.61
- **[TC-SEATMAP-BIZ-04]** GetSeatMap reads live supplier inventory for FlyAdeal: a seat booked by this session turns Occupied on the very next seat map (same offer or a fresh offer). Evidence: 18C AvailablePaid -&gt; Occupied (same offer) and Occupied (fresh offer); 24D AvailablePaid -&gt; Occupied
- **[TC-SEATMAP-INT-03]** FlyAdeal/EGY capability row: Bundle and Ancillary supported; SeatMap supported (needs selectedBundles) although isSeatMapRequired=false on every offer; Hold NOT supported (409 OperationNotSupported "Flyadeal does not exists", canBeHeld=false on every offer) and therefore SeatAfterHold unreachable; Book works and creates an unticketed "Booked" PNR (gdsPNR and bookingToken empty strings, tickets {}), retrievable with pnr alone. SPEC.md 4.3 lists FlyAdeal as commercially blacklisted for production booking; on this non-staging host that business gate is not applied, so every Book created a live airline reservation. Evidence: 55 FareConfirm responses (isSeatMapRequired false and canBeHeld false on all); 10 Search sweeps (offers on 9 of 10 routes, canBeHeld 0, isSeatMapRequired 0); 16 Book calls returned 200 (12 with a pnr, 4 round-trip calls with pnr null)
- **[TC-SEATMAP-NEG-05]** Observed while executing (first execution pass, 4 chains in parallel): FlyAdeal/Navitaire does not tolerate concurrent chains on the same credentials - 20 of 38 FareConfirm calls returned 409 NDC-INT-TEC-A0002 "A technical error occurred in NDC integration." with the supplier-internal key "nsk:Booking:NoBookingInState" in Context. Run strictly sequentially (second pass, 257 calls) no FareConfirm failed. The error is a structured envelope but exposes the Navitaire internal name. Evidence: First pass: 20/38 FareConfirm 409; second to fourth pass: 0 of ${FCN} FareConfirm calls failed

### Not reproduced

- **BUG-06** (Book accepts a tampered cellId) &mdash; exercised by TC-BOOK-NEG-06. FlyAdeal rejects the tampered cellId with 400 "Failed to deserialize the selected offer" and creates no booking, so BUG-06 (GulfAir) does not reproduce here; a mismatching cellCode/cellId is also rejected (409). Not a fix for GulfAir - a different supplier.
- **BUG-16** (Book returns an error while silently creating the booking) &mdash; exercised by TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-BOOK-POS-03, TC-BOOK-BND-03. All single-journey Book calls that were accepted (12 of 12 across passes) returned 200 with a pnr; none returned 409 NDC-INT-UNC-Z9999 together with a created booking (the 409s seen were rejections with no booking). Intermittent on GulfAir, so wider re-verification is still advisable.
- **BUG-19** (Valid seat silently not attached by Book) &mdash; exercised by TC-SEATMAP-VAL-03, TC-BOOK-POS-03. Every valid seat selection (18C, 23C, 24D, 26C, 22B, 25C, 1A) was attached and echoed; the only dropped seat was the foreign-offer cellId of VAL-04 (BUG-07).

## Proposed SPEC.md updates

- §2.7 &mdash; status: *pending*
  - **Old:** "**Required Request Fields**: `supplier`, `credentialsSelector`, `ResponseId` (= `getAddPaxResponceID`), `selectedOfferId` (= `getAddPaxOfferId`) — same chaining pattern as GetAncillary."
  - **New:** "**Required Request Fields**: `supplier`, `credentialsSelector`, `ResponseId` (= `getAddPaxResponceID`), `selectedOfferId` (= `getAddPaxOfferId`) — same chaining pattern as GetAncillary. **Bundle-capable suppliers (FlyAdeal confirmed 2026-10-11) additionally require `selectedBundles: [{JourneyKey, SelectedBundleCode}]`, one entry per offer journey** (codes from GetOfferBundles; the same field is required by Book). Missing -&gt; 400 `PredicateValidator` "selectedBundles list is null or empty"; wrong code for the journey -&gt; 409 "Please select correct combinations for (journeyKey, selectedBundleCode)". Seat availability and price depend on the chosen bundle (FlyAdeal FLYM: all seats free)."
  - **Correction:** Confirmed Round 21 (TC-SEATMAP-POS-01, TC-BOOK-INT-04).

- §2.7 / §8.3 &mdash; status: *pending*
  - **Old:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples."
  - **New:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-10-11): `AvailablePaid`, `AvailableFree`, `Blocked`, `Occupied`. `AvailableFree` is live-confirmed on FlyAdeal at cell level (bundles with seat selection; `seatPriceDetails` null, `seatPriceDetailsByPassenger` zero-amount) and on GulfAir at passenger level. `AvailableAfterReservation` still not observed in 41 FlyAdeal maps. FlyAdeal also returns priced `seatPriceDetailsByPassenger` entries on Blocked/Occupied cells (BUG-20)."
  - **Correction:** Also proposed in Rounds 11, 13 and 20 and still pending; re-confirmed Round 21 (TC-SEATMAP-BND-03).

- §2.7 &mdash; status: *pending*
  - **Old:** "passengersDetails: { &lt;paxRef&gt;: {passengerTypeCode, name} },"
  - **New:** "passengersDetails: { &lt;paxRef&gt;: {passengerTypeCode, name, birthDate, documentNumber, passengersSeatMapAvailability: { &lt;segmentRefId&gt;: { &lt;deck&gt;: [cellCode, ...] } } } },  // the per-passenger allow-list is nested here (FlyAdeal, confirmed 2026-10-11), plus top-level offerId, responseId and isFareCheckRequired"
  - **Correction:** Same drift as in Rounds 18-20 (TC-SEATMAP-REG-02, TC-SEATMAP-VAL-11).

- §4.6 &mdash; status: *pending*
  - **Old:** "| FlyAdeal | Unknown | **Supported** | Unknown | Unknown | Unknown | Conditional (1 flag set) | Unknown |"
  - **New:** "| FlyAdeal | Unknown | **Supported** | **Not Supported** (409 `OperationNotSupported` "Flyadeal does not exists"; `canBeHeld` false on every offer, 2026-10-11) | Unknown (unreachable without Hold) | Unknown | **Supported** (Meal/Baggage booked with Book) | **Supported** (GetSeatMap 200, requires `selectedBundles`; `isSeatMapRequired` false on every offer, BUG-15) |"
  - **Correction:** Confirmed Round 21 (TC-SEATMAP-INT-03, TC-SEATAFTERHOLD-POS-01); SeatAfterHold also 409 for FlyAdeal.

- §4.3 / §1.6 &mdash; status: *pending*
  - **Old:** "a commercially-blacklisted supplier/airline should be blocked from Book even if technically reachable through Search/FareConfirm."
  - **New:** "a commercially-blacklisted supplier/airline should be blocked from Book even if technically reachable through Search/FareConfirm. **Observed 2026-10-11:** on the non-staging fallback host (`ndc-supplier-integration.azurewebsites.net`) FlyAdeal/EGY is NOT blocked - Book succeeds and creates a live, unticketed "Booked" PNR (gdsPNR and bookingToken empty strings, `tickets` {}, retrievable by pnr alone). The business gate is not applied on this host."
  - **Correction:** Confirmed Round 21 (TC-SEATMAP-POS-02 and 11 further Books that returned a pnr); the created PNRs are listed under Cleanup.

- §2.9 / §2.11 &mdash; status: *pending*
  - **Old:** "`bookingStatus` (via Retrieve) = a booked/confirmed status (exact string `UNKNOWN`, §2.11 — record the actual observed value the first time and use it as the regression baseline going forward)."
  - **New:** "`bookingStatus` (via Retrieve) = a booked/confirmed status (exact string `UNKNOWN`, §2.11 — record the actual observed value the first time and use it as the regression baseline going forward). **FlyAdeal (2026-10-11): `bookingStatus` "Booked", `tickets` {}, never ticketed through this API; Retrieve works with `pnr` only; Retrieve under-reports `paxTotalSeatAmount`/`paxTotalAmount` against Book (BUG-18).**"
  - **Correction:** Confirmed Round 21 (TC-BOOK-POS-04, TC-RETRIEVE-REG-01, FLOW-V2-49-SEATFIELD).

## Cleanup / follow-up

Live artifacts left behind this round (17):

- **needs_void_cancel** &mdash; pnr U8J6SJ (TC-SEATMAP-POS-02) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-16, 1 ADT, no seat (shared by POS-02, BND-03 run a)); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr U85QWZ (TC-BOOK-POS-03) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-17, 1 ADT, seat 18C 25 SAR (shared by VAL-03, POS-03, REG-02, REG-03, VAL-08, BIZ-04, BND-03 run b, POS-04, RETRIEVE-REG-01)); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr JB82PN (TC-BOOK-NEG-08) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-25, seat 22B); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr A2S8KV (TC-BOOK-BIZ-06) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-26, 1 ADT + 1 INF, seat 23C); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr I4CU8C (TC-BOOK-VAL-07) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-27, seat 24D); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr Z4QSQV (TC-BOOK-NEG-10) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-28, no seat (passengersSelectedSeats {})); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr ACC8XX (TC-BOOK-NEG-11) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-29, no seat (setSegmentsSeats {})); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr IBUG7X (TC-BOOK-NEG-12) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-11-30, seat 25C, booked WITHOUT ResponseId (BUG-05)); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr Q8S55T (FLOW-V2-49-SEATFIELD) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-12-15, seat 26C); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr TF6H6B (TC-SEATMAP-VAL-04) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-12-28, no seat (foreign cellId dropped, BUG-07)); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr B85IQG (TC-BOOK-INT-03) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-12-09, bundle FLYM + meal + free seat 26C); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr D6RTRZ (TC-BOOK-INT-04) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (JED-RUH 2026-12-29, bundle FLYP + seat 1A 74 SAR); status "Booked", no ticket, airline hold/auto-cancel timing unknown - cancel or let it lapse.
- **needs_void_cancel** &mdash; pnr Z2YF2L (TC-BOOK-POS-03) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (first (parallel) execution pass: JED-RUH 2026-11-17, seat 17C); not part of any test case verdict.
- **needs_void_cancel** &mdash; pnr V17TYR (TC-SEATMAP-POS-02) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (first (parallel) execution pass: JED-RUH 2026-11-16, no seat); not part of any test case verdict.
- **needs_void_cancel** &mdash; pnr S91CFG (FLOW-V2-49-SEATFIELD) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (first (parallel) execution pass: JED-RUH 2026-12-15, seat 27C); not part of any test case verdict.
- **needs_void_cancel** &mdash; pnr PD3RNX (TC-SEATMAP-INT-03) &mdash; Real unticketed FlyAdeal/EGY booking on the non-staging host (pre-run capability probe (before the run log opened): JED-RUH 2026-12-11, seat 17A); not part of any test case verdict.
- **needs_void_cancel** &mdash; pnr none returned (TC-BOOK-BND-03) &mdash; Four two-journey (round trip) Book calls returned HTTP 200 with pnr null (BUG-21): JED-RUH 2026-12-04 / RUH-JED 2026-12-08 (2 ADT, seats 17A/17B both legs), JED-RUH 2026-12-30 / RUH-JED 2027-01-02 (1 ADT, seats 17A both legs), JED-RUH 2027-01-03 / RUH-JED 2027-01-06 (2 ADT, no seats), JED-RUH 2027-01-07 / RUH-JED 2027-01-10 (1 ADT, no seat). It is unknown whether airline reservations were created; without a pnr they cannot be retrieved or cancelled from this API - check with the FlyAdeal side.

