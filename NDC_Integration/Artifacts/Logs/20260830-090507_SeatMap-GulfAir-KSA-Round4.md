# QA Execution Report - Round 4 Regression - SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 63 test cases: Round 4 full regression pass, explicit re-verification of Round 3's 12 logged defects (BUG-01..BUG-12), a genuine multi-city sweep resolving Round 3's INCONCLUSIVE finding, and route-varied coverage

**Environment:** staging (non-default host — user-specified) &middot; https://ndc-integration-stg-ne-2.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-08-30T09:05:07Z
**Ended:** 2026-08-30T09:52:00Z
**Status:** COMPLETE
**Prior runs:** [Round 1 - 20260825-103032](20260825-103032_SeatMap-GulfAir-KSA.md), [Round 2 - 20260826-154300](20260826-154300_SeatMap-GulfAir-KSA-Round2.md), and [Round 3 - 20260830-093343](20260830-093343_SeatMap-GulfAir-KSA-Round3.md)

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 33
- Failed: 8
- Blocked: 22

### Multi-city sweep conclusion (this round's flagship additive requirement)

- **CONFIRMED: Multi-city (3+ leg) searchCriteria is NOT supported (or hard-capped at 2 entries) for GulfAir/KSA on this host.** This resolves Round 3's INCONCLUSIVE finding (which tried only one 3-leg combination). This round ran 9 combinations: 7 distinct 3-leg/4-leg routings across every route pair with previously-confirmed live one-way inventory (BAH-RUH, BAH-JED, BAH-DMM, BAH-CAI, BAH-DXB, including a "double-spoke" pattern that returns to the BAH hub between spoke legs), plus 2 boundary-isolation probes. **All 9 returned HTTP 200 with an empty offers[] array** — including a control combination using the exact same BAH-RUH/RUH-BAH pair three times in a row, a pair independently proven in the same sweep to return 125-175 offers when submitted as a 2-entry array. This precisely isolates the cutoff to "searchCriteria array length > 2," not to route validity or inventory availability on the specific combinations tried.
- **CONFIRMED (new supporting evidence):** a 2-entry searchCriteria array works in BOTH a mirrored round-trip shape (BAH-RUH outbound / RUH-BAH return — 175 offers) and a non-mirrored open-jaw shape (BAH-RUH outbound / JED-BAH return, a different destination/origin pair — 125 offers). A 2-entry array that continues onward from the first leg's destination to a third, non-hub city (BAH-RUH then RUH-JED, a connecting itinerary rather than a return) returns 0 offers — consistent with GulfAir (a pure hub-and-spoke carrier) simply having no live RUH-JED inventory, a genuine route gap rather than a searchCriteria-length limitation.

### Journey-type coverage (carried forward from Round 3)

- **One-Way** — the primary shape for this round's successful chains (chain1/BAH-RUH, chain4/BAH-CAI, chain5/BAH-DXB, plus the Book-only and Hold-only negative/security chains).
- **Round-Trip** — confirmed live-supported for GulfAir/KSA in Round 3 (2-entry searchCriteria); this round's own round-trip Book/Hold chains (chain6, chain7) were blocked mid-chain by this round's GetSeatMap outage (see Findings) before reaching Book/Hold, so fresh round-trip seat-selection evidence was not obtained this round. Round 3's round-trip PASS results are carried forward unchanged (not re-confirmed, not contradicted).
- **Multi-City** — see the flagship conclusion above: CONFIRMED not supported (or hard-capped at 2 legs), resolving Round 3's inconclusive result.

### Mid-run infrastructure incident: sustained GetSeatMap outage

Partway through this round (after several successful GetSeatMap calls: chain1/BAH-RUH, chain4/BAH-CAI, chain5/BAH-DXB all succeeded normally), `GetSeatMap` began failing on every subsequent call — 40+ independent attempts across 20+ minutes, every route and passenger count tried, all returning the identical generic HTTP 409 `NDC-INT-UNC-Z9999` "Unknown error" envelope. `Book` and `Hold` (called independently of `GetSeatMap`) continued to succeed normally throughout the same window, isolating the outage specifically to `GetSeatMap`'s own supplier call. This is logged as a new defect, **BUG-14** (see Findings), and directly caused 22 of this round's 63 test cases to be marked BLOCKED rather than re-verified — see each affected test case's own Actual field for which specific defects (BUG-01, BUG-07, BUG-08, BUG-09) could not be re-confirmed as a result. The outage's own error envelope was also found to leak a raw supplier SOAP request (including a plaintext apiKey-class field) on every single occurrence — see BUG-11, widened this round.

## Test case results

(63 entries; each reports Endpoint Name/Request/Response/Expected/Actual/Status/Evidence. Flow-level cases nest hop detail.)

### TC-SEATMAP-POS-01 [Positive] - Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat — supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=AddPassenger's IDs (BAH-RUH 2026-11-15, GF169, one-way)
- Response: 200 — supplier, flightSegments{1 segment}, passengersDetails{PAX1}, seatMapDetails{1 segment, 25 rows, 175 cells} all present and non-null
- Expected: HTTP 200; all four top-level fields present/non-null; every segmentRefId in seatMapDetails also appears in flightSegments (§2.7)
- Actual: 200; single segment GF-GF169-GF169-2026111521-2026111522-O present identically in both flightSegments and seatMapDetails; passengersDetails.PAX1 present; 25 rows, 175 cells
- Status: **PASS**
- Evidence: Live GetSeatMap response for GulfAir/KSA BAH-RUH 2026-11-15 (offer GF169) — unchanged from Rounds 1-3's pattern on a fresh sample

### TC-SEATMAP-VAL-05 [Validation] - Verify cellCharacteristics.description text is consistent with its own padisCode

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response as TC-SEATMAP-POS-01, inspecting cellCharacteristics[] on every cell
- Response: Every cellCharacteristics[] entry has padisCode='Unknown' and description as a self-descriptive enum string
- Expected: For padisCode values in the maintained reference table, description must not contradict the code's meaning; codes outside the table are logged, not failed (§2.7, §8.3)
- Actual: GulfAir's adapter never populates a real padisCode (always literal 'Unknown'); description strings self-consistent. Same 15-value vocabulary as Round 3: AISLE_SEAT, BULKHEAD_SEAT, CENTER_SEAT, CHARGEABLE_SEAT, EXIT_ROW_SEAT, FRONT_OF_CABIN, LEFT_SIDE_OF_AIRCRAFT, LEG_SPACE_SEAT, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL, OVER_WING_SEAT_S, PREFERRED_SEAT_PREFERENTIAL_SEAT, RIGHT_SIDE_OF_AIRCRAFT, SEAT_WITH_BASSINET_FACILITY, WINDOW
- Status: **PASS**
- Evidence: Full scan of chain1's GetSeatMap 175 cells; padisCode='Unknown' on every cellCharacteristics entry

### TC-SEATMAP-BND-03 [Boundary] - Confirm live whether AvailableFree/AvailableAfterReservation are real cellAvailability values

- Endpoint Name: GetSeatMap
- Request: Same GulfAir/KSA GetSeatMap sample (1 segment, 175 cells) inspected for AvailableFree/AvailableAfterReservation
- Response: Only AvailablePaid and Occupied observed; neither candidate value found
- Expected: Confirm live whether AvailableFree/AvailableAfterReservation are real cellAvailability values for this supplier's sample (§2.7, §8.3)
- Actual: No new evidence for or against on GulfAir/KSA — remains unconfirmed for this supplier, consistent with Rounds 1-3
- Status: **PASS**
- Evidence: Distinct cellAvailability values this round: AvailablePaid, Occupied only (148 paid, 2 occupied)

