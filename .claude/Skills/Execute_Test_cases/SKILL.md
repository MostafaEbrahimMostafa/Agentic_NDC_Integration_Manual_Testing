---
name: execute-test-cases
description: >-
  Executes manual/API test cases for the NDC Integration API against the live host the user names
  (never a silent default), using the Postman collections (Postman_Collection/Collection_V1/,
  Collection_V2/) and the per-supplier harnesses as the request source and NDC_Integration/SPEC.md
  as the validation source of truth. Two run modes: harness mode (one TC-ID at a time, full
  evidence) and Postman MCP mode (runs a named Postman collection through the `postman` MCP server,
  setup in NDC_Integration/KB/03_Technical/Postman_MCP_Guide.md). Follows the pipeline in
  NDC_Integration/KB/03_Technical/Execution_Pipeline.md. Captures actual results, compares
  against SPEC.md's expected responses/state rules, and reports pass/fail with evidence. Logs
  previously-`UNKNOWN` facts confirmed live as pending SPEC proposals and hands them to
  update-spec-from-findings at the end. Use when asked to run, execute, or replay a test case, an endpoint call, a
  flow number, or a smoke/regression pass, and to report results. Not for writing new test cases from
  scratch — use the generate-test-cases skill for that.
---

# Execute Test Cases — Senior QA Solution Architect (Airline NDC APIs)

You are executing test cases against a real NDC Integration API deployment the
way a Senior QA Solution Architect would: safely, with every request and response traceable back to
the SPEC.md rule it's checking, and with a clear, evidence-backed pass/fail verdict — never a
guessed one.

## Pipeline — follow these steps in order

This skill implements [`NDC_Integration/KB/03_Technical/Execution_Pipeline.md`](../../../NDC_Integration/KB/03_Technical/Execution_Pipeline.md)
(diagrams there). Each step is detailed below; do not skip or reorder them.

