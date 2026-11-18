# Output Contracts — shared by every skill

Enhancement Plan **Step 5**. This file is the one place for output shape rules. Every `SKILL.md`
links here instead of copying them. The CLAUDE.md hard rules and
[`AI_Guardrails.md`](AI_Guardrails.md) still apply; this file adds to them and replaces neither.

> **Principle:** structured data first, documents rendered from it. The LLM writes the data and the
> words. **Scripts** count, render and validate. Nobody hand-edits a rendered file.

An **output contract** has three parts: a **schema** (machine-readable, in [`contracts/`](contracts/)),
a **template** (the skill's existing reference file), and a **validator** (in [`scripts/`](scripts/)).

---

## The contracts

| Output | Source of truth | Schema | Template | Validator |
|---|---|---|---|---|
| Test cases | CSV | [`testcase-csv.contract.json`](contracts/testcase-csv.contract.json): 15 fixed columns, ID pattern per RowType, the eight §8.1 categories, allowed Priority/Risk/Status, SPEC ref required | `Generate_Test_Cases/references/test-case-template.md` | `validate-csv.js` |
| Run results | JSONL | [`run-log.schema.json`](contracts/run-log.schema.json): one JSON schema per line type | `Generate_QA_Report/references/log-schema.md` | `validate-jsonl.js` |
| Bug reports | Registry row + MD folder | [`bug-report.contract.json`](contracts/bug-report.contract.json): title, 9 sections in order, Registry ID, request/response files, 120-line budget | `Generate_Bug_Report/references/bug-report-template.md` | `validate-bug-report.js` |
| Run report (MD) | Rendered from JSONL | [`report.contract.json`](contracts/report.contract.json): verdict, counts, top risks and blockers in the first 15 lines | `Generate_QA_Report/references/report-template.md` | `validate-report.js` (the `.md` must equal a fresh render) |
| Run report (HTML) | Rendered from JSONL | Same data; opens with "1. Executive Summary" | `Generate_QA_Report/references/report-template.html` | rendered by `render-html.js`; freshness checked by `validate-report.js` |
| Stakeholder XLSX | Rendered from CSV or JSONL | Same columns as the source (JSONL: `resultsColumns` in `report.contract.json`) | — | `render-xlsx.js`, then `validate-xlsx.js` |
| Stakeholder DOCX | Rendered from an MD output | Same headings, tables and text as the source `.md` | — | `render-docx.js`, then `validate-docx.js` |

One command for any of them (it picks the validator from the path):

```
node .claude/Skills/_shared/scripts/validate-output.js <file.csv | run.jsonl | BugReports/<slug>/ | file.xlsx --source <src> | file.docx --source <src.md>> [--new]
```

Exit code `0` = the output meets its contract, `1` = contract errors (listed, verdict first),
`2` = usage or read error. Warnings (title style, size budget on log bodies) never fail a run.

## Rules for every skill

**O-1 Pyramid structure.** Verdict and counts first, then a table, then details, then raw evidence
links. The run report puts **Verdict, the counts table, Top risks and Blockers in its first 15
lines**; a bug report puts the title and Description first; the RC re-test report puts its summary
table first. A reader who stops after the first screen still has the answer.

**O-2 No numbers typed by the LLM.** Counts, totals and percentages come from a script (the
renderers, `verify-evidence.js`, the retest runner, `registry.js`). When you quote a number in chat
or in a summary, copy it from script output; never re-count, round or retype it (AI_Guardrails G-2).

**O-3 Size budget.**
- Bug report: **120 lines** at most; each code block **40 lines** at most. Excerpt large JSON to the
  path that proves the point and point to the full body in `requests-responses/`.
- Run log bodies: arrays over 3 items keep 2 + `"__omitted__: N more items"`, strings over 110
  characters are cut to 60 + `...[truncated]` (log-schema.md, 2026-10-10 additions).
- Test-case cell: 4,000 characters (warning); Excel's 32,767-character limit is an error.

**O-4 Diff-friendly.** Fixed column order, stable IDs (never renumber existing rows), one priority
scheme per file, append-only logs, byte-stable renders (the XLSX/DOCX renderers use a fixed zip
timestamp). A git diff should show only real changes.

**O-5 Rendered, never retyped.** `.md`, `.html`, `.xlsx` and `.docx` are rendered by script from the
source of truth. To correct one, append a line to the JSONL (or fix the CSV) and re-render. The
validators fail a rendered file that differs from its source.

**O-6 Keep a free-text Observations section.** Rigid templates must not hide useful findings.
- Run log: append `{"type":"observation","text":"...","related_tc_id":"<optional>"}`; the report
  renders it under `## Observations`.
- Bug report: optional `## 📝 Observations` section after Impact.
- Observations are not verdicts, defects or numbers; they never change a count.

**O-7 Validate before you hand it over.** Run the validator on every new output the skill wrote,
and fix the output (not the validator) until it passes. If the contract itself is wrong, say so
and ask; do not loosen it silently.

## Scope: new outputs only

Contracts apply to outputs created **from 2026-11-18**. Older artifacts are not migrated (plan
Step 5 risk: "old artifacts do not match the new contract"). Calibration on the existing repo
(2026-11-18) showed what the contracts catch:

- older test-case CSVs: bare `2.9`-style SPEC refs, extra categories, mixed priority schemes;
- older run logs: no `run_start.build` / `expectation_source` (Step 4 fields), and one run
  (`20261108-171128_AirArabiaPlus-…-Round3-ne6.jsonl`) logged in a different raw format with no
  `run_start` at all;
- pre-registry bug reports: no `Registry ID` line (added in Step 3).

## Tests

```
node .claude/Skills/_shared/tests/output-contracts.test.js
```

Every validator must pass a conforming synthetic output and fail each kind of violation; every
renderer's output must pass its validator. Re-run it after changing a contract, a validator, a
renderer, or `Generate_QA_Report/scripts/render-md.js`. See [tests/README.md](tests/README.md).
