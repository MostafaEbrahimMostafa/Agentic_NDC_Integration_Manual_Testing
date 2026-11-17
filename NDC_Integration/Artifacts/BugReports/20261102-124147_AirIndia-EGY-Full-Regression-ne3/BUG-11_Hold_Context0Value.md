# [V1 and V2][AirIndia][Hold / BookAfterHold / PnrReprice / CancelAfterHold / Void / Upselling / FareCheck / FareRules / SeatAfterHold] – Context[0].Value Returned as "AirIndia does not exists" for Unsupported Operations in OperationNotSupported Response

## 📄 Description

These nine operations answer AirIndia with 409 `OperationNotSupported` / "This action is not currently supported by the selected supplier." and `Context[0].Value = "AirIndia does not exists"` on V1 and V2, before looking at any id. The refusal itself agrees with the supplier matrix (Hold, BookAfterHold, FareConfirmAfterHold, Void, CancelAfterHold, Upselling, FareCheck, FareRules, SeatMap = N/A), but the wording says the supplier does not exist.

## 🔁 Steps to Reproduce

1. Send `POST api/v2/FlightBooking/Hold` (or any endpoint listed) with supplier AirIndia, credentialsSelector EGY and any ids.
2. Read `Context[0].Value`.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "95f58e9d-f99c-4c1b-a92d-cc79599cad65",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [
    {
      "Name": "OperationNotSupported",
      "Value": "AirIndia does not exists"
    }
  ]
}
```

Support and integrators will read it as a configuration fault; it also makes it hard to see whether the supplier name is mapped correctly in the capability registry..

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [
    {
      "Name": "OperationNotSupported",
      "Value": "Hold is not supported for supplier AirIndia"
    }
  ]
}
```

SPEC.md sections 4.5 and 7.9: the message should name the unsupported operation; "does not exists" suggests the supplier-name lookup failed (compare the Indigo/ElJazeera name-mismatch issue).

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold / BookAfterHold / PnrReprice / CancelAfterHold / Void / Upselling / FareCheck / FareRules / SeatAfterHold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** 95f58e9d-f99c-4c1b-a92d-cc79599cad65 (V1 Hold)

## 📊 Severity

**Low** — The behaviour matches the supplier matrix (N/A) but the message reads as a missing registration and can trigger false incidents.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "95f58e9d-f99c-4c1b-a92d-cc79599cad65",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [
    {
      "Name": "OperationNotSupported",
      "Value": "AirIndia does not exists"
    }
  ]
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [
    {
      "Name": "OperationNotSupported",
      "Value": "Hold is not supported for supplier AirIndia"
    }
  ]
}
```

Test cases in this run: TC-AIEGY-HOLD-NEG-01, TC-AIEGY-VOID-NEG-01, TC-AIEGY-UPSELLING-NEG-01 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Support and integrators will read it as a configuration fault; it also makes it hard to see whether the supplier name is mapped correctly in the capability registry.
