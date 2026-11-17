# [V2][GulfAir][Book] – Book Never Returns a Response When passengersSelectedSeats Carries a Real Seat Selection

## 📄 Description

`Book` (`POST api/v2/FlightBooking/Book`) hangs indefinitely — no response of any kind, not even an
eventual error — whenever the request's `passengersSelectedSeats.<pax>.setSegmentsSeats.<seg>` carries
a real, populated `cellCode`/`cellId` pair. This reproduced on 3 of 3 independent attempts this round,
across two different offers and two different call shapes (a positive seat selection, and a
negative/tampered-`cellId` variant). By contrast, every `Book` call **without** a real seat selection
(the field omitted entirely, or sent as an explicitly empty `{}`) completed normally in 27-46 seconds,
3 of 3 times.

## 🔁 Steps to Reproduce

1. `Search` — GulfAir/KSA, BAH→RUH, any future date this run confirmed has offers (e.g. 2027-07-08 or
   2027-07-29).
2. `FareConfirm` — using the selected offer.
3. `AddPassenger` — one or more passengers.
4. `GetSeatMap` — record a real `cellCode`/`cellId` for an `AvailablePaid` seat cell (e.g. `8A`).
5. `Book` — `ResponseId`/`selectedOfferId` from step 4, `passengersSelectedSeats.PAX1.setSegmentsSeats.<segmentRefId>` = `{cellCode: "8A", cellId: "<real cellID from step 4>"}`.

## ❌ Actual Result

No HTTP response of any kind is ever received for the step-5 `Book` call. Observed wait times before
the connection was lost to an unrelated session interruption (not a timeout the API itself signaled):

- Attempt 1 (offer A, seat `8A`, 120 SAR, GulfAir/KSA BAH-RUH 2027-07-08): no response after 26+ minutes.
- Attempt 2 (offer B, seat `8A`, 120 SAR, GulfAir/KSA BAH-RUH 2027-07-29): no response after 12+ minutes.
- Attempt 3 (offer C, same seat's `cellId` deliberately truncated by 10 characters — a negative
  variant expected to reject quickly, per `TC-BOOK-NEG-06`): no response after 8+ minutes.

None of the three ever returned, including the tampered-`cellId` negative case, which should have
failed fast on a signature/decode check rather than attempting a real supplier round-trip at all.

## ✅ Expected Result

A normal HTTP response — 200 with a ticketed booking, or an appropriate 4xx rejection for the tampered
variant — within roughly the same window every seat-less `Book` call completed in this round:

```json
// TC-BOOK-NEG-12 (ResponseId omitted, no seat): HTTP 200 in 46.4s
// TC-BOOK-NEG-10 (passengersSelectedSeats: {}): HTTP 200 in 34.7s
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by any of these three requests — no response was ever received to
  extract one from.

## 📊 Severity

**Critical** — this is the seat-selection feature's own primary write path (`Book` with a real seat is
the single most common real-world call this entire API surface exists to support), and it does not
function at all in this environment: it neither succeeds nor fails, it simply never completes. This
is more severe than the previously-logged `BUG-16` (Round 8: `Book`/`Hold` intermittently returning
HTTP 500 while silently succeeding) — `BUG-16` at least eventually returned *something* a caller could
react to; this defect leaves the caller's connection open indefinitely with no signal at all. It
directly blocked 23 of the 63 test cases in this run's full-suite pass (every case whose steps require
`Book` with a genuinely selected seat), including the suite's own flagship positive case
(`TC-BOOK-POS-03`) and the re-verification of two previously-logged defects (`BUG-09`, `BUG-16`).

## 📎 Evidence

**Actual response (redacted):** none received on any of the 3 attempts.

**Expected response shape (redacted, matching a successful no-seat Book this same round):**

```json
{
  "supplier": "GulfAir",
  "pnr": "<redacted>",
  "gdsPNR": "",
  "bookingToken": "<redacted>",
  "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "<redacted>" } },
  "passengersSelectedSeats": { "PAX1": { "<segmentRefId>": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } }
}
```

## 💥 Impact

Every downstream capability this test suite (and, presumably, any real caller) needs from the
SeatMap+Book integration is unusable today for GulfAir/KSA: a customer cannot complete a booking with
a selected seat at all, since the request that would do so never completes. This also makes it
impossible to re-verify two already-logged, unresolved defects that themselves depend on a working
Book-with-seat call — `BUG-09` (Exit Row seat not blocked for Child passengers) and `BUG-16`
(Book/Hold intermittent HTTP 500) — both of which may share a root cause with this hang in the
seat-allocation code path, and should be investigated together rather than as three unrelated tickets.
Recommend urgent platform-team triage: check whether the supplier-side seat-allocation call
(GulfAir/TPConnect) is itself hanging, and whether a server-side timeout/circuit-breaker should be
added regardless of the root cause, so that callers get *some* signal rather than an indefinite hang.
