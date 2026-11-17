# [V2][GulfAir][Book] – Child Passenger Ticketed Into Exit-Row Seat With Zero Server-Side Validation

## 📄 Description

`Book` allows a Child (`CHD`) passenger to be assigned an exit-row seat, and the booking is created
and **ticketed** with no rejection, error, or warning of any kind. This is a real, safety-relevant
airline restriction (exit-row occupants must be capable adults) that is not enforced server-side at
all. **This is not a new defect** — it is the same `BUG-09` first observed in Round 1 (2026-08-25,
as a silent-drop variant) and reproducing in its current zero-validation ("actually attaches and
tickets the seat") form since Round 2 (2026-08-26). This run is the **7th confirmed occurrence**
(Rounds 1†, 2, 3, 5, 6, and now 9 — Round 4 was blocked by the concurrent `GetSeatMap` outage, `BUG-14`,
and Rounds 7–8 did not include this test case in scope). † Round 1's occurrence was a milder failure
mode (see "History" below) — from Round 2 onward the defect has consistently reproduced in this
worse, zero-validation form.

**This run's addition to the record**: the previous confirmed occurrence was Round 6 (2026-09-06),
23 days before this run — the longest gap between confirmations to date, and the first one to happen
*after* Round 8's critical `BUG-16` Book/Hold outage (which blocked this test case from even being
attempted in Rounds 7–8). This run confirms `BUG-09` reproduces identically even once `BUG-16`-class
issues are no longer interfering with `Book` — i.e., this is not merely a symptom of the other, since-
apparently-resolved outage.

## History

| Round | Date | Result |
|---|---|---|
| 1 | 2026-08-25 | FAIL — seat selection silently dropped; no seat attached to either passenger, no error raised (pnr RRHRNS) |
| 2 | 2026-08-26 | FAIL — **worsened**: seat actually attached and ticketed to the CHD with zero validation |
| 3 | 2026-08-30 | FAIL — still reproduces in worsened form (2nd consecutive) |
| 4 | 2026-08-30 | BLOCKED — not re-verified, concurrent `GetSeatMap` outage (`BUG-14`) |
| 5 | 2026-08-30 | FAIL — still reproduces in worsened form (5th consecutive) |
| 6 | 2026-09-06 | FAIL — still reproduces in worsened form (6th consecutive), first run on the `ne-3` host |
| 7–8 | 2026-09-09 | not in scope |
| 9 | 2026-09-29 | FAIL — still reproduces in worsened form (this run, pnr QVUTYI) |

## 🔁 Steps to Reproduce

1. `AddPassenger` with one ADT (`PAX1`) and one CHD (`PAX2`) for a GulfAir/KSA offer (this run:
   BAH-RUH, 2027-07-08).
2. `GetSeatMap` — identify an exit-row `AvailablePaid` cell via `cellCharacteristics` (description
   `EXIT_ROW_SEAT`) — this run, cell `18C`.
3. `Book` with `passengersSelectedSeats.PAX2.setSegmentsSeats.<seg>` = `{cellCode: "18C", cellId:
   <exit-row cellID>}` — assigning the exit-row seat to the CHD passenger.

## ❌ Actual Result

```json
{
  "pnr": "QVUTYI",
  "tickets": { "PAX1": {"ticketStatus":"Booked"}, "PAX2": {"ticketStatus":"Booked","ticketNumber":"722136995695"} },
  "passengersSelectedSeats": { "PAX2": { "<seg>": { "cellCode": "18C", "price": { "amount": 60, "currency": "SAR" } } } },
  "passengersList": { "PAX2": { "passengerTypeCode": "CHD", "age": 10 } }
}
```
(HTTP 200 — both passengers ticketed, no rejection. The response even computes and echoes the
passenger's age, confirming the server had the data needed to enforce the restriction.)

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD", "errorMessage": "This seat is not available for passengers of this type." }
```
(candidate error code per this suite's Seat map QC checklist reference — exact code still not
confirmed live after 7 rounds, since the server never returns anything but success)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success); pnr `QVUTYI`

## 📊 Severity

**High** (unchanged from prior reports) — a real regulatory/safety restriction is not enforced
server-side. A UI-only restriction is not sufficient, since this API is called directly by this test
suite (and by any future automation or third-party integration) without any UI in front of it.
**Worth escalating for triage**: at 7 confirmed occurrences over 35 days with no observed fix attempt,
this has moved from "newly discovered" to "long-standing, unaddressed" — the platform team should
confirm this is actually on a remediation backlog, not merely logged and forgotten.

## 📎 Evidence

This run: pnr `QVUTYI`, BAH-RUH 2027-07-08 — PAX2 (passengerTypeCode=`CHD`, server-computed `age: 10`)
genuinely ticketed with seat `18C` (cellCharacteristics contains `EXIT_ROW_SEAT`) at `60 SAR`,
ticketNumber `722136995695` issued, no warning field anywhere in the response. See the History table
above for prior rounds' pnrs and evidence.

## 💥 Impact

Confirmed unchanged across Rounds 2, 3, 5, 6, and now 9 (7 total confirmations including Round 1's
milder variant) — there is currently zero server-side enforcement of this restriction for GulfAir,
over more than a month of repeated confirmation. Recommend: (1) treat this as a standing, unresolved
item rather than re-discovering it each round — link future rounds' confirmations back to this same
`BUG-09` rather than filing new bug numbers; (2) confirm whether INF passengers are similarly
unrestricted, as a follow-up variant (still not attempted in any round to date); (3) the platform team
should confirm remediation status given the elapsed time.
