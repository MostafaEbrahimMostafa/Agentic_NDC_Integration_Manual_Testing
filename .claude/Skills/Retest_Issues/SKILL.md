---
name: retest-issues
description: >-
  Re-tests a list of known defects for a release candidate (RC regression) with ONE command instead
  of hand-written per-round scripts. Input is a list of IDs (Global NDC-BUG-nnnn, ADO ids such as
  65507, or <run slug>:BUG-NN) or a bug sheet (.xlsx/.csv such as Resources/AirArabiaPlus_bugs.xlsx).
  Resolves every ID through the Bug Registry (NDC_Integration/Artifacts/Bug_Registry.csv), loads each
  bug's repro recipe (NDC_Integration/Harness/recipes/<GlobalId>.json - the bug described as data:
  test data, call chain, assertions), drafts a recipe from the bug report when one is missing and asks
  the user to approve it once, pre-flights the test data so "no flights" becomes Blocked instead of
  Fixed, runs every recipe through the generic runner (NDC_Integration/Harness/Retest/runner.js),
  gives each bug a code-decided verdict (Fixed / Still reproduces / Blocked (env/data) / Behaviour
  changed – needs review), runs the neighbour flows (regression ring), writes an RC Re-Test report
  with the summary table first, and updates the registry rows. Use when asked to "retest", "re-verify",
  "check if fixed", "verify these bugs on <host>", "RC regression", or to re-run a bug sheet or a list
  of ADO ids. Not for running test-case CSVs (Execute_Test_cases) and not for writing bug reports
  (Generate_Bug_Report).
---

# Retest Issues — RC Re-Test from the Bug Registry

Every re-test used to mean a new script (`make_bug18_retest.js`, `verify10d.js`, `bugs_r4.js` …) and
bug IDs restarted at BUG-01 in every run, so "is bug X fixed in this RC?" had no direct answer. This
skill answers it from two pieces of data:

- **Bug Registry** — `NDC_Integration/Artifacts/Bug_Registry.csv`, one row per real defect with a
  permanent `GlobalId` (`NDC-BUG-0042`, never reused), its ADO id, every per-run id it had, status
  and last verification. Every change is also appended to `Bug_Registry_History.jsonl`.
  Format: [references/registry-format.md](references/registry-format.md).
- **Repro recipe** — `NDC_Integration/Harness/recipes/<GlobalId>.json`: the bug as data (test data,
  chain of calls, the fixed-state assertions and the bug signature). Written once, approved once,
  reused for every RC. Format: [references/recipe-format.md](references/recipe-format.md).

**The runner decides pass/fail, not you.** You choose what to run and you write the words around the
result. You never re-judge a verdict from the responses, never type counts by hand, and never change
an assertion to get a different verdict (KB `04_Decisions_and_Lessons.md` D-04).

## Inputs (ask, don't default — CLAUDE.md rule 5)

