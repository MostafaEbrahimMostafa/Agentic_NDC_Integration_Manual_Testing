# [V1/V2][SabreNdc][Retrieve] – x-api-key / Client-Id Does Not Enforce Authentication Headers in Retrieve Request

## 📄 Description

Retrieve (V1 and V2) returns the full booking when `x-api-key` is missing or invalid and when `Client-Id` is missing or invalid (both header casings). Search, Book and Void with the same headers return 401.

**Round 2 (2026-11-05):** Recurrence of BUG-08, 4th confirmed occurrence (first filed in Round 1, 2026-11-04). Retrieve without or with an invalid x-api-key / Client-Id (both casings) returned HTTP 200 with the full booking on 10 of 10 calls (V1 and V2); Void and Book with the same headers returned 401 and nothing was voided or booked.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> Book. Note pnr, gdsPNR, bookingToken.
2. POST api/FlightBooking/RetrieveBooking (V1) and api/v2/FlightBooking/Retrieve (V2) with no x-api-key header, then with x-api-key "invalid-key-000", then with no Client-Id, then with Client-Id "NOT-A-CLIENT".
3. Repeat with Book and Void for comparison.

## ❌ Actual Result

```json
Retrieve without x-api-key: HTTP 200 { "tickets": { ... }, "pnr": "<real>", "passengersList": { ... } }
Book and Void without x-api-key: HTTP 401
```

Anyone who knows a PNR, gdsPNR and bookingToken can read passenger and price data without credentials. A Retrieve with dummy ids and no key also reached the supplier (409 from the downstream service), confirming the missing gate.

## ✅ Expected Result

```json
HTTP 401, no booking data
```

SPEC.md 1.5 and 7.14: every request must carry a valid x-api-key and Client-Id.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Critical** — Booking data, including passenger details, is returned to a caller with no valid credentials.

## 📎 Evidence

**Actual response (redacted):**

```json
Retrieve without x-api-key: HTTP 200 { "tickets": { ... }, "pnr": "<real>", "passengersList": { ... } }
Book and Void without x-api-key: HTTP 401
```

**Expected response (redacted):**

```json
HTTP 401, no booking data
```

