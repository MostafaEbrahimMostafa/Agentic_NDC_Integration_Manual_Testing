# QA Execution Report — TravelportNdc_Void_TestCases.csv (NDC_Integration/TestCases/TravelportNdc_Void_TestCases.csv) - TravelportNdc / UAE - V1 and V2 - 53 test cases

**Environment:** staging (ndc-integration-stg-ne-5) &middot; https://ndc-integration-stg-ne-5.azurewebsites.net/
**Supplier:** TravelportNdc  **Credentials Selector:** UAE
**Started:** 2026-10-26T10:59:25.455Z
**Ended:** 2026-10-26T11:43:24.322Z
**Status:** COMPLETE
**Execution Duration:** 43m 59s ([View Time Breakdown](20261026-105925_TravelportNdc-Void-UAE-V1V2_TimeBreakdown.html))
**Prior runs:** First TravelportNdc Void run (SabreNdc Void run: 2026-10-22) (see NDC_Integration/Artifacts/Logs/)

## Scope note

Verdict rule: V1 Void is not supported for TravelportNdc on this build (TC-CAPCHECK-TPN-03), so for the cases marked "Both" the verdict follows V2 (the version that implements Void); the V1 sends are recorded alongside as evidence and are all 409 OperationNotSupported. V1-only rows (POS-01 and the four V1 flows) therefore FAIL, and the stale-token V1 flow (NEGHOP5) is BLOCKED. Because surName, bookingToken, pnr text and the voidTickets list are not validated on V2, every VAL-02/04, BND-01, NEG-02/03, SEC-04 (surName), BIZ-06 and NEGHOP6 variant voided its booking, so one fresh booking per variant was created (53 TravelportNdc bookings and holds in total, plus 2 SabreNdc bookings for REG-01). BIZ-01 and BND-02 were blocked: the 2026-10-22 leftovers no longer exist at Travelport and a midnight crossing is not possible in one session. Concurrent Holds on the same offer fail with 409 BYP-A0001; the Holds were rerun sequentially. All bookings were voided or cancelled by the end of the run (the 8 V1 bookings through the V2 Void endpoint).

## Summary

- Test cases logged: 53 of 53 planned
- Passed: 28
- Failed: 22
- Blocked: 3
- Failed test cases: TC-CAPCHECK-TPN-02, TC-CAPCHECK-TPN-03, TC-VOIDTPN-POS-01, TC-VOIDTPN-VAL-02, TC-VOIDTPN-VAL-04, TC-VOIDTPN-VAL-07, TC-VOIDTPN-VAL-10, TC-VOIDTPN-BND-01, TC-VOIDTPN-BIZ-03, TC-VOIDTPN-BIZ-05, TC-VOIDTPN-BIZ-06, TC-VOIDTPN-NEG-01, TC-VOIDTPN-NEG-02, TC-VOIDTPN-NEG-03, TC-VOIDTPN-NEG-05, TC-VOIDTPN-SEC-04, TC-VOIDTPN-REG-02, FLOW-V1-03-TPN, FLOW-V1-05-TPN, FLOW-V1-09-TPN, FLOW-V1-11-TPN, FLOW-V2-27-TPN-NEGHOP6
- Blocked test cases: TC-VOIDTPN-BND-02, TC-VOIDTPN-BIZ-01, FLOW-V1-03-TPN-NEGHOP5

## Test case results

### TC-CAPCHECK-TPN-01 — PASS

- **Test Case:** [TravelportNdc][Search] Verify TravelportNdc credentials for credentialsSelector UAE are active and return offers.
- **Category:** Positive
- **Endpoint Name:** Search (V1 + V2)
- **Request:** V1 and V2 Search, TravelportNdc/UAE, one-way CAI-&gt;JED 2026-11-12, 1 ADT, isdebug=false
- **Response:** V1 200 (3.9s) and V2 200 (2.4s), 53 offers each, all QR, total 950 AED for the first offer. canBeHeld=true 53/53, haveBundles=false 53/53. V2 offerHasAncillary=true on 25/53 offers, offerHasSeat=true, isSeatMapRequired=false on all.
- **Expected:** HTTP 200 on both versions with non-empty offers[]; no credentials error; canBeHeld=true expected so Hold-based cases are runnable; haveBundles=false so Bundle+Void flows are out of scope
- **Actual:** Both versions 200 with 53 offers. canBeHeld 53/53 (Hold cases runnable), haveBundles 0/53 (Bundle+Void flows out of scope). Baseline was 67 offers on 2026-08-05; the count differs because the date and the live inventory differ. V2 offerHasAncillary is now true on 25 offers (SPEC 4.6 Ancillary cell was Conditional), so an ANC + Void flow could now be scheduled; V1 Search does not return that flag at all.
- **Status:** PASS
- **Evidence:** V1 keys: offerId, offerJourneys, passengerFareBreakdown, priceDetails, refundability, haveBundles, canBeHeld. V2 adds isDealCodeApplied, offerHasAncillary, offerHasSeat, isSeatMapRequired, ...

  - **Attempt 1 of 2 - V1 Search:** HTTP 200
  - **Attempt 2 of 2 - V2 Search:** HTTP 200

### TC-CAPCHECK-TPN-04 — PASS

- **Test Case:** [TravelportNdc][Search] Verify which credentialsSelector values (UAE, EGY, KSA) are active for TravelportNdc.
- **Category:** Positive
- **Endpoint Name:** Search (V2)
- **Request:** V2 Search, supplier TravelportNdc, credentialsSelector UAE, EGY and KSA in turn, CAI-&gt;JED 2026-11-12, 1 ADT
- **Response:** UAE 200 53 offers; EGY 200 48 offers; KSA 400 {ErrorCode:NDC-INT-TEC-A0001, Context PredicateValidator: "The credentials for the selected supplier do not exist or are not active..."}
- **Expected:** UAE active (baseline). EGY and KSA recorded as active/inactive; inactive selectors return the credentials 400
- **Actual:** UAE active, EGY ACTIVE (48 offers), KSA inactive with the documented credentials 400. NEG-04 therefore uses KSA as the inactive selector; EGY is an active second selector, so SEC-03(b) is runnable.
- **Status:** PASS
- **Evidence:** KSA TransactionId b7b0d9af-c892-4c3a-9f9e-3694b0065834

  - **Attempt 1 of 3 - UAE:** HTTP 200
  - **Attempt 2 of 3 - EGY:** HTTP 200
  - **Attempt 3 of 3 - KSA:** HTTP 400

### TC-CAPCHECK-TPN-02 — FAIL

- **Test Case:** [TravelportNdc][Book][Response] Verify a TravelportNdc Book returns synchronously issued ticket numbers and records the voidCapability value.
- **Category:** Positive
- **Endpoint Name:** Search &gt; FareConfirm &gt; (AddPassenger) &gt; Book &gt; Retrieve (V1 + V2)
- **Request:** V1: Search &gt; FareConfirm &gt; Book (1 ADT Mostafa Ibrahim, CAI-JED 2026-11-12) &gt; RetrieveBooking. V2: Search &gt; FareConfirm &gt; AddPassenger &gt; Book &gt; Retrieve
- **Response:** V1 Book 200 (16.5s) pnr 72HIJQ, gdsPNR HNGC0J, bookingToken 47978ebc-cce3-4bb1-8280-0fc0f14beb82, ticket 1572141427279 Booked. V2 Book 200 (16.0s) pnr 72HZA2, gdsPNR HNGC0L, bookingToken f6a6694b-da62-4b57-a167-a611cc0e304b, ticket 1572141427280 Booked. No voidCapability in any Book or Retrieve body
- **Expected:** 200; pnr, gdsPNR, bookingToken non-empty; tickets[] with ticketStatus Booked; record whether voidCapability is present and its enum value; if absent, log it as a recurrence of the missing-voidCapability defect
- **Actual:** Tickets issued synchronously on both versions (~16s, down from ~28s on 2026-08-05; QR carrier, ticketingDate 2026-10-26). voidCapability is ABSENT from Book and Retrieve on V1 and V2, so the void-allowed baseline cannot be recorded: recurrence of the missing-voidCapability defect on TravelportNdc (first seen 2026-08-05; also SabreNdc 2026-10-22/25 until a later build)
- **Status:** FAIL
- **Evidence:** Key lists of both Book bodies contain no voidCapability; Retrieve (V1 and V2) also lacks it. tickets is an object map keyed travelerRefId_N, not an array

  - **Hop 1 &mdash; V1 Search (B1):** PASS &mdash; 200
  - **Hop 2 &mdash; V1 FareConfirm (B1):** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Book (B1):** FAIL &mdash; 200 (16.5s) - pnr 72HIJQ, gdsPNR HNGC0J, bookingToken 47978ebc-..., tickets {travelerRefId_1: 1572141427279 Booked, QR}, ticketingDate 2026-10-26T11:00:42
  - **Hop 4 &mdash; V1 Retrieve (B1-pre):** FAIL &mdash; 200 - ticket 1572141427279 Booked, no voidCapability, no bookingStatus
  - **Hop 5 &mdash; V2 Search (B1):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 FareConfirm (B1):** PASS &mdash; 200
  - **Hop 7 &mdash; V2 AddPassenger (B1):** PASS &mdash; 200
  - **Hop 8 &mdash; V2 Book (B1):** FAIL &mdash; 200 (16.0s) - pnr 72HZA2, gdsPNR HNGC0L, bookingToken f6a6694b-..., tickets {travelerRefId_1: 1572141427280 Booked, QR}, ticketingDate 2026-10-26T11:00:43
  - **Hop 9 &mdash; V2 Retrieve (B1-pre):** FAIL &mdash; 200 - ticket 1572141427280 Booked, no voidCapability

### TC-CAPCHECK-TPN-03 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify Void for a ticketed TravelportNdc booking is no longer rejected as OperationNotSupported.
- **Category:** Positive
- **Endpoint Name:** Void (V1 + V2)
- **Request:** Void straight after Book, voidTickets=[], surName Ibrahim: V1 on 72HIJQ (sent twice), V2 on 72HZA2
- **Response:** V1: 409 OperationNotSupported, Context "TravelportNdc does not exists" (both attempts, ~0.4-0.9s). V2: 200 {voided:true, voidedTickets:[{ticketStatus:Voided, ticketNumber:1572141427280, carrierCode:QR}], passengersVoidedAncillaries:null, emdTickets:{}} in 13.1s
- **Expected:** Neither version returns the 2026-08-05 baseline (409 OperationNotSupported, "TravelportNdc does not exists"); Void is routed to a TravelportNdc handler
- **Actual:** V2 is routed and voids the ticket (feature present). V1 Void is STILL the 2026-08-05 baseline 409 OperationNotSupported on this build, so the V1 path lacks the TravelportNdc handler. The V1 booking stayed ticketed (Retrieve: ticket 1572141427279 Booked)
- **Status:** FAIL
- **Evidence:** V1 TransactionId fc7546a6-a82b-4e1c-9424-a66c1614defe and fb13b0d5-3f07-4f9c-8752-0d9aff1bbf01; V2 200 body above; V2 Retrieve afterwards 409 NDC-INT-BYP-A0003 "Reservation is already cancelled."

  - **Attempt 1 of 3 - V1 Void:** HTTP 409
  - **Attempt 2 of 3 - V1 Void (retry):** HTTP 409
  - **Attempt 3 of 3 - V2 Void:** HTTP 200

### TC-VOIDTPN-POS-01 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify V1 Void succeeds for a TravelportNdc booking ticketed the same calendar day.
- **Category:** Positive
- **Endpoint Name:** Void (V1)
- **Request:** V1 Book 1 ADT (pnr 72HIJQ, gdsPNR HNGC0J, ticket 1572141427279) then POST api/FlightBooking/Void {supplier TravelportNdc, credentialsSelector UAE, pnr, gdsPNR, bookingToken, surName Ibrahim, voidTickets []}, sent twice; then RetrieveBooking
- **Response:** Book 200 (16.5s). Void 409 both times (0.9s, 0.4s): {Status:409, ErrorCode:OperationNotSupported, ErrorMessage:"This action is not currently supported by the selected supplier.", Context:[{Name:OperationNotSupported, Value:"TravelportNdc does not exists"}]}. Retrieve 200 ticket Booked
- **Expected:** HTTP 2xx with Void succeeded (voided=true and the voided ticket listed). Not an error envelope, no raw Travelport payload. Reference contract = SabreNdc Void observed 2026-10-22: {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]}, V2 also passengersVoidedAncillaries[] and emdTickets[]; SPEC §2.15 still marks the shape UNKNOWN, so record the TravelportNdc shape as its own baseline.
- **Actual:** The V1 Void endpoint is not routed to a TravelportNdc handler on this build: it returns the 2026-08-05 baseline 409 OperationNotSupported instead of a void success. The ticket stays live (Retrieve: 1572141427279 Booked). The same V1 request shape voids a SabreNdc booking in ~10s (TC-VOIDTPN-REG-01), so the V1 route itself works.
- **Status:** FAIL
- **Evidence:** V1 Void TransactionIds fc7546a6-a82b-4e1c-9424-a66c1614defe and fb13b0d5-3f07-4f9c-8752-0d9aff1bbf01; V2 Void on the same build voids (TC-VOIDTPN-POS-02). Success contract could not be recorded for V1.

  - **Attempt 1 of 4 - V1 Book (1 ADT, pnr 72HIJQ):** HTTP 200
  - **Attempt 2 of 4 - V1 Void straight after Book:** HTTP 409
  - **Attempt 3 of 4 - V1 Void again:** HTTP 409
  - **Attempt 4 of 4 - V1 Retrieve after the refused Void:** HTTP 200

### TC-VOIDTPN-POS-02 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify V2 Void succeeds for a TravelportNdc booking ticketed the same calendar day.
- **Category:** Positive
- **Endpoint Name:** Void (V2)
- **Request:** V2 Search &gt; FareConfirm &gt; AddPassenger &gt; Book 1 ADT (pnr 72HZA2, gdsPNR HNGC0L, bookingToken f6a6694b-..., ticket 1572141427280) then POST api/V2/FlightBooking/Void {supplier, credentialsSelector UAE, pnr, gdsPNR (real), bookingToken, surName Ibrahim, voidTickets []}; then Retrieve
- **Response:** Void 200 in 13.1s: {voided:true, voidedTickets:[{ticketStatus:"Voided", ticketNumber:"1572141427280", carrierCode:"QR"}], passengersVoidedAncillaries:null, emdTickets:{}}. Retrieve 409 NDC-INT-BYP-A0003 "Reservation is already cancelled."
- **Expected:** HTTP 2xx with Void succeeded and the voided tickets listed; V2-only fields (passengersVoidedAncillaries, emdTickets) present and empty for a no-ancillary booking. Reference contract = SabreNdc Void observed 2026-10-22: {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]}, V2 also passengersVoidedAncillaries[] and emdTickets[]; SPEC §2.15 still marks the shape UNKNOWN, so record the TravelportNdc shape as its own baseline.
- **Actual:** Void succeeds on V2 and lists the voided ticket. emdTickets is an empty object; passengersVoidedAncillaries is null, not an empty collection (checked on its own in TC-VOIDTPN-VAL-10). Recorded V2 success contract for TravelportNdc: {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}], passengersVoidedAncillaries, emdTickets}, same field names as the SabreNdc contract.
- **Status:** PASS
- **Evidence:** First V2 TravelportNdc Void success (build ndc-integration-stg-ne-5, 2026-10-26). Void takes 11-17s (SabreNdc ~10s).

  - **Attempt 1 of 3 - V2 Book (1 ADT, pnr 72HZA2):** HTTP 200
  - **Attempt 2 of 3 - V2 Void straight after Book:** HTTP 200
  - **Attempt 3 of 3 - V2 Retrieve after Void:** HTTP 409

