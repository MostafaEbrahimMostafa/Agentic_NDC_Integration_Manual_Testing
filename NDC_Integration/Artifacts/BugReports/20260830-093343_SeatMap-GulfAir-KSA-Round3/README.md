# Bug Reports — Round 3 (2026-08-30) SeatMap-GulfAir-KSA regression run

Source QA report: [`20260830-093343_SeatMap-GulfAir-KSA-Round3.md`](../../Logs/20260830-093343_SeatMap-GulfAir-KSA-Round3.md)
Prior runs: [Round 1 — 20260825-103032](../20260825-103032_SeatMap-GulfAir-KSA/) &middot; [Round 2 — 20260826-154300](../20260826-154300_SeatMap-GulfAir-KSA-Round2/)

All 12 of Round 2's logged defects were re-verified live this round. 11 still reproduce
(byte-for-byte identical in most cases); 1 (BUG-12) did not reproduce and has no new report — see the
QA report's Findings section for its inconclusive status. **No new, distinct defects were found in
Round 3.**

## Still reproducing (11 of 12) — 3rd consecutive round unless noted

- [BUG-01_GetSeatMap_CrossOfferIdentifiers.md](BUG-01_GetSeatMap_CrossOfferIdentifiers.md) — GetSeatMap accepts a cross-offer ResponseId/selectedOfferId pair — **High**
- [BUG-02_GetSeatMap_ResponseId.md](BUG-02_GetSeatMap_ResponseId.md) — ResponseId not enforced as required on GetSeatMap — **Medium**
- [BUG-03_SeatAfterHold_ErrorCode.md](BUG-03_SeatAfterHold_ErrorCode.md) — SeatAfterHold rejects GulfAir outright ("GulfAir does not exists") — **High**
- [BUG-04_Hold_holdExpirationDate.md](BUG-04_Hold_holdExpirationDate.md) — Hold's holdExpirationDate is null for GulfAir (now confirmed on both one-way and round-trip) — **Medium**
- [BUG-05_Book_ResponseId.md](BUG-05_Book_ResponseId.md) — ResponseId not enforced as required on Book; selectedOfferId omission produces a generic 500 — **High**
- [BUG-06_Book_cellId.md](BUG-06_Book_cellId.md) — Book trusts cellCode over cellId; a tampered cellId is still accepted — **Medium**
- [BUG-07_Book_passengersSelectedSeats.md](BUG-07_Book_passengersSelectedSeats.md) — a cross-offer cellId is silently dropped from Book instead of rejected — **High**
- [BUG-08_Hold_passengersSelectedSeats.md](BUG-08_Hold_passengersSelectedSeats.md) — Hold silently accepts and honors passengersSelectedSeats directly (now confirmed on both one-way and round-trip) — **Medium**
- [BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md](BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md) — a Child passenger's exit-row seat is genuinely attached and ticketed, 2nd consecutive round in this worsened state — **High**
- [BUG-10_AddPassenger_NameConsistency.md](BUG-10_AddPassenger_NameConsistency.md) — AddPassenger rejects the Postman collection's own saved example over a name/travelDocument.name mismatch, 2nd consecutive round — **High**
- [BUG-11_Book_SupplierCredentialLeak.md](BUG-11_Book_SupplierCredentialLeak.md) — a Book duplicate-submission error still leaks the raw supplier SOAP request/response, including a plaintext apikey-class token — **Critical**

## Not reproduced this run (inconclusive — no report filed)

- **BUG-12** (Book latency >180s / lost PNR) — every Book/Hold call this round (17+ live
  bookings/holds) completed within a few seconds; no lost-PNR incident occurred. Round 2 itself
  characterized this as a rare, non-deterministic timing issue, so its absence this round is not
  evidence of a fix. See the QA report's Findings section for the full note. No bug report was
  re-filed since there is nothing new to reproduce or evidence.

## Fixed and stable (no bug report — see the QA report's Findings section)

- `TC-SEATMAP-VAL-06` — Aisle/Seat partition violation (row 8, column E) — fixed since Round 1, still fixed in Round 3.
- `TC-SEATMAP-BIZ-02` — seatPriceDetails price-reconciliation (basePrice/taxesPrice) — fixed since Round 1, still fixed in Round 3.
- `TC-SEATMAP-NEG-03` — generic HTTP 500 on fabricated ResponseId/selectedOfferId (now a clean 409) — fixed since Round 1, still fixed in Round 3.
