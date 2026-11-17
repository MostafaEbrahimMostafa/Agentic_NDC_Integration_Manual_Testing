# [V2][Galileo][Hold, PnrReprice, Retrieve] – Passenger Identifier Differs Between Responses of the Same Booking

## 📄 Description

For one held booking, `Hold` keys `passengersSelectedSeats` by the seat-map passenger GUID, while `PnrReprice` and `Retrieve` key it by a base64 reference; the `PnrReprice` `passengerFareBreakdown[].passengerRefId` is yet another value.

## History

| Round | Date | Result |
|---|---|---|
| 22 | 2026-10-11 | FAIL - first observed, Galileo/EGY |

## 🔁 Steps to Reproduce

1. `Search` CAI-JED 2026-12-09 -> `FareConfirm` -> `AddPassenger` -> `GetSeatMap`.
2. `Hold` with seat 33-H (pnr 7JRHGS), then `PnrReprice` and `Retrieve`.
3. Compare the `passengersSelectedSeats` key and `passengerRefId` in the three responses.

## ❌ Actual Result

```json
// passengersSelectedSeats key: Hold a97ff227-869d-4f7d-908f-8fa0e723b362 | PnrReprice qX/yJ4adT32Qj4+g5yOzYg== | Retrieve qX/yJ4adT32Qj4+g5yOzYg==
// passengerRefId: Hold qX/yJ4... | PnrReprice 4BdS+DUq... | Retrieve qX/yJ4...
```

## ✅ Expected Result

```json
One identifier per passenger in every response (for example the base64 reference everywhere).
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Hold, PnrReprice, Retrieve`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `75b07bd4-a15b-498c-84e4-a6d6bc96313d`

## 📊 Severity

**Medium** — clients cannot match seats or fares to passengers across the responses of one booking.

## 📎 Evidence

Hold key a97ff227-...; PnrReprice and Retrieve key qX/yJ4adT32Qj4+g5yOzYg==; passengerRefId Hold/Retrieve qX/yJ4..., PnrReprice 4BdS+DUq...

Source: `FLOW-V2-50-SEATFIELD` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

Matching a seat or fare to a passenger by key breaks between Hold, PnrReprice and Retrieve.
