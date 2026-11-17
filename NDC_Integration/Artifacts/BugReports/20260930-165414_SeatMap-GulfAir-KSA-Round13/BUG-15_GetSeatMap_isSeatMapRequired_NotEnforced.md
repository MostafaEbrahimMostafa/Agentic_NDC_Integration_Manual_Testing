# [V2][GulfAir][GetSeatMap] – isSeatMapRequired=false Not Enforced - Seat Map Returned for an Offer That Is Not Flagged (7th Confirmation)

## 📄 Description

For offers whose `FareConfirm` reports `isSeatMapRequired: false`, `GetSeatMap` still returns HTTP 200 with a complete seat map. **Not a new defect** - the existing `BUG-15`, failing since Round 1 and confirmed for the **7th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – 200 with populated seatMapDetails (filed as BUG-15 from Round 5) |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – 200 on two independent offers |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-06-10 → `FareConfirm`. Note `selectedOffer.isSeatMapRequired` is `false` (it is `false`, with `haveBundles: false`, on all 51 FareConfirm calls this round).
2. `AddPassenger`.
3. `GetSeatMap` with AddPassenger's `ResponseId`/`selectedOfferId`.

## ❌ Actual Result

```json
{
  "isFareCheckRequired": false,
  "seatMapDetails": {
    "GF-GF161-GF161-2027061002-2027061004-O": {
      "rows": "[30 rows, 174 seat cells]"
    }
  }
}
```

HTTP 200 with a fully populated seat map for an offer flagged `isSeatMapRequired: false`; the same on a second independent offer (BAH→JED, 161 seat cells).

## ✅ Expected Result

```json
{
  "status": 409,
  "errorCode": "OperationNotSupported",
  "errorMessage": "This action is not currently supported for this offer."
}
```

SPEC.md §2.7 documents GetSeatMap as gated by `isSeatMapRequired` and lists "requesting for an offer with isSeatMapRequired: false" as a common error. A rejection or an explicit not-supported envelope (as GetOfferBundles returns for `haveBundles=false`) is expected instead of a normal 200.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `d068eee2-a9f7-456a-bc88-f054ad15936b`

## 📊 Severity

**Low** — the flag cannot be trusted to decide whether to show seat selection, but the data returned is real and no booking is affected.

## 📎 Evidence

**Actual response (redacted):**

```json
// FareConfirm
"isSeatMapRequired": false, "haveBundles": false
// GetSeatMap
HTTP 200, seatMapDetails populated (174 seat cells)
```

**Expected response (redacted):**

```json
HTTP 4xx / explicit OperationNotSupported envelope, no seatMapDetails
```

Source: `TC-SEATMAP-NEG-01` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

Callers cannot tell whether seat selection is genuinely offered for an offer: the flag says no, the endpoint says yes. Either the flag is wrong for GulfAir or the endpoint is missing its gate; both need a decision before seat selection is exposed to travellers.
