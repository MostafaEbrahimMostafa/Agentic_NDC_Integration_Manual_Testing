# QA Execution Report — SabreNdc / EGY - TestCases_Generic.csv (V1 + V2)

**Environment:** staging (ndc-integration-stg-ne-3) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** SabreNdc  **Credentials Selector:** EGY
**Started:** 2026-10-25T09:22:05.156Z
**Ended:** 2026-10-25T10:03:34.787Z
**Status:** COMPLETE
**Execution Duration:** 41m 30s ([View Time Breakdown](20261025-092205_SabreNdc-EGY-Generic_TimeBreakdown.html))
**Prior runs:** see NDC_Integration/Artifacts/Logs/ (see NDC_Integration/Artifacts/Logs/)

## Scope note

20 of the 64 rows are BLOCKED, none for a test-tool reason: 8 CAPCHECK rows and TC-BOOK-SEC-01 / TC-HOLD-NEG-02 name other suppliers (this run is SabreNdc/EGY only); 5 Bundle rows need haveBundles=true (SabreNdc has none: 144 of 144 offers, GetOfferBundles 409); TC-HOLD-BND-01, TC-RETRIEVE-INT-01, TC-FCAH-NEG-01 and TC-BOOKAFTERHOLD-NEG-01 need a hold past its expiry (SabreNdc holds expire about 5 days out, 2026-10-30); TC-FARECONFIRM-NEG-02 needs a forced sold-out race; TC-VOID-BIZ-01 needs voidCapability=VoidNotAllowed, which SabreNdc never returns. All price checks apply the SPEC 2.1 formula by hand; where V1 and V2 differ in shape that is noted per case.

## Summary

- Test cases logged: 64 of 64 planned
- Passed: 37
- Failed: 7
- Blocked: 20
- Failed test cases: TC-SEARCH-BIZ-02, TC-FARECONFIRM-NEG-01, TC-BOOK-POS-02, TC-BOOK-NEG-04, TC-BOOK-NEG-05, TC-VOID-NEG-02, TC-CANCELHOLD-REG-01
- Blocked test cases: TC-FARECONFIRM-NEG-02, TC-BUNDLE-POS-01, TC-BUNDLE-REG-01, TC-BUNDLE-VAL-02, TC-BUNDLE-VAL-03, TC-BOOK-SEC-01, TC-HOLD-NEG-02, TC-HOLD-BND-01, TC-RETRIEVE-INT-01, TC-FCAH-NEG-01, TC-BOOKAFTERHOLD-NEG-01, TC-VOID-BIZ-01, TC-CAPCHECK-AirCairo-01, TC-CAPCHECK-EgyptAir-01, TC-CAPCHECK-Galileo-01, TC-CAPCHECK-SpiceJet-01, TC-CAPCHECK-GLC-01, TC-CAPCHECK-Indigo-01, TC-CAPCHECK-ElJazeera-01, TC-CAPCHECK-OmainAir-01

## Test case results

### TC-SEARCH-POS-01 — PASS

- **Test Case:** [Search][Request] Verify a valid multi-field Search request returns a non-empty offers array for a supported route.
- **Category:** Positive
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search, SabreNdc/EGY, CAI-JED 2026-11-20, 2 adults + 1 child + 1 infant, on V1 and V2
- **Response:** V1: 200, 20 offers, flags haveBundles+canBeHeld=true | V2: 200, 20 offers, flags all 4=true
- **Expected:** HTTP 200; offers[] non-empty; every offer carries offerId, priceDetails, and haveBundles/canBeHeld/offerHasAncillary/isSeatMapRequired flags; responseId present and usable downstream as searchResponseId (V1) / ResponseId (V2)
- **Actual:** V1: 200, 20 offers, flags haveBundles+canBeHeld=true | V2: 200, 20 offers, flags all 4=true
- **Status:** PASS
- **Evidence:** responseId present on both; V1 offers carry haveBundles+canBeHeld only (V2 adds the other flags, per SPEC 2.2)

  - **Attempt 1 of 2 - V1 Search CAI-JED ADT2 CHD1 INF1:** HTTP 200
  - **Attempt 2 of 2 - V2 Search CAI-JED ADT2 CHD1 INF1:** HTTP 200

### TC-SEARCH-NEG-01 — PASS

- **Test Case:** [Search][Request] Validate Search request is rejected when the supplier field is omitted.
- **Category:** Negative
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search with the supplier key removed
- **Response:** V1: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a valid Supplier"}] | V2: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a valid Supplier"}]
- **Expected:** Request rejected; exact status code and body shape UNKNOWN per section 7.9 -- confirm live and record as the baseline for this class of missing-required-field test.
- **Actual:** Rejected on both versions - V1: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a valid Supplier"}] | V2: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a valid Supplier"}]
- **Status:** PASS
- **Evidence:** V1: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a valid Supplier"}] | V2: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a valid Supplier"}]

  - **Attempt 1 of 2 - V1 Search without supplier:** HTTP 400
  - **Attempt 2 of 2 - V2 Search without supplier:** HTTP 400

### TC-SEARCH-NEG-02 — PASS

- **Test Case:** [Search][Request] Validate Search request is rejected when searchCriteria is omitted.
- **Category:** Negative
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search with searchCriteria removed
- **Response:** V1: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"SearchCriteria","value":"The SearchCriteria field is required."}] | V2: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"SearchCriteria","value":"The SearchCriteria field is required."}]
- **Expected:** Request rejected; exact status code/body UNKNOWN, confirm live.
- **Actual:** Rejected on both versions - V1: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"SearchCriteria","value":"The SearchCriteria field is required."}] | V2: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"SearchCriteria","value":"The SearchCriteria field is required."}]
- **Status:** PASS
- **Evidence:** V1: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"SearchCriteria","value":"The SearchCriteria field is required."}] | V2: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"SearchCriteria","value":"The SearchCriteria field is required."}]

  - **Attempt 1 of 2 - V1 Search without searchCriteria:** HTTP 400
  - **Attempt 2 of 2 - V2 Search without searchCriteria:** HTTP 400

### TC-SEARCH-NEG-03 — PASS

- **Test Case:** [Search][Request] Validate Search behavior for an invalid or lowercase IATA origin/destination code.
- **Category:** Negative
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search with origin XXX (invalid) and origin cai (lowercase valid) on V1 and V2
- **Response:** V1 XXX: 200, offers=0 | V1 cai: 200, offers=0 | V2 XXX: 200, offers=0 | V2 cai: 200, offers=0
- **Expected:** UNKNOWN whether an invalid code 4xx's or returns an empty offers[] 200; case-sensitivity of IATA codes is also UNKNOWN -- confirm both live.
- **Actual:** V1 XXX: 200, offers=0 | V1 cai: 200, offers=0 | V2 XXX: 200, offers=0 | V2 cai: 200, offers=0
- **Status:** PASS
- **Evidence:** Recorded as the live baseline: V1 XXX: 200, offers=0 | V1 cai: 200, offers=0 | V2 XXX: 200, offers=0 | V2 cai: 200, offers=0

  - **Attempt 1 of 4 - V1 origin=XXX (invalid code XXX):** HTTP 200
  - **Attempt 2 of 4 - V1 origin=cai (lowercase cai):** HTTP 200
  - **Attempt 3 of 4 - V2 origin=XXX (invalid code XXX):** HTTP 200
  - **Attempt 4 of 4 - V2 origin=cai (lowercase cai):** HTTP 200

### TC-SEARCH-BND-02 — PASS

- **Test Case:** [Search][Request] Validate Search accepts a total passenger count of exactly 9 (ADT+CHD+INF combined).
- **Category:** Boundary
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search, 7 ADT + 1 CHD + 1 INF = 9 passengers
- **Response:** V1: 200, 20 offers | V2: 200, 20 offers
- **Expected:** HTTP 200; offers returned normally; no passenger-count rejection at the confirmed upper bound.
- **Actual:** V1: 200, 20 offers | V2: 200, 20 offers
- **Status:** PASS
- **Evidence:** V1: 200, 20 offers | V2: 200, 20 offers

  - **Attempt 1 of 2 - V1 9 passengers (7 ADT + 1 CHD + 1 INF):** HTTP 200
  - **Attempt 2 of 2 - V2 9 passengers (7 ADT + 1 CHD + 1 INF):** HTTP 200

### TC-SEARCH-BND-03 — PASS

- **Test Case:** [Search][Request] Validate Search rejects a total passenger count of 10, one over the confirmed 9-passenger maximum.
- **Category:** Boundary
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search, 8 ADT + 1 CHD + 1 INF = 10 passengers
- **Response:** V1: 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cannot exceed 9 for SabreNdc"}] | V2: 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cannot exceed 9 for SabreNdc"}]
- **Expected:** Rejected; exact rejection point (4xx at Search itself vs accepted-then-rejected downstream) is UNKNOWN -- confirm live and record.
- **Actual:** Rejected at Search on both versions: V1: 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cannot exceed 9 for SabreNdc"}] | V2: 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cannot exceed 9 for SabreNdc"}]
- **Status:** PASS
- **Evidence:** V1: 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cannot exceed 9 for SabreNdc"}] | V2: 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Name":"PredicateValidator","Value":"Total passenger count cannot exceed 9 for SabreNdc"}]

  - **Attempt 1 of 2 - V1 10 passengers (8 ADT + 1 CHD + 1 INF):** HTTP 400
  - **Attempt 2 of 2 - V2 10 passengers (8 ADT + 1 CHD + 1 INF):** HTTP 400

### TC-SEARCH-VAL-01 — PASS

- **Test Case:** [Search][Response] Verify Search response's supplier field matches the request's supplier value verbatim.
- **Category:** Validation
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search supplier="SabreNdc" on V1 and V2 (+ informational lowercase probe)
- **Response:** V1 supplier="SabreNdc" | V2 supplier="SabreNdc" | lowercase probe -&gt; 200 supplier="SabreNdc"
- **Expected:** supplier is echoed back unchanged; no silent normalization/casing change.
- **Actual:** Echoed verbatim on both versions: V1 supplier="SabreNdc" | V2 supplier="SabreNdc"
- **Status:** PASS
- **Evidence:** lowercase probe: sent "sabrendc", status 200, echoed "SabreNdc"

  - **Attempt 1 of 3 - V1 Search supplier=SabreNdc:** HTTP 200
  - **Attempt 2 of 3 - V2 Search supplier=SabreNdc:** HTTP 200
  - **Attempt 3 of 3 - V2 informational: supplier sent as "sabrendc":** HTTP 200

### TC-SEARCH-BIZ-02 — FAIL

- **Test Case:** [Search][Response] Verify the per-passenger-type price-reconciliation formula holds on every returned Search offer.
- **Category:** Business Rule
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search ADT2 CHD1 INF1 on V1 and V2; apply the SPEC 2.1 reconciliation to every returned offer
- **Response:** V1: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20 | V2: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20
- **Expected:** All four reconciliation checks hold for every offer and every passenger type present.
- **Actual:** Totals reconcile but the item-level check cannot hold: V1: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20 | V2: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20
- **Status:** FAIL
- **Evidence:** V1: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20 | V2: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20. V1 passengerFareBreakdown has no paxTotalAmount field at all (V2 does).

  - **Attempt 1 of 2 - V1 Search ADT2 CHD1 INF1 - reconcile every offer:** HTTP 200
  - **Attempt 2 of 2 - V2 Search ADT2 CHD1 INF1 - reconcile every offer:** HTTP 200

### TC-SEARCH-SEC-01 — PASS

- **Test Case:** [Search][Request] Verify isdebug=true on Search exposes raw supplierRequest/supplierResponse fields, and confirm whether isdebug=false or omitted suppresses them.
- **Category:** Security
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search with isdebug true / false / omitted on V1 and V2 (SabreNdc/EGY)
- **Response:** V1 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V1 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V1 isdebug omitted: 200, supplierRequest absent, supplierResponse absent | V2 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V2 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V2 isdebug omitted: 200, supplierRequest absent, supplierResponse absent
- **Expected:** With isdebug=true, supplierRequest/supplierResponse are present and may contain raw upstream SOAP/XML; the AirArabia observed example's supplierResponse contained apparent live supplier SOAP credentials (wsse:Username/wsse:Password) in plaintext -- any such exposure must be flagged explicitly. Behavior of isdebug=false/omitted is UNKNOWN and must be confirmed live.
- **Actual:** V1 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V1 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V1 isdebug omitted: 200, supplierRequest absent, supplierResponse absent | V2 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V2 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V2 isdebug omitted: 200, supplierRequest absent, supplierResponse absent
- **Status:** PASS
- **Evidence:** V1 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V1 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V1 isdebug omitted: 200, supplierRequest absent, supplierResponse absent | V2 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V2 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V2 isdebug omitted: 200, supplierRequest absent, supplierResponse absent. Only SabreNdc is in this run's scope, so AirArabia (the supplier with the earlier observation) was not re-run.

  - **Attempt 1 of 6 - V1 isdebug: true:** HTTP 200
  - **Attempt 2 of 6 - V1 isdebug: false:** HTTP 200
  - **Attempt 3 of 6 - V1 isdebug omitted:** HTTP 200
  - **Attempt 4 of 6 - V2 isdebug: true:** HTTP 200
  - **Attempt 5 of 6 - V2 isdebug: false:** HTTP 200
  - **Attempt 6 of 6 - V2 isdebug omitted:** HTTP 200

### TC-SEARCH-REG-01 — PASS

- **Test Case:** [Search][Response] Verify Search response schema matches the baseline [Observed example] shape with no unexpected field removal, rename, or retype.
- **Category:** Regression
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST Search CAI-JED 2026-11-12 on V1 and V2; diff the response schema against the same call captured on 2026-10-22 (the last SabreNdc/EGY run)
- **Response:** V1: removed 0, retyped 0, added 32 | V2: removed 0, retyped 0, added 32
- **Expected:** Schema matches the baseline exactly; any drift (field renamed, removed, or retyped) is reported as a regression even if the flow otherwise passes.
- **Actual:** V1: removed 0, retyped 0, added 32 | V2: removed 0, retyped 0, added 32
- **Status:** PASS
- **Evidence:** Baseline = the SabreNdc Void run's own Search responses of 2026-10-22; depth 4 key/type comparison, nulls ignored

  - **Attempt 1 of 2 - V1 Search (compare with 2026-10-22 baseline):** HTTP 200
  - **Attempt 2 of 2 - V2 Search (compare with 2026-10-22 baseline):** HTTP 200

### TC-FARECONFIRM-POS-01 — PASS

- **Test Case:** [FareConfirm][Request] Verify FareConfirm returns a re-priced selectedOffer for a valid same-call responseId + selectedOfferId pair.
- **Category:** Positive
- **Endpoint Name:** FareConfirm (V1 + V2)
- **Request:** Search then FareConfirm with the same-call responseId + offerId on V1 (searchResponseId) and V2 (ResponseId)
- **Response:** V1: 200, selectedOffer present | V2: 200, selectedOffer present, flags 7/7
- **Expected:** HTTP 200; selectedOffer present with offerId, priceDetails, refundability; V2 additionally carries haveBundles/canBeHeld/isAncillaryRequired/offerHasAncillary/isBaggageRequired/isMealRequired/isSeatMapRequired flags not present in V1's shape.
- **Actual:** V1: 200, selectedOffer present | V2: 200, selectedOffer present, flags 7/7
- **Status:** PASS
- **Evidence:** V2 flags asserted explicitly: canBeHeld=true; haveBundles/offerHasAncillary/isSeatMapRequired/isAncillaryRequired/isBaggageRequired/isMealRequired all false

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - selectedOffer.offerId present; refundability=UnKnown; flags: haveBundles=false canBeHeld=true
  - **Hop 3 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers
  - **Hop 4 &mdash; V2 FareConfirm:** PASS &mdash; 200 - selectedOffer.offerId present; refundability=UnKnown; flags: haveBundles=false canBeHeld=true isAncillaryRequired=false offerHasAncillary=false isBaggageRequired=false isMealRequired=false isSeatMapRequired=false

