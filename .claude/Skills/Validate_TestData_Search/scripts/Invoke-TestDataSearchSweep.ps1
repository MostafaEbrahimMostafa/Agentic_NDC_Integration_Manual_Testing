<#
.SYNOPSIS
    Sweeps every NDC_Integration\TestData\*.json file through V2 Search and, with -Repair, rewrites
    the search criteria of any file that does not come back with flight offers.

.DESCRIPTION
    Read-only against the airline: the ONLY endpoint this script ever calls is
    `{BaseUrl}api/V2/FlightSearch/Search`. It never books, holds, voids, or cancels, so it is safe
    to run against any environment.

    Pass 1 (always) executes each TestData file's own `searchCriteria` + `passengers` as-is and
    records PASS (HTTP 200 with a non-empty `offers[]`) or FAIL (non-200, or 200 with `offers: []`).

    Pass 2 (only with -Repair) walks a candidate ladder for each failing file until one candidate
    returns offers, then edits ONLY the origin/destination/offsetDays values inside that file's
    `searchCriteria` block. Trip shape (number of legs) and the passenger mix are never changed --
    a test case that exists to exercise 3 ADT + 3 CHD + 3 INF on a 2-leg itinerary must keep
    exercising exactly that.

    The ladder is derived at run time, not hardcoded:
      1. Shift the whole itinerary forward/backward, preserving the gaps between legs. Most
         failures are date-specific (`NO FARE FOUND FOR REQUESTED FARE FAMILY`, `NO ITINERARY
         FOUND FOR REQUESTED SEGMENT n`) and clear with a few days' shift.
      2. Swap the failing itinerary's legs for legs harvested from files that PASSED in pass 1 --
         the empirically-proven live network for this supplier on these dates.
      3. Swap in the supplier's rows from NDC_Integration\Resources\Supplier Routes.md, the
         documented fallback network.
    Candidates are tried in that order because the earlier ones preserve more of the test case's
    original intent.

.PARAMETER Repair
    Rewrite failing files in place. Without it the script only reports (dry run).

.EXAMPLE
    .\Invoke-TestDataSearchSweep.ps1 -BaseUrl https://ndc-supplier-integration.azurewebsites.net/ `
        -Supplier AirCairo -CredentialsSelector EGY -Repair
#>

[CmdletBinding()]
param(
    [string] $RepoRoot,
    [string] $TestDataDir,
    [string] $BaseUrl = "https://ndc-supplier-integration.azurewebsites.net/",

    # Override the supplier/selector on every file. Omit to honour each file's own values.
    [string] $Supplier,
    [string] $CredentialsSelector,

    [string] $ApiKey,

    # Anchor for offsetDays -> date, so a sweep is reproducible when re-run the same day.
    [datetime] $Today = (Get-Date).Date,

    # Only sweep files whose name matches this wildcard (e.g. "Hold*").
    [string] $Filter = "*.json",

    [switch] $Repair,
    [int]    $TimeoutSec = 180,
    [string] $ReportDir
)

$ErrorActionPreference = "Stop"

# --- Resolve paths ----------------------------------------------------------
if (-not $RepoRoot) {
    # scripts\ -> Validate_TestData_Search\ -> Skills\ -> .claude\ -> .c\ -> repo root
    $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\..")).Path
}
if (-not $TestDataDir) { $TestDataDir = Join-Path $RepoRoot "NDC_Integration\TestData" }
if (-not $ReportDir)   { $ReportDir   = Join-Path $RepoRoot "NDC_Integration\Artifacts\SearchSweep" }

if (-not (Test-Path $TestDataDir)) { throw "TestData directory not found: $TestDataDir" }

# The key is a shared staging secret that already lives in the committed collection; read it from
# there rather than duplicating it into a third place that can drift.
if (-not $ApiKey) {
    $collection = Join-Path $RepoRoot "Postman_Collection\Collection_V2\NDC_Integrations_Staging_Scripts_V2.postman_collection.json"
    if (Test-Path $collection) {
        $m = [regex]::Match((Get-Content -Raw $collection), '"key"\s*:\s*"x-api-key"\s*,\s*"value"\s*:\s*"([^"]+)"')
        if ($m.Success) { $ApiKey = $m.Groups[1].Value }
    }
    if (-not $ApiKey) { throw "No -ApiKey supplied and none could be read from the V2 Postman collection." }
}