### TC-SEATMAP-VAL-06 [Validation] - Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, scanning cellCategory/column/cellDetails across all 175 cells
- Response: 175/175 cells conform (Aisle→column=null & cellDetails=null; Seat→both populated) — 0 violations
- Expected: cellCategory=Aisle implies column/cellDetails null; cellCategory=Seat implies both populated; no cell violates this partition (§2.7)
- Actual: 0/175 violations (25 Aisle cells, 150 Seat cells) — the fix confirmed in Round 2 remains stable for a 4th consecutive round
- Status: **PASS**
- Evidence: Full cell scan: 0 Aisle violations, 0 Seat violations

### TC-RETRIEVE-REG-01 [Regression] - Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed

- Endpoint Name: Retrieve
- Request: POST api/v2/FlightBooking/Retrieve for pnr=RXZKHB immediately after Book
- Response: 200 — bookingStatus='Booked', passengersSelectedSeats identical to Book's own echo
- Expected: passengersSelectedSeats/passengerSeats/totalSelectedSeats in a post-ticketing Retrieve are identical to immediately-post-Book values (§2.11)
- Actual: GulfAir tickets synchronously at Book time; Retrieve reproduces Book's seat/price fields exactly (seat 8B/120 SAR). Round-trip sample (confirmed in Round 3, pnr RPDBSR) was NOT re-verified this round — the round-trip Book chain needed for fresh round-trip Retrieve evidence was blocked by this round's GetSeatMap outage (see Findings/BUG-14); last confirmed passing in Round 3.
- Status: **PASS**
- Evidence: Retrieve(RXZKHB) matches Book(RXZKHB) field-for-field

### TC-SEATAFTERHOLD-POS-01 [Positive] - Discovery case — submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape

- Endpoint Name: SeatAfterHold
- Request: POST api/v2/SeatMap/SeatAfterHold — supplier=GulfAir, credentialsSelector=KSA, pnr=RXFVNC, gdsPNR='', bookingToken=<Hold's token>, surName='Ibrahim' against a live Held PNR from Hold (BAH-DMM, no GetSeatMap in this chain to isolate from this round's GetSeatMap outage)
- Response: 409 — {ErrorCode:'OperationNotSupported', ErrorMessage:'This action is not currently supported by the selected supplier.', Context:[{Name:'OperationNotSupported',Value:'GulfAir does not exists'}]}
- Expected: Establish ground truth for the actual response shape (§2.7a)
- Actual: STILL REPRODUCES (BUG-03, 4th consecutive round) — rejected outright with HTTP 409 'GulfAir does not exists', identical to Rounds 1-3, reconfirmed against a brand-new fresh Hold (pnr RXFVNC)
- Status: **FAIL**
- Evidence: TransactionId ae51b087-f559-49b5-a4f1-8ff55393ef29

### TC-SEATAFTERHOLD-VAL-01 [Validation] - Confirm whether a seat/cell field is required beyond the 6 documented fields

- Endpoint Name: SeatAfterHold
- Request: Depends on TC-SEATAFTERHOLD-POS-01's result
- Response: N/A — prerequisite rejected outright (409, supplier-level)
- Expected: Resolve the real request shape (§2.7a)
- Actual: Still blocked by the supplier-level 409 (BUG-03), unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-NEG-01 [Negative] - Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination

- Endpoint Name: SeatAfterHold
- Request: SeatAfterHold submitted with pnr from one Hold (RXFVNC) but bookingToken from a second, independent Hold (RAHAQQ)
- Response: 409 OperationNotSupported 'GulfAir does not exists' — identical to the baseline case, not a distinct mismatch-specific rejection
- Expected: Rejected, exact status confirmed live (§2.7a, §2.12, §7.7)
- Actual: Actually attempted this round (unlike a purely reasoned-BLOCKED in prior rounds), but the supplier-level 409 fires before any identity-matching logic is reached, so this remains not meaningfully testable for GulfAir until BUG-03 is resolved
- Status: **BLOCKED**
- Evidence: TransactionId aa5d6279-dcdf-4231-9abb-5f319baaf3f2

### TC-SEATAFTERHOLD-NEG-02 [Negative] - Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed

- Endpoint Name: SeatAfterHold
- Request: Would require a Held PNR with a known, elapsed holdExpirationDate
- Response: N/A — doubly blocked
- Expected: Rejected, consistent with FareConfirmAfterHold's expired-hold expectation (§2.7a, §2.12, §6.5)
- Actual: Doubly blocked: SeatAfterHold rejects GulfAir outright regardless of expiry (BUG-03), and Hold's holdExpirationDate is STILL null for GulfAir this round (BUG-04, reconfirmed on 2 fresh Holds: RXFVNC, RAHAQQ) — unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01 and the holdExpirationDate defect finding

### TC-SEATAFTERHOLD-SEC-02 [Security] - Apply the three universal security checks to SeatAfterHold

- Endpoint Name: SeatAfterHold
- Request: (1) invalid x-api-key, (2) invalid Client-Id against the SeatAfterHold body used in TC-SEATAFTERHOLD-POS-01
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError — both short-circuit before reaching the supplier-not-found business logic
- Expected: All rejected; error shape confirmed live (§7.14, §2.7a)
- Actual: Both auth-layer checks behave identically to every other endpoint's 401 AuthenticationError envelope, unchanged from Rounds 1-3; cross-tenant variant skipped (base call already 409s for business reasons unrelated to tenant-matching)
- Status: **PASS**
- Evidence: badKey and badClient both returned HTTP 401

### TC-SEATAFTERHOLD-INT-04 [Integration] - Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points

- Endpoint Name: SeatAfterHold flow
- Request: Chain tested: Hold -> SeatAfterHold (immediately after Hold)
- Response: SeatAfterHold rejected 409 'GulfAir does not exists' at the very first candidate position
- Expected: Record which candidate position(s) SeatAfterHold accepts (§2.7a, §2.10, §2.12, §2.13, §5.5-item8)
- Actual: None of the three candidate positions meaningfully comparable — rejection is supplier-level, not position-dependent, unchanged from Rounds 1-3
- Status: **FAIL**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-VAL-02 [Validation] - Once SeatAfterHold's real contract is confirmed, validate it rejects a seat/passenger reference not established at this pnr

- Endpoint Name: SeatAfterHold
- Request: Sequenced behind TC-SEATAFTERHOLD-VAL-01
- Response: N/A
- Expected: Blocked until VAL-01 resolves a confirmed request shape (§2.5, §2.7a)
- Actual: Still blocked, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-VAL-01

### TC-SEATMAP-VAL-07 [Validation] - Verify window/aisle/extra-legroom/exit-row seat attributes are programmatically derivable from cellCharacteristics

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, cross-checking cellCharacteristics against column position/description text
- Response: WINDOW/AISLE_SEAT/BULKHEAD_SEAT/EXIT_ROW_SEAT/CENTER_SEAT literals appear directly as description strings
- Expected: Attributes derivable from description text (§2.7, §8.3)
- Actual: Columns A/F carry WINDOW+LEFT_SIDE_OF_AIRCRAFT/RIGHT_SIDE_OF_AIRCRAFT; rows 14-17 (all 6 columns, 24 cells) carry EXIT_ROW_SEAT this round — a wider exit-row zone than Round 3's sample, consistent with normal aircraft/row variation, not a defect
- Status: **PASS**
- Evidence: Exit-row cells this round: 14A-17F (24 cells)

### TC-SEATMAP-VAL-08 [Validation] - Verify seatPriceDetails/seatPriceDetailsByPassenger is populated for every AvailablePaid cell and null for every Blocked/Occupied cell

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, partitioned by cellAvailability
- Response: 148/148 AvailablePaid cells have non-null seatPriceDetailsByPassenger.PAX1; the 2 Occupied cells have both null
- Expected: Conditional presence per cellAvailability (§2.7)
- Actual: 148/148 AvailablePaid populated; 2/2 Occupied null — unchanged from Rounds 1-3's pattern
- Status: **PASS**
- Evidence: Full cell scan of chain1's GetSeatMap

