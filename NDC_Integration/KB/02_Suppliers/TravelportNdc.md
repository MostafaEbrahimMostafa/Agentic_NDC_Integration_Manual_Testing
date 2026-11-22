# TravelportNdc — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (TravelPortNDC row) and §2.
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** Travelport NDC. Default supplier in `STAG_ENV` (with selector `UAE`).
**Selectors:** `UAE` and `EGY` active; `KSA` inactive. — Last verified: 2026-11-01 / ne-3 / TPN-FULL
**Hosts used:** `ne-3`, `ne-5` (same x-api-key).
**Overall status:** V1 + V2 Search/FareConfirm/Book/Hold/Void work. **No bundles.** Carriers QR, EK, RJ only.

## 1. Live capabilities (selector UAE)

| Endpoint | V1 | V2 | Notes | Last verified |
|---|---|---|---|---|
| Search / FareConfirm | Works | Works | CAI-JED: ~53 offers (QR + EK), only ~28 fully itemized | 2026-11-01 / ne-3 / TPN-FULL |
| Upselling | Works | Works | V1 has no `selectedOffer` (defect); V2 has no such check | 2026-11-01 / ne-3 / TPN-FULL |
| GetOfferBundles | 409 | 409 | `haveBundles` false everywhere → Bundle rows BLOCKED | 2026-11-01 / ne-3 / TPN-FULL |
| Book | Works | Works | Synchronous ~16 s; `voidCapability` `FullVoidOnlyAllowed` | 2026-10-27 / ne-5 / TPN-VOID2 |
| Hold / PnrReprice / BookAfterHold / CancelAfterHold | Work | Work | Run Holds sequentially (concurrent Holds on one offer → 409 BYP-A0001) | 2026-10-27 / ne-5 / TPN-VOID2 |
| Void | **Works since 2026-10-27** (was 409 OperationNotSupported) | Works | 200 `{voided, voidedTickets[]}`; V2 adds `passengersVoidedAncillaries` null + `emdTickets {}` | 2026-10-27 / ne-5 / TPN-VOID2 |
| Retrieve | Works | Works | Nulls infant `parentPaxRefId` (defect) | 2026-11-01 / ne-3 / TPN-FULL |
| Ancillary / SeatMap | not tested (out of user scope) | | | 2026-11-01 / ne-3 / TPN-FULL |

## 2. Carriers, routes and test data

- Carriers served: **QR, EK, RJ**. SV returns 0 offers on 30 routes (BUG-21: should SV be on TPN/UAE?). — Last verified: 2026-11-01 / ne-3 / TPN-FULL
- Valid party: ADT+CHD+INF ≤ 9 and INF ≤ ADT (115 combos all search OK); the 9 cap counts infants. — Last verified: 2026-11-01 / ne-3 / TPN-FULL
- QR hold deadline ≈ 8 days before a flight (hold on 11-04 for an 11-12 flight): plan post-expiry cases from the day after. — Last verified: 2026-11-01 / ne-3 / TPN-FULL
- EK is flaky: Book ~3/8 fail 409 BYP-A0001 and leave an orphan GDS PNR; transient "RESERVATION UPDATE IN PROGRESS" / "NO RESPONSE FROM VENDOR". — Last verified: 2026-11-01 / ne-3 / TPN-FULL

## 3. Supplier rules found live

- Void requires pnr, bookingToken, gdsPNR (400 "... is required"); whitespace pnr → 400; Void on a HELD booking → 409 Z9999 (hold survives). — Last verified: 2026-10-27 / ne-5 / TPN-VOID2
- `voidCapability` present on Book / BookAfterHold / ticketed Retrieve; absent on Hold / PnrReprice / held Retrieve; EK sometimes absent on Book. — Last verified: 2026-11-01 / ne-3 / TPN-FULL
- `holdExpirationDate` is `Z` in V1 but `+02:00` in V2. — Last verified: 2026-11-01 / ne-3 / TPN-FULL

## 4. Known open defects

Numbering continues across TPN-VOID1 → TPN-VOID2 → TPN-FULL.

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|
| TPN-VOID1/2 | Void never validates surName; bookingToken only presence-checked; voidTickets ignored (void-all) | High | Still reproduce | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-VOID1/2 | Raw OriginalSupplierRequest/Response + .NET type names in errors; Z9999 unmapped; two envelopes | High/Medium | Still reproduce | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-VOID1/2 | V2 Book without AddPassenger → 500 | Medium | Still reproduces | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-VOID2 : BUG-13 | Two concurrent bookings got the same bookingToken | High | Not reproduced in TPN-FULL | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-FULL : BUG-16 | V2 Book per-type amounts already multiplied by count | Medium | Open | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-FULL : BUG-17/18 | EK voidCapability sometimes absent; EK Book fails + orphan GDS PNR | Medium | Open | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-FULL : BUG-19 | Retrieve nulls infant parentPaxRefId | Medium | Open | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-FULL : BUG-22/23 | 10 pax incl. infants → 200 empty; party rules | Low | Open | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-FULL : BUG-24 | FareConfirm accepts another credentialsSelector | High | Open | 2026-11-01 / ne-3 / TPN-FULL |
| TPN-FULL : BUG-25 | Hold accepts a mismatched AddPassenger pair | Critical | Open | 2026-11-01 / ne-3 / TPN-FULL |

## 5. Gotchas

- Parallel bookings on one offer collide at the supplier ("INFANT QUOTA EXCEEDED", "FLIGHT IS LOCKED"): run 3-pax bookings sequentially; do not run V1 and V2 matrices at the same time. — Last verified: 2026-10-27 / ne-5 / TPN-VOID2
- A V1-created booking can be voided through the V2 endpoint (cleanup trick). — Last verified: 2026-10-26 / ne-5 / TPN-VOID1
- Redact `OriginalSupplier*` only when non-null; the 400 envelope has them as null, and redacting null makes the log imply a leak. — Last verified: 2026-10-27 / ne-5 / TPN-VOID2
- BIZ-01 (Void yesterday's ticket) needs 2 ticketed bookings left overnight. — Last verified: 2026-11-01 / ne-3 / TPN-FULL

## 6. Cleanup notes

All real bookings were voided/cancelled in every run. Orphan GDS PNRs from failed Books cannot be
cancelled via the API (CancelAfterHold with gdsPNR only → 500); they are listed in each run's Cleanup section.

## 7. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| TPN-V1 | 2026-08-05 | ne-3 | TestCases_V1 (first run, own bug series) | — | `20260805-140642_TestCases_V1` |
| TPN-VOID1 | 2026-10-26 | ne-5 | Void suite V1+V2, 53 | 28/22/3 | `20261026-105925_TravelportNdc-Void-UAE-V1V2` |
| TPN-VOID2 | 2026-10-27 | ne-5 | Same, new build | 35/15/3 | `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` |
| TPN-FULL | 2026-11-01 | ne-3 | Void + V1 + V2, QR/EK/RJ/SV, all pax combos, 281 | 144/64/73 | `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` |

Toolkits for these runs lived in session scratchpads (not kept). Rebuild on `Harness/_shared/lib.js`.
