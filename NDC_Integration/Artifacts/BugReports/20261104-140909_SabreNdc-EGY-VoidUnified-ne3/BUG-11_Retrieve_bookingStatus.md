# [V1/V2][SabreNdc][Retrieve] – bookingStatus Returned Incorrect Value (OnHold) After CancelAfterHold in Retrieve Response

## 📄 Description

After CancelAfterHold returns `cancelled: true`, Retrieve of the booking still returns HTTP 200 (V2 `bookingStatus: "OnHold"`, `voidCapability: "None"`).

## 🔁 Steps to Reproduce

1. Search CAI-JED (SabreNdc/EGY, 1 ADT) -> FareConfirm -> (V2: AddPassengerDetails ->) Hold.
2. POST CancelAfterHold.
3. POST Retrieve with the same ids.

## ❌ Actual Result

```json
CancelAfterHold: HTTP 200 { "cancelled": true }
Retrieve: HTTP 200 { "bookingStatus": "OnHold", "voidCapability": "None", ... }
```

Recurrence of the 2026-10-22 behaviour; clients cannot see that the hold is gone.

## ✅ Expected Result

```json
A terminal error, or a cancelled status with "voidCapability": "VoidNotAllowed"
```

SPEC.md 2.14 and 6.3 Family F: a cancelled hold is terminal.

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `SabreNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — A cancelled hold looks live to the client, which can lead to wrong follow-up actions.

## 📎 Evidence

**Actual response (redacted):**

```json
CancelAfterHold: HTTP 200 { "cancelled": true }
Retrieve: HTTP 200 { "bookingStatus": "OnHold", "voidCapability": "None", ... }
```

**Expected response (redacted):**

```json
A terminal error, or a cancelled status with "voidCapability": "VoidNotAllowed"
```

Test cases: TC-VOIDCAP-INT-02 (run 20261104-140909_SabreNdc-EGY-VoidUnified-ne3).

## 💥 Impact

Recurrence of the 2026-10-22 behaviour; clients cannot see that the hold is gone.