Test cases: TC-VOIDCAP-SEC-01, TC-VOIDCAP-SEC-02 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_Book_request.json` / `01_V1_Book_response.json` — V1 Book, `api/FlightBooking/Book`, HTTP 200
- `02_V1_Retrieve_-_no_x-api-key_request.json` / `02_V1_Retrieve_-_no_x-api-key_response.json` — V1 Retrieve - no x-api-key, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `03_V1_Retrieve_-_invalid_x-api-key_request.json` / `03_V1_Retrieve_-_invalid_x-api-key_response.json` — V1 Retrieve - invalid x-api-key, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `04_V1_Retrieve_-_no_Client-Id_request.json` / `04_V1_Retrieve_-_no_Client-Id_response.json` — V1 Retrieve - no Client-Id, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `05_V1_Retrieve_-_invalid_Client-Id_request.json` / `05_V1_Retrieve_-_invalid_Client-Id_response.json` — V1 Retrieve - invalid Client-Id, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `06_V1_Retrieve_-_lower-case_client-id_invalid_request.json` / `06_V1_Retrieve_-_lower-case_client-id_invalid_response.json` — V1 Retrieve - lower-case client-id invalid, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `07_V1_Void_-_no_x-api-key_request.json` / `07_V1_Void_-_no_x-api-key_response.json` — V1 Void - no x-api-key, `api/FlightBooking/Void`, HTTP 401
- `08_V1_Void_-_invalid_x-api-key_request.json` / `08_V1_Void_-_invalid_x-api-key_response.json` — V1 Void - invalid x-api-key, `api/FlightBooking/Void`, HTTP 401
- `09_V1_Void_-_no_Client-Id_request.json` / `09_V1_Void_-_no_Client-Id_response.json` — V1 Void - no Client-Id, `api/FlightBooking/Void`, HTTP 401
- `10_V1_Void_-_invalid_Client-Id_request.json` / `10_V1_Void_-_invalid_Client-Id_response.json` — V1 Void - invalid Client-Id, `api/FlightBooking/Void`, HTTP 401
- `11_V1_Void_-_lower-case_client-id_invalid_request.json` / `11_V1_Void_-_lower-case_client-id_invalid_response.json` — V1 Void - lower-case client-id invalid, `api/FlightBooking/Void`, HTTP 401
- `12_V1_Book_-_no_x-api-key_request.json` / `12_V1_Book_-_no_x-api-key_response.json` — V1 Book - no x-api-key, `api/FlightBooking/Book`, HTTP 401
- `13_V1_Book_-_invalid_x-api-key_request.json` / `13_V1_Book_-_invalid_x-api-key_response.json` — V1 Book - invalid x-api-key, `api/FlightBooking/Book`, HTTP 401
- `14_V1_Book_-_no_Client-Id_request.json` / `14_V1_Book_-_no_Client-Id_response.json` — V1 Book - no Client-Id, `api/FlightBooking/Book`, HTTP 401
- `15_V2_Book_request.json` / `15_V2_Book_response.json` — V2 Book, `api/v2/FlightBooking/Book`, HTTP 200
- `16_V2_Retrieve_-_no_x-api-key_request.json` / `16_V2_Retrieve_-_no_x-api-key_response.json` — V2 Retrieve - no x-api-key, `api/v2/FlightBooking/Retrieve`, HTTP 200
- `17_V2_Retrieve_-_invalid_x-api-key_request.json` / `17_V2_Retrieve_-_invalid_x-api-key_response.json` — V2 Retrieve - invalid x-api-key, `api/v2/FlightBooking/Retrieve`, HTTP 200
- `18_V2_Retrieve_-_no_Client-Id_request.json` / `18_V2_Retrieve_-_no_Client-Id_response.json` — V2 Retrieve - no Client-Id, `api/v2/FlightBooking/Retrieve`, HTTP 200
- `19_V2_Retrieve_-_invalid_Client-Id_request.json` / `19_V2_Retrieve_-_invalid_Client-Id_response.json` — V2 Retrieve - invalid Client-Id, `api/v2/FlightBooking/Retrieve`, HTTP 200
- `20_V2_Retrieve_-_lower-case_client-id_invalid_request.json` / `20_V2_Retrieve_-_lower-case_client-id_invalid_response.json` — V2 Retrieve - lower-case client-id invalid, `api/v2/FlightBooking/Retrieve`, HTTP 200
- `21_V2_Void_-_no_x-api-key_request.json` / `21_V2_Void_-_no_x-api-key_response.json` — V2 Void - no x-api-key, `api/V2/FlightBooking/Void`, HTTP 401
- `22_V2_Void_-_invalid_x-api-key_request.json` / `22_V2_Void_-_invalid_x-api-key_response.json` — V2 Void - invalid x-api-key, `api/V2/FlightBooking/Void`, HTTP 401
- `23_V2_Void_-_no_Client-Id_request.json` / `23_V2_Void_-_no_Client-Id_response.json` — V2 Void - no Client-Id, `api/V2/FlightBooking/Void`, HTTP 401
- `24_V2_Void_-_invalid_Client-Id_request.json` / `24_V2_Void_-_invalid_Client-Id_response.json` — V2 Void - invalid Client-Id, `api/V2/FlightBooking/Void`, HTTP 401
- `25_V2_Void_-_lower-case_client-id_invalid_request.json` / `25_V2_Void_-_lower-case_client-id_invalid_response.json` — V2 Void - lower-case client-id invalid, `api/V2/FlightBooking/Void`, HTTP 401
- `26_V2_Book_-_no_x-api-key_request.json` / `26_V2_Book_-_no_x-api-key_response.json` — V2 Book - no x-api-key, `api/v2/FlightBooking/Book`, HTTP 401
- `27_V2_Book_-_invalid_x-api-key_request.json` / `27_V2_Book_-_invalid_x-api-key_response.json` — V2 Book - invalid x-api-key, `api/v2/FlightBooking/Book`, HTTP 401
- `28_V2_Book_-_no_Client-Id_request.json` / `28_V2_Book_-_no_Client-Id_response.json` — V2 Book - no Client-Id, `api/v2/FlightBooking/Book`, HTTP 401

## 💥 Impact

Anyone who knows a PNR, gdsPNR and bookingToken can read passenger and price data without credentials. A Retrieve with dummy ids and no key also reached the supplier (409 from the downstream service), confirming the missing gate.
