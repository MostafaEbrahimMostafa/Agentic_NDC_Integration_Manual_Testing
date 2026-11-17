# [V1/V2][SabreNdc][Void] – OriginalSupplierRequest / OriginalSupplierResponse Exposed in Void Error Response

## 📄 Description

Void on an unknown order returns 409 NDC-INT-UNC-Z9999 whose body includes `OriginalSupplierRequest` and `OriginalSupplierResponse` with the raw supplier payloads.

**Round 2 (2026-11-05):** Recurrence of BUG-09, 2nd confirmed occurrence (first filed in Round 1, 2026-11-04). The raw supplier request and response again appear in error bodies: Void on an unknown order (409) and FareConfirm 409 "Too Many Requests Processing" under parallel load.

## 🔁 Steps to Reproduce

1. POST api/FlightBooking/Void (V1) or api/V2/FlightBooking/Void (V2) with SabreNdc/EGY, pnr "UNKNWN", gdsPNR "UNKNWN", bookingToken "unknown", surName "Ibrahim", voidTickets [].

## ❌ Actual Result

```json
HTTP 409 { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999", "Context": [ ... ], "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]", "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]" }
```

Supplier internals and identifiers are exposed to every client; the same leak was found in earlier SabreNdc and TravelportNdc runs.

## ✅ Expected Result

```json
{ "Status": 400/409, "TransactionId": "...", "ErrorCode": "...", "ErrorMessage": "...", "Context": [ ... ] }  // standard envelope only
```

SPEC.md 7.14: errors must not expose supplier request/response payloads.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — Raw supplier payloads are returned to API clients.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 409 { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999", "Context": [ ... ], "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]", "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]" }
```

**Expected response (redacted):**

```json
{ "Status": 400/409, "TransactionId": "...", "ErrorCode": "...", "ErrorMessage": "...", "Context": [ ... ] }  // standard envelope only
```

Test cases: TC-VOIDCAP-SEC-06 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_Void_unknown_order_request.json` / `01_V1_Void_unknown_order_response.json` — V1 Void unknown order, `api/FlightBooking/Void`, HTTP 409
- `02_V2_Void_unknown_order_request.json` / `02_V2_Void_unknown_order_response.json` — V2 Void unknown order, `api/V2/FlightBooking/Void`, HTTP 409
- `03_FareConfirm_409_Too_Many_Requests_book_v2_CAI-JED_17_FareConfirm_request.json` / `03_FareConfirm_409_Too_Many_Requests_book_v2_CAI-JED_17_FareConfirm_response.json` — FareConfirm 409 Too Many Requests (book_v2_CAI-JED_17_FareConfirm), `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `04_FareConfirm_409_Too_Many_Requests_hold_v2_CAI-JED_13_FareConfirm_request.json` / `04_FareConfirm_409_Too_Many_Requests_hold_v2_CAI-JED_13_FareConfirm_response.json` — FareConfirm 409 Too Many Requests (hold_v2_CAI-JED_13_FareConfirm), `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `05_V1_CAI-JED_10_Void_request.json` / `05_V1_CAI-JED_10_Void_response.json` — V1 CAI-JED #10 Void, `api/FlightBooking/Void`, HTTP 409

## 💥 Impact

Supplier internals and identifiers are exposed to every client; the same leak was found in earlier SabreNdc and TravelportNdc runs.
