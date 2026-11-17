# [V1][SabreNdc][Upselling] – Upselling Request Uses the Undefined {{requestUrl}} Variable in the V1 Collection

## 📄 Description

The V1 Postman collection sends `Upselling` to `{{requestUrl}}api/FlightSearch/UpSelling`, but `requestUrl` is not defined in `STAG_ENV` and is an empty collection variable, so the resolved URL is `api/FlightSearch/UpSelling` with no scheme or host. Every other V1 request uses `{{baseUrl}}`. The request fails inside the HTTP client without any API response; no V1 Upselling test or flow can run until the variable is overridden locally. SPEC.md §1.4/§2.3 already records this as a known collection defect; it is still present.

Found by: FLOW-V1-08-NEG (also FLOW-V1-12-NEG, FLOW-V1-20-NEG, TC-UPSELL-NEG-01), QA run `20261025-190214_SabreNdc-EGY-V1-Round2` (2026-10-25, Round 2).

## 🔁 Steps to Reproduce

1. Import `Postman_Collection/Collection_V1` and `Postman_Collection/Environment/STAG_ENV.postman_environment.json` as shipped (no local override).
2. Run V1 > Upselling.
3. Observe the request URL and the error (compare with the same request after setting `requestUrl` = `baseUrl`, which returns 200).

## ❌ Actual Result

```json
// request URL as resolved
POST api/FlightSearch/UpSelling

// client error, no HTTP response
Failed to parse URL from api/FlightSearch/UpSelling
```

Reproduced in this run by resolving the shipped collection URL against the shipped environment and sending it: the client rejects it before any request leaves. With `requestUrl` = `baseUrl` the same Upselling call returns HTTP 200.

## ✅ Expected Result

```json
POST {{baseUrl}}api/FlightSearch/UpSelling
// -> HTTP 200 with the upsell ladder
```

The Upselling request should use `{{baseUrl}}` like every other V1 request (or `requestUrl` should be defined in `STAG_ENV`).

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Upselling`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**Medium** — a collection defect, not an API defect: nothing is wrong on the server, but the shipped V1 suite cannot exercise Upselling at all until someone notices and applies a local fix.

## 📎 Evidence

**Actual response (redacted):**

```json
// request URL as resolved
POST api/FlightSearch/UpSelling

// client error, no HTTP response
Failed to parse URL from api/FlightSearch/UpSelling
```

**Expected response (redacted):**

```json
POST {{baseUrl}}api/FlightSearch/UpSelling
// -> HTTP 200 with the upsell ladder
```

## 💥 Impact

Anyone running the V1 collection or its Upselling flows hits a client-side URL error with no API response and no hint of the cause.
