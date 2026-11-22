# CLAUDE.md — NDC Integration API, Agentic QA

This file is an **index, not a copy**. It tells you the rules and where to look. Facts live in
`NDC_Integration/KB/` and `NDC_Integration/SPEC.md`; open them on demand, not all at once.

## What this repo is

Manual + agentic QA for the **NDC Integration API**: one JSON contract (V1 and V2) in front of
~40 airline/GDS suppliers. Requests are scoped by `supplier` + `credentialsSelector` in the body.
New member? Read `NDC_Integration/KB/00_Start_Here.md`.

## Where to look

| Need | Read |
|---|---|
| Expected results, endpoint contracts, flows 1-89, validation rules | `NDC_Integration/SPEC.md` (§2 endpoints, §4 suppliers, §5 flows, §6 validation) |
| Domain words (PNR, Hold, Void, bundle, selector...) | `NDC_Integration/KB/01_Business/Domain_Glossary.md` |
| Booking chain and states | `NDC_Integration/KB/01_Business/Booking_Lifecycle.md` |
| **Supplier X: live capabilities, routes, known bugs, gotchas** | `NDC_Integration/KB/02_Suppliers/X.md` (index: `02_Suppliers/README.md`) |
| Hosts ne, ne-1..ne-8, supplier-integration | `NDC_Integration/KB/03_Technical/Environments.md` |
| Architecture, error envelopes | `NDC_Integration/KB/03_Technical/Architecture.md` |
| Harness (PowerShell V1, Node V2, per-supplier folders) | `NDC_Integration/KB/03_Technical/Harness_Guide.md` |
| Run a Postman collection through the Postman MCP server (setup, IDs, safety) | `NDC_Integration/KB/03_Technical/Postman_MCP_Guide.md` |
| Retracted bugs, wrong assumptions, "why we do X" | `NDC_Integration/KB/04_Decisions_and_Lessons.md` |
| Skills (Analyze → Generate → Execute → Report → Bug → Update Spec) | `.claude/Skills/<Skill>/SKILL.md`, prompts in `NDC_Integration/Prompts/` |
| Vague run / retest / generate request (missing supplier, host, selector, version, scope) | `.claude/Skills/Optimize_Prompt/SKILL.md` — rewrites it and asks; never executes |
| Test cases / run outputs | `NDC_Integration/TestCases/`, `NDC_Integration/Artifacts/{Logs,BugReports}/` |
| **All known defects** (Global ID, ADO id, per-run ids, status, last verification) | `NDC_Integration/Artifacts/Registry/Bug_Registry.csv` — change only via `NDC_Integration/Harness/Retest/registry.js` |
| **Output contracts**: CSV / JSONL / bug report / report MD shape, pyramid summary, size budget, XLSX & DOCX renders | `.claude/Skills/_shared/Output_Contracts.md`; check any output with `node .claude/Skills/_shared/scripts/validate-output.js <file>`; test `.claude/Skills/_shared/tests/output-contracts.test.js` |
| **AI guardrails**: evidence refs, source labels, double repro, second opinion, defect gate | `.claude/Skills/_shared/AI_Guardrails.md`; checker `node .claude/Skills/_shared/scripts/verify-evidence.js <log>.jsonl`; test `.claude/Skills/_shared/tests/replay-aap-r1.test.js` |
| Re-test bugs / RC regression ("is bug X fixed?", a bug sheet, ADO ids) | `.claude/Skills/Retest_Issues/SKILL.md` — repro recipes in `NDC_Integration/Harness/recipes/`, one runner `Harness/Retest/runner.js`; reports in `Artifacts/Retest/` |

## Hard rules (always apply)

1. **SPEC.md is the oracle.** Never invent an expected result. Label anything not in SPEC or not
   confirmed live as `UNKNOWN` or `INFERRED`. Never file a defect against an `INFERRED` expectation
   without asking the user.
2. **No Book / BookAfterHold / Void / CancelAfterHold on a non-staging host** without explicit
   authorization in this conversation. `ndc-supplier-integration` is **not** staging.
3. **Never print or commit secrets**: the API key, supplier usernames/passwords,
   `supplierRequest` / `supplierResponse` / `OriginalSupplierRequest` bodies. The key lives only in
   the git-ignored repo-root `.env` (`NDC_API_KEY`, template `.env.example`); harnesses read it from
   there and Postman uses `{{x_api_key}}`. Never hard-code it in a file or repeat it in chat,
   reports, KB or commits. If `.env` is missing, ask the user — do not search git history for it.
4. **Supplier-only scope.** A run for supplier X sends nothing to other suppliers. Rows that need
   another supplier are `BLOCKED (out of scope)`. Exception: suites designed cross-supplier
   (e.g. `VoidUnified_TestCases.csv`) — confirm with the user first.
5. **Ask, don't default**, when supplier, environment, selector or version is missing.
6. **"V1 AND V2" means both.** A "Both" row passes only if V1 and V2 both pass.
7. **The countable unit is one test case (TC-ID)**, never a hop inside a flow.
8. **List every live hold/PNR you leave behind** in the run report's Cleanup section.
9. **Run supplier calls sequentially** unless the supplier file says parallel is safe. Parallel
   load caused false failures on Sabre, Galileo, AirArabiaPlus, FlyAdeal and TravelportNdc.
10. **One empty `offers: []` is not proof of no inventory.** Re-check before concluding.
11. **No defect is filed unless `verify-evidence.js` gates it `FILE`**: the cited evidence holds,
    the SPEC rule is quoted verbatim and is not INFERRED/UNKNOWN, it was reproduced twice, and a
    fresh sub-agent's second opinion agrees. Every verdict cites evidence, and every run logs its
    `build`. Rules: `.claude/Skills/_shared/AI_Guardrails.md`.

## Using the Knowledge Base

- Every KB fact carries `Last verified: <date> / <env> / <run slug>`. **If a fact is older than
  14 days, or from a different host than the one you are testing, re-check it live before relying
  on it** (suppliers change between builds; see Build A vs B in `04_Decisions_and_Lessons.md`).
- Bug IDs like `BUG-07` are **per run**. Always quote them with the run slug. The permanent ID is
  the registry's `NDC-BUG-nnnn` (never reused); quote it whenever a bug has one.
- The KB links to SPEC sections; it never duplicates SPEC text. If KB and SPEC disagree, report the
  conflict — do not silently pick one.
- After a run, `Update_Spec_From_Findings` ends with a **KB update proposal** (step 9). KB edits,
  like SPEC edits, need the user's approval.

## Conventions

- Run slug: `YYYYMMDD-HHMMSS_<Supplier>-<Selector>-<Scope>[-RoundN]-<env>`.
- Test-case CSVs follow `TestCases_V1.csv` columns and
  `.claude/Skills/Generate_Test_Cases/references/test-case-template.md` (titles: `Azure Sample Test Cases.md`).
- Windows PowerShell 5.1 reads `.ps1` as ANSI: keep harness `.ps1` files ASCII-only.
- Write JS/regex with the Write/Edit tools, not shell heredocs (backslashes and `\n` get mangled).
- Use repo-relative paths. Do not add machine-specific absolute paths.
- **Outputs (Step 5):** data first, documents rendered from it. Verdict and counts come first, and
  every number comes from a script. Never hand-edit a rendered `.md`/`.html`/`.xlsx`/`.docx`;
  append to the JSONL or fix the CSV, then re-render. A new output is done only when
  `validate-output.js` passes on it. Rules: `.claude/Skills/_shared/Output_Contracts.md`.
