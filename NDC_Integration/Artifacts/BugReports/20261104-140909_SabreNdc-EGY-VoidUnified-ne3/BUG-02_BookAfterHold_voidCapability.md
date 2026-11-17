# [V1/V2][SabreNdc][BookAfterHold] – voidCapability Returned as "None" for a Newly Ticketed Booking in BookAfterHold Response

## 📄 Description

BookAfterHold converts a hold into a ticketed booking, but the response carries `voidCapability: "None"` instead of `FullVoidOnlyAllowed`.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. POST FareConfirmAfterHold (PnrReprice), then BookAfterHold with the Hold ids.
3. Read voidCapability in the BookAfterHold response, then POST Void.

## ❌ Actual Result

```json
// BookAfterHold response (ticket status Booked)
"voidCapability": "None"
// Void on the same booking
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", ... } ] }
```

The hold-to-ticket path gives clients the wrong decision signal; seen on V1 and V2, and the mapping gap is the successor of the 2026-10-25 "field omitted" behaviour.

## ✅ Expected Result

```json
"voidCapability": "FullVoidOnlyAllowed"
```

Same-state consistency (AC Consistency, SPEC.md 2.13): a ticketed booking must report the same value whether it came from Book or BookAfterHold.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `BookAfterHold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The response that creates the ticket reports Void as not possible, although Void succeeds immediately after.

## 📎 Evidence

**Actual response (redacted):**

```json
// BookAfterHold response (ticket status Booked)
"voidCapability": "None"
// Void on the same booking
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", ... } ] }
```

**Expected response (redacted):**

```json
"voidCapability": "FullVoidOnlyAllowed"
```

Test cases: TC-VOIDCAP-POS-07, FLOW-V1-05-VOIDCAP, FLOW-V2-29-VOIDCAP, TC-VOIDCAP-REG-09 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

The hold-to-ticket path gives clients the wrong decision signal; seen on V1 and V2, and the mapping gap is the successor of the 2026-10-25 "field omitted" behaviour.
