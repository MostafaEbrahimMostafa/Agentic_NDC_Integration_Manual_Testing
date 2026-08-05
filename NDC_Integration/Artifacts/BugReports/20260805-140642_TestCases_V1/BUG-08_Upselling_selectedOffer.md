# [V1][TravelportNdc][Upselling] – selectedOffer Missing from Upselling Response, Breaking Documented Chaining Contract

## 📄 Description

SPEC.md §2.3 and the execution cheatsheet document `Upselling` as a drop-in replacement for
`FareConfirm`, instructing testers to capture its output using the same variable names as
FareConfirm (i.e. `selectedOffer.offerId` → `selectedOfferId`). In practice, `Upselling` returns
no `selectedOffer` property at all — instead it returns an `upsellOffers[]` ladder of multiple
priced tiers, with no documented rule for which tier to pick.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-15, 1 ADT + 1 CHD + 1 INF
2. Upselling (`POST api/FlightSearch/UpSelling`) — using Search's `searchResponseId`/`selectedOfferId` (failing call — response shape mismatch)

## ❌ Actual Result

```json
{
  "responseId": "...",
  "supplier": "TravelportNdc",
  "upsellOffers": [
    {"priceClassRefId": "b0", "offerId": "...", "priceDetails": {"totalAmount": 2270}},
    {"priceClassRefId": "b1", "offerId": "...", "priceDetails": {"totalAmount": 2570}},
    {"priceClassRefId": "b2", "offerId": "...", "priceDetails": {"totalAmount": 5270}}
  ]
}
```

No `selectedOffer` property exists anywhere in the response.

## ✅ Expected Result

```json
"selectedOffer": {"offerId": "...", "priceDetails": {"totalAmount": 2270}}
```

Per SPEC.md §2.3 and the ID-chaining cheatsheet, which document Upselling as returning
`selectedOffer` in the same shape as FareConfirm.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Upselling`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**High** — a core, documented chaining contract is wrong, breaking every Upselling-based flow
(Flows 7–12 and 19–24) at the hop immediately after Upselling for any harness that follows
SPEC.md's own instructions, unless the tester independently discovers `upsellOffers[]` and picks
a tier.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "upsellOffers": [
    {"priceClassRefId": "b0", "offerId": "...(1473 chars)", "priceDetails": {"totalAmount": 2270, "currency": "AED"}},
    {"priceClassRefId": "b1", "offerId": "...", "priceDetails": {"totalAmount": 2570, "currency": "AED"}},
    {"priceClassRefId": "b2", "offerId": "...", "priceDetails": {"totalAmount": 5270, "currency": "AED"}}
  ]
}
```

**Expected response (redacted):**

```json
{
  "selectedOffer": {"offerId": "...", "priceDetails": {"totalAmount": 2270, "currency": "AED"}}
}
```

## 💥 Impact

SPEC.md §2.3 and the execution cheatsheet both instruct testers to capture Upselling's output
using "the same variable names as FareConfirm (drop-in replacement)", i.e.
`selectedOffer.offerId` → `selectedOfferId`. That field does not exist, so every Upselling-based
flow (7–12 and 19–24) fails at the hop after Upselling unless the tester independently discovers
`upsellOffers[]` and picks a tier. It also means the choice of which tier to book is an
undocumented decision the caller must make on their own — the documented contract provides no
guidance.
