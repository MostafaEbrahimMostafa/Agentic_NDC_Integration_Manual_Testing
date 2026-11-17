# QA Execution Report — SabreNdc / EGY - TestCases_V1.csv (V1 flows and endpoint cases) - Round 2

**Environment:** staging (ndc-integration-stg-ne-3) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** SabreNdc  **Credentials Selector:** EGY
**Started:** 2026-10-25T18:48:56.265Z
**Ended:** 2026-10-25T19:32:27.110Z
**Status:** COMPLETE
**Execution Duration:** 43m 31s ([View Time Breakdown](20261025-190214_SabreNdc-EGY-V1-Round2_TimeBreakdown.html))
**Prior runs:** TestCases_V1.csv has not been run against SabreNdc/EGY before (first run); 20261025-092205_SabreNdc-EGY-Generic and 20261025-093421_SabreNdc-EGY-V2 (Round 1) are the baseline for shared behaviour (see NDC_Integration/Artifacts/Logs/)

## Scope note

All twelve executed V1 flows (FLOW-V1-01..12) are FAIL, and none fails on a new break in the chain: every hop returns 200, price totals reconcile, the same-PNR invariant holds, and Void / CancelAfterHold work. Each fails on the same tracked, documented V1 defects, the same convention as the 2026-08-05 TravelportNdc V1 run: Search carries no tax line items (BUG-14) and no paxTotalAmount (BUG-18), Retrieve has no bookingStatus (BUG-15), Upselling returns no selectedOffer on flows 7-12 (BUG-16), and Retrieve after CancelAfterHold shows no cancelled signal on flows 6 and 12 (BUG-06). The flow rows name TravelportNdc, Emirates, EgyptAir, AirCairo, AirArabia, SabreNdc and FlyNas as suppliers; this run substitutes SabreNdc/EGY for all of them and uses the collection-default passenger mix (2 ADT + 2 CHD + 2 INF), so six tickets (or six held passengers) are created per flow.

## Summary

- Test cases logged: 59 of 59 planned
- Passed: 17
- Failed: 15
- Blocked: 27
- Failed test cases: FLOW-V1-01, FLOW-V1-02, FLOW-V1-03, FLOW-V1-04, FLOW-V1-05, FLOW-V1-06, FLOW-V1-07, FLOW-V1-08, FLOW-V1-09, FLOW-V1-10, FLOW-V1-11, FLOW-V1-12, TC-BOOK-NEG-01, TC-BOOK-NEG-02, TC-SEARCH-BIZ-01
- Blocked test cases: FLOW-V1-02-NEG, FLOW-V1-04-NEG, FLOW-V1-05-NEG, FLOW-V1-06-NEG, FLOW-V1-10-NEG, FLOW-V1-11-NEG, FLOW-V1-13, FLOW-V1-13-NEG, FLOW-V1-14, FLOW-V1-14-NEG, FLOW-V1-15, FLOW-V1-16, FLOW-V1-16-NEG, FLOW-V1-17, FLOW-V1-17-NEG, FLOW-V1-18, FLOW-V1-19, FLOW-V1-19-NEG, FLOW-V1-20, FLOW-V1-21, FLOW-V1-22, FLOW-V1-22-NEG, FLOW-V1-23, FLOW-V1-23-NEG, FLOW-V1-24, TC-BOOK-BIZ-02, TC-BOOK-NEG-03

## Test case results

### FLOW-V1-01 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve] [Response] Verify FareConfirm-based Family-A flow #1 (SR-FC-BK-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 FareConfirm flow - Family A (Book &gt; Retrieve)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; FareConfirm &gt; Book &gt; Retrieve
- **Response:** Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (A):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (A):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (A):** PASS &mdash; 200 - pnr SKCONV gdsPNR SKCONV; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592712","1572141592709","1572141592711","1572141592710","1572141592713","1572141592714"]
  - **Hop 4 &mdash; V1 Retrieve (Retrieve):** PASS &mdash; 200 - pnr SKCONV
  - **Hop 5 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592712","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592709","carrierCode":"QR"},{"ticketStatus":

### FLOW-V1-01-NEG — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #1 (SR-FC-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - Book (FareConfirm path, stale-ID substitution)
- **Request:** Search #1 and #2 &gt; FareConfirm on #1 &gt; Book with #1's response id and Search #2's offerId; any booking made is voided
- **Response:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Status:** PASS
- **Evidence:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book:** PASS &mdash; 400

### FLOW-V1-02 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based Family-B flow #2 (SR-FC-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 FareConfirm flow - Family B (Hold &gt; PnrReprice &gt; Retrieve)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; FareConfirm &gt; Hold &gt; PnrReprice &gt; Retrieve
- **Response:** PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (B):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (B):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (B):** PASS &mdash; 200 - pnr RWCQHG gdsPNR RWCQHG; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr RWCQHG
  - **Hop 6 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}

### FLOW-V1-02-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #2 (SR-FC-HD-FCAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Response:** No request sent
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Blocked: it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Status:** BLOCKED
- **Evidence:** it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.

### FLOW-V1-03 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based Family-C flow #3 (SR-FC-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 FareConfirm flow - Family C (Book &gt; Retrieve &gt; Void)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; FareConfirm &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve
- **Response:** Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (C):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (C):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (C):** PASS &mdash; 200 - pnr RQBCKP gdsPNR RQBCKP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592718","1572141592715","1572141592717","1572141592716","1572141592719","1572141592720"]
  - **Hop 4 &mdash; V1 Retrieve (Retrieve):** PASS &mdash; 200 - pnr RQBCKP
  - **Hop 5 &mdash; V1 Void (Void):** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Retrieve (after-void):** PASS &mdash; 400

### FLOW-V1-03-NEG — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #3 (SR-FC-BK-RT-VD) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - Book (FareConfirm path, stale-ID substitution)
- **Request:** Search #1 and #2 &gt; FareConfirm on #1 &gt; Book with #1's response id and Search #2's offerId; any booking made is voided
- **Response:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Status:** PASS
- **Evidence:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book:** PASS &mdash; 400

### FLOW-V1-04 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based Family-D flow #4 (SR-FC-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 FareConfirm flow - Family D (Hold &gt; BookAfterHold)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; FareConfirm &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve
- **Response:** BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3).
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (D):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (D):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (D):** PASS &mdash; 200 - pnr SLYEIT gdsPNR SLYEIT; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr SLYEIT
  - **Hop 6 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr SLYEIT
  - **Hop 7 &mdash; V1 Retrieve (Retrieve-booked):** PASS &mdash; 200 - pnr SLYEIT
  - **Hop 8 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592728","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592725","carrierCode":"QR"},{"ticketStatus":

### FLOW-V1-04-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #4 (SR-FC-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Response:** No request sent
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Blocked: it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Status:** BLOCKED
- **Evidence:** it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.

