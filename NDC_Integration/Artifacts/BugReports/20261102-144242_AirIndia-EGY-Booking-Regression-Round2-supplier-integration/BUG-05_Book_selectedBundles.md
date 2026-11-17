# [V1][AirIndia][Book] – Empty selectedBundles Rejected by V1 Book

## 📄 Description

V1 Book rejects the documented minimal body (selectedBundles: []) with 400 "selectedBundles list count must match offer journeys count"; every V1 booking needs one entry per journey even though a bundle is optional (the base bundle DEL costs 0)

## 🔁 Steps to Reproduce

1. V1 Search DEL-BOM 1 adult, FareConfirm.
2. POST api/FlightBooking/Book with passengersList, contactsList and "selectedBundles": [].

## ❌ Actual Result

```json
HTTP 400 { "ErrorCode": "NDC-INT-TEC-A0001", "Context": [ { "Value": "selectedBundles list count must match offer journeys count." } ] }
```

The sample request in the collection and SPEC cannot book; integrators must call GetOfferBundles on every booking just to pick a free base bundle

## ✅ Expected Result

```json
HTTP 200 with a PNR (base fare, no bundle)
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: selectedBundles: [] books the base fare, as in every saved example

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `9471d02c-853f-49c5-bd90-682f49489b21`

## 📊 Severity

**Medium** — The documented minimal request cannot book; integrators must call GetOfferBundles on every booking.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 400 { "ErrorCode": "NDC-INT-TEC-A0001", "Context": [ { "Value": "selectedBundles list count must match offer journeys count." } ] }
```

**Expected response (redacted):**

```json
HTTP 200 with a PNR (base fare, no bundle)
```

Test cases: TC-AIBK-V1-BDL-EMPTY-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-V1-BDL-EMPTY-01; V1 bookings in this run pass only with selectedBundles built from GetOfferBundles

## 💥 Impact

The sample request in the collection and SPEC cannot book; integrators must call GetOfferBundles on every booking just to pick a free base bundle
