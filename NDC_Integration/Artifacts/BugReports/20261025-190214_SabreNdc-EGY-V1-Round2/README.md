# Bug reports — 20261025-190214_SabreNdc-EGY-V1-Round2

SabreNdc, EGY, staging, TestCases_V1.csv, Round 2.

## New defects

- [BUG-15](BUG-15_Retrieve_bookingStatus.md) — **High** — [Retrieve] bookingStatus Missing from RetrieveBooking Response (FLOW-V1-01 (and every executed V1 flow that ends in Retrieve: FLOW-V1-02..12))
- [BUG-16](BUG-16_Upselling_selectedOffer.md) — **High** — [Upselling] selectedOffer Missing from Upselling Response, Breaking Documented Chaining Contract (FLOW-V1-07 (and FLOW-V1-08..12; every V1 Upselling call))
- [BUG-17](BUG-17_Upselling_requestUrl.md) — **Medium** — [Upselling] Upselling Request Uses the Undefined {{requestUrl}} Variable in the V1 Collection (FLOW-V1-08-NEG (also FLOW-V1-12-NEG, FLOW-V1-20-NEG, TC-UPSELL-NEG-01))
- [BUG-18](BUG-18_Search_paxTotalAmount.md) — **Medium** — [Search] paxTotalAmount Missing from passengerFareBreakdown in Search and FareConfirm Responses (TC-SEARCH-BIZ-01 (also FLOW-V1-01..12 and TC-FARECONFIRM-BIZ-01))
- [BUG-19](BUG-19_Book_ParentPaxRefId.md) — **High** — [Book] Book Accepts an Infant Without a Valid ParentPaxRefId and Issues a Ticket (TC-BOOK-NEG-01)
- [BUG-20](BUG-20_Book_contactRefId.md) — **Medium** — [Book] Book Accepts a contactRefId That Is Not in contactsList and Issues a Ticket (TC-BOOK-NEG-02)

## Known bugs seen again (no new report; the existing report is the reference)

- **BUG-06** (Retrieve shows OnHold / no cancelled signal after CancelAfterHold) — 2 test case(s): FLOW-V1-06, FLOW-V1-12; occurrence 8 (8th confirmed). Report: `../20261022-093839_SabreNdc-Void-EGY-V1V2/BUG-06_Retrieve_bookingStatus.md`
- **BUG-14** (Search offers carry no taxesAndFees) — 13 test case(s): FLOW-V1-01, FLOW-V1-02, FLOW-V1-03, FLOW-V1-04, FLOW-V1-05, FLOW-V1-06, FLOW-V1-07, FLOW-V1-08, FLOW-V1-09, FLOW-V1-10, FLOW-V1-11, FLOW-V1-12, TC-SEARCH-BIZ-01; occurrence 3 (3rd confirmed). Report: `../20261025-092205_SabreNdc-EGY-Generic/BUG-14_Search_taxesAndFees.md`
