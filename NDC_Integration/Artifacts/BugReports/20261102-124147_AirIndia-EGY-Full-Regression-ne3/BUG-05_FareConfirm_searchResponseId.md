# [V1][AirIndia][FareConfirm] – searchResponseId Not Validated: V1 FareConfirm and Retrieve Forward Unknown IDs to the Supplier and Hang ~135 s

## 📄 Description

V1 FareConfirm sent with a never-issued `searchResponseId`/`selectedOfferId` (or with `ResponseId` instead of `searchResponseId`) is forwarded to the supplier and returns after about 135 s with 409 `NDC-INT-UNC-Z9999` "Connection timed out". V1 and V2 Retrieve of an unknown PNR behave the same. V2 FareConfirm rejects the same input in 0.4 s with 400 "The selected offer is invalid, expired, or could not be found".

## 🔁 Steps to Reproduce

1. Send `POST api/FlightSearch/FareConfirm` with supplier AirIndia, credentialsSelector EGY, `searchResponseId: "3f2b8c1e-5d4a-4e7b-9a10-aaaaaaaaaaaa"`, `selectedOfferId: "7c9e6679-7425-40de-944b-bbbbbbbbbbbb"`.
2. Measure the response time and read the error.
3. Compare with V2 `api/v2/FlightSearch/FareConfirm` and the same ids.

## ❌ Actual Result

```json
{
  "Status": 409,
  "elapsed": "135.9 s",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "SocketException",
      "Value": "Connection timed out"
    }
  ]
}
```

Request threads are held for over two minutes per bad request, an easy self-inflicted denial of service, and the caller gets an unmapped Z9999 instead of "offer expired"..

## ✅ Expected Result

```json
{
  "Status": 400,
  "elapsed": "< 1 s",
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "AsyncPredicateValidator",
      "Value": "The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again."
    }
  ]
}
```

SPEC.md sections 2.2 and 7.7: an unknown id pair is rejected; V2 already does so.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `FareConfirm`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** 22083aa2-b27a-489d-a285-0d8b1a2348a4 (V1 FareConfirm unknown ids)

## 📊 Severity

**High** — A bad id ties up a request for over two minutes and ends as an unmapped Z9999, so clients time out before they see the error.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "elapsed": "135.9 s",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "SocketException",
      "Value": "Connection timed out"
    }
  ]
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "elapsed": "< 1 s",
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "AsyncPredicateValidator",
      "Value": "The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again."
    }
  ]
}
```

Test cases in this run: TC-FARECONFIRM-VAL-01, TC-AIEGY-FARECONFIRM-NEG-01, TC-AIEGY-RETRIEVE-NEG-01, TC-AIEGY-SEC-02 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Request threads are held for over two minutes per bad request, an easy self-inflicted denial of service, and the caller gets an unmapped Z9999 instead of "offer expired".
