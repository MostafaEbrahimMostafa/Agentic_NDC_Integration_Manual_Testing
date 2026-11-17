# [V1/V2][AirIndia][Retrieve] – bookingStatus Returned as "UnKnown" (V2) and Missing (V1) in Retrieve Response

## 📄 Description

After every successful Book, V2 Retrieve reports bookingStatus "UnKnown" and V1 RetrieveBooking has no bookingStatus field at all, so no booked/confirmed state can be read. Book and Retrieve also disagree on selectedOffer.offerId (a new GUID on every Retrieve call)

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (success, PNR returned).
2. POST api/v2/FlightBooking/Retrieve with pnr, gdsPnr, bookingToken (V1: api/FlightBooking/RetrieveBooking).

## ❌ Actual Result

```json
"bookingStatus": "UnKnown"      // V1 RetrieveBooking: no bookingStatus field in the response
```

Clients cannot tell a confirmed booking from a failed one; every Family A flow fails its end-state check

## ✅ Expected Result

```json
"bookingStatus": "Booked"      // or the documented confirmed value, present on V1 too
```

Expected per SPEC.md §2.11, 6.3 and the platform's own V2 behaviour where cited. Expected value: bookingStatus "Booked" (or the documented confirmed value) on V2, the same field on V1, and a stable selectedOffer.offerId

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — A confirmed booking cannot be told from a failed one by status; every end-to-end flow fails its end-state check. selectedOffer.offerId also changes on every Retrieve.

## 📎 Evidence

**Actual response (redacted):**

```json
"bookingStatus": "UnKnown"      // V1 RetrieveBooking: no bookingStatus field in the response
```

**Expected response (redacted):**

```json
"bookingStatus": "Booked"      // or the documented confirmed value, present on V1 too
```

Test cases: FLOW-V2-25, FLOW-V1-01, TC-RETRIEVE-POS-01, TC-AIBK-DATA-06 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). FLOW-V2-25/31/37/43/49/55/61/67, FLOW-V1-01, TC-RETRIEVE-POS-01, TC-RETRIEVE-REG-01, TC-RETRIEVE-VAL-01, TC-AIBK-DATA-06 (offerId changes between two Retrieve calls)

## 💥 Impact

Clients cannot tell a confirmed booking from a failed one; every Family A flow fails its end-state check
