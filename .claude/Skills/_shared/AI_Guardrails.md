# AI Guardrails — shared by every skill

Enhancement Plan **Step 4**. This file is the one place for the anti-hallucination, reasoning, bias
and non-determinism rules. Every `SKILL.md` links here instead of copying the rules. The CLAUDE.md
hard rules still apply, and this file adds to them without replacing any.

> **Principle:** the LLM decides *what* to check and writes the words. **Code** decides pass/fail
> and checks the citations. **Humans** approve anything that becomes a fact (a filed bug, a SPEC
> edit, a KB edit).

Enforced by: [`scripts/verify-evidence.js`](scripts/verify-evidence.js) (checks citations and gates
defects) and the neutral reviewer prompt [`second-opinion-prompt.md`](second-opinion-prompt.md).
The log fields are defined in `Generate_QA_Report/references/log-schema.md` → *Guardrail fields*.

---

## G-1 Hallucination: evidence or it didn't happen

**How it shows up here:** a defect filed for behaviour that is not in the response, an invented
SPEC rule, or "PASS" reported for a step that never ran.

- Every verdict (PASS, FAIL or BLOCKED) cites **(a)** a saved response (a JSONL line, plus a hop or
  attempt, or a raw call file), **(b)** a JSON path in that response, and **(c)** a SPEC section.
  In the log this is the `evidence_refs[]` array on the `test_case` (and on the `finding` for a
  defect), plus `spec_ref`.
- An `evidence_ref` states the observation as a checkable assertion, using the same operators as the
  repro recipes (`exists`, `equals`, `notExists`, `notIn`, `equalsStep` …). **Example:**
  `{"source":"<raw call file>","path":"$.selectedOffer.passengerFareBreakdown[0].paxTotalAncillaryAmount.amount","op":"equals","value":399.52}`.
- Cite the **raw capture** (untruncated) when the log copy is truncated (`__omitted__`,
  `...[truncated]`). The script reports a truncated citation as UNVERIFIED.
- **Absence claims** ("the API does not return X") are checked by the script over the **whole**
  response (`$..X`). Also list in `also_checked` the other steps or levels you looked at (SeatMap,
  journey level, Swagger), because KB L-01 was a "missing" field that sat one level away.
- A SPEC expectation carries `expectation_quote`, the rule copied **verbatim** from the cited
  section. The script checks that the quote is really there, so an invented rule cannot pass.
- A verdict the script cannot verify becomes **UNVERIFIED**. It is never "probably PASS".

## G-2 Reasoning errors: code compares, the LLM chooses

**How it shows up here:** wrong comparison logic (total vs taxes), misreading a multi-hop flow, or
checking against the wrong expected result.

- Arithmetic, price reconciliation, equality across steps and counting are done by **code**:
  `Test-NdcPrice` (V1 harness), recipe assertions in `Harness/Retest/lib/assert.js`, `equalsStep`
  evidence refs, or a small script. Never do the sum in prose and never type a count by hand.
- Before calling a price mismatch a defect, check that the same selections were sent on **every**
  step that prices them (KB L-02), and that the ids came from the **last** enrichment call (KB L-03).
- **Second opinion** before any defect is filed: a **fresh** sub-agent sees only the saved request
  and response files and the SPEC rule, never the first verdict
  ([second-opinion-prompt.md](second-opinion-prompt.md)). Record its answer as `second_opinion` on the
  finding. If it disagrees or cannot tell, the defect is **NEEDS-HUMAN**: show both views to the user.

## G-3 Bias: neutral questions, labelled sources

**How it shows up here:** confirmation bias ("verify bug X" leads to confirming it), assuming
supplier A behaves like supplier B, or treating INFERRED expectations as facts.

- Ask neutral questions: "what does this response show about rule R?", never "confirm the bug".
  This applies to sub-agents, re-tests and your own reading. A re-test verdict comes from the recipe
  runner, not from the request wording (Retest_Issues).
- Label every expectation `expectation_source`:
  - `SPEC`: with `spec_ref` and a verbatim `expectation_quote`.
  - `LIVE-CONFIRMED`: with `expectation_cite: {file, quote}`, a KB fact or a run log line. Re-check
    it if it is older than 14 days or from another host (KB D-07).
  - `INFERRED`: anything else, including a rule that SPEC itself marks `INFERRED` or `UNKNOWN`.
