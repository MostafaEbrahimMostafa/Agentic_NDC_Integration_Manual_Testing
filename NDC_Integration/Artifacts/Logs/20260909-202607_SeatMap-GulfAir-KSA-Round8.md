# QA Execution Report — Round 8 targeted re-verification — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 10 test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-SEATMAP-BND-02, TC-SEATMAP-BIZ-02, TC-SEATMAP-REG-02, TC-BOOK-POS-03, TC-BOOK-NEG-05, TC-BOOK-NEG-06, TC-BOOK-VAL-06

**Environment:** staging (STAG_ENV default host) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-09-09T20:26:07.466Z
**Ended:** 2026-09-09T21:07:00.000Z
**Status:** COMPLETE
**Execution Duration:** 40m 53s ([View Time Breakdown](20260909-202607_SeatMap-GulfAir-KSA-Round8_TimeBreakdown.html))
**Prior runs:** [Round 1](20260825-103032_SeatMap-GulfAir-KSA.md), [Round 2](20260826-154300_SeatMap-GulfAir-KSA-Round2.md), [Round 3](20260830-093343_SeatMap-GulfAir-KSA-Round3.md), [Round 4](20260830-090507_SeatMap-GulfAir-KSA-Round4.md), [Round 5](20260830-143810_SeatMap-GulfAir-KSA-Round5.md), [Round 6](20260906-092818_SeatMap-GulfAir-KSA-Round6.md), and [Round 7](20260909-103751_SeatMap-GulfAir-KSA-Round7.md)

## Summary

- Test cases logged: 10 of 10 planned
- Passed: 2
- Failed: 1
- Blocked: 7

### Headline result: a new, critical Book/Hold outage blocked 7 of this round's 10 test cases

This was meant to be a straightforward expansion of Round 7's 3-case scope to 10 cases. Instead, this
round surfaced a **new critical defect** that superseded most of the planned assertions: **every single
Book call (6 attempts) and the one Hold call attempted this round returned HTTP 500 "Unknown error
occured"**, regardless of route, offer, or payload content (with-seat and no-seat bodies both failed
identically). Critically, **the booking was still silently created server-side** despite the 500 — this
was proven twice by retrying the same already-booked offer and getting back HTTP 409 "This booking has
already been created (609)." The 409 conflict envelope also **leaked a live supplier `apiKey`/`secretKey`
pair in plaintext**, the same class of issue as the previously-documented BUG-11 credential leak, but now
reachable on a first Book/Hold call rather than only via a deliberate duplicate-submission probe. See
**Findings** below for full detail; this is filed as **candidate BUG-16**.

Because of this, the 3 read-only GetSeatMap-only test cases (BND-02, BIZ-02, REG-02) completed normally,
but the 7 test cases that depend on a real Book response (POS-02, VAL-03, VAL-04, BOOK-POS-03, NEG-05,
NEG-06, VAL-06) are reported **BLOCKED** — for the two remaining after the first four confirmed failures
(VAL-04, NEG-06, VAL-06) execution was deliberately halted rather than continuing to create additional
uncontrolled, un-trackable live bookings with no diagnostic value under a confirmed, repeating outage.

### Scope note

This is a targeted, user-requested partial re-run — only the 10 named test cases were in scope (not the
full 63-case SeatMap_TestCases.csv suite). This round was meant to expand Round 7's 3-case scope
(TC-SEATMAP-POS-02/VAL-03/VAL-04) to also cover TC-SEATMAP-BND-02, TC-SEATMAP-BIZ-02, TC-SEATMAP-REG-02,
TC-BOOK-POS-03, TC-BOOK-NEG-05, TC-BOOK-NEG-06, and TC-BOOK-VAL-06. Four independent Search→FareConfirm→
AddPassenger→GetSeatMap chains were built fresh against the current staging host (BAH-RUH x2, BAH-JED,
BAH-DMM, BAH-CAI, plus BAH-RUH again for the Hold probe), all 1-ADT, all far-future dates
(2027-06-10 through 2027-06-25) chosen for guaranteed live inventory. GetSeatMap succeeded cleanly on
every one of these chains; every downstream Book/Hold call failed per the outage above.

