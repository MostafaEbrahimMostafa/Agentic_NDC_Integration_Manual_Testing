# [V2][GulfAir][GetSeatMap] – ResponseId/selectedOfferId Mismatch Accepted in GetSeatMap Request (7th Confirmation)

## 📄 Description

`GetSeatMap` accepts a `ResponseId` from one offer combined with a `selectedOfferId` from a different offer and returns a full seat map. **Not a new defect** - the existing `BUG-01`, now confirmed for the **7th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3 | 2026-08-25 – 08-30 | FAIL – accepted with HTTP 200 |
| 4 | 2026-08-30 | BLOCKED – GetSeatMap outage |
| 5, 6 | 2026-08-30 – 09-06 | FAIL – accepted with HTTP 200 |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – accepted with HTTP 200 in both directions |

## 🔁 Steps to Reproduce

1. Chain A: `Search` BAH→RUH 2027-06-10 → `FareConfirm` → `AddPassenger`. Keep its `responseId` and `offerId`.
2. Chain A2 (independent): the same three calls for BAH→JED 2027-06-13. Keep its `responseId` and `offerId`.
3. `POST api/V2/SeatMap/Seat` with chain A's `ResponseId` and chain A2's `selectedOfferId`; then the reverse pairing.

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

HTTP 200 in both directions. Run 1 (chain A `ResponseId` + chain A2 `selectedOfferId`) returned the BAH→JED map (28 rows); run 2 returned the BAH→RUH map (30 rows). The result follows `selectedOfferId`; `ResponseId` is ignored.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "The selected offer does not belong to the provided ResponseId."
}
```

A ResponseId/selectedOfferId pair that does not belong together should be rejected (SPEC.md §2.7, §7.7). The exact code is still UNKNOWN - it has never been observed because the server never rejects.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `1b7c9bb4-0064-4695-9bb7-b3f43a4fd156`

## 📊 Severity

**Medium** — read-only data is returned for the wrong offer and a mixed-up identifier pair is silently accepted, but no booking or money is involved.

## 📎 Evidence

**Actual response (redacted):**

```json
// run 1: ResponseId(chain A) + selectedOfferId(chain A2)
HTTP 200, responseId a299667c-..., seatMapDetails GF-GF181 (JED), 28 rows
// run 2: ResponseId(chain A2) + selectedOfferId(chain A)
HTTP 200, seatMapDetails GF-GF161 (RUH), 30 rows
```

**Expected response (redacted):**

```json
HTTP 4xx validation error, no seatMapDetails
```

Source: `TC-SEATMAP-NEG-02` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

`ResponseId` gives no protection against identifier mix-ups: a client that pairs the wrong response with an offer gets another itinerary's seat map with no error, and it can then select seats that belong to the wrong flight.
