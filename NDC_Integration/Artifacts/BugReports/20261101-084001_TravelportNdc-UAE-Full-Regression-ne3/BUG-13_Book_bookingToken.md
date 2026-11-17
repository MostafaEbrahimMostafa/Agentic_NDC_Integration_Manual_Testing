# [V1 and V2][TravelportNdc][Book] – bookingToken Returned Identical for Two Different Bookings

## 📄 Description

Two bookings created in parallel were returned the same `bookingToken`: pnr 82GJ34 (V2, gdsPNR JJ0R3R) and pnr 82FU8G (V1, gdsPNR JJ0R3Q).

Recurrence of BUG-13 (First observed Round 2 (2026-10-27, 2 of 102 bookings); reproduced 2026-11-01: 1 pair in 278 bookings). Occurrence 2.

Found by: TC-VOIDTPN-SEC-03, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Create two QR CAI-JED bookings at the same moment (one V1, one V2).
2. Compare the bookingToken values.

## ❌ Actual Result

```json
{
  "pnr": "82GJ34", "gdsPNR": "JJ0R3R", "bookingToken": "52ee7637-d9af-4056-a7b7-5cba7188a014"
}
{
  "pnr": "82FU8G", "gdsPNR": "JJ0R3Q", "bookingToken": "52ee7637-d9af-4056-a7b7-5cba7188a014"
}
```

pnr 82GJ34 (V2, gdsPNR JJ0R3R) and pnr 82FU8G (V1, gdsPNR JJ0R3Q) both returned bookingToken 52ee7637-d9af-4056-a7b7-5cba7188a014 (prepared in parallel for TC-VOIDTPN-SEC-03)

## ✅ Expected Result

```json
A different bookingToken per booking
```

SPEC.md 2.9 IDs generated; 6.2.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — A key meant to be unique collides; rare so far (1 pair in 278 bookings).

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "82GJ34", "gdsPNR": "JJ0R3R", "bookingToken": "52ee7637-d9af-4056-a7b7-5cba7188a014"
}
{
  "pnr": "82FU8G", "gdsPNR": "JJ0R3Q", "bookingToken": "52ee7637-d9af-4056-a7b7-5cba7188a014"
}
```

**Expected response (redacted):**

```json
A different bookingToken per booking
```

## 💥 Impact

Retrieve, Void or CancelAfterHold keyed on the token can hit the wrong booking. A Void/Retrieve/Cancel keyed on the token can act on the wrong booking
