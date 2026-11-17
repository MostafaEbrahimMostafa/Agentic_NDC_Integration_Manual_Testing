# [V2][FlyAdeal][Book] – pnr Returned as Null in Book Response for a Two-Journey (Round-Trip) Itinerary

## 📄 Description

The field `pnr` is returned as `null` (with `bookingToken` and `gdsPNR` empty) in the `Book` response with HTTP **200** for every two-journey itinerary tried: 2 passengers with seats, 1 passenger with seats, 2 passengers without seats and 1 passenger without seats (4 of 4). Single-journey Books returned a `pnr` every time (12 of 12). **New defect** (first observed Round 21).

## History

| Round | Date | Result |
|---|---|---|
| 21 | 2026-10-11 | FAIL - 4 of 4 two-journey Book calls: HTTP 200, pnr null |

## 🔁 Steps to Reproduce

1. `Search` with two criteria JED→RUH 2026-12-04 and RUH→JED 2026-12-08 (2 ADT) → `FareConfirm` → `GetOfferBundles` (2 journeys) → `AddPassenger` → `GetSeatMap` (2 segments).
2. `Book` with `selectedBundles` [FLY, FLY] and `passengersSelectedSeats` for both passengers on both segments (also without seats, and with 1 passenger).

## ❌ Actual Result

```json
{
  "status": 200,
  "supplier": "Flyadeal",
  "pnr": null,
  "gdsPNR": "",
  "bookingToken": "",
  "tickets": {},
  "passengersSelectedSeats": { "<pax1>": { "<seg1>": { "cellCode": "17A" }, "<seg2>": { "cellCode": "17A" } }, "<pax2>": { "...": "..." } }
}
```

The seats are echoed correctly but no booking reference is returned. Retrieve cannot be called without a pnr.

## ✅ Expected Result

```json
{
  "status": 200,
  "pnr": "<6-character booking reference>",
  "bookingToken": "",
  "gdsPNR": ""
}
```

SPEC.md §2.9: Book returns the pnr of the created booking, or an error when the booking could not be created.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `bbd40375-8ddb-4e5d-94ab-54046e7a0bca`

## 📊 Severity

**Critical** — a successful (200) booking response carries no booking reference, so the booking cannot be retrieved, changed or cancelled, and it is unknown whether a reservation was created at the airline.

## 📎 Evidence

**Actual response (redacted):**

```json
// P (2 pax x 2 seg, seats), P2 (1 pax x 2 seg, seats), P3 (2 pax, no seats), P4 (1 pax, no seats): all HTTP 200 with pnr null.
```

**Expected response (redacted):**

```json
// A pnr in every successful response.
```

Source: `TC-BOOK-BND-03` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

Round-trip bookings cannot be tracked or managed through this API, and the lost references may correspond to live airline reservations (see Cleanup in the QA report).
