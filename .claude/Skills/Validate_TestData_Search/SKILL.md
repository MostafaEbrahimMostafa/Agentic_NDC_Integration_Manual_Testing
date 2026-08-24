---
name: validate-testdata-search
description: >-
  Validates that every test-data fixture in NDC_Integration/TestData/ can still find live flights,
  by running each file's searchCriteria + passengers through the V2 Search endpoint
  ({baseUrl}api/V2/FlightSearch/Search) for a given supplier + credentialsSelector, and reports
  PASS (HTTP 200 with a non-empty offers[]) or FAIL per file. For every file that fails, it finds a
  replacement search criterion that does return offers — shifting dates first, then borrowing routes
  proven live in the same sweep, then the supplier's rows from
  NDC_Integration/Resources/Supplier Routes.md — and rewrites only that file's origin/destination/
  offsetDays, never its trip shape or passenger mix. Use when asked to check, validate, refresh, fix,
  or re-baseline the TestData search criteria, to find out which fixtures no longer return flights,
  or before a booking regression run that depends on those fixtures being searchable. Search only —
  it never calls Book, Hold, Void, or Cancel.
---

# Validate TestData Search Criteria (V2 Search)

Test-data fixtures rot. A route the supplier dropped, a fare family that sold out, a date that drifted
too close — any of these turns a fixture into a flow that dies at hop 1, and the failure looks like an
API defect when it is really stale test data. This skill separates those two things: it proves each
fixture is still searchable, and where one isn't, it repairs the fixture rather than reporting a bug.

**Search is the only endpoint this skill ever calls.** No booking, holding, voiding, or cancelling —
so unlike `execute-test-cases`, it is safe to point at any environment without an authorization
check. That property is the whole reason this skill is separate; do not extend it past Search.

## Inputs

Ask for whatever isn't given, then hold it constant for the entire sweep:

- **BaseUrl** — e.g. `https://ndc-supplier-integration.azurewebsites.net/`.
- **Supplier** and **CredentialsSelector** — e.g. `AirCairo` / `EGY`. If the user names these, they
  override whatever the fixtures say; otherwise each file's own `supplier`/`credentialsSelector` is
  used.
- **Scope** — default is every `*.json` in `NDC_Integration/TestData/`. A wildcard (`Hold*`) narrows it.

The `x-api-key` is read at run time from
`Postman_Collection/Collection_V2/NDC_Integrations_Staging_Scripts_V2.postman_collection.json` — never
hardcode it into a script, a report, or a commit.

**Scope is the whole folder, not a sample.** Sweep every file in scope, start to finish. A partial
sweep that reports "all green" is worse than no sweep, because it retires a suspicion that was never
actually checked.

## Process

Run the bundled script — it implements every rule below and writes a timestamped CSV/JSON report to
`NDC_Integration/Artifacts/SearchSweep/`:

```powershell
.c\.claude\Skills\Validate_TestData_Search\scripts\Invoke-TestDataSearchSweep.ps1 `
    -BaseUrl https://ndc-supplier-integration.azurewebsites.net/ `
    -Supplier AirCairo -CredentialsSelector EGY -Repair
