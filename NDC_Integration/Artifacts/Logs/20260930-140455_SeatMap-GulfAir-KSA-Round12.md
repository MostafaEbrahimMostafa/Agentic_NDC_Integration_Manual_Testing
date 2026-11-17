# QA Execution Report — Round 12 targeted run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 11 test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-SEATMAP-VAL-07, TC-SEATMAP-VAL-08, TC-SEATMAP-VAL-09, TC-SEATMAP-VAL-10, TC-SEATMAP-BIZ-03, TC-SEATMAP-BIZ-04, TC-SEATMAP-SEC-01, TC-SEATMAP-SEC-02

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-09-30T11:04:55.057Z
**Ended:** 2026-09-30T11:24:18.966Z
**Status:** COMPLETE
**Execution Duration:** 19m 24s ([View Time Breakdown](20260930-140455_SeatMap-GulfAir-KSA-Round12_TimeBreakdown.html))
**Prior runs:** Rounds 1-11 (see NDC_Integration/Artifacts/Logs/)

## Scope note

Targeted, user-requested run of 11 SeatMap test cases (not the full SeatMap_TestCases.csv suite). The disk log was written in one batch after execution rather than per test case in real time, so each test case's reporting_started_at/reporting_ended_at brackets a real full Markdown re-render taken at write-up time, not at verdict time. TC-SEATMAP-VAL-07, VAL-08, VAL-09 and VAL-10 are read off one shared GetSeatMap response (chain A2), so their timing spans are that call's span; the inline analysis time is folded into it. HEADLINE: every Book call on staging failed this round with HTTP 409 NDC-INT-UNC-Z9999 (SocketException 'Name or service not known') after 34-48 seconds, yet the failure envelopes embed a 'Booking Confirmation' e-mail for a REAL ticketed booking, and re-submitting the same offer returns 'This booking has already been created (609)'. This is the Round 8 BUG-16 pattern (booking silently created, no PNR returned), now with a different status code and with the booking identifiers recoverable from the envelope. Because no Book response carried pnr/bookingToken, the Book-response assertions of TC-SEATMAP-POS-02 and TC-SEATMAP-VAL-03 could not be evaluated and are BLOCKED (same convention as Round 8). TC-SEATMAP-VAL-04 and TC-SEATMAP-BIZ-04 could still be judged from the evidence the failure envelopes and later seat maps provide. The x-api-key is never written to the log; raw OriginalSupplierRequest payloads (credentials, e-mail recipient details) are replaced by a redaction marker.

## Summary

- Test cases logged: 11 of 11 planned
- Passed: 7
- Failed: 2
- Blocked: 2
- Failed test cases: TC-SEATMAP-VAL-04, TC-SEATMAP-SEC-01
- Blocked test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03

## Test case results

### TC-SEATMAP-POS-02 — BLOCKED

- **Test Case:** Verify GetSeatMap sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as ResponseId/selectedOfferId when SeatMap precedes it
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-07-01, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response; tried on 3 independent chains
- **Response:** 409 NDC-INT-UNC-Z9999 on all 3 attempts (34.0s, 34.2s, 36.9s) - no pnr/bookingToken/gdsPNR returned; GetSeatMap itself returned 200 with non-empty offerId/responseId each time
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger IDs being re-sent
- **Actual:** GetSeatMap half confirmed (200, offerId/responseId non-empty and equal to the AddPassenger values). Book half could not be evaluated: Book accepted the IDs (it created real bookings RIPLBZ, TVQBBV, RCEVKA) but answered 409 with no pnr, so the 'returns pnr/bookingToken/gdsPNR' assertion has no response to check. Blocked by BUG-16 (Book silently succeeds while returning an error).
- **Status:** BLOCKED
- **Evidence:** 3 of 3 Book calls 409 NDC-INT-UNC-Z9999 / SocketException; confirmation e-mail inside each envelope shows a real booking: RIPLBZ, TVQBBV (ticket 722136996973), RCEVKA (ticket 722136996974), each 993.00 SAR; GetSeatMap responseId a87b75c4-8562-4de9-88ec-6ac2947e38a0 == AddPassenger responseId a87b75c4-8562-4de9-88ec-6ac2947e38a0

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993.00 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993.00
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails populated (176 Seat cells)
  - **Hop 5 &mdash; Book:** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 - no pnr/bookingToken in the response (34s)
  - **Hop 6 &mdash; Book (repeat attempt, fresh chain A3):** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 - no pnr/bookingToken in the response (37s)
  - **Hop 7 &mdash; Book (repeat attempt, first chain A):** BLOCKED &mdash; 409 NDC-INT-UNC-Z9999 - no pnr/bookingToken in the response (34s)

