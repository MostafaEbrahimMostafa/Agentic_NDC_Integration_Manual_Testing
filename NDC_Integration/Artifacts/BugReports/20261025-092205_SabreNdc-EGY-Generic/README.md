# Bug reports — 20261025-092205_SabreNdc-EGY-Generic

SabreNdc, EGY, staging, TestCases_Generic.csv (V1 + V2).

## New defects

- [BUG-09](BUG-09_FareConfirm_ResponseId.md) — **Medium** — [FareConfirm] ResponseId Not Validated in FareConfirm Request (TC-FARECONFIRM-NEG-01 (also TC-FARECONFIRM-VAL-01))
- [BUG-10](BUG-10_FareConfirm_selectedOfferId.md) — **Medium** — [FareConfirm] Unknown selectedOfferId Returns HTTP 500 ServerError in FareConfirm Response (TC-FARECONFIRM-NEG-01)
- [BUG-11](BUG-11_Book_selectedOfferId.md) — **High** — [Book] Book Accepts a selectedOfferId From a Different Confirmation and Issues a Ticket (TC-BOOK-NEG-05)
- [BUG-12](BUG-12_Book_pnr.md) — **High** — [Book] Repeat Book With the Same Offer Reference Creates a Second Live PNR (TC-BOOK-NEG-04)
- [BUG-14](BUG-14_Search_taxesAndFees.md) — **Low** — [Search] taxesAndFees Missing from Search Response Offers (TC-SEARCH-BIZ-02)

## Known bugs seen again (no new report; existing report is the reference)

- **BUG-01** (Void ignores surName) — 2nd confirmed occurrence, TC-VOID-NEG-02 (V1 and V2): a booking is voided with surName "Mismatch". Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-01_Void_surName.md`
- **BUG-03** (voidCapability missing) — 2nd confirmed occurrence, TC-BOOK-POS-02 (and 41 more Book/Hold responses: the field is absent on all of them, so TC-VERSIONDIFF-VAL-03 and TC-VOID-BIZ-01 have nothing to read). Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-03_Book_voidCapability.md`
- **BUG-06** (Retrieve shows OnHold after CancelAfterHold) — 2nd occurrence, TC-CANCELHOLD-REG-01 (V2 "OnHold"; V1 gives no cancelled signal), also seen in TC-RETRIEVE-VAL-01. Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-06_Retrieve_bookingStatus.md`
- **BUG-07** (two error envelopes) — 2nd occurrence, TC-VERSIONDIFF-NEG-01. Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-07_Void_errorenvelope.md`
