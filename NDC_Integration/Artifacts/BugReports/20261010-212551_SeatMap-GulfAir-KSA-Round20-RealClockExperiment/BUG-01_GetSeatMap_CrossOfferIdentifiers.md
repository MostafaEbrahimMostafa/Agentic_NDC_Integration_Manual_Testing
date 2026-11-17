# [V2][GulfAir][GetSeatMap] – ResponseId/selectedOfferId Mismatch Accepted in GetSeatMap Request (9th Confirmation)

## 📄 Description

`GetSeatMap` accepts a `ResponseId` and a `selectedOfferId` taken from two **different** offers and returns a full seat map; the result follows `selectedOfferId` and `ResponseId` is ignored. **Not a new defect** - the existing `BUG-01`, now confirmed for the **9th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3, 5, 6 | 2026-08-25 – 09-06 | FAIL – mismatched pair accepted |
| 4 | 2026-08-30 | BLOCKED – GetSeatMap outage |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised (Round 10 and 12 targeted other cases) |
| 13 | 2026-09-30 | FAIL – both pairings accepted |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – reproduced (see the Round 18 report) |
| 19 | 2026-10-10 | Not exercised (Round 19 was a targeted 6-case run) |
| 20 | 2026-10-10 | FAIL – both pairings accepted |

## 🔁 Steps to Reproduce

1. Chain A: `Search` BAH→RUH 2027-04-18 → `FareConfirm` → `AddPassenger` (offer A).
2. Chain A2: `Search` BAH→JED 2027-04-19 → `FareConfirm` → `AddPassenger` (offer A2).
3. `GetSeatMap` with `ResponseId` from chain A and `selectedOfferId` from chain A2; then the reverse pairing.

## ❌ Actual Result

```json
{
  "run1": {
    "status": 200,
    "flight": "GF181 BAH-JED 2027-04-19",
    "rows": 28,
    "seatCells": 161
  },
  "run2": {
    "status": 200,
    "flight": "GF161 BAH-RUH 2027-04-18",
    "rows": 23,
    "seatCells": 138
  }
}
```

Both mismatched pairings return HTTP 200 with a complete seat map. Run 1 (ResponseId of A + offer of A2) returns the BAH→JED map; run 2 (ResponseId of A2 + offer of A) returns the BAH→RUH map - the map always follows `selectedOfferId`.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "ResponseId does not match selectedOfferId."
}
```

A `ResponseId`/`selectedOfferId` pair that does not belong together must be rejected (SPEC.md §2.7, §7.7). The exact error code is UNKNOWN because the server never rejects.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `5c5ad34e-67fc-4201-a5d6-a51622559753`

## 📊 Severity

**Medium** — the request completes with a wrong itinerary's data instead of failing, but no booking or money is affected by the seat map read itself.

## 📎 Evidence

**Actual response (redacted):**

```json
// GetSeatMap (ResponseId A, selectedOfferId A2)
HTTP 200, GF181 BAH-JED 2027-04-19, 28 rows
// GetSeatMap (ResponseId A2, selectedOfferId A)
HTTP 200, GF161 BAH-RUH 2027-04-18, 23 rows
```

**Expected response (redacted):**

```json
HTTP 4xx validation error, no seatMapDetails
```

Source: `TC-SEATMAP-NEG-02` in [QA report](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md).

## 💥 Impact

The pair is not cross-validated, so a wrong or mixed-up identifier pair silently returns another itinerary's seat map instead of failing, and `ResponseId` adds no protection.
