# Ajet — Supplier Knowledge

> Observed live behaviour and team know-how. Expected behaviour is in SPEC.md §4 and §2.16 — link, don't copy.
> **Every fact ends with `Last verified: <date> / <env> / <run key>`.** No live run exists yet for this
> supplier: facts below come from the feature owner and say so.
> Re-check any fact older than 14 days or from another host before relying on it.
> Never write here: keys, Client-Id, supplier usernames, passenger names, PNR/locator codes, raw payloads.

**Selectors:** unknown. The roster's TestData folder `EGY Ajet` suggests EGY. Ask before a run (CLAUDE.md rule 5).
**Hosts used:** unknown — see [../03_Technical/Environments.md](../03_Technical/Environments.md)
**Protocol / type:** IATA / XML / LCC (SPEC §4.1 row `AJet`)
**Overall status:** One of the three Reissue suppliers (SPEC §2.16). Not yet called by QA.

**Enum name:** `UNKNOWN`. The owner wrote "Ajet"; SPEC §4.1 shows `AJet` and §4.5 lists the TestData folder `EGY Ajet`. Confirm the exact `supplier` value (e.g. with TC-RI-CAP-01) before a run. — Last verified: not yet live

## 1. Live capabilities

| Endpoint | V1 | V2 | Notes | Last verified |
|---|---|---|---|---|
| Hold | ? | ? | SPEC §4.6 row `EGY Ajet`: Hold = Supported; everything else Unknown. | not yet live |
| Booking chain (Search → Book / Hold → Retrieve) | ? | ? | Needed as the arrange chain for Reissue. | not yet live |
| Void | ? | ? | Needed for Reissue cleanup (Q22b). | not yet live |
| **Reissue** (Eligibility, Reshop, Reprice, Exchange) | n/a | Implemented | SPEC §2.16. Details in §3. | owner 2026-11-22, not yet live |

## 2. Carriers, routes and test data

- Routes: unknown. Pick Ajet routes from `Resources/Supplier Routes.md` or a plain V2 Search before a run. — Last verified: not yet live

## 3. Supplier rules (Reissue, from the feature owner 2026-11-22; not yet verified live)

- Eligibility always returns `isChangeable = true`. It does not evaluate the booking yet. — Last verified: not yet live (source: feature owner, 2026-11-22)
- Reshop `passengers` must list every passenger of the booking with the same types and counts. — Last verified: not yet live (source: feature owner, 2026-11-22)
- No passenger split. A split-availability flag will be added later. — Last verified: not yet live (source: feature owner, 2026-11-22)
- Exchange keeps the same PNR and issues new ticket numbers. — Last verified: not yet live (source: feature owner, 2026-11-22)
- Whether Reprice calls the supplier is `UNKNOWN`. — Last verified: not yet live
- Payment and a Reissue Lookup are out of QA scope. — Last verified: owner decision 2026-11-22

## 4. Known open defects

None yet (no run).

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|

## 5. Gotchas (how not to get false results)

- Run the Reissue suite for this supplier on its own. Send nothing to other suppliers (CLAUDE.md rule 4).

## 6. Cleanup notes

- Leftover reissued tickets go in the run report's Cleanup section; never list codes here.

## 7. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
| — | — | — | No run yet | — | — |
