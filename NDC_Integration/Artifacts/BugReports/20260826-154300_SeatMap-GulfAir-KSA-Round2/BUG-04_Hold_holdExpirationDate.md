# [V2][GulfAir][Hold] – holdExpirationDate Returned as Null in Hold Response

## 📄 Description

The field `holdExpirationDate` is returned as `null` in the `Hold` response for GulfAir. This field
should contain a valid future timestamp so callers/automation can determine when a Held PNR expires.
Second-run reproduction of a Round 1 (2026-08-25) finding, unchanged one day later, and reconfirmed
on 3 independent fresh Holds this run.

## 🔁 Steps to Reproduce

1. `AddPassenger` for a fresh GulfAir/KSA offer.
2. `POST api/v2/FlightBooking/Hold` with `{"fareConfirmResponseId":"...","selectedOfferId":"...","supplier":"GulfAir","credentialsSelector":"KSA"}`.
3. Inspect `holdExpirationDate` in the response.

## ❌ Actual Result

```json
"holdExpirationDate": null
```

No caller/downstream system can compute when this Held PNR actually expires from the API response
alone.

## ✅ Expected Result

```json
"holdExpirationDate": "2026-11-20T23:59:00Z"
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 responses carry no TransactionId/error envelope)

## 📊 Severity

**Medium** — non-blocking for booking itself, but breaks downstream cleanup/expiry tracking: nobody
consuming this API can tell when a GulfAir Hold will lapse, which also makes `TC-SEATAFTERHOLD-NEG-02`
(rejecting a call made after expiry) permanently untestable for this supplier.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "PAFNVL", "bookingToken": "[REDACTED]", "holdExpirationDate": null }
```

**Expected response (redacted):**

```json
{ "pnr": "PAFNVL", "bookingToken": "[REDACTED]", "holdExpirationDate": "2026-11-20T23:59:00Z" }
```

## 💥 Impact

Reconfirmed on 3 independent fresh Holds this run (pnr PAFNVL, PABXQM, PTCQRH), all `null`. Any
automated cleanup job relying on `holdExpirationDate` to know when a staging PNR safely self-expires
has no signal to act on, forcing manual/best-guess expiry tracking for every GulfAir Hold this suite
produces.
