# SabreNdc — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (SabreNDC row) and §2.
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** Sabre NDC (SOAP back end). Content on EGY: **QR and AA** only.
**Selectors:** `EGY` active; `UAE`, `KSA` inactive. — Last verified: 2026-10-22 / ne-3 / SAB-VOID
**Hosts used:** `ne-3` (Void/VoidUnified/Generic), `ne-7` (Availability).
**Overall status:** Book, Hold, Void, CancelAfterHold, Upselling work. **No bundles, ancillaries or seat maps.** Builds change often — re-check `voidCapability` values every round.

## 1. Live capabilities (selector EGY)

| Endpoint | V1 | V2 | Notes | Last verified |
|---|---|---|---|---|
| Search | Works | Works | First V2 Search after idle took 120 s (cold start), then ~3 s | 2026-10-25 / ne-3 / SAB-GV2 |
| FareConfirm | Works | Works | Reprices ~3% of offers lower than Search; some offers 409 "Downstream" → try next offer | 2026-11-05 / ne-3 / SAB-VU2 |
| Upselling | Works | Works | V1 returns `upsellOffers[]` not `selectedOffer` (defect) | 2026-10-25 / ne-3 / SAB-R2 |
| GetOfferBundles, GetAncillary, SeatMap, FareCheck | 409 | 409 | OperationNotSupported; flags false on 144/144 offers | 2026-11-12 / ne-7 / SAB-AV2 |
| Book | Works | Works | Tickets synchronously, ~16-23 s; `voidCapability` = `FullVoidOnlyAllowed` | 2026-11-05 / ne-3 / SAB-VU2 |
| Hold / PnrReprice / BookAfterHold | Work | Work | Holds expire ~5.4 days out; Hold `voidCapability` = `"None"` (defect) | 2026-11-05 / ne-3 / SAB-VU2 |
| CancelAfterHold | Works | Works | But Retrieve still shows OnHold afterwards (defect) | 2026-11-12 / ne-7 / SAB-AV2 |
| Void | Works | Works | ~10 s; `voidTickets` items must be objects `{ticketNumber, carrierCode, ticketStatus}`; strings → 400; body needs surName + bookingToken | 2026-11-12 / ne-7 / SAB-AV2 |
| Retrieve | Works | Works | Ignores x-api-key / Client-Id (Critical) | 2026-11-05 / ne-3 / SAB-VU2 |
| Availability / Next / Select (new flow) | — | Works | CAI-JED +30 ~3-6 s, 6 journeys; page 2 works; max 2 legs | 2026-11-12 / ne-7 / SAB-AV2 |

## 2. Carriers, routes and test data

- QR-only offers on 20 routes (CAI/ALY with JED, RUH, DMM, MED, DOH). Offers go out to about D+250. — Last verified: 2026-11-05 / ne-3 / SAB-VU2
- **SV (Saudia) has no inventory** on SabreNdc/EGY (0 offers in 880 routes + 224 targeted searches). — Last verified: 2026-11-05 / ne-3 / SAB-VU2
- Pure-AA bookable offers only on US domestic (e.g. JFK-MIA); CAI-JFK AA offers are QR codeshares that fail ticketing. Codeshares (ME, IB, BA, QR+AA) fail at ticketing 409. — Last verified: 2026-11-04 / ne-3 / SAB-VU1
- Some offers Search returns are refused by FareConfirm/Hold/Book (QR1301/1303 connections on RUH/DMM/JED-CAI) — BUG-15. — Last verified: 2026-11-05 / ne-3 / SAB-VU2
- V1 flows use the collection-default mix 2 ADT + 2 CHD + 2 INF (6 tickets, Book ~45 s). — Last verified: 2026-10-25 / ne-3 / SAB-R2

## 3. Supplier rules found live