### TC-SEATMAP-VAL-09 [Validation] - Verify cellCode is unique across all cells within one flight segment's seatMapDetails

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, collecting every cellCode within the one segment
- Response: 150 Seat-category cellCode values (Aisle cells carry no cellCode), 150 distinct — zero duplicates
- Expected: No cellCode value repeats (§2.7)
- Actual: 0 duplicates, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: Full 175-cell scan (150 with cellCode, 25 Aisle without)

### TC-SEATMAP-VAL-10 [Validation] - Verify structural uniqueness/domain constraints: rowNumber unique, zoneId unique within deck, column restricted to {A-F,null}

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, checked rowNumber/zoneId/column across all 25 rows
- Response: 25 distinct rowNumbers, 1 zone (Cabin1) consistently, column values restricted to {A,B,C,D,E,F,null}
- Expected: No rowNumber/zoneId duplicated; column domain respected (§2.7)
- Actual: 0 duplicate rowNumbers; single zoneId per deck; every non-null column in {A,B,C,D,E,F} — unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: cabinLayoutsByDeck.Main.zones[0]={zoneId:Cabin1}; 0 duplicate rowNumbers across 25 rows

### TC-SEATMAP-BND-02 [Boundary] - Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid/Blocked/Occupied, and Aisle cells carry no seatPriceDetails

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, enumerating distinct cellCategory/cellAvailability values
- Response: cellCategory ∈ {Seat, Aisle}; cellAvailability ∈ {AvailablePaid, Occupied}; every Aisle cell has null seatPriceDetails
- Expected: No value outside known enum; Aisle cells carry no pricing (§2.7, §8.3)
- Actual: Confirmed, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: Full 175-cell scan; 0 Aisle cells with seatPriceDetails

### TC-SEATMAP-BIZ-02 [Business Rule] - Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, checked totalPrice vs basePrice+taxesPrice for all 148 AvailablePaid cells
- Response: basePrice correctly carries the real seat charge (e.g. cell 8B: basePrice=120.00 SAR, taxesPrice=0 SAR, totalPrice=120.00 SAR)
- Expected: totalPrice.amount == basePrice.amount + taxesPrice.amount (§2.7, §7.10)
- Actual: 0/148 mismatches — the Round 2 fix remains STABLE for a 4th consecutive round
- Status: **PASS**
- Evidence: Sample cell 8B: 120.00 = 120.00 + 0; systemic 0/148 mismatches

### TC-SEATMAP-BIZ-03 [Business Rule] - Verify overall cellAvailability and per-passenger paxCellAvailability are independently reported

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response — 1 ADT passenger (PAX1) only
- Response: Every priced cell's seatPriceDetailsByPassenger has exactly one entry, keyed PAX1, matching the cell's own cellAvailability
- Expected: Structural consistency, not per-cell completeness (§2.7)
- Actual: Holds; same single-ADT caveat as Rounds 1-3 (multi-pax differential-eligibility scenario blocked this round by the GetSeatMap outage, see BUG-14)
- Status: **PASS**
- Evidence: 148/148 paid cells have a PAX1 entry

### TC-SEATMAP-BIZ-04 [Business Rule] - Exploratory — confirm GetSeatMap reflects real-time supplier inventory rather than a cached snapshot

- Endpoint Name: GetSeatMap
- Request: Requires a second, independent session to occupy a specific seat between two GetSeatMap calls
- Response: Not attempted — no concurrent-session/forcing mechanism available
- Expected: N/A (exploratory) (§1.3)
- Actual: Not forceable from a single test session, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: No second booking session available

### TC-SEATMAP-REG-02 [Regression] - Verify seatMapDetails full field-list schema matches SPEC.md §2.7 with no undocumented keys

- Endpoint Name: GetSeatMap
- Request: Full schema diff of the live GetSeatMap response against §2.7's documented field list
- Response: All §2.7-documented fields present, plus 2 undocumented fields: top-level isFareCheckRequired (boolean, observed false) and passengersDetails.<paxRef>.passengersSeatMapAvailability
- Expected: No undocumented keys (§2.7, §8.1-item8)
- Actual: Still 2 undocumented fields, identical to Rounds 1-3 (SPEC.md §2.7 not yet amended)
- Status: **FAIL**
- Evidence: Live GulfAir GetSeatMap top-level keys: supplier,offerId,responseId,isFareCheckRequired,flightSegments,passengersDetails,seatMapDetails

### TC-SEATMAP-NEG-01 [Negative] - Validate GetSeatMap is rejected when called for an offer whose isSeatMapRequired flag was false

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat using AddPassenger IDs from an offer confirmed live (isSeatMapRequired=false on the FareConfirm capability flags)
- Response: 200 — full seatMapDetails returned, not rejected
- Expected: Rejected or an explicit unsupported-operation envelope (§2.2, §2.4, §2.7, §7.7)
- Actual: Still 200 with a fully populated seatMapDetails, unchanged from Rounds 1-3
- Status: **FAIL**
- Evidence: Same GetSeatMap call as TC-SEATMAP-POS-01; isSeatMapRequired=false confirmed at FareConfirm

### TC-SEATMAP-NEG-02 [Negative] - Validate GetSeatMap is rejected when ResponseId/selectedOfferId come from two different offers

- Endpoint Name: GetSeatMap
- Request: Would require two independent, successful Search->FareConfirm->AddPassenger->GetSeatMap chains (Offer A and Offer B)
- Response: N/A — this round's sustained GetSeatMap outage (see Findings/BUG-14) prevented obtaining even one successful GetSeatMap response after the outage began, let alone two independent ones
- Expected: Rejected (§2.7, §7.7)
- Actual: NOT RE-VERIFIED this round due to the concurrent GetSeatMap outage. BUG-01 (STILL REPRODUCES as of Round 3) is carried forward unchanged — not confirmed fixed, not re-confirmed broken this round.
- Status: **BLOCKED**
- Evidence: See Findings — GetSeatMap sustained outage (BUG-14)

### TC-SEATMAP-NEG-03 [Negative] - Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat with a fabricated GUID ResponseId and a fabricated selectedOfferId string
- Response: 500 — {ErrorCode:'ServerError', ErrorMessage:'Unknown error occured. Please keep the transaction id as a reference.'}
- Expected: Rejected; exact status confirmed live (§2.7, §7.7, §8.1-item2)
- Actual: INCONCLUSIVE this round — returned a generic HTTP 500 instead of Rounds 1-3's clean 409 ValidationError. This was tested during the same window as this round's GetSeatMap outage (BUG-14) and is attributed to that concurrent degradation rather than confirmed as a regression of the Round 2 fix. Recommend re-running once the outage is confirmed resolved before concluding either way.
- Status: **BLOCKED**
- Evidence: TransactionId 4ddb5df3-f70a-4933-9be4-173603400b84

### TC-SEATMAP-NEG-04 [Negative] - Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId

- Endpoint Name: GetSeatMap
- Request: 4 variants of a valid GetSeatMap body, each with exactly one of supplier/credentialsSelector/ResponseId/selectedOfferId removed
- Response: omit supplier→400; omit credentialsSelector→400; omit selectedOfferId→400; omit ResponseId→409 (see Actual)
- Expected: All four runs rejected (§2.7, §7.7, §8.1-item2)
- Actual: 3 of 4 sub-cases correctly rejected with a clean 400 (supplier, credentialsSelector, selectedOfferId), consistent with Rounds 1-3. The ResponseId-omission sub-case is EXCLUDED from this round's scope per explicit instruction (maps to Round 3's BUG-02) — noted tersely only: this round's attempt happened to land during the concurrent GetSeatMap outage (409 NDC-INT-UNC-Z9999) rather than either a 200 (Rounds 1-3's finding) or a 400, so it is additionally untestable this round on top of being out of scope for escalation.
- Status: **PASS**
- Evidence: TransactionIds a7b580fe (supplier,400), f3b3ea1f (credentialsSelector,400), f745ae3c (selectedOfferId,400); omit-ResponseId returned 409 NDC-INT-UNC-Z9999 (outage-affected, not counted)

