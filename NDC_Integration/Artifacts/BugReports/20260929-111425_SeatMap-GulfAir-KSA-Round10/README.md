# Bug Reports — Round 10 (2026-09-29) SeatMap-GulfAir-KSA full-suite run

Source QA report: [`20260929-111425_SeatMap-GulfAir-KSA-Round10.md`](../../Logs/20260929-111425_SeatMap-GulfAir-KSA-Round10.md)

Round 10 was the first full 63-test-case run of `SeatMap_TestCases.csv` since Round 1. It surfaced one
new **critical** defect that blocked roughly a third of the suite, plus three further new defects:

- [BUG-01_Book_SeatSelection_HangsIndefinitely.md](BUG-01_Book_SeatSelection_HangsIndefinitely.md) —
  **Critical.** `Book` never returns a response (not even an error) when a real seat is selected —
  reproduced 3/3 times (8-26+ minutes each, never completed), vs. 27-46s for 3/3 no-seat `Book` calls.
  Blocked 23 of this run's 63 test cases, including `TC-BOOK-POS-03` and the re-verification of
  `BUG-09`/`BUG-16`.
- [BUG-02_ResponseId_NotEnforced_GetSeatMap_Book.md](BUG-02_ResponseId_NotEnforced_GetSeatMap_Book.md) —
  **High.** `ResponseId` is documented as mandatory on both `GetSeatMap` and `Book` but is not
  enforced by either — omitted or mismatched, both still return 200.
- [BUG-03_FareConfirmAfterHold_Unsupported_GulfAir.md](BUG-03_FareConfirmAfterHold_Unsupported_GulfAir.md) —
  **High.** `FareConfirmAfterHold` rejects with 409 OperationNotSupported for GulfAir even though
  `Hold` and `BookAfterHold` both work — breaks the documented Hold-branch sequence.
- [BUG-04_Book_EmptySetSegmentsSeats_SupplierError.md](BUG-04_Book_EmptySetSegmentsSeats_SupplierError.md) —
  **Medium.** An empty nested `setSegmentsSeats: {}` triggers a real supplier-layer 409, unlike an
  empty top-level `passengersSelectedSeats: {}`, which succeeds cleanly.

## Not re-confirmable this round

- **BUG-09** (Exit Row/CHD restriction not enforced) and **BUG-16** (Book/Hold intermittent HTTP 500)
  — both require a working Book-with-seat call, which BUG-01 above prevented. Recommend investigating
  all three together, since they may share a root cause in the seat-allocation code path.

## Cleanup

Three real, ticketed bookings were created incidentally this round while probing the above defects:
`QSGKXM`, `QXDDTN`, `QXXZEB` — none has a seat attached. See the QA report's Cleanup section.
