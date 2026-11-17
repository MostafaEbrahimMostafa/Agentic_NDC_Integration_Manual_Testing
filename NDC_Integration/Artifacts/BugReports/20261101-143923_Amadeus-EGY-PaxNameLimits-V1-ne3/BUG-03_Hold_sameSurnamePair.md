# [V1][Amadeus][Hold] – Same-Surname ADT + INF Pairs of 52–57 Pass the Pre-Check Then Fail at Amadeus as 409 Z9999 ITEM TOO LONG

## 📄 Description

ne-3's combined-length message says the adult+infant limit is 57 when both share a surname (51 otherwise). Amadeus does not accept that: a same-surname pair totalling 52 or 57 (names + titles + passenger type codes) passes the integration pre-check and is then rejected by Amadeus (error 1902 "ITEM TOO LONG / NOT ENTERED") as an unmapped `409 NDC-INT-UNC-Z9999`. A pair of 51 is accepted, a pair of 58 is rejected by the pre-check. Infants normally share the family name, so this is the common shape of a family booking.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT + 1 INF.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS).
   - Pax1 ADT: title `Mr`, first `Moabcdefg`, last `Shabcdefghij`.
   - Pax2 INF: title `MS`, first `Liabcdefg`, last `Shabcdefghij`, `ParentPaxRefId` `Pax1`.
   (names + titles + "ADT"/"INF" = 52). Repeat on `Book`.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "440c05c9-b993-433e-a6b1-91ed69f33c4f",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "1902",
      "Value": "Passenger : MOABCDEFG MR SHABCDEFGHIJ => ITEM TOO LONG / NOT ENTERED /"
    }
  ],
  "OriginalSupplierRequest": "[redacted]",
  "OriginalSupplierResponse": "[redacted]"
}
```

## ✅ Expected Result

400 `NDC-INT-TEC-A0001` from the pre-check (limit 51 of content = the requirement's 59 with delimiters), or a booked PNR if the real supplier limit is higher; the published limit and Amadeus' behaviour must agree.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `440c05c9-b993-433e-a6b1-91ed69f33c4f`

## 📊 Severity

**High** — normal same-surname family bookings in the 52-57 range fail after a supplier round trip with an unmapped error.

## 📎 Evidence

BND-24 (51) -> 200; BND-25 (52) -> 409 on Hold `440c05c9-b993-433e-a6b1-91ed69f33c4f` and Book `be679317-a2d2-4b60-a711-8e659fa8d480`; BND-26 (57) -> 409 Hold `deeb71e8-6428-4acd-b650-66b41a74c720`; BND-27 (58) -> 400 A0001.

## 💥 Impact

Customers with a long shared family name cannot book an infant, and the error gives no usable guidance (and exposes the supplier payload, BUG-04).
