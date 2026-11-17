# QA Execution Report — TravelportNdc_Void_TestCases.csv (NDC_Integration/TestCases/TravelportNdc_Void_TestCases.csv) - ROUND 2 - TravelportNdc / UAE - V1 and V2 - 53 test cases

**Environment:** staging (ndc-integration-stg-ne-5) &middot; https://ndc-integration-stg-ne-5.azurewebsites.net/
**Supplier:** TravelportNdc  **Credentials Selector:** UAE
**Started:** 2026-10-27T06:13:59.987Z
**Ended:** 2026-10-27T07:05:28.989Z
**Status:** COMPLETE
**Execution Duration:** 51m 29s ([View Time Breakdown](20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2_TimeBreakdown.html))
**Prior runs:** Round 1: 2026-10-26 (20261026-105925_TravelportNdc-Void-UAE-V1V2): 28 pass, 22 fail, 3 blocked of 53 (see NDC_Integration/Artifacts/Logs/)

## Scope note

Round 2 of TravelportNdc_Void_TestCases.csv on the same URL as Round 1 (ndc-integration-stg-ne-5, TravelportNdc/UAE), run on the morning of 2026-10-27, the day after Round 1, against a changed API: V1 Void now works, pnr and bookingToken are now required, a held booking can no longer be voided, and voidCapability appears on ticketed bookings. Verdict rule: for the cases marked "Both" the case passes only if V1 and V2 both meet the expected result and each version's outcome is recorded; because V1 and V2 behave identically this round (REG-02) the verdicts equal what the Round 1 rule (follow V2) would give. Scope: TravelportNdc only, Void scope, as instructed during the run; TC-VOIDTPN-REG-01 (SabreNdc regression) is therefore BLOCKED as out of scope. Before that instruction arrived, 2 throwaway SabreNdc/EGY bookings (QZPPEU, QPHFIW) had been created and voided (Void 200 on both) and 2 FlyNas Voids with a fake PNR had been sent (409 OperationNotSupported); none of that is used as a result, and no SabreNdc or FlyNas booking is left live. SEC-03 variant (a) addresses the SabreNdc void route with a TravelportNdc booking because the case names it. Compared with Round 1 (28 pass, 22 fail, 3 blocked): improved FAIL -> PASS: CAP-02, CAP-03, POS-01, VAL-02, BIZ-03, REG-02, FLOW-V1-03-TPN, FLOW-V1-05-TPN; PASS -> BLOCKED: REG-01 (out of scope); BLOCKED -> run: FLOW-V1-03-TPN-NEGHOP5. Still blocked: BIZ-01 (no ticket from a previous day exists) and BND-02 (midnight crossing). Test-data note: parallel bookings on one offer collided at the supplier ("INFANT QUOTA FOR FLIGHT HAS BEEN EXCEEDED", "FLIGHT IS LOCKED", "OFFER IS NOT AVAILABLE AND CANNOT BE WAITLISTED"): 26 Book attempts failed during test-data preparation and were rerun sequentially; these are not results. Because surName, the bookingToken value and the voidTickets list are still not validated, one fresh booking per variant was created (102 TravelportNdc bookings and holds in total). Flow 76 needed three attempts because of two transient Emirates errors (BUG-14). All bookings and holds were voided or cancelled by the end of the run.

## Summary

- Test cases logged: 53 of 53 planned
- Passed: 35
- Failed: 15
- Blocked: 3
- Failed test cases: TC-VOIDTPN-VAL-04, TC-VOIDTPN-VAL-07, TC-VOIDTPN-VAL-10, TC-VOIDTPN-BND-01, TC-VOIDTPN-BIZ-05, TC-VOIDTPN-BIZ-06, TC-VOIDTPN-NEG-01, TC-VOIDTPN-NEG-02, TC-VOIDTPN-NEG-03, TC-VOIDTPN-NEG-05, TC-VOIDTPN-SEC-04, FLOW-V1-09-TPN, FLOW-V1-11-TPN, FLOW-V1-03-TPN-NEGHOP5, FLOW-V2-27-TPN-NEGHOP6
- Blocked test cases: TC-VOIDTPN-BND-02, TC-VOIDTPN-BIZ-01, TC-VOIDTPN-REG-01

## Test case results

### TC-CAPCHECK-TPN-01 — PASS

- **Test Case:** [TravelportNdc][Search] Verify TravelportNdc credentials for credentialsSelector UAE are active and return offers.
- **Category:** Positive
- **Endpoint Name:** Search (V1 + V2)
- **Request:** V1 and V2 Search, TravelportNdc/UAE, one-way CAI-&gt;JED 2026-11-12, 1 ADT, isdebug=false
- **Response:** V1 200 (65.8s) and V2 200 (3.0s), 53 offers each, first offer 950 AED. canBeHeld=true 53/53, haveBundles=true 0. V2 offerHasAncillary=true on 25/53, isSeatMapRequired=true on 0; V1 returns no offerHasAncillary key.
- **Expected:** HTTP 200 on both versions with non-empty offers[]; no 'credentials ... do not exist or are not active' error. canBeHeld=true expected (baseline 67/67) so Hold-based cases are runnable; haveBundles=false expected so Bundle+Void flows are out of scope.
- **Actual:** Both versions 200 with 53 offers (baseline 67 on 2026-08-05; the count differs with date and live inventory). canBeHeld 53/53 so every Hold-based case is runnable; haveBundles 0/53 so Bundle+Void flows stay out of scope. V2 offerHasAncillary is true on 25 offers (SPEC 4.6 Ancillary is Conditional); no ANC/SM + Void flow is in this file. The first V1 Search of the session took 65.8s (V2 3.0s), the same cold-start delay seen in Round 1.
- **Status:** PASS
- **Evidence:** V1 keys: offerId, offerJourneys, passengerFareBreakdown, priceDetails, refundability, haveBundles, canBeHeld. V2 adds isDealCodeApplied, offerHasAncillary, offerHasSeat, isSeatMapRequired, isAncillaryRequired and others. No credentials error.

  - **Attempt 1 of 2 - V1 Search:** HTTP 200
  - **Attempt 2 of 2 - V2 Search:** HTTP 200

### TC-CAPCHECK-TPN-02 — PASS

- **Test Case:** [TravelportNdc][Book][Response] Verify a TravelportNdc Book returns synchronously issued ticket numbers and records the voidCapability value.
- **Category:** Positive
- **Endpoint Name:** Book (V1 + V2)
- **Request:** V1 Search &gt; FareConfirm &gt; Book and V2 Search &gt; FareConfirm &gt; AddPassenger &gt; Book, 1 ADT (surname Ibrahim), then Retrieve on each
- **Response:** V1 Book 200 (23.3s): pnr 774MNY, gdsPNR HNGKWD, ticket 1572141427426 Booked QR, voidCapability FullVoidOnlyAllowed, ticketingDate 2026-10-27T06:15:23. V2 Book 200 (22.0s): pnr 773JKY, gdsPNR HNGKWF, ticket 1572141427425 Booked QR, voidCapability FullVoidOnlyAllowed. Retrieve on both: 200, ticket Booked, voidCapability FullVoidOnlyAllowed.
- **Expected:** HTTP 200; pnr, gdsPNR, bookingToken non-empty; tickets[] populated with ticketStatus=Booked (baseline 2026-08-05: Book issued QR tickets synchronously in ~28s). Record whether voidCapability is now present and its exact enum value as the 'void allowed' baseline; if absent, log it as a recurrence of the missing-voidCapability defect (absent on TravelportNdc 2026-08-05, on SabreNdc 2026-10-22 and 2026-10-25).
- **Actual:** Both Book calls are synchronous: pnr, gdsPNR and bookingToken are present and tickets[] holds one Booked ticket (baseline matched, ~22s). voidCapability is now returned on Book and Retrieve with the value FullVoidOnlyAllowed, which is the recorded "void allowed" baseline (it was absent in Round 1 and on 2026-08-05). One new anomaly: the V1 booking 774MNY and the V2 booking 773JKY, made in the same second, were given the identical bookingToken 96e14dee-43a8-4068-b47b-31d727a06b7d (see BUG-13).
- **Status:** PASS
- **Evidence:** voidCapability FullVoidOnlyAllowed on V1/V2 Book and Retrieve. Duplicate bookingToken across different PNRs: 2 pairs among the 102 bookings created this round (774MNY/773JKY and 774VYF/774AIE).

  - **Attempt 1 of 4 - V1 Book:** HTTP 200
  - **Attempt 2 of 4 - V1 Retrieve:** HTTP 200
  - **Attempt 3 of 4 - V2 Book:** HTTP 200
  - **Attempt 4 of 4 - V2 Retrieve:** HTTP 200

### TC-CAPCHECK-TPN-03 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void for a ticketed TravelportNdc booking is no longer rejected as OperationNotSupported.
- **Category:** Positive
- **Endpoint Name:** Void (V1 + V2)
- **Request:** POST api/FlightBooking/Void (V1) and api/V2/FlightBooking/Void (V2) for the two ticketed bookings from CAPCHECK-02: supplier TravelportNdc, credentialsSelector UAE, pnr, gdsPNR, bookingToken, surName Ibrahim, voidTickets []
- **Response:** V1 200 {voided:true, voidedTickets:1} in 15.2s; V2 200 {voided:true, voidedTickets:1} in 15.3s. Both list the voided ticket with ticketStatus Voided.
- **Expected:** Neither response is the 2026-08-05 baseline (HTTP 409, ErrorCode=OperationNotSupported, Context 'TravelportNdc does not exists'). Void is routed to a TravelportNdc handler and returns a 2xx success or a mapped business error. If the 409 is still returned, the build under test lacks this feature - stop and block the suite.
- **Actual:** Neither response is the 2026-08-05 / Round 1 baseline: V1 Void is no longer 409 OperationNotSupported ("TravelportNdc does not exists"). Both versions now route to a TravelportNdc handler and return 200 voided:true. The suite gate is open. This is the change that matters most between Round 1 and Round 2.
- **Status:** PASS
- **Evidence:** V1 voidedTickets [1572141427426 Voided QR]; V2 voidedTickets [1572141427425 Voided QR] with passengersVoidedAncillaries null, emdTickets {}

  - **Attempt 1 of 2 - V1 Void:** HTTP 200
  - **Attempt 2 of 2 - V2 Void:** HTTP 200

### TC-CAPCHECK-TPN-04 — PASS

