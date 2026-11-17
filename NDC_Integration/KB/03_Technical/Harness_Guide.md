# Harness Guide

The harness is the code that sends requests, chains IDs between steps and writes the JSONL that the
QA report renders. The skills use it; you can also run it by hand.
File-level detail for the PowerShell harness is in `NDC_Integration/Harness/README.md`.

## 1. What exists

| Folder / file | Language | Purpose | Status |
|---|---|---|---|
| `Harness/NdcV1.*.ps1` | PowerShell 5.1 | V1 harness: `Invoke-Ndc`, `Invoke-NdcFlow`, `Test-NdcPrice`, JSONL log, MD/HTML render | Stable (since 2026-08) |
| `Harness/V2/lib.js` | Node 18+ | Shared HTTP transport `call()`, headers, truncation, `NDC_BASE` | Used by all Node harnesses |
| `Harness/V2/api.js` | Node | V2 chain helpers: seat picking (`pickSeat`, avoid exit rows), echo, money, concurrency slot (`MAXC`, default 5) | Used by SeatMap and supplier folders |
| `Harness/AirArabiaPlus/` | Node | AirArabiaPlus regression + bug verifications (~90 files) | Reusable core + many one-off scripts |
| `Harness/Galileo/` | Node | Galileo Availability rounds 1-4 + RT/MC (~90 files) | Reusable core + many one-off scripts |
| `Harness/SabreNdc/` | Node | SabreNdc Availability (~50 files) | g4-g8 written, **not run** |
| `.claude/Skills/Generate_QA_Report/scripts/render-*.js` | Node | JSONL → MD, HTML, Time Breakdown | Used by every run |

Many per-round files (`make_bug18_retest.js`, `bugs_r3.js`, `probe*.js` …) are one-off. Do not copy
them for new work; start from the reusable core listed below. **Bug re-tests no longer need a new
script:** use the recipe runner (§2a). The old scripts stay as they are; a bug gets a recipe the next
time it is re-tested.

## 2a. Re-test runner (`Harness/Retest/`, since 2026-11-17)

| File | Purpose |
|---|---|
| `Retest/runner.js plan\|run` | Resolves IDs / a bug sheet through the Bug Registry, pre-flights test data, runs each recipe chain sequentially, decides verdicts in code, runs the regression ring, writes `Artifacts/Retest/<slug>/` and updates the registry |
| `Retest/registry.js` | Bug Registry CLI: list, show, resolve, add, link, set-status, signoff |
| `Retest/recipe.js` | validate / approve recipes |
| `Retest/lib/` | `steps.js` (V2 step library, ported from `AirArabiaPlus/chain.js`, supplier-agnostic), `assert.js`, `jsonpath.js`, `xlsx.js` (no npm dependency), `report.js` |
| `recipes/<GlobalId>.json`, `recipes/flows/FLOW-V2-<n>.json` | Repro recipes and neighbour flows (SPEC §5.4 numbers) |

```
node NDC_Integration/Harness/Retest/runner.js plan --supplier AirArabiaPlus --host <url> --sheet Resources/AirArabiaPlus_bugs.xlsx
node NDC_Integration/Harness/Retest/runner.js run  ...same... --allow-booking --build "<RC label>"
```
Format and rules: `.claude/Skills/Retest_Issues/` (SKILL.md, references/recipe-format.md,
references/registry-format.md). V2 only; it reuses `V2/lib.js` (key from `.env`, `NDC_BASE` set by
`--host`). Pre-flight calls the `Validate_TestData_Search` sweep script read-only; when Windows
antivirus blocks a script started from Node (seen 2026-11-17) it falls back to a built-in Search with
the same PASS rule and says so in the report.

## 2. Common pattern of a supplier folder

```
init*.js        mint the run slug, write run_start
g<N>.js         a group of test cases (g1 = capability check, g2.. = areas)
run.js / runner.js  run a group:  node run.js g3     (ONLY=<id1,id2> to rerun some cases)
finalize.js stage1  close the run, renumber, audit
make_bugs.js    write bug reports from findings (+ bugs_*.js per round)
make_chains.js  (Galileo) full request/response chain per bug as evidence
finalize.js stage2  final render (MD + HTML + Time Breakdown)
```

### Galileo (`Harness/Galileo/`)
```
node init.js
sh runall.sh                       # g1..g8 sequential, ~21 min
node finalize.js stage1
node make_bugs.js                  # then: node make_chains.js
node finalize.js stage2
```
Booking groups: set `PREFER_CARRIER=MS`. Before a rerun after make_bugs/make_chains: `node clean_for_rerun.js`.

### AirArabiaPlus (`Harness/AirArabiaPlus/`)
Core: `core.js` (transport, defaults to ne-6), `chain.js`, `flow.js`, `fx.js` (raw-body reader `fx.rawOf`),
groups `g_*.js`, `runner.js`, `finalize.js stage1|stage2`, `make_bugs.js`.
Bug-verify example: `NDC_BASE=<host> OUTDIR=<dir> RAW_DIR=<dir> node verify10d.js`.

### SabreNdc (`Harness/SabreNdc/`)
```
node init.js
node run.js g1 … g7                # never two Sabre processes at once (ReachedTALimit)
SLUG=<slug> node finalize.js stage1
node make_bugs.js
RUN_STATUS=interrupted AFTER_TC=<id> RUN_REASON="…" node finalize.js stage2   # for partial runs
```

## 3. Environment variables

| Var | Meaning |
|---|---|
| `NDC_API_KEY` / `NDC_CLIENT_ID` | API key (required) and Client-Id (default `NDC-Core`). Read from the environment, else from the git-ignored repo-root `.env` (template `.env.example`). Used by `V2/lib.js`, `NdcV1.Extracted.ps1`, the TestData sweep script. |
| `NDC_BASE` | Target host. **Always set it** — defaults differ per folder (ne-3, ne-6). |
| `SLUG` | Attach to an existing run |
| `ONLY` | Comma list of TC-IDs to (re)run |
| `RAW_DIR` / `OUTDIR` | Where raw request/response bodies and results go (keep out of commits) |
| `PREFER_CARRIER` | Galileo: prefer a carrier for booking flows |
| `SELECT_FORM` | Galileo: `array` = old SelectAvailability body |
| `MAXC` | `api.js` concurrency limit (default 5) |
| `RUN_STATUS`, `AFTER_TC`, `RUN_REASON` | Closing a partial run |

## 4. Rules for harness work

- **Sequential by default.** Parallel only where the supplier file says it is safe.
- **Append-only JSONL.** Never truncate-and-rewrite a log another process may write to.
- **Truncate bodies in the JSONL** (arrays > 3 items, strings > 110 chars), keep full bodies in
  `RAW_DIR`. Checks that need the whole body read the raw store, not the JSONL.
- **Never log a transport error (FETCH_ERROR, timeout of the harness) as a test result.** Remove the
  line and rerun the case.
- **Redact** `supplierRequest`, `supplierResponse`, `OriginalSupplier*` only when non-null.
- **ASCII-only `.ps1`** (PowerShell 5.1 reads ANSI).
- **Write JS with the Write/Edit tools**, not shell heredocs (backslashes and `\n` are mangled).
- **Stop only your own processes** (match by command line); blanket kills are denied.
- Windows: strip `:` and `+` from file names built from tags.
- Use repo-relative paths. `Harness/README.md` still shows an old absolute path from another
  machine; use `NDC_Integration/Harness` relative to the repo root instead.
