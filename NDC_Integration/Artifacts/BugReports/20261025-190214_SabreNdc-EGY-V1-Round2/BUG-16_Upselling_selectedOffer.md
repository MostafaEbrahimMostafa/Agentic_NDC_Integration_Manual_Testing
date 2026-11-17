# [V1][SabreNdc][Upselling] – selectedOffer Missing from Upselling Response, Breaking Documented Chaining Contract

## 📄 Description

SPEC.md §2.3 and the ID-chaining cheatsheet document V1 `Upselling` as a drop-in replacement for `FareConfirm`: capture its output with the same variable names (`selectedOffer.offerId` -> `selectedOfferId`, `responseId` -> `fareConfirmResponseId`). In practice SabreNdc/EGY's V1 `Upselling` returns no `selectedOffer` at all; it returns an `upsellOffers[]` ladder of priced tiers with no documented rule for which tier to pick. The same defect was reported for TravelportNdc/UAE on 2026-08-05 (BUG-08 of that run).

Found by: FLOW-V1-07 (and FLOW-V1-08..12; every V1 Upselling call), QA run `20261025-190214_SabreNdc-EGY-V1-Round2` (2026-10-25, Round 2).

## 🔁 Steps to Reproduce

1. V1 Search (SabreNdc/EGY, CAI-JED 2026-11-24, 2 ADT + 2 CHD + 2 INF).
2. POST `api/FlightSearch/UpSelling` with Search's `searchResponseId` and `selectedOfferId` (offers[0]) — with `requestUrl` set to `baseUrl` (see BUG-17) so the request can be sent.
3. Look for `selectedOffer` in the response (failing check).

## ❌ Actual Result

```json
{
  "responseId": "00de4dab-ef35-4b99-850d-80d00f87e1cf",
  "supplier": "SabreNdc",
  "upsellOffers": [
    {
      "offerId": "ce79b9bcf4fd29n7fmvo7e75h7&l...",
      "priceDetails": {
        "totalAmount": {
          "amount": 61338.8,
          "currency": "EGP"
        }
      }
    },
    {
      "offerId": "ce79b9bcf4fd29n7fmvo7e75h8&l...",
      "priceDetails": {
        "totalAmount": {
          "amount": 70636.8,
          "currency": "EGP"
        }
      }
    },
    {
      "offerId": "ce79b9bcf4fdjvctjmvo7ghms1&l...",
      "priceDetails": {
        "totalAmount": {
          "amount": 150784.8,
          "currency": "EGP"
        }
      }
    }
  ]
}
```

Response keys: responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails, upsellOffers. No `selectedOffer` property exists. `upsellOffers[0]` carries the same fare as the searched offer, so this run used it to continue each Upselling flow.

## ✅ Expected Result

```json
{
  "responseId": "...",
  "selectedOffer": {
    "offerId": "...",
    "priceDetails": {
      "totalAmount": {
        "amount": 61338.8,
        "currency": "EGP"
      }
    }
  }
}
```

SPEC.md §2.3 / §3.3: Upselling output is captured in place of FareConfirm's (`selectedOffer.offerId` -> `selectedOfferId`).

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Upselling`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**High** — a core documented chaining contract is wrong, breaking every Upselling-based V1 flow (7-12 and 19-24) at the hop right after Upselling for any client that follows SPEC.md, unless it discovers `upsellOffers[]` and chooses a tier itself.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "responseId": "00de4dab-ef35-4b99-850d-80d00f87e1cf",
  "supplier": "SabreNdc",
  "upsellOffers": [
    {
      "offerId": "ce79b9bcf4fd29n7fmvo7e75h7&l...",
      "priceDetails": {
        "totalAmount": {
          "amount": 61338.8,
          "currency": "EGP"
        }
      }
    },
    {
      "offerId": "ce79b9bcf4fd29n7fmvo7e75h8&l...",
      "priceDetails": {
        "totalAmount": {
          "amount": 70636.8,
          "currency": "EGP"
        }
      }
    },
    {
      "offerId": "ce79b9bcf4fdjvctjmvo7ghms1&l...",
      "priceDetails": {
        "totalAmount": {
          "amount": 150784.8,
          "currency": "EGP"
        }
      }
    }
  ]
}
```

**Expected response (redacted):**

```json
{
  "responseId": "...",
  "selectedOffer": {
    "offerId": "...",
    "priceDetails": {
      "totalAmount": {
        "amount": 61338.8,
        "currency": "EGP"
      }
    }
  }
}
```

## 💥 Impact

Upselling-based V1 flows need a manual workaround; there is no rule for which `upsellOffers[]` entry is the selected one, so an integrator can book a different fare than the one they upsold.
