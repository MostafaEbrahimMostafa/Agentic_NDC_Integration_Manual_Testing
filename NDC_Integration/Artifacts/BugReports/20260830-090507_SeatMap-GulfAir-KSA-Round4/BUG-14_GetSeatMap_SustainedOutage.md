# [V2][GulfAir][GetSeatMap] – Sustained Generic Supplier-Error Outage Lasting 20+ Minutes Mid-Run

## 📄 Description

Partway through this round's execution, `GetSeatMap` began failing on **every** call — regardless of
route, passenger count, or journey shape (one-way and round-trip both affected) — with a generic
HTTP 409 `NDC-INT-UNC-Z9999` "Unknown error" envelope, and did not recover for the remainder of the
test session (20+ minutes, 40+ independent calls, all failing identically). Earlier in the exact same
run, on the exact same host/supplier/credentialsSelector, `GetSeatMap` had succeeded normally
multiple times (5 different routes: BAH-RUH, BAH-JED, BAH-DMM, BAH-CAI, BAH-DXB) — ruling out a
request-shape or scope problem on this suite's side. `Book` and `Hold` (called independently, not
routed through `GetSeatMap`) continued to succeed normally throughout the same window, isolating the
outage specifically to `GetSeatMap`'s own supplier call path.

## 🔁 Steps to Reproduce

Not reliably reproducible on demand — this was an observed live incident, not a crafted test. To
detect a recurrence:
1. `Search` → `FareConfirm` → `AddPassenger` for any GulfAir/KSA offer.
2. `GetSeatMap` with the resulting `ResponseId`/`selectedOfferId`.
3. If it returns HTTP 409 `NDC-INT-UNC-Z9999`, retry the full chain against a **different, fresh**
   offer/route. If the same generic error recurs across multiple unrelated offers/routes in
   succession, this is the same outage class, not a one-off.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "<unique per call — 40+ distinct values observed>",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "Unknown", "Value": "Error description not available" }],
  "OriginalSupplierRequest": "<raw SOAP envelope — see BUG-11, this same outage path also leaks it>"
}
```

## ✅ Expected Result

```json
{ "status": 200, "seatMapDetails": { "...": "populated as in every earlier successful call this same run" } }
```

(Or, if the supplier connection is genuinely unavailable, a more specific error code than the generic
catch-all `NDC-INT-UNC-Z9999`/"Unknown error", so callers and monitoring can distinguish a real
supplier outage from a request-shape problem.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Representative sample: `1750052b-fc64-4b85-87ef-2714191960a6`,
  `daa1b2af-a2bf-40d7-badd-5fca4432c2c1` (first and last of the final 10-attempt recovery poll)

## 📊 Severity

**High** — this is an availability defect, not a business-logic one, but it fully blocked live
re-verification this round of GetSeatMap's cross-offer negative case (BUG-01), Book's cross-offer
cellId case (BUG-07), Hold's undocumented seat-selection field (BUG-08), the Child/exit-row safety
defect (BUG-09), the round-trip seat-selection flows, and the multi-passenger seat-conflict case —
roughly a third of this round's planned scope had to be marked BLOCKED as a direct result. An
availability gap of this severity on a core booking-adjacent endpoint (seat selection sits on the
critical path for most real bookings) would be highly disruptive in production.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [{ "Name": "Unknown", "Value": "Error description not available" }] }
```

**Expected response (redacted):** `{ "status": 200, "seatMapDetails": { "...": "..." } }`

**Isolation evidence:** `Book` (no seat selection, bypassing `GetSeatMap` entirely) succeeded
normally during this same outage window (pnr `RXADOW`), and `Hold` (also not routed through
`GetSeatMap`) also succeeded normally (pnr `RXFVNC`, `RAHAQQ`) — confirming the outage was isolated
to `GetSeatMap`'s own supplier call, not a GulfAir-wide connectivity issue.

## 💥 Impact

New defect this round — no prior round reported a sustained outage of this kind (Round 2's BUG-12
was a single Book-latency incident, a different endpoint and a different failure mode). Recommend:
(1) the platform team check GulfAir/TPConnects supplier-connection health/monitoring around this
run's timeframe (2026-08-30, mid-morning UTC) to correlate with any known upstream incident, and
(2) `NDC-INT-UNC-Z9999` be replaced or supplemented with a more specific "supplier temporarily
unavailable" error code distinct from other business-validation 409s, so callers can distinguish a
transient outage (worth retrying) from a permanent business rejection (not worth retrying).
