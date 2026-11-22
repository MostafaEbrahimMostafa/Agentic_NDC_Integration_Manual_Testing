# GulfAir — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (GulfAir row), §2.7 SeatMap.
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** Gulf Air (GF). Main supplier for the **SeatMap suite** (`TestCases/SeatMap/SeatMap_TestCases.csv`, 63 cases).
**Selectors:** `KSA` used. — Last verified: 2026-10-10 / staging / SEAT-R20
**Hosts used:** staging (STAG_ENV).
**Overall status:** V2 Search → FareConfirm → AddPassenger → GetSeatMap → Book works. Long-lived SeatMap bugs tracked round after round.

## 1. Live capabilities (V2, selector KSA)

| Endpoint | Status | Notes | Last verified |
|---|---|---|---|
| Search | Works | ~3 s when few run in parallel | 2026-10-10 / staging / SEAT-R20 |
| FareConfirm, AddPassenger, GetSeatMap | Work | | 2026-10-10 / staging / SEAT-R20 |
| Book | Works | 30-50 s | 2026-10-10 / staging / SEAT-R20 |
| Others | Not covered by the SeatMap suite | | — |

## 2. Routes and test data

- BAH departures have offers from at least 2027-03-23; **no offers from about 2027-07-09**, empty seat maps from about 2027-08. Use May to early July 2027. — Last verified: 2026-10-10 / staging / SEAT-R20
- Do not reuse the same flight + date as a previous round; check prior JSONL for segment ids first. Dates up to Round 20 cover most of May–early July 2027. — Last verified: 2026-10-10 / staging / SEAT-R20
- Sample Book with seats + ancillaries: `Resources/GulfAir_Booking_SelectedAncillaries_Seats.json`.

## 3. Known defects (SeatMap series)

Long-lived SeatMap-series bugs BUG-01..09, 15, 17, 18 (BUG-16/19 intermittent). The series is shared
with FlyAdeal (SEAT-R21) and Galileo (SEAT-R22) rounds. Occurrence counts after Round 22:
BUG-01/02/03/05/15 = 11, BUG-07 = 16, BUG-08 = 10, BUG-09 = 12, BUG-11 = 9, BUG-18 = 5. — Last verified: 2026-10-11 / supplier-integration / SEAT-R22

Details per bug: `Artifacts/BugReports/<SEAT-R20 slug>/`.

## 4. Gotchas / conventions

- Reuse the last full round's md/jsonl (Round 20) for request shapes, verdict conventions and occurrence counts. — Last verified: 2026-10-10 / staging / SEAT-R20
- Verdict conventions: VAL-04 FAIL = BUG-07; REG-02 kept FAIL "for continuity" (spec drift only); BND-02 PASS with NoSeat/AvailableFree flagged. — Last verified: 2026-10-10 / staging / SEAT-R20
- Truncate large bodies before writing JSONL (arrays > 3 items, strings > 110 chars) or the HTML reaches 30 MB. — Last verified: 2026-10-10 / staging / SEAT-R20
- Never `node -e require("./append.js")` to test: it writes to the real JSONL. — Last verified: 2026-10-10 / staging / SEAT-R20
- A full round is ~190 API calls and about 30 minutes. — Last verified: 2026-10-10 / staging / SEAT-R20

## 5. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| SEAT-R18 | 2026-10 | staging | SeatMap full 63 | 35/15/13 | see `Artifacts/Logs/` |
| SEAT-R20 | 2026-10-10 | staging | SeatMap full 63 (Real Clock Experiment) | 35/15/13 | `20261010-212551_…Round20-RealClockExperiment` |

Shared chain helpers: `NDC_Integration/Harness/_shared/{lib,api}.js`.
