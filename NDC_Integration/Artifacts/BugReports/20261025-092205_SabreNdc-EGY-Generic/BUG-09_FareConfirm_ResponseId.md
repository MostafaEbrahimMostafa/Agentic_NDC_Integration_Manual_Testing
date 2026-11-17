# [V1][V2][SabreNdc][FareConfirm] – ResponseId Not Validated in FareConfirm Request

## 📄 Description

SabreNdc `FareConfirm` ignores the search responseId (`searchResponseId` on V1, `ResponseId` on V2). A responseId from a different Search, an all-zero GUID, or no responseId at all is accepted (HTTP 200) as long as `selectedOfferId` is valid. An `offerId` taken from a different route (CAI-DOH) is re-priced under a CAI-JED responseId. The response then echoes the invalid id back as its own `responseId` (the all-zero GUID), so the bad value propagates to the next hop.

Found by: TC-FARECONFIRM-NEG-01 (also TC-FARECONFIRM-VAL-01), QA run `20261025-092205_SabreNdc-EGY-Generic` (2026-10-25).

## 🔁 Steps to Reproduce

1. POST V2 Search (SabreNdc/EGY, CAI-JED 2026-11-20, 1 ADT) and keep any `offers[0].offerId`.
2. POST `api/v2/FlightSearch/FareConfirm` with `ResponseId` = `00000000-0000-0000-0000-000000000000` and that `selectedOfferId` (repeat with `ResponseId` omitted, or with the responseId of a second Search). V1 `api/FlightSearch/FareConfirm` behaves the same with `searchResponseId`.

## ❌ Actual Result

```json
// HTTP 200
{
  "responseId": "00000000-0000-0000-0000-000000000000",
  "supplier": "SabreNdc",
  "selectedOffer": { "offerId": "ce79b9bcf4fd29n7fmvnmfsi...", "priceDetails": { "totalAmount": { "amount": 14340.8, "currency": "EGP" } } }
}
```

Same 200 for: all-zero GUID, ResponseId omitted, responseId of another Search (V1 and V2), and a CAI-DOH offerId under a CAI-JED responseId (re-priced to 19584.8 EGP). Only an unknown offerId fails (see BUG-10).

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error ...",
  "Context": [ { "Name": "ResponseId", "Value": "ResponseId does not match the selectedOfferId" } ]
}
```

SPEC.md §2.2 / §7.7 list a mismatched responseId/offerId pair as a negative case that must be rejected; SPEC §2.9 records HTTP 400 ValidationError for the same mismatch on TravelportNdc.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `FareConfirm`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**Medium** — No money moves at FareConfirm, but the responseId is the only link between an offer and its search session, and it is never checked (BUG-11 and BUG-13 are the booking-side consequences).

## 📎 Evidence

**Actual response (redacted):**

```json
// HTTP 200
{
  "responseId": "00000000-0000-0000-0000-000000000000",
  "supplier": "SabreNdc",
  "selectedOffer": { "offerId": "ce79b9bcf4fd29n7fmvnmfsi...", "priceDetails": { "totalAmount": { "amount": 14340.8, "currency": "EGP" } } }
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error ...",
  "Context": [ { "Name": "ResponseId", "Value": "ResponseId does not match the selectedOfferId" } ]
}
```

## 💥 Impact

A stale, fabricated or foreign search session id is never detected at FareConfirm, and mixing ids from different sessions works silently. Any client or test that relies on a 4xx for a bad session id gets none. TC-FARECONFIRM-NEG-01 fails on both versions; TC-FARECONFIRM-VAL-01 only passes because "ignored" is an allowed outcome.
