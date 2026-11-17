# [V1 and V2][TravelportNdc][Search] – offers[].passengerFareBreakdown[].taxesAndFees Returned Empty While paxTotalTaxAmount Is Non-Zero

## 📄 Description

Search offers carry empty `taxesAndFees` while `paxTotalTaxAmount` is non-zero: all QR and RJ offers tested (0 of 20 on CAI-JED, 0 of 5 on DOH-DXB, 0 of 3 RJ on AMM-DXB) and 25 of 53 mixed offers. FareConfirm and Book are itemized.

Found by: TC-SEARCH-BIZ-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V1 Search CAI-JED 2 ADT + 2 CHD + 2 INF.
2. For each offer sum taxesAndFees and compare with paxTotalTaxAmount.

## ❌ Actual Result

```json
"taxesAndFees": [],
"paxTotalTaxAmount": { "amount": 810, "currency": "AED" }
```

V1 Search 2 ADT + 2 CHD + 2 INF CAI-JED: 25 of 53 offers fail (INF/ADT/CHD tax items 0 != paxTotalTaxAmount); first observed 2026-08-05 (29 of 67 offers)

## ✅ Expected Result

```json
"taxesAndFees": [ { "code": "<tax code>", "amount": { "amount": 810, "currency": "AED" } } ]
```

SPEC.md 2.1 reconciliation (TC-SEARCH-BIZ-01). First observed 2026-08-05 (29 of 67 offers).

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Tax breakdown is unavailable at search time for most offers and the documented reconciliation fails.

## 📎 Evidence

**Actual response (redacted):**

```json
"taxesAndFees": [],
"paxTotalTaxAmount": { "amount": 810, "currency": "AED" }
```

**Expected response (redacted):**

```json
"taxesAndFees": [ { "code": "<tax code>", "amount": { "amount": 810, "currency": "AED" } } ]
```

## 💥 Impact

Consumers cannot show or audit taxes before FareConfirm. Tax breakdown is unavailable at search time for most offers
