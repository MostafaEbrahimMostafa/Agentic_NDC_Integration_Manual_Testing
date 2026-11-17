# [V1/V2][AirIndia][GetOfferBundles] – bundleName Returned as the Raw Code and Infant bundlePrices Missing

## 📄 Description

Bundle data is not customer-readable: 3 of 4 bundles carry bundleName equal to the raw code (DEL, NCOC, VIVC), the base bundle is named after an airport code (DEL), and no bundle has a bundlePrices entry for the infant passenger type present in the party

## 🔁 Steps to Reproduce

1. Search for 2 adults + 1 child + 1 infant, FareConfirm, GetOfferBundles.

## ❌ Actual Result

```json
"bundleCode": "DEL", "bundleName": "DEL", "bundlePrices": [ {"passengerType":"ADT"}, {"passengerType":"CHD"} ]   // no INF entry; NCOC and VIVC also named after their codes
```

Front ends must hard-code names; infant pricing is ambiguous

## ✅ Expected Result

```json
"bundleName": "Base fare" (a readable name) and a bundlePrices entry per passenger type present
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: Readable names (for example "Value Pack") and one bundlePrices entry per passenger type present

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetOfferBundles`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Front ends must hard-code names, and infant pricing is ambiguous.

## 📎 Evidence

**Actual response (redacted):**

```json
"bundleCode": "DEL", "bundleName": "DEL", "bundlePrices": [ {"passengerType":"ADT"}, {"passengerType":"CHD"} ]   // no INF entry; NCOC and VIVC also named after their codes
```

**Expected response (redacted):**

```json
"bundleName": "Base fare" (a readable name) and a bundlePrices entry per passenger type present
```

Test cases: TC-AIEGY-BDL-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-BDL-01

## 💥 Impact

Front ends must hard-code names; infant pricing is ambiguous
