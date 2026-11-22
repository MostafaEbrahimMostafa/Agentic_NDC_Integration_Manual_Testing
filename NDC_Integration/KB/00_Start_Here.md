# Start Here — Onboarding to NDC Integration QA

Goal: after this page you can run **one smoke test case** on staging without asking anyone.
The repo-level `README.md` covers installing tools; this page covers *what to know* and *in what order*.

---

## Day 1 (about 3 hours)

| # | Do this | Why | Time |
|---|---|---|---|
| 1 | Read `CLAUDE.md` (repo root) | The rules every person and every AI session follows | 10 min |
| 2 | Read [01_Business/Domain_Glossary.md](01_Business/Domain_Glossary.md) | You will see PNR, Hold, Void, bundle, selector in every ticket | 20 min |
| 3 | Read [01_Business/Booking_Lifecycle.md](01_Business/Booking_Lifecycle.md) | Every test is one path through this chain | 20 min |
| 4 | Read [03_Technical/Environments.md](03_Technical/Environments.md) | Which host is safe for which call | 15 min |
| 5 | Skim `NDC_Integration/SPEC.md` §1 and §2.1 (Search) | SPEC is the oracle for every verdict | 30 min |
| 6 | Read [04_Decisions_and_Lessons.md](04_Decisions_and_Lessons.md) | Mistakes already made, so you don't repeat them | 20 min |
| 7 | **Run your first smoke test** (below) | Proves your setup works end to end | 30 min |

## Week 1

- Read the supplier file for the supplier you are assigned to: [02_Suppliers/README.md](02_Suppliers/README.md).
- Read SPEC §4 (supplier capabilities), §5 (flow matrix), §6 (flow validation).
- Read [03_Technical/Execution_Pipeline.md](03_Technical/Execution_Pipeline.md): what happens from
  "run ..." to the QA HTML report, bug reports and SPEC/KB follow-up (steps P0-P10).
- Past run reports and bug folders were removed from the repo on 2026-11-22. To see what a full run
  produces, run your first smoke test (below) and open its `Artifacts/Logs/<slug>.html`; old runs
  are still in git history (e.g. `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3`).
- Read [03_Technical/Harness_Guide.md](03_Technical/Harness_Guide.md),
  [03_Technical/Postman_MCP_Guide.md](03_Technical/Postman_MCP_Guide.md) and
  [03_Technical/Architecture.md](03_Technical/Architecture.md).
- Run one small full cycle with the skills: Generate → Execute → Report → Bug → Update Spec (see
  `README.md` "Running a test cycle" and the templates in `NDC_Integration/Prompts/`).
- Two run modes for Execute: **harness** (one test case at a time, full evidence: the default
  choice for CSV runs and anything you may file bugs from) and **postman-mcp** (the CSV run through
  a Postman collection via the Postman MCP server; set up the Postman key first, see the guide).

---

## Your first smoke test (Search only, safe on any staging host)

Search creates no booking, so it is safe. Pick a supplier/route that the KB says is live.

0. **Set up the API key (once):** copy `.env.example` (repo root) to `.env` and put the staging key
   in `NDC_API_KEY=`. Ask the team lead for the key (it is not in git). `.env` is git-ignored — never
   commit it. In Postman, set the `x_api_key` variable's **current value** in `STAG_ENV`.
1. Check the target is fresh: open the supplier file, find a route with a recent `Last verified`.
   Example at time of writing: AirArabiaPlus / `USA` / G9 `COK-SHJ` on `stg-ne`
   ([02_Suppliers/AirArabiaPlus.md](02_Suppliers/AirArabiaPlus.md)) — Last verified: 2026-11-17 /
   stg-ne / Search 200 with offers (ne-3 and ne-6 were down that day, HTTP 503).
2. Open Claude Code in the repo root (`claude`) and send:

   ```
   Use Execute_Test_cases to run:
   - Scope: TC-SEARCH-POS-01 from NDC_Integration/TestCases/_Generic/TestCases_Generic.csv
   - Environment: https://ndc-integration-stg-ne.azurewebsites.net/
   - Supplier: AirArabiaPlus
   - Credentials Selector: USA
   - Version: V2 only
   - Run mode: harness
   - Test data: route COK-SHJ, a date within the next 30 days (G9 schedule ends 2026-12-31), passengers 1 ADT
   Search only. No Book/Hold/Void.
   ```

   The row's default data (TravelportNdc/UAE, CAI-JED) is allowed to be swapped for "any pair
   confirmed live-capable", which is why you can point it at a supplier the KB marks as live.
3. Expected result: HTTP 200 with a non-empty `offers[]`; the agent compares price fields with
   SPEC §2.1 and writes `NDC_Integration/Artifacts/Logs/<slug>.md/.jsonl/.html`.
4. If you get `offers: []`, re-check once with another date before concluding (see Lessons L-06).
5. Open the `.html` report. That is your first run.

**Done when:** you have a report on disk with one PASS/FAIL verdict that cites a SPEC section.

---

## Map of this knowledge base

```
KB/
  00_Start_Here.md              <- you are here
  01_Business/
    Domain_Glossary.md          <- words
    Booking_Lifecycle.md        <- the chain and its states
  02_Suppliers/
    README.md                   <- supplier index with status
    _TEMPLATE.md                <- copy this for a new supplier
    <Supplier>.md               <- live facts per supplier
  03_Technical/
    Architecture.md             <- layers, error envelopes, IDs
    Environments.md             <- ne, ne-1..ne-8, supplier-integration
    Execution_Pipeline.md       <- "run ..." to final report: steps P0-P10, both run modes
    Harness_Guide.md            <- how to run scripts, reuse per-supplier folders
    Postman_MCP_Guide.md        <- run a collection through the Postman MCP server
  04_Decisions_and_Lessons.md   <- retracted bugs, wrong assumptions, "why we do X"
```

## How the KB stays correct

- Every fact has `Last verified: <date> / <env> / <run slug>`. Older than 14 days = re-check.
- The KB **links** to SPEC; it never copies SPEC text. SPEC = expected behaviour, KB = observed
  behaviour and team know-how.
- After each run, `Update_Spec_From_Findings` proposes KB edits; a human approves them.
- **Never** put in the KB: API keys, Client-Id values, supplier usernames/passwords, passenger
  names, PNR/locator codes, raw supplier payloads. Point to the run report instead.
