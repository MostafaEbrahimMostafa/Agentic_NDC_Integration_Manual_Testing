# OmanAirV17 — Supplier Knowledge

> Observed live behaviour and team know-how. Expected behaviour is in SPEC.md §4 and §2.16 — link, don't copy.
> **Every fact ends with `Last verified: <date> / <env> / <run key>`.** No live run exists yet for this
> supplier: facts below come from the feature owner or the Re-Issue Postman collection and say so.
> Re-check any fact older than 14 days or from another host before relying on it.
> Never write here: keys, Client-Id, supplier usernames, passenger names, PNR/locator codes, raw payloads.

**Selectors:** `EGY` in the Re-Issue collection environment — Last verified: not yet live (source: `Postman_Collection/Re-Issue` environment, 2026-11-22)
**Hosts used:** `stg-ne-2` in the Re-Issue collection environment — see [../03_Technical/Environments.md](../03_Technical/Environments.md)
**Protocol / type:** IATA / XML / LCC (SPEC §4.1)
**Overall status:** First Reissue supplier (V2 Eligibility → Reshop → Reprice → Exchange). Not yet called by QA.

**Enum name:** use `OmanAirV17`. SPEC §4.5 flags the `OmanAirV17` / `OmainAir` name mismatch; the Re-Issue collection uses `OmanAirV17`. TC-RI-CAP-02 confirms which values are accepted. — Last verified: not yet live (source: collection, 2026-11-22)

## 1. Live capabilities

| Endpoint | V1 | V2 | Notes | Last verified |
|---|---|---|---|---|
| Search / FareConfirm / AddPassenger / Book / Hold / BookAfterHold / Retrieve | ? | ? | Used as the arrange chain for Reissue (Family A / D). | not yet live |
| Void | ? | ? | SPEC §4.6 lists Oman Air Void = Supported; Reissue cleanup depends on it (Q22b). | not yet live |
| **Reissue** (Eligibility, Reshop, Reprice, Exchange) | n/a | Implemented | SPEC §2.16. Details in §3. | owner 2026-11-22, not yet live |

## 2. Carriers, routes and test data

- Routes from `Resources/Supplier Routes.md`: MCT–DXB, AMD–CAI, AUH–ADL. The Re-Issue collection sample uses DXB→MCT. — Last verified: not yet live (source: Supplier Routes.md, collection)
- Reissue test cases: `NDC_Integration/TestCases/Reissue/` (OmanAirV17 is the default supplier). — Last verified: 2026-11-22 (suite update, no run)

## 3. Supplier rules (Reissue, from the feature owner 2026-11-22; not yet verified live)

- Eligibility always returns `isChangeable = true`. It does not evaluate the booking yet, so Reshop/Exchange must reject ineligible bookings. — Last verified: not yet live (source: feature owner, 2026-11-22)
- Reshop `passengers` must list every passenger of the booking with the same types and counts. — Last verified: not yet live (source: feature owner, 2026-11-22)
- No passenger split. A split-availability flag will be added later. — Last verified: not yet live (source: feature owner, 2026-11-22)
- Exchange keeps the same PNR and issues new ticket numbers. — Last verified: not yet live (source: feature owner, 2026-11-22)
- `INFERRED` (collection): Reprice makes no supplier call for OmanAirV17, so Reprice should return the Reshop offer's price. A supplier price change can only show up at Exchange. — Last verified: not yet live (source: collection Reprice description, 2026-11-22)
- Payment and a Reissue Lookup are out of QA scope. — Last verified: owner decision 2026-11-22

## 4. Known open defects

None yet (no run).

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|

## 5. Gotchas (how not to get false results)

- In the Re-Issue collection, Reshop builds `passengers` from `adtCount` / `chdCount` / `infCount`, which Search writes from its own body. For a PNR booked outside the run, set those three values to the booking's passengers first. Otherwise Reshop is rejected for a passenger mismatch. — Last verified: 2026-11-22 (collection script, simulated locally, not run live)
- Every reissue leaves a reissued ticket behind. Void it the same day (Analysis Q22b). — Last verified: owner answer 2026-11-17

## 6. Cleanup notes

- Leftover reissued tickets go in the run report's Cleanup section (CLAUDE.md rule 8); never list codes here.

## 7. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| — | — | — | No run yet | — | — |
