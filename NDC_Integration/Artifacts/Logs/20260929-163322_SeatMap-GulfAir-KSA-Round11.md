# QA Execution Report — Round 11 targeted run — SeatMap_TestCases.csv (NDC_Integration/TestCases/SeatMap_TestCases.csv) — 11 test cases: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-SEATMAP-VAL-07, TC-SEATMAP-VAL-08, TC-SEATMAP-VAL-09, TC-SEATMAP-VAL-10, TC-SEATMAP-BIZ-03, TC-SEATMAP-BIZ-04, TC-SEATMAP-SEC-01, TC-SEATMAP-SEC-02

**Environment:** staging &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** GulfAir  **Credentials Selector:** KSA
**Started:** 2026-09-29T13:33:22.732Z
**Ended:** 2026-09-29T13:52:30.045Z
**Status:** COMPLETE
**Execution Duration:** 19m 7s ([View Time Breakdown](20260929-163322_SeatMap-GulfAir-KSA-Round11_TimeBreakdown.html))
**Prior runs:** [Round 1](20260825-103032_SeatMap-GulfAir-KSA.md), [Round 2](20260826-154300_SeatMap-GulfAir-KSA-Round2.md), [Round 3](20260830-093343_SeatMap-GulfAir-KSA-Round3.md), [Round 4](20260830-090507_SeatMap-GulfAir-KSA-Round4.md), [Round 5](20260830-143810_SeatMap-GulfAir-KSA-Round5.md), [Round 6](20260906-092818_SeatMap-GulfAir-KSA-Round6.md), [Round 7](20260909-103751_SeatMap-GulfAir-KSA-Round7.md), [Round 8](20260909-202607_SeatMap-GulfAir-KSA-Round8.md), and [Round 9](20260929-090138_SeatMap-GulfAir-KSA-Round9.md)

## Scope note

Targeted, user-requested run of 11 SeatMap test cases (not the full SeatMap_TestCases.csv suite). The disk log was written in one batch after execution rather than per test case in real time, so no per-test-case `reporting_*` timestamps exist; the Reporting category in the time breakdown comes only from the `reporting_op` lines. TC-SEATMAP-BIZ-04 was BLOCKED in Rounds 1-9 and is executable this round because a single session can force the seat change (book a seat, then re-read the seat map). Book-with-seat did not hang this round (Round 10 BUG-01 not reproduced). Response headers were not captured (`headers_captured: false`) except that no Cache-Control/ETag header was observed on the seat-map responses. Seat-map and search response bodies in the log are trimmed for length, with explicit "omitted" / "truncated" markers in place.

## Summary

- Test cases logged: 11 of 11 planned
- Passed: 9
- Failed: 2
- Blocked: 0
- Failed test cases: TC-SEATMAP-VAL-04, TC-SEATMAP-SEC-01

## Test case results

### TC-SEATMAP-POS-02 — PASS

