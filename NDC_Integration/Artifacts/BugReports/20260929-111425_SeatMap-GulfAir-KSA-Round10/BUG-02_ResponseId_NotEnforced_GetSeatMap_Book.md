# [V2][GulfAir][GetSeatMap / Book] – ResponseId Not Enforced as a Required Field Despite Documented Contract

## 📄 Description

Both `GetSeatMap` (`POST api/V2/SeatMap/Seat`) and `Book` (`POST api/v2/FlightBooking/Book`) document
`ResponseId` as a mandatory request field, tying the call to a specific prior offer chain. In practice,
neither endpoint enforces it: omitting `ResponseId` entirely, or supplying one from a completely
unrelated offer/search, still returns a normal `200` success as long as `selectedOfferId` is a valid,
current token. `selectedOfferId` alone — an opaque token that itself embeds offer/response/passenger
metadata — appears sufficient on both endpoints.

## 🔁 Steps to Reproduce

**GetSeatMap, omission variant:**
1. `AddPassenger` — record `offerId`/`responseId`.
2. `GetSeatMap` — send `supplier`, `credentialsSelector`, `selectedOfferId` (from step 1), and omit
   `ResponseId` entirely.

**GetSeatMap, cross-offer variant:**
1. Run two independent `Search -> FareConfirm -> AddPassenger` chains (Offer A, Offer B).
2. `GetSeatMap` — `ResponseId` = Offer A's `responseId`, `selectedOfferId` = Offer B's `offerId`.

**Book, omission variant:**
1. `AddPassenger` — record `offerId`/`responseId`.
2. `Book` — send `supplier`, `credentialsSelector`, `selectedOfferId` (from step 1), and omit
   `ResponseId` entirely.

## ❌ Actual Result

All three variants return `HTTP 200`:

```json
// GetSeatMap, ResponseId omitted: 200, full 30-row/210-cell seatMapDetails returned
// GetSeatMap, cross-offer ResponseId+selectedOfferId: 200, seat map for Offer B's segment returned
// Book, ResponseId omitted: 200, real pnr "QSGKXM" created and ticketed (3 passengers)
```

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again.", "Context": [{ "Name": "ResponseId", "Value": "The ResponseId field is required." }] }
```

(matching the rejection shape both endpoints already return for a missing `selectedOfferId`,
`supplier`, or `credentialsSelector` on the same requests — all three of which were correctly rejected
with `HTTP 400` in this same round's testing).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`, `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by any of these three responses (all HTTP 200, no TransactionId field on a success response).

## 📊 Severity

**High** — a documented mandatory field providing request-integrity/identity-binding is silently
unenforced across two of the API's most consequential endpoints (one of which creates a real, ticketed
booking). While no direct exploit path was identified this round (since `selectedOfferId` alone still
ties the call to a specific, valid offer), this contradicts the documented contract on two endpoints
consistently, indicating `ResponseId` may be dead weight throughout the V2 offer-chaining pattern
rather than a narrow oversight — worth confirming intent before any client is built assuming
`ResponseId` provides real validation.

## 📎 Evidence

**Actual response (redacted, Book/ResponseId-omitted variant):**

```json
{
  "supplier": "GulfAir",
  "pnr": "QSGKXM",
  "bookingToken": "TPC60517146431D2992026",
  "tickets": { "PAX1": {"ticketStatus":"Booked","ticketNumber":"722136995760"}, "PAX2": {"ticketStatus":"Booked","ticketNumber":"722136995761"}, "PAX3": {"ticketStatus":"Booked"} }
}
```

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again.", "Context": [{ "Name": "ResponseId", "Value": "The ResponseId field is required." }] }
```

## 💥 Impact

Any automated test suite or client library that assumes `ResponseId` mismatches or omissions are
caught server-side (as the documented Required Request Fields table implies) will not catch a genuine
integration bug on its own side — the call will simply succeed. For `Book` specifically, this means a
caller could commit a real, ticketed booking while sending a `ResponseId` that doesn't correspond to
the `selectedOfferId`'s actual origin, with no server-side objection. Recommend either (a) removing
`ResponseId` from the documented Required Request Fields for both endpoints if it's genuinely
decorative, or (b) adding the missing server-side validation if it was intended to matter.
