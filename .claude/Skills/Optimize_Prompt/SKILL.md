---
name: optimize-prompt
description: >-
  Turns a raw, free-text QA request for the NDC Integration API ("run the smoke on AirArabiaPlus",
  "retest ADO 65507", "write Re-Issue test cases", "make the report for the Galileo run") into a
  structured, complete prompt BEFORE any other skill runs. Classifies the task type (generate /
  execute / retest / report, plus analyze / bug / spec-update / testdata-sweep), fills the required
  slots (Goal, Scope, Supplier/Env/Selector/Version, Inputs, Constraints, Output format, Acceptance,
  Stop-and-ask rules) only from what the user said or what the repo states, lists every empty
  required slot as a question instead of guessing, links KB/SPEC sections instead of pasting them,
  splits a large ask into an ordered chain of skill calls, and names the next skill to call. Shows
  the before/after and waits for the user's confirmation. It only rewrites the request: it never
  calls the API, runs a harness, or edits any file. Use when the user asks to "optimize", "improve",
  "structure", or "complete" a prompt or request, or when a request to run, retest, or generate test
  cases is missing supplier, environment, selector, version, scope, or output format. Skip it for
  one-line tasks that are already complete.
---

# Optimize Prompt — Request Rewriter (no execution)

Vague requests are the cheapest place to stop a wrong run. A missing host, a guessed selector, or
"V1" when the user meant "V1 and V2" turns into hours of wasted calls and leftover holds. This skill
rewrites the request into a complete, structured prompt **before** any other skill runs, and turns
every gap into a question.

**This skill only rewrites. It never executes.** No API call, no harness script, no file write, no
SPEC/KB edit. The only tools it may use are read-only lookups (open `CLAUDE.md`, a KB file, a SPEC
section heading, list a folder) to name the right file or section and check that a path exists.

## When to use it — and when to skip it

| Use it | Skip it (answer or run directly) |
|---|---|
| A test run, retest, or test-case generation request | One-line questions ("what is a PNR?", "where is the Galileo KB file?") |
| Any request missing supplier, host, selector, version, or scope | A request that already fills every required slot for its type |
| A large ask that needs several skills in order | A request that already uses a filled template from `NDC_Integration/Prompts/` |
| The user says "optimize / improve / structure this prompt" | Follow-ups inside a run that already has its slots fixed |

