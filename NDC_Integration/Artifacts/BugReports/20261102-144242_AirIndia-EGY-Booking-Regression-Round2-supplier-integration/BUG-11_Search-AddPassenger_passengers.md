# [V1/V2][AirIndia][Search / AddPassenger] – Invalid Parties Accepted: Child Without Adult, 10 Passengers, 12-Year-Old Child

## 📄 Description

Search accepts one child with no adult (returns 64 offers) and a party of 10 that is over the limit only because of infants returns HTTP 200 with an empty offers[] after ~15 s instead of a 400, on V1 and V2; AddPassenger then accepts a child born 12 years and 1 month before travel

## 🔁 Steps to Reproduce

1. Search with passengers [{CHD:1}] only; Search with 6 ADT + 2 CHD + 2 INF; AddPassenger with a child born 12 years and 1 month before travel.

## ❌ Actual Result

```json
CHD only: HTTP 200 with 64 offers; 10 passengers: HTTP 200 { "offers": [] } after ~15 s; 12-year-old child: HTTP 200 { "offerId", "responseId" }
```

Invalid parties reach the supplier and fail late; a 12-year-old can be booked at the child fare

## ✅ Expected Result

```json
HTTP 400 NDC-INT-TEC-A0001 for each
```

Expected per SPEC.md §2.1, 7.8 and the platform's own V2 behaviour where cited. Expected value: 400 NDC-INT-TEC-A0001 for a child without an adult and for 10 passengers; AddPassenger rejects a 12-year-old as a child

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Search / AddPassenger`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Invalid parties reach the supplier and fail late, or are booked at the wrong fare.

## 📎 Evidence

**Actual response (redacted):**

```json
CHD only: HTTP 200 with 64 offers; 10 passengers: HTTP 200 { "offers": [] } after ~15 s; 12-year-old child: HTTP 200 { "offerId", "responseId" }
```

**Expected response (redacted):**

```json
HTTP 400 NDC-INT-TEC-A0001 for each
```

Test cases: TC-AIEGY-SRCH-PAX-03, TC-AIEGY-SRCH-PAX-06, TC-AIBK-ADDPAX-BND-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-SRCH-PAX-03, TC-AIEGY-SRCH-PAX-06, TC-SEARCH-BND-03, TC-AIBK-ADDPAX-BND-01

## 💥 Impact

Invalid parties reach the supplier and fail late; a 12-year-old can be booked at the child fare
