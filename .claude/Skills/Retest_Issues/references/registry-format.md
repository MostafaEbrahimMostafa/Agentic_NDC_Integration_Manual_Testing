# Bug Registry format

`NDC_Integration/Artifacts/Bug_Registry.csv` — the single list of all real defects, one row per
defect. Change it only through `node NDC_Integration/Harness/Retest/registry.js` (or the retest
runner): each command changes one row, keeps row order, and appends an event to
`NDC_Integration/Artifacts/Bug_Registry_History.jsonl`. Small diffs, no merge fights.

| Column | Example | Rules |
|---|---|---|
| `GlobalId` | `NDC-BUG-0042` | Assigned by `registry.js add`, never reused (also not after a row is retracted) |
| `AdoId` | `65507` | ADO work item id(s), `;`-separated; empty if not filed |
| `Title` | `[V2][AirArabiaPlus][Book] – paxTotalAncillaryAmount Differs …` | House title format. Sheet rows are matched on Title |
| `AltTitles` | other titles of the same defect | `\|`-separated (e.g. the generic "[Airline]" sheet row that is the same bug) |
| `Supplier` / `Env` / `Selector` / `Version` | `AirArabiaPlus` / `ne-6; stg-ne` / `USA` / `V2` | `Env` = hosts where it was seen (KB short names) |
| `Severity` | `High` | Critical / High / Medium / Low / empty (unrated). Critical/High/unrated need a human sign-off on Fixed |
| `RunBugIds` | `20261109-084356_AirArabiaPlus-USA-OneAPI-Regression-ne6:BUG-10; 20261116_AirArabiaPlus-USA-Verify-ne:BUG-02` | Every per-run id, always `<run slug>:BUG-NN` |
| `ReproRecipe` | `NDC_Integration/Harness/recipes/NDC-BUG-0042.json` | Empty until a recipe exists |
| `Status` | `Still-Reproduces` | `Open`, `Still-Reproduces`, `Fixed-Pending-Signoff`, `Fixed-Verified`, `Blocked`, `Retracted` |
| `LastVerdict` | `Still reproduces` | Last retest verdict (or a note for rows from before the registry) |
| `LastVerified` | `2026-11-16, stg-ne, build not recorded, 20261116_AirArabiaPlus-USA-Verify-ne` | `<date>, <env>, build <label>, <run slug>` |

## Commands

```
R=NDC_Integration/Harness/Retest
node $R/registry.js list [--supplier S] [--status S] [--grep text]
node $R/registry.js show 65507                      # any id kind
node $R/registry.js resolve 65507 <slug>:BUG-07 NDC-BUG-0003
node $R/registry.js add --title "..." --supplier S --env ne-4 --selector EGY --version V2 --severity High --run "<slug>:BUG-NN" [--ado N]
node $R/registry.js link NDC-BUG-0003 --run "<slug>:BUG-NN" [--ado N] [--alt-title "..."] [--env E]
node $R/registry.js set-status NDC-BUG-0003 Retracted --note "why" --by "<name>"
node $R/registry.js signoff NDC-BUG-0003 --by "<name>"          # Fixed-Pending-Signoff -> Fixed-Verified
```

## History events (`Bug_Registry_History.jsonl`, append-only)

`registry_seed`, `registry_add`, `registry_link`, `registry_status`, `registry_signoff`,
`retest_verdict` (`{globalId, verdict, statusFrom, statusTo, slug, env, host, build, report}`).
Later plan steps (daily summary, metrics such as retraction rate) read this file — never rewrite it.

## Seed (2026-11-17)

Rows NDC-BUG-0001..0010 = the 11 rows of `Resources/AirArabiaPlus_bugs.xlsx` (rows 4 and 10 are the
same defect, 0003). Status and LastVerified come from the 2026-11-16 manual verification on stg-ne
(KB `02_Suppliers/AirArabiaPlus.md` §4). NDC-BUG-0011/0012 = the retracted AAP-R1 BUG-01/02 (KB
`04_Decisions_and_Lessons.md` L-01). Other suppliers' known bugs get a row when they are next
re-tested or filed (`Generate_Bug_Report` step 8) — no bulk back-fill.
