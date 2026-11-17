# [V1][Amadeus][Hold] – ParentPaxRefId Ignored: Infant Attached to the First Adult and Validated Against a Different Pairing

## 📄 Description

`ParentPaxRefId` is ignored when the booking is sent to Amadeus: an infant declared under `Pax2` is attached to the first adult. The combined-length pre-check pairs by the declared parent, so requests that are valid by validation are rejected by Amadeus (409 Z9999 "ITEM TOO LONG"). Same defect as on ne-8.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 2 ADT + 1 INF.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS).
   - Pax1 ADT `Mostafa`/`Ibrahim`; Pax2 ADT `Ahmed`/`Hassan`; Pax3 INF `Lina`/`Zaki`, `ParentPaxRefId` `Pax2`.

## ❌ Actual Result

The echoed infant's `parentPaxRefId` is `2-ADT` (Mostafa Ibrahim). With a 20/20-character first adult and a short second adult carrying the infant (BIZ-04, BIZ-20) the response is `409 NDC-INT-UNC-Z9999` "FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU => ITEM TOO LONG / NOT ENTERED" (Hold `3bbbb7f4-81b9-41c8-8266-373ec007ffa8`).

## ✅ Expected Result

The infant is attached to Ahmed Hassan (the declared parent) and the supplier request pairs exactly what the pre-check validated.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `3bbbb7f4-81b9-41c8-8266-373ec007ffa8`

## 📊 Severity

**High** — wrong adult-infant link on the booking and late failures.

## 📎 Evidence

BIZ-19 (echo), BIZ-04 and BIZ-20 (409).

## 💥 Impact

Incorrect traveller association on the PNR; avoidable supplier errors for multi-adult parties.
