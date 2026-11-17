# [V1 and V2][AirIndia][Search (all endpoints)] – context[].value Exposes Internal .NET Type Names and Parser Positions in Validation Error Responses

## 📄 Description

Validation errors expose internal types and parser positions: `System.DateTime`, `System.Guid`, `System.Int32`, `NDC.Integrations.Application.Dtos.Api.Supplier`, `Path: $.supplier | LineNumber: 0 | BytePositionInLine: 23`, and (in Z9999 errors) the exception class `SocketException`. A wrong supplier value also returns the misleading "The airSearchRequestDto field is required." although the DTO is present.

## 🔁 Steps to Reproduce

1. Send `POST api/V2/FlightSearch/Search` with `supplier: "AirIndiaX"`.
2. Read `context[]` in the 400 body.
3. Send a Search with `date: "abc"` and read `context[]`.

## ❌ Actual Result

```json
{
  "errorCode": "1001",
  "context": [
    {
      "name": "airSearchRequestDto",
      "value": "The airSearchRequestDto field is required."
    },
    {
      "name": "$.supplier",
      "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Supplier. Path: $.supplier | LineNumber: 0 | BytePositionInLine: 23."
    }
  ]
}
```

Reveals the stack and DTO naming to any caller, and the "dto field is required" wording sends integrators looking for a missing object instead of the invalid supplier value..

## ✅ Expected Result

```json
{
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "supplier",
      "Value": "supplier must be one of the supported suppliers."
    }
  ]
}
```

SPEC.md section 7.14: error responses should not carry implementation detail.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search (all endpoints)`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** 55749661-f829-4b6c-8289-a1de788763f5 (V2 Search, supplier AirIndiaX)

## 📊 Severity

**Low** — Information disclosure that helps fingerprint the stack, plus misleading messages; no direct business loss.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "errorCode": "1001",
  "context": [
    {
      "name": "airSearchRequestDto",
      "value": "The airSearchRequestDto field is required."
    },
    {
      "name": "$.supplier",
      "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Supplier. Path: $.supplier | LineNumber: 0 | BytePositionInLine: 23."
    }
  ]
}
```

**Expected response (redacted):**

```json
{
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "supplier",
      "Value": "supplier must be one of the supported suppliers."
    }
  ]
}
```

Test cases in this run: TC-AIEGY-SEC-LEAK-01 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Reveals the stack and DTO naming to any caller, and the "dto field is required" wording sends integrators looking for a missing object instead of the invalid supplier value.
