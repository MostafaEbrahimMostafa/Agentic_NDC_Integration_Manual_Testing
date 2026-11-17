# [V2][GulfAir][GetSeatMap] – isSeatMapRequired=false Not Enforced - Seat Map Returned for an Offer That Is Not Flagged (8th Confirmation)

## 📄 Description

`FareConfirm` reports `isSeatMapRequired=false` for GulfAir offers, yet `GetSeatMap` returns HTTP 200 with a complete seat map for them. **Not a new defect** - the existing `BUG-15`, now confirmed for the **8th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – seat map returned for an unflagged offer (filed as BUG-15 in Round 5) |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – 200 on two chains |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – 200 on two chains |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-06-27 → `FareConfirm` (note `selectedOffer.isSeatMapRequired = false`) → `AddPassenger`.
2. `GetSeatMap` with AddPassenger's `ResponseId`/`selectedOfferId`. Repeat on BAH→JED 2027-06-28.

## ❌ Actual Result

```json
{
  "FareConfirm": {
    "selectedOffer.isSeatMapRequired": false,
    "selectedOffer.haveBundles": false
  },
  "GetSeatMap": {
    "status": 200,
    "rows": 23,
    "seatCells": 138
  }
}
```

Both offers (BAH→RUH 23 rows, BAH→JED 28 rows) return a complete seat map. The flag was `false` on all 29 FareConfirm calls this round.

## ✅ Expected Result

```json
{
  "status": 409,
  "errorCode": "OperationNotSupported",
  "errorMessage": "Seat map is not available for this offer."
}
```

An offer flagged `isSeatMapRequired=false` should be rejected or answered with an explicit not-supported envelope (SPEC.md §2.2, §2.7); alternatively the flag should be corrected. The exact shape is UNKNOWN.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `cb353be0-9e7c-4cec-a999-d63a17199121`

## 📊 Severity

**Low** — the flag is advisory and the seat map itself is correct; only the capability signal is unreliable.

## 📎 Evidence

**Actual response (redacted):**

```json
// FareConfirm
"isSeatMapRequired": false
// GetSeatMap
HTTP 200, 138 seat cells
```

**Expected response (redacted):**

```json
HTTP 4xx / explicit not-supported envelope, or isSeatMapRequired reflecting reality
```

Source: `TC-SEATMAP-NEG-01` in [QA report](../../Logs/20261010-152325_SeatMap-GulfAir-KSA-Round18.md).

## 💥 Impact

The capability flag cannot be used to decide whether to show seat selection, and callers get seat data for offers that are not flagged as seat-map offers.