### TC-FARECONFIRM-NEG-01 — FAIL

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a responseId + selectedOfferId pair originating from two different Search calls.
- **Category:** Negative
- **Endpoint Name:** FareConfirm (V1 + V2)
- **Request:** Two Searches (A, B); FareConfirm with the Search-A responseId and the Search-B offerId on V1 and V2, plus root-cause probes (zero-GUID / omitted responseId, foreign-route offer, garbage offerId)
- **Response:** V1: ACCEPTED 200 | V2: ACCEPTED 200 || probes: V1 zero-GUID searchResponseId: 200; searchResponseId omitted: 200 | V2 zero-GUID ResponseId: 200; ResponseId omitted: 200 | foreign-route offer: 200; garbage offerId: 500 ServerError
- **Expected:** Expected to 4xx or return a supplier-level 'offer no longer available'-style error; exact behavior UNKNOWN, confirm live -- high-value negative test per section 1.7.
- **Actual:** Mixed pair ACCEPTED on both versions. Root cause: the responseId is not checked at all. V1: ACCEPTED 200 | V2: ACCEPTED 200 || V1 zero-GUID searchResponseId: 200; searchResponseId omitted: 200 | V2 zero-GUID ResponseId: 200; ResponseId omitted: 200 | foreign-route offer: 200; garbage offerId: 500 ServerError
- **Status:** FAIL
- **Evidence:** V1: ACCEPTED 200 | V2: ACCEPTED 200 || V1 zero-GUID searchResponseId: 200; searchResponseId omitted: 200 | V2 zero-GUID ResponseId: 200; ResponseId omitted: 200 | foreign-route offer: 200; garbage offerId: 500 ServerError

  - **Attempt 1 of 13 - V1 Search for Search-A:** HTTP 200
  - **Attempt 2 of 13 - V1 Search for Search-B:** HTTP 200
  - **Attempt 3 of 13 - V1 FareConfirm: Search-A responseId + Search-B offerId:** HTTP 200
  - **Attempt 4 of 13 - V1 probe: all-zero GUID as searchResponseId + valid offerId:** HTTP 200
  - **Attempt 5 of 13 - V1 probe: searchResponseId omitted + valid offerId:** HTTP 200
  - **Attempt 6 of 13 - V2 Search for Search-A:** HTTP 200
  - **Attempt 7 of 13 - V2 Search for Search-B:** HTTP 200
  - **Attempt 8 of 13 - V2 FareConfirm: Search-A responseId + Search-B offerId:** HTTP 200
  - **Attempt 9 of 13 - V2 probe: all-zero GUID as ResponseId + valid offerId:** HTTP 200
  - **Attempt 10 of 13 - V2 probe: ResponseId omitted + valid offerId:** HTTP 200
  - **Attempt 11 of 13 - V2 Search CAI-DOH (a different route, for the foreign-offer probe):** HTTP 200
  - **Attempt 12 of 13 - V2 probe: CAI-JED responseId + a CAI-DOH offerId:** HTTP 200
  - **Attempt 13 of 13 - V2 probe: valid ResponseId + selectedOfferId "garbage":** HTTP 500

### TC-FARECONFIRM-VAL-01 — PASS

