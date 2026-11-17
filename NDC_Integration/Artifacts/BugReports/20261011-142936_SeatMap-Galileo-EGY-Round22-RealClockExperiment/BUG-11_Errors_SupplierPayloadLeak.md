# [V2][Galileo][GetSeatMap, Book] – OriginalSupplierRequest/Response Leak on Generic Error Responses (9th Confirmation)

## 📄 Description

Generic supplier-side error responses carry `OriginalSupplierRequest` and `OriginalSupplierResponse` (raw upstream payloads) although `isDebug` was never set: the `GetSeatMap` 409 for NE and XY flights and every one of the 10 failed `Book` 409s. A pre-run probe of the same NE call showed a raw Travelport `SeatMapReq` SOAP envelope with branch/authorisation attributes. Values are deliberately **not** recorded in any artifact. **Not a new defect** - existing `BUG-11`.

## History

| Round | Date | Result |
|---|---|---|
| 2-13 | 2026-08-26 .. 2026-09-30 | Reconfirmed on GulfAir (8 confirmations) |
| 15-21 | 2026-10-05 .. 2026-10-11 | Not exercised (no generic supplier error occurred) |
| 22 | 2026-10-11 | FAIL - **Galileo**, 9th confirmation |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-12-29 -> `FareConfirm` (NE flight) -> `AddPassenger` -> `GetSeatMap`.
2. Inspect the field list of the 409 body (not its content).

## ❌ Actual Result

```json
{ "Status": 409, "TransactionId": "...", "ErrorCode": "NDC-INT-UNC-Z9999", "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "101", "Value": "Seat Map is unavailable - Seat Map is unavailable" }],
  "OriginalSupplierRequest": "[PRESENT - content not recorded]", "OriginalSupplierResponse": "[PRESENT - content not recorded]" }
```

## ✅ Expected Result

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [{ "Name": "101", "Value": "Seat Map is unavailable" }] } // without the two Original* fields
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap, Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `bd96152f-77bf-4465-ac99-d1d8373f4985`

## 📊 Severity

**High** — raw supplier requests (including authorisation attributes) are returned to every caller on any supplier error.

## 📎 Evidence

NE GetSeatMap 409 and XY GetSeatMap 409: body fields Status, TransactionId, ErrorCode, ErrorMessage, Context, OriginalSupplierRequest, OriginalSupplierResponse; same on 10 of 10 failed Book calls.

Source: `TC-SEATMAP-NEG-05` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

Raw upstream requests, including supplier connection attributes, are exposed to any caller whenever a supplier call fails.