### FLOW-V1-05 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based Family-E flow #5 (SR-FC-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 FareConfirm flow - Family E (Hold &gt; BookAfterHold &gt; Void)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; FareConfirm &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve
- **Response:** Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (E):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (E):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (E):** PASS &mdash; 200 - pnr SKZMIW gdsPNR SKZMIW; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr SKZMIW
  - **Hop 6 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr SKZMIW
  - **Hop 7 &mdash; V1 Retrieve (Retrieve-booked):** PASS &mdash; 200 - pnr SKZMIW
  - **Hop 8 &mdash; V1 Void (Void):** PASS &mdash; 200
  - **Hop 9 &mdash; V1 Retrieve (after-void):** PASS &mdash; 400

### FLOW-V1-05-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #5 (SR-FC-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Response:** No request sent
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Blocked: the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Status:** BLOCKED
- **Evidence:** the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.

### FLOW-V1-06 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify FareConfirm-based Family-F flow #6 (SR-FC-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 FareConfirm flow - Family F (Hold &gt; CancelAfterHold)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; FareConfirm &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; CancelAfterHold &gt; Retrieve
- **Response:** CancelAfterHold returns cancelled:true: ok | Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT): FAILED | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT); bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | CancelAfterHold returns cancelled:true: ok | Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT): FAILED | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | FareConfirm price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | CancelAfterHold returns cancelled:true: ok | Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT): FAILED | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (F):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (F):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (F):** PASS &mdash; 200 - pnr RNKPJX gdsPNR RNKPJX; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr RNKPJX
  - **Hop 6 &mdash; V1 CancelAfterHold (CAH):** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Retrieve (after-cancel):** FAIL &mdash; 200 - pnr RNKPJX

### FLOW-V1-06-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #6 (SR-FC-HD-FCAH-RT-CXL) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Response:** No request sent
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Blocked: it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Status:** BLOCKED
- **Evidence:** it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.

### FLOW-V1-07 — FAIL

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve] [Response] Verify Upselling-based Family-A flow #7 (SR-UP-BK-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 Upselling flow - Family A (Book &gt; Retrieve)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; Upselling (upsellOffers[0]) &gt; Book &gt; Retrieve
- **Response:** Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; Upselling returns selectedOffer (documented drop-in for FareConfirm); bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (A):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 Upselling (A):** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 61338.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Book (A):** PASS &mdash; 200 - pnr SIXXZF gdsPNR SIXXZF; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592749","1572141592746","1572141592748","1572141592747","1572141592750","1572141592751"]
  - **Hop 4 &mdash; V1 Retrieve (Retrieve):** PASS &mdash; 200 - pnr SIXXZF
  - **Hop 5 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592749","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592746","carrierCode":"QR"},{"ticketStatus":

### FLOW-V1-07-NEG — PASS

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #7 (SR-UP-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - Book (Upselling path, stale-ID substitution)
- **Request:** Search #1 and #2 &gt; Upselling on #1 &gt; Book with #1's response id and Search #2's offerId; any booking made is voided
- **Response:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Status:** PASS
- **Evidence:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Upselling:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book:** PASS &mdash; 400

### FLOW-V1-08 — FAIL

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based Family-B flow #8 (SR-UP-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 Upselling flow - Family B (Hold &gt; PnrReprice &gt; Retrieve)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; Upselling (upsellOffers[0]) &gt; Hold &gt; PnrReprice &gt; Retrieve
- **Response:** PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; Upselling returns selectedOffer (documented drop-in for FareConfirm); bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (B):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 Upselling (B):** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 61338.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Hold (B):** PASS &mdash; 200 - pnr SIUYHJ gdsPNR SIUYHJ; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr SIUYHJ
  - **Hop 6 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}

### FLOW-V1-08-NEG — PASS

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #8 (SR-UP-HD-FCAH-RT) correctly rejects the V1 Upselling requestUrl/baseUrl collection defect not being fixed before execution.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 Upselling (requestUrl collection defect)
- **Request:** Search, then Upselling exactly as saved in the V1 collection (requestUrl unset), then Upselling with requestUrl = baseUrl
- **Response:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Expected:** Because requestUrl is an empty, unset collection variable in the shipped STAG_ENV (SPEC section 1.4/2.3), the request resolves to a malformed URL with an empty host. Expected result is a connection/DNS/malformed-URL-class failure at the HTTP layer, distinct from any API-level 4xx -- confirm the exact client-side error live and record it; this is a real, evidenced collection defect, not a guessed negative path.
- **Actual:** Defect confirmed: the shipped request fails at the HTTP client with no API response. Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Status:** PASS
- **Evidence:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Upselling (requestUrl):** PASS &mdash; 0
  - **Hop 3 &mdash; V1 Upselling (fixed):** PASS &mdash; 200

### FLOW-V1-09 — FAIL

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based Family-C flow #9 (SR-UP-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 Upselling flow - Family C (Book &gt; Retrieve &gt; Void)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; Upselling (upsellOffers[0]) &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve
- **Response:** Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; Upselling returns selectedOffer (documented drop-in for FareConfirm); bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=FullVoidOnlyAllowed | Book price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve: state booked (tickets present), same as Book true, 6 passengers, price OK: all checks hold; total 61338.8 EGP | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (C):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 Upselling (C):** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 61338.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Book (C):** PASS &mdash; 200 - pnr RNBJRR gdsPNR RNBJRR; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592757","1572141592754","1572141592756","1572141592755","1572141592758","1572141592759"]
  - **Hop 4 &mdash; V1 Retrieve (Retrieve):** PASS &mdash; 200 - pnr RNBJRR
  - **Hop 5 &mdash; V1 Void (Void):** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Retrieve (after-void):** PASS &mdash; 400

### FLOW-V1-09-NEG — PASS

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #9 (SR-UP-BK-RT-VD) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - Book (Upselling path, stale-ID substitution)
- **Request:** Search #1 and #2 &gt; Upselling on #1 &gt; Book with #1's response id and Search #2's offerId; any booking made is voided
- **Response:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res
- **Status:** PASS
- **Evidence:** rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied res

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Upselling:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book:** PASS &mdash; 400

### FLOW-V1-10 — FAIL

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based Family-D flow #10 (SR-UP-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 Upselling flow - Family D (Hold &gt; BookAfterHold)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; Upselling (upsellOffers[0]) &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve
- **Response:** BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3).
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; Upselling returns selectedOffer (documented drop-in for FareConfirm); bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (D):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 Upselling (D):** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 61338.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Hold (D):** PASS &mdash; 200 - pnr RRPRSN gdsPNR RRPRSN; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr RRPRSN
  - **Hop 6 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr RRPRSN
  - **Hop 7 &mdash; V1 Retrieve (Retrieve-booked):** PASS &mdash; 200 - pnr RRPRSN
  - **Hop 8 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592763","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592760","carrierCode":"QR"},{"ticketStatus":

### FLOW-V1-10-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #10 (SR-UP-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Response:** No request sent
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Blocked: it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Status:** BLOCKED
- **Evidence:** it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.

