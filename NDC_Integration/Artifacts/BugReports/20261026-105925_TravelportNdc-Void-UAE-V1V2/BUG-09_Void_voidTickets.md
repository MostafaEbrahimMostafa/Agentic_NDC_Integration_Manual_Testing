# [V2][TravelportNdc][Void] – voidTickets List Ignored: a Subset, Fabricated or Foreign Ticket Voids Every Ticket

## 📄 Description

TravelportNdc V2 Void does not honour the `voidTickets` list. Naming one ticket of three voids all three; naming a ticket not on the PNR (fabricated 1570000000000, or another booking's real ticket) voids all of the PNR's own tickets. The other booking's ticket is never touched. `[]` and an omitted field also mean void-all; `null` is rejected.

Found by: TC-VOIDTPN-BIZ-06, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Book 1 ADT + 1 CHD + 1 INF: pnr 72HKTY, tickets 1572141427291, -292, -293.
2. POST `api/V2/FlightBooking/Void` with `voidTickets: [{ "ticketNumber": "1572141427292", "carrierCode": "QR", "ticketStatus": "Booked" }]`.
3. Retrieve: 409 "Reservation is already cancelled." (repeat with a fabricated or a foreign ticket number: same result)

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427292",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427291",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427293",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 15.7s. Fabricated ticket variant: 72IOH6; foreign ticket variant: 72IWP7.

## ✅ Expected Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427292",
      "carrierCode": "QR"
    }
  ]
}
```

SPEC.md §2.15 voidTickets and TC-VOIDTPN-BIZ-06/NEG-03: only the listed ticket is voided, or the request is rejected with a 4xx (e.g. "Partial void is not supported"); a ticket not on the PNR is always rejected.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — Selective void silently becomes void-all, including infant tickets; same defect class as SabreNdc 2026-10-22.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427292",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427291",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427293",
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
      "ticketNumber": "1572141427292",
      "carrierCode": "QR"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-BIZ-06).

## 💥 Impact

A caller asking to void one ticket (or mistyping a number) loses every ticket on the booking, and it destroys tickets the caller meant to keep.