- **Never file a defect against an `INFERRED` expectation.** Report it as a question to the user
  (CLAUDE.md rule 1, KB L-05). The script gates it as **QUESTION**, even when the agent labelled it
  SPEC but the quoted SPEC line carries an `INFERRED` or `UNKNOWN` label.
- Supplier facts come from that supplier's KB file and live runs, never from another supplier
  (CLAUDE.md rule 4; KB `02_Suppliers/<S>.md`).

## G-4 Non-determinism: reproduce twice, record the build

**How it shows up here:** the same test gives different verdicts across runs, different test cases
are written for the same story, live supplier responses change, or a build is redeployed mid-run
(KB L-04).

- **(a)** Use the fixed templates and output contracts (CSV template, log-schema, bug template).
- **(b)** **Reproduce every defect twice** (fresh Search each time) before filing. List each run in
  `repro.records[]` with its saved evidence. The script counts them: `reproduced < runs` is flagged
  **FLAKY**, `runs < 2` is **HOLD**, and `0 reproduced` is **CONTRADICTED**.
- **(c)** Log `build` in `run_start` on every run: the RC label from the user, or a version the host
  exposes (response header, `/swagger` `info.version`). If neither exists, write
  `{"label":"not exposed","source":"unknown"}` explicitly. If behaviour changes mid-run (a burst of
  500s and then different answers), append a `build_change` line and re-run the earlier defects on
  the final build.
- **(d)** Consistency is measured in Step 6 (golden set run twice).

## G-5 Unsafe actions (already covered; keep them)

- CLAUDE.md rules 2, 3 and 8 still apply: no Book, Void or Cancel on non-staging without
  authorization, never print or commit secrets, list leftover PNRs.
- `verify-evidence.js` also scans the run log for a non-redacted `x-api-key`, raw
  `supplierRequest`/`supplierResponse`/`OriginalSupplier*` bodies, and the real key from `.env`
  (values are never printed). Any leak means exit 1, so fix the log before sharing it.
- The API key lives only in the git-ignored repo-root `.env` (`.env.example` is the template).

---

## The defect gate (run before Generate_Bug_Report)

```
node .claude/Skills/_shared/scripts/verify-evidence.js NDC_Integration/Artifacts/Logs/<slug>.jsonl
```

It writes `<slug>_evidence.md` / `.json` next to the log, with the summary table first. Each defect
gets one gate (the worst one that applies):

| Gate | Meaning | What you do |
|---|---|---|
| **FILE** | Evidence holds, the SPEC rule is real and not INFERRED, reproduced at least twice, the second opinion agrees | Generate_Bug_Report may file it |
| **HOLD** | A step is missing: second reproduction, second opinion, or `also_checked` | Do the missing step, append the corrected `finding` line (the latest line wins), re-run the script |
| **NEEDS-HUMAN** | The reviewer disagreed or could not tell, or a scoped absence exists elsewhere | Show both views to the user, and let the user decide |
| **QUESTION** | The expectation is INFERRED (labelled, or by SPEC's own marker) | Ask the user. Never file |
| **UNVERIFIED** | No evidence, evidence unresolvable or truncated, no source label, or the SPEC rule was not found | Fix the citation, or report the result as unverified |
| **CONTRADICTED** | The saved response says otherwise, or the "missing" thing exists elsewhere | Drop the defect, and add a KB lesson if it teaches something |

Generate_Bug_Report files **only FILE** defects. The script never edits the log. Corrections are
appended lines. Exit code 1 means a defect is held, a test case is contradicted, or a secret leaked.
Step 6 metrics read `_evidence.json`.

**Cost control** (plan Step 4 risk): double reproduction and the second opinion apply to defects
only, not to every PASS. Evidence citations are cheap, so they apply to every verdict.

## Proof: the replay test

`node .claude/Skills/_shared/tests/replay-aap-r1.test.js` replays the AirArabiaPlus run whose
BUG-01/02 were retracted (AAP-R1, KB L-01). The test passes only if the guardrails stop those two
and still let the real ADO 65507 defect (NDC-BUG-0002) through. Re-run it after any change to this
file or to the script. See [tests/README.md](tests/README.md).
