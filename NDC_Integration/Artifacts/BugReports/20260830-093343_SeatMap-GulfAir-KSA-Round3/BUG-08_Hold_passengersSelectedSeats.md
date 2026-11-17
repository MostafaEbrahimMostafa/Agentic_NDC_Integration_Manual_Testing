# [V2][GulfAir][Hold] – Hold Silently Accepts and Honors an Undocumented passengersSelectedSeats Field

## 📄 Description

SPEC.md documents Hold's request contract as **not** including `passengersSelectedSeats` — the
Hold-branch's seat selection is supposed to go through the dedicated `SeatAfterHold` endpoint instead
(see BUG-03). For GulfAir, however, `Hold` silently accepts a `passengersSelectedSeats` field
submitted directly on the Hold call and correctly attaches/echoes it, exactly like `Book` does. This
is the **3rd consecutive round** this defect has reproduced, now confirmed on **both** a one-way and
a round-trip itinerary this round.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` for a GulfAir/KSA offer (one-way or round-trip); record a valid
   `cellCode`/`cellId`.
2. `Hold` with `fareConfirmResponseId`/`selectedOfferId` from AddPassenger, and
   `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{cellCode, cellId}` included on the Hold
   request body (a field the documented contract does not show).

## ❌ Actual Result

```json
{
  "pnr": "OCBWTT",
  "holdExpirationDate": null,
  "passengersSelectedSeats": { "PAX1": { "<seg>": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } }
}
```

## ✅ Expected Result

Either the field is rejected (400, unrecognized field) or silently ignored (seat absent from the
response) — per SPEC.md §2.10's documented contract, which shows `passengersSelectedSeats` as absent
from Hold entirely.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**Medium** — not itself unsafe (the seat is correctly attached and priced), but it materially
undermines `SeatAfterHold`'s reason for existing, and means the Hold-branch's actual seat-selection
contract for GulfAir is undocumented and inconsistent with every other supplier that might genuinely
require `SeatAfterHold`.

## 📎 Evidence

**Actual response (redacted), round-trip:**

```json
{ "pnr": "OCBWTT", "passengersSelectedSeats": { "PAX1": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } }
```

**Actual response (redacted), one-way:** `pnr RNIJBQ`, identical pattern.

## 💥 Impact

Confirmed unchanged across Round 1 (pnr RVSRGO), Round 2 (pnr PABXQM), and Round 3 (pnr RNIJBQ
one-way, pnr OCBWTT round-trip — the round-trip confirmation is new this round and rules out a
journey-shape-specific explanation). Recommend the dev team decide and document, per supplier,
whether Hold's inline seat acceptance is an intentional GulfAir-specific shortcut (in which case
document it) or an unintended side-effect of shared code with `Book` (in which case decide whether to
close it or formalize it as the supported path, superseding `SeatAfterHold` for suppliers where it
works).