### FLOW-V1-11 — FAIL

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based Family-E flow #11 (SR-UP-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 Upselling flow - Family E (Hold &gt; BookAfterHold &gt; Void)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; Upselling (upsellOffers[0]) &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve
- **Response:** Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; Upselling returns selectedOffer (documented drop-in for FareConfirm); bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | BookAfterHold keeps pnr/bookingToken/gdsPNR (same-PNR invariant): ok | BookAfterHold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | Retrieve after BookAfterHold shows booked (6 tickets): ok | Void: ok | follow-up Retrieve shows voided/cancelled: ok | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (E):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 Upselling (E):** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 61338.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Hold (E):** PASS &mdash; 200 - pnr RSLPSB gdsPNR RSLPSB; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr RSLPSB
  - **Hop 6 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr RSLPSB
  - **Hop 7 &mdash; V1 Retrieve (Retrieve-booked):** PASS &mdash; 200 - pnr RSLPSB
  - **Hop 8 &mdash; V1 Void (Void):** PASS &mdash; 200
  - **Hop 9 &mdash; V1 Retrieve (after-void):** PASS &mdash; 400

### FLOW-V1-11-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #11 (SR-UP-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Response:** No request sent
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Blocked: the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Status:** BLOCKED
- **Evidence:** the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.

### FLOW-V1-12 — FAIL

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify Upselling-based Family-F flow #12 (SR-UP-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 Upselling flow - Family F (Hold &gt; CancelAfterHold)
- **Request:** Search CAI-JED 2026-11-24 2 ADT + 2 CHD + 2 INF &gt; Upselling (upsellOffers[0]) &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; CancelAfterHold &gt; Retrieve
- **Response:** CancelAfterHold returns cancelled:true: ok | Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT): FAILED | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline.
- **Actual:** Failed checks: Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold); paxTotalAmount present on every Search passengerFareBreakdown entry; Upselling returns selectedOffer (documented drop-in for FareConfirm); Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT); bookingStatus absent on V1 Retrieve (the flow row asserts it). Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | CancelAfterHold returns cancelled:true: ok | Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT): FAILED | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)
- **Status:** FAIL
- **Evidence:** Search price reconciliation incl. the tax-item sum (taxesAndFees missing on every passenger type, so rule 1 cannot hold): FAILED | paxTotalAmount present on every Search passengerFareBreakdown entry: FAILED | Upselling returns selectedOffer (documented drop-in for FareConfirm): FAILED | Upselling upsellOffers[0] price reconciliation: ok | capability flags: canBeHeld=true haveBundles=false; voidCapability=VoidNotAllowed | Hold price reconciliation (OK: all checks hold; total 61338.8 EGP): ok | PnrReprice price equals Hold price and reconciles: ok | Retrieve shows a held state (no tickets) with a future holdExpirationDate (2026-10-30T21:59:00): ok | CancelAfterHold returns cancelled:true: ok | Retrieve after CancelAfterHold shows a cancelled/terminated state (state: no tickets, no hold date; bookingStatus ABSENT): FAILED | bookingStatus on Retrieve: ABSENT (assertion named by the row cannot be made)

  - **Hop 1 &mdash; V1 Search (F):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 Upselling (F):** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 61338.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Hold (F):** PASS &mdash; 200 - pnr RURKYZ gdsPNR RURKYZ; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (Retrieve-held):** PASS &mdash; 200 - pnr RURKYZ
  - **Hop 6 &mdash; V1 CancelAfterHold (CAH):** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Retrieve (after-cancel):** FAIL &mdash; 200 - pnr RURKYZ

### FLOW-V1-12-NEG — PASS

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #12 (SR-UP-HD-FCAH-RT-CXL) correctly rejects the V1 Upselling requestUrl/baseUrl collection defect not being fixed before execution.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 Upselling (requestUrl collection defect)
- **Request:** Search, then Upselling exactly as saved in the V1 collection (requestUrl unset), then Upselling with requestUrl = baseUrl
- **Response:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Expected:** Because requestUrl is an empty, unset collection variable in the shipped STAG_ENV (SPEC section 1.4/2.3), the request resolves to a malformed URL with an empty host. Expected result is a connection/DNS/malformed-URL-class failure at the HTTP layer, distinct from any API-level 4xx -- confirm the exact client-side error live and record it; this is a real, evidenced collection defect, not a guessed negative path.
- **Actual:** Defect confirmed: the shipped request fails at the HTTP client with no API response. Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Status:** PASS
- **Evidence:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Upselling (requestUrl):** PASS &mdash; 0
  - **Hop 3 &mdash; V1 Upselling (fixed):** PASS &mdash; 200

### FLOW-V1-13 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Response] Verify FareConfirm-based, Bundle-enriched, Family-A flow #13 (SR-FC-BDL-BK-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-13-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #13 (SR-FC-BDL-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the positive chain up to the fault hop (Book) includes GetOfferBundles, which SabreNdc/EGY cannot execute (409 OperationNotSupported). The same fault on the supported chain is executed in FLOW-V1-01-NEG.
- **Response:** No request sent
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Blocked: the positive chain up to the fault hop (Book) includes GetOfferBundles, which SabreNdc/EGY cannot execute (409 OperationNotSupported). The same fault on the supported chain is executed in FLOW-V1-01-NEG.
- **Status:** BLOCKED
- **Evidence:** the positive chain up to the fault hop (Book) includes GetOfferBundles, which SabreNdc/EGY cannot execute (409 OperationNotSupported). The same fault on the supported chain is executed in FLOW-V1-01-NEG.

### FLOW-V1-14 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based, Bundle-enriched, Family-B flow #14 (SR-FC-BDL-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-14-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #14 (SR-FC-BDL-HD-FCAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Response:** No request sent
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Blocked: it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Status:** BLOCKED
- **Evidence:** it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.

### FLOW-V1-15 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based, Bundle-enriched, Family-C flow #15 (SR-FC-BDL-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-15-NEG — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #15 (SR-FC-BDL-BK-RT-VD) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - GetOfferBundles on haveBundles=false (FareConfirm path)
- **Request:** Search &gt; FareConfirm (haveBundles=false) &gt; GetOfferBundles
- **Response:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** haveBundles=false; GetOfferBundles -&gt; 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]. Rejected with the uniform OperationNotSupported envelope; it does not silently return bundle data.
- **Status:** PASS
- **Evidence:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 13233.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 13233.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Bundles:** PASS &mdash; 409

### FLOW-V1-16 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based, Bundle-enriched, Family-D flow #16 (SR-FC-BDL-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3). Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-16-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #16 (SR-FC-BDL-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Response:** No request sent
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Blocked: it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Status:** BLOCKED
- **Evidence:** it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.

### FLOW-V1-17 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based, Bundle-enriched, Family-E flow #17 (SR-FC-BDL-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-17-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #17 (SR-FC-BDL-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Response:** No request sent
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Blocked: the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Status:** BLOCKED
- **Evidence:** the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.

