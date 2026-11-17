# [V1/V2][AirIndia][Book] – Book Succeeds for Commercially Blacklisted Supplier AirIndia

## 📄 Description

AirIndia is listed as a commercially blacklisted supplier (SPEC 4.3) yet Book succeeds on this host for every shape tried (149 bookings created in this run)

## 🔁 Steps to Reproduce

1. Search, FareConfirm, AddPassenger, Book for supplier AirIndia (credentials EGY).

## ❌ Actual Result

```json
HTTP 200 { "pnr": "CTMKHI", ... }
```

If the same configuration reaches production, blacklisted bookings go through; if not, the spec is misleading

## ✅ Expected Result

```json
Book blocked at the business layer for a supplier listed in SPEC 4.3, or SPEC 4.3 states the block is production-only
```

Expected per SPEC.md §1.8, 4.3, 7.10 and the platform's own V2 behaviour where cited. Expected value: Book is blocked at the business layer for a blacklisted supplier, or the matrix states the block applies only in production

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — If this configuration reaches production, blacklisted bookings go through; if not, the spec is misleading.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 200 { "pnr": "CTMKHI", ... }
```

**Expected response (redacted):**

```json
Book blocked at the business layer for a supplier listed in SPEC 4.3, or SPEC 4.3 states the block is production-only
```

Test cases: TC-BOOK-SEC-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-BOOK-SEC-01 and every flow in this run

## 💥 Impact

If the same configuration reaches production, blacklisted bookings go through; if not, the spec is misleading
