# [V1 and V2][TravelportNdc][Void] – bookingToken Only Checked for Presence: Upper-Cased, 1000-Character or Another Booking's Token Still Voids the Booking

## 📄 Description

TravelportNdc Void now rejects an omitted, empty or whitespace-only `bookingToken` (400 "BookingToken is required"), but any other non-blank string is accepted: an upper-cased token, a 1000-character token and another booking's token all return 200 `voided:true` and void the booking, on V1 and V2. The token is therefore not matched to the booking, and the over-length value is not rejected.

Recurrence of BUG-03 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`), narrowed: in Round 1 the missing and empty cases also voided the booking.

Found by: TC-VOIDTPN-BND-01, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (1 ADT): pnr 775K6H, gdsPNR HNGL21.
2. POST `api/V2/FlightBooking/Void` with the correct pnr and gdsPNR, surName Ibrahim, voidTickets [] and bookingToken set to a string of 1000 "A" characters (repeat with the token of a second booking, and with the real token upper-cased).
3. Retrieve the booking: 409 "Reservation is already cancelled." Same on V1 (`api/FlightBooking/Void`).

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602487",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
// with another booking's token (NEG-02):
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602488",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 11.7s; the booking was voided. 1000-character token: V1 ticket 1572141602452 and V2 ticket 1572141602487 voided; mixed token: V1 1572141602453, V2 1572141602488.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "BookingToken is invalid for this booking"
    }
  ]
}
```

AC Void Request lists bookingToken as an identifier of the booking; TC-VOIDTPN-BND-01 expects 400 for an over-length token and TC-VOIDTPN-NEG-02 expects another booking's token to be rejected. SPEC.md 2.15.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response (HTTP 200 body carries no TransactionId)`

## 📊 Severity

**High** — The token gives no protection: a caller with only a pnr/gdsPNR can void any ticketed booking by sending any non-blank string, and a wrong token is never reported.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602487",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "BookingToken is invalid for this booking"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-BND-01).

## 💥 Impact

The bookingToken cannot be relied on to bind a Void to its booking, so voiding is authorised by the gdsPNR alone. Together with BUG-04 (surName) and BUG-13 (duplicate tokens) no field of the Void request actually identifies the owner of the booking.