- **Test Case:** [TravelportNdc][Search] Verify which credentialsSelector values (UAE, EGY, KSA) are active for TravelportNdc.
- **Category:** Positive
- **Endpoint Name:** Search (V2)
- **Request:** V2 Search, supplier TravelportNdc, credentialsSelector UAE, EGY and KSA in turn, CAI-&gt;JED 2026-11-12, 1 ADT
- **Response:** UAE 200 53 offers; EGY 200 48 offers; KSA 400 NDC-INT-TEC-A0001 [{"Name":"PredicateValidator","Value":"The credentials for the selected supplier do not exist or are not activ
- **Expected:** UAE active (baseline). For EGY and KSA record active/inactive. Inactive selectors return the 'credentials for the selected supplier do not exist or are not active' 400 ValidationError.
- **Actual:** UAE active, EGY ACTIVE (48 offers), KSA inactive with the documented credentials 400. NEG-04 therefore uses KSA as the inactive selector; EGY is a second active selector, so SEC-03(b) is runnable. Same result as Round 1.
- **Status:** PASS
- **Evidence:** KSA TransactionId 88091422-669b-4e28-a2e6-5f1a6d7ddae4

  - **Attempt 1 of 3 - UAE:** HTTP 200
  - **Attempt 2 of 3 - EGY:** HTTP 200
  - **Attempt 3 of 3 - KSA:** HTTP 400

### TC-VOIDTPN-POS-01 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify V1 Void succeeds for a TravelportNdc booking ticketed the same calendar day.
- **Category:** Positive
- **Endpoint Name:** Void (V1)
- **Request:** V1 Book 1 ADT (pnr 774MNY, gdsPNR HNGKWD, ticket 1572141427426) then POST api/FlightBooking/Void {supplier TravelportNdc, credentialsSelector UAE, pnr, gdsPNR, bookingToken, surName Ibrahim, voidTickets []}, then RetrieveBooking
- **Response:** Book 200 (23.3s). Void 200 {voided:true, voidedTickets:1} in 15.2s: {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141427426","carrierCode":"QR"}]}. Retrieve: 409 NDC-INT-BYP-A0003 "Reservation is already cancelled."
- **Expected:** HTTP 2xx with Void succeeded (voided=true and the voided ticket listed). Not an error envelope, no raw Travelport payload. Reference contract = SabreNdc Void observed 2026-10-22: {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]}, V2 also passengersVoidedAncillaries[] and emdTickets[]; SPEC §2.15 still marks the shape UNKNOWN, so record the TravelportNdc shape as its own baseline.
- **Actual:** V1 Void succeeds for a same-day TravelportNdc booking: 200, voided=true, the ticket listed with ticketStatus Voided; no error envelope and no raw Travelport payload in the success body. Recorded V1 success contract: {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]}, exactly the SabreNdc V1 shape and without the V2-only fields. In Round 1 the same request returned 409 OperationNotSupported (fixed).
- **Status:** PASS
- **Evidence:** voidedTickets echoes the Book ticket number and carrier unchanged; Retrieve afterwards is the terminal 409.

  - **Attempt 1 of 3 - V1 Book:** HTTP 200
  - **Attempt 2 of 3 - V1 Void straight after Book:** HTTP 200
  - **Attempt 3 of 3 - V1 Retrieve after Void:** HTTP 409

### TC-VOIDTPN-POS-02 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify V2 Void succeeds for a TravelportNdc booking ticketed the same calendar day.
- **Category:** Positive
- **Endpoint Name:** Void (V2)
- **Request:** V2 Search &gt; FareConfirm &gt; AddPassenger &gt; Book 1 ADT (pnr 773JKY, gdsPNR HNGKWF, ticket 1572141427425) then POST api/V2/FlightBooking/Void with the real gdsPNR, surName Ibrahim, voidTickets [], then Retrieve
- **Response:** Book 200 (22.0s). Void 200 {voided:true, voidedTickets:1} in 15.3s: {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141427425","carrierCode":"QR"}],"passengersVoidedAncillaries":null,"emdTickets":{}}. Retrieve: 409 NDC-INT-BYP-A0003.
- **Expected:** HTTP 2xx with Void succeeded and the voided tickets listed; V2-only fields (passengersVoidedAncillaries, emdTickets) present and empty for a no-ancillary booking. Reference contract = SabreNdc Void observed 2026-10-22: {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]}, V2 also passengersVoidedAncillaries[] and emdTickets[]; SPEC §2.15 still marks the shape UNKNOWN, so record the TravelportNdc shape as its own baseline.
- **Actual:** V2 Void succeeds: 200 voided=true, the ticket listed as Voided, V2-only fields passengersVoidedAncillaries and emdTickets present. emdTickets is {} but passengersVoidedAncillaries is null instead of an empty collection (logged under TC-VOIDTPN-VAL-10 / BUG-06, not repeated here). Same contract as Round 1.
- **Status:** PASS
- **Evidence:** V2 success contract = V1 contract + passengersVoidedAncillaries (null) + emdTickets ({}).

  - **Attempt 1 of 3 - V2 Book:** HTTP 200
  - **Attempt 2 of 3 - V2 Void straight after Book:** HTTP 200
  - **Attempt 3 of 3 - V2 Retrieve after Void:** HTTP 409

### TC-VOIDTPN-POS-03 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void succeeds for a TravelportNdc booking ticketed via Hold then BookAfterHold on the same day.
- **Category:** Positive
- **Endpoint Name:** Hold &gt; BookAfterHold &gt; Void (V1 + V2)
- **Request:** On each version: Search &gt; FareConfirm &gt; (V2: AddPassenger &gt;) Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void (surName Ibrahim, voidTickets []) &gt; Retrieve, 1 ADT, distinct offers per case
- **Response:** V1: Hold 775WP7 (expires 2026-11-02T21:59:00Z) &gt; BookAfterHold ticket 1572141602501 (22.3s) &gt; Void 200 {voided:true, voidedTickets:1} (11.6s) &gt; Retrieve 409. V2: Hold 775RZB (expires 2026-11-02T21:59:00+02:00) &gt; BookAfterHold ticket 1572141602500 (20.3s) &gt; Void 200 {voided:true, voidedTickets:1} (11.9s) &gt; Retrieve 409
- **Expected:** HTTP 2xx with the same success shape as POS-01/02 (per version). pnr/gdsPNR/bookingToken unchanged since Hold (same-PNR invariant), and Void behaves identically for a booking that started as a Hold.
- **Actual:** Both versions: Hold 200 with a holdExpirationDate, PnrReprice 200, BookAfterHold 200 issuing a ticket under the same pnr, gdsPNR and bookingToken (same-PNR invariant holds), and Void then succeeds exactly as for a direct Book. voidCapability is FullVoidOnlyAllowed on BookAfterHold and on the ticketed Retrieve but ABSENT on Hold, PnrReprice and the held Retrieve (logged under TC-VOIDTPN-BIZ-05). The void window is measured from BookAfterHold: ticketing was seconds after Hold in this run, so the two timestamps are not distinguishable in a same-session test.
- **Status:** PASS
- **Evidence:** IDs unchanged across Hold &gt; BookAfterHold on both versions; post-Void Retrieve 409 on both.

  - **Attempt 1 of 14 - V1 Hold:** HTTP 200
  - **Attempt 2 of 14 - V1 FareConfirmAfterHold (PnrReprice):** HTTP 200
  - **Attempt 3 of 14 - V1 Retrieve (held):** HTTP 200
  - **Attempt 4 of 14 - V1 BookAfterHold:** HTTP 200
  - **Attempt 5 of 14 - V1 Retrieve (ticketed):** HTTP 200
  - **Attempt 6 of 14 - V1 Void:** HTTP 200
  - **Attempt 7 of 14 - V1 Retrieve after Void:** HTTP 409
  - **Attempt 8 of 14 - V2 Hold:** HTTP 200
  - **Attempt 9 of 14 - V2 FareConfirmAfterHold (PnrReprice):** HTTP 200
  - **Attempt 10 of 14 - V2 Retrieve (held):** HTTP 200
  - **Attempt 11 of 14 - V2 BookAfterHold:** HTTP 200
  - **Attempt 12 of 14 - V2 Retrieve (ticketed):** HTTP 200
  - **Attempt 13 of 14 - V2 Void:** HTTP 200
  - **Attempt 14 of 14 - V2 Retrieve after Void:** HTTP 409

### TC-VOIDTPN-POS-04 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void of a multi-passenger TravelportNdc booking (ADT+CHD+INF) voids every ticket on the PNR.
- **Category:** Positive
- **Endpoint Name:** Void multi-passenger booking (V1 + V2)
- **Request:** On each version a 3-passenger TravelportNdc booking (1 ADT + 1 CHD + 1 INF, 3 tickets), then Void with voidTickets [], then Retrieve
- **Response:** V1 773BC8: 3 tickets 1572141602408,1572141602407,1572141602409; Void 200 {voided:true, voidedTickets:3} (15.4s) voidedTickets 1572141602408,1572141602407,1572141602409; Retrieve after: 409. V2 773PAP: 3 tickets 1572141602411,1572141602410,1572141602412; Void 200 {voided:true, voidedTickets:3} (15.9s) voidedTickets 1572141602411,1572141602410,1572141602412; Retrieve after: 409
- **Expected:** Void succeeds; voidedTickets lists all 3 tickets (including the infant ticket); Retrieve shows every ticket in a voided state - none left active. Exact voided-state signal UNKNOWN (see TC-VOIDTPN-INT-02).
- **Actual:** voidTickets=[] voids every ticket on the PNR: all 3 tickets (including the infant ticket) listed in voidedTickets on both versions, and Retrieve afterwards is the terminal 409 so no ticket is left active. Same as Round 1 on V2; V1 now behaves the same.
- **Status:** PASS
- **Evidence:** ADT+CHD+INF all voided: 3 of 3 ticket numbers in voidedTickets; 400 not needed.

  - **Attempt 1 of 8 - V1 Book (ADT+CHD+INF):** HTTP 200
  - **Attempt 2 of 8 - V1 Retrieve before Void:** HTTP 200
  - **Attempt 3 of 8 - V1 Void voidTickets=[]:** HTTP 200
  - **Attempt 4 of 8 - V1 Retrieve after Void:** HTTP 409
  - **Attempt 5 of 8 - V2 Book (ADT+CHD+INF):** HTTP 200
  - **Attempt 6 of 8 - V2 Retrieve before Void:** HTTP 200
  - **Attempt 7 of 8 - V2 Void voidTickets=[]:** HTTP 200
  - **Attempt 8 of 8 - V2 Retrieve after Void:** HTTP 409

### TC-VOIDTPN-POS-05 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with voidTickets explicitly listing every ticket number on the PNR.
- **Category:** Positive
- **Endpoint Name:** Void with voidTickets listing every ticket (V1 + V2)
- **Request:** Same 3-passenger booking per version, Void with voidTickets = [3 objects {ticketNumber, carrierCode, ticketStatus} taken from the Book response]; plus a probe with plain-string elements
- **Response:** V1 774ONW: 3 tickets 1572141427430,1572141427429,1572141602406; Void 200 {voided:true, voidedTickets:3} (15.7s) voidedTickets 1572141427430,1572141427429,1572141602406; Retrieve after: 409. V2 774KN5: 3 tickets 1572141602414,1572141602413,1572141602415; Void 200 {voided:true, voidedTickets:3} (15.4s) voidedTickets 1572141602414,1572141602413,1572141602415; Retrieve after: 409. V1 plain-string element shape: 400 1001 [{"name":"voidRequestDto","value":"The voidRequestDto field is required."},{"name":"$.voidTickets[0]","value":. V2 plain-string element shape: 400 1001 [{"name":"voidRequestDto","value":"The voidRequestDto field is required."},{"name":"$.voidTickets[0]","value":
- **Expected:** Behaves identically to voidTickets=[] (all tickets voided). Record the accepted element shape of voidTickets (plain string vs object) - SPEC §2.15 marks it UNKNOWN.
- **Actual:** Listing all 3 tickets behaves identically to [] (all 3 voided). Accepted element shape recorded: an OBJECT {ticketNumber, carrierCode, ticketStatus}; plain-string elements are rejected with a 400 (errorCode 1001) naming $.voidTickets[0] on both versions, not a 500.
- **Status:** PASS
- **Evidence:** Object elements accepted; string elements 400 with a .NET type name in the message (see VAL-07).

  - **Attempt 1 of 10 - V1 Book (ADT+CHD+INF):** HTTP 200
  - **Attempt 2 of 10 - V1 Retrieve before Void:** HTTP 200
  - **Attempt 3 of 10 - V1 Void with all 3 ticket numbers listed:** HTTP 200
  - **Attempt 4 of 10 - V1 Retrieve after Void:** HTTP 409
  - **Attempt 5 of 10 - V2 Book (ADT+CHD+INF):** HTTP 200
  - **Attempt 6 of 10 - V2 Retrieve before Void:** HTTP 200
  - **Attempt 7 of 10 - V2 Void with all 3 ticket numbers listed:** HTTP 200
  - **Attempt 8 of 10 - V2 Retrieve after Void:** HTTP 409
  - **Attempt 9 of 10 - V1 Void with plain-string ticket numbers (shape probe):** HTTP 400
  - **Attempt 10 of 10 - V2 Void with plain-string ticket numbers (shape probe):** HTTP 400

### TC-VOIDTPN-VAL-01 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate missing or empty pnr is rejected before reaching TravelportNdc.
- **Category:** Validation
- **Endpoint Name:** Void - missing or empty pnr (V1 + V2)
- **Request:** Valid TravelportNdc Void body per version on a fresh booking, with pnr omitted, then pnr "", then Retrieve of the booking
- **Response:** V1 VAL01-omit: 400 PNR is required (booking intact); V1 VAL01-empty: 400 PNR is required (booking intact). V2 VAL01-omit: 400 PNR is required (booking intact); V2 VAL01-empty: 400 PNR is required (booking intact)
- **Expected:** HTTP 400 with the standard error envelope {Status, TransactionId, ErrorCode=ValidationError, ErrorMessage, Context naming pnr}; no 500. Real booking remains ticketed (not voided).
- **Actual:** Both versions reject a missing and an empty pnr before reaching the supplier: HTTP 400 {Status 400, ErrorCode NDC-INT-TEC-A0001, Context PredicateValidator "PNR is required"}; no 500; the real booking stays ticketed. Fixed since Round 1, where V2 ignored an empty/whitespace pnr and voided the booking. The envelope carries the platform validation code NDC-INT-TEC-A0001, not the literal "ValidationError".
- **Status:** PASS
- **Evidence:** Retrieve after each call: 200, ticket Booked (booking intact); one fresh booking per variant was created and voided at cleanup.

  - **Attempt 1 of 8 - V1 Void pnr omitted:** HTTP 400
  - **Attempt 2 of 8 - V1 Retrieve after pnr omitted:** HTTP 200
  - **Attempt 3 of 8 - V2 Void pnr omitted:** HTTP 400
  - **Attempt 4 of 8 - V2 Retrieve after pnr omitted:** HTTP 200
  - **Attempt 5 of 8 - V1 Void pnr empty:** HTTP 400
  - **Attempt 6 of 8 - V1 Retrieve after pnr empty:** HTTP 200
  - **Attempt 7 of 8 - V2 Void pnr empty:** HTTP 400
  - **Attempt 8 of 8 - V2 Retrieve after pnr empty:** HTTP 200

### TC-VOIDTPN-VAL-02 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate missing or empty bookingToken is rejected.
- **Category:** Validation
- **Endpoint Name:** Void - missing or empty bookingToken (V1 + V2)
- **Request:** Valid TravelportNdc Void body per version on a fresh booking, with bookingToken omitted, then bookingToken "", then Retrieve
- **Response:** V1 VAL02-omit: 400 BookingToken is required (booking intact); V1 VAL02-empty: 400 BookingToken is required (booking intact). V2 VAL02-omit: 400 BookingToken is required (booking intact); V2 VAL02-empty: 400 BookingToken is required (booking intact)
- **Expected:** HTTP 400 ValidationError in the standard envelope; booking not voided.
- **Actual:** Both versions now reject a missing and an empty bookingToken: 400 NDC-INT-TEC-A0001 with Context "BookingToken is required"; booking not voided. Fixed since Round 1 (V2 voided the booking). NOTE: this only checks presence; a wrong, upper-cased, over-long or another booking's token is still accepted (see TC-VOIDTPN-BND-01, NEG-02).
- **Status:** PASS
- **Evidence:** Retrieve after each call: 200, ticket Booked.

  - **Attempt 1 of 8 - V1 Void bookingToken omitted:** HTTP 400
  - **Attempt 2 of 8 - V1 Retrieve after bookingToken omitted:** HTTP 200
  - **Attempt 3 of 8 - V2 Void bookingToken omitted:** HTTP 400
  - **Attempt 4 of 8 - V2 Retrieve after bookingToken omitted:** HTTP 200
  - **Attempt 5 of 8 - V1 Void bookingToken empty:** HTTP 400
  - **Attempt 6 of 8 - V1 Retrieve after bookingToken empty:** HTTP 200
  - **Attempt 7 of 8 - V2 Void bookingToken empty:** HTTP 400
  - **Attempt 8 of 8 - V2 Retrieve after bookingToken empty:** HTTP 200

### TC-VOIDTPN-VAL-03 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate whether gdsPNR is mandatory for TravelportNdc Void (empty string as in the V2 saved example).
- **Category:** Validation
- **Endpoint Name:** Void - gdsPNR empty or omitted (V1 + V2)
- **Request:** Valid TravelportNdc Void body per version with gdsPNR "" (as in the V2 saved example), then gdsPNR omitted, on fresh bookings with a real gdsPNR, then Retrieve
- **Response:** V1 VAL03-empty: 400 GdsPnr is required (booking intact); V1 VAL03-omit: 400 GdsPnr is required (booking intact). V2 VAL03-empty: 400 GdsPnr is required (booking intact); V2 VAL03-omit: 400 GdsPnr is required (booking intact)
- **Expected:** Confirm live: either (a) rejected with 400 ValidationError naming gdsPNR (mandatory for GDS-routed TravelportNdc), or (b) Void succeeds because the integration resolves the record locator from pnr/bookingToken. A 500 or a generic Travelport fault is a defect. Record which.
- **Actual:** Answer to the open SPEC 2.15 question, option (a): gdsPNR is MANDATORY for TravelportNdc on both versions. "" and omitted both give 400 NDC-INT-TEC-A0001 "GdsPnr is required"; the booking stays ticketed. No 500 and no raw Travelport fault. (SabreNdc accepted gdsPNR="".)
- **Status:** PASS
- **Evidence:** Same result as Round 1 on V2; V1 now returns the same 400 (it was masked by the 409 in Round 1).

  - **Attempt 1 of 8 - V1 Void gdsPNR empty:** HTTP 400
  - **Attempt 2 of 8 - V1 Retrieve after gdsPNR empty:** HTTP 200
  - **Attempt 3 of 8 - V2 Void gdsPNR empty:** HTTP 400
  - **Attempt 4 of 8 - V2 Retrieve after gdsPNR empty:** HTTP 200
  - **Attempt 5 of 8 - V1 Void gdsPNR omitted:** HTTP 400
  - **Attempt 6 of 8 - V1 Retrieve after gdsPNR omitted:** HTTP 200
  - **Attempt 7 of 8 - V2 Void gdsPNR omitted:** HTTP 400
  - **Attempt 8 of 8 - V2 Retrieve after gdsPNR omitted:** HTTP 200

### TC-VOIDTPN-VAL-04 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with a surName that does not match any passenger on the PNR is rejected.
- **Category:** Validation
- **Endpoint Name:** Void - surName mismatch (V1 + V2)
- **Request:** Valid TravelportNdc Void body per version on a fresh booking (passenger surname Ibrahim) with surName "Mismatch", then with surName omitted, then Retrieve
- **Response:** V1 VAL04-wrong: 200  (VOIDED the booking); V1 VAL04-omit: 200  (VOIDED the booking). V2 VAL04-wrong: 200  (VOIDED the booking); V2 VAL04-omit: 200  (VOIDED the booking)
- **Expected:** Wrong surName: rejected with a 4xx standard envelope, booking not voided (SPEC §2.15 Common Errors). Omitted surName: confirm live whether mandatory for TravelportNdc and record the result.
- **Actual:** surName is not validated on either version. A surname that matches no passenger ("Mismatch") and a missing surName both return 200 voided:true and the ticket is voided (Retrieve 409). Expected a 4xx with the booking left ticketed. High: a caller that knows only a PNR can void a booking. Same defect as Round 1 on V2 and SabreNdc 2026-10-22; V1 now shows it too because V1 Void now works.
- **Status:** FAIL
- **Evidence:** V1 wrong surname: ticket 1572141602475 voided; V2 wrong surname: ticket 1572141602427 voided; omitted surname also voided on both (4 bookings consumed, voided by the test).

  - **Attempt 1 of 8 - V1 Void surName "Mismatch":** HTTP 200
  - **Attempt 2 of 8 - V1 Retrieve after surName "Mismatch":** HTTP 409
  - **Attempt 3 of 8 - V2 Void surName "Mismatch":** HTTP 200
  - **Attempt 4 of 8 - V2 Retrieve after surName "Mismatch":** HTTP 409
  - **Attempt 5 of 8 - V1 Void surName omitted:** HTTP 200
  - **Attempt 6 of 8 - V1 Retrieve after surName omitted:** HTTP 409
  - **Attempt 7 of 8 - V2 Void surName omitted:** HTTP 200
  - **Attempt 8 of 8 - V2 Retrieve after surName omitted:** HTTP 409

### TC-VOIDTPN-VAL-05 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate missing supplier or credentialsSelector is rejected.
- **Category:** Validation
- **Endpoint Name:** Void - missing supplier or credentialsSelector (V1 + V2)
- **Request:** Valid TravelportNdc Void body per version with supplier omitted, then credentialsSelector omitted, on fresh bookings, then Retrieve
- **Response:** V1 VAL05-nosup: 400 Select a valid Supplier (booking intact); V1 VAL05-nocs: 400 Select a valid CredentialsSelector (booking intact). V2 VAL05-nosup: 400 Select a valid Supplier (booking intact); V2 VAL05-nocs: 400 Select a valid CredentialsSelector (booking intact)
- **Expected:** HTTP 400 ValidationError naming the missing field; no default supplier/selector silently applied; booking not voided.
- **Actual:** Both versions: HTTP 400 {status, errorCode "1001", errorMessage "Validation errors occurred...", context [{name "Supplier", value "Select a valid Supplier"}]} and the same naming CredentialsSelector; no default supplier or selector is applied; booking not voided. Note this 400 uses the camelCase 1001 envelope while the pnr/bookingToken 400s use the PascalCase NDC-INT-TEC-A0001 envelope (see NEG-05).
- **Status:** PASS
- **Evidence:** Retrieve after each call: 200, ticket Booked.

  - **Attempt 1 of 8 - V1 Void supplier omitted:** HTTP 400
  - **Attempt 2 of 8 - V1 Retrieve after supplier omitted:** HTTP 200
  - **Attempt 3 of 8 - V2 Void supplier omitted:** HTTP 400
  - **Attempt 4 of 8 - V2 Retrieve after supplier omitted:** HTTP 200
  - **Attempt 5 of 8 - V1 Void credentialsSelector omitted:** HTTP 400
  - **Attempt 6 of 8 - V1 Retrieve after credentialsSelector omitted:** HTTP 200
  - **Attempt 7 of 8 - V2 Void credentialsSelector omitted:** HTTP 400
  - **Attempt 8 of 8 - V2 Retrieve after credentialsSelector omitted:** HTTP 200

### TC-VOIDTPN-VAL-06 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate voidTickets of the wrong type (string, null, number elements) is rejected.
- **Category:** Validation
- **Endpoint Name:** Void - voidTickets of the wrong type (V1 + V2)
- **Request:** Valid TravelportNdc Void body per version with voidTickets set to the string "1572134824863", null, [123] and omitted entirely, each on a fresh booking, then Retrieve
- **Response:** V1 VAL06-string: 400 The voidRequestDto field is required. / The JSON value could not be converted to System.Collections.Generic.ICollection`1[NDC.Integrations.A (booking intact); V1 VAL06-null: 400 The VoidTickets field is required. (booking intact); V1 VAL06-num: 400 The voidRequestDto field is required. / The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketTyp (booking intact); V1 VAL06-omit: 200  (VOIDED the booking). V2 VAL06-string: 400 The voidRequestDto field is required. / The JSON value could not be converted to System.Collections.Generic.ICollection`1[NDC.Integrations.A (booking intact); V2 VAL06-null: 400 The VoidTickets field is required. (booking intact); V2 VAL06-num: 400 The voidRequestDto field is required. / The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketTyp (booking intact); V2 VAL06-omit: 200  (VOIDED the booking)
- **Expected:** Wrong-type variants: HTTP 400 ValidationError naming voidTickets, not 500; booking not voided. Omitted/null voidTickets: confirm live whether treated as void-all or rejected, and record it.
- **Actual:** String and [123]: 400 errorCode 1001 naming $.voidTickets / $.voidTickets[0], not a 500, booking intact. null: 400 "The VoidTickets field is required.", booking intact. Omitted: treated as void-all (both versions void the ticket), which is the answer to "omitted: confirm live". Observation: null is rejected while an omitted field voids everything, an inconsistent pair worth a decision. The type-name text in the 400 is logged under VAL-07.
- **Status:** PASS
- **Evidence:** Omitted voidTickets: V1 ticket 1572141602442 and V2 ticket 1572141602440 voided (void-all).

  - **Attempt 1 of 16 - V1 Void voidTickets string:** HTTP 400
  - **Attempt 2 of 16 - V1 Retrieve after voidTickets string:** HTTP 200
  - **Attempt 3 of 16 - V2 Void voidTickets string:** HTTP 400
  - **Attempt 4 of 16 - V2 Retrieve after voidTickets string:** HTTP 200
  - **Attempt 5 of 16 - V1 Void voidTickets null:** HTTP 400
  - **Attempt 6 of 16 - V1 Retrieve after voidTickets null:** HTTP 200
  - **Attempt 7 of 16 - V2 Void voidTickets null:** HTTP 400
  - **Attempt 8 of 16 - V2 Retrieve after voidTickets null:** HTTP 200
  - **Attempt 9 of 16 - V1 Void voidTickets [123]:** HTTP 400
  - **Attempt 10 of 16 - V1 Retrieve after voidTickets [123]:** HTTP 200
  - **Attempt 11 of 16 - V2 Void voidTickets [123]:** HTTP 400
  - **Attempt 12 of 16 - V2 Retrieve after voidTickets [123]:** HTTP 200
  - **Attempt 13 of 16 - V1 Void voidTickets omitted:** HTTP 200
  - **Attempt 14 of 16 - V1 Retrieve after voidTickets omitted:** HTTP 409
  - **Attempt 15 of 16 - V2 Void voidTickets omitted:** HTTP 200
  - **Attempt 16 of 16 - V2 Retrieve after voidTickets omitted:** HTTP 409

### TC-VOIDTPN-VAL-07 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify the Void response follows the integration contract and does not expose raw TravelportNdc payloads.
- **Category:** Validation
- **Endpoint Name:** Void - response contract and raw payloads (V1 + V2)
- **Request:** Success bodies from POS-01/02 and failing Void responses from BIZ-02, NEG-01 and VAL-06 inspected field by field
- **Response:** Success bodies contain only integration fields ({voided, voidedTickets[]} and V2 passengersVoidedAncillaries, emdTickets). Failures: 409 bodies for a repeat Void and for an unknown PNR carry extra top-level fields OriginalSupplierRequest ("HNGKWF" / "ZZZZZZ") and OriginalSupplierResponse (the raw Travelport ReservationResponse JSON, ~250 chars on the cancelled case); the 400s for a wrong-typed voidTickets quote .NET type names ("System.Collections.Generic.ICollection`1[NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType]" and "...Dtos.Api.SharedTypes.TicketType") with line/byte positions.
- **Expected:** Success: integration-defined fields only (shape recorded as baseline, same field names and types as the existing contract). Failure: standard envelope {Status, TransactionId, ErrorCode, ErrorMessage, Context}, Status equal to the HTTP code, TransactionId a GUID. No raw Travelport payload, no credentials, no DTO type names in Context.
- **Actual:** The success contract is clean, but failures break the integration contract: the raw supplier request and response are echoed in the error body (409, both versions) and internal DTO type names plus parser positions are exposed in the 400 (both versions). No credentials or PCC values were seen in these Void bodies. Same defect as Round 1 (BUG-05); the 409 envelope field names are Status/TransactionId/ErrorCode/ErrorMessage/Context as documented, plus the two extra raw fields.
- **Status:** FAIL
- **Evidence:** Fields: OriginalSupplierRequest, OriginalSupplierResponse (409); context[].value with System.* / NDC.Integrations.* names (400).

  - **Attempt 1 of 8 - V1 Void success body:** HTTP 200
  - **Attempt 2 of 8 - V2 Void success body:** HTTP 200
  - **Attempt 3 of 8 - V1 repeat Void (409):** HTTP 409
  - **Attempt 4 of 8 - V2 repeat Void (409):** HTTP 409
  - **Attempt 5 of 8 - V1 Void of unknown PNR (409):** HTTP 409
  - **Attempt 6 of 8 - V2 Void of unknown PNR (409):** HTTP 409
  - **Attempt 7 of 8 - V1 400 for voidTickets string:** HTTP 400
  - **Attempt 8 of 8 - V2 400 for voidTickets [123]:** HTTP 400

### TC-VOIDTPN-VAL-08 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify the voided ticket numbers and carrier code echo the Book response unchanged.
- **Category:** Validation
- **Endpoint Name:** Void - ticket numbers echo Book (V1 + V2)
- **Request:** voidedTickets[] of the 3-passenger Void (POS-04) compared with the Book response tickets[] of the same booking, per version
- **Response:** V1 773BC8: Book tickets 1572141602408,1572141602407,1572141602409 vs voided 1572141602408,1572141602407,1572141602409. V2 773PAP: Book 1572141602411,1572141602410,1572141602412 vs voided 1572141602411,1572141602410,1572141602412
- **Expected:** Same ticket numbers (no truncation, no re-formatting), same carrierCode (QR in the 2026-08-05 run), count equals the passenger count; every ticketStatus is a voided value, none still 'Booked'.
- **Actual:** On both versions the three ticket numbers and the carrier code (QR) are identical field for field (no truncation, no re-formatting), the count equals the passenger count (3) and every ticketStatus is "Voided"; none still "Booked".
- **Status:** PASS
- **Evidence:** V1 same=true count=3; V2 same=true count=3; all Voided

  - **Attempt 1 of 4 - V1 Book:** HTTP 200
  - **Attempt 2 of 4 - V1 Void:** HTTP 200
  - **Attempt 3 of 4 - V2 Book:** HTTP 200
  - **Attempt 4 of 4 - V2 Void:** HTTP 200

### TC-VOIDTPN-VAL-09 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify ticket numbers in the Void response are unique with no duplicated entries.
- **Category:** Validation
- **Endpoint Name:** Void - unique ticket numbers (V1 + V2)
- **Request:** voidedTickets[] from POS-04 (voidTickets []) and POS-05 (all listed) on both versions
- **Response:** p4_V1: 3 entries, duplicates false; p4_V2: 3 entries, duplicates false; p5_V1: 3 entries, duplicates false; p5_V2: 3 entries, duplicates false
- **Expected:** No duplicate ticketNumber; one entry per ticket; the same result whether voidTickets was [] or fully listed.
- **Actual:** No duplicated ticketNumber in any of the four responses; one entry per ticket; the same three tickets came back whether voidTickets was [] or fully listed.
- **Status:** PASS
- **Evidence:** Set size equals array length in all four responses.

  - **Attempt 1 of 4 - V1 Void [] (POS-04):** HTTP 200
  - **Attempt 2 of 4 - V1 Void listed (POS-05):** HTTP 200
  - **Attempt 3 of 4 - V2 Void [] (POS-04):** HTTP 200
  - **Attempt 4 of 4 - V2 Void listed (POS-05):** HTTP 200

### TC-VOIDTPN-VAL-10 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify V2 Void returns empty passengersVoidedAncillaries and emdTickets for a booking without ancillaries.
- **Category:** Validation
- **Endpoint Name:** Void - empty ancillary collections (V2)
- **Request:** V2 Void response of the no-ancillary booking (POS-02) compared with the Retrieve of the same booking before the Void
- **Response:** Void: passengersVoidedAncillaries null, emdTickets {}. Retrieve before: passengersSelectedAncillaries null, emdTickets {}.
- **Expected:** Both arrays present and empty (SabreNdc baseline), consistent with Retrieve showing no ancillaries; not null, not omitted, no fabricated EMD entries.
- **Actual:** emdTickets is {} (correct) but passengersVoidedAncillaries is null, not an empty collection. The SabreNdc baseline returns {} for both, and V2 CancelAfterHold also returns passengersCancelledAncillaries null. The field is present and no EMD entries are fabricated, but "present and empty, not null" is not met. Same as Round 1 (BUG-06).
- **Status:** FAIL
- **Evidence:** passengersVoidedAncillaries: null (expected {} or []).

  - **Attempt 1 of 2 - V2 Retrieve before Void:** HTTP 200
  - **Attempt 2 of 2 - V2 Void:** HTTP 200

### TC-VOIDTPN-BND-01 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate pnr and bookingToken of whitespace-only, lowercase and over-length values are handled without a server error.
- **Category:** Boundary
- **Endpoint Name:** Void - pnr and bookingToken boundaries (V1 + V2)
- **Request:** Per version, each on a fresh booking: pnr "      ", pnr lower-cased, pnr of 256 characters; bookingToken "      ", bookingToken upper-cased, bookingToken of 1000 characters; Retrieve after each
- **Response:** V1 BND01-pnr-ws: 400 PNR is required (booking intact); V1 BND01-pnr-lower: 200  (VOIDED the booking); V1 BND01-pnr-256: 400 Maximum length of a PNR is 9 characters (booking intact); V1 BND01-tok-ws: 400 BookingToken is required (booking intact); V1 BND01-tok-upper: 200  (VOIDED the booking); V1 BND01-tok-1000: 200  (VOIDED the booking). V2 BND01-pnr-ws: 400 PNR is required (booking intact); V2 BND01-pnr-lower: 200  (VOIDED the booking); V2 BND01-pnr-256: 400 Maximum length of a PNR is 9 characters (booking intact); V2 BND01-tok-ws: 400 BookingToken is required (booking intact); V2 BND01-tok-upper: 200  (VOIDED the booking); V2 BND01-tok-1000: 200  (VOIDED the booking)
- **Expected:** Whitespace-only and over-length: HTTP 400 ValidationError, never 500. Case variants: record whether the PNR lookup is case-insensitive; a lowercased real pnr voiding the booking is acceptable only if documented, otherwise note it.
- **Actual:** pnr: whitespace-only is now a 400 ("PNR is required", fixed since Round 1) and 256 characters is a 400 ("Maximum length of a PNR is 9 characters"), both with the booking intact; the lower-cased real pnr is accepted and voids the booking (lookup is by gdsPNR so the pnr text is not compared, record as an undocumented behaviour). bookingToken: whitespace-only is a 400, but an upper-cased token and a 1000-character token are accepted and void the booking on both versions. Expected a 400 for the over-length token and a token match; the token is only checked for presence (BUG-03).
- **Status:** FAIL
- **Evidence:** Over-length 1000-character bookingToken voided V1 ticket 1572141602452 and V2 ticket 1572141602487. No 500 anywhere.

  - **Attempt 1 of 24 - V1 Void pnr-ws:** HTTP 400
  - **Attempt 2 of 24 - V1 Retrieve after pnr-ws:** HTTP 200
  - **Attempt 3 of 24 - V2 Void pnr-ws:** HTTP 400
  - **Attempt 4 of 24 - V2 Retrieve after pnr-ws:** HTTP 200
  - **Attempt 5 of 24 - V1 Void pnr-lower:** HTTP 200
  - **Attempt 6 of 24 - V1 Retrieve after pnr-lower:** HTTP 409
  - **Attempt 7 of 24 - V2 Void pnr-lower:** HTTP 200
  - **Attempt 8 of 24 - V2 Retrieve after pnr-lower:** HTTP 409
  - **Attempt 9 of 24 - V1 Void pnr-256:** HTTP 400
  - **Attempt 10 of 24 - V1 Retrieve after pnr-256:** HTTP 200
  - **Attempt 11 of 24 - V2 Void pnr-256:** HTTP 400
  - **Attempt 12 of 24 - V2 Retrieve after pnr-256:** HTTP 200
  - **Attempt 13 of 24 - V1 Void tok-ws:** HTTP 400
  - **Attempt 14 of 24 - V1 Retrieve after tok-ws:** HTTP 200
  - **Attempt 15 of 24 - V2 Void tok-ws:** HTTP 400
  - **Attempt 16 of 24 - V2 Retrieve after tok-ws:** HTTP 200
  - **Attempt 17 of 24 - V1 Void tok-upper:** HTTP 200
  - **Attempt 18 of 24 - V1 Retrieve after tok-upper:** HTTP 409
  - **Attempt 19 of 24 - V2 Void tok-upper:** HTTP 200
  - **Attempt 20 of 24 - V2 Retrieve after tok-upper:** HTTP 409
  - **Attempt 21 of 24 - V1 Void tok-1000:** HTTP 200
  - **Attempt 22 of 24 - V1 Retrieve after tok-1000:** HTTP 409
  - **Attempt 23 of 24 - V2 Void tok-1000:** HTTP 200
  - **Attempt 24 of 24 - V2 Retrieve after tok-1000:** HTTP 409

### TC-VOIDTPN-BND-02 — BLOCKED

- **Test Case:** [TravelportNdc][Void][Request] Validate the calendar-day boundary: Void just before midnight is accepted and just after midnight is rejected.
- **Category:** Boundary
- **Endpoint Name:** Void - calendar-day cut-off
- **Request:** Not sent: needs two bookings ticketed on day D and a Void just before and just after midnight in the reference time zone
- **Response:** No request sent
- **Expected:** #1 voided successfully; #2 rejected with the same error as TC-VOIDTPN-BIZ-01. A wrong time-zone basis shows as #1 rejected or #2 accepted - record the effective boundary.
- **Actual:** Not run. The session is on 2026-10-27 (about 09:55 local, 06:55 UTC); a midnight crossing is not possible inside one working session and the reference time zone for the Travelport cut-off is still an open question. Same block as Round 1.
- **Status:** BLOCKED
- **Evidence:** Run exploratorily across midnight, or confirm the cut-off rule with the dev team first. BIZ-01 (aged ticket) is the alternative way to learn the boundary.

### TC-VOIDTPN-BIZ-01 — BLOCKED

- **Test Case:** [TravelportNdc][Void][Response] Verify Void is rejected for a TravelportNdc booking ticketed on a previous calendar day.
- **Category:** Business Rule
- **Endpoint Name:** Void - ticket from a previous calendar day
- **Request:** Not sent: needs a TravelportNdc/UAE booking ticketed on an earlier day
- **Response:** No request sent
- **Expected:** Void rejected with a business-rule error in the standard envelope (exact HTTP status/ErrorCode UNKNOWN - record); booking stays ticketed. voidCapability, if returned, already indicates void not allowed. If Void succeeds on an aged ticket, the void window is not calendar-day - report it for confirmation.
- **Actual:** Not run. No ticketed TravelportNdc booking from a previous day exists: every booking from Round 1 (2026-10-26) and from the 2026-10-22 and 2026-08-05 runs was voided or no longer exists at Travelport (9DV4S9 and 9DV2WY were already gone in Round 1). Every booking made today is same-day.
- **Status:** BLOCKED
- **Evidence:** To run this on 2026-10-28, leave two ticketed bookings (one per version) unvoided overnight and rerun BIZ-01 and BIZ-05 (aged branch) against them. Not done this round because the run voids all bookings at cleanup; say if you want them left.

### TC-VOIDTPN-BIZ-02 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify a second Void on an already-voided TravelportNdc booking is rejected.
- **Category:** Business Rule
- **Endpoint Name:** Void - repeat Void of a voided booking (V1 + V2)
- **Request:** Per version: the successful Void from POS-01/02 resent unchanged, resent again after 30 seconds, then Retrieve
- **Response:** V1 774MNY: second 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}] (2.3s), third after 30s 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}], Retrieve 409. V2 773JKY: second 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}] (3.0s), third after 30s 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}], Retrieve 409
- **Expected:** Second Void rejected with a 4xx standard envelope (already voided; exact code UNKNOWN - record); no 500; booking state unchanged; no duplicate voided entries.
- **Actual:** A repeat Void is rejected on both versions with a 4xx standard envelope: 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." (TERMINAL: RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)); identical on the 30-second retry; no 500, no duplicate voided entries, state unchanged. Void is therefore NOT idempotent (it is not a 2xx no-op), the opposite of SabreNdc (BUG-04). The 409 body still carries the raw supplier payload (logged under VAL-07).
- **Status:** PASS
- **Evidence:** second/third Void 409 BYP-A0003 on V1 and V2; Retrieve 409.

  - **Attempt 1 of 8 - V1 first Void (success):** HTTP 200
  - **Attempt 2 of 8 - V1 second Void (immediately):** HTTP 409
  - **Attempt 3 of 8 - V1 third Void (after 30s):** HTTP 409
  - **Attempt 4 of 8 - V1 Retrieve:** HTTP 409
  - **Attempt 5 of 8 - V2 first Void (success):** HTTP 200
  - **Attempt 6 of 8 - V2 second Void (immediately):** HTTP 409
  - **Attempt 7 of 8 - V2 third Void (after 30s):** HTTP 409
  - **Attempt 8 of 8 - V2 Retrieve:** HTTP 409

