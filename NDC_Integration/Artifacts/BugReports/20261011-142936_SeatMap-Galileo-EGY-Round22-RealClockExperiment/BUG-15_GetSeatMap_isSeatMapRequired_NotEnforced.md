# [V2][Galileo][GetSeatMap] – isSeatMapRequired=false Not Enforced and Not Meaningful (11th Confirmation, First on Galileo)

## 📄 Description

`GetSeatMap` returns HTTP 200 with a complete seat map for an offer whose `FareConfirm` reports `isSeatMapRequired=false`. On Galileo the flag (and `offerHasSeat`) is false on all 39 offers, including carriers with working seat maps (SV, MS) and carriers that return 409 (NE, XY). **Not a new defect** - existing `BUG-15`, 11th confirmation, first on Galileo.

## History

| Round | Date | Result |
|---|---|---|
| 1-21 | 2026-08-25 .. 2026-10-11 | FAIL on GulfAir and FlyAdeal, 10 confirmations |
| 22 | 2026-10-11 | FAIL - **Galileo**, 11th confirmation |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-12-20 -> `FareConfirm` (isSeatMapRequired false) -> `AddPassenger`.
2. `GetSeatMap` with the AddPassenger ids.

## ❌ Actual Result

```json
// FareConfirm: selectedOffer.isSeatMapRequired false, offerHasSeat false
// GetSeatMap: HTTP 200, MS673, 120 seat cells
```

## ✅ Expected Result

```json
GetSeatMap rejected / "not supported" for such offers, or the flag reflecting the real capability.
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `16c5ecc2-2950-4928-8081-c07eb9066385`

## 📊 Severity

**Medium** — the capability flag cannot be used to decide whether to show seat selection.

## 📎 Evidence

isSeatMapRequired false on 41/41 FareConfirm calls; GetSeatMap 200 with 120 seats on the flagged offer.

Source: `TC-SEATMAP-NEG-01` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

Callers cannot tell from FareConfirm whether seat selection is available for an offer.
