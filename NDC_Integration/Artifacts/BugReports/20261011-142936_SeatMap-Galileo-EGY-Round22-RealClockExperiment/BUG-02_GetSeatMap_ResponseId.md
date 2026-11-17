# [V2][Galileo][GetSeatMap] – ResponseId Not Enforced as Mandatory (11th Confirmation, First on Galileo)

## 📄 Description

`GetSeatMap` documents `ResponseId` as required, but a request that omits it returns HTTP 200 with the full seat map; the other three mandatory fields are rejected with a 400. **Not a new defect** - existing `BUG-02`, 11th confirmation, first on Galileo.

## History

| Round | Date | Result |
|---|---|---|
| 1-21 | 2026-08-25 .. 2026-10-11 | FAIL on GulfAir and FlyAdeal, 10 confirmations |
| 22 | 2026-10-11 | FAIL - **Galileo**, 11th confirmation |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-12-25 (1 ADT) -> `FareConfirm` -> `AddPassenger`.
2. `GetSeatMap` with `supplier`, `credentialsSelector` and `selectedOfferId` but **no** `ResponseId`.

## ❌ Actual Result

```json
// HTTP 200, full seat map (SV386, 300 seat cells)
```

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": 1001, "Context": [{ "Name": "ResponseId", "Value": "The ResponseId field is required." }] }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `b6b0b674-e5db-48f3-9475-b0c944d09f0a`

## 📊 Severity

**Medium** — a documented mandatory field is not enforced; the request still succeeds.

## 📎 Evidence

omit supplier 400, credentialsSelector 400, selectedOfferId 400, ResponseId 200 (300-seat map).

Source: `TC-SEATMAP-NEG-04` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

Clients cannot rely on validation errors to catch a missing field; the contract in SPEC.md 2.7 is not enforced.
