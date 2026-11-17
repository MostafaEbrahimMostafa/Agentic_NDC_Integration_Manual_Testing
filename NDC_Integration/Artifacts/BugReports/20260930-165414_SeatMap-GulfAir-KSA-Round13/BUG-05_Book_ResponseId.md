# [V2][GulfAir][Book] – ResponseId Not Enforced as Required in Book Request; Ticketed PNR Created (7th Confirmation)

## 📄 Description

`Book` documents `ResponseId` as required, but a request that omits it is accepted and creates a real, ticketed PNR. **Not a new defect** - the existing `BUG-05`, now confirmed for the **7th time**. The other three mandatory fields (`selectedOfferId`, `supplier`, `credentialsSelector`) are rejected with clean 400s, so BUG-13 (500 on omission) stays resolved.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 4 | 2026-08-25 – 08-30 | FAIL – ticketed PNR created without ResponseId |
| 5, 6 | 2026-08-30 – 09-06 | FAIL – same (recorded as a set-aside sub-case) |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – same, pnr OWUAIY |

## 🔁 Steps to Reproduce

1. `Search` BAH→JED 2027-05-09 (1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap`.
2. `Book` with `supplier`, `credentialsSelector`, `selectedOfferId` (GetSeatMap's) and **no** `ResponseId`.

## ❌ Actual Result

```json
{
  "pnr": "OWUAIY",
  "bookingToken": "TPC60517146724D3092026",
  "tickets": {
    "PAX1": {
      "ticketStatus": "Booked",
      "ticketNumber": "722136997208",
      "carrierCode": "GF"
    }
  }
}
```

HTTP 200 after 35 seconds with a real ticketed booking. Omitting `selectedOfferId` returns 400 `NDC-INT-TEC-A0001`; omitting `supplier` or `credentialsSelector` returns 400 errorCode 1001.

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

A field documented as required (SPEC.md §2.9, §7.7, §8.1 item 2) must be rejected when missing, with no PNR created.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `25ab9cc6-9b77-40b4-9d50-d02722ca9bfc`

## 📊 Severity

**Medium** — a required field is unenforced on the endpoint with the highest blast radius (real tickets), although the booking still resolves to the right offer.

## 📎 Evidence

**Actual response (redacted):**

```json
// omit ResponseId
HTTP 200, pnr OWUAIY, ticket 722136997208
```

**Expected response (redacted):**

```json
HTTP 400 naming ResponseId, no booking
```

Source: `TC-BOOK-NEG-12` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

A malformed Book request still produces a real ticketed booking, so integration mistakes are invisible until money has moved. Booking `OWUAIY` is evidence - keep until triaged, then cancel.
