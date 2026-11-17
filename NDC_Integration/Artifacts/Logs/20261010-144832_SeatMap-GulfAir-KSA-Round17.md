# QA Execution Report — Round 17 targeted run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 11 test cases: TC-SEATMAP-SEC-01, TC-SEATMAP-SEC-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-SEATMAP-VAL-05, TC-SEATMAP-VAL-06, TC-SEATMAP-VAL-07, TC-SEATMAP-VAL-08, TC-SEATMAP-VAL-09, TC-SEATMAP-VAL-10, TC-SEATMAP-VAL-11

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-10-10T11:48:45.241Z
**Ended:** 2026-10-10T11:56:50.532Z
**Status:** COMPLETE
**Execution Duration:** 8m 5s ([View Time Breakdown](20261010-144832_SeatMap-GulfAir-KSA-Round17_TimeBreakdown.html))
**Prior runs:** Rounds 1-16 (see NDC_Integration/Artifacts/Logs/)

## Scope note

Run note: requested as Round 16 but labeled Round 17 because a Round 16 run (POS-02/VAL-03/VAL-04) already exists. Requests were sent with a standalone Node harness using the V2 Postman collection bodies; each chain used the first Search offer (FareConfirm isSeatMapRequired=false for GulfAir, offerHasSeat=true, known since Rounds 12/13). SEC-02 is a documentation case (no API call). VAL-05..VAL-11 were evaluated on one GetSeatMap response (GF161 BAH-RUH 2027-06-14); VAL-11 could not exercise a multi-segment offer.

## Summary

- Test cases logged: 11 of 11 planned
- Passed: 9
- Failed: 2
- Blocked: 0
- Failed test cases: TC-SEATMAP-SEC-01, TC-SEATMAP-VAL-04

## Test case results

### TC-SEATMAP-SEC-01 — FAIL

