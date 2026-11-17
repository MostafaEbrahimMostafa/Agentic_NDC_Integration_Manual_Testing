# QA Execution Report — SabreNdc_Void_TestCases.csv (NDC_Integration/TestCases/SabreNdc_Void_TestCases.csv) - SabreNdc / EGY - V1 and V2 - 36 test cases

**Environment:** staging (STAG_ENV) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** SabreNdc  **Credentials Selector:** EGY
**Started:** 2026-10-22T09:38:39.122Z
**Ended:** 2026-10-22T09:53:43.014Z
**Status:** COMPLETE
**Execution Duration:** 15m 4s ([View Time Breakdown](20261022-093839_SabreNdc-Void-EGY-V1V2_TimeBreakdown.html))
**Prior runs:** First SabreNdc Void run (see NDC_Integration/Artifacts/Logs/)

## Scope note

Shared chains: FLOW-V1-03-SABRE / FLOW-V2-27-SABRE reuse the booking chains of TC-CAPCHECK-SABRENDC-02, TC-VOID-POS-01/02, INT-01, INT-02 and BIZ-02; FLOW-V1-05-SABRE / FLOW-V2-29-SABRE reuse the TC-VOID-POS-03 hold chain; NEG-05, VAL-06, BIZ-05 and REG-02 are analyses of responses captured by the other cases. Because surName and voidTickets are not validated, VAL-04, SEC-04, NEG-03 and VAL-03 each voided their booking, so extra bookings were created (26 SabreNdc bookings/holds in total, all voided or cancelled by the end of the run). BIZ-01 and BND-01 need a booking voided on the next calendar day / around midnight and were not run.

## Summary

- Test cases logged: 36 of 36 planned
- Passed: 25
- Failed: 9
- Blocked: 2
- Failed test cases: TC-CAPCHECK-SABRENDC-02, TC-VOID-BIZ-02, TC-VOID-VAL-04, TC-VOID-NEG-03, TC-VOID-SEC-04, TC-VOID-BIZ-05, TC-VOID-NEG-01, TC-VOID-NEG-05, TC-VOID-VAL-06
- Blocked test cases: TC-VOID-BIZ-01, TC-VOID-BND-01

## Test case results

### TC-CAPCHECK-SABRENDC-01 — PASS

- **Test Case:** [SabreNdc][Search] Verify SabreNdc credentials for credentialsSelector EGY are active and return offers.
- **Category:** Positive
- **Endpoint Name:** Search (V1 + V2)
- **Request:** POST api/FlightSearch/Search (V1) and api/V2/FlightSearch/Search (V2) - SabreNdc/EGY, CAI-JED 2026-11-12, 1 ADT, isdebug false
- **Response:** V1 200 - 19 offers; V2 200 - 19 offers; offer[0] totalAmount 13015.8 EGP; canBeHeld 19/19, haveBundles 0/19
- **Expected:** HTTP 200 on both versions with non-empty offers[]; no credentials-inactive error; record canBeHeld
- **Actual:** Both versions 200 with 19 offers (Qatar Airways via DOH); canBeHeld=true on every offer, so the Hold-based cases (Family E) can run
- **Status:** PASS
- **Evidence:** V1 19 offers in 4.8s, V2 19 offers in 1.5s; identical offer[0] price 13015.8 EGP on both; no ErrorCode in either body

  - **Attempt 1 of 2 - V1 Search:** HTTP 200
  - **Attempt 2 of 2 - V2 Search:** HTTP 200

### TC-CAPCHECK-SABRENDC-02 — FAIL

- **Test Case:** [SabreNdc][Book][Response] Verify a SabreNdc Book returns ticket numbers and a voidCapability value indicating Void is allowed.
- **Category:** Positive
- **Endpoint Name:** Search &gt; FareConfirm &gt; (AddPassenger) &gt; Book &gt; Retrieve (V1 + V2)
- **Request:** V1: Search &gt; FareConfirm &gt; Book (1 ADT Mostafa Ibrahim, CAI-JED 2026-11-12) &gt; RetrieveBooking. V2: Search &gt; FareConfirm &gt; AddPassenger &gt; Book &gt; Retrieve
- **Response:** V1 Book 200 - pnr TFZFYS, gdsPNR TFZFYS, bookingToken 1SXXXCPO2P9DD, ticket 1572135118444 Booked. V2 Book 200 - pnr TKTQQW, gdsPNR TKTQQW, bookingToken 1SXXXC1HBI396, ticket 1572135118445 Booked. No voidCapability key in any Book or Retrieve body
- **Expected:** 200; pnr, gdsPNR, bookingToken non-empty; tickets[] populated; record the voidCapability value for a freshly ticketed booking
- **Actual:** Tickets are issued synchronously on both versions (ticketingDate 2026-10-22), but voidCapability is missing from Book and Retrieve on V1 and V2, so a caller cannot tell whether Void is allowed
- **Status:** FAIL
- **Evidence:** V1 Book keys: tickets,creationDate,ticketingDate,holdExpirationDate,supplier,pnr,gdsPNR,bookingToken,journeys,...,diRemarks (no voidCapability). V2 Book keys: supplier,pnr,gdsPNR,bookingToken,creationDate,ticketingDate,tickets,...,emdTickets (no voidCapability). Retrieve also lacks it on both; V2 Retrieve has bookingStatus Booked, V1 Retrieve has none.

  - **Hop 1 &mdash; V1 Search (B1):** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm (B1):** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Book (B1):** FAIL &mdash; 200 - pnr TFZFYS, tickets 1572135118444:Booked
  - **Hop 4 &mdash; V1 Retrieve (B1-pre):** FAIL &mdash; 200 - pnr TFZFYS, tickets 1572135118444:Booked
  - **Hop 5 &mdash; V2 Search (B1):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 FareConfirm (B1):** PASS &mdash; 200
  - **Hop 7 &mdash; V2 AddPassenger (B1):** PASS &mdash; 200
  - **Hop 8 &mdash; V2 Book (B1):** FAIL &mdash; 200 - pnr TKTQQW, tickets 1572135118445:Booked
  - **Hop 9 &mdash; V2 Retrieve (B1-pre):** FAIL &mdash; 200 - pnr TKTQQW, tickets 1572135118445:Booked

### TC-VOID-POS-01 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify V1 Void succeeds for a SabreNdc booking ticketed the same calendar day.
- **Category:** Positive
- **Endpoint Name:** Void (V1)
- **Request:** POST api/FlightBooking/Void - SabreNdc/EGY, pnr TFZFYS, gdsPNR TFZFYS, bookingToken 1SXXXCPO2P9DD, surName Ibrahim, voidTickets []
- **Response:** 200 - {voided:true, voidedTickets:[{ticketStatus:Voided, ticketNumber:1572135118444, carrierCode:QR}]}
- **Expected:** 2xx success response (shape recorded as baseline); not an error envelope; no raw Sabre payload
- **Actual:** 200 with voided=true and the one ticket listed as Voided; no Sabre-native fields
- **Status:** PASS
- **Evidence:** Booked and ticketed 2026-10-22 (ticketingDate 2026-10-22T00:00:00), voided 10.4s call at 2026-10-22T09:41:11.501Z

  - **Hop 1 &mdash; V1 Void (POS01):** PASS &mdash; 200

