# [V1 and V2][TravelportNdc][Void] – error envelope (ErrorCode, ErrorMessage, casing) Error Envelope Inconsistent: Two Casings and an Unmapped Z9999 Code Used for Several Conditions

## 📄 Description

Void errors come in two envelopes: PascalCase `{Status, ErrorCode: NDC-INT-TEC-A0001}` and camelCase `{status, errorCode: "1001"}`; `NDC-INT-UNC-Z9999` is used for unknown PNR, Void on a held booking and other conditions. 18 of 58 sampled failures use the camelCase envelope.

Recurrence of BUG-11 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01). Occurrence 3.

Found by: TC-VOIDTPN-NEG-05, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Send the Void validation variants (pnr omitted, supplier omitted, voidTickets null, Void on a hold).
2. Compare the error bodies.

## ❌ Actual Result

```json
ErrorCode / status counts: NDC-INT-TEC-A0001 400: 18; 1001 400 (camelCase): 18; AuthenticationError 401: 6; NDC-INT-UNC-Z9999 409: 8; NDC-INT-BYP-A0003 409: 8
```

Mapping table (ErrorCode status: count): NDC-INT-TEC-A0001 400: 18; 1001 400: 18; AuthenticationError 401: 6; NDC-INT-UNC-Z9999 409: 8 (incl. Void on a held booking and unknown PNR); NDC-INT-BYP-A0003 409: 8; 18 of 58 failures use the camelCase envelope

## ✅ Expected Result

```json
One envelope {Status, TransactionId, ErrorCode, ErrorMessage, Context} and one code per condition
```

TC-VOIDTPN-NEG-05; SPEC.md 2.9.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Consumers need two parsers and cannot map Z9999 to a cause.

## 📎 Evidence

**Actual response (redacted):**

```json
ErrorCode / status counts: NDC-INT-TEC-A0001 400: 18; 1001 400 (camelCase): 18; AuthenticationError 401: 6; NDC-INT-UNC-Z9999 409: 8; NDC-INT-BYP-A0003 409: 8
```

**Expected response (redacted):**

```json
One envelope {Status, TransactionId, ErrorCode, ErrorMessage, Context} and one code per condition
```

## 💥 Impact

Error handling code must support both envelopes and guess causes from message text. Consumers need two parsers and cannot map Z9999 to a cause
