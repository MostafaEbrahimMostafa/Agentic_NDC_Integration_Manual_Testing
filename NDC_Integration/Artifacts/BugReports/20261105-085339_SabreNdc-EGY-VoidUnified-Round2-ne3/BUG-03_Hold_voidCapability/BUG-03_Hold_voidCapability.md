# [V1/V2][SabreNdc][Hold] – voidCapability Returned as "None" Instead of VoidNotAllowed for Held and Cancelled Bookings

## 📄 Description

Hold, Retrieve of a held booking and Retrieve after CancelAfterHold return `voidCapability: "None"`. The unified contract has only two values; a booking that cannot be voided must report `VoidNotAllowed`.

**Round 2 (2026-11-05):** Recurrence of BUG-03, 13th confirmed occurrence (first filed in Round 1, 2026-11-04). Hold returned "None" on 332 of 332 held bookings; Retrieve of a held booking returned "None" on 332 of 332; Retrieve after CancelAfterHold returned "None" on 4 of 4. No endpoint ever returned VoidNotAllowed.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. Read voidCapability in the Hold response and in Retrieve.
3. POST CancelAfterHold, then Retrieve again.

## ❌ Actual Result

```json
// Hold, held Retrieve, cancelled Retrieve (V1 and V2)
"voidCapability": "None"
```

Clients cannot treat the field as a two-value enumeration; "None" also appears on ticketed Retrieve and BookAfterHold (BUG-01, BUG-02).

## ✅ Expected Result

```json
"voidCapability": "VoidNotAllowed"
```

AC Common Interface / Consistency: one literal per state; values outside {FullVoidOnlyAllowed, VoidNotAllowed} are mapping leaks (SPEC.md 8.3).

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — A third, undocumented literal leaks through the Common Interface and no endpoint ever reports VoidNotAllowed for a held booking.

## 📎 Evidence

**Actual response (redacted):**

```json
// Hold, held Retrieve, cancelled Retrieve (V1 and V2)
"voidCapability": "None"
```

**Expected response (redacted):**

```json
"voidCapability": "VoidNotAllowed"
```

Test cases: TC-VOIDCAP-VAL-03, TC-VOIDCAP-VAL-05, TC-VOIDCAP-POS-07, TC-VOIDCAP-BIZ-02, TC-VOIDCAP-VAL-10, TC-VOIDCAP-VAL-12, TC-VOIDCAP-INT-02, TC-VOIDCAP-REG-09, FLOW-V1-05-VOIDCAP, FLOW-V2-29-VOIDCAP (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_FareConfirm_request.json` / `01_V1_FareConfirm_response.json` — V1 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `02_V1_Hold_request.json` / `02_V1_Hold_response.json` — V1 Hold, `api/FlightBooking/Hold`, HTTP 200
- `03_V1_Void-on-held_request.json` / `03_V1_Void-on-held_response.json` — V1 Void-on-held, `api/FlightBooking/Void`, HTTP 400
- `04_V1_Retrieve-after-void-on-held_request.json` / `04_V1_Retrieve-after-void-on-held_response.json` — V1 Retrieve-after-void-on-held, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `05_V1_CancelAfterHold_request.json` / `05_V1_CancelAfterHold_response.json` — V1 CancelAfterHold, `api/FlightBooking/CancelAfterHold`, HTTP 200
- `06_V1_Retrieve-after-cancel_request.json` / `06_V1_Retrieve-after-cancel_response.json` — V1 Retrieve-after-cancel, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `07_V2_FareConfirm_request.json` / `07_V2_FareConfirm_response.json` — V2 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `08_V2_AddPassenger_request.json` / `08_V2_AddPassenger_response.json` — V2 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `09_V2_Hold_request.json` / `09_V2_Hold_response.json` — V2 Hold, `api/v2/FlightBooking/Hold`, HTTP 200
- `10_V2_Void-on-held_request.json` / `10_V2_Void-on-held_response.json` — V2 Void-on-held, `api/V2/FlightBooking/Void`, HTTP 400
- `11_V2_Retrieve-after-void-on-held_request.json` / `11_V2_Retrieve-after-void-on-held_response.json` — V2 Retrieve-after-void-on-held, `api/v2/FlightBooking/Retrieve`, HTTP 200
- `12_V2_CancelAfterHold_request.json` / `12_V2_CancelAfterHold_response.json` — V2 CancelAfterHold, `api/V2/FlightBooking/CancelAfterHold`, HTTP 200
- `13_V2_Retrieve-after-cancel_request.json` / `13_V2_Retrieve-after-cancel_response.json` — V2 Retrieve-after-cancel, `api/v2/FlightBooking/Retrieve`, HTTP 200

## 💥 Impact

Clients cannot treat the field as a two-value enumeration; "None" also appears on ticketed Retrieve and BookAfterHold (BUG-01, BUG-02).