### TC-VOID-POS-02 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify V2 Void succeeds for a SabreNdc booking ticketed the same calendar day.
- **Category:** Positive
- **Endpoint Name:** Void (V2)
- **Request:** POST api/V2/FlightBooking/Void - SabreNdc/EGY, pnr TKTQQW, gdsPNR TKTQQW (real value), bookingToken 1SXXXC1HBI396, surName Ibrahim, voidTickets []
- **Response:** 200 - {voided:true, voidedTickets:[{ticketStatus:Voided, ticketNumber:1572135118445, carrierCode:QR}], passengersVoidedAncillaries:{}, emdTickets:{}}
- **Expected:** 2xx success response, recorded as the V2 baseline
- **Actual:** 200 with voided=true and the one ticket Voided; V2 adds passengersVoidedAncillaries and emdTickets (both empty)
- **Status:** PASS
- **Evidence:** Ticketed 2026-10-22, voided in 10.0s at 2026-10-22T09:41:21.608Z

  - **Hop 1 &mdash; V2 Void (POS02):** PASS &mdash; 200

### TC-VOID-INT-01 — PASS

- **Test Case:** [SabreNdc][Book]&amp;[Void] [Request] Verify pnr, gdsPNR and bookingToken from Book are accepted unchanged by Void.
- **Category:** Integration
- **Endpoint Name:** Book &gt; Void (V1 + V2)
- **Request:** V1 Void with Book TFZFYS ids verbatim; V2 Void with Book TKTQQW ids verbatim (gdsPNR = pnr as returned)
- **Response:** V1 200 voided true; V2 200 voided true
- **Expected:** Void succeeds with the ids handed off from Book, no transformation
- **Actual:** Both versions accepted the verbatim ids and voided the ticket
- **Status:** PASS
- **Evidence:** Book returned gdsPNR equal to pnr for SabreNdc (TFZFYS/TFZFYS, TKTQQW/TKTQQW); same values sent to Void unchanged

  - **Hop 1 &mdash; V1 Book (B1):** PASS &mdash; 200 - pnr TFZFYS
  - **Hop 2 &mdash; V1 Void (POS01):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 Book (B1):** PASS &mdash; 200 - pnr TKTQQW
  - **Hop 4 &mdash; V2 Void (POS02):** PASS &mdash; 200

### TC-VOID-INT-02 — PASS

- **Test Case:** [SabreNdc][Void]&amp;[Retrieve] [Response] Verify Retrieve after a successful SabreNdc Void reflects the voided state.
- **Category:** Integration
- **Endpoint Name:** Retrieve after Void (V1 + V2)
- **Request:** V1 RetrieveBooking TFZFYS and V2 Retrieve TKTQQW, right after the successful Void
- **Response:** V1 400 / V2 400 - {ErrorCode:NDC-INT-TEC-A0001, ErrorMessage:Invalid request. Please check the request parameters and try again., Context:[This Trip Is Already Cancelled]}
- **Expected:** Voided state visible (tickets voided, or a terminal error like cancelled PNRs); unchanged Booked tickets = defect
- **Actual:** Retrieve no longer returns the booking; it answers with a terminal "This Trip Is Already Cancelled" on both versions. Baseline recorded. Note the HTTP 400 / generic invalid-request code differs from the 409 NDC-INT-BYP-A0003 used for cancelled holds (see TC-VOID-NEG-05)
- **Status:** PASS
- **Evidence:** Pre-void Retrieve: tickets Booked (V2 bookingStatus Booked). Post-void: 400 with Context This Trip Is Already Cancelled, TransactionIds 1827bde1-... (V1), a0c02558-... (V2)

  - **Hop 1 &mdash; V1 Retrieve (B1-pre):** PASS &mdash; 200 - pnr TFZFYS
  - **Hop 2 &mdash; V1 Retrieve (INT02):** PASS &mdash; 400
  - **Hop 3 &mdash; V2 Retrieve (B1-pre):** PASS &mdash; 200 - pnr TKTQQW
  - **Hop 4 &mdash; V2 Retrieve (INT02):** PASS &mdash; 400

### TC-VOID-BIZ-02 — FAIL

- **Test Case:** [SabreNdc][Void][Response] Verify a second Void on an already-voided SabreNdc booking is rejected.
- **Category:** Business Rule
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Resent the identical Void body for TFZFYS (V1) and TKTQQW (V2) after the first Void succeeded
- **Response:** V1 200 {voided:true, voidedTickets:[1572135118444 Voided]}; V2 200 {voided:true, voidedTickets:[1572135118445 Voided], ...}
- **Expected:** Second Void rejected with a 4xx standard envelope (already voided); no 500; state unchanged
- **Actual:** Second Void returns 200 voided=true again on both versions (about 1.5s, versus 10s for the real void); there is no already-voided rejection, even though Retrieve already reports the trip as cancelled
- **Status:** FAIL
- **Evidence:** V1 second void 1.6s, V2 1.4s; between the two voids Retrieve returned 400 This Trip Is Already Cancelled

  - **Attempt 1 of 2 - V1 second Void TFZFYS:** HTTP 200
  - **Attempt 2 of 2 - V2 second Void TKTQQW:** HTTP 200

### FLOW-V1-03-SABRE — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #3 completes end to end for SabreNdc.
- **Category:** Flow
- **Endpoint Name:** undefined Search &gt; FareConfirm &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve
- **Request:** Shared chain B1 (undefined): CAI-JED 2026-11-12, 1 ADT; same calls as TC-CAPCHECK-SABRENDC-02 / TC-VOID-POS-02 / TC-VOID-INT-02
- **Response:** Search 200 (19 offers), FareConfirm 200, Book 200 pnr TFZFYS ticketed, Retrieve 200 Booked, Void 200 voided, Retrieve 400 This Trip Is Already Cancelled
- **Expected:** Every hop 2xx; Void succeeds; final Retrieve shows the tickets voided; price consistent through Book
- **Actual:** All hops behaved as expected; FareConfirm and Book totals both 13015.8 EGP; final Retrieve reports the trip cancelled (voided)
- **Status:** PASS
- **Evidence:** Shared with the endpoint cases (chains are not duplicated); voidCapability absence is logged under TC-CAPCHECK-SABRENDC-02

  - **Hop 1 &mdash; V1 Search (B1):** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm (B1):** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Book (B1):** PASS &mdash; 200 - pnr TFZFYS
  - **Hop 4 &mdash; V1 Retrieve (B1-pre):** PASS &mdash; 200 - pnr TFZFYS
  - **Hop 5 &mdash; V1 Void (POS01):** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Retrieve (INT02):** PASS &mdash; 400

### FLOW-V2-27-SABRE — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #27 completes end to end for SabreNdc.
- **Category:** Flow
- **Endpoint Name:** undefined Search &gt; FareConfirm &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve
- **Request:** Shared chain B1 (undefined): CAI-JED 2026-11-12, 1 ADT; same calls as TC-CAPCHECK-SABRENDC-02 / TC-VOID-POS-02 / TC-VOID-INT-02
- **Response:** Search 200 (19 offers), FareConfirm 200, Book 200 pnr TKTQQW ticketed, Retrieve 200 Booked, Void 200 voided, Retrieve 400 This Trip Is Already Cancelled
- **Expected:** Every hop 2xx; Void succeeds; final Retrieve shows the tickets voided; price consistent through Book
- **Actual:** All hops behaved as expected; FareConfirm and Book totals both 13015.8 EGP; final Retrieve reports the trip cancelled (voided)
- **Status:** PASS
- **Evidence:** Shared with the endpoint cases (chains are not duplicated); voidCapability absence is logged under TC-CAPCHECK-SABRENDC-02

  - **Hop 1 &mdash; V2 Search (B1):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 FareConfirm (B1):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 AddPassenger (B1):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 Book (B1):** PASS &mdash; 200 - pnr TKTQQW
  - **Hop 5 &mdash; V2 Retrieve (B1-pre):** PASS &mdash; 200 - pnr TKTQQW
  - **Hop 6 &mdash; V2 Void (POS02):** PASS &mdash; 200
  - **Hop 7 &mdash; V2 Retrieve (INT02):** PASS &mdash; 400

