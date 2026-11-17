# [V2][GulfAir][Book] – Child Passenger Ticketed Into Exit-Row Seat With Zero Server-Side Validation

## 📄 Description

`Book` allows a Child (`CHD`) passenger to be assigned an exit-row seat, and the booking is created
and **ticketed** with no rejection, error, or warning of any kind. This is a real, safety-relevant
airline restriction (exit-row occupants must be capable adults) that is not enforced server-side at
all. This is the **5th consecutive round** this defect has reproduced, in its worsened
(zero-validation) form. Not re-verifiable in Round 4 due to the sustained `GetSeatMap` outage
(`BUG-14`, now resolved) — this round's re-verification was a top priority.

## 🔁 Steps to Reproduce

1. `AddPassenger` with one ADT (`PAX1`) and one CHD (`PAX2`) for a GulfAir/KSA offer (BAH-DMM,
   2027-01-20).
2. `GetSeatMap` — identify an exit-row `AvailablePaid` cell via `cellCharacteristics` (description
   `EXIT_ROW_SEAT`), e.g. cell `12A`.
3. `Book` with `passengersSelectedSeats.PAX2.setSegmentsSeats.<seg>` = `{cellCode: "12A", cellId:
   <exit-row cellID>}` — assigning the exit-row seat to the CHD passenger.

## ❌ Actual Result

```json
{
  "pnr": "RLNWTT",
  "tickets": { "PAX1": {"ticketStatus":"Booked"}, "PAX2": {"ticketStatus":"Booked"} },
  "passengersSelectedSeats": { "PAX2": { "<seg>": { "cellCode": "12A", "price": { "amount": 60.00, "currency": "SAR" } } } }
}
```
(HTTP 200 — both passengers ticketed, no rejection)

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD", "errorMessage": "This seat is not available for passengers of this type." }
```
(candidate error code per this suite's Seat map QC checklist reference — exact code not yet
confirmed live since the server never returns anything but success)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**High** — a real regulatory/safety restriction is not enforced server-side. A UI-only restriction
is not sufficient, since this API is called directly by this test suite (and by any future
automation or third-party integration) without any UI in front of it.

## 📎 Evidence

pnr `RLNWTT`, BAH-DMM 2027-01-20 — PAX2 (passengerTypeCode=`CHD`) genuinely ticketed with seat `12A`
(cellCharacteristics contains `EXIT_ROW_SEAT`) at `60.00 SAR`, ticketNumber issued, no warning field
anywhere in the response.

## 💥 Impact

Confirmed unchanged across Round 1, Round 2 (worsened from Round 1's partial-validation form),
Round 3, not re-verified Round 4 (blocked by BUG-14), and now Round 5 (pnr RLNWTT) — there is
currently zero server-side enforcement of this restriction for GulfAir. Recommend confirming
whether INF passengers are similarly unrestricted as a follow-up variant.
