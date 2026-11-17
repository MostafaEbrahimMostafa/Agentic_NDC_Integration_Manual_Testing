# [V1/V2][SabreNdc][Void] – OriginalSupplierRequest / OriginalSupplierResponse Exposed in Void Error Response

## 📄 Description

Void on an unknown order returns 409 NDC-INT-UNC-Z9999 whose body includes `OriginalSupplierRequest` and `OriginalSupplierResponse` with the raw supplier payloads. The same happens on AA Void supplier errors.

## 🔁 Steps to Reproduce

1. POST api/FlightBooking/Void (V1) or api/V2/FlightBooking/Void (V2) with SabreNdc/EGY, pnr "UNKNWN", gdsPNR "UNKNWN", bookingToken "unknown", surName "Ibrahim", voidTickets [].

## ❌ Actual Result

```json
HTTP 409 { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999", "Context": [ ... ], "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]", "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]" }
```

Supplier internals and identifiers are exposed to every client; the same leak was found in earlier SabreNdc and TravelportNdc runs.

## ✅ Expected Result

```json
{ "Status": 400/409, "TransactionId": "...", "ErrorCode": "...", "ErrorMessage": "...", "Context": [ ... ] }  // standard envelope only
```

SPEC.md 7.14: errors must not expose supplier request/response payloads.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — Raw supplier payloads are returned to API clients.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 409 { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999", "Context": [ ... ], "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]", "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]" }
```

**Expected response (redacted):**

```json
{ "Status": 400/409, "TransactionId": "...", "ErrorCode": "...", "ErrorMessage": "...", "Context": [ ... ] }  // standard envelope only
```

Test cases: TC-VOIDCAP-SEC-06 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Supplier internals and identifiers are exposed to every client; the same leak was found in earlier SabreNdc and TravelportNdc runs.
