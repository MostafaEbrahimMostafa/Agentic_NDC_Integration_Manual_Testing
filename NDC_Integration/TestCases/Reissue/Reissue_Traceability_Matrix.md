# Re-Issue Test Suite - Traceability Matrix

Generated 2026-11-17 from `Resources/Re-Issue_Feature/Re-Issue_User_Story.md` and `NDC_Integration/Artifacts/UserStoryAnalysis/Re-Issue_Analysis.md`. **Re-aligned 2026-11-22** with the shared contract: `Postman_Collection/Re-Issue/NDC Integrations Re-Issue.postman_collection.json`, folder `5. Reissue`. All cases are **Not Run**. Every number below is computed from `Reissue_TestCases_All.csv`.

## 1. Summary

| | Count |
|---|---|
| Total cases | 175 (158 kept, 17 added on 2026-11-22) |
| Endpoint cases / Flow cases | 150 / 25 |
| P0 / P1 / P2 / P3 | 57 / 73 / 44 / 1 |
| Gate G0 (runnable now: existing endpoints or the shared Reissue endpoints) | 123 |
| Gate G2 (runnable, but the rule is undecided or sources conflict: record, don't judge) | 19 |
| Gate G3 (BLOCKED on staging capability or supplier-only scope) | 9 |
| Gate G4 (BLOCKED until a feature exists: passenger split / split flag, Eligibility returning false) | 14 |
| Gate OOS (BLOCKED, out of QA scope: payment, Reissue Lookup; Status = Blocked) | 10 |
| Gate G1 (needs contract) | retired: the contract is now shared |

### Files (`NDC_Integration/TestCases/Reissue/`)

| File | Cases |
|---|---|
| 01_Preconditions_CapCheck.csv | 4 |
| 02_ReissueSearch_ChangeCriteria.csv | 34 |
| 03_ReissueReview.csv | 11 |
| 04_ReissueCommit.csv | 20 |
| 05_PerTicket_Split_Repeat.csv | 15 |
| 06_Eligibility_DecisionTable.csv | 13 |
| 07_Pricing_Penalties_Fees.csv | 14 |
| 08_Lookup_Lifecycle_Void.csv | 10 |
| 09_Security.csv | 11 |
| 10_NonFunctional.csv | 6 |
| 11_Regression.csv | 5 |
| 12_E2E_StateTransition_Pairwise.csv | 25 |
| 13_Eligibility_Endpoint.csv | 7 |
| Reissue_TestCases_All.csv | 175 (all of the above, one file for bulk import) |

## 2. Contract under test (from the collection)

| Step | Request | Body | Response fields the collection relies on |
|---|---|---|---|
| 1 | POST `api/v2/Reissue/Eligibility` | supplier, credentialsSelector, pnr, gdsPNR, bookingToken | `isChangeable` (boolean) |
| 2 | POST `api/v2/Reissue/Reshop` | booking keys + `searchCriteria[{origin, destination, date}]` + `passengers[{passengerTypeCode, count}]` (same types/counts as the booking) | `responseId`, `offers[].offerId`, `offers[].isRepriceRequired` (always true) |
| 3 | POST `api/v2/Reissue/Reprice` | supplier, credentialsSelector, responseId, selectedOfferId | new `responseId`, `selectedOffer.offerId`, `selectedOffer.priceDetails`. No supplier call for OmanAirV17. |
| 4 | POST `api/v2/Reissue/Exchange` | supplier, credentialsSelector, responseId, selectedOfferId (repriced ids only; single use) | `pnr`, `selectedOffer`, `tickets` (object: ticketNumber, ticketStatus) |
| 5 | POST `api/v2/FlightBooking/Retrieve` | booking keys + surName | `pnr`, `bookingStatus`, `tickets` |

Headers: `x-api-key`, `Client-Id`. Environment: stg-ne-2, OmanAirV17, EGY. **Oracle: SPEC.md §2.16** (added 2026-11-22). Reissue suppliers today: OmanAirV17, AegeanV21, Ajet (LCC); run the suite once per supplier with its own routes.

Owner rules (2026-11-22): Eligibility always returns `isChangeable = true` today; Reshop passengers list every passenger of the booking with the same types and counts; no passenger split (flag later; a split would create a new PNR); Exchange keeps the same PNR; payment and Reissue Lookup are out of QA scope. Expectations taken only from the collection (scripts and descriptions) are labelled **INFERRED** in the rows: ask the user before filing a defect against them (CLAUDE.md rule 1).

### Old placeholder -> real endpoint

| Placeholder (2026-11-17) | Real | Note |
|---|---|---|
| - | Eligibility | New pre-check; 7 cases added (13_Eligibility_Endpoint.csv). |
| RI-Search | Reshop | No ticket/passenger selection, no cabin/RBD field, no trip-type field. |
| RI-Review | Reprice | Mandatory before Exchange; returns new ids. |
| RI-Commit | Exchange | No payment field (payment out of QA scope). Keeps the same PNR. |
| RI-Lookup | none | Out of QA scope; V2 Retrieve is used after Exchange. |

## 3. What changed on 2026-11-22

- **Retargeted** every row to the real endpoint names and fields; old placeholder text removed.
- **G1 retired.** 123 rows are runnable now (G0).
- **G4 (waiting for a feature)** - 14 rows: TC-RI-SPLIT-POS-01, TC-RI-SPLIT-POS-02, TC-RI-SPLIT-POS-03, TC-RI-SPLIT-POS-04, TC-RI-SPLIT-POS-05, TC-RI-SPLIT-NEG-01, TC-RI-SPLIT-NEG-02, TC-RI-SPLIT-NEG-03, TC-RI-SPLIT-NEG-04, TC-RI-SPLIT-BND-01, TC-RI-SPLIT-INT-01, TC-RI-SPLIT-BIZ-01, FLOW-V2-RI-03, TC-RI-ELIG-BIZ-01.
- **OOS (out of QA scope, Status Blocked)** - 10 rows: TC-RI-COMMIT-NEG-12, TC-RI-COMMIT-VAL-01, TC-RI-COMMIT-VAL-02, TC-RI-REPEAT-NEG-05, TC-RI-DT-BIZ-05, TC-RI-LOOKUP-POS-01, TC-RI-LOOKUP-POS-02, TC-RI-LOOKUP-NEG-01, TC-RI-LOOKUP-VAL-01, TC-RI-SEC-04.
- **Owner decisions applied (2026-11-22):** same PNR after Exchange (COMMIT-POS-01, COMMIT-BIZ-01, RETRIEVE-INT-01/02, VOID-*, REPEAT-POS-06, pairwise rows); Eligibility always true (ELIG-NEG-01 now expects true and a Reshop rejection; ELIG-BIZ-01 G4; DT rows expect the rejection at Reshop/Exchange); passengers rule confirmed (SEARCH-NEG-12 no longer INFERRED); DT-BIZ-04 runnable without payment; TC-RI-SPLIT-BIZ-01 added for the future split flag.
- **Pairwise:** rows PW-04/06/12/14 moved from "Single passenger (split)" to "Whole PNR"; the three remaining factors stay fully pairwise (section 6).
- **Rewritten because the old wording was wrong for this contract:** TC-RI-CAP-01 (four real endpoints, no Lookup), SEARCH-POS-08..10 (class chosen by offer), SEARCH-NEG-04/05/06/12, REVIEW-POS-01, COMMIT-POS-01/02, COMMIT-NEG-01 (Reshop ids without Reprice), DT-BIZ-03/04/05 (no payment field), PRICING-BIZ-11, LOOKUP-*, SEC-04/05/08, NFR-03/06, REG-05, FLOW-V2-RI-01/02/NEGHOP1.
- **Fixed:** TC-RI-NFR-04 SpecReference (failed `validate-output.js`).
- **Added (17):** TC-RI-ELIG-POS-01, TC-RI-ELIG-POS-02, TC-RI-ELIG-NEG-01, TC-RI-ELIG-NEG-02, TC-RI-ELIG-VAL-01, TC-RI-ELIG-BIZ-01, TC-RI-ELIG-BIZ-02, TC-RI-SEARCH-VAL-04, TC-RI-REVIEW-POS-03, TC-RI-REVIEW-NEG-04, TC-RI-COMMIT-NEG-13, TC-RI-COMMIT-VAL-04, TC-RI-COMMIT-BIZ-01, TC-RI-PRICING-BIZ-14, TC-RI-SEC-11, FLOW-V2-RI-06, TC-RI-SPLIT-BIZ-01.

## 4. Acceptance Criteria -> test cases

| AC | Criterion | Cases | # | Note |
|---|---|---|---|---|
| AC-01 | Kick-off meeting with CORE before implementation | - | 0 | Process gate, not testable through the API. |
| AC-02 | Reissue by Date, Destination, Booking Class, Trip Type | TC-RI-SEARCH-POS-01, TC-RI-SEARCH-POS-02, TC-RI-SEARCH-POS-03, TC-RI-SEARCH-POS-04, TC-RI-SEARCH-POS-05, TC-RI-SEARCH-POS-06, TC-RI-SEARCH-POS-07, TC-RI-SEARCH-POS-08, TC-RI-SEARCH-POS-09, TC-RI-SEARCH-POS-10, TC-RI-SEARCH-POS-11, TC-RI-SEARCH-POS-12, TC-RI-SEARCH-NEG-01, TC-RI-SEARCH-NEG-02, TC-RI-SEARCH-NEG-06, TC-RI-SEARCH-BND-03, TC-RI-SEARCH-BND-04, TC-RI-SEARCH-BND-05, TC-RI-PRICING-BIZ-06, TC-RI-PRICING-BIZ-08, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16 | 36 | Class: chosen by picking a Reshop offer (no class field). Trip type: negative (Q8). |
| AC-03 | Per-ticket reissue, passenger split, multiple reissues | TC-RI-SEARCH-NEG-12, TC-RI-REVIEW-POS-02, TC-RI-COMMIT-VAL-04, TC-RI-SPLIT-POS-01, TC-RI-SPLIT-POS-02, TC-RI-SPLIT-POS-03, TC-RI-SPLIT-POS-04, TC-RI-SPLIT-NEG-01, TC-RI-SPLIT-NEG-02, TC-RI-SPLIT-BND-01, TC-RI-SPLIT-BIZ-01, TC-RI-REPEAT-POS-06, TC-RI-REPEAT-BND-02, TC-RI-REPEAT-NEG-05, FLOW-V2-RI-03, FLOW-V2-RI-04, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16 | 32 | No split on the current suppliers; a split-availability flag comes later. Split rows are G4. |
| AC-04 | Split creates a new PNR; linking handled | TC-RI-COMMIT-BIZ-01, TC-RI-SPLIT-POS-01, TC-RI-SPLIT-POS-02, TC-RI-SPLIT-POS-03, TC-RI-SPLIT-NEG-04, TC-RI-SPLIT-INT-01, TC-RI-SPLIT-BIZ-01, FLOW-V2-RI-03 | 8 | A future split creates a new PNR (G4). Without split the PNR stays the same. |
| AC-05 | Search, Validation/Review, Reissue end to end | TC-RI-CAP-01, TC-RI-SEARCH-POS-01, TC-RI-SEARCH-POS-02, TC-RI-SEARCH-POS-03, TC-RI-SEARCH-POS-04, TC-RI-SEARCH-POS-05, TC-RI-SEARCH-POS-06, TC-RI-SEARCH-POS-07, TC-RI-SEARCH-POS-08, TC-RI-SEARCH-POS-09, TC-RI-SEARCH-POS-10, TC-RI-SEARCH-POS-11, TC-RI-SEARCH-POS-12, TC-RI-SEARCH-VAL-02, TC-RI-SEARCH-VAL-03, TC-RI-SEARCH-VAL-04, TC-RI-REVIEW-POS-01, TC-RI-REVIEW-POS-03, TC-RI-REVIEW-VAL-01, TC-RI-REVIEW-NEG-04, TC-RI-COMMIT-POS-01, TC-RI-COMMIT-NEG-01, TC-RI-COMMIT-NEG-13, TC-RI-DT-BIZ-01, TC-RI-DT-BIZ-02, TC-RI-DT-BIZ-03, TC-RI-DT-BIZ-04, TC-RI-DT-BIZ-05, TC-RI-DT-BIZ-06, TC-RI-DT-BIZ-07, TC-RI-DT-BIZ-08, TC-RI-DT-BIZ-09, TC-RI-DT-BIZ-10, TC-RI-DT-BIZ-11, TC-RI-DT-BIZ-12, TC-RI-DT-BIZ-13, TC-RI-PRICING-BIZ-11, TC-RI-SEC-11, TC-RI-NFR-03, TC-RI-NFR-04, FLOW-V2-RI-01, FLOW-V2-RI-01-NEGHOP1, FLOW-V2-RI-01-NEGHOP2, FLOW-V2-RI-01-NEGHOP3, TC-RI-ELIG-POS-01, TC-RI-ELIG-NEG-02, TC-RI-ELIG-VAL-01, TC-RI-ELIG-BIZ-01, TC-RI-ELIG-BIZ-02 | 49 | Now Eligibility -> Reshop -> Reprice -> Exchange. |
| AC-06 | Supplier reissue penalties returned | TC-RI-REVIEW-POS-01, TC-RI-PRICING-BIZ-01, TC-RI-PRICING-BIZ-02, TC-RI-PRICING-BIZ-05 | 4 | rulesAndPenalties location still unknown (record). |
| AC-07 | Reissue Action and Reissue Lookup | TC-RI-CAP-01, TC-RI-LOOKUP-POS-01, TC-RI-LOOKUP-POS-02, TC-RI-LOOKUP-NEG-01, TC-RI-LOOKUP-VAL-01, TC-RI-SEC-04, TC-RI-NFR-03, FLOW-V2-RI-01 | 8 | Reissue Lookup is out of QA scope (OOS). Reissue Action is covered. |
| AC-08 | Booked PNR -> Reissue -> Reissue PNR lifecycle | TC-RI-CAP-03, TC-RI-COMMIT-POS-01, TC-RI-COMMIT-VAL-04, TC-RI-COMMIT-BIZ-01, TC-RI-SPLIT-POS-05, TC-RI-DT-BIZ-01, TC-RI-DT-BIZ-02, TC-RI-DT-BIZ-03, TC-RI-DT-BIZ-04, TC-RI-DT-BIZ-05, TC-RI-DT-BIZ-06, TC-RI-DT-BIZ-07, TC-RI-DT-BIZ-08, TC-RI-DT-BIZ-09, TC-RI-DT-BIZ-10, TC-RI-DT-BIZ-11, TC-RI-DT-BIZ-12, TC-RI-DT-BIZ-13, TC-RI-RETRIEVE-INT-01, TC-RI-RETRIEVE-INT-02, TC-RI-VOID-NEG-02, TC-RI-NFR-06, TC-RI-REG-01, TC-RI-REG-02, TC-RI-REG-03, TC-RI-REG-04, TC-RI-REG-05, FLOW-V2-RI-01, FLOW-V2-RI-02, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16, FLOW-V2-RI-06, TC-RI-ELIG-POS-01, TC-RI-ELIG-POS-02, TC-RI-ELIG-NEG-01 | 49 | Same PNR after Exchange (SPEC §2.16): TC-RI-COMMIT-BIZ-01 (G0). |
| AC-09 | Change fee calculated in the reissue | TC-RI-REVIEW-POS-01, TC-RI-REVIEW-POS-02, TC-RI-COMMIT-POS-02, TC-RI-DT-BIZ-01, TC-RI-DT-BIZ-02, TC-RI-DT-BIZ-03, TC-RI-DT-BIZ-04, TC-RI-DT-BIZ-05, TC-RI-DT-BIZ-06, TC-RI-DT-BIZ-07, TC-RI-DT-BIZ-08, TC-RI-DT-BIZ-09, TC-RI-DT-BIZ-10, TC-RI-DT-BIZ-11, TC-RI-DT-BIZ-12, TC-RI-DT-BIZ-13, TC-RI-PRICING-BIZ-03, TC-RI-PRICING-BIZ-04, TC-RI-PRICING-BIZ-05, TC-RI-PRICING-BIZ-06, TC-RI-PRICING-BIZ-07, TC-RI-PRICING-BIZ-08, TC-RI-PRICING-BIZ-11, TC-RI-PRICING-BIZ-12, TC-RI-PRICING-BIZ-13, TC-RI-PRICING-BIZ-14, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16, FLOW-V2-RI-06 | 43 | Supplier-provided (Q16). |
| AC-10 | Discount per the approved business rule | TC-RI-PRICING-BIZ-09, TC-RI-PRICING-BIZ-10 | 2 | Rule not approved: only 'no discount' is testable. |

## 5. Decision table (eligibility x change x fare rule x amount)

The C5 "form of payment" condition was removed: Exchange has no payment field.

| Rule | C1 Booking | C2 Change | C3 Fare rule | C4 Amount due | Expected | Case | Gate |
|---|---|---|---|---|---|---|---|
| R01 | Ticketed (Book) | Date | Changeable with penalty | > 0 | isChangeable true; reissue succeeds; total = fare diff + tax diff + change fee (+ penalty). | TC-RI-DT-BIZ-01 | G0 |
| R02 | Ticketed (BookAfterHold) | Date | Changeable with penalty | > 0 | As R01 (Q13). | TC-RI-DT-BIZ-02 | G0 |
| R03 | Ticketed | Date | Changeable, free | = 0 | Reissue succeeds, nothing due. | TC-RI-DT-BIZ-03 | G2 |
| R04 | Ticketed | Class up | Changeable with penalty | > 0 | Reprice total > 0 incl. fare diff + change fee; Exchange 200 on the same pnr. | TC-RI-DT-BIZ-04 | G0 |
| R05 | Ticketed | Date | Changeable with penalty | > 0, payment declined | Payment is out of QA scope. | TC-RI-DT-BIZ-05 | OOS |
| R06 | Ticketed | Date | Not changeable | n/a | isChangeable false; Reshop rejected. | TC-RI-DT-BIZ-06 | G0 |
| R07 | Ticketed | Trip type | Changeable | n/a | Rejected (Q8). | TC-RI-DT-BIZ-07 | G0 |
| R08 | Ticketed | Class down | Changeable | < 0 (residual) | Record residual handling. | TC-RI-DT-BIZ-08 | G2 |
| R09 | Held | any | any | any | isChangeable false / rejected (Q13). | TC-RI-DT-BIZ-09 | G0 |
| R10 | Voided | any | any | any | isChangeable false / rejected (Q13). | TC-RI-DT-BIZ-10 | G0 |
| R11 | Cancelled (CancelAfterHold) | any | any | any | isChangeable false / rejected (Q13). | TC-RI-DT-BIZ-11 | G0 |
| R12 | Partly flown | Inbound date | Changeable | any | Rejected (Q13); needs flown coupons. | TC-RI-DT-BIZ-12 | G3 |
| R13 | Booked, tickets not yet issued | any | any | any | Record. | TC-RI-DT-BIZ-13 | G2 |

## 6. Pairwise table (Criterion 4 x Pax mix 4 x Trip type 2, all Whole PNR)

The Scope factor (whole vs split) was dropped because the contract cannot express a split. The 16 rows still cover every Criterion x Pax, Criterion x Trip and Pax x Trip pair.

| Case | Criterion | Pax | Trip |
|---|---|---|---|
| FLOW-V2-RI-PW-01 | Date | 1 ADT | One-way |
| FLOW-V2-RI-PW-02 | Date | 1 ADT + 1 CHD | Round-trip |
| FLOW-V2-RI-PW-03 | Date | 1 ADT + 1 INF | One-way |
| FLOW-V2-RI-PW-04 | Date | 2 ADT + 1 CHD + 1 INF | Round-trip |
| FLOW-V2-RI-PW-05 | Origin/Destination | 1 ADT | Round-trip |
| FLOW-V2-RI-PW-06 | Origin/Destination | 1 ADT + 1 CHD | One-way |
| FLOW-V2-RI-PW-07 | Origin/Destination | 1 ADT + 1 INF | Round-trip |
| FLOW-V2-RI-PW-08 | Origin/Destination | 2 ADT + 1 CHD + 1 INF | One-way |
| FLOW-V2-RI-PW-09 | Class upgrade (Eco->Bus) | 1 ADT | One-way |
| FLOW-V2-RI-PW-10 | Class upgrade (Eco->Bus) | 1 ADT + 1 CHD | Round-trip |
| FLOW-V2-RI-PW-11 | Class upgrade (Eco->Bus) | 1 ADT + 1 INF | One-way |
| FLOW-V2-RI-PW-12 | Class upgrade (Eco->Bus) | 2 ADT + 1 CHD + 1 INF | Round-trip |
| FLOW-V2-RI-PW-13 | Class downgrade (Bus->Eco) | 1 ADT | Round-trip |
| FLOW-V2-RI-PW-14 | Class downgrade (Bus->Eco) | 1 ADT + 1 CHD | One-way |
| FLOW-V2-RI-PW-15 | Class downgrade (Bus->Eco) | 1 ADT + 1 INF | Round-trip |
| FLOW-V2-RI-PW-16 | Class downgrade (Bus->Eco) | 2 ADT + 1 CHD + 1 INF | One-way |

## 7. State transitions

| ID | Transition | Valid? | Expected | Case |
|---|---|---|---|---|
| ST-01 | Booked(ticketed) -> Eligibility | Valid | isChangeable true; state unchanged. | TC-RI-ELIG-POS-01 |
| ST-02 | Booked(ticketed) -> Reshop -> Reprice -> Exchange | Valid | New tickets on the same PNR (TC-RI-COMMIT-BIZ-01). | TC-RI-COMMIT-POS-01 |
| ST-03 | Reissued -> Voided (same day) | Valid | Void 200. | TC-RI-VOID-POS-01 |
| ST-04 | Reissued -> Reissued again | Valid | Second reissue 200. | TC-RI-REPEAT-POS-06 |
| ST-05 | Held / Voided / Cancelled -> Eligibility -> Reshop | Invalid | Eligibility true today; Reshop/Exchange reject. | TC-RI-ELIG-NEG-01, TC-RI-DT-BIZ-09..11 |
| ST-06 | isChangeable false -> Reshop | Invalid | Rejected (INFERRED). G4: false cannot be produced today. | TC-RI-ELIG-BIZ-01 |
| ST-07 | Reshop -> Exchange (Reprice skipped) | Invalid | Rejected (INFERRED). | TC-RI-COMMIT-NEG-01 |
| ST-08 | Exchange -> Exchange (same offer) | Invalid | Single use: no second ticket. | TC-RI-COMMIT-NEG-06 |
| ST-09 | Exchanged original ticket -> Void | Invalid | Rejected. | TC-RI-VOID-NEG-01 |
| ST-10 | Exchanged original -> Reissue | n/a | Not applicable with the same-PNR model (OOS). | TC-RI-REPEAT-NEG-05 |
| ST-11 | Reissued -> CancelAfterHold | Invalid | Rejected. | TC-RI-VOID-NEG-02 |
| ST-12 | Repriced -> original voided -> Exchange | Invalid | Rejected. | TC-RI-COMMIT-NEG-08 |

## 8. Decisions (feature owner, 2026-11-22)

| # | Question | Decision | Rows | Handling |
|---|---|---|---|---|
| D1 | Payment: Q18 vs no payment field in Exchange | Out of QA scope | COMMIT-VAL-01/02, COMMIT-NEG-12, DT-BIZ-05 | OOS (Blocked); DT-BIZ-04 runs without payment |
| D2 | Per-ticket reissue / passenger split | Not supported by current suppliers; a split-availability flag will be added later | SPLIT-*, FLOW-V2-RI-03, SPLIT-BIZ-01 | G4 |
| D3 | Reissue Lookup endpoint | Out of QA scope | LOOKUP-*, SEC-04 | OOS (Blocked) |
| D4 | New or same PNR after Exchange | Same PNR (no split); a future split creates a new PNR | COMMIT-POS-01, COMMIT-BIZ-01, RETRIEVE-INT-01/02, VOID-*, REPEAT-*, flows | G0; REPEAT-NEG-05 OOS (n/a) |
| D5 | SPEC.md still said Exchange = No Endpoint | Approved: SPEC §1.2, §1.4, §1.9, §2.16, §4.6 updated | whole suite | SpecReference now cites SPEC §2.16 |
| D6 | Eligibility logic | Always `isChangeable = true` today (LCC suppliers OmanAirV17, AegeanV21, Ajet) | ELIG-*, DT-BIZ-06/09..12 | Rejection expected at Reshop/Exchange; ELIG-BIZ-01 G4 |
| D7 | Reshop passengers | Every passenger of the booking, same types and counts | all Reshop rows, SEARCH-NEG-12 | Collection now builds passengers from adtCount/chdCount/infCount |

Still open (recorded in rows, not blocking): class change only by picking a Reshop offer (needs Reshop with unchanged criteria, SEARCH-NEG-04); round trip in Reshop ("one journey", SEARCH-POS-02..04).

## 9. Still not turned into pass/fail cases

- Involuntary reissue, ticket expiry, EMD for residual value, latency thresholds, AC-01 kick-off (unchanged from 2026-11-17).
- Ancillaries and seats on a reissued booking: recorded only (FLOW-V2-RI-06, G2).
