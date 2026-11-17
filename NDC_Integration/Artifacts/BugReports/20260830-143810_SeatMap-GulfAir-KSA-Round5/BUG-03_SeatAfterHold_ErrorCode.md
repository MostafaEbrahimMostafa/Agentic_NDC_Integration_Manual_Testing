# [V2][GulfAir][SeatAfterHold] – Endpoint Rejects GulfAir Outright ("GulfAir does not exists")

## 📄 Description

`SeatAfterHold` rejects every call for `supplier=GulfAir` with HTTP 409 `OperationNotSupported`,
regardless of request content, position in the Hold-branch chain, or identity-field correctness.
This is the **5th consecutive round** this defect has reproduced, reconfirmed again this round
against a brand-new, independently-created Hold.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `Hold` for a GulfAir/KSA offer (BAH-CAI, 2027-01-22). Capture `pnr`, `gdsPNR`,
   `bookingToken`.
2. `SeatAfterHold` with `supplier=GulfAir`, `credentialsSelector=KSA`, the Hold's `pnr`/`gdsPNR`/
   `bookingToken`, and `surName="Ibrahim"`.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "253cdbe2-ed5e-4928-83f0-a87b3071ef56",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [{ "Name": "OperationNotSupported", "Value": "GulfAir does not exists" }]
}
```

## ✅ Expected Result

Either `SeatAfterHold` succeeds and returns a seat-selection response for GulfAir, or the endpoint's
lack of GulfAir support is a documented, intentional per-supplier gap rather than an internal
"does not exists" error message that reads as a configuration/data defect.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `253cdbe2-ed5e-4928-83f0-a87b3071ef56`

## 📊 Severity

**High** — this endpoint is entirely non-functional for GulfAir, and the Hold-branch has no
dedicated, spec-compliant seat-selection path for this supplier (the only way a seat gets attached
to a GulfAir hold is the undocumented `BUG-08` inline-`passengersSelectedSeats`-on-Hold behavior).

## 📎 Evidence

pnr `RVQUIZ` (BAH-CAI 2027-01-22), TransactionId `253cdbe2-ed5e-4928-83f0-a87b3071ef56`. A second,
mismatched-identity variant (pnr from one Hold, `bookingToken`/`gdsPNR` from an unrelated second
Hold, pnr `RTWPNJ`) produced the identical rejection, confirming the 409 fires before any
identity-matching logic runs at all.

## 💥 Impact

Confirmed unchanged across Round 1, Round 2, Round 3, Round 4, and now Round 5 — every candidate
chain position (`FLOW-V2-CANDIDATE-SM-HOLD-01/02/03`) is blocked identically, since the rejection is
supplier-level, not state- or position-dependent.
