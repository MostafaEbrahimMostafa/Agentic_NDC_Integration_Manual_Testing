# [V1][V2][SabreNdc][Book] – Repeat Book With the Same Offer Reference Creates a Second Live PNR

## 📄 Description

Sending the identical `Book` request twice for the same offer reference is not rejected and is not idempotent: each call creates its own PNR and its own ticket, on V1 and V2.

Found by: TC-BOOK-NEG-04, QA run `20261025-092205_SabreNdc-EGY-Generic` (2026-10-25).

## 🔁 Steps to Reproduce

1. V1: Search > FareConfirm > Book (SabreNdc/EGY, CAI-JED 2026-11-20, 1 ADT). V2: Search > FareConfirm > AddPassenger > Book.
2. POST the identical Book body a second time (same `fareConfirmResponseId`/`ResponseId` and `selectedOfferId`).
3. Void both PNRs.

## ❌ Actual Result

```json
// first Book -> pnr SCNEGY (V1) / SGQGMN (V2), ticket 1572140214151 / ...153
// second Book -> HTTP 200 with a NEW pnr RSAZSY (V1) / SIHLDI (V2), ticket 1572140214152 / ...154
```

Two live tickets for one selection; both were voided afterwards.

## ✅ Expected Result

```json
// second call rejected, or returns the first PNR
{
  "Status": 409,
  "ErrorCode": "DuplicateBooking",
  "ErrorMessage": "This offer has already been booked"
}
```

SPEC.md §2.9 (Negative Cases) names double-booking as a negative case; TC-BOOK-NEG-04 expects an idempotent rejection, never a second PNR.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**High** — A client retry after a timeout or a double click issues and charges a second ticket for the same traveller, with no error to warn anyone.

## 📎 Evidence

**Actual response (redacted):**

```json
// first Book -> pnr SCNEGY (V1) / SGQGMN (V2), ticket 1572140214151 / ...153
// second Book -> HTTP 200 with a NEW pnr RSAZSY (V1) / SIHLDI (V2), ticket 1572140214152 / ...154
```

**Expected response (redacted):**

```json
// second call rejected, or returns the first PNR
{
  "Status": 409,
  "ErrorCode": "DuplicateBooking",
  "ErrorMessage": "This offer has already been booked"
}
```

## 💥 Impact

Duplicate tickets mean duplicate payment and a manual void/refund per incident. Without idempotency the booking layer cannot be retried safely.
