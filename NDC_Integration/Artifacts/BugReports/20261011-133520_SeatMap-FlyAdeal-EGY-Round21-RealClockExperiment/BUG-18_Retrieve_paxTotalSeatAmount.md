# [V2][FlyAdeal][Retrieve] – paxTotalSeatAmount Returned Incorrect Value in Retrieve Response (4th Confirmation, First on FlyAdeal)

## 📄 Description

The `Retrieve` response under-reports the per-passenger seat amounts compared with the `Book` response of the same booking: `paxTotalSeatAmount` and `paxTotalAmount` are lower (on FlyAdeal the 15% VAT part of the seat price is dropped, 25.00 -> 21.74), while `priceDetails.totalAmount` and `passengerSeats[].price` still show the full amount. **Not a new defect** - the existing `BUG-18` (GulfAir, multi-seat), now confirmed for the **4th time** and for the first time on FlyAdeal, where it happens with a **single** seat. The same pattern affects an ancillary line (26.00 in Book, 29.39 in Retrieve; `totalAncillariesAmount` 22.61).

## History

| Round | Date | Result |
|---|---|---|
| 13 | 2026-09-30 | FAIL - GulfAir, two seats counted as one |
| 18 | 2026-10-10 | FAIL - reproduced |
| 20 | 2026-10-10 | FAIL - reproduced (3rd) |
| 21 | 2026-10-11 | FAIL - **FlyAdeal**, single seat (4th, first on this supplier) |

## 🔁 Steps to Reproduce

1. `Search` JED→RUH 2026-12-15 (1 ADT) → `FareConfirm` → `GetOfferBundles` → `AddPassenger` → `GetSeatMap` (with `selectedBundles` [FLY]).
2. `Book` with seat 26C (25 SAR) and the same `selectedBundles` → note `paxTotalSeatAmount` 25 and `paxTotalAmount` 243.99.
3. `Retrieve` the booking by `pnr` (pnr Q8S55T).

## ❌ Actual Result

```json
{
  "selectedOffer": {
    "passengerFareBreakdown": [{
      "paxTotalSeatAmount": { "amount": 21.74, "currency": "SAR" },
      "paxTotalAmount": { "amount": 240.73, "currency": "SAR" },
      "passengerSeats": [{ "cellCode": "26C", "price": { "amount": 25, "currency": "SAR" } }]
    }],
    "priceDetails": { "totalSelectedSeatsAmount": { "amount": 25 }, "totalAmount": { "amount": 243.99 } }
  }
}
```

The passenger lines (21.74 / 240.73) disagree with Retrieve's own `passengerSeats` (25.00) and `totalAmount` (243.99), and with the Book response.

## ✅ Expected Result

```json
{
  "selectedOffer": {
    "passengerFareBreakdown": [{
      "paxTotalSeatAmount": { "amount": 25, "currency": "SAR" },
      "paxTotalAmount": { "amount": 243.99, "currency": "SAR" }
    }]
  }
}
```

SPEC.md §2.11/§2.9/§2.1: Retrieve must echo the booking as Book returned it (Family A: matching `selectedOffer`).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `840d8bef-00db-4238-9b64-12284fc2f471`

## 📊 Severity

**High** — a core financial field of the booking read-back differs from what Book charged; the booking-level total is unchanged, so the passenger lines no longer add up.

## 📎 Evidence

**Actual response (redacted):**

```json
// Seat 26C (pnr Q8S55T): Book paxTotalSeatAmount 25 / paxTotalAmount 243.99; Retrieve 21.74 / 240.73. ADT+INF (A2S8KV): 25 -> 21.74, 254 -> 250.74 (sum of passenger totals 375.74 vs totalAmount 379). Fly+ seat 1A (D6RTRZ): 74 -> 64.35. Meal (B85IQG): 26 -> 29.39, totalAncillariesAmount 22.61.
```

**Expected response (redacted):**

```json
// Retrieve paxTotalSeatAmount = Book value (25 / 74), ancillary line 26.00.
```

Source: `FLOW-V2-49-SEATFIELD` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A caller that reads bookings back through Retrieve sees a seat total and passenger fare that differ from what Book charged and from Retrieve's own booking total; reconciliation and customer-facing price displays built on the passenger lines are wrong.
