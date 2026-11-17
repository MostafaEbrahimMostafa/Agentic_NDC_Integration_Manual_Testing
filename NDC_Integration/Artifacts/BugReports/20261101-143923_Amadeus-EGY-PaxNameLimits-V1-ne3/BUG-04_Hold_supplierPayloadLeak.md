# [V1][Amadeus][Hold] – Raw Amadeus SOAP Request and Response (Passenger Data, Passport Numbers, Office ID) Returned in Every Supplier 409 Error Body

## 📄 Description

Every unmapped supplier error (`409 NDC-INT-UNC-Z9999`) and every "no longer available" error (`409 NDC-INT-BYP-A0001`) returns the complete Amadeus SOAP request and response in `OriginalSupplierRequest` / `OriginalSupplierResponse` (78 such responses in this run). The payload contains traveller names, passport numbers (SSR DOCS lines), email, phone, address, the Amadeus office id (`CAIEG28WT`), the IATA number, the SOAP session id and the endpoint node. This is the leak class already tracked in SPEC.md §7.14, now reachable with an ordinary over-limit name (BUG-02/BUG-03) or a stale offer.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT + 1 INF.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS). Use the BUG-03 same-surname pair of 52.
4. Read `OriginalSupplierRequest` and `OriginalSupplierResponse` in the 409 body.

## ❌ Actual Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "OriginalSupplierRequest": "<soapenv:Envelope ...><ses:SessionId>01BZK4YT2D</ses:SessionId> ... <surname>Shabcdefghij</surname> ... DOCS P-EG-A7801849-EG-15Feb90-M-01Oct30-SHABCDEFGHIJ-MOABCDEFG ... ndc.qa.paxname@gmail.com ... [first 3 elements shown, remainder omitted]",
  "OriginalSupplierResponse": "<soapenv:Envelope ...> ... <officeId>CAIEG28WT</officeId><iataCode>90200305</iataCode> ... [omitted]"
}
```

## ✅ Expected Result

`OriginalSupplierRequest` and `OriginalSupplierResponse` absent or null in consumer-facing responses (SPEC.md §7.14); the supplier error text is already mapped into `Context`.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `440c05c9-b993-433e-a6b1-91ed69f33c4f`

## 📊 Severity

**High** — security/privacy: supplier account identifiers and traveller PII are returned to every API consumer on routine errors.

## 📎 Evidence

Hold `440c05c9-b993-433e-a6b1-91ed69f33c4f` (Z9999) and VAL-22 third call `54f02f96-7d8c-49f5-8fcd-ba0eea754ec8` (BYP-A0001). The log stores these bodies redacted.

## 💥 Impact

Disclosure of supplier connection details and personal data; any consumer, including an unauthenticated-to-end-user client, can read raw supplier traffic.
