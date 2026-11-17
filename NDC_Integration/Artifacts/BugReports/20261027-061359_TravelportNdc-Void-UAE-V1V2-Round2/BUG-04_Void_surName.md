# [V1 and V2][TravelportNdc][Void] – surName Ignored: a Surname That Matches No Passenger Still Voids the Booking

## 📄 Description

TravelportNdc Void ignores `surName` on V1 and V2. A surname that matches no passenger ("Mismatch"), no surname at all, and every SEC-04 injection string (SQL, script tag, 500 characters) all return 200 `voided:true` and void the booking.

Recurrence of BUG-04 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`, V2 only) and of the SabreNdc defect of 2026-10-22. It now also reproduces on V1 because V1 Void works.

Found by: TC-VOIDTPN-VAL-04, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (1 ADT, passenger surname Ibrahim): pnr 773AAX, gdsPNR HNGKYD.
2. POST `api/V2/FlightBooking/Void` with the correct pnr, gdsPNR and bookingToken and `surName: "Mismatch"` (repeat with surName omitted, and with the SEC-04 strings).
3. Retrieve: 409 "Reservation is already cancelled." Same on V1 (`api/FlightBooking/Void`, booking 77583P).

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602427",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 11.3s on V2 and 11.5s on V1. Same for surName omitted (V1 1572141602474, V2 1572141602426) and for the SQL, script-tag and 500-character strings.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "surName does not match any passenger on the PNR"
    }
  ]
}
```

SPEC.md 2.15 Common Errors: voiding with an incorrect surName must fail; TC-VOIDTPN-VAL-04 and SEC-04 expect a 4xx with the booking left ticketed.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response (HTTP 200 body carries no TransactionId)`

## 📊 Severity

**High** — The passenger-identity check documented for Void does not exist, so a booking can be voided by anyone who knows its gdsPNR.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602427",
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
      "Value": "surName does not match any passenger on the PNR"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-VAL-04).

## 💥 Impact

A caller holding only a gdsPNR can void a booking it cannot otherwise identify, and no input hardening applies to this field.
