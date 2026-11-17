# [V2][GulfAir][Book] – Omitting selectedOfferId Returns a Generic HTTP 500 Instead of a Validation Error

## 📄 Description

`Book` requires `selectedOfferId`, but a request that omits it entirely (while `supplier`/
`credentialsSelector`/`ResponseId` are all present and valid) fails with an unhandled-exception-shaped
generic HTTP 500 `ServerError`, rather than a controlled HTTP 400 `ValidationError` naming the missing
field — the same clean 400 shape correctly returned when `supplier` or `credentialsSelector` is
omitted from the identical request. This has reproduced identically for 4 consecutive rounds
(tracked as part of Round 1–3's `BUG-05` alongside a separate `ResponseId`-specific finding; broken
out into its own report this round since it is unrelated to `ResponseId` and remains fully in scope).

## 🔁 Steps to Reproduce

1. `AddPassenger` for a fresh GulfAir/KSA offer (no `GetSeatMap`/seat selection required to
   reproduce).
2. `Book` with `supplier`, `credentialsSelector`, and `ResponseId` all present and valid, but
   `selectedOfferId` omitted entirely from the request body.

## ❌ Actual Result

```json
{
  "Status": 500,
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "1001", "context": [{ "name": "SelectedOfferId", "value": "Select a valid SelectedOfferId" }] }
```

(Matching the clean, field-naming 400 shape this same endpoint correctly returns for a missing
`supplier` or `credentialsSelector`.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `afb97dda-40b5-4dda-95f2-df7393dac55c`

## 📊 Severity

**Medium** — no booking is created and no data-integrity issue results (unlike the separately-tracked
`ResponseId`-omission behavior on this same endpoint), but a generic 500 on a simple missing-field
case is a code-quality/robustness defect: it suggests the field is dereferenced before the request
validator runs, and it leaks an unhandled-exception shape to callers instead of a controlled
validation response.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 500, "ErrorCode": "ServerError", "TransactionId": "afb97dda-40b5-4dda-95f2-df7393dac55c" }
```

**Expected response (redacted):** `{ "status": 400, "errorCode": "1001" }`

## 💥 Impact

Confirmed unchanged across Round 1, Round 2, Round 3, and now Round 4 (2026-08-30, same-day
recurring pass, TransactionId `afb97dda-40b5-4dda-95f2-df7393dac55c`) — every round, omitting
`selectedOfferId` from an otherwise-valid `Book` request produces the identical generic 500 instead of
a clean, field-specific 400. Recommend the request-validation pipeline be checked for why
`selectedOfferId`'s null-check apparently happens later (or not at all) compared to `supplier`/
`credentialsSelector`'s.
