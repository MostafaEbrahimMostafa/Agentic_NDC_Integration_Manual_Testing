# [V1 and V2][TravelportNdc][Book] – voidCapability Missing from Book, BookAfterHold and Retrieve Responses

## 📄 Description

TravelportNdc Book, BookAfterHold and Retrieve (V1 and V2) never return `voidCapability`, even for a booking ticketed seconds earlier. SPEC.md §2.9 documents it as the live flag saying whether Void is currently possible. Second confirmation on TravelportNdc (first seen 2026-08-05); the same field was missing on SabreNdc until its Round 2 build, which now returns `FullVoidOnlyAllowed` on Book.

Found by: TC-CAPCHECK-TPN-02, QA run `20261026-105925_TravelportNdc-Void-UAE-V1V2` (2026-10-26).

## 🔁 Steps to Reproduce

1. Search (V2, TravelportNdc/UAE, CAI-JED 2026-11-12, 1 ADT) then FareConfirm then AddPassenger.
2. POST Book with the AddPassenger ids (V1: Search, FareConfirm, Book).
3. Inspect the keys of the Book response; then Retrieve the booking and inspect again.

## ❌ Actual Result

```json
{
  "tickets": {
    "travelerRefId_1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141427280",
      "carrierCode": "QR"
    }
  },
  "pnr": "72HZA2",
  "gdsPNR": "HNGC0L",
  "bookingToken": "f6a6694b-...",
  "(no voidCapability key)": ""
}
```

HTTP 200 (16.0s). The key list is supplier, pnr, gdsPNR, bookingToken, ticketingDate, tickets, passengersSelectedAncillaries, passengersSelectedSeats, journeys, flightSegments, priceClasses, baggageDetails, passengersList, contacts, selectedOffer, isBspCommissionApplied, diRemarks, emdTickets. The same holds for V1 Book 72HIJQ, BookAfterHold and Retrieve on both versions.

## ✅ Expected Result

```json
{
  "voidCapability": "FullVoidOnlyAllowed"
}
```

SPEC.md §2.9 / §2.15: a booking must carry a live `voidCapability` (`VoidNotAllowed` once it can no longer be voided). The value would be `FullVoidOnlyAllowed`, as SabreNdc returns on Book today.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Non-blocking, but callers cannot tell from the booking whether a same-day Void is allowed, and the capability-flag consistency check (TC-VOIDTPN-BIZ-05) cannot be run.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "tickets": {
    "travelerRefId_1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141427280",
      "carrierCode": "QR"
    }
  },
  "pnr": "72HZA2",
  "gdsPNR": "HNGC0L",
  "bookingToken": "f6a6694b-...",
  "(no voidCapability key)": ""
}
```

**Expected response (redacted):**

```json
{
  "voidCapability": "FullVoidOnlyAllowed"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261026-105925_TravelportNdc-Void-UAE-V1V2.html` (TC-CAPCHECK-TPN-02).

## 💥 Impact

A client has no signal to decide when to offer Void, and no signal that V1 cannot void at all. Flag-versus-outcome consistency (TC-VOIDTPN-BIZ-05) cannot be tested, so a wrong flag could never be caught either.
