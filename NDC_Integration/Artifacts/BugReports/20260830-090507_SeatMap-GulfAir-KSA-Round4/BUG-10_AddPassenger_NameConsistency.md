# [V2][GulfAir][AddPassenger] – Rejects the Postman Collection's Own Saved Example Over a Name/travelDocument.name Mismatch

## 📄 Description

`AddPassenger` enforces a business rule (first confirmed live in Round 2, 2026-08-26) requiring
`passengersList.<pax>.name.{first,middle,last}` to **exactly** match
`travelDocument.name.{first,middle,last}`, including the middle name. The V2 Postman collection's own
saved `CI_AddPassenger` example (top-level `name.middle="kady"`, `travelDocument.name.middle=""`) —
the exact payload that succeeded in Round 1 (2026-08-25) — is rejected. Round 4 (2026-08-30)
reconfirms this identically, byte-for-byte, for the **4th consecutive round** since it first
appeared.

## 🔁 Steps to Reproduce

1. `Search` → `FareConfirm` for a GulfAir/KSA offer.
2. `AddPassenger` with the collection's saved example payload verbatim: `passengersList.Pax1.name =
   {first:"Mostafa", middle:"kady", last:"Ibrahim"}`, `passengersList.Pax1.travelDocument.name =
   {first:"Mostafa", middle:"", last:"Ibrahim"}`.

## ❌ Actual Result

```json
{
  "Status": 400,
  "ErrorCode": "ValidationError",
  "ErrorMessage": "Business validation error occured. Please check your request.",
  "Context": [{ "Name": "PredicateValidator", "Value": "Invalid travel document information" }]
}
```

## ✅ Expected Result

Either (a) `AddPassenger` succeeds despite the middle-name mismatch (matching the collection's own
saved, unexecuted example, and Round 1's live behavior on 2026-08-25), or (b) the exact-match rule is
intentional, in which case the collection's saved example should be corrected to be self-consistent
so it does not mislead every future tester who runs it verbatim.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `AddPassenger`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `0d30cbe7-a8b7-4d82-9fe6-1a8797a3d525`

## 📊 Severity

**High** — blocks the entire V2 chain (every downstream endpoint — GetSeatMap, Book, Hold — sits
behind AddPassenger) for anyone who runs the shipped Postman collection example without modification,
which is a very common onboarding/smoke-test path.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 400, "ErrorCode": "ValidationError", "Context": [{ "Name": "PredicateValidator", "Value": "Invalid travel document information" }] }
```

**Expected response (redacted):** `{ "status": 200, "offerId": "...", "responseId": "..." }`

## 💥 Impact

Confirmed identically in Round 2 (2026-08-26), Round 3 (2026-08-30, TransactionId
`dbf0b2d5-537f-485a-ae93-fd60da04a4f7`), and now Round 4 (2026-08-30, same-day recurring pass,
TransactionId `0d30cbe7-a8b7-4d82-9fe6-1a8797a3d525`) — the exact same error shape every time. Round 1
(2026-08-25) used the same collection example successfully one day before this rule apparently took
effect. Recommend either fixing the collection's saved example (set `travelDocument.name.middle` to
match the top-level `name.middle`, i.e. `"kady"`) or explicitly documenting the exact-match rule in
SPEC.md §2.5 so future testers aren't caught by it.
