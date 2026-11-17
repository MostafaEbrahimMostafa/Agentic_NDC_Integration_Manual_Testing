# [V1/V2][SabreNdc][Book] – Response Time Takes About 21.6 s, Above the 16-Second Baseline, in Book Response

## 📄 Description

Round 2 (sequential, no parallel load): median Book 21.6 s against the 16 s SabreNdc baseline. Void stayed at about 10 s.

**Round 2 (2026-11-05):** Recurrence of BUG-12, 2nd confirmed occurrence (first filed in Round 1, 2026-11-04). Sequential run with no parallel load (3 per version): Book median V1 21.6 s, V2 21.4 s; Void median 9.3 s.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> Book. Repeat 3 or more times and take the median Book duration.

## ❌ Actual Result

```json
Book: 22.1 s (V1), 22.3 s (V2) median
```

Supplier latency may account for it; no mapping-specific cause could be isolated.

## ✅ Expected Result

```json
Median within 20% of 16 s (at most 19.2 s)
```

No SLA is documented in SPEC.md 7.1; the 20% tolerance is the threshold set by the test case.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Low** — Functionally correct; only the latency is above the agreed 20% tolerance.

## 📎 Evidence

**Actual response (redacted):**

```json
Book: 22.1 s (V1), 22.3 s (V2) median
```

**Expected response (redacted):**

```json
Median within 20% of 16 s (at most 19.2 s)
```

Test cases: TC-VOIDCAP-REG-11 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3); first filed in run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_V1_run_1_FareConfirm_request.json` / `01_V1_run_1_FareConfirm_response.json` — V1 run 1 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `02_V1_run_1_Book_request.json` / `02_V1_run_1_Book_response.json` — V1 run 1 Book, `api/FlightBooking/Book`, HTTP 200
- `03_V1_run_1_Void_request.json` / `03_V1_run_1_Void_response.json` — V1 run 1 Void, `api/FlightBooking/Void`, HTTP 200
- `04_V1_run_2_FareConfirm_request.json` / `04_V1_run_2_FareConfirm_response.json` — V1 run 2 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `05_V1_run_2_Book_request.json` / `05_V1_run_2_Book_response.json` — V1 run 2 Book, `api/FlightBooking/Book`, HTTP 200
- `06_V1_run_2_Void_request.json` / `06_V1_run_2_Void_response.json` — V1 run 2 Void, `api/FlightBooking/Void`, HTTP 200
- `07_V1_run_3_FareConfirm_request.json` / `07_V1_run_3_FareConfirm_response.json` — V1 run 3 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `08_V1_run_3_Book_request.json` / `08_V1_run_3_Book_response.json` — V1 run 3 Book, `api/FlightBooking/Book`, HTTP 200
- `09_V1_run_3_Void_request.json` / `09_V1_run_3_Void_response.json` — V1 run 3 Void, `api/FlightBooking/Void`, HTTP 200
- `10_V2_run_1_FareConfirm_request.json` / `10_V2_run_1_FareConfirm_response.json` — V2 run 1 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `11_V2_run_1_AddPassenger_request.json` / `11_V2_run_1_AddPassenger_response.json` — V2 run 1 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `12_V2_run_1_Book_request.json` / `12_V2_run_1_Book_response.json` — V2 run 1 Book, `api/v2/FlightBooking/Book`, HTTP 200
- `13_V2_run_1_Void_request.json` / `13_V2_run_1_Void_response.json` — V2 run 1 Void, `api/V2/FlightBooking/Void`, HTTP 200
- `14_V2_run_2_FareConfirm_request.json` / `14_V2_run_2_FareConfirm_response.json` — V2 run 2 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `15_V2_run_2_AddPassenger_request.json` / `15_V2_run_2_AddPassenger_response.json` — V2 run 2 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `16_V2_run_2_Book_request.json` / `16_V2_run_2_Book_response.json` — V2 run 2 Book, `api/v2/FlightBooking/Book`, HTTP 200
- `17_V2_run_2_Void_request.json` / `17_V2_run_2_Void_response.json` — V2 run 2 Void, `api/V2/FlightBooking/Void`, HTTP 200
- `18_V2_run_3_FareConfirm_request.json` / `18_V2_run_3_FareConfirm_response.json` — V2 run 3 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `19_V2_run_3_AddPassenger_request.json` / `19_V2_run_3_AddPassenger_response.json` — V2 run 3 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `20_V2_run_3_Book_request.json` / `20_V2_run_3_Book_response.json` — V2 run 3 Book, `api/v2/FlightBooking/Book`, HTTP 200
- `21_V2_run_3_Void_request.json` / `21_V2_run_3_Void_response.json` — V2 run 3 Void, `api/V2/FlightBooking/Void`, HTTP 200

## 💥 Impact

Supplier latency may account for it; no mapping-specific cause could be isolated.
