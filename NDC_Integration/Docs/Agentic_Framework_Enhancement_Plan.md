# Agentic QA Framework — Step-by-Step Enhancement Plan

**Project:** NDC Integration API — Manual/Agentic QA
**Date:** 2026-11-17
**Scope:** 7 problems raised by the QA owner. Only work that fits this repo is included.

---

## 0. Where the framework stands today

**What already works well (keep it):**

| Asset | Why it is good |
|---|---|
| 7 skills chained into a pipeline (Analyze → Generate → Execute → Report → Bug → Update Spec, plus TestData sweep) | A clear QA lifecycle, and each skill has one job |
| `SPEC.md` used as the single source of truth for expected results | Gives the AI an oracle, so verdicts are checked against a document instead of guessed |
| JSONL log feeding the MD and HTML renderers | One source and many outputs, the right pattern for AI output |
| Hard safety rules in Execute (no Book/Void on non-staging, redact `supplierRequest`) | Real AI-risk control |
| `UnknownResolutionTracker.md` and the `spec_update_proposed` flow | Human-in-the-loop review of what the AI learned |

**Gaps found in the repo (these drive the plan):**

| # | Gap | Evidence |
|---|---|---|
| G1 | Project knowledge lives in **your personal Claude memory** (about 25 run notes), not in the repo | A new member cloning the repo gets none of it: supplier behaviour, toolkit gotchas, retracted bugs |
| G2 | No `CLAUDE.md` at the repo root | Every session re-discovers the conventions |
| G3 | Re-testing is done with **one-off scripts per round**, about 90 files per supplier folder | `Harness/AirArabiaPlus/` has `make_bug18_retest.js`, `make_verify10.js`, `patch_chain2.js`, and `Harness/Galileo/` has `bugs_r3.js`, `bugs_r4.js` |
| G4 | Bug IDs **restart at BUG-01 in every run** | The same defect has a different ID in each round, so you cannot answer "is bug X fixed in this RC?" |
| G5 | AI errors have already happened | AirArabiaPlus BUG-01/02 were **retracted** in Round 3, VoidUnified expectations are marked *INFERRED*, and Sabre was redeployed in the middle of a run (Build A vs B) |
| G6 | No measurement of how good the AI is | No golden set, no retraction rate, no consistency check |
| G7 | Hard-coded paths from other machines | `g:\Software Testing\...` in the Harness README and `C:/Users/sheen/...` in `.claude/settings.local.json` |

---

## Order of execution (one step at a time)

Do the steps in this order. Each step depends on the one before it. Do not start the next step until the current step's **Done when** is true.

| Step | Problem it solves | Effort | Why this position |
|---|---|---|---|
| 1 | Knowledge Base | 2–3 days | Every other step needs shared context |
| 2 | Prompt Optimizer skill | 1–2 days | Better inputs for every later step |
| 3 | Bug Registry + RC Re-Test skill | 4–5 days | Your biggest current pain |
| 4 | AI Risk Mitigation (guardrails) | 2–3 days | Hardens Steps 3, 5 and 6 |
| 5 | Output Optimization (output contracts) | 2 days | Makes outputs checkable by scripts |
| 6 | AI Evaluation Metrics | 2–3 days | Needs Steps 3–5 to have data |
| 7 | AI Daily Summary Report | 1–2 days | Consumes the registry and metrics |

---

## Step 1 — Project Knowledge Base (Business + Technical)

**Problem:** G1 and G2. Knowledge is in one person's private memory and spread across 1,549 lines of SPEC.md and 883 lines of PRD.

**Solution:** Use a **layered knowledge base inside the repo**, so humans and the AI read the same files.

```
CLAUDE.md                          <- 60-100 lines: map of the repo, rules, where to look (AI loads this automatically)
NDC_Integration/KB/
  00_Start_Here.md                 <- onboarding path for a new member (day 1 / week 1)
  01_Business/
     Domain_Glossary.md            <- NDC, PNR, Hold, Void, Re-Issue, EMD, bundle, credentialsSelector...
     Booking_Lifecycle.md          <- Search -> FareConfirm -> Hold/Book -> Void/Cancel, with a state diagram
  02_Suppliers/
     <Supplier>.md                 <- one per supplier: live capabilities, working routes, known bugs, gotchas
  03_Technical/
     Architecture.md, Environments.md (ne-1..ne-7), Harness_Guide.md
  04_Decisions_and_Lessons.md      <- retracted bugs, wrong assumptions, "why we do X"
```

