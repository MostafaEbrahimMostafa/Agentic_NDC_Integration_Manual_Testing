# [V1 and V2][TravelportNdc][Void] – Error Envelope Inconsistent: Two Casings, Unmapped Z9999 and Two Codes for "Reservation Cancelled"

## 📄 Description

Void failures do not use one envelope. Missing pnr/gdsPNR and inactive credentials return PascalCase `{Status, ErrorCode: "NDC-INT-TEC-A0001"}`; missing supplier/credentialsSelector, over-long pnr and wrong-type or null voidTickets return camelCase `{status, errorCode: "1001"}`; unknown PNR, a Void under another credential set and a cancelled Emirates booking return the unmapped 409 `NDC-INT-UNC-Z9999` whose ErrorMessage is the code itself; the same business condition "reservation cancelled" returns `NDC-INT-BYP-A0003` for Qatar Airways but `NDC-INT-UNC-Z9999` (Context ReservationCancelled) for Emirates. Same pattern as SabreNdc BUG-07.

Found by: TC-VOIDTPN-NEG-05, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Void with pnr omitted (400 PascalCase), with supplier omitted (400 camelCase "1001"), repeated on a voided QR booking (409 BYP-A0003), then Retrieve a voided EK booking (409 Z9999).

## ❌ Actual Result

```json
[
  {
    "Status": 400,
    "ErrorCode": "NDC-INT-TEC-A0001",
    "Context": [
      {
        "Name": "PredicateValidator",
        "Value": "PNR is required"
      }
    ]
  },
  {
    "status": 400,
    "errorCode": "1001",
    "context": [
      {
        "name": "Supplier",
        "value": "Select a valid Supplier"
      }
    ]
  },
  {
    "Status": 409,
    "ErrorCode": "NDC-INT-BYP-A0003",
    "ErrorMessage": "Reservation is already cancelled."
  },
  {
    "Status": 409,
    "ErrorCode": "NDC-INT-UNC-Z9999",
    "ErrorMessage": "NDC-INT-UNC-Z9999",
    "Context": [
      {
        "Name": "ReservationCancelled",
        "Value": "Reservation is already cancelled"
      }
    ]
  }
]
```

Status always equals the HTTP code and TransactionId is always a GUID.

## ✅ Expected Result

```json
{
  "Status": 409,
  "TransactionId": "<guid>",
  "ErrorCode": "ReservationCancelled",
  "ErrorMessage": "Reservation is already cancelled.",
  "Context": []
}
```

AC Error Handling / AC Result Mapping: one {Status, TransactionId, ErrorCode, ErrorMessage, Context} envelope everywhere, one code per business condition, a readable ErrorMessage on every error.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Clients need two error parsers and cannot reliably detect the cancelled or not-found state.

## 📎 Evidence

**Actual response (redacted):**

```json
[
  {
    "Status": 400,
    "ErrorCode": "NDC-INT-TEC-A0001",
    "Context": [
      {
        "Name": "PredicateValidator",
        "Value": "PNR is required"
      }
    ]
  },
  {
    "status": 400,
    "errorCode": "1001",
    "context": [
      {
        "name": "Supplier",
        "value": "Select a valid Supplier"
      }
    ]
  },
  {
    "Status": 409,
    "ErrorCode": "NDC-INT-BYP-A0003",
    "ErrorMessage": "Reservation is already cancelled."
  },
  {
    "Status": 409,
    "ErrorCode": "NDC-INT-UNC-Z9999",
    "ErrorMessage": "NDC-INT-UNC-Z9999",
    "Context": [
      {
        "Name": "ReservationCancelled",
        "Value": "Reservation is already cancelled"
      }
    ]
  }
]
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "<guid>",
  "ErrorCode": "ReservationCancelled",
  "ErrorMessage": "Reservation is already cancelled.",
  "Context": []
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-NEG-05).

## 💥 Impact

Error handling must be written twice, and "already cancelled" (the only post-Void signal) needs carrier-specific handling.
