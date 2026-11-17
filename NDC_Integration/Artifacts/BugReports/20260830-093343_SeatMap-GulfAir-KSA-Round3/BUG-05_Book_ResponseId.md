# [V2][GulfAir][Book] – ResponseId Not Enforced as Required, and selectedOfferId Omission Returns Generic 500

## 📄 Description

Like `GetSeatMap` (BUG-02), `Book` documents `ResponseId` as required, but a request omitting it
entirely still succeeds and creates a real, ticketed booking — `selectedOfferId` alone is sufficient.
Separately, omitting `selectedOfferId` produces an unhandled-exception-shaped generic HTTP 500
`ServerError` rather than a controlled 400 `ValidationError`. This is the **3rd consecutive round**
both sub-defects have reproduced identically.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` for a fresh GulfAir/KSA offer; record a valid seat selection.
2. Run 1: `Book` with `ResponseId` omitted (supplier/credentialsSelector/selectedOfferId all
   present).
3. Run 2: `Book` with `selectedOfferId` omitted (supplier/credentialsSelector/ResponseId all
   present).

## ❌ Actual Result

Run 1 (ResponseId omitted):

```json
{ "status": 200, "pnr": "RPDKFX", "tickets": "<issued>" }
```

Run 2 (selectedOfferId omitted):

```json
{ "Status": 500, "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference." }
```

## ✅ Expected Result

Both runs:

```json
{ "status": 400, "errorCode": "1001", "context": [{ "name": "<FieldName>", "value": "Select a valid <FieldName>" }] }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `2c6bcc50-7dd5-474f-bac9-03d1038810ed` (selectedOfferId-omitted 500)

## 📊 Severity

**High** — a request missing a documented-required field creates a **real, ticketed booking**
(pnr `RPDKFX`, BAH-DMM 2026-10-25) rather than being rejected; this is a data-integrity/billing-risk
class defect, not merely a validation-hygiene one. The generic 500 on the other omission is a
secondary, lower-severity code-quality issue (an unhandled null-reference-shaped exception path).

## 📎 Evidence

**Actual response (redacted), ResponseId omitted:**

```json
{ "status": 200, "pnr": "RPDKFX" }
```

**Actual response (redacted), selectedOfferId omitted:**

```json
{ "Status": 500, "ErrorCode": "ServerError", "TransactionId": "2c6bcc50-7dd5-474f-bac9-03d1038810ed" }
```

**Expected response (redacted):** `{ "status": 400, "errorCode": "1001" }` for both.

## 💥 Impact

Confirmed unchanged across Round 1 (pnr PABPSZ), Round 2 (pnr PAWHEK), and Round 3 (pnr RPDKFX) — a
real ticketed booking is created every single round by simply omitting a documented-required field.
This is the highest-value fix candidate among the still-open defects: it is 100% deterministic,
reproduces on demand, and creates real financial/booking-state side effects on every regression pass.
