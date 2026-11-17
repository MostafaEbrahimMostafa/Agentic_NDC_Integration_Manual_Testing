# [V1 and V2][TravelportNdc][Void] – Context[].Value / OriginalSupplierRequest / OriginalSupplierResponse Error Responses Leak Raw Travelport Payloads and Internal .NET Type Names

## 📄 Description

Void failure bodies include `OriginalSupplierRequest` / `OriginalSupplierResponse` with the raw supplier payload and, for wrong-typed input, .NET type names. 7 of 29 sampled failures per version leak.

Recurrence of BUG-05 (First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); reproduced Round 2 (2026-10-27, stg-ne-5, 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2); reproduced again 2026-11-01). Occurrence 3.

Found by: TC-VOIDTPN-VAL-07, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Book 1 ADT and Void it.
2. POST Void a second time on the same booking (or on a cancelled hold).
3. Inspect the 409 body.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "e2a82592-fd85-4de9-b858-d4106ed3e6f5",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "RECORD LOCATOR DOES NOT EXIST"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

7 of 29 sampled failures per version leak (SEC03a-sabre, SEC03b-EGY, second Void, Void on a cancelled hold and others); 9 of 29 use the camelCase envelope

## ✅ Expected Result

```json
{
  "Status": 409,
  "TransactionId": "<guid>",
  "ErrorCode": "<mapped code>",
  "ErrorMessage": "<integration text>",
  "Context": [ { "Name": "<name>", "Value": "<integration text>" } ]
}
```

SPEC.md 2.9 Expected Failure (DTO leak) and 7.14; TC-VOIDTPN-VAL-07.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Information disclosure of supplier and internal structure; no functional failure.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "e2a82592-fd85-4de9-b858-d4106ed3e6f5",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "RECORD LOCATOR DOES NOT EXIST"
    }
  ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "<guid>",
  "ErrorCode": "<mapped code>",
  "ErrorMessage": "<integration text>",
  "Context": [ { "Name": "<name>", "Value": "<integration text>" } ]
}
```

## 💥 Impact

Every API consumer receives supplier request/response structure and internal type names. Leaks supplier request/response structure and internal type names to every API consumer
