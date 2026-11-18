---
name: update-spec-from-findings
description: >-
  Reconciles NDC_Integration/SPEC.md with the live facts a QA run already confirmed, sourced from a
  run's persisted `spec_update_proposed` entries in NDC_Integration/Artifacts/Logs/<slug>.jsonl (and
  mirrored in that run's <slug>.md under "Proposed SPEC.md updates") — this is where
  execute-test-cases/generate-qa-report leave confirmed-`UNKNOWN` findings waiting for someone to fold
  them back into the spec, per SPEC.md's own Appendix: Document Maintenance policy that it is a living
  document. For every `status: pending` proposal, shows the exact old-text -> new-text diff and asks
  the user to confirm before touching SPEC.md — never edits the spec silently. On confirmation, applies
  the edit to SPEC.md and appends an `applied` status line for that proposal to the run's JSONL (then
  re-renders that run's `.md`); on decline, appends `declined` instead and leaves SPEC.md untouched.
  As a final step it proposes updates to the project Knowledge Base (NDC_Integration/KB/: supplier
  facts, environments, lessons) from the same run, with the same confirm-before-edit rule.
  Use when asked to "update the KB from the last run," or when asked to "update SPEC.md from the report," "apply the proposed spec updates," "reconcile the
  spec with the last run," or after a QA run's report is closed out and its pending proposals need a
  decision. Not for deciding whether something is confirmed-live in the first place (that's
  execute-test-cases's call) and not for editing SPEC.md for any reason outside a logged
  `spec_update_proposed` entry.
---

# Update Spec From Findings — SPEC.md Reconciliation

You are closing the loop that `execute-test-cases` opens: every time a live run confirms a
previously-`UNKNOWN` fact or contradicts a stated one, it proposes an exact SPEC.md edit and logs it
(via `generate-qa-report`) as a `spec_update_proposed` line with `status: "pending"`. Nothing in that
pipeline is allowed to touch SPEC.md itself — that decision is deliberately deferred to a human, and
this skill is where it gets made. Treat SPEC.md as a shared document: every edit here is visible to
the whole team, so nothing gets applied without an explicit, per-item confirmation in this
conversation.

## Inputs

- A run's artifacts under `NDC_Integration/Artifacts/Logs/` — either the `.jsonl` (source of truth)
  or the `.md` (human-readable mirror) may be named by the user; if only the `.md` is given, read the
  matching `.jsonl` with the same `<slug>` for the authoritative data, since the `.md` is a rendering
  of it, not the record itself.
- If no run is named and more than one `.jsonl` exists under that folder, ask which run before
  reading anything — do not guess "the most recent" silently, since an older run's proposals may still
  be legitimately pending.
- `NDC_Integration/SPEC.md` — the file being reconciled.

**AI guardrails** ([`../_shared/AI_Guardrails.md`](../_shared/AI_Guardrails.md)): when you show a
proposal, show the evidence behind it. That is the run's `<slug>_evidence.md` (run
`verify-evidence.js` if it is missing) and the related test case's evidence status. A proposal whose
test case is `UNVERIFIED` or `CONTRADICTED` gets that status stated next to the diff, so the user
decides knowingly. Never turn an `INFERRED` statement into a fact without a live-confirmed,
evidence-backed result. Every KB fact you propose keeps `Last verified: <date> / <env> / <run slug>`,
plus the build when known.

**Output contract** ([`../_shared/Output_Contracts.md`](../_shared/Output_Contracts.md)): record
each decision by appending a `spec_update_proposed` line (`status` `applied` / `declined`) and
re-rendering the run's `.md` with `render-md.js`; never edit the `.md` by hand (O-5). Afterwards
`validate-output.js NDC_Integration/Artifacts/Logs/<slug>.jsonl` must still pass.

## Process

1. **Collect every `spec_update_proposed` line** from the named run's `.jsonl`, top to bottom. Per
   [log-schema.md](../Generate_QA_Report/references/log-schema.md), a later line with the same
   `(section, old_text)` pair supersedes an earlier one — dedupe to the latest status per pair before
   doing anything else, so an already-`applied`/`declined` proposal is never re-presented as pending.
2. **Skip anything not `status: "pending"`** — already-applied or already-declined proposals are
   closed; only pending ones are actionable here.
3. **For each pending proposal, verify `old_text` still appears in SPEC.md verbatim** before proposing
   the edit. If it doesn't (someone already hand-edited that section, or the text drifted), stop on
   that item, tell the user exactly what's mismatched, and ask how to proceed — never fuzzy-match or
   guess the right location. Continue with the rest of the batch's items that do match cleanly.
4. **Present the full batch of matching pending proposals together**, one block per item, before
   asking for confirmation on any of them:
   - Section reference (`§x.y`)
   - `- Old:` the exact current SPEC.md text
   - `+ New:` the exact proposed replacement
   - The `related_tc_id`/run this came from, for traceability
5. **Ask for confirmation** — per-item or "apply all N" if the user prefers, but never assume silence
   or a general "looks good" on an unrelated message means confirmation. A user may confirm some items
   and decline or defer others in the same pass; handle a mixed response.
6. **On confirmation, apply the edit** to `NDC_Integration/SPEC.md` with an exact string replacement
   of `old_text` -> `new_text` (no paraphrasing — use the proposal's own text byte-for-byte, since that
   text was already written to read correctly in context). Then append a new `spec_update_proposed`
   line to the run's `.jsonl` with the same `section`/`old_text` and `status: "applied"`, and re-render
   that run's `.md` (per `generate-qa-report`'s rule that the latest line per pair is current status).
7. **On decline, do not touch SPEC.md.** Append a `spec_update_proposed` line with `status: "declined"`
   (same `section`/`old_text`) and re-render the `.md`, so the report stops listing it as pending
   without silently losing the record that it was proposed and rejected.
8. **Report a final tally**: N applied, N declined, N deferred (still pending, not addressed this
   pass), N skipped (text mismatch). Never leave a proposal in limbo without it showing up in this
   tally.
9. **Propose Knowledge Base updates** (final step, always offered after step 8 — even when the run
   had no pending SPEC proposals). Read the same run's `.jsonl` and bug-report folder, compare with
   `NDC_Integration/KB/02_Suppliers/<Supplier>.md` (and `03_Technical/Environments.md`,
   `04_Decisions_and_Lessons.md` where relevant), and propose only real changes: capabilities,
   routes/test data, supplier rules, defect status (open / still reproduces / fixed / retracted),
   gotchas, a new Run history row. Every proposed fact carries
   `Last verified: <date> / <env> / <run key>`. Follow
   [references/kb-update-procedure.md](references/kb-update-procedure.md) for where each fact goes,
   the exact-diff presentation, and the **no secrets / no PNRs / no passenger names** rule.
   Same human-in-the-loop contract as SPEC: present the batch, get per-item confirmation, apply only
   what was confirmed, then report a KB tally (applied / declined / deferred). Never edit the KB
   silently, and never copy SPEC text into it — link the SPEC section instead.

## Non-goals

- Not for judging whether a live result actually confirms/contradicts SPEC.md — that determination
  and the resulting proposed old/new text are `execute-test-cases`'s job; this skill only applies or
  declines what's already been proposed and logged.
- Not for freeform SPEC.md edits outside a logged `spec_update_proposed` entry — if the user wants to
  edit SPEC.md for some other reason, that's a normal edit, not this skill.
- Not a live-run skill — it operates on a run's already-closed-out artifacts, not on results still
  streaming in from `execute-test-cases` (that skill's own step 6 already handles same-turn
  confirm/apply during a live run; this skill is for reconciling later, or catching anything deferred
  at the time).
