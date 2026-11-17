# [V1][V2][SabreNdc][Retrieve] – bookingStatus Returned Incorrect Value (OnHold) in Retrieve Response After CancelAfterHold

## 📄 Description

After a SabreNdc hold is cancelled with CancelAfterHold (`{cancelled: true, message: "Held Order Is Cancelled"}`), Retrieve still returns 200. V2 reports `bookingStatus: "OnHold"`, with `holdExpirationDate` null and a total of 0. V1 gives no cancelled signal at all.

Found by: TC-VOID-BIZ-04, QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. V2 Search -> FareConfirm -> AddPassenger -> Hold (SabreNdc/EGY) - pnr TFHFMB (V1: OXXYGW).
2. POST CancelAfterHold - 200 cancelled true.
3. POST Retrieve.

## ❌ Actual Result

```json
{
  "pnr": "TFHFMB",
  "bookingStatus": "OnHold",
  "holdExpirationDate": null,
  "tickets": null
}
```

HTTP 200; selectedOffer total 0.

## ✅ Expected Result

```json
{
  "pnr": "TFHFMB",
  "bookingStatus": "Cancelled"
}
```

SPEC.md §2.14 documents a terminal result after cancel (409 NDC-INT-BYP-A0003 "Reservation is already cancelled" for another supplier). A cancelled hold must not report OnHold.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Hold/expiry tracking and cleanup jobs see a cancelled hold as still live.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "pnr": "TFHFMB",
  "bookingStatus": "OnHold",
  "holdExpirationDate": null,
  "tickets": null
}
```

**Expected response (redacted):**

```json
{
  "pnr": "TFHFMB",
  "bookingStatus": "Cancelled"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-VOID-BIZ-04).

## 💥 Impact

Monitoring that polls Retrieve keeps cancelled holds on its active list and may try to ticket or cancel them again.
