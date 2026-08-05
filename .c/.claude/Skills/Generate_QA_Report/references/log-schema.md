# JSONL log schema

Source of truth for a run: `NDC_Integration/Artifacts/Logs/<slug>.jsonl`. One JSON object per line,
appended in the order events happen — never rewritten, never reordered. The HTML report is always a
full re-render from these lines, top to bottom.

**The countable, reportable unit is the test case (one TC-ID), not an internal execution hop.** A
single-endpoint test case has exactly one hop. A flow-level test case (SPEC.md §5.4) chains several
endpoint calls (Search → FareConfirm → Book, etc.) — those calls are hops *inside* one test case, not
separate loggable units themselves. Stat tiles, the proportion bar, and "N logged so far" all count
`test_case` lines, never raw hop counts.

Every line has a `type` field. Unknown/extra fields are fine to add per-run if a specific test case
needs to carry something extra (e.g. a `supplier` override) — the renderer should not choke on fields
it doesn't recognize.

## `run_start` (exactly one, first line)

```json
{"type":"run_start","scope":"Flow #43 — V2, Family B, Hold","environment":"staging",
 "baseUrl":"https://ndc-integration-stg-ne-3.azurewebsites.net/","supplier":"SUP_A",
 "credentials_selector":"SUP_A_DEFAULT","started_at":"2026-08-04T14:32:10Z",
 "total_test_cases_planned":12}
```

`total_test_cases_planned` is best-effort (e.g. a test-case file's row count, or 1 for a single ad hoc
flow/endpoint run) — used only to render "N of M so far" and the interrupted-run note; fine if a
later count differs. `supplier`/`credentials_selector` are the run's default — if a test case runs
against a different supplier/selector than the run default, it carries its own `supplier`/
`credentials_selector` field (below) which takes precedence for that one line.

## `test_case` (one per test case executed — the primary unit)

Appended once, the moment that test case's overall verdict is known — i.e. after its last hop
finishes for a passing/failing case, or as soon as a hop fails/blocks in a way that ends the case.
For a single-endpoint test case this is immediate (one hop = the whole case). For a flow-level test
case, don't wait to accumulate several test cases' worth of hops before writing this — write it as
soon as *this* test case's outcome is settled, then move to the next one.

```json
{"type":"test_case","tc_id":"TC-0412","title":"Validate FareConfirm price reconciliation for SUP_A",
 "endpoint_or_flow":"FareConfirm","verdict":"PASS","spec_ref":"§2.3",
 "supplier":"SUP_A",
 "request_summary":"POST /api/v2/FareConfirm — offerId=<redacted-id>, supplier=SUP_A",
 "response_summary":"200 — totalFare=482.00, currency=USD, offerId=<redacted-id>",
 "expected":"§2.3: 200, price fields reconcile per §2.1 formula",
 "actual":"200, totalFare=482.00, matches computed 482.00",
 "evidence":"computed 460.00 base + 22.00 tax = 482.00, matches totalFare",
 "correlation_id":"c4f2-...-redacted",
 "timestamp":"2026-08-04T14:33:02Z"}
```

- `verdict` is one of `PASS`, `FAIL`, `BLOCKED`.
- `request_summary`/`response_summary`/`actual`/`evidence` must already be redacted per SPEC.md
  §7.14 (no raw `supplierRequest`/`supplierResponse`) — redact before appending, the renderer does
  not re-redact.
- `response_summary` is the raw (redacted) shape of what came back — status code + the key fields
  the test case cares about — distinct from `actual`, which is the *interpreted* comparison against
  `expected` (e.g. "matches computed 482.00"). Both get shown; don't collapse one into the other.
- `supplier` is optional per-line — only set it when this test case's supplier differs from
  `run_start`'s default; otherwise the renderer falls back to the run-level `supplier`.
- `correlation_id` is optional — carry it when the response exposes one (e.g. a request/trace ID
  header), since it's the first thing a bug report needs to hand to the supplier/platform team.