### TC-VOIDTPN-BIZ-03 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void is rejected for a held, unticketed TravelportNdc booking.
- **Category:** Business Rule
- **Endpoint Name:** Void - held, unticketed booking (V1 + V2)
- **Request:** Per version: Search &gt; FareConfirm &gt; (V2: AddPassenger &gt;) Hold, then Void with the Hold ids, then Retrieve, then CancelAfterHold to clean up
- **Response:** V1 775XLR: Void 409 NDC-INT-UNC-Z9999 Context BUSINESS_CONFLICT "This booking is on hold and not ticketed. Cancel it with the cancel hold flow instead of voiding it." (4.3s); Retrieve 200 tickets none, hold 2026-11-02T21:59:00. V2 7762AJ: Void 409 NDC-INT-UNC-Z9999 Context BUSINESS_CONFLICT "This booking is on hold and not ticketed. Cancel it with the cancel hold flow instead of voiding it." (4.2s); Retrieve 200 OnHold, hold 2026-11-02T21:59:00+02:00
- **Expected:** Void rejected as not eligible (no tickets) in the standard envelope; booking stays held. If Void cancels the hold instead, record it as a behavior to confirm with the team (CancelAfterHold is the documented path for holds, §2.14).
- **Actual:** Void of a held booking is now rejected on both versions: 409 {ErrorCode NDC-INT-UNC-Z9999, Context BUSINESS_CONFLICT "This booking is on hold and not ticketed. Cancel it with the cancel hold flow instead of voiding it."}; the booking stays held (Retrieve 200, no tickets, holdExpirationDate unchanged; V2 bookingStatus OnHold) and CancelAfterHold remains the documented way out. Fixed since Round 1, when V2 returned 200 voided:false and silently cancelled the hold. Remaining flaw: the code is the unmapped Z9999 with ErrorMessage equal to the code (see NEG-05).
- **Status:** PASS
- **Evidence:** Held booking intact after the refused Void on both versions.

  - **Attempt 1 of 8 - V1 Hold:** HTTP 200
  - **Attempt 2 of 8 - V1 Void of the held booking:** HTTP 409
  - **Attempt 3 of 8 - V1 Retrieve after the Void:** HTTP 200
  - **Attempt 4 of 8 - V1 CancelAfterHold (cleanup):** HTTP 200
  - **Attempt 5 of 8 - V2 Hold:** HTTP 200
  - **Attempt 6 of 8 - V2 Void of the held booking:** HTTP 409
  - **Attempt 7 of 8 - V2 Retrieve after the Void:** HTTP 200
  - **Attempt 8 of 8 - V2 CancelAfterHold (cleanup):** HTTP 200

