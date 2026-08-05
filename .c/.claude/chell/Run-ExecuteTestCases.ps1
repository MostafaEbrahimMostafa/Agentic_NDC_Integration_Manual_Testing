<#
.SYNOPSIS
    Prompts for the target environment and test scope, then launches a Claude Code session in the
    repo root and invokes the `execute-test-cases` skill with those answers.

.DESCRIPTION
    On every execution this script asks for:
      1. BaseUrl              (default: STAG_ENV.postman_environment.json's baseUrl)
      2. Supplier_Name        (default: STAG_ENV's Supplier_Name)
      3. Credentials_Selector (default: STAG_ENV's Credentials_Selector)
      4. Test Scope           - V1, V2, Both (V1 + V2), or Generic

    It then resolves the repo root (the folder holding Postman_Collection\ and NDC_Integration\),
    verifies the Claude Code CLI is on PATH, and starts Claude Code there with the
    `execute-test-cases` skill invoked and the answers passed in as the skill's arguments.

    The script only collects and forwards these inputs. Everything else — which endpoints / flows /
    rows inside the chosen TestCases file(s) to run, and the actual
    request/response/validation/reporting logic against NDC_Integration\SPEC.md — is owned by the
    skill itself (.c\.claude\skills\Execute_Test_cases\SKILL.md), including its Hard Safety Rules
    (no Book/BookAfterHold/Void/CancelAfterHold against a non-staging BaseUrl without explicit
    authorization, redaction of isdebug supplier credentials, dangling-Hold tracking).

    Any parameter supplied on the command line is not prompted for, so the script can also be run
    unattended.

.EXAMPLE
    powershell -File .\Run-ExecuteTestCases.ps1

.EXAMPLE
    powershell -File .\Run-ExecuteTestCases.ps1 -TestScope V2 -SupplierName TravelportNdc -CredentialsSelector UAE
#>

[CmdletBinding()]
param(
    [string] $BaseUrl,
    [string] $SupplierName,
    [string] $CredentialsSelector,

    [ValidateSet("V1", "V2", "Both", "Generic")]
    [string] $TestScope
)

$ErrorActionPreference = "Stop"

# .c\.claude\chell -> up three levels -> repo root (parent of Postman_Collection and NDC_Integration)
$repoRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
$envFile  = Join-Path $repoRoot "Postman_Collection\Environment\STAG_ENV.postman_environment.json"

if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "ERROR: 'claude' (Claude Code CLI) was not found on PATH." -ForegroundColor Red
    Write-Host "Install/configure Claude Code, then re-run this script." -ForegroundColor Red
    exit 1
}

# ---------------------------------------------------------------------------
# Defaults come from the staging Postman environment, per the skill's Inputs.
# ---------------------------------------------------------------------------
$defaults = @{ baseUrl = ""; Supplier_Name = ""; Credentials_Selector = "" }

if (Test-Path $envFile) {
    try {
        $envJson = Get-Content -Raw -Path $envFile | ConvertFrom-Json
        foreach ($v in $envJson.values) {
            if ($defaults.ContainsKey($v.key)) { $defaults[$v.key] = [string] $v.value }
        }
    } catch {
        Write-Host "WARNING: could not parse $envFile - continuing without defaults." -ForegroundColor Yellow
    }
} else {
    Write-Host "WARNING: staging environment file not found at $envFile - continuing without defaults." -ForegroundColor Yellow
}

$stagingBaseUrl = $defaults["baseUrl"]

function Read-WithDefault {
    param(
        [Parameter(Mandatory = $true)][string] $Label,
        [string] $Default
    )

    while ($true) {
        if ([string]::IsNullOrWhiteSpace($Default)) {
            $answer = Read-Host $Label
        } else {
            $answer = Read-Host "$Label [$Default]"
            if ([string]::IsNullOrWhiteSpace($answer)) { $answer = $Default }
        }

        if (-not [string]::IsNullOrWhiteSpace($answer)) { return $answer.Trim() }
        Write-Host "  A value is required." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== NDC Integration - Execute Test Cases ===" -ForegroundColor Cyan
Write-Host ""

# --- 1-3. Environment -------------------------------------------------------
Write-Host "-- Target environment --" -ForegroundColor DarkCyan
if (-not $PSBoundParameters.ContainsKey("BaseUrl")) {
    $BaseUrl = Read-WithDefault -Label "BaseUrl" -Default $stagingBaseUrl
}
if (-not $PSBoundParameters.ContainsKey("SupplierName")) {
    $SupplierName = Read-WithDefault -Label "Supplier_Name" -Default $defaults["Supplier_Name"]
}
if (-not $PSBoundParameters.ContainsKey("CredentialsSelector")) {
    $CredentialsSelector = Read-WithDefault -Label "Credentials_Selector" -Default $defaults["Credentials_Selector"]
}

$isStaging = (-not [string]::IsNullOrWhiteSpace($stagingBaseUrl)) -and
             ($BaseUrl.TrimEnd("/") -ieq $stagingBaseUrl.TrimEnd("/"))

# --- 4. Test scope ----------------------------------------------------------
$v1File      = "NDC_Integration\TestCases\TestCases_V1.csv"
$v2File      = "NDC_Integration\TestCases\TestCases_V2.csv"
$genericFile = "NDC_Integration\TestCases\TestCases_Generic.csv"

# Files, the menu label, and the instruction handed to the skill all live together here, so a new
# scope is added in exactly one place.
$scopeOptions = [ordered]@{
    "V1"      = @{ Files = @($v1File)
                   Label = "Test Cases V1 - API version V1 only"
                   Note  = "Execute the V1 test cases in $v1File against the V1 endpoint paths." }
    "V2"      = @{ Files = @($v2File)
                   Label = "Test Cases V2 - API version V2 only"
                   Note  = "Execute the V2 test cases in $v2File against the V2 endpoint paths." }
    "Both"    = @{ Files = @($v1File, $v2File)
                   Label = "Both V1 + V2 - the V1 and V2 test case files together"
                   Note  = "Execute both test case files - $v1File and $v2File - each against its own API version's endpoint paths." }
    "Generic" = @{ Files = @($genericFile)
                   Label = "Generic Test Cases - Version=Both rows, run against V1 and V2"
                   Note  = "Execute the version-agnostic test cases in $genericFile (their Version column is 'Both') against both the V1 and V2 endpoint paths." }
}

if (-not $PSBoundParameters.ContainsKey("TestScope")) {
    Write-Host ""
    Write-Host "-- Test scope --" -ForegroundColor DarkCyan
    $n = 0
    foreach ($key in $scopeOptions.Keys) {
        $n++
        Write-Host ("  {0}) {1}" -f $n, $scopeOptions[$key].Label)
    }

    $keys = @($scopeOptions.Keys)
    while (-not $TestScope) {
        $choice = (Read-Host "Select test scope (1/2/3/4)").Trim()

        if ($choice -match '^[1-4]$') {
            $TestScope = $keys[[int] $choice - 1]
        } elseif ($keys -contains $choice) {
            # Re-resolve to the canonical casing the ValidateSet expects (@() so a single
            # match stays an array and [0] doesn't index into the string's characters).
            $TestScope = @($keys | Where-Object { $_ -ieq $choice })[0]
        } else {
            Write-Host "  Enter 1, 2, 3, or 4." -ForegroundColor Yellow
        }
    }
}

$scope      = $scopeOptions[$TestScope]
$scopeFiles = @($scope.Files)
$scopeLabel = $scope.Label

foreach ($f in $scopeFiles) {
    if (-not (Test-Path (Join-Path $repoRoot $f))) {
        Write-Host ""
        Write-Host "WARNING: $f not found under the repo root - the skill will have to be pointed at the cases another way." -ForegroundColor Yellow
    }
}

# --- Confirm ----------------------------------------------------------------
Write-Host ""
Write-Host "-- Run configuration --" -ForegroundColor DarkCyan
Write-Host "  BaseUrl              : $BaseUrl"
Write-Host "  Supplier_Name        : $SupplierName"
Write-Host "  Credentials_Selector : $CredentialsSelector"
Write-Host "  Test Scope           : $TestScope - $scopeLabel"
Write-Host "  Test Cases File(s)   : $($scopeFiles -join '  +  ')"
Write-Host -NoNewline "  Environment          : "
if ($isStaging) {
    Write-Host "staging (matches STAG_ENV baseUrl)" -ForegroundColor Green
} else {
    Write-Host "NOT the known staging baseUrl" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Book / BookAfterHold / Void / CancelAfterHold create real bookings against this target." -ForegroundColor Yellow
    Write-Host "  The skill will stop and ask for explicit authorization before any such call." -ForegroundColor Yellow
}

Write-Host ""
$confirm = (Read-Host "Proceed with this configuration? (Y/n)").Trim()
if ($confirm -and $confirm -notmatch '^(y|yes)$') {
    Write-Host "Aborted - nothing was executed." -ForegroundColor Yellow
    exit 0
}

# --- Launch -----------------------------------------------------------------
$skillArgs = @(
    "BaseUrl=$BaseUrl",
    "Supplier_Name=$SupplierName",
    "Credentials_Selector=$CredentialsSelector",
    "TestScope=$TestScope",
    "TestCasesFiles=$($scopeFiles -join ', ')"
) -join "; "

$environmentNote = if ($isStaging) {
    "This BaseUrl matches STAG_ENV's staging baseUrl."
} else {
    "This BaseUrl does NOT match STAG_ENV's staging baseUrl - treat it as non-staging and apply Hard Safety Rule 1 before any Book/BookAfterHold/Void/CancelAfterHold call."
}

$scopeNote = $scope.Note

$scopeRule = "Hold Supplier_Name and Credentials_Selector constant for EVERY test case in this run. " +
             "If a test case row's 'Capabilities / Test Data' column names a different supplier, ignore it - " +
             "the value passed here is the run scope. Do not call, probe, or substitute any other supplier; " +
             "if a row's intended fault genuinely requires one, mark that row BLOCKED with the reason instead."

$prompt = "/Execute_Test_cases $skillArgs. Use these values for the whole run instead of asking for them again. $scopeRule $environmentNote $scopeNote"

Write-Host ""
Write-Host "Launching Claude Code with the execute-test-cases skill..." -ForegroundColor Cyan
Write-Host ""

Push-Location $repoRoot
try {
    claude $prompt
} finally {
    Pop-Location
}
