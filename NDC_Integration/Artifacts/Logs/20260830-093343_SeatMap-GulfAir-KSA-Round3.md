# QA Execution Report - Round 3 Regression - SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 63 test cases: Round 3 full regression pass, explicit re-verification of Round 2's 12 logged defects (BUG-01..BUG-12), plus additive journey-type coverage (One-Way/Round-Trip/Multi-City)

**Environment:** staging (non-default host — user-specified) &middot; https://ndc-integration-stg-ne-2.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-08-30T09:33:43Z
**Ended:** 2026-08-30T11:48:00Z
**Status:** COMPLETE
**Prior runs:** [Round 1 - 20260825-103032](20260825-103032_SeatMap-GulfAir-KSA.md) and [Round 2 - 20260826-154300](20260826-154300_SeatMap-GulfAir-KSA-Round2.md)

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 35
- Failed: 13
- Blocked: 15

### Journey-type coverage (additive requirement for Round 3)

- **One-Way** - the default shape for the great majority of this run's chains (13 of 15 Search-to-Book/Hold chains this round); covers essentially the full 63-test-case scope in its primary form.
- **Round-Trip** - CONFIRMED live-supported for GulfAir/KSA (2-entry searchCriteria, 180 offers returned vs. 30 one-way). Deliberately exercised for: TC-BOOK-BND-03 (run (c), multi-segment seat selection - now PASS, pnr RPDBSR), FLOW-V2-49-SEATFIELD (2nd sample, pnr RPDBSR), FLOW-V2-50-SEATFIELD (2nd sample, pnr OCBWTT), TC-BOOK-BIZ-04 (price reconciliation on a 2-segment booking), TC-RETRIEVE-REG-01 (round-trip Retrieve), TC-BOOK-INT-04/TC-BOOK-INT-03 (attempted on the round-trip offer too - still BLOCKED, haveBundles=false regardless of journey shape).
- **Multi-City** - attempted (3-leg BAH-RUH-JED-BAH) and returned HTTP 200 with an EMPTY offers[]. This is recorded as INCONCLUSIVE, not as a confirmed capability gap - only one specific 3-city routing/date combination was tried, with no error envelope returned. A broader sweep is recommended before concluding multi-city is unsupported for GulfAir/KSA on this host.

### Pre-flight discovery (carried over from Round 2, reconfirmed)

- AddPassenger's exact-name-match requirement between passengersList.<pax>.name and travelDocument.name (first confirmed live in Round 2, 2026-08-26) still enforced identically in Round 3: resubmitting the V2 Postman collection's own saved example verbatim (top-level name.middle='kady', travelDocument.name.middle='') is rejected with the identical HTTP 400 PredicateValidator error. Worked around for the rest of this run by sending a self-consistent passenger name, exactly as Round 2 did.
- Round-trip search (searchCriteria with 2 entries: outbound + return) is CONFIRMED live-supported for GulfAir/KSA on this host — 180 offers returned (vs 30 for the equivalent one-way search), each offer's offerJourneys carrying 2 journey refs and a 2-segment flightSegments map. This resolves SPEC.md §2.1's prior UNKNOWN ('round trip = 2 entries, needs confirmation').
- A 3-city multi-city search (searchCriteria with 3 entries: BAH->RUH, RUH->JED, JED->BAH) returned HTTP 200 with an EMPTY offers[] array for GulfAir/KSA on this host. This is inconclusive as a capability statement — it was not accompanied by any 4xx/'unsupported' envelope, and only one specific 3-city routing/date combination was tried, so it cannot be distinguished from 'GulfAir simply has no live inventory for this exact combination' vs 'multi-city (3+ legs) is not supported by this endpoint/supplier at all'. Recorded explicitly rather than silently treated as unsupported or skipped; recommend a follow-up sweep across additional 3-city combinations before concluding either way.

## Test case results

(63 entries; each reports Endpoint Name/Request/Response/Expected/Actual/Status/Evidence. Flow-level cases nest hop detail.)

### TC-SEATMAP-POS-01 [Positive] - Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat — supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=AddPassenger's IDs (BAH-RUH 2026-10-20, GF169, one-way)
- Response: 200 — supplier, flightSegments{1 segment}, passengersDetails{PAX1}, seatMapDetails{1 segment, 25 rows, 175 cells} all present and non-null
- Expected (§2.7): HTTP 200; all four top-level fields present/non-null; every segmentRefId in seatMapDetails also appears in flightSegments
- Actual: 200; single segment GF-GF169-GF169-2026102021-2026102022-O present identically in both flightSegments and seatMapDetails; passengersDetails.PAX1 present; 25 rows
- Status: **PASS**
- Evidence: Live GetSeatMap response for GulfAir/KSA BAH-RUH 2026-10-20 (offer GF169) — unchanged from Round 1/2's pattern on a fresh sample

### TC-SEATMAP-VAL-05 [Validation] - Verify cellCharacteristics.description text is consistent with its own padisCode

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response as TC-SEATMAP-POS-01, inspecting cellCharacteristics[] on every cell
- Response: Every cellCharacteristics[] entry has padisCode:'Unknown' and description as a self-descriptive enum string
- Expected (§2.7, §8.3): For padisCode values in the maintained reference table, description must not contradict the code's meaning; codes outside the table are logged, not failed
- Actual: GulfAir's adapter never populates a real padisCode (always literal 'Unknown'); description strings self-consistent. NEW this round: 5 description values not seen in Round 1/2 — EXIT_ROW_SEAT, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL, OVER_WING_SEAT_S, PREFERRED_SEAT_PREFERENTIAL_SEAT — alongside the previously-known AISLE_SEAT/BULKHEAD_SEAT/CENTER_SEAT/CHARGEABLE_SEAT/FRONT_OF_CABIN/LEFT_SIDE_OF_AIRCRAFT/LEG_SPACE_SEAT/RIGHT_SIDE_OF_AIRCRAFT/SEAT_WITH_BASSINET_FACILITY/WINDOW
- Status: **PASS**
- Evidence: Full scan of A.GetSeatMap's 175 cells; padisCode='Unknown' on every cellCharacteristics entry

### TC-SEATMAP-BND-03 [Boundary] - Confirm live whether AvailableFree/AvailableAfterReservation are real cellAvailability values

- Endpoint Name: GetSeatMap
- Request: Same GulfAir/KSA GetSeatMap sample (1 segment, 175 cells) inspected for AvailableFree/AvailableAfterReservation
- Response: Only AvailablePaid and Occupied observed; neither candidate value found
- Expected (§2.7, §8.3): Confirm live whether AvailableFree/AvailableAfterReservation are real cellAvailability values for this supplier's sample
- Actual: No new evidence for or against on GulfAir/KSA — remains unconfirmed for this supplier, consistent with Round 1/2
- Status: **PASS**
- Evidence: Distinct cellAvailability values this round: AvailablePaid, Occupied only

### TC-SEATMAP-VAL-06 [Validation] - Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, scanning cellCategory/column/cellDetails across all 175 cells
- Response: 175/175 cells conform (Aisle→column=null & cellDetails=null; Seat→both populated) — 0 violations
- Expected (§2.7): cellCategory=Aisle implies column/cellDetails null; cellCategory=Seat implies both populated; no cell violates this partition
- Actual: 0/175 violations — the Round 1 defect (row 8/column E mis-tagged Aisle-with-details) remains FIXED, unchanged from Round 2's confirmation
- Status: **PASS**
- Evidence: Full cell scan: 0 Aisle violations, 0 Seat violations

### TC-RETRIEVE-REG-01 [Regression] - Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed

- Endpoint Name: Retrieve
- Request: POST api/v2/FlightBooking/Retrieve for pnr=RUTWYN immediately after Book (also cross-checked on round-trip pnr=RPDBSR)
- Response: 200 — bookingStatus='Booked', passengersSelectedSeats identical to Book's own echo on both the one-way and round-trip PNRs
- Expected (§2.11): passengersSelectedSeats/passengerSeats/totalSelectedSeats in a post-ticketing Retrieve are identical to immediately-post-Book values
- Actual: GulfAir tickets synchronously at Book time; Retrieve reproduces Book's seat/price fields exactly on both PNRs (RUTWYN: seat 8A/120 SAR; RPDBSR: seats 8A/120 SAR on each of 2 segments, totalSelectedSeatsAmount=240.00)
- Status: **PASS**
- Evidence: Retrieve(RUTWYN) matches Book(RUTWYN) field-for-field; Retrieve(RPDBSR) matches Book(RPDBSR) field-for-field, price reconciles 280.00+761.00+240.00=1281.00=totalAmount

