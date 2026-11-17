# [V2][GulfAir][Hold] – passengersSelectedSeats Accepted and Priced by Hold Although Documented as Absent (8th Confirmation)

## 📄 Description

`Hold` is documented as having **no** seat field (SPEC.md §1.10 item 6, §2.10), yet it accepts `passengersSelectedSeats`, prices the seat into the held offer, and `Retrieve` shows it on the `OnHold` booking - with no `SeatAfterHold` call. **Not a new defect** - the existing `BUG-08`, now confirmed for the **8th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3, 5, 6 | 2026-08-25 – 09-06 | FAIL – Hold accepts and prices passengersSelectedSeats |
| 4 | 2026-08-30 | BLOCKED – outage |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – pnr RKECRA |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – pnr ORVBTX |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-07-03 (1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap` (seat `14C`).
2. `Hold` with AddPassenger's IDs **plus** `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{ "cellCode": "14C", "cellId": <cellID> }`.
3. `Retrieve` the held pnr.

## ❌ Actual Result

```json
{
  "pnr": "ORVBTX",
  "holdExpirationDate": null,
  "passengersSelectedSeats": {
    "PAX1": {
      "GF-GF161-GF161-2027070302-2027070304-O": {
        "cellCode": "14C",
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
      }
    }
  }
}
```

HTTP 200 after 20.2 seconds: the seat is accepted, echoed and priced (60.00 SAR). `Retrieve` shows bookingStatus `OnHold` with the same seat.

## ✅ Expected Result

```json
{
  "note": "passengersSelectedSeats ignored or rejected on Hold, or the contract updated to say Hold honors seats"
}
```

Per SPEC.md §1.10 item 6 / §2.10 the Hold branch has no seat field; either the field must be ignored/rejected, or the documentation must change.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `dd57a450-916f-405c-bbde-91331411e794`

## 📊 Severity

**Medium** — the documented Book/Hold asymmetry is wrong for GulfAir and an unvalidated seat can be attached to a hold, but nothing is corrupted.

## 📎 Evidence

**Actual response (redacted):**

```json
// Hold with passengersSelectedSeats
HTTP 200, pnr ORVBTX, "passengersSelectedSeats": {"PAX1":{"GF-GF161-GF161-2027070302-2027070304-O":{"cellCode":"14C","price":{"amount":60,"currency":"SAR"}}}}
// Retrieve: bookingStatus OnHold, same seat
```

**Expected response (redacted):**

```json
Field ignored or rejected (documented behaviour)
```

Source: `FLOW-V2-50-SEATFIELD` in [QA report](../../Logs/20261010-152325_SeatMap-GulfAir-KSA-Round18.md).

## 💥 Impact

The documented asymmetry between the Book and Hold branches is wrong for GulfAir, and an unvalidated seat selection (the same unvalidated `cellId` as BUG-06/BUG-07) can be attached to a hold. Hold `ORVBTX` is left open (no expiry - BUG-04); cancel via the platform team.