### TC-VOIDTPN-BIZ-04 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void is rejected for a TravelportNdc hold already cancelled via CancelAfterHold.
- **Category:** Business Rule
- **Endpoint Name:** Void - cancelled hold (V1 + V2)
- **Request:** Per version: Hold &gt; CancelAfterHold &gt; Void on the same ids &gt; Retrieve
- **Response:** V1 775462: Cancel 200 {voided:undefined, voidedTickets:0}; Void 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}] (1.9s); Retrieve 409. V2 776567: Cancel 200 {voided:undefined, voidedTickets:0}; Void 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}] (1.9s); Retrieve 409
- **Expected:** Rejected with a 4xx standard envelope (comparable to Retrieve's 409 NDC-INT-BYP-A0003 'Reservation is already cancelled'); no 500.
- **Actual:** CancelAfterHold returns {cancelled:true, message:"Reservation cancelled successfully."}; the following Void is rejected with 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." on both versions, the same code Retrieve gives for a cancelled reservation; no 500.
- **Status:** PASS
- **Evidence:** Void after Cancel 409 BYP-A0003 on V1 and V2.

  - **Attempt 1 of 8 - V1 Hold:** HTTP 200
  - **Attempt 2 of 8 - V1 CancelAfterHold:** HTTP 200
  - **Attempt 3 of 8 - V1 Void after the cancel:** HTTP 409
  - **Attempt 4 of 8 - V1 Retrieve:** HTTP 409
  - **Attempt 5 of 8 - V2 Hold:** HTTP 200
  - **Attempt 6 of 8 - V2 CancelAfterHold:** HTTP 200
  - **Attempt 7 of 8 - V2 Void after the cancel:** HTTP 409
  - **Attempt 8 of 8 - V2 Retrieve:** HTTP 409

### TC-VOIDTPN-BIZ-05 — FAIL

- **Test Case:** [TravelportNdc][Book]&amp;[Void] [Response] Verify voidCapability is consistent with the actual Void outcome.
- **Category:** Business Rule
- **Endpoint Name:** Book / Retrieve / Void - voidCapability consistency (V1 + V2)
- **Request:** voidCapability read from Book, Retrieve-before-Void, BookAfterHold, Hold, PnrReprice and the held Retrieve (POS-01/02/03 bookings), compared with each Void outcome
- **Response:** Ticketed same-day booking: Book, Retrieve and BookAfterHold all return voidCapability FullVoidOnlyAllowed on V1 and V2, and Void then succeeds: flag and outcome agree. After the Void, Retrieve is the terminal 409, so no flag is returned. Held booking: Hold, PnrReprice and Retrieve of the held booking return NO voidCapability key on V1 and V2, while Void is refused for that booking (BIZ-03).
- **Expected:** Allowed value before same-day Void -&gt; Void succeeded; VoidNotAllowed (or equivalent) on an aged ticket -&gt; Void rejected; after a successful Void, voidCapability no longer reports void allowed. Any disagreement between flag and outcome is a defect. A field that is absent everywhere is itself a recurrence of the missing-voidCapability defect.
- **Actual:** Improved since Round 1 (flag was absent everywhere): the flag is now present and consistent for ticketed bookings. It is still missing on every held-booking response, where a "void not allowed" value is exactly what a caller needs (SabreNdc returns VoidNotAllowed on Hold). The aged-ticket branch (VoidNotAllowed after the calendar day) could not be exercised because BIZ-01 is blocked. Failing on the held-booking omission (BUG-01, narrowed).
- **Status:** FAIL
- **Evidence:** Absent: Hold.voidCapability, PnrReprice.voidCapability, Retrieve(held).voidCapability on V1 and V2. Present: Book, Retrieve(ticketed), BookAfterHold = FullVoidOnlyAllowed.

  - **Attempt 1 of 12 - V1 Book (voidCapability):** HTTP 200
  - **Attempt 2 of 12 - V1 Retrieve before Void:** HTTP 200
  - **Attempt 3 of 12 - V1 Void:** HTTP 200
  - **Attempt 4 of 12 - V1 Hold (flag absent):** HTTP 200
  - **Attempt 5 of 12 - V1 Retrieve of the held booking (flag absent):** HTTP 200
  - **Attempt 6 of 12 - V1 BookAfterHold:** HTTP 200
  - **Attempt 7 of 12 - V2 Book (voidCapability):** HTTP 200
  - **Attempt 8 of 12 - V2 Retrieve before Void:** HTTP 200
  - **Attempt 9 of 12 - V2 Void:** HTTP 200
  - **Attempt 10 of 12 - V2 Hold (flag absent):** HTTP 200
  - **Attempt 11 of 12 - V2 Retrieve of the held booking (flag absent):** HTTP 200
  - **Attempt 12 of 12 - V2 BookAfterHold:** HTTP 200

### TC-VOIDTPN-BIZ-06 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify Void with voidTickets listing only a subset of the PNR's tickets voids exactly those tickets or is rejected.
- **Category:** Business Rule
- **Endpoint Name:** Void - subset of tickets (V1 + V2)
- **Request:** Per version: 3-passenger booking (ADT+CHD+INF), Void with voidTickets = [the first (ADT) ticket as an object], then Retrieve
- **Response:** V1 7746DZ: voidTickets listed only 1572141602417; Void 200 {voided:true, voidedTickets:3} voidedTickets 1572141602417,1572141602416,1572141602418; Retrieve after 409. V2 773AYB: voidTickets listed only 1572141602420; Void 200 {voided:true, voidedTickets:3} voidedTickets 1572141602420,1572141602419,1572141602421; Retrieve after 409
- **Expected:** Either (a) only the listed ticket is voided and the others stay Booked, with voidedTickets listing exactly one entry, or (b) the request is rejected with a 4xx stating partial void is unsupported. Silently voiding all tickets, or voiding none while returning voided=true, is a defect.
- **Actual:** The list is ignored on both versions: all 3 tickets (ADT, CHD and INF) are voided and returned, not the one that was asked for. Neither allowed outcome happened (voiding only the listed ticket, or rejecting a partial void). Same as Round 1 on V2 (BUG-09); V1 now shows it too.
- **Status:** FAIL
- **Evidence:** Requested 1 ticket, 3 voided on each version.

  - **Attempt 1 of 8 - V1 Book (ADT+CHD+INF):** HTTP 200
  - **Attempt 2 of 8 - V1 Retrieve before:** HTTP 200
  - **Attempt 3 of 8 - V1 Void with voidTickets = [ADT ticket only]:** HTTP 200
  - **Attempt 4 of 8 - V1 Retrieve after:** HTTP 409
  - **Attempt 5 of 8 - V2 Book (ADT+CHD+INF):** HTTP 200
  - **Attempt 6 of 8 - V2 Retrieve before:** HTTP 200
  - **Attempt 7 of 8 - V2 Void with voidTickets = [ADT ticket only]:** HTTP 200
  - **Attempt 8 of 8 - V2 Retrieve after:** HTTP 409

### TC-VOIDTPN-BIZ-07 — PASS

- **Test Case:** [TravelportNdc][Void]&amp;[BookAfterHold] [Response] Verify CancelAfterHold and BookAfterHold on a voided TravelportNdc booking are rejected and Retrieve reports the voided state.
- **Category:** Business Rule
- **Endpoint Name:** CancelAfterHold / BookAfterHold on a voided booking (V1 + V2)
- **Request:** On the Hold &gt; BookAfterHold &gt; Void booking from POS-03: CancelAfterHold, BookAfterHold, Retrieve, per version
- **Response:** V1 775WP7: CancelAfterHold 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]; BookAfterHold 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]; Retrieve 409. V2 775RZB: CancelAfterHold 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]; BookAfterHold 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]; Retrieve 409
- **Expected:** CancelAfterHold and BookAfterHold are rejected with 4xx standard envelopes (no 500, no second ticketing); Retrieve returns the voided state consistent with TC-VOIDTPN-INT-02.
- **Actual:** All three calls are rejected on both versions with 409 NDC-INT-BYP-A0003 "Reservation is already cancelled."; no second ticketing, no 500, and Retrieve confirms the terminal state (consistent with INT-02). A stale BookAfterHold cannot re-ticket a voided PNR.
- **Status:** PASS
- **Evidence:** BookAfterHold on the voided PNR: 409 on V1 and V2.

  - **Attempt 1 of 8 - V1 Void (from POS-03):** HTTP 200
  - **Attempt 2 of 8 - V1 CancelAfterHold on the voided booking:** HTTP 409
  - **Attempt 3 of 8 - V1 BookAfterHold on the voided booking:** HTTP 409
  - **Attempt 4 of 8 - V1 Retrieve:** HTTP 409
  - **Attempt 5 of 8 - V2 Void (from POS-03):** HTTP 200
  - **Attempt 6 of 8 - V2 CancelAfterHold on the voided booking:** HTTP 409
  - **Attempt 7 of 8 - V2 BookAfterHold on the voided booking:** HTTP 409
  - **Attempt 8 of 8 - V2 Retrieve:** HTTP 409

### TC-VOIDTPN-NEG-01 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify Void with a non-existent pnr returns a mapped error, not a server error.
- **Category:** Negative
- **Endpoint Name:** Void - non-existent pnr (V1 + V2)
- **Request:** POST Void on each version with pnr ZZZZZZ, gdsPNR ZZZZZZ, a random bookingToken, surName Test, voidTickets []
- **Response:** V1 409 NDC-INT-UNC-Z9999 [{"Name":"VALIDATION","Value":"RECORD LOCATOR DOES NOT EXIST"}] (0.8s); V2 409 NDC-INT-UNC-Z9999 [{"Name":"VALIDATION","Value":"RECORD LOCATOR DOES NOT EXIST"}] (0.8s). Body: {Status 409, ErrorCode "NDC-INT-UNC-Z9999", ErrorMessage "NDC-INT-UNC-Z9999", Context [{Name "VALIDATION", Value "RECORD LOCATOR DOES NOT EXIST"}], OriginalSupplierRequest "ZZZZZZ", OriginalSupplierResponse &lt;raw Travelport ReservationResponse&gt;}
- **Expected:** 4xx in the standard envelope with a meaningful ErrorCode/ErrorMessage (booking not found); never 500 or an unhandled Travelport fault; Context does not echo the raw Travelport response.
- **Actual:** A 4xx, not a 500, and the meaning is recoverable from Context, but the mapping is poor on both versions: the code is the generic unmapped NDC-INT-UNC-Z9999, ErrorMessage just repeats the code, and the raw Travelport request and response are echoed. There is no "booking not found" code or message. Same as Round 1 (BUG-10) and SabreNdc 2026-10-22.
- **Status:** FAIL
- **Evidence:** ErrorMessage == ErrorCode == NDC-INT-UNC-Z9999; OriginalSupplierRequest ZZZZZZ present.

  - **Attempt 1 of 2 - V1 Void unknown pnr:** HTTP 409
  - **Attempt 2 of 2 - V2 Void unknown pnr:** HTTP 409

### TC-VOIDTPN-NEG-02 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with a bookingToken from a different TravelportNdc booking is rejected.
- **Category:** Negative
- **Endpoint Name:** Void - bookingToken from a different booking (V1 + V2)
- **Request:** Per version: booking A (fresh, ticketed) Void with A's pnr/gdsPNR and the bookingToken of booking B (oth_ booking, same day), then Retrieve A
- **Response:** V1 NEG02-mixtoken: 200 voided=true (VOIDED the booking). V2 NEG02-mixtoken: 200 voided=true (VOIDED the booking)
- **Expected:** Rejected with a 4xx standard envelope; neither A nor B voided.
- **Actual:** Not rejected on either version: A is voided although the token belongs to another booking (Retrieve A: 409 cancelled). The bookingToken is not matched to the PNR (BUG-03). Booking B was not touched (it stayed ticketed until cleanup). Note the 2 duplicate-token pairs found this round (BUG-13) make a token match even less meaningful today.
- **Status:** FAIL
- **Evidence:** V1 A=ticket 1572141602453 voided, V2 A=1572141602488 voided; B intact.

  - **Attempt 1 of 4 - V1 Void with another booking's token:** HTTP 200
  - **Attempt 2 of 4 - V1 Retrieve after with another booking's token:** HTTP 409
  - **Attempt 3 of 4 - V2 Void with another booking's token:** HTTP 200
  - **Attempt 4 of 4 - V2 Retrieve after with another booking's token:** HTTP 409

### TC-VOIDTPN-NEG-03 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate voidTickets containing a ticket number not on the PNR is rejected.
- **Category:** Negative
- **Endpoint Name:** Void - ticket number not on the PNR (V1 + V2)
- **Request:** Per version, on fresh 1-ADT bookings: voidTickets = [fabricated ticket 1570000000000]; and voidTickets = [a real ticket number of another booking], then Retrieve
- **Response:** V1 NEG03-fab: 200 voided=true (VOIDED the booking); V1 NEG03-foreign: 200 voided=true (VOIDED the booking). V2 NEG03-fab: 200 voided=true (VOIDED the booking); V2 NEG03-foreign: 200 voided=true (VOIDED the booking)
- **Expected:** Both rejected with a 4xx standard envelope; A's and B's tickets unchanged. Must not silently void all of A's tickets, and must never void B's ticket.
- **Actual:** Neither variant is rejected on either version. Both void ALL tickets of the booking named by the gdsPNR (Retrieve 409). Another booking's ticket was never voided (the foreign booking stayed ticketed), so the cross-booking harm did not occur, but a made-up or foreign ticket number silently becomes void-all. Same as Round 1 (BUG-09) and SabreNdc BUG-02.
- **Status:** FAIL
- **Evidence:** V1 fab: ticket 1572141602451 voided; V1 foreign 1572141602454; V2 fab 1572141602450; V2 foreign 1572141602489.

  - **Attempt 1 of 8 - V1 Void fabricated ticket:** HTTP 200
  - **Attempt 2 of 8 - V1 Retrieve after fabricated ticket:** HTTP 409
  - **Attempt 3 of 8 - V2 Void fabricated ticket:** HTTP 200
  - **Attempt 4 of 8 - V2 Retrieve after fabricated ticket:** HTTP 409
  - **Attempt 5 of 8 - V1 Void foreign ticket:** HTTP 200
  - **Attempt 6 of 8 - V1 Retrieve after foreign ticket:** HTTP 409
  - **Attempt 7 of 8 - V2 Void foreign ticket:** HTTP 200
  - **Attempt 8 of 8 - V2 Retrieve after foreign ticket:** HTTP 409

### TC-VOIDTPN-NEG-04 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void with a credentialsSelector that has no TravelportNdc credentials returns the credentials error, not a generic failure.
- **Category:** Negative
- **Endpoint Name:** Void - inactive credentialsSelector (V1 + V2)
- **Request:** Void a UAE-created booking with credentialsSelector KSA (found inactive in CAPCHECK-04) on each version, then Retrieve with UAE
- **Response:** V1 NEG04-KSA: 400 The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelector' value. (booking intact). V2 NEG04-KSA: 400 The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelector' value. (booking intact)
- **Expected:** 4xx standard envelope with the 'credentials ... do not exist or are not active' message (or a cross-tenant rejection); booking not voided.
- **Actual:** Both versions: 400 NDC-INT-TEC-A0001 with Context "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelector' value."; booking not voided (Retrieve 200, ticket Booked).
- **Status:** PASS
- **Evidence:** Matches the Search/Book credentials message.

  - **Attempt 1 of 4 - V1 Void credentialsSelector KSA:** HTTP 400
  - **Attempt 2 of 4 - V1 Retrieve after credentialsSelector KSA:** HTTP 200
  - **Attempt 3 of 4 - V2 Void credentialsSelector KSA:** HTTP 400
  - **Attempt 4 of 4 - V2 Retrieve after credentialsSelector KSA:** HTTP 200

### TC-VOIDTPN-NEG-05 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify error responses for all failed Void scenarios use one consistent envelope.
- **Category:** Negative
- **Endpoint Name:** Void - error envelope consistency (V1 + V2)
- **Request:** Failure responses from VAL-01..06, BIZ-01..04, NEG-01..04 and SEC-01..03 tabulated by HTTP status, ErrorCode, ErrorMessage and Context (V1 and V2 give the same result per scenario)
- **Response:** Mapping table (V1 = V2): 400 NDC-INT-TEC-A0001 "Invalid request..." + Context PredicateValidator (pnr, bookingToken, gdsPNR required; inactive credentials) - PascalCase keys. 400 errorCode "1001" "Validation errors occurred..." + context[] (supplier/credentialsSelector missing, voidTickets wrong type or null, pnr longer than 9) - camelCase keys. 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." (repeat Void, Void after Cancel, QR). 409 NDC-INT-UNC-Z9999 with ErrorMessage equal to the code (unknown PNR; Void on a hold = BUSINESS_CONFLICT; other selector / Sabre selector = supplier refusal with empty or "Order not found" context; EK cancelled). 401 AuthenticationError "Invalid authorization header". 400 is used for every validation case and Status equals the HTTP code everywhere; TransactionId is a GUID.
- **Expected:** Every failure uses {Status, TransactionId, ErrorCode, ErrorMessage, Context}; Status equals the HTTP code; validation errors are 400; business-rule/eligibility errors use one consistent code family. Record the full mapping table for SPEC.md §2.15.
- **Actual:** Not one consistent envelope: the two validation 400s differ in key casing and code (NDC-INT-TEC-A0001 vs 1001); the business-rule family mixes BYP-A0003 and the unmapped Z9999, whose ErrorMessage is just the code, and the same Z9999 code covers four unrelated conditions (unknown PNR, held booking, wrong selector, cancelled EK booking). Same as Round 1 (BUG-11). Table to feed SPEC.md 2.15.
- **Status:** FAIL
- **Evidence:** Envelope keys: Status/TransactionId/ErrorCode/ErrorMessage/Context vs status/transactionId/errorCode/errorMessage/context.

  - **Attempt 1 of 8 - V2 pnr omitted (400):** HTTP 400
  - **Attempt 2 of 8 - V2 supplier omitted (400):** HTTP 400
  - **Attempt 3 of 8 - V2 voidTickets [123] (400):** HTTP 400
  - **Attempt 4 of 8 - V2 repeat Void (409):** HTTP 409
  - **Attempt 5 of 8 - V2 Void on a hold (409):** HTTP 409
  - **Attempt 6 of 8 - V2 unknown pnr (409):** HTTP 409
  - **Attempt 7 of 8 - V2 other selector (409):** HTTP 409
  - **Attempt 8 of 8 - V2 no x-api-key (401):** HTTP 401

### TC-VOIDTPN-NEG-06 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify the same invalid supplier or credentialsSelector gives the same error shape on Void as on Search and Book.
- **Category:** Negative
- **Endpoint Name:** Search / Book / Void - invalid supplier and selector (V1 + V2)
- **Request:** supplier "NoSuchSupplier" and credentialsSelector "ZZZ" sent to Search, Book and Void on each version
- **Response:** V1 Search: 400 1001; V1 Book: 400 1001; V1 Void: 400 1001; V2 Search: 400 1001; V2 Book: 400 1001; V2 Void: 400 1001
- **Expected:** Same ErrorCode and message pattern on all three endpoints; no endpoint falls through to a 500.
- **Actual:** All six calls return the same 400 with errorCode "1001" "Validation errors occurred. Please check your request." and context naming "$.supplier": the JSON value could not be converted to the supplier enum; none fall through to a 500; no booking created. The same shape on the three endpoints and on both versions.
- **Status:** PASS
- **Evidence:** Context also leaks the .NET enum type name (logged under VAL-07 / BUG-05 family).

  - **Attempt 1 of 6 - V1 Search:** HTTP 400
  - **Attempt 2 of 6 - V1 Book:** HTTP 400
  - **Attempt 3 of 6 - V1 Void:** HTTP 400
  - **Attempt 4 of 6 - V2 Search:** HTTP 400
  - **Attempt 5 of 6 - V2 Book:** HTTP 400
  - **Attempt 6 of 6 - V2 Void:** HTTP 400

