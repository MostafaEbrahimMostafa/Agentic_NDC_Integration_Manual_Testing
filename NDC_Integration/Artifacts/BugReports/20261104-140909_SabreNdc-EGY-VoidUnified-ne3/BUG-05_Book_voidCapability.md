# [V1][SabreNdc][Book] – voidCapability Returned Incorrect Value (VoidNotAllowed) on Some AA Bookings in Book Response

## 📄 Description

V1 Book of a pure AA itinerary (JFK-MIA, AA-operated) returned `VoidNotAllowed` on 4 of 11 bookings; Void then succeeded (voided=true) on 2 of them. V1 QR (20 of 20), V2 QR and V2 AA (8 of 8) always returned `FullVoidOnlyAllowed`.

## 🔁 Steps to Reproduce

1. Search JFK-MIA (SabreNdc/EGY, 1 ADT), pick an offer with AA-operated AA-marketed segments (fare class B among others).
2. POST FareConfirm, then V1 Book. Record voidCapability.
3. POST V1 Void.

## ❌ Actual Result

```json
// V1 Book (PNR ROMSRX, AA)
"voidCapability": "VoidNotAllowed"
// V1 Void, same booking
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", "carrierCode": "AA" } ] }
```

Flag-gated clients refuse a Void that works on about a third of V1 AA bookings; V1 and V2 disagree for the same supplier. PNRs: SJJNJF, ROMSRX, RPUKGE, SGZIEG (all voided or already voided).

## ✅ Expected Result

```json
"voidCapability": "FullVoidOnlyAllowed"
```

AC Consistency: same supplier, same booking state, same literal on V1 and V2 and a flag that agrees with the Void endpoint (SPEC.md 2.9, 2.15).

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — The flag contradicts the Void outcome and depends on version and carrier, so a flag-gated client wrongly refuses to Void.

## 📎 Evidence

**Actual response (redacted):**

```json
// V1 Book (PNR ROMSRX, AA)
"voidCapability": "VoidNotAllowed"
// V1 Void, same booking
{ "voided": true, "voidedTickets": [ { "ticketStatus": "Voided", "carrierCode": "AA" } ] }
```

**Expected response (redacted):**

```json
"voidCapability": "FullVoidOnlyAllowed"
```

Test cases: TC-VOIDCAP-BIZ-01, TC-VOIDCAP-BIZ-03, TC-VOIDCAP-BND-03, TC-VOIDCAP-VAL-08 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Flag-gated clients refuse a Void that works on about a third of V1 AA bookings; V1 and V2 disagree for the same supplier. PNRs: SJJNJF, ROMSRX, RPUKGE, SGZIEG (all voided or already voided).
