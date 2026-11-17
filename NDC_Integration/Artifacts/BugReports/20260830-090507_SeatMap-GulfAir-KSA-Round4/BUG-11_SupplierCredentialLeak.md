# [V2][GulfAir][Book, GetSeatMap] – OriginalSupplierRequest Leaks Plaintext Supplier Credentials on Generic Error Responses

## 📄 Description

Resubmitting an already-consumed `Book` request returns HTTP 409 with `OriginalSupplierRequest`/
`OriginalSupplierResponse` fields present in the error body (first confirmed Round 2, reconfirmed
identically every round since). **New this round:** the exact same leak pattern was also observed,
repeatedly, on `GetSeatMap`'s generic-error envelope during this round's separate `NDC-INT-UNC-Z9999`
supplier-side outage (see BUG-14) — every single one of the 25+ failed `GetSeatMap` calls captured
during that outage window returned a full raw SOAP `OriginalSupplierRequest` body, confirmed via a
redacted keyword match to contain a plaintext `apiKey`-class field. This widens the defect from "a
rare double-booking-conflict edge case on one endpoint" to "any generic supplier-side error on at
least two endpoints unconditionally leaks the raw upstream SOAP request."

## 🔁 Steps to Reproduce

**Book (original steps, reconfirmed):**
1. `AddPassenger` → `GetSeatMap` → `Book` for a fresh GulfAir/KSA offer with a seat selected
   (`isDebug` never set to `true` anywhere in the originating `Search` call).
2. Resubmit the **exact same** `Book` request body a second time (same `ResponseId`/
   `selectedOfferId`/`passengersSelectedSeats`).
3. Inspect the HTTP 409 error body's field list (not its content — see the redaction note below).

**GetSeatMap (new this round):**
1. `AddPassenger` → `GetSeatMap` for any GulfAir/KSA offer during a window where the supplier
   connection is degraded (this round: HTTP 409 `NDC-INT-UNC-Z9999`, "Unknown error").
2. Inspect the error body's field list.

## ❌ Actual Result

Book (resubmission), reconfirmed this round:

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "OriginalSupplierRequest": "[PRESENT — 6300 characters, confirmed via a redacted keyword match only (never printed) to contain an apikey-like plaintext token]",
  "OriginalSupplierResponse": "[PRESENT]"
}
```

GetSeatMap (generic supplier-error path), new this round, observed on ~25 independent calls:

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "Unknown", "Value": "Error description not available" }],
  "OriginalSupplierRequest": "<soapenv:Envelope ...><SecurityHeader><agent>WON</agent><apiKey>[PLAINTEXT VALUE PRESENT — never printed or persisted anywhere in this run's artifacts]</apiKey>...</SecurityHeader>..."
}
```

**Redaction note (per this defect's history):** neither field's actual content was printed, saved,
or logged anywhere in this run's artifacts, this report, the QA report, or the JSONL log — only each
field's presence, a representative length, and a boolean keyword-match result were ever inspected or
recorded.

## ✅ Expected Result

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [{ "Name": "Unknown", "Value": "Error description not available" }]
}
```

(`OriginalSupplierRequest`/`OriginalSupplierResponse` omitted entirely from any caller-facing error
response on any endpoint, or at minimum with credential-bearing fields — the SOAP `SecurityHeader`'s
`apiKey`, or equivalent — redacted server-side before the field is ever serialized into an HTTP
response body.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`, `GetSeatMap` (both affected)
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Multiple; representative sample `70d93b12-424e-4e6f-a227-5527ad253a90` (GetSeatMap outage-path leak)

## 📊 Severity

**Critical** — a live, working supplier credential pair is disclosed in what this run confirms is an
**unconditional** code path affecting at least two endpoints: `isDebug` was never set to `true` on
any `Search` call this round, and the leak still occurred every single time the underlying supplier
call failed generically, not just on the narrower double-booking-conflict scenario. Because this
round's supplier-side outage made the generic-error path trigger dozens of times, this is now
confirmed to be a systemic response-serialization issue (any unhandled/generic supplier exception
appears to attach the raw SOAP request to the HTTP response), not a narrow edge case — meaning it is
far more likely to occur in production than previously assessed.

## 📎 Evidence

**Actual response (redacted per this report's own rule — the credential value itself is never
reproduced, here or in any of this run's persisted artifacts):**

```json
{
  "Status": 409,
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "OriginalSupplierRequest": "[REDACTED — present on both Book's resubmission-conflict path and GetSeatMap's generic-error path this round, confirmed via keyword-match only to contain an apikey-class token — see SPEC.md §7.14]"
}
```

**Expected response (redacted):**

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999" }
```

## 💥 Impact

Confirmed unconditionally reproducing for the 4th consecutive round on `Book`, and newly confirmed
this round to also affect `GetSeatMap` on a completely different failure path (a live, real supplier
connectivity/reliability incident, see BUG-14, not a deliberately engineered test scenario) — meaning
this is not isolated to one code path or one deliberately-triggered scenario. This remains the
single highest-severity open defect across all four rounds, and its scope just grew. Recommend:
(1) immediate server-side fix to strip `OriginalSupplierRequest`/`OriginalSupplierResponse` from
**every** caller-facing error response across **every** endpoint, regardless of `isDebug` or which
internal exception path produced the error, and (2) escalate to the security/platform team to
consider rotating the affected agency's GulfAir/TPConnects credentials as a precaution, independent
of and prior to the code fix landing, given how easily and frequently this leak was triggered this
round (organically, via a live third-party outage, not a crafted attack).