### FLOW-V1-18 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify FareConfirm-based, Bundle-enriched, Family-F flow #18 (SR-FC-BDL-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-18-NEG — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #18 (SR-FC-BDL-HD-FCAH-RT-CXL) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - GetOfferBundles on haveBundles=false (FareConfirm path)
- **Request:** Search &gt; FareConfirm (haveBundles=false) &gt; GetOfferBundles
- **Response:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** haveBundles=false; GetOfferBundles -&gt; 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]. Rejected with the uniform OperationNotSupported envelope; it does not silently return bundle data.
- **Status:** PASS
- **Evidence:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 13233.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 13233.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Bundles:** PASS &mdash; 409

### FLOW-V1-19 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Response] Verify Upselling-based, Bundle-enriched, Family-A flow #19 (SR-UP-BDL-BK-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-19-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #19 (SR-UP-BDL-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the positive chain up to the fault hop (Book) includes GetOfferBundles, which SabreNdc/EGY cannot execute (409 OperationNotSupported). The same fault on the supported chain is executed in FLOW-V1-07-NEG.
- **Response:** No request sent
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Blocked: the positive chain up to the fault hop (Book) includes GetOfferBundles, which SabreNdc/EGY cannot execute (409 OperationNotSupported). The same fault on the supported chain is executed in FLOW-V1-07-NEG.
- **Status:** BLOCKED
- **Evidence:** the positive chain up to the fault hop (Book) includes GetOfferBundles, which SabreNdc/EGY cannot execute (409 OperationNotSupported). The same fault on the supported chain is executed in FLOW-V1-07-NEG.

### FLOW-V1-20 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based, Bundle-enriched, Family-B flow #20 (SR-UP-BDL-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-20-NEG — PASS

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #20 (SR-UP-BDL-HD-FCAH-RT) correctly rejects the V1 Upselling requestUrl/baseUrl collection defect not being fixed before execution.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 Upselling (requestUrl collection defect)
- **Request:** Search, then Upselling exactly as saved in the V1 collection (requestUrl unset), then Upselling with requestUrl = baseUrl
- **Response:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Expected:** Because requestUrl is an empty, unset collection variable in the shipped STAG_ENV (SPEC section 1.4/2.3), the request resolves to a malformed URL with an empty host. Expected result is a connection/DNS/malformed-URL-class failure at the HTTP layer, distinct from any API-level 4xx -- confirm the exact client-side error live and record it; this is a real, evidenced collection defect, not a guessed negative path.
- **Actual:** Defect confirmed: the shipped request fails at the HTTP client with no API response. Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Status:** PASS
- **Evidence:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Upselling (requestUrl):** PASS &mdash; 0
  - **Hop 3 &mdash; V1 Upselling (fixed):** PASS &mdash; 200

### FLOW-V1-21 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based, Bundle-enriched, Family-C flow #21 (SR-UP-BDL-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-21-NEG — PASS

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #21 (SR-UP-BDL-BK-RT-VD) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - GetOfferBundles on haveBundles=false (Upselling path)
- **Request:** Search &gt; Upselling (haveBundles=false) &gt; GetOfferBundles
- **Response:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** haveBundles=false; GetOfferBundles -&gt; 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]. Rejected with the uniform OperationNotSupported envelope; it does not silently return bundle data.
- **Status:** PASS
- **Evidence:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 13233.8 EGP
  - **Hop 2 &mdash; V1 Upselling:** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 13233.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Bundles:** PASS &mdash; 409

### FLOW-V1-22 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based, Bundle-enriched, Family-D flow #22 (SR-UP-BDL-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3). Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-22-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #22 (SR-UP-BDL-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Response:** No request sent
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Blocked: it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.
- **Status:** BLOCKED
- **Evidence:** it is defined for supplier FlyNas (Hold Not Supported); this run is scoped to SabreNdc/EGY, where every offer is canBeHeld=true. Live check this run: V1 Search FlyNas/EGY -&gt; 200, 7 offers.

### FLOW-V1-23 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based, Bundle-enriched, Family-E flow #23 (SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-23-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #23 (SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Response:** No request sent
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Blocked: the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.
- **Status:** BLOCKED
- **Evidence:** the post-expiry state cannot be reached in a session: holds on SabreNdc/EGY expire about 5 days after creation (observed 2026-10-30 for holds made on 2026-10-25) and the window cannot be shortened.

### FLOW-V1-24 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify Upselling-based, Bundle-enriched, Family-F flow #24 (SR-UP-BDL-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow - Positive
- **Endpoint Name:** V1 flow
- **Request:** Not sent - the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Response:** No request sent
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).
- **Status:** BLOCKED
- **Evidence:** the flow needs Bundle enrichment (GetOfferBundles) and SabreNdc/EGY offers no bundles: haveBundles=false on every offer, and V1 GetOfferBundles answers 409 OperationNotSupported (re-confirmed this round; the same fault is executed in FLOW-V1-15-NEG).

### FLOW-V1-24-NEG — PASS

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #24 (SR-UP-BDL-HD-FCAH-RT-CXL) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow - Negative
- **Endpoint Name:** V1 flow - GetOfferBundles on haveBundles=false (Upselling path)
- **Request:** Search &gt; Upselling (haveBundles=false) &gt; GetOfferBundles
- **Response:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** haveBundles=false; GetOfferBundles -&gt; 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]. Rejected with the uniform OperationNotSupported envelope; it does not silently return bundle data.
- **Status:** PASS
- **Evidence:** 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 13233.8 EGP
  - **Hop 2 &mdash; V1 Upselling:** PASS &mdash; 200 - 6 upsell offer(s); using [0] total 13233.8 EGP; keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers
  - **Hop 3 &mdash; V1 Bundles:** PASS &mdash; 409

### TC-UPSELL-NEG-01 — PASS

- **Test Case:** [Upselling] [Request] Validate the V1 requestUrl/baseUrl collection defect produces a malformed request URL when left unfixed.
- **Category:** Negative
- **Endpoint Name:** V1 Upselling (requestUrl collection defect)
- **Request:** Search, then Upselling exactly as saved in the V1 collection (requestUrl unset), then Upselling with requestUrl = baseUrl
- **Response:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Expected:** The resolved request URL has an empty host segment (e.g. "api/FlightSearch/UpSelling" with no scheme/host prepended) because requestUrl is an empty, unset collection variable in the shipped STAG_ENV and is never populated by any other request (section 1.4, 2.3). Expect a connection-level or malformed-URL failure, not a normal HTTP 4xx/5xx from the API itself -- confirm and record the exact client error live. This is a confirmed, evidenced collection defect (not inferred) and must be fixed locally (set requestUrl = baseUrl) before any other V1 Upselling test/flow can run.
- **Actual:** Defect confirmed: the shipped request fails at the HTTP client with no API response. Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **Status:** PASS
- **Evidence:** Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Upselling (requestUrl):** PASS &mdash; 0
  - **Hop 3 &mdash; V1 Upselling (fixed):** PASS &mdash; 200

### TC-BOOK-VAL-01 — PASS

