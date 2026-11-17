# [V1][V2][SabreNdc][Book] – Book Accepts a selectedOfferId From a Different Confirmation and Issues a Ticket

## 📄 Description

SabreNdc `Book` does not check that `selectedOfferId` belongs to the `fareConfirmResponseId` (V1) / `ResponseId` (V2) sent in the same request. Using the responseId of confirmation A with the offerId of confirmation B creates a real, ticketed PNR on both versions.

Found by: TC-BOOK-NEG-05, QA run `20261025-092205_SabreNdc-EGY-Generic` (2026-10-25).

## 🔁 Steps to Reproduce

1. Run two Search > FareConfirm (V1) or Search > FareConfirm > AddPassenger (V2) sequences, A and B, for SabreNdc/EGY CAI-JED (B using offers[2]).
2. POST `api/FlightBooking/Book` (V1) / `api/v2/FlightBooking/Book` (V2) with A's `fareConfirmResponseId` / `ResponseId` and B's `selectedOfferId`.
3. Void the resulting PNR to clean up.

## ❌ Actual Result

```json
// HTTP 200 on V1 (pnr RNTVTJ) and V2 (pnr SLXUUB)
{
  "pnr": "RNTVTJ",
  "gdsPNR": "RNTVTJ",
  "bookingToken": "1SXXX...",
  "tickets": { "Passenger1": { "ticketStatus": "Booked", "ticketNumber": "1572140214163" } }
}
```

Both bookings were voided straight afterwards.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error ..."
}
```

SPEC.md §2.9 (Negative Cases and the 2026-08-05 confirmation on TravelportNdc): a selectedOfferId that does not match the responseId must be rejected with 400 ValidationError.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**High** — This is the call that issues a ticket, and the session binding that should protect it is missing; the flow completes with data that does not belong together.

## 📎 Evidence

**Actual response (redacted):**

```json
// HTTP 200 on V1 (pnr RNTVTJ) and V2 (pnr SLXUUB)
{
  "pnr": "RNTVTJ",
  "gdsPNR": "RNTVTJ",
  "bookingToken": "1SXXX...",
  "tickets": { "Passenger1": { "ticketStatus": "Booked", "ticketNumber": "1572140214163" } }
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error ..."
}
```

## 💥 Impact

An offer can be ticketed under a confirmation it was never part of (different pricing session, different passenger set at AddPassenger). A client bug that mixes ids books silently instead of failing.
