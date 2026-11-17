# [V2][FlyAdeal][GetSeatMap] – cellCharacteristics Returned Incorrect Value (Bulkhead Code K on Every Seat)

## 📄 Description

Every seat in every FlyAdeal seat map carries `padisCode` **K** ("Bulkhead seat") in `cellCharacteristics`, although the cell's own `description` names a bulkhead only for the front-row seats. **New defect** (first observed Round 21).

## History

| Round | Date | Result |
|---|---|---|
| 21 | 2026-10-11 | FAIL - K on 8366 of 8366 seats across 41 maps; the description mentions a bulkhead on 8 |

## 🔁 Steps to Reproduce

1. `Search` JED→DMM 2026-11-14 → `FareConfirm` → `GetOfferBundles` → `AddPassenger` → `GetSeatMap` with `selectedBundles` [FLY].
2. Read `cellCharacteristics` of any seat, e.g. 25C.

## ❌ Actual Result

```json
{
  "cellCode": "25C",
  "description": "AISLE = True, INFANT = True, NSMOKING = True, TCC = Y, BRDZONE = 3, SRVZONE = 2 , Position X: 5 , Y: 57 , Height: 2 , Width: 2",
  "cellCharacteristics": [
    { "padisCode": "A", "description": "Aisle seat" },
    { "padisCode": "I", "description": "Seat suitable for adult with an infant" },
    { "padisCode": "K", "description": "Bulkhead seat" },
    { "padisCode": "Unknown", "description": "TCC : Y" }
  ]
}
```

Code K is present on all 186 seats of the cabin.

## ✅ Expected Result

```json
{
  "cellCode": "25C",
  "cellCharacteristics": [
    { "padisCode": "A", "description": "Aisle seat" },
    { "padisCode": "I", "description": "Seat suitable for adult with an infant" }
  ]
}
```

SPEC.md §2.7/§8.3: `cellCharacteristics` must agree with the seat (K only on genuine bulkhead seats); TC-SEATMAP-VAL-07.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `c3a0875a-c7ad-498b-8446-9f4468832cb0`

## 📊 Severity

**Low** — wrong enrichment data that misleads a seat filter, with no effect on booking or price.

## 📎 Evidence

**Actual response (redacted):**

```json
// K on 8366/8366 seats (41 maps, 45 segments); bulkhead named in the description of 8.
```

**Expected response (redacted):**

```json
// K only on first-row bulkhead seats.
```

Source: `TC-SEATMAP-VAL-07` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A seat-selection UI that filters or labels bulkhead seats from this code marks the whole cabin as bulkhead.
