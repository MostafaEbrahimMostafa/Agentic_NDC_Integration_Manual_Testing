# AirArabiaPlus — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (AirArabia row) and §2.
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** Air Arabia "One-API" aggregator (new in Nov 2026), carriers G9, E5, 3O.
**Selectors:** `USA` active. Others untested for this supplier. — Last verified: 2026-11-09 / ne-6 / AAP-ONEAPI
**Hosts used:** `ne-6` (main), `ne-1` (container app), `stg-ne` (no number). Same behaviour across hosts for BUG-10 — Last verified: 2026-11-16 / stg-ne / AAP-BUG10
**Overall status:** V2 booking chain works for **G9 only**. Void/Cancel unsupported, so every Book leaves a live ticket.

## 1. Live capabilities (V2, selector USA)

| Endpoint | Status | Notes | Last verified |
|---|---|---|---|
| Search | Works | ~10-20 s; intermittent `offers: []` or 409 Z9999 "response ended prematurely" | 2026-11-16 / stg-ne / AAP-XLSX |
| FareConfirm | Works | | 2026-11-09 / ne-6 / AAP-ONEAPI |
| GetOfferBundles | Works | 200 on every route/pax in the 11-16 check | 2026-11-16 / stg-ne / AAP-XLSX |
| AddPassenger | Works | Rejects hyphen, apostrophe, accented names (open defect) | 2026-11-09 / ne-6 / AAP-ONEAPI |
| GetAncillary | Works | Baggage = journey level, Meal = segment level | 2026-11-08 / ne-6 / AAP-R3 |
| SeatMap (`POST api/V2/SeatMap/Seat`) | Works | | 2026-11-08 / ne-6 / AAP-R3 |
| FareCheck | Works | Rejects some offered services (open defect) | 2026-11-16 / stg-ne / AAP-XLSX |
| Book | Works | Tickets synchronously | 2026-11-09 / ne-6 / AAP-ONEAPI |
| Hold | Works | Window ~75 min; seats/ancillaries accepted on Hold | 2026-11-09 / ne-6 / AAP-ONEAPI |
| Retrieve, PnrReprice, BookAfterHold | Work | | 2026-11-09 / ne-6 / AAP-ONEAPI |
| Upselling, FareRules, SeatAfterHold, ReleasePnr, refund quota, **Void, CancelAfterHold** | 409 OperationNotSupported ("AirArabiaPlus does not exists") | | 2026-11-09 / ne-6 / AAP-ONEAPI |
| `voidCapability` | Always `VoidNotAllowed`; on PnrReprice the string `"None"` (was null) | | 2026-11-16 / stg-ne / AAP-XLSX |

## 2. Carriers, routes and test data

- **G9 is the only bookable carrier.** All direct, marketing = operating G9. — Last verified: 2026-11-09 / ne-6 / AAP-SWEEP
- G9 routes live every day 2026-11-10..12-31 (after re-checking empties): COK-SHJ, AMM-SHJ, SHJ-AMM, MCT-SHJ. SHJ-COK is patchy (one flight, many persistent empties; usable 12-07..12-14, 12-19..12-31). — Last verified: 2026-11-09 / ne-6 / AAP-SWEEP
- **G9 schedule ends 2026-12-31**: nothing from 2027-01-01 (probed to 2027-03). — Last verified: 2026-11-09 / ne-6 / AAP-SWEEP
- Connecting offers (via SHJ) only COK→MCT, COK→AMM, MCT→COK; never AMM→COK. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- **E5** (CAI-MCT, HBE-BGY): 0 offers on every probe to 2027-12. **3O**: only CMN→SAW on 7 dates (none after 2026-12-03); SAW→CMN never. Open question: are E5/3O configured for selector USA? — Last verified: 2026-11-09 / ne-6 / AAP-SWEEP
- ~100 test bookings sold out SHJ→COK low fares (instant empty Search). Spread bookings across routes. — Last verified: 2026-11-09 / ne-6 / AAP-ONEAPI
- Route list for this supplier: `Resources/AirarabiaPlus_Routes.md`.