## Test case results

### TC-SEATMAP-BND-02 [Boundary] — Verify cellAvailability/paxCellAvailability values are limited to known enum, Aisle-category cells carry no seatPriceDetails

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response (BAH-RUH 2027-06-10, offer GF161), enumerating distinct cellCategory/cellAvailability values across all 210 cells (30 rows × 7 columns incl. aisle)
- Response: cellCategory = {Seat:177, Aisle:30, **NoSeat:3**}; cellAvailability (populated cells only) = {AvailablePaid:177}; every Aisle cell has cellDetails=null
- Expected: Every cellCategory value in {Seat, Aisle}; every cellAvailability value in {AvailablePaid, Blocked, Occupied}; Aisle cells carry no seatPriceDetails
- Actual: cellAvailability stayed within the documented enum (only AvailablePaid observed — no Blocked/Occupied cells existed on this far-future date). A **third, previously-undocumented cellCategory value** was observed: `NoSeat` (row 8, columns A/B/E — a bulkhead row with fewer real seats than the standard 3-3 layout). `NoSeat` cells have a non-null `column` (unlike `Aisle`, which has `column=null`) but `cellDetails=null` (same as `Aisle`) — a genuinely distinct third partition, not a mislabeled Aisle/Seat.
- Status: **PASS** (logged as a new UNKNOWN-resolution candidate, not a hard failure — the Aisle-carries-no-pricing assertion itself holds)
- Evidence: Full cell scan of chain A's 30-row seatMapDetails: cats={Seat:177,Aisle:30,NoSeat:3}, avail={AvailablePaid:177}; row 8 = A:NoSeat, B:NoSeat, C:Seat, (aisle), D:Seat, E:NoSeat, F:Seat

### TC-SEATMAP-BIZ-02 [Business Rule] — Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell

- Endpoint Name: GetSeatMap
- Request: Chain A GetSeatMap response, checked totalPrice vs basePrice+taxesPrice for every AvailablePaid cell (177 cells sampled)
- Response: Cell 8C: base=120.00, tax=0, total=120.00 SAR; Cell 8D: identical; row-9 cells (9A–9F): base=60.00, tax=0, total=60.00 SAR
- Expected: totalPrice.amount == basePrice.amount + taxesPrice.amount for every priced cell/passenger pair, same currency
- Actual: 0 mismatches across all 177 AvailablePaid cells sampled
- Status: **PASS**
- Evidence: Cell 8C: 120.00 = 120.00 + 0; Cell 8D: 120.00 = 120.00 + 0; Cell 9A: 60.00 = 60.00 + 0

### TC-SEATMAP-REG-02 [Regression] — Verify seatMapDetails schema matches SPEC.md §2.7's documented field list, flag flat-columns supplier variant

