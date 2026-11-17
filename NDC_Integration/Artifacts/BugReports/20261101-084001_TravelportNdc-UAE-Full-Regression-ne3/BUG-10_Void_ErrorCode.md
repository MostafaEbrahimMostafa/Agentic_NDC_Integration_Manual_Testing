# [V1 and V2][TravelportNdc][Void] – ErrorCode Returned as Unmapped NDC-INT-UNC-Z9999 With the Raw Travelport Reply for an Unknown PNR

## 📄 Description

Void of a PNR that does not exist returns 409 `NDC-INT-UNC-Z9999` with the raw supplier request/response instead of a mapped "booking not found" error.

Recurrence of BUG-10 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01). Occurrence 3.

Found by: TC-VOIDTPN-NEG-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. POST Void on V1 or V2 with pnr ZZZZZZ, gdsPNR ZZZZZZ, a zero bookingToken and surName Test.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "e2a82592-fd85-4de9-b858-d4106ed3e6f5",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "RECORD LOCATOR DOES NOT EXIST"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

V1 and V2 Void with pnr ZZZZZZ: ErrorCode NDC-INT-UNC-Z9999, OriginalSupplierRequest/Response present

## ✅ Expected Result

```json
{
  "Status": 404,
  "ErrorCode": "<mapped booking-not-found code>",
  "ErrorMessage": "Booking not found"
}
```

SPEC.md 2.15 / 7.9; TC-VOIDTPN-NEG-01.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `e2a82592-fd85-4de9-b858-d4106ed3e6f5`

## 📊 Severity

**Medium** — The failure is handled (409) but cannot be told apart from other supplier errors and leaks the raw reply.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "e2a82592-fd85-4de9-b858-d4106ed3e6f5",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "RECORD LOCATOR DOES NOT EXIST"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
{
  "Status": 404,
  "ErrorCode": "<mapped booking-not-found code>",
  "ErrorMessage": "Booking not found"
}
```

## 💥 Impact

Clients cannot branch on "not found"; the raw reply is exposed. The unknown-PNR condition cannot be told apart from other Z9999 supplier errors
