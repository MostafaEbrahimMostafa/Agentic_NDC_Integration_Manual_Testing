# [V2][FlyAdeal][Book] – ResponseId Not Enforced as Required in Book Request; PNR Created (10th Confirmation, First on FlyAdeal)

## 📄 Description

`Book` documents `ResponseId` as required, but a Book request that omits it is accepted and creates a real PNR; `supplier` and `credentialsSelector` omissions are rejected. **Not a new defect** - the existing `BUG-05`, now confirmed for the **10th time**, first on FlyAdeal. The same test also found the new `BUG-22` (omitting `selectedOfferId` -> 500).

## History

| Round | Date | Result |
|---|---|---|
| 1 - 20 | 2026-08-25 - 2026-10-10 | FAIL on GulfAir/KSA (9 confirmations) |
| 21 | 2026-10-11 | FAIL - FlyAdeal/EGY (pnr IBUG7X) |

## 🔁 Steps to Reproduce

1. `Search` JED→RUH 2026-11-30 → `FareConfirm` → `GetOfferBundles` → `AddPassenger` → `GetSeatMap`.
2. `Book` with `selectedOfferId`, `supplier`, `credentialsSelector`, `selectedBundles` and `passengersSelectedSeats` (25C) but **no** `ResponseId`.

## ❌ Actual Result

```json
{
  "status": 200,
  "pnr": "IBUG7X",
  "passengersSelectedSeats": { "<pax>": { "<segment>": { "cellCode": "25C" } } }
}
```

A booking is created without `ResponseId`.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "context": [{ "name": "ResponseId", "value": "The ResponseId field is required." }]
}
```

SPEC.md §2.9, §7.7, §8.1: `ResponseId` is required.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `2d0d0552-c65c-4ca4-b151-0db0e1d9a2c0`

## 📊 Severity

**Medium** — a documented required field is not enforced and a real booking is created without it.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book without ResponseId: HTTP 200, pnr IBUG7X, seat 25C attached.
```

**Expected response (redacted):**

```json
// HTTP 400, no PNR.
```

Source: `TC-BOOK-NEG-12` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A booking can be created without the response id that ties it to the search, defeating the id chain and the documented contract.
