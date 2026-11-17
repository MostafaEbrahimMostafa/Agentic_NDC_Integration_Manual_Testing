# [V1][V2][SabreNdc][Search] – taxesAndFees Missing from Search Response Offers

## 📄 Description

Every SabreNdc Search offer reports `paxTotalTaxAmount` and `totalTaxAmount`, but carries no tax line items: the offer-level `priceDetails.taxesAndFees` is `[]` and each `passengerFareBreakdown[].taxesAndFees` is `null`. FareConfirm and Upselling return the full list (17 lines for an adult: YQ, YR, EG, ...). V1 additionally omits `paxTotalAmount`.

Found by: TC-SEARCH-BIZ-02, QA run `20261025-092205_SabreNdc-EGY-Generic` (2026-10-25).

## 🔁 Steps to Reproduce

1. POST V1 or V2 Search (SabreNdc/EGY, CAI-JED 2026-11-20, 2 ADT + 1 CHD + 1 INF).
2. Inspect `offers[0].passengerFareBreakdown[].taxesAndFees` and `offers[0].priceDetails.taxesAndFees`.

## ❌ Actual Result

```json
"passengerFareBreakdown": [ { "passengerTypeCode": "ADT", "paxTotalTaxAmount": { "amount": 11019.8, "currency": "EGP" }, "taxesAndFees": null, ... } ],
"priceDetails": { "totalTaxAmount": { "amount": 37481.2, ... }, "taxesAndFees": [] }
```

The totals themselves reconcile on all 20 offers; only the item list is missing.

## ✅ Expected Result

```json
"taxesAndFees": [ { "code": "YQ", "amount": { "amount": 5535, "currency": "EGP" } }, { "code": "YR", "amount": { "amount": 1218, "currency": "EGP" } }, ... ]
```

SPEC.md §2.1 reconciliation rule 1: sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount. That check cannot hold when the list is empty; the V1 Search script enforces it.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**Low** — Prices and totals are right and FareConfirm has the breakdown, so booking is not affected; only Search-level tax display and the item-sum check are.

## 📎 Evidence

**Actual response (redacted):**

```json
"passengerFareBreakdown": [ { "passengerTypeCode": "ADT", "paxTotalTaxAmount": { "amount": 11019.8, "currency": "EGP" }, "taxesAndFees": null, ... } ],
"priceDetails": { "totalTaxAmount": { "amount": 37481.2, ... }, "taxesAndFees": [] }
```

**Expected response (redacted):**

```json
"taxesAndFees": [ { "code": "YQ", "amount": { "amount": 5535, "currency": "EGP" } }, { "code": "YR", "amount": { "amount": 1218, "currency": "EGP" } }, ... ]
```

## 💥 Impact

A client cannot show a tax breakdown on the results page, and the V1 collection script that checks the item sum would fail for SabreNdc. Reconciliation can only be done on totals until FareConfirm.
