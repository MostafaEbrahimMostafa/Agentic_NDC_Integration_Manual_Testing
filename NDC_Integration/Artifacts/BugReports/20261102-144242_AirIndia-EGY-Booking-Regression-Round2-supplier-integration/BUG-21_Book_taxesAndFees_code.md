# [V2][AirIndia][Book] – Tax Code Vocabulary Changes Between FareConfirm and Book

## 📄 Description

Tax codes use a different vocabulary before and after booking: Search and FareConfirm show numeric codes ("3", "5"), Book shows named codes (YQ, CUTE, RCS, IN, P2, PN, CGST, SGST); totals match but the tax lines cannot be compared

## 🔁 Steps to Reproduce

1. Search, FareConfirm, AddPassenger, Book; compare priceDetails.taxesAndFees at each step.

## ❌ Actual Result

```json
Search/FareConfirm: [ {"code":"5"}, {"code":"3"} ]   Book: [ {"code":"YQ"}, {"code":"CUTE"}, {"code":"RCS"}, {"code":"IN"}, {"code":"P2"}, {"code":"PN"}, {"code":"CGST"}, {"code":"SGST"} ]
```

Tax reporting and reconciliation across the quote and the booking needs a mapping table nobody documents

## ✅ Expected Result

```json
The same code for the same tax throughout the chain
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: The same code for the same tax throughout the chain

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Tax lines of the quote and of the booking cannot be compared without an undocumented mapping.

## 📎 Evidence

**Actual response (redacted):**

```json
Search/FareConfirm: [ {"code":"5"}, {"code":"3"} ]   Book: [ {"code":"YQ"}, {"code":"CUTE"}, {"code":"RCS"}, {"code":"IN"}, {"code":"P2"}, {"code":"PN"}, {"code":"CGST"}, {"code":"SGST"} ]
```

**Expected response (redacted):**

```json
The same code for the same tax throughout the chain
```

Test cases: TC-AIBK-DATA-05 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-DATA-05

## 💥 Impact

Tax reporting and reconciliation across the quote and the booking needs a mapping table nobody documents
