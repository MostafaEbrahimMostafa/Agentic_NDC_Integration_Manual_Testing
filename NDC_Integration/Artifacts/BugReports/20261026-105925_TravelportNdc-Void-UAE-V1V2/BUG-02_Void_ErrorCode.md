# [V1][TravelportNdc][Void] – ErrorCode Returned as OperationNotSupported for a Same-Day Ticketed Booking (V2 Void Works)

## 📄 Description

On the ne-5 build, V2 Void works for TravelportNdc, but the V1 endpoint `api/FlightBooking/Void` still returns the 2026-08-05 baseline 409 `OperationNotSupported` ("TravelportNdc does not exists"). The V1 route itself is fine (it voids SabreNdc in ~10s), so the TravelportNdc handler is not registered for V1. Because routing runs before request validation, even a V1 request with no pnr gets this 409 instead of a 400.

Found by: TC-CAPCHECK-TPN-03, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V1 Search (TravelportNdc/UAE, CAI-JED 2026-11-12, 1 ADT), FareConfirm, Book: pnr 72HIJQ, gdsPNR HNGC0J, ticket 1572141427279 Booked.
2. POST `api/FlightBooking/Void` with supplier TravelportNdc, credentialsSelector UAE, the Book pnr/gdsPNR/bookingToken, surName Ibrahim, voidTickets [].
3. RetrieveBooking: the ticket is still Booked. Compare: the same request shape on V2 (`api/V2/FlightBooking/Void`) returns 200 voided:true.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "fc7546a6-a82b-4e1c-9424-a66c1614defe",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [
    {
      "Name": "OperationNotSupported",
      "Value": "TravelportNdc does not exists"
    }
  ]
}
```

HTTP 409 in 0.4-0.9s, both attempts. Re-confirmed in every V1 Void case and V1 flow (FLOW-V1-03/05/09/11-TPN).

## ✅ Expected Result

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427279",
      "carrierCode": "QR"
    }
  ]
}
```

AC Void Request and SPEC.md §2.15: Void is routed to a TravelportNdc handler and succeeds for a same-day ticketed booking, as it does on V2.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `fc7546a6-a82b-4e1c-9424-a66c1614defe (TransactionId; second attempt fb13b0d5-3f07-4f9c-8752-0d9aff1bbf01)`

## 📊 Severity

**High** — V1 clients cannot void TravelportNdc bookings at all, so every V1 Void case and V1 Void flow ends at the Void hop and the ticket stays live.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "fc7546a6-a82b-4e1c-9424-a66c1614defe",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [
    {
      "Name": "OperationNotSupported",
      "Value": "TravelportNdc does not exists"
    }
  ]
}
```

**Expected response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [
    {
      "ticketStatus": "Voided",
      "ticketNumber": "1572141427279",
      "carrierCode": "QR"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-CAPCHECK-TPN-03).

## 💥 Impact

V1 integrators (and the V1 Void flows 3, 5, 9 and 11) cannot complete. The V1 tickets created by the tests had to be voided through the V2 endpoint, which works for V1-created bookings.
