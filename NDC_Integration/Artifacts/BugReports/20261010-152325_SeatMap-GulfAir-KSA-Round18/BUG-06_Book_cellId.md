# [V2][GulfAir][Book] – Tampered cellId Accepted; Seat Booked From cellCode Alone (8th Confirmation)

## 📄 Description

`Book` accepts a `passengersSelectedSeats...cellId` whose last 10 characters were replaced, and books the seat named by `cellCode`; the token is never validated (the same is true for a `cellId` that belongs to a different seat, `TC-BOOK-VAL-06`). **Not a new defect** - the existing `BUG-06`, now confirmed for the **8th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – tampered token accepted |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised (Round 8 blocked by the BUG-16 outage) |
| 13 | 2026-09-30 | FAIL – pnr RALBKE, seat 14A attached |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – pnr TELSMS, seat 14A attached |

## 🔁 Steps to Reproduce

1. `Search` BAH→DXB 2027-07-03 → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Take the `cellID` of seat `14A` and replace its last 10 characters with `XXXXXXXXXX` (same length).
2. `Book` with `passengersSelectedSeats.PAX1.setSegmentsSeats.GF-GF500-GF500-2027070301-2027070303-O` = `{ "cellCode": "14A", "cellId": <tampered token> }`.
3. Variant (`TC-BOOK-VAL-06`): BAH→JED 2027-07-04, `cellCode` `15F` with the `cellId` issued for seat `15A`.

## ❌ Actual Result

```json
{
  "pnr": "TELSMS",
  "passengersSelectedSeats": {
    "PAX1": {
      "GF-GF500-GF500-2027070301-2027070303-O": {
        "cellCode": "14A",
        "price": {
          "amount": 60,
          "currency": "SAR"
        }
      }
    }
  },
  "selectedOffer": {
    "priceDetails": {
      "totalSelectedSeatsAmount": {
        "amount": 60,
        "currency": "SAR"
      },
      "totalAmount": {
        "amount": 1081,
        "currency": "SAR"
      }
    }
  }
}
```

HTTP 200 after 40.9 seconds: seat 14A attached and priced (60.00 SAR) exactly as if the genuine token had been sent. Variant: `Book` with `cellCode` 15F and the token of 15A attached seat **15F** (pnr OODBGN), i.e. the code wins and the token is ignored.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "The provided cellId is invalid."
}
```

The opaque `cellId` is a signed/encoded token (SPEC.md §2.7) and a tampered or mismatched one must be rejected (SPEC.md §2.9, §7.7). The exact error code is UNKNOWN.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `35944702-dc06-48bf-93e6-cad5df1cbb4e`

## 📊 Severity

**High** — the seat token adds no integrity protection and a forged or mismatched token still produces a ticketed booking.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book (cellCode 14A, cellId with trailing XXXXXXXXXX)
HTTP 200, pnr TELSMS, "passengersSelectedSeats": {"PAX1": {"GF-GF500-GF500-2027070301-2027070303-O": {"cellCode":"14A","price":{"amount":60,"currency":"SAR"}}}}
// Book (cellCode 15F, cellId of 15A)
HTTP 200, pnr OODBGN, seat 15F attached
```

**Expected response (redacted):**

```json
HTTP 4xx validation error, no booking
```

Source: `TC-BOOK-NEG-06` in [QA report](../../Logs/20261010-152325_SeatMap-GulfAir-KSA-Round18.md).

## 💥 Impact

The opaque `cellId` adds no integrity protection; the seat is chosen from the free-text `cellCode` alone, so forged or mismatched tokens are accepted. Bookings `TELSMS` and `OODBGN` are evidence - keep until triaged, then cancel.
