# [V2][GulfAir][Book] – Book Returns HTTP 409 NDC-INT-UNC-Z9999 While the Booking Is Silently Created and Ticketed; No PNR Returned

## 📄 Description

`Book` (`POST api/v2/FlightBooking/Book`) failed on **4 of 4** fresh offers this round. Each call ran for
34–48 seconds and then returned `HTTP 409` with `ErrorCode: NDC-INT-UNC-Z9999` and a
`SocketException: "Name or service not known"` context. The booking was **not** actually failed:

- the error envelope's `OriginalSupplierRequest` field holds a **"Booking Confirmation" e-mail body for a
  real, ticketed booking** (airline PNR, e-ticket number, passenger, fare — 993.00 SAR), although the
  e-mail's `Subject` reads "Booking Fail on Staging Environment via NDC Integration";
- re-submitting the same offer returns `HTTP 409` `"This booking has already been created (609).  Please
  check on the Order Management page to confirm."`.

The caller therefore never receives `pnr` / `bookingToken` / `gdsPNR` for a booking that exists. The
`SocketException` "Name or service not known" is a DNS failure, which points at the post-booking
confirmation-e-mail step rather than the supplier call — that is an inference from the envelope, not
something the API states.

**This is the existing `BUG-16`** (Round 8, 2026-09-09: Book/Hold returned HTTP 500 while silently
creating the booking), **now confirmed for the 2nd time**, with a different status code (409 instead of 500)
and with the booking identifiers recoverable from the error body. BUG-16 did not reproduce in Rounds 9, 10
and 11 (Book returned a clean 200 each time).

## History

| Round | Date | Result |
|---|---|---|
| 8 | 2026-09-09 | FAIL — Book/Hold HTTP 500 `ServerError`, booking created, `409 already created (609)` on retry |
| 9, 10, 11 | 2026-09-29 | Not reproduced — Book returned HTTP 200 with a real PNR |
| 12 | 2026-09-30 | FAIL — Book HTTP 409 `NDC-INT-UNC-Z9999` on 4 of 4 fresh offers, booking created each time |

## 🔁 Steps to Reproduce

1. `Search` → `FareConfirm` → `AddPassenger` → `GetSeatMap` for a fresh GulfAir/`KSA` offer (BAH→RUH,
   2027-07-01, 1 ADT). Any offer works; it reproduced on four independent chains.
2. `Book` with that offer's `ResponseId`/`selectedOfferId` (no seat selection is needed).
3. Observe: after roughly 34 seconds `HTTP 409`, no `pnr`.
4. Re-send `Book` for the **same** offer (any payload).
5. Observe: `HTTP 409` `"This booking has already been created (609)"`, answered in about 1.5 seconds.

## ❌ Actual Result

First call on a fresh offer (redacted; `OriginalSupplierRequest` replaced, see Evidence):

```json
{
  "Status": 409,
  "TransactionId": "18063069-0bc6-4700-ac21-dae7d8b8dfb0",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "ErrorMessage": "NDC-INT-UNC-Z9999",
  "Context": [ { "Name": "SocketException", "Value": "Name or service not known" } ],
  "OriginalSupplierRequest": "[REDACTED – JSON with Subject \"Booking Fail on Staging Environment via NDC Integration\" and an HTML Body that is a Booking Confirmation: airline PNR TVQBBV, ticket 722136996973, passenger, base 640.00 + taxes 353.00 = 993.00 SAR; also Recipients/Ccs contact details]",
  "OriginalSupplierResponse": "Technical Exception (No Content)"
}
```

Re-submit on the same offer:

```json
{
  "Status": 409,
  "TransactionId": "48ff416c-ca0e-4a0d-9fa1-d81da177f034",
  "ErrorCode": "NDC-INT-UNC-Z9999",
  "Context": [ { "Name": "-1", "Value": "This booking has already been created (609).  Please check on the Order Management page to confirm." } ],
  "OriginalSupplierRequest": "[REDACTED – full upstream SOAP request including live apiKey/secretKey in plaintext]"
}
```

