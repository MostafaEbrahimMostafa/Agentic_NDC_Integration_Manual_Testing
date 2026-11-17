# [V2][GulfAir][AddPassenger] – New Cross-Field Validation Rejects Previously-Working Passenger Payload (name vs travelDocument.name)

## 📄 Description

`AddPassenger` now enforces (HTTP 400, `PredicateValidator: "Invalid travel document information"`)
that `passengersList.<pax>.name.{first,middle,last}` must **exactly** match
`travelDocument.name.{first,middle,last}`, including the middle name. This is new/newly-enforced
since Round 1 (2026-08-25): the identical payload — which is also the V2 Postman collection's own
saved `AddPassenger` example (top-level `name.middle="kady"`, `travelDocument.name.middle=""`) —
succeeded in Round 1 and is rejected in Round 2, one day later, with no other change to the request.

## 🔁 Steps to Reproduce

1. `FareConfirm` for any GulfAir/KSA offer.
2. `POST api/v2/Passenger/AddPassengerDetails` with a `passengersList.Pax1` whose top-level `name`
   and `travelDocument.name` differ in any sub-field (e.g. top-level `middle="Kady"`,
   `travelDocument.name.middle=""` — exactly as shipped in the V2 Postman collection's saved
   example).

## ❌ Actual Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error occured. Please check your request.",
  "Context": [{ "Name": "PredicateValidator", "Value": "Invalid travel document information" }]
}
```

Isolated via 6 live variants (document number, dates, nationality, gender casing, document type
casing all varied independently with no effect) — only making `name` and `travelDocument.name`
byte-for-byte identical made the request succeed.

## ✅ Expected Result

```json
{ "responseId": "...", "offerId": "..." }
```

HTTP 200, as it did against the identical payload in Round 1 (2026-08-25).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `AddPassenger`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `a0638bbd-6fbf-4741-9f0c-d5cee6ce0100` (one of several TransactionIds captured across the 6 isolation variants)

## 📊 Severity

**High** — this blocks the *entire* V2 booking chain (GetSeatMap, Book, Hold, SeatAfterHold all sit
downstream of AddPassenger) for any caller building requests from the shipped Postman collection
example verbatim, with a same-day-prior working baseline as direct proof this is a behavior change,
not a pre-existing and merely undiscovered rule.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 400, "ErrorCode": "ValidationError", "Context": [{ "Name": "PredicateValidator", "Value": "Invalid travel document information" }] }
```

**Expected response (redacted):**

```json
{ "responseId": "3f2684c4-2dc5-4e0d-a0a6-57e5b7eb223d", "offerId": "[redacted opaque token]" }
```

## 💥 Impact

Whether this is an intentional new business rule (arguably correct — a passenger's legal name should
match their travel document) or an unintended side effect of some other change, it broke a
same-day-prior-working integration path with no accompanying SPEC.md/collection update. At minimum,
the V2 Postman collection's own saved `AddPassenger` example should be corrected to use a
self-consistent name so it stops being a broken reference for new integrators; at best, this should
be documented as a confirmed, intentional new validation rule in SPEC.md §2.5 (proposed update filed
in this run's QA report).