- **Test Case:** [SeatMap][Request] Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap.
- **Category:** Security
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid GulfAir/KSA offer (BAH-RUH 2027-06-14): (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier/selector switched to TravelportNdc/UAE, (3b) same supplier GulfAir with credentialsSelector switched to UAE; extra probes: empty/missing x-api-key, missing Client-Id, bogus selector ZZZ, omitted selector
- **Response:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 400 NDC-INT-TEC-A0001; (3b) 200 - the full seat map was returned; extras: empty key 401, missing key 401, missing Client-Id 401, ZZZ 400, omitted selector 400
- **Expected:** All three variants rejected (exact status/error shape UNKNOWN; reuse the envelope other endpoints produce)
- **Actual:** Two of three checks pass cleanly; the third half-passes. Invalid x-api-key and invalid Client-Id are rejected 401 AuthenticationError (also for empty/missing key and missing Client-Id). A wrong supplier is rejected (400 NDC-INT-TEC-A0001 'Failed to deserialize the selected offer'). But switching only credentialsSelector to another valid one for the same supplier (GulfAir/UAE) is NOT rejected: GetSeatMap returns the complete seat map, same responseId, for an offer created under KSA. credentialsSelector is still not enforced as an authorization boundary on GetSeatMap (BUG-17, 4th round observed). Bogus/omitted selectors are rejected 400 (different envelope: lowercase keys, errorCode 1001).
- **Status:** FAIL
- **Evidence:** control 200; bad key 401; empty key 401; missing key 401; bad Client-Id 401; missing Client-Id 401; TravelportNdc/UAE 400; GulfAir/UAE 200 (sameResponseId=true, 201301 bytes vs control 203091); ZZZ 400; omitted 400

  - **Control - valid headers GulfAir/KSA:** HTTP 200
  - **Variant 1 - invalid x-api-key:** HTTP 401
  - **Variant 1b - empty x-api-key:** HTTP 401
  - **Variant 1c - missing x-api-key header:** HTTP 401
  - **Variant 2 - invalid Client-Id:** HTTP 401
  - **Variant 2b - missing Client-Id header:** HTTP 401
  - **Variant 3a - supplier/selector TravelportNdc/UAE:** HTTP 400
  - **Variant 3b - GulfAir with selector UAE:** HTTP 200
  - **Extra - bogus selector ZZZ:** HTTP 400
  - **Extra - omitted selector:** HTTP 400

### TC-SEATMAP-SEC-02 — PASS

- **Test Case:** [SeatMap][Documentation] Record that supplier-side authentication security (this API's own credentials presented to the airline/GDS backend) and request/response logging are not independently verifiable through this API's black-box contract, and identify the correct verification channel for each.
- **Category:** Documentation
- **Endpoint Name:** GetSeatMap (documentation)
- **Request:** N/A - documentation/scope-boundary case, no live API call
- **Response:** N/A
- **Expected:** Documented per 1.5/1.8/PRD 7: AC8 (supplier-side authentication) and the logging half of AC9 are confirmable only via a backend credential/config audit and log/observability review, not through this suite; AC9 graceful-error half is covered by TC-SEATMAP-NEG-05
- **Actual:** Documented as specified; SPEC.md 1.5 and 1.8 and NDC_PRD.md Gap #1 (hardcoded x-api-key/Client-Id) re-checked and still say the same. AC8/AC9 must not be marked covered by API tests without the paired backend/config/log audit. Unchanged from Rounds 1-16.
- **Status:** PASS
- **Evidence:** No API call made, per the test case definition; SPEC.md headings 1.5/1.8 and PRD Gap #1 line verified present in a separate check

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** [SeatMap][Response] Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.PAX1.setSegmentsSeats.&lt;segment&gt; = {cellCode 8B, cellId = the verbatim cellDetails.cellID from the GetSeatMap response} (AvailablePaid, GulfAir/KSA, BAH-RUH 2027-06-15, GF161, 1 ADT)
- **Response:** 200 - pnr TESHKH, ticket 722137003883; passengersSelectedSeats PAX1/&lt;segment&gt; = {cellCode 8B, price 120 SAR}; seat total 120 SAR; Retrieve repeats 8B
- **Expected:** Book accepts the token despite the field-name casing difference between the response (cellID) and the request (cellId) and attaches the correct seat, echoed back in the response's passengersSelectedSeats/selectedOffer.passengerFareBreakdown[].passengerSeats.
- **Actual:** Confirmed. The cellID was accepted verbatim under the lowercase-d cellId request key (cellID vs cellId casing is cosmetic) and seat 8B was attached, priced 120 SAR, and echoed in passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats and priceDetails.totalSelectedSeats; Retrieve confirms it persisted. Totals reconcile: base 580 + tax 353 + seat 120 = 1053 SAR. BUG-19 (Round 15: valid seat silently dropped) did NOT reproduce, this time on a flight that prices seats (all 148 of 148 paid cells &gt; 0 SAR), which closes the Round-16 caveat. Unchanged outcome from Rounds 1-16.
- **Status:** PASS
- **Evidence:** Book 200, pnr TESHKH, ticket 722137003883, 44.9s; request cellId equals GetSeatMap cellID byte for byte (true); GetSeatMap ids == AddPassenger ids (true); paxTotalSeatAmount 120; Retrieve passengersSelectedSeats = {8B}

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - offers returned
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer returned
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId returned
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails, 148 AvailablePaid cells (flight GF161); chosen seat 8B 120 SAR
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr TESHKH, ticket 722137003883; seat 8B echoed at 120 SAR (44.9s)
  - **Hop 6 &mdash; Retrieve:** PASS &mdash; 200 - seat 8B persisted

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** [SeatMap][Request] Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer B (BAH-JED 2027-06-20) with seat cellCode 12D but cellId = the cellID issued for the same seat 12D on a different offer A (BAH-JED 2027-06-19); two independent Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap chains
- **Response:** 200 - pnr OVAMWU ticketed (722137003884) after 29.5s; passengersSelectedSeats came back {} and Retrieve confirms no seat, no 120 SAR fee (total 1143 SAR)
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live per §7.9), since cellID appears (per its base64-decoded contents) to embed the originating ResponseId/OfferId/passenger-ref metadata and is presumably bound to the offer it was issued for.
- **Actual:** Not rejected. Book accepted a cellId bound (per its decoded contents: Offer A responseId cf885a30-bc26-43e4-8449-5c6e95cc055e, segment ...2027061901..., seat 12D) to a different offer, ran the full booking, issued a ticket and silently dropped the seat instead of returning an error. The same cellCode was used on both offers so only the cellId binding differs - the server neither validates it against Offer B nor reports the mismatch. BUG-07 reproduces (12th time).
- **Status:** FAIL
- **Evidence:** Book 200 pnr OVAMWU ticket 722137003884; passengersSelectedSeats {}; Retrieve passengersSelectedSeats {}; cellID_A decoded: [GF $cfaf69e6-ea23-4b28-8db5-1877e8ab6970 &amp;GF-GF181-GF181-2027061901-2027061904-O PAX1 GF-SeatOffer1 &amp;GF-GF181-GF181-2027061901-2027061904-O 120.00 SAR BAH JED l D 12D $cf885a30-bc26-43e4-8449-5c6e95cc055e]; cellID_B decoded: [GF $4c8f94b8-7c51-45dd-b5c7-eaaddc2706fb &amp;GF-GF181-GF181-2027062001-2027062004-O PAX1 GF-SeatOffer1 &amp;GF-GF181-GF181-2027062001-2027062004-O 120.00 SAR BAH JED l ! 12D $fffbc381-c431-4e1c-acb7-4cf85e829dae]; cellID_A != cellID_B (true)

  - **Hop 1 &mdash; Search (Offer A):** PASS &mdash; 200 - 20 offers
  - **Hop 2 &mdash; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (Offer A):** PASS &mdash; 200 - cellID_A captured for seat 12D
  - **Hop 3 &mdash; Search (Offer B):** PASS &mdash; 200 - 20 offers
  - **Hop 4 &mdash; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (Offer B):** PASS &mdash; 200 - Offer B responseId fffbc381-c431-4e1c-acb7-4cf85e829dae
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr OVAMWU ticketed (722137003884) after 29.5s; passengersSelectedSeats = {}
  - **Hop 6 &mdash; Retrieve:** PASS &mdash; 200 - passengersSelectedSeats = {} (no seat persisted)

### TC-SEATMAP-VAL-05 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid GulfAir/KSA offer (GF161 BAH-RUH 2027-06-14, 1 ADT) - 210 cells in 30 rows; every cellCharacteristics[] padisCode/description pair collected
- **Response:** 200 - 811 characteristics, all padisCode 'Unknown'; 13 distinct description strings
- **Expected:** Automatable assertion: for every padisCode value observed, description must not contradict the code's known meaning per the now-sourced canonical reference table. Codes still outside that table should be rare -- log any such pairing rather than asserting pass/fail.
- **Actual:** GulfAir adapter never populates a real padisCode (811 of 811 are 'Unknown'), so no code can contradict its description; the description strings are self-describing enums (CHARGEABLE_SEAT, FRONT_OF_CABIN, WINDOW, LEFT/RIGHT_SIDE_OF_AIRCRAFT, CENTER_SEAT, AISLE_SEAT, OVER_WING_SEAT_S, EXIT_ROW_SEAT, PREFERRED_SEAT_PREFERENTIAL_SEAT, LEG_SPACE_SEAT, BULKHEAD_SEAT, SEAT_WITH_BASSINET_FACILITY) and cellDetails.description equals the joined cellCharacteristics[].description on 179 of 179 seat cells. Logged, not failed. Unchanged from Rounds 1-16.
- **Status:** PASS
- **Evidence:** padisCode Unknown x811; distinct description strings 13; description-vs-characteristics mismatches 0/179

### TC-SEATMAP-VAL-06 — PASS

- **Test Case:** [SeatMap][Response] Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid GulfAir/KSA offer (GF161 BAH-RUH 2027-06-14, 1 ADT) - 210 cells in 30 rows; cells partitioned by cellCategory
- **Response:** 200 - 179 Seat, 30 Aisle, 1 NoSeat cells
- **Expected:** Automatable assertion: cellCategory=Aisle implies column is null AND cellDetails is null; cellCategory=Seat implies column is non-null AND cellDetails is a populated object (per TC-SEATMAP-REG-02's field list). No cell violates this partition.
- **Actual:** 0 violations. All 30 Aisle cells have column null and cellDetails null; all 179 Seat cells have a letter column (A-F) and a populated cellDetails object. The 1 NoSeat cell (row 8, column E) has a real column letter and cellDetails null - outside this rule, noted only.
- **Status:** PASS
- **Evidence:** Aisle 30/30 column=null &amp; cellDetails=null; Seat 179/179 column non-null &amp; cellDetails populated; NoSeat 1 (8E)

### TC-SEATMAP-VAL-07 — PASS

- **Test Case:** [SeatMap][Response] Verify seat attributes relevant to customer-facing seat selection (window, aisle, extra legroom/exit row) are programmatically derivable from cellCharacteristics for every Seat-category cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid GulfAir/KSA offer (GF161 BAH-RUH 2027-06-14, 1 ADT) - 210 cells in 30 rows; every Seat cell characteristics classified window/aisle/legroom
- **Response:** 200 - 179 Seat cells classified
- **Expected:** Automatable assertion: for codes present in the now-sourced canonical reference table (NDC_Integration/Resources/SeatResources/PadisSeatCharacteristic.md), the derived classification must not contradict column position or description text. Codes outside that table are logged, not failed.
- **Actual:** Every Seat cell description carries a window/aisle/centre marker and a left/right-side marker, and 0 of 179 contradict the cell column (A/F=WINDOW, C/D=AISLE_SEAT, B/E=CENTER_SEAT). Extra legroom (LEG_SPACE_SEAT, 17 cells), bulkhead (5) and exit row (EXIT_ROW_SEAT, 24 cells) are derivable from the text too. padisCode is 'Unknown' for 811/811 characteristics, so the PADIS-code route yields nothing for this supplier; attributes are derivable only from the description text (logged, not failed). Unchanged from Rounds 1-16.
- **Status:** PASS
- **Evidence:** col A/F: WINDOW 60/60; col C/D: AISLE_SEAT 60/60; col B/E: CENTER_SEAT 59/59 (8E is NoSeat); contradictions 0/179; Unknown padis on 179/179 seat cells

### TC-SEATMAP-VAL-08 — PASS

- **Test Case:** [SeatMap][Response] Verify seatPriceDetails/seatPriceDetailsByPassenger is populated (non-null) for every AvailablePaid cell and null/absent for every Blocked or Occupied cell.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid GulfAir/KSA offer (GF161 BAH-RUH 2027-06-14, 1 ADT) - 210 cells in 30 rows; pricing presence checked per cellAvailability
- **Response:** 200 - 179 AvailablePaid cells, 0 Blocked/Occupied
- **Expected:** Automatable assertion: every AvailablePaid cell has a non-null seatPriceDetailsByPassenger with populated totalPrice/basePrice/taxesPrice per passenger (cross-ref TC-SEATMAP-BIZ-02's reconciliation); every Blocked/Occupied cell has seatPriceDetails null (consistent with SPEC.md §2.7's observed example, which shows seatPriceDetails: null on a Blocked cell).
- **Actual:** AvailablePaid: 179/179 have seatPriceDetailsByPassenger with totalPrice, basePrice and taxesPrice populated and base+tax = total (120.00 SAR x17, 60.00 SAR x54, 40.00 SAR x108; taxes 0.00). The Blocked/Occupied half could not be exercised: this GulfAir response contains no Blocked or Occupied cell (taken seats appear as NoSeat with null cellDetails, so no pricing). No non-paid cell carries pricing (0 violations). The aggregate seatPriceDetails is null on every cell. Unchanged from Rounds 1-16.
- **Status:** PASS
- **Evidence:** AvailablePaid 179, missing pricing 0, price arithmetic errors 0; Blocked/Occupied 0 (half not exercisable); non-paid cells with pricing 0

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCode is unique across all cells within one flight segment's seatMapDetails.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid GulfAir/KSA offer (GF161 BAH-RUH 2027-06-14, 1 ADT) - 210 cells in 30 rows; cellCode uniqueness checked within the segment
- **Response:** 200 - 179 cellCodes
- **Expected:** Automatable assertion: no cellCode value repeats within the same segment. A duplicate seat code is a confirmed defect (SeatMap QC Execution Checklist.md §9's "Duplicate seat code" possible-bug), not an UNKNOWN.
- **Actual:** No duplicates: 179 cellCodes, 179 unique (rows 8-38, columns A-F); every cellCode equals its row number + column letter, and all 179 cellIDs are unique too. Unchanged from Rounds 1-16.
- **Status:** PASS
- **Evidence:** 179 cellCodes, 179 unique; duplicates 0; cellID duplicates 0; code vs row+column mismatches 0

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** [SeatMap][Response] Verify structural uniqueness and domain constraints across decks/zones/rows/columns: rowNumber unique within a segment, zoneId unique within a deck, column values restricted to {A,B,C,D,E,F,null}.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap on a valid GulfAir/KSA offer (GF161 BAH-RUH 2027-06-14, 1 ADT) - 210 cells in 30 rows; row/zone/column constraints checked
- **Response:** 200 - 30 rows, 1 deck, 1 zone
- **Expected:** Automatable assertion: no rowNumber repeats within the segment; no zoneId repeats within the same deck; every non-null column value is one of A/B/C/D/E/F (per the observed 6-column-per-row layout, SPEC.md §2.7); null column values correspond only to Aisle-category cells (cross-ref TC-SEATMAP-VAL-06).
- **Actual:** All four constraints hold: 30 row numbers, 30 unique (8-38); 1 zone (Cabin1) in deck Main, unique; Seat-cell columns are exactly {A,B,C,D,E,F}; the 30 null-column cells are all Aisle-category. The NoSeat cell (8E) carries a real column rather than null - allowed by the rule (it only restricts nulls). Every row deck/zoneId resolves to the declared layout. Unchanged from Rounds 1-16.
- **Status:** PASS
- **Evidence:** rows 30/30 unique; zoneIds [Cabin1]; columns {A..F}; null-column non-Aisle cells 0; deck/zone resolves for all rows

### TC-SEATMAP-VAL-11 — PASS

- **Test Case:** [SeatMap][Response] Verify passengersSeatMapAvailability.&lt;paxRef&gt;.&lt;segmentRefId&gt; (the top-level per-passenger allow-list of cellCodes) stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response.
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response - passengersDetails.PAX1.passengersSeatMapAvailability keys and allow-list checked against flightSegments / seatMapDetails
- **Response:** 200 - PAX1 allow-list keyed by segmentRefId then deck name (Main), 179 cellCodes
- **Expected:** Automatable assertions: (1) every segmentRefId key under passengersSeatMapAvailability.&lt;paxRef&gt; matches the casing used elsewhere in the same response (flightSegments/seatMapDetails keys) -- a differently-cased key for the same logical segment (e.g. "Seg3" vs "SEG1"/"SEG2") is a confirmed defect, not an acceptable variation; (2) every cellCode listed in a passenger's allow-list corresponds to a real cell in that segment's seatMapDetails.
- **Actual:** The allow-list key is the full segmentRefId and matches the seatMapDetails/flightSegments key character-for-character; all 179 allow-listed codes exist as real cells and every AvailablePaid cell is on the list (0 missing, 0 duplicates). The block is nested one level deeper than SPEC.md describes (passengersDetails.PAX1.passengersSeatMapAvailability -&gt; segment -&gt; deck Main -&gt; cellCode array). Single-segment, single-passenger offer, so the multi-segment Seg3 casing scenario could not be exercised. No casing inconsistency for GulfAir.
- **Status:** PASS
- **Evidence:** allow-list segment keys 1 (identical casing in all three maps); deck keys [Main]; allow-list length 179; codes not present as cells 0; paid cells missing from allow-list 0

## Findings

### Defects

- **[TC-SEATMAP-SEC-01] BUG-17 (occurrence 4, not new) &mdash; GetSeatMap does not reject a request whose credentialsSelector differs from the one the offer was created under (same supplier, different valid selector).** Field: `credentialsSelector`. Expected: 4xx rejection (offer not found / not authorized for this credentialsSelector), as happens when the supplier is switched. **History:** First observed Round 11 (2026-09-29); reproduced Rounds 12 and 13 (2026-09-30); reproduced again Round 17 (2026-10-10). **Impact:** credentialsSelector is the per-tenant boundary; a caller holding an offerId/responseId from one tenant (KSA) can read that offer's seat map through another tenant's selector (UAE), so cross-tenant isolation rests only on offer IDs being unguessable. Other offer-consuming endpoints were not tested. Evidence: Offer created under GulfAir/KSA; GetSeatMap with GulfAir/UAE -&gt; 200, full seat map, same responseId; supplier switched to TravelportNdc/UAE -&gt; 400 NDC-INT-TEC-A0001; invalid key / Client-Id -&gt; 401.
- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 12, not new) &mdash; Book accepts a cellId that was issued for a different offer's seat: it runs the full booking, tickets it, and silently drops the seat (empty passengersSelectedSeats, no fee) instead of returning an error.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, before any booking is made. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7, 11, 12, 13, 15, 16 (Round 4 blocked by an outage); reproduced again Round 17 (2026-10-10). **Impact:** A real ticketed booking is created for a request that should have been refused; the customer silently loses the seat they asked for and no error tells the caller why. Evidence: Book on Offer B (BAH-JED 2027-06-20, seat 12D) with the cellID issued for the same seat on Offer A (2027-06-19): 200 after 29.5s, pnr OVAMWU, ticket 722137003884, passengersSelectedSeats {}; Retrieve confirms no seat.

### Not reproduced

- **BUG-19** (Book silently drops a valid same-offer seat selection) &mdash; exercised by TC-SEATMAP-VAL-03. Round 15 reproduced 2 of 2 (seats 12D, 10C dropped). Round 17 VAL-03 seat 8B (120 SAR) on GF161 BAH-RUH 2027-06-15 attached, was priced and persisted through Retrieve on the first attempt. Unlike Round 16, this flight prices its seats (148 of 148 paid cells above 0 SAR), so the 0-SAR caveat no longer applies; still only 1 attempt this round.
- **BUG-16** (Book returns an error while silently creating the booking) &mdash; exercised by TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04. Both Book calls (44.9s and 29.5s) returned a clean HTTP 200 with a pnr and bookingToken; none returned 409 NDC-INT-UNC-Z9999 or 500. Intermittent across rounds, so recommend a wider re-verification before closing.

## Proposed SPEC.md updates

No SPEC.md updates proposed this round (earlier pending proposals are unchanged).

## Cleanup / follow-up

Live artifacts left behind this round (2):

- **needs_void_cancel** &mdash; pnr TESHKH (TC-SEATMAP-VAL-03) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-15, 1 ADT, ticket 722137003883) with seat 8B attached (120 SAR). Staging test booking; void/cancel via the platform team if it should not remain.
- **needs_void_cancel** &mdash; pnr OVAMWU (TC-SEATMAP-VAL-04) &mdash; Real ticketed booking (BAH-JED 2027-06-20, 1 ADT, ticket 722137003884, no seat attached). Evidence for BUG-07 - keep until triaged.

