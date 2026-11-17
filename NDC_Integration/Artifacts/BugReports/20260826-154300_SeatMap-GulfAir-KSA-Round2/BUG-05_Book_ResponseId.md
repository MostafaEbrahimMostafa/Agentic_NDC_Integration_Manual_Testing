# [V2][GulfAir][Book] – ResponseId Not Enforced as Required in Book Request

## 📄 Description

`Book` documents `ResponseId` as a required request field (SPEC.md §2.9), but a request omitting it
entirely still succeeds — creating and ticketing a real GulfAir PNR — using `selectedOfferId` alone.
Separately, omitting `selectedOfferId` produces a generic, unhandled-exception-shaped HTTP 500
instead of a clean 400. Second-run reproduction of a Round 1 (2026-08-25) finding, unchanged one day
later, on fresh chains for both sub-cases.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` for a fresh GulfAir/KSA offer (BAH-RUH, 2026-11-01) → record a
   valid `cellCode`/`cellId`.
2. `POST api/v2/FlightBooking/Book` with `{"selectedOfferId":"<offerId>","supplier":"GulfAir","credentialsSelector":"KSA","passengersSelectedSeats":{...}}` — `ResponseId` omitted entirely.
3. Separately, repeat with `selectedOfferId` omitted instead.

## ❌ Actual Result

```json
"ResponseId": "(field absent from request entirely)"
```

Run 1 (ResponseId omitted): HTTP 200, `pnr:"PAWHEK"`, ticketed. Run 2 (selectedOfferId omitted):
`{"Status":500,"ErrorCode":"ServerError","ErrorMessage":"Unknown error occured. Please keep the transaction id as a reference.","Context":[]}`

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "1001", "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}] }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned on the 200 path; the selectedOfferId-omitted 500 path did not surface a usable TransactionId in the captured evidence beyond the generic envelope

## 📊 Severity

**High** — unlike the equivalent gap on `GetSeatMap` (BUG-02, a read-only endpoint), this
non-enforcement lets a caller create and **ticket a real, billable booking** while omitting a
documented-required field, and the sibling omission (selectedOfferId) surfaces as an unhandled
500 rather than input validation.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "supplier": "GulfAir", "pnr": "PAWHEK", "bookingToken": "[REDACTED]", "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722136278256" } } }
```

**Expected response (redacted):**

```json
{ "status": 400, "errorCode": "1001", "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}] }
```

## 💥 Impact

A real GulfAir PNR (`PAWHEK`) was created and ticketed purely to demonstrate this defect, and needs
manual void/cancel follow-up (see the QA report's Cleanup section). Combined with BUG-02, this shows
`ResponseId` enforcement is generically missing across at least two V2 endpoints that both document
it as required — a systemic validation gap, not an isolated bug in one controller.
