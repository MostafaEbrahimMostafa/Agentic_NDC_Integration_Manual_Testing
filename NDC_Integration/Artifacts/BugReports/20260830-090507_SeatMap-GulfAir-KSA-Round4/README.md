# Bug Reports — Round 4 (2026-08-30) SeatMap-GulfAir-KSA regression run

Source QA report: [`20260830-090507_SeatMap-GulfAir-KSA-Round4.md`](../../Logs/20260830-090507_SeatMap-GulfAir-KSA-Round4.md)
Prior runs: [Round 1 — 20260825-103032](../20260825-103032_SeatMap-GulfAir-KSA/) &middot;
[Round 2 — 20260826-154300](../20260826-154300_SeatMap-GulfAir-KSA-Round2/) &middot;
[Round 3 — 20260830-093343](../20260830-093343_SeatMap-GulfAir-KSA-Round3/)

Round 4 attempted to re-verify all 12 of Round 3's logged defects, extended with a genuine multi-city
sweep and route-varied coverage per this round's brief. Partway through execution, `GetSeatMap`
entered a sustained, generic supplier-error outage (40+ calls, 20+ minutes, every route/passenger
count affected — see **BUG-14**, new this round) that blocked live re-verification of several
GetSeatMap/Book/Hold-adjacent defects. Per this round's explicit scope, **ResponseId-specific
findings (Round 3's BUG-02 and the ResponseId half of BUG-05) are excluded from this folder** — noted
tersely in the QA report only, not escalated here.

## Reconfirmed this round, with fresh evidence (5 of Round 3's defects)

- [BUG-03_SeatAfterHold_ErrorCode.md](BUG-03_SeatAfterHold_ErrorCode.md) — SeatAfterHold rejects GulfAir outright ("GulfAir does not exists") — **High**
- [BUG-04_Hold_holdExpirationDate.md](BUG-04_Hold_holdExpirationDate.md) — Hold's holdExpirationDate is null for GulfAir — **Medium**
- [BUG-06_Book_cellId.md](BUG-06_Book_cellId.md) — Book trusts cellCode over cellId; a tampered cellId is still accepted — **Medium**
- [BUG-10_AddPassenger_NameConsistency.md](BUG-10_AddPassenger_NameConsistency.md) — AddPassenger rejects the Postman collection's own saved example over a name/travelDocument.name mismatch — **High**
- [BUG-11_SupplierCredentialLeak.md](BUG-11_SupplierCredentialLeak.md) — plaintext supplier credential leak, now confirmed WIDENED to GetSeatMap's generic-error path in addition to Book's duplicate-submission path — **Critical**

## New this round (2 defects)

- [BUG-13_Book_selectedOfferId_ServerError.md](BUG-13_Book_selectedOfferId_ServerError.md) — Book returns a generic HTTP 500 (not a clean 400) when selectedOfferId is omitted; broken out from Round 1–3's combined BUG-05 write-up since it is unrelated to ResponseId and remains in scope — **Medium**
- [BUG-14_GetSeatMap_SustainedOutage.md](BUG-14_GetSeatMap_SustainedOutage.md) — GetSeatMap entered a sustained (20+ minute) generic supplier-error outage mid-run, isolated to this one endpoint (Book/Hold unaffected) — **High**

## Not re-verified this round — blocked by the GetSeatMap outage (BUG-14), no new report filed

- **BUG-01** (GetSeatMap accepts a cross-offer ResponseId/selectedOfferId pair) — could not obtain two independent successful GetSeatMap responses this round to re-run the cross-offer test. Last confirmed reproducing in Round 3.
- **BUG-07** (a cross-offer cellId is silently dropped from Book instead of rejected) — same blocker as BUG-01. Last confirmed reproducing in Round 3.
- **BUG-08** (Hold silently accepts and honors passengersSelectedSeats) — re-verifying requires a real seat cellCode/cellId sourced from GetSeatMap, which was unavailable this round. Last confirmed reproducing in Round 3 (both one-way and round-trip).
- **BUG-09** (a Child passenger's exit-row seat is genuinely attached and ticketed) — same blocker as BUG-08 (requires GetSeatMap to identify an exit-row cell for the CHD passenger). Last confirmed reproducing in Round 3, in its worsened (zero-validation) form.

## Excluded from this round's tally per explicit scope (ResponseId-specific — not escalated)

- **BUG-02** (GetSeatMap accepts a request with ResponseId omitted) — this round's attempt to re-run this specific sub-case happened to land during the GetSeatMap outage window (409 NDC-INT-UNC-Z9999 instead of either a 200 or a 400), so it is additionally inconclusive this round on top of being out of scope for escalation. See the QA report's TC-SEATMAP-NEG-04 entry for the terse note.
- **BUG-05's ResponseId half** (Book accepts a request with ResponseId omitted) — re-tested and still succeeds (pnr `RDKSHA` created) exactly as in prior rounds, but per this round's explicit instruction this is noted tersely in the QA report only, not escalated or counted here. The non-ResponseId half of BUG-05 (selectedOfferId omission → 500) is carried forward as its own report, **BUG-13**, above.

## Not reproduced this run (inconclusive — no report filed)

- **BUG-12** (Book latency >180s / lost PNR) — every Book/Hold call this round completed within a few
  seconds; no lost-PNR incident occurred, consistent with Round 3's own finding. Its absence is not
  evidence of a fix (Round 2 characterized it as rare/non-deterministic).

## Observed but not separately filed (attributed to the BUG-14 outage window, not a confirmed regression)

- `TC-SEATMAP-NEG-03` (fabricated ResponseId/selectedOfferId) returned a generic HTTP 500 this round
  instead of the clean 409 ValidationError seen in Rounds 1–3. This occurred during the same outage
  window as BUG-14 and is treated as inconclusive rather than a confirmed regression of the Round 2
  fix — recommend re-running this specific case once GetSeatMap's outage (BUG-14) is confirmed
  resolved.
