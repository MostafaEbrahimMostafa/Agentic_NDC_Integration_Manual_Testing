# [V1/V2][SabreNdc][PnrReprice] – voidCapability Returned as null in PnrReprice (FareConfirmAfterHold) Response

## 📄 Description

The PnrReprice response returns `voidCapability` as null on V1 and V2 (in Round 1, and on the earlier build of Round 2, the key was absent), while the Hold response for the same booking has a value ("None", see BUG-03).

**Round 2 (2026-11-05):** Recurrence of BUG-04, 10th confirmed occurrence (first filed in Round 1, 2026-11-04). Build B (final build): PnrReprice returns the voidCapability key with the value null on 331 of 332 held bookings (V1 and V2, QR), still not VoidNotAllowed; on the earlier build (Build A) the key was absent on 227 of 227.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. POST api/FlightBooking/PnrReprice (V1) or api/v2/FlightBooking/PnrReprice (V2) with the Hold ids.

## ❌ Actual Result

```json
{ "voidCapability": null, "supplier": "SabreNdc", "journeys": { ... }, "selectedOffer": { ... } }  // key present, value null
```

A client cannot tell "capability unknown" from "not allowed" after repricing a hold. Recurrence of the 2026-10-25 omission.

## ✅ Expected Result

```json
"voidCapability": "VoidNotAllowed"
```

AC Common Interface: the property is defined once for every endpoint that returns a booking (SPEC.md 2.12).

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `PnrReprice`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Non-blocking, but one of the five booking-returning endpoints has no value at all.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "voidCapability": null, "supplier": "SabreNdc", "journeys": { ... }, "selectedOffer": { ... } }  // key present, value null
```

**Expected response (redacted):**

```json
"voidCapability": "VoidNotAllowed"
```

Test cases: TC-VOIDCAP-VAL-03, TC-VOIDCAP-VAL-05, TC-VOIDCAP-BIZ-02, TC-VOIDCAP-VAL-12, TC-VOIDCAP-REG-09, FLOW-V1-05-VOIDCAP, FLOW-V2-29-VOIDCAP (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_FareConfirm_request.json` / `01_V1_FareConfirm_response.json` — V1 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `02_V1_Hold_request.json` / `02_V1_Hold_response.json` — V1 Hold, `api/FlightBooking/Hold`, HTTP 200
- `03_V1_PnrReprice_request.json` / `03_V1_PnrReprice_response.json` — V1 PnrReprice, `api/FlightBooking/PnrReprice`, HTTP 200
- `04_V2_FareConfirm_request.json` / `04_V2_FareConfirm_response.json` — V2 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `05_V2_AddPassenger_request.json` / `05_V2_AddPassenger_response.json` — V2 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `06_V2_Hold_request.json` / `06_V2_Hold_response.json` — V2 Hold, `api/v2/FlightBooking/Hold`, HTTP 200
- `07_V2_PnrReprice_request.json` / `07_V2_PnrReprice_response.json` — V2 PnrReprice, `api/v2/FlightBooking/PnrReprice`, HTTP 200

## 💥 Impact

A client cannot tell "capability unknown" from "not allowed" after repricing a hold. Recurrence of the 2026-10-25 omission.
