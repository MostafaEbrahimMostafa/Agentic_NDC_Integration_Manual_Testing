# [V2][TravelportNdc][AddPassenger] – ResponseId / selectedOfferId Accepts the Pre-Upselling Search Ids Instead of the Upselling Ids

## 📄 Description

After an Upselling call, AddPassenger accepts the original Search ResponseId/selectedOfferId (200) as well as the Upselling ids.

Found by: FLOW-V2-75-NEG, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V2 Search, Upselling.
2. AddPassenger with the Search ResponseId and the Search offerId.

## ❌ Actual Result

```json
{
  "offerId": "2edfd5d1-485f-41c7-b96e-24f7dc1e6b5d&yAEiY9IAAAEd8amf2SQwY2M...[truncated]",
  "responseId": "1e427621-1881-4136-9436-2f54aa1ee2f0"
}
```

AddPassenger with the Search ResponseId/selectedOfferId after an Upselling call: 200 offerId returned; control with the Upselling ids also 200

## ✅ Expected Result

```json
4xx or an explicit indication that the Upselling tier was not applied
```

FLOW-V2-75-NEG; SPEC.md 2.3 (Upselling ids must be substituted).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `AddPassenger`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — The client silently books the original fare, not the chosen tier.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "offerId": "2edfd5d1-485f-41c7-b96e-24f7dc1e6b5d&yAEiY9IAAAEd8amf2SQwY2M...[truncated]",
  "responseId": "1e427621-1881-4136-9436-2f54aa1ee2f0"
}
```

**Expected response (redacted):**

```json
4xx or an explicit indication that the Upselling tier was not applied
```

## 💥 Impact

A missed substitution is not detected. A client that forgets the substitution silently books the original fare, not the chosen tier
