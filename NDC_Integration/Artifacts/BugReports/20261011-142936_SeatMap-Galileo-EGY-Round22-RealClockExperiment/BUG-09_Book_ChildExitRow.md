# [V2][Galileo][Book] – Child Passenger Accepted in Exit-Row Seat (12th Confirmation, First on Galileo)

## 📄 Description

`GetSeatMap` offers and prices all exit-row cells to the CHD passenger (each cell is itself described "Seat not suitable for child") and `Book` accepts the assignment and sends it to the supplier; it fails only at the unrelated ticketing step. **Not a new defect** - existing `BUG-09`, 12th confirmation, first on Galileo.

## History

| Round | Date | Result |
|---|---|---|
| 1-20 | 2026-08-25 .. 2026-10-10 | FAIL on GulfAir, 11 confirmations (not exercised Round 21) |
| 22 | 2026-10-11 | FAIL - **Galileo**, 12th confirmation |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-11-25 (1 ADT + 1 CHD) -> `FareConfirm` -> `AddPassenger` -> `GetSeatMap`.
2. Check the CHD passenger's `passengersSeatMapAvailability`: it lists exit-row cells such as 31-A.
3. `Book` with the ADT in 33-J and the CHD in 31-A.

## ❌ Actual Result

```json
// 31-A: description "Seat not allowed for infant; Seat not allowed for medical; PaidGeneralSeat; ExitRow; Seat not suitable for child; ..."; present in the CHD allow-list
// Book: HTTP 409 after 51 s (reached Galileo, failed at ticketing, gdsPnr HNC0JV) - no validation error
```

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "Context": [{ "Value": "Seat '31-A' is not allowed for a child passenger." }] } // in 0.1 s, and 31-A absent from the CHD allow-list
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `984918dd-7d82-4715-b4dd-5006f2fedbdb`

## 📊 Severity

**High** — a safety rule (no children in exit rows) is enforced nowhere in the API.

## 📎 Evidence

ADT + CHD offer (CAI-JED 2026-11-25): CHD allow-list contains 12 exit cells, all "Seat not suitable for child"; Book with CHD in 31-A -> 409 after 51 s at ticketing (gdsPnr HNC0JV), not a 0.1 s validation 400.

Source: `TC-BOOK-BIZ-05` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

Any client calling the API directly can place a child in an exit row; on MS A320neo flights the exit rows carry no restriction flags at all.
