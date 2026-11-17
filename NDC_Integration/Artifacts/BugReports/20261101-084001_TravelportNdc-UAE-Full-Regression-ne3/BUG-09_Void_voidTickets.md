# [V1 and V2][TravelportNdc][Void] – voidTickets List Ignored: a Subset, Fabricated or Foreign Ticket Voids Every Ticket

## 📄 Description

Void ignores the `voidTickets` list. Listing one ticket of a 3-passenger PNR voids all three; fabricated and foreign ticket numbers also void every ticket; omitting the field voids all.

Recurrence of BUG-09 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01). Occurrence 3.

Found by: TC-VOIDTPN-BIZ-06, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Book 1 ADT + 1 CHD + 1 INF on V1 or V2.
2. POST Void with `voidTickets` containing only the ADT ticket.
3. Retrieve: 409; all three tickets voided.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141603190",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141603189",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141603191",
      "carrierCode": "QR"
    }
  ]
}
```

BIZ-06: voidedTickets 3, still Booked 0/3 on V1 and V2; NEG-03 fabricated and foreign ticket both voided on V1 and V2; VAL06-omit voided

## ✅ Expected Result

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "<ADT ticket>", "carrierCode": "QR" } ]
}
// or a 4xx envelope stating that partial void is not supported
```

SPEC.md 2.15 voidTickets; TC-VOIDTPN-BIZ-06 and NEG-03.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — A wrong ticket list produces the maximum-damage outcome and selective void is impossible.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141603190",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141603189",
      "carrierCode": "QR"
    },
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141603191",
      "carrierCode": "QR"
    }
  ]
}
```

**Expected response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "<ADT ticket>", "carrierCode": "QR" } ]
}
// or a 4xx envelope stating that partial void is not supported
```

## 💥 Impact

The infant ticket is voided with the adult and a typo in the list voids the whole booking. A caller cannot void one passenger; a wrong ticket list silently voids the whole booking
