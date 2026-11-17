# [V2][Galileo][SeatAfterHold] – Endpoint Rejects Supplier With OperationNotSupported (11th Confirmation, First on Galileo)

## 📄 Description

`SeatAfterHold` rejects every call for Galileo with HTTP 409 `OperationNotSupported` and the message "Galileo does not exists" before reading any field, even for a live Held PNR (the Hold itself works). **Not a new defect** - existing `BUG-03`, 11th confirmation, first on Galileo (also GulfAir and FlyAdeal).

## History

| Round | Date | Result |
|---|---|---|
| 1-21 | 2026-08-25 .. 2026-10-11 | FAIL on GulfAir and FlyAdeal, 10 confirmations |
| 22 | 2026-10-11 | FAIL - **Galileo**, 11th confirmation (13 calls, all positions) |

## 🔁 Steps to Reproduce

1. `Search` CAI-DXB 2026-12-13 -> `FareConfirm` -> `AddPassenger` -> `Hold` (pnr 7JQQC8).
2. `SeatAfterHold` with `supplier`, `credentialsSelector`, `pnr`, `gdsPNR`, `bookingToken`, `surName`.

## ❌ Actual Result

```json
{ "Status": 409, "ErrorCode": "OperationNotSupported", "ErrorMessage": "This action is not currently supported by the selected supplier.", "Context": [{ "Name": "OperationNotSupported", "Value": "Galileo does not exists" }] }
```

## ✅ Expected Result

```json
A working `SeatAfterHold`, or a documented per-supplier "unsupported" status with a clear message (not "Galileo does not exists").
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `b2b3af57-c2f9-4eec-90f8-6b8b8df6f55e`

## 📊 Severity

**Medium** — an endpoint presented as a normal Hold-branch step is not implemented for this supplier, with a misleading message.

## 📎 Evidence

H1 Hold 200 pnr 7JQQC8; SeatAfterHold 409 OperationNotSupported; same on 13 calls (all positions, security variants).

Source: `TC-SEATAFTERHOLD-POS-01` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

The Hold branch cannot add seats for Galileo and the real request contract of the endpoint cannot be learned.
