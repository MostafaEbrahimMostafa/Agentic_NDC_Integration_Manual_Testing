# Bug Reports — Round 17 (2026-10-10) SeatMap-GulfAir-KSA targeted run

Source QA report: [`20261010-144832_SeatMap-GulfAir-KSA-Round17.md`](../../Logs/20261010-144832_SeatMap-GulfAir-KSA-Round17.md)

Targeted run of 11 `SeatMap_TestCases.csv` cases (SEC-01, SEC-02, VAL-03 to VAL-11): 9 passed, 2 failed. Both failures are recurrences of already-tracked bugs, no new defect:

- [BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md](BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md) — **Medium.** Existing `BUG-17`. GetSeatMap accepts a switched `credentialsSelector` (KSA offer read through UAE) (4th confirmation) (`TC-SEATMAP-SEC-01`).
- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.** Existing `BUG-07`. Cross-offer cellId accepted; booking ticketed with the seat silently dropped (12th confirmation) (`TC-SEATMAP-VAL-04`).

**BUG-19** (valid seat silently not attached) did **not** reproduce: `TC-SEATMAP-VAL-03` attached seat 8B at 120 SAR on a flight that prices seats, and `Retrieve` confirmed it. **BUG-16** did **not** reproduce: both Book calls returned a clean 200.

## Cleanup

2 real ticketed GulfAir/KSA bookings were created on staging (TESHKH, OVAMWU). `BUG-07` cites `OVAMWU` as evidence, so keep it until triaged.
