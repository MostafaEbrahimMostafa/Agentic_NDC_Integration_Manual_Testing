# [V2][GulfAir][Book] – pnr Missing from Book Response After Client-Observed Timeout on a Server-Side-Successful Booking

## 📄 Description

A live `Book` call against GulfAir exceeded 180 seconds without returning any response; the calling
client abandoned it as timed out. A subsequent retry against the identical offer token returned HTTP
409 "This booking has already been created (609)" — proving the **first** attempt had actually
succeeded and ticketed on GulfAir's backend sometime after the client gave up waiting. The caller
never received a `pnr`, `bookingToken`, or any other identifier for that real, live, ticketed
booking. Every other `Book` call in this run (and every `Book` call in the prior 2026-08-25 run)
completed well under 60 seconds.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` for GulfAir/KSA (BAH-RUH, 2026-10-16, GF169) → record cell `8B`.
2. `Book` with `passengersSelectedSeats` set to cell `8B`.
3. Observe: the call does not return within 180 seconds.
4. Retry the identical `Book` call (same `ResponseId`/`selectedOfferId`/`passengersSelectedSeats`).

## ❌ Actual Result

First attempt: no response within 180s (client-side timeout, no `pnr` ever received).

Retry:
```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "-1", "Value": "This booking has already been created (609). Please check on the Order Management page to confirm." }]
}
```

## ✅ Expected Result

```json
{ "supplier": "GulfAir", "pnr": "<a real PNR>", "bookingToken": "...", "tickets": { "PAX1": { "ticketStatus": "Booked" } } }
```

Returned within a bounded, documented timeout consistent with every other GulfAir `Book` call
observed (well under 60s), OR — if supplier-side latency can legitimately spike this high — some
non-blind-retry mechanism (a pending-status response, a retrievable reference) to recover the
resulting PNR.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `7f7341ab-a501-431d-ac2c-06e914a4a730` (from the retry's 409 response, confirming the original attempt's server-side success)

## 📊 Severity

**High** — a real GulfAir ticket now exists with no known PNR: it cannot be retrieved, verified, or
voided by this or any caller, since `Retrieve` requires the `pnr`/`bookingToken` that was never
returned. From the caller's perspective the booking simply vanished, while GulfAir's backend
considers it completed and ticketed — a genuine lost-order-confirmation defect, not merely a slow
response.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [{ "Name": "-1", "Value": "This booking has already been created (609)." }] }
```

(The retry's 409 body also included the raw supplier SOAP payloads — see BUG-11, redacted
separately.)

**Expected response (redacted):**

```json
{ "pnr": "<a real PNR>", "bookingToken": "..." }
```

## 💥 Impact

An orphaned real GulfAir booking now exists in the staging environment for offer `GF-OFFER-2`
(BAH-RUH GF169, 2026-10-16, seat 8B, passenger Mostafa Ibrahim) with **no known PNR** — flagged in
this run's Cleanup section as requiring the team to locate it via GulfAir's Order Management page
using the offer reference and timestamp, since no API call in this suite's surface can recover it
without a PNR. This also directly enables BUG-11's credential leak, since the natural, realistic
caller behavior after a timeout — retry the same request — is exactly what triggers the
credential-leaking 409 path.
