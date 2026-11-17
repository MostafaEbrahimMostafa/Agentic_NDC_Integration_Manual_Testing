# [V2][TravelportNdc][Book] – Book Without AddPassenger Returns HTTP 500 ServerError Instead of a Validation Error

## 📄 Description

V2 Book called with the Upselling `ResponseId` and `selectedOfferId` and no AddPassenger step returns HTTP 500 `ServerError` with an empty Context instead of a 400 naming the missing passenger details.

Recurrence of BUG-12 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`); also resolves the flow.md anomaly (flows 72-89 omit AddPassenger).

Found by: FLOW-V2-74-TPN, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V2 Search CAI-JED 2026-11-12, 1 ADT, TravelportNdc/UAE.
2. POST `api/v2/FlightSearch/UpSelling` with ResponseId from Search and a selectedOfferId.
3. POST `api/v2/FlightBooking/Book` with `{supplier, credentialsSelector, ResponseId: <Upselling responseId>, selectedOfferId: <upsellOffers[0].offerId>}` (no AddPassenger).

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "66e6198a-2027-416c-a004-619929c89236",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

HTTP 500 in 1.0s.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "Passenger details are required: call AddPassengerDetails first"
    }
  ]
}
```

SPEC.md 2.9 / 5.5: V2 Book expects the AddPassenger ids; a missing precondition must be a 4xx validation error, not a server error.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `66e6198a-2027-416c-a004-619929c89236`

## 📊 Severity

**Medium** — No booking is created and the caller gets no usable message, but the failure is a 500 for a client mistake.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "66e6198a-2027-416c-a004-619929c89236",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (FLOW-V2-74-TPN).

## 💥 Impact

A client following flow.md for flows 72-89 hits an opaque 500 and cannot tell what is missing.