### TC-SEATMAP-VAL-03 — BLOCKED

- **Test Case:** Verify cellID round-trips into Book passengersSelectedSeats.setSegmentsSeats.cellId despite casing difference (cellID vs cellId)
- **Category:** Validation
- **Endpoint Name:** GetSeatMap -&gt; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-07-01, 1 ADT) on the chain A2 offer with seat 12C and cellId = the verbatim cellDetails.cellID from that offer's GetSeatMap response
- **Response:** 409 NDC-INT-UNC-Z9999 'This booking has already been created (609)' in 1.7s - no pnr, no seat echo
- **Expected:** Book accepts the token despite the field-name casing difference and attaches the correct seat, echoed in passengersSelectedSeats/passengerSeats
- **Actual:** Not evaluable. The offer used here had already been silently booked by the POS-02 attempt (BUG-16), so Book answered 'booking already created' before looking at the seat, and a Book on a fresh offer would only have returned the same 409-without-pnr envelope, so there is no seat echo to check. No new booking was made for this case, to avoid piling up untracked live bookings. The cellID/cellId casing question stays CONFIRMED from Rounds 1-11 (case-insensitive binding); it was not re-tested.
- **Status:** BLOCKED
- **Evidence:** Book (seat 12C, verbatim cellID) -&gt; 409 'This booking has already been created (609)' on chain A2's offer; seat 12C on chain A2's GetSeatMap: AvailablePaid 60.00 SAR

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer
- **Category:** Validation
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap (x2 offers) -&gt; Book
- **Request:** Book using Offer C's ResponseId/selectedOfferId but cellId taken from Offer B's GetSeatMap (seat 12C token), cellCode=12B (valid on Offer C); two fresh Search-&gt;FareConfirm-&gt;AddPassenger-&gt;GetSeatMap chains
- **Response:** 409 NDC-INT-UNC-Z9999 after 47.7s (the Book-wide failure, see BUG-16) - not a validation rejection; the envelope's embedded confirmation e-mail shows booking REGOSM, ticket 722136996975, total 1053.00 SAR
- **Expected:** Request is rejected with a 4xx validation error (exact shape UNKNOWN per 7.9) because the cellID token embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07, 8th confirmed occurrence). The foreign cellId was not rejected: Book ran the full supplier round-trip and created a real, ticketed booking with seat 12B priced in (total 1053.00 SAR = 993.00 + 60.00). The Book response itself was the Book-wide 409 (BUG-16), so this verdict rests on the booking record embedded in the envelope plus seat 12B disappearing from later seat maps, not on a 200 echo.
- **Status:** FAIL
- **Evidence:** booking REGOSM, ticket 722136996975, fare 640.00 + 353.00 + seat 60.00 = 1053.00; seat 12B: AvailablePaid before, NoSeat on Offer B re-read and on a fresh Offer D afterwards (see TC-SEATMAP-BIZ-04); an earlier, faster 'already created' reject (1.4s) on a previously-used offer is NOT evidence and is ignored

  - **Hop 1 &mdash; Offer B - Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993.00 SAR
  - **Hop 2 &mdash; Offer B - FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993.00
  - **Hop 3 &mdash; Offer B - AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; Offer B - GetSeatMap:** PASS &mdash; 200 - seatMapDetails populated (176 Seat cells)
  - **Hop 5 &mdash; Offer C - Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993.00 SAR
  - **Hop 6 &mdash; Offer C - FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 993.00
  - **Hop 7 &mdash; Offer C - AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 8 &mdash; Offer C - GetSeatMap:** PASS &mdash; 200 - seatMapDetails populated (176 Seat cells)
  - **Hop 9 &mdash; Offer C - Book (foreign cellId):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 after 47.7s - no pnr returned, but booking REGOSM / ticket 722136996975, total 1053.00 SAR was created

