# [V1][Amadeus][Hold] – Two Different Error Envelopes and Internal .NET Type Name Exposed for Request-Binding Validation Errors

## 📄 Description

Request-binding errors (unknown title, missing name, null list, wrong types) return a second envelope (camelCase keys, `errorCode: "1001"`, a spurious "holdRequestDto field is required" entry) and expose the internal type `NDC.Integrations.Application.Dtos.Api.Title`. Name-rule errors use the PascalCase `NDC-INT-TEC-A0001` envelope. Same defect as on ne-8.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS).
   - Pax1 ADT with `title` set to `ABCDEFGHIJKLMNOPQRST` (20 characters).

## ❌ Actual Result

```json
{
  "status": 400,
  "transactionId": "d6d55d2f-312e-4cf8-8b56-bd40cedf8a50",
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    {
      "name": "holdRequestDto",
      "value": "The holdRequestDto field is required."
    },
    {
      "name": "$.passengersList.Pax1.title",
      "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Title. Path: $.passengersList.Pax1.title | LineNumber: 0 | BytePositionInLine: 435."
    }
  ],
  "originalSupplierRequest": null,
  "originalSupplierResponse": null
}
```

## ✅ Expected Result

One envelope `{Status, TransactionId, ErrorCode: "NDC-INT-TEC-A0001", ErrorMessage, Context[{Value}]}` and no internal type names.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `d6d55d2f-312e-4cf8-8b56-bd40cedf8a50`

## 📊 Severity

**Medium** — inconsistent contract and internal class-name disclosure.

## 📎 Evidence

BIZ-13; NEG-01..NEG-13 (except NEG-10) return the same 1001 envelope.

## 💥 Impact

Clients must handle two error shapes for one endpoint; internal names are disclosed.
