# [V2][TravelportNdc][Void] – passengersVoidedAncillaries Returned as Null Instead of an Empty Collection

## 📄 Description

V2 Void for a booking without ancillaries returns `passengersVoidedAncillaries: null` while `emdTickets` is `{}`.

Recurrence of BUG-06 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01). Occurrence 3.

Found by: TC-VOIDTPN-VAL-10, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Book (1 ADT).
2. POST api/V2/FlightBooking/Void.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [ ... ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

V2 Void success body in TC-VOIDTPN-POS-02

## ✅ Expected Result

```json
"passengersVoidedAncillaries": {}
```

TC-VOIDTPN-VAL-10; SPEC.md 2.15 (a collection field).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Cosmetic contract inconsistency; consumers only need a null check.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [ ... ],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

**Expected response (redacted):**

```json
"passengersVoidedAncillaries": {}
```

## 💥 Impact

Clients must special-case one field documented as a collection. Consumers must null-check a field documented as a collection
