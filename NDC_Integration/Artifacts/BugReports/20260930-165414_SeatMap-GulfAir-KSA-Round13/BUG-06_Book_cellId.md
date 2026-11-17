# [V2][GulfAir][Book] – Tampered cellId Accepted; Seat Booked From cellCode Alone (7th Confirmation)

## 📄 Description

`Book` accepts a `cellId` whose last 10 characters were replaced and books the seat named by `cellCode`. The same happens when `cellCode` and `cellId` name two different seats (TC-BOOK-VAL-06). **Not a new defect** - the existing `BUG-06`, now confirmed for the **7th time**.

## History

| Round | Date | Result |
|---|---|---|
| 1 – 6 | 2026-08-25 – 09-06 | FAIL – tampered token accepted |
| 7 – 12 | 2026-09-09 – 09-30 | Not exercised |
| 13 | 2026-09-30 | FAIL – tampered token accepted, seat 14A attached |

## 🔁 Steps to Reproduce

1. `Search` BAH→DXB 2027-06-17 (1 ADT) → `FareConfirm` → `AddPassenger` → `GetSeatMap`. Record `cellCode` `14A` and its 323-character `cellDetails.cellID`.
2. Replace the last 10 characters of the `cellID` with `XXXXXXXXXX` (same length).
3. `Book` with `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{ "cellCode": "14A", "cellId": <tampered token> }`.
4. Variant (TC-BOOK-VAL-06): `cellCode` `15F` with the untouched `cellId` of seat `15A` (BAH→JED 2027-06-18).

## ❌ Actual Result

```json
{
  "pnr": "RALBKE",
  "passengersSelectedSeats": {
    "PAX1": {
      "GF-GF500-GF500-2027061701-2027061703-O": {
        "cellCode": "14A",
        "price": {
          "amount": 60,
          "currency": "SAR"
        }
      }
    }
  }
}
```

HTTP 200 after 51 seconds: a ticketed booking with seat 14A attached and priced at 60.00 SAR, exactly as if the genuine token had been sent. The 15F/15A variant attached 15F (pnr OWBPFD).

## ✅ Expected Result

```json
{
  "status": 400,
  "errorCode": "ValidationError",
  "errorMessage": "The provided cellId is invalid."
}
```

A tampered opaque token should fail whatever server-side decode/signature check it undergoes (SPEC.md §2.7, §2.9, §7.7); the exact error code is UNKNOWN because it has never been observed.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `d1a823a6-5074-4b63-9a0b-6f1d131c47ac`

## 📊 Severity

**High** — the cellId integrity token protects nothing, so forged or mismatched tokens are accepted and charged.

## 📎 Evidence

**Actual response (redacted):**

```json
// Book (cellCode 14A, cellId ending XXXXXXXXXX)
HTTP 200, pnr RALBKE, passengersSelectedSeats.PAX1 = {14A, 60 SAR}, totalAmount 1141.00 SAR
```

**Expected response (redacted):**

```json
HTTP 4xx rejecting the tampered token, no booking
```

Source: `TC-BOOK-NEG-06` in [20260930-165414_SeatMap-GulfAir-KSA-Round13.md](../../Logs/20260930-165414_SeatMap-GulfAir-KSA-Round13.md).

## 💥 Impact

The seat is chosen from the free-text `cellCode` and the token is ignored, so it gives no protection against forged, stale or mismatched seat selections. Bookings `RALBKE` and `OWBPFD` are evidence - keep until triaged, then cancel.
