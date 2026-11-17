# [V1 and V2][AirIndia][Search] – ErrorCode Returned Inconsistently for Unsupported Multi-City Search: V1 400 TEC-A0001 vs V2 409 Z9999

## 📄 Description

A multi-city Search (two or more non-return segments) for AirIndia is rejected with the same text, "The supplier does not support multi city searches", but V1 returns HTTP 400 `NDC-INT-TEC-A0001` while V2 returns HTTP 409 `NDC-INT-UNC-Z9999` (the unmapped catch-all code).

## 🔁 Steps to Reproduce

1. Send `POST api/V2/FlightSearch/Search` with supplier AirIndia, credentialsSelector EGY, `searchCriteria: [{DEL-BOM 2026-11-25},{BOM-BLR 2026-11-28}]`.
2. Send the same body to V1 `api/FlightSearch/Search`.

## ❌ Actual Result

```json
{
  "V2": {
    "Status": 409,
    "ErrorCode": "NDC-INT-UNC-Z9999",
    "Context": [
      {
        "Value": "The supplier does not support multi city searches"
      }
    ]
  },
  "V1": {
    "Status": 400,
    "ErrorCode": "NDC-INT-TEC-A0001"
  }
}
```

V2 callers cannot distinguish a documented limitation from an unknown supplier failure and may retry pointlessly..

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Value": "The supplier does not support multi city searches"
    }
  ]
}
```

SPEC.md section 7.9: the same input should give the same error on both versions, and Z9999 should only be used for unknown failures.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not captured for this call

## 📊 Severity

**Low** — A known supplier limitation is reported with the unknown-error code on V2.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "V2": {
    "Status": 409,
    "ErrorCode": "NDC-INT-UNC-Z9999",
    "Context": [
      {
        "Value": "The supplier does not support multi city searches"
      }
    ]
  },
  "V1": {
    "Status": 400,
    "ErrorCode": "NDC-INT-TEC-A0001"
  }
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Value": "The supplier does not support multi city searches"
    }
  ]
}
```

Test cases in this run: TC-AIEGY-EXP-01, TC-AIEGY-SRCH-SC-09 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

V2 callers cannot distinguish a documented limitation from an unknown supplier failure and may retry pointlessly.
