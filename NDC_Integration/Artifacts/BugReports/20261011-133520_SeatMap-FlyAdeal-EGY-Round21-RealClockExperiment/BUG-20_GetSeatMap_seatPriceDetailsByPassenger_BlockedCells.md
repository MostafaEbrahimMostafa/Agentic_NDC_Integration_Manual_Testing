# [V2][FlyAdeal][GetSeatMap] – seatPriceDetailsByPassenger Returned Populated for Blocked and Occupied Seats

## 📄 Description

FlyAdeal seat maps return a priced `seatPriceDetailsByPassenger` entry (real amounts, `paxCellAvailability` "Blocked"/"Occupied") for seats that cannot be bought; only the aggregate `seatPriceDetails` is null. **New defect** (first observed Round 21).

## History

| Round | Date | Result |
|---|---|---|
| 21 | 2026-10-11 | FAIL - first observation; 1150 of 1150 Blocked and 61 of 61 Occupied cells priced across 41 maps |

## 🔁 Steps to Reproduce

1. `Search` JED→DMM 2026-11-14 (3 passengers) → `FareConfirm` → `GetOfferBundles` → `AddPassenger`.
2. `GetSeatMap` with `selectedBundles` [FLY]; read seat 12A (Blocked) in `seatMapDetails.<segment>.rows[]`.

## ❌ Actual Result

```json
{
  "cellCode": "12A",
  "cellAvailability": "Blocked",
  "seatPriceDetails": null,
  "seatPriceDetailsByPassenger": {
    "<pax1>": { "paxCellAvailability": "Blocked", "totalPrice": { "amount": 65, "currency": "SAR" }, "basePrice": { "amount": 65, "currency": "SAR" }, "taxesPrice": { "amount": 0, "currency": "SAR" } },
    "<pax2>": { "paxCellAvailability": "Blocked", "totalPrice": { "amount": 65, "currency": "SAR" } }
  }
}
```

The same response's passenger allow-list does not contain 12A, so the two blocks disagree. A Book for 12A is refused (409), so the price is never payable.

## ✅ Expected Result

```json
{
  "cellCode": "12A",
  "cellAvailability": "Blocked",
  "seatPriceDetails": null,
  "seatPriceDetailsByPassenger": null
}
```

SPEC.md §2.7: seatPriceDetails is null for Blocked/Occupied cells (TC-SEATMAP-VAL-08); the per-passenger block should follow.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `c3a0875a-c7ad-498b-8446-9f4468832cb0`

## 📊 Severity

**Medium** — unavailable seats are shown with a price, which misleads a seat-selection UI although the booking itself is refused.

## 📎 Evidence

**Actual response (redacted):**

```json
// 1150/1150 Blocked and 61/61 Occupied seat cells carry seatPriceDetailsByPassenger with real amounts (41 maps); 90 passenger/cell entries on the 3-passenger map are priced but not allow-listed.
```

**Expected response (redacted):**

```json
// No price entries for Blocked/Occupied cells.
```

Source: `TC-SEATMAP-VAL-08` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A client that prices seats from `seatPriceDetailsByPassenger` will show prices for blocked and occupied seats and may let a traveler pick them, only to fail at Book.
