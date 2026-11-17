# [V2][GulfAir][GetSeatMap] – ResponseId Not Enforced as Required in GetSeatMap Request (7th Confirmation)

## 📄 Description

`GetSeatMap` documents `ResponseId` as required, but a request that omits it succeeds with HTTP 200 and a full seat map. **Not a new defect** - the existing `BUG-02`, now confirmed for the **7th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3 | 2026-08-25 – 08-30 | FAIL – accepted with HTTP 200 |
| 4 | 2026-08-30 | PASS – not reproduced |
| 5, 6 | 2026-08-30 – 09-06 | FAIL – accepted with HTTP 200 |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – accepted with HTTP 200 |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-06-10 → `FareConfirm` → `AddPassenger`.
2. `POST api/V2/SeatMap/Seat` with `supplier`, `credentialsSelector`, `selectedOfferId` from AddPassenger, and **no** `ResponseId`.
3. For comparison, repeat with each of `supplier`, `credentialsSelector` and `selectedOfferId` omitted in turn.

## ❌ Actual Result

```json
{
  "supplier": "GulfAir",
  "responseId": "00000000-0000-0000-0000-000000000000",
  "seatMapDetails": {
    "GF-GF161-GF161-2027061002-2027061004-O": {
      "rows": "[30 rows]"
    }
  }
}
```

HTTP 200 with the complete seat map; the response even carries an all-zero `responseId`. The other three omissions return 400 (errorCode 1001, naming the missing field).

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    {
      "name": "ResponseId",
      "value": "The ResponseId field is required."
    }
  ]
}
```

A field documented as required (SPEC.md §2.7, §8.1 item 2) must be rejected when missing, exactly as `supplier`, `credentialsSelector` and `selectedOfferId` already are.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `4d53fb50-d342-41e1-8aed-dc573b355bd6`

## 📊 Severity

**Low** — a documented required field is not enforced, but the request still resolves to the correct offer through `selectedOfferId`, so the impact is a contract gap rather than wrong data.

## 📎 Evidence

**Actual response (redacted):**

```json
// omit ResponseId
HTTP 200, "responseId": "00000000-0000-0000-0000-000000000000", 30 rows
// omit supplier / credentialsSelector / selectedOfferId
HTTP 400, errorCode 1001
```

**Expected response (redacted):**

```json
HTTP 400, errorCode 1001, context ResponseId "The ResponseId field is required."
```

Source: `TC-SEATMAP-NEG-04` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

Integrations that forget `ResponseId` work by accident, and the documented contract cannot be trusted. The zero-GUID `responseId` returned in that case would also break any client that uses the response's `responseId` for the next call.