- **Test Case:** Verify GetSeatMap sets getSeatMapOfferId/getSeatMapResponceID and Book consumes them as ResponseId/selectedOfferId when SeatMap precedes it
- **Category:** Positive
- **Endpoint Name:** Search &rarr; FareConfirm &rarr; AddPassenger &rarr; GetSeatMap &rarr; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-07-01, 1 ADT, no seat) with ResponseId/selectedOfferId taken straight from the GetSeatMap response
- **Response:** 200 - pnr QRDHHX, bookingToken TPC60517146494D2992026, gdsPNR "", ticket 722136995952
- **Expected:** GetSeatMap returns 200 with non-empty offerId/responseId; Book accepts them as its ResponseId/selectedOfferId and returns pnr/bookingToken/gdsPNR without AddPassenger's IDs being re-sent
- **Actual:** Confirmed. GetSeatMap returned non-empty offerId/responseId (identical to the AddPassenger values); Book accepted them and created a real PNR. The Postman collection-variable assignment itself (getSeatMapOfferId/getSeatMapResponceID) is script-side and not observable over raw HTTP - verified the field mapping it relies on (resp.offerId/resp.responseId) instead. Unchanged from Rounds 1-7.
- **Status:** PASS
- **Evidence:** GetSeatMap resp.responseId a9258155-8fee-4561-9dfa-d56526bf84dd == AddPassenger responseId; Book echoed as request ResponseId; pnr QRDHHX; ticket 722136995952

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - price unchanged, responseId/selectedOffer.offerId captured
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails populated (178 seat cells, all AvailablePaid)
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr QRDHHX, bookingToken present, gdsPNR "" , ticket 722136995952

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** Verify cellID round-trips into Book's passengersSelectedSeats.setSegmentsSeats.cellId despite casing difference (cellID vs cellId)
- **Category:** Validation
- **Endpoint Name:** Search &rarr; FareConfirm &rarr; AddPassenger &rarr; GetSeatMap &rarr; Book
- **Request:** Book (GulfAir/KSA, BAH-RUH 2027-07-01, 1 ADT) with seat 10C and cellId = the verbatim cellDetails.cellID from the same GetSeatMap response
- **Response:** 200 - pnr QPGBSC, seat 10C attached (60.00 SAR), ticket 722136996067
- **Expected:** Book accepts the token despite the field-name casing difference (cellID in the response vs cellId in the request) and attaches the correct seat, echoed in passengersSelectedSeats and passengerSeats
- **Actual:** Accepted; the casing difference is purely cosmetic (case-insensitive JSON binding) - now CONFIRMED live, upgrading SPEC.md's INFERRED note. Seat echoed in all three documented places and the price reconciles exactly. Unchanged from Rounds 1-7.
- **Status:** PASS
- **Evidence:** Book(QPGBSC): passengersSelectedSeats.PAX1.&lt;seg&gt;={cellCode:10C, price 60.00 SAR}; passengerSeats=[{10C,60.00}]; 640.00+353.00+0+60.00=1053.00; ticket 722136996067

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - price unchanged, responseId/selectedOffer.offerId captured
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails populated (178 seat cells, all AvailablePaid)
  - **Hop 5 &mdash; Book:** PASS &mdash; 200 - pnr QPGBSC, seat 10C 60.00 SAR attached, ticket 722136996067

### TC-SEATMAP-VAL-04 — FAIL

- **Test Case:** Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer
- **Category:** Validation
- **Endpoint Name:** Search &rarr; FareConfirm &rarr; AddPassenger &rarr; GetSeatMap &rarr; Book
- **Request:** Book using Offer C's ResponseId/selectedOfferId (fresh Search-&gt;FareConfirm-&gt;AddPassenger-&gt;GetSeatMap chain) but cellId taken from Offer B's GetSeatMap response (seat 10C token), cellCode=10B (valid on Offer C)
- **Response:** 200 - pnr QPOJIW, ticket 722136996068, seat 10B attached (60.00 SAR) - foreign cellId accepted with no error
- **Expected:** Request is rejected (4xx, exact shape UNKNOWN per §7.9) because the cellID token embeds the originating ResponseId/OfferId and is bound to the offer it was issued for
- **Actual:** STILL REPRODUCES (BUG-07, 7th confirmed occurrence) - a cellId issued for a different offer was accepted; a real, ticketed booking was created. Behaviour is now more clearly demonstrated than in earlier rounds (where the seat was silently dropped, passengersSelectedSeats:{}): this time the seat was attached and priced, which shows the cellId token is not validated at all and the seat is chosen from cellCode alone.
- **Status:** FAIL
- **Evidence:** pnr QPOJIW, ticket 722136996068; passengersSelectedSeats.PAX1.&lt;seg&gt;={cellCode:10B,price 60.00 SAR}; totalAmount 1053.00 (seat charged)

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers, offer[0] totalAmount 993 SAR
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 - price unchanged, responseId/selectedOffer.offerId captured
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 - offerId/responseId issued
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - seatMapDetails populated (177 seat cells, all AvailablePaid)
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 - pnr QPOJIW, seat 10B 60.00 SAR attached, ticket 722136996068 &mdash; NOT rejected: 200, booking created, ticket issued, seat 10B attached and priced; the foreign cellId was accepted (effectively ignored)

