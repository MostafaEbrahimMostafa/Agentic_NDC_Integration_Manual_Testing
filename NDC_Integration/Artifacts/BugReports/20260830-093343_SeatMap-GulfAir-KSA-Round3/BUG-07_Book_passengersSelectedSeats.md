# [V2][GulfAir][Book] – passengersSelectedSeats Silently Dropped Instead of Rejected for Cross-Offer cellId

## 📄 Description

When `passengersSelectedSeats.cellId` refers to a cell on a completely different offer than the one
being booked, `Book` neither rejects the request nor honors the seat — it silently drops the seat
selection entirely (`passengersSelectedSeats` comes back as an empty object `{}`) while still
creating and ticketing the booking. This is the **3rd consecutive round** this defect has
reproduced, re-verified this round with a corrected test-harness passenger reference to rule out a
false positive.

## 🔁 Steps to Reproduce

1. Chain A: `AddPassenger` → `GetSeatMap` for GulfAir/KSA offer A (BAH-RUH). Record `cellID_A`.
2. Chain B: `AddPassenger` → `GetSeatMap` for GulfAir/KSA offer B (BAH-JED, unrelated). Obtain
   `getSeatMapResponceID_B`/`getSeatMapOfferId_B` and offer B's own `cellCode_B`.
3. `Book` using Chain B's `ResponseId`/`selectedOfferId`, but `passengersSelectedSeats.PAX1.
   setSegmentsSeats.<seg>` = `{cellCode: cellCode_B, cellId: cellID_A}`.

## ❌ Actual Result

```json
{ "pnr": "RUTDHF", "passengersSelectedSeats": {}, "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": null } } }
```

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "ValidationError", "errorMessage": "The provided cellId does not belong to the requested offer." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**High** — the customer is booked and ticketed **without** their selected/paid-for seat and given
**no error at all** explaining why. This is a silent-failure defect against a customer-facing
feature, worse than an outright rejection would be.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "RUTDHF", "passengersSelectedSeats": {} }
```

**Expected response (redacted):** `{ "status": 400, "errorCode": "ValidationError" }`

## 💥 Impact

Confirmed unchanged across Round 1 (pnr RYYMRX), Round 2 (pnr PBJRZR), and Round 3 (pnr RUTDHF) —
every round produces a real, ticketed booking with the seat selection silently vanished, no warning
surfaced anywhere in the response. A real customer using this flow would believe their seat request
was processed and only discover otherwise at the airport. Recommend either rejecting the request
outright (preferred, consistent with the token appearing to embed offer-bound metadata) or, at
minimum, surfacing a warning/error field in the Book response when a requested seat is dropped.
