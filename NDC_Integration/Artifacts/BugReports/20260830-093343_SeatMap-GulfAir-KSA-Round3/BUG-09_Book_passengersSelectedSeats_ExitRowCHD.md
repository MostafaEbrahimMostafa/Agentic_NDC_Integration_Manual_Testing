# [V2][GulfAir][Book] – Child Passenger's Exit-Row Seat Attached and Ticketed with No Server-Side Validation

## 📄 Description

Assigning a Child (CHD) passenger to an exit-row seat (identified via `cellCharacteristics`
containing `EXIT_ROW_SEAT`) is not rejected server-side. In Round 2, this regressed from Round 1's
accidental silent-drop into an actual attach-and-ticket outcome; Round 3 confirms this **worsened
state is stable and unchanged** — the CHD passenger's exit-row seat is genuinely attached, priced,
and ticketed, with zero server-side validation, for the **2nd consecutive round**.

## 🔁 Steps to Reproduce

1. `AddPassenger` with 1 ADT + 1 CHD for a GulfAir/KSA offer (e.g. BAH-JED GF181).
2. `GetSeatMap`; identify an exit-row cell via `cellCharacteristics[].description` containing
   `EXIT_ROW_SEAT` (e.g. cell `11C`).
3. `Book` with `passengersSelectedSeats.PAX2.setSegmentsSeats.<seg>` = `{cellCode:"11C", cellId:
   <exit-row cellID>}`, where `PAX2` is the CHD passenger.

## ❌ Actual Result

```json
{
  "pnr": "RNCIPE",
  "tickets": {
    "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722136975568" },
    "PAX2": { "ticketStatus": "Booked", "ticketNumber": "722136975569" }
  },
  "passengersSelectedSeats": {
    "PAX2": { "<seg>": { "cellCode": "11C", "price": { "amount": 60.00, "currency": "SAR" } } }
  }
}
```

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD",
  "errorMessage": "Children may not be assigned an exit-row seat."
}
```

(No `pnr` created for this attempt.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**High** — a real airline safety/regulatory rule (children may not occupy exit-row seats, since they
may be required to assist in an emergency evacuation) goes completely unenforced by this API. This is
a live, bookable, ticketed outcome, not a theoretical gap — a real customer could genuinely seat a
child in an exit row through this API today.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "RNCIPE", "passengersSelectedSeats": { "PAX2": { "cellCode": "11C", "price": { "amount": 60.00, "currency": "SAR" } } } }
```

**Expected response (redacted):** `{ "status": 400, "errorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD" }`

## 💥 Impact

Round 1 (2026-08-25): the seat selection was silently dropped (pnr RRHRNS) — the safety outcome was
accidentally achieved via an unrelated bug (the same silent-drop pattern as BUG-07), not by design.
Round 2 (2026-08-26): the exit-row seat was genuinely attached and ticketed (pnr PRENFE) — a
regression that turned an accidental safety-preserving bug into an actual safety gap. Round 3
(2026-08-30) reconfirms Round 2's outcome exactly (pnr RNCIPE) — this is now a **stable, repeatable**
defect, not a one-off. Recommend this be treated as the highest-priority open item in this run given
its real-world safety implication; flag to the airline/compliance team independent of the standard
engineering fix cycle.
