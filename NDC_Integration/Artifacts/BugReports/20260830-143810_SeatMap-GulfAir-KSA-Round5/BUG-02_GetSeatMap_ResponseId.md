# [V2][GulfAir][GetSeatMap] – ResponseId Omission Not Rejected

## 📄 Description

`GetSeatMap` still returns HTTP 200 with a fully populated `seatMapDetails` when the documented
mandatory field `ResponseId` is omitted entirely from the request. This is the **5th consecutive
round** this defect has reproduced.

## 🔁 Steps to Reproduce

1. `AddPassenger` for a GulfAir/KSA offer (BAH-RUH, 2027-01-15).
2. `GetSeatMap` with `supplier`, `credentialsSelector`, and `selectedOfferId` populated, but
   `ResponseId` omitted from the JSON body entirely.

## ❌ Actual Result

```json
{ "supplier": "GulfAir", "offerId": "...", "responseId": "...", "seatMapDetails": { "...": "fully populated" } }
```
(HTTP 200)

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "1001", "errorMessage": "Validation errors occurred. Please check your request.", "context": [{"name": "ResponseId", "value": "Select a valid ResponseId"}] }
```
(matching the shape already returned for the other three mandatory fields when each is omitted)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**Medium** — omitting `supplier`, `credentialsSelector`, or `selectedOfferId` from the same request
correctly triggers a clean 400 with a field-specific message; only `ResponseId` is left unenforced,
an inconsistency within the same endpoint's own validation.

## 📎 Evidence

- omit `supplier` → 400 (`{"name":"Supplier","value":"Select a valid Supplier"}`)
- omit `credentialsSelector` → 400
- omit `selectedOfferId` → 400
- omit `ResponseId` → **200, full `seatMapDetails` returned**

## 💥 Impact

Confirmed unchanged across every round to date. `ResponseId` is documented as a required field in
the same request shape as `selectedOfferId`, `supplier`, and `credentialsSelector`, but is the only
one of the four not actually enforced server-side.
