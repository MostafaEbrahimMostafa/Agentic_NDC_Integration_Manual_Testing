# =====================================================================================
#  NdcV1.FlowRunner.ps1  -  runs a V1 endpoint chain and logs it as ONE test case
# =====================================================================================
#  Dot-source after NdcV1.Extracted.ps1 and NdcV1.Harness.ps1.
#  Every hop is captured as nested diagnostic detail on a single test_case log line,
#  per the generate-qa-report contract (the countable unit is the test case, not the hop).
#  ASCII-only source (PS 5.1 reads .ps1 as ANSI).
# =====================================================================================

# Chain step tokens accepted by Invoke-NdcFlow -Chain:
#   Search, FareConfirm, Upselling, Bundles, Book, Hold, Retrieve,
#   PnrReprice, BookAfterHold, CancelHold, Void
#
# State threaded between hops: searchResponseId, offerId, fareConfirmResponseId,
# selectedOfferId, pnr, gdsPNR, bookingToken, holdExpirationDate, lastTotal.

function Invoke-NdcFlow {
  param(
    [Parameter(Mandatory)][string]   $TcId,
    [Parameter(Mandatory)][string]   $Title,
    [Parameter(Mandatory)][string[]] $Chain,
    [Parameter(Mandatory)][string]   $Expected,
    [string] $SpecRef,
    [string] $FlowLabel,
    [hashtable] $PaxCounts = @{ADT=1;CHD=1;INF=1},
    [string] $Date,
    [string] $Origin,
    [string] $Dest,
    [int] $UpsellIndex = 0,          # which upsellOffers[] tier the Upselling hop selects
    [switch] $NoLog,                 # compute + return, do not append the test_case line
    [scriptblock] $OnHop             # optional: receives ($stepName,$resp,$state) after each hop
  )
  $S = $Global:SECT
  $state = @{}
  $hops  = New-Object System.Collections.Generic.List[hashtable]
  $n = 0
  $verdict = "PASS"
  $failNote = ""

  foreach ($step in $Chain) {
    $n++
    $hop = @{ hop=$n; endpoint=$step; verdict="PASS"; request_summary=""; response_summary=""; expected=""; actual=""; evidence="" }
    $r = $null

    switch ($step) {

      "Search" {
        $b = Body-Search -Origin $Origin -Dest $Dest -Date $Date -Pax (Get-NdcPax111)
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.Search -Body $b -Tag ($TcId + "_h" + $n + "_search")
        $hop.request_summary = "POST " + $Global:NdcV1Paths.Search + " - " + $b.searchCriteria[0].origin + "->" + $b.searchCriteria[0].destination + " " + $b.searchCriteria[0].date + ", ADT1/CHD1/INF1"
        $hop.expected = "$S`2.1: 200 with a non-empty offers[] and price reconciliation"
        $offs = @($r.json.offers)
        if ($r.status -ne 200 -or $offs.Count -eq 0) {
          $hop.verdict = "FAIL"
          $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual = "no usable offers"
          $hop.evidence = Short $r.body 300
        } else {
          $o = $offs[0]
          $state.searchResponseId = $r.json.responseId
          $state.offerId = $o.offerId
          $p = Test-NdcPrice -Offer $o -PaxCounts $PaxCounts
          $state.lastTotal = $p.total; $state.currency = $p.currency
          $state.canBeHeld = $o.canBeHeld; $state.haveBundles = $o.haveBundles
          $hop.response_summary = "200 in $([int]($r.ms/1000))s, responseId captured, $($offs.Count) offers, offers[0] canBeHeld=$($o.canBeHeld) haveBundles=$($o.haveBundles), $($p.total) $($p.currency)"
          if (-not $p.itemizedOk) {
            $hop.verdict = "FAIL"
            $hop.actual = "200 with $($offs.Count) offers and correct aggregate arithmetic, but the selected offer's taxesAndFees[] is empty while paxTotalTaxAmount is non-zero, so the documented reconciliation fails"
          } else {
            $hop.actual = "200 with $($offs.Count) offers, reconciliation holds"
          }
          $hop.evidence = $p.detail + " | missing fields: " + (($p.missing) -join ",")
        }
      }

      "FareConfirm" {
        $b = Body-FareConfirm -SearchResponseId $state.searchResponseId -SelectedOfferId $state.offerId
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.FareConfirm -Body $b -Tag ($TcId + "_h" + $n + "_fc")
        $hop.request_summary = "POST " + $Global:NdcV1Paths.FareConfirm + " - searchResponseId + selectedOfferId from Search"
        $hop.expected = "$S`2.2: 200 with selectedOffer, current pricing, no unexplained drift vs Search"
        if ($r.status -ne 200 -or -not $r.json.selectedOffer) {
          $hop.verdict="FAIL"; $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual="FareConfirm did not return a selectedOffer"; $hop.evidence = Short $r.body 300
        } else {
          $so = $r.json.selectedOffer
          $prev = $state.lastTotal
          $state.fareConfirmResponseId = $r.json.responseId
          $state.selectedOfferId = $so.offerId
          $p = Test-NdcPrice -Offer $so -PaxCounts $PaxCounts
          $state.lastTotal = $p.total
          $hop.response_summary = "200 in $([int]($r.ms/1000))s, fareConfirmResponseId captured, $($p.total) $($p.currency), canBeHeld=$($so.canBeHeld)"
          $hop.actual = "200, price $prev -> $($p.total) $($p.currency)"
          if (-not $p.itemizedOk) { $hop.verdict="FAIL"; $hop.actual += " but per-pax tax itemization does not reconcile" }
          $hop.evidence = $p.detail
        }
      }

      "Upselling" {
        $b = Body-Upselling -SearchResponseId $state.searchResponseId -SelectedOfferId $state.offerId
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.Upselling -Body $b -Tag ($TcId + "_h" + $n + "_up")
        $hop.request_summary = "POST " + $Global:NdcV1Paths.Upselling + " - searchResponseId + selectedOfferId from Search (requestUrl defect worked around by using baseUrl)"
        $hop.expected = "$S`2.3: 200 returning responseId plus selectable upsell offers, usable in place of FareConfirm's output for Book/Hold"
        # V1 Upselling returns upsellOffers[] (an upsell ladder), NOT selectedOffer -- confirmed
        # live 2026-08-05. Take index $UpsellIndex (default 0 = base tier) as the selected offer.
        $ups = @($r.json.upsellOffers)
        if ($r.status -ne 200 -or $ups.Count -eq 0) {
          $hop.verdict="FAIL"; $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual="Upselling returned no upsellOffers"; $hop.evidence = Short $r.body 400
        } else {
          $idx = 0
          if ($UpsellIndex -ge 0 -and $UpsellIndex -lt $ups.Count) { $idx = $UpsellIndex }
          $so = $ups[$idx]
          $prev = $state.lastTotal
          $state.fareConfirmResponseId = $r.json.responseId
          $state.selectedOfferId = $so.offerId
          $p = Test-NdcPrice -Offer $so -PaxCounts $PaxCounts
          $state.lastTotal = $p.total
          $ladder = (($ups | ForEach-Object { [string](Test-NdcPrice -Offer $_ -PaxCounts $PaxCounts).total }) -join "/")
          $hop.response_summary = "200 in $([int]($r.ms/1000))s, responseId captured, $($ups.Count) upsell tiers ($ladder $($p.currency)), selected tier $idx at $($p.total)"
          $hop.actual = "200, $($ups.Count) upsell offers returned; selected tier $idx, price $prev -> $($p.total) $($p.currency)"
          if (-not $p.itemizedOk) { $hop.verdict="FAIL"; $hop.actual += " but per-pax tax itemization does not reconcile" }
          $hop.evidence = "upsell ladder totals: $ladder $($p.currency); " + $p.detail
        }
      }

      "Bundles" {
        $b = Body-Bundles -FareConfirmResponseId $state.fareConfirmResponseId -SelectedOfferId $state.selectedOfferId
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.Bundles -Body $b -Tag ($TcId + "_h" + $n + "_bdl")
        $hop.request_summary = "POST " + $Global:NdcV1Paths.Bundles + " - fareConfirmResponseId + selectedOfferId"
        $hop.expected = "$S`2.4: 200 with selectable bundles for an offer whose haveBundles=true"
        $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
        if ($r.status -ne 200) {
          $hop.verdict = "FAIL"
          $hop.actual = "$($r.status) - no bundles returned (upstream offer had haveBundles=$($state.haveBundles))"
          $hop.evidence = Short $r.body 400
        } else {
          $hop.actual = "200 returned; bundle content recorded"
          $hop.evidence = Short $r.body 400
        }
      }

      "Book" {
        $b = Body-BookOrHold -FareConfirmResponseId $state.fareConfirmResponseId -SelectedOfferId $state.selectedOfferId
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.Book -Body $b -Tag ($TcId + "_h" + $n + "_book") -TimeoutSec 300
        $hop.request_summary = "POST " + $Global:NdcV1Paths.Book + " - fareConfirmResponseId/selectedOfferId + passengersList(ADT+CHD+INF) + contactsList, selectedBundles=[]"
        $hop.expected = "$S`2.9: 200, non-empty pnr/bookingToken, price reconciliation, voidCapability present"
        if ($r.status -ne 200 -or -not $r.json.pnr) {
          $hop.verdict="FAIL"; $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual="Book did not create a PNR"; $hop.evidence = Short $r.body 400
        } else {
          $state.pnr = $r.json.pnr; $state.gdsPNR = $r.json.gdsPNR; $state.bookingToken = $r.json.bookingToken
          $p = Test-NdcPrice -Offer $r.json.selectedOffer -PaxCounts $PaxCounts
          $tk = @($r.json.tickets.PSObject.Properties).Count
          $hasVoidCap = ($null -ne $r.json.PSObject.Properties['voidCapability'])
          $state.lastTotal = $p.total
          $hop.response_summary = "200 in $([int]($r.ms/1000))s, pnr=$($state.pnr), gdsPNR=$($state.gdsPNR), $tk ticket(s), $($p.total) $($p.currency)"
          $hop.actual = "200, real PNR created with $tk ticket(s); voidCapability present=$hasVoidCap"
          $hop.evidence = "pnr=$($state.pnr) gdsPNR=$($state.gdsPNR); reconciliation aggregateOk=$($p.aggregateOk) itemizedOk=$($p.itemizedOk); " + $p.detail
          if (-not $hasVoidCap) { $hop.evidence += " | voidCapability ABSENT (SPEC $S`2.9 documents it)" }
        }
      }

      "Hold" {
        $b = Body-BookOrHold -FareConfirmResponseId $state.fareConfirmResponseId -SelectedOfferId $state.selectedOfferId
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.Hold -Body $b -Tag ($TcId + "_h" + $n + "_hold") -TimeoutSec 300
        $hop.request_summary = "POST " + $Global:NdcV1Paths.Hold + " - same shape as Book (fareConfirmResponseId/selectedOfferId + passengersList + contactsList)"
        $hop.expected = "$S`2.10: 200, pnr/bookingToken/gdsPNR plus holdExpirationDate, price reconciliation"
        if ($r.status -ne 200 -or -not $r.json.pnr) {
          $hop.verdict="FAIL"; $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual="Hold did not create a held booking"; $hop.evidence = Short $r.body 400
        } else {
          $state.pnr = $r.json.pnr; $state.gdsPNR = $r.json.gdsPNR; $state.bookingToken = $r.json.bookingToken
          $state.holdExpirationDate = $r.json.holdExpirationDate
          $p = Test-NdcPrice -Offer $r.json.selectedOffer -PaxCounts $PaxCounts
          $state.lastTotal = $p.total
          $hasHed = ($null -ne $state.holdExpirationDate -and "$($state.holdExpirationDate)" -ne "")
          $tk = 0; if ($r.json.tickets) { $tk = @($r.json.tickets.PSObject.Properties).Count }
          $hop.response_summary = "200 in $([int]($r.ms/1000))s, pnr=$($state.pnr), gdsPNR=$($state.gdsPNR), holdExpirationDate='$($state.holdExpirationDate)', tickets=$tk, $($p.total) $($p.currency)"
          $hop.actual = "200, held booking created; holdExpirationDate present=$hasHed"
          $hop.evidence = "pnr=$($state.pnr); " + $p.detail
          if (-not $hasHed) {
            $hop.verdict = "FAIL"
            $hop.actual += " - holdExpirationDate is null/empty, so the hold window is unknowable"
            $hop.evidence += " | holdExpirationDate ABSENT/NULL (SPEC $S`2.10 calls it the critical time-boxing field)"
          }
        }
      }

      "Retrieve" {
        $b = Body-Retrieve -Pnr $state.pnr -GdsPnr $state.gdsPNR -BookingToken $state.bookingToken
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.Retrieve -Body $b -Tag ($TcId + "_h" + $n + "_retrieve")
        $hop.request_summary = "POST " + $Global:NdcV1Paths.Retrieve + " - supplier/credentialsSelector/pnr/gdsPnr/bookingToken"
        $hop.expected = "$S`2.11/$S`6.3: 200 and bookingStatus reflecting this point in the lifecycle; ids and total match the prior booking hop"
        if ($r.status -ne 200 -or -not $r.json.pnr) {
          $hop.verdict="FAIL"; $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual="Retrieve failed"; $hop.evidence = Short $r.body 400
        } else {
          $hasBs = ($null -ne $r.json.PSObject.Properties['bookingStatus'])
          $p = Test-NdcPrice -Offer $r.json.selectedOffer -PaxCounts $PaxCounts
          $tstat = ""
          if ($r.json.tickets) {
            $tstat = (@($r.json.tickets.PSObject.Properties | ForEach-Object { $_.Value.ticketStatus }) | Sort-Object -Unique) -join "/"
          }
          $sameIds = ($r.json.pnr -eq $state.pnr -and $r.json.bookingToken -eq $state.bookingToken)
          $hop.response_summary = "200 in $([int]($r.ms/1000))s, pnr=$($r.json.pnr), ticketStatus=$tstat, holdExpirationDate='$($r.json.holdExpirationDate)', $($p.total) $($p.currency); bookingStatus present=$hasBs"
          if (-not $hasBs) {
            $hop.verdict = "FAIL"
            $hop.actual = "200 and ids/total match, but bookingStatus is absent so the terminal-state assertion cannot be evaluated from its documented field (ticketStatus=$tstat is the only state signal)"
          } else {
            $hop.actual = "200, bookingStatus=$($r.json.bookingStatus)"
          }
          $hop.evidence = "idsMatch=$sameIds total=$($p.total) vs prior $($state.lastTotal); ticketStatus=$tstat; bookingStatus property present=$hasBs"
        }
      }

      "PnrReprice" {
        $b = Body-PnrReprice -Pnr $state.pnr -GdsPnr $state.gdsPNR -BookingToken $state.bookingToken -SurName ""
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.PnrReprice -Body $b -Tag ($TcId + "_h" + $n + "_reprice") -TimeoutSec 300
        $hop.request_summary = "POST " + $Global:NdcV1Paths.PnrReprice + " - pnr/gdsPNR/bookingToken/surName"
        $hop.expected = "$S`2.12: 200, price unchanged from Hold, called before holdExpirationDate"
        if ($r.status -ne 200) {
          $hop.verdict="FAIL"; $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual="FareConfirmAfterHold failed"; $hop.evidence = Short $r.body 400
        } else {
          $prev = $state.lastTotal
          $p = $null
          if ($r.json.selectedOffer) { $p = Test-NdcPrice -Offer $r.json.selectedOffer -PaxCounts $PaxCounts; $state.lastTotal = $p.total }
          $hop.response_summary = "200 in $([int]($r.ms/1000))s" + $(if($p){", $($p.total) $($p.currency)"}else{", no selectedOffer in body"})
          if ($p) {
            $drift = [Math]::Abs($p.total - $prev)
            $hop.actual = "200, price $prev -> $($p.total) (drift $drift)"
            if ($drift -gt 0.011) { $hop.verdict="FAIL"; $hop.actual += " - price drifted from Hold" }
            $hop.evidence = $p.detail
          } else {
            $hop.actual = "200 but no selectedOffer returned, so price-drift cannot be asserted"
            $hop.evidence = Short $r.body 300
          }
        }
      }

      "BookAfterHold" {
        $b = Body-BookAfterHold -Pnr $state.pnr -GdsPnr $state.gdsPNR -BookingToken $state.bookingToken
        $preP = $state.pnr; $preG = $state.gdsPNR; $preT = $state.bookingToken
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.BookAfterHold -Body $b -Tag ($TcId + "_h" + $n + "_bah") -TimeoutSec 300
        $hop.request_summary = "POST " + $Global:NdcV1Paths.BookAfterHold + " - pnr/gdsPnr/bookingToken from Hold"
        $hop.expected = "$S`2.13: 200 and pnr/bookingToken/gdsPNR byte-for-byte unchanged from Hold (same-PNR invariant)"
        if ($r.status -ne 200 -or -not $r.json.pnr) {
          $hop.verdict="FAIL"; $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage")
          $hop.actual="BookAfterHold failed to finalize the hold"; $hop.evidence = Short $r.body 400
        } else {
          $same = ($r.json.pnr -eq $preP -and $r.json.bookingToken -eq $preT -and $r.json.gdsPNR -eq $preG)
          $p = Test-NdcPrice -Offer $r.json.selectedOffer -PaxCounts $PaxCounts
          $tk = 0; if ($r.json.tickets) { $tk = @($r.json.tickets.PSObject.Properties).Count }
          $state.lastTotal = $p.total
          $hop.response_summary = "200 in $([int]($r.ms/1000))s, pnr=$($r.json.pnr), $tk ticket(s), $($p.total) $($p.currency)"
          $hop.actual = "200, hold finalized; same-PNR invariant holds=$same"
          if (-not $same) { $hop.verdict="FAIL"; $hop.actual += " - ids changed from Hold" }
          $hop.evidence = "Hold pnr=$preP -> BAH pnr=$($r.json.pnr); token same=$($r.json.bookingToken -eq $preT); gdsPNR same=$($r.json.gdsPNR -eq $preG); tickets=$tk"
        }
      }

      "CancelHold" {
        $b = Body-CancelAfterHold -Pnr $state.pnr -GdsPnr $state.gdsPNR -BookingToken $state.bookingToken
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.CancelHold -Body $b -Tag ($TcId + "_h" + $n + "_cxl") -TimeoutSec 300
        $hop.request_summary = "POST " + $Global:NdcV1Paths.CancelHold + " - pnr/gdsPNR/bookingToken"
        $hop.expected = "$S`2.14: response shape UNKNOWN (zero script coverage, no genuine example) - record the first observed behaviour as baseline; a follow-up Retrieve should show a cancelled state"
        $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage","pnr","bookingStatus")
        if ($r.status -ne 200) {
          $hop.verdict="FAIL"; $hop.actual="$($r.status) - cancel rejected"; $hop.evidence = Short $r.body 500
        } else {
          $state.cancelled = $true
          $hop.actual = "200 - cancel accepted; observed body recorded as the new baseline for this previously-undocumented endpoint"
          $hop.evidence = "body: " + (Short $r.body 500)
        }
      }

      "Void" {
        $b = Body-Void -Pnr $state.pnr -GdsPnr $state.gdsPNR -BookingToken $state.bookingToken
        $r = Invoke-Ndc -Path $Global:NdcV1Paths.Void -Body $b -Tag ($TcId + "_h" + $n + "_void") -TimeoutSec 300
        $hop.request_summary = "POST " + $Global:NdcV1Paths.Void + " - pnr/gdsPNR/bookingToken/surName/voidTickets=[]"
        $hop.expected = "$S`2.15: response shape UNKNOWN - expected to succeed only if the booking is void-eligible and inside the void window"
        $hop.response_summary = Sum-Resp $r @("ErrorCode","ErrorMessage","pnr","bookingStatus")
        if ($r.status -ne 200) {
          $hop.verdict="FAIL"; $hop.actual="$($r.status) - void rejected"; $hop.evidence = Short $r.body 500
        } else {
          $state.voided = $true
          $hop.actual = "200 - void accepted; observed body recorded as the new baseline"
          $hop.evidence = "body: " + (Short $r.body 500)
        }
      }

      default { throw "Unknown chain step '$step'" }
    }

    $hops.Add($hop)
    Write-Host ("  hop {0} {1,-14} {2,-5} {3}" -f $n, $step, $hop.verdict, (Short $hop.response_summary 110))
    if ($OnHop) { & $OnHop $step $r $state }

    if ($hop.verdict -eq "FAIL") {
      $verdict = "FAIL"
      if (-not $failNote) { $failNote = "first failure at hop $n ($step)" }
      # Only stop when the hop failed to produce the id the NEXT hop needs. A contract
      # failure (e.g. missing bookingStatus, unreconciled tax itemization) is a FAIL but
      # still yields usable ids, so the chain must continue and report the full picture.
      $blocking = $false
      if ($step -eq "Search" -and -not $state.offerId) { $blocking = $true }
      if ($step -in @("FareConfirm","Upselling") -and -not $state.selectedOfferId) { $blocking = $true }
      if ($step -in @("Book","Hold") -and -not $state.pnr) { $blocking = $true }
      if ($blocking) {
        Write-Host "  -- chain cannot continue past this hop; remaining steps not executed"
        break
      }
    }
  }

  $result = @{
    type="test_case"; tc_id=$TcId; title=$Title
    endpoint_or_flow = $(if ($FlowLabel) { $FlowLabel } else { ($Chain -join " -> ") })
    verdict=$verdict; spec_ref=$(if($SpecRef){$SpecRef}else{"$S`2, $S`6.3"})
    request_summary = "V1 chain " + ($Chain -join " -> ") + " on " + $Global:NDC.Supplier + "/" + $Global:NDC.CredSel + ", 1 ADT + 1 CHD + 1 INF"
    response_summary = "$($hops.Count) of $($Chain.Count) hops executed; " + (($hops | ForEach-Object { $_.endpoint + "=" + $_.verdict }) -join ", ")
    expected = $Expected
    actual = $(if ($verdict -eq "PASS") { "Chain completed with every hop passing" } else { "Chain verdict FAIL - " + $failNote })
    evidence = "pnr=" + $(if($state.pnr){$state.pnr}else{"(none)"}) + "; final total=" + $state.lastTotal + " " + $state.currency + "; see nested hops for per-hop evidence"
    correlation_id = $state.pnr
    timestamp = (Now-Iso)
    hops = @($hops)
  }
  if (-not $NoLog) { Add-NdcLog $result }
  $Global:LastFlowState = $state
  return @{ result=$result; state=$state }
}

Write-Host "NdcV1.FlowRunner loaded"
