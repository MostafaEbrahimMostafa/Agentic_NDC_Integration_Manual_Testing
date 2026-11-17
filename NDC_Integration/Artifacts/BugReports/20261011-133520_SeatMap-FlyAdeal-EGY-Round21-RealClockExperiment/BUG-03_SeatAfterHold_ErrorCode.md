# [V2][FlyAdeal][SeatAfterHold] – Every Call Rejected With 409 OperationNotSupported (10th Confirmation, First on FlyAdeal)

## 📄 Description

`SeatAfterHold` rejects every call for supplier FlyAdeal with HTTP 409 `OperationNotSupported` ("Flyadeal does not exists") before reading any field. **Not a new defect** - the existing `BUG-03` (GulfAir, 9 confirmations), now confirmed for the **10th time**. For FlyAdeal `Hold` itself is also unsupported (409 OperationNotSupported on 5 of 5 attempts, `canBeHeld` false on every offer), so a Held pnr cannot be created and the probe used a fabricated pnr.

## History

| Round | Date | Result |
|---|---|---|
| 1 - 20 | 2026-08-25 - 2026-10-10 | FAIL on GulfAir/KSA (9 confirmations) |
| 21 | 2026-10-11 | FAIL - FlyAdeal/EGY (Hold and SeatAfterHold both 409) |

## 🔁 Steps to Reproduce

1. `Search` JED→RUH 2026-12-10 → `FareConfirm` → `GetOfferBundles` → `AddPassenger` → `Hold` (409 OperationNotSupported).
2. `SeatAfterHold` with the 6-field body (`pnr` fabricated, empty `gdsPNR`/`bookingToken`, `surName` Ibrahim).

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [{ "Name": "OperationNotSupported", "Value": "Flyadeal does not exists" }]
}
```

Supplier-level rejection before any field is read; the message even says the supplier "does not exists".

## ✅ Expected Result

```json
{
  "Status": 200
}
```

SPEC.md §2.7a, §5.5 item 8: a documented seat-selection response (or a validation error), or the capability matrix must flag the supplier as not supporting the endpoint (and the flows should not list it).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `2e157840-d5b3-4799-8511-0e3db5f3ba6d`

## 📊 Severity

**High** — an endpoint presented as a normal step of the Hold branch has no working contract for the supplier, so the seat-after-hold flows cannot run.

## 📎 Evidence

**Actual response (redacted):**

```json
// SeatAfterHold probe: 409 OperationNotSupported "Flyadeal does not exists" (91 ms); Hold x5: 409 OperationNotSupported.
```

**Expected response (redacted):**

```json
// A documented response, or the supplier marked unsupported in the capability matrix.
```

Source: `TC-SEATAFTERHOLD-POS-01` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

The SeatAfterHold-dependent flows (candidate flows SM-HOLD-01..03) cannot be executed for FlyAdeal, and the wording "does not exists" gives integrators no hint that this is a capability gap.
