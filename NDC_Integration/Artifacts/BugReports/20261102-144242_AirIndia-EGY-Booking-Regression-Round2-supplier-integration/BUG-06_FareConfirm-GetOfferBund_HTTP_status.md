# [V1][AirIndia][FareConfirm / GetOfferBundles / Book] – HTTP 500 Returned for Never-Issued Ids in V1 FareConfirm, GetOfferBundles and Book

## 📄 Description

V1 FareConfirm, V1 GetOfferBundles and V1 Book answer HTTP 500 ServerError ("Unknown error occured") for a never-issued id pair and for a 1000-character selectedOfferId; V2 answers the same input with 400 NDC-INT-TEC-A0001

## 🔁 Steps to Reproduce

1. POST api/FlightSearch/FareConfirm (or api/bundles/GetOfferBundles, api/FlightBooking/Book) with random GUIDs for searchResponseId/fareConfirmResponseId and selectedOfferId, or a 1000-character selectedOfferId.

## ❌ Actual Result

```json
HTTP 500 { "Status": 500, "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference." }
```

A caller mistake on the booking path looks like a platform outage and cannot be told apart from a real server fault

## ✅ Expected Result

```json
HTTP 400 { "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again.", "Context": [ { "Value": "The selected offer is invalid, expired, or could not be found." } ] }  (what V2 returns)
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: 400 NDC-INT-TEC-A0001 "selected offer is invalid, expired or could not be found" (the V2 behaviour)

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `FareConfirm / GetOfferBundles / Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `a36b0b8b-388f-4979-9c9b-bd49b9c4d478`

## 📊 Severity

**High** — A caller mistake is reported as a server fault, so support cannot triage it and alerts will fire.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 500 { "Status": 500, "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference." }
```

**Expected response (redacted):**

```json
HTTP 400 { "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again.", "Context": [ { "Value": "The selected offer is invalid, expired, or could not be found." } ] }  (what V2 returns)
```

Test cases: TC-AIEGY-FARECONFIRM-NEG-01, TC-AIEGY-GETOFFERBUNDLES-NEG-01, TC-AIEGY-BOOK-NEG-01, TC-AIEGY-CHAIN-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-FARECONFIRM-NEG-01/03, TC-AIEGY-GETOFFERBUNDLES-NEG-01/03, TC-AIEGY-BOOK-NEG-01/03, TC-AIEGY-CHAIN-01

## 💥 Impact

A caller mistake on the booking path looks like a platform outage and cannot be told apart from a real server fault
