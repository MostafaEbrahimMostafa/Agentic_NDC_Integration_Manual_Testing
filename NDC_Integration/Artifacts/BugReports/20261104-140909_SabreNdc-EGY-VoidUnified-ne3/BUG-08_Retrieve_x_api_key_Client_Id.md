# [V1/V2][SabreNdc][Retrieve] – x-api-key / Client-Id Does Not Enforce Authentication Headers in Retrieve Request

## 📄 Description

Retrieve (V1 and V2) returns the full booking when `x-api-key` is missing or invalid and when `Client-Id` is missing or invalid (both header casings). Search, Book and Void with the same headers return 401.

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

Test cases: TC-VOIDCAP-SEC-01, TC-VOIDCAP-SEC-02 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Anyone who knows a PNR, gdsPNR and bookingToken can read passenger and price data without credentials. A Retrieve with dummy ids and no key also reached the supplier (409 from the downstream service), confirming the missing gate.
