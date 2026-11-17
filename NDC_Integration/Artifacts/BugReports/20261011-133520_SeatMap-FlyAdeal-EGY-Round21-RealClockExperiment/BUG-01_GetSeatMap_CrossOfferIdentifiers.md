# [V2][FlyAdeal][GetSeatMap] – ResponseId/selectedOfferId Mismatch Accepted in GetSeatMap Request (10th Confirmation, First on FlyAdeal)

## 📄 Description

`GetSeatMap` accepts a `ResponseId` and a `selectedOfferId` taken from two different offers and returns a full seat map; the result follows `selectedOfferId` and `ResponseId` is never cross-checked. **Not a new defect** - the existing `BUG-01` (9 confirmations on GulfAir/KSA, Rounds 1-20), now confirmed for the **10th time** and the first time on FlyAdeal.

## History

| Round | Date | Result |
|---|---|---|
| 1 - 20 | 2026-08-25 - 2026-10-10 | FAIL on GulfAir/KSA in the rounds that exercised it (9 confirmations) |
| 21 | 2026-10-11 | FAIL - FlyAdeal/EGY |

## 🔁 Steps to Reproduce

1. Two independent chains A (JED→RUH 2026-12-16) and B (2026-12-17): `Search` → `FareConfirm` → `GetOfferBundles` → `AddPassenger`.
2. `GetSeatMap` with `ResponseId` of offer B and `selectedOfferId` of offer A (and `selectedBundles` of A).

## ❌ Actual Result

```json
{
  "status": 200,
  "supplier": "Flyadeal",
  "seatMapDetails": { "<segment of offer A>": { "rows": "[31 rows]" } }
}
```

The full seat map of offer A is returned. (The reverse pairing was rejected only because the bundle journey keys did not fit offer B - not an id check.)

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "NDC-INT-TEC-A0001",
  "context": [{ "name": "ResponseId", "value": "ResponseId does not belong to the selected offer." }]
}
```

SPEC.md §2.7, §7.7: a ResponseId/selectedOfferId pair that does not belong together must be rejected (the exact message is UNKNOWN; a 4xx is expected).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `90c8158f-a9a6-4ba7-9359-b9057c28d903`

## 📊 Severity

**Medium** — the response id gives no integrity protection, but the data returned is still correct for the offer named by selectedOfferId.

## 📎 Evidence

**Actual response (redacted):**

```json
// GetSeatMap (ResponseId B + selectedOfferId A): HTTP 200, 186 seat cells, flight F3152 JED-RUH 2026-12-16.
```

**Expected response (redacted):**

```json
// HTTP 4xx validation error naming the mismatch.
```

Source: `TC-SEATMAP-NEG-02` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A stale or foreign `ResponseId` combined with any valid offer id still yields data, so the id chain gives no integrity guarantee and mix-ups between concurrent searches go unnoticed.
