# [V2][GulfAir][GetSeatMap] – credentialsSelector Not Enforced: Offer Created Under KSA Readable Through UAE (2nd Confirmation)

## 📄 Description

`GetSeatMap` does not check that the request's `credentialsSelector` matches the one the offer was created
under. An offer created with GulfAir/`KSA` was submitted to `GetSeatMap` with GulfAir/`UAE` and the
**complete seat map was returned** (HTTP 200). Switching the *supplier* instead (TravelportNdc/UAE) is
correctly rejected, so the tenant boundary is only enforced at supplier level, not at credentials-selector
level. `UAE` is a real, working GulfAir tenant (`Search` with GulfAir/`UAE` returns 200 with offers).

**This is the existing `BUG-17`** (first filed Round 11, 2026-09-29), **now confirmed for the 2nd time**.

## History

| Round | Date | Result |
|---|---|---|
| 11 | 2026-09-29 | FAIL — GulfAir/UAE read a KSA offer's seat map (200, ~305 KB) |
| 12 | 2026-09-30 | FAIL — same result (200, ~198 KB, same `responseId`) |

## 🔁 Steps to Reproduce

1. `Search` (BAH→RUH, 2027-07-01, 1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap`, all with
   `supplier: GulfAir`, `credentialsSelector: KSA`. Note the `responseId`/`offerId` from `AddPassenger`.
2. Re-send `GetSeatMap` with the same `ResponseId`/`selectedOfferId` and valid headers, but
   `credentialsSelector: "UAE"` (supplier still `GulfAir`).
3. For comparison, re-send with `supplier: "TravelportNdc"`, `credentialsSelector: "UAE"`.

## ❌ Actual Result

Step 2:

```json
HTTP 200
{ "supplier": "GulfAir", "offerId": "GF-OFFER-2&yAGaY9IAAAH19Crc...", "responseId": "a87b75c4-8562-4de9-88ec-6ac2947e38a0", "seatMapDetails": { "GF-GF161-GF161-2027070102-2027070104-O": { "rows": [ "… 30 rows …" ] } } }
```

Step 3 (rejected, for contrast):

```json
HTTP 400
{ "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again.", "Context": [ { "Name": "SelectedOfferId", "Value": "Failed to deserialize the selected offer." } ] }
```

## ✅ Expected Result

```json
{ "Status": 4xx, "ErrorCode": "<offer not found / not authorized for this credentialsSelector>" }
```

SPEC.md §7.14 treats `supplier`/`credentialsSelector` as the API's implicit authorization boundary, and
`TC-SEATMAP-SEC-01` expects a cross-tenant switch to be rejected. The exact status/code is `UNKNOWN` in the
spec; any 4xx consistent with the supplier-switch rejection would satisfy it.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging`
- **Credentials Selector:** `KSA` (offer created under) / `UAE` (used to read it)
- **Correlation ID:** `d512ac8a-3b17-4fb3-874f-3747ea3a34bf` (GulfAir/UAE read, 200); `e5baea46-af8b-4dee-bf4d-548502111dd5` (supplier switch, 400)

## 📊 Severity

**Medium** — no booking or money is affected and the caller must already hold a valid offer ID, but it
weakens tenant isolation: access control between KSA and UAE credentials rests only on offer IDs being
unguessable.

## 📎 Evidence

**Actual response (redacted):** HTTP 200, ~198 KB seat map body (step 2 above).

**Expected response (redacted):**

```json
{ "Status": 4xx, "ErrorCode": "<rejection>" }
```

Source: `TC-SEATMAP-SEC-01` attempt 4 in [20260930-140455_SeatMap-GulfAir-KSA-Round12.md](../../Logs/20260930-140455_SeatMap-GulfAir-KSA-Round12.md).
Other probes: invalid `x-api-key` → 401, invalid `Client-Id` → 401, empty key → 401, omitted selector → 400,
bogus selector → 400 (all correct).

## 💥 Impact

A holder of an offer from one GulfAir tenant can read that offer's seat map, including per-seat pricing,
through another tenant's `credentialsSelector`. Only `GetSeatMap` was tested; the other endpoints that
consume `ResponseId`/`selectedOfferId` (`Book`, `GetAncillary`, `FareCheck`) probably share the same offer
lookup, so the same check should be repeated on them — `Book` matters most, since a cross-selector booking
would be a real financial action under the wrong tenant.
