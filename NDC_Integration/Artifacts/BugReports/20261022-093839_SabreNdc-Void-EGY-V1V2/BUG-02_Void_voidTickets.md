# [V1][V2][SabreNdc][Void] – voidTickets With a Ticket Not on the PNR Voids Every Ticket Instead of Being Rejected

## 📄 Description

When `voidTickets` lists a ticket number that is not on the PNR, the SabreNdc Void ignores it and voids all tickets on the booking (silent void-all). The request should be rejected and the tickets left unchanged.

Found by: TC-VOID-NEG-03, QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. Book a SabreNdc/EGY booking, 1 ADT, CAI-JED (V1 TLPJBW ticket 1572135118447; V2 OWVBLV ticket 1572135118446).
2. POST Void with `voidTickets: [{ "ticketNumber": "0650000000000", "carrierCode": "QR", "ticketStatus": "Booked" }]`.
3. Retrieve the booking.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572135118447", "carrierCode": "QR" } ]
}
```

HTTP 200 on V1 and V2; the PNR's real ticket (not the requested one) is voided, and Retrieve returns "This Trip Is Already Cancelled".

## ✅ Expected Result

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [ { "Value": "Ticket 0650000000000 is not on PNR TLPJBW" } ]
}
```

SPEC.md §2.15 treats `voidTickets` as the selective list. TC-VOID-NEG-03 requires the call to be rejected, and it must never fall back to voiding all tickets.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — A selective (or mistyped) void destroys every ticket on the booking, including tickets the caller meant to keep.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572135118447", "carrierCode": "QR" } ]
}
```

**Expected response (redacted):**

```json
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "Context": [ { "Value": "Ticket 0650000000000 is not on PNR TLPJBW" } ]
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-VOID-NEG-03).

## 💥 Impact

On a multi-passenger PNR, trying to void one passenger's ticket with a wrong number voids the whole family's tickets. Partial-void features cannot be built safely on this behaviour.
