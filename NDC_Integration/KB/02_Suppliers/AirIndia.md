# AirIndia — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (AirIndia row) and §2.
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** Air India. Back end is `INFERRED` Navitaire from the `nsk:` error prefix (not confirmed).
**Selectors:** `EGY` only active (UAE/KSA 400). — Last verified: 2026-11-02 / ne-3 / AI-NE3
**Hosts used:** `ne-3` (no inventory), `supplier-integration` (has inventory, non-staging).
**Overall status:** Booking works **only on supplier-integration**. Hold/Void/Cancel/Upselling/FareCheck unsupported → only Family A flows apply.

## 1. Live capabilities (selector EGY)

| Endpoint | Status | Notes | Last verified |
|---|---|---|---|
| Search on ne-3 | `offers: []` on every route (1,618 searches), constant ~15 s; supplier leg fails silently | Blocker | 2026-11-02 / ne-3 / AI-NE3 |
| Search on supplier-integration | Works on 22 routes (e.g. DEL-BOM, BOM-DXB, COK-DXB direct); other markets 409 `nsk:InvalidMarket` | | 2026-11-02 / supplier-integration / AI-R2 |
| GetOfferBundles, GetAncillary, SeatMap, Book (V1+V2) | Work on supplier-integration | V2 offers: haveBundles/ancillary/seat true, canBeHeld false | 2026-11-02 / supplier-integration / AI-R2 |
| Hold, BookAfterHold, PnrReprice, CancelAfterHold, Void, Upselling, FareCheck, FareRules, SeatAfterHold | 409 OperationNotSupported "AirIndia does not exists" | Matches supplier matrix | 2026-11-02 / ne-3 / AI-NE3 |

## 2. Request shapes found live (supplier-integration)

- Book `selectedBundles: [{journeyKey (key of GetOfferBundles offerJourneys), selectedBundleCode}]`; V1 needs one per journey, `[]` rejected. — Last verified: 2026-11-02 / supplier-integration / AI-R2
- `PassengersSelectedAncillaries` keyed by pax refs of `passengersAncillariesAvailabilty`; codes are pax-specific; 1 SSR per pax per leg. — Last verified: 2026-11-02 / supplier-integration / AI-R2
- Seats `passengersSelectedSeats.Pax<n>.setSegmentsSeats.<segKey>.{cellCode,cellId}`. — Last verified: 2026-11-02 / supplier-integration / AI-R2
- AddPassenger can be called once per FareConfirm offer; V2 Book takes AddPassenger's ids; ResponseId ignored entirely. — Last verified: 2026-11-02 / supplier-integration / AI-R2

## 3. Known open defects

Two separate series (AI-NE3 and AI-R2).

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|
| AI-NE3 : BUG-01/02 | Search silently empty on ne-3 (supplier login only, no response) | High | Open | 2026-11-02 / ne-3 / AI-NE3 |
| AI-NE3 : BUG-03/04 | Credentials in plaintext in isDebug supplierRequest and in Z9999 error bodies | Critical | Open | 2026-11-02 / ne-3 / AI-NE3 |
| AI-NE3 : BUG-05/06 | V1 FareConfirm and Retrieve hang ~135 s on unknown ids; V1 Book/GetOfferBundles 500 on unknown ids | Medium | Open | 2026-11-02 / ne-3 / AI-NE3 |
| AI-R2 : BUG-01 | Retrieve ignores bookingToken | Critical | Open | 2026-11-02 / supplier-integration / AI-R2 |
| AI-R2 : BUG-02/03/04 | ResponseId never validated; AB0500 tax dropped in Book (India-UAE); V1 paid-bundle multi-pax price mismatch | High | Open | 2026-11-02 / supplier-integration / AI-R2 |
| AI-R2 : BUG-08/10/18 | bookingStatus "UnKnown"/absent; infant Search silent-empty after ~15 s; isDebug leaks credentials | High | Open | 2026-11-02 / supplier-integration / AI-R2 |

## 4. Gotchas

- **First thing next round on ne-3: one DEL-BOM Search.** If still empty, skip the flows. — Last verified: 2026-11-02 / ne-3 / AI-NE3
- supplier-integration is **not staging**: Book needs explicit user authorization per run.
- Shared pre-Book fixtures get consumed when a negative test is wrongly accepted: use an own chain per variant. — Last verified: 2026-11-02 / supplier-integration / AI-R2
- Never log transport errors (FETCH_ERROR) as results. — Last verified: 2026-11-02 / supplier-integration / AI-R2

## 5. Cleanup notes

No cancel/void possible. AI-R2 left 149 live non-prod bookings, listed in `Logs/<AI-R2 slug>_PNRs.csv`.

## 6. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| AI-NE3 | 2026-11-02 | ne-3 | Full regression, 484 | 89/23/372 | `20261102-124147_AirIndia-EGY-Full-Regression-ne3` |
| AI-R2 | 2026-11-02 | supplier-integration | Booking flow only V1+V2, 287 | 204/67/16 | `20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration` |
