# [V1 and V2][TravelportNdc][Retrieve] – passengersList[].parentPaxRefId / nationality / residentCountry Returned as Null for an Infant

## 📄 Description

Retrieve returns `parentPaxRefId`, `nationality` and `residentCountry` as null for the infant, replaces contactRefId with `travelerRefId_N` and upper-cases names. Same on V1 and V2.

Found by: TC-BOOK-POS-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Search 1 ADT + 1 INF (QR CAI-JED), FareConfirm, (V2: AddPassenger), Book with INF ParentPaxRefId = Pax1.
2. Retrieve the booking and read the INF entry.

## ❌ Actual Result

```json
{
  "passengerTypeCode": "INF",
  "name": { "first": "LINA", "last": "IBRAHIM" },
  "contactRefId": "travelerRefId_2",
  "parentPaxRefId": null,
  "nationality": null,
  "residentCountry": null
}
```

ADT+INF QR CAI-JED: V1 and V2 Retrieve INF entry {"parentPaxRefId":null,"nationality":null,"residentCountry":null,"contactRefId":"travelerRefId_2","name":"LINA IBRAHIM"}

## ✅ Expected Result

```json
{
  "passengerTypeCode": "INF",
  "parentPaxRefId": "<ADT pax ref>",
  "nationality": "EG",
  "residentCountry": "EG"
}
```

TC-BOOK-POS-01 and SPEC.md 6.3 Family A: Retrieve echoes the submitted passenger data and the INF parent link.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Passenger data is lost after booking and the infant-to-adult link cannot be verified.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "passengerTypeCode": "INF",
  "name": { "first": "LINA", "last": "IBRAHIM" },
  "contactRefId": "travelerRefId_2",
  "parentPaxRefId": null,
  "nationality": null,
  "residentCountry": null
}
```

**Expected response (redacted):**

```json
{
  "passengerTypeCode": "INF",
  "parentPaxRefId": "<ADT pax ref>",
  "nationality": "EG",
  "residentCountry": "EG"
}
```

## 💥 Impact

Downstream systems lose infant linkage and nationality data. The infant-to-adult link cannot be verified after booking; downstream systems lose passenger data
