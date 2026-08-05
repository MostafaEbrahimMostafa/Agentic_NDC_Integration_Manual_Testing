# =====================================================================================
#  NdcV1.Harness.ps1  -  reusable execution harness for the V1 test cases
# =====================================================================================
#  Dot-source NdcV1.Extracted.ps1 FIRST, then this file, then call Start-NdcRun.
#  Owns: HTTP transport, request-body builders, SPEC 2.1 price validation,
#        JSONL logging and live Markdown re-render (generate-qa-report contract).
#  ASCII-only source (PS 5.1 reads .ps1 as ANSI).
# =====================================================================================

$ErrorActionPreference = "Continue"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$Global:DASH = [string][char]0x2014
$Global:SECT = [string][char]0x00A7

function Now-Iso { (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") }

# ---------------------------------------------------------------- run lifecycle
function Start-NdcRun {
  param(
    [Parameter(Mandatory)][string] $EnvKey,        # key into $Global:NdcEnvs, e.g. STAG
    [Parameter(Mandatory)][string] $ScopeTag,      # slug suffix, e.g. TestCases_V1
    [Parameter(Mandatory)][string] $Scope,         # human description for the report header
    [int] $PlannedTestCases = 0,
    [string] $Slug,                                # omit to mint a new timestamped slug
    [string] $EnvironmentNote,
    [string] $LogsDir = "g:\Software Testing\Sheen Company\AI Agent\NDC Manual Testing\NDC_Integration\Artifacts\Logs",
    [string] $RawDir,
    [switch] $Resume                               # attach to an existing slug, no run_start
  )
  $e = $Global:NdcEnvs[$EnvKey]
  if (-not $e) { throw "Unknown EnvKey '$EnvKey'. Known: $(($Global:NdcEnvs.Keys) -join ', ')" }
  if (-not $Slug) { $Slug = (Get-Date -Format "yyyyMMdd-HHmmss") + "_" + $ScopeTag }
  if (-not $RawDir) { $RawDir = Join-Path $env:TEMP ("ndc_raw_" + $Slug) }

  $Global:NDC = @{
    EnvKey   = $EnvKey
    BaseUrl  = $e.BaseUrl
    Headers  = $Global:NdcHeaders
    Supplier = $e.Supplier
    CredSel  = $e.CredSel
    Slug     = $Slug
    LogsDir  = $LogsDir
    RawDir   = $RawDir
  }
  $Global:NDC.JsonlPath = Join-Path $LogsDir ($Slug + ".jsonl")
  $Global:NDC.MdPath    = Join-Path $LogsDir ($Slug + ".md")
  $Global:NDC.HtmlPath  = Join-Path $LogsDir ($Slug + ".html")
  if (-not (Test-Path $LogsDir)) { New-Item -ItemType Directory -Force $LogsDir | Out-Null }
  if (-not (Test-Path $RawDir))  { New-Item -ItemType Directory -Force $RawDir  | Out-Null }

  if (-not $Resume) {
    if (-not $EnvironmentNote) {
      $EnvironmentNote = if ($e.IsStaging) { "staging" } else { "NON-STAGING - booking endpoints gated" }
    }
    Add-NdcLog @{
      type = "run_start"; scope = $Scope; environment = $EnvironmentNote
      baseUrl = $e.BaseUrl; supplier = $e.Supplier; credentials_selector = $e.CredSel
      started_at = (Now-Iso); total_test_cases_planned = $PlannedTestCases
    }
  }
  Write-Host ("run: " + $Slug + "  ->  " + $Global:NDC.MdPath)
  return $Global:NDC
}

# ---------------------------------------------------------------- HTTP
# Returns hashtable: ok, status, body, json, ms, err, uri, rawFile
function Invoke-Ndc {
  param(
    [Parameter(Mandatory)][string] $Path,
    [Parameter(Mandatory)][hashtable] $Body,
    [string] $Tag = "call",
    [int] $TimeoutSec = 180,
    [string] $OverrideBaseUrl       # pass "" to reproduce the SPEC 2.3 requestUrl defect
  )
  $base = $Global:NDC.BaseUrl
  if ($PSBoundParameters.ContainsKey('OverrideBaseUrl')) { $base = $OverrideBaseUrl }
  $uri  = "$base$Path"
  $json = $Body | ConvertTo-Json -Depth 20
  $out  = @{ ok=$false; status=0; body=""; json=$null; ms=0; err=""; uri=$uri; rawFile="" }

  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  try {
    $r = Invoke-WebRequest -Uri $uri -Method Post -Headers $Global:NDC.Headers -Body $json `
           -ContentType "application/json" -TimeoutSec $TimeoutSec -UseBasicParsing
    $sw.Stop(); $out.ok = $true; $out.status = [int]$r.StatusCode; $out.body = $r.Content
  } catch {
    $sw.Stop(); $out.err = $_.Exception.Message
    if ($_.Exception.Response) {
      try { $out.status = [int]$_.Exception.Response.StatusCode } catch {}
      try {
        $sr = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $out.body = $sr.ReadToEnd()
      } catch {}
    }
  }
  $out.ms = $sw.ElapsedMilliseconds
  if ($out.body) { try { $out.json = $out.body | ConvertFrom-Json } catch {} }

  # Raw request+response kept OUTSIDE the committed artifacts: with isdebug=true these
  # carry supplierRequest/supplierResponse, which contain live supplier credentials (SPEC 7.14).
  $f = Join-Path $Global:NDC.RawDir ($Tag + "_" + (Get-Date -Format "HHmmss") + ".txt")
  @("URI: $uri", "STATUS: $($out.status)  ms=$($out.ms)", "ERR: $($out.err)",
    "--- REQUEST ---", $json, "--- RESPONSE ---", $out.body) | Set-Content -Path $f -Encoding utf8
  $out.rawFile = $f
  return $out
}

# ---------------------------------------------------------------- logging
function Add-NdcLog {
  param([Parameter(Mandatory)][hashtable] $Obj)
  $line = ($Obj | ConvertTo-Json -Depth 25 -Compress)
  # Retry both the append and the re-render: more than one execution batch may be writing
  # to the same run's artifacts, and a transient file lock must never be mistaken for a
  # test-case failure.
  for ($i = 1; $i -le 8; $i++) {
    try { $line | Add-Content -Path $Global:NDC.JsonlPath -Encoding utf8 -ErrorAction Stop; break }
    catch { if ($i -eq 8) { throw } ; Start-Sleep -Milliseconds (120 * $i) }
  }
  # Always attempt the re-render so the .md never lags the .jsonl. SkipMdRender only downgrades a
  # concurrent writer to best-effort (one try, failure swallowed) instead of skipping outright --
  # skipping entirely lets the report go stale, which is the one thing this file must not do.
  $tries = if ($Global:NDC.SkipMdRender) { 1 } else { 8 }
  for ($i = 1; $i -le $tries; $i++) {
    try { Render-NdcMd; break }
    catch { if ($i -eq $tries) { Write-Host ("md render skipped this pass: " + $_.Exception.Message) } else { Start-Sleep -Milliseconds (120 * $i) } }
  }
}
Set-Alias Add-LogLine Add-NdcLog

function Esc-Md { param([string]$s) if ($null -eq $s) { return "" } return ($s -replace '<','&lt;' -replace '>','&gt;') }

# UTC ISO stamp -> Egypt local wall-clock (UTC+2 EET / UTC+3 EEST, DST-aware)
function To-EgyptTime {
  param([string]$IsoUtc)
  if (-not $IsoUtc) { return "" }
  $utc = ([datetime]$IsoUtc).ToUniversalTime()
  $tz  = [System.TimeZoneInfo]::FindSystemTimeZoneById('Egypt Standard Time')
  $loc = [System.TimeZoneInfo]::ConvertTimeFromUtc($utc, $tz)
  $ab  = if ($tz.IsDaylightSavingTime($loc)) { 'EEST' } else { 'EET' }
  return ($loc.ToString('yyyy-MM-dd HH:mm:ss') + ' ' + $ab)
}

function Render-NdcMd {
  $lines = @(Get-Content -Path $Global:NDC.JsonlPath -Encoding utf8 |
             Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
  $start = $lines | Where-Object { $_.type -eq 'run_start' } | Select-Object -First 1
  $end   = $lines | Where-Object { $_.type -eq 'run_end' }   | Select-Object -First 1
  $tcs   = @($lines | Where-Object { $_.type -eq 'test_case' })
  $finds = @($lines | Where-Object { $_.type -eq 'finding' })
  $props = @($lines | Where-Object { $_.type -eq 'spec_update_proposed' })
  $clean = @($lines | Where-Object { $_.type -eq 'cleanup' })
  $D = $Global:DASH

  $o = New-Object System.Collections.Generic.List[string]
  $o.Add("# QA Execution Report " + $D + " " + $start.scope)
  $o.Add("")
  $o.Add("**Environment:** " + $start.environment + " &middot; " + $start.baseUrl + "  ")
  $o.Add("**Supplier:** " + $start.supplier + "  ")
  $o.Add("**Started:** " + (To-EgyptTime $start.started_at) + " (" + $start.started_at + ")  ")
  $dur = $null
  if ($end -and $end.ended_at -and $start.started_at) {
    $o.Add("**Ended:** " + (To-EgyptTime $end.ended_at) + " (" + $end.ended_at + ")  ")
    $ts = ([datetime]$end.ended_at).ToUniversalTime() - ([datetime]$start.started_at).ToUniversalTime()
    $dur = ('{0:00}h {1:00}m {2:00}s' -f [int]$ts.TotalHours, $ts.Minutes, $ts.Seconds)
    $o.Add("**Execution time:** " + $dur + "  ")
  }
  if ($end) {
    if ($end.status -eq 'complete') { $o.Add("**Status:** COMPLETE  ") }
    else { $o.Add("**Status:** INTERRUPTED " + $D + " after " + $end.interrupted_after_tc + " (" + $tcs.Count + "/" + $end.of_total + ")  ") }
  } else { $o.Add("**Status:** RUNNING  ") }
  $o.Add("")
  $o.Add("## Summary")
  $o.Add("")
  $o.Add("- Test cases logged: " + $tcs.Count + " of " + $start.total_test_cases_planned + " planned")
  if ($dur) { $o.Add("- Execution time: " + $dur + " (" + (To-EgyptTime $start.started_at) + " " + $D + " " + (To-EgyptTime $end.ended_at) + ")") }
  $o.Add("- Passed: "  + @($tcs | Where-Object { $_.verdict -eq 'PASS' }).Count)
  $o.Add("- Failed: "  + @($tcs | Where-Object { $_.verdict -eq 'FAIL' }).Count)
  $o.Add("- Blocked: " + @($tcs | Where-Object { $_.verdict -eq 'BLOCKED' }).Count)
  $o.Add("")
  $o.Add("## Test case results")
  $o.Add("")
  if (-not $tcs.Count) { $o.Add("_No test cases logged yet._"); $o.Add("") }
  foreach ($t in $tcs) {
    $o.Add("### " + $t.tc_id + " " + $D + " " + $t.title)
    $o.Add("")
    $o.Add("- Endpoint Name: " + $t.endpoint_or_flow)
    $o.Add("- Request: "  + (Esc-Md $t.request_summary))
    $o.Add("- Response: " + (Esc-Md $t.response_summary))
    $o.Add("- Expected (" + $t.spec_ref + "): " + (Esc-Md $t.expected))
    $o.Add("- Actual: " + (Esc-Md $t.actual))
    $o.Add("- Status: **" + $t.verdict + "**")
    $o.Add("- Evidence: " + (Esc-Md $t.evidence))
    if ($t.supplier) { $o.Add("- Supplier (override): " + $t.supplier) }
    if ($t.hops) {
      $o.Add("")
      $o.Add("Hops (" + @($t.hops).Count + "):")
      foreach ($h in $t.hops) {
        $o.Add("  " + $h.hop + ". " + $h.endpoint + " " + $D + " Status: **" + $h.verdict + "**")
        $o.Add("     - Request: "  + (Esc-Md $h.request_summary))
        $o.Add("     - Response: " + (Esc-Md $h.response_summary))
        $o.Add("     - Expected: " + (Esc-Md $h.expected))
        $o.Add("     - Actual: "   + (Esc-Md $h.actual))
        $o.Add("     - Evidence: " + (Esc-Md $h.evidence))
      }
    }
    $o.Add("")
  }
  $o.Add("## Findings")
  $o.Add("")
  if (-not $finds.Count) { $o.Add("_No findings logged yet._") }
  foreach ($f in $finds) {
    if ($f.kind -eq 'defect') {
      $o.Add("- **DEFECT** " + $D + " " + (Esc-Md $f.summary) + " (" + $f.spec_ref + ", " + $f.related_tc_id + ")")
      if ($f.field_name)     { $o.Add("  - Field: ``" + $f.field_name + "``") }
      if ($f.expected_value) { $o.Add("  - Expected value: " + (Esc-Md $f.expected_value)) }
      if ($f.impact)         { $o.Add("  - Impact: " + (Esc-Md $f.impact)) }
      if ($f.evidence)       { $o.Add("  - Evidence: " + (Esc-Md $f.evidence)) }
    } else {
      $o.Add("- **Unknown-resolution** " + $D + " " + (Esc-Md $f.summary) + " (" + $f.spec_ref + ", " + $f.related_tc_id + ")")
      if ($f.evidence) { $o.Add("  - Evidence: " + (Esc-Md $f.evidence)) }
    }
  }
  $o.Add("")
  $o.Add("## Proposed SPEC.md updates")
  $o.Add("")
  if (-not $props.Count) { $o.Add("_No SPEC.md updates proposed yet._") }
  else {
    $latest = @{}
    foreach ($p in $props) { $latest[($p.section + "||" + $p.old_text)] = $p }
    foreach ($k in $latest.Keys) {
      $p = $latest[$k]
      $o.Add("- **" + $p.section + " " + $D + " " + $p.status + "** " + $D + " Replace: ``" + (Esc-Md $p.old_text) + "`` With: ``" + (Esc-Md $p.new_text) + "``")
    }
  }
  $o.Add("")
  $o.Add("## Cleanup / follow-up")
  $o.Add("")
  if (-not $clean.Count) { $o.Add("_Nothing left needing cleanup._") }
  foreach ($c in $clean) {
    $label = "Needs Void/Cancel"
    if ($c.kind -eq 'family_b_hold') { $label = "Family-B hold" }
    $o.Add("- **" + $label + "** " + $D + " PNR ``" + $c.pnr + "`` (" + $c.related_tc_id + ") " + $D + " " + (Esc-Md $c.note))
  }
  $o.Add("")
  ($o -join "`r`n") | Set-Content -Path $Global:NDC.MdPath -Encoding utf8
}

# ---------------------------------------------------------------- SPEC 2.1 price validation
# Separates the three distinct claims SPEC 2.1 makes, so a missing itemization is never
# conflated with wrong arithmetic:
#   aggregateOk  : totalBase + totalTax == totalAmount, and per-pax sums roll up to the totals
#   itemizedOk   : sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount  (per pax)
#   missingFields: documented fields absent from the response entirely
function Test-NdcPrice {
  param([Parameter(Mandatory)] $Offer, [hashtable] $PaxCounts)
  $msgs = New-Object System.Collections.Generic.List[string]
  $missing = New-Object System.Collections.Generic.List[string]
  $itemizedOk = $true; $aggregateOk = $true
  $sumBase = 0.0; $sumTax = 0.0

  foreach ($p in $Offer.passengerFareBreakdown) {
    $ptc = $p.passengerTypeCode
    $n = 1
    if ($PaxCounts -and $PaxCounts.ContainsKey($ptc)) { $n = [int]$PaxCounts[$ptc] }

    if ($null -eq $p.PSObject.Properties['paxTotalAmount']) { $missing.Add("$ptc.paxTotalAmount") }

    $declaredTax = [double]$p.paxTotalTaxAmount.amount
    $items = @($p.taxesAndFees)
    if ($items.Count -eq 0) {
      if ($declaredTax -ne 0) {
        $itemizedOk = $false
        $msgs.Add("$ptc taxesAndFees[] empty but paxTotalTaxAmount=$declaredTax")
      }
    } else {
      $s = 0.0; foreach ($t in $items) { $s += [double]$t.amount.amount }
      if ([Math]::Abs($s - $declaredTax) -gt 0.011) {
        $itemizedOk = $false
        $msgs.Add("$ptc sum(taxesAndFees)=$s != paxTotalTaxAmount=$declaredTax")
      }
    }
    $sumBase += ([double]$p.paxBaseAmount.amount) * $n
    $sumTax  += $declaredTax * $n
  }

  $pd = $Offer.priceDetails
  $tb = [double]$pd.totalBaseAmount.amount
  $tt = [double]$pd.totalTaxAmount.amount
  $ta = [double]$pd.totalAmount.amount
  if ([Math]::Abs(($tb + $tt) - $ta) -gt 0.011) {
    $aggregateOk = $false; $msgs.Add("totalBase($tb)+totalTax($tt) != totalAmount($ta)")
  }
  if ([Math]::Abs($sumBase - $tb) -gt 0.011) {
    $aggregateOk = $false; $msgs.Add("sum(paxBase*count)=$sumBase != totalBaseAmount=$tb")
  }
  if ([Math]::Abs($sumTax - $tt) -gt 0.011) {
    $aggregateOk = $false; $msgs.Add("sum(paxTax*count)=$sumTax != totalTaxAmount=$tt")
  }
  $msgs.Add("totals base=$tb tax=$tt total=$ta currency=$($pd.totalAmount.currency)")

  return @{
    aggregateOk = $aggregateOk
    itemizedOk  = $itemizedOk
    missing     = @($missing)
    ok          = ($aggregateOk -and $itemizedOk -and $missing.Count -eq 0)
    total       = $ta
    currency    = $pd.totalAmount.currency
    detail      = ($msgs -join "; ")
  }
}

# ---------------------------------------------------------------- V1 body builders
function Body-Search {
  param([string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel,
        [string]$Origin, [string]$Dest, [string]$Date, [array]$Pax, [bool]$Dbg = $false,
        [hashtable]$SearchModifiers)
  if (-not $Origin) { $Origin = $Global:NdcDefaultRoute.Origin }
  if (-not $Dest)   { $Dest   = $Global:NdcDefaultRoute.Destination }
  if (-not $Date)   { $Date   = $Global:NdcDefaultRoute.Date }
  if (-not $Pax)    { $Pax    = Get-NdcPax111 }
  $b = @{ supplier = $Supplier; credentialsSelector = $Cred
          searchCriteria = @(@{ origin=$Origin; destination=$Dest; date=$Date })
          passengers = $Pax; isdebug = $Dbg }
  if ($SearchModifiers) { $b.searchModifiers = $SearchModifiers }
  return $b
}

function Body-FareConfirm {
  param([Parameter(Mandatory)][string]$SearchResponseId, [Parameter(Mandatory)][string]$SelectedOfferId,
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  @{ supplier=$Supplier; credentialsSelector=$Cred
     searchResponseId=$SearchResponseId; selectedOfferId=$SelectedOfferId }
}

# V1 Upselling is a drop-in for FareConfirm (same field shape, same captured var names)
function Body-Upselling {
  param([Parameter(Mandatory)][string]$SearchResponseId, [Parameter(Mandatory)][string]$SelectedOfferId,
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  @{ supplier=$Supplier; credentialsSelector=$Cred
     searchResponseId=$SearchResponseId; selectedOfferId=$SelectedOfferId }
}

function Body-Bundles {
  param([Parameter(Mandatory)][string]$FareConfirmResponseId, [Parameter(Mandatory)][string]$SelectedOfferId,
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  @{ supplier=$Supplier; credentialsSelector=$Cred
     fareConfirmResponseId=$FareConfirmResponseId; selectedOfferId=$SelectedOfferId }
}

# Book and Hold share the V1 shape. Note capital "Supplier" per SPEC 2.9 and the saved body.
function Body-BookOrHold {
  param([Parameter(Mandatory)][string]$FareConfirmResponseId, [Parameter(Mandatory)][string]$SelectedOfferId,
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel,
        [array]$SelectedBundles = @(), [hashtable]$PassengersList, [hashtable]$ContactsList)
  if (-not $PassengersList) { $PassengersList = Get-NdcPassengersList }
  if (-not $ContactsList)   { $ContactsList   = Get-NdcContactsList }
  @{ Supplier=$Supplier; credentialsSelector=$Cred
     fareConfirmResponseId=$FareConfirmResponseId; selectedOfferId=$SelectedOfferId
     passengersList=$PassengersList; contactsList=$ContactsList; selectedBundles=$SelectedBundles }
}

function Body-Retrieve {
  param([Parameter(Mandatory)][string]$Pnr, [string]$GdsPnr = "", [Parameter(Mandatory)][string]$BookingToken,
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  @{ supplier=$Supplier; credentialsSelector=$Cred; pnr=$Pnr; gdsPnr=$GdsPnr; bookingToken=$BookingToken }
}

function Body-PnrReprice {
  param([Parameter(Mandatory)][string]$Pnr, [string]$GdsPnr = "", [Parameter(Mandatory)][string]$BookingToken,
        [string]$SurName = "", [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  @{ supplier=$Supplier; credentialsSelector=$Cred; pnr=$Pnr; gdsPNR=$GdsPnr
     bookingToken=$BookingToken; surName=$SurName }
}

function Body-BookAfterHold {
  param([Parameter(Mandatory)][string]$Pnr, [string]$GdsPnr = "", [Parameter(Mandatory)][string]$BookingToken,
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  @{ supplier=$Supplier; credentialsSelector=$Cred; pnr=$Pnr; gdsPnr=$GdsPnr; bookingToken=$BookingToken }
}

function Body-CancelAfterHold {
  param([Parameter(Mandatory)][string]$Pnr, [string]$GdsPnr = "", [Parameter(Mandatory)][string]$BookingToken,
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  @{ supplier=$Supplier; credentialsSelector=$Cred; pnr=$Pnr; gdsPNR=$GdsPnr; bookingToken=$BookingToken }
}

function Body-Void {
  param([Parameter(Mandatory)][string]$Pnr, [string]$GdsPnr = "", [Parameter(Mandatory)][string]$BookingToken,
        [string]$SurName, [array]$VoidTickets = @(),
        [string]$Supplier = $Global:NDC.Supplier, [string]$Cred = $Global:NDC.CredSel)
  if (-not $SurName) { $SurName = $Global:NdcTestSurname }
  @{ supplier=$Supplier; credentialsSelector=$Cred; pnr=$Pnr; gdsPNR=$GdsPnr
     bookingToken=$BookingToken; surName=$SurName; voidTickets=$VoidTickets }
}

function Short { param([string]$s, [int]$n = 60)
  if ($null -eq $s) { return "" }
  if ($s.Length -le $n) { return $s }
  return $s.Substring(0,$n) + "..."
}

# Compact, redaction-safe summary of any response
function Sum-Resp {
  param($R, [string[]]$Fields)
  $parts = @("$($R.status)")
  if ($R.json) {
    foreach ($f in $Fields) {
      $v = $R.json.$f
      if ($null -ne $v) { $parts += ($f + "=" + (Short ([string]$v) 40)) }
    }
  } elseif ($R.body) { $parts += ("body=" + (Short $R.body 120)) }
  if ($R.err -and -not $R.json) { $parts += ("err=" + (Short $R.err 120)) }
  return ($parts -join ", ")
}

Write-Host "NdcV1.Harness loaded"
