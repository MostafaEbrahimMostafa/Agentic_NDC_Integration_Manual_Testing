# [V2][GulfAir][Book] – ResponseId Not Enforced as a Required Field Despite Documentation

## 📄 Description

`Book`'s documented Required Request Fields table (V2) names `ResponseId` as required. Omitting
`supplier` or `credentialsSelector` each correctly produces a clean HTTP 400 validation error, but
omitting `ResponseId` from a `Book` call still succeeds — HTTP 200, a real PNR is created, and the
booking is ticketed.

## 🔁 Steps to Reproduce

1. GetSeatMap completed for a GulfAir/KSA offer; a valid `cellCode`/`cellId` recorded.
2. POST `Book` with `supplier`, `credentialsSelector`, `selectedOfferId`, and
   `passengersSelectedSeats` all present and valid, but `ResponseId` omitted entirely.

## ❌ Actual Result

```json
{
  "supplier": "GulfAir",
  "pnr": "PABPSZ",
  "bookingToken": "TPC60517142259D2582026",
  "tickets": {"PAX1": {"ticketStatus": "Booked"}}
}
```

HTTP 200, real PNR created and ticketed.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}]
}
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Medium** — unlike the read-only GetSeatMap equivalent (BUG-05), this gap is on the
booking/ticketing endpoint itself: a documented-required identity field is silently unenforced on
the single highest-blast-radius action in the API (real PNR/ticket creation).

## 📎 Evidence

**Actual response (redacted):**

```json
{"supplier": "GulfAir", "pnr": "PABPSZ", "tickets": {"PAX1": {"ticketStatus": "Booked"}}}
```

**Expected response (redacted):**

```json
{"status": 400, "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.", "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}]}
```

## 💥 Impact

Confirms the `ResponseId`-not-enforced pattern (BUG-05) extends across at least two endpoints in the
chain — `selectedOfferId` alone is apparently sufficient to Book and ticket a GulfAir flight,
meaning `ResponseId` provides no real integrity guarantee on the booking path either, despite being
documented as required.
