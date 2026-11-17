# <Supplier> — Supplier Knowledge

> Observed live behaviour and team know-how. Expected behaviour is in SPEC.md §4 — link, don't copy.
> **Every fact ends with `Last verified: <date> / <env> / <run key>`.** Run keys are defined in the
> Run history table at the bottom (key → full slug in `NDC_Integration/Artifacts/Logs/`).
> Re-check any fact older than 14 days or from another host before relying on it.
> Never write here: keys, Client-Id, supplier usernames, passenger names, PNR/locator codes, raw payloads.

**Selectors:** active `<X>` · inactive `<Y>` — Last verified: …
**Hosts used:** `<ne-N>` — see [../03_Technical/Environments.md](../03_Technical/Environments.md)
**Protocol / type:** <NDC / GDS / Navitaire / aggregator>
**Overall status:** <one line: what works, the main blocker>

## 1. Live capabilities

| Endpoint | V1 | V2 | Notes | Last verified |
|---|---|---|---|---|
| Search | | | | |
| FareConfirm | | | | |
| Upselling | | | | |
| GetOfferBundles | | | | |
| AddPassenger | n/a | | | |
| GetAncillary / SeatMap / FareCheck | n/a | | | |
| Book | | | | |
| Hold / PnrReprice / BookAfterHold | | | | |
| CancelAfterHold | | | | |
| Void | | | | |
| Retrieve | | | | |

## 2. Carriers, routes and test data

- <fact> — Last verified: …

## 3. Supplier rules found live

- <fact> — Last verified: …

## 4. Known open defects

Per-run bug IDs — always quote with the run key.

| Run key : Bug | Summary | Severity | Status at last check | Last verified |
|---|---|---|---|---|

## 5. Gotchas (how not to get false results)

- <fact> — Last verified: …

## 6. Cleanup notes

- <where the leftover list lives; never the codes themselves>

## 7. Run history

| Run key | Date | Env | Scope | Result (P/F/B) | Slug |
|---|---|---|---|---|---|