## 3. Supplier rules found live

- **Ancillary flow:** Search → FareConfirm → AddPassenger → GetAncillary → SeatMap → FareCheck → Book. Book uses FareCheck's ids. Seats go in `passengersSelectedSeats.<pax>.setSegmentsSeats.<seg>.{cellCode,cellId}`. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- **Send seats on FareCheck too.** Without them Book total = FareCheck total + seats + 5% seat tax; with them totals match. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- **Bundle flow:** Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary(`selectedBundles`) → SeatMap → FareCheck → Book(`selectedBundles` + ancillaries + seats). `sellBundleRequiresAncillary` = [Baggage, Meal, Seat]: every non-infant needs Seat+Meal+Baggage per segment. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- Book alone with `selectedBundles` is silently ignored (even a bogus code returns 200 — validation gap). — Last verified: 2026-11-08 / ne-6 / AAP-R3
- One bundle code for all journeys. 66580 (Value) is missing on some journeys with a child; 66589 / 66624 work as fallbacks. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- Never pick Baggage "No Bag" or beverage meals (rejected at FareCheck/Book). Adult with infant must not get exit-row/bulkhead (PADIS E/K) seats. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- Staging Swagger: `/swagger/index.html` (per-area JSON e.g. `/swagger/Ancillary/swagger.json`). Read it before guessing field names. — Last verified: 2026-11-08 / ne-6 / AAP-R3

## 4. Known open defects

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|
| AAP-ONEAPI : BUG-18 (ADO 65513) | `ParentPaxRefId` ignored: infants attached to adults in order of appearance (Hold, Book, Retrieve) | High | Still reproduces | 2026-11-16 / stg-ne / AAP-XLSX |
| AAP-ONEAPI : BUG-10 (ADO 65507) | `paxTotalAncillaryAmount` FareCheck/Book ≠ Retrieve (only bundle 66589 + paid meal 264.32; grand total equal) | Medium | Still reproduces, deterministic across hosts | 2026-11-16 / stg-ne / AAP-BUG10 |
| AAP-ONEAPI | Retrieve ignores invalid/missing x-api-key and Client-Id | Critical | Open | 2026-11-09 / ne-6 / AAP-ONEAPI |
| AAP-ONEAPI | Cross-tenant Retrieve: a USA booking is returned under selector EGY | High | Still reproduces | 2026-11-16 / stg-ne / AAP-XLSX |
| AAP-ONEAPI | BookAfterHold tickets an expired hold; double Book makes a second PNR | High | Open | 2026-11-09 / ne-6 / AAP-ONEAPI |
| AAP-ONEAPI | ResponseId never validated; bookingToken not checked against pnr; foreign seat cellId accepted | High | Open | 2026-11-09 / ne-6 / AAP-ONEAPI |
| AAP-ONEAPI | Two error envelopes (camelCase 1001 vs PascalCase NDC-INT-TEC-A0001); 409 Z9999 for validation errors; malformed offer id → 500 | Medium | Open | 2026-11-09 / ne-6 / AAP-ONEAPI |
| AAP-ONEAPI | Search accepts 10 passengers; hyphen/apostrophe/accented names rejected | Medium | Open | 2026-11-09 / ne-6 / AAP-ONEAPI |
| AAP-XLSX : BUG-03 | Occupied seats carry `seatPriceDetailsByPassenger` (some 0.00) | Medium | Still reproduces | 2026-11-16 / stg-ne / AAP-XLSX |
| AAP-XLSX : BUG-05 | PnrReprice `voidCapability` = `"None"` (expected `VoidNotAllowed`) | Medium | Still reproduces | 2026-11-16 / stg-ne / AAP-XLSX |
| AAP-XLSX : BUG-06 | FareCheck rejects offered services (66580 meal 409; 66589 ADT+CHD+INF 409; 66624 works) | High | Still reproduces | 2026-11-16 / stg-ne / AAP-XLSX |
| AAP-XLSX : BUG-07 | INF `baggageDetailsRefId` null in Search (all routes) | Medium | Still reproduces | 2026-11-16 / stg-ne / AAP-XLSX |