**How:**
1. Move the supplier facts from your memory notes into `KB/02_Suppliers/*.md`. Facts only: date, environment, and source run slug. No credentials, PNRs or customer names.
2. Write `CLAUDE.md` as an **index, not a copy**: rules, folder map, and "for supplier X read `KB/02_Suppliers/X.md`".
3. Add a final step to `Update_Spec_From_Findings` (or a small new skill, `Update_KB`) that proposes KB updates after each run. The same human-approval pattern as SPEC updates applies.
4. Put a `Last verified: <date> / <env> / <run slug>` line on every fact. Supplier behaviour changes between builds.

| Advantages | Risks → Mitigation |
|---|---|
| A new member can be productive in days, not weeks | **Stale facts** → the `Last verified` line on each fact, and the AI must re-check facts older than N days before relying on them |
| The AI starts every session with the right context, which reduces hallucination | **Secrets or PII leaking into the KB** → a review checklist, and never copy tokens, keys or PNR names |
| Knowledge survives if one person leaves | **KB grows too large and wastes context** → keep `CLAUDE.md` short and load supplier files only on demand |
| Same files for humans and the AI | **Copying SPEC into the KB** creates two sources of truth → the KB links to SPEC sections and never duplicates them |

**Done when:** a colleague can clone the repo, read `00_Start_Here.md`, and run one smoke test case without asking you anything.

---

## Step 2 — Prompt Optimizer Skill

**Problem:** Free-text requests are often vague (missing supplier, environment, scope or output format), so the agent guesses or asks late.

**Solution:** A new skill, `.claude/Skills/Optimize_Prompt/`, that turns a raw request into a structured, complete prompt **before** any other skill runs. It only rewrites the request. It never executes anything.

**Prompt-engineering techniques it applies:**

| Technique | Applied as |
|---|---|
| Role + context framing | "Senior QA for NDC…", plus links to KB/SPEC sections (not pasted text) |
| Structured template (slot filling) | Goal · Scope · Supplier/Env/Selector · Inputs · Constraints · Output format · Acceptance · Stop-and-ask rules |
| Missing-slot detection | Lists any empty required slot as a question, and never fills it with a guess |
| Few-shot | 2–3 good examples per task type, taken from your existing `NDC_Integration/Prompts/*_Template.md` |
| Prompt chaining | Splits a big request into ordered skill calls (Analyze → Generate → Execute) |
| Explicit output contract | Names the exact file, schema and location (links to Step 5) |
| Self-check instruction | "Before answering, verify every claim has evidence" (links to Step 4) |

**How:**
1. `SKILL.md` holds the slot checklist and a rewrite procedure. The required slots differ per task type (generate / execute / retest / report).
2. `references/examples.md` contains before/after pairs. Your own request that produced this plan is a good first example.
3. The output is the optimized prompt, a list of questions for any missing slots, and the next skill to call.

| Advantages | Risks → Mitigation |
|---|---|
| Fewer wrong runs caused by ambiguous scope (wrong supplier or environment) | **Over-engineering simple asks** → skip the optimizer for one-line tasks, and use it for runs and test generation |
| Consistent prompts, so outputs can be compared between runs | **It "improves" the request into something the user did not mean** → always show before/after and require confirmation |
| Teaches juniors good prompting through the examples | **Extra step and extra tokens** → keep the skill short; it rewrites and does not analyse |

**Done when:** 5 of your past real requests, run through the optimizer, produce prompts with no missing slots, and you agree with each rewrite.

---

## Step 3 — Bug Registry + RC Re-Test ("RC regression")

**Problem:** G3 and G4. For a release candidate (RC) you get a list of issues ("verify ADO 65507, BUG-18…"). Today each one needs a hand-written script, and the bug IDs are per-run.

**Solution, in two parts:**

### 3a. A global Bug Registry, the single list of all defects

`NDC_Integration/Artifacts/Registry/Bug_Registry.csv` (or JSON), one row per real defect:

| Column | Example |
|---|---|
| `GlobalId` | `NDC-BUG-0042` (never reused) |
| `AdoId` | `65507` |
| `Supplier / Env / Selector` | `AirArabiaPlus / stg-ne / USA` |
| `RunBugIds` | `20261111_AAP:BUG-18; 20261116_AAP:BUG-10` (links to the per-run IDs) |
| `ReproRecipe` | path to `Harness/recipes/NDC-BUG-0042.json` |
| `Status` | Open / Fixed-Verified / Still-Reproduces / Blocked / Retracted |
| `LastVerified` | `2026-11-16, build X, run slug` |