- **`hops`** (optional array, only for flow-level test cases with more than one endpoint call) —
  internal diagnostic detail nested *inside* this one test case's line, never logged as separate
  top-level events and never counted on their own:

  ```json
  "hops":[
    {"hop":1,"endpoint":"Search","request_summary":"...","response_summary":"...","expected":"...",
     "actual":"...","verdict":"PASS","evidence":"..."},
    {"hop":2,"endpoint":"FareConfirm","request_summary":"...","response_summary":"...","expected":"...",
     "actual":"...","verdict":"PASS","evidence":"..."},
    {"hop":3,"endpoint":"Book","request_summary":"...","response_summary":"...","expected":"...",
     "actual":"...","verdict":"FAIL","evidence":"..."}
  ]
  ```

  This is what preserves execute-test-cases's own diagnostic rule that "hop 3 of an 8-hop flow
  failed" is more useful than "the flow failed" — the hop detail survives, just nested under its
  parent test case rather than being the thing that gets counted or shown as the top-level list.

## `finding` (one per UNKNOWN-resolution or SPEC.md contradiction)

```json
{"type":"finding","kind":"unknown_resolution","related_tc_id":"TC-0412",
 "summary":"FareConfirm error shape for expired offerId confirmed as {errorCode:'OFFER_EXPIRED'}",
 "spec_ref":"§2.3","evidence":"..."}
```

`kind` is `unknown_resolution` or `defect` — keep these visually and semantically separate in the
render, per execute-test-cases's own rule (new information vs. a regression/wrong assumption).

For a `defect` finding specifically, carry enough structured detail for the companion
`generate-bug-report` skill to turn it into a bug ticket without having to re-derive anything from
prose — add `field_name` (the exact response field at fault), `expected_value` (an example valid
value, not just "not null"), and `impact` (one line on what breaks downstream) alongside `summary`:

```json
{"type":"finding","kind":"defect","related_tc_id":"TC-0430",
 "field_name":"holdExpirationDate","summary":"holdExpirationDate returned null in Hold response",
 "spec_ref":"§6.3","expected_value":"2026-08-05T14:32:10Z",
 "impact":"Downstream cannot compute the Family-B hold's expiry, so cleanup/expiry tracking can't run",
 "evidence":"..."}
```

## `spec_update_proposed` (one per proposed edit)

```json
{"type":"spec_update_proposed","section":"§2.3","old_text":"Error shape for expired offerId: UNKNOWN",
 "new_text":"Error shape for expired offerId: {errorCode:'OFFER_EXPIRED', httpStatus:400}",
 "status":"pending"}
```

`status` starts `pending`; update to `applied` or `declined` with a new line of the same
`spec_update_proposed` shape (same `section`/`old_text`) if the outcome becomes known later in the
run — the renderer should use the latest line per `(section, old_text)` pair as current status.

## `cleanup` (one per live artifact left behind)

```json
{"type":"cleanup","kind":"family_b_hold","pnr":"ABC123","related_tc_id":"TC-0430",
 "note":"Held, not finalized — expires per holdExpirationDate"}
```

`kind` is `family_b_hold` or `needs_void_cancel`.

## `run_end` (at most one, last line when present)

```json
{"type":"run_end","status":"interrupted","interrupted_after_tc":"TC-0430","of_total":12,
 "reason":"safety-rule stop: non-staging baseUrl without authorization","ended_at":"2026-08-04T14:41:00Z"}
```

`status` is `complete` or `interrupted`. `interrupted_after_tc` names the last test case that
completed (or partially completed — see below) before the stop, not a raw hop count.

## Interrupted mid-test-case

If a run stops partway through a *flow-level* test case (some hops done, the case's own `test_case`
line never got written because its verdict was never reached), don't silently drop it: append a
`test_case` line for it anyway with `verdict:"BLOCKED"` and whatever `hops` did complete, so it still
counts and still shows up — an interrupted flow is a real (blocked) result, not a gap in the report.
