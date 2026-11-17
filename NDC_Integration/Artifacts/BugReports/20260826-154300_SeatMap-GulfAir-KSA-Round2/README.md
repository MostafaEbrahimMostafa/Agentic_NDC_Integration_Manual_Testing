# Bug Reports — Round 2 (2026-08-26) SeatMap-GulfAir-KSA regression run

Source QA report: [`20260826-154300_SeatMap-GulfAir-KSA-Round2.md`](../../Logs/20260826-154300_SeatMap-GulfAir-KSA-Round2.md)
Prior run: [`20260825-103032_SeatMap-GulfAir-KSA`](../20260825-103032_SeatMap-GulfAir-KSA/)

## Reproduced from Round 1 (still open)

- [BUG-01_GetSeatMap_CrossOfferIdentifiers.md](BUG-01_GetSeatMap_CrossOfferIdentifiers.md) — GetSeatMap accepts a cross-offer ResponseId/selectedOfferId pair
- [BUG-02_GetSeatMap_ResponseId.md](BUG-02_GetSeatMap_ResponseId.md) — ResponseId not enforced as required on GetSeatMap
- [BUG-03_SeatAfterHold_ErrorCode.md](BUG-03_SeatAfterHold_ErrorCode.md) — SeatAfterHold rejects GulfAir outright ("GulfAir does not exists")
- [BUG-04_Hold_holdExpirationDate.md](BUG-04_Hold_holdExpirationDate.md) — Hold's holdExpirationDate is null for GulfAir
- [BUG-05_Book_ResponseId.md](BUG-05_Book_ResponseId.md) — ResponseId not enforced as required on Book; selectedOfferId omission produces a generic 500
- [BUG-06_Book_cellId.md](BUG-06_Book_cellId.md) — Book trusts cellCode over cellId; a tampered cellId is still accepted
- [BUG-07_Book_passengersSelectedSeats.md](BUG-07_Book_passengersSelectedSeats.md) — a cross-offer cellId is silently dropped from Book instead of rejected
- [BUG-08_Hold_passengersSelectedSeats.md](BUG-08_Hold_passengersSelectedSeats.md) — Hold silently accepts and honors passengersSelectedSeats directly

## New in Round 2

- [BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md](BUG-09_Book_passengersSelectedSeats_ExitRowCHD.md) — a Child passenger's exit-row seat is now actually confirmed/ticketed (worse than Round 1's silent-drop) — **High**
- [BUG-10_AddPassenger_NameConsistency.md](BUG-10_AddPassenger_NameConsistency.md) — AddPassenger newly rejects the Postman collection's own saved example over a name/travelDocument.name mismatch — **High**
- [BUG-11_Book_SupplierCredentialLeak.md](BUG-11_Book_SupplierCredentialLeak.md) — a Book duplicate-submission error leaks the raw supplier SOAP request/response, including plaintext apiKey/secretKey — **Critical**
- [BUG-12_Book_Latency_LostPnr.md](BUG-12_Book_Latency_LostPnr.md) — a Book call exceeded 180s and the caller never received the pnr for a booking that succeeded server-side — **High**

## Fixed since Round 1 (no bug report — see the QA report's Findings section)

- `TC-SEATMAP-VAL-06` — Aisle/Seat partition violation (row 8, column E)
- `TC-SEATMAP-BIZ-02` — seatPriceDetails price-reconciliation (basePrice/taxesPrice)
- `TC-SEATMAP-NEG-03` — generic HTTP 500 on fabricated ResponseId/selectedOfferId (now a clean 409)
