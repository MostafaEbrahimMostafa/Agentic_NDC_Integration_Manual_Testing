# [V1/V2][SabreNdc][Book] – response time Takes About 22 Seconds, Above the 16-Second Baseline, in Book Response

## 📄 Description

The median Book duration for QR bookings in this run was 22.1 s (V1) and 22.3 s (V2) against a 16 s SabreNdc baseline (+38%). Void stayed at about 10 s.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> Book. Repeat 3 or more times and take the median Book duration.

## ❌ Actual Result

```json
Book: 22.1 s (V1), 22.3 s (V2) median
```

Supplier latency may account for it; no mapping-specific cause could be isolated.

## ✅ Expected Result

```json
Median within 20% of 16 s (at most 19.2 s)
```

No SLA is documented in SPEC.md 7.1; the 20% tolerance is the threshold set by the test case.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Functionally correct; only the latency is above the agreed 20% tolerance.

## 📎 Evidence

**Actual response (redacted):**

```json
Book: 22.1 s (V1), 22.3 s (V2) median
```

**Expected response (redacted):**

```json
Median within 20% of 16 s (at most 19.2 s)
```

Test cases: TC-VOIDCAP-REG-11 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Supplier latency may account for it; no mapping-specific cause could be isolated.
