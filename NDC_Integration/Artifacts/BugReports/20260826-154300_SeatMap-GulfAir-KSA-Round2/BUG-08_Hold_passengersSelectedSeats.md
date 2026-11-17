# [V2][GulfAir][Hold] – passengersSelectedSeats Accepted on Hold Contrary to Documented Contract

## 📄 Description

SPEC.md §2.10 documents Hold's request contract as **not** including `passengersSelectedSeats` —
seat selection on the Hold branch is supposed to require the separate `SeatAfterHold` endpoint
instead. In practice, for GulfAir, `Hold` silently accepts a `passengersSelectedSeats` field
submitted directly on the Hold request itself, and correctly attaches and echoes the seat exactly
like `Book` does. Second-run reproduction of a Round 1 (2026-08-25) finding, unchanged one day
later, on a fresh Hold.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` for a fresh GulfAir/KSA offer (BAH-RUH, 2026-11-20) → record cell
   `8A`'s `cellCode`/`cellID`.
2. `POST api/v2/FlightBooking/Hold` with the normal Hold body, PLUS
   `"passengersSelectedSeats":{"PAX1":{"setSegmentsSeats":{"<seg>":{"cellCode":"8A","cellId":"<8A's cellID>"}}}}`
   added — a field not present in any saved Hold example.

## ❌ Actual Result

```json
{ "pnr": "PABXQM", "passengersSelectedSeats": { "PAX1": { "<seg>": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } } }
```

HTTP 200 — the field is not only accepted without error, it is fully honored and echoed back with a
real price.

## ✅ Expected Result

```json
{ "pnr": "PABXQM", "passengersSelectedSeats": null }
```

(Per §2.10: the field should either be rejected as unrecognized, or silently ignored — not attached.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 responses carry no TransactionId/error envelope)

## 📊 Severity

**Medium** — not a data-integrity or safety issue (the seat *is* correctly attached and priced), but
it directly contradicts SPEC.md's documented Hold/Book asymmetry (§1.10 item 6) and undermines the
stated purpose of the separate `SeatAfterHold` endpoint, which — per BUG-03 — is completely broken
for GulfAir. This is arguably the "correct" undocumented workaround for the Hold branch, and should
be either formally adopted or explicitly closed off, not left as an accidental side-channel.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "PABXQM", "holdExpirationDate": null, "passengersSelectedSeats": { "PAX1": { "<seg>": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } } }
```

**Expected response (redacted):**

```json
{ "pnr": "PABXQM", "passengersSelectedSeats": null }
```

## 💥 Impact

A real GulfAir Hold (`PABXQM`) exists with a seat attached via this undocumented path and was never
progressed to `FareConfirmAfterHold`/`BookAfterHold` — flagged as a `family_b_hold` cleanup item. More
broadly, since `SeatAfterHold` (the documented mechanism, BUG-03) is completely non-functional for
GulfAir while this undocumented Hold-level mechanism works perfectly, any GulfAir integration that
strictly follows SPEC.md's documented contract has **no working way at all** to attach a seat to a
Held booking, despite one existing in practice.
