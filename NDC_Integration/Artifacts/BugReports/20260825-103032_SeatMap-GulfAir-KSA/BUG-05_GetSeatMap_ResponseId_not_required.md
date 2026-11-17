# [V2][GulfAir][GetSeatMap] – ResponseId Not Enforced as a Required Field Despite Documentation

## 📄 Description

`GetSeatMap`'s documented Required Request Fields table names `ResponseId` as required, alongside
`supplier`, `credentialsSelector`, and `selectedOfferId`. Omitting `supplier`, `credentialsSelector`,
or `selectedOfferId` each correctly produces an HTTP 400 validation error — but omitting `ResponseId`
entirely still returns HTTP 200 with a fully populated seat map.

## 🔁 Steps to Reproduce

1. AddPassenger completed for a GulfAir/KSA offer.
2. POST `GetSeatMap` with `supplier`, `credentialsSelector`, `selectedOfferId` all present and
   valid, but `ResponseId` omitted from the request body entirely.

## ❌ Actual Result

```json
{
  "supplier": "GulfAir",
  "offerId": "<valid offer token>",
  "responseId": "<a new responseId>",
  "seatMapDetails": { "...": "fully populated" }
}
```

HTTP 200 — identical in shape to a request that correctly includes `ResponseId`.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "1001",
  "errorMessage": "Validation errors occurred. Please check your request.",
  "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}]
}
```

(Matching the clean 400 shape already returned for the other 3 required fields in this same test
sweep.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Low** — no data-integrity or security impact was observed (the seat map returned is correct for
`selectedOfferId` alone), but it is a confirmed contract-documentation mismatch: `ResponseId` is not
actually load-bearing for this endpoint, contradicting SPEC.md §2.7's Required Request Fields table.

## 📎 Evidence

**Actual response (redacted):**

```json
{"supplier": "GulfAir", "seatMapDetails": {"...": "fully populated"}}
```

**Expected response (redacted):**

```json
{"status": 400, "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.", "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}]}
```

## 💥 Impact

Documentation/contract drift: any client, test suite, or integration guide that treats `ResponseId`
as a hard requirement for `GetSeatMap` is testing/documenting a constraint the live API does not
actually enforce. Combined with BUG-06 (the identical gap on `Book`), this establishes the pattern
is systemic across at least two endpoints in the GetSeatMap→Book chain, not an isolated one-off.
