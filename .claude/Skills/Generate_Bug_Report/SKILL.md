---
name: generate-bug-report
description: >-
  Turns each defect found by execute-test-cases (logged by generate-qa-report as a `finding` line
  with kind:"defect") into a professional, submittable Markdown bug report, one per defect, using
  the project's fixed template (title format, Description, Steps to Reproduce, Actual/Expected
  Result with JSON snippets, System Information, Severity, Evidence — with the house emoji-headed
  formatting). Use after a QA execution run is complete (or stopped) to turn its logged defects into
  bug tickets, or standalone when asked to "write a bug report," "file a bug for this failure," or
  "generate bug reports for all defects in this run." Not for deciding whether something is a defect
  (that's execute-test-cases's call) and not for the pass/fail QA report itself (that's
  generate-qa-report) — this skill only formats defects that are already established as real.
---

# Generate Bug Report — QA Reporting Lead (Airline NDC APIs)

You turn an already-established defect into a bug report someone can file as-is — never re-judging
whether it's really a bug (that's `execute-test-cases`'s job, via its Findings section and
`generate-qa-report`'s `finding` lines with `kind:"defect"`), and never inventing facts the run
didn't actually capture.

## Inputs

One of:

- **A finished or interrupted run's disk log** — `NDC_Integration/Artifacts/Logs/<slug>.jsonl` — read
  every `finding` line with `kind:"defect"` and produce one bug report per defect, plus the
  `run_start` line (environment/`baseUrl`/supplier/credentials selector) and each defect's
  `related_tc_id` test case (and its `hops`, if any) for request/response/endpoint context.
- **An ad hoc defect described directly in conversation** (no run/log involved) — gather the same
  facts from what the user/`execute-test-cases` already gave you. If something the template needs
  (field name, endpoint, expected vs. actual) is missing, ask rather than guessing — never fabricate
  a value to fill a placeholder.

"All defects" means every `kind:"defect"` finding in scope — never `unknown_resolution` findings
(those are newly-confirmed facts, not bugs, per `execute-test-cases`'s own rule that the two must
never be conflated).

## Guardrail gate — [`../_shared/AI_Guardrails.md`](../_shared/AI_Guardrails.md) (run first)

Before writing any report, run
`node .claude/Skills/_shared/scripts/verify-evidence.js NDC_Integration/Artifacts/Logs/<slug>.jsonl`
(or add `--tc <TC-ID>` for one defect) and read `<slug>_evidence.json`.

- Write a bug report **only for defects whose gate is `FILE`**. Do not create a folder or a registry
  row for the others.
- Tell the user, in one table, which defects were held and why: `HOLD` (missing second reproduction
  or second opinion), `NEEDS-HUMAN` (the reviewer disagreed), `QUESTION` (INFERRED expectation),
  `UNVERIFIED`, or `CONTRADICTED`. Never re-word a held defect so that it passes.
- In the report, quote the gate result and a `FLAKY n/m` flag if present. Also quote the build from
  `run_start.build`, or "build not recorded".
- For an ad hoc defect with no run log, get the same proof before writing: the saved response with
  the path, the verbatim SPEC rule, two reproductions and a second opinion. If any is missing, say so
  and ask.

## Output contract — [`../_shared/Output_Contracts.md`](../_shared/Output_Contracts.md)

- Each report follows `bug-report.contract.json`: the title format, the nine template sections in
  order, a `Registry ID` that exists in the registry, every listed request/response file present and
  redacted, and an index line in `README.md`.
- **Size budget (O-3): 120 lines per report, 40 lines per code block.** Quote only the JSON path that
  proves the defect; the full bodies live in `requests-responses/`.
- Context that does not fit the fixed sections goes in an optional `## 📝 Observations` section after
  Impact (O-6). Do not add other sections.
- Counts in a report ("332 of 332 held bookings") are copied from script output, never re-counted (O-2).
- Before reporting the batch done:
  `node .claude/Skills/_shared/scripts/validate-output.js NDC_Integration/Artifacts/BugReports/<slug>/` must pass.
  A stakeholder `.docx` copy, if asked: `render-docx.js <report>.md`, then validate it with `--source`.

## Process

