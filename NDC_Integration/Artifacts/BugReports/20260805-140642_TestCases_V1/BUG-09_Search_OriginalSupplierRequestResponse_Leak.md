# [V1][TravelportNdc][Search] – OriginalSupplierRequest/OriginalSupplierResponse Returned Despite isdebug=false in Search Error Response

## 📄 Description

`Search`'s error responses include populated `OriginalSupplierRequest` and
`OriginalSupplierResponse` fields — the raw upstream supplier request/response, including
upstream transaction/trace IDs and per-carrier error details — even when the request was sent
with `isdebug=false`. SPEC.md §7.14 documents these fields as debug-only passthrough, gated
behind the `isdebug` flag, and instructs testers never to persist them into shared output.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — with `isdebug=false`, 10 passengers (exceeding the 9-pax supplier limit, triggering the 409 error path)

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "OriginalSupplierRequest": "<populated — full upstream Travelport CatalogProductOfferings query>",
  "OriginalSupplierResponse": "<populated — full upstream response including transactionId/traceId and per-carrier error detail>"
}
```

Raw payload contents are deliberately not reproduced here per SPEC.md §7.14's redaction rule; the
field pair also appears (as `null`) on the supplier-enum 400 error, confirming they are part of
the standard error envelope rather than a one-off.

## ✅ Expected Result

```json
"OriginalSupplierRequest": null,
"OriginalSupplierResponse": null
```

These fields should be omitted entirely (or `null`) when `isdebug` is `false` or absent from the
request, per SPEC.md §7.14.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Critical** — SPEC.md §7.14 documents these fields as capable of carrying live supplier
credentials in plaintext. Emitting them unconditionally on any error path, regardless of the
`isdebug` flag a caller actually sent, is a credential-exposure/information-disclosure risk that
requires no special access to trigger — any validation error surfaces it.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [{"Name": "VALIDATION", "Value": "MORE THAN 9 PAX IS NOT SUPPORTED"}],
  "OriginalSupplierRequest": "<REDACTED per SPEC §7.14 — populated upstream Travelport request>",
  "OriginalSupplierResponse": "<REDACTED per SPEC §7.14 — populated upstream response with transactionId/traceId>"
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [{"Name": "VALIDATION", "Value": "MORE THAN 9 PAX IS NOT SUPPORTED"}],
  "OriginalSupplierRequest": null,
  "OriginalSupplierResponse": null
}
```

## 💥 Impact

SPEC.md §7.14 documents `supplierRequest`/`supplierResponse` as debug-only passthrough fields
that can carry live supplier credentials in plaintext, and instructs testers never to persist
them into shared output. On the error path they are emitted regardless of `isdebug`, so any
caller triggering a validation error receives the raw upstream payload without asking for it —
and any log, APM trace, or bug report that captures an error body will silently persist it.
Beyond the credential exposure risk, this also discloses the upstream Travelport request schema,
the internal `transactionId`/`traceId`, and which carriers were queried.
