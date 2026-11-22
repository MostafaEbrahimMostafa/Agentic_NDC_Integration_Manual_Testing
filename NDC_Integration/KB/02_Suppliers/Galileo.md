# Galileo — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (Galileo row; Hold is a §4.4 conflict) and §2.
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** Travelport Galileo GDS, with a new NDC **Availability** flow (Availability → NextAvailability → SelectAvailability → FareConfirm).
**Selectors:** `EGY` used. — Last verified: 2026-11-15 / ne-4 / GAL-R4
**Hosts used:** `ne-4` (main), `supplier-integration` (SeatMap R22, non-staging).
**Overall status:** Availability + FareConfirm + Hold + CancelAfterHold work. **Book and BookAfterHold cannot ticket (FOP error).** FareCheck unsupported.

## 1. Live capabilities (V2, selector EGY, ne-4)

| Endpoint | Status | Notes | Last verified |
|---|---|---|---|
| Availability (first page) | Works | CAI-JED +30: ~16 journeys, `hasMoreResults=true`; also returns Search-style `journeys`/`flightSegments` | 2026-11-15 / ne-4 / GAL-R4 |
| NextAvailability | Flaky / times out | 409 Z9999 ~10.5 s on many routes (BUG-01); any 2-leg search fails (BUG-26) | 2026-11-15 / ne-4 / GAL-RTMC |
| SelectAvailability | Works | **Body changed 2026-11-15**: `bookingClassIds {journey:{segment:"id"}}` string form; array form = 400 (BUG-25) | 2026-11-15 / ne-4 / GAL-RTMC |
| FareConfirm | Works | One-way + connecting; round trips price per carrier (see §3) | 2026-11-15 / ne-4 / GAL-RTMC |
| GetAncillary | Works | Journey baggage only, although FareConfirm flags say no ancillary | 2026-11-10 / ne-4 / GAL-R3 |
| SeatMap | Works | Only SV/MS on supplier-integration (NE, XY 409) | 2026-11-10 / ne-4 / GAL-R3 |
| FareCheck | 409 OperationNotSupported (BUG-13) | | 2026-11-15 / ne-4 / GAL-R4 |
| Hold | Works on MS/SV | `pnr=null`, `gdsPNR` set; Retrieve later returns a pnr; baggage + seats accepted | 2026-11-15 / ne-4 / GAL-R4 |
| Book | **Fails** after ~35 s "FOP SELECTED NOT AUTHORIZED FOR CARRIER" (BUG-14) | | 2026-11-15 / ne-4 / GAL-R4 |
| BookAfterHold | **Fails** (3 ways; first attempt writes the FOP so retries fail, BUG-15) | | 2026-11-15 / ne-4 / GAL-R4 |
| CancelAfterHold | Works (200 `cancelled:true`) but **bookingToken not validated** (BUG-23) | | 2026-11-15 / ne-4 / GAL-R4 |
| SeatAfterHold, GetOfferBundles | 409 OperationNotSupported | | 2026-10-11 / supplier-integration / SEAT-R22 |

## 2. Carriers, routes and test data

- Paging route: JED-CAI +30 (2 ADT + 1 INF). HKG-LHR +30 is single-page. — Last verified: 2026-11-10 / ne-4 / GAL-R1
- First Y journey on CAI-JED +30 is now **NE174 — priced but not holdable** ("0 AVAIL/WL CLOSED"). NE172 and NP328 also unholdable. Hold works on MS673, MS644, SV386, SV309. — Last verified: 2026-11-15 / ne-4 / GAL-R4
- Run booking groups with `PREFER_CARRIER=MS`, else flows fail at Hold on NE174. — Last verified: 2026-11-15 / ne-4 / GAL-R4
- Round-trip pricing by carrier: MS, EK, LH, NE price; SQ, NH, MH fail 4522 NO VALID FARE. Open-jaw fails "SEPARATE TKTS REQUIRED". — Last verified: 2026-11-15 / ne-4 / GAL-RTMC
- DXB-LHR returns LGW/STN arrivals, CAI-LHR returns LCY (BUG-27); JED-LHR clean. — Last verified: 2026-11-15 / ne-4 / GAL-RTMC

## 3. Supplier rules found live

- Max 2 `searchCriteria` legs (3+ = 400 "SearchCriteria must contain 1 or 2 entries."). — Last verified: 2026-11-15 / ne-4 / GAL-RTMC
- Date `YYYY-MM-DD` and T-time accepted (time ignored); IATA/supplier case-insensitive; 365 days ahead = 409 date outside range. — Last verified: 2026-11-10 / ne-4 / GAL-R1
- Select returns `{responseId (same as availability), supplier, offerId}`; page-1 ids stay selectable after page 2. — Last verified: 2026-11-10 / ne-4 / GAL-R1
- Availability lists only classes that can seat the party; max 9 per type and total; infants ≤ adults; adult required. — Last verified: 2026-11-10 / ne-4 / GAL-R3
- Passenger surnames must be letters only (digits → AddPassenger 400). — Last verified: 2026-11-15 / ne-4 / GAL-R4
- Seats/baggage on Hold: pass the ids of the **last** enrichment call and the `cellId` exactly as SeatMap returns it (trailing `~`). — Last verified: 2026-11-10 / ne-4 / GAL-R3
- Galileo seat requests are keyed by the passenger GUID from GetSeatMap `passengersDetails` (not `Pax1`). — Last verified: 2026-10-11 / supplier-integration / SEAT-R22
- Error mapping: validation = camelCase `1001`; business predicates = PascalCase `NDC-INT-TEC-A0001`; unknown availabilityId = 404; bad key = 401; supplier failure = 409 `NDC-INT-UNC-Z9999`. — Last verified: 2026-11-10 / ne-4 / GAL-R1

