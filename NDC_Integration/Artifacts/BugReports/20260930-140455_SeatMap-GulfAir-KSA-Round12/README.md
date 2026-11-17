# Bug Reports — Round 12 (2026-09-30) SeatMap-GulfAir-KSA targeted run

Source QA report: [`20260930-140455_SeatMap-GulfAir-KSA-Round12.md`](../../Logs/20260930-140455_SeatMap-GulfAir-KSA-Round12.md)

Targeted run of 11 `SeatMap_TestCases.csv` cases: 7 passed, 2 failed, 2 blocked. All three defects are
recurrences of already-tracked bugs, not new ones:

- [BUG-16_Book_Response409_SilentSuccess.md](BUG-16_Book_Response409_SilentSuccess.md) — **Critical.**
  Existing `BUG-16`, 2nd confirmed occurrence. Book answers 409 `NDC-INT-UNC-Z9999` after ~34–48 s while the
  booking is created and ticketed; no PNR is returned. Blocked `TC-SEATMAP-POS-02` and `TC-SEATMAP-VAL-03`.
- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.**
  Existing `BUG-07`, 8th confirmed occurrence. A cross-offer `cellId` is accepted and the seat is ticketed
  (`TC-SEATMAP-VAL-04`).
- [BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md](BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md) —
  **Medium.** Existing `BUG-17`, 2nd confirmed occurrence. A GulfAir/KSA offer can be read through
  GulfAir/UAE (`TC-SEATMAP-SEC-01`).

Also re-confirmed, without a new file: `BUG-11` (live supplier credentials in the 409 "already created"
envelope) and `BUG-09` (CHD offered every exit-row seat).

## Cleanup

Four real ticketed bookings exist with no `bookingToken`: `RIPLBZ`, `TVQBBV`, `RCEVKA`, `REGOSM` (see the QA
report's Cleanup section).
