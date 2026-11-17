# [V2][TravelportNdc][Book] – Book Without AddPassenger Returns HTTP 500 ServerError Instead of a Validation Error

## 📄 Description

On V2, calling Book straight after Upselling (no AddPassenger step) fails with an unhandled HTTP 500. Found while resolving the flow.md anomaly for flows 74/76. The flows work once AddPassenger is inserted.

Found by: FLOW-V2-74-TPN, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Search (TravelportNdc/UAE, CAI-JED 2026-11-12, 1 ADT).
2. V2 UpSelling on the first offer: 1 tier (1815 AED).
3. POST `api/v2/FlightBooking/Book` with `ResponseId` = the Upselling responseId and `selectedOfferId` = upsellOffers[0].offerId (no AddPassenger).

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "12fc86ad-5a49-43b1-9408-2d163dd409c0",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

HTTP 500 in 1.2s; no booking was created.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "Passenger details are required: call AddPassenger first"
    }
  ]
}
```

SPEC.md §5.5 items 4-5 and §2.9: a missing prerequisite must be a handled 4xx, never a 500.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `12fc86ad-5a49-43b1-9408-2d163dd409c0 (TransactionId)`

## 📊 Severity

**Medium** — Non-blocking for correct flows, but a client following flow.md (which omits AddPassenger for flows 72-89) gets an opaque 500.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "12fc86ad-5a49-43b1-9408-2d163dd409c0",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "Passenger details are required: call AddPassenger first"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (FLOW-V2-74-TPN).

## 💥 Impact

An unhandled exception gives callers no way to tell the call order is wrong; it also hides the AddPassenger requirement that flow.md leaves out.
