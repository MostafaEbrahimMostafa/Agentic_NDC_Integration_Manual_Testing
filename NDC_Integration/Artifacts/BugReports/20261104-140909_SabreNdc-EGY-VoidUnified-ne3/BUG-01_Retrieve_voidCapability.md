# [V1/V2][SabreNdc][Retrieve] – voidCapability Returned as "None" for a Ticketed Booking in Retrieve Response

## 📄 Description

After a successful ticketed Book (which returns `voidCapability: "FullVoidOnlyAllowed"`), Retrieve of the same booking returns `voidCapability: "None"`, a value outside the unified enumeration `{FullVoidOnlyAllowed, VoidNotAllowed}`. Void on that booking succeeds.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> Book. Note pnr, gdsPNR, bookingToken and the Book response voidCapability.
2. POST api/FlightBooking/RetrieveBooking (V1) or api/v2/FlightBooking/Retrieve (V2) with the ids.
3. POST api/FlightBooking/Void (V1) or api/V2/FlightBooking/Void (V2) with the same ids and voidTickets [].

## ❌ Actual Result

```json
// Book response
"voidCapability": "FullVoidOnlyAllowed"
// Retrieve response, same booking, tickets Booked
"voidCapability": "None"
// Void response
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572141593204", "carrierCode": "QR" } ] }
```

A client that reads the flag from Retrieve concludes Void is not possible and hides or blocks a Void that works. 14 of 14 ticketed Retrieves in this run (V1 and V2, QR and AA) returned "None".

## ✅ Expected Result

```json
"voidCapability": "FullVoidOnlyAllowed"
```

The Unify Void Capability story requires one property with the same meaning on every endpoint that returns a booking (SPEC.md 2.9, 2.11; AC Common Interface and AC Consistency).

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The flow still completes, but the capability flag a client uses to decide whether to offer Void is wrong on every ticketed booking.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book response
"voidCapability": "FullVoidOnlyAllowed"
// Retrieve response, same booking, tickets Booked
"voidCapability": "None"
// Void response
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572141593204", "carrierCode": "QR" } ] }
```

**Expected response (redacted):**

```json
"voidCapability": "FullVoidOnlyAllowed"
```

Test cases: TC-VOIDCAP-POS-01, TC-VOIDCAP-VAL-09, TC-VOIDCAP-INT-01, FLOW-V1-03-VOIDCAP, FLOW-V2-27-VOIDCAP, TC-VOIDCAP-INT-03 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

A client that reads the flag from Retrieve concludes Void is not possible and hides or blocks a Void that works. 14 of 14 ticketed Retrieves in this run (V1 and V2, QR and AA) returned "None".
