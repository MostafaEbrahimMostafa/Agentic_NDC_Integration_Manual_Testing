# [V2][FlyAdeal][GetSeatMap] – isSeatMapRequired=false Not Enforced - Seat Map Returned for an Offer That Is Not Flagged (10th Confirmation, First on FlyAdeal)

## 📄 Description

`GetSeatMap` returns HTTP 200 with a complete seat map for offers whose `FareConfirm` reports `isSeatMapRequired: false`; the flag is not enforced and does not describe the capability - on FlyAdeal it is `false` on every FareConfirm response (55 of 55) although seat maps work on all of them. **Not a new defect** - the existing `BUG-15`, now confirmed for the **10th time**, first on FlyAdeal. (On 2026-08-25 the same call on FlyAdeal returned an unhandled 500; it now returns the map.)

## History

| Round | Date | Result |
|---|---|---|
| 1 - 20 | 2026-08-25 - 2026-10-10 | FAIL on GulfAir/KSA (9 confirmations); FlyAdeal 2026-08-25: 500 ServerError (see the FlyAdeal run of that date) |
| 21 | 2026-10-11 | FAIL - FlyAdeal/EGY, 200 with a full map |

## 🔁 Steps to Reproduce

1. `Search` JED→RUH 2026-12-16 → `FareConfirm` (`selectedOffer.isSeatMapRequired` = false, `haveBundles` = true) → `GetOfferBundles` → `AddPassenger`.
2. `GetSeatMap` with `selectedBundles` [FLY].

## ❌ Actual Result

```json
{
  "status": 200,
  "supplier": "Flyadeal",
  "seatMapDetails": { "<segment>": { "rows": "[31 rows]" } }
}
```

Complete, bookable seat map for an offer flagged `isSeatMapRequired: false`.

## ✅ Expected Result

```json
{
  "status": 409,
  "errorCode": "OperationNotSupported",
  "errorMessage": "This action is not currently supported by the selected supplier."
}
```

SPEC.md §2.2/§2.7: GetSeatMap is gated by the per-offer capability flag; either reject the call for a false flag or set the flag true where seat maps exist.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `addeca07-1914-4d60-8888-57e93e7b4462`

## 📊 Severity

**Low** — the flag is unreliable, but the seat map itself is correct and usable.

## 📎 Evidence

**Actual response (redacted):**

```json
// FareConfirm isSeatMapRequired false; GetSeatMap HTTP 200, 186 seat cells.
```

**Expected response (redacted):**

```json
// Rejection / not-supported envelope, or isSeatMapRequired true.
```

Source: `TC-SEATMAP-NEG-01` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

The per-offer flag cannot be used to decide whether to show a seat map, so every client has to call GetSeatMap speculatively.
