# [V1/V2][AirIndia][All booking-flow endpoints] – Two Error Envelopes and Catch-All Code NDC-INT-UNC-Z9999 for Business Errors

## 📄 Description

Client errors use two envelopes: camelCase {status, errorCode "1001"} for model binding (144 of 309 responses) and PascalCase {Status, ErrorCode "NDC-INT-TEC-A0001" / "AuthenticationError" / "NDC-INT-UNC-Z9999"} for the rest (165). Ordinary business failures (market does not exist, station unknown, duplicate contact, SSR limits, "Payment method AG does not allow zero amounts" on a second Book) all use the unmapped catch-all NDC-INT-UNC-Z9999

## 🔁 Steps to Reproduce

1. Send Search without supplier (model binding) and Book with unknown ids; compare the bodies.
2. Send a Book twice on the same ids, a Search for market DEL-LHR, an AddPassenger repeat.

## ❌ Actual Result

```json
{ "status": 400, "errorCode": "1001", ... }   vs   { "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", ... }   vs   { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999" }
```

Clients need two parsers and cannot branch on error codes

## ✅ Expected Result

```json
One envelope and mapped codes for known conditions (market not served, duplicate booking, SSR limit)
```

Expected per SPEC.md §7.9 and the platform's own V2 behaviour where cited. Expected value: One envelope and mapped codes for known business conditions

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `All booking-flow endpoints`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Clients need two parsers and cannot branch on error codes.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "status": 400, "errorCode": "1001", ... }   vs   { "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", ... }   vs   { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999" }
```

**Expected response (redacted):**

```json
One envelope and mapped codes for known conditions (market not served, duplicate booking, SSR limit)
```

Test cases: TC-AIEGY-ENV-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-ENV-01 (census of every 4xx in this run)

## 💥 Impact

Clients need two parsers and cannot branch on error codes
