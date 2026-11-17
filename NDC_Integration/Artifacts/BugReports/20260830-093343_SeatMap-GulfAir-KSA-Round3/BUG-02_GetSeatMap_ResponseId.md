# [V2][GulfAir][GetSeatMap] – ResponseId Not Enforced as Required in GetSeatMap Request

## 📄 Description

`GetSeatMap` documents `ResponseId` as a required request field (alongside `supplier`,
`credentialsSelector`, `selectedOfferId`), but a request that omits it entirely still succeeds with
HTTP 200 and returns a fully populated seat map — `selectedOfferId` alone is apparently sufficient.
This is the **3rd consecutive round** this defect has reproduced identically.

## 🔁 Steps to Reproduce

1. `AddPassenger` for a GulfAir/KSA offer; capture `getAddPaxOfferId`/`getAddPaxResponceID`.
2. `GetSeatMap` with `supplier`, `credentialsSelector`, `selectedOfferId` all present, but
   `ResponseId` omitted entirely from the JSON body.

## ❌ Actual Result

```json
{ "status": 200, "seatMapDetails": "<fully populated, 196KB response body>" }
```

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "context": [{ "name": "ResponseId", "value": "Select a valid ResponseId" }]
}
```

(matching the identical, correctly-enforced 400 shape already returned when `supplier`,
`credentialsSelector`, or `selectedOfferId` is omitted from the same request.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**Medium** — this weakens the documented two-factor offer/response binding but does not by itself
create a booking or leak data; it compounds with BUG-01 (cross-offer acceptance) and BUG-05 (the
same non-enforcement pattern on `Book`, which does create real bookings).

## 📎 Evidence

**Actual response (redacted):**

```json
{ "status": 200, "seatMapDetails": "<populated>" }
```

**Expected response (redacted):**

```json
{ "status": 400, "errorCode": "1001", "context": [{ "name": "ResponseId", "value": "Select a valid ResponseId" }] }
```

## 💥 Impact

3 of 4 mandatory fields (`supplier`, `credentialsSelector`, `selectedOfferId`) are correctly enforced
with a clean 400; only `ResponseId` is silently optional. Combined with BUG-05 (the same gap on
`Book`), this suggests `ResponseId` may not be load-bearing server-side at all for GulfAir once
`selectedOfferId` is present — worth confirming with the platform team whether `ResponseId` should be
removed from the documented required-fields list, or whether its enforcement is simply missing and
should be added.
