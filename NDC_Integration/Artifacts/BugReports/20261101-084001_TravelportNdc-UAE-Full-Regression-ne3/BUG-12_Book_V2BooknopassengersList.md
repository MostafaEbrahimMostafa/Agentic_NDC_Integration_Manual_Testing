# [V2][TravelportNdc][Book] – V2 Book (no passengersList) Without AddPassenger Returns HTTP 500 ServerError Instead of a Validation Error

## 📄 Description

V2 Book called with the FareConfirm ids and no preceding AddPassenger returns HTTP 500 `ServerError`.

Recurrence of BUG-12 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01 by TC-TPNREG-BOOK-01). Occurrence 3.

Found by: TC-TPNREG-BOOK-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V2 Search (QR DOH-DXB, 1 ADT).
2. V2 FareConfirm.
3. POST api/v2/FlightBooking/Book with ResponseId and selectedOfferId from FareConfirm, no AddPassenger.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "ceedf919-670c-4f2d-a25a-f572cc815318",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

V2 Search > FareConfirm > Book with the FareConfirm ids: 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [ { "Value": "Passenger details are missing: call AddPassenger first" } ]
}
```

SPEC.md 1.10 / 2.5: V2 Book expects the AddPassenger ids.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `ceedf919-670c-4f2d-a25a-f572cc815318`

## 📊 Severity

**Medium** — No booking is created, but the caller gets an opaque 500 for a client mistake.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "ceedf919-670c-4f2d-a25a-f572cc815318",
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
  "Context": [ { "Value": "Passenger details are missing: call AddPassenger first" } ]
}
```

## 💥 Impact

Clients that skip AddPassenger get no actionable error. A client that skips AddPassenger gets an opaque 500 with no cause
