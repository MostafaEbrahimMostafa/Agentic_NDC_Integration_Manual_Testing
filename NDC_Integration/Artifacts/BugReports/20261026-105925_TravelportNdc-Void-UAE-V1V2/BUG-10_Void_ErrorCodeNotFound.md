# [V2][TravelportNdc][Void] – ErrorCode Returned as Unmapped NDC-INT-UNC-Z9999 With Raw Travelport Reply for an Unknown PNR

## 📄 Description

Void for a record locator Travelport does not know returns 409 with the generic unmapped code `NDC-INT-UNC-Z9999`, an `ErrorMessage` that merely repeats the code, and `OriginalSupplierRequest`/`OriginalSupplierResponse` echoing the raw Travelport reply. Same family as SabreNdc BUG-05 (2026-10-22).

Found by: TC-VOIDTPN-NEG-01, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. POST `api/V2/FlightBooking/Void` with supplier TravelportNdc, credentialsSelector UAE, pnr "ZZZZZZ", gdsPNR "ZZZZZZ", a random bookingToken, surName "Test", voidTickets [].

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "56c05e57-6eb4-4b07-99b1-1901ddd1439d",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "RECORD LOCATOR DOES NOT EXIST"
    }
  ],
  "OriginalSupplierRequest": "ZZZZZZ",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

HTTP 409 in 0.9s.

## ✅ Expected Result

```json
{
  "Status": 404,
  "ErrorCode": "BookingNotFound",
  "ErrorMessage": "No booking found for the supplied PNR",
  "Context": [
    {
      "Name": "pnr",
      "Value": "ZZZZZZ"
    }
  ]
}
```

AC Error Handling / SPEC.md §7.9: supplier errors are normalised to a meaningful mapped code, and the raw supplier request/response is not exposed (§7.14).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `56c05e57-6eb4-4b07-99b1-1901ddd1439d (TransactionId)`

## 📊 Severity

**Medium** — Callers cannot detect "booking not found" and raw supplier internals are returned.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "56c05e57-6eb4-4b07-99b1-1901ddd1439d",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "RECORD LOCATOR DOES NOT EXIST"
    }
  ],
  "OriginalSupplierRequest": "ZZZZZZ",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
{
  "Status": 404,
  "ErrorCode": "BookingNotFound",
  "ErrorMessage": "No booking found for the supplied PNR",
  "Context": [
    {
      "Name": "pnr",
      "Value": "ZZZZZZ"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-NEG-01).

## 💥 Impact

Clients cannot distinguish a wrong record locator from any other supplier failure, and supplier traffic is exposed in the API reply.
