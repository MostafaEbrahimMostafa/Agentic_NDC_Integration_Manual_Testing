# [V2][FlyAdeal][GetSeatMap] – ResponseId Not Enforced as Required in GetSeatMap Request (10th Confirmation, First on FlyAdeal)

## 📄 Description

`GetSeatMap` documents `ResponseId` as required, but a request that omits it still returns HTTP 200 with the full seat map; the other three mandatory fields (`supplier`, `credentialsSelector`, `selectedOfferId`) are rejected with 400. **Not a new defect** - the existing `BUG-02` (9 confirmations on GulfAir/KSA), now confirmed for the **10th time**, first on FlyAdeal.

## History

| Round | Date | Result |
|---|---|---|
| 1 - 20 | 2026-08-25 - 2026-10-10 | FAIL on GulfAir/KSA in the rounds that exercised it (9 confirmations) |
| 21 | 2026-10-11 | FAIL - FlyAdeal/EGY (200, 186 seat cells) |

## 🔁 Steps to Reproduce

1. `Search` JED→RUH 2026-12-21 → `FareConfirm` → `GetOfferBundles` → `AddPassenger`.
2. `GetSeatMap` with `supplier`, `credentialsSelector`, `selectedOfferId` and `selectedBundles` but **no** `ResponseId`.

## ❌ Actual Result

```json
{
  "status": 200,
  "seatMapDetails": { "<segment>": { "rows": "[31 rows]" } }
}
```

Omitting `supplier`, `credentialsSelector` or `selectedOfferId` returns a 400 validation error naming the field.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [{ "name": "ResponseId", "value": "The ResponseId field is required." }]
}
```

`ResponseId` is a documented required field (SPEC.md §2.7, §8.1) and must be enforced like the other three.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `6f4e2121-ebd6-4ce8-ab86-0039758616f2`

## 📊 Severity

**Low** — a documented required field is not enforced, but the request still returns correct data for the offer named by selectedOfferId.

## 📎 Evidence

**Actual response (redacted):**

```json
// GetSeatMap without ResponseId: HTTP 200, 186 seat cells.
```

**Expected response (redacted):**

```json
// HTTP 400, errorCode 1001, context ResponseId "The ResponseId field is required."
```

Source: `TC-SEATMAP-NEG-04` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A required field is not enforced, so integrations that forget `ResponseId` work by accident and the documented contract cannot be trusted.
