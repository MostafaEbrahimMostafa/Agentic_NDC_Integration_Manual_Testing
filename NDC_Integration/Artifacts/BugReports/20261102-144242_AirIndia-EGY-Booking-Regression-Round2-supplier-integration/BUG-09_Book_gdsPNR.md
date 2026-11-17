# [V1/V2][AirIndia][Book] – gdsPNR Empty and voidCapability, creationDate Missing in Book Response

## 📄 Description

The Book response (V1 and V2) returns gdsPNR as an empty string, no voidCapability, no creationDate, tickets {} and emdTickets {} even when baggage, meals and seats were bought; V1 Book also returns holdExpirationDate (null) on a direct booking

## 🔁 Steps to Reproduce

1. Search, FareConfirm, AddPassenger (V2) or FareConfirm (V1), then Book with a baggage and a meal selected.

## ❌ Actual Result

```json
"gdsPNR": "",  "tickets": {},  "emdTickets": {}   // voidCapability and creationDate absent
```

Downstream steps keyed on gdsPNR/voidCapability cannot run; there is no proof that paid extras were issued

## ✅ Expected Result

```json
"gdsPNR": "<non-empty>",  "voidCapability": "<value>",  "creationDate": "2026-11-02T12:00:00Z",  "emdTickets": { ... for the paid extras }
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: A non-empty gdsPNR, a voidCapability value, a creationDate, and EMD records for paid extras

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Steps keyed on gdsPNR or voidCapability cannot run, and paid extras show no EMD or ticket.

## 📎 Evidence

**Actual response (redacted):**

```json
"gdsPNR": "",  "tickets": {},  "emdTickets": {}   // voidCapability and creationDate absent
```

**Expected response (redacted):**

```json
"gdsPNR": "<non-empty>",  "voidCapability": "<value>",  "creationDate": "2026-11-02T12:00:00Z",  "emdTickets": { ... for the paid extras }
```

Test cases: TC-BOOK-POS-02, TC-AIBK-DATA-07, TC-VERSIONDIFF-VAL-03 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-BOOK-POS-02, TC-AIBK-DATA-07, TC-VERSIONDIFF-VAL-03

## 💥 Impact

Downstream steps keyed on gdsPNR/voidCapability cannot run; there is no proof that paid extras were issued
