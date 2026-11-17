# [V1][Amadeus][Hold] – Non-ASCII Names Pass Pre-Validation, Then Fail at Amadeus as Unmapped 409 Z9999 With the Raw Supplier Request in the Body

## 📄 Description

The integration pre-check accepts non-ASCII letters (Arabic, accented Latin) but Amadeus rejects them, and the failure is returned as `409 NDC-INT-UNC-Z9999` with the raw supplier SOAP request and response in `OriginalSupplierRequest` / `OriginalSupplierResponse`. The same unmapped 409 appears for pairings rejected by Amadeus (see BUG-03). The request body includes the Amadeus Security header with the account `UserID` and `OfficeId` (no password was found).

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with one ADT whose `name.last` is `Müller` and `name.first` is `José` (TC-PAXNAME-VAL-11), or whose `name.first` is the five Arabic letters U+0645 U+0635 U+0637 U+0641 U+0649 (TC-PAXNAME-VAL-09).
4. Compare with ASCII-only characters that the pre-check does reject, e.g. `A/B`, which returns 400 A0001 (TC-PAXNAME-VAL-14).

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [ { "Name": "soap:Server", "Value": "18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)]" } ],
  "OriginalSupplierRequest": "[REDACTED - raw supplier payload, per SPEC.md 7.14]",
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [ { "Value": "Passenger 'Pax1': Name.Last 'Müller' must only contain letters A-Z and spaces." } ]
}
```

The pre-check already uses this message for `A/B`, digits and emoji; it should cover every character Amadeus refuses, and supplier errors must be mapped without returning raw payloads (SPEC.md §7.14).

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `a9cc676e-a053-425c-b0e1-9219005d7246`

## 📊 Severity

**Medium** — legitimate accented and Arabic names cannot be booked and fail with an unmapped error; every Z9999 response also discloses the supplier request and account identifiers (a tracked leak class on this API).

## 📎 Evidence

**Actual (redacted):** above. Transaction ids: VAL-09 `bf1a9b52-2168-47f4-bedf-58947ae34c15`, VAL-11 `a9cc676e-a053-425c-b0e1-9219005d7246`, BIZ-04 `028a8320-eb69-4d9b-9317-7e3d4b0f299e`, BIZ-20 `64234b19-0a2a-4426-84d6-355c8a6a9841`.

**Expected:** 400 A0001 with a clear reason and no supplier payload.

## 💥 Impact

Customers with accented or Arabic-script names get an opaque supplier error, support teams are shown raw Amadeus XML, and the supplier's account identifiers travel in an API error body.
