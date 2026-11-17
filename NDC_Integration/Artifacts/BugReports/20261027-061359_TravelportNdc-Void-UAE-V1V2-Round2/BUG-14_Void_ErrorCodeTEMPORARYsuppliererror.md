# [V2][TravelportNdc][Void] – Transient Emirates Errors Returned as Unmapped 409 Z9999 With the Raw Supplier Reply and No Retry Signal

## 📄 Description

Twice within an hour a transient Emirates-side condition surfaced as the generic unmapped `409 NDC-INT-UNC-Z9999`: Void returned "RESERVATION RETRIEVE FAILED DUE TO A RESERVATION UPDATE IN PROGRESS. RETRY RESERVATION RETRIEVE (AIRLINE EK)" (the identical request succeeded when resent), and BookAfterHold returned "DOCUMENT ISSUANCE FAILED. NO RESPONSE RECEIVED FROM VENDOR (AIRLINE EK)" (the hold stayed live and was cancelled). Both bodies carry the raw supplier response and nothing tells the caller the condition is retryable. New in Round 2.

Found by: FLOW-V2-76-TPN, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V2 Search, UpSelling, AddPassenger, Hold, PnrReprice, Retrieve, BookAfterHold, Retrieve (1 ADT, Emirates offer, 1985 AED): pnr FGJ5BB, gdsPNR HNGL45.
2. POST `api/V2/FlightBooking/Void` immediately after the Retrieve: 409 TEMPORARY. Resend the same request ~16 seconds later: 200 voided:true.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "ed81a7bb-64de-4f1e-8648-8d699fa3b6cb",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "TEMPORARY",
      "Value": "RESERVATION RETRIEVE FAILED DUE TO A RESERVATION UPDATE IN PROGRESS. RETRY RESERVATION RETRIEVE (AIRLINE EK)"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
// BookAfterHold, second attempt:
{
  "Status": 409,
  "TransactionId": "7a3e7555-ea44-43ef-8208-ed5a4eb15bf8",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "PROCESS",
      "Value": "NDC integration error:Booking is still in the hold stage. No...[truncated]"
    }
  ],
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

Raw supplier payloads redacted per SPEC.md 7.14.

## ✅ Expected Result

```json
{
  "Status": 503,
  "ErrorCode": "NDC-INT-SUP-RETRY",
  "ErrorMessage": "The supplier is temporarily unable to process the request. Retry shortly.",
  "Context": [
    {
      "Name": "RetryAfterSeconds",
      "Value": "15"
    }
  ]
}
```

AC Error Handling: supplier errors are normalised; a retryable supplier condition should be distinguishable from a business refusal. The exact code is for the dev team to choose.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `ed81a7bb-64de-4f1e-8648-8d699fa3b6cb`

## 📊 Severity

**Medium** — Intermittent and recoverable (the Void retry succeeded), but a failed BookAfterHold left a live hold that needed manual cancellation.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "ed81a7bb-64de-4f1e-8648-8d699fa3b6cb",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "TEMPORARY",
      "Value": "RESERVATION RETRIEVE FAILED DUE TO A RESERVATION UPDATE IN PROGRESS. RETRY RESERVATION RETRIEVE (AIRLINE EK)"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
{
  "Status": 503,
  "ErrorCode": "<retryable code>"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (FLOW-V2-76-TPN).

## 💥 Impact

Clients cannot tell a safe retry from a refusal and may either give up on a void that would succeed or retry a ticketing call that leaves a hold behind.
