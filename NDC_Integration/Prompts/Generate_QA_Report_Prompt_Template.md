# Generate QA Report — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to build or rebuild the
Markdown/JSONL/HTML QA report for a run standalone (outside a live Execute_Test_cases session
— e.g. after editing a template, or recovering from an interrupted run).

---

Use Generate_QA_Report to **[build the report for a run in progress / regenerate the report
from existing logs]**:

- **Run slug or scope tag**: `[<YYYYMMDD-HHMMSS>_<scope-tag>, or describe the run to derive one
  from]`
- **Source**: `NDC_Integration/Artifacts/Logs/[slug].jsonl` **[if regenerating from an existing
  log]**

If regenerating: read the full `.jsonl` top to bottom and rebuild the `.md` from it in full
(never hand-patch either file directly). If the run already finished/stopped, also rebuild the
`.html` from the final `.md`/`.jsonl` using the project's canonical template
(`NDC_Integration/Artifacts/Logs/20260805-140642_TestCases_V1.html` as the base structure to
copy from).

Keep the JSONL append-only and the source of truth; re-render the `.md` in full from it every
time; only render the `.html` once, at `run_end` or interruption. Redact
`supplierRequest`/`supplierResponse` debug fields per SPEC.md §7.14 in every artifact.

**Stop and ask me, don't guess:**
- if the run scope/slug is genuinely ambiguous and more than one candidate log exists

---

## Notes for filling this in

- This skill is normally invoked automatically as part of Execute_Test_Cases — use this
  standalone prompt only for "regenerate the report," "build a report for the last run," or
  fixing a report after a template change.
- It never decides verdicts, calls the API, or edits SPEC.md — it only persists/renders what
  Execute_Test_cases already decided.
- `<slug>` is `<YYYYMMDD-HHMMSS>_<scope-tag>` — reuse the run's original slug when regenerating
  so all three files (`.jsonl`/`.md`/`.html`) stay paired.
