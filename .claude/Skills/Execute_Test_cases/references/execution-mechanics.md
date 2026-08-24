# Execution mechanics, ID-chaining cheatsheet, and report template

Reference material for the `execute-test-cases` skill. Source of truth for every field/URL/header
below is `NDC_Integration/SPEC.md` §1–§3 — if this file and SPEC.md ever disagree, SPEC.md wins;
update this file to match.

## Headers (every request, both versions)

```
x-api-key: <static staging key from Postman_Collection/Collection_V1 or V2 — do not hardcode
            production values here; pull from the environment/collection file at run time>
Client-Id: NDC-Core
Content-Type: application/json
```

## Base URL and path casing

- Resolve `baseUrl` from `Postman_Collection/Environment/STAG_ENV.postman_environment.json`
  (staging: `https://ndc-integration-stg-ne-3.azurewebsites.net/`) unless the user names a different
  environment explicitly.
- V1 paths have no version segment (`api/FlightSearch/Search`). V2 paths mix `v2`/`V2` casing
  inconsistently across endpoints (SPEC.md §1.2) — use the exact casing SPEC.md §2.*n* gives for
  that specific endpoint; don't normalize it yourself.

## PowerShell request template

```powershell
$headers = @{
  "x-api-key"  = $env:NDC_API_KEY   # resolve from the collection file, not hardcoded here
  "Client-Id"  = "NDC-Core"
}
$body = @{
  supplier            = $Supplier_Name
  credentialsSelector = $Credentials_Selector
  # ...endpoint-specific fields per SPEC.md §2.n
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "$baseUrl/api/FlightSearch/Search" -Method Post -Headers $headers -Body $body -ContentType "application/json"
```

Adjust the path per §2.*n* for each endpoint (V1 vs. V2, and the exact casing given there). For V2
endpoints requiring `ResponseId`/`CredentialsSelector` (PascalCase in places, per §2.2/§2.3's
documented naming inconsistencies) — build the body with the **exact** key casing SPEC.md's
Required Request Fields table shows for that endpoint, not a normalized guess.

## curl equivalent (if running from Bash/WSL)

```bash
curl -s -X POST "$BASE_URL/api/FlightSearch/Search" \
  -H "x-api-key: $NDC_API_KEY" \
  -H "Client-Id: NDC-Core" \
  -H "Content-Type: application/json" \
  -d '{"supplier":"'"$SUPPLIER"'","credentialsSelector":"'"$CRED_SELECTOR"'", ...}'
```

## ID-chaining cheatsheet (condensed from SPEC.md §3.3/§6.2 — confirm there for anything not listed)

| After this call | Capture | Feed into |
|---|---|---|
| Search | `responseId`→`searchResponseId`; `offers[0].offerId`→`offerId` | FareConfirm/Upselling |
| FareConfirm | `responseId`→`fareConfirmResponseId`; `selectedOffer.offerId`→`selectedOfferId` | GetOfferBundles, AddPassenger (V2), Book/Hold (V1 direct) |
| Upselling (V1) | same variable names as FareConfirm (drop-in replacement) | same as FareConfirm |
| Upselling (V2) | `upSellingResponseId`, `upSellingSelectedOfferId` (**distinct** names — must be manually substituted wherever `ResponseId`/`selectedOfferId` is expected next, §2.3) | GetOfferBundles/AddPassenger, treated as FareConfirm's output |
| GetOfferBundles | no reliable auto-captured ID (`JourneyKey1` script bug, §2.4) — carry the chosen bundle **code** manually into `selectedBundles` | Book/Hold/AddPassenger |
| AddPassenger (V2) | `offerId`→`getAddPaxOfferId`; `responseId`→`getAddPaxResponceID` (note the collection's own typo) | GetAncillary, GetSeatMap, Book/Hold (no-enrichment V2 path) |
| GetAncillary (V2) | `offerId`→`ANCofferId`; `responseId`→`ANCresponseId` | FareCheck; ancillary codes feed Book/Hold's `PassengersSelectedAncillaries` |
| GetSeatMap (V2) | nothing auto-captured — copy the chosen `cellCode` by hand | Book/Hold's `PassengersSelectedAncillaries` (Seat category) |
| FareCheck (V2) | `selectedOffer.offerId`→`fareConfirmSelectedOfferId` (overwritten!) and →`fareCheckOfferId` | Book/Hold (enrichment path) |
| Book or Hold | `pnr`, `bookingToken`, `gdsPNR` (+ `holdExpirationDate` if Hold) | Retrieve, FareConfirmAfterHold, BookAfterHold, CancelAfterHold, Void — **unchanged** for the rest of the flow (same-PNR invariant) |

## Report template — emit live, per step, not all at once

Print the header once, at the start of the run, before the first request is even sent:

```
# Execution Report — <scope: endpoint/flow/test-case-file> — <date>
Reporting live: each step below is emitted immediately after it executes and is validated —
this run is not held back and dumped only at the end.
```

Then, **immediately after each individual step/test case finishes executing and is validated**,
emit its block on its own — do not wait for the rest of the steps:

```
### Step N — <endpoint name> (<TC-ID if applicable>)
- Request: <method> <url> — body summary (redact isdebug supplierRequest/supplierResponse per the
  skill's Hard Safety Rules)
- Expected (SPEC.md §2.n / §6.x): <...>
- Actual: <status code, key fields>
- Verdict: PASS / FAIL / BLOCKED
- Evidence: <exact response fields compared>

Running total: N attempted, P passed, F failed, U unknown-confirmed.
```

Repeat that block for every step/test case, right after it happens — never buffer multiple steps and
post them together.

If the run is interrupted (error, timeout, cancellation, safety-rule stop) partway through, stop
here and close immediately with:

```
Run interrupted after step N/M — steps N+1..M did not execute.
```

...then still emit the closing sections below, scoped to only what actually ran.

Once every step in scope has executed (or the run ended early), close out with the one-time,
end-of-run sections — summarizing across everything already reported live, not introducing new
per-step detail:

```
## Findings

- Defects (contradicts a stated SPEC.md fact): <...>
- UNKNOWN-resolutions (new live-confirmed fact, not previously known): <...>

## Proposed SPEC.md updates

- §2.n, replace: "<old UNKNOWN/INFERRED text>" with: "<new confirmed text, with evidence>"
- (repeat per resolved item — apply only after user confirms)

## Cleanup / follow-up

- Family-B (Hold, no finalize) executions this run: <pnr list, for tracking/expiry>
- Bookings left in a state needing Void/Cancel: <...>
```