$searchUri = "$($BaseUrl.TrimEnd('/'))/api/V2/FlightSearch/Search"
$headers   = @{ "x-api-key" = $ApiKey; "Client-Id" = "NDC-Core" }

# ---------------------------------------------------------------------------
# Search
# ---------------------------------------------------------------------------
function Invoke-SearchOnce {
    param([string] $Body)

    $out = [ordered]@{ ok = $false; status = 0; offers = 0; error = ""; supplierMessage = ""; responseId = "" }
    try {
        $resp = Invoke-WebRequest -Uri $searchUri -Method Post -Headers $headers -Body $Body `
                    -ContentType "application/json" -TimeoutSec $TimeoutSec -UseBasicParsing
        $out.status     = [int] $resp.StatusCode
        $json           = $resp.Content | ConvertFrom-Json
        $out.responseId = [string] $json.responseId
        $out.offers     = @($json.offers).Count
        $out.ok         = ($out.status -eq 200 -and $out.offers -gt 0)
        if (-not $out.ok) { $out.error = "HTTP $($out.status) with $($out.offers) offers" }
    } catch {
        $ex = $_.Exception
        if ($ex.Response) {
            try { $out.status = [int] $ex.Response.StatusCode } catch { }
            try {
                $reader = New-Object System.IO.StreamReader($ex.Response.GetResponseStream())
                $raw = $reader.ReadToEnd(); $reader.Close()
                # Surface the supplier's own reason ("NO FARE FOUND FOR REQUESTED ITINERARY", ...)
                # separately from the raw envelope; it is what tells you whether to move the date
                # or move the route.
                $ctx = [regex]::Match($raw, '"Context"\s*:\s*\[\s*\{[^}]*"Value"\s*:\s*"([^"]+)"')
                if ($ctx.Success) { $out.supplierMessage = $ctx.Groups[1].Value }
                $out.error = ($raw -replace '\s+', ' ')
                if ($out.error.Length -gt 400) { $out.error = $out.error.Substring(0, 400) }
            } catch { $out.error = $ex.Message }
        } else {
            $out.error = $ex.Message   # status stays 0 => transient, caller retries
        }
    }
    return $out
}

function Invoke-Search {
    param($Criteria, $Passengers, [string] $Sup, [string] $Sel)

    $body = @{
        supplier            = $Sup
        credentialsSelector = $Sel
        isDebug             = $false
        searchCriteria      = @($Criteria)
        passengers          = @($Passengers)
    } | ConvertTo-Json -Depth 10

    # status 0 means the request never reached the service (DNS/socket). Those were observed
    # intermittently against Azure and must not be recorded as a bad route.
    for ($attempt = 1; $attempt -le 4; $attempt++) {
        $r = Invoke-SearchOnce -Body $body
        if ($r.status -ne 0) { return $r }
        if ($attempt -lt 4) { Start-Sleep -Seconds (3 * $attempt) }
    }
    return $r
}

function New-Leg {
    param([string] $Origin, [string] $Destination, [int] $OffsetDays)
    return @{ origin = $Origin; destination = $Destination; date = $Today.AddDays($OffsetDays).ToString("yyyy-MM-dd") }
}

function Format-Itinerary {
    param($Legs)   # array of @{origin;destination;offsetDays}
    return (@($Legs | ForEach-Object { "$($_.origin)-$($_.destination)@+$($_.offsetDays)d" }) -join " | ")
}

function ConvertTo-Legs {
    param($Itinerary)   # array of @{origin;destination;offsetDays}
    return @($Itinerary | ForEach-Object { New-Leg $_.origin $_.destination ([int] $_.offsetDays) })
}

# ---------------------------------------------------------------------------
# Supplier Routes.md fallback network
# ---------------------------------------------------------------------------
function Get-SupplierRoutes {
    param([string] $SupplierName)

    $routesFile = Join-Path $RepoRoot "NDC_Integration\Resources\Supplier Routes.md"
    if (-not (Test-Path $routesFile)) { return @() }

    $routes = @()
    foreach ($line in (Get-Content $routesFile)) {
        if ($line -notmatch '^\s*\|') { continue }
        $cells = @($line.Trim().Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
        if ($cells.Count -lt 2) { continue }
        # Supplier names in that table are written loosely (e.g. "Turkish (TkConnect)"), so match
        # on letters only.
        $norm = ($cells[0] -replace '[^A-Za-z]', '')
        if ($norm -ine ($SupplierName -replace '[^A-Za-z]', '')) { continue }
        foreach ($cell in $cells[1..($cells.Count - 1)]) {
            $m = [regex]::Match($cell, '^\s*([A-Z]{3})\s*-\s*([A-Z]{3})\s*$')
            if ($m.Success) { $routes += ,@($m.Groups[1].Value, $m.Groups[2].Value) }
        }
    }
    return $routes
}

# ---------------------------------------------------------------------------
# Candidate ladder for a failing file
# ---------------------------------------------------------------------------
function Get-CandidateLadder {
    param(
        $Original,          # array of @{origin;destination;offsetDays}
        $ProvenItineraries, # itineraries (same leg count) harvested from pass-1 PASSes
        $FallbackRoutes,    # @(@(o,d), ...) from Supplier Routes.md
        $UsedItineraries    # hashset of "O-D@+Nd | ..." already claimed by another file
    )

    $legCount   = @($Original).Count
    $candidates = @()

    function Add-Candidate {
        param($Legs)
        $key = Format-Itinerary $Legs
        if ($UsedItineraries.Contains($key)) { return }        # don't duplicate another test case
        if (@($Legs | Where-Object { $_.offsetDays -lt 1 }).Count -gt 0) { return }  # no past dates
        $script:__cand += ,@($Legs)
        $UsedItineraries.Add($key) | Out-Null
    }
    $script:__cand = @()

    # 1. Shift the whole itinerary, preserving the gap between legs.
    foreach ($delta in 3, 7, -3, 14, 10, 21, -7, 28, 35) {
        Add-Candidate @($Original | ForEach-Object {
            @{ origin = $_.origin; destination = $_.destination; offsetDays = ([int] $_.offsetDays + $delta) }
        })
    }

    # 2. Keep this file's dates, borrow routes proven live in pass 1 (same leg count).
    foreach ($proven in $ProvenItineraries) {
        if (@($proven).Count -ne $legCount) { continue }
        $legs = @()
        for ($i = 0; $i -lt $legCount; $i++) {
            $legs += @{ origin      = $proven[$i].origin
                        destination = $proven[$i].destination
                        offsetDays  = [int] $Original[$i].offsetDays }
        }
        Add-Candidate $legs
    }

    # 3. Documented fallback network. A round trip becomes out-and-back on the same pair; a
    #    multi-leg itinerary chains through the route's own endpoints.
    foreach ($route in $FallbackRoutes) {
        $legs = @()
        for ($i = 0; $i -lt $legCount; $i++) {
            if ($i % 2 -eq 0) { $legs += @{ origin = $route[0]; destination = $route[1]; offsetDays = [int] $Original[$i].offsetDays } }
            else              { $legs += @{ origin = $route[1]; destination = $route[0]; offsetDays = [int] $Original[$i].offsetDays } }
        }
        Add-Candidate $legs
    }

    return $script:__cand
}

# ---------------------------------------------------------------------------
# Surgical rewrite of a file's searchCriteria block
# ---------------------------------------------------------------------------
function Update-SearchCriteria {
    param([string] $Path, $NewLegs)

    $text = Get-Content -Raw -Path $Path

    # Locate the searchCriteria array by bracket-matching, so nested objects can't fool a regex.
    $keyIdx = $text.IndexOf('"searchCriteria"')
    if ($keyIdx -lt 0) { throw "No searchCriteria key in $Path" }
    $open = $text.IndexOf('[', $keyIdx)
    if ($open -lt 0) { throw "Malformed searchCriteria in $Path" }
    $depth = 0; $close = -1
    for ($i = $open; $i -lt $text.Length; $i++) {
        if ($text[$i] -eq '[') { $depth++ }
        elseif ($text[$i] -eq ']') { $depth--; if ($depth -eq 0) { $close = $i; break } }
    }
    if ($close -lt 0) { throw "Unterminated searchCriteria in $Path" }

    $block = $text.Substring($open, $close - $open + 1)

    # Replace values inside each `{...}` in place so the file's existing indentation, key order,
    # and one-line-vs-multi-line style all survive the edit untouched.
    $legIndex = 0
    $updated = [regex]::Replace($block, '\{[^{}]*\}', {
        param($m)
        if ($legIndex -ge @($NewLegs).Count) { return $m.Value }
        $leg = @($NewLegs)[$legIndex]; $legIndex++
        $obj = $m.Value
        $obj = [regex]::Replace($obj, '("origin"\s*:\s*")[^"]*(")',      { param($x) "$($x.Groups[1].Value)$($leg.origin)$($x.Groups[2].Value)" })
        $obj = [regex]::Replace($obj, '("destination"\s*:\s*")[^"]*(")', { param($x) "$($x.Groups[1].Value)$($leg.destination)$($x.Groups[2].Value)" })
        $obj = [regex]::Replace($obj, '("offsetDays"\s*:\s*)-?\d+',      { param($x) "$($x.Groups[1].Value)$($leg.offsetDays)" })
        return $obj
    })

    $new = $text.Substring(0, $open) + $updated + $text.Substring($close + 1)
    # No BOM: these files are read by other tooling that chokes on one.
    [System.IO.File]::WriteAllText($Path, $new, (New-Object System.Text.UTF8Encoding $false))
}

# ---------------------------------------------------------------------------
# Pass 1 -- sweep
# ---------------------------------------------------------------------------
$files = @(Get-ChildItem -Path $TestDataDir -Filter $Filter | Sort-Object Name)
if ($files.Count -eq 0) { throw "No files matched $Filter in $TestDataDir" }

Write-Host ""
Write-Host "=== V2 Search sweep -- $($files.Count) file(s) ===" -ForegroundColor Cyan
Write-Host "  Endpoint : $searchUri"
$supplierLabel = if ($Supplier) { "{0} / {1} (forced for every file)" -f $Supplier, $CredentialsSelector } else { "per-file" }
Write-Host "  Supplier : $supplierLabel"
$dateBase = $Today.ToString("yyyy-MM-dd")
Write-Host "  Date base: $dateBase   Repair: $($Repair.IsPresent)"
Write-Host ""

$results = @()
$provenItineraries = @()
$usedItineraries   = New-Object 'System.Collections.Generic.HashSet[string]'

foreach ($f in $files) {
    $doc = Get-Content -Raw -Path $f.FullName | ConvertFrom-Json
    $sup = if ($Supplier)            { $Supplier }            else { $doc.supplier }
    $sel = if ($CredentialsSelector) { $CredentialsSelector }  else { $doc.credentialsSelector }

    $itinerary = @($doc.searchCriteria | ForEach-Object {
        @{ origin = $_.origin; destination = $_.destination; offsetDays = [int] $_.offsetDays }
    })
    $pax = @($doc.passengers | ForEach-Object {
        @{ passengerTypeCode = $_.passengerTypeCode; count = [int] $_.count }
    })

    $usedItineraries.Add((Format-Itinerary $itinerary)) | Out-Null

    $r = Invoke-Search (ConvertTo-Legs $itinerary) $pax $sup $sel
    $verdict = if ($r.ok) { "PASS" } else { "FAIL" }
    $colour  = if ($r.ok) { "Green" } else { "Red" }

    $why = if ($r.ok) { "" } else { "$($r.status) $($r.supplierMessage)" }
    Write-Host ("{0,-30} {1}  offers={2,-4} {3}" -f $f.Name, $verdict, $r.offers, $why) -ForegroundColor $colour

    if ($r.ok) { $provenItineraries += ,$itinerary }

    $results += [pscustomobject]@{
        file            = $f.Name
        path            = $f.FullName
        supplier        = $sup
        selector        = $sel
        passengers      = (@($pax | ForEach-Object { "$($_.passengerTypeCode)x$($_.count)" }) -join ",")
        originalRoute   = (Format-Itinerary $itinerary)
        finalRoute      = (Format-Itinerary $itinerary)
        pass1           = $r.ok
        repaired        = $false
        finalPass       = $r.ok
        status          = $r.status
        offers          = $r.offers
        supplierMessage = $r.supplierMessage
        itinerary       = $itinerary
        paxList         = $pax
        attempts        = @()
    }
}

$failing = @($results | Where-Object { -not $_.pass1 })
Write-Host ""
Write-Host ("Pass 1: {0} PASS / {1} FAIL of {2}" -f @($results | Where-Object pass1).Count, $failing.Count, $results.Count) -ForegroundColor Cyan

# ---------------------------------------------------------------------------
# Pass 2 -- repair
# ---------------------------------------------------------------------------
if ($failing.Count -gt 0) {
    if (-not $Repair) {
        Write-Host "Re-run with -Repair to rewrite the failing files' search criteria." -ForegroundColor Yellow
    } else {
        $fallback = Get-SupplierRoutes -SupplierName $(if ($Supplier) { $Supplier } else { $results[0].supplier })
        Write-Host ""
        Write-Host "=== Repair -- $($failing.Count) file(s) ===" -ForegroundColor Cyan

        foreach ($row in $failing) {
            Write-Host ""
            Write-Host "  $($row.file)  [$($row.originalRoute)]  pax=$($row.passengers)" -ForegroundColor Yellow
            Write-Host "    reason: $($row.status) $($row.supplierMessage)"

            $ladder = Get-CandidateLadder -Original $row.itinerary -ProvenItineraries $provenItineraries `
                                          -FallbackRoutes $fallback -UsedItineraries $usedItineraries
            $fixed = $false
            foreach ($cand in $ladder) {
                $label = Format-Itinerary $cand
                $r = Invoke-Search (ConvertTo-Legs $cand) $row.paxList $row.supplier $row.selector
                $outcome = if ($r.ok) { "PASS - {0} offers" -f $r.offers } else { "FAIL - {0} {1}" -f $r.status, $r.supplierMessage }
                $row.attempts += "$label => $outcome"
                $verdict2 = if ($r.ok) { "PASS" } else { "FAIL" }
                $colour2  = if ($r.ok) { "Green" } else { "DarkGray" }
                Write-Host ("    {0,-6} {1,-38} offers={2}" -f $verdict2, $label, $r.offers) -ForegroundColor $colour2
                if ($r.ok) {
                    Update-SearchCriteria -Path $row.path -NewLegs $cand
                    $row.finalRoute = $label
                    $row.repaired   = $true
                    $row.finalPass  = $true
                    $row.offers     = $r.offers
                    $row.status     = $r.status
                    $fixed = $true
                    break
                }
            }
            if (-not $fixed) {
                Write-Host "    UNRESOLVED -- every candidate failed; left unchanged for manual review." -ForegroundColor Red
            }
        }
    }
}

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
if (-not (Test-Path $ReportDir)) { New-Item -ItemType Directory -Path $ReportDir -Force | Out-Null }
$stamp     = (Get-Date).ToString("yyyyMMdd-HHmmss")
$csvPath   = Join-Path $ReportDir "search-sweep-$stamp.csv"
$jsonPath  = Join-Path $ReportDir "search-sweep-$stamp.json"

