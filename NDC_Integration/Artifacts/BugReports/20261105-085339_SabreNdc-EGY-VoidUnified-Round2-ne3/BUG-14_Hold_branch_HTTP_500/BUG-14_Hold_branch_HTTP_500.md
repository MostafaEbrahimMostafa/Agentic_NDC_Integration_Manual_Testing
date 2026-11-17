# [V1/V2][SabreNdc][Retrieve / BookAfterHold] – HTTP 500 ServerError Returned Intermittently in the Hold Branch

## 📄 Description

Calls in the hold branch occasionally fail with HTTP 500 ErrorCode `ServerError` ("Unknown error occured. Please keep the transaction id as a reference.", empty Context) instead of the booking or a mapped error: Retrieve of a held booking and BookAfterHold. 8 such response(s) in roughly 1800 hold-branch and Retrieve calls (both builds), all while several booking chains ran in parallel (about 8), so the cause may be load.

A second, larger episode: between 09:51:06 and 09:51:25 UTC every call from the parallel chains (125 of 127 calls, covering Search, FareConfirm, Hold, BookAfterHold, Retrieve, PnrReprice, Void and CancelAfterHold) returned HTTP 500 with an **empty body** (no error envelope at all), then the service resumed without intervention. That left 5 PNRs open (2 ticketed, 3 held) that had to be voided / cancelled afterwards.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. POST Retrieve (V1 api/FlightBooking/RetrieveBooking, V2 api/v2/FlightBooking/Retrieve) or BookAfterHold (V1 api/FlightBooking/BookAfterHold, V2 api/V2/FlightBooking/BookAfterHold) with the Hold ids, while other bookings are being created in parallel.

## ❌ Actual Result

```json
HTTP 500 { "Status": 500, "TransactionId": "...", "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.", "Context": [] }
```

BookAfterHold: HTTP 500 ErrorCode ServerError, transaction 103d8f4c-13a5-4c88-bc70-5b233cc12a6b, 618 ms, at 2026-11-05T09:08:26.152Z
RetrieveBooking: HTTP 500 ErrorCode ServerError, transaction 1f69ebf7-13cd-4219-b8ae-8a496d38b067, 576 ms, at 2026-11-05T09:08:26.262Z
Void: HTTP 500 ErrorCode ServerError, transaction null, 9391 ms, at 2026-11-05T10:06:19.374Z
Book: HTTP 500 ErrorCode ServerError, transaction null, 4803 ms, at 2026-11-05T10:06:23.964Z
Hold: HTTP 500 ErrorCode ServerError, transaction null, 1852 ms, at 2026-11-05T10:06:26.921Z
Void: HTTP 500 ErrorCode ServerError, transaction null, 9427 ms, at 2026-11-05T10:06:19.370Z
PnrReprice: HTTP 500 ErrorCode ServerError, transaction null, 6861 ms, at 2026-11-05T10:06:21.939Z
Hold: HTTP 500 ErrorCode ServerError, transaction null, 4228 ms, at 2026-11-05T10:06:24.580Z

After the 500 the hold was still intact (CancelAfterHold succeeded, no ticket was issued), so no silent ticketing was observed in these cases.

## ✅ Expected Result

```json
HTTP 200 with the booking, or a mapped 4xx/409 error with a specific ErrorCode and message
```

SPEC.md 2.11 and 2.13: Retrieve and BookAfterHold return the booking or a documented error.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve / BookAfterHold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `See the transaction ids above`

## 📊 Severity

