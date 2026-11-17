# [V2][GulfAir][Book] – Cross-Offer cellId Accepted; Booking Ticketed With the Seat Attached

## 📄 Description

`Book` does not reject a `passengersSelectedSeats...cellId` that was issued for a **different offer's**
`GetSeatMap` response. **This is not a new defect** — it is the existing `BUG-07`, now confirmed for the
**7th time** (Rounds 1, 2, 3, 5, 6, 7 and now 11; Rounds 4 and 8 were blocked by unrelated outages).
Round 7's report labelled itself the "7th consecutive round"; that count included blocked Round 4, so
counting only actual confirmations this run is the 7th.

**What is different this round:** in Rounds 1–7 the request's seat was *silently dropped*
(`passengersSelectedSeats: {}`, no fee). This time the foreign `cellId` was ignored and the seat named by
`cellCode` was **attached, priced and ticketed** — the same "`cellId` is never validated" behaviour first
documented in Round 2's `BUG-06`. Together the two show the `cellId` token has no effect on the outcome at
all: the seat is chosen from `cellCode` alone.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3 | 2026-08-25 – 08-30 | FAIL — accepted, seat silently dropped |
| 4 | 2026-08-30 | BLOCKED — `GetSeatMap` outage |
| 5, 6, 7 | 2026-08-30 – 09-09 | FAIL — accepted, seat silently dropped (`ne-3` host from Round 6) |
| 8 | 2026-09-09 | BLOCKED — Book/Hold outage |
| 11 | 2026-09-29 | FAIL — accepted, **seat attached and ticketed** (pnr QPOJIW) |

## 🔁 Steps to Reproduce

1. Chain B: `Search` (BAH→RUH, 2027-07-01, 1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record
   `cellDetails.cellID` for seat `10C`.
2. Chain C (independent): the same four calls again → a different `responseId`/`offerId` (Offer C).
3. `Book` using **Offer C's** `ResponseId`/`selectedOfferId`, with
   `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` =
   `{ "cellCode": "10B", "cellId": <Offer B's seat-10C cellID> }` (`10B` is a valid, available seat on Offer C).

## ❌ Actual Result

```json
{
  "pnr": "QPOJIW",
  "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722136996068" } },
  "passengersSelectedSeats": { "PAX1": { "GF-GF161-GF161-2027070102-2027070104-O": { "cellCode": "10B", "price": { "amount": 60.00, "currency": "SAR" } } } },
  "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": { "amount": 60.00, "currency": "SAR" }, "totalAmount": { "amount": 1053.00, "currency": "SAR" } } }
}
```

HTTP 200 — a real booking was created and ticketed and the customer was charged for the seat, even though
the submitted `cellId` belonged to another offer.

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "ValidationError", "errorMessage": "The provided cellId does not belong to the requested offer." }
```

`cellID` embeds the originating `ResponseId`/`OfferId`/passenger metadata (SPEC.md §2.7) and is meant to bind
a seat choice to the offer it was issued for; a token from another offer must be rejected (SPEC.md §2.9, §7.7).
The exact error code is still `UNKNOWN` — it has never been observed because the server never rejects.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**High** — a booking is ticketed and paid for on the strength of a token that was never checked. Nothing in
the flow fails, so the bad input goes unnoticed.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "QPOJIW", "passengersSelectedSeats": { "PAX1": { "<seg>": { "cellCode": "10B", "price": { "amount": 60.00, "currency": "SAR" } } } } }
```

**Expected response (redacted):**

```json
{ "status": 400, "errorCode": "ValidationError" }
```

Source: `TC-SEATMAP-VAL-04` in [20260929-163322_SeatMap-GulfAir-KSA-Round11.md](../../Logs/20260929-163322_SeatMap-GulfAir-KSA-Round11.md).

## 💥 Impact

Because the seat is driven by `cellCode` alone, a stale, foreign or forged `cellId` still books and charges
the seat. That defeats the token's only purpose (tying a choice to a live offer and passenger), and combined
with `BUG-06` (a tampered or mismatched `cellId` within one offer is also ignored) means seat selection has
no integrity check at all. Recommend rejecting on decode/ownership mismatch, as the token was designed for.
Test artifact: pnr `QPOJIW` (ticket 722136996068, seat 10B) — keep until triaged, then void per SPEC.md §2.15.