- **Test Case:** [FareConfirm][Request] Validate V1's searchResponseId and V2's ResponseId field names are each accepted only under their own version's contract, not interchangeably.
- **Category:** Validation
- **Endpoint Name:** FareConfirm (V1 + V2)
- **Request:** V1 FareConfirm with ResponseId; V2 FareConfirm with searchResponseId; control without any response id
- **Response:** V1 given ResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing) | V2 given searchResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing)
- **Expected:** Both cross-version field-name substitutions are rejected or the field is ignored/treated as missing (exact behavior UNKNOWN, confirm live) -- this is a genuine contract difference, not a typo, and must not be treated as interchangeable.
- **Actual:** Treated as missing (ignored), which the expected result allows: V1 given ResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing) | V2 given searchResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing)
- **Status:** PASS
- **Evidence:** V1 given ResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing) | V2 given searchResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing)

  - **Attempt 1 of 6 - V1 Search for V1 cross-name test:** HTTP 200
  - **Attempt 2 of 6 - V1 FareConfirm with ResponseId (the other version's name) instead of searchResponseId:** HTTP 200
  - **Attempt 3 of 6 - V1 control: no response id field at all:** HTTP 200
  - **Attempt 4 of 6 - V2 Search for V2 cross-name test:** HTTP 200
  - **Attempt 5 of 6 - V2 FareConfirm with searchResponseId (the other version's name) instead of ResponseId:** HTTP 200
  - **Attempt 6 of 6 - V2 control: no response id field at all:** HTTP 200

### TC-FARECONFIRM-BIZ-02 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify capability flags (haveBundles/canBeHeld/offerHasAncillary/isSeatMapRequired) stay consistent between Search and FareConfirm for the same offer.
- **Category:** Business Rule
- **Endpoint Name:** Search + FareConfirm (V1 + V2)
- **Request:** Search then FareConfirm for the same offer; compare capability flags on V1 and V2
- **Response:** V1: haveBundles=false→false canBeHeld=true→true consistent | V2: haveBundles=false→false canBeHeld=true→true offerHasAncillary=false→false isSeatMapRequired=false→false consistent
- **Expected:** Flags match between the two responses for the same offer; a flag flipping between steps is itself a defect worth reporting, not expected behavior.
- **Actual:** V1: haveBundles=false→false canBeHeld=true→true consistent | V2: haveBundles=false→false canBeHeld=true→true offerHasAncillary=false→false isSeatMapRequired=false→false consistent
- **Status:** PASS
- **Evidence:** V1: haveBundles=false→false canBeHeld=true→true consistent | V2: haveBundles=false→false canBeHeld=true→true offerHasAncillary=false→false isSeatMapRequired=false→false consistent

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V2 Search:** PASS &mdash; 200
  - **Hop 4 &mdash; V2 FareConfirm:** PASS &mdash; 200

### TC-FARECONFIRM-INT-01 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify Search's responseId and offers[0].offerId hand off correctly into FareConfirm's required fields.
- **Category:** Integration
- **Endpoint Name:** Search + FareConfirm (V1 + V2)
- **Request:** Map Search responseId/offers[0].offerId into FareConfirm per version
- **Response:** V1: 200, hand-off works, new responseId issued | V2: 200, hand-off works, new responseId issued
- **Expected:** FareConfirm succeeds using only Search's own output, with no manual field substitution beyond the documented name mapping.
- **Actual:** V1: 200, hand-off works, new responseId issued | V2: 200, hand-off works, new responseId issued
- **Status:** PASS
- **Evidence:** V1: 200, hand-off works, new responseId issued | V2: 200, hand-off works, new responseId issued

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V2 Search:** PASS &mdash; 200
  - **Hop 4 &mdash; V2 FareConfirm:** PASS &mdash; 200

### TC-FARECONFIRM-NEG-02 — BLOCKED

- **Test Case:** [FareConfirm][Request] Validate FareConfirm behavior when confirming an offer whose underlying inventory sold out between Search and FareConfirm.
- **Category:** Negative
- **Endpoint Name:** FareConfirm (V1 + V2)
- **Request:** Not sent - a sold-out race between Search and FareConfirm cannot be forced on a live Qatar Airways/American Airlines inventory in staging; the row itself calls it opportunistic.
- **Response:** No request sent
- **Expected:** Expected to surface as a distinct 'offer unavailable'-style error rather than a generic 500; exact shape UNKNOWN, confirm live.
- **Actual:** Blocked: a sold-out race between Search and FareConfirm cannot be forced on a live Qatar Airways/American Airlines inventory in staging; the row itself calls it opportunistic.
- **Status:** BLOCKED
- **Evidence:** a sold-out race between Search and FareConfirm cannot be forced on a live Qatar Airways/American Airlines inventory in staging; the row itself calls it opportunistic.

### TC-BUNDLE-POS-01 — BLOCKED

- **Test Case:** [GetOfferBundles][Request] Verify GetOfferBundles returns bundleChoices for an offer with haveBundles=true.
- **Category:** Positive
- **Endpoint Name:** GetOfferBundles (V1 + V2)
- **Request:** Not sent - SabreNdc/EGY offers never report haveBundles=true (0 of 144 offers across 7 routes: CAI-JED, CAI-DOH, DOH-CAI, CAI-JFK, CAI-LHR, CAI-DXB, JED-CAI), and GetOfferBundles answers 409 OperationNotSupported (see TC-BUNDLE-NEG-01).
- **Response:** No request sent
- **Expected:** bundleChoices populated with bundleCode/bundleName/bundlePrices/includedServices per bundle; offerJourneys is a map keyed by segmentRefId, each with a bundleReferences array.
- **Actual:** Blocked: SabreNdc/EGY offers never report haveBundles=true (0 of 144 offers across 7 routes: CAI-JED, CAI-DOH, DOH-CAI, CAI-JFK, CAI-LHR, CAI-DXB, JED-CAI), and GetOfferBundles answers 409 OperationNotSupported (see TC-BUNDLE-NEG-01).
- **Status:** BLOCKED
- **Evidence:** SabreNdc/EGY offers never report haveBundles=true (0 of 144 offers across 7 routes: CAI-JED, CAI-DOH, DOH-CAI, CAI-JFK, CAI-LHR, CAI-DXB, JED-CAI), and GetOfferBundles answers 409 OperationNotSupported (see TC-BUNDLE-NEG-01).

### TC-BUNDLE-NEG-01 — PASS

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles behavior when called for an offer with haveBundles=false.
- **Category:** Negative
- **Endpoint Name:** GetOfferBundles (V1 + V2)
- **Request:** FareConfirm (haveBundles=false) then GetOfferBundles on V1 and V2
- **Response:** V1: haveBundles=false -&gt; GetOfferBundles 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupporte | V2: haveBundles=false -&gt; GetOfferBundles 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupporte
- **Expected:** UNKNOWN exact result (empty bundleChoices vs explicit error) -- confirm live; a bundle-incapable offer should not silently return usable bundle data.
- **Actual:** V1: haveBundles=false -&gt; GetOfferBundles 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupporte | V2: haveBundles=false -&gt; GetOfferBundles 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=OperationNotSupported msg="This action is not currently supported by the selected supplier." ctx=[{"Name":"OperationNotSupporte
- **Status:** PASS
- **Evidence:** Same uniform OperationNotSupported 409 envelope SPEC 2.4 recorded for TravelportNdc (2026-08-05); here the Context value reads "SabreNdc does not exists".

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Bundles:** PASS &mdash; 409
  - **Hop 4 &mdash; V2 Search:** PASS &mdash; 200
  - **Hop 5 &mdash; V2 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V2 Bundles:** PASS &mdash; 409

### TC-BUNDLE-REG-01 — BLOCKED

- **Test Case:** [GetOfferBundles][Response] Verify the JourneyKey1 script variable (resp.offerJourneys.key) is undefined against the real offerJourneys shape, in both V1 and V2 collections.
- **Category:** Regression
- **Endpoint Name:** GetOfferBundles (V1 + V2)
- **Request:** Not sent - needs a successful GetOfferBundles response, which SabreNdc cannot return (409 OperationNotSupported, see TC-BUNDLE-NEG-01).
- **Response:** No request sent
- **Expected:** resp.offerJourneys.key evaluates to undefined since offerJourneys has no literal key property; JourneyKey1 does not appear to be consumed by any other request in either collection (likely a dead/inert variable), but the mismatch should still be reported as a script/response-shape defect.
- **Actual:** Blocked: needs a successful GetOfferBundles response, which SabreNdc cannot return (409 OperationNotSupported, see TC-BUNDLE-NEG-01).
- **Status:** BLOCKED
- **Evidence:** needs a successful GetOfferBundles response, which SabreNdc cannot return (409 OperationNotSupported, see TC-BUNDLE-NEG-01).

### TC-BUNDLE-VAL-02 — BLOCKED

- **Test Case:** [GetOfferBundles][Response] Validate bundleChoices keys are a subset of the bundleReferences listed per journey in offerJourneys.
- **Category:** Validation
- **Endpoint Name:** GetOfferBundles (V1 + V2)
- **Request:** Not sent - needs a non-empty bundleChoices response, which SabreNdc cannot return (409 OperationNotSupported).
- **Response:** No request sent
- **Expected:** Every bundleReferences code maps to a real bundleChoices entry; no orphaned references.
- **Actual:** Blocked: needs a non-empty bundleChoices response, which SabreNdc cannot return (409 OperationNotSupported).
- **Status:** BLOCKED
- **Evidence:** needs a non-empty bundleChoices response, which SabreNdc cannot return (409 OperationNotSupported).

### TC-BUNDLE-VAL-03 — BLOCKED

- **Test Case:** [GetOfferBundles][Response] Validate includedServices mixes machine-readable tags with free-text rule strings, and known tags remain a subset rather than an exact-match set.
- **Category:** Validation
- **Endpoint Name:** GetOfferBundles (V1 + V2)
- **Request:** Not sent - needs bundleChoices with includedServices, which SabreNdc cannot return (409 OperationNotSupported).
- **Response:** No request sent
- **Expected:** Assertion passes as long as known tags are present as a subset; the array is not asserted to equal a fixed set, since human-readable rule strings coexist in the same array.
- **Actual:** Blocked: needs bundleChoices with includedServices, which SabreNdc cannot return (409 OperationNotSupported).
- **Status:** BLOCKED
- **Evidence:** needs bundleChoices with includedServices, which SabreNdc cannot return (409 OperationNotSupported).

### TC-BOOK-POS-02 — FAIL

- **Test Case:** [Book][Request] Verify Book commits a confirmed offer to a live PNR and returns pnr/bookingToken/gdsPNR.
- **Category:** Positive
- **Endpoint Name:** Book (V1 + V2)
- **Request:** Search &gt; FareConfirm &gt; (V2: AddPassenger) &gt; Book, 1 ADT, SabreNdc/EGY CAI-JED 2026-11-20; each booking voided afterwards
- **Response:** V1: pnr SJJYUP, ids ok, voidCapability ABSENT | V2: pnr RRJNDE, ids ok, voidCapability ABSENT, passengersList echoed true
- **Expected:** HTTP 200; pnr, bookingToken, gdsPNR non-empty; voidCapability present; passengersList is echoed in the RESPONSE for V2 even though absent from the V2 request (server resolves it from AddPassenger).
- **Actual:** V1: pnr SJJYUP, ids ok, voidCapability ABSENT | V2: pnr RRJNDE, ids ok, voidCapability ABSENT, passengersList echoed true
- **Status:** FAIL
- **Evidence:** Bookings cleaned up with Void (see Cleanup hops). V1: voidCapability absent; V2: voidCapability absent

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Book:** FAIL &mdash; 200 - pnr SJJYUP gdsPNR SJJYUP; voidCapability absent; tickets ["1572140214149"]
  - **Hop 4 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214149","carrierCode":"QR"}]}
  - **Hop 5 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 6 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Book:** FAIL &mdash; 200 - pnr RRJNDE gdsPNR RRJNDE; voidCapability absent; tickets ["1572140214150"]
  - **Hop 9 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214150","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-BOOK-NEG-04 — FAIL

- **Test Case:** [Book][Request] Validate behavior when booking twice with the same offer reference (double-booking attempt).
- **Category:** Negative
- **Endpoint Name:** Book (V1 + V2)
- **Request:** Book twice with the same offer reference on each version; every PNR created is voided afterwards
- **Response:** V1: first SCNEGY; second Book -&gt; NEW pnr RSAZSY (duplicate) | V2: first SGQGMN; second Book -&gt; NEW pnr SIHLDI (duplicate)
- **Expected:** UNKNOWN whether the second call is idempotently rejected or produces a second PNR -- confirm live; high-value negative test.
- **Actual:** V1: first SCNEGY; second Book -&gt; NEW pnr RSAZSY (duplicate) | V2: first SGQGMN; second Book -&gt; NEW pnr SIHLDI (duplicate)
- **Status:** FAIL
- **Evidence:** V1: first SCNEGY; second Book -&gt; NEW pnr RSAZSY (duplicate) | V2: first SGQGMN; second Book -&gt; NEW pnr SIHLDI (duplicate)

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; 200 - pnr SCNEGY gdsPNR SCNEGY; voidCapability absent; tickets ["1572140214151"]
  - **Hop 4 &mdash; V1 Book:** FAIL &mdash; 200 - pnr RSAZSY
  - **Hop 5 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214151","carrierCode":"QR"}]}
  - **Hop 6 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214152","carrierCode":"QR"}]}
  - **Hop 7 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 8 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 9 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 10 &mdash; V2 Book:** PASS &mdash; 200 - pnr SGQGMN gdsPNR SGQGMN; voidCapability absent; tickets ["1572140214153"]
  - **Hop 11 &mdash; V2 Book:** FAIL &mdash; 200 - pnr SIHLDI
  - **Hop 12 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214153","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 13 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214154","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-BOOK-BIZ-03 — PASS

- **Test Case:** [Book][Response] Verify the price-reconciliation formula holds on Book's response.
- **Category:** Business Rule
- **Endpoint Name:** Book (V1 + V2)
- **Request:** Book 2 ADT + 1 CHD + 1 INF on each version and apply the SPEC 2.1 reconciliation to selectedOffer; voided afterwards
- **Response:** V1 (pnr RPKBCX): OK: all checks hold; total 48331.2 EGP | V2 (pnr RPCAXI): OK: all checks hold; total 48331.2 EGP
- **Expected:** All reconciliation checks hold.
- **Actual:** V1 (pnr RPKBCX): OK: all checks hold; total 48331.2 EGP | V2 (pnr RPCAXI): OK: all checks hold; total 48331.2 EGP
- **Status:** PASS
- **Evidence:** V2 Book has no script check, so the formula was applied by hand here. V1 (pnr RPKBCX): OK: all checks hold; total 48331.2 EGP | V2 (pnr RPCAXI): OK: all checks hold; total 48331.2 EGP

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; 200 - pnr RPKBCX gdsPNR RPKBCX; voidCapability absent; tickets ["1572140214157","1572140214155","1572140214156","1572140214158"]
  - **Hop 4 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214157","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572140214155","carrierCode":"QR"},{"ticketStatus":
  - **Hop 5 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 6 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Book:** PASS &mdash; 200 - pnr RPCAXI gdsPNR RPCAXI; voidCapability absent; tickets ["1572140214161","1572140214159","1572140214160","1572140214162"]
  - **Hop 9 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214161","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572140214159","carrierCode":"QR"},{"ticketStatus":

### TC-BOOK-SEC-01 — BLOCKED

- **Test Case:** [Book][Request] Verify a Book call against a commercially blacklisted supplier/airline is blocked at the business layer.
- **Category:** Security
- **Endpoint Name:** Book (V1 + V2)
- **Request:** Not sent - it needs a commercially blacklisted supplier (FlyDubai, AirArabia, Jazeera, FlyAdeal ...). SabreNdc is not on the blacklist (SPEC 4.3), and this run is scoped to SabreNdc/EGY, so no booking-affecting call against a blacklisted supplier was sent.
- **Response:** No request sent
- **Expected:** Blocked/rejected at the business layer even though technically reachable through Search/FareConfirm; exact rejection mechanism UNKNOWN, confirm live. GLC specifically requires 'inform us first before issuing any ticket' rather than an outright block -- do not treat it identically to the outright-blacklisted suppliers.
- **Actual:** Blocked: it needs a commercially blacklisted supplier (FlyDubai, AirArabia, Jazeera, FlyAdeal ...). SabreNdc is not on the blacklist (SPEC 4.3), and this run is scoped to SabreNdc/EGY, so no booking-affecting call against a blacklisted supplier was sent.
- **Status:** BLOCKED
- **Evidence:** it needs a commercially blacklisted supplier (FlyDubai, AirArabia, Jazeera, FlyAdeal ...). SabreNdc is not on the blacklist (SPEC 4.3), and this run is scoped to SabreNdc/EGY, so no booking-affecting call against a blacklisted supplier was sent.

### TC-BOOK-BIZ-04 — PASS

- **Test Case:** [Book] Verify the production-booking auto-skip discipline is enforced as a manual process control before any Book/BookAfterHold execution against a production base URL.
- **Category:** Business Rule
- **Endpoint Name:** Book / BookAfterHold (process control)
- **Request:** Process check before any Book/BookAfterHold: compare the run baseUrl with STAG_ENV.baseUrl
- **Response:** No API call; baseUrl https://ndc-integration-stg-ne-3.azurewebsites.net/ vs STAG_ENV https://ndc-integration-stg-ne-3.azurewebsites.net/
- **Expected:** No Book/BookAfterHold execution proceeds against a PROD baseUrl without explicit, documented authorization, regardless of Supplier_Name/Credentials_Selector configured.
- **Actual:** Environment classified as STAGING (baseUrl matches STAG_ENV exactly), so Book/BookAfterHold were permitted. Every PNR created in this run is tracked and voided/cancelled.
- **Status:** PASS
- **Evidence:** run baseUrl = https://ndc-integration-stg-ne-3.azurewebsites.net/; STAG_ENV baseUrl = https://ndc-integration-stg-ne-3.azurewebsites.net/. Control applied manually as the checklist says; Postman has no automatic guard.

### TC-BOOK-NEG-05 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects a selectedOfferId that does not match the fareConfirmResponseId/ResponseId supplied in the same request.
- **Category:** Negative
- **Endpoint Name:** Book (V1 + V2)
- **Request:** Two confirmed offers (A, B); Book with A's response id and B's selectedOfferId on each version
- **Response:** V1: ACCEPTED, pnr RNTVTJ | V2: ACCEPTED, pnr SLXUUB
- **Expected:** Rejected; exact error shape UNKNOWN, confirm live.
- **Actual:** V1: ACCEPTED, pnr RNTVTJ | V2: ACCEPTED, pnr SLXUUB
- **Status:** FAIL
- **Evidence:** V1: ACCEPTED, pnr RNTVTJ | V2: ACCEPTED, pnr SLXUUB

  - **Hop 1 &mdash; V1 Search (A):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (A):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Search (B):** PASS &mdash; 200 - 20 offers; picked offers[2] total 14340.8 EGP
  - **Hop 4 &mdash; V1 FareConfirm (B):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 5 &mdash; V1 Book:** FAIL &mdash; 200 - pnr RNTVTJ
  - **Hop 6 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214163","carrierCode":"QR"}]}
  - **Hop 7 &mdash; V2 Search (A):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 8 &mdash; V2 FareConfirm (A):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 9 &mdash; V2 AddPassenger (A):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 10 &mdash; V2 Search (B):** PASS &mdash; 200 - 20 offers; picked offers[2] total 14340.8 EGP
  - **Hop 11 &mdash; V2 FareConfirm (B):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 12 &mdash; V2 AddPassenger (B):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 13 &mdash; V2 Book:** FAIL &mdash; 200 - pnr SLXUUB
  - **Hop 14 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214165","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-BOOK-VAL-02 — PASS

- **Test Case:** [Book][Request] Validate V1 Book's capital-S Supplier field is accepted consistently despite every other V1 field using lowercase supplier.
- **Category:** Validation
- **Endpoint Name:** Book (V1)
- **Request:** V1 Book twice (each on its own fresh Search/FareConfirm): once with only capital-S Supplier, once with only lowercase supplier; both bookings voided
- **Response:** Supplier (capital S): accepted, pnr SEMWKU | supplier (lowercase): accepted, pnr SEGYCS
- **Expected:** Confirm live whether field-name matching is case-insensitive; if inconsistent handling is found, flag as a copy-paste artifact worth fixing in the collection.
- **Actual:** Supplier (capital S): accepted, pnr SEMWKU | supplier (lowercase): accepted, pnr SEGYCS
- **Status:** PASS
- **Evidence:** Supplier (capital S): accepted, pnr SEMWKU | supplier (lowercase): accepted, pnr SEGYCS

  - **Hop 1 &mdash; V1 Search (capital-S):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (capital-S):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Book (capital-S):** PASS &mdash; 200 - pnr SEMWKU gdsPNR SEMWKU; voidCapability absent; tickets ["1572140214166"]
  - **Hop 4 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214166","carrierCode":"QR"}]}
  - **Hop 5 &mdash; V1 Search (lowercase):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 6 &mdash; V1 FareConfirm (lowercase):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 7 &mdash; V1 Book (lowercase):** PASS &mdash; 200 - pnr SEGYCS gdsPNR SEGYCS; voidCapability absent; tickets ["1572140214167"]
  - **Hop 8 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214167","carrierCode":"QR"}]}

### TC-HOLD-POS-01 — PASS

- **Test Case:** [Hold][Request] Verify Hold reserves an offer without immediate ticketing and returns pnr/bookingToken/gdsPNR plus holdExpirationDate.
- **Category:** Positive
- **Endpoint Name:** Hold (V1 + V2)
- **Request:** Search &gt; FareConfirm &gt; (V2: AddPassenger) &gt; Hold, 1 ADT; each hold cancelled afterwards with CancelAfterHold
- **Response:** V1: pnr RNJERJ, holdExpirationDate 2026-10-30T21:59:00 (5.4 days ahead) | V2: pnr RRAJZO, holdExpirationDate 2026-10-30T21:59:00+02:00 (5.4 days ahead)
- **Expected:** HTTP 200; pnr, bookingToken, gdsPNR non-empty; holdExpirationDate present and in the future.
- **Actual:** V1: pnr RNJERJ, holdExpirationDate 2026-10-30T21:59:00 (5.4 days ahead) | V2: pnr RRAJZO, holdExpirationDate 2026-10-30T21:59:00+02:00 (5.4 days ahead)
- **Status:** PASS
- **Evidence:** V1: pnr RNJERJ, holdExpirationDate 2026-10-30T21:59:00 (5.4 days ahead) | V2: pnr RRAJZO, holdExpirationDate 2026-10-30T21:59:00+02:00 (5.4 days ahead)

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr RNJERJ gdsPNR RNJERJ; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 5 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 6 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Hold:** PASS &mdash; 200 - pnr RRAJZO gdsPNR RRAJZO; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 9 &mdash; V2 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}

### TC-HOLD-NEG-02 — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier/offer with canBeHeld=false (e.g. FlyNas, GLC).
- **Category:** Negative
- **Endpoint Name:** Hold (V1 + V2)
- **Request:** Not sent - it needs a canBeHeld=false supplier (FlyNas or GLC). Every SabreNdc/EGY offer is canBeHeld=true (0 of 144 offers across 7 routes were false), and this run is scoped to SabreNdc.
- **Response:** No request sent
- **Expected:** Expected to fail; exact rejection shape UNKNOWN, confirm live. Per section 4.4, AirCairo/EgyptAir/Galileo/SpiceJet/GLC's Hold capability is disputed across sources -- trust the live canBeHeld flag over either static document when selecting suppliers for this case.
- **Actual:** Blocked: it needs a canBeHeld=false supplier (FlyNas or GLC). Every SabreNdc/EGY offer is canBeHeld=true (0 of 144 offers across 7 routes were false), and this run is scoped to SabreNdc.
- **Status:** BLOCKED
- **Evidence:** it needs a canBeHeld=false supplier (FlyNas or GLC). Every SabreNdc/EGY offer is canBeHeld=true (0 of 144 offers across 7 routes were false), and this run is scoped to SabreNdc.

### TC-HOLD-BIZ-01 — PASS

- **Test Case:** [Hold][Response] Verify the price-reconciliation formula holds on Hold's response in both V1 and V2.
- **Category:** Business Rule
- **Endpoint Name:** Hold (V1 + V2)
- **Request:** Hold 2 ADT + 1 CHD + 1 INF on each version and apply the SPEC 2.1 reconciliation to selectedOffer; holds cancelled afterwards
- **Response:** V1 (pnr SGQSMH): OK: all checks hold; total 48331.2 EGP | V2 (pnr RZNDER): OK: all checks hold; total 48331.2 EGP
- **Expected:** All reconciliation checks hold in both versions.
- **Actual:** V1 (pnr SGQSMH): OK: all checks hold; total 48331.2 EGP | V2 (pnr RZNDER): OK: all checks hold; total 48331.2 EGP
- **Status:** PASS
- **Evidence:** V1 (pnr SGQSMH): OK: all checks hold; total 48331.2 EGP | V2 (pnr RZNDER): OK: all checks hold; total 48331.2 EGP

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr SGQSMH gdsPNR SGQSMH; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 5 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 6 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Hold:** PASS &mdash; 200 - pnr RZNDER gdsPNR RZNDER; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 9 &mdash; V2 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}

### TC-HOLD-BND-01 — BLOCKED

- **Test Case:** [Hold]&amp;[FareConfirmAfterHold]&amp;[BookAfterHold]&amp;[CancelAfterHold] [Response] Verify behavior when FareConfirmAfterHold, BookAfterHold, or CancelAfterHold is attempted after the booking's holdExpirationDate has passed.
- **Category:** Boundary
- **Endpoint Name:** Hold &gt; FareConfirmAfterHold / BookAfterHold / CancelAfterHold
- **Request:** Not sent - the post-expiry state cannot be reached in a session: SabreNdc holds observed in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00), and there is no way to shorten the window. Needs a run on or after that date.
- **Response:** No request sent
- **Expected:** UNKNOWN exact behavior for each of the three calls -- confirm live whether rejected outright or accepted with a price/availability re-check; applies identically in both versions and is not covered by any flow.md-listed flow number.
- **Actual:** Blocked: the post-expiry state cannot be reached in a session: SabreNdc holds observed in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00), and there is no way to shorten the window. Needs a run on or after that date.
- **Status:** BLOCKED
- **Evidence:** the post-expiry state cannot be reached in a session: SabreNdc holds observed in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00), and there is no way to shorten the window. Needs a run on or after that date.

### TC-RETRIEVE-POS-01 — PASS

