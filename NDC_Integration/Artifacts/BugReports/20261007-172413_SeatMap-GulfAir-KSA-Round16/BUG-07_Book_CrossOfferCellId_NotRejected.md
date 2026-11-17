# [V2][GulfAir][Book] – Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (11th Confirmation)

## 📄 Description

`Book` does not reject a `passengersSelectedSeats...cellId` that was issued for a **different offer's** `GetSeatMap` response. **Not a new defect** - the existing `BUG-07`, now confirmed for the **11th time**.

This round the booking was ticketed and the seat was **silently dropped** (empty `passengersSelectedSeats`, no fee, no error), as in Rounds 1-7, 13 and 15. `Book` returned a clean 200 with a PNR (BUG-16 did not reproduce).

**New diagnostic:** `BUG-19` did not reproduce this round - in `TC-SEATMAP-VAL-03` a valid same-offer `cellId` was attached and persisted (seat 17C, confirmed by `Retrieve`). So valid tokens attach, and the foreign token appears to be **detected as not matching but swallowed** (seat dropped, booking still created) rather than left unchecked. The defect is the missing error and the booking that should never have been made.

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

## 🔁 Steps to Reproduce

1. Chain E1: `Search` BAH→JED 2027-06-19 → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record `cellDetails.cellID` for seat `19A`.
2. Chain E2 (independent): the same four calls for BAH→JED 2027-06-20 - a different `responseId`/`offerId` (Offer E2).
3. `Book` using **Offer E2's** `ResponseId`/`selectedOfferId` and `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{ "cellCode": "8A", "cellId": <Offer E1's seat-19A cellID> }` (`8A` is a valid, available seat on Offer E2; the foreign `cellId` embeds the 2027-06-19 segment id while the request segment is 2027-06-20).

## ❌ Actual Result

```json
{
  "pnr": "OOQACT",
  "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722137002461", "carrierCode": "GF" } },
  "passengersSelectedSeats": {},
  "selectedOffer": {
    "priceDetails": {
      "totalSelectedSeatsAmount": { "amount": 0, "currency": "SAR" },
      "totalAmount": { "amount": 1342, "currency": "SAR" }
    }
  }
}
```

HTTP 200 after 30.5 seconds (a validation rejection would be immediate): a real booking was created and ticketed, and the requested seat is neither attached nor refused.

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
- **Correlation ID:** Not returned by this response

## 📊 Severity

**High** — a booking is ticketed for a request that should have been rejected, and the caller believes a seat was reserved when it was not.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book (Offer E2, cellCode 8A, cellId of seat 19A from Offer E1)
HTTP 200, pnr OOQACT, ticket 722137002461, "passengersSelectedSeats": {}, passengerSeats [], totalSelectedSeatsAmount 0.00 SAR, totalAmount 1342 SAR, latency 30502 ms
```

**Expected response (redacted):**

```json
HTTP 4xx validation error within a second or two, no booking
```

**Diagnostic from the same run (`TC-SEATMAP-VAL-03`):** Book with a valid same-offer `cellId` (seat 17C, GF163 BAH→RUH 2027-06-14) returned `passengersSelectedSeats.PAX1.<segment>.cellCode = 17C` and `Retrieve` confirmed it persisted (pnr RKMCKV). All 149 AvailablePaid cells on that flight priced 0 SAR, so the attach was proven by the `cellCode` echo plus `Retrieve`, not by a seat fee.

Source: `TC-SEATMAP-VAL-04` in [QA report](../../Logs/20261007-172413_SeatMap-GulfAir-KSA-Round16.md).

## 💥 Impact

A stale or foreign `cellId` yields a real ticketed booking with no seat and no error, so the caller believes the seat selection succeeded and a customer can travel without the seat they chose. Because valid tokens attach (VAL-03) while the foreign one is dropped, the server evidently notices the mismatch but swallows it instead of returning an error. Booking `OOQACT` is evidence - keep until triaged, then cancel.