### TC-VOID-VAL-01 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate missing or empty pnr is rejected before reaching SabreNdc.
- **Category:** Validation
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void for B2 (V1 OOLKNB, V2 TMNYPF) with pnr omitted, then pnr empty; then Retrieve
- **Response:** All four: 400 {Status:400, ErrorCode:NDC-INT-TEC-A0001, ErrorMessage:Invalid request..., Context:[{Name:NotEmptyValidator, Value:PNR is required.}]}; Retrieve 200 ticket Booked
- **Expected:** 400 standard envelope naming pnr; no 500; booking stays ticketed
- **Actual:** Rejected in ~0.1-0.6s with 400 naming pnr; booking still Booked. ErrorCode is NDC-INT-TEC-A0001, not the ValidationError string the case quoted from Book
- **Status:** PASS
- **Evidence:** Retrieve after the batch: V1 1572135118448 Booked, V2 1572135118449 Booked

  - **Attempt 1 of 6 - V1 - pnr omitted:** HTTP 400
  - **Attempt 2 of 6 - V1 - pnr empty:** HTTP 400
  - **Attempt 3 of 6 - V1 - Retrieve (booking intact):** HTTP 200
  - **Attempt 4 of 6 - V2 - pnr omitted:** HTTP 400
  - **Attempt 5 of 6 - V2 - pnr empty:** HTTP 400
  - **Attempt 6 of 6 - V2 - Retrieve (booking intact):** HTTP 200

### TC-VOID-VAL-02 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate missing or empty bookingToken is rejected.
- **Category:** Validation
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void for B2 with bookingToken omitted, then empty
- **Response:** All four: 400 NDC-INT-TEC-A0001, Context NotEmptyValidator "BookingToken (the Sabre order ID) is required."
- **Expected:** 400 validation error in the standard envelope; booking not voided
- **Actual:** Rejected with 400 naming bookingToken; booking still Booked (same Retrieve as VAL-01)
- **Status:** PASS
- **Evidence:** Context value names the Sabre order ID, so bookingToken = Sabre order id

  - **Attempt 1 of 4 - V1 - bookingToken omitted:** HTTP 400
  - **Attempt 2 of 4 - V1 - bookingToken empty:** HTTP 400
  - **Attempt 3 of 4 - V2 - bookingToken omitted:** HTTP 400
  - **Attempt 4 of 4 - V2 - bookingToken empty:** HTTP 400

### TC-VOID-VAL-03 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate whether gdsPNR is mandatory for SabreNdc Void (empty string as in the V2 saved example).
- **Category:** Validation
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void for B8 (V1 OOKWPY, V2 OOROPE) with gdsPNR '' (as in the V2 saved example); Retrieve after
- **Response:** V1 200 voided true (ticket 1572135118458); V2 200 voided true (ticket 1572135118457); Retrieve 400 This Trip Is Already Cancelled
- **Expected:** Either (a) 400 naming gdsPNR, or (b) Void succeeds because gdsPNR is resolved from pnr/bookingToken; never 500
- **Actual:** Outcome (b) on both versions: gdsPNR is not required for SabreNdc Void. The omitted-gdsPNR run was not needed (the empty value was accepted)
- **Status:** PASS
- **Evidence:** Void took ~10s (real Sabre void) and Retrieve then reported the trip cancelled

  - **Attempt 1 of 4 - V1 - gdsPNR '':** HTTP 200
  - **Attempt 2 of 4 - V1 - Retrieve after:** HTTP 400
  - **Attempt 3 of 4 - V2 - gdsPNR '':** HTTP 200
  - **Attempt 4 of 4 - V2 - Retrieve after:** HTTP 400

### TC-VOID-VAL-04 — FAIL

- **Test Case:** [SabreNdc][Void][Request] Validate Void with a surName that does not match any passenger on the PNR is rejected.
- **Category:** Validation
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void B2 (V1 OOLKNB, V2 TMNYPF; passenger surname Ibrahim) with surName 'Mismatch'; Retrieve; then Void B7 (V1 OPWPBD, V2 OXXGBK) with surName omitted
- **Response:** surName 'Mismatch': V1 200 voided true (1572135118448), V2 200 voided true (1572135118449); Retrieve 400 This Trip Is Already Cancelled. surName omitted: V1 200 voided (1572135118459), V2 200 voided (1572135118456)
- **Expected:** Wrong surName rejected with a 4xx envelope and booking not voided; omitted surName: record whether mandatory
- **Actual:** A surname that matches no passenger voids the booking on both versions; surName is not checked at all, and omitting it is also accepted
- **Status:** FAIL
- **Evidence:** Each Void took ~10-11s (real void at Sabre); bookings confirmed cancelled by Retrieve

  - **Attempt 1 of 6 - V1 - surName 'Mismatch':** HTTP 200
  - **Attempt 2 of 6 - V1 - Retrieve after:** HTTP 200
  - **Attempt 3 of 6 - V1 - surName omitted:** HTTP 200
  - **Attempt 4 of 6 - V2 - surName 'Mismatch':** HTTP 200
  - **Attempt 5 of 6 - V2 - Retrieve after:** HTTP 200
  - **Attempt 6 of 6 - V2 - surName omitted:** HTTP 200

### TC-VOID-VAL-05 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate missing supplier or credentialsSelector is rejected.
- **Category:** Validation
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void for B2 with supplier omitted, then credentialsSelector omitted
- **Response:** All four: 400 {status:400, errorCode:"1001", errorMessage:Validation errors occurred..., context:[{name:Supplier|CredentialsSelector, value:Select a valid ...}], originalSupplierRequest:null, originalSupplierResponse:null}
- **Expected:** 400 naming the missing field; no default applied; booking not voided
- **Actual:** Rejected with 400 naming Supplier / CredentialsSelector; booking still Booked. The envelope here is camelCase with errorCode "1001", unlike the PascalCase NDC-INT-TEC-A0001 envelope of VAL-01/02 (see NEG-05)
- **Status:** PASS
- **Evidence:** Retrieve after the batch: still Booked

  - **Attempt 1 of 4 - V1 - supplier omitted:** HTTP 400
  - **Attempt 2 of 4 - V1 - credentialsSelector omitted:** HTTP 400
  - **Attempt 3 of 4 - V2 - supplier omitted:** HTTP 400
  - **Attempt 4 of 4 - V2 - credentialsSelector omitted:** HTTP 400

### TC-VOID-NEG-02 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate Void with a bookingToken from a different SabreNdc booking is rejected.
- **Category:** Negative
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void with booking A's pnr (V1 OOLKNB / V2 TMNYPF) and booking B's bookingToken (V1 TLPJBW's 1SXXXCDQRL3DU / V2 OWVBLV's 1SXXXC0W7DJOW); Retrieve A and B
- **Response:** V1 400 / V2 400 - NDC-INT-TEC-A0001, Context "PNR does not match the supplied Sabre order ID."; Retrieve A and B 200 Booked
- **Expected:** 4xx standard envelope; neither A nor B voided
- **Actual:** Rejected on both versions after a Sabre lookup (~2-4s); both bookings still ticketed
- **Status:** PASS
- **Evidence:** A and B voided later by other cases (VAL-04, NEG-03)

  - **Attempt 1 of 6 - V1 - A's pnr + B's token:** HTTP 400
  - **Attempt 2 of 6 - V1 - Retrieve A:** HTTP 200
  - **Attempt 3 of 6 - V1 - Retrieve B:** HTTP 200
  - **Attempt 4 of 6 - V2 - A's pnr + B's token:** HTTP 400
  - **Attempt 5 of 6 - V2 - Retrieve A:** HTTP 200
  - **Attempt 6 of 6 - V2 - Retrieve B:** HTTP 200

