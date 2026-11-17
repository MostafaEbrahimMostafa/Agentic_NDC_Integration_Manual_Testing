# [V1][TravelportNdc][Upselling] – selectedOffer Missing from Upselling Response (Not a Drop-In for FareConfirm)

## 📄 Description

The V1 Upselling response for TravelportNdc contains `upsellOffers[]` but no `selectedOffer`, so it cannot serve as the documented drop-in replacement for FareConfirm: the client has to pick a tier by hand and take its `offerId` from the array. Seen in FLOW-V1-09-TPN and FLOW-V1-11-TPN.

Recurrence: TravelportNdc V1 2026-08-05 (BUG-08 of that run), SabreNdc V1 Round 2 2026-10-25 (BUG-16) and TravelportNdc 2026-10-26 (logged as a reconfirmation there).

Found by: FLOW-V1-09-TPN, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. V1 Search CAI-JED 2026-11-12, 1 ADT, TravelportNdc/UAE; pick a fully itemized offer.
2. POST `api/FlightSearch/UpSelling` (the saved request's requestUrl resolved against the base URL) with searchResponseId and selectedOfferId.
3. Inspect the response keys.

## ❌ Actual Result

```json
{
  "keys": [
    "responseId",
    "supplier",
    "journeys",
    "flightSegments",
    "priceClasses",
    "baggageDetails",
    "upsellOffers"
  ],
  "upsellOfferCount": 1,
  "selectedOffer": "absent"
}
```

HTTP 200 in 1.2s.

## ✅ Expected Result

```json
{
  "responseId": "<GUID>",
  "upsellOffers": [
    "..."
  ],
  "selectedOffer": {
    "offerId": "<GUID>",
    "priceDetails": "{...}"
  }
}
```

SPEC.md 2.3 and the ID-chaining table: V1 Upselling returns the same variable names as FareConfirm (fareConfirmResponseId, selectedOfferId) so it can feed Book/Hold directly.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Upselling`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response (successful responses carry no TransactionId)`

## 📊 Severity

**High** — The flow still completes by hand-picking a tier, but a client following the documented chain cannot proceed automatically.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "keys": [
    "responseId",
    "supplier",
    "journeys",
    "flightSegments",
    "priceClasses",
    "baggageDetails",
    "upsellOffers"
  ]
}
```

**Expected response (redacted):**

```json
{
  "selectedOffer": "{...}"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (FLOW-V1-09-TPN).

## 💥 Impact

V1 clients that use the documented chain cannot book an upsold tier without custom logic; the same gap exists on SabreNdc.