- `voidCapability` (Build B, 2026-11-05): Book, BookAfterHold, ticketed Retrieve = `FullVoidOnlyAllowed`; after Void Retrieve = `VoidNotAllowed`; Hold and held Retrieve = `"None"` (defect); PnrReprice key present with null. — Last verified: 2026-11-05 / ne-3 / SAB-VU2
- Void on a held booking = 400 "Only fulfilled, ticketed orders can be voided". Repeat Void = 409 (fixed since 10-22). — Last verified: 2026-11-04 / ne-3 / SAB-VU1
- Partial `voidTickets` still voids all tickets. — Last verified: 2026-11-04 / ne-3 / SAB-VU1
- Select on SabreNdc accepts only a flat id list (rejects the collection's nested `bookingClassIds`). — Last verified: 2026-11-12 / ne-7 / SAB-AV2
- V2 Retrieve lists one fare entry **per passenger**, Search/Book/Hold one per **type**: do not multiply Retrieve by count when reconciling. — Last verified: 2026-10-25 / ne-3 / SAB-GV2
- V2 AddPassenger rejects non-Latin names, wrong pax mix, bad INF parent, bad contactRefId (400). — Last verified: 2026-10-25 / ne-3 / SAB-GV2

## 4. Known open defects

Two numbering series exist: the Void/Generic/V2 series (SAB-VOID → SAB-R2) and the VoidUnified series (SAB-VU1/VU2). Always quote the run key.

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|
| SAB-VOID : BUG-01 | Void does not check surName | High | Open | 2026-10-25 / ne-3 / SAB-R2 |
| SAB-VOID : BUG-02 | A foreign ticket in voidTickets voids every ticket | High | Open (partial voids all) | 2026-11-04 / ne-3 / SAB-VU1 |
| SAB-VU1 : BUG-03 | Hold / held Retrieve `voidCapability` = `"None"` | Medium | Open on Build B | 2026-11-05 / ne-3 / SAB-VU2 |
| SAB-VU1 : BUG-08 | Retrieve ignores x-api-key and Client-Id | Critical | Open | 2026-11-05 / ne-3 / SAB-VU2 |
| SAB-VU1 : BUG-11 | V2 Retrieve after CancelAfterHold still OnHold | Medium | Open | 2026-11-12 / ne-7 / SAB-AV2 |
| SAB-VU1 : BUG-12 | Book median ~22 s (was ~16 s) | Low | Open | 2026-11-05 / ne-3 / SAB-VU2 |
| SAB-VU2 : BUG-13/14/15 | Unknown supplier leaks .NET names; intermittent HTTP 500; offers refused after Search | Medium | Open | 2026-11-05 / ne-3 / SAB-VU2 |
| SAB-GV2 : BUG-09/11/12/13/14 | FareConfirm ignores ResponseId; Book accepts mismatched offerId; repeat Book = second PNR; Hold accepts stale AddPassenger pair; Search has no taxesAndFees | High | Open | 2026-10-25 / ne-3 / SAB-R2 |
| SAB-R2 : BUG-15..20 (V1) | No bookingStatus; Upselling no selectedOffer; collection `{{requestUrl}}`; no paxTotalAmount; INF without valid parent accepted; unresolved contactRefId accepted | Medium/High | Open | 2026-10-25 / ne-3 / SAB-R2 |
| SAB-AV2 : BUG-02 | isDebug=true returns raw SOAP with the Sabre WSSE username in clear text | High | Open | 2026-11-12 / ne-7 / SAB-AV2 |
| SAB-AV2 : BUG-04/06/07 | Next accepts mixed ids; FareConfirm rbd differs from Select; FareConfirm ignores ResponseId | High | Open | 2026-11-12 / ne-7 / SAB-AV2 |

**Fixed (Build B, 2026-11-05):** SAB-VU1 BUG-01/02 (Retrieve/BookAfterHold "None"), BUG-07 (V2 bookingStatus after Void). SAB-GV2 BUG-10 (garbage offerId 500 → 400) looks fixed since 2026-10-25 evening.

## 5. Gotchas

- **Never run two Sabre processes in parallel.** Sabre answers 409 `ReachedTALimit` (session cap); harness waits 2-4 min and retries. — Last verified: 2026-11-12 / ne-7 / SAB-AV2
- Max 4-6 parallel chains on ne-3; ~8 gave 409 "Too Many Requests" and bursts of 500. — Last verified: 2026-11-05 / ne-3 / SAB-VU2
- **Mid-run redeploy happened** (all calls 500 for ~20 s, then new behaviour). Keep pre-change data as baseline and rerun everything on the final build. See Lessons L-04. — Last verified: 2026-11-05 / ne-3 / SAB-VU2
- surName is ignored by Void, so every surname/injection variant voids its booking: each variant needs its own fresh booking (~13 bookings per version). — Last verified: 2026-10-22 / ne-3 / SAB-VOID
- A run-wide fact (e.g. V1 AA `VoidNotAllowed`) can invalidate earlier PASS rows: re-check BIZ-style rows after the run. — Last verified: 2026-11-04 / ne-3 / SAB-VU1
- Strip `:` and `+` from call-file tags (Windows crash after the Void was already sent). — Last verified: 2026-11-04 / ne-3 / SAB-VU1
- Raw call store is scrubbed; re-check credential leaks with a live call. — Last verified: 2026-11-12 / ne-7 / SAB-AV2

## 6. Cleanup notes

All bookings from SAB-VOID … SAB-VU2 were voided/cancelled (SAB-VU2: 1,274 PNRs). 4 Book/Hold calls
answered 500 with no PNR (state unknown) — listed in the SAB-VU2 report. SAB-AV2 Round 1 (2026-11-11,
not finalised) left PNRs listed in `Harness/SabreNdc/r1/`.

## 7. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| SAB-VOID | 2026-10-22 | ne-3 | Void suite V1+V2 | 25/9/2 | `20261022-093839_SabreNdc-Void-EGY-V1V2` |
| SAB-GV2 | 2026-10-25 | ne-3 | Generic + V2 | 37/7/20 · 26/3/183 | `20261025-092205_SabreNdc-EGY-Generic`, `20261025-093421_SabreNdc-EGY-V2` |
| SAB-R2 | 2026-10-25 | ne-3 | Generic + V2 + V1, new build | 38/6/20 · 26/3/183 · 17/15/27 | `20261025-185354_…-Generic-Round2`, `…185428_…-V2-Round2`, `…190214_…-V1-Round2` |
| SAB-VU1 | 2026-11-04 | ne-3 | VoidUnified 67 | 21/25/21 | `20261104-140909_SabreNdc-EGY-VoidUnified-ne3` |
| SAB-VU2 | 2026-11-05 | ne-3 | VoidUnified 67, SV+QR every offer | 21/24/22 | `20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3` |
| SAB-AV2 | 2026-11-12 | ne-7 | Availability QR, partial 133/237 | 112/20/1 | `20261112-085012_SabreNdc-EGY-Availability-QR-Round2-ne7-Partial` |

Open work: `Harness/SabreNdc/g8.js` (routes + SABRT lifecycle flows) and g4-g7 are written but **never run** — debug with `ONLY=` first.
Harness: `NDC_Integration/Harness/SabreNdc/` — see [../03_Technical/Harness_Guide.md](../03_Technical/Harness_Guide.md).
