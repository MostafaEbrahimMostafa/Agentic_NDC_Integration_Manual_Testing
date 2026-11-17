# [V1/V2][SabreNdc][Retrieve] – bookingStatus Returned Incorrect Value (OnHold) After CancelAfterHold in Retrieve Response

## 📄 Description

After CancelAfterHold returns `cancelled: true`, Retrieve of the booking still returns HTTP 200 (V2 `bookingStatus: "OnHold"`, `voidCapability: "None"`).

**Round 2 (2026-11-05):** Recurrence of BUG-11, 2nd confirmed occurrence (first filed in Round 1, 2026-11-04). After CancelAfterHold returned cancelled=true, Retrieve returned HTTP 200 on 4 of 4 holds; V2 still reports bookingStatus "OnHold" on 2; voidCapability "None".

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. POST CancelAfterHold.
3. POST Retrieve with the same ids.

## ❌ Actual Result

```json
CancelAfterHold: HTTP 200 { "cancelled": true }
Retrieve: HTTP 200 { "bookingStatus": "OnHold", "voidCapability": "None", ... }
```

Recurrence of the 2026-10-22 behaviour; clients cannot see that the hold is gone.

## ✅ Expected Result

```json
A terminal error, or a cancelled status with "voidCapability": "VoidNotAllowed"
```

SPEC.md 2.14 and 6.3 Family F: a cancelled hold is terminal.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — A cancelled hold looks live to the client, which can lead to wrong follow-up actions.

## 📎 Evidence

**Actual response (redacted):**

```json
CancelAfterHold: HTTP 200 { "cancelled": true }
Retrieve: HTTP 200 { "bookingStatus": "OnHold", "voidCapability": "None", ... }
```

**Expected response (redacted):**

```json
A terminal error, or a cancelled status with "voidCapability": "VoidNotAllowed"
```

Test cases: TC-VOIDCAP-INT-02 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_FareConfirm_request.json` / `01_V1_FareConfirm_response.json` — V1 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `02_V1_Hold_request.json` / `02_V1_Hold_response.json` — V1 Hold, `api/FlightBooking/Hold`, HTTP 200
- `03_V1_CancelAfterHold_request.json` / `03_V1_CancelAfterHold_response.json` — V1 CancelAfterHold, `api/FlightBooking/CancelAfterHold`, HTTP 200
- `04_V1_Retrieve-after-cancel_request.json` / `04_V1_Retrieve-after-cancel_response.json` — V1 Retrieve-after-cancel, `api/FlightBooking/RetrieveBooking`, HTTP 200
- `05_V2_FareConfirm_request.json` / `05_V2_FareConfirm_response.json` — V2 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `06_V2_AddPassenger_request.json` / `06_V2_AddPassenger_response.json` — V2 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `07_V2_Hold_request.json` / `07_V2_Hold_response.json` — V2 Hold, `api/v2/FlightBooking/Hold`, HTTP 200
- `08_V2_CancelAfterHold_request.json` / `08_V2_CancelAfterHold_response.json` — V2 CancelAfterHold, `api/V2/FlightBooking/CancelAfterHold`, HTTP 200
- `09_V2_Retrieve-after-cancel_request.json` / `09_V2_Retrieve-after-cancel_response.json` — V2 Retrieve-after-cancel, `api/v2/FlightBooking/Retrieve`, HTTP 200

## 💥 Impact

Recurrence of the 2026-10-22 behaviour; clients cannot see that the hold is gone.
