# [V2][GulfAir][Hold] – passengersSelectedSeats Accepted and Priced by Hold Although Documented as Absent (7th Confirmation)

## 📄 Description

`Hold` is documented as having no seat field (SeatAfterHold exists for that), but it accepts `passengersSelectedSeats`, prices the seat into the held offer and `Retrieve` shows it on the OnHold booking. **Not a new defect** - the existing `BUG-08`, now confirmed for the **7th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3 | 2026-08-25 – 08-30 | FAIL – Hold accepts and echoes the seat |
| 4 | 2026-08-30 | BLOCKED – GetSeatMap outage |
| 5, 6 | 2026-08-30 – 09-06 | FAIL – Hold accepts and echoes the seat |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – accepted, priced and shown on Retrieve |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-05-26 (1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record seat `14C` and its `cellID`.
2. `Hold` with the usual fields plus `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{ "cellCode": "14C", "cellId": <cellID> }`.
3. `Retrieve` the held pnr.

## ❌ Actual Result

```json
{
  "pnr": "RKECRA",
  "holdExpirationDate": null,
  "passengersSelectedSeats": {
    "PAX1": {
      "GF-GF161-GF161-2027052602-2027052604-O": {
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

HTTP 200 after 25 seconds; `Retrieve` shows `bookingStatus: OnHold` with the same seat. No `SeatAfterHold` call was made.

## ✅ Expected Result

```json
{
  "note": "passengersSelectedSeats ignored or rejected as an unknown field, per the documented Hold contract (or the contract updated)"
}
```

SPEC.md §1.10 item 6 and §2.10 describe the Hold branch as having no seat field, with SeatAfterHold as the only seat path. The live behavior contradicts that; either Hold should not accept it or the documentation is wrong.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `7ef72e08-c1eb-4237-9e55-f55efccf4243`

## 📊 Severity

**Medium** — the documented asymmetry between the Book and Hold branches is wrong for GulfAir, and a seat can be attached to a hold with the same unvalidated token as BUG-06/BUG-07; no money moves until BookAfterHold.

## 📎 Evidence

**Actual response (redacted):**

```json
// Hold with passengersSelectedSeats
HTTP 200, pnr RKECRA, passengersSelectedSeats.PAX1 = {14C, 60 SAR}, totalSelectedSeatsAmount 60.00 SAR
// Retrieve
bookingStatus "OnHold", same seat
```

**Expected response (redacted):**

```json
Field ignored or rejected; no seat on the held booking
```

Source: `FLOW-V2-50-SEATFIELD` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

The two seat-selection mechanisms are not the clean split the documentation describes, which undermines the case for SeatAfterHold and any test that assumes Hold cannot carry seats. Held booking `RKECRA` carries a seat and has no known expiry (BUG-04).
