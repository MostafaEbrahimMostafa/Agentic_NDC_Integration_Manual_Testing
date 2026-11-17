# [V1 and V2][TravelportNdc][Void] – bookingToken Only Checked for Presence: a 1000-Character, Upper-Cased or Another Booking's Token Still Voids the Booking

## 📄 Description

Void uses the gdsPNR to find the booking and only requires `bookingToken` to be non-empty. A 1000-character token, an upper-cased token and the token of a different booking all void the booking, on V1 and V2. Whitespace-only tokens are rejected (400).

Recurrence of BUG-03 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01). Occurrence 3.

Found by: TC-VOIDTPN-BND-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Book 1 ADT on V1 or V2 (QR CAI-JED).
2. POST Void with the booking's pnr/gdsPNR and `bookingToken` = 1000 x "A" (or the upper-cased token, or the token of a second booking).
3. Retrieve the booking: 409 already cancelled.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "<ticket>", "carrierCode": "QR" } ]
}
```

BND01-tok-1000 and BND01-tok-upper voided the booking on V1 and V2; NEG-02 mixed token and NEGHOP5/NEGHOP6 stale-token voided the booking on V1 and V2; BND01-pnr-lower also voided (case-insensitive pnr)

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [ { "Name": "bookingToken", "Value": "bookingToken does not match the booking" } ]
}
```

SPEC.md 2.15 / 6.2: bookingToken is part of the booking identity triplet carried unchanged from Book. Also TC-VOIDTPN-NEG-02 and the NEGHOP5/NEGHOP6 flows.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The token is meant to bind the call to the booking; with any token a PNR holder can void a ticket.

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
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [ { "Name": "bookingToken", "Value": "bookingToken does not match the booking" } ]
}
```

## 💥 Impact

The token gives no protection: knowing the PNR is enough to void a paid ticket. The token does not bind the Void to the booking; any PNR holder can void with an arbitrary token