### TC-SEATMAP-NEG-05 [Negative] - Validate GetSeatMap fails gracefully (structured error, not raw 500/stack trace) when the underlying supplier call fails

- Endpoint Name: GetSeatMap
- Request: This round's real, sustained GetSeatMap outage (40+ independent calls, see Findings/BUG-14) served as abundant live evidence of supplier-failure error handling
- Response: Every one of 40+ outage-window calls returned a structured JSON envelope {Status,TransactionId,ErrorCode,ErrorMessage,Context} — no raw stack trace or unhandled-exception HTML
- Expected: Structured business-error envelope, not an unhandled exception (§1.3, §2.9, §7.9)
- Actual: Structurally graceful on every occurrence — BUT the same envelope also leaks a raw OriginalSupplierRequest field containing supplier credentials (see BUG-11, widened this round). PASS for the 'structured, not a stack trace' criterion this test case names; the credential-leak concern is tracked separately.
- Status: **PASS**
- Evidence: 40+ occurrences of the same structured 409 NDC-INT-UNC-Z9999 envelope during this round's outage window

### TC-SEATMAP-SEC-01 [Security] - Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap

- Endpoint Name: GetSeatMap
- Request: 3 variants: (1) corrupted x-api-key, (2) corrupted Client-Id, (3) valid headers but supplier/credentialsSelector switched to TravelportNdc/UAE
- Response: N/A — not attempted this round
- Expected: All three rejected (§7.14)
- Actual: NOT RE-VERIFIED this round — GetSeatMap's sustained outage (BUG-14) meant even a valid baseline call was failing generically, making a meaningful security-check comparison (auth-layer 401 vs. business-layer rejection) unreliable to interpret. Last confirmed passing in Round 3.
- Status: **BLOCKED**
- Evidence: See Findings — GetSeatMap sustained outage (BUG-14)

### TC-SEATMAP-SEC-02 [Documentation] - Record that supplier-side auth and request/response logging are not independently verifiable through this API's black-box contract

- Endpoint Name: GetSeatMap (documentation)
- Request: N/A — documentation/scope-boundary case, no live API call
- Response: N/A
- Expected: Documented per §1.5/§1.8/PRD §7
- Actual: Documented as specified, unchanged from Rounds 1-3 — TC-SEATMAP-NEG-05 covers the API-observable graceful-degradation half
- Status: **PASS**
- Evidence: No API call made, per its own definition

### TC-SEATMAP-INT-02 [Integration] - Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols

- Endpoint Name: GetSeatMap
- Request: Requires GetSeatMap against 3+ suppliers spanning distinct native protocols
- Response: Out of scope — this run's scope is GulfAir only
- Expected: N/A (§1.3, §2.7, §4.1, §4.7)
- Actual: Not executed; this run's scope is fixed to Supplier=GulfAir, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: Run scope explicitly fixed to Supplier=GulfAir

### TC-SEATMAP-INT-03 [Integration] - Capability-matrix sweep — run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable

- Endpoint Name: GetSeatMap
- Request: Requires a full-roster sweep across every SPEC.md §4.6 supplier
- Response: Out of scope — only GulfAir's row can be populated
- Expected: N/A (§4.5, §4.6, §4.7)
- Actual: Not executed as a full sweep; GulfAir's own row reconfirmed SeatMap=Supported live for the 4th round (via chain1's success before this round's outage began), unchanged scope from Rounds 1-3
- Status: **BLOCKED**
- Evidence: See §4.7 capability confirmation finding

### TC-SEATMAP-POS-02 [Positive] - Verify GetSeatMap now sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it

