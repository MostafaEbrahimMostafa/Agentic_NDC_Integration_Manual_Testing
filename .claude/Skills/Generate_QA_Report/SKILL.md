---
name: generate-qa-report
description: >-
  Persists and visualizes QA execution results as a real-time Markdown report (with a companion
  append-only JSONL log) under NDC_Integration/Artifacts/Logs/, live, while the execute-test-cases
  skill is running, then transforms that Markdown into a single self-contained HTML report the
  moment the run completes or stops. This is execute-test-cases's reporting/persistence companion —
  it does not run test cases or judge pass/fail itself; it takes each test case's verdict
  execute-test-cases already produced (per its own real-time reporting rule) and writes it to disk
  the moment that test case's result is known, then re-renders the Markdown so the file on disk is
  never more than one test case behind the conversation. The logged and counted unit is always one
  test case (one TC-ID) — internal execution hops within a multi-hop flow are nested diagnostic
  detail inside that test case's entry, never counted or reported as separate items themselves. Use
  whenever execute-test-cases is executing a test case, flow, or batch and needs its results
  persisted; also use standalone when asked to "generate a QA report," "build a report for the last
  run," "visualize test execution results," or "regenerate the report from the logs." Not for
  deciding verdicts, calling the API, or editing SPEC.md.
---

# Generate QA Report — QA Reporting Lead (Airline NDC APIs)

You are the QA Reporting Lead: your job is to make sure every execution run that `execute-test-cases`
performs leaves behind a durable, always-up-to-date record on disk — never a record that only
exists in the chat transcript, and never one that's silently incomplete because the run got
interrupted. You don't re-judge anything; you persist and visualize verdicts `execute-test-cases`
already reached.

This skill produces two artifacts in sequence, not one:

1. **A live Markdown report**, re-rendered after every single event while the run is in progress —
   this is the real-time view. Plain Markdown, not HTML, while the run is live: it's cheap to
   re-render on every test case, and readable by tailing/opening the file mid-run without a browser.
2. **A single HTML report**, generated once — on `run_end` or interruption — by transforming the
   final Markdown into the project's shared visual system (see "Final HTML transform" below). The
   HTML is not maintained live; it is a one-time rendering of the finished (or stopped) run.

## Relationship to execute-test-cases

`execute-test-cases` owns execution and verdicts, and reports them live in-conversation per its own
Output rules — including hop-by-hop detail within a flow, since a failure at hop 3 of an 8-hop flow
is diagnostically distinct from "the flow failed." This skill turns that same live stream into disk
artifacts, but at **test-case granularity**: one JSONL line and one report entry per test case
(TC-ID), not per hop. A test case's internal hops are folded into that one entry as nested detail —
never logged, counted, or displayed as if they were separate test cases.

- The moment a given test case's overall verdict is known — whether it's a single-endpoint test case
  (one hop = the whole case) or a flow-level test case (verdict only settles once its chain of hops
  finishes or one of them fails/blocks it), this skill writes that test case's event to the run's
  JSONL log **in the same turn** — not batched, not deferred to "when the run finishes."
- After every append, this skill re-renders the run's **Markdown** report from the full JSONL so far.
  The `.md` on disk always reflects every test case logged up to that point, including a run that
  stopped mid-batch or mid-flow.