If you skip it, still apply `CLAUDE.md` hard rule 5 (ask, don't default).

## Sources (read on demand, never paste in full)

- `CLAUDE.md` — hard rules and the "Where to look" map. Stop-and-ask rules come from here.
- `NDC_Integration/KB/02_Suppliers/<Supplier>.md` — active selectors, hosts, known bugs (with
  `ADO` ↔ run bug ID), so a slot can be **suggested** as an option. Index: `02_Suppliers/README.md`.
- `NDC_Integration/KB/03_Technical/Environments.md` — host short names (`stg-ne`, `ne-1`..`ne-8`,
  `supplier-integration`) and which hosts are **not** staging.
- `NDC_Integration/SPEC.md` — section numbers only (§2 endpoints, §4 suppliers, §5 flows, §6 rules).
- `NDC_Integration/Prompts/*_Template.md` — the house template for each downstream skill. The
  optimized prompt follows the template of the skill it will call.
- [references/examples.md](references/examples.md) — before/after pairs per task type (few-shot).
  Match their level of detail.

## Required slots per task type

Common slots for every type: **Goal · Scope · Inputs · Constraints · Output format · Acceptance ·
Stop-and-ask rules.** Extra required slots:

| Task type | Next skill | Extra required slots | Optional slots |
|---|---|---|---|
| **generate** | `Generate_Test_Cases` (or `Analyze_User_Story` first if the source is a user story) | Scope = one bounded thing (endpoint / flow or range / supplier / category / named feature); **Version** (V1 / V2 / Both); source (SPEC sections or user-story file); target CSV path | Supplier (only if supplier-specific); priority split; category list |
| **execute** | `Execute_Test_cases` (→ `Generate_QA_Report`, `Generate_Bug_Report` automatically) | Scope (CSV file + TC-IDs or "all"); **Supplier**; **Selector**; **Host** (full URL or KB short name); **Version**; **Destructive calls** allowed or not (Book / BookAfterHold / Void / CancelAfterHold) | Test-data file or route/date/pax; carrier preference; run slug tag; round number |
| **retest** | `Retest_Issues` (registry + repro recipes + generic runner; V1 bugs: `Execute_Test_cases`) | Bug list (Global IDs `NDC-BUG-nnnn`, ADO IDs, run bug IDs **with run slug**, or a sheet path); **Supplier**; **Host**; **Destructive calls** allowed or not (Hold/Book in the recipes' chains); verdict set (`Fixed` / `Still reproduces` / `Blocked (env/data)` / `Behaviour changed – needs review`) | Selector (defaults to each recipe's); RC/build label; regression ring on/off; cleanup policy for holds |
| **report** | `Generate_QA_Report` (or `Generate_Bug_Report`) | Run slug (or the log path); action (build / regenerate / bug reports only); output formats (md / html / bug files) | Audience; size limit |
| **analyze** | `Analyze_User_Story` | User-story file path | Version; suppliers in scope |
| **bug** | `Generate_Bug_Report` | Source (run `.jsonl` slug, or ad hoc defect + scope tag) | Which defects (all / IDs) |
| **spec-update** | `Update_Spec_From_Findings` | Run slug | KB update yes/no (step 9) |
| **testdata-sweep** | `Validate_TestData_Search` | **Host**; **Supplier**; **Selector**; Mode (read-only / repair) | File wildcard |

Bold slots are the ones `CLAUDE.md` rule 5 says must never be defaulted. A request can mix types
("retest these bugs, then write the bug reports") — split it into a chain (step 5 below).

## Procedure

1. **Classify** the request into one or more task types from the table. If it fits none (e.g. a
   framework/repo change, a free question), say so and skip the skill.

2. **Extract** every slot value the user actually stated. Normalise only spelling and naming:
   `stg-ne` → its full URL from `Environments.md`; "aap" → `AirArabiaPlus`; "ADO 65507" → keep, and
   add its run bug ID from the supplier KB file if listed there (e.g. `AAP-ONEAPI : BUG-10`).

3. **Detect missing slots.** For each empty **required** slot, write a question. Never fill it with
   a guess. You *may* offer options taken from the repo, labelled with their source and date, e.g.
   *"Selector? KB lists only `USA` as active for AirArabiaPlus (Last verified 2026-11-16 / stg-ne)."*
   The user still has to pick. Also flag:
   - **conflicts**: the request vs KB/SPEC (e.g. host named is down per `Environments.md`, a KB fact
     older than 14 days, a bug ID without a run slug, a file path that does not exist);
   - **safety**: any destructive call on a non-staging host (`supplier-integration`) → the prompt
     must say "stop and ask before Book/Hold/Void/Cancel" unless the user explicitly authorized it
     in this conversation;
   - **scope**: cross-supplier rows in a supplier run → `BLOCKED (out of scope)` unless the user
     confirms (rule 4); "V1 and V2" means both (rule 6).

4. **Build the optimized prompt** with this structure (techniques in brackets):
   - **Role and context** [role framing]: one line, e.g. "Act as Senior QA for the NDC Integration
     API." Then **links** to the exact KB file and SPEC sections — never pasted text.
   - **Goal** — one sentence, measurable.
   - **Scope / Supplier / Selector / Host / Version** [slot filling] — one bullet each, values or
     `❓ MISSING`.
   - **Inputs** — files by repo-relative path (CSV, test data, sheet, log).
   - **Constraints** — the relevant `CLAUDE.md` hard rules by number, plus task-specific ones.
   - **Output contract** [explicit output contract] — exact file(s), folder, naming
     (run slug `YYYYMMDD-HHMMSS_<Supplier>-<Selector>-<Scope>[-RoundN]-<env>`, CSV columns per
     `TestCases_V1.csv`, report under `Artifacts/Logs/<slug>.*`, bugs under
     `Artifacts/BugReports/<slug>/`). Summary table first, details after.
   - **Acceptance** — what "done" means (e.g. every TC-ID has a verdict; every bug has one of the
     four retest verdicts; CSV has no duplicate IDs and a SPEC ref per row).
   - **Self-check** [self-check instruction]: "Before answering, check that every verdict or claim
     cites evidence (saved response path + SPEC section); mark anything without evidence
     `UNVERIFIED`, and anything not in SPEC `INFERRED`."
   - **Stop and ask** — the task-specific stop rules from the downstream template.
   - **Chain** [prompt chaining] — only when more than one skill is needed: an ordered list, with
     where to pause.
   Follow the wording and order of the matching `NDC_Integration/Prompts/*_Template.md` so the
   downstream skill sees a familiar shape.

5. **Chain large asks.** If the request needs several skills, emit an ordered list
   (e.g. `Analyze_User_Story` → `Generate_Test_Cases` → `Execute_Test_cases`), one prompt block per
   step or one combined block like `Execution_Cycle_Prompt_Template.md`. Mark where the user must
   approve before the next step.

6. **Present and wait.** Reply in exactly this shape:

   ```
   ## Optimized prompt — <task type> → <next skill>

   **Before (your request):**
   > <original text, verbatim>

   **After:**
   <the optimized prompt, in a fenced block so it can be copied>

   **What changed:** <3–6 bullets: slots added, names normalised, rules attached, conflicts found>

   **Questions (missing required slots):**
   1. <question> — options from the repo, if any, with source
   …   (write "None — all required slots are filled." if empty)

   **Next skill:** <skill name> (or the chain). Reply "go", edit the prompt, or answer the questions.
   ```

   Do not call the next skill until the user confirms. If the user answers the questions, re-emit
   the final prompt with the answers filled in (no `❓ MISSING` left), then wait for "go".

## Rules

- **Never invent a slot value.** A value comes from the user's words, or the user picks it from
  options you list. "Most recent run", "default host", "probably USA" are guesses — ask.
- **Never change intent.** If the rewrite would add scope the user did not ask for (extra
  suppliers, V2 when they said V1, destructive calls), list it as a question, not as part of the
  prompt. The before/after display exists so the user can catch drift.
- **Link, don't paste.** Reference `KB/...` files and `SPEC.md §x.y`; never copy SPEC or KB text
  into the prompt (it goes stale and wastes context).
- **No secrets, no PII.** Never put the API key, supplier credentials, passenger names, or raw
  supplier payloads in the prompt. PNR codes only when the user gave them and they are needed for
  cleanup.
- **Keep it short.** The optimized prompt should fit in about 40 lines. One task, one block.
- **Bug IDs** like `BUG-07` are per run: always pair them with the run slug or run key.
- **Neutral wording** ([`../_shared/AI_Guardrails.md`](../_shared/AI_Guardrails.md) G-3): rewrite
  "confirm bug X" / "prove it is broken" as "re-test X and report what the response shows". The
  Self-check slot links the guardrails file (evidence refs, source labels, defect gate) instead of
  restating it. For execute/retest tasks, add the build/RC label to the slots as recommended (G-4c).

## Output

Conversation only. This skill writes no file. If the user wants to keep a rewrite as a reusable
template, suggest saving it under `NDC_Integration/Prompts/` and wait for them to ask.
