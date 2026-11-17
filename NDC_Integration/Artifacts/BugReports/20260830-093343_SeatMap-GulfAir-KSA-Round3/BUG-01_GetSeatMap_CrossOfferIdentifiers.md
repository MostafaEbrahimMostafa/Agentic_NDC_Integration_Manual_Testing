# [V2][GulfAir][GetSeatMap] – ResponseId/selectedOfferId Cross-Offer Mismatch Not Validated in GetSeatMap Request

## 📄 Description

`GetSeatMap` accepts a `ResponseId` sourced from one `AddPassenger` chain and a `selectedOfferId`
sourced from an entirely independent `AddPassenger` chain (different Search, different offer,
different route) and returns a normal HTTP 200 seat map instead of rejecting the mismatched pair.
This is the **3rd consecutive round** (Round 1, Round 2, Round 3) this defect has reproduced
identically.

## 🔁 Steps to Reproduce

1. Chain A: `Search` → `FareConfirm` → `AddPassenger` for GulfAir/KSA, BAH→RUH. Capture
   `getAddPaxResponceID` (Chain A).
2. Chain B: `Search` → `FareConfirm` → `AddPassenger` for GulfAir/KSA, BAH→JED (a completely
   independent offer). Capture `getAddPaxOfferId` (Chain B).
3. `GetSeatMap` with `ResponseId` = Chain A's `getAddPaxResponceID` and `selectedOfferId` = Chain B's
   `getAddPaxOfferId`.

## ❌ Actual Result

```json
{
  "status": 200,
  "supplier": "GulfAir",
  "offerId": "GF-OFFER-2&<opaque token bound to Chain B's BAH-JED itinerary>",
  "seatMapDetails": "{ ...fully populated, no cross-offer mismatch detected... }"
}
```

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "The ResponseId and selectedOfferId do not originate from the same offer."
}
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success, no TransactionId in a success envelope)

## 📊 Severity

**High** — a caller (or malicious actor) can retrieve a seat map for an offer it never itself
confirmed via `AddPassenger`, using another session's leaked or guessed `ResponseId`/`selectedOfferId`
pair. This is an authorization/data-scoping gap, not merely a cosmetic validation gap.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "status": 200, "offerId": "GF-OFFER-2&<Chain B token>", "seatMapDetails": "<populated>" }
```

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "ValidationError" }
```

## 💥 Impact

Every round this has been tested (2026-08-25, 2026-08-26, 2026-08-30), GulfAir has returned a fully
populated seat map for a cross-offer `ResponseId`/`selectedOfferId` pair with zero validation. Since
`cellID` tokens obtained this way are also unchecked downstream at `Book` (see BUG-07), the two
defects compound: a caller could enumerate seat maps and attempt seat selections across offers it
never legitimately confirmed. No fix has landed across 3 consecutive regression passes — recommend
escalating priority.
