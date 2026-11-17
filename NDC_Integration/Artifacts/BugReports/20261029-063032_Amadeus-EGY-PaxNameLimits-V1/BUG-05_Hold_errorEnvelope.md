# [V1][Amadeus][Hold] – Two Different Error Envelopes and Internal .NET Type Name Exposed for Request-Binding Validation Errors

## 📄 Description

Name-rule violations return the PascalCase envelope (`Status`, `ErrorCode: "NDC-INT-TEC-A0001"`, `Context[{Value}]`). Request-binding errors on the same endpoints (an unknown `title`, a missing `name.first`, a null `name.last`, an empty or null `passengersList`, a number for `name.first` ...) return a second envelope with camelCase keys, `errorCode: "1001"`, an extra `originalSupplierRequest`/`originalSupplierResponse` pair of nulls and a spurious "`holdRequestDto` field is required" entry. For an unknown `title` the message exposes the internal class `NDC.Integrations.Application.Dtos.Api.Title`.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT + 1 INF.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with a valid body except ADT `title` = a 20-character string.
4. POST the same body with ADT `name.first` removed. Compare both responses with an over-length name (first name 26 characters).

## ❌ Actual Result

```json
{
  "status": 400,
  "transactionId": "6afd7913-78ba-4a5c-ae3d-41e29d76a115",
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    { "name": "holdRequestDto", "value": "The holdRequestDto field is required." },
    { "name": "$.passengersList.Pax1.title", "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Title. Path: $.passengersList.Pax1.title | LineNumber: 0 | BytePositionInLine: 435." }
  ],
  "originalSupplierRequest": null,
  "originalSupplierResponse": null
}
```

The Book endpoint returns the same shape with `flightBookRequestDto`. Fourteen of the sixteen TC-PAXNAME-NEG cases (all except NEG-10 and NEG-14) return this envelope.

## ✅ Expected Result

```json
{
  "Status": 400,
  "TransactionId": "<GUID>",
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [ { "Value": "Passenger 'Pax1': Title is not a valid value (allowed: ...)." } ]
}
```

One error contract per endpoint (SPEC.md §7.7), no framework wrapper messages, and no internal type names.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `6afd7913-78ba-4a5c-ae3d-41e29d76a115`

## 📊 Severity

**Medium** — validation still rejects the request, but clients must handle two shapes, the title domain is undocumented, and an internal class name is disclosed.

## 📎 Evidence

**Actual (redacted):** envelope above (TC-PAXNAME-BIZ-13; TC-PAXNAME-NEG-01..NEG-16 except NEG-10 and NEG-14 give the same shape).

**Expected:** the A0001 envelope seen for name-rule violations (TC-PAXNAME-VAL-18: `Status`, `TransactionId`, `ErrorCode`, `ErrorMessage`, `Context[{Value}]`).

## 💥 Impact

Integrators must write two error parsers for one call, the spurious "dto field is required" line points them at the wrong problem, and the internal type name is information they should not see.
