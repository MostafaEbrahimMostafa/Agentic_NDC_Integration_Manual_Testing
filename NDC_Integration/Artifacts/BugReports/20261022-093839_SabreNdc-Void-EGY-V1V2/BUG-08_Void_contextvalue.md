# [V1][V2][SabreNdc][Void] – context Exposes Internal .NET Type Name in Void Validation Error

## 📄 Description

Sending `voidTickets` as a plain string array returns a deserialization error that names the internal type `NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType`, plus a stray "The voidRequestDto field is required." entry. This is the known DTO-leak defect (SPEC.md §2.9), now seen on Void.

Found by: TC-VOID-NEG-03 (also TC-VOID-VAL-06), QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. POST Void (V1 or V2), SabreNdc/EGY, valid booking ids, `voidTickets: ["0650000000000"]`.

## ❌ Actual Result

```json
{ "status": 400, "errorCode": "1001",
  "context": [ { "name": "voidRequestDto", "value": "The voidRequestDto field is required." },
               { "name": "$.voidTickets[0]", "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType. Path: $.voidTickets[0] | LineNumber: 0 | BytePositionInLine: 165." } ] }
```

Identical on V2.

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "ValidationError",
  "Context": [ { "Name": "voidTickets[0]", "Value": "Each voidTickets item must be an object with ticketNumber" } ] }
```

SPEC.md §7.14: no internal implementation details in responses.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `6d7490dc-ff13-48d7-82e6-63e1051b0003 (V1)`

## 📊 Severity

**Low** — Information disclosure on an error path only; also gives no usable hint about the expected item shape.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "status": 400, "errorCode": "1001",
  "context": [ { "name": "voidRequestDto", "value": "The voidRequestDto field is required." },
               { "name": "$.voidTickets[0]", "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType. Path: $.voidTickets[0] | LineNumber: 0 | BytePositionInLine: 165." } ] }
```

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "ValidationError",
  "Context": [ { "Name": "voidTickets[0]", "Value": "Each voidTickets item must be an object with ticketNumber" } ] }
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-VOID-NEG-03).

## 💥 Impact

It exposes internal namespaces to consumers, and integrators get no clear guidance that each voidTickets item must be an object.
