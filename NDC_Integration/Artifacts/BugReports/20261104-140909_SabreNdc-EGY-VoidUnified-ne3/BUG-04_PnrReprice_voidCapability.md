# [V1/V2][SabreNdc][PnrReprice] – voidCapability Missing from PnrReprice (FareConfirmAfterHold) Response

## 📄 Description

The PnrReprice response has no `voidCapability` key on V1 and V2, while the Hold response for the same booking has one.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. POST api/FlightBooking/PnrReprice (V1) or api/v2/FlightBooking/PnrReprice (V2) with the Hold ids.

## ❌ Actual Result

```json
{ "supplier": "SabreNdc", "journeys": { ... }, "selectedOffer": { ... } }  // no voidCapability key
```

A client cannot tell "capability unknown" from "not allowed" after repricing a hold. Recurrence of the 2026-10-25 omission.

## ✅ Expected Result

```json
"voidCapability": "VoidNotAllowed"
```

AC Common Interface: the property is defined once for every endpoint that returns a booking (SPEC.md 2.12).

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `PnrReprice`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Non-blocking, but one of the five booking-returning endpoints has no value at all.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "supplier": "SabreNdc", "journeys": { ... }, "selectedOffer": { ... } }  // no voidCapability key
```

**Expected response (redacted):**

```json
"voidCapability": "VoidNotAllowed"
```

Test cases: TC-VOIDCAP-VAL-05, TC-VOIDCAP-VAL-12, TC-VOIDCAP-BIZ-02 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

A client cannot tell "capability unknown" from "not allowed" after repricing a hold. Recurrence of the 2026-10-25 omission.
