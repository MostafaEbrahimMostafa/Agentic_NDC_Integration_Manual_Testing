# [V2][AirIndia][Book] – availableCount Advertises 50/400 but Book Allows Only One SSR per Passenger and Leg

## 📄 Description

GetAncillary advertises availableCount 50 (baggage) and 400 (meal) but Book refuses any quantity above 1 with 409 NDC-INT-UNC-Z9999 "SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg"; quantities 51 and 999 fail the same way. The limit is not published and the error code is the unmapped catch-all

## 🔁 Steps to Reproduce

1. Search, FareConfirm, AddPassenger, GetAncillary (SBHC availableCount 50).
2. Book with PassengersSelectedAncillaries Quantity "2" for SBHC (also Quantity 51 and 999).

## ❌ Actual Result

```json
HTTP 409 { "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Value": "SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg." } ] }
```

Customers who select two bags are blocked at the last step with an error integrators cannot interpret

## ✅ Expected Result

```json
GetAncillary publishes the real limit (availableCount 1 or a max field) and an over-limit quantity returns a mapped 400
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: availableCount (or a new maxPerPassengerPerLeg field) reflects the real limit, and an over-limit quantity gets a mapped 400

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `d8156fb9-6b39-434b-8371-6c277430823b`

## 📊 Severity

**Medium** — Customers who select two bags are blocked at the last step by an error integrators cannot interpret.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 409 { "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Value": "SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg." } ] }
```

**Expected response (redacted):**

```json
GetAncillary publishes the real limit (availableCount 1 or a max field) and an over-limit quantity returns a mapped 400
```

Test cases: TC-AIBK-ANC-05, FLOW-V2-61-NEG (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-ANC-05, FLOW-V2-61-NEG (meal 999 rejected with the SSR limit message; baggage 51 also rejected)

## 💥 Impact

Customers who select two bags are blocked at the last step with an error integrators cannot interpret