### TC-VOID-NEG-03 — FAIL

- **Test Case:** [SabreNdc][Void][Request] Validate voidTickets containing a ticket number not on the PNR is rejected.
- **Category:** Negative
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void B2 with voidTickets ['0650000000000'] (plain string); then Void B3 (V1 TLPJBW, V2 OWVBLV) with voidTickets [{ticketNumber:'0650000000000', carrierCode:'QR', ticketStatus:'Booked'}] (object shape); Retrieve B3
- **Response:** Plain string: 400 errorCode 1001, context $.voidTickets[0] 'could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType'. Object: V1 200 voided true, voidedTickets [1572135118447 Voided]; V2 200 voided true [1572135118446 Voided]; Retrieve 400 This Trip Is Already Cancelled
- **Expected:** Rejected with a 4xx envelope; tickets unchanged; must not silently void all tickets
- **Actual:** A ticket number that is not on the PNR is ignored and the PNR's real ticket is voided (silent void-all) on both versions. voidTickets elements must be TicketType objects; a plain string fails deserialization and the error leaks the .NET DTO type name
- **Status:** FAIL
- **Evidence:** B3 ticket 1572135118447 (V1) / 1572135118446 (V2) voided although only 0650000000000 was listed

  - **Attempt 1 of 6 - V1 - voidTickets plain string:** HTTP 400
  - **Attempt 2 of 6 - V1 - voidTickets object, foreign number:** HTTP 200
  - **Attempt 3 of 6 - V1 - Retrieve after:** HTTP 400
  - **Attempt 4 of 6 - V2 - voidTickets plain string:** HTTP 400
  - **Attempt 5 of 6 - V2 - voidTickets object, foreign number:** HTTP 200
  - **Attempt 6 of 6 - V2 - Retrieve after:** HTTP 400

### TC-VOID-NEG-04 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify Void with an inactive credentialsSelector (UAE) returns the credentials error, not a generic failure.
- **Category:** Negative
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void for EGY booking B2 with credentialsSelector UAE
- **Response:** V1/V2 400 NDC-INT-TEC-A0001, Context PredicateValidator "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelector' value."
- **Expected:** 4xx with the credentials-inactive message; booking not voided
- **Actual:** Exactly that on both versions; booking still Booked
- **Status:** PASS
- **Evidence:** UAE is still inactive for SabreNdc (re-confirmed 2026-10-22)

  - **Attempt 1 of 2 - V1 - credentialsSelector UAE:** HTTP 400
  - **Attempt 2 of 2 - V2 - credentialsSelector UAE:** HTTP 400

### TC-VOID-SEC-01 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate Void without x-api-key or with an invalid x-api-key is rejected.
- **Category:** Security
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void for B2 without x-api-key, then with x-api-key invalid
- **Response:** All four: 401 {ErrorCode:AuthenticationError, ErrorMessage:Authentication error. Please check your credentials., Context:Invalid authorization header}
- **Expected:** 401/403; booking not voided
- **Actual:** 401 on both versions; booking still Booked
- **Status:** PASS
- **Evidence:** Retrieve with valid headers afterwards: Booked

  - **Attempt 1 of 4 - V1 - no x-api-key:** HTTP 401
  - **Attempt 2 of 4 - V1 - x-api-key invalid:** HTTP 401
  - **Attempt 3 of 4 - V2 - no x-api-key:** HTTP 401
  - **Attempt 4 of 4 - V2 - x-api-key invalid:** HTTP 401

### TC-VOID-SEC-02 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate Void with an invalid Client-Id is rejected.
- **Category:** Security
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void for B2 with Client-Id Invalid-Client
- **Response:** V1/V2 401 AuthenticationError, Context Invalid authorization header
- **Expected:** 401/403; booking not voided
- **Actual:** 401 on both versions; booking still Booked
- **Status:** PASS
- **Evidence:** Retrieve afterwards: Booked

  - **Attempt 1 of 2 - V1 - Client-Id Invalid-Client:** HTTP 401
  - **Attempt 2 of 2 - V2 - Client-Id Invalid-Client:** HTTP 401

### TC-VOID-SEC-03 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate a SabreNdc booking cannot be voided under a different supplier or credentialsSelector.
- **Category:** Security
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void of SabreNdc/EGY booking B2 sent as (a) TravelportNdc/UAE, (b) SabreNdc/KSA; Retrieve with SabreNdc/EGY
- **Response:** (a) 409 OperationNotSupported, Context "TravelportNdc does not exists"; (b) 400 credentials do not exist or are not active; Retrieve 200 Booked
- **Expected:** Both rejected; booking still ticketed
- **Actual:** Both rejected on both versions before reaching the booking; booking still Booked. KSA is not an active selector for SabreNdc, so a live cross-tenant void could not be attempted
- **Status:** PASS
- **Evidence:** (a) reproduces the misleading "TravelportNdc does not exists" context (see REG-01)

  - **Attempt 1 of 4 - V1 - (a) TravelportNdc/UAE:** HTTP 409
  - **Attempt 2 of 4 - V1 - (b) SabreNdc/KSA:** HTTP 400
  - **Attempt 3 of 4 - V2 - (a) TravelportNdc/UAE:** HTTP 409
  - **Attempt 4 of 4 - V2 - (b) SabreNdc/KSA:** HTTP 400

### TC-VOID-SEC-04 — FAIL

- **Test Case:** [SabreNdc][Void][Request] Validate injection payloads in surName are rejected or safely handled.
- **Category:** Security
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void with surName "' OR 1=1 --" (V1 TJGZIO / V2 OXQQQG), "&lt;script&gt;alert(1)&lt;/script&gt;" (V1 OWFPAB / V2 TILWZC), 500 x 'A' (V1 OOICSW / V2 OODZVV)
- **Response:** All six: 200 voided true with the booking's ticket Voided; Retrieve after each: 400 This Trip Is Already Cancelled
- **Expected:** 4xx validation or surname-mismatch error each time; no 500; no reflection; booking not voided
- **Actual:** No 500 and nothing reflected, but every payload was accepted and voided the booking (surName not validated or matched, same root cause as VAL-04)
- **Status:** FAIL
- **Evidence:** Six bookings voided, one per payload per version

  - **Attempt 1 of 6 - V1 - SQL string:** HTTP 200
  - **Attempt 2 of 6 - V1 - script tag:** HTTP 200
  - **Attempt 3 of 6 - V1 - 500 characters:** HTTP 200
  - **Attempt 4 of 6 - V2 - SQL string:** HTTP 200
  - **Attempt 5 of 6 - V2 - script tag:** HTTP 200
  - **Attempt 6 of 6 - V2 - 500 characters:** HTTP 200

