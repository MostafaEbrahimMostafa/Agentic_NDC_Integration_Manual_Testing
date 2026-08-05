# [V1][TravelportNdc][Search/FareConfirm] – paxTotalAmount Missing from passengerFareBreakdown Response

## 📄 Description

The field `passengerFareBreakdown[].paxTotalAmount` is entirely absent from every
`passengerFareBreakdown` entry returned by both `Search` and `FareConfirm`, although SPEC.md
documents it as part of the response shape.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-15, 1 ADT + 1 CHD + 1 INF
2. FareConfirm (`POST api/FlightSearch/FareConfirm`) — using Search's `searchResponseId`/`selectedOfferId` (field still absent here)

## ❌ Actual Result

```json
{
  "passengerTypeCode": "ADT",
  "paxTotalTaxAmount": 790,
  "paxBaseAmount": 160,
  "taxesAndFees": ["..."],
  "segmentDetails": ["..."],
  "discount": null
}
```

No `paxTotalAmount` property exists on any of the 67 Search offers, nor on the FareConfirm
`selectedOffer`.

## ✅ Expected Result

```json
"paxTotalAmount": {"amount": 950, "currency": "AED"}
```

For the ADT passenger (base 160 + tax 790 = 950), per SPEC.md §2.1/§2.2's documented response
shape and reconciliation rule (`paxBaseAmount + paxTotalTaxAmount == paxTotalAmount`).

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Search / FareConfirm`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `8EIQ8N`

## 📊 Severity

**Medium** — non-blocking (aggregate total is still correct and booking proceeds), but breaks a
downstream consumer: any per-passenger fare breakdown or the SPEC-documented
`paxBaseAmount + paxTotalTaxAmount == paxTotalAmount` reconciliation step is untestable.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "passengerFareBreakdown": [
    {"passengerTypeCode": "ADT", "paxBaseAmount": 160, "paxTotalTaxAmount": 790}
  ]
}
```

**Expected response (redacted):**

```json
{
  "passengerFareBreakdown": [
    {"passengerTypeCode": "ADT", "paxBaseAmount": 160, "paxTotalTaxAmount": 790, "paxTotalAmount": {"amount": 950, "currency": "AED"}}
  ]
}
```

## 💥 Impact

Per-passenger total price is not returned anywhere in Search or FareConfirm, so a per-pax fare
breakdown cannot be rendered or asserted by any caller, and the SPEC §2.1/§2.2 reconciliation
step comparing `paxBaseAmount + paxTotalTaxAmount` against `paxTotalAmount` is untestable against
the live API.
