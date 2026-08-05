# Bug Reports Index — Run 20260805-140642_TestCases_V1

Source: `NDC_Integration/Artifacts/Logs/20260805-140642_TestCases_V1.jsonl` (V1, TravelportNdc/UAE, staging)

| # | File | Title |
|---|------|-------|
| 01 | [BUG-01_RetrieveBooking_bookingStatus.md](BUG-01_RetrieveBooking_bookingStatus.md) | [V1][TravelportNdc] – bookingStatus Missing from RetrieveBooking Response |
| 02 | [BUG-02_Search_taxesAndFees.md](BUG-02_Search_taxesAndFees.md) | [V1][TravelportNdc][Search] – taxesAndFees Returned Empty While paxTotalTaxAmount Is Non-Zero |
| 03 | [BUG-03_Search-FareConfirm_paxTotalAmount.md](BUG-03_Search-FareConfirm_paxTotalAmount.md) | [V1][TravelportNdc][Search/FareConfirm] – paxTotalAmount Missing from passengerFareBreakdown |
| 04 | [BUG-04_Book_voidCapability.md](BUG-04_Book_voidCapability.md) | [V1][TravelportNdc][Book] – voidCapability Missing from Book Response |
| 05 | [BUG-05_Book_ContextValue_InternalLeak.md](BUG-05_Book_ContextValue_InternalLeak.md) | [V1][TravelportNdc][Book] – Context[].Value Leaks Internal Implementation Detail |
| 07 | [BUG-07_Void_ContextValue.md](BUG-07_Void_ContextValue.md) | [V1][TravelportNdc][Void] – Context[].Value Returns Misleading "TravelportNdc does not exists" |
| 08 | [BUG-08_Upselling_selectedOffer.md](BUG-08_Upselling_selectedOffer.md) | [V1][TravelportNdc][Upselling] – selectedOffer Missing, Breaking Documented Chaining Contract |
| 09 | [BUG-09_Search_OriginalSupplierRequestResponse_Leak.md](BUG-09_Search_OriginalSupplierRequestResponse_Leak.md) | [V1][TravelportNdc][Search] – OriginalSupplierRequest/Response Leaked Despite isdebug=false |
| 10 | [BUG-10_Search_ErrorMessage_DuplicatesErrorCode.md](BUG-10_Search_ErrorMessage_DuplicatesErrorCode.md) | [V1][TravelportNdc][Search] – ErrorMessage Duplicates ErrorCode Instead of Human-Readable Text |

Note: BUG-06 (Emirates supplier rejection) was removed — Emirates is out of scope for this
TravelportNdc run and the finding does not apply here.

Navigation aid only — open the individual reports for full details.