- **Test Case:** [Retrieve][Response] Verify bookingStatus reflects the correct lifecycle stage (Held after Hold, Booked after Book/BookAfterHold).
- **Category:** Positive
- **Endpoint Name:** Retrieve (V1 + V2)
- **Request:** Hold &gt; Retrieve &gt; PnrReprice &gt; BookAfterHold &gt; Retrieve; and Book &gt; Retrieve; on each version; all tickets voided afterwards
- **Response:** V1: after Hold hold-date-present(no bookingStatus field); after BookAfterHold tickets-present; after Book tickets-present | V2: after Hold "OnHold"; after BookAfterHold "Booked"; after Book "Booked"
- **Expected:** bookingStatus matches the expected lifecycle stage for the preceding action (record the actual observed string value as the regression baseline, since the full enumeration is UNKNOWN).
- **Actual:** V1: after Hold hold-date-present(no bookingStatus field); after BookAfterHold tickets-present; after Book tickets-present | V2: after Hold "OnHold"; after BookAfterHold "Booked"; after Book "Booked"
- **Status:** PASS
- **Evidence:** V1 Retrieve has no bookingStatus field (SPEC 2.11, confirmed 2026-08-05 on TravelportNdc), so its lifecycle is read from tickets / holdExpirationDate. V1: after Hold hold-date-present(no bookingStatus field); after BookAfterHold tickets-present; after Book tickets-present | V2: after Hold "OnHold"; after BookAfterHold "Booked"; after Book "Booked"

  - **Hop 1 &mdash; V1 Search (held):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (held):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold (held):** PASS &mdash; 200 - pnr RVLQYA gdsPNR RVLQYA; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 Retrieve (after-hold):** PASS &mdash; 200 - pnr RVLQYA
  - **Hop 5 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 6 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr RVLQYA
  - **Hop 7 &mdash; V1 Retrieve (after-BAH):** PASS &mdash; 200 - pnr RVLQYA
  - **Hop 8 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214171","carrierCode":"QR"}]}
  - **Hop 9 &mdash; V1 Search (direct):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 10 &mdash; V1 FareConfirm (direct):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 11 &mdash; V1 Book (direct):** PASS &mdash; 200 - pnr RSTJZT gdsPNR RSTJZT; voidCapability absent; tickets ["1572140214172"]
  - **Hop 12 &mdash; V1 Retrieve (after-Book):** PASS &mdash; 200 - pnr RSTJZT
  - **Hop 13 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214172","carrierCode":"QR"}]}
  - **Hop 14 &mdash; V2 Search (held):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 15 &mdash; V2 FareConfirm (held):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 16 &mdash; V2 AddPassenger (held):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 17 &mdash; V2 Hold (held):** PASS &mdash; 200 - pnr RXTDWU gdsPNR RXTDWU; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 18 &mdash; V2 Retrieve (after-hold):** PASS &mdash; 200 - pnr RXTDWU
  - **Hop 19 &mdash; V2 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 20 &mdash; V2 BookAfterHold (BAH):** PASS &mdash; 200 - pnr RXTDWU
  - **Hop 21 &mdash; V2 Retrieve (after-BAH):** PASS &mdash; 200 - pnr RXTDWU
  - **Hop 22 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214174","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 23 &mdash; V2 Search (direct):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 24 &mdash; V2 FareConfirm (direct):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 25 &mdash; V2 AddPassenger (direct):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 26 &mdash; V2 Book (direct):** PASS &mdash; 200 - pnr RQMCFP gdsPNR RQMCFP; voidCapability absent; tickets ["1572140214175"]
  - **Hop 27 &mdash; V2 Retrieve (after-Book):** PASS &mdash; 200 - pnr RQMCFP
  - **Hop 28 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214175","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-RETRIEVE-REG-01 — PASS

- **Test Case:** [Retrieve] Verify V2 Retrieve has zero test-script assertions, the largest single V1/V2 coverage gap of any endpoint.
- **Category:** Regression
- **Endpoint Name:** Retrieve (V1 + V2)
- **Request:** Book 2 ADT + 1 CHD + 1 INF, Retrieve, then apply by hand the price-reconciliation, Book-vs-Retrieve and bookingStatus checks V2 has no script for
- **Response:** V1: all manual checks hold (OK: all checks hold; total 48331.2 EGP; same as Book true) | V2: all manual checks hold (OK: all checks hold; total 48331.2 EGP; same as Book true)
- **Expected:** Manual testing independently supplies the price-reconciliation and bookingStatus checks for V2 Retrieve, since V2's script provides none of what V1's does automatically.
- **Actual:** V1: all manual checks hold (OK: all checks hold; total 48331.2 EGP; same as Book true) | V2: all manual checks hold (OK: all checks hold; total 48331.2 EGP; same as Book true)
- **Status:** PASS
- **Evidence:** V1: all manual checks hold (OK: all checks hold; total 48331.2 EGP; same as Book true) | V2: all manual checks hold (OK: all checks hold; total 48331.2 EGP; same as Book true)

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; 200 - pnr SKKUIB gdsPNR SKKUIB; voidCapability absent; tickets ["1572140214198","1572140214196","1572140214197","1572140214199"]
  - **Hop 4 &mdash; V1 Retrieve (REG01):** PASS &mdash; 200 - pnr SKKUIB
  - **Hop 5 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214198","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572140214196","carrierCode":"QR"},{"ticketStatus":
  - **Hop 6 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 7 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 8 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 9 &mdash; V2 Book:** PASS &mdash; 200 - pnr RWOMYD gdsPNR RWOMYD; voidCapability absent; tickets ["1572140214202","1572140214200","1572140214201","1572140214203"]
  - **Hop 10 &mdash; V2 Retrieve (REG01):** PASS &mdash; 200 - pnr RWOMYD
  - **Hop 11 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214202","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572140214200","carrierCode":"QR"},{"ticketStatus":

### TC-RETRIEVE-VAL-01 — PASS

- **Test Case:** [Retrieve][Response] Validate bookingStatus is one of the currently-known set, or flagged as a newly-observed value rather than hard-failed.
- **Category:** Validation
- **Endpoint Name:** Retrieve (V1 + V2)
- **Request:** Retrieve at every reachable lifecycle stage on each version: Held, after CancelAfterHold, Booked, after Void
- **Response:** V1: Held "hold-date-present(no bookingStatus field)" | after CancelAfterHold "no tickets, no hold date (no bookingStatus field)" | Booked "tickets-present" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va" | V2: Held "OnHold" | after CancelAfterHold "OnHold" | Booked "Booked" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va"
- **Expected:** No full enumeration exists yet (UNKNOWN per section 8.3) -- this is a first-round exploratory priority; every distinct value observed must be recorded and fed back into SPEC.md's living-document update process rather than hard-failing on an unrecognized value.
- **Actual:** Every reachable value recorded as a baseline (no hard-fail on unknown strings): V1: Held "hold-date-present(no bookingStatus field)" | after CancelAfterHold "no tickets, no hold date (no bookingStatus field)" | Booked "tickets-present" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va" | V2: Held "OnHold" | after CancelAfterHold "OnHold" | Booked "Booked" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va"
- **Status:** PASS
- **Evidence:** V1: Held "hold-date-present(no bookingStatus field)" | after CancelAfterHold "no tickets, no hold date (no bookingStatus field)" | Booked "tickets-present" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va" | V2: Held "OnHold" | after CancelAfterHold "OnHold" | Booked "Booked" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va"

  - **Hop 1 &mdash; V1 Search (held):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (held):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold (held):** PASS &mdash; 200 - pnr RRZBHR gdsPNR RRZBHR; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 Retrieve (held):** PASS &mdash; 200 - pnr RRZBHR
  - **Hop 5 &mdash; V1 CancelAfterHold (cancel):** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Retrieve (cancelled):** PASS &mdash; 200 - pnr RRZBHR
  - **Hop 7 &mdash; V1 Search (booked):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 8 &mdash; V1 FareConfirm (booked):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 9 &mdash; V1 Book (booked):** PASS &mdash; 200 - pnr RYTETD gdsPNR RYTETD; voidCapability absent; tickets ["1572140214186"]
  - **Hop 10 &mdash; V1 Retrieve (booked):** PASS &mdash; 200 - pnr RYTETD
  - **Hop 11 &mdash; V1 Void (void):** PASS &mdash; 200
  - **Hop 12 &mdash; V1 Retrieve (voided):** PASS &mdash; 400
  - **Hop 13 &mdash; V2 Search (held):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 14 &mdash; V2 FareConfirm (held):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 15 &mdash; V2 AddPassenger (held):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 16 &mdash; V2 Hold (held):** PASS &mdash; 200 - pnr RTIOKQ gdsPNR RTIOKQ; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 17 &mdash; V2 Retrieve (held):** PASS &mdash; 200 - pnr RTIOKQ
  - **Hop 18 &mdash; V2 CancelAfterHold (cancel):** PASS &mdash; 200
  - **Hop 19 &mdash; V2 Retrieve (cancelled):** PASS &mdash; 200 - pnr RTIOKQ
  - **Hop 20 &mdash; V2 Search (booked):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 21 &mdash; V2 FareConfirm (booked):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 22 &mdash; V2 AddPassenger (booked):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 23 &mdash; V2 Book (booked):** PASS &mdash; 200 - pnr RZXGVA gdsPNR RZXGVA; voidCapability absent; tickets ["1572140214188"]
  - **Hop 24 &mdash; V2 Retrieve (booked):** PASS &mdash; 200 - pnr RZXGVA
  - **Hop 25 &mdash; V2 Void (void):** PASS &mdash; 200
  - **Hop 26 &mdash; V2 Retrieve (voided):** PASS &mdash; 400

### TC-RETRIEVE-INT-01 — BLOCKED

- **Test Case:** [Hold]&amp;[Retrieve] [Response] Verify Retrieve immediately after Hold vs. after holdExpirationDate has passed returns the expected bookingStatus transition.
- **Category:** Integration
- **Endpoint Name:** Hold &gt; Retrieve (V1 + V2)
- **Request:** Not sent - the post-expiry state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).
- **Response:** No request sent
- **Expected:** Expected transition on expiry is UNKNOWN -- high-value exploratory test; record whatever is actually observed as the new baseline.
- **Actual:** Blocked: the post-expiry state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).
- **Status:** BLOCKED
- **Evidence:** the post-expiry state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).

### TC-FCAH-BIZ-01 — PASS

- **Test Case:** [FareConfirmAfterHold][Response] Verify whether the reported price differs from the original Hold price after a hold-window delay (price-drift exploratory check).
- **Category:** Business Rule
- **Endpoint Name:** PnrReprice / FareConfirmAfterHold (V1 + V2)
- **Request:** Hold on each version, wait 90s, PnrReprice, compare the price with the original Hold price; holds cancelled afterwards
- **Response:** V1: Hold 14340.8 -&gt; reprice 14340.8 (delta 0.00) | V2: Hold 14340.8 -&gt; reprice 14340.8 (delta 0.00)
- **Expected:** In the common case, price should match with no drift; a mismatch is the price-drift scenario itself, not necessarily a bug -- report either outcome with the observed delta.
- **Actual:** V1: Hold 14340.8 -&gt; reprice 14340.8 (delta 0.00) | V2: Hold 14340.8 -&gt; reprice 14340.8 (delta 0.00) (a mismatch would be the price-drift scenario itself, not a bug)
- **Status:** PASS
- **Evidence:** V1: Hold 14340.8 -&gt; reprice 14340.8 (delta 0.00) | V2: Hold 14340.8 -&gt; reprice 14340.8 (delta 0.00). Only a 90s delay was practical; a longer window could still show drift.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr RRHNFG gdsPNR RRHNFG; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 5 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 6 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 7 &mdash; V2 Hold:** PASS &mdash; 200 - pnr SKWTVQ gdsPNR SKWTVQ; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 8 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 9 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 10 &mdash; V2 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 11 &mdash; V2 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}

### TC-FCAH-NEG-01 — BLOCKED

- **Test Case:** [FareConfirmAfterHold][Request] Validate FareConfirmAfterHold behavior when called after the hold's holdExpirationDate has passed.
- **Category:** Negative
- **Endpoint Name:** FareConfirmAfterHold (V1 + V2)
- **Request:** Not sent - the post-expiry state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).
- **Response:** No request sent
- **Expected:** UNKNOWN -- expected to fail or return a price/availability change requiring re-acceptance; confirm live and record.
- **Actual:** Blocked: the post-expiry state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).
- **Status:** BLOCKED
- **Evidence:** the post-expiry state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).

### TC-BOOKAFTERHOLD-REG-01 — PASS

- **Test Case:** [Hold]&amp;[BookAfterHold] [Response] Verify pnr/bookingToken/gdsPNR returned by BookAfterHold equal the values established at Hold (same-PNR invariant).
- **Category:** Regression
- **Endpoint Name:** BookAfterHold (V1 + V2)
- **Request:** Hold &gt; PnrReprice &gt; BookAfterHold on each version; compare the ids; tickets voided afterwards
- **Response:** V1: pnr, gdsPNR and bookingToken identical to the Hold values (SBMWUC) | V2: pnr, gdsPNR and bookingToken identical to the Hold values (RWBIDL)
- **Expected:** pnr, bookingToken, and gdsPNR returned by BookAfterHold are byte-identical to the values from Hold; any change is treated as a defect.
- **Actual:** V1: pnr, gdsPNR and bookingToken identical to the Hold values (SBMWUC) | V2: pnr, gdsPNR and bookingToken identical to the Hold values (RWBIDL)
- **Status:** PASS
- **Evidence:** V1: pnr, gdsPNR and bookingToken identical to the Hold values (SBMWUC) | V2: pnr, gdsPNR and bookingToken identical to the Hold values (RWBIDL)

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr SBMWUC gdsPNR SBMWUC; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr SBMWUC
  - **Hop 6 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214190","carrierCode":"QR"}]}
  - **Hop 7 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 8 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 9 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 10 &mdash; V2 Hold:** PASS &mdash; 200 - pnr RWBIDL gdsPNR RWBIDL; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 11 &mdash; V2 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 12 &mdash; V2 BookAfterHold (BAH):** PASS &mdash; 200 - pnr RWBIDL
  - **Hop 13 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214191","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-BOOKAFTERHOLD-NEG-01 — BLOCKED

- **Test Case:** [BookAfterHold][Request] Validate BookAfterHold is rejected when attempted on an expired hold.
- **Category:** Negative
- **Endpoint Name:** BookAfterHold (V1 + V2)
- **Request:** Not sent - the expired-hold state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).
- **Response:** No request sent
- **Expected:** Expected to fail; exact error shape UNKNOWN, confirm live.
- **Actual:** Blocked: the expired-hold state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).
- **Status:** BLOCKED
- **Evidence:** the expired-hold state cannot be reached in a session: SabreNdc holds in this run expire about 5 days after creation (V1 2026-10-30T21:59:00, V2 2026-10-30T21:59:00+02:00).

### TC-VOID-BIZ-01 — BLOCKED

- **Test Case:** [Book]&amp;[Void] [Request] Verify Void only succeeds within the window implied by the booking's live voidCapability flag, not merely the static per-supplier Void column.
- **Category:** Business Rule
- **Endpoint Name:** Book &gt; Void (V1 + V2)
- **Request:** Not sent - needs a Book response whose voidCapability reads "VoidNotAllowed"
- **Response:** No request sent
- **Expected:** A booking whose voidCapability read 'VoidNotAllowed' at Book time is not voidable; treat the live per-booking flag as authoritative over the static section 4.2 matrix's supplier-level Void column.
- **Actual:** Blocked: the precondition cannot be produced on SabreNdc/EGY. voidCapability values seen on responses in this run: Book:(absent) x14, Hold:(absent) x12. Book never returns "VoidNotAllowed" (the field is absent), so there is no booking whose live flag can be compared with a Void outcome.
- **Status:** BLOCKED
- **Evidence:** voidCapability observations this run: Book:(absent) x14, Hold:(absent) x12. See BUG-03 and the 2026-10-22 note that the QR direct Book had no field.

### TC-VOID-NEG-02 — FAIL

