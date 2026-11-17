# [V2][FlyAdeal][Book] – Omitted selectedOfferId Returns Unhandled 500 ServerError Instead of a Validation Error

## 📄 Description

`Book` without `selectedOfferId` fails with an unhandled HTTP 500 `ServerError` ("Unknown error occured...") instead of a validation 400. `GetSeatMap` handles the same omission with a clean 400 ("The SelectedOfferId field is required."). **New defect** (first observed Round 21).

## History

| Round | Date | Result |
|---|---|---|
| 20 | 2026-10-10 | GulfAir: omitting selectedOfferId was rejected with a 400 |
| 21 | 2026-10-11 | FAIL - FlyAdeal/EGY: 500 ServerError |

## 🔁 Steps to Reproduce

1. `Search` JED→RUH 2026-12-01 → `FareConfirm` → `GetOfferBundles` → `AddPassenger` → `GetSeatMap`.
2. `Book` with `ResponseId`, `supplier`, `credentialsSelector`, `selectedBundles` and `passengersSelectedSeats` but **no** `selectedOfferId`.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "cc0993ae-d95d-49ce-bbf7-8bbc3fa7da05",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

No indication of the actual cause.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [{ "name": "SelectedOfferId", "value": "The SelectedOfferId field is required." }]
}
```

SPEC.md §2.9, §7.7: mandatory-field omissions are validation errors (as GetSeatMap, and Book for supplier/credentialsSelector, return).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `cc0993ae-d95d-49ce-bbf7-8bbc3fa7da05`

## 📊 Severity

**Low** — a client mistake surfaces as a server fault; no data is corrupted.

## 📎 Evidence

**Actual response (redacted):**

```json
// HTTP 500 ServerError in 103 ms.
```

**Expected response (redacted):**

```json
// HTTP 400, errorCode 1001, context SelectedOfferId.
```

Source: `TC-BOOK-NEG-12` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A client mistake appears as a server outage: error monitoring is polluted and the integrator gets no actionable message.
