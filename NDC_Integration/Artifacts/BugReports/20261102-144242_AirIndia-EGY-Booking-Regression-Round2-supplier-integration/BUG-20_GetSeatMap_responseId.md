# [V2][AirIndia][GetSeatMap] – responseId Returned as the All-Zero GUID in GetSeatMap Response

## 📄 Description

GetSeatMap returns responseId 00000000-0000-0000-0000-000000000000 on every call, although SPEC 2.7 says Book may take GetSeatMap's id pair; the offerId is real. Blocked and occupied cells also carry priced entries (amount 0) in seatPriceDetailsByPassenger instead of none

## 🔁 Steps to Reproduce

1. Search, FareConfirm, AddPassenger.
2. POST api/V2/SeatMap/Seat with the AddPassenger ids.

## ❌ Actual Result

```json
"responseId": "00000000-0000-0000-0000-000000000000"
```

A client that follows the documented chaining sends the all-zero id; saved Postman Book example only works because ResponseId is ignored (BUG-02)

## ✅ Expected Result

```json
"responseId": "<a real GUID usable as the next ResponseId>"
```

Expected per SPEC.md §2.7 and the platform's own V2 behaviour where cited. Expected value: A real responseId; no price entries on blocked or occupied cells

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — A client following SPEC 2.7 and chaining GetSeatMap's id pair into Book sends an unusable id; it only works because Book ignores ResponseId (BUG-02).

## 📎 Evidence

**Actual response (redacted):**

```json
"responseId": "00000000-0000-0000-0000-000000000000"
```

**Expected response (redacted):**

```json
"responseId": "<a real GUID usable as the next ResponseId>"
```

Test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-08 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-SEATMAP-POS-02, TC-SEATMAP-VAL-08

## 💥 Impact

A client that follows the documented chaining sends the all-zero id; saved Postman Book example only works because ResponseId is ignored (BUG-02)