- **Test Case:** [Void][Request] Validate Void is rejected when surName does not match the booking's passenger record.
- **Category:** Negative
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Book (passenger surname Ibrahim) then Void with surName "Mismatch", on each version
- **Response:** V1 (pnr SCNTDD): Void ACCEPTED with the wrong surName and voided the booking | V2 (pnr SLEUEY): Void ACCEPTED with the wrong surName and voided the booking
- **Expected:** Rejected due to surName mismatch; exact error shape UNKNOWN, confirm live.
- **Actual:** V1 (pnr SCNTDD): Void ACCEPTED with the wrong surName and voided the booking | V2 (pnr SLEUEY): Void ACCEPTED with the wrong surName and voided the booking
- **Status:** FAIL
- **Evidence:** V1 (pnr SCNTDD): Void ACCEPTED with the wrong surName and voided the booking | V2 (pnr SLEUEY): Void ACCEPTED with the wrong surName and voided the booking

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; 200 - pnr SCNTDD gdsPNR SCNTDD; voidCapability absent; tickets ["1572140214192"]
  - **Hop 4 &mdash; V1 Void (wrong-surname):** FAIL &mdash; 200
  - **Hop 5 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 6 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Book:** PASS &mdash; 200 - pnr SLEUEY gdsPNR SLEUEY; voidCapability absent; tickets ["1572140214193"]
  - **Hop 9 &mdash; V2 Void (wrong-surname):** FAIL &mdash; 200

### TC-CANCELHOLD-REG-01 — FAIL

- **Test Case:** [CancelAfterHold] Verify CancelAfterHold is the least-validated endpoint in the API, with zero test-script coverage and no genuine saved example response in either version.
- **Category:** Regression
- **Endpoint Name:** CancelAfterHold + Retrieve (V1 + V2)
- **Request:** Hold &gt; CancelAfterHold &gt; Retrieve on each version
- **Response:** V1: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled"}; Retrieve after cancel 200 no cancelled signal (no bookingStatus on V1) | V2: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":nul; Retrieve after cancel 200 bookingStatus="OnHold"
- **Expected:** No automated assertion exists to catch a regression here; a follow-up Retrieve showing a cancelled/terminated bookingStatus is the primary success signal to rely on until a genuine CancelAfterHold response example is captured.
- **Actual:** V1: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled"}; Retrieve after cancel 200 no cancelled signal (no bookingStatus on V1) | V2: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":nul; Retrieve after cancel 200 bookingStatus="OnHold"
- **Status:** FAIL
- **Evidence:** V1: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled"}; Retrieve after cancel 200 no cancelled signal (no bookingStatus on V1) | V2: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":nul; Retrieve after cancel 200 bookingStatus="OnHold"

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr SIJOIV gdsPNR SIJOIV; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 CancelAfterHold (REG01):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (after-cancel):** FAIL &mdash; 200 - pnr SIJOIV
  - **Hop 6 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 7 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 8 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 9 &mdash; V2 Hold:** PASS &mdash; 200 - pnr RSUKTX gdsPNR RSUKTX; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 10 &mdash; V2 CancelAfterHold (REG01):** PASS &mdash; 200
  - **Hop 11 &mdash; V2 Retrieve (after-cancel):** FAIL &mdash; 200 - pnr RSUKTX

### TC-CANCELHOLD-NEG-02 — PASS

- **Test Case:** [CancelAfterHold][Request] Validate CancelAfterHold is rejected when attempted against an already-booked (non-held) PNR.
- **Category:** Negative
- **Endpoint Name:** CancelAfterHold (V1 + V2)
- **Request:** Book then CancelAfterHold on the booked PNR, on each version; bookings voided afterwards
- **Response:** V1 (pnr RVGWOF): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: tickets still present | V2 (pnr RTIYBH): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: Booked
- **Expected:** Expected to be rejected since the PNR is not in a cancellable Held state; exact error shape UNKNOWN, confirm live.
- **Actual:** V1 (pnr RVGWOF): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: tickets still present | V2 (pnr RTIYBH): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: Booked
- **Status:** PASS
- **Evidence:** V1 (pnr RVGWOF): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: tickets still present | V2 (pnr RTIYBH): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: Booked

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; 200 - pnr RVGWOF gdsPNR RVGWOF; voidCapability absent; tickets ["1572140214194"]
  - **Hop 4 &mdash; V1 CancelAfterHold (on-booked):** PASS &mdash; 409
  - **Hop 5 &mdash; V1 Retrieve (after-neg):** PASS &mdash; 200 - pnr RVGWOF
  - **Hop 6 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214194","carrierCode":"QR"}]}
  - **Hop 7 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 8 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 9 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 10 &mdash; V2 Book:** PASS &mdash; 200 - pnr RTIYBH gdsPNR RTIYBH; voidCapability absent; tickets ["1572140214195"]
  - **Hop 11 &mdash; V2 CancelAfterHold (on-booked):** PASS &mdash; 409
  - **Hop 12 &mdash; V2 Retrieve (after-neg):** PASS &mdash; 200 - pnr RTIYBH
  - **Hop 13 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572140214195","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-AUTH-SEC-01 — PASS

- **Test Case:** [Search][Request] Verify request behavior with a valid x-api-key versus an invalid or missing x-api-key header.
- **Category:** Security
- **Endpoint Name:** Search + Book (V1 + V2)
- **Request:** Search with a valid / invalid / missing x-api-key; Book (bogus ids) with an invalid / missing key; on V1 and V2
- **Response:** V1 Search valid key: 200 | V1 Search invalid key: 401 AuthenticationError | V1 Search missing key: 401 AuthenticationError | V1 Book invalid key (Book, bogus ids): 401 AuthenticationError | V1 Book missing key (Book, bogus ids): 401 AuthenticationError | V2 Search valid key: 200 | V2 Search invalid key: 401 AuthenticationError | V2 Search missing key: 401 AuthenticationError | V2 Book invalid key (Book, bogus ids): 401 AuthenticationError | V2 Book missing key (Book, bogus ids): 401 AuthenticationError
- **Expected:** Valid key succeeds normally; invalid/missing key is rejected -- exact status code UNKNOWN, confirm live and record as the baseline auth-failure shape.
- **Actual:** V1 Search valid key: 200 | V1 Search invalid key: 401 AuthenticationError | V1 Search missing key: 401 AuthenticationError | V1 Book invalid key (Book, bogus ids): 401 AuthenticationError | V1 Book missing key (Book, bogus ids): 401 AuthenticationError | V2 Search valid key: 200 | V2 Search invalid key: 401 AuthenticationError | V2 Search missing key: 401 AuthenticationError | V2 Book invalid key (Book, bogus ids): 401 AuthenticationError | V2 Book missing key (Book, bogus ids): 401 AuthenticationError
- **Status:** PASS
- **Evidence:** V1 Search valid key: 200 | V1 Search invalid key: 401 AuthenticationError | V1 Search missing key: 401 AuthenticationError | V1 Book invalid key (Book, bogus ids): 401 AuthenticationError | V1 Book missing key (Book, bogus ids): 401 AuthenticationError | V2 Search valid key: 200 | V2 Search invalid key: 401 AuthenticationError | V2 Search missing key: 401 AuthenticationError | V2 Book invalid key (Book, bogus ids): 401 AuthenticationError | V2 Book missing key (Book, bogus ids): 401 AuthenticationError

  - **Attempt 1 of 10 - V1 Search: valid key:** HTTP 200
  - **Attempt 2 of 10 - V1 Search: invalid key:** HTTP 401
  - **Attempt 3 of 10 - V1 Search: missing key:** HTTP 401
  - **Attempt 4 of 10 - V1 Book: invalid key (Book, bogus ids):** HTTP 401
  - **Attempt 5 of 10 - V1 Book: missing key (Book, bogus ids):** HTTP 401
  - **Attempt 6 of 10 - V2 Search: valid key:** HTTP 200
  - **Attempt 7 of 10 - V2 Search: invalid key:** HTTP 401
  - **Attempt 8 of 10 - V2 Search: missing key:** HTTP 401
  - **Attempt 9 of 10 - V2 Book: invalid key (Book, bogus ids):** HTTP 401
  - **Attempt 10 of 10 - V2 Book: missing key (Book, bogus ids):** HTTP 401

### TC-AUTH-SEC-02 — PASS

- **Test Case:** [Search][Request] Verify request behavior with a valid Client-Id versus an invalid Client-Id header value.
- **Category:** Security
- **Endpoint Name:** Search (V1 + V2)
- **Request:** Search with Client-Id NDC-Core / Invalid-Client / lowercase header name / omitted, on V1 and V2
- **Response:** V1 Client-Id: NDC-Core (valid): 200 | V1 Client-Id: Invalid-Client: 401 AuthenticationError | V1 lowercase header name client-id: NDC-Core: 200 | V1 Client-Id omitted: 401 AuthenticationError | V2 Client-Id: NDC-Core (valid): 200 | V2 Client-Id: Invalid-Client: 401 AuthenticationError | V2 lowercase header name client-id: NDC-Core: 200 | V2 Client-Id omitted: 401 AuthenticationError
- **Expected:** Valid value succeeds normally; invalid value is rejected -- exact status code UNKNOWN, confirm live.
- **Actual:** V1 Client-Id: NDC-Core (valid): 200 | V1 Client-Id: Invalid-Client: 401 AuthenticationError | V1 lowercase header name client-id: NDC-Core: 200 | V1 Client-Id omitted: 401 AuthenticationError | V2 Client-Id: NDC-Core (valid): 200 | V2 Client-Id: Invalid-Client: 401 AuthenticationError | V2 lowercase header name client-id: NDC-Core: 200 | V2 Client-Id omitted: 401 AuthenticationError
- **Status:** PASS
- **Evidence:** HTTP header names are case-insensitive, so Client-Id vs client-id is cosmetic by definition. V1 Client-Id: NDC-Core (valid): 200 | V1 Client-Id: Invalid-Client: 401 AuthenticationError | V1 lowercase header name client-id: NDC-Core: 200 | V1 Client-Id omitted: 401 AuthenticationError | V2 Client-Id: NDC-Core (valid): 200 | V2 Client-Id: Invalid-Client: 401 AuthenticationError | V2 lowercase header name client-id: NDC-Core: 200 | V2 Client-Id omitted: 401 AuthenticationError

  - **Attempt 1 of 8 - V1 Search Client-Id: NDC-Core (valid):** HTTP 200
  - **Attempt 2 of 8 - V1 Search Client-Id: Invalid-Client:** HTTP 401
  - **Attempt 3 of 8 - V1 Search lowercase header name client-id: NDC-Core:** HTTP 200
  - **Attempt 4 of 8 - V1 Search Client-Id omitted:** HTTP 401
  - **Attempt 5 of 8 - V2 Search Client-Id: NDC-Core (valid):** HTTP 200
  - **Attempt 6 of 8 - V2 Search Client-Id: Invalid-Client:** HTTP 401
  - **Attempt 7 of 8 - V2 Search lowercase header name client-id: NDC-Core:** HTTP 200
  - **Attempt 8 of 8 - V2 Search Client-Id omitted:** HTTP 401

### TC-AUTH-SEC-03 — PASS

- **Test Case:** [Hold]&amp;[Retrieve] [Request] Verify a cross-tenant access attempt -- acting on a pnr/bookingToken using a different supplier/credentialsSelector pair than the one that created it -- is rejected.
- **Category:** Security
- **Endpoint Name:** Retrieve / PnrReprice (V1 + V2)
- **Request:** Hold under SabreNdc/EGY, then Retrieve and PnrReprice on its pnr/bookingToken using TravelportNdc/UAE and SabreNdc/KSA; hold cancelled afterwards (read-only probes, no destructive call made with the foreign credentials)
- **Response:** V1 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V1 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure | V2 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V2 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure
- **Expected:** UNKNOWN expected behavior -- this is a high-value test since supplier+credentialsSelector is the API's actual body-level (not header-level) authorization mechanism, re-sent and re-checked on every call in a chain per section 1.7.
- **Actual:** V1 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V1 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure | V2 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V2 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure
- **Status:** PASS
- **Evidence:** V1 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V1 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure | V2 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V2 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr SDZIUX gdsPNR SDZIUX; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 Retrieve:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 PnrReprice:** PASS &mdash; 409
  - **Hop 6 &mdash; V1 Retrieve:** PASS &mdash; 400
  - **Hop 7 &mdash; V1 PnrReprice:** PASS &mdash; 500
  - **Hop 8 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 9 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 10 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 11 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 12 &mdash; V2 Hold:** PASS &mdash; 200 - pnr ROOIOQ gdsPNR ROOIOQ; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 13 &mdash; V2 Retrieve:** PASS &mdash; 409
  - **Hop 14 &mdash; V2 PnrReprice:** PASS &mdash; 409
  - **Hop 15 &mdash; V2 Retrieve:** PASS &mdash; 400
  - **Hop 16 &mdash; V2 PnrReprice:** PASS &mdash; 500
  - **Hop 17 &mdash; V2 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}

### TC-AUTH-SEC-04 — PASS

- **Test Case:** [FareConfirmAfterHold][Request] Validate injection-style payloads in free-text fields (passenger name, address, surName) are handled safely and not executed or reflected unsanitized.
- **Category:** Security
- **Endpoint Name:** PnrReprice / AddPassenger / Hold (V1 + V2)
- **Request:** PnrReprice (FareConfirmAfterHold) on a hold with an injection-style surName (script tag, SQL fragment, 500 chars); and a Hold with &lt;script&gt; as a passenger last name; holds cancelled afterwards. Void was deliberately not used for this (Void ignores surName and would void the booking).
- **Response:** V1 surName=script tag: 200 accepted (surName not validated), reflected false | V1 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V1 surName=500-char value: 200 accepted (surName not validated), reflected false | V1 passenger last name &lt;script&gt;: rejected at Hold (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva) | V2 surName=script tag: 200 accepted (surName not validated), reflected false | V2 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V2 surName=500-char value: 200 accepted (surName not validated), reflected false | V2 passenger last name &lt;script&gt;: rejected at AddPassenger (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva)
- **Expected:** Payload is safely handled (rejected, escaped, or stored/echoed verbatim as inert data) and never executed/interpreted; not evidenced as a known risk in the spec but also not evidenced as previously tested.
- **Actual:** V1 surName=script tag: 200 accepted (surName not validated), reflected false | V1 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V1 surName=500-char value: 200 accepted (surName not validated), reflected false | V1 passenger last name &lt;script&gt;: rejected at Hold (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva) | V2 surName=script tag: 200 accepted (surName not validated), reflected false | V2 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V2 surName=500-char value: 200 accepted (surName not validated), reflected false | V2 passenger last name &lt;script&gt;: rejected at AddPassenger (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva)
- **Status:** PASS
- **Evidence:** V1 surName=script tag: 200 accepted (surName not validated), reflected false | V1 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V1 surName=500-char value: 200 accepted (surName not validated), reflected false | V1 passenger last name &lt;script&gt;: rejected at Hold (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva) | V2 surName=script tag: 200 accepted (surName not validated), reflected false | V2 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V2 surName=500-char value: 200 accepted (surName not validated), reflected false | V2 passenger last name &lt;script&gt;: rejected at AddPassenger (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva)

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr RNYCZQ gdsPNR RNYCZQ; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 PnrReprice:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 PnrReprice:** PASS &mdash; 200
  - **Hop 7 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 8 &mdash; V1 Search (name-injection):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 9 &mdash; V1 FareConfirm (name-injection):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 10 &mdash; V1 Hold (name-injection):** PASS &mdash; 400
  - **Hop 11 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 12 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 13 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 14 &mdash; V2 Hold:** PASS &mdash; 200 - pnr SIQGED gdsPNR SIQGED; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 15 &mdash; V2 PnrReprice:** PASS &mdash; 200
  - **Hop 16 &mdash; V2 PnrReprice:** PASS &mdash; 200
  - **Hop 17 &mdash; V2 PnrReprice:** PASS &mdash; 200
  - **Hop 18 &mdash; V2 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}
  - **Hop 19 &mdash; V2 Search (name-injection):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 20 &mdash; V2 FareConfirm (name-injection):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 21 &mdash; V2 AddPassenger (name-injection):** PASS &mdash; 400

