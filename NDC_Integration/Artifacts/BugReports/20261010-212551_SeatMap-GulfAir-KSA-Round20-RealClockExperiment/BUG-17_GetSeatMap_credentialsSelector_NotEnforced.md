# [V2][GulfAir][GetSeatMap] – credentialsSelector Not Enforced - Offer Created Under KSA Readable Through UAE (6th Confirmation)

## 📄 Description

`GetSeatMap` does not reject a request whose `credentialsSelector` differs from the one the offer was created under (same supplier GulfAir, selector switched KSA → UAE). **Not a new defect** - the existing `BUG-17`, now confirmed for the **6th time**.

## History

| Round | Date | Result |
|---|---|---|
| 11 | 2026-09-29 | FAIL – first seen |
| 12 | 2026-09-30 | FAIL |
| 13 | 2026-09-30 | FAIL |
| 17 | 2026-10-10 | FAIL |
| 18 | 2026-10-10 | FAIL – reproduced (see the Round 18 report) |
| 19 | 2026-10-10 | Not exercised (Round 19 was a targeted 6-case run) |
| 20 | 2026-10-10 | FAIL – 200 with the full seat map |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-04-18 with `supplier` GulfAir / `credentialsSelector` KSA → `FareConfirm` → `AddPassenger`.
2. `GetSeatMap` with the same IDs and `credentialsSelector` **UAE** (supplier GulfAir). Control: same call with KSA returns 200.
3. For comparison, switch the supplier to TravelportNdc/UAE: 400 NDC-INT-TEC-A0001.

## ❌ Actual Result

```json
{
  "status": 200,
  "seatMapDetails": "[23 rows, 138 seat cells]",
  "responseId": "b069cf4b-d2e4-48b2-a87b-4af843515dbc"
}
```

The KSA offer is readable through the UAE selector with a 200 and the same responseId.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "NDC-INT-TEC-A0001",
  "errorMessage": "Invalid request. Please check the request parameters and try again.",
  "context": [
    {
      "name": "SelectedOfferId",
      "value": "The selected offer is invalid, expired, or could not be found."
    }
  ]
}
```

An offer created under one `credentialsSelector` must not be readable through another (SPEC.md §7.14), as already happens when the supplier is switched.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `f3aed533-0be7-45ff-90a4-ede5821ac670`

## 📊 Severity

**Medium** — credentialsSelector is the per-tenant boundary; isolation currently rests only on offer IDs being unguessable.

## 📎 Evidence

**Actual response (redacted):**

```json
// GetSeatMap, offer from GulfAir/KSA, request GulfAir/UAE
HTTP 200, full seat map
```

**Expected response (redacted):**

```json
HTTP 400 NDC-INT-TEC-A0001 (as for the supplier switch)
```

Source: `TC-SEATMAP-SEC-01` in [QA report](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md).

## 💥 Impact

A caller holding an `offerId`/`responseId` from one tenant (KSA) can read that offer's seat map through another tenant's selector (UAE), so cross-tenant isolation rests only on offer IDs being unguessable. Other offer-consuming endpoints were not tested.