| Slot | Required | Notes |
|---|---|---|
| Bug list | yes | IDs (`NDC-BUG-0007`, `65507`, `<run slug>:BUG-07`) or a sheet path. A bare `BUG-07` is refused: ask for its run slug (the KB supplier file's Run history maps run keys to slugs). |
| Supplier | yes | One supplier per run (rule 4). Bugs of other suppliers are skipped as `BLOCKED (out of scope)`. |
| Host | yes | Full URL. Resolve short names (`stg-ne`, `ne-6` …) with `KB/03_Technical/Environments.md`; "ne" alone is ambiguous — ask. |
| Selector | optional | Defaults to each recipe's selector; if given, recipes for another selector are skipped. |
| Booking authorization | when the plan has Hold/Book/BookAfterHold/CancelAfterHold/Void | Ask explicitly; list how many PNRs will be left open. Non-staging hosts need a second explicit yes (rule 2). |
| Build / RC label | recommended | Recorded in every verdict and in the registry's `LastVerified`. |
| Regression ring | default on | `--no-neighbours` only if the user says so. |

Before running, read the supplier's KB file (`KB/02_Suppliers/<Supplier>.md`) for gotchas, and check
the registry's `LastVerified`: if the same bug was verified on the same host less than ~15 minutes
ago and no new build was named, report that result instead of re-running (re-runs only add
leftover PNRs — KB AirArabiaPlus §5).

## Procedure

All commands run from the repo root. `R=NDC_Integration/Harness/Retest`.

1. **Plan (no API calls).**
   `node $R/runner.js plan --supplier <S> --host <url> (--ids "<a,b>" | --sheet <file>) [--selector <C>]`
   It prints, per input: the GlobalId it resolved to, the recipe and its state, the chain, the test
   data, the neighbour flows, and every live booking step. Show the user a short version of it.
2. **Fix the gaps the plan shows.**
   - *Unresolved input* (no registry row): find the bug report (`Artifacts/BugReports/<slug>/`, the
     sheet's Description/Repro Steps, the KB supplier file). If it is a real defect not yet in the
     registry, add it: `node $R/registry.js add --title "..." --supplier S --env E --selector C
     --version V2 --severity <sev> --run "<slug>:BUG-NN" [--ado N]`. If it is a known bug under
     another title, link it instead (`registry.js link <GlobalId> --alt-title "..."` or `--ado` /
     `--run`). Never create a second row for the same defect.
   - *No recipe*: draft `recipes/<GlobalId>.json` from the bug report's steps, actual and expected
     result, following [references/recipe-format.md](references/recipe-format.md). Mandatory: a
     `reproduces` block (the bug signature — the negative case) next to `assert`, and preconditions
     that turn "the repro condition was not available" into Blocked. Run
     `node $R/recipe.js validate <GlobalId>`.
   - *Draft / changed-after-approval recipe*: show the user the recipe (chain, preconditions,
     assert, reproduces, notes) and where the expected value comes from (SPEC section, live-confirmed
     KB fact, or the bug sheet). If the expectation is not in SPEC and not live-confirmed, say so —
     never approve on the user's behalf. On a clear yes:
     `node $R/recipe.js approve <GlobalId> --by "<user's name>"`. Approval is needed **once**; any
     later edit to the recipe needs a new approval.
3. **Get booking authorization** if the plan lists live booking steps: say how many Hold/Book calls
   and which PNRs will stay open (no Void/Cancel on several suppliers). Without a clear yes, offer
   to run only the recipes without booking steps (`--ids` subset).
4. **Run.**
   `node $R/runner.js run <same args> [--allow-booking] [--non-staging-ok] --build "<RC label>"`
   - Sequential, one call at a time (rule 9). Pre-flight reuses
     `Validate_TestData_Search`'s sweep script read-only (falls back to a built-in Search with the
     same PASS rule if the script cannot run) plus one re-check (rule 10); a fixture with no offers
     makes its bugs **Blocked (env/data)** without running the chain. Fix the fixture with
     `Validate_TestData_Search -Repair`, never by editing the recipe's assertions.
   - Transport errors are retried, never judged. Full scrubbed request/response pairs are saved as
     evidence (`x-api-key` and raw supplier payloads redacted, SPEC 7.14).
   - `--allow-draft` is for a trial run of unapproved recipes only: the report is marked and the
     registry is not updated for them.
5. **Report back** from `NDC_Integration/Artifacts/Retest/<slug>/RC_Retest_Report.md` (rendered by
   the runner from `retest.jsonl`): paste the summary table, then
   - every **Fixed-Pending-Signoff** bug (Critical/High/unrated): a human checks the evidence and
     runs `node $R/registry.js signoff <GlobalId> --by "<name>"` — you never sign off;
   - every **Behaviour changed – needs review** bug with the assertion rows that did not match;
   - the **Cleanup** list of open holds/PNRs (rule 8);
   - inputs that were not re-tested and why.
6. **Follow-ups (ask first).** Still-reproducing bugs that need a fresh ticket →
   `Generate_Bug_Report` (it links the new run id to the existing GlobalId). New supplier facts →
   `Update_Spec_From_Findings` step 9 (KB proposal). A recipe that proved wrong → edit it, re-approve,
   and note why in the recipe's `notes`.

## Verdicts and registry status (set by the runner)

| Verdict | When | Registry `Status` |
|---|---|---|
| **Fixed** | every fixed-state assertion passes and the bug signature does not match | `Fixed-Verified` for Medium/Low; `Fixed-Pending-Signoff` for Critical/High/unrated (human signs off) |
| **Still reproduces** | the bug signature matches and the fixed state does not | `Still-Reproduces` (host added to `Env`) |
| **Blocked (env/data)** | pre-flight found no offers, Search/transport failed, a precondition failed (e.g. bundle or meal not offered), or a needed step did not run | `Blocked` |
| **Behaviour changed – needs review** | neither or both of fixed state / signature match, or the chain broke at a step the recipe expected to work | unchanged |

`LastVerdict` and `LastVerified` (`<date>, <env>, build <label>, <run slug>`) are updated for every
approved recipe. Each change is appended to `Bug_Registry_History.jsonl` (the daily summary and the
metrics steps read it).

## Rules

- The registry is shared: never reorder or rewrite rows by hand-editing the CSV; use `registry.js`
  (one row changes per command, history appended). Never reuse or renumber a GlobalId.
- `Retracted` rows are never re-tested; they stay for history (retraction rate).
- One supplier per run. A recipe may override `credentialsSelector` (e.g. a cross-tenant check) but
  never `supplier`.
- Do not delete old per-round scripts and do not convert them in bulk: write a recipe only when a
  bug is next re-tested.
- The report and registry must never contain the API key, supplier credentials or raw
  `supplierRequest`/`supplierResponse` bodies.
- **AI guardrails** ([`../_shared/AI_Guardrails.md`](../_shared/AI_Guardrails.md)):
  - G-3 neutral reading: a request worded "verify bug X is still there" never changes how you read
    the result. The runner's verdict stands.
  - G-4c build: always pass `--build` (an RC label, or `"not exposed"`), so every verdict and
    `LastVerified` names the build.
  - G-1: a recipe's expected value carries its source in `notes` (`SPEC §x` with the quote,
    `LIVE-CONFIRMED <KB file>`, or `INFERRED`). Do not approve an `INFERRED` recipe without saying so
    to the user.
  - A still-reproducing bug sent on to `Generate_Bug_Report` must pass the guardrail gate there.
- **Output contract** ([`../_shared/Output_Contracts.md`](../_shared/Output_Contracts.md)): the RC
  Re-Test report is rendered by the runner with its summary table first (O-1); quote its counts as
  printed, never re-counted (O-2). Change the registry only through `registry.js` (O-4). A
  stakeholder sheet of the registry or a Word copy of the report, if asked, is a render:
  `render-xlsx.js NDC_Integration/Artifacts/Bug_Registry.csv` or `render-docx.js <report>.md`, each
  followed by `validate-output.js <file> --source <src>`.
    The two runner evidence files from two RC runs count as its two reproductions.

## Non-goals

- Not a test-case runner (that is `Execute_Test_cases` with a CSV) and not a bug-report writer.
- Not for V1 chains yet: the generic runner supports V2 steps only. For a V1 bug, say so and use
  `Execute_Test_cases` with the bug's repro steps.
- Never files anything in ADO; it only updates the repo registry.