| # | Step | Where in this file |
|---|---|---|
| P0 | Check the request: supplier, host, selector, version, scope, **run mode** | [Before execution](#before-execution) |
| P1 | Confirm this is the right skill (else route to `Retest_Issues` / `Validate_TestData_Search`) | [Before execution](#before-execution) |
| P2 | Read the sources (SPEC, KB supplier file, Environments.md, `.env`; MCP mode: the Postman collection + environment) | [Before execution](#before-execution) |
| P3 | Safety checks (MCP mode adds M1-M3) | [Hard safety rules](#hard-safety-rules--read-before-sending-anything), [Postman MCP mode](#postman-mcp-mode) |
| P4 | Pick the run slug; open the run log with `generate-qa-report` → `Logs/<slug>.jsonl` + live `<slug>.md` | Process step 0 |
| P5 | Run the test cases. Harness mode: one TC-ID at a time. MCP mode: one `runCollection` call, then one `test_case` line per folder (M4-M6). `generate-qa-report` appends each verdict and re-renders `<slug>.md` | Process steps 1-7, [Postman MCP mode](#postman-mcp-mode) |
| P6 | End test execution: `"Test Execution"` phase end, final `.md` re-render, defect gate (`verify-evidence.js`) | [After execution](#after-execution) |
| P7 | **Bug reports** (skill [`Generate_Bug_Report`](../Generate_Bug_Report/SKILL.md)) for **FILE** defects → `BugReports/<slug>/BUG-NN_<API>_<FIELD>/` (report `.md` + `requests-responses/`) + `README.md` index + registry row (`NDC-BUG-nnnn`) | [After execution](#after-execution) |
| P8 | **QA Report (HTML)**: append `run_end`, then `generate-qa-report` renders `Logs/<slug>.html` + `<slug>_TimeBreakdown.html`; `validate-output.js` on each | [After execution](#after-execution) |
| P9 | Summary to the user, with the path of the HTML report | [After execution](#after-execution) |
| P10 | SPEC and KB follow-up (`update-spec-from-findings`) | [After execution](#after-execution) |

### Run slug — one name for every output

This skill picks the slug **once, at P4**, and every other skill in the run uses it unchanged:

```
YYYYMMDD-HHMMSS_<Supplier>-<Selector>-<Scope>[-RoundN]-<env>
e.g. 20261122-101500_SabreNdc-EGY-Void-ne-3
```

- The timestamp is the run start. `<Scope>` is the test-case file basename without `TestCases_`
  and `.csv`, the flow (`Flow-43`), or the endpoint (`Search-Smoke`). Add `-RoundN` for a re-run of
  the same scope.
- Pass it to `generate-qa-report` as the slug to use. It replaces that skill's default
  `<YYYYMMDD-HHMMSS>_<scope-tag>` form, so `Logs/<slug>.jsonl`, `.md`, `.html` and
  `_TimeBreakdown.html` all carry it.
- Pass the same slug to `generate-bug-report`, so bugs land in `Artifacts/BugReports/<slug>/`, and use
  it when quoting per-run ids (`<slug>:BUG-NN`).
- Never re-timestamp or rename mid-run, including after an interruption.
- MCP mode: `<Scope>` is the CSV scope as above plus `-PM` (e.g. `20261122-153000_SabreNdc-EGY-V2-PM-ne-3`).

## Before execution

**P0. Check the request.** These slots are required (CLAUDE.md rule 5):

| Slot | Example |
|---|---|
| Supplier | `SabreNdc` |
| Host | `ne-3` (resolved via `KB/03_Technical/Environments.md`) |
| credentialsSelector | `EGY` |
| Version | `V1`, `V2`, or `V1 and V2` |
| Scope | a CSV, flow numbers, TC-IDs, or a category; **or** a Postman collection (+ environment) |
| Run mode | `harness` or `postman-mcp` (rule below) |

Run mode:

| The scope is | Mode | Why |
|---|---|---|
| A test-case CSV, TC-IDs, flow numbers, a category | **harness** | One verdict and full request/response evidence per TC-ID (rules 7, 11) |
| A test-case CSV **run through a named Postman collection**, or the user says "via MCP" / "run the collection" | **postman-mcp** | One `runCollection` call, results mapped to the CSV's TC-IDs; see [Postman MCP mode](#postman-mcp-mode) |
| Unclear | ask | Never pick a mode silently |

In harness mode the Postman MCP server may still be used read-only (`getCollection`) as the request
source, instead of the local `Postman_Collection/` copy, when the user says the cloud collection is newer.

If any slot is missing, apply `optimize-prompt` (or ask directly). Never fill it from
`STAG_ENV.postman_environment.json` or a previous run. Reuse the answers for the rest of the session.

**P1. Confirm the skill.** A request to re-test known bugs, ADO ids, or a bug sheet goes to
`retest-issues`. A request to check whether fixtures still find flights would go to
`validate-testdata-search`, which is unavailable since 2026-11-22 (no `TestData/` fixtures): tell the user. Everything else (a test-case CSV, flow numbers, an endpoint, a smoke or
regression pass) stays here.

**P2. Read the sources** before sending anything:

| Source | Use |
|---|---|
| `NDC_Integration/SPEC.md` | The oracle: §2 endpoints, §4 suppliers, §5 flows, §6 validation |
| `NDC_Integration/KB/02_Suppliers/<Supplier>.md` | Live capabilities, routes, known bugs, gotchas, whether parallel calls are safe |
| `NDC_Integration/KB/03_Technical/Environments.md` | Base URL for the host |
| Repo-root `.env` (`NDC_API_KEY`) | API key. Never printed or committed. If `.env` is missing, ask the user |
| `NDC_Integration/Artifacts/Registry/Bug_Registry.csv` | Known open defects for this supplier, so a FAIL is matched to an existing `NDC-BUG-nnnn` |

A KB fact older than 14 days, or verified on a different host than the one under test, is re-checked
live before you rely on it.

## Hard safety rules — read before sending anything

1. **Never call Book, BookAfterHold, Void, or CancelAfterHold against a non-staging host**
   without explicit, in-conversation authorization from the user for that specific run. Decide
   whether the host is staging from `KB/03_Technical/Environments.md`;
   `ndc-supplier-integration` is **not** staging. If unsure, stop and ask —
   per SPEC.md §2.9's Testing Note, this is the highest-blast-radius action in the entire API
   surface (real PNR/ticket creation).
2. **Never print or save raw `supplierRequest`/`supplierResponse` fields** (returned when
   `isdebug: true` on Search) into shared/committed output — SPEC.md §7.14 documents these as
   containing live supplier credentials in plaintext. Redact them in any report; only inspect them
   in-session if the specific test case requires it.
3. **Treat Family-B flow executions as leaving a live Held booking behind** (SPEC.md §6.3) — log the
   resulting `pnr` in the execution report so the team can clean it up or let it expire, per the
   test-hygiene note.
4. If a test case's scope is ambiguous (which supplier, which environment, which credentialsSelector,
   which version) do not default silently — ask, then reuse the answer for the rest of the session.
5. **Supplier-only scope** (CLAUDE.md rule 4): a run for supplier X sends nothing to other
   suppliers. Rows that need another supplier are `BLOCKED (out of scope)`. Suites designed
   cross-supplier (e.g. `VoidUnified_TestCases.csv`) need the user's confirmation first.
6. **Sequential calls** (rule 9) unless the supplier's KB file says parallel is safe.

## Postman MCP mode

Runs a whole Postman collection through the `postman` MCP server (`.mcp.json`). Setup, IDs and
troubleshooting: [`KB/03_Technical/Postman_MCP_Guide.md`](../../../NDC_Integration/KB/03_Technical/Postman_MCP_Guide.md).
Steps P0-P2 and P4, P6-P10 are the same as harness mode; M1-M6 replace the per-TC loop (P3 + P5).

| # | Step | Tool / action |
|---|---|---|
| M1 | **Connection.** Call `getAuthenticatedUser`. A 401 stops the run: tell the user to fix the key and reconnect with `/mcp` (guide §7). | `getAuthenticatedUser` |
| M2 | **Resolve IDs.** Collection **UID** (`<owner>-<uuid>`) and environment id, from the user or by listing (`getWorkspaces` → `getCollections` / `getEnvironments`). Confirm the names with the user before running. | read-only tools |
| M3 | **Safety pre-flight** (P3). `getEnvironment`: read `baseUrl`, `Supplier_Name`, `Credentials_Selector` only, never print `x_api_key` or other secret values. Stop and ask if: the environment is a `Production` one or the host is not staging (`Environments.md`) and the collection contains Book / BookAfterHold / Void / CancelAfterHold (check with `getCollection`); `Supplier_Name` / selector differ from P0 (rule 4); another collection run is already in progress (rule 9). Never change a shared environment (`putEnvironment`) to switch supplier; ask the user. | `getEnvironment`, `getCollection` |
| M4 | **Map the test cases to the collection.** The test cases are part of the collection run: the scope is a **test-case CSV + the collection that executes it** (ask for the CSV if only a collection was named). `getCollection` (lightweight map), then map every CSV row (TC-ID) to the folder / request(s) that execute it, by flow number, endpoint and title (`Steps / Endpoint Chain`). Show the mapping table to the user and get a confirmation before running: rows with no matching request are `BLOCKED (not in collection)`; folders with no CSV row are run but logged as `observation` lines, never counted. Log `run_start` with `total_test_cases_planned` = number of CSV rows in scope, `csv_file`, `build`, and the collection UID + environment name in the scope text. | `getCollection` |
| M5 | **Run once.** `runCollection(collectionId, environmentId, stopOnError: true when the collection books, requestTimeout: 120000 for Galileo/Sabre)`. Requests run sequentially in collection order. Save the returned result (redacted: no `x-api-key`, no `supplierRequest`/`supplierResponse`) as the raw capture `NDC_Integration/Artifacts/Logs/<slug>_mcp-run.json` and cite it in `evidence_refs`. | `runCollection` |
| M6 | **One `test_case` line per CSV row (TC-ID)**, hops = its mapped requests (status, test results). Judge against the row's `Expected Result` and `SpecReference` (the oracle), not only the Postman tests: PASS = every mapped request returned and the expected result holds; FAIL = it does not; BLOCKED = request not reached (run stopped earlier), not in the collection, or no inventory after a re-check. A "Both" row needs a V1 and a V2 collection run (rule 6). Log every Hold/PNR the run created as cleanup (rule 8). | `generate-qa-report` |

Rules specific to MCP mode:

- **Expectation source.** The CSV row's `Expected Result` + `SpecReference` is the expectation
  (`expectation_source:"SPEC"` with the verbatim `expectation_quote`). A Postman test script on its
  own is not SPEC: a FAIL that only a collection test reports is `expectation_source:"INFERRED"`
  and is a question for the user, never a defect.
- **Evidence for defects.** If the `runCollection` result does not hold the full response body
  needed by the defect gate (G-1, double repro), reproduce the FAIL with the harness (or a
  `Retest_Issues` recipe) before logging `finding kind:"defect"`. No defect is filed on a
  pass/fail count alone.
- **No partial runs through MCP.** `runCollection` has no folder filter. To run one folder, use a
  trimmed copy of the collection (with the user's OK) or harness mode.
- **Not a load test.** `iterationCount` stays 1.

## AI guardrails — [`../_shared/AI_Guardrails.md`](../_shared/AI_Guardrails.md) (always apply)

- **Build:** put `build` in `run_start` (RC label, host-exposed version, or
  `{"label":"not exposed","source":"unknown"}`). If behaviour changes mid-run, append a `build_change`
  line (G-4c, KB L-04).
- **Evidence on every verdict (G-1):** each `test_case` carries `evidence_refs[]` (saved response +
  JSON path + operator) and `spec_ref`. Cite the raw capture when the log copy is truncated. An
  absence claim also lists `also_checked`.
- **Code compares (G-2):** price sums, cross-step equality and counts come from code (`Test-NdcPrice`,
  `equalsStep` refs, a script), never from prose arithmetic.
- **Label the expectation (G-3):** every FAIL carries `expectation_source` = `SPEC` (with a verbatim
  `expectation_quote`), `LIVE-CONFIRMED` (with `expectation_cite`) or `INFERRED`. A FAIL against an
  `INFERRED` expectation is a question for the user, never a defect.
- **Before logging a `finding kind:"defect"` (G-2, G-4b):** reproduce it a second time (fresh
  Search) and list both runs in `repro.records`; get a fresh-sub-agent second opinion with
  [`../_shared/second-opinion-prompt.md`](../_shared/second-opinion-prompt.md) and copy its answer into
  `second_opinion`. These two steps are for defects only, not for every PASS.
- **At close-out:** run `node .claude/Skills/_shared/scripts/verify-evidence.js <log>.jsonl` and
  report its gate table. Only **FILE** defects go to `generate-bug-report`. Raise QUESTION and
  NEEDS-HUMAN items with the user.

## Output contract — [`../_shared/Output_Contracts.md`](../_shared/Output_Contracts.md) (always apply)

- Every line you hand to `generate-qa-report` must match `run-log.schema.json` (fields in
  `Generate_QA_Report/references/log-schema.md`). Truncate bodies to the size budget before logging (O-3).
- Running totals you state in chat come from the rendered report or a script, never from your own
  count (O-2). Free-text notes that are not verdicts go in `observation` lines (O-6).
- At run end, `node .claude/Skills/_shared/scripts/validate-output.js NDC_Integration/Artifacts/Logs/<slug>.jsonl`
  must pass before the run is reported done. A contract error is fixed by appending corrected lines,
  never by editing earlier lines.

## Inputs

- A test case (or set) from `NDC_Integration/TestCases/` (produced by `generate-test-cases`), **or**
  an ad hoc request to run a specific endpoint (SPEC.md §2) or flow number (SPEC.md §5.4) directly,
  **or** a Postman collection + environment for [Postman MCP mode](#postman-mcp-mode).
- The target host, `Supplier_Name`, `Credentials_Selector` and version, all from P0. The base URL
  comes from `KB/03_Technical/Environments.md`; there is no default host.
- If the flow's required capability (SPEC.md §4.6) is `Unknown`/`Conditional` for the chosen
  supplier, run the §4.7 capability-confirmation procedure (Search + FareConfirm, inspect the live
  `haveBundles`/`canBeHeld`/`offerHasAncillary`/`isSeatMapRequired` flags) **before** attempting the
  rest of the flow, and report that result even if the caller didn't explicitly ask for it.

**Scope is the whole file/batch, not a sample.** When the input names a test-case file (or a flow's
full set of test cases), execute every row/test case in that scope, in order, start to finish — never
silently stop after a handful "to check in," summarize the rest as untested, or cherry-pick a subset
unless the user explicitly asked for a partial run (e.g. "just the negative cases," "TC-0412 only").
The only things allowed to end a run before the full scope is covered are: a hard safety-rule stop
(above), an unrecoverable error, or the user cancelling — all of which are already handled as an
"interrupted" run, not a deliberate early stop.

## Process

0. **(P4) Open this run's disk artifacts before sending the first request.** Apply the `generate-qa-report`
   skill to create `NDC_Integration/Artifacts/Logs/<slug>.jsonl`/`.md` for this run (scope,
   environment, start time, `build`), using the slug from
   [Run slug](#run-slug--one-name-for-every-output). This is the durable, real-time mirror of everything this skill reports
   in-conversation, and it must exist before step 1 sends anything, not be assembled after the fact.
   The companion `.html` doesn't get built until the run finishes or stops (see that skill). Emit a
   `phase` start line (log-schema.md) — `"Initialization"` ends / `"Test Execution"` starts — right
   here, using the standardized timestamp command in
   [references/execution-mechanics.md](references/execution-mechanics.md#timing-capture-for-the-execution-time-breakdown-page).
   If this run also did user-story analysis or test-case generation earlier in the same conversation,
   that's a separate phase/`ai_operation` already outside this skill's own scope — don't re-timestamp it
   here.
1. **Resolve the request.** For each step, build the exact request per SPEC.md §2.*n* (URL — mind
   the V1/`v2`/`V2` path-casing differences in §1.2 — headers per §1.5, required/optional body
   fields). See [references/execution-mechanics.md](references/execution-mechanics.md) for
   ready-to-run PowerShell/curl templates and the full ID-chaining cheatsheet. **Capture `started_at`**
   (the timing command above) right before building this test case's (or this hop's) first request —
   this is the moment work on it begins, and becomes that test case's/hop's `started_at` in the JSONL.
2. **Send it**, capture the raw status code, headers, and body verbatim. If a retry, backoff, or
   polling wait genuinely happens here (not the normal case), capture its own start/end timestamps too
   — this becomes a `waiting_ms` value (or a top-level `wait` line, per log-schema.md) for this test
   case, never a guessed value when nothing was actually captured.
3. **Extract IDs** the response is documented to produce (SPEC.md §2.*n* "IDs Generated" / §6.2
   propagation table) and carry them into the next step exactly as SPEC.md's chaining rules specify
   — including the version-specific field-name differences (`searchResponseId` vs `ResponseId`,
   `fareConfirmResponseId`→AddPassenger's IDs superseding it in V2, etc., §2.2/§2.5).
4. **Validate** the response against:
   - The endpoint's Expected Success Response shape and Response Validation Rules (SPEC.md §2.*n*).
   - The price-reconciliation formula (SPEC.md §2.1) wherever pricing is returned — compute it
     yourself and compare, don't assume the API enforces it (V2 doesn't script-check most of these,
     per SPEC.md's version-difference notes).
   - The flow's terminal-family and enrichment state checks (SPEC.md §6.3/§6.4) if executing a flow.
   - The specific assertion named in the test case, if one was supplied.

   Loop rules (P5):
   - The counted unit is **one TC-ID**. Hops inside a flow are nested detail, never counted.
   - One empty `offers: []` is not proof of no inventory. Re-check (another date/route from the
     supplier KB file) before marking a row `BLOCKED`.
   - A "Both" row passes only if V1 and V2 both pass.
   - Every hold or PNR the test case leaves open is logged as a cleanup item right away.
5. **Record and report pass/fail per step immediately after executing it — never batch results and
   report only at the end.** As soon as a step's response is validated, emit its full step block
   (per the Output template) to the user before sending the next request. This matters distinctly
   from per-flow reporting: a failure at hop 3 of an 8-hop flow is a distinct, more diagnostic
   finding than "flow #43 failed," and it must surface the moment it's known. Reporting only at the
   very end is misleading if execution gets interrupted partway through — the user would otherwise
   see nothing at all, or a report that silently drops the steps that never ran, instead of the
   accurate partial picture of what actually executed. **Capture the end timestamp** the moment the
   verdict is reached — for a single-endpoint case this becomes its `timestamp`; for a flow hop it
   becomes that hop's `ended_at`, and the last hop's `ended_at` becomes the parent test case's
   `timestamp`. If execution is interrupted before a verdict is reached, still hand this test case's
   partial timing to `generate-qa-report` (`timing:"partial"`, per log-schema.md) rather than omitting
   it or writing `0` — per this skill's own error-handling expectations.
6. **When a result confirms something SPEC.md marks `UNKNOWN`** (an error response shape, an
   enum value, an ID TTL, a capability conflict from §4.4, a flow-anomaly resolution from §5.5),
   don't just note it in the report — log a `spec_update_proposed` line (`status: pending`) with the
   exact SPEC.md edit (section, old text, new text), per SPEC.md's own Appendix policy that
   confirmed facts should be folded back promptly. Do not edit SPEC.md during the run; the pending
   proposals are decided in P10 by `update-spec-from-findings`. When this involves real, separate analysis
   beyond the one test case that triggered it (e.g. the §4.7 capability-confirmation procedure, or
   reasoning across several results to propose one spec change), bracket that analysis with its own
   `ai_operation` start/end timestamps (log-schema.md) — this is Claude/AI Processing time distinct
   from any one test case's own execution span.
7. **When a result contradicts SPEC.md** (not an `UNKNOWN` being resolved, but an actual mismatch
   with a stated fact), report it as a defect/finding distinctly from an `UNKNOWN`-confirmation —
   these have different implications (one is new information, the other is a regression or a wrong
   assumption in the spec) and should never be conflated in the report. A contradiction becomes a
   `defect` only when the expectation is `SPEC` or `LIVE-CONFIRMED` and the guardrail gate passes
   (AI guardrails above). Otherwise log it as a FAIL with `expectation_source:"INFERRED"` and ask.
   If the FAIL matches an open `NDC-BUG-nnnn` from P2, cite that id instead of treating it as new.

## After execution

**P6. End test execution.** Append the `"Test Execution"` `phase` end line and re-render the `.md`.
Then run the defect gate:
`node .claude/Skills/_shared/scripts/verify-evidence.js NDC_Integration/Artifacts/Logs/<slug>.jsonl`.
QUESTION and NEEDS-HUMAN items go to the user; only **FILE** defects go on to P7.

**P7. Bug reports.** `generate-bug-report` (same `<slug>`, own `"Bug Reporting"` phase) writes one
folder per FILE defect under `NDC_Integration/Artifacts/BugReports/<slug>/` and adds the
`Bug_Registry.csv` row through `NDC_Integration/Harness/Retest/registry.js` (`NDC-BUG-nnnn`). Never
edit the registry by hand. No FILE defects: skip to P8.

**P8. QA Report (HTML).** Only now append `run_end` (`complete`, or `interrupted` with
`interrupted_after_tc` / `of_total`), so the report includes the defects from P7. Then
`generate-qa-report` (its `"Report Generation"` phase) renders, from the JSONL:

| Output | Script |
|---|---|
| `NDC_Integration/Artifacts/Logs/<slug>.md` (final) | `node .claude/Skills/Generate_QA_Report/scripts/render-md.js <slug>` |
| `NDC_Integration/Artifacts/Logs/<slug>.html`: the QA report to share | `node .claude/Skills/Generate_QA_Report/scripts/render-html.js <slug>` |
| `NDC_Integration/Artifacts/Logs/<slug>_TimeBreakdown.html` (when timing data exists) | `node .claude/Skills/Generate_QA_Report/scripts/render-tb.js <slug>` |
| XLSX / DOCX | only when the user asks |

`node .claude/Skills/_shared/scripts/validate-output.js <file>` must pass on every output before the
run counts as done. An interrupted run still gets its HTML from whatever the JSONL holds.

**P9. Summary to the user**, in this order, with every number taken from the rendered report or a
script:

1. Verdict and counts (PASS / FAIL / BLOCKED)
2. Defects: per-run `BUG-NN` with the run slug, plus `NDC-BUG-nnnn`
3. Blocked rows and why
4. **Cleanup**: every live hold / PNR left behind
5. Links: `Logs/<slug>.html`, `<slug>_TimeBreakdown.html`, `BugReports/<slug>/`

**P10. SPEC and KB follow-up.** If the run logged any pending `spec_update_proposed` lines, apply
`update-spec-from-findings`: it shows each old → new diff, applies or declines it on the user's
answer, then proposes KB updates. No SPEC or KB edit happens without approval.

## Output

Report live, one step (or one test case, for a batch) at a time — never accumulate results silently
and dump a single report only after everything has finished executing.

- The moment a step's actual result is captured and validated against SPEC.md, emit that step's full
  block (per the template in
  [references/execution-mechanics.md](references/execution-mechanics.md)): request sent (redacted
  per the safety rules above), expected vs. actual, verdict, and evidence — *then* move on to the
  next request. Do this even mid-flow, mid-test-case-file, or mid-batch.
- After each emitted step, restate a running summary line (steps attempted so far, pass/fail/unknown
  counts) so the user always has an up-to-date total, not just a final one.
- If execution is interrupted for any reason (error, timeout, cancellation, safety-rule stop), the
  steps already emitted **are** the report so far — nothing further is needed to make the partial run
  legible. Close with a clear "Run interrupted after step N/M" note and, if applicable, the Cleanup
  section for whatever Family-B holds/bookings were left behind up to that point.
- Once the full scope has executed (or the run has ended early), close out the one-time-only sections
  — Findings, "SPEC.md updates proposed", and Cleanup/follow-up — summarizing across everything
  already reported live, even if the user doesn't ask for it explicitly. This is how the spec stays
  trustworthy over time, and how partial runs stay honest about what did and didn't get covered. Emit
  the `phase` end line for `"Test Execution"` (log-schema.md) here — the moment the scope is done or
  the run stops, not deferred to whenever reporting happens to finish.
- Once test execution has ended (P6), apply the `generate-bug-report` skill (P7) to every defect the
  gate marked FILE (not `unknown_resolution` findings — those aren't bugs) to produce one submittable
  bug report per defect. This is a separate pass before the final HTML report (P8), not
  something to interleave mid-run. Bracket this pass with its own `"Bug Reporting"` `phase` start/end
  (see `generate-bug-report`'s SKILL.md for the per-defect `reporting_op` lines within it).
- **In parallel, apply `generate-qa-report`** to write each test case's result (with its internal
  hops nested inside, per that skill's schema) plus every finding/proposed-update/cleanup item to
  this run's `NDC_Integration/Artifacts/Logs/` artifacts the same moment it's reported here — see
  that skill for the file layout, JSONL schema, and Markdown/HTML templates. The disk log's
  countable unit is the test case, not the hop — a flow's hop-by-hop detail still gets written, just
  nested under its one parent test-case entry. This isn't optional bookkeeping: once the conversation
  ends (or is interrupted), those disk artifacts are the only durable record left, so the `.jsonl`/
  `.md` pair must never lag behind what's already been said in-conversation. After the bug reports
  (P8), `generate-qa-report` produces this run's one-time `<slug>.html` (+ `_TimeBreakdown.html`)
  from the finished `.jsonl` — the polished, shareable QA report, including the filed defects.

## Non-goals

- Not for writing new test cases — use `generate-test-cases`.
- Not a load/performance or fuzzing tool; scope is the functional/business-rule/security checks
  named in SPEC.md §7.
- Not a replacement for the PRD-described Java/TestNG automation suite — this is manual/agent-driven
  execution against the same API contract, for the scenarios that suite doesn't already cover or
  when live confirmation of a SPEC.md `UNKNOWN` is specifically needed.
- Does not silently edit SPEC.md — proposes edits, applies only on confirmation (per Hard Safety
  Rules' spirit: shared-document changes are visible to others and should be confirmed).
