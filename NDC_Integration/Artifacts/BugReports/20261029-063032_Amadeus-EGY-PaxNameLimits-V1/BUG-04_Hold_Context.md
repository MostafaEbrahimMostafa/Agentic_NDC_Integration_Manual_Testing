# [V1][Amadeus][Hold] – First-Name Length in the 25-Character Error Message Includes the Title

## 📄 Description

The 25-character error message reports the first-name length including the title (a 26-character first name with title `Mr` is reported as 28), while the last-name figure is the raw length. The limit is actually applied to the raw first name (a 25-character first name and a 24-character first name are both accepted).

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with one ADT: title `Mr`, first name `Firstabcdefghijklmnopqrstu` (26 characters), last name `Lastnmabc` (9 characters).

## ❌ Actual Result

```json
"Context": [ { "Value": "Firstabcdefghijklmnopqrstu: 28 | Lastnmabc : 9 => a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." } ]
```

The reported figure (28) is the name (26) plus the title (2). The stakeholder sample shows the same effect: `ChristopherAlexanderMaxMost: 29 | Mostafa : 7` for a 27-character name with title MR.

## ✅ Expected Result

```json
"Context": [ { "Value": "Firstabcdefghijklmnopqrstu: 26 | Lastnmabc : 9 => a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." } ]
```

The figure next to each name should be that name's own length so it can be compared with the stated 25-character limit. If the title is meant to count, the message should say so.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `41f14de0-5eae-4ed2-a212-d017488a2d33`

## 📊 Severity

**Low** — diagnostic text only; bookings are not affected, but the figure contradicts the limit it cites and misleads whoever has to shorten the name.

## 📎 Evidence

**Actual:** `...: 28 | ... : 9` (TC-PAXNAME-VAL-19, transaction `41f14de0-5eae-4ed2-a212-d017488a2d33`); the same `+2` appears in every first-name entry in this run (BND-02, BND-09, VAL-06/07).

**Expected:** `...: 26 | ... : 9`.

## 💥 Impact

A caller told "28" for a name they count as 26 cannot tell whether the rule is 25 on the name or on name plus title, and may over-shorten names.