- If `execute-test-cases` invokes a hard safety-rule stop, hits an error, or the user cancels
  partway through a flow-level test case, still append that test case's entry with whatever hops
  completed and `verdict: "BLOCKED"` (see schema's "Interrupted mid-test-case") — an interrupted flow
  is a real result, not a gap. The JSONL/Markdown pair already on disk **is** the report — no
  separate "finalize" step is required to make it legible. Append a `run_end` event with
  `status: "interrupted"` if you can, but the report must already be readable without it. Then run
  the final HTML transform (below) regardless of whether the run completed or was interrupted — a
  stopped run still gets its one-time HTML rendering from whatever is in the Markdown/JSONL so far.

Do not wait to write anything until "the end of the run" — there usually isn't a reliable end; the
run ends when it ends, sometimes unexpectedly. The Markdown must stay current throughout; only the
HTML transform is deferred, and only until run end/stop, never longer.

## Where artifacts live

All output goes under `NDC_Integration/Artifacts/Logs/`, up to three files per run:

- `NDC_Integration/Artifacts/Logs/<slug>.jsonl` — append-only, source of truth. Never rewritten,
  only appended to, one JSON object per line, per
  [references/log-schema.md](references/log-schema.md).
- `NDC_Integration/Artifacts/Logs/<slug>.md` — the live report, fully regenerated from the JSONL
  every time a new line is appended, per
  [references/report-template.md](references/report-template.md). This is the file to point someone
  at while the run is still going.
- `NDC_Integration/Artifacts/Logs/<slug>.html` — the finished-run report, generated **once**, from
  the final `.md`/`.jsonl`, at `run_end` or interruption, per
  [references/report-template.html](references/report-template.html). Does not exist yet while the
  run is still in progress.

`<slug>` is `<YYYYMMDD-HHMMSS>_<scope-tag>` — e.g. `20260804-143210_Flow-43` or
`20260804-091000_Search-Smoke`. Derive `<scope-tag>` from what `execute-test-cases` is running
(endpoint name, flow number, or test-case-file basename); ask the caller only if it's genuinely
ambiguous (e.g. an unnamed ad hoc batch). Pick the timestamp once, at `run_start`, and reuse it for
both files for the rest of the run — never re-timestamp mid-run.

## Process

1. **On run start** (before the first request `execute-test-cases` sends), create the `.jsonl` file
   with a single `run_start` line (scope, environment/`baseUrl`, start time, `total_test_cases_planned`),
   and render the `.md` immediately from just that line — an empty-but-real report, not a missing
   file, if the first test case is still in flight or fails before completing. Do **not** create the
   `.html` yet — it doesn't exist until the run ends or stops.
2. **On every test case's verdict** `execute-test-cases` settles, append one `test_case` line to the
   `.jsonl` immediately, then re-render the `.md` in full from all lines so far. For a flow-level
   test case, carry its internal hop results into that same line's `hops` array — do not log hops as
   their own top-level lines, and do not wait for multiple test cases to finish before writing. Never
   skip the re-render "to batch a few test cases" — the whole point is the file on disk staying
   current.
3. **On every finding** (`UNKNOWN`-resolution or SPEC.md contradiction) `execute-test-cases` surfaces,
   append a `finding` line (tagged with the `related_tc_id` it came from) and re-render the `.md`.
4. **On every proposed SPEC.md update**, append a `spec_update_proposed` line (status `pending` until
   the user confirms it — update that same run's record to `applied`/`declined` if you learn the
   outcome later in the conversation) and re-render the `.md`.
5. **On every cleanup item** (Family-B hold `pnr`, a booking left needing Void/Cancel), append a
   `cleanup` line (tagged with `related_tc_id`) and re-render the `.md` — these need to stay visually
   prominent (see template) since they're actionable outside this conversation.
6. **On run end or interruption**, append a `run_end` line (`status: complete` or `interrupted`, plus
   `interrupted_after_tc`/`of_total` if interrupted) and do a final `.md` re-render. If the run stopped
   mid-flow, first append that in-flight test case's own `test_case` line with `verdict: "BLOCKED"`
   and whatever `hops` completed (per log-schema.md's "Interrupted mid-test-case") — it must still
   count as a logged test case, not silently vanish. **Then run the final HTML transform** (below) —
   this is the one and only time `.html` gets written for this run.
7. **Redact exactly like execute-test-cases does.** Never write raw `supplierRequest`/
   `supplierResponse` debug fields (SPEC.md §7.14) into the JSONL, the Markdown, or the HTML — if a
   test case's `request_summary`/`actual`/`evidence`/`hops` fields would contain them, redact before
   writing, not after. This applies on disk even more strictly than in-conversation, since these
   files persist and may be opened by someone else later.
8. **Regenerating from an existing log**: if asked to rebuild/re-render a report (e.g. after editing
   a template, or recovering from a crash where the `.md` wasn't re-rendered for the last few lines),
   read the full `.jsonl` top to bottom and rebuild the `.md` from it (and the `.html`, if the run is
   already finished/stopped) — never hand-patch either file directly, since both must always be a
   pure function of the JSONL.

## Rendering the live Markdown

Use [references/report-template.md](references/report-template.md) as the base and re-render the
**entire** file from the JSONL every time, the same way the old HTML live-render worked — never
hand-append prose to the `.md` outside this structure. It mirrors the same sections the final HTML
will have, in plain Markdown:

- **Header line**: scope, environment/`baseUrl`, **supplier** (`run_start.supplier`), start time, and
  a status word — `RUNNING` while no `run_end` line exists yet, `COMPLETE` or
  `INTERRUPTED (after <TC-ID>, N/M)` once one does.
- **Summary line**: total test cases logged, passed, failed, blocked — recomputed from every
  `test_case` line each render, never carried over incrementally, and never inflated by counting
  internal hops.
- **Test case results**, in log order, one section per `test_case` line, listing exactly these six
  fields **in this order**: **Endpoint Name** (`endpoint_or_flow`), **Request** (`request_summary`,
  already redacted), **Response** (`response_summary`, already redacted), **Expected** (`expected`),
  **Actual** (`actual`), **Status** (`verdict`) — plus `evidence` as a closing line. Never drop
  Response in favor of just Actual; they answer different questions (what came back vs. whether it
  matched). If that line has a `hops` array (a flow-level test case), nest the per-hop breakdown as
  an indented sub-list under that same section, repeating the same six fields per hop — a hop is
  diagnostic detail for its parent test case, never its own top-level section.
- **Findings**: defects and `UNKNOWN`-resolutions listed separately — never conflate them.
- **Proposed SPEC.md updates**: one entry per `spec_update_proposed` line, showing old→new text and
  its status (pending/applied/declined).
- **Cleanup / follow-up**: PNR list from `cleanup` lines, called out clearly since these are live
  bookings someone still needs to act on.

## Final HTML transform (run end or interruption, once)

The moment `run_end` is appended (whether `status: complete` or `status: interrupted`), transform the
finished `.md`/`.jsonl` into `NDC_Integration/Artifacts/Logs/<slug>.html` using
[references/report-template.html](references/report-template.html) as the base. This happens exactly
once per run — it is not re-rendered on every event the way the `.md` is.

**Base template, superseding the earlier "keep it simple" guidance below**: as of 2026-08-23, the
actual base template for every future execution's HTML output is
`NDC_Integration/Artifacts/Logs/20260805-140642_TestCases_V1.html` — copy its full CSS, category/
toolbar/expand-collapse interactivity, hop "View req & response" toggle, and the Findings/Proposed-
SPEC-updates count-badge treatment verbatim, then populate it with this run's data. This supersedes
the previous instruction to avoid `TestCases_Report.html`'s filter bars/JS interactivity/dense layout —
that restriction no longer applies; the rich, interactive dashboard *is* now the standard for every
run's report, including single-flow ad hoc runs (wrap the run's scope in one `tc-category`, e.g.
`data-cat="flow-v1-01"`, so the same toolbar/filter/expand-collapse apparatus still applies even to a
one-test-case run). [references/report-template.html](references/report-template.html) has been
updated to mirror this structure with `<!-- DATA -->` placeholders — treat it as the copy-from
skeleton, and treat the 20260805 file as the canonical worked example when a placeholder's exact
shape is unclear.

The HTML carries the same design tokens (paper/surface/ink/accent/good/warning/serious/critical,
light+dark via `prefers-color-scheme` and a `data-theme` override) as
`NDC_Integration/TestCases/TestCases_Report.html`, so every QA artifact in this project reads as one
visual system. Populate the template, don't redesign it:

- **Header**: `<h1>QA Execution Report</h1>` plus a `meta-card` field block (Scope, Coverage,
  Description, Supplier, Credentials Selector, Environment, Started, Ended, Status) — Status is always
  `COMPLETE` or `INTERRUPTED — after <TC-ID> (N/M)` here, never `RUNNING` (that state only ever shows
  in the live `.md`).
- **Executive Summary**: the donut + stat-card layout (`.donut`/`.donut-hole`/`.donut-legend` plus
  `.scard-total`/`.summary-cards` for Passed/Failed/Blocked) — computed once from every `test_case`
  line in the final JSONL, never inflated by counting internal hops. A 1-test-case run still gets a
  donut (it'll just be 100% one color) — don't special-case it away.
- **Expand all / Collapse all** buttons (`.tc-actions`) above the "Test case results" section, plus a
  **second pair inside every category** (`.tc-cat-actions`, via the `.tc-cat-expand`/`.tc-cat-collapse`
  classes) that only expands/collapses that one category's cards.
- **Toolbar**: search box + status filter + **category filter** + **Reset** button + live count
  (`N / M shown`), and a red no-results message (`.tc-no-results`) that appears when a search/filter
  combination matches zero cards. Wire all of it through the same `applyFilter()` pattern (see the
  script block) — text search, status, and category all combine, and Reset clears all three.
- **Test case results**, grouped into **categories** (`details.tc-category[data-cat=...]`, each with an
  icon, name, pass/fail/blocked counts, and a chevron) — even a single ad hoc flow run gets wrapped in
  one category (e.g. `data-cat="flow-v1-01"`) rather than skipping the grouping. Inside each category,
  split into Positive/Negative `tc-subhead` groups when that distinction applies. Each test case card
  shows exactly these six fields **in this order**: **Endpoint Name**, **Request**, **Response**,
  **Expected**, **Actual**, **Status** badge — written in **plain, neutral, non-technical language** in
  these six visible rows (per this project's established convention — see the 20260805 file's cards
  for the calibration: translate HTTP codes/field names/jargon into plain wording, drop spec-section
  citations from the Expected label, keep concrete facts like dates/routes/passenger counts/amounts).
  Nest a flow's hop-by-hop detail as an expandable `details.hops` sub-list — hops keep **technical**
  wording (unlike the six visible rows), matching how `execute-test-cases` reports them. Add a "View
  req & response" underlined toggle per hop (see the script block's generic `.hop` pass — this is
  automatic, not something you hand-write per hop) so the Request/Response lines start collapsed and
  Expected/Actual/Evidence stay visible by default.

  **When the full raw request/response payload was actually captured** for a hop (not just a
  summarized line — e.g. `execute-test-cases` saved the real JSON body/response to disk during the
  run), render that hop's toggle content as a `.hop-reqres-panel` instead of the plain two-line
  summary: a "Request" block (`POST to <full URL>`, a HEADERS box listing the literal headers sent —
  `x-api-key` always shown as `••••••••(redacted)`, never the real value — then a BODY box with the
  full pretty-printed request JSON) followed by a "Response" block (`Status code <N>`, then a BODY box
  with the full pretty-printed response JSON). See
  [20260823-164037_FLOW-V1-01.html](../../../../NDC_Integration/Artifacts/Logs/20260823-164037_FLOW-V1-01.html)
  for the worked example and exact CSS classes (`.rr-title`/`.rr-line`/`.rr-label`/`.rr-box`/
  `.rr-headers-box`/`.rr-body-box`/`.rr-redacted`/`.rr-note`). Redact exactly like everywhere else in
  this skill — never print a raw `OriginalSupplierResponse`/`supplierRequest`/`supplierResponse`
  field; replace it with a one-line `[REDACTED — ... per SPEC.md §7.14]` placeholder inside the
  otherwise-full JSON body, not by omitting the whole body. If response headers weren't actually
  captured during execution, say so in an `.rr-note` rather than fabricating plausible-looking header
  values — never invent evidence. The generic script (`hop-reqres-panel` check before the two-`.hd`
  fallback) already handles both cases with no per-run JS changes needed — just choose which markup
  shape to emit per hop based on whether you actually have the full payload.

  Also render the `evidence` field as a collapsible
  `details.evidence`, and a closing `details.view-tc` "View Test Case" block (Preconditions/Steps/
  Expected Result/Actual Result) per card, matching the 20260805 file's pattern.
- **Findings section**: defects and `UNKNOWN`-resolutions in visually distinct blocks (serious vs.
  accent), with a `section-summary-flex` header showing count badges per kind (`section-count-badges`,
  one `scb-val.serious` badge for Defects and one `scb-val.accent` badge for Unknown-resolution) —
  never conflate the two kinds, per execute-test-cases's own rule that these mean different things.
- **Proposed SPEC.md updates**: one block per `spec_update_proposed` line, showing old→new text and
  its status (pending/applied/declined), with a `section-summary-flex` header showing a single
  `section-count-badge` total.
- **Cleanup / follow-up**: PNR list from `cleanup` lines, kept visually prominent (warning-colored
  `.cleanup` callout, not buried at the bottom in body text) since these are live bookings someone
  still needs to act on. Include the count in the callout's own lead line (e.g. "Live artifacts left
  behind this run (N):"), matching the 20260805 file's phrasing, rather than a header badge.
- Keep the file **fully self-contained** — inline CSS only, no CDN/external font/script references —
  since it's a local file meant to be opened directly in a browser, possibly by someone without
  network access to this project's tooling.
- Follow the project's existing chart conventions: status colors are reserved for verdict states and
  never reused as a generic categorical palette; thin marks; recessive gridlines; a table/list view is
  always present alongside the chart (the step list itself satisfies this — never chart-only).

## Non-goals

- Not for executing test cases or deciding verdicts — that's `execute-test-cases`; this skill only
  persists and visualizes what it already decided.
- Not for editing SPEC.md — proposed updates are recorded here for visibility, applied only where
  `execute-test-cases`'s own process says so (on user confirmation).
- Not a replacement for the in-conversation live reporting `execute-test-cases` already does — this
  skill mirrors that stream to disk, it doesn't replace or delay it.
- Not for generating the `TestCases_V1.html`/`TestCases_V2.html` coverage reports — those come from
  `generate-test-cases`'s CSV output; this skill is execution-results only.
- Not for turning a defect into a filable bug ticket — once a `defect` finding is logged here, apply
  the `generate-bug-report` skill (separately, typically once this run's report is done) to produce
  that per-defect Markdown report; this skill's own job stops at logging and visualizing the finding.
