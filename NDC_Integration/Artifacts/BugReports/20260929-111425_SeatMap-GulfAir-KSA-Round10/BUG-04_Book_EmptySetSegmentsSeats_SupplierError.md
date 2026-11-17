# [V2][GulfAir][Book] – Empty Nested setSegmentsSeats Object Triggers a Supplier-Layer Error Instead of Succeeding

## 📄 Description

`Book` accepts an entirely-absent `passengersSelectedSeats` field, and also an explicitly empty
top-level `passengersSelectedSeats: {}`, both cleanly (HTTP 200, no seat attached, no fee). However,
when `passengersSelectedSeats.<paxRef>` is present but that passenger's own `setSegmentsSeats` is an
empty object (`{}`), `Book` instead triggers a real supplier-layer round-trip that then fails with a
generic, unmapped error — rather than being treated as a no-op the way the other two "empty" shapes
are.

## 🔁 Steps to Reproduce

1. `Search` — GulfAir/KSA, BAH→RUH 2027-07-08, 1 ADT.
2. `FareConfirm` — confirm the offer.
3. `AddPassenger` — one ADT passenger (`PAX1`).
4. `Book` — `ResponseId`/`selectedOfferId` from step 3, body includes
   `"passengersSelectedSeats": { "PAX1": { "setSegmentsSeats": {} } }`.

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "400", "Value": "Error occurred while getting response from GF supplier" }]
}
```

(HTTP 409, in ~27.6s — indicating a real supplier call was attempted and failed, unlike the
sub-second/30-40s clean success of the other two "empty" variants.)

## ✅ Expected Result

```json
{ "pnr": "<redacted>", "passengersSelectedSeats": {}, "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": null } } }
```

HTTP 200 — `Book` succeeds, no seat is attached for `PAX1`, and no error is thrown purely from the
presence of an otherwise-empty nested `setSegmentsSeats` object (per this test case's own stated
expectation, and consistent with how the top-level-empty variant already behaves).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `25303399-a9ad-41ee-9b9f-40ff2eddac0e` (TransactionId)

## 📊 Severity

**Medium** — non-blocking for a caller that simply omits `passengersSelectedSeats` or sends it fully
empty (both of which work), but it's a real inconsistency: a client library that builds
`passengersSelectedSeats.<pax>.setSegmentsSeats` as an object it fills in conditionally (a common
coding pattern) can easily end up sending this exact "key present, no segments yet" shape by accident
and get an opaque supplier-layer 409 instead of a clean no-seat booking.

## 📎 Evidence

**Actual response (redacted — the raw response also carried a live `OriginalSupplierRequest` SOAP
payload, withheld here per SPEC.md §7.14):**

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999", "Context": [{ "Name": "400", "Value": "Error occurred while getting response from GF supplier" }] }
```

**Expected response (redacted):**

```json
{ "pnr": "<redacted>", "passengersSelectedSeats": {} }
```

**Contrast — top-level-empty variant on a different fresh offer succeeds cleanly:**

```json
{ "supplier": "GulfAir", "pnr": "QXXZEB", "passengersSelectedSeats": {}, "tickets": { "PAX1": { "ticketStatus": "Booked" } } }
```

## 💥 Impact

The error code returned (`NDC-INT-UNC-Z9999`, whose `ErrorMessage` is just the code repeated back) is
itself unhelpful for a caller trying to diagnose why an otherwise-valid Book request failed — it gives
no indication the problem is the empty `setSegmentsSeats` shape specifically. Recommend either
normalizing this shape to the same no-op behavior as an entirely-absent/top-level-empty
`passengersSelectedSeats`, or — if a real supplier round-trip is intentional here — returning a
clearer, request-validation-style error rather than a raw supplier-failure envelope.
