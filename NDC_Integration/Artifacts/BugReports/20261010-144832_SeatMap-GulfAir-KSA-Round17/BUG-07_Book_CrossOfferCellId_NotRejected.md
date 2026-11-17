# [V2][GulfAir][Book] – Cross-Offer cellId Accepted; Booking Ticketed With the Seat Silently Dropped (12th Confirmation)

## 📄 Description

`Book` does not reject a `passengersSelectedSeats...cellId` that was issued for a **different offer's** `GetSeatMap` response. **Not a new defect** - the existing `BUG-07`, now confirmed for the **12th time**.

This round the booking was ticketed and the seat was **silently dropped** (empty `passengersSelectedSeats`, no fee, no error), as in Rounds 1-7, 13, 15 and 16. `Book` returned a clean 200 with a PNR (BUG-16 did not reproduce).

This round isolates the token: both offers had the **same seat code (12D)**, so the only difference between a valid and an invalid request is the `cellId` binding. In the same run `TC-SEATMAP-VAL-03` attached a valid same-offer `cellId` (seat 8B, 120 SAR, confirmed by `Retrieve`), so valid tokens attach and the foreign token is **detected as not matching but swallowed**. The defect is the missing error and the booking that should never have been made.

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

## 🔁 Steps to Reproduce

1. Chain A: `Search` BAH→JED 2027-06-19 → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record `cellDetails.cellID` for seat `12D`.
2. Chain B (independent): the same four calls for BAH→JED 2027-06-20 - a different `responseId`/`offerId` (Offer B).
3. `Book` using **Offer B's** `ResponseId`/`selectedOfferId` and `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{ "cellCode": "12D", "cellId": <Offer A's seat-12D cellID> }` (the foreign `cellId` embeds Offer A's responseId and the 2027-06-19 segment id; the request segment is 2027-06-20).

## ❌ Actual Result

```json
{
  "pnr": "OVAMWU",
  "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722137003884", "carrierCode": "GF" } },
  "passengersSelectedSeats": {},
  "selectedOffer": {
    "priceDetails": {
      "totalAmount": { "amount": 1143, "currency": "SAR" }
    }
  }
}
```

HTTP 200 after 29.5 seconds (a validation rejection would be immediate): a real booking was created and ticketed, and the requested seat is neither attached nor refused. `Retrieve` also shows no seat.

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
// Book (Offer B, cellCode 12D, cellId of seat 12D from Offer A)
HTTP 200, pnr OVAMWU, ticket 722137003884, "passengersSelectedSeats": {}, totalAmount 1143 SAR, latency 29549 ms
```

**Expected response (redacted):**

```json
HTTP 4xx validation error within a second or two, no booking
```

**Diagnostic from the same run (`TC-SEATMAP-VAL-03`):** Book with a valid same-offer `cellId` (seat 8B, GF161 BAH→RUH 2027-06-15) returned `passengersSelectedSeats.PAX1.<segment>.cellCode = 8B` at 120 SAR and `Retrieve` confirmed it persisted (pnr TESHKH).

Source: `TC-SEATMAP-VAL-04` in [QA report](../../Logs/20261010-144832_SeatMap-GulfAir-KSA-Round17.md).

## 💥 Impact

A stale or foreign `cellId` yields a real ticketed booking with no seat and no error, so the caller believes the seat selection succeeded and a customer can travel without the seat they chose. Booking `OVAMWU` is evidence - keep until triaged, then cancel.
