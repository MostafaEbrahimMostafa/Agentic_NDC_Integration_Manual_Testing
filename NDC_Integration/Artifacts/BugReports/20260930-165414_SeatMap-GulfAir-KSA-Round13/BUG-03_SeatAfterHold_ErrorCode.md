# [V2][GulfAir][SeatAfterHold] – SeatAfterHold Rejects Every GulfAir Call With 409 OperationNotSupported (7th Confirmation)

## 📄 Description

`SeatAfterHold` rejects every call for supplier `GulfAir` with HTTP 409 `OperationNotSupported` ("GulfAir does not exist(s)") before reading any field, while GulfAir offers are Hold-capable and `Hold` succeeds. **Not a new defect** - the existing `BUG-03`, now confirmed for the **7th time**. New this round: `FareConfirmAfterHold` (`PnrReprice`) returns the same supplier-level 409 for GulfAir.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – 409 OperationNotSupported |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – 409 on 9 of 9 valid-credential calls; PnrReprice also 409 |

## 🔁 Steps to Reproduce

1. `Search` BAH→CAI 2027-05-18 (1 ADT) → `FareConfirm` → `AddPassenger` → `Hold` (200, pnr `OTANEN`).
2. `POST api/v2/SeatMap/SeatAfterHold` with `supplier: GulfAir`, `credentialsSelector: KSA`, `pnr`, `gdsPNR`, `bookingToken` from the Hold, `surName: Ibrahim`.
3. Repeat at the three candidate chain positions, with a mismatched identity, with an extra `passengersSelectedSeats` field and with a UAE selector - all return the same 409.

## ❌ Actual Result

```json
{
  "Status": 409,
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

The same envelope on all 9 calls with valid credentials, regardless of body, position or identity. `PnrReprice` returned it on 5 of 5 calls. Only the 401 checks (bad key / Client-Id) behave differently.

## ✅ Expected Result

```json
{
  "note": "200 with the seat-selection response, or a documented validation error; or GulfAir flagged as not supporting the operation before Hold is offered"
}
```

SPEC.md §2.7a documents SeatAfterHold as the Hold branch's seat-selection entry point; GulfAir offers report `canBeHeld: true`. Either the supplier registration is missing for GulfAir or the capability flags are wrong.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `6728237f-9eb2-4313-b215-9e6c262aa819`

## 📊 Severity

**High** — the Hold branch has no working seat-selection path for GulfAir, and eight test cases that depend on it cannot be evaluated.

## 📎 Evidence

**Actual response (redacted):**

```json
// SeatAfterHold, 9 of 9 calls
HTTP 409 OperationNotSupported "GulfAir does not exists"
// PnrReprice, 5 of 5 calls: same envelope
```

**Expected response (redacted):**

```json
HTTP 200 (or a documented validation error) for a valid Held PNR
```

Source: `TC-SEATAFTERHOLD-POS-01` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

VAL-01, NEG-01, NEG-02, VAL-02, INT-04 and the candidate flows cannot be evaluated, and the SeatAfterHold contract and its position in the Hold chain stay UNKNOWN. Held bookings `OTANEN` and `OOESWB` were left behind by this case.
