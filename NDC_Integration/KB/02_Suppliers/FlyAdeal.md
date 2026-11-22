# FlyAdeal — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (FlyAdeal row).
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** flyadeal. Navitaire back end (seen in its 409 NoBookingInState errors).
**Selectors:** `EGY` used. — Last verified: 2026-10-11 / supplier-integration / SEAT-R21
**Hosts used:** `supplier-integration` (non-staging; user explicitly authorized Book/Hold for SEAT-R21).
**Overall status:** SeatMap + Book work with bundles; no Hold. Bundle analysis: `Artifacts/Analysis/UserStoryAnalysis/FlyAdeal_Bundle_Analysis.md`.

## 1. Live capabilities (V2, selector EGY)

| Endpoint | Status | Notes | Last verified |
|---|---|---|---|
| Search, FareConfirm, GetOfferBundles, AddPassenger | Work | Offers Nov 2026 – Mar 2027, none from ~May 2027 | 2026-10-11 / supplier-integration / SEAT-R21 |
| GetSeatMap, Book | Work **only with `selectedBundles`** `[{JourneyKey, SelectedBundleCode}]` | Codes from GetOfferBundles: FLY/FLYM/FLYP domestic, FCAI/FINT international | 2026-10-11 / supplier-integration / SEAT-R21 |
| Book result | "Booked" but unticketed, empty gdsPNR/bookingToken | | 2026-10-11 / supplier-integration / SEAT-R21 |
| Hold, SeatAfterHold | 409 OperationNotSupported | | 2026-10-11 / supplier-integration / SEAT-R21 |

## 2. Known defects (SeatMap series, SEAT-R21)

| Run key : Bug | Summary | Last verified |
|---|---|---|
| SEAT-R21 : BUG-20 | Blocked seats priced | 2026-10-11 / supplier-integration / SEAT-R21 |
| SEAT-R21 : BUG-21 | Round-trip Book returns pnr null | 2026-10-11 / supplier-integration / SEAT-R21 |
| SEAT-R21 : BUG-22 | Book without selectedOfferId → 500 | 2026-10-11 / supplier-integration / SEAT-R21 |
| SEAT-R21 : BUG-23 | PADIS K on every seat | 2026-10-11 / supplier-integration / SEAT-R21 |

## 3. Gotchas

- **Never run FlyAdeal chains in parallel** (Navitaire 409 NoBookingInState). — Last verified: 2026-10-11 / supplier-integration / SEAT-R21

## 4. Cleanup notes

~16 live unticketed PNRs from SEAT-R21, listed in that report's Cleanup section.

## 5. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| SEAT-R21 | 2026-10-11 | supplier-integration | SeatMap full 63 | 33/14/16 | `20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment` |
