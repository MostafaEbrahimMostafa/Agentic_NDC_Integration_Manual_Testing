# Bug Reports — 20260825-103032_SeatMap-GulfAir-KSA

Source run: [`NDC_Integration/Artifacts/Logs/20260825-103032_SeatMap-GulfAir-KSA.html`](../../Logs/20260825-103032_SeatMap-GulfAir-KSA.html)
(SeatMap_TestCases.csv, Supplier=GulfAir, Credentials Selector=KSA, `https://ndc-integration-stg-ne-2.azurewebsites.net/`)

| # | File | Title | Severity |
|---|---|---|---|
| 01 | [BUG-01_GetSeatMap_cellCategory.md](BUG-01_GetSeatMap_cellCategory.md) | GetSeatMap: `cellCategory` wrong for an occupied seat cell (8E tagged as Aisle) | Medium |
| 02 | [BUG-02_GetSeatMap_seatPriceDetails.md](BUG-02_GetSeatMap_seatPriceDetails.md) | GetSeatMap: seat price never reconciles (basePrice/taxesPrice always 0) | High |
| 03 | [BUG-03_GetSeatMap_ResponseId_crossvalidation.md](BUG-03_GetSeatMap_ResponseId_crossvalidation.md) | GetSeatMap: ResponseId/selectedOfferId not cross-validated to the same offer | Medium |
| 04 | [BUG-04_GetSeatMap_malformed_input_500.md](BUG-04_GetSeatMap_malformed_input_500.md) | GetSeatMap: fabricated ResponseId/selectedOfferId returns 500, not 400 | Low |
| 05 | [BUG-05_GetSeatMap_ResponseId_not_required.md](BUG-05_GetSeatMap_ResponseId_not_required.md) | GetSeatMap: ResponseId not actually enforced as required | Low |
| 06 | [BUG-06_Book_ResponseId_not_required.md](BUG-06_Book_ResponseId_not_required.md) | Book: ResponseId not actually enforced as required | Medium |
| 07 | [BUG-07_Book_cellId_not_validated.md](BUG-07_Book_cellId_not_validated.md) | Book: cellId token not validated — a tampered token still books the seat | High |
| 08 | [BUG-08_Book_cellCode_cellId_mismatch.md](BUG-08_Book_cellCode_cellId_mismatch.md) | Book: resolves the booked seat from cellCode alone, ignoring a mismatched cellId | High |
| 09 | [BUG-09_Book_crossoffer_seat_silently_dropped.md](BUG-09_Book_crossoffer_seat_silently_dropped.md) | Book: a cross-offer cellId silently drops the seat selection with no error | High |
| 10 | [BUG-10_Hold_holdExpirationDate_null.md](BUG-10_Hold_holdExpirationDate_null.md) | Hold: `holdExpirationDate` returned as null | Medium |
| 11 | [BUG-11_SeatAfterHold_GulfAir_not_supported.md](BUG-11_SeatAfterHold_GulfAir_not_supported.md) | SeatAfterHold: rejects GulfAir outright ("GulfAir does not exists") | Critical |

**Not filed as bugs** (logged as `unknown_resolution` findings in the run instead, since they are
newly-confirmed facts rather than contradictions of a stated spec fact): GetSeatMap not gated by
`isSeatMapRequired`; GulfAir's live capability flags; GulfAir's `cellCharacteristics.padisCode`
always `"Unknown"`; two undocumented GetSeatMap response fields (`isFareCheckRequired`,
`passengersSeatMapAvailability`); V2 Retrieve *does* return `bookingStatus` (unlike V1's documented
gap); the CHD+exit-row seat silently not being attached (no error, but also no policy violation);
and — most notably — **Hold directly accepting and honoring an undocumented `passengersSelectedSeats`
field for GulfAir**, which is arguably the most consequential single discovery of this run (it may
be GulfAir's only working Hold-branch seat-selection path, given BUG-11).
