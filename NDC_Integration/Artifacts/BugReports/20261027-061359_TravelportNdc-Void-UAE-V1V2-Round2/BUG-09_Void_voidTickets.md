# [V1 and V2][TravelportNdc][Void] – voidTickets List Ignored: a Subset, Fabricated or Foreign Ticket Voids Every Ticket

## 📄 Description

TravelportNdc Void does not honour the `voidTickets` list. Asking for one ticket of a 3-passenger PNR voids all three (ADT, CHD and INF); a fabricated ticket number and another booking's ticket number also void every ticket of the booking identified by the gdsPNR. Seen on V1 and V2.

Recurrence of BUG-09 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`, V2 only) and of SabreNdc BUG-02 (2026-10-22); V1 now shows it as well.

Found by: TC-VOIDTPN-BIZ-06, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book with 1 ADT + 1 CHD + 1 INF: pnr 773AYB, gdsPNR HNGKXQ, tickets 1572141602420, 1572141602419, 1572141602421.
2. POST `api/V2/FlightBooking/Void` with the Book ids, surName Ibrahim and `voidTickets: [{"ticketNumber":"1572141602420","carrierCode":"QR","ticketStatus":"Booked"}]`.
3. Retrieve: 409 "Reservation is already cancelled." (all tickets voided). Same on V1 with booking 7746DZ.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602420",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602419",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602421",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 15.6s: 3 tickets voided although 1 was requested. V1: 3 tickets voided. Fabricated ticket 1570000000000 and a foreign ticket number also voided the whole booking (NEG-03).

## ✅ Expected Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602420",
      "carrierCode": "QR"
    }
  ]
}
// or a 4xx envelope stating that partial void is not supported
```

TC-VOIDTPN-BIZ-06: either only the listed ticket is voided and the others stay Booked, or the request is rejected; silently voiding all tickets is a defect. SPEC.md 2.15 voidTickets.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response (HTTP 200 body carries no TransactionId)`

## 📊 Severity

**High** — Selective void is impossible and a wrong ticket list produces the maximum-damage outcome (everything voided, including an infant ticket separated from its ADT).

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602420",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602419",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602421",
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
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141602420",
      "carrierCode": "QR"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-BIZ-06).

## 💥 Impact

A caller that sends the wrong list (or a deliberately foreign one) cannot rely on the response to tell what was voided, and the caller cannot void a single ticket.
