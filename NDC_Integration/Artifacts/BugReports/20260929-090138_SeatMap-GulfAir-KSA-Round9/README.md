# Bug Reports — Round 9 (2026-09-29) SeatMap-GulfAir-KSA targeted run

Source QA report: [`20260929-090138_SeatMap-GulfAir-KSA-Round9.md`](../../Logs/20260929-090138_SeatMap-GulfAir-KSA-Round9.md)
Prior runs: [Round 1](../20260825-103032_SeatMap-GulfAir-KSA/) &middot;
[Round 2](../20260826-154300_SeatMap-GulfAir-KSA-Round2/) &middot;
[Round 3](../20260830-093343_SeatMap-GulfAir-KSA-Round3/) &middot;
[Round 4](../20260830-090507_SeatMap-GulfAir-KSA-Round4/) &middot;
[Round 5](../20260830-143810_SeatMap-GulfAir-KSA-Round5/) &middot;
[Round 7](../20260909-103751_SeatMap-GulfAir-KSA-Round7/) &middot;
[Round 8](../20260909-202607_SeatMap-GulfAir-KSA-Round8/)

Round 9 was a targeted, user-requested run of exactly 2 test cases: `TC-BOOK-BIZ-04` and
`TC-BOOK-BIZ-05`. Round 8's critical outage (**BUG-16**, Book/Hold returning HTTP 500 while silently
succeeding) did **not** reproduce this round — both Book calls returned a clean HTTP 200 on the first
attempt.

**Correction (post-publication review)**: this round's report initially filed the second test case's
result as a new defect ("BUG-17"). A follow-up cross-round check found both `TC-BOOK-BIZ-04` and
`TC-BOOK-BIZ-05` were already executed in Round 1 (2026-08-25) and every round since — the exit-row/CHD
finding is the **existing `BUG-09`**, not a new defect, now at its **7th confirmed occurrence**. The
report and bug file below have been corrected accordingly; no separate "BUG-17" exists.

## Re-confirmed this round (not new — see correction above)

- [BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md](BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md) —
  Book does not enforce the Exit Row seat restriction for Child (CHD) passengers; a 10-year-old
  passenger was successfully booked and ticketed into an exit-row seat with no rejection at all, even
  though the server itself computed the passenger's age at Book time. First observed Round 1
  (2026-08-25, milder silent-drop form), reproducing in this worse zero-validation form since Round 2 —
  this is the **7th confirmed occurrence** over 35 days, with a 23-day gap since the last confirmation
  (Round 6). **High** severity, worth escalating given the elapsed time with no observed fix.
- **BUG-10** (AddPassenger rejects its own saved Postman example over a `name.middle` mismatch) —
  reproduced again on the first AddPassenger attempt (`TC-BOOK-BIZ-04`), worked around by blanking
  `middle` on both `passengersList.name` and `travelDocument.name`. This is the **9th consecutive
  round** confirming this is unresolved since Round 2. No new report filed — see prior rounds'
  `BUG-10_AddPassenger_NameConsistency.md`.

## Not reproduced this round

- **BUG-16** (Book/Hold HTTP 500 while silently succeeding) — both Book calls this round (`TC-BOOK-BIZ-04`,
  `TC-BOOK-BIZ-05`) returned a clean HTTP 200 on the first attempt. Two clean calls is not strong enough
  evidence to close BUG-16 out — recommend a wider re-verification pass before doing so. Also notable:
  this is the first Book call for GulfAir/KSA since BUG-16 was discovered (Round 8), and BUG-09 still
  reproduced identically despite whatever changed to clear BUG-16 — the two defects are independent.

## Completed this round

- `TC-BOOK-BIZ-04` (PASS) — re-confirmed (6th time — Rounds 1, 2, 3, 5, 6, 9; Round 4 unaffected) that
  `selectedOffer.priceDetails.totalAmount` includes `totalSelectedSeatsAmount`. SPEC.md §2.9 still marks
  this `UNKNOWN` despite five prior confirmations before this run — the proposed spec update has been
  pending since Round 1 and was never applied; see the QA report's Proposed SPEC.md updates section.
- `TC-BOOK-BIZ-05` (FAIL) — see BUG-09 above.

## Cleanup

Two real, ticketed bookings were created this round: pnr `TPQJOT` (TC-BOOK-BIZ-04) and pnr `QVUTYI`
(TC-BOOK-BIZ-05, the BUG-09 evidence — do not void until triaged). See the QA report's Cleanup section.
