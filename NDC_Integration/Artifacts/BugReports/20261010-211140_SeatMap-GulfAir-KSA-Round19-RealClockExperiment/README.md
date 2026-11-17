# Bug Reports — Round 19 "Real Clock Experiment" (2026-10-10) SeatMap-GulfAir-KSA targeted run

Source QA report: [`20261010-211140_SeatMap-GulfAir-KSA-Round19-RealClockExperiment.md`](../../Logs/20261010-211140_SeatMap-GulfAir-KSA-Round19-RealClockExperiment.md)

Targeted run of 6 `SeatMap_TestCases.csv` cases (POS-02, VAL-03, VAL-04, BND-02, BIZ-02, REG-02): 4 passed, 2 failed. One recurrence of an already-tracked bug:

- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.** Existing `BUG-07`. Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (14th Confirmation) (`TC-SEATMAP-VAL-04`).

`TC-SEATMAP-REG-02` is recorded as failed for continuity with every earlier round (the live response carries fields SPEC.md §2.7 does not list: `isFareCheckRequired`, `passengersDetails.<pax>.{birthDate, documentNumber, passengersSeatMapAvailability}`, and a `NoSeat` cell category). Nothing is missing or mistyped, so no bug report; the fix is a SPEC.md §2.7 update (proposed in the run report, still pending).

**BUG-19** (valid seat silently not attached) did **not** reproduce: `TC-SEATMAP-VAL-03` attached seat 8A at 120 SAR and `Retrieve` confirmed it, this time on a flight where every seat has a fee (closing the Round 16 caveat). Only one attempt, so keep watching.

**BUG-16** did **not** reproduce: all 3 Book calls returned a clean 200 with a PNR.

## Cleanup

3 real ticketed GulfAir/KSA bookings were created on staging (OODZPW, TFQNIF, THWPTO). `BUG-07` cites `THWPTO` as evidence, so keep it until triaged.
