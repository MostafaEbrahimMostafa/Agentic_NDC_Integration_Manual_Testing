# Bug Reports — Round 20 "Real Clock Experiment" (2026-10-10) SeatMap-GulfAir-KSA full-suite run

Source QA report: [`20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md`](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md)

Full run of all 63 `SeatMap_TestCases.csv` cases: 35 passed, 15 failed, 13 blocked. **No new defect** - all twelve reports below are recurrences of already-tracked bugs:

- [BUG-18_Retrieve_paxTotalSeatAmount_MultiSeat.md](BUG-18_Retrieve_paxTotalSeatAmount_MultiSeat.md) — **High.** Existing `BUG-18`. paxTotalSeatAmount Returned Incorrect Value in Retrieve Response for Multi-Seat Bookings (3rd confirmation) (`FLOW-V2-49-SEATFIELD`).
- [BUG-01_GetSeatMap_CrossOfferIdentifiers.md](BUG-01_GetSeatMap_CrossOfferIdentifiers.md) — **Medium.** Existing `BUG-01`. ResponseId/selectedOfferId Mismatch Accepted in GetSeatMap Request (9th confirmation) (`TC-SEATMAP-NEG-02`).
- [BUG-02_GetSeatMap_ResponseId.md](BUG-02_GetSeatMap_ResponseId.md) — **Low.** Existing `BUG-02`. ResponseId Not Enforced as Required in GetSeatMap Request (9th confirmation) (`TC-SEATMAP-NEG-04`).
- [BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md](BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md) — **Low.** Existing `BUG-15`. isSeatMapRequired=false Not Enforced - Seat Map Returned for an Offer That Is Not Flagged (9th confirmation) (`TC-SEATMAP-NEG-01`).
- [BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md](BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md) — **Medium.** Existing `BUG-17`. credentialsSelector Not Enforced - Offer Created Under KSA Readable Through UAE (6th confirmation) (`TC-SEATMAP-SEC-01`).
- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.** Existing `BUG-07`. Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (15th confirmation) (`TC-SEATMAP-VAL-04`).
- [BUG-06_Book_cellId.md](BUG-06_Book_cellId.md) — **High.** Existing `BUG-06`. Tampered cellId Accepted; Seat Booked From cellCode Alone (9th confirmation) (`TC-BOOK-NEG-06`).
- [BUG-05_Book_ResponseId.md](BUG-05_Book_ResponseId.md) — **Medium.** Existing `BUG-05`. ResponseId Not Enforced as Required in Book Request; Ticketed PNR Created (9th confirmation) (`TC-BOOK-NEG-12`).
- [BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md](BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md) — **High.** Existing `BUG-09`. Child Passenger Assigned an Exit-Row Seat With No Validation (11th confirmation) (`TC-BOOK-BIZ-05`).
- [BUG-03_SeatAfterHold_ErrorCode.md](BUG-03_SeatAfterHold_ErrorCode.md) — **High.** Existing `BUG-03`. SeatAfterHold Rejects Every GulfAir Call With 409 OperationNotSupported (9th confirmation) (`TC-SEATAFTERHOLD-POS-01`).
- [BUG-04_Hold_holdExpirationDate.md](BUG-04_Hold_holdExpirationDate.md) — **Medium.** Existing `BUG-04`. holdExpirationDate Returned as Null in Hold Response (9th confirmation) (`TC-SEATAFTERHOLD-NEG-02`).
- [BUG-08_Hold_passengersSelectedSeats.md](BUG-08_Hold_passengersSelectedSeats.md) — **Medium.** Existing `BUG-08`. passengersSelectedSeats Accepted and Priced by Hold Although Documented as Absent (9th confirmation) (`FLOW-V2-50-SEATFIELD`).

**BUG-16** (Book returns an error while silently creating the booking) did **not** reproduce: all 15 Book calls and all 3 BookAfterHold calls returned a clean 200 with a PNR. **BUG-19** (valid seat silently not attached) did **not** reproduce either.

## Cleanup

22 real GulfAir/KSA bookings and holds were created this round on staging (18 ticketed bookings, 4 held-only PNRs). They are listed in the QA report's Cleanup section; `BUG-18`, `BUG-07`, `BUG-06`, `BUG-05`, `BUG-09` and `BUG-08` cite some of them as evidence, so keep those until triaged.
