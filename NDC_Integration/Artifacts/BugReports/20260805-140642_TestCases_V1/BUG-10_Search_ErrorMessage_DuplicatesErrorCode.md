# [V1][TravelportNdc][Search] – ErrorMessage Duplicates ErrorCode Instead of Human-Readable Text in Search Error Response

## 📄 Description

`Search`'s `ErrorMessage` field is populated with the bare error code string instead of a
human-readable message, and the actual actionable reason is buried inside `Context`, mixed in
with unrelated entries.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — with 10 passengers (ADT=8/CHD=1/INF=1, exceeding the 9-pax supplier limit, triggering the error path)

## ❌ Actual Result

```json
{
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {"Name": "VALIDATION", "Value": "MORE THAN 9 PAX IS NOT SUPPORTED"},
    {"Name": "", "Value": "COMMUNICATION ERROR"},
    {"Name": "", "Value": "COMMUNICATION ERROR"},
    {"Name": "", "Value": "COMMUNICATION ERROR"}
  ]
}
```

`ErrorMessage` is identical to `ErrorCode`, and the real reason (`Context[0].Value`) sits
alongside three unrelated per-carrier `COMMUNICATION ERROR` entries with empty `Name` fields.

## ✅ Expected Result

```json
"ErrorMessage": "More than 9 passengers is not supported. Reduce the total passenger count to 9 or fewer."
```

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Low** — non-blocking (the 9-pax limit is still correctly enforced), but a cosmetic/consumability
defect in the error envelope with no functional booking-path impact.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {"Name": "VALIDATION", "Value": "MORE THAN 9 PAX IS NOT SUPPORTED"},
    {"Name": "", "Value": "COMMUNICATION ERROR"},
    {"Name": "", "Value": "COMMUNICATION ERROR"},
    {"Name": "", "Value": "COMMUNICATION ERROR"}
  ]
}
```

**Expected response (redacted):**

```json
{
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "More than 9 passengers is not supported. Reduce the total passenger count to 9 or fewer.",
  "Context": [{"Name": "VALIDATION", "Value": "MORE THAN 9 PAX IS NOT SUPPORTED"}]
}
```

## 💥 Impact

A caller displaying `ErrorMessage` to a user or writing it to a log gets the string
`NDC-INT-UNC-Z9999`, which duplicates `ErrorCode` and conveys nothing. The real reason is in
`Context[0].Value`, mixed in with three per-carrier `COMMUNICATION ERROR` entries that have empty
`Name` fields and are unrelated to the actual validation failure — so a client cannot reliably
pick out the actionable message programmatically.
