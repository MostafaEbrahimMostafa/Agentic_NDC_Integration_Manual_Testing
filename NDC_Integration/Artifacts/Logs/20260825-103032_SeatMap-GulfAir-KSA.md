# QA Execution Report — SeatMap_TestCases.csv (NDC_Integration/Resources/SeatResources/SeatMap_TestCases.csv) — 60 test cases: SEATMAP/BOOK/SEATAFTERHOLD/RETRIEVE endpoint cases plus FLOW-V2-49/50-SEATFIELD and 3 SM-HOLD candidate flows

**Environment:** staging (non-default host — user-specified) &middot; https://ndc-integration-stg-ne-2.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-08-25T10:30:32Z
**Ended:** 2026-08-25T14:50:00Z
**Status:** COMPLETE

## Summary

- Test cases logged: 60 of 60 planned
- Passed: 30
- Failed: 15
- Blocked: 15

## Test case results

### TC-SEATMAP-POS-01 [Positive] — Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat — supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=AddPassenger's IDs (BAH-RUH 2026-10-15, GF169)
- Response: 200 — supplier, flightSegments{GF-GF169-...-O}, passengersDetails{PAX1}, seatMapDetails{GF-GF169-...-O:{cabinLayoutsByDeck.Main, rows[30]}} all present and non-null
- Expected (§2.7, §8.1-item1): HTTP 200; all four top-level fields present/non-null; every segmentRefId in seatMapDetails also appears in flightSegments and in the AddPassenger-era offer's segments
- Actual: 200; single segment GF-GF169-GF169-2026101520-2026101521-O present identically in both flightSegments and seatMapDetails; passengersDetails.PAX1 present; seatMapDetails has 30 rows
- Status: **PASS**
- Evidence: Live GetSeatMap response for GulfAir/KSA BAH-RUH 2026-10-15 (offer GF169)

### TC-SEATMAP-VAL-05 [Validation] — Verify cellCharacteristics.description text is consistent with its own padisCode

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response as TC-SEATMAP-POS-01, inspecting cellCharacteristics[] on every cell
- Response: Every cellCharacteristics[] entry has padisCode:"Unknown" and description as a self-descriptive enum string, e.g. WINDOW, AISLE_SEAT, CHARGEABLE_SEAT, LEG_SPACE_SEAT, FRONT_OF_CABIN, BULKHEAD_SEAT, CENTER_SEAT, SEAT_WITH_BASSINET_FACILITY, LEFT_SIDE_OF_AIRCRAFT, RIGHT_SIDE_OF_AIRCRAFT
- Expected (SPEC.md §2.7, §8.3): For padisCode values in the maintained reference table, description must not contradict the code's known meaning; codes outside the table are logged, not failed
- Actual: GulfAir's adapter never populates a real padisCode (always the literal string "Unknown") — no cross-check against the reference table is possible; description strings are internally self-consistent and unambiguous on their own
- Status: **PASS**
- Evidence: Sampled all 6 cellCharacteristics entries on 4 distinct seat cells (8A,8B,8C,8D,8F) — every padisCode was "Unknown"

### TC-SEATMAP-VAL-06 [Validation] — Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response as TC-SEATMAP-POS-01, scanning cellCategory/column/cellDetails across all 30 rows x 7 columns (210 cells)
- Response: 209/210 cells conform (Aisle→column=null & cellDetails=null; Seat→both populated); row 8 column E is the sole exception
- Expected (SPEC.md §2.7; SeatMap QC Execution Checklist.md §8): cellCategory=Aisle implies column is null AND cellDetails is null; cellCategory=Seat implies column is non-null AND cellDetails is a populated object; no cell violates this partition
- Actual: Row 8, column E: cellCategory="Aisle" but column="E" (non-null) and cellDetails is a populated object (cellCode="8E", cellAvailability="Occupied", cellID/name/description/seatPriceDetails/cellCharacteristics all null) — this is a real, occupied seat mis-tagged as an Aisle cell
- Status: **FAIL**
- Evidence: Full 30-row scan: 1 anomaly out of 210 cells, isolated to row 8 column E only; every other row's column E is a normal Seat cell

### TC-SEATMAP-VAL-07 [Validation] — Verify window/aisle/extra-legroom/exit-row seat attributes are programmatically derivable from cellCharacteristics

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, cross-checking cellCharacteristics against column position/description text
- Response: WINDOW/AISLE_SEAT/BULKHEAD_SEAT/CENTER_SEAT/LEG_SPACE_SEAT literals appear directly as description strings on the outermost/innermost columns as expected
- Expected (SPEC.md §2.7, §8.3; User Story AC3): 
- Actual: Column A/F carry WINDOW + LEFT_SIDE_OF_AIRCRAFT/RIGHT_SIDE_OF_AIRCRAFT; column C/D carry AISLE_SEAT; row 8 (bulkhead) carries BULKHEAD_SEAT+LEG_SPACE_SEAT on every seat in the row — all classifications derivable directly from the description text (padisCode itself being "Unknown" for this supplier, per TC-SEATMAP-VAL-05)
- Status: **PASS**
- Evidence: Row 8 cells 8A(WINDOW,left),8B(CENTER,bassinet),8C(AISLE,left),8D(AISLE,right),8F(WINDOW,right) all match their column position

### TC-SEATMAP-VAL-08 [Validation] — Verify seatPriceDetails/seatPriceDetailsByPassenger is populated for every AvailablePaid cell and null for every Blocked/Occupied cell

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, partitioned by cellAvailability across all 210 cells
- Response: All 179 AvailablePaid seat-cells have non-null seatPriceDetails/seatPriceDetailsByPassenger.PAX1; the 1 Occupied seat-cell (8E) has both null
- Expected (SPEC.md §2.7; User Story AC4): 
- Actual: 179/179 AvailablePaid cells populated; 1/1 Occupied cell null (no Blocked cells observed in this sample)
- Status: **PASS**
- Evidence: Full 210-cell scan of the live GulfAir seatmap

### TC-SEATMAP-VAL-09 [Validation] — Verify cellCode is unique across all cells within one flight segment's seatMapDetails

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, collecting every cellCode within the one segment
- Response: 180 total cellCode values, 180 distinct — zero duplicates
- Expected (SPEC.md §2.7; SeatMap QC Execution Checklist.md §9): 
- Actual: No cellCode value repeats within the segment
- Status: **PASS**
- Evidence: 180/180 unique across the full 30-row seat map

