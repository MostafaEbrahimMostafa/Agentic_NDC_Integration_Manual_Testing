# Bug reports — 20261025-185354_SabreNdc-EGY-Generic-Round2

SabreNdc, EGY, staging, TestCases_Generic.csv (V1 + V2), Round 2.

## New defects

(none: every defect seen this round is already tracked)

## Known bugs seen again (no new report; the existing report is the reference)

- **BUG-01** (Void ignores surName) — 1 test case(s): TC-VOID-NEG-02; occurrence 3 (3rd confirmed). Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-01_Void_surName.md`
- **BUG-03** (voidCapability missing from Book/Hold/BookAfterHold) — 1 test case(s): TC-BOOKAFTERHOLD-REG-01; occurrence 3 (3rd confirmed). Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-03_Book_voidCapability.md`
- **BUG-06** (Retrieve shows OnHold / no cancelled signal after CancelAfterHold) — 2 test case(s): TC-RETRIEVE-VAL-01, TC-CANCELHOLD-REG-01; occurrence 5 (5th confirmed). Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-06_Retrieve_bookingStatus.md`
- **BUG-07** (two error envelopes) — 1 test case(s): TC-VERSIONDIFF-NEG-01; occurrence 3 (3rd confirmed). Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-07_Void_errorenvelope.md`
- **BUG-09** (FareConfirm ignores ResponseId) — 1 test case(s): TC-FARECONFIRM-NEG-01; occurrence 2 (2nd confirmed). Report: `../20261025-092205_SabreNdc-EGY-Generic/BUG-09_FareConfirm_ResponseId.md`
- **BUG-11** (Book accepts a mismatched selectedOfferId) — 1 test case(s): TC-BOOK-NEG-05; occurrence 2 (2nd confirmed). Report: `../20261025-092205_SabreNdc-EGY-Generic/BUG-11_Book_selectedOfferId.md`
- **BUG-12** (repeat Book creates a second live PNR) — 1 test case(s): TC-BOOK-NEG-04; occurrence 2 (2nd confirmed). Report: `../20261025-092205_SabreNdc-EGY-Generic/BUG-12_Book_pnr.md`
- **BUG-14** (Search offers carry no taxesAndFees) — 1 test case(s): TC-SEARCH-BIZ-02; occurrence 2 (2nd confirmed). Report: `../20261025-092205_SabreNdc-EGY-Generic/BUG-14_Search_taxesAndFees.md`

## Not reproduced this round (looks fixed; confirm on the next build)

- **BUG-03** (voidCapability missing from Book and Hold responses) — not reproduced: In Round 1 (2026-10-25 morning) the field was absent on all 41 Book/Hold/BookAfterHold responses. In Round 2 every Book response returns "FullVoidOnlyAllowed" (40 of 40) and every Hold response returns "VoidNotAllowed" (41 of 41), so TC-BOOK-POS-02 now passes. BookAfterHold still omits the field (logged as a recurrence under TC-BOOKAFTERHOLD-REG-01). Recommend closing the Book/Hold part of BUG-03 after one more confirmation on the next build.
- **BUG-10** (Unknown selectedOfferId gives HTTP 500 in FareConfirm) — not reproduced: FareConfirm with selectedOfferId "garbage" now returns HTTP 400 NDC-INT-TEC-A0001 (PascalCase envelope) instead of Round 1's HTTP 500 ServerError "Unknown error occured", on V1 and V2. Looks fixed; the id-validation part of BUG-09 (responseId ignored) is unchanged. Recommend closing BUG-10 after confirmation on the next build.
