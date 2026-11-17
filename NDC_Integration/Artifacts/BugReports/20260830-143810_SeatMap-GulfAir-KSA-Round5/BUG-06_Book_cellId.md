# [V2][GulfAir][Book] – cellId Not Validated; Tampered Token Still Accepted

## 📄 Description

`Book` does not decode or verify the opaque `cellId` token at all — a request whose `cellId` has
been deliberately tampered with (its trailing 10 base64 characters replaced) is still accepted, and
the seat is attached purely based on the submitted `cellCode` string. This is the **5th consecutive
round** this defect has reproduced.

## 🔁 Steps to Reproduce

1. `AddPassenger` → `GetSeatMap` for a fresh GulfAir/KSA offer (BAH-JED, 2027-02-01); record a valid
   `cellCode`/`cellId` pair for an `AvailablePaid` cell (`8A`).
2. `Book` with `passengersSelectedSeats.PAX1.setSegmentsSeats.<seg>` = `{cellCode:"8A", cellId:
   "<the same token with its last 10 characters replaced with XXXXXXXXXX>"}`.

## ❌ Actual Result

```json
{
  "pnr": "RZTQOS",
  "passengersSelectedSeats": {
    "PAX1": { "<seg>": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } }
  }
}
```
(HTTP 200)

## ✅ Expected Result

```json
{ "status": 400, "errorCode": "ValidationError", "errorMessage": "The provided cellId is invalid or does not match the requested cellCode." }
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (non-default host, user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** Not returned by this response (200 success)

## 📊 Severity

**Medium** — the seat that gets attached still matches the submitted `cellCode` (a real, available
seat), so no financially-wrong or physically-impossible outcome occurs; the defect is that the
`cellId` token — documented as the authoritative, metadata-bearing field — is in practice
decorative, undermining the anti-tamper assumptions built around it.

## 📎 Evidence

**Actual response (redacted):**

```json
{ "pnr": "RZTQOS", "passengersSelectedSeats": { "PAX1": { "cellCode": "8A", "price": { "amount": 120.00, "currency": "SAR" } } } }
```

**Expected response (redacted):** `{ "status": 400, "errorCode": "ValidationError" }`

## 💥 Impact

Confirmed unchanged across Round 1 (pnr RNIEPJ), Round 2 (pnr PAGULD), Round 3 (pnr RVGRVO),
Round 4 (pnr RZTFBV), and now Round 5 (pnr RZTQOS, BAH-JED 2027-02-01) — `cellCode` alone drives
seat resolution in every case; `cellId`'s decode/signature check does not appear to exist
server-side at all. The companion finding `TC-BOOK-VAL-06` (cellCode/cellId mismatch, pointing at
two genuinely different valid cells rather than a tampered token) further confirms `cellCode` is
authoritative even when `cellId` correctly decodes to an entirely different cell.
