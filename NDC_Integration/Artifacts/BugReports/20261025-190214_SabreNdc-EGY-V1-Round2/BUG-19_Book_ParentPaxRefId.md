# [V1][SabreNdc][Book] – Book Accepts an Infant Without a Valid ParentPaxRefId and Issues a Ticket

## 📄 Description

V1 `Book` does not validate the parent reference of an infant passenger. An INF entry with `ParentPaxRefId` omitted, or pointing at a passenger that does not exist (`Pax9`), is accepted and a real, ticketed PNR is created. SPEC.md §2.5 requires every INF to carry a `ParentPaxRefId` that resolves to an adult in the same request. V2 `AddPassenger` on the same supplier already rejects both cases with HTTP 400.

Found by: TC-BOOK-NEG-01, QA run `20261025-190214_SabreNdc-EGY-V1-Round2` (2026-10-25, Round 2).

## 🔁 Steps to Reproduce

1. V1 Search (SabreNdc/EGY, CAI-JED 2026-11-24, 1 ADT + 1 INF) > FareConfirm.
2. POST `api/FlightBooking/Book` with `passengersList` = Pax1 (ADT) and Pax2 (INF) where Pax2 has **no** `ParentPaxRefId` (second attempt: `ParentPaxRefId`: "Pax9").
3. Void the resulting PNRs.

## ❌ Actual Result

```json
// HTTP 200, ticketed PNR RPQRUY
{
  "pnr": "RPQRUY",
  "gdsPNR": "RPQRUY",
  "voidCapability": "FullVoidOnlyAllowed",
  "tickets": {
    "Passenger1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592783",
      "carrierCode": "QR"
    },
    "Passenger2": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592782",
      "carrierCode": "QR"
    }
  }
}
```

Both variants were accepted (first PNR RPQRUY, second RWMMGM) and both were voided straight away.

## ✅ Expected Result

```json
// as V2 AddPassenger already answers
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "Invalid infant to adult reference"
    }
  ]
}
```

SPEC.md §2.5 (Request Rules and Common Errors): an infant without a resolvable ParentPaxRefId must be rejected. V1 Book embeds the same passengersList shape, so the same rule applies there.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**High** — a real ticket is issued for an infant who is not attached to any adult; airlines reject such a booking at check-in or ticketing, so the error surfaces late and costs a void or refund.

## 📎 Evidence

**Actual response (redacted):**

```json
// HTTP 200, ticketed PNR RPQRUY
{
  "pnr": "RPQRUY",
  "gdsPNR": "RPQRUY",
  "voidCapability": "FullVoidOnlyAllowed",
  "tickets": {
    "Passenger1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592783",
      "carrierCode": "QR"
    },
    "Passenger2": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592782",
      "carrierCode": "QR"
    }
  }
}
```

**Expected response (redacted):**

```json
// as V2 AddPassenger already answers
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "Invalid infant to adult reference"
    }
  ]
}
```

## 💥 Impact

V1 clients get no validation for infant-adult pairing and can ticket unattached infants. V1 and V2 now behave differently for the same payload shape.
