# [V1][SabreNdc][Book] – Book Accepts a contactRefId That Is Not in contactsList and Issues a Ticket

## 📄 Description

V1 `Book` accepts a passenger whose `contactRefId` ("99") is not a key of `contactsList` (which only has key "0") and issues a ticket. SPEC.md §2.5 requires `contactRefId` to resolve to a key present in `contactsList`. V2 `AddPassenger` rejects the same input with HTTP 400.

Found by: TC-BOOK-NEG-02, QA run `20261025-190214_SabreNdc-EGY-V1-Round2` (2026-10-25, Round 2).

## 🔁 Steps to Reproduce

1. V1 Search (SabreNdc/EGY, CAI-JED 2026-11-24, 1 ADT) > FareConfirm.
2. POST `api/FlightBooking/Book` with Pax1.`contactRefId` = "99" and `contactsList` containing only key "0".
3. Void the resulting PNR.

## ❌ Actual Result

```json
// HTTP 200, ticketed PNR RTNGQG
{
  "pnr": "RTNGQG",
  "gdsPNR": "RTNGQG",
  "voidCapability": "FullVoidOnlyAllowed",
  "tickets": {
    "Passenger1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592786",
      "carrierCode": "QR"
    }
  }
}
```

The booking was created with a passenger that has no resolvable contact; it was voided straight away.

## ✅ Expected Result

```json
// as V2 AddPassenger already answers
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "Passenger without valid contact reference"
    },
    {
      "Name": "PredicateValidator",
      "Value": "All contact info should have at least one reference to a passenger"
    }
  ]
}
```

SPEC.md §2.5 (Request Rules and Common Errors): contactRefId must resolve to a key of contactsList.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways / American Airlines content)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** Not returned by this response (success body carries no TransactionId)

## 📊 Severity

**Medium** — a ticketed booking exists whose passenger has no contact record; airline notifications cannot reach the traveller, but the fare and ticket themselves are valid.

## 📎 Evidence

**Actual response (redacted):**

```json
// HTTP 200, ticketed PNR RTNGQG
{
  "pnr": "RTNGQG",
  "gdsPNR": "RTNGQG",
  "voidCapability": "FullVoidOnlyAllowed",
  "tickets": {
    "Passenger1": {
      "ticketStatus": "Booked",
      "ticketNumber": "1572141592786",
      "carrierCode": "QR"
    }
  }
}
```

**Expected response (redacted):**

```json
// as V2 AddPassenger already answers
{
  "Status": 400,
  "ErrorCode": "NDC-INT-TEC-A0001",
  "ErrorMessage": "Invalid request. Please check the request parameters and try again.",
  "Context": [
    {
      "Name": "PredicateValidator",
      "Value": "Passenger without valid contact reference"
    },
    {
      "Name": "PredicateValidator",
      "Value": "All contact info should have at least one reference to a passenger"
    }
  ]
}
```

## 💥 Impact

Bad contact references are not caught at Book on V1 (they are on V2), so a client typo produces a ticket with missing contact data instead of a 400.