### TC-SUPPLIER-BIZ-01 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify the generic pre-flow capability-confirmation procedure -- Search's per-offer flags re-confirmed at FareConfirm -- before scheduling any flow against a given supplier.
- **Category:** Business Rule
- **Endpoint Name:** Search + FareConfirm (V1 + V2)
- **Request:** Search then FareConfirm for SabreNdc/EGY on both versions; compare the capability flags
- **Response:** V1: Search {"haveBundles":"false","canBeHeld":"true"} | FareConfirm {"haveBundles":false,"canBeHeld":true} | V2: Search {"haveBundles":"false","canBeHeld":"true","offerHasAncillary":"false","isSeatMapRequired":"false","offerHasSeat":"false"} | FareConfirm {"haveBundles":false,"canBeHeld":true,"offerHasAncillary":false,"isSeatMapRequired":false,"offerHasSeat":false,"isAncillaryRequired":false,"isBaggageRequired":false,"isMealRequired":false}
- **Expected:** Both steps' flags agree with each other; the confirmed result is recorded before any flow from section 5 requiring that capability is scheduled against this supplier.
- **Actual:** Both steps agree. SabreNdc/EGY live capability: Hold yes (canBeHeld=true on all offers), Bundle no (haveBundles=false), Ancillary no (offerHasAncillary=false), SeatMap no (isSeatMapRequired=false), Upselling yes (200), Void yes (voids a ticketed booking), CancelAfterHold yes, GetOfferBundles/GetAncillary/GetSeatMap/FareCheck 409 OperationNotSupported.
- **Status:** PASS
- **Evidence:** V1: Search {"haveBundles":"false","canBeHeld":"true"} | FareConfirm {"haveBundles":false,"canBeHeld":true} | V2: Search {"haveBundles":"false","canBeHeld":"true","offerHasAncillary":"false","isSeatMapRequired":"false","offerHasSeat":"false"} | FareConfirm {"haveBundles":false,"canBeHeld":true,"offerHasAncillary":false,"isSeatMapRequired":false,"offerHasSeat":false,"isAncillaryRequired":false,"isBaggageRequired":false,"isMealRequired":false}

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V2 Search:** PASS &mdash; 200
  - **Hop 4 &mdash; V2 FareConfirm:** PASS &mdash; 200

### TC-CAPCHECK-AirCairo-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify AirCairo's live Hold capability, given the direct contradiction between the Integration doc (Hold=Yes) and the PRD's canBeHeld=false listing.
- **Category:** Business Rule
- **Endpoint Name:** Search + FareConfirm (AirCairo)
- **Request:** Not sent - it checks the live capabilities of supplier AirCairo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to AirCairo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live canBeHeld flag recorded and treated as authoritative over both conflicting static sources; result documented for section 4.4's living-document update.
- **Actual:** Blocked: it checks the live capabilities of supplier AirCairo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to AirCairo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier AirCairo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to AirCairo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-CAPCHECK-EgyptAir-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify EgyptAir's live Hold capability, given the possible contradiction between the Integration doc (Hold=Yes) and the PRD's flag-count pattern suggesting canBeHeld=false.
- **Category:** Business Rule
- **Endpoint Name:** Search + FareConfirm (EgyptAir)
- **Request:** Not sent - it checks the live capabilities of supplier EgyptAir, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to EgyptAir. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live canBeHeld flag recorded and treated as authoritative; EgyptAir is also NDC-whitelisted per section 4.3, so a capability confirmation here is not blocked by the commercial gate.
- **Actual:** Blocked: it checks the live capabilities of supplier EgyptAir, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to EgyptAir. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier EgyptAir, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to EgyptAir. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-CAPCHECK-Galileo-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify Galileo's live Hold capability, given the possible contradiction between the Integration doc (Hold=Yes) and the PRD's single-flag pattern suggesting canBeHeld=false.
- **Category:** Business Rule
- **Endpoint Name:** Search + FareConfirm (Galileo)
- **Request:** Not sent - it checks the live capabilities of supplier Galileo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to Galileo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live canBeHeld flag recorded and treated as authoritative; the PRD narrative specifically calls Galileo out as part of a 5-member canBeHeldFalseSuppliers list that a shared-code change risks silently breaking.
- **Actual:** Blocked: it checks the live capabilities of supplier Galileo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to Galileo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier Galileo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to Galileo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-CAPCHECK-SpiceJet-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify SpiceJet's live Hold and Bundle capability, given conflicting data across sources on both flags.
- **Category:** Business Rule
- **Endpoint Name:** Search + FareConfirm (SpiceJet)
- **Request:** Not sent - it checks the live capabilities of supplier SpiceJet, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to SpiceJet. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live flags recorded and treated as authoritative over the Integration doc (Hold=Yes) vs PRD (canBeHeld=false strongly implied) conflict, and over the Bundle conflict likewise flagged Conditional in section 4.6.
- **Actual:** Blocked: it checks the live capabilities of supplier SpiceJet, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to SpiceJet. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier SpiceJet, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to SpiceJet. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-CAPCHECK-GLC-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify GLC's live Bundle capability, given the direct contradiction between the Integration doc (Bundle=No, explicit dash) and the PRD's Bundle=true listing.
- **Category:** Business Rule
- **Endpoint Name:** Search + FareConfirm (GLC)
- **Request:** Not sent - it checks the live capabilities of supplier GLC, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to GLC. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live haveBundles flag recorded and treated as authoritative; GLC's Hold=No is agreed by both sources (section 4.6) so only Bundle is genuinely in dispute here.
- **Actual:** Blocked: it checks the live capabilities of supplier GLC, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to GLC. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier GLC, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to GLC. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-CAPCHECK-Indigo-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify Indigo's true capability set is not silently reported as unsupported due to the suppliers.json name-mismatch bug (registered as 'Indego').
- **Category:** Validation
- **Endpoint Name:** Search + FareConfirm (Indigo)
- **Request:** Not sent - it checks the live capabilities of supplier Indigo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to Indigo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live flags recorded as the source of truth; a 'no capability entry found' result must be treated as evidence of the known lookup-mismatch bug, not evidence of 'not supported' -- treat all as UNKNOWN pending this live confirmation.
- **Actual:** Blocked: it checks the live capabilities of supplier Indigo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to Indigo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier Indigo, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to Indigo. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-CAPCHECK-ElJazeera-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify ElJazeera's true capability set is not silently reported as unsupported due to the suppliers.json name-mismatch bug (registered as 'ElJazeeraV4').
- **Category:** Validation
- **Endpoint Name:** Search + FareConfirm (ElJazeera)
- **Request:** Not sent - it checks the live capabilities of supplier ElJazeera, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to ElJazeera. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live flags recorded as the source of truth; treat 'no capability entry found' as evidence of the lookup-mismatch bug, not of unsupported capability.
- **Actual:** Blocked: it checks the live capabilities of supplier ElJazeera, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to ElJazeera. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier ElJazeera, which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to ElJazeera. SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-CAPCHECK-OmainAir-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify OmainAir's (Oman Air's) true capability set is not silently reported as unsupported due to the suppliers.json name-mismatch bug (registered as 'OmanAirV17').
- **Category:** Validation
- **Endpoint Name:** Search + FareConfirm (OmainAir (Oman Air))
- **Request:** Not sent - it checks the live capabilities of supplier OmainAir (Oman Air), which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to OmainAir (Oman Air). SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Response:** No request sent
- **Expected:** Live flags recorded as the source of truth; treat 'no capability entry found' as evidence of the lookup-mismatch bug, not of unsupported capability. Oman Air is NDC-agnostic in section 4.3 (not listed whitelist or blacklist) but is Cancel/Void/Hold=Supported per section 4.6 under its own name.
- **Actual:** Blocked: it checks the live capabilities of supplier OmainAir (Oman Air), which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to OmainAir (Oman Air). SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.
- **Status:** BLOCKED
- **Evidence:** it checks the live capabilities of supplier OmainAir (Oman Air), which is outside this run's scope (SabreNdc with credentials selector EGY only). Nothing was sent to OmainAir (Oman Air). SabreNdc's own result of the same procedure is recorded in TC-SUPPLIER-BIZ-01.

### TC-VERSIONDIFF-BIZ-01 — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Hold]&amp;[Retrieve]&amp;[FareConfirmAfterHold]&amp;[BookAfterHold] [Response] Verify the V1-vs-V2 price-reconciliation script-coverage asymmetry across the shared endpoint set.
- **Category:** Business Rule
- **Endpoint Name:** Search, FareConfirm, Book, Hold, Retrieve, PnrReprice, BookAfterHold (V1 + V2)
- **Request:** For 2 ADT + 1 CHD + 1 INF run Hold &gt; PnrReprice &gt; BookAfterHold &gt; Retrieve and Book on each version and apply the SPEC 2.1 formula by hand at all seven endpoints
- **Response:** V1: Search: ok, FareConfirm: ok, Hold: ok, PnrReprice: ok, BookAfterHold: ok, Retrieve: ok, Book: ok | V2: Search: ok, FareConfirm: ok, Hold: ok, PnrReprice: ok, BookAfterHold: ok, Retrieve: ok, Book: ok
- **Expected:** V1 enforces the reconciliation formula at Search, FareConfirm, Book, Hold, Retrieve, FareConfirmAfterHold, and BookAfterHold; V2 enforces it only at Hold, FareConfirmAfterHold, and BookAfterHold -- manual testing must independently apply the formula at every V2 endpoint the script skips (Search, FareConfirm, Book, Retrieve).
- **Actual:** V1: Search: ok, FareConfirm: ok, Hold: ok, PnrReprice: ok, BookAfterHold: ok, Retrieve: ok, Book: ok | V2: Search: ok, FareConfirm: ok, Hold: ok, PnrReprice: ok, BookAfterHold: ok, Retrieve: ok, Book: ok. (Search shows totals only, no tax lines - see TC-SEARCH-BIZ-02.)
- **Status:** PASS
- **Evidence:** Manual application at the endpoints V2 does not script (Search, FareConfirm, Book, Retrieve) and at the ones it does (Hold, PnrReprice, BookAfterHold). V1: Search: ok, FareConfirm: ok, Hold: ok, PnrReprice: ok, BookAfterHold: ok, Retrieve: ok, Book: ok | V2: Search: ok, FareConfirm: ok, Hold: ok, PnrReprice: ok, BookAfterHold: ok, Retrieve: ok, Book: ok

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; 200 - pnr SDJQES gdsPNR SDJQES; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr SDJQES
  - **Hop 6 &mdash; V1 Retrieve (after-BAH):** PASS &mdash; 200 - pnr SDJQES
  - **Hop 7 &mdash; V1 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 8 &mdash; V1 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 9 &mdash; V1 Book:** PASS &mdash; 200 - pnr RQHAVF gdsPNR RQHAVF; voidCapability absent; tickets ["1572141592375","1572141592373","1572141592374","1572141592376"]
  - **Hop 10 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592371","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592369","carrierCode":"QR"},{"ticketStatus":
  - **Hop 11 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592375","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592373","carrierCode":"QR"},{"ticketStatus":
  - **Hop 12 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 13 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 14 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 15 &mdash; V2 Hold:** PASS &mdash; 200 - pnr SELXUF gdsPNR SELXUF; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00+02:00
  - **Hop 16 &mdash; V2 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 17 &mdash; V2 BookAfterHold (BAH):** PASS &mdash; 200 - pnr SELXUF
  - **Hop 18 &mdash; V2 Retrieve (after-BAH):** PASS &mdash; 200 - pnr SELXUF
  - **Hop 19 &mdash; V2 Search:** PASS &mdash; 200 - 20 offers; picked offers[0] total 48331.2 EGP
  - **Hop 20 &mdash; V2 FareConfirm:** PASS &mdash; 200 - total 48331.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 21 &mdash; V2 AddPassenger:** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 22 &mdash; V2 Book:** PASS &mdash; 200 - pnr RNFXDA gdsPNR RNFXDA; voidCapability absent; tickets ["1572141592383","1572141592381","1572141592382","1572141592384"]
  - **Hop 23 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592379","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592377","carrierCode":"QR"},{"ticketStatus":
  - **Hop 24 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141592383","carrierCode":"QR"},{"ticketStatus":"Voided","ticketNumber":"1572141592381","carrierCode":"QR"},{"ticketStatus":

### TC-VERSIONDIFF-VAL-01 — PASS

