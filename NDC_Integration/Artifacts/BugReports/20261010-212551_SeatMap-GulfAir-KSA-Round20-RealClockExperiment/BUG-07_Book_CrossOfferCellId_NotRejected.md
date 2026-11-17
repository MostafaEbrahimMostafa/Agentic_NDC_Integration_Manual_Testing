# [V2][GulfAir][Book] – Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (15th Confirmation)

## 📄 Description

`Book` does not reject a `passengersSelectedSeats...cellId` that was issued for a **different offer's** `GetSeatMap` response. **Not a new defect** - the existing `BUG-07`, now confirmed for the **15th time**.

This round the booking was ticketed and the seat was **silently dropped** (empty `passengersSelectedSeats`, no fee, no error), as in most earlier rounds. `Book` returned a clean 200 with a PNR (BUG-16 did not reproduce). In the same run valid same-offer seats attached normally (e.g. 12C on pnr OWFTRG), so the foreign token is **detected as not matching but swallowed**.

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
| 15 | 2026-10-05 | FAIL – accepted, seat silently dropped, pnr SNUMQV |
| 16 | 2026-10-07 | FAIL – accepted, seat silently dropped, pnr OOQACT |
| 17 | 2026-10-10 | FAIL – accepted, seat silently dropped, pnr OVAMWU |
| 18 | 2026-10-10 | FAIL – reproduced (see the Round 18 report) |
| 19 | 2026-10-10 | FAIL – accepted, seat silently dropped, pnr THWPTO |
| 20 | 2026-10-10 | FAIL – accepted, seat silently dropped, pnr TEZVSX |

## 🔁 Steps to Reproduce

1. Chain E1: `Search` BAH→JED 2027-04-22 → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record `cellDetails.cellID` for seat `15C`.
2. Chain E2 (independent): the same four calls for BAH→JED 2027-04-23 - a different `responseId`/`offerId`.
3. `Book` using **E2's** `ResponseId`/`selectedOfferId` and `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{ "cellCode": "15B", "cellId": <E1's seat-15C cellID> }`.

## ❌ Actual Result

```json
{
  "pnr": "TEZVSX",
  "tickets": {
    "PAX1": {
      "ticketStatus": "Booked",
      "ticketNumber": "722137003975",
      "carrierCode": "GF"
    }
  },
  "passengersSelectedSeats": {},
  "selectedOffer": {
    "priceDetails": {
      "totalAmount": {
        "amount": 2561,
        "currency": "SAR"
      }
    }
  }
}
```

HTTP 200 after 28.7 seconds (a validation rejection would be immediate): a real booking was created and ticketed, and the requested seat is neither attached nor refused.

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
- **Correlation ID:** `228ad9d8-25db-47ca-b74c-2c1ebad9d813`

## 📊 Severity

**High** — a booking is ticketed for a request that should have been rejected, and the caller believes a seat was reserved when it was not.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book (offer E2, cellCode 15B, cellId of seat 15C from offer E1)
HTTP 200, pnr TEZVSX, ticket 722137003975, "passengersSelectedSeats": {}, totalAmount 2561 SAR, latency 28741 ms
```

**Expected response (redacted):**

```json
HTTP 4xx validation error within a second or two, no booking
```

Source: `TC-SEATMAP-VAL-04` in [QA report](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md).

## 💥 Impact

A stale or foreign `cellId` yields a real ticketed booking with no seat and no error, so the caller believes the seat selection succeeded and a customer can travel without the seat they chose. The same silent drop happens for an unavailable or non-existent `cellCode` (TC-BOOK-NEG-05, TC-BOOK-NEG-09). Booking `TEZVSX` is evidence - keep until triaged, then cancel.
