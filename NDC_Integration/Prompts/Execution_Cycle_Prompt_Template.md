# Execution Cycle — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to start a full cycle:
Analyze_User_Story → Generate_Test_Cases → Execute_Test_cases (which internally triggers
Generate_QA_Report live and Generate_Bug_Report for any defects at the end).

---

Run the full QA execution cycle for `[UserStoryFileName].md`:

1. **Analyze** — Use Analyze_User_Story on
   `NDC_Integration/Resources/[UserStoryFileName].md` against the current SPEC.md. Batch any
   ambiguity questions and ask me before finalizing. Close by stating the Testable Scope.
2. **Generate** — Using that Testable Scope, use Generate_Test_Cases to produce test cases
   for version **[V1 / V2 / Both]**. Append to `TestCases_<Version>.csv` and refresh the
   matching HTML report.
3. **Execute** — Use Execute_Test_cases to run the generated test cases against:
   - Environment: **[staging (default) / other — name it]**
   - Supplier: **[SupplierName]**
   - Credentials Selector: **[Selector]**

   Report live, one step/test case at a time. This automatically persists results via
   Generate_QA_Report (live `.md`/`.jsonl`, final `.html` at run end) and files
   Generate_Bug_Report for every defect found once the run closes — no separate ask needed.

**Move between steps 1→3 without pausing for my go-ahead, except:**
- stop and ask if the analysis surfaces open questions/ambiguities (don't guess an answer)
- stop and ask before any Book / BookAfterHold / Void / CancelAfterHold call against a
  non-staging `baseUrl`
- stop and ask if test-case/flow scope is itself ambiguous (which supplier, environment, or
  credentialsSelector to use)
- stop if a SPEC.md gap is flagged (out-of-scope acceptance criteria) — that needs a decision
  before test cases can be generated for it

---

## Notes for filling this in

- `[UserStoryFileName]` — a file under `NDC_Integration/Resources/*_UserStory.md` (e.g.
  `SeatMap_UserStory`).
- Version scope — `Both` unless the story is version-specific.
- Environment — omit/leave as staging unless you're explicitly authorizing a different target;
  non-staging changes the safety rules in Execute_Test_cases.
- If you already know the exact Testable Scope (endpoint/flow/supplier) and want to skip
  step 1, say so explicitly and start directly at "Generate" — otherwise Analyze always runs
  first so scope isn't guessed.
- After the run, if any `UNKNOWN` in SPEC.md got confirmed live, Execute_Test_cases will
  propose an edit — that still needs your confirmation (or run `Update_Spec_From_Findings`
  separately afterward to reconcile any pending proposals).
