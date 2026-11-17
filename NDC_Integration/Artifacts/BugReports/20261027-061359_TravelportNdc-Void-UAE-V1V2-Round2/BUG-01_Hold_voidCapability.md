# [V1 and V2][TravelportNdc][Hold] – voidCapability Missing from Hold, PnrReprice and Held-Retrieve Responses

## 📄 Description

The `voidCapability` flag is now returned by TravelportNdc Book, BookAfterHold and Retrieve of a ticketed booking (`FullVoidOnlyAllowed`), but it is still missing from the Hold response, the PnrReprice response and the Retrieve response of a held booking, on V1 and V2. A held booking cannot be voided (BIZ-03), so this is exactly where a `VoidNotAllowed` value is expected (SabreNdc returns it on Hold).

Recurrence of BUG-01 of the 2026-10-26 run (`20261026-105925_TravelportNdc-Void-UAE-V1V2`), narrowed: in Round 1 the flag was absent everywhere. Also seen on TravelportNdc V1 Book on 2026-08-05 and on SabreNdc 2026-10-22/25.

Found by: TC-VOIDTPN-BIZ-05, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V2: Search, FareConfirm, AddPassenger, Hold (1 ADT, CAI-JED 2026-11-12): pnr 775RZB, gdsPNR HNGL2Z.
2. Inspect the keys of the Hold response, then call PnrReprice and Retrieve while the booking is still held.
3. Call BookAfterHold and Retrieve again; compare the keys. (Same on V1 with pnr 775WP7.)

## ❌ Actual Result

```json
// Hold response keys (no voidCapability):
[
  "supplier",
  "pnr",
  "gdsPNR",
  "bookingToken",
  "holdExpirationDate",
  "passengersSelectedAncillaries",
  "passengersSelectedSeats",
  "journeys",
  "flightSegments",
  "priceClasses",
  "baggageDetails",
  "passengersList",
  "contacts",
  "selectedOffer",
  "isBspCommissionApplied",
  "diRemarks",
  "emdTickets"
]
// Retrieve of the held booking: no voidCapability key (bookingStatus "OnHold")
// BookAfterHold response: "voidCapability": "FullVoidOnlyAllowed"
```

The same absence occurs on PnrReprice and on V1 (Hold, PnrReprice and the held RetrieveBooking).

## ✅ Expected Result

```json
"voidCapability": "VoidNotAllowed"
```

SPEC.md 2.9 documents voidCapability as the booking-specific flag that says whether Void is currently possible; TC-VOIDTPN-BIZ-05 expects flag and outcome to agree. SabreNdc Hold returns VoidNotAllowed.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response (successful responses carry no TransactionId)`

## 📊 Severity

**Medium** — The flag works on ticketed bookings now, so Void decisions are possible for them; held bookings and aged tickets cannot be judged from the response (non-blocking, but a consumer that relies on the flag has no value to read).

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Hold.voidCapability": "absent",
  "PnrReprice.voidCapability": "absent",
  "Retrieve(held).voidCapability": "absent",
  "BookAfterHold.voidCapability": "FullVoidOnlyAllowed"
}
```

**Expected response (redacted):**

```json
{
  "Hold.voidCapability": "VoidNotAllowed",
  "Retrieve(held).voidCapability": "VoidNotAllowed"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-VOIDTPN-BIZ-05).

## 💥 Impact

A client that decides whether to show "Void" from voidCapability has no value for a held booking and must infer it from the missing key; the flag-vs-outcome consistency check can only be demonstrated for ticketed bookings.
