# QA Execution Report — AirIndia / EGY - Full Regression - stg-ne-3 - V1 and V2 - 484 test cases

**Environment:** staging (ndc-integration-stg-ne-3) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** AirIndia  **Credentials Selector:** EGY
**Started:** 2026-11-02T10:44:52.226Z
**Ended:** 2026-11-02T11:14:44.969Z
**Status:** COMPLETE
**Prior runs:** see NDC_Integration/Artifacts/Logs/ (see NDC_Integration/Artifacts/Logs/)

## Scope note

Run of 484 test cases against supplier AirIndia, credentialsSelector EGY, staging stg-ne-3 (V1 and V2): 89 pass, 23 fail, 372 blocked. Sources: TestCases_Generic.csv (64), TestCases_V1.csv (59), TestCases_V2.csv (212), SeatMap_TestCases.csv (68; shared IDs get a suffix) plus 86 new AirIndia rows (AirIndia_EGY_Regression_TestCases.csv). AirIndia returned no inventory on any of 1,618 route/date searches, so no booking, hold, ticket or PNR was created and no cleanup is needed. Every row that needs an offer is BLOCKED, with the reason on the row; rows whose chain needs Hold, Void, Cancel, Upselling, FareCheck, FareRules or SeatAfterHold are marked not executable on AirIndia. Nothing was sent to any other supplier.

## Summary

- Test cases logged: 484 of 484 planned
- Passed: 89
- Failed: 23
- Blocked: 372
- Failed test cases: TC-AIEGY-SRCH-PAX-03, TC-AIEGY-GETOFFERBUNDLES-NEG-01, TC-AIEGY-GETOFFERBUNDLES-NEG-02, TC-AIEGY-GETOFFERBUNDLES-NEG-03, TC-AIEGY-SRCH-PAX-06, TC-BOOK-NEG-12, TC-AIEGY-BOOK-NEG-01, TC-AIEGY-BOOK-NEG-03, TC-AIEGY-CAP-01, TC-AIEGY-CAP-04, TC-VERSIONDIFF-NEG-01, TC-BOOK-VAL-01, TC-BOOK-VAL-02, TC-AIEGY-CAP-05, TC-SEARCH-SEC-01, TC-AIEGY-CHAIN-02, TC-AIEGY-EXP-01, TC-FARECONFIRM-VAL-01, TC-AIEGY-SEC-02, TC-AIEGY-SEC-LEAK-01, TC-AIEGY-ENV-01, TC-AIEGY-CAP-02, TC-SEARCH-POS-01
- Blocked test cases: TC-SEARCH-BND-02, TC-SEARCH-BIZ-02, TC-SEARCH-REG-01, TC-FARECONFIRM-POS-01, TC-FARECONFIRM-NEG-01, TC-FARECONFIRM-BIZ-02, TC-FARECONFIRM-INT-01, TC-FARECONFIRM-NEG-02, TC-BUNDLE-POS-01, TC-BUNDLE-NEG-01, TC-BUNDLE-REG-01, TC-BUNDLE-VAL-02, TC-BUNDLE-VAL-03, TC-BOOK-POS-02, TC-BOOK-NEG-04, TC-BOOK-BIZ-03, TC-BOOK-SEC-01, TC-BOOK-BIZ-04, TC-BOOK-NEG-05, TC-HOLD-POS-01, TC-HOLD-NEG-02, TC-HOLD-BIZ-01, TC-HOLD-BND-01, TC-RETRIEVE-POS-01, TC-RETRIEVE-REG-01, TC-RETRIEVE-VAL-01, TC-RETRIEVE-INT-01, TC-FCAH-BIZ-01, TC-FCAH-NEG-01, TC-BOOKAFTERHOLD-REG-01, TC-BOOKAFTERHOLD-NEG-01, TC-VOID-BIZ-01, TC-VOID-NEG-02, TC-CANCELHOLD-REG-01, TC-CANCELHOLD-NEG-02, TC-AUTH-SEC-03, TC-SUPPLIER-BIZ-01, TC-CAPCHECK-AirCairo-01, TC-CAPCHECK-EgyptAir-01, TC-CAPCHECK-Galileo-01, TC-CAPCHECK-SpiceJet-01, TC-CAPCHECK-GLC-01, TC-CAPCHECK-Indigo-01, TC-CAPCHECK-ElJazeera-01, TC-CAPCHECK-OmainAir-01, TC-VERSIONDIFF-BIZ-01, TC-VERSIONDIFF-VAL-03, TC-VERSIONDIFF-VAL-04, TC-VERSIONDIFF-VAL-05, FLOW-V1-01, FLOW-V1-01-NEG, FLOW-V1-02, FLOW-V1-02-NEG, FLOW-V1-03, FLOW-V1-03-NEG, FLOW-V1-04, FLOW-V1-04-NEG, FLOW-V1-05, FLOW-V1-05-NEG, FLOW-V1-06, FLOW-V1-06-NEG, FLOW-V1-07, FLOW-V1-07-NEG, FLOW-V1-08, FLOW-V1-08-NEG, FLOW-V1-09, FLOW-V1-09-NEG, FLOW-V1-10, FLOW-V1-10-NEG, FLOW-V1-11, FLOW-V1-11-NEG, FLOW-V1-12, FLOW-V1-12-NEG, FLOW-V1-13, FLOW-V1-13-NEG, FLOW-V1-14, FLOW-V1-14-NEG, FLOW-V1-15, FLOW-V1-15-NEG, FLOW-V1-16, FLOW-V1-16-NEG, FLOW-V1-17, FLOW-V1-17-NEG, FLOW-V1-18, FLOW-V1-18-NEG, FLOW-V1-19, FLOW-V1-19-NEG, FLOW-V1-20, FLOW-V1-20-NEG, FLOW-V1-21, FLOW-V1-21-NEG, FLOW-V1-22, FLOW-V1-22-NEG, FLOW-V1-23, FLOW-V1-23-NEG, FLOW-V1-24, FLOW-V1-24-NEG, TC-UPSELL-NEG-01, TC-BOOK-POS-01, TC-BOOK-NEG-01, TC-BOOK-NEG-02, TC-SEARCH-BIZ-01, TC-FARECONFIRM-BIZ-01, TC-BOOK-BIZ-01, TC-BOOK-BIZ-02, TC-BOOK-NEG-03, FLOW-V2-25, FLOW-V2-25-NEG, FLOW-V2-26, FLOW-V2-26-NEG, FLOW-V2-27, FLOW-V2-27-NEG, FLOW-V2-28, FLOW-V2-28-NEG, FLOW-V2-29, FLOW-V2-29-NEG, FLOW-V2-30, FLOW-V2-30-NEG, FLOW-V2-31, FLOW-V2-31-NEG, FLOW-V2-32, FLOW-V2-32-NEG, FLOW-V2-33, FLOW-V2-33-NEG, FLOW-V2-34, FLOW-V2-34-NEG, FLOW-V2-35, FLOW-V2-35-NEG, FLOW-V2-36, FLOW-V2-36-NEG, FLOW-V2-37, FLOW-V2-37-NEG, FLOW-V2-38, FLOW-V2-38-NEG, FLOW-V2-39, FLOW-V2-39-NEG, FLOW-V2-40, FLOW-V2-40-NEG, FLOW-V2-41, FLOW-V2-41-NEG, FLOW-V2-42, FLOW-V2-42-NEG, FLOW-V2-43, FLOW-V2-43-NEG, FLOW-V2-44, FLOW-V2-44-NEG, FLOW-V2-45, FLOW-V2-45-NEG, FLOW-V2-46, FLOW-V2-46-NEG, FLOW-V2-47, FLOW-V2-47-NEG, FLOW-V2-48, FLOW-V2-48-NEG, FLOW-V2-49, FLOW-V2-49-NEG, FLOW-V2-50, FLOW-V2-50-NEG, FLOW-V2-51, FLOW-V2-51-NEG, FLOW-V2-52, FLOW-V2-52-NEG, FLOW-V2-53, FLOW-V2-53-NEG, FLOW-V2-54, FLOW-V2-54-NEG, FLOW-V2-55, FLOW-V2-55-NEG, FLOW-V2-56, FLOW-V2-56-NEG, FLOW-V2-57, FLOW-V2-57-NEG, FLOW-V2-58, FLOW-V2-58-NEG, FLOW-V2-59, FLOW-V2-59-NEG, FLOW-V2-60, FLOW-V2-60-NEG, FLOW-V2-61, FLOW-V2-61-NEG, FLOW-V2-62, FLOW-V2-62-NEG, FLOW-V2-63, FLOW-V2-63-NEG, FLOW-V2-64, FLOW-V2-64-NEG, FLOW-V2-65, FLOW-V2-65-NEG, FLOW-V2-66, FLOW-V2-66-NEG, FLOW-V2-67, FLOW-V2-67-NEG, FLOW-V2-68, FLOW-V2-68-NEG, FLOW-V2-69, FLOW-V2-69-NEG, FLOW-V2-70, FLOW-V2-70-NEG, FLOW-V2-71, FLOW-V2-71-NEG, FLOW-V2-72, FLOW-V2-72-NEG, FLOW-V2-73, FLOW-V2-73-NEG, FLOW-V2-74, FLOW-V2-74-NEG, FLOW-V2-75, FLOW-V2-75-NEG, FLOW-V2-76, FLOW-V2-76-NEG, FLOW-V2-77, FLOW-V2-77-NEG, FLOW-V2-78, FLOW-V2-78-NEG, FLOW-V2-79, FLOW-V2-79-NEG, FLOW-V2-80, FLOW-V2-80-NEG, FLOW-V2-81, FLOW-V2-81-NEG, FLOW-V2-82, FLOW-V2-82-NEG, FLOW-V2-83, FLOW-V2-83-NEG, FLOW-V2-84, FLOW-V2-84-NEG, FLOW-V2-85, FLOW-V2-85-NEG, FLOW-V2-86, FLOW-V2-86-NEG, FLOW-V2-87, FLOW-V2-87-NEG, FLOW-V2-88, FLOW-V2-88-NEG, FLOW-V2-89, FLOW-V2-89-NEG, FLOW-V2-90, FLOW-V2-90-NEG, FLOW-V2-91, FLOW-V2-91-NEG, FLOW-V2-92, FLOW-V2-92-NEG, FLOW-V2-93, FLOW-V2-93-NEG, FLOW-V2-94, FLOW-V2-94-NEG, FLOW-V2-95, FLOW-V2-95-NEG, FLOW-V2-96, FLOW-V2-96-NEG, FLOW-V2-97, FLOW-V2-97-NEG, FLOW-V2-98, FLOW-V2-98-NEG, FLOW-V2-99, FLOW-V2-99-NEG, FLOW-V2-100, FLOW-V2-100-NEG, FLOW-V2-101, FLOW-V2-101-NEG, FLOW-V2-102, FLOW-V2-102-NEG, FLOW-V2-103, FLOW-V2-103-NEG, FLOW-V2-104, FLOW-V2-104-NEG, FLOW-V2-105, FLOW-V2-105-NEG, FLOW-V2-106, FLOW-V2-106-NEG, FLOW-V2-107, FLOW-V2-107-NEG, FLOW-V2-108, FLOW-V2-108-NEG, FLOW-V2-109, FLOW-V2-109-NEG, FLOW-V2-110, FLOW-V2-110-NEG, FLOW-V2-111, FLOW-V2-111-NEG, FLOW-V2-112, FLOW-V2-112-NEG, FLOW-V2-113, FLOW-V2-113-NEG, FLOW-V2-114, FLOW-V2-114-NEG, FLOW-V2-115, FLOW-V2-115-NEG, FLOW-V2-116, FLOW-V2-116-NEG, FLOW-V2-117, FLOW-V2-117-NEG, FLOW-V2-118, FLOW-V2-118-NEG, FLOW-V2-119, FLOW-V2-119-NEG, FLOW-V2-120, FLOW-V2-120-NEG, TC-ADDPAX-POS-01, TC-ADDPAX-NEG-01, TC-ADDPAX-NEG-02, TC-ADDPAX-VAL-01, TC-ADDPAX-BND-01, TC-ANCILLARY-POS-01, TC-ANCILLARY-NEG-01, TC-ANCILLARY-VAL-01, TC-ANCILLARY-BND-01, TC-SEATMAP-POS-01, TC-SEATMAP-NEG-01, TC-SEATMAP-VAL-01, TC-FARECHECK-POS-01, TC-FARECHECK-NEG-01, TC-FARECHECK-INT-01, TC-FARECHECK-BND-01, TC-BUNDLE-VAL-01, TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-SEATMAP-BND-02, TC-SEATMAP-BIZ-02, TC-SEATMAP-REG-02, TC-BOOK-POS-03, TC-BOOK-NEG-05-SM, TC-BOOK-NEG-06, TC-BOOK-VAL-06, TC-BOOK-BIZ-04-SM, TC-BOOK-INT-03, TC-BOOK-BND-03, TC-BOOK-REG-02, TC-SEATAFTERHOLD-POS-01, TC-SEATAFTERHOLD-VAL-01, TC-SEATAFTERHOLD-NEG-02, TC-SEATAFTERHOLD-INT-04, FLOW-V2-49-SEATFIELD, FLOW-V2-50-SEATFIELD, FLOW-V2-CANDIDATE-SM-HOLD-01, FLOW-V2-CANDIDATE-SM-HOLD-02, FLOW-V2-CANDIDATE-SM-HOLD-03, FLOW-V2-CANDIDATE-SM-HOLD-01-NEG, TC-BOOK-BIZ-05, TC-BOOK-NEG-07, TC-BOOK-NEG-08, TC-BOOK-BIZ-06, TC-BOOK-NEG-09, TC-BOOK-VAL-07, TC-BOOK-BIZ-07, TC-BOOK-VAL-08, TC-BOOK-REG-03, TC-BOOK-NEG-10, TC-BOOK-NEG-11, TC-SEATMAP-VAL-05, TC-SEATMAP-BND-03, TC-SEATMAP-VAL-06, TC-RETRIEVE-REG-01-SM, TC-BOOK-INT-04, TC-SEATAFTERHOLD-VAL-02, TC-SEATMAP-POS-01-SM, TC-SEATMAP-NEG-01-SM, TC-SEATMAP-NEG-02, TC-SEATMAP-NEG-05, TC-SEATMAP-VAL-07, TC-SEATMAP-VAL-08, TC-SEATMAP-VAL-09, TC-SEATMAP-VAL-10, TC-SEATMAP-BIZ-03, TC-SEATMAP-BIZ-04, TC-SEATMAP-SEC-02, TC-SEATMAP-INT-02, TC-SEATMAP-INT-03, TC-SEATMAP-VAL-11, TC-SEATMAP-BND-04, TC-BOOK-POS-04

## Test case results

### TC-SEARCH-NEG-01 — PASS

- **Test Case:** [Search][Request] Validate Search request is rejected when the supplier field is omitted.
- **Category:** NEG
- **Endpoint Name:** Search
- **Request:** 2 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V2 supplier omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier | V1 supplier omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
- **Status:** PASS
- **Evidence:** V2 supplier omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 supplier omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier

  - **Hop 1 &mdash; V1 Search (supplier_omitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.4s)
  - **Hop 2 &mdash; V2 Search (supplier_omitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.4s)

### TC-AIEGY-FARECONFIRM-NEG-01 — PASS

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** FareConfirm
- **Request:** 2 call(s): V2 FareConfirm, V1 FareConfirm
- **Response:** V2 400, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer | V1 unknown ids: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V1 unknown ids: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out

  - **Hop 1 &mdash; V2 FareConfirm (unknown_ids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.4s)
  - **Hop 2 &mdash; V1 FareConfirm (unknown_ids):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (135.9s)

### TC-SEARCH-NEG-02 — PASS

