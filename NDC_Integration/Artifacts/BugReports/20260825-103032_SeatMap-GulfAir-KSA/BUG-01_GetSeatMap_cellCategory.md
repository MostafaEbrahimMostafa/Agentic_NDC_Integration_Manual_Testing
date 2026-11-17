# [V2][GulfAir][GetSeatMap] – cellCategory Returned Incorrect Value for an Occupied Seat Cell

## 📄 Description

The field `cellCategory` is returned as `"Aisle"` for a cell that is actually a real, occupied
passenger seat (row 8, column E, `cellCode: "8E"`) in the `GetSeatMap` response. Every other seat
cell in the same seat map correctly reports `cellCategory: "Seat"`. This field should reliably
distinguish real seats from structural aisle gaps so that clients can render/derive the cabin layout.

## 🔁 Steps to Reproduce

1. Search (GulfAir, KSA) for a GulfAir flight (e.g. BAH→RUH), select the first offer.
2. FareConfirm the offer.
3. AddPassenger with one ADT passenger.
4. GetSeatMap using AddPassenger's `ResponseId`/`selectedOfferId`.
5. Inspect `seatMapDetails.<segmentRefId>.rows[]` for `rowNumber: 8` and read the cell at `column: "E"`.

## ❌ Actual Result

```json
{
  "cellCategory": "Aisle",
  "column": "E",
  "cellDetails": {
    "cellID": null,
    "cellCode": "8E",
    "cellAvailability": "Occupied",
    "name": null,
    "description": null,
    "seatPriceDetails": null,
    "seatPriceDetailsByPassenger": null,
    "cellCharacteristics": null
  }
}
```

A true Aisle cell in this same seat map always has `column: null` and `cellDetails: null` — this
cell has both a real column letter and a populated (if mostly-null-valued) `cellDetails` object with
a genuine `cellCode`, which only ever occurs on `cellCategory: "Seat"` cells elsewhere in the map.

## ✅ Expected Result

```json
{
  "cellCategory": "Seat",
  "column": "E",
  "cellDetails": {
    "cellCode": "8E",
    "cellAvailability": "Occupied",
    "...": "..."
  }
}
```

Every other row's column E cell in this same seat map is `cellCategory: "Seat"` — row 8 should not
be the exception. This is the exact "Seat without details / Aisle with details" defect pattern the
project's own SeatMap QC Execution Checklist (§8) already anticipates.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `GetSeatMap`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response

## 📊 Severity

**Medium** — this seat is silently dropped from any client that partitions the cabin by
`cellCategory` (a booking UI would render one fewer seat than physically exists, and would
never surface it as occupied/blocked), but it does not block booking, pricing, or ticketing for any
other seat in the map.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "cellCategory": "Aisle",
  "column": "E",
  "cellDetails": {"cellID": null, "cellCode": "8E", "cellAvailability": "Occupied"}
}
```

**Expected response (redacted):**

```json
{
  "cellCategory": "Seat",
  "column": "E",
  "cellDetails": {"cellCode": "8E", "cellAvailability": "Occupied"}
}
```

## 💥 Impact

A booking UI or automated regression suite that partitions cells strictly by `cellCategory` (exactly
the assertion this project's own TC-SEATMAP-VAL-06/VAL-10 test cases encode) will treat row 8's
column E as a structural aisle gap rather than an occupied seat — under-counting the aircraft's real
seat inventory by one seat on this flight, and producing a visually incorrect cabin layout for any
consumer that trusts `cellCategory` as authoritative.
