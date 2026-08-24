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
7. **Emit one file per defect** (see "Where output goes" below) using
   [references/bug-report-template.md](references/bug-report-template.md) verbatim in structure —
   the section headings, their emojis, and their order are fixed; populate them, don't redesign them.

## Where output goes

`NDC_Integration/Artifacts/BugReports/<slug>/BUG-<NN>_<API_NAME>_<FIELD_NAME>.md` — one Markdown file
per defect, `<NN>` a zero-padded sequence number in the order defects were found, `<slug>` the same
run slug `generate-qa-report` used for that run's `.jsonl`/`.md`/`.html` (so the bug reports and the
QA report they came from stay traceably paired). For an ad hoc defect with no run/slug, ask the user
for a short scope tag to use in place of `<slug>` rather than inventing a timestamp.

If a run produced more than one defect, also write a one-line index at
`NDC_Integration/Artifacts/BugReports/<slug>/README.md` listing each `BUG-<NN>` file next to its
title — purely a navigation aid, not a substitute for opening the individual reports.

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
