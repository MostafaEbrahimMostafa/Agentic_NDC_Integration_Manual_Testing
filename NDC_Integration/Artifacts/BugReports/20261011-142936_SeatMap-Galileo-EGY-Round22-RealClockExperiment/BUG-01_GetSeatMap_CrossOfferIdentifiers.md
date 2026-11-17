# [V2][Galileo][GetSeatMap] – ResponseId/selectedOfferId Cross-Offer Pair Accepted (11th Confirmation, First on Galileo)

## 📄 Description

`GetSeatMap` accepts a `ResponseId` from one search and a `selectedOfferId` from another and returns a full seat map; the result follows `selectedOfferId` and `ResponseId` is never cross-checked. **Not a new defect** - the existing `BUG-01`, confirmed for the **11th** time and for the first time on Galileo.

## History

| Round | Date | Result |
|---|---|---|
| 1-21 | 2026-08-25 .. 2026-10-11 | FAIL on GulfAir (Rounds 1-20) and FlyAdeal (Round 21), 10 confirmations |
| 22 | 2026-10-11 | FAIL - **Galileo**, 11th confirmation |

## 🔁 Steps to Reproduce

1. Run two `Search` -> `FareConfirm` -> `AddPassenger` chains (offer A: MS673 CAI-JED 2026-12-20; offer B: SV386 CAI-JED 2026-12-21).
2. `GetSeatMap` with `ResponseId` of A and `selectedOfferId` of B, then the reverse.

## ❌ Actual Result

```json
// run 1: HTTP 200 -> seat map of SV386 2026-12-21 (offer B), 300 seat cells
// run 2: HTTP 200 -> seat map of MS673 2026-12-20 (offer A), 120 seat cells
```

## ✅ Expected Result

```json
{ "Status": 400, "ErrorCode": "NDC-INT-TEC-A0001", "ErrorMessage": "Invalid request. Please check the request parameters and try again." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `Galileo`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `non-staging, explicitly requested (SPEC.md 1.6 stale fallback host)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `d7637346-7522-4ea8-b021-95c318ea5dd9`

## 📊 Severity

**High** — the offer-binding of the identifier pair is not enforced, so a caller can read the seat map of any offer it can name.

## 📎 Evidence

ResponseId of offer A + selectedOfferId of offer B -> 200, SV386 map (300 seats); reverse -> 200, MS673 map (120 seats).

Source: `TC-SEATMAP-NEG-02` in [QA report](../../Logs/20261011-142936_SeatMap-Galileo-EGY-Round22-RealClockExperiment.md).

## 💥 Impact

The identifier pair that is supposed to bind a seat-map request to one offer is not validated; both mismatched pairings return a map.
