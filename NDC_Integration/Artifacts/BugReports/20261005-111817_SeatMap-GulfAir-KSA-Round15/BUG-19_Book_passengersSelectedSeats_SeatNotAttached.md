# [V2][GulfAir][Book] – Selected Seat Not Attached; Booking Ticketed With passengersSelectedSeats Empty

## 📄 Description

`Book` accepts a **valid** seat selection - a real `AvailablePaid` `cellCode` plus the verbatim `cellDetails.cellID` from the same offer's `GetSeatMap` response - returns HTTP 200 and a ticketed PNR, but does **not attach the seat**: `passengersSelectedSeats` comes back as `{}` and no seat fee is charged. `Retrieve` confirms the booking holds no seat, so this is not just a missing echo.

**New defect (BUG-19).** In Rounds 1-13 the same call attached the seat and echoed it in three places (Round 13: seat `12C`, 60 SAR, pnr `ORUXWA`). Found by `TC-SEATMAP-VAL-03`, Round 15 (2026-10-05).

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-06-12 (1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Pick an `AvailablePaid` seat (here `12D`, 60 SAR) and copy its `cellDetails.cellID` unchanged.
2. `Book` with the `ResponseId`/`selectedOfferId` returned by `GetSeatMap` and `passengersSelectedSeats.PAX1.setSegmentsSeats.<segmentRefId>` = `{ "cellCode": "12D", "cellId": <the copied cellID> }`.
3. Repeat on a fresh flight (BAH→RUH 2027-06-18, seat `10C`) - same result.
4. `Retrieve` the booking from step 3 (`pnr` + `bookingToken`).

## ❌ Actual Result

```json
{
  "pnr": "STHFNE",
  "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722137000341", "carrierCode": "GF" } },
  "passengersSelectedSeats": {},
  "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": { "amount": 0, "currency": "SAR" } } }
}
```

HTTP 200 after about 30 seconds. The request's `cellId` equals the `GetSeatMap` `cellID` byte for byte. The second attempt (pnr `SRMWVW`, seat `10C`) behaves the same, and `Retrieve` returns `"passengersSelectedSeats": {}`.

## ✅ Expected Result

```json
{
  "passengersSelectedSeats": {
    "PAX1": { "<segmentRefId>": { "cellCode": "12D", "price": { "amount": 60, "currency": "SAR" } } }
  },
  "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": { "amount": 60, "currency": "SAR" } } }
}
```

A valid seat selection must be attached and echoed in `passengersSelectedSeats`, `selectedOffer.passengerFareBreakdown[].passengerSeats` and `priceDetails.totalSelectedSeats` (SPEC.md §2.9), and charged at the seat-map price.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**High** — the booking completes and is ticketed, but the traveller's paid seat is silently missing and the caller gets no error; seat selection through `Book` is effectively broken for GulfAir/KSA.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book, seat 12D (pnr STHFNE) and seat 10C (pnr SRMWVW)
HTTP 200, "passengersSelectedSeats": {}, totalSelectedSeatsAmount 0.00 SAR, totalAmount 933.00 SAR
// Retrieve (pnr SRMWVW): HTTP 200, "passengersSelectedSeats": {}
```

**Expected response (redacted):**

```json
HTTP 200, passengersSelectedSeats.PAX1.<segmentRefId> = { cellCode, price 60 SAR }, totalSelectedSeatsAmount 60.00 SAR
```

Source: `TC-SEATMAP-VAL-03` in [QA report](../../Logs/20261005-111817_SeatMap-GulfAir-KSA-Round15.md). Intermittency is possible (seat attachment varied between rounds in the BUG-07 history), so re-run before closing; 2 of 2 attempts failed this round.

## 💥 Impact

A customer who picks and expects to pay for a seat is ticketed without it and is never told. Because the seat is not attached on the supplier side either (Retrieve shows none), it cannot be recovered from the response. It also hides the cross-offer check of `BUG-07`: with every `cellId` now dropped, `TC-SEATMAP-VAL-04` can no longer show whether the offer binding is enforced. Bookings `STHFNE` and `SRMWVW` are evidence - keep until triaged, then cancel.