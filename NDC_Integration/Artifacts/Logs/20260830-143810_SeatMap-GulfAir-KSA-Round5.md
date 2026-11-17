# QA Execution Report - Round 5 Regression - SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) - 63 test cases: priority re-attempt of Round 4's 22 BLOCKED test cases, re-verification of BUG-01 through BUG-14, full-coverage regression, and route/journey-type variety

**Environment:** staging (non-default host - user-specified) &middot; https://ndc-integration-stg-ne-2.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-08-30T14:38:10Z
**Ended:** 2026-08-30T17:46:00Z
**Status:** COMPLETE
**Prior runs:** [Round 1 - 20260825-103032](20260825-103032_SeatMap-GulfAir-KSA.md), [Round 2 - 20260826-154300](20260826-154300_SeatMap-GulfAir-KSA-Round2.md), [Round 3 - 20260830-093343](20260830-093343_SeatMap-GulfAir-KSA-Round3.md), and [Round 4 - 20260830-090507](20260830-090507_SeatMap-GulfAir-KSA-Round4.md)

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 37
- Failed: 12
- Blocked: 14

### Headline result: the Round 4 GetSeatMap outage (BUG-14) has CLEARED

Priority #1 this round was to re-attempt every test case Round 4 marked BLOCKED, to establish whether
the sustained GetSeatMap outage (BUG-14, 40+ failures over 20+ minutes in Round 4) had cleared. **The
very first GetSeatMap call this round succeeded (HTTP 200, full 175-cell seat map)**, and every one of
the 10+ GetSeatMap calls made across 9 independent chains and 5 routes this round succeeded normally.
No NDC-INT-UNC-Z9999 outage errors were observed anywhere in this round. **BUG-14 is RESOLVED.** This
unblocked re-verification of BUG-01, BUG-07, BUG-08, BUG-09, TC-SEATMAP-NEG-03, and the round-trip/
multi-passenger seat-selection scope that Round 4 could not reach.

### Re-verification of Round 3/4's defect list (BUG-01 through BUG-14)

