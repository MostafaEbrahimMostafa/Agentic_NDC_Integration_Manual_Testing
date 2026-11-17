# [V2][GulfAir][AddPassenger] – Rejects Its Own Saved Postman Example Over a Name Field Mismatch

## 📄 Description

`AddPassenger` rejects a passenger whose `passengersList.<pax>.name.middle` field differs from the
same passenger's `travelDocument.name.middle` field with HTTP 400 `Invalid travel document
information` — even though this is exactly the shape of the V2 Postman collection's own saved
(but never-executed) example request (`passengersList.name.middle: "kady"` vs
`travelDocument.name.middle: ""`). This is the **6th consecutive round** this defect has
reproduced.

## 🔁 Steps to Reproduce

1. `FareConfirm` for a GulfAir/KSA offer (BAH-RUH, 2027-02-10).
2. `AddPassenger` with `passengersList.Pax1.name = {first:"Mostafa", middle:"kady", last:"Ibrahim"}`
   and `passengersList.Pax1.travelDocument.name = {first:"Mostafa", middle:"", last:"Ibrahim"}` —
   i.e. the exact fields shown in the collection's saved example.

## ❌ Actual Result

```json
{
  "Status": 400,
  "TransactionId": "3ec16135-6d3f-4064-a30b-57c2d9611106",
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error occured. Please check your request.",
  "Context": [{ "Name": "PredicateValidator", "Value": "Invalid travel document information" }]
}
```

## ✅ Expected Result

Either the two name objects should not be cross-validated for exact equality (since middle names
are commonly omitted from travel documents but present on the passenger record), or this
requirement should be explicitly documented so test/integration data is built to satisfy it.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `AddPassenger` (`api/v2/Passenger/AddPassengerDetails`)
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `3ec16135-6d3f-4064-a30b-57c2d9611106`

## 📊 Severity

**High** — the V2 Postman collection's own saved, unexecuted example for `AddPassenger` would fail
if actually run through this endpoint. Every other test chain this round had to deliberately use a
matching (blank) middle name on both objects to proceed at all.

## 📎 Evidence

TransactionId `3ec16135-6d3f-4064-a30b-57c2d9611106`, `PredicateValidator: "Invalid travel document
information"`.

## 💥 Impact

Confirmed unchanged across Round 2, Round 3, Round 4, and now Round 5 with an identical
error/TransactionId shape each time. This is pre-flight/collection-hygiene tech debt that has
blocked every round's ability to use the collection's own documented example data as-is.