## 4. Known open defects

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|
| GAL-R1 : BUG-01 | NextAvailability times out on many routes | High | Open, worse in R4 | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R1 : BUG-02 | Error bodies carry OriginalSupplierRequest/Response with isDebug=false | High | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R1 : BUG-03/04 | Supplier errors = 409 Z9999 with ErrorMessage==ErrorCode; binding errors leak .NET / Dto type names | Medium | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R1 : BUG-05/06/07 | Next accepts mixed ids; FareConfirm ignores ResponseId; Select ignores ref keys | Medium/High | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R1 : BUG-08 | Round-trip FareConfirm 4522 — narrowed by GAL-RTMC BUG-28 (carrier/route dependent) | Medium | Changed | 2026-11-15 / ne-4 / GAL-RTMC |
| GAL-R1 : BUG-10 | isDebug=true supplierRequest contains branch config | High | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R3 : BUG-12 | FareConfirm taxesAndFees has Cancel/ChangeFee for non-MS carriers; NE/SV/NP do not reconcile | Medium | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R3 : BUG-13/14/15 | FareCheck unsupported; Book FOP error; BookAfterHold fails | High | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R3 : BUG-16..22 | Hold shifts departure time; unholdable offered flights; paging page-7 409; seatsAvailable null; "Cai" not normalised; 108-min-old ids accepted | Low–Medium | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R4 : BUG-23 | CancelAfterHold ignores bookingToken ("INVALID-TOKEN" cancels a live hold) | High | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-R4 : BUG-24 | After cancel, Retrieve/BookAfterHold = 409 Z9999 + raw supplier payload | Medium | Open | 2026-11-15 / ne-4 / GAL-R4 |
| GAL-RTMC : BUG-25..28 | Select string-form body (collection still sends arrays); 2-leg Next fails; wrong airports under LHR; open-jaw pricing | Medium | Open | 2026-11-15 / ne-4 / GAL-RTMC |

## 5. Gotchas

- Run calls **sequentially**: parallel searches push first-page latency to ~20 s and add timeouts. — Last verified: 2026-11-10 / ne-4 / GAL-R1
- Paging timeouts are supplier-side and flaky: one failure is not a verdict on a route. — Last verified: 2026-11-10 / ne-4 / GAL-R2
- Old Round 1-4 scripts need `SELECT_FORM=array` only against the old build; `gl.js` now defaults to string form. — Last verified: 2026-11-15 / ne-4 / GAL-RTMC
- `gl.js` default host was once left on ne-2: always check `NDC_BASE` first. — Last verified: 2026-11-15 / ne-4 / GAL-R4
- Leak check must include `NDC.` and `*Dto` names; the `TargetBranch=` check false-positives on the BUG-10 placeholder text. — Last verified: 2026-11-15 / ne-4 / GAL-R4
- `"FareConfirm"` also matches the PnrReprice step: use `exact: true` in `check_evidence.js`. — Last verified: 2026-11-15 / ne-4 / GAL-R4
- Same-day "round 2" requests when the build has not changed: run a quick delta probe first; if nothing moved, report "no change". — Last verified: 2026-11-10 / ne-4 / GAL-R2

## 6. Cleanup notes

All GAL-R4 holds were cancelled. GAL-R3 holds (expire 2026-12-10) and any unticketed reservations
from failed Book attempts are untouched: listed in the GAL-R3 report Cleanup. **Ask before cancelling.**
GAL-R4 `cleanup_r4.js` cancels only locators in its own state file.

## 7. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| SEAT-R22 | 2026-10-11 | supplier-integration | SeatMap suite, 63 | 21/14/28 | `20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment` |
| GAL-R1 | 2026-11-10 | ne-4 | Availability/Next/Select + FareConfirm, 143 | 107/35/1 | `20261110-123507_Galileo-EGY-Availability-ne4` |
| GAL-R2 | 2026-11-10 | ne-4 | Same, 1 h later | 107/35/1 (identical) | `20261110-131903_Galileo-EGY-Availability-ne4-Round2` |
| GAL-R3 | 2026-11-10 | ne-4 | 143 + 72 edge/booking | 148/65/2 | `20261110-145430_Galileo-EGY-Availability-ne4-Round3` |
| GAL-R4 | 2026-11-15 | ne-4 | 219 incl. cancel cases | 146/71/2 | `20261115-075426_Galileo-EGY-Availability-ne4-Round4` |
| GAL-RTMC | 2026-11-15 | ne-4 | 10 round-trip + multi-city | 4/6/0 | `20261115-104524_Galileo-EGY-RoundTrip-MultiCity-ne4` |

Harness: `NDC_Integration/Harness/Availability/` (engine) + `Availability/Galileo/` (groups, notes, bug lists) — see [../03_Technical/Harness_Guide.md](../03_Technical/Harness_Guide.md).