### TC-VOIDTPN-SEC-01 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate Void without x-api-key or with an invalid x-api-key is rejected.
- **Category:** Security
- **Endpoint Name:** Void - missing or invalid x-api-key (V1 + V2)
- **Request:** Valid Void body per version on a fresh booking with the x-api-key header removed, then x-api-key "invalid", then Retrieve with valid headers
- **Response:** V1 SEC01-nokey: 401 Invalid authorization header (booking intact); V1 SEC01-badkey: 401 Invalid authorization header (booking intact). V2 SEC01-nokey: 401 Invalid authorization header (booking intact); V2 SEC01-badkey: 401 Invalid authorization header (booking intact)
- **Expected:** 401/403; booking not voided.
- **Actual:** Both versions: 401 {ErrorCode AuthenticationError, ErrorMessage "Authentication error. Please check your credentials.", Context "Invalid authorization header"} for a missing and for an invalid key, in about 0.1s; the booking is not voided.
- **Status:** PASS
- **Evidence:** Booking intact on every variant.

  - **Attempt 1 of 8 - V1 Void no x-api-key:** HTTP 401
  - **Attempt 2 of 8 - V1 Retrieve after no x-api-key:** HTTP 200
  - **Attempt 3 of 8 - V2 Void no x-api-key:** HTTP 401
  - **Attempt 4 of 8 - V2 Retrieve after no x-api-key:** HTTP 200
  - **Attempt 5 of 8 - V1 Void x-api-key invalid:** HTTP 401
  - **Attempt 6 of 8 - V1 Retrieve after x-api-key invalid:** HTTP 200
  - **Attempt 7 of 8 - V2 Void x-api-key invalid:** HTTP 401
  - **Attempt 8 of 8 - V2 Retrieve after x-api-key invalid:** HTTP 200

### TC-VOIDTPN-SEC-02 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with an invalid Client-Id is rejected.
- **Category:** Security
- **Endpoint Name:** Void - invalid Client-Id (V1 + V2)
- **Request:** Valid Void body per version on a fresh booking with Client-Id "Invalid-Client", then Retrieve
- **Response:** V1 SEC02-badclient: 401 Invalid authorization header (booking intact). V2 SEC02-badclient: 401 Invalid authorization header (booking intact)
- **Expected:** 401/403; booking not voided.
- **Actual:** Both versions: 401 AuthenticationError "Invalid authorization header"; booking not voided.
- **Status:** PASS
- **Evidence:** Booking intact on both versions.

  - **Attempt 1 of 4 - V1 Void Client-Id invalid:** HTTP 401
  - **Attempt 2 of 4 - V1 Retrieve after Client-Id invalid:** HTTP 200
  - **Attempt 3 of 4 - V2 Void Client-Id invalid:** HTTP 401
  - **Attempt 4 of 4 - V2 Retrieve after Client-Id invalid:** HTTP 200

### TC-VOIDTPN-SEC-03 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate a TravelportNdc booking cannot be voided under a different supplier or credentialsSelector.
- **Category:** Security
- **Endpoint Name:** Void - another supplier or credentials selector (V1 + V2)
- **Request:** A TravelportNdc/UAE booking's pnr/gdsPNR/bookingToken per version sent with (a) supplier SabreNdc + credentialsSelector EGY; (b) supplier TravelportNdc + credentialsSelector EGY (the other active selector from CAPCHECK-04); then Retrieve under TravelportNdc/UAE
- **Response:** V1 SEC03a-sabre: 409 Order not found: orderId=[7fa92a21-549b-4141-8647-310e3a8cd551] (booking intact); V1 SEC03b-EGY: 409  (booking intact). V2 SEC03a-sabre: 409 Order not found: orderId=[2aa0aad2-4742-4982-881b-171716a4670a] (booking intact); V2 SEC03b-EGY: 409  (booking intact)
- **Expected:** Both rejected (cross-tenant access denied or booking not found); booking still ticketed.
- **Actual:** (a) 409 NDC-INT-UNC-Z9999 with Context 060004 "Order not found: orderId=[&lt;the booking token&gt;]" in ~1s on both versions: the SabreNdc handler looked the token up and found nothing, so a TravelportNdc PNR cannot be voided through the Sabre route. (b) 409 NDC-INT-UNC-Z9999 with an empty Context after ~9-10s on both versions: the call is forwarded to Travelport under the EGY credentials and refused there. Both refused, both bookings still ticketed. Remaining flaws are the unmapped Z9999 code and the empty context in (b) (see NEG-05). Variant (a) only addresses the SabreNdc void route with a throwaway TravelportNdc booking; no SabreNdc booking is involved.
- **Status:** PASS
- **Evidence:** Both bookings stayed ticketed (Retrieve under UAE 200).

  - **Attempt 1 of 8 - V1 Void supplier SabreNdc/EGY:** HTTP 409
  - **Attempt 2 of 8 - V1 Retrieve after supplier SabreNdc/EGY:** HTTP 200
  - **Attempt 3 of 8 - V2 Void supplier SabreNdc/EGY:** HTTP 409
  - **Attempt 4 of 8 - V2 Retrieve after supplier SabreNdc/EGY:** HTTP 200
  - **Attempt 5 of 8 - V1 Void credentialsSelector EGY:** HTTP 409
  - **Attempt 6 of 8 - V1 Retrieve after credentialsSelector EGY:** HTTP 200
  - **Attempt 7 of 8 - V2 Void credentialsSelector EGY:** HTTP 409
  - **Attempt 8 of 8 - V2 Retrieve after credentialsSelector EGY:** HTTP 200

### TC-VOIDTPN-SEC-04 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate injection payloads in surName and pnr are rejected or safely handled.
- **Category:** Security
- **Endpoint Name:** Void - injection payloads in surName and pnr (V1 + V2)
- **Request:** Per version, each on a fresh booking: surName then pnr set to "' OR 1=1 --", "&lt;script&gt;alert(1)&lt;/script&gt;" and a 500-character string; Retrieve after each
- **Response:** V1 SEC04-sql: 200 voided=true (VOIDED the booking); V1 SEC04-xss: 200 voided=true (VOIDED the booking); V1 SEC04-long: 200 voided=true (VOIDED the booking); V1 SEC04-pnr-sql: 400 Maximum length of a PNR is 9 characters (booking intact); V1 SEC04-pnr-xss: 400 Maximum length of a PNR is 9 characters (booking intact); V1 SEC04-pnr-long: 400 Maximum length of a PNR is 9 characters (booking intact). V2 SEC04-sql: 200 voided=true (VOIDED the booking); V2 SEC04-xss: 200 voided=true (VOIDED the booking); V2 SEC04-long: 200 voided=true (VOIDED the booking); V2 SEC04-pnr-sql: 400 Maximum length of a PNR is 9 characters (booking intact); V2 SEC04-pnr-xss: 400 Maximum length of a PNR is 9 characters (booking intact); V2 SEC04-pnr-long: 400 Maximum length of a PNR is 9 characters (booking intact)
- **Expected:** 4xx validation or mismatch error each time; no 500, no payload reflected unescaped in the response; booking not voided.
- **Actual:** pnr: all three payloads are rejected on both versions with 400 "Maximum length of a PNR is 9 characters" and are not reflected in the response; bookings intact. surName: all three payloads (SQL, script tag, 500 characters) return 200 voided:true on both versions and void the booking, because surName is never validated (BUG-04); no payload is echoed back and nothing errors with a 500, so there is no injection finding, only the missing validation. Expected a 4xx for each variant.
- **Status:** FAIL
- **Evidence:** V1: tickets 1572141602464 / 1572141602467 / 1572141602469 voided; V2: 1572141602461 / 1572141602491 / 1572141602494 voided.

  - **Attempt 1 of 24 - V1 Void sql:** HTTP 200
  - **Attempt 2 of 24 - V1 Retrieve after sql:** HTTP 409
  - **Attempt 3 of 24 - V2 Void sql:** HTTP 200
  - **Attempt 4 of 24 - V2 Retrieve after sql:** HTTP 409
  - **Attempt 5 of 24 - V1 Void xss:** HTTP 200
  - **Attempt 6 of 24 - V1 Retrieve after xss:** HTTP 409
  - **Attempt 7 of 24 - V2 Void xss:** HTTP 200
  - **Attempt 8 of 24 - V2 Retrieve after xss:** HTTP 409
  - **Attempt 9 of 24 - V1 Void long:** HTTP 200
  - **Attempt 10 of 24 - V1 Retrieve after long:** HTTP 409
  - **Attempt 11 of 24 - V2 Void long:** HTTP 200
  - **Attempt 12 of 24 - V2 Retrieve after long:** HTTP 409
  - **Attempt 13 of 24 - V1 Void pnr-sql:** HTTP 400
  - **Attempt 14 of 24 - V1 Retrieve after pnr-sql:** HTTP 200
  - **Attempt 15 of 24 - V2 Void pnr-sql:** HTTP 400
  - **Attempt 16 of 24 - V2 Retrieve after pnr-sql:** HTTP 200
  - **Attempt 17 of 24 - V1 Void pnr-xss:** HTTP 400
  - **Attempt 18 of 24 - V1 Retrieve after pnr-xss:** HTTP 200
  - **Attempt 19 of 24 - V2 Void pnr-xss:** HTTP 400
  - **Attempt 20 of 24 - V2 Retrieve after pnr-xss:** HTTP 200
  - **Attempt 21 of 24 - V1 Void pnr-long:** HTTP 400
  - **Attempt 22 of 24 - V1 Retrieve after pnr-long:** HTTP 200
  - **Attempt 23 of 24 - V2 Void pnr-long:** HTTP 400
  - **Attempt 24 of 24 - V2 Retrieve after pnr-long:** HTTP 200

### TC-VOIDTPN-INT-01 — PASS

- **Test Case:** [TravelportNdc][Book]&amp;[Void] [Request] Verify pnr, gdsPNR and bookingToken from Book are accepted unchanged by Void.
- **Category:** Integration
- **Endpoint Name:** Book &gt; Void id hand-off (V1 + V2)
- **Request:** pnr, gdsPNR and bookingToken taken verbatim from the Book response (no edits, no case changes) into Void, per version (the POS-01/02 bookings)
- **Response:** V1 Book 774MNY/HNGKWD -&gt; Void 200 {voided:true, voidedTickets:1}; V2 Book 773JKY/HNGKWF -&gt; Void 200 {voided:true, voidedTickets:1}
- **Expected:** Void succeeds with the handed-off IDs; no re-lookup or transformation needed by the caller.
- **Actual:** Void succeeds on both versions with the Book ids unchanged: no re-lookup or transformation is needed by the caller. (The same holds for the Hold &gt; BookAfterHold ids in POS-03 and for every flow.)
- **Status:** PASS
- **Evidence:** Request bodies contain the Book pnr, gdsPNR and bookingToken character for character.

  - **Attempt 1 of 4 - V1 Book:** HTTP 200
  - **Attempt 2 of 4 - V1 Void with Book ids:** HTTP 200
  - **Attempt 3 of 4 - V2 Book:** HTTP 200
  - **Attempt 4 of 4 - V2 Void with Book ids:** HTTP 200

### TC-VOIDTPN-INT-02 — PASS

- **Test Case:** [TravelportNdc][Void]&amp;[Retrieve] [Response] Verify Retrieve after a successful TravelportNdc Void reflects the voided state.
- **Category:** Integration
- **Endpoint Name:** Retrieve after Void (V1 + V2)
- **Request:** V1 RetrieveBooking and V2 Retrieve straight after a successful Void: the POS-01/02 bookings (Qatar Airways) and the flow bookings (Emirates)
- **Response:** V1 774MNY: 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]; V2 773JKY: 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]; Emirates flows: 409 NDC-INT-UNC-Z9999 [{"Name":"ReservationCancelled","Value":"Reservation is already cancelled"}] and 409 NDC-INT-UNC-Z9999 [{"Name":"ReservationCancelled","Value":"Reservation is already cancelled"}]
- **Expected:** Booking shows as voided: tickets[].ticketStatus changed from Booked to a voided value and voidCapability no longer allows void - or a terminal 409 like cancelled PNRs. Exact signal UNKNOWN (bookingStatus does not exist in V1 Retrieve, §2.11, confirmed on TravelportNdc 2026-08-05) - record it as the baseline. Unchanged Booked tickets = defect.
- **Actual:** After a successful Void Retrieve fails on both versions with the terminal 409 used for cancelled PNRs: Qatar Airways bookings give NDC-INT-BYP-A0003 "Reservation is already cancelled." and Emirates bookings give NDC-INT-UNC-Z9999 with Context ReservationCancelled "Reservation is already cancelled". There is no voided bookingStatus or ticketStatus to read back (V1 Retrieve has no bookingStatus at all; V2 bookingStatus was Booked before the Void), so a voided booking and a cancelled hold look identical and the voidCapability flag cannot be re-read. This resolves the SPEC 6.3 vs 2.11 contradiction. The 409 body also carries the raw supplier payload (VAL-07).
- **Status:** PASS
- **Evidence:** Signal = HTTP 409 on Retrieve; never an unchanged Booked ticket.

  - **Attempt 1 of 4 - V1 Retrieve after Void (QR):** HTTP 409
  - **Attempt 2 of 4 - V2 Retrieve after Void (QR):** HTTP 409
  - **Attempt 3 of 4 - V1 Retrieve after Void (EK, flow 3):** HTTP 409
  - **Attempt 4 of 4 - V2 Retrieve after Void (EK, flow 27):** HTTP 409

### TC-VOIDTPN-REG-01 — BLOCKED

- **Test Case:** [SabreNdc][Void][Response] Verify SabreNdc Void still works and is not routed to the TravelportNdc handler.
- **Category:** Regression
- **Endpoint Name:** Void - SabreNdc regression
- **Request:** Not part of this run: the instruction for this run is TravelportNdc only
- **Response:** No request recorded for this case
- **Expected:** HTTP 200 with the same shape as the baseline; unchanged behavior for SabreNdc and for any other supplier that still lacks Void (those keep returning 409 OperationNotSupported).
- **Actual:** Out of scope by instruction (TravelportNdc only, Void scope). The case needs a SabreNdc/EGY booking and a SabreNdc Void. Before that instruction arrived, two throwaway SabreNdc/EGY bookings had been created and voided (both Void calls returned 200) and two FlyNas Voids had been sent with a fake PNR; those calls are NOT used as evidence here and are listed under Cleanup / follow-up.
- **Status:** BLOCKED
- **Evidence:** Run the SabreNdc/EGY Void regression separately if the cross-supplier routing check is wanted.

