# [V2][FlyAdeal][GetSeatMap] – Unhandled 500 ServerError Returned Instead of a Graceful Rejection When isSeatMapRequired is False

## 📄 Description

`GetSeatMap` (`POST api/V2/SeatMap/Seat`) throws an unhandled HTTP 500 `ServerError` when called
against an offer whose `isSeatMapRequired` flag was `false` at FareConfirm/AddPassenger time, instead
of a graceful, specific business-rule rejection. This behavior is consistent and reproducible: it
occurred on every GetSeatMap call made in this run (baseline call, cross-offer substitution, and
stale/fabricated-ID variants), since no FlyAdeal offer under the `EGY` credentials selector ever sets
`isSeatMapRequired: true`.

## 🔁 Steps to Reproduce

1. `POST api/V2/FlightSearch/Search` — supplier=FlyAdeal, credentialsSelector=EGY, any route/date
   (confirmed on JED-RUH, RUH-DMM, RUH-JED, and 16 further routes) — every returned offer has
   `isSeatMapRequired: false`.
2. `POST api/v2/FlightSearch/FareConfirm` — using Search's `responseId`/`offers[0].offerId` —
   `selectedOffer.isSeatMapRequired` confirmed `false`.
3. `POST api/v2/Passenger/AddPassengerDetails` — using FareConfirm's `responseId`/
   `selectedOffer.offerId` — succeeds, returns `{offerId, responseId}`.
4. `POST api/V2/SeatMap/Seat` — using AddPassenger's `offerId`/`responseId` as
   `selectedOfferId`/`ResponseId`.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "2c3dd063-d01c-4de1-9bc9-fcae0be322db",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

An unhandled server exception surfaces as a generic 500 with no indication of the actual cause
(the offer simply doesn't require/support a seat map).

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier."
}
```

SPEC.md §2.4 documents this exact envelope as the confirmed-live response when `GetOfferBundles` is
called for an offer with `haveBundles: false`. `GetSeatMap` should follow the same graceful,
capability-driven rejection pattern for `isSeatMapRequired: false` rather than falling through to an
unhandled exception.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** non-staging (explicitly requested; SPEC.md §1.6 stale/unmaintained V1-only fallback host)
- **Credentials Selector:** `EGY`
- **Correlation ID:** `2c3dd063-d01c-4de1-9bc9-fcae0be322db` (also reproduced independently with TransactionIds `b9b4a7bf-8d12-4b49-b723-d03ca9e13535`, `d9009d97-edbc-4bd0-a8a9-96095746f21f`, `d51ae35f-bff8-4817-8546-7b75ba650401`)

## 📊 Severity

**Medium** — does not block booking/payment (FlyAdeal is separately blacklisted for Book, so this
path was never going to complete a purchase), but it produces a raw, unhandled server fault for an
entirely expected, capability-driven scenario. This is noisy for server-error monitoring/alerting and
gives integrating clients no machine-readable way to distinguish "this offer has no seat map" from an
actual outage, short of pre-checking `isSeatMapRequired` themselves at FareConfirm time.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "2c3dd063-d01c-4de1-9bc9-fcae0be322db",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier."
}
```

## 💥 Impact

Any integration or automated test suite treating HTTP 500 as "unexpected server fault" (a standard
assumption) will flag every GetSeatMap call against a non-seat-map-capable offer as an outage,
polluting alerting/on-call signal with false positives. Conversely, a client that wants to gracefully
skip seat selection for an offer that doesn't support it has no clean way to detect that from the
GetSeatMap response alone — it must pre-check `isSeatMapRequired` from the FareConfirm/AddPassenger
response instead, an extra defensive step the API's own error contract should not force onto every
caller.