### TC-VOID-POS-03 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify Void succeeds for a SabreNdc booking ticketed via Hold then BookAfterHold on the same day.
- **Category:** Positive
- **Endpoint Name:** Hold &gt; BookAfterHold &gt; Void (V1 + V2)
- **Request:** Held V1 OWACKH / V2 TDFNMY, PnrReprice, BookAfterHold (ticketed), then Void with voidTickets []
- **Response:** BookAfterHold 200 - V1 ticket 1572135118473, V2 ticket 1572135118472 Booked; Void 200 {voided:true, voidedTickets:[... Voided]}; Retrieve 400 This Trip Is Already Cancelled
- **Expected:** Same success shape as POS-01/02; no different behaviour for a booking that started as a Hold
- **Actual:** Identical success shape per version; the held-then-ticketed booking voids like a direct booking
- **Status:** PASS
- **Evidence:** Void took ~9s on each version; BookAfterHold responses also lack voidCapability

  - **Attempt 1 of 6 - V1 - BookAfterHold:** HTTP 200
  - **Attempt 2 of 6 - V1 - Void:** HTTP 200
  - **Attempt 3 of 6 - V1 - Retrieve after:** HTTP 400
  - **Attempt 4 of 6 - V2 - BookAfterHold:** HTTP 200
  - **Attempt 5 of 6 - V2 - Void:** HTTP 200
  - **Attempt 6 of 6 - V2 - Retrieve after:** HTTP 400

### TC-VOID-POS-04 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify Void of a multi-passenger SabreNdc booking (ADT+CHD+INF) voids every ticket on the PNR.
- **Category:** Positive
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Booked 1 ADT + 1 CHD + 1 INF (V1 TFGMIY, V2 TLAOYV, 33432.4 EGP); Retrieve; Void with voidTickets []; Retrieve
- **Response:** Before: 3 tickets Booked each. Void 200 voidedTickets V1 [1572135118467, ...466, ...468] / V2 [...470, ...469, ...471] all Voided; Retrieve 400 This Trip Is Already Cancelled
- **Expected:** Every ticket (including the infant) voided; none left active
- **Actual:** All 3 tickets voided on both versions, infant included; voidTickets [] means void-all
- **Status:** PASS
- **Evidence:** voidedTickets lists all three numbers that Book returned (Passenger1..3)

  - **Attempt 1 of 6 - V1 - Retrieve before (3 Booked):** HTTP 200
  - **Attempt 2 of 6 - V1 - Void voidTickets []:** HTTP 200
  - **Attempt 3 of 6 - V1 - Retrieve after:** HTTP 400
  - **Attempt 4 of 6 - V2 - Retrieve before (3 Booked):** HTTP 200
  - **Attempt 5 of 6 - V2 - Void voidTickets []:** HTTP 200
  - **Attempt 6 of 6 - V2 - Retrieve after:** HTTP 400

### TC-VOID-POS-05 — PASS

- **Test Case:** [SabreNdc][Void][Request] Validate Void with voidTickets explicitly listing every ticket number on the PNR.
- **Category:** Positive
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Booked 1 ADT + 1 CHD + 1 INF (V1 OWKJHU, V2 TJNOCZ); Void with voidTickets = the three TicketType objects from Book ({ticketNumber, carrierCode, ticketStatus})
- **Response:** V1 200 voidedTickets [1572135118464, ...463, ...465] Voided; V2 200 [...461, ...460, ...462] Voided; Retrieve 400 This Trip Is Already Cancelled
- **Expected:** Same as voidTickets [] (all voided); record the accepted element shape
- **Actual:** All three voided on both versions. Element shape: an object (TicketType) like Book's tickets entries; a plain string is rejected (see NEG-03)
- **Status:** PASS
- **Evidence:** Explicit list behaves exactly like voidTickets []

  - **Attempt 1 of 4 - V1 - Void listing all 3 tickets:** HTTP 200
  - **Attempt 2 of 4 - V1 - Retrieve after:** HTTP 400
  - **Attempt 3 of 4 - V2 - Void listing all 3 tickets:** HTTP 200
  - **Attempt 4 of 4 - V2 - Retrieve after:** HTTP 400

### TC-VOID-BIZ-01 — BLOCKED

- **Test Case:** [SabreNdc][Void][Response] Verify Void is rejected for a SabreNdc booking ticketed on a previous calendar day.
- **Category:** Business Rule
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Not sent - needs a booking ticketed on day D and a Void on day D+1
- **Response:** No request sent
- **Expected:** Void rejected with a business-rule error on D+1; booking stays ticketed
- **Actual:** Blocked: this single-session run cannot cross midnight. No booking was left for it (it would stay ticketed and unvoidable)
- **Status:** BLOCKED
- **Evidence:** Needs a deliberate D / D+1 run; see Cleanup / follow-up

### TC-VOID-BND-01 — BLOCKED

- **Test Case:** [SabreNdc][Void][Request] Validate the calendar-day boundary: Void just before midnight is accepted and just after midnight is rejected.
- **Category:** Boundary
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Not sent - needs Voids at ~23:50 and ~00:10 in the reference time zone
- **Response:** No request sent
- **Expected:** #1 voided before midnight, #2 rejected after
- **Actual:** Blocked: the reference time zone is still an open question and the run happened mid-day. Observed hint: ticketingDate is returned as a date only (2026-10-22T00:00:00) and V2 holdExpirationDate carries +03:00, so the boundary may follow +03:00 rather than UTC
- **Status:** BLOCKED
- **Evidence:** Run executed 09:38-10:30 UTC

### TC-VOID-BIZ-03 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify Void is rejected for a held, unticketed SabreNdc booking.
- **Category:** Business Rule
- **Endpoint Name:** Hold &gt; Void (V1 + V2)
- **Request:** Held V1 OXXYGW / V2 TFHFMB (no tickets, holdExpirationDate 2026-10-27T20:59); Void; Retrieve; CancelAfterHold (cleanup)
- **Response:** Void 400 NDC-INT-TEC-A0001, Context "Only fulfilled, ticketed orders can be voided."; Retrieve 200 still held (V2 bookingStatus OnHold); CancelAfterHold 200 {cancelled:true, message:"Held Order Is Cancelled"}
- **Expected:** Rejected as not eligible; booking stays held
- **Actual:** Rejected with a clear message on both versions; the hold was untouched and then cleaned up with CancelAfterHold
- **Status:** PASS
- **Evidence:** Retrieve after the failed Void still shows the hold with its expiry

  - **Attempt 1 of 6 - V1 - Void on held booking:** HTTP 400
  - **Attempt 2 of 6 - V1 - Retrieve (still held):** HTTP 200
  - **Attempt 3 of 6 - V1 - CancelAfterHold (cleanup):** HTTP 200
  - **Attempt 4 of 6 - V2 - Void on held booking:** HTTP 400
  - **Attempt 5 of 6 - V2 - Retrieve (still held):** HTTP 200
  - **Attempt 6 of 6 - V2 - CancelAfterHold (cleanup):** HTTP 200

### TC-VOID-BIZ-04 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify Void is rejected for a SabreNdc hold already cancelled via CancelAfterHold.
- **Category:** Business Rule
- **Endpoint Name:** CancelAfterHold &gt; Void (V1 + V2)
- **Request:** Void on the hold cancelled in BIZ-03 (V1 OXXYGW, V2 TFHFMB); Retrieve
- **Response:** Void 400 NDC-INT-TEC-A0001, Context "Only fulfilled, ticketed orders can be voided."; Retrieve 200 - holdExpirationDate null, total 0, V2 bookingStatus OnHold
- **Expected:** 4xx standard envelope; no 500
- **Actual:** Rejected with 400 on both versions (same not-ticketed message rather than an already-cancelled one). Side observation: Retrieve of the cancelled hold still returns 200 and V2 reports bookingStatus OnHold
- **Status:** PASS
- **Evidence:** Logged as a separate defect finding

  - **Attempt 1 of 4 - V1 - Void on cancelled hold:** HTTP 400
  - **Attempt 2 of 4 - V1 - Retrieve after cancel:** HTTP 200
  - **Attempt 3 of 4 - V2 - Void on cancelled hold:** HTTP 400
  - **Attempt 4 of 4 - V2 - Retrieve after cancel:** HTTP 200

