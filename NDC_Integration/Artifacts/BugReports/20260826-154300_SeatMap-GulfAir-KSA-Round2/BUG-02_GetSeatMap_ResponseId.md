# [V2][GulfAir][GetSeatMap] – ResponseId Not Enforced as Required in GetSeatMap Request

## 📄 Description

The field `ResponseId` is documented as a required request field on `GetSeatMap` (SPEC.md §2.7), but
a request omitting it entirely still succeeds with HTTP 200 and a fully populated seat map —
`selectedOfferId` alone is apparently sufficient. Second-run reproduction of a Round 1 (2026-08-25)
finding, unchanged one day later; `supplier`, `credentialsSelector`, and `selectedOfferId` are all
correctly rejected when omitted, `ResponseId` is not.

## 🔁 Steps to Reproduce

1. `AddPassenger` for a fresh GulfAir/KSA offer → record `responseId`/`offerId`.
2. `POST api/V2/SeatMap/Seat` with body `{"supplier":"GulfAir","credentialsSelector":"KSA","selectedOfferId":"<offerId>"}` — `ResponseId` omitted entirely.

## ❌ Actual Result

```json
"ResponseId": "(field absent from request entirely)"
```

HTTP 200 with the same well-formed `seatMapDetails` shape as a normal request that includes
`ResponseId`.

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.", "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}] }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 responses carry no TransactionId/error envelope)

## 📊 Severity

**Medium** — the endpoint still functions correctly using `selectedOfferId` alone, so no data
corruption results, but the documented required-field contract is not actually enforced, which is
misleading for API consumers/automation asserting on required-field behavior.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "supplier": "GulfAir", "seatMapDetails": { "...": "full 30-row seat map returned despite ResponseId being omitted" } }
```

**Expected response (redacted):**

```json
{ "status": 400, "errorCode": "1001", "context": [{"name": "ResponseId", "value": "The ResponseId field is required."}] }
```

## 💥 Impact

Documentation/contract drift: any test suite or integration that asserts `ResponseId` is enforced
as required will get a false negative. This same non-enforcement pattern also reproduces on `Book`
(see BUG-05), suggesting `ResponseId` validation is generically missing across at least two V2
enrichment/booking endpoints, not a one-off oversight in a single controller.
