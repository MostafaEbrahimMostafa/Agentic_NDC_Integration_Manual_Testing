# [V2][GulfAir][Book] – OriginalSupplierRequest Leaks Plaintext Supplier Credentials on Duplicate-Submission Error Response

## 📄 Description

Resubmitting an already-consumed `Book` request (the identical `ResponseId`/`selectedOfferId` and
`passengersSelectedSeats` body as a prior, already-ticketed `Book` call) returns HTTP 409 with
`OriginalSupplierRequest`/`OriginalSupplierResponse` fields present in the error body. This is the
**3rd consecutive round** this Critical-severity leak has reproduced, now re-confirmed with an
explicit, targeted verification (rather than an incidental discovery, as in Round 2).

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` → `Book` for a fresh GulfAir/KSA offer with a seat selected
   (`isdebug` never set to `true` anywhere in the originating `Search` call).
2. Resubmit the **exact same** `Book` request body a second time (same `ResponseId`/
   `selectedOfferId`/`passengersSelectedSeats`).
3. Inspect the HTTP 409 error body's field list (not its content — see the redaction note below).

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "-1", "Value": "<truncated, 99 chars>" }],
  "OriginalSupplierRequest": "[PRESENT — 6330 characters, confirmed via a redacted keyword match only (never printed) to contain an apikey-like plaintext token]",
  "OriginalSupplierResponse": "[PRESENT — 1425 characters]"
}
```

**Redaction note (per this run's explicitly heightened safety rule, given this defect's history):**
Neither field's actual content was printed, saved, or logged anywhere in this run's artifacts — only
each field's presence, length, and a boolean keyword-match result were ever inspected or recorded, in
this report, the QA report, and the JSONL log alike.

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "-1", "Value": "<detail>" }]
}
```

(`OriginalSupplierRequest`/`OriginalSupplierResponse` omitted entirely from any caller-facing error
response, or at minimum with credential-bearing fields — `apiKey`/`secretKey` or equivalent — redacted
server-side before the field is ever serialized into an HTTP response body.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not captured this round (the 409's own `TransactionId`/correlation field was
  not separately recorded in the redacted-evidence-only inspection performed)

## 📊 Severity

**Critical** — a live, working supplier credential pair is disclosed in what this run confirmed is an
**unconditional** code path: `isdebug` was never set to `true` on any `Search` call this round, and
the leak still occurred. Anyone who can trigger a duplicate-Book-submission 409 (a realistic,
easy-to-hit scenario — an ordinary double-click or client-side retry, not an edge case) receives
credentials that could plausibly authenticate directly against the GulfAir/TPConnects supplier
backend outside of this API layer entirely.

## 📎 Evidence

**Actual response (redacted per this report's own rule — the credential value itself is never
reproduced, here or in any of this run's persisted artifacts):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "OriginalSupplierRequest": "[REDACTED — present, 6330 chars, confirmed via keyword-match only to contain an apikey-like token — see SPEC.md §7.14]",
  "OriginalSupplierResponse": "[REDACTED — present, 1425 chars]"
}
```

**Expected response (redacted):**

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999" }
```

## 💥 Impact

Confirmed unconditionally reproducing for the 3rd consecutive round (Round 2 discovered it
incidentally via a real client-timeout retry against pnr with an unknown PNR; Round 3 reproduced it
deliberately and confirmed the leaked field still contains an apikey-like token, purely via a
redacted keyword match — the actual value was never printed or persisted anywhere in this run's
artifacts, consistent with the heightened redaction instruction given this defect's history). This
remains the single highest-severity open defect across all three rounds. Recommend: (1) immediate
server-side fix to stop including `OriginalSupplierRequest`/`OriginalSupplierResponse` in any
caller-facing response regardless of `isdebug`, and (2) escalate to the security/platform team to
consider rotating the affected agency's GulfAir/TPConnects credentials as a precaution, independent
of and prior to the code fix landing.
