# [V1 and V2][TravelportNdc][Search] – passengers[] (Search validation) Returns 200 With No Offers for a 10-Passenger Party Instead of a Validation Error

## 📄 Description

Search for 6 ADT + 2 CHD + 2 INF (10 passengers counting infants) returns 200 and an empty offers[] on V1 and V2, while ADT+CHD above 9 (10 ADT, 9 ADT + 1 CHD) returns 400.

Found by: TC-SEARCH-BND-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. POST V1 or V2 Search CAI-JED with passengers ADT 6, CHD 2, INF 2.
2. Control: ADT 5, CHD 2, INF 2 returns offers.

## ❌ Actual Result

```json
{ "offers": [] }  // HTTP 200
```

V1 and V2: 6A+2C+2I 200 offers 0; 9-passenger control 5A+2C+2I returns offers; TC-TPNREG-PAX-NEG-04/05 (10 ADT, 9 ADT+1 CHD) return 400; the first passenger-search pass showed 200/empty for every combination above 9 with infants

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [ { "Value": "Total number of passengers must not exceed 9" } ]
}
```

SPEC.md 2.1: total ADT+CHD+INF must not exceed 9 and a 10-passenger search should be rejected.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — An over-limit party is indistinguishable from "no availability".

## 📎 Evidence

**Actual response (redacted):**

```json
{ "offers": [] }  // HTTP 200
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [ { "Value": "Total number of passengers must not exceed 9" } ]
}
```

## 💥 Impact

Callers cannot tell the party is invalid; every combination above 9 with infants silently returns nothing. The caller cannot tell an over-limit party from "no availability"; every combination with ADT+CHD+INF above 9 silently returns nothing
