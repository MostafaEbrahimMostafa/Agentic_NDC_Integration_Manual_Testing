# Bug Reports — Round 5 (2026-08-30) SeatMap-GulfAir-KSA regression run

Source QA report: [`20260830-143810_SeatMap-GulfAir-KSA-Round5.md`](../../Logs/20260830-143810_SeatMap-GulfAir-KSA-Round5.md)
Prior runs: [Round 1 — 20260825-103032](../20260825-103032_SeatMap-GulfAir-KSA/) &middot;
[Round 2 — 20260826-154300](../20260826-154300_SeatMap-GulfAir-KSA-Round2/) &middot;
[Round 3 — 20260830-093343](../20260830-093343_SeatMap-GulfAir-KSA-Round3/) &middot;
[Round 4 — 20260830-090507](../20260830-090507_SeatMap-GulfAir-KSA-Round4/)

Round 5's top priority was re-attempting every one of Round 4's 22 `BLOCKED` test cases, since
Round 4 ended mid-run with a sustained `GetSeatMap` outage (`BUG-14`). The very first `GetSeatMap`
call this round succeeded, and every `GetSeatMap` call made across 9 independent chains this round
succeeded normally — **`BUG-14` is confirmed resolved**, unblocking fresh re-verification of every
defect that outage had prevented from being re-tested last round.

## Reconfirmed this round, with fresh evidence (10 of Round 4's defects)

- [BUG-01_GetSeatMap_CrossOfferIdentifiers.md](BUG-01_GetSeatMap_CrossOfferIdentifiers.md) — GetSeatMap accepts a cross-offer ResponseId/selectedOfferId pair — **High**
- [BUG-02_GetSeatMap_ResponseId.md](BUG-02_GetSeatMap_ResponseId.md) — GetSeatMap succeeds with ResponseId omitted — **Medium**
- [BUG-03_SeatAfterHold_ErrorCode.md](BUG-03_SeatAfterHold_ErrorCode.md) — SeatAfterHold rejects GulfAir outright ("GulfAir does not exists") — **High**
- [BUG-04_Hold_holdExpirationDate.md](BUG-04_Hold_holdExpirationDate.md) — Hold's holdExpirationDate is null for GulfAir — **Medium**
- [BUG-06_Book_cellId.md](BUG-06_Book_cellId.md) — Book trusts cellCode over cellId; a tampered cellId is still accepted — **Medium**
- [BUG-07_Book_CrossOfferSeatSilentlyDropped.md](BUG-07_Book_CrossOfferSeatSilentlyDropped.md) — a cross-offer cellId is silently dropped from Book instead of rejected — **High**
- [BUG-08_Hold_passengersSelectedSeats.md](BUG-08_Hold_passengersSelectedSeats.md) — Hold silently accepts and honors passengersSelectedSeats, undermining SeatAfterHold — **Medium**
- [BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md](BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md) — a Child passenger's exit-row seat is genuinely attached and ticketed, zero validation — **High**
- [BUG-10_AddPassenger_NameConsistency.md](BUG-10_AddPassenger_NameConsistency.md) — AddPassenger rejects the Postman collection's own saved example over a name/travelDocument.name mismatch — **High**
- [BUG-11_SupplierCredentialLeak.md](BUG-11_SupplierCredentialLeak.md) — plaintext supplier credential leak, now confirmed on a THIRD endpoint/path (Hold's 609-conflict envelope) — **Critical**

## New this round (1 defect)

- [BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md](BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md) — GetSeatMap does not reject a call against an isSeatMapRequired=false offer; this exact result has reproduced since Round 1 but was never separately filed for GulfAir/KSA until now — **Low**

## Resolved this round (2 of Round 4's defects — no longer reproduce)

- **BUG-13** (Book returned a generic HTTP 500 instead of a clean 400 when `selectedOfferId` was
  omitted) — **RESOLVED**. The identical request shape that produced a 500 in Round 4 now produces
  a clean `400 ValidationError` ("The selected offer is invalid, expired, or could not be found.").
  No new report filed; recommend the team mark BUG-13 closed in whatever tracker holds it.
- **BUG-14** (GetSeatMap sustained supplier-error outage) — **RESOLVED**. See the headline note
  above; no new report filed since there is nothing further to reproduce.

## Excluded from this round's tally per the team's established scope decision (not escalated)

- **ResponseId omission on Book** (the surviving half of the original combined Round 1-3 `BUG-05`) —
  re-tested this round and still succeeds, creating a real ticketed PNR (`RDQQTN`) when `ResponseId`
  is omitted from an otherwise-valid `Book` request. Per the scope convention established in Rounds
  3-4, this sub-case is not escalated as its own numbered report here, but it is explicitly flagged
  in this round's QA report (`TC-BOOK-NEG-12`) rather than silently dropped — it remains a live,
  unresolved gap and has now gone 5 rounds without a decision either way.

## Not reproduced this run (inconclusive — no report filed)

- **BUG-12** (Book latency >180s / lost PNR) — not specifically re-tested this round; every
  Book/Hold call completed within a few seconds, consistent with every prior round's own finding
  that this is rare/non-deterministic rather than reliably reproducible.
