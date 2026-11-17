# Amadeus — Supplier Knowledge

> Observed live behaviour. Expected behaviour: SPEC.md §4 (Amadeus row) and §2.
> Facts end with `Last verified: <date> / <env> / <run key>` (keys in §7). Re-check if older than 14 days.

**What it is:** Amadeus GDS (SOAP back end).
**Selectors:** `EGY` used. — Last verified: 2026-11-01 / ne-3 / AMD-R2
**Hosts used:** `ne-8`, `ne-3`. **Name rules differ between these hosts.**
**Overall status:** Only the V1 passenger-name suite has been run. Hold works; Book returns 500; nothing can be cleaned up via the API.

## 1. Live capabilities (V1, selector EGY)

| Endpoint | Status | Notes | Last verified |
|---|---|---|---|
| Search / FareConfirm | Works | CAI-JED ~69-71 offers; some offers 409 BYP-A0001 at FareConfirm → walk to next offer | 2026-11-01 / ne-3 / AMD-R2 |
| Hold | Works | Name pre-checks run before the supplier (~0.1 s, 400 A0001) | 2026-11-01 / ne-3 / AMD-R2 |
| Book | **500 for any valid booking** (BUG-01) | | 2026-11-01 / ne-3 / AMD-R2 |
| Retrieve | 500 | | 2026-10-29 / ne-8 / AMD-R1 |
| CancelAfterHold | 409 OperationNotSupported | | 2026-10-29 / ne-8 / AMD-R1 |
| V2, Void, enrichment | Not tested | | — |

## 2. Supplier rules found live (passenger names)

**ne-8 rules** (stricter than the requirement text) — Last verified: 2026-10-29 / ne-8 / AMD-R1
- First/last ≤ 25 chars each; passenger string `<first> <TITLE>/<last>(PTC)` ≤ 59 incl. delimiters for every ADT/CHD (ADT+INF pair: 51 content chars accepted, 52 rejected).
- Letters and spaces only (no hyphen/apostrophe); leading/trailing spaces not trimmed; title is an enum checked against gender; middle name unchecked.

**ne-3 rules** (differ from ne-8 — do not assume 25/59) — Last verified: 2026-11-01 / ne-3 / AMD-R2
- **No per-name 25 check** (26-char names reach Amadeus → 200 or 409 ITEM TOO LONG).
- Each name 2-50 letters/spaces; single ADT/CHD string ≤ 57; ADT+INF pair ≤ 51 (message says 57 for same surname, but Amadeus rejects same-surname 52-57 with 409).
- One infant per adult, parent must be ADT; duplicate pax (first+last+birth date) rejected; title must match gender; document name must equal pax name.

## 3. Known open defects

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|
| AMD-R2 : BUG-01 | V1 Book 500 (12/12) | High | Open (also ne-8) | 2026-11-01 / ne-3 / AMD-R2 |
| AMD-R2 : BUG-02/03 | No 25-char check; same-surname 52-57 passes pre-check then 409 | Medium | Open | 2026-11-01 / ne-3 / AMD-R2 |
| AMD-R2 : BUG-04 | Raw SOAP + PII in every 409 body | High | Open | 2026-11-01 / ne-3 / AMD-R2 |
| AMD-R2 : BUG-05 | Same-surname infant missing from Hold echo | Medium | Open (also ne-8) | 2026-11-01 / ne-3 / AMD-R2 |
| AMD-R2 : BUG-06 | ParentPaxRefId ignored | High | Open (also ne-8) | 2026-11-01 / ne-3 / AMD-R2 |
| AMD-R2 : BUG-07/08/09 | Non-ASCII passes pre-check then 409; second 1001 envelope + .NET leak; 10,000-char name echoed twice | Medium | Open | 2026-11-01 / ne-3 / AMD-R2 |

## 4. Gotchas

- Judge messages are wording-specific per host (ne-3 says "The passenger (...) of type CHD has a total length of N"): re-check the judge when the host changes. — Last verified: 2026-11-01 / ne-3 / AMD-R2
- A stale offer (409 BYP-A0001) can hit cached-chain rejection cases: re-run those. — Last verified: 2026-11-01 / ne-3 / AMD-R2
- Transient 409 Z9999 "IGNORE AND RE-ENTER" on first Hold; retry is fine. — Last verified: 2026-10-29 / ne-8 / AMD-R1
- 6 FAIL rows in AMD-R1 are rule-vs-requirement clarifications, not bugs. — Last verified: 2026-10-29 / ne-8 / AMD-R1

## 5. Cleanup notes

**Amadeus holds cannot be cancelled through the API** (CancelAfterHold unsupported, Retrieve/Book 500).
Keep positive Hold cases few. Leftover holds (40 in AMD-R1, 46 in AMD-R2) are listed in each run's Cleanup section.

## 6. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| AMD-R1 | 2026-10-29 | ne-8 | V1 pax-name limits, 99 | 80/19/0 | `20261029-063032_Amadeus-EGY-PaxNameLimits-V1` |
| AMD-R2 | 2026-11-01 | ne-3 | Same + 29 edge, 128 | 86/42/0 | `20261101-143923_Amadeus-EGY-PaxNameLimits-V1-ne3` |
