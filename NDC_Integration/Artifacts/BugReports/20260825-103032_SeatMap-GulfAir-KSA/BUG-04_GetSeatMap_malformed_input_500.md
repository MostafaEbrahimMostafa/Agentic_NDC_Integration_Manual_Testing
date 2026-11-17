# [V2][GulfAir][GetSeatMap] – Malformed ResponseId/selectedOfferId Returns HTTP 500 Instead of HTTP 400

## 📄 Description

Submitting a syntactically-fabricated `ResponseId` (a random GUID) and a fabricated
`selectedOfferId` string to `GetSeatMap` produces a generic HTTP 500 `"ServerError"` /
`"Unknown error occured. Please keep the transaction id as a reference."` response, rather than a
controlled HTTP 400 validation error — indicating an unhandled exception on invalid-token
deserialization rather than proper input validation.

## 🔁 Steps to Reproduce

1. POST `GetSeatMap` with `supplier: "GulfAir"`, `credentialsSelector: "KSA"`, `ResponseId:
   "<random GUID>"`, `selectedOfferId: "FAKE-OFFER-ID-1234567890"`.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "da0c5cf4-0eaf-423b-a81e-07b6414c405d",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [{"name": "SelectedOfferId", "value": "The offer token could not be decoded."}]
}
```

(Matching the clean 400 validation-error shape this same endpoint already returns for missing
required fields, e.g. `TC-SEATMAP-NEG-04`'s omitted-field variants.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `da0c5cf4-0eaf-423b-a81e-07b6414c405d`

## 📊 Severity

**Low** — the request is still correctly rejected overall (no seat map leaked), so there is no
data-integrity or security consequence; the defect is purely in the HTTP status/error-shape
contract, which matters for client-side error handling (a 500 typically triggers retry logic a 400
would not).

## 📎 Evidence

**Actual response (redacted):**

```json
{"Status": 500, "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.", "Context": []}
```

**Expected response (redacted):**

```json
{"status": 400, "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request."}
```

## 💥 Impact

A client that treats HTTP 500 as a transient/retryable server fault (a common, reasonable default)
will retry a request that is deterministically invalid and will never succeed — wasting retry
budget and polluting server error logs/alerting with what is actually a client-side input error.
