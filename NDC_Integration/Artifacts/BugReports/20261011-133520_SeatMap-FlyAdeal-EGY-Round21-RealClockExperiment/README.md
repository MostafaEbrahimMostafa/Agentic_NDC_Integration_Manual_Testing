# Bug Reports — Round 21 "Real Clock Experiment" (2026-10-11) SeatMap-FlyAdeal-EGY full-suite run

Source QA report: [`20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md`](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md)

Full run of all 63 `SeatMap_TestCases.csv` cases against FlyAdeal / EGY on the non-staging host: 33 passed, 14 failed, 16 blocked. **Four new defects** and eight recurrences of already-tracked bugs:

- [BUG-18_Retrieve_paxTotalSeatAmount.md](BUG-18_Retrieve_paxTotalSeatAmount.md) — **High.** paxTotalSeatAmount Returned Incorrect Value in Retrieve Response (4th Confirmation, First on FlyAdeal) (`FLOW-V2-49-SEATFIELD`)
- [BUG-01_GetSeatMap_CrossOfferIdentifiers.md](BUG-01_GetSeatMap_CrossOfferIdentifiers.md) — **Medium.** ResponseId/selectedOfferId Mismatch Accepted in GetSeatMap Request (10th Confirmation, First on FlyAdeal) (`TC-SEATMAP-NEG-02`)
- [BUG-02_GetSeatMap_ResponseId.md](BUG-02_GetSeatMap_ResponseId.md) — **Low.** ResponseId Not Enforced as Required in GetSeatMap Request (10th Confirmation, First on FlyAdeal) (`TC-SEATMAP-NEG-04`)
- [BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md](BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md) — **Low.** isSeatMapRequired=false Not Enforced - Seat Map Returned for an Offer That Is Not Flagged (10th Confirmation, First on FlyAdeal) (`TC-SEATMAP-NEG-01`)
- [BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md](BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md) — **Medium.** credentialsSelector Not Enforced - Offer Created Under EGY Readable Through UAE (7th Confirmation, First on FlyAdeal) (`TC-SEATMAP-SEC-01`)
- [BUG-07_Book_CrossOfferCellId_NotRejected.md](BUG-07_Book_CrossOfferCellId_NotRejected.md) — **High.** Cross-Offer cellId Accepted; Booking Created With the Seat Silently Dropped (16th Confirmation, First on FlyAdeal) (`TC-SEATMAP-VAL-04`)
- [BUG-05_Book_ResponseId.md](BUG-05_Book_ResponseId.md) — **Medium.** ResponseId Not Enforced as Required in Book Request; PNR Created (10th Confirmation, First on FlyAdeal) (`TC-BOOK-NEG-12`)
- [BUG-03_SeatAfterHold_ErrorCode.md](BUG-03_SeatAfterHold_ErrorCode.md) — **High.** Every Call Rejected With 409 OperationNotSupported (10th Confirmation, First on FlyAdeal) (`TC-SEATAFTERHOLD-POS-01`)
- [BUG-20_GetSeatMap_seatPriceDetailsByPassenger_BlockedCells.md](BUG-20_GetSeatMap_seatPriceDetailsByPassenger_BlockedCells.md) — **Medium.** **NEW.** seatPriceDetailsByPassenger Returned Populated for Blocked and Occupied Seats (`TC-SEATMAP-VAL-08`)
- [BUG-21_Book_pnr_TwoJourneys.md](BUG-21_Book_pnr_TwoJourneys.md) — **Critical.** **NEW.** pnr Returned as Null in Book Response for a Two-Journey (Round-Trip) Itinerary (`TC-BOOK-BND-03`)
- [BUG-22_Book_selectedOfferId_Omitted.md](BUG-22_Book_selectedOfferId_Omitted.md) — **Low.** **NEW.** Omitted selectedOfferId Returns Unhandled 500 ServerError Instead of a Validation Error (`TC-BOOK-NEG-12`)
- [BUG-23_GetSeatMap_cellCharacteristics_BulkheadOnEverySeat.md](BUG-23_GetSeatMap_cellCharacteristics_BulkheadOnEverySeat.md) — **Low.** **NEW.** cellCharacteristics Returned Incorrect Value (Bulkhead Code K on Every Seat) (`TC-SEATMAP-VAL-07`)

**BUG-06** (tampered cellId accepted) did **not** reproduce on FlyAdeal (rejected 400); **BUG-16** and **BUG-19** did not reproduce either. **BUG-04, BUG-08** (Hold) and **BUG-09** (exit-row child) could not be exercised: FlyAdeal has no Hold and offers no bookable exit-row seat.

## Cleanup

16 real, unticketed FlyAdeal/EGY bookings were created on the non-staging host (12 in the final passes, 3 in the discarded parallel first pass and 1 pre-run probe), plus 4 round-trip Book calls that returned no pnr (BUG-21). They are listed in the QA report's Cleanup section; `BUG-07`, `BUG-05`, `BUG-18` and `BUG-21` cite some of them as evidence, so keep those until triaged.
