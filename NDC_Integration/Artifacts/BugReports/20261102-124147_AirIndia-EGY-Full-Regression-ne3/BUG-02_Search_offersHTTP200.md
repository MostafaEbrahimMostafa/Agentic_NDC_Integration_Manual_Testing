# [V1 and V2][AirIndia][Search] – Supplier Failure Returned as HTTP 200 with Empty offers after a Fixed 15 s Stall in Search Response

## 📄 Description

Every valid AirIndia Search waits a constant 15.1-16.0 s (mean 15.1 s over 1,618 calls) and then returns HTTP 200 with an empty offers[]. With `isdebug: true` the only supplier call visible is the supplier login request; there is no `supplierResponse` and no availability request, i.e. the supplier leg never completes, and the API swallows it. Invalid input on the same endpoint is rejected in about 0.1 s, so the delay is the supplier leg.

## 🔁 Steps to Reproduce

1. Send `POST api/V2/FlightSearch/Search` with `isdebug: true`, supplier AirIndia, credentialsSelector EGY, DEL-BOM 2026-11-25, 1 ADT.
2. Note the elapsed time (about 15 s) and that the response is HTTP 200 with `offers: []`, `supplierRequest` present (login only) and `supplierResponse` absent.

## ❌ Actual Result

```json
{
  "status": 200,
  "elapsed": "15.1 s",
  "offers": [],
  "supplierRequest": "<login request only>",
  "supplierResponse": null
}
```

Operations and integrators cannot tell supplier downtime or bad credentials from an empty market; the 15 s stall on every request also blocks calling threads..

## ✅ Expected Result

```json
{
  "Status": 502,
  "ErrorCode": "NDC-INT-SUP-xxxx",
  "ErrorMessage": "The supplier could not be reached or rejected the credentials."
}
```

SPEC.md section 7.9 expects a failed supplier call to surface as a structured error; an empty success hides it.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**High** — A supplier outage or credential rejection is indistinguishable from "no flights", so nothing alerts and callers treat it as sold out.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "status": 200,
  "elapsed": "15.1 s",
  "offers": [],
  "supplierRequest": "<login request only>",
  "supplierResponse": null
}
```

**Expected response (redacted):**

```json
{
  "Status": 502,
  "ErrorCode": "NDC-INT-SUP-xxxx",
  "ErrorMessage": "The supplier could not be reached or rejected the credentials."
}
```

Test cases in this run: TC-AIEGY-CAP-05, TC-AIEGY-CAP-04 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Operations and integrators cannot tell supplier downtime or bad credentials from an empty market; the 15 s stall on every request also blocks calling threads.
