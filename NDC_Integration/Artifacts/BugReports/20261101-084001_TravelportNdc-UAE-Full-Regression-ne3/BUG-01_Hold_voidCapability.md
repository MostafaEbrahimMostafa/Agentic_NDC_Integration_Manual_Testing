# [V1 and V2][TravelportNdc][Hold] – voidCapability Missing from Hold, PnrReprice and Held-Retrieve Responses

## 📄 Description

Hold, PnrReprice (FareConfirmAfterHold) and Retrieve of a held booking never return `voidCapability`, while Book, BookAfterHold and a ticketed Retrieve return `FullVoidOnlyAllowed`. Seen on V1 and V2, 0 of 25 Hold and 0 of 25 PnrReprice responses carried it.

Recurrence of BUG-01 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01 on stg-ne-3: Hold and PnrReprice carried voidCapability in 0 of 25 responses on V1 and V2). Occurrence 3.

Found by: TC-VOIDTPN-BIZ-05, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V1 or V2 Search, FareConfirm (V2: AddPassenger), Hold with 1 ADT (QR CAI-JED).
2. Inspect the Hold response, then POST PnrReprice and Retrieve the held booking.
3. BookAfterHold and inspect the same field: it is now present.

## ❌ Actual Result

```json
{
  "pnr": "<held pnr>",
  "holdExpirationDate": "2026-11-04T21:59:00Z",
  "tickets": {}
  // no "voidCapability" key
}
```

Hold 0/25, PnrReprice 0/25 (this run, all hold flows); V1 and V2 [hold path] check in TC-VOIDTPN-BIZ-05

## ✅ Expected Result

```json
{
  "voidCapability": "FullVoidOnlyAllowed"
}
```

SPEC.md 2.9 documents voidCapability as the booking-specific flag for Void eligibility (see TC-VOIDTPN-BIZ-05).

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Void eligibility cannot be read until the booking is ticketed; nothing breaks outright but the flag cannot be trusted as a pre-check.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "<held pnr>",
  "holdExpirationDate": "2026-11-04T21:59:00Z",
  "tickets": {}
  // no "voidCapability" key
}
```

**Expected response (redacted):**

```json
{
  "voidCapability": "FullVoidOnlyAllowed"
}
```

## 💥 Impact

Clients that gate Void on the flag cannot do so for held bookings or after repricing; a flag that appears only after ticketing is easy to mis-handle. A caller cannot read void eligibility from a held booking or after repricing; it only appears once the booking is ticketed
