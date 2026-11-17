# [V2][GulfAir][SeatAfterHold] – SeatAfterHold Rejects Every GulfAir Call With 409 OperationNotSupported (9th Confirmation)

## 📄 Description

`SeatAfterHold` rejects **every** call for supplier GulfAir with HTTP 409 `OperationNotSupported` ("GulfAir does not exists") before reading any field, while GulfAir offers are Hold-capable and `Hold` succeeds. `FareConfirmAfterHold` (`PnrReprice`) is rejected the same way. **Not a new defect** - the existing `BUG-03`, now confirmed for the **9th time**. (The context text changed from "does not exist(s)" in Round 13 to "does not exists"; the error code is the same.)

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – 409 OperationNotSupported at every position |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – 409 on 9 of 9 calls; PnrReprice 409 on 5 of 5 |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised |
| 18 | 2026-10-10 | FAIL – reproduced (see the Round 18 report) |
| 19 | 2026-10-10 | Not exercised (Round 19 was a targeted 6-case run) |
| 20 | 2026-10-10 | FAIL – 409 on 9 of 9 calls; PnrReprice 409 on 4 of 4 |

## 🔁 Steps to Reproduce

1. `Search` BAH→CAI 2027-04-25 (1 ADT) → `FareConfirm` → `AddPassenger` → `Hold` (pnr `ONKNUD`).
2. `SeatAfterHold` with the collection's 6-field body: `supplier`, `credentialsSelector`, `pnr`, `gdsPNR` (`""`), `bookingToken`, `surName`.
3. Repeat after `PnrReprice`, after `BookAfterHold`, with a mismatched/stale identity and with an extra `passengersSelectedSeats` field - the response never changes.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "3207bf37-0b7b-4179-869e-930ad0597974",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [
    {
      "Name": "OperationNotSupported",
      "Value": "GulfAir does not exists"
    }
  ]
}
```

HTTP 409 in 0.1 seconds, identical for every body, position and identity. `PnrReprice` returns the same envelope.

## ✅ Expected Result

```json
{
  "status": 200,
  "seatMapDetails": "..."
}
```

`SeatAfterHold` should return the seat-selection response (or a documented validation error), or GulfAir should be flagged as not supporting the operation before `Hold` is offered (SPEC.md §2.7a, §5.5 item 8). The exact success shape is UNKNOWN because it can never be reached.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `3207bf37-0b7b-4179-869e-930ad0597974`

## 📊 Severity

**High** — the Hold branch has no working seat-selection path for GulfAir, and several dependent cases cannot be evaluated.

## 📎 Evidence

**Actual response (redacted):**

```json
// SeatAfterHold on Hold ONKNUD
HTTP 409 OperationNotSupported "GulfAir does not exists"
// PnrReprice on Holds OVGNSV, OOOVSW, OWWFJV, OPRVTD
HTTP 409 OperationNotSupported
```

**Expected response (redacted):**

```json
HTTP 200 seat-selection response, or an up-front capability flag
```

Source: `TC-SEATAFTERHOLD-POS-01` in [QA report](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md).

## 💥 Impact

The Hold branch has no working seat-selection path for GulfAir, so six dependent test cases (VAL-01, NEG-01, NEG-02, VAL-02, INT-04, the candidate flows) cannot be evaluated, and the documented Family B chain cannot be followed step by step. Holds `ONKNUD` and `TLXPSP` are left open (no expiry is known - see BUG-04).
