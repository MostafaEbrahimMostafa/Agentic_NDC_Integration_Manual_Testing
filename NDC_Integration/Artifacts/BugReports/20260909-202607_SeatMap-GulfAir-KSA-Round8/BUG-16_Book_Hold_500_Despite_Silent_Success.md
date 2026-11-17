# [V2][GulfAir][Book/Hold] – First Call Returns HTTP 500 While the Booking Is Silently Created Server-Side; Conflict Envelope Leaks Live Supplier Credentials

## 📄 Description

Every `Book` call (6/6 attempts) and the one `Hold` call attempted this round for GulfAir/KSA returned
`HTTP 500 ServerError` ("Unknown error occured. Please keep the transaction id as a reference.") on the
**first** call against a completely fresh, never-touched offer — regardless of route, offer, or whether
`passengersSelectedSeats` was populated, empty, or omitted entirely (ruling out the seat-selection
payload as the cause). Retrying the **same** offer with a different payload immediately afterward
returned `HTTP 409` with `"This booking has already been created (609). Please check on the Order
Management page to confirm."` — proving the original 500'd call had, in fact, **succeeded** in creating
a real booking server-side. The client is never told the booking succeeded and never receives a `pnr`.

Separately, that 409 conflict envelope's `OriginalSupplierRequest` field contains the full upstream
SOAP request sent to the supplier, including a live `apiKey` and `secretKey` in plaintext inside a
`<SecurityHeader>` block — the same class of credential leak previously documented as BUG-11, but here
reachable on an ordinary first-attempt Book/Hold call rather than only via a deliberate
duplicate-submission probe.

## 🔁 Steps to Reproduce

1. `Search` → `FareConfirm` → `AddPassenger` → `GetSeatMap` for a fresh GulfAir/KSA offer (any route;
   reproduced on BAH-RUH, BAH-JED, BAH-DMM, BAH-CAI).
2. `Book` (or `Hold`) using that offer's `ResponseId`/`selectedOfferId`, with or without
   `passengersSelectedSeats` populated.
3. Observe: `HTTP 500`, generic `ServerError` envelope, no `pnr` returned.
4. Re-submit `Book` against the **same** `ResponseId`/`selectedOfferId` (any payload).
5. Observe: `HTTP 409`, `"This booking has already been created (609)"`, with the full upstream
   supplier SOAP request (including live credentials) echoed back in `OriginalSupplierRequest`.

## ❌ Actual Result

**First attempt** (fresh offer, chain A4, BAH-RUH 2027-06-15):

```json
{"Status":500,"TransactionId":"2b439530-64cc-4def-86c5-47baa83db9b0","ErrorCode":"ServerError","ErrorMessage":"Unknown error occured. Please keep the transaction id as a reference.","Context":[]}
```

**Retry on the same offer, no-seat payload** (proves silent success):

```json
{"Status":409,"TransactionId":"5abbff77-0b26-4cfd-9616-ea1925de0a94","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"-1","Value":"This booking has already been created (609).  Please check on the Order Management page to confirm."}],"OriginalSupplierRequest":"<soapenv:Envelope ...><SecurityHeader ...><agent>WON</agent><apiKey>[REDACTED — live credential, see SPEC.md §7.14]</apiKey><secretKey>[REDACTED — live credential, see SPEC.md §7.14]</secretKey></SecurityHeader>...","OriginalSupplierResponse":null}
```

Reproduced identically (500-then-409-on-retry) on a second, independent chain (A3, BAH-RUH 2027-06-10,
with-seat payload: TransactionIds 74ec9275-4122-405e-b0a3-ac4f11f00d9d → b913c432-9973-44d8-9cf8-aa0e5e0bbc6a).

## ✅ Expected Result

```json
{"status": 200, "pnr": "<real PNR>", "bookingToken": "<token>", "gdsPNR": "<value or empty>"}
```

The first successful Book/Hold call should return `HTTP 200` with the booking's real identifiers — not
a `500` that hides a real, already-committed booking from the caller. Separately, no error envelope
(409 or otherwise) should ever include a live `apiKey`/`secretKey` in plaintext.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/` (STAG_ENV default host)
- **API Name:** `Book`, `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** TransactionIds listed above (500s: 74ec9275-4122-405e-b0a3-ac4f11f00d9d,
  2b439530-64cc-4def-86c5-47baa83db9b0, e3cd3847-9414-4974-b6ad-093367394fd3,
  ce71a2fa-da95-4a0c-9790-f6b0b898ee92, 06401362-cd7c-4c32-b539-9326a411c273 [Hold]; 409-confirmed:
  b913c432-9973-44d8-9cf8-aa0e5e0bbc6a, 5abbff77-0b26-4cfd-9616-ea1925de0a94)

## 📊 Severity

**Critical** — two independent, compounding problems: (1) real, live bookings are being created with
**no PNR ever returned to the caller**, making them impossible to void/cancel/track through any normal
channel — a direct financial/operational risk if this reaches production traffic; and (2) live upstream
supplier credentials are being leaked in plaintext in a conflict-error response body, reachable via an
ordinary retry-after-error flow that any real client integration is likely to perform automatically.

## 📎 Evidence

**Actual response (redacted, first attempt):**

```json
{"Status":500,"ErrorCode":"ServerError","ErrorMessage":"Unknown error occured. Please keep the transaction id as a reference."}
```

**Actual response (redacted, retry — proves silent success + credential leak):**

```json
{"Status":409,"ErrorMessage":"This booking has already been created (609).","OriginalSupplierRequest":"<...apiKey>[REDACTED]</apiKey><secretKey>[REDACTED]</secretKey>..."}
```

**Expected response (redacted):** `{"status": 200, "pnr": "<real PNR>"}`

## 💥 Impact

This round attempted 7 of its 10 assigned test cases against `Book`, and **none could be completed** —
every attempt hit this defect first. At least 2 real bookings are now known to exist with unknown PNRs
(see the run's Cleanup section); up to 4 more may exist from attempts not individually re-confirmed via
retry. Execution was deliberately halted after the 6th Book/1st Hold failure rather than continuing to
create additional untracked live bookings under a confirmed, repeating outage. **Recommend**: (1) fix
the root cause so Book/Hold return the true success/failure status on the first call; (2) audit and
strip supplier credentials from every error envelope, not only the ones already covered by BUG-11's
prior scope; (3) provide the platform team a way to locate bookings created during this incident
(TransactionId or passenger-name/date lookup) so the ones listed in this run's Cleanup section can be
voided.