### TC-SEATMAP-VAL-07 — PASS

- **Test Case:** Verify window/aisle/extra-legroom/exit-row seat attributes are programmatically derivable from cellCharacteristics for every Seat-category cell
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** One GetSeatMap response (GulfAir/KSA, BAH-RUH 2027-07-01, 1 ADT) - all 176 Seat cells read and classified (Search-&gt;FareConfirm-&gt;AddPassenger-&gt;GetSeatMap chain executed first)
- **Response:** 200 - 30 rows x 7 columns; 176 Seat cells, 30 Aisle cells, 4 NoSeat cells; 797 cellCharacteristics entries, every padisCode = "Unknown"
- **Expected:** For codes in the sourced canonical PADIS table the derived classification must not contradict column position or description text; codes outside the table are logged, not failed
- **Actual:** Every Seat cell carries a derivable window/aisle/centre marker in its description text; 0 of 176 contradict their column position (A/F=WINDOW, C/D=AISLE_SEAT, B/E=CENTER_SEAT, left/right side consistent for all 176). Extra-legroom (LEG_SPACE_SEAT rows 8, 19, 20), bulkhead (row 8) and exit-row (EXIT_ROW_SEAT rows 18-21, 24 seats) are derivable from the text too. padisCode is "Unknown" for 797/797 characteristics, so the PADIS-code route yields nothing for this supplier; attributes are derivable only from the description text (logged, not failed, per the expected result). Unchanged from Rounds 1-11.
- **Status:** PASS
- **Evidence:** column/description mismatches: 0 of 176; WINDOW=59, AISLE_SEAT=59, CENTER_SEAT=58; EXIT_ROW_SEAT=24 (rows 18-21); LEG_SPACE=16 (rows 8,19,20); BULKHEAD=4; padisCode Unknown=797/797

### TC-SEATMAP-VAL-08 — PASS

