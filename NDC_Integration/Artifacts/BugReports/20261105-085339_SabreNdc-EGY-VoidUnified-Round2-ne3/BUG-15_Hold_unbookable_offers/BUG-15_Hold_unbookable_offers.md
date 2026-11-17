# [V1/V2][SabreNdc][Hold / Book] – Search Offers Cannot Be Booked: HTTP 409 "NOT AVAILABLE IN THIS CONNECTION" (Search Offers Returned in Hold and Book Responses)

## 📄 Description

Some offers returned by Search cannot be sold: FareConfirm answers HTTP 409 "No offers match.", or FareConfirm (and V2 AddPassenger) succeeds but the following Hold or Book is refused by the supplier with HTTP 409 NDC-INT-UNC-Z9999 and a supplier message such as "External service returned error in orderViewRS (code: [911] message: [NOT AVAILABLE IN THIS CONNECTION])" or "(code: [912] message: [ERROR AT END OF TRANSACTION TIME])". Other offers on the same flights succeed, so the failure is offer-specific. 27 of 702 chains in this round failed this way.

## 🔁 Steps to Reproduce

1. Search a QR connecting route on SabreNdc/EGY, for example RUH-CAI or DMM-CAI on 2026-12-05 (1 ADT).
2. FareConfirm (V1 api/FlightSearch/FareConfirm or V2 api/v2/FlightSearch/FareConfirm) and, on V2, AddPassengerDetails for an affected offer (list below).
3. POST Hold (V1 api/FlightBooking/Hold, V2 api/v2/FlightBooking/Hold) or Book.

Affected offers (route, marketing flights, path, version and offer index within the Search result):

- RUH-CAI QR1173+QR1303: book V1 #5, hold V2 #5
- RUH-CAI QR1169+QR1303: book V2 #10, hold V1 #10
- RUH-CAI QR1165+QR1303: book V1 #14, hold V2 #14
- RUH-CAI QR1169+QR1301: book V1 #17
- DMM-CAI QR1151+QR1307: book V1 #1
- DMM-CAI QR1155+QR1303: hold V2 #12
- DMM-CAI QR1151+QR1303: hold V2 #13
- JED-CAI QR1189+QR1303: hold V2 #10
- JED-CAI QR1187+QR1303: hold V2 #11, hold V1 #11
- JED-CAI QR1249+QR1303: hold V1 #17
- CAI-RUH QR1310+QR1168: hold V1 #15, hold V2 #15
- CAI-RUH QR1308+QR1164: hold V2 #14
- CAI-RUH QR1310+QR1172: hold V1 #16, hold V2 #16
- CAI-RUH QR1302+QR1166: hold V1 #17, hold V2 #17
- CAI-RUH QR1304+QR1166: hold V1 #18, hold V2 #18
- CAI-RUH QR1308+QR1166: hold V1 #19, hold V2 #19
- RUH-CAI QR1167+QR1303: hold V1 #19
- DMM-CAI QR1157+QR1301: hold V2 #10

## ❌ Actual Result

```json
HTTP 409 { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999", "Context": [ { "Name": "050002", "Value": "External service returned error in orderViewRS (code: [911] message: [NOT AVAILABLE IN THIS CONNECTION])." } ], "OriginalSupplierRequest": "<raw supplier payload>", "OriginalSupplierResponse": "<raw supplier payload>" }
```

The raw supplier request and response are in the body (BUG-09). No PNR is created, so nothing is left to clean up.

## ✅ Expected Result

```json
Only bookable offers in Search, or HTTP 409 with a mapped code and no supplier payload
```

SPEC.md 2.1 and 2.10: an offer returned by Search and confirmed by FareConfirm should be sellable.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold / Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `See the TransactionId of the 409 body`

## 📊 Severity

