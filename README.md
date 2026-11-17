# NDC Manual Testing

Manual QA project for the **NDC Integration API** — a supplier-abstraction layer that sits in
front of ~38–50 airline/GDS backends (Amadeus, Sabre, Galileo, EgyptAir, Emirates, FlyNas, and
others) and normalizes them into one JSON contract for flight search and booking.

This repo is where that API's behavior is documented, tested, and reported on. It combines:

- A **spec** reverse-engineered from the Postman collections and the PRD of the companion Java
  automation framework.
- **Postman collections** (V1 and V2) used as the actual request source when running tests.
- A set of **Claude Code skills** that generate test cases, execute them live, and report results
  — so the whole QA cycle (analyze → generate → execute → report → file bugs → update the spec)
  can be run consistently, by a person or by an AI agent, without re-deriving request shapes each time.

## Getting started from scratch

This walks a brand-new team member through everything needed to go from "just cloned the repo" to
"ran a real test cycle against staging." Follow it top to bottom the first time; after that you'll
only need the [daily workflow](#running-a-test-cycle) below.

### 1. Prerequisites

Install these before doing anything else:

| Tool | Why you need it | Check it's installed |
|---|---|---|
| **Git** | to clone this repo | `git --version` |
| **Node.js 18+** | Claude Code CLI is an npm package | `node --version` |
| **Claude Code CLI** | runs the skills that drive the whole QA cycle | `claude --version` (install with `npm install -g @anthropic-ai/claude-code` if missing) |
| **PowerShell 5.1+** (Windows-native, already present) or **PowerShell 7+ (`pwsh`)** | the execution harness (`NDC_Integration/Harness/*.ps1`) and the launcher script are PowerShell | `$PSVersionTable.PSVersion` |
| **Postman** (desktop app) | to browse/import the collections and inspect requests by hand, and useful for one-off manual exploration outside of Claude Code | any recent version |

You'll also need a Claude Code login/API access configured (`claude` will prompt you to
authenticate on first run if it isn't).

### 2. Clone the repo

```powershell
git clone https://github.com/MostafaEbrahimMostafa/Agentic_NDC_Integration_Manual_Testing.git "NDC Manual Testing"
cd "NDC Manual Testing"
```

### 3. Import the Postman collections (optional but recommended)

The Postman collections are the actual request source the automated skills replay, but importing
them into the Postman app lets you poke around by hand first:

1. Open Postman → **Import** → select the whole `Postman_Collection/` folder (or the two
   collection JSON files under `Collection_V1/` and `Collection_V2/`, plus the environment file).
2. Import `Postman_Collection/Environment/STAG_ENV.postman_environment.json` as an environment and
   select it in the top-right environment dropdown.
3. Confirm the environment's variables look right (defaults shipped in the repo):
   - `baseUrl` → `https://ndc-integration-stg-ne-3.azurewebsites.net/`
   - `Supplier_Name` → `TravelportNdc`
   - `Credentials_Selector` → `UAE`
   - `x_api_key` → empty in the repo. Put the staging key in its **Current value** (ask the team
     lead; it is not in git). The collections send it as `{{x_api_key}}`.

   For the harness and skills, also copy `.env.example` (repo root) to `.env` and set
   `NDC_API_KEY=`. `.env` is git-ignored; never commit it.
4. Send any request in the `Collection_V1` or `Collection_V2` folder to confirm you get a `200`
   back — this proves your network/VPN access to staging is working before you involve Claude Code.

If you only ever plan to run tests through Claude Code (step 5 onward), you can skip the Postman
desktop import — the skills read the same collection/environment JSON files directly from disk.

### 4. Open the repo in Claude Code

From the repo root:

```powershell
claude
```

Claude Code auto-discovers the skills under `.claude/Skills/` — you don't need to install or
register anything. Confirm they're visible by typing `/` in the Claude Code prompt; you should see
`Analyze_User_Story`, `Generate_Test_Cases`, `Execute_Test_cases`, `Generate_QA_Report`,
`Generate_Bug_Report`, `Update_Spec_From_Findings`, `Validate_TestData_Search`, `Retest_Issues`, and
`Optimize_Prompt` in the list. `Optimize_Prompt` is optional: it turns a vague request into a complete
prompt (and asks for anything missing) before you run one of the other skills.

### 5. Read the source of truth once

Before generating or running anything, skim:

- `NDC_Integration/SPEC.md` — the API contract everything else is validated against.
- `NDC_Integration/Harness/README.md` — how the execution harness works and what's already known
  about the staging environment (which suppliers actually return offers, known collection defects).

You don't need to memorize these — the skills read them automatically — but understanding what
`SPEC.md` covers (§2 endpoints, §4 suppliers, §5 flows, §6 validation rules) makes the skills'
output much easier to sanity-check.

## Running a test cycle

There are two ways to drive the workflow: through ready-made prompt templates typed straight into
Claude Code, or through the guided PowerShell launcher. Both end up invoking the same skills.

### Option A — guided launcher (easiest for a first run)

```powershell
powershell -File .\.claude\chell\Run-ExecuteTestCases.ps1
```

This prompts you for `BaseUrl`, `Supplier_Name`, `Credentials_Selector` (defaulting to
`STAG_ENV`'s values — just press Enter to accept them) and a test scope (`V1`, `V2`, `Both`, or
`Generic`), then launches `claude` in the repo root with the `Execute_Test_cases` skill invoked and
those answers pre-filled. It will not run destructive calls (`Book`/`Void`/etc.) against a
non-staging URL without stopping to ask you first.

### Option B — prompt templates (full control over each stage)

Each skill has a fill-in-the-blanks template under `NDC_Integration/Prompts/`. A full cycle, in
order:

**1. Analyze a user story** (only if you're starting from a PRD/user-story doc, e.g.
`NDC_Integration/Resources/SeatMap_UserStory.md`):

```
Use Analyze_User_Story on NDC_Integration/Resources/SeatMap_UserStory.md
```

Answer any clarifying questions it asks — it will not guess. It hands back a "Testable Scope" you
feed straight into step 2.

**2. Generate test cases** for an endpoint, flow range, or supplier:

```
Use Generate_Test_Cases to write test cases for the FareConfirm endpoint (SPEC.md §2), covering
positive, negative, boundary, and security categories, for supplier TravelportNdc.
```

This appends CSV rows to the matching file under `NDC_Integration/TestCases/` (e.g.
`TestCases_V2.csv`), following the house naming convention.

**3. Execute the test cases** against staging (copy from
`NDC_Integration/Prompts/Execute_Test_Cases_Prompt_Template.md` and fill in the brackets), e.g.:

```
Use Execute_Test_cases to run:
- Scope: NDC_Integration/TestCases/TestCases_V2.csv
- Environment: staging (default)
- Supplier: TravelportNdc
- Credentials Selector: UAE

Execute the whole scope, in order, start to finish. Report live, one test case at a time, with a
running pass/fail/blocked total after each.
```

This automatically triggers **Generate_QA_Report** (live Markdown/JSONL persistence under
`NDC_Integration/Artifacts/Logs/`, then a final HTML render) and, for any confirmed defects,
**Generate_Bug_Report** — no separate ask needed for either.

**4. Reconcile the spec**, if the run confirmed anything that was `UNKNOWN` in `SPEC.md`:

```
Use Update_Spec_From_Findings to reconcile SPEC.md with the last run.
```

It always shows the exact diff and waits for your confirmation before touching `SPEC.md`.

**5. (Housekeeping, run periodically, not part of every cycle)** — refresh test-data fixtures so
future search-dependent test cases don't fail on stale routes/dates:

```
Use Validate_TestData_Search for supplier TravelportNdc, credentialsSelector UAE.
```

### What you'll get out of a run

- `NDC_Integration/Artifacts/Logs/<timestamp>_<scope>.md` and `.jsonl` — live results as the run
  happens.
- `NDC_Integration/Artifacts/Logs/<timestamp>_<scope>.html` — a shareable report once the run ends.
- `NDC_Integration/Artifacts/BugReports/<timestamp>_<scope>/` — one Markdown bug report per
  confirmed defect.

Open any existing `.html` file under `NDC_Integration/Artifacts/Logs/` first to see what a
completed run looks like before running your own.

## Folder guide

```
NDC Manual Testing/
├── NDC_Integration/          # Everything QA: spec, test cases, results, resources
│   ├── SPEC.md                   # Source of truth: endpoints, flows, suppliers, validation rules
│   ├── NDC_PRD.md                 # PRD for the companion Java/TestNG automation framework
│   ├── TestCases/                 # Generated manual test cases (CSV + HTML), V1/V2/SeatMap/Generic
│   ├── TestData/                  # JSON fixtures (search criteria, passengers) used when executing tests
│   ├── Resources/                 # Supporting docs: supplier routes, sample requests/responses, user stories
│   ├── Prompts/                   # Prompt templates, one per skill, for driving the QA cycle
│   ├── Harness/                   # PowerShell harness (HTTP calls, ID chaining, logging, HTML reports)
│   └── Artifacts/                 # Output of test runs: logs (.md/.html/.jsonl), bug reports, search sweeps
├── Postman_Collection/        # The actual Postman collections/environment used to call the API
│   ├── Collection_V1/
│   ├── Collection_V2/
│   └── Environment/                # STAG_ENV — base URL, supplier, credentials selector
└── .claude/Skills/             # Claude Code skills that automate the QA workflow (see below)
```

## The QA workflow (skills)

Each stage of testing is its own Claude Code skill. They're meant to be run in this order, but
each can also be used standalone:

| # | Skill | What it does |
|---|---|---|
| 1 | **Analyze_User_Story** | Reads a user story/PRD excerpt and checks its acceptance criteria against `SPEC.md`, flagging what's ambiguous or out of scope — before any test case is written. |
| 2 | **Generate_Test_Cases** | Writes structured manual test cases (positive/negative/boundary/security/etc.) from `SPEC.md`, output as CSV rows matching the project's existing schema. |
| 3 | **Execute_Test_cases** | Runs test cases live against staging using the Postman collections, compares actual vs. expected (per `SPEC.md`), and reports pass/fail with evidence. |
| 4 | **Generate_QA_Report** | Persists execution results in real time as Markdown/JSONL, then renders a shareable HTML report once the run finishes. |
| 5 | **Generate_Bug_Report** | Turns each confirmed defect from an execution run into a submittable Markdown bug report using the house template. |
| 6 | **Update_Spec_From_Findings** | Reconciles `SPEC.md` with facts confirmed live during execution — always shows a diff and asks for confirmation before editing. |
| — | **Validate_TestData_Search** | Housekeeping: checks that every fixture in `TestData/` still returns live flights, and repairs the ones that don't. |
| — | **Retest_Issues** | RC regression: re-tests a bug list (Global/ADO/run IDs or a bug sheet) from the Bug Registry (`Artifacts/Bug_Registry.csv`) using approved repro recipes and one generic runner; verdict per bug (Fixed / Still reproduces / Blocked / Behaviour changed) plus neighbour flows. |

**Golden rule across all skills:** nothing gets guessed. If a fact isn't confirmed by the spec or
a live call, it's labeled `UNKNOWN` (or `INFERRED` when reasonably deduced) rather than assumed.

## Key concepts

- **V1 vs V2** — Two parallel, independently versioned API contracts. V1 is simpler (no separate
  passenger step); V2 adds `AddPassenger`, ancillaries, seat maps, and fare re-validation. They are
  *not* interchangeable — see `SPEC.md` §1.4 for the full contract diff.
- **Supplier + Credentials Selector** — Every request is scoped to a `supplier` (e.g.
  `TravelportNdc`) and a `credentialsSelector` (e.g. `UAE`, a region/credential set). Capability
  (Bundle, Hold, Ancillary, SeatMap support) varies by supplier and must be checked before
  scheduling a test — see `SPEC.md` §4.
- **Flows** — 89 defined end-to-end booking flows (24 for V1, 65 for V2), each a specific chain
  like `Search → FareConfirm → Book → Retrieve`, gated by supplier capability.
- **Living spec** — `SPEC.md` is expected to change as tests confirm or contradict it. Updates
  only happen through `Update_Spec_From_Findings`, never silently.

## Where to start

- New to the project? Follow [Getting started from scratch](#getting-started-from-scratch) top to
  bottom, then read `NDC_Integration/KB/00_Start_Here.md` (the project Knowledge Base: domain,
  supplier facts, environments, lessons learned) and run your first smoke test from there.
- To understand the API itself: read `NDC_Integration/SPEC.md`.
- To understand the QA automation this project builds on top of: read `NDC_Integration/NDC_PRD.md`.
- To run a test cycle: see [Running a test cycle](#running-a-test-cycle), or jump straight to the
  `Generate_Test_Cases` or `Execute_Test_cases` skill (see `NDC_Integration/Prompts/` for
  ready-to-use prompt templates).
- To see what a completed run looks like: open any `.html` file under
  `NDC_Integration/Artifacts/Logs/`.
