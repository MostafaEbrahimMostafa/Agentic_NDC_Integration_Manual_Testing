# [V1][TravelportNdc] – bookingStatus Missing from RetrieveBooking Response

## 📄 Description

The field `bookingStatus` is entirely absent from the `RetrieveBooking` response — not present as
`null`, simply not a key in the returned object. This field should contain the booking's current
lifecycle state (e.g. `Booked`, `Held`, `Cancelled`, `Voided`) to let callers validate terminal
booking state from the documented contract.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-15, 1 ADT + 1 CHD + 1 INF
2. FareConfirm (`POST api/FlightSearch/FareConfirm`) — using Search's `searchResponseId`/`selectedOfferId`
3. Book (`POST api/FlightBooking/Book`) — using FareConfirm's `fareConfirmResponseId`/`selectedOfferId`
4. RetrieveBooking (`POST api/FlightBooking/RetrieveBooking`) — using Book's `pnr`/`gdsPnr`/`bookingToken` (failing call)

## ❌ Actual Result

```json
{
  "tickets": ["..."],
  "creationDate": "...",
  "ticketingDate": "2026-08-05T11:19:42",
  "fareType": null,
  "bookedCredentialsSelector": "UAE",
  "holdExpirationDate": null,
  "supplier": "TravelportNdc",
  "pnr": "8EIQ8N",
  "gdsPNR": "H07WD3"
}
```

`bookingStatus` does not appear anywhere in the response — 0 occurrences of the literal
`bookingStatus` in the raw body. Booked state is only inferable indirectly from
`tickets[].ticketStatus='Booked'`, which cannot distinguish Held from Cancelled.

## ✅ Expected Result

```json
"bookingStatus": "Booked"
```

Per SPEC.md §2.11, `bookingStatus` is documented as the field flows use to validate terminal
booking state (Booked/Held/Cancelled/Voided).

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `RetrieveBooking`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `8EIQ8N`

## 📊 Severity

**High** — every one of the 24 V1 flows terminates in a Retrieve whose pass/fail hinges on
`bookingStatus`. The booking itself completes successfully (ticket issued, real PNR), so nothing
is blocked transactionally, but the documented terminal-state contract is entirely unusable and
testers must fall back to inferring state from `ticketStatus`, which cannot distinguish Held from
Cancelled.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "tickets": [{"ticketNumber": "1572134824863", "ticketStatus": "Booked", "carrierCode": "QR"}],
  "pnr": "8EIQ8N",
  "gdsPNR": "H07WD3",
  "fareType": null,
  "holdExpirationDate": null
}
```

**Expected response (redacted):**

```json
{
  "pnr": "8EIQ8N",
  "gdsPNR": "H07WD3",
  "bookingStatus": "Booked"
}
```

## 💥 Impact

Every V1 flow (24 of them, all Families A–F) ends with a Retrieve call whose documented
pass/fail criterion is `bookingStatus` reflecting the current lifecycle stage. With the field
absent, no flow can validate its terminal state through the contract SPEC §2.11 designates for
exactly that purpose. Testers and any automated harness must substitute an undocumented
workaround (checking `tickets[].ticketStatus` populated/empty and `holdExpirationDate`
set/cleared), which cannot reliably distinguish Held from Cancelled/Voided states.
