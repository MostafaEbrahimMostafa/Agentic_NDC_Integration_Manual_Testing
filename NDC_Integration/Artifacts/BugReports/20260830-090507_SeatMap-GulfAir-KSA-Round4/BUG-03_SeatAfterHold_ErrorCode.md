# [V2][GulfAir][SeatAfterHold] – Endpoint Rejects GulfAir Outright with "GulfAir does not exists"

## 📄 Description

`SeatAfterHold` rejects every call for `supplier=GulfAir` with HTTP 409
`OperationNotSupported`/`GulfAir does not exists`, while every other endpoint in the API (Search,
FareConfirm, AddPassenger, Hold, Book, Retrieve) accepts GulfAir normally, including a `Hold` against
the exact same PNR immediately before this call. This is the **4th consecutive round** this defect
has reproduced with byte-identical wording, now against a brand-new fresh Hold created specifically
without going through GetSeatMap (to isolate this test from this round's separate GetSeatMap outage,
see BUG-14).

## 🔁 Steps to Reproduce

1. `Search` → `FareConfirm` → `AddPassenger` → `Hold` for GulfAir/KSA. Capture `pnr`, `gdsPNR`,
   `bookingToken`.
2. `SeatAfterHold` with `supplier=GulfAir`, `credentialsSelector=KSA`, the Hold's `pnr`/`gdsPNR`/
   `bookingToken`, and `surName` matching the passenger.

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [{ "Name": "OperationNotSupported", "Value": "GulfAir does not exists" }]
}
```

## ✅ Expected Result

```json
{ "status": 200, "seatMapDetails": "<or whatever the endpoint's real success shape is, once discovered>" }
```

(GulfAir is a supplier the rest of the API recognizes and services normally; `SeatAfterHold` should
either work for it or fail with a supplier-neutral reason, not a "supplier does not exist" message
for a supplier that plainly does exist.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `ae51b087-f559-49b5-a4f1-8ff55393ef29`

## 📊 Severity

**High** — the entire Hold-branch (Family B) seat-selection path remains unusable for GulfAir for
the 4th consecutive round; combined with BUG-08 (Hold silently accepting seats directly, undocumented
— not re-verified this specific round due to the concurrent GetSeatMap outage, see BUG-14, but last
confirmed in Round 3), GulfAir customers on the Hold branch can only get a seat attached through an
unsupported side-channel.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 409, "ErrorCode": "OperationNotSupported", "Context": [{ "Value": "GulfAir does not exists" }] }
```

**Expected response (redacted):** `{ "status": 200 }` or a supplier-neutral rejection reason.

## 💥 Impact

Confirmed unchanged across Round 1 (2026-08-25), Round 2 (2026-08-26), Round 3 (2026-08-30), and now
Round 4 (2026-08-30, same-day recurring pass) — same status code, same `ErrorCode`, same literal
`Context` string, on a 4th independently-created fresh Hold PNR (this round: `RXFVNC`). Also
re-confirmed that a mismatched pnr/bookingToken pair (from a second, unrelated Hold, pnr `RAHAQQ`)
hits the identical supplier-level 409 rather than a distinct mismatch-specific error — the rejection
happens before any identity-matching logic is reached. This continues to look like a supplier-name
resolution bug specific to this one endpoint's implementation (every other endpoint resolves
`GulfAir` correctly), not a genuine capability gap — recommend the dev team check `SeatAfterHold`'s
own supplier-lookup code path specifically.
