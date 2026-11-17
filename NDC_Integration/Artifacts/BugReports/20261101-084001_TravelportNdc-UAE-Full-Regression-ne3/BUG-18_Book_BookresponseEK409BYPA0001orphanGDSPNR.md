# [V1 and V2][TravelportNdc][Book] – Book response (EK 409 BYP-A0001) / orphan GDS PNR Fails Intermittently for Emirates With 409 "No Longer Available" and Leaves an Orphan Supplier PNR

## 📄 Description

EK Book intermittently returns 409 `NDC-INT-BYP-A0001` "The requested flight or class is no longer available" for an offer returned by Search and FareConfirm seconds earlier. The message says the booking is "still in the hold stage" with a GDS PNR (PNR N/A) and the body carries the raw supplier response. In a repeat test 3 of 8 EK Books failed.

Found by: TC-TPNREG-RTE-BOOK-EK-10, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V1 or V2 Search EK CAI-JED or DXB-DEL (preferredAirlines EK), FareConfirm (V2: AddPassenger).
2. Book 1 ADT, repeat a few times.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "886bc24f-2247-4175-a2b0-872469004202",
  "ErrorCode": "NDC-INT-BYP-A0001",
  "ErrorMessage": "The requested flight or class is no longer available.",
  "Context": [
    {
      "Name": "VALIDATION, PROCESS",
      "Value": "NDC integration error:Booking is still in the hold stage. No...[truncated]"
    }
  ],
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

EK-07 V1 DXB-DEL, EK-10 V1 and V2 CAI-JED (offers 1815 AED, 28/28 itemized); repeat test V1 CAI-JED, V2 CAI-JED, V1 DXB-DEL failed, V2 DXB-DEL x2, V1 DXB-DEL, V2/V1 CAI-JED passed; orphan GDS PNRs listed in Cleanup

## ✅ Expected Result

```json
Book returns 200 with pnr and tickets for the confirmed offer, or a clean mapped failure with no supplier-side PNR and no raw supplier reply
```

SPEC.md 2.9; FareConfirm just confirmed the offer. Orphan PNRs cannot be cancelled (CancelAfterHold with gdsPNR only returns 500).

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `886bc24f-2247-4175-a2b0-872469004202`

## 📊 Severity

**High** — A valid, just-confirmed offer cannot be booked about 3 times in 8 and each failure leaves a supplier PNR the API cannot cancel.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "886bc24f-2247-4175-a2b0-872469004202",
  "ErrorCode": "NDC-INT-BYP-A0001",
  "ErrorMessage": "The requested flight or class is no longer available.",
  "Context": [
    {
      "Name": "VALIDATION, PROCESS",
      "Value": "NDC integration error:Booking is still in the hold stage. No...[truncated]"
    }
  ],
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
Book returns 200 with pnr and tickets for the confirmed offer, or a clean mapped failure with no supplier-side PNR and no raw supplier reply
```

## 💥 Impact

Unreliable EK ticketing, orphaned holds at the supplier and exposed supplier data. 3 of 8 EK Book attempts in a repeat test failed; each failure leaves an orphan GDS PNR (CancelAfterHold with gdsPNR only returns 500) and exposes supplier data
