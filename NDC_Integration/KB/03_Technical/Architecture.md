# Architecture (QA view)

The contract-level architecture is in SPEC.md §1.3 (layers), §1.4 (V1 vs V2), §1.5 (auth) and
§3 (integration / ID lifecycle). This page adds what QA has **observed** about how the system
behaves, so you can read responses and errors correctly.
Run keys in `Last verified` lines (e.g. `GAL-R1`) are defined in each supplier file's Run history.

## 1. Layers and where things go wrong

```
Caller (Postman / harness / skill)
   │  headers: x-api-key + Client-Id (static, same for all suppliers)
   ▼
NDC Integration API  ── routing by URL (V1 / V2) ── validation ── supplier dispatch by body `supplier`
   │                     │                           │
   │                     │ 400 camelCase `1001`       │ 400/409 PascalCase `NDC-INT-TEC-A0001`
   │                     │ (model binding)            │ (business predicates)
   ▼
Supplier adapter  ── 409 OperationNotSupported "<Supplier> does not exists" (no implementation)
   │
   ▼
Supplier back end (NDC / GDS SOAP / Navitaire)
   └─ unmapped failures surface as 409 `NDC-INT-UNC-Z9999` (often with ErrorMessage == ErrorCode,
      sometimes with the raw supplier payload — a known leak pattern)
```

| Symptom | Usually means | Verdict |
|---|---|---|
| 409 `OperationNotSupported` | Adapter has no implementation for this endpoint | BLOCKED (capability), unless SPEC says supported → defect |
| 409 `NDC-INT-UNC-Z9999` | Supplier rejected or timed out; API did not map it | Read Context; transient → retry once; deterministic → defect "unmapped error" |
| 200 with `offers: []` | No inventory, or silent supplier failure, or sold out | Re-check before concluding (Lessons L-06) |
| 400 with `.NET` / `*Dto` type names | Binding error leaking internals | Defect (recurring on most suppliers) |
| HTTP 500 for ~20 s on every call | Deployment in progress | Stop, wait, note build change (Lessons L-04) |
| Long constant latency (~15 s) then empty | Supplier timeout swallowed | Defect candidate |

- Supplier selection happens in the **body**, not the headers; auth is identical for all suppliers. — Last verified: 2026-11-10 / ne-4 / GAL-R1
- V1 routes to the adapter **before** validation (unsupported V1 endpoint answers 409 even for an invalid body). — Last verified: 2026-10-26 / ne-5 / TPN-VOID1
- The server issues its own `CorrelationId` in a response header, not in the body. — Last verified: 2026-11-08 / ne-6 / AAP-R1
- Staging publishes Swagger at `/swagger/index.html` (per-area JSON under `/swagger/<Area>/swagger.json`). — Last verified: 2026-11-08 / ne-6 / AAP-R3

## 2. Two error envelopes (seen on every supplier tested)

| Envelope | Casing | Typical code | Where |
|---|---|---|---|
| Binding/validation | camelCase (`errorCode`, `errorMessage`) | `1001` | Malformed body, wrong type |
| Business | PascalCase (`ErrorCode`, `ErrorMessage`, `Context[]`) | `NDC-INT-TEC-A0001`, `NDC-INT-BYP-*`, `NDC-INT-UNC-Z9999` | Predicates, supplier errors |

Having two shapes is itself filed as a defect on most suppliers. Error-envelope rules: SPEC §7.9.

## 3. Recurring defect patterns (check these on any new supplier)

These appeared on **3 or more suppliers**. A new supplier regression should test each one.

| Pattern | Seen on |
|---|---|
| `ResponseId` not validated (wrong / missing / other search accepted) | SabreNdc, Galileo, AirArabiaPlus, AirIndia |
| Retrieve ignores x-api-key / Client-Id or bookingToken | SabreNdc, AirArabiaPlus, AirIndia |
| `ParentPaxRefId` ignored (infant on first adult) or nulled | AirArabiaPlus, Amadeus, TravelportNdc |
| Raw supplier payload / credentials in errors or isDebug | Galileo, SabreNdc, AirIndia, Amadeus, TravelportNdc |
| .NET / Dto type names in 400 bodies | Galileo, SabreNdc, TravelportNdc, Amadeus, AirIndia |
| Repeat Book creates a second PNR | SabreNdc, AirArabiaPlus |
| `voidCapability` missing or `"None"` (outside the 2-value enum) | SabreNdc, TravelportNdc, AirArabiaPlus |
| Mismatched AddPassenger / offer pair accepted on Hold/Book | TravelportNdc, SabreNdc |
| Retrieve after CancelAfterHold still `OnHold` | SabreNdc |

Details and run keys: each supplier file in [../02_Suppliers/](../02_Suppliers/README.md).

## 4. Security notes

- `isDebug=true` returns `supplierRequest`/`supplierResponse`, which may contain credentials. Never
  commit them (Execute skill safety rule 2, SPEC §7.14).
- The API key lives only in the git-ignored repo-root `.env` (`NDC_API_KEY`); `Harness/_shared/lib.js`,
  `Harness/V1/NdcV1.Extracted.ps1` and the TestData sweep script read it from there, Postman uses
  `{{x_api_key}}`. Removed from tracked files 2026-11-17; it is still in **git history**, so it
  should be rotated by the key owner.
