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

- To understand the API itself: read `NDC_Integration/SPEC.md`.
- To understand the QA automation this project builds on top of: read `NDC_Integration/NDC_PRD.md`.
- To run a test cycle: start with the `Generate_Test_Cases` or `Execute_Test_cases` skill (see
  `NDC_Integration/Prompts/` for ready-to-use prompt templates).
- To see what a completed run looks like: open any `.html` file under
  `NDC_Integration/Artifacts/Logs/`.
