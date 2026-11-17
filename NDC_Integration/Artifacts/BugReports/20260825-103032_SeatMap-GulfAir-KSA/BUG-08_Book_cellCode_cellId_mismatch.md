# [V2][GulfAir][Book] – Book Resolves the Booked Seat from cellCode Alone, Ignoring a Mismatched cellId

## 📄 Description

When `passengersSelectedSeats.<pax>.setSegmentsSeats.<seg>.cellCode` and `.cellId` refer to two
*different* cells within the same offer/segment (e.g. `cellCode` for seat 9A but `cellId` copied
from seat 8A), `Book` books and charges the seat named by `cellCode` — it does not cross-check that
`cellCode` and `cellId` refer to the same cell, and does not reject the mismatched pair.

## 🔁 Steps to Reproduce

1. GetSeatMap completed for a GulfAir/KSA offer; record two distinct `AvailablePaid` cells, e.g.
   cell A (`cellCode: "8A"`, price 120.00 SAR) and cell B (`cellCode: "9A"`, price 60.00 SAR).
2. POST `Book` with `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg> = {cellCode: "9A", cellId:
   "<cell A's cellID>"}`.

## ❌ Actual Result

```json
{
  "pnr": "RRGNEH",
  "passengersSelectedSeats": {"PAX1": {"<seg>": {"cellCode": "9A", "price": {"amount": 60.00, "currency": "SAR"}}}}
}
```

Seat 9A (the submitted `cellCode`) was booked at 9A's own price (60.00 SAR) — not 8A's price, and
not rejected for the mismatch.

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "cellCode does not match the cell referenced by cellId."
}
```

(Per SPEC.md §2.9/§7.11's own open question about whether `cellCode` is decorative or
independently validated against `cellId` — this run confirms `cellCode` is the operative field.)

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `pnr RRGNEH`

## 📊 Severity

**High** — combined with BUG-07, this confirms `cellId` provides no real integrity guarantee for
GulfAir bookings: any well-formed `cellCode` string that exists on the confirmed offer/segment will
be honored regardless of what `cellId` accompanies it. This is narrower than a cross-offer
authorization bypass (see BUG-09 for that variant), but it means the two-field seat-selection
contract is not actually enforced as designed.

## 📎 Evidence

**Actual response (redacted):**

```json
{"pnr": "RRGNEH", "passengersSelectedSeats": {"PAX1": {"<seg>": {"cellCode": "9A", "price": {"amount": 60.00, "currency": "SAR"}}}}}
```

**Expected response (redacted):**

```json
{"status": 400, "errorCode": "ValidationError", "errorMessage": "cellCode/cellId mismatch"}
```

## 💥 Impact

A client (or a bug elsewhere in a calling application) that sends a stale/incorrect `cellId`
alongside a correct `cellCode` will silently get the `cellCode`-named seat booked and charged — no
error surfaces to reveal the inconsistency, which could mask real client-side bugs in seat-selection
UIs during their own testing.
