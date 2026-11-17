# [V1][Amadeus][Hold] – Non-ASCII Names Pass the Letters-Only Pre-Check Then Fail at Amadeus as Unmapped 409 Z9999

## 📄 Description

The pre-check rejects some non-ASCII input (decomposed accents, emoji) with 400 "must only contain letters and spaces", but lets Arabic letters, precomposed accented Latin (José, Müller), a Cyrillic look-alike letter and the German sharp-s (13 x U+00DF, 26 characters once upper-cased) through. Amadeus then rejects them with an unmapped `409 NDC-INT-UNC-Z9999` "18|Presentation|Serializing/Deserializing error ... Wrong data format" carrying the raw SOAP (BUG-04).

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS).
   - Pax1 ADT first name `مصطفى` (or `José`, last `Müller`), last `Ibrahim`.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "7f3aae5a-b7a7-4a32-bedd-2425ef2ac223",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "soap:Client",
      "Value": "18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]"
    }
  ]
}
```

## ✅ Expected Result

400 `NDC-INT-TEC-A0001` "Name.First '...' must only contain letters and spaces" before any supplier call, consistent with the other non-ASCII cases, or a successful booking after transliteration.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `7f3aae5a-b7a7-4a32-bedd-2425ef2ac223`

## 📊 Severity

**Medium** — legitimate names cannot be booked and fail late with an opaque error.

## 📎 Evidence

VAL-09 (Arabic), VAL-11 (José/Müller; Hold `1364807d-6732-42b7-9511-cd33f30aec78`), VAL-27 (Cyrillic; `0241e11e-72ad-4485-a9d1-596988e16ad0`), BND-29 (sharp-s; `046ec8d5-b0af-46ca-967d-c02ace6bbf7a`); VAL-12/VAL-13 are rejected by the pre-check.

## 💥 Impact

Inconsistent handling of the same class of input and a supplier-error leak for customers with non-ASCII names.
