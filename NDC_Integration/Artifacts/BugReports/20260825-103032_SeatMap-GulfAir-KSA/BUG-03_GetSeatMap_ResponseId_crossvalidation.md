# [V2][GulfAir][GetSeatMap] – ResponseId and selectedOfferId Not Cross-Validated as Belonging to the Same Offer

## 📄 Description

`GetSeatMap` accepts a `ResponseId` sourced from one independent `AddPassenger` chain (Offer A) and
a `selectedOfferId` sourced from a completely different, unrelated `AddPassenger` chain (Offer B —
different search, different route, different date) and returns HTTP 200 with a normal, well-formed
seat map, instead of rejecting the mismatched pair.

## 🔁 Steps to Reproduce

1. Chain A: Search (BAH→RUH 2026-10-15) → FareConfirm → AddPassenger → capture `responseId`.
2. Chain B: Search (BAH→JED 2026-10-20) → FareConfirm → AddPassenger → capture `offerId`.
3. GetSeatMap with `ResponseId` = Chain A's `responseId` and `selectedOfferId` = Chain B's `offerId`.

## ❌ Actual Result

```json
{
  "supplier": "GulfAir",
  "offerId": "GF-OFFER-2&...(Chain B's own offer token)",
  "seatMapDetails": { "...": "a fully populated, valid seat map" }
}
```

HTTP 200, no rejection, no error of any kind.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "ResponseId and selectedOfferId do not correspond to the same offer."
}
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Medium** — narrower than a full authorization bypass (the caller must already possess a valid
`ResponseId` from *some* prior AddPassenger call of their own), but it contradicts the API's own
inferred "stateless-per-call authorization re-check" design (SPEC.md §1.7) and means the two
identity tokens carry no real cross-consistency guarantee at this endpoint.

## 📎 Evidence

**Actual response (redacted):**

```json
{"supplier": "GulfAir", "offerId": "<Chain B offer token>", "responseId": "<Chain A responseId, unrelated>"}
```

**Expected response (redacted):**

```json
{"Status": 400, "ErrorCode": "ValidationError", "ErrorMessage": "ResponseId/selectedOfferId mismatch"}
```

## 💥 Impact

A caller (or a buggy/compromised client) can request seat-map data for one offer while presenting a
`ResponseId` established under a completely different, unrelated search — GetSeatMap has no
mechanism to detect or reject this. Combined with BUG-07/BUG-08 (Book's own lack of cellId/cellCode
cross-validation), this establishes a pattern across the SeatMap-related surface where identity
tokens are accepted largely at face value rather than being fully cross-checked against each other.
