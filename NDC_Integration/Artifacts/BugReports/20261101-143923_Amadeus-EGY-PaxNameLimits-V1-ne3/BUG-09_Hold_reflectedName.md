# [V1][Amadeus][Hold] – Name Validation Error Echoes the Full Submitted Name Twice (10,000-Character Name Returns a ~20 KB Error Body)

## 📄 Description

When a name fails validation the error message embeds the complete submitted value in two `Context` entries. A 10,000-character last name produces a ~20 KB response (entries of 10,119 and 10,200 characters); a 1,000-character first name is echoed the same way.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 1 ADT.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with `fareConfirmResponseId` = FareConfirm `responseId`, `selectedOfferId` = `selectedOffer.offerId`, `selectedBundles: []`, one contact and the passengers below (valid passport data, `gender` male for ADT, female for CHD/INF, titles Mr / Miss / MS).
   - Pax1 ADT: first `Mostafa`, last = 10,000 x `B`.

## ❌ Actual Result

```json
{
  "Status": 400,
  "TransactionId": "5a084546-d837-4587-801f-17d07c761cfd",
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [
    {
      "Name": "LengthValidator",
      "Value": "Passenger 'Pax1': Name.Last must be between 2 and 50 characters."
    },
    {
      "Value": "Mostafa: 9 | BBBB...(10,000 B)... : 10000 => ..."
    },
    {
      "Value": "The passenger (Mostafa MR BBBB...(10,000 B)...) of type ADT has a total length of ..."
    }
  ]
}
```

## ✅ Expected Result

A rejection that quotes only a bounded part of the submitted value (for example the first 30 characters) and its length.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `5a084546-d837-4587-801f-17d07c761cfd`

## 📊 Severity

**Low** — response amplification and reflected content; no PNR or supplier call.

## 📎 Evidence

NEG-14 (10,000 characters, `5a084546-d837-4587-801f-17d07c761cfd`), BND-21 (1,000 characters, `e5362e08-7da2-43a4-90e0-f8e874163942`).

## 💥 Impact

Small amplification vector and reflected attacker-controlled content in error bodies.