`Generate_Bug_Report` writes or updates the registry row instead of only creating per-run files.

### 3b. A recipe-based re-test skill, `Retest_Issues`

A **repro recipe** is a small JSON file that describes the bug as data, not code:

```json
{
  "id": "NDC-BUG-0042",
  "supplier": "AirArabiaPlus", "selector": "USA", "version": "V2",
  "testData": "TestData/AAP_1ADT1CHD_OW.json",
  "chain": ["Search", "FareConfirm", "Hold", "Retrieve"],
  "assert": [
    { "step": "Retrieve", "path": "$.passengers[?(@.type=='INF')].parentPaxRefId", "op": "exists" }
  ],
  "fixedWhen": "all asserts pass",
  "neighbours": ["FLOW-V2-12", "FLOW-V2-14"]
}
```

**Skill flow:**
1. **Input:** a list of IDs (ADO, Global or run IDs), or an `.xlsx`/`.csv` such as `AirArabiaPlus_bugs.xlsx`.
2. Resolve each ID through the registry and load its recipe. If a bug has no recipe, the skill builds one from the bug report and asks you to approve it **once**. After that it is reusable forever.
3. **Pre-flight:** reuse `Validate_TestData_Search` to make sure inventory exists, so "no flights" becomes **Blocked**, not "Fixed".
4. Run the recipes through **one generic runner** (replacing the per-round `g*.js` and `make_*_retest.js` files).
5. **Verdict per bug:** `Fixed` / `Still reproduces` / `Blocked (env/data)` / `Behaviour changed – needs review`.
6. **Regression ring:** also run the `neighbours` flows, so a fix that breaks a nearby flow is caught.
7. **Output:** an RC Re-Test report (summary table first) plus updated registry rows. Bugs reproduced in this run are logged for Step 7.

| Advantages | Risks → Mitigation |
|---|---|
| A re-test list becomes one command instead of new scripts each time | **A weak recipe assertion gives a false "Fixed"** → each recipe must also assert the *negative* case and save the response as evidence; a human signs off on "Fixed" for P1/P2 bugs |
| Bug history across rounds and environments is visible | **Supplier data drift** (no inventory, build redeploy) → the pre-flight check, plus recording the build/version header in every verdict |
| Retires about 90 throw-away scripts per supplier | **Migration effort** → do not convert old scripts; create a recipe only when a bug is next re-tested |
| Recipes double as regression tests | **Registry conflicts when two people edit it** → one row per bug, small commits, and the skill appends instead of rewriting |

**Done when:** you re-run the 12-bug `AirArabiaPlus_bugs.xlsx` list with one prompt and get a correct Fixed / Still / Blocked table that matches a manual check of 3 bugs.

---

## Step 4 — Mitigating AI Risks (Hallucination, Reasoning, Bias, Non-Determinism)

**Problem:** G5. Retracted bugs and inferred expectations show these risks are real here.

| Risk | How it appears in this project | Mitigation (put it inside the skills) |
|---|---|---|
| **Hallucination** | A defect filed for behaviour that was not in the response; a SPEC rule invented; "PASS" reported for a step that never ran | **Evidence-or-it-didn't-happen rule:** every verdict must cite a JSONL line, a JSON path from the saved response, and a SPEC section. A script (not the LLM) checks that the cited path exists in the saved response. With no evidence, the verdict becomes `UNVERIFIED` |
| **Reasoning errors** | Wrong comparison logic (e.g. price total vs taxes), misreading a multi-hop flow, using the wrong expected result | Move arithmetic and comparisons into **deterministic code** (as `Test-NdcPrice` already does). The LLM chooses *what* to check; code decides *pass or fail*. Add a **second-opinion check** before filing any defect: a fresh sub-agent sees only the request, the response and the SPEC rule, not the first verdict |
| **Bias** | Confirmation bias (the agent is told "verify bug X" and confirms it); assuming supplier A behaves like supplier B; INFERRED expectations treated as facts | Give the verifier **neutral prompts** ("what does this response show?", not "confirm the bug"). Mark every expectation with a source label: `SPEC` / `LIVE-CONFIRMED` / `INFERRED`, and never file a defect against an `INFERRED` expectation without asking. Keep the supplier-only scope rule (already in memory) and move it to `CLAUDE.md` |
| **Non-determinism** | The same test gives different verdicts across runs; different test cases for the same story; live supplier responses change | (a) Fixed templates and output contracts (Step 5). (b) For defects, **re-run the reproduction twice** before filing, and record whether it is flaky. (c) Log the build/version and timestamp in every run so environment change is separated from AI variance. (d) Measure consistency in Step 6 |
| **Unsafe actions** (already partly covered) | Booking on non-staging, credential leaks | Keep the existing rules. Also scan the repo for committed API keys, since `NdcV1.Extracted.ps1` stores `x-api-key`/`Client-Id`: move secrets to a git-ignored env file |

