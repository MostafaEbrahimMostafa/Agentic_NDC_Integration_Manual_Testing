# QA Execution Report — Round 19 "Real Clock Experiment" — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 6 test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-SEATMAP-BND-02, TC-SEATMAP-BIZ-02, TC-SEATMAP-REG-02

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-10-10T18:11:40.482Z
**Ended:** 2026-10-10T18:17:40.250Z
**Status:** COMPLETE
**Execution Duration:** 6m 0s ([View Time Breakdown](20261010-211140_SeatMap-GulfAir-KSA-Round19-RealClockExperiment_TimeBreakdown.html))
**Prior runs:** Rounds 1-18 (see NDC_Integration/Artifacts/Logs/)

## Scope note

Run note (Real Clock Experiment): every timestamp in this log is a live clock read taken when the event happened - each call's start/end, each test case's start/verdict, and each test case's own report-write window (append to the log + re-render of the .md, 85-98 ms each, written before the next test case started). The end stamp of a report-write window is only known after the render, so that one field is patched into the line in place right after the render (the .md is then re-rendered once more). Flights: all six chains used fresh dates (24-26 June 2027) and never reused a flight+date from earlier logs, except VAL-04's offer E2 (BAH-JED 2027-06-25, GF181), which had been used in an earlier round. Each test case ran its own chains (no shared seat maps), so BND-02 used 2 maps, BIZ-02 1 (ADT+CHD), REG-02 1. Every GulfAir seat on the VAL-03 flight (179 of 179) carries a fee, unlike Round 16.

## Summary

- Test cases logged: 6 of 6 planned
- Passed: 4
- Failed: 2
- Blocked: 0
- Failed test cases: TC-SEATMAP-VAL-04, TC-SEATMAP-REG-02

## Test case results

### TC-SEATMAP-POS-02 — PASS

- **Test Case:** Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-06-25, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 200 - pnr OODZPW, bookingToken TPC60517147920D10102026, gdsPNR "", ticket 722137003972 (29.3s)
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Confirmed. GetSeatMap returned non-empty offerId/responseId (identical to the AddPassenger values); Book accepted them and created a real ticketed PNR. The Postman collection-variable assignment itself is script-side and not observable over raw HTTP - verified the field mapping it relies on (resp.offerId/resp.responseId) instead. BUG-16 (Book 409 with a silently created booking) did NOT reproduce. Unchanged from Rounds 1-18.
- **Status:** PASS
- **Evidence:** GetSeatMap responseId == AddPassenger responseId: true; offerId equal: true; Book 200 pnr OODZPW, ticket 722137003972, 29.3s

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 138 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr OODZPW, bookingToken TPC60517147920D10102026, tickets 722137003972 (29.3s)

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book with passengersSelectedSeats.PAX1.setSegmentsSeats.&lt;segment&gt; = {cellCode 8A, cellId = the verbatim cellDetails.cellID from the GetSeatMap response} (AvailablePaid, GulfAir/KSA, BAH-RUH 2027-06-26, GF161, 1 ADT)
- **Response:** 200 - pnr TFQNIF, ticket 722137004081; passengersSelectedSeats PAX1/&lt;segment&gt; = {cellCode 8A, price 120 SAR}, totalSelectedSeatsAmount 120; Retrieve shows the same seat
- **Expected:** Book accepts the token despite the field-name casing difference (response cellID vs request cellId) and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** Confirmed. The cellID was accepted verbatim under the lowercase-d cellId request key and seat 8A was attached and echoed in passengersSelectedSeats, passengerFareBreakdown[].passengerSeats and priceDetails.totalSelectedSeats (120 SAR); Retrieve confirms it persisted. The casing difference is cosmetic. BUG-19 (valid seat silently dropped) did NOT reproduce, and this time on a flight where every seat carries a real fee (179 of 179 AvailablePaid cells priced above 0), which closes the Round 16 caveat about a 0 SAR flight. Unchanged from Rounds 1-18.
- **Status:** PASS
- **Evidence:** Book 200, pnr TFQNIF, ticket 722137004081 (40.4s); echo sel/passengerSeats/totalSelectedSeats = [8A], totalSelectedSeatsAmount 120; Retrieve (bookingStatus Booked) repeats 8A; request cellId equals GetSeatMap cellID byte for byte (323 characters)

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 933 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 933 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 179 seat cells
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr TFQNIF, bookingToken TPC60517147921D10102026, tickets 722137004081 (40.4s)
  - **Hop 6 &mdash; Retrieve:** PASS &mdash; 200 - pnr TFQNIF, bookingStatus Booked, seats ["8A"]

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book on offer E2 (BAH-JED 2027-06-25) with seat cellCode 8C but cellId = the cellID issued for seat 8A on a different offer E1 (BAH-JED 2027-06-24); two independent Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap chains
- **Response:** 200 - pnr THWPTO ticketed (722137003973) after 28.8s; passengersSelectedSeats came back empty; totalSelectedSeatsAmount 0; no error
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07, 14th confirmed occurrence, not new). The foreign cellId was not rejected: Book ran the full supplier round-trip, created and ticketed a real booking, and silently dropped the seat (empty passengersSelectedSeats, no seat fee) instead of returning an error. Seat 8C was neither attached nor refused. Same-round VAL-03 shows a valid same-offer cellId does attach (BUG-19 gone), so the foreign token is detected as not matching but swallowed rather than rejected.
- **Status:** FAIL
- **Evidence:** Book 200 in 28776 ms; pnr THWPTO, ticket 722137003973; passengersSelectedSeats empty; totalSelectedSeatsAmount 0 SAR; E1 and E2 had different responseId/offerId

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1202 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1202 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 5 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 1143 SAR
  - **Hop 6 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 1143 SAR
  - **Hop 7 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 8 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells
  - **Hop 9 &mdash; Book:** FAIL &mdash; 200 - pnr THWPTO, bookingToken TPC60517147922D10102026, tickets 722137003973 (28.8s)

