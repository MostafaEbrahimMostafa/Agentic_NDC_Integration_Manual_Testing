# [V2][TravelportNdc][Book] – selectedOffer.passengerFareBreakdown[].paxBaseAmount / paxTotalTaxAmount Returned as Per-Type Totals Instead of Per-Passenger Amounts

## 📄 Description

V2 Book returns passengerFareBreakdown amounts that are already multiplied by the passenger count, unlike V1 Book, FareConfirm and Search which are per passenger. 2 ADT: V2 Book base 1380 / tax 830 per ADT entry vs FareConfirm 690 / 415, with totalAmount 2210. 24 test cases fail only on V2 Book price reconciliation (V1 Book reconciles).

Found by: TC-TPNREG-PAX-BOOK-QR-200, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V2 Search QR DOH-DXB, 2 ADT; FareConfirm; AddPassenger (2 ADT).
2. V2 Book.
3. Compute sum((paxBaseAmount + paxTaxAmount) x count) and compare with priceDetails.totalAmount.

## ❌ Actual Result

```json
"passengerFareBreakdown": [ { "passengerTypeCode": "ADT", "paxBaseAmount": 1380, "paxTotalTaxAmount": 830 } ],
"priceDetails": { "totalAmount": 2210 }
// base x count + tax x count = 4420 != 2210
```

2 ADT QR DOH-DXB: V2 Book breakdown base 1380 / tax 830 per ADT entry vs FareConfirm 690 / 415; totalAmount 2210. 23 test cases fail only on V2 Book price reconciliation: TC-TPNREG-PAX-BOOK-QR-202, TC-TPNREG-PAX-BOOK-QR-200, TC-TPNREG-PAX-BOOK-QR-211, TC-TPNREG-PAX-BOOK-QR-300, TC-TPNREG-PAX-BOOK-QR-222, TC-TPNREG-PAX-BOOK-QR-400, TC-TPNREG-PAX-BOOK-EK-222, TC-TPNREG-PAX-BOOK-QR-333, TC-TPNREG-PAX-BOOK-QR-500, TC-TPNREG-PAX-BOOK-QR-600, TC-TPNREG-PAX-BOOK-QR-440, TC-TPNREG-PAX-BOOK-QR-700, TC-TPNREG-PAX-BOOK-RJ-222, TC-TPNREG-PAX-BOOK-QR-404, TC-TPNREG-PAX-BOOK-QR-800, TC-TPNREG-PAX-BOOK-QR-180, TC-TPNREG-PAX-BOOK-QR-900, TC-TPNREG-PAX-BOOK-QR-270, TC-TPNREG-PAX-BOOK-QR-540, TC-TPNREG-PAX-BOOK-QR-414, TC-TPNREG-PAX-BOOK-QR-210, TC-TPNREG-PAX-BOOK-QR-504, TC-TPNREG-PAX-BOOK-QR-252. V1 Book reconciles in every case

## ✅ Expected Result

```json
"passengerFareBreakdown": [ { "passengerTypeCode": "ADT", "paxBaseAmount": 690, "paxTotalTaxAmount": 415 } ],
"priceDetails": { "totalAmount": 2210 }
```

SPEC.md 2.1 reconciliation formula; V2 FareConfirm and V1 Book use per-passenger amounts.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — Money fields change meaning between endpoints; a consumer following SPEC 2.1 over-counts the fare by the passenger count.

## 📎 Evidence

**Actual response (redacted):**

```json
"passengerFareBreakdown": [ { "passengerTypeCode": "ADT", "paxBaseAmount": 1380, "paxTotalTaxAmount": 830 } ],
"priceDetails": { "totalAmount": 2210 }
// base x count + tax x count = 4420 != 2210
```

**Expected response (redacted):**

```json
"passengerFareBreakdown": [ { "passengerTypeCode": "ADT", "paxBaseAmount": 690, "paxTotalTaxAmount": 415 } ],
"priceDetails": { "totalAmount": 2210 }
```

## 💥 Impact

Per-type amounts mean different things on V2 Book; invoices or fare displays built from them are wrong for any party of two or more of a type. A consumer applying base x count double counts: for 2 ADT it computes 4420 against a real total of 2210 (and 8 times too much for 9 ADT)
