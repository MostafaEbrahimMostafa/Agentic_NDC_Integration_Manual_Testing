# [V2][TravelportNdc][Void] – voided Returned as false With HTTP 200 and the Held Booking Is Cancelled

## 📄 Description

Void on a held, unticketed booking is not rejected. TravelportNdc V2 returns HTTP 200 `{voided:false, voidedTickets:[]}` and, as a side effect, the hold is cancelled at Travelport (Retrieve then returns "Reservation is already cancelled."). CancelAfterHold is the documented path for holds.

Found by: TC-VOIDTPN-BIZ-03, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger, Hold (1 ADT): pnr 72JHGP, tickets empty.
2. POST `api/V2/FlightBooking/Void` with the held pnr/gdsPNR/bookingToken, surName, voidTickets [].
3. Retrieve: 409 "Reservation is already cancelled."

## ❌ Actual Result

```json
{
  "voided": false,
  "voidedTickets": [],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

HTTP 200 in 9.2s; the hold no longer exists afterwards.

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "VoidNotEligible",
  "ErrorMessage": "Only ticketed bookings can be voided"
}
```

AC Void Request (eligible booking) and TC-VOIDTPN-BIZ-03: Void for a held booking is rejected as not eligible and the hold stays alive. (SabreNdc rejects this case with 400 "Only fulfilled, ticketed orders can be voided".)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — A void of a not-ticketed booking answers success while silently destroying the hold.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": false,
  "voidedTickets": [],
  "passengersVoidedAncillaries": null,
  "emdTickets": {}
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "VoidNotEligible",
  "ErrorMessage": "Only ticketed bookings can be voided"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-VOIDTPN-BIZ-03).

## 💥 Impact

A caller that voids the wrong (held) booking receives a 2xx, loses the hold without knowing, and the response contradicts itself (success status with voided:false).
