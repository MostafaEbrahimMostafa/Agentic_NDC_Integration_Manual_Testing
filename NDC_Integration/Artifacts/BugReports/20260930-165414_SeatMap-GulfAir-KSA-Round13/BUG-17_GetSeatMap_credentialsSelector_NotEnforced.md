# [V2][GulfAir][GetSeatMap] – credentialsSelector Not Enforced - Offer Created Under KSA Readable Through UAE (3rd Confirmation)

## 📄 Description

`GetSeatMap` does not reject a request whose `credentialsSelector` differs from the one the offer was created under. **Not a new defect** - the existing `BUG-17`, now confirmed for the **3rd time** (Rounds 11, 12 and 13).

## History

| Round | Date | Result |
|---|---|---|
| 11 | 2026-09-29 | FAIL – GulfAir/UAE selector accepted, full seat map returned |
| 12 | 2026-09-30 | FAIL – same |
| 13 | 2026-09-30 | FAIL – same |

## 🔁 Steps to Reproduce

1. `Search` → `FareConfirm` → `AddPassenger` under `supplier: GulfAir`, `credentialsSelector: KSA` (BAH→JED 2027-06-13).
2. `GetSeatMap` with the same `ResponseId`/`selectedOfferId` but `credentialsSelector: UAE` (still `supplier: GulfAir`).
3. For comparison, switch the supplier to `TravelportNdc`/`UAE`, and try an invalid `x-api-key` and `Client-Id`.

## ❌ Actual Result

```json
{
  "responseId": "a299667c-de28-4104-9469-5a59056d7909",
  "seatMapDetails": {
    "GF-GF181-GF181-2027061301-2027061304-O": {
      "rows": "[28 rows]"
    }
  }
}
```

HTTP 200 with the full seat map (same `responseId`) for an offer created under KSA. A different supplier is rejected (400 `NDC-INT-TEC-A0001`), and a bad key or Client-Id gets 401 - only the selector switch slips through.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "SelectedOfferId",
      "Value": "Failed to deserialize the selected offer"
    }
  ]
}
```

SPEC.md §7.14 describes supplier/credentialsSelector as the API's implicit authorization boundary; an offer created under one selector must not be readable through another, as already happens when the supplier is switched.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `61c98292-d73c-46c0-a9aa-e4e6f3a6212d`

## 📊 Severity

**Medium** — an authorization boundary is not enforced, although only seat-map data is exposed and the offer ID is unguessable. Other offer-consuming endpoints were not tested.

## 📎 Evidence

**Actual response (redacted):**

```json
// credentialsSelector KSA -> UAE, supplier GulfAir
HTTP 200, responseId a299667c-..., 28 rows
// supplier TravelportNdc/UAE
HTTP 400 NDC-INT-TEC-A0001
```

**Expected response (redacted):**

```json
HTTP 400 for the selector switch, same as for the supplier switch
```

Source: `TC-SEATMAP-SEC-01` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

Cross-tenant isolation depends solely on offer IDs being unguessable. A caller holding an offerId/responseId from one tenant (KSA) can read that offer's seat map through another tenant's selector (UAE). Whether Book, GetAncillary and FareCheck have the same gap is unknown and worth checking.