- Endpoint Name: GetSeatMap
- Request: Full schema diff of chain A's live GetSeatMap response against SPEC.md §2.7's documented field list
- Response: Top-level keys: `supplier,offerId,responseId,isFareCheckRequired,flightSegments,passengersDetails,seatMapDetails`. `cabinLayoutsByDeck.Main.zones[0]` = `{zoneId:'Cabin1', cabinClass:'ECONOMY', columns:[A,B,C,null,D,E,F]}` (single-zone shape, not the flat-columns AirArabia variant). All `rows[].{rowNumber,deck,zoneId,cells[].{cellCategory,column,cellDetails}}` fields present.
- Expected: No undocumented keys beyond SPEC.md §2.7's field list; every documented field present and correctly typed
- Actual: All documented fields present and correctly typed. But **2 undocumented fields observed, identical to Round 6**: `isFareCheckRequired` (boolean, false) and `passengersDetails.<paxRef>.passengersSeatMapAvailability` (`{segmentRefId:{deckName:[cellCode,...]}}` — lists every cellCode actually assignable to that passenger, correctly excluding row 8's `NoSeat` cells). **New this round**: the third `cellCategory` value `NoSeat` (see TC-SEATMAP-BND-02) is not documented anywhere in SPEC.md §2.7, which lists only `Seat`/`Aisle` — a genuinely new schema-detail gap not seen in Rounds 1–7.
- Status: **FAIL** (undocumented-keys assertion violated, consistent with how Round 6 scored the same two pre-existing fields)
- Evidence: Live GulfAir GetSeatMap top-level keys as above; `passengersSeatMapAvailability` sample: `{'GF-GF161-...-O':{'Main':['8C','8D','8F','9A',...]}}`; new enum value `NoSeat` (row 8, cols A/B/E)

### TC-SEATMAP-POS-02 [Positive] — Verify GetSeatMap sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as ResponseId/selectedOfferId when SeatMap precedes it

- Endpoint Name: GetSeatMap -> Book
- Request: GetSeatMap succeeded (4 independent chains); Book POST api/v2/FlightBooking/Book using GetSeatMap's own responseId/offerId directly, attempted 4 times on 4 fresh offers
- Response: GetSeatMap 200 every time. Book: **HTTP 500 every time (4/4)** — never returned pnr/bookingToken/gdsPNR
- Expected: GetSeatMap's offerId/responseId feed Book's ResponseId/selectedOfferId directly; Book returns 200 with pnr/bookingToken/gdsPNR
- Actual: Blocked by the new Book/Hold outage (see Findings). On 2 of the 4 attempts, a same-offer retry with a different payload confirmed via HTTP 409 "already been created (609)" that the booking WAS actually created server-side despite the 500 — so the GetSeatMap→Book chaining mechanism itself likely still works, but this cannot be confirmed from the client side since the success response is never delivered.
- Status: **BLOCKED**
- Evidence: GetSeatMap chain (chainA3): responseId=b15ee450-ad7a-4c9b-84cd-e9eaba08e0ad. Book attempt: TransactionId 74ec9275-4122-405e-b0a3-ac4f11f00d9d (500). Retry-confirmed silent success (chainA4): TransactionId 5abbff77-0b26-4cfd-9616-ea1925de0a94 (409)

Hops (2):
  1. GetSeatMap — Status: **PASS** — Expected: 200, offerId/responseId non-empty — Actual: 200, populated — Evidence: segment GF-GF161-GF161-2027061002-2027061004-O
  2. Book — Status: **FAIL** — Expected: 200, pnr/bookingToken/gdsPNR returned, seat echoed — Actual: 500 on every attempt (outage) — Evidence: TransactionId 74ec9275-4122-405e-b0a3-ac4f11f00d9d

### TC-SEATMAP-VAL-03 [Validation] — Verify cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite casing difference (cellID vs cellId)

- Endpoint Name: GetSeatMap -> Book
- Request: Book submitted with passengersSelectedSeats.PAX1.setSegmentsSeats.\<seg\> = {cellCode:'8F'/'8D'/'8A', cellId:\<verbatim cellID from GetSeatMap\>} across the same 4 attempts as TC-SEATMAP-POS-02
- Response: HTTP 500 on every attempt — never reached the point of confirming whether the casing-mismatched field was accepted
- Expected: Book accepts the token despite the cellID/cellId casing mismatch
- Actual: Blocked by the same outage as TC-SEATMAP-POS-02
- Status: **BLOCKED**
- Evidence: Same 4 Book attempts as TC-SEATMAP-POS-02 (all carry the identical cellID/cellId casing pattern) — all 500

### TC-SEATMAP-VAL-04 [Validation] — Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer

- Endpoint Name: Book
- Request: Would require Book using a second chain's ResponseId/selectedOfferId with passengersSelectedSeats.PAX1.cellId taken from a different chain's GetSeatMap response — **not attempted this round**
- Response: N/A — not executed
- Expected: Request rejected (400 ValidationError) since cellId appears to embed offer-bound metadata
- Actual: Deliberately not attempted, to avoid creating a 7th uncontrolled silent booking under the same active outage without diagnostic value. BUG-07's status (still-reproduces vs resolved) could not be re-confirmed this round.
- Status: **BLOCKED**
- Evidence: See run-level defect finding for the outage evidence this decision is based on

### TC-BOOK-POS-03 [Positive] — Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly

- Endpoint Name: Book
- Request: POST api/v2/FlightBooking/Book — GulfAir/KSA, ResponseId/selectedOfferId=GetSeatMap's IDs, passengersSelectedSeats.PAX1.setSegmentsSeats.\<seg\>={cellCode,cellId} — 4 independent attempts
- Response: HTTP 500 on every attempt — pnr/bookingToken/gdsPNR/echoed seat fields never observed
- Expected: HTTP 200; pnr/bookingToken/gdsPNR returned; response echoes the seat selection; totals reflect the same price
- Actual: Blocked by the same outage
- Status: **BLOCKED**
- Evidence: Same Book attempts as TC-SEATMAP-POS-02/VAL-03 — all 500 (TransactionIds 2b439530-64cc-4def-86c5-47baa83db9b0, 74ec9275-4122-405e-b0a3-ac4f11f00d9d, e3cd3847-9414-4974-b6ad-093367394fd3, ce71a2fa-da95-4a0c-9790-f6b0b898ee92)

### TC-BOOK-NEG-05 [Negative] — Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell

- Endpoint Name: Book
- Request: Would require a Blocked/Occupied cell identified in GetSeatMap, then Book submitted with that cell's cellCode/cellId
- Response: Not executable — every GetSeatMap sample gathered this round (4 independent chains, far-future dates 2027-06-10 through 2027-06-25) showed **100% AvailablePaid cells, zero Blocked/Occupied cells** — unlike Round 6's chain E2 (a nearer-term BAH-DXB date), which did surface an Occupied cell
- Expected: Request rejected; no booking created reflecting the unavailable seat
- Actual: Doubly blocked — (1) no Blocked/Occupied cell precondition available on the dates sampled, and (2) the Book endpoint itself is returning HTTP 500 regardless of payload, which would prevent distinguishing a genuine availability-check rejection from the generic outage even if a Blocked/Occupied cell had been found
- Status: **BLOCKED**
- Evidence: 4 independent GetSeatMap samples this round — cellAvailability enumeration for each showed only AvailablePaid

### TC-BOOK-NEG-06 [Negative] — Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with

- Endpoint Name: Book
- Request: Would require Book submitted with a valid cellCode but a truncated/altered cellId, on a fresh unbooked offer — **not attempted this round**
- Response: N/A — not executed
- Expected: Rejected — the tampered token should fail a server-side decode/signature check
- Actual: Deliberately not attempted, to avoid creating an 8th uncontrolled silent booking under the same active outage without diagnostic value. BUG-06's status could not be re-confirmed this round.
- Status: **BLOCKED**
- Evidence: See run-level defect finding for the outage evidence this decision is based on

### TC-BOOK-VAL-06 [Validation] — Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes

- Endpoint Name: Book
- Request: Would require Book submitted with cellCode from one AvailablePaid cell but cellId from a different AvailablePaid cell, same offer/segment — **not attempted this round**
- Response: N/A — not executed
- Expected: Confirm whether cellId alone is trusted, request rejected, or wrong seat booked under wrong code
- Actual: Deliberately not attempted, to avoid creating a 9th uncontrolled silent booking under the same active outage without diagnostic value. This un-numbered companion finding to BUG-06 (Book trusts cellCode over cellId, confirmed Rounds 1–6) could not be re-confirmed this round.
- Status: **BLOCKED**
- Evidence: See run-level defect finding for the outage evidence this decision is based on

## Findings

- **Defect (NEW, candidate BUG-16)** — [TC-SEATMAP-POS-02 and every other Book-dependent case this
  round] **Book and Hold return HTTP 500 to the caller on every attempt for GulfAir/KSA, while the
  booking is silently created server-side regardless.** Confirmed twice via a same-offer retry
  returning HTTP 409 "This booking has already been created (609)." 6 independent Book attempts
  (fresh offers on BAH-RUH ×4, BAH-JED, BAH-DMM, BAH-CAI) and 1 Hold attempt (BAH-CAI) all failed
  identically on the first call, regardless of whether `passengersSelectedSeats` was populated,
  empty, or omitted entirely — ruling out the seat-selection payload as the cause. **Impact**: every
  attempt this round created a real, live booking with no `pnr` ever returned to the caller — these
  cannot be voided/cancelled through this harness since the PNR is unknown, and 7 of this round's 10
  assigned test cases could not be evaluated as a direct result. **Separately**, the HTTP 409 conflict
  envelope leaked a live upstream supplier `apiKey`/`secretKey` pair in plaintext inside
  `OriginalSupplierRequest` — the same class of issue as the previously-documented BUG-11 credential
  leak, but now reachable on a first Book/Hold call, not only via a deliberate duplicate-submission
  probe. (SPEC.md §2.9, §2.10, §7.14)

- **Finding (UNKNOWN-resolution)** — [TC-SEATMAP-BND-02, TC-SEATMAP-REG-02] GetSeatMap's
  `cellCategory` enum now has a confirmed **third value, `NoSeat`**, beyond SPEC.md §2.7's documented
  `{Seat, Aisle}` pair — observed on a bulkhead row (row 8) where 3 of the standard 6 seat positions
  are structurally absent. `NoSeat` cells carry a non-null `column` (unlike `Aisle`) but `cellDetails:
  null` (like `Aisle`). Not previously seen in Rounds 1–7. (SPEC.md §2.7)

## Proposed SPEC.md updates

- §2.7, replace: "`cellCategory` observed values (updated 2026-08-10): `Seat`, `Aisle`" with: "`cellCategory`
  observed values (updated 2026-09-09): `Seat`, `Aisle`, `NoSeat` — `NoSeat` marks a structurally-absent
  seat position within an otherwise-standard row (e.g. a bulkhead row with fewer real seats than the
  cabin's typical column count); it carries a non-null `column` value (distinguishing it from `Aisle`,
  which has `column: null`) but `cellDetails: null` (matching `Aisle`)." — **pending user confirmation**

## Cleanup / follow-up

- **needs_void_cancel** — PNR **UNKNOWN** (TC-SEATMAP-POS-02) — At least 2 real bookings were silently
  created this round (chain A3, seat 8F, BAH-RUH 2027-06-10; and chain A4, no seat, BAH-RUH
  2027-06-15) but their pnr was never returned to the caller (Book responded 500 both times) — cannot
  be voided/cancelled by pnr through this harness. **Recommend escalating to the platform team**: a
  broader lookup (by TransactionId, or a booking search by passenger name "Ahmed AlSayed"/date) may be
  the only way to locate and clean these up.
- **needs_void_cancel** — PNR **UNKNOWN** (TC-BOOK-POS-03) — Up to 4 additional Book attempts (chains
  A, A2, A5-noseat, A6-noseat) and 1 Hold attempt (BAH-CAI) may also have silently succeeded under the
  same outage pattern, though not individually reconfirmed via a retry — treat as suspect-created
  bookings pending the platform team's investigation of the underlying defect.

### Recommendation

Given the severity and blast radius (uncontrolled live bookings with unrecoverable PNRs), **hold off on
re-running the remaining Book-dependent test cases (VAL-04, NEG-05, NEG-06, VAL-06, and a full re-run of
POS-02/VAL-03/BOOK-POS-03) until the platform team confirms the Book/Hold 500 defect is resolved** —
continuing to probe it will only create more un-trackable bookings without new diagnostic value.
