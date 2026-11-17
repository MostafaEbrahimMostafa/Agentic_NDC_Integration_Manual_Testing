# [V1/V2][SabreNdc][Void] – Void Intermittently Refused with HTTP 409 "oops, something went seriously wrong" (AA in Round 1, QR in Round 2)

## 📄 Description

On V1 AA bookings Void sometimes returns HTTP 200 `{"voided": false, "voidedTickets": [{"ticketStatus": "None"}]}`, and sometimes an intermittent 409 "External service returned error ... code 325 ... Cannot perform cancellation" that succeeds on retry. After a `voided: false` response the order was in fact cancelled (a second Void says "no active order items") while Retrieve still showed ticketStatus "Booked".

**Round 2 (2026-11-05):** Recurrence of BUG-06, 4th confirmed occurrence (first filed in Round 1, 2026-11-04). Final build (Build B), carrier QR: 1 of 343 first Void attempts were refused with HTTP 409 NDC-INT-UNC-Z9999 "oops, something went seriously wrong" (V1 CAI-JED #10); the retry succeeded. In Round 1 the intermittent 409 was seen on AA.

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

Test cases: TC-VOIDCAP-BIZ-01, TC-VOIDCAP-REG-01 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_CAI-JED_10_FareConfirm_request.json` / `01_V1_CAI-JED_10_FareConfirm_response.json` — V1 CAI-JED #10 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `02_V1_CAI-JED_10_Book_request.json` / `02_V1_CAI-JED_10_Book_response.json` — V1 CAI-JED #10 Book, `api/FlightBooking/Book`, HTTP 200
- `03_V1_CAI-JED_10_Retrieve_request.json` / `03_V1_CAI-JED_10_Retrieve_response.json` — V1 CAI-JED #10 Retrieve, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `04_V1_CAI-JED_10_Void_request.json` / `04_V1_CAI-JED_10_Void_response.json` — V1 CAI-JED #10 Void, `api/FlightBooking/Void`, HTTP 409
- `05_V1_CAI-JED_10_Void-retry_request.json` / `05_V1_CAI-JED_10_Void-retry_response.json` — V1 CAI-JED #10 Void-retry, `api/FlightBooking/Void`, HTTP 200
- `06_V1_CAI-JED_10_Retrieve-after-void_request.json` / `06_V1_CAI-JED_10_Retrieve-after-void_response.json` — V1 CAI-JED #10 Retrieve-after-void, `api/FlightBooking/RetrieveBooking`, HTTP 200

## 💥 Impact

Clients may treat 200 as success and show a booking as voided that Retrieve still reports as ticketed, or retry and receive a confusing 409.