1. **Collect defects.** For a run-based request, walk the `.jsonl` top to bottom and pull every
   `finding` line where `kind:"defect"`. For each, resolve `related_tc_id` back to its `test_case`
   line to recover `endpoint_or_flow`, `request_summary`, `response_summary`, `expected`, `actual`,
   `supplier`, `credentials_selector`, and `correlation_id` (falling back to the run-level `supplier`/
   `credentials_selector` from `run_start` when the test case didn't override them). If the defect is
   hop-scoped (a flow-level test case where one hop failed), use that specific hop's fields instead
   of the parent test case's aggregate ones — the bug is about that one endpoint call, not the whole
   flow.
2. **Map to the template's placeholders** (see
   [references/bug-report-template.md](references/bug-report-template.md) for the exact structure):
   - `API_VERSION` — V1 or V2, from the endpoint's path/SPEC.md section the defect was found against.
   - `SUPPLIER` — the supplier the defect was reproduced against.
   - `API_NAME` — the specific endpoint (e.g. `FareConfirm`, `Book`), not the whole flow, even when
     the defect surfaced during a multi-hop flow-level test case.
   - `FIELD_NAME` — the exact response field at fault (`finding.field_name`).
   - `FLOW_STEPS` — the ordered call sequence needed to reproduce: the single endpoint if this was a
     single-endpoint test case, or the numbered hop sequence (1. Search, 2. FareConfirm, ...) up to
     and including the failing call if this was a flow-level test case.
   - `EXPECTED_VALUE` — `finding.expected_value` (an example valid value, not just "not null").
   - `BASE_URL` / `ENVIRONMENT` / `CREDENTIAL_SELECTOR` — from `run_start` (or the test case's own
     override).
   - `CORRELATION_ID` — from the test case/hop, if the response actually returned one; if it didn't,
     write "Not returned by this response" — never invent one.
3. **Redact exactly like execute-test-cases/generate-qa-report do.** The request/response snippets
   quoted in the report are whatever `request_summary`/`response_summary`/`evidence` already
   contain, which must already be redacted per SPEC.md §7.14 — never go back to raw
   `supplierRequest`/`supplierResponse` to "get more detail" for the bug report.
4. **Title format** — the fixed shape is
   `**[<API_VERSION>][<SUPPLIER>][<API_NAME>] – <FIELD_NAME> Returned as Null in <API_NAME> Response**`
   for a null-field defect specifically. For a defect that isn't a null field (wrong value, missing
   field entirely, wrong type, wrong status code), keep the same
   `[<API_VERSION>][<SUPPLIER>][<API_NAME>] – ...` bracket prefix but adjust the verb phrase to match
   what actually happened (e.g. `... – <FIELD_NAME> Returned Incorrect Value in <API_NAME> Response`,
   `... – <FIELD_NAME> Missing from <API_NAME> Response`) — never force a defect into "returned as
   null" wording when that's not what happened.
