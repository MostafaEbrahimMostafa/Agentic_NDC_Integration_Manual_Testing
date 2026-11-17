# [V1][Amadeus][Hold] – Infant Sharing the Adult's Surname Missing from the Echoed passengersList

## 📄 Description

When an infant has the same surname as its adult, the `passengersList` in the Hold response contains only the adult. When the infant has a different surname, the infant is present and linked to the adult. The only difference between the two requests is the infant's last name. A family travelling under one surname is the normal case.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT + 1 INF.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with ADT `Mr Mostafa Ibrahim` (Pax1) and INF `MS Lina Ibrahim` (Pax2, `ParentPaxRefId: "Pax1"`). Note the keys of `passengersList` in the response.
4. Repeat steps 1-3 with the infant's last name changed to `Hassan`. Compare.

## ❌ Actual Result

Same surname (ADT Ibrahim / INF Ibrahim):

```json
"passengersList": { "2-ADT": { "name": { "first": "MOSTAFA", "last": "IBRAHIM" }, "passengerTypeCode": "ADT" } }
```

Two adults each with an own infant, both pairs sharing a surname (TC-PAXNAME-POS-04): both infants are missing.

## ✅ Expected Result

```json
"passengersList": {
  "2-ADT": { "name": { "first": "MOSTAFA", "last": "IBRAHIM" }, "passengerTypeCode": "ADT" },
  "2-INF": { "name": { "first": "LINA", "last": "IBRAHIM" }, "passengerTypeCode": "INF", "parentPaxRefId": "2-ADT" }
}
```

SPEC.md §6.3 expects the passenger list on the hold response to match what was submitted (same names and types). With a different infant surname the service already returns this shape (control TC-PAXNAME-BIZ-18).

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — the infant is the one passenger whose presence cannot be confirmed, in the most common family case, and the booking cannot be retrieved to check (Retrieve returns 500 for Amadeus).

## 📎 Evidence

**Actual response (redacted), same surname:** keys `["2-ADT"]` only (TC-PAXNAME-POS-01, POS-03, POS-04, BIZ-17; probe P1).

**Expected / control response, different surname (TC-PAXNAME-BIZ-18, probe P2):**

```json
{ "2-ADT": "MOSTAFA/IBRAHIM", "2-INF": "LINA/HASSAN (parentPaxRefId 2-ADT)" }
```

Transaction ids: BIZ-17 `Not returned by this response`, BIZ-18 `Not returned by this response`.

## 💥 Impact

If the infant is genuinely missing from the PNR the family travels without an infant record or ticket; if it is only missing from the echo, consumers (and QA) cannot confirm the infant was booked. Either way the same-surname booking looks identical to an adult-only booking in the response.
