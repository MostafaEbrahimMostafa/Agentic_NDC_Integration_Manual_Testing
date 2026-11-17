# [V2][GulfAir][Book] – Cross-Offer cellId Accepted; Booking Ticketed With the Seat Attached (8th Confirmation)

## 📄 Description

`Book` does not reject a `passengersSelectedSeats...cellId` that was issued for a **different offer's**
`GetSeatMap` response. **This is not a new defect** — it is the existing `BUG-07`, now confirmed for the
**8th time** (Rounds 1, 2, 3, 5, 6, 7, 11 and now 12).

Round 12 repeats Round 11's behaviour: the foreign `cellId` is ignored and the seat named by `cellCode`
is **attached, priced and ticketed**. The evidence differs in one respect: because `Book` is currently
failing for every call (BUG-16), the response was a `409` with no `pnr`. The booking record embedded in
that error envelope still shows what happened — a real booking was created with the seat priced in — and
seat 12B then disappeared from every later seat map.

## History

| Round | Date | Result |
|---|---|---|
| 1, 2, 3 | 2026-08-25 – 08-30 | FAIL — accepted, seat silently dropped |
| 4 | 2026-08-30 | BLOCKED — `GetSeatMap` outage |
| 5, 6, 7 | 2026-08-30 – 09-09 | FAIL — accepted, seat silently dropped |
| 8 | 2026-09-09 | BLOCKED — Book/Hold outage (BUG-16) |
| 11 | 2026-09-29 | FAIL — accepted, seat attached and ticketed (pnr QPOJIW) |
| 12 | 2026-09-30 | FAIL — accepted, seat attached and ticketed (pnr REGOSM, evidence from the BUG-16 envelope) |

## 🔁 Steps to Reproduce

1. Chain B: `Search` (BAH→RUH, 2027-07-01, 1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record
   `cellDetails.cellID` for seat `12C`.
2. Chain C (independent): the same four calls again → a different `responseId`/`offerId` (Offer C).
3. `Book` using **Offer C's** `ResponseId`/`selectedOfferId`, with
   `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` =
   `{ "cellCode": "12B", "cellId": <Offer B's seat-12C cellID> }` (`12B` is a valid, available seat on Offer C).

## ❌ Actual Result

Request accepted and processed for ~48 seconds (a validation rejection would be immediate), then:

```json
{
  "Status": 409,
  "TransactionId": "1172e0ff-23aa-44bb-bd97-29cfe99e3194",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [ { "Name": "SocketException", "Value": "Name or service not known" } ],
  "OriginalSupplierRequest": "[REDACTED – Booking Confirmation e-mail: airline PNR REGOSM, ticket 722136996975, base 640.00 + taxes 353.00, total 1053.00 SAR]"
}
```

Total 1053.00 SAR = 993.00 fare + 60.00 seat. Afterwards seat `12B` is `NoSeat` (cellDetails null) on a re-read of
Offer B and on a brand-new Offer D, having been `AvailablePaid` at 60.00 SAR before.

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "ValidationError", "errorMessage": "The provided cellId does not belong to the requested offer." }
```

`cellID` embeds the originating `ResponseId`/`OfferId`/passenger metadata (SPEC.md §2.7) and is meant to bind
a seat choice to the offer it was issued for; a token from another offer must be rejected before any booking
is made (SPEC.md §2.9, §7.7). The exact error code is still `UNKNOWN` — it has never been observed because
the server never rejects.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `1172e0ff-23aa-44bb-bd97-29cfe99e3194`

## 📊 Severity

**High** — a booking is ticketed and the customer is charged for a seat chosen with a token that was never
validated; a stale, foreign or forged `cellId` is enough. The booking and the money are real, although no
data is exposed.

## 📎 Evidence

**Actual (redacted):** booking REGOSM, e-ticket 722136996975, total 1053.00 SAR (993.00 + 60.00 seat); Book
answered `409 NDC-INT-UNC-Z9999` after 47.7 s (see BUG-16). Seat 12B: `AvailablePaid` → `NoSeat` (seat cells
176 → 175, NoSeat 4 → 5).

**Expected (redacted):** `HTTP 4xx` validation error within a second or two, no booking.

Source: `TC-SEATMAP-VAL-04` and `TC-SEATMAP-BIZ-04` in
[20260930-140455_SeatMap-GulfAir-KSA-Round12.md](../../Logs/20260930-140455_SeatMap-GulfAir-KSA-Round12.md).
A separate, faster 409 ("already created", 1.4 s) on a previously used offer is not evidence and is ignored.

## 💥 Impact

The `cellId` token has no effect on the outcome: the seat is chosen from `cellCode` alone, so the token's
only purpose — binding a seat choice to a live offer and passenger — is not enforced. Round 12 could only
see this through the BUG-16 error envelope; once Book returns 200 again, re-run `TC-SEATMAP-VAL-04` to get
the `passengersSelectedSeats` echo. Booking `REGOSM` is evidence for this bug — keep it until triaged, then
cancel it.
