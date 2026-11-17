# [V2][AirIndia][Book] – Tax AB0500 Dropped from Book Totals on India-to-UAE Bookings

## 📄 Description

On some India-to-UAE departures the Book response silently drops tax AB0500 (500 per passenger): priceDetails.taxesAndFees no longer lists it and totalTaxAmount and totalAmount are 500 per passenger lower than at FareConfirm, while every per-passenger taxesAndFees list still shows AB0500, so paxTotalTaxAmount does not equal its own tax list. Seen on DEL-SHJ (FareConfirm 33754, Book 32754, 2 passengers) and HYD-DXB (15934 vs 15434)

## 🔁 Steps to Reproduce

1. V2 Search DEL-SHJ for 1 adult + 1 child (any date; reproduced on the TC-AIBK-RTE-16 flight).
2. FareConfirm the first offer (total 33754, priceDetails.taxesAndFees contains AB0500: 1000).
3. AddPassenger, then Book.

## ❌ Actual Result

```json
{ "priceDetails": { "totalAmount": 32754, "totalTaxAmount": 16274, "taxesAndFees": [ {"code":"SVGU","amount":1000}, {"code":"YQ","amount":9184}, ... ] },
  "passengerFareBreakdown": [ { "paxTotalTaxAmount": 8137, "taxesAndFees": [ {"code":"AB0500","amount":500}, ... sum 8637 ] } ] }
```

The customer is quoted one price and the booking carries another with an internally inconsistent breakdown; reconciliation and refunds will not match

## ✅ Expected Result

```json
{ "priceDetails": { "totalAmount": 33754, "totalTaxAmount": 17274, "taxesAndFees": [ {"code":"AB0500","amount":1000}, ... ] },
  "passengerFareBreakdown": [ { "paxTotalTaxAmount": 8637 } ] }
```

Expected per SPEC.md §2.1, 2.9 and the platform's own V2 behaviour where cited. Expected value: Book total equals FareConfirm total (33754) and the tax lists sum to paxTotalTaxAmount; or a price-change flag if the price really moved

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The booking is priced 500 per passenger below the quoted fare with a breakdown that contradicts itself; reconciliation and refunds will not match.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "priceDetails": { "totalAmount": 32754, "totalTaxAmount": 16274, "taxesAndFees": [ {"code":"SVGU","amount":1000}, {"code":"YQ","amount":9184}, ... ] },
  "passengerFareBreakdown": [ { "paxTotalTaxAmount": 8137, "taxesAndFees": [ {"code":"AB0500","amount":500}, ... sum 8637 ] } ] }
```

**Expected response (redacted):**

```json
{ "priceDetails": { "totalAmount": 33754, "totalTaxAmount": 17274, "taxesAndFees": [ {"code":"AB0500","amount":1000}, ... ] },
  "passengerFareBreakdown": [ { "paxTotalTaxAmount": 8637 } ] }
```

Test cases: TC-AIBK-RTE-16, TC-AIBK-RTE-20 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-RTE-16, TC-AIBK-RTE-20 (reproduced twice; not on every date or flight: TC-AIBK-DATA-04 on another DEL-SHJ flight matched)

## 💥 Impact

The customer is quoted one price and the booking carries another with an internally inconsistent breakdown; reconciliation and refunds will not match