**Not reproduced (no bug filed):** rbd null, rbd Search≠FareConfirm, GetOfferBundles 409. — Last verified: 2026-11-16 / stg-ne / AAP-XLSX
**Retracted:** AAP-R1 BUG-01/02 (test-script gaps). See [../04_Decisions_and_Lessons.md](../04_Decisions_and_Lessons.md) L-01.

## 5. Gotchas

- Run **one runner at a time** with 5 s / 20 s backoff; parallel runners and retry bursts made the supplier worse. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- Never let two runner processes share one JSONL with a truncate-and-rewrite step (corrupted a line). The recorder is append-only now. — Last verified: 2026-11-09 / ne-6 / AAP-ONEAPI
- The JSONL truncates big bodies; checks that need full bodies must read the raw store (`fx.rawOf`). — Last verified: 2026-11-09 / ne-6 / AAP-ONEAPI
- Generic CSV IDs collide with SeatMap CSV IDs (TC-BOOK-BIZ-04, TC-BOOK-NEG-05, TC-RETRIEVE-REG-01, TC-SEATMAP-POS-01/NEG-01); the SeatMap ones run as `@SEAT`. — Last verified: 2026-11-09 / ne-6 / AAP-ONEAPI
- Match hops by CorrelationId, not attempt number (attempt numbers repeat across batches). The server issues its own CorrelationId in a response header. — Last verified: 2026-11-08 / ne-6 / AAP-R3
- A transient `FETCH_ERROR` on Retrieve is a harness/transport error: delete that line and re-run, never log it as FAIL. — Last verified: 2026-11-11 / ne-1 / AAP-BUG18
- Book is limited to a few PNRs per verification (Void unsupported). Holds expire ~75 min. — Last verified: 2026-11-11 / ne-1 / AAP-BUG18
- Re-asked retest 15 min after a finished one: report the existing result instead of re-running (re-runs only add leftovers). — Last verified: 2026-11-16 / stg-ne / AAP-XLSX

## 6. Cleanup notes

Void and CancelAfterHold are unsupported, so tickets and holds stay live (holds expire ~75 min).
Leftover lists: Cleanup section of each run report (AAP-ONEAPI listed 89 tickets + 28 holds).

## 7. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| AAP-R1 | 2026-11-08 | ne-6 | 24 booking-creation cases (`Resources/API TEST CASE LIST.xlsx`) | 7/15/2 | `20261108-124139_AirArabiaPlus-USA-BookingCreation-ne6` |
| AAP-R3 | 2026-11-08 | ne-6 | Same 24, corrected flows | 22/2/0 (final) | `20261108-171128_AirArabiaPlus-USA-BookingCreation-Round3-ne6` (raw hop log only) |
| AAP-SWEEP | 2026-11-09 | ne-6 | Search availability sweep G9/E5/3O | — | not kept (scratchpad) |
| AAP-ONEAPI | 2026-11-09 | ne-6 | Full V2 One-API regression, 397 TCs, 24 bugs | 234/40/123 | `20261109-084356_AirArabiaPlus-USA-OneAPI-Regression-ne6` |
| AAP-BUG18 | 2026-11-11 | ne-1 | BUG-18 ParentPaxRefId verify, 98 TCs | 66/32/0 | `20261111-121500_AirArabiaPlus-USA-BUG18-ParentPaxRefId-Verify-ne1` |
| AAP-BUG10 | 2026-11-16 | stg-ne | ADO 65507 verify | Still reproduces | outputs in `Harness/AirArabiaPlus/` (verify10d.js) |
| AAP-XLSX | 2026-11-16 | stg-ne | 12-bug sheet `Resources/AirArabiaPlus_bugs.xlsx` | 8 reproduce / 3 not | `BugReports/20261116_AirArabiaPlus-USA-Verify-ne/` |

Harness: `NDC_Integration/Harness/AirArabiaPlus/` — see [../03_Technical/Harness_Guide.md](../03_Technical/Harness_Guide.md).
