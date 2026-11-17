# [V1/V2][SabreNdc][Void] – error envelope Returned in Two Different Shapes in Error Responses

## 📄 Description

Errors come back either in the PascalCase envelope (`Status, TransactionId, ErrorCode, ErrorMessage, Context`) or in a camelCase envelope (`status, transactionId, errorCode, errorMessage, context, originalSupplierRequest: null, originalSupplierResponse: null`), depending on the failing layer (validation errors and an unknown supplier use the camelCase one).

**Round 2 (2026-11-05):** Recurrence of BUG-10, 2nd confirmed occurrence (first filed in Round 1, 2026-11-04). Both envelope casings seen again: the unknown-supplier 400 uses the camelCase envelope (status, transactionId, errorCode, ..., originalSupplierRequest: null), every other error uses PascalCase (PascalCase 609, camelCase 6 error bodies in this round).

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

Test cases: TC-VOIDCAP-SEC-06 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_Void_NoSuchSupplier_camelCase_envelope_request.json` / `01_V1_Void_NoSuchSupplier_camelCase_envelope_response.json` — V1 Void NoSuchSupplier (camelCase envelope), `api/FlightBooking/Void`, HTTP 400
- `02_V2_Void_NoSuchSupplier_camelCase_envelope_request.json` / `02_V2_Void_NoSuchSupplier_camelCase_envelope_response.json` — V2 Void NoSuchSupplier (camelCase envelope), `api/V2/FlightBooking/Void`, HTTP 400
- `03_V1_Void_unknown_order_PascalCase_envelope_request.json` / `03_V1_Void_unknown_order_PascalCase_envelope_response.json` — V1 Void unknown order (PascalCase envelope), `api/FlightBooking/Void`, HTTP 409
- `04_V2_Void_unknown_order_PascalCase_envelope_request.json` / `04_V2_Void_unknown_order_PascalCase_envelope_response.json` — V2 Void unknown order (PascalCase envelope), `api/V2/FlightBooking/Void`, HTTP 409
- `05_V1_Void_without_pnr_PascalCase_envelope_request.json` / `05_V1_Void_without_pnr_PascalCase_envelope_response.json` — V1 Void without pnr (PascalCase envelope), `api/FlightBooking/Void`, HTTP 400
- `06_V2_Void_without_pnr_PascalCase_envelope_request.json` / `06_V2_Void_without_pnr_PascalCase_envelope_response.json` — V2 Void without pnr (PascalCase envelope), `api/V2/FlightBooking/Void`, HTTP 400

## 💥 Impact

Clients must handle two envelope shapes; a case-sensitive parser misses the camelCase one.
