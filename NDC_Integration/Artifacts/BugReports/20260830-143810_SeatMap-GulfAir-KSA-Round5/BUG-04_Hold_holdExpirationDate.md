# [V2][GulfAir][Hold] – holdExpirationDate Always Null

## 📄 Description

`Hold`'s `holdExpirationDate` field is returned as `null` on every Hold call for GulfAir/KSA,
regardless of route, passenger count, or whether a seat is inline-attached (`BUG-08`). This is the
**5th consecutive round** this defect has reproduced, reconfirmed this round on 3 independent fresh
Holds.

## 🔁 Steps to Reproduce

1. `AddPassenger` for a GulfAir/KSA offer.
2. `Hold` with `fareConfirmResponseId`/`selectedOfferId` from AddPassenger.
3. Inspect `holdExpirationDate` in the response.

## ❌ Actual Result

```json
{ "pnr": "RVQUIZ", "gdsPNR": "", "bookingToken": "...", "holdExpirationDate": null }
```
(reproduced identically on pnr `RVQUIZ`, `RTWPNJ`, and `RMCNEV` this round)

## ✅ Expected Result

```json
{ "pnr": "RVQUIZ", "holdExpirationDate": "2026-08-31T14:38:10Z" }
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

**Medium** — the Hold itself succeeds and is otherwise usable, but downstream logic that depends on
a real expiry timestamp (cleanup automation, `SeatAfterHold`'s own expired-hold negative test,
customer-facing "hold expires at" messaging) cannot function.

## 📎 Evidence

pnr `RVQUIZ` (BAH-CAI 2027-01-22), `RTWPNJ` (BAH-DXB 2027-01-25), `RMCNEV` (BAH-RUH 2027-01-28,
BUG-08 evidence) — all three returned `holdExpirationDate: null`.

## 💥 Impact

Confirmed unchanged across every round to date. This also doubly-blocks
`TC-SEATAFTERHOLD-NEG-02` (expired-hold negative test), since there is no real expiry timestamp to
wait out or assert against.
