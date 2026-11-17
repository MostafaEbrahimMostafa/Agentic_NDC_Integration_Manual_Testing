# [V2][GulfAir][Hold] – holdExpirationDate Returned as Null in Hold Response

## 📄 Description

The field `holdExpirationDate` is returned as `null` in the `Hold` response for GulfAir/KSA on every
Hold call attempted this round (and every round before it). This field should contain a valid
ISO-8601 datetime to allow callers to know when a Held booking expires. This is the **4th
consecutive round** this defect has reproduced.

## 🔁 Steps to Reproduce

1. `Search` → `FareConfirm` → `AddPassenger` for GulfAir/KSA.
2. `Hold` with `fareConfirmResponseId`/`selectedOfferId` from step 1.
3. Inspect `holdExpirationDate` in the `Hold` response.

## ❌ Actual Result

```json
"holdExpirationDate": null
```

Confirmed on 2 fresh Holds this round: `RXFVNC` and `RAHAQQ` (both one-way, both created
independently of GetSeatMap to isolate this test from this round's separate GetSeatMap outage — see
BUG-14).

## ✅ Expected Result

```json
"holdExpirationDate": "2026-08-30T12:33:43.000Z"
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**Medium** — non-blocking (Hold still succeeds and produces a usable PNR), but breaks every
downstream consumer that needs to compute or track a Held booking's expiry — including this QA
suite's own cleanup/expiry tracking, and any real caller's own hold-management UI.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "RXFVNC", "holdExpirationDate": null }
```

**Expected response (redacted):**

```json
{ "pnr": "RXFVNC", "holdExpirationDate": "2026-08-30T12:33:43.000Z" }
```

## 💥 Impact

Confirmed unchanged across Round 1, Round 2, Round 3, and now Round 4 on at least 9 distinct fresh
Hold PNRs total across the four rounds. Every downstream expiry-dependent test case
(`TC-SEATAFTERHOLD-NEG-02`, the FareConfirmAfterHold price-drift exploratory case) remains blocked by
this same root cause. Recommend the dev team confirm whether GulfAir's adapter is even receiving a
TTL value from the supplier back end, or whether the mapping from the supplier's native response into
this field is simply missing.
