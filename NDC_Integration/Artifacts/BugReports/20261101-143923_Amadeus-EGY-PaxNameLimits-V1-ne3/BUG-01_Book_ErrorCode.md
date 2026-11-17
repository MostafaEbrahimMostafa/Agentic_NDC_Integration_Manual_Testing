# [V1][Amadeus][Book] – HTTP 500 ServerError Returned for Every Valid Booking Instead of a Booked PNR

## 📄 Description

`POST api/FlightBooking/Book` returns HTTP 500 `ServerError` for Amadeus/EGY on every call that reaches the supplier in this run (12 of 12, zero successes), after about 7-8 seconds, including a plain one-adult booking. The identical passengers on `POST api/FlightBooking/Hold` return 200 with a PNR, so the request is valid. The 500 body has an empty `Context`, so nothing says whether a PNR or ticket was created at Amadeus. The same defect was seen on the earlier staging build (ne-8, 2026-10-29).

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Book` with `fareConfirmResponseId`, `selectedOfferId`, `selectedBundles: []`, one contact and one ADT: title `Mr`, first `Mostafa`, last `Ibrahim`, gender `male`.
4. Repeat step 3 on `api/FlightBooking/Hold` with the same body for the contrast.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "17038341-a520-4fb5-8044-be90ab2539ee",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

## ✅ Expected Result

```json
{
  "supplier": "Amadeus",
  "pnr": "83XXXX",
  "gdsPNR": "83XXXX",
  "bookingToken": "<token>",
  "tickets": [
    {
      "ticketNumber": "<number>",
      "ticketStatus": "Booked"
    }
  ]
}
```

SPEC.md §2.9 defines a 200 with `pnr`/`tickets` for a valid request; a failure must be a mapped error with a reason.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `17038341-a520-4fb5-8044-be90ab2539ee`

## 📊 Severity

**High** — Book is unusable for Amadeus/EGY; possible orphaned bookings cannot be checked.

## 📎 Evidence

Transaction ids: POS-06 `17038341-a520-4fb5-8044-be90ab2539ee`, POS-01 `d96915a0-a485-4622-9315-5803106e48c5`, BND-13 `3da76a40-97a4-4e4c-81ad-888750f5e294`. Log: 20261101-143923_Amadeus-EGY-PaxNameLimits-V1-ne3.

## 💥 Impact

No Amadeus customer can complete a paid booking through V1 Book; an unknown number of failed attempts may have left PNRs at the supplier.
