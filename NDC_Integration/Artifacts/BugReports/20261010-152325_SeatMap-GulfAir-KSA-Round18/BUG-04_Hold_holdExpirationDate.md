# [V2][GulfAir][Hold] – holdExpirationDate Returned as Null in Hold Response (8th Confirmation)

## 📄 Description

The field `holdExpirationDate` is returned as `null` in the `Hold` response for GulfAir on every call, so a Held booking has no known expiry. **Not a new defect** - the existing `BUG-04`, now confirmed for the **8th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – null on every Hold |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – null on 6 of 6 Holds |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – null on 7 of 7 Holds |

## 🔁 Steps to Reproduce

1. `Search` BAH→CAI 2027-07-04 (1 ADT) → `FareConfirm` → `AddPassenger`.
2. `Hold` with `fareConfirmResponseId`, `selectedOfferId` (AddPassenger's), `supplier`, `credentialsSelector`.
3. Inspect `holdExpirationDate` (also `null` on `Retrieve` of the OnHold booking).

## ❌ Actual Result

```json
"holdExpirationDate": null
```

Null on all 7 Holds this round (TLTTGU, OOEMOB, OSLGYN, TFBYUM, OODMJW, ORVBTX, TFXRXD) and on Retrieve of the OnHold booking.

## ✅ Expected Result

```json
"holdExpirationDate": "2026-10-11T14:32:10Z"
```

A Family-B hold must expose when it lapses (SPEC.md §2.10, §6.3) so that expiry tracking, cleanup and the expired-hold negative tests can work.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `f9b89f94-1990-46b7-8c39-cdecbc1ddf1b`

## 📊 Severity

**Medium** — non-blocking, but expiry tracking and cleanup of held bookings cannot run without the value.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "TFBYUM",
  "holdExpirationDate": null
}
```

**Expected response (redacted):**

```json
{
  "pnr": "TFBYUM",
  "holdExpirationDate": "2026-10-11T14:32:10Z"
}
```

Source: `TC-SEATAFTERHOLD-NEG-02` in [QA report](../../Logs/20261010-152325_SeatMap-GulfAir-KSA-Round18.md).

## 💥 Impact

Downstream cannot compute when a hold lapses, the expired-hold cases (TC-SEATAFTERHOLD-NEG-02) cannot be built, and the held bookings left by this run (ORVBTX, TFBYUM, OODMJW, TFXRXD) have no known expiry to wait for.
