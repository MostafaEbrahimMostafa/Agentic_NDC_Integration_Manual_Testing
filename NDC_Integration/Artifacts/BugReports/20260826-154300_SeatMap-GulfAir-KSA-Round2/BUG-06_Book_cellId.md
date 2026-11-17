# [V2][GulfAir][Book] – cellId Not Decoded or Cross-Validated Against cellCode in Book Request

## 📄 Description

`Book`'s `passengersSelectedSeats.<pax>.setSegmentsSeats.<seg>.cellId` — the opaque, metadata-bearing
token SPEC.md §2.7 describes as authoritative — is not decoded, signature-checked, or cross-validated
against the submitted `cellCode` at all. Two distinct sub-cases both reproduce Round 1's
(2026-08-25) findings unchanged: (1) a `cellId` with its trailing 10 base64 characters replaced with
`XXXXXXXXXX` is still accepted; (2) a `cellCode` from one cell submitted alongside a genuine `cellId`
belonging to a *different* cell in the same offer still books the seat named by `cellCode`, at
`cellCode`'s own price — `cellId`'s real identity is silently ignored.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` for a fresh GulfAir/KSA offer → record two distinct AvailablePaid
   cells' `cellCode`/`cellID` (e.g. `8A` and `8B` on BAH-DXB 2026-10-26, or a single cell on BAH-CAI
   2026-10-23 for the tamper variant).
2. Tamper variant: `Book` with `cellCode="8A"` and `cellId=<8A's real cellID, last 10 chars replaced with "XXXXXXXXXX">`.
3. Mismatch variant: `Book` with `cellCode="8A"` but `cellId=<8B's real cellID>`.

## ❌ Actual Result

```json
"passengersSelectedSeats": { "PAX1": { "<seg>": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } }
```

Both variants return HTTP 200 and ticket the booking, attaching the seat named by `cellCode` at that
seat's own price — the tampered/mismatched `cellId` has no effect on the outcome whatsoever.

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "ValidationError", "ErrorMessage": "cellId is invalid or does not match the submitted cellCode." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 responses carry no TransactionId/error envelope)

## 📊 Severity

**High** — `cellCode` is effectively the *only* field Book honors for seat identity. A client
(malicious or simply buggy) can display one seat to a traveler while a completely different seat is
actually attached/priced, and the mismatch is invisible to any downstream code that trusts `cellId`
as the ground truth per SPEC.md's own description of the token.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "PRKTIQ", "passengersSelectedSeats": { "PAX1": { "<seg>": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } } }
```

(Tamper variant: `pnr": "PAGULD"`, seat attached identically despite the corrupted `cellId`.)

**Expected response (redacted):**

```json
{ "Status": 400, "ErrorCode": "ValidationError", "ErrorMessage": "cellId is invalid or does not match the submitted cellCode." }
```

## 💥 Impact

Two real GulfAir PNRs (`PRKTIQ`, `PAGULD`) were created and ticketed purely to demonstrate this
defect and need manual void/cancel follow-up. Any future attempt to rely on `cellId` as a
tamper-resistant, offer-bound seat-selection token (e.g. for fraud prevention or seat-inventory
integrity) is currently ineffective for GulfAir, since the server never actually inspects it beyond
requiring it be non-empty.
