# [V2][GulfAir][GetSeatMap] – seatPriceDetails.totalPrice Does Not Reconcile to basePrice + taxesPrice

## 📄 Description

For every `AvailablePaid` cell in the `GetSeatMap` response, `seatPriceDetailsByPassenger.<paxRef>`
(and the parent `seatPriceDetails`) returns `basePrice.amount: 0` (with `basePrice.currency: null`)
and `taxesPrice.amount: 0`, while `totalPrice.amount` carries the full, non-zero seat charge. The
documented price-reconciliation formula (`totalPrice == basePrice + taxesPrice`) never holds.

## 🔁 Steps to Reproduce

1. Search (GulfAir, KSA) BAH→RUH, select the first offer.
2. FareConfirm the offer.
3. AddPassenger with one ADT passenger.
4. GetSeatMap using AddPassenger's `ResponseId`/`selectedOfferId`.
5. Read `seatMapDetails.<segmentRefId>.rows[].cells[].cellDetails.seatPriceDetailsByPassenger.PAX1`
   for any `AvailablePaid` cell (e.g. cell `8A`).

## ❌ Actual Result

```json
{
  "totalPrice": {"amount": 120.00, "currency": "SAR"},
  "basePrice": {"amount": 0, "currency": null},
  "taxesPrice": {"amount": 0, "currency": "SAR"}
}
```

Confirmed systemic across all 179 `AvailablePaid` cells sampled in one seat map (3 distinct price
tiers observed: 40.00, 60.00, and 120.00 SAR) — every single one shows the identical
`basePrice=0/taxesPrice=0` pattern regardless of the actual `totalPrice` charged.

## ✅ Expected Result

```json
{
  "totalPrice": {"amount": 120.00, "currency": "SAR"},
  "basePrice": {"amount": 110.00, "currency": "SAR"},
  "taxesPrice": {"amount": 10.00, "currency": "SAR"}
}
```

(Illustrative split — the exact base/tax breakdown is unknown, but `basePrice.amount +
taxesPrice.amount` must equal `totalPrice.amount`, matching the same price-reconciliation formula
already enforced/expected at the offer level, SPEC.md §2.1/§7.10.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**High** — this is a billing-integrity gap: any downstream system that reads `basePrice`/
`taxesPrice` instead of `totalPrice` for a selected seat will under-report GulfAir seat revenue by
100% of the seat fee for every paid seat sold. It does not block the booking itself (which correctly
uses `totalPrice`/`totalSelectedSeatsAmount` in the Book response, per this run's TC-BOOK-BIZ-04
finding), but the base/tax breakdown itself is unusable.

## 📎 Evidence

**Actual response (redacted):**

```json
{"totalPrice": {"amount": 120.00, "currency": "SAR"}, "basePrice": {"amount": 0, "currency": null}, "taxesPrice": {"amount": 0, "currency": "SAR"}}
```

**Expected response (redacted):**

```json
{"totalPrice": {"amount": 120.00, "currency": "SAR"}, "basePrice": {"amount": 110.00, "currency": "SAR"}, "taxesPrice": {"amount": 10.00, "currency": "SAR"}}
```

## 💥 Impact

Extends the same class of defect already flagged for `GetAncillary` (SPEC.md §2.8's ancillary-amount
gap) to `GetSeatMap`'s per-seat pricing. Any finance/reporting pipeline, tax-remittance calculation,
or automated price-reconciliation test that trusts `basePrice`/`taxesPrice` over `totalPrice` for a
selected seat will silently zero out the base fare and tax components of every GulfAir seat sale.
