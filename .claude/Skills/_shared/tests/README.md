# Guardrail tests

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
