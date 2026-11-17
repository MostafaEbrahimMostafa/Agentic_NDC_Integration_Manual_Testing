# [V2][GulfAir][Hold] – holdExpirationDate Returned as Null in Hold Response

## 📄 Description

The field `holdExpirationDate` is returned as `null` in the `Hold` response for GulfAir. This field
should contain a valid future datetime to ensure a caller can determine when a Held (not yet
finalized) booking expires.

## 🔁 Steps to Reproduce

1. Search (GulfAir, KSA) BAH→JED, select the first offer.
2. FareConfirm the offer (`canBeHeld: true` confirmed live).
3. AddPassenger with one ADT passenger.
4. Hold using `fareConfirmResponseId`/`selectedOfferId` = AddPassenger's `responseId`/`offerId`,
   `supplier: "GulfAir"`, `credentialsSelector: "KSA"`.

## ❌ Actual Result

```json
"holdExpirationDate": null
```

Reproduced twice, on two independent Hold calls (pnr `PCVQIO` and pnr `RVSRGO`).

## ✅ Expected Result

```json
"holdExpirationDate": "2026-08-26T10:00:00Z"
```

(Illustrative — a real future ISO-8601 datetime reflecting this supplier's actual hold TTL.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Medium** — non-blocking (the Hold itself succeeds and produces a usable `pnr`/`bookingToken`),
but it breaks every downstream consumer that needs to know when a Held GulfAir PNR expires:
`FareConfirmAfterHold`/`BookAfterHold` timing logic, automated expiry-based cleanup, and this
project's own Family-B hold-hygiene tracking (SPEC.md §6, §7) all lose their signal for this
supplier.

## 📎 Evidence

**Actual response (redacted):**

```json
{"pnr": "PCVQIO", "holdExpirationDate": null}
```

```json
{"pnr": "RVSRGO", "holdExpirationDate": null}
```

**Expected response (redacted):**

```json
{"pnr": "PCVQIO", "holdExpirationDate": "2026-08-26T10:00:00Z"}
```

## 💥 Impact

Every Hold-branch flow for GulfAir loses the ability to programmatically track when a Held PNR
expires. Two GulfAir PNRs were left Held during this run (`PCVQIO`, `RVSRGO`) with no way to
determine — from the API alone — when they will lapse, which directly blocks any automated
expiry-based cleanup process and the project's own timing-sensitive test cases (SPEC.md §6.5-style).
