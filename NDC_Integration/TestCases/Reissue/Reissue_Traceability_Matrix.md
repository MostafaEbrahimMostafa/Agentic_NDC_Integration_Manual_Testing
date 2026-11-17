# Re-Issue Test Suite - Traceability Matrix

Generated 2026-11-17 from `Resources/Re-Issue_Feature/Re-Issue_User_Story.md` and `NDC_Integration/Artifacts/UserStoryAnalysis/Re-Issue_Analysis.md` (answers of 2026-11-17). All cases are **Not Run**.

## 1. Summary

| | Count |
|---|---|
| Total cases | 158 |
| Endpoint cases / Flow cases | 134 / 24 |
| P0 / P1 / P2 / P3 | 52 / 63 / 42 / 1 |
| Gate G0 (runnable now) | 5 |
| Gate G1 (needs contract) | 120 |
| Gate G2 (needs contract + undecided rule: record, don't judge) | 21 |
| Gate G3 (BLOCKED on staging capability) | 12 |

Techniques (a case can carry more than one): EP 68, BVA 18, DT 24, ST 27, PW 17, EG 17. EP = Equivalence Partitioning, BVA = Boundary Value Analysis, DT = Decision Table, ST = State Transition, PW = Pairwise, EG = Error Guessing.

### Files (`NDC_Integration/TestCases/Reissue/`)

| File | Cases |
|---|---|
| 01_Preconditions_CapCheck.csv | 4 |
| 02_ReissueSearch_ChangeCriteria.csv | 33 |
| 03_ReissueReview.csv | 9 |
| 04_ReissueCommit.csv | 17 |
| 05_PerTicket_Split_Repeat.csv | 14 |
| 06_Eligibility_DecisionTable.csv | 13 |
| 07_Pricing_Penalties_Fees.csv | 13 |
| 08_Lookup_Lifecycle_Void.csv | 10 |
| 09_Security.csv | 10 |
| 10_NonFunctional.csv | 6 |
| 11_Regression.csv | 5 |
| 12_E2E_StateTransition_Pairwise.csv | 24 |
| Reissue_TestCases_All.csv | 158 (all of the above, one file for bulk import) |

### Conventions
- **Endpoints:** RI-Search / RI-Review / RI-Commit / RI-Lookup = the four V2 Reissue endpoints (Reissue Search, Validation/Review, Reissue, Reissue Lookup); paths and field names TBD until the contract is shared (Analysis Q1).
- **Supplier:** <RI_SUPPLIER>/<RI_SELECTOR> (default OmanAirV17; selector and ne-N host TBD, Analysis open Q #1). Routes from `Resources/Supplier Routes.md`: MCT-DXB, AMD-CAI, AUH-ADL. `<DEST2>` = a second Oman Air destination from MCT confirmed by a plain V2 Search on the same host.
- **Dates:** D = execution date. Default original departure D+21.
- **Errors:** existing model (Q20): 400 validation, 409 business/supplier conflict, 401 auth. Reissue-specific ErrorCodes are TBD: record them.
- **Priority:** P0 blocker/critical, P1 high, P2 medium, P3 low. The house High/Medium/Low scale was replaced by P0-P3 as requested for this suite.
- **Notes column** starts with `Type | Technique | Gate`.
- **Cleanup:** void every ticket the reissue flow creates the same day (Q22b).

## 2. Acceptance Criteria -> test cases

| AC | Criterion | Cases | # | Note |
|---|---|---|---|---|
| AC-01 | Kick-off meeting with CORE before implementation | - | 0 | Process gate, not testable through the API. Evidence: meeting minutes. |
| AC-02 | Reissue by Date, Destination, Booking Class, Trip Type | TC-RI-SEARCH-POS-01, TC-RI-SEARCH-POS-02, TC-RI-SEARCH-POS-03, TC-RI-SEARCH-POS-04, TC-RI-SEARCH-POS-05, TC-RI-SEARCH-POS-06, TC-RI-SEARCH-POS-07, TC-RI-SEARCH-POS-08, TC-RI-SEARCH-POS-09, TC-RI-SEARCH-POS-10, TC-RI-SEARCH-POS-11, TC-RI-SEARCH-POS-12, TC-RI-SEARCH-NEG-01, TC-RI-SEARCH-NEG-02, TC-RI-SEARCH-NEG-06, TC-RI-SEARCH-BND-03, TC-RI-SEARCH-BND-04, TC-RI-SEARCH-BND-05, TC-RI-PRICING-BIZ-06, TC-RI-PRICING-BIZ-08, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16 | 36 | Trip Type tested as a negative (Q8, conflict 2). |
| AC-03 | Per-ticket reissue, passenger split, multiple reissues | TC-RI-SEARCH-NEG-12, TC-RI-REVIEW-POS-02, TC-RI-SPLIT-POS-01, TC-RI-SPLIT-POS-02, TC-RI-SPLIT-POS-03, TC-RI-SPLIT-POS-04, TC-RI-SPLIT-NEG-01, TC-RI-SPLIT-NEG-02, TC-RI-SPLIT-BND-01, TC-RI-REPEAT-POS-06, TC-RI-REPEAT-BND-02, TC-RI-REPEAT-NEG-05, FLOW-V2-RI-03, FLOW-V2-RI-04, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16 | 30 | Repeat-reissue condition undecided (G2). |
| AC-04 | Split creates a new PNR; linking handled | TC-RI-SPLIT-POS-01, TC-RI-SPLIT-POS-02, TC-RI-SPLIT-POS-03, TC-RI-SPLIT-NEG-04, TC-RI-SPLIT-INT-01, FLOW-V2-RI-03 | 6 | Link fields undecided (G2). |
| AC-05 | Search, Validation/Review, Reissue end to end | TC-RI-CAP-01, TC-RI-SEARCH-POS-01, TC-RI-SEARCH-POS-02, TC-RI-SEARCH-POS-03, TC-RI-SEARCH-POS-04, TC-RI-SEARCH-POS-05, TC-RI-SEARCH-POS-06, TC-RI-SEARCH-POS-07, TC-RI-SEARCH-POS-08, TC-RI-SEARCH-POS-09, TC-RI-SEARCH-POS-10, TC-RI-SEARCH-POS-11, TC-RI-SEARCH-POS-12, TC-RI-SEARCH-VAL-02, TC-RI-SEARCH-VAL-03, TC-RI-REVIEW-POS-01, TC-RI-REVIEW-VAL-01, TC-RI-COMMIT-POS-01, TC-RI-COMMIT-NEG-01, TC-RI-DT-BIZ-01, TC-RI-DT-BIZ-02, TC-RI-DT-BIZ-03, TC-RI-DT-BIZ-04, TC-RI-DT-BIZ-05, TC-RI-DT-BIZ-06, TC-RI-DT-BIZ-07, TC-RI-DT-BIZ-08, TC-RI-DT-BIZ-09, TC-RI-DT-BIZ-10, TC-RI-DT-BIZ-11, TC-RI-DT-BIZ-12, TC-RI-DT-BIZ-13, TC-RI-PRICING-BIZ-11, TC-RI-NFR-03, FLOW-V2-RI-01, FLOW-V2-RI-01-NEGHOP1, FLOW-V2-RI-01-NEGHOP2, FLOW-V2-RI-01-NEGHOP3 | 38 |  |
| AC-06 | Supplier reissue penalties returned | TC-RI-REVIEW-POS-01, TC-RI-PRICING-BIZ-01, TC-RI-PRICING-BIZ-02, TC-RI-PRICING-BIZ-05 | 4 | rulesAndPenalties text format (Q15). |
| AC-07 | Reissue Action and Reissue Lookup | TC-RI-CAP-01, TC-RI-LOOKUP-POS-01, TC-RI-LOOKUP-POS-02, TC-RI-LOOKUP-NEG-01, TC-RI-LOOKUP-VAL-01, TC-RI-SEC-04, TC-RI-NFR-03, FLOW-V2-RI-01 | 8 | Integration layer only (Q4). |
| AC-08 | Booked PNR -> Reissue -> Reissue PNR lifecycle | TC-RI-CAP-03, TC-RI-COMMIT-POS-01, TC-RI-SPLIT-POS-05, TC-RI-DT-BIZ-01, TC-RI-DT-BIZ-02, TC-RI-DT-BIZ-03, TC-RI-DT-BIZ-04, TC-RI-DT-BIZ-05, TC-RI-DT-BIZ-06, TC-RI-DT-BIZ-07, TC-RI-DT-BIZ-08, TC-RI-DT-BIZ-09, TC-RI-DT-BIZ-10, TC-RI-DT-BIZ-11, TC-RI-DT-BIZ-12, TC-RI-DT-BIZ-13, TC-RI-RETRIEVE-INT-01, TC-RI-RETRIEVE-INT-02, TC-RI-VOID-NEG-02, TC-RI-NFR-06, TC-RI-REG-01, TC-RI-REG-02, TC-RI-REG-03, TC-RI-REG-04, TC-RI-REG-05, FLOW-V2-RI-01, FLOW-V2-RI-02, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16 | 43 | Reissue PNR bookingStatus undecided (G2). |
| AC-09 | Change fee calculated in the reissue | TC-RI-REVIEW-POS-01, TC-RI-REVIEW-POS-02, TC-RI-COMMIT-POS-02, TC-RI-DT-BIZ-01, TC-RI-DT-BIZ-02, TC-RI-DT-BIZ-03, TC-RI-DT-BIZ-04, TC-RI-DT-BIZ-05, TC-RI-DT-BIZ-06, TC-RI-DT-BIZ-07, TC-RI-DT-BIZ-08, TC-RI-DT-BIZ-09, TC-RI-DT-BIZ-10, TC-RI-DT-BIZ-11, TC-RI-DT-BIZ-12, TC-RI-DT-BIZ-13, TC-RI-PRICING-BIZ-03, TC-RI-PRICING-BIZ-04, TC-RI-PRICING-BIZ-05, TC-RI-PRICING-BIZ-06, TC-RI-PRICING-BIZ-07, TC-RI-PRICING-BIZ-08, TC-RI-PRICING-BIZ-11, TC-RI-PRICING-BIZ-12, TC-RI-PRICING-BIZ-13, FLOW-V2-RI-PW-01, FLOW-V2-RI-PW-02, FLOW-V2-RI-PW-03, FLOW-V2-RI-PW-04, FLOW-V2-RI-PW-05, FLOW-V2-RI-PW-06, FLOW-V2-RI-PW-07, FLOW-V2-RI-PW-08, FLOW-V2-RI-PW-09, FLOW-V2-RI-PW-10, FLOW-V2-RI-PW-11, FLOW-V2-RI-PW-12, FLOW-V2-RI-PW-13, FLOW-V2-RI-PW-14, FLOW-V2-RI-PW-15, FLOW-V2-RI-PW-16 | 41 | Supplier-provided (Q16). |
| AC-10 | Discount per the approved business rule | TC-RI-PRICING-BIZ-09, TC-RI-PRICING-BIZ-10 | 2 | Rule not approved: only "no discount" is testable; rule row BLOCKED. |

## 3. Analysis items -> coverage

| Item | Coverage |
|---|---|
| Resolved Q5 date (segment/whole) | TC-RI-SEARCH-POS-01..04, -12 |
| Q6 origin/destination | TC-RI-SEARCH-POS-05..07, PRICING-BIZ-08 |
| Q7 cabin + RBD up/down | TC-RI-SEARCH-POS-08..10, PRICING-BIZ-06/07 |
| Q8 trip-type change not supported | TC-RI-SEARCH-NEG-01..03, DT-BIZ-07 |
| Q9 combinations | TC-RI-SEARCH-POS-11, pairwise rows |
| Q11 new Reissue PNR always | TC-RI-COMMIT-POS-01, SPLIT-POS-05, RETRIEVE-INT-02 |
| Q12 infant moves with adult | TC-RI-SPLIT-POS-03/04, SPLIT-NEG-01 |
| Q13 ticketed booked only | DT-BIZ-01, -02, -09..13 |
| Q15 penalties in rulesAndPenalties | PRICING-BIZ-01/02 |
| Q16 supplier change fee | PRICING-BIZ-03/04/05 |
| Q17 discount not approved | PRICING-BIZ-09 (no discount), -10 (BLOCKED) |
| Q18 payment in request | COMMIT-VAL-01/02, DT-BIZ-03..05, SEC-08 |
| Q20 error model | all VAL/NEG rows, SEC-10, NFR-04/05 |
| Q21 auth + tenant scoping | SEC-01..06 |
| Q22a void after reissue | VOID-POS-01, VOID-BND-01, FLOW-V2-RI-05 |
| Open Q idempotency | COMMIT-NEG-06/07 |
| Open Q price change Review->Commit | COMMIT-NEG-05 (G3) |
| Open Q Review validity | REVIEW-BND-02, COMMIT-NEG-04 (G2) |
| Open Q split failure recovery | SPLIT-NEG-04 (G3) |
| Open Q itinerary equals original | SEARCH-NEG-04 (G2) |
| Open Q residual value | PRICING-BIZ-07, DT-BIZ-08 (G2) |
| Open Q cut-off before departure | SEARCH-BND-01/02 (G2) |
| Open Q response time | NFR-01 (G2) |

## 4. Decision table (eligibility x change x fare rule x amount x payment)

| Rule | C1 Booking | C2 Change | C3 Fare rule | C4 Amount due | C5 Payment | Expected | Case |
|---|---|---|---|---|---|---|---|
| R01 | Ticketed (Book) | Supported (date) | Changeable with penalty | > 0 | Valid | Reissue succeeds; total = fare diff + tax diff + change fee (+ penalty); collected once. | TC-RI-DT-BIZ-01 |
| R02 | Ticketed (BookAfterHold) | Supported (date) | Changeable with penalty | > 0 | Valid | Reissue succeeds (Family D origin is eligible, Q13). | TC-RI-DT-BIZ-02 |
| R03 | Ticketed | Supported (date) | Changeable, free | = 0 | Absent | Reissue succeeds with nothing charged, or 400 if form of payment is always mandatory. Record which. | TC-RI-DT-BIZ-03 |
| R04 | Ticketed | Supported (class up) | Changeable with penalty | > 0 | Absent | 400; no reissue. | TC-RI-DT-BIZ-04 |
| R05 | Ticketed | Supported (date) | Changeable with penalty | > 0 | Declined | 409 payment failure; original ticket valid. | TC-RI-DT-BIZ-05 |
| R06 | Ticketed | Supported (date) | Not changeable | n/a | Valid | Rejected at Search or Review; rulesAndPenalties shows exchange not permitted. | TC-RI-DT-BIZ-06 |
| R07 | Ticketed | Not supported (trip type) | Changeable | n/a | Valid | Rejected (Q8). | TC-RI-DT-BIZ-07 |
| R08 | Ticketed | Supported (class down, new fare lower) | Changeable | < 0 (residual) | Valid | Residual handling undecided (forfeit / refund / EMD): record the observed result. | TC-RI-DT-BIZ-08 |
| R09 | Held (not ticketed) | Supported | any | any | Valid | Rejected, booking not eligible (Q13). | TC-RI-DT-BIZ-09 |
| R10 | Voided | Supported | any | any | Valid | Rejected, booking not eligible (Q13). | TC-RI-DT-BIZ-10 |
| R11 | Cancelled (CancelHold) | Supported | any | any | Valid | Rejected, booking not eligible (Q13); Retrieve on it is already 409 NDC-INT-BYP-A0003 (SPEC §2.11). | TC-RI-DT-BIZ-11 |
| R12 | Partly flown (outbound used) | Supported (inbound date) | Changeable | any | Valid | Rejected, booking not eligible (Q13). | TC-RI-DT-BIZ-12 |
| R13 | Booked, tickets not yet issued (async) | Supported | any | any | Valid | Rejected as not ticketed, or accepted once tickets[] populates. Record which. | TC-RI-DT-BIZ-13 |

## 5. Pairwise table (Criterion 4 x Pax mix 4 x Trip type 2 x Scope 2)

Constraint: a split is only meaningful when two non-infant passengers exist, so "1 ADT" and "1 ADT + 1 INF" rows use Whole PNR. All other pairs are covered (checked by the generator; missing pairs after constraints: none).

| Case | Criterion | Pax | Trip | Scope |
|---|---|---|---|---|
| FLOW-V2-RI-PW-01 | Date | 1 ADT | One-way | Whole PNR |
| FLOW-V2-RI-PW-02 | Date | 1 ADT + 1 CHD | Round-trip | Whole PNR |
| FLOW-V2-RI-PW-03 | Date | 1 ADT + 1 INF | One-way | Whole PNR (constrained) |
| FLOW-V2-RI-PW-04 | Date | 2 ADT + 1 CHD + 1 INF | Round-trip | Single passenger (split) |
| FLOW-V2-RI-PW-05 | Origin/Destination | 1 ADT | Round-trip | Whole PNR (constrained) |
| FLOW-V2-RI-PW-06 | Origin/Destination | 1 ADT + 1 CHD | One-way | Single passenger (split) |
| FLOW-V2-RI-PW-07 | Origin/Destination | 1 ADT + 1 INF | Round-trip | Whole PNR |
| FLOW-V2-RI-PW-08 | Origin/Destination | 2 ADT + 1 CHD + 1 INF | One-way | Whole PNR |
| FLOW-V2-RI-PW-09 | Class upgrade (Eco->Bus) | 1 ADT | One-way | Whole PNR |
| FLOW-V2-RI-PW-10 | Class upgrade (Eco->Bus) | 1 ADT + 1 CHD | Round-trip | Whole PNR |
| FLOW-V2-RI-PW-11 | Class upgrade (Eco->Bus) | 1 ADT + 1 INF | One-way | Whole PNR (constrained) |
| FLOW-V2-RI-PW-12 | Class upgrade (Eco->Bus) | 2 ADT + 1 CHD + 1 INF | Round-trip | Single passenger (split) |
| FLOW-V2-RI-PW-13 | Class downgrade (Bus->Eco) | 1 ADT | Round-trip | Whole PNR (constrained) |
| FLOW-V2-RI-PW-14 | Class downgrade (Bus->Eco) | 1 ADT + 1 CHD | One-way | Single passenger (split) |
| FLOW-V2-RI-PW-15 | Class downgrade (Bus->Eco) | 1 ADT + 1 INF | Round-trip | Whole PNR |
| FLOW-V2-RI-PW-16 | Class downgrade (Bus->Eco) | 2 ADT + 1 CHD + 1 INF | One-way | Whole PNR |

## 6. State transitions

States: Held, Booked (ticketed), Reviewed, Reissued (Reissue PNR), Exchanged (original), Voided, Cancelled.

| ID | Transition | Valid? | Expected | Case |
|---|---|---|---|---|
| ST-01 | Booked(ticketed) -> RI-Search | Valid | Options returned; state unchanged. | TC-RI-SEARCH-POS-01 |
| ST-02 | Booked(ticketed) -> Reviewed -> Reissued | Valid | New Reissue PNR; original exchanged. | TC-RI-COMMIT-POS-01 |
| ST-03 | Reissued -> Voided (same day) | Valid | Void 200. | TC-RI-VOID-POS-01 |
| ST-04 | Reissued -> Reissued again | Valid | Second reissue 200. | TC-RI-REPEAT-POS-06 |
| ST-05 | Held -> Reissue | Invalid | Rejected. | TC-RI-DT-BIZ-09 |
| ST-06 | Voided -> Reissue | Invalid | Rejected. | TC-RI-DT-BIZ-10 |
| ST-07 | Cancelled -> Reissue | Invalid | Rejected. | TC-RI-DT-BIZ-11 |
| ST-08 | Exchanged original -> Void | Invalid | Rejected. | TC-RI-VOID-NEG-01 |
| ST-09 | Exchanged original -> Reissue | Invalid | Rejected. | TC-RI-REPEAT-NEG-05 |
| ST-10 | Reissued -> CancelAfterHold | Invalid | Rejected. | TC-RI-VOID-NEG-02 |
| ST-11 | Reviewed -> Original voided -> Commit | Invalid | Rejected. | TC-RI-COMMIT-NEG-08 |
| ST-12 | Booked -> Commit without Review | Invalid | Rejected. | TC-RI-COMMIT-NEG-01 |

## 7. Requested but not traceable to the story or analysis

Not turned into pass/fail cases, so no expected values are invented:
- **Involuntary reissue** (schedule change by the airline): the story covers agent-initiated reissue only. A requirement is needed first.
- **OrderReshop / OrderQuote / OrderChange:** these are the supplier-side NDC messages behind the Integration layer. QA tests the Integration-layer JSON endpoints (Q4), and those messages are not observable. Rough mapping: RI-Search ~ OrderReshop, RI-Review ~ OrderReshop reprice / OrderQuote, RI-Commit ~ OrderChange.
- **Expired ticket (validity > 1 year):** cannot be produced on staging, and the story sets no rule. Covered indirectly by the eligibility rows.
- **EMD issuance for residual value:** residual handling is undecided. PRICING-BIZ-07 and DT-BIZ-08 record what happens.
- **Latency thresholds:** none agreed. NFR-01 records a baseline only.
- **AC-01 kick-off:** a process gate. Evidence is the meeting minutes, not a test.
