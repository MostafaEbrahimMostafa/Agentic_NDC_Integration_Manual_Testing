# [V1 and V2][AirIndia][Search] – supplierRequest Returned with Plaintext Supplier Credentials when isdebug=true in Search Response

## 📄 Description

Search with `isdebug: true` returns the raw `supplierRequest` field. For AirIndia it is the supplier login request and contains the supplier username, password and domain in plaintext. `isdebug` false or omitted returns nothing, so the exposure is opt-in by the caller. (Values are masked in every artifact of this run.)

## 🔁 Steps to Reproduce

1. Send `POST api/V2/FlightSearch/Search` with `isdebug: true`, supplier AirIndia, credentialsSelector EGY, DEL-BOM 2026-11-25.
2. Inspect `supplierRequest` in the response body.
3. Repeat on V1 `api/FlightSearch/Search`.

## ❌ Actual Result

```json
{
  "supplierRequest": {
    "credentials": {
      "username": "***",
      "password": "***",
      "domain": "***"
    },
    "applicationName": ""
  }
}
```

Anyone with the shared x-api-key can obtain the live AirIndia credentials by adding `isdebug: true`; the credentials should be rotated once the field is closed..

## ✅ Expected Result

```json
{
  "supplierRequest": null
}
```

SPEC.md section 7.14 flags this exact exposure; raw supplier payloads (and certainly credentials) must never be returned to the caller.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Critical** — Live supplier credentials are readable by any caller holding the shared x-api-key.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "supplierRequest": {
    "credentials": {
      "username": "***",
      "password": "***",
      "domain": "***"
    },
    "applicationName": ""
  }
}
```

**Expected response (redacted):**

```json
{
  "supplierRequest": null
}
```

Test cases in this run: TC-SEARCH-SEC-01 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Anyone with the shared x-api-key can obtain the live AirIndia credentials by adding `isdebug: true`; the credentials should be rotated once the field is closed.
