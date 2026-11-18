<!--
  Base template for NDC_Integration/Artifacts/Logs/<slug>.md — the generate-qa-report skill's live,
  real-time rendered output. Re-render this ENTIRE file from the run's .jsonl every time a new line
  is appended (see log-schema.md); never hand-append prose to a live .md file directly.

  This is the file to point someone at WHILE the run is still going — plain Markdown, readable by
  opening/tailing the file with no browser needed. It is superseded, once, by the final HTML
  transform (references/report-template.html) at run_end/interruption — this .md keeps existing
  after that too, it just stops being the "current" view once the .html exists.

  Populate it, don't redesign it. Repeat the per-test-case section for each `test_case` line in the
  log, in order. A test case's internal `hops` (if any) nest as an indented sub-list under that same
  section — never render a hop as its own top-level section.
-->

# QA Execution Report — <!-- scope -->Flow #43 — V2, Family B, Hold

<!-- PYRAMID (Output contract O-1, _shared/Output_Contracts.md): Verdict, counts table, Top risks,
     Blockers and Cleanup MUST sit in the first 15 lines of the rendered file. scripts/render-md.js
     produces exactly this block; validate-report.js checks it. Every number is recomputed from ALL
     test_case lines on every render (never accumulated, never counting hops). Defects = distinct
     bugs (one per bug_id, else one per test case). Light: 🔴 any FAIL/defect, 🟡 blocked or
     interrupted, 🟢 all passed, ⏳ nothing logged yet. -->
**Verdict:** 🔴 FAILURES FOUND · **Status:** RUNNING · SUP_A / SUP_A_DEFAULT · build RC-2026.11.3

| Logged | Planned | Pass | Fail | Blocked | Defects | Cleanup |
|---|---|---|---|---|---|---|
| 8 | 12 | 6 | 1 | 1 | 1 | 1 |

**Top risks:** BUG-01 (1 TC): holdExpirationDate returned null in Hold response
**Blockers:** TC-0431: No inventory on the route after two searches
**Cleanup:** 1 live hold/PNR(s) left — see Cleanup

## Run details

<!-- DATA: from run_start (+ run_end, build_change if present) -->
- **Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
- **Supplier:** SUP_A · **Credentials Selector:** SUP_A_DEFAULT
- **Started:** 2026-08-04T14:32:10Z
- **Build:** RC-2026.11.3 (source: user)

## Test case results

<!-- DATA: repeat this block once per `test_case` line, in log order. Never omit a test case even if
     it only got as far as BLOCKED — that's what makes an interrupted run's report still
     trustworthy. Every test case section lists these six fields, always in this order: Endpoint
     Name, Request, Response, Expected, Actual, Status. If the line has a `hops` array (a flow-level
     test case), nest it as the indented "Hops" sub-list shown below, with the same six fields
     repeated per hop; single-endpoint test cases have no hops list. -->

### TC-0412 — FareConfirm price reconciliation for SUP_A

- Endpoint Name: FareConfirm
- Request: `POST /api/v2/FareConfirm` — offerId=&lt;redacted-id&gt;, supplier=SUP_A
- Response: 200 — totalFare=482.00, currency=USD, offerId=&lt;redacted-id&gt;
- Expected (§2.3): 200, price fields reconcile per §2.1 formula
- Actual: 200, totalFare=482.00, matches computed 482.00
- Status: **PASS**
- Evidence: computed 460.00 base + 22.00 tax = 482.00, matches totalFare

<!-- Example of a flow-level test case with nested hop detail (only render the "Hops" sub-list when
     this test case's log line actually has a `hops` array): -->

### TC-0430 — Flow #43 — V2, Family B, Hold

- Endpoint Name: Flow #43 (Search &rarr; FareConfirm &rarr; Book)
- Expected (§6.3): full chain completes, terminal Family-B state reached
- Actual: failed at Book — see hops below
- Status: **FAIL**

Hops (3):
  1. Search — Status: **PASS** — Response: 200, responseId captured — responseId captured
  2. FareConfirm — Status: **PASS** — Response: 200, totalFare=482.00 — price reconciled
  3. Book — Status: **FAIL** — Response: 500, empty body — 500, expected 200 per §2.9

<!-- ... one section per test_case line ... -->

## Findings

<!-- DATA: one entry per `finding` line; if none logged, write "No findings logged yet." instead -->

- **Unknown-resolution** — FareConfirm error shape for expired offerId confirmed as
  `{errorCode:'OFFER_EXPIRED'}` (§2.3, TC-0412)

## Observations

<!-- DATA: one entry per `observation` line (Output contract O-6: free text that is not a verdict,
     defect or number); the whole section is omitted when there are none -->

- **[TC-0430]** The hold expiry is present in Retrieve; ask the team which response should carry it.

## Proposed SPEC.md updates

<!-- DATA: one entry per spec_update_proposed; use the latest line per (section, old_text) for
     status; if none, write "No SPEC.md updates proposed yet." instead -->

- **§2.3 — pending** — Replace: `"Error shape for expired offerId: UNKNOWN"` With:
  `"Error shape for expired offerId: {errorCode:'OFFER_EXPIRED', httpStatus:400}"`

## Cleanup / follow-up

<!-- DATA: one entry per `cleanup` line; if none, write "Nothing left needing cleanup." instead -->

- Family-B hold — PNR `ABC123` (TC-0430) — expires per holdExpirationDate

## Evidence

<!-- DATA: raw evidence links, always last (pyramid O-1) -->
- Source log: [<slug>.jsonl](<slug>.jsonl)
- Guardrail check: [<slug>_evidence.md](<slug>_evidence.md) (written by verify-evidence.js)
- HTML report: [<slug>.html](<slug>.html) (after run_end)
