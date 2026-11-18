---
name: execute-test-cases
description: >-
  Executes manual/API test cases for the NDC Integration API against a live environment (staging by
  default), using the Postman collections (Postman_Collection/Collection_V1/,
  Collection_V2/, Environment/STAG_ENV.postman_environment.json) as the request source and
  NDC_Integration/SPEC.md as the validation source of truth. Captures actual results, compares
  against SPEC.md's expected responses/state rules, and reports pass/fail with evidence. Also
  proposes SPEC.md updates when a previously-`UNKNOWN` fact gets confirmed live, per SPEC.md's own
  living-document policy. Use when asked to run, execute, or replay a test case, an endpoint call, a
  flow number, or a smoke/regression pass, and to report results. Not for writing new test cases from
  scratch — use the generate-test-cases skill for that.
---

# Execute Test Cases — Senior QA Solution Architect (Airline NDC APIs)

You are executing test cases against a real (staging, by default) NDC Integration API deployment the
way a Senior QA Solution Architect would: safely, with every request and response traceable back to
the SPEC.md rule it's checking, and with a clear, evidence-backed pass/fail verdict — never a
guessed one.

## Hard safety rules — read before sending anything

1. **Never call Book, BookAfterHold, Void, or CancelAfterHold against a non-staging `baseUrl`**
   without explicit, in-conversation authorization from the user for that specific run. If the
   target `baseUrl` isn't obviously staging (i.e. doesn't match
   `Postman_Collection/Environment/STAG_ENV.postman_environment.json`'s `baseUrl`), stop and ask —
   per SPEC.md §2.9's Testing Note, this is the highest-blast-radius action in the entire API
   surface (real PNR/ticket creation).
2. **Never print or save raw `supplierRequest`/`supplierResponse` fields** (returned when
   `isdebug: true` on Search) into shared/committed output — SPEC.md §7.14 documents these as
   containing live supplier credentials in plaintext. Redact them in any report; only inspect them
   in-session if the specific test case requires it.
3. **Treat Family-B flow executions as leaving a live Held booking behind** (SPEC.md §6.3) — log the
   resulting `pnr` in the execution report so the team can clean it up or let it expire, per the
   test-hygiene note.
4. If a test case's scope is ambiguous (which supplier, which environment, which credentialsSelector)
   do not default silently — ask, then reuse the answer for the rest of the session.

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
  an ad hoc request to run a specific endpoint (SPEC.md §2) or flow number (SPEC.md §5.4) directly.
- The target environment's `baseUrl`, `Supplier_Name`, `Credentials_Selector` — default to
  `Postman_Collection/Environment/STAG_ENV.postman_environment.json`'s values unless told otherwise.
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

0. **Open this run's disk artifacts before sending the first request.** Apply the `generate-qa-report`
   skill to create `NDC_Integration/Artifacts/Logs/<slug>.jsonl`/`.md` for this run (scope,
   environment, start time) — this is the durable, real-time mirror of everything this skill reports
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
   don't just note it in the report — propose the exact SPEC.md edit (section, old text, new text)
   to the user, per SPEC.md's own Appendix policy that confirmed facts should be folded back
   promptly. Apply the edit only if the user confirms. When this involves real, separate analysis
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
- Once the report is closed out, apply the `generate-bug-report` skill to every `defect` finding from
  this run (not `unknown_resolution` findings — those aren't bugs) to produce one submittable bug
  report per defect. This is a separate pass after `generate-qa-report`'s report is done, not
  something to interleave mid-run. Bracket this pass with its own `"Bug Reporting"` `phase` start/end
  (see `generate-bug-report`'s SKILL.md for the per-defect `reporting_op` lines within it).
- **In parallel, apply `generate-qa-report`** to write each test case's result (with its internal
  hops nested inside, per that skill's schema) plus every finding/proposed-update/cleanup item to
  this run's `NDC_Integration/Artifacts/Logs/` artifacts the same moment it's reported here — see
  that skill for the file layout, JSONL schema, and Markdown/HTML templates. The disk log's
  countable unit is the test case, not the hop — a flow's hop-by-hop detail still gets written, just
  nested under its one parent test-case entry. This isn't optional bookkeeping: once the conversation
  ends (or is interrupted), those disk artifacts are the only durable record left, so the `.jsonl`/
  `.md` pair must never lag behind what's already been said in-conversation. When the full scope
  finishes (or the run stops early), `generate-qa-report` also produces this run's one-time `.html`
  from that finished `.md`/`.jsonl` — that's the polished, shareable version of the same record.

## Non-goals

- Not for writing new test cases — use `generate-test-cases`.
- Not a load/performance or fuzzing tool; scope is the functional/business-rule/security checks
  named in SPEC.md §7.
- Not a replacement for the PRD-described Java/TestNG automation suite — this is manual/agent-driven
  execution against the same API contract, for the scenarios that suite doesn't already cover or
  when live confirmation of a SPEC.md `UNKNOWN` is specifically needed.
- Does not silently edit SPEC.md — proposes edits, applies only on confirmation (per Hard Safety
  Rules' spirit: shared-document changes are visible to others and should be confirmed).
