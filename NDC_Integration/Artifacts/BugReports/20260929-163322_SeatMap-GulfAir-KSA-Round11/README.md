# Bug Reports — Round 11 (2026-09-29) SeatMap-GulfAir-KSA targeted run

Source QA report: [`20260929-163322_SeatMap-GulfAir-KSA-Round11.md`](../../Logs/20260929-163322_SeatMap-GulfAir-KSA-Round11.md)

Targeted run of 11 `SeatMap_TestCases.csv` cases: 9 passed, 2 failed. Both failures are defects:

- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.**
  Existing `BUG-07`, 7th confirmed occurrence (not new). A cross-offer `cellId` is accepted; this time the
  seat is attached and ticketed instead of silently dropped.
- [BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md](BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md) —
  **Medium. New.** A GulfAir/KSA offer can be read through GulfAir/UAE. Numbered `BUG-17` to continue the
  tracked sequence (Round 8's `BUG-16` was the last; Round 9 confirmed no `BUG-17` exists). Round 10's folder
  numbered its files locally from `BUG-01`, so confirm the ID against the tracker before filing.

## Cleanup

Three real ticketed bookings were created: `QRDHHX`, `QPGBSC`, `QPOJIW` (see the QA report's Cleanup section).
