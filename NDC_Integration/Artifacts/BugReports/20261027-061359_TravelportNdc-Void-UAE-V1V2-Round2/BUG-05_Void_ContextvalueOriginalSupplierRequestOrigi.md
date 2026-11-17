# [V1 and V2][TravelportNdc][Void] – Error Responses Leak Raw Travelport Payloads and Internal .NET Type Names

## 📄 Description

Failing TravelportNdc Void calls expose data that is not part of the integration contract: the 409 bodies carry the extra top-level fields `OriginalSupplierRequest` and `OriginalSupplierResponse` (the raw Travelport ReservationResponse JSON), and the 400 for a wrong-typed `voidTickets` quotes internal .NET type names and parser positions (`System.Collections.Generic.ICollection`1[NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType]`). Seen on V1 and V2.

Recurrence of BUG-05 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`) and of the SabreNdc Void defect of 2026-10-22.

Found by: TC-VOIDTPN-VAL-07, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. Void a booking successfully (V2 pnr 773JKY), then POST the identical Void request again: 409 with OriginalSupplierRequest/OriginalSupplierResponse.
2. POST Void with pnr ZZZZZZ, gdsPNR ZZZZZZ and a random bookingToken: 409 with the same two fields.
3. POST Void with `voidTickets: [123]`: 400 whose context quotes `NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType` and `LineNumber: 0 | BytePositionInLine: 181`.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "aa30c667-b1af-474f-9b55-d1157d737a83",
  "ErrorCode": "NDC-INT-BYP-A0003",
  "ErrorMessage": "Reservation is already cancelled.",
  "Context": [
    {
      "Name": "TERMINAL",
      "Value": "RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
// 400 for voidTickets [123]:
{
  "status": 400,
  "transactionId": "6ac4a40f-2033-49cc-92c7-e7e75787f708",
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    {
      "name": "voidRequestDto",
      "value": "The voidRequestDto field is required."
    },
    {
      "name": "$.voidTickets[0]",
      "value": "The JSON value could not be converted to NDC.Integrations.Ap...[truncated]"
    }
  ],
  "originalSupplierRequest": null,
  "originalSupplierResponse": null
}
```

The raw supplier response is redacted in this report per SPEC.md 7.14; the live response contains it in full.

## ✅ Expected Result

```json
{
  "Status": 409,
  "TransactionId": "<GUID>",
  "ErrorCode": "NDC-INT-BYP-A0003",
  "ErrorMessage": "Reservation is already cancelled.",
  "Context": [
    {
      "Name": "ReservationCancelled",
      "Value": "Reservation is already cancelled"
    }
  ]
}
```

AC Result Mapping and AC Error Handling: supplier results are mapped to integration-defined fields and errors use the standard envelope; no raw supplier payload and no DTO names (SPEC.md 2.9 Expected Failure, 7.14).

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `aa30c667-b1af-474f-9b55-d1157d737a83`

## 📊 Severity

**Medium** — No credentials were seen in the Void bodies, but the raw supplier request/response structure and internal type names reach every API consumer.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "aa30c667-b1af-474f-9b55-d1157d737a83",
  "ErrorCode": "NDC-INT-BYP-A0003",
  "ErrorMessage": "Reservation is already cancelled.",
  "Context": [
    {
      "Name": "TERMINAL",
      "Value": "RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-BYP-A0003",
  "ErrorMessage": "Reservation is already cancelled.",
  "Context": [
    {
      "Name": "ReservationCancelled",
      "Value": "Reservation is already cancelled"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-VAL-07).

## 💥 Impact

API consumers can read and may come to depend on Travelport-native structures, and internal class names are exposed in validation errors; both are information-disclosure and contract-stability problems.
