# Generate Bug Report — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to turn established defects
into submittable Markdown bug reports, one per defect.

---

Use Generate_Bug_Report to file bug reports for:

- **Source**: `[NDC_Integration/Artifacts/Logs/<slug>.jsonl — every "finding" line with
  kind:"defect" / an ad hoc defect I'll describe now]`

For each defect, map it onto the fixed template: title in the form
`[<API_VERSION>][<SUPPLIER>][<API_NAME>] – <FIELD_NAME> ...` (adjust the verb phrase to match
what actually happened — null, wrong value, missing, wrong type/status), Description, Steps to
Reproduce (the single endpoint or the full hop sequence up to the failing call), Actual/Expected
Result with the already-redacted JSON snippets, System Information, a Severity judged from
business impact (Critical/High/Medium/Low) with a one-line justification, and Evidence quoted
verbatim from the source.

Never re-judge whether something is a defect, and never conflate `unknown_resolution` findings
with `kind:"defect"` ones — only format defects that are already established as real.

Write one file per defect to
`NDC_Integration/Artifacts/BugReports/<slug>/BUG-<NN>_<API_NAME>_<FIELD_NAME>.md`, plus a
one-line `README.md` index if there's more than one.

**Stop and ask me, don't guess:**
- if a template placeholder's underlying fact wasn't actually captured (no correlation ID
  returned, no expected-value example) — say so plainly rather than inventing a value
- if this is an ad hoc defect with no run/slug — ask for a short scope tag to use instead of a
  slug

---

## Notes for filling this in

- Source — usually a run's `.jsonl` right after Execute_Test_cases closes out; this is normally
  triggered automatically as its last step, so use this standalone prompt mainly for "file bug
  reports for this run" after the fact, or for a defect described directly in conversation.
- `<slug>` must match the run's Generate_QA_Report slug so the bug reports and the QA report
  stay traceably paired.
- This skill never files into Jira/Azure DevOps — it produces the Markdown artifact only.
