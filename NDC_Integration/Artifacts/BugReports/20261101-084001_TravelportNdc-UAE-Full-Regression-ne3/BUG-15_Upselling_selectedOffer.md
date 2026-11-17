# [V1][TravelportNdc][Upselling] – selectedOffer Missing from Upselling Response (Not a Drop-In for FareConfirm)

## 📄 Description

V1 Upselling returns `upsellOffers[]` and no `selectedOffer`, so it cannot replace FareConfirm as documented. FLOW-V1-07 to 12 and the Void-suite V1 upsell flows fail on this check.

Recurrence of BUG-15 (First recorded in other series; confirmed Round 2 (FLOW-V1-09-TPN); reproduced 2026-11-01 in every V1 Upselling flow). Occurrence 2.

Found by: FLOW-V1-07, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V1 Search (QR CAI-JED, 2 ADT + 2 CHD + 2 INF).
2. POST api/FlightSearch/UpSelling with searchResponseId and selectedOfferId.

## ❌ Actual Result

```json
{
  "responseId": "<guid>", "supplier": "TravelportNdc", "journeys": {...}, "flightSegments": {...},
  "priceClasses": {...}, "baggageDetails": {...}, "upsellOffers": [ ... ]
  // no "selectedOffer"
}
```

FLOW-V1-07 to FLOW-V1-12, FLOW-V1-09-TPN, FLOW-V1-11-TPN: response keys responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails, upsellOffers

## ✅ Expected Result

```json
{
  "responseId": "<guid>",
  "selectedOffer": { "offerId": "<tier offerId>", "priceDetails": {...} },
  "upsellOffers": [ ... ]
}
```

SPEC.md 2.3: Upselling is a drop-in alternative to FareConfirm.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Upselling`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — Every V1 Upselling flow needs a manual tier choice because the documented hand-off field is absent.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "responseId": "<guid>", "supplier": "TravelportNdc", "journeys": {...}, "flightSegments": {...},
  "priceClasses": {...}, "baggageDetails": {...}, "upsellOffers": [ ... ]
  // no "selectedOffer"
}
```

**Expected response (redacted):**

```json
{
  "responseId": "<guid>",
  "selectedOffer": { "offerId": "<tier offerId>", "priceDetails": {...} },
  "upsellOffers": [ ... ]
}
```

## 💥 Impact

Callers must select a tier themselves and cannot reuse FareConfirm handling. The caller must pick a tier by hand; V1 flows 7-12 fail on this check
