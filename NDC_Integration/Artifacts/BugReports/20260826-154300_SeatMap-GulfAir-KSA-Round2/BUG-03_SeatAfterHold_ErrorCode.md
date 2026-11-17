# [V2][GulfAir][SeatAfterHold] – ErrorCode Returned Incorrect Value ("Supplier Does Not Exist") in SeatAfterHold Response

## 📄 Description

`SeatAfterHold` rejects every call for `supplier=GulfAir` with HTTP 409
`OperationNotSupported`, `Context: "GulfAir does not exists"` — even though GulfAir is a fully
working supplier on every other endpoint exercised in this run (Search, FareConfirm, AddPassenger,
GetSeatMap, Hold, Book, Retrieve, and a Retrieve against the exact PNR used for this test). Second-run
reproduction of a Round 1 (2026-08-25) finding, unchanged one day later, confirmed against a
completely fresh Hold PNR.

## 🔁 Steps to Reproduce

1. `Hold` for GulfAir/KSA (BAH-RUH, 2026-11-19) → record `pnr`, `gdsPNR`, `bookingToken`.
2. `POST api/v2/SeatMap/SeatAfterHold` with `{"supplier":"GulfAir","credentialsSelector":"KSA","pnr":"<pnr>","gdsPNR":"<gdsPNR>","bookingToken":"<bookingToken>","surName":"Ibrahim"}`.

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
{ "Status": 200, "seatMapDetails": { "...": "a seat-selection response analogous to GetSeatMap's, scoped to the Held PNR" } }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `67bda0d5-f405-4ca8-abfe-f2959d20bc4c`

## 📊 Severity

**Critical** — this outright blocks the entire Hold-branch seat-selection story for GulfAir. Since
Hold's `holdExpirationDate` is also broken (BUG-04) and Hold itself already silently accepts seats
directly (BUG-08), `SeatAfterHold` — the one endpoint SPEC.md documents as the correct mechanism for
attaching a seat to a Held GulfAir booking — is completely non-functional for this supplier.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "Context": [{ "Name": "OperationNotSupported", "Value": "GulfAir does not exists" }]
}
```

**Expected response (redacted):**

```json
{ "Status": 200, "seatMapDetails": { "...": "..." } }
```

## 💥 Impact

Any Hold-branch flow that needs to attach a seat for GulfAir (SPEC.md flow 50 and the SM-Hold
candidate flows) is completely blocked. The error message's literal wording ("GulfAir does not
exists") — while every other endpoint accepts GulfAir normally in the same run — strongly suggests a
supplier-adapter registration gap specific to the `SeatAfterHold` route/handler, not a genuine
capability limitation of GulfAir itself.
