# [V2][GulfAir][GetSeatMap] – ResponseId Not Enforced as Required in GetSeatMap Request (8th Confirmation)

## 📄 Description

`GetSeatMap` documents `ResponseId` as required, but a request that omits it still returns HTTP 200 with the full seat map; the other three mandatory fields (`supplier`, `credentialsSelector`, `selectedOfferId`) are rejected with 400. **Not a new defect** - the existing `BUG-02`, now confirmed for the **8th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3, 5, 6 | 2026-08-25 – 09-06 | FAIL – omitted ResponseId accepted (Round 4: not reproduced) |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – 200 with 30 rows |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – 200 with 23 rows |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-06-27 → `FareConfirm` → `AddPassenger`.
2. `GetSeatMap` with `supplier`, `credentialsSelector` and `selectedOfferId` but **no** `ResponseId`.

## ❌ Actual Result

```json
{
  "status": 200,
  "seatMapDetails": {
    "GF-GF161-GF161-2027062702-2027062704-O": {
      "rows": "[23 rows]"
    }
  }
}
```

HTTP 200 with the complete seat map. Omitting `supplier`, `credentialsSelector` or `selectedOfferId` returns a 400 validation error naming the field.

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

`ResponseId` is a documented required field (SPEC.md §2.7, §8.1) and must be enforced like the other three.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `a1bd5847-2132-426c-a832-fec93546db0c`

## 📊 Severity

**Low** — a documented required field is not enforced, but the request still returns correct data for the offer named by `selectedOfferId`.

## 📎 Evidence

**Actual response (redacted):**

```json
// GetSeatMap without ResponseId
HTTP 200, 23 rows, 138 seat cells
```

**Expected response (redacted):**

```json
HTTP 400, errorCode 1001, context ResponseId "The ResponseId field is required."
```

Source: `TC-SEATMAP-NEG-04` in [QA report](../../Logs/20261010-152325_SeatMap-GulfAir-KSA-Round18.md).

## 💥 Impact

A required field is not enforced, so integrations that forget `ResponseId` work by accident and the documented contract cannot be trusted.
