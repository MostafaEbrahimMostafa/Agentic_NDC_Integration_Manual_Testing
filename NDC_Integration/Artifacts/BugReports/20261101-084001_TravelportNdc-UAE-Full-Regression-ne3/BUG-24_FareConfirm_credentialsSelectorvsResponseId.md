# [V2][TravelportNdc][FareConfirm] – credentialsSelector vs ResponseId Accepts a ResponseId Created Under a Different credentialsSelector

## 📄 Description

A ResponseId from a Search under credentialsSelector UAE is accepted by V2 FareConfirm called with credentialsSelector EGY (200). supplier=SabreNdc and credentialsSelector=KSA are rejected.

Found by: FLOW-V2-25-NEG, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V2 Search TravelportNdc / UAE (QR CAI-JED).
2. POST api/v2/FlightSearch/FareConfirm with credentialsSelector EGY and the ResponseId and selectedOfferId from step 1.

## ❌ Actual Result

```json
{
  "responseId": "712437f8-309a-465b-9532-e526527e2d61",
  "supplier": "TravelportNdc",
  "journeys": {
    "f1?f2": {
      "origin": "CAI",
      "destination": "JED",
      "numberOfStops": 1,
      "segmentRefIds": [
        "f1",
        "f2"
      ]
    }
  },
  "flightSegments": {
    "f1": {
      "origin": "CAI",
      "destination": "DOH",
      "departureDateTime": "2026-11-12T02:15:00",
      "arrivalDateTime": "2026-11-12T06:20:00",
      "departureTerminal": "2",
      "arrivalTerminal": null,
      "flightTime": 185,
      "operatingCarrierCode": "QR",
      "operatingFlightNum
... (truncated)
```

V2 FareConfirm with credentialsSelector=EGY: 200 selectedOffer; SabreNdc and KSA variants rejected with 4xx

## ✅ Expected Result

```json
4xx: the ResponseId does not belong to the credentialsSelector of the call
```

SPEC.md 1.7 / 2.2 and FLOW-V2-25-NEG.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `FareConfirm`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — Credential context is not enforced across the chain.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "responseId": "712437f8-309a-465b-9532-e526527e2d61",
  "supplier": "TravelportNdc",
  "journeys": {
    "f1?f2": {
      "origin": "CAI",
      "destination": "JED",
      "numberOfStops": 1,
      "segmentRefIds": [
        "f1",
        "f2"
      ]
    }
  },
  "flightSegments": {
    "f1": {
      "origin": "CAI",
      "destination": "DOH",
      "departureDateTime": "2026-11-12T02:15:00",
      "arrivalDateTime": "2026-11-12T06:20:00",
      "departureTerminal": "2",
      "arrivalTerminal": null,
      "flightTime": 185,
      "operatingCarrierCode": "QR",
      "operatingFlightNum
... (truncated)
```

**Expected response (redacted):**

```json
4xx: the ResponseId does not belong to the credentialsSelector of the call
```

## 💥 Impact

An offer found under one tenant can be confirmed and booked under another. Credential context is not enforced across the chain: an offer found under one tenant can be confirmed (and then booked) under another