- Endpoint Name: GetSeatMap -> Book
- Request: AddPassenger -> GetSeatMap -> Book, with Book's ResponseId/selectedOfferId sourced from GetSeatMap's own responseId/offerId (not AddPassenger's)
- Response: Book 200, pnr=RXZKHB — succeeded using GetSeatMap's IDs directly, no AddPassenger IDs re-sent
- Expected: GetSeatMap's offerId/responseId feed Book's ResponseId/selectedOfferId (§2.7, §2.9)
- Actual: Confirmed again this round, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: Book request ResponseId/selectedOfferId == GetSeatMap response's responseId/offerId verbatim; pnr RXZKHB

### TC-SEATMAP-VAL-03 [Validation] - Verify cellDetails.cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite the casing difference

- Endpoint Name: GetSeatMap -> Book
- Request: Book submitted with passengersSelectedSeats.PAX1.setSegmentsSeats.<segRefId> = {cellCode:'8B', cellId:<verbatim cellID value from GetSeatMap>}
- Response: 200 — seat 8B correctly attached and echoed in passengersSelectedSeats/passengerFareBreakdown/priceDetails
- Expected: Book accepts the token despite the cellID/cellId casing mismatch (§2.7, §2.9, §8.3)
- Actual: Accepted; the casing difference is cosmetic, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: Book(RXZKHB) response passengersSelectedSeats.PAX1.<segRefId>={cellCode:'8B',price:{amount:120.00,currency:'SAR'}}

### TC-BOOK-POS-03 [Positive] - Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly

- Endpoint Name: Book
- Request: POST api/v2/FlightBooking/Book — supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=GetSeatMap's IDs, passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>={cellCode:'8B',cellId:<cellID>}
- Response: 200 — pnr=RXZKHB, gdsPNR='', bookingToken=<token>, ticketStatus=Booked, ticketNumber issued synchronously
- Expected: HTTP 200; pnr/bookingToken/gdsPNR returned; response echoes the seat selection; totals reflect the same price (§2.9)
- Actual: All echoes match exactly: passengersSelectedSeats.PAX1.<seg>={cellCode:8B,price:120.00 SAR}; totalSelectedSeatsAmount=120.00 SAR
- Status: **PASS**
- Evidence: Full Book response body, pnr RXZKHB, GulfAir BAH-RUH 2026-11-15

### TC-BOOK-BIZ-04 [Business Rule] - Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: totalAmount=643.00=170.00+353.00+0+120.00
- Expected: totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount (§2.1, §2.9, §7.10)
- Actual: Reconciles exactly on this round's one-way booking. The round-trip multi-segment sample (confirmed passing in Round 3, pnr RPDBSR) was NOT re-verified this round — blocked by the GetSeatMap outage (see Findings/BUG-14).
- Status: **PASS**
- Evidence: pnr RXZKHB: 170.00 base + 353.00 tax + 0 ancillary + 120.00 seat = 643.00 total

### TC-BOOK-REG-02 [Regression] - Verify passengersSelectedSeats, passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: All 5 fields present and correctly typed
- Expected: No pre-existing response field regressed (§2.9, §8.1-item8)
- Actual: Confirmed, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: Full Book response schema for pnr RXZKHB

### TC-BOOK-REG-03 [Regression] - Verify passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount for a single seat

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: passengerSeats[0].price.amount=120.00; paxTotalSeatAmount.amount=120.00
- Expected: Exactly equal (§2.9)
- Actual: 120.00==120.00, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: selectedOffer.passengerFareBreakdown[0], pnr RXZKHB

### TC-BOOK-VAL-08 [Validation] - Verify the currency code is consistent (not a placeholder like 'string') across every seat-price object in one Book response

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: All seat-price currency values = 'SAR'
- Expected: Consistent, non-placeholder currency (§2.7, §2.9)
- Actual: All currency fields identical ('SAR'), none 'string'/null/empty, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: pnr RXZKHB Book response

### TC-BOOK-POS-04 [Positive] - Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step

- Endpoint Name: Book -> Retrieve
- Request: Book -> Retrieve immediately afterward, no ticketing action taken in between
- Response: Immediate post-Book Retrieve (pnr=RXZKHB) already shows the seat attached/priced
- Expected: Seat attachment doesn't depend on a separate ticketing step (§2.9, §2.11)
- Actual: Core assertion holds; GulfAir tickets synchronously at Book time so there's no distinct un-ticketed window to isolate — same caveat as Rounds 1-3
- Status: **PASS**
- Evidence: Retrieve(RXZKHB) immediately shows seat 8B/120 SAR attached, bookingStatus already 'Booked'

### TC-SEATMAP-VAL-04 [Validation] - Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer

- Endpoint Name: Book
- Request: Would require two independent, successful GetSeatMap chains (Offer A, Offer B)
- Response: N/A — this round's GetSeatMap outage prevented obtaining a second independent GetSeatMap response
- Expected: Request rejected (§2.7, §2.9, §7.7)
- Actual: NOT RE-VERIFIED this round due to the concurrent GetSeatMap outage (see Findings/BUG-14). BUG-07 (STILL REPRODUCES as of Round 3) is carried forward unchanged.
- Status: **BLOCKED**
- Evidence: See Findings — GetSeatMap sustained outage (BUG-14)

### TC-BOOK-NEG-12 [Negative] - Validate Book rejects requests with each mandatory field individually omitted: ResponseId, selectedOfferId, supplier, credentialsSelector

- Endpoint Name: Book
- Request: 4 variants of a no-seat Book payload (built directly from AddPassenger's IDs, bypassing GetSeatMap), each missing exactly one of supplier/credentialsSelector/ResponseId/selectedOfferId
- Response: omit supplier→400; omit credentialsSelector→400; omit selectedOfferId→500 ServerError; omit ResponseId→200, created real PNR RDKSHA
- Expected: All four runs rejected; no pnr created in any run (§2.9, §7.7, §8.1-item2)
- Actual: STILL REPRODUCES (BUG-13, selectedOfferId sub-case, 4th consecutive round for this behavior) — omitting selectedOfferId still produces a generic 500 rather than a clean 400. The ResponseId-omission sub-case is EXCLUDED from this round's scope per explicit instruction (maps to Round 3's BUG-05): noted tersely only — omitting ResponseId still succeeds and creates a real ticketed PNR (RDKSHA), unchanged from Rounds 1-3, not escalated or counted this round.
- Status: **FAIL**
- Evidence: TransactionIds fa763f12 (supplier,400), 76d2a73e (credentialsSelector,400), afb97dda (selectedOfferId,500); pnr=RDKSHA (ResponseId omitted,200, excluded from tally)

### TC-BOOK-NEG-05 [Negative] - Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell

- Endpoint Name: Book
- Request: Book submitted with an Occupied-style cellCode and a null cellId (Occupied cells never carry a real cellID, confirmed again this round)
- Response: 400 ValidationError {'NotEmptyValidator':'CellId is required.'}
- Expected: Request rejected; no booking created reflecting the unavailable seat (§2.7, §2.9, §7.7)
- Actual: Rejected via a generic null-cellId check (GetSeatMap never issues a real cellId for an Occupied cell), unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: TransactionId 3273e4dd-3316-4ded-9569-ea66f327a717

### TC-BOOK-NEG-06 [Negative] - Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with

- Endpoint Name: Book
- Request: Book submitted with a valid cellCode (8A) but its cellId's trailing 10 base64 characters replaced with 'XXXXXXXXXX', on a fresh never-booked offer (BAH-CAI)
- Response: 200 — pnr=RZTFBV, seat 8A attached at 120.00 SAR exactly as if the untampered token had been sent
- Expected: Rejected — the tampered token should fail a server-side decode/signature check (§2.7, §2.9, §7.7)
- Actual: STILL REPRODUCES (BUG-06, 4th consecutive round) — accepted; the seat was attached using the submitted cellCode regardless of the corrupted cellId
- Status: **FAIL**
- Evidence: pnr RZTFBV, seat 8A/120.00 SAR attached despite the corrupted cellId

### TC-BOOK-VAL-06 [Validation] - Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes

- Endpoint Name: Book
- Request: Book submitted with cellCode from one AvailablePaid cell (8C) but cellId from a different AvailablePaid cell (8B) in the same offer/segment (BAH-DXB)
- Response: 200 — pnr=RORUIF, seat attached exactly as the submitted cellCode (8C, 120.00 SAR), not the cell cellId actually referenced (8B)
- Expected: Confirm whether cellId alone is trusted, request rejected, or wrong seat booked under wrong code (§2.7, §2.9, §7.11)
- Actual: STILL REPRODUCES — the API trusts cellCode, not cellId; cellId's real identity is not cross-checked at all, unchanged from Rounds 1-3
- Status: **FAIL**
- Evidence: pnr RORUIF, cellCode 8C booked at 120.00 SAR (8C's own price, cellId was for cell 8B)

### TC-BOOK-NEG-07 [Negative] - Validate Book rejects a request that assigns the same seat cell to two different passengers

- Endpoint Name: Book
- Request: Would require a 2-ADT GetSeatMap chain (BAH-JED and BAH-RUH both attempted this round)
- Response: N/A — GetSeatMap failed with the generic outage error on both attempted 2-ADT chains this round
- Expected: Request rejected before any supplier round-trip; no pnr created (§2.9, §7.7)
- Actual: NOT RE-VERIFIED this round — 2 independent attempts (BAH-JED, BAH-RUH) both hit the concurrent GetSeatMap outage (see Findings/BUG-14) rather than the intended multi-passenger scenario. Last confirmed passing (cleanly rejected, 400) in Round 3.
- Status: **BLOCKED**
- Evidence: See Findings — GetSeatMap sustained outage (BUG-14)

### TC-BOOK-NEG-08 [Negative] - Validate Book rejects a request where the same passenger selects two different seats on the same segment

- Endpoint Name: Book
- Request: No live call made — setSegmentsSeats is a JSON object keyed by segmentRefId, so a client literally cannot submit two different cellCode/cellId values under one segmentRefId key in valid JSON
- Response: N/A
- Expected: Documented as untestable-by-construction (§2.9)
- Actual: Confirmed again this round by request-shape inspection of every successful Book payload built this round, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: Book's passengersSelectedSeats.<pax>.setSegmentsSeats schema is a JSON object, not an array, per every Book call this round

### TC-BOOK-BIZ-06 [Business Rule] - Verify an Infant (INF) on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry

- Endpoint Name: Book
- Request: Would require an ADT+INF AddPassenger chain with parentPaxRefId linkage
- Response: N/A
- Expected: N/A (§2.5, §2.9)
- Actual: Not executed this round — deprioritized again in favor of the higher-value seat-validation/route-variation coverage already prioritized this run, consistent with Rounds 1-3's own scope decision
- Status: **BLOCKED**
- Evidence: Not attempted

### TC-BOOK-NEG-09 [Negative] - Validate graceful rollback when the supplier's seat allocation call fails or times out after Book is submitted

- Endpoint Name: Book
- Request: Requires a forcing mechanism to make the supplier-side seat allocation fail on demand
- Response: Not attempted
- Expected: N/A (§2.9, §7.9)
- Actual: Not forceable this round via Book's own seat-allocation path specifically. Note: this round's real GetSeatMap outage (BUG-14) is a naturally-occurring supplier-failure scenario, but on a different endpoint's call path, so it does not substitute for this test case's specific target.
- Status: **BLOCKED**
- Evidence: No forcing mechanism available

### TC-BOOK-VAL-07 [Validation] - Validate a second, different passengersSelectedSeats selection supersedes an earlier selection made before the single Book call is sent

- Endpoint Name: Book
- Request: Client-side behavior — only one Book call is ever transmitted
- Response: N/A
- Expected: Book reflects exactly what was sent (§2.9)
- Actual: Every Book call this round reflected exactly the cellCode/cellId actually transmitted, never a stale value, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: Cross-referenced against TC-BOOK-POS-03/NEG-06/VAL-06 evidence this run

### TC-BOOK-BIZ-05 [Business Rule] - Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side

- Endpoint Name: Book
- Request: Would require an ADT+CHD GetSeatMap chain (BAH-JED attempted this round)
- Response: N/A — GetSeatMap failed with the generic outage error on the attempted ADT+CHD chain
- Expected: An explicit error response; no pnr created (§2.7, §2.9)
- Actual: NOT RE-VERIFIED this round — the ADT+CHD chain needed to identify an exit-row cell for the CHD passenger hit the concurrent GetSeatMap outage (see Findings/BUG-14). BUG-09 (STILL REPRODUCES IN ITS WORSENED FORM as of Round 3 — zero server-side validation, CHD genuinely ticketed in the exit row) is carried forward unchanged, not re-confirmed or newly resolved this round.
- Status: **BLOCKED**
- Evidence: See Findings — GetSeatMap sustained outage (BUG-14)

### TC-BOOK-BIZ-07 [Business Rule] - Validate a wheelchair-accessible seat can be selected for a passenger flagged for special assistance

- Endpoint Name: Book
- Request: Requires identifying a wheelchair-accessible cell by its cellCharacteristics/description text
- Response: N/A — no WHEELCHAIR/WCHR/ACCESSIBLE characteristic string found in this round's captured GulfAir seat map
- Expected: N/A (§2.5, §2.7, §2.9)
- Actual: Not executable this round either — the description vocabulary captured this round (chain1's 15 values) still contains no wheelchair-designated value, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: Full description-vocabulary scan across this round's GetSeatMap sample: zero WHEELCHAIR/WCHR/ACCESSIBLE matches

### TC-BOOK-NEG-10 [Negative] - Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats: {} explicitly present, otherwise a normal no-seat Book call (BAH-DXB)
- Response: 200 — pnr=RAXCJR, ticketed, passengersSelectedSeats:{} in the response, no seat fee
- Expected: Book succeeds; no seat fee charged; no 500-level error (§2.9)
- Actual: Succeeded exactly as expected, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: pnr RAXCJR

### TC-BOOK-NEG-11 [Negative] - Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats.PAX1.setSegmentsSeats: {} (BAH-DMM, fresh unbooked offer)
- Response: 200 — pnr=RLJOFF, ticketed, no seat attached, no error
- Expected: Book succeeds; no seat attached; no error from the empty nested object (§2.9)
- Actual: Succeeded exactly as expected, unchanged from Rounds 1-3. (Note: an initial attempt reusing an already-booked offer triggered a distinct 'booking already created (609)' 409 — a duplicate-submission rejection, not a NEG-11 result — the test was corrected to use a fresh offer.)
- Status: **PASS**
- Evidence: pnr RLJOFF

### TC-BOOK-INT-03 [Integration] - Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously

- Endpoint Name: Book
- Request: Requires a bundle code (GetOfferBundles) plus an ancillary code plus a seat, all on one Book call
- Response: N/A — GulfAir/KSA's haveBundles=false on every offer sampled this round
- Expected: N/A (§2.9)
- Actual: Not executable for GulfAir — haveBundles=false confirmed on this round's chains, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: FareConfirm capability flags: haveBundles=False (chain1 and others)

### TC-BOOK-BND-03 [Boundary] - Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries

- Endpoint Name: Book
- Request: (a) passengersSelectedSeats omitted entirely (BAH-CAI, pnr RXADOW); (b) one passenger/one segment (TC-BOOK-POS-03, pnr RXZKHB); (c) two passengers/two segments (round-trip)
- Response: (a) 200, no seat attached; (b) 200, seat attached as expected; (c) not re-verified this round
- Expected: (a) Book succeeds with no seat attached; (b) succeeds as in TC-BOOK-POS-03; (c) multi-segment nesting confirmed live in Round 3 (§2.9, §8.1-item3)
- Actual: (a) and (b) both confirmed PASS this round. (c) the round-trip multi-segment nesting case (confirmed passing in Round 3, pnr RPDBSR) was NOT re-verified this round — blocked by the GetSeatMap outage (see Findings/BUG-14).
- Status: **PASS**
- Evidence: (a) pnr RXADOW, passengersSelectedSeats absent from request and response; (b) pnr RXZKHB

### TC-BOOK-INT-04 [Integration] - Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent

- Endpoint Name: Book
- Request: Requires GetOfferBundles to succeed first
- Response: N/A — haveBundles=false for GulfAir/KSA
- Expected: N/A (§2.4, §2.9)
- Actual: Still not executable — GulfAir has no bundle capability on any sampled offer, unchanged capability gap from Rounds 1-3
- Status: **BLOCKED**
- Evidence: FareConfirm capability flags show haveBundles=False

### FLOW-V2-49-SEATFIELD [Flow] - Verify the existing SM-enrichment Family-A flow chains Book's ResponseId/selectedOfferId from GetSeatMap and exercises passengersSelectedSeats

- Endpoint Name: Flow (Family A: AP-SM-FCK-BK-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap->Book->Retrieve, one-way itinerary (pnr RXZKHB)
- Response: PASS: Book and Retrieve both echo passengersSelectedSeats matching the selection; totalSelectedSeatsAmount non-zero and reconciles into totalAmount
- Expected: Per-family state check (§6.3 Family A) plus seat-specific checks (§2.7, §2.9, §2.11, §5.4 row 49 (SM/A), §6.3, §6.4)
- Actual: All assertions hold on this round's one-way sample (RXZKHB: 170+353+120=643). The round-trip sample (confirmed passing in Round 3, pnr RPDBSR) was NOT re-verified this round — blocked by the GetSeatMap outage (see Findings/BUG-14).
- Status: **PASS**
- Evidence: pnr RXZKHB — see TC-BOOK-POS-03/BND-03/BIZ-04 for full detail

Hops (6):
  1. Search - Status: **PASS** - Expected: 200, offers returned - Actual: 200, 30 offers, first offer GF169 - Evidence: responseId captured
  2. FareConfirm - Status: **PASS** - Expected: 200, capability flags present - Actual: 200, flags present and consistent with every other chain this run - Evidence: selectedOffer.offerJourneys=[GF-GF169-1]
  3. AddPassenger - Status: **PASS** - Expected: 200, offerId/responseId returned - Actual: 200 - Evidence: getAddPaxOfferId/getAddPaxResponceID populated
  4. GetSeatMap - Status: **PASS** - Expected: 200, seatMapDetails populated - Actual: 200 — this call happened before this round's GetSeatMap outage began - Evidence: segment key GF-GF169-GF169-2026111521-2026111522-O
  5. Book - Status: **PASS** - Expected: 200, pnr/bookingToken/gdsPNR, seat echoed - Actual: 200, pnr RXZKHB, totalAmount=643.00 reconciles - Evidence: passengersSelectedSeats.PAX1 has 1 segment entry
  6. Retrieve - Status: **PASS** - Expected: Seat persists post-ticketing - Actual: Identical to Book - Evidence: Retrieve(RXZKHB) matches Book(RXZKHB) field-for-field

### FLOW-V2-50-SEATFIELD [Flow] - Verify whether GetSeatMap's chosen seat can be attached via Hold directly (Family B, before SeatAfterHold)

- Endpoint Name: Flow (Family B: AP-SM-FCK-HD-FCAH-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap->Hold, with passengersSelectedSeats included on the Hold request body
- Response: N/A — requires a real cellCode/cellId sourced from a successful GetSeatMap call
- Expected: Confirm live whether Hold silently ignores, rejects, or accepts an unrecognized passengersSelectedSeats field (§2.7a, §2.9, §2.10, §5.4 row 50 (SM/B), §5.5-item8)
- Actual: NOT RE-VERIFIED this round — every GetSeatMap call attempted after this round's outage began failed, so no fresh seat cellCode/cellId was available to attach via Hold. BUG-08 (STILL REPRODUCES as of Round 3, on both one-way and round-trip itineraries) is carried forward unchanged.
- Status: **BLOCKED**
- Evidence: See Findings — GetSeatMap sustained outage (BUG-14)

### FLOW-V2-CANDIDATE-SM-HOLD-01 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold

- Endpoint Name: Flow (candidate SM-Hold-A)
- Request: Hold (pnr RXFVNC) -> SeatAfterHold (position A, immediately after Hold)
- Response: SeatAfterHold rejected with 409 'GulfAir does not exists' — chain could not proceed past this hop
- Expected: SeatAfterHold succeeds; final Retrieve shows the seat populated (§2.7a, §2.10, §2.12, §2.13, §2.11, §5.5-item8)
- Actual: Blocked at the SeatAfterHold hop for GulfAir (BUG-03), unchanged from Rounds 1-3
- Status: **FAIL**
- Evidence: 

Hops (2):
  1. Hold - Status: **PASS** - Expected: 200, pnr/bookingToken - Actual: 200, pnr RXFVNC (holdExpirationDate null, separate defect BUG-04) - Evidence: pnr RXFVNC
  2. SeatAfterHold - Status: **FAIL** - Expected: 200 with a seat-selection response - Actual: 409, chain halted - Evidence: TransactionId ae51b087-f559-49b5-a4f1-8ff55393ef29

### FLOW-V2-CANDIDATE-SM-HOLD-02 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold

- Endpoint Name: Flow (candidate SM-Hold-B)
- Request: Not independently executed — SeatAfterHold's rejection of GulfAir is supplier-level, not state/position-dependent
- Response: N/A
- Expected: N/A (§2.7a, §2.10, §2.12, §2.13, §2.11, §5.5-item8)
- Actual: Reasoned-BLOCKED, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-03 [Flow] - Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking

- Endpoint Name: Flow (candidate SM-Hold-C)
- Request: Not independently executed — same reasoning as candidate-02
- Response: N/A
- Expected: N/A (§2.7a, §2.13, §2.11, §5.5-item8)
- Actual: Reasoned-BLOCKED, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG [Flow] - Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken carried over from an unrelated Hold call

- Endpoint Name: Flow (candidate SM-Hold-A, negative)
- Request: Actually attempted this round: pnr from Hold RXFVNC combined with bookingToken from an unrelated 2nd Hold (RAHAQQ)
- Response: 409 OperationNotSupported 'GulfAir does not exists' — identical to the baseline rejection, not a distinct mismatch-specific error
- Expected: N/A (§2.7a, §3.2, §7.2, §7.7)
- Actual: The baseline SeatAfterHold call already rejects GulfAir unconditionally (409, supplier-level) before any identity-matching logic runs, so this remains not meaningfully testable for GulfAir, unchanged from Rounds 1-3
- Status: **BLOCKED**
- Evidence: TransactionId aa5d6279-dcdf-4231-9abb-5f319baaf3f2

### TC-SEATMAP-VAL-11 [Validation] - Verify passengersSeatMapAvailability.<paxRef>.<segmentRefId> stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response

- Endpoint Name: GetSeatMap
- Request: GetSeatMap -> for the passenger, read passengersSeatMapAvailability.<paxRef> -> confirm keys match seatMapDetails/flightSegments casing exactly
- Response: passengersSeatMapAvailability.PAX1's key is the full segmentRefId string 'GF-GF169-GF169-2026111521-2026111522-O', matching seatMapDetails/flightSegments keys character-for-character
- Expected: Segment-ref key casing consistent; no casing inconsistency (§2.7)
- Actual: No casing inconsistency observed for GulfAir, unchanged from Rounds 1-3
- Status: **PASS**
- Evidence: passengersSeatMapAvailability key == seatMapDetails segment key, verbatim

### TC-SEATMAP-BND-04 [Boundary] - Confirm live whether any cellCategory value beyond {Seat, Aisle} is ever returned

- Endpoint Name: GetSeatMap
- Request: GetSeatMap across the GulfAir routes/aircraft successfully sampled this round (before the outage began: BAH-RUH, BAH-CAI, BAH-DXB, all narrowbody equipment)
- Response: Only Seat/Aisle observed across all successful GulfAir samples this round too
- Expected: Resolve empirically (§2.7, §8.3)
- Actual: Same inconclusive-but-consistent outcome as Rounds 1-3 — GulfAir's narrowbody fleet on these routes shows no galley/lavatory/bulkhead-as-separate-category cells
- Status: **PASS**
- Evidence: Distinct cellCategory values across this round's successful GetSeatMap calls: Seat, Aisle only

## Findings

**Of Round 3's 12 logged defects: 5 RECONFIRMED with fresh evidence (BUG-03, 04, 06, 10, 11), 4 NOT RE-VERIFIED this round due to the GetSeatMap outage (BUG-01, 07, 08, 09), 1 excluded from this round's tally per explicit scope (BUG-02's ResponseId sub-case, plus BUG-05's ResponseId sub-case), 1 not reproduced again (BUG-12). 2 NEW defects found in Round 4 (BUG-13, BUG-14).**

### Defects

- **[TC-SEATAFTERHOLD-POS-01]** [BUG-03, STILL REPRODUCES — Round 4] SeatAfterHold rejects every call for supplier=GulfAir with HTTP 409 OperationNotSupported, Context='GulfAir does not exists', identical wording/status to Rounds 1-3, reconfirmed against a brand-new fresh Hold (pnr RXFVNC) created independently of GetSeatMap.
- **[FLOW-V2-CANDIDATE-SM-HOLD-01]** [BUG-04, STILL REPRODUCES — Round 4] Hold's holdExpirationDate is still null for GulfAir, reconfirmed on 2 fresh Holds this round (RXFVNC, RAHAQQ).
- **[TC-BOOK-NEG-06]** [BUG-06, STILL REPRODUCES — Round 4] Book does not decode or verify the cellId token at all — a tampered cellId is accepted and the seat is attached purely based on the submitted cellCode (pnr RZTFBV).
- **[PRE-FLIGHT]** [BUG-10, STILL REPRODUCES — High severity — Round 4] AddPassenger still rejects the V2 Postman collection's own saved example (passengersList.name.middle='kady' vs travelDocument.name.middle='') with HTTP 400 'Invalid travel document information', identical to Rounds 2-3.
- **[PRE-FLIGHT]** [BUG-11, STILL REPRODUCES AND WIDENED — Critical severity — Round 4] Resubmitting an already-consumed Book request still returns HTTP 409 with OriginalSupplierRequest/OriginalSupplierResponse present and confirmed (via redacted keyword match only) to contain an apikey-like plaintext token. NEW this round: the identical leak pattern was also observed on GetSeatMap's generic-error envelope during this round's sustained outage (BUG-14) — confirmed unconditional across at least two endpoints, not limited to Book's double-booking-conflict scenario.
- **[TC-BOOK-NEG-12]** [BUG-13, NEW — Round 4, broken out from Round 1-3's combined BUG-05] Book returns a generic HTTP 500 ServerError (instead of a clean 400 ValidationError) when selectedOfferId is omitted from an otherwise-valid request. This sub-case is unrelated to ResponseId and remains in scope per this round's instructions.
- **[TC-SEATMAP-NEG-02]** [BUG-14, NEW — Round 4] GetSeatMap entered a sustained (20+ minute, 40+ call) generic supplier-error outage (HTTP 409 NDC-INT-UNC-Z9999) partway through this round, affecting every route/passenger-count combination tried, while Book and Hold (called independently of GetSeatMap) continued to succeed normally throughout the same window. This blocked live re-verification of BUG-01, BUG-07, BUG-08, BUG-09, and the round-trip/multi-passenger seat-selection scope this round was supposed to extend.

### UNKNOWN-resolutions (new live-confirmed facts)

- **[MULTICITY-SWEEP]** Multi-city (3+ leg) searchCriteria is CONFIRMED NOT SUPPORTED (or at minimum hard-capped at 2 entries) for GulfAir/KSA on this host — resolves Round 3's INCONCLUSIVE finding. A 9-combination sweep (7 distinct 3-leg/4-leg routings across every route pair with previously-confirmed live one-way inventory, plus 2 boundary-isolation probes) returned HTTP 200 with an empty offers[] in all 9 cases, INCLUDING a control using the exact same BAH-RUH/RUH-BAH pair three times in a row — a pair independently proven to return 125-175 offers when submitted as a 2-entry array. The cutoff is precisely at 2 vs. 3+ searchCriteria entries, not at route/inventory validity.
- **[MULTICITY-SWEEP]** A 2-entry searchCriteria array is CONFIRMED supported for GulfAir/KSA in BOTH shapes: a mirrored round-trip (BAH-RUH outbound / RUH-BAH return, 175 offers) and a non-mirrored open-jaw (BAH-RUH outbound / JED-BAH return — different destination and origin pair, 125 offers). A 2-entry array where the second leg continues from the first leg's destination to a third, non-hub city (BAH-RUH then RUH-JED) returns 0 offers, consistent with GulfAir having no live RUH-JED inventory (a genuine route gap, not a searchCriteria-length limitation).
- **[TC-BOOK-VAL-06]** Re-confirmed: Book trusts cellCode, not cellId, when the two refer to different cells — the API attaches and prices whichever cellCode was submitted (this round: 8C at 120.00 SAR) regardless of what the accompanying cellId token actually decodes to (8B). Unchanged from Rounds 1-3.

## Proposed SPEC.md updates

- **§2.1 - pending** - Replace: "[Round 3, pending] Round-trip IS supported via a 2-entry searchCriteria array... A 3-entry (multi-city) searchCriteria array returned HTTP 200 with an empty offers[] for the one combination tried — inconclusive as a capability statement; needs a broader sweep before concluding multi-city is unsupported vs. simply no inventory for that combination." With: "[Confirmed live 2026-08-30, Round 4, GulfAir/KSA] Multi-city (3+ entry searchCriteria) is NOT supported (or hard-capped at 2 entries) for GulfAir/KSA on this host — confirmed via a 9-combination sweep (7 distinct 3/4-leg routings plus 2 boundary-isolation probes), all returning HTTP 200 with empty offers[], including a control using the exact same route pair independently proven to return 125-175 offers as a 2-entry array. A 2-entry array is supported in both round-trip (mirrored) and open-jaw (non-mirrored) shapes."

- **§2.7 - pending** - Replace: "(Rounds 1-3 pending) Add top-level isFareCheckRequired (boolean) and passengersDetails.<paxRef>.passengersSeatMapAvailability to the documented response shape" With: "Still pending — unchanged and reconfirmed for a 4th consecutive round (2026-08-30). No action taken on this proposal since Round 2; carrying forward."

- **§4.6 - pending** - Replace: "(Rounds 1-3 pending) GulfAir SeatMap capability row: Unknown -> Supported" With: "Still pending — unchanged and reconfirmed for a 4th consecutive round (2026-08-30, before this round's GetSeatMap outage began). Carrying forward."

- **§2.10 / §1.10 item 6 - pending** - Replace: "(Rounds 1-3 pending) Hold DOES accept and honor a passengersSelectedSeats field submitted directly on the Hold request" With: "Still pending — NOT re-verified this round due to the GetSeatMap outage (BUG-14) preventing a fresh seat cellCode/cellId. Last confirmed live in Round 3 on both one-way and round-trip itineraries. Carrying forward unchanged."

- **§2.5 - pending** - Replace: "(Round 2 pending) Document AddPassenger's exact-name-match requirement between passengersList.<pax>.name and travelDocument.name" With: "Still pending — unchanged and reconfirmed identically in Round 4 (2026-08-30, same error/TransactionId shape). Carrying forward."

- **§7.14 / §2.9 - pending** - Replace: "(Rounds 1-3 pending) Book's duplicate-submission 409 error envelope includes OriginalSupplierRequest/OriginalSupplierResponse fields containing plaintext supplier credentials" With: "[WIDENED, Round 4] Confirmed the same leak also occurs on GetSeatMap's generic supplier-error envelope (409 NDC-INT-UNC-Z9999), not just Book's duplicate-submission conflict — this is a systemic response-serialization issue affecting multiple endpoints' generic-error paths, not a single narrow code path. Recommend immediate remediation across all endpoints, not just Book."

## Cleanup / follow-up

9 live artifacts left behind this run (7 ticketed bookings needing Void, 2 Held-but-not-finalized Family-B holds):

- **needs_void_cancel** - PNR "RXZKHB" (TC-BOOK-POS-03) - Baseline seat-selection booking (BAH-RUH 2026-11-15, seat 8B, 120.00 SAR). Primary evidence for TC-BOOK-POS-03/POS-04/BIZ-04/REG-02/REG-03/VAL-08/RETRIEVE-REG-01/POS-02/VAL-03/FLOW-V2-49-SEATFIELD.
- **needs_void_cancel** - PNR "RXADOW" (TC-BOOK-BND-03) - No-seat Book call bypassing GetSeatMap entirely (BAH-CAI 2026-12-23), used to confirm Book/GetSeatMap-outage isolation and TC-BOOK-BND-03 run (a).
- **needs_void_cancel** - PNR "RZTFBV" (TC-BOOK-NEG-06) - Created/ticketed while proving Book does not validate a tampered cellId (BAH-CAI, 2026-11-24).
- **needs_void_cancel** - PNR "RORUIF" (TC-BOOK-VAL-06) - Created/ticketed while proving cellCode (not cellId) drives seat resolution (BAH-DXB, 2026-11-27).
- **needs_void_cancel** - PNR "RDKSHA" (TC-BOOK-NEG-12) - Created/ticketed by the ResponseId-omission behavior (excluded from this round's defect tally per scope), BAH-CAI 2026-12-24.
- **needs_void_cancel** - PNR "RAXCJR" (TC-BOOK-NEG-10) - Created while testing explicit-empty passengersSelectedSeats (BAH-DXB, 2026-12-26).
- **needs_void_cancel** - PNR "RLJOFF" (TC-BOOK-NEG-11) - Created while testing explicit-empty setSegmentsSeats on a fresh offer (BAH-DMM, 2026-12-28).
- **family_b_hold** - PNR "RXFVNC" (TC-SEATAFTERHOLD-POS-01) - Held via direct Hold call, independent of GetSeatMap (BAH-DMM, 2026-12-17). holdExpirationDate null. Never progressed to FareConfirmAfterHold/BookAfterHold/CancelAfterHold.
- **family_b_hold** - PNR "RAHAQQ" (TC-SEATAFTERHOLD-NEG-01) - Held for the mismatched-identity SeatAfterHold negative test (BAH-CAI, 2026-12-19). holdExpirationDate null. Never progressed.

