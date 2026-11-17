# Bug Reports — Round 22 "Real Clock Experiment" (2026-10-11) SeatMap-Galileo-EGY full-suite run

Source QA report: [`20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md`](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md)

Full run of all 63 `SeatMap_TestCases.csv` cases against Galileo / EGY on the non-staging host: 21 passed, 14 failed, 28 blocked. **Two new defects** and ten recurrences of already-tracked bugs:

- [BUG-01_GetSeatMap_CrossOfferIdentifiers.md](BUG-01_GetSeatMap_CrossOfferIdentifiers.md) — **High.** ResponseId/selectedOfferId Cross-Offer Pair Accepted (11th Confirmation, First on Galileo) (`TC-SEATMAP-NEG-02`)
- [BUG-02_GetSeatMap_ResponseId.md](BUG-02_GetSeatMap_ResponseId.md) — **Medium.** ResponseId Not Enforced as Mandatory (11th Confirmation, First on Galileo) (`TC-SEATMAP-NEG-04`)
- [BUG-03_SeatAfterHold_ErrorCode.md](BUG-03_SeatAfterHold_ErrorCode.md) — **Medium.** Endpoint Rejects Supplier With OperationNotSupported (11th Confirmation, First on Galileo) (`TC-SEATAFTERHOLD-POS-01`)
- [BUG-05_Book_ResponseId.md](BUG-05_Book_ResponseId.md) — **High.** ResponseId Not Enforced as Mandatory (11th Confirmation, First on Galileo) (`TC-BOOK-NEG-12`)
- [BUG-08_Hold_passengersSelectedSeats.md](BUG-08_Hold_passengersSelectedSeats.md) — **Medium.** passengersSelectedSeats Accepted and Priced Although Documented as Absent (10th Confirmation, First on Galileo) (`FLOW-V2-50-SEATFIELD`)
- [BUG-09_Book_ChildExitRow.md](BUG-09_Book_ChildExitRow.md) — **High.** Child Passenger Accepted in Exit-Row Seat (12th Confirmation, First on Galileo) (`TC-BOOK-BIZ-05`)
- [BUG-11_Errors_SupplierPayloadLeak.md](BUG-11_Errors_SupplierPayloadLeak.md) — **High.** OriginalSupplierRequest/Response Leak on Generic Error Responses (9th Confirmation) (`TC-SEATMAP-NEG-05`)
- [BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md](BUG-15_GetSeatMap_isSeatMapRequired_NotEnforced.md) — **Medium.** isSeatMapRequired=false Not Enforced and Not Meaningful (11th Confirmation, First on Galileo) (`TC-SEATMAP-NEG-01`)
- [BUG-18_Retrieve_paxTotalSeatAmount.md](BUG-18_Retrieve_paxTotalSeatAmount.md) — **High.** paxTotalAmount Excludes the Seat Amount (5th Confirmation, First on Hold Path) (`FLOW-V2-50-SEATFIELD`)
- [BUG-20_GetSeatMap_seatPriceDetailsByPassenger_BlockedCells.md](BUG-20_GetSeatMap_seatPriceDetailsByPassenger_BlockedCells.md) — **Medium.** Blocked and Occupied Seats Carry Real Prices (2nd Confirmation, First on Galileo) (`TC-SEATMAP-VAL-08`)
- [BUG-24_Book_OrphanHeldReservationOnTicketingFailure.md](BUG-24_Book_OrphanHeldReservationOnTicketingFailure.md) — **High.** **NEW.** Failed Ticketing Leaves an Untraceable Held Reservation and Returns No pnr/bookingToken (`TC-BOOK-NEG-09`)
- [BUG-25_HoldPnrRepriceRetrieve_PassengerIdentifierUnstable.md](BUG-25_HoldPnrRepriceRetrieve_PassengerIdentifierUnstable.md) — **Medium.** **NEW.** Passenger Identifier Differs Between Responses of the Same Booking (`FLOW-V2-50-SEATFIELD`)

**BUG-06** and **BUG-07** (tampered / foreign cellId accepted), **BUG-04** (Hold expiry null), **BUG-22** (Book 500 without selectedOfferId) and **BUG-23** (padis K on every seat) did **not** reproduce on Galileo; **BUG-17**, **BUG-19** and **BUG-21** could not be exercised.

**Environment blocker (not a bug):** Book and BookAfterHold cannot complete for Galileo/EGY on this host (ticketing fails: invalid credit card / FOP CHECK DATE), which blocks 28 cases. Fix the form of payment on the EGY credentials and rerun those cases.

## Cleanup

8 held Galileo PNRs (pnr + gdsPNR + bookingToken known) and 10 orphan held reservations from failed Book calls (gdsPnr only) were left on the non-staging host; all are listed in the QA report's Cleanup section. No CancelAfterHold/Void was called.
