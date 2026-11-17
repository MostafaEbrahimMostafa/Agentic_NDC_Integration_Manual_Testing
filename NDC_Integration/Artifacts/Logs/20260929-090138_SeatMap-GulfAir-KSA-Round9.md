# QA Execution Report — Round 9 targeted run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 2 test cases: TC-BOOK-BIZ-04, TC-BOOK-BIZ-05

**Environment:** staging (STAG_ENV default host) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-09-29T09:01:45.065Z
**Ended:** 2026-09-29T09:23:03.620Z
**Status:** COMPLETE
**Execution Duration:** 21m 19s ([View Time Breakdown](20260929-090138_SeatMap-GulfAir-KSA-Round9_TimeBreakdown.html))
**Prior runs:** [Round 1](20260825-103032_SeatMap-GulfAir-KSA.md), [Round 2](20260826-154300_SeatMap-GulfAir-KSA-Round2.md), [Round 3](20260830-093343_SeatMap-GulfAir-KSA-Round3.md), [Round 4](20260830-090507_SeatMap-GulfAir-KSA-Round4.md), [Round 5](20260830-143810_SeatMap-GulfAir-KSA-Round5.md), [Round 6](20260906-092818_SeatMap-GulfAir-KSA-Round6.md), [Round 7](20260909-103751_SeatMap-GulfAir-KSA-Round7.md), and [Round 8](20260909-202607_SeatMap-GulfAir-KSA-Round8.md)

> ⚠️ **Correction (post-publication)**: this report originally filed `TC-BOOK-BIZ-05`'s exit-row/CHD
> finding as a new defect ("BUG-17"). A follow-up cross-round check found both test cases in this run
> were already executed in Round 1 (2026-08-25) and every round since — the finding is the existing
> **BUG-09**, now at its **7th confirmed occurrence**, not a new defect. All references below have been
> corrected; no separate "BUG-17" exists. See Findings for full detail.

## Scope note

Targeted, user-requested partial re-run — only TC-BOOK-BIZ-04 and TC-BOOK-BIZ-05 are in scope this round
(not the full SeatMap_TestCases.csv suite). Round 8 (2026-09-09) found an unresolved critical defect
(candidate **BUG-16**): `Book`/`Hold` return HTTP 500 to the caller while silently creating the real
booking server-side anyway, confirmed via a same-offer retry returning HTTP 409 "already created," with
live supplier credentials leaking in that 409 envelope. Both of this round's test cases require a live
`Book` call, so this round is also a re-confirmation of whether BUG-16 still reproduces. Per user
instruction: **if a Book call returns HTTP 500, do not retry** — report that test case BLOCKED, log it as
a suspected silent booking for cleanup, and move on, rather than retrying to confirm silent success (which
itself risks creating more untracked live PNRs).

## Summary

- Test cases logged: 2 of 2 planned
- Passed: 1
- Failed: 1
- Blocked: 0

### Headline result: BUG-16 did NOT reproduce this round; BUG-09 (exit-row/CHD) still does, now at its 7th confirmed occurrence

Both Book calls this round returned a clean HTTP 200 with a real PNR — BUG-16 (Round 8's critical
Book/Hold outage) did not reproduce here. TC-BOOK-BIZ-05 confirmed that **BUG-09** (Book does not
enforce the Exit Row seat restriction for Child passengers) is still unresolved: a 10-year-old CHD
passenger was successfully booked and ticketed into an exit-row seat with no rejection at all, even
though the server itself computed the passenger's age at Book time. **Correction**: this report
initially filed this as a new defect ("BUG-17"); a cross-round check found both `TC-BOOK-BIZ-04` and
`TC-BOOK-BIZ-05` were already run in Round 1 (2026-08-25) and every round since — this is `BUG-09`,
not new, now confirmed 7 times over 35 days with a 23-day gap since its last confirmation (Round 6).
See **Findings** below for the corrected framing.

Both test cases also hit the already-known, already-filed **BUG-10** (AddPassenger rejects its own
saved Postman example over a `name.middle` mismatch) on first contact — the documented workaround
(blank `middle` on both `passengersList.name` and `travelDocument.name`) was applied to proceed. This
is the 9th consecutive round it has reproduced.

## Test case results

### TC-BOOK-BIZ-04 — PASS