### TC-SEATMAP-BND-02 — PASS

- **Test Case:** Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid, Blocked, and Occupied, and that Aisle-category cells carry no seatPriceDetails.
- **Category:** Boundary
- **Endpoint Name:** GetSeatMap
- **Request:** Two GetSeatMap responses enumerated cell by cell: chain A (BAH-RUH 2027-06-24, GF161, 1 ADT, 210 cells) and chain B (BAH-DMM 2027-06-25, GF103, ADT+CHD, 140 cells)
- **Response:** 200 both - cellCategory: Seat 298, Aisle 50, NoSeat 2; cellAvailability: AvailablePaid 298; paxCellAvailability: AvailablePaid 416, AvailableFree 2; no Blocked or Occupied; Aisle cells with cellDetails/price: 0
- **Expected:** Every cellCategory is Seat or Aisle; every cellAvailability/paxCellAvailability is AvailablePaid, Blocked or Occupied; a new value is logged and flagged, not hard-failed (8.3 policy); Aisle cells carry no seatPriceDetails
- **Actual:** Passed with two flags, as in Round 18 (flagged, not failed, per the 8.3 policy). No Blocked or Occupied value appeared anywhere on this airline. Two values outside the expected sets were seen: cellCategory "NoSeat" (2 cells on chain A - a taken/absent seat, cellDetails null) and paxCellAvailability "AvailableFree" (seat 8E, the bassinet seat on the A320 flight GF103, for both passengers at 0.00 SAR while the overall cellAvailability stays AvailablePaid). All 50 Aisle cells have cellDetails null, so none carries a price (0 violations). Unchanged from Round 18.
- **Status:** PASS
- **Evidence:** Chain A: cellCategory Seat 178 / Aisle 30 / NoSeat 2; cellAvailability AvailablePaid 178; paxCellAvailability AvailablePaid 178. Chain B: Seat 120 / Aisle 20; cellAvailability AvailablePaid 120; paxCellAvailability AvailablePaid 238 + AvailableFree 2 (8E PAX1 total 0, 8E PAX2 total 0). Aisle cells with cellDetails: 0 of 50.

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells
  - **Hop 5 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 2535 SAR
  - **Hop 6 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2535 SAR
  - **Hop 7 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 8 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 120 seat cells

### TC-SEATMAP-BIZ-02 — PASS

