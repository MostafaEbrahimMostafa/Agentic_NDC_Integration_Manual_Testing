# [V2][SabreNdc][FareConfirm] – Unknown selectedOfferId Returns HTTP 500 ServerError in FareConfirm Response

## 📄 Description

FareConfirm with a `selectedOfferId` the supplier cannot resolve (for example the string `garbage`) fails with HTTP 500 `ServerError` / "Unknown error occured" instead of a 4xx validation error.

Found by: TC-FARECONFIRM-NEG-01, QA run `20261025-092205_SabreNdc-EGY-Generic` (2026-10-25).

## 🔁 Steps to Reproduce

1. POST V2 Search (SabreNdc/EGY, CAI-JED 2026-11-20, 1 ADT).
2. POST `api/v2/FlightSearch/FareConfirm` with the real `ResponseId` and `selectedOfferId: "garbage"`.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "6f6aa995-dcf1-40a9-acf8-ec9b3627d52f",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

HTTP 500 with an empty Context.

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error ...",
  "Context": [ { "Name": "selectedOfferId", "Value": "Offer not found or expired" } ]
}
```

SPEC.md §2.2: an expired or mismatched offer must surface as a distinct "offer unavailable" error rather than a generic 500; §7.9 expects a normalized error. By contrast AddPassenger already answers a bad offer with 400 and "SelectedOfferId ... Failed to ...".

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `FareConfirm`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `6f6aa995-dcf1-40a9-acf8-ec9b3627d52f`

## 📊 Severity

**Medium** — Client input errors look like server outages, so alerting fires and callers cannot tell a bad id from a real failure.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "6f6aa995-dcf1-40a9-acf8-ec9b3627d52f",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error ...",
  "Context": [ { "Name": "selectedOfferId", "Value": "Offer not found or expired" } ]
}
```

## 💥 Impact

Clients and monitoring treat the 500 as a platform fault. A caller that retries an expired offer id gets the same opaque error with no hint that the offer must be re-searched.
