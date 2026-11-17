# [V2][GulfAir][Book] – passengersSelectedSeats Silently Dropped Instead of Rejected for Cross-Offer cellId

## 📄 Description

When `passengersSelectedSeats.cellId` refers to a cell on a completely different offer than the one
being booked, `Book` neither rejects the request nor honors the seat — it silently drops the seat
selection entirely (`passengersSelectedSeats` comes back as an empty object `{}`) while still
creating and ticketing the booking. This is the **7th consecutive round** this defect has
reproduced for GulfAir/KSA, and the **2nd time reproduced against the current default staging host**
(`ndc-integration-stg-ne-3.azurewebsites.net`) after Round 6 first confirmed it there.

## 🔁 Steps to Reproduce

1. Chain A: `Search` → `FareConfirm` → `AddPassenger` → `GetSeatMap` for GulfAir/KSA offer A
   (BAH-RUH, 2027-06-10, 1 ADT). Record `cellID_A` (cell `8B`, cellCode `8B`).
2. Chain B: `Search` → `FareConfirm` → `AddPassenger` → `GetSeatMap` for GulfAir/KSA offer B
   (BAH-JED, 2027-06-13, unrelated, 2 ADT). Obtain `getSeatMapResponceID_B`/`getSeatMapOfferId_B`
   and offer B's own valid `cellCode_B` (`8A`).
3. `Book` using Chain B's `ResponseId`/`selectedOfferId`, but `passengersSelectedSeats.PAX1.
   setSegmentsSeats.<seg>` = `{cellCode: cellCode_B, cellId: cellID_A}`.

## ❌ Actual Result

```json
{ "pnr": "QCHUJQ", "gdsPNR": "", "passengersSelectedSeats": {}, "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": {"amount": 0, "currency": "SAR"} } } }
```

HTTP 200 — the booking is created and ticketed with no seat attached and no seat fee charged, and
no error/warning field anywhere in the response indicates that the requested seat selection was
rejected or dropped.

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "ValidationError", "errorMessage": "The provided cellId does not belong to the requested offer." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/` (STAG_ENV default host)
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**High** — the customer is booked and ticketed **without** their selected/paid-for seat and given
**no error at all** explaining why. This is a silent-failure defect against a customer-facing
feature, worse than an outright rejection would be.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "QCHUJQ", "passengersSelectedSeats": {} }
```

**Expected response (redacted):** `{ "status": 400, "errorCode": "ValidationError" }`

## 💥 Impact

Confirmed unchanged across Round 1 (pnr RYYMRX), Round 2 (pnr PBJRZR), Round 3 (pnr RUTDHF), not
re-verified Round 4 (blocked by BUG-14), Round 5 (pnr RUNKLG, `ne-2` host), Round 6 (pnr TVJNGU,
first confirmation on the `ne-3` host), and now this Round 7 targeted re-verification (pnr QCHUJQ,
BAH-JED 2027-06-13, `ne-3` host) — every round that could test it produces a real, ticketed booking
with the seat selection silently vanished, no warning surfaced anywhere in the response. A real
customer using this flow would believe their seat request was processed and only discover otherwise
at the airport. Recommend either rejecting the request outright (preferred, consistent with
`BUG-01`'s finding that `ResponseId`/`selectedOfferId` cross-validation is also missing at
`GetSeatMap`) or, at minimum, surfacing a warning/error field in the Book response when a requested
seat is dropped.
