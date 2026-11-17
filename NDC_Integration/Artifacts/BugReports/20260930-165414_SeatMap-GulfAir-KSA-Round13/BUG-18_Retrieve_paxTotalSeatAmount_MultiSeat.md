# [V2][GulfAir][Retrieve] – paxTotalSeatAmount Returned Incorrect Value in Retrieve Response for Multi-Seat Bookings (NEW)

## 📄 Description

On a booking with more than one seat for the same passenger, `Retrieve` reports `selectedOffer.passengerFareBreakdown[].paxTotalSeatAmount` as the price of only **one** seat, so `paxTotalAmount` and the sum of the passenger totals fall short of `priceDetails.totalAmount`. The `Book` response for the same booking is correct. **This is a new defect (BUG-18), first seen in Round 13.** Round 6 checked a round-trip booking with two 120.00 SAR seats and Retrieve correctly showed 240.00, so this looks like a regression since then.

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-05-03 with a return RUH→BAH 2027-05-10, 1 ADT → `FareConfirm` → `AddPassenger` → `GetSeatMap`.
2. `Book` with `passengersSelectedSeats.PAX1.setSegmentsSeats` holding seat `14C` (leg 1) and `14D` (leg 2), both 60.00 SAR. Book returns pnr `OOERGR`; its `paxTotalSeatAmount` is 120.00 and `paxTotalAmount` 1730.00 (correct).
3. `Retrieve` the same pnr (repeat it - the result is stable).
4. Compare `selectedOffer.passengerFareBreakdown[0]` in the two responses. (A second, two-passenger round trip, pnr `OOBWZB`, shows the same under-count for each passenger.)

## ❌ Actual Result

```json
{
  "selectedOffer": {
    "passengerFareBreakdown": [
      {
        "passengerRefId": "PAX1",
        "passengerSeats": [
          {
            "cellCode": "14C",
            "price": {
              "amount": 60,
              "currency": "SAR"
            }
          },
          {
            "cellCode": "14D",
            "price": {
              "amount": 60,
              "currency": "SAR"
            }
          }
        ],
        "paxTotalSeatAmount": {
          "amount": 60,
          "currency": "SAR"
        },
        "paxTotalAmount": {
          "amount": 1670,
          "currency": "SAR"
        }
      }
    ],
    "priceDetails": {
      "totalSelectedSeatsAmount": {
        "amount": 120,
        "currency": "SAR"
      },
      "totalAmount": {
        "amount": 1730,
        "currency": "SAR"
      }
    }
  }
}
```

The passenger line lists two seats worth 120.00 SAR in total, yet `paxTotalSeatAmount` is 60.00 and `paxTotalAmount` is 1670.00 (= 849 + 761 + 60), while `priceDetails.totalAmount` is 1730.00. The per-passenger totals no longer add up to the booking total. For the two-passenger booking the passenger totals sum to 3340.00 against a `totalAmount` of 3420.00.

## ✅ Expected Result

```json
{
  "selectedOffer": {
    "passengerFareBreakdown": [
      {
        "passengerRefId": "PAX1",
        "paxTotalSeatAmount": {
          "amount": 120,
          "currency": "SAR"
        },
        "paxTotalAmount": {
          "amount": 1730,
          "currency": "SAR"
        }
      }
    ]
  }
}
```

The Retrieve passenger line must carry the same seat total as the Book response for the same booking (the sum of `passengerSeats[].price`), so that the passenger totals reconcile to `priceDetails.totalAmount` (SPEC.md §2.1 price reconciliation, §2.9/§2.11 seat fields). A one-seat booking is unaffected (60.00 = 60.00).

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Retrieve`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `275c1530-2512-4bc9-bfa6-45e42ad62959`

## 📊 Severity

**High** — a core financial field is wrong on read-back, although the booking itself is created and priced correctly; anything built from the passenger lines (invoices, refunds, reconciliation) is short by the missing seat(s).

## 📎 Evidence

**Actual response (redacted):**

```json
// Retrieve pnr OOERGR (called twice, identical)
"passengerSeats": [ {"cellCode":"14C","price":60}, {"cellCode":"14D","price":60} ],
"paxTotalSeatAmount": { "amount": 60, "currency": "SAR" },
"paxTotalAmount": { "amount": 1670, "currency": "SAR" }
```

**Expected response (redacted):**

```json
// Book response for the same booking
"paxTotalSeatAmount": { "amount": 120, "currency": "SAR" },
"paxTotalAmount": { "amount": 1730, "currency": "SAR" }
```

Source: `FLOW-V2-49-SEATFIELD` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

Any consumer that rebuilds a booking's cost from the Retrieve passenger lines under-counts every extra seat after the first (60.00 SAR in the round trip above, 80.00 SAR in the two-passenger one), and the response contradicts itself (`totalSelectedSeatsAmount` 120 vs `paxTotalSeatAmount` 60). The Book response is right, so the fault is in how Retrieve maps the seats. Bookings `OOERGR` and `OOBWZB` are evidence - keep until triaged, then cancel.