### TC-SEATMAP-VAL-07 — PASS

- **Test Case:** Verify window/aisle/extra-legroom/exit-row seat attributes are programmatically derivable from cellCharacteristics for every Seat-category cell
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** One GetSeatMap response (GulfAir/KSA, BAH-RUH 2027-07-01, 1 ADT) - all 178 Seat cells read and classified (Search-&gt;FareConfirm-&gt;AddPassenger-&gt;GetSeatMap chain executed first)
- **Response:** 200 - 30 rows x 7 columns; 178 Seat cells, 30 Aisle cells, 2 NoSeat cells; 805 cellCharacteristics entries, every padisCode = "Unknown"
- **Expected:** For codes in the sourced canonical PADIS table, the derived classification must not contradict column position or description text; codes outside the table are logged, not failed
- **Actual:** Every Seat cell carries a derivable window/aisle/centre marker in its description text; 0 of 178 contradict their column position (A/F=WINDOW, C/D=AISLE_SEAT, B/E=CENTER_SEAT, left/right side consistent). Extra-legroom (LEG_SPACE_SEAT rows 8, 19, 20), bulkhead (row 8) and exit-row (EXIT_ROW_SEAT rows 18-21, 24 seats) are derivable from the text too. padisCode is "Unknown" for 805/805 characteristics, so the PADIS-code route yields nothing for this supplier - attributes are derivable only from the description text (logged, not failed, per the expected result). Unchanged from Rounds 1-7.
- **Status:** PASS
- **Evidence:** column/description mismatches: 0 of 178; WINDOW=59 (cols A/F), AISLE_SEAT=60, CENTER_SEAT=59; EXIT_ROW_SEAT=24; padisCode Unknown=805/805

### TC-SEATMAP-VAL-08 — PASS

- **Test Case:** Verify seatPriceDetails/seatPriceDetailsByPassenger is populated for every AvailablePaid cell and null/absent for every Blocked or Occupied cell
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response as VAL-07 - every cell partitioned by cellAvailability
- **Response:** 200 - 178 cells with cellDetails, all cellAvailability = AvailablePaid; 32 further cells have cellDetails null (30 Aisle, 2 NoSeat)
- **Expected:** Every AvailablePaid cell has a populated seatPriceDetailsByPassenger (totalPrice/basePrice/taxesPrice per passenger); every Blocked/Occupied cell has null pricing
- **Actual:** AvailablePaid: 178/178 have seatPriceDetailsByPassenger with totalPrice, basePrice and taxesPrice populated (120.00 SAR front rows, lower elsewhere, taxes 0.00). The Blocked/Occupied half of the rule could not be exercised: this GulfAir response contains no Blocked or Occupied cell at all - a booked seat is dropped to NoSeat with null cellDetails instead (see TC-SEATMAP-BIZ-04). No non-paid cell carries pricing (0 violations). Unchanged from Rounds 1-7.
- **Status:** PASS
- **Evidence:** AvailablePaid n=178, withByPax=178, incomplete price=0; non-AvailablePaid cells with pricing=0; Blocked/Occupied cells present=0

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** Verify cellCode is unique across all cells within one flight segment's seatMapDetails
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response as VAL-07 - every cellCode in the single segment collected and checked for duplicates
- **Response:** 200 - 178 Seat cells, 178 distinct cellCode values
- **Expected:** No cellCode repeats within one segment (a duplicate is a confirmed defect)
- **Actual:** No duplicates: 178 cellCodes, 178 unique (rows 8-38, columns A-F). Unchanged from Rounds 1-7.
- **Status:** PASS
- **Evidence:** cellCodes=178 unique=178 duplicates=0 (segment GF-GF161-GF161-2027070102-2027070104-O)

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** Verify structural uniqueness and domain constraints across decks/zones/rows/columns
- **Category:** Validation
- **Endpoint Name:** GetSeatMap
- **Request:** Same GetSeatMap response as VAL-07 - cabinLayoutsByDeck and rows[] checked for uniqueness and column domain
- **Response:** 200 - 1 deck (Main), 1 zone (Cabin1, ECONOMY, columns A,B,C,null,D,E,F), 30 rows numbered 8-38
- **Expected:** rowNumber unique within the segment; zoneId unique within a deck; every non-null column in A-F; null column only on Aisle cells
- **Actual:** All four constraints hold: 30 row numbers, 30 unique; 1 zone in deck Main (unique); Seat-cell columns are exactly {A,B,C,D,E,F}; the 30 null-column cells are all Aisle-category. Two NoSeat cells carry a real column (A and E) rather than null - allowed by the rule (it only restricts nulls). Every row's deck/zoneId resolves to the declared layout. Unchanged from Rounds 1-7.
- **Status:** PASS
- **Evidence:** rows=30 unique=30; decks=1; zones=1; seat columns=A-F; null-column cells: Aisle=30 (100%); NoSeat with column: A=1, E=1