### TC-VOIDTPN-REG-02 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify V1 and V2 Void return the same response shape for TravelportNdc.
- **Category:** Regression
- **Endpoint Name:** Void - V1 and V2 response parity
- **Request:** Success and failure responses from POS-01/02, BIZ-02, BIZ-03 and NEG-01 compared per scenario, plus the VAL/BND/NEG/SEC matrix run on both versions
- **Response:** success: V1 200 {voided:true, voidedTickets:1} | V2 200 {voided:true, voidedTickets:1}. repeat Void: V1 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}] | V2 409 NDC-INT-BYP-A0003 [{"Name":"TERMINAL","Value":"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]. unknown pnr: V1 409 NDC-INT-UNC-Z9999 [{"Name":"VALIDATION","Value":"RECORD LOCATOR DOES NOT EXIST"}] | V2 409 NDC-INT-UNC-Z9999 [{"Name":"VALIDATION","Value":"RECORD LOCATOR DOES NOT EXIST"}]. Void on a hold: V1 409 NDC-INT-UNC-Z9999 [{"Name":"BUSINESS_CONFLICT","Value":"This booking is on hold and not ticketed. Cancel it with the cancel hold | V2 409 NDC-INT-UNC-Z9999 [{"Name":"BUSINESS_CONFLICT","Value":"This booking is on hold and not ticketed. Cancel it with the cancel hold
- **Expected:** Identical success shape (V2 may add passengersVoidedAncillaries and emdTickets) and identical error codes per scenario; any other difference recorded and raised with the team.
- **Actual:** Success shape is identical except for the allowed V2 additions (passengersVoidedAncillaries, emdTickets). Every failure scenario returns the same HTTP status and ErrorCode on V1 and V2 (409 BYP-A0003, 409 Z9999 BUSINESS_CONFLICT, 409 Z9999 unknown locator, the 400s and 401s of the matrix), including the same defects on both. In Round 1 every difference came from V1 not being routed; that gap is closed.
- **Status:** PASS
- **Evidence:** Only difference: V2 adds passengersVoidedAncillaries (null) and emdTickets ({}).

  - **Attempt 1 of 8 - V1 success:** HTTP 200
  - **Attempt 2 of 8 - V2 success:** HTTP 200
  - **Attempt 3 of 8 - V1 repeat Void:** HTTP 409
  - **Attempt 4 of 8 - V2 repeat Void:** HTTP 409
  - **Attempt 5 of 8 - V1 unknown pnr:** HTTP 409
  - **Attempt 6 of 8 - V2 unknown pnr:** HTTP 409
  - **Attempt 7 of 8 - V1 Void on a hold:** HTTP 409
  - **Attempt 8 of 8 - V2 Void on a hold:** HTTP 409

### TC-VOIDTPN-REG-03 — PASS

- **Test Case:** [TravelportNdc][Hold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify Hold, Retrieve and CancelAfterHold for TravelportNdc are unchanged by the Void implementation.
- **Category:** Regression
- **Endpoint Name:** Hold / Retrieve / CancelAfterHold / Book (V1 + V2)
- **Request:** Per version: Search &gt; FareConfirm &gt; (V2: AddPassenger &gt;) Hold &gt; Retrieve &gt; CancelAfterHold &gt; Retrieve; and the Book &gt; Retrieve of CAPCHECK-02
- **Response:** V1 775553: Hold 200 holdExpirationDate 2026-11-02T21:59:00Z; Retrieve 200; CancelAfterHold 200 {"cancelled":true,"message":"Reservation cancelled successfully."}; Retrieve 409 NDC-INT-BYP-A0003 "Reservation is already cancelled."; Book 200 tickets 1, Retrieve echoes 1. V2 775IHM: Hold 200 holdExpirationDate 2026-11-02T21:59:00+02:00; Retrieve 200; CancelAfterHold 200 {"cancelled":true,"message":"Reservation cancelled successfully."}; Retrieve 409 NDC-INT-BYP-A0003 "Reservation is already cancelled."; Book 200 tickets 1, Retrieve echoes 1
- **Expected:** Hold returns a holdExpirationDate; CancelAfterHold returns {cancelled:true, message:'Reservation cancelled successfully.'} and a follow-up Retrieve returns 409 NDC-INT-BYP-A0003 'Reservation is already cancelled'; Book returns 200 with synchronously issued tickets and Retrieve echoes them.
- **Actual:** Unchanged from the baseline on both versions: Hold returns a holdExpirationDate (2026-11-02 21:59); CancelAfterHold returns {cancelled:true, message:"Reservation cancelled successfully."} (V2 adds passengersCancelledAncillaries: null); the follow-up Retrieve is 409 NDC-INT-BYP-A0003 "Reservation is already cancelled."; Book is 200 with synchronously issued tickets and Retrieve echoes them. The only change from 2026-08-05 is the additive voidCapability on ticketed Book/Retrieve.
- **Status:** PASS
- **Evidence:** V2 Retrieve of the held booking shows bookingStatus OnHold; V1 Retrieve has no bookingStatus (pre-existing V1 difference).

  - **Attempt 1 of 12 - V1 Hold:** HTTP 200
  - **Attempt 2 of 12 - V1 Retrieve (held):** HTTP 200
  - **Attempt 3 of 12 - V1 CancelAfterHold:** HTTP 200
  - **Attempt 4 of 12 - V1 Retrieve (cancelled):** HTTP 409
  - **Attempt 5 of 12 - V1 Book (POS-01/02 booking):** HTTP 200
  - **Attempt 6 of 12 - V1 Retrieve (ticketed):** HTTP 200
  - **Attempt 7 of 12 - V2 Hold:** HTTP 200
  - **Attempt 8 of 12 - V2 Retrieve (held):** HTTP 200
  - **Attempt 9 of 12 - V2 CancelAfterHold:** HTTP 200
  - **Attempt 10 of 12 - V2 Retrieve (cancelled):** HTTP 409
  - **Attempt 11 of 12 - V2 Book (POS-01/02 booking):** HTTP 200
  - **Attempt 12 of 12 - V2 Retrieve (ticketed):** HTTP 200

### FLOW-V1-03-TPN — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #3 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 Search CAI-JED 2026-11-12 1 ADT (fully itemized Emirates offer, 1815 AED) &gt; FareConfirm &gt; Book (pnr RJUZCN, gdsPNR HNGL3R) &gt; RetrieveBooking &gt; Void (surName Ibrahim, voidTickets []) &gt; RetrieveBooking
- **Response:** Search/FareConfirm/Book/Retrieve 200 (Book 26.4s, ticket 1765766802351 Booked, FullVoidOnlyAllowed). Void 200 {voided:true, voidedTickets:1} (15.8s). Final Retrieve 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999"
- **Expected:** Every hop HTTP 200/2xx; Void succeeds; final Retrieve shows all tickets voided (signal per TC-VOIDTPN-INT-02). Price reconciliation holds through Book.
- **Actual:** Every hop passes and the price reconciles through Book (1815 AED at Search, FareConfirm and Book). Void succeeds on V1 and the final Retrieve is the terminal 409 "Reservation is already cancelled" (signal per INT-02). In Round 1 and on 2026-08-05 this flow failed at the Void hop with 409 OperationNotSupported; that is fixed.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Book selectedOffer reconciles; ok Book total equals FareConfirm tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766802351:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802351","carrierCode":"EK"}]})

  - **Hop 1 &mdash; V1 Search (f03_V1):** PASS &mdash; 200 {"responseId":"10cf4e56-9fdf-41d6-b92f-73e5d96d0961","supplier":"TravelportNdc","journeys":{"EKs2?EKs9":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs2","EKs9"]},"EKs15?EK
  - **Hop 2 &mdash; V1 FareConfirm (f03_V1):** PASS &mdash; 200 {"responseId":"93863fa7-b08d-4d6d-abc1-841b96ffbd2b","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Book (f03_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802351","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 4 &mdash; V1 Retrieve (f03_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802351","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 5 &mdash; V1 Void (f03_V1):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802351","carrierCode":"EK"}]}
  - **Hop 6 &mdash; V1 Retrieve (f03_V1-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"e1e1f6dd-8e8a-4646-acc0-b6166f069c5f","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V1-05-TPN — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #5 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 flow on pnr J3F5QS (gdsPNR HNGL44): Hold, FareConfirmAfterHold (PnrReprice), Retrieve, BookAfterHold, Retrieve, Void, Retrieve
- **Response:** Hold 200 (9.7s, expires 2026-11-12T10:30:00Z); PnrReprice 200; Retrieve (held) 200; BookAfterHold 200 (23.7s, ticket 1765766802356); Retrieve 200 Booked; Void 200 {voided:true, voidedTickets:1} (14.7s); final Retrieve 409 NDC-INT-UNC-Z9999
- **Expected:** All hops succeed before holdExpirationDate; BookAfterHold issues tickets; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** Family-E chain works end to end on V1: the hold is repriced (1815 AED unchanged), ticketed from the hold with pnr, gdsPNR and bookingToken unchanged, then voided; the final Retrieve is the terminal 409. Round 1 failed at the Void hop.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Hold selectedOffer reconciles; ok Hold total equals FareConfirm tier total (1815 vs 1815); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr J3F5QS token same true); ok Retrieve before Void shows tickets Booked (1765766802356:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802356","carrierCode":"EK"}]})

  - **Hop 1 &mdash; V1 Search (f05_V1):** PASS &mdash; 200 {"responseId":"057aeafc-e2e0-40d1-8936-376a6ea9de37","supplier":"TravelportNdc","journeys":{"EKs10?EKs3":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs10","EKs3"]},"EKs9?E
  - **Hop 2 &mdash; V1 FareConfirm (f05_V1):** PASS &mdash; 200 {"responseId":"a8d0dad2-5555-4586-82da-2c842f83cfea","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Hold (f05_V1):** PASS &mdash; 200 {"holdExpirationDate":"2026-11-12T10:30:00Z","supplier":"TravelportNdc","pnr":"J3F5QS","gdsPNR":"HNGL44","bookingToken":"8c6a781c-8946-4687-9641-7f1c0ed35f94","journeys":{"seg_1?seg_2":{"origin":"CAI"
  - **Hop 4 &mdash; V1 PnrReprice (f05_V1):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 5 &mdash; V1 Retrieve (f05_V1):** PASS &mdash; 200 {"tickets":{},"creationDate":"2026-10-27T00:00:00","fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T10:30:00","pcc":"","supplier":"TravelportNdc","pnr":"J3F5QS","gdsP
  - **Hop 6 &mdash; V1 BookAfterHold (f05_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802356","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","isBspCommissionA
  - **Hop 7 &mdash; V1 Retrieve (f05_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802356","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 8 &mdash; V1 Void (f05_V1):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802356","carrierCode":"EK"}]}
  - **Hop 9 &mdash; V1 Retrieve (f05_V1-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"1ea29c3c-6f2d-457a-8478-c4c3e7957aa3","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V1-09-TPN — FAIL

- **Test Case:** [Search]&amp;[UpSelling]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #9 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 Search &gt; UpSelling (requestUrl resolved against baseUrl) &gt; Book with upsellOffers[0] (pnr R6UYP2, gdsPNR HNGL3Q) &gt; RetrieveBooking &gt; Void &gt; RetrieveBooking
- **Response:** Search/FareConfirm/Upselling/Book/Retrieve 200 (Book 26.3s, ticket 1765766802350 Booked, FullVoidOnlyAllowed). Void 200 {voided:true, voidedTickets:1} (16.7s). Final Retrieve 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999". UpSelling 200 with 1 tier (1815 AED), response keys responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails, upsellOffers (no selectedOffer)
- **Expected:** Every hop succeeds; the booked tier's price matches the Upselling tier; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** The booked fare equals the Upselling tier (1815 AED), Void succeeds and the final Retrieve is the terminal 409. The flow still fails on one hop: V1 Upselling returns upsellOffers[] and no selectedOffer, so the documented drop-in for FareConfirm does not hold and the first tier had to be chosen by hand. Void is no longer the failing step (it was in Round 1).
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Book selectedOffer reconciles; ok Book total equals Upselling tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766802350:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802350","carrierCode":"EK"}]})

  - **Hop 1 &mdash; V1 Search (f09_V1):** PASS &mdash; 200 {"responseId":"930900a2-934b-4793-bae0-cbf5671c4b56","supplier":"TravelportNdc","journeys":{"EKs3?EKs10":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs3","EKs10"]},"EKs14?
  - **Hop 2 &mdash; V1 Upselling (f09_V1):** FAIL &mdash; 200 {"responseId":"0cb4c43a-faae-4dd1-b072-234b8077d63d","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Book (f09_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802350","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 4 &mdash; V1 Retrieve (f09_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802350","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 5 &mdash; V1 Void (f09_V1):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802350","carrierCode":"EK"}]}
  - **Hop 6 &mdash; V1 Retrieve (f09_V1-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"d22b9ad5-32af-45f3-bc5f-13b0e6f75855","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V1-11-TPN — FAIL

- **Test Case:** [Search]&amp;[UpSelling]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #11 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 Search &gt; UpSelling &gt; Hold (pnr PY6J86, gdsPNR HNGL43) &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve
- **Response:** Hold 200 (10.6s, expires 2026-11-12T17:25:00Z); PnrReprice 200; Retrieve (held) 200; BookAfterHold 200 (22.6s, ticket 1765766802355); Retrieve 200 Booked; Void 200 {voided:true, voidedTickets:1} (16.5s); final Retrieve 409 NDC-INT-UNC-Z9999. UpSelling 200 with 1 tier, no selectedOffer
- **Expected:** All hops succeed before holdExpirationDate; Void succeeds; final Retrieve shows all tickets voided; IDs unchanged from Hold.
- **Actual:** Hold, reprice, ticketing from the hold (ids unchanged), Void and the final Retrieve all work. The flow fails only because V1 Upselling returns upsellOffers[] and no selectedOffer (same defect as FLOW-V1-09-TPN). Round 1 failed at the Void hop.
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Hold selectedOffer reconciles; ok Hold total equals Upselling tier total (1815 vs 1815); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr PY6J86 token same true); ok Retrieve before Void shows tickets Booked (1765766802355:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802355","carrierCode":"EK"}]})

  - **Hop 1 &mdash; V1 Search (f11_V1):** PASS &mdash; 200 {"responseId":"df4c285d-f0e5-47f6-b41d-3e78a8aeba4f","supplier":"TravelportNdc","journeys":{"EKs11?EKs3":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs11","EKs3"]},"EKs10?
  - **Hop 2 &mdash; V1 Upselling (f11_V1):** FAIL &mdash; 200 {"responseId":"df2a7e7a-323f-4464-a045-f8c57e8a10d7","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Hold (f11_V1):** PASS &mdash; 200 {"holdExpirationDate":"2026-11-12T17:25:00Z","supplier":"TravelportNdc","pnr":"PY6J86","gdsPNR":"HNGL43","bookingToken":"96fbdf6c-622a-46e3-b42f-ae83581cd044","journeys":{"seg_1?seg_2":{"origin":"CAI"
  - **Hop 4 &mdash; V1 PnrReprice (f11_V1):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 5 &mdash; V1 Retrieve (f11_V1):** PASS &mdash; 200 {"tickets":{},"creationDate":"2026-10-27T00:00:00","fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T17:25:00","pcc":"","supplier":"TravelportNdc","pnr":"PY6J86","gdsP
  - **Hop 6 &mdash; V1 BookAfterHold (f11_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802355","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","isBspCommissionA
  - **Hop 7 &mdash; V1 Retrieve (f11_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802355","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 8 &mdash; V1 Void (f11_V1):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802355","carrierCode":"EK"}]}
  - **Hop 9 &mdash; V1 Retrieve (f11_V1-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"cc05d0b4-c174-4b5d-9fae-9716388e7941","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V2-27-TPN — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #27 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; AddPassenger &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 Search &gt; FareConfirm &gt; AddPassenger &gt; Book (pnr QYUZAS, gdsPNR HNGL3S) &gt; Retrieve &gt; Void (real gdsPNR) &gt; Retrieve
- **Response:** Search/FareConfirm/Book/Retrieve 200 (Book 26.4s, ticket 1765766802352 Booked, FullVoidOnlyAllowed). Void 200 {voided:true, voidedTickets:1} (14.7s). Final Retrieve 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999"
- **Expected:** Every hop succeeds; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** Every hop succeeds, the price reconciles through Book (1815 AED), Void succeeds and the final Retrieve is the terminal 409. The minimal V2 Book body that works is {supplier, credentialsSelector, ResponseId = AddPassenger responseId, selectedOfferId = AddPassenger offerId}. Same as Round 1.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Book selectedOffer reconciles; ok Book total equals FareConfirm tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766802352:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802352","carrierCode":"EK"}],"passen)

  - **Hop 1 &mdash; V2 Search (f27_V2):** PASS &mdash; 200 {"responseId":"84319afd-cda1-4ef2-b759-b38725559af6","supplier":"TravelportNdc","journeys":{"EKs1?EKs7":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs1","EKs7"]},"EKs15?EK
  - **Hop 2 &mdash; V2 FareConfirm (f27_V2):** PASS &mdash; 200 {"responseId":"ce7c8d97-5e26-4e78-813e-8f65a43df080","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f27_V2):** PASS &mdash; 200 {"offerId":"efdaf709-621a-4bd5-9082-3aa8d816fbc6&amp;yAHSY9IAAAIX9nyf2SQwYzViMWFlNS01YjA3LTQ5NjAtODBiZC04MDI0OTkwOTQzMjjZJGVmZGFmNzA5LTYyMWEtNGJkNS05MDgyLTNhYThkODE2ZmJjNpGSp0VLX0NQTzCRkaRFS3AwAQAAkZStRWN
  - **Hop 4 &mdash; V2 Book (f27_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"QYUZAS","gdsPNR":"HNGL3S","bookingToken":"0c5b1ae5-5b07-4960-80bd-802499094328","voidCapability":"FullVoidOnlyAllowed","ticketingDate":"2026-10-27T06:35:40","tickets
  - **Hop 5 &mdash; V2 Retrieve (f27_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"QYUZAS","gdsPNR":"HNGL3S","bookingToken":"0c5b1ae5-5b07
  - **Hop 6 &mdash; V2 Void (f27_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802352","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (f27_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"70b82a07-2687-4da9-98a7-b3b424625013","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V2-29-TPN — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #29 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; AddPassenger &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 flow on pnr PQD7FJ (gdsPNR HNGL41): Hold (credentialsSelector set to UAE explicitly), PnrReprice, Retrieve, BookAfterHold, Retrieve, Void, Retrieve
- **Response:** Hold 200 (9.8s, expires 2026-11-12T14:30:00+02:00); PnrReprice 200; Retrieve (held) 200; BookAfterHold 200 (23.3s, ticket 1765766802354); Retrieve 200 Booked; Void 200 {voided:true, voidedTickets:1} (14.1s); final Retrieve 409 NDC-INT-UNC-Z9999
- **Expected:** All hops succeed before holdExpirationDate; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** All hops succeed before holdExpirationDate, BookAfterHold issues the ticket under unchanged ids, Void succeeds and the final Retrieve is the terminal 409. V2 Retrieve shows bookingStatus OnHold then Booked. Same as Round 1.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Hold selectedOffer reconciles; ok Hold total equals FareConfirm tier total (1815 vs 1815); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr PQD7FJ token same true); ok Retrieve before Void shows tickets Booked (1765766802354:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802354","carrierCode":"EK"}],"passen)

  - **Hop 1 &mdash; V2 Search (f29_V2):** PASS &mdash; 200 {"responseId":"b1131ee5-1dd1-40c6-ba26-74788f38d1b6","supplier":"TravelportNdc","journeys":{"EKs11?EKs1":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs11","EKs1"]},"EKs6?E
  - **Hop 2 &mdash; V2 FareConfirm (f29_V2):** PASS &mdash; 200 {"responseId":"fb6ffec6-0042-4392-a35c-b50bd3012598","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f29_V2):** PASS &mdash; 200 {"offerId":"240a5c82-6327-4ad3-8ab5-8529e4503f46&amp;yAHWY9IAAAIX9nyf2SQ4MWQyZjAxMC1mMGM4LTRmYTctOGFkZi1kZGZlM2NlMDM0ZWTZJDI0MGE1YzgyLTYzMjctNGFkMy04YWI1LTg1MjllNDUwM2Y0NpGSp0VLX0NQTzCRkaRFS3AzAQAAkZStRWN
  - **Hop 4 &mdash; V2 Hold (f29_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"PQD7FJ","gdsPNR":"HNGL41","bookingToken":"81d2f010-f0c8-4fa7-8adf-ddfe3ce034ed","holdExpirationDate":"2026-11-12T14:30:00+02:00","passengersSelectedAncillaries":null
  - **Hop 5 &mdash; V2 PnrReprice (f29_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 6 &mdash; V2 Retrieve (f29_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T14:30:00+02:00","bookingStatus":"OnHold","pcc":"","supplier":"TravelportNdc","pnr":"PQD7FJ","gdsPNR":"HNGL41","booki
  - **Hop 7 &mdash; V2 BookAfterHold (f29_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"PQD7FJ","gdsPNR":"HNGL41","bookingToken":"81d2f010-f0c8-4fa7-8adf-ddfe3ce034ed","voidCapability":"FullVoidOnlyAllowed","creationDate":null,"ticketingDate":"2026-10-2
  - **Hop 8 &mdash; V2 Retrieve (f29_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"PQD7FJ","gdsPNR":"HNGL41","bookingToken":"81d2f010-f0c8
  - **Hop 9 &mdash; V2 Void (f29_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802354","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 10 &mdash; V2 Retrieve (f29_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"3c133990-a093-411d-8c64-878f3d68493b","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V2-74-TPN — PASS

- **Test Case:** [Search]&amp;[UpSelling]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #74 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; AddPassenger &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 Search &gt; UpSelling &gt; AddPassenger &gt; Book (pnr LTVKIW, gdsPNR HNGL3P) &gt; Retrieve &gt; Void &gt; Retrieve; plus a probe: Book directly from the Upselling ids without AddPassenger
- **Response:** Search/FareConfirm/Upselling/Book/Retrieve 200 (Book 26.3s, ticket 1765766802349 Booked, FullVoidOnlyAllowed). Void 200 {voided:true, voidedTickets:1} (18.1s). Final Retrieve 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999". Probe: V2 Book without AddPassenger: 500 {Status 500, ErrorCode ServerError, ErrorMessage "Unknown error occured. Please keep the transaction id as a reference.", Context []} in 1.0s
- **Expected:** Every hop succeeds with AddPassenger inserted; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** Every hop succeeds with AddPassenger inserted, the booked tier price equals the Upselling tier (1815 AED), Void succeeds and the final Retrieve is the terminal 409. Anomaly question answered again: Book does NOT work without AddPassenger (HTTP 500 instead of a 400 naming the missing passenger details), so AddPassenger is required for flows 72-89 (BUG-12, 2nd confirmation). The V2 Upselling "selectedOffer" check below is informational: V2 Upselling returns upsellOffers[] by design.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Book selectedOffer reconciles; ok Book total equals Upselling tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766802349:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802349","carrierCode":"EK"}],"passen)

  - **Hop 1 &mdash; V2 Search (f74_V2):** PASS &mdash; 200 {"responseId":"11135e1c-d221-402e-bfa7-ddbd80831447","supplier":"TravelportNdc","journeys":{"EKs14?EKs9":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs14","EKs9"]},"EKs11?
  - **Hop 2 &mdash; V2 Upselling (f74_V2):** PASS &mdash; 200 {"responseId":"edf089d3-27bc-4199-a3d8-ea73c2dff5bf","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f74_V2):** PASS &mdash; 200 {"offerId":"e409ea74-e3a3-4ae3-8065-b376e4e90c39&amp;yAHEY9IAAAIQ9nWf2SRkYjU0OTJjZS1mN2NiLTQ2ZDEtOGFiYi0yYmRiYmRhZWIwMjPZJGU0MDllYTc0LWUzYTMtNGFlMy04MDY1LWIzNzZlNGU5MGMzOZGSom8wkZGicDABAACRlK1FY29ub215IFN
  - **Hop 4 &mdash; V2 Book (f74_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"LTVKIW","gdsPNR":"HNGL3P","bookingToken":"db5492ce-f7cb-46d1-8abb-2bdbbdaeb023","voidCapability":"FullVoidOnlyAllowed","ticketingDate":"2026-10-27T06:35:38","tickets
  - **Hop 5 &mdash; V2 Retrieve (f74_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"LTVKIW","gdsPNR":"HNGL3P","bookingToken":"db5492ce-f7cb
  - **Hop 6 &mdash; V2 Void (f74_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802349","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (f74_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"710ebf54-e57c-48c9-b25f-86c62d3fb70c","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V2-76-TPN — PASS

- **Test Case:** [Search]&amp;[UpSelling]&amp;[AddPassenger]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #76 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; AddPassenger &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 Search &gt; UpSelling &gt; AddPassenger &gt; Hold (pnr RYRUCF, gdsPNR HNGL4P) &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve. Hops shown are the third attempt; attempts 1 and 2 are described in the response
- **Response:** Attempt 3 (clean): Hold 200 (8.5s, expires 2026-11-12T10:30:00+02:00); PnrReprice 200; Retrieve (held) 200; BookAfterHold 200 (18.8s, ticket 1765766802357); Retrieve 200 Booked; Void 200 {voided:true, voidedTickets:1} (14.2s); final Retrieve 409 NDC-INT-UNC-Z9999. Attempt 1 (pnr FGJ5BB): all hops 200 until the Void hop returned 409 NDC-INT-UNC-Z9999 Context TEMPORARY "RESERVATION RETRIEVE FAILED DUE TO A RESERVATION UPDATE IN PROGRESS. RETRY RESERVATION RETRIEVE (AIRLINE EK)" (TransactionId ed81a7bb-64de-4f1e-8648-8d699fa3b6cb); resending the identical Void 16.2s later returned 200 {voided:true, voidedTickets:1}. Attempt 2 (pnr BNRUZT): BookAfterHold returned 409 Z9999 "DOCUMENT ISSUANCE FAILED. NO RESPONSE RECEIVED FROM VENDOR (AIRLINE EK)" (TransactionId 7a3e7555-ea44-43ef-8208-ed5a4eb15bf8); that hold was cancelled with CancelAfterHold.
- **Expected:** All hops succeed before holdExpirationDate; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** On a clean attempt the Family-E chain works end to end, the tier price (1985 AED) is unchanged through Hold, ids stay the same after BookAfterHold, Void succeeds and the final Retrieve is the terminal 409. Two earlier attempts the same hour failed on transient Emirates-side errors (reservation update in progress at Void; no response from vendor at ticketing). They are supplier conditions, not logic errors, so the verdict follows the clean attempt, but the API handling of them is poor: a retryable TEMPORARY error is returned as the unmapped 409 Z9999 with ErrorMessage equal to the code, the raw supplier payload and no retry indication (BUG-14). The flow therefore needed one retry of the Void to complete in attempt 1.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Hold selectedOffer reconciles; ok Hold total equals Upselling tier total (1985 vs 1985); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr RYRUCF token same true); ok Retrieve before Void shows tickets Booked (1765766802357:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802357","carrierCode":"EK"}],"passen). Attempts: 1 = Void transient 409 then retry 200; 2 = BookAfterHold 409 (vendor timeout, hold cancelled); 3 = clean pass

  - **Hop 1 &mdash; V2 Search (f76s_V2):** PASS &mdash; 200 {"responseId":"0a298afe-c6de-45e9-90a2-7517ec152b4a","supplier":"TravelportNdc","journeys":{"EKs4?EKs14":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs4","EKs14"]},"EKs2?E
  - **Hop 2 &mdash; V2 Upselling (f76s_V2):** PASS &mdash; 200 {"responseId":"fc9c5dad-3f19-47d9-962e-485dcf883f45","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f76s_V2):** PASS &mdash; 200 {"offerId":"cb1f592a-db05-413e-857c-318c9b1797c0&amp;yAHDY9IAAAIP9nSf2SQzNWYzNWQ3Ni1hYWVkLTRmODUtYTcxZi03OGNjNzMzNWJmNDDZJGNiMWY1OTJhLWRiMDUtNDEzZS04NTdjLTMxOGM5YjE3OTdjMJGSom8wkZGicDABAACRlKxFY29ub215IEZ
  - **Hop 4 &mdash; V2 Hold (f76s_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"RYRUCF","gdsPNR":"HNGL4P","bookingToken":"35f35d76-aaed-4f85-a71f-78cc7335bf40","holdExpirationDate":"2026-11-12T10:30:00+02:00","passengersSelectedAncillaries":null
  - **Hop 5 &mdash; V2 PnrReprice (f76s_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 6 &mdash; V2 Retrieve (f76s_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T10:30:00+02:00","bookingStatus":"OnHold","pcc":"","supplier":"TravelportNdc","pnr":"RYRUCF","gdsPNR":"HNGL4P","booki
  - **Hop 7 &mdash; V2 BookAfterHold (f76s_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"RYRUCF","gdsPNR":"HNGL4P","bookingToken":"35f35d76-aaed-4f85-a71f-78cc7335bf40","voidCapability":"FullVoidOnlyAllowed","creationDate":null,"ticketingDate":"2026-10-2
  - **Hop 8 &mdash; V2 Retrieve (f76s_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"RYRUCF","gdsPNR":"HNGL4P","bookingToken":"35f35d76-aaed
  - **Hop 9 &mdash; V2 Void (f76s_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802357","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 10 &mdash; V2 Retrieve (f76s_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"036a39b9-c28a-46f2-ac05-2ef1b65b974c","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V1-03-TPN-NEGHOP5 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #3 rejects a stale bookingToken at the Void hop for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; Book &gt; Retrieve &gt; Void (foreign bookingToken) &gt; Retrieve (V1)
- **Request:** V1 flow #3 through hop 4 (pnr DT4Y3J, gdsPNR HNGL4Z); at hop 5 the bookingToken was replaced with the token of another booking (oth_V1, pnr 774S37); Retrieve afterwards
- **Response:** Hops 1-4: 200. Void with the foreign token: 200 {voided:true, voidedTickets:1} in 14.5s. Retrieve afterwards: 409 (cancelled). The other booking 774S37 stayed ticketed.
- **Expected:** Void rejected with a 4xx standard envelope; the flow's booking stays ticketed.
- **Actual:** The stale / foreign bookingToken is not rejected: the flow's own booking is voided with another booking's token. Expected a 4xx and the booking left ticketed. Round 1 could not run this on V1 (Void unsupported); it fails now for the same reason as NEG-02 (BUG-03).
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Book selectedOffer reconciles; ok Book total equals FareConfirm tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766802359:Booked); Void accepted the foreign token (voided=true)

  - **Hop 1 &mdash; V1 Search (nh5_V1):** PASS &mdash; 200 {"responseId":"1fba10de-834a-4472-8141-8fd2024fe176","supplier":"TravelportNdc","journeys":{"EKs11?EKs2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs11","EKs2"]},"EKs9?E
  - **Hop 2 &mdash; V1 FareConfirm (nh5_V1):** PASS &mdash; 200 {"responseId":"b9887f6c-e8fc-490e-8031-4524343e97a3","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Book (nh5_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802359","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 4 &mdash; V1 Retrieve (nh5_V1):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766802359","carrierCode":"EK"}},"creationDate":"2026-10-27T00:00:00","ticketingDate":"
  - **Hop 5 &mdash; V1 Void (nh5_V1-foreigntoken):** FAIL &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802359","carrierCode":"EK"}]}
  - **Hop 6 &mdash; V1 Retrieve (nh5_V1-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"b1279471-9515-455f-84af-93a7e5d03358","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V2-27-TPN-NEGHOP6 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #27 rejects a stale bookingToken at the Void hop for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; AddPassenger &gt; Book &gt; Retrieve &gt; Void (foreign bookingToken) &gt; Retrieve (V2)
- **Request:** V2 flow #27 through hop 5 (pnr ILZQWF, gdsPNR HNGL50); at hop 6 the bookingToken was replaced with the token of another booking (oth_V2, pnr 773G59); Retrieve afterwards
- **Response:** Hops 1-5: 200. Void with the foreign token: 200 {voided:true, voidedTickets:1} in 14.5s. Retrieve afterwards: 409 (cancelled). The other booking 773G59 stayed ticketed.
- **Expected:** Void rejected with a 4xx standard envelope; the flow's booking stays ticketed.
- **Actual:** The stale / foreign bookingToken is not rejected: the flow's own booking is voided with another booking's token. Expected a 4xx and the booking left ticketed. Same as Round 1 (BUG-03).
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Book selectedOffer reconciles; ok Book total equals FareConfirm tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766802358:Booked); Void accepted the foreign token (voided=true)

  - **Hop 1 &mdash; V2 Search (nh6_V2):** PASS &mdash; 200 {"responseId":"84ac860f-d605-405a-91ee-5cf0df0bfc8c","supplier":"TravelportNdc","journeys":{"EKs6?EKs3":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs6","EKs3"]},"EKs7?EKs
  - **Hop 2 &mdash; V2 FareConfirm (nh6_V2):** PASS &mdash; 200 {"responseId":"8a5384c8-1033-4d62-8cb6-af4821a056c8","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (nh6_V2):** PASS &mdash; 200 {"offerId":"67504ae5-8dee-42f5-aad3-c9eb0cc4bb79&amp;yAHSY9IAAAIX9nyf2SQwMzY2MDQ1MS0wZTJlLTQ5MTYtODNiNi05YjVjNTNlYjhkMWbZJDY3NTA0YWU1LThkZWUtNDJmNS1hYWQzLWM5ZWIwY2M0YmI3OZGSp0VLX0NQTzCRkaRFS3AwAQAAkZStRWN
  - **Hop 4 &mdash; V2 Book (nh6_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"ILZQWF","gdsPNR":"HNGL50","bookingToken":"03660451-0e2e-4916-83b6-9b5c53eb8d1f","voidCapability":"FullVoidOnlyAllowed","ticketingDate":"2026-10-27T06:40:58","tickets
  - **Hop 5 &mdash; V2 Retrieve (nh6_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"ILZQWF","gdsPNR":"HNGL50","bookingToken":"03660451-0e2e
  - **Hop 6 &mdash; V2 Void (nh6_V2-foreigntoken):** FAIL &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802358","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (nh6_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"3413ccf7-2099-45a9-ad0e-9c0dd6d1b36e","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

## Findings

### Defects

- **[TC-CAPCHECK-TPN-02] BUG-13 (occurrence 1, not new) &mdash; Two different TravelportNdc bookings can be returned the same bookingToken: V1 774MNY and V2 773JKY (made in the same second) both got 96e14dee-43a8-4068-b47b-31d727a06b7d; V1 774VYF and 774AIE both got e68b0a9f-ed6b-4d3a-b5b1-4d81684e795e** Field: `bookingToken`. Expected: A bookingToken that is unique per booking, e.g. a fresh GUID for every Book/Hold response. **History:** New in Round 2: not seen in Round 1 (Round 1 bookings were created sequentially). **Impact:** bookingToken is the third id every downstream call (Retrieve, Void, BookAfterHold, CancelAfterHold) is meant to bind to the booking; if two bookings share it, it cannot identify or authorise either one, and any future token check (BUG-03) would let one booking's holder act on the other Evidence: 2 shared-token pairs among 102 bookings created in this round; the pairs were created concurrently (same ticketing second 2026-10-27T06:15:23 for the first pair). Different pnr and gdsPNR in each pair (774MNY/HNGKWD vs 773JKY/HNGKWF).
- **[TC-VOIDTPN-VAL-04] BUG-04 (occurrence 2, not new) &mdash; TravelportNdc Void ignores surName on V1 and V2: a surname that matches no passenger, or no surname at all, voids the booking (200 voided:true)** Field: `surName`. Expected: 400/409 standard envelope, e.g. Context "surName does not match any passenger on the PNR", booking left ticketed. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); first seen on SabreNdc 2026-10-22 (BUG-01 there); in Round 2 it now also reproduces on V1 because V1 Void works **Impact:** Anyone holding a PNR/gdsPNR can void a ticket without knowing the passenger surname; the ownership check the AC and SPEC 2.15 describe does not exist Evidence: V1 ticket 1572141602475 and V2 ticket 1572141602427 voided with surName "Mismatch"; V1 1572141602474 and V2 1572141602426 voided with surName omitted
- **[TC-VOIDTPN-VAL-07] BUG-05 (occurrence 2, not new) &mdash; TravelportNdc Void failures expose internal and supplier data: 409 bodies carry OriginalSupplierRequest and the raw Travelport OriginalSupplierResponse, and the 400 for a wrong-typed voidTickets quotes .NET type names (System.Collections.Generic.ICollection`1[NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType]) with parser positions** Field: `Context[].Value / OriginalSupplierRequest / OriginalSupplierResponse`. Expected: {Status, TransactionId, ErrorCode, ErrorMessage, Context[{Name, Value}]} with integration-defined text only, no raw supplier payload and no type names. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); also seen on SabreNdc Void 2026-10-22; Round 2 reproduces on V1 and V2 **Impact:** Leaks supplier request/response structure and internal DTO names to every API consumer, and breaks the contract that supplier details are mapped Evidence: Repeat Void (409 BYP-A0003) and unknown-PNR Void (409 Z9999) both carry OriginalSupplierRequest/Response on V1 and V2; VAL06-string V1 and VAL06-num V2 show the type names
- **[TC-VOIDTPN-VAL-10] BUG-06 (occurrence 2, not new) &mdash; V2 Void returns passengersVoidedAncillaries: null for a booking without ancillaries (emdTickets is {}); SabreNdc returns {}** Field: `passengersVoidedAncillaries`. Expected: "passengersVoidedAncillaries": {}. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); Round 2 reproduces it unchanged on V2 **Impact:** Consumers must null-check one field that is documented as a collection; V2 CancelAfterHold has the same null in passengersCancelledAncillaries Evidence: V2 Void 773JKY: {"voided":true,"voidedTickets":[...],"passengersVoidedAncillaries":null,"emdTickets":{}}
- **[TC-VOIDTPN-BND-01] BUG-03 (occurrence 2, not new) &mdash; TravelportNdc Void only checks that bookingToken is non-empty: an upper-cased token, a 1000-character token and another booking's token all void the booking on V1 and V2** Field: `bookingToken`. Expected: 400 for an over-length token and a 4xx when the token does not belong to the PNR. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); Round 2 narrows it: an omitted, empty or whitespace-only bookingToken and a whitespace-only pnr are now rejected (400), but the token is still not matched to the booking **Impact:** The token gives no protection: a caller with only a pnr/gdsPNR can void any booking by sending any non-blank string Evidence: BND01-tok-1000 voided V1 1572141602452 and V2 1572141602487; BND01-tok-upper voided V1 1572141602478 and V2 1572141602447; NEG-02 mixed token voided V1 1572141602453 and V2 1572141602488
- **[TC-VOIDTPN-BIZ-05] BUG-01 (occurrence 2, not new) &mdash; voidCapability is missing on Hold, PnrReprice and Retrieve of a held booking on V1 and V2, so a held booking (Void refused) carries no "void not allowed" value** Field: `voidCapability`. Expected: "voidCapability": "VoidNotAllowed" on a held booking (SabreNdc Hold returns it) and on a ticket past the void window. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); absent on TravelportNdc V1 Book 2026-08-05 and on SabreNdc 2026-10-22/25; Round 2: Book, BookAfterHold and the ticketed Retrieve now return FullVoidOnlyAllowed (fixed), but Hold, PnrReprice and the held Retrieve still omit it **Impact:** Callers cannot use the flag to decide whether to offer Void for a held booking; flag-vs-outcome consistency can only be shown for ticketed bookings Evidence: h1_V1 775WP7 and h1_V2 775RZB: Hold, PnrReprice, Retrieve(after-hold) have no voidCapability key; BookAfterHold and Retrieve(after-BAH) return FullVoidOnlyAllowed
- **[TC-VOIDTPN-BIZ-06] BUG-09 (occurrence 2, not new) &mdash; TravelportNdc Void ignores the voidTickets list: asking for one ticket of a 3-ticket PNR voids all three, including the infant** Field: `voidTickets`. Expected: Only the listed ticket voided, or a 4xx stating partial void is unsupported. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); Round 2 reproduces it on V2 and now on V1 **Impact:** A caller cannot void selectively and an infant ticket can be voided with no ADT linkage check; the list is also ignored for fabricated and foreign ticket numbers (NEG-03) Evidence: V1 7746DZ and V2 773AYB: voidTickets [1 ticket] -&gt; voidedTickets 3 tickets, Retrieve 409
- **[TC-VOIDTPN-NEG-01] BUG-10 (occurrence 2, not new) &mdash; Void for an unknown record locator returns the unmapped 409 NDC-INT-UNC-Z9999 whose ErrorMessage repeats the code, plus the raw Travelport request and response** Field: `ErrorCode / ErrorMessage`. Expected: 4xx with a meaningful code and message, e.g. 404/409 "Booking not found", and no raw supplier payload. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); Round 2 reproduces it on V1 and V2; also SabreNdc 2026-10-22 **Impact:** Consumers cannot tell "booking not found" from other Z9999 conditions (held booking, wrong selector, cancelled EK booking) and see supplier internals Evidence: ZZZZZZ: {Status 409, ErrorCode NDC-INT-UNC-Z9999, ErrorMessage NDC-INT-UNC-Z9999, Context [VALIDATION "RECORD LOCATOR DOES NOT EXIST"], OriginalSupplierRequest "ZZZZZZ", OriginalSupplierResponse &lt;raw&gt;}
- **[TC-VOIDTPN-NEG-05] BUG-11 (occurrence 2, not new) &mdash; Void errors use two envelope casings (PascalCase NDC-INT-TEC-A0001 vs camelCase errorCode "1001") and one generic NDC-INT-UNC-Z9999 whose ErrorMessage equals the code for four unrelated conditions** Field: `error envelope (ErrorCode / ErrorMessage)`. Expected: One envelope {Status, TransactionId, ErrorCode, ErrorMessage, Context} with distinct codes per condition. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); Round 2 reproduces it unchanged; SabreNdc Void had the same (BUG-07 2026-10-22) **Impact:** Clients need two parsers and cannot branch on ErrorCode for held, unknown, wrong-selector and cancelled cases Evidence: pnr/bookingToken/gdsPNR required -&gt; NDC-INT-TEC-A0001; supplier/selector missing, wrong voidTickets type, pnr &gt; 9 -&gt; 1001; held booking, unknown pnr, other selector, cancelled EK booking -&gt; Z9999
- **[FLOW-V2-74-TPN] BUG-12 (occurrence 2, not new) &mdash; V2 Book called with the Upselling ResponseId/offerId and no AddPassenger step returns HTTP 500 ServerError** Field: `Book (V2) without AddPassenger`. Expected: 400 ValidationError naming the missing passenger details. **History:** First observed Round 1 (2026-10-26, 20261026-105925_TravelportNdc-Void-UAE-V1V2); Round 2 reproduces it on V2 **Impact:** A flow that skips AddPassenger (flow.md 72-89 omits it) fails with an opaque 500 instead of a usable validation error Evidence: Book without AddPassenger: 500 {Status 500, ErrorCode ServerError, ErrorMessage "Unknown error occured...", Context []} in 1.0s, TransactionId 66e6198a-2027-416c-a004-619929c89236
- **[FLOW-V2-76-TPN] BUG-14 (occurrence 1, not new) &mdash; Transient Emirates errors are returned as the unmapped 409 NDC-INT-UNC-Z9999 with the raw supplier response and no retry signal: Void "RESERVATION UPDATE IN PROGRESS. RETRY RESERVATION RETRIEVE" and BookAfterHold "DOCUMENT ISSUANCE FAILED. NO RESPONSE RECEIVED FROM VENDOR"** Field: `ErrorCode / Context (TEMPORARY supplier error)`. Expected: A mapped retryable error (for example 503/409 with a RETRY code) and no raw payload; for Void the same request succeeds on resend (it did). **History:** New in Round 2: two transient Emirates-side errors were returned in one hour as unmapped 409 Z9999 (Round 1 did not hit them). **Impact:** Callers cannot distinguish a safe retry from a business refusal; a retry succeeded for the Void, while the failed BookAfterHold left a live hold that had to be cancelled Evidence: Void TransactionId ed81a7bb-64de-4f1e-8648-8d699fa3b6cb (pnr FGJ5BB, retried OK); BookAfterHold TransactionId 7a3e7555-ea44-43ef-8208-ed5a4eb15bf8 (pnr BNRUZT, hold cancelled)
- **[FLOW-V1-09-TPN] BUG-15 (occurrence 3, not new) &mdash; V1 Upselling on TravelportNdc returns upsellOffers[] and no selectedOffer, so it is not the documented drop-in for FareConfirm** Field: `selectedOffer (V1 Upselling)`. Expected: selectedOffer {offerId, priceDetails, ...} alongside upsellOffers[], as SPEC 2.3 and the V1 chaining table describe. **History:** First seen on TravelportNdc V1 2026-08-05 (BUG-08 of that run); SabreNdc V1 Round 2 2026-10-25 (BUG-16); TravelportNdc Round 1 2026-10-26; Round 2 reproduces it. **Impact:** A V1 client following the documented chain cannot take the offer id for Book/Hold from the Upselling response and must pick a tier by hand Evidence: f09_V1 and f11_V1: response keys responseId, supplier, journeys, flightSegments, priceClasses, baggageDetails, upsellOffers

### Unknown-resolutions

- **[TC-VOIDTPN-POS-01]** TravelportNdc V1 Void is now supported and its success contract is {voided:true, voidedTickets:[{ticketStatus:"Voided", ticketNumber, carrierCode}]} (no passengersVoidedAncillaries / emdTickets), 11-18s; V2 adds passengersVoidedAncillaries:null and emdTickets:{} Evidence: POS-01/02, POS-04/05 and all flows, build ndc-integration-stg-ne-5 on 2026-10-27
- **[TC-VOIDTPN-VAL-02]** pnr, bookingToken and gdsPNR are each mandatory on both versions: omitted or empty -&gt; 400 NDC-INT-TEC-A0001 with "PNR is required" / "BookingToken is required" / "GdsPnr is required"; whitespace-only pnr and bookingToken are also 400 Evidence: VAL-01/02/03 and BND-01 variants on V1 and V2
- **[TC-VOIDTPN-BIZ-03]** Void of a held, unticketed TravelportNdc booking is rejected on V1 and V2: 409 NDC-INT-UNC-Z9999 Context BUSINESS_CONFLICT "This booking is on hold and not ticketed. Cancel it with the cancel hold flow instead of voiding it."; the hold stays intact Evidence: h2_V1 775XLR and h2_V2 7762AJ (Round 1: 200 voided:false and the hold was cancelled)
- **[TC-VOIDTPN-BIZ-02]** Void is not idempotent for TravelportNdc: a repeat Void (immediately and after 30s) returns 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." on V1 and V2 Evidence: b1_V1 774MNY and b1_V2 773JKY
- **[TC-CAPCHECK-TPN-02]** voidCapability for a same-day ticketed TravelportNdc booking is FullVoidOnlyAllowed on Book, BookAfterHold and Retrieve (V1 and V2); it is absent on Hold, PnrReprice and the held Retrieve Evidence: b1_V1/V2, h1_V1/V2, f05_V1, f29_V2
- **[TC-VOIDTPN-VAL-06]** voidTickets omitted entirely is treated as void-all on both versions, while null is rejected (400 "The VoidTickets field is required."); string and number elements are 400 errorCode 1001 Evidence: VAL06-omit voided V1 1572141602442 and V2 1572141602440
- **[TC-VOIDTPN-SEC-03]** A TravelportNdc booking cannot be voided through another route: supplier SabreNdc/EGY -&gt; 409 Z9999 "Order not found: orderId=[&lt;bookingToken&gt;]" in ~1s; TravelportNdc with selector EGY -&gt; forwarded to Travelport and refused, 409 Z9999 with empty Context after ~10s Evidence: SEC03a/SEC03b on V1 and V2, bookings intact
- **[TC-VOIDTPN-INT-02]** Retrieve after a TravelportNdc Void is the terminal 409: NDC-INT-BYP-A0003 for Qatar Airways bookings and NDC-INT-UNC-Z9999 with Context ReservationCancelled for Emirates bookings, on V1 and V2; a voided booking and a cancelled hold are indistinguishable Evidence: b1_V1/V2 (QR), f03_V1 and f27_V2 (EK)

### Also re-confirmed

- **[TC-VOIDTPN-NEG-02] BUG-03** &mdash; Another booking's bookingToken voids the booking on V1 and V2 (same root cause as TC-VOIDTPN-BND-01)
- **[FLOW-V1-03-TPN-NEGHOP5] BUG-03** &mdash; The flow's Void hop accepted another booking's bookingToken on V1
- **[FLOW-V2-27-TPN-NEGHOP6] BUG-03** &mdash; The flow's Void hop accepted another booking's bookingToken on V2
- **[TC-VOIDTPN-SEC-04] BUG-04** &mdash; SQL, script-tag and 500-character surName strings all voided the booking on V1 and V2 (same root cause as TC-VOIDTPN-VAL-04)
- **[TC-VOIDTPN-NEG-03] BUG-09** &mdash; A fabricated ticket number or another booking's ticket number in voidTickets voids all tickets of the PNR on V1 and V2 (same root cause as TC-VOIDTPN-BIZ-06)
- **[TC-VOIDTPN-NEG-01] BUG-05** &mdash; The unknown-PNR 409 also echoes OriginalSupplierRequest/OriginalSupplierResponse (same root cause as TC-VOIDTPN-VAL-07)
- **[TC-VOIDTPN-BIZ-02] BUG-05** &mdash; The repeat-Void 409 echoes OriginalSupplierRequest/OriginalSupplierResponse on V1 and V2 (verdict PASS; leak logged under TC-VOIDTPN-VAL-07)
- **[FLOW-V1-11-TPN] BUG-15** &mdash; V1 Upselling returned upsellOffers[] and no selectedOffer in the Family-E upsell flow

### Not reproduced

- **BUG-02** (V1 Void returns 409 OperationNotSupported for TravelportNdc) &mdash; exercised by TC-CAPCHECK-TPN-03, TC-VOIDTPN-POS-01, TC-VOIDTPN-REG-02, FLOW-V1-03-TPN, FLOW-V1-05-TPN, FLOW-V1-09-TPN, FLOW-V1-11-TPN. Exercised on all 80 V1 Void sends for TravelportNdc this round (bookings, flows and variants): all returned the Void handler's real answers (200 voided:true or the 400/409 validations). Never the OperationNotSupported 409. Looks fixed on the ne-5 build; recommend the dev team confirm and close.
- **BUG-07** (Whitespace-only pnr accepted by V2 Void) &mdash; exercised by TC-VOIDTPN-BND-01. A whitespace-only pnr is now a 400 "PNR is required" on V1 and V2 and the booking stays ticketed. Looks fixed; the lower-cased pnr is still accepted, which is harmless because the booking is located by gdsPNR.
- **BUG-08** (Void on a held booking returns 200 voided:false and cancels the hold) &mdash; exercised by TC-VOIDTPN-BIZ-03. Void on a held booking is now rejected with 409 BUSINESS_CONFLICT and the hold survives on V1 and V2 (CancelAfterHold remains the path). Looks fixed.

## Proposed SPEC.md updates

- §2.15 Expected Success Response &mdash; status: *pending*
  - **Old:** "**Expected Success Response**: `UNKNOWN` for a void-eligible booking — not observed this run. `[Confirmed live 2026-08-05, V1/TravelportNdc]`: Void is **not supported** for this supplier at all"
  - **New:** "**Expected Success Response** `[Confirmed live 2026-10-27, TravelportNdc/UAE, V1 and V2, build ndc-integration-stg-ne-5]`: HTTP 200 `{voided: true, voidedTickets: [{ticketStatus: "Voided", ticketNumber, carrierCode}]}` on V1; V2 adds `passengersVoidedAncillaries: null` (defect: should be `{}`) and `emdTickets: {}`; 11-18s. Book ticketing is synchronous (~22-26s), so a same-day Void can follow at once; Void also works for a Hold &gt; BookAfterHold booking. A held, unticketed booking is rejected (409 BUSINESS_CONFLICT), not voided. The 2026-08-05 / 2026-10-26 finding that V1 Void is unsupported for TravelportNdc no longer applies"
  - **Correction:** Supersedes the pending Round 1 proposal: V1 Void now works. From POS-01/02/03/04/05, BIZ-03 and the flows.

- §2.15 Required Request Fields (voidTickets, gdsPNR) &mdash; status: *pending*
  - **Old:** "`voidTickets` (array, empty `[]` in every saved example — `UNKNOWN` exact shape when populated, presumably ticket numbers to selectively void vs. void-all-when-empty)."
  - **New:** "`voidTickets` `[Confirmed live 2026-10-27, TravelportNdc V1 and V2]`: array of `{ticketNumber, carrierCode, ticketStatus}` objects (plain strings and numbers: 400 errorCode 1001); `[]` and an omitted field void every ticket on the PNR, `null` is rejected. DEFECT: the list is not honoured (a subset, a fabricated number and another booking's ticket all void every ticket). `pnr` (max 9 characters), `bookingToken` and `gdsPNR` are mandatory (400 NDC-INT-TEC-A0001 "... is required" when omitted, empty or whitespace). The booking is located by `gdsPNR`; `bookingToken` is only checked for presence (an upper-cased, 1000-character or another booking's token still voids) and `surName` is not validated at all (DEFECTS)"
  - **Correction:** Supersedes the pending Round 1 proposal. From VAL-01/02/03/04/06, BND-01, NEG-02/03, BIZ-06, SEC-04.

- §2.15 Common Errors &mdash; status: *pending*
  - **Old:** "**Common Errors**: voiding outside the void window; voiding a booking whose `voidCapability` was already `"VoidNotAllowed"` at Book time; voiding with an incorrect `surName`."
  - **New:** "**Common Errors** `[Confirmed live 2026-10-27, TravelportNdc V1 and V2]`: repeat Void, Void after CancelAfterHold or on a voided PNR -&gt; 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." (QR) or 409 NDC-INT-UNC-Z9999 context ReservationCancelled (EK); Void of a held booking -&gt; 409 NDC-INT-UNC-Z9999 Context BUSINESS_CONFLICT "...Cancel it with the cancel hold flow..."; unknown record locator -&gt; 409 NDC-INT-UNC-Z9999 "RECORD LOCATOR DOES NOT EXIST" (unmapped, raw supplier payload echoed); missing pnr / bookingToken / gdsPNR / inactive selector -&gt; 400 NDC-INT-TEC-A0001 (PascalCase); missing supplier / credentialsSelector, pnr longer than 9, wrong-type or null voidTickets -&gt; 400 errorCode "1001" (camelCase, leaks .NET type names); auth -&gt; 401 AuthenticationError; other selector -&gt; forwarded to the supplier and refused with an unmapped 409 Z9999; transient Emirates errors -&gt; unmapped 409 Z9999 (retry succeeds). `surName` is NOT checked (defect). The void-window rule (calendar day vs other) is still unconfirmed"
  - **Correction:** Supersedes the pending Round 1 proposal (held-booking behaviour fixed, pnr/bookingToken now validated). From BIZ-02/03/04, NEG-01/04/05, SEC-01/02/03, FLOW-V2-76.

- §2.11 Common Errors (Retrieve after Void) &mdash; status: *pending*
  - **Old:** "retrieving a cancelled booking `[Confirmed live 2026-08-05]` **fails** with HTTP 409, `ErrorCode: NDC-INT-BYP-A0003`"
  - **New:** "retrieving a cancelled **or voided** booking `[Confirmed live 2026-08-05; voided case 2026-10-26 and 2026-10-27 on V1 and V2]` **fails** with HTTP 409, `ErrorCode: NDC-INT-BYP-A0003` (QR) — for Emirates bookings the same condition returns 409 `NDC-INT-UNC-Z9999` with Context `ReservationCancelled`; there is no voided `bookingStatus` / `ticketStatus` to read back"
  - **Correction:** Same proposal as Round 1, now also confirmed on V1 (TC-VOIDTPN-INT-02).

- §4.6 Capability Summary Matrix (TravelPortNDC row) &mdash; status: *pending*
  - **Old:** "| TravelPortNDC | Unknown | Unknown | Supported | Unknown | Unknown | Conditional (2 flags set, type unresolved) | Unknown |"
  - **New:** "| TravelPortNDC | Supported (V1+V2 Upselling 200, 2026-10-27) | Not Supported (haveBundles false on all 53 offers, UAE 2026-10-27) | Supported | Supported (V1+V2 CancelAfterHold confirmed) | **Supported on V1 and V2** (UAE, same-day, confirmed 2026-10-27; Round 1 2026-10-26: V2 only) | Conditional (V2 offerHasAncillary true on 25 of 53 offers; type unresolved) | Unknown |"
  - **Correction:** Supersedes the pending Round 1 proposal (Void now supported on V1 as well). UAE and EGY selectors active, KSA inactive.

- §2.9 Expected Success Response (voidCapability) &mdash; status: *pending*
  - **Old:** "voidCapability,           // e.g. "VoidNotAllowed" — INFERRED a live, booking-specific flag indicating whether Void is currently possible for this PNR (see §2.14)"
  - **New:** "voidCapability,           // e.g. "VoidNotAllowed" — `[Confirmed live 2026-10-27, TravelportNdc]` returned as "FullVoidOnlyAllowed" on Book, BookAfterHold and Retrieve of a same-day ticketed booking (V1 and V2); still NOT returned on Hold, PnrReprice or Retrieve of a held booking (defect); the "VoidNotAllowed" value for an aged ticket is unconfirmed (no previous-day ticket)"
  - **Correction:** Supersedes the pending Round 1 proposal (flag now present on ticketed bookings). From CAPCHECK-02, BIZ-05.

## Cleanup / follow-up

Live artifacts left behind this round (1):

- **needs_void_cancel** &mdash; pnr HNGKX8, HNGKX7, HNGKX4, HNGKX3, HNGKX5, HNGKY3, HNGKY4, HNGKY6, HNGKY2, HNGKY5, HNGKY7, HNGKYK, HNGKYJ, HNGKZM, HNGKZP, HNGKZS, HNGKZR, HNGKZY, HNGKZZ, HNGL00, HNGL08, HNGL09, HNGL0P, HNGL0Z, HNGL10, HNGL11 (TC-CAPCHECK-TPN-02) &mdash; 26 GDS PNRs named in the 409 error text of Book calls that failed during test-data preparation (sold-out offer, flight locked, infant quota exceeded under concurrent bookings): "Booking is still in the hold stage. No ticket has been issued yet. PNR: N/A. GDS PNR: &lt;code&gt;". The API returned no pnr or bookingToken for them, so they cannot be voided or cancelled through it (CancelAfterHold with only the gdsPNR returned 500 ServerError). Whether they are live holds at Travelport is unverified; check the Travelport queue or let them lapse.

