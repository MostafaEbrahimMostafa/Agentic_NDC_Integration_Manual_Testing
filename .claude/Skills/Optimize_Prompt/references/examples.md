# Optimize Prompt — Before/After Examples (few-shot)

Each example shows a raw request, the optimized prompt, and the questions the skill must ask.
The "before" texts are based on real past runs (run keys in `KB/02_Suppliers/*.md`). Their wording
was rebuilt from run notes, because the original chat text was not saved. Replace or add pairs with
real requests as you collect them. Facts quoted here were true on the date shown. Re-check them
in the KB before reusing them.

Template shape follows `NDC_Integration/Prompts/*_Template.md` for the downstream skill.

---

## Example 1 — execute (missing host and version)

**Before:**
> run the generic smoke on airarabia

**After:**
```
Act as Senior QA for the NDC Integration API.
Context: CLAUDE.md hard rules; KB/02_Suppliers/AirArabiaPlus.md; SPEC.md §2.1 (Search).

Use Execute_Test_cases to run:
- Goal: one smoke verdict per TC-ID for AirArabiaPlus V2 Search.
- Scope: NDC_Integration/TestCases/TestCases_Generic.csv  ❓ which TC-IDs? (the CSV has no rows labelled "smoke")
- Supplier: AirArabiaPlus
- Credentials Selector: ❓ MISSING
- Host: ❓ MISSING
- Version: ❓ MISSING
- Test data: G9 route from KB §2 (e.g. COK-SHJ), date within the G9 schedule, 1 ADT
- Destructive calls: none (Search only)

Constraints: CLAUDE.md rules 1, 3, 4, 5, 9, 10. Supplier-only scope.
Output: Artifacts/Logs/<YYYYMMDD-HHMMSS>_AirArabiaPlus-<Selector>-Smoke-<env>.{jsonl,md,html},
summary table first.
Acceptance: every TC-ID in scope has PASS/FAIL/BLOCKED with a SPEC section cited.
Self-check: every verdict cites the saved response path and the SPEC section; no evidence = UNVERIFIED.
Stop and ask: empty offers[] (re-check once with another date first, rule 10); any host answering 503.
```

**What changed:** supplier name normalised ("airarabia" → `AirArabiaPlus`); "generic" mapped to
`TestCases_Generic.csv`; "smoke" not guessed into a TC list (no such label in the CSV); Search-only
made explicit; output slug and acceptance added.

**Questions:**
1. Which host? Options from `KB/03_Technical/Environments.md`: `stg-ne` (answered normally on
   2026-11-17), `ne-6` (main AirArabiaPlus host, but HTTP 503 on 2026-11-17), `ne-1`.
2. Selector? KB lists only `USA` as active for AirArabiaPlus (Last verified 2026-11-09 / ne-6 /
   AAP-ONEAPI).
3. Version: V2 only, or V1 and V2? (KB has only V2 facts for this supplier.)
4. Which TC-IDs count as "smoke"? E.g. only `TC-SEARCH-POS-01` (the onboarding smoke test in
   `KB/00_Start_Here.md`), or a list you give.

**Next skill:** `Execute_Test_cases`.

---

## Example 2 — retest (ADO ID, host short name)

**Before:**
> verify 65507 again on stg-ne is it fixed?

**After:**
```
Act as Senior QA for the NDC Integration API.
Context: KB/02_Suppliers/AirArabiaPlus.md §known bugs (ADO 65507 = AAP-ONEAPI : BUG-10);
SPEC.md §2.8 (FareCheck), §2.9 (Book), §2.11 (Retrieve).

Use Retest_Issues to re-test one bug:
- Goal: a single verdict for ADO 65507 — Fixed / Still reproduces / Blocked (env/data) /
  Behaviour changed – needs review.
- Bug: ADO 65507 = NDC-BUG-0002 in the Bug Registry (AAP-ONEAPI : BUG-10) — paxTotalAncillaryAmount FareCheck/Book ≠ Retrieve
  (repro: bundle 66589 + paid meal 264.32; grand total equal).
- Supplier: AirArabiaPlus
- Credentials Selector: ❓ MISSING
- Host: https://ndc-integration-stg-ne.azurewebsites.net/ (stg-ne, staging)
- Version: V2
- Destructive calls: ❓ MISSING — the repro needs Book; AirArabiaPlus cannot Void, so each try
  leaves a live ticket.

Constraints: CLAUDE.md rules 2, 3, 4, 8, 9.
Output: Artifacts/Retest/<YYYYMMDD-HHMMSS>_AirArabiaPlus-<Selector>-RCRetest-stg-ne/RC_Retest_Report.md
plus the updated registry row;
verdict table first (ADO, run bug ID, verdict, numbers seen in FareCheck/Book/Retrieve, evidence path).
Acceptance: one verdict with the three amounts quoted from saved responses; Cleanup lists every PNR.
Self-check: "Fixed" only if the repro chain reached Retrieve with bundle 66589 + meal 264.32; if
that combination was not offered, the verdict is Blocked (env/data), not Fixed.
Stop and ask: before the first Book; if the build/version header differs from the last run.
```

**What changed:** ADO ID resolved to the run bug ID from the KB; host short name expanded; the
repro conditions added so a missing offer cannot be read as "Fixed"; four-verdict set added.

**Questions:**
1. Selector? KB: only `USA` active (2026-11-09 / ne-6 / AAP-ONEAPI).
2. Do you authorize Book on stg-ne for this re-test (each try leaves a live, non-voidable ticket)?
3. Note: the last check was 2026-11-16 on stg-ne (Still reproduces). Re-run anyway, or report that
   result if there is no new build?

**Next skill:** `Retest_Issues` (recipe `Harness/recipes/NDC-BUG-0002.json`; approve it first if it is still a draft).

