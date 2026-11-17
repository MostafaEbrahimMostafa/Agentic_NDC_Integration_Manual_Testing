# [V1/V2][SabreNdc][Retrieve] – HTTP status Returned Incorrect Status (400) for a Voided Booking in Retrieve Response

## 📄 Description

Retrieve of a booking that was voided minutes earlier returns HTTP 400 NDC-INT-TEC-A0001 "This Trip Is Already Cancelled" (validation class), whereas TravelportNdc returns 409 for the same terminal state. The second Void correctly returns 409.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> Book.
2. POST Void, then POST Retrieve for the same booking.

## ❌ Actual Result

```json
HTTP 400 { "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again.", "Context": [ { "Value": "This Trip Is Already Cancelled" } ] }
```

Clients cannot distinguish a malformed request from a cancelled booking by status code.

## ✅ Expected Result

```json
HTTP 409 terminal-state error (or 200 with "voidCapability": "VoidNotAllowed")
```

AC Consistency: the same terminal state should map to the same status across suppliers (SPEC.md 2.11, 2.15).

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — A clear message is returned, so the impact is only the inconsistent status class.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 400 { "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again.", "Context": [ { "Value": "This Trip Is Already Cancelled" } ] }
```

**Expected response (redacted):**

```json
HTTP 409 terminal-state error (or 200 with "voidCapability": "VoidNotAllowed")
```

Test cases: TC-VOIDCAP-BIZ-06 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Clients cannot distinguish a malformed request from a cancelled booking by status code.
