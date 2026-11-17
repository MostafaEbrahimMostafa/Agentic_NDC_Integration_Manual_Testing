# [V2][FlyAdeal][GetSeatMap] – Missing ResponseId Field Returns 500 ServerError Instead of a 400 Validation Error

## 📄 Description

`GetSeatMap` (`POST api/V2/SeatMap/Seat`) validates three of its four mandatory fields
(`supplier`, `credentialsSelector`, `selectedOfferId`) with a clean HTTP 400 validation error naming
the missing field, but omitting the fourth mandatory field, `ResponseId`, instead falls through to an
unhandled HTTP 500 `ServerError` with a generic message. This is an inconsistency in the endpoint's
own input-validation layer, not a difference in what's actually required.

## 🔁 Steps to Reproduce

1. Complete a normal `Search` &rarr; `FareConfirm` &rarr; `AddPassenger` chain for FlyAdeal/EGY to
   obtain a valid `offerId`/`responseId` pair.
2. `POST api/V2/SeatMap/Seat` with `supplier`, `credentialsSelector`, and `selectedOfferId` present,
   but `ResponseId` omitted entirely from the request body.

Compare against the same omission test for the other three mandatory fields (each correctly returns
400):
- Omit `supplier` &rarr; 400, `{"name":"Supplier","value":"Select a valid Supplier"}`
- Omit `credentialsSelector` &rarr; 400, `{"name":"CredentialsSelector","value":"Select a valid CredentialsSelector"}`
- Omit `selectedOfferId` &rarr; 400, `{"name":"SelectedOfferId","value":"The SelectedOfferId field is required."}`

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "36ec10b3-59a6-4093-9b0d-8b91faaee2bb",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    { "name": "ResponseId", "value": "The ResponseId field is required." }
  ]
}
```

Matching the validation envelope shape and behavior already confirmed live for the other three
mandatory fields on this same endpoint.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** non-staging (explicitly requested; SPEC.md §1.6 stale/unmaintained V1-only fallback host)
- **Credentials Selector:** `EGY`
- **Correlation ID:** `36ec10b3-59a6-4093-9b0d-8b91faaee2bb`

## 📊 Severity

**Low** — the request is still rejected either way (no functional/booking impact, and this endpoint's
requests were already out of scope for a real booking given FlyAdeal's Book blacklist), but the
inconsistent error contract is a genuine API-quality defect: 3 of 4 mandatory fields fail gracefully
with an actionable message, the 4th surfaces as an opaque, unhandled server fault.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "36ec10b3-59a6-4093-9b0d-8b91faaee2bb",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

**Expected response (redacted), by analogy with the other three mandatory fields on this same endpoint:**

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [
    { "name": "ResponseId", "value": "The ResponseId field is required." }
  ]
}
```

## 💥 Impact

A client that omits `ResponseId` by mistake (e.g. a chaining bug that fails to carry AddPassenger's
`responseId` forward) gets an opaque 500 instead of the same actionable "which field is missing"
message every other required field produces — making the actual bug harder to diagnose from the
response alone, and adding another source of false-positive server-error alerts alongside BUG-01.
Also worth noting as a secondary finding: this endpoint's 400-path envelope uses lowercase-leading
field names (`status`, `errorCode`, `context`) while its 500-path envelope uses PascalCase-leading
field names (`Status`, `ErrorCode`, `Context`) — a casing inconsistency between the two error paths on
the same endpoint, independent of this specific defect but worth flagging to whoever fixes it.
