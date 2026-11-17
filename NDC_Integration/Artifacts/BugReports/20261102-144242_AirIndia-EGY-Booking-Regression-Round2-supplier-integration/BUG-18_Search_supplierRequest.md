# [V1/V2][AirIndia][Search] – Supplier Credentials Returned in Plaintext by Search with isdebug=true

## 📄 Description

Search with isdebug=true returns the raw supplier request and response, and the request contains the AirIndia supplier credentials (user name and password) in plaintext, on V1 and V2. isdebug=false and omitted return nothing

## 🔁 Steps to Reproduce

1. POST api/V2/FlightSearch/Search (and V1) DEL-BOM 1 adult with "isdebug": true.
2. Inspect supplierRequest in the response (values are not reproduced here).

## ❌ Actual Result

```json
"supplierRequest": "<raw supplier SOAP/JSON request including user name and password in plaintext>"   (redacted; 2930 characters)
```

Anyone with the shared x-api-key can read live supplier credentials by adding isdebug=true to a Search

## ✅ Expected Result

```json
"supplierRequest": null   // never returned, or credentials masked
```

Expected per SPEC.md §7.14 and the platform's own V2 behaviour where cited. Expected value: Raw supplier payloads are never returned, or credentials are masked

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Critical** — Live supplier credentials are readable by anyone holding the shared x-api-key.

## 📎 Evidence

**Actual response (redacted):**

```json
"supplierRequest": "<raw supplier SOAP/JSON request including user name and password in plaintext>"   (redacted; 2930 characters)
```

**Expected response (redacted):**

```json
"supplierRequest": null   // never returned, or credentials masked
```

Test cases: TC-SEARCH-SEC-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-SEARCH-SEC-01 (values redacted in every artifact of this run)

## 💥 Impact

Anyone with the shared x-api-key can read live supplier credentials by adding isdebug=true to a Search