- **Test Case:** Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell.
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap (GulfAir/KSA, BAH-JED 2027-06-26, GF181, 1 ADT + 1 CHD): every AvailablePaid cell's seatPriceDetailsByPassenger.&lt;pax&gt; {totalPrice, basePrice, taxesPrice} checked (161 cells x 2 passengers = 322 pairs)
- **Response:** 200 - 322 cell/passenger pairs checked, 0 mismatches, 0 currency mismatches; amounts 40 SAR (206 pairs), 60 SAR (82), 120 SAR (34), taxes 0.00 everywhere
- **Expected:** totalPrice.amount == basePrice.amount + taxesPrice.amount for every priced cell/passenger pair, in the same currency; no cell reports a totalPrice inconsistent with its own basePrice+taxesPrice
- **Actual:** 0 mismatches in 322 pairs (161 AvailablePaid cells, PAX1 adult and PAX2 child, 161 pairs each). basePrice equals totalPrice everywhere and taxesPrice is 0.00 SAR (GulfAir does not split a seat charge into base and tax). All amounts are in SAR and the three components share one currency in every pair. No cell was missing a price map and no priced cell was 0. Unchanged from Round 18.
- **Status:** PASS
- **Evidence:** pairs=322 (PAX1 161, PAX2 161), mismatches=0, currency mismatches=0, cells without seatPriceDetailsByPassenger=0, zero-priced pairs=0; distinct amounts: 40 SAR/base 40/tax 0 x206, 60 SAR/base 60/tax 0 x82, 120 SAR/base 120/tax 0 x34

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 20 offers, offer[0] totalAmount 2126 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2126 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails 1 segment(s), 161 seat cells

### TC-SEATMAP-REG-02 — FAIL

- **Test Case:** Verify seatMapDetails.&lt;segment&gt;.{cabinLayoutsByDeck, rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails}}} structure matches the fuller schema captured 2026-08-10, AND flag/tolerate the flat-columns supplier variant (no zones[]/zoneId) confirmed present in a saved example.
- **Category:** Regression
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap (GulfAir/KSA, BAH-RUH 2027-06-24, GF161, 1 ADT) - full response snapshot diffed key by key against SPEC.md 2.7 (30 rows, 210 cells)
- **Response:** 200 - all documented fields present (zones[] layout shape, not the flat-columns variant), plus undocumented fields: top-level isFareCheckRequired, passengersDetails.&lt;pax&gt;.{birthDate, documentNumber, passengersSeatMapAvailability}, and a NoSeat cellCategory
- **Expected:** Every key listed in SPEC.md 2.7 is present and correctly typed; either the zones[]/zoneId shape or the flat columns[] shape is accepted (log which one this supplier uses)
- **Actual:** Every documented key is present and correctly typed: cabinLayoutsByDeck.Main.zones[].{zoneId,columns,cabinClass}, rows[].{rowNumber (number),deck,zoneId,cells[]}, cells[].{cellCategory,column,cellDetails}, cellDetails.{cellID,cellCode,cellAvailability,name,description,seatPriceDetails (null on all 178 seat cells),seatPriceDetailsByPassenger,cellCharacteristics (array)}. GulfAir uses the zones[]/zoneId shape and rows[] carry zoneId (not the flat-columns variant). The response also carries fields SPEC.md 2.7 does not list (isFareCheckRequired, passengersDetails.&lt;pax&gt;.{birthDate, documentNumber, passengersSeatMapAvailability}) and a NoSeat cellCategory (2 cells, cellDetails null) - the same schema drift flagged in every prior round, so kept FAIL for continuity; nothing is missing or mistyped. By the letter of this case's Expected Result alone it would be a pass; the FAIL records that SPEC.md 2.7 is out of date (update proposed again).
- **Status:** FAIL
- **Evidence:** top-level keys: supplier, offerId, responseId, isFareCheckRequired, flightSegments, passengersDetails, seatMapDetails; segment keys: cabinLayoutsByDeck, rows; decks: Main; cabinLayoutsByDeck.Main keys: zones (1 zone: zoneId, columns, cabinClass); row keys: rowNumber, deck, zoneId, cells (30 rows); cell categories: Seat 178, Aisle 30, NoSeat 2; seat cellDetails keys: cellID, cellCode, cellAvailability, name, description, seatPriceDetails, seatPriceDetailsByPassenger, cellCharacteristics; passengersDetails.PAX1 keys: passengerTypeCode, name, birthDate, documentNumber, passengersSeatMapAvailability

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993 SAR
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** FAIL &mdash; 200 - seatMapDetails 1 segment(s), 178 seat cells

## Findings

### Defects

- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 14, not new) &mdash; Book accepts a cellId that was issued for a different offer's seat map: it runs the full booking, tickets it, and silently drops the seat (empty passengersSelectedSeats, no fee) instead of returning an error.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, with no booking created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7, 11, 12, 13, 15, 16, 17, 18 (Round 4 blocked by an outage); reproduced again Round 19 (2026-10-10). **Impact:** The cellId token is not validated, so a stale or foreign token produces a booking with no seat and no error - the caller believes a seat was reserved. The same silent drop also happens for an unavailable or non-existent cellCode (TC-BOOK-NEG-05, TC-BOOK-NEG-09). Evidence: Book on offer E2 (cellCode 8C) with the cellId of seat 8A from offer E1: 200, pnr THWPTO, ticket 722137003973, passengersSelectedSeats empty, totalSelectedSeatsAmount 0, no error.

### Not reproduced

- **BUG-16** (Book returns an error while silently creating the booking) &mdash; exercised by TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04. All 3 Book calls (29s, 40s, 29s) returned a clean HTTP 200 with a pnr and bookingToken; none returned 409 NDC-INT-UNC-Z9999 or 500. Intermittent across rounds, so recommend a wider re-verification before closing.
- **BUG-19** (Book silently drops a valid same-offer seat selection) &mdash; exercised by TC-SEATMAP-VAL-03. Round 15 reproduced 2 of 2 (seats 12D, 10C dropped). Rounds 16, 18 and now Round 19 VAL-03 attached the chosen seat: seat 8A on GF161 (BAH-RUH 2027-06-26) was attached at 120 SAR and persisted through Retrieve on the first attempt. Unlike Round 16, this flight prices every seat above 0 SAR (179 of 179), so the earlier 0 SAR caveat no longer applies; still only 1 attempt this round.

## Proposed SPEC.md updates

- §2.7 &mdash; status: *pending*
  - **Old:** "`cellCategory` observed values (updated 2026-08-10): `Seat`, `Aisle` — `UNKNOWN` whether galley/lavatory/exit-row-only markers exist as further distinct categories; not observed."
  - **New:** "`cellCategory` observed values (updated 2026-10-10): `Seat`, `Aisle`, `NoSeat` (a taken or absent seat: `cellDetails` null, `column` set; GulfAir, 20 narrowbody segments). Galley/lavatory/exit-row-only markers remain `UNKNOWN`; not observed on any narrowbody sample."
  - **Correction:** Re-confirmed live in Round 19 (BND-02 / REG-02): same values and extra fields seen again; still not applied to SPEC.md.

- §2.7 / §8.3 &mdash; status: *pending*
  - **Old:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples."
  - **New:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-10-10): `AvailablePaid`, `AvailableFree`, `Blocked`, `Occupied`. `AvailableFree` is confirmed live for GulfAir at the per-passenger level (`paxCellAvailability`, explicit 0.00 price objects, overall `cellAvailability` stays `AvailablePaid`) and in the AirArabia example (null pricing). GulfAir never returns `Blocked`/`Occupied` (a taken seat becomes `cellCategory` `NoSeat`). `AvailableAfterReservation` remains unconfirmed."
  - **Correction:** Re-confirmed live in Round 19 (BND-02 / REG-02): same values and extra fields seen again; still not applied to SPEC.md.

- §2.7 &mdash; status: *pending*
  - **Old:** "`[Observed example, V2, confirmed against the fuller raw example added 2026-08-10]` full shape, per segment inside `seatMapDetails`"
  - **New:** "Response also carries top-level `offerId`, `responseId` and `isFareCheckRequired`, and `passengersDetails.&lt;paxRef&gt;` carries `birthDate`, `documentNumber` and `passengersSeatMapAvailability` keyed segmentRefId -&gt; deck name -&gt; cellCode[] (GulfAir, 2026-10-10). Full shape, per segment inside `seatMapDetails`"
  - **Correction:** Re-confirmed live in Round 19 (BND-02 / REG-02): same values and extra fields seen again; still not applied to SPEC.md.

## Cleanup / follow-up

Live artifacts left behind this round (3):

- **needs_void_cancel** &mdash; pnr OODZPW (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-06-25, 1 ADT, ticket 722137003972, no seat). Staging test booking; void/cancel via the platform team if it should not remain.
- **needs_void_cancel** &mdash; pnr TFQNIF (TC-SEATMAP-VAL-03) &mdash; Real ticketed booking (BAH-RUH 2027-06-26, 1 ADT, ticket 722137004081) with seat 8A attached (120 SAR).
- **needs_void_cancel** &mdash; pnr THWPTO (TC-SEATMAP-VAL-04) &mdash; Real ticketed booking (BAH-JED 2027-06-25, 1 ADT, ticket 722137003973, no seat attached). Evidence for BUG-07 - keep until triaged.

