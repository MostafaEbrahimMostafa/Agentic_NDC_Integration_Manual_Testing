# NDC V1 execution harness

Reusable PowerShell harness for the `Execute_Test_cases` skill. It exists so a run never has to
re-parse the Postman collection or re-derive request shapes: everything extracted from
`Postman_Collection/` is captured once, in code, here.

## Files

| File | Purpose |
|---|---|
| `NdcV1.Extracted.ps1` | **Pre-extracted constants** from the Postman artifacts: environments, `x-api-key`/`Client-Id`, V1 endpoint paths, the collection's active test passengers/contacts, and the known collection defects. This is the file to update if the collection changes. |
| `NdcV1.Harness.ps1` | HTTP transport (`Invoke-Ndc`), request-body builders (`Body-*`), SPEC §2.1 price validation (`Test-NdcPrice`), JSONL logging (`Add-NdcLog`) and the live Markdown re-render (`Render-NdcMd`). |
| `NdcV1.FlowRunner.ps1` | `Invoke-NdcFlow` — runs an endpoint chain and logs it as **one** test case with per-hop detail nested inside, per the `generate-qa-report` contract. |
| `NdcV1.HtmlReport.ps1` | `Render-NdcHtml` — the one-time final HTML transform, rebuilt purely from the JSONL. |

## Usage

```powershell
$H = "g:\Software Testing\Sheen Company\AI Agent\NDC Manual Testing\NDC_Integration\Harness"
. "$H\NdcV1.Extracted.ps1"
. "$H\NdcV1.Harness.ps1"
. "$H\NdcV1.FlowRunner.ps1"
. "$H\NdcV1.HtmlReport.ps1"

# Start a run (mints a timestamped slug under NDC_Integration/Artifacts/Logs/)
Start-NdcRun -EnvKey STAG -ScopeTag TestCases_V1 `
             -Scope "TestCases_V1.csv - full V1 scope" -PlannedTestCases 59

# Run one flow as a single test case
Invoke-NdcFlow -TcId "FLOW-V1-01" -Title "..." `
  -Chain @("Search","FareConfirm","Book","Retrieve") `
  -Expected "..." -SpecRef "2.9, 6.3-Family-A"

# Close out and render the shareable HTML
Add-NdcLog @{ type="run_end"; status="complete"; ended_at=(Now-Iso) }
Render-NdcHtml
```

To **attach to an existing run** (a later batch, or a resumed one) pass the same slug plus `-Resume`,
which skips writing a second `run_start`:

```powershell
Start-NdcRun -EnvKey STAG -ScopeTag TestCases_V1 -Scope "x" -Slug "20260805-140642_TestCases_V1" -Resume
```

## Chain step tokens

`Invoke-NdcFlow -Chain` accepts: `Search`, `FareConfirm`, `Upselling`, `Bundles`, `Book`, `Hold`,
`Retrieve`, `PnrReprice`, `BookAfterHold`, `CancelHold`, `Void`. IDs are threaded between hops
automatically per SPEC §3.3/§6.2.

## Conventions worth knowing

- **ASCII-only source.** Windows PowerShell 5.1 reads `.ps1` as ANSI, so a UTF-8 em dash in these
  files is a parse error. Build non-ASCII output at runtime (`$Global:DASH`, `$Global:SECT`).
- **Raw request/response bodies stay out of the committed artifacts.** `Invoke-Ndc` dumps them to
  `$Global:NDC.RawDir` (a temp path) because with `isdebug=true` they contain
  `supplierRequest`/`supplierResponse`, which carry live supplier credentials (SPEC §7.14).
- **The countable unit is the test case, never the hop.** A flow's hops are nested detail on one
  `test_case` line.
- **`Test-NdcPrice` reports three things separately** — `aggregateOk`, `itemizedOk`, and `missing` —
  so "the response omits a documented field" is never conflated with "the arithmetic is wrong".

## Environment findings baked in (2026-08-05, `credentialsSelector=UAE`)

Usable suppliers: `TravelportNdc` (67 offers), `EgyptAir` (35), `RiyadhAir` (21), `AirCairo` (12),
`FlyDubai` (10). Not usable: `Emirates` (**not a valid supplier enum value**), `FlyAdeal` /
`SabreNDC` / `FlyNas` / `GLC` / `Galileo` / `SpiceJet` / `ElJazeera` (no active UAE credentials),
`AirArabia` (409), `Indigo` (500). `haveBundles` was `false` on every offer from every usable
supplier, and `Void` is unsupported for `TravelportNdc` (409 `OperationNotSupported`) while
`CancelAfterHold` works.
