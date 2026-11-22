# Harness layout

Code that sends requests, chains IDs between steps and writes the run JSONL. How to run each part:
`NDC_Integration/KB/03_Technical/Harness_Guide.md`.

| Folder | What it holds |
|---|---|
| `_shared/` | Node code used by every V2 harness: `lib.js` (transport, headers, API key from `.env`, `NDC_BASE`), `api.js` (seat/money helpers), `core.js` (raw call store), `recorder.js` (run JSONL + live MD), `csvparse.js`, `chain.js` (V2 flow primitives and pickers) |
| `V1/` | PowerShell 5.1 V1 harness (`NdcV1.*.ps1`); see `V1/README.md` |
| `Availability/` | One V2 Availability engine (`gl.js`, `gchain.js`, `run.js`, `run_all.sh`, `finalize.js`, `make_bugs.js`) for every Availability supplier, set up in `suppliers.js`. Supplier-specific test groups, notes and bug lists are in `Availability/<Supplier>/` (Galileo, SabreNdc) |
| `AirArabiaPlus/` | AirArabiaPlus/USA V2 regression (groups `g_*.js`, `runner.js`, `flow.js`, `fx.js`, `finalize*.js`, `make_bugs.js`) |
| `Retest/`, `recipes/` | Generic bug re-test runner, Bug Registry CLI and the repro recipes |

Rules for the folders:

- **Run outputs go to `<harness>/out/`**: the slug file, `raw/` call store, results, baselines and `bug_findings.json`. Raw bodies can hold supplier payloads; keep them out of commits unless they are cited as evidence.
- **No one-off scripts.** Probes, patches and per-round verify scripts are not kept. Re-test a bug with `Retest/runner.js` and a recipe, not with a new script.
- **A new Availability supplier** is a new entry in `Availability/suppliers.js` plus an `Availability/<Supplier>/` folder with its groups, not a copy of the engine.
