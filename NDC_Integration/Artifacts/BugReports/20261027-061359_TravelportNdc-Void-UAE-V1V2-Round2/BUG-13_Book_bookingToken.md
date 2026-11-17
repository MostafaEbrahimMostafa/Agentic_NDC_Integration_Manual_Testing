# [V1 and V2][TravelportNdc][Book] – bookingToken Returned Identical for Two Different Bookings

## 📄 Description

Two different TravelportNdc bookings made at the same time were returned the same `bookingToken`. V1 booking 774MNY (gdsPNR HNGKWD) and V2 booking 773JKY (gdsPNR HNGKWF), both ticketed at 2026-10-27T06:15:23, share `96e14dee-43a8-4068-b47b-31d727a06b7d`; a second pair of V1 bookings (774VYF and 774AIE) shares `e68b0a9f-ed6b-4d3a-b5b1-4d81684e795e`. 2 of 102 bookings created this round were affected; all were created concurrently. New in Round 2 (Round 1 created its bookings sequentially).

Found by: TC-CAPCHECK-TPN-02, QA run `20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2` (2026-10-27).

## 🔁 Steps to Reproduce

1. In parallel, run V1 Search, FareConfirm, Book and V2 Search, FareConfirm, AddPassenger, Book for 1 ADT (CAI-JED 2026-11-12, TravelportNdc/UAE) so both Books complete within the same second.
2. Compare the `bookingToken` of the two Book responses.

## ❌ Actual Result

```json
{
  "V1_Book": {
    "pnr": "774MNY",
    "gdsPNR": "HNGKWD",
    "bookingToken": "96e14dee-43a8-4068-b47b-31d727a06b7d",
    "ticketingDate": "2026-10-27T06:15:23"
  },
  "V2_Book": {
    "pnr": "773JKY",
    "gdsPNR": "HNGKWF",
    "bookingToken": "96e14dee-43a8-4068-b47b-31d727a06b7d",
    "ticketingDate": "2026-10-27T06:15:23"
  }
}
```

Different pnr, gdsPNR and ticket numbers (1572141427426 / 1572141427425), identical token.

## ✅ Expected Result

```json
{
  "V1_Book": {
    "bookingToken": "96e14dee-43a8-4068-b47b-31d727a06b7d"
  },
  "V2_Book": {
    "bookingToken": "<a different GUID>"
  }
}
```

SPEC.md 2.9 / 6.2: bookingToken is one of the three ids (pnr, gdsPNR, bookingToken) that bind every downstream call to its booking; each booking must get its own value.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc` (Qatar Airways / Emirates content, CAI-JED)
- **Base URL:** `https://ndc-integration-stg-ne-5.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging (ndc-integration-stg-ne-5)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response (HTTP 200 body carries no TransactionId)`

## 📊 Severity

**Medium** — No cross-booking harm was demonstrated (the token is not validated at all today, BUG-03), but once a token check exists two bookings with one token would be interchangeable.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "V1": {
    "pnr": "774MNY",
    "bookingToken": "96e14dee-43a8-4068-b47b-31d727a06b7d"
  },
  "V2": {
    "pnr": "773JKY",
    "bookingToken": "96e14dee-43a8-4068-b47b-31d727a06b7d"
  }
}
```

**Expected response (redacted):**

```json
{
  "V1": {
    "bookingToken": "<GUID A>"
  },
  "V2": {
    "bookingToken": "<GUID B>"
  }
}
```

Full request/response pairs: `NDC_Integration/Artifacts/Logs/20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2.html` (TC-CAPCHECK-TPN-02).

## 💥 Impact

A token that is not unique cannot identify or authorise a single booking; fixing BUG-03 without fixing this would let the holder of one booking act on another that shares its token.
