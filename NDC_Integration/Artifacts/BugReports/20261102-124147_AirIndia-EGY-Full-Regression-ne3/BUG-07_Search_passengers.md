# [V1 and V2][AirIndia][Search] – passengers Accepted for a Child with No Adult and for a 10-Passenger Party Counting Infants in Search Request

## 📄 Description

Search returns HTTP 200 for `[{CHD,1}]` (a child travelling alone) and for `[{ADT,6},{CHD,2},{INF,2}]` (10 passengers counting infants), on V1 and V2. Other invalid parties (10 seated passengers, an infant alone, more infants than adults, counts of 0 or -1) are correctly rejected with 400.

## 🔁 Steps to Reproduce

1. Send `POST api/V2/FlightSearch/Search` with supplier AirIndia, credentialsSelector EGY, DEL-BOM 2026-11-25 and `passengers: [{"passengerTypeCode":"CHD","count":1}]`.
2. Repeat with `[{ADT,6},{CHD,2},{INF,2}]` and on V1.

## ❌ Actual Result

```json
{
  "status": 200,
  "offers": []
}
```

Parties that can never be booked reach the supplier; the failure moves to a later, more expensive step..

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "At least one adult is required / the total number of passengers including infants must not exceed 9"
    }
  ]
}
```

SPEC.md sections 2.1 and 7.8: an adult is required and the 9-passenger maximum applies to the whole party.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Medium** — Invalid parties pass validation, cost a 15 s supplier round trip and would only fail later at Book.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "status": 200,
  "offers": []
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "At least one adult is required / the total number of passengers including infants must not exceed 9"
    }
  ]
}
```

Test cases in this run: TC-AIEGY-SRCH-PAX-03, TC-AIEGY-SRCH-PAX-06 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Parties that can never be booked reach the supplier; the failure moves to a later, more expensive step.