5. **Severity** — judge from business impact, briefly explaining why, using this as a starting
   heuristic (override it when the specific defect's context says otherwise):
   - **Critical** — blocks booking/payment/ticketing outright, or corrupts state (wrong PNR, wrong
     fare charged).
   - **High** — a core financial/identity/booking field is wrong or missing, but the flow still
     completes (the bad data just propagates).
   - **Medium** — non-blocking but breaks a downstream consumer (e.g. cleanup/expiry tracking can't
     run without `holdExpirationDate`).
   - **Low** — a cosmetic or optional/enrichment field, no functional downstream impact.
6. **Evidence** — quote the actual response snippet and the expected response snippet, both already
   redacted, exactly as they appear in the source `test_case`/`hop`/`finding` line — don't
   paraphrase them into prose only.
7. **Emit one folder per defect** (see "Where output goes" below: the `.md` plus its `requests-responses/` JSON files) using
   [references/bug-report-template.md](references/bug-report-template.md) verbatim in structure —
   the section headings, their emojis, and their order are fixed; populate them, don't redesign them.
   When this run has a `.jsonl` (not an ad hoc defect with no run), append a `reporting_op` line to it
   (`operation:"Bug Report Generation"`, `started_at`/`ended_at` bracketing this whole batch of defect
   files, per log-schema.md, plus `related_tc_ids` = the TC-IDs of the defects reported, so the time is
   attributed to those test cases' Reporting cells) — this is Reporting time for the run's Execution Time Breakdown, not a
   separate Claude/AI operation, so it must not also be logged as an `ai_operation` line (that would
   double-count it).

8. **Write or update the Bug Registry row** (`NDC_Integration/Artifacts/Registry/Bug_Registry.csv`, the
   single list of all defects; format in
   `.claude/Skills/Retest_Issues/references/registry-format.md`). For each defect, before writing its
   file, look for an existing row for the **same defect** (same supplier, same endpoint and field,
   same wrong behaviour): `node NDC_Integration/Harness/Retest/registry.js list --supplier <S> --grep "<field or title words>"`
   and check the KB supplier file's known-bugs table. Compare the behaviour, not just the title.
   - **Existing row** (a recurring bug): link this run's id —
     `registry.js link <GlobalId> --run "<slug>:BUG-NN" --env <env>` (add `--ado N` if the user
     gives one). Keep the per-run `BUG-NN` numbering rule from "Where output goes".
   - **No row** (a new defect): `registry.js add --title "<the report title>" --supplier <S> --env <env>
     --selector <C> --version <V1|V2> --severity <sev> --run "<slug>:BUG-NN"` — it prints the new
     GlobalId. Never reuse or invent a GlobalId.
   - **Unsure whether it is the same defect**: ask the user; do not merge two defects into one row
     and do not create a duplicate.
   Put the GlobalId in the report's **Registry ID** line and in the README index line. For an ad hoc
   defect with no run slug, use the scope tag the user gave in place of the slug. The registry is
   shared: change it only through `registry.js`, never by hand-editing the CSV.

## Where output goes — one folder per bug

```
NDC_Integration/Artifacts/BugReports/<slug>/
  README.md                                   (index, one line per bug, links into the folders)
  BUG-<NN>_<API_NAME>_<FIELD_NAME>/           (one folder per defect)
    BUG-<NN>_<API_NAME>_<FIELD_NAME>.md       (the bug report, fixed template)
    requests-responses/
      01_<label>_request.json
      01_<label>_response.json
      02_<label>_request.json
      ...
```

- `<NN>` is a zero-padded sequence number in the order defects were found (a recurring bug keeps its
  tracked id, e.g. BUG-05 in every round; new ones continue the numbering). `<slug>` is the run slug
  `generate-qa-report` used for that run's `.jsonl`/`.md`/`.html`, so the bug reports and the QA report
  stay traceably paired. For an ad hoc defect with no run/slug, ask the user for a short scope tag
  instead of inventing a timestamp.
- Never leave a bare `.md` at the top level of `<slug>/`: every bug gets its folder, even with only
  one request/response pair.
- The top-level `README.md` lists each bug as
  `- [BUG-NN](<folder>/<file>.md) — <GlobalId> — <title> (<severity>) — <n> request/response pairs`.

### Request / response files (mandatory for every bug)

1. **Which calls.** The ordered calls needed to reproduce the defect, from the first call after
   Search up to and including the failing call, plus any comparison call that proves the point (the
   same request with a valid key, the same flow on the other API version, the retry that succeeded,
   the read-back after a Cancel). For a defect that spans many offers (e.g. unbookable offers), include
   one chain per affected offer. Skip Search: its response is huge and not the evidence; name the
   search criteria in the `.md` steps instead. For a recurring defect use the calls from the current
   round, not copies of the earlier round's files.
2. **File naming.** `NN_<label>_request.json` and `NN_<label>_response.json`, `NN` the call order inside
   this bug (zero-padded), `<label>` a short readable tag such as `V2_ALY-RUH_2_book_Book` or
   `V1_Retrieve_no_x-api-key`; characters outside `A-Za-z0-9_.-` become `_`.
3. **Request file** — `{label, method, url, headers, body}`. `headers` shows what was really sent: for a
   header test, omit the header that was omitted and show an invalid value as
   `"[REDACTED - invalid value sent]"`. `x-api-key` is always `"[REDACTED]"`.
4. **Response file** — `{label, status, durationMs, requestedAtUtc, respondedAtUtc, body}`. `body` is the
   parsed JSON, or the raw text, or `"(empty body)"` (an HTTP 500 with no body is itself evidence).
5. **Full bodies, not summaries.** Use the raw call capture made while executing (every call's full
   request and response), not the truncated `request_full`/`response_full` kept in the `.jsonl`. If only
   the truncated copies exist, write those, say so in the `.md`, and flag it to the user — do not
   present a truncated body as the full one.
6. **Redaction (SPEC.md 7.14).** Replace `OriginalSupplierRequest`/`OriginalSupplierResponse`
   (any casing) and `supplierRequest`/`supplierResponse` with
   `"[REDACTED - raw supplier payload, per SPEC.md 7.14]"` (keep `null` as `null`). Search the finished
   folder for the real API key and for non-redacted supplier payloads before reporting it done.
7. **Match calls by identity, not just id.** When several processes or runs share a call id, pick the
   stored call whose start time equals the one logged for that hop, so a bug folder never shows another
   round's response.
8. **Link them from the `.md`.** Add a `## 📁 Request / response files` section between **Evidence** and
   **Impact** listing every pair with its label, endpoint path and HTTP status. The Evidence snippets
   stay in the `.md`; the files are the complete record.

If a defect has no stored call (for example a documentation gap), still create the folder, write
`requests-responses/` empty only if truly nothing applies, and say "No stored call applies" in that
section.

## Non-goals

- Not for deciding whether something is a defect, or how many there are — that's `execute-test-cases`
  (verdicts) and `generate-qa-report` (the `finding kind:"defect"` lines this skill reads). This
  skill only formats what's already been decided.
- Not the QA pass/fail report itself — that's `generate-qa-report`'s `.md`/`.html`. This skill is
  downstream of it, for defects specifically.
- Not for filing the report into Jira/Azure DevOps/etc. — it produces the Markdown artifact; filing
  it into a tracker is a separate, human-confirmed step.
- Not a substitute for evidence that doesn't exist — if a placeholder's underlying fact wasn't
  captured by the run (no correlation ID returned, no expected-value example available), say so
  plainly in the report rather than inventing a plausible-looking value.
