# [V2][Galileo][Book] – Failed Ticketing Leaves an Untraceable Held Reservation and Returns No pnr/bookingToken

## 📄 Description

When Galileo rejects the ticketing step after `Book` was accepted, the API returns a generic `409 NDC-INT-UNC-Z9999` with no `pnr` and no `bookingToken`, but the supplier reservation is not rolled back: a held PNR remains, identifiable only by a `gdsPnr` inside the free-text error message. All 10 Book calls that reached the supplier this round did this (cause here: an invalid credit card on the credentials, an environment problem; the missing rollback and identifiers are the defect). Related to `BUG-16` and `BUG-12`, where a Book error hid a created booking.

## History

| Round | Date | Result |
|---|---|---|
| 22 | 2026-10-11 | FAIL - first observed, Galileo/EGY (10 of 10 failed Books) |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-11-20 -> `FareConfirm` -> `AddPassenger` -> `GetSeatMap`.
2. `Book` with seat 33-E (valid cellCode/cellId) using the GetSeatMap ids.
3. Note the error body: no `pnr`/`bookingToken`; the message names `gdsPnr HNC0JN`. `Retrieve` cannot be called (no pnr).

## ❌ Actual Result

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "12008", "Value": "Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr  HNC0JN" }] }
```

## ✅ Expected Result

```json
Either the held reservation is cancelled before the error is returned, or the error carries `pnr` and `bookingToken` (and a specific error code) so the caller can retrieve or cancel it.
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `e2b6c430-0751-46c5-b74d-4cb79b7b73e7`

## 📊 Severity

**High** — every failed Book leaves a live supplier reservation that the caller can neither retrieve nor cancel.

## 📎 Evidence

Failed Books left held gdsPnrs HNC0JP, HNC0JN, HNC0JQ, HNC0JV, HNC0JY, HNC0K0, HNC0K1, HNC0K2, HNC0K3, HNC0K4; none returned pnr or bookingToken.

Source: `TC-BOOK-NEG-09` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

Orphan held reservations accumulate at the supplier (HNC0JP, HNC0JN, HNC0JQ, HNC0JV, HNC0JY, HNC0K0, HNC0K1, HNC0K2, HNC0K3, HNC0K4) and cannot be managed through the API.