- **Test Case:** [Search]&amp;[GetOfferBundles]&amp;[BookAfterHold]&amp;[CancelAfterHold]&amp;[Void] [Request] Verify V2's inconsistent V2/v2 path casing does not affect routing.
- **Category:** Validation
- **Endpoint Name:** all V2 endpoints (path casing)
- **Request:** Each of 14 V2 endpoints called with its documented path casing and with the other casing (V2 vs v2), identical body (valid Search body; deliberately invalid ids elsewhere so nothing is created)
- **Response:** Search: V2→200 | v2→200 | Bundles: V2→400 1001 | v2→400 1001 | SeatMap: V2→400 1001 | v2→400 1001 | BookAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | CancelAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | Void: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | FareConfirm: v2→400 1001 | V2→400 1001 | Upselling: v2→400 1001 | V2→400 1001 | AddPassenger: v2→400 1001 | V2→400 1001 | Ancillary: v2→400 1001 | V2→400 1001 | Book: v2→400 1001 | V2→400 1001 | Hold: v2→400 1001 | V2→400 1001 | PnrReprice: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999 | Retrieve: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999
- **Expected:** If the routing layer is case-insensitive, the inconsistency is cosmetic only; if case-sensitive, this is a latent defect that would affect every V2 endpoint using the 'wrong' casing relative to how it's actually deployed.
- **Actual:** Routing is case-insensitive: every endpoint answers identically under both casings (no 404). Search: V2→200 | v2→200 | Bundles: V2→400 1001 | v2→400 1001 | SeatMap: V2→400 1001 | v2→400 1001 | BookAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | CancelAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | Void: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | FareConfirm: v2→400 1001 | V2→400 1001 | Upselling: v2→400 1001 | V2→400 1001 | AddPassenger: v2→400 1001 | V2→400 1001 | Ancillary: v2→400 1001 | V2→400 1001 | Book: v2→400 1001 | V2→400 1001 | Hold: v2→400 1001 | V2→400 1001 | PnrReprice: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999 | Retrieve: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999
- **Status:** PASS
- **Evidence:** Search: V2→200 | v2→200 | Bundles: V2→400 1001 | v2→400 1001 | SeatMap: V2→400 1001 | v2→400 1001 | BookAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | CancelAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | Void: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | FareConfirm: v2→400 1001 | V2→400 1001 | Upselling: v2→400 1001 | V2→400 1001 | AddPassenger: v2→400 1001 | V2→400 1001 | Ancillary: v2→400 1001 | V2→400 1001 | Book: v2→400 1001 | V2→400 1001 | Hold: v2→400 1001 | V2→400 1001 | PnrReprice: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999 | Retrieve: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999

  - **Attempt 1 of 28 - V2 Search as documented (V2):** HTTP 200
  - **Attempt 2 of 28 - V2 Search with the other casing (v2):** HTTP 200
  - **Attempt 3 of 28 - V2 Bundles as documented (V2):** HTTP 400
  - **Attempt 4 of 28 - V2 Bundles with the other casing (v2):** HTTP 400
  - **Attempt 5 of 28 - V2 SeatMap as documented (V2):** HTTP 400
  - **Attempt 6 of 28 - V2 SeatMap with the other casing (v2):** HTTP 400
  - **Attempt 7 of 28 - V2 BookAfterHold as documented (V2):** HTTP 409
  - **Attempt 8 of 28 - V2 BookAfterHold with the other casing (v2):** HTTP 409
  - **Attempt 9 of 28 - V2 CancelAfterHold as documented (V2):** HTTP 409
  - **Attempt 10 of 28 - V2 CancelAfterHold with the other casing (v2):** HTTP 409
  - **Attempt 11 of 28 - V2 Void as documented (V2):** HTTP 409
  - **Attempt 12 of 28 - V2 Void with the other casing (v2):** HTTP 409
  - **Attempt 13 of 28 - V2 FareConfirm as documented (v2):** HTTP 400
  - **Attempt 14 of 28 - V2 FareConfirm with the other casing (V2):** HTTP 400
  - **Attempt 15 of 28 - V2 Upselling as documented (v2):** HTTP 400
  - **Attempt 16 of 28 - V2 Upselling with the other casing (V2):** HTTP 400
  - **Attempt 17 of 28 - V2 AddPassenger as documented (v2):** HTTP 400
  - **Attempt 18 of 28 - V2 AddPassenger with the other casing (V2):** HTTP 400
  - **Attempt 19 of 28 - V2 Ancillary as documented (v2):** HTTP 400
  - **Attempt 20 of 28 - V2 Ancillary with the other casing (V2):** HTTP 400
  - **Attempt 21 of 28 - V2 Book as documented (v2):** HTTP 400
  - **Attempt 22 of 28 - V2 Book with the other casing (V2):** HTTP 400
  - **Attempt 23 of 28 - V2 Hold as documented (v2):** HTTP 400
  - **Attempt 24 of 28 - V2 Hold with the other casing (V2):** HTTP 400
  - **Attempt 25 of 28 - V2 PnrReprice as documented (v2):** HTTP 409
  - **Attempt 26 of 28 - V2 PnrReprice with the other casing (V2):** HTTP 409
  - **Attempt 27 of 28 - V2 Retrieve as documented (v2):** HTTP 409
  - **Attempt 28 of 28 - V2 Retrieve with the other casing (V2):** HTTP 409

### TC-VERSIONDIFF-NEG-01 — PASS