### TC-SEATMAP-BIZ-03 — PASS

- **Test Case:** Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported and internally consistent (not required to list every passenger)
- **Category:** Business Rule
- **Endpoint Name:** Search &rarr; FareConfirm &rarr; AddPassenger &rarr; GetSeatMap
- **Request:** GetSeatMap for a fresh 3-passenger offer (2 ADT + 1 CHD, BAH-RUH 2027-07-01) - every cell compared against passengersSeatMapAvailability
- **Response:** 200 - 176 Seat cells; each of PAX1/PAX2/PAX3 has a 176-code allow-list; every cell's seatPriceDetailsByPassenger lists PAX1, PAX2 and PAX3
- **Expected:** A passenger listed in a cell's seatPriceDetailsByPassenger should also have that cellCode in their own passengersSeatMapAvailability allow-list; absence of a passenger is valid, completeness is NOT asserted; overall and per-passenger availability may legitimately differ
- **Actual:** Internally consistent: 528 passenger-cell price entries (176 x 3), 0 listed for a cell that is absent from that passenger's allow-list, and 0 allow-list codes without a priced cell. GulfAir lists all three passengers on every cell (so the "absence is valid" branch could not be exercised here - fine, it is not required), and the per-passenger paxCellAvailability equals the overall cellAvailability everywhere (0 differences; both AvailablePaid). Note for context: the CHD passenger is offered every exit-row cell (24/24), consistent with the already-tracked BUG-09.
- **Status:** PASS
- **Evidence:** cells=176; listed-pax-set [PAX1,PAX2,PAX3]=176 cells; listed-but-not-in-allow-list=0; allow-list-but-not-priced=0; paxCellAvailability != cellAvailability: 0; CHD PAX3 present on 24/24 EXIT_ROW_SEAT cells

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 - 25 offers
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200
  - **Hop 4 &mdash; GetSeatMap:** PASS &mdash; 200 - 176 Seat cells; passengersDetails PAX1/PAX2 (ADT), PAX3 (CHD), each with a 176-code allow-list

### TC-SEATMAP-BIZ-04 — PASS

