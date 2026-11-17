# [V1 and V2][TravelportNdc][Void] – Error Envelope Inconsistent: Two Casings and an Unmapped Z9999 Code Used for Four Different Conditions

## 📄 Description

Void failures do not use one envelope. Request-validation errors come back in two shapes: PascalCase `{Status, TransactionId, ErrorCode "NDC-INT-TEC-A0001", ErrorMessage "Invalid request...", Context[{Name, Value}]}` for pnr, bookingToken, gdsPNR and inactive credentials, and camelCase `{status, transactionId, errorCode "1001", errorMessage "Validation errors occurred...", context[{name, value}]}` for supplier, credentialsSelector, voidTickets and pnr length. Business errors use `NDC-INT-BYP-A0003` for a cancelled reservation but the unmapped `NDC-INT-UNC-Z9999` (with `ErrorMessage` equal to the code) for an unknown PNR, a Void on a held booking, a wrong selector and a cancelled Emirates booking.

Recurrence of BUG-11 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`) and of SabreNdc BUG-07 (2026-10-22).

Found by: TC-VOIDTPN-NEG-05, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. POST Void without `pnr`: 400, PascalCase, code NDC-INT-TEC-A0001.
2. POST Void without `supplier`: 400, camelCase, errorCode "1001".
3. Hold a booking and POST Void on it: 409 NDC-INT-UNC-Z9999 with ErrorMessage equal to the code; Void of an unknown PNR gives the same code.

## ❌ Actual Result

```json
// pnr omitted
{
  "Status": 400,
  "TransactionId": "97b888db-74b8-47f6-aa95-04ca4bc08be6",
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "PNR is required"
    }
  ]
}
// supplier omitted
{
  "status": 400,
  "transactionId": "9eda8ef3-78e2-44ee-b811-fb0f9e2a944c",
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    {
      "name": "Supplier",
      "value": "Select a valid Supplier"
    }
  ],
  "originalSupplierRequest": null,
  "originalSupplierResponse": null
}
// Void on a held booking
{
  "Status": 409,
  "TransactionId": "21c50378-1da4-4afb-96a5-fac501a2abdf",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "BUSINESS_CONFLICT",
      "Value": "This booking is on hold and not ticketed. Cancel it with the cancel hold flow instead of voiding it."
    }
  ]
}
```

Same results on V1 and V2.

## ✅ Expected Result

```json
{
  "Status": 400,
  "TransactionId": "<GUID>",
  "ErrorCode": "<distinct code per condition>",
  "ErrorMessage": "<human-readable text>",
  "Context": [
    {
      "Name": "<field>",
      "Value": "<detail>"
    }
  ]
}
```

AC Error Handling and TC-VOIDTPN-NEG-05: every failure uses {Status, TransactionId, ErrorCode, ErrorMessage, Context}, Status equals the HTTP code, validation errors are 400 and business-rule errors use one consistent code family.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `97b888db-74b8-47f6-aa95-04ca4bc08be6`

## 📊 Severity

**Medium** — Non-blocking, but clients need two parsers and cannot branch on ErrorCode.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnrOmitted": {
    "Status": 400,
    "TransactionId": "97b888db-74b8-47f6-aa95-04ca4bc08be6",
    "ErrorCode": "NDC-INT-TEC-A0001",
    "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
    "Context": [
      {
        "Name": "PredicateValidator",
        "Value": "PNR is required"
      }
    ]
  },
  "supplierOmitted": {
    "status": 400,
    "transactionId": "9eda8ef3-78e2-44ee-b811-fb0f9e2a944c",
    "errorCode": "1001",
    "errorMessage": "Validation errors occurred. Please check your request.",
    "context": [
      {
        "name": "Supplier",
        "value": "Select a valid Supplier"
      }
    ],
    "originalSupplierRequest": null,
    "originalSupplierResponse": null
  }
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "<one consistent family>",
  "ErrorMessage": "<text>",
  "Context": []
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-NEG-05).

## 💥 Impact

Client error handling must special-case two casings and treat Z9999 as "unknown", so held, unknown, wrong-selector and cancelled cases cannot be told apart by code.
