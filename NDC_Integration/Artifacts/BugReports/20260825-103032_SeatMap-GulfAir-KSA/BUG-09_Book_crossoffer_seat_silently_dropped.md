# [V2][GulfAir][Book] – Cross-Offer cellId Silently Drops the Seat Selection Instead of Rejecting or Erroring

## 📄 Description

When `passengersSelectedSeats.<pax>.setSegmentsSeats.<seg>.cellId` references a cell from a
completely unrelated offer/segment (a different search, different route/date), `Book` neither
rejects the request nor books the seat — it silently drops the seat selection entirely.
`passengersSelectedSeats` comes back empty in the response, and the booking still succeeds and
tickets with no seat attached, with no warning of any kind.

## 🔁 Steps to Reproduce

1. Offer A: Search/FareConfirm/AddPassenger/GetSeatMap for BAH→JED 2026-11-01; record a `cellID`.
2. Offer B: Search/FareConfirm/AddPassenger/GetSeatMap for BAH→DMM 2026-11-05; record its own
   `cellCode`.
3. POST `Book` for Offer B with `passengersSelectedSeats.<pax>.setSegmentsSeats.<segB> = {cellCode:
   "<Offer B's cellCode>", cellId: "<Offer A's cellID>"}`.

## ❌ Actual Result

```json
{
  "pnr": "RYYMRX",
  "tickets": {"PAX1": {"ticketStatus": "Booked"}},
  "passengersSelectedSeats": {}
}
```

HTTP 200 — booking succeeds and tickets, but no seat is attached and no error/warning is returned.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "cellId does not belong to the offer/segment being booked."
}
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `pnr RYYMRX`

## 📊 Severity

**High** — silent data loss on a paid feature: a customer who selected and (in a real commercial
flow) potentially paid for a specific seat can end up with a ticketed booking and no seat at all,
with nothing in the response to explain why. This is functionally indistinguishable from any other
successful no-seat booking, so a caller cannot detect the failure without independently re-checking
`passengersSelectedSeats` against what it originally submitted.

## 📎 Evidence

**Actual response (redacted):**

```json
{"pnr": "RYYMRX", "tickets": {"PAX1": {"ticketStatus": "Booked"}}, "passengersSelectedSeats": {}}
```

**Expected response (redacted):**

```json
{"status": 400, "errorCode": "ValidationError", "errorMessage": "cellId/offer mismatch"}
```

## 💥 Impact

Combined with BUG-07/BUG-08, this establishes a three-way inconsistency in how `Book` handles an
invalid `cellId`: a same-offer mismatch is silently *honored* via `cellCode` (BUG-08), a tampered
token is silently *honored* (BUG-07), but a genuinely cross-offer token is silently *dropped*
(this bug) — none of the three paths produces the clean rejection the field's own documentation
implies should exist. Any caller relying on Book to fail loudly when seat selection goes wrong will
be surprised by silent, undetectable data loss specifically in the cross-offer case.
