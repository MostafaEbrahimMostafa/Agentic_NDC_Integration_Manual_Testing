# [V2][TravelportNdc][Void] – passengersVoidedAncillaries Returned as Null Instead of an Empty Collection

## 📄 Description

For a booking without ancillaries, TravelportNdc V2 Void returns `passengersVoidedAncillaries: null` while `emdTickets` is `{}`; SabreNdc returns `{}` for both.

Found by: TC-VOIDTPN-VAL-10, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (1 ADT, no ancillaries): pnr 72HZA2.
2. POST `api/V2/FlightBooking/Void` with voidTickets [].

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427280",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 13.1s; the null appears in every successful TravelportNdc V2 Void.

## ✅ Expected Result

```json
{
  "voided": true,
  "voidedTickets": [
    "..."
  ],
  "passengersVoidedAncillaries": {},
  "emdTickets": {}
}
```

TC-VOIDTPN-VAL-10 / SPEC.md §2.15: both V2-only fields present and empty, not null; SabreNdc V2 Void (SFDJFF) returned `{}` and `{}` on the same day.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Cosmetic/consistency: the success itself is correct, but the field type differs from emdTickets and from the SabreNdc response.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427280",
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
    "..."
  ],
  "passengersVoidedAncillaries": {},
  "emdTickets": {}
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-VAL-10).

## 💥 Impact

Clients that iterate the field without a null check fail on every TravelportNdc Void, and the two V2-only fields behave differently from each other.