- **Test Case:** Exploratory - confirm GetSeatMap reflects real-time supplier inventory rather than a cached snapshot
- **Category:** Business Rule
- **Endpoint Name:** GetSeatMap &rarr; Book &rarr; GetSeatMap
- **Request:** GetSeatMap #1 (Offer B, seat 10C AvailablePaid) -&gt; Book seat 10C on Offer B -&gt; GetSeatMap #2 with the same Offer B IDs -&gt; GetSeatMap #3 on a fresh Offer C
- **Response:** Call #1: 10C = AvailablePaid (178 seat cells). After the Book: call #2 and call #3 both return 10C as NoSeat with cellDetails null (177 seat cells) and 10C absent from the passenger allow-list
- **Expected:** UNKNOWN - if reliably forceable, the cell's availability transitions between the calls, confirming a live supplier round-trip rather than a cached response
- **Actual:** CONFIRMED live inventory. Previously BLOCKED in every round (no second session), but a single tester can force it: booking a seat on one offer immediately changes the seat map returned for BOTH the same offer and an unrelated fresh offer on the same flight. Worth knowing for SPEC.md: a taken seat is NOT reported as cellAvailability "Occupied" - the cell is replaced by cellCategory "NoSeat" with cellDetails null and removed from passengersSeatMapAvailability.
- **Status:** PASS
- **Evidence:** Row 10 before: A,B,C,D,E,F all AvailablePaid; after: 10C -&gt; NoSeat/null in both call #2 and call #3; seat cells 178 -&gt; 177; NoSeat cells 2 -&gt; 3; PAX1 allow-list contains 10C before, not after; response headers carry no Cache-Control/ETag (CorrelationId only)

  - **Hop 1 &mdash; GetSeatMap (call #1, baseline):** PASS &mdash; 200 - 10C = Seat / AvailablePaid (60.00 SAR); 178 seat cells; 10C in PAX1 allow-list
  - **Hop 2 &mdash; Book (occupy 10C):** PASS &mdash; 200 - pnr QPGBSC, seat 10C attached, ticket 722136996067
  - **Hop 3 &mdash; GetSeatMap (call #2, same offer):** PASS &mdash; 200 - 10C is now NoSeat with cellDetails null; 177 seat cells; 10C removed from the PAX1 allow-list
  - **Hop 4 &mdash; GetSeatMap (call #3, fresh offer C):** PASS &mdash; 200 - 10C again NoSeat/cellDetails null; 177 seat cells

### TC-SEATMAP-SEC-01 — FAIL

- **Test Case:** Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap
- **Category:** Security
- **Endpoint Name:** GetSeatMap
- **Request:** GetSeatMap with a valid KSA-issued offer: (1) invalid x-api-key, (2) invalid Client-Id, (3a) supplier/selector switched to TravelportNdc/UAE, (3b) same supplier GulfAir with credentialsSelector switched to UAE; extra probes: empty x-api-key, bogus selector, omitted selector
- **Response:** (1) 401 AuthenticationError; (2) 401 AuthenticationError; (3a) 400 NDC-INT-TEC-A0001 "Failed to deserialize the selected offer"; (3b) 200 - the full seat map was returned; extras: empty key 401, bogus selector 400, omitted selector 400
- **Expected:** All three variants rejected (exact status/error shape UNKNOWN; reuse the envelope other endpoints produce)
- **Actual:** Two of the three checks pass cleanly, but the third only half-passes. Switching to a different SUPPLIER is rejected (400), yet switching only the credentialsSelector to another VALID one for the same supplier (GulfAir/UAE - confirmed valid: it also serves Search with 200) is NOT rejected: GetSeatMap returns the complete seat map for an offer that was created under KSA. So credentialsSelector is not enforced as an authorization boundary on GetSeatMap, contradicting SPEC.md §7.14's description of supplier/credentialsSelector as the API's implicit authorization boundary. Note also that the cross-supplier rejection changed shape vs. earlier rounds (was 409 OperationNotSupported "TravelportNdc does not exists", now 400 NDC-INT-TEC-A0001) - still a rejection.
- **Status:** FAIL
- **Evidence:** control 200; badKey 401 AuthenticationError "Invalid authorization header"; badClient 401 (same envelope); supplier switch 400 NDC-INT-TEC-A0001 SelectedOfferId "Failed to deserialize the selected offer"; GulfAir/UAE with a KSA offer 200 (~305 KB body, offerId/responseId returned); GulfAir/UAE Search 200 proves UAE is a real GulfAir tenant

  - **Attempt 1 of 4 - invalid x-api-key:** HTTP 401 AuthenticationError
  - **Attempt 2 of 4 - invalid Client-Id:** HTTP 401 AuthenticationError
  - **Attempt 3 of 4 - cross-tenant: supplier switched to TravelportNdc/UAE:** HTTP 400 NDC-INT-TEC-A0001
  - **Attempt 4 of 4 - cross-tenant: same supplier GulfAir, credentialsSelector switched KSA -&gt; UAE:** HTTP 200

### TC-SEATMAP-SEC-02 — PASS

- **Test Case:** Record that supplier-side authentication security and request/response logging are not independently verifiable through this API's black-box contract
- **Category:** Documentation
- **Endpoint Name:** GetSeatMap (documentation)
- **Request:** N/A - documentation/scope-boundary case, no live API call
- **Response:** N/A
- **Expected:** Documented per §1.5/§1.8/PRD §7: AC8 (supplier-side authentication) and AC9 logging half are confirmable only via a backend credential/config audit and log/observability review, not through this suite; AC9's graceful-error half is covered by TC-SEATMAP-NEG-05
- **Actual:** Documented as specified; SPEC.md §1.5/§1.8 and NDC_PRD.md §7 (Gap #1: hardcoded x-api-key/Client-Id) re-checked and still say the same. AC8/AC9 must not be marked covered by API tests without the paired backend/config/log audit. Unchanged from Rounds 1-7.
- **Status:** PASS
- **Evidence:** No API call made, per the test case's own definition; SPEC.md §1.5, §1.8 and NDC_PRD.md §7 Gap #1 present and unchanged

## Findings

### Defects

- **[TC-SEATMAP-VAL-04] BUG-07 (7th confirmed occurrence, not new) &mdash; Book accepts a cellId issued for a different offer's GetSeatMap response and creates a ticketed booking with the seat attached.** Field: `passengersSelectedSeats.&lt;paxRef&gt;.setSegmentsSeats.&lt;segmentRefId&gt;.cellId`. Expected: 4xx validation error rejecting the cellId as not belonging to this offer (no PNR created). **History:** First observed Round 1 (2026-08-25); confirmed Rounds 1, 2, 3, 5, 6, 7 and now 11 (Rounds 4 and 8 were blocked by unrelated outages). New this round: the seat is now attached and priced instead of silently dropped. **Impact:** The cellId token is not validated at all, so seat selection is driven purely by cellCode: a caller can submit any stale, foreign or forged token and still be charged and ticketed for the seat. It also defeats the token's only purpose (binding a seat choice to a live offer/passenger). Evidence: Book on Offer C with Offer B's cellId -&gt; 200, pnr QPOJIW, ticket 722136996068, seat 10B attached (60.00 SAR). Bug report: `NDC_Integration/Artifacts/BugReports/20260929-163322_SeatMap-GulfAir-KSA-Round11/BUG-07_Book_CrossOfferCellId_NotRejected.md`.
- **[TC-SEATMAP-SEC-01] BUG-17 (new) &mdash; GetSeatMap does not reject a request whose credentialsSelector differs from the one the offer was created under (same supplier, different valid selector).** Field: `credentialsSelector`. Expected: 4xx rejection (offer not found / not authorized for this credentialsSelector), as happens when the supplier is switched. **Impact:** credentialsSelector is the API's per-tenant boundary (SPEC.md §7.14). A caller holding an offerId/responseId from one tenant (KSA) can read that offer's seat map through another tenant's selector (UAE), so cross-tenant isolation depends solely on offer IDs being unguessable. The same gap is likely present on the other offer-consuming endpoints (Book, GetAncillary, FareCheck) - not tested here. Evidence: Offer created under GulfAir/KSA; GetSeatMap sent with GulfAir/UAE -&gt; 200 with the full seat map (~305 KB); supplier switched to TravelportNdc/UAE -&gt; 400 NDC-INT-TEC-A0001; GulfAir/UAE Search -&gt; 200 (UAE is a real GulfAir tenant). Bug report: `NDC_Integration/Artifacts/BugReports/20260929-163322_SeatMap-GulfAir-KSA-Round11/BUG-17_GetSeatMap_credentialsSelector_NotEnforced.md`.

### Unknown-resolutions

- **[TC-SEATMAP-BIZ-04]** GetSeatMap reflects live supplier inventory, and a booked seat is represented as cellCategory "NoSeat" with cellDetails null (removed from passengersSeatMapAvailability) - not as cellAvailability "Occupied" (SPEC.md §1.3, §2.7). Evidence: Row 10 seat 10C: AvailablePaid before Book; after Book both same-offer and fresh-offer GetSeatMap return it as NoSeat/null (seat cells 178 -&gt; 177).

### Not reproduced

- **BUG-01 (Round 10)** (Book with a seat selected never returns) &mdash; exercised by TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04, TC-SEATMAP-BIZ-04. Both Book-with-seat calls this round completed normally (62s and 49s, vs 27-46s for no-seat Book in Round 10) with a real PNR each. Two clean calls do not prove it fixed - recommend a wider re-verification before closing it.
- **BUG-16** (Book/Hold HTTP 500 while silently succeeding) &mdash; exercised by TC-SEATMAP-POS-02, TC-SEATMAP-VAL-03, TC-SEATMAP-VAL-04. All three Book calls returned a clean HTTP 200 with a real PNR on the first attempt. Not proof of a fix; Hold was not exercised.

## Proposed SPEC.md updates

- §2.7 &mdash; status: *pending*
  - **Old:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples."
  - **New:** "Observed `cellAvailability`/`paxCellAvailability` values (updated 2026-08-10): `AvailablePaid`, `Blocked`, `Occupied` — directly evidenced from saved examples. **Confirmed live, GulfAir/KSA (2026-09-29):** GetSeatMap reflects live supplier inventory; after a seat is booked it is not reported as `Occupied` — the cell becomes `cellCategory: "NoSeat"` with `cellDetails: null` and the code disappears from `passengersSeatMapAvailability`. A GulfAir response contained only `AvailablePaid` cells (no `Blocked`/`Occupied`)."
- §2.7 &mdash; status: *pending*
  - **Old:** "`cellCategory` observed values (updated 2026-08-10): `Seat`, `Aisle` — `UNKNOWN` whether galley/lavatory/exit-row-only markers exist as further distinct categories; not observed."
  - **New:** "`cellCategory` observed values: `Seat`, `Aisle`, `NoSeat` (GulfAir/KSA, 2026-09-29: used for structural gaps and for seats already taken; `cellDetails` is `null`) — `UNKNOWN` whether galley/lavatory/exit-row-only markers exist as further distinct categories; not observed."
- §7.14 &mdash; status: *pending*
  - **Old:** "attempt to access/act on a booking (`pnr`/`bookingToken`) using a **different** `supplier`/`credentialsSelector` than the one that created it (a cross-tenant access attempt) — `UNKNOWN` expected behavior"
  - **New:** "attempt to access/act on a booking (`pnr`/`bookingToken`) using a **different** `supplier`/`credentialsSelector` than the one that created it (a cross-tenant access attempt) — `UNKNOWN` expected behavior. **Observed live on GetSeatMap (2026-09-29, GulfAir/KSA offer):** a different supplier (TravelportNdc/UAE) is rejected with 400 `NDC-INT-TEC-A0001` "Failed to deserialize the selected offer"; a different `credentialsSelector` for the same supplier (GulfAir/UAE) is **not** rejected (200, full seat map) — logged as a defect."

## Cleanup / follow-up

Live artifacts left behind this round (3):

- **needs_void_cancel** &mdash; pnr QRDHHX (TC-SEATMAP-POS-02) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-07-01, ticket 722136995952, no seat). voidCapability FullVoidOnlyAllowed - void per SPEC.md §2.15 if the test artifact needs cleanup.
- **needs_void_cancel** &mdash; pnr QPGBSC (TC-SEATMAP-VAL-03) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-07-01, ticket 722136996067, seat 10C). voidCapability FullVoidOnlyAllowed - void per SPEC.md §2.15 if the test artifact needs cleanup.
- **needs_void_cancel** &mdash; pnr QPOJIW (TC-SEATMAP-VAL-04) &mdash; Real ticketed GulfAir/KSA booking (BAH-RUH 2027-07-01, ticket 722136996068, seat 10B; evidence for BUG-07 - keep until triaged). voidCapability FullVoidOnlyAllowed - void per SPEC.md §2.15 if the test artifact needs cleanup.
