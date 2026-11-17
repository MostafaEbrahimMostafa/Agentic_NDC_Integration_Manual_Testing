# [V1 and V2][TravelportNdc][Void] – surName Ignored: a Surname That Matches No Passenger Still Voids the Booking

## 📄 Description

Void never validates `surName`. A wrong surname ("Mismatch"), no surname, or an injection string (SQL, script tag, 500 characters) voids the booking on V1 and V2.

Recurrence of BUG-04 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01). Occurrence 3.

Found by: TC-VOIDTPN-VAL-04, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Book 1 ADT (passenger surname Ibrahim) on V1 or V2.
2. POST Void with `surName: "Mismatch"`.
3. Retrieve: 409 already cancelled.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "<ticket>", "carrierCode": "QR" } ]
}
```

VAL04-wrong and VAL04-omit voided on V1 and V2; SEC04-sql, SEC04-xss and SEC04-long (surName) voided on V1 and V2

## ✅ Expected Result

```json
4xx standard envelope (surName does not match any passenger), booking left ticketed
```

SPEC.md 2.15 Common Errors and TC-VOIDTPN-VAL-04 / SEC-04.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The passenger-ownership check described in the acceptance criteria does not exist.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "<ticket>", "carrierCode": "QR" } ]
}
```

**Expected response (redacted):**

```json
4xx standard envelope (surName does not match any passenger), booking left ticketed
```

## 💥 Impact

Anyone holding a PNR can void a ticket without knowing the passenger surname. Anyone holding a PNR/gdsPNR can void a ticket without knowing the passenger surname