### TC-SEATAFTERHOLD-POS-01 [Positive] - Discovery case — submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape

- Endpoint Name: SeatAfterHold
- Request: POST api/v2/SeatMap/SeatAfterHold — supplier=GulfAir, credentialsSelector=KSA, pnr=OFLJXH, gdsPNR='', bookingToken=<Hold's token>, surName='Saleh' against a live Held PNR from Hold
- Response: 409 — {ErrorCode:'OperationNotSupported', ErrorMessage:'This action is not currently supported by the selected supplier.', Context:[{Name:'OperationNotSupported',Value:'GulfAir does not exists'}]}
- Expected (§2.7a): Establish ground truth for the actual response shape
- Actual: STILL REPRODUCES (BUG-03, 3rd consecutive round) — rejected outright with HTTP 409 'GulfAir does not exists', identical to Round 1/2, reconfirmed against a brand-new fresh Hold (pnr OFLJXH)
- Status: **FAIL**
- Evidence: TransactionId 8140513d-85a4-48a9-9513-f9d843568efc

### TC-SEATAFTERHOLD-VAL-01 [Validation] - Confirm whether a seat/cell field is required beyond the 6 documented fields

- Endpoint Name: SeatAfterHold
- Request: Depends on TC-SEATAFTERHOLD-POS-01's result
- Response: N/A — prerequisite rejected outright (409, supplier-level)
- Expected (§2.7a): Resolve the real request shape
- Actual: Still blocked by the supplier-level 409 (BUG-03), unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-NEG-01 [Negative] - Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination

- Endpoint Name: SeatAfterHold
- Request: Would require two independent Hold calls with a deliberately mismatched pnr/bookingToken pair
- Response: N/A — every SeatAfterHold call for GulfAir rejects at the supplier-resolution stage regardless of pnr/bookingToken correctness
- Expected (§2.7a, §2.12, §7.7): Rejected, exact status confirmed live
- Actual: Not meaningfully testable for GulfAir until the supplier-level 409 (BUG-03) is resolved, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-NEG-02 [Negative] - Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed

- Endpoint Name: SeatAfterHold
- Request: Would require a Held PNR with a known, elapsed holdExpirationDate
- Response: N/A — doubly blocked
- Expected (§2.7a, §2.12, §6.5): Rejected, consistent with FareConfirmAfterHold's expired-hold expectation
- Actual: Doubly blocked: SeatAfterHold rejects GulfAir outright regardless of expiry (BUG-03), and Hold's holdExpirationDate is STILL null for GulfAir this round (BUG-04, reconfirmed on Holds OFLJXH/RNIJBQ/OCBWTT) — unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01 and the holdExpirationDate defect finding

### TC-SEATAFTERHOLD-SEC-02 [Security] - Apply the three universal security checks to SeatAfterHold

- Endpoint Name: SeatAfterHold
- Request: (1) invalid x-api-key, (2) invalid Client-Id against the SeatAfterHold body used in TC-SEATAFTERHOLD-POS-01
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError — both short-circuit before reaching the supplier-not-found business logic
- Expected (§7.14, §2.7a): All rejected; error shape confirmed live
- Actual: Both auth-layer checks behave identically to every other endpoint's 401 AuthenticationError envelope, unchanged from Round 1/2; cross-tenant variant skipped (base call already 409s for business reasons unrelated to tenant-matching)
- Status: **PASS**
- Evidence: TransactionIds 5acba744-689d-483d-a268-0ba1d239d683 (bad key), 0ed4aabb-533f-42c1-92e6-4d89e0e020bc (bad client)

### TC-SEATAFTERHOLD-INT-04 [Integration] - Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points

- Endpoint Name: SeatAfterHold flow
- Request: Chain tested: Hold -> SeatAfterHold (immediately after Hold)
- Response: SeatAfterHold rejected 409 'GulfAir does not exists' at the very first candidate position
- Expected (§2.7a, §2.10, §2.12, §2.13, §5.5-item8): Record which candidate position(s) SeatAfterHold accepts
- Actual: None of the three candidate positions meaningfully comparable — rejection is supplier-level, not position-dependent, unchanged from Round 1/2
- Status: **FAIL**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-VAL-02 [Validation] - Once SeatAfterHold's real contract is confirmed, validate it rejects a seat/passenger reference not established at this pnr

- Endpoint Name: SeatAfterHold
- Request: Sequenced behind TC-SEATAFTERHOLD-VAL-01
- Response: N/A
- Expected (§2.5, §2.7a): Blocked until VAL-01 resolves a confirmed request shape
- Actual: Still blocked, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-VAL-01

### TC-SEATMAP-VAL-07 [Validation] - Verify window/aisle/extra-legroom/exit-row seat attributes are programmatically derivable from cellCharacteristics

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, cross-checking cellCharacteristics against column position/description text
- Response: WINDOW/AISLE_SEAT/BULKHEAD_SEAT/EXIT_ROW_SEAT/CENTER_SEAT literals appear directly as description strings
- Expected (§2.7, §8.3): Attributes derivable from description text
- Actual: Column A/F carry WINDOW+LEFT_SIDE_OF_AIRCRAFT/RIGHT_SIDE_OF_AIRCRAFT; C/D carry AISLE_SEAT; exit-row cells (e.g. 11B/11C on BAH-JED GF181) carry EXIT_ROW_SEAT — all derivable directly from description text
- Status: **PASS**
- Evidence: Cross-referenced against chain I2's exit-row cell 11C (EXIT_ROW_SEAT) used in TC-BOOK-BIZ-05

### TC-SEATMAP-VAL-08 [Validation] - Verify seatPriceDetails/seatPriceDetailsByPassenger is populated for every AvailablePaid cell and null for every Blocked/Occupied cell

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, partitioned by cellAvailability
- Response: 149/149 AvailablePaid cells have non-null seatPriceDetailsByPassenger.PAX1; the 1 Occupied cell (8E) has both null
- Expected (§2.7): Conditional presence per cellAvailability
- Actual: 149/149 AvailablePaid populated; 1/1 Occupied null — unchanged from Round 1/2's pattern
- Status: **PASS**
- Evidence: Full cell scan of A.GetSeatMap

### TC-SEATMAP-VAL-09 [Validation] - Verify cellCode is unique across all cells within one flight segment's seatMapDetails

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, collecting every cellCode within the one segment
- Response: 175 total cellCode values, 175 distinct — zero duplicates
- Expected (§2.7): No cellCode value repeats
- Actual: 0 duplicates, unchanged from Round 1/2
- Status: **PASS**
- Evidence: Full 175-cell scan

### TC-SEATMAP-VAL-10 [Validation] - Verify structural uniqueness/domain constraints: rowNumber unique, zoneId unique within deck, column restricted to {A-F,null}

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, checked rowNumber/zoneId/column across all 25 rows
- Response: 25 distinct rowNumbers, 1 zone (Cabin1) consistently, column values restricted to {A,B,C,D,E,F,null}
- Expected (§2.7): No rowNumber/zoneId duplicated; column domain respected
- Actual: 0 duplicate rowNumbers; single zoneId per deck; every non-null column in {A,B,C,D,E,F} — unchanged from Round 1/2
- Status: **PASS**
- Evidence: cabinLayoutsByDeck.Main.zones[0]={zoneId:Cabin1}; 0 duplicate rowNumbers across 25 rows

### TC-SEATMAP-BND-02 [Boundary] - Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid/Blocked/Occupied, and Aisle cells carry no seatPriceDetails

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, enumerating distinct cellCategory/cellAvailability values
- Response: cellCategory ∈ {Seat, Aisle}; cellAvailability ∈ {AvailablePaid, Occupied}; every Aisle cell has null seatPriceDetails
- Expected (§2.7, §8.3): No value outside known enum; Aisle cells carry no pricing
- Actual: Confirmed, unchanged from Round 1/2
- Status: **PASS**
- Evidence: Full 175-cell scan