- **Endpoint Name:** Search &rarr; FareConfirm &rarr; AddPassenger &rarr; GetSeatMap &rarr; Book (GulfAir/KSA, BAH&rarr;RUH 2027-07-01)
- **Request:** Book with `passengersSelectedSeats` populated (seat 8A, 120 SAR)
- **Response:** 200 &mdash; `selectedOffer.priceDetails.totalAmount` = 1113 SAR, `totalSelectedSeatsAmount` = 120 SAR
- **Expected:** SPEC.md §2.9 (documented `UNKNOWN`, confirm live) &mdash; `totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount`
- **Actual:** Confirmed: `1113 == 640 + 353 + 0 + 120` exactly. Also `totalAmount`(after) `1113 == totalAmount`(before seat, FareConfirm) `993 + totalSelectedSeatsAmount 120` exactly. The seat cost **is** included in `totalAmount` &mdash; resolves SPEC.md's documented coverage gap as a clean PASS, no billing-integrity defect found.
- **Status:** PASS
- **Evidence:** FareConfirm pre-seat totalAmount=993 SAR (base 640 + tax 353). Book post-seat totalAmount=1113 SAR (base 640 + tax 353 + ancillary 0 + seat 120). pnr TPQJOT, ticket 722136995731.

  - **Hop 1 &mdash; Search:** PASS &mdash; 200, 25 offers, offer[0] totalAmount 993 SAR.
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200, price unchanged (993 SAR), base+tax reconciles.
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; first attempt (passengersList.name.middle="kady" vs travelDocument.name.middle="" mismatch, matching the V2 collection's own saved example) rejected 400 `PredicateValidator: "Invalid travel document information"` &mdash; **re-confirms BUG-10** (AddPassenger_NameConsistency), unchanged since Round 2, now **9 consecutive rounds**. Second attempt (blank middle name on both objects, the documented workaround) succeeded 200.
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200, 30 rows, 179 AvailablePaid cells; seat 8A selected (120 SAR). Note: `isSeatMapRequired` was `false` on this offer, yet GetSeatMap still returned full seat data &mdash; confirms the flag is not a hard gate (per SPEC.md's own `INFERRED` caveat).
  - **Hop 5 &mdash; Book:** PASS &mdash; 200, pnr TPQJOT, seat 8A/120 SAR attached, ticket 722136995731 issued.

### TC-BOOK-BIZ-05 — FAIL

- **Endpoint Name:** Search &rarr; FareConfirm &rarr; AddPassenger &rarr; GetSeatMap &rarr; Book (GulfAir/KSA, BAH&rarr;RUH 2027-07-08)
- **Request:** Book assigning an exit-row seat (18C) to a Child (CHD) passenger
- **Response:** 200 &mdash; a real, ticketed booking was created; the CHD passenger's exit-row seat was accepted and echoed back with no rejection
- **Expected:** Per SPEC.md §2.7/§2.9 (referencing this suite's Seat map - Seatmap.md TC-INT-BOOK-008): response status is an error (candidate `RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD`) and no pnr is created
- **Actual:** **BUG-09 confirmed (7th occurrence, not new).** Book returned HTTP 200, created pnr `QVUTYI`, and issued a real ticket (722136995695) for the CHD passenger (computed server-side `age: 10`) in the exit-row seat — no rejection, warning, or downgrade of any kind. First observed Round 1 (2026-08-25, milder silent-drop form), unchanged in this worse zero-validation form since Round 2.
- **Status:** FAIL
- **Evidence:** pnr QVUTYI; `passengersList.PAX2` = `{passengerTypeCode: CHD, age: 10}`; `passengersSelectedSeats.PAX2.cellCode` = `18C` (characteristics include `EXIT_ROW_SEAT`); ticket 722136995695 issued for PAX2.

  - **Hop 1 &mdash; Search:** PASS &mdash; 200, 25 offers, offer[0] totalAmount 1876 SAR (ADT+CHD).
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200, price unchanged, base+tax reconciles (1170+706=1876).
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 on first attempt (BUG-10 workaround applied proactively from the start, based on this round's own BIZ-04 finding). Pax1 ADT + Pax2 CHD (age 10 at flight time).
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200; 24 exit-row cells found (rows 18&ndash;19, `cellCharacteristics` include `EXIT_ROW_SEAT`); cell 18C shows `AvailablePaid` for **both** PAX1 and PAX2 in `seatPriceDetailsByPassenger` &mdash; the seat map itself carries no client-side flag distinguishing CHD eligibility for an exit-row cell.
  - **Hop 5 &mdash; Book:** **FAIL** &mdash; 200, pnr QVUTYI, CHD passenger ticketed into exit-row seat 18C with no server-side enforcement of the restriction this test case checks for.

## Findings

### Defects (re-confirmed, not new — see correction note above)

- **[TC-BOOK-BIZ-05] BUG-09 (7th confirmed occurrence) &mdash; Book does not enforce the Exit Row seat restriction for Child (CHD) passengers.** A CHD passenger (age 10, computed server-side) was successfully booked and ticketed into an exit-row seat (18C) with zero rejection. Since the server itself computes and returns passenger age at Book time, the information needed to enforce this rule was available and simply wasn't checked. First observed Round 1 (2026-08-25, milder silent-drop form: the seat was dropped, not attached), reproducing in this worse zero-validation form (seat genuinely attached and ticketed) since Round 2 (2026-08-26) — this run is the 7th confirmed occurrence (Rounds 1, 2, 3, 5, 6, 9; Round 4 blocked by the concurrent GetSeatMap outage BUG-14; Rounds 7-8 out of scope), with a 23-day gap since the last confirmation (Round 6, 2026-09-06). **Impact:** a real-world aviation safety rule (exit-row occupants must be able to assist in an emergency) remains silently unenforced after 35 days and 7 confirmations &mdash; worth escalating to confirm this is actually on a remediation backlog, not just repeatedly re-logged. Evidence: pnr QVUTYI, ticket 722136995695, `passengersList.PAX2.age`=10, seat 18C `cellCharacteristics` include `EXIT_ROW_SEAT`. Full history: `NDC_Integration/Artifacts/BugReports/20260929-090138_SeatMap-GulfAir-KSA-Round9/BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md`.
- **BUG-10** (AddPassenger_NameConsistency) &mdash; reproduced again this round on the first AddPassenger attempt for TC-BOOK-BIZ-04 (workaround applied, then avoided proactively for BIZ-05). 9th consecutive round confirming this is unresolved. No new bug report filed this round (already tracked since Round 2); see prior rounds' `BUG-10_AddPassenger_NameConsistency.md`.

### Not reproduced

- **BUG-16** (Book/Hold HTTP 500 while silently succeeding) &mdash; **did NOT reproduce this round.** Both Book calls (TC-BOOK-BIZ-04, TC-BOOK-BIZ-05) returned a clean HTTP 200 on the first attempt, each with a real PNR and no error envelope. Notably, this is the first Book activity for GulfAir/KSA since BUG-16 was discovered (Round 8) — and BUG-09 reproduced identically regardless, confirming the two defects are independent, not two symptoms of one root cause. Two clean calls is not proof BUG-16 is fully resolved &mdash; recommend a wider re-verification pass before closing it out.

## Proposed SPEC.md updates

- §2.9, replace: "**Added 2026-08-10, `UNKNOWN`, needs live confirmation**: when a seat is selected, does `selectedOffer.priceDetails.totalAmount` include `totalSelectedSeatsAmount` in its sum (i.e. `totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount`)? None of the existing V1/V2 price-reconciliation test scripts (§1.10 item 4) were observed summing a seat amount into their assertions — this is a strong candidate coverage gap..." with: "**Confirmed live, GulfAir/KSA**: yes, `selectedOffer.priceDetails.totalAmount` includes `totalSelectedSeatsAmount` — verified `totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount` and `totalAmount`(after seat) `== totalAmount`(before seat, FareConfirm) `+ totalSelectedSeatsAmount`, both exactly. No billing-integrity defect." *(status: pending user confirmation)*
  **Correction**: this was originally confirmed **2026-08-25 in Round 1** (`TC-BOOK-BIZ-04`, pnr RWNRYI,
  703=230+353+0+120) and independently re-confirmed identically in Rounds 2, 3, 5, 6, and now 9 (6 total
  confirmations, 1113=640+353+0+120 this round) — this proposed update has been **pending since Round 1
  and was never applied**, despite five prior confirmations before this run. This is itself worth
  flagging as a process gap: a well-established, repeatedly-confirmed fact sat as `UNKNOWN` in SPEC.md
  for over a month.

## Cleanup / follow-up

Live artifacts left behind this round (2):

- **pnr TPQJOT** (TC-BOOK-BIZ-04) &mdash; real Book succeeded, ticket 722136995731 issued (GulfAir/KSA, BAH-RUH 2027-07-01, seat 8A). `voidCapability: FullVoidOnlyAllowed` &mdash; can be voided per SPEC.md §2.15 if this test artifact needs cleanup.
- **pnr QVUTYI** (TC-BOOK-BIZ-05) &mdash; real Book succeeded, tickets issued for both passengers (722136995694, 722136995695), including the CHD in the exit-row seat. This booking is this run's evidence for BUG-09 (7th confirmed occurrence) &mdash; **do not void until the defect is triaged/confirmed by the platform team**, then void per SPEC.md §2.15.
