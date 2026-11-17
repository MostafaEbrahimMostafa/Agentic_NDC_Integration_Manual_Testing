# QA Execution Report - Round 6 Regression - SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) - 63 test cases: full-coverage regression on a NEW host (ne-3), re-verification of BUG-01 through BUG-15, route/journey-type variety matching Round 5

**Environment:** staging (host change - user-specified) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/ (also STAG_ENV.postman_environment.json's current default baseUrl)
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-09-06T09:28:18Z
**Ended:** 2026-09-06T10:35:00Z
**Status:** COMPLETE
**Prior runs:** [Round 1 - 20260825-103032](20260825-103032_SeatMap-GulfAir-KSA.md), [Round 2 - 20260826-154300](20260826-154300_SeatMap-GulfAir-KSA-Round2.md), [Round 3 - 20260830-093343](20260830-093343_SeatMap-GulfAir-KSA-Round3.md), [Round 4 - 20260830-090507](20260830-090507_SeatMap-GulfAir-KSA-Round4.md), and [Round 5 - 20260830-143810](20260830-143810_SeatMap-GulfAir-KSA-Round5.md)

## Summary

- Test cases logged: 63 of 63 planned
- Passed: 37
- Failed: 12
- Blocked: 14

### Headline result: identical behavior confirmed on the new ne-3 host - no regression, no improvement, one credential-leak widening reconfirmed

This round's primary purpose was to re-run the full SeatMap_TestCases.csv suite (63 rows) against the NEW host `ndc-integration-stg-ne-3.azurewebsites.net` (superseding `ndc-integration-stg-ne-2` used in Rounds 1-5) and establish whether the host change itself altered any previously-observed behavior. **It did not.** Every one of the 12 previously-open GulfAir/KSA defects (BUG-01, 02, 03, 04, 06, 07, 08, 09, 10, 11, 15) reproduced identically on ne-3, and both previously-RESOLVED defects (BUG-13, BUG-14) remained resolved. The only new information this round contributes is that BUG-11's credential leak was directly reconfirmed on **Book's own** 609 duplicate-booking-conflict path this time (via deliberate resubmission of an already-consumed Book request), not only Hold's, widening its confirmed footprint. No new defect (BUG-16 candidate) was found, and no previously-resolved defect regressed.

### Re-verification of Round 5's defect list (BUG-01 through BUG-15)

| Bug | Status this round (ne-3) |
|---|---|
| BUG-01 (GetSeatMap cross-offer identifiers accepted) | **STILL REPRODUCES** (6th consecutive round, survives host change) |
| BUG-02 (GetSeatMap ResponseId-omission still succeeds) | **STILL REPRODUCES** (6th consecutive round, survives host change) |
| BUG-03 (SeatAfterHold rejects GulfAir outright) | **STILL REPRODUCES** (6th consecutive round, survives host change) |
| BUG-04 (Hold holdExpirationDate null) | **STILL REPRODUCES** (6th consecutive round, survives host change) |
| BUG-06 (Book doesn't validate tampered cellId) | **STILL REPRODUCES** (6th consecutive round, survives host change) |
| BUG-07 (Book silently drops cross-offer seat) | **STILL REPRODUCES** (6th consecutive round, survives host change) |
| BUG-08 (Hold silently accepts/honors passengersSelectedSeats) | **STILL REPRODUCES** (6th consecutive round, on a fresh never-Held offer) |
| BUG-09 (CHD ticketed into exit row, zero validation) | **STILL REPRODUCES, worsened form** (6th consecutive round) |
| BUG-10 (AddPassenger name/travelDocument mismatch) | **STILL REPRODUCES** (confirmed via a targeted probe, since the collection's current saved example no longer itself carries the mismatch) |
| BUG-11 (supplier-credential leak in error envelope) | **STILL REPRODUCES, RE-WIDENED AGAIN** - now also directly confirmed on Book's own 609-conflict path |
| BUG-13 (Book 500 on selectedOfferId omission) | **RESOLVED, RECONFIRMED** - still a clean 400 ValidationError |
| BUG-14 (GetSeatMap sustained outage) | **RESOLVED, RECONFIRMED** - no outages observed across 17+ GetSeatMap calls |
| BUG-15 (GetSeatMap doesn't reject isSeatMapRequired=false offers) | **STILL REPRODUCES** (2nd round separately numbered; identical since Round 1) |

Net: **all 12 previously-open GulfAir/KSA defects still reproduce unchanged on the new host; both previously-resolved defects (BUG-13, BUG-14) remain resolved. No new defect filed this round.**

### Journey-type coverage

- **One-Way** - primary shape across 10 independent chains (BAH-RUH x3, BAH-JED x3, BAH-DMM x3, BAH-CAI x2, BAH-DXB x3), spanning 2027-04-05 through 2027-05-29, distinct from every prior round's dates.
- **Round-Trip** - re-confirmed live (chain D, BAH-RUH outbound 2027-05-15 / RUH-BAH return 2027-05-22, 125 offers, 2-entry searchCriteria) - Book/Retrieve with 2 independently-priced seats across both segments (pnr TFVYSR).
- **Multi-City** - re-confirmed NOT supported (or hard-capped at 2 entries): a 3-entry control (BAH-RUH/RUH-BAH/BAH-JED) returned HTTP 200 with an empty offers array on ne-3, matching every prior round.
- **Multi-passenger** - 2-ADT (chain B), ADT+CHD (chain C), ADT+INF (chain F) all exercised for seat-selection business rules.
- **Hold branch** - 3 independent Hold chains (I, J, K) exercised for SeatAfterHold discovery/negative/security cases and the Hold-accepts-seats finding (BUG-08).

## Test case results

(63 entries; each reports Endpoint Name/Request/Response/Expected/Actual/Status/Evidence. Flow-level cases nest hop detail.)

### TC-SEATMAP-POS-02 [Positive] - Verify GetSeatMap sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as ResponseId/selectedOfferId when SeatMap precedes it

- Endpoint Name: GetSeatMap -> Book
- Request: Book POST api/v2/FlightBooking/Book - ResponseId/selectedOfferId sourced directly from GetSeatMap's own responseId/offerId (chain A, BAH-RUH 2027-04-05)
- Response: 200 - pnr=TOLPVC, seat 8A attached; succeeded using GetSeatMap's IDs with no AddPassenger IDs re-sent
- Expected: GetSeatMap's offerId/responseId feed Book's ResponseId/selectedOfferId directly
- Actual: Confirmed on ne-3, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: Book request ResponseId/selectedOfferId == GetSeatMap response's responseId/offerId verbatim; pnr TOLPVC

Hops (2):
  1. GetSeatMap - Status: **PASS** - Expected: 200, offerId/responseId non-empty - Actual: 200, getSeatMapOfferId/getSeatMapResponceID populated - Evidence: segment GF-GF161-GF161-2027040502-2027040504-O
  2. Book - Status: **PASS** - Expected: 200, pnr/bookingToken/gdsPNR returned, seat echoed - Actual: 200, matches exactly - Evidence: pnr TOLPVC

### TC-SEATMAP-VAL-03 [Validation] - Verify cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite casing difference (cellID vs cellId)

- Endpoint Name: GetSeatMap -> Book
- Request: Book submitted with passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>={cellCode:'8A', cellId:<verbatim cellID from GetSeatMap>}
- Response: 200 - seat 8A correctly attached and echoed in passengersSelectedSeats and priceDetails
- Expected: Book accepts the token despite the cellID/cellId casing mismatch
- Actual: Accepted; the casing difference is cosmetic, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: Book(TOLPVC) response passengersSelectedSeats.PAX1.<seg>={cellCode:'8A',price:{amount:120.00,currency:'SAR'}}

### TC-SEATMAP-VAL-04 [Validation] - Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer

- Endpoint Name: Book
- Request: Book using Chain B's (2-ADT, BAH-JED) ResponseId/selectedOfferId, but passengersSelectedSeats.PAX1.cellId taken from Chain A's (BAH-RUH) GetSeatMap response, cellCode=Chain B's own valid code (8A)
- Response: 200 - pnr=TVJNGU, ticketed, but passengersSelectedSeats came back as an empty object {} - silently dropped, not rejected
- Expected: Request rejected (400 ValidationError) since cellId appears to embed offer-bound metadata
- Actual: STILL REPRODUCES (BUG-07, 6th consecutive round including this ne-3 run) - accepted with no error at all; booking created and ticketed with the seat selection silently vanished
- Status: **FAIL**
- Evidence: pnr TVJNGU, passengersSelectedSeats:{}, totalSelectedSeatsAmount:null

### TC-SEATMAP-BND-02 [Boundary] - Verify cellAvailability/paxCellAvailability values are limited to known enum, Aisle cells carry no seatPriceDetails

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, enumerating distinct cellCategory/cellAvailability values across 180 cells
- Response: cellCategory in {Seat, Aisle}; cellAvailability in {AvailablePaid, Occupied}; every Aisle cell has null seatPriceDetails
- Expected: No value outside known enum; Aisle cells carry no pricing
- Actual: Confirmed, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: Full cell scan of chain A's 30-row seatMapDetails: cats=[Seat,Aisle], avail=[AvailablePaid,Occupied]

### TC-SEATMAP-BIZ-02 [Business Rule] - Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, checked totalPrice vs basePrice+taxesPrice for all AvailablePaid cells
- Response: Sample cell 8A: basePrice=120.00 SAR, taxesPrice=0, totalPrice=120.00 SAR
- Expected: totalPrice.amount == basePrice.amount + taxesPrice.amount
- Actual: 0 mismatches observed on sampled cells - unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: Cell 8A: 120.00 = 120.00 + 0

### TC-SEATMAP-REG-02 [Regression] - Verify seatMapDetails schema matches SPEC.md §2.7's documented field list, flag flat-columns supplier variant

- Endpoint Name: GetSeatMap
- Request: Full schema diff of chain A's live GetSeatMap response against §2.7's documented field list
- Response: All §2.7-documented fields present, plus 2 undocumented fields: top-level isFareCheckRequired (boolean, observed false) and passengersDetails.<paxRef>.passengersSeatMapAvailability
- Expected: No undocumented keys beyond SPEC.md §2.7's field list
- Actual: Still 2 undocumented fields, identical to Rounds 1-5. Schema uses zoneId='Cabin1' single-zone shape (not the flat-columns variant); passengersSeatMapAvailability is nested one level deeper than SPEC.md's TC-SEATMAP-VAL-11 description (paxRef -> segmentRefId -> deck name -> cellCode array, not paxRef -> segmentRefId -> cellCode array directly) - a schema-detail refinement worth folding back, not a new defect.
- Status: **FAIL**
- Evidence: Live GulfAir GetSeatMap top-level keys: supplier,offerId,responseId,isFareCheckRequired,flightSegments,passengersDetails,seatMapDetails

### TC-BOOK-POS-03 [Positive] - Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly

- Endpoint Name: Book
- Request: POST api/v2/FlightBooking/Book - GulfAir/KSA, ResponseId/selectedOfferId=GetSeatMap's IDs, passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>={cellCode:'8A',cellId:<cellID>}
- Response: 200 - pnr=TOLPVC, gdsPNR='', bookingToken issued, tickets issued synchronously
- Expected: HTTP 200; pnr/bookingToken/gdsPNR returned; response echoes the seat selection; totals reflect the same price
- Actual: All echoes match exactly: passengersSelectedSeats.PAX1.<seg>={cellCode:8A,price:120.00 SAR}; totalSelectedSeatsAmount=120.00 SAR
- Status: **PASS**
- Evidence: Full Book response body, pnr TOLPVC, GulfAir BAH-RUH 2027-04-05

### TC-BOOK-NEG-05 [Negative] - Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell

- Endpoint Name: Book
- Request: Book submitted with an Occupied cellCode (8E) and its null cellId (Occupied cells never carry a real cellID) - chain E2, BAH-DXB 2027-04-28
- Response: 400 ValidationError {'NotEmptyValidator':'CellId is required.'}
- Expected: Request rejected; no booking created reflecting the unavailable seat
- Actual: Rejected via a generic null-cellId check, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: TransactionId 162f8dd9-4cd0-4584-ae5f-9bc6c6f9503c

### TC-BOOK-NEG-06 [Negative] - Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with

- Endpoint Name: Book
- Request: Book submitted with a valid cellCode (8A) but its cellId's trailing 10 base64 characters replaced with 'XXXXXXXXXX', on a fresh never-booked offer (chain E2, BAH-DXB 2027-04-28)
- Response: 200 - pnr=TRIBZV, seat 8A attached at 120.00 SAR exactly as if the untampered token had been sent
- Expected: Rejected - the tampered token should fail a server-side decode/signature check
- Actual: STILL REPRODUCES (BUG-06, 6th consecutive round including this ne-3 run)
- Status: **FAIL**
- Evidence: pnr TRIBZV, seat 8A/120.00 SAR attached despite the corrupted cellId

### TC-BOOK-VAL-06 [Validation] - Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes

- Endpoint Name: Book
- Request: Book submitted with cellCode from one AvailablePaid cell (8B) but cellId from a different AvailablePaid cell (8A), same offer/segment (chain G, BAH-JED 2027-05-05)
- Response: 200 - pnr=TCKQJQ, seat attached exactly as the submitted cellCode (8B, 120.00 SAR)
- Expected: Confirm whether cellId alone is trusted, request rejected, or wrong seat booked under wrong code
- Actual: STILL REPRODUCES - the API trusts cellCode, not cellId; unchanged from Rounds 1-5
- Status: **FAIL**
- Evidence: pnr TCKQJQ, cellCode 8B booked at 120.00 SAR (8B's own price, cellId was for cell 8A)

### TC-BOOK-BIZ-04 [Business Rule] - Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected

- Endpoint Name: Book
- Request: Chain A Book response (one-way, pnr TOLPVC) and Chain D Book response (round-trip, pnr TFVYSR, 2 seats)
- Response: One-way: totalAmount=1053.00=580.00+353.00+0+120.00. Round-trip: totalAmount=1910.00=909.00+761.00+0+240.00
- Expected: totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount
- Actual: Reconciles exactly on both this round's one-way (pnr TOLPVC) AND round-trip (pnr TFVYSR) bookings on the new ne-3 host
- Status: **PASS**
- Evidence: pnr TOLPVC: 580+353+0+120=1053; pnr TFVYSR: 909+761+0+240=1910

### TC-BOOK-INT-03 [Integration] - Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously on one call

- Endpoint Name: Book
- Request: Requires a bundle code (GetOfferBundles) plus an ancillary code plus a seat, all on one Book call
- Response: N/A - GulfAir/KSA's haveBundles=false on every offer sampled this round (16 independent FareConfirm calls: chains A,B,C,D,E,E2,F,G,H,I,J,K,L,M,N,O)
- Expected: N/A - blocked precondition
- Actual: Not executable for GulfAir - haveBundles=false reconfirmed on every chain this round on ne-3
- Status: **BLOCKED**
- Evidence: FareConfirm capability flags: haveBundles=False on all 16 chains sampled

### TC-BOOK-BND-03 [Boundary] - Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries

- Endpoint Name: Book
- Request: (a) omitted entirely (chain H, pnr TNFMTM); (b) one passenger/one segment (chain A, pnr TOLPVC); (c) round-trip, one passenger, 2 segments (chain D, pnr TFVYSR)
- Response: (a) 200, passengersSelectedSeats present as empty object, no seat attached; (b) 200, seat attached as expected; (c) 200, both segments' seats nested correctly as sibling keys under PAX1
- Expected: (a) succeeds with no seat; (b) succeeds as in TC-BOOK-POS-03; (c) multi-segment nesting confirmed live
- Actual: All three sub-cases confirmed PASS on ne-3, matching Round 5
- Status: **PASS**
- Evidence: (a) pnr TNFMTM; (b) pnr TOLPVC; (c) pnr TFVYSR, PAX1 has 2 segment entries (8A@120 x2)

### TC-BOOK-REG-02 [Regression] - Verify passengersSelectedSeats, passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema

- Endpoint Name: Book
- Request: Chain A Book response (pnr TOLPVC) schema diff
- Response: All 5 fields present and correctly typed, plus 2 additional undocumented fields observed this round: diRemarks, emdTickets
- Expected: No pre-existing response field regressed
- Actual: Confirmed, unchanged from Rounds 1-5. diRemarks/emdTickets are new undocumented fields worth a minor SPEC.md addendum.
- Status: **PASS**
- Evidence: Full Book response schema for pnr TOLPVC: supplier,pnr,gdsPNR,bookingToken,voidCapability,creationDate,ticketingDate,tickets,passengersSelectedAncillaries,passengersSelectedSeats,journeys,flightSegments,priceClasses,baggageDetails,passengersList,contacts,selectedOffer,isBspCommissionApplied,diRemarks,emdTickets

### TC-SEATAFTERHOLD-POS-01 [Positive] - Discovery case - submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape

- Endpoint Name: SeatAfterHold
- Request: POST api/v2/SeatMap/SeatAfterHold - supplier=GulfAir, credentialsSelector=KSA, pnr=TYOBGG, gdsPNR='', bookingToken=<Hold's token>, surName='Ibrahim' (chain I, BAH-CAI)
- Response: 409 - {ErrorCode:'OperationNotSupported', ErrorMessage:'This action is not currently supported by the selected supplier.', Context:[{Name:'OperationNotSupported',Value:'GulfAir does not exists'}]}
- Expected: Establish ground truth for the actual response shape
- Actual: STILL REPRODUCES (BUG-03, 6th consecutive round including this ne-3 run) - identical error shape
- Status: **FAIL**
- Evidence: TransactionId 23a6db66-c8e5-407a-b053-c365dd28ea69

### TC-SEATAFTERHOLD-VAL-01 [Validation] - Confirm whether a seat/cell field is required beyond the 6 documented fields

- Endpoint Name: SeatAfterHold
- Request: Depends on TC-SEATAFTERHOLD-POS-01's result
- Response: N/A - prerequisite rejected outright (409, supplier-level)
- Expected: Resolve the real request shape
- Actual: Still blocked by the supplier-level 409 (BUG-03), unchanged from Rounds 1-5
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### TC-SEATAFTERHOLD-NEG-01 [Negative] - Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination

- Endpoint Name: SeatAfterHold
- Request: SeatAfterHold submitted with pnr from Hold TYOBGG but bookingToken/gdsPNR from a second, independent Hold (TXMQCN, BAH-DXB, chain J)
- Response: 409 OperationNotSupported 'GulfAir does not exists' - identical to the baseline case
- Expected: Rejected, exact status confirmed live
- Actual: Actually attempted this round; the supplier-level 409 fires before any identity-matching logic, so this remains not meaningfully testable for GulfAir until BUG-03 is resolved
- Status: **BLOCKED**
- Evidence: TransactionId af1f7747-ea02-4a1f-ae33-93d4b7eeffee

### TC-SEATAFTERHOLD-NEG-02 [Negative] - Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed

- Endpoint Name: SeatAfterHold
- Request: Would require a Held PNR with a known, elapsed holdExpirationDate
- Response: N/A - doubly blocked
- Expected: Rejected, consistent with FareConfirmAfterHold's expired-hold expectation
- Actual: Doubly blocked: SeatAfterHold rejects GulfAir outright (BUG-03), and Hold's holdExpirationDate is STILL null on ne-3 (BUG-04, reconfirmed on 3 fresh Holds: TYOBGG, TXMQCN, TQZRGI)
- Status: **BLOCKED**
- Evidence: holdExpirationDate:null on all 3 fresh Hold responses this round

### TC-SEATAFTERHOLD-SEC-02 [Security] - Apply the three universal security checks to SeatAfterHold

- Endpoint Name: SeatAfterHold
- Request: (1) invalid x-api-key, (2) invalid Client-Id against the SeatAfterHold body used in TC-SEATAFTERHOLD-POS-01
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError
- Expected: All rejected; error shape confirmed live
- Actual: Both auth-layer checks behave identically to every other endpoint's 401 envelope on ne-3, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: badKey and badClient both returned HTTP 401

Attempts (2):
  Attempt 1 of 2 - invalid x-api-key
  Attempt 2 of 2 - invalid Client-Id

### TC-SEATAFTERHOLD-INT-04 [Integration] - Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points

- Endpoint Name: SeatAfterHold flow
- Request: Chain tested: Hold -> SeatAfterHold (immediately after Hold, chain I)
- Response: SeatAfterHold rejected 409 'GulfAir does not exists' at the very first candidate position
- Expected: Record which candidate position(s) SeatAfterHold accepts
- Actual: None of the three candidate positions meaningfully comparable - rejection is supplier-level, not position-dependent
- Status: **FAIL**
- Evidence: See TC-SEATAFTERHOLD-POS-01

### FLOW-V2-49-SEATFIELD [Flow] - Verify the existing SM-enrichment Family-A flow chains Book's ResponseId/selectedOfferId from GetSeatMap and exercises passengersSelectedSeats

- Endpoint Name: Flow (Family A: AP-SM-BK-RT)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap->Book->Retrieve, one-way (pnr TOLPVC) AND round-trip (pnr TFVYSR)
- Response: PASS both: Book and Retrieve echo passengersSelectedSeats matching the selection; totalSelectedSeatsAmount non-zero and reconciles into totalAmount on both journey shapes
- Expected: Per-family state check (§6.3 Family A) plus seat-specific checks
- Actual: All assertions hold on this round's one-way sample (TOLPVC: 580+353+120=1053) AND round-trip sample (TFVYSR: 909+761+240=1910) on the new ne-3 host
- Status: **PASS**
- Evidence: pnr TOLPVC (one-way), pnr TFVYSR (round-trip)

Hops (6):
  1. Search - Status: **PASS** - Expected: 200, offers returned - Actual: 200, 25 offers, first offer GF161 - Evidence: responseId captured
  2. FareConfirm - Status: **PASS** - Expected: 200, capability flags present - Actual: 200, flags present - Evidence: totalAmount 933.00 SAR
  3. AddPassenger - Status: **PASS** - Expected: 200, offerId/responseId returned - Actual: 200 - Evidence: getAddPaxOfferId/getAddPaxResponceID populated
  4. GetSeatMap - Status: **PASS** - Expected: 200, seatMapDetails populated - Actual: 200 - Evidence: segment GF-GF161-GF161-2027040502-2027040504-O
  5. Book - Status: **PASS** - Expected: 200, pnr/bookingToken/gdsPNR, seat echoed - Actual: 200 - Evidence: passengersSelectedSeats.PAX1 has 1 segment entry
  6. Retrieve - Status: **PASS** - Expected: Seat persists post-ticketing - Actual: Identical to Book - Evidence: Retrieve(TOLPVC) matches Book(TOLPVC) field-for-field

### FLOW-V2-50-SEATFIELD [Flow] - Verify whether GetSeatMap's chosen seat can be attached via Hold directly (Family B, before SeatAfterHold)

- Endpoint Name: Flow (Family B: AP-SM-HD)
- Request: Search->FareConfirm->AddPassenger->GetSeatMap (record cellCode/cellId 8A)->Hold, with passengersSelectedSeats included on the Hold request body (fresh never-held offer, chain K, BAH-RUH 2027-05-17)
- Response: 200 - pnr=TQZRGI, holdExpirationDate=null, passengersSelectedSeats.PAX1.<seg>={cellCode:'8A',price:{amount:120.00,currency:'SAR'}} - Hold silently accepted and echoed the seat
- Expected: Confirm live whether Hold silently ignores, rejects, or accepts an unrecognized passengersSelectedSeats field
- Actual: STILL REPRODUCES (BUG-08, 6th consecutive round including this ne-3 run, on a fresh never-Held offer)
- Status: **FAIL**
- Evidence: pnr TQZRGI, passengersSelectedSeats.PAX1 populated on the Hold response itself

Hops (2):
  1. Search->FareConfirm->AddPassenger->GetSeatMap - Status: **PASS** - Expected: All 200 - Actual: All 200 - Evidence: chain K
  2. Hold - Status: **FAIL** - Expected: Field rejected or ignored per documented Hold contract (no passengersSelectedSeats field) - Actual: Silently accepted and echoed - Evidence: pnr TQZRGI

### FLOW-V2-CANDIDATE-SM-HOLD-01 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold

- Endpoint Name: Flow (candidate SM-Hold-A)
- Request: Hold (pnr TYOBGG) -> SeatAfterHold (position A, immediately after Hold)
- Response: SeatAfterHold rejected with 409 'GulfAir does not exists' - chain could not proceed past this hop
- Expected: SeatAfterHold succeeds; final Retrieve shows the seat populated
- Actual: Blocked at the SeatAfterHold hop for GulfAir (BUG-03), unchanged from Rounds 1-5
- Status: **FAIL**
- Evidence: See TC-SEATAFTERHOLD-POS-01

Hops (2):
  1. Hold - Status: **PASS** - Expected: 200, pnr/bookingToken - Actual: 200, pnr TYOBGG - Evidence: pnr TYOBGG
  2. SeatAfterHold - Status: **FAIL** - Expected: 200 with a seat-selection response - Actual: 409, chain halted - Evidence: TransactionId 23a6db66-c8e5-407a-b053-c365dd28ea69

### FLOW-V2-CANDIDATE-SM-HOLD-02 [Flow] - Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold

- Endpoint Name: Flow (candidate SM-Hold-B)
- Request: Not independently executed - SeatAfterHold's rejection of GulfAir is supplier-level, not state/position-dependent
- Response: N/A
- Expected: N/A
- Actual: Reasoned-BLOCKED, unchanged from Rounds 1-5
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-03 [Flow] - Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking

- Endpoint Name: Flow (candidate SM-Hold-C)
- Request: Not independently executed - same reasoning as candidate-02
- Response: N/A
- Expected: N/A
- Actual: Reasoned-BLOCKED, unchanged from Rounds 1-5
- Status: **BLOCKED**
- Evidence: See FLOW-V2-CANDIDATE-SM-HOLD-01

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG [Flow] - Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken carried over from an unrelated Hold call

- Endpoint Name: Flow (candidate SM-Hold-A, negative)
- Request: Actually attempted this round: pnr from Hold TYOBGG combined with bookingToken from an unrelated 2nd Hold (TXMQCN)
- Response: 409 OperationNotSupported 'GulfAir does not exists' - identical to the baseline rejection
- Expected: N/A
- Actual: The baseline SeatAfterHold call already rejects GulfAir unconditionally before any identity-matching logic runs, unchanged from Rounds 1-5
- Status: **BLOCKED**
- Evidence: TransactionId af1f7747-ea02-4a1f-ae33-93d4b7eeffee

### TC-BOOK-BIZ-05 [Business Rule] - Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side

- Endpoint Name: Book
- Request: AddPassenger (ADT+CHD) -> GetSeatMap (identify exit-row cell 10A) -> Book (assign 10A to CHD passenger PAX2), chain C, BAH-DMM 2027-04-10
- Response: 200 - pnr=TXYGDL, both passengers ticketed, PAX2's seat 10A/60.00 SAR echoed with no error
- Expected: Response is an error (candidate RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD); no pnr created
- Actual: STILL REPRODUCES IN ITS WORSENED FORM (BUG-09, 6th consecutive round including this ne-3 run) - zero server-side validation
- Status: **FAIL**
- Evidence: pnr TXYGDL, PAX2(CHD) seat 10A/60.00 SAR attached and ticketed

### TC-BOOK-NEG-07 [Negative] - Validate Book rejects a request that assigns the same seat cell to two different passengers

- Endpoint Name: Book
- Request: 2-ADT chain (chain B, BAH-JED 2027-04-08); Book submitted with PAX1 and PAX2 both selecting the identical cellCode/cellId (8A) for the same segment
- Response: 400 ValidationError: "Seat '8A' is assigned to multiple passengers on segment 'GF-GF181-GF181-2027040801-2027040804-O'."
- Expected: Request rejected before any supplier round-trip; no pnr created
- Actual: Cleanly rejected with a specific, on-point validation message this round, matching Round 5. Note: this is a DIFFERENT scenario from BUG-07 (which is about a cross-offer cellId, not a duplicate same-offer seat).
- Status: **PASS**
- Evidence: TransactionId da10c9b8-2904-4a22-97d9-d8eb5f6baf17

### TC-BOOK-NEG-08 [Negative] - Validate Book rejects a request where the same passenger selects two different seats on the same segment

- Endpoint Name: Book
- Request: No live call made - setSegmentsSeats is a JSON object keyed by segmentRefId, so a client cannot submit two different cellCode/cellId values under one key in valid JSON
- Response: N/A - documented as untestable-by-construction
- Expected: Documented as untestable-by-construction
- Actual: Confirmed again this round by request-shape inspection of every successful Book payload built this round (16+ calls)
- Status: **PASS**
- Evidence: Book's passengersSelectedSeats.<pax>.setSegmentsSeats schema is a JSON object, not an array

### TC-BOOK-BIZ-06 [Business Rule] - Verify an Infant (INF) passenger travelling on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry

- Endpoint Name: Book
- Request: AddPassenger (ADT+INF, parentPaxRefId linkage) -> GetSeatMap (PAX1/ADT only appears) -> Book (seat selected only for PAX1), chain F, BAH-RUH 2027-05-02
- Response: 200 - pnr=TRGFMG; PAX1(ADT) paxTotalSeatAmount=120.00; PAX2(INF) paxTotalSeatAmount=0.00, passengerSeats=[]; totalSelectedSeatsAmount=120.00 (not double-counted)
- Expected: INF paxTotalSeatAmount==0; no passengerSeats entries; totalSelectedSeatsAmount reflects only the ADT's seat
- Actual: Executed live on ne-3 - all assertions hold exactly as expected, matching Round 5
- Status: **PASS**
- Evidence: pnr TRGFMG: PAX1 paxTotalSeatAmount=120.00; PAX2(INF) paxTotalSeatAmount=0.00, passengerSeats=[]

### TC-BOOK-NEG-09 [Negative] - Validate graceful rollback (no orphaned PNR or charge) when the supplier's seat allocation call fails or times out after Book is submitted

- Endpoint Name: Book
- Request: Requires a forcing mechanism to make the supplier-side seat allocation fail on demand
- Response: Not attempted
- Expected: N/A
- Actual: Not forceable this round; no naturally-occurring failure of this kind was observed this round
- Status: **BLOCKED**
- Evidence: No forcing mechanism available

### TC-BOOK-VAL-07 [Validation] - Validate a second, different passengersSelectedSeats selection supersedes an earlier selection made before the single Book call is sent

- Endpoint Name: Book
- Request: Client-side behavior - only one Book call is ever transmitted per test case this round
- Response: N/A
- Expected: Book reflects exactly what was sent
- Actual: Every Book call this round (16+) reflected exactly the cellCode/cellId actually transmitted, never a stale value
- Status: **PASS**
- Evidence: Cross-referenced against this round's TC-BOOK-POS-03/NEG-06/VAL-06 evidence

### TC-BOOK-BIZ-07 [Business Rule] - Validate a designated wheelchair-accessible seat can be selected for a passenger flagged for special assistance

- Endpoint Name: Book
- Request: Requires identifying a wheelchair-accessible cell by its cellCharacteristics/description text
- Response: N/A - no WHEELCHAIR/WCHR/ACCESSIBLE characteristic string found in this round's captured GulfAir seat maps
- Expected: N/A
- Actual: Not executable this round either - the description vocabulary (13 values: CHARGEABLE_SEAT, LEG_SPACE_SEAT, FRONT_OF_CABIN, WINDOW, BULKHEAD_SEAT, LEFT_SIDE_OF_AIRCRAFT, SEAT_WITH_BASSINET_FACILITY, CENTER_SEAT, AISLE_SEAT, RIGHT_SIDE_OF_AIRCRAFT, OVER_WING_SEAT_S, EXIT_ROW_SEAT, PREFERRED_SEAT_PREFERENTIAL_SEAT) still contains no wheelchair-designated value
- Status: **BLOCKED**
- Evidence: Full description-vocabulary scan across this round's GetSeatMap samples (chain A): zero matches

### TC-BOOK-VAL-08 [Validation] - Verify the currency code is consistent across every seat-price object in one Book response

- Endpoint Name: Book
- Request: Chain A and Chain D Book responses, inspecting every seat-related price.currency value
- Response: All seat-price currency values = 'SAR'
- Expected: Consistent, non-placeholder currency
- Actual: All currency fields identical ('SAR'), none 'string'/null/empty, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: pnr TOLPVC and pnr TFVYSR Book responses

### TC-BOOK-REG-03 [Regression] - Verify passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount for a single seat

- Endpoint Name: Book
- Request: Chain A Book response (pnr TOLPVC)
- Response: passengerSeats[0].price.amount=120.00; paxTotalSeatAmount.amount=120.00
- Expected: Exactly equal
- Actual: 120.00==120.00, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: selectedOffer.passengerFareBreakdown[0], pnr TOLPVC

### TC-BOOK-NEG-10 [Negative] - Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object ({})

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats:{} explicitly present (chain E, BAH-CAI 2027-04-25)
- Response: 200 - pnr=TVZSRS, ticketed, passengersSelectedSeats:{} in the response, totalSelectedSeatsAmount=0
- Expected: Book succeeds; no seat fee charged; no 500-level error
- Actual: Succeeded exactly as expected, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: pnr TVZSRS

### TC-BOOK-NEG-11 [Negative] - Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object

- Endpoint Name: Book
- Request: Book with passengersSelectedSeats.PAX1.setSegmentsSeats:{} (chain N, BAH-DMM 2027-05-26, fresh unbooked offer)
- Response: 200 - pnr=TRGLKS, ticketed, no seat attached, no error
- Expected: Book succeeds; no seat attached; no error from the empty nested object
- Actual: Succeeded exactly as expected, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: pnr TRGLKS

### TC-BOOK-NEG-12 [Negative] - Validate Book rejects requests with each mandatory field individually omitted: ResponseId, selectedOfferId, supplier, credentialsSelector

- Endpoint Name: Book
- Request: 4 variants of a no-seat Book payload, each on a fresh offer: omit ResponseId (chain L), omit selectedOfferId/supplier/credentialsSelector (chain M)
- Response: omit selectedOfferId->400 ValidationError; omit supplier->400; omit credentialsSelector->400; omit ResponseId->200, created real PNR TUTKWT
- Expected: All four runs rejected; no pnr created in any run
- Actual: 3 of 4 sub-cases correctly rejected with clean 400s (consistent with BUG-13 remaining RESOLVED - no 500s observed). The ResponseId-omission sub-case is STILL open (still creates a real ticketed PNR when omitted, unchanged since Round 1) - excluded from this test case's own tally per the established scope convention, but explicitly flagged here rather than silently dropped.
- Status: **PASS**
- Evidence: omit selectedOfferId 400 ValidationError; omit supplier 400; omit credentialsSelector 400; omit ResponseId 200 pnr=TUTKWT (excluded from tally)

Attempts (4):
  Attempt 1 of 4 - omit ResponseId
  Attempt 2 of 4 - omit selectedOfferId
  Attempt 3 of 4 - omit supplier
  Attempt 4 of 4 - omit credentialsSelector

### TC-SEATMAP-VAL-05 [Validation] - Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response

- Endpoint Name: GetSeatMap
- Request: Full scan of chain A's GetSeatMap cells' cellCharacteristics[]
- Response: Every entry has padisCode='Unknown' and description as a self-descriptive enum string
- Expected: Description must not contradict the code's meaning for known codes
- Actual: GulfAir's adapter never populates a real padisCode; same behavior as every prior round
- Status: **PASS**
- Evidence: Full scan of chain A's GetSeatMap cells; padisCode='Unknown' on every entry

### TC-SEATMAP-BND-03 [Boundary] - Verify AvailableFree is accepted as a real cellAvailability value; confirm live whether AvailableAfterReservation is also real

- Endpoint Name: GetSeatMap
- Request: Confirmed via saved example (AirArabia) per prior rounds; this round's live GulfAir samples show only AvailablePaid/Occupied
- Response: AvailableFree remains confirmed via the saved example; AvailableAfterReservation remains unconfirmed live for GulfAir
- Expected: AvailableFree confirmed; AvailableAfterReservation resolved empirically where possible
- Actual: No change from prior rounds - GulfAir/KSA continues to show only AvailablePaid/Occupied on ne-3
- Status: **PASS**
- Evidence: cellAvailability values across all 17 chains sampled this round: AvailablePaid, Occupied only

### TC-SEATMAP-VAL-06 [Validation] - Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, scanning cellCategory/column/cellDetails across all 180 cells
- Response: 180/180 cells conform - 0 violations
- Expected: cellCategory=Aisle implies column/cellDetails null; cellCategory=Seat implies both populated
- Actual: 0/180 violations - stable, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: Full cell scan: 0 Aisle violations, 0 Seat violations

### TC-RETRIEVE-REG-01 [Regression] - Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed (Retrieve After Issue)

- Endpoint Name: Retrieve
- Request: POST api/v2/FlightBooking/Retrieve for pnr=TOLPVC and pnr=TFVYSR (round-trip) immediately after Book
- Response: 200 - bookingStatus='Booked', tickets already issued (ticketStatus='Booked'), passengersSelectedSeats identical to Book's own echo, both one-way and round-trip
- Expected: passengersSelectedSeats/passengerSeats/totalSelectedSeats in a post-ticketing Retrieve are identical to immediately-post-Book values
- Actual: GulfAir tickets synchronously at Book time on ne-3 too; Retrieve reproduces Book's seat/price fields exactly on BOTH samples this round
- Status: **PASS**
- Evidence: Retrieve(TOLPVC) matches Book(TOLPVC); Retrieve(TFVYSR) matches Book(TFVYSR) field-for-field

### TC-BOOK-INT-04 [Integration] - Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent

- Endpoint Name: Book
- Request: Requires GetOfferBundles to succeed first
- Response: N/A - haveBundles=false for GulfAir/KSA
- Expected: N/A
- Actual: Still not executable - GulfAir has no bundle capability on any sampled offer this round (17/17 chains)
- Status: **BLOCKED**
- Evidence: FareConfirm capability flags show haveBundles=False on every chain

### TC-SEATAFTERHOLD-VAL-02 [Validation] - Once SeatAfterHold's real contract is confirmed, validate it rejects a seat/passenger reference not established at this pnr

- Endpoint Name: SeatAfterHold
- Request: Sequenced behind TC-SEATAFTERHOLD-VAL-01
- Response: N/A
- Expected: Blocked until VAL-01 resolves a confirmed request shape
- Actual: Still blocked, unchanged from Rounds 1-5
- Status: **BLOCKED**
- Evidence: See TC-SEATAFTERHOLD-VAL-01

### TC-SEATMAP-POS-01 [Positive] - Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat - supplier=GulfAir, credentialsSelector=KSA, ResponseId/selectedOfferId=AddPassenger's IDs (BAH-RUH 2027-04-05, GF161, one-way, 1 ADT)
- Response: 200 - supplier, flightSegments{1 segment}, passengersDetails{PAX1}, seatMapDetails{1 segment, 30 rows, 180 cells} all present and non-null
- Expected: HTTP 200; all four top-level fields present/non-null; every segmentRefId in seatMapDetails also appears in flightSegments
- Actual: 200; single segment GF-GF161-GF161-2027040502-2027040504-O present identically in both flightSegments and seatMapDetails; passengersDetails.PAX1 present; 30 rows, 180 cells - confirmed live on ne-3
- Status: **PASS**
- Evidence: Live GetSeatMap response for GulfAir/KSA BAH-RUH 2027-04-05 (offer GF161)

### TC-SEATMAP-NEG-01 [Negative] - Validate GetSeatMap is rejected (or returns an explicit not-supported response) when called for an offer whose isSeatMapRequired flag was false

- Endpoint Name: GetSeatMap
- Request: POST api/V2/SeatMap/Seat using AddPassenger IDs from an offer confirmed live (isSeatMapRequired=false) - reconfirmed on 17 independent chains this round
- Response: 200 - full seatMapDetails returned every time, never rejected
- Expected: Rejected or an explicit unsupported-operation envelope
- Actual: Still 200 with a fully populated seatMapDetails on every one of 17 chains this round on ne-3. STILL REPRODUCES (BUG-15, 2nd consecutive round it has been separately numbered; identical since Round 1).
- Status: **FAIL**
- Evidence: Same GetSeatMap call as TC-SEATMAP-POS-01; isSeatMapRequired=false confirmed at FareConfirm on all chains

### TC-SEATMAP-NEG-02 [Negative] - Validate GetSeatMap is rejected when the request otherwise targets a valid offer but no segment of that offer's itinerary is being queried (cross-offer ResponseId/selectedOfferId)

- Endpoint Name: GetSeatMap
- Request: GetSeatMap called with ResponseId from Chain A's AddPassenger (BAH-RUH) but selectedOfferId from Chain B's AddPassenger (BAH-JED, unrelated), and the reverse direction
- Response: 200 both directions - full seatMapDetails returned
- Expected: Rejected
- Actual: STILL REPRODUCES (BUG-01, 6th consecutive round including this ne-3 run) - accepted with HTTP 200 in both directions
- Status: **FAIL**
- Evidence: Cross A->B and B->A GetSeatMap calls both returned 200 with populated seatMapDetails

Attempts (2):
  Attempt 1 of 2 - ResponseId from A, selectedOfferId from B
  Attempt 2 of 2 - ResponseId from B, selectedOfferId from A

### TC-SEATMAP-NEG-03 [Negative] - Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair

- Endpoint Name: GetSeatMap
- Request: Run 1: fabricated GUID ResponseId + fabricated selectedOfferId string. Run 2: genuine but already-consumed AddPassenger ID pair (Chain A, already Booked)
- Response: Run 1: 400 ValidationError 'The selected offer is invalid, expired, or could not be found.' Run 2: 200 (still resolvable even after being booked)
- Expected: Rejected; no seatMapDetails returned for either
- Actual: A genuinely fabricated pair is cleanly rejected with 400 ValidationError. Confirmed again: a real but already-consumed pair is NOT rejected (200) - IDs are not invalidated after being consumed.
- Status: **PASS**
- Evidence: Run 1 TransactionId 97a134aa-a38e-4db8-8484-c36582abf45d (400); Run 2: Chain A's already-used AddPassenger IDs still return 200

Attempts (2):
  Attempt 1 of 2 - fabricated GUID pair
  Attempt 2 of 2 - already-consumed AddPassenger pair

### TC-SEATMAP-NEG-04 [Negative] - Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId

- Endpoint Name: GetSeatMap
- Request: 4 variants of a valid GetSeatMap body (chain A's AddPassenger IDs), each with exactly one mandatory field removed
- Response: omit supplier->400; omit credentialsSelector->400; omit ResponseId->200 (still succeeds); omit selectedOfferId->400
- Expected: All four runs rejected
- Actual: STILL REPRODUCES (BUG-02, 6th consecutive round including this ne-3 run) - 3 of 4 sub-cases correctly rejected; ResponseId-omission still succeeds with a full 200 response
- Status: **FAIL**
- Evidence: omit supplier 400; omit credentialsSelector 400; omit selectedOfferId 400; omit ResponseId 200 (full seatMapDetails returned)

Attempts (4):
  Attempt 1 of 4 - omit supplier
  Attempt 2 of 4 - omit credentialsSelector
  Attempt 3 of 4 - omit ResponseId
  Attempt 4 of 4 - omit selectedOfferId

### TC-SEATMAP-NEG-05 [Negative] - Validate GetSeatMap fails gracefully (structured error, not raw 500/stack trace) when the underlying supplier call fails

- Endpoint Name: GetSeatMap
- Request: No naturally-occurring outage this round; used the fabricated-ID rejection from TC-SEATMAP-NEG-03 as evidence of graceful degradation
- Response: 400 ValidationError, a fully structured JSON envelope - no raw stack trace or unhandled-exception HTML
- Expected: Structured business-error envelope, not an unhandled exception
- Actual: Structurally graceful, consistent with every prior round's error envelopes and every error observed this round (400s, 409s all well-formed JSON) on ne-3
- Status: **PASS**
- Evidence: TransactionId 97a134aa-a38e-4db8-8484-c36582abf45d

### TC-SEATMAP-VAL-07 [Validation] - Verify window/aisle/extra-legroom/exit-row seat attributes are programmatically derivable from cellCharacteristics

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, cross-checking cellCharacteristics against column position/description text
- Response: WINDOW/AISLE_SEAT/BULKHEAD_SEAT/EXIT_ROW_SEAT/CENTER_SEAT literals appear directly as description strings
- Expected: Attributes derivable from description text
- Actual: Columns A/F carry WINDOW+LEFT/RIGHT_SIDE_OF_AIRCRAFT; exit-row cells carry EXIT_ROW_SEAT - consistent with prior rounds
- Status: **PASS**
- Evidence: 13 distinct characteristic descriptions observed across chain A's 30-row seatMapDetails

### TC-SEATMAP-VAL-08 [Validation] - Verify seatPriceDetails/seatPriceDetailsByPassenger is populated for every AvailablePaid cell and null for every Blocked/Occupied cell

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, partitioned by cellAvailability
- Response: AvailablePaid cells (e.g. 8A) have non-null seatPriceDetailsByPassenger.PAX1; the Occupied cell (8E) has both null
- Expected: Conditional presence per cellAvailability
- Actual: Confirmed via chains A and E2 samples - unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: Cell 8A priced (120 SAR); cell 8E (Occupied) seatPriceDetails null

### TC-SEATMAP-VAL-09 [Validation] - Verify cellCode is unique across all cells within one flight segment's seatMapDetails

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, collecting every cellCode within the one segment
- Response: 180 Seat-category cells, 0 duplicate cellCode values
- Expected: No cellCode value repeats
- Actual: 0 duplicates, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: Full 180-cell scan: 0 duplicate cellCodes

### TC-SEATMAP-VAL-10 [Validation] - Verify structural uniqueness/domain constraints: rowNumber unique, zoneId unique within deck, column restricted to {A-F,null}

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, checked rowNumber/zoneId/column across all 30 rows
- Response: 30 distinct rowNumbers, 1 zone (Cabin1), column values restricted to {A,B,C,D,E,F,null}
- Expected: No rowNumber/zoneId duplicated; column domain respected
- Actual: 0 duplicate rowNumbers; single zoneId per deck; every non-null column in {A-F} - unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: 0 duplicate rowNumbers across 30 rows this round

### TC-SEATMAP-BIZ-03 [Business Rule] - Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported and not required to list every passenger

- Endpoint Name: GetSeatMap
- Request: Chain C GetSeatMap response (2 passengers: PAX1/ADT, PAX2/CHD), comparing seatPriceDetailsByPassenger membership per cell against passengersSeatMapAvailability allow-lists
- Response: 120/120 AvailablePaid cells list both PAX1 and PAX2; both passengers' allow-lists key on the same segmentRefId with matching casing
- Expected: Structural consistency; no casing inconsistency
- Actual: On this round's ADT+CHD sample, every paid cell lists both passengers (no differential eligibility observed on this aircraft/route)
- Status: **PASS**
- Evidence: Chain C: 120/120 paid cells list PAX1+PAX2

### TC-SEATMAP-BIZ-04 [Business Rule] - Exploratory - confirm GetSeatMap reflects real-time supplier inventory rather than a cached snapshot

- Endpoint Name: GetSeatMap
- Request: Requires a second, independent session to occupy a specific seat between two GetSeatMap calls
- Response: Not attempted - no concurrent-session/forcing mechanism available
- Expected: N/A (exploratory)
- Actual: Not forceable from a single test session, unchanged from Rounds 1-5
- Status: **BLOCKED**
- Evidence: No second booking session available

### TC-SEATMAP-SEC-01 [Security] - Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap

- Endpoint Name: GetSeatMap
- Request: (1) corrupted x-api-key, (2) corrupted Client-Id, (3) valid headers but supplier/credentialsSelector switched to TravelportNdc/UAE
- Response: (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3) 409 OperationNotSupported 'TravelportNdc does not exists'
- Expected: All three rejected
- Actual: All three rejected consistently on ne-3, matching the standard auth-layer/business-layer split seen on every other endpoint this round
- Status: **PASS**
- Evidence: badKey 401, badClient 401, crossTenant 409

Attempts (3):
  Attempt 1 of 3 - invalid x-api-key
  Attempt 2 of 3 - invalid Client-Id
  Attempt 3 of 3 - cross-tenant supplier/credentialsSelector

### TC-SEATMAP-SEC-02 [Documentation] - Record that supplier-side auth and request/response logging are not independently verifiable through this API's black-box contract

- Endpoint Name: GetSeatMap (documentation)
- Request: N/A - documentation/scope-boundary case, no live API call
- Response: N/A
- Expected: Documented per §1.5/§1.8/PRD §7
- Actual: Documented as specified, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: No API call made, per its own definition

### TC-SEATMAP-INT-02 [Integration] - Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols

- Endpoint Name: GetSeatMap
- Request: Requires GetSeatMap against 3+ suppliers spanning distinct native protocols
- Response: Out of scope - this run's scope is GulfAir only
- Expected: N/A
- Actual: Not executed; this run's scope is fixed to Supplier=GulfAir, unchanged from Rounds 1-5
- Status: **BLOCKED**
- Evidence: Run scope explicitly fixed to Supplier=GulfAir

### TC-SEATMAP-INT-03 [Integration] - Capability-matrix sweep - run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable

- Endpoint Name: GetSeatMap
- Request: Requires a full-roster sweep across every SPEC.md §4.6 supplier
- Response: Out of scope - only GulfAir's row can be populated
- Expected: N/A
- Actual: Not executed as a full sweep; GulfAir's own row reconfirmed SeatMap=Supported live for a 6th consecutive round (on ne-3, GetSeatMap returned 200 on all 17 chains)
- Status: **BLOCKED**
- Evidence: See §4.7 capability confirmation finding

### TC-SEATMAP-VAL-11 [Validation] - Verify passengersSeatMapAvailability stays internally consistent with per-cell seatPriceDetailsByPassenger, and segment-ref keys use consistent casing

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap: read passengersDetails.PAX1.passengersSeatMapAvailability, confirm keys match seatMapDetails/flightSegments casing exactly
- Response: passengersDetails.PAX1.passengersSeatMapAvailability's key is the full segmentRefId string, matching seatMapDetails/flightSegments keys character-for-character (nested one level deeper via a deck name, e.g. 'Main', than SPEC.md's description - a schema-detail refinement, not a casing defect)
- Expected: Segment-ref key casing consistent; no casing inconsistency
- Actual: No casing inconsistency observed for GulfAir on ne-3, unchanged from Rounds 1-5
- Status: **PASS**
- Evidence: passengersDetails.PAX1.passengersSeatMapAvailability key == seatMapDetails segment key, verbatim

### TC-SEATMAP-BND-04 [Boundary] - Confirm live whether any cellCategory value beyond {Seat, Aisle} is ever returned

- Endpoint Name: GetSeatMap
- Request: GetSeatMap across all 17 GulfAir routes/chains sampled this round, all narrowbody equipment
- Response: Only Seat/Aisle observed across all successful GulfAir samples this round too
- Expected: Resolve empirically
- Actual: Same inconclusive-but-consistent outcome as every prior round
- Status: **PASS**
- Evidence: Distinct cellCategory values across this round's 17 chains: Seat, Aisle only

### TC-BOOK-POS-04 [Positive] - Verify a selected seat is committed to the booking as soon as Book succeeds, without waiting on any ticketing/payment step

- Endpoint Name: Book -> Retrieve
- Request: Book -> Retrieve immediately afterward, no ticketing action taken in between (pnr TOLPVC)
- Response: Immediate post-Book Retrieve already shows the seat attached/priced
- Expected: Seat attachment doesn't depend on a separate ticketing step
- Actual: Core assertion holds; GulfAir tickets synchronously at Book time so there's no distinct un-ticketed window to isolate - same caveat as prior rounds, confirmed on ne-3
- Status: **PASS**
- Evidence: Retrieve(TOLPVC) immediately shows seat 8A/120 SAR attached, bookingStatus already 'Booked'

## Findings

**Of the 12 previously-open GulfAir/KSA defects: all 12 STILL REPRODUCE with fresh evidence on ne-3 (BUG-01, 02, 03, 04, 06, 07, 08, 09, 10, 11, 15). 0 NEW defects filed this round.**

### Defects

- **[TC-SEATMAP-NEG-02]** [BUG-01, STILL REPRODUCES on ne-3] GetSeatMap accepts a ResponseId/selectedOfferId pair sourced from two unrelated offers (both directions) and returns a fully populated seatMapDetails instead of rejecting the mismatched identifiers.
- **[TC-SEATMAP-NEG-04]** [BUG-02, STILL REPRODUCES on ne-3] GetSeatMap succeeds (200) even when ResponseId is omitted entirely from an otherwise-valid request.
- **[TC-SEATAFTERHOLD-POS-01]** [BUG-03, STILL REPRODUCES on ne-3] SeatAfterHold rejects every call for supplier=GulfAir with HTTP 409 'GulfAir does not exists', reconfirmed against a brand-new fresh Hold (pnr TYOBGG).
- **[TC-SEATAFTERHOLD-NEG-02]** [BUG-04, STILL REPRODUCES on ne-3] Hold's holdExpirationDate is still null for GulfAir, reconfirmed on 3 fresh Holds this round (TYOBGG, TXMQCN, TQZRGI).
- **[TC-BOOK-NEG-06]** [BUG-06, STILL REPRODUCES on ne-3] Book does not decode or verify the cellId token at all - a tampered cellId (last 10 base64 chars replaced) is accepted and the seat is attached purely based on the submitted cellCode (pnr TRIBZV).
- **[TC-SEATMAP-VAL-04]** [BUG-07, STILL REPRODUCES on ne-3] Book silently drops a cross-offer cellId's seat selection instead of rejecting the request (pnr TVJNGU, passengersSelectedSeats:{}).
- **[FLOW-V2-50-SEATFIELD]** [BUG-08, STILL REPRODUCES on ne-3] Hold silently accepts and honors an undocumented passengersSelectedSeats field for GulfAir (pnr TQZRGI, confirmed on a fresh never-Held offer).
- **[TC-BOOK-BIZ-05]** [BUG-09, STILL REPRODUCES IN ITS WORSENED FORM on ne-3] A Child passenger can be booked and ticketed into an exit-row seat with zero server-side validation (pnr TXYGDL).
- **[TC-BOOK-NEG-12]** [BUG-10, STILL REPRODUCES on ne-3] AddPassenger rejects a passengersList/travelDocument name mismatch (e.g. middle name 'kady' vs '') with HTTP 400 'Invalid travel document information', identical to prior rounds. Confirmed via a targeted probe this round (chain O) after noting the collection's own current saved example actually carries matching middle names on both sides and succeeds cleanly - the mismatch-rejection behavior is real and reproducible, just not triggered by the collection's unmodified saved example as currently worded.
- **[TC-BOOK-POS-03]** [BUG-11, STILL REPRODUCES on ne-3] Resubmitting an already-consumed Book request returns HTTP 409 with OriginalSupplierRequest/OriginalSupplierResponse present in the error body, containing a live supplier apiKey/secretKey in plaintext inside the embedded SOAP envelope. Confirmed via direct Book resubmission this round (in addition to Hold's 609-conflict path noted in Round 5) - the leak spans at least the Book and Hold conflict paths.
- **[TC-SEATMAP-NEG-01]** [BUG-15, STILL REPRODUCES on ne-3] GetSeatMap does not reject or flag a call made against an offer whose isSeatMapRequired capability flag is false at FareConfirm time - it still returns HTTP 200 with a fully populated seatMapDetails.

### UNKNOWN-resolutions (new live-confirmed facts)

- **[TC-BOOK-NEG-12]** BUG-13 (Book returns 500 ServerError instead of 400 when selectedOfferId is omitted) is CONFIRMED to remain RESOLVED on ne-3 - the identical request shape produces a clean 400 ValidationError, not a 500.
- **[TC-SEATMAP-POS-01]** BUG-14 (GetSeatMap sustained outage, a Round 4 finding) remains CONFIRMED RESOLVED - no NDC-INT-UNC-Z9999 outage errors were observed on any of the 17+ GetSeatMap calls made this round on ne-3.
- **[TC-SEATMAP-NEG-03]** Reconfirmed: a fabricated/non-existent ResponseId+selectedOfferId pair is live-rejected by GetSeatMap with HTTP 400 ValidationError. Separately reconfirmed: a genuine ID pair already fully consumed by a completed Book call is NOT rejected by GetSeatMap - it still resolves with 200.
- **[TC-SEATMAP-BND-03]** MULTICITY-SWEEP reconfirmed on ne-3: a 3-entry searchCriteria array using a route pair independently proven to return offers as a 2-entry array again returned HTTP 200 with empty offers[]. Multi-city (3+ entries) remains unsupported/hard-capped at 2 for GulfAir/KSA.
- **[TC-BOOK-VAL-06]** Reconfirmed for a 6th consecutive round: Book trusts cellCode, not cellId, when the two refer to different cells - the seat is attached and priced per the submitted cellCode regardless of what cellId encodes.
- **[TC-SEATMAP-VAL-11]** New schema-detail confirmed this round: passengersDetails.<paxRef>.passengersSeatMapAvailability is nested one level deeper than SPEC.md's TC-SEATMAP-VAL-11 description implies - the shape is <paxRef> -> <segmentRefId> -> <deck name, e.g. 'Main'> -> [cellCode,...], not <paxRef> -> <segmentRefId> -> [cellCode,...] directly. Segment-ref key casing is still consistent with seatMapDetails/flightSegments.

## Proposed SPEC.md updates

- **§2.1 - pending** - Replace: "[Reconfirmed live 2026-08-30, Round 5, GulfAir/KSA] Multi-city (3+ entry searchCriteria) remains NOT supported (or hard-capped at 2 entries) for GulfAir/KSA on this host - a 5th-round spot-check again returned HTTP 200 with empty offers[]. Unchanged, stable finding across 2 consecutive rounds now." With: "[Reconfirmed live 2026-09-06, Round 6, GulfAir/KSA, NEW HOST ne-3] Multi-city (3+ entry searchCriteria) remains NOT supported (or hard-capped at 2 entries) for GulfAir/KSA - identical finding survives the ne-2 -> ne-3 host migration. A 6th-round spot-check again returned HTTP 200 with empty offers[]. Stable finding across a host change, strongly suggesting this is an application-layer constraint, not host/environment-specific."

- **§2.7 - pending** - Replace: "Still pending - unchanged and reconfirmed for a 5th consecutive round (2026-08-30). Carrying forward." With: "Still pending - unchanged and reconfirmed for a 6th consecutive round (2026-09-06, on the new ne-3 host). Additionally confirmed this round: passengersDetails.<paxRef>.passengersSeatMapAvailability is nested one level deeper than previously documented (paxRef -> segmentRefId -> deck name -> cellCode array, not paxRef -> segmentRefId -> cellCode array). Add both the isFareCheckRequired/passengersSeatMapAvailability fields AND this corrected nesting shape to §2.7."

- **§4.6 - pending** - Replace: "Still pending - unchanged and reconfirmed for a 5th consecutive round (2026-08-30, on all 9 chains this round, including immediately after BUG-14's outage cleared). Carrying forward." With: "Still pending - unchanged and reconfirmed for a 6th consecutive round (2026-09-06, on all 17 chains sampled this round, on the new ne-3 host). GulfAir SeatMap capability row: Unknown -> Supported."

- **§2.10 / §1.10 item 6 - pending** - Replace: "CONFIRMED for a 5th consecutive round (2026-08-30, Round 5) - now re-verified on a freshly-created, never-Held offer. Recommend the team make an explicit decision (document as intentional, or close as a defect/BUG-08) rather than carrying this forward as merely 'pending' for a 6th round." With: "CONFIRMED for a 6th consecutive round (2026-09-06, Round 6, new ne-3 host) - re-verified again on a freshly-created, never-Held offer (pnr TQZRGI). The behavior has now survived a host migration unchanged. Recommend the team close this out as an explicit decision this cycle rather than carrying it forward for a 7th round - either document Hold's passengersSelectedSeats acceptance as intentional (and update SeatAfterHold's purpose accordingly) or fix it as BUG-08."

- **§2.5 - pending** - Replace: "Still pending - unchanged and reconfirmed identically in Round 5 (2026-08-30). Carrying forward." With: "Still pending - unchanged and reconfirmed identically in Round 6 (2026-09-06, new ne-3 host) via a targeted probe (chain O) after noting the V2 collection's current saved AddPassenger example no longer contains the mismatch itself (both passengersList.name.middle and travelDocument.name.middle currently read 'kady' in the saved example, so it now succeeds cleanly) - the underlying strict name-match validation is still live and enforced, just not triggered by the collection's present unmodified example. Document AddPassenger's exact-name-match requirement between passengersList and travelDocument as an intentional business rule or flag for relaxation."

- **§7.14 / §2.9 - pending** - Replace: "[WIDENED AGAIN, Round 5] Confirmed the same OriginalSupplierRequest/OriginalSupplierResponse leak also occurs on Hold's duplicate-booking-conflict path (609). Systemic across at least three endpoints; reproduced identically for 6 consecutive rounds without a fix - recommend immediate remediation." With: "[WIDENED AGAIN, Round 6, new ne-3 host] Confirmed the identical OriginalSupplierRequest/OriginalSupplierResponse leak also occurs on Book's own duplicate-booking-conflict path (609) via direct resubmission of an already-consumed Book request, not only Hold's. The leaked SOAP envelope contains a live-looking plaintext supplier apiKey/secretKey pair. Reproduced identically for 6 consecutive rounds across a host migration without a fix - recommend immediate remediation; this is a credential-exposure security defect, not cosmetic."

- **§7.7 (Book selectedOfferId omission) - pending** - Replace: "[RESOLVED, Round 5] Book now returns a clean HTTP 400 ValidationError when selectedOfferId is omitted, resolving BUG-13 (filed Round 4). Recommend closing BUG-13 as fixed." With: "[RESOLVED, RECONFIRMED Round 6 on new ne-3 host] Book continues to return a clean HTTP 400 ValidationError when selectedOfferId is omitted - the fix survived the ne-2 -> ne-3 host migration. BUG-13 can be considered durably closed."

## Cleanup / follow-up

14 live artifacts left behind this run (11 ticketed bookings needing Void/Cancel, 3 Held-but-not-finalized Family-B holds):

- **needs_void_cancel** - PNR "TOLPVC" (TC-BOOK-POS-03) - Baseline seat-selection booking (BAH-RUH 2027-04-05, seat 8A, 120.00 SAR). Primary evidence for TC-BOOK-POS-03/POS-04/BIZ-04/REG-02/REG-03/VAL-08/RETRIEVE-REG-01/TC-SEATMAP-POS-02/VAL-03/FLOW-V2-49-SEATFIELD. Also the target of a deliberate resubmission this round to (re)confirm BUG-11's credential leak on Book's own 609-conflict path.
- **needs_void_cancel** - PNR "TFVYSR" (FLOW-V2-49-SEATFIELD) - Round-trip booking, 2 seats across 2 segments (BAH-RUH/RUH-BAH 2027-05-15/2027-05-22).
- **needs_void_cancel** - PNR "TVJNGU" (TC-SEATMAP-VAL-04) - Cross-offer cellId Book (BUG-07 evidence), BAH-JED 2027-04-08, 2 ADT.
- **needs_void_cancel** - PNR "TXYGDL" (TC-BOOK-BIZ-05) - CHD ticketed into an exit-row seat with zero validation (BUG-09 evidence), BAH-DMM 2027-04-10.
- **needs_void_cancel** - PNR "TRIBZV" (TC-BOOK-NEG-06) - Created while proving Book does not validate a tampered cellId (BUG-06 evidence), BAH-DXB 2027-04-28.
- **needs_void_cancel** - PNR "TCKQJQ" (TC-BOOK-VAL-06) - Created while proving cellCode (not cellId) drives seat resolution, BAH-JED 2027-05-05.
- **needs_void_cancel** - PNR "TRGFMG" (TC-BOOK-BIZ-06) - ADT+INF booking, seat selected only for the ADT, BAH-RUH 2027-05-02.
- **needs_void_cancel** - PNR "TNFMTM" (TC-BOOK-BND-03) - No-seat Book call, BAH-DXB 2027-05-08.
- **needs_void_cancel** - PNR "TVZSRS" (TC-BOOK-NEG-10) - Created while testing explicit-empty passengersSelectedSeats, BAH-CAI 2027-04-25.
- **needs_void_cancel** - PNR "TRGLKS" (TC-BOOK-NEG-11) - Created while testing explicit-empty setSegmentsSeats, BAH-DMM 2027-05-26.
- **needs_void_cancel** - PNR "TUTKWT" (TC-BOOK-NEG-12) - Created by the still-open ResponseId-omission behavior, BAH-DMM 2027-05-20.
- **family_b_hold** - PNR "TYOBGG" (TC-SEATAFTERHOLD-POS-01) - Held via direct Hold call (BAH-CAI, 2027-05-11). holdExpirationDate null. Never progressed.
- **family_b_hold** - PNR "TXMQCN" (TC-SEATAFTERHOLD-NEG-01) - Held for the mismatched-identity SeatAfterHold negative test (BAH-DXB, 2027-05-14). holdExpirationDate null. Never progressed.
- **family_b_hold** - PNR "TQZRGI" (FLOW-V2-50-SEATFIELD) - Held with an inline seat selection (BUG-08 evidence, BAH-RUH 2027-05-17). holdExpirationDate null. Never progressed.
