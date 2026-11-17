# [V1 and V2][AirIndia][Search] – offers Returned Empty for Every Route and Date in Search Response

## 📄 Description

AirIndia with credentialsSelector EGY returns `"offers": []` for every Search. 1,618 one-way searches over 1,049 route/direction combinations (India domestic, Gulf, Egypt, Europe, North America, Asia, Africa) and 12 departure dates between 2026-11-12 and 2027-09-30, on V1 and V2, produced zero offers. EGY is the only active selector (UAE and KSA return 400 "credentials do not exist or are not active").

## 🔁 Steps to Reproduce

1. Send `POST api/V2/FlightSearch/Search` (or `api/FlightSearch/Search`) with `supplier: "AirIndia"`, `credentialsSelector: "EGY"`, one ADT, `searchCriteria: [{"origin":"DEL","destination":"BOM","date":"2026-11-25"}]`.
2. Repeat for any other route or date (for example BOM-DEL, DEL-DXB, DEL-LHR, CAI-DEL).

## ❌ Actual Result

```json
{
  "responseId": "f560a04e-0ea5-4949-87e1-9a15c627a72c",
  "supplier": "AirIndia",
  "journeys": {},
  "flightSegments": {},
  "priceClasses": {},
  "baggageDetails": {},
  "offers": []
}
```

The whole AirIndia suite (Book/Retrieve, Bundles, Ancillary, SeatMap, passenger-limit and price checks) is blocked: 372 of 484 test cases in this run could not be executed.

## ✅ Expected Result

```json
{
  "offers": [
    {
      "offerId": "<id>",
      "priceDetails": {
        "totalAmount": {
          "amount": "<n>",
          "currency": "INR"
        }
      },
      "canBeHeld": false,
      "haveBundles": true
    }
  ]
}
```

Per SPEC.md section 2.1 a valid Search on a supported route/date returns a non-empty offers[] with offerId and priceDetails; section 4.7 depends on it to confirm capabilities.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (responseId f560a04e-0ea5-4949-87e1-9a15c627a72c, V2 DEL-BOM 2026-11-25)

## 📊 Severity

**Critical** — No AirIndia flow can run at all: Search never returns an offer, so Book, Retrieve, Bundles, Ancillary and SeatMap are unreachable and the supplier cannot be tested or sold on ne-3.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "responseId": "f560a04e-0ea5-4949-87e1-9a15c627a72c",
  "supplier": "AirIndia",
  "journeys": {},
  "flightSegments": {},
  "priceClasses": {},
  "baggageDetails": {},
  "offers": []
}
```

**Expected response (redacted):**

```json
{
  "offers": [
    {
      "offerId": "<id>",
      "priceDetails": {
        "totalAmount": {
          "amount": "<n>",
          "currency": "INR"
        }
      },
      "canBeHeld": false,
      "haveBundles": true
    }
  ]
}
```

Test cases in this run: TC-AIEGY-CAP-01, TC-AIEGY-CAP-02, TC-SEARCH-POS-01 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

The whole AirIndia suite (Book/Retrieve, Bundles, Ancillary, SeatMap, passenger-limit and price checks) is blocked: 372 of 484 test cases in this run could not be executed. See BUG-02 for the likely cause (the supplier login leg never answers).
