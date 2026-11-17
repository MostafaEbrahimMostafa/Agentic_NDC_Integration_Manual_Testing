# [V1/V2][AirIndia][Retrieve] – bookingToken and gdsPNR Not Validated in Retrieve Request

## 📄 Description

Retrieve returns the full booking (passenger names, birth dates, passport numbers, contact details) for a PNR with a wrong bookingToken, another booking's bookingToken, an empty or null token or no token at all, and with gdsPNR omitted. Only the 6-character PNR is checked, on V1 and V2

## 🔁 Steps to Reproduce

1. Create a booking (Search, FareConfirm, AddPassenger, Book) and note pnr, gdsPNR and bookingToken.
2. POST api/v2/FlightBooking/Retrieve (and V1 api/FlightBooking/RetrieveBooking) with the real pnr and bookingToken "NTExNzA1ODkyIVpaWlpaWiFmYWxzZQ--" (wrong), or with another booking's token, or with bookingToken and gdsPnr omitted, null or empty.

## ❌ Actual Result

```json
{ "pnr": "<real pnr>", "bookingToken": "<wrong token sent>" }  ->  HTTP 200, full booking returned (passengersList with names, birth dates and passport numbers, contacts, price)
```

Anyone holding the shared x-api-key can read any booking, including passport data, by guessing or enumerating PNR locators; bookingToken gives no protection

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "pnr, gdsPNR and bookingToken do not belong to the same booking" }
```

Expected per SPEC.md §2.11, 7.14 and the platform's own V2 behaviour where cited. Expected value: 400/404 structured error whenever pnr, gdsPNR and bookingToken do not belong to the same booking

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Critical** — Any caller with the shared x-api-key can read a stranger's booking, including passport numbers, from a 6-character PNR; bookingToken provides no protection.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "<real pnr>", "bookingToken": "<wrong token sent>" }  ->  HTTP 200, full booking returned (passengersList with names, birth dates and passport numbers, contacts, price)
```

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "pnr, gdsPNR and bookingToken do not belong to the same booking" }
```

Test cases: TC-AIEGY-RET-01, TC-AIEGY-RETRIEVE-NEG-02, TC-AIEGY-RETRIEVE-NEG-03 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-RET-01 (wrong token and another booking's token returned 200 with the PNR), TC-AIEGY-RETRIEVE-NEG-02 (token or gdsPnr omitted: 200), TC-AIEGY-RETRIEVE-NEG-03 (null and empty: 200)

## 💥 Impact

Anyone holding the shared x-api-key can read any booking, including passport data, by guessing or enumerating PNR locators; bookingToken gives no protection
