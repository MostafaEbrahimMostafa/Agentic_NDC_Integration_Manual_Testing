# [V2][SabreNdc][Hold] – Hold Accepts a Stale or Mismatched AddPassenger Id Pair

## 📄 Description

V2 `Hold` accepts an id pair that does not come from the flow's own AddPassenger response: AddPassenger-A's responseId with AddPassenger-B's offerId, and the pre-AddPassenger FareConfirm responseId with AddPassenger-A's offerId. Both create a live hold.

Found by: FLOW-V2-26-NEG, QA run `20261025-093421_SabreNdc-EGY-V2` (2026-10-25).

## 🔁 Steps to Reproduce

1. V2 Search > FareConfirm > AddPassenger twice (A: offers[0], B: offers[2]) for SabreNdc/EGY CAI-JED 2026-11-20.
2. POST `api/v2/FlightBooking/Hold` with `fareConfirmResponseId` = A's AddPassenger responseId and `selectedOfferId` = B's AddPassenger offerId (second attempt: FareConfirm's responseId with A's offerId).
3. Cancel the holds with CancelAfterHold.

## ❌ Actual Result

```json
// HTTP 200 both times: hold RTGHCE and hold RSXWWX created
{ "pnr": "RTGHCE", "holdExpirationDate": "2026-10-30T21:59:00+02:00", ... }
```

Both holds were cancelled afterwards.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "Context": [ { "Name": "ResponseId", "Value": "Id pair does not match this booking flow" } ]
}
```

FLOW-V2-26-NEG and SPEC.md §2.5 / §3.2 / §3.3: after AddPassenger its ids supersede all earlier ones, and a pair not derived from this flow's AddPassenger must be rejected.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**Medium** — A hold (not a ticket) is created, but from ids that do not belong together; the same weakness is BUG-11 on Book.

## 📎 Evidence

**Actual response (redacted):**

```json
// HTTP 200 both times: hold RTGHCE and hold RSXWWX created
{ "pnr": "RTGHCE", "holdExpirationDate": "2026-10-30T21:59:00+02:00", ... }
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "Context": [ { "Name": "ResponseId", "Value": "Id pair does not match this booking flow" } ]
}
```

## 💥 Impact

Stale or crossed ids go unnoticed through the Hold branch, so a client defect shows up later as a wrong held booking instead of an immediate error.