- **Test Case:** [Book] [Request] Validate the documented capital-S "Supplier" field is accepted, and confirm whether lowercase "supplier" is also accepted.
- **Category:** Validation
- **Endpoint Name:** Book (V1)
- **Request:** V1 Book twice (each on its own Search/FareConfirm): once with only capital-S Supplier, once with only lowercase supplier; both bookings voided
- **Response:** Supplier (capital S): accepted, pnr ROJEAA | supplier (lowercase): accepted, pnr RPELGW
- **Expected:** Run 1 (documented capital-S casing) succeeds and returns pnr/bookingToken/gdsPNR as normal -- this is the shape every saved V1 example uses (section 2.9) and must work. Run 2's outcome is UNKNOWN per SPEC section 2.9 (confirm case-insensitivity live) -- if it also succeeds, the routing layer is doing case-insensitive JSON key binding (consistent with typical .NET deserializer defaults, section 1.2's similar path-casing note); if it fails or ignores the field, this confirms Book's "Supplier" casing is a hard, non-cosmetic requirement, not a copy-paste artifact, and should be documented as such going forward.
- **Actual:** Supplier (capital S): accepted, pnr ROJEAA | supplier (lowercase): accepted, pnr RPELGW
- **Status:** PASS
- **Evidence:** Supplier (capital S): accepted, pnr ROJEAA | supplier (lowercase): accepted, pnr RPELGW

  - **Hop 1 &mdash; V1 Search (capital-S):** PASS &mdash; 200 - 20 offers; picked offers[0] total 13233.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (capital-S):** PASS &mdash; 200 - total 13233.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (capital-S):** PASS &mdash; 200 - pnr ROJEAA gdsPNR ROJEAA; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592776"]
  - **Hop 4 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592776","carrierCode":"QR"}]}
  - **Hop 5 &mdash; V1 Search (lowercase):** PASS &mdash; 200 - 20 offers; picked offers[0] total 13233.8 EGP
  - **Hop 6 &mdash; V1 FareConfirm (lowercase):** PASS &mdash; 200 - total 13233.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 7 &mdash; V1 Book (lowercase):** PASS &mdash; 200 - pnr RPELGW gdsPNR RPELGW; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592778"]
  - **Hop 8 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592778","carrierCode":"QR"}]}

### TC-BOOK-POS-01 — PASS

- **Test Case:** [Book] [Request] Validate a fully-populated passengersList and contactsList (valid ADT+INF with ParentPaxRefId, resolving contactRefId) is accepted.
- **Category:** Positive
- **Endpoint Name:** Book / Retrieve (V1)
- **Request:** V1 Search 1 ADT + 1 INF &gt; FareConfirm &gt; Book with full passengersList (INF has ParentPaxRefId=Pax1) and contactsList &gt; Retrieve; booking voided
- **Response:** Book RVUAHT; Retrieve echoes 2 passengers: names/types/document numbers equal (case-insensitive): true; infant parentPaxRefId "Passenger1" resolves to the adult key "Passenger1": true; normalised on echo: documentType "Passport" (sent PASSPORT), gender "Male" (sent male), contact phone type/code and address are not echoed as sent
- **Expected:** Book succeeds (pnr/bookingToken/gdsPNR returned); Retrieve's passengersList echoes the submitted names/types/document numbers unchanged (section 6.3 Family A Expected passenger state); the INF entry's ParentPaxRefId correctly resolves to the ADT entry in the response; no rejection despite this shape being untested by either collection's own saved examples (every saved V1 Book request in the collection ships passengersList/contactsList empty, section 2.9 -- this test supplies the missing coverage).
- **Actual:** Book RVUAHT; Retrieve echoes 2 passengers: names/types/document numbers equal (case-insensitive): true; infant parentPaxRefId "Passenger1" resolves to the adult key "Passenger1": true; normalised on echo: documentType "Passport" (sent PASSPORT), gender "Male" (sent male), contact phone type/code and address are not echoed as sent
- **Status:** PASS
- **Evidence:** Book RVUAHT; Retrieve echoes 2 passengers: names/types/document numbers equal (case-insensitive): true; infant parentPaxRefId "Passenger1" resolves to the adult key "Passenger1": true; normalised on echo: documentType "Passport" (sent PASSPORT), gender "Male" (sent male), contact phone type/code and address are not echoed as sent

  - **Hop 1 &mdash; V1 Search (ADT-INF):** PASS &mdash; 200 - 20 offers; picked offers[0] total 17988.6 EGP
  - **Hop 2 &mdash; V1 FareConfirm (ADT-INF):** PASS &mdash; 200 - total 17988.6 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (ADT-INF):** PASS &mdash; 200 - pnr RVUAHT gdsPNR RVUAHT; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592781","1572141592780"]
  - **Hop 4 &mdash; V1 Retrieve (ADT-INF):** PASS &mdash; 200 - pnr RVUAHT
  - **Hop 5 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592781","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592780","carrierCode":"QR"}]}

### TC-BOOK-NEG-01 — FAIL

- **Test Case:** [Book] [Request] Validate an INF passenger with a missing or unresolvable ParentPaxRefId is rejected.
- **Category:** Negative
- **Endpoint Name:** Book (V1)
- **Request:** V1 Book with an infant whose ParentPaxRefId is omitted, then non-existent; any booking made is voided
- **Response:** ParentPaxRefId omitted: ACCEPTED, pnr RPQRUY | ParentPaxRefId = Pax9 (not in passengersList): ACCEPTED, pnr RWMMGM
- **Expected:** Book is expected to reject the request (SPEC section 2.5 Request Rules: every INF passenger must carry a valid ParentPaxRefId pointing to an ADT entry present in the same request; section 2.5 Common Errors lists this explicitly). Exact status code is UNKNOWN -- no negative example exists in either collection (section 7.9) -- confirm live and record as baseline rather than assuming a specific 4xx.
- **Actual:** ParentPaxRefId omitted: ACCEPTED, pnr RPQRUY | ParentPaxRefId = Pax9 (not in passengersList): ACCEPTED, pnr RWMMGM
- **Status:** FAIL
- **Evidence:** ParentPaxRefId omitted: ACCEPTED, pnr RPQRUY | ParentPaxRefId = Pax9 (not in passengersList): ACCEPTED, pnr RWMMGM

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 17988.6 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 17988.6 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book:** FAIL &mdash; 200 - pnr RPQRUY
  - **Hop 4 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592783","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592782","carrierCode":"QR"}]}
  - **Hop 5 &mdash; V1 Book:** FAIL &mdash; 200 - pnr RWMMGM
  - **Hop 6 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592785","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592784","carrierCode":"QR"}]}

### TC-BOOK-NEG-02 — FAIL

