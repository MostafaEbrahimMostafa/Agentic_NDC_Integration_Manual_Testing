# [V1][Amadeus][Book] – HTTP 500 ServerError Returned for a Valid ADT Booking Instead of a Booked PNR

## 📄 Description

`POST api/FlightBooking/Book` returns HTTP 500 `ServerError` for Amadeus/EGY on every call made in this run (3 of 3: a plain ADT, an ADT + INF, and an ADT + INF on the 59-character limit), after about 7-8 seconds. The identical passengers on `POST api/FlightBooking/Hold` return 200 with a PNR, so the request is valid and passes the name rules. The 500 body has an empty `Context`, so nothing says whether a PNR or ticket was created at Amadeus.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Book` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact, and one ADT passenger: title `Mr`, first `Mostafa`, last `Ibrahim`, gender `male`, valid passport data.
4. Repeat step 3 on `api/FlightBooking/Hold` with the same body to see the contrast.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "d5ebdf66-5dbb-4ec8-9353-89affabff031",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

Book fails in about 7-8 s (the same time a Hold takes to reach Amadeus), which suggests the failure happens after the supplier call; whether a booking exists cannot be checked because `RetrieveBooking` also returns 500 for Amadeus PNRs on this build.

## ✅ Expected Result

```json
{
  "supplier": "Amadeus",
  "pnr": "7IXXXX",
  "gdsPNR": "7IXXXX",
  "bookingToken": "<token>",
  "tickets": [ { "ticketNumber": "<number>", "ticketStatus": "Booked" } ]
}
```

SPEC.md §4.6 lists Book as supported for every supplier, and §2.9 defines a 200 with `pnr`/`tickets` for a valid request. A failure must come back as a mapped error with a reason, not an unhandled 500.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `d5ebdf66-5dbb-4ec8-9353-89affabff031`

## 📊 Severity

**High** — the core booking call cannot complete for Amadeus/EGY, and the generic 500 hides whether a ticket was issued, which risks an orphaned or duplicated booking.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 500, "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.", "Context": [] }
```

**Expected response (redacted):**

```json
{ "pnr": "7IXXXX", "gdsPNR": "7IXXXX", "bookingToken": "<token>", "tickets": [ "..." ] }
```

Related test cases: TC-PAXNAME-POS-06 (isolating case), TC-PAXNAME-POS-01 (Book leg), TC-PAXNAME-BND-13 (Book leg). Transaction ids: POS-01 `78ac8130-693f-41bd-8835-3a6cfd2fcb29`, BND-13 `5b84de20-a3eb-4ad5-9638-8b6a6e50fef0`.

## 💥 Impact

No Amadeus/EGY booking can be ticketed through V1 Book, so the Book half of every positive name-rule case could not be verified. Because the failure is an opaque 500 and neither Retrieve nor CancelAfterHold works for Amadeus, support has no way to find out from the API whether a customer was charged or a ticket exists.
