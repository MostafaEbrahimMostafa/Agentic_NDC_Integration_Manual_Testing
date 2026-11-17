# [V2][GulfAir][Book] – Child Passenger Assigned an Exit-Row Seat With No Validation (11th Confirmation)

## 📄 Description

A Child (`CHD`) passenger can be assigned an exit-row seat: `GetSeatMap` offers and prices all 24 exit-row cells to the CHD passenger, and `Book` accepts the assignment, creates the PNR and tickets both passengers. **Not a new defect** - the existing `BUG-09`, now confirmed for the **11th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3, 5, 6 | 2026-08-25 – 09-06 | FAIL – CHD in exit row accepted |
| 9 | 2026-09-29 | FAIL |
| 12 | 2026-09-30 | Re-confirmed (offered every exit-row seat) |
| 13 | 2026-09-30 | FAIL – pnr OODUCQ |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – reproduced (see the Round 18 report) |
| 19 | 2026-10-10 | Not exercised (Round 19 was a targeted 6-case run) |
| 20 | 2026-10-10 | FAIL – pnr TIMHJO |

## 🔁 Steps to Reproduce

1. `Search` BAH→DMM 2027-04-26 for 1 ADT + 1 CHD → `FareConfirm` → `AddPassenger` (PAX1 ADT, PAX2 CHD) → `GetSeatMap`.
2. Note that PAX2's `passengersSeatMapAvailability` contains every `EXIT_ROW_SEAT` cell, including `10A`.
3. `Book` with `passengersSelectedSeats`: PAX1 → `15F`, PAX2 (the child) → `10A` (`EXIT_ROW_SEAT`).

## ❌ Actual Result

```json
{
  "pnr": "TIMHJO",
  "passengersSelectedSeats": {
    "PAX1": {
      "GF-GF103-GF103-2027042610-2027042611-O": {
        "cellCode": "15F",
        "price": {
          "amount": 60,
          "currency": "SAR"
        }
      }
    },
    "PAX2": {
      "GF-GF103-GF103-2027042610-2027042611-O": {
        "cellCode": "10A",
        "price": {
          "amount": 60,
          "currency": "SAR"
        }
      }
    }
  }
}
```

HTTP 200 after 44.8 seconds: both passengers ticketed (722137003977/722137003978); the CHD holds exit-row seat 10A (60 SAR). No child/exit-row restriction exists anywhere in the flow.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD",
  "errorMessage": "Child passengers cannot be assigned exit-row seats."
}
```

Exit-row cells should be absent from the CHD passenger's allow-list and `Book` should reject the assignment with no PNR created (SPEC.md §2.7, §2.9). The error code is a candidate from the test case; the exact value is UNKNOWN.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `eaae4bde-4b8e-4fa8-b1d7-c9b17f9c45d1`

## 📊 Severity

**High** — a safety rule (no children in exit rows) is enforced nowhere, and the booking is ticketed anyway.

## 📎 Evidence

**Actual response (redacted):**

```json
// GetSeatMap: PAX2 (CHD) allow-list contains 10A and all 24 exit-row cells
// Book: HTTP 200, pnr TIMHJO, "passengersSelectedSeats": {"GF-GF103-GF103-2027042610-2027042611-O":{"cellCode":"10A","price":{"amount":60,"currency":"SAR"}}}
```

**Expected response (redacted):**

```json
Exit-row cells not offered to a CHD; Book rejects the assignment (4xx), no PNR
```

Source: `TC-BOOK-BIZ-05` in [QA report](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md).

## 💥 Impact

Any client calling the API directly can ticket a child in an exit row; the seat map even labels exit rows NOT_ALLOWED_FOR_INFANTS and NOT_ALLOWED_FOR_MEDICAL but has no child restriction. Booking `TIMHJO` is evidence - keep until triaged, then cancel.