- **Test Case:** Verify seatPriceDetails/seatPriceDetailsByPassenger is populated for every AvailablePaid cell and null/absent for every Blocked or Occupied cell
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response as VAL-07 - every cell partitioned by cellAvailability
- **Response:** 200 - 176 cells with cellDetails, all cellAvailability = AvailablePaid; 34 further cells have cellDetails null (30 Aisle, 4 NoSeat)
- **Expected:** Every AvailablePaid cell has a populated seatPriceDetailsByPassenger (totalPrice/basePrice/taxesPrice per passenger); every Blocked/Occupied cell has null pricing
- **Actual:** AvailablePaid: 176/176 have seatPriceDetailsByPassenger with totalPrice, basePrice and taxesPrice populated (120.00 SAR x16, 60.00 SAR x52, 40.00 SAR x108; taxes 0.00). The Blocked/Occupied half of the rule could not be exercised: this GulfAir response contains no Blocked or Occupied cell; seats already taken become NoSeat with null cellDetails instead (see TC-SEATMAP-BIZ-04). No non-paid cell carries pricing (0 violations). Unchanged from Rounds 1-11.
- **Status:** PASS
- **Evidence:** AvailablePaid n=176, withByPax=176, incomplete price=0; non-AvailablePaid cells with pricing=0; Blocked/Occupied cells present=0; NoSeat (null cellDetails)=4 (8A, 8E, 10B, 10C)

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** Verify cellCode is unique across all cells within one flight segment's seatMapDetails
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response as VAL-07 - every cellCode in the single segment collected and checked for duplicates
- **Response:** 200 - 176 Seat cells, 176 distinct cellCode values
- **Expected:** No cellCode repeats within one segment (a duplicate is a confirmed defect)
- **Actual:** No duplicates: 176 cellCodes, 176 unique (rows 8-38, columns A-F). Unchanged from Rounds 1-11.
- **Status:** PASS
- **Evidence:** cellCodes=176 unique=176 duplicates=0 (segment GF-GF161-GF161-2027070102-2027070104-O)

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** Verify structural uniqueness and domain constraints across decks/zones/rows/columns
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response as VAL-07 - cabinLayoutsByDeck and rows[] checked for uniqueness and column domain
- **Response:** 200 - 1 deck (Main), 1 zone (Cabin1, ECONOMY, columns A,B,C,null,D,E,F), 30 rows numbered 8-38
- **Expected:** rowNumber unique within the segment; zoneId unique within a deck; every non-null column in A-F; null column only on Aisle cells
- **Actual:** All four constraints hold: 30 row numbers, 30 unique; 1 zone in deck Main (unique); Seat-cell columns are exactly {A,B,C,D,E,F}; the 30 null-column cells are all Aisle-category. The 4 NoSeat cells (8A, 8E, 10B, 10C) carry a real column rather than null - allowed by the rule (it only restricts nulls). Every row deck/zoneId resolves to the declared layout. Unchanged from Rounds 1-11.
- **Status:** PASS
- **Evidence:** rows=30 unique=30; decks=1; zones=1; seat columns=A-F; null-column cells: Aisle=30 (100%), non-Aisle=0; rows with unresolved deck/zone=0

### TC-SEATMAP-BIZ-03 — PASS

- **Test Case:** Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported and internally consistent (not required to list every passenger)
- **Category:** Business Rule
- **Endpoint Name:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap
- **Request:** GetSeatMap for a fresh 3-passenger offer (2 ADT + 1 CHD, BAH-RUH 2027-07-01) - every cell compared against passengersSeatMapAvailability
- **Response:** 200 - 176 Seat cells; PAX1/PAX2/PAX3 each have a 176-code allow-list; every cell's seatPriceDetailsByPassenger lists PAX1, PAX2 and PAX3
- **Expected:** A passenger listed in a cell seatPriceDetailsByPassenger should also have that cellCode in their own passengersSeatMapAvailability allow-list; absence is valid, completeness is NOT asserted; overall and per-passenger availability may legitimately differ
- **Actual:** Internally consistent: 528 passenger-cell price entries (176 x 3), 0 listed for a cell absent from that passenger's allow-list, 0 allow-list codes without a priced cell. GulfAir lists all three passengers on every cell (so the 'absence is valid' branch could not be exercised - fine, it is not required), and per-passenger paxCellAvailability equals the overall cellAvailability everywhere (0 differences; all AvailablePaid). For context: the CHD passenger is offered every exit-row cell (24/24), the already-tracked BUG-09.
- **Status:** PASS
- **Evidence:** cells=176; listed-pax-set [PAX1,PAX2,PAX3]=176 cells; listed-but-not-in-allow-list=0; allow-list-but-not-priced=0; paxCellAvailability != cellAvailability: 0; CHD PAX3 present on 24/24 EXIT_ROW_SEAT cells

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 2869.00 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - selectedOffer.totalAmount 2869.00
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails populated (176 Seat cells)

### TC-SEATMAP-BIZ-04 — PASS

