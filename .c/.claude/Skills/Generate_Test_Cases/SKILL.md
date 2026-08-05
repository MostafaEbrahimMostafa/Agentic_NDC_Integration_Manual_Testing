---
name: generate-test-cases
description: >-
  Generates structured manual test cases (positive, negative, boundary, validation, business-rule,
  security, integration, regression) for the NDC Integration API, output as CSV rows matching the
  project's actual TestCases_V1.csv/V2.csv schema and titled per the house Azure DevOps naming
  convention in references/Sample_Test_Cases.md. The single source of truth is NDC_Integration/SPEC.md
  — its endpoint contracts (§2), integration dependencies (§3), supplier capabilities (§4), 89-flow
  matrix (§5), flow validation rules (§6), and its own §8 Test Case Generation Rules, which this skill
  follows directly. Use when asked to generate, write, draft, or produce test cases for an endpoint
  (e.g. Search, FareConfirm, Book, Hold), a flow number (1-89), a supplier, a test category
  (smoke/regression/negative/boundary/security/etc.), or a full coverage matrix. Not for actually
  calling the API or recording results — use the execute-test-cases skill for that.
---

# Generate Test Cases — Senior QA Solution Architect (Airline NDC APIs)

You are producing manual test cases the way a Senior QA Solution Architect specialized in Airline
NDC APIs would: precise enough that another engineer (or another AI agent) can execute them without
guessing a field name, a header, an expected status, or which supplier a capability applies to.

## Source of truth

`NDC_Integration/SPEC.md` is authoritative and is a **living document** — re-read the relevant
section fresh for every generation request rather than relying on memory of a previous session,
since `UNKNOWN`/`INFERRED` markers in it get resolved and folded back in over time (see its own
Appendix). Do not invent a field, endpoint, status code, or capability that isn't in SPEC.md or the
underlying Postman collections (`Postman_Collection/Collection_V1/`, `Collection_V2/`,
`Environment/STAG_ENV.postman_environment.json`) — if something needed to write a precise test case
is marked `UNKNOWN` there, generate a test case that **confirms** it live (per §7.9) rather than
guessing an expected value.

## Scope

One generation request = one clearly bounded scope: a single endpoint (§2.1–§2.15), a single flow
number or range (§5.4), a single supplier or the capability-conflicted set (§4.4), a single test
category (§7.1–§7.14), or an explicit "full matrix" request. If the user's ask is open-ended ("give
me some test cases for the API"), ask which scope before generating — don't default silently to
"everything," since the full matrix is large (89 flows × up to 8 categories each).

## Process

1. **Identify the target(s)** from the request: endpoint name(s) → SPEC.md §2.*n*; flow number(s) →
   SPEC.md §5.4 row(s), resolved to their (Version, Fare Selection, Enrichment, Family) tuple;
   supplier(s) → SPEC.md §4.6 capability row.

2. **For endpoint-level generation**, apply the 8-category recipe in SPEC.md §8.1 against that
   endpoint's §2.*n* entry, in order:
   - Positive — one per required field (valid case) + one per optional field (present/absent).
   - Negative — one per §2.*n* "Negative Cases," plus a generic per-required-field
     omit/wrong-type/empty sweep.
   - Boundary — from any field with stated or inferred cardinality (passenger counts including the
     confirmed 9-passenger maximum in §2.1, ancillary quantity, array fields at 0/1/many).
   - Validation — one per §2.*n* "Request Rules"/"Request Validation" bullet.
   - Business Rule — the price-reconciliation formula (§2.1) applied to this endpoint where it
     returns pricing, plus any capability-flag-consistency check (§6.2 item d).
   - Security — the three universal checks in §7.14 (api-key, client-id, cross-tenant
     supplier/credentialsSelector access) plus the injection-payload check on any free-text field.
   - Integration — one per "IDs Required By Next Endpoint" row, as a two-endpoint hand-off (§3.2).
   - Regression — a schema-diff case against the `[Observed example]` response in §2.*n*, where one
     exists.

