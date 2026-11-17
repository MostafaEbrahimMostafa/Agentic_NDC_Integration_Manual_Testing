# Bug Reports — Round 15 (2026-10-05) SeatMap-GulfAir-KSA targeted run

Source QA report: [`20261005-111817_SeatMap-GulfAir-KSA-Round15.md`](../../Logs/20261005-111817_SeatMap-GulfAir-KSA-Round15.md)

Targeted run of 3 `SeatMap_TestCases.csv` cases (POS-02, VAL-03, VAL-04): 1 passed, 2 failed. One new defect and one recurrence of an already-tracked bug:

- [BUG-19_Book_passengersSelectedSeats_SeatNotAttached.md](BUG-19_Book_passengersSelectedSeats_SeatNotAttached.md) — **High.** **NEW.** Selected Seat Not Attached; Booking Ticketed With passengersSelectedSeats Empty (`TC-SEATMAP-VAL-03`).
- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.** Existing `BUG-07`. Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (10th Confirmation) (`TC-SEATMAP-VAL-04`).

**BUG-16** did **not** reproduce: all 4 Book calls returned a clean 200 with a PNR.

## Cleanup

4 real ticketed GulfAir/KSA bookings were created on staging (SYYMDC, STHFNE, SRMWVW, SNUMQV). `BUG-19` and `BUG-07` cite three of them as evidence, so keep those until triaged.