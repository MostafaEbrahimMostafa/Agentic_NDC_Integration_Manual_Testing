# Update Spec From Findings — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to reconcile
`NDC_Integration/SPEC.md` with a run's already-confirmed live facts.

---

Use Update_Spec_From_Findings to reconcile SPEC.md against:

- **Run**: `NDC_Integration/Artifacts/Logs/[slug].jsonl`

Collect every `spec_update_proposed` line, dedupe to the latest status per
`(section, old_text)` pair, and skip anything not `status: "pending"`. For each pending item,
verify `old_text` still appears in SPEC.md verbatim before proposing the edit — if it doesn't,
stop on that item and tell me what's mismatched rather than guessing the location.

Present the full batch of matching pending proposals together (section, `- Old:`, `+ New:`,
the `related_tc_id`/run it came from) and ask me to confirm — per item or "apply all N."

On confirmation, apply the exact string replacement to SPEC.md byte-for-byte, append an
`applied` status line to the run's JSONL, and re-render its `.md`. On decline, append
`declined` and leave SPEC.md untouched.

Close with a final tally: N applied, N declined, N deferred, N skipped (text mismatch).

**Stop and ask me, don't guess:**
- if no run is named and more than one `.jsonl` exists under
  `NDC_Integration/Artifacts/Logs/` — don't assume "the most recent"
- before applying any edit — never assume silence or an unrelated "looks good" means
  confirmation

---

## Notes for filling this in

- `[slug]` — the run's timestamp/scope-tag identifier, e.g. `20260804-143210_Flow-43`. If you
  only have the `.md`, this skill reads the matching `.jsonl` with the same slug anyway.
- This skill never judges whether something is confirmed-live in the first place — that's
  Execute_Test_cases's call; it only applies or declines what's already proposed and logged.
- Use this after a QA run's report is closed out, whenever pending proposals are left over from
  Execute_Test_Cases's own same-turn confirm/apply step.
