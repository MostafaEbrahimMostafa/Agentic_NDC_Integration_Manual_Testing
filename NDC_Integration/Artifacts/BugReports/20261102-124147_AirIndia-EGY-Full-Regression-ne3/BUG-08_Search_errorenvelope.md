# [V1 and V2][AirIndia][Search / FareConfirm / Book] – Error Envelope Returned in Two Different Shapes and Casings across Client Errors

## 📄 Description

Model-binding failures return a camelCase envelope `{status, transactionId, errorCode: "1001", errorMessage, context[], originalSupplierRequest: null, originalSupplierResponse: null}`, while business validation, authentication and unsupported operations return the PascalCase envelope `{Status, TransactionId, ErrorCode: "NDC-INT-TEC-A0001" | "AuthenticationError" | "OperationNotSupported" | "NDC-INT-UNC-Z9999", ErrorMessage, Context[]}`. Across 570 4xx responses in this run: 307 camelCase, 257 PascalCase.

## 🔁 Steps to Reproduce

1. Send `POST api/V2/FlightSearch/Search` with `supplier` omitted -> camelCase body, `errorCode: "1001"`.
2. Send the same Search with `origin` equal to `destination` -> PascalCase body, `ErrorCode: "NDC-INT-TEC-A0001"`.

## ❌ Actual Result

```json
{
  "status": 400,
  "transactionId": "1d84e6f8-85c6-4484-b940-a0ad62486dad",
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request."
}
```

Integrators must parse two shapes and two code vocabularies (numeric 1001 vs NDC-INT-*), and the numeric code carries no business meaning..

## ✅ Expected Result

```json
{
  "Status": 400,
  "TransactionId": "<guid>",
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "<field message>"
    }
  ]
}
```

SPEC.md section 7.9 asks for a single confirmed error envelope that all negative tests can assert against.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search / FareConfirm / Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** 1d84e6f8-85c6-4484-b940-a0ad62486dad

## 📊 Severity

**Medium** — Clients need two parsers and a code map per shape; errors can be silently misclassified.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "status": 400,
  "transactionId": "1d84e6f8-85c6-4484-b940-a0ad62486dad",
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request."
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "TransactionId": "<guid>",
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "<field message>"
    }
  ]
}
```

Test cases in this run: TC-VERSIONDIFF-NEG-01, TC-AIEGY-ENV-01 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Integrators must parse two shapes and two code vocabularies (numeric 1001 vs NDC-INT-*), and the numeric code carries no business meaning.
