# [V1/V2][AirIndia][Book] – Advertised Meal Bundles (VIVC, NCOC) Rejected by Book on Some Flights

## 📄 Description

GetOfferBundles advertises meal bundles (VIVC, NCOC) that Book then refuses with 409 NDC-INT-UNC-Z9999 "Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO", on V1 and V2. It depends on the flight: the same bundles book on other offers (TC-AIBK-BDL-MTX-01..04 passed on four other offers)

## 🔁 Steps to Reproduce

1. Search DEL-BOM, pick an offer whose first leg is DEL-LKO, FareConfirm, GetOfferBundles (bundle VIVC listed at 600).
2. AddPassenger and Book with selectedBundles VIVC (V1: Book directly).

## ❌ Actual Result

```json
HTTP 409 { "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Value": "Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO ..." } ] }
```

A customer picks a bundle that cannot be sold and loses the booking attempt at the final step

## ✅ Expected Result

```json
Only sellable bundles are listed, or Book returns a mapped business error
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: Only bundles that can be sold are listed, or Book returns a mapped business error

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `6a5ec22d-4566-478b-b82f-cf2dc2d902fb`

## 📊 Severity

**Medium** — A customer picks a bundle that cannot be sold and loses the attempt at the final step.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 409 { "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Value": "Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO ..." } ] }
```

**Expected response (redacted):**

```json
Only sellable bundles are listed, or Book returns a mapped business error
```

Test cases: TC-AIBK-BDL-03, TC-AIBK-BDL-12 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-BDL-03 (V2), TC-AIBK-BDL-12 (V1)

## 💥 Impact

A customer picks a bundle that cannot be sold and loses the booking attempt at the final step
