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
  Use when asked to "update SPEC.md from the report," "apply the proposed spec updates," "reconcile the
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
