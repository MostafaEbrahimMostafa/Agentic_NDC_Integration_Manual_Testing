# [V2][TravelportNdc][Hold] – fareConfirmResponseId / selectedOfferId Accepts a Mismatched AddPassenger Id Pair and Creates a Held Booking

## 📄 Description

V2 Hold called with the responseId of AddPassenger A and the offerId of AddPassenger B returns 200 and creates held PNR 82FNT5. V1 Book with a mismatched pair is correctly rejected with 400.

Found by: FLOW-V2-26-NEG, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V2 Search, FareConfirm, AddPassenger twice (A and B, different offers).
2. POST api/v2/FlightBooking/Hold with fareConfirmResponseId = A.responseId and selectedOfferId = B.offerId.

## ❌ Actual Result

```json
{
  "supplier": "TravelportNdc",
  "pnr": "82FNT5",
  "gdsPNR": "JJ0R24",
  "bookingToken": "64d040e9-4d57-4096-a536-f94bde038cb7",
  "holdExpirationDate": "2026-11-04T21:59:00+02:00",
  "passengersSelectedAncillaries": null,
  "passengersSelectedSeats": {},
  "journeys": {
    "seg1?seg2": {
      "origin": "CAI",
      "destination": "JED",
      "numberOfStops": 1,
      "segmentRefIds": [
        "seg1",
        "seg2"
      ]
    }
  },
  "__omitted__": "9 more keys"
}
```

V2 Hold returned 200 pnr 82FNT5 (tickets none); cancelled in cleanup. V1 Book with a mismatched offer/response pair is rejected with 400 (FLOW-V1-01-NEG)

## ✅ Expected Result

```json
4xx validation error, no PNR created
```

FLOW-V2-26-NEG; SPEC.md 3.2 / 6.2 id propagation.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Critical** — A crossed id pair creates a booking for an unintended offer (wrong PNR content).

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "supplier": "TravelportNdc",
  "pnr": "82FNT5",
  "gdsPNR": "JJ0R24",
  "bookingToken": "64d040e9-4d57-4096-a536-f94bde038cb7",
  "holdExpirationDate": "2026-11-04T21:59:00+02:00",
  "passengersSelectedAncillaries": null,
  "passengersSelectedSeats": {},
  "journeys": {
    "seg1?seg2": {
      "origin": "CAI",
      "destination": "JED",
      "numberOfStops": 1,
      "segmentRefIds": [
        "seg1",
        "seg2"
      ]
    }
  },
  "__omitted__": "9 more keys"
}
```

**Expected response (redacted):**

```json
4xx validation error, no PNR created
```

## 💥 Impact

A stale or crossed pair holds the wrong offer; the held PNR must be cancelled by hand. A stale or crossed id pair books an unintended offer; the held PNR must be cancelled by hand
