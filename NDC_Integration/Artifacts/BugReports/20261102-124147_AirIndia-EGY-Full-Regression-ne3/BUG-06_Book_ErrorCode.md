# [V1][AirIndia][Book / GetOfferBundles] – ErrorCode Returned as ServerError (HTTP 500) for Unknown or Missing IDs in V1 Book and GetOfferBundles

## 📄 Description

V1 Book and V1 GetOfferBundles return HTTP 500 `ServerError` ("Unknown error occured. Please keep the transaction id as a reference.") for a never-issued id pair, for a missing `fareConfirmResponseId`, and for a 1000-character `selectedOfferId`. V2 Book and V2 GetOfferBundles answer the same inputs with 400 NDC-INT-TEC-A0001. The Book 500 occurs both with the capital-S `Supplier` key (as documented) and the lowercase `supplier` key.

## 🔁 Steps to Reproduce

1. Send `POST api/FlightBooking/Book` with supplier AirIndia, credentialsSelector EGY, `fareConfirmResponseId: "3f2b8c1e-5d4a-4e7b-9a10-aaaaaaaaaaaa"`, `selectedOfferId: "7c9e6679-7425-40de-944b-bbbbbbbbbbbb"`, a valid ADT passengersList and contactsList, `selectedBundles: []`.
2. Repeat on `api/bundles/GetOfferBundles` with `fareConfirmResponseId` and `selectedOfferId`.
3. Compare with V2 Book / V2 GetOfferBundles.

## ❌ Actual Result

```json
{
  "Status": 500,
  "TransactionId": "21ce3daf-90f8-4346-959f-570f67e6b013",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

Consumers and monitoring cannot tell a stale offer from a real outage on the one call that creates PNRs; retry logic may hammer Book..

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "AsyncPredicateValidator",
      "Value": "The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again."
    }
  ]
}
```

SPEC.md sections 2.4, 2.9 and 7.7: an invalid id pair is a client error; V2 returns the correct shape.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book / GetOfferBundles`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** 21ce3daf-90f8-4346-959f-570f67e6b013 (V1 Book); 1a8a2fcd-611c-420c-a792-976b5569fffb (V1 GetOfferBundles)

## 📊 Severity

**High** — A caller mistake on the booking path is reported as a platform fault, hiding the real cause and likely paging support.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 500,
  "TransactionId": "21ce3daf-90f8-4346-959f-570f67e6b013",
  "ErrorCode": "ServerError",
  "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.",
  "Context": []
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "AsyncPredicateValidator",
      "Value": "The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again."
    }
  ]
}
```

Test cases in this run: TC-AIEGY-BOOK-NEG-01, TC-AIEGY-BOOK-NEG-03, TC-BOOK-NEG-12, TC-BOOK-VAL-01, TC-BOOK-VAL-02, TC-AIEGY-GETOFFERBUNDLES-NEG-01, TC-AIEGY-GETOFFERBUNDLES-NEG-02, TC-AIEGY-GETOFFERBUNDLES-NEG-03, TC-AIEGY-CHAIN-02 (log: 20261102-124147_AirIndia-EGY-Full-Regression-ne3.html). Credentials, supplierRequest and OriginalSupplier* values are masked in all artifacts.

## 💥 Impact

Consumers and monitoring cannot tell a stale offer from a real outage on the one call that creates PNRs; retry logic may hammer Book.