**How:** add one shared file, `.claude/Skills/_shared/AI_Guardrails.md`, and reference it from every skill's `SKILL.md`, so the rules live in one place. Add one script, `verify-evidence.js`, that checks citations.

| Advantages | Risks → Mitigation |
|---|---|
| Fewer false bugs reach developers, which protects QA credibility | **Slower runs** (second opinion, double reproduction) → apply them only to *defect* verdicts, not to every PASS |
| Verdicts become auditable | **Too strict, so everything ends as UNVERIFIED** → tune on one past run first |
| Separates "the AI is wrong" from "the environment changed" | **Guardrails ignored in long sessions** → enforce with scripts, not only with prose |

**Done when:** you replay the AirArabiaPlus run that produced the retracted BUG-01/02 and the guardrails stop them from being filed, while still catching the real bugs.

---

## Step 5 — Output Optimization (MD, CSV, HTML, XLSX, Docs)

**Problem:** Outputs vary in shape and length, are hard to diff, and are sometimes too long to read.

**Solution:** For every output type, define an **output contract**: a schema plus a template plus a validator script. Keep the pattern you already use for QA reports: **structured data first, documents rendered from it**.

| Output | Source of truth | Contract | Validator |
|---|---|---|---|
| Test cases | CSV | Fixed columns (as in `TestCases_V1.csv`), ID pattern, required SPEC ref, allowed priority values | `validate-csv.js`: column count, duplicate IDs, empty expected results, SPEC refs that exist |
| Run results | JSONL | `log-schema.md` (already exists) | JSON-schema check per line |
| Bug reports | Registry row + MD | Template (already exists) | Required sections present, evidence path exists |
| Reports (MD/HTML) | Rendered from JSONL | Summary first: counts, top risks and blockers in the first 15 lines, details below | Rendered, never hand-written |
| Stakeholder files (XLSX/DOCX) | Rendered from CSV/JSONL | Same columns as the source | Script render, not LLM retyping |

**Rules to add to every skill:**
1. **Pyramid structure:** verdict and counts first, then a table, then details, then raw evidence links.
2. **No numbers typed by the LLM:** counts and percentages come from scripts.
3. **Size budget:** for example, a bug report of 120 lines at most, with large JSON excerpted to the relevant path and linked to the full file.
4. **Diff-friendly:** stable column order and stable IDs, so git diffs show real changes.

| Advantages | Risks → Mitigation |
|---|---|
| Machine-checkable outputs, which also feeds Step 6 metrics | **Rigid templates hide useful findings** → keep a free-text "Observations" section |
| Smaller, readable outputs that cost fewer tokens | **Validator maintenance** → one small script per format, kept in `_shared/` |
| The same data can be rendered for any audience | **Old artifacts do not match the new contract** → apply only to new runs |

**Done when:** every new CSV/JSONL produced by the skills passes its validator without manual fixes.

---

## Step 6 — AI Evaluation Metrics

**Problem:** G6. You cannot tell whether the agent is getting better or worse, or whether a skill change helped.

**Solution:** A small **evaluation set**, plus a metrics script that runs after each run.

**Golden set:** 20–30 past test cases with **human-confirmed** verdicts, mixed across suppliers and including the retracted bugs and known real bugs. Store it in `NDC_Integration/Eval/golden_set.csv`.