- **Test Case:** Exploratory - confirm GetSeatMap reflects real-time supplier inventory rather than a cached snapshot
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap -&gt; Book -&gt; GetSeatMap
- **Request:** GetSeatMap #1 (Offer B, seat 12B AvailablePaid) -&gt; seat 12B taken by the Offer C booking from VAL-04 -&gt; GetSeatMap #2 with the same Offer B ids -&gt; GetSeatMap #3 on a fresh Offer D
- **Response:** Call #1: 12B = AvailablePaid (176 seat cells). After the booking: call #2 and call #3 both return 12B as NoSeat with cellDetails null (175 seat cells) and 12B absent from the passenger allow-list
- **Expected:** UNKNOWN - if reliably forceable, the cell availability transitions between the calls, confirming a live supplier round-trip rather than a cached response
- **Actual:** CONFIRMED live inventory, again (first confirmed Round 11). The seat was taken by a booking whose Book response was a 409 (BUG-16), but the booking really existed at the supplier, and both the same-offer and a fresh-offer seat map dropped seat 12B straight away. A taken seat is still NOT reported as cellAvailability 'Occupied': the cell becomes cellCategory 'NoSeat' with cellDetails null and leaves passengersSeatMapAvailability.
- **Status:** PASS
- **Evidence:** Row 12 seat B: AvailablePaid (call #1) -&gt; NoSeat/null (calls #2 and #3); seat cells 176 -&gt; 175; NoSeat cells 4 -&gt; 5; PAX1 allow-list contains 12B before, not after; response headers carry no Cache-Control/ETag (CorrelationId only)

  - **Hop 1 &mdash; GetSeatMap (call #1, baseline, Offer B):** PASS &mdash; 200 - seat 12B = Seat / AvailablePaid (60.00 SAR); 176 seat cells
  - **Hop 2 &mdash; Book (occupy 12B via Offer C, VAL-04):** PASS &mdash; 409 NDC-INT-UNC-Z9999 (booking REGOSM created, seat 12B taken)
  - **Hop 3 &mdash; GetSeatMap (call #2, same Offer B):** PASS &mdash; 200 - 12B is now NoSeat with cellDetails null; 175 seat cells
  - **Hop 4 &mdash; GetSeatMap (call #3, fresh Offer D):** PASS &mdash; 200 - 12B again NoSeat/cellDetails null; 175 seat cells

### TC-SEATMAP-SEC-01 — FAIL

- **Test Case:** Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap
- **Category:** Security
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap with a valid KSA-issued offer (chain A2): (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier/selector switched to TravelportNdc/UAE, (3b) same supplier GulfAir with credentialsSelector switched to UAE; extra probes: empty x-api-key, bogus selector, omitted selector
- **Response:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 400 NDC-INT-TEC-A0001 "Failed to deserialize the selected offer"; (3b) 200 - the full seat map was returned; extras: empty key 401, bogus selector 400, omitted selector 400
- **Expected:** All three variants rejected (exact status/error shape UNKNOWN; reuse the envelope other endpoints produce)
- **Actual:** Two of the three checks pass cleanly, the third only half-passes. Switching to a different SUPPLIER is rejected (400), but switching only the credentialsSelector to another VALID one for the same supplier (GulfAir/UAE, a real GulfAir tenant) is NOT rejected: GetSeatMap returns the complete seat map for an offer created under KSA. So credentialsSelector is still not enforced as an authorization boundary on GetSeatMap (BUG-17, reproduced for the 2nd time), contradicting SPEC.md 7.14's description of supplier/credentialsSelector as the API's implicit authorization boundary.
- **Status:** FAIL
- **Evidence:** control 200; badKey 401 AuthenticationError "Invalid authorization header"; badClient 401 (same envelope); supplier switch 400 NDC-INT-TEC-A0001 SelectedOfferId "Failed to deserialize the selected offer"; GulfAir/UAE with a KSA offer 200 (~198 KB body, offerId/responseId returned, responseId equal to the KSA offer's)

  - **Control - valid headers, GulfAir/KSA (baseline):** HTTP 200
  - **Attempt 1 of 4 - invalid x-api-key:** HTTP 401
  - **Attempt 2 of 4 - invalid Client-Id:** HTTP 401
  - **Attempt 3 of 4 - cross-tenant: supplier switched to TravelportNdc/UAE:** HTTP 400
  - **Attempt 4 of 4 - cross-tenant: same supplier GulfAir, credentialsSelector switched KSA -&gt; UAE:** HTTP 200
  - **Extra probe - empty x-api-key:** HTTP 401
  - **Extra probe - bogus credentialsSelector (ZZZ):** HTTP 400
  - **Extra probe - credentialsSelector omitted:** HTTP 400

### TC-SEATMAP-SEC-02 — PASS

- **Test Case:** Record that supplier-side authentication security and request/response logging are not independently verifiable through this API black-box contract
- **Category:** Documentation
- **Endpoint Name:** GetSeatMap (documentation)
- **Request:** N/A - documentation/scope-boundary case, no live API call
- **Response:** N/A
- **Expected:** Documented per 1.5/1.8/PRD 7: AC8 (supplier-side authentication) and the logging half of AC9 are confirmable only via a backend credential/config audit and log/observability review, not through this suite; AC9 graceful-error half is covered by TC-SEATMAP-NEG-05
- **Actual:** Documented as specified; SPEC.md 1.5/1.8 and NDC_PRD.md 7 (Gap #1: hardcoded x-api-key/Client-Id) re-checked and still say the same. AC8/AC9 must not be marked covered by API tests without the paired backend/config/log audit. Unchanged from Rounds 1-11.
- **Status:** PASS
- **Evidence:** No API call made, per the test case's own definition; SPEC.md headings 1.5 and 1.8 present (2/2) and the PRD Gap #1 line present (1/1)

## Findings

### Defects

- **[TC-SEATMAP-POS-02] BUG-16 (occurrence 2, not new) &mdash; Book returns HTTP 409 NDC-INT-UNC-Z9999 (SocketException "Name or service not known") after 34-48 seconds while the booking is actually created and ticketed: the envelope embeds the booking's confirmation e-mail, and re-submitting the same offer answers "This booking has already been created (609)". The caller never receives a pnr/bookingToken.** Field: `Book response (HTTP status / pnr / bookingToken)`. Expected: HTTP 200 with {"pnr":"&lt;real PNR&gt;","bookingToken":"&lt;token&gt;","gdsPNR":"&lt;value or empty&gt;"} - a booking that was created must be reported as created. **History:** First observed Round 8 (2026-09-09, as HTTP 500 + "already created (609)" on retry); not reproduced in Rounds 9, 10, 11 (Book returned a clean 200); reproduced again Round 12 (2026-09-30) on 4 of 4 fresh Book calls, now as HTTP 409 NDC-INT-UNC-Z9999. **Impact:** Real ticketed bookings are created with no identifier returned to the caller, so they cannot be tracked, voided or cancelled through the API; every Book-dependent test (POS-02, VAL-03) is blocked. New root-cause clue versus Round 8: the failure appears to be in the post-booking confirmation-e-mail step (DNS failure), not the supplier call. The failure envelopes also expose recipient contact details, PNR and ticket number. Evidence: 4 of 4 fresh Book calls 409 NDC-INT-UNC-Z9999 (34.0s, 34.2s, 36.9s, 47.7s) with Context SocketException "Name or service not known"; each envelope's embedded confirmation e-mail shows a real booking: RIPLBZ/722136996972, TVQBBV/722136996973, RCEVKA/722136996974, REGOSM/722136996975 (993.00 SAR; REGOSM 1053.00 SAR incl. seat); re-submits on used offers -&gt; 409 "This booking has already been created (609)".
- **[TC-SEATMAP-VAL-04] BUG-07 (occurrence 8, not new) &mdash; Book accepts a cellId issued for a different offer's GetSeatMap response and creates a ticketed booking with the seat attached and priced.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting a cellId that does not belong to this offer, with no booking created. **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7, 11 and now 12 (Round 4 blocked by an outage; Rounds 8-10 did not exercise it). **Impact:** The cellId token is not validated at all; seat selection is driven purely by cellCode, so a stale, foreign or forged token still gets a caller charged and ticketed for the seat. This round the evidence comes from the booking record inside the BUG-16 envelope, not from a 200 echo. Evidence: Book on Offer C (cellCode 12B) with Offer B's 12C cellId ran the full ~48s booking path and created booking REGOSM / ticket 722136996975, total 1053.00 SAR = 993.00 + 60.00 seat; seat 12B then disappeared from every later seat map.
- **[TC-SEATMAP-SEC-01] BUG-17 (occurrence 2, not new) &mdash; GetSeatMap does not reject a request whose credentialsSelector differs from the one the offer was created under (same supplier, different valid selector).** Field: `credentialsSelector`. Expected: 4xx rejection (offer not found / not authorized for this credentialsSelector), as happens when the supplier is switched. **History:** First observed Round 11 (2026-09-29); reproduced again Round 12 (2026-09-30). **Impact:** credentialsSelector is the API's per-tenant boundary (SPEC.md 7.14). A caller holding an offerId/responseId from one tenant (KSA) can read that offer's seat map through another tenant's selector (UAE), so cross-tenant isolation depends solely on offer IDs being unguessable. Other offer-consuming endpoints (Book, GetAncillary, FareCheck) were not tested. Evidence: Offer created under GulfAir/KSA; GetSeatMap with GulfAir/UAE -&gt; 200, full seat map (~198 KB, same responseId); supplier switched to TravelportNdc/UAE -&gt; 400 NDC-INT-TEC-A0001; invalid key/Client-Id -&gt; 401 AuthenticationError.

### Also re-confirmed

- **[TC-SEATMAP-POS-02] BUG-11** &mdash; The "This booking has already been created (609)" 409 envelope again echoes the full upstream SOAP request including live apiKey/secretKey in plaintext (seen on both re-submitted Book calls; values not recorded here).
- **[TC-SEATMAP-BIZ-03] BUG-09** &mdash; The CHD passenger (PAX3) is offered every exit-row seat (24 of 24 EXIT_ROW_SEAT cells in its allow-list).

### Not reproduced

- **BUG-01** (Book with a seat selected never returns) &mdash; exercised by TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04. The only with-seat Book that ran to the supplier (VAL-04) returned a response after 47.7s (a BUG-16 409, not a hang); the VAL-03 attempt returned in 1.7s. Not proof of a fix: no with-seat Book returned a 200 this round.

## Proposed SPEC.md updates

No SPEC.md updates proposed this round (Round 11's pending proposals are unchanged).

## Cleanup / follow-up

Live artifacts left behind this round (4):

- **needs_void_cancel** &mdash; pnr RIPLBZ (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-07-01, 1 ADT, 993.00 SAR, ticket 722136996972, no seat) from the A - first POS-02 attempt (no seat). Created while Book answered 409 (BUG-16): the pnr was recovered from the confirmation e-mail inside the error envelope and no bookingToken was ever returned, so Void via the API may not be possible - ask the platform team to cancel it.
- **needs_void_cancel** &mdash; pnr TVQBBV (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-07-01, 1 ADT, 993.00 SAR, ticket 722136996973, no seat) from the A2 - POS-02 main attempt (no seat). Created while Book answered 409 (BUG-16): the pnr was recovered from the confirmation e-mail inside the error envelope and no bookingToken was ever returned, so Void via the API may not be possible - ask the platform team to cancel it.
- **needs_void_cancel** &mdash; pnr RCEVKA (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-07-01, 1 ADT, 993.00 SAR, ticket 722136996974, no seat) from the A3 - POS-02 repeat attempt (no seat). Created while Book answered 409 (BUG-16): the pnr was recovered from the confirmation e-mail inside the error envelope and no bookingToken was ever returned, so Void via the API may not be possible - ask the platform team to cancel it.
- **needs_void_cancel** &mdash; pnr REGOSM (TC-SEATMAP-VAL-04) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-07-01, 1 ADT, 1053.00 SAR incl. seat 12B, ticket 722136996975). Evidence for BUG-07 - keep until triaged. pnr recovered from the BUG-16 error envelope; no bookingToken was returned.

