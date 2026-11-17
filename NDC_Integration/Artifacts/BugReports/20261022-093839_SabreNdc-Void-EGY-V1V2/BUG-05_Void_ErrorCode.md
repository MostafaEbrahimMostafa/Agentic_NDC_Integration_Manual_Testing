# [V1][V2][SabreNdc][Void] – Unknown Order Returns Unmapped NDC-INT-UNC-Z9999 and the Raw Sabre Payload in Void Response

## 📄 Description

Voiding a non-existent SabreNdc order returns 409 with the catch-all code `NDC-INT-UNC-Z9999`, the same code repeated as `ErrorMessage`, Sabre's own error code in `Context`, and the raw Sabre request/response in `OriginalSupplierRequest` / `OriginalSupplierResponse`.

Found by: TC-VOID-NEG-01 (also TC-VOID-VAL-06), QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. POST Void (V1 or V2): SabreNdc/EGY, pnr "ZZZZZZ", gdsPNR "ZZZZZZ", bookingToken "1SXXXZZZZZZZZ", surName "Test", voidTickets [].

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "903b824c-d3d4-4aa7-a11c-f5af99793103",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [ { "Name": "060004", "Value": "Order not found: orderId=[1SXXXZZZZZZZZ]" } ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

Same on V2 (TransactionId f42c2c1d-d386-4938-a0bc-ae4688d24b34).

## ✅ Expected Result

```json
{
  "Status": 404,
  "ErrorCode": "BookingNotFound",
  "ErrorMessage": "No booking found for the supplied PNR / booking token",
  "Context": [ { "Name": "pnr", "Value": "ZZZZZZ" } ]
}
```

SPEC.md §7.9/§7.14: supplier errors must be normalized and raw supplier payloads must not be returned.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `903b824c-d3d4-4aa7-a11c-f5af99793103 (V1), f42c2c1d-d386-4938-a0bc-ae4688d24b34 (V2)`

## 📊 Severity

**Medium** — Error-path only, but it exposes supplier internals and gives callers no actionable code.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "903b824c-d3d4-4aa7-a11c-f5af99793103",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [ { "Name": "060004", "Value": "Order not found: orderId=[1SXXXZZZZZZZZ]" } ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
{
  "Status": 404,
  "ErrorCode": "BookingNotFound",
  "ErrorMessage": "No booking found for the supplied PNR / booking token",
  "Context": [ { "Name": "pnr", "Value": "ZZZZZZ" } ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-VOID-NEG-01).

## 💥 Impact

Clients cannot tell "booking not found" from any other unexpected failure, and supplier request/response bodies are exposed to every API consumer.
