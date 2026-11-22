# =====================================================================================
#  NdcV1.HtmlReport.ps1  -  one-time final HTML transform for a finished/stopped run
# =====================================================================================
#  Render-NdcHtml rebuilds <slug>.html entirely from <slug>.jsonl, using the design tokens
#  from .c/.claude/skills/Generate_QA_Report/references/report-template.html so every QA
#  artifact in this project shares one visual system. Never hand-patch the rendered HTML;
#  re-run this instead. ASCII-only source (PS 5.1 reads .ps1 as ANSI).
# =====================================================================================

function HEnc {
  param([string]$s)
  if ($null -eq $s) { return "" }
  return ($s -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;' -replace '"','&quot;')
}

# UTC ISO stamp -> Egypt local wall-clock (UTC+2 EET / UTC+3 EEST, DST-aware)
function HEgypt {
  param([string]$IsoUtc)
  if (-not $IsoUtc) { return "" }
  $utc = ([datetime]$IsoUtc).ToUniversalTime()
  $tz  = [System.TimeZoneInfo]::FindSystemTimeZoneById('Egypt Standard Time')
  $loc = [System.TimeZoneInfo]::ConvertTimeFromUtc($utc, $tz)
  $ab  = if ($tz.IsDaylightSavingTime($loc)) { 'EEST' } else { 'EET' }
  return ($loc.ToString('yyyy-MM-dd HH:mm:ss') + ' ' + $ab)
}

function Render-NdcHtml {
  param([string]$JsonlPath, [string]$OutPath)
  if (-not $JsonlPath) { $JsonlPath = $Global:NDC.JsonlPath }
  if (-not $OutPath)   { $OutPath   = $Global:NDC.HtmlPath }

  $lines = @(Get-Content -Path $JsonlPath -Encoding utf8 | Where-Object { $_.Trim() } |
             ForEach-Object { $_ | ConvertFrom-Json })
  $start = $lines | Where-Object { $_.type -eq 'run_start' } | Select-Object -First 1
  $end   = $lines | Where-Object { $_.type -eq 'run_end' }   | Select-Object -First 1
  $tcs   = @($lines | Where-Object { $_.type -eq 'test_case' })
  $finds = @($lines | Where-Object { $_.type -eq 'finding' })
  $props = @($lines | Where-Object { $_.type -eq 'spec_update_proposed' })
  $clean = @($lines | Where-Object { $_.type -eq 'cleanup' })

  $nTot = $tcs.Count
  $nP = @($tcs | Where-Object { $_.verdict -eq 'PASS' }).Count
  $nF = @($tcs | Where-Object { $_.verdict -eq 'FAIL' }).Count
  $nB = @($tcs | Where-Object { $_.verdict -eq 'BLOCKED' }).Count
  $nU = @($finds | Where-Object { $_.kind -eq 'unknown_resolution' }).Count
  $nD = @($finds | Where-Object { $_.kind -eq 'defect' }).Count

  $o = New-Object System.Collections.Generic.List[string]
  $css = @'
  :root{
    color-scheme: light;
    --paper:#F3F5F8; --surface:#FFFFFF; --surface-2:#EAEEF4;
    --ink:#10151F; --ink-2:#45536B; --ink-muted:#7C8AA0;
    --line:#DDE3EC; --line-strong:#C6CEDC;
    --accent:#2A78D6; --accent-ink:#1C5CAB; --accent-wash:#E4EEFA;
    --good:#0CA30C; --warning:#C98A17; --serious:#D9673C; --critical:#D03B3B;
    --good-wash:rgba(12,163,12,0.12); --warning-wash:rgba(250,178,25,0.16);
    --serious-wash:rgba(236,131,90,0.14); --critical-wash:rgba(208,59,59,0.12);
    --shadow:rgba(16,21,31,0.08);
    --font-sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    --font-mono:ui-monospace,"SF Mono","Cascadia Code","Roboto Mono",Consolas,"Courier New",monospace;
  }
  @media (prefers-color-scheme: dark){
    :root:where(:not([data-theme="light"])){
      color-scheme: dark;
      --paper:#0A0E15; --surface:#111826; --surface-2:#16202F;
      --ink:#EDF1F7; --ink-2:#B7C2D1; --ink-muted:#8290A6;
      --line:#232E40; --line-strong:#324058;
      --accent:#3987E5; --accent-ink:#8FBBEF; --accent-wash:#152A45;
      --good:#35C24A; --warning:#E3A730; --serious:#E88A5E; --critical:#EA5B5B;
      --good-wash:rgba(53,194,74,0.16); --warning-wash:rgba(227,167,48,0.16);
      --serious-wash:rgba(232,138,94,0.16); --critical-wash:rgba(234,91,91,0.18);
      --shadow:rgba(0,0,0,0.5);
    }
  }
  :root[data-theme="dark"]{
    color-scheme: dark;
    --paper:#0A0E15; --surface:#111826; --surface-2:#16202F;
    --ink:#EDF1F7; --ink-2:#B7C2D1; --ink-muted:#8290A6;
    --line:#232E40; --line-strong:#324058;
    --accent:#3987E5; --accent-ink:#8FBBEF; --accent-wash:#152A45;
    --good:#35C24A; --warning:#E3A730; --serious:#E88A5E; --critical:#EA5B5B;
    --good-wash:rgba(53,194,74,0.16); --warning-wash:rgba(227,167,48,0.16);
    --serious-wash:rgba(232,138,94,0.16); --critical-wash:rgba(234,91,91,0.18);
    --shadow:rgba(0,0,0,0.5);
  }
  :root[data-theme="light"]{
    color-scheme: light;
    --paper:#F3F5F8; --surface:#FFFFFF; --surface-2:#EAEEF4;
    --ink:#10151F; --ink-2:#45536B; --ink-muted:#7C8AA0;
    --line:#DDE3EC; --line-strong:#C6CEDC;
    --accent:#2A78D6; --accent-ink:#1C5CAB; --accent-wash:#E4EEFA;
    --good:#0CA30C; --warning:#C98A17; --serious:#D9673C; --critical:#D03B3B;
    --good-wash:rgba(12,163,12,0.12); --warning-wash:rgba(250,178,25,0.16);
    --serious-wash:rgba(236,131,90,0.14); --critical-wash:rgba(208,59,59,0.12);
    --shadow:rgba(16,21,31,0.08);
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{ background:var(--paper); color:var(--ink); font-family:var(--font-sans);
        font-size:14px; line-height:1.5; -webkit-font-smoothing:antialiased; }
  @media (prefers-reduced-motion: reduce){ *{ animation-duration:.001ms !important; transition-duration:.001ms !important; } }
  a{ color:var(--accent-ink); }
  .wrap{ max-width:960px; margin:0 auto; padding:32px 20px 80px; }
  code,.mono{ font-family:var(--font-mono); font-size:.92em; }
  .header{ display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:12px; margin-bottom:24px; }
  .header h1{ font-size:20px; margin:0 0 4px; }
  .header .meta{ color:var(--ink-muted); font-size:13px; }
  .pill{ display:inline-flex; align-items:center; gap:6px; padding:4px 12px; border-radius:999px; font-size:12px; font-weight:600; letter-spacing:.02em; }
  .pill-complete{ background:var(--good-wash); color:var(--good); }
  .pill-interrupted{ background:var(--critical-wash); color:var(--critical); }
  .tiles{ display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:10px; margin-bottom:20px; }
  .tile{ background:var(--surface); border:1px solid var(--line); border-radius:10px; padding:12px 14px; }
  .tile .n{ font-size:22px; font-weight:700; }
  .tile .lbl{ font-size:12px; color:var(--ink-muted); text-transform:uppercase; letter-spacing:.04em; }
  .tile.good .n{ color:var(--good); } .tile.critical .n{ color:var(--critical); }
  .tile.serious .n{ color:var(--serious); } .tile.warning .n{ color:var(--warning); }
  .propbar{ display:flex; height:22px; border-radius:6px; overflow:hidden; border:1px solid var(--line); margin-bottom:28px; }
  .propbar > div{ display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; color:#fff; min-width:0; }
  .propbar .seg-pass{ background:var(--good); }
  .propbar .seg-fail{ background:var(--critical); }
  .propbar .seg-blocked{ background:var(--serious); }
  h2{ font-size:15px; text-transform:uppercase; letter-spacing:.04em; color:var(--ink-2);
      border-bottom:1px solid var(--line); padding-bottom:6px; margin:32px 0 12px; }
  .tc{ background:var(--surface); border:1px solid var(--line); border-left-width:4px; border-radius:8px; padding:12px 14px; margin-bottom:8px; }
  .tc.PASS{ border-left-color:var(--good); }
  .tc.FAIL{ border-left-color:var(--critical); }
  .tc.BLOCKED{ border-left-color:var(--serious); }
  .tc-head{ display:flex; justify-content:space-between; gap:10px; font-weight:600; }
  .badge{ font-size:11px; font-weight:700; padding:2px 8px; border-radius:5px; }
  .badge.PASS{ background:var(--good-wash); color:var(--good); }
  .badge.FAIL{ background:var(--critical-wash); color:var(--critical); }
  .badge.BLOCKED{ background:var(--serious-wash); color:var(--serious); }
  .tc .row{ margin-top:6px; font-size:13px; color:var(--ink-2); overflow-wrap:anywhere; }
  .tc .row b{ color:var(--ink); }
  details.evidence, details.hops{ margin-top:6px; }
  details.evidence summary, details.hops summary{ cursor:pointer; font-size:12px; color:var(--accent-ink); }
  details.evidence .ev-body{ margin-top:4px; padding:8px 10px; background:var(--surface-2); border-radius:6px; font-size:12px; overflow-wrap:anywhere; }
  .hop{ padding:6px 0; border-top:1px solid var(--line); font-size:12px; }
  .hop:first-child{ border-top:none; }
  .hop-endpoint{ font-weight:600; color:var(--ink); }
  .hop .hd{ color:var(--ink-muted); margin-top:2px; overflow-wrap:anywhere; }
  .finding{ border-radius:8px; padding:10px 12px; margin-bottom:8px; font-size:13px; overflow-wrap:anywhere; }
  .finding.defect{ background:var(--serious-wash); border:1px solid var(--serious); }
  .finding.unknown_resolution{ background:var(--accent-wash); border:1px solid var(--accent); }
  .finding .kind{ font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.03em; }
  .cleanup{ background:var(--warning-wash); border:1px solid var(--warning); border-radius:8px; padding:12px 14px; }
  .cleanup ul{ margin:6px 0 0; padding-left:18px; }
  .cleanup li{ margin-bottom:6px; overflow-wrap:anywhere; }
  .empty{ color:var(--ink-muted); font-size:13px; font-style:italic; }
'@

  $o.Add('<!DOCTYPE html>')
  $o.Add('<html lang="en">')
  $o.Add('<head>')
  $o.Add('<meta charset="UTF-8">')
  $o.Add('<meta name="viewport" content="width=device-width, initial-scale=1">')
  $o.Add('<title>NDC Integration - QA Execution Report</title>')
  $o.Add('<style>')
  $o.Add($css)
  $o.Add('</style>')
  $o.Add('</head><body><div class="wrap">')

  # header
  $pill = '<span class="pill pill-complete">COMPLETE</span>'
  if ($end -and $end.status -ne 'complete') {
    $pill = '<span class="pill pill-interrupted">INTERRUPTED - after ' + (HEnc $end.interrupted_after_tc) + ' (' + $nTot + '/' + (HEnc ([string]$end.of_total)) + ')</span>'
  }
  $dur = $null
  if ($end -and $end.ended_at -and $start.started_at) {
    $ts = ([datetime]$end.ended_at).ToUniversalTime() - ([datetime]$start.started_at).ToUniversalTime()
    $dur = ('{0:00}h {1:00}m {2:00}s' -f [int]$ts.TotalHours, $ts.Minutes, $ts.Seconds)
  }
  $o.Add('<div class="header"><div>')
  $o.Add('<h1>QA Execution Report - ' + (HEnc $start.scope) + '</h1>')
  $when = ' &nbsp;&middot;&nbsp; started ' + (HEnc (HEgypt $start.started_at))
  if ($dur) { $when += ' &nbsp;&middot;&nbsp; ended ' + (HEnc (HEgypt $end.ended_at)) + ' &nbsp;&middot;&nbsp; execution time ' + $dur }
  $o.Add('<div class="meta">' + (HEnc $start.environment) + ' &middot; ' + (HEnc $start.baseUrl) +
         ' &nbsp;&middot;&nbsp; supplier ' + (HEnc $start.supplier) + '/' + (HEnc $start.credentials_selector) +
         $when + '</div>')
  $o.Add('</div>' + $pill + '</div>')

  # tiles
  $o.Add('<div class="tiles">')
  $o.Add('<div class="tile"><div class="n">' + $nTot + '</div><div class="lbl">Test cases logged</div></div>')
  if ($dur) { $o.Add('<div class="tile"><div class="n" style="font-size:16px">' + $dur + '</div><div class="lbl">Execution time</div></div>') }
  $o.Add('<div class="tile good"><div class="n">' + $nP + '</div><div class="lbl">Passed</div></div>')
  $o.Add('<div class="tile critical"><div class="n">' + $nF + '</div><div class="lbl">Failed</div></div>')
  $o.Add('<div class="tile serious"><div class="n">' + $nB + '</div><div class="lbl">Blocked</div></div>')
  $o.Add('<div class="tile warning"><div class="n">' + $nU + '</div><div class="lbl">Unknown-confirmed</div></div>')
  $o.Add('</div>')

  # proportion bar
  if ($nTot -gt 0) {
    $o.Add('<div class="propbar">')
    if ($nP -gt 0) { $o.Add('<div class="seg-pass" style="width:' + [Math]::Round(100.0*$nP/$nTot,2) + '%">' + $nP + ' PASS</div>') }
    if ($nF -gt 0) { $o.Add('<div class="seg-fail" style="width:' + [Math]::Round(100.0*$nF/$nTot,2) + '%">' + $nF + ' FAIL</div>') }
    if ($nB -gt 0) { $o.Add('<div class="seg-blocked" style="width:' + [Math]::Round(100.0*$nB/$nTot,2) + '%">' + $nB + ' BLOCKED</div>') }
    $o.Add('</div>')
  }

  # test cases
  $o.Add('<h2>Test case results</h2>')
  if ($nTot -eq 0) { $o.Add('<p class="empty">No test cases logged.</p>') }
  foreach ($t in $tcs) {
    $v = $t.verdict
    $o.Add('<div class="tc ' + $v + '">')
    $o.Add('<div class="tc-head"><span><span class="mono">' + (HEnc $t.tc_id) + '</span> - ' + (HEnc $t.title) + '</span><span class="badge ' + $v + '">' + $v + '</span></div>')
    $o.Add('<div class="row"><b>Endpoint Name:</b> ' + (HEnc $t.endpoint_or_flow) + '</div>')
    $o.Add('<div class="row"><b>Request:</b> ' + (HEnc $t.request_summary) + '</div>')
    $o.Add('<div class="row"><b>Response:</b> ' + (HEnc $t.response_summary) + '</div>')
    $o.Add('<div class="row"><b>Expected (' + (HEnc $t.spec_ref) + '):</b> ' + (HEnc $t.expected) + '</div>')
    $o.Add('<div class="row"><b>Actual:</b> ' + (HEnc $t.actual) + '</div>')
    $o.Add('<div class="row"><b>Status:</b> <span class="badge ' + $v + '">' + $v + '</span></div>')
    if ($t.evidence) {
      $o.Add('<details class="evidence"><summary>Evidence</summary><div class="ev-body">' + (HEnc $t.evidence) + '</div></details>')
    }
    if ($t.hops) {
      $hs = @($t.hops)
      $o.Add('<details class="hops"><summary>Hops (' + $hs.Count + ')</summary>')
      foreach ($h in $hs) {
        $o.Add('<div class="hop"><span class="badge ' + $h.verdict + '">' + $h.verdict + '</span> <span class="hop-endpoint">' + $h.hop + '. ' + (HEnc $h.endpoint) + '</span>')
        $o.Add('<div class="hd"><b>Request:</b> '  + (HEnc $h.request_summary)  + '</div>')
        $o.Add('<div class="hd"><b>Response:</b> ' + (HEnc $h.response_summary) + '</div>')
        $o.Add('<div class="hd"><b>Expected:</b> ' + (HEnc $h.expected)         + '</div>')
        $o.Add('<div class="hd"><b>Actual:</b> '   + (HEnc $h.actual)           + '</div>')
        $o.Add('<div class="hd"><b>Evidence:</b> ' + (HEnc $h.evidence)         + '</div>')
        $o.Add('</div>')
      }
      $o.Add('</details>')
    }
    $o.Add('</div>')
  }

  # findings - defects first, then unknown resolutions, kept visually distinct
  $o.Add('<h2>Findings</h2>')
  if ($finds.Count -eq 0) { $o.Add('<p class="empty">No findings logged.</p>') }
  foreach ($f in @($finds | Where-Object { $_.kind -eq 'defect' })) {
    $o.Add('<div class="finding defect"><div class="kind">Defect</div>')
    $o.Add((HEnc $f.summary) + ' <span class="mono">(' + (HEnc $f.spec_ref) + ', ' + (HEnc $f.related_tc_id) + ')</span>')
    if ($f.field_name)     { $o.Add('<div><b>Field:</b> <code>' + (HEnc $f.field_name) + '</code></div>') }
    if ($f.expected_value) { $o.Add('<div><b>Expected value:</b> <code>' + (HEnc $f.expected_value) + '</code></div>') }
    if ($f.impact)         { $o.Add('<div><b>Impact:</b> ' + (HEnc $f.impact) + '</div>') }
    if ($f.evidence)       { $o.Add('<details class="evidence"><summary>Evidence</summary><div class="ev-body">' + (HEnc $f.evidence) + '</div></details>') }
    $o.Add('</div>')
  }
  foreach ($f in @($finds | Where-Object { $_.kind -ne 'defect' })) {
    $o.Add('<div class="finding unknown_resolution"><div class="kind">Unknown-resolution</div>')
    $o.Add((HEnc $f.summary) + ' <span class="mono">(' + (HEnc $f.spec_ref) + ', ' + (HEnc $f.related_tc_id) + ')</span>')
    if ($f.evidence) { $o.Add('<details class="evidence"><summary>Evidence</summary><div class="ev-body">' + (HEnc $f.evidence) + '</div></details>') }
    $o.Add('</div>')
  }

  # proposed spec updates
  $o.Add('<h2>Proposed SPEC.md updates</h2>')
  if ($props.Count -eq 0) { $o.Add('<p class="empty">No SPEC.md updates proposed.</p>') }
  else {
    $latest = [ordered]@{}
    foreach ($p in $props) { $latest[($p.section + '||' + $p.old_text)] = $p }
    foreach ($k in $latest.Keys) {
      $p = $latest[$k]
      $o.Add('<div class="finding unknown_resolution"><div class="kind">' + (HEnc $p.section) + ' - ' + (HEnc $p.status) + '</div>')
      $o.Add('Replace: <code>' + (HEnc $p.old_text) + '</code><br>With: <code>' + (HEnc $p.new_text) + '</code></div>')
    }
  }

  # cleanup
  $o.Add('<h2>Cleanup / follow-up</h2>')
  if ($clean.Count -eq 0) { $o.Add('<p class="empty">Nothing left needing cleanup.</p>') }
  else {
    $o.Add('<div class="cleanup"><b>Live artifacts left behind this run (' + $clean.Count + '):</b><ul>')
    foreach ($c in $clean) {
      $lbl = 'Needs Void/Cancel'
      if ($c.kind -eq 'family_b_hold') { $lbl = 'Family-B hold' }
      $o.Add('<li><b>' + $lbl + '</b> - PNR <span class="mono">' + (HEnc $c.pnr) + '</span> (<span class="mono">' + (HEnc $c.related_tc_id) + '</span>) - ' + (HEnc $c.note) + '</li>')
    }
    $o.Add('</ul></div>')
  }

  $o.Add('</div></body></html>')
  ($o -join "`r`n") | Set-Content -Path $OutPath -Encoding utf8
  Write-Host ("html written: " + $OutPath)
}

Write-Host "NdcV1.HtmlReport loaded"