**Medium** — The failures are rare and transient, and no silent ticketing was seen, but a BookAfterHold 500 leaves the caller unable to tell whether the ticket was issued.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 500, "ErrorCode": "ServerError", "ErrorMessage": "Unknown error occured. Please keep the transaction id as a reference.", "Context": [] }
```

**Expected response (redacted):**

```json
{ "supplier": "SabreNdc", "pnr": "<real>", "bookingToken": "<real>", "...": "..." }
```

Test cases: TC-VOIDCAP-BIZ-01, TC-VOIDCAP-REG-01, TC-VOIDCAP-REG-05 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3). New in Round 2.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_isolated_500_BookAfterHold_request.json` / `01_isolated_500_BookAfterHold_response.json` — isolated 500 BookAfterHold, `api/V2/FlightBooking/BookAfterHold`, HTTP 500
- `02_isolated_500_RetrieveBooking_request.json` / `02_isolated_500_RetrieveBooking_response.json` — isolated 500 RetrieveBooking, `api/FlightBooking/RetrieveBooking`, HTTP 500
- `03_isolated_500_Void_request.json` / `03_isolated_500_Void_response.json` — isolated 500 Void, `api/V2/FlightBooking/Void`, HTTP 500
- `04_isolated_500_Book_request.json` / `04_isolated_500_Book_response.json` — isolated 500 Book, `api/FlightBooking/Book`, HTTP 500
- `05_isolated_500_Hold_request.json` / `05_isolated_500_Hold_response.json` — isolated 500 Hold, `api/v2/FlightBooking/Hold`, HTTP 500
- `06_isolated_500_Void_request.json` / `06_isolated_500_Void_response.json` — isolated 500 Void, `api/FlightBooking/Void`, HTTP 500
- `07_isolated_500_PnrReprice_request.json` / `07_isolated_500_PnrReprice_response.json` — isolated 500 PnrReprice, `api/FlightBooking/PnrReprice`, HTTP 500
- `08_isolated_500_Hold_request.json` / `08_isolated_500_Hold_response.json` — isolated 500 Hold, `api/FlightBooking/Hold`, HTTP 500
- `09_V2_DOH-CAI_2_Void_request.json` / `09_V2_DOH-CAI_2_Void_response.json` — V2 DOH-CAI #2 Void, `api/V2/FlightBooking/Void`, HTTP 500
- `10_V2_DOH-CAI_2_Void-retry_request.json` / `10_V2_DOH-CAI_2_Void-retry_response.json` — V2 DOH-CAI #2 Void-retry, `api/V2/FlightBooking/Void`, HTTP 409
- `11_V1_DOH-CAI_2_Void_request.json` / `11_V1_DOH-CAI_2_Void_response.json` — V1 DOH-CAI #2 Void, `api/FlightBooking/Void`, HTTP 500
- `12_V1_DOH-CAI_2_Void-retry_request.json` / `12_V1_DOH-CAI_2_Void-retry_response.json` — V1 DOH-CAI #2 Void-retry, `api/FlightBooking/Void`, HTTP 409
- `13_outage_window_500_RetrieveBooking_request.json` / `13_outage_window_500_RetrieveBooking_response.json` — outage window 500 RetrieveBooking, `api/FlightBooking/RetrieveBooking`, HTTP 500
- `14_outage_window_500_Hold_request.json` / `14_outage_window_500_Hold_response.json` — outage window 500 Hold, `api/FlightBooking/Hold`, HTTP 500
- `15_outage_window_500_Void_request.json` / `15_outage_window_500_Void_response.json` — outage window 500 Void, `api/FlightBooking/Void`, HTTP 500
- `16_outage_window_500_FareConfirm_request.json` / `16_outage_window_500_FareConfirm_response.json` — outage window 500 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 500
- `17_outage_window_500_Retrieve_request.json` / `17_outage_window_500_Retrieve_response.json` — outage window 500 Retrieve, `api/v2/FlightBooking/Retrieve`, HTTP 500
- `18_outage_window_500_BookAfterHold_request.json` / `18_outage_window_500_BookAfterHold_response.json` — outage window 500 BookAfterHold, `api/V2/FlightBooking/BookAfterHold`, HTTP 500
- `19_outage_window_500_CancelAfterHold_request.json` / `19_outage_window_500_CancelAfterHold_response.json` — outage window 500 CancelAfterHold, `api/V2/FlightBooking/CancelAfterHold`, HTTP 500
- `20_outage_window_500_FareConfirm_request.json` / `20_outage_window_500_FareConfirm_response.json` — outage window 500 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 500

## 💥 Impact

A caller that gets a 500 from BookAfterHold cannot tell whether the booking was ticketed, so it must re-read the booking before retrying; a blind retry could double-ticket on suppliers that do not guard against it. During the 20 s outage a Book/Void/Cancel that fails with an empty 500 leaves a live PNR the caller cannot see, so cleanup needs a retry loop.