**Medium** — A real percentage of the offers shown to the traveller cannot be bought; the failure comes only after FareConfirm, so the customer sees it late.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Name": "050002", "Value": "External service returned error in orderViewRS (code: [911] message: [NOT AVAILABLE IN THIS CONNECTION])." } ], "OriginalSupplierRequest": "[REDACTED]", "OriginalSupplierResponse": "[REDACTED]" }
```

**Expected response (redacted):**

```json
{ "supplier": "SabreNdc", "pnr": "<real>", "bookingToken": "<real>", "...": "..." }
```

Test cases: TC-VOIDCAP-POS-07, TC-VOIDCAP-REG-05 (run 20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3). New in Round 2.

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_book_V1_RUH-CAI_5_FareConfirm_request.json` / `01_book_V1_RUH-CAI_5_FareConfirm_response.json` — book V1 RUH-CAI #5 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `02_book_V1_RUH-CAI_5_FareConfirm-retry_request.json` / `02_book_V1_RUH-CAI_5_FareConfirm-retry_response.json` — book V1 RUH-CAI #5 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `03_book_V2_RUH-CAI_10_FareConfirm_request.json` / `03_book_V2_RUH-CAI_10_FareConfirm_response.json` — book V2 RUH-CAI #10 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `04_book_V2_RUH-CAI_10_FareConfirm-retry_request.json` / `04_book_V2_RUH-CAI_10_FareConfirm-retry_response.json` — book V2 RUH-CAI #10 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `05_book_V1_RUH-CAI_14_FareConfirm_request.json` / `05_book_V1_RUH-CAI_14_FareConfirm_response.json` — book V1 RUH-CAI #14 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `06_book_V1_RUH-CAI_14_FareConfirm-retry_request.json` / `06_book_V1_RUH-CAI_14_FareConfirm-retry_response.json` — book V1 RUH-CAI #14 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `07_book_V1_RUH-CAI_17_FareConfirm_request.json` / `07_book_V1_RUH-CAI_17_FareConfirm_response.json` — book V1 RUH-CAI #17 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `08_book_V1_RUH-CAI_17_Book_request.json` / `08_book_V1_RUH-CAI_17_Book_response.json` — book V1 RUH-CAI #17 Book, `api/FlightBooking/Book`, HTTP 409
- `09_book_V1_DMM-CAI_1_FareConfirm_request.json` / `09_book_V1_DMM-CAI_1_FareConfirm_response.json` — book V1 DMM-CAI #1 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `10_book_V1_DMM-CAI_1_Book_request.json` / `10_book_V1_DMM-CAI_1_Book_response.json` — book V1 DMM-CAI #1 Book, `api/FlightBooking/Book`, HTTP 409
- `11_hold_V2_DMM-CAI_12_FareConfirm_request.json` / `11_hold_V2_DMM-CAI_12_FareConfirm_response.json` — hold V2 DMM-CAI #12 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `12_hold_V2_DMM-CAI_12_AddPassenger_request.json` / `12_hold_V2_DMM-CAI_12_AddPassenger_response.json` — hold V2 DMM-CAI #12 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `13_hold_V2_DMM-CAI_12_Hold_request.json` / `13_hold_V2_DMM-CAI_12_Hold_response.json` — hold V2 DMM-CAI #12 Hold, `api/v2/FlightBooking/Hold`, HTTP 409
- `14_hold_V2_DMM-CAI_13_FareConfirm_request.json` / `14_hold_V2_DMM-CAI_13_FareConfirm_response.json` — hold V2 DMM-CAI #13 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `15_hold_V2_DMM-CAI_13_AddPassenger_request.json` / `15_hold_V2_DMM-CAI_13_AddPassenger_response.json` — hold V2 DMM-CAI #13 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `16_hold_V2_DMM-CAI_13_Hold_request.json` / `16_hold_V2_DMM-CAI_13_Hold_response.json` — hold V2 DMM-CAI #13 Hold, `api/v2/FlightBooking/Hold`, HTTP 409
- `17_hold_V2_JED-CAI_10_FareConfirm_request.json` / `17_hold_V2_JED-CAI_10_FareConfirm_response.json` — hold V2 JED-CAI #10 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `18_hold_V2_JED-CAI_10_AddPassenger_request.json` / `18_hold_V2_JED-CAI_10_AddPassenger_response.json` — hold V2 JED-CAI #10 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `19_hold_V2_JED-CAI_10_Hold_request.json` / `19_hold_V2_JED-CAI_10_Hold_response.json` — hold V2 JED-CAI #10 Hold, `api/v2/FlightBooking/Hold`, HTTP 409
- `20_hold_V2_JED-CAI_11_FareConfirm_request.json` / `20_hold_V2_JED-CAI_11_FareConfirm_response.json` — hold V2 JED-CAI #11 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `21_hold_V2_JED-CAI_11_AddPassenger_request.json` / `21_hold_V2_JED-CAI_11_AddPassenger_response.json` — hold V2 JED-CAI #11 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `22_hold_V2_JED-CAI_11_Hold_request.json` / `22_hold_V2_JED-CAI_11_Hold_response.json` — hold V2 JED-CAI #11 Hold, `api/v2/FlightBooking/Hold`, HTTP 409
- `23_hold_V1_JED-CAI_11_FareConfirm_request.json` / `23_hold_V1_JED-CAI_11_FareConfirm_response.json` — hold V1 JED-CAI #11 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `24_hold_V1_JED-CAI_11_Hold_request.json` / `24_hold_V1_JED-CAI_11_Hold_response.json` — hold V1 JED-CAI #11 Hold, `api/FlightBooking/Hold`, HTTP 409
- `25_hold_V1_JED-CAI_17_FareConfirm_request.json` / `25_hold_V1_JED-CAI_17_FareConfirm_response.json` — hold V1 JED-CAI #17 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `26_hold_V1_JED-CAI_17_Hold_request.json` / `26_hold_V1_JED-CAI_17_Hold_response.json` — hold V1 JED-CAI #17 Hold, `api/FlightBooking/Hold`, HTTP 409
- `27_hold_V2_RUH-CAI_5_FareConfirm_request.json` / `27_hold_V2_RUH-CAI_5_FareConfirm_response.json` — hold V2 RUH-CAI #5 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `28_hold_V2_RUH-CAI_5_AddPassenger_request.json` / `28_hold_V2_RUH-CAI_5_AddPassenger_response.json` — hold V2 RUH-CAI #5 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `29_hold_V2_RUH-CAI_5_Hold_request.json` / `29_hold_V2_RUH-CAI_5_Hold_response.json` — hold V2 RUH-CAI #5 Hold, `api/v2/FlightBooking/Hold`, HTTP 409
- `30_hold_V1_CAI-RUH_15_FareConfirm_request.json` / `30_hold_V1_CAI-RUH_15_FareConfirm_response.json` — hold V1 CAI-RUH #15 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `31_hold_V1_CAI-RUH_15_FareConfirm-retry_request.json` / `31_hold_V1_CAI-RUH_15_FareConfirm-retry_response.json` — hold V1 CAI-RUH #15 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `32_hold_V2_CAI-RUH_14_FareConfirm_request.json` / `32_hold_V2_CAI-RUH_14_FareConfirm_response.json` — hold V2 CAI-RUH #14 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `33_hold_V2_CAI-RUH_14_FareConfirm-retry_request.json` / `33_hold_V2_CAI-RUH_14_FareConfirm-retry_response.json` — hold V2 CAI-RUH #14 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `34_hold_V1_CAI-RUH_16_FareConfirm_request.json` / `34_hold_V1_CAI-RUH_16_FareConfirm_response.json` — hold V1 CAI-RUH #16 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `35_hold_V1_CAI-RUH_16_FareConfirm-retry_request.json` / `35_hold_V1_CAI-RUH_16_FareConfirm-retry_response.json` — hold V1 CAI-RUH #16 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `36_hold_V2_CAI-RUH_15_FareConfirm_request.json` / `36_hold_V2_CAI-RUH_15_FareConfirm_response.json` — hold V2 CAI-RUH #15 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `37_hold_V2_CAI-RUH_15_FareConfirm-retry_request.json` / `37_hold_V2_CAI-RUH_15_FareConfirm-retry_response.json` — hold V2 CAI-RUH #15 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `38_hold_V1_CAI-RUH_17_FareConfirm_request.json` / `38_hold_V1_CAI-RUH_17_FareConfirm_response.json` — hold V1 CAI-RUH #17 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `39_hold_V1_CAI-RUH_17_FareConfirm-retry_request.json` / `39_hold_V1_CAI-RUH_17_FareConfirm-retry_response.json` — hold V1 CAI-RUH #17 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `40_hold_V2_CAI-RUH_16_FareConfirm_request.json` / `40_hold_V2_CAI-RUH_16_FareConfirm_response.json` — hold V2 CAI-RUH #16 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `41_hold_V2_CAI-RUH_16_FareConfirm-retry_request.json` / `41_hold_V2_CAI-RUH_16_FareConfirm-retry_response.json` — hold V2 CAI-RUH #16 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `42_hold_V1_CAI-RUH_18_FareConfirm_request.json` / `42_hold_V1_CAI-RUH_18_FareConfirm_response.json` — hold V1 CAI-RUH #18 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `43_hold_V1_CAI-RUH_18_FareConfirm-retry_request.json` / `43_hold_V1_CAI-RUH_18_FareConfirm-retry_response.json` — hold V1 CAI-RUH #18 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `44_hold_V2_CAI-RUH_17_FareConfirm_request.json` / `44_hold_V2_CAI-RUH_17_FareConfirm_response.json` — hold V2 CAI-RUH #17 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `45_hold_V2_CAI-RUH_17_FareConfirm-retry_request.json` / `45_hold_V2_CAI-RUH_17_FareConfirm-retry_response.json` — hold V2 CAI-RUH #17 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `46_hold_V1_CAI-RUH_19_FareConfirm_request.json` / `46_hold_V1_CAI-RUH_19_FareConfirm_response.json` — hold V1 CAI-RUH #19 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `47_hold_V1_CAI-RUH_19_FareConfirm-retry_request.json` / `47_hold_V1_CAI-RUH_19_FareConfirm-retry_response.json` — hold V1 CAI-RUH #19 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `48_hold_V2_CAI-RUH_18_FareConfirm_request.json` / `48_hold_V2_CAI-RUH_18_FareConfirm_response.json` — hold V2 CAI-RUH #18 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `49_hold_V2_CAI-RUH_18_FareConfirm-retry_request.json` / `49_hold_V2_CAI-RUH_18_FareConfirm-retry_response.json` — hold V2 CAI-RUH #18 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `50_hold_V2_CAI-RUH_19_FareConfirm_request.json` / `50_hold_V2_CAI-RUH_19_FareConfirm_response.json` — hold V2 CAI-RUH #19 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `51_hold_V2_CAI-RUH_19_FareConfirm-retry_request.json` / `51_hold_V2_CAI-RUH_19_FareConfirm-retry_response.json` — hold V2 CAI-RUH #19 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `52_hold_V1_RUH-CAI_10_FareConfirm_request.json` / `52_hold_V1_RUH-CAI_10_FareConfirm_response.json` — hold V1 RUH-CAI #10 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 200
- `53_hold_V1_RUH-CAI_10_Hold_request.json` / `53_hold_V1_RUH-CAI_10_Hold_response.json` — hold V1 RUH-CAI #10 Hold, `api/FlightBooking/Hold`, HTTP 409
- `54_hold_V2_RUH-CAI_14_FareConfirm_request.json` / `54_hold_V2_RUH-CAI_14_FareConfirm_response.json` — hold V2 RUH-CAI #14 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `55_hold_V2_RUH-CAI_14_FareConfirm-retry_request.json` / `55_hold_V2_RUH-CAI_14_FareConfirm-retry_response.json` — hold V2 RUH-CAI #14 FareConfirm-retry, `api/v2/FlightSearch/FareConfirm`, HTTP 409
- `56_hold_V1_RUH-CAI_19_FareConfirm_request.json` / `56_hold_V1_RUH-CAI_19_FareConfirm_response.json` — hold V1 RUH-CAI #19 FareConfirm, `api/FlightSearch/FareConfirm`, HTTP 409
- `57_hold_V1_RUH-CAI_19_FareConfirm-retry_request.json` / `57_hold_V1_RUH-CAI_19_FareConfirm-retry_response.json` — hold V1 RUH-CAI #19 FareConfirm-retry, `api/FlightSearch/FareConfirm`, HTTP 409
- `58_hold_V2_DMM-CAI_10_FareConfirm_request.json` / `58_hold_V2_DMM-CAI_10_FareConfirm_response.json` — hold V2 DMM-CAI #10 FareConfirm, `api/v2/FlightSearch/FareConfirm`, HTTP 200
- `59_hold_V2_DMM-CAI_10_AddPassenger_request.json` / `59_hold_V2_DMM-CAI_10_AddPassenger_response.json` — hold V2 DMM-CAI #10 AddPassenger, `api/v2/Passenger/AddPassengerDetails`, HTTP 200
- `60_hold_V2_DMM-CAI_10_Hold_request.json` / `60_hold_V2_DMM-CAI_10_Hold_response.json` — hold V2 DMM-CAI #10 Hold, `api/v2/FlightBooking/Hold`, HTTP 409

## 💥 Impact

Callers cannot tell in advance which offers are sellable; they need to retry the next offer. Round 1 saw the same effect on some CAI-JED offers (FareConfirm 409 "Downstream service") but did not file it.
