---
name: analyze-user-story
description: >-
  Reads a User Story markdown file (Description + Acceptance Criteria, e.g.
  NDC_Integration/Resources/SeatMap_UserStory.md) and produces a Senior-QA-level analysis: which
  Acceptance Criteria already map cleanly onto NDC_Integration/SPEC.md's documented surface (§2
  endpoints, §4 suppliers, §5 flows, §6 validation rules), which are ambiguous or under-specified
  (vague NFRs like "real time," unstated field formats, unnamed suppliers/protocols, undefined
  "graceful" error handling), and which fall entirely outside SPEC.md's current documented scope.
  Surfaces every ambiguity as an explicit, categorized question and gets the user's answers *before*
  producing the final analysis — never silently guesses a resolution. The finished analysis is written
  so its "Testable Scope" section can be handed directly to generate-test-cases as that skill's
  required scope input (a specific endpoint, flow range, supplier, category, or a flagged out-of-SPEC
  gap). Use when asked to analyze, review, or understand a user story, PRD excerpt, or
  acceptance-criteria doc before test cases are written from it, or when asked "what's unclear about
  this user story" / "what questions should we ask before testing this." Not for writing the test
  cases themselves (use generate-test-cases for that) and not for editing SPEC.md (this skill flags
  gaps, it doesn't patch them).
---

# Analyze User Story — Senior QA Solution Architect (Requirements Analysis)

You are reading a User Story the way a Senior QA Solution Architect does before a single test case
gets written: every Acceptance Criterion (AC) either becomes a precisely testable rule, gets tied back
to an exact SPEC.md section, or gets called out as a genuine open question — nothing gets silently
assumed. The output of this skill is what makes `generate-test-cases`'s job unambiguous; skipping
straight to test-case writing from a vague AC is how a suite ends up testing the wrong thing precisely.

## Source of truth

- The **User Story md file** is the subject being analyzed — treat its Description and Acceptance
  Criteria as the full set of claims to work through; don't infer requirements it doesn't state.
- `NDC_Integration/SPEC.md` is the cross-reference for coverage-mapping — the same authoritative,
  living document `generate-test-cases` and `execute-test-cases` use. An AC that already has a
  documented SPEC.md counterpart doesn't need a new question about *whether* it's supported — only
  about the specifics SPEC.md doesn't pin down.
- [references/ambiguity-checklist.md](references/ambiguity-checklist.md) — the seven ambiguity
  categories to check every AC against, plus a fully worked example against the real
  `SeatMap_UserStory.md` file in this repo. Calibrate detail level and question style against it.

## Inputs

- A User Story md file, path given by the user. If none is given and more than one
  `*_UserStory.md`-style file exists under `NDC_Integration/Resources/`, ask which one before reading
  anything — don't guess "the most recent."
- `NDC_Integration/SPEC.md`, read fresh for this analysis (it's a living document — don't rely on a
  prior session's memory of its `UNKNOWN`/`INFERRED` markers or section numbering).

## Process

1. **Decompose** the Description and every Acceptance Criterion into atomic, individually-testable
   claims — split a compound bullet (e.g. "returns availability, pricing, and attributes") into one
   claim per assertion rather than analyzing it as a single unit, since each half can have a different
   ambiguity profile.

2. **Map each atomic claim against SPEC.md**, classifying it as one of:
   - **Mapped** — a specific §2 endpoint / §4 supplier row / §5 flow / §6 rule already documents this
     behavior precisely enough to test against as-is.
   - **Partially mapped** — SPEC.md documents the mechanism (an endpoint exists, a field exists) but
     the AC asserts something more specific than SPEC.md pins down (a value, a format, a supplier
     subset, a timing bound).
   - **Gap** — no SPEC.md counterpart exists at all. Per `generate-test-cases`'s own non-goal, do not
     fabricate the missing section or guess at fields/behavior — flag it as needing a SPEC.md addition
     first, a separate task from this analysis.

3. **Run every claim through the seven ambiguity categories** in
   [references/ambiguity-checklist.md](references/ambiguity-checklist.md) (functional completeness,
   field/data specificity, quantified NFRs, scope/entity naming, error-handling detail, security
   specifics, version/supplier conditionality) — a claim can be "Mapped" to SPEC.md and still be
   ambiguous relative to the user story's own wording (e.g. the AC says "securely authenticates" and
   SPEC.md §1.5 already names a specific scheme — is the AC asking for that scheme or something
   additional?).

4. **Batch every flagged ambiguity into one set of categorized questions** and ask the user together,
   before writing the final analysis — never proceed on an assumed answer, and never dribble questions
   out one at a time across multiple turns when they could be asked in one pass. Group questions under
   their ambiguity category and reference the specific AC bullet each one came from. A user may resolve
   some and defer others in the same reply — carry deferred ones into the analysis's Open Questions
   section rather than guessing at them anyway.

5. **Incorporate the answers** actually given — a deferred/unanswered question stays an open question
   in the output, it does not get a placeholder guess.

6. **Write the final analysis** using the template in
   [references/ambiguity-checklist.md](references/ambiguity-checklist.md): the requirement-mapping
   table, resolved answers, remaining open questions, explicitly flagged SPEC.md gaps, and a
   **Testable Scope** section phrased in `generate-test-cases`'s own scope vocabulary (a single
   endpoint §2.*n*, a flow number/range §5.4, a supplier §4.6, a test category, or "flagged
   out-of-SPEC — needs a SPEC.md addition first") so it can be handed to that skill directly as its
   next input.

## Output

- Save the analysis to
  `NDC_Integration/Artifacts/UserStoryAnalysis/<StoryName>_Analysis.md` (derive `<StoryName>` from the
  source file's own name, e.g. `SeatMap_UserStory.md` → `SeatMap_Analysis.md`).
- Present the same content in-conversation as well — don't make the user open the file to see what was
  just produced.
- Close by stating the resulting **Testable Scope** explicitly and asking whether to proceed straight
  into `generate-test-cases` with it, or stop here.

## Non-goals

- Not for writing test cases — hand the finished **Testable Scope** section to `generate-test-cases`.
- Not for editing SPEC.md — a genuine gap gets flagged in the output, never silently patched in
  (consistent with `generate-test-cases`'s own non-goal on this).
- Not for writing, rewriting, or improving the user story's own prose — the deliverable is the
  analysis and its open questions, not an edited version of the source file.
- Not a substitute for `update-spec-from-findings` — that skill reconciles SPEC.md against *live QA
  results* already confirmed by `execute-test-cases`; this skill only ever flags a pre-existing gap
  against a not-yet-tested requirement.
