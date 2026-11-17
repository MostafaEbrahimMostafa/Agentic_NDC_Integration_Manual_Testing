# [V1][V2][SabreNdc][Book] – voidCapability Missing from Book Response

## 📄 Description

SabreNdc `Book`, `BookAfterHold` and `Retrieve` responses on V1 and V2 do not contain `voidCapability`, even for a booking ticketed seconds earlier that can be voided. SPEC.md §2.9 documents this per-booking flag as the live void-eligibility signal.

Found by: TC-CAPCHECK-SABRENDC-02 (also TC-VOID-BIZ-05), QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. POST V1 Search -> FareConfirm -> Book (SabreNdc/EGY, CAI-JED 2026-11-12, 1 ADT) - pnr TFZFYS; or V2 Search -> FareConfirm -> AddPassenger -> Book - pnr TKTQQW.
2. Inspect the Book response keys; Retrieve and inspect again.

## ❌ Actual Result

```json
// V2 Book top-level keys (no voidCapability):
supplier, pnr, gdsPNR, bookingToken, creationDate, ticketingDate, tickets, passengersSelectedAncillaries, passengersSelectedSeats, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer, isBspCommissionApplied, diRemarks, emdTickets
```

Absent on all 26 SabreNdc bookings/holds of this run (Book, BookAfterHold, Retrieve; V1 and V2).

## ✅ Expected Result

```json
{
  "pnr": "TKTQQW",
  "tickets": { "Passenger1": { "ticketStatus": "Booked", "ticketNumber": "1572135118445" } },
  "voidCapability": "VoidAllowed"
}
```

SPEC.md §2.9 shows voidCapability in the Book response (e.g. "VoidNotAllowed" once void is no longer possible).

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Booking and void still work, but consumers cannot tell from the booking whether Void is available.

## 📎 Evidence

**Actual response (redacted):**

```json
// V2 Book top-level keys (no voidCapability):
supplier, pnr, gdsPNR, bookingToken, creationDate, ticketingDate, tickets, passengersSelectedAncillaries, passengersSelectedSeats, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer, isBspCommissionApplied, diRemarks, emdTickets
```

**Expected response (redacted):**

```json
{
  "pnr": "TKTQQW",
  "tickets": { "Passenger1": { "ticketStatus": "Booked", "ticketNumber": "1572135118445" } },
  "voidCapability": "VoidAllowed"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-CAPCHECK-SABRENDC-02).

## 💥 Impact

UIs and back-office tools cannot decide whether to offer a Void button. The capability-consistency check (TC-VOID-BIZ-05) cannot run, and the D+1 rule cannot be signalled ahead of a failed call.
