# [V1 and V2][TravelportNdc][Book] – passengersList[].birthDate vs passengerTypeCode Passenger Age Not Validated; Supplier Rejects With Unmapped 409 and an Orphan GDS PNR

## 📄 Description

A child with an adult birth date (1990-01-01) and an infant with a 5-year-old birth date pass AddPassenger (V2 200) and V1 Book validation. Book fails at the supplier with 409 `NDC-INT-UNC-Z9999` naming a GDS PNR (PNR N/A) and the raw supplier reply.

Found by: TC-TPNREG-PAX-BNEG-05, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. Search 1 ADT + 1 CHD (QR DOH-DXB); FareConfirm.
2. V1 Book (V2: AddPassenger then Book) with the CHD birthDate 1990-01-01.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "28beb90a-8359-4e55-8265-fef8dc50a586",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "NDC integration error:Booking is still in the hold stage. No...[truncated]"
    }
  ],
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

PAX-BNEG-05 (CHD born 1990-01-01) and PAX-BNEG-06 (INF born 2021-06-01): V1 Book 409 Z9999, V2 AddPassenger 200 then Book 409 Z9999, orphan GDS PNRs JJ0R4Y, JJ0R4Z, JJ0R50, JJ0R52 and the re-run pair

## ✅ Expected Result

```json
400 validation error naming birthDate / passenger type at AddPassenger or Book, no supplier-side PNR
```

TC-TPNREG-PAX-BNEG-05/06; SPEC.md 2.5 negative cases.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `28beb90a-8359-4e55-8265-fef8dc50a586`

## 📊 Severity

**Medium** — Bad age data is only caught by the supplier, surfaces as Z9999 and leaves an uncancellable PNR.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "Status": 409,
  "TransactionId": "28beb90a-8359-4e55-8265-fef8dc50a586",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [
    {
      "Name": "VALIDATION",
      "Value": "NDC integration error:Booking is still in the hold stage. No...[truncated]"
    }
  ],
  "OriginalSupplierResponse": "[REDACTED - raw supplier payload, per SPEC.md 7.14]"
}
```

**Expected response (redacted):**

```json
400 validation error naming birthDate / passenger type at AddPassenger or Book, no supplier-side PNR
```

## 💥 Impact

Orphan supplier PNRs and unmapped errors for a client-side data fault. Bad age data creates supplier-side PNRs that the API cannot cancel and surfaces as an unmapped error
