# [V1][AirIndia][Book] – priceDetails Excludes Paid Bundle and Disagrees with Passenger Rows in V1 Book

## 📄 Description

V1 Book with a paid bundle for two or more passengers returns a priceDetails total that excludes the bundle and differs from FareConfirm, while the per-passenger rows include the bundle: two adults with bundle VLPL, FareConfirm 10130, Book total 10046 (base 6722, tax 3324) but the rows add up to 11930 (adult base 4261 and tax 1704 each). Single-passenger V1 bundle bookings are consistent. V2 prices the same bundle correctly

## 🔁 Steps to Reproduce

1. V1 Search DEL-BOM for 2 adults.
2. FareConfirm (total 10130), GetOfferBundles, choose bundle VLPL (900 per adult) in selectedBundles.
3. V1 Book with 2 passengers and selectedBundles [{journeyKey, selectedBundleCode:"VLPL"}].

## ❌ Actual Result

```json
{ "priceDetails": { "totalAmount": 10046, "totalBaseAmount": 6722, "totalTaxAmount": 3324 },
  "passengerFareBreakdown": [ {"passengerTypeCode":"ADT","paxBaseAmount":4261,"paxTotalTaxAmount":1704}, {"passengerTypeCode":"ADT","paxBaseAmount":4261,"paxTotalTaxAmount":1704} ] }   // rows add up to 11930
```

V1 clients are shown a total that is neither the quoted fare nor the sold fare; the customer may be charged for a bundle the booking total does not show

## ✅ Expected Result

```json
{ "priceDetails": { "totalAmount": 11930, "totalBaseAmount": 8522, "totalTaxAmount": 3408 } }
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: Book total 11930 (FareConfirm 10130 plus 900 per adult), identical to the sum of the passenger rows

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The V1 booking shows a total that is neither the quoted fare nor the sold fare while the rows show the sold fare.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "priceDetails": { "totalAmount": 10046, "totalBaseAmount": 6722, "totalTaxAmount": 3324 },
  "passengerFareBreakdown": [ {"passengerTypeCode":"ADT","paxBaseAmount":4261,"paxTotalTaxAmount":1704}, {"passengerTypeCode":"ADT","paxBaseAmount":4261,"paxTotalTaxAmount":1704} ] }   // rows add up to 11930
```

**Expected response (redacted):**

```json
{ "priceDetails": { "totalAmount": 11930, "totalBaseAmount": 8522, "totalTaxAmount": 3408 } }
```

Test cases: FLOW-V1-13, TC-AIBK-V1-BDL-MP-01, TC-AIBK-V1-BDL-MP-02 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). FLOW-V1-13 (2 ADT + 1 CHD), TC-AIBK-V1-BDL-MP-01 (2 ADT), TC-AIBK-V1-BDL-MP-02 (2 ADT + 1 CHD + 1 INF)

## 💥 Impact

V1 clients are shown a total that is neither the quoted fare nor the sold fare; the customer may be charged for a bundle the booking total does not show
