# [V1 and V2][TravelportNdc][Search] – Search (HTTP 500 ServerError) Intermittent HTTP 500 ServerError Under Parallel Load

## 📄 Description

Two Searches returned 500 `ServerError` during the parallel run: V1 AMM-RUH and V2 AMM-LHR (RJ filter). Sequential repeats of both routes on V1 and V2 returned 200.

Found by: TC-TPNREG-RTE-SRCH-RJ-02, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Run many Searches in parallel (AMM-RUH, AMM-LHR with preferredAirlines RJ).

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "a6d4c993-9f53-487e-9d1c-5012ad51fa13",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

2 of more than 1,000 Searches while three stages ran in parallel; 24 sequential repeats of the same two routes on V1 and V2 all returned 200 (AMM-RUH 4 offers, AMM-LHR 1 offer), so it is load-related and not reproduced in isolation

## ✅ Expected Result

```json
200 with offers on every request
```

TC-TPNREG-RTE-SRCH-RJ-02.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `a6d4c993-9f53-487e-9d1c-5012ad51fa13`

## 📊 Severity

**Low** — Not reproducible in isolation (24 of 24 repeats passed); likely load related.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "a6d4c993-9f53-487e-9d1c-5012ad51fa13",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

**Expected response (redacted):**

```json
200 with offers on every request
```

## 💥 Impact

Valid searches occasionally fail with no cause given. A valid Search fails with no cause; callers need retries
