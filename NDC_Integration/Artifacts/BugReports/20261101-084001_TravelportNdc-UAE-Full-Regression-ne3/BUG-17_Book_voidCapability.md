# [V1 and V2][TravelportNdc][Book] – voidCapability Missing from Emirates (EK) Book Responses Intermittently

## 📄 Description

Book responses for Emirates bookings omit `voidCapability` in some cases: EK V1 9 of 12 present, V2 11 of 13; QR 99 of 99 and RJ 28 of 28 present (FullVoidOnlyAllowed).

Found by: TC-TPNREG-RTE-BOOK-EK-06, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Book 1 ADT on EK DXB-JFK (preferredAirlines EK), V1 and V2.
2. Inspect voidCapability in the Book response.

## ❌ Actual Result

```json
{
  "pnr": "<pnr>",
  "tickets": { ... },
  // no "voidCapability"
}
```

Book voidCapability present: QR V1 50/50, V2 49/49; RJ V1 14/14, V2 14/14; EK V1 9/12, V2 11/13 (e.g. EK DXB-JFK V1 and V2 both absent)

## ✅ Expected Result

```json
"voidCapability": "FullVoidOnlyAllowed"
```

SPEC.md 2.9 voidCapability.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Void eligibility is unreadable for some EK bookings while QR and RJ always return it.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "<pnr>",
  "tickets": { ... },
  // no "voidCapability"
}
```

**Expected response (redacted):**

```json
"voidCapability": "FullVoidOnlyAllowed"
```

## 💥 Impact

Clients cannot rely on the flag for EK bookings. Void eligibility cannot be read for some EK bookings; clients cannot rely on the flag