| Metric | Formula | Target (initial) | Measures |
|---|---|---|---|
| **Verdict accuracy** | agent verdict = human verdict / total (golden set) | ≥ 90 % | Execute skill quality |
| **Defect precision** | confirmed bugs / bugs filed | ≥ 90 % | False-positive bugs (hallucination) |
| **Retraction rate** | retracted / filed, from the registry | ≤ 5 % | Trust trend over time |
| **Evidence coverage** | verdicts with valid evidence / all verdicts (Step 4 script) | 100 % | Hallucination control |
| **Consistency** | same golden case run twice → same verdict | ≥ 95 % | Non-determinism |
| **Blocked ratio** | blocked / total | Tracked, no target | Environment health vs AI quality |
| **Test-case quality** | % with valid SPEC ref, duplicates, validator pass rate | 100 % valid, 0 duplicates | Generate skill quality |
| **Effort saved** | manual time estimate vs agent time (`render-tb.js` already tracks time) | Tracked | Business value |

**How:**
1. `Eval/compute-metrics.js` reads the run JSONL and the registry and writes `Eval/metrics_history.csv` (one row per run).
2. Run the golden set **after every skill change** (as a regression test for your prompts and skills).
3. **LLM-as-judge**, used only where needed: score test-case *quality* (clarity, coverage) against a written rubric, and calibrate it on 10 cases you scored yourself.

| Advantages | Risks → Mitigation |
|---|---|
| Objective evidence that the framework is trustworthy, useful for management | **Golden set goes stale as the API changes** → review it each sprint and keep it small |
| You detect when a skill edit makes things worse | **LLM-as-judge bias** (lenient or self-favouring) → use it only for quality scoring, never for pass/fail, and calibrate against human scores |
| Separates AI problems from environment problems | **Metric gaming** (e.g. filing fewer bugs to raise precision) → always read precision together with the escaped-defect count |

**Done when:** `metrics_history.csv` has at least 3 runs and you can show the trend.

---

## Step 7 — AI Daily Summary Report

**Problem:** At the end of each day, writing up what was tested, what failed and what is blocked is manual.

**Solution:** A skill, `Daily_Summary`, built from a **script that collects facts** and an **LLM that writes the summary**.

1. **Collect (script):** all JSONL logs for the date, registry changes, metrics rows, and new or changed test-case files from `git log`.
2. **Facts table (script):** runs, TCs executed, pass/fail/blocked, new bugs, bugs fixed or still reproducing, holds/PNRs left open, environments used.
3. **Narrative (LLM):** 5–8 lines covering highlights, risks, blockers and needs from the dev team. **Every sentence must refer to a number in the facts table.**
4. **Output:** `Artifacts/Daily/2026-11-17.md`, short enough to paste into Teams or Slack (≤ 25 lines), plus a link to the full HTML.
5. Optional later: schedule it at the end of the day (the `/schedule` or `/loop` skills) once the format is stable.

**Template:**
```
# Daily QA Summary — <date>
**Status:** 🟢/🟡/🔴  | Runs: N | TCs: X (P/F/B) | New bugs: n | Verified fixed: n
## Highlights
## Risks & Blockers (env, data, supplier)
## Bugs (new / still open / fixed)  -> table with GlobalId, ADO, supplier, severity
## Cleanup needed (open holds / PNRs)
## Tomorrow
```

| Advantages | Risks → Mitigation |
|---|---|
| Saves about 30 minutes a day and gives stakeholders a consistent format | **LLM invents or rounds numbers** → numbers come only from the script; the LLM may not add any |
| Holds left open are always visible | **Summary hides a serious issue** → any P1 or new blocker always appears in the first 5 lines (a template rule) |
| Builds a history that is useful for sprint reviews | **Sensitive data in a shared channel** → no PNR names, keys or raw supplier payloads; PNR codes only if your team allows them |

**Done when:** you have used it for one week without editing any number by hand.

---

## Quick hygiene, before or during Step 1 (about 1 hour)

- Replace the hard-coded `g:\...` and `C:/Users/sheen/...` paths with paths relative to the repo (G7).
- Move stray root files (`f09.out`, `f27.out`, `f74.out`, `slug.txt`) into the harness or delete them.
- Check that no API key, token or password is committed. If one is, rotate it and move it to a git-ignored env file.

---

## Summary roadmap

```
Week 1 : Step 1 KB + CLAUDE.md  ->  Step 2 Prompt Optimizer
Week 2 : Step 3 Bug Registry + Retest_Issues (pilot on AirArabiaPlus_bugs.xlsx)
Week 3 : Step 4 Guardrails  ->  Step 5 Output contracts
Week 4 : Step 6 Eval golden set + metrics  ->  Step 7 Daily summary
```

**Main principle for all steps:** *the LLM decides what to do and writes the words; scripts count, compare and validate; humans approve anything that becomes a "fact" (bugs, SPEC, KB).*
