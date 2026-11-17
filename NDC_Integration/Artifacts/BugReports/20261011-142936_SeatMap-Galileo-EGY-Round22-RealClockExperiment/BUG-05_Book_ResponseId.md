# [V2][Galileo][Book] – ResponseId Not Enforced as Mandatory (11th Confirmation, First on Galileo)

## 📄 Description

`Book` documents `ResponseId` as required, but a request that omits it is accepted and runs the full supplier booking (on Galileo it created a held reservation and failed only at ticketing). Omitting `supplier`, `credentialsSelector` or `selectedOfferId` is rejected with a 400. **Not a new defect** - existing `BUG-05`, 11th confirmation, first on Galileo.

## History

| Round | Date | Result |
|---|---|---|
| 1-21 | 2026-08-25 .. 2026-10-11 | FAIL on GulfAir and FlyAdeal, 10 confirmations |
| 22 | 2026-10-11 | FAIL - **Galileo**, 11th confirmation |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-12-02 -> `FareConfirm` -> `AddPassenger`.
2. `Book` with `supplier`, `credentialsSelector`, `selectedOfferId` and **no** `ResponseId`.

## ❌ Actual Result

```json
// HTTP 409 after 30.7 s: the request was NOT rejected as invalid; it reached Galileo and failed at ticketing
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [{ "Name": "12008", "Value": "Host error during ticket issue. INVALID CREDIT CARD DETAILS the reservation failed at Ticketing stage and still at the hold state with gdsPnr HNC0K0" }] }
```

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": 1001, "Context": [{ "Name": "ResponseId", "Value": "The ResponseId field is required." }] } // in 0.1 s, nothing created
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `8a5f24c4-2505-4733-a7f0-0f569f04050a`

## 📊 Severity

**High** — a malformed Book creates a supplier reservation.

## 📎 Evidence

omit ResponseId: 409 after 30.7 s, held reservation HNC0K0; other three omissions 400 in 0.1 s.

Source: `TC-BOOK-NEG-12` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

The documented mandatory field is not mandatory and a malformed request creates a live supplier reservation.
