# Analyze User Story — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to get a Senior-QA-level
requirements analysis of a user story before any test cases get written from it.

---

Use Analyze_User_Story on `NDC_Integration/Resources/[UserStoryFileName].md` against the
current `NDC_Integration/SPEC.md`.

1. Decompose the Description and every Acceptance Criterion into atomic, individually-testable
   claims.
2. Map each claim against SPEC.md as **Mapped**, **Partially mapped**, or **Gap**.
3. Run every claim through the seven ambiguity categories (functional completeness, field/data
   specificity, quantified NFRs, scope/entity naming, error-handling detail, security specifics,
   version/supplier conditionality).
4. Batch every flagged ambiguity into one set of categorized questions and ask me — don't guess
   an answer or dribble questions out one at a time.
5. Once I answer (or explicitly defer some), write the final analysis: requirement-mapping
   table, resolved answers, remaining open questions, flagged SPEC.md gaps, and a **Testable
   Scope** section.

Save the analysis to `NDC_Integration/Artifacts/UserStoryAnalysis/[StoryName]_Analysis.md` and
show it in-conversation too. Close by stating the Testable Scope and asking whether to proceed
straight into Generate_Test_Cases with it, or stop here.

**Stop and ask me, don't guess:**
- any ambiguity in the seven categories above
- if more than one `*_UserStory.md` file matches and none was named
- if an Acceptance Criterion falls entirely outside SPEC.md's documented scope — flag it, don't
  invent the missing section

---

## Notes for filling this in

- `[UserStoryFileName]` — a file under `NDC_Integration/Resources/*_UserStory.md` (e.g.
  `SeatMap_UserStory`), without the `.md` extension.
- `[StoryName]` — derive from the same file name (e.g. `SeatMap_UserStory.md` →
  `SeatMap_Analysis.md`).
- This skill never edits SPEC.md and never writes the test cases itself — its output (the
  Testable Scope) is meant to be handed to `Generate_Test_Cases_Prompt_Template.md` next.
- If you already know the exact Testable Scope and want to skip this analysis, go straight to
  the Generate Test Cases prompt instead.
