# [V1][V2][SabreNdc][Void] – surName Not Validated - Void Succeeds With a Surname Not on the Booking

## 📄 Description

The SabreNdc `Void` endpoint does not check `surName`. A Void sent with a surname that matches no passenger on the PNR, with no `surName` at all, or with an injection string (SQL fragment, `<script>` tag, 500-character value) is accepted and voids every ticket on the booking. SPEC.md §2.15 lists an incorrect `surName` as a rejection case.

Found by: TC-VOID-VAL-04 (also TC-VOID-SEC-04), QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. Search -> FareConfirm -> Book (V1) / Search -> FareConfirm -> AddPassenger -> Book (V2): SabreNdc/EGY, CAI-JED, 1 ADT with surname `Ibrahim`. The booking is ticketed (e.g. V1 OOLKNB, V2 TMNYPF).
2. POST `api/FlightBooking/Void` (V1) / `api/V2/FlightBooking/Void` (V2) with the booking's pnr, gdsPNR and bookingToken, `voidTickets: []` and `surName: "Mismatch"`.
3. Retrieve the booking.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572135118448", "carrierCode": "QR" } ]
}
```

HTTP 200 after ~11s (a real void at Sabre). Retrieve then returns 400 "This Trip Is Already Cancelled". The same happens with surName omitted (OPWPBD / OXXGBK) and with each SEC-04 injection string (6 bookings).

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [ { "Value": "surName does not match any passenger on the PNR" } ]
}
```

Per SPEC.md §2.15 (Common Errors: "voiding with an incorrect surName") the request should be rejected and the booking left ticketed.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response (success body has no TransactionId)`

## 📊 Severity

**High** — Void is irreversible. The only passenger-identity check on this destructive call is missing, so anyone holding a pnr and bookingToken can void any ticketed SabreNdc booking.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572135118448", "carrierCode": "QR" } ]
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [ { "Value": "surName does not match any passenger on the PNR" } ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-VOID-VAL-04).

## 💥 Impact

A wrong or tampered surname cancels a traveller's tickets with no recovery path (a voided ticket cannot be reinstated). Booking tools that rely on the surname as a safeguard against voiding the wrong PNR get no protection. Found on 9 bookings across V1 and V2 in this run.
