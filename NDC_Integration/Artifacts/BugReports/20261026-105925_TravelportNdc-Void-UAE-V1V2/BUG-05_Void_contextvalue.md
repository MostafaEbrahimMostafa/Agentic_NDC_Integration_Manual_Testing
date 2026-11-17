# [V2][TravelportNdc][Void] – Error context Value Leaks Internal .NET Type Names and Raw Travelport Payloads

## 📄 Description

Void failure responses expose internals: the 400 validation errors name .NET types (`NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType`, `System.Collections.Generic.ICollection...`, "The voidRequestDto field is required"), and the 409 supplier errors carry `OriginalSupplierRequest` and `OriginalSupplierResponse` holding the raw Travelport reply (ReservationResponse / ReceiptListResponse JSON with traceId, transactionId and carrier codes). A scan found no credentials, PCC or passwords. Known DTO-leak defect (§2.9), now also on TravelportNdc Void.

Found by: TC-VOIDTPN-VAL-07, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Void with `voidTickets: [123]` on any booking: 400 (type name leaked).
2. V2 Void with pnr/gdsPNR "ZZZZZZ": 409 with OriginalSupplierRequest/OriginalSupplierResponse.
3. V2 Void under `credentialsSelector: "EGY"` for a UAE booking: 409 with the raw Travelport ReceiptListResponse.

## ❌ Actual Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    {
      "name": "$.voidTickets[0]",
      "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType. Path: $.voidTickets[0] | LineNumber: 0 | BytePositionInLine: 181."
    }
  ],
  "originalSupplierRequest": null,
  "originalSupplierResponse": null
}
```

The 409 bodies (not reproduced here, raw supplier JSON redacted per SPEC.md §7.14) contain `"OriginalSupplierRequest": "ZZZZZZ"` and a full `"OriginalSupplierResponse": "{ReservationResponse...}"`.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "context": [
    {
      "name": "voidTickets[0]",
      "value": "Each voidTickets item must be an object with ticketNumber"
    }
  ]
}
```

AC Result Mapping / AC Error Handling and §7.14: callers get integration-defined fields only; no DTO type names, no raw supplier request/response.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `7e1259c0-c4a9-4651-bdb3-278dc11780c4 (400) and 56c05e57-6eb4-4b07-99b1-1901ddd1439d (409) (TransactionIds)`

## 📊 Severity

**Medium** — Internal implementation detail and raw supplier replies are exposed to API callers; no credentials were found in them.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    {
      "name": "$.voidTickets[0]",
      "value": "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType. Path: $.voidTickets[0] | LineNumber: 0 | BytePositionInLine: 181."
    }
  ],
  "originalSupplierRequest": null,
  "originalSupplierResponse": null
}
```

**Expected response (redacted):**

```json
{
  "status": 400,
  "errorCode": "1001",
  "context": [
    {
      "name": "voidTickets[0]",
      "value": "Each voidTickets item must be an object with ticketNumber"
    }
  ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-VAL-07).

## 💥 Impact

Internal structure and supplier traffic are visible to every caller, and clients that parse the supplier payload become coupled to Travelport's format.