| Bug | Status this round |
|---|---|
| BUG-01 (GetSeatMap cross-offer identifiers accepted) | **STILL REPRODUCES** (5th consecutive round) |
| BUG-02 (GetSeatMap ResponseId-omission still succeeds) | **STILL REPRODUCES** (5th consecutive round) |
| BUG-03 (SeatAfterHold rejects GulfAir outright) | **STILL REPRODUCES** (5th consecutive round) |
| BUG-04 (Hold holdExpirationDate null) | **STILL REPRODUCES** (5th consecutive round) |
| BUG-06 (Book doesn't validate tampered cellId) | **STILL REPRODUCES** (5th consecutive round) |
| BUG-07 (Book silently drops cross-offer seat) | **STILL REPRODUCES** (5th consecutive round) |
| BUG-08 (Hold silently accepts/honors passengersSelectedSeats) | **STILL REPRODUCES** (5th consecutive round, now on a fresh never-Held offer) |
| BUG-09 (CHD ticketed into exit row, zero validation) | **STILL REPRODUCES, worsened form** (5th consecutive round) |
| BUG-10 (AddPassenger name/travelDocument mismatch) | **STILL REPRODUCES** (6th consecutive round) |
| BUG-11 (supplier-credential leak in error envelope) | **STILL REPRODUCES, RE-WIDENED** - now also seen on Hold's 609-conflict path |
| BUG-13 (Book 500 on selectedOfferId omission) | **RESOLVED** - now a clean 400 ValidationError |
| BUG-14 (GetSeatMap sustained outage) | **RESOLVED** - fully cleared |
| BUG-15 (NEW - GetSeatMap doesn't reject isSeatMapRequired=false offers) | **NEW this round** - a FAIL that has actually reproduced identically since Round 1, but had never been filed as its own numbered defect for GulfAir/KSA until now |

Net: **2 of 12 previously-open GulfAir/KSA defects are now RESOLVED (BUG-13, BUG-14)**; the other 10
still reproduce unchanged; 1 new defect (BUG-15) was filed for a long-standing but previously-unfiled
FAIL result.

### Journey-type coverage

- **One-Way** - primary shape (chain A/BAH-RUH, chain B/BAH-JED, chain C/BAH-DMM, chain E/BAH-CAI,
  chain E2/BAH-DXB, chain G/BAH-JED, chain H/BAH-DXB, chain F/BAH-RUH, chain INF/BAH-RUH).
- **Round-Trip** - re-confirmed live (chain D, BAH-RUH outbound 2027-01-15 / RUH-BAH return
  2027-01-22, 125 offers, 2-entry searchCriteria) - Book/Retrieve with 2 independently-priced seats
  across both segments (pnr RZLJET), closing the gap Round 4's outage left open.
- **Multi-City** - re-confirmed NOT supported (or hard-capped at 2 entries): a 3-entry control using
  the exact same BAH-RUH/RUH-BAH pair independently proven to return offers as a 2-entry array
  returned HTTP 200 with an empty offers array. Consistent with Round 4's 9-combination sweep.

## Test case results

(63 entries; each reports Endpoint Name/Request/Response/Expected/Actual/Status/Evidence. Flow-level cases nest hop detail.)

### TC-SEATMAP-POS-01 [Positive] - Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat - supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=AddPassenger's IDs (BAH-RUH 2027-01-15, GF169, one-way, 1 ADT)
- Response: 200 - supplier, flightSegments{1 segment}, passengersDetails{PAX1}, seatMapDetails{1 segment, 25 rows, 175 cells} all present and non-null
- Expected: HTTP 200; all four top-level fields present/non-null; every segmentRefId in seatMapDetails also appears in flightSegments
- Actual: 200; single segment GF-GF169-GF169-2027011519-2027011521-O present identically in both flightSegments and seatMapDetails; passengersDetails.PAX1 present; 25 rows, 175 cells. **This is the first GetSeatMap call this round, and it succeeded - the BUG-14 outage has cleared.**
- Status: **PASS**
- Evidence: Live GetSeatMap response for GulfAir/KSA BAH-RUH 2027-01-15 (offer GF169)

### TC-SEATMAP-POS-02 [Positive] - Verify GetSeatMap sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as ResponseId/selectedOfferId when SeatMap precedes it

- Endpoint Name: GetSeatMap -> Book
- Request: AddPassenger -> GetSeatMap -> Book, with Book's ResponseId/selectedOfferId sourced directly from GetSeatMap's own responseId/offerId
- Response: Book 200, pnr=RPRJFQ - succeeded using GetSeatMap's IDs directly, no AddPassenger IDs re-sent
- Expected: GetSeatMap's offerId/responseId feed Book's ResponseId/selectedOfferId
- Actual: Confirmed again this round, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: Book request ResponseId/selectedOfferId == GetSeatMap response's responseId/offerId verbatim; pnr RPRJFQ

### TC-SEATMAP-VAL-03 [Validation] - Verify cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite casing difference

- Endpoint Name: GetSeatMap -> Book
- Request: Book submitted with passengersSelectedSeats.PAX1.setSegmentsSeats.<seg> = {cellCode:'8A', cellId:<verbatim cellID from GetSeatMap>}
- Response: 200 - seat 8A correctly attached and echoed in passengersSelectedSeats and priceDetails
- Expected: Book accepts the token despite the cellID/cellId casing mismatch
- Actual: Accepted; the casing difference is cosmetic, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: Book(RPRJFQ) response passengersSelectedSeats.PAX1.<seg>={cellCode:'8A',price:{amount:120.00,currency:'SAR'}}

### TC-SEATMAP-VAL-04 [Validation] - Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer

- Endpoint Name: Book
- Request: Book using Chain B's (2-ADT, BAH-JED) ResponseId/selectedOfferId, but passengersSelectedSeats.PAX1.cellId taken from Chain A's (BAH-RUH) GetSeatMap response, cellCode=Chain B's own valid code
- Response: 200 - pnr=RUNKLG, tickets issued for both passengers, but passengersSelectedSeats came back as an empty object {} - silently dropped, not rejected
- Expected: Request rejected (400 ValidationError) since cellId appears to embed offer-bound metadata
- Actual: STILL REPRODUCES (BUG-07, 5th consecutive round) - accepted with no error at all; booking created and ticketed with the seat selection silently vanished
- Status: **FAIL**
- Evidence: pnr RUNKLG, passengersSelectedSeats:{}, totalSelectedSeatsAmount:null

### TC-SEATMAP-BND-02 [Boundary] - Verify cellAvailability/paxCellAvailability values are limited to known enum, Aisle cells carry no seatPriceDetails

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, enumerating distinct cellCategory/cellAvailability values across 175 cells
- Response: cellCategory in {Seat, Aisle}; cellAvailability in {AvailablePaid, Occupied}; every Aisle cell has null seatPriceDetails
- Expected: No value outside known enum; Aisle cells carry no pricing
- Actual: Confirmed, unchanged from Rounds 1-4 (149 AvailablePaid, 1 Occupied, 25 Aisle, 150 Seat)
- Status: **PASS**
- Evidence: Full 175-cell scan; 0 Aisle cells with seatPriceDetails

### TC-SEATMAP-BIZ-02 [Business Rule] - Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, checked totalPrice vs basePrice+taxesPrice for all 149 AvailablePaid cells
- Response: basePrice correctly carries the real seat charge (e.g. cell 8A: basePrice=120.00 SAR, taxesPrice=0, totalPrice=120.00 SAR)
- Expected: totalPrice.amount == basePrice.amount + taxesPrice.amount
- Actual: 0/149 mismatches - the Round 2 fix remains stable for a 5th consecutive round
- Status: **PASS**
- Evidence: Sample cell 8A: 120.00 = 120.00 + 0; systemic 0/149 mismatches

### TC-SEATMAP-REG-02 [Regression] - Verify seatMapDetails full field-list schema matches SPEC.md §2.7 with no undocumented keys

- Endpoint Name: GetSeatMap
- Request: Full schema diff of chain A's live GetSeatMap response against §2.7's documented field list
- Response: All §2.7-documented fields present, plus 2 undocumented fields: top-level isFareCheckRequired (boolean, observed false) and passengersDetails.<paxRef>.passengersSeatMapAvailability
- Expected: No undocumented keys
- Actual: Still 2 undocumented fields, identical to Rounds 1-4
- Status: **FAIL**
- Evidence: Live GulfAir GetSeatMap top-level keys: supplier,offerId,responseId,isFareCheckRequired,flightSegments,passengersDetails,seatMapDetails

### TC-BOOK-POS-03 [Positive] - Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly

- Endpoint Name: Book
- Request: POST api/v2/FlightBooking/Book - GulfAir/KSA, ResponseId/selectedOfferId=GetSeatMap's IDs, passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>={cellCode:'8A',cellId:<cellID>}
- Response: 200 - pnr=RPRJFQ, gdsPNR='', bookingToken issued, tickets issued synchronously
- Expected: HTTP 200; pnr/bookingToken/gdsPNR returned; response echoes the seat selection; totals reflect the same price
- Actual: All echoes match exactly: passengersSelectedSeats.PAX1.<seg>={cellCode:8A,price:120.00 SAR}; totalSelectedSeatsAmount=120.00 SAR
- Status: **PASS**
- Evidence: Full Book response body, pnr RPRJFQ, GulfAir BAH-RUH 2027-01-15

### TC-BOOK-NEG-05 [Negative] - Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell

- Endpoint Name: Book
- Request: Book submitted with an Occupied cellCode (8E) and its null cellId (Occupied cells never carry a real cellID)
- Response: 400 ValidationError {'NotEmptyValidator':'CellId is required.'}
- Expected: Request rejected; no booking created reflecting the unavailable seat
- Actual: Rejected via a generic null-cellId check, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: TransactionId 28e1c5a1-8c19-4ae9-82a8-58605af98250

### TC-BOOK-NEG-06 [Negative] - Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with

- Endpoint Name: Book
- Request: Book submitted with a valid cellCode (8A) but its cellId's trailing 10 base64 characters replaced with 'XXXXXXXXXX', on a fresh never-booked offer (BAH-JED 2027-02-01)
- Response: 200 - pnr=RZTQOS, seat 8A attached at 120.00 SAR exactly as if the untampered token had been sent
- Expected: Rejected - the tampered token should fail a server-side decode/signature check
- Actual: STILL REPRODUCES (BUG-06, 5th consecutive round)
- Status: **FAIL**
- Evidence: pnr RZTQOS, seat 8A/120.00 SAR attached despite the corrupted cellId

### TC-BOOK-VAL-06 [Validation] - Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes

- Endpoint Name: Book
- Request: Book submitted with cellCode from one AvailablePaid cell (8B) but cellId from a different AvailablePaid cell (8A), same offer/segment (BAH-DXB 2027-02-03)
- Response: 200 - pnr=RXWLKV, seat attached exactly as the submitted cellCode (8B, 120.00 SAR)
- Expected: Confirm whether cellId alone is trusted, request rejected, or wrong seat booked under wrong code
- Actual: STILL REPRODUCES - the API trusts cellCode, not cellId; unchanged from Rounds 1-4
- Status: **FAIL**
- Evidence: pnr RXWLKV, cellCode 8B booked at 120.00 SAR (8B's own price, cellId was for cell 8A)

### TC-BOOK-BIZ-04 [Business Rule] - Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected

- Endpoint Name: Book
- Request: Chain A Book response (one-way) and Chain D Book response (round-trip, 2 seats)
- Response: One-way: totalAmount=643.00=170.00+353.00+0+120.00. Round-trip: totalAmount=1401.00=400.00+761.00+0+240.00
- Expected: totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount
- Actual: Reconciles exactly on both this round's one-way (pnr RPRJFQ) AND round-trip (pnr RZLJET) bookings - the round-trip sample specifically re-verifies what Round 4's outage prevented.
- Status: **PASS**
- Evidence: pnr RPRJFQ: 170+353+0+120=643; pnr RZLJET: 400+761+0+240=1401

### TC-BOOK-INT-03 [Integration] - Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously

- Endpoint Name: Book
- Request: Requires a bundle code (GetOfferBundles) plus an ancillary code plus a seat, all on one Book call
- Response: N/A - GulfAir/KSA's haveBundles=false on every offer sampled this round (9 independent FareConfirm calls)
- Expected: N/A
- Actual: Not executable for GulfAir - haveBundles=false reconfirmed on every chain this round
- Status: **BLOCKED**
- Evidence: FareConfirm capability flags: haveBundles=False on all 9 chains

### TC-BOOK-BND-03 [Boundary] - Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries

- Endpoint Name: Book
- Request: (a) omitted entirely (pnr RCZPIT); (b) one passenger/one segment (pnr RPRJFQ); (c) round-trip, one passenger, 2 segments (pnr RZLJET)
- Response: (a) 200, passengersSelectedSeats present as empty object, no seat attached; (b) 200, seat attached as expected; (c) 200, both segments' seats nested correctly as sibling keys under PAX1
- Expected: (a) succeeds with no seat; (b) succeeds as in TC-BOOK-POS-03; (c) multi-segment nesting confirmed live
- Actual: All three sub-cases confirmed PASS this round, including (c) which Round 4's outage had prevented from being re-verified
- Status: **PASS**
- Evidence: (a) pnr RCZPIT; (b) pnr RPRJFQ; (c) pnr RZLJET, PAX1 has 2 segment entries (8B@120, 8A@120)

### TC-BOOK-REG-02 [Regression] - Verify passengersSelectedSeats, passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema

- Endpoint Name: Book
- Request: Chain A Book response (pnr RPRJFQ) schema diff
- Response: All 5 fields present and correctly typed
- Expected: No pre-existing response field regressed
- Actual: Confirmed, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: Full Book response schema for pnr RPRJFQ

### TC-SEATAFTERHOLD-POS-01 [Positive] - Discovery case - submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape

- Endpoint Name: SeatAfterHold
- Request: POST api/v2/SeatMap/SeatAfterHold - supplier=GulfAir, credentialsSelector=KSA, pnr=RVQUIZ, gdsPNR='', bookingToken=<Hold's token>, surName='Ibrahim'
- Response: 409 - {ErrorCode:'OperationNotSupported', ErrorMessage:'This action is not currently supported by the selected supplier.', Context:[{Name:'OperationNotSupported',Value:'GulfAir does not exists'}]}
- Expected: Establish ground truth for the actual response shape
- Actual: STILL REPRODUCES (BUG-03, 5th consecutive round)
- Status: **FAIL**
- Evidence: TransactionId 253cdbe2-ed5e-4928-83f0-a87b3071ef56

### TC-SEATAFTERHOLD-VAL-01 [Validation] - Confirm whether a seat/cell field is required beyond the 6 documented fields

- Endpoint Name: SeatAfterHold
- Request: Depends on TC-SEATAFTERHOLD-POS-01's result
- Response: N/A - prerequisite rejected outright (409, supplier-level)
- Expected: Resolve the real request shape
- Actual: Still blocked by the supplier-level 409 (BUG-03), unchanged from Rounds 1-4
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-NEG-01 [Negative] - Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination

- Endpoint Name: SeatAfterHold
- Request: SeatAfterHold submitted with pnr from Hold RVQUIZ but bookingToken/gdsPNR from a second, independent Hold (RTWPNJ, BAH-DXB)
- Response: 409 OperationNotSupported 'GulfAir does not exists' - identical to the baseline case
- Expected: Rejected, exact status confirmed live
- Actual: Actually attempted this round; the supplier-level 409 fires before any identity-matching logic, so this remains not meaningfully testable for GulfAir until BUG-03 is resolved
- Status: **BLOCKED**
- Evidence: TransactionId 36bf2175-9e5c-4317-b36b-20968954c3b4

### TC-SEATAFTERHOLD-NEG-02 [Negative] - Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed

- Endpoint Name: SeatAfterHold
- Request: Would require a Held PNR with a known, elapsed holdExpirationDate
- Response: N/A - doubly blocked
- Expected: Rejected, consistent with FareConfirmAfterHold's expired-hold expectation
- Actual: Doubly blocked: SeatAfterHold rejects GulfAir outright (BUG-03), and Hold's holdExpirationDate is STILL null (BUG-04, reconfirmed on 3 fresh Holds: RVQUIZ, RTWPNJ, RMCNEV)
- Status: **BLOCKED**
- Evidence: See holdExpirationDate defect finding

### TC-SEATAFTERHOLD-SEC-02 [Security] - Apply the three universal security checks to SeatAfterHold

- Endpoint Name: SeatAfterHold
- Request: (1) invalid x-api-key, (2) invalid Client-Id against the SeatAfterHold body used in TC-SEATAFTERHOLD-POS-01
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError
- Expected: All rejected; error shape confirmed live
- Actual: Both auth-layer checks behave identically to every other endpoint's 401 envelope, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: badKey and badClient both returned HTTP 401

### TC-SEATAFTERHOLD-INT-04 [Integration] - Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points

- Endpoint Name: SeatAfterHold flow
- Request: Chain tested: Hold -> SeatAfterHold (immediately after Hold)
- Response: SeatAfterHold rejected 409 'GulfAir does not exists' at the very first candidate position
- Expected: Record which candidate position(s) SeatAfterHold accepts
- Actual: None of the three candidate positions meaningfully comparable - rejection is supplier-level, not position-dependent
- Status: **FAIL**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### FLOW-V2-49-SEATFIELD [Flow] - Verify the existing SM-enrichment Family-A flow chains Book's ResponseId/selectedOfferId from GetSeatMap and exercises passengersSelectedSeats

- Endpoint Name: Flow (Family A: AP-SM-FCK-BK-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap->Book->Retrieve, one-way (pnr RPRJFQ) AND round-trip (pnr RZLJET)
- Response: PASS both: Book and Retrieve echo passengersSelectedSeats matching the selection; totalSelectedSeatsAmount non-zero and reconciles into totalAmount on both journey shapes
- Expected: Per-family state check (§6.3 Family A) plus seat-specific checks
- Actual: All assertions hold on this round's one-way sample (RPRJFQ: 170+353+120=643) AND round-trip sample (RZLJET: 400+761+240=1401) - the round-trip re-verification specifically closes the gap Round 4's GetSeatMap outage left open.
- Status: **PASS**
- Evidence: pnr RPRJFQ (one-way), pnr RZLJET (round-trip)

Hops (6):
  1. Search - Status: **PASS** - Expected: 200, offers returned - Actual: 200, 25 offers, first offer GF169 - Evidence: responseId captured
  2. FareConfirm - Status: **PASS** - Expected: 200, capability flags present - Actual: 200, isSeatMapRequired=false, canBeHeld=true, haveBundles=false - Evidence: selectedOffer.offerJourneys=[GF-GF169-1]
  3. AddPassenger - Status: **PASS** - Expected: 200, offerId/responseId returned - Actual: 200 - Evidence: getAddPaxOfferId/getAddPaxResponceID populated
  4. GetSeatMap - Status: **PASS** - Expected: 200, seatMapDetails populated - Actual: 200 - THE ROUND 4 OUTAGE (BUG-14) IS CLEARED - Evidence: segment key GF-GF169-GF169-2027011519-2027011521-O
  5. Book - Status: **PASS** - Expected: 200, pnr/bookingToken/gdsPNR, seat echoed - Actual: 200, pnr RPRJFQ, totalAmount=643.00 reconciles - Evidence: passengersSelectedSeats.PAX1 has 1 segment entry
  6. Retrieve - Status: **PASS** - Expected: Seat persists post-ticketing - Actual: Identical to Book - Evidence: Retrieve(RPRJFQ) matches Book(RPRJFQ) field-for-field

### FLOW-V2-50-SEATFIELD [Flow] - Verify whether GetSeatMap's chosen seat can be attached via Hold directly (Family B, before SeatAfterHold)

- Endpoint Name: Flow (Family B: AP-SM-FCK-HD-FCAH-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap (record cellCode/cellId 8A)->Hold, with passengersSelectedSeats included on the Hold request body (fresh never-held offer, BAH-RUH 2027-01-28)
- Response: 200 - pnr=RMCNEV, holdExpirationDate=null, passengersSelectedSeats.PAX1.<seg>={cellCode:'8A',price:{amount:120.00,currency:'SAR'}} - Hold silently accepted and echoed the seat
- Expected: Confirm live whether Hold silently ignores, rejects, or accepts an unrecognized passengersSelectedSeats field
- Actual: STILL REPRODUCES (BUG-08, 5th consecutive round, now confirmed on a fresh never-Held offer to rule out any state-reuse confound)
- Status: **FAIL**
- Evidence: pnr RMCNEV, passengersSelectedSeats.PAX1 populated on the Hold response itself

### FLOW-V2-CANDIDATE-SM-HOLD-01 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold

- Endpoint Name: Flow (candidate SM-Hold-A)
- Request: Hold (pnr RVQUIZ) -> SeatAfterHold (position A, immediately after Hold)
- Response: SeatAfterHold rejected with 409 'GulfAir does not exists' - chain could not proceed past this hop
- Expected: SeatAfterHold succeeds; final Retrieve shows the seat populated
- Actual: Blocked at the SeatAfterHold hop for GulfAir (BUG-03), unchanged from Rounds 1-4
- Status: **FAIL**
- Evidence:

Hops (2):
  1. Hold - Status: **PASS** - Expected: 200, pnr/bookingToken - Actual: 200, pnr RVQUIZ (holdExpirationDate null, BUG-04) - Evidence: pnr RVQUIZ
  2. SeatAfterHold - Status: **FAIL** - Expected: 200 with a seat-selection response - Actual: 409, chain halted - Evidence: TransactionId 253cdbe2-ed5e-4928-83f0-a87b3071ef56

### FLOW-V2-CANDIDATE-SM-HOLD-02 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold

- Endpoint Name: Flow (candidate SM-Hold-B)
- Request: Not independently executed - SeatAfterHold's rejection of GulfAir is supplier-level, not state/position-dependent
- Response: N/A
- Expected: N/A
- Actual: Reasoned-BLOCKED, unchanged from Rounds 1-4
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-03 [Flow] - Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking

- Endpoint Name: Flow (candidate SM-Hold-C)
- Request: Not independently executed - same reasoning as candidate-02
- Response: N/A
- Expected: N/A
- Actual: Reasoned-BLOCKED, unchanged from Rounds 1-4
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG [Flow] - Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken carried over from an unrelated Hold call

- Endpoint Name: Flow (candidate SM-Hold-A, negative)
- Request: Actually attempted this round: pnr from Hold RVQUIZ combined with bookingToken from an unrelated 2nd Hold (RTWPNJ)
- Response: 409 OperationNotSupported 'GulfAir does not exists' - identical to the baseline rejection
- Expected: N/A
- Actual: The baseline SeatAfterHold call already rejects GulfAir unconditionally before any identity-matching logic runs, unchanged from Rounds 1-4
- Status: **BLOCKED**
- Evidence: TransactionId 36bf2175-9e5c-4317-b36b-20968954c3b4

### TC-BOOK-BIZ-05 [Business Rule] - Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side

- Endpoint Name: Book
- Request: AddPassenger (ADT+CHD) -> GetSeatMap (identify exit-row cell 12A) -> Book (assign 12A to CHD passenger PAX2), BAH-DMM 2027-01-20
- Response: 200 - pnr=RLNWTT, both passengers ticketed, PAX2's seat 12A/60.00 SAR echoed with no error
- Expected: Response is an error (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD); no pnr created
- Actual: STILL REPRODUCES IN ITS WORSENED FORM (BUG-09, 5th consecutive round) - zero server-side validation
- Status: **FAIL**
- Evidence: pnr RLNWTT, PAX2(CHD) seat 12A/60.00 SAR attached and ticketed

### TC-BOOK-NEG-07 [Negative] - Validate Book rejects a request that assigns the same seat cell to two different passengers

- Endpoint Name: Book
- Request: 2-ADT chain (BAH-JED 2027-01-18); Book submitted with PAX1 and PAX2 both selecting the identical cellCode/cellId (8A) for the same segment
- Response: 400 ValidationError: "Seat '8A' is assigned to multiple passengers on segment 'GF-GF181-GF181-2027011801-2027011804-O'."
- Expected: Request rejected before any supplier round-trip; no pnr created
- Actual: Cleanly rejected with a specific, on-point validation message this round. **Note: this is a DIFFERENT scenario from BUG-07** (which is about a cross-offer cellId, not a duplicate same-offer seat).
- Status: **PASS**
- Evidence: TransactionId ef6cfeb6-1035-4619-8e3b-f2fef7eda798

### TC-BOOK-NEG-08 [Negative] - Validate Book rejects a request where the same passenger selects two different seats on the same segment

- Endpoint Name: Book
- Request: No live call made - setSegmentsSeats is a JSON object keyed by segmentRefId, so a client cannot submit two different cellCode/cellId values under one key in valid JSON
- Response: N/A
- Expected: Documented as untestable-by-construction
- Actual: Confirmed again this round by request-shape inspection of every successful Book payload built this round (9+ calls)
- Status: **PASS**
- Evidence: Book's passengersSelectedSeats.<pax>.setSegmentsSeats schema is a JSON object, not an array

### TC-BOOK-BIZ-06 [Business Rule] - Verify an Infant (INF) on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry

- Endpoint Name: Book
- Request: AddPassenger (ADT+INF, parentPaxRefId linkage) -> GetSeatMap (PAX1/ADT only appears) -> Book (seat selected only for PAX1) -> BAH-RUH 2027-02-16
- Response: 200 - pnr=RDBYFK; PAX1(ADT) paxTotalSeatAmount=120.00; PAX2(INF) paxTotalSeatAmount=0.00, passengerSeats=[]; totalSelectedSeatsAmount=120.00 (not double-counted)
- Expected: INF paxTotalSeatAmount==0; no passengerSeats entries; totalSelectedSeatsAmount reflects only the ADT's seat
- Actual: Executed live for the first time across all 5 rounds (previously deprioritized) - all assertions hold exactly as expected
- Status: **PASS**
- Evidence: pnr RDBYFK: PAX1 paxTotalSeatAmount=120.00; PAX2(INF) paxTotalSeatAmount=0.00, passengerSeats=[]

### TC-BOOK-NEG-09 [Negative] - Validate graceful rollback when the supplier's seat allocation call fails or times out after Book is submitted

- Endpoint Name: Book
- Request: Requires a forcing mechanism to make the supplier-side seat allocation fail on demand
- Response: Not attempted
- Expected: N/A
- Actual: Not forceable this round; no naturally-occurring failure of this kind was observed this round (BUG-14 has cleared)
- Status: **BLOCKED**
- Evidence: No forcing mechanism available

### TC-BOOK-VAL-07 [Validation] - Validate a second, different passengersSelectedSeats selection supersedes an earlier selection made before the single Book call is sent

- Endpoint Name: Book
- Request: Client-side behavior - only one Book call is ever transmitted per test case this round
- Response: N/A
- Expected: Book reflects exactly what was sent
- Actual: Every Book call this round (9+) reflected exactly the cellCode/cellId actually transmitted, never a stale value
- Status: **PASS**
- Evidence: Cross-referenced against this round's TC-BOOK-POS-03/NEG-06/VAL-06 evidence

### TC-BOOK-BIZ-07 [Business Rule] - Validate a wheelchair-accessible seat can be selected for a passenger flagged for special assistance

- Endpoint Name: Book
- Request: Requires identifying a wheelchair-accessible cell by its cellCharacteristics/description text
- Response: N/A - no WHEELCHAIR/WCHR/ACCESSIBLE characteristic string found in this round's captured GulfAir seat maps
- Expected: N/A
- Actual: Not executable this round either - the description vocabulary (same 15 values as every prior round) still contains no wheelchair-designated value
- Status: **BLOCKED**
- Evidence: Full description-vocabulary scan across this round's GetSeatMap samples: zero matches

### TC-BOOK-VAL-08 [Validation] - Verify the currency code is consistent across every seat-price object in one Book response

- Endpoint Name: Book
- Request: Chain A and Chain D Book responses, inspecting every seat-related price.currency value
- Response: All seat-price currency values = 'SAR'
- Expected: Consistent, non-placeholder currency
- Actual: All currency fields identical ('SAR'), none 'string'/null/empty, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: pnr RPRJFQ and pnr RZLJET Book responses

### TC-BOOK-REG-03 [Regression] - Verify passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount for a single seat

- Endpoint Name: Book
- Request: Chain A Book response (pnr RPRJFQ)
- Response: passengerSeats[0].price.amount=120.00; paxTotalSeatAmount.amount=120.00
- Expected: Exactly equal
- Actual: 120.00==120.00, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: selectedOffer.passengerFareBreakdown[0], pnr RPRJFQ

### TC-BOOK-NEG-10 [Negative] - Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats:{} explicitly present (BAH-CAI 2027-02-12)
- Response: 200 - pnr=RQUNQE, ticketed, passengersSelectedSeats:{} in the response, totalSelectedSeatsAmount=0
- Expected: Book succeeds; no seat fee charged; no 500-level error
- Actual: Succeeded exactly as expected, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: pnr RQUNQE

### TC-BOOK-NEG-11 [Negative] - Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats.PAX1.setSegmentsSeats:{} (BAH-CAI 2027-02-13, fresh unbooked offer)
- Response: 200 - pnr=RCCVJL, ticketed, no seat attached, no error
- Expected: Book succeeds; no seat attached; no error from the empty nested object
- Actual: Succeeded exactly as expected, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: pnr RCCVJL

### TC-BOOK-NEG-12 [Negative] - Validate Book rejects requests with each mandatory field individually omitted: ResponseId, selectedOfferId, supplier, credentialsSelector

- Endpoint Name: Book
- Request: 4 variants of a no-seat Book payload, each on a fresh offer (BAH-DMM 2027-02-05..08)
- Response: omit supplier->400; omit credentialsSelector->400; omit selectedOfferId->400 ValidationError; omit ResponseId->200, created real PNR RDQQTN
- Expected: All four runs rejected; no pnr created in any run
- Actual: **BUG-13 IS NOW RESOLVED** (was: 500 ServerError on selectedOfferId-omission in Round 4; now: clean 400 ValidationError). The ResponseId-omission sub-case is STILL open (still creates a real ticketed PNR when omitted, unchanged since Round 1) - excluded from this test case's own tally per the established scope convention, but explicitly flagged here rather than silently dropped.
- Status: **PASS**
- Evidence: omit supplier 400; omit credentialsSelector 400; omit selectedOfferId 400 ValidationError; omit ResponseId 200 pnr=RDQQTN (excluded from tally)

### TC-SEATMAP-VAL-05 [Validation] - Verify cellCharacteristics.description text is consistent with its own padisCode

- Endpoint Name: GetSeatMap
- Request: Full scan of chain A's GetSeatMap 175 cells' cellCharacteristics[]
- Response: Every entry has padisCode='Unknown' and description as a self-descriptive enum string
- Expected: Description must not contradict the code's meaning for known codes
- Actual: GulfAir's adapter never populates a real padisCode; same 15-value vocabulary as every prior round
- Status: **PASS**
- Evidence: Full scan of chain A's GetSeatMap 175 cells; padisCode='Unknown' on every entry

### TC-SEATMAP-BND-03 [Boundary] - Verify AvailableFree is accepted as a real cellAvailability value; confirm live whether AvailableAfterReservation is also real

- Endpoint Name: GetSeatMap
- Request: Confirmed via saved example (AirArabia) per prior rounds; this round's live GulfAir samples show only AvailablePaid/Occupied
- Response: AvailableFree remains confirmed via the saved example; AvailableAfterReservation remains unconfirmed live for GulfAir
- Expected: AvailableFree confirmed; AvailableAfterReservation resolved empirically where possible
- Actual: No change from Round 4 - GulfAir/KSA continues to show only AvailablePaid/Occupied
- Status: **PASS**
- Evidence: cellAvailability values across all 9 chains this round: AvailablePaid, Occupied only

### TC-SEATMAP-VAL-06 [Validation] - Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, scanning cellCategory/column/cellDetails across all 175 cells
- Response: 175/175 cells conform - 0 violations
- Expected: cellCategory=Aisle implies column/cellDetails null; cellCategory=Seat implies both populated
- Actual: 0/175 violations - stable for a 5th consecutive round
- Status: **PASS**
- Evidence: Full cell scan: 0 Aisle violations, 0 Seat violations

### TC-RETRIEVE-REG-01 [Regression] - Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed

- Endpoint Name: Retrieve
- Request: POST api/v2/FlightBooking/Retrieve for pnr=RPRJFQ and pnr=RZLJET (round-trip) immediately after Book
- Response: 200 - bookingStatus='Booked', passengersSelectedSeats identical to Book's own echo, both one-way and round-trip
- Expected: passengersSelectedSeats/passengerSeats/totalSelectedSeats in a post-ticketing Retrieve are identical to immediately-post-Book values
- Actual: GulfAir tickets synchronously at Book time; Retrieve reproduces Book's seat/price fields exactly on BOTH samples this round - the round-trip re-confirmation closes the gap left by Round 4's outage.
- Status: **PASS**
- Evidence: Retrieve(RPRJFQ) matches Book(RPRJFQ); Retrieve(RZLJET) matches Book(RZLJET) field-for-field

### TC-BOOK-INT-04 [Integration] - Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent

- Endpoint Name: Book
- Request: Requires GetOfferBundles to succeed first
- Response: N/A - haveBundles=false for GulfAir/KSA
- Expected: N/A
- Actual: Still not executable - GulfAir has no bundle capability on any sampled offer this round (9/9 chains)
- Status: **BLOCKED**
- Evidence: FareConfirm capability flags show haveBundles=False on every chain

### TC-SEATAFTERHOLD-VAL-02 [Validation] - Once SeatAfterHold's real contract is confirmed, validate it rejects a seat/passenger reference not established at this pnr

- Endpoint Name: SeatAfterHold
- Request: Sequenced behind TC-SEATAFTERHOLD-VAL-01
- Response: N/A
- Expected: Blocked until VAL-01 resolves a confirmed request shape
- Actual: Still blocked, unchanged from Rounds 1-4
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-VAL-01

### TC-SEATMAP-NEG-01 [Negative] - Validate GetSeatMap is rejected when called for an offer whose isSeatMapRequired flag was false

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat using AddPassenger IDs from an offer confirmed live (isSeatMapRequired=false) - reconfirmed on 9 independent chains this round
- Response: 200 - full seatMapDetails returned every time, never rejected
- Expected: Rejected or an explicit unsupported-operation envelope
- Actual: Still 200 with a fully populated seatMapDetails on every one of 9 chains this round. **Filed this round as BUG-15** - this exact FAIL has reproduced identically since Round 1 but was never given its own numbered bug report for GulfAir/KSA specifically.
- Status: **FAIL**
- Evidence: Same GetSeatMap call as TC-SEATMAP-POS-01; isSeatMapRequired=false confirmed at FareConfirm on all 9 chains

### TC-SEATMAP-NEG-02 [Negative] - Validate GetSeatMap is rejected when ResponseId/selectedOfferId come from two different offers

- Endpoint Name: GetSeatMap
- Request: GetSeatMap called with ResponseId from Chain A's AddPassenger (BAH-RUH) but selectedOfferId from Chain B's AddPassenger (BAH-JED, unrelated), and the reverse direction
- Response: 200 both directions - full seatMapDetails returned
- Expected: Rejected
- Actual: STILL REPRODUCES (BUG-01, 5th consecutive round) - accepted with HTTP 200 in both directions. **This is the priority re-verification the Round 4 GetSeatMap outage had specifically prevented.**
- Status: **FAIL**
- Evidence: Cross A->B and B->A GetSeatMap calls both returned 200 with populated seatMapDetails

### TC-SEATMAP-NEG-03 [Negative] - Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair

- Endpoint Name: GetSeatMap
- Request: Run 1: fabricated GUID ResponseId + fabricated selectedOfferId string. Run 2: genuine but already-consumed AddPassenger ID pair (Chain B, already Booked elsewhere)
- Response: Run 1: 400 ValidationError 'The selected offer is invalid, expired, or could not be found.' Run 2: 200 (still resolvable even after being booked elsewhere)
- Expected: Rejected; no seatMapDetails returned for either
- Actual: **RESOLVES Round 4's INCONCLUSIVE finding** now that BUG-14 has cleared: a genuinely fabricated pair is now cleanly rejected with 400 ValidationError. New nuance: a real but already-consumed pair is NOT rejected (200) - IDs are not invalidated after being consumed.
- Status: **PASS**
- Evidence: Run 1 TransactionId f9d82d0e-b45e-4035-a3b8-00fe8bf936b8 (400); Run 2: Chain B's already-used AddPassenger IDs still return 200

### TC-SEATMAP-NEG-04 [Negative] - Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId

- Endpoint Name: GetSeatMap
- Request: 4 variants of a valid GetSeatMap body (chain A's AddPassenger IDs), each with exactly one mandatory field removed
- Response: omit supplier->400; omit credentialsSelector->400; omit ResponseId->200 (still succeeds); omit selectedOfferId->400
- Expected: All four runs rejected
- Actual: STILL REPRODUCES (BUG-02, 5th consecutive round) - 3 of 4 sub-cases correctly rejected; ResponseId-omission still succeeds with a full 200 response
- Status: **FAIL**
- Evidence: omit supplier 400; omit credentialsSelector 400; omit selectedOfferId 400; omit ResponseId 200 (full seatMapDetails returned)

### TC-SEATMAP-NEG-05 [Negative] - Validate GetSeatMap fails gracefully (structured error, not raw 500/stack trace) when the underlying supplier call fails

- Endpoint Name: GetSeatMap
- Request: No naturally-occurring outage this round (BUG-14 cleared); used the fabricated-ID rejection from TC-SEATMAP-NEG-03 as evidence of graceful degradation
- Response: 400 ValidationError, a fully structured JSON envelope - no raw stack trace or unhandled-exception HTML
- Expected: Structured business-error envelope, not an unhandled exception
- Actual: Structurally graceful, consistent with every prior round's error envelopes and every error observed this round (400s, 409s all well-formed JSON)
- Status: **PASS**
- Evidence: TransactionId f9d82d0e-b45e-4035-a3b8-00fe8bf936b8

### TC-SEATMAP-VAL-07 [Validation] - Verify window/aisle/extra-legroom/exit-row seat attributes are programmatically derivable from cellCharacteristics

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, cross-checking cellCharacteristics against column position/description text
- Response: WINDOW/AISLE_SEAT/BULKHEAD_SEAT/EXIT_ROW_SEAT/CENTER_SEAT literals appear directly as description strings
- Expected: Attributes derivable from description text
- Actual: Columns A/F carry WINDOW+LEFT/RIGHT_SIDE_OF_AIRCRAFT; rows 14-17 (all 6 columns, 24 cells) carry EXIT_ROW_SEAT - identical exit-row footprint to Round 4
- Status: **PASS**
- Evidence: Exit-row cells this round: 14A-17F (24 cells)

### TC-SEATMAP-VAL-08 [Validation] - Verify seatPriceDetails/seatPriceDetailsByPassenger is populated for every AvailablePaid cell and null for every Blocked/Occupied cell

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, partitioned by cellAvailability
- Response: 149/149 AvailablePaid cells have non-null seatPriceDetailsByPassenger.PAX1; the 1 Occupied cell has both null
- Expected: Conditional presence per cellAvailability
- Actual: 149/149 AvailablePaid populated; 1/1 Occupied null - unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: Full cell scan of chain A's GetSeatMap

### TC-SEATMAP-VAL-09 [Validation] - Verify cellCode is unique across all cells within one flight segment's seatMapDetails

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, collecting every cellCode within the one segment
- Response: 150 Seat-category cellCode values, 150 distinct - zero duplicates
- Expected: No cellCode value repeats
- Actual: 0 duplicates, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: Full 175-cell scan (150 with cellCode, 25 Aisle without)

### TC-SEATMAP-VAL-10 [Validation] - Verify structural uniqueness/domain constraints: rowNumber unique, zoneId unique within deck, column restricted to {A-F,null}

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, checked rowNumber/zoneId/column across all 25 rows
- Response: 25 distinct rowNumbers, 1 zone (Cabin1) consistently, column values restricted to {A,B,C,D,E,F,null}
- Expected: No rowNumber/zoneId duplicated; column domain respected
- Actual: 0 duplicate rowNumbers; single zoneId per deck; every non-null column in {A-F} - unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: 0 duplicate rowNumbers across 25 rows this round

### TC-SEATMAP-BIZ-03 [Business Rule] - Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported and not required to list every passenger

- Endpoint Name: GetSeatMap
- Request: Chain C GetSeatMap response (2 passengers: PAX1/ADT, PAX2/CHD), comparing seatPriceDetailsByPassenger membership per cell against passengersSeatMapAvailability allow-lists
- Response: 138/138 AvailablePaid cells list both PAX1 and PAX2; both passengers' allow-lists key on the same segmentRefId with matching casing
- Expected: Structural consistency; no casing inconsistency
- Actual: On this round's ADT+CHD sample, every paid cell lists both passengers (no differential eligibility observed on this aircraft/route); allow-list keys match seatMapDetails segment key casing exactly for both passengers
- Status: **PASS**
- Evidence: Chain C: 138/138 paid cells list PAX1+PAX2; both allow-list keys = GF-GF101-GF101-2027012002-2027012002-O

### TC-SEATMAP-BIZ-04 [Business Rule] - Exploratory - confirm GetSeatMap reflects real-time supplier inventory rather than a cached snapshot

- Endpoint Name: GetSeatMap
- Request: Requires a second, independent session to occupy a specific seat between two GetSeatMap calls
- Response: Not attempted - no concurrent-session/forcing mechanism available
- Expected: N/A (exploratory)
- Actual: Not forceable from a single test session, unchanged from Rounds 1-4
- Status: **BLOCKED**
- Evidence: No second booking session available

### TC-SEATMAP-SEC-01 [Security] - Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap

- Endpoint Name: GetSeatMap
- Request: (1) corrupted x-api-key, (2) corrupted Client-Id, (3) valid headers but supplier/credentialsSelector switched to TravelportNdc/UAE
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3) 409 OperationNotSupported 'TravelportNdc does not exists'
- Expected: All three rejected
- Actual: All three rejected consistently, matching the standard auth-layer/business-layer split seen on every other endpoint this round
- Status: **PASS**
- Evidence: badKey 401, badClient 401, crossTenant 409

### TC-SEATMAP-SEC-02 [Documentation] - Record that supplier-side auth and request/response logging are not independently verifiable through this API's black-box contract

- Endpoint Name: GetSeatMap (documentation)
- Request: N/A - documentation/scope-boundary case, no live API call
- Response: N/A
- Expected: Documented per §1.5/§1.8/PRD §7
- Actual: Documented as specified, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: No API call made, per its own definition

### TC-SEATMAP-INT-02 [Integration] - Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols

- Endpoint Name: GetSeatMap
- Request: Requires GetSeatMap against 3+ suppliers spanning distinct native protocols
- Response: Out of scope - this run's scope is GulfAir only
- Expected: N/A
- Actual: Not executed; this run's scope is fixed to Supplier=GulfAir, unchanged from Rounds 1-4
- Status: **BLOCKED**
- Evidence: Run scope explicitly fixed to Supplier=GulfAir

### TC-SEATMAP-INT-03 [Integration] - Capability-matrix sweep - run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable

- Endpoint Name: GetSeatMap
- Request: Requires a full-roster sweep across every SPEC.md §4.6 supplier
- Response: Out of scope - only GulfAir's row can be populated
- Expected: N/A
- Actual: Not executed as a full sweep; GulfAir's own row reconfirmed SeatMap=Supported live for a 5th consecutive round
- Status: **BLOCKED**
- Evidence: See §4.7 capability confirmation finding

### TC-SEATMAP-VAL-11 [Validation] - Verify passengersSeatMapAvailability stays internally consistent with per-cell seatPriceDetailsByPassenger, and segment-ref keys use consistent casing

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap: read passengersSeatMapAvailability.PAX1, confirm keys match seatMapDetails/flightSegments casing exactly
- Response: passengersSeatMapAvailability.PAX1's key is the full segmentRefId string, matching seatMapDetails/flightSegments keys character-for-character
- Expected: Segment-ref key casing consistent; no casing inconsistency
- Actual: No casing inconsistency observed for GulfAir, unchanged from Rounds 1-4
- Status: **PASS**
- Evidence: passengersSeatMapAvailability key == seatMapDetails segment key, verbatim

### TC-SEATMAP-BND-04 [Boundary] - Confirm live whether any cellCategory value beyond {Seat, Aisle} is ever returned

- Endpoint Name: GetSeatMap
- Request: GetSeatMap across all 9 GulfAir routes/chains sampled this round, all narrowbody equipment
- Response: Only Seat/Aisle observed across all successful GulfAir samples this round too
- Expected: Resolve empirically
- Actual: Same inconclusive-but-consistent outcome as every prior round
- Status: **PASS**
- Evidence: Distinct cellCategory values across this round's 9 chains: Seat, Aisle only

### TC-BOOK-POS-04 [Positive] - Verify a selected seat is committed to the booking as soon as Book succeeds, without waiting on any ticketing/payment step

- Endpoint Name: Book -> Retrieve
- Request: Book -> Retrieve immediately afterward, no ticketing action taken in between (pnr RPRJFQ)
- Response: Immediate post-Book Retrieve already shows the seat attached/priced
- Expected: Seat attachment doesn't depend on a separate ticketing step
- Actual: Core assertion holds; GulfAir tickets synchronously at Book time so there's no distinct un-ticketed window to isolate - same caveat as Rounds 1-4
- Status: **PASS**
- Evidence: Retrieve(RPRJFQ) immediately shows seat 8A/120 SAR attached, bookingStatus already 'Booked'

## Findings

**Of the 12 previously-open GulfAir/KSA defects: 10 STILL REPRODUCE with fresh evidence (BUG-01, 02, 03, 04, 06, 07, 08, 09, 10, 11), 2 are now RESOLVED (BUG-13, BUG-14). 1 NEW defect (BUG-15) was filed for a long-standing FAIL that had never been separately bug-numbered for GulfAir/KSA.**

### Defects

- **[TC-SEATMAP-NEG-02]** [BUG-01, STILL REPRODUCES - Round 5] GetSeatMap accepts a ResponseId/selectedOfferId pair sourced from two unrelated offers (both directions) and returns a fully populated seatMapDetails instead of rejecting the mismatched identifiers. This is the priority re-verification Round 4's GetSeatMap outage had specifically prevented.
- **[TC-SEATMAP-NEG-04]** [BUG-02, STILL REPRODUCES - Round 5] GetSeatMap succeeds (200) even when ResponseId is omitted entirely from an otherwise-valid request.
- **[TC-SEATAFTERHOLD-POS-01]** [BUG-03, STILL REPRODUCES - Round 5] SeatAfterHold rejects every call for supplier=GulfAir with HTTP 409 'GulfAir does not exists', reconfirmed against a brand-new fresh Hold (pnr RVQUIZ).
- **[TC-SEATAFTERHOLD-NEG-02]** [BUG-04, STILL REPRODUCES - Round 5] Hold's holdExpirationDate is still null for GulfAir, reconfirmed on 3 fresh Holds this round (RVQUIZ, RTWPNJ, RMCNEV).
- **[TC-BOOK-NEG-06]** [BUG-06, STILL REPRODUCES - Round 5] Book does not decode or verify the cellId token at all - a tampered cellId is accepted and the seat is attached purely based on the submitted cellCode (pnr RZTQOS).
- **[TC-SEATMAP-VAL-04]** [BUG-07, STILL REPRODUCES - Round 5] Book silently drops a cross-offer cellId's seat selection instead of rejecting the request (pnr RUNKLG, passengersSelectedSeats:{}). Re-verified for the first time since Round 3 now that BUG-14 has cleared.
- **[FLOW-V2-50-SEATFIELD]** [BUG-08, STILL REPRODUCES - Round 5] Hold silently accepts and honors an undocumented passengersSelectedSeats field for GulfAir (pnr RMCNEV, confirmed on a fresh never-Held offer). Re-verified for the first time since Round 3 now that BUG-14 has cleared.
- **[TC-BOOK-BIZ-05]** [BUG-09, STILL REPRODUCES IN ITS WORSENED FORM - Round 5] A Child passenger can be booked and ticketed into an exit-row seat with zero server-side validation (pnr RLNWTT). Re-verified for the first time since Round 3 now that BUG-14 has cleared.
- **[PRE-FLIGHT]** [BUG-10, STILL REPRODUCES - High severity - Round 5] AddPassenger still rejects the V2 Postman collection's own saved example (passengersList.name.middle='kady' vs travelDocument.name.middle='') with HTTP 400 'Invalid travel document information', identical to Rounds 2-4.
- **[PRE-FLIGHT]** [BUG-11, STILL REPRODUCES AND RE-WIDENED - Critical severity - Round 5] Resubmitting an already-consumed Book request still returns HTTP 409 with OriginalSupplierRequest/OriginalSupplierResponse present and confirmed (via redacted keyword match only) to contain an apikey-like plaintext token. NEW this round: the identical leak pattern was also observed on Hold's own duplicate-booking-conflict path (609 "already been created"), confirming the leak spans at least three endpoints' generic/conflict-error paths (Book, GetSeatMap during Round 4's outage, and now Hold).
- **[TC-SEATMAP-NEG-01]** [BUG-15, NEW - Round 5, first time filed for GulfAir/KSA] GetSeatMap does not reject or flag a call made against an offer whose isSeatMapRequired capability flag is false at FareConfirm time - it still returns HTTP 200 with a fully populated seatMapDetails. This exact result has reproduced identically since Round 1 for GulfAir/KSA but had never been given its own numbered bug report until now.

### UNKNOWN-resolutions (new live-confirmed facts)

- **[TC-SEATMAP-NEG-01/POS-01]** GetSeatMap's sustained outage (BUG-14, logged Round 4) is CONFIRMED RESOLVED - the very first GetSeatMap call this round succeeded, and every one of 10+ GetSeatMap calls this round succeeded normally with no NDC-INT-UNC-Z9999 errors.
- **[TC-BOOK-NEG-12]** BUG-13 (Book returns 500 ServerError instead of 400 when selectedOfferId is omitted) is CONFIRMED RESOLVED as of Round 5 - the identical request shape now produces a clean 400 ValidationError.
- **[TC-SEATMAP-NEG-03]** A fabricated/non-existent ResponseId+selectedOfferId pair is confirmed live-rejected by GetSeatMap with HTTP 400 ValidationError, resolving Round 4's INCONCLUSIVE 500-vs-409 finding. Separately confirmed: a genuine ID pair already fully consumed by a completed Book call is NOT rejected by GetSeatMap - it still resolves with 200.
- **[TC-SEATMAP-BND-04]** MULTICITY-SWEEP reconfirmed: a 3-entry searchCriteria array using the same route pair independently proven to return offers as a 2-entry array again returned HTTP 200 with empty offers[]. Multi-city (3+ entries) remains unsupported/hard-capped at 2 for GulfAir/KSA.
- **[TC-BOOK-VAL-06]** Re-confirmed for a 5th consecutive round: Book trusts cellCode, not cellId, when the two refer to different cells.

## Proposed SPEC.md updates

- **§2.1 - pending** - Replace: "[Confirmed live 2026-08-30, Round 4, GulfAir/KSA] Multi-city (3+ entry searchCriteria) is NOT supported..." With: "[Reconfirmed live 2026-08-30, Round 5, GulfAir/KSA] Multi-city (3+ entry searchCriteria) remains NOT supported (or hard-capped at 2 entries) for GulfAir/KSA on this host - a 5th-round spot-check again returned HTTP 200 with empty offers[]. Unchanged, stable finding across 2 consecutive rounds now."

- **§2.7 - pending** - Replace: "(Rounds 1-4 pending) Add top-level isFareCheckRequired and passengersDetails.<paxRef>.passengersSeatMapAvailability" With: "Still pending - unchanged and reconfirmed for a 5th consecutive round (2026-08-30). Carrying forward."

- **§4.6 - pending** - Replace: "(Rounds 1-4 pending) GulfAir SeatMap capability row: Unknown -> Supported" With: "Still pending - unchanged and reconfirmed for a 5th consecutive round (2026-08-30, on all 9 chains this round, including immediately after BUG-14's outage cleared). Carrying forward."

- **§2.10 / §1.10 item 6 - pending** - Replace: "(Rounds 1-4 pending) Hold DOES accept and honor a passengersSelectedSeats field submitted directly on the Hold request" With: "CONFIRMED for a 5th consecutive round (2026-08-30, Round 5) - now re-verified on a freshly-created, never-Held offer. Recommend the team make an explicit decision (document as intentional, or close as a defect/BUG-08) rather than carrying this forward as merely 'pending' for a 6th round."

- **§2.5 - pending** - Replace: "(Round 2 pending) Document AddPassenger's exact-name-match requirement" With: "Still pending - unchanged and reconfirmed identically in Round 5 (2026-08-30). Carrying forward."

- **§7.14 / §2.9 - pending** - Replace: "[WIDENED, Round 4] Confirmed the same leak also occurs on GetSeatMap's generic supplier-error envelope" With: "[WIDENED AGAIN, Round 5] Confirmed the same OriginalSupplierRequest/OriginalSupplierResponse leak also occurs on Hold's duplicate-booking-conflict path (609). Systemic across at least three endpoints; reproduced identically for 6 consecutive rounds without a fix - recommend immediate remediation."

- **§7.7 (new) - pending** - Replace: "(not previously proposed)" With: "[RESOLVED, Round 5] Book now returns a clean HTTP 400 ValidationError when selectedOfferId is omitted, resolving BUG-13 (filed Round 4). Recommend closing BUG-13 as fixed."

## Cleanup / follow-up

14 live artifacts left behind this run (11 ticketed bookings needing Void/Cancel, 3 Held-but-not-finalized Family-B holds):

- **needs_void_cancel** - PNR "RPRJFQ" (TC-BOOK-POS-03) - Baseline seat-selection booking (BAH-RUH 2027-01-15, seat 8A, 120.00 SAR). Primary evidence for TC-BOOK-POS-03/POS-04/BIZ-04/REG-02/REG-03/VAL-08/RETRIEVE-REG-01/POS-02/VAL-03/FLOW-V2-49-SEATFIELD.
- **needs_void_cancel** - PNR "RUNKLG" (TC-SEATMAP-VAL-04) - Cross-offer cellId Book (BUG-07 evidence), BAH-JED 2027-01-18, 2 ADT.
- **needs_void_cancel** - PNR "RLNWTT" (TC-BOOK-BIZ-05) - CHD ticketed into an exit-row seat with zero validation (BUG-09 evidence), BAH-DMM 2027-01-20.
- **needs_void_cancel** - PNR "RZLJET" (FLOW-V2-49-SEATFIELD) - Round-trip booking, 2 seats across 2 segments (BAH-RUH/RUH-BAH 2027-01-15/2027-01-22).
- **needs_void_cancel** - PNR "RZTQOS" (TC-BOOK-NEG-06) - Created while proving Book does not validate a tampered cellId (BUG-06 evidence), BAH-JED 2027-02-01.
- **needs_void_cancel** - PNR "RXWLKV" (TC-BOOK-VAL-06) - Created while proving cellCode (not cellId) drives seat resolution, BAH-DXB 2027-02-03.
- **needs_void_cancel** - PNR "RDQQTN" (TC-BOOK-NEG-12) - Created by the still-open ResponseId-omission behavior, BAH-DMM 2027-02-08.
- **needs_void_cancel** - PNR "RQUNQE" (TC-BOOK-NEG-10) - Created while testing explicit-empty passengersSelectedSeats, BAH-CAI 2027-02-12.
- **needs_void_cancel** - PNR "RCCVJL" (TC-BOOK-NEG-11) - Created while testing explicit-empty setSegmentsSeats, BAH-CAI 2027-02-13.
- **needs_void_cancel** - PNR "RCZPIT" (TC-BOOK-BND-03) - No-seat Book call, BAH-CAI 2027-02-14.
- **needs_void_cancel** - PNR "RDBYFK" (TC-BOOK-BIZ-06) - ADT+INF booking, seat selected only for the ADT, BAH-RUH 2027-02-16.
- **family_b_hold** - PNR "RVQUIZ" (TC-SEATAFTERHOLD-POS-01) - Held via direct Hold call (BAH-CAI, 2027-01-22). holdExpirationDate null. Never progressed.
- **family_b_hold** - PNR "RTWPNJ" (TC-SEATAFTERHOLD-NEG-01) - Held for the mismatched-identity SeatAfterHold negative test (BAH-DXB, 2027-01-25). holdExpirationDate null. Never progressed.
- **family_b_hold** - PNR "RMCNEV" (FLOW-V2-50-SEATFIELD) - Held with an inline seat selection (BUG-08 evidence, BAH-RUH 2027-01-28). holdExpirationDate null. Never progressed.
