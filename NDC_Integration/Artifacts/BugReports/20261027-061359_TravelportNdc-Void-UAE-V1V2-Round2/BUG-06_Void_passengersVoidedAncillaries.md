# [V2][TravelportNdc][Void] – passengersVoidedAncillaries Returned as Null Instead of an Empty Collection

## 📄 Description

The V2 Void response returns `passengersVoidedAncillaries: null` for a booking without ancillaries, while `emdTickets` is `{}`. The SabreNdc baseline returns `{}` for both.

Recurrence of BUG-06 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`); unchanged in Round 2.

Found by: TC-VOIDTPN-VAL-10, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (1 ADT, no ancillaries): pnr 773JKY, gdsPNR HNGKWF.
2. POST `api/V2/FlightBooking/Void` with the Book ids, surName Ibrahim, voidTickets [].

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427425",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 15.3s. V2 CancelAfterHold shows the same pattern (passengersCancelledAncillaries: null).

## ✅ Expected Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427425",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": {},
  "emdTickets": {}
}
```

TC-VOIDTPN-VAL-10: both arrays present and empty (SabreNdc baseline), not null.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response (HTTP 200 body carries no TransactionId)`

## 📊 Severity

**Low** — Cosmetic/consistency: Void still succeeds and the ticket list is correct.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427425",
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
  "passengersVoidedAncillaries": {}
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-VAL-10).

## 💥 Impact

Consumers must null-check one field that is documented as a collection; strongly typed clients that assume a non-null map can fail on the response.