- **Test Case:** Verify the actual error-response envelope shape (status code, body structure) for a representative sample of endpoints, since no negative/error example exists in either collection for any endpoint.
- **Category:** Negative
- **Endpoint Name:** Search, FareConfirm, Book (V1 + V2)
- **Request:** A deliberately invalid request (missing required field) to Search, FareConfirm and Book on V1 and V2
- **Response:** V1 Search (supplier omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a  [camelCase] | V1 FareConfirm (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConfirmRequestDto","valu [camelCase] | V1 Book (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBookRequestDto","value [camelCase] | V2 Search (supplier omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a  [camelCase] | V2 FareConfirm (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConfirmRequestDto","valu [camelCase] | V2 Book (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBookRequestDto","value [camelCase]
- **Expected:** A concrete, confirmed error envelope (status code + body structure) is documented and becomes the expected-result baseline for every other negative test case in this and the other three passes going forward.
- **Actual:** Envelope baseline recorded: V1 Search (supplier omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a  [camelCase] | V1 FareConfirm (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConfirmRequestDto","valu [camelCase] | V1 Book (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBookRequestDto","value [camelCase] | V2 Search (supplier omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a  [camelCase] | V2 FareConfirm (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConfirmRequestDto","valu [camelCase] | V2 Book (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBookRequestDto","value [camelCase]
- **Status:** PASS
- **Evidence:** V1 Search (supplier omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a  [camelCase] | V1 FareConfirm (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConfirmRequestDto","valu [camelCase] | V1 Book (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBookRequestDto","value [camelCase] | V2 Search (supplier omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"Supplier","value":"Select a  [camelCase] | V2 FareConfirm (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConfirmRequestDto","valu [camelCase] | V2 Book (selectedOfferId omitted): 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBookRequestDto","value [camelCase]

  - **Attempt 1 of 6 - V1 Search (supplier omitted):** HTTP 400
  - **Attempt 2 of 6 - V1 FareConfirm (selectedOfferId omitted):** HTTP 400
  - **Attempt 3 of 6 - V1 Book (selectedOfferId omitted):** HTTP 400
  - **Attempt 4 of 6 - V2 Search (supplier omitted):** HTTP 400
  - **Attempt 5 of 6 - V2 FareConfirm (selectedOfferId omitted):** HTTP 400
  - **Attempt 6 of 6 - V2 Book (selectedOfferId omitted):** HTTP 400

### TC-VERSIONDIFF-NEG-02 — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book] [Response] Verify an identical invalid supplier/credentialsSelector value produces the same error shape across Search, FareConfirm, and Book.
- **Category:** Negative
- **Endpoint Name:** Search, FareConfirm, Book (V1 + V2)
- **Request:** The same misspelled supplier "SabreNDX" sent to Search, FareConfirm and Book on each version
- **Response:** V1 Search: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"airSearc | V1 FareConfirm: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConf | V1 Book: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBo | V2 Search: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"airSearc | V2 FareConfirm: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConf | V2 Book: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBo
- **Expected:** Error shape is consistent across the three endpoints for the same invalid input; any endpoint-specific divergence is reported as an inconsistency.
- **Actual:** Identical shape on all six calls: V1 Search -&gt; 400 camelCase 1001; V1 FareConfirm -&gt; 400 camelCase 1001; V1 Book -&gt; 400 camelCase 1001; V2 Search -&gt; 400 camelCase 1001; V2 FareConfirm -&gt; 400 camelCase 1001; V2 Book -&gt; 400 camelCase 1001
- **Status:** PASS
- **Evidence:** V1 Search: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"airSearc | V1 FareConfirm: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConf | V1 Book: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBo | V2 Search: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"airSearc | V2 FareConfirm: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"fareConf | V2 Book: 400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} code=1001 msg="Validation errors occurred. Please check your request." ctx=[{"name":"flightBo

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 400
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 400
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; 400
  - **Hop 4 &mdash; V2 Search:** PASS &mdash; 400
  - **Hop 5 &mdash; V2 FareConfirm:** PASS &mdash; 400
  - **Hop 6 &mdash; V2 Book:** PASS &mdash; 400

### TC-VERSIONDIFF-VAL-03 — PASS

- **Test Case:** [Book]&amp;[Void] [Response] Validate voidCapability values are constrained to the currently-known set ('VoidNotAllowed' observed) or flagged if a new value appears.
- **Category:** Validation
- **Endpoint Name:** Book / Hold (V1 + V2)
- **Request:** Collected voidCapability from every Book and Hold response of this run (no new calls)
- **Response:** Book:(absent) x23, Hold:(absent) x18
- **Expected:** Every observed value is either the known 'VoidNotAllowed' or a newly-logged-and-flagged value, never a hard test failure on an unrecognized-but-possibly-valid value.
- **Actual:** Observed across 41 Book/Hold responses: Book:(absent) x23, Hold:(absent) x18. No response carried a voidCapability value at all (known "VoidNotAllowed" never seen, no new value seen); no hard failure on that, as the row requires. The absence itself is BUG-03.
- **Status:** PASS
- **Evidence:** Counts per response type: Book:(absent) x23, Hold:(absent) x18

### TC-VERSIONDIFF-VAL-04 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Validate refundability values are constrained to the currently-known set (the literal 'UnKnown' value observed, unusual capitalization) or flagged if a new value appears.
- **Category:** Validation
- **Endpoint Name:** Search / FareConfirm (V1 + V2)
- **Request:** Collected refundability from every Search offer and FareConfirm selectedOffer seen in this run (no new calls)
- **Response:** "UnKnown" x96
- **Expected:** Every observed value matches the known literal 'UnKnown' (exact casing) or is logged-and-flagged as a newly-observed value rather than hard-failed.
- **Actual:** refundability values observed: "UnKnown" x96 - only the known literal "UnKnown" (exact casing preserved)
- **Status:** PASS
- **Evidence:** "UnKnown" x96

### TC-VERSIONDIFF-VAL-05 — PASS

- **Test Case:** [Book]&amp;[Hold] [Request] Validate documentType values within passengersList are constrained to the currently-known set ('PASSPORT' observed) or flagged if a new value appears.
- **Category:** Validation
- **Endpoint Name:** Hold (V1)
- **Request:** V1 Hold with travelDocument.documentType PASSPORT (known) and NATIONAL_ID (new); holds cancelled afterwards
- **Response:** V1 Hold with documentType PASSPORT: accepted, echoed Passport | V1 Hold with documentType NATIONAL_ID: rejected at Hold (400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} cod)
- **Expected:** Every observed value matches 'PASSPORT' or is logged-and-flagged as a newly-observed value; likely supplier-dependent (GDS vs LCC document requirements differ) so a new value should not be hard-failed.
- **Actual:** V1 Hold with documentType PASSPORT: accepted, echoed Passport | V1 Hold with documentType NATIONAL_ID: rejected at Hold (400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} cod)
- **Status:** PASS
- **Evidence:** V1 Hold with documentType PASSPORT: accepted, echoed Passport | V1 Hold with documentType NATIONAL_ID: rejected at Hold (400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} cod)

  - **Hop 1 &mdash; V1 Search (doc-PASSPORT):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (doc-PASSPORT):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 3 &mdash; V1 Hold (doc-PASSPORT):** PASS &mdash; 200 - pnr RXEYCP gdsPNR RXEYCP; voidCapability absent; tickets none; holdExpirationDate 2026-10-30T21:59:00
  - **Hop 4 &mdash; V1 CancelAfterHold (cleanup):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 5 &mdash; V1 Search (doc-NATIONAL_ID):** PASS &mdash; 200 - 20 offers; picked offers[0] total 14340.8 EGP
  - **Hop 6 &mdash; V1 FareConfirm (doc-NATIONAL_ID):** PASS &mdash; 200 - total 14340.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary n/a on V1 isSeatMapRequired n/a on V1
  - **Hop 7 &mdash; V1 Hold (doc-NATIONAL_ID):** FAIL &mdash; 400

## Findings

### Defects

- **[TC-SEARCH-BIZ-02] Search offers carry no tax line items (offer-level taxesAndFees [] and per-passenger taxesAndFees null) although paxTotalTaxAmount/totalTaxAmount are populated, so sum(taxesAndFees) == paxTotalTaxAmount cannot hold: V1: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20 | V2: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20** Field: `offers[].passengerFareBreakdown[].taxesAndFees`. Expected: taxesAndFees[] listing the tax lines (as FareConfirm returns: YQ, YR, EG, ...), summing to paxTotalTaxAmount. **Impact:** Reconciliation check 1 (item sum = tax) is impossible on Search; clients cannot show a tax breakdown until FareConfirm and the V1 Search script check fails for SabreNdc. Evidence: V1: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20 | V2: 20/20 offers reconcile on totals; taxesAndFees item breakdown missing on 20/20
- **[TC-FARECONFIRM-NEG-01] SabreNdc FareConfirm does not validate the search responseId at all: a responseId from another Search, an all-zero GUID, or no responseId are all accepted (200) as long as the offerId is valid, and an offerId from a different route is re-priced. V1 zero-GUID searchResponseId: 200; searchResponseId omitted: 200; V2 zero-GUID ResponseId: 200; ResponseId omitted: 200; foreign-route offer: 200; garbage offerId: 500 ServerError** Field: `ResponseId / searchResponseId`. Expected: HTTP 400 ValidationError when the responseId does not belong to the offerId (as SPEC 2.9 records for the mismatched pair). **Impact:** The responseId is meant to bind an offer to its search session. Without that check, ids from different sessions can be mixed freely and a stale or fabricated session id is never detected. Evidence: V1: ACCEPTED 200 | V2: ACCEPTED 200 | V1 zero-GUID searchResponseId: 200; searchResponseId omitted: 200 | V2 zero-GUID ResponseId: 200; ResponseId omitted: 200 | foreign-route offer: 200; garbage offerId: 500 ServerError
- **[TC-FARECONFIRM-NEG-01] FareConfirm with an unknown selectedOfferId ("garbage") returns HTTP 500 ServerError ("Unknown error occured") instead of a 4xx validation error** Field: `selectedOfferId`. Expected: HTTP 400 ValidationError naming selectedOfferId. **Impact:** A bad client value looks like a server outage, and clients cannot tell it from a real failure. Evidence: V1 zero-GUID searchResponseId: 200; searchResponseId omitted: 200 | V2 zero-GUID ResponseId: 200; ResponseId omitted: 200 | foreign-route offer: 200; garbage offerId: 500 ServerError
- **[TC-BOOK-POS-02] BUG-03 (occurrence 2, not new) &mdash; Book response contains no voidCapability field on SabreNdc/EGY: V1: voidCapability absent; V2: voidCapability absent** Field: `voidCapability`. Expected: "VoidAllowed" (or "VoidNotAllowed" once outside the window). **History:** First confirmed in the SabreNdc Void run (2026-10-22, TC-CAPCHECK-SABRENDC-02, TC-VOID-BIZ-05); absent again in this run on V1 and V2 **Impact:** Clients cannot tell from the booking whether Void is available. Evidence: V1: voidCapability absent; V2: voidCapability absent
- **[TC-BOOK-NEG-04] A second Book with the identical offer reference creates a second live PNR: V1: first SCNEGY; second Book -&gt; NEW pnr RSAZSY (duplicate) | V2: first SGQGMN; second Book -&gt; NEW pnr SIHLDI (duplicate)** Field: `Book (repeat call)`. Expected: The repeat call is rejected, or returns the first PNR. **Impact:** A client retry after a timeout double-tickets the passenger. Evidence: V1: first SCNEGY; second Book -&gt; NEW pnr RSAZSY (duplicate) | V2: first SGQGMN; second Book -&gt; NEW pnr SIHLDI (duplicate)
- **[TC-BOOK-NEG-05] Book accepts a selectedOfferId that belongs to a different FareConfirm/AddPassenger response than the responseId in the same request and creates a live PNR: V1: ACCEPTED, pnr RNTVTJ | V2: ACCEPTED, pnr SLXUUB** Field: `selectedOfferId / ResponseId`. Expected: HTTP 400 ValidationError (SPEC 2.9 records this for TravelportNdc). **Impact:** A real ticket can be issued for an offer that was never confirmed under the session that is being booked. Evidence: V1: ACCEPTED, pnr RNTVTJ | V2: ACCEPTED, pnr SLXUUB
- **[TC-VOID-NEG-02] BUG-01 (occurrence 2, not new) &mdash; Void ignores surName: a booking is voided with a surname that is not on the PNR. V1 (pnr SCNTDD): Void ACCEPTED with the wrong surName and voided the booking | V2 (pnr SLEUEY): Void ACCEPTED with the wrong surName and voided the booking** Field: `surName`. Expected: HTTP 400, booking left ticketed. **History:** First confirmed in the SabreNdc Void run (2026-10-22: TC-VOID-VAL-04, TC-VOID-SEC-04, 9 bookings); reproduced again in this run on V1 and V2 **Impact:** Void is irreversible and the passenger-identity check is missing. Evidence: V1 (pnr SCNTDD): Void ACCEPTED with the wrong surName and voided the booking | V2 (pnr SLEUEY): Void ACCEPTED with the wrong surName and voided the booking
- **[TC-CANCELHOLD-REG-01] BUG-06 (occurrence 2, not new) &mdash; Retrieve after a successful CancelAfterHold returns 200 with no cancelled signal (V2 bookingStatus "OnHold", V1 no status). V1: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled"}; Retrieve after cancel 200 no cancelled signal (no bookingStatus on V1) | V2: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":nul; Retrieve after cancel 200 bookingStatus="OnHold"** Field: `bookingStatus`. Expected: bookingStatus "Cancelled" (or a 4xx "already cancelled"). **History:** First confirmed in the SabreNdc Void run (2026-10-22, TC-VOID-BIZ-04); reproduced again in this run on V1 and V2 **Impact:** Cancelled holds look live to monitoring and cleanup jobs. Evidence: V1: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled"}; Retrieve after cancel 200 no cancelled signal (no bookingStatus on V1) | V2: CancelAfterHold 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":nul; Retrieve after cancel 200 bookingStatus="OnHold"

### Unknown-resolutions

- **[TC-SEARCH-SEC-01]** SabreNdc Search isdebug behaviour: V1 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V1 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V1 isdebug omitted: 200, supplierRequest absent, supplierResponse absent | V2 isdebug: true: 200, supplierRequest PRESENT(888 chars), supplierResponse PRESENT(197604 chars) | V2 isdebug: false: 200, supplierRequest absent, supplierResponse absent | V2 isdebug omitted: 200, supplierRequest absent, supplierResponse absent Evidence: Raw payload contents were inspected in-session only and are not recorded here.
- **[TC-FARECONFIRM-VAL-01]** On SabreNdc/EGY FareConfirm, a wrong-version id field name (V1 sent ResponseId, V2 sent searchResponseId) is not rejected: the field is ignored, because the call also succeeds with no response id at all (see TC-FARECONFIRM-NEG-01 for the defect this exposes). V1 given ResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing) | V2 given searchResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing) Evidence: V1 given ResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing) | V2 given searchResponseId: accepted (200); the control without any response id also returns 200, so the wrong-named field is ignored (treated as missing)
- **[TC-BOOK-VAL-02]** V1 Book on SabreNdc/EGY binds the supplier field case-insensitively: both "Supplier" and "supplier" create a booking (same as the TravelportNdc result recorded in SPEC 2.9 on 2026-08-05) Evidence: Supplier (capital S): accepted, pnr SEMWKU | supplier (lowercase): accepted, pnr SEGYCS
- **[TC-RETRIEVE-VAL-01]** bookingStatus strings observed on SabreNdc/EGY: V1: Held "hold-date-present(no bookingStatus field)" | after CancelAfterHold "no tickets, no hold date (no bookingStatus field)" | Booked "tickets-present" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va" || V2: Held "OnHold" | after CancelAfterHold "OnHold" | Booked "Booked" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va" Evidence: V1: Held "hold-date-present(no bookingStatus field)" | after CancelAfterHold "no tickets, no hold date (no bookingStatus field)" | Booked "tickets-present" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va" | V2: Held "OnHold" | after CancelAfterHold "OnHold" | Booked "Booked" | after Void "400 code=NDC-INT-TEC-A0001 msg="Invalid request. Please check the request parameters and try again." ctx=[{"Va"
- **[TC-CANCELHOLD-NEG-02]** CancelAfterHold on a ticketed SabreNdc PNR: V1 (pnr RVGWOF): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: tickets still present | V2 (pnr RTIYBH): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: Booked Evidence: V1 (pnr RVGWOF): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: tickets still present | V2 (pnr RTIYBH): CancelAfterHold on a ticketed PNR -&gt; rejected 409 code=NDC-INT-UNC-Z9999 msg="NDC-INT-UNC-Z9999" ctx=[{"Name":"060127","Value":"Order fulfilled"}]; Retrieve after: Booked
- **[TC-AUTH-SEC-01]** x-api-key failure baseline on SabreNdc/EGY: V1 Search invalid key: 401 AuthenticationError | V1 Search missing key: 401 AuthenticationError | V1 Book invalid key (Book, bogus ids): 401 AuthenticationError | V1 Book missing key (Book, bogus ids): 401 AuthenticationError | V2 Search invalid key: 401 AuthenticationError | V2 Search missing key: 401 AuthenticationError | V2 Book invalid key (Book, bogus ids): 401 AuthenticationError | V2 Book missing key (Book, bogus ids): 401 AuthenticationError Evidence: V1 Search valid key: 200 | V1 Search invalid key: 401 AuthenticationError | V1 Search missing key: 401 AuthenticationError | V1 Book invalid key (Book, bogus ids): 401 AuthenticationError | V1 Book missing key (Book, bogus ids): 401 AuthenticationError | V2 Search valid key: 200 | V2 Search invalid key: 401 AuthenticationError | V2 Search missing key: 401 AuthenticationError | V2 Book invalid key (Book, bogus ids): 401 AuthenticationError | V2 Book missing key (Book, bogus ids): 401 AuthenticationError
- **[TC-AUTH-SEC-02]** Client-Id baseline on SabreNdc/EGY: V1 Client-Id: NDC-Core (valid): 200 | V1 Client-Id: Invalid-Client: 401 AuthenticationError | V1 lowercase header name client-id: NDC-Core: 200 | V1 Client-Id omitted: 401 AuthenticationError | V2 Client-Id: NDC-Core (valid): 200 | V2 Client-Id: Invalid-Client: 401 AuthenticationError | V2 lowercase header name client-id: NDC-Core: 200 | V2 Client-Id omitted: 401 AuthenticationError Evidence: V1 Client-Id: NDC-Core (valid): 200 | V1 Client-Id: Invalid-Client: 401 AuthenticationError | V1 lowercase header name client-id: NDC-Core: 200 | V1 Client-Id omitted: 401 AuthenticationError | V2 Client-Id: NDC-Core (valid): 200 | V2 Client-Id: Invalid-Client: 401 AuthenticationError | V2 lowercase header name client-id: NDC-Core: 200 | V2 Client-Id omitted: 401 AuthenticationError
- **[TC-AUTH-SEC-03]** Cross-tenant Retrieve/PnrReprice of a SabreNdc/EGY hold using TravelportNdc/UAE or SabreNdc/KSA is rejected: V1 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V1 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure | V2 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V2 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure Evidence: V1 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V1 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V1 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure | V2 Retrieve as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 PnrReprice as TravelportNdc/UAE: rejected 409 {Status,TransactionId,ErrorCode,ErrorMessage,Context,OriginalSupplierRequest,OriginalSupplierRes | V2 Retrieve as SabreNdc/KSA: rejected 400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Invalid reques | V2 PnrReprice as SabreNdc/KSA: rejected 500 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=ServerError msg="Unknown error occure
- **[TC-AUTH-SEC-04]** Injection-style payloads are handled as inert data on SabreNdc/EGY; surName is not validated on PnrReprice (accepted unchanged): V1 surName=script tag: 200 accepted (surName not validated), reflected false | V1 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V1 surName=500-char value: 200 accepted (surName not validated), reflected false | V1 passenger last name &lt;script&gt;: rejected at Hold (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva) | V2 surName=script tag: 200 accepted (surName not validated), reflected false | V2 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V2 surName=500-char value: 200 accepted (surName not validated), reflected false | V2 passenger last name &lt;script&gt;: rejected at AddPassenger (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva) Evidence: V1 surName=script tag: 200 accepted (surName not validated), reflected false | V1 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V1 surName=500-char value: 200 accepted (surName not validated), reflected false | V1 passenger last name &lt;script&gt;: rejected at Hold (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva) | V2 surName=script tag: 200 accepted (surName not validated), reflected false | V2 surName=SQL fragment: 200 accepted (surName not validated), reflected false | V2 surName=500-char value: 200 accepted (surName not validated), reflected false | V2 passenger last name &lt;script&gt;: rejected at AddPassenger (400 {Status,TransactionId,ErrorCode,ErrorMessage,Context} code=NDC-INT-TEC-A0001 msg="Inva)
- **[TC-SUPPLIER-BIZ-01]** SabreNdc/EGY live capability: Hold yes (canBeHeld=true on all offers), Bundle no (haveBundles=false), Ancillary no (offerHasAncillary=false), SeatMap no (isSeatMapRequired=false), Upselling yes (200), Void yes (voids a ticketed booking), CancelAfterHold yes, GetOfferBundles/GetAncillary/GetSeatMap/FareCheck 409 OperationNotSupported. Evidence: V1: Search {"haveBundles":"false","canBeHeld":"true"} | FareConfirm {"haveBundles":false,"canBeHeld":true} | V2: Search {"haveBundles":"false","canBeHeld":"true","offerHasAncillary":"false","isSeatMapRequired":"false","offerHasSeat":"false"} | FareConfirm {"haveBundles":false,"canBeHeld":true,"offerHasAncillary":false,"isSeatMapRequired":false,"offerHasSeat":false,"isAncillaryRequired":false,"isBaggageRequired":false,"isMealRequired":false}
- **[TC-VERSIONDIFF-VAL-01]** V2/v2 path casing is cosmetic: all 14 V2 endpoints respond identically to either casing (checked live, SabreNdc/EGY) Evidence: Search: V2→200 | v2→200 | Bundles: V2→400 1001 | v2→400 1001 | SeatMap: V2→400 1001 | v2→400 1001 | BookAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | CancelAfterHold: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | Void: V2→409 NDC-INT-UNC-Z9999 | v2→409 NDC-INT-UNC-Z9999 | FareConfirm: v2→400 1001 | V2→400 1001 | Upselling: v2→400 1001 | V2→400 1001 | AddPassenger: v2→400 1001 | V2→400 1001 | Ancillary: v2→400 1001 | V2→400 1001 | Book: v2→400 1001 | V2→400 1001 | Hold: v2→400 1001 | V2→400 1001 | PnrReprice: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999 | Retrieve: v2→409 NDC-INT-UNC-Z9999 | V2→409 NDC-INT-UNC-Z9999
- **[TC-VERSIONDIFF-VAL-03]** voidCapability values on SabreNdc/EGY responses: Book:(absent) x23, Hold:(absent) x18 - the field is absent on all of them Evidence: Book:(absent) x23, Hold:(absent) x18
- **[TC-VERSIONDIFF-VAL-04]** refundability values on SabreNdc/EGY Search and FareConfirm: "UnKnown" x96 Evidence: "UnKnown" x96
- **[TC-VERSIONDIFF-VAL-05]** documentType handling on SabreNdc/EGY V1 Hold: V1 Hold with documentType PASSPORT: accepted, echoed Passport | V1 Hold with documentType NATIONAL_ID: rejected at Hold (400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} cod) Evidence: V1 Hold with documentType PASSPORT: accepted, echoed Passport | V1 Hold with documentType NATIONAL_ID: rejected at Hold (400 {status,transactionId,errorCode,errorMessage,context,originalSupplierRequest,originalSupplierResponse} cod)

### Also re-confirmed

- **[TC-RETRIEVE-VAL-01] BUG-06** &mdash; V2 Retrieve after CancelAfterHold still reports bookingStatus "OnHold" (see TC-CANCELHOLD-REG-01 for the verdict)
- **[TC-VERSIONDIFF-NEG-01] BUG-07** &mdash; Two error envelopes were seen again in this run: camelCase {status, transactionId, errorCode:"1001", ..., originalSupplierRequest:null} for missing/invalid fields on Search, FareConfirm, Book, Hold, CancelAfterHold and FareCheck, and PascalCase {Status, TransactionId, ErrorCode:"NDC-INT-TEC-A0001"|"ServerError"|"OperationNotSupported"|"NDC-INT-UNC-Z9999"} for business-rule rejections (10 passengers, AddPassenger rules, bad offerId, unsupported operation).

## Proposed SPEC.md updates

- 4.6 Capability Summary Matrix (SabreNDC row) &mdash; status: *pending*
  - **Old:** "| SabreNDC | Unknown | Unknown | Supported | Supported | Unknown | Unknown | Unknown |"
  - **New:** "| SabreNDC | Supported | Not Supported | Supported | Supported | Supported | Not Supported | Not Supported |"
  - **Correction:** Confirmed live 2026-10-25, SabreNdc/EGY, V1+V2: Upselling 200; haveBundles=false and GetOfferBundles 409 OperationNotSupported; canBeHeld=true and Hold/BookAfterHold/CancelAfterHold work; ticketed bookings Void; offerHasAncillary=false and GetAncillary/FareCheck 409; isSeatMapRequired=false and GetSeatMap 409. The SabreNdc Void run of 2026-10-22 proposed the same Void/Bundle values.

- 1.2 Testing Note (V2/v2 casing) &mdash; status: *pending*
  - **Old:** "**Testing Note**: verify case-sensitivity of the routing layer once, then this is not a per-endpoint concern"
  - **New:** "**Testing Note** `[Confirmed live 2026-10-25, V2/SabreNdc/EGY]`: routing is case-insensitive. All 14 V2 endpoints answered identically (same status and ErrorCode, no 404) with `V2` and `v2` in the path, so the inconsistency is cosmetic."
  - **Correction:** TC-VERSIONDIFF-VAL-01

- 2.9 Negative Cases (double booking) &mdash; status: *pending*
  - **Old:** "booking twice with the same offer reference (double-booking attempt — `UNKNOWN` whether idempotently rejected or produces two PNRs)"
  - **New:** "booking twice with the same offer reference (double-booking attempt) `[Confirmed live 2026-10-25, V1+V2/SabreNdc/EGY]`: the second Book is NOT rejected and creates a second live PNR with its own ticket (a defect: no idempotency)"
  - **Correction:** TC-BOOK-NEG-04

- 2.5 Business Logic (passenger mix) &mdash; status: *pending*
  - **Old:** "**not verified by any script**, but a mismatch is a strong candidate for a supplier-side rejection; `UNKNOWN` exact behavior."
  - **New:** "**not verified by any script**; `[Confirmed live 2026-10-25, V2/SabreNdc/EGY]` AddPassenger itself rejects a mix that differs from Search (HTTP 400, NDC-INT-TEC-A0001, PredicateValidator "Requested ... passenger count/type mismatch"), so nothing reaches Hold/Book."
  - **Correction:** TC-ADDPAX-VAL-01 (V2 run)

- 2.14 Common Errors (cancel a booked PNR) &mdash; status: *pending*
  - **Old:** "**Common Errors**: cancelling an already-booked (non-held) PNR; cancelling after hold expiration; cancelling twice."
  - **New:** "**Common Errors**: cancelling an already-booked (non-held) PNR `[Confirmed live 2026-10-25, V1+V2/SabreNdc/EGY: HTTP 409 NDC-INT-UNC-Z9999 with Context "Order fulfilled"; the ticketed booking stays intact]`; cancelling after hold expiration; cancelling twice."
  - **Correction:** TC-CANCELHOLD-NEG-02

## Cleanup / follow-up

Live artifacts left behind this round (1):

- **needs_void_cancel** &mdash; pnr none (null) &mdash; Nothing left behind: every Book / Hold / BookAfterHold PNR created in this run was voided or cancelled by the test that made it (audit of all recorded API calls: 80 PNRs created, 80 closed).

