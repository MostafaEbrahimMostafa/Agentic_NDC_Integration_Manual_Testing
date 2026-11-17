# [V1][SabreNdc][Void] – voided Returned Incorrect Value (200 with voided=false) on AA Bookings in Void Response

## 📄 Description

On V1 AA bookings Void sometimes returns HTTP 200 `{"voided": false, "voidedTickets": [{"ticketStatus": "None"}]}`, and sometimes an intermittent 409 "External service returned error ... code 325 ... Cannot perform cancellation" that succeeds on retry. After a `voided: false` response the order was in fact cancelled (a second Void says "no active order items") while Retrieve still showed ticketStatus "Booked".

## 🔁 Steps to Reproduce

1. Search JFK-MIA (SabreNdc/EGY, 1 ADT), FareConfirm, V1 Book of an AA offer.
2. POST V1 Void.
3. POST Retrieve, then Void again.

## ❌ Actual Result

```json
// Void
HTTP 200 { "voided": false, "voidedTickets": [ { "ticketStatus": "None", "ticketNumber": "0015763962826", "carrierCode": "AA" } ] }
// Retrieve afterwards
"tickets": { "Passenger1": { "ticketStatus": "Booked" } }
// second Void
HTTP 409 "Unable to process documents via NDC. Cancellation not possible, there are no active order items in this order."
```

Clients may treat 200 as success and show a booking as voided that Retrieve still reports as ticketed, or retry and receive a confusing 409.

## ✅ Expected Result

```json
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", ... } ] }  // or a mapped error, never 200 with voided=false
```

SPEC.md 2.15: a 200 Void response means the tickets are voided; state must be consistent across Void and Retrieve.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Non-blocking but misleading: HTTP 200 is returned for a Void that reports no ticket voided, and the booking state afterwards is inconsistent.

## 📎 Evidence

**Actual response (redacted):**

```json
// Void
HTTP 200 { "voided": false, "voidedTickets": [ { "ticketStatus": "None", "ticketNumber": "0015763962826", "carrierCode": "AA" } ] }
// Retrieve afterwards
"tickets": { "Passenger1": { "ticketStatus": "Booked" } }
// second Void
HTTP 409 "Unable to process documents via NDC. Cancellation not possible, there are no active order items in this order."
```

**Expected response (redacted):**

```json
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", ... } ] }  // or a mapped error, never 200 with voided=false
```

Test cases: TC-VOIDCAP-BIZ-01, TC-VOIDCAP-BND-03 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Clients may treat 200 as success and show a booking as voided that Retrieve still reports as ticketed, or retry and receive a confusing 409.
