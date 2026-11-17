# [V2][GulfAir][Retrieve] – paxTotalSeatAmount Returned Incorrect Value in Retrieve Response for Multi-Seat Bookings (3rd Confirmation)

## 📄 Description

On a booking with more than one seat for the same passenger, `Retrieve` reports `selectedOffer.passengerFareBreakdown[].paxTotalSeatAmount` as the price of only **one** seat, so `paxTotalAmount` and the sum of the passenger totals fall short of `priceDetails.totalAmount`. The `Book` response for the same booking is correct. **Not a new defect** - the existing `BUG-18` (first seen in Round 13), now confirmed for the **3rd time**.

## History

| Round | Date | Result |
|---|---|---|
| 13 | 2026-09-30 | FAIL – first seen: paxTotalSeatAmount 60 for two 60.00 seats (pnr OOERGR), same on the two-passenger booking OOBWZB |
| 15 – 17 | 2026-10-05 – 10-10 | Not exercised (no multi-seat booking in scope) |
| 18 | 2026-10-10 | FAIL – reproduced (see the Round 18 report) |
| 19 | 2026-10-10 | Not exercised (Round 19 was a targeted 6-case run) |
| 20 | 2026-10-10 | FAIL – reproduced on both a 1-passenger and a 2-passenger multi-seat round trip (pnrs OOGTBO, OUPECC) |

## 🔁 Steps to Reproduce

1. `Search` BAH→RUH 2027-04-12 with a return RUH→BAH 2027-04-15, 1 ADT → `FareConfirm` → `AddPassenger` → `GetSeatMap`.
2. `Book` with `passengersSelectedSeats.PAX1.setSegmentsSeats` holding seat `14C` (leg 1) and `14D` (leg 2), both 60.00 SAR. Book returns pnr `OOGTBO`; its `paxTotalSeatAmount` is 120.00 and `paxTotalAmount` 1341.00 (correct).
3. `Retrieve` the same pnr (repeat it - the result is stable).
4. Compare `selectedOffer.passengerFareBreakdown[0]` in the two responses. (A second, two-passenger round trip, pnr `OUPECC`, shows the same under-count for each passenger.)

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
          "amount": 1281,
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
        "amount": 1341,
        "currency": "SAR"
      }
    }
  }
}
```

The passenger line lists two seats worth 120.00 SAR in total, yet `paxTotalSeatAmount` is 60.00 and `paxTotalAmount` is 1281.00, while `priceDetails.totalAmount` is 1341.00. The per-passenger totals no longer add up to the booking total. For the two-passenger booking the Retrieve passenger totals sum to 2682.00 against a `totalAmount` of 2762.00 (per-passenger seat total 120/120 on Retrieve vs 160/160 on Book).

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
          "amount": 1341,
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
- **Correlation ID:** `6ed019d7-6e74-4b5c-b970-8f34db4fa626`

## 📊 Severity

**High** — a core financial field is wrong on read-back, although the booking itself is created and priced correctly; anything built from the passenger lines (invoices, refunds, reconciliation) is short by the missing seat(s).

## 📎 Evidence

**Actual response (redacted):**

```json
// Retrieve pnr OOGTBO (called twice, identical)
"passengerSeats": [ {"cellCode":"14C","price":60}, {"cellCode":"14D","price":60} ],
"paxTotalSeatAmount": {"amount":60,"currency":"SAR"},
"paxTotalAmount": {"amount":1281,"currency":"SAR"}
```

**Expected response (redacted):**

```json
// Book response for the same booking
"paxTotalSeatAmount": {"amount":120,"currency":"SAR"},
"paxTotalAmount": {"amount":1341,"currency":"SAR"}
```

Source: `FLOW-V2-49-SEATFIELD` in [QA report](../../Logs/20261010-212551_SeatMap-GulfAir-KSA-Round20-RealClockExperiment.md).

## 💥 Impact

Any consumer that rebuilds a booking's cost from the Retrieve passenger lines under-counts every extra seat after the first (60.00 SAR in the 1-passenger round trip above, 40.00 SAR per passenger in the two-passenger one), and the response contradicts itself (`totalSelectedSeatsAmount` 120 vs `paxTotalSeatAmount` 60). The Book response is right, so the fault is in how Retrieve maps the seats. Bookings `OOGTBO` and `OUPECC` are evidence - keep until triaged, then cancel.
