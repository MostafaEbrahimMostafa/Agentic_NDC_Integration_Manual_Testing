# [V1 and V2][TravelportNdc][Search] – offers (supplier TravelportNdc, preferredAirlines SV) Returns No Saudia (SV) Offers on Any Route

## 📄 Description

Search for Saudia (SV) returns 200 with an empty offers[] on 30 routes (JED, RUH, DMM, MED, AHB hubs and regional/international routes), on V1 and V2 and four dates. SV never appears as a marketing carrier in the 318-search route sweep. QR, EK and RJ return offers.

Found by: TC-TPNREG-RTE-SRCH-SV-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. POST V2 Search JED-RUH 2026-11-12, 1 ADT, preferredAirlines ["SV"].
2. Repeat on other SV routes and without the filter.

## ❌ Actual Result

```json
{
  "responseId": "<guid>",
  "supplier": "TravelportNdc",
  "offers": []
}
```

60 empty route/version results; CAP-02 SV 0 of 4 routes; SV never appears as a marketing carrier in any of the 318 sweep searches. Confirm whether SV is expected on TravelportNdc/UAE (credentials or distribution setup)

## ✅ Expected Result

```json
Offers marketed by SV on its routes (as for QR, EK and RJ)
```

TC-TPNREG-RTE-SRCH-SV-01 and CAP-02. Confirm with the team whether SV is expected on TravelportNdc/UAE.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Search`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — One of the four airlines named for this regression cannot be searched or booked; may be a configuration gap.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "responseId": "<guid>",
  "supplier": "TravelportNdc",
  "offers": []
}
```

**Expected response (redacted):**

```json
Offers marketed by SV on its routes (as for QR, EK and RJ)
```

## 💥 Impact

No SV route, passenger or booking coverage is possible for TravelportNdc on this environment. One of the four airlines named for this regression cannot be searched or booked, so no SV flow can run
