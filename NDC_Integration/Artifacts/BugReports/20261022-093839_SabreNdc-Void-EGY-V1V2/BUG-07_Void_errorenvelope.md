# [V1][V2][SabreNdc][Void] – Error Envelope Inconsistent Across Void Failures (PascalCase vs camelCase, Generic Code for Business Rules)

## 📄 Description

Void failures use two different envelopes. Missing pnr/bookingToken, business-rule errors and the inactive selector return PascalCase `{Status, TransactionId, ErrorCode:"NDC-INT-TEC-A0001", ...}`. Missing supplier/credentialsSelector and a bad voidTickets item return camelCase `{status, transactionId, errorCode:"1001", context, originalSupplierRequest:null, originalSupplierResponse:null}`. Business-rule rejections (held booking, mismatched token, voided trip) reuse the generic "Invalid request. Please check the request parameters" validation code.

Found by: TC-VOID-NEG-05, QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. POST Void with `pnr` omitted -> 400 PascalCase NDC-INT-TEC-A0001.
2. POST Void with `supplier` omitted -> 400 camelCase errorCode "1001".
3. POST Void on a held booking -> 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided."

## ❌ Actual Result

```json
{ "status": 400, "transactionId": "15b4d403-...", "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [ { "name": "Supplier", "value": "Select a valid Supplier" } ], "originalSupplierRequest": null, "originalSupplierResponse": null }
```

Compare with { "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "Context": [ { "Name": "NotEmptyValidator", "Value": "PNR is required." } ] }.

## ✅ Expected Result

```json
{ "Status": 400, "TransactionId": "<guid>", "ErrorCode": "ValidationError", "ErrorMessage": "...", "Context": [ { "Name": "supplier", "Value": "Select a valid Supplier" } ] }
// business rules: { "Status": 409, "ErrorCode": "VoidNotEligible", ... }
```

SPEC.md §2.9 Expected Failure documents one standard envelope.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `15b4d403-7914-4273-88e1-fe6673a7e47b (camelCase example, V1)`

## 📊 Severity

**Low** — No functional break, but every client needs two error parsers and cannot tell a bad request from an ineligible booking.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "status": 400, "transactionId": "15b4d403-...", "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [ { "name": "Supplier", "value": "Select a valid Supplier" } ], "originalSupplierRequest": null, "originalSupplierResponse": null }
```

**Expected response (redacted):**

```json
{ "Status": 400, "TransactionId": "<guid>", "ErrorCode": "ValidationError", "ErrorMessage": "...", "Context": [ { "Name": "supplier", "Value": "Select a valid Supplier" } ] }
// business rules: { "Status": 409, "ErrorCode": "VoidNotEligible", ... }
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-VOID-NEG-05).

## 💥 Impact

Error handling in client SDKs becomes fragile. Messages like "check the request parameters" for a valid request on an ineligible booking send support down the wrong path.
