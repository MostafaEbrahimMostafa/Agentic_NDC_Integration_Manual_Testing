# [V2][GulfAir][Book] – Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (9th Confirmation)

## 📄 Description

`Book` does not reject a `passengersSelectedSeats...cellId` that was issued for a **different offer's** `GetSeatMap` response. **Not a new defect** - the existing `BUG-07`, now confirmed for the **9th time**.

This round the booking was ticketed and the seat was **silently dropped** (empty `passengersSelectedSeats`, no fee, no error) - the behavior of Rounds 1-7. Rounds 11 and 12 saw the seat attached instead. Either way, the foreign token is never checked. Unlike Round 12, `Book` returned a clean 200 with a PNR (BUG-16 did not reproduce), so this round's evidence is a normal response echo.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3 | 2026-08-25 – 08-30 | FAIL – accepted, seat silently dropped |
| 4 | 2026-08-30 | BLOCKED – GetSeatMap outage |
| 5, 6, 7 | 2026-08-30 – 09-09 | FAIL – accepted, seat silently dropped |
| 8 | 2026-09-09 | BLOCKED – Book/Hold outage (BUG-16) |
| 11 | 2026-09-29 | FAIL – accepted, seat attached and ticketed |
| 12 | 2026-09-30 | FAIL – accepted, seat attached (evidence from the BUG-16 envelope) |
| 13 | 2026-09-30 | FAIL – accepted, seat silently dropped, pnr RFMLTX |

## 🔁 Steps to Reproduce

1. Chain E1: `Search` BAH→JED 2027-06-15 → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record `cellDetails.cellID` for seat `15C`.
2. Chain E2 (independent): the same four calls for BAH→JED 2027-06-16 - a different `responseId`/`offerId` (Offer E2).
3. `Book` using **Offer E2's** `ResponseId`/`selectedOfferId` and `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{ "cellCode": "15B", "cellId": <Offer E1's seat-15C cellID> }` (`15B` is a valid, available seat on Offer E2).

## ❌ Actual Result

```json
{
  "pnr": "RFMLTX",
  "tickets": {
    "PAX1": {
      "ticketStatus": "Booked",
      "ticketNumber": "722136997201",
      "carrierCode": "GF"
    }
  },
  "passengersSelectedSeats": {},
  "selectedOffer": {
    "priceDetails": {
      "totalSelectedSeatsAmount": {
        "amount": 0,
        "currency": "SAR"
      },
      "totalAmount": {
        "amount": 1143,
        "currency": "SAR"
      }
    }
  }
}
```

HTTP 200 after 37 seconds (a validation rejection would be immediate): a real booking was created and ticketed, and the requested seat is neither attached nor refused.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "The provided cellId does not belong to the requested offer."
}
```

`cellID` embeds the originating `ResponseId`/`OfferId`/passenger metadata (SPEC.md §2.7) and is meant to bind a seat choice to the offer it was issued for; a token from another offer must be rejected before any booking is made (SPEC.md §2.9, §7.7). The exact error code is still UNKNOWN because the server never rejects.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `593b337d-10e8-430f-88b4-f241dec8a990`

## 📊 Severity

**High** — a booking is ticketed for a request that should have been rejected, and the caller believes a seat was reserved when it was not; the same unvalidated token also lets a foreign seat be attached (Rounds 11-12).

## 📎 Evidence

**Actual response (redacted):**

```json
// Book (Offer E2, cellCode 15B, cellId of 15C from Offer E1)
HTTP 200, pnr RFMLTX, "passengersSelectedSeats": {}, totalSelectedSeatsAmount 0.00 SAR, totalAmount 1143.00 SAR
```

**Expected response (redacted):**

```json
HTTP 4xx validation error within a second or two, no booking
```

Source: `TC-SEATMAP-VAL-04` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

The `cellId` token has no effect on the outcome. Here the seat was dropped without an error, so a customer can travel without the seat they chose; in Rounds 11-12 the seat named by `cellCode` was charged instead. The same silent drop happens for an unavailable or non-existent `cellCode` (TC-BOOK-NEG-05: pnr OPTCTH; TC-BOOK-NEG-09: pnr REPIRE). Booking `RFMLTX` is evidence - keep until triaged, then cancel.
