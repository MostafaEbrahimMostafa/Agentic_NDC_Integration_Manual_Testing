# [V1][SabreNdc][Retrieve] – bookingStatus Missing from RetrieveBooking Response

## 📄 Description

The field `bookingStatus` is entirely absent from the V1 `RetrieveBooking` response on SabreNdc/EGY: not present as `null`, simply not a key in the returned object. The field should carry the booking's lifecycle state (Booked, Held, Cancelled, Voided) so callers can validate the booking state from the documented contract. The same defect was reported for TravelportNdc/UAE on 2026-08-05 (BUG-01 of that run); V2 Retrieve on the same supplier does return it ("OnHold" / "Booked").

Found by: FLOW-V1-01 (and every executed V1 flow that ends in Retrieve: FLOW-V1-02..12), QA run `20261025-190214_SabreNdc-EGY-V1-Round2` (2026-10-25, Round 2).

## 🔁 Steps to Reproduce

1. V1 Search (SabreNdc/EGY, CAI-JED 2026-11-24, 2 ADT + 2 CHD + 2 INF) > FareConfirm (`POST api/FlightSearch/FareConfirm`) > Book (`POST api/FlightBooking/Book`, 6 passengers, ticketed).
2. POST `api/FlightBooking/RetrieveBooking` with the Book response's `pnr`, `gdsPnr` and `bookingToken` (the failing call).
3. Search the response for `bookingStatus` (repeat after a Hold: the held state is also not reported).

## ❌ Actual Result

```json
{
  "tickets": {
    "Passenger1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592757",
      "carrierCode": "QR"
    },
    "...": "5 more"
  },
  "creationDate": "2026-10-25T00:00:00",
  "ticketingDate": "2026-10-25T00:00:00",
  "fareType": "Published",
  "bookedCredentialsSelector": "EGY",
  "holdExpirationDate": null,
  "supplier": "SabreNdc",
  "pnr": "RNBJRR",
  "gdsPNR": "RNBJRR"
}
```

Top-level keys returned: tickets, creationDate, ticketingDate, fareType, bookedCredentialsSelector, holdExpirationDate, pcc, supplier, pnr, gdsPNR, bookingToken, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer, isBspCommissionApplied, diRemarks. `bookingStatus` does not appear anywhere in the body. Booked state is only inferable from `tickets` (six `ticketStatus: "Booked"` entries) and a held state from a non-null `holdExpirationDate`; after `CancelAfterHold` the response shows neither, so a cancelled hold cannot be told apart from a booking that was never ticketed.

## ✅ Expected Result

```json
{
  "pnr": "RNBJRR",
  "gdsPNR": "RNBJRR",
  "bookingStatus": "Booked"
}
```

SPEC.md §2.11 and §6.3 name `bookingStatus` as the primary state assertion of every flow ("Held" after Hold, a booked status after Book/BookAfterHold, a cancelled/voided status after CancelAfterHold/Void). V2 returns it on the same supplier.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**High** — every V1 flow ends in a Retrieve whose pass/fail hinges on `bookingStatus`. Bookings still complete (real PNR, ticket issued), so nothing is blocked transactionally, but the documented terminal-state contract is unusable and callers must infer state from `tickets` and `holdExpirationDate`, which cannot distinguish a cancelled hold from an unticketed one.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "tickets": {
    "Passenger1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592757",
      "carrierCode": "QR"
    },
    "...": "5 more"
  },
  "creationDate": "2026-10-25T00:00:00",
  "ticketingDate": "2026-10-25T00:00:00",
  "fareType": "Published",
  "bookedCredentialsSelector": "EGY",
  "holdExpirationDate": null,
  "supplier": "SabreNdc",
  "pnr": "RNBJRR",
  "gdsPNR": "RNBJRR"
}
```

**Expected response (redacted):**

```json
{
  "pnr": "RNBJRR",
  "gdsPNR": "RNBJRR",
  "bookingStatus": "Booked"
}
```

## 💥 Impact

No V1 flow can assert booked / held / cancelled / voided state. Cancelled holds and never-ticketed bookings look identical (compare BUG-06). All twelve executed V1 flows (FLOW-V1-01..12) fail on this check.
