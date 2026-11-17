# [V1 and V2][TravelportNdc][Void] – ErrorCode Returned as Unmapped NDC-INT-UNC-Z9999 With the Raw Travelport Reply for an Unknown PNR

## 📄 Description

Voiding a record locator that does not exist returns HTTP 409 with the generic unmapped code `NDC-INT-UNC-Z9999`, an `ErrorMessage` that merely repeats the code, and the raw Travelport request and response. There is no "booking not found" code or message. Same on V1 and V2.

Recurrence of BUG-10 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`) and of SabreNdc 2026-10-22.

Found by: TC-VOIDTPN-NEG-01, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. POST `api/V2/FlightBooking/Void` (or the V1 path) with supplier TravelportNdc, credentialsSelector UAE, pnr ZZZZZZ, gdsPNR ZZZZZZ, bookingToken 11111111-2222-3333-4444-555555555555, surName Test, voidTickets [].

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "7fbb7e04-b267-4113-90f6-e1bf5e772e5f",
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

HTTP 409 in 0.8s; OriginalSupplierResponse is redacted here per SPEC.md 7.14.

## ✅ Expected Result

```json
{
  "Status": 404,
  "ErrorCode": "NDC-INT-BYP-A0002",
  "ErrorMessage": "Booking not found.",
  "Context": [
    {
      "Name": "RecordLocator",
      "Value": "ZZZZZZ"
    }
  ]
}
```

AC Error Handling: supplier errors are normalised to the standard envelope with a meaningful code and message (SPEC.md 2.15, 7.9). The exact code is for the dev team to choose; the requirement is a distinct "not found" code and no raw payload.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `7fbb7e04-b267-4113-90f6-e1bf5e772e5f`

## 📊 Severity

**Medium** — Non-blocking, but clients cannot branch on the code: the same Z9999 is returned for a held booking, a wrong selector and a cancelled Emirates booking.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "7fbb7e04-b267-4113-90f6-e1bf5e772e5f",
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
  "ErrorCode": "NDC-INT-BYP-A0002",
  "ErrorMessage": "Booking not found."
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-NEG-01).

## 💥 Impact

Consumers cannot tell "booking not found" from other Z9999 conditions and see the supplier's raw reply.
