# [V2][TravelportNdc][Void] – surName Ignored: a Surname That Matches No Passenger Still Voids the Booking

## 📄 Description

TravelportNdc V2 Void ignores `surName`. A surname that matches no passenger ("Mismatch"), no surname at all, and every SEC-04 injection string (SQL, script tag, 500 characters) all void the booking.

Found by: TC-VOIDTPN-VAL-04, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (1 ADT, surname Ibrahim): pnr 72J5K8.
2. POST `api/V2/FlightBooking/Void` with the correct pnr, gdsPNR, bookingToken and `surName: "Mismatch"` (repeat with surName omitted).
3. Retrieve: 409 "Reservation is already cancelled."

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427297",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 11.8s. Same for surName omitted (72IQPE), SQL (72IOSA), script tag (72J926) and 500-character (72JBSQ) values.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Value": "surName does not match any passenger on the PNR"
    }
  ]
}
```

SPEC.md §2.15 Common Errors: voiding with an incorrect surName must fail; TC-VOIDTPN-VAL-04 and SEC-04 expect a 4xx with the booking left ticketed.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The passenger-identity check documented for Void does not exist; recurrence of the SabreNdc surName defect of 2026-10-22.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427297",
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
      "Value": "surName does not match any passenger on the PNR"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-VAL-04).

## 💥 Impact

A caller holding only a gdsPNR can void a booking it cannot otherwise identify, and no input hardening applies to this field.
