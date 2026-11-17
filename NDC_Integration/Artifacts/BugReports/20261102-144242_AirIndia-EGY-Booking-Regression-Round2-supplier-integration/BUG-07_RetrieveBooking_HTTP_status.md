# [V1][AirIndia][RetrieveBooking] – V1 RetrieveBooking Returns HTTP 500 for a V2-Created PNR

## 📄 Description

V1 RetrieveBooking returns HTTP 500 ServerError for a PNR that was created through the V2 Book (the V2 Retrieve of a V1 PNR returns 200)

## 🔁 Steps to Reproduce

1. Create a booking through V2 (Search, FareConfirm, AddPassenger, Book).
2. POST api/FlightBooking/RetrieveBooking with that pnr, gdsPnr and bookingToken.

## ❌ Actual Result

```json
HTTP 500 { "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference." }
```

Clients migrating between versions, or mixing them, cannot read back V2 bookings

## ✅ Expected Result

```json
HTTP 200 with the booking (the V2 Retrieve of a V1 PNR returns 200)
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: 200 with the booking, or a mapped error naming the version mismatch

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `RetrieveBooking`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `696ca713-5e51-42cb-8a2f-eeb147d51f6c`

## 📊 Severity

**Medium** — Clients that mix versions cannot read back V2 bookings through V1.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 500 { "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference." }
```

**Expected response (redacted):**

```json
HTTP 200 with the booking (the V2 Retrieve of a V1 PNR returns 200)
```

Test cases: TC-AIEGY-RET-02 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-RET-02 (V2 PNR CTMKHI)

## 💥 Impact

Clients migrating between versions, or mixing them, cannot read back V2 bookings
