# [V1/V2][AirIndia][Book] – ResponseId Not Validated in Book (and FareConfirm, GetOfferBundles, GetAncillary, GetSeatMap)

## 📄 Description

The response id is never validated: Book creates a PNR when ResponseId (V2) or fareConfirmResponseId (V1) is omitted, and creates a PNR when the ResponseId and selectedOfferId come from two different chains. FareConfirm, GetOfferBundles, GetAncillary and GetSeatMap also answer 200 with the id omitted, mismatched or sent under the wrong field name (V1 FareConfirm accepts ResponseId in place of searchResponseId). Only selectedOfferId is used

## 🔁 Steps to Reproduce

1. Run Search twice (A and B), then FareConfirm and AddPassenger on each to get two AddPassenger id pairs.
2. POST api/v2/FlightBooking/Book with ResponseId from chain A and selectedOfferId from chain B, or with ResponseId omitted (V1: fareConfirmResponseId omitted).

## ❌ Actual Result

```json
{ "ResponseId": "<chain A>", "selectedOfferId": "<chain B>" }  ->  HTTP 200 { "pnr": "KU8N3V", ... }   (ResponseId omitted: HTTP 200 PNR K8NUXK; V1 without fareConfirmResponseId: PNR WUNKJY)
```

The id chain documented in SPEC 3.2 is not enforced: a booking can be created from ids that never belonged together, and integration mistakes go undetected until money is spent

## ✅ Expected Result

```json
HTTP 400 NDC-INT-TEC-A0001 "The selected offer is invalid, expired, or could not be found."
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: 400 NDC-INT-TEC-A0001 "selected offer is invalid" whenever the response id is missing or does not belong to the offer

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The documented id chain is not enforced, so a booking can be created from ids that never belonged together; the corrupted state is a real PNR.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "ResponseId": "<chain A>", "selectedOfferId": "<chain B>" }  ->  HTTP 200 { "pnr": "KU8N3V", ... }   (ResponseId omitted: HTTP 200 PNR K8NUXK; V1 without fareConfirmResponseId: PNR WUNKJY)
```

**Expected response (redacted):**

```json
HTTP 400 NDC-INT-TEC-A0001 "The selected offer is invalid, expired, or could not be found."
```

Test cases: TC-AIEGY-BOOK-NEG-02, TC-BOOK-NEG-05, TC-FARECONFIRM-NEG-01, TC-FARECONFIRM-VAL-01, TC-AIEGY-CHAIN-02, TC-AIEGY-GETSEATMAP-NEG-02 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-BOOK-NEG-02 (V1 PNR WUNKJY and V2 PNR K8NUXK created without a response id), TC-BOOK-NEG-05 (V2 PNR KU8N3V from mixed ids), TC-FARECONFIRM-NEG-01, TC-FARECONFIRM-VAL-01, TC-AIEGY-CHAIN-02, TC-AIEGY-FARECONFIRM-NEG-02, TC-AIEGY-GETOFFERBUNDLES-NEG-02, TC-AIEGY-GETANCILLARY-NEG-02, TC-AIEGY-GETSEATMAP-NEG-02, TC-SEATMAP-NEG-04

## 💥 Impact

The id chain documented in SPEC 3.2 is not enforced: a booking can be created from ids that never belonged together, and integration mistakes go undetected until money is spent