---

## Example 3 — retest (bug sheet, several bugs, then bug reports)

**Before:**
> retest the bugs in the airarabia excel on ne and write bug reports for what still fails

**After:**
```
Act as Senior QA for the NDC Integration API.
Context: KB/02_Suppliers/AirArabiaPlus.md; KB/04_Decisions_and_Lessons.md (retracted bugs).

Chain (pause after step 1 for my review):
1. Use Retest_Issues to re-test every row of Resources/AirArabiaPlus_bugs.xlsx
   (rows resolve by title to NDC-BUG-0001..0010 in the Bug Registry)
   - Supplier: AirArabiaPlus · Selector: ❓ MISSING · Version: V2
   - Host: ❓ MISSING ("ne" is ambiguous: stg-ne or ne-1..ne-8?)
   - Destructive calls: ❓ MISSING (Hold/Book needed for several rows; no Void on this supplier)
   - Verdict per row: Fixed / Still reproduces / Blocked (env/data) / Behaviour changed – needs review
   - Rows written for "[Airline]" (generic): test them against AirArabiaPlus only (rule 4).
2. Use Generate_Bug_Report for rows that still reproduce, under
   Artifacts/BugReports/<slug>/BUG-<NN>_<API>_<FIELD>.md, each quoting its sheet row number.

Output: Artifacts/Retest/<YYYYMMDD-HHMMSS>_AirArabiaPlus-<Selector>-RCRetest-<env>/RC_Retest_Report.md;
first table = sheet row, title, verdict, evidence path.
Acceptance: all rows have a verdict; Cleanup lists every hold/PNR left open.
Self-check: re-run each "Still reproduces" once before filing (non-determinism); no bug report for
rows not reproduced.
Stop and ask: before the first Book/Hold; if a row's expected result is not in SPEC (label INFERRED,
do not file without asking, rule 1).
```

**What changed:** split into a 2-skill chain with a review pause; "ne" flagged as ambiguous;
sheet path made exact; rule 4 attached to the generic rows; double reproduction before filing.

**Questions:**
1. Which host: `stg-ne` (no number) or a numbered `ne-N`?
2. Selector? KB: only `USA` active.
3. Authorize Hold/Book on that host? Holds/tickets will stay open (no Void/Cancel for AirArabiaPlus).

**Next skill:** `Retest_Issues`, then `Generate_Bug_Report`.

---

## Example 4 — generate (feature without a contract)

**Before:**
> write test cases for reissue

**After:**
```
Act as Senior QA for the NDC Integration API.
Context: SPEC.md (no Re-Issue section yet); existing suite NDC_Integration/TestCases/Reissue/
(see Reissue_Traceability_Matrix.md).

Use Generate_Test_Cases to produce test cases for:
- Goal: ❓ MISSING — new suite, or only the gaps in the existing Reissue/ suite?
- Scope: Re-Issue — ❓ which part (search/change criteria, review, commit, pricing, security...)?
- Version: ❓ MISSING (V1 / V2 / Both)
- Source: ❓ MISSING — user story / contract file. SPEC.md has no Re-Issue section, so every
  expected result would be INFERRED.
- Output: append to NDC_Integration/TestCases/Reissue/<file>.csv using the TestCases_V1.csv columns
  and house titles (Azure Sample Test Cases.md); no duplicate TC-IDs with Reissue_TestCases_All.csv.

Acceptance: every row has a SPEC ref or is labelled INFERRED with the source named; priorities P0-P3.
Stop and ask: any expected value not in a shared source; scope larger than one sub-area.
```

**What changed:** found the existing `TestCases/Reissue/` suite so the request is not duplicated;
flagged that SPEC has no Re-Issue contract; output location and duplicate check added.

**Questions:**
1. Is there a Re-Issue contract or user story to use as the source? If it is a user story, run
   `Analyze_User_Story` first.
2. New cases for which sub-area, or a gap review of the existing 12 area CSVs
   (`01_`..`12_`, combined in `Reissue_TestCases_All.csv`)?
3. Version: V1, V2, or both?

**Next skill:** `Analyze_User_Story` (if a story file exists), else `Generate_Test_Cases`.

---

## Example 5 — report (ambiguous run)

**Before:**
> make the html report for the galileo run

**After:**
```
Use Generate_QA_Report to regenerate the report from existing logs:
- Run slug: ❓ MISSING
- Source: NDC_Integration/Artifacts/Logs/<slug>.jsonl
- Action: rebuild .md from the full .jsonl, then .html (run already finished)
- Output: Artifacts/Logs/<slug>.md and <slug>.html next to the .jsonl; summary first.
Constraints: redact supplierRequest/supplierResponse (rule 3); never hand-patch the .md.
Stop and ask: if more than one candidate log matches.
```

**What changed:** mapped to the regenerate action of `Generate_QA_Report`; output paths made exact.

**Questions:**
1. Which Galileo run? The only Galileo log in `Artifacts/Logs/` is the SeatMap Round 22 run
   (`20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment`). The Availability rounds
   GAL-R1..R4 and GAL-RTMC are **not in the repo** (see `KB/02_Suppliers/README.md`). Which one do
   you mean? If it is a missing one, its `.jsonl` must be restored first.

**Next skill:** `Generate_QA_Report`.

---

## Example 6 — skip (already complete or a one-liner)

**Before:**
> where is the Galileo KB file?

**Result:** skip the skill. Answer directly: `NDC_Integration/KB/02_Suppliers/Galileo.md`.

**Before:** a filled `Execute_Test_Cases_Prompt_Template.md` with scope, host, supplier, selector
and version all set.

**Result:** skip the rewrite. Say "All required slots are filled", list nothing to change, and hand
over to `Execute_Test_cases` after the user says "go".
