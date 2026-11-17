# [V2][TravelportNdc][Void] – pnr Accepted When Whitespace-Only: Booking Is Voided From gdsPNR

## 📄 Description

TravelportNdc V2 Void only checks that `pnr` is non-empty and at most 9 characters. A whitespace-only pnr ("      ") passes and the booking is voided via `gdsPNR`; a lower-cased pnr also voids. An empty pnr is correctly rejected with 400 "PNR is required".

Found by: TC-VOIDTPN-BND-01, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Book (1 ADT): pnr 72H7ZT, gdsPNR HNGC21.
2. POST `api/V2/FlightBooking/Void` with `pnr: "      "` and the correct gdsPNR, bookingToken, surName.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427290",
      "carrierCode": "QR"
    }
  ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 12.5s (booking 72H7ZT). Over-length pnr (256 characters) is rejected with 400 "Maximum length of a PNR is 9 characters".

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "PNR is required"
    }
  ]
}
```

SPEC.md §2.15 and §8 (string-field boundary): a blank required string is rejected the same way as an empty one.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — The pnr is never cross-checked against the booking, so a blank or mistyped pnr cannot be detected.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427290",
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
      "Value": "PNR is required"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-BND-01).

## 💥 Impact

pnr is effectively decorative: the PNR/gdsPNR pair is never verified against each other, which also removes a safety net against voiding the wrong booking.
