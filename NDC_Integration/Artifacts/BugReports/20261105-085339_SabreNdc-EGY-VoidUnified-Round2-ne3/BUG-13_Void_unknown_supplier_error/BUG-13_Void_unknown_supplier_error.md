# [V1/V2][SabreNdc][Void] – supplier Validation Error Exposes Internal .NET Type Name in Void Response

## 📄 Description

A Void request with an unknown `supplier` value is rejected with HTTP 400 (correct), but the validation message exposes the internal class name `NDC.Integrations.Application.Dtos.Api.Supplier`, the JSON path and the byte position of the parser. The same body is returned by every endpoint that deserialises the `supplier` enum.

## 🔁 Steps to Reproduce

1. POST api/FlightBooking/Void (V1) or api/V2/FlightBooking/Void (V2) with supplier "NoSuchSupplier", credentialsSelector "EGY", pnr "ZZZZZZ", gdsPNR "ZZZZZZ", bookingToken "dummy", surName "Barakat", voidTickets [].
2. Read the `context` array of the 400 response.

## ❌ Actual Result

```json
{ "status": 400, "transactionId": "...", "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [ { "name": "voidRequestDto", "value": "The voidRequestDto field is required." },
               { "name": "$.supplier", "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Supplier. Path: $.supplier | LineNumber: 0 | BytePositionInLine: 28." } ],
  "originalSupplierRequest": null, "originalSupplierResponse": null }
```

Internal namespace and class names leave the API boundary in an ordinary validation error. The same response also reports a misleading "voidRequestDto field is required".

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "...", "ErrorMessage": "Validation errors occurred.", "Context": [ { "Name": "supplier", "Value": "The supplier value is not valid." } ] }
```

SEC-06 of the VoidUnified suite and SPEC.md 7.14: error bodies carry only the standard envelope, with no stack traces or internal type names. (The unknown-supplier case is also the camelCase envelope of BUG-10.)

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response` (the body has a transactionId, which differs per call)

## 📊 Severity

**Low** — No credentials or customer data leak, but internal class names and parser details help an attacker map the code base.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "status": 400, "errorCode": "1001", "context": [ { "name": "$.supplier", "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Supplier. Path: $.supplier | LineNumber: 0 | BytePositionInLine: 28." } ] }
```

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "...", "Context": [ { "Name": "supplier", "Value": "The supplier value is not valid." } ] }
```

Test cases: TC-VOIDCAP-SEC-06 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3). New in Round 2 (the Round 1 NEG-06 log recorded this response with an empty message, so it was not checked then).

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_Void_NoSuchSupplier_request.json` / `01_V1_Void_NoSuchSupplier_response.json` — V1 Void NoSuchSupplier, `api/FlightBooking/Void`, HTTP 400
- `02_V2_Void_NoSuchSupplier_request.json` / `02_V2_Void_NoSuchSupplier_response.json` — V2 Void NoSuchSupplier, `api/V2/FlightBooking/Void`, HTTP 400
- `03_V1_Void_voidTickets_as_plain_strings_request.json` / `03_V1_Void_voidTickets_as_plain_strings_response.json` — V1 Void voidTickets as plain strings, `api/FlightBooking/Void`, HTTP 400
- `04_V2_Void_voidTickets_as_plain_strings_request.json` / `04_V2_Void_voidTickets_as_plain_strings_response.json` — V2 Void voidTickets as plain strings, `api/V2/FlightBooking/Void`, HTTP 400

## 💥 Impact

Every client that sends a wrong supplier name receives internal class names. It is a low-severity information disclosure, but it contradicts the rule that error bodies expose nothing internal.
