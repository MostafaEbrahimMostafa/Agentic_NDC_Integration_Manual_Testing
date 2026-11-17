# [V2][GulfAir][Book] – passengersSelectedSeats Returned Incorrect Value (Exit-Row Seat Confirmed for Child Passenger) in Book Response

## 📄 Description

A Child (CHD) passenger assigned an emergency exit-row seat (a cell whose `cellCharacteristics`
description contains `EXIT_ROW_SEAT`) is not rejected, and — new since Round 1 (2026-08-25) — is no
longer even silently dropped. In Round 2, `Book` actually attaches, prices, and tickets the exit-row
seat for the CHD passenger with zero server-side validation of any kind. This is a regression in
outcome severity versus Round 1, which found the same scenario silently dropped the seat selection
(an accidental safety pass, not a real fix).

## 🔁 Steps to Reproduce

1. `AddPassenger` with 1 ADT + 1 CHD (title/gender consistent per BUG-10's naming rule) for a fresh
   GulfAir/KSA offer (BAH-JED, 2026-11-25).
2. `GetSeatMap` → identify an exit-row cell via `cellCharacteristics`/description containing
   `EXIT_ROW_SEAT` (cell `11B` in this run).
3. `Book` assigning cell `11B` to the CHD passenger (`PAX2`).

## ❌ Actual Result

```json
"passengersSelectedSeats": { "PAX2": { "<seg>": { "cellCode": "11B", "price": { "amount": 60.00, "currency": "SAR" } } } }
```

HTTP 200 — both passengers ticketed, and the CHD passenger's exit-row seat is fully confirmed and
priced, with no rejection and no drop.

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD", "ErrorMessage": "Exit-row seats cannot be assigned to child passengers." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 responses carry no TransactionId/error envelope)

## 📊 Severity

**High** — this is a real airline safety/regulatory rule (children may not occupy emergency exit-row
seats, since they may be relied on to operate the exit in an emergency) going completely unenforced.
Unlike Round 1's accidental silent-drop (which at least avoided the unsafe seating arrangement by
happenstance), Round 2 actively confirms and tickets exactly the seating arrangement this rule exists
to prevent.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "PRENFE",
  "tickets": { "PAX1": { "ticketStatus": "Booked" }, "PAX2": { "ticketStatus": "Booked" } },
  "passengersSelectedSeats": { "PAX2": { "<seg>": { "cellCode": "11B", "price": { "amount": 60.00, "currency": "SAR" } } } }
}
```

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD" }
```

## 💥 Impact

A real 2-passenger GulfAir PNR (`PRENFE`) now exists with a child ticketed into an emergency
exit-row seat — flagged as **HIGH PRIORITY** in this run's Cleanup section given the real-world
safety implication, independent of this being a staging environment. If this booking layer is ever
used in production without a client-side (UI-only) restriction as a backstop, this defect would let
an actual child be seated in an emergency exit row on a real flight.
