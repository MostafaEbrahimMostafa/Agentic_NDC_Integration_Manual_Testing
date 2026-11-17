# [V2][AirIndia][AddPassenger] – Second AddPassenger on the Same Offer Fails with "Duplicate contact type P"

## 📄 Description

A second AddPassenger call for the same FareConfirm offer, for example to fix a typo, fails with 409 NDC-INT-UNC-Z9999 "Duplicate contact type 'P' detected" and cannot be repeated

## 🔁 Steps to Reproduce

1. Search, FareConfirm.
2. POST AddPassenger (200).
3. POST AddPassenger again with the same ResponseId/selectedOfferId and corrected passenger data.

## ❌ Actual Result

```json
HTTP 409 { "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Value": "Duplicate contact type 'P' detected." } ] }
```

Any correction after AddPassenger forces a full restart of the chain; the message does not say why

## ✅ Expected Result

```json
HTTP 200 (the passenger data is replaced) or a mapped 4xx explaining that FareConfirm must be repeated
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: The second call replaces the passenger data, or returns a mapped error telling the caller to run FareConfirm again

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `AddPassenger`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `d67d434a-048b-4233-8958-898dd17c5554`

## 📊 Severity

**Medium** — Any correction after AddPassenger forces a restart of the chain, with no explanation.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 409 { "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Value": "Duplicate contact type 'P' detected." } ] }
```

**Expected response (redacted):**

```json
HTTP 200 (the passenger data is replaced) or a mapped 4xx explaining that FareConfirm must be repeated
```

Test cases: TC-AIBK-ADDPAX-REPEAT-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-ADDPAX-REPEAT-01; the same message appears when AddPassenger variants share an offer

## 💥 Impact

Any correction after AddPassenger forces a full restart of the chain; the message does not say why
