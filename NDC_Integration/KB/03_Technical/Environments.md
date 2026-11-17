# Environments

All hosts below are Azure deployments of the same API, but **each can run a different build** and
the same supplier can behave differently on each (e.g. Amadeus name rules on ne-3 vs ne-8,
AirIndia inventory on ne-3 vs supplier-integration). Always record the host in the run slug.
Run keys in `Last verified` (e.g. `SAB-VU2`) are defined in each supplier file's Run history.

Canonical staging (the one the Execute skill treats as "staging") = the `baseUrl` in
`Postman_Collection/Environment/STAG_ENV.postman_environment.json`.

## Host list

| Short name | Base URL | Treated as | Used for (last runs) | Last verified |
|---|---|---|---|---|
| `ne-3` | `https://ndc-integration-stg-ne-3.azurewebsites.net/` | **Staging (STAG_ENV default)** | TravelportNdc, SabreNdc Void/VoidUnified, Amadeus R2, AirIndia | 2026-11-05 / ne-3 / SAB-VU2 |
| `stg-ne` (no number) | `https://ndc-integration-stg-ne.azurewebsites.net/` | Staging | AirArabiaPlus bug verification | 2026-11-16 / stg-ne / AAP-XLSX |
| `ne-1` | `https://ndc-integration-stg-ne-1.calmplant-96dd21b3.northeurope.azurecontainerapps.io/` | Staging (container app) | AirArabiaPlus BUG-18 verify; Search ~20 s | 2026-11-11 / ne-1 / AAP-BUG18 |
| `ne-2` | not recorded | Staging | Once the Galileo `gl.js` default (stale) | — |
| `ne-4` | `https://ndc-integration-stg-ne-4.azurewebsites.net/` | Staging | Galileo Availability rounds | 2026-11-15 / ne-4 / GAL-R4 |
| `ne-5` | `https://ndc-integration-stg-ne-5.azurewebsites.net/` | Staging | TravelportNdc Void rounds | 2026-10-27 / ne-5 / TPN-VOID2 |
| `ne-6` | `https://ndc-integration-stg-ne-6.azurewebsites.net/` | Staging | AirArabiaPlus regression (env file `AirArabiaPlus_USA_ne6`) | 2026-11-09 / ne-6 / AAP-ONEAPI |
| `ne-7` | `https://ndc-integration-stg-ne-7.azurewebsites.net/` | Staging | SabreNdc Availability | 2026-11-12 / ne-7 / SAB-AV2 |
| `ne-8` | `https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/` | Staging | Amadeus R1 | 2026-10-29 / ne-8 / AMD-R1 |
| `supplier-integration` | `https://ndc-supplier-integration.azurewebsites.net/` | **NOT staging** — Book/Hold/Void only with explicit authorization per run | AirIndia R2, SeatMap R21/R22 | 2026-11-02 / supplier-integration / AI-R2 |
| `supplier-integration-staging` | `https://ndc-supplier-integration-staging.azurewebsites.net/` | Alternate staging (user-confirmed 2026-08-05) | TravelportNdc V1 2026-08-05 | 2026-08-05 / — / TPN-V1 |

The same x-api-key worked on every staging host listed. It is read from the git-ignored `.env`
(`NDC_API_KEY`, see `.env.example`) — never copy it anywhere else.

**Host availability check 2026-11-17:** `ne-3` and `ne-6` answered HTTP 503 (HTML page) to every
request, even with a wrong key = host down, not an auth result. `stg-ne` answered normally
(AirArabiaPlus/USA Search 200, wrong key 401).

## How to point tools at a host

| Tool | How |
|---|---|
| Postman | Select/clone `STAG_ENV`, change `baseUrl` |
| Node harness (`Harness/V2/lib.js` and per-supplier folders) | `NDC_BASE=<url>` env var. **Default is ne-3** for `lib.js`, **ne-6** for `AirArabiaPlus/core.js`. Always set it explicitly. |
| PowerShell V1 harness | `Start-NdcRun -EnvKey STAG` (or `SUPPLIER_STG`); hosts in `NdcV1.Extracted.ps1` |
| Skills | Give the host in the prompt ("Environment: <url>") |

## Selectors per supplier (summary)

| Supplier | Active | Inactive / 400 |
|---|---|---|
| TravelportNdc | UAE, EGY | KSA |
| SabreNdc | EGY | UAE, KSA |
| AirIndia | EGY | UAE, KSA |
| AirArabiaPlus | USA | others untested |
| Galileo, Amadeus, FlyAdeal | EGY (only one tested) | — |
| GulfAir | KSA (only one tested) | — |

Details and dates: the supplier files.

## Environment behaviours to expect

- **Deployments happen without notice, even mid-run** (2026-11-05 ne-3: ~20 s of HTTP 500, then new behaviour). See Lessons L-04.
- **Cold start:** first Search after idle can take up to 120 s (SabreNdc V2, ne-3, 2026-10-25).
- **Capacity:** about 4-6 parallel chains max on ne-3; more gives 409 "Too Many Requests" and 500 bursts.
- **Holds and tickets are real at the supplier**, on every host.
