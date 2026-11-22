# Harness Guide

The harness is the code that sends requests, chains IDs between steps and writes the JSONL that the
QA report renders. The skills use it; you can also run it by hand.
Folder layout and rules: `NDC_Integration/Harness/README.md`. File-level detail for the PowerShell
harness: `NDC_Integration/Harness/V1/README.md`.

## 1. What exists

| Folder / file | Language | Purpose | Status |
|---|---|---|---|
| `Harness/V1/NdcV1.*.ps1` | PowerShell 5.1 | V1 harness: `Invoke-Ndc`, `Invoke-NdcFlow`, `Test-NdcPrice`, JSONL log, MD/HTML render | Stable (since 2026-08) |
| `Harness/_shared/lib.js` | Node 18+ | Shared HTTP transport `call()`, headers, truncation, `NDC_BASE` | Used by all Node harnesses |
| `Harness/_shared/api.js` | Node | V2 chain helpers: seat picking (`pickSeat`, avoid exit rows), echo, money, concurrency slot (`MAXC`, default 5) | Used by SeatMap and supplier folders |
| `Harness/_shared/{core,recorder,csvparse,chain}.js` | Node | Raw call store, run recorder (JSONL + live MD), CSV parser, V2 flow primitives and pickers | Used by AirArabiaPlus, Availability, Retest |
| `Harness/AirArabiaPlus/` | Node | AirArabiaPlus/USA V2 regression | Groups `g_*.js` + runner |
| `Harness/Availability/` | Node | One V2 Availability engine for Galileo and SabreNdc (`suppliers.js` holds the per-supplier settings) | Merged 2026-11-22 from the two supplier copies |
| `.claude/Skills/Generate_QA_Report/scripts/render-*.js` | Node | JSONL → MD, HTML, Time Breakdown | Used by every run |

The one-off scripts of earlier rounds (probes, patches, `verify10*.js`, per-round test-case
generators) were removed on 2026-11-22; they are in git history. **Bug re-tests do not need a new
script:** use the recipe runner (§2a). Run outputs (slug, `raw/`, results, baselines,
`bug_findings.json`) go to `<harness>/out/`.

## 2a. Re-test runner (`Harness/Retest/`, since 2026-11-17)

| File | Purpose |
|---|---|
| `Retest/runner.js plan\|run` | Resolves IDs / a bug sheet through the Bug Registry, pre-flights test data, runs each recipe chain sequentially, decides verdicts in code, runs the regression ring, writes `Artifacts/Retest/<slug>/` and updates the registry |
| `Retest/registry.js` | Bug Registry CLI: list, show, resolve, add, link, set-status, signoff |
| `Retest/recipe.js` | validate / approve recipes |
| `Retest/lib/` | `steps.js` (V2 step library, ported from `_shared/chain.js`, supplier-agnostic), `assert.js`, `jsonpath.js`, `xlsx.js` (no npm dependency), `report.js` |
| `recipes/<GlobalId>.json`, `recipes/flows/FLOW-V2-<n>.json` | Repro recipes and neighbour flows (SPEC §5.4 numbers) |

```
node NDC_Integration/Harness/Retest/runner.js plan --supplier AirArabiaPlus --host <url> --sheet Resources/AirArabiaPlus_bugs.xlsx
node NDC_Integration/Harness/Retest/runner.js run  ...same... --allow-booking --build "<RC label>"
```
Format and rules: `.claude/Skills/Retest_Issues/` (SKILL.md, references/recipe-format.md,
references/registry-format.md). V2 only; it reuses `_shared/lib.js` (key from `.env`, `NDC_BASE` set by
`--host`). Pre-flight calls the `Validate_TestData_Search` sweep script read-only; when Windows
antivirus blocks a script started from Node (seen 2026-11-17) it falls back to a built-in Search with
the same PASS rule and says so in the report.

## 2. Common pattern of a run

```
init*.js        mint the run slug (written to out/), write run_start
g<N>.js         a group of test cases (g1 = capability check, g2.. = areas)
run.js / runner.js  run a group     (ONLY=<id1,id2> to rerun some cases)
finalize.js stage1  close the run, renumber, audit
make_bugs.js    write bug reports from findings (+ bugs_*.js per round)
make_chains.js  (Galileo) full request/response chain per bug as evidence
finalize.js stage2  final render (MD + HTML + Time Breakdown)
```

### Availability engine (`Harness/Availability/`): Galileo and SabreNdc

One engine, the supplier is the first argument (or `AVAIL_SUPPLIER`). Settings per supplier
(supplier, selector, default host, CSV, Select body form, `PREFER_CARRIER` support, ReachedTALimit
retry, default notes and bug list) are in `suppliers.js`. Run from `NDC_Integration/Harness/Availability/`:
```
node Galileo/init.js               # or SabreNdc/init.js; Galileo/init_rtmc.js for the RT/MC run
sh run_all.sh Galileo              # g1..g8 sequential (Galileo ~21 min); or: node run.js Galileo g3
node finalize.js Galileo stage1    # NOTES=r5notes for the RT/MC run
node make_bugs.js Galileo          # Galileo then: node Galileo/make_chains.js
node finalize.js Galileo stage2
```
- Galileo: host defaults to ne-4 (`NDC_BASE` overrides). Booking groups: set `PREFER_CARRIER=MS`.
  Before a rerun after make_bugs/make_chains: `node Galileo/clean_for_rerun.js`.
- SabreNdc: host is always ne-7. Never two Sabre processes at once (ReachedTALimit; the engine waits
  and retries). Partial run: `RUN_STATUS=interrupted AFTER_TC=<id> RUN_REASON="…" node finalize.js SabreNdc stage2`.
- A new Availability supplier = a `suppliers.js` entry + an `Availability/<Supplier>/` folder.

### AirArabiaPlus (`Harness/AirArabiaPlus/`)
Uses `_shared/core.js` (transport, defaults to ne-6), `_shared/chain.js`; own `flow.js`, `fx.js`
(raw-body reader `fx.rawOf`), groups `g_*.js`, `runner.js`, `finalize.js stage1|stage2`, `make_bugs.js`,
`pilot.js` (one flow), `sweep.js` (route/date Search sweep). Outputs in `AirArabiaPlus/out/`.
Bug verification: use `Retest/runner.js` with a recipe (§2a).

## 3. Environment variables

| Var | Meaning |
|---|---|
| `NDC_API_KEY` / `NDC_CLIENT_ID` | API key (required) and Client-Id (default `NDC-Core`). Read from the environment, else from the git-ignored repo-root `.env` (template `.env.example`). Used by `_shared/lib.js`, `V1/NdcV1.Extracted.ps1`, the TestData sweep script. |
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
- Use repo-relative paths.
