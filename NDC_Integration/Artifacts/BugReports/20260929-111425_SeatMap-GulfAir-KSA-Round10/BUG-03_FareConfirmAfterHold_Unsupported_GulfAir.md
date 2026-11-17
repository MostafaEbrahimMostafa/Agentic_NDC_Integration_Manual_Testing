# [V2][GulfAir][FareConfirmAfterHold] – Endpoint Rejected as Unsupported Despite a Working Hold-Branch on Either Side

## 📄 Description

`FareConfirmAfterHold` (`POST api/v2/FlightBooking/PnrReprice`) returns `HTTP 409
OperationNotSupported` for GulfAir/KSA on a fresh, unexpired `Hold`, even though `Search`/`FareConfirm`
report `canBeHeld: true` for the same offer, `Hold` itself succeeds normally, and `BookAfterHold`
called directly on the same `pnr` (skipping `FareConfirmAfterHold` entirely) also succeeds normally
and issues a ticket. This breaks the documented Hold-branch sequence (`Hold -> FareConfirmAfterHold ->
BookAfterHold`) specifically at its middle step.

## 🔁 Steps to Reproduce

1. `Search` — GulfAir/KSA, BAH→RUH 2027-07-08 (or any date this run confirmed has offers), 1 ADT.
2. `FareConfirm` — confirm `canBeHeld: true` on the selected offer.
3. `AddPassenger` — one ADT passenger.
4. `Hold` — `fareConfirmResponseId`/`selectedOfferId` from step 3. Succeeds, returns `pnr`, `gdsPNR`,
   `bookingToken`.
5. `FareConfirmAfterHold` — `pnr`/`gdsPNR`/`bookingToken` from step 4, `surName` (tried both empty and
   populated with the passenger's actual surname — same result either way).

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [{ "Name": "OperationNotSupported", "Value": "GulfAir does not exists" }]
}
```

Reproduced twice on the same `pnr` (once with `surName: ""`, once with `surName: "Ibrahim"`) — not a
`surName`-related validation issue. Calling `BookAfterHold` directly afterward on the same `pnr`
(skipping this step) succeeds: `HTTP 200`, ticket issued.

## ✅ Expected Result

`HTTP 200` with a re-priced `selectedOffer`, matching the documented purpose of this step (re-confirm
pricing before finalizing a Held booking) and consistent with `Hold`/`BookAfterHold` both working
normally for the same supplier/offer:

```json
{ "pnr": "QXDDTN", "gdsPNR": "", "bookingToken": "TPC60517146439D2992026", "selectedOffer": { "priceDetails": { "totalAmount": { "amount": "<re-priced total>", "currency": "SAR" } } } }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `FareConfirmAfterHold` (PnrReprice)
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `b76c7438-6cbc-478b-be47-630345fbb4fb` (TransactionId)

## 📊 Severity

**High** — any caller following the documented Hold-branch flow (`Hold -> FareConfirmAfterHold ->
BookAfterHold`, per flow.md) will fail at this exact step for GulfAir, even though the branch is
otherwise fully functional. The only known working path is skipping this step, which bypasses the
price-drift re-confirmation `FareConfirmAfterHold` exists specifically to provide — a caller doing the
"correct," documented thing gets blocked, while an undocumented workaround succeeds.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 409, "ErrorCode": "OperationNotSupported", "ErrorMessage": "This action is not currently supported by the selected supplier.", "Context": [{ "Name": "OperationNotSupported", "Value": "GulfAir does not exists" }] }
```

**Expected response (redacted):**

```json
{ "pnr": "QXDDTN", "gdsPNR": "", "bookingToken": "TPC60517146439D2992026", "selectedOffer": { "priceDetails": { "totalAmount": { "amount": "<re-priced total>", "currency": "SAR" } } } }
```

**Contrast — BookAfterHold on the same pnr, called directly, succeeds:**

```json
{ "supplier": "GulfAir", "pnr": "QXDDTN", "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "722136995853" } } }
```

## 💥 Impact

Every GulfAir Hold-branch flow that follows the documented endpoint sequence will fail at
`FareConfirmAfterHold`, forcing any real integration to discover and rely on the undocumented
`Hold -> BookAfterHold` shortcut instead — which skips the price-drift protection this step is meant
to provide, a real business-risk regression (a caller could finalize a Held booking at a stale price
without any re-confirmation). Recommend the platform team confirm whether GulfAir is meant to be
registered for this endpoint's supplier-capability list at all, since `canBeHeld: true` from
`Search`/`FareConfirm` currently promises a working Hold branch that this step breaks.