$results | Select-Object file, passengers, originalRoute, finalRoute, pass1, repaired, finalPass, status, offers, supplierMessage |
    Export-Csv -NoTypeInformation -Encoding UTF8 -Path $csvPath
$results | Select-Object file, supplier, selector, passengers, originalRoute, finalRoute, pass1, repaired, finalPass, status, offers, supplierMessage, attempts |
    ConvertTo-Json -Depth 6 | Out-File -Encoding utf8 $jsonPath

$unresolved = @($results | Where-Object { -not $_.finalPass })

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host ("  Total          : {0}" -f $results.Count)
Write-Host ("  Passed as-is   : {0}" -f @($results | Where-Object pass1).Count)
Write-Host ("  Repaired       : {0}" -f @($results | Where-Object repaired).Count)
Write-Host ("  Unresolved     : {0}" -f $unresolved.Count) -ForegroundColor $(if ($unresolved.Count) { "Red" } else { "Green" })
foreach ($u in $unresolved) { Write-Host "     - $($u.file)  [$($u.originalRoute)]  $($u.status) $($u.supplierMessage)" -ForegroundColor Red }
Write-Host ("  Report         : {0}" -f $csvPath)

if (@($results | Where-Object repaired).Count -gt 0) {
    Write-Host ""
    Write-Host "  Rewritten files:" -ForegroundColor Cyan
    foreach ($r in ($results | Where-Object repaired)) { Write-Host "     $($r.file): $($r.originalRoute)  ->  $($r.finalRoute)" }
}

exit $(if ($unresolved.Count -gt 0) { 1 } else { 0 })
