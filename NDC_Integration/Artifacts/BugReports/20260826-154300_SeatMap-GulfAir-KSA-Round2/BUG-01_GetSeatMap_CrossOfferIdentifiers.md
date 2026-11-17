# [V2][GulfAir][GetSeatMap] – ResponseId/selectedOfferId Cross-Offer Mismatch Not Validated in GetSeatMap Request

## 📄 Description

`GetSeatMap` accepts a `ResponseId` and `selectedOfferId` sourced from two entirely independent
`AddPassenger` chains (different searches, different offers, different routes/dates) and returns a
normal HTTP 200 seat map instead of rejecting the mismatched pair. This is a second-run
reproduction of a defect first found in the 2026-08-25 Round 1 regression pass — unchanged one day
later.

## 🔁 Steps to Reproduce

1. `AddPassenger` for Chain A (BAH-RUH, 2026-10-16) → record `responseId`/`offerId`.
2. `AddPassenger` for Chain B (BAH-JED, 2026-10-21) → record `responseId`/`offerId`.
3. `POST api/V2/SeatMap/Seat` with `ResponseId` = Chain A's value and `selectedOfferId` = Chain B's
   value (supplier=GulfAir, credentialsSelector=KSA).

## ❌ Actual Result

```json
{ "supplier": "GulfAir", "responseId": "...", "offerId": "...", "seatMapDetails": { "...": { "rows": [ "...30 rows..." ] } } }
```

HTTP 200 with a fully populated, well-formed seat map (~229 KB body) — no rejection, no warning that
the two IDs came from unrelated offers.

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "ValidationError", "ErrorMessage": "ResponseId and selectedOfferId do not belong to the same offer." }
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

**High** — a core identity/authorization check (that a seat map belongs to the offer it's requested
against) is not enforced, meaning stale or cross-session IDs can be combined to retrieve seat data
for an offer the caller never actually confirmed.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "responseId": "3f2684c4-2dc5-4e0d-a0a6-57e5b7eb223d",
  "offerId": "[Chain B offerId — redacted opaque token]",
  "seatMapDetails": { "...": "full 30-row seat map, unrelated to Chain A's own offer" }
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "ResponseId and selectedOfferId do not belong to the same offer."
}
```

## 💥 Impact

A caller (or a buggy/malicious client) can freely mix `ResponseId`/`selectedOfferId` pairs across
unrelated Search/FareConfirm/AddPassenger chains and still retrieve a valid-looking seat map. Since
this same opaque-ID-trust pattern also underlies `TC-SEATMAP-VAL-04`'s finding (a cross-offer
`cellId` submitted to `Book`), this is evidence of a systemic gap in offer/session-boundary
enforcement across the whole SeatMap→Book chain, not an isolated one-off.