### TC-VOIDTPN-POS-03 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void succeeds for a TravelportNdc booking ticketed via Hold then BookAfterHold on the same day.
- **Category:** Positive
- **Endpoint Name:** Search &gt; FareConfirm &gt; (AddPassenger) &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void (V1 + V2)
- **Request:** V1 (pnr 72IJB4) and V2 (pnr 72IAF3, gdsPNR HNGC9J, bookingToken 0a7aa501-...) Hold, FareConfirmAfterHold (PnrReprice), Retrieve, BookAfterHold, Retrieve, then Void the same day
- **Response:** V2: Hold 200 (hold until 2026-11-02T21:59:00+02:00), PnrReprice 200 (total 950), Retrieve OnHold, BookAfterHold 200 in 17.5s (ticket 1572141427322 Booked, ticketingDate 2026-10-26T11:14:09), Retrieve Booked, Void 200 voided:true in 12.4s, Retrieve 409 already cancelled. V1: same chain up to BookAfterHold (ticket 1572141427323), Void 409 OperationNotSupported
- **Expected:** HTTP 2xx with the same success shape as POS-01/02 (per version). pnr/gdsPNR/bookingToken unchanged since Hold (same-PNR invariant), and Void behaves identically for a booking that started as a Hold.
- **Actual:** V2: Void succeeds for a booking that started as a Hold, with the same success shape as POS-02; pnr, gdsPNR and bookingToken are unchanged from Hold through BookAfterHold and Void (same-PNR invariant holds). Timestamps: Hold response received 11:13:33Z, BookAfterHold ticketingDate 2026-10-26T11:14:09 (the void window is measured from this ticketing time, not from the Hold), Void sent at 11:14:xx the same day; the Hold carries no creation date field. V1: the Hold and BookAfterHold hops work but Void is refused with 409 OperationNotSupported (see TC-CAPCHECK-TPN-03), so the V1 ticket 1572141427323 was left live and voided later through the V2 endpoint during cleanup. Verdict follows V2.
- **Status:** PASS
- **Evidence:** V2 BookAfterHold body keys: supplier,pnr,gdsPNR,bookingToken,creationDate,ticketingDate,tickets,passengersSelectedAncillaries,passengersSelectedSeats,... no voidCapability (see CAPCHECK-02)

  - **Hop 1 &mdash; V1 Search (h1_V1):** PASS &mdash; 200 {"responseId":"7481a8bd-9d59-4cf6-bda1-fb14d98de897","supplier":"TravelportNdc","journeys":{"EKs5?EKs10":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs5","EKs10"]},"EKs6?E
  - **Hop 2 &mdash; V1 FareConfirm (h1_V1):** PASS &mdash; 200 {"responseId":"15d2f56e-3f1e-4cbc-9191-9463ef6138c9","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Hold (h1_V1):** PASS &mdash; 200 {"holdExpirationDate":"2026-11-02T21:59:00Z","supplier":"TravelportNdc","pnr":"72IJB4","gdsPNR":"HNGC8M","bookingToken":"dd7e948f-e464-48fe-ae6d-2f8c6eaad476","journeys":{"seg1?seg2":{"origin":"CAI","
  - **Hop 4 &mdash; V1 PnrReprice (FCAH):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"seg1?seg2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["seg1","seg2"]}},"flightSegments":{"seg1":{"origin":"CAI","destination":"DOH"
  - **Hop 5 &mdash; V1 Retrieve (after-hold):** PASS &mdash; 200 {"tickets":{},"creationDate":"2026-10-26T00:00:00","fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-02T21:59:00","pcc":"","supplier":"TravelportNdc","pnr":"72IJB4","gdsP
  - **Hop 6 &mdash; V1 BookAfterHold (BAH):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1572141427323","carrierCode":"QR"}},"creationDate":"2026-10-26T00:00:00","isBspCommissionApplied":false,"supplier":"TravelportNdc
  - **Hop 7 &mdash; V1 Retrieve (after-BAH):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1572141427323","carrierCode":"QR"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:14:00","fareType":null,"b
  - **Hop 8 &mdash; V1 Void (POS03):** FAIL &mdash; 409 {"Status":409,"TransactionId":"d434dc09-e9f2-41e2-9a6c-40e31a5d739d","ErrorCode":"OperationNotSupported","ErrorMessage":"This action is not currently supported by the selected supplier.","Context":[{"
  - **Hop 9 &mdash; V1 Retrieve (after-void):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1572141427323","carrierCode":"QR"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:14:00","fareType":null,"b
  - **Hop 10 &mdash; V2 Search (h1_V2):** PASS &mdash; 200 {"responseId":"1e00bc99-8030-4eb4-b377-a6f68afeeac8","supplier":"TravelportNdc","journeys":{"EKs15?EKs7":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs15","EKs7"]},"EKs12?
  - **Hop 11 &mdash; V2 FareConfirm (h1_V2):** PASS &mdash; 200 {"responseId":"7d769d9a-4b26-4ba2-9a1d-e1e536c2ee69","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 12 &mdash; V2 AddPassenger (h1_V2):** PASS &mdash; 200 {"offerId":"65f67601-6f60-44e5-aa6c-a7024f830b37&amp;yAITY9IAAAJP9rSf2SQwYTdhYTUwMS1iMDJhLTRlMTctOTY3OC0yZjhhMDU5YTBmODPZJDY1ZjY3NjAxLTZmNjAtNDRlNS1hYTZjLWE3MDI0ZjgzMGIzN5GSp1FSX0NQTzCRkaRRUnAwAQAAkZSvRUN
  - **Hop 13 &mdash; V2 Hold (h1_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"72IAF3","gdsPNR":"HNGC9J","bookingToken":"0a7aa501-b02a-4e17-9678-2f8a059a0f83","holdExpirationDate":"2026-11-02T21:59:00+02:00","passengersSelectedAncillaries":null
  - **Hop 14 &mdash; V2 PnrReprice (FCAH):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"seg1?seg2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["seg1","seg2"]}},"flightSegments":{"seg1":{"origin":"CAI","destination":"DOH"
  - **Hop 15 &mdash; V2 Retrieve (after-hold):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-02T21:59:00+02:00","bookingStatus":"OnHold","pcc":"","supplier":"TravelportNdc","pnr":"72IAF3","gdsPNR":"HNGC9J","booki
  - **Hop 16 &mdash; V2 BookAfterHold (BAH):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"72IAF3","gdsPNR":"HNGC9J","bookingToken":"0a7aa501-b02a-4e17-9678-2f8a059a0f83","creationDate":null,"ticketingDate":"2026-10-26T11:14:09","tickets":{"travelerRefId_1
  - **Hop 17 &mdash; V2 Retrieve (after-BAH):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"72IAF3","gdsPNR":"HNGC9J","bookingToken":"0a7aa501-b02a
  - **Hop 18 &mdash; V2 Void (POS03):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141427322","carrierCode":"QR"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 19 &mdash; V2 Retrieve (after-void):** PASS &mdash; 409 {"Status":409,"TransactionId":"e9d5ecf2-44a2-4ce1-98c5-6c0443ed8672","ErrorCode":"NDC-INT-BYP-A0003","ErrorMessage":"Reservation is already cancelled.","Context":[{"Name":"TERMINAL","Value":"RESERVATI

### TC-VOIDTPN-POS-04 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void of a multi-passenger TravelportNdc booking (ADT+CHD+INF) voids every ticket on the PNR.
- **Category:** Positive
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2: Book 1 ADT + 1 CHD + 1 INF (3 tickets 1572141427283/-284/-285), Retrieve, Void with voidTickets [], Retrieve. V1: same booking shape (pnr 72HE26, tickets 294/295/296) and Void with voidTickets []
- **Response:** V2 Void 200 in 16.2s: voided:true, voidedTickets lists all 3 tickets (1572141427284, 1572141427283, 1572141427285, carrier QR, ticketStatus Voided). Retrieve after: 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." V1 Void 409 OperationNotSupported
- **Expected:** Void succeeds; voidedTickets lists all 3 tickets (including the infant ticket); Retrieve shows every ticket in a voided state - none left active. Exact voided-state signal UNKNOWN (see TC-VOIDTPN-INT-02).
- **Actual:** V2: voidTickets=[] means void-all: all 3 tickets including the infant ticket are voided and the PNR is cancelled, none left active. The per-ticket voided state cannot be read back afterwards because Retrieve of a voided PNR returns the terminal 409 (INT-02). V1: refused (409 OperationNotSupported); the V1 booking was voided via V2 during cleanup.
- **Status:** PASS
- **Evidence:** Ticket numbers voided: 1572141427284, 1572141427283, 1572141427285 = the 3 tickets from Book

  - **Attempt 1 of 6 - V2 Book 1 ADT + 1 CHD + 1 INF (pnr 72HQ4K):** HTTP 200
  - **Attempt 2 of 6 - V2 Retrieve before Void (3 tickets Booked):** HTTP 200
  - **Attempt 3 of 6 - V2 Void voidTickets []:** HTTP 200
  - **Attempt 4 of 6 - V2 Retrieve after Void:** HTTP 409
  - **Attempt 5 of 6 - V1 Book 1 ADT + 1 CHD + 1 INF (pnr 72HE26):** HTTP 200
  - **Attempt 6 of 6 - V1 Void voidTickets []:** HTTP 409

### TC-VOIDTPN-POS-05 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with voidTickets explicitly listing every ticket number on the PNR.
- **Category:** Positive
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2: Void on 72HDNZ with voidTickets = [{ticketNumber, carrierCode, ticketStatus} x3]; also voidTickets [&lt;plain ticket-number string&gt;] and [123] on fresh bookings. V1: same objects on 72HE26
- **Response:** V2 object list: 200 in 15.5s, voidedTickets lists all 3 (1572141427287, -286, -288), same as void-all. Plain string element: 400 errorCode 1001 "The JSON value could not be converted to ...TicketType. Path: $.voidTickets[0]". [123]: same 400. V1: 409 OperationNotSupported
- **Expected:** Behaves identically to voidTickets=[] (all tickets voided). Record the accepted element shape of voidTickets (plain string vs object) - SPEC §2.15 marks it UNKNOWN.
- **Actual:** V2: an explicit full list behaves exactly like voidTickets [] (all tickets voided). Accepted element shape recorded: an OBJECT {ticketNumber, carrierCode, ticketStatus}; plain strings and numbers are rejected with a 400 that names $.voidTickets[0] and not a 500 (the message also leaks the internal type name, see VAL-07). V1: refused as unsupported.
- **Status:** PASS
- **Evidence:** Element shape = TicketType object (same as SabreNdc, 2026-10-22)

  - **Attempt 1 of 6 - V2 Book 1 ADT + 1 CHD + 1 INF (pnr 72HDNZ):** HTTP 200
  - **Attempt 2 of 6 - V2 Retrieve before Void:** HTTP 200
  - **Attempt 3 of 6 - V2 Void with all 3 ticket objects:** HTTP 200
  - **Attempt 4 of 6 - V2 Void with a plain-string element (fresh booking 72K4Z4):** HTTP 400
  - **Attempt 5 of 6 - V2 Void with a numeric element [123] (fresh booking):** HTTP 400
  - **Attempt 6 of 6 - V1 Void with all 3 ticket objects (pnr 72HE26):** HTTP 409

### TC-VOIDTPN-VAL-01 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate missing or empty pnr is rejected before reaching TravelportNdc.
- **Category:** Validation
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** Void on ticketed 72M86G (V2) with pnr omitted, then pnr ''; Retrieve. Same two requests on V1 (72HIJQ)
- **Response:** V2: both 400 in 0.1-0.4s, PascalCase envelope {Status:400, ErrorCode:NDC-INT-TEC-A0001, ErrorMessage:"Invalid request. Please check the request parameters and try again.", Context:[{Name:PredicateValidator, Value:"PNR is required"}]}. Retrieve 200, ticket 1572141427325 Booked. V1: both 409 OperationNotSupported
- **Expected:** HTTP 400 with the standard error envelope {Status, TransactionId, ErrorCode=ValidationError, ErrorMessage, Context naming pnr}; no 500. Real booking remains ticketed (not voided).
- **Actual:** V2: a missing or empty pnr is rejected before reaching Travelport with a 400 naming the PNR; the booking is still ticketed. V1: the request never gets as far as validation, the unsupported-supplier 409 comes first.
- **Status:** PASS
- **Evidence:** V2 TransactionIds 30824e84-0082-4f32-bc8f-6233d92332d9 and ba55727c-b125-4f27-9341-875620ab9bf2; ErrorCode is NDC-INT-TEC-A0001 (not the string ValidationError the case quotes)

  - **Attempt 1 of 5 - V2 Void, pnr omitted:** HTTP 400
  - **Attempt 2 of 5 - V2 Void, pnr '':** HTTP 400
  - **Attempt 3 of 5 - V2 Retrieve (booking intact):** HTTP 200
  - **Attempt 4 of 5 - V1 Void, pnr omitted:** HTTP 409
  - **Attempt 5 of 5 - V1 Void, pnr '':** HTTP 409

### TC-VOIDTPN-VAL-02 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate missing or empty bookingToken is rejected.
- **Category:** Validation
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void with bookingToken omitted (booking 72IAMX) and bookingToken '' (booking 72IEZ9); Retrieve each. V1: same on 72HIJQ
- **Response:** V2: BOTH return 200 voided:true in ~12s (tickets 1572141427282 and 1572141427298 Voided); Retrieve then 409 already cancelled. V1: 409 OperationNotSupported
- **Expected:** HTTP 400 ValidationError in the standard envelope; booking not voided.
- **Actual:** The booking token is not validated: a Void with no token, or an empty one, is accepted and cancels the ticket. The booking is found from gdsPNR alone (see BND-01 and NEG-02). Expected a 400 ValidationError naming bookingToken with the booking left ticketed.
- **Status:** FAIL
- **Evidence:** Retrieve after each Void: 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." (booking consumed; a fresh PNR was booked for the empty-string variant)

  - **Attempt 1 of 6 - V2 Void, bookingToken omitted (pnr 72IAMX):** HTTP 200
  - **Attempt 2 of 6 - V2 Retrieve afterwards:** HTTP 409
  - **Attempt 3 of 6 - V2 Void, bookingToken '' (fresh booking 72IEZ9):** HTTP 200
  - **Attempt 4 of 6 - V2 Retrieve afterwards:** HTTP 409
  - **Attempt 5 of 6 - V1 Void, bookingToken omitted:** HTTP 409
  - **Attempt 6 of 6 - V1 Void, bookingToken '':** HTTP 409

### TC-VOIDTPN-VAL-03 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate whether gdsPNR is mandatory for TravelportNdc Void (empty string as in the V2 saved example).
- **Category:** Validation
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void with gdsPNR '' (as in the saved V2 example) on 72IL2M and with gdsPNR omitted on 72HPIB; Retrieve each. V1: same on 72HIJQ
- **Response:** V2: both 400 in ~0.1s PascalCase envelope {Status:400, ErrorCode:NDC-INT-TEC-A0001, ErrorMessage:"Invalid request. Please check the request parameters and try again.", Context:[{Name:PredicateValidator, Value:"GdsPnr is required"}]}; both bookings still Booked (tickets 1572141427299 and 1572141427300). V1: 409 OperationNotSupported
- **Expected:** Confirm live: either (a) rejected with 400 ValidationError naming gdsPNR (mandatory for GDS-routed TravelportNdc), or (b) Void succeeds because the integration resolves the record locator from pnr/bookingToken. A 500 or a generic Travelport fault is a defect. Record which.
- **Actual:** Answer to the open SPEC question: gdsPNR IS mandatory for TravelportNdc Void (outcome (a)); an empty or missing value is rejected with a 400 naming GdsPnr, no 500. Unlike SabreNdc (which accepted ""), the saved V2 example with gdsPNR "" cannot be used for TravelportNdc. gdsPNR is also the field the booking is looked up by.
- **Status:** PASS
- **Evidence:** V2 TransactionIds 5e818017-0f00-4b58-901e-903529cf3d40 (empty) and 80766854-3eda-454b-9227-fe5f9427d863 (omitted)

  - **Attempt 1 of 6 - V2 Void, gdsPNR '' (booking 72IL2M):** HTTP 400
  - **Attempt 2 of 6 - V2 Retrieve (intact):** HTTP 200
  - **Attempt 3 of 6 - V2 Void, gdsPNR omitted (booking 72HPIB):** HTTP 400
  - **Attempt 4 of 6 - V2 Retrieve (intact):** HTTP 200
  - **Attempt 5 of 6 - V1 Void, gdsPNR '':** HTTP 409
  - **Attempt 6 of 6 - V1 Void, gdsPNR omitted:** HTTP 409

### TC-VOIDTPN-VAL-04 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with a surName that does not match any passenger on the PNR is rejected.
- **Category:** Validation
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void with surName 'Mismatch' (booking 72J5K8, real surname Ibrahim) and with surName omitted (72IQPE); Retrieve each. V1: same on 72HIJQ
- **Response:** V2: BOTH 200 voided:true in ~12s (tickets 1572141427297 and 1572141427301 Voided); Retrieve then 409 already cancelled. V1: 409 OperationNotSupported
- **Expected:** Wrong surName: rejected with a 4xx standard envelope, booking not voided (SPEC §2.15 Common Errors). Omitted surName: confirm live whether mandatory for TravelportNdc and record the result.
- **Actual:** The passenger-identity check does not exist: a surname that matches no passenger, or no surname at all, voids the ticket. A caller holding only a gdsPNR can void a booking it cannot otherwise identify. Recurrence of the SabreNdc surName defect (2026-10-22) on TravelportNdc.
- **Status:** FAIL
- **Evidence:** surName is also ignored for the SEC-04 injection strings (they all voided, one fresh booking each)

  - **Attempt 1 of 6 - V2 Void, surName 'Mismatch' (booking 72J5K8):** HTTP 200
  - **Attempt 2 of 6 - V2 Retrieve afterwards:** HTTP 409
  - **Attempt 3 of 6 - V2 Void, surName omitted (booking 72IQPE):** HTTP 200
  - **Attempt 4 of 6 - V2 Retrieve afterwards:** HTTP 409
  - **Attempt 5 of 6 - V1 Void, surName 'Mismatch':** HTTP 409
  - **Attempt 6 of 6 - V1 Void, surName omitted:** HTTP 409

### TC-VOIDTPN-VAL-05 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate missing supplier or credentialsSelector is rejected.
- **Category:** Validation
- **Endpoint Name:** Void (V2 and V1)
- **Request:** Void on 72M86G (V2) with supplier omitted, then credentialsSelector omitted; Retrieve. Same on V1 (72HIJQ)
- **Response:** V2 and V1: both 400 in ~0.1s, camelCase envelope {status:400, errorCode:"1001", errorMessage:"Validation errors occurred. Please check your request.", context:[{name:"Supplier", value:"Select a valid Supplier"}] / [{name:"CredentialsSelector", value:"Select a valid CredentialsSelector"}]}. Retrieve 200 Booked
- **Expected:** HTTP 400 ValidationError naming the missing field; no default supplier/selector silently applied; booking not voided.
- **Actual:** A missing supplier or credentialsSelector is rejected on both versions with a 400 naming the missing field; no default is silently applied and the booking is still ticketed. Note the second envelope casing (see NEG-05).
- **Status:** PASS
- **Evidence:** V2 TransactionIds 9023f2f1-435b-447b-9ff3-c9c40d27e145 and be668b50-7252-4c51-aed0-49c051ccbb83

  - **Attempt 1 of 5 - V2 Void, supplier omitted:** HTTP 400
  - **Attempt 2 of 5 - V2 Void, credentialsSelector omitted:** HTTP 400
  - **Attempt 3 of 5 - V2 Retrieve (intact):** HTTP 200
  - **Attempt 4 of 5 - V1 Void, supplier omitted:** HTTP 400
  - **Attempt 5 of 5 - V1 Void, credentialsSelector omitted:** HTTP 400

### TC-VOIDTPN-VAL-06 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate voidTickets of the wrong type (string, null, number elements) is rejected.
- **Category:** Validation
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void with voidTickets = bare string, null, [123], and omitted, each on its own fresh booking; Retrieve. V1: same on 72HIJQ
- **Response:** V2: string, null and [123] each 400 in ~0.1s (camelCase envelope errorCode 1001; names $.voidTickets / VoidTickets / $.voidTickets[0]); bookings still Booked. Omitted: 200 voided:true in 11.6s (booking 72I62S voided). V1: string/null/[123] same 400; omitted 409 OperationNotSupported
- **Expected:** Wrong-type variants: HTTP 400 ValidationError naming voidTickets, not 500; booking not voided. Omitted/null voidTickets: confirm live whether treated as void-all or rejected, and record it.
- **Actual:** Wrong types are rejected with a 400 that names voidTickets, never a 500, booking untouched. Recorded: null is REJECTED ("The VoidTickets field is required"), an OMITTED voidTickets is treated as void-all (200). The 400 text leaks the internal type names (see VAL-07).
- **Status:** PASS
- **Evidence:** Bare string: "The JSON value could not be converted to System.Collections.Generic.ICollection..."; [123]: "...could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType"

  - **Attempt 1 of 8 - V2 voidTickets '1572134824863' (bare string):** HTTP 400
  - **Attempt 2 of 8 - V2 voidTickets null:** HTTP 400
  - **Attempt 3 of 8 - V2 voidTickets [123]:** HTTP 400
  - **Attempt 4 of 8 - V2 voidTickets omitted:** HTTP 200
  - **Attempt 5 of 8 - V2 Retrieve after the omitted variant:** HTTP 409
  - **Attempt 6 of 8 - V1 voidTickets bare string:** HTTP 400
  - **Attempt 7 of 8 - V1 voidTickets null:** HTTP 400
  - **Attempt 8 of 8 - V1 voidTickets omitted:** HTTP 409

### TC-VOIDTPN-VAL-07 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify the Void response follows the integration contract and does not expose raw TravelportNdc payloads.
- **Category:** Validation
- **Endpoint Name:** Void (V2)
- **Request:** Inspected the Void success body and four failure bodies field by field for Travelport structures, credentials, PCC/branch codes and .NET type names
- **Response:** Success: integration fields only. 400 failures: camelCase envelope with originalSupplierRequest/Response null but the context text names .NET types (NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType, System.Collections.Generic.ICollection..., "voidRequestDto field is required"). 409 failures: PascalCase envelope with OriginalSupplierRequest and OriginalSupplierResponse carrying the raw Travelport reply (ReservationResponse / ReceiptListResponse JSON incl. traceId, transactionId, carrier codes)
- **Expected:** Success: integration-defined fields only (shape recorded as baseline, same field names and types as the existing contract). Failure: standard envelope {Status, TransactionId, ErrorCode, ErrorMessage, Context}, Status equal to the HTTP code, TransactionId a GUID. No raw Travelport payload, no credentials, no DTO type names in Context.
- **Actual:** The success body is clean. Failure bodies are not: the known DTO-name leak is now on TravelportNdc Void, and every supplier-side 409 returns the raw Travelport request and response in the API reply. A scan of those payloads for credentials, PCC/branch codes and passwords found none, but raw supplier internals still reach the caller. (SEC-03(b) additionally shows a Void under the wrong credential set is forwarded to Travelport and refused there.)
- **Status:** FAIL
- **Evidence:** Same classes as SabreNdc Void 2026-10-22 (DTO leak and BUG-05 raw payload). Payloads redacted in this log per SPEC.md §7.14

  - **Attempt 1 of 5 - V2 Void success body (72HZA2):** HTTP 200
  - **Attempt 2 of 5 - V2 400 validation failure (voidTickets [123]):** HTTP 400
  - **Attempt 3 of 5 - V2 409 Void of an unknown PNR:** HTTP 409
  - **Attempt 4 of 5 - V2 409 Void of a cancelled hold:** HTTP 409
  - **Attempt 5 of 5 - V2 409 Void under the EGY credentials (raw supplier payload):** HTTP 409

### TC-VOIDTPN-VAL-08 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify the voided ticket numbers and carrier code echo the Book response unchanged.
- **Category:** Validation
- **Endpoint Name:** Void (V2)
- **Request:** Compared Book.tickets (ADT+CHD+INF booking 72HQ4K) with Void.voidedTickets field by field
- **Response:** Book tickets 1572141427284, 1572141427283, 1572141427285 (carrier QR); Void voidedTickets 1572141427284, 1572141427283, 1572141427285 (carrier QR, ticketStatus Voided)
- **Expected:** Same ticket numbers (no truncation, no re-formatting), same carrierCode (QR in the 2026-08-05 run), count equals the passenger count; every ticketStatus is a voided value, none still 'Booked'.
- **Actual:** Same 3 ticket numbers (no truncation or re-formatting), carrierCode QR on every entry, count 3 = passenger count, every ticketStatus Voided (none Booked). Book returns tickets as an object keyed travelerRefId_N while Void returns an array.
- **Status:** PASS
- **Evidence:** Sets compared: equal = true

  - **Attempt 1 of 2 - V2 Book 3 tickets (pnr 72HQ4K):** HTTP 200
  - **Attempt 2 of 2 - V2 Void (3 tickets):** HTTP 200

### TC-VOIDTPN-VAL-09 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify ticket numbers in the Void response are unique with no duplicated entries.
- **Category:** Validation
- **Endpoint Name:** Void (V2)
- **Request:** Checked voidedTickets of the empty-list Void (72HQ4K) and the full-list Void (72HDNZ) for duplicates
- **Response:** Empty list: 3 entries, 3 unique. Full list: 3 entries, 3 unique
- **Expected:** No duplicate ticketNumber; one entry per ticket; the same result whether voidTickets was [] or fully listed.
- **Actual:** One entry per ticket, no duplicate ticket number, no ticket under two passengers; the result is the same whether voidTickets was [] or fully listed.
- **Status:** PASS
- **Evidence:** POS-04 and POS-05 responses

  - **Attempt 1 of 2 - V2 Void voidTickets [] (72HQ4K):** HTTP 200
  - **Attempt 2 of 2 - V2 Void with all 3 tickets listed (72HDNZ):** HTTP 200

### TC-VOIDTPN-VAL-10 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify V2 Void returns empty passengersVoidedAncillaries and emdTickets for a booking without ancillaries.
- **Category:** Validation
- **Endpoint Name:** Void (V2)
- **Request:** Inspected passengersVoidedAncillaries and emdTickets in the V2 Void response of a no-ancillary booking and compared with Retrieve and with the SabreNdc baseline
- **Response:** TravelportNdc V2 Void: passengersVoidedAncillaries = null, emdTickets = {}. Retrieve before Void: passengersSelectedAncillaries = null. SabreNdc V2 Void today: passengersVoidedAncillaries = {}, emdTickets = {}
- **Expected:** Both arrays present and empty (SabreNdc baseline), consistent with Retrieve showing no ancillaries; not null, not omitted, no fabricated EMD entries.
- **Actual:** emdTickets is present and empty, but passengersVoidedAncillaries is null instead of an empty collection, so the two V2-only fields are inconsistent and differ from the SabreNdc baseline ({}). No fabricated EMD entries.
- **Status:** FAIL
- **Evidence:** Same null seen in every successful TravelportNdc V2 Void this run

  - **Attempt 1 of 3 - V2 Retrieve before Void (no ancillaries):** HTTP 200
  - **Attempt 2 of 3 - V2 Void (72HZA2):** HTTP 200
  - **Attempt 3 of 3 - V2 Void of a SabreNdc booking (baseline comparison):** HTTP 200

### TC-VOIDTPN-BND-01 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate pnr and bookingToken of whitespace-only, lowercase and over-length values are handled without a server error.
- **Category:** Boundary
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void with pnr '      ', pnr lower-cased, pnr of 256 characters, bookingToken whitespace-only, upper-cased and 1000 characters, each on its own booking (the whitespace pnr on 72H7ZT). V1 on 72HIJQ
- **Response:** V2: pnr 256 chars -&gt; 400 camelCase 1001 "Maximum length of a PNR is 9 characters" (booking intact). Everything else -&gt; 200 voided:true: whitespace-only pnr, lower-cased pnr, whitespace-only token, upper-cased token, 1000-char token. V1: whitespace/lowercase/token variants 409 OperationNotSupported; pnr 256 chars 400
- **Expected:** Whitespace-only and over-length: HTTP 400 ValidationError, never 500. Case variants: record whether the PNR lookup is case-insensitive; a lowercased real pnr voiding the booking is acceptable only if documented, otherwise note it.
- **Actual:** Over-length pnr is correctly rejected with a 400 (never a 500). But a whitespace-only pnr, and every bookingToken variant, are accepted and void the booking: the PNR is only length-checked and the booking is found from gdsPNR, so neither the pnr text nor the token is verified. Lookup is case-insensitive for pnr (lower-cased pnr voids).
- **Status:** FAIL
- **Evidence:** Voided: 72H7ZT (pnr whitespace), 72HP3X (pnr lower), 72IUYQ (token whitespace), 72I63V (token upper), 72JLS4 (token 1000). Same root cause as VAL-02.

  - **Attempt 1 of 8 - V2 pnr '      ' (booking 72H7ZT):** HTTP 200
  - **Attempt 2 of 8 - V2 pnr lower-cased (fresh booking):** HTTP 200
  - **Attempt 3 of 8 - V2 pnr 256 characters (fresh booking):** HTTP 400
  - **Attempt 4 of 8 - V2 bookingToken '      ' (fresh booking):** HTTP 200
  - **Attempt 5 of 8 - V2 bookingToken upper-cased (fresh booking):** HTTP 200
  - **Attempt 6 of 8 - V2 bookingToken 1000 characters (fresh booking):** HTTP 200
  - **Attempt 7 of 8 - V1 pnr whitespace:** HTTP 409
  - **Attempt 8 of 8 - V1 pnr 256 characters:** HTTP 400

### TC-VOIDTPN-BND-02 — BLOCKED

- **Test Case:** [TravelportNdc][Void][Request] Validate the calendar-day boundary: Void just before midnight is accepted and just after midnight is rejected.
- **Category:** Boundary
- **Endpoint Name:** Void (V2)
- **Request:** Not run: needs two bookings ticketed on one day voided at about 23:50 and 00:10 across a midnight in the reference time zone; this session ran within a single UTC day (2026-10-26)
- **Response:** No request sent
- **Expected:** #1 voided successfully; #2 rejected with the same error as TC-VOIDTPN-BIZ-01. A wrong time-zone basis shows as #1 rejected or #2 accepted - record the effective boundary.
- **Actual:** The calendar-day boundary cannot be exercised in a normal working session, and the reference time zone for the Travelport cut-off is still an open question (PCC/branch local time, POS local, UTC or server time).
- **Status:** BLOCKED
- **Evidence:** The aged bookings from 2026-10-22 no longer exist at Travelport (Retrieve: RECORD LOCATOR DOES NOT EXIST), so there is no aged ticket to probe the boundary either (see BIZ-01)

### TC-VOIDTPN-BIZ-01 — BLOCKED

- **Test Case:** [TravelportNdc][Void][Response] Verify Void is rejected for a TravelportNdc booking ticketed on a previous calendar day.
- **Category:** Business Rule
- **Endpoint Name:** Retrieve &gt; Void (V2 and V1)
- **Request:** Looked for a TravelportNdc/UAE booking ticketed on a previous day: Retrieve and Void of the 2026-10-22 leftovers 9DV2WY (V2) and 9DV4S9 (V1), taking their bookingTokens from that run
- **Response:** Retrieve: 409 NDC-INT-UNC-Z9999 "RECORD LOCATOR DOES NOT EXIST (AIRLINE QR)" for both. V2 Void: same 409. V1 Void: 409 OperationNotSupported
- **Expected:** Void rejected with a business-rule error in the standard envelope (exact HTTP status/ErrorCode UNKNOWN - record); booking stays ticketed. voidCapability, if returned, already indicates void not allowed. If Void succeeds on an aged ticket, the void window is not calendar-day - report it for confirmation.
- **Actual:** No previous-day ticketed booking exists: Travelport no longer has the 2026-10-22 test bookings (staging purge), and the 2026-08-05 leftover is older still. A booking made today cannot age to D+1 inside this session, so the void-window rule cannot be exercised; whether the window is calendar-day (as agreed for SabreNdc) or something else stays unconfirmed. Rerun on 2026-10-27 using bookings left from today.
- **Status:** BLOCKED
- **Evidence:** A Void of a record locator Travelport does not know returns the same unmapped 409 Z9999 (see NEG-01)

  - **Attempt 1 of 4 - V2 Retrieve of 9DV2WY (ticketed 2026-10-22):** HTTP 409
  - **Attempt 2 of 4 - V2 Void of 9DV2WY:** HTTP 409
  - **Attempt 3 of 4 - V1 RetrieveBooking of 9DV4S9 (ticketed 2026-10-22):** HTTP 409
  - **Attempt 4 of 4 - V1 Void of 9DV4S9:** HTTP 409

### TC-VOIDTPN-BIZ-02 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify a second Void on an already-voided TravelportNdc booking is rejected.
- **Category:** Business Rule
- **Endpoint Name:** Void (V2)
- **Request:** Resent the identical Void for 72HZA2 straight after the successful Void, again after 30 seconds, then Retrieve
- **Response:** First Void 200 voided:true. Second Void 409 (2.2s) and third Void 409 (2.6s): {ErrorCode:NDC-INT-BYP-A0003, ErrorMessage:"Reservation is already cancelled.", Context:[{Name:TERMINAL, Value:"RESERVATION IS CANCELLED AND CANNOT BE RETRIEVED (AIRLINE QR)"}]}. Retrieve 409 same
- **Expected:** Second Void rejected with a 4xx standard envelope (already voided; exact code UNKNOWN - record); no 500; booking state unchanged; no duplicate voided entries.
- **Actual:** A repeat Void is rejected with a 4xx standard envelope (not a second 200, unlike SabreNdc 2026-10-22), no 500, no duplicate voided entries; Void is not idempotent (it does not return a 2xx no-op). The rejection comes from Travelport and the raw supplier reply is echoed in the envelope (VAL-07).
- **Status:** PASS
- **Evidence:** TransactionIds 066f957d-159b-4aad-a170-ada915168236 and c3b7352b-743e-4b53-83ac-c19725ab86ef

  - **Attempt 1 of 4 - V2 first Void (72HZA2):** HTTP 200
  - **Attempt 2 of 4 - V2 identical Void again:** HTTP 409
  - **Attempt 3 of 4 - V2 identical Void again 30 seconds later:** HTTP 409
  - **Attempt 4 of 4 - V2 Retrieve:** HTTP 409

### TC-VOIDTPN-BIZ-03 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify Void is rejected for a held, unticketed TravelportNdc booking.
- **Category:** Business Rule
- **Endpoint Name:** Hold &gt; Void &gt; Retrieve (V2; V1 for comparison)
- **Request:** V2 Hold (tickets empty, hold to 2026-11-02T21:59:00+02:00), Void with the held PNR (72JHGP), Retrieve. V1: Void of a held PNR (72JEQ8)
- **Response:** V2 Void 200 in 9.2s: {voided:false, voidedTickets:[], passengersVoidedAncillaries:null, emdTickets:{}}. Retrieve then 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." V1 Void 409 OperationNotSupported (hold still live, cancelled later with CancelAfterHold)
- **Expected:** Void rejected as not eligible (no tickets) in the standard envelope; booking stays held. If Void cancels the hold instead, record it as a behavior to confirm with the team (CancelAfterHold is the documented path for holds, §2.14).
- **Actual:** A Void on a held, unticketed booking is NOT rejected: it returns HTTP 200 with voided:false and, as a side effect, cancels the hold at Travelport. A success status for a void that did nothing, plus a destroyed hold, is the "Void cancels the hold instead" outcome the case asks to flag. CancelAfterHold is the documented path for holds.
- **Status:** FAIL
- **Evidence:** Hold 72JHGP existed and was OnHold before the Void (V2 Retrieve of the sister hold h1 showed OnHold); after the Void a Retrieve says cancelled

  - **Attempt 1 of 4 - V2 Hold (pnr 72JHGP, no ticket):** HTTP 200
  - **Attempt 2 of 4 - V2 Void of the held booking:** HTTP 200
  - **Attempt 3 of 4 - V2 Retrieve afterwards:** HTTP 409
  - **Attempt 4 of 4 - V1 Void of a held booking (72JEQ8):** HTTP 409

### TC-VOIDTPN-BIZ-04 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void is rejected for a TravelportNdc hold already cancelled via CancelAfterHold.
- **Category:** Business Rule
- **Endpoint Name:** Hold &gt; CancelAfterHold &gt; Void (V2; V1 for comparison)
- **Request:** V2: Hold 72INAV, CancelAfterHold, then Void the same PNR, Retrieve. V1: Hold 72JEQ8, CancelAfterHold, Void
- **Response:** V2 CancelAfterHold 200 {cancelled:true, message:"Reservation cancelled successfully.", passengersCancelledAncillaries:null}. Void 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." in 3.8s; Retrieve the same 409. V1: CancelAfterHold 200 {cancelled:true, ...}; Void 409 OperationNotSupported
- **Expected:** Rejected with a 4xx standard envelope (comparable to Retrieve's 409 NDC-INT-BYP-A0003 'Reservation is already cancelled'); no 500.
- **Actual:** V2: Void on an already-cancelled hold is rejected with a 4xx standard envelope, comparable to Retrieve (same code and message), no 500. V1 is refused because Void is unsupported there.
- **Status:** PASS
- **Evidence:** V2 TransactionId bd510ac9-5135-4cfb-afda-aad424b07073

  - **Attempt 1 of 6 - V2 Hold (pnr 72INAV):** HTTP 200
  - **Attempt 2 of 6 - V2 CancelAfterHold:** HTTP 200
  - **Attempt 3 of 6 - V2 Void of the cancelled hold:** HTTP 409
  - **Attempt 4 of 6 - V2 Retrieve:** HTTP 409
  - **Attempt 5 of 6 - V1 CancelAfterHold (pnr 72JEQ8):** HTTP 200
  - **Attempt 6 of 6 - V1 Void of the cancelled hold:** HTTP 409

### TC-VOIDTPN-BIZ-05 — FAIL

- **Test Case:** [TravelportNdc][Book]&amp;[Void] [Response] Verify voidCapability is consistent with the actual Void outcome.
- **Category:** Business Rule
- **Endpoint Name:** Book/Retrieve &gt; Void (V1 + V2)
- **Request:** Compared voidCapability on Book, Retrieve-before-Void, BookAfterHold and Retrieve-after-BookAfterHold with the Void outcome, on V1 and V2
- **Response:** voidCapability is absent from every body: V1 Book/RetrieveBooking, V2 Book/Retrieve/BookAfterHold/Retrieve. Void outcomes: V2 200 voided:true; V1 409 OperationNotSupported; held booking 200 voided:false
- **Expected:** Allowed value before same-day Void -&gt; Void succeeded; VoidNotAllowed (or equivalent) on an aged ticket -&gt; Void rejected; after a successful Void, voidCapability no longer reports void allowed. Any disagreement between flag and outcome is a defect. A field that is absent everywhere is itself a recurrence of the missing-voidCapability defect.
- **Actual:** The flag cannot be compared with the outcome because it is never returned; there is no signal at all that a same-day ticket may be voided, nor that a V1 Void is unsupported. A field that is absent everywhere is itself a recurrence of the missing-voidCapability defect (TC-CAPCHECK-TPN-02).
- **Status:** FAIL
- **Evidence:** Key lists of all Book/BookAfterHold/Retrieve bodies checked for "voidCapability": none

  - **Attempt 1 of 7 - V2 Book (72HZA2):** HTTP 200
  - **Attempt 2 of 7 - V2 Retrieve before Void:** HTTP 200
  - **Attempt 3 of 7 - V2 Void:** HTTP 200
  - **Attempt 4 of 7 - V2 BookAfterHold (72IAF3):** HTTP 200
  - **Attempt 5 of 7 - V2 Retrieve after BookAfterHold:** HTTP 200
  - **Attempt 6 of 7 - V1 Book (72HIJQ):** HTTP 200
  - **Attempt 7 of 7 - V1 Void:** HTTP 409

### TC-VOIDTPN-BIZ-06 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify Void with voidTickets listing only a subset of the PNR's tickets voids exactly those tickets or is rejected.
- **Category:** Business Rule
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void on 72HKTY (ADT + CHD + INF, tickets 1572141427291, -292, -293) with voidTickets = [one ticket object]; Retrieve. V1: same on 72HE26
- **Response:** V2: 200 voided:true in 15.7s, voidedTickets lists ALL 3 tickets (1572141427292, -291, -293); Retrieve then 409 already cancelled. V1: 409 OperationNotSupported
- **Expected:** Either (a) only the listed ticket is voided and the others stay Booked, with voidedTickets listing exactly one entry, or (b) the request is rejected with a 4xx stating partial void is unsupported. Silently voiding all tickets, or voiding none while returning voided=true, is a defect.
- **Actual:** A per-ticket void is not supported and not rejected: naming one ticket silently voids every ticket on the PNR (the infant ticket included), and the response does not say the request was widened. Expected either only the listed ticket voided or a 4xx stating partial void is unsupported.
- **Status:** FAIL
- **Evidence:** Requested ticket 1572141427292; voided 1572141427292, 1572141427291, 1572141427293

  - **Attempt 1 of 4 - V2 Retrieve (3 tickets Booked):** HTTP 200
  - **Attempt 2 of 4 - V2 Void with voidTickets = [ADT ticket only]:** HTTP 200
  - **Attempt 3 of 4 - V2 Retrieve afterwards:** HTTP 409
  - **Attempt 4 of 4 - V1 Void with voidTickets = [ADT ticket only] (72HE26):** HTTP 409

### TC-VOIDTPN-BIZ-07 — PASS

- **Test Case:** [TravelportNdc][Void]&amp;[BookAfterHold] [Response] Verify CancelAfterHold and BookAfterHold on a voided TravelportNdc booking are rejected and Retrieve reports the voided state.
- **Category:** Business Rule
- **Endpoint Name:** CancelAfterHold / BookAfterHold / Retrieve (V2)
- **Request:** On the Hold &gt; BookAfterHold &gt; Void PNR 72IAF3: CancelAfterHold, BookAfterHold (stale call), Retrieve
- **Response:** CancelAfterHold 409 (2.3s), BookAfterHold 409 (1.8s), Retrieve 409: all NDC-INT-BYP-A0003 "Reservation is already cancelled."
- **Expected:** CancelAfterHold and BookAfterHold are rejected with 4xx standard envelopes (no 500, no second ticketing); Retrieve returns the voided state consistent with TC-VOIDTPN-INT-02.
- **Actual:** Both calls are rejected with 4xx standard envelopes (no 500, no second ticketing) and Retrieve reports the same terminal cancelled state as after a Void (INT-02). A stale BookAfterHold cannot re-ticket a voided PNR.
- **Status:** PASS
- **Evidence:** TransactionIds 40bea018-010a-42cc-9cd4-2d9841513120 (cancel), 8831111e-2f5a-444b-ad02-e366a1aca4a3 (book), fd66b5bc-4d87-463c-ae8b-babde0be0b46 (retrieve)

  - **Attempt 1 of 3 - V2 CancelAfterHold on the voided PNR (72IAF3):** HTTP 409
  - **Attempt 2 of 3 - V2 BookAfterHold on the voided PNR:** HTTP 409
  - **Attempt 3 of 3 - V2 Retrieve:** HTTP 409

### TC-VOIDTPN-NEG-01 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify Void with a non-existent pnr returns a mapped error, not a server error.
- **Category:** Negative
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** Void with pnr 'ZZZZZZ', gdsPNR 'ZZZZZZ', random bookingToken, surName 'Test', voidTickets []
- **Response:** V2: 409 in 0.9s {ErrorCode:NDC-INT-UNC-Z9999, ErrorMessage:"NDC-INT-UNC-Z9999", Context:[{Name:VALIDATION, Value:"RECORD LOCATOR DOES NOT EXIST"}], OriginalSupplierRequest:"ZZZZZZ", OriginalSupplierResponse:&lt;raw Travelport ReservationResponse&gt;}. V1: 409 OperationNotSupported
- **Expected:** 4xx in the standard envelope with a meaningful ErrorCode/ErrorMessage (booking not found); never 500 or an unhandled Travelport fault; Context does not echo the raw Travelport response.
- **Actual:** Never a 500 and the status is a 4xx, but the error is not mapped: the code is the generic unmapped NDC-INT-UNC-Z9999, the message just repeats the code, and Context plus OriginalSupplierRequest/OriginalSupplierResponse echo the raw Travelport reply. Expected a meaningful booking-not-found code with no raw supplier payload (same as SabreNdc BUG-05).
- **Status:** FAIL
- **Evidence:** V2 TransactionId 56c05e57-6eb4-4b07-99b1-1901ddd1439d

  - **Attempt 1 of 2 - V2 Void pnr/gdsPNR 'ZZZZZZ', random token:** HTTP 409
  - **Attempt 2 of 2 - V1 Void, same fake identifiers:** HTTP 409

### TC-VOIDTPN-NEG-02 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with a bookingToken from a different TravelportNdc booking is rejected.
- **Category:** Negative
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void with booking A's pnr and gdsPNR (72HRKN) and booking B's bookingToken (72I955); Retrieve A and B. V1: same shape on 72HIJQ
- **Response:** V2: 200 voided:true in 11.9s, voidedTickets 1572141427305 (A). Retrieve A: 409 cancelled. Retrieve B: 200, ticket 1572141427281 still Booked. V1: 409 OperationNotSupported
- **Expected:** Rejected with a 4xx standard envelope; neither A nor B voided.
- **Actual:** The foreign bookingToken is ignored: A is voided although the token belongs to B. B is untouched (the token is not used to find a booking at all). Expected a 4xx and neither booking voided.
- **Status:** FAIL
- **Evidence:** Voided: A only. Same root cause as VAL-02

  - **Attempt 1 of 4 - V2 Void with 72HRKN's pnr/gdsPNR and booking 72I955's bookingToken:** HTTP 200
  - **Attempt 2 of 4 - V2 Retrieve of 72HRKN:** HTTP 409
  - **Attempt 3 of 4 - V2 Retrieve of the donor booking 72I955:** HTTP 200
  - **Attempt 4 of 4 - V1 Void with a foreign token (72HIJQ):** HTTP 409

### TC-VOIDTPN-NEG-03 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate voidTickets containing a ticket number not on the PNR is rejected.
- **Category:** Negative
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** V2 Void on booking A with voidTickets (a) a fabricated ticket 1570000000000 (72IOH6) and (b) the real ticket 1572141427281 of booking B (72IWP7); Retrieve A and B. V1: 409 on every variant
- **Response:** (a) 200 voided:true, voidedTickets [1572141427311] (A's own ticket). (b) 200 voided:true, voidedTickets [1572141427309] (A's own ticket). B retrieved afterwards: ticket 1572141427281 still Booked. V1: 409 OperationNotSupported
- **Expected:** Both rejected with a 4xx standard envelope; A's and B's tickets unchanged. Must not silently void all of A's tickets, and must never void B's ticket.
- **Actual:** Neither variant is rejected: the listed ticket is ignored and every ticket on A is voided. B's ticket is never touched (that part is safe). Expected a 4xx for a ticket not on the PNR with A's tickets unchanged, and never a silent void-all.
- **Status:** FAIL
- **Evidence:** Same defect as BIZ-06 (voidTickets ignored); A voided in both variants

  - **Attempt 1 of 5 - V2 Void of 72IOH6 with a fabricated ticket 1570000000000:** HTTP 200
  - **Attempt 2 of 5 - V2 Retrieve of 72IOH6:** HTTP 409
  - **Attempt 3 of 5 - V2 Void of 72IWP7 listing donor booking 72I955's ticket 1572141427281:** HTTP 200
  - **Attempt 4 of 5 - V2 Retrieve of 72IWP7:** HTTP 409
  - **Attempt 5 of 5 - V2 Retrieve of the donor booking:** HTTP 200

### TC-VOIDTPN-NEG-04 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify Void with a credentialsSelector that has no TravelportNdc credentials returns the credentials error, not a generic failure.
- **Category:** Negative
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** Void for the UAE booking 72I955 with credentialsSelector KSA (found inactive in CAPCHECK-04); Retrieve with UAE
- **Response:** V2: 400 in 0.4s {Status:400, ErrorCode:NDC-INT-TEC-A0001, Context:[{Name:PredicateValidator, Value:"The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelector' value."}]}. Booking still Booked. V1: 409 OperationNotSupported
- **Expected:** 4xx standard envelope with the 'credentials ... do not exist or are not active' message (or a cross-tenant rejection); booking not voided.
- **Actual:** V2: the credentials error is returned (not a generic failure) and the booking is not voided. V1: the unsupported-supplier 409 comes before the credential check.
- **Status:** PASS
- **Evidence:** V2 TransactionId c089c970-d6c2-45b2-9c68-a574158a0300

  - **Attempt 1 of 3 - V2 Void with credentialsSelector KSA:** HTTP 400
  - **Attempt 2 of 3 - V2 Retrieve with UAE (booking intact):** HTTP 200
  - **Attempt 3 of 3 - V1 Void with credentialsSelector KSA:** HTTP 409

### TC-VOIDTPN-NEG-05 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify error responses for all failed Void scenarios use one consistent envelope.
- **Category:** Negative
- **Endpoint Name:** Void (V2 and V1 failures)
- **Request:** Collected the failure responses of VAL-01..06, BIZ-01..04, NEG-01..04 and tabulated status, Status, ErrorCode, ErrorMessage, Context
- **Response:** Mapping table: 400 PascalCase {NDC-INT-TEC-A0001} for missing pnr / gdsPNR and inactive credentials; 400 camelCase {status, errorCode:"1001", context[], originalSupplierRequest/Response:null} for missing supplier / credentialsSelector, over-long pnr, wrong-type or null voidTickets; 409 NDC-INT-BYP-A0003 for a repeat Void and a Void of a cancelled hold (QR); 409 NDC-INT-UNC-Z9999 (ErrorMessage = the code) for an unknown PNR, a Void under another credential set and a cancelled Emirates booking; 401 AuthenticationError for bad key / Client-Id; V1: 409 OperationNotSupported. Held booking: 200 (not an error, BIZ-03)
- **Expected:** Every failure uses {Status, TransactionId, ErrorCode, ErrorMessage, Context}; Status equals the HTTP code; validation errors are 400; business-rule/eligibility errors use one consistent code family. Record the full mapping table for SPEC.md §2.15.
- **Actual:** Status always equals the HTTP code and TransactionId is always a GUID, but the failures are not one consistent envelope: two casings (Status/ErrorCode vs status/errorCode "1001"), the unmapped Z9999 whose message is the code itself, the same business condition (reservation cancelled) mapped to two codes depending on carrier (QR BYP-A0003, EK Z9999 with context "ReservationCancelled"), and eligibility errors that reuse generic validation or supplier codes instead of a Void-specific family. Same pattern as SabreNdc BUG-07.
- **Status:** FAIL
- **Evidence:** Full per-failure table is in the response summary above

  - **Attempt 1 of 7 - V2 400 PascalCase (pnr missing):** HTTP 400
  - **Attempt 2 of 7 - V2 400 camelCase (supplier missing):** HTTP 400
  - **Attempt 3 of 7 - V2 409 repeat Void (QR):** HTTP 409
  - **Attempt 4 of 7 - V2 409 unknown PNR:** HTTP 409
  - **Attempt 5 of 7 - V2 409 Retrieve of a voided Emirates booking:** HTTP 409
  - **Attempt 6 of 7 - V2 401 bad api key:** HTTP 401
  - **Attempt 7 of 7 - V1 409 OperationNotSupported:** HTTP 409

### TC-VOIDTPN-NEG-06 — PASS

- **Test Case:** [TravelportNdc][Void][Response] Verify the same invalid supplier or credentialsSelector gives the same error shape on Void as on Search and Book.
- **Category:** Negative
- **Endpoint Name:** Search, Book, Void (V1 and V2)
- **Request:** Sent supplier 'NoSuchSupplier' with credentialsSelector 'ZZZ' to Search, Book and Void on V1 and V2 (no booking created)
- **Response:** All six: 400 camelCase {status:400, errorCode:"1001", errorMessage:"Validation errors occurred. Please check your request.", context:[{name:"&lt;request dto&gt; field is required"}, {name:"$.supplier", value:"The JSON value could not be converted to &lt;supplier enum type&gt;..."}]}
- **Expected:** Same ErrorCode and message pattern on all three endpoints; no endpoint falls through to a 500.
- **Actual:** Search, Book and Void give the same error shape and message pattern for an invalid supplier, on both versions; none falls through to a 500. (The message leaks the internal enum type name, tracked in VAL-07.)
- **Status:** PASS
- **Evidence:** TransactionIds 83035bad-5074-4f1a-b0f4-17814eb16691 (V1 Search), 8a8a0395-3e88-4640-b6f8-42bd9ffe5c12 (V1 Book), ad746b46-98dd-4b4a-94d4-d948e240cbb0 (V1 Void), 5718e3a5-65fd-4854-acb8-74b6d3a3a55c / d73e5d28-3716-4677-bf8c-6b76ecad43c8 / aa7e568f-3c66-4d41-a226-8a8c9082e302 (V2)

  - **Attempt 1 of 6 - V1 Search with supplier NoSuchSupplier / credentialsSelector ZZZ:** HTTP 400
  - **Attempt 2 of 6 - V1 Book with supplier NoSuchSupplier / credentialsSelector ZZZ:** HTTP 400
  - **Attempt 3 of 6 - V1 Void with supplier NoSuchSupplier / credentialsSelector ZZZ:** HTTP 400
  - **Attempt 4 of 6 - V2 Search with supplier NoSuchSupplier / credentialsSelector ZZZ:** HTTP 400
  - **Attempt 5 of 6 - V2 Book with supplier NoSuchSupplier / credentialsSelector ZZZ:** HTTP 400
  - **Attempt 6 of 6 - V2 Void with supplier NoSuchSupplier / credentialsSelector ZZZ:** HTTP 400

### TC-VOIDTPN-SEC-01 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate Void without x-api-key or with an invalid x-api-key is rejected.
- **Category:** Security
- **Endpoint Name:** Void (V2 and V1)
- **Request:** Valid Void body for 72I955 with the x-api-key header removed, then x-api-key 'invalid'; Retrieve with valid headers. Same on V1 (72HIJQ)
- **Response:** All four: 401 {Status:401, ErrorCode:AuthenticationError, ErrorMessage:"Authentication error. Please check your credentials.", Context:[{Value:"Invalid authorization header"}]} in ~0.1-0.2s. Retrieve 200 ticket Booked
- **Expected:** 401/403; booking not voided.
- **Actual:** Both versions reject a missing or invalid API key with 401 AuthenticationError before any booking logic runs; the booking was not voided.
- **Status:** PASS
- **Evidence:** V2 TransactionIds b58ef8f9-dabc-43b6-a648-c39e4588029d, 1f465216-776e-4ce1-9abc-2cf28d1e2bed

  - **Attempt 1 of 5 - V2 Void without x-api-key:** HTTP 401
  - **Attempt 2 of 5 - V2 Void with x-api-key 'invalid':** HTTP 401
  - **Attempt 3 of 5 - V2 Retrieve with valid headers (booking intact):** HTTP 200
  - **Attempt 4 of 5 - V1 Void without x-api-key:** HTTP 401
  - **Attempt 5 of 5 - V1 Void with x-api-key 'invalid':** HTTP 401

### TC-VOIDTPN-SEC-02 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate Void with an invalid Client-Id is rejected.
- **Category:** Security
- **Endpoint Name:** Void (V2 and V1)
- **Request:** Valid Void body with Client-Id 'Invalid-Client' on V2 (72I955) and V1 (72HIJQ); Retrieve
- **Response:** V2 and V1: 401 AuthenticationError "Authentication error. Please check your credentials." Retrieve 200 ticket Booked
- **Expected:** 401/403; booking not voided.
- **Actual:** An invalid Client-Id is rejected with 401 on both versions and the booking is not voided.
- **Status:** PASS
- **Evidence:** V2 TransactionId eafed207-74d4-4695-8461-a870d53ddf95

  - **Attempt 1 of 3 - V2 Void with Client-Id 'Invalid-Client':** HTTP 401
  - **Attempt 2 of 3 - V2 Retrieve (intact):** HTTP 200
  - **Attempt 3 of 3 - V1 Void with Client-Id 'Invalid-Client':** HTTP 401

### TC-VOIDTPN-SEC-03 — PASS

- **Test Case:** [TravelportNdc][Void][Request] Validate a TravelportNdc booking cannot be voided under a different supplier or credentialsSelector.
- **Category:** Security
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** TravelportNdc/UAE booking ids sent with (a) supplier SabreNdc / credentialsSelector EGY and (b) supplier TravelportNdc / credentialsSelector EGY (an active selector per CAPCHECK-04); Retrieve with TravelportNdc/UAE
- **Response:** (a) V2 409 in 1.0s NDC-INT-UNC-Z9999 "Order not found: orderId=[&lt;bookingToken&gt;]" with the raw Sabre request/response echoed; booking still Booked. (b) V2 409 in 9.9s NDC-INT-UNC-Z9999, raw Travelport ReceiptListResponse "TRANSACTION FAILED. AT LEAST ONE DOCUMENT REFUND WAS NOT PROCESSED CORRECTLY. CONTACT AIRLINE DIRECTLY"; booking still Booked. V1: (a) 409 Z9999 order not found, (b) 409 OperationNotSupported
- **Expected:** Both rejected (cross-tenant access denied or booking not found); booking still ticketed.
- **Actual:** Both cross-credential voids are rejected and the booking stays ticketed, so no cross-tenant void is possible. Two observations: (a) the Void is routed by the supplier named in the request, so a TravelportNdc PNR sent as SabreNdc is looked up in Sabre (not found); (b) the integration does not check ownership itself: with the EGY credentials it forwarded a refund request to Travelport and relied on Travelport to refuse it. Both rejections expose the raw supplier reply (VAL-07).
- **Status:** PASS
- **Evidence:** V2 TransactionIds 47722b7e-7cb3-40e1-861c-6d12e925be8d (a), 327d994d-2544-4690-b44f-965e1d820b7b (b)

  - **Attempt 1 of 6 - V2 Void of TravelportNdc booking 72IZIK as supplier SabreNdc / EGY:** HTTP 409
  - **Attempt 2 of 6 - V2 Retrieve with TravelportNdc/UAE (intact):** HTTP 200
  - **Attempt 3 of 6 - V2 Void of 72J3D3 under TravelportNdc / EGY:** HTTP 409
  - **Attempt 4 of 6 - V2 Retrieve with TravelportNdc/UAE (intact):** HTTP 200
  - **Attempt 5 of 6 - V1 Void of 72HIJQ as SabreNdc / EGY:** HTTP 409
  - **Attempt 6 of 6 - V1 Void of 72HIJQ under TravelportNdc / EGY:** HTTP 409

### TC-VOIDTPN-SEC-04 — FAIL

- **Test Case:** [TravelportNdc][Void][Request] Validate injection payloads in surName and pnr are rejected or safely handled.
- **Category:** Security
- **Endpoint Name:** Void (V2; V1 for comparison)
- **Request:** Void with surName, then pnr, set to ' OR 1=1 --, &lt;script&gt;alert(1)&lt;/script&gt; and a 500-character string, each on a fresh booking (V2). V1 on 72HIJQ
- **Response:** V2 surName variants: all three 200 voided:true (~12s), bookings 72IOSA, 72J926, 72JBSQ voided. V2 pnr variants: all three 400 {errorCode:"1001", context:[{name:"PNR", value:"Maximum length of a PNR is 9 characters"}]}, bookings still Booked; payload not echoed. V1: surName 409, pnr 400
- **Expected:** 4xx validation or mismatch error each time; no 500, no payload reflected unescaped in the response; booking not voided.
- **Actual:** No 500 and no payload reflected, and the pnr field rejects every payload (length only). But the surName variants are not rejected: surName is not validated (VAL-04), so each injection string voids its booking. Expected a 4xx for every payload with the booking left ticketed.
- **Status:** FAIL
- **Evidence:** Same root cause as VAL-04 (surName ignored); one fresh booking consumed per surName variant

  - **Attempt 1 of 8 - V2 surName ' OR 1=1 -- (fresh booking):** HTTP 200
  - **Attempt 2 of 8 - V2 surName &lt;script&gt;alert(1)&lt;/script&gt; (fresh booking):** HTTP 200
  - **Attempt 3 of 8 - V2 surName 500 characters (fresh booking):** HTTP 200
  - **Attempt 4 of 8 - V2 pnr ' OR 1=1 -- (fresh booking):** HTTP 400
  - **Attempt 5 of 8 - V2 pnr &lt;script&gt;alert(1)&lt;/script&gt; (fresh booking):** HTTP 400
  - **Attempt 6 of 8 - V2 pnr 500 characters (fresh booking):** HTTP 400
  - **Attempt 7 of 8 - V1 surName SQL string:** HTTP 409
  - **Attempt 8 of 8 - V1 pnr SQL string:** HTTP 400

### TC-VOIDTPN-INT-01 — PASS

- **Test Case:** [TravelportNdc][Book]&amp;[Void] [Request] Verify pnr, gdsPNR and bookingToken from Book are accepted unchanged by Void.
- **Category:** Integration
- **Endpoint Name:** Book &gt; Void (V2; V1 for comparison)
- **Request:** pnr 72HZA2, gdsPNR HNGC0L, bookingToken f6a6694b-da62-4b57-a167-a611cc0e304b taken verbatim from the V2 Book response into Void (surName from the booking); V1 the same with 72HIJQ
- **Response:** V2: Void 200 voided:true in 13.1s. V1: 409 OperationNotSupported
- **Expected:** Void succeeds with the handed-off IDs; no re-lookup or transformation needed by the caller.
- **Actual:** V2: the ids handed off from Book are accepted unchanged, no re-lookup or transformation by the caller. V1: refused because Void is unsupported there (not an id problem).
- **Status:** PASS
- **Evidence:** Same request as POS-02

  - **Attempt 1 of 4 - V2 Book (72HZA2):** HTTP 200
  - **Attempt 2 of 4 - V2 Void with the Book ids verbatim:** HTTP 200
  - **Attempt 3 of 4 - V1 Book (72HIJQ):** HTTP 200
  - **Attempt 4 of 4 - V1 Void with the Book ids verbatim:** HTTP 409

### TC-VOIDTPN-INT-02 — PASS

- **Test Case:** [TravelportNdc][Void]&amp;[Retrieve] [Response] Verify Retrieve after a successful TravelportNdc Void reflects the voided state.
- **Category:** Integration
- **Endpoint Name:** Void &gt; Retrieve (V2; V1 for comparison)
- **Request:** Retrieve immediately after a successful Void on a QR booking (72HZA2) and an EK booking (GLUPQB); V1 RetrieveBooking after its refused Void
- **Response:** V2 QR: 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." V2 EK: 409 NDC-INT-UNC-Z9999, Context [{Name:ReservationCancelled, Value:"Reservation is already cancelled"}]. V1: 200 ticket 1572141427279 still Booked (never voided)
- **Expected:** Booking shows as voided: tickets[].ticketStatus changed from Booked to a voided value and voidCapability no longer allows void - or a terminal 409 like cancelled PNRs. Exact signal UNKNOWN (bookingStatus does not exist in V1 Retrieve, §2.11, confirmed on TravelportNdc 2026-08-05) - record it as the baseline. Unchanged Booked tickets = defect.
- **Actual:** Baseline recorded: after a Void the booking is no longer retrievable and Retrieve returns a terminal 409 like cancelled PNRs (the same signal as a cancelled hold), not a voided ticketStatus or a bookingStatus value (V1 has no bookingStatus, V2 Retrieve cannot show it). The unchanged-Booked case is only seen on V1, where the Void was refused. The error code differs by carrier (QR BYP-A0003, EK Z9999), tracked in NEG-05.
- **Status:** PASS
- **Evidence:** Resolves the SPEC contradiction: a voided PNR is signalled by the terminal 409, not by ticket or booking status

  - **Attempt 1 of 3 - V2 Retrieve after Void of a Qatar Airways booking (72HZA2):** HTTP 409
  - **Attempt 2 of 3 - V2 Retrieve after Void of an Emirates booking (GLUPQB):** HTTP 409
  - **Attempt 3 of 3 - V1 RetrieveBooking after the refused Void (72HIJQ):** HTTP 200

### TC-VOIDTPN-REG-01 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify SabreNdc Void still works and is not routed to the TravelportNdc handler.
- **Category:** Regression
- **Endpoint Name:** Void (V1 + V2, SabreNdc and another supplier)
- **Request:** Booked SabreNdc/EGY on V1 (SFADXL) and V2 (SFDJFF), Void each with voidTickets []; Void as supplier FlyNas / EGY with fake ids on both versions
- **Response:** SabreNdc V2: 200 in 10.2s {voided:true, voidedTickets:[{Voided, 1572141592929, QR}], passengersVoidedAncillaries:{}, emdTickets:{}}. SabreNdc V1: 200 in 9.8s {voided:true, voidedTickets:[...]}. FlyNas V1 and V2: 409 OperationNotSupported "FlyNas does not exists"
- **Expected:** HTTP 200 with the same shape as the baseline; unchanged behavior for SabreNdc and for any other supplier that still lacks Void (those keep returning 409 OperationNotSupported).
- **Actual:** SabreNdc Void is unchanged and is not routed to the TravelportNdc handler (same shape and ~10s as the 2026-10-22 baseline); a supplier without Void still returns 409 OperationNotSupported.
- **Status:** PASS
- **Evidence:** SabreNdc Book now also returns voidCapability FullVoidOnlyAllowed (R2 build behaviour, unchanged)

  - **Attempt 1 of 6 - V2 Book SabreNdc/EGY (SFDJFF):** HTTP 200
  - **Attempt 2 of 6 - V2 Void SabreNdc/EGY:** HTTP 200
  - **Attempt 3 of 6 - V1 Book SabreNdc/EGY (SFADXL):** HTTP 200
  - **Attempt 4 of 6 - V1 Void SabreNdc/EGY:** HTTP 200
  - **Attempt 5 of 6 - V2 Void as FlyNas/EGY (fake ids):** HTTP 409
  - **Attempt 6 of 6 - V1 Void as FlyNas/EGY (fake ids):** HTTP 409

### TC-VOIDTPN-REG-02 — FAIL

- **Test Case:** [TravelportNdc][Void][Response] Verify V1 and V2 Void return the same response shape for TravelportNdc.
- **Category:** Regression
- **Endpoint Name:** Void (V1 vs V2)
- **Request:** Diffed V1 and V2 responses for the same scenarios (POS-01/02, NEG-01, BIZ-02, validation)
- **Response:** Success: V2 200 {voided, voidedTickets, passengersVoidedAncillaries:null, emdTickets}; V1 409 OperationNotSupported. Unknown PNR: V2 409 Z9999; V1 409 OperationNotSupported. Repeat Void: V2 409 BYP-A0003; V1 409 OperationNotSupported. Request validation before routing (missing supplier/credentialsSelector, wrong-type voidTickets, over-long pnr): identical 400 camelCase errorCode 1001 on both
- **Expected:** Identical success shape (V2 may add passengersVoidedAncillaries and emdTickets) and identical error codes per scenario; any other difference recorded and raised with the team.
- **Actual:** V1 and V2 do not return the same shape: V1 never reaches the Void handler, so its success and business-rule responses are all the unsupported-supplier 409, while V2 returns the real contract. Only the request-binding validations (400 errorCode 1001) are identical.
- **Status:** FAIL
- **Evidence:** Same root cause as TC-CAPCHECK-TPN-03

  - **Attempt 1 of 5 - V1 Void of a same-day booking:** HTTP 409
  - **Attempt 2 of 5 - V2 Void of a same-day booking:** HTTP 200
  - **Attempt 3 of 5 - V1 Void of an unknown PNR:** HTTP 409
  - **Attempt 4 of 5 - V2 Void of an unknown PNR:** HTTP 409
  - **Attempt 5 of 5 - V2 repeat Void:** HTTP 409

### TC-VOIDTPN-REG-03 — PASS

- **Test Case:** [TravelportNdc][Hold]&amp;[Retrieve]&amp;[CancelAfterHold] [Response] Verify Hold, Retrieve and CancelAfterHold for TravelportNdc are unchanged by the Void implementation.
- **Category:** Regression
- **Endpoint Name:** Hold &gt; Retrieve &gt; CancelAfterHold; Book &gt; Retrieve (V1 + V2)
- **Request:** Search &gt; FareConfirm &gt; (AddPassenger) &gt; Hold &gt; Retrieve &gt; CancelAfterHold &gt; Retrieve on V1 and V2; Book &gt; Retrieve (the 72HZA2 chain); compared with the 2026-08-05 baseline
- **Response:** Hold 200 with holdExpirationDate 2026-11-02T21:59:00Z (V1) / +02:00 (V2); Retrieve 200 (V2 bookingStatus OnHold); CancelAfterHold 200 {cancelled:true, message:"Reservation cancelled successfully."} (V2 also passengersCancelledAncillaries:null); Retrieve after: 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." Book 200 with synchronously issued tickets (16s) and Retrieve echoes them
- **Expected:** Hold returns a holdExpirationDate; CancelAfterHold returns {cancelled:true, message:'Reservation cancelled successfully.'} and a follow-up Retrieve returns 409 NDC-INT-BYP-A0003 'Reservation is already cancelled'; Book returns 200 with synchronously issued tickets and Retrieve echoes them.
- **Actual:** Hold, Retrieve, CancelAfterHold and Book/Retrieve behave as in the 2026-08-05 baseline on both versions; the Void implementation did not change them. (Book is now ~16s instead of ~28s.)
- **Status:** PASS
- **Evidence:** Concurrent Holds on the same offer can fail with 409 NDC-INT-BYP-A0001 "OFFER IS NOT AVAILABLE AND CANNOT BE WAITLISTED"; sequential Holds succeed

  - **Attempt 1 of 10 - V2 Hold:** HTTP 200
  - **Attempt 2 of 10 - V2 Retrieve of the hold:** HTTP 200
  - **Attempt 3 of 10 - V2 CancelAfterHold:** HTTP 200
  - **Attempt 4 of 10 - V2 Retrieve after cancel:** HTTP 409
  - **Attempt 5 of 10 - V1 Hold:** HTTP 200
  - **Attempt 6 of 10 - V1 Retrieve of the hold:** HTTP 200
  - **Attempt 7 of 10 - V1 CancelAfterHold:** HTTP 200
  - **Attempt 8 of 10 - V1 Retrieve after cancel:** HTTP 409
  - **Attempt 9 of 10 - V2 Book:** HTTP 200
  - **Attempt 10 of 10 - V2 Retrieve after Book:** HTTP 200

### FLOW-V1-03-TPN — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #3 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 Search CAI-JED 2026-11-12 1 ADT (fully itemized Emirates offer, 1815 AED) &gt; FareConfirm &gt; Book (pnr ERWME6, gdsPNR HNGCFZ) &gt; RetrieveBooking &gt; Void (surName Ibrahim, voidTickets []) &gt; RetrieveBooking
- **Response:** Search/FareConfirm/Book/Retrieve 200 (Book 19.4s, ticket 1765766798596 Booked). Void 409 OperationNotSupported "TravelportNdc does not exists". Final Retrieve 200: ticket still Booked
- **Expected:** Every hop HTTP 200/2xx; Void succeeds; final Retrieve shows all tickets voided (signal per TC-VOIDTPN-INT-02). Price reconciliation holds through Book.
- **Actual:** Hops 1-4 pass and the price reconciles through Book (1815 AED at Search, FareConfirm and Book). The flow fails at the Void hop: V1 Void is not available for TravelportNdc, so the ticket stays live (voided afterwards through the V2 endpoint during cleanup). Baseline unchanged from 2026-08-05.
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Book selectedOffer reconciles; ok Book total equals FareConfirm tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766798596:Booked); FAIL Void succeeds (2xx, voided=true) (409 409 {"Status":409,"TransactionId":"d44ee411-2c0c-4d39-b70a-be5351840394","ErrorCode":"OperationNotSupported","ErrorMessa). Void TransactionId d44ee411-2c0c-4d39-b70a-be5351840394

  - **Hop 1 &mdash; V1 Search (f03_V1):** PASS &mdash; 200 {"responseId":"5d177f01-e033-4acb-a11b-0f47ae1031c8","supplier":"TravelportNdc","journeys":{"EKs8?EKs13":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs8","EKs13"]},"EKs3?E
  - **Hop 2 &mdash; V1 FareConfirm (f03_V1):** PASS &mdash; 200 {"responseId":"45c45e18-afe6-4a24-8c91-eba1644dc65a","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Book (f03_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798596","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:34","holdExpirationDat
  - **Hop 4 &mdash; V1 Retrieve (f03_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798596","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b
  - **Hop 5 &mdash; V1 Void (f03_V1):** FAIL &mdash; 409 {"Status":409,"TransactionId":"d44ee411-2c0c-4d39-b70a-be5351840394","ErrorCode":"OperationNotSupported","ErrorMessage":"This action is not currently supported by the selected supplier.","Context":[{"
  - **Hop 6 &mdash; V1 Retrieve (f03_V1-after):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798596","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b

### FLOW-V1-05-TPN — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #5 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 flow on pnr MQEVZS (gdsPNR HNGCFW): Hold (to 2026-11-12T10:30:00Z), FareConfirmAfterHold (PnrReprice), Retrieve, BookAfterHold, Retrieve, Void, Retrieve
- **Response:** Every hop 200 up to the second Retrieve (BookAfterHold 14.0s issued ticket 1765766798598; ids unchanged). Void 409 OperationNotSupported. Final Retrieve: ticket still Booked
- **Expected:** All hops succeed before holdExpirationDate; BookAfterHold issues tickets; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** Family-E chain works on V1 until the Void hop: the hold is repriced (1815 AED unchanged), ticketed from the hold, and the pnr, gdsPNR and bookingToken stay the same. Void is refused as unsupported, so the ticket stays live (voided later via the V2 endpoint, cleanup).
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Hold selectedOffer reconciles; ok Hold total equals FareConfirm tier total (1815 vs 1815); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr MQEVZS token same true); ok Retrieve before Void shows tickets Booked (1765766798598:Booked); FAIL Void succeeds (2xx, voided=true) (409 409 {"Status":409,"TransactionId":"8f00169e-45f8-4f62-a33d-3ed38c62b40b","ErrorCode":"OperationNotSupported","ErrorMessa)

  - **Hop 1 &mdash; V1 Search (f05_V1):** PASS &mdash; 200 {"responseId":"4d870fe3-137e-4b7e-bdd8-2e1297530c78","supplier":"TravelportNdc","journeys":{"EKs11?EKs4":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs11","EKs4"]},"EKs8?E
  - **Hop 2 &mdash; V1 FareConfirm (f05_V1):** PASS &mdash; 200 {"responseId":"4d955c1f-8adb-4be7-9b22-5db4b85e03a6","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Hold (f05_V1):** PASS &mdash; 200 {"holdExpirationDate":"2026-11-12T10:30:00Z","supplier":"TravelportNdc","pnr":"MQEVZS","gdsPNR":"HNGCFW","bookingToken":"2c537702-a103-4a98-81c5-fc66fd22d783","journeys":{"seg_1?seg_2":{"origin":"CAI"
  - **Hop 4 &mdash; V1 PnrReprice (f05_V1):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 5 &mdash; V1 Retrieve (f05_V1):** PASS &mdash; 200 {"tickets":{},"creationDate":"2026-10-26T00:00:00","fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T10:30:00","pcc":"","supplier":"TravelportNdc","pnr":"MQEVZS","gdsP
  - **Hop 6 &mdash; V1 BookAfterHold (f05_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798598","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","isBspCommissionApplied":false,"supplier":"TravelportNdc
  - **Hop 7 &mdash; V1 Retrieve (f05_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798598","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b
  - **Hop 8 &mdash; V1 Void (f05_V1):** FAIL &mdash; 409 {"Status":409,"TransactionId":"8f00169e-45f8-4f62-a33d-3ed38c62b40b","ErrorCode":"OperationNotSupported","ErrorMessage":"This action is not currently supported by the selected supplier.","Context":[{"
  - **Hop 9 &mdash; V1 Retrieve (f05_V1-after):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798598","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b

### FLOW-V1-09-TPN — FAIL

- **Test Case:** [Search]&amp;[UpSelling]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #9 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 Search &gt; UpSelling (requestUrl resolved against baseUrl) &gt; Book with upsellOffers[0] (pnr ITUPEB, gdsPNR HNGCFY) &gt; RetrieveBooking &gt; Void &gt; RetrieveBooking
- **Response:** Search 200; UpSelling 200 with 1 tier (1815 AED, no selectedOffer); Book 200 (20.5s, ticket 1765766798597 Booked); Retrieve 200; Void 409 OperationNotSupported; final Retrieve ticket still Booked
- **Expected:** Every hop succeeds; the booked tier's price matches the Upselling tier; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** The booked fare equals the Upselling tier (1815 AED). Two hops fail their expectation: V1 Upselling returns upsellOffers[] and no selectedOffer, so the documented drop-in for FareConfirm does not hold and the first tier had to be chosen by hand; and the Void hop is refused as unsupported (ticket left live, voided via V2 in cleanup).
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Book selectedOffer reconciles; ok Book total equals Upselling tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766798597:Booked); FAIL Void succeeds (2xx, voided=true) (409 409 {"Status":409,"TransactionId":"4ac805d1-2634-486f-ab6c-267dfe99b4d8","ErrorCode":"OperationNotSupported","ErrorMessa)

  - **Hop 1 &mdash; V1 Search (f09_V1):** PASS &mdash; 200 {"responseId":"d2062765-0fe4-4ddf-9fe0-46a6410216a6","supplier":"TravelportNdc","journeys":{"EKs4?EKs12":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs4","EKs12"]},"EKs8?E
  - **Hop 2 &mdash; V1 Upselling (f09_V1):** FAIL &mdash; 200 {"responseId":"7850a1ab-12e5-4ae3-b190-87291b1488bc","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Book (f09_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798597","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:35","holdExpirationDat
  - **Hop 4 &mdash; V1 Retrieve (f09_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798597","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b
  - **Hop 5 &mdash; V1 Void (f09_V1):** FAIL &mdash; 409 {"Status":409,"TransactionId":"4ac805d1-2634-486f-ab6c-267dfe99b4d8","ErrorCode":"OperationNotSupported","ErrorMessage":"This action is not currently supported by the selected supplier.","Context":[{"
  - **Hop 6 &mdash; V1 Retrieve (f09_V1-after):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798597","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b

### FLOW-V1-11-TPN — FAIL

- **Test Case:** [Search]&amp;[UpSelling]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #11 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V1)
- **Request:** V1 Search &gt; UpSelling &gt; Hold (pnr MRJVLF, gdsPNR HNGCFX, hold to 2026-11-12T14:30:00Z) &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve
- **Response:** Every hop 200 through the second Retrieve (BookAfterHold 15.5s, ticket 1765766798599; ids unchanged). Void 409 OperationNotSupported. Final Retrieve ticket still Booked
- **Expected:** All hops succeed before holdExpirationDate; Void succeeds; final Retrieve shows all tickets voided; IDs unchanged from Hold.
- **Actual:** Same as FLOW-V1-05 on the upsell fare: the chain works to ticketing and the ids are unchanged from Hold. V1 Upselling again lacks selectedOffer (upsellOffers[0] used), and the Void hop is refused as unsupported (ticket left live, voided via V2 in cleanup).
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Hold selectedOffer reconciles; ok Hold total equals Upselling tier total (1815 vs 1815); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr MRJVLF token same true); ok Retrieve before Void shows tickets Booked (1765766798599:Booked); FAIL Void succeeds (2xx, voided=true) (409 409 {"Status":409,"TransactionId":"3106b0a1-0366-4d41-b170-6e7c0cedcfe4","ErrorCode":"OperationNotSupported","ErrorMessa)

  - **Hop 1 &mdash; V1 Search (f11_V1):** PASS &mdash; 200 {"responseId":"e462e2c3-8256-49b7-8d63-b2d856d1c75a","supplier":"TravelportNdc","journeys":{"EKs8?EKs2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs8","EKs2"]},"EKs3?EKs
  - **Hop 2 &mdash; V1 Upselling (f11_V1):** FAIL &mdash; 200 {"responseId":"1f0dbefb-c589-4ef8-bd01-0074486c7ad0","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Hold (f11_V1):** PASS &mdash; 200 {"holdExpirationDate":"2026-11-12T14:30:00Z","supplier":"TravelportNdc","pnr":"MRJVLF","gdsPNR":"HNGCFX","bookingToken":"bef1b927-f853-46e0-9044-f8fc43eeb898","journeys":{"seg_1?seg_2":{"origin":"CAI"
  - **Hop 4 &mdash; V1 PnrReprice (f11_V1):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 5 &mdash; V1 Retrieve (f11_V1):** PASS &mdash; 200 {"tickets":{},"creationDate":"2026-10-26T00:00:00","fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T14:30:00","pcc":"","supplier":"TravelportNdc","pnr":"MRJVLF","gdsP
  - **Hop 6 &mdash; V1 BookAfterHold (f11_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798599","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","isBspCommissionApplied":false,"supplier":"TravelportNdc
  - **Hop 7 &mdash; V1 Retrieve (f11_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798599","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b
  - **Hop 8 &mdash; V1 Void (f11_V1):** FAIL &mdash; 409 {"Status":409,"TransactionId":"3106b0a1-0366-4d41-b170-6e7c0cedcfe4","ErrorCode":"OperationNotSupported","ErrorMessage":"This action is not currently supported by the selected supplier.","Context":[{"
  - **Hop 9 &mdash; V1 Retrieve (f11_V1-after):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1765766798599","carrierCode":"EK"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:23:00","fareType":null,"b

### FLOW-V2-27-TPN — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #27 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; AddPassenger &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 Search CAI-JED 2026-11-12 1 ADT (fully itemized Emirates offer, 1815 AED) &gt; FareConfirm &gt; AddPassenger &gt; Book (pnr GLUPQB, gdsPNR HNGCDJ, ticket 1765766798592) &gt; Retrieve &gt; Void (real gdsPNR) &gt; Retrieve
- **Response:** All hops 2xx: Book 200 in 17.3s, Retrieve 200 Booked, Void 200 in 15.4s {voided:true, voidedTickets:[{Voided, 1765766798592, EK}]}, final Retrieve 409 NDC-INT-UNC-Z9999 context ReservationCancelled
- **Expected:** Every hop succeeds; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** The flow completes end to end; Void succeeds and the final Retrieve reports the terminal cancelled state (the INT-02 signal; for an Emirates booking under Z9999). Price reconciliation holds through Book (1815 AED at Search, FareConfirm and Book). Minimal V2 Book body that worked: {supplier, credentialsSelector, ResponseId = AddPassenger responseId, selectedOfferId = AddPassenger offerId}.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Book selectedOffer reconciles; ok Book total equals FareConfirm tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766798592:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798592","carrierCode":"EK"}],"passen)

  - **Hop 1 &mdash; V2 Search (f27_V2):** PASS &mdash; 200 {"responseId":"f741b25f-0e79-4ec7-8b96-54cc04ece7a3","supplier":"TravelportNdc","journeys":{"EKs9?EKs1":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs9","EKs1"]},"EKs11?EK
  - **Hop 2 &mdash; V2 FareConfirm (f27_V2):** PASS &mdash; 200 {"responseId":"075cc8b8-521a-451b-9c31-0ea60e317c35","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f27_V2):** PASS &mdash; 200 {"offerId":"44108d3c-43ee-409a-a473-bd2f7fdc602e&amp;yAHSY9IAAAIX9nyf2SQ1ZDBiNTE2Ny1iZTgyLTQ1N2ItYjNkOC1jNjljMjZjMmNmOTnZJDQ0MTA4ZDNjLTQzZWUtNDA5YS1hNDczLWJkMmY3ZmRjNjAyZZGSp0VLX0NQTzCRkaRFS3AwAQAAkZStRWN
  - **Hop 4 &mdash; V2 Book (f27_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"GLUPQB","gdsPNR":"HNGCDJ","bookingToken":"5d0b5167-be82-457b-b3d8-c69c26c2cf99","ticketingDate":"2026-10-26T11:20:13","tickets":{"travelerRefId_1":{"ticketStatus":"B
  - **Hop 5 &mdash; V2 Retrieve (f27_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"GLUPQB","gdsPNR":"HNGCDJ","bookingToken":"5d0b5167-be82
  - **Hop 6 &mdash; V2 Void (f27_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798592","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (f27_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"5c034fec-3fdb-4d0e-82fb-10ace8cc0152","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V2-29-TPN — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #29 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; AddPassenger &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 flow on pnr ERWMDB (gdsPNR HNGCDX): Hold (to 2026-11-12T10:30:00+02:00), FareConfirmAfterHold (PnrReprice), Retrieve OnHold, BookAfterHold, Retrieve, Void, Retrieve
- **Response:** Every hop 2xx: BookAfterHold 200 in 13.6s (ticket 1765766798593), Void 200 in 13.1s {voided:true, EK}, final Retrieve 409 cancelled
- **Expected:** All hops succeed before holdExpirationDate; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** All hops succeed before the hold expiry; BookAfterHold issues the ticket with unchanged ids; Void succeeds; the final Retrieve shows the cancelled state. Price reconciliation holds (1815 AED through PnrReprice and BookAfterHold). Note the V2 Hold date format carries a +02:00 offset (V1 uses Z).
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1815 vs 1815); ok Hold selectedOffer reconciles; ok Hold total equals FareConfirm tier total (1815 vs 1815); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr ERWMDB token same true); ok Retrieve before Void shows tickets Booked (1765766798593:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798593","carrierCode":"EK"}],"passen)

  - **Hop 1 &mdash; V2 Search (f29_V2):** PASS &mdash; 200 {"responseId":"ef77612b-84d3-4f3a-bdaf-761e83cf9e2a","supplier":"TravelportNdc","journeys":{"EKs10?EKs2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs10","EKs2"]},"EKs6?E
  - **Hop 2 &mdash; V2 FareConfirm (f29_V2):** PASS &mdash; 200 {"responseId":"c2024a34-7cd0-4d49-8e4e-b2a4dad2d4ad","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f29_V2):** PASS &mdash; 200 {"offerId":"86dccef4-b11d-4e1a-8116-c9452bde87c4&amp;yAHSY9IAAAIX9nyf2SQ4ODg2Njk4Ni1hNDYwLTRlYjAtYjEzNC1jNTNlN2YzZTU4YjjZJDg2ZGNjZWY0LWIxMWQtNGUxYS04MTE2LWM5NDUyYmRlODdjNJGSp0VLX0NQTzCRkaRFS3AxAQAAkZStRWN
  - **Hop 4 &mdash; V2 Hold (f29_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"ERWMDB","gdsPNR":"HNGCDX","bookingToken":"88866986-a460-4eb0-b134-c53e7f3e58b8","holdExpirationDate":"2026-11-12T10:30:00+02:00","passengersSelectedAncillaries":null
  - **Hop 5 &mdash; V2 PnrReprice (f29_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 6 &mdash; V2 Retrieve (f29_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T10:30:00+02:00","bookingStatus":"OnHold","pcc":"","supplier":"TravelportNdc","pnr":"ERWMDB","gdsPNR":"HNGCDX","booki
  - **Hop 7 &mdash; V2 BookAfterHold (f29_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"ERWMDB","gdsPNR":"HNGCDX","bookingToken":"88866986-a460-4eb0-b134-c53e7f3e58b8","creationDate":null,"ticketingDate":"2026-10-26T11:21:19","tickets":{"travelerRefId_1
  - **Hop 8 &mdash; V2 Retrieve (f29_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"ERWMDB","gdsPNR":"HNGCDX","bookingToken":"88866986-a460
  - **Hop 9 &mdash; V2 Void (f29_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798593","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 10 &mdash; V2 Retrieve (f29_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"e94ba3a3-689a-4990-8a51-b7e7647daee9","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V2-74-TPN — PASS

- **Test Case:** [Search]&amp;[UpSelling]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #74 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; AddPassenger &gt; Book &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 Search &gt; UpSelling &gt; AddPassenger (upsell ids) &gt; Book (pnr CHR25T, gdsPNR HNGCFF, ticket 1765766798594) &gt; Retrieve &gt; Void &gt; Retrieve; plus a probe of Book straight after UpSelling without AddPassenger
- **Response:** Every hop 2xx: Book 200 in 17.4s, Void 200 in 16.9s {voided:true, EK}, final Retrieve 409 cancelled. Probe (no AddPassenger): Book 500 {Status:500, ErrorCode:ServerError, ErrorMessage:"Unknown error occured. Please keep the transaction id as a reference."}
- **Expected:** Every hop succeeds with AddPassenger inserted; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** The flow works with AddPassenger inserted and the booked price equals the Upselling tier (1815 AED, the only tier offered). Anomaly resolved: Book WITHOUT AddPassenger does not work on V2, it fails with an unhandled HTTP 500 (a 400 naming the missing passenger details would be expected). AddPassenger must follow Upselling.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Book selectedOffer reconciles; ok Book total equals Upselling tier total (1815 vs 1815); ok Retrieve before Void shows tickets Booked (1765766798594:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798594","carrierCode":"EK"}],"passen). Probe TransactionId 12fc86ad-5a49-43b1-9408-2d163dd409c0

  - **Hop 1 &mdash; V2 Search (f74_V2):** PASS &mdash; 200 {"responseId":"8adf3591-67da-451a-9592-3c575e4ed08a","supplier":"TravelportNdc","journeys":{"EKs12?EKs4":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs12","EKs4"]},"EKs11?
  - **Hop 2 &mdash; V2 Upselling (f74_V2):** PASS &mdash; 200 {"responseId":"527eb48d-7a67-47e7-ac9b-0b356d3836f0","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f74_V2):** PASS &mdash; 200 {"offerId":"02544afd-9d05-4d0d-b750-a2e7cf074c29&amp;yAHEY9IAAAIQ9nWf2SRmN2RlYzdjNy05ZmVkLTRmNzYtYmQ1OC1jODlmOWE5ZWZiYjXZJDAyNTQ0YWZkLTlkMDUtNGQwZC1iNzUwLWEyZTdjZjA3NGMyOZGSom8wkZGicDABAACRlK1FY29ub215IFN
  - **Hop 4 &mdash; V2 Book (f74_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"CHR25T","gdsPNR":"HNGCFF","bookingToken":"f7dec7c7-9fed-4f76-bd58-c89f9a9efbb5","ticketingDate":"2026-10-26T11:22:13","tickets":{"travelerRefId_1":{"ticketStatus":"B
  - **Hop 5 &mdash; V2 Retrieve (f74_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"CHR25T","gdsPNR":"HNGCFF","bookingToken":"f7dec7c7-9fed
  - **Hop 6 &mdash; V2 Void (f74_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798594","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (f74_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"7ab2d044-3b36-4813-a1e4-f6ddf9fba21f","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i
  - **Hop 8 &mdash; V2 Book (noap):** FAIL &mdash; 500 ServerError

### FLOW-V2-76-TPN — PASS

- **Test Case:** [Search]&amp;[UpSelling]&amp;[AddPassenger]&amp;[Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #76 completes end to end for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; UpSelling &gt; AddPassenger &gt; Hold &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve (V2)
- **Request:** V2 flow on pnr CBR2DX (gdsPNR HNGCFD): Search &gt; UpSelling &gt; AddPassenger &gt; Hold (to 2026-11-12T17:25:00+02:00) &gt; PnrReprice &gt; Retrieve &gt; BookAfterHold &gt; Retrieve &gt; Void &gt; Retrieve
- **Response:** Every hop 2xx: BookAfterHold 200 in 17.0s (ticket 1765766798595), Void 200 in 14.2s {voided:true, EK}, final Retrieve 409 cancelled
- **Expected:** All hops succeed before holdExpirationDate; Void succeeds; final Retrieve shows all tickets voided.
- **Actual:** All hops succeed before the hold expiry; ids unchanged from Hold; Void succeeds; final Retrieve reports cancelled. Price reconciles (1815 AED = the Upselling tier). Same AddPassenger requirement and Upselling shape as FLOW-V2-74.
- **Status:** PASS
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); FAIL Upselling returns selectedOffer (documented drop-in for FareConfirm) (keys: responseId,supplier,journeys,flightSegments,priceClasses,baggageDetails,upsellOffers); ok Upselling tier reconciles; ok Hold selectedOffer reconciles; ok Hold total equals Upselling tier total (1815 vs 1815); ok FareConfirmAfterHold (PnrReprice) 200; ok BookAfterHold issues tickets; ids unchanged (pnr CBR2DX token same true); ok Retrieve before Void shows tickets Booked (1765766798595:Booked); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798595","carrierCode":"EK"}],"passen)

  - **Hop 1 &mdash; V2 Search (f76_V2):** PASS &mdash; 200 {"responseId":"ca3fd527-7b80-4d21-ba03-539cde453e1f","supplier":"TravelportNdc","journeys":{"EKs13?EKs3":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs13","EKs3"]},"EKs11?
  - **Hop 2 &mdash; V2 Upselling (f76_V2):** PASS &mdash; 200 {"responseId":"3cc2d388-727a-4abe-91e7-c50f6ac54c91","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (f76_V2):** PASS &mdash; 200 {"offerId":"26d159e6-c9a1-42d4-8012-a8a88e3cc1c6&amp;yAHHY9IAAAIQ9nWf2SQ0MmE3ZDMyMy0xYzU1LTQ5YjktOGE2MS00NmZhZDYwMDdlNzXZJDI2ZDE1OWU2LWM5YTEtNDJkNC04MDEyLWE4YTg4ZTNjYzFjNpGSom8wkZGicDABAACRlK1FY29ub215IFN
  - **Hop 4 &mdash; V2 Hold (f76_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"CBR2DX","gdsPNR":"HNGCFD","bookingToken":"42a7d323-1c55-49b9-8a61-46fad6007e75","holdExpirationDate":"2026-11-12T17:25:00+02:00","passengersSelectedAncillaries":null
  - **Hop 5 &mdash; V2 PnrReprice (f76_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","journeys":{"Flight_01?Flight_02":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["Flight_01","Flight_02"]}},"flightSegments":{"Flight_01":{"origin":
  - **Hop 6 &mdash; V2 Retrieve (f76_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":"2026-11-12T17:25:00+02:00","bookingStatus":"OnHold","pcc":"","supplier":"TravelportNdc","pnr":"CBR2DX","gdsPNR":"HNGCFD","booki
  - **Hop 7 &mdash; V2 BookAfterHold (f76_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"CBR2DX","gdsPNR":"HNGCFD","bookingToken":"42a7d323-1c55-49b9-8a61-46fad6007e75","creationDate":null,"ticketingDate":"2026-10-26T11:22:29","tickets":{"travelerRefId_1
  - **Hop 8 &mdash; V2 Retrieve (f76_V2):** PASS &mdash; 200 {"fareType":null,"bookedCredentialsSelector":"UAE","holdExpirationDate":null,"bookingStatus":"Booked","pcc":"","supplier":"TravelportNdc","pnr":"CBR2DX","gdsPNR":"HNGCFD","bookingToken":"42a7d323-1c55
  - **Hop 9 &mdash; V2 Void (f76_V2):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766798595","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 10 &mdash; V2 Retrieve (f76_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"ce9ea097-9653-4cac-a6bb-51ba85cd643b","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

### FLOW-V1-03-TPN-NEGHOP5 — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #3 rejects a stale bookingToken at the Void hop for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; Book &gt; Retrieve &gt; Void with a foreign bookingToken (V1)
- **Request:** V1 booking 72H23E taken through Book and Retrieve; at the Void hop bookingToken replaced with the token of booking 72HE26; both bookings retrieved afterwards
- **Response:** Void 409 OperationNotSupported (0.4s); Retrieve of 72H23E: ticket 1572141427289 Booked; Retrieve of 72HE26: 3 tickets Booked
- **Expected:** Void rejected with a 4xx standard envelope; the flow's booking stays ticketed.
- **Actual:** The Void is refused, both bookings stay ticketed, but only because V1 Void is unsupported for TravelportNdc: the stale-token check itself is never reached, so the check cannot be assessed on V1 (the V2 equivalent, NEGHOP6, shows the token is ignored). Blocked by TC-CAPCHECK-TPN-03.
- **Status:** BLOCKED
- **Evidence:** V1 TransactionId ba980502-7040-468a-b54d-0de283389210

  - **Hop 1 &mdash; V1 Search (b2_V1):** PASS &mdash; 200 {"responseId":"2ecaa868-1ee7-438d-90d6-5ae21f02d00e","supplier":"TravelportNdc","journeys":{"EKs5?EKs12":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs5","EKs12"]},"EKs8?E
  - **Hop 2 &mdash; V1 FareConfirm (b2_V1):** PASS &mdash; 200 {"responseId":"4f35d0ac-2e0b-4527-8cb6-225e1341f375","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V1 Book (b2_V1):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1572141427289","carrierCode":"QR"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:04:41","holdExpirationDat
  - **Hop 4 &mdash; V1 Void (NEG02-mixtoken):** PASS &mdash; 409 {"Status":409,"TransactionId":"ba980502-7040-468a-b54d-0de283389210","ErrorCode":"OperationNotSupported","ErrorMessage":"This action is not currently supported by the selected supplier.","Context":[{"
  - **Hop 5 &mdash; V1 Retrieve (chk):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1572141427289","carrierCode":"QR"}},"creationDate":"2026-10-26T00:00:00","ticketingDate":"2026-10-26T11:04:00","fareType":null,"b
  - **Hop 6 &mdash; V1 Retrieve (chk-other):** PASS &mdash; 200 {"tickets":{"travelerRefId_1":{"ticketStatus":"Booked","ticketNumber":"1572141427295","carrierCode":"QR"},"travelerRefId_2":{"ticketStatus":"Booked","ticketNumber":"1572141427294","carrierCode":"QR"},

### FLOW-V2-27-TPN-NEGHOP6 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Request] Validate Family-C flow #27 rejects a stale bookingToken at the Void hop for TravelportNdc.
- **Category:** Flow
- **Endpoint Name:** Search &gt; FareConfirm &gt; AddPassenger &gt; Book &gt; Retrieve &gt; Void with a foreign bookingToken (V2)
- **Request:** V2 booking B8R3UP (gdsPNR HNGCGB) taken through Book and Retrieve; at the Void hop (6) bookingToken replaced with 72I955's token; booking Retrieved afterwards
- **Response:** Void 200 in 16.6s {voided:true, voidedTickets:[{Voided, 1765766802060, EK}]}; Retrieve afterwards 409 cancelled. (Hop 5 Retrieve immediately after Book returned a transient 409 TEMPORARY "RESERVATION UPDATE IN PROGRESS", then the flow continued.)
- **Expected:** Void rejected with a 4xx standard envelope; the flow's booking stays ticketed.
- **Actual:** The stale token is not detected: Void succeeds with another booking's bookingToken and voids the flow's own booking (the donor booking stayed ticketed). Expected a 4xx and the booking left ticketed. Same root cause as VAL-02 / NEG-02. Side observation: Retrieve straight after an Emirates Book can return a retryable supplier error mapped to the unmapped NDC-INT-UNC-Z9999.
- **Status:** FAIL
- **Evidence:** ok Search offer reconciles (fully itemized offer picked) (28 of 53 offers fully itemized); ok FareConfirm reconciles; ok FareConfirm total equals Search total (1985 vs 1985); ok Book selectedOffer reconciles; ok Book total equals FareConfirm tier total (1985 vs 1985); FAIL Retrieve before Void shows tickets Booked (none); ok Void succeeds (2xx, voided=true) (200 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802060","carrierCode":"EK"}],"passen)

  - **Hop 1 &mdash; V2 Search (nh6_V2):** PASS &mdash; 200 {"responseId":"f689fed0-9c45-49cb-8fea-607c4ca90218","supplier":"TravelportNdc","journeys":{"EKs14?EKs7":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["EKs14","EKs7"]},"EKs11?
  - **Hop 2 &mdash; V2 FareConfirm (nh6_V2):** PASS &mdash; 200 {"responseId":"eb94eedf-d907-4567-94cc-1680392b60cd","supplier":"TravelportNdc","journeys":{"f1?f2":{"origin":"CAI","destination":"JED","numberOfStops":1,"segmentRefIds":["f1","f2"]}},"flightSegments"
  - **Hop 3 &mdash; V2 AddPassenger (nh6_V2):** PASS &mdash; 200 {"offerId":"0e084e63-ef0b-4972-9b1f-83168c24eeba&amp;yAHcY9IAAAIX9nuf2SQyYWMwZjVjZC1kOTc3LTQzYjUtOTlkNS0yYzFiYjI4NmI5MjnZJDBlMDg0ZTYzLWVmMGItNDk3Mi05YjFmLTgzMTY4YzI0ZWViYZGSp0VLX0NQTzCRkaRFS3A1AQAAkZSsRWN
  - **Hop 4 &mdash; V2 Book (nh6_V2):** PASS &mdash; 200 {"supplier":"TravelportNdc","pnr":"B8R3UP","gdsPNR":"HNGCGB","bookingToken":"2ac0f5cd-d977-43b5-99d5-2c1bb286b929","ticketingDate":"2026-10-26T11:24:53","tickets":{"travelerRefId_1":{"ticketStatus":"B
  - **Hop 5 &mdash; V2 Retrieve (nh6_V2):** FAIL &mdash; 409 {"Status":409,"TransactionId":"c0a20e7c-0830-4f69-8fb5-4d4b33682d12","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"TEMPORARY","Value":"RESERVATION RETRIEVE FAI
  - **Hop 6 &mdash; V2 Void (nh6_V2-foreigntoken):** FAIL &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1765766802060","carrierCode":"EK"}],"passengersVoidedAncillaries":null,"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (nh6_V2-after):** PASS &mdash; 409 {"Status":409,"TransactionId":"3cdc245b-97ed-41c2-9c7d-99b2374e7243","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ReservationCancelled","Value":"Reservation i

## Findings

### Defects

- **[TC-CAPCHECK-TPN-02] TravelportNdc Book and Retrieve omit voidCapability on V1 and V2, even for a booking ticketed today** Field: `voidCapability`. Expected: "voidCapability": "&lt;void-allowed value&gt;" (e.g. FullVoidOnlyAllowed) on a same-day ticketed booking, switching to VoidNotAllowed once voided or past the window. **Impact:** Callers cannot decide from the booking whether to offer Void; the flag-vs-outcome consistency check (TC-VOIDTPN-BIZ-05) cannot be performed Evidence: V1 Book 72HIJQ and V2 Book 72HZA2 (2026-10-26): key lists contain no voidCapability; same for RetrieveBooking/Retrieve. Same defect as TravelportNdc V1 Book on 2026-08-05 and SabreNdc 2026-10-22/25
- **[TC-CAPCHECK-TPN-03] V1 Void for TravelportNdc is still rejected as 409 OperationNotSupported ("TravelportNdc does not exists") while V2 Void works on the same build** Field: `ErrorCode / Context`. Expected: HTTP 200 {voided:true, voidedTickets:[{ticketStatus:"Voided", ticketNumber, carrierCode}]} for a same-day ticketed V1 booking, as V2 returns. **Impact:** V1 clients cannot void TravelportNdc bookings at all; every V1 Void case and V1 Void flow ends at the Void hop and the ticket stays live Evidence: V1 72HIJQ Void 409 twice (TransactionIds fc7546a6-..., fb13b0d5-...); V2 72HZA2 Void 200 in 13.1s; build ndc-integration-stg-ne-5, 2026-10-26
- **[TC-VOIDTPN-VAL-02] TravelportNdc V2 Void ignores bookingToken: omitted, empty, whitespace-only, upper-cased, 1000-character or another booking's token all still void the booking** Field: `bookingToken`. Expected: 400 standard envelope, e.g. {Status:400, ErrorCode:"NDC-INT-TEC-A0001", Context:[{Name:"PredicateValidator", Value:"BookingToken is required"}]}, booking left ticketed (a token that does not belong to the PNR rejected the same way). **Impact:** The only secret proving the caller owns a booking is not checked; anyone who knows a gdsPNR can void that ticket (the PNR itself is not checked either, see BND-01) Evidence: V2 72IAMX (token omitted) and 72IEZ9 (token empty) voided 2026-10-26; same behaviour for whitespace, upper-case, 1000-char and foreign tokens (BND-01, NEG-02)
- **[TC-VOIDTPN-VAL-04] TravelportNdc V2 Void ignores surName: a surname that matches no passenger, or no surname, voids the booking (same defect as SabreNdc 2026-10-22)** Field: `surName`. Expected: 4xx standard envelope, e.g. {Status:400, ErrorCode:"NDC-INT-TEC-A0001", Context:[{Value:"surName does not match any passenger on the PNR"}]}, booking left ticketed. **Impact:** The documented passenger-identity check on Void is missing; a caller with a gdsPNR can void any ticketed booking (also lets every SEC-04 injection string through) Evidence: V2 72J5K8 (surName Mismatch) and 72IQPE (surName omitted) voided 2026-10-26
- **[TC-VOIDTPN-VAL-07] TravelportNdc Void errors expose internal .NET type names (400 context) and the raw Travelport request/response (409 OriginalSupplierRequest/OriginalSupplierResponse)** Field: `context[].value / OriginalSupplierRequest / OriginalSupplierResponse`. Expected: context [{name:"voidTickets[0]", value:"Each voidTickets item must be an object with ticketNumber"}] and no OriginalSupplier* fields (or null). **Impact:** Internal type names and supplier payloads are visible to API callers; raw supplier replies can contain record data and make error handling brittle Evidence: V2 400 (voidTickets [123]) context names NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType; V2 409s for unknown PNR (ZZZZZZ), cancelled hold, and EGY-credential Void carry OriginalSupplierRequest/OriginalSupplierResponse; 2026-10-26
- **[TC-VOIDTPN-VAL-10] V2 Void returns passengersVoidedAncillaries: null for a booking without ancillaries; emdTickets is {} and SabreNdc returns {} for both** Field: `passengersVoidedAncillaries`. Expected: "passengersVoidedAncillaries": {} (empty, as emdTickets and the SabreNdc response). **Impact:** Clients that iterate the field without a null check fail on every TravelportNdc V2 Void; the two V2-only fields behave differently from each other Evidence: V2 Void of 72HZA2: passengersVoidedAncillaries null, emdTickets {}; SabreNdc V2 Void SFDJFF: {} and {}, 2026-10-26
- **[TC-VOIDTPN-BND-01] TravelportNdc V2 Void accepts a whitespace-only pnr (only non-empty and max 9 characters are checked) and voids the booking identified by gdsPNR** Field: `pnr`. Expected: 400 standard envelope naming pnr for a blank value, e.g. Context [{Value:"PNR is required"}]. **Impact:** pnr is effectively decorative: a Void succeeds with a blank pnr, so the PNR/gdsPNR pair is never cross-checked and a mistyped pnr cannot be detected Evidence: V2 72H7ZT voided with pnr '      ' on 2026-10-26; ErrorCode would be NDC-INT-TEC-A0001 as for an empty pnr
- **[TC-VOIDTPN-BIZ-03] Void on a held, unticketed TravelportNdc booking returns 200 {voided:false, voidedTickets:[]} and cancels the hold** Field: `voided`. Expected: A 4xx standard envelope, e.g. {Status:409, ErrorCode:"VoidNotEligible", ErrorMessage:"Only ticketed bookings can be voided"}, and the hold left alive. **Impact:** A caller that voids the wrong (held) booking silently loses the hold while receiving a 2xx; the response contradicts itself (success status, voided:false) Evidence: V2 hold 72JHGP: Void 200 voided:false in 9.2s, then Retrieve 409 "Reservation is already cancelled", 2026-10-26
- **[TC-VOIDTPN-BIZ-06] TravelportNdc V2 Void ignores the voidTickets list: a subset, a fabricated ticket number and another booking's ticket number all result in void-all of the PNR (same defect class as SabreNdc 2026-10-22)** Field: `voidTickets`. Expected: Only the listed ticket voided (voidedTickets with one entry), or a 4xx envelope e.g. {Status:400, Context:[{Value:"Partial void is not supported"}]}; a ticket not on the PNR always rejected. **Impact:** Selective void silently becomes void-all: a caller asking to void one ticket loses every ticket, including a lone infant/adult pairing Evidence: V2 72HKTY: voidTickets [1572141427292] voided all 3 tickets, 2026-10-26; see also NEG-03
- **[TC-VOIDTPN-NEG-01] Void for an unknown TravelportNdc record locator returns the unmapped 409 NDC-INT-UNC-Z9999 (ErrorMessage = the code) and echoes the raw Travelport request and response** Field: `ErrorCode / OriginalSupplierResponse`. Expected: {Status:404 or 409, ErrorCode:"BookingNotFound", ErrorMessage:"No booking found for the supplied PNR", Context:[...]} with no OriginalSupplier* content. **Impact:** Callers get no usable error code and supplier internals are exposed in the API response Evidence: V2 TransactionId 56c05e57-6eb4-4b07-99b1-1901ddd1439d, 2026-10-26; same family as SabreNdc 2026-10-22
- **[TC-VOIDTPN-NEG-05] Void errors use two envelope casings (Status/ErrorCode vs status/errorCode "1001"), the unmapped NDC-INT-UNC-Z9999 whose message equals the code, and two different codes for "reservation cancelled" depending on the carrier (QR BYP-A0003, EK Z9999)** Field: `error envelope (ErrorCode / ErrorMessage)`. Expected: {Status, TransactionId, ErrorCode, ErrorMessage, Context} everywhere, one code for "already cancelled", distinct Void business-rule codes, a human-readable ErrorMessage on every error. **Impact:** Clients need two error parsers and cannot reliably detect the cancelled state (INT-02) or a not-found booking Evidence: See the mapping table in the response summary; TransactionIds listed in NEG-01, BIZ-02, VAL-05; EK retrieve after void: 409 Z9999 context ReservationCancelled, 2026-10-26
- **[FLOW-V2-74-TPN] V2 Book called with the Upselling ResponseId/offerId and no AddPassenger step returns HTTP 500 ServerError instead of a 400 naming the missing passenger details** Field: `Book (V2) without AddPassenger`. Expected: 400 standard envelope, e.g. {Status:400, ErrorCode:"NDC-INT-TEC-A0001", Context:[{Value:"Passenger details are required: call AddPassenger first"}]}. **Impact:** flow.md omits AddPassenger for flows 72-89; a client following it gets an opaque 500 and a transaction id Evidence: V2 Book, TransactionId 12fc86ad-5a49-43b1-9408-2d163dd409c0, 2026-10-26

### Unknown-resolutions

- **[TC-VOIDTPN-VAL-03]** TravelportNdc V2 Void requires a non-empty gdsPNR (400 "GdsPnr is required" for "" and for omitted); SabreNdc accepted "" Evidence: V2 72IL2M and 72HPIB, 2026-10-26
- **[TC-VOIDTPN-SEC-03]** TravelportNdc Void under a different (active) credentialsSelector is forwarded to Travelport, which refuses it ("AT LEAST ONE DOCUMENT REFUND WAS NOT PROCESSED CORRECTLY"); the integration returns 409 NDC-INT-UNC-Z9999 with the raw reply. Cross-tenant protection therefore depends on the supplier, not on an integration check Evidence: V2 72J3D3 with credentialsSelector EGY, 9.9s, 2026-10-26; booking remained ticketed
- **[TC-VOIDTPN-INT-02]** Retrieve after a TravelportNdc Void returns the terminal 409 "Reservation is already cancelled" (QR: NDC-INT-BYP-A0003; EK: NDC-INT-UNC-Z9999 with context ReservationCancelled); there is no voided ticketStatus / bookingStatus to read back Evidence: V2 72HZA2 (QR) and GLUPQB (EK), 2026-10-26
- **[FLOW-V2-74-TPN]** flow.md anomaly for flows 72-89 resolved: AddPassenger is required between Upselling and Book on V2 (Book without it returns 500) Evidence: V2 TransactionId 12fc86ad-5a49-43b1-9408-2d163dd409c0, 2026-10-26
- **[TC-VOIDTPN-POS-02]** TravelportNdc V2 Void success contract recorded: 200 {voided:true, voidedTickets:[{ticketStatus:"Voided", ticketNumber, carrierCode}], passengersVoidedAncillaries:null, emdTickets:{}} in 11-17s; Book ticketing is synchronous so a same-day Void can follow immediately (V1: 409 OperationNotSupported) Evidence: V2 72HZA2 (QR) 13.1s, GLUPQB (EK) 15.4s, 2026-10-26, build ndc-integration-stg-ne-5
- **[TC-VOIDTPN-POS-05]** voidTickets element shape on TravelportNdc: an OBJECT {ticketNumber, carrierCode, ticketStatus} (plain strings and numbers fail with 400 errorCode 1001 naming $.voidTickets[0]); [] and an omitted field both mean void-all, null is rejected ("VoidTickets field is required"); the list content is not honoured (BIZ-06, NEG-03) Evidence: V2 72HDNZ (full object list voided 3 tickets), fresh bookings for string / [123] / null / omitted, 2026-10-26
- **[TC-VOIDTPN-POS-01]** A TravelportNdc booking created through V1 can be voided through the V2 Void endpoint (same pnr/gdsPNR/bookingToken): used to clean up the eight V1 bookings left ticketed by the refused V1 Voids. V1 Void itself remains unsupported Evidence: V1 bookings 72H23E, 72HIJQ, 72HE26, 72IJB4, ERWME6, MQEVZS, ITUPEB, MRJVLF voided via V2 and then 409 cancelled on V1 RetrieveBooking

### Also re-confirmed

- **[TC-VOIDTPN-POS-01] V1 Void OperationNotSupported (TravelportNdc)** &mdash; Same defect as TC-CAPCHECK-TPN-03: V1 Void for TravelportNdc returns 409 OperationNotSupported
- **[TC-VOIDTPN-BND-01] bookingToken not validated (TC-VOIDTPN-VAL-02)** &mdash; Whitespace-only, upper-cased and 1000-character bookingToken values all voided their booking, same root cause as VAL-02
- **[TC-VOIDTPN-BIZ-05] voidCapability missing (TC-CAPCHECK-TPN-02)** &mdash; voidCapability absent on every TravelportNdc Book, BookAfterHold and Retrieve (V1 and V2) this run
- **[TC-VOIDTPN-NEG-02] bookingToken not validated (TC-VOIDTPN-VAL-02)** &mdash; A booking's pnr/gdsPNR with another booking's bookingToken voids the first booking
- **[TC-VOIDTPN-NEG-03] voidTickets ignored (TC-VOIDTPN-BIZ-06)** &mdash; A fabricated ticket number or another booking's ticket number in voidTickets voids all tickets of the PNR
- **[TC-VOIDTPN-SEC-04] surName not validated (TC-VOIDTPN-VAL-04)** &mdash; SQL, script and 500-character surName strings all voided their booking, same root cause as VAL-04
- **[TC-VOIDTPN-REG-02] V1 Void OperationNotSupported (TravelportNdc)** &mdash; V1 and V2 Void differ for every scenario that reaches the Void handler because V1 is not routed for TravelportNdc
- **[FLOW-V1-03-TPN] V1 Void OperationNotSupported (TravelportNdc)** &mdash; Void hop of the V1 Family-C flow returns 409 OperationNotSupported
- **[FLOW-V1-05-TPN] V1 Void OperationNotSupported (TravelportNdc)** &mdash; Void hop of the V1 Family-E flow returns 409 OperationNotSupported
- **[FLOW-V1-09-TPN] V1 Upselling returns no selectedOffer (BUG-16)** &mdash; V1 Upselling returned upsellOffers[] and no selectedOffer on TravelportNdc (also SabreNdc Round 2 BUG-16 and TravelportNdc 2026-08-05 BUG-08)
- **[FLOW-V1-09-TPN] V1 Void OperationNotSupported (TravelportNdc)** &mdash; Void hop of the V1 Upselling Family-C flow returns 409 OperationNotSupported
- **[FLOW-V1-11-TPN] V1 Void OperationNotSupported (TravelportNdc)** &mdash; Void hop of the V1 Upselling Family-E flow returns 409 OperationNotSupported
- **[FLOW-V2-27-TPN-NEGHOP6] bookingToken not validated (TC-VOIDTPN-VAL-02)** &mdash; The flow's Void hop accepted another booking's bookingToken

## Proposed SPEC.md updates

- §2.15 Expected Success Response &mdash; status: *pending*
  - **Old:** "**Expected Success Response**: `UNKNOWN` for a void-eligible booking — not observed this run. `[Confirmed live 2026-08-05, V1/TravelportNdc]`: Void is **not supported** for this supplier at all"
  - **New:** "**Expected Success Response** `[Confirmed live 2026-10-26, TravelportNdc/UAE, V2, build ndc-integration-stg-ne-5]`: HTTP 200 `{voided: true, voidedTickets: [{ticketStatus: "Voided", ticketNumber, carrierCode}], passengersVoidedAncillaries: null, emdTickets: {}}` in 11-17s (passengersVoidedAncillaries is null, not {} as on SabreNdc: defect). Book ticketing is synchronous, so a same-day Void can follow at once; Void also works for a Hold &gt; BookAfterHold booking. `[Confirmed live 2026-10-26, V1/TravelportNdc]`: V1 Void is **still not supported** (409 OperationNotSupported, Context "TravelportNdc does not exists"); the 2026-08-05 text applies to V1 only"
  - **Correction:** V2 confirmed in TC-VOIDTPN-POS-02/03/04/05 and the V2 flows; V1 refusal re-confirmed in POS-01 and the V1 flows.

- §2.15 Required Request Fields (voidTickets, gdsPNR) &mdash; status: *pending*
  - **Old:** "`voidTickets` (array, empty `[]` in every saved example — `UNKNOWN` exact shape when populated, presumably ticket numbers to selectively void vs. void-all-when-empty)."
  - **New:** "`voidTickets` `[Confirmed live 2026-10-26, TravelportNdc V2]`: array of TicketType objects `{ticketNumber, carrierCode, ticketStatus}` (plain strings/numbers: 400 errorCode 1001); `[]` and an omitted field void every ticket on the PNR (ADT+CHD+INF confirmed), `null` is rejected. DEFECT: the list is not honoured (a subset, a fabricated number and another booking's ticket all void every ticket). `gdsPNR` is mandatory for TravelportNdc (400 "GdsPnr is required" for "" or omitted) and is the field the booking is looked up by; `pnr` is only checked non-empty and max 9 characters, `bookingToken` and `surName` are not validated at all (DEFECTS: wrong or missing values still void the booking)"
  - **Correction:** From TC-VOIDTPN-VAL-02/03/04/06, BND-01, NEG-02/03, BIZ-06.

- §2.15 Common Errors &mdash; status: *pending*
  - **Old:** "**Common Errors**: voiding outside the void window; voiding a booking whose `voidCapability` was already `"VoidNotAllowed"` at Book time; voiding with an incorrect `surName`."
  - **New:** "**Common Errors** `[Confirmed live 2026-10-26, TravelportNdc V2]`: repeat Void or Void of a cancelled hold / voided PNR -&gt; 409 NDC-INT-BYP-A0003 "Reservation is already cancelled." (QR) or 409 NDC-INT-UNC-Z9999 with context ReservationCancelled (EK); unknown record locator -&gt; 409 NDC-INT-UNC-Z9999 "RECORD LOCATOR DOES NOT EXIST" (unmapped, raw supplier payload echoed); missing pnr / gdsPNR / inactive selector -&gt; 400 NDC-INT-TEC-A0001 (PascalCase); missing supplier / credentialsSelector, over-long pnr (&gt;9), wrong-type or null voidTickets -&gt; 400 errorCode "1001" (camelCase, leaks .NET type names); auth -&gt; 401 AuthenticationError. Void of a HELD booking is not rejected: 200 {voided:false, voidedTickets:[]} and the hold is cancelled (defect). `surName` is NOT checked (defect). The void-window rule (calendar day vs other) is still unconfirmed (no previous-day ticket available)"
  - **Correction:** From TC-VOIDTPN-BIZ-02/03/04, NEG-01/05, VAL-01/05/06.

- §2.11 Common Errors (Retrieve after Void) &mdash; status: *pending*
  - **Old:** "retrieving a cancelled booking `[Confirmed live 2026-08-05]` **fails** with HTTP 409, `ErrorCode: NDC-INT-BYP-A0003`"
  - **New:** "retrieving a cancelled **or voided** booking `[Confirmed live 2026-08-05; voided case 2026-10-26]` **fails** with HTTP 409, `ErrorCode: NDC-INT-BYP-A0003` (QR) — for Emirates bookings the same condition returns 409 `NDC-INT-UNC-Z9999` with Context `ReservationCancelled`; there is no voided `bookingStatus` / `ticketStatus` to read back"
  - **Correction:** Resolves the §6.3 vs §2.11 contradiction (TC-VOIDTPN-INT-02).

- §4.6 Capability Summary Matrix (TravelPortNDC row) &mdash; status: *pending*
  - **Old:** "| TravelPortNDC | Unknown | Unknown | Supported | Unknown | Unknown | Conditional (2 flags set, type unresolved) | Unknown |"
  - **New:** "| TravelPortNDC | Supported (V1+V2 Upselling 200, 2026-10-26) | Not Supported (haveBundles false on all 53 offers, UAE 2026-10-26) | Supported | Supported (V1+V2 CancelAfterHold confirmed) | **Supported on V2 only** (UAE, same-day, confirmed 2026-10-26); V1 409 OperationNotSupported | Conditional (V2 offerHasAncillary true on 25 of 53 offers; type unresolved) | Unknown |"
  - **Correction:** CAPCHECK-04: UAE and EGY selectors active for TravelportNdc, KSA inactive.

- §2.9 Expected Success Response (voidCapability) &mdash; status: *pending*
  - **Old:** "voidCapability,           // e.g. "VoidNotAllowed" — INFERRED a live, booking-specific flag indicating whether Void is currently possible for this PNR (see §2.14)"
  - **New:** "voidCapability,           // e.g. "VoidNotAllowed" — documented, but `[Confirmed live 2026-10-26]` NOT returned by TravelportNdc Book, BookAfterHold or Retrieve (V1 and V2), 2nd confirmation after 2026-08-05; SabreNdc Book returns FullVoidOnlyAllowed since the Round 2 build; tracked as a defect"

## Cleanup / follow-up

Nothing left needing cleanup.

