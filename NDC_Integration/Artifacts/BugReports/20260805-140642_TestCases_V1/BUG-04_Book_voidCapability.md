# [V1][TravelportNdc][Book] – voidCapability Missing from Book Response

## 📄 Description

The field `voidCapability` is entirely absent from the `Book` response, although SPEC.md §2.9's
documented success shape lists it explicitly. This field is meant to indicate live, per-booking
whether Void may be attempted.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-15, 1 ADT + 1 CHD + 1 INF
2. FareConfirm (`POST api/FlightSearch/FareConfirm`) — using Search's `searchResponseId`/`selectedOfferId`
3. Book (`POST api/FlightBooking/Book`) — using FareConfirm's `fareConfirmResponseId`/`selectedOfferId` (failing call)

## ❌ Actual Result

```json
{
  "pnr": "8EIQ8N",
  "gdsPNR": "H07WD3",
  "bookingToken": "...",
  "tickets": ["..."]
}
```

No `voidCapability` property is present (nor `passengersSelectedAncillaries`).

## ✅ Expected Result

```json
"voidCapability": "VoidNotAllowed"
```

Per SPEC.md §2.9's documented success shape, which lists `voidCapability` as part of the Book
response.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `8EIQ8N`

## 📊 Severity

**Medium** — non-blocking (the booking itself succeeds), but breaks a downstream consumer: Flows
3/9/15/21 and all Void test cases are documented to decide Void-eligibility from Book's
`voidCapability` before attempting Void.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "8EIQ8N",
  "gdsPNR": "H07WD3",
  "tickets": [{"ticketNumber": "1572134824863", "ticketStatus": "Booked"}]
}
```

**Expected response (redacted):**

```json
{
  "pnr": "8EIQ8N",
  "gdsPNR": "H07WD3",
  "voidCapability": "VoidNotAllowed"
}
```

## 💥 Impact

Flows 3, 9, 15, 21 and all dedicated Void test cases are documented to decide Void-eligibility
from Book's `voidCapability` field. Without it, there is no contract-supported way to know
whether Void is permitted for a given PNR before attempting it — the Void attempt itself becomes
the only available probe, which is confirmed elsewhere in this run to return a misleading 409
(see [BUG-07](BUG-07_Void_ContextValue.md)).
