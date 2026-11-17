# Bug Reports — Round 16 (2026-10-07) SeatMap-GulfAir-KSA targeted run

Source QA report: [`20261007-172413_SeatMap-GulfAir-KSA-Round16.md`](../../Logs/20261007-172413_SeatMap-GulfAir-KSA-Round16.md)

Targeted run of 3 `SeatMap_TestCases.csv` cases (POS-02, VAL-03, VAL-04): 2 passed, 1 failed. One recurrence of an already-tracked bug:

- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.** Existing `BUG-07`. Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (11th Confirmation) (`TC-SEATMAP-VAL-04`).

**BUG-19** (valid seat silently not attached) did **not** reproduce: `TC-SEATMAP-VAL-03` attached seat 17C and `Retrieve` confirmed it. Caveat: that flight prices every seat at 0 SAR and only one attempt was made, so re-verify on a flight with paid seats before closing. No new report this round; see the Round 15 report.

**BUG-16** did **not** reproduce: all 3 Book calls returned a clean 200 with a PNR.

## Cleanup

3 real ticketed GulfAir/KSA bookings were created on staging (OWOYWN, RKMCKV, OOQACT). `BUG-07` cites `OOQACT` as evidence, so keep it until triaged.