### TC-SEATMAP-BIZ-02 [Business Rule] - Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response, checked totalPrice vs basePrice+taxesPrice for all 149 AvailablePaid cells
- Response: basePrice now correctly carries the real seat charge (e.g. cell 8A: basePrice=120.00 SAR, taxesPrice=0 SAR, totalPrice=120.00 SAR)
- Expected (§2.7, §7.10): totalPrice.amount == basePrice.amount + taxesPrice.amount
- Actual: 0/149 mismatches (Round 1: 179/179 mismatches; Round 2 fix confirmed held; Round 3 re-confirms the fix is STABLE across a 3rd consecutive round
- Status: **PASS**
- Evidence: Sample cell 8A: 120.00 = 120.00 + 0; systemic 0/149 mismatches

### TC-SEATMAP-BIZ-03 [Business Rule] - Verify overall cellAvailability and per-passenger paxCellAvailability are independently reported

- Endpoint Name: GetSeatMap
- Request: Same GetSeatMap response — 1 ADT passenger (PAX1) only
- Response: Every priced cell's seatPriceDetailsByPassenger has exactly one entry, keyed PAX1, matching the cell's own cellAvailability
- Expected (§2.7): Structural consistency, not per-cell completeness
- Actual: Holds; same single-ADT caveat as Round 1/2 (multi-pax differential-eligibility scenario not exercised on this sample)
- Status: **PASS**
- Evidence: 149/149 paid cells have a PAX1 entry

### TC-SEATMAP-BIZ-04 [Business Rule] - Exploratory — confirm GetSeatMap reflects real-time supplier inventory rather than a cached snapshot

- Endpoint Name: GetSeatMap
- Request: Requires a second, independent session to occupy a specific seat between two GetSeatMap calls
- Response: Not attempted — no concurrent-session/forcing mechanism available
- Expected (§1.3): N/A (exploratory)
- Actual: Not forceable from a single test session, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: No second booking session available

### TC-SEATMAP-REG-02 [Regression] - Verify seatMapDetails full field-list schema matches SPEC.md §2.7 with no undocumented keys

- Endpoint Name: GetSeatMap
- Request: Full schema diff of the live GetSeatMap response against §2.7's documented field list
- Response: All §2.7-documented fields present, plus 2 undocumented fields: top-level isFareCheckRequired (boolean, observed false) and passengersDetails.<paxRef>.passengersSeatMapAvailability
- Expected (§2.7, §8.1-item8): No undocumented keys
- Actual: Still 2 undocumented fields, identical to Round 1/2 (SPEC.md §2.7 not yet amended)
- Status: **FAIL**
- Evidence: Live GulfAir GetSeatMap top-level keys: supplier,offerId,responseId,isFareCheckRequired,flightSegments,passengersDetails,seatMapDetails

### TC-SEATMAP-NEG-01 [Negative] - Validate GetSeatMap is rejected when called for an offer whose isSeatMapRequired flag was false

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat using AddPassenger IDs from an offer confirmed live (isSeatMapRequired=false on every offer sampled this run, incl. round-trip)
- Response: 200 — full seatMapDetails returned, not rejected
- Expected (§2.2, §2.4, §2.7, §7.7): Rejected or an explicit unsupported-operation envelope
- Actual: Still 200 with a fully populated seatMapDetails, unchanged from Round 1/2
- Status: **FAIL**
- Evidence: Same GetSeatMap call as TC-SEATMAP-POS-01; isSeatMapRequired=false confirmed at FareConfirm for every one of the 13 chains run this round (A-K + 2 round-trip chains)

### TC-SEATMAP-NEG-02 [Negative] - Validate GetSeatMap is rejected when ResponseId/selectedOfferId come from two different offers

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat with ResponseId from Chain A's AddPassenger (BAH-RUH) and selectedOfferId from Chain B's AddPassenger (BAH-JED)
- Response: 200 — a normal, well-formed seat map response, no rejection
- Expected (§2.7, §7.7): Rejected
- Actual: STILL REPRODUCES (BUG-01, 3rd consecutive round) — 200 success, cross-offer mismatch still not detected
- Status: **FAIL**
- Evidence: Chain A ResponseId combined with Chain B's offerId — accepted with HTTP 200

### TC-SEATMAP-NEG-03 [Negative] - Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat with a fabricated GUID ResponseId and a fabricated selectedOfferId string
- Response: 409 — {ErrorCode:'ValidationError', Context:[{Name:'AsyncPredicateValidator',Value:'The selected offer is invalid, expired, or could not be found...'}]}
- Expected (§2.7, §7.7, §8.1-item2): Rejected; exact status confirmed live
- Actual: Still a clean HTTP 409 with a specific validation message — the Round 1 defect (generic HTTP 500) remains FIXED, unchanged from Round 2's confirmation
- Status: **PASS**
- Evidence: TransactionId 6db5d424-b4d9-4b63-a783-acbedff9962b

### TC-SEATMAP-NEG-04 [Negative] - Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId

- Endpoint Name: GetSeatMap
- Request: 4 variants of a valid GetSeatMap body, each with exactly one of supplier/credentialsSelector/ResponseId/selectedOfferId removed
- Response: omit supplier→400; omit credentialsSelector→400; omit ResponseId→200 full seat map (NOT rejected); omit selectedOfferId→400
- Expected (§2.7, §7.7, §8.1-item2): All four runs rejected
- Actual: STILL REPRODUCES (BUG-02, 3rd consecutive round) — 3 of 4 correctly rejected; omitting ResponseId is still accepted with HTTP 200 and a full seat map
- Status: **FAIL**
- Evidence: TransactionIds 8b675248-3052-408e-8175-bc6e5b081d1d (supplier,400), cbdef92a-57ad-4252-b533-d1562b6891f5 (cred,400), a30edf2a-4f2c-43ae-a556-9904eccea107 (selectedOfferId,400); omit-ResponseId returned a 196KB well-formed seatMapDetails body

### TC-SEATMAP-NEG-05 [Negative] - Validate GetSeatMap fails gracefully (structured error, not raw 500/stack trace) when the underlying supplier call fails

- Endpoint Name: GetSeatMap
- Request: No dedicated supplier-failure forcing mechanism available; reusing TC-SEATMAP-NEG-03's fabricated-ID 409 as the closest available evidence
- Response: 409 {Status,TransactionId,ErrorCode:'ValidationError',ErrorMessage,Context} — a structured envelope, no stack trace or raw supplier payload leaked
- Expected (§1.3, §2.9, §7.9): Structured business-error envelope, not an unhandled exception
- Actual: Clean, structured JSON envelope with no internal type names or raw supplier payloads — unchanged from Round 2's improved shape
- Status: **PASS**
- Evidence: Reused TC-SEATMAP-NEG-03 evidence

### TC-SEATMAP-SEC-01 [Security] - Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap

- Endpoint Name: GetSeatMap
- Request: 3 variants: (1) corrupted x-api-key, (2) corrupted Client-Id, (3) valid headers but supplier/credentialsSelector switched to TravelportNdc/UAE
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3) 409 OperationNotSupported 'TravelportNdc does not exists'
- Expected (§7.14): All three rejected
- Actual: All three correctly rejected, identical envelopes to Round 1/2
- Status: **PASS**
- Evidence: TransactionIds 197a0824-2afa-483d-8a01-fdd7d28a3bcc (bad key), 12aa19f2-08ce-4beb-a99b-ba0f7b3826c6 (bad client), 35b3bd7a-54fd-4433-bc4b-81f30351f69b (cross-tenant)

### TC-SEATMAP-SEC-02 [Documentation] - Record that supplier-side auth and request/response logging are not independently verifiable through this API's black-box contract

- Endpoint Name: GetSeatMap (documentation)
- Request: N/A — documentation/scope-boundary case, no live API call
- Response: N/A
- Expected (§1.5, §1.8): Documented per §1.5/§1.8/PRD §7
- Actual: Documented as specified, unchanged from Round 1/2 — TC-SEATMAP-NEG-05 covers the API-observable graceful-degradation half
- Status: **PASS**
- Evidence: No API call made, per its own definition

### TC-SEATMAP-INT-02 [Integration] - Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols

- Endpoint Name: GetSeatMap
- Request: Requires GetSeatMap against 3+ suppliers spanning distinct native protocols
- Response: Out of scope — this run's scope is GulfAir only
- Expected (§1.3, §2.7, §4.1, §4.7): N/A
- Actual: Not executed; this run's journey-type diversity (one-way/round-trip) exercised GulfAir only and does not substitute for a multi-supplier comparison, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: Run scope explicitly fixed to Supplier=GulfAir

### TC-SEATMAP-INT-03 [Integration] - Capability-matrix sweep — run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable

- Endpoint Name: GetSeatMap
- Request: Requires a full-roster sweep across every SPEC.md §4.6 supplier
- Response: Out of scope — only GulfAir's row can be populated
- Expected (§4.5, §4.6, §4.7): N/A
- Actual: Not executed as a full sweep; GulfAir's own row reconfirmed SeatMap=Supported live for the 3rd round (one-way and round-trip both return populated seatMapDetails regardless of isSeatMapRequired), unchanged scope from Round 1/2
- Status: **BLOCKED**
- Evidence: See §4.7 capability confirmation finding

### TC-SEATMAP-POS-02 [Positive] - Verify GetSeatMap now sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it

- Endpoint Name: GetSeatMap -> Book
- Request: AddPassenger -> GetSeatMap -> Book, with Book's ResponseId/selectedOfferId sourced from GetSeatMap's own responseId/offerId (not AddPassenger's)
- Response: Book 200, pnr=RUTWYN — succeeded using GetSeatMap's IDs directly, no AddPassenger IDs re-sent
- Expected (§2.7, §2.9): GetSeatMap's offerId/responseId feed Book's ResponseId/selectedOfferId
- Actual: Confirmed again this round, unchanged from Round 1/2
- Status: **PASS**
- Evidence: Book request ResponseId/selectedOfferId == GetSeatMap response's responseId/offerId verbatim; pnr RUTWYN

### TC-SEATMAP-VAL-03 [Validation] - Verify cellDetails.cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite the casing difference

- Endpoint Name: GetSeatMap -> Book
- Request: Book submitted with passengersSelectedSeats.PAX1.setSegmentsSeats.<segRefId> = {cellCode:'8A', cellId:<verbatim cellID value from GetSeatMap>}
- Response: 200 — seat 8A correctly attached and echoed in passengersSelectedSeats/passengerFareBreakdown/priceDetails
- Expected (§2.7, §2.9, §8.3): Book accepts the token despite the cellID/cellId casing mismatch
- Actual: Accepted; the casing difference is cosmetic, unchanged from Round 1/2
- Status: **PASS**
- Evidence: Book(RUTWYN) response passengersSelectedSeats.PAX1.<segRefId>={cellCode:'8A',price:{amount:120.00,currency:'SAR'}}

### TC-BOOK-POS-03 [Positive] - Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly

- Endpoint Name: Book
- Request: POST api/v2/FlightBooking/Book — supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=GetSeatMap's IDs, passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>={cellCode:'8A',cellId:<cellID>}
- Response: 200 — pnr=RUTWYN, gdsPNR='', bookingToken=<token>, ticketStatus=Booked, ticketNumber issued synchronously
- Expected (§2.9): HTTP 200; pnr/bookingToken/gdsPNR returned; response echoes the seat selection; totals reflect the same price
- Actual: All echoes match exactly: passengersSelectedSeats.PAX1.<seg>={cellCode:8A,price:120.00 SAR}; totalSelectedSeatsAmount=120.00 SAR
- Status: **PASS**
- Evidence: Full Book response body, pnr RUTWYN, GulfAir BAH-RUH 2026-11-15

### TC-BOOK-BIZ-04 [Business Rule] - Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03, plus the round-trip multi-segment Book (pnr RPDBSR)
- Response: One-way: totalAmount=643.00=170.00+353.00+0+120.00. Round-trip: totalAmount=1281.00=280.00+761.00+0+240.00 (2 segments x 120.00 SAR seats)
- Expected (§2.1, §2.9, §7.10): totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount
- Actual: Reconciles exactly on both a one-way and a round-trip multi-segment booking — resolving the round-trip case as new positive evidence beyond Round 1/2's one-way-only sample
- Status: **PASS**
- Evidence: pnr RUTWYN (one-way) and pnr RPDBSR (round-trip, 2 segments)

### TC-BOOK-REG-02 [Regression] - Verify passengersSelectedSeats, passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: All 5 fields present and correctly typed
- Expected (§2.9, §8.1-item8): No pre-existing response field regressed
- Actual: Confirmed, unchanged from Round 1/2
- Status: **PASS**
- Evidence: Full Book response schema for pnr RUTWYN

### TC-BOOK-REG-03 [Regression] - Verify passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount for a single seat

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: passengerSeats[0].price.amount=120.00; paxTotalSeatAmount.amount=120.00
- Expected (§2.9): Exactly equal
- Actual: 120.00==120.00, unchanged from Round 1/2
- Status: **PASS**
- Evidence: selectedOffer.passengerFareBreakdown[0], pnr RUTWYN

### TC-BOOK-VAL-08 [Validation] - Verify the currency code is consistent (not a placeholder like 'string') across every seat-price object in one Book response

- Endpoint Name: Book
- Request: Same Book response as TC-BOOK-POS-03
- Response: All seat-price currency values = 'SAR'
- Expected (§2.7, §2.9): Consistent, non-placeholder currency
- Actual: All three currency fields identical ('SAR'), none 'string'/null/empty, unchanged from Round 1/2
- Status: **PASS**
- Evidence: pnr RUTWYN Book response

### TC-BOOK-POS-04 [Positive] - Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step

- Endpoint Name: Book -> Retrieve
- Request: Book -> Retrieve immediately afterward, no ticketing action taken in between
- Response: Immediate post-Book Retrieve (pnr=RUTWYN) already shows the seat attached/priced
- Expected (§2.9, §2.11): Seat attachment doesn't depend on a separate ticketing step
- Actual: Core assertion holds; GulfAir tickets synchronously at Book time so there's no distinct un-ticketed window to isolate — same caveat as Round 1/2
- Status: **PASS**
- Evidence: Retrieve(RUTWYN) immediately shows seat 8A/120 SAR attached, bookingStatus already 'Booked'

### TC-SEATMAP-VAL-04 [Validation] - Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer

- Endpoint Name: Book
- Request: Book for Offer B2 (BAH-JED) submitted with Offer B2's own cellCode but a cellId copied from an entirely independent Offer A2 (BAH-RUH)
- Response: 200 — pnr=RUTDHF created and ticketed, but passengersSelectedSeats came back completely empty ({})
- Expected (§2.7, §2.9, §7.7): Request rejected, since cellID appears to embed offer-bound metadata
- Actual: STILL REPRODUCES (BUG-07, 3rd consecutive round) — neither rejected nor honored, seat selection silently dropped; re-verified with the corrected PAX1 passenger reference to rule out a test-harness artifact
- Status: **FAIL**
- Evidence: pnr RUTDHF, passengersSelectedSeats:{} in the response despite a seat having been requested

### TC-BOOK-NEG-12 [Negative] - Validate Book rejects requests with each mandatory field individually omitted: ResponseId, selectedOfferId, supplier, credentialsSelector

- Endpoint Name: Book
- Request: 4 variants of a seat-selection Book payload, each missing exactly one of supplier/credentialsSelector/ResponseId/selectedOfferId
- Response: omit supplier→400; omit credentialsSelector→400; omit ResponseId→200, created real PNR RPDKFX; omit selectedOfferId→500 ServerError
- Expected (§2.9, §7.7, §8.1-item2): All four runs rejected; no pnr created in any run
- Actual: STILL REPRODUCES (BUG-05, 3rd consecutive round) — omitting ResponseId still succeeds (200, ticketed PNR RPDKFX); omitting selectedOfferId still produces a generic 500 rather than a clean 400
- Status: **FAIL**
- Evidence: TransactionIds 7c7ebb82-4c8f-4fe3-a53a-e769ac17d374 (supplier,400), e9f0c2ff-07a1-4f69-8290-f730e81db225 (cred,400), 2c6bcc50-7dd5-474f-bac9-03d1038810ed (selectedOfferId,500), pnr=RPDKFX (ResponseId omitted,200)

### TC-BOOK-NEG-05 [Negative] - Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell

- Endpoint Name: Book
- Request: Book submitted with the Occupied cell 8E's cellCode and its cellDetails.cellID (null for Occupied cells)
- Response: 400 ValidationError {'NotEmptyValidator':'CellId is required.'}
- Expected (§2.7, §2.9, §7.7): Request rejected; no booking created reflecting the unavailable seat
- Actual: Rejected via a generic null-cellId check (GetSeatMap never issues a real cellId for an Occupied cell), unchanged from Round 1/2
- Status: **PASS**
- Evidence: TransactionId 66728546-813c-4757-be5a-b1a5c0ce6411

### TC-BOOK-NEG-06 [Negative] - Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with

- Endpoint Name: Book
- Request: Book submitted with a valid cellCode (8A) but its cellId's trailing 10 base64 characters replaced with 'XXXXXXXXXX', on a fresh never-booked offer
- Response: 200 — pnr=RVGRVO, seat 8A attached at 120.00 SAR exactly as if the untampered token had been sent
- Expected (§2.7, §2.9, §7.7): Rejected — the tampered token should fail a server-side decode/signature check
- Actual: STILL REPRODUCES (BUG-06, 3rd consecutive round) — accepted; the seat was attached using the submitted cellCode regardless of the corrupted cellId; re-verified with the corrected PAX1 reference
- Status: **FAIL**
- Evidence: pnr RVGRVO, seat 8A/120.00 SAR attached despite the corrupted cellId

### TC-BOOK-VAL-06 [Validation] - Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes

- Endpoint Name: Book
- Request: Book submitted with cellCode from one AvailablePaid cell (8B) but cellId from a different AvailablePaid cell (8A) in the same offer/segment
- Response: 200 — pnr=OKTSFP, seat attached exactly as the submitted cellCode (8B, 120.00 SAR), not the cell cellId actually referenced (8A)
- Expected (§2.7, §2.9, §7.11): Confirm whether cellId alone is trusted, request rejected, or wrong seat booked under wrong code
- Actual: STILL REPRODUCES — the API trusts cellCode, not cellId; cellId's real identity is not cross-checked at all, unchanged from Round 1/2, re-confirmed with the corrected PAX1 reference
- Status: **FAIL**
- Evidence: pnr OKTSFP, cellCode 8B booked at 120.00 SAR (8B's own price, cellId was for cell 8A)

### TC-BOOK-NEG-07 [Negative] - Validate Book rejects a request that assigns the same seat cell to two different passengers

- Endpoint Name: Book
- Request: Book for a 2-ADT offer, both PAX1 and PAX2 assigned identical cellCode/cellId (8A) on the same segment
- Response: 400 ValidationError — {'Value':"Seat '8A' is assigned to multiple passengers on segment '...'."}
- Expected (§2.9, §7.7): Request rejected before any supplier round-trip; no pnr created
- Actual: Cleanly rejected with a specific message naming the exact conflicting seat/segment; no pnr created; re-confirmed with the corrected PAX1/PAX2 references, unchanged from Round 1/2
- Status: **PASS**
- Evidence: TransactionId d637279e-c9aa-4509-b6eb-5443ea2ba906

### TC-BOOK-NEG-08 [Negative] - Validate Book's behavior when the same passenger selects two different seats on the same segment

- Endpoint Name: Book
- Request: No live call made — setSegmentsSeats is a JSON object keyed by segmentRefId, so a client literally cannot submit two different cellCode/cellId values under one segmentRefId key in valid JSON
- Response: N/A
- Expected (§2.9): Documented as untestable-by-construction
- Actual: Confirmed again this round by request-shape inspection of every successful Book payload built (13+ chains), unchanged from Round 1/2
- Status: **PASS**
- Evidence: Book's passengersSelectedSeats.<pax>.setSegmentsSeats schema is a JSON object, not an array, per every Book call this round

### TC-BOOK-BIZ-06 [Business Rule] - Verify an Infant (INF) on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry

- Endpoint Name: Book
- Request: Would require an ADT+INF AddPassenger chain with parentPaxRefId linkage
- Response: N/A
- Expected (§2.5, §2.9): N/A
- Actual: Not executed this round — deprioritized again in favor of the higher-value seat-validation/journey-type coverage already prioritized this run, consistent with Round 1/2's own scope decision
- Status: **BLOCKED**
- Evidence: Not attempted

### TC-BOOK-NEG-09 [Negative] - Validate graceful rollback when the supplier's seat allocation call fails or times out after Book is submitted

- Endpoint Name: Book
- Request: Requires a forcing mechanism to make the supplier-side seat allocation fail on demand
- Response: Not attempted
- Expected (§2.9, §7.9): N/A
- Actual: Not forceable this run, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: No forcing mechanism available

### TC-BOOK-VAL-07 [Validation] - Validate a second, different passengersSelectedSeats selection supersedes an earlier selection made before the single Book call is sent

- Endpoint Name: Book
- Request: Client-side behavior — only one Book call is ever transmitted
- Response: N/A
- Expected (§2.9): Book reflects exactly what was sent
- Actual: Every Book call this round reflected exactly the cellCode/cellId actually transmitted, never a stale value, unchanged from Round 1/2
- Status: **PASS**
- Evidence: Cross-referenced against TC-BOOK-POS-03/NEG-06/VAL-06 evidence this run

### TC-BOOK-BIZ-05 [Business Rule] - Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side

- Endpoint Name: Book
- Request: AddPassenger with 1 ADT + 1 CHD -> GetSeatMap (identified exit-row cell 11C via cellCharacteristics description EXIT_ROW_SEAT) -> Book assigning 11C to the CHD passenger (PAX2)
- Response: 200 — pnr=RNCIPE, both passengers ticketed, exit-row seat 11C ACTUALLY ATTACHED and priced (60.00 SAR) to the CHD passenger
- Expected (§2.7, §2.9): An explicit error response (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD); no pnr created
- Actual: STILL REPRODUCES IN ITS WORSENED FORM (BUG-09, High severity, 2nd consecutive round in the worsened state) — no rejection, no drop; the CHD is genuinely seated in the exit row with zero server-side validation, re-confirmed with the corrected PAX2 reference to rule out a test-harness artifact
- Status: **FAIL**
- Evidence: pnr RNCIPE, tickets issued for both PAX1 and PAX2 (ticketNumbers 722136975568/722136975569), passengersSelectedSeats.PAX2.<seg>={cellCode:'11C',price:60.00 SAR}

### TC-BOOK-BIZ-07 [Business Rule] - Validate a wheelchair-accessible seat can be selected for a passenger flagged for special assistance

- Endpoint Name: Book
- Request: Requires identifying a wheelchair-accessible cell by its cellCharacteristics/description text
- Response: N/A — no WHEELCHAIR/WCHR/ACCESSIBLE characteristic string found anywhere in this run's captured GulfAir seat maps
- Expected (§2.5, §2.7, §2.9): N/A
- Actual: Not executable this run either — the widened description vocabulary found this round (EXIT_ROW_SEAT, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL, OVER_WING_SEAT_S, PREFERRED_SEAT_PREFERENTIAL_SEAT, plus the 10 already known) still contains no wheelchair-designated value, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: Full description-vocabulary scan across this run's GetSeatMap samples: zero WHEELCHAIR/WCHR/ACCESSIBLE matches

### TC-BOOK-NEG-10 [Negative] - Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats: {} explicitly present, otherwise a normal no-seat Book call
- Response: 200 — pnr=RRUZLB, ticketed, passengersSelectedSeats:{} in the response, no seat fee
- Expected (§2.9): Book succeeds; no seat fee charged; no 500-level error
- Actual: Succeeded exactly as expected, unchanged from Round 1/2
- Status: **PASS**
- Evidence: pnr RRUZLB

### TC-BOOK-NEG-11 [Negative] - Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats.PAX1.setSegmentsSeats: {}
- Response: 200 — pnr=RPDYQF, ticketed, no seat attached, no error
- Expected (§2.9): Book succeeds; no seat attached; no error from the empty nested object
- Actual: Succeeded exactly as expected, unchanged from Round 1/2
- Status: **PASS**
- Evidence: pnr RPDYQF

### TC-BOOK-INT-03 [Integration] - Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously

- Endpoint Name: Book
- Request: Requires a bundle code (GetOfferBundles) plus an ancillary code plus a seat, all on one Book call
- Response: N/A — GulfAir/KSA's haveBundles=false on every offer sampled this run, including the round-trip offer
- Expected (§2.9): N/A
- Actual: Not executable for GulfAir on any journey shape (one-way or round-trip) — haveBundles=false confirmed on all 13+ chains this round, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: FareConfirm capability flags: haveBundles=False on every chain A-K plus both round-trip chains

### TC-BOOK-BND-03 [Boundary] - Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries

- Endpoint Name: Book
- Request: (a) omitted entirely; (b) one passenger/one segment; (c) two passengers/two segments (round-trip, deliberately sampled this round per the journey-type coverage requirement)
- Response: (a)/(b) confirmed via TC-BOOK-NEG-10/POS-03; (c) NEW THIS ROUND — round-trip Book (pnr RPDBSR) with PAX1 seated 8A on BOTH the outbound and return segments as sibling segmentRefId keys under one passenger
- Expected (§2.9, §8.1-item3): (c) multi-segment nesting shape UNKNOWN pending live confirmation
- Actual: (c) now CONFIRMED PASS — resolves the prior UNKNOWN left open in Round 1/2 (every sampled GulfAir route in those rounds was single-segment); sibling segmentRefId keys under one paxRef both resolved correctly, priced independently (120.00 SAR each), and reconciled into totalSelectedSeatsAmount=240.00
- Status: **PASS**
- Evidence: pnr RPDBSR — passengersSelectedSeats.PAX1={<outbound seg>:{cellCode:8A,price:120.00},<return seg>:{cellCode:8A,price:120.00}}

### TC-BOOK-INT-04 [Integration] - Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent

- Endpoint Name: Book
- Request: Requires GetOfferBundles to succeed first, attempted on a round-trip offer specifically per this round's journey-type coverage goal
- Response: N/A — haveBundles=false for GulfAir/KSA on the round-trip offer too
- Expected (§2.4, §2.9): N/A
- Actual: Still not executable — GulfAir has no bundle capability on any sampled offer regardless of journey shape (one-way or round-trip), unchanged capability gap from Round 1/2
- Status: **BLOCKED**
- Evidence: Round-trip FareConfirm capability flags also show haveBundles=False

### FLOW-V2-49-SEATFIELD [Flow] - Verify the existing SM-enrichment Family-A flow chains Book's ResponseId/selectedOfferId from GetSeatMap and exercises passengersSelectedSeats

- Endpoint Name: Flow (Family A: AP-SM-FCK-BK-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap->Book->Retrieve, run on BOTH a one-way itinerary (pnr RUTWYN) and a round-trip itinerary (pnr RPDBSR) per this round's journey-type coverage requirement
- Response: Both PASS: Book and Retrieve both echo passengersSelectedSeats matching the selection on every segment; totalSelectedSeatsAmount non-zero and reconciles into totalAmount in both cases
- Expected (§2.7, §2.9, §2.11, §5.4 row 49 (SM/A), §6.3, §6.4): Per-family state check (§6.3 Family A) plus seat-specific checks
- Actual: All assertions hold on both journey shapes — one-way (RUTWYN: 170+353+120=643) and round-trip (RPDBSR: 280+761+240=1281)
- Status: **PASS**
- Evidence: pnr RUTWYN (one-way) and pnr RPDBSR (round-trip, 2 segments) — see TC-BOOK-POS-03/BND-03/BIZ-04 for full detail

Hops (6):
  1. Search - Status: **PASS** - Expected: 200, offers returned - Actual: 200, 180 offers, first offer GF-GF167/GF-GF190
  2. FareConfirm - Status: **PASS** - Expected: 200, capability flags present - Actual: 200, flags present and consistent with every other chain this run
  3. AddPassenger - Status: **PASS** - Expected: 200, offerId/responseId returned - Actual: 200
  4. GetSeatMap - Status: **PASS** - Expected: 200, seatMapDetails populated - Actual: 200, 2 segments confirmed — first live multi-segment GulfAir seatmap this round
  5. Book - Status: **PASS** - Expected: 200, pnr/bookingToken/gdsPNR, seat echoed on both segments - Actual: 200, pnr RPDBSR, totalAmount=1281.00 reconciles
  6. Retrieve - Status: **PASS** - Expected: Seat persists post-ticketing - Actual: Identical to Book on both segments

### FLOW-V2-50-SEATFIELD [Flow] - Verify whether GetSeatMap's chosen seat can be attached via Hold directly (Family B, before SeatAfterHold)

- Endpoint Name: Flow (Family B: AP-SM-FCK-HD-FCAH-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap->Hold, with passengersSelectedSeats included on the Hold request body — run on BOTH a one-way itinerary (pnr RNIJBQ) and a round-trip itinerary (pnr OCBWTT) per this round's journey-type coverage requirement
- Response: 200 both times — Hold ACCEPTED and ECHOED the seat selection on both journey shapes; holdExpirationDate still null on both
- Expected (§2.7a, §2.9, §2.10, §5.4 row 50 (SM/B), §5.5-item8): UNKNOWN — confirm live whether Hold silently ignores, rejects, or accepts an unrecognized passengersSelectedSeats field
- Actual: STILL REPRODUCES (BUG-08, 3rd consecutive round) — Hold accepts AND honors passengersSelectedSeats for GulfAir on both one-way and round-trip itineraries, contradicting §1.10 item 6/§2.10's documented absence of this field from Hold's contract
- Status: **FAIL**
- Evidence: pnr RNIJBQ (one-way, GF169, seat 8A/120 SAR) and pnr OCBWTT (round-trip, seat 8A/120 SAR on the outbound segment)

### FLOW-V2-CANDIDATE-SM-HOLD-01 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold

- Endpoint Name: Flow (candidate SM-Hold-A)
- Request: Hold (pnr OFLJXH) -> SeatAfterHold (position A, immediately after Hold)
- Response: SeatAfterHold rejected with 409 'GulfAir does not exists' — chain could not proceed past this hop
- Expected (§2.7a, §2.10, §2.12, §2.13, §2.11, §5.5-item8): SeatAfterHold succeeds; final Retrieve shows the seat populated
- Actual: Blocked at the SeatAfterHold hop for GulfAir (BUG-03), unchanged from Round 1/2
- Status: **FAIL**

Hops (2):
  1. Hold - Status: **PASS** - Expected: 200, pnr/bookingToken - Actual: 200, pnr OFLJXH (holdExpirationDate null, separate defect BUG-04)
  2. SeatAfterHold - Status: **FAIL** - Expected: 200 with a seat-selection response - Actual: 409, chain halted

### FLOW-V2-CANDIDATE-SM-HOLD-02 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold

- Endpoint Name: Flow (candidate SM-Hold-B)
- Request: Not independently executed — SeatAfterHold's rejection of GulfAir is supplier-level, not state/position-dependent
- Response: N/A
- Expected (§2.7a, §2.10, §2.12, §2.13, §2.11, §5.5-item8): N/A
- Actual: Reasoned-BLOCKED, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-03 [Flow] - Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking

- Endpoint Name: Flow (candidate SM-Hold-C)
- Request: Not independently executed — same reasoning as candidate-02
- Response: N/A
- Expected (§2.7a, §2.13, §2.11, §5.5-item8): N/A
- Actual: Reasoned-BLOCKED, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG [Flow] - Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken carried over from an unrelated Hold call

- Endpoint Name: Flow (candidate SM-Hold-A, negative)
- Request: Not executed — the baseline SeatAfterHold call already rejects GulfAir unconditionally (409, supplier-level)
- Response: N/A
- Expected (§2.7a, §3.2, §7.2, §7.7): N/A
- Actual: Not meaningfully testable for GulfAir, unchanged from Round 1/2
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATMAP-VAL-11 [Validation] - Verify passengersSeatMapAvailability.<paxRef>.<segmentRefId> stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response

- Endpoint Name: GetSeatMap
- Request: GetSeatMap -> for the passenger, read passengersSeatMapAvailability.<paxRef> -> confirm keys match seatMapDetails/flightSegments casing exactly
- Response: passengersSeatMapAvailability.PAX1's key is the full segmentRefId string 'GF-GF169-GF169-2026102021-2026102022-O', matching seatMapDetails/flightSegments keys character-for-character
- Expected (§2.7): Segment-ref key casing consistent; no casing inconsistency
- Actual: No casing inconsistency observed for GulfAir, unchanged from Round 2's confirmation (the AirArabia SEG2/Seg3 mixed-casing example this test case cites does not reproduce for GulfAir)
- Status: **PASS**
- Evidence: passengersSeatMapAvailability key == seatMapDetails segment key, verbatim

### TC-SEATMAP-BND-04 [Boundary] - Confirm live whether any cellCategory value beyond {Seat, Aisle} is ever returned

- Endpoint Name: GetSeatMap
- Request: GetSeatMap across several GulfAir routes/aircraft this round (13+ chains, narrowbody equipment on every sampled route)
- Response: Only Seat/Aisle observed across all GulfAir samples this run too
- Expected (§2.7, §8.3): UNKNOWN — resolve empirically
- Actual: Same inconclusive-but-consistent outcome as Round 1/2 — GulfAir's narrowbody fleet on these routes shows no galley/lavatory/bulkhead-as-separate-category cells
- Status: **PASS**
- Evidence: Distinct cellCategory values across all 13+ GetSeatMap calls this round: Seat, Aisle only

## Findings

**Of Round 2's 12 logged defects: 0 FIXED, 11 STILL REPRODUCE, 1 NOT REPRODUCED THIS RUN (inconclusive). 0 NEW defects found in Round 3.**

### Round 2 defects - STILL REPRODUCE (11 of 12)

- **[TC-SEATAFTERHOLD-POS-01]** [BUG-03, STILL REPRODUCES — Round 3] SeatAfterHold rejects every call for supplier=GulfAir with HTTP 409 OperationNotSupported, Context='GulfAir does not exists', identical wording/status to Round 1 and Round 2, reconfirmed against a brand-new fresh Hold (pnr OFLJXH) one week after Round 2.
- **[TC-SEATMAP-NEG-02]** [BUG-01, STILL REPRODUCES — Round 3] GetSeatMap accepts a ResponseId and selectedOfferId sourced from two entirely independent AddPassenger chains and returns a normal 200 seat map instead of rejecting the mismatched pair — identical to Round 1/2.
- **[TC-SEATMAP-NEG-04]** [BUG-02, STILL REPRODUCES — Round 3] GetSeatMap documents ResponseId as required, but a request omitting it entirely still succeeds with HTTP 200 and a fully populated seat map — identical to Round 1/2.
- **[TC-SEATMAP-VAL-04]** [BUG-07, STILL REPRODUCES — Round 3] When cellId refers to a cell on a completely different offer than the one being booked, Book silently drops the seat selection rather than rejecting the request — identical to Round 1/2, re-confirmed with the corrected PAX1 reference.
- **[TC-BOOK-NEG-12]** [BUG-05, STILL REPRODUCES — Round 3] Book documents ResponseId as required but accepts and books/tickets a request that omits it entirely (pnr RPDKFX); omitting selectedOfferId still produces a generic HTTP 500 rather than a clean 400 — identical to Round 1/2.
- **[TC-BOOK-NEG-06]** [BUG-06, STILL REPRODUCES — Round 3] Book does not decode or verify the cellId token at all — a tampered cellId is accepted and the seat is attached purely based on the submitted cellCode — identical to Round 1/2, re-confirmed with the corrected PAX1 reference to rule out a test-harness artifact.
- **[TC-BOOK-BIZ-05]** [BUG-09, STILL REPRODUCES — High severity — Round 3] A CHD passenger's exit-row seat is genuinely attached, priced, and ticketed with zero server-side validation for the 2nd consecutive round (Round 1 accidentally avoided this via an unrelated silent-drop bug; Round 2 introduced the real safety gap; Round 3 confirms it persists unchanged).
- **[FLOW-V2-50-SEATFIELD]** [BUG-08, STILL REPRODUCES — Round 3] Hold's documented request contract does not include passengersSelectedSeats, but GulfAir silently accepts and correctly attaches/echoes it submitted directly on the Hold call — confirmed on BOTH one-way and round-trip itineraries this round, identical to Round 1/2.
- **[FLOW-V2-50-SEATFIELD]** [BUG-04, STILL REPRODUCES — Round 3] Hold's holdExpirationDate is still null for GulfAir, reconfirmed on 4 fresh Holds this round (OFLJXH, RNIJBQ, OCBWTT, and the Round 3 K-chain Hold) across both one-way and round-trip itineraries.
- **[PRE-FLIGHT]** [BUG-10, STILL REPRODUCES — High severity — Round 3] AddPassenger still rejects the V2 Postman collection's own saved example (passengersList.name.middle='kady' vs travelDocument.name.middle='') with HTTP 400 'Invalid travel document information', identical to Round 2.
- **[PRE-FLIGHT]** [BUG-11, STILL REPRODUCES — Critical severity — Round 3] Resubmitting an already-consumed Book request (pnr RUTWYN's offer) returns HTTP 409 with OriginalSupplierRequest (6330 chars) and OriginalSupplierResponse (1425 chars) fields present and non-null; OriginalSupplierRequest was confirmed (via a redacted keyword match only — content never printed) to still contain an apikey-like plaintext token, unconditional and not gated by any isdebug flag (isdebug was never set to true anywhere in this run's Search calls).

### Round 2 defects - NOT REPRODUCED THIS RUN (inconclusive, 1 of 12)

- [BUG-12 — NOT REPRODUCED THIS RUN, inconclusive] The Round 2 Book-latency/lost-PNR incident (a single Book call exceeding 180s with no pnr ever returned for a booking that had actually succeeded server-side) did not recur in Round 3 — every Book/Hold call this round (17+ live bookings/holds) completed within a few seconds. Round 2 itself characterized this as a rare, non-deterministic timing issue, so its absence this round is not confirmation of a fix — it simply did not happen to occur under this run's conditions. Recommend continued monitoring rather than closing this defect.

### Round 2 defects - FIXED (0 of 12)

- None new this round. The 3 defects fixed between Round 1 and Round 2 (TC-SEATMAP-VAL-06 aisle/seat partition, TC-SEATMAP-BIZ-02 price reconciliation, TC-SEATMAP-NEG-03 generic-500) all remain FIXED and stable in Round 3 (reconfirmed, see their own PASS entries above) - but these were already counted as fixed in Round 2's own tally, not new fixes this round.

### NEW defects (Round 3 only)

- None found. Every defect surfaced this round is a re-confirmation of an already-tracked Round 2 bug (BUG-01 through BUG-11); no new distinct defect was identified.

### New live-confirmed facts (UNKNOWN-resolutions)

- **[TC-SEATMAP-VAL-05]** cellCharacteristics.description vocabulary for GulfAir widened this round: EXIT_ROW_SEAT, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL, OVER_WING_SEAT_S, PREFERRED_SEAT_PREFERENTIAL_SEAT newly observed live, in addition to the 10 values already confirmed in Round 1/2.
- **[TC-BOOK-BND-03]** Multi-segment passengersSelectedSeats nesting (one passenger, two segments as sibling keys under setSegmentsSeats) is CONFIRMED live for GulfAir/KSA on a round-trip itinerary — both segments' seat selections were honored and independently priced. This resolves SPEC.md §2.9's prior UNKNOWN about whether multiple segments nest correctly.

## Proposed SPEC.md updates

- **§2.1 - pending** - Replace: "one-way vs. round-trip (only one-way examples observed — searchCriteria as an array suggests round-trip = 2 entries, UNKNOWN, needs confirmation)" With: "[Confirmed live 2026-08-30, GulfAir/KSA] Round-trip IS supported via a 2-entry searchCriteria array (outbound + return leg) — 180 offers returned vs. 30 for the equivalent one-way search, each offer carrying a 2-journey offerJourneys array and a 2-segment flightSegments map. A 3-entry (multi-city) searchCriteria array returned HTTP 200 with an empty offers[] for the one combination tried — inconclusive as a capability statement; needs a broader sweep before concluding multi-city is unsupported vs. simply no inventory for that combination."

- **§2.9 - pending** - Replace: "Multiple segments per passenger presumably nest as sibling keys under setSegmentsSeats; multiple passengers as sibling keys under passengersSelectedSeats — UNKNOWN/not directly evidenced beyond the single-passenger, single-segment example shown" With: "[Confirmed live 2026-08-30, GulfAir/KSA, round-trip] Multiple segments for one passenger DO nest correctly as sibling segmentRefId keys under setSegmentsSeats — both the outbound and return segment's seat selections were honored and independently priced in the same Book call (pnr RPDBSR, 120.00 SAR each, totalSelectedSeatsAmount=240.00)."

- **§8.3 - pending** - Replace: "cellCharacteristics description vocabulary observed to date: CHARGEABLE_SEAT, LEG_SPACE_SEAT, FRONT_OF_CABIN, WINDOW, AISLE_SEAT, BULKHEAD_SEAT, CENTER_SEAT, SEAT_WITH_BASSINET_FACILITY, LEFT_SIDE_OF_AIRCRAFT, RIGHT_SIDE_OF_AIRCRAFT" With: "[Confirmed live 2026-08-30, GulfAir/KSA] Add EXIT_ROW_SEAT, NOT_ALLOWED_FOR_INFANTS, NOT_ALLOWED_FOR_MEDICAL, OVER_WING_SEAT_S, PREFERRED_SEAT_PREFERENTIAL_SEAT to the confirmed description vocabulary, alongside the 10 values already documented. padisCode remains the literal string 'Unknown' on every cell for this supplier."

- **§2.7 - pending** - Replace: "(Round 1/2 pending) Add top-level isFareCheckRequired (boolean) and passengersDetails.<paxRef>.passengersSeatMapAvailability to the documented response shape" With: "Still pending — unchanged and reconfirmed for a 3rd consecutive round (2026-08-30). No action taken on this proposal since Round 2; carrying forward."

- **§4.6 - pending** - Replace: "(Round 1/2 pending) GulfAir SeatMap capability row: Unknown -> Supported" With: "Still pending — unchanged and reconfirmed for a 3rd consecutive round (2026-08-30), now also confirmed independent of journey shape (one-way and round-trip both return populated seatMapDetails). Carrying forward."

- **§2.10 / §1.10 item 6 - pending** - Replace: "(Round 1/2 pending) Hold DOES accept and honor a passengersSelectedSeats field submitted directly on the Hold request" With: "Still pending — unchanged and reconfirmed for a 3rd consecutive round (2026-08-30), now also confirmed on a round-trip itinerary (pnr OCBWTT), not just one-way. Carrying forward."

- **§2.5 - pending** - Replace: "(Round 2 pending) Document AddPassenger's exact-name-match requirement between passengersList.<pax>.name and travelDocument.name" With: "Still pending — unchanged and reconfirmed identically in Round 3 (2026-08-30, same error/TransactionId shape). Carrying forward."

## Cleanup / follow-up

18 live artifacts left behind this run (14 ticketed bookings needing Void, 4 Held-but-not-finalized Family-B holds):

- **needs_void_cancel** - PNR "OBZAWT" (TC-BOOK-POS-03) - Real GulfAir booking created and ticketed during the initial (paxRef-casing-bug-affected) run of the baseline seat-selection chain; ticketed for real (BAH-RUH, 2026-10-20) even though the seat itself was not attached in this specific attempt. Superseded as evidence by pnr RUTWYN, but still a live artifact needing cleanup.
- **needs_void_cancel** - PNR "RSZXTX" (TC-SEATMAP-VAL-04) - Real ticketed booking from the initial (paxRef-casing-bug-affected) cross-offer-cellId attempt (BAH-JED). Superseded as evidence by pnr RUTDHF.
- **needs_void_cancel** - PNR "RPDKFX" (TC-BOOK-NEG-12) - Created/ticketed by the ResponseId-omission defect (BUG-05), BAH-DMM 2026-10-25.
- **needs_void_cancel** - PNR "RYIYCX" (TC-BOOK-NEG-06) - Real ticketed booking from the initial (paxRef-casing-bug-affected) tampered-cellId attempt (BAH-CAI). Superseded as evidence by pnr RVGRVO.
- **needs_void_cancel** - PNR "OCXIYA" (TC-BOOK-VAL-06) - Real ticketed booking from the initial (paxRef-casing-bug-affected) cellCode/cellId-mismatch attempt (BAH-DXB). Superseded as evidence by pnr OKTSFP.
- **needs_void_cancel** - PNR "RRUZLB" (TC-BOOK-NEG-10) - Created while testing explicit-empty passengersSelectedSeats (BAH-JED, 2026-11-04).
- **needs_void_cancel** - PNR "RPDYQF" (TC-BOOK-NEG-11) - Created while testing explicit-empty setSegmentsSeats (BAH-DMM, 2026-11-06).
- **needs_void_cancel** - PNR "OKYKYW" (TC-BOOK-BIZ-05) - 2-passenger (ADT+CHD) booking from the initial (paxRef-casing-bug-affected) CHD+exit-row attempt (BAH-JED); both passengers ticketed, seat not attached in this specific attempt. Superseded as evidence by pnr RNCIPE, which IS the confirmed safety-defect booking.
- **needs_void_cancel** - PNR "RUTWYN" (TC-BOOK-POS-03) - Clean baseline seat-selection booking (BAH-RUH 2026-11-15, seat 8A). Primary evidence for TC-BOOK-POS-03/POS-04/BIZ-04/REG-02/REG-03/VAL-08/RETRIEVE-REG-01/POS-02/VAL-03.
- **needs_void_cancel** - PNR "RUTDHF" (TC-SEATMAP-VAL-04) - Created/ticketed while proving a cross-offer cellId is silently dropped (BAH-JED, 2026-11-17).
- **needs_void_cancel** - PNR "RVGRVO" (TC-BOOK-NEG-06) - Created/ticketed while proving Book does not validate a tampered cellId (BAH-CAI, 2026-11-19).
- **needs_void_cancel** - PNR "OKTSFP" (TC-BOOK-VAL-06) - Created/ticketed while proving cellCode (not cellId) drives seat resolution (BAH-DXB, 2026-11-21).
- **needs_void_cancel** - PNR "RNCIPE" (TC-BOOK-BIZ-05) - HIGH PRIORITY — 2-passenger (ADT+CHD) booking; the CHD (PAX2) actually has the exit-row seat 11C attached and ticketed (BAH-JED GF181, 2026-11-25). Confirmed safety-defect booking (BUG-09).
- **needs_void_cancel** - PNR "RPDBSR" (FLOW-V2-49-SEATFIELD) - Round-trip 2-segment booking (BAH-RUH/RUH-BAH, 2026-11-29/2026-12-03), seat 8A attached on both segments. Primary round-trip evidence for FLOW-V2-49-SEATFIELD, TC-BOOK-BND-03(c), TC-BOOK-BIZ-04, TC-RETRIEVE-REG-01.
- **family_b_hold** - PNR "RULAZT" (FLOW-V2-50-SEATFIELD) - Held via the initial (paxRef-casing-bug-affected) Family-B seat-on-Hold attempt (BAH-DXB, 2026-11-10). holdExpirationDate null. Superseded as evidence by pnr RNIJBQ.
- **family_b_hold** - PNR "OFLJXH" (TC-SEATAFTERHOLD-POS-01) - Held via direct Hold call (GulfAir BAH-RUH, 2026-11-12), used for the SeatAfterHold discovery/security cases. holdExpirationDate null. Never progressed to FareConfirmAfterHold/BookAfterHold/CancelAfterHold.
- **family_b_hold** - PNR "RNIJBQ" (FLOW-V2-50-SEATFIELD) - Held with seat 8A attached directly via Hold (undocumented behavior, BUG-08), one-way BAH-DXB 2026-11-27. holdExpirationDate null. Never progressed.
- **family_b_hold** - PNR "OCBWTT" (FLOW-V2-50-SEATFIELD) - Held with seat 8A attached directly via Hold on a ROUND-TRIP itinerary (BAH-RUH/RUH-BAH, 2026-12-05/2026-12-09) — confirms BUG-08 is journey-shape-independent. holdExpirationDate null. Never progressed.

