# [V2][GulfAir][Book] – Child Passenger Assigned an Exit-Row Seat With No Validation (9th Confirmation)

## 📄 Description

A child (CHD) passenger can be assigned an exit-row seat: `GetSeatMap` offers and prices every exit-row cell to the CHD, and `Book` accepts the assignment, creates the PNR and tickets both passengers. **Not a new defect** - the existing `BUG-09`, now confirmed for the **9th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3 | 2026-08-25 – 08-30 | FAIL – accepted, no validation |
| 4 | 2026-08-30 | BLOCKED – GetSeatMap outage |
| 5, 6 | 2026-08-30 – 09-06 | FAIL – accepted |
| 9 | 2026-09-29 | FAIL – accepted |
| 12 | 2026-09-30 | Re-confirmed (CHD offered 24/24 exit seats) |
| 13 | 2026-09-30 | FAIL – accepted, pnr OODUCQ |

## 🔁 Steps to Reproduce

1. `Search` BAH→DMM 2027-06-19 with 1 ADT + 1 CHD → `FareConfirm` → `AddPassenger` (PAX1 ADT, PAX2 CHD) → `GetSeatMap`.
2. Note that PAX2 (CHD) has exit-row seat `10A` (description `EXIT_ROW_SEAT`) in its `passengersSeatMapAvailability` allow-list and a price entry on that cell.
3. `Book` with `passengersSelectedSeats`: PAX1 → `15F`, PAX2 (the child) → `10A`, each with its verbatim `cellId`.

## ❌ Actual Result

```json
{
  "pnr": "OODUCQ",
  "tickets": {
    "PAX1": {
      "ticketStatus": "Booked",
      "ticketNumber": "722136997202",
      "carrierCode": "GF"
    },
    "PAX2": {
      "ticketStatus": "Booked",
      "ticketNumber": "722136997203",
      "carrierCode": "GF"
    }
  },
  "passengersSelectedSeats": {
    "PAX1": {
      "<seg>": {
        "cellCode": "15F",
        "price": {
          "amount": 60,
          "currency": "SAR"
        }
      }
    },
    "PAX2": {
      "<seg>": {
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

HTTP 200 after 52 seconds: both passengers ticketed, the child seated in exit row 10A at 60.00 SAR, no warning. All 24 exit-row cells were offered to the child in the seat map itself.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD",
  "errorMessage": "A child passenger cannot be assigned an exit-row seat."
}
```

Server-side enforcement is the point: a UI-only restriction is not enough because the API is called directly (SPEC.md §2.7 cellCharacteristics, §2.9; QC checklist Part 1 §15). The seat map already labels exit rows NOT_ALLOWED_FOR_INFANTS and NOT_ALLOWED_FOR_MEDICAL, but has no child restriction. The candidate error code is UNKNOWN - it has never been observed.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `4592ca02-3f09-476e-a516-84f25b0c7ba3`

## 📊 Severity

**High** — a safety rule (no children in exit rows) is enforced nowhere in the API and a real ticket is issued.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book (PAX2 = CHD, cellCode 10A EXIT_ROW_SEAT)
HTTP 200, pnr OODUCQ, passengersSelectedSeats.PAX2 = {10A, 60 SAR}, tickets 722136997202 / 722136997203
```

**Expected response (redacted):**

```json
HTTP 4xx (e.g. RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD), no PNR; exit-row cells absent from the CHD allow-list
```

Source: `TC-BOOK-BIZ-05` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

Any client that calls the API directly can ticket a child in an exit row, and the seat map invites it. Booking `OODUCQ` is evidence - keep until triaged, then cancel. Whether INF passengers are similarly unrestricted (the checklist also lists infant restrictions) is a follow-up variant.
