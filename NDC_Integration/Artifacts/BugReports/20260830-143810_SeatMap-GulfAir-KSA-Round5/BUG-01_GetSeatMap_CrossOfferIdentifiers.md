# [V2][GulfAir][GetSeatMap] – Cross-Offer ResponseId/selectedOfferId Accepted Instead of Rejected

## 📄 Description

`GetSeatMap` accepts a `ResponseId`/`selectedOfferId` pair sourced from two completely unrelated
offers and returns a fully populated `seatMapDetails`, instead of rejecting the mismatched
identifiers. This is the **5th consecutive round** this defect has reproduced. This round's
re-verification was the top priority item, since Round 4's sustained `GetSeatMap` outage (`BUG-14`,
now resolved) had specifically prevented obtaining two independent successful `GetSeatMap` responses
to re-run this test.

## 🔁 Steps to Reproduce

1. Chain A: `AddPassenger` for GulfAir/KSA offer A (BAH-RUH, 2027-01-15). Record `ResponseId_A`.
2. Chain B: `AddPassenger` for GulfAir/KSA offer B (BAH-JED, 2027-01-18, unrelated, 2 ADT). Record
   `selectedOfferId_B`.
3. `GetSeatMap` using `ResponseId_A` + `selectedOfferId_B`. Repeat in the reverse direction
   (`ResponseId_B` + `selectedOfferId_A`).

## ❌ Actual Result

```json
{ "supplier": "GulfAir", "offerId": "...", "responseId": "...", "seatMapDetails": { "...": "full seat map returned despite the mismatched IDs" } }
```
(HTTP 200 in both directions)

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "ValidationError", "errorMessage": "The provided ResponseId and selectedOfferId do not belong to the same offer." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by either response (200 success)

## 📊 Severity

**High** — the API returns a seemingly-valid, fully-populated seat map for an identifier
combination that should not resolve to any real segment set at all, and this same lack of
cross-validation is the direct root cause of `BUG-07` (Book silently drops a cross-offer seat
instead of rejecting the booking).

## 📎 Evidence

**Actual response (redacted), both directions returned 200:**

```json
{ "supplier": "GulfAir", "offerId": "...", "seatMapDetails": { "...": "populated" } }
```

**Expected response (redacted):** `{ "status": 400, "errorCode": "ValidationError" }`

## 💥 Impact

Confirmed unchanged across Round 1, Round 2, Round 3 (not re-verified in Round 4 due to the
`GetSeatMap` outage), and now Round 5 — `ResponseId`/`selectedOfferId` are never cross-checked
against each other to confirm they originate from the same offer. This is a structural gap in the
offer-identity validation that also underlies `BUG-07`'s silent-seat-drop behavior in `Book`.
