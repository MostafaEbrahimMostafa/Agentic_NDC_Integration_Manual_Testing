# [V1][SabreNdc][Search] – paxTotalAmount Missing from passengerFareBreakdown in Search and FareConfirm Responses

## 📄 Description

The field `passengerFareBreakdown[].paxTotalAmount` is absent from every passenger entry returned by V1 `Search` and V1 `FareConfirm` on SabreNdc/EGY, although SPEC.md §2.1/§2.2 document it as part of the response shape and the V2 responses of the same supplier carry it. The same defect was reported for TravelportNdc/UAE on 2026-08-05 (BUG-03 of that run).

Found by: TC-SEARCH-BIZ-01 (also FLOW-V1-01..12 and TC-FARECONFIRM-BIZ-01), QA run `20261025-190214_SabreNdc-EGY-V1-Round2` (2026-10-25, Round 2).

## 🔁 Steps to Reproduce

1. V1 Search (SabreNdc/EGY, CAI-JED 2026-11-24, 2 ADT + 2 CHD + 2 INF).
2. Inspect `offers[0].passengerFareBreakdown[]` in the response (repeat for `selectedOffer.passengerFareBreakdown[]` after `FareConfirm`).

## ❌ Actual Result

```json
[
  {
    "passengerTypeCode": "ADT",
    "paxBaseAmount": {
      "amount": 2214,
      "currency": "EGP"
    },
    "paxTotalTaxAmount": {
      "amount": 11019.8,
      "currency": "EGP"
    },
    "taxesAndFees": null
  }
]
```

No `paxTotalAmount` property exists on any passenger entry of any of the 20 offers, nor on the FareConfirm `selectedOffer`. (V2 Search on the same supplier and date returns it.)

## ✅ Expected Result

```json
[
  {
    "passengerTypeCode": "ADT",
    "paxBaseAmount": {
      "amount": 2214,
      "currency": "EGP"
    },
    "paxTotalTaxAmount": {
      "amount": 11019.8,
      "currency": "EGP"
    },
    "taxesAndFees": null,
    "paxTotalAmount": {
      "amount": 13233.8,
      "currency": "EGP"
    }
  }
]
```

SPEC.md §2.1 reconciliation rule: `paxBaseAmount + paxTotalTaxAmount == paxTotalAmount`; the per-passenger total cannot be checked without it.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**Medium** — non-blocking (the aggregate `priceDetails.totalAmount` is present and booking proceeds), but any client that shows a per-passenger fare, and the per-passenger reconciliation step, cannot use V1 responses.

## 📎 Evidence

**Actual response (redacted):**

```json
[
  {
    "passengerTypeCode": "ADT",
    "paxBaseAmount": {
      "amount": 2214,
      "currency": "EGP"
    },
    "paxTotalTaxAmount": {
      "amount": 11019.8,
      "currency": "EGP"
    },
    "taxesAndFees": null
  }
]
```

**Expected response (redacted):**

```json
[
  {
    "passengerTypeCode": "ADT",
    "paxBaseAmount": {
      "amount": 2214,
      "currency": "EGP"
    },
    "paxTotalTaxAmount": {
      "amount": 11019.8,
      "currency": "EGP"
    },
    "taxesAndFees": null,
    "paxTotalAmount": {
      "amount": 13233.8,
      "currency": "EGP"
    }
  }
]
```

## 💥 Impact

Per-passenger totals have to be recomputed by the client; the V1 collection's own price-reconciliation assertions that read `paxTotalAmount` cannot run against SabreNdc.
