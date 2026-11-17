# [V2][GulfAir][Hold] – holdExpirationDate Returned as Null in Hold Response (7th Confirmation)

## 📄 Description

The field `holdExpirationDate` is returned as `null` in the `Hold` response for GulfAir on every call, so a Held booking has no known expiry. **Not a new defect** - the existing `BUG-04`, now confirmed for the **7th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – null on every Hold |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – null on 6 of 6 Holds |

## 🔁 Steps to Reproduce

1. `Search` BAH→CAI 2027-05-18 (1 ADT) → `FareConfirm` → `AddPassenger`.
2. `Hold` with `fareConfirmResponseId`, `selectedOfferId` (AddPassenger's), `supplier`, `credentialsSelector`.
3. Inspect `holdExpirationDate` (also `null` on `Retrieve` of the OnHold booking).

## ❌ Actual Result

```json
"holdExpirationDate": null
```

Null on all 6 Holds this round (OTANEN, OOESWB, OWRLBM, OODBGD, OWZVVL, RKECRA) and on Retrieve.

## ✅ Expected Result

```json
"holdExpirationDate": "2026-10-01T14:32:10Z"
```

A Family-B hold must expose when it lapses (SPEC.md §2.10, §6.3) so that expiry tracking, cleanup and the expired-hold negative tests can work.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `56abebcd-3a0b-44bc-a22e-f4aa506104ad`

## 📊 Severity

**Medium** — non-blocking, but expiry tracking and cleanup of held bookings cannot run without the value.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "OTANEN",
  "holdExpirationDate": null
}
```

**Expected response (redacted):**

```json
{
  "pnr": "OTANEN",
  "holdExpirationDate": "2026-10-01T14:32:10Z"
}
```

Source: `TC-SEATAFTERHOLD-NEG-02` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

Downstream cannot compute when a hold lapses, the expired-hold cases (TC-SEATAFTERHOLD-NEG-02) cannot be built, and the held bookings left by this run (OTANEN, OOESWB, RKECRA) have no known expiry to wait for.