- **Test Case:** [Book] [Request] Validate a passenger whose contactRefId does not resolve to any entry in contactsList is rejected.
- **Category:** Negative
- **Endpoint Name:** Book (V1)
- **Request:** V1 Book with contactRefId "99" while contactsList only has key "0"
- **Response:** ACCEPTED, pnr RTNGQG: an unresolved contactRefId is not checked
- **Expected:** Book is expected to reject the request (SPEC section 2.5 Request Rules: contactRefId must resolve to a key present in contactsList; section 2.5 Common Errors: contactRefId not found in contactsList). Exact status code/body is UNKNOWN -- no negative example exists in either collection (section 7.9) -- confirm live and record as baseline.
- **Actual:** ACCEPTED, pnr RTNGQG: an unresolved contactRefId is not checked
- **Status:** FAIL
- **Evidence:** ACCEPTED, pnr RTNGQG: an unresolved contactRefId is not checked

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 13233.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 13233.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book:** FAIL &mdash; 200 - pnr RTNGQG
  - **Hop 4 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592786","carrierCode":"QR"}]}

### TC-SEARCH-BIZ-01 — FAIL

- **Test Case:** [Search] [Response] Verify the price-reconciliation formula holds for every offer in the response.
- **Category:** Business Rule
- **Endpoint Name:** Search (V1)
- **Request:** POST V1 Search CAI-JED 2026-11-24, 2 ADT + 2 CHD + 2 INF; every offer checked against the four-part formula
- **Response:** 20 offers: totals/base/tax/paxTotal reconcile on 20/20; tax line items (rule 1) missing on 20/20 offers; paxTotalAmount present on all: false
- **Expected:** All four reconciliations hold exactly for every offer returned. This is enforced by the V1 Search collection script itself (SPEC section 2.1 Business Logic -- proven, not inferred), so a manual pass should reproduce a pass; any mismatch is a genuine regression, not a coverage gap (contrast with V2 Search, where this same check is a script coverage gap per section 1.10 item 4).
- **Actual:** 20 offers: totals/base/tax/paxTotal reconcile on 20/20; tax line items (rule 1) missing on 20/20 offers; paxTotalAmount present on all: false - the item-sum rule cannot hold because taxesAndFees is null on every passenger type (BUG-14)
- **Status:** FAIL
- **Evidence:** 20 offers: totals/base/tax/paxTotal reconcile on 20/20; tax line items (rule 1) missing on 20/20 offers; paxTotalAmount present on all: false

  - **Hop 1 &mdash; V1 Search:** FAIL &mdash; 200

### TC-FARECONFIRM-BIZ-01 — PASS

- **Test Case:** [FareConfirm] [Response] Verify the price-reconciliation formula holds on the confirmed selectedOffer.
- **Category:** Business Rule
- **Endpoint Name:** FareConfirm (V1)
- **Request:** V1 Search 2 ADT + 2 CHD + 2 INF &gt; FareConfirm; selectedOffer checked against the four-part formula
- **Response:** OK: all checks hold; total 61338.8 EGP
- **Expected:** All four reconciliations hold exactly. Enforced by V1's FareConfirm script (SPEC section 2.2 Business Logic -- price-reconciliation test identical to Search's, proven, script-enforced), so this is a regression-class assertion, not exploratory.
- **Actual:** OK: all checks hold; total 61338.8 EGP
- **Status:** PASS
- **Evidence:** OK: all checks hold; total 61338.8 EGP

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined

### TC-BOOK-BIZ-01 — PASS

- **Test Case:** [Book]&amp;[Hold] [Response] Verify the price-reconciliation formula holds on the booked/held offer, matching the pre-booking FareConfirm total.
- **Category:** Business Rule
- **Endpoint Name:** Book / Hold (V1)
- **Request:** V1 FareConfirm &gt; Book (run A) and FareConfirm &gt; Hold (run B), 2 ADT + 2 CHD + 2 INF; both bookings closed afterwards
- **Response:** Book: FareConfirm total 61338.8 -&gt; Book total 61338.8; OK: all checks hold; total 61338.8 EGP | Hold: FareConfirm total 61338.8 -&gt; Hold total 61338.8; OK: all checks hold; total 61338.8 EGP
- **Expected:** Both Book and Hold reconcile correctly per the formula (section 2.1), and neither total drifts unexpectedly from FareConfirm's pre-booking price in the standard, non-delayed positive path. This is enforced by V1's Book AND Hold scripts alike (SPEC section 2.9 Business Logic, 2.10 Business Logic -- both present, unlike V2 Book which SPEC flags as a script coverage gap).
- **Actual:** Book: FareConfirm total 61338.8 -&gt; Book total 61338.8; OK: all checks hold; total 61338.8 EGP | Hold: FareConfirm total 61338.8 -&gt; Hold total 61338.8; OK: all checks hold; total 61338.8 EGP
- **Status:** PASS
- **Evidence:** Book: FareConfirm total 61338.8 -&gt; Book total 61338.8; OK: all checks hold; total 61338.8 EGP | Hold: FareConfirm total 61338.8 -&gt; Hold total 61338.8; OK: all checks hold; total 61338.8 EGP

  - **Hop 1 &mdash; V1 Search (Book):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (Book):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (Book):** PASS &mdash; 200 - pnr SMELEL gdsPNR SMELEL; voidCapability=FullVoidOnlyAllowed; tickets ["1572141592794","1572141592791","1572141592793","1572141592792","1572141592795","1572141592796"]
  - **Hop 4 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592794","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592791","carrierCode":"QR"},{"ticketStatus":
  - **Hop 5 &mdash; V1 Search (Hold):** PASS &mdash; 200 - 20 offers; picked offers[0] total 61338.8 EGP
  - **Hop 6 &mdash; V1 FareConfirm (Hold):** PASS &mdash; 200 - total 61338.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 7 &mdash; V1 Hold (Hold):** PASS &mdash; 200 - pnr RRCDUA gdsPNR RRCDUA; voidCapability=VoidNotAllowed; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 8 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}

### TC-SEARCH-BND-01 — PASS