### TC-VOID-BIZ-05 — FAIL

- **Test Case:** [SabreNdc][Book]&amp;[Void] [Response] Verify voidCapability is consistent with the actual Void outcome.
- **Category:** Business Rule
- **Endpoint Name:** Book / Retrieve / Void (V1 + V2)
- **Request:** Compared voidCapability across every SabreNdc Book, BookAfterHold and Retrieve response of this run (26 bookings/holds) with the Void outcomes
- **Response:** voidCapability absent from every Book, BookAfterHold and Retrieve response on V1 and V2
- **Expected:** Void-allowed value before a same-day Void; VoidNotAllowed after a Void or on D+1; no disagreement
- **Actual:** There is no flag to compare: voidCapability is never returned, while same-day Voids do succeed. The consistency check fails by absence (same root cause as TC-CAPCHECK-SABRENDC-02)
- **Status:** FAIL
- **Evidence:** Examples: Book TFZFYS / TKTQQW (shown), BookAfterHold OWACKH / TDFNMY, Retrieve before each Void

  - **Attempt 1 of 2 - V1 - Book response (no voidCapability):** HTTP 200
  - **Attempt 2 of 2 - V2 - Book response (no voidCapability):** HTTP 200

### TC-VOID-NEG-01 — FAIL

- **Test Case:** [SabreNdc][Void][Response] Verify Void with a non-existent pnr returns a mapped error, not a server error.
- **Category:** Negative
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void SabreNdc/EGY with pnr 'ZZZZZZ', gdsPNR 'ZZZZZZ', bookingToken '1SXXXZZZZZZZZ', surName 'Test'
- **Response:** 409 {Status:409, ErrorCode:NDC-INT-UNC-Z9999, ErrorMessage:"NDC-INT-UNC-Z9999", Context:[{Name:"060004", Value:"Order not found: orderId=[1SXXXZZZZZZZZ]"}], OriginalSupplierRequest:[REDACTED], OriginalSupplierResponse:[REDACTED]} on both versions
- **Expected:** 4xx with a meaningful ErrorCode/ErrorMessage (booking not found); no unhandled Sabre fault; Context does not echo the raw Sabre response
- **Actual:** Not a 500, but it is the unmapped catch-all code with the code repeated as the message, the raw Sabre error code 060004 in Context, and the raw Sabre request/response in OriginalSupplierRequest/OriginalSupplierResponse
- **Status:** FAIL
- **Evidence:** Raw fields redacted in this report per SPEC.md §7.14; they contained Sabre's own JSON error body

  - **Attempt 1 of 2 - V1 - non-existent pnr:** HTTP 409
  - **Attempt 2 of 2 - V2 - non-existent pnr:** HTTP 409

### TC-VOID-NEG-05 — FAIL

- **Test Case:** [SabreNdc][Void][Response] Verify error responses for all failed Void scenarios use one consistent envelope.
- **Category:** Negative
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Tabulated every failed Void of this run (VAL-01/02/05, NEG-01..04, SEC-01..03, BIZ-03/04) on both versions
- **Response:** Validation (missing pnr/bookingToken): 400 PascalCase {Status, TransactionId, ErrorCode:NDC-INT-TEC-A0001}. Validation (missing supplier/credentialsSelector, bad voidTickets item): 400 camelCase {status, transactionId, errorCode:"1001", context, originalSupplierRequest:null, originalSupplierResponse:null}. Inactive selector: 400 NDC-INT-TEC-A0001. Business rules (token/PNR mismatch, held not ticketed, cancelled hold, Retrieve of voided trip): 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters". Not found: 409 NDC-INT-UNC-Z9999 with raw Sabre payload. Wrong supplier: 409 OperationNotSupported. Auth: 401 AuthenticationError. Status always equals the HTTP code; TransactionId always a GUID.
- **Expected:** One envelope {Status, TransactionId, ErrorCode, ErrorMessage, Context}; validation = 400; business rules use one consistent code family
- **Actual:** Two different envelope casings are used (PascalCase vs camelCase with errorCode "1001" and extra originalSupplier* keys); business-rule rejections share the generic validation code and an "invalid request parameters" message; not-found is an unmapped 409 catch-all. V1 and V2 behave the same
- **Status:** FAIL
- **Evidence:** Attempts below show one example of each shape (V1); V2 identical

  - **Attempt 1 of 5 - V1 - PascalCase validation:** HTTP 400
  - **Attempt 2 of 5 - V1 - camelCase validation (errorCode 1001):** HTTP 400
  - **Attempt 3 of 5 - V1 - business rule as invalid request:** HTTP 400
  - **Attempt 4 of 5 - V1 - unmapped 409 not-found:** HTTP 409
  - **Attempt 5 of 5 - V1 - OperationNotSupported:** HTTP 409

### TC-VOID-VAL-06 — FAIL

- **Test Case:** [SabreNdc][Void][Response] Verify the Void response follows the integration contract and does not expose raw SabreNdc payloads.
- **Category:** Validation
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Inspected every Void success body (POS-01..05) and failure body of this run, field by field
- **Response:** Success: {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]} (+ V2 passengersVoidedAncillaries, emdTickets) - clean. Failures: not-found returns OriginalSupplierRequest/OriginalSupplierResponse with the raw Sabre exchange and Sabre code 060004; voidTickets deserialization error names NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType
- **Expected:** Integration-defined fields only; standard envelope; no raw Sabre payload, credentials or .NET DTO type names
- **Actual:** Success responses are clean, but two failure paths expose a raw Sabre payload and a .NET DTO type name. No credentials or PCC appeared in any Void body (V1/V2 Retrieve does return a pcc field, outside Void)
- **Status:** FAIL
- **Evidence:** See NEG-01 and NEG-03 defect findings; raw fields redacted in this report

  - **Attempt 1 of 3 - V1 - DTO type name leak:** HTTP 400
  - **Attempt 2 of 3 - V1 - raw Sabre payload:** HTTP 409
  - **Attempt 3 of 3 - V2 - raw Sabre payload:** HTTP 409

### TC-VOID-REG-01 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void for TravelportNdc still returns OperationNotSupported after the SabreNdc implementation.
- **Category:** Regression
- **Endpoint Name:** Void (V1 + V2)
- **Request:** TravelportNdc/UAE Book (V1 pnr 9DV4S9 / gds HNFML4, V2 pnr 9DV2WY / gds HNFML6, 1000 AED) then Void
- **Response:** Void 409 {ErrorCode:OperationNotSupported, ErrorMessage:This action is not currently supported..., Context:[{Value:"TravelportNdc does not exists"}]}; Retrieve 200 tickets Booked
- **Expected:** Unchanged baseline: 409 OperationNotSupported; not routed to the Sabre void handler
- **Actual:** Unchanged on both versions; the booking stays ticketed. The misleading Context "TravelportNdc does not exists" is still present
- **Status:** PASS
- **Evidence:** Travelport tickets 1572135185770 (V1) and 1572135185769 (V2) left ticketed - see Cleanup

  - **Attempt 1 of 4 - V1 - Void TravelportNdc:** HTTP 409
  - **Attempt 2 of 4 - V1 - Retrieve after:** HTTP 200
  - **Attempt 3 of 4 - V2 - Void TravelportNdc:** HTTP 409
  - **Attempt 4 of 4 - V2 - Retrieve after:** HTTP 200

