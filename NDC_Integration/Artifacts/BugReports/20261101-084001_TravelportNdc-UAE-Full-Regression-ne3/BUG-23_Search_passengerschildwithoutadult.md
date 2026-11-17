# [V1 and V2][TravelportNdc][Search] – passengers[] (child without adult) Accepted for a Child-Only Party

## 📄 Description

Search for one child and no adult returns 200 with 53 offers on V1 and V2.

Found by: TC-TPNREG-PAX-NEG-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. POST Search CAI-JED with passengers [{ "passengerTypeCode": "CHD", "count": 1 }].

## ❌ Actual Result

```json
{ "offers": [ ...53 offers ] }  // HTTP 200
```

passengers [{CHD,1}]: V1 200 53 offers, V2 200 53 offers. Business rule needs confirmation (SPEC only states the 9-passenger cap)

## ✅ Expected Result

```json
400 validation error (or a documented unaccompanied-minor rule)
```

TC-TPNREG-PAX-NEG-01; SPEC.md 6.1 only states the 9-passenger cap, so the adult requirement is to be confirmed.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Offers are priced for a party that cannot be booked; the rule itself needs confirmation.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "offers": [ ...53 offers ] }  // HTTP 200
```

**Expected response (redacted):**

```json
400 validation error (or a documented unaccompanied-minor rule)
```

## 💥 Impact

Failure appears later at AddPassenger/Book. Offers are priced for a party that cannot be booked; the failure only appears later at Book/AddPassenger