- **Test Case:** [Search] [Request] Validate a Search requesting 10 total passengers (one over the confirmed 9-passenger maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** Search (V1)
- **Request:** V1 Search with 10 total passengers (6 ADT, 2 CHD, 2 INF), then a 9-passenger control (5 ADT, 2 CHD, 2 INF)
- **Response:** 10 passengers: rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cann | 9-passenger control: 200, 20 offers
- **Expected:** The 10-passenger request is rejected -- SPEC section 2.1 states the 9-total-passenger cap is a confirmed business rule, not inferred from the collections, and section 7.8 names 10-passengers as the primary negative/boundary case for this rule. Exact rejection point (4xx at Search itself vs. accepted-then-rejected downstream) is UNKNOWN per section 2.1 -- confirm live and record. The 9-total control run is expected to succeed.
- **Actual:** 10 passengers: rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cann | 9-passenger control: 200, 20 offers
- **Status:** PASS
- **Evidence:** 10 passengers: rejected 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cann | 9-passenger control: 200, 20 offers

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 400
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200

### TC-BOOK-BIZ-02 — BLOCKED

- **Test Case:** [Book] [Response] Verify Book against a commercially-blacklisted LCC supplier (FlyDubai) is blocked at the business layer.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** Not sent - it names supplier FlyDubai (commercially blacklisted, SPEC 4.3); this run is scoped to SabreNdc/EGY. Live check this run: V1 Search FlyDubai/EGY -&gt; 409 NDC-INT-UNC-Z9999 [{"Name":"InternalServerError"},{"Name":"statusCode","Value":"500"}].
- **Response:** No request sent
- **Expected:** Book is expected to be blocked specifically because FlyDubai is commercially blacklisted (SPEC section 4.3 LCC blacklist, section 1.8: a supplier can be technically reachable while being commercially blacklisted for booking), even though Search/FareConfirm succeed. SPEC section 7.10 calls this out explicitly: confirm it is blocked at the business layer, not just left to fail downstream at the supplier. Exact status/error shape is UNKNOWN -- confirm live and record whether the block happens at Book itself or is left to the supplier to reject.
- **Actual:** Blocked: it names supplier FlyDubai (commercially blacklisted, SPEC 4.3); this run is scoped to SabreNdc/EGY. Live check this run: V1 Search FlyDubai/EGY -&gt; 409 NDC-INT-UNC-Z9999 [{"Name":"InternalServerError"},{"Name":"statusCode","Value":"500"}].
- **Status:** BLOCKED
- **Evidence:** it names supplier FlyDubai (commercially blacklisted, SPEC 4.3); this run is scoped to SabreNdc/EGY. Live check this run: V1 Search FlyDubai/EGY -&gt; 409 NDC-INT-UNC-Z9999 [{"Name":"InternalServerError"},{"Name":"statusCode","Value":"500"}].

### TC-BOOK-NEG-03 — BLOCKED

- **Test Case:** [Book] [Response] Validate Book against GLC, an NDC supplier conditionally blacklisted (per request, inform us first before issuing any ticket), surfaces the conditional-block policy rather than ticketing silently.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** Not sent - it names supplier GLC (conditionally blacklisted, SPEC 4.3); this run is scoped to SabreNdc/EGY. Live check this run: V1 Search Glc/EGY -&gt; 200, 0 offers.
- **Response:** No request sent
- **Expected:** GLC is not an outright blacklist like FlyDubai -- SPEC section 4.3 marks it conditional-not-outright-blacklisted. Expected result is UNKNOWN pending live confirmation of exactly how this conditional policy is technically enforced (if at all) by the API layer versus being a purely off-system process control (team must inform the airline manually) -- confirm live whether Book technically succeeds (with the process control living outside the API) or is technically blocked, and record the finding back into SPEC section 4.3/7.10.
- **Actual:** Blocked: it names supplier GLC (conditionally blacklisted, SPEC 4.3); this run is scoped to SabreNdc/EGY. Live check this run: V1 Search Glc/EGY -&gt; 200, 0 offers.
- **Status:** BLOCKED
- **Evidence:** it names supplier GLC (conditionally blacklisted, SPEC 4.3); this run is scoped to SabreNdc/EGY. Live check this run: V1 Search Glc/EGY -&gt; 200, 0 offers.

## Findings

### Defects

- **[FLOW-V1-01] BUG-14 (occurrence 3, not new) &mdash; V1 Search offers carry no tax line items (offer-level taxesAndFees [] and per-passenger taxesAndFees null) although paxTotalTaxAmount/totalTaxAmount are populated, so reconciliation rule 1 (sum of tax items = paxTotalTaxAmount) cannot hold at Search.** Field: `offers[].passengerFareBreakdown[].taxesAndFees`. Expected: taxesAndFees[] with one entry per tax code, summing to paxTotalTaxAmount. **History:** First confirmed in Round 1 (TC-SEARCH-BIZ-02, 2026-10-25); again earlier in this round **Impact:** The V1 collection script that enforces the item-sum check would fail for SabreNdc; reconciliation is only possible on totals until FareConfirm. Evidence: taxesAndFees null on every passengerFareBreakdown entry of the selected offer
- **[FLOW-V1-01] BUG-15 (occurrence 1, not new) &mdash; V1 RetrieveBooking has no bookingStatus field at all (not null, absent) on SabreNdc/EGY, so no V1 flow can assert the booked / held / cancelled / voided state the flow rows name; the state can only be inferred from tickets[] and holdExpirationDate.** Field: `bookingStatus`. Expected: "bookingStatus": "Booked" | "Held" | "Cancelled" | "Voided" on every Retrieve. **Impact:** Callers cannot distinguish a held, cancelled and unknown booking from the Retrieve response; the primary state assertion of every V1 flow cannot be made. Same defect as BUG-01 of the 2026-08-05 TravelportNdc V1 run. Evidence: Retrieve top-level keys: tickets, creationDate, ticketingDate, fareType, bookedCredentialsSelector, holdExpirationDate, pcc, supplier, pnr, gdsPNR, bookingToken, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer, isBspCommissionApplied, diRemarks
- **[FLOW-V1-06] BUG-06 (occurrence 8, not new) &mdash; V1 Retrieve after a successful CancelAfterHold returns 200 with no tickets and no hold date and no status field, so a cancelled hold is indistinguishable from a booking that was never ticketed (state: no tickets, no hold date; bookingStatus ABSENT).** Field: `Retrieve after CancelAfterHold`. Expected: a cancelled / terminated state (or a 409 "reservation is already cancelled" as recorded for TravelportNdc). **History:** First confirmed in the SabreNdc Void run (2026-10-22, TC-VOID-BIZ-04); again in Round 1 (TC-CANCELHOLD-REG-01, FLOW-V2-30, FLOW-V2-78); again earlier in this round **Impact:** Cancelled holds look like live, unticketed bookings to monitoring and cleanup jobs. Evidence: state: no tickets, no hold date; bookingStatus ABSENT
- **[FLOW-V1-07] BUG-16 (occurrence 1, not new) &mdash; V1 Upselling returns no selectedOffer: the response is {responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails, upsellOffers[]}. SPEC 2.3 and the ID-chaining cheatsheet document Upselling as a drop-in for FareConfirm (selectedOffer.offerId -&gt; selectedOfferId), so the documented chaining breaks and there is no rule for which upsell tier to use.** Field: `selectedOffer (Upselling)`. Expected: "selectedOffer": { "offerId": "...", "priceDetails": { ... } } in the same shape as FareConfirm. **Impact:** Every Upselling-based V1 flow needs a manual workaround (this run uses upsellOffers[0], which carries the same fare as the searched offer). Same defect as BUG-08 of the 2026-08-05 TravelportNdc V1 run. Evidence: Upselling response keys: responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails, upsellOffers
- **[FLOW-V1-08-NEG] BUG-17 (occurrence 1, not new) &mdash; The V1 collection sends Upselling to {{requestUrl}}api/FlightSearch/UpSelling, but requestUrl is not defined in STAG_ENV and is empty in the collection, so the request URL has no host and cannot be sent. Every V1 Upselling test and flow needs a local override first. Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.** Field: `{{requestUrl}} (V1 collection, Upselling)`. Expected: URL template {{baseUrl}}api/FlightSearch/UpSelling (as every other V1 request uses). **Impact:** V1 Upselling cannot be run from the shipped collection and environment; anyone running the V1 suite hits a client-side URL error with no API response. Evidence: Collection request URL "{{requestUrl}}api/FlightSearch/UpSelling"; STAG_ENV has requestUrl: false; collection variable requestUrl = "". Resolved URL "api/FlightSearch/UpSelling" -&gt; client error "Failed to parse URL from api/FlightSearch/UpSelling (Invalid URL)". With requestUrl = baseUrl: Upselling 200.
- **[TC-BOOK-NEG-01] BUG-19 (occurrence 1, not new) &mdash; V1 Book accepts an infant without a valid adult parent reference and tickets it: ParentPaxRefId omitted: ACCEPTED, pnr RPQRUY | ParentPaxRefId = Pax9 (not in passengersList): ACCEPTED, pnr RWMMGM** Field: `ParentPaxRefId`. Expected: 4xx validation error. **Impact:** An infant can be ticketed unattached, which airlines reject at check-in. Evidence: ParentPaxRefId omitted: ACCEPTED, pnr RPQRUY | ParentPaxRefId = Pax9 (not in passengersList): ACCEPTED, pnr RWMMGM
- **[TC-BOOK-NEG-02] BUG-20 (occurrence 1, not new) &mdash; V1 Book accepts a contactRefId that is not a key of contactsList and tickets the booking: ACCEPTED, pnr RTNGQG: an unresolved contactRefId is not checked** Field: `contactRefId`. Expected: 4xx validation error. **Impact:** A passenger can be ticketed with no resolvable contact details. Evidence: ACCEPTED, pnr RTNGQG: an unresolved contactRefId is not checked
- **[FLOW-V1-01] BUG-18 (occurrence 1, not new) &mdash; V1 Search and FareConfirm return no paxTotalAmount on any passengerFareBreakdown entry (all 20 offers and the FareConfirm selectedOffer), although SPEC 2.1/2.2 document it and the V2 responses of the same supplier carry it.** Field: `passengerFareBreakdown[].paxTotalAmount`. Expected: "paxTotalAmount": { "amount": &lt;paxBaseAmount + paxTotalTaxAmount&gt;, "currency": "EGP" } on every passenger entry. **Impact:** Per-passenger totals cannot be read or reconciled from V1 responses (same defect as BUG-03 of the 2026-08-05 TravelportNdc V1 run). Evidence: passengerFareBreakdown keys on V1 Search: passengerTypeCode, paxTotalTaxAmount, paxBaseAmount, taxesAndFees, segmentDetails, discount; V2: paxTotalAmount present

### Unknown-resolutions

- **[FLOW-V1-01-NEG]** V1 Book with a stale/mismatched selectedOfferId (FareConfirm path) on SabreNdc/EGY is rejected: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s Evidence: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s
- **[FLOW-V1-03-NEG]** V1 Book with a stale/mismatched selectedOfferId (FareConfirm path) on SabreNdc/EGY is rejected: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s Evidence: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s
- **[FLOW-V1-07-NEG]** V1 Book with a stale/mismatched selectedOfferId (Upselling path) on SabreNdc/EGY is rejected: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s Evidence: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s
- **[FLOW-V1-09-NEG]** V1 Book with a stale/mismatched selectedOfferId (Upselling path) on SabreNdc/EGY is rejected: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s Evidence: 400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"SelectedOfferId","Value":"The selectedOfferId is invalid, expired, or does not belong to the supplied response. Please s
- **[FLOW-V1-15-NEG]** V1 GetOfferBundles on an offer with haveBundles=false (FareConfirm path) is rejected with 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}] - an explicit rejection, not an empty bundleChoices Evidence: 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **[FLOW-V1-18-NEG]** V1 GetOfferBundles on an offer with haveBundles=false (FareConfirm path) is rejected with 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}] - an explicit rejection, not an empty bundleChoices Evidence: 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **[FLOW-V1-21-NEG]** V1 GetOfferBundles on an offer with haveBundles=false (Upselling path) is rejected with 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}] - an explicit rejection, not an empty bundleChoices Evidence: 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **[FLOW-V1-24-NEG]** V1 GetOfferBundles on an offer with haveBundles=false (Upselling path) is rejected with 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}] - an explicit rejection, not an empty bundleChoices Evidence: 409 code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}]
- **[TC-BOOK-VAL-01]** V1 Book on SabreNdc/EGY binds the supplier field case-insensitively: both "Supplier" and "supplier" create a booking (same as the TravelportNdc result recorded in SPEC 2.9 on 2026-08-05) Evidence: Supplier (capital S): accepted, pnr ROJEAA | supplier (lowercase): accepted, pnr RPELGW