### TC-VOID-REG-02 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify V1 and V2 Void return the same response shape for SabreNdc.
- **Category:** Regression
- **Endpoint Name:** Void (V1 vs V2)
- **Request:** Diffed V1 and V2 responses for the same scenarios: POS-01/02 success, BIZ-02 repeat, NEG-01 not-found, and every validation case
- **Response:** Success V1 {voided, voidedTickets}; V2 {voided, voidedTickets, passengersVoidedAncillaries:{}, emdTickets:{}}. Every error scenario: same HTTP status, ErrorCode and Context on both versions
- **Expected:** Identical success shape and error codes per scenario; differences recorded
- **Actual:** Same core contract and identical error codes. Only difference: V2 adds two empty fields (passengersVoidedAncillaries, emdTickets), consistent with V2 Book also returning emdTickets - recorded as a version difference, not a break
- **Status:** PASS
- **Evidence:** Field-by-field diff of the bodies shown

  - **Attempt 1 of 4 - V1 - V1 success:** HTTP 200
  - **Attempt 2 of 4 - V2 - V2 success:** HTTP 200
  - **Attempt 3 of 4 - V1 - V1 not-found:** HTTP 409
  - **Attempt 4 of 4 - V2 - V2 not-found:** HTTP 409

### FLOW-V1-05-SABRE — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #5 completes end to end for SabreNdc.
- **Category:** Flow
- **Endpoint Name:** V1 Search &gt; FareConfirm &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve
- **Request:** CAI-JED 2026-11-22, 1 ADT, SabreNdc/EGY; same chain as TC-VOID-POS-03
- **Response:** Hold 200 pnr OWACKH (expires 2026-10-27 20:59), PnrReprice 200 (13015.8 EGP), Retrieve 200 held, BookAfterHold 200 ticketed (same pnr), Retrieve 200 Booked, Void 200 voided, Retrieve 400 This Trip Is Already Cancelled
- **Expected:** All hops succeed before holdExpirationDate; BookAfterHold issues tickets; Void succeeds; final Retrieve shows tickets voided
- **Actual:** All hops behaved as expected; same pnr throughout; price 13015.8 EGP at Hold, PnrReprice and BookAfterHold
- **Status:** PASS
- **Evidence:** V1 Retrieve has no bookingStatus (known); state read from tickets/holdExpirationDate

  - **Hop 1 &mdash; V1 Search (h1_V1):** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm (h1_V1):** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (h1_V1):** PASS &mdash; 200 - pnr OWACKH
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (after-hold):** PASS &mdash; 200 - pnr OWACKH
  - **Hop 6 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 - pnr OWACKH
  - **Hop 7 &mdash; V1 Retrieve (after-BAH):** PASS &mdash; 200 - pnr OWACKH
  - **Hop 8 &mdash; V1 Void (POS03):** PASS &mdash; 200
  - **Hop 9 &mdash; V1 Retrieve (after-void):** PASS &mdash; 400

