# [V2][TravelportNdc][Void] – bookingToken Not Validated: Missing, Empty or Foreign Token Still Voids the Booking

## 📄 Description

TravelportNdc V2 Void does not use or validate `bookingToken`. A Void with the token omitted, empty, whitespace-only, upper-cased, 1000 characters long, or taken from another booking succeeds and voids the booking. The booking is located from `gdsPNR` alone.

Found by: TC-VOIDTPN-VAL-02, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (1 ADT): pnr 72IEZ9.
2. POST `api/V2/FlightBooking/Void` with the correct pnr, gdsPNR and surName, but `bookingToken: ""` (repeat with the field omitted, with "      ", and with another booking's token).
3. Retrieve: 409 "Reservation is already cancelled."

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427298",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in ~12s for omitted (72IAMX), empty (72IEZ9), whitespace (72IUYQ), upper-case (72I63V), 1000-character (72JLS4) and foreign (72HRKN) tokens.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "BookingToken is required"
    }
  ]
}
```

SPEC.md §2.15 lists bookingToken as a required Void field; AC Error Handling and §8.1 item 2 require a 400 for a missing required field, and a token that does not belong to the PNR must be rejected too.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The token that should prove the caller owns the booking is ignored, so anyone with a gdsPNR can void a ticket.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427298",
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
      "Value": "BookingToken is required"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-VAL-02).

## 💥 Impact

Void is destructive and irreversible. With the token unchecked (and surName unchecked, BUG-04) the only thing standing between a caller and any ticket is knowing its gdsPNR.
