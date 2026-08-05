# [V1][TravelportNdc][Search] – taxesAndFees Returned Empty While paxTotalTaxAmount Is Non-Zero in Search Response

## 📄 Description

The field `offers[].passengerFareBreakdown[].taxesAndFees` is returned as an empty array (`[]`)
in the `Search` response while the corresponding `paxTotalTaxAmount` on the same
`passengerFareBreakdown` entry is non-zero. This breaks the documented and script-enforced
price-integrity check that itemized taxes must sum to `paxTotalTaxAmount`.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-15, 1 ADT + 1 CHD + 1 INF (failing call)

## ❌ Actual Result

```json
"taxesAndFees": [],
"paxTotalTaxAmount": 790
```

Observed on the selected offer for ADT and CHD (`paxTotalTaxAmount`=790 each) and INF
(`paxTotalTaxAmount`=370), all with `taxesAndFees: []`. 29 of 67 offers in the same response show
this pattern; aggregate arithmetic (base 320 + tax 1950 = total 2270) is still correct.

## ✅ Expected Result

```json
"taxesAndFees": [{"code": "YQ", "amount": {"amount": 790, "currency": "AED"}}],
"paxTotalTaxAmount": 790
```

`sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount.amount` per SPEC.md §2.1. The same offer
itemizes taxes correctly once passed through FareConfirm, confirming the underlying data exists
upstream and is simply dropped at Search's own offer projection.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `8EIQ8N`

## 📊 Severity

**Medium** — non-blocking (aggregate totals are correct and booking proceeds), but breaks the
documented, script-enforced downstream reconciliation check, causing the V1 Search collection to
report a price-integrity failure on ~43% of offers.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "passengerFareBreakdown": [
    {"passengerTypeCode": "ADT", "paxTotalTaxAmount": 790, "taxesAndFees": []},
    {"passengerTypeCode": "CHD", "paxTotalTaxAmount": 790, "taxesAndFees": []},
    {"passengerTypeCode": "INF", "paxTotalTaxAmount": 370, "taxesAndFees": []}
  ]
}
```

**Expected response (redacted):**

```json
{
  "passengerFareBreakdown": [
    {"passengerTypeCode": "ADT", "paxTotalTaxAmount": 790, "taxesAndFees": [{"code": "YQ", "amount": {"amount": 790, "currency": "AED"}}]}
  ]
}
```

## 💥 Impact

The documented and script-enforced check `sum(taxesAndFees[].amount.amount) == paxTotalTaxAmount`
evaluates `0 == 790` and fails, so the V1 Search collection run reports a price-integrity failure
on a substantial share of offers even though aggregate totals reconcile. Tax itemization is
unavailable to any caller-facing fare breakdown built directly from Search's own response.
