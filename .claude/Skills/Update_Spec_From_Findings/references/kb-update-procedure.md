# KB Update Procedure (step 9 of Update_Spec_From_Findings)

After the SPEC reconciliation of a run, propose updates to the project Knowledge Base
(`NDC_Integration/KB/`) so the next person or session starts with what this run learned.
Same contract as SPEC updates: **show the exact diff, get per-item confirmation, then edit.**

## 1. What belongs where

| Learned in the run | KB target |
|---|---|
| A supplier capability confirmed or changed (works / 409 / new field / new value) | `KB/02_Suppliers/<Supplier>.md` §1 |
| Route, date window, carrier inventory, test-data tip | `<Supplier>.md` §2 |
| Supplier-specific rule (shape, limit, ordering) | `<Supplier>.md` §3 |
| Defect opened, still reproducing, fixed or retracted | `<Supplier>.md` §4 (status column + Last verified) |
| How-not-to-get-false-results tip | `<Supplier>.md` §5 |
| New host, host behaviour, selector status | `KB/03_Technical/Environments.md` |
| A pattern seen on a 3rd supplier | `KB/03_Technical/Architecture.md` §3 |
| A retracted finding, a wrong assumption, a new team rule | `KB/04_Decisions_and_Lessons.md` (new L-nn / D-nn) |
| The run itself | `<Supplier>.md` §7 Run history (new run key → slug) |
| New supplier | copy `KB/02_Suppliers/_TEMPLATE.md`, add a row to `02_Suppliers/README.md` |

**Not KB material:** anything already stated in SPEC.md (link to the section instead), per-test-case
results (they stay in the run report), and one-off harness script names.

## 2. Sources to read

1. The run's `.jsonl`: `run_start` (env, supplier, selector, slug), `finding` lines (defects,
   `unknown_resolution`, observations), `spec_update_proposed` decisions from steps 1-8.
2. The run's bug reports folder `Artifacts/BugReports/<slug>/`.
3. The current `<Supplier>.md` — compare, so you only propose real changes.

## 3. Rules for each proposed line

- **Facts only, each with** `Last verified: <YYYY-MM-DD> / <env short name> / <run key>`.
  Add the run key to §7 Run history if it is new.
- When a fact **changes**, replace the old line (do not keep both), and say in the proposal what it
  was before. When a bug is fixed or retracted, update its status row; a retraction also gets an
  L-nn entry in `04_Decisions_and_Lessons.md`.
- Label anything not confirmed live as `INFERRED` or leave it out.
- **Never write:** API keys, Client-Id values, supplier usernames/passwords/office ids, passenger
  names, PNR/locator codes, ticket numbers, raw supplier payloads. Point to the run report's
  Cleanup section instead of listing locators.
- Keep `CLAUDE.md` an index: only touch it when a new KB file is added or a hard rule changes.
- Bug IDs are per run: always write `<run key> : BUG-nn`.

## 4. Presentation (one batch, then confirm)

For each proposed change show:

```
[KB-n] KB/02_Suppliers/Galileo.md §1
- Old: | CancelAfterHold | Works ... | 2026-11-15 / ne-4 / GAL-R4 |
+ New: | CancelAfterHold | Works, bookingToken now validated ... | 2026-11-20 / ne-4 / GAL-R5 |
Source: <slug>, TC-FLOW-V2-GALBOOK-15, BugReports/<slug>/BUG-23
```

Ask for confirmation per item or "apply all N". Mixed answers are fine. No reply = not confirmed.

## 5. Apply and tally

- Apply only confirmed items, with exact edits.
- Before saving, run the secret check: search the edited KB files for `x-api-key`, `Client-Id:`,
  `password`, `username`, long hex/GUID-like tokens, and 6-character all-caps locator patterns
  next to words like PNR/hold. If anything matches, stop and show it to the user.
- Report: N applied, N declined, N deferred. KB edits are **not** logged to the run's JSONL
  (the JSONL `spec_update_proposed` lines are SPEC-only); the git diff is the record.
