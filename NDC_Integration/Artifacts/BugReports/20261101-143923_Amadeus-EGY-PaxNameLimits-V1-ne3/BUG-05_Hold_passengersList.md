# [V1][Amadeus][Hold] – Infant Sharing the Adult's Surname Missing from the Echoed passengersList

## 📄 Description

When an infant has the same surname as its adult the Hold 200 response echoes only the adult; with a different surname both are echoed. Retrieve cannot confirm whether the infant is on the PNR for Amadeus. Same defect as on ne-8 (2026-10-29).

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT + 1 INF.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS).
   - Pax1 ADT: `Mostafa` / `Ibrahim`. Pax2 INF: `Lina` / `Ibrahim`, `ParentPaxRefId` `Pax1`.
4. Repeat with the infant's last name `Hassan` for the control.

## ❌ Actual Result

```json
{
  "supplier": "Amadeus",
  "pnr": "83MZME",
  "passengersList": {
    "2-ADT": {
      "passengerTypeCode": "ADT",
      "name": {
        "first": "MOSTAFA",
        "last": "IBRAHIM"
      }
    }
  }
}
```

## ✅ Expected Result

passengersList contains both `2-ADT` (MOSTAFA IBRAHIM) and an `INF` entry (LINA IBRAHIM) linked to it, as it does when the surnames differ.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response (HTTP 200 has no TransactionId)`

## 📊 Severity

**High** — family bookings are the common case and the response hides a possibly missing infant.

## 📎 Evidence

POS-01, POS-03, POS-04 (both infants lost), BND-24, BIZ-17, BIZ-25, POS-09 (infant missing); BIZ-18 (different surname, infant present).

## 💥 Impact

An infant may travel without a seat record/ticket; staff cannot verify it through the API.
