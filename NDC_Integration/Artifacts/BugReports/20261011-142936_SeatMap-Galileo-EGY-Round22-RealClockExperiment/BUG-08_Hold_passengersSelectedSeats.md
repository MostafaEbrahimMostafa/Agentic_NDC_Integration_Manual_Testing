# [V2][Galileo][Hold] – passengersSelectedSeats Accepted and Priced Although Documented as Absent (10th Confirmation, First on Galileo)

## 📄 Description

`Hold` is documented as having no seat field, but it accepts `passengersSelectedSeats`, prices the seat into the held offer and `Retrieve` shows it on the OnHold booking, without any `SeatAfterHold` call. **Not a new defect** - existing `BUG-08`, 10th confirmation, first on Galileo.

## History

| Round | Date | Result |
|---|---|---|
| 1-20 | 2026-08-25 .. 2026-10-10 | FAIL on GulfAir, 9 confirmations (not exercised Round 21: FlyAdeal has no Hold) |
| 22 | 2026-10-11 | FAIL - **Galileo**, 10th confirmation |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-12-09 -> `FareConfirm` -> `AddPassenger` -> `GetSeatMap` (seat 33-H, 80 AED).
2. `Hold` with the GetSeatMap `ResponseId`/`selectedOfferId` and `passengersSelectedSeats` {passenger GUID: {segment: {cellCode 33-H, cellId 33-H~0B5}}}.
3. `PnrReprice`, then `Retrieve`.

## ❌ Actual Result

```json
// Hold 200, pnr 7JRHGS
{ "passengersSelectedSeats": { "<guid>": { "<segment>": { "cellCode": "33-H", "price": { "amount": 80, "currency": "AED" } } } },
  "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": { "amount": 80 }, "totalAmount": { "amount": 650 } } } }
// Retrieve: bookingStatus "OnHold", seat 33-H still attached
```

## ✅ Expected Result

```json
The field ignored or rejected as unknown (per the documented contract), or SPEC.md 1.10 item 6 / 2.10 updated to say Hold honours seats.
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `d23a1d87-65d6-4108-8a3a-a614e18f7212`

## 📊 Severity

**Medium** — the documented Hold/Book asymmetry is wrong, but the flow completes.

## 📎 Evidence

Hold pnr 7JRHGS with seat 33-H: 200, totalSelectedSeatsAmount 80 AED, totalAmount 650 = 570 + 80; Retrieve OnHold shows 33-H.

Source: `FLOW-V2-50-SEATFIELD` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

The documented difference between the Book and Hold branches is wrong for Galileo, and a seat can be attached to a hold.
