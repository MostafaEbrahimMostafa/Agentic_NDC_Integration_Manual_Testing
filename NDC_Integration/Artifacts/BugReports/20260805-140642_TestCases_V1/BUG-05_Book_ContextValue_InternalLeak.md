# [V1][TravelportNdc][Book] – Context[].Value Leaks Internal Implementation Detail in Book Error Response

## 📄 Description

The `Context[].Value` field in a Book validation-error response leaks an internal .NET
namespace and DTO type name verbatim, instead of a caller-facing validation message.

## 🔁 Steps to Reproduce

1. Search #1 (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-15
2. Search #2 (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-20 (independent call, distinct `responseId`/`offerId`)
3. FareConfirm (`POST api/FlightSearch/FareConfirm`) — using Search #1's `searchResponseId`/`offerId`
4. Book (`POST api/FlightBooking/Book`) — using Search #1's `fareConfirmResponseId` but Search #2's `selectedOfferId` (mismatched pair, failing call)

## ❌ Actual Result

```json
"Context": [{"Value": "Failed to deserialize NDC.Integrations.Infrastructure.TravelportNdc.V1.MetaDataDtos.TravelportNdcFareConfirmMetaDataDto value."}]
```

## ✅ Expected Result

```json
"Context": [{"Value": "selectedOfferId does not correspond to the supplied fareConfirmResponseId"}]
```

A caller-facing, field-actionable validation message per SPEC.md §7's error-envelope
expectations — not an internal deserialization/namespace detail.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `dbca927d-a70a-474a-b859-f3ae953c06e1`

## 📊 Severity

**Medium** — non-blocking (the mismatched request is correctly rejected with no booking created),
but discloses internal architecture and gives the integrator no actionable field-level reason.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 400,
  "TransactionId": "dbca927d-a70a-474a-b859-f3ae953c06e1",
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error occured. Please check your request.",
  "Context": [{"Value": "Failed to deserialize NDC.Integrations.Infrastructure.TravelportNdc.V1.MetaDataDtos.TravelportNdcFareConfirmMetaDataDto value."}]
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "TransactionId": "dbca927d-a70a-474a-b859-f3ae953c06e1",
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error occured. Please check your request.",
  "Context": [{"Value": "selectedOfferId does not correspond to the supplied fareConfirmResponseId"}]
}
```

## 💥 Impact

Information disclosure: the error body exposes the internal namespace structure
(`NDC.Integrations.Infrastructure.TravelportNdc.V1.MetaDataDtos`), revealing supplier-adapter
architecture and the technology stack to any caller holding only an API key. It is also
unactionable — the integrator cannot tell which field was rejected or why from this message
alone.
