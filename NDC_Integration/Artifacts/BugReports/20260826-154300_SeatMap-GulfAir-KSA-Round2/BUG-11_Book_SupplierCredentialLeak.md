# [V2][GulfAir][Book] – OriginalSupplierRequest/OriginalSupplierResponse Leak Plaintext Supplier Credentials on Book Error Response

## 📄 Description

When a `Book` call is retried against an already-consumed offer token, the resulting HTTP 409
("This booking has already been created") error response includes the **full raw supplier SOAP
request and response verbatim** in `OriginalSupplierRequest`/`OriginalSupplierResponse` — including
the travel agency's **plaintext `apiKey` and `secretKey`** used to authenticate to the
GulfAir/TPConnects backend. This leak is **unconditional**: the originating `Search` call in this
run used `isDebug:false`, yet the downstream `Book` error still carried the full raw supplier
payloads with live credentials embedded.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` → `Book` for a fresh GulfAir/KSA offer with a seat selected
   (`isDebug:false` throughout).
2. If the first `Book` call's client-observed response is delayed/times out (see BUG-12) or is
   otherwise retried with the identical `ResponseId`/`selectedOfferId` token, repeat the exact same
   `Book` call.
3. Inspect the HTTP 409 error body.

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "-1", "Value": "This booking has already been created (609). Please check on the Order Management page to confirm." }],
  "OriginalSupplierRequest": "[REDACTED — contains a full SOAP IATA_OrderCreateRQ, including <apiKey> and <secretKey> elements with live plaintext agent credentials, per SPEC.md §7.14]",
  "OriginalSupplierResponse": "[REDACTED — full SOAP IATA_OrderViewRS]"
}
```

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "-1", "Value": "This booking has already been created (609). Please check on the Order Management page to confirm." }]
}
```

(`OriginalSupplierRequest`/`OriginalSupplierResponse` omitted entirely, or present only when
`isDebug:true` was explicitly set on the originating request — consistent with SPEC.md §7.14's
existing `isdebug`-gated leak guardrail for Search.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `7f7341ab-a501-431d-ac2c-06e914a4a730`

## 📊 Severity

**Critical** — a live, working supplier `apiKey`/`secretKey` pair is disclosed in plaintext, in an
ordinary error-path response, with no debug flag involved on the request that triggered it. Anyone
who can trigger a duplicate-booking 409 (a realistic, easy-to-hit scenario — see BUG-12) receives
credentials that could plausibly be used to authenticate directly against the GulfAir/TPConnects
supplier backend outside of this API layer entirely.

## 📎 Evidence

**Actual response (redacted per this report's own rule — the credential values themselves are
never reproduced, here or in the run's persisted artifacts):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "OriginalSupplierRequest": "[REDACTED — SOAP envelope containing live plaintext apiKey/secretKey — see SPEC.md §7.14]"
}
```

**Expected response (redacted):**

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999" }
```

## 💥 Impact

This is a credential-leak vector distinct from, and more serious than, the already-documented
`isdebug=true`-gated `supplierRequest`/`supplierResponse` echo on `Search` (SPEC.md §7.14) — that one
requires the caller to deliberately opt into debug mode; this one fires on an **ordinary error path**
with no debug flag involved, and is directly reachable via the exact retry-after-timeout scenario
this run itself encountered organically (BUG-12). The live credential value observed in this run's
raw evidence has been treated as sensitive and is not reproduced in this bug report, the QA report,
or any other persisted artifact from this run — flag to the security/platform team to rotate the
affected agency's GulfAir/TPConnects credentials as a precaution, independent of fixing the leak
itself.
