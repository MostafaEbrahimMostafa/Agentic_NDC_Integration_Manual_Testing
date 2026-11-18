# Tests for the shared rules

## Output contracts (Step 5)

```
node .claude/Skills/_shared/tests/output-contracts.test.js
```

Run this after any change to `../Output_Contracts.md`, `../contracts/*`, a validator or renderer in
`../scripts/`, or `Generate_QA_Report/scripts/render-md.js`. No API calls; it writes only to the OS
temp folder. Inputs are **synthetic** fixtures in `fixtures/output/` (not real findings); the
bug-report folder and a one-row registry with `NDC-BUG-9999` are built in the temp folder, so the
real `Bug_Registry.csv` is never touched.

| Area | Expected |
|---|---|
| CSV | `good_testcases.csv` passes with `--new`; `bad_testcases.csv` fails on duplicate ID, ninth category, `TBD` expected, `§9.9`, bare `2.9`, bad Version/Priority/Status, Flow ID on an endpoint row, extra field; title style only warns |
| JSONL | `good_run.jsonl` passes with no warnings; `bad_run.jsonl` fails on each rule (first line, `build`, verdict enum, ISO time, duplicate TC, key leak without printing it, raw payload, hops+attempts, defect fields, dangling `related_tc_id`, invalid JSON, interrupted `run_end`) |
| Report | the fresh render passes and has Verdict / counts / Top risks / Blockers in 15 lines; one hand-edited number fails |
| Bug report | a conforming report passes; each violation fails on its own (section missing or out of order, placeholder, unknown Registry ID, missing file, severity, 120-line budget, title, unredacted key) |
| XLSX / DOCX | renders pass their validators; the XLSX render is byte-stable; a render that differs from its source fails |

## Guardrail tests (Step 4)

```
node .claude/Skills/_shared/tests/replay-aap-r1.test.js
```

Run this after any change to `AI_Guardrails.md`, `scripts/verify-evidence.js`, the second-opinion
prompt, or the recipe engine (`NDC_Integration/Harness/Retest/lib/assert.js`, `jsonpath.js`). It
makes no API calls and writes only to the OS temp folder.

| Part | What it replays | Expected |
|---|---|---|
| A | The real AirArabiaPlus Round 1 log, unchanged (`Artifacts/Logs/20261108-124139_…ne6.jsonl`), the run whose BUG-01/02 were retracted (KB L-01) | Neither BUG-01 nor BUG-02 is FILE (no saved evidence, no source label, no repro, no second opinion); the missing build is warned |
| B | `fixtures/AAP-R1_guardrailed.jsonl`: the same claims logged with Step-4 fields, plus the real defect ADO 65507 (NDC-BUG-0002) | BUG-01 **CONTRADICTED** (Baggage exists under `journeysAncillariesDetails`, and the reviewer disagreed); BUG-02 not FILE (no evidence, and SPEC §6.4 line 1372 marks the bundle rule `UNKNOWN`); ADO 65507 **FILE**, reproduced 2/2 |
| C | Synthetic variants of the ADO 65507 entry (**not real findings**) | Each gate fires on its own: INFERRED → QUESTION, invented quote → UNVERIFIED, wrong value → CONTRADICTED, 1 repro → HOLD, 1/2 → FLAKY, no or unclear second opinion → HOLD / NEEDS-HUMAN, leaked key → exit 1 |

**Where the fixture's evidence comes from.** Round 1 saved no response bodies. BUG-01 cites the
GetAncillary responses saved by Round 3 on the same host, selector and day (R3 log lines 11 and 27),
because the same request shape returns the same structure. BUG-02 has no saved body anywhere.
ADO 65507 cites the raw captures of the ne-1 (2026-11-15, `raw_bug10/`) and stg-ne (2026-11-16,
`raw_xlsx/`) verifications. The two `second_opinion` blocks are the real answers of fresh
sub-agents run on 2026-11-17 with `../second-opinion-prompt.md`, copied as given. Do not edit them to
make a test pass. If the fixture's source files move, update the paths and re-run.