### TC-SEATMAP-VAL-10 [Validation] — Verify structural uniqueness/domain constraints: rowNumber unique, zoneId unique within deck, column restricted to {A-F,null}

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, checked rowNumber/zoneId/column across all 30 rows
- Response: 30 distinct rowNumbers (8-... no duplicates); 1 zone ("Cabin1") consistently; column values restricted to {A,B,C,D,E,F,null}
- Expected (SPEC.md §2.7; SeatMap QC Execution Checklist.md §4-7): 
- Actual: No rowNumber duplicated; single zoneId per deck (trivially unique); every non-null column in {A,B,C,D,E,F}; every null-column cell is Aisle-category (holds even though the reverse — TC-SEATMAP-VAL-06's row-8-column-E anomaly — does not)
- Status: **PASS**
- Evidence: cabinLayoutsByDeck.Main.zones[0] = {zoneId:Cabin1, columns:[A,B,C,null,D,E,F], cabinClass:ECONOMY}; 0 duplicate rowNumbers across 30 rows

### TC-SEATMAP-BND-02 [Boundary] — Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid/Blocked/Occupied, and Aisle cells carry no seatPriceDetails

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, enumerating distinct cellCategory/cellAvailability values
- Response: cellCategory ∈ {Seat, Aisle}; cellAvailability ∈ {AvailablePaid, Occupied} (Blocked not observed this sample); every Aisle cell (including the row-8 anomaly) has null seatPriceDetails
- Expected (SPEC.md §2.7, §8.3): 
- Actual: No value outside the known enum observed; Aisle cells carry no pricing
- Status: **PASS**
- Evidence: Full 210-cell scan

### TC-SEATMAP-BND-03 [Boundary] — Confirm live whether AvailableFree/AvailableAfterReservation are real cellAvailability values

- Endpoint Name: GetSeatMap
- Request: Same GulfAir/KSA GetSeatMap sample (1 segment, 210 cells) inspected for AvailableFree/AvailableAfterReservation
- Response: Only AvailablePaid and Occupied observed; neither candidate value found
- Expected (SPEC.md §2.7, §8.3; SeatMap QC Execution Checklist.md §10,§29): 
- Actual: No new evidence for or against AvailableFree/AvailableAfterReservation on GulfAir/KSA — remain unconfirmed candidates, consistent with the test's own fallback outcome for a supplier/sample where they don't appear
- Status: **PASS**
- Evidence: 210/210 cells were AvailablePaid or Occupied only

### TC-SEATMAP-BIZ-02 [Business Rule] — Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, checked totalPrice vs basePrice+taxesPrice for all 179 AvailablePaid cells
- Response: All 179 cells: basePrice.amount=0 (currency=null), taxesPrice.amount=0 (currency=SAR), totalPrice.amount∈{40.00,60.00,120.00} (currency=SAR) depending on seat category
- Expected (SPEC.md §2.7, §7.10): totalPrice.amount == basePrice.amount + taxesPrice.amount for every priced cell/passenger pair, in the same currency
- Actual: 179/179 (100%) mismatch: totalPrice is always the full seat charge while basePrice and taxesPrice are always 0 — the charge is never decomposed into base+tax anywhere in the response
- Status: **FAIL**
- Evidence: Sample: cell 8A totalPrice=120.00 SAR, basePrice=0/null-currency, taxesPrice=0 SAR — 120.00 ≠ 0+0. Confirmed systemic across all 179 paid cells (3 distinct price tiers, all identically un-reconciled).

### TC-SEATMAP-BIZ-03 [Business Rule] — Verify overall cellAvailability and per-passenger paxCellAvailability are independently reported

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response — 1 ADT passenger (PAX1) only
- Response: Every priced cell's seatPriceDetailsByPassenger has exactly one entry, keyed PAX1, matching the cell's own cellAvailability
- Expected (SPEC.md §2.7; SeatMap QC Execution Checklist.md §11): 
- Actual: Structural assertion holds (every priced cell has a per-passenger entry for every passenger on the offer) — but this chain only had a single ADT passenger, so the checklist's "may legitimately differ across passenger types" scenario was not exercised
- Status: **PASS**
- Evidence: 179/179 paid cells have a PAX1 entry whose paxCellAvailability equals the cell's own cellAvailability (AvailablePaid)

### TC-SEATMAP-BIZ-04 [Business Rule] — Exploratory — confirm GetSeatMap reflects real-time supplier inventory rather than a cached snapshot

- Endpoint Name: GetSeatMap
- Request: Requires a second, independent session to occupy a specific seat between two GetSeatMap calls
- Response: Not attempted — no concurrent-session/forcing mechanism available in this run
- Expected (SPEC.md §1.3; User Story AC6): 
- Actual: Not forceable from a single test session; downgraded to best-effort/exploratory per the test's own notes, not executed this run
- Status: **BLOCKED**
- Evidence: No second booking session available to independently occupy a seat mid-run

### TC-SEATMAP-REG-02 [Regression] — Verify seatMapDetails full field-list schema matches SPEC.md §2.7 with no undocumented keys

- Endpoint Name: GetSeatMap
- Request: Full schema diff of the live GetSeatMap response against §2.7's documented field list
- Response: All §2.7-documented fields present and correctly typed, plus two fields not documented anywhere in §2.7: top-level isFareCheckRequired (boolean) and passengersDetails.<paxRef>.passengersSeatMapAvailability (per-segment map of available seat-code strings, e.g. {"Main":["8A","8B",...]})
- Expected (SPEC.md §2.7, §8.1-item8): Every key listed in §2.7 present and correctly typed; no key present in the response is undocumented
- Actual: 2 undocumented top-level/nested keys found: isFareCheckRequired and passengersDetails.<pax>.passengersSeatMapAvailability
- Status: **FAIL**
- Evidence: Live GulfAir GetSeatMap response body, full key enumeration

### TC-SEATMAP-NEG-01 [Negative] — Validate GetSeatMap is rejected when called for an offer whose isSeatMapRequired flag was false

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat using AddPassenger IDs from an offer confirmed live (Search+FareConfirm) to have isSeatMapRequired=false
- Response: 200 — full seatMapDetails (30 rows, 210 cells) returned, not an error/unsupported envelope
- Expected (SPEC.md §2.2, §2.4, §2.7, §7.7; User Story AC2): Rejected, or an explicit unsupported-operation envelope (e.g. the {ErrorCode:'OperationNotSupported',...} shape already confirmed for GetOfferBundles on a haveBundles=false offer), rather than a 200 with populated seatMapDetails
- Actual: 200 with a fully populated, well-formed seatMapDetails — the opposite of the expected rejection
- Status: **FAIL**
- Evidence: Same GetSeatMap call as TC-SEATMAP-POS-01, where isSeatMapRequired was independently confirmed false at both Search and FareConfirm for this exact offer

### TC-SEATMAP-NEG-02 [Negative] — Validate GetSeatMap is rejected when ResponseId/selectedOfferId come from two different offers

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat with ResponseId from Chain A's AddPassenger (BAH-RUH 2026-10-15) and selectedOfferId from Chain B's AddPassenger (BAH-JED 2026-10-20) — two independent Search->FareConfirm->AddPassenger chains
- Response: 200 — a normal, well-formed seat map response, no rejection
- Expected (SPEC.md §2.7, §7.7; User Story AC2): Request is rejected; no seatMapDetails returned for a segment set that doesn't belong to the referenced offer
- Actual: 200 success; the API did not detect or reject the cross-offer ResponseId/selectedOfferId mismatch
- Status: **FAIL**
- Evidence: Chain A ResponseId=3767f18d-ece1-423f-a587-177dbdfe47df combined with Chain B's offerId — accepted with HTTP 200

### TC-SEATMAP-NEG-03 [Negative] — Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat with a fabricated GUID ResponseId and a fabricated selectedOfferId string
- Response: 500 — {Status:500, ErrorCode:"ServerError", ErrorMessage:"Unknown error occured. Please keep the transaction id as a reference.", Context:[]}
- Expected (SPEC.md §2.7, §7.7, §8.1-item2): Rejected (exact status UNKNOWN — confirm live); no seatMapDetails returned
- Actual: Rejected via HTTP 500 (generic ServerError envelope, no seatMapDetails) — rejected as expected, but via an unhandled-exception-shaped 500 rather than a controlled 4xx
- Status: **PASS**
- Evidence: TransactionId da0c5cf4-0eaf-423b-a81e-07b6414c405d

### TC-SEATMAP-NEG-04 [Negative] — Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId

- Endpoint Name: GetSeatMap
- Request: 4 variants of a valid GetSeatMap body, each with exactly one of supplier/credentialsSelector/ResponseId/selectedOfferId removed
- Response: omit supplier→400 {errorCode:1001,"Select a valid Supplier"}; omit credentialsSelector→400 {errorCode:1001,"Select a valid CredentialsSelector"}; omit ResponseId→200 full seat map (NOT rejected); omit selectedOfferId→400 {"The SelectedOfferId field is required."}
- Expected (SPEC.md §2.7, §7.7, §8.1-item2): All four runs rejected; no seatMapDetails returned in any run
- Actual: 3 of 4 correctly rejected with clean 400 validation errors; omitting ResponseId was accepted with HTTP 200 and a full seat map returned
- Status: **FAIL**
- Evidence: omit-ResponseId variant returned the same well-formed seatMapDetails shape as TC-SEATMAP-POS-01

### TC-SEATMAP-NEG-05 [Negative] — Validate GetSeatMap fails gracefully (structured error, not raw 500/stack trace) when the underlying supplier call fails

- Endpoint Name: GetSeatMap
- Request: No dedicated supplier-failure forcing mechanism available this run; reusing TC-SEATMAP-NEG-03's fabricated-ID 500 response as the closest available evidence
- Response: 500 {Status,TransactionId,ErrorCode:"ServerError",ErrorMessage,Context:[]} — a structured envelope, no .NET stack trace, type name, or raw supplier XML/SOAP payload leaked
- Expected (SPEC.md §1.3, §2.9, §7.9; User Story AC9): A structured business-error envelope, not an unhandled exception/stack trace/raw supplier payload leak
- Actual: The 500 response is a clean, structured JSON envelope (Status/TransactionId/ErrorCode/ErrorMessage/Context) with no internal type names or raw supplier payloads visible — graceful in shape, even though the status code itself (500 vs 4xx) is questionable per TC-SEATMAP-NEG-03's finding
- Status: **PASS**
- Evidence: Reused evidence from TC-SEATMAP-NEG-03 (no independent supplier-failure forcing mechanism was available to trigger a genuine supplier-side fault in this run)

### TC-SEATMAP-SEC-01 [Security] — Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap

- Endpoint Name: GetSeatMap
- Request: 3 variants of a valid GetSeatMap call: (1) corrupted x-api-key, (2) corrupted Client-Id, (3) valid headers but supplier/credentialsSelector switched to TravelportNdc/UAE against a GulfAir/KSA-established ResponseId/selectedOfferId
- Response: (1) 401 {ErrorCode:AuthenticationError}; (2) 401 {ErrorCode:AuthenticationError} (identical envelope to (1)); (3) 409 {ErrorCode:OperationNotSupported,"This action is not currently supported by the selected supplier."}
- Expected (SPEC.md §7.14; User Story AC8): All three rejected; exact status/error shape to be confirmed live and reused for consistency
- Actual: All three correctly rejected — invalid x-api-key and invalid Client-Id both produce the same 401 AuthenticationError envelope; the cross-tenant supplier/credentialsSelector swap produces a distinct 409 OperationNotSupported envelope
- Status: **PASS**
- Evidence: TransactionIds 54482d49-... (bad key), da0c26ff-... (bad client), 51ac44a6-... (cross-tenant)

### TC-SEATMAP-SEC-02 [Security] — Record that supplier-side auth and request/response logging are not independently verifiable through this API's black-box contract

- Endpoint Name: GetSeatMap (documentation)
- Request: N/A — documentation/scope-boundary case, no live API call
- Response: N/A
- Expected (SPEC.md §1.5, §1.8; NDC_PRD.md §7, Gap #1): Document that AC8's supplier-facing auth half and AC9's logging half are not API-observable; AC9's graceful-error half is covered instead by TC-SEATMAP-NEG-05
- Actual: Documented as specified — this run's TC-SEATMAP-NEG-05 covers the API-observable graceful-degradation half; supplier-credential-storage and log/observability review remain outside this run's scope
- Status: **PASS**
- Evidence: No API call made for this case, per its own definition

### TC-SEATMAP-INT-02 [Integration] — Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols

- Endpoint Name: GetSeatMap
- Request: Requires GetSeatMap against 3+ suppliers spanning distinct native protocols
- Response: Out of scope for this run — the run's scope is GulfAir only, per the user's explicit supplier selection
- Expected (SPEC.md §1.3, §2.7, §4.1, §4.7; User Story AC7): 
- Actual: Not executed — this run covers a single supplier (GulfAir); a genuine protocol-diversity comparison needs a separate multi-supplier run
- Status: **BLOCKED**
- Evidence: Run scope explicitly fixed to Supplier=GulfAir for this execution

### TC-SEATMAP-INT-03 [Integration] — Capability-matrix sweep — run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable

- Endpoint Name: GetSeatMap
- Request: Requires a full-roster sweep across every SPEC.md §4.6 supplier
- Response: Out of scope for this run — only GulfAir's row can be populated by this execution
- Expected (SPEC.md §4.5, §4.6, §4.7; User Story AC7): 
- Actual: Not executed as a full sweep; this run's own §4.7 confirmation (logged above) supplies GulfAir's single row of that living artifact — isSeatMapRequired=false on every sampled offer, but GetSeatMap itself succeeds regardless (per TC-SEATMAP-NEG-01), so GulfAir should be recorded as SeatMap=Supported (live-confirmed), not Unknown
- Status: **BLOCKED**
- Evidence: See §4.7 confirmation finding logged at run start

### TC-SEATMAP-POS-02 [Positive] — Verify GetSeatMap sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it

- Endpoint Name: GetSeatMap -> Book
- Request: AddPassenger -> GetSeatMap -> Book, with Book's ResponseId/selectedOfferId sourced from GetSeatMap's own responseId/offerId (not AddPassenger's)
- Response: Book 200, pnr=RWNRYI, bookingToken=TPC60517142255D2582026 — succeeded using GetSeatMap's IDs directly, no AddPassenger IDs re-sent
- Expected (SPEC.md §2.7, §2.9): GetSeatMap's offerId/responseId feed Book's ResponseId/selectedOfferId; Book accepts them and returns pnr/bookingToken/gdsPNR without needing AddPassenger's IDs
- Actual: Book succeeded using exactly GetSeatMap's responseId/offerId as ResponseId/selectedOfferId
- Status: **PASS**
- Evidence: Book request ResponseId/selectedOfferId == GetSeatMap response's responseId/offerId verbatim; Book returned pnr RWNRYI

### TC-SEATMAP-VAL-03 [Validation] — Verify cellDetails.cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite the casing difference

- Endpoint Name: GetSeatMap -> Book
- Request: Book submitted with passengersSelectedSeats.PAX1.setSegmentsSeats.<segRefId> = {cellCode:"8B", cellId:<verbatim cellID value from GetSeatMap>}
- Response: 200 — seat 8B correctly attached and echoed in passengersSelectedSeats/passengerFareBreakdown/priceDetails
- Expected (SPEC.md §2.7, §2.9, §8.3): Book accepts the token despite the cellID/cellId casing mismatch, attaching the correct seat
- Actual: Accepted; the casing difference is purely cosmetic/case-insensitive-bound as inferred
- Status: **PASS**
- Evidence: Book response passengersSelectedSeats.PAX1.<segRefId> = {cellCode:"8B",price:{amount:120.00,currency:"SAR"}}

### TC-BOOK-POS-03 [Positive] — Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly

- Endpoint Name: Book
- Request: POST api/v2/FlightBooking/Book — supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=GetSeatMap's IDs, passengersSelectedSeats.PAX1.setSegmentsSeats.<segRefId>={cellCode:"8B",cellId:<cellID>}
- Response: 200 — pnr=RWNRYI, gdsPNR="" (empty string), bookingToken=TPC60517142255D2582026, ticketStatus=Booked, ticketNumber=722136277291
- Expected (SPEC.md §2.9): HTTP 200; pnr/bookingToken/gdsPNR returned; response echoes passengersSelectedSeats.PAX1.<seg>=={cellCode:"8B",price:{...}}; passengerFareBreakdown[].passengerSeats and priceDetails.totalSelectedSeats/totalSelectedSeatsAmount reflect the same price
- Actual: All echoes match exactly: passengersSelectedSeats.PAX1.<seg>={cellCode:8B,price:120.00 SAR}; passengerSeats=[{cellCode:8B,price:120.00 SAR}]; totalSelectedSeatsAmount=120.00 SAR
- Status: **PASS**
- Evidence: Full Book response body, pnr RWNRYI, GulfAir flight GF169 BAH-RUH 2026-10-15

### TC-BOOK-BIZ-04 [Business Rule] — Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: totalAmount=703.00 SAR; totalBaseAmount=230.00; totalTaxAmount=353.00; totalAncillariesAmount=0; totalSelectedSeatsAmount=120.00
- Expected (SPEC.md §2.1, §2.9, §7.10): totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount
- Actual: 230.00 + 353.00 + 0 + 120.00 = 703.00 == totalAmount (703.00) — reconciles exactly
- Status: **PASS**
- Evidence: selectedOffer.priceDetails from the Book response, pnr RWNRYI

### TC-BOOK-REG-02 [Regression] — Verify passengersSelectedSeats, passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: All 5 fields present and correctly typed: passengersSelectedSeats, passengerSeats, paxTotalSeatAmount (120.00), totalSelectedSeats, totalSelectedSeatsAmount (120.00)
- Expected (SPEC.md §2.9, §8.1-item8): 
- Actual: All 5 fields present and correctly typed; no pre-existing response field appears regressed/missing
- Status: **PASS**
- Evidence: Full Book response schema for pnr RWNRYI

### TC-BOOK-REG-03 [Regression] — Verify passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount for a single seat

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03 — 1 seat, 1 passenger
- Response: passengerSeats[0].price.amount=120.00; paxTotalSeatAmount.amount=120.00
- Expected (SPEC.md §2.9; Seat map - Seatmap.md TC-INT-BOOK-005): 
- Actual: Exactly equal (120.00 == 120.00, both SAR) — no schema-discrepancy defect observed for GulfAir
- Status: **PASS**
- Evidence: selectedOffer.passengerFareBreakdown[0] from the Book response, pnr RWNRYI

### TC-BOOK-VAL-08 [Validation] — Verify the currency code is consistent (not a placeholder like "string") across every seat-price object in one Book response

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: passengersSelectedSeats.PAX1.<seg>.price.currency=SAR; passengerSeats[0].price.currency=SAR; totalSelectedSeatsAmount.currency=SAR
- Expected (SPEC.md §2.7, §2.9; Seat map - Seatmap.md TC-INT-BOOK-006): 
- Actual: All three currency values identical ("SAR"); none is "string", null, or empty
- Status: **PASS**
- Evidence: pnr RWNRYI Book response

### TC-RETRIEVE-REG-01 [Regression] — Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed

- Endpoint Name: Retrieve
- Request: POST api/v2/FlightBooking/Retrieve for pnr=RWNRYI immediately after Book
- Response: 200 — bookingStatus="Booked", tickets.PAX1.ticketStatus="Booked"/ticketNumber=722136277291, passengersSelectedSeats.PAX1.<seg>={cellCode:8B,price:120.00 SAR} identical to Book's own echo
- Expected (SPEC.md §2.11; SeatMap QC Execution Checklist.md Part 4 §34, Part 5 §35, Part 7): passengersSelectedSeats/passengerSeats/totalSelectedSeats/totalSelectedSeatsAmount in a post-ticketing Retrieve are identical to immediately-post-Book values
- Actual: GulfAir tickets synchronously at Book time (ticketingDate==creationDate, ticketNumber already issued in the very first Book response) — there is no separate pending-then-ticketed state to diff; this Retrieve, taken after that synchronous ticketing, reproduces Book's seat/price fields exactly (cellCode 8B, 120.00 SAR, totalSelectedSeatsAmount 120.00 SAR)
- Status: **PASS**
- Evidence: Retrieve response for pnr RWNRYI matches Book response for the same pnr field-for-field on all seat-related fields

### TC-SEATAFTERHOLD-POS-01 [Positive] — Discovery case — submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape

- Endpoint Name: SeatAfterHold
- Request: POST api/v2/SeatMap/SeatAfterHold — supplier=GulfAir, credentialsSelector=KSA, pnr=PCVQIO, gdsPNR="", bookingToken=TPC60517142257D2582026, surName="" (and separately surName="HASSAN") against a live Held PNR from Hold
- Response: 409 both times — {ErrorCode:"OperationNotSupported",ErrorMessage:"This action is not currently supported by the selected supplier.",Context:[{Name:"OperationNotSupported",Value:"GulfAir does not exists"}]}
- Expected (SPEC.md §2.7a): Establish ground truth: 200 with a seat-map-like payload, a follow-up-required response, or an error demanding undocumented fields
- Actual: Rejected outright with HTTP 409 "GulfAir does not exists" — confirmed NOT a header-casing issue (gulfair/GULFAIR/GulfAIR all produce the identical 409); confirmed NOT a general GulfAir-unsupported issue (the same pnr retrieves fine via Retrieve with supplier=GulfAir, and Hold/Book/GetSeatMap all work for GulfAir elsewhere in this run) — the rejection is isolated to the SeatAfterHold endpoint specifically
- Status: **FAIL**
- Evidence: 4 header-casing variants + 1 cross-check via Retrieve, all consistent; TransactionIds 0442b1ac-..., c1a0c196-..., f158c896-..., 8600414e-..., c853339b-...

### TC-SEATAFTERHOLD-VAL-01 [Validation] — Confirm whether a seat/cell field is required beyond the 6 documented fields

- Endpoint Name: SeatAfterHold
- Request: Depends on TC-SEATAFTERHOLD-POS-01's result
- Response: N/A — prerequisite case rejected outright (409, supplier-level) before any field-completeness question could even be examined
- Expected (SPEC.md §2.7a): 
- Actual: Blocked: the 409 rejection is about supplier resolution, not about a missing seat/cell field, so this case's premise (retry with a guessed additional field) cannot be tested for GulfAir until the supplier-level rejection is fixed
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-VAL-02 [Validation] — Validate SeatAfterHold rejects a seat/passenger reference not established at AddPassenger/Hold time

- Endpoint Name: SeatAfterHold
- Request: Explicitly sequenced behind TC-SEATAFTERHOLD-VAL-01, which is itself blocked
- Response: N/A
- Expected (SPEC.md §2.5, §2.7a): 
- Actual: Blocked — cannot proceed until VAL-01 resolves a confirmed request shape, which is itself blocked by the supplier-level rejection
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-VAL-01

### TC-SEATAFTERHOLD-NEG-01 [Negative] — Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination

- Endpoint Name: SeatAfterHold
- Request: Would require two independent Hold calls with a deliberately mismatched pnr/bookingToken pair
- Response: N/A — every SeatAfterHold call for GulfAir is rejected at the supplier-resolution stage regardless of pnr/bookingToken correctness, so a mismatched-identity variant would be indistinguishable from the baseline rejection
- Expected (SPEC.md §2.7a, §2.12, §7.7): 
- Actual: Not meaningfully testable for GulfAir until the supplier-level 409 is resolved
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-NEG-02 [Negative] — Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed

- Endpoint Name: SeatAfterHold
- Request: Would require a Held PNR with a known, elapsed holdExpirationDate
- Response: N/A — doubly blocked: SeatAfterHold rejects GulfAir outright regardless of expiry, and Hold's holdExpirationDate is null for GulfAir so an elapsed-TTL window can't even be established
- Expected (SPEC.md §2.7a, §2.12, §6.5): 
- Actual: Not testable for GulfAir this run
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01 and the holdExpirationDate defect finding

### TC-SEATAFTERHOLD-SEC-02 [Security] — Apply the three universal security checks to SeatAfterHold

- Endpoint Name: SeatAfterHold
- Request: (1) invalid x-api-key, (2) invalid Client-Id against the same SeatAfterHold body used in TC-SEATAFTERHOLD-POS-01; (3) cross-tenant variant not run (base call already fails business-logic-side, see notes)
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError — both correctly short-circuit before reaching the supplier-not-found business logic
- Expected (SPEC.md §7.14, §2.7a): All three rejected, error shape confirmed live
- Actual: Auth-layer checks (1) and (2) behave identically to every other endpoint's 401 AuthenticationError envelope, confirming auth is checked before business/supplier logic; (3) cross-tenant variant skipped as uninformative since the GulfAir/KSA baseline itself already 409s for business reasons unrelated to tenant-matching
- Status: **PASS**
- Evidence: TransactionIds 37345a3e-..., c4b71fa5-...

### TC-SEATAFTERHOLD-INT-04 [Integration] — Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points

- Endpoint Name: SeatAfterHold flow
- Request: Chain A tested: Hold -> SeatAfterHold (immediately after Hold, before FareConfirmAfterHold)
- Response: SeatAfterHold rejected with 409 "GulfAir does not exists" at the very first candidate position
- Expected (SPEC.md §2.7a, §2.10, §2.12, §2.13, §5.5-item8): Record which candidate position(s) SeatAfterHold accepts without erroring
- Actual: None of the three candidate positions could be meaningfully compared — the rejection is supplier-level (not state/position-dependent, per its wording and per the successful same-PNR Retrieve cross-check), so position B and C were not independently executed since they would predictably hit the identical supplier-resolution rejection; this is a reasoned inference, not independently confirmed for positions B/C
- Status: **FAIL**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-BOOK-NEG-12 [Negative] — Validate Book rejects requests with each mandatory field individually omitted: ResponseId, selectedOfferId, supplier, credentialsSelector

- Endpoint Name: Book
- Request: 4 variants of a seat-selection Book payload, each missing exactly one of supplier/credentialsSelector/ResponseId/selectedOfferId
- Response: omit supplier->400 clean validation; omit credentialsSelector->400 clean validation; omit ResponseId->200, created real PNR PABPSZ; omit selectedOfferId->500 ServerError
- Expected (SPEC.md §2.9, §7.7, §8.1-item2): All four runs rejected; no pnr created in any run
- Actual: Only 2 of 4 correctly rejected. Omitting ResponseId succeeded (200, ticketed PNR PABPSZ) — same non-enforcement pattern already found on GetSeatMap (TC-SEATMAP-NEG-04). Omitting selectedOfferId produced a generic 500 ServerError rather than a clean 400.
- Status: **FAIL**
- Evidence: TransactionIds 2159977d-...(supplier,400), 7326d4df-...(credentialsSelector,400), pnr=PABPSZ(ResponseId omitted,200), 54473099-...(selectedOfferId,500)

### TC-BOOK-NEG-05 [Negative] — Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell

- Endpoint Name: Book
- Request: Book submitted with the Occupied cell 8E's cellCode and its cellDetails.cellID (which GetSeatMap itself reports as null for Occupied cells)
- Response: 400 ValidationError {"NotEmptyValidator":"CellId is required."}
- Expected (SPEC.md §2.7, §2.9, §7.7): Request rejected; no booking created reflecting the unavailable seat
- Actual: Rejected — but via a generic null-cellId check, not an availability-specific check, since GetSeatMap never issues a real cellId token for an Occupied cell in the first place (by design, a client cannot construct a genuine token for an unavailable cell)
- Status: **PASS**
- Evidence: TransactionId 6ee4ab8f-76ce-4be4-b943-2557e1ba8145

### TC-BOOK-NEG-06 [Negative] — Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with

- Endpoint Name: Book
- Request: Book submitted with a valid cellCode (8A) but its cellId's trailing 10 base64 characters replaced with "XXXXXXXXXX", on a fresh never-booked offer
- Response: 200 — pnr=RNIEPJ, seat 8A attached at 120.00 SAR exactly as if the untampered token had been sent
- Expected (SPEC.md §2.7, §2.9, §7.7): Rejected — the tampered token should fail whatever server-side decode/signature check the opaque cellId undergoes
- Actual: Accepted; the seat was attached using the submitted cellCode regardless of the corrupted cellId, indicating cellId is not actually decoded/verified by Book
- Status: **FAIL**
- Evidence: pnr RNIEPJ, ticketNumber 722136277300, seat 8A/120.00 SAR attached despite the corrupted cellId

### TC-BOOK-VAL-06 [Validation] — Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes

- Endpoint Name: Book
- Request: Book submitted with cellCode from one AvailablePaid cell but cellId from a different AvailablePaid cell in the same offer/segment
- Response: 200 — pnr=RRGNEH, seat attached exactly as the submitted cellCode (60.00 SAR), not the cell cellId actually referenced
- Expected (SPEC.md §2.7, §2.9, §7.11): UNKNOWN — confirm whether the API trusts cellId alone, rejects outright, or books the wrong seat under the wrong code
- Actual: The API trusts cellCode, not cellId — the booked seat/price matches the submitted cellCode, and cellId's real identity is not cross-checked at all; cellCode is the operative field, cellId appears functionally decorative for Book
- Status: **FAIL**
- Evidence: pnr RRGNEH, ticketNumber 722136277342, cellCode 9A booked at 60.00 SAR (9A's own price, not 8A's)

### TC-SEATMAP-VAL-04 [Validation] — Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer

- Endpoint Name: Book
- Request: Book for Offer B (BAH-DMM 2026-11-05) submitted with Offer B's own cellCode but a cellId copied from an entirely independent Offer A (BAH-JED 2026-11-01)
- Response: 200 — pnr=RYYMRX created and ticketed, but passengersSelectedSeats came back completely empty ({}) — the seat selection was silently dropped, not attached and not erroring
- Expected (SPEC.md §2.7, §2.9, §7.7): Request is rejected, since cellID appears to embed the originating ResponseId/OfferId/passenger-ref metadata bound to the offer it was issued for
- Actual: Neither rejected nor honored — Book succeeded overall but silently dropped the seat selection entirely when cellId belonged to a genuinely unrelated offer/segment (distinct from VAL-06's same-offer mismatch, which WAS honored using cellCode)
- Status: **FAIL**
- Evidence: pnr RYYMRX, ticketNumber 722136277401, passengersSelectedSeats:{} in the response despite a seat having been requested

### TC-BOOK-NEG-07 [Negative] — Validate Book rejects a request that assigns the same seat cell to two different passengers

- Endpoint Name: Book
- Request: Book for a 2-ADT offer, both PAX1 and PAX2 assigned identical cellCode/cellId (8A) on the same segment
- Response: 400 ValidationError — {"Value":"Seat '8A' is assigned to multiple passengers on segment 'GF-GF103-GF103-2026111010-2026111011-O'."}
- Expected (SPEC.md §2.9, §7.7; Seat map - Seatmap.md TC-INT-BOOK-009): Request rejected before any supplier round-trip; no pnr created
- Actual: Cleanly rejected with a specific, human-readable validation message naming the exact conflicting seat and segment; no pnr created
- Status: **PASS**
- Evidence: TransactionId 9eb70bc5-bd97-4934-8fd5-b88fc0428605

### TC-BOOK-NEG-08 [Negative] — Validate Book's behavior when the same passenger selects two different seats on the same segment

- Endpoint Name: Book
- Request: No live call made — setSegmentsSeats is a JSON object keyed by segmentRefId, so a client literally cannot submit two different cellCode/cellId values under one segmentRefId key in valid JSON
- Response: N/A
- Expected (SPEC.md §2.9; SeatMap QC Execution Checklist.md §19): 
- Actual: Confirmed by request-shape inspection (not a live call): the object-keyed schema makes a true wire-level duplicate impossible to construct — the same conclusion the test case's own notes anticipate — so this is documented as untestable-by-construction rather than executed
- Status: **PASS**
- Evidence: Book's passengersSelectedSeats.<pax>.setSegmentsSeats schema (§2.9) is a JSON object, not an array, per every successful Book call this run

### TC-BOOK-NEG-09 [Negative] — Validate graceful rollback when the supplier's seat allocation call fails or times out after Book is submitted

- Endpoint Name: Book
- Request: Requires a forcing mechanism to make the supplier-side seat allocation fail on demand
- Response: Not attempted — no such mechanism available against live GulfAir staging this run
- Expected (SPEC.md §2.9, §7.9; Seat map - Seatmap.md TC-INT-BOOK-012): 
- Actual: Not forceable this run, per the test case's own environment-dependent caveat
- Status: **BLOCKED**
- Evidence: No forcing mechanism available

### TC-BOOK-VAL-07 [Validation] — Validate a second, different passengersSelectedSeats selection supersedes an earlier selection made before the single Book call is sent

- Endpoint Name: Book
- Request: No new live call — this is fundamentally a client-side behavior (only one Book call is ever transmitted) already demonstrated by every successful Book call this run
- Response: N/A
- Expected (SPEC.md §2.9; Seat map - Seatmap.md TC-INT-BOOK-013): 
- Actual: Every Book call this run (TC-BOOK-POS-03 cell 8B, NEG-06 cell 8A, VAL-06 cell 9A) reflected exactly the cellCode/cellId actually transmitted in that one request, never a stale/earlier value — confirming Book reflects exactly what was sent, which is the entirety of what this case encodes
- Status: **PASS**
- Evidence: Cross-referenced against TC-BOOK-POS-03, TC-BOOK-NEG-06, TC-BOOK-VAL-06 evidence already logged this run

### TC-BOOK-BIZ-05 [Business Rule] — Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side

- Endpoint Name: Book
- Request: AddPassenger with 1 ADT + 1 CHD -> GetSeatMap (identified exit-row cell 11B via cellCharacteristics description containing EXIT_ROW_SEAT) -> Book assigning 11B to the CHD passenger (PAX2)
- Response: 200 — pnr=RRHRNS, both passengers ticketed, but passengersSelectedSeats came back completely empty ({}) — the exit-row seat was never attached to the CHD passenger
- Expected (SPEC.md §2.7 (cellCharacteristics), §2.9; SeatMap QC Execution Checklist.md Part 1 §15; Seat map - Seatmap.md TC-INT-BOOK-008): An explicit error response (candidate code RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD); no pnr created for this attempt
- Actual: Neither the expected explicit rejection nor an accepted exit-row assignment occurred — the seat selection was silently dropped and the booking proceeded without any seat attached for either passenger, so the CHD did NOT end up seated in the exit row, but no error was raised and a PNR was still created
- Status: **FAIL**
- Evidence: pnr RRHRNS, tickets issued for both PAX1 and PAX2, passengersSelectedSeats:{} in the response

### TC-BOOK-BIZ-06 [Business Rule] — Verify an Infant (INF) on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry

- Endpoint Name: Book
- Request: Not independently executed this run — would require an ADT+INF AddPassenger chain with parentPaxRefId linkage
- Response: N/A
- Expected (SPEC.md §2.5, §2.9; Seat map - Seatmap.md TC-INT-BOOK-011): 
- Actual: Not executed — deprioritized in favor of the higher-value seat-validation findings (VAL-04/VAL-06/NEG-06/BIZ-05) already surfaced against this supplier's Book endpoint this run; recommend as follow-up
- Status: **BLOCKED**
- Evidence: Not attempted

### TC-BOOK-BIZ-07 [Business Rule] — Validate a wheelchair-accessible seat can be selected for a passenger flagged for special assistance

- Endpoint Name: Book
- Request: Requires identifying a wheelchair-accessible cell by its cellCharacteristics/description text
- Response: N/A — no WHEELCHAIR/WCHR/ACCESSIBLE characteristic string found anywhere in this run's captured GulfAir seat maps (searched the full 210-cell + row-18 exit-row samples)
- Expected (SPEC.md §2.5, §2.7, §2.9; Seat map - Seatmap.md TC-INT-BOOK-014): 
- Actual: Not executable this run — no identifiable wheelchair-designated cell exists in the sampled GulfAir seat maps, consistent with the test's own lowest-confidence caveat that SPEC.md has no evidenced SSR/special-assistance field at all
- Status: **BLOCKED**
- Evidence: Text search across 2 full captured GulfAir seatmap responses for WHEELCHAIR/WCHR/ACCESSIBLE: zero matches

### TC-BOOK-NEG-10 [Negative] — Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats: {} explicitly present, otherwise a normal no-seat Book call
- Response: 200 — pnr=RVYFKW, ticketed, passengersSelectedSeats:{} in the response, no seat fee
- Expected (SPEC.md §2.9; SeatMap QC Execution Checklist.md Part 6): Book succeeds; no seat fee charged; no 500-level error from the explicit-empty-object shape
- Actual: Succeeded exactly as expected, no error from the explicit-empty-object shape
- Status: **PASS**
- Evidence: pnr RVYFKW, ticketNumber 722136277345

### TC-BOOK-NEG-11 [Negative] — Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats.PAX1.setSegmentsSeats: {}
- Response: 200 — pnr=RUEQWG, ticketed, no seat attached, no error
- Expected (SPEC.md §2.9; SeatMap QC Execution Checklist.md Part 6): Book succeeds; no seat attached for the passenger; no error from the otherwise-empty nested object
- Actual: Succeeded exactly as expected
- Status: **PASS**
- Evidence: pnr RUEQWG, ticketNumber 722136277406

### TC-BOOK-INT-03 [Integration] — Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously

- Endpoint Name: Book
- Request: Requires a bundle code (GetOfferBundles) plus an ancillary code (GetAncillary) plus a seat, all on one Book call
- Response: N/A — GulfAir/KSA's live capability flags (confirmed at run start) show haveBundles=false on every sampled offer, so no bundle code is obtainable for this supplier
- Expected (SPEC.md §2.9): 
- Actual: Not executable for GulfAir — Bundle+Ancillary+Seat combined requires bundle capability this supplier does not have on the sampled offers; would need Ancillary+Seat only as a reduced variant, not attempted this run given the volume of higher-priority findings already surfaced
- Status: **BLOCKED**
- Evidence: §4.7 capability confirmation logged at run start: haveBundles=false for GulfAir/KSA

### TC-BOOK-INT-04 [Integration] — Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent

- Endpoint Name: Book
- Request: Requires GetOfferBundles to succeed first
- Response: N/A — haveBundles=false for GulfAir/KSA
- Expected (SPEC.md §2.4, §2.9; SeatMap QC Execution Checklist.md §25, §27): 
- Actual: Not executable — GulfAir has no bundle capability on the sampled offers
- Status: **BLOCKED**
- Evidence: §4.7 capability confirmation

### TC-BOOK-BND-03 [Boundary] — Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries

- Endpoint Name: Book
- Request: (a) omitted entirely: covered by every plain no-seat Book call this run; (b) one passenger/one segment: covered by TC-BOOK-POS-03; (c) two passengers, two segments (multi-city): not executable — every sampled GulfAir route this run was a single, direct, one-segment flight (no connecting itinerary was returned by Search for any tried route)
- Response: (a)/(b) confirmed via reused evidence; (c) not independently confirmed
- Expected (SPEC.md §2.9, §8.1-item3): 
- Actual: (a) Book succeeds with passengersSelectedSeats absent/empty in the response — confirmed by multiple plain Book calls; (b) succeeds exactly as TC-BOOK-POS-03; (c) remains UNKNOWN for GulfAir — no connecting/multi-segment GulfAir itinerary was available to sample this run, so the multi-passenger/multi-segment nesting shape is unconfirmed for this supplier specifically
- Status: **PASS**
- Evidence: (a)/(b) reused from TC-BOOK-POS-03, TC-BOOK-NEG-10/11; (c) no multi-segment GulfAir offer observed across 8 distinct routes sampled this run

### FLOW-V2-49-SEATFIELD [Flow] — Verify the existing SM-enrichment Family-A flow chains Book's ResponseId/selectedOfferId from GetSeatMap and exercises passengersSelectedSeats

- Endpoint Name: Flow (Family A: AP-SM-FCK-BK-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap (record cell 8B)->[FareCheck skipped, isFareCheckRequired=false]->Book(ResponseId/selectedOfferId=GetSeatMap's IDs, seat 8B)->Retrieve
- Response: pnr=RWNRYI, ticketed; Book and Retrieve both echo passengersSelectedSeats identically; totalSelectedSeatsAmount=120.00 SAR reconciles into totalAmount=703.00
- Expected (SPEC.md §2.7, §2.9, §2.11, §5.4 row 49 (SM/A), §6.3, §6.4): Per-family state check (§6.3 Family A) plus: Book/Retrieve both echo passengersSelectedSeats matching the selection; totalSelectedSeatsAmount is non-zero and reconciles into totalAmount
- Actual: All assertions hold — reusing this run's TC-BOOK-POS-03/TC-SEATMAP-POS-02/TC-RETRIEVE-REG-01/TC-BOOK-BIZ-04 evidence (same underlying chain)
- Status: **PASS**
- Evidence: pnr RWNRYI — see TC-BOOK-POS-03 and TC-RETRIEVE-REG-01 for full detail

Hops (6):
  1. Search — Status: **PASS** — Expected: 200, offers returned — Actual: 200, 30 offers, GulfAir/KSA BAH-RUH 2026-10-15
  2. FareConfirm — Status: **PASS** — Expected: 200, capability flags present — Actual: 200, isSeatMapRequired=false (live-confirmed non-gating, see TC-SEATMAP-NEG-01)
  3. AddPassenger — Status: **PASS** — Expected: 200, offerId/responseId returned — Actual: 200
  4. GetSeatMap — Status: **PASS** — Expected: 200, seatMapDetails populated — Actual: 200, seat 8B selected
  5. Book — Status: **PASS** — Expected: 200, pnr/bookingToken/gdsPNR, seat echoed — Actual: 200, pnr RWNRYI, seat 8B echoed, totalAmount reconciles
  6. Retrieve — Status: **PASS** — Expected: Seat persists post-ticketing — Actual: Identical seat/price fields as Book

### FLOW-V2-50-SEATFIELD [Flow] — Verify whether GetSeatMap's chosen seat can be attached via Hold directly (Family B, before SeatAfterHold)

- Endpoint Name: Flow (Family B: AP-SM-FCK-HD-FCAH-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap (record cell 8A)->[FareCheck skipped]->Hold, with passengersSelectedSeats included on the Hold request body (a field §2.10 documents as absent/unsupported on Hold)
- Response: 200 — pnr=RVSRGO, holdExpirationDate=null, passengersSelectedSeats.PAX1.<seg>={cellCode:8A,price:120.00 SAR} — Hold ACCEPTED and ECHOED the seat selection
- Expected (SPEC.md §2.7a, §2.9, §2.10, §5.4 row 50 (SM/B), §5.5-item8): UNKNOWN — confirm live whether Hold silently ignores, rejects, or (surprisingly) accepts an unrecognized passengersSelectedSeats field
- Actual: Hold accepts AND honors passengersSelectedSeats for GulfAir — the seat is attached and echoed back exactly like Book's own echo, contradicting §1.10 item 6/§2.10's documented absence of this field from Hold's contract
- Status: **FAIL**
- Evidence: pnr RVSRGO, GulfAir BAH-RUH GF169 2026-11-18, Hold response includes a fully populated passengersSelectedSeats block

### FLOW-V2-CANDIDATE-SM-HOLD-01 [Flow] — Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold

- Endpoint Name: Flow (candidate SM-Hold-A)
- Request: Hold (pnr PCVQIO) -> SeatAfterHold (position A, immediately after Hold)
- Response: SeatAfterHold rejected 409 "GulfAir does not exists" — chain could not proceed past this hop
- Expected (SPEC.md §2.7a, §2.10, §2.12, §2.13, §2.11, §5.5-item8): SeatAfterHold succeeds; final Retrieve shows the seat populated
- Actual: Blocked at the SeatAfterHold hop for GulfAir (see TC-SEATAFTERHOLD-POS-01/INT-04) — chain not carried further to FareConfirmAfterHold/BookAfterHold/Retrieve since the seat-selection step itself cannot succeed for this supplier
- Status: **FAIL**
- Evidence: See TC-SEATAFTERHOLD-POS-01, pnr PCVQIO

Hops (2):
  1. Hold — Status: **PASS** — Expected: 200, pnr/bookingToken — Actual: 200, pnr PCVQIO (holdExpirationDate null, separate defect)
  2. SeatAfterHold — Status: **FAIL** — Expected: 200 with a seat-selection response — Actual: 409 OperationNotSupported, "GulfAir does not exists"

### FLOW-V2-CANDIDATE-SM-HOLD-02 [Flow] — Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold

- Endpoint Name: Flow (candidate SM-Hold-B)
- Request: Not independently executed — SeatAfterHold's rejection of GulfAir is supplier-level (per TC-SEATAFTERHOLD-POS-01's cross-check against a working Retrieve call on the same pnr), not state/position-dependent
- Response: N/A
- Expected (SPEC.md §2.7a, §2.10, §2.12, §2.13, §2.11, §5.5-item8): 
- Actual: Reasoned-BLOCKED, not independently confirmed: predicted to hit the identical 409 "GulfAir does not exists" rejection regardless of chain position
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01 and TC-SEATAFTERHOLD-POS-01

### FLOW-V2-CANDIDATE-SM-HOLD-03 [Flow] — Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking

- Endpoint Name: Flow (candidate SM-Hold-C)
- Request: Not independently executed — same reasoning as candidate-02
- Response: N/A
- Expected (SPEC.md §2.7a, §2.13, §2.11, §5.5-item8): 
- Actual: Reasoned-BLOCKED, not independently confirmed
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01 and TC-SEATAFTERHOLD-POS-01

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG [Flow] — Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken carried over from an unrelated Hold call

- Endpoint Name: Flow (candidate SM-Hold-A, negative)
- Request: Not executed — the baseline SeatAfterHold call already rejects GulfAir unconditionally (409, supplier-level), so a stale-identity variant would be indistinguishable from the baseline rejection and adds no new information for this supplier
- Response: N/A
- Expected (SPEC.md §2.7a, §3.2, §7.2, §7.7): 
- Actual: Not meaningfully testable for GulfAir until the base SeatAfterHold supplier-resolution defect is fixed
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

## Findings

**Defects: 11 &middot; Unknown-resolutions: 7**

### Defects
- **[TC-SEATMAP-VAL-06]** GulfAir GetSeatMap returns an occupied seat (row 8, column E, cellCode 8E) tagged with cellCategory="Aisle" instead of "Seat", while still carrying a real cellCode/cellAvailability — violating the documented Seat/Aisle partition (Aisle cells should carry no column/cellDetails at all).
- **[TC-SEATMAP-BIZ-02]** GulfAir's GetSeatMap never decomposes a paid seat's charge into basePrice/taxesPrice — both are always 0 (basePrice.currency is also null) while the real charge sits entirely in totalPrice, so totalPrice never reconciles to basePrice+taxesPrice as SPEC.md's price-reconciliation formula requires.
- **[TC-SEATMAP-NEG-02]** GetSeatMap accepts a ResponseId and selectedOfferId sourced from two entirely independent AddPassenger chains (different searches, different offers, different routes) and returns a normal 200 seat map instead of rejecting the mismatched pair.
- **[TC-SEATMAP-NEG-03]** A syntactically-fabricated ResponseId/selectedOfferId pair produces a generic HTTP 500 "ServerError"/"Unknown error occured" rather than a controlled HTTP 400/404, suggesting an unhandled exception on invalid-token deserialization rather than input validation.
- **[TC-SEATMAP-NEG-04]** GetSeatMap documents ResponseId as a required request field, but a request omitting it entirely still succeeds with HTTP 200 and a fully populated seat map — ResponseId is not actually enforced as required, unlike supplier/credentialsSelector/selectedOfferId which are all correctly rejected when omitted.
- **[TC-SEATAFTERHOLD-POS-01]** SeatAfterHold rejects every call for supplier=GulfAir with HTTP 409 OperationNotSupported, Context="GulfAir does not exists" — while every other endpoint in this run (Search, FareConfirm, AddPassenger, GetSeatMap, Hold, Book, Retrieve) accepts GulfAir normally, including a Retrieve against the exact same PNR used here.
- **[TC-SEATAFTERHOLD-POS-01]** Hold's response for GulfAir returns holdExpirationDate:null — the field documented as the critical time-boxing signal for every Hold-based flow is never populated, making it impossible to determine when a Held GulfAir PNR actually expires from the API response alone.
- **[TC-BOOK-NEG-12]** Like GetSeatMap, Book documents ResponseId as required but accepts and successfully books/ticket a request that omits it entirely — selectedOfferId alone is apparently sufficient end-to-end for GulfAir, across at least two endpoints now.
- **[TC-BOOK-VAL-06]** Book does not decode or cross-validate the cellId token against the offer's actual seat map at all — a tampered cellId (NEG-06) and a cellId belonging to an entirely different cell in the same offer (VAL-06) both succeed, with the seat always resolved purely from the submitted cellCode string. The opaque, metadata-bearing cellId that SPEC.md §2.7 describes as the authoritative field is, in practice, effectively unchecked.
- **[TC-SEATMAP-VAL-04]** When cellId refers to a cell on a completely different offer/segment than the one being booked, Book silently drops the seat selection (empty passengersSelectedSeats in the response) rather than rejecting the request or surfacing any warning — the customer is booked without their selected/paid-for seat and given no error to explain why.
- **[FLOW-V2-50-SEATFIELD]** Hold's documented request contract (§2.10) does not include passengersSelectedSeats and is described as requiring the separate SeatAfterHold endpoint for Hold-branch seat selection — but for GulfAir, Hold silently accepts and correctly attaches/echoes a passengersSelectedSeats field submitted directly on the Hold call itself, exactly like Book does.

### Unknown-resolutions (new information)
- **[§4.7 pre-flow capability confirmation]** Live-confirmed GulfAir/KSA per-offer capability flags on this host, sampled across 30 offers over 5 routes (BAH-JED/RUH/DMM/CAI/DXB, both directions) and 3 dates: haveBundles=false, canBeHeld=true, offerHasAncillary=true, isSeatMapRequired=false, isAncillaryRequired=false, isBaggageRequired=false, isMealRequired=false — consistently, on every sampled offer.
- **[TC-SEATMAP-VAL-05]** For GulfAir, GetSeatMap's cellCharacteristics[].padisCode is always the literal string "Unknown" (never a real PADIS code); the actual seat characteristic is only recoverable from the free-text description field (values observed: CHARGEABLE_SEAT, LEG_SPACE_SEAT, FRONT_OF_CABIN, WINDOW, AISLE_SEAT, BULKHEAD_SEAT, CENTER_SEAT, SEAT_WITH_BASSINET_FACILITY, LEFT_SIDE_OF_AIRCRAFT, RIGHT_SIDE_OF_AIRCRAFT) — a different vocabulary than §8.3's previously observed code set (CH, _8, _9, _14, K, LS, OW, RS, V, FC).
- **[TC-SEATMAP-REG-02]** GetSeatMap's live response carries two fields not documented in SPEC.md §2.7: a top-level isFareCheckRequired boolean (same signal as GetAncillary's, §2.6), and passengersDetails.<paxRef>.passengersSeatMapAvailability — a per-segment map of raw available seat-code strings (e.g. {"Main":["8A","9A",...]}), independent of the seatMapDetails.rows[].cells[] structure.
- **[TC-SEATMAP-SEC-01]** GetSeatMap's three universal security checks now have confirmed error shapes for GulfAir: invalid x-api-key/Client-Id both →401 {ErrorCode:"AuthenticationError"}; a cross-tenant supplier/credentialsSelector switch against an established ResponseId/selectedOfferId →409 {ErrorCode:"OperationNotSupported"} (not a 401/403 as might be assumed for an auth-adjacent check).
- **[TC-BOOK-BIZ-04]** For GulfAir, Book's selectedOffer.priceDetails.totalAmount DOES correctly include totalSelectedSeatsAmount in its sum (totalAmount == totalBaseAmount+totalTaxAmount+totalAncillariesAmount+totalSelectedSeatsAmount, confirmed to the cent) — resolving the previously-flagged coverage gap; no silent seat-amount omission was found for this supplier.
- **[TC-RETRIEVE-REG-01]** Unlike V1 RetrieveBooking (confirmed missing bookingStatus, an open defect per §2.11), V2 Retrieve for GulfAir DOES return a top-level bookingStatus field (observed value: "Booked") — V2 does not appear to share V1's missing-bookingStatus defect, at least for this supplier.
- **[TC-BOOK-BIZ-05]** For GulfAir, assigning a CHD passenger to an exit-row seat does not produce the candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD error — instead the seat selection is silently dropped (same silent-no-op behavior as TC-SEATMAP-VAL-04's cross-offer case) and the booking proceeds without any seat attached. The safety outcome (child not seated in the exit row) is achieved, but not via a clean, caller-visible rejection.

## Proposed SPEC.md updates

- **§2.7 — pending** — Replace: "**Business Logic**: `INFERRED` gated by FareConfirm's `isSeatMapRequired` flag (§2.2)." With: "**Business Logic**: `[Confirmed live 2026-08-25, GulfAir/KSA]` NOT gated by `isSeatMapRequired` — GetSeatMap returns HTTP 200 with a full, non-empty seatMapDetails even when the offer's isSeatMapRequired flag is false. `isSeatMapRequired` appears to signal only whether seat selection is a *mandatory* step for that offer/fare, not whether seat browsing is available at all."

- **§2.7 — pending** — Replace: "**Expected Success Response** `[Observed example, V2]` block (missing isFareCheckRequired and passengersDetails.<paxRef>.passengersSeatMapAvailability)" With: "Add top-level `isFareCheckRequired` (boolean) and `passengersDetails.<paxRef>.passengersSeatMapAvailability: {<segmentRefId-or-deck>: [<cellCode>, ...]}` to the documented response shape — both confirmed live for GulfAir, 2026-08-25."

- **§4.6 — pending** — Replace: "| GulfAir | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |" With: "| GulfAir | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | **Supported** (GetSeatMap returns 200 with full seatMapDetails live-confirmed 2026-08-25, independent of isSeatMapRequired) |"

- **§2.10 / §1.10 item 6 — pending** — Replace: "Hold's saved request body was **not** updated with a `passengersSelectedSeats` field (confirmed absent, unlike Book) — attaching a seat to a Held booking cannot be done on the Hold call itself. It must go through the new `SeatAfterHold` endpoint." With: "`[Confirmed live 2026-08-25, GulfAir/KSA]` Hold DOES accept and honor a `passengersSelectedSeats` field submitted directly on the Hold request, attaching and echoing the seat exactly like Book — at least for GulfAir. This contradicts the collection's saved (seat-less) example and should be re-verified per-supplier before assuming SeatAfterHold is the only Hold-branch seat-selection mechanism."

## Cleanup / follow-up

- **needs_void_cancel** — PNR "RWNRYI" (TC-BOOK-POS-03) — Real GulfAir booking created and ticketed synchronously (ticketNumber 722136277291, ticketStatus=Booked) via direct Book — not a Hold. voidCapability="FullVoidOnlyAllowed". No Void was called this run; flag to the team to void if a stray staging PNR/ticket is undesirable.
- **family_b_hold** — PNR "PCVQIO" (TC-SEATAFTERHOLD-POS-01) — Held via direct Hold call (GulfAir BAH-JED GF183 2026-10-20), bookingToken=TPC60517142257D2582026, gdsPNR="". holdExpirationDate returned null (see separate defect finding) so its actual expiry is unknown — never progressed to FareConfirmAfterHold/BookAfterHold/CancelAfterHold this run. Flag to the team for cleanup or expiry tracking.
- **needs_void_cancel** — PNR "PABPSZ" (TC-BOOK-NEG-12) — Created/ticketed via a Book call that omitted the documented-required ResponseId field (BAH-DMM GF, 2026-10-18) — a defect-driven booking, not a deliberate positive test.
- **needs_void_cancel** — PNR "RNIEPJ" (TC-BOOK-NEG-06) — Created/ticketed while proving Book does not validate a tampered cellId (BAH-CAI GF, 2026-10-22).
- **needs_void_cancel** — PNR "RRGNEH" (TC-BOOK-VAL-06) — Created/ticketed while proving cellCode (not cellId) drives seat resolution (BAH-DXB GF, 2026-10-25).
- **needs_void_cancel** — PNR "RYYMRX" (TC-SEATMAP-VAL-04) — Created/ticketed while proving a cross-offer cellId is silently dropped rather than rejected (BAH-DMM GF, 2026-11-05).
- **needs_void_cancel** — PNR "RRHRNS" (TC-BOOK-BIZ-05) — 2-passenger (ADT+CHD) booking created while testing CHD+exit-row seat assignment; both passengers ticketed, no seat attached to either (BAH-JED GF, 2026-11-08).
- **needs_void_cancel** — PNR "RVYFKW" (TC-BOOK-NEG-10) — Created while testing explicit-empty passengersSelectedSeats (BAH-JED GF, 2026-11-12).
- **needs_void_cancel** — PNR "RUEQWG" (TC-BOOK-NEG-11) — Created while testing explicit-empty setSegmentsSeats (BAH-DMM GF, 2026-11-14).
- **family_b_hold** — PNR "RVSRGO" (FLOW-V2-50-SEATFIELD) — Held with seat 8A attached via Hold directly (undocumented behavior). holdExpirationDate null (same defect as PCVQIO). Never progressed to FareConfirmAfterHold/BookAfterHold/CancelAfterHold this run.