### FLOW-V2-29-SABRE — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #29 completes end to end for SabreNdc.
- **Category:** Flow
- **Endpoint Name:** V2 Search &gt; FareConfirm &gt; AddPassenger &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve
- **Request:** CAI-JED 2026-11-22, 1 ADT, SabreNdc/EGY; same chain as TC-VOID-POS-03
- **Response:** Hold 200 pnr TDFNMY (expires 2026-10-27 20:59), PnrReprice 200 (13015.8 EGP), Retrieve 200 held, BookAfterHold 200 ticketed (same pnr), Retrieve 200 Booked, Void 200 voided, Retrieve 400 This Trip Is Already Cancelled
- **Expected:** All hops succeed before holdExpirationDate; BookAfterHold issues tickets; Void succeeds; final Retrieve shows tickets voided
- **Actual:** All hops behaved as expected; same pnr throughout; price 13015.8 EGP at Hold, PnrReprice and BookAfterHold
- **Status:** PASS
- **Evidence:** V2 Hold sent with an explicit credentialsSelector (the saved body's {{credentialsSelector}} defect avoided)

  - **Hop 1 &mdash; V2 Search (h1_V2):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 FareConfirm (h1_V2):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 AddPassenger (h1_V2):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 Hold (h1_V2):** PASS &mdash; 200 - pnr TDFNMY
  - **Hop 5 &mdash; V2 PnrReprice (FCAH):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 Retrieve (after-hold):** PASS &mdash; 200 - pnr TDFNMY
  - **Hop 7 &mdash; V2 BookAfterHold (BAH):** PASS &mdash; 200 - pnr TDFNMY
  - **Hop 8 &mdash; V2 Retrieve (after-BAH):** PASS &mdash; 200 - pnr TDFNMY
  - **Hop 9 &mdash; V2 Void (POS03):** PASS &mdash; 200
  - **Hop 10 &mdash; V2 Retrieve (after-void):** PASS &mdash; 400

## Findings

### Defects

- **[TC-CAPCHECK-SABRENDC-02] SabreNdc Book and Retrieve responses omit voidCapability on V1 and V2, even for a booking ticketed today** Field: `voidCapability`. Expected: "voidCapability": "&lt;void-allowed value&gt;" on a same-day ticketed booking (e.g. VoidAllowed), switching to VoidNotAllowed once voided or after the void window. **Impact:** Callers cannot decide from the booking whether to offer Void; the capability-flag consistency check (TC-VOID-BIZ-05) cannot be performed Evidence: V1 Book TFZFYS and V2 Book TKTQQW (2026-10-22): key lists contain no voidCapability; same for RetrieveBooking/Retrieve
- **[TC-VOID-BIZ-02] A second Void on an already-voided SabreNdc booking returns 200 voided:true instead of an already-voided rejection (V1 and V2)** Field: `voided`. Expected: HTTP 409 (or 4xx) standard envelope, e.g. {Status:409, ErrorCode:"AlreadyVoided", ErrorMessage:"Tickets on this booking are already voided"}. **Impact:** Callers cannot tell a real void from a repeat; a retry looks like a fresh success and the response contradicts Retrieve, which says the trip is cancelled Evidence: TFZFYS (V1) and TKTQQW (V2): first Void 200 in ~10s, Retrieve 400 This Trip Is Already Cancelled, second Void 200 voided:true in ~1.5s
- **[TC-VOID-VAL-04] SabreNdc Void ignores surName: a surname that matches no passenger (or no surname at all) voids the booking (V1 and V2)** Field: `surName`. Expected: 4xx standard envelope, e.g. {Status:400, ErrorCode:"NDC-INT-TEC-A0001", Context:[{Value:"surName does not match any passenger on the PNR"}]}, booking left ticketed. **Impact:** The passenger-identity check documented for Void does not exist; a caller holding only pnr + bookingToken can void any ticketed SabreNdc booking (also lets every SEC-04 injection string through) Evidence: OOLKNB (V1) and TMNYPF (V2) voided with surName 'Mismatch'; OPWPBD (V1) and OXXGBK (V2) voided with surName omitted; 2026-10-22
- **[TC-VOID-NEG-03] Void with voidTickets naming a ticket that is not on the PNR voids every ticket on the PNR instead of being rejected (V1 and V2)** Field: `voidTickets`. Expected: 4xx standard envelope, e.g. Context [{Value:"Ticket 0650000000000 is not on PNR TLPJBW"}], tickets unchanged. **Impact:** Selective void silently becomes void-all: a caller asking to void one (wrong) ticket loses every ticket on the booking Evidence: TLPJBW (V1) ticket 1572135118447 and OWVBLV (V2) ticket 1572135118446 voided by voidTickets [{ticketNumber:0650000000000}], 2026-10-22
- **[TC-VOID-NEG-03] Void deserialization error leaks the internal .NET type name NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType (and a stray "voidRequestDto field is required" entry)** Field: `context[].value`. Expected: context [{name:"voidTickets[0]", value:"Each voidTickets item must be an object with ticketNumber"}]. **Impact:** Internal type names exposed to callers; known DTO-leak defect now also on Void Evidence: voidTickets ['0650000000000'] -&gt; 400 errorCode 1001 on V1 and V2
- **[TC-VOID-BIZ-04] After CancelAfterHold, SabreNdc Retrieve still returns 200 for the cancelled hold; V2 reports bookingStatus OnHold (total 0, holdExpirationDate null), V1 shows no cancelled signal** Field: `bookingStatus`. Expected: A terminal signal, e.g. bookingStatus "Cancelled" or the documented 409 NDC-INT-BYP-A0003 "Reservation is already cancelled". **Impact:** Callers polling Retrieve cannot tell a cancelled hold from a live one Evidence: OXXYGW (V1) and TFHFMB (V2): CancelAfterHold 200 {cancelled:true, message:"Held Order Is Cancelled"}, then Retrieve 200 with OnHold (V2)
- **[TC-VOID-NEG-01] Void for an unknown SabreNdc order returns the unmapped 409 NDC-INT-UNC-Z9999 (message = the code) and echoes the raw Sabre request and response** Field: `ErrorCode / OriginalSupplierResponse`. Expected: {Status:404 or 409, ErrorCode:"BookingNotFound", ErrorMessage:"No booking found for the supplied PNR / booking token", Context:[...]} with no OriginalSupplier* fields. **Impact:** Callers get no usable error, and supplier internals are exposed in the API response Evidence: V1 TransactionId 903b824c-..., V2 f42c2c1d-..., 2026-10-22
- **[TC-VOID-NEG-05] Void errors use two envelope casings (Status/ErrorCode vs status/errorCode "1001" + originalSupplier* keys), and business-rule rejections reuse the generic "Invalid request" validation code** Field: `error envelope`. Expected: {Status, TransactionId, ErrorCode, ErrorMessage, Context} everywhere; a distinct business-rule code (e.g. VoidNotEligible) for held/cancelled/mismatched bookings. **Impact:** Clients need two parsers and cannot tell a bad request from an ineligible booking Evidence: Validation (missing pnr/bookingToken): 400 PascalCase {Status, TransactionId, ErrorCode:NDC-INT-TEC-A0001}. Validation (missing supplier/credentialsSelector, bad voidTickets item): 400 camelCase {status, transactionId, errorCode:"1001", context, originalSupplierRequest:null, originalSupplierResponse:null}. Inactive selector: 400 NDC-INT-TEC-A0001. Business rules (token/PNR mismatch, held not ticketed, cancelled hold, Retrieve of voided trip): 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters". Not found: 409 NDC-INT-UNC-Z9999 with raw Sabre payload. Wrong supplier: 409 OperationNotSupported. Auth: 401 AuthenticationError. Status always equals the HTTP code; TransactionId always a GUID.

### Also re-confirmed

- **[TC-VOID-SEC-04] surName not validated** &mdash; Same root cause as TC-VOID-VAL-04: every injection surname voided the booking
- **[TC-VOID-BIZ-05] voidCapability missing** &mdash; Same defect as TC-CAPCHECK-SABRENDC-02, seen on all 26 SabreNdc bookings/holds of this run, including BookAfterHold

## Proposed SPEC.md updates

- §2.15 Expected Success Response &mdash; status: *pending*
  - **Old:** "**Expected Success Response**: `UNKNOWN` for a void-eligible booking — not observed this run."
  - **New:** "**Expected Success Response** `[Confirmed live 2026-10-22, SabreNdc/EGY, V1+V2]`: HTTP 200 `{voided: true, voidedTickets: [{ticketStatus: "Voided", ticketNumber, carrierCode}]}`; V2 additionally returns `passengersVoidedAncillaries: {}` and `emdTickets: {}`. Ticketing is synchronous at Book for SabreNdc, so a same-day Void can follow Book immediately (~10s per Void)."

- §2.15 Required Request Fields (voidTickets, gdsPNR) &mdash; status: *pending*
  - **Old:** "`voidTickets` (array, empty `[]` in every saved example — `UNKNOWN` exact shape when populated, presumably ticket numbers to selectively void vs. void-all-when-empty)."
  - **New:** "`voidTickets` `[Confirmed live 2026-10-22, SabreNdc]`: `[]` voids every ticket on the PNR (ADT+CHD+INF confirmed); each element is a TicketType object `{ticketNumber, carrierCode, ticketStatus}` (a plain string fails deserialization with 400 errorCode 1001). DEFECT: an element naming a ticket not on the PNR is ignored and all tickets are voided. `gdsPNR` is not required for SabreNdc — `""` is accepted and the void succeeds."

- §2.15 Common Errors &mdash; status: *pending*
  - **Old:** "**Common Errors**: voiding outside the void window; voiding a booking whose `voidCapability` was already `"VoidNotAllowed"` at Book time; voiding with an incorrect `surName`."
  - **New:** "**Common Errors** `[Confirmed live 2026-10-22, SabreNdc]`: held/unticketed or cancelled hold → 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided."; pnr/bookingToken from different orders → 400 "PNR does not match the supplied Sabre order ID."; missing pnr / bookingToken → 400 NotEmptyValidator; unknown order → 409 NDC-INT-UNC-Z9999 (unmapped, defect); a repeat Void returns 200 voided:true (defect); `surName` is NOT checked — a wrong or missing surname still voids (defect). Retrieve after a Void returns 400 NDC-INT-TEC-A0001 "This Trip Is Already Cancelled"."

- §2.9 Expected Success Response (voidCapability) &mdash; status: *pending*
  - **Old:** "voidCapability,           // e.g. "VoidNotAllowed" — INFERRED a live, booking-specific flag indicating whether Void is currently possible for this PNR (see §2.14)"
  - **New:** "voidCapability,           // e.g. "VoidNotAllowed" — documented, but [Confirmed live 2026-10-22] NOT returned by SabreNdc (V1/V2 Book, BookAfterHold, Retrieve) nor by TravelportNdc Book; tracked as a defect"

- §4.6 Capability Summary Matrix (SabreNDC row) &mdash; status: *pending*
  - **Old:** "| SabreNDC | Unknown | Unknown | Supported | Supported | Unknown | Unknown | Unknown |"
  - **New:** "| SabreNDC | Unknown | Not Supported (haveBundles false on all offers, EGY 2026-10-22) | Supported | Supported | Supported (EGY, same-day, V1+V2, confirmed 2026-10-22) | Unknown | Unknown |"

## Cleanup / follow-up

Live artifacts left behind this round (2):

- **needs_void_cancel** &mdash; pnr 9DV4S9 (gdsPNR HNFML4) (TC-VOID-REG-01) &mdash; TravelportNdc/UAE V1 booking, ticket 1572135185770, ticketed 2026-10-22; Void is not supported for TravelportNdc, needs manual cancellation per team process
- **needs_void_cancel** &mdash; pnr 9DV2WY (gdsPNR HNFML6) (TC-VOID-REG-01) &mdash; TravelportNdc/UAE V2 booking, ticket 1572135185769, ticketed 2026-10-22; Void is not supported for TravelportNdc, needs manual cancellation per team process