- **Test Case:** [Search][Request] Validate Search request is rejected when searchCriteria is omitted.
- **Category:** NEG
- **Endpoint Name:** Search
- **Request:** 2 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V2 searchCriteria omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. | V1 searchCriteria omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required.
- **Status:** PASS
- **Evidence:** V2 searchCriteria omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required.
V1 searchCriteria omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required.

  - **Hop 1 &mdash; V1 Search (searchCriteria_omitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. (0.5s)
  - **Hop 2 &mdash; V2 Search (searchCriteria_omitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. (0.4s)

### TC-AIEGY-SRCH-SUP-02 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for an unknown supplier name (AirIndiaX, Air India, AI).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400, V2 400, V2 400, V1 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 6 variant calls behaved as expected: V2 supplier Air India: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. | V1 supplier AirIndiaX: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. ...
- **Status:** PASS
- **Evidence:** V2 supplier Air India: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 supplier AirIndiaX: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 supplier AI: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 supplier AirIndiaX: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 supplier Air India: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 supplier AI: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.

  - **Hop 1 &mdash; V1 Search (supplier_AirIndiaX):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 2 &mdash; V1 Search (supplier_Air_India):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 3 &mdash; V2 Search (supplier_Air_India):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 4 &mdash; V2 Search (supplier_AI):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 5 &mdash; V2 Search (supplier_AirIndiaX):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 6 &mdash; V1 Search (supplier_AI):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)

### TC-AIEGY-SRCH-SUP-01 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when supplier is null or an empty string.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 400, V1 400, V2 400, V2 400, V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 6 variant calls behaved as expected: V1 supplier "  ": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. | V1 supplier null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. ...
- **Status:** PASS
- **Evidence:** V1 supplier "  ": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 supplier null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 supplier null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 supplier "  ": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 supplier "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 supplier "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.

  - **Hop 1 &mdash; V1 Search (supplier_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 2 &mdash; V1 Search (supplier_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 3 &mdash; V2 Search (supplier_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 4 &mdash; V1 Search (supplier_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 5 &mdash; V2 Search (supplier_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 6 &mdash; V2 Search (supplier_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.9s)

### TC-AIEGY-SRCH-CRED-02 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for an unknown or inactive credentialsSelector (ZZZ, UAE, KSA).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400, V1 400, V2 400, V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 6 variant calls behaved as expected: V1 credentialsSelector ZZZ: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. | V2 credentialsSelector ZZZ: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. ...
- **Status:** PASS
- **Evidence:** V1 credentialsSelector ZZZ: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 credentialsSelector ZZZ: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 credentialsSelector KSA: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
V2 credentialsSelector UAE: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
V2 credentialsSelector KSA: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
V1 credentialsSelector UAE: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th

  - **Hop 1 &mdash; V1 Search (credentialsSelector_ZZZ):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.9s)
  - **Hop 2 &mdash; V2 Search (credentialsSelector_ZZZ):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.9s)
  - **Hop 3 &mdash; V1 Search (credentialsSelector_KSA):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (0.9s)
  - **Hop 4 &mdash; V1 Search (credentialsSelector_UAE):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (1.2s)
  - **Hop 5 &mdash; V2 Search (credentialsSelector_UAE):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (1.2s)
  - **Hop 6 &mdash; V2 Search (credentialsSelector_KSA):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (1.2s)

### TC-AIEGY-SRCH-CRED-01 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when credentialsSelector is omitted, null or empty.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V2 Search, V1 Search
- **Response:** V2 400, V2 400, V2 400, V1 400, V1 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 6 variant calls behaved as expected: V2 credentialsSelector null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. | V2 credentialsSelector "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. ...
- **Status:** PASS
- **Evidence:** V2 credentialsSelector null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 credentialsSelector "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 credentialsSelector omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 credentialsSelector null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 credentialsSelector "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 credentialsSelector omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector

  - **Hop 1 &mdash; V1 Search (credentialsSelector_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.9s)
  - **Hop 2 &mdash; V1 Search (credentialsSelector_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (1.2s)
  - **Hop 3 &mdash; V1 Search (credentialsSelector_omit):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (1.4s)
  - **Hop 4 &mdash; V2 Search (credentialsSelector_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 5 &mdash; V2 Search (credentialsSelector_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 6 &mdash; V2 Search (credentialsSelector_omit):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.7s)

### TC-AIEGY-SRCH-SC-04 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for a departure date in the past.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 4 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400, V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 4 variant calls behaved as expected: V2 date 2020-01-01: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past. | V1 date 2026-10-01: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past. ...
- **Status:** PASS
- **Evidence:** V2 date 2020-01-01: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past.
V1 date 2026-10-01: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past.
V2 date 2026-10-01: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past.
V1 date 2020-01-01: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past.

  - **Hop 1 &mdash; V1 Search (date_2026_10_01):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past. (0.4s)
  - **Hop 2 &mdash; V2 Search (date_2020_01_01):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past. (0.4s)
  - **Hop 3 &mdash; V2 Search (date_2026_10_01):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past. (0.4s)
  - **Hop 4 &mdash; V1 Search (date_2020_01_01):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date cannot be in the past. (0.4s)

### TC-AIEGY-SRCH-SC-03 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when origin equals destination.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V1 DEL-DEL: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin and Destination cannot be the same. | V2 DEL-DEL: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin and Destination cannot be the same.
- **Status:** PASS
- **Evidence:** V1 DEL-DEL: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin and Destination cannot be the same.
V2 DEL-DEL: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin and Destination cannot be the same.

  - **Hop 1 &mdash; V1 Search (DEL_DEL):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin and Destination cannot be the same. (0.6s)
  - **Hop 2 &mdash; V2 Search (DEL_DEL):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin and Destination cannot be the same. (0.9s)

### TC-AIEGY-SRCH-SC-05 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for malformed date values (25/11/2026, 2026-13-45, abc, empty).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 8 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400, V2 400, V2 400, V1 400, V1 400, V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 8 variant calls behaved as expected: V1 date "abc": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. | V2 date "25/11/2026": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. ...
- **Status:** PASS
- **Evidence:** V1 date "abc": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 date "25/11/2026": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 date "abc": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 date "2026-13-45": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 date "2026-13-45": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 date "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 date "25/11/2026": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 date "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.

  - **Hop 1 &mdash; V1 Search (date_25_11_2026_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.4s)
  - **Hop 2 &mdash; V1 Search (date_abc_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.2s)
  - **Hop 3 &mdash; V2 Search (date_25_11_2026_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.2s)
  - **Hop 4 &mdash; V2 Search (date_abc_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.2s)
  - **Hop 5 &mdash; V2 Search (date_2026_13_45_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.2s)
  - **Hop 6 &mdash; V1 Search (date_2026_13_45_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.2s)
  - **Hop 7 &mdash; V1 Search (date_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.4s)
  - **Hop 8 &mdash; V2 Search (date_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.6s)

### TC-AIEGY-SRCH-SC-02 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when origin, destination or date is missing from a segment.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 400, V1 400, V2 400, V2 400, V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 6 variant calls behaved as expected: V1 destination missing: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Destination field is required. | V1 origin missing: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. ...
- **Status:** PASS
- **Evidence:** V1 destination missing: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Destination field is required.
V1 origin missing: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required.
V2 destination missing: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Destination field is required.
V2 origin missing: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required.
V2 date missing: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date is required.
V1 date missing: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date is required.

  - **Hop 1 &mdash; V1 Search (destination_missing):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Destination field is required. (0.8s)
  - **Hop 2 &mdash; V1 Search (origin_missing):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. (0.8s)
  - **Hop 3 &mdash; V2 Search (destination_missing):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Destination field is required. (0.8s)
  - **Hop 4 &mdash; V2 Search (origin_missing):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. (0.8s)
  - **Hop 5 &mdash; V2 Search (date_missing):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date is required. (1.5s)
  - **Hop 6 &mdash; V1 Search (date_missing):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Date is required. (1.5s)

### TC-AIEGY-SRCH-SC-01 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when searchCriteria is an empty array or null.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 4 call(s): V1 Search, V2 Search
- **Response:** V1 400, V1 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 4 variant calls behaved as expected: V1 searchCriteria []: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one search criteria | V1 searchCriteria null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. ...
- **Status:** PASS
- **Evidence:** V1 searchCriteria []: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one search criteria
V1 searchCriteria null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required.
V2 searchCriteria []: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one search criteria
V2 searchCriteria null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required.

  - **Hop 1 &mdash; V1 Search (searchCriteria_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one search criteria (0.9s)
  - **Hop 2 &mdash; V1 Search (searchCriteria_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. (0.9s)
  - **Hop 3 &mdash; V2 Search (searchCriteria_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one search criteria (2.0s)
  - **Hop 4 &mdash; V2 Search (searchCriteria_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. (2.0s)

### TC-AIEGY-SRCH-SC-08 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when a round trip returns before it departs.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V1 out 2026-11-25, back 2026-11-20: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Flight dates must be in chronological order. | V2 out 2026-11-25, back 2026-11-20: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Flight dates must be in chronological order.
- **Status:** PASS
- **Evidence:** V1 out 2026-11-25, back 2026-11-20: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Flight dates must be in chronological order.
V2 out 2026-11-25, back 2026-11-20: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Flight dates must be in chronological order.

  - **Hop 1 &mdash; V1 Search (out_2026_11_25_back_2026):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Flight dates must be in chronological order. (0.5s)
  - **Hop 2 &mdash; V2 Search (out_2026_11_25_back_2026):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Flight dates must be in chronological order. (0.5s)

### TC-AIEGY-SRCH-SC-06 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for malformed IATA codes (DE, DELH, 123, empty, null).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 10 call(s): V1 Search, V2 Search
- **Response:** V1 400, V1 400, V1 400, V1 400, V2 400, V2 400, V2 400, V2 400, V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 10 variant calls behaved as expected: V1 origin null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. | V1 origin "DELH": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The field Origin must be a string or array type with a maximum length of '3'. ...
- **Status:** PASS
- **Evidence:** V1 origin null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required.
V1 origin "DELH": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The field Origin must be a string or array type with a maximum length of '3'.
V1 origin "123": rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters.
V1 origin "DE": rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters.
V2 origin "DE": rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters.
V2 origin null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required.
V2 origin "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required.
V2 origin "123": rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters.
V1 origin "": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required.
V2 origin "DELH": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The field Origin must be a string or array type with a maximum length of '3'.

  - **Hop 1 &mdash; V1 Search (origin_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. (0.9s)
  - **Hop 2 &mdash; V1 Search (origin_DELH_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The field Origin must be a string or array type with a maximum length of '3'. (0.9s)
  - **Hop 3 &mdash; V1 Search (origin_123_):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters. (0.9s)
  - **Hop 4 &mdash; V1 Search (origin_DE_):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters. (0.9s)
  - **Hop 5 &mdash; V2 Search (origin_DE_):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters. (0.9s)
  - **Hop 6 &mdash; V1 Search (origin_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. (1.2s)
  - **Hop 7 &mdash; V2 Search (origin_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. (0.9s)
  - **Hop 8 &mdash; V2 Search (origin_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Origin field is required. (1.2s)
  - **Hop 9 &mdash; V2 Search (origin_123_):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Origin must be exactly 3 alphabetic characters. (1.2s)
  - **Hop 10 &mdash; V2 Search (origin_DELH_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The field Origin must be a string or array type with a maximum length of '3'. (1.2s)

### TC-AIEGY-SRCH-SC-09 — PASS

- **Test Case:** [Search][Request] Validate Search behaviour for an identical segment repeated twice and for more than two segments (multi-city).
- **Category:** Boundary
- **Endpoint Name:** Search
- **Request:** 4 call(s): V2 Search, V1 Search
- **Response:** V2 409, V1 400, V1 400, V2 400
- **Expected:** No 5xx; the observed behaviour is recorded as the baseline (SPEC.md marks it UNKNOWN).
- **Actual:** All 4 variant calls behaved as expected: V2 4 segments: behaviour recorded - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The supplier does not support multi city searches | V1 4 segments: behaviour recorded - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The supplier does not support multi city searches ...
- **Status:** PASS
- **Evidence:** V2 4 segments: behaviour recorded - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The supplier does not support multi city searches
V1 4 segments: behaviour recorded - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The supplier does not support multi city searches
V1 segment repeated: behaviour recorded - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Duplicate journey segments found: DEL-BOM-2026-11-25
V2 segment repeated: behaviour recorded - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Duplicate journey segments found: DEL-BOM-2026-11-25

  - **Hop 1 &mdash; V1 Search (segment_repeated):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Duplicate journey segments found: DEL-BOM-2026-11-25 (0.7s)
  - **Hop 2 &mdash; V2 Search (4_segments):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The supplier does not support multi city searches (0.7s)
  - **Hop 3 &mdash; V1 Search (4_segments):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The supplier does not support multi city searches (0.7s)
  - **Hop 4 &mdash; V2 Search (segment_repeated):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Duplicate journey segments found: DEL-BOM-2026-11-25 (0.7s)

### TC-AIEGY-SRCH-PAX-01 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when passengers is omitted, null or empty.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400, V2 400, V1 400, V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 6 variant calls behaved as expected: V1 passengers omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required. | V2 passengers omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required. ...
- **Status:** PASS
- **Evidence:** V1 passengers omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required.
V2 passengers omitted: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required.
V2 passengers null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required.
V1 passengers []: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one passenger type along with its count
V2 passengers []: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one passenger type along with its count
V1 passengers null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required.

  - **Hop 1 &mdash; V1 Search (passengers_omitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required. (0.7s)
  - **Hop 2 &mdash; V2 Search (passengers_omitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required. (0.7s)
  - **Hop 3 &mdash; V2 Search (passengers_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required. (0.7s)
  - **Hop 4 &mdash; V1 Search (passengers_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one passenger type along with its count (0.7s)
  - **Hop 5 &mdash; V1 Search (passengers_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Passengers field is required. (0.7s)
  - **Hop 6 &mdash; V2 Search (passengers_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Enter at least one passenger type along with its count (0.7s)

### TC-AIEGY-SRCH-PAX-04 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for an infant travelling with no adult (INF 1).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 2 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V2 INF 1 only: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. | V1 INF 1 only: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.
- **Status:** PASS
- **Evidence:** V2 INF 1 only: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.
V1 INF 1 only: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.

  - **Hop 1 &mdash; V2 Search (INF_1_only):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.2s)
  - **Hop 2 &mdash; V1 Search (INF_1_only):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.2s)

### TC-AIEGY-SRCH-PAX-02 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for a zero, negative, fractional or non-numeric passenger count.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 8 call(s): V1 Search, V2 Search
- **Response:** V1 400, V1 400, V1 400, V2 400, V1 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 8 variant calls behaved as expected: V1 ADT count 1.5: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. | V1 ADT count -1: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 ...
- **Status:** PASS
- **Evidence:** V1 ADT count 1.5: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V1 ADT count -1: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9
V1 ADT count 0: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9
V2 ADT count 0: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9
V1 ADT count "abc": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 ADT count 1.5: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 ADT count -1: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9
V2 ADT count "abc": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.

  - **Hop 1 &mdash; V1 Search (ADT_count_1_5):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.7s)
  - **Hop 2 &mdash; V1 Search (ADT_count_1):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 (0.7s)
  - **Hop 3 &mdash; V1 Search (ADT_count_0):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 (0.7s)
  - **Hop 4 &mdash; V2 Search (ADT_count_0):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 (0.7s)
  - **Hop 5 &mdash; V1 Search (ADT_count_abc_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.9s)
  - **Hop 6 &mdash; V2 Search (ADT_count_1_5):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.9s)
  - **Hop 7 &mdash; V2 Search (ADT_count_1):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 (0.9s)
  - **Hop 8 &mdash; V2 Search (ADT_count_abc_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.9s)

### TC-AIEGY-SRCH-PAX-05 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when there are more infants than adults (ADT 1, INF 2).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V1 ADT 1 + INF 2: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. | V2 ADT 1 + INF 2: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.
- **Status:** PASS
- **Evidence:** V1 ADT 1 + INF 2: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.
V2 ADT 1 + INF 2: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.

  - **Hop 1 &mdash; V1 Search (ADT_1_INF_2):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.5s)
  - **Hop 2 &mdash; V2 Search (ADT_1_INF_2):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.5s)

### TC-SEARCH-BND-01 — PASS

- **Test Case:** [Search] [Request] Validate a Search requesting 10 total passengers (one over the confirmed 9-passenger maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** Search
- **Request:** 2 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V2 10 ADT: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 | V1 10 ADT: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9
- **Status:** PASS
- **Evidence:** V2 10 ADT: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9
V1 10 ADT: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9

  - **Hop 1 &mdash; V2 Search (10_ADT):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 (0.5s)
  - **Hop 2 &mdash; V1 Search (10_ADT):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Passenger count must be between 1 and 9 (0.5s)

### TC-SEARCH-BND-03 — PASS

- **Test Case:** [Search][Request] Validate Search rejects a total passenger count of 10, one over the confirmed 9-passenger maximum.
- **Category:** BND
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 variant calls behaved as expected: V1 9 ADT + 1 CHD: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9. | V2 9 ADT + 1 CHD: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9.
- **Status:** PASS
- **Evidence:** V1 9 ADT + 1 CHD: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9.
V2 9 ADT + 1 CHD: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9.

  - **Hop 1 &mdash; V1 Search (9_ADT_1_CHD):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9. (0.5s)
  - **Hop 2 &mdash; V2 Search (9_ADT_1_CHD):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9. (0.5s)

### TC-AIEGY-SRCH-PAX-07 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for an unknown passengerTypeCode (XXX) and for ADT listed twice.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 4 call(s): V2 Search, V1 Search
- **Response:** V2 400, V2 400, V1 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 4 variant calls behaved as expected: V2 type XXX: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. | V2 ADT listed twice: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger Type Codes (PTC) must be unique. ...
- **Status:** PASS
- **Evidence:** V2 type XXX: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.
V2 ADT listed twice: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger Type Codes (PTC) must be unique.
V1 ADT listed twice: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger Type Codes (PTC) must be unique.
V1 type XXX: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required.

  - **Hop 1 &mdash; V1 Search (type_XXX):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.3s)
  - **Hop 2 &mdash; V2 Search (type_XXX):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.3s)
  - **Hop 3 &mdash; V2 Search (ADT_listed_twice):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger Type Codes (PTC) must be unique. (0.3s)
  - **Hop 4 &mdash; V1 Search (ADT_listed_twice):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger Type Codes (PTC) must be unique. (0.3s)

### TC-AIEGY-SRCH-BODY-01 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for an empty JSON object body and for a missing body.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 4 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400, V2 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 4 variant calls behaved as expected: V2 body {}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier | V1 body {}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier ...
- **Status:** PASS
- **Evidence:** V2 body {}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 body {}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 no body: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: A non-empty request body is required.
V1 no body: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: A non-empty request body is required.

  - **Hop 1 &mdash; V1 Search (body_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V2 Search (body_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 3 &mdash; V2 Search (no_body):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: A non-empty request body is required. (0.3s)
  - **Hop 4 &mdash; V1 Search (no_body):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: A non-empty request body is required. (0.3s)

### TC-AIEGY-SRCH-BODY-02 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for malformed JSON (unclosed brace, trailing comma, single quotes).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V2 Search, V1 Search
- **Response:** V2 400, V1 400, V2 400, V2 400, V1 400, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 6 variant calls behaved as expected: V2 raw {"supplier":"AirIndia": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Expected depth to be zero at the end of the JSON payload. There is an open JSON object or  | V1 raw {"supplier":"AirIndia": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Expected depth to be zero at the end of the JSON payload. There is an open JSON object or  ...
- **Status:** PASS
- **Evidence:** V2 raw {"supplier":"AirIndia": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Expected depth to be zero at the end of the JSON payload. There is an open JSON object or 
V1 raw {"supplier":"AirIndia": rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Expected depth to be zero at the end of the JSON payload. There is an open JSON object or 
V2 raw {'supplier':'AirIndia'}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: ''' is an invalid start of a property name. Expected a '"'. Path: $ | LineNumber: 0 | Byte
V2 raw {"supplier":"AirIndia",}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The JSON object contains a trailing comma at the end which is not supported in this mode. 
V1 raw {'supplier':'AirIndia'}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: ''' is an invalid start of a property name. Expected a '"'. Path: $ | LineNumber: 0 | Byte
V1 raw {"supplier":"AirIndia",}: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The JSON object contains a trailing comma at the end which is not supported in this mode. 

  - **Hop 1 &mdash; V2 Search (raw_supplier_AirIndia_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Expected depth to be zero at the end of the JSON payload. There is an open JSON object or  (0.2s)
  - **Hop 2 &mdash; V1 Search (raw_supplier_AirIndia_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Expected depth to be zero at the end of the JSON payload. There is an open JSON object or  (0.2s)
  - **Hop 3 &mdash; V2 Search (raw_supplier_AirIndia_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: ''' is an invalid start of a property name. Expected a '"'. Path: $ | LineNumber: 0 | Byte (0.2s)
  - **Hop 4 &mdash; V2 Search (raw_supplier_AirIndia_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The JSON object contains a trailing comma at the end which is not supported in this mode.  (0.2s)
  - **Hop 5 &mdash; V1 Search (raw_supplier_AirIndia_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: ''' is an invalid start of a property name. Expected a '"'. Path: $ | LineNumber: 0 | Byte (0.2s)
  - **Hop 6 &mdash; V1 Search (raw_supplier_AirIndia_):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The JSON object contains a trailing comma at the end which is not supported in this mode.  (0.2s)

### TC-AIEGY-SRCH-BODY-03 — PASS

- **Test Case:** [Search][Request] Validate Search rejects a text/plain and an XML content type.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 4 call(s): V1 Search, V2 Search
- **Response:** V1 400, V2 400, V1 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 4 variant calls behaved as expected: V1 text/plain: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." | V2 application/xml: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ...
- **Status:** PASS
- **Evidence:** V1 text/plain: rejected as expected - 400 1001 "Validation errors occurred. Please check your request."
V2 application/xml: rejected as expected - 400 1001 "Validation errors occurred. Please check your request."
V1 application/xml: rejected as expected - 400 1001 "Validation errors occurred. Please check your request."
V2 text/plain: rejected as expected - 400 1001 "Validation errors occurred. Please check your request."

  - **Hop 1 &mdash; V1 Search (text_plain):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." (0.3s)
  - **Hop 2 &mdash; V1 Search (application_xml):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." (0.3s)
  - **Hop 3 &mdash; V2 Search (text_plain):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." (0.3s)
  - **Hop 4 &mdash; V2 Search (application_xml):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." (0.3s)

### TC-SEARCH-NEG-03 — PASS

- **Test Case:** [Search][Request] Validate Search behavior for an invalid or lowercase IATA origin/destination code.
- **Category:** NEG
- **Endpoint Name:** Search
- **Request:** 4 call(s): V2 Search, V1 Search
- **Response:** V2 200, V1 200, V1 200, V2 200
- **Expected:** No 5xx; the observed behaviour is recorded as the baseline (SPEC.md marks it UNKNOWN).
- **Actual:** All 4 variant calls behaved as expected: V2 origin XXX: behaviour recorded - 200 offers=0 | V1 origin del (lowercase): behaviour recorded - 200 offers=0 ...
- **Status:** PASS
- **Evidence:** V2 origin XXX: behaviour recorded - 200 offers=0
V1 origin del (lowercase): behaviour recorded - 200 offers=0
V1 origin XXX: behaviour recorded - 200 offers=0
V2 origin del (lowercase): behaviour recorded - 200 offers=0

  - **Hop 1 &mdash; V1 Search (origin_del_lowercase_):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 2 &mdash; V1 Search (origin_XXX):** PASS &mdash; 200 offers=0 (15.5s)
  - **Hop 3 &mdash; V2 Search (origin_XXX):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 4 &mdash; V2 Search (origin_del_lowercase_):** PASS &mdash; 200 offers=0 (15.5s)

### TC-AIEGY-SRCH-CRED-03 — PASS

- **Test Case:** [Search][Request] Validate how Search treats credentialsSelector casing and whitespace (egy, "EGY ").
- **Category:** Validation
- **Endpoint Name:** Search
- **Request:** 4 call(s): V2 Search, V1 Search
- **Response:** V2 200, V1 200, V2 200, V1 200
- **Expected:** No 5xx; the observed behaviour is recorded as the baseline (SPEC.md marks it UNKNOWN).
- **Actual:** All 4 variant calls behaved as expected: V2 credentialsSelector "EGY ": behaviour recorded - 200 offers=0 | V1 credentialsSelector "EGY ": behaviour recorded - 200 offers=0 ...
- **Status:** PASS
- **Evidence:** V2 credentialsSelector "EGY ": behaviour recorded - 200 offers=0
V1 credentialsSelector "EGY ": behaviour recorded - 200 offers=0
V2 credentialsSelector "egy": behaviour recorded - 200 offers=0
V1 credentialsSelector "egy": behaviour recorded - 200 offers=0

  - **Hop 1 &mdash; V1 Search (credentialsSelector_EGY_):** PASS &mdash; 200 offers=0 (15.7s)
  - **Hop 2 &mdash; V2 Search (credentialsSelector_egy_):** PASS &mdash; 200 offers=0 (15.7s)
  - **Hop 3 &mdash; V1 Search (credentialsSelector_egy_):** PASS &mdash; 200 offers=0 (15.8s)
  - **Hop 4 &mdash; V2 Search (credentialsSelector_EGY_):** PASS &mdash; 200 offers=0 (15.7s)

### TC-AUTH-SEC-02 — PASS

- **Test Case:** [Search][Request] Verify request behavior with a valid Client-Id versus an invalid Client-Id header value.
- **Category:** SEC
- **Endpoint Name:** Search
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 401, V1 401, V2 401, V1 401, V2 401, V2 401
- **Expected:** An invalid, empty or omitted Client-Id is rejected (4xx).
- **Actual:** All invalid Client-Id variants rejected
- **Status:** PASS
- **Evidence:** V1 empty Client-Id: rejected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V1 altered Client-Id: rejected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V2 omitted Client-Id: rejected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V1 omitted Client-Id: rejected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V2 altered Client-Id: rejected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V2 empty Client-Id: rejected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header

  - **Hop 1 &mdash; V1 Search (empty_Client-Id):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 2 &mdash; V1 Search (altered_Client-Id):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 3 &mdash; V2 Search (omitted_Client-Id):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 4 &mdash; V1 Search (omitted_Client-Id):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 5 &mdash; V2 Search (altered_Client-Id):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 6 &mdash; V2 Search (empty_Client-Id):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.3s)

### TC-AIEGY-SRCH-HTTP-01 — PASS

- **Test Case:** [Search][Request] Validate Search rejects non-POST HTTP methods (GET, PUT, DELETE) with 405.
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 405, V2 405, V2 405, V1 405, V1 405, V2 405
- **Expected:** 405 Method Not Allowed (or another 4xx), never 200 or 5xx.
- **Actual:** All non-POST methods rejected: 405/405/405/405/405/405
- **Status:** PASS
- **Evidence:** V1 PUT: 405
V2 DELETE: 405
V2 PUT: 405
V1 DELETE: 405
V1 GET: 405
V2 GET: 405

  - **Hop 1 &mdash; V1 Search (PUT):** PASS &mdash; 405  (0.1s)
  - **Hop 2 &mdash; V2 Search (PUT):** PASS &mdash; 405  (0.1s)
  - **Hop 3 &mdash; V1 Search (DELETE):** PASS &mdash; 405  (0.1s)
  - **Hop 4 &mdash; V1 Search (GET):** PASS &mdash; 405  (0.1s)
  - **Hop 5 &mdash; V2 Search (GET):** PASS &mdash; 405  (0.1s)
  - **Hop 6 &mdash; V2 Search (DELETE):** PASS &mdash; 405  (0.1s)

### TC-AIEGY-SRCH-SUP-03 — PASS

- **Test Case:** [Search][Request] Validate how Search treats supplier name casing and surrounding whitespace (airindia, AIRINDIA, " AirIndia").
- **Category:** Validation
- **Endpoint Name:** Search
- **Request:** 6 call(s): V2 Search, V1 Search
- **Response:** V2 200, V2 200, V2 200, V1 200, V1 200, V1 200
- **Expected:** No 5xx; the observed behaviour is recorded as the baseline (SPEC.md marks it UNKNOWN).
- **Actual:** All 6 variant calls behaved as expected: V2 supplier "airindia": behaviour recorded - 200 offers=0 | V2 supplier "AIRINDIA": behaviour recorded - 200 offers=0 ...
- **Status:** PASS
- **Evidence:** V2 supplier "airindia": behaviour recorded - 200 offers=0
V2 supplier "AIRINDIA": behaviour recorded - 200 offers=0
V2 supplier " AirIndia": behaviour recorded - 200 offers=0
V1 supplier "AIRINDIA": behaviour recorded - 200 offers=0
V1 supplier "airindia": behaviour recorded - 200 offers=0
V1 supplier " AirIndia": behaviour recorded - 200 offers=0

  - **Hop 1 &mdash; V1 Search (supplier_AIRINDIA_):** PASS &mdash; 200 offers=0 (15.7s)
  - **Hop 2 &mdash; V1 Search (supplier_airindia_):** PASS &mdash; 200 offers=0 (15.7s)
  - **Hop 3 &mdash; V1 Search (supplier_AirIndia_):** PASS &mdash; 200 offers=0 (16.9s)
  - **Hop 4 &mdash; V2 Search (supplier_airindia_):** PASS &mdash; 200 offers=0 (15.7s)
  - **Hop 5 &mdash; V2 Search (supplier_AIRINDIA_):** PASS &mdash; 200 offers=0 (15.7s)
  - **Hop 6 &mdash; V2 Search (supplier_AirIndia_):** PASS &mdash; 200 offers=0 (15.7s)

### TC-AIEGY-SRCH-SC-07 — PASS

- **Test Case:** [Search][Request] Validate Search behaviour for a departure date beyond the airline booking window (2028-12-01) and for today.
- **Category:** Boundary
- **Endpoint Name:** Search
- **Request:** 4 call(s): V1 Search, V2 Search
- **Response:** V1 200, V1 200, V2 200, V2 200
- **Expected:** No 5xx; the observed behaviour is recorded as the baseline (SPEC.md marks it UNKNOWN).
- **Actual:** All 4 variant calls behaved as expected: V1 date today 2026-11-02: behaviour recorded - 200 offers=0 | V1 date 2028-12-01: behaviour recorded - 200 offers=0 ...
- **Status:** PASS
- **Evidence:** V1 date today 2026-11-02: behaviour recorded - 200 offers=0
V1 date 2028-12-01: behaviour recorded - 200 offers=0
V2 date today 2026-11-02: behaviour recorded - 200 offers=0
V2 date 2028-12-01: behaviour recorded - 200 offers=0

  - **Hop 1 &mdash; V1 Search (date_today_2026_11_02):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 2 &mdash; V1 Search (date_2028_12_01):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 3 &mdash; V2 Search (date_today_2026_11_02):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 4 &mdash; V2 Search (date_2028_12_01):** PASS &mdash; 200 offers=0 (15.4s)

### TC-AIEGY-UPSELLING-NEG-01 — PASS

- **Test Case:** [UpSelling][Request] Validate UpSelling rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** UpSelling
- **Request:** 2 call(s): V1 Upselling, V2 Upselling
- **Response:** V1 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 Upselling (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 2 &mdash; V2 Upselling (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)

### TC-AIEGY-UPSELLING-NEG-02 — PASS

- **Test Case:** [UpSelling][Request] Validate UpSelling rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** UpSelling
- **Request:** 8 call(s): V1 Upselling, V2 Upselling
- **Response:** V1 400, V1 400, V1 409, V2 400, V2 400, V1 400, V2 409, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 8 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit searchResponseId: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit ResponseId: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector

  - **Hop 1 &mdash; V1 Upselling (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V1 Upselling (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.1s)
  - **Hop 3 &mdash; V1 Upselling (omit_searchResponseId):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 4 &mdash; V1 Upselling (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 5 &mdash; V2 Upselling (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 6 &mdash; V2 Upselling (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 7 &mdash; V2 Upselling (omit_ResponseId):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 8 &mdash; V2 Upselling (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.1s)

### TC-AIEGY-UPSELLING-NEG-03 — PASS

- **Test Case:** [UpSelling][Request] Validate UpSelling rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** UpSelling
- **Request:** 16 call(s): V1 Upselling, V2 Upselling
- **Response:** V1 400, V1 400, V1 400, V1 400, V1 400, V2 400, V1 400, V1 409, V2 400, V2 400, V2 409, V1 400, V2 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 searchResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V1 searchResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V1 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 searchResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 searchResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V1 selectedOfferId=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V2 selectedOfferId=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.
V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required.

  - **Hop 1 &mdash; V1 Upselling (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 2 &mdash; V1 Upselling (searchResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.1s)
  - **Hop 3 &mdash; V1 Upselling (searchResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.1s)
  - **Hop 4 &mdash; V1 Upselling (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 5 &mdash; V1 Upselling (searchResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.1s)
  - **Hop 6 &mdash; V1 Upselling (searchResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.1s)
  - **Hop 7 &mdash; V2 Upselling (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 8 &mdash; V1 Upselling (selectedOfferId_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 9 &mdash; V2 Upselling (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 10 &mdash; V2 Upselling (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.1s)
  - **Hop 11 &mdash; V2 Upselling (selectedOfferId_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 12 &mdash; V1 Upselling (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.2s)
  - **Hop 13 &mdash; V2 Upselling (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.2s)
  - **Hop 14 &mdash; V2 Upselling (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.2s)
  - **Hop 15 &mdash; V2 Upselling (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.2s)
  - **Hop 16 &mdash; V2 Upselling (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The upsellingRequestDto field is required. (0.2s)

### TC-AIEGY-SRCH-PAX-03 — FAIL

- **Test Case:** [Search][Request] Validate Search is rejected for a child travelling with no adult (CHD 1).
- **Category:** Negative
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 200, V2 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** 2 of 2 variant calls failed: V1 CHD 1 only: ACCEPTED invalid input (no rejection) - 200 offers=0 | V2 CHD 1 only: ACCEPTED invalid input (no rejection) - 200 offers=0
- **Status:** FAIL
- **Evidence:** V1 CHD 1 only: ACCEPTED invalid input (no rejection) - 200 offers=0
V2 CHD 1 only: ACCEPTED invalid input (no rejection) - 200 offers=0

  - **Hop 1 &mdash; V1 Search (CHD_1_only):** FAIL &mdash; 200 offers=0 (15.6s)
  - **Hop 2 &mdash; V2 Search (CHD_1_only):** FAIL &mdash; 200 offers=0 (15.6s)

### TC-AIEGY-GETOFFERBUNDLES-NEG-01 — FAIL

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** GetOfferBundles
- **Request:** 2 call(s): V2 GetOfferBundles, V1 GetOfferBundles
- **Response:** V2 400, V1 500
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 unknown ids: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V1 unknown ids: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."

  - **Hop 1 &mdash; V1 GetOfferBundles (unknown_ids):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.2s)
  - **Hop 2 &mdash; V2 GetOfferBundles (unknown_ids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.2s)

### TC-AIEGY-GETOFFERBUNDLES-NEG-02 — FAIL

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** GetOfferBundles
- **Request:** 8 call(s): V1 GetOfferBundles, V2 GetOfferBundles
- **Response:** V1 400, V1 400, V2 400, V1 400, V2 400, V2 400, V2 400, V1 500
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** 1 of 8 omit-field calls failed: V1 omit fareConfirmResponseId: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit ResponseId: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V1 omit fareConfirmResponseId: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."

  - **Hop 1 &mdash; V1 GetOfferBundles (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.2s)
  - **Hop 2 &mdash; V1 GetOfferBundles (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.2s)
  - **Hop 3 &mdash; V1 GetOfferBundles (omit_fareConfirmResponseId):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.3s)
  - **Hop 4 &mdash; V2 GetOfferBundles (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.2s)
  - **Hop 5 &mdash; V1 GetOfferBundles (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.2s)
  - **Hop 6 &mdash; V2 GetOfferBundles (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.2s)
  - **Hop 7 &mdash; V2 GetOfferBundles (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.2s)
  - **Hop 8 &mdash; V2 GetOfferBundles (omit_ResponseId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.2s)

### TC-AIEGY-GETOFFERBUNDLES-NEG-03 — FAIL

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** GetOfferBundles
- **Request:** 16 call(s): V1 GetOfferBundles, V2 GetOfferBundles
- **Response:** V1 400, V1 400, V1 400, V1 500, V2 400, V1 400, V2 400, V2 400, V1 400, V1 400, V2 400, V2 400, V1 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** 1 of 16 bad-id calls failed: V1 selectedOfferId=1000chars: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1 fareConfirmResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V1 fareConfirmResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V1 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V1 selectedOfferId=1000chars: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V1 fareConfirmResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V1 fareConfirmResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V1 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=1000chars: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required.

  - **Hop 1 &mdash; V1 GetOfferBundles (fareConfirmResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 2 &mdash; V1 GetOfferBundles (fareConfirmResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 3 &mdash; V1 GetOfferBundles (fareConfirmResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 4 &mdash; V1 GetOfferBundles (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 5 &mdash; V1 GetOfferBundles (selectedOfferId_1000chars):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.3s)
  - **Hop 6 &mdash; V2 GetOfferBundles (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 7 &mdash; V2 GetOfferBundles (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 8 &mdash; V1 GetOfferBundles (fareConfirmResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 9 &mdash; V1 GetOfferBundles (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 10 &mdash; V2 GetOfferBundles (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 11 &mdash; V1 GetOfferBundles (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 12 &mdash; V2 GetOfferBundles (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 13 &mdash; V2 GetOfferBundles (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.3s)
  - **Hop 14 &mdash; V2 GetOfferBundles (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 15 &mdash; V2 GetOfferBundles (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 16 &mdash; V2 GetOfferBundles (selectedOfferId_1000chars):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.3s)

### TC-AIEGY-SRCH-PAX-06 — FAIL

- **Test Case:** [Search][Request] Validate Search rejects a party of 10 that is over the limit only because of infants (6 ADT, 2 CHD, 2 INF).
- **Category:** Boundary
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 200, V2 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** 2 of 2 variant calls failed: V1 6 ADT + 2 CHD + 2 INF: ACCEPTED invalid input (no rejection) - 200 offers=0 | V2 6 ADT + 2 CHD + 2 INF: ACCEPTED invalid input (no rejection) - 200 offers=0
- **Status:** FAIL
- **Evidence:** V1 6 ADT + 2 CHD + 2 INF: ACCEPTED invalid input (no rejection) - 200 offers=0
V2 6 ADT + 2 CHD + 2 INF: ACCEPTED invalid input (no rejection) - 200 offers=0

  - **Hop 1 &mdash; V1 Search (6_ADT_2_CHD_2_INF):** FAIL &mdash; 200 offers=0 (15.4s)
  - **Hop 2 &mdash; V2 Search (6_ADT_2_CHD_2_INF):** FAIL &mdash; 200 offers=0 (15.4s)

### TC-AIEGY-ADDPASSENGER-NEG-01 — PASS

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** AddPassenger
- **Request:** 1 call(s): V2 AddPassenger
- **Response:** V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V2 AddPassenger (unknown_ids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.5s)

### TC-AIEGY-ADDPASSENGER-NEG-02 — PASS

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** AddPassenger
- **Request:** 6 call(s): V2 AddPassenger
- **Response:** V2 400, V2 400, V2 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 6 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit ResponseId: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 omit contactsList: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference
V2 omit passengersList: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.

  - **Hop 1 &mdash; V2 AddPassenger (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.5s)
  - **Hop 2 &mdash; V2 AddPassenger (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.5s)
  - **Hop 3 &mdash; V2 AddPassenger (omit_ResponseId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.5s)
  - **Hop 4 &mdash; V2 AddPassenger (omit_contactsList):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference (0.5s)
  - **Hop 5 &mdash; V2 AddPassenger (omit_passengersList):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.5s)
  - **Hop 6 &mdash; V2 AddPassenger (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)

### TC-AIEGY-ADDPASSENGER-NEG-03 — PASS

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** AddPassenger
- **Request:** 8 call(s): V2 AddPassenger
- **Response:** V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required.
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required.
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required.
V2 selectedOfferId=1000chars: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required.

  - **Hop 1 &mdash; V2 AddPassenger (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (0.5s)
  - **Hop 2 &mdash; V2 AddPassenger (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (0.5s)
  - **Hop 3 &mdash; V2 AddPassenger (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (0.5s)
  - **Hop 4 &mdash; V2 AddPassenger (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (0.5s)
  - **Hop 5 &mdash; V2 AddPassenger (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 6 &mdash; V2 AddPassenger (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 7 &mdash; V2 AddPassenger (selectedOfferId_1000chars):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.5s)
  - **Hop 8 &mdash; V2 AddPassenger (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (0.5s)

### TC-AIEGY-GETANCILLARY-NEG-01 — PASS

- **Test Case:** [GetAncillary][Request] Validate GetAncillary rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** GetAncillary
- **Request:** 1 call(s): V2 GetAncillary
- **Response:** V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V2 GetAncillary (unknown_ids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.5s)

### TC-AIEGY-GETANCILLARY-NEG-03 — PASS

- **Test Case:** [GetAncillary][Request] Validate GetAncillary rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** GetAncillary
- **Request:** 8 call(s): V2 GetAncillary
- **Response:** V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required.
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required.
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required.
V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required.
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required.
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=1000chars: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V2 GetAncillary (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (0.3s)
  - **Hop 2 &mdash; V2 GetAncillary (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (0.3s)
  - **Hop 3 &mdash; V2 GetAncillary (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (0.3s)
  - **Hop 4 &mdash; V2 GetAncillary (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (0.3s)
  - **Hop 5 &mdash; V2 GetAncillary (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 6 &mdash; V2 GetAncillary (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 7 &mdash; V2 GetAncillary (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (0.3s)
  - **Hop 8 &mdash; V2 GetAncillary (selectedOfferId_1000chars):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.3s)

### TC-AIEGY-GETANCILLARY-NEG-02 — PASS

- **Test Case:** [GetAncillary][Request] Validate GetAncillary rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** GetAncillary
- **Request:** 4 call(s): V2 GetAncillary
- **Response:** V2 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 4 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit ResponseId: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V2 GetAncillary (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 2 &mdash; V2 GetAncillary (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.5s)
  - **Hop 3 &mdash; V2 GetAncillary (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.5s)
  - **Hop 4 &mdash; V2 GetAncillary (omit_ResponseId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.8s)

### TC-AIEGY-SRCH-BODY-04 — PASS

- **Test Case:** [Search][Request] Validate Search ignores or rejects an unknown extra field in the body (no 5xx).
- **Category:** Validation
- **Endpoint Name:** Search
- **Request:** 4 call(s): V1 Search, V2 Search
- **Response:** V1 200, V2 200, V2 200, V1 200
- **Expected:** No 5xx; the observed behaviour is recorded as the baseline (SPEC.md marks it UNKNOWN).
- **Actual:** All 4 variant calls behaved as expected: V1 passengerTypeCode lowercase adt: behaviour recorded - 200 offers=0 | V2 extra field zzz: behaviour recorded - 200 offers=0 ...
- **Status:** PASS
- **Evidence:** V1 passengerTypeCode lowercase adt: behaviour recorded - 200 offers=0
V2 extra field zzz: behaviour recorded - 200 offers=0
V2 passengerTypeCode lowercase adt: behaviour recorded - 200 offers=0
V1 extra field zzz: behaviour recorded - 200 offers=0

  - **Hop 1 &mdash; V1 Search (passengerTypeCode_lowerc):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 2 &mdash; V1 Search (extra_field_zzz):** PASS &mdash; 200 offers=0 (15.9s)
  - **Hop 3 &mdash; V2 Search (extra_field_zzz):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 4 &mdash; V2 Search (passengerTypeCode_lowerc):** PASS &mdash; 200 offers=0 (15.3s)

### TC-SEATMAP-NEG-03 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V2 GetSeatMap (unknown_ids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.8s)

### TC-SEATMAP-NEG-04 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId.
- **Category:** Negative
- **Endpoint Name:** GetSeatMap
- **Request:** 4 call(s): V2 GetSeatMap
- **Response:** V2 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 4 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit ResponseId: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector

  - **Hop 1 &mdash; V2 GetSeatMap (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.8s)
  - **Hop 2 &mdash; V2 GetSeatMap (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.8s)
  - **Hop 3 &mdash; V2 GetSeatMap (omit_ResponseId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.8s)
  - **Hop 4 &mdash; V2 GetSeatMap (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.8s)

### TC-AIEGY-GETSEATMAP-NEG-03 — PASS

- **Test Case:** [GetSeatMap][Request] Validate GetSeatMap rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** 8 call(s): V2 GetSeatMap
- **Response:** V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required.
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required.
V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required.
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required.
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=1000chars: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V2 GetSeatMap (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (0.5s)
  - **Hop 2 &mdash; V2 GetSeatMap (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (0.5s)
  - **Hop 3 &mdash; V2 GetSeatMap (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (0.5s)
  - **Hop 4 &mdash; V2 GetSeatMap (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 5 &mdash; V2 GetSeatMap (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (0.5s)
  - **Hop 6 &mdash; V2 GetSeatMap (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 7 &mdash; V2 GetSeatMap (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (0.5s)
  - **Hop 8 &mdash; V2 GetSeatMap (selectedOfferId_1000chars):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.7s)

### TC-AIEGY-FARECHECK-NEG-01 — PASS

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** FareCheck
- **Request:** 1 call(s): V2 FareCheck
- **Response:** V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 FareCheck (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.7s)

### TC-AIEGY-FARECHECK-NEG-03 — PASS

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** FareCheck
- **Request:** 8 call(s): V2 FareCheck
- **Response:** V2 400, V2 400, V2 400, V2 400, V2 400, V2 409, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required.
V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required.
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required.
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required.
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.

  - **Hop 1 &mdash; V2 FareCheck (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required. (0.5s)
  - **Hop 2 &mdash; V2 FareCheck (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required. (0.5s)
  - **Hop 3 &mdash; V2 FareCheck (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required. (0.5s)
  - **Hop 4 &mdash; V2 FareCheck (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required. (0.5s)
  - **Hop 5 &mdash; V2 FareCheck (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 6 &mdash; V2 FareCheck (selectedOfferId_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.5s)
  - **Hop 7 &mdash; V2 FareCheck (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareCheckRequestDto field is required. (0.5s)
  - **Hop 8 &mdash; V2 FareCheck (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)

### TC-AIEGY-FARECHECK-NEG-02 — PASS

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** FareCheck
- **Request:** 4 call(s): V2 FareCheck
- **Response:** V2 400, V2 400, V2 400, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 4 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit ResponseId: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 FareCheck (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.7s)
  - **Hop 2 &mdash; V2 FareCheck (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.7s)
  - **Hop 3 &mdash; V2 FareCheck (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.7s)
  - **Hop 4 &mdash; V2 FareCheck (omit_ResponseId):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (1.0s)

### TC-AIEGY-FARERULES-NEG-01 — PASS

- **Test Case:** [FareRules][Request] Validate FareRules rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** FareRules
- **Request:** 1 call(s): V2 FareRules
- **Response:** V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 FareRules (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.8s)

### TC-AIEGY-FARERULES-NEG-02 — PASS

- **Test Case:** [FareRules][Request] Validate FareRules rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** FareRules
- **Request:** 4 call(s): V2 FareRules
- **Response:** V2 400, V2 400, V2 409, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 4 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit fareConfirmResponseId: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.

  - **Hop 1 &mdash; V2 FareRules (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.8s)
  - **Hop 2 &mdash; V2 FareRules (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.8s)
  - **Hop 3 &mdash; V2 FareRules (omit_fareConfirmResponseId):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.8s)
  - **Hop 4 &mdash; V2 FareRules (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.8s)

### TC-BOOK-NEG-12 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects requests with each mandatory field individually omitted: ResponseId/fareConfirmResponseId, selectedOfferId/SelectedOfferId, supplier, credentialsSelector.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** 10 call(s): V1 Book, V2 Book
- **Response:** V1 400, V1 400, V1 400, V1 400, V2 400, V1 400, V2 400, V2 400, V2 400, V1 500
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** 1 of 10 omit-field calls failed: V1 omit fareConfirmResponseId: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 omit passengersList: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The PassengersList field is required.
V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit contactsList: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required.
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit ResponseId: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 omit selectedOfferId: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V1 omit fareConfirmResponseId: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."

  - **Hop 1 &mdash; V1 Book (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 2 &mdash; V1 Book (omit_passengersList):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The PassengersList field is required. (0.3s)
  - **Hop 3 &mdash; V1 Book (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 4 &mdash; V1 Book (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 5 &mdash; V1 Book (omit_fareConfirmResponseId):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.3s)
  - **Hop 6 &mdash; V2 Book (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 7 &mdash; V1 Book (omit_contactsList):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required. (0.3s)
  - **Hop 8 &mdash; V2 Book (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 9 &mdash; V2 Book (omit_ResponseId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.3s)
  - **Hop 10 &mdash; V2 Book (omit_selectedOfferId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.3s)

### TC-AIEGY-BOOK-NEG-01 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** 2 call(s): V2 Book, V1 Book
- **Response:** V2 400, V1 500
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 unknown ids: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V2 unknown ids: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V1 unknown ids: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."

  - **Hop 1 &mdash; V2 Book (unknown_ids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.9s)
  - **Hop 2 &mdash; V1 Book (unknown_ids):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.9s)

### TC-AIEGY-FARERULES-NEG-03 — PASS

- **Test Case:** [FareRules][Request] Validate FareRules rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** FareRules
- **Request:** 8 call(s): V2 FareRules
- **Response:** V2 400, V2 400, V2 400, V2 400, V2 409, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 fareConfirmResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required.
V2 fareConfirmResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required.
V2 fareConfirmResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required.
V2 fareConfirmResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required.

  - **Hop 1 &mdash; V2 FareRules (fareConfirmResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required. (0.8s)
  - **Hop 2 &mdash; V2 FareRules (fareConfirmResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required. (0.8s)
  - **Hop 3 &mdash; V2 FareRules (fareConfirmResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required. (0.8s)
  - **Hop 4 &mdash; V2 FareRules (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.8s)
  - **Hop 5 &mdash; V2 FareRules (selectedOfferId_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.8s)
  - **Hop 6 &mdash; V2 FareRules (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.8s)
  - **Hop 7 &mdash; V2 FareRules (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required. (0.9s)
  - **Hop 8 &mdash; V2 FareRules (fareConfirmResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareRulesRequestDto field is required. (1.4s)

### TC-AIEGY-HOLD-NEG-01 — PASS

- **Test Case:** [Hold][Request] Validate Hold rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** Hold
- **Request:** 2 call(s): V1 Hold, V2 Hold
- **Response:** V1 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 Hold (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 2 &mdash; V2 Hold (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)

### TC-AIEGY-HOLD-NEG-02 — PASS

- **Test Case:** [Hold][Request] Validate Hold rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** Hold
- **Request:** 10 call(s): V1 Hold, V2 Hold
- **Response:** V1 400, V1 400, V1 409, V2 400, V2 400, V1 400, V1 400, V2 409, V2 409, V1 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 10 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit contactsList: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required.
V1 omit fareConfirmResponseId: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit fareConfirmResponseId: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit selectedOfferId: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit passengersList: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The PassengersList field is required.

  - **Hop 1 &mdash; V1 Hold (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.6s)
  - **Hop 2 &mdash; V1 Hold (omit_contactsList):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required. (0.6s)
  - **Hop 3 &mdash; V1 Hold (omit_fareConfirmResponseId):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 4 &mdash; V2 Hold (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.6s)
  - **Hop 5 &mdash; V2 Hold (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.6s)
  - **Hop 6 &mdash; V1 Hold (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.6s)
  - **Hop 7 &mdash; V1 Hold (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.6s)
  - **Hop 8 &mdash; V2 Hold (omit_fareConfirmResponseId):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 9 &mdash; V1 Hold (omit_passengersList):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The PassengersList field is required. (0.6s)
  - **Hop 10 &mdash; V2 Hold (omit_selectedOfferId):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)

### TC-AIEGY-SRCH-BODY-05 — PASS

- **Test Case:** [Search][Request] Validate Search handles an oversized (2 MB) request body without a 5xx.
- **Category:** Boundary
- **Endpoint Name:** Search
- **Request:** 2 call(s): V2 Search, V1 Search
- **Response:** V2 200, V1 200
- **Expected:** No 5xx; the observed behaviour is recorded as the baseline (SPEC.md marks it UNKNOWN).
- **Actual:** All 2 variant calls behaved as expected: V2 2 MB padding field: behaviour recorded - 200 offers=0 | V1 2 MB padding field: behaviour recorded - 200 offers=0
- **Status:** PASS
- **Evidence:** V2 2 MB padding field: behaviour recorded - 200 offers=0
V1 2 MB padding field: behaviour recorded - 200 offers=0

  - **Hop 1 &mdash; V1 Search (2_MB_padding_field):** PASS &mdash; 200 offers=0 (19.4s)
  - **Hop 2 &mdash; V2 Search (2_MB_padding_field):** PASS &mdash; 200 offers=0 (19.3s)

### TC-AIEGY-BOOK-NEG-03 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** 16 call(s): V1 Book, V2 Book
- **Response:** V1 400, V1 400, V1 400, V1 400, V2 400, V2 400, V2 400, V1 400, V1 500, V2 400, V2 400, V2 400, V1 400, V1 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** 1 of 16 bad-id calls failed: V1 selectedOfferId=1000chars: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1 fareConfirmResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V1 fareConfirmResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V1 fareConfirmResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V1 fareConfirmResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V1 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 selectedOfferId=1000chars: SERVER ERROR instead of a validation error - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V1 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
V2 selectedOfferId=1000chars: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 selectedOfferId=empty: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V1 Book (fareConfirmResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.9s)
  - **Hop 2 &mdash; V1 Book (fareConfirmResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.9s)
  - **Hop 3 &mdash; V1 Book (fareConfirmResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.9s)
  - **Hop 4 &mdash; V1 Book (fareConfirmResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.9s)
  - **Hop 5 &mdash; V1 Book (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.9s)
  - **Hop 6 &mdash; V1 Book (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.9s)
  - **Hop 7 &mdash; V2 Book (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.6s)
  - **Hop 8 &mdash; V2 Book (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.6s)
  - **Hop 9 &mdash; V2 Book (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.9s)
  - **Hop 10 &mdash; V1 Book (selectedOfferId_1000chars):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (1.9s)
  - **Hop 11 &mdash; V2 Book (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.9s)
  - **Hop 12 &mdash; V2 Book (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.9s)
  - **Hop 13 &mdash; V2 Book (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.9s)
  - **Hop 14 &mdash; V1 Book (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.9s)
  - **Hop 15 &mdash; V2 Book (selectedOfferId_1000chars):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (1.9s)
  - **Hop 16 &mdash; V2 Book (selectedOfferId_empty):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (1.9s)

### TC-AIEGY-HOLD-NEG-03 — PASS

- **Test Case:** [Hold][Request] Validate Hold rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** Hold
- **Request:** 16 call(s): V1 Hold, V2 Hold
- **Response:** V1 400, V1 400, V1 400, V1 400, V1 400, V1 400, V1 409, V1 400, V2 409, V2 409, V2 400, V2 409, V2 409, V2 409, V2 409, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 fareConfirmResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
V1 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 fareConfirmResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
V1 fareConfirmResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
V1 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
V1 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 selectedOfferId=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 fareConfirmResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
V2 fareConfirmResponseId=number: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 selectedOfferId=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
V2 fareConfirmResponseId=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 selectedOfferId=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 fareConfirmResponseId=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 fareConfirmResponseId=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.

  - **Hop 1 &mdash; V1 Hold (fareConfirmResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (0.6s)
  - **Hop 2 &mdash; V1 Hold (fareConfirmResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (0.6s)
  - **Hop 3 &mdash; V1 Hold (fareConfirmResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (0.6s)
  - **Hop 4 &mdash; V1 Hold (fareConfirmResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (0.6s)
  - **Hop 5 &mdash; V1 Hold (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.6s)
  - **Hop 6 &mdash; V1 Hold (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (0.6s)
  - **Hop 7 &mdash; V1 Hold (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.6s)
  - **Hop 8 &mdash; V1 Hold (selectedOfferId_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 9 &mdash; V2 Hold (fareConfirmResponseId_number):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (1.0s)
  - **Hop 10 &mdash; V2 Hold (fareConfirmResponseId_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (1.1s)
  - **Hop 11 &mdash; V2 Hold (fareConfirmResponseId_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (1.3s)
  - **Hop 12 &mdash; V2 Hold (fareConfirmResponseId_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (1.3s)
  - **Hop 13 &mdash; V2 Hold (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.3s)
  - **Hop 14 &mdash; V2 Hold (selectedOfferId_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (1.0s)
  - **Hop 15 &mdash; V2 Hold (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (1.0s)
  - **Hop 16 &mdash; V2 Hold (selectedOfferId_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (1.1s)

### TC-AIEGY-PNRREPRICE-NEG-01 — PASS

- **Test Case:** [PnrReprice][Request] Validate PnrReprice rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** PnrReprice
- **Request:** 2 call(s): V2 PnrReprice, V1 PnrReprice
- **Response:** V2 409, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 PnrReprice (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 2 &mdash; V1 PnrReprice (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)

### TC-AIEGY-PNRREPRICE-NEG-02 — PASS

- **Test Case:** [PnrReprice][Request] Validate PnrReprice rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** PnrReprice
- **Request:** 12 call(s): V1 PnrReprice, V2 PnrReprice
- **Response:** V1 400, V1 400, V2 400, V1 409, V1 409, V2 409, V2 400, V2 409, V1 409, V1 409, V2 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 12 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit gdsPNR: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit gdsPNR: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit surName (optional?): behaviour recorded - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit surName (optional?): behaviour recorded - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 PnrReprice (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.2s)
  - **Hop 2 &mdash; V1 PnrReprice (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.2s)
  - **Hop 3 &mdash; V1 PnrReprice (omit_gdsPNR):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 4 &mdash; V1 PnrReprice (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 5 &mdash; V1 PnrReprice (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 6 &mdash; V1 PnrReprice (omit_surName):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 7 &mdash; V2 PnrReprice (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.2s)
  - **Hop 8 &mdash; V2 PnrReprice (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 9 &mdash; V2 PnrReprice (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.4s)
  - **Hop 10 &mdash; V2 PnrReprice (omit_gdsPNR):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 11 &mdash; V2 PnrReprice (omit_surName):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 12 &mdash; V2 PnrReprice (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)

### TC-AIEGY-PNRREPRICE-NEG-03 — PASS

- **Test Case:** [PnrReprice][Request] Validate PnrReprice rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** PnrReprice
- **Request:** 16 call(s): V1 PnrReprice, V2 PnrReprice
- **Response:** V1 400, V1 400, V2 400, V1 409, V2 400, V2 409, V2 409, V1 409, V1 409, V1 400, V1 409, V1 409, V2 409, V2 409, V2 409, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required.
V1 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V2 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V1 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required.
V2 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required.
V1 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required.

  - **Hop 1 &mdash; V1 PnrReprice (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required. (0.3s)
  - **Hop 2 &mdash; V1 PnrReprice (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 3 &mdash; V1 PnrReprice (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 4 &mdash; V1 PnrReprice (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 5 &mdash; V1 PnrReprice (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 6 &mdash; V1 PnrReprice (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required. (0.3s)
  - **Hop 7 &mdash; V1 PnrReprice (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 8 &mdash; V2 PnrReprice (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 9 &mdash; V2 PnrReprice (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required. (0.3s)
  - **Hop 10 &mdash; V2 PnrReprice (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 11 &mdash; V2 PnrReprice (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 12 &mdash; V1 PnrReprice (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 13 &mdash; V2 PnrReprice (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 14 &mdash; V2 PnrReprice (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 15 &mdash; V2 PnrReprice (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 16 &mdash; V2 PnrReprice (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmAfterHoldRequestDto field is required. (0.3s)

### TC-AIEGY-BOOKAFTERHOLD-NEG-01 — PASS

- **Test Case:** [BookAfterHold][Request] Validate BookAfterHold rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** BookAfterHold
- **Request:** 2 call(s): V2 BookAfterHold, V1 BookAfterHold
- **Response:** V2 409, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 BookAfterHold (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 2 &mdash; V1 BookAfterHold (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-BOOKAFTERHOLD-NEG-02 — PASS

- **Test Case:** [BookAfterHold][Request] Validate BookAfterHold rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** BookAfterHold
- **Request:** 10 call(s): V1 BookAfterHold, V2 BookAfterHold
- **Response:** V1 400, V1 400, V2 400, V2 400, V1 409, V1 409, V2 409, V2 409, V2 409, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 10 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit gdsPnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit gdsPnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 BookAfterHold (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 2 &mdash; V1 BookAfterHold (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 3 &mdash; V2 BookAfterHold (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 4 &mdash; V2 BookAfterHold (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 5 &mdash; V1 BookAfterHold (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 6 &mdash; V1 BookAfterHold (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 7 &mdash; V1 BookAfterHold (omit_gdsPnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 8 &mdash; V2 BookAfterHold (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 9 &mdash; V2 BookAfterHold (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 10 &mdash; V2 BookAfterHold (omit_gdsPnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-BOOKAFTERHOLD-NEG-03 — PASS

- **Test Case:** [BookAfterHold][Request] Validate BookAfterHold rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** BookAfterHold
- **Request:** 16 call(s): V1 BookAfterHold, V2 BookAfterHold
- **Response:** V1 400, V1 409, V2 400, V1 400, V1 400, V1 409, V2 400, V1 409, V1 409, V2 409, V2 409, V2 409, V1 409, V2 400, V2 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required.
V1 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required.
V1 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V1 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required.
V1 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V1 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required.
V2 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 BookAfterHold (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required. (0.3s)
  - **Hop 2 &mdash; V1 BookAfterHold (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 3 &mdash; V1 BookAfterHold (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 4 &mdash; V1 BookAfterHold (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 5 &mdash; V1 BookAfterHold (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 6 &mdash; V2 BookAfterHold (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required. (0.3s)
  - **Hop 7 &mdash; V1 BookAfterHold (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required. (0.3s)
  - **Hop 8 &mdash; V1 BookAfterHold (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 9 &mdash; V2 BookAfterHold (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 10 &mdash; V1 BookAfterHold (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 11 &mdash; V2 BookAfterHold (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 12 &mdash; V2 BookAfterHold (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 13 &mdash; V2 BookAfterHold (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 14 &mdash; V2 BookAfterHold (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The bookAfterHoldRequestDto field is required. (0.3s)
  - **Hop 15 &mdash; V2 BookAfterHold (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 16 &mdash; V2 BookAfterHold (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-CANCELAFTERHOLD-NEG-01 — PASS

- **Test Case:** [CancelAfterHold][Request] Validate CancelAfterHold rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** CancelAfterHold
- **Request:** 2 call(s): V1 CancelAfterHold, V2 CancelAfterHold
- **Response:** V1 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 CancelAfterHold (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 2 &mdash; V2 CancelAfterHold (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-CANCELAFTERHOLD-NEG-02 — PASS

- **Test Case:** [CancelAfterHold][Request] Validate CancelAfterHold rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** CancelAfterHold
- **Request:** 10 call(s): V1 CancelAfterHold, V2 CancelAfterHold
- **Response:** V1 400, V2 400, V1 400, V2 409, V1 409, V1 409, V2 400, V1 409, V2 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 10 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit gdsPNR: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit gdsPNR: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 CancelAfterHold (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.2s)
  - **Hop 2 &mdash; V1 CancelAfterHold (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 3 &mdash; V1 CancelAfterHold (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 4 &mdash; V1 CancelAfterHold (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 5 &mdash; V2 CancelAfterHold (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 6 &mdash; V1 CancelAfterHold (omit_gdsPNR):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 7 &mdash; V2 CancelAfterHold (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 8 &mdash; V2 CancelAfterHold (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 9 &mdash; V2 CancelAfterHold (omit_gdsPNR):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 10 &mdash; V2 CancelAfterHold (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-CANCELAFTERHOLD-NEG-03 — PASS

- **Test Case:** [CancelAfterHold][Request] Validate CancelAfterHold rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** CancelAfterHold
- **Request:** 16 call(s): V1 CancelAfterHold, V2 CancelAfterHold
- **Response:** V1 400, V1 400, V1 409, V1 409, V1 400, V1 409, V1 409, V1 409, V2 400, V2 409, V2 409, V2 400, V2 400, V2 409, V2 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V1 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required.
V1 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required.
V1 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required.
V2 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V2 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required.
V2 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 CancelAfterHold (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 2 &mdash; V1 CancelAfterHold (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 3 &mdash; V1 CancelAfterHold (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required. (0.3s)
  - **Hop 4 &mdash; V1 CancelAfterHold (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 5 &mdash; V1 CancelAfterHold (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required. (0.3s)
  - **Hop 6 &mdash; V1 CancelAfterHold (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 7 &mdash; V1 CancelAfterHold (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 8 &mdash; V1 CancelAfterHold (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 9 &mdash; V2 CancelAfterHold (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 10 &mdash; V2 CancelAfterHold (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 11 &mdash; V2 CancelAfterHold (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required. (0.3s)
  - **Hop 12 &mdash; V2 CancelAfterHold (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 13 &mdash; V2 CancelAfterHold (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required. (0.3s)
  - **Hop 14 &mdash; V2 CancelAfterHold (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 15 &mdash; V2 CancelAfterHold (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 16 &mdash; V2 CancelAfterHold (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-VOID-NEG-01 — PASS

- **Test Case:** [Void][Request] Validate Void rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** 2 call(s): V2 Void, V1 Void
- **Response:** V2 409, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 Void (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 2 &mdash; V1 Void (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-VOID-NEG-02 — PASS

- **Test Case:** [Void][Request] Validate Void rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** 14 call(s): V1 Void, V2 Void
- **Response:** V1 400, V1 409, V1 400, V2 400, V2 400, V1 409, V1 409, V2 409, V2 409, V2 409, V1 409, V2 409, V1 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 14 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit gdsPNR: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit voidTickets (optional?): behaviour recorded - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit surName (optional?): behaviour recorded - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit surName (optional?): behaviour recorded - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit gdsPNR: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit voidTickets (optional?): behaviour recorded - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 Void (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 2 &mdash; V1 Void (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 3 &mdash; V1 Void (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 4 &mdash; V1 Void (omit_gdsPNR):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 5 &mdash; V2 Void (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 6 &mdash; V2 Void (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 7 &mdash; V1 Void (omit_voidTickets):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 8 &mdash; V1 Void (omit_surName):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 9 &mdash; V2 Void (omit_gdsPNR):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 10 &mdash; V2 Void (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 11 &mdash; V1 Void (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 12 &mdash; V2 Void (omit_surName):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 13 &mdash; V2 Void (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 14 &mdash; V2 Void (omit_voidTickets):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-VOID-NEG-03 — PASS

- **Test Case:** [Void][Request] Validate Void rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** Void
- **Request:** 16 call(s): V1 Void, V2 Void
- **Response:** V1 400, V1 400, V2 409, V2 400, V2 400, V1 409, V1 400, V1 409, V1 409, V1 409, V2 400, V2 409, V2 409, V2 409, V2 409, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V1 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required.
V2 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required.
V2 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V1 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required.
V1 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required.
V2 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 Void (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required. (0.3s)
  - **Hop 2 &mdash; V1 Void (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 3 &mdash; V1 Void (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 4 &mdash; V1 Void (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 5 &mdash; V1 Void (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required. (0.3s)
  - **Hop 6 &mdash; V2 Void (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 7 &mdash; V2 Void (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required. (0.3s)
  - **Hop 8 &mdash; V2 Void (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 9 &mdash; V1 Void (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 10 &mdash; V1 Void (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 11 &mdash; V2 Void (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The voidRequestDto field is required. (0.3s)
  - **Hop 12 &mdash; V2 Void (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 13 &mdash; V2 Void (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 14 &mdash; V2 Void (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 15 &mdash; V2 Void (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 16 &mdash; V1 Void (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-SEATAFTERHOLD-NEG-01 — PASS

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a mismatched pnr/gdsPNR/bookingToken combination.
- **Category:** Negative
- **Endpoint Name:** SeatAfterHold
- **Request:** 1 call(s): V2 SeatAfterHold
- **Response:** V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 SeatAfterHold (unknown_ids):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-SEATAFTERHOLD-NEG-02 — PASS

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** SeatAfterHold
- **Request:** 6 call(s): V2 SeatAfterHold
- **Response:** V2 400, V2 400, V2 409, V2 409, V2 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 6 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit gdsPNR: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit bookingToken: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit pnr: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 omit surName (optional?): behaviour recorded - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 SeatAfterHold (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 2 &mdash; V2 SeatAfterHold (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 3 &mdash; V2 SeatAfterHold (omit_gdsPNR):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 4 &mdash; V2 SeatAfterHold (omit_bookingToken):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 5 &mdash; V2 SeatAfterHold (omit_pnr):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 6 &mdash; V2 SeatAfterHold (omit_surName):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AIEGY-SEATAFTERHOLD-NEG-03 — PASS

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** SeatAfterHold
- **Request:** 8 call(s): V2 SeatAfterHold
- **Response:** V2 400, V2 409, V2 409, V2 400, V2 409, V2 400, V2 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V2 pnr=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The postSeatMapRequestDto field is required.
V2 bookingToken=null: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The postSeatMapRequestDto field is required.
V2 bookingToken=empty: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 bookingToken=1000chars: rejected as expected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 SeatAfterHold (pnr_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 2 &mdash; V2 SeatAfterHold (pnr_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 3 &mdash; V2 SeatAfterHold (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The postSeatMapRequestDto field is required. (0.3s)
  - **Hop 4 &mdash; V2 SeatAfterHold (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.3s)
  - **Hop 5 &mdash; V2 SeatAfterHold (bookingToken_null):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 6 &mdash; V2 SeatAfterHold (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The postSeatMapRequestDto field is required. (0.3s)
  - **Hop 7 &mdash; V2 SeatAfterHold (bookingToken_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 8 &mdash; V2 SeatAfterHold (bookingToken_1000chars):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)

### TC-AUTH-SEC-01 — PASS

- **Test Case:** [Search][Request] Verify request behavior with a valid x-api-key versus an invalid or missing x-api-key header.
- **Category:** SEC
- **Endpoint Name:** Search
- **Request:** 10 call(s): V1 Search, V1 Book, V2 Search, V2 Book
- **Response:** V1 401, V1 401, V1 401, V1 401, V2 401, V2 401, V2 401, V2 401, V1 200, V2 200
- **Expected:** Valid key succeeds; altered, empty and omitted keys are rejected with 401/403.
- **Actual:** Valid key 200; altered/empty/omitted key rejected on Search and Book, V1 and V2: 401/401/401/401
- **Status:** PASS
- **Evidence:** V1 omitted key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V1 empty key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V1 altered key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V1 Book altered key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V2 altered key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V2 omitted key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V2 empty key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V2 Book altered key: as expected - 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
V1 valid key: as expected - 200 offers=0
V2 valid key: as expected - 200 offers=0

  - **Hop 1 &mdash; V1 Search (altered_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.3s)
  - **Hop 2 &mdash; V1 Search (valid_key):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 3 &mdash; V1 Search (omitted_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.3s)
  - **Hop 4 &mdash; V1 Search (empty_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.3s)
  - **Hop 5 &mdash; V1 Book (Book_altered_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.8s)
  - **Hop 6 &mdash; V2 Search (altered_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.8s)
  - **Hop 7 &mdash; V2 Search (omitted_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.8s)
  - **Hop 8 &mdash; V2 Search (valid_key):** PASS &mdash; 200 offers=0 (15.5s)
  - **Hop 9 &mdash; V2 Search (empty_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.8s)
  - **Hop 10 &mdash; V2 Book (Book_altered_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.8s)

### TC-SEARCH-VAL-01 — PASS

- **Test Case:** [Search][Response] Verify Search response's supplier field matches the request's supplier value verbatim.
- **Category:** VAL
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 200, V2 200
- **Expected:** supplier is echoed back unchanged.
- **Actual:** V1: supplier="AirIndia" (sent "AirIndia") | V2: supplier="AirIndia" (sent "AirIndia")
- **Status:** PASS
- **Evidence:** responseId present: true/true

  - **Hop 1 &mdash; V1 Search (echo):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (echo):** PASS &mdash; 200 offers=0 (15.1s)

### TC-SEARCH-BND-02 — BLOCKED

- **Test Case:** [Search][Request] Validate Search accepts a total passenger count of exactly 9 (ADT+CHD+INF combined).
- **Category:** BND
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 200, V2 200
- **Expected:** HTTP 200; offers returned; no passenger-count rejection at the confirmed upper bound.
- **Actual:** The 9-passenger party is accepted on V1 and V2 (HTTP 200, no count rejection), but offers[] is empty because AirIndia/EGY returns no inventory, so "offers returned normally" cannot be confirmed.
- **Status:** BLOCKED
- **Evidence:** V1: 200 offers=0 (accepted, no count rejection)
V2: 200 offers=0 (accepted, no count rejection)

  - **Hop 1 &mdash; V1 Search (nine):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (nine):** PASS &mdash; 200 offers=0 (15.1s)

### TC-AIEGY-CAP-01 — FAIL

- **Test Case:** [Search][Positive] Verify AirIndia credentials for credentialsSelector EGY return offers for a one-way domestic Search (capability gate for every flow).
- **Category:** Positive
- **Endpoint Name:** Search (V1 + V2)
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 200, V2 200
- **Expected:** HTTP 200 with a non-empty offers[] on both versions; capability flags readable so the Hold, Bundle, Ancillary and SeatMap flows can be scheduled.
- **Actual:** V1: HTTP 200, offers=0, 15.1s | V2: HTTP 200, offers=0, 15.1s. 200 with an empty offers[] and empty journeys/flightSegments/priceClasses/baggageDetails; no error is reported.
- **Status:** FAIL
- **Evidence:** Capability flags cannot be read (no offers). See TC-AIEGY-CAP-02 for the route and date sweep and TC-AIEGY-CAP-05 for the supplier-side diagnosis.

  - **Hop 1 &mdash; V1 Search (gate):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (gate):** FAIL &mdash; 200 offers=0 (15.1s)

### TC-AIEGY-CAP-03 — PASS

- **Test Case:** [Search][Validation] Verify which credentialsSelector values are active for AirIndia (EGY active; UAE and KSA expected inactive) and that V1 and V2 report the same message.
- **Category:** Validation
- **Endpoint Name:** Search (V1 + V2)
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 400, V1 400, V2 400, V2 400, V1 200, V2 200
- **Expected:** EGY accepted; inactive selectors return 400 "credentials for the selected supplier do not exist or are not active", identically on V1 and V2.
- **Actual:** All 6 calls behaved as expected: V1 UAE: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th | V1 KSA: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th ... V1 and V2 messages are identical.
- **Status:** PASS
- **Evidence:** Confirmed: EGY active, UAE and KSA inactive for AirIndia on ne-3.
V1 UAE: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
V1 KSA: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
V2 UAE: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
V2 KSA: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
V1 EGY: 200 offers=0
V2 EGY: 200 offers=0

  - **Hop 1 &mdash; V1 Search (sel_UAE):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (0.1s)
  - **Hop 2 &mdash; V1 Search (sel_KSA):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (0.6s)
  - **Hop 3 &mdash; V2 Search (sel_UAE):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (0.6s)
  - **Hop 4 &mdash; V2 Search (sel_KSA):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (0.6s)
  - **Hop 5 &mdash; V1 Search (sel_EGY):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 6 &mdash; V2 Search (sel_EGY):** PASS &mdash; 200 offers=0 (15.7s)

### TC-AIEGY-CAP-04 — FAIL

- **Test Case:** [Search][Business Rule] Verify a Search completes (or fails) promptly: response time must not sit at a fixed supplier-timeout value for every request.
- **Category:** Business Rule
- **Endpoint Name:** Search (V1 + V2)
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 200, V1 200, V1 200, V2 200, V2 200, V2 200
- **Expected:** Latency varies with route and load; a request the supplier cannot serve returns an error promptly. (No SLA is written in SPEC.md; a flat value across every call indicates a hard timeout.)
- **Actual:** All 6 fresh valid Searches took 15.3, 15.3, 15.3, 15.3, 15.3, 15.3 s; the sweep of 839 calls ranged 15.1-16.0 s (mean 15.1 s); the same endpoint rejects invalid input in 0.67 s on average. Every valid request stalls for the same ~15 s and then returns an empty 200.
- **Status:** FAIL
- **Evidence:** V1 run 1: 15.3s, 200 offers=0
V1 run 3: 15.3s, 200 offers=0
V1 run 2: 15.3s, 200 offers=0
V2 run 3: 15.3s, 200 offers=0
V2 run 2: 15.3s, 200 offers=0
V2 run 1: 15.3s, 200 offers=0

  - **Hop 1 &mdash; V1 Search (lat1):** FAIL &mdash; 200 offers=0 (15.3s)
  - **Hop 2 &mdash; V1 Search (lat3):** FAIL &mdash; 200 offers=0 (15.3s)
  - **Hop 3 &mdash; V1 Search (lat2):** FAIL &mdash; 200 offers=0 (15.3s)
  - **Hop 4 &mdash; V2 Search (lat3):** FAIL &mdash; 200 offers=0 (15.3s)
  - **Hop 5 &mdash; V2 Search (lat2):** FAIL &mdash; 200 offers=0 (15.3s)
  - **Hop 6 &mdash; V2 Search (lat1):** FAIL &mdash; 200 offers=0 (15.3s)

### TC-VERSIONDIFF-NEG-01 — FAIL

- **Test Case:** Verify the actual error-response envelope shape (status code, body structure) for a representative sample of endpoints, since no negative/error example exists in either collection for any endpoint.
- **Category:** NEG
- **Endpoint Name:** Search/FareConfirm/Book
- **Request:** 6 call(s): V1 Book, V1 FareConfirm, V1 Search, V2 FareConfirm, V2 Search, V2 Book
- **Response:** V1 400, V1 400, V1 400, V2 400, V2 400, V2 400
- **Expected:** One documented envelope (status + body structure), identical across endpoints and versions.
- **Actual:** ENVELOPES DIFFER across the 6 calls: 400/camel/1001/tx=true ; 400/Pascal/NDC-INT-TEC-A0001/tx=true. V1 Book: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. | V1 FareConfirm: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. | V1 Search: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier | V2 FareConfirm: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. | V2 Search: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier | V2 Book: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
- **Status:** FAIL
- **Evidence:** V1 Book: 400/camel/1001/tx=true
V1 FareConfirm: 400/camel/1001/tx=true
V1 Search: 400/camel/1001/tx=true
V2 FareConfirm: 400/camel/1001/tx=true
V2 Search: 400/camel/1001/tx=true
V2 Book: 400/Pascal/NDC-INT-TEC-A0001/tx=true

  - **Hop 1 &mdash; V1 FareConfirm (envelope):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 2 &mdash; V1 Search (envelope):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 3 &mdash; V1 Book (envelope):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 4 &mdash; V2 FareConfirm (envelope):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 5 &mdash; V2 Search (envelope):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 6 &mdash; V2 Book (envelope):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.1s)

### TC-VERSIONDIFF-VAL-01 — PASS

- **Test Case:** [Search]&amp;[GetOfferBundles]&amp;[BookAfterHold]&amp;[CancelAfterHold]&amp;[Void] [Request] Verify V2's inconsistent V2/v2 path casing does not affect routing.
- **Category:** VAL
- **Endpoint Name:** Search/FareConfirm
- **Request:** 6 call(s): V2 Search, V2 FareConfirm, V1 Search
- **Response:** V2 400, V2 400, V2 400, V2 400, V1 400, V1 400
- **Expected:** Routing is case-insensitive: identical status and body.
- **Actual:** All 6 calls behaved as expected: api/v2/FlightSearch/Search: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier - same as documented casing | api/V2/FlightSearch/Search: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier ...
- **Status:** PASS
- **Evidence:** api/v2/FlightSearch/Search: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier - same as documented casing
api/V2/FlightSearch/Search: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
api/v2/FlightSearch/FareConfirm: 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
api/V2/FlightSearch/FareConfirm: 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. - same as documented casing
api/FlightSearch/Search: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
api/flightsearch/search: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier - same as documented casing

  - **Hop 1 &mdash; V2 Search (documented):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V2 Search (recased):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 3 &mdash; V2 FareConfirm (documented):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 4 &mdash; V2 FareConfirm (recased):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 5 &mdash; V1 Search (documented):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 6 &mdash; V1 Search (recased):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)

### TC-BOOK-VAL-01 — FAIL

- **Test Case:** [Book] [Request] Validate the documented capital-S "Supplier" field is accepted, and confirm whether lowercase "supplier" is also accepted.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** 3 call(s): V1 Book
- **Response:** V1 400, V1 500, V1 500
- **Expected:** Both casings accepted at validation level; omitted supplier rejected.
- **Actual:** capital-S and lowercase supplier are handled identically (500 / 500); with neither key: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
- **Status:** FAIL
- **Evidence:** Supplier (capital S, as documented): 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
supplier (lowercase): 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
both keys absent: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier

  - **Hop 1 &mdash; V1 Book (both):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V1 Book (supplier):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.1s)
  - **Hop 3 &mdash; V1 Book (Supplier):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.1s)

### TC-BOOK-VAL-02 — FAIL

- **Test Case:** [Book][Request] Validate V1 Book's capital-S Supplier field is accepted consistently despite every other V1 field using lowercase supplier.
- **Category:** VAL
- **Endpoint Name:** Book
- **Request:** 3 call(s): V1 Book
- **Response:** V1 400, V1 500, V1 500
- **Expected:** Field-name matching is case-insensitive and both variants are handled identically.
- **Actual:** capital-S and lowercase supplier are handled identically (500 / 500); with neither key: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
- **Status:** FAIL
- **Evidence:** Supplier (capital S, as documented): 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
supplier (lowercase): 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
both keys absent: 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier

  - **Hop 1 &mdash; V1 Book (both):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V1 Book (Supplier):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.1s)
  - **Hop 3 &mdash; V1 Book (supplier):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.1s)

### TC-AIEGY-CAP-05 — FAIL

- **Test Case:** [Search][Business Rule] Verify a failed supplier call (supplier login not completing) is reported as an error rather than a successful empty Search.
- **Category:** Business Rule
- **Endpoint Name:** Search (V1 + V2)
- **Request:** 2 call(s): V2 Search, V1 Search
- **Response:** V2 200, V1 200
- **Expected:** If the supplier leg fails (login, timeout, auth) the API returns a supplier/technical error, not 200 with an empty offers[]. When the supplier answers, supplierResponse is present.
- **Actual:** V2: HTTP 200, offers=0, supplierRequest present (login request only: true), supplierResponse ABSENT | V1: HTTP 200, offers=0, supplierRequest present (login request only: true), supplierResponse ABSENT. The supplier call never produces a response, yet the API answers 200 with an empty offers[] instead of an error.
- **Status:** FAIL
- **Evidence:** supplierRequest content not recorded here (it carries plaintext credentials: see TC-SEARCH-SEC-01). Only the structure was inspected: a login request, no response, no availability request.

  - **Hop 1 &mdash; V2 Search (diag):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V1 Search (diag):** FAIL &mdash; 200 offers=0 (15.1s)

### TC-HOLD-NEG-01 — PASS

- **Test Case:** [Hold][Request] Validate the {{credentialsSelector}} vs {{Credentials_Selector}} casing mismatch resolves empty and fails.
- **Category:** NEG
- **Endpoint Name:** Hold
- **Request:** 2 call(s): V2 Hold
- **Response:** V2 400, V2 400
- **Expected:** Rejected with a structured 4xx (no PNR).
- **Actual:** All 2 calls behaved as expected: V2 Hold credentialsSelector empty: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. | V2 Hold credentialsSelector placeholder: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
- **Status:** PASS
- **Evidence:** V2 Hold credentialsSelector empty: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.
V2 Hold credentialsSelector placeholder: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required.

  - **Hop 1 &mdash; V2 Hold (empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (0.1s)
  - **Hop 2 &mdash; V2 Hold (placeholder):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The holdRequestDto field is required. (0.1s)

### TC-CANCELHOLD-NEG-01 — PASS

- **Test Case:** [CancelAfterHold][Request] Validate the unquoted {{Credentials_Selector}} produces invalid JSON.
- **Category:** NEG
- **Endpoint Name:** CancelAfterHold
- **Request:** 1 call(s): V2 CancelAfterHold
- **Response:** V2 400
- **Expected:** HTTP 400 with a structured error; the request is not processed.
- **Actual:** All 1 calls behaved as expected: V2 CancelAfterHold unquoted value: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required.
- **Status:** PASS
- **Evidence:** V2 CancelAfterHold unquoted value: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required.

  - **Hop 1 &mdash; V2 CancelAfterHold (unquoted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The cancelAfterHoldRequestDto field is required. (0.1s)

### TC-VOID-NEG-01 — PASS

- **Test Case:** [Void][Request] Verify whether a hardcoded empty gdsPNR breaks Void for GDS-routed suppliers.
- **Category:** NEG
- **Endpoint Name:** Void
- **Request:** 2 call(s): V2 Void
- **Response:** V2 409, V2 409
- **Expected:** Rejected (gdsPNR required) with a structured 4xx.
- **Actual:** All 2 calls behaved as expected: V2 Void gdsPNR omitted: rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V2 Void gdsPNR "": rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
- **Status:** PASS
- **Evidence:** V2 Void gdsPNR omitted: rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 Void gdsPNR "": rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 Void (gds_omitted):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 2 &mdash; V2 Void (gds_empty):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)

### TC-SEATMAP-SEC-01 — PASS

- **Test Case:** [SeatMap][Request] Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap.
- **Category:** Security
- **Endpoint Name:** GetSeatMap
- **Request:** 3 call(s): V2 GetSeatMap
- **Response:** V2 401, V2 400, V2 401
- **Expected:** Altered key/Client-Id rejected (401/403/4xx); inactive selector rejected 400. A genuine cross-tenant check needs a real booking and stays BLOCKED.
- **Actual:** All 3 calls behaved as expected: altered Client-Id: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header | inactive selector UAE: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th ... (cross-tenant part not executed: needs a real booking).
- **Status:** PASS
- **Evidence:** altered Client-Id: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
inactive selector UAE: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th
altered x-api-key: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header

  - **Hop 1 &mdash; V2 GetSeatMap (bad_client):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 2 &mdash; V2 GetSeatMap (inactive_sel):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify th (0.1s)
  - **Hop 3 &mdash; V2 GetSeatMap (bad_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.4s)

### TC-SEARCH-SEC-01 — FAIL

- **Test Case:** [Search][Request] Verify isdebug=true on Search exposes raw supplierRequest/supplierResponse fields, and confirm whether isdebug=false or omitted suppresses them.
- **Category:** SEC
- **Endpoint Name:** Search
- **Request:** 8 call(s): V1 Search, V2 Search
- **Response:** V1 200, V1 200, V2 200, V2 200, V2 200, V1 200, V2 200, V2 200
- **Expected:** supplierRequest/supplierResponse must not be returned to the caller at all, and certainly never with credentials; isdebug=false/omitted must suppress them.
- **Actual:** 3 of 8 calls returned the raw supplierRequest (3 with plaintext supplier credentials); isdebug=false / omitted returned none (5 calls). V1 isdebug=true: supplierRequest RETURNED with plaintext username/password (values masked) | V1 isdebug=omitted: supplierRequest not returned | V2 isDebug=true: supplierRequest RETURNED with plaintext username/password (values masked) | V2 isDebug=false: supplierRequest not returned | V2 isdebug=true: supplierRequest RETURNED with plaintext username/password (values masked) | V1 isdebug=false: supplierRequest not returned | V2 isdebug=false: supplierRequest not returned | V2 isdebug=omitted: supplierRequest not returned
- **Status:** FAIL
- **Evidence:** Credential values were never written to this log; fields are redacted in request/response captures.

  - **Hop 1 &mdash; V1 Search (isdebug_true):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V1 Search (isdebug_undefined):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 3 &mdash; V2 Search (isDebug_true):** FAIL &mdash; 200 offers=0 (16.0s)
  - **Hop 4 &mdash; V2 Search (isDebug_false):** PASS &mdash; 200 offers=0 (16.0s)
  - **Hop 5 &mdash; V2 Search (isdebug_true):** FAIL &mdash; 200 offers=0 (16.0s)
  - **Hop 6 &mdash; V1 Search (isdebug_false):** PASS &mdash; 200 offers=0 (16.0s)
  - **Hop 7 &mdash; V2 Search (isdebug_false):** PASS &mdash; 200 offers=0 (16.0s)
  - **Hop 8 &mdash; V2 Search (isdebug_undefined):** PASS &mdash; 200 offers=0 (16.0s)

### TC-AUTH-SEC-04 — PASS

- **Test Case:** [FareConfirmAfterHold][Request] Validate injection-style payloads in free-text fields (passenger name, address, surName) are handled safely and not executed or reflected unsanitized.
- **Category:** SEC
- **Endpoint Name:** Void/PnrReprice/SeatAfterHold
- **Request:** 20 call(s): V1 Void, V2 Void, V1 PnrReprice, V2 PnrReprice, V2 SeatAfterHold
- **Response:** V1 409, V2 409, V1 409, V1 409, V2 409, V2 409, V1 409, V1 409, V2 409, V1 409, V2 409, V1 409, V1 409, V2 409, V2 409, V2 409, V2 409, V2 409, V2 409, V2 409
- **Expected:** Handled as inert data: rejected or ignored, never executed, never a 5xx, never reflected raw in an HTML context.
- **Actual:** All 20 calls behaved as expected: V1 Void surName "../../etc/passwd": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists | V2 Void surName "' OR 1=1 --": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists ... No payload is echoed.
- **Status:** PASS
- **Evidence:** V1 Void surName "../../etc/passwd": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 Void surName "' OR 1=1 --": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 PnrReprice surName "&lt;script&gt;alert(1)&lt;/script&gt;: 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 PnrReprice surName "' OR 1=1 --": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 Void surName "../../etc/passwd": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 Void surName "${7*7}{{7*7}}": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 Void surName "${7*7}{{7*7}}": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 Void surName "&lt;script&gt;alert(1)&lt;/script&gt;: 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 PnrReprice surName "&lt;script&gt;alert(1)&lt;/script&gt;: 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 PnrReprice surName "../../etc/passwd": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 SeatAfterHold surName "&lt;script&gt;alert(1)&lt;/script&gt;: 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 Void surName "' OR 1=1 --": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 PnrReprice surName "${7*7}{{7*7}}": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 PnrReprice surName "' OR 1=1 --": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 PnrReprice surName "${7*7}{{7*7}}": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 SeatAfterHold surName "${7*7}{{7*7}}": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 SeatAfterHold surName "' OR 1=1 --": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 SeatAfterHold surName "../../etc/passwd": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 Void surName "&lt;script&gt;alert(1)&lt;/script&gt;: 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 PnrReprice surName "../../etc/passwd": 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V1 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 2 &mdash; V1 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 3 &mdash; V1 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 4 &mdash; V1 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 5 &mdash; V1 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.5s)
  - **Hop 6 &mdash; V1 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 7 &mdash; V2 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 8 &mdash; V2 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 9 &mdash; V2 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 10 &mdash; V2 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.5s)
  - **Hop 11 &mdash; V1 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.5s)
  - **Hop 12 &mdash; V2 SeatAfterHold (SeatAfterHold_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 13 &mdash; V1 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 14 &mdash; V2 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 15 &mdash; V2 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 16 &mdash; V2 SeatAfterHold (SeatAfterHold_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 17 &mdash; V2 SeatAfterHold (SeatAfterHold_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 18 &mdash; V2 SeatAfterHold (SeatAfterHold_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 19 &mdash; V2 Void (Void_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)
  - **Hop 20 &mdash; V2 PnrReprice (PnrReprice_inj):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.6s)

### TC-AIEGY-CHAIN-02 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[UpSelling]&amp;[GetOfferBundles]&amp;[AddPassenger]&amp;[GetAncillary]&amp;[GetSeatMap]&amp;[Book]&amp;[Hold] [Request] Validate every downstream endpoint rejects a genuine Search responseId with an invented offerId.
- **Category:** Negative
- **Endpoint Name:** Search -&gt; downstream
- **Request:** 13 call(s): V2 Search, V1 Search, V1 Upselling, V1 GetOfferBundles, V2 Upselling, V2 GetSeatMap, V2 GetAncillary, V1 Book, V2 Hold, V1 Hold, V2 AddPassenger, V2 Book, V2 GetOfferBundles
- **Response:** V2 200, V1 200, V1 409, V1 500, V2 409, V2 400, V2 400, V1 500, V2 409, V1 409, V2 400, V2 400, V2 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx on every endpoint.
- **Actual:** 2 of 13 calls failed: V1 GetOfferBundles: SERVER ERROR - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." | V1 Book: SERVER ERROR - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V2 Search: 200 offers=0
V1 Search: 200 offers=0
V1 UpSelling: rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 GetOfferBundles: SERVER ERROR - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
V2 UpSelling: rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 GetSeatMap: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 GetAncillary: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V1 Book: SERVER ERROR - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
V2 Hold: rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V1 Hold: rejected - 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists
V2 AddPassenger: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 Book: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 GetOfferBundles: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer

  - **Hop 1 &mdash; V2 Search (chain2_search):** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Search (chain2_search):** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Upselling (chain2_UpSelling):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 4 &mdash; V1 GetOfferBundles (chain2_GetOfferBundles):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.1s)
  - **Hop 5 &mdash; V2 Upselling (chain2_UpSelling):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.1s)
  - **Hop 6 &mdash; V2 GetOfferBundles (chain2_GetOfferBundles):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.4s)
  - **Hop 7 &mdash; V2 GetSeatMap (chain2_GetSeatMap):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.3s)
  - **Hop 8 &mdash; V2 GetAncillary (chain2_GetAncillary):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.3s)
  - **Hop 9 &mdash; V1 Book (chain2_Book):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.3s)
  - **Hop 10 &mdash; V2 Hold (chain2_Hold):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.3s)
  - **Hop 11 &mdash; V1 Hold (chain2_Hold):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.4s)
  - **Hop 12 &mdash; V2 AddPassenger (chain2_AddPassenger):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.4s)
  - **Hop 13 &mdash; V2 Book (chain2_Book):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.4s)

### TC-AIEGY-EXP-02 — PASS

- **Test Case:** [Search][Boundary] Verify valid passenger mixes up to the 9-passenger limit (1 ADT, 2 ADT + 1 INF, 4 ADT + 3 CHD + 2 INF, 9 ADT) are accepted by Search validation.
- **Category:** Boundary
- **Endpoint Name:** Search
- **Request:** 8 call(s): V1 Search, V2 Search
- **Response:** V1 200, V1 200, V1 200, V1 200, V2 200, V2 200, V2 200, V2 200
- **Expected:** HTTP 200 (not rejected) for every valid mix.
- **Actual:** All 8 calls behaved as expected: V1 4A+3C+2I: 200 offers=0 | V1 1A: 200 offers=0 ...
- **Status:** PASS
- **Evidence:** V1 4A+3C+2I: 200 offers=0
V1 1A: 200 offers=0
V1 9A: 200 offers=0
V1 2A+1I: 200 offers=0
V2 2A+1I: 200 offers=0
V2 1A: 200 offers=0
V2 9A: 200 offers=0
V2 4A+3C+2I: 200 offers=0

  - **Hop 1 &mdash; V1 Search (mix_4A+3C+2I):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V1 Search (mix_1A):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 3 &mdash; V1 Search (mix_9A):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 4 &mdash; V1 Search (mix_2A+1I):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 5 &mdash; V2 Search (mix_1A):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 6 &mdash; V2 Search (mix_2A+1I):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 7 &mdash; V2 Search (mix_9A):** PASS &mdash; 200 offers=0 (15.4s)
  - **Hop 8 &mdash; V2 Search (mix_4A+3C+2I):** PASS &mdash; 200 offers=0 (15.4s)

### TC-AIEGY-EXP-03 — PASS

- **Test Case:** [Search][Regression] Verify eight identical concurrent Searches all return the same status, schema and offer count (no throttling or 5xx).
- **Category:** Regression
- **Endpoint Name:** Search
- **Request:** 16 call(s): V1 Search, V2 Search
- **Response:** V1 200, V1 200, V1 200, V1 200, V1 200, V1 200, V1 200, V1 200, V2 200, V2 200, V2 200, V2 200, V2 200, V2 200, V2 200, V2 200
- **Expected:** Identical results, no 429/5xx, distinct responseIds.
- **Actual:** All 16 calls behaved as expected: V1 #4: 200 offers=0 15.1s | V1 #2: 200 offers=0 15.1s ... responseIds are all distinct
- **Status:** PASS
- **Evidence:** V1 #4: 200 offers=0 15.1s
V1 #2: 200 offers=0 15.1s
V1 #6: 200 offers=0 15.1s
V1 #3: 200 offers=0 15.1s
V1 #1: 200 offers=0 15.1s
V1 #5: 200 offers=0 15.1s
V1 #8: 200 offers=0 15.1s
V1 #7: 200 offers=0 15.1s
V2 #3: 200 offers=0 15.3s
V2 #4: 200 offers=0 15.3s
V2 #5: 200 offers=0 15.3s
V2 #2: 200 offers=0 15.3s
V2 #8: 200 offers=0 15.3s
V2 #1: 200 offers=0 15.3s
V2 #7: 200 offers=0 15.3s
V2 #6: 200 offers=0 15.4s

  - **Hop 1 &mdash; V1 Search (par1):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V1 Search (par0):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 3 &mdash; V1 Search (par3):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 4 &mdash; V1 Search (par5):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 5 &mdash; V1 Search (par2):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 6 &mdash; V1 Search (par4):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 7 &mdash; V1 Search (par7):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 8 &mdash; V1 Search (par6):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 9 &mdash; V2 Search (par2):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 10 &mdash; V2 Search (par3):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 11 &mdash; V2 Search (par1):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 12 &mdash; V2 Search (par0):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 13 &mdash; V2 Search (par4):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 14 &mdash; V2 Search (par7):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 15 &mdash; V2 Search (par6):** PASS &mdash; 200 offers=0 (15.3s)
  - **Hop 16 &mdash; V2 Search (par5):** PASS &mdash; 200 offers=0 (15.4s)

### TC-AIEGY-EXP-04 — PASS

- **Test Case:** [Search][Validation] Verify searchModifiers.filterationCriteria.preferredAirlines is accepted with AI, with an unknown carrier (XX) and with an empty list.
- **Category:** Validation
- **Endpoint Name:** Search
- **Request:** 6 call(s): V1 Search, V2 Search
- **Response:** V1 200, V1 200, V1 200, V2 200, V2 200, V2 200
- **Expected:** No 5xx; filter accepted or rejected cleanly.
- **Actual:** All 6 calls behaved as expected: V1 preferredAirlines empty: 200 offers=0 | V1 preferredAirlines AI: 200 offers=0 ...
- **Status:** PASS
- **Evidence:** V1 preferredAirlines empty: 200 offers=0
V1 preferredAirlines AI: 200 offers=0
V1 preferredAirlines XX: 200 offers=0
V2 preferredAirlines XX: 200 offers=0
V2 preferredAirlines empty: 200 offers=0
V2 preferredAirlines AI: 200 offers=0

  - **Hop 1 &mdash; V1 Search (pref_empty):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V1 Search (pref_AI):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 3 &mdash; V1 Search (pref_XX):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 4 &mdash; V2 Search (pref_AI):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 5 &mdash; V2 Search (pref_XX):** PASS &mdash; 200 offers=0 (15.1s)
  - **Hop 6 &mdash; V2 Search (pref_empty):** PASS &mdash; 200 offers=0 (15.1s)

### TC-AIEGY-FARECONFIRM-NEG-02 — PASS

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** FareConfirm
- **Request:** 8 call(s): V2 FareConfirm, V1 FareConfirm
- **Response:** V2 400, V1 400, V2 400, V1 400, V1 400, V2 400, V2 400, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 8 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 omit selectedOfferId: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit ResponseId: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit searchResponseId: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out

  - **Hop 1 &mdash; V2 FareConfirm (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 2 &mdash; V1 FareConfirm (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 3 &mdash; V1 FareConfirm (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 4 &mdash; V1 FareConfirm (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 5 &mdash; V2 FareConfirm (omit_ResponseId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.3s)
  - **Hop 6 &mdash; V2 FareConfirm (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.4s)
  - **Hop 7 &mdash; V1 FareConfirm (omit_searchResponseId):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (143.0s)
  - **Hop 8 &mdash; V2 FareConfirm (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)

### TC-AIEGY-FARECONFIRM-NEG-03 — PASS

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** FareConfirm
- **Request:** 16 call(s): V1 FareConfirm, V2 FareConfirm
- **Response:** V1 400, V1 400, V1 400, V1 400, V1 400, V1 400, V1 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V2 400, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 searchResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V1 searchResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V1 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 searchResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V1 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V1 searchResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V1 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V2 selectedOfferId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V2 selectedOfferId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
V2 selectedOfferId=1000chars: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V2 ResponseId=empty: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V2 ResponseId=null: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V2 ResponseId=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V2 ResponseId=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
V1 selectedOfferId=1000chars: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out

  - **Hop 1 &mdash; V1 FareConfirm (searchResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 2 &mdash; V1 FareConfirm (searchResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 3 &mdash; V1 FareConfirm (searchResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 4 &mdash; V1 FareConfirm (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 5 &mdash; V1 FareConfirm (searchResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 6 &mdash; V1 FareConfirm (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 7 &mdash; V1 FareConfirm (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 8 &mdash; V2 FareConfirm (ResponseId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)
  - **Hop 9 &mdash; V2 FareConfirm (ResponseId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)
  - **Hop 10 &mdash; V2 FareConfirm (ResponseId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.7s)
  - **Hop 11 &mdash; V1 FareConfirm (selectedOfferId_1000chars):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (143.0s)
  - **Hop 12 &mdash; V2 FareConfirm (selectedOfferId_empty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 13 &mdash; V2 FareConfirm (selectedOfferId_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 14 &mdash; V2 FareConfirm (selectedOfferId_null):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 15 &mdash; V2 FareConfirm (selectedOfferId_1000chars):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.1s)
  - **Hop 16 &mdash; V2 FareConfirm (ResponseId_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)

### TC-AIEGY-RETRIEVE-NEG-02 — PASS

- **Test Case:** [Retrieve][Request] Validate Retrieve rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** Retrieve
- **Request:** 10 call(s): V2 Retrieve, V1 Retrieve
- **Response:** V2 400, V2 400, V1 400, V1 400, V2 400, V1 400, V2 409, V2 409, V1 409, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 10 omit-field calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V2 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V2 omit pnr: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required
V1 omit credentialsSelector: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector
V1 omit pnr: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required
V2 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V1 omit supplier: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
V2 omit bookingToken: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V2 omit gdsPNR: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V1 omit gdsPnr: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V1 omit bookingToken: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out

  - **Hop 1 &mdash; V2 Retrieve (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.2s)
  - **Hop 2 &mdash; V2 Retrieve (omit_pnr):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.2s)
  - **Hop 3 &mdash; V1 Retrieve (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.2s)
  - **Hop 4 &mdash; V1 Retrieve (omit_pnr):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.2s)
  - **Hop 5 &mdash; V2 Retrieve (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.5s)
  - **Hop 6 &mdash; V1 Retrieve (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.5s)
  - **Hop 7 &mdash; V1 Retrieve (omit_gdsPnr):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (136.4s)
  - **Hop 8 &mdash; V1 Retrieve (omit_bookingToken):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (136.4s)
  - **Hop 9 &mdash; V2 Retrieve (omit_bookingToken):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (134.7s)
  - **Hop 10 &mdash; V2 Retrieve (omit_gdsPNR):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (134.7s)

### TC-AIEGY-RETRIEVE-NEG-01 — PASS

- **Test Case:** [Retrieve][Request] Validate Retrieve rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** Retrieve
- **Request:** 2 call(s): V2 Retrieve, V1 Retrieve
- **Response:** V2 409, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V2 unknown ids: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out | V1 unknown ids: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
- **Status:** PASS
- **Evidence:** V2 unknown ids: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V1 unknown ids: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out

  - **Hop 1 &mdash; V1 Retrieve (unknown_ids):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (137.1s)
  - **Hop 2 &mdash; V2 Retrieve (unknown_ids):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (135.3s)

### TC-AIEGY-RETRIEVE-NEG-03 — PASS

- **Test Case:** [Retrieve][Request] Validate Retrieve rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Boundary
- **Endpoint Name:** Retrieve
- **Request:** 16 call(s): V1 Retrieve, V2 Retrieve
- **Response:** V1 400, V1 400, V1 400, V1 400, V2 400, V2 400, V1 400, V2 400, V2 400, V2 400, V1 409, V2 409, V1 409, V1 409, V2 409, V2 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 16 bad-id calls rejected with a structured error
- **Status:** PASS
- **Evidence:** V1 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required.
V1 pnr=null: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required
V1 pnr=empty: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required
V1 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V2 pnr=empty: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required
V2 pnr=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required.
V1 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required.
V2 pnr=null: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required
V2 pnr=1000chars: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters
V2 bookingToken=number: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required.
V1 bookingToken=1000chars: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V2 bookingToken=empty: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V1 bookingToken=null: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V1 bookingToken=empty: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V2 bookingToken=1000chars: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out
V2 bookingToken=null: rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out

  - **Hop 1 &mdash; V1 Retrieve (pnr_null):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.5s)
  - **Hop 2 &mdash; V1 Retrieve (pnr_empty):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.5s)
  - **Hop 3 &mdash; V1 Retrieve (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.5s)
  - **Hop 4 &mdash; V1 Retrieve (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.5s)
  - **Hop 5 &mdash; V2 Retrieve (pnr_empty):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.5s)
  - **Hop 6 &mdash; V2 Retrieve (pnr_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.5s)
  - **Hop 7 &mdash; V1 Retrieve (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.5s)
  - **Hop 8 &mdash; V2 Retrieve (pnr_null):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.6s)
  - **Hop 9 &mdash; V2 Retrieve (pnr_1000chars):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.6s)
  - **Hop 10 &mdash; V1 Retrieve (bookingToken_1000chars):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (135.9s)
  - **Hop 11 &mdash; V1 Retrieve (bookingToken_null):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (136.6s)
  - **Hop 12 &mdash; V1 Retrieve (bookingToken_empty):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (136.6s)
  - **Hop 13 &mdash; V2 Retrieve (bookingToken_null):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (138.0s)
  - **Hop 14 &mdash; V2 Retrieve (bookingToken_number):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.6s)
  - **Hop 15 &mdash; V2 Retrieve (bookingToken_empty):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (136.6s)
  - **Hop 16 &mdash; V2 Retrieve (bookingToken_1000chars):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (138.0s)

### TC-AIEGY-CHAIN-01 — PASS

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a genuine Search responseId paired with an offerId that Search never returned.
- **Category:** Negative
- **Endpoint Name:** Search -&gt; FareConfirm
- **Request:** 4 call(s): V2 Search, V1 Search, V2 FareConfirm, V1 FareConfirm
- **Response:** V2 200, V1 200, V2 400, V1 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx.
- **Actual:** All 4 calls behaved as expected: V2 Search: 200 offers=0 responseId present | V1 Search: 200 offers=0 responseId present ...
- **Status:** PASS
- **Evidence:** V2 Search: 200 offers=0 responseId present
V1 Search: 200 offers=0 responseId present
V2 FareConfirm real responseId + invented offerId: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer
V1 FareConfirm real responseId + invented offerId: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out

  - **Hop 1 &mdash; V2 Search (chain_search):** PASS &mdash; 200
  - **Hop 2 &mdash; V1 Search (chain_search):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 FareConfirm (chain_fc):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.1s)
  - **Hop 4 &mdash; V1 FareConfirm (chain_fc):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (133.6s)

### TC-VERSIONDIFF-NEG-02 — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book] [Response] Verify an identical invalid supplier/credentialsSelector value produces the same error shape across Search, FareConfirm, and Book.
- **Category:** NEG
- **Endpoint Name:** Search/FareConfirm/Book
- **Request:** 6 call(s): V1 FareConfirm, V1 Search, V2 Book, V2 FareConfirm, V2 Search, V1 Book
- **Response:** V1 400, V1 400, V2 400, V2 400, V2 400, V1 400
- **Expected:** Same error shape for the same invalid input on all three endpoints.
- **Actual:** Identical on all 6 calls: 400/camel/1001
- **Status:** PASS
- **Evidence:** V1 FareConfirm: 400/camel/1001
V1 Search: 400/camel/1001
V2 Book: 400/camel/1001
V2 FareConfirm: 400/camel/1001
V2 Search: 400/camel/1001
V1 Book: 400/camel/1001

  - **Hop 1 &mdash; V1 Search (badsupplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.5s)
  - **Hop 2 &mdash; V1 FareConfirm (badsupplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.5s)
  - **Hop 3 &mdash; V2 Search (badsupplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (0.5s)
  - **Hop 4 &mdash; V1 Book (badsupplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.5s)
  - **Hop 5 &mdash; V2 Book (badsupplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.5s)
  - **Hop 6 &mdash; V2 FareConfirm (badsupplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.5s)

### TC-SEATAFTERHOLD-SEC-02 — PASS

- **Test Case:** [SeatAfterHold][Request] Apply the three universal security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to SeatAfterHold.
- **Category:** Security
- **Endpoint Name:** SeatAfterHold
- **Request:** 3 call(s): V2 SeatAfterHold
- **Response:** V2 401, V2 401, V2 409
- **Expected:** Altered key/Client-Id rejected (401/403/4xx); inactive selector rejected 400. A genuine cross-tenant check needs a real booking and stays BLOCKED.
- **Actual:** All 3 calls behaved as expected: altered x-api-key: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header | altered Client-Id: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header ... (cross-tenant part not executed: needs a real booking).
- **Status:** PASS
- **Evidence:** altered x-api-key: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
altered Client-Id: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
inactive selector UAE: 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists

  - **Hop 1 &mdash; V2 SeatAfterHold (bad_key):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.5s)
  - **Hop 2 &mdash; V2 SeatAfterHold (bad_client):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.8s)
  - **Hop 3 &mdash; V2 SeatAfterHold (inactive_sel):** PASS &mdash; 409 OperationNotSupported "This action is not currently supported by the selected supplier." ctx: AirIndia does not exists (0.8s)

### TC-AIEGY-EXP-01 — FAIL

- **Test Case:** [Search][Positive] Verify a valid round-trip Search (DEL-BOM-DEL) is accepted with HTTP 200 and the documented schema, and that an unsupported multi-city Search is rejected clearly and identically on V1 and V2.
- **Category:** Positive
- **Endpoint Name:** Search
- **Request:** 4 call(s): V2 Search, V1 Search
- **Response:** V2 409, V1 400, V2 200, V1 200
- **Expected:** Round trip: HTTP 200 with responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails and offers present. Multi-city (unsupported by the supplier): a structured 4xx, the same status and ErrorCode on V1 and V2. (Offer content cannot be checked without inventory.)
- **Actual:** All 4 calls behaved as expected: V2 multi-city (not supported by the supplier): rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The supplier does not support multi city searches | V1 multi-city (not supported by the supplier): rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The supplier does not support multi city searches ... V1 and V2 report the same unsupported multi-city search differently: 409/NDC-INT-UNC-Z9999 vs 400/NDC-INT-TEC-A0001.
- **Status:** FAIL
- **Evidence:** V2 multi-city (not supported by the supplier): rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The supplier does not support multi city searches
V1 multi-city (not supported by the supplier): rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The supplier does not support multi city searches
V2 round trip: 200 offers=0 schema keys complete
V1 round trip: 200 offers=0 schema keys complete
Offers empty on every call (no inventory): content, pricing and itinerary linkage of a round trip could not be verified.

  - **Hop 1 &mdash; V1 Search (round_trip):** PASS &mdash; 200 offers=0 (15.5s)
  - **Hop 2 &mdash; V2 Search (multi-city):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The supplier does not support multi city searches (1.1s)
  - **Hop 3 &mdash; V1 Search (multi-city):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The supplier does not support multi city searches (1.1s)
  - **Hop 4 &mdash; V2 Search (round_trip):** PASS &mdash; 200 offers=0 (15.5s)

### TC-FARECONFIRM-VAL-01 — FAIL

- **Test Case:** [FareConfirm][Request] Validate V1's searchResponseId and V2's ResponseId field names are each accepted only under their own version's contract, not interchangeably.
- **Category:** VAL
- **Endpoint Name:** FareConfirm
- **Request:** 2 call(s): V1 FareConfirm, V2 FareConfirm
- **Response:** V1 409, V2 400
- **Expected:** Each version rejects the other version's field name as a missing required field.
- **Actual:** 1 of 2 calls failed: V1: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 134.7s - the request was FORWARDED to the supplier (field searchResponseId missing) and timed out
- **Status:** FAIL
- **Evidence:** V1: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 134.7s - the request was FORWARDED to the supplier (field searchResponseId missing) and timed out
V2: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer after 0.4s - rejected locally

  - **Hop 1 &mdash; V1 FareConfirm (V1_with_ResponseId):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (134.7s)
  - **Hop 2 &mdash; V2 FareConfirm (V2_with_searchResponseId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer (0.4s)

### TC-AIEGY-SEC-02 — FAIL

- **Test Case:** [Security][Response] Verify an ordinary (non-debug) error response never contains OriginalSupplierRequest / OriginalSupplierResponse or supplier credentials.
- **Category:** Security
- **Endpoint Name:** Retrieve/FareConfirm
- **Request:** 3 call(s): V1 FareConfirm, V1 Retrieve, V2 Retrieve
- **Response:** V1 409, V1 409, V2 409
- **Expected:** Error bodies carry no raw supplier payload and no credentials.
- **Actual:** 3 of 3 calls failed: V1 FareConfirm: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 134.7s; OriginalSupplierRequest PRESENT (90 chars, contains plaintext username/password - masked), OriginalSupplierResponse present | V1 Retrieve: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 134.7s; OriginalSupplierRequest PRESENT (90 chars, contains plaintext username/password - masked), OriginalSupplierResponse present | V2 Retrieve: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 136.7s; OriginalSupplierRequest PRESENT (90 chars, contains plaintext username/password - masked), OriginalSupplierResponse present
- **Status:** FAIL
- **Evidence:** V1 FareConfirm: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 134.7s; OriginalSupplierRequest PRESENT (90 chars, contains plaintext username/password - masked), OriginalSupplierResponse present
V1 Retrieve: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 134.7s; OriginalSupplierRequest PRESENT (90 chars, contains plaintext username/password - masked), OriginalSupplierResponse present
V2 Retrieve: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out after 136.7s; OriginalSupplierRequest PRESENT (90 chars, contains plaintext username/password - masked), OriginalSupplierResponse present

  - **Hop 1 &mdash; V1 Retrieve (err_body):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (134.7s)
  - **Hop 2 &mdash; V2 Retrieve (err_body):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (136.7s)
  - **Hop 3 &mdash; V1 FareConfirm (err_body):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Connection timed out (134.7s)

### TC-AIEGY-SEC-LEAK-01 — FAIL

- **Test Case:** [Security][Response] Verify no error response from any call in this run exposes stack traces, internal class names, file paths or supplier secrets.
- **Category:** Security
- **Endpoint Name:** All endpoints
- **Request:** 666 captured responses scanned
- **Response:** 126 with internal detail
- **Expected:** No internal detail in any response (isdebug=true excluded: covered by TC-SEARCH-SEC-01).
- **Actual:** 126 of 666 responses contain internal detail: V1 FareConfirm [unknown_ids] 409: "Exception" | V1 Search [date_abc_] 400: "System.DateTime" | V2 Search [date_25_11_2026_] 400: "System.DateTime" | V2 Search [date_abc_] 400: "System.DateTime" | V2 Search [date_2026_13_45_] 400: "System.DateTime"
- **Status:** FAIL
- **Evidence:** V1 FareConfirm [unknown_ids] 409: "Exception"
V1 Search [date_abc_] 400: "System.DateTime"
V2 Search [date_25_11_2026_] 400: "System.DateTime"
V2 Search [date_abc_] 400: "System.DateTime"
V2 Search [date_2026_13_45_] 400: "System.DateTime"
V1 Search [date_2026_13_45_] 400: "System.DateTime"
V1 Search [date_] 400: "System.DateTime"
V1 Search [date_25_11_2026_] 400: "System.DateTime"
V2 Search [date_] 400: "System.DateTime"
V1 Search [ADT_count_1_5] 400: "System.Int32"
V1 Search [ADT_count_abc_] 400: "System.Int32"
V2 Search [ADT_count_1_5] 400: "System.Int32"
V2 Search [ADT_count_abc_] 400: "System.Int32"
V1 FareConfirm [searchResponseId_number] 400: "System.Guid"
V1 FareConfirm [searchResponseId_empty] 400: "System.Guid"
V1 FareConfirm [searchResponseId_1000chars] 400: "System.Guid"
V1 FareConfirm [searchResponseId_null] 400: "System.Guid"
V1 FareConfirm [selectedOfferId_number] 400: "System.String"
V2 FareConfirm [selectedOfferId_number] 400: "System.String"
V2 FareConfirm [ResponseId_empty] 400: "System.Guid"

### TC-AIEGY-ENV-01 — FAIL

- **Test Case:** [Regression][Response] Verify every 4xx error in this run uses one envelope (Status, TransactionId, ErrorCode, ErrorMessage, Context) with consistent casing and a matching HTTP status.
- **Category:** Regression
- **Endpoint Name:** All endpoints
- **Request:** 570 4xx responses analysed
- **Response:** {"PascalCase":257,"camelCase":307}
- **Expected:** A single envelope shape and casing; body Status equals the HTTP status; every error carries a TransactionId.
- **Actual:** 570 4xx responses: casing {"PascalCase":257,"camelCase":307}; ErrorCodes {"1001":307,"NDC-INT-TEC-A0001":73,"NDC-INT-UNC-Z9999":24,"AuthenticationError":20,"OperationNotSupported":140}; 6 without an error envelope; 0 whose body Status differs from the HTTP status; 0 without TransactionId.
- **Status:** FAIL
- **Evidence:** No envelope:
V1 Search 405 [PUT] null
V2 Search 405 [DELETE] null
V2 Search 405 [PUT] null
V1 Search 405 [DELETE] null
V1 Search 405 [GET] null
V2 Search 405 [GET] null
camelCase envelope:
V2 Search [supplier_omitted] 400 code 1001
V1 Search [supplier_omitted] 400 code 1001
V2 Search [searchCriteria_omitted] 400 code 1001
V1 Search [searchCriteria_omitted] 400 code 1001
V2 Search [supplier_Air_India] 400 code 1001
V2 Search [credentialsSelector_null] 400 code 1001
V1 Search [supplier_] 400 code 1001
V1 Search [supplier_AirIndiaX] 400 code 1001

### TC-SEARCH-BIZ-02 — BLOCKED

- **Test Case:** [Search][Response] Verify the per-passenger-type price-reconciliation formula holds on every returned Search offer.
- **Category:** BIZ
- **Endpoint Name:** SEARCH
- **Request:** Not sent
- **Response:** n/a
- **Expected:** All four reconciliation checks hold for every offer and every passenger type present.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEARCH-REG-01 — BLOCKED

- **Test Case:** [Search][Response] Verify Search response schema matches the baseline [Observed example] shape with no unexpected field removal, rename, or retype.
- **Category:** REG
- **Endpoint Name:** SEARCH
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Schema matches the baseline exactly; any drift (field renamed, removed, or retyped) is reported as a regression even if the flow otherwise passes.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECONFIRM-POS-01 — BLOCKED

- **Test Case:** [FareConfirm][Request] Verify FareConfirm returns a re-priced selectedOffer for a valid same-call responseId + selectedOfferId pair.
- **Category:** POS
- **Endpoint Name:** FARECONFIRM
- **Request:** Not sent
- **Response:** n/a
- **Expected:** HTTP 200; selectedOffer present with offerId, priceDetails, refundability; V2 additionally carries haveBundles/canBeHeld/isAncillaryRequired/offerHasAncillary/isBaggageRequired/isMealRequired/isSeatMapRequired flags not present in V1's shape.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECONFIRM-NEG-01 — BLOCKED

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a responseId + selectedOfferId pair originating from two different Search calls.
- **Category:** NEG
- **Endpoint Name:** FARECONFIRM
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Expected to 4xx or return a supplier-level 'offer no longer available'-style error; exact behavior UNKNOWN, confirm live -- high-value negative test per section 1.7.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECONFIRM-BIZ-02 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify capability flags (haveBundles/canBeHeld/offerHasAncillary/isSeatMapRequired) stay consistent between Search and FareConfirm for the same offer.
- **Category:** BIZ
- **Endpoint Name:** FARECONFIRM
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Flags match between the two responses for the same offer; a flag flipping between steps is itself a defect worth reporting, not expected behavior.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECONFIRM-INT-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify Search's responseId and offers[0].offerId hand off correctly into FareConfirm's required fields.
- **Category:** INT
- **Endpoint Name:** FARECONFIRM
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareConfirm succeeds using only Search's own output, with no manual field substitution beyond the documented name mapping.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECONFIRM-NEG-02 — BLOCKED

- **Test Case:** [FareConfirm][Request] Validate FareConfirm behavior when confirming an offer whose underlying inventory sold out between Search and FareConfirm.
- **Category:** NEG
- **Endpoint Name:** FARECONFIRM
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Expected to surface as a distinct 'offer unavailable'-style error rather than a generic 500; exact shape UNKNOWN, confirm live.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BUNDLE-POS-01 — BLOCKED

- **Test Case:** [GetOfferBundles][Request] Verify GetOfferBundles returns bundleChoices for an offer with haveBundles=true.
- **Category:** POS
- **Endpoint Name:** BUNDLE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** bundleChoices populated with bundleCode/bundleName/bundlePrices/includedServices per bundle; offerJourneys is a map keyed by segmentRefId, each with a bundleReferences array.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BUNDLE-NEG-01 — BLOCKED

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles behavior when called for an offer with haveBundles=false.
- **Category:** NEG
- **Endpoint Name:** BUNDLE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact result (empty bundleChoices vs explicit error) -- confirm live; a bundle-incapable offer should not silently return usable bundle data.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BUNDLE-REG-01 — BLOCKED

- **Test Case:** [GetOfferBundles][Response] Verify the JourneyKey1 script variable (resp.offerJourneys.key) is undefined against the real offerJourneys shape, in both V1 and V2 collections.
- **Category:** REG
- **Endpoint Name:** BUNDLE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** resp.offerJourneys.key evaluates to undefined since offerJourneys has no literal key property; JourneyKey1 does not appear to be consumed by any other request in either collection (likely a dead/inert variable), but the mismatch should still be reported as a script/response-shape defect.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BUNDLE-VAL-02 — BLOCKED

- **Test Case:** [GetOfferBundles][Response] Validate bundleChoices keys are a subset of the bundleReferences listed per journey in offerJourneys.
- **Category:** VAL
- **Endpoint Name:** BUNDLE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every bundleReferences code maps to a real bundleChoices entry; no orphaned references.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BUNDLE-VAL-03 — BLOCKED

- **Test Case:** [GetOfferBundles][Response] Validate includedServices mixes machine-readable tags with free-text rule strings, and known tags remain a subset rather than an exact-match set.
- **Category:** VAL
- **Endpoint Name:** BUNDLE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Assertion passes as long as known tags are present as a subset; the array is not asserted to equal a fixed set, since human-readable rule strings coexist in the same array.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-POS-02 — BLOCKED

- **Test Case:** [Book][Request] Verify Book commits a confirmed offer to a live PNR and returns pnr/bookingToken/gdsPNR.
- **Category:** POS
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** HTTP 200; pnr, bookingToken, gdsPNR non-empty; voidCapability present; passengersList is echoed in the RESPONSE for V2 even though absent from the V2 request (server resolves it from AddPassenger).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-04 — BLOCKED

- **Test Case:** [Book][Request] Validate behavior when booking twice with the same offer reference (double-booking attempt).
- **Category:** NEG
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN whether the second call is idempotently rejected or produces a second PNR -- confirm live; high-value negative test.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-03 — BLOCKED

- **Test Case:** [Book][Response] Verify the price-reconciliation formula holds on Book's response.
- **Category:** BIZ
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** All reconciliation checks hold.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-SEC-01 — BLOCKED

- **Test Case:** [Book][Request] Verify a Book call against a commercially blacklisted supplier/airline is blocked at the business layer.
- **Category:** SEC
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Blocked/rejected at the business layer even though technically reachable through Search/FareConfirm; exact rejection mechanism UNKNOWN, confirm live. GLC specifically requires 'inform us first before issuing any ticket' rather than an outright block -- do not treat it identically to the outright-blacklisted suppliers.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-04 — BLOCKED

- **Test Case:** [Book] Verify the production-booking auto-skip discipline is enforced as a manual process control before any Book/BookAfterHold execution against a production base URL.
- **Category:** BIZ
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** No Book/BookAfterHold execution proceeds against a PROD baseUrl without explicit, documented authorization, regardless of Supplier_Name/Credentials_Selector configured.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-05 — BLOCKED

- **Test Case:** [Book][Request] Validate Book rejects a selectedOfferId that does not match the fareConfirmResponseId/ResponseId supplied in the same request.
- **Category:** NEG
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Rejected; exact error shape UNKNOWN, confirm live.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-HOLD-POS-01 — BLOCKED

- **Test Case:** [Hold][Request] Verify Hold reserves an offer without immediate ticketing and returns pnr/bookingToken/gdsPNR plus holdExpirationDate.
- **Category:** POS
- **Endpoint Name:** HOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** HTTP 200; pnr, bookingToken, gdsPNR non-empty; holdExpirationDate present and in the future.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-HOLD-NEG-02 — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier/offer with canBeHeld=false (e.g. FlyNas, GLC).
- **Category:** NEG
- **Endpoint Name:** HOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Expected to fail; exact rejection shape UNKNOWN, confirm live. Per section 4.4, AirCairo/EgyptAir/Galileo/SpiceJet/GLC's Hold capability is disputed across sources -- trust the live canBeHeld flag over either static document when selecting suppliers for this case.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-HOLD-BIZ-01 — BLOCKED

- **Test Case:** [Hold][Response] Verify the price-reconciliation formula holds on Hold's response in both V1 and V2.
- **Category:** BIZ
- **Endpoint Name:** HOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** All reconciliation checks hold in both versions.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-HOLD-BND-01 — BLOCKED

- **Test Case:** [Hold]&amp;[FareConfirmAfterHold]&amp;[BookAfterHold]&amp;[CancelAfterHold] [Response] Verify behavior when FareConfirmAfterHold, BookAfterHold, or CancelAfterHold is attempted after the booking's holdExpirationDate has passed.
- **Category:** BND
- **Endpoint Name:** HOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact behavior for each of the three calls -- confirm live whether rejected outright or accepted with a price/availability re-check; applies identically in both versions and is not covered by any flow.md-listed flow number.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-RETRIEVE-POS-01 — BLOCKED

- **Test Case:** [Retrieve][Response] Verify bookingStatus reflects the correct lifecycle stage (Held after Hold, Booked after Book/BookAfterHold).
- **Category:** POS
- **Endpoint Name:** RETRIEVE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** bookingStatus matches the expected lifecycle stage for the preceding action (record the actual observed string value as the regression baseline, since the full enumeration is UNKNOWN).
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-RETRIEVE-REG-01 — BLOCKED

- **Test Case:** [Retrieve] Verify V2 Retrieve has zero test-script assertions, the largest single V1/V2 coverage gap of any endpoint.
- **Category:** REG
- **Endpoint Name:** RETRIEVE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Manual testing independently supplies the price-reconciliation and bookingStatus checks for V2 Retrieve, since V2's script provides none of what V1's does automatically.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-RETRIEVE-VAL-01 — BLOCKED

- **Test Case:** [Retrieve][Response] Validate bookingStatus is one of the currently-known set, or flagged as a newly-observed value rather than hard-failed.
- **Category:** VAL
- **Endpoint Name:** RETRIEVE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** No full enumeration exists yet (UNKNOWN per section 8.3) -- this is a first-round exploratory priority; every distinct value observed must be recorded and fed back into SPEC.md's living-document update process rather than hard-failing on an unrecognized value.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-RETRIEVE-INT-01 — BLOCKED

- **Test Case:** [Hold]&amp;[Retrieve] [Response] Verify Retrieve immediately after Hold vs. after holdExpirationDate has passed returns the expected bookingStatus transition.
- **Category:** INT
- **Endpoint Name:** RETRIEVE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Expected transition on expiry is UNKNOWN -- high-value exploratory test; record whatever is actually observed as the new baseline.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FCAH-BIZ-01 — BLOCKED

- **Test Case:** [FareConfirmAfterHold][Response] Verify whether the reported price differs from the original Hold price after a hold-window delay (price-drift exploratory check).
- **Category:** BIZ
- **Endpoint Name:** FCAH
- **Request:** Not sent
- **Response:** n/a
- **Expected:** In the common case, price should match with no drift; a mismatch is the price-drift scenario itself, not necessarily a bug -- report either outcome with the observed delta.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FCAH-NEG-01 — BLOCKED

- **Test Case:** [FareConfirmAfterHold][Request] Validate FareConfirmAfterHold behavior when called after the hold's holdExpirationDate has passed.
- **Category:** NEG
- **Endpoint Name:** FCAH
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- expected to fail or return a price/availability change requiring re-acceptance; confirm live and record.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOKAFTERHOLD-REG-01 — BLOCKED

- **Test Case:** [Hold]&amp;[BookAfterHold] [Response] Verify pnr/bookingToken/gdsPNR returned by BookAfterHold equal the values established at Hold (same-PNR invariant).
- **Category:** REG
- **Endpoint Name:** BOOKAFTERHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** pnr, bookingToken, and gdsPNR returned by BookAfterHold are byte-identical to the values from Hold; any change is treated as a defect.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOKAFTERHOLD-NEG-01 — BLOCKED

- **Test Case:** [BookAfterHold][Request] Validate BookAfterHold is rejected when attempted on an expired hold.
- **Category:** NEG
- **Endpoint Name:** BOOKAFTERHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Expected to fail; exact error shape UNKNOWN, confirm live.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-VOID-BIZ-01 — BLOCKED

- **Test Case:** [Book]&amp;[Void] [Request] Verify Void only succeeds within the window implied by the booking's live voidCapability flag, not merely the static per-supplier Void column.
- **Category:** BIZ
- **Endpoint Name:** VOID
- **Request:** Not sent
- **Response:** n/a
- **Expected:** A booking whose voidCapability read 'VoidNotAllowed' at Book time is not voidable; treat the live per-booking flag as authoritative over the static section 4.2 matrix's supplier-level Void column.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-VOID-NEG-02 — BLOCKED

- **Test Case:** [Void][Request] Validate Void is rejected when surName does not match the booking's passenger record.
- **Category:** NEG
- **Endpoint Name:** VOID
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Rejected due to surName mismatch; exact error shape UNKNOWN, confirm live.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-CANCELHOLD-REG-01 — BLOCKED

- **Test Case:** [CancelAfterHold] Verify CancelAfterHold is the least-validated endpoint in the API, with zero test-script coverage and no genuine saved example response in either version.
- **Category:** REG
- **Endpoint Name:** CANCELHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** No automated assertion exists to catch a regression here; a follow-up Retrieve showing a cancelled/terminated bookingStatus is the primary success signal to rely on until a genuine CancelAfterHold response example is captured.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-CANCELHOLD-NEG-02 — BLOCKED

- **Test Case:** [CancelAfterHold][Request] Validate CancelAfterHold is rejected when attempted against an already-booked (non-held) PNR.
- **Category:** NEG
- **Endpoint Name:** CANCELHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Expected to be rejected since the PNR is not in a cancellable Held state; exact error shape UNKNOWN, confirm live.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-AUTH-SEC-03 — BLOCKED

- **Test Case:** [Hold]&amp;[Retrieve] [Request] Verify a cross-tenant access attempt -- acting on a pnr/bookingToken using a different supplier/credentialsSelector pair than the one that created it -- is rejected.
- **Category:** SEC
- **Endpoint Name:** AUTH
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN expected behavior -- this is a high-value test since supplier+credentialsSelector is the API's actual body-level (not header-level) authorization mechanism, re-sent and re-checked on every call in a chain per section 1.7.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SUPPLIER-BIZ-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify the generic pre-flow capability-confirmation procedure -- Search's per-offer flags re-confirmed at FareConfirm -- before scheduling any flow against a given supplier.
- **Category:** BIZ
- **Endpoint Name:** SUPPLIER
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Both steps' flags agree with each other; the confirmed result is recorded before any flow from section 5 requiring that capability is scheduled against this supplier.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier. (cross-supplier sweep; the AirIndia part is TC-AIEGY-CAP-01.)
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-AirCairo-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify AirCairo's live Hold capability, given the direct contradiction between the Integration doc (Hold=Yes) and the PRD's canBeHeld=false listing.
- **Category:** BIZ
- **Endpoint Name:** CAPCHECK-AirCairo
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live canBeHeld flag recorded and treated as authoritative over both conflicting static sources; result documented for section 4.4's living-document update.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-EgyptAir-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify EgyptAir's live Hold capability, given the possible contradiction between the Integration doc (Hold=Yes) and the PRD's flag-count pattern suggesting canBeHeld=false.
- **Category:** BIZ
- **Endpoint Name:** CAPCHECK-EgyptAir
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live canBeHeld flag recorded and treated as authoritative; EgyptAir is also NDC-whitelisted per section 4.3, so a capability confirmation here is not blocked by the commercial gate.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-Galileo-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify Galileo's live Hold capability, given the possible contradiction between the Integration doc (Hold=Yes) and the PRD's single-flag pattern suggesting canBeHeld=false.
- **Category:** BIZ
- **Endpoint Name:** CAPCHECK-Galileo
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live canBeHeld flag recorded and treated as authoritative; the PRD narrative specifically calls Galileo out as part of a 5-member canBeHeldFalseSuppliers list that a shared-code change risks silently breaking.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-SpiceJet-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify SpiceJet's live Hold and Bundle capability, given conflicting data across sources on both flags.
- **Category:** BIZ
- **Endpoint Name:** CAPCHECK-SpiceJet
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live flags recorded and treated as authoritative over the Integration doc (Hold=Yes) vs PRD (canBeHeld=false strongly implied) conflict, and over the Bundle conflict likewise flagged Conditional in section 4.6.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-GLC-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify GLC's live Bundle capability, given the direct contradiction between the Integration doc (Bundle=No, explicit dash) and the PRD's Bundle=true listing.
- **Category:** BIZ
- **Endpoint Name:** CAPCHECK-GLC
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live haveBundles flag recorded and treated as authoritative; GLC's Hold=No is agreed by both sources (section 4.6) so only Bundle is genuinely in dispute here.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-Indigo-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify Indigo's true capability set is not silently reported as unsupported due to the suppliers.json name-mismatch bug (registered as 'Indego').
- **Category:** VAL
- **Endpoint Name:** CAPCHECK-Indigo
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live flags recorded as the source of truth; a 'no capability entry found' result must be treated as evidence of the known lookup-mismatch bug, not evidence of 'not supported' -- treat all as UNKNOWN pending this live confirmation.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-ElJazeera-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify ElJazeera's true capability set is not silently reported as unsupported due to the suppliers.json name-mismatch bug (registered as 'ElJazeeraV4').
- **Category:** VAL
- **Endpoint Name:** CAPCHECK-ElJazeera
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live flags recorded as the source of truth; treat 'no capability entry found' as evidence of the lookup-mismatch bug, not of unsupported capability.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-CAPCHECK-OmainAir-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify OmainAir's (Oman Air's) true capability set is not silently reported as unsupported due to the suppliers.json name-mismatch bug (registered as 'OmanAirV17').
- **Category:** VAL
- **Endpoint Name:** CAPCHECK-OmainAir
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Live flags recorded as the source of truth; treat 'no capability entry found' as evidence of the lookup-mismatch bug, not of unsupported capability. Oman Air is NDC-agnostic in section 4.3 (not listed whitelist or blacklist) but is Cancel/Void/Hold=Supported per section 4.6 under its own name.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier.
- **Status:** BLOCKED
- **Evidence:** 

### TC-VERSIONDIFF-BIZ-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Hold]&amp;[Retrieve]&amp;[FareConfirmAfterHold]&amp;[BookAfterHold] [Response] Verify the V1-vs-V2 price-reconciliation script-coverage asymmetry across the shared endpoint set.
- **Category:** BIZ
- **Endpoint Name:** VERSIONDIFF
- **Request:** Not sent
- **Response:** n/a
- **Expected:** V1 enforces the reconciliation formula at Search, FareConfirm, Book, Hold, Retrieve, FareConfirmAfterHold, and BookAfterHold; V2 enforces it only at Hold, FareConfirmAfterHold, and BookAfterHold -- manual testing must independently apply the formula at every V2 endpoint the script skips (Search, FareConfirm, Book, Retrieve).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-VERSIONDIFF-VAL-03 — BLOCKED

- **Test Case:** [Book]&amp;[Void] [Response] Validate voidCapability values are constrained to the currently-known set ('VoidNotAllowed' observed) or flagged if a new value appears.
- **Category:** VAL
- **Endpoint Name:** VERSIONDIFF
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every observed value is either the known 'VoidNotAllowed' or a newly-logged-and-flagged value, never a hard test failure on an unrecognized-but-possibly-valid value.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-VERSIONDIFF-VAL-04 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Validate refundability values are constrained to the currently-known set (the literal 'UnKnown' value observed, unusual capitalization) or flagged if a new value appears.
- **Category:** VAL
- **Endpoint Name:** VERSIONDIFF
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every observed value matches the known literal 'UnKnown' (exact casing) or is logged-and-flagged as a newly-observed value rather than hard-failed.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-VERSIONDIFF-VAL-05 — BLOCKED

- **Test Case:** [Book]&amp;[Hold] [Request] Validate documentType values within passengersList are constrained to the currently-known set ('PASSPORT' observed) or flagged if a new value appears.
- **Category:** VAL
- **Endpoint Name:** VERSIONDIFF
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every observed value matches 'PASSPORT' or is logged-and-flagged as a newly-observed value; likely supplier-dependent (GDS vs LCC document requirements differ) so a new value should not be hard-failed.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-01 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve] [Response] Verify FareConfirm-based Family-A flow #1 (SR-FC-BK-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-01-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #1 (SR-FC-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-02 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based Family-B flow #2 (SR-FC-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-02-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #2 (SR-FC-HD-FCAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-03 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based Family-C flow #3 (SR-FC-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-03-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #3 (SR-FC-BK-RT-VD) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-04 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based Family-D flow #4 (SR-FC-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-04-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #4 (SR-FC-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-05 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based Family-E flow #5 (SR-FC-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-05-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #5 (SR-FC-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-06 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify FareConfirm-based Family-F flow #6 (SR-FC-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-06-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #6 (SR-FC-HD-FCAH-RT-CXL) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow
- **Endpoint Name:** SR-FC-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-07 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve] [Response] Verify Upselling-based Family-A flow #7 (SR-UP-BK-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-07-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #7 (SR-UP-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-08 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based Family-B flow #8 (SR-UP-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-08-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #8 (SR-UP-HD-FCAH-RT) correctly rejects the V1 Upselling requestUrl/baseUrl collection defect not being fixed before execution.
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Because requestUrl is an empty, unset collection variable in the shipped STAG_ENV (SPEC section 1.4/2.3), the request resolves to a malformed URL with an empty host. Expected result is a connection/DNS/malformed-URL-class failure at the HTTP layer, distinct from any API-level 4xx -- confirm the exact client-side error live and record it; this is a real, evidenced collection defect, not a guessed negative path.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-09 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based Family-C flow #9 (SR-UP-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-09-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #9 (SR-UP-BK-RT-VD) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-10 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based Family-D flow #10 (SR-UP-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-10-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #10 (SR-UP-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-11 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based Family-E flow #11 (SR-UP-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-11-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #11 (SR-UP-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-12 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify Upselling-based Family-F flow #12 (SR-UP-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-12-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #12 (SR-UP-HD-FCAH-RT-CXL) correctly rejects the V1 Upselling requestUrl/baseUrl collection defect not being fixed before execution.
- **Category:** Flow
- **Endpoint Name:** SR-UP-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Because requestUrl is an empty, unset collection variable in the shipped STAG_ENV (SPEC section 1.4/2.3), the request resolves to a malformed URL with an empty host. Expected result is a connection/DNS/malformed-URL-class failure at the HTTP layer, distinct from any API-level 4xx -- confirm the exact client-side error live and record it; this is a real, evidenced collection defect, not a guessed negative path.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-13 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Response] Verify FareConfirm-based, Bundle-enriched, Family-A flow #13 (SR-FC-BDL-BK-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-13-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #13 (SR-FC-BDL-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-14 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based, Bundle-enriched, Family-B flow #14 (SR-FC-BDL-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-14-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #14 (SR-FC-BDL-HD-FCAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-15 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based, Bundle-enriched, Family-C flow #15 (SR-FC-BDL-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-15-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #15 (SR-FC-BDL-BK-RT-VD) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-16 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify FareConfirm-based, Bundle-enriched, Family-D flow #16 (SR-FC-BDL-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3). Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-16-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #16 (SR-FC-BDL-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-17 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify FareConfirm-based, Bundle-enriched, Family-E flow #17 (SR-FC-BDL-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-17-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #17 (SR-FC-BDL-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-18 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify FareConfirm-based, Bundle-enriched, Family-F flow #18 (SR-FC-BDL-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-18-NEG — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #18 (SR-FC-BDL-HD-FCAH-RT-CXL) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-19 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Response] Verify Upselling-based, Bundle-enriched, Family-A flow #19 (SR-UP-BDL-BK-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve shows bookingStatus=booked (record exact observed enum value as baseline, section 2.11); selectedOffer.offerId and priceDetails.totalAmount match between Book's response and the follow-up Retrieve; price reconciliation (per-passenger-type tax/base/total formula, section 2.1/6.2) holds at Search, FareConfirm/Upselling, and Book. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-19-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #19 (SR-UP-BDL-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-BK-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-20 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based, Bundle-enriched, Family-B flow #20 (SR-UP-BDL-HD-FCAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Retrieve (after FareConfirmAfterHold) shows bookingStatus=held (record exact observed enum value, section 2.11); holdExpirationDate is present and still in the future at time of Retrieve; price after FareConfirmAfterHold matches Hold's original price (no unexplained drift). This flow deliberately STOPS here per Family B (section 5.2/6.3) -- log the pnr for out-of-band cleanup/expiry tracking, do not proceed to BookAfterHold/Void/CancelHold. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-20-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve] [Request] Validate Family-B flow #20 (SR-UP-BDL-HD-FCAH-RT) correctly rejects the V1 Upselling requestUrl/baseUrl collection defect not being fixed before execution.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Because requestUrl is an empty, unset collection variable in the shipped STAG_ENV (SPEC section 1.4/2.3), the request resolves to a malformed URL with an empty host. Expected result is a connection/DNS/malformed-URL-class failure at the HTTP layer, distinct from any API-level 4xx -- confirm the exact client-side error live and record it; this is a real, evidenced collection defect, not a guessed negative path.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-21 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based, Bundle-enriched, Family-C flow #21 (SR-UP-BDL-BK-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family A's checks hold through the first Retrieve; Void is only expected to succeed if Book's voidCapability is not "VoidNotAllowed" and the (unknown, confirm-live) void window has not elapsed; a follow-up Retrieve after Void shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-21-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #21 (SR-UP-BDL-BK-RT-VD) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-BK-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-22 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify Upselling-based, Bundle-enriched, Family-D flow #22 (SR-UP-BDL-HD-FCAH-RT-BAH-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after BookAfterHold, the second Retrieve shows bookingStatus transitioning held to booked; pnr, bookingToken and gdsPNR returned by BookAfterHold are byte-for-byte unchanged from Hold's values (same-PNR invariant, section 2.13/6.3). Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-22-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve] [Request] Validate Family-D flow #22 (SR-UP-BDL-HD-FCAH-RT-BAH-RT) correctly rejects attempting Hold against FlyNas, a supplier whose canBeHeld capability is confirmed false (SPEC section 4.6, cross-validated in 4.4).
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT-BAH-RT
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to be rejected for FlyNas since canBeHeld=false is cross-validated across both capability-source documents (SPEC section 4.4/4.6, "no conflict -- cross-validated, high confidence"). Exact rejection status/body is UNKNOWN -- confirm live and record as baseline (SPEC section 2.10 Common Errors, 7.7).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-23 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Response] Verify Upselling-based, Bundle-enriched, Family-E flow #23 (SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family D's checks hold (held-to-booked transition, same-PNR invariant through BookAfterHold); Family C's Void checks then apply to the now-finalized ex-Held booking -- Void expected to succeed only if voidCapability allows it, and a follow-up Retrieve shows a voided/cancelled bookingStatus. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-23-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[BookAfterHold]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-E flow #23 (SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD) correctly rejects attempting FareConfirmAfterHold/BookAfterHold after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC section 3.2 ("Hold -&gt; Retrieve -&gt; FareConfirmAfterHold...") and section 6.5 explicitly flag this as an untested gap not covered by any flow.md-listed flow: "No flow in flow.md tests what happens when FareConfirmAfterHold/BookAfterHold is attempted after holdExpirationDate has passed." Likely rejection or a stale-price/re-price error, but do not assert a specific code without live confirmation; record the first observed behavior as the new baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-24 — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify Upselling-based, Bundle-enriched, Family-F flow #24 (SR-UP-BDL-HD-FCAH-RT-CXL) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family B's checks hold through the first Retrieve; after CancelAfterHold, a follow-up Retrieve should show a cancelled/terminated bookingStatus -- SPEC section 2.14 flags CancelAfterHold as having zero script coverage and no genuine example response in either collection, so this is the weakest-validated end-state in the whole flow set; treat the exact response shape as UNKNOWN pending live confirmation and record the first observed value as the new baseline. Bundle state: final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and bundle-included services (baggage/seat/meal) are not separately double-charged (SPEC section 6.4 BDL).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V1-24-NEG — BLOCKED

- **Test Case:** [Search]&amp;[Upselling]&amp;[GetOfferBundles]&amp;[Hold]&amp;[FareConfirmAfterHold]&amp;[Retrieve]&amp;[CancelAfterHold] [Request] Validate Family-F flow #24 (SR-UP-BDL-HD-FCAH-RT-CXL) correctly rejects calling GetOfferBundles when the FareConfirm/Upselling response reports haveBundles=false.
- **Category:** Flow
- **Endpoint Name:** SR-UP-BDL-HD-FCAH-RT-CXL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** GetOfferBundles is expected to be rejected, or return an empty bundleChoices, for an offer whose haveBundles flag is false (SPEC section 2.4 Business Logic, 3.2 "FareConfirm/Upselling -&gt; GetOfferBundles"). Exact behavior (empty bundleChoices vs explicit error) is UNKNOWN per SPEC section 2.4 -- confirm live and record as baseline.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-UPSELL-NEG-01 — BLOCKED

- **Test Case:** [Upselling] [Request] Validate the V1 requestUrl/baseUrl collection defect produces a malformed request URL when left unfixed.
- **Category:** Negative
- **Endpoint Name:** Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** The resolved request URL has an empty host segment (e.g. "api/FlightSearch/UpSelling" with no scheme/host prepended) because requestUrl is an empty, unset collection variable in the shipped STAG_ENV and is never populated by any other request (section 1.4, 2.3). Expect a connection-level or malformed-URL failure, not a normal HTTP 4xx/5xx from the API itself -- confirm and record the exact client error live. This is a confirmed, evidenced collection defect (not inferred) and must be fixed locally (set requestUrl = baseUrl) before any other V1 Upselling test/flow can run.
- **Actual:** Not applicable to this run: the case tests the Postman collection / documentation, not an API behaviour on AirIndia.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BOOK-POS-01 — BLOCKED

- **Test Case:** [Book] [Request] Validate a fully-populated passengersList and contactsList (valid ADT+INF with ParentPaxRefId, resolving contactRefId) is accepted.
- **Category:** Positive
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book succeeds (pnr/bookingToken/gdsPNR returned); Retrieve's passengersList echoes the submitted names/types/document numbers unchanged (section 6.3 Family A Expected passenger state); the INF entry's ParentPaxRefId correctly resolves to the ADT entry in the response; no rejection despite this shape being untested by either collection's own saved examples (every saved V1 Book request in the collection ships passengersList/contactsList empty, section 2.9 -- this test supplies the missing coverage).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-01 — BLOCKED

- **Test Case:** [Book] [Request] Validate an INF passenger with a missing or unresolvable ParentPaxRefId is rejected.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the request (SPEC section 2.5 Request Rules: every INF passenger must carry a valid ParentPaxRefId pointing to an ADT entry present in the same request; section 2.5 Common Errors lists this explicitly). Exact status code is UNKNOWN -- no negative example exists in either collection (section 7.9) -- confirm live and record as baseline rather than assuming a specific 4xx.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-02 — BLOCKED

- **Test Case:** [Book] [Request] Validate a passenger whose contactRefId does not resolve to any entry in contactsList is rejected.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to reject the request (SPEC section 2.5 Request Rules: contactRefId must resolve to a key present in contactsList; section 2.5 Common Errors: contactRefId not found in contactsList). Exact status code/body is UNKNOWN -- no negative example exists in either collection (section 7.9) -- confirm live and record as baseline.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEARCH-BIZ-01 — BLOCKED

- **Test Case:** [Search] [Response] Verify the price-reconciliation formula holds for every offer in the response.
- **Category:** Business Rule
- **Endpoint Name:** Search
- **Request:** Not sent
- **Response:** n/a
- **Expected:** All four reconciliations hold exactly for every offer returned. This is enforced by the V1 Search collection script itself (SPEC section 2.1 Business Logic -- proven, not inferred), so a manual pass should reproduce a pass; any mismatch is a genuine regression, not a coverage gap (contrast with V2 Search, where this same check is a script coverage gap per section 1.10 item 4).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECONFIRM-BIZ-01 — BLOCKED

- **Test Case:** [FareConfirm] [Response] Verify the price-reconciliation formula holds on the confirmed selectedOffer.
- **Category:** Business Rule
- **Endpoint Name:** FareConfirm
- **Request:** Not sent
- **Response:** n/a
- **Expected:** All four reconciliations hold exactly. Enforced by V1's FareConfirm script (SPEC section 2.2 Business Logic -- price-reconciliation test identical to Search's, proven, script-enforced), so this is a regression-class assertion, not exploratory.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-01 — BLOCKED

- **Test Case:** [Book]&amp;[Hold] [Response] Verify the price-reconciliation formula holds on the booked/held offer, matching the pre-booking FareConfirm total.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Both Book and Hold reconcile correctly per the formula (section 2.1), and neither total drifts unexpectedly from FareConfirm's pre-booking price in the standard, non-delayed positive path. This is enforced by V1's Book AND Hold scripts alike (SPEC section 2.9 Business Logic, 2.10 Business Logic -- both present, unlike V2 Book which SPEC flags as a script coverage gap).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-02 — BLOCKED

- **Test Case:** [Book] [Response] Verify Book against a commercially-blacklisted LCC supplier (FlyDubai) is blocked at the business layer.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to be blocked specifically because FlyDubai is commercially blacklisted (SPEC section 4.3 LCC blacklist, section 1.8: a supplier can be technically reachable while being commercially blacklisted for booking), even though Search/FareConfirm succeed. SPEC section 7.10 calls this out explicitly: confirm it is blocked at the business layer, not just left to fail downstream at the supplier. Exact status/error shape is UNKNOWN -- confirm live and record whether the block happens at Book itself or is left to the supplier to reject.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-03 — BLOCKED

- **Test Case:** [Book] [Response] Validate Book against GLC, an NDC supplier conditionally blacklisted (per request, inform us first before issuing any ticket), surfaces the conditional-block policy rather than ticketing silently.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** GLC is not an outright blacklist like FlyDubai -- SPEC section 4.3 marks it conditional-not-outright-blacklisted. Expected result is UNKNOWN pending live confirmation of exactly how this conditional policy is technically enforced (if at all) by the API layer versus being a purely off-system process control (team must inform the airline manually) -- confirm live whether Book technically succeeds (with the process control living outside the API) or is technically blocked, and record the finding back into SPEC section 4.3/7.10.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-25 — BLOCKED

- **Test Case:** [FC-NONE-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-25-NEG — BLOCKED

- **Test Case:** [FC-NONE-A][Request] Validate that FareConfirm rejects an ID/context pair whose supplier or credentialsSelector does not match the one used earlier in the same chain.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 1.7/3.2 treats supplier/credentialsSelector as a stateless per-call re-check, so a chain that switches supplier/credentialsSelector mid-flow while reusing IDs from the original supplier is expected to be rejected, not silently honored.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-26 — BLOCKED

- **Test Case:** [FC-NONE-B][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-26-NEG — BLOCKED

- **Test Case:** [FC-NONE-B][Request] Validate that Hold rejects a stale/mismatched getAddPaxOfferId/getAddPaxResponceID pair.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** The request is rejected since the ID pair does not derive from this flow's own AddPassenger response. Exact rejection status is UNKNOWN -- confirm live per SPEC.md 2.5/3.2/3.3.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-27 — BLOCKED

- **Test Case:** [FC-NONE-C][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-27-NEG — BLOCKED

- **Test Case:** [FC-NONE-C][Response] Verify that Void fails when the preceding Book/BookAfterHold response reported voidCapability=VoidNotAllowed.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Void is expected to fail/be rejected. voidCapability is a live, per-booking flag (SPEC.md 2.9) that should be checked before attempting Void; exact rejection shape is UNKNOWN -- confirm live.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-28 — BLOCKED

- **Test Case:** [FC-NONE-D][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-28-NEG — BLOCKED

- **Test Case:** [FC-NONE-D][Response] Verify the behavior of BookAfterHold when attempted after holdExpirationDate has already passed.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 3.2/6.5 explicitly flags that no flow in flow.md exercises behavior past hold expiration; this is a high-value exploratory gap, not a documented failure mode. Do not assume a specific HTTP status without live confirmation.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-29 — BLOCKED

- **Test Case:** [FC-NONE-E][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-29-NEG — BLOCKED

- **Test Case:** [FC-NONE-E][Response] Verify that Void fails when the preceding Book/BookAfterHold response reported voidCapability=VoidNotAllowed.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Void is expected to fail/be rejected. voidCapability is a live, per-booking flag (SPEC.md 2.9) that should be checked before attempting Void; exact rejection shape is UNKNOWN -- confirm live.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-30 — BLOCKED

- **Test Case:** [FC-NONE-F][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-30-NEG — BLOCKED

- **Test Case:** [FC-NONE-F][Response] Verify the behavior of CancelAfterHold when attempted after holdExpirationDate has already passed.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 3.2/6.5 explicitly flags that no flow in flow.md exercises behavior past hold expiration; this is a high-value exploratory gap, not a documented failure mode. Do not assume a specific HTTP status without live confirmation.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-31 — BLOCKED

- **Test Case:** [FC-BDL-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price; and bundle pricing correctly reflected without double-charging included services.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-31-NEG — BLOCKED

- **Test Case:** [FC-BDL-A][Request] Validate that GetOfferBundles is rejected (or otherwise correctly refused) when called against an offer whose FareConfirm response reported haveBundles=false.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected or returns an empty/error bundleChoices; exact rejection shape is UNKNOWN per SPEC.md 2.4/3.2 -- confirm live. Calling a capability-gated step when the live gating flag is false must not silently succeed as if the offer were bundle-capable.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-32 — BLOCKED

- **Test Case:** [FC-BDL-B][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking); and bundle pricing correctly reflected without double-charging included services.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-32-NEG — BLOCKED

- **Test Case:** [FC-BDL-B][Response] Verify that Hold fails for a canBeHeld=false / confirmed-not-holdable supplier.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to fail (e.g. FlyNas is cross-validated Hold=Not Supported per SPEC.md 4.6; GLC is Not Supported by both sources). Exact rejection shape is UNKNOWN -- confirm live. The live canBeHeld flag (2.1/2.2) takes precedence over the static matrix when they disagree.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-33 — BLOCKED

- **Test Case:** [FC-BDL-C][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability); and bundle pricing correctly reflected without double-charging included services.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-33-NEG — BLOCKED

- **Test Case:** [FC-BDL-C][Response] Verify the result of calling Book twice in succession on the same offer/booking (Book called twice with the same offer/ID pair).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN whether the second call is idempotently rejected, silently no-ops, or produces a duplicate/erroneous state -- confirm live. SPEC.md flags double-booking/double-action as an explicit negative case with unresolved behavior (2.9/2.13/2.14).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-34 — BLOCKED

- **Test Case:** [FC-BDL-D][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold; and bundle pricing correctly reflected without double-charging included services.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-34-NEG — BLOCKED

- **Test Case:** [FC-BDL-D][Request] Validate that BookAfterHold rejects a pnr/bookingToken/gdsPNR triplet where one field does not match the other two (sourced from a different booking) (bookingToken sourced from a different Hold session than the supplied pnr/gdsPNR).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. The pnr/bookingToken/gdsPNR trio should be internally consistent for a single booking throughout Retrieve/BookAfterHold/Void (SPEC.md 2.11/2.13); a deliberately broken triplet is expected to be rejected, not partially honored.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-35 — BLOCKED

- **Test Case:** [FC-BDL-E][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void; and bundle pricing correctly reflected without double-charging included services.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-35-NEG — BLOCKED

- **Test Case:** [FC-BDL-E][Response] Verify the result of calling Void twice in succession on the same offer/booking (Void called twice on the finalized ex-Held booking).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN whether the second call is idempotently rejected, silently no-ops, or produces a duplicate/erroneous state -- confirm live. SPEC.md flags double-booking/double-action as an explicit negative case with unresolved behavior (2.9/2.13/2.14).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-36 — BLOCKED

- **Test Case:** [FC-BDL-F][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold; and bundle pricing correctly reflected without double-charging included services.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line. Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-36-NEG — BLOCKED

- **Test Case:** [FC-BDL-F][Request] Validate the documented V2 CancelAfterHold unquoted {{Credentials_Selector}} request-body defect.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Once the placeholder is substituted, the raw body becomes invalid JSON (e.g. "credentialsSelector" : UAE, with no quotes). Confirm live whether this produces a 400/parse error or is somehow tolerated. This is a literal, evidenced syntax bug in the saved request body (SPEC.md 2.14), not a hypothesis.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-37 — BLOCKED

- **Test Case:** [FC-ANC-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-37-NEG — BLOCKED

- **Test Case:** [FC-ANC-A][Request] Validate that FareCheck rejects a hand-constructed AncillaryCode instead of one copied verbatim from GetAncillary's segmentsAncillariesDetails[].code.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects the fabricated code; valid AncillaryCode values are opaque gzip+base64 tokens that must originate from GetAncillary and must never be hand-built. Exact rejection shape is UNKNOWN -- confirm live per SPEC.md 2.8.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-38 — BLOCKED

- **Test Case:** [FC-ANC-B][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking); and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-38-NEG — BLOCKED

- **Test Case:** [FC-ANC-B][Request] Validate the documented V2 Hold {{credentialsSelector}} (lowercase-first placeholder) vs. environment's actual {{Credentials_Selector}} casing-mismatch defect.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Confirm live whether this collection defect causes Hold to silently send an empty credentialsSelector, or whether the request is rejected outright for a missing/empty field. This is a documented, not merely hypothesized, collection bug (SPEC.md 2.10).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-39 — BLOCKED

- **Test Case:** [FC-ANC-C][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability); and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-39-NEG — BLOCKED

- **Test Case:** [FC-ANC-C][Request] Validate that FareCheck rejects a PassengersSelectedAncillaries Quantity greater than GetAncillary's reported availableCount for that code (carried through to Book, Void still attempted).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects (or otherwise flags) the over-quantity selection. Exact rejection shape is UNKNOWN -- confirm live per SPEC.md 2.8.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-40 — BLOCKED

- **Test Case:** [FC-ANC-D][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-40-NEG — BLOCKED

- **Test Case:** [FC-ANC-D][Response] Verify the result of calling BookAfterHold twice in succession on the same offer/booking (BookAfterHold called twice on the same Held pnr).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN whether the second call is idempotently rejected, silently no-ops, or produces a duplicate/erroneous state -- confirm live. SPEC.md flags double-booking/double-action as an explicit negative case with unresolved behavior (2.9/2.13/2.14).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-41 — BLOCKED

- **Test Case:** [FC-ANC-E][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-41-NEG — BLOCKED

- **Test Case:** [FC-ANC-E][Request] Validate that Void rejects a pnr/bookingToken/gdsPNR triplet where one field does not match the other two (sourced from a different booking).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. The pnr/bookingToken/gdsPNR trio should be internally consistent for a single booking throughout Retrieve/BookAfterHold/Void (SPEC.md 2.11/2.13); a deliberately broken triplet is expected to be rejected, not partially honored.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-42 — BLOCKED

- **Test Case:** [FC-ANC-F][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-42-NEG — BLOCKED

- **Test Case:** [FC-ANC-F][Response] Verify the result of calling CancelAfterHold twice in succession on the same offer/booking (CancelAfterHold called twice on the same Held pnr).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN whether the second call is idempotently rejected, silently no-ops, or produces a duplicate/erroneous state -- confirm live. SPEC.md flags double-booking/double-action as an explicit negative case with unresolved behavior (2.9/2.13/2.14).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-43 — BLOCKED

- **Test Case:** [FC-BDL+ANC-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-43-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC-A][Request] Validate that GetAncillary is rejected (or otherwise correctly refused) when called against an offer whose FareConfirm response reported offerHasAncillary=false / isAncillaryRequired=false.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected or returns an empty ancillary catalog; exact rejection shape is UNKNOWN per SPEC.md 2.6/3.2 -- confirm live.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-44 — BLOCKED

- **Test Case:** [FC-BDL+ANC-B][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking); and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-44-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC-B][Request] Validate that Hold rejects a stale/mismatched getAddPaxOfferId/getAddPaxResponceID pair (partial (only responseId stale, offerId correct)).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** The request is rejected since the ID pair does not derive from this flow's own AddPassenger response. Exact rejection status is UNKNOWN -- confirm live per SPEC.md 2.5/3.2/3.3.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-45 — BLOCKED

- **Test Case:** [FC-BDL+ANC-C][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability); and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-45-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC-C][Response] Verify whether Void requires gdsPNR for a GDS-routed supplier, given the V2 collection's one saved Void example hardcodes gdsPNR as a literal empty string.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- confirm live whether a GDS-routed supplier (Amadeus/Sabre/Galileo/TravelportNDC) rejects Void with an empty gdsPNR even though the LCC example (AirArabia) apparently did not need it (SPEC.md 2.15).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-46 — BLOCKED

- **Test Case:** [FC-BDL+ANC-D][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-46-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC-D][Response] Verify the behavior of FareConfirmAfterHold when attempted after holdExpirationDate has already passed.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 3.2/6.5 explicitly flags that no flow in flow.md exercises behavior past hold expiration; this is a high-value exploratory gap, not a documented failure mode. Do not assume a specific HTTP status without live confirmation.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-47 — BLOCKED

- **Test Case:** [FC-BDL+ANC-E][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-47-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC-E][Response] Verify that Void fails when the preceding Book/BookAfterHold response reported voidCapability=VoidNotAllowed (surName mismatch).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Void is expected to fail/be rejected. voidCapability is a live, per-booking flag (SPEC.md 2.9) that should be checked before attempting Void; exact rejection shape is UNKNOWN -- confirm live.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-48 — BLOCKED

- **Test Case:** [FC-BDL+ANC-F][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-48-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC-F][Response] Verify the behavior of CancelAfterHold when attempted after holdExpirationDate has already passed (attempted just after holdExpirationDate with Bundle+Ancillary in scope).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 3.2/6.5 explicitly flags that no flow in flow.md exercises behavior past hold expiration; this is a high-value exploratory gap, not a documented failure mode. Do not assume a specific HTTP status without live confirmation.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-49 — BLOCKED

- **Test Case:** [FC-SM-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price; and the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Per-enrichment state check(s) (SPEC.md 6.4): the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-49-NEG — BLOCKED

- **Test Case:** [FC-SM-A][Request] Validate that GetSeatMap is rejected (or otherwise correctly refused) when called against an offer whose FareConfirm response reported isSeatMapRequired=false.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected or returns an empty seatMapDetails; exact rejection shape is UNKNOWN per SPEC.md 2.7/3.2 -- confirm live.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-50 — BLOCKED

- **Test Case:** [FC-SM-B][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking); and the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Per-enrichment state check(s) (SPEC.md 6.4): the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-50-NEG — BLOCKED

- **Test Case:** [FC-SM-B][Response] Verify that Hold fails for a canBeHeld=false / confirmed-not-holdable supplier (live canBeHeld=false flag overriding an optimistic static-matrix read).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold is expected to fail (e.g. FlyNas is cross-validated Hold=Not Supported per SPEC.md 4.6; GLC is Not Supported by both sources). Exact rejection shape is UNKNOWN -- confirm live. The live canBeHeld flag (2.1/2.2) takes precedence over the static matrix when they disagree.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-51 — BLOCKED

- **Test Case:** [FC-SM-C][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability); and the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Per-enrichment state check(s) (SPEC.md 6.4): the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-51-NEG — BLOCKED

- **Test Case:** [FC-SM-C][Response] Verify the result of calling Void twice in succession on the same offer/booking (Void called twice on the same ticket).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN whether the second call is idempotently rejected, silently no-ops, or produces a duplicate/erroneous state -- confirm live. SPEC.md flags double-booking/double-action as an explicit negative case with unresolved behavior (2.9/2.13/2.14).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-52 — BLOCKED

- **Test Case:** [FC-SM-D][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold; and the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Per-enrichment state check(s) (SPEC.md 6.4): the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-52-NEG — BLOCKED

- **Test Case:** [FC-SM-D][Request] Validate that BookAfterHold rejects a pnr/bookingToken/gdsPNR triplet where one field does not match the other two (sourced from a different booking) (gdsPNR mismatched against pnr/bookingToken).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. The pnr/bookingToken/gdsPNR trio should be internally consistent for a single booking throughout Retrieve/BookAfterHold/Void (SPEC.md 2.11/2.13); a deliberately broken triplet is expected to be rejected, not partially honored.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-53 — BLOCKED

- **Test Case:** [FC-SM-E][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void; and the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Per-enrichment state check(s) (SPEC.md 6.4): the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-53-NEG — BLOCKED

- **Test Case:** [FC-SM-E][Response] Verify the result of attempting Void outside the (undocumented) void window, after a deliberate delay past Book/BookAfterHold.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact window and exact rejection shape -- confirm live per SPEC.md 3.2/6.5; the void window is presumed same-day/24-hour by real-world airline convention but is not evidenced in either collection.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-54 — BLOCKED

- **Test Case:** [FC-SM-F][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold; and the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Per-enrichment state check(s) (SPEC.md 6.4): the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-54-NEG — BLOCKED

- **Test Case:** [FC-SM-F][Request] Validate the documented V2 CancelAfterHold unquoted {{Credentials_Selector}} request-body defect (reproduced against a SeatMap-enriched Held booking).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Once the placeholder is substituted, the raw body becomes invalid JSON (e.g. "credentialsSelector" : UAE, with no quotes). Confirm live whether this produces a 400/parse error or is somehow tolerated. This is a literal, evidenced syntax bug in the saved request body (SPEC.md 2.14), not a hypothesis.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-55 — BLOCKED

- **Test Case:** [FC-BDL+SM-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price; and bundle pricing correctly reflected without double-charging included services; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-55-NEG — BLOCKED

- **Test Case:** [FC-BDL+SM-A][Request] Validate that AddPassenger rejects an INF passenger whose ParentPaxRefId does not resolve to any ADT passenger in the same passengersList.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger rejects the request; every INF passenger must carry a ParentPaxRefId resolving to an ADT entry present in the same request (SPEC.md 2.5). Exact rejection shape is UNKNOWN -- confirm live.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-56 — BLOCKED

- **Test Case:** [FC-BDL+SM-B][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking); and bundle pricing correctly reflected without double-charging included services; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-56-NEG — BLOCKED

- **Test Case:** [FC-BDL+SM-B][Request] Validate that a passengersList submitted at AddPassenger whose count/type mix does not match what was declared at Search time is rejected or flagged (mismatch established at AddPassenger, undetected until Hold).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact behavior -- not verified by any script per SPEC.md 2.5; confirm live whether the supplier/adapter rejects the mismatch or silently accepts it.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-57 — BLOCKED

- **Test Case:** [FC-BDL+SM-C][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability); and bundle pricing correctly reflected without double-charging included services; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-57-NEG — BLOCKED

- **Test Case:** [FC-BDL+SM-C][Response] Verify that Void fails when the preceding Book/BookAfterHold response reported voidCapability=VoidNotAllowed (incorrect surName supplied).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Void is expected to fail/be rejected. voidCapability is a live, per-booking flag (SPEC.md 2.9) that should be checked before attempting Void; exact rejection shape is UNKNOWN -- confirm live.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-58 — BLOCKED

- **Test Case:** [FC-BDL+SM-D][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold; and bundle pricing correctly reflected without double-charging included services; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-58-NEG — BLOCKED

- **Test Case:** [FC-BDL+SM-D][Request] Validate that AddPassenger rejects an INF passenger whose ParentPaxRefId does not resolve to any ADT passenger in the same passengersList (undetected until carried through Hold-&gt;BookAfterHold).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger rejects the request; every INF passenger must carry a ParentPaxRefId resolving to an ADT entry present in the same request (SPEC.md 2.5). Exact rejection shape is UNKNOWN -- confirm live.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-59 — BLOCKED

- **Test Case:** [FC-BDL+SM-E][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void; and bundle pricing correctly reflected without double-charging included services; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-59-NEG — BLOCKED

- **Test Case:** [FC-BDL+SM-E][Request] Validate that Void rejects a stale/mismatched getAddPaxOfferId/getAddPaxResponceID pair (bookingToken carried from the original Hold rather than BookAfterHold's re-confirmed value).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** The request is rejected since the ID pair does not derive from this flow's own AddPassenger response. Exact rejection status is UNKNOWN -- confirm live per SPEC.md 2.5/3.2/3.3.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-60 — BLOCKED

- **Test Case:** [FC-BDL+SM-F][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold; and bundle pricing correctly reflected without double-charging included services; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-60-NEG — BLOCKED

- **Test Case:** [FC-BDL+SM-F][Response] Verify the result of calling CancelAfterHold twice in succession on the same offer/booking (second call issued immediately after the first succeeds).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN whether the second call is idempotently rejected, silently no-ops, or produces a duplicate/erroneous state -- confirm live. SPEC.md flags double-booking/double-action as an explicit negative case with unresolved behavior (2.9/2.13/2.14).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-61 — BLOCKED

- **Test Case:** [FC-ANC+SM-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-61-NEG — BLOCKED

- **Test Case:** [FC-ANC+SM-A][Request] Validate that FareCheck rejects a PassengersSelectedAncillaries Quantity greater than GetAncillary's reported availableCount for that code.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects (or otherwise flags) the over-quantity selection. Exact rejection shape is UNKNOWN -- confirm live per SPEC.md 2.8.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-62 — BLOCKED

- **Test Case:** [FC-ANC+SM-B][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking); and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-62-NEG — BLOCKED

- **Test Case:** [FC-ANC+SM-B][Request] Validate that Hold rejects an ID/context pair whose supplier or credentialsSelector does not match the one used earlier in the same chain (supplier/credentialsSelector switched mid-flow before Hold).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 1.7/3.2 treats supplier/credentialsSelector as a stateless per-call re-check, so a chain that switches supplier/credentialsSelector mid-flow while reusing IDs from the original supplier is expected to be rejected, not silently honored.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-63 — BLOCKED

- **Test Case:** [FC-ANC+SM-C][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability); and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-63-NEG — BLOCKED

- **Test Case:** [FC-ANC+SM-C][Request] Validate that Retrieve rejects a pnr/bookingToken/gdsPNR triplet where one field does not match the other two (sourced from a different booking).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. The pnr/bookingToken/gdsPNR trio should be internally consistent for a single booking throughout Retrieve/BookAfterHold/Void (SPEC.md 2.11/2.13); a deliberately broken triplet is expected to be rejected, not partially honored.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-64 — BLOCKED

- **Test Case:** [FC-ANC+SM-D][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-64-NEG — BLOCKED

- **Test Case:** [FC-ANC+SM-D][Request] Validate that BookAfterHold rejects a stale/mismatched getAddPaxOfferId/getAddPaxResponceID pair (stale getAddPaxResponceID reused from a previous flow run).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** The request is rejected since the ID pair does not derive from this flow's own AddPassenger response. Exact rejection status is UNKNOWN -- confirm live per SPEC.md 2.5/3.2/3.3.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-65 — BLOCKED

- **Test Case:** [FC-ANC+SM-E][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-65-NEG — BLOCKED

- **Test Case:** [FC-ANC+SM-E][Request] Validate that FareCheck rejects a PassengersSelectedAncillaries Quantity greater than GetAncillary's reported availableCount for that code (carried all the way through to the final Void-eligible booking).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects (or otherwise flags) the over-quantity selection. Exact rejection shape is UNKNOWN -- confirm live per SPEC.md 2.8.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-66 — BLOCKED

- **Test Case:** [FC-ANC+SM-F][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold; and selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Per-enrichment state check(s) (SPEC.md 6.4): passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-66-NEG — BLOCKED

- **Test Case:** [FC-ANC+SM-F][Response] Verify the behavior of CancelAfterHold when attempted after holdExpirationDate has already passed (attempted against an Ancillary+SeatMap-enriched Held booking).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 3.2/6.5 explicitly flags that no flow in flow.md exercises behavior past hold expiration; this is a high-value exploratory gap, not a documented failure mode. Do not assume a specific HTTP status without live confirmation.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-67 — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family A): bookingStatus reads a booked/confirmed state at the final Retrieve, with selectedOffer.offerId/priceDetails.totalAmount matching between Book and Retrieve. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-67-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-A][Request] Validate that a passengersList submitted at AddPassenger whose count/type mix does not match what was declared at Search time is rejected or flagged.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact behavior -- not verified by any script per SPEC.md 2.5; confirm live whether the supplier/adapter rejects the mismatch or silently accepts it.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-68 — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-B][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve completes with a held bookingStatus and a future holdExpirationDate at the final Retrieve (flow intentionally stops here -- dangling Held booking); and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family B): bookingStatus reads a held (not yet ticketed) state with holdExpirationDate present and in the future at the final Retrieve -- the flow deliberately STOPS here (Family B, no BookAfterHold/CancelAfterHold), leaving a dangling Held booking; log the pnr for out-of-band cleanup/expiry tracking per SPEC.md Section 6.3. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-68-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-B][Response] Verify the behavior of FareConfirmAfterHold when attempted after holdExpirationDate has already passed.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 3.2/6.5 explicitly flags that no flow in flow.md exercises behavior past hold expiration; this is a high-value exploratory gap, not a documented failure mode. Do not assume a specific HTTP status without live confirmation.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-69 — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-C][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Book -&gt; Retrieve -&gt; Void completes with a booked bookingStatus at Retrieve followed by a successful Void (gated by voidCapability); and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family C): bookingStatus reads booked at Retrieve, then Void succeeds (gated by voidCapability != VoidNotAllowed), and a follow-up manual Retrieve should show a voided/cancelled bookingStatus. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-69-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-C][Response] Verify that the commercial whitelist/blacklist business gate blocks Void for a commercially blacklisted supplier/airline even when the technical voidCapability would otherwise allow it.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact rejection point -- confirm live whether this is blocked at the business layer before reaching the supplier, or left to fail downstream. SPEC.md 1.8/4.3 treats commercial blacklisting as independent from technical capability.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-70 — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-D][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve completes with bookingStatus transitioning held -&gt; booked via BookAfterHold, with pnr/bookingToken/gdsPNR unchanged from Hold; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family D): bookingStatus transitions from held (after Hold/FareConfirmAfterHold) to booked/confirmed (after BookAfterHold), with pnr/bookingToken/gdsPNR identical to the values Hold produced (same-PNR invariant, SPEC.md Section 2.13). Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-70-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-D][Response] Verify the behavior of BookAfterHold when attempted after holdExpirationDate has already passed (attempted just after holdExpirationDate on the richest enrichment combination).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 3.2/6.5 explicitly flags that no flow in flow.md exercises behavior past hold expiration; this is a high-value exploratory gap, not a documented failure mode. Do not assume a specific HTTP status without live confirmation.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-71 — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-E][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void completes with bookingStatus transitioning held -&gt; booked via BookAfterHold and then a successful Void; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family E): bookingStatus transitions held -&gt; booked via BookAfterHold (same-PNR invariant holds) and then Void succeeds (gated by voidCapability), with a follow-up manual Retrieve expected to show voided/cancelled. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-71-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-E][Response] Verify that the commercial whitelist/blacklist business gate blocks Void for a commercially blacklisted supplier/airline even when the technical voidCapability would otherwise allow it (commercially blacklisted supplier/airline despite technical voidCapability allowing it).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact rejection point -- confirm live whether this is blocked at the business layer before reaching the supplier, or left to fail downstream. SPEC.md 1.8/4.3 treats commercial blacklisting as independent from technical capability.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-72 — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-F][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; FareCheck* -&gt; Hold -&gt; FareConfirmAfterHold -&gt; Retrieve -&gt; CancelAfterHold completes with bookingStatus transitioning held -&gt; cancelled/terminated via CancelAfterHold; and bundle pricing correctly reflected without double-charging included services; selected ancillaries correctly reflected in passengersSelectedAncillaries/paxTotalAncillaryAmount; the chosen seat cellCode correctly reflected as a priced Seat-category line.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (SPEC.md 6.3, Family F): bookingStatus transitions from held to a cancelled/terminated state after CancelAfterHold -- CancelAfterHold has zero script coverage and no genuine saved response example anywhere in the collections, so this is the weakest-validated end-state in the whole API; treat the post-CancelAfterHold Retrieve bookingStatus as the primary, entirely-manual success signal. Per-enrichment state check(s) (SPEC.md 6.4): the booking's final priceDetails.totalAmount reflects the selected bundle's feePrice added to the base offer price, and any bundle-included service (baggage/seat/meal per includedServices tags) does NOT also appear as a separately-priced ancillary line; passengersSelectedAncillaries on Book/Hold/Retrieve lists exactly the ancillary codes selected at GetAncillary/FareCheck time with matching AdditionalServiceCategory/quantity, and paxTotalAncillaryAmount equals the sum of the selected ancillaries' prices; the chosen GetSeatMap cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per what GetSeatMap/FareCheck reported for that cell; the final booking price equals FareCheck's re-priced total (not the pre-ancillary FareConfirm/AddPassenger-era total) -- the highest-value price-integrity assertion for this enrichment. FareCheck conditionality: FareCheck must actually run only if the immediately-preceding GetAncillary/GetSeatMap response reported isFareCheckRequired=true; do not treat FareCheck as unconditionally present, and if it is required, the price delta between the pre-FareCheck and post-FareCheck totals should equal the sum of the selected ancillary/seat prices (2.8). Manual price-reconciliation requirement (V2 script coverage gap, SPEC.md 1.4/2.1/6.2/7.10): per passenger type, sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount, and totals reconcile per the Section 2.1 formula; this is enforced by script at Hold/FareConfirmAfterHold/BookAfterHold in V2, but NOT at Search/FareConfirm/Book/Retrieve -- the tester must supply this check manually at every Book/Retrieve step in this flow. Assert passengersAncillariesAvailabilty (GetAncillary response) is spelled exactly as the live API returns it -- missing the second "i" -- since this is a genuine API field-name defect, not a documentation typo. Assert the GetSeatMap-selected cellCode was correctly hand-carried into Book/Hold's PassengersSelectedAncillaries; a mismatched or omitted cellCode is the single most likely manual-execution error in flows 49-72.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-72-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC+SM-F][Request] Validate the documented V2 CancelAfterHold unquoted {{Credentials_Selector}} request-body defect (reproduced against the richest (Bundle+Ancillary+SeatMap) enrichment combination -- CancelAfterHold remains the least-validated endpoint in the API regardless of enrichment).
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Once the placeholder is substituted, the raw body becomes invalid JSON (e.g. "credentialsSelector" : UAE, with no quotes). Confirm live whether this produces a 400/parse error or is somehow tolerated. This is a literal, evidenced syntax bug in the saved request body (SPEC.md 2.14), not a hypothesis.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-73 — BLOCKED

- **Test Case:** [Upselling-Base][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-73-NEG — BLOCKED

- **Test Case:** [Upselling][Request] Validate Upselling is rejected for FlyCham (Upsell capability not supported).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Upselling against FlyCham is rejected/fails, since FlyCham has no confirmed Upsell support (§4.2 explicit NO, §4.6) - expect a 4xx or a supplier-level "not supported" error, not a silent empty upsellOffers[] pass-through that lets the flow continue.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-74 — BLOCKED

- **Test Case:** [Upselling-Base][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-74-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-75 — BLOCKED

- **Test Case:** [Upselling-Base][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-75-NEG — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects un-substituted upSellingResponseId/upSellingSelectedOfferId.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger called with the un-substituted (stale) ID pair is expected to be rejected as a mismatched/expired offer reference rather than silently succeed - exact rejection shape UNKNOWN, confirm live; this exercises the manual-substitution-omission error that is unique to the Upselling path (§2.3, §3.2 ID-substitution note).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-76 — BLOCKED

- **Test Case:** [Upselling-Base][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-76-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-77 — BLOCKED

- **Test Case:** [Upselling-Base][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-77-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-78 — BLOCKED

- **Test Case:** [Upselling-Base][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-78-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-79 — BLOCKED

- **Test Case:** [Upselling-Bundle][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-79-NEG — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects un-substituted upSellingResponseId/upSellingSelectedOfferId.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger called with the un-substituted (stale) ID pair is expected to be rejected as a mismatched/expired offer reference rather than silently succeed - exact rejection shape UNKNOWN, confirm live; this exercises the manual-substitution-omission error that is unique to the Upselling path (§2.3, §3.2 ID-substitution note).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-80 — BLOCKED

- **Test Case:** [Upselling-Bundle][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-80-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-81 — BLOCKED

- **Test Case:** [Upselling-Bundle][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-81-NEG — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects un-substituted upSellingResponseId/upSellingSelectedOfferId.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger called with the un-substituted (stale) ID pair is expected to be rejected as a mismatched/expired offer reference rather than silently succeed - exact rejection shape UNKNOWN, confirm live; this exercises the manual-substitution-omission error that is unique to the Upselling path (§2.3, §3.2 ID-substitution note).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-82 — BLOCKED

- **Test Case:** [Upselling-Bundle][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-82-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-83 — BLOCKED

- **Test Case:** [Upselling-Bundle][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-83-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-84 — BLOCKED

- **Test Case:** [Upselling-Bundle][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-84-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-85 — BLOCKED

- **Test Case:** [Upselling-Ancillary][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-85-NEG — BLOCKED

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a hand-constructed AncillaryCode not sourced from GetAncillary.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects the hand-constructed AncillaryCode - expect a 4xx/validation error, not a silently-accepted re-price; confirms AncillaryCode must be the opaque gzip+base64 token copied verbatim from GetAncillary, never hand-built (§2.8).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-86 — BLOCKED

- **Test Case:** [Upselling-Ancillary][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-86-NEG — BLOCKED

- **Test Case:** [FareConfirmAfterHold][Response] Verify behavior of FareConfirmAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-87 — BLOCKED

- **Test Case:** [Upselling-Ancillary][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-87-NEG — BLOCKED

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a hand-constructed AncillaryCode not sourced from GetAncillary.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects the hand-constructed AncillaryCode - expect a 4xx/validation error, not a silently-accepted re-price; confirms AncillaryCode must be the opaque gzip+base64 token copied verbatim from GetAncillary, never hand-built (§2.8).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-88 — BLOCKED

- **Test Case:** [Upselling-Ancillary][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-88-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-89 — BLOCKED

- **Test Case:** [Upselling-Ancillary][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-89-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-90 — BLOCKED

- **Test Case:** [Upselling-Ancillary][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-90-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-91 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-91-NEG — BLOCKED

- **Test Case:** [Upselling][Request] Validate Upselling is rejected for FlyCham (Upsell capability not supported).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Upselling against FlyCham is rejected/fails, since FlyCham has no confirmed Upsell support (§4.2 explicit NO, §4.6) - expect a 4xx or a supplier-level "not supported" error, not a silent empty upsellOffers[] pass-through that lets the flow continue.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-92 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-92-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-93 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-93-NEG — BLOCKED

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a hand-constructed AncillaryCode not sourced from GetAncillary.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects the hand-constructed AncillaryCode - expect a 4xx/validation error, not a silently-accepted re-price; confirms AncillaryCode must be the opaque gzip+base64 token copied verbatim from GetAncillary, never hand-built (§2.8).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-94 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-94-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-95 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-95-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-96 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-96-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-97 — BLOCKED

- **Test Case:** [Upselling-SeatMap][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-97-NEG — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects un-substituted upSellingResponseId/upSellingSelectedOfferId.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger called with the un-substituted (stale) ID pair is expected to be rejected as a mismatched/expired offer reference rather than silently succeed - exact rejection shape UNKNOWN, confirm live; this exercises the manual-substitution-omission error that is unique to the Upselling path (§2.3, §3.2 ID-substitution note).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-98 — BLOCKED

- **Test Case:** [Upselling-SeatMap][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-98-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-99 — BLOCKED

- **Test Case:** [Upselling-SeatMap][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-99-NEG — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects un-substituted upSellingResponseId/upSellingSelectedOfferId.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger called with the un-substituted (stale) ID pair is expected to be rejected as a mismatched/expired offer reference rather than silently succeed - exact rejection shape UNKNOWN, confirm live; this exercises the manual-substitution-omission error that is unique to the Upselling path (§2.3, §3.2 ID-substitution note).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-100 — BLOCKED

- **Test Case:** [Upselling-SeatMap][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-100-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-101 — BLOCKED

- **Test Case:** [Upselling-SeatMap][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-101-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-102 — BLOCKED

- **Test Case:** [Upselling-SeatMap][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-102-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-103 — BLOCKED

- **Test Case:** [Upselling-Bundle+SeatMap][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-103-NEG — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects un-substituted upSellingResponseId/upSellingSelectedOfferId.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** AddPassenger called with the un-substituted (stale) ID pair is expected to be rejected as a mismatched/expired offer reference rather than silently succeed - exact rejection shape UNKNOWN, confirm live; this exercises the manual-substitution-omission error that is unique to the Upselling path (§2.3, §3.2 ID-substitution note).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-104 — BLOCKED

- **Test Case:** [Upselling-Bundle+SeatMap][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-104-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-105 — BLOCKED

- **Test Case:** [Upselling-Bundle+SeatMap][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-105-NEG — BLOCKED

- **Test Case:** [Upselling][Request] Validate Upselling is rejected for FlyCham (Upsell capability not supported).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Upselling against FlyCham is rejected/fails, since FlyCham has no confirmed Upsell support (§4.2 explicit NO, §4.6) - expect a 4xx or a supplier-level "not supported" error, not a silent empty upsellOffers[] pass-through that lets the flow continue.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-106 — BLOCKED

- **Test Case:** [Upselling-Bundle+SeatMap][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-106-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-107 — BLOCKED

- **Test Case:** [Upselling-Bundle+SeatMap][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-107-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-108 — BLOCKED

- **Test Case:** [Upselling-Bundle+SeatMap][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-108-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-109 — BLOCKED

- **Test Case:** [Upselling-Ancillary+SeatMap][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-109-NEG — BLOCKED

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a hand-constructed AncillaryCode not sourced from GetAncillary.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects the hand-constructed AncillaryCode - expect a 4xx/validation error, not a silently-accepted re-price; confirms AncillaryCode must be the opaque gzip+base64 token copied verbatim from GetAncillary, never hand-built (§2.8).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-110 — BLOCKED

- **Test Case:** [Upselling-Ancillary+SeatMap][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-110-NEG — BLOCKED

- **Test Case:** [FareConfirmAfterHold][Response] Verify behavior of FareConfirmAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-111 — BLOCKED

- **Test Case:** [Upselling-Ancillary+SeatMap][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-111-NEG — BLOCKED

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a hand-constructed AncillaryCode not sourced from GetAncillary.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects the hand-constructed AncillaryCode - expect a 4xx/validation error, not a silently-accepted re-price; confirms AncillaryCode must be the opaque gzip+base64 token copied verbatim from GetAncillary, never hand-built (§2.8).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-112 — BLOCKED

- **Test Case:** [Upselling-Ancillary+SeatMap][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-112-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-113 — BLOCKED

- **Test Case:** [Upselling-Ancillary+SeatMap][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-113-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-114 — BLOCKED

- **Test Case:** [Upselling-Ancillary+SeatMap][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-114-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-115 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary+SeatMap][Response] Verify Family-A flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking confirmed: bookingStatus on Retrieve reflects a booked/confirmed state; selectedOffer.offerId and priceDetails.totalAmount match between Book and Retrieve; passengersList on Retrieve matches the AddPassenger submission. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-115-NEG — BLOCKED

- **Test Case:** [Upselling][Request] Validate Upselling is rejected for FlyCham (Upsell capability not supported).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Upselling against FlyCham is rejected/fails, since FlyCham has no confirmed Upsell support (§4.2 explicit NO, §4.6) - expect a 4xx or a supplier-level "not supported" error, not a silent empty upsellOffers[] pass-through that lets the flow continue.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-116 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary+SeatMap][Response] Verify Family-B flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Booking held (not finalized): bookingStatus on Retrieve reflects a held state; holdExpirationDate present and still in the future at Retrieve time; FareConfirmAfterHold price matches Hold's original price (no drift) in the common case. This flow STOPS here and leaves a dangling Held booking with no cleanup step - log the pnr for out-of-band tracking/eventual CancelAfterHold. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-116-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-117 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary+SeatMap][Response] Verify Family-C flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-A checks apply through Retrieve, plus: Void succeeds only if the booking's voidCapability allowed it; a follow-up manual Retrieve shows a voided bookingStatus. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-117-NEG — BLOCKED

- **Test Case:** [FareCheck][Request] Validate FareCheck rejects a hand-constructed AncillaryCode not sourced from GetAncillary.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** FareCheck rejects the hand-constructed AncillaryCode - expect a 4xx/validation error, not a silently-accepted re-price; confirms AncillaryCode must be the opaque gzip+base64 token copied verbatim from GetAncillary, never hand-built (§2.8).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-118 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary+SeatMap][Response] Verify Family-D flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: BookAfterHold transitions bookingStatus from held to booked/confirmed; pnr/bookingToken/gdsPNR are unchanged from Hold (same-PNR invariant); the final Retrieve confirms the booked state. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-118-NEG — BLOCKED

- **Test Case:** [BookAfterHold][Response] Verify behavior of BookAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-119 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary+SeatMap][Response] Verify Family-E flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-D checks apply, plus Family-C's Void checks applied to the now-finalized (ex-Held) booking. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-119-NEG — BLOCKED

- **Test Case:** [Hold][Request] Validate Hold is rejected for a supplier without confirmed Hold support (FlyNas).
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Hold against FlyNas is rejected outright - the flow must not proceed to FareConfirmAfterHold/Retrieve; confirms live capability enforcement matches the documented (cross-validated, high-confidence) Hold=Not Supported gap rather than being silently accepted.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-120 — BLOCKED

- **Test Case:** [Upselling-Bundle+Ancillary+SeatMap][Response] Verify Family-F flow completes end-to-end via the Upselling fare-selection path.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Family-B checks apply through the first Retrieve, plus: CancelAfterHold has zero script coverage and no genuine saved example (UNKNOWN exact response); a follow-up manual Retrieve is expected to show a cancelled/terminated bookingStatus, distinct from both held and booked states - this is the weakest-validated end-state in the flow catalog, confirm live and record as the regression baseline. Bundle check: final priceDetails.totalAmount reflects the chosen bundle's feePrice; bundle-included services are not also charged as separate ancillary lines. Ancillary check: passengersSelectedAncillaries lists exactly the codes selected at GetAncillary/FareCheck with matching AdditionalServiceCategory/quantity; paxTotalAncillaryAmount equals the sum of selected ancillary prices. SeatMap check: the chosen cellCode appears as a Seat-category entry in passengersSelectedAncillaries, priced per GetSeatMap/FareCheck. FareCheck check: final booking price equals FareCheck's re-priced total, not the pre-ancillary FareConfirm/AddPassenger-era total. Manual price-reconciliation must be supplied at Hold/FareConfirmAfterHold/BookAfterHold (V2 enforces this by script only there) and additionally checked by hand at Search/Upselling/Book/Retrieve since no script covers those in V2.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-120-NEG — BLOCKED

- **Test Case:** [CancelAfterHold][Response] Verify behavior of CancelAfterHold attempted after holdExpirationDate has passed.
- **Category:** Flow
- **Endpoint Name:** V2-Upselling
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Exact resulting status is UNKNOWN - confirm live per §2.12/§6.5. Expected candidates are an explicit expiration/price-change rejection or a supplier-level "offer no longer available" error, not a silent success reusing stale Hold-era pricing.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ADDPAX-POS-01 — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate a valid passenger and contact payload is accepted.
- **Category:** POS
- **Endpoint Name:** ADDPAX
- **Request:** Not sent
- **Response:** n/a
- **Expected:** HTTP 200; response returns non-empty offerId and responseId; capture as getAddPaxOfferId, getAddPaxResponceID (note collection variable name typo "Responce"); these supersede all prior IDs for every subsequent V2 step.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ADDPAX-NEG-01 — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate an INF passenger without a valid ParentPaxRefId is rejected.
- **Category:** NEG
- **Endpoint Name:** ADDPAX
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (expected 4xx, exact code UNKNOWN - confirm live per §7.9) since every INF passenger must carry a valid ParentPaxRefId resolving to an ADT entry in the same request (§2.5 Request Rules).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ADDPAX-NEG-02 — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate a contactRefId that does not resolve in contactsList is rejected.
- **Category:** NEG
- **Endpoint Name:** ADDPAX
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (expected 4xx, exact code UNKNOWN - confirm live) since contactRefId must resolve to a key present in contactsList (§2.5 Request Rules).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ADDPAX-VAL-01 — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate passenger count/type mix against what was declared at Search time.
- **Category:** VAL
- **Endpoint Name:** ADDPAX
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Behavior is UNKNOWN - not verified by any script per SPEC.md §2.5; this is a genuine coverage gap. Manually confirm live whether the mismatch is silently accepted, rejected by AddPassenger itself, or rejected later at Book/Hold, and record the result as the baseline going forward.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ADDPAX-BND-01 — BLOCKED

- **Test Case:** [AddPassenger][Request] Validate handling of a non-Latin-script passenger name.
- **Category:** BND
- **Endpoint Name:** ADDPAX
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Behavior is UNKNOWN - every observed example in the collection uses Latin-script names only (§2.5 Testing Notes); confirm live whether non-Latin names are accepted, transliterated, or rejected, and record the result. Given ~38 suppliers span many non-English-speaking home markets, this is a realistic, currently-unexercised boundary.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ANCILLARY-POS-01 — BLOCKED

- **Test Case:** [GetAncillary][Response] Verify available ancillary services are returned for an ancillary-capable offer.
- **Category:** POS
- **Endpoint Name:** ANCILLARY
- **Request:** Not sent
- **Response:** n/a
- **Expected:** HTTP 200; response includes isFareCheckRequired, offerId, responseId (captured as ANCofferId/ANCresponseId), passengersAncillariesAvailabilty, and segmentsAncillariesDetails with ancillaryCategory/price/availableCount per service.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ANCILLARY-NEG-01 — BLOCKED

- **Test Case:** [GetAncillary][Request] Validate calling GetAncillary when offerHasAncillary=false.
- **Category:** NEG
- **Endpoint Name:** ANCILLARY
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Behavior is UNKNOWN - INFERRED expectation is an empty availability set or an explicit rejection rather than a populated ancillary list; confirm live which occurs and record as the baseline (§2.6 Business Logic).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ANCILLARY-VAL-01 — BLOCKED

- **Test Case:** [GetAncillary][Response] Validate the misspelled passengersAncillariesAvailabilty field and ancillaryCategory taxonomy.
- **Category:** VAL
- **Endpoint Name:** ANCILLARY
- **Request:** Not sent
- **Response:** n/a
- **Expected:** passengersAncillariesAvailabilty is present under its exact (misspelled) key - this is a genuine defect in the live API's own JSON, not a documentation typo, and assertions must match it exactly. ancillaryCategory values are constrained to the known taxonomy (Baggage, Meal, Seat, Other); an unrecognized value should be flagged, not hard-failed (§8.3).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-ANCILLARY-BND-01 — BLOCKED

- **Test Case:** [GetAncillary][Response] Validate availableCount=null is treated as unlimited, distinct from 0.
- **Category:** BND
- **Endpoint Name:** ANCILLARY
- **Request:** Not sent
- **Response:** n/a
- **Expected:** availableCount=null is explicitly asserted to mean "unlimited/not tracked," distinct from availableCount=0 which means "none available" - a service with null must not be treated as unselectable.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-POS-01 — BLOCKED

- **Test Case:** [GetSeatMap][Response] Verify the seat map is returned for a seat-map-capable offer.
- **Category:** POS
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** HTTP 200; response includes seatMapDetails per segment with rows/cells; no collection variables are auto-captured - the chosen cellCode must be manually recorded for the next Book/Hold step.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-NEG-01 — BLOCKED

- **Test Case:** [GetSeatMap][Request] Validate calling GetSeatMap when isSeatMapRequired=false.
- **Category:** NEG
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Behavior is UNKNOWN - confirm live whether an empty/no seatMapDetails is returned or the call is rejected outright, and record as the baseline (§2.7 Business Logic).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-01 — BLOCKED

- **Test Case:** [GetSeatMap][Response] Validate cellCategory/cellAvailability values against the known enum set.
- **Category:** VAL
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** cellCategory is checked against the known observed value ("Seat"); cellAvailability is checked against the known observed set (Occupied, AvailablePaid). An unrecognized value in either enum is flagged for review rather than hard-failed, per §8.3's "flag, don't hard-fail on enum growth" rule. Also confirm live whether cellDetails is a proper nested JSON object or a stringified dump (§2.7 flags this as possibly an extraction artifact, UNKNOWN pending live confirmation).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECHECK-POS-01 — BLOCKED

- **Test Case:** [FareCheck][Response] Verify price delta equals the sum of selected ancillary/seat prices.
- **Category:** POS
- **Endpoint Name:** FARECHECK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** selectedOffer.passengerFareBreakdown[].paxTotalAncillaryAmount equals the sum of the selected ancillary/seat prices; priceDetails.totalAmount equals the pre-ancillary FareConfirm/AddPassenger-era total plus that same delta - the single highest-value price-integrity assertion for any enrichment-bearing flow.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECHECK-NEG-01 — BLOCKED

- **Test Case:** [FareCheck][Request] Validate an AncillaryCode not sourced from GetAncillary is rejected.
- **Category:** NEG
- **Endpoint Name:** FARECHECK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (expected 4xx/validation error, exact code UNKNOWN - confirm live) since AncillaryCode must be copied verbatim from GetAncillary and is never hand-constructed (§2.8 Request Rules).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECHECK-INT-01 — BLOCKED

- **Test Case:** [FareCheck][Integration] Verify which responseId Book/Hold actually require after FareCheck.
- **Category:** INT
- **Endpoint Name:** FARECHECK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Determine and record which ResponseId value Book/Hold actually accept post-FareCheck. SPEC.md flags this as an UNKNOWN/needs-live-confirmation soft spot: since the propagation line is commented out, fareConfirmResponseId may remain stale post-FareCheck while only the offerId variables update - if Book/Hold require a fresh responseId that was never captured, this is a latent chaining bug (§2.8 Response Mapping/Testing Notes).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-FARECHECK-BND-01 — BLOCKED

- **Test Case:** [FareCheck][Request] Validate an ancillary quantity exceeding availableCount is rejected.
- **Category:** BND
- **Endpoint Name:** FARECHECK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Behavior is UNKNOWN - confirm live whether the request is rejected outright or silently capped/accepted; record as baseline (§2.8 Common Errors).
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BUNDLE-VAL-01 — BLOCKED

- **Test Case:** [GetOfferBundles][Response] Validate JourneyKey1 is not relied upon anywhere downstream in a V2 Bundle-bearing Upselling chain.
- **Category:** VAL
- **Endpoint Name:** BUNDLE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** JourneyKey1 evaluates to undefined against the real response shape (script/response-shape mismatch bug, identical wording in both V1 and V2 scripts) and is confirmed to be consumed by no subsequent request in the V2 collection - the chain succeeds using fareConfirmResponseId/selectedOfferId threaded through directly, proving JourneyKey1 is a dead, if inert, variable. This case documents the V2-collection-observed instance of this defect specifically in an Upselling+Bundle chain; a separate Both-version generic pass owns the cross-version framing of this same defect.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-POS-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** GetSeatMap returns HTTP 200 with a non-empty offerId/responseId; the collection variables getSeatMapOfferId and getSeatMapResponceID (note the collection's own "Responce" spelling) are populated from these; Book accepts them and returns pnr/bookingToken/gdsPNR without needing AddPassenger's IDs re-sent -- this is a behavior change from before 2026-08-10, when GetSeatMap set no variables at all and Book still read AddPassenger's IDs.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book accepts the token despite the field-name casing difference between the response (cellID) and the request (cellId) and attaches the correct seat, echoed back in the response's passengersSelectedSeats/selectedOffer.passengerFareBreakdown[].passengerSeats.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-04 — BLOCKED

- **Test Case:** [SeatMap][Request] Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live per §7.9), since cellID appears (per its base64-decoded contents) to embed the originating ResponseId/OfferId/passenger-ref metadata and is presumably bound to the offer it was issued for.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-BND-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid, Blocked, and Occupied, and that Aisle-category cells carry no seatPriceDetails.
- **Category:** Boundary
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every cellCategory value observed is one of {Seat, Aisle}; every cellAvailability/paxCellAvailability value observed is one of {AvailablePaid, Blocked, Occupied}. If a new value appears (e.g. an "available free" state), log it and flag rather than hard-failing (§8.3 policy for UNKNOWN enumerations) -- do not assume the three known values are exhaustive.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-BIZ-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell.
- **Category:** Business Rule
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** totalPrice.amount == basePrice.amount + taxesPrice.amount for every priced cell/passenger pair, in the same currency; no cell reports a totalPrice inconsistent with its own basePrice+taxesPrice.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-REG-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify seatMapDetails.&lt;segment&gt;.{cabinLayoutsByDeck, rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails}}} structure matches the fuller schema captured 2026-08-10, AND flag/tolerate the flat-columns supplier variant (no zones[]/zoneId) confirmed present in a saved example.
- **Category:** Regression
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every OTHER key listed in SPEC.md §2.7 (rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails.{cellID,cellCode,cellAvailability,name,description,seatPriceDetails,seatPriceDetailsByPassenger,cellCharacteristics}}}) is present and correctly typed. The cabinLayoutsByDeck/zoneId shape is now confirmed to vary by supplier -- do NOT hard-fail a response for lacking zones[]/zoneId if it instead provides the flat columns[] array (AirArabia-confirmed variant); do NOT hard-fail a response for lacking the flat columns[] array if it instead provides zones[]/zoneId. Treat presence of at least one of the two shapes as passing, and log which shape each supplier uses.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-POS-03 — BLOCKED

- **Test Case:** [Book][Request] Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly.
- **Category:** Positive
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** HTTP 200; pnr/bookingToken/gdsPNR returned; response top-level passengersSelectedSeats.T1.S1 == {cellCode:"12E", price:{amount,currency}}; selectedOffer.passengerFareBreakdown[].passengerSeats contains the same {cellCode,price}; selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount reflect the same price.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-05-SM — BLOCKED

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live per §7.9); no booking is created, or if a PNR is created it must NOT reflect the unavailable seat as attached -- either outcome should be logged precisely, since both are plausible failure modes for an unenforced availability check.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-06 — BLOCKED

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live) since the tampered token should fail whatever server-side decode/signature check the opaque cellId undergoes.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-VAL-06 — BLOCKED

- **Test Case:** [Book][Request] Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes.
- **Category:** Validation
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- confirm live whether the API trusts cellId alone (ignoring/overwriting the mismatched cellCode), rejects the request outright, or books the wrong seat under the wrong displayed code. All three are plausible given cellId is described as the metadata-bearing field and cellCode as a display label.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-04-SM — BLOCKED

- **Test Case:** [Book][Response] Verify selectedOffer.priceDetails.totalAmount includes totalSelectedSeatsAmount when a seat has been selected.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- confirm live. Expected (per the existing price-reconciliation formula's pattern, §2.1) is totalAmount == totalBaseAmount + totalTaxAmount + totalAncillariesAmount + totalSelectedSeatsAmount, and totalAmount(after) == totalAmount(before seat selection) + totalSelectedSeatsAmount. Neither V1 nor V2's existing price-reconciliation test scripts were observed summing a seat amount, so this is unverified either way -- treat any mismatch as a confirmed defect, not an UNKNOWN to shrug off, once run.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-INT-03 — BLOCKED

- **Test Case:** [Book][Request] Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously on one call.
- **Category:** Integration
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- confirm live. The collection's current saved Book example carries only passengersSelectedSeats active, with selectedBundles/PassengersSelectedAncillaries left commented out -- this combination has not been directly evidenced as accepted. Record whichever outcome occurs (accepted with all three reflected in the response, partially accepted, or rejected) as the new ground truth.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BND-03 — BLOCKED

- **Test Case:** [Book][Request] Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries.
- **Category:** Boundary
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** (a) Book succeeds with no seat attached (passengersSelectedSeats absent/empty in the response). (b) succeeds as in TC-BOOK-POS-03. (c) UNKNOWN -- confirm live whether multiple passengers/segments nest correctly as sibling keys per SPEC.md §2.9's schema description, since only the single-passenger/single-segment shape has a directly-observed example.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-REG-02 — BLOCKED

- **Test Case:** [Book][Response] Verify passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema going forward.
- **Category:** Regression
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** All five newly-documented fields (passengersSelectedSeats, passengerSeats, paxTotalSeatAmount, totalSelectedSeats, totalSelectedSeatsAmount) are present and correctly typed whenever a seat has been selected; none of the pre-existing response fields regressed.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATAFTERHOLD-POS-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Discovery case -- submit the collection's documented 6-field body against a live Held PNR and capture the actual response shape.
- **Category:** Positive
- **Endpoint Name:** SEATAFTERHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN by design -- no expected shape exists anywhere in SPEC.md or the collection (§2.7a). This case's purpose is to establish ground truth: does it return 200 with a seat-map-like payload to choose from, does it require a follow-up call, or does it error demanding fields not shown in the saved example? Record exactly what happens; do not force-fit the result into an assumed shape.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATAFTERHOLD-VAL-01 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Confirm whether a seat/cell field is required beyond the 6 documented fields, by inspecting the response/error from TC-SEATAFTERHOLD-POS-01.
- **Category:** Validation
- **Endpoint Name:** SEATAFTERHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- resolve empirically. If the 6-field body alone suffices to attach a seat, document the mechanism by which the specific seat is chosen (it is not present in the request as shown). If it does not suffice, document the actual required shape and treat the collection's saved example as an incomplete stub -- flag to the team as a collection defect (missing/incomplete request body), not silently work around it.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATAFTERHOLD-NEG-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Validate SeatAfterHold rejects a call made after the Hold's holdExpirationDate has passed.
- **Category:** Negative
- **Endpoint Name:** SEATAFTERHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live), consistent with the same expectation already documented for FareConfirmAfterHold on an expired hold (§2.12).
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATAFTERHOLD-INT-04 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Determine SeatAfterHold's actual position in the Hold-branch chain by attempting it at three candidate points and comparing outcomes.
- **Category:** Integration
- **Endpoint Name:** SEATAFTERHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- resolve empirically. Record which candidate position(s) SeatAfterHold accepts without erroring, and whether the resulting Retrieve response shows passengersSelectedSeats/passengerSeats/totalSelectedSeats populated (§2.11) for that chain. If more than one position succeeds without erroring, that itself is a finding worth reporting (an under-constrained endpoint), not assumed to be intentional flexibility.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-49-SEATFIELD — BLOCKED

- **Test Case:** [Flow 49][Response] Verify the existing SM-enrichment Family-A flow now chains Book's ResponseId/selectedOfferId from GetSeatMap's output and that Book's passengersSelectedSeats field is exercised, not left unused.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Per-family state check (§6.3 Family A) plus the new seat-specific checks: Book/Retrieve both echo passengersSelectedSeats matching the selection; selectedOffer.priceDetails.totalSelectedSeatsAmount is non-zero and (per TC-BOOK-BIZ-04) reconciles into totalAmount.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-50-SEATFIELD — BLOCKED

- **Test Case:** [Flow 50][Request] Verify that GetSeatMap's chosen seat cannot be attached via Hold directly, and must instead go through the new SeatAfterHold endpoint.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- confirm live whether Hold silently ignores an unrecognized passengersSelectedSeats field, rejects the request outright for an unexpected field, or (surprisingly) accepts it. SPEC.md §2.10/§1.10-item6 currently documents this field as absent from Hold's contract based on the saved example alone, not a live-confirmed rejection -- this case supplies that live confirmation. Regardless of outcome, the flow's Retrieve step should be checked for whether passengersSelectedSeats/passengerSeats appear at all without a SeatAfterHold call having been made.
- **Actual:** Not executable on AirIndia: the chain needs Hold / BookAfterHold / FareConfirmAfterHold (PnrReprice) / Void / CancelAfterHold / Upselling / FareCheck / FareRules / SeatAfterHold, which AirIndia does not support (live: 409 OperationNotSupported on V1 and V2, see the TC-AIEGY-*-NEG-01 cases for each endpoint; supplier matrix lists them N/A). Independently, no inventory is returned (TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-CANDIDATE-SM-HOLD-01 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-A][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called immediately after Hold, before FareConfirmAfterHold.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN by design. If this chain position is correct, expect SeatAfterHold to succeed and the final Retrieve to show passengersSelectedSeats/passengerSeats/totalSelectedSeats populated (§2.11), with FareConfirmAfterHold's re-priced total reflecting the added seat cost. If this is the wrong chain position, expect SeatAfterHold or a later step to reject.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-CANDIDATE-SM-HOLD-02 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-B][Response] Verify Search-to-Retrieve completes with a selected seat when SeatAfterHold is called after FareConfirmAfterHold, before BookAfterHold.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN by design -- same expected-outcome logic as FLOW-V2-CANDIDATE-SM-HOLD-01, but testing whether re-pricing (FareConfirmAfterHold) must happen before or after the seat is attached.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-CANDIDATE-SM-HOLD-03 — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-C][Response] Verify a selected seat can still be attached via SeatAfterHold after BookAfterHold has already finalized the booking.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN by design. If seat selection is meant to be a pre-ticketing step only, expect this to be rejected (booking already finalized); if the API allows post-finalization seat changes, expect it to succeed and Retrieve to reflect the seat.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### FLOW-V2-CANDIDATE-SM-HOLD-01-NEG — BLOCKED

- **Test Case:** [Flow Candidate SM-Hold-A][Request] Validate SeatAfterHold rejects a pnr/gdsPNR/bookingToken triple carried over from a different, unrelated Hold call earlier in the same test session.
- **Category:** Flow
- **Endpoint Name:** V2 flow
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live), same class as TC-SEATAFTERHOLD-NEG-01 but exercised inside a full flow context rather than in isolation.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-05 — BLOCKED

- **Test Case:** [Book][Request] Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: response status is an error (candidate error code RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD, per this suite's Seat map - Seatmap.md TC-INT-BOOK-008 reference) and no pnr is created for this attempt. Candidate code is UNKNOWN-confirm-live -- not yet observed in any Postman-collection saved example; record the exact code/status returned and update this row plus SPEC.md §2.9 once confirmed.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-07 — BLOCKED

- **Test Case:** [Book][Request] Validate Book rejects a request that assigns the same seat cell to two different passengers.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: request rejected (candidate error code DUPLICATE_SEAT_SELECTION_IN_REQUEST, per Seat map - Seatmap.md TC-INT-BOOK-009) before any supplier round-trip; exact status UNKNOWN-confirm-live. No pnr created.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-08 — BLOCKED

- **Test Case:** [Book][Request] Validate Book rejects a request where the same passenger selects two different seats on the same segment.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- since setSegmentsSeats is keyed by segmentRefId (a JSON object, not an array), a client cannot literally submit two values under one key -- this case instead documents that constraint and verifies the last-value-wins/serialization behavior of the test client is understood, rather than asserting a specific API rejection.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-06 — BLOCKED

- **Test Case:** [Book][Response] Verify an Infant (INF) passenger travelling on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertions: Book/Retrieve succeed; selectedOffer.passengerFareBreakdown for the INF paxRef has paxTotalSeatAmount.amount == 0 (or the field/array absent) and no passengerSeats entries; the ADT's paxTotalSeatAmount matches the selected cell's price; totalSelectedSeatsAmount equals only the ADT's seat price, not double-counted for the INF.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-09 — BLOCKED

- **Test Case:** [Book][Request] Validate graceful rollback (no orphaned PNR or charge) when the supplier's seat allocation call fails or times out after Book is submitted with a seat selection.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion (once a forcing mechanism exists): response is an error (candidate HTTP 422/502 per Seat map - Seatmap.md TC-INT-BOOK-012); either no pnr is returned, or if one is returned, a follow-up Retrieve shows the booking exists without the failed seat attached and without a seat fee charged. Exact behavior UNKNOWN -- confirm live and record; this is an environment-dependent exploratory case, not guaranteed reproducible on demand.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-VAL-07 — BLOCKED

- **Test Case:** [Book][Request] Validate that submitting a second, different passengersSelectedSeats selection supersedes an earlier selection made earlier in the same test session (late seat-change-before-submission).
- **Category:** Validation
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: Book succeeds and reflects cell B only -- passengersSelectedSeats/passengerSeats/totalSelectedSeats show cell B's cellCode/price; cell A does not appear anywhere in the response, and cell A's availability (per a follow-up GetSeatMap, if re-queryable) is unaffected by the abandoned selection.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-BIZ-07 — BLOCKED

- **Test Case:** [Book][Request] Validate a designated wheelchair-accessible seat can be selected for a passenger flagged for special assistance, and the assignment is preserved.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- confirm live. Expect Book/Retrieve to succeed with the seat attached like any other paid/free seat; there is no evidenced SSR (special-service-request) field anywhere in the current V2 Book/AddPassenger schema (§2.5/§2.9) to carry a WCHR code alongside the seat, so if Seat map - Seatmap.md's TC-INT-BOOK-014 expectation of a linked SSR flag is correct, that would be an undocumented field this suite has not yet discovered -- treat any SSR-linkage behavior found as a new SPEC.md §2.9 finding, not something to assume exists.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-VAL-08 — BLOCKED

- **Test Case:** [Book][Response] Verify the currency code is consistent (not a generic placeholder like "string") across every seat-price object in one Book response.
- **Category:** Validation
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: every seat-related price.currency value is identical (e.g. all "EGP" or all "AED", matching the offer's overall currency) and none equals the literal string "string" or is null/empty.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-REG-03 — BLOCKED

- **Test Case:** [Book][Response] Verify selectedOffer.passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount when exactly one seat is selected.
- **Category:** Regression
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: the two amounts are exactly equal (and same currency). This directly encodes the schema-discrepancy defect pattern flagged in Seat map - Seatmap.md TC-INT-BOOK-005 (its own example shows a hypothetical 50.0-vs-100.0 mismatch) -- any observed mismatch is a confirmed defect against §2.9's response schema, not an UNKNOWN.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-10 — BLOCKED

- **Test Case:** [Book][Request] Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object ({}) rather than omitted.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: Book succeeds (HTTP 200), no seat fee is charged (totalSelectedSeatsAmount == 0 or absent), passengersSelectedSeats in the response is empty/absent, and no 500-level error occurs from the explicit-empty-object shape (distinct from simply omitting the field, which TC-BOOK-BND-03 run (a) already covers).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-NEG-11 — BLOCKED

- **Test Case:** [Book][Request] Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: Book succeeds; no seat is attached for T1; no error is thrown by the presence of an otherwise-empty nested object.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-05 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: for every padisCode value observed, description must not contradict the code's known meaning per the now-sourced canonical reference table. Codes still outside that table should be rare -- log any such pairing rather than asserting pass/fail.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-BND-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify AvailableFree is accepted as a real cellAvailability value (confirmed via saved example) and confirm live whether AvailableAfterReservation is also real, beyond the four now-evidenced values (AvailablePaid, Blocked, Occupied, AvailableFree).
- **Category:** Boundary
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** CONFIRMED live for AvailableFree as of 2026-08-24 (see saved example above) -- update SPEC.md §2.7/§8.3's enum list to add AvailableFree to the observed set. AvailableAfterReservation remains UNKNOWN; if found, add with evidence, if never observed after a reasonably broad sample, record it as an unconfirmed QC-checklist-only candidate rather than promoting it.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-06 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: cellCategory=Aisle implies column is null AND cellDetails is null; cellCategory=Seat implies column is non-null AND cellDetails is a populated object (per TC-SEATMAP-REG-02's field list). No cell violates this partition.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-RETRIEVE-REG-01-SM — BLOCKED

- **Test Case:** [Retrieve][Response] Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed (Retrieve After Issue).
- **Category:** Regression
- **Endpoint Name:** RETRIEVE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: passengersSelectedSeats/passengerSeats/totalSelectedSeats/totalSelectedSeatsAmount in Retrieve #2 are identical to Retrieve #1 -- the seat assignment does not disappear or change once ticketing completes.
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-INT-04 — BLOCKED

- **Test Case:** [Book][Request] Validate a selected bundle's JourneyKey/SelectedBundleCode and a selected seat's segmentRefId are cross-consistent (both resolve to the same journey).
- **Category:** Integration
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: Book succeeds; response reflects both the bundle and the seat without either overriding the other's pricing (selectedOffer.priceDetails carries both a bundle-inclusive component and totalSelectedSeatsAmount, not double-counted or dropped).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATAFTERHOLD-VAL-02 — BLOCKED

- **Test Case:** [SeatAfterHold][Request] Once SeatAfterHold's real contract is confirmed (TC-SEATAFTERHOLD-VAL-01), validate it rejects a seat/passenger reference that does not belong to the passengers established at AddPassenger/Hold time for this pnr.
- **Category:** Validation
- **Endpoint Name:** SEATAFTERHOLD
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- this case is blocked on TC-SEATAFTERHOLD-VAL-01 resolving the real request shape first; do not attempt to write a concrete assertion here until that prerequisite lands. Once it does, expect rejection analogous to AddPassenger's contactRefId/ParentPaxRefId cross-field validation pattern (§2.5).
- **Actual:** Blocked: needs a live booking (PNR) on AirIndia/EGY, which cannot be created without inventory (see TC-AIEGY-CAP-01).
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-POS-01-SM — BLOCKED

- **Test Case:** [SeatMap][Response] Verify a valid GetSeatMap call returns HTTP 200 with supplier, flightSegments, passengersDetails, and a non-empty seatMapDetails, matching the flight/segments established at FareConfirm.
- **Category:** Positive
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertions: HTTP 200; supplier, flightSegments, passengersDetails, seatMapDetails all present and non-null; seatMapDetails has at least one key; every segmentRefId key in seatMapDetails also appears in flightSegments and in the offer's segments from FareConfirm/AddPassenger (no orphan/missing segments in either direction).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-NEG-01-SM — BLOCKED

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected (or returns an explicit not-supported response) when called for an offer whose isSeatMapRequired flag was false at FareConfirm/AddPassenger time.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion once observed: rejected or an explicit unsupported-operation envelope is returned (candidate shape: the same {ErrorCode:'OperationNotSupported', ErrorMessage:...} envelope already confirmed live for GetOfferBundles on a haveBundles=false offer, §2.4) rather than a 200 with an empty/malformed seatMapDetails. Exact shape UNKNOWN for this specific endpoint -- confirm live and record.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-NEG-02 — BLOCKED

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected when the request otherwise targets a valid offer but no segment of that offer's itinerary is being queried (i.e., the offer/response pair does not correspond to any real segment).
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live per §7.9); no seatMapDetails should be returned for a segment set that doesn't belong to the referenced offer.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-NEG-05 — BLOCKED

- **Test Case:** [SeatMap][Request] Validate GetSeatMap fails gracefully (a structured error, not a raw 500/stack trace) when the underlying supplier call fails or times out.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion (once a forcing mechanism exists): response is a structured business-error envelope (matching this API's other confirmed error envelopes, e.g. §2.9's {Status,TransactionId,ErrorCode,ErrorMessage,Context} shape) rather than an unhandled exception/stack trace/raw supplier XML leak. No internal .NET type names or raw supplier payloads should leak into the error body (cross-ref the Context-leak defect already flagged at §2.9).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-07 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify seat attributes relevant to customer-facing seat selection (window, aisle, extra legroom/exit row) are programmatically derivable from cellCharacteristics for every Seat-category cell.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: for codes present in the now-sourced canonical reference table (NDC_Integration/Resources/SeatResources/PadisSeatCharacteristic.md), the derived classification must not contradict column position or description text. Codes outside that table are logged, not failed.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-08 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify seatPriceDetails/seatPriceDetailsByPassenger is populated (non-null) for every AvailablePaid cell and null/absent for every Blocked or Occupied cell.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: every AvailablePaid cell has a non-null seatPriceDetailsByPassenger with populated totalPrice/basePrice/taxesPrice per passenger (cross-ref TC-SEATMAP-BIZ-02's reconciliation); every Blocked/Occupied cell has seatPriceDetails null (consistent with SPEC.md §2.7's observed example, which shows seatPriceDetails: null on a Blocked cell).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-09 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify cellCode is unique across all cells within one flight segment's seatMapDetails.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: no cellCode value repeats within the same segment. A duplicate seat code is a confirmed defect (SeatMap QC Execution Checklist.md §9's "Duplicate seat code" possible-bug), not an UNKNOWN.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-VAL-10 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify structural uniqueness and domain constraints across decks/zones/rows/columns: rowNumber unique within a segment, zoneId unique within a deck, column values restricted to {A,B,C,D,E,F,null}.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: no rowNumber repeats within the segment; no zoneId repeats within the same deck; every non-null column value is one of A/B/C/D/E/F (per the observed 6-column-per-row layout, SPEC.md §2.7); null column values correspond only to Aisle-category cells (cross-ref TC-SEATMAP-VAL-06).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-BIZ-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported, may legitimately differ for the same cell, and are NOT required to list every passenger on the offer.
- **Category:** Business Rule
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion (structural, not value-equality, and NOT a completeness requirement): a passenger's absence from a cell's seatPriceDetailsByPassenger is EXPECTED and valid whenever that passenger is not eligible for that cell (confirmed pattern: a CHD/INF passenger restricted from a forward/exit cell won't appear there, per this same example's passengersSeatMapAvailability showing PAX3/PAX4 with a much shorter or empty allow-list than PAX1/PAX2). Do NOT assert every passenger must appear per priced cell -- only assert internal consistency: a passenger listed in seatPriceDetailsByPassenger for a cell SHOULD also have that cell's cellCode present in their own passengersSeatMapAvailability entry (if that top-level structure is present in the response). Do not assert cellAvailability == a per-passenger equivalent for all passengers either, since SeatMap QC Execution Checklist.md §11 explicitly notes these may differ legitimately (e.g. a seat blocked for one passenger type but not another).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-BIZ-04 — BLOCKED

- **Test Case:** [SeatMap][Response] Exploratory -- confirm GetSeatMap reflects real-time supplier inventory rather than a cached/stale snapshot.
- **Category:** Business Rule
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- resolve empirically; if reliably forceable, expect the cell's cellAvailability to transition (e.g. AvailablePaid -&gt; Occupied) between the two calls, confirming a live supplier round-trip rather than a cached response. If not reliably forceable in this environment, downgrade to logging response timing/headers (e.g. absence of a Cache-Control/ETag suggesting no caching layer) as weaker circumstantial evidence instead.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-SEC-02 — BLOCKED

- **Test Case:** [SeatMap][Documentation] Record that supplier-side authentication security (this API's own credentials presented to the airline/GDS backend) and request/response logging are not independently verifiable through this API's black-box contract, and identify the correct verification channel for each.
- **Category:** Security
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** This case does not assert a pass/fail against the live API. It documents that: (a) User Story AC8's "securely authenticates with airline supplier APIs" describes THIS system's outbound credential handling toward suppliers -- a server-side/config concern, confirmable only via a backend credential-storage/config audit or the automation framework's own code review (PRD §7's Gap #1 already flags this as hardcoded tech debt), not via any request this Postman-collection-driven suite can send; (b) AC9's "provides logging" is confirmable only via log/observability review (PRD §7's ApiResponse logger, correlation-ID tracing), not via API response inspection. TC-SEATMAP-NEG-05 covers AC9's "handles errors gracefully" half, which IS API-observable.
- **Actual:** Not applicable to this run: the case tests the Postman collection / documentation, not an API behaviour on AirIndia.
- **Status:** BLOCKED
- **Evidence:** 

### TC-SEATMAP-INT-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols.
- **Category:** Integration
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: every supplier's GetSeatMap response conforms to the identical schema documented in SPEC.md §2.7 (same top-level keys, same seatMapDetails/cellDetails nesting) regardless of the supplier's native protocol -- differences are limited to data values (cellCode ranges, characteristics, pricing), never to the shape itself. A supplier whose response requires a materially different assertion path is a normalization defect in the supplier-adapter layer (§1.3), not an acceptable per-supplier variation.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-INT-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Capability-matrix sweep -- run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable per SPEC.md §4.6, and record pass/fail per supplier.
- **Category:** Integration
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every confirmed-capable supplier's GetSeatMap call succeeds with a populated seatMapDetails; every explicitly-not-capable supplier is expected to fail gracefully (cross-ref TC-SEATMAP-NEG-01's pattern) rather than silently succeed with an empty response. Build/maintain the resulting per-supplier pass/fail table as a living artifact alongside SPEC.md §4.6.
- **Actual:** Out of scope: this run is limited to supplier AirIndia (credentials EGY); no call is sent to any other supplier. (cross-supplier sweep; the AirIndia part is TC-AIEGY-CAP-01.)
- **Status:** BLOCKED
- **Evidence:** 

### TC-SEATMAP-VAL-11 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify passengersSeatMapAvailability.&lt;paxRef&gt;.&lt;segmentRefId&gt; (the top-level per-passenger allow-list of cellCodes) stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertions: (1) every segmentRefId key under passengersSeatMapAvailability.&lt;paxRef&gt; matches the casing used elsewhere in the same response (flightSegments/seatMapDetails keys) -- a differently-cased key for the same logical segment (e.g. "Seg3" vs "SEG1"/"SEG2") is a confirmed defect, not an acceptable variation; (2) every cellCode listed in a passenger's allow-list corresponds to a real cell in that segment's seatMapDetails.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-SEATMAP-BND-04 — BLOCKED

- **Test Case:** [SeatMap][Response] Confirm live whether any cellCategory value beyond {Seat, Aisle} (e.g. Lavatory/Bathroom, Bulkhead, Galley, Closet, ExitRow, StairsToUpperDeck, WingBox, StorageBin, RestrictedZone, NoSeat, Other, per the full backend enum) is ever returned.
- **Category:** Boundary
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN -- resolve empirically. Only Seat and Aisle are confirmed as of 2026-08-24; every other member (including whichever name -- Lavatory or Bathroom -- the bathroom-equivalent category actually uses live) remains unconfirmed. Do not assume Seat/Aisle are exhaustive, and do not assume the C# enum's member names match what the API actually serializes (the Lavatory-vs-Bathroom naming discrepancy between the raw example's comment and the enum source must be resolved live, not guessed).
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-BOOK-POS-04 — BLOCKED

- **Test Case:** [Book][Response] Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step.
- **Category:** Positive
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: the immediate post-Book Retrieve already shows passengersSelectedSeats/passengerSeats/totalSelectedSeatsAmount populated with the selected seat, while bookingStatus/ticketStatus still reads as un-ticketed/un-issued (e.g. Booked, not Ticketed). This confirms the seat is attached to the reservation at Book time and does not depend on a later payment/ticketing step existing or completing. If bookingStatus already reads as ticketed/paid immediately post-Book with no intervening action taken, record that as a finding rather than assuming the AC's ordering holds.
- **Actual:** Blocked: AirIndia/EGY returns no bookable inventory on ne-3 (every valid Search, V1 and V2, returns HTTP 200 with an empty offers[]; about 1,600 searches, 0 offers - see TC-AIEGY-CAP-01/02/05). The offerId / ResponseId this case depends on cannot be produced.
- **Status:** BLOCKED
- **Evidence:** Evidence: TC-AIEGY-CAP-01 (gate), TC-AIEGY-CAP-02 (sweep) and TC-AIEGY-CAP-05 (supplier leg never answers).

### TC-AIEGY-CAP-02 — FAIL

- **Test Case:** [Search][Regression] Verify AirIndia/EGY returns inventory on at least one route and date across India domestic, Gulf, Egypt, Europe, Asia and North America routes (route and date sweep).
- **Category:** Regression
- **Endpoint Name:** Search (V2, V1)
- **Request:** 1618 one-way Search calls (V2, plus a few V1), 1049 distinct routes, 12 distinct departure dates (2026-11-03 .. 2027-09-10)
- **Response:** HTTP {"200":1618}; offers returned on 0 of 1618
- **Expected:** At least one route/date returns offers so that Book, Hold and Void flows can be exercised.
- **Actual:** 0 of 1618 searches returned any offer; every search was HTTP 200 with an empty offers[] (statuses {"200":1618}).
- **Status:** FAIL
- **Evidence:** Per-call latency 15.1-16.0 s (mean 15.1 s). Four representative calls attached as hops; the full tally is in this entry.

  - **Hop 1 &mdash; V2 Search (probe):** FAIL &mdash; HTTP 200, offers=0
  - **Hop 2 &mdash; V2 Search (probe):** FAIL &mdash; HTTP 200, offers=0
  - **Hop 3 &mdash; V2 Search (probe):** FAIL &mdash; HTTP 200, offers=0
  - **Hop 4 &mdash; V1 Search (p2):** FAIL &mdash; HTTP 200, offers=0

### TC-SEARCH-POS-01 — FAIL

- **Test Case:** [Search][Request] Verify a valid multi-field Search request returns a non-empty offers array for a supported route.
- **Category:** POS
- **Endpoint Name:** Search
- **Request:** 2 call(s): V1 Search, V2 Search
- **Response:** V1 200, V2 200
- **Expected:** HTTP 200; offers[] non-empty; every offer carries offerId, priceDetails and the capability flags; responseId present.
- **Actual:** V1: HTTP 200, offers=0, responseId present, took 15.8s | V2: HTTP 200, offers=0, responseId present, took 15.7s
- **Status:** FAIL
- **Evidence:** Schema keys present: responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails, offers. No offers on either version; see TC-AIEGY-CAP-02 for the route/date sweep (1,618 searches, 0 offers).

  - **Hop 1 &mdash; V1 Search (multipax):** FAIL &mdash; 200 offers=0 (15.8s)
  - **Hop 2 &mdash; V2 Search (multipax):** FAIL &mdash; 200 offers=0 (15.7s)

## Findings

### Defects

- **[TC-AIEGY-CAP-02] BUG-01 (new) &mdash; AirIndia/EGY returns no offers on any route or date: 1,618 one-way searches (India domestic, Gulf, Egypt, Europe, North America, Asia, Africa; both directions; 12 departure dates from 2026-11-12 to 2027-09-30; V1 and V2) all returned HTTP 200 with an empty offers[]** Field: `offers[] (Search, supplier AirIndia / credentialsSelector EGY)`. Expected: At least one route/date returns offers[] with offerId and priceDetails (e.g. DEL-BOM on any date with scheduled flights). **Impact:** No flow can be executed for AirIndia: Book, Retrieve, Bundles, Ancillary and SeatMap are all unreachable, so the supplier cannot be regression-tested or sold on ne-3 Evidence: TC-AIEGY-CAP-01 (V1 and V2 DEL-BOM), TC-SEARCH-POS-01, TC-AIEGY-CAP-02 (1,618 searches, 0 with offers)
- **[TC-AIEGY-CAP-05] BUG-02 (new) &mdash; When the supplier leg fails, Search stalls for a fixed ~15 s and then answers HTTP 200 with an empty offers[] (no error, no supplierResponse). With isdebug=true the only supplier call visible is the login request; it never returns a response and no availability request is ever sent** Field: `Search response (HTTP 200, offers: [])`. Expected: A prompt technical/supplier error (for example 502/503 or 409 with a mapped ErrorCode such as supplier authentication failed / supplier unavailable), not a successful empty result. **Impact:** A caller cannot tell "no flights" from "supplier down or credentials rejected"; operations will treat an outage as sold-out and no alert fires Evidence: Every one of 1,618 valid searches took 15.1-16.0 s (mean 15.1 s) while invalid input on the same endpoint is rejected in about 0.1 s (TC-AIEGY-CAP-04, CAP-05)
- **[TC-SEARCH-SEC-01] BUG-03 (new) &mdash; Search with isdebug=true returns the raw supplierRequest to the caller, and for AirIndia it contains the supplier login credentials (username, password and domain) in plaintext, on V1 and V2 (isdebug=false or omitted returns nothing)** Field: `supplierRequest (Search with isdebug=true)`. Expected: supplierRequest / supplierResponse are never returned to the caller, or at least credentials are masked (for example "password": "***"). **Impact:** Anyone holding the shared x-api-key can read live AirIndia credentials by adding isdebug=true to a Search Evidence: TC-SEARCH-SEC-01: 3 of 8 calls returned supplierRequest with plaintext credentials (values masked in every artifact of this run)
- **[TC-AIEGY-SEC-02] BUG-04 (new) &mdash; Ordinary 409 NDC-INT-UNC-Z9999 error responses (no isdebug) carry OriginalSupplierRequest with the supplier login credentials in plaintext. Reproduced on V1 Retrieve, V2 Retrieve and V1 FareConfirm; a failed call is enough to leak them** Field: `OriginalSupplierRequest / OriginalSupplierResponse (error responses)`. Expected: Error responses never include raw supplier payloads or credentials; OriginalSupplierRequest / OriginalSupplierResponse omitted or null. **Impact:** Credential disclosure without any special flag: every supplier timeout on these calls hands the caller the AirIndia login Evidence: TC-AIEGY-SEC-02: 3 of 3 calls returned OriginalSupplierRequest (90 characters, credentials structure, values masked)
- **[TC-FARECONFIRM-VAL-01] BUG-05 (new) &mdash; V1 FareConfirm does not validate the search id locally: a never-issued or wrongly named id (ResponseId instead of searchResponseId) is forwarded to the supplier and the call hangs about 135 s before returning 409 NDC-INT-UNC-Z9999 "Connection timed out". V1 and V2 Retrieve of an unknown PNR hang the same ~135 s. V2 FareConfirm rejects the same input in 0.4 s with 400 "selected offer is invalid"** Field: `searchResponseId / selectedOfferId (V1 FareConfirm, V1 and V2 Retrieve)`. Expected: 400 NDC-INT-TEC-A0001 within about a second ("selected offer is invalid, expired or could not be found"), as V2 FareConfirm does; Retrieve of an unknown PNR returns a mapped not-found error. **Impact:** A bad id ties up a request thread for over two minutes and surfaces as an unmapped Z9999; clients will time out first Evidence: TC-FARECONFIRM-VAL-01 (V1 134.7 s), TC-AIEGY-FARECONFIRM-NEG-01 (V1 135.9 s), TC-AIEGY-RETRIEVE-NEG-01 (V1 137.1 s, V2 135.3 s), TC-AIEGY-SEC-02
- **[TC-AIEGY-BOOK-NEG-01] BUG-06 (new) &mdash; V1 Book and V1 GetOfferBundles return HTTP 500 ServerError ("Unknown error occured") for a never-issued fareConfirmResponseId/selectedOfferId pair, for a missing fareConfirmResponseId and for a 1000-character selectedOfferId, where V2 Book and V2 GetOfferBundles return 400 NDC-INT-TEC-A0001** Field: `V1 Book and V1 GetOfferBundles (unknown or missing id)`. Expected: 400 NDC-INT-TEC-A0001 "selected offer is invalid, expired or could not be found" (the V2 behaviour). **Impact:** A bad id on the booking path looks like a platform outage; support cannot tell caller error from server fault Evidence: TC-AIEGY-BOOK-NEG-01, TC-AIEGY-BOOK-NEG-03, TC-BOOK-NEG-12, TC-BOOK-VAL-01, TC-BOOK-VAL-02, TC-AIEGY-GETOFFERBUNDLES-NEG-01/02/03, TC-AIEGY-CHAIN-02
- **[TC-AIEGY-SRCH-PAX-03] BUG-07 (new) &mdash; Search accepts a party of one child with no adult (CHD 1) and a party of 10 that is over the 9-passenger limit only because of infants (6 ADT + 2 CHD + 2 INF); both return HTTP 200 on V1 and V2, while 10 seated passengers, an infant alone and more infants than adults are rejected with 400** Field: `passengers[] (Search validation)`. Expected: 400 NDC-INT-TEC-A0001 for both parties (an adult is required; the 9-passenger cap counts infants). **Impact:** Invalid parties reach the supplier (and cost a 15 s supplier round trip) and would fail later at Book Evidence: TC-AIEGY-SRCH-PAX-03 (CHD only), TC-AIEGY-SRCH-PAX-06 (10 with infants)
- **[TC-VERSIONDIFF-NEG-01] BUG-08 (new) &mdash; Client errors use two different envelopes: model-binding validation failures return camelCase {status, errorCode "1001", errorMessage, context[], originalSupplierRequest: null} while business validation and auth use PascalCase {Status, ErrorCode "NDC-INT-TEC-A0001" / "AuthenticationError" / "OperationNotSupported" / "NDC-INT-UNC-Z9999"}. Over 570 4xx responses: about 300 camelCase vs 260 PascalCase** Field: `error envelope (status/ErrorCode/ErrorMessage casing and codes)`. Expected: One envelope with one casing, for example {"Status":400,"TransactionId":"...","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"...","Context":[...]} for every client error. **Impact:** Clients need two parsers; error-code mapping breaks silently Evidence: TC-VERSIONDIFF-NEG-01 (Search, FareConfirm and Book differ by cause), TC-AIEGY-ENV-01 (census)
- **[TC-AIEGY-SEC-LEAK-01] BUG-09 (new) &mdash; Validation errors expose internal implementation detail: .NET type names (System.DateTime, System.Guid, System.Int32, NDC.Integrations.Application.Dtos.Api.Supplier), JSON path with line and byte position, and the exception class name SocketException. A bad supplier value also returns the misleading text "The airSearchRequestDto field is required." although the DTO is present** Field: `context[].value (validation errors)`. Expected: A neutral message naming the field, for example "supplier must be one of the supported suppliers", with no type names or parser positions. **Impact:** Information disclosure that helps an attacker fingerprint the stack; misleading messages slow integrators down Evidence: TC-AIEGY-SEC-LEAK-01: about 126 of 666 captured responses contain such detail
- **[TC-AIEGY-EXP-01] BUG-10 (new) &mdash; The same unsupported multi-city Search ("The supplier does not support multi city searches") returns HTTP 400 NDC-INT-TEC-A0001 on V1 but HTTP 409 NDC-INT-UNC-Z9999 (the unmapped catch-all code) on V2** Field: `Search error code for unsupported multi-city`. Expected: The same status and mapped ErrorCode on both versions (400 NDC-INT-TEC-A0001). **Impact:** V2 callers cannot distinguish a known business limitation from an unknown supplier failure Evidence: TC-AIEGY-EXP-01, TC-AIEGY-SRCH-SC-09
- **[TC-AIEGY-HOLD-NEG-01] BUG-11 (new) &mdash; Hold, BookAfterHold, PnrReprice, CancelAfterHold, Void, Upselling, FareCheck, FareRules and SeatAfterHold reject AirIndia with 409 OperationNotSupported and the context text "AirIndia does not exists" on V1 and V2, before any id is looked at. The unsupported-operation behaviour matches the supplier matrix (N/A) but the message reads like a missing-supplier registration error** Field: `Context[0].Value on OperationNotSupported`. Expected: 409 OperationNotSupported with a message such as "Hold is not supported for supplier AirIndia". **Impact:** Integrators and support read it as a configuration fault and may open false incidents; it also hides whether the supplier name is mapped correctly (compare the Indigo / ElJazeera name-mismatch bug in SPEC 4.5) Evidence: TC-AIEGY-UPSELLING/HOLD/PNRREPRICE/BOOKAFTERHOLD/CANCELAFTERHOLD/VOID/FARECHECK/FARERULES/SEATAFTERHOLD-NEG-01

### Unknown-resolutions

- **[TC-AIEGY-CAP-03]** AirIndia credential selectors on ne-3: EGY is active; UAE and KSA return 400 "The credentials for the selected supplier do not exist or are not active" with the same text on V1 and V2. Supplier name and selector matching ignore case and surrounding whitespace (airindia, AIRINDIA, " AirIndia", egy, "EGY " all accepted) Evidence: TC-AIEGY-CAP-03, TC-AIEGY-SRCH-SUP-03, TC-AIEGY-SRCH-CRED-03 (2026-11-02)
- **[TC-AIEGY-HOLD-NEG-01]** Live AirIndia capability on ne-3 (V1 and V2): Hold, BookAfterHold, FareConfirmAfterHold (PnrReprice), CancelAfterHold, Void, Upselling, FareCheck and FareRules are not supported (409 OperationNotSupported); SeatAfterHold likewise. FareConfirm, AddPassenger, GetAncillary, GetSeatMap, Book, GetOfferBundles and Retrieve are routed (id lookup reached). So only terminal Family A (Book then Retrieve) can ever run for AirIndia; Families B-F (Hold, Void, Cancel) cannot Evidence: The nine TC-AIEGY-*-NEG-01 cases; supplier matrix lists the same endpoints N/A
- **[TC-VERSIONDIFF-NEG-01]** Error baseline observed on ne-3: 400 camelCase code 1001 (model binding), 400 PascalCase NDC-INT-TEC-A0001 (business validation, inactive credentials, offer not found), 401 AuthenticationError ("Invalid authorization header") for an altered or missing x-api-key and for an altered Client-Id, 405 for GET/PUT/DELETE on Search, 409 OperationNotSupported, 409 NDC-INT-UNC-Z9999 (supplier timeout, multi-city on V2), 500 ServerError (V1 Book and V1 GetOfferBundles with unknown ids) Evidence: TC-VERSIONDIFF-NEG-01/02, TC-AIEGY-ENV-01, TC-AUTH-SEC-01/02, TC-AIEGY-SRCH-HTTP-01
- **[TC-SEARCH-NEG-03]** Search does not validate that an IATA code exists or is upper case: origin XXX and del return 200 with an empty offers[] on V1 and V2. A departure date of today or 2028-12-01, an unknown preferredAirlines value (XX), an extra unknown body field and a 2 MB body are all accepted (200). Duplicate segments and multi-city are rejected with 400 Evidence: TC-SEARCH-NEG-03, TC-AIEGY-SRCH-SC-07/SC-09, TC-AIEGY-SRCH-BODY-04/05, TC-AIEGY-EXP-04

## Proposed SPEC.md updates

- 4.6 Capability Summary Matrix (AirIndia row) &mdash; status: *pending*
  - **Old:** "| AirIndia | Unknown | Unknown | Unknown | Unknown | Unknown | Conditional (2 flags set) | Unknown |"
  - **New:** "| AirIndia | Unknown (GetOfferBundles reachable; no offers to test) | Not Supported (Upselling 409 OperationNotSupported, V1+V2, 2026-11-02) | Not Supported (CancelAfterHold 409) | Not Supported (Void 409) | Not Supported (Hold 409; matches the supplier matrix N/A) | Unknown (GetAncillary reachable; no offers to test) | Unknown (GetSeatMap reachable; the supplier matrix says N/A) |"
  - **Correction:** Credential selector EGY active (UAE and KSA inactive). Search returns no offers on any of 1,618 route/date searches on stg-ne-3 (BUG-01), so only the endpoint-level support could be confirmed. Only terminal Family A can apply to AirIndia.

## Cleanup / follow-up

Nothing left needing cleanup.