3. **For flow-level generation**, apply the recipe in SPEC.md §8.2:
   - Resolve the flow # to its tuple and endpoint chain (§5.1 legend + §5.4 row).
   - Pull preconditions from §6.1 (universal) plus §4.7 (run the capability-confirmation procedure
     for the target supplier if its required capabilities are `Unknown`/`Conditional` per §4.4/§4.6
     — generate that confirmation check as its own prerequisite test case, don't assume).
   - Pull the ID-propagation chain from §6.2, filtered to the steps actually present.
   - Pull state-validation assertions from §6.3 (matching terminal family A–F) and §6.4 (matching
     enrichment code(s): BDL/ANC/SM/FCK combinations) and §6.5 if Hold or Void is present.
   - Generate the positive case (full chain, all assertions passing) and one negative case per hop
     (an invalid/stale ID substituted at that hop, per §7.2).
   - If the flow number falls in one of the anomaly ranges flagged in §5.5 (duplicates #16/#81, the
     disputed AddPassenger omission and FareConfirm/Upselling/version-label contradictions in flows
     72–89), state the anomaly explicitly in the generated test case's notes rather than silently
     resolving it one way — let the executor/tester see the ambiguity.

4. **Always cover known findings already in SPEC.md when they fall in scope**: the five collection
   defects and one security finding (§7.14/§8.4 item 1), the seven supplier-capability conflicts
   (§4.4), and any flow anomaly touching the requested scope (§5.5). These are cheap, high-value,
   and already-diagnosed — never omit them silently because they weren't explicitly asked for.

5. **Write each case using the template** in
   [references/test-case-template.md](references/test-case-template.md) — CSV row schema, ID scheme,
   the house title-naming convention, and three fully worked examples (endpoint-level, flow-level, and
   a senior-QC-addendum pattern) to calibrate detail level.

6. **Title every case per the house naming convention**, not free prose. The team's real Azure DevOps
   Test Case suite ([references/Sample_Test_Cases.md](references/Sample_Test_Cases.md) — an export of
   hundreds of actual work-item titles) shows the convention this skill must match:
   `[<Scope-tag>][<Request|Response>] <Verb> <condition under test>.` — full rule, verb choice
   (Validate vs. Verify), and anti-patterns to avoid (duplicate-marker suffixes, inconsistent spacing)
   are in the template's "Title naming convention" section. A differently-styled title is a title
   nobody can bulk-import into the same ADO area as the rest of the suite.

7. **Layer in these senior-QC coverage angles on top of SPEC.md §8's eight categories** wherever they
   apply to the target scope — they're patterns the historical suite (`Sample_Test_Cases.md`) tests
   for repeatedly that §8.1/§8.2's recipe doesn't spell out by name. File each under whichever of the
   eight categories fits, per the mapping below — don't invent a ninth category:
   - **Request/response echo consistency** (→ Validation): does the response echo request values
     (`supplier`, `credentialsSelector`, origin/destination, passenger data) back unchanged, not just
     schema-valid? (Worked example 3 in the template.)
   - **Uniqueness/no-duplication** (→ Validation or Boundary): are IDs that must be unique actually
     unique within one response/request — `segmentRefId`, `documentNumber`, passenger IDs?
   - **Cross-endpoint error-message consistency** (→ Negative or Security): does the same invalid
     `supplier`/`credentialsSelector` produce the same error shape across Search, FareConfirm, and Book,
     rather than drifting per endpoint?
   - **Derived-field arithmetic** (→ Business Rule): fields computed from other fields must reconcile —
     `numberOfStops` = segment count − 1, flight time = arrival − departure, arrival-before-next-departure
     ordering in multi-stop journeys — in addition to the price-reconciliation formula already called
     out in §8.1 item 5.
   - **String-field boundary specifics** (→ Boundary): exact-max-length accepted / max+1 rejected,
     whitespace-only rejected, case sensitivity (e.g. promo codes), special characters accepted/rejected
     per field — more granular than a bare "boundary" bullet.
   - **Expiry/repeat-within-window lifecycle** (→ Validation, cross-ref §6.5): repeated calls within a
     stated expiry window (e.g. re-confirming FareConfirm multiple times inside 15 minutes) behave as
     documented, not just the single-call happy path.

8. **Flag out-of-SPEC.md scope rather than fabricating it.** `Sample_Test_Cases.md` also contains
   entire suites with no counterpart anywhere in SPEC.md — an NBO back-office admin portal (supplier
   credential management), an App-Service environment matrix (Development/Staging/UAT/Prod credential
   sets), promo codes, response caching/compression, and money-collection requests. These are real
   prior QA scope, but this skill's source of truth stops at SPEC.md's documented surface (§2 endpoints,
   §5 flows, §4 suppliers) — per this skill's own non-goal, it does not extend coverage into undocumented
   product surface by inference from old titles. If the user asks for test cases in one of these areas,
   say so explicitly and point out that SPEC.md would need a corresponding section first (a separate ask
   from this generation task), rather than guessing at fields and behavior that were never captured.

## Output

- **Default output is a CSV row appended to `NDC_Integration/TestCases/TestCases_<Version>.csv`**
  (`TestCases_V1.csv` / `TestCases_V2.csv`, or both for a "Both"-version scope) — this is the format
  already in production use, and it's what `NDC_Integration/TestCases/ConvertTo-Html.ps1` reads to
  regenerate the stakeholder-facing HTML report (`TestCases_V1.html` / `TestCases_V2.html`). Match its
  exact 15-column schema and `RowType` values (`Flow` / `EndpointTestCase`) per
  [references/test-case-template.md](references/test-case-template.md) — a differently-shaped file
  silently breaks that conversion.
  - After adding rows, re-run `ConvertTo-Html.ps1` for the affected version(s) so the HTML report
    stays in sync with the CSV, unless the user says they'll do that themselves.
  - Only fall back to a plain markdown table (in `NDC_Integration/TestCases/<scope-name>.md`) if the
    user explicitly asks for a quick, non-CSV read — e.g. a scratch review copy, not a deliverable —
    and say so when you do.
- One CSV (or markdown table, if that fallback applies) per generation request — don't split a single
  scope's output across multiple files unless the user asks.
- If the requested scope is large enough that full detail would be unwieldy (e.g. "generate the
  full 89-flow matrix at full detail"), say so and propose the SPEC.md §8.4 priority ordering as a
  phased alternative instead of silently truncating coverage.

## Non-goals

- Not for executing requests, calling the live API, or recording pass/fail — use
  `execute-test-cases`.
- Not a substitute for the PRD-described Java/TestNG automation suite; this produces manual/human-
  or-agent-executable test cases against the API contract in SPEC.md.
- Not a SPEC.md editing task — if generation surfaces a genuine SPEC.md gap or error (not just an
  `UNKNOWN` needing live confirmation), flag it to the user rather than silently patching SPEC.md.
