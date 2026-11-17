# [V2][GulfAir][Book] – cellId Token Not Validated, Tampered Token Still Books the Requested Seat

## 📄 Description

`Book`'s `passengersSelectedSeats.<pax>.setSegmentsSeats.<seg>.cellId` field is documented as an
opaque, offer/response-scoped token that must be copied verbatim from `GetSeatMap`. Submitting a
`cellId` with its trailing 10 base64 characters replaced by `"XXXXXXXXXX"` (alongside the correct,
untouched `cellCode`) does not cause a rejection — `Book` succeeds and attaches the seat exactly as
if the untampered token had been sent.

## 🔁 Steps to Reproduce

1. GetSeatMap completed for a GulfAir/KSA offer; record `cellCode: "8A"` and its `cellID`.
2. POST `Book` with `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg> = {cellCode: "8A", cellId:
   "<cellID with the last 10 characters replaced by XXXXXXXXXX>"}`.

## ❌ Actual Result

```json
{
  "pnr": "RNIEPJ",
  "tickets": {"PAX1": {"ticketStatus": "Booked", "ticketNumber": "722136277300"}},
  "passengersSelectedSeats": {"PAX1": {"<seg>": {"cellCode": "8A", "price": {"amount": 120.00, "currency": "SAR"}}}}
}
```

HTTP 200 — seat 8A attached and charged at its normal price, despite the corrupted `cellId`.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "The provided cellId could not be verified for this offer/segment."
}
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `pnr RNIEPJ`

## 📊 Severity

**High** — `cellId` is documented as the metadata-bearing, integrity-critical field for seat
selection (SPEC.md §2.7's own testing note flags it as embedding offer/response/passenger-ref
metadata); this evidence shows it is not actually decoded or verified at all by `Book`, which
directly informed the related, more severe finding in BUG-08 (Book trusts `cellCode` exclusively).

## 📎 Evidence

**Actual response (redacted):**

```json
{"pnr": "RNIEPJ", "passengersSelectedSeats": {"PAX1": {"<seg>": {"cellCode": "8A", "price": {"amount": 120.00, "currency": "SAR"}}}}}
```

**Expected response (redacted):**

```json
{"status": 400, "errorCode": "ValidationError", "errorMessage": "cellId could not be verified"}
```

## 💥 Impact

Establishes that `Book` performs no meaningful validation of the `cellId` token's integrity — see
BUG-08 for the full consequence (the server resolves the booked seat from `cellCode` alone,
regardless of what `cellId` is submitted alongside it).
