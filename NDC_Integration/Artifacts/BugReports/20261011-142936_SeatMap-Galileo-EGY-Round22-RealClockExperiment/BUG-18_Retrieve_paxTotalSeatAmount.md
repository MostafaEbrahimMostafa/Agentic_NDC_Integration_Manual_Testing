# [V2][Galileo][Hold, PnrReprice, Retrieve] – paxTotalAmount Excludes the Seat Amount (5th Confirmation, First on Hold Path)

## 📄 Description

For a held booking with one 80 AED seat, `paxTotalAmount` (570 AED) excludes the seat while `priceDetails.totalAmount` is 650 AED, so the passenger lines do not add up to the booking total; `Hold` and `PnrReprice` also omit `passengerSeats`/`paxTotalSeatAmount`, which `Retrieve` shows. **Not a new defect** - existing `BUG-18`, 5th confirmation, first on Galileo and on the Hold path.

## History

| Round | Date | Result |
|---|---|---|
| 13 | 2026-09-30 | FAIL - GulfAir, two seats counted as one |
| 18, 20 | 2026-10-10 | FAIL - reproduced (2nd, 3rd) |
| 21 | 2026-10-11 | FAIL - FlyAdeal, single seat (4th) |
| 22 | 2026-10-11 | FAIL - **Galileo**, Hold path (5th) |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-12-09 -> `FareConfirm` (570 AED) -> `AddPassenger` -> `GetSeatMap`.
2. `Hold` with seat 33-H (80 AED), `PnrReprice`, `Retrieve` (pnr 7JRHGS).

## ❌ Actual Result

```json
{ "selectedOffer": { "passengerFareBreakdown": [{ "paxTotalAmount": { "amount": 570, "currency": "AED" }, "paxTotalSeatAmount": { "amount": 80, "currency": "AED" } }],
  "priceDetails": { "totalSelectedSeatsAmount": { "amount": 80 }, "totalAmount": { "amount": 650 } } } }
```

## ✅ Expected Result

```json
"paxTotalAmount": { "amount": 650, "currency": "AED" } // fare + seat, with passengerSeats and paxTotalSeatAmount present in Hold and PnrReprice too
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Hold, PnrReprice, Retrieve`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `75b07bd4-a15b-498c-84e4-a6d6bc96313d`

## 📊 Severity

**High** — a core financial field of the booking differs from the booking total, so passenger lines no longer add up.

## 📎 Evidence

Retrieve pnr 7JRHGS: paxTotalAmount 570, paxTotalSeatAmount 80, priceDetails.totalAmount 650.

Source: `FLOW-V2-50-SEATFIELD` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

Invoices, refunds or reconciliation built from the passenger lines are short by the seat amount.
