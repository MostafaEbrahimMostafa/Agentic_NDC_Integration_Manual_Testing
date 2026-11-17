# [V2][GulfAir][GetSeatMap] – isSeatMapRequired=false Does Not Stop a GetSeatMap Call From Succeeding

## 📄 Description

`GetSeatMap` returns HTTP 200 with a fully populated `seatMapDetails` even when called against an
offer whose `isSeatMapRequired` capability flag was `false` at `FareConfirm`/`AddPassenger` time,
instead of being rejected or returning an explicit "not applicable" response. **This is NOT a new
regression** — this exact result has reproduced identically on GulfAir/KSA since Round 1 — but it
has never been filed as its own numbered bug report for this supplier until now (a similarly-titled
bug exists only for a different supplier/run, `FlyAdeal-EGY`). Filed this round as `BUG-15` for
GulfAir/KSA specifically, per this round's full-coverage mandate to re-verify and formally track
every previously-logged FAIL result.

## 🔁 Steps to Reproduce

1. `FareConfirm`/`AddPassenger` for any GulfAir/KSA offer. Confirm `isSeatMapRequired: false` in the
   live capability flags (observed on all 9 independent chains sampled this round).
2. `GetSeatMap` using that offer's `ResponseId`/`selectedOfferId` anyway.

## ❌ Actual Result

```json
{ "supplier": "GulfAir", "offerId": "...", "isFareCheckRequired": false, "seatMapDetails": { "...": "fully populated, 175 cells" } }
```
(HTTP 200 — identical shape/behavior to an `isSeatMapRequired: true` offer)

## ✅ Expected Result

```json
{ "status": 409, "errorCode": "OperationNotSupported", "errorMessage": "Seat selection is not applicable for this offer." }
```
(candidate shape matching the pattern already confirmed live for `GetOfferBundles` on a
`haveBundles: false` offer, per SPEC.md §2.4)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**Low** — no financial or safety impact; GulfAir's offers in this scope always report
`isSeatMapRequired: false` while still genuinely supporting seat selection end-to-end (confirmed by
every successful `Book`-with-seat chain this round), so the flag itself may simply be
supplier-mismapped rather than the endpoint being wrong to answer. The defect is that the flag
cannot be relied upon by a caller to decide whether `GetSeatMap` is worth calling.

## 📎 Evidence

Confirmed on all 9 independent chains this round (A through H, plus the ADT+INF chain) —
`isSeatMapRequired: false` at `FareConfirm` in every case, `GetSeatMap` returning 200 with a full
seat map in every case.

## 💥 Impact

This result has been observed identically since Round 1 of this GulfAir/KSA suite but was never
separately tracked as its own bug for this supplier. Recommend either correcting GulfAir's
`isSeatMapRequired` flag mapping (if seat selection genuinely is always available, the flag is
simply wrong for this supplier) or having `GetSeatMap` itself honor the flag by rejecting calls
against `isSeatMapRequired: false` offers, matching the enforcement pattern already used by
`GetOfferBundles`.
