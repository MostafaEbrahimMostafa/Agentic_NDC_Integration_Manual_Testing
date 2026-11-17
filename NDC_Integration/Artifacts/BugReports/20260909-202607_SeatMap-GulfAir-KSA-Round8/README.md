# Bug Reports — Round 8 (2026-09-09) SeatMap-GulfAir-KSA targeted re-verification

Source QA report: [`20260909-202607_SeatMap-GulfAir-KSA-Round8.md`](../../Logs/20260909-202607_SeatMap-GulfAir-KSA-Round8.md)
Prior runs: [Round 1](../20260825-103032_SeatMap-GulfAir-KSA/) &middot;
[Round 2](../20260826-154300_SeatMap-GulfAir-KSA-Round2/) &middot;
[Round 3](../20260830-093343_SeatMap-GulfAir-KSA-Round3/) &middot;
[Round 4](../20260830-090507_SeatMap-GulfAir-KSA-Round4/) &middot;
[Round 5](../20260830-143810_SeatMap-GulfAir-KSA-Round5/) &middot;
[Round 7](../20260909-103751_SeatMap-GulfAir-KSA-Round7/)

Round 8 was scoped to 10 targeted test cases (3 carried over from Round 7, 7 newly added). Instead,
this round surfaced a **new critical outage** that superseded most of the planned assertions before
they could be evaluated.

## New this round (1 defect)

- [BUG-16_Book_Hold_500_Despite_Silent_Success.md](BUG-16_Book_Hold_500_Despite_Silent_Success.md) —
  Book and Hold return HTTP 500 to the caller on every attempt for GulfAir/KSA, while the booking is
  silently created server-side regardless (confirmed via a same-offer retry returning HTTP 409
  "already been created (609)"); the 409 envelope also leaks live supplier `apiKey`/`secretKey` in
  plaintext, the same class of issue as BUG-11 but reachable on a first call — **Critical**

## Not re-verified this round (blocked by BUG-16)

- **BUG-07** (Book silently drops a cross-offer cellId instead of rejecting it) — `TC-SEATMAP-VAL-04`
  was deliberately not attempted this round to avoid creating an additional uncontrolled, untrackable
  live booking under the active BUG-16 outage. Status unconfirmed since Round 7.
- **BUG-06** (Book accepts a tampered/truncated `cellId`) and its un-numbered companion finding
  (`TC-BOOK-VAL-06`, Book trusts `cellCode` over `cellId`) — same reasoning; both `TC-BOOK-NEG-06` and
  `TC-BOOK-VAL-06` were deliberately not attempted this round.

## New UNKNOWN-resolution (not a defect — logged as a spec-update candidate)

- `TC-SEATMAP-BND-02` / `TC-SEATMAP-REG-02`: GetSeatMap's `cellCategory` enum has a confirmed third
  value, `NoSeat` (a structurally-absent seat position within an otherwise-standard row), beyond
  SPEC.md §2.7's documented `{Seat, Aisle}` pair. Not previously seen in Rounds 1–7. See the QA
  report's Proposed SPEC.md updates section.

## Completed cleanly this round (read-only, unaffected by BUG-16)

- `TC-SEATMAP-BND-02` (PASS), `TC-SEATMAP-BIZ-02` (PASS), `TC-SEATMAP-REG-02` (FAIL — same 2
  pre-existing undocumented fields as Round 6, plus the new `NoSeat` enum value)
