# [V2][FlyAdeal][GetSeatMap] – credentialsSelector Not Enforced - Offer Created Under EGY Readable Through UAE (7th Confirmation, First on FlyAdeal)

## 📄 Description

`GetSeatMap` does not reject a request whose `credentialsSelector` differs from the one the offer was created under (same supplier, different valid selector). **Not a new defect** - the existing `BUG-17` (6 confirmations on GulfAir), now confirmed for the **7th time**, first on FlyAdeal.

## History

| Round | Date | Result |
|---|---|---|
| 11 - 20 | 2026-09-29 - 2026-10-10 | FAIL on GulfAir/KSA (6 confirmations) |
| 21 | 2026-10-11 | FAIL - FlyAdeal: EGY offer read through UAE |

## 🔁 Steps to Reproduce

1. `Search` JED→RUH 2027-01-21 with `credentialsSelector` EGY → `FareConfirm` → `GetOfferBundles` → `AddPassenger`.
2. `GetSeatMap` with the same ids but `credentialsSelector` **UAE**.

## ❌ Actual Result

```json
{
  "status": 200,
  "supplier": "Flyadeal",
  "seatMapDetails": { "<segment>": { "rows": "[31 rows]" } }
}
```

Identical to the control call with EGY. A non-existent selector (KSA) is rejected 400, and so is another supplier (GulfAir/KSA).

## ✅ Expected Result

```json
{
  "status": 4xx,
  "errorMessage": "Offer not found / not authorized for this credentialsSelector"
}
```

SPEC.md §7.14: the selector an offer was created under must be enforced, as happens when the supplier is switched.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `d4cc7b7d-3d85-48ab-a2ef-f9e3c82087e3`

## 📊 Severity

**Medium** — tenant isolation by credential set is not enforced; data returned is not sensitive in itself.

## 📎 Evidence

**Actual response (redacted):**

```json
// credentialsSelector UAE: HTTP 200 with the full seat map (control EGY: 200); KSA: 400 "credentials ... do not exist or are not active".
```

**Expected response (redacted):**

```json
// HTTP 4xx for a selector other than the one the offer was created under.
```

Source: `TC-SEATMAP-SEC-01` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

An offer created under one credential set can be read through another, so separation between credential sets (markets/tenants) rests on the caller behaving correctly.
