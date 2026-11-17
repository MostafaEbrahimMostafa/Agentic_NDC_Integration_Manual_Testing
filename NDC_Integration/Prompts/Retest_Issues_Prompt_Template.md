# Retest Issues — Reusable Prompt Template (RC regression)

Copy the block, fill the brackets, send it. Nothing that books runs before you say yes.

---

Use Retest_Issues to re-test these bugs:

- **Bugs:** [Global IDs `NDC-BUG-0002, NDC-BUG-0004` | ADO ids `65507, 65513` |
  `<run slug>:BUG-NN` | sheet path `Resources/<file>.xlsx`]
- **Supplier:** [e.g. AirArabiaPlus]
- **Host:** [full URL, or the short name from `KB/03_Technical/Environments.md`, e.g. `stg-ne`]
- **Selector:** [optional — defaults to each recipe's selector]
- **Build / RC label:** [e.g. `RC 2026.11.3`]
- **Booking calls (Hold/Book):** [allowed / not allowed — not allowed means only recipes without them run]
- **Regression ring (neighbour flows):** [on (default) / off]

Steps:
1. Show me the plan first (`runner.js plan`): which bugs resolve, which recipes are drafts or
   missing, and how many holds/PNRs the run would leave open.
2. Draft any missing recipe from the bug report and show it to me for approval. Do not approve
   for me.
3. Run, then give me the summary table, the bugs that need my sign-off, anything marked
   "Behaviour changed – needs review", and the Cleanup list.

**Stop and ask me, don't guess:**
- a bug ID has no run slug, or does not resolve in the registry
- a recipe's expected value is not in SPEC.md or not confirmed live (CLAUDE.md rule 1)
- the host is not staging and the plan has Hold/Book (CLAUDE.md rule 2)
- the same bug was verified on this host minutes ago and there is no new build

---

## Notes

- The verdicts come from the recipe assertions (code), not from reading the responses.
- Registry status after the run: Fixed → `Fixed-Verified` (Medium/Low) or `Fixed-Pending-Signoff`
  (Critical/High/unrated; you sign off with `registry.js signoff`), Still reproduces →
  `Still-Reproduces`, Blocked → `Blocked`.
- Report: `NDC_Integration/Artifacts/Retest/<slug>/RC_Retest_Report.md`.
