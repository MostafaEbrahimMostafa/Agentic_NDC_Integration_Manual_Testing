# [V2][FlyAdeal][Book] – Cross-Offer cellId Accepted; Booking Created With the Seat Silently Dropped (16th Confirmation, First on FlyAdeal)

## 📄 Description

`Book` accepts a `cellId` that was issued for a **different offer's** seat map: it runs the full booking and silently drops the seat (`passengersSelectedSeats` {} and no seat fee) instead of returning an error. **Not a new defect** - the existing `BUG-07`, now confirmed for the **16th time**, first on FlyAdeal. FlyAdeal does check cellCode-vs-cellId (a different cellCode is rejected 409), but not offer-vs-cellId.

## History

| Round | Date | Result |
|---|---|---|
| 1 - 20 | 2026-08-25 - 2026-10-10 | FAIL on GulfAir/KSA (15 confirmations) |
| 21 | 2026-10-11 | FAIL - FlyAdeal/EGY (pnr TF6H6B) |

## 🔁 Steps to Reproduce

1. Two chains Eb1 (JED→RUH 2026-12-27) and Eb2 (2026-12-28): `Search` → `FareConfirm` → `GetOfferBundles` → `AddPassenger` → `GetSeatMap`.
2. `Book` on Eb2 with `passengersSelectedSeats` cellCode **19C** and the `cellId` issued for 19C on Eb1.

## ❌ Actual Result

```json
{
  "status": 200,
  "pnr": "TF6H6B",
  "passengersSelectedSeats": {},
  "selectedOffer": { "priceDetails": { "totalSelectedSeatsAmount": null } }
}
```

Real booking created; the seat is dropped without any error.

## ✅ Expected Result

```json
{
  "status": 409,
  "errorCode": "NDC-INT-UNC-Z9999",
  "context": [{ "name": "BUSINESS_CONFLICT", "value": "The selected seat CellId does not belong to this offer." }]
}
```

SPEC.md §2.7, §2.9, §7.7: the cellId embeds the originating offer and must be rejected for another offer (the exact shape is UNKNOWN; a 4xx and no booking is expected).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `FlyAdeal`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `5e349602-a03b-42e3-8cbc-1401cbb57cd5`

## 📊 Severity

**High** — a booking is created with the requested seat silently missing and no error, so the traveler is told nothing.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book 200, pnr TF6H6B, passengersSelectedSeats {}, no error. (Variant with a different cellCode: 409 "The selected seat CellId does not match the provided CellCode".)
```

**Expected response (redacted):**

```json
// HTTP 4xx, no booking.
```

Source: `TC-SEATMAP-VAL-04` in [QA report](../../Logs/20261011-133520_SeatMap-FlyAdeal-EGY-Round21-RealClockExperiment.md).

## 💥 Impact

A stale or foreign cellId produces a booking with no seat and no error - the caller believes a seat was reserved.