```

Omit `-Repair` for a read-only sweep that reports failures without touching any file. Run it that way
first if the user hasn't clearly asked for the fixtures to be fixed.

### 1. Sweep

For each file, POST `{baseUrl}api/V2/FlightSearch/Search` with the file's own `searchCriteria`
(each leg's `offsetDays` resolved against today) and `passengers`, `isDebug: false`.

**PASS** = HTTP 200 **and** `offers[]` non-empty. HTTP 200 with `offers: []` is a FAIL — the fixture
is unusable for a booking flow either way, and SPEC.md §2.1 flags exactly this "empty offers vs. 4xx"
ambiguity for an unserved route.

A request that never reaches the service (DNS/socket failure, no status code) is **not** a route
failure — retry it. Recording a network blip as a bad route sends you off rewriting a fixture that
was fine. The script retries such failures up to four times with backoff.

Report each file's verdict as it completes, not in one batch at the end.

### 2. Repair (only with `-Repair`)

For each failing file, try candidates in this order and stop at the first that returns offers:

1. **Shift the whole itinerary** — ±3, 7, 10, 14, 21, 28, 35 days, preserving the gaps between legs.
   Most failures are date-specific, and this is the smallest possible change to the test case.
2. **Borrow a route proven live in this same sweep** — from a file that PASSED with the same leg
   count, keeping the failing file's own dates. Pass-1 successes are empirical evidence of what this
   supplier is actually selling right now, which beats any static route table.
3. **Fall back to `NDC_Integration/Resources/Supplier Routes.md`** — the supplier's documented rows,
   chained out-and-back across the legs.

Two invariants hold across every candidate:

- **Never change the trip shape or the passenger mix.** A 2-leg fixture stays 2-leg; `3 ADT + 3 CHD +
  3 INF` stays exactly that. Those are the variables the fixture exists to exercise — "fixing" a
  fixture by shrinking its passenger count deletes the test rather than repairing it. Only
  `origin` / `destination` / `offsetDays` may change.
- **Never collide with another fixture's criteria.** The suite gets its coverage from fixtures
  differing from each other; two files searching the identical itinerary is one test case, not two.
  The script tracks claimed itineraries and skips a candidate that duplicates one.

Rejected candidates are worth keeping — the script records every attempt in the JSON report. "We
tried DUS-CAI on four dates and the supplier said NO FARE FOUND every time" is a real finding about
the route; a bare "fixed it" hides that.

If **every** candidate fails, leave the file unchanged and report it as **UNRESOLVED**. Do not
invent a route that was never verified, and do not quietly drop the file from the summary — an
unresolved fixture needs a human to decide whether the supplier stopped serving the route.

### 3. Rewrite

Edits go in surgically: only the `origin`/`destination`/`offsetDays` values inside the file's
`searchCriteria` block change. Indentation, key order, and one-line-vs-multi-line style are all
preserved, and files are written UTF-8 without a BOM. Reserializing the whole JSON would work too,
but it reformats every untouched line and buries the one real change in a wall of diff noise.

### 4. Re-verify

After a repair pass, run the sweep once more (no `-Repair`) over the full scope and confirm every
file now passes. A repair verified only by the probe that found it is verified against a candidate,
not against the file that was actually written — the re-sweep is what proves the edit landed
correctly.

## Output

Report live, one file per line, then close with:

- **Summary** — total / passed as-is / repaired / unresolved.
- **A repair table** — per repaired file: old criteria, new criteria, the supplier's stated reason
  for the original failure (`NO FARE FOUND FOR REQUESTED ITINERARY`, `NO ITINERARY FOUND FOR
  REQUESTED SEGMENT n`, `NO FARE FOUND FOR REQUESTED FARE FAMILY`, or empty `offers[]`). The reason
  matters: it tells the next reader whether the route died or just the date.
- **Unresolved files**, each with every candidate tried.
- The report paths under `NDC_Integration/Artifacts/SearchSweep/`.

Interpretation notes worth passing on, not just the counts:

- `NO FARE FOUND FOR REQUESTED FARE FAMILY` / `NO ITINERARY FOUND FOR REQUESTED SEGMENT n` are
  almost always date/inventory problems — the route is fine.
- HTTP 200 with `offers: []` usually means the supplier does not serve the route at all; a date
  shift won't save it.
- A file that needed a route change (not just a date shift) is a signal about the supplier's live
  network, worth mentioning even though the fixture is now green.

## Non-goals

- **Not** a booking/flow runner — it stops at Search. Use `execute-test-cases` to run the fixture
  through FareConfirm → Book/Hold and to validate against SPEC.md.
- Not for authoring new fixtures or test cases — use `generate-test-cases`.
- Not a defect-finder. A fixture that can't find flights is stale test data, not an API bug, unless
  Search itself errors in a way SPEC.md §2.1 doesn't allow (e.g. a 5xx, or a 4xx on a route the
  supplier demonstrably serves) — that one *is* a defect, and belongs in `generate-bug-report`.
- Does not edit SPEC.md. If the sweep confirms something SPEC.md marks `UNKNOWN` — most likely
  §2.1's open question of whether an unserved route returns empty `offers[]` or a 4xx — hand it to
  `update-spec-from-findings` rather than editing the spec here.
