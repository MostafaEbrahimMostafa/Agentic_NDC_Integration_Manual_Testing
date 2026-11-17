# [V2][GulfAir][Multiple Endpoints] – Plaintext Supplier Credential Leak in Error Envelopes, Now Confirmed on a Third Endpoint

## 📄 Description

Certain conflict/generic-error responses include raw `OriginalSupplierRequest`/
`OriginalSupplierResponse` fields containing the live supplier adapter's plaintext SOAP request,
which itself embeds an `apiKey`-class security-header field. This is the **6th consecutive round**
this defect has reproduced. **NEW this round:** the identical leak pattern was also observed on
`Hold`'s own duplicate-booking-conflict path (HTTP 409, `NDC-INT-UNC-Z9999`, "This booking has
already been created (609)"), confirming the leak now spans at least **three** distinct
endpoints'/error-paths' responses: `Book`'s duplicate-submission conflict (Rounds 1-3+), the
`GetSeatMap` generic-outage envelope (Round 4, `BUG-14`'s window), and now `Hold`'s
duplicate-booking-conflict envelope (Round 5).

## 🔁 Steps to Reproduce

1. **Book path (reconfirmed this round):** `Book` an offer successfully (pnr `RPRJFQ`). Resubmit
   the identical `Book` request (same `ResponseId`/`selectedOfferId`/seat selection) a second time.
2. **Hold path (NEW this round):** `GetSeatMap` a fresh offer, then submit a `Hold` request that
   also includes `passengersSelectedSeats` (per `BUG-08`) against that same offer a second time
   after the first `Hold` already created a real order.

## ❌ Actual Result

Both paths return an HTTP 409 envelope containing `OriginalSupplierRequest`/
`OriginalSupplierResponse` fields. The `OriginalSupplierRequest` field is a raw SOAP XML document
containing a `<SecurityHeader>` block with an `<apiKey>` element populated with what appears to be a
live, plaintext credential value for the underlying TPConnects/GulfAir supplier adapter.

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [{ "Value": "This booking has already been created (609).  Please check on the Order Management page to confirm." }],
  "OriginalSupplierRequest": "<soapenv:Envelope ...><SecurityHeader ...><apiKey>[REDACTED - live credential, not reproduced per SPEC.md §7.14]</apiKey>...",
  "OriginalSupplierResponse": "[REDACTED - not reproduced per SPEC.md §7.14]"
}
```

## ✅ Expected Result

`OriginalSupplierRequest`/`OriginalSupplierResponse` (or any field carrying supplier-adapter
credentials) should never be included in any client-facing error envelope, on any endpoint. If
these fields are needed for internal diagnostics, they should be logged server-side only, or
credential-bearing sub-fields should be masked/stripped before serialization to the caller.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir` (this round's new evidence is via the TPConnects adapter)
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book` (duplicate-submission conflict), `Hold` (duplicate-booking conflict, NEW),
  `GetSeatMap` (generic outage envelope, Round 4)
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Present in both occurrences observed this round (not reproduced here)

## 📊 Severity

**Critical** — live, valid supplier-side API credentials are exposed in plaintext to any API caller
who happens to trigger any one of at least three distinct conflict/error paths. This is a real
credential-leak vulnerability, not a cosmetic response-shape issue.

## 📎 Evidence

Resubmitted `Book` request (already-consumed offer, pnr `RPRJFQ`'s chain) returned HTTP 409 with
`OriginalSupplierRequest`/`OriginalSupplierResponse` keys present; pattern-matched for
`apiKey`-class content (present, value not reproduced here). A second `Hold` attempt against an
already-Held offer returned the identical `OriginalSupplierRequest` structure with a
`SecurityHeader`/`apiKey` element (value likewise not reproduced), confirming the leak is not
scoped to `Book` alone.

## 💥 Impact

Confirmed unchanged and **re-widened** across Round 1 through Round 5 — this is a systemic
response-serialization issue affecting multiple endpoints' generic/conflict-error paths, not a
single narrow code path. This has now reproduced identically for 6 consecutive rounds without a
fix. Recommend immediate, cross-endpoint remediation (strip/mask `OriginalSupplierRequest`/
`OriginalSupplierResponse` — or any field containing them — from every client-facing error
response, project-wide) rather than a per-endpoint patch.