### Also re-confirmed

- **[FLOW-V1-02] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-02] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-03] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-03] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-04] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-04] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-05] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-05] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-06] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-06] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-07] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-07] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-08] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-08] BUG-16** &mdash; V1 Upselling still returns upsellOffers[] and no selectedOffer
- **[FLOW-V1-08] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-09] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-09] BUG-16** &mdash; V1 Upselling still returns upsellOffers[] and no selectedOffer
- **[FLOW-V1-09] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-10] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-10] BUG-16** &mdash; V1 Upselling still returns upsellOffers[] and no selectedOffer
- **[FLOW-V1-10] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-11] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-11] BUG-16** &mdash; V1 Upselling still returns upsellOffers[] and no selectedOffer
- **[FLOW-V1-11] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-12] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[FLOW-V1-12] BUG-16** &mdash; V1 Upselling still returns upsellOffers[] and no selectedOffer
- **[FLOW-V1-12] BUG-15** &mdash; V1 Retrieve still has no bookingStatus field
- **[FLOW-V1-12] BUG-06** &mdash; V1 Retrieve after CancelAfterHold shows no cancelled signal
- **[FLOW-V1-12-NEG] BUG-17** &mdash; V1 Upselling request still uses the undefined {{requestUrl}} variable
- **[FLOW-V1-20-NEG] BUG-17** &mdash; V1 Upselling request still uses the undefined {{requestUrl}} variable
- **[TC-UPSELL-NEG-01] BUG-17** &mdash; V1 Upselling request still uses the undefined {{requestUrl}} variable
- **[TC-SEARCH-BIZ-01] BUG-14** &mdash; V1 Search taxesAndFees still missing
- **[TC-SEARCH-BIZ-01] BUG-18** &mdash; V1 passengerFareBreakdown still has no paxTotalAmount (20 of 20 offers)

## Proposed SPEC.md updates

No SPEC.md updates proposed this round (Round 11's pending proposals are unchanged).

## Cleanup / follow-up

Live artifacts left behind this round (1):

- **needs_void_cancel** &mdash; pnr none (null) &mdash; Nothing left behind: all 20 Book / Hold PNRs created by this run's test cases were voided or cancelled by the test that made them (see the session-wide audit in the final summary).

