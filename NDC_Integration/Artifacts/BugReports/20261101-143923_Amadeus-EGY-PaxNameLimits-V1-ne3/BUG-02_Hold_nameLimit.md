# [V1][Amadeus][Hold] – 25-Character First/Last Name Limit Not Enforced: Over-Limit Names Create PNRs or Fail at Amadeus as 409 Z9999

## 📄 Description

The requirement says a first name or last name above 25 characters must be rejected by the integration layer. On ne-3 there is no per-name 25-character check: a 26-character name passes validation and is forwarded to Amadeus. Depending on the pairing Amadeus either accepts it (Hold 200, the 26-character name is echoed in full and a PNR exists) or rejects it and the API returns an unmapped `409 NDC-INT-UNC-Z9999` "ITEM TOO LONG / NOT ENTERED". The stakeholder's sample (27-character first name + infant) now returns the 409 instead of the documented two-entry 400. The same input is not deterministic (VAL-22: 200, 200, then 409). The earlier build (ne-8) rejected all of these with 400 `NDC-INT-TEC-A0001` in 0.1 s.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS).
   - Pax1 ADT: first `Abcdefghijklmnopqrstuvwxyz` (26 characters), last `Ibrahim`.

## ❌ Actual Result

Hold returns 200 with a PNR and echoes the 26-character name:

```json
{
  "supplier": "Amadeus",
  "pnr": "83MVWO",
  "passengersList": {
    "2-ADT": {
      "passengerTypeCode": "ADT",
      "name": {
        "first": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "last": "IBRAHIM"
      }
    }
  }
}
```

With the stakeholder names (first `ChristopherAlexanderMaxMost`, title MR, last `Mostafa`, plus infant `Li`/`Mostafa`):

```json
{
  "Status": 409,
  "TransactionId": "958033df-a077-463e-8d34-bb72a3290821",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "1902",
      "Value": "Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA => ITEM TOO LONG / NOT ENTERED /"
    }
  ],
  "OriginalSupplierRequest": "[redacted - raw supplier SOAP, see BUG-04]",
  "OriginalSupplierResponse": "[redacted]"
}
```

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Value": "ChristopherAlexanderMaxMost: 29 | Mostafa : 7 => a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team."
    },
    {
      "Value": "The combined passenger information for Adult 'ChristopherAlexanderMaxMost MR/Mostafa(ADT)(INFLi MS/Mostafa)' ) and Infant (Li MS/Mostafa/INF) totals 53 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/INF). "
    }
  ]
}
```

No PNR and no supplier call.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `958033df-a077-463e-8d34-bb72a3290821`

## 📊 Severity

**High** — the business rule requested by the Amadeus support team is not enforced; names the supplier cannot hold are created or fail late.

## 📎 Evidence

BND-02 (ADT first 26 -> 200, PNR 83MVWO), BND-04 (last 26 -> 200), BND-09, BND-10, BND-12 (INF/CHD 26 -> 200), VAL-02 (26 with an embedded space -> 200), REG-01 and VAL-20 (-> 409 Z9999), POS-09 (409 on the first attempt). Transaction ids: REG-01 Hold `958033df-a077-463e-8d34-bb72a3290821`, VAL-20 Hold `ab9a9666-907f-46fb-ae88-6c50ab450e0c`.

## 💥 Impact

Bookings are created with names Amadeus' own rule forbids, or customers get an opaque 409 after a 2-second supplier round trip; the support team's requirement is not met.
