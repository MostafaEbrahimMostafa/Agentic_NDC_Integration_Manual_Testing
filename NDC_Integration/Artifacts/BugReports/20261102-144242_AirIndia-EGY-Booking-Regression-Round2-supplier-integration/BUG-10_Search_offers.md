# [V2][AirIndia][Search] – Search Returns Empty offers[] After ~15 s for Parties with Infants

## 📄 Description

Search for any party containing an infant takes 13-15 s (adult-only parties: about 4 s), and when the supplier leg crosses a fixed ~15 s limit Search answers HTTP 200 with an empty offers[] instead of an error. The same party succeeds on the next attempt or on the next date

## 🔁 Steps to Reproduce

1. POST api/V2/FlightSearch/Search DEL-BOM with passengers [{ADT:4},{CHD:3},{INF:2}] (also 3 ADT + 2 CHD + 1 INF, or 2 ADT + 1 CHD + 1 INF).
2. Repeat three times and compare with an adult-only search (about 4 s).

## ❌ Actual Result

```json
HTTP 200 after 15.1 s { "offers": [] }      (other attempts: offers returned after 13-15 s)
```

Customers travelling with infants intermittently see "no flights"; the empty 200 is indistinguishable from sold out

## ✅ Expected Result

```json
HTTP 200 with offers within a few seconds, or a mapped timeout error (never an empty success)
```

Expected per SPEC.md §2.1 and the platform's own V2 behaviour where cited. Expected value: Offers within a few seconds, or a mapped timeout error (never an empty success)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — Passengers travelling with infants intermittently see no flights, and the empty success hides the timeout.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 200 after 15.1 s { "offers": [] }      (other attempts: offers returned after 13-15 s)
```

**Expected response (redacted):**

```json
HTTP 200 with offers within a few seconds, or a mapped timeout error (never an empty success)
```

Test cases: TC-AIBK-SRCH-PERF-01, TC-SEARCH-BND-02 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIBK-SRCH-PERF-01 (4 of 12 searches empty or slow), TC-SEARCH-BND-02 (4 ADT + 3 CHD + 2 INF empty after 15.1 s on V1 and V2); retried silently inside TC-AIBK-PAX-06/07, NAME-01/02 and others

## 💥 Impact

Customers travelling with infants intermittently see "no flights"; the empty 200 is indistinguishable from sold out
