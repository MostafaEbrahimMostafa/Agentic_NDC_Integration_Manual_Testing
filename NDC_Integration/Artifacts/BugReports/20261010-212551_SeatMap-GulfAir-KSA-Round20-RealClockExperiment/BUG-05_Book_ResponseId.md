# [V2][GulfAir][Book] – ResponseId Not Enforced as Required in Book Request; Ticketed PNR Created (9th Confirmation)

## 📄 Description

`Book` documents `ResponseId` as required, but a `Book` request that omits it is accepted and creates a real, ticketed PNR; the other three mandatory fields (`selectedOfferId`, `supplier`, `credentialsSelector`) are rejected with 400. **Not a new defect** - the existing `BUG-05`, now confirmed for the **9th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – omitted ResponseId accepted, PNR created |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – pnr OWUAIY |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – reproduced (see the Round 18 report) |
| 19 | 2026-10-10 | Not exercised (Round 19 was a targeted 6-case run) |
| 20 | 2026-10-10 | FAIL – pnr THQOIB |

## 🔁 Steps to Reproduce

1. `Search` BAH→JED 2027-03-23 → `FareConfirm` → `AddPassenger`.
2. `Book` with `selectedOfferId` (AddPassenger's), `supplier` and `credentialsSelector` but **no** `ResponseId`. Repeat on fresh offers omitting `selectedOfferId`, `supplier`, `credentialsSelector` in turn.

## ❌ Actual Result

```json
{
  "pnr": "THQOIB",
  "tickets": {
    "PAX1": {
      "ticketStatus": "Booked",
      "ticketNumber": "722137003982"
    }
  },
  "selectedOffer": {
    "priceDetails": {
      "totalAmount": {
        "amount": 843,
        "currency": "SAR"
      }
    }
  }
}
```

HTTP 200 after 28.9 seconds: a real booking was created and ticketed although `ResponseId` was missing. The three other omissions returned 400 (omit selectedOfferId: NDC-INT-TEC-A0001 "The selected offer is invalid, expired, or could not be found"; omit supplier/credentialsSelector: errorCode 1001).

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

`ResponseId` is a documented required field (SPEC.md §2.9, §7.7, §8.1); the request must be rejected and no PNR created.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `867725f7-745a-42cd-b973-79866663ad45`

## 📊 Severity

**Medium** — a documented required field is unenforced on the highest-blast-radius endpoint, and the malformed request still creates a real ticketed booking.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book without ResponseId
HTTP 200, pnr THQOIB, ticket 722137003982
```

**Expected response (redacted):**

```json
HTTP 400, errorCode 1001, context ResponseId required, no PNR
```

Source: `TC-BOOK-NEG-12` in [QA report](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md).

## 💥 Impact

A required field is unenforced on the highest-blast-radius endpoint, and a malformed request still produces a real ticketed booking. Booking `THQOIB` is evidence - keep until triaged, then cancel.
