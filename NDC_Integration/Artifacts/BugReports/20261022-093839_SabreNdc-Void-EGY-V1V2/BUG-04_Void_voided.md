# [V1][V2][SabreNdc][Void] – Repeat Void Returns voided true Instead of an Already-Voided Error

## 📄 Description

Sending the same Void a second time for an already-voided SabreNdc booking returns HTTP 200 `voided: true` again (in ~1.5s, versus ~10s for the real void). At the same moment Retrieve reports the trip as already cancelled.

Found by: TC-VOID-BIZ-02, QA run `20261022-093839_SabreNdc-Void-EGY-V1V2` (2026-10-22).

## 🔁 Steps to Reproduce

1. Book SabreNdc/EGY, 1 ADT (V1 TFZFYS / V2 TKTQQW).
2. POST Void (succeeds).
3. POST the identical Void again.

## ❌ Actual Result

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572135118444", "carrierCode": "QR" } ]
}
```

HTTP 200 on both versions for the second call.

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "AlreadyVoided",
  "ErrorMessage": "Tickets on this booking are already voided"
}
```

SPEC.md §2.15 Negative Cases lists "Void twice on the same ticket"; TC-VOID-BIZ-02 expects a 4xx rejection.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `SabreNdc` (Qatar Airways content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Void`
- **Environment:** `staging (STAG_ENV)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — No data is corrupted, but callers cannot tell a real void from a repeat.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "voided": true,
  "voidedTickets": [ { "ticketStatus": "Voided", "ticketNumber": "1572135118444", "carrierCode": "QR" } ]
}
```

**Expected response (redacted):**

```json
{
  "Status": 409,
  "ErrorCode": "AlreadyVoided",
  "ErrorMessage": "Tickets on this booking are already voided"
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261022-093839_SabreNdc-Void-EGY-V1V2.html` (TC-VOID-BIZ-02).

## 💥 Impact

Retry logic and reconciliation jobs treat a duplicate as a fresh successful void, which can double-count refunds or void events. The response contradicts Retrieve, which already reports the trip as cancelled.
