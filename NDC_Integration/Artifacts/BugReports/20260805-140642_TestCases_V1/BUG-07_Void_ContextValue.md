# [V1][TravelportNdc][Void] – Context[].Value Returns Misleading "TravelportNdc does not exists" Message

## 📄 Description

`Void`'s unsupported-operation error message states `"TravelportNdc does not exists"`, which is
both ungrammatical and factually misleading — the supplier plainly exists and successfully
serves Search, FareConfirm, Book, Hold, PnrReprice and RetrieveBooking in the same run; only the
Void capability itself is unsupported.

## 🔁 Steps to Reproduce

1. Search (`POST api/FlightSearch/Search`) — CAI→JED 2026-09-15, 1 ADT + 1 CHD + 1 INF
2. FareConfirm (`POST api/FlightSearch/FareConfirm`)
3. Book (`POST api/FlightBooking/Book`) — issues a real, ticketed PNR
4. RetrieveBooking (`POST api/FlightBooking/RetrieveBooking`)
5. Void (`POST api/FlightBooking/Void`) — using Book's `pnr`/`gdsPNR`/`bookingToken` (failing call)

## ❌ Actual Result

```json
"Context": [{"Name": "OperationNotSupported", "Value": "TravelportNdc does not exists"}]
```

## ✅ Expected Result

```json
"Context": [{"Name": "OperationNotSupported", "Value": "Void is not supported for supplier TravelportNdc"}]
```

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-supplier-integration-staging.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (user-confirmed; NOT the STAG_ENV baseUrl — booking endpoints explicitly authorized for this run)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `eec95d29-54bb-48ba-81f3-bfcd53dd04bf`

## 📊 Severity

**Low** — non-blocking, purely a diagnostic/message-quality issue; Void being unsupported for
this supplier is itself a separate, confirmed platform limitation, not this defect's subject.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "eec95d29-54bb-48ba-81f3-bfcd53dd04bf",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [{"Name": "OperationNotSupported", "Value": "TravelportNdc does not exists"}]
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "eec95d29-54bb-48ba-81f3-bfcd53dd04bf",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [{"Name": "OperationNotSupported", "Value": "Void is not supported for supplier TravelportNdc"}]
}
```

## 💥 Impact

An integrator reading "TravelportNdc does not exists" would reasonably conclude the supplier
name is wrong or the adapter is missing, and start debugging their supplier configuration, when
in fact only the Void capability is absent (Search/FareConfirm/Book/Hold/RetrieveBooking all
succeed for the same supplier in the same run). Misleading diagnostics of this kind cost real
triage time.
