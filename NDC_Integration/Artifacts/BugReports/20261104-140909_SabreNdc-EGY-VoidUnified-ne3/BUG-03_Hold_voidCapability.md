# [V1/V2][SabreNdc][Hold] – voidCapability Returned as "None" Instead of VoidNotAllowed for Held and Cancelled Bookings

## 📄 Description

Hold, Retrieve of a held booking and Retrieve after CancelAfterHold return `voidCapability: "None"`. The unified contract has only two values; a booking that cannot be voided must report `VoidNotAllowed`.

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. Read voidCapability in the Hold response and in Retrieve.
3. POST CancelAfterHold, then Retrieve again.

## ❌ Actual Result

```json
// Hold, held Retrieve, cancelled Retrieve (V1 and V2)
"voidCapability": "None"
```

Clients cannot treat the field as a two-value enumeration; "None" also appears on ticketed Retrieve and BookAfterHold (BUG-01, BUG-02).

## ✅ Expected Result

```json
"voidCapability": "VoidNotAllowed"
```

AC Common Interface / Consistency: one literal per state; values outside {FullVoidOnlyAllowed, VoidNotAllowed} are mapping leaks (SPEC.md 8.3).

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — A third, undocumented literal leaks through the Common Interface and no endpoint ever reports VoidNotAllowed for a held booking.

## 📎 Evidence

**Actual response (redacted):**

```json
// Hold, held Retrieve, cancelled Retrieve (V1 and V2)
"voidCapability": "None"
```

**Expected response (redacted):**

```json
"voidCapability": "VoidNotAllowed"
```

Test cases: TC-VOIDCAP-INT-02, TC-VOIDCAP-VAL-03, TC-VOIDCAP-VAL-10 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Clients cannot treat the field as a two-value enumeration; "None" also appears on ticketed Retrieve and BookAfterHold (BUG-01, BUG-02).
