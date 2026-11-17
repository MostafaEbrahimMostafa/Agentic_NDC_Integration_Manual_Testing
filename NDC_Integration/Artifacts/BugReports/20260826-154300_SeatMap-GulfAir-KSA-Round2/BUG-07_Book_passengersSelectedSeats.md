# [V2][GulfAir][Book] – passengersSelectedSeats Silently Dropped Instead of Rejected for Cross-Offer cellId

## 📄 Description

When `passengersSelectedSeats.<pax>.setSegmentsSeats.<seg>.cellId` refers to a cell from a genuinely
different, unrelated offer/segment (obtained from an independent `GetSeatMap` chain), `Book` neither
rejects the request nor honors the seat selection — the booking succeeds and tickets, but
`passengersSelectedSeats` in the response comes back completely empty (`{}`), silently discarding the
selection with no error anywhere in the response. Second-run reproduction of a Round 1 (2026-08-25)
finding, unchanged one day later.

## 🔁 Steps to Reproduce

1. Chain A: `AddPassenger` → `GetSeatMap` for BAH-CAI 2026-10-23 → record a cell's `cellID`.
2. Chain B: `AddPassenger` → `GetSeatMap` for a fresh, unrelated offer (BAH-DMM 2026-11-15) → record
   its own `cellCode`.
3. `Book` for Chain B's offer with `cellCode=<Chain B's own cellCode>` but
   `cellId=<Chain A's unrelated cellID>`.

## ❌ Actual Result

```json
"passengersSelectedSeats": {}
```

HTTP 200, `pnr` created and ticketed, but the seat selection vanishes entirely — no error, no
warning, no partial-success indicator.

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "ValidationError", "ErrorMessage": "cellId does not belong to the requested offer." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 responses carry no TransactionId/error envelope)

## 📊 Severity

**Critical** — a traveler who believes they paid for and selected a specific seat can be ticketed
with **no seat attached at all**, and no error message anywhere in the response to explain why. This
is a silent, invisible loss of a paid selection with direct customer/billing impact, not merely a
validation-hygiene issue.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "PBJRZR", "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722136278165" } }, "passengersSelectedSeats": {} }
```

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "ValidationError", "ErrorMessage": "cellId does not belong to the requested offer." }
```

## 💥 Impact

A real GulfAir PNR (`PBJRZR`) was created and ticketed purely to demonstrate this defect and needs
manual void/cancel follow-up. This is distinct from — and more severe than — BUG-06's same-offer
`cellCode`/`cellId` mismatch (which at least attaches *some* seat): here the customer ends up with
**no seat and no explanation**, while the booking otherwise proceeds and is billed as if seat
selection succeeded.