Bookings that exist although Book reported an error:

| Chain | Book call started (UTC) | Duration | PNR | E-ticket | Total |
|---|---|---|---|---|---|
| A | 2026-09-30T11:06:39Z | 34.0 s | RIPLBZ | 722136996972 | 993.00 SAR |
| A2 | 2026-09-30T11:07:42Z | 34.2 s | TVQBBV | 722136996973 | 993.00 SAR |
| A3 | 2026-09-30T11:10:22Z | 36.9 s | RCEVKA | 722136996974 | 993.00 SAR |
| C4 (with seat 12B, TC-SEATMAP-VAL-04) | 2026-09-30T11:12:16Z | 47.7 s | REGOSM | 722136996975 | 1053.00 SAR |

## ✅ Expected Result

```json
{
  "supplier": "GulfAir",
  "pnr": "<real PNR>",
  "bookingToken": "<token>",
  "gdsPNR": "",
  "tickets": { "PAX1": { "ticketStatus": "Booked", "ticketNumber": "<e-ticket>" } }
}
```

A booking that was created and ticketed must be reported to the caller as `HTTP 200` with its identifiers
(SPEC.md §2.9). A failure in a secondary step such as the confirmation e-mail must not turn a successful
booking into an error response, and must never put the e-mail body, recipient details or any credential
into an error envelope.

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `staging`
- **Credentials Selector:** `KSA`
- **Correlation ID:** first calls `fb2d4f8c-f29d-4b18-ac09-bb9d0bac7eb3`, `18063069-0bc6-4700-ac21-dae7d8b8dfb0`,
  `96ddceef-8983-44f4-ad7b-28b118306bf4`, `1172e0ff-23aa-44bb-bd97-29cfe99e3194`; re-submits
  `48ff416c-ca0e-4a0d-9fa1-d81da177f034`, `b3c1827c-d9d1-45e7-8748-db945e89dc88`

## 📊 Severity

**Critical** — real ticketed bookings are created with no identifier returned to the caller, so they cannot
be tracked, voided or cancelled through the API and any caller that retries creates a duplicate-booking
conflict; it blocks the whole Book path (and every test that depends on it). The same envelopes expose
recipient contact details, and the re-submit envelope still leaks live supplier credentials (BUG-11 class).

## 📎 Evidence

- **Actual response (redacted):** see the two JSON bodies above. Four first-call 409s (34.0 s, 34.2 s,
  36.9 s, 47.7 s), two re-submit 409s.
- **Expected response (redacted):** `HTTP 200` with `pnr`/`bookingToken`/`gdsPNR`, as Book returned in
  Rounds 9–11 (for example pnr QRDHHX in Round 11).
- Source: `TC-SEATMAP-POS-02` (blocked), `TC-SEATMAP-VAL-03` (blocked), `TC-SEATMAP-VAL-04` in
  [20260930-140455_SeatMap-GulfAir-KSA-Round12.md](../../Logs/20260930-140455_SeatMap-GulfAir-KSA-Round12.md).
- The PNRs/e-ticket numbers above were read from the confirmation e-mail embedded in each error envelope;
  no `bookingToken` was ever returned.

## 💥 Impact

`TC-SEATMAP-POS-02` and `TC-SEATMAP-VAL-03` could not be judged because no Book response carried a `pnr`.
Four live bookings (RIPLBZ, TVQBBV, RCEVKA, REGOSM) now exist and need cancelling by the platform team
(the API's Void needs identifiers this call never returned). A real client that retries after the 409 gets
"already created" and cannot tell whether it holds a booking. **Recommend:** (1) return the true outcome
(HTTP 200 + identifiers) when the booking succeeded and treat the confirmation e-mail as best-effort;
(2) check DNS/SMTP configuration of the staging e-mail step (`Name or service not known`); (3) strip e-mail
bodies, recipient details and supplier credentials from every error envelope; (4) cancel the four bookings
above.
