# [V1 and V2][AirIndia][Retrieve / FareConfirm] – OriginalSupplierRequest Returned with Plaintext Supplier Credentials in Ordinary Error Response

## 📄 Description

A 409 `NDC-INT-UNC-Z9999` error (supplier connection timeout) carries `OriginalSupplierRequest` containing the supplier login credentials in plaintext, and `OriginalSupplierResponse`. Reproduced on V2 Retrieve, V1 Retrieve and V1 FareConfirm with isdebug unset. (Values masked in this run.)

## 🔁 Steps to Reproduce

1. Send `POST api/v2/FlightBooking/Retrieve` with supplier AirIndia, credentialsSelector EGY, `pnr: "ZZ9XQ1"`, `gdsPNR: "ZZ9XQ1"`, `bookingToken: "3f2b8c1e-5d4a-4e7b-9a10-aaaaaaaaaaaa"` (about 135 s).
2. Inspect `OriginalSupplierRequest` in the 409 body.
3. Repeat on V1 `api/FlightBooking/RetrieveBooking` and V1 `api/FlightSearch/FareConfirm`.

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "SocketException",
      "Value": "Connection timed out"
    }
  ],
  "OriginalSupplierRequest": "{\"credentials\":{\"username\":\"***\",\"password\":\"***\",...},\"applicationName\":\"\"}",
  "OriginalSupplierResponse": "<present>"
}
```

Every supplier timeout on these calls leaks the supplier login to the caller and to any client or proxy log that stores error bodies..

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-SUP-xxxx",
  "ErrorMessage": "Supplier did not respond.",
  "OriginalSupplierRequest": null,
  "OriginalSupplierResponse": null
}
```

SPEC.md section 7.14: raw supplier payloads and credentials must not be exposed in responses.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve / FareConfirm`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** 3656624c-cdaa-4b8f-b081-e9e10fe31a5d (V1 Retrieve)

## 📊 Severity

**Critical** — No flag is needed: any failed call that reaches the supplier hands the caller the AirIndia login.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "SocketException",
      "Value": "Connection timed out"
    }
  ],
  "OriginalSupplierRequest": "{\"credentials\":{\"username\":\"***\",\"password\":\"***\",...},\"applicationName\":\"\"}",
  "OriginalSupplierResponse": "<present>"
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-SUP-xxxx",
  "ErrorMessage": "Supplier did not respond.",
  "OriginalSupplierRequest": null,
  "OriginalSupplierResponse": null
}
```

Test cases in this run: TC-AIEGY-SEC-02 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Every supplier timeout on these calls leaks the supplier login to the caller and to any client or proxy log that stores error bodies.
