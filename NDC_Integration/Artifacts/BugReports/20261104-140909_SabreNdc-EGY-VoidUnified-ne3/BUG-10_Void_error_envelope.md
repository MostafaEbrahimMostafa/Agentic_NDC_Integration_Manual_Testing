# [V1/V2][SabreNdc][Void] – error envelope Returned in Two Different Shapes in Error Responses

## 📄 Description

Errors come back either in the PascalCase envelope (`Status, TransactionId, ErrorCode, ErrorMessage, Context`) or in a camelCase envelope (`status, transactionId, errorCode, errorMessage, context, originalSupplierRequest: null, originalSupplierResponse: null`), depending on the failing layer (validation errors and an unknown supplier use the camelCase one).

## 🔁 Steps to Reproduce

1. POST V2 Void with supplier "NoSuchSupplier" and credentialsSelector "EGY".
2. POST V2 AddPassenger with a passenger lacking name.first.
3. Compare the key casing with a Void on an unknown pnr.

## ❌ Actual Result

```json
{ "status": 400, "transactionId": "...", "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.", "context": [ ... ], "originalSupplierRequest": null, "originalSupplierResponse": null }
```

Clients must handle two envelope shapes; a case-sensitive parser misses the camelCase one.

## ✅ Expected Result

```json
{ "Status": 400, "TransactionId": "...", "ErrorCode": "...", "ErrorMessage": "...", "Context": [ ... ] }  // one casing
```

AC Consistency: one error shape for every supplier and layer (SPEC.md 7.11).

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Cosmetic for most consumers but forces two parsers.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "status": 400, "transactionId": "...", "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.", "context": [ ... ], "originalSupplierRequest": null, "originalSupplierResponse": null }
```

**Expected response (redacted):**

```json
{ "Status": 400, "TransactionId": "...", "ErrorCode": "...", "ErrorMessage": "...", "Context": [ ... ] }  // one casing
```

Test cases: TC-VOIDCAP-SEC-06 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Clients must handle two envelope shapes; a case-sensitive parser misses the camelCase one.
