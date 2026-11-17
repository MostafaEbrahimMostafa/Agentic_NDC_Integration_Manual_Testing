# [V2][AirIndia][AddPassenger] – Hyphen and Apostrophe Rejected in Passenger Names

## 📄 Description

Names containing a hyphen or an apostrophe (Al-Sayed, O'Neil) are rejected with "Passenger name must contain alphabetic characters only"; a two-word surname (Abdel Rahman) is accepted

## 🔁 Steps to Reproduce

1. Search, FareConfirm.
2. AddPassenger with name.last "Al-Sayed" (or "O'Neil").

## ❌ Actual Result

```json
HTTP 400 NDC-INT-TEC-A0001 "Passenger name must contain alphabetic characters only."
```

Real passengers with common surnames cannot be booked without the client rewriting their names

## ✅ Expected Result

```json
HTTP 200; hyphen and apostrophe accepted or stripped following the airline name rules
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: Hyphens and apostrophes are accepted or stripped following the airline name rules

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `AddPassenger`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `27d5346a-7113-48a1-9d23-d315ddc39261`

## 📊 Severity

**Low** — Real passengers with common surnames cannot be booked without the client rewriting their names.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 400 NDC-INT-TEC-A0001 "Passenger name must contain alphabetic characters only."
```

**Expected response (redacted):**

```json
HTTP 200; hyphen and apostrophe accepted or stripped following the airline name rules
```

Test cases: TC-AIBK-NAME-01, TC-AIBK-NAME-02 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-NAME-01, TC-AIBK-NAME-02

## 💥 Impact

Real passengers with common surnames cannot be booked without the client rewriting their names
