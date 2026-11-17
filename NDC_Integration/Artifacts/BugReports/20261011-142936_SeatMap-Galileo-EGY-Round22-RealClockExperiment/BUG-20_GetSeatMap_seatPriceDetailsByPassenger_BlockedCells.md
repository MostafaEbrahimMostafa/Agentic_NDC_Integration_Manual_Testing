# [V2][Galileo][GetSeatMap] – Blocked and Occupied Seats Carry Real Prices (2nd Confirmation, First on Galileo)

## 📄 Description

Every Blocked and Occupied seat cell carries a real priced `seatPriceDetailsByPassenger` entry and a populated aggregate `seatPriceDetails`, although the passenger allow-list correctly excludes them and `Book` refuses them. **Not a new defect** - existing `BUG-20` (FlyAdeal, Round 21), 2nd confirmation, first on Galileo (where the aggregate field is populated too).

## History

| Round | Date | Result |
|---|---|---|
| 21 | 2026-10-11 | FAIL - FlyAdeal |
| 22 | 2026-10-11 | FAIL - **Galileo** (2nd) |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-11-17 (2 ADT + CHD + INF) -> `FareConfirm` -> `AddPassenger` -> `GetSeatMap`.
2. Read cell 30-D (cellAvailability Blocked).

## ❌ Actual Result

```json
{ "cellCode": "30-D", "cellAvailability": "Blocked", "seatPriceDetails": { "paxCellAvailability": "Blocked", "totalPrice": { "amount": 160, "currency": "AED" } },
  "seatPriceDetailsByPassenger": { "<guid>": { "paxCellAvailability": "Blocked", "totalPrice": { "amount": 160, "currency": "AED" } } } }
```

## ✅ Expected Result

```json
{ "cellCode": "30-D", "cellAvailability": "Blocked", "seatPriceDetails": null, "seatPriceDetailsByPassenger": null }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `220098ae-07cd-43bf-9ee0-1a8519a6e974`

## 📊 Severity

**Medium** — a client rendering prices shows prices for seats that cannot be bought; Book still refuses them.

## 📎 Evidence

Blocked 30-D: 160.00 AED per passenger; 121/121 Blocked cells priced over 18 maps.

Source: `TC-SEATMAP-VAL-08` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

A seat-selection UI built on these fields would advertise prices for seats nobody can buy.
