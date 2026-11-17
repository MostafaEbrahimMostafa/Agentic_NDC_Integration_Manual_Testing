# QA Execution Report — AirIndia / EGY - Booking Flow Regression Round 2 - ndc-supplier-integration - V1 and V2

**Environment:** non-production (ndc-supplier-integration) &middot; https://ndc-supplier-integration.azurewebsites.net/
**Supplier:** AirIndia  **Credentials Selector:** EGY
**Started:** 2026-11-02T12:42:42.817Z
**Ended:** 2026-11-02T13:55:38.145Z
**Status:** COMPLETE
**Execution Duration:** 1h 12m 55s ([View Time Breakdown](20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration_TimeBreakdown.html))
**Prior runs:** AirIndia/EGY full regression on ne-3 (2026-11-02, no inventory, BUG-01..11) and the unclosed supplier-integration sweep earlier the same day (see NDC_Integration/Artifacts/Logs/)

## Scope note

Booking-flow-only run of 287 test cases against AirIndia / EGY on ndc-supplier-integration (V1 and V2): 204 pass, 67 fail, 16 blocked. About 100 are new happy-path scenarios (10 passenger mixes, 21 routes, round trips, offer kinds, bundles, ancillaries, seats and 7 combinations); the rest map to TestCases_Generic/V1/V2 and SeatMap_TestCases booking rows and to the AirIndia regression rows. Hold, BookAfterHold, FareConfirmAfterHold, CancelAfterHold, Void, Upselling, FareCheck, FareRules and SeatAfterHold rows are excluded by request; cross-supplier rows are BLOCKED. 149 live bookings were created (non-production).

## Summary

- Test cases logged: 287 of 287 planned
- Passed: 204
- Failed: 67
- Blocked: 16
- Failed test cases: TC-AIBK-RTE-16, TC-AIBK-RTE-20, TC-AIBK-BDL-03, TC-AIBK-BDL-12, TC-AIBK-ANC-05, FLOW-V2-25, FLOW-V2-31, FLOW-V2-37, FLOW-V2-49, FLOW-V2-43, FLOW-V2-61, FLOW-V2-55, FLOW-V1-13, FLOW-V1-01, FLOW-V2-67, TC-BOOK-POS-02, TC-RETRIEVE-REG-01, TC-RETRIEVE-POS-01, TC-RETRIEVE-VAL-01, TC-AIBK-DATA-05, TC-AIBK-DATA-07, TC-AIBK-DATA-06, TC-BOOK-SEC-01, TC-AIEGY-RET-02, TC-VERSIONDIFF-VAL-03, TC-SEATMAP-POS-02, TC-SEATMAP-BND-02, TC-SEATMAP-VAL-08, TC-AIEGY-FARECONFIRM-NEG-01, TC-AIEGY-GETOFFERBUNDLES-NEG-01, TC-AIEGY-FARECONFIRM-NEG-03, TC-AIEGY-GETOFFERBUNDLES-NEG-03, TC-AIEGY-FARECONFIRM-NEG-02, TC-AIEGY-GETOFFERBUNDLES-NEG-02, TC-AIEGY-GETANCILLARY-NEG-02, TC-AIEGY-BOOK-NEG-01, TC-AIEGY-GETSEATMAP-NEG-02, TC-AIEGY-BOOK-NEG-03, TC-AIEGY-CHAIN-01, TC-AIEGY-BOOK-NEG-02, TC-BOOK-NEG-05, TC-FARECONFIRM-NEG-01, TC-FARECONFIRM-VAL-01, TC-AIEGY-CHAIN-02, TC-AIEGY-RETRIEVE-NEG-02, TC-AIEGY-RETRIEVE-NEG-03, TC-AIEGY-RET-01, TC-AIEGY-ANC-NEG-01, TC-SEATMAP-NEG-04, TC-AIBK-SEAT-NEG-01, TC-AIBK-NAME-01, TC-AIBK-NAME-02, TC-AIBK-ADDPAX-REPEAT-01, TC-AIBK-ADDPAX-BND-01, TC-AIEGY-SRCH-PAX-03, TC-SEARCH-BND-03, TC-AIEGY-SRCH-PAX-06, TC-SEARCH-BND-02, TC-AIBK-SRCH-PERF-01, TC-SEARCH-SEC-01, TC-AIEGY-BDL-01, TC-AIBK-V1-BDL-MP-01, TC-AIBK-V1-BDL-MP-02, TC-AIEGY-ENV-01, TC-AIEGY-SEC-02, TC-AIEGY-SEC-LEAK-01, TC-AIBK-V1-BDL-EMPTY-01
- Blocked test cases: TC-RETRIEVE-REG-01-SM, TC-BOOK-BIZ-02, TC-BOOK-NEG-03, TC-SEATMAP-INT-02, TC-SEATMAP-INT-03, TC-SEATMAP-SEC-02, FLOW-V2-31-NEG, FLOW-V2-43-NEG, FLOW-V2-49-NEG, TC-BOOK-BIZ-07, TC-SEATMAP-NEG-01, TC-SEATMAP-NEG-02, TC-SEATMAP-NEG-05, TC-BOOK-NEG-09, TC-BOOK-VAL-07, TC-BUNDLE-NEG-01

## Test case results

### TC-AIBK-PAX-01 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 1 adult completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR KVCBNF; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax01):** PASS &mdash; 200 offers=67 (6.8s)
  - **Hop 2 &mdash; V2 FareConfirm (pax01):** PASS &mdash; 200 {"responseId":"75f59e01-efb7-479c-8514-dd041ce7315c","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.3s)
  - **Hop 3 &mdash; V2 AddPassenger (pax01):** PASS &mdash; 200 {"offerId":"d5fdc2ed-6f4f-43f0-b625-65b704728513&amp;yApSY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVEV2T... (1.3s)
  - **Hop 4 &mdash; V2 Book (pax01):** PASS &mdash; 200 pnr KVCBNF (2.7s)
  - **Hop 5 &mdash; V2 Retrieve (pax01):** PASS &mdash; 200 pnr KVCBNF (1.1s)

### TC-AIBK-PAX-02 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 2 adults completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR IU4MMI; total 5418; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 5418, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax02):** PASS &mdash; 200 offers=67 (6.2s)
  - **Hop 2 &mdash; V2 FareConfirm (pax02):** PASS &mdash; 200 {"responseId":"17ba066f-6a01-4ed2-be18-9040cff380f5","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (pax02):** PASS &mdash; 200 {"offerId":"c0b1ea9f-4943-4717-8bf5-7eb329d011cf&amp;yAqOY9IAAEbX8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVEV2T... (1.2s)
  - **Hop 4 &mdash; V2 Book (pax02):** PASS &mdash; 200 pnr IU4MMI (2.2s)
  - **Hop 5 &mdash; V2 Retrieve (pax02):** PASS &mdash; 200 pnr IU4MMI (0.7s)

### TC-AIBK-PAX-03 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 1 adult + 1 child completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR BV6LUF; total 10308; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 10308, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax03):** PASS &mdash; 200 offers=66 (5.2s)
  - **Hop 2 &mdash; V2 FareConfirm (pax03):** PASS &mdash; 200 {"responseId":"fc7ecacd-6d52-4210-a42d-72df639d44bb","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (pax03):** PASS &mdash; 200 {"offerId":"cf93a336-ace7-4c93-b6a5-04013ffb8a56&amp;yAqxY9IAAEme/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNVGd2T... (1.4s)
  - **Hop 4 &mdash; V2 Book (pax03):** PASS &mdash; 200 pnr BV6LUF (4.9s)
  - **Hop 5 &mdash; V2 Retrieve (pax03):** PASS &mdash; 200 pnr BV6LUF (0.8s)

### TC-AIBK-PAX-05 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 2 adults + 1 child + 1 infant completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR K8STUX; total 11127; reconciled; 4 passengers echoed | Retrieve matches Book (pnr, token, total 11127, 4 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax05):** PASS &mdash; 200 offers=70 (14.0s)
  - **Hop 2 &mdash; V2 FareConfirm (pax05):** PASS &mdash; 200 {"responseId":"96a846e1-3810-4fce-a856-767980725ef2","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MD... (1.3s)
  - **Hop 3 &mdash; V2 AddPassenger (pax05):** PASS &mdash; 200 {"offerId":"5d6ee9d0-4b79-42db-8cb4-1c6685bb50f7&amp;yAs+Y9IAAE2Y8Q+TmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01ERXYEAPwDa... (2.1s)
  - **Hop 4 &mdash; V2 Book (pax05):** PASS &mdash; 200 pnr K8STUX (2.2s)
  - **Hop 5 &mdash; V2 Retrieve (pax05):** PASS &mdash; 200 pnr K8STUX (1.0s)

### TC-AIBK-PAX-04 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 1 adult + 1 infant completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR WSNIVR; total 5709; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 5709, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax04):** PASS &mdash; 200 offers=70 (15.5s)
  - **Hop 2 &mdash; V2 FareConfirm (pax04):** PASS &mdash; 200 {"responseId":"af503282-4233-4db0-b2c9-dc5f822c01e1","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.3s)
  - **Hop 3 &mdash; V2 AddPassenger (pax04):** PASS &mdash; 200 {"offerId":"2c5c8699-7b0a-4768-9f91-6e131d7deeb3&amp;yArPY9IAAEmW8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNalV2T... (1.3s)
  - **Hop 4 &mdash; V2 Book (pax04):** PASS &mdash; 200 pnr WSNIVR (2.0s)
  - **Hop 5 &mdash; V2 Retrieve (pax04):** PASS &mdash; 200 pnr WSNIVR (1.1s)

### TC-AIBK-RTE-01 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking BOM-DEL (domestic, ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route BOM-DEL
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR N35ZRZ; total 5274; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 5274, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteBOM-DEL):** PASS &mdash; 200 offers=71 (5.2s)
  - **Hop 2 &mdash; V2 FareConfirm (rteBOM-DEL):** PASS &mdash; 200 {"responseId":"21cba1ae-83ca-46ea-a66a-a6c66384917d","supplier":"AirIndia","journeys":{"SVh_MTQ4M34gfn5CT01_MT... (1.4s)
  - **Hop 3 &mdash; V2 AddPassenger (rteBOM-DEL):** PASS &mdash; 200 {"offerId":"29a9a68c-04bc-4ca5-b397-6bc086be242e&amp;yAoKY9IAAEUD/iaTmZGW2UhTVmhfTVRRNE0zNGdmbjVDVDAxX01USXZNamt2T... (1.2s)
  - **Hop 4 &mdash; V2 Book (rteBOM-DEL):** PASS &mdash; 200 pnr N35ZRZ (2.0s)
  - **Hop 5 &mdash; V2 Retrieve (rteBOM-DEL):** PASS &mdash; 200 pnr N35ZRZ (0.7s)

### TC-AIBK-RTE-02 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-BLR (domestic, ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-BLR
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR G367VZ; total 6721; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 6721, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-BLR):** PASS &mdash; 200 offers=99 (4.4s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-BLR):** PASS &mdash; 200 {"responseId":"220edc64-0826-4e5c-b94b-c3125a1f899d","supplier":"AirIndia","journeys":{"SVh_MTA4M34gfn5ERUx_MD... (1.3s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-BLR):** PASS &mdash; 200 {"offerId":"bee7a363-76a6-4fe6-b6b5-376d7172843b&amp;yAphY9IAAEY7/iaTmZGW2ZRTVmhfTVRBNE0zNGdmbjVFUlV4X01ERXZNRFV2T... (0.7s)
  - **Hop 4 &mdash; V2 Book (rteDEL-BLR):** PASS &mdash; 200 pnr G367VZ (2.5s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-BLR):** PASS &mdash; 200 pnr G367VZ (0.8s)

### TC-AIBK-PAX-09 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 2 adults + 2 infants (one infant per adult) completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR K4VRJT; total 11418; reconciled; 4 passengers echoed | Retrieve matches Book (pnr, token, total 11418, 4 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax09):** PASS &mdash; 200 offers=63 (13.7s)
  - **Hop 2 &mdash; V2 FareConfirm (pax09):** PASS &mdash; 200 {"responseId":"df6f9b09-fdbc-4d62-95bc-6055da05b26f","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (pax09):** PASS &mdash; 200 {"offerId":"df7a415a-243d-413d-a364-b03d3e3431ba&amp;yAsOY9IAAEqH8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVFV2T... (2.2s)
  - **Hop 4 &mdash; V2 Book (pax09):** PASS &mdash; 200 pnr K4VRJT (1.9s)
  - **Hop 5 &mdash; V2 Retrieve (pax09):** PASS &mdash; 200 pnr K4VRJT (1.0s)

### TC-AIBK-RTE-04 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-MAA (domestic, ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-MAA
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR S3KDSZ; total 11854; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 11854, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-MAA):** PASS &mdash; 200 offers=36 (3.4s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-MAA):** PASS &mdash; 200 {"responseId":"680c7b74-6619-427b-900a-2c397f2f23a0","supplier":"AirIndia","journeys":{"SVh_MTAzMn4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-MAA):** PASS &mdash; 200 {"offerId":"d511608e-6e9c-4fc3-a56a-92c9e3914567&amp;yAqMY9IAAElN/SaTmZGW2ZRTVmhfTVRBek1uNGdmbjVFUlV4X01USXZNRFV2T... (1.5s)
  - **Hop 4 &mdash; V2 Book (rteDEL-MAA):** PASS &mdash; 200 pnr S3KDSZ (2.8s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-MAA):** PASS &mdash; 200 pnr S3KDSZ (0.8s)

### TC-AIBK-RTE-05 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-CCU (domestic, ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-CCU
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR T5YQ8D; total 4995; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 4995, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-CCU):** PASS &mdash; 200 offers=60 (3.7s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-CCU):** PASS &mdash; 200 {"responseId":"6915b207-7284-480d-a669-b38158054356","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (1.4s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-CCU):** PASS &mdash; 200 {"offerId":"95c77036-cce2-46ab-81e4-6fa45fc1fc15&amp;yAqsY9IAAILn8Q+TmZGW2ZRTVmhfTVRBMk4zNGdmbjVFUlV4X01USXYEAP0Da... (0.9s)
  - **Hop 4 &mdash; V2 Book (rteDEL-CCU):** PASS &mdash; 200 pnr T5YQ8D (2.3s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-CCU):** PASS &mdash; 200 pnr T5YQ8D (0.8s)

### TC-AIBK-RTE-08 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking BOM-GOI (domestic, ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route BOM-GOI
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR K8U7MH; total 2459; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2459, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteBOM-GOI):** PASS &mdash; 200 offers=8 (3.4s)
  - **Hop 2 &mdash; V2 FareConfirm (rteBOM-GOI):** PASS &mdash; 200 {"responseId":"810b26d8-4bff-4870-b78e-89361f8faf48","supplier":"AirIndia","journeys":{"SVh_MTIzOH4gfn5CT01_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteBOM-GOI):** PASS &mdash; 200 {"offerId":"f9606f68-00dd-4291-b8b9-5fc7191e81d3&amp;yAmdY9IAAELi/iaTmZGW2UhTVmhfTVRJek9INGdmbjVDVDAxX01ERXZNREl2T... (0.9s)
  - **Hop 4 &mdash; V2 Book (rteBOM-GOI):** PASS &mdash; 200 pnr K8U7MH (2.0s)
  - **Hop 5 &mdash; V2 Retrieve (rteBOM-GOI):** PASS &mdash; 200 pnr K8U7MH (0.8s)

### TC-AIBK-RTE-07 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking BOM-BLR (domestic, ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route BOM-BLR
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR S153GC; total 6752; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 6752, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteBOM-BLR):** PASS &mdash; 200 offers=65 (5.0s)
  - **Hop 2 &mdash; V2 FareConfirm (rteBOM-BLR):** PASS &mdash; 200 {"responseId":"50d7a61b-5df0-41ae-959a-364e643f639a","supplier":"AirIndia","journeys":{"SVh_MTAyNn4gfn5CT01_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteBOM-BLR):** PASS &mdash; 200 {"offerId":"e5d83947-55d2-4b73-b7db-111d5f80435a&amp;yAqtY9IAAEmZ/SaTmZGW2ZRTVmhfTVRBeU5uNGdmbjVDVDAxX01USXZNall2T... (1.3s)
  - **Hop 4 &mdash; V2 Book (rteBOM-BLR):** PASS &mdash; 200 pnr S153GC (2.2s)
  - **Hop 5 &mdash; V2 Retrieve (rteBOM-BLR):** PASS &mdash; 200 pnr S153GC (0.7s)

### TC-AIBK-RTE-06 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-HYD (domestic, ADT+ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-HYD
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR A8RDSH; total 13986; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 13986, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-HYD):** PASS &mdash; 200 offers=37 (7.5s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-HYD):** PASS &mdash; 200 {"responseId":"c591eb03-21aa-45ee-8c24-56df75f4c817","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.4s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-HYD):** PASS &mdash; 200 {"offerId":"bab3c44f-105f-4ffa-88d9-c8def2cdb860&amp;yAsLY9IAAEo68CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGt2T... (2.1s)
  - **Hop 4 &mdash; V2 Book (rteDEL-HYD):** PASS &mdash; 200 pnr A8RDSH (1.9s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-HYD):** PASS &mdash; 200 pnr A8RDSH (0.7s)

### TC-AIBK-RTE-10 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DXB-BOM (international, ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DXB-BOM
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR I95RVH; total 19242; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 19242, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDXB-BOM):** PASS &mdash; 200 offers=23 (3.4s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDXB-BOM):** PASS &mdash; 200 {"responseId":"6971d173-0036-4347-9a54-46f83c6aa5af","supplier":"AirIndia","journeys":{"SVh_IDQzNn4gfn5EWEJ_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDXB-BOM):** PASS &mdash; 200 {"offerId":"08a73de5-faf3-4d00-86d9-148e7bb9080f&amp;yArIY9IAAEoD/CaTmZGW2ZRTVmhfSURRek5uNGdmbjVFV0VKX01USXZNREl2T... (1.2s)
  - **Hop 4 &mdash; V2 Book (rteDXB-BOM):** PASS &mdash; 200 pnr I95RVH (1.8s)
  - **Hop 5 &mdash; V2 Retrieve (rteDXB-BOM):** PASS &mdash; 200 pnr I95RVH (0.7s)

### TC-AIBK-RTE-11 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-DXB (international, ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-DXB
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR S3DPFZ; total 10559; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 10559, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-DXB):** PASS &mdash; 200 offers=18 (3.4s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-DXB):** PASS &mdash; 200 {"responseId":"700d5812-f381-4189-968e-eaa0b2b84b30","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-DXB):** PASS &mdash; 200 {"offerId":"2e21299a-0260-45d0-9c85-96db2e075099&amp;yAppY9IAAEZV/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNRGt2T... (0.8s)
  - **Hop 4 &mdash; V2 Book (rteDEL-DXB):** PASS &mdash; 200 pnr S3DPFZ (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-DXB):** PASS &mdash; 200 pnr S3DPFZ (0.8s)

### TC-AIBK-RTE-03 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking BLR-DEL (domestic, ADT+ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route BLR-DEL
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 6 calls matched: PNR OU7EKY; total 14506; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 14506, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteBLR-DEL):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (rteBLR-DELretry1):** PASS &mdash; 200 offers=105 (14.9s)
  - **Hop 3 &mdash; V2 FareConfirm (rteBLR-DEL):** PASS &mdash; 200 {"responseId":"ba0f1ee7-ddba-476c-bca7-a31eced56604","supplier":"AirIndia","journeys":{"SVh_MTUzNH4gfn5CTFJ_MT... (1.2s)
  - **Hop 4 &mdash; V2 AddPassenger (rteBLR-DEL):** PASS &mdash; 200 {"offerId":"25d907d4-ca11-484b-911e-dd011cd0cf05&amp;yAthY9IAAIcc/CaTmZGW2ZRTVmhfTVRVek5INGdmbjVDVEZKX01URXZNamd2T... (1.6s)
  - **Hop 5 &mdash; V2 Book (rteBLR-DEL):** PASS &mdash; 200 pnr OU7EKY (1.6s)
  - **Hop 6 &mdash; V2 Retrieve (rteBLR-DEL):** PASS &mdash; 200 pnr OU7EKY (0.8s)

### TC-AIBK-RTE-09 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking BOM-DXB (international, ADT+ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route BOM-DXB
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR N8MZHX; total 35796; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 35796, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteBOM-DXB):** PASS &mdash; 200 offers=69 (8.3s)
  - **Hop 2 &mdash; V2 FareConfirm (rteBOM-DXB):** PASS &mdash; 200 {"responseId":"6eb9a441-87e9-4ac9-8584-52e78d36fcf3","supplier":"AirIndia","journeys":{"SVh_MTc5N34gfn5CT01_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteBOM-DXB):** PASS &mdash; 200 {"offerId":"824a9e96-1daa-48a8-ba00-00b34460f45e&amp;yAuoY9IAAIdP/iaTmZGW2ZRTVmhfTVRjNU4zNGdmbjVDVDAxX01URXZNalV2T... (1.6s)
  - **Hop 4 &mdash; V2 Book (rteBOM-DXB):** PASS &mdash; 200 pnr N8MZHX (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (rteBOM-DXB):** PASS &mdash; 200 pnr N8MZHX (0.7s)

### TC-AIBK-RTE-12 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DXB-DEL (international, ADT+ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DXB-DEL
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR Z6PZSD; total 58302; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 58302, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDXB-DEL):** PASS &mdash; 200 offers=21 (7.8s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDXB-DEL):** PASS &mdash; 200 {"responseId":"c41ff6bd-da1f-403b-8b78-ea73200c9a17","supplier":"AirIndia","journeys":{"SVh_IDI0MH4gfn5EWEJ_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDXB-DEL):** PASS &mdash; 200 {"offerId":"ed4fb4ae-7c8d-428e-9712-7fc7b44895fd&amp;yAsPY9IAAEpi/SaTmZGW2ZRTVmhfSURJME1INGdmbjVFV0VKX01USXZNVFl2T... (1.7s)
  - **Hop 4 &mdash; V2 Book (rteDXB-DEL):** PASS &mdash; 200 pnr Z6PZSD (2.1s)
  - **Hop 5 &mdash; V2 Retrieve (rteDXB-DEL):** PASS &mdash; 200 pnr Z6PZSD (0.7s)

### TC-AIBK-RTE-13 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-BKK (international, ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-BKK
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR W61WXT; total 32562; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 32562, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-BKK):** PASS &mdash; 200 offers=8 (2.3s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-BKK):** PASS &mdash; 200 {"responseId":"6b3bb5a5-c10c-41ec-8b5a-7a2f715389c1","supplier":"AirIndia","journeys":{"SVh_MTI1N34gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-BKK):** PASS &mdash; 200 {"offerId":"e2d1989c-c3e3-4dea-a460-1f099fa5cbbb&amp;yAthY9IAAIb+8AqTmZGW2ZRTVmhfTVRJMU4zNGdmbjVFUlV4EADzCXZNak12T... (1.2s)
  - **Hop 4 &mdash; V2 Book (rteDEL-BKK):** PASS &mdash; 200 pnr W61WXT (2.2s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-BKK):** PASS &mdash; 200 pnr W61WXT (0.8s)

### TC-AIBK-RTE-14 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-DOH (international, ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-DOH
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR KU3CTY; total 15132; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 15132, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-DOH):** PASS &mdash; 200 offers=16 (1.7s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-DOH):** PASS &mdash; 200 {"responseId":"d96a1457-4da8-4be1-ab27-fbe5f6bfea84","supplier":"AirIndia","journeys":{"SVh_MTgxMX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-DOH):** PASS &mdash; 200 {"offerId":"921c09c9-b825-4808-a565-da5d27484069&amp;yAsdY9IAAINn/CaTmZGW2ZRTVmhfTVRneE1YNGdmbjVFUlV4X01USXZNekF2T... (0.7s)
  - **Hop 4 &mdash; V2 Book (rteDEL-DOH):** PASS &mdash; 200 pnr KU3CTY (2.0s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-DOH):** PASS &mdash; 200 pnr KU3CTY (1.2s)

### TC-AIBK-RTE-16 — FAIL

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-SHJ (international, ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-SHJ
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** V2 Book: ADT taxes[] 8637 != paxTotalTaxAmount 8137; CHD taxes[] 8637 != paxTotalTaxAmount 8137; Book total 32754 != FareConfirm 33754 = 33754
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-SHJ):** PASS &mdash; 200 offers=14 (3.7s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-SHJ):** PASS &mdash; 200 {"responseId":"1854bbbd-301a-4d5c-b359-e9607e894e34","supplier":"AirIndia","journeys":{"SVh_IDE5NX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-SHJ):** PASS &mdash; 200 {"offerId":"dd0daeed-8391-4f02-8358-02cc5b6294e4&amp;yApHY9IAAEWQ/CaTmZGW2UhTVmhfSURFNU5YNGdmbjVFUlV4X01URXZNamt2T... (1.1s)
  - **Hop 4 &mdash; V2 Book (rteDEL-SHJ):** FAIL &mdash; 200 pnr Q4DCGW (1.4s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-SHJ):** PASS &mdash; 200 pnr Q4DCGW (0.7s)

### TC-AIBK-RTE-15 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-AUH (international, ADT+ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-AUH
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR I2J79J; total 37096; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 37096, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-AUH):** PASS &mdash; 200 offers=21 (6.8s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-AUH):** PASS &mdash; 200 {"responseId":"4eba9151-53fd-4f11-a045-46e879be958d","supplier":"AirIndia","journeys":{"SVh_MTAzOH4gfn5ERUx_MD... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-AUH):** PASS &mdash; 200 {"offerId":"588a26ed-b387-4822-b5e0-a32414ba2cd1&amp;yAuoY9IAAIdM/SaTmZGW2ZRTVmhfTVRBek9INGdmbjVFUlV4X01ERXZNRFl2T... (1.6s)
  - **Hop 4 &mdash; V2 Book (rteDEL-AUH):** PASS &mdash; 200 pnr I2J79J (1.8s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-AUH):** PASS &mdash; 200 pnr I2J79J (0.8s)

### TC-AIBK-RTE-17 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking DEL-KTM (international, ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route DEL-KTM
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR C42VKG; total 18409; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 18409, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteDEL-KTM):** PASS &mdash; 200 offers=4 (2.2s)
  - **Hop 2 &mdash; V2 FareConfirm (rteDEL-KTM):** PASS &mdash; 200 {"responseId":"f0294731-0350-4d1a-b27c-1ffaf3ed20e6","supplier":"AirIndia","journeys":{"SVh_MTA3MH4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteDEL-KTM):** PASS &mdash; 200 {"offerId":"1c6b5916-f5a4-43d9-8046-f6b702318209&amp;yAr4Y9IAAIMx8yaTmZGW2ZRTVmhfTVRBM01INGdmbjVFUlV4X01USXZNRFl2T... (0.7s)
  - **Hop 4 &mdash; V2 Book (rteDEL-KTM):** PASS &mdash; 200 pnr C42VKG (1.8s)
  - **Hop 5 &mdash; V2 Retrieve (rteDEL-KTM):** PASS &mdash; 200 pnr C42VKG (0.9s)

### TC-AIBK-RTE-18 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking BLR-SIN (international, ADT+ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route BLR-SIN
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR DSVT2Y; total 42056; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 42056, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteBLR-SIN):** PASS &mdash; 200 offers=3 (2.7s)
  - **Hop 2 &mdash; V2 FareConfirm (rteBLR-SIN):** PASS &mdash; 200 {"responseId":"66cbc322-fea6-4674-ad0d-55bfa66915d1","supplier":"AirIndia","journeys":{"SVh_MTY5Mn4gfn5CTFJ_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteBLR-SIN):** PASS &mdash; 200 {"offerId":"38e11806-cfd0-407b-b0b4-21ac224ad3dc&amp;yAumY9IAAIcz/SaTmZGW2ZRTVmhfTVRZNU1uNGdmbjVDVEZKX01USXZNVE12T... (1.9s)
  - **Hop 4 &mdash; V2 Book (rteBLR-SIN):** PASS &mdash; 200 pnr DSVT2Y (2.2s)
  - **Hop 5 &mdash; V2 Retrieve (rteBLR-SIN):** PASS &mdash; 200 pnr DSVT2Y (0.7s)

### TC-AIBK-RTE-20 — FAIL

- **Test Case:** [Book][Flow] Verify a V2 booking HYD-DXB (international, ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route HYD-DXB
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** V2 Book: ADT taxes[] 9019 != paxTotalTaxAmount 8519; Book total 15434 != FareConfirm 15934 = 15934
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteHYD-DXB):** PASS &mdash; 200 offers=21 (3.3s)
  - **Hop 2 &mdash; V2 FareConfirm (rteHYD-DXB):** PASS &mdash; 200 {"responseId":"6f1a67c5-0c44-4aed-b9d5-202266c504af","supplier":"AirIndia","journeys":{"SVh_IDk1MX4gfn5IWUR_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (rteHYD-DXB):** PASS &mdash; 200 {"offerId":"ed7e8880-ecae-4398-851f-14cd17564e55&amp;yAnuY9IAAENd/CaTmZGW2UhTVmhfSURrMU1YNGdmbjVJV1VSX01USXZNamN2T... (0.8s)
  - **Hop 4 &mdash; V2 Book (rteHYD-DXB):** FAIL &mdash; 200 pnr G6VKVN (1.8s)
  - **Hop 5 &mdash; V2 Retrieve (rteHYD-DXB):** PASS &mdash; 200 pnr G6VKVN (0.8s)

### TC-AIBK-RTE-21 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking COK-DXB (international, ADT+ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route COK-DXB
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR ZTVY2L; total 32962; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 32962, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteCOK-DXB):** PASS &mdash; 200 offers=6 (3.1s)
  - **Hop 2 &mdash; V2 FareConfirm (rteCOK-DXB):** PASS &mdash; 200 {"responseId":"ab4fa177-1bd4-45c5-9919-6df451fe7d33","supplier":"AirIndia","journeys":{"SVh_IDQzNX4gfn5DT0t_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rteCOK-DXB):** PASS &mdash; 200 {"offerId":"8e6b1b00-91cf-4c18-8e69-4c4649823d32&amp;yApWY9IAAEV3/SaTmZGW2UhTVmhfSURRek5YNGdmbjVEVDB0X01ERXZNRE12T... (1.5s)
  - **Hop 4 &mdash; V2 Book (rteCOK-DXB):** PASS &mdash; 200 pnr ZTVY2L (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (rteCOK-DXB):** PASS &mdash; 200 pnr ZTVY2L (0.8s)

### TC-AIBK-OFR-01 — PASS

- **Test Case:** [Book][Flow] Verify the cheapest DEL-BOM offer books end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: offer kind
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR CUYL8F; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ofr1):** PASS &mdash; 200 offers=63 (5.2s)
  - **Hop 2 &mdash; V2 FareConfirm (ofr1):** PASS &mdash; 200 {"responseId":"cad08fb1-d1c8-4aa6-b05c-1c9675217c69","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (4.4s)
  - **Hop 3 &mdash; V2 AddPassenger (ofr1):** PASS &mdash; 200 {"offerId":"7935e25c-4f5f-4d3b-8def-bd0f41961ca3&amp;yApOY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... (0.8s)
  - **Hop 4 &mdash; V2 Book (ofr1):** PASS &mdash; 200 pnr CUYL8F (8.4s)
  - **Hop 5 &mdash; V2 Retrieve (ofr1):** PASS &mdash; 200 pnr CUYL8F (0.7s)

### TC-AIBK-OFR-02 — PASS

- **Test Case:** [Book][Flow] Verify the most expensive DEL-BOM offer books end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: offer kind
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR HU84TY; total 13208; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 13208, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ofr2):** PASS &mdash; 200 offers=66 (8.5s)
  - **Hop 2 &mdash; V2 FareConfirm (ofr2):** PASS &mdash; 200 {"responseId":"f0919eae-440a-4c48-9961-7f31be96cc4d","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (7.7s)
  - **Hop 3 &mdash; V2 AddPassenger (ofr2):** PASS &mdash; 200 {"offerId":"41aa13de-21aa-4369-b505-8c48978ef789&amp;yAr9Y9IAAIM1/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNalF2T... (1.0s)
  - **Hop 4 &mdash; V2 Book (ofr2):** PASS &mdash; 200 pnr HU84TY (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (ofr2):** PASS &mdash; 200 pnr HU84TY (0.8s)

### TC-AIBK-TRIP-01 — PASS

- **Test Case:** [Book][Flow] Verify a V2 round-trip booking DEL-BOM-DEL (2 adults) completes end to end with two journeys.
- **Category:** Flow
- **Endpoint Name:** V2 booking: round trip
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR NB4TWR; total 15790; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 15790, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rt1):** PASS &mdash; 200 offers=200 (15.3s)
  - **Hop 2 &mdash; V2 FareConfirm (rt1):** PASS &mdash; 200 {"responseId":"28646c11-96ec-40eb-8d77-fc2ae7d73f47","supplier":"AirIndia","journeys":{"SVh_MTYxN34gfn5ERUx_MT... (8.2s)
  - **Hop 3 &mdash; V2 AddPassenger (rt1):** PASS &mdash; 200 {"offerId":"5c09ab06-24e6-4577-9a17-f4caca7b2c4f&amp;yAz/Y9IAAQLb/iaTmZKW2ZRTVmhfTVRZeE4zNGdmbjVFUlV4X01URXZNall2T... (1.6s)
  - **Hop 4 &mdash; V2 Book (rt1):** PASS &mdash; 200 pnr NB4TWR (1.7s)
  - **Hop 5 &mdash; V2 Retrieve (rt1):** PASS &mdash; 200 pnr NB4TWR (0.7s)

### TC-AIBK-TRIP-02 — PASS

- **Test Case:** [Book][Flow] Verify a V2 international round-trip booking BOM-DXB-BOM (1 adult + 1 child + 1 infant) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: round trip
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR RVDBWI; total 60818; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 60818, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rt2):** PASS &mdash; 200 offers=200 (19.4s)
  - **Hop 2 &mdash; V2 FareConfirm (rt2):** PASS &mdash; 200 {"responseId":"4a670410-8ec5-47d9-99ee-70e8c5c9850a","supplier":"AirIndia","journeys":{"SVh_MTc5N34gfn5CT01_MT... (4.1s)
  - **Hop 3 &mdash; V2 AddPassenger (rt2):** PASS &mdash; 200 {"offerId":"5823b16c-f57a-4541-817d-096ab17eded9&amp;yA6lY9IAAYiO/iaTmZKW2ZRTVmhfTVRjNU4zNGdmbjVDVDAxX01USXZNRE12T... (1.8s)
  - **Hop 4 &mdash; V2 Book (rt2):** PASS &mdash; 200 pnr RVDBWI (1.9s)
  - **Hop 5 &mdash; V2 Retrieve (rt2):** PASS &mdash; 200 pnr RVDBWI (0.7s)

### TC-AIBK-TRIP-03 — PASS

- **Test Case:** [Book][Flow] Verify a V2 round-trip booking BLR-DEL-BLR with the cheapest offer completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: round trip
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR N4GZGG; total 11723; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 11723, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rt3):** PASS &mdash; 200 offers=200 (22.6s)
  - **Hop 2 &mdash; V2 FareConfirm (rt3):** PASS &mdash; 200 {"responseId":"da53b339-e38f-4c8d-95a0-0844533caecd","supplier":"AirIndia","journeys":{"SVh_MTQ4Nn4gfn5CTFJ_MT... (1.4s)
  - **Hop 3 &mdash; V2 AddPassenger (rt3):** PASS &mdash; 200 {"offerId":"fc064ca7-f6d2-4fd2-992d-a73eb3c826b7&amp;yA1vY9IAAXuj/CaTmZKW2ZRTVmhfTVRRNE5uNGdmbjVDVEZKX01USXZNVEF2T... (1.0s)
  - **Hop 4 &mdash; V2 Book (rt3):** PASS &mdash; 200 pnr N4GZGG (1.7s)
  - **Hop 5 &mdash; V2 Retrieve (rt3):** PASS &mdash; 200 pnr N4GZGG (0.8s)

### TC-AIBK-OFR-03 — PASS

- **Test Case:** [Book][Flow] Verify the median-priced DEL-BOM offer books end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: offer kind
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR R4D18G; total 5994; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 5994, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ofr3):** PASS &mdash; 200 offers=65 (4.3s)
  - **Hop 2 &mdash; V2 FareConfirm (ofr3):** PASS &mdash; 200 {"responseId":"ca667a3e-dfc5-4e91-a979-dae367155ae6","supplier":"AirIndia","journeys":{"SVh_MTgyN34gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (ofr3):** PASS &mdash; 200 {"offerId":"6a10e9da-0dcb-48fc-8a54-20aa579ad2f6&amp;yApZY9IAAEY0/SaTmZGW2ZRTVmhfTVRneU4zNGdmbjVFUlV4X01USXZNekV2T... (0.8s)
  - **Hop 4 &mdash; V2 Book (ofr3):** PASS &mdash; 200 pnr R4D18G (1.5s)
  - **Hop 5 &mdash; V2 Retrieve (ofr3):** PASS &mdash; 200 pnr R4D18G (0.7s)

### TC-AIBK-OFR-04 — PASS

- **Test Case:** [Book][Flow] Verify the last offer returned for DEL-BOM books end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: offer kind
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR T2VDNM; total 6935; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 6935, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ofr4):** PASS &mdash; 200 offers=95 (3.7s)
  - **Hop 2 &mdash; V2 FareConfirm (ofr4):** PASS &mdash; 200 {"responseId":"d6d4a9f5-98c3-4e9c-a5a6-adcd9555ce23","supplier":"AirIndia","journeys":{"SVh_MTIzNX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (ofr4):** PASS &mdash; 200 {"offerId":"685efe9e-3cd3-4e00-bc26-9f9532fcfc74&amp;yAmxY9IAAEL+8yaTmZGW2UhTVmhfTVRJek5YNGdmbjVFUlV4X01URXZNak12T... (0.7s)
  - **Hop 4 &mdash; V2 Book (ofr4):** PASS &mdash; 200 pnr T2VDNM (1.4s)
  - **Hop 5 &mdash; V2 Retrieve (ofr4):** PASS &mdash; 200 pnr T2VDNM (0.6s)

### TC-AIBK-OFR-05 — PASS

- **Test Case:** [Book][Flow] Verify a direct (non-stop) DEL-BOM offer books end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: offer kind
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR J8I1UX; total 5754; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 5754, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ofr5):** PASS &mdash; 200 offers=66 (4.0s)
  - **Hop 2 &mdash; V2 FareConfirm (ofr5):** PASS &mdash; 200 {"responseId":"b986dd1f-0a19-4d36-bed0-2f54145c9cd2","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (ofr5):** PASS &mdash; 200 {"offerId":"63de8daf-9a6e-44f8-814b-2aad31ce9768&amp;yAm1Y9IAAEMC/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01URXZNekF2T... (0.7s)
  - **Hop 4 &mdash; V2 Book (ofr5):** PASS &mdash; 200 pnr J8I1UX (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (ofr5):** PASS &mdash; 200 pnr J8I1UX (0.6s)

### TC-AIBK-V1-01 — PASS

- **Test Case:** [Book][Flow] Verify a V1 one-way booking DEL-BOM for 1 adult completes end to end (Search, FareConfirm, GetOfferBundles, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V1 booking: passenger mix
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR D9EUFR; total 2605; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2605, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=95 (3.6s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"29771e81-01c3-43b1-a673-142d80223bde","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTEvMjMvMjAyNiAxODoxMH5CT01_MTEvMjMvMjAyNiAyMDozMH5_":{"origin":"DEL","... (1.1s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr D9EUFR (2.5s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr D9EUFR (0.7s)

### TC-AIBK-OFR-06 — PASS

- **Test Case:** [Book][Flow] Verify a one-stop connecting DEL-BOM offer (2 adults + 1 infant) books end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: offer kind
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR UUWSYL; total 13308; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 13308, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ofr6):** PASS &mdash; 200 offers=71 (10.2s)
  - **Hop 2 &mdash; V2 FareConfirm (ofr6):** PASS &mdash; 200 {"responseId":"cc58cb37-0715-44db-8d7e-d082381ba944","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (ofr6):** PASS &mdash; 200 {"offerId":"29408415-73e6-4fbc-9577-66333121a9a3&amp;yAsFY9IAAEo8/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNRGN2T... (1.4s)
  - **Hop 4 &mdash; V2 Book (ofr6):** PASS &mdash; 200 pnr UUWSYL (1.5s)
  - **Hop 5 &mdash; V2 Retrieve (ofr6):** PASS &mdash; 200 pnr UUWSYL (0.6s)

### TC-AIBK-V1-05 — PASS

- **Test Case:** [Book][Flow] Verify a V1 booking BOM-DEL (ADT+ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V1 booking: route
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR B46V8D; total 5274; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 5274, 2 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=79 (4.1s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"66d856d4-2fe5-468f-904a-dd2888ac6dad","supplier":"AirIndia","journeys":{"SVh_MTQ4M34gfn5CT01_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ4M34gfn5CT01_MTIvMjEvMjAyNiAxNDo0NX5ERUx_MTIvMjEvMjAyNiAxNzowNX5_":{"origin":"BOM","... (1.6s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr B46V8D (3.2s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr B46V8D (0.7s)

### TC-AIBK-V1-06 — PASS

- **Test Case:** [Book][Flow] Verify a V1 booking DEL-BLR (ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V1 booking: route
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR D9NEKR; total 15294; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 15294, 2 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=100 (4.0s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"53754f18-8e2d-4d70-b006-b3ccfec48651","supplier":"AirIndia","journeys":{"SVh_MTgxMX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTgxMX4gfn5ERUx_MTIvMjgvMjAyNiAwNzoyMH5DT0t_MTIvMjgvMjAyNiAxMDozNX5_XklYfjE4OTZ_IH5_Q09... (3.0s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr D9NEKR (2.7s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr D9NEKR (0.7s)

### TC-AIBK-V1-02 — PASS

- **Test Case:** [Book][Flow] Verify a V1 one-way booking DEL-BOM for 2 adults + 1 child + 1 infant completes end to end (Search, FareConfirm, GetOfferBundles, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V1 booking: passenger mix
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR FZ528P; total 18195; reconciled; 4 passengers echoed | Retrieve matches Book (pnr, token, total 18195, 4 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=66 (11.7s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"c71d925a-ca4f-4a6f-86c8-cd4466d89a1c","supplier":"AirIndia","journeys":{"SVh_MTA4MX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA4MX4gfn5ERUx_MTEvMzAvMjAyNiAxNToyNX5JWEJ_MTEvMzAvMjAyNiAxNzozNX5_XklYfjE1NDd_IH5_SVh... (4.9s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr FZ528P (3.7s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr FZ528P (0.7s)

### TC-AIBK-V1-08 — PASS

- **Test Case:** [Book][Flow] Verify a V1 booking DEL-HYD (ADT) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V1 booking: route
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR Z33H4Z; total 5493; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 5493, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=61 (3.2s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"31d9577c-8f72-4a25-8256-acafdc68361f","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.8s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTEvMjcvMjAyNiAxODozNX5HT1h_MTEvMjcvMjAyNiAyMToxNX5_XklYfjI5Mzh_IH5_R09... (1.9s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr Z33H4Z (2.2s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr Z33H4Z (0.6s)

### TC-AIBK-V1-07 — PASS

- **Test Case:** [Book][Flow] Verify a V1 booking BOM-DXB (ADT+INF) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V1 booking: route
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR H137FP; total 23348; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 23348, 2 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=15 (4.8s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"3ab2d585-d03e-4ec2-b4db-a8105bf5a8a5","supplier":"AirIndia","journeys":{"SVh_MTIxN34gfn5CT01_MD... (1.1s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTIxN34gfn5CT01_MDEvMDQvMjAyNyAyMjoyNX5KQUl_MDEvMDUvMjAyNyAwMDoyMH5_XklYfiAxNzV_IH5_SkF... (1.1s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr H137FP (2.9s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr H137FP (0.8s)

### TC-AIBK-V1-10 — PASS

- **Test Case:** [Book][Flow] Verify a V1 booking with the cheapest offer and the base bundle books end to end.
- **Category:** Flow
- **Endpoint Name:** V1 booking: offer kind
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Booking completes; prices reconcile; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR P8IPHX; total 2605; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2605, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1c):** PASS &mdash; 200 offers=72 (4.3s)
  - **Hop 2 &mdash; V1 FareConfirm (v1c):** PASS &mdash; 200 {"responseId":"e3c0fead-64de-414d-806f-0b9594339bf5","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1c):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMjEvMjAyNiAxODoxMH5CT01_MTIvMjEvMjAyNiAyMDozMH5_":{"origin":"DEL","... (1.0s)
  - **Hop 4 &mdash; V1 Book (v1c):** PASS &mdash; 200 pnr P8IPHX (4.1s)
  - **Hop 5 &mdash; V1 Retrieve (v1c):** PASS &mdash; 200 pnr P8IPHX (0.7s)

### TC-AIBK-BDL-01 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a V2 booking DEL-BOM (1 adult) with bundle option #1 (base fare) is priced as FareConfirm plus the bundle fee and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** All 6 calls matched: PNR XVMPTI; total 2605; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2605, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl0):** PASS &mdash; 200 offers=71 (6.0s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl0):** PASS &mdash; 200 {"responseId":"f91fbc0e-100b-4eca-bc47-c5c0845331f1","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl0):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMjgvMjAyNiAxODoxMH5CT01_MTIvMjgvMjAyNiAyMDozMH5_":{"origin":"DEL","... (1.1s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl0):** PASS &mdash; 200 {"offerId":"3f89c812-c8fe-4e5c-b21f-928755a9ce38&amp;yAmwY9IAAEL8/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNamd2T... (0.6s)
  - **Hop 5 &mdash; V2 Book (bdl0):** PASS &mdash; 200 pnr XVMPTI (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (bdl0):** PASS &mdash; 200 pnr XVMPTI (0.7s)

### TC-AIBK-BDL-02 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a V2 booking DEL-BOM (1 adult) with bundle option #2 (second) is priced as FareConfirm plus the bundle fee and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** All 6 calls matched: PNR Q42PYZ; total 3205 = FareConfirm 2605 + extras 600; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 3205, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl1):** PASS &mdash; 200 offers=72 (5.7s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl1):** PASS &mdash; 200 {"responseId":"05c6247f-e62e-41a0-8777-fab80364a846","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MDEvMDQvMjAyNyAxODoxMH5CT01_MDEvMDQvMjAyNyAyMDozMH5_":{"origin":"DEL","... (0.9s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl1):** PASS &mdash; 200 {"offerId":"d8a7f035-2d3e-482f-9843-6b74594b0021&amp;yAmzY9IAAEL8/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNRFF2T... (0.7s)
  - **Hop 5 &mdash; V2 Book (bdl1):** PASS &mdash; 200 pnr Q42PYZ (2.1s)
  - **Hop 6 &mdash; V2 Retrieve (bdl1):** PASS &mdash; 200 pnr Q42PYZ (0.8s)

### TC-AIBK-BDL-03 — FAIL

- **Test Case:** [Book][GetOfferBundles] Verify a V2 booking DEL-BOM (1 adult) with bundle option #3 (third) is priced as FareConfirm plus the bundle fee and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 409
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** V2 Book: Book failed: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO for 'Mostafa Fa
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl2):** PASS &mdash; 200 offers=95 (3.7s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl2):** PASS &mdash; 200 {"responseId":"5f48b42c-9f3c-4302-ad59-712527d80c6b","supplier":"AirIndia","journeys":{"SVh_MTYxN34gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl2):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTYxN34gfn5ERUx_MTEvMjcvMjAyNiAxMTo1MH5MS09_MTEvMjcvMjAyNiAxMzowNX5_XklYfjEzODF_IH5_TEt... (1.9s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl2):** PASS &mdash; 200 {"offerId":"d926bb14-4e2e-4c59-9d4e-c7aaf457c378&amp;yApbY9IAAEY7/iaTmZGW2ZRTVmhfTVRZeE4zNGdmbjVFUlV4X01URXZNamN2T... (0.7s)
  - **Hop 5 &mdash; V2 Book (bdl2):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO for 'Mostafa Fa (0.3s)

### TC-AIBK-V1-09 — PASS

- **Test Case:** [Book][Flow] Verify a V1 round-trip booking DEL-BOM-DEL (2 adults) completes end to end with one bundle entry per journey.
- **Category:** Flow
- **Endpoint Name:** V1 booking: round trip
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Book accepts one selectedBundles entry per journey; prices reconcile; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR JU8VSY; total 10900; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 10900, 2 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=200 (10.6s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"0753abd3-cd63-4605-b247-4e8bd4fee77c","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.4s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMDQvMjAyNiAxODozNX5HT1h_MTIvMDQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (10.6s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr JU8VSY (3.2s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr JU8VSY (0.8s)

### TC-AIBK-BDL-04 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a V2 booking DEL-BOM (1 adult) with bundle option #4 (fourth) is priced as FareConfirm plus the bundle fee and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** All 6 calls matched: PNR G32PPJ; total 3609 = FareConfirm 2709 + extras 900; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 3609, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl3):** PASS &mdash; 200 offers=68 (4.1s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl3):** PASS &mdash; 200 {"responseId":"05f293ff-eebe-481e-8586-9c3e4b0ccdca","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl3):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMDQvMjAyNiAxODozNX5HT1h_MTIvMDQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.4s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl3):** PASS &mdash; 200 {"offerId":"4a61766a-563d-446b-b5b5-cc36983d8e28&amp;yApOY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNRFF2T... (0.7s)
  - **Hop 5 &mdash; V2 Book (bdl3):** PASS &mdash; 200 pnr G32PPJ (1.8s)
  - **Hop 6 &mdash; V2 Retrieve (bdl3):** PASS &mdash; 200 pnr G32PPJ (0.6s)

### TC-AIBK-BDL-06 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify the last bundle on a direct DEL-BOM offer books and is priced correctly.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Bundle accepted; total equals FareConfirm plus bundle fee
- **Actual:** All 6 calls matched: PNR ISQN5L; total 6654 = FareConfirm 5754 + extras 900; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 6654, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl6):** PASS &mdash; 200 offers=67 (4.1s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl6):** PASS &mdash; 200 {"responseId":"e163b556-53c2-4b6b-b967-c34b2ab5d9d9","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (0.8s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl6):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMTgvMjAyNiAxODoxMH5CT01_MTIvMTgvMjAyNiAyMDozMH5_":{"origin":"DEL","... (0.9s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl6):** PASS &mdash; 200 {"offerId":"4ce6a98e-eb07-43b8-bc1c-f76b8afee457&amp;yAm0Y9IAAEMC/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNVGd2T... (0.8s)
  - **Hop 5 &mdash; V2 Book (bdl6):** PASS &mdash; 200 pnr ISQN5L (1.7s)
  - **Hop 6 &mdash; V2 Retrieve (bdl6):** PASS &mdash; 200 pnr ISQN5L (0.7s)

### TC-AIBK-BDL-05 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify the last bundle of the cheapest DEL-BOM offer books and is priced correctly.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Bundle accepted; total equals FareConfirm plus bundle fee
- **Actual:** All 6 calls matched: PNR L35RYM; total 3609 = FareConfirm 2709 + extras 900; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 3609, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl5):** PASS &mdash; 200 offers=67 (4.2s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl5):** PASS &mdash; 200 {"responseId":"bd82f45f-56e3-499e-af63-496a4a6f4418","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl5):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMTEvMjAyNiAxODozNX5HT1h_MTIvMTEvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.7s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl5):** PASS &mdash; 200 {"offerId":"d8a11f5e-6603-48c7-b9f3-a180b6b87c74&amp;yApRY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVEV2T... (0.8s)
  - **Hop 5 &mdash; V2 Book (bdl5):** PASS &mdash; 200 pnr L35RYM (1.6s)
  - **Hop 6 &mdash; V2 Retrieve (bdl5):** PASS &mdash; 200 pnr L35RYM (0.8s)

### TC-AIBK-BDL-09 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify an international booking BOM-DXB with the last bundle books and is priced correctly.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Bundle accepted; total equals FareConfirm plus bundle fee
- **Actual:** All 6 calls matched: PNR LU4V3V; total 15298 = FareConfirm 14298 + extras 1000; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 15298, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl9):** PASS &mdash; 200 offers=72 (2.4s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl9):** PASS &mdash; 200 {"responseId":"c1404b3e-ab9a-4283-abc0-f641e6011063","supplier":"AirIndia","journeys":{"SVh_MjIwNX4gfn5CT01_MT... (1.2s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl9):** PASS &mdash; 200 {"offerJourneys":{"SVh_MjIwNX4gfn5CT01_MTEvMjQvMjAyNiAxOTozNX5DT0t_MTEvMjQvMjAyNiAyMTozNX5_XklYfiA1MDV_IH5_Q09... (1.1s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl9):** PASS &mdash; 200 {"offerId":"85e49363-fa3e-41da-ae1b-84969e0c28b4&amp;yAr5Y9IAAINL/CaTmZGW2ZRTVmhfTWpJd05YNGdmbjVDVDAxX01URXZNalF2T... (0.7s)
  - **Hop 5 &mdash; V2 Book (bdl9):** PASS &mdash; 200 pnr LU4V3V (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (bdl9):** PASS &mdash; 200 pnr LU4V3V (2.7s)

### TC-AIBK-BDL-10 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a V1 booking DEL-BOM (1 adult) with bundle option #1 is accepted and priced as FareConfirm plus the bundle fee.
- **Category:** Positive
- **Endpoint Name:** V1 bundle booking
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the Book total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** All 5 calls matched: PNR ZT8SRB; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1bdl0):** PASS &mdash; 200 offers=64 (4.8s)
  - **Hop 2 &mdash; V1 FareConfirm (v1bdl0):** PASS &mdash; 200 {"responseId":"065c1e8a-f42a-4482-b219-77dd541d95ac","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1bdl0):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMDEvMjAyNiAxODozNX5HT1h_MTIvMDEvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (3.3s)
  - **Hop 4 &mdash; V1 Book (v1bdl0):** PASS &mdash; 200 pnr ZT8SRB (3.3s)
  - **Hop 5 &mdash; V1 Retrieve (v1bdl0):** PASS &mdash; 200 pnr ZT8SRB (1.0s)

### TC-AIBK-BDL-12 — FAIL

- **Test Case:** [Book][GetOfferBundles] Verify a V1 booking DEL-BOM (1 adult) with bundle option #3 is accepted and priced as FareConfirm plus the bundle fee.
- **Category:** Positive
- **Endpoint Name:** V1 bundle booking
- **Request:** 4 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 409
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the Book total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** V1 Book: Book failed: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO for 'Mostafa Ab
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1bdl2):** PASS &mdash; 200 offers=62 (5.5s)
  - **Hop 2 &mdash; V1 FareConfirm (v1bdl2):** PASS &mdash; 200 {"responseId":"e78cf275-08ca-480a-bac5-886b6e0e0b63","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1bdl2):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTM5MX4gfn5ERUx_MTIvMTUvMjAyNiAyMDozMH5MS09_MTIvMTUvMjAyNiAyMTo0MH5_XklYfjEwMjd_IH5_TEt... (2.0s)
  - **Hop 4 &mdash; V1 Book (v1bdl2):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO for 'Mostafa Ab (0.9s)

### TC-AIBK-BDL-08 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a round-trip booking with a different bundle on each journey is priced as the sum of both bundles.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Both journey bundles accepted; total equals FareConfirm plus both bundle fees
- **Actual:** All 6 calls matched: PNR P16TKC; total 6142 = FareConfirm 5242 + extras 900; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 6142, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl8):** PASS &mdash; 200 offers=200 (11.5s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl8):** PASS &mdash; 200 {"responseId":"d4ee4947-aef6-4795-aecf-61b4ec9f6707","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (2.3s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl8):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MDEvMDEvMjAyNyAxODoxMH5CT01_MDEvMDEvMjAyNyAyMDozMH5_":{"origin":"DEL","... (3.5s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl8):** PASS &mdash; 200 {"offerId":"8806d023-fb6b-4efe-b5ee-4f3eae971414&amp;yAtIY9IAAPvE8Q+TmZKW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXYEAPwDa... (0.8s)
  - **Hop 5 &mdash; V2 Book (bdl8):** PASS &mdash; 200 pnr P16TKC (2.3s)
  - **Hop 6 &mdash; V2 Retrieve (bdl8):** PASS &mdash; 200 pnr P16TKC (0.6s)

### TC-AIBK-BDL-11 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a V1 booking DEL-BOM (1 adult) with bundle option #2 is accepted and priced as FareConfirm plus the bundle fee.
- **Category:** Positive
- **Endpoint Name:** V1 bundle booking
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the Book total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** All 5 calls matched: PNR X4MEPW; total 3309 = FareConfirm 2709 + extras 600; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 3309, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1bdl1):** PASS &mdash; 200 offers=64 (7.2s)
  - **Hop 2 &mdash; V1 FareConfirm (v1bdl1):** PASS &mdash; 200 {"responseId":"e5241f2f-1f1b-4a1c-bb16-9359c0593574","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.4s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1bdl1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMDgvMjAyNiAxODozNX5HT1h_MTIvMDgvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (2.8s)
  - **Hop 4 &mdash; V1 Book (v1bdl1):** PASS &mdash; 200 pnr X4MEPW (2.3s)
  - **Hop 5 &mdash; V1 Retrieve (v1bdl1):** PASS &mdash; 200 pnr X4MEPW (1.1s)

### TC-AIBK-BDL-13 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a V1 booking DEL-BOM (1 adult) with bundle option #4 is accepted and priced as FareConfirm plus the bundle fee.
- **Category:** Positive
- **Endpoint Name:** V1 bundle booking
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** GetOfferBundles lists the bundle; Book accepts it; the Book total equals FareConfirm plus bundlePrices; the booking is retrievable
- **Actual:** All 5 calls matched: PNR FUUW2S; total 3609 = FareConfirm 2709 + extras 900; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 3609, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1bdl3):** PASS &mdash; 200 offers=64 (4.6s)
  - **Hop 2 &mdash; V1 FareConfirm (v1bdl3):** PASS &mdash; 200 {"responseId":"9ceefe6f-5976-403f-ba27-abd4d8e3d278","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1bdl3):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjIvMjAyNiAxODozNX5HT1h_MTIvMjIvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.6s)
  - **Hop 4 &mdash; V1 Book (v1bdl3):** PASS &mdash; 200 pnr FUUW2S (2.4s)
  - **Hop 5 &mdash; V1 Retrieve (v1bdl3):** PASS &mdash; 200 pnr FUUW2S (0.8s)

### TC-AIBK-ANC-01 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with a paid baggage item for the adult is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR ZZRZVV; total 8605 = FareConfirm 2605 + extras 6000; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 8605, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc01):** PASS &mdash; 200 offers=67 (4.5s)
  - **Hop 2 &mdash; V2 FareConfirm (anc01):** PASS &mdash; 200 {"responseId":"ec3e0e0a-c713-4481-a039-5f13afb5edee","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (anc01):** PASS &mdash; 200 {"offerId":"d8a3b503-faf7-44c0-82ff-0e74b307b3e2&amp;yAmxY9IAAEL6/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNamt2T... (0.8s)
  - **Hop 4 &mdash; V2 GetAncillary (anc01):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"d8a3b503-faf7-44c0-82ff-0e74b307b3e2&amp;yAmxY9IAAEL... (1.1s)
  - **Hop 5 &mdash; V2 Book (anc01):** PASS &mdash; 200 pnr ZZRZVV (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (anc01):** PASS &mdash; 200 pnr ZZRZVV (0.7s)

### TC-AIBK-ANC-02 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with a paid meal for the adult is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR NUKW4V; total 2855 = FareConfirm 2605 + extras 250; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2855, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc02):** PASS &mdash; 200 offers=68 (4.3s)
  - **Hop 2 &mdash; V2 FareConfirm (anc02):** PASS &mdash; 200 {"responseId":"bff2494c-4cd7-4f49-85c1-203f452a65f5","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (anc02):** PASS &mdash; 200 {"offerId":"f83d3073-538e-4b1d-baf3-5735727b54a8&amp;yAmxY9IAAEL6/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNRFV2T... (0.9s)
  - **Hop 4 &mdash; V2 GetAncillary (anc02):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"f83d3073-538e-4b1d-baf3-5735727b54a8&amp;yAmxY9IAAEL... (1.2s)
  - **Hop 5 &mdash; V2 Book (anc02):** PASS &mdash; 200 pnr NUKW4V (1.8s)
  - **Hop 6 &mdash; V2 Retrieve (anc02):** PASS &mdash; 200 pnr NUKW4V (0.8s)

### TC-AIBK-ANC-03 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with a paid special-service (Other) item for the adult is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR I24ZJM; total 6775 = FareConfirm 5275 + extras 1500; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 6775, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc03):** PASS &mdash; 200 offers=84 (4.0s)
  - **Hop 2 &mdash; V2 FareConfirm (anc03):** PASS &mdash; 200 {"responseId":"981ad470-18b1-4ccc-a208-202793bcd4f7","supplier":"AirIndia","journeys":{"SVh_MTM3MX4gfn5ERUx_MT... (1.3s)
  - **Hop 3 &mdash; V2 AddPassenger (anc03):** PASS &mdash; 200 {"offerId":"a2b6ee6a-a69d-47c2-8aba-0ceb89d18736&amp;yApdY9IAAEY3/iaTmZGW2ZRTVmhfTVRNM01YNGdmbjVFUlV4X01URXZNamd2T... (0.7s)
  - **Hop 4 &mdash; V2 GetAncillary (anc03):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"a2b6ee6a-a69d-47c2-8aba-0ceb89d18736&amp;yApdY9IAAEY... (1.6s)
  - **Hop 5 &mdash; V2 Book (anc03):** PASS &mdash; 200 pnr I24ZJM (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (anc03):** PASS &mdash; 200 pnr I24ZJM (0.9s)

### TC-AIBK-ANC-04 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with a free special-service item (price 0) for the adult is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR P9IB7E; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc04):** PASS &mdash; 200 offers=56 (5.3s)
  - **Hop 2 &mdash; V2 FareConfirm (anc04):** PASS &mdash; 200 {"responseId":"8532fe9c-e478-4135-aea4-f217edbbad6e","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (anc04):** PASS &mdash; 200 {"offerId":"8143a2ec-fd10-4e8d-98c1-03764bc2278b&amp;yApSY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNRFV2T... (0.7s)
  - **Hop 4 &mdash; V2 GetAncillary (anc04):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"8143a2ec-fd10-4e8d-98c1-03764bc2278b&amp;yApSY9IAAEY... (2.2s)
  - **Hop 5 &mdash; V2 Book (anc04):** PASS &mdash; 200 pnr P9IB7E (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (anc04):** PASS &mdash; 200 pnr P9IB7E (0.6s)

### TC-AIBK-BDL-07 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify a paid bundle for 2 adults + 1 child + 1 infant is priced per passenger type (infant excluded) and books.
- **Category:** Positive
- **Endpoint Name:** V2 bundle booking
- **Request:** 7 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Total equals FareConfirm plus the bundle fee for each adult and child; the infant carries no bundle fee
- **Actual:** All 7 calls matched: PNR F5JQRD; total 13827 = FareConfirm 11127 + extras 2700; reconciled; 4 passengers echoed | Retrieve matches Book (pnr, token, total 13827, 4 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl7):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (bdl7retry1):** PASS &mdash; 200 offers=68 (12.6s)
  - **Hop 3 &mdash; V2 FareConfirm (bdl7):** PASS &mdash; 200 {"responseId":"9a90a1ff-9f72-4ee6-9af8-d87a8a727fd8","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)
  - **Hop 4 &mdash; V2 GetOfferBundles (bdl7):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjUvMjAyNiAxODozNX5HT1h_MTIvMjUvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.0s)
  - **Hop 5 &mdash; V2 AddPassenger (bdl7):** PASS &mdash; 200 {"offerId":"957d97f3-9de2-4fcd-bcd0-7126a6da8a48&amp;yAtBY9IAAE2Y8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNalV2T... (1.8s)
  - **Hop 6 &mdash; V2 Book (bdl7):** PASS &mdash; 200 pnr F5JQRD (2.0s)
  - **Hop 7 &mdash; V2 Retrieve (bdl7):** PASS &mdash; 200 pnr F5JQRD (0.9s)

### TC-AIBK-ANC-05 — FAIL

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with baggage with quantity 2 is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 409
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** V2 Book: Book failed: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg.
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc05):** PASS &mdash; 200 offers=54 (4.9s)
  - **Hop 2 &mdash; V2 FareConfirm (anc05):** PASS &mdash; 200 {"responseId":"1295882e-d102-407f-bcde-52a009a1505c","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (anc05):** PASS &mdash; 200 {"offerId":"adf88399-2bca-416c-8d3f-e466d606dc2a&amp;yApPY9IAAEYx8Q+TmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXYEAPACa... (0.7s)
  - **Hop 4 &mdash; V2 GetAncillary (anc05):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"adf88399-2bca-416c-8d3f-e466d606dc2a&amp;yApPY9IAAEY... (1.9s)
  - **Hop 5 &mdash; V2 Book (anc05):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg. (0.3s)

### TC-AIBK-ANC-06 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with a meal on each leg of a connecting offer is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR DUQH3S; total 3359 = FareConfirm 2709 + extras 650; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 3359, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc06):** PASS &mdash; 200 offers=56 (4.8s)
  - **Hop 2 &mdash; V2 FareConfirm (anc06):** PASS &mdash; 200 {"responseId":"05c50e6f-e866-4b23-b0ec-041ec9f708e7","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (anc06):** PASS &mdash; 200 {"offerId":"53339894-b18d-40ca-a281-11a6f1b3f7d3&amp;yApSY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGt2T... (0.8s)
  - **Hop 4 &mdash; V2 GetAncillary (anc06):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"53339894-b18d-40ca-a281-11a6f1b3f7d3&amp;yApSY9IAAEY... (1.7s)
  - **Hop 5 &mdash; V2 Book (anc06):** PASS &mdash; 200 pnr DUQH3S (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (anc06):** PASS &mdash; 200 pnr DUQH3S (1.0s)

### TC-AIBK-ANC-07 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with baggage + meal + special service on the same adult is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR GB1QNB; total 10459 = FareConfirm 2709 + extras 7750; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 10459, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc07):** PASS &mdash; 200 offers=56 (4.4s)
  - **Hop 2 &mdash; V2 FareConfirm (anc07):** PASS &mdash; 200 {"responseId":"6324cf43-be7d-4b1a-b1f7-224289d6ab82","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.3s)
  - **Hop 3 &mdash; V2 AddPassenger (anc07):** PASS &mdash; 200 {"offerId":"ec12c0d8-5aee-4378-a05f-5226dce243c6&amp;yApWY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNall2T... (0.7s)
  - **Hop 4 &mdash; V2 GetAncillary (anc07):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"ec12c0d8-5aee-4378-a05f-5226dce243c6&amp;yApWY9IAAEY... (1.7s)
  - **Hop 5 &mdash; V2 Book (anc07):** PASS &mdash; 200 pnr GB1QNB (2.6s)
  - **Hop 6 &mdash; V2 Retrieve (anc07):** PASS &mdash; 200 pnr GB1QNB (0.6s)

### TC-AIBK-ANC-10 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with two different meals for one adult on one leg is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR Z2ZFHC; total 5804 = FareConfirm 5154 + extras 650; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 5804, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc10):** PASS &mdash; 200 offers=67 (3.8s)
  - **Hop 2 &mdash; V2 FareConfirm (anc10):** PASS &mdash; 200 {"responseId":"d7a6403c-17eb-45c0-a054-ab7e72c1e72c","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (0.8s)
  - **Hop 3 &mdash; V2 AddPassenger (anc10):** PASS &mdash; 200 {"offerId":"71e75725-3a1b-4cc5-aafb-9a0f5398156c&amp;yApcY9IAAEY6/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNREl2T... (0.7s)
  - **Hop 4 &mdash; V2 GetAncillary (anc10):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"71e75725-3a1b-4cc5-aafb-9a0f5398156c&amp;yApcY9IAAEY... (1.6s)
  - **Hop 5 &mdash; V2 Book (anc10):** PASS &mdash; 200 pnr Z2ZFHC (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (anc10):** PASS &mdash; 200 pnr Z2ZFHC (0.8s)

### TC-AIBK-ANC-08 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with baggage for each of 2 adults and 1 child is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR Z835PN; total 25815 = FareConfirm 7815 + extras 18000; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 25815, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc08):** PASS &mdash; 200 offers=58 (4.9s)
  - **Hop 2 &mdash; V2 FareConfirm (anc08):** PASS &mdash; 200 {"responseId":"88555b3e-0bc2-4b09-8246-9b4b830fe9a2","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (anc08):** PASS &mdash; 200 {"offerId":"6ac85dca-575e-468f-923c-af5521f67c23&amp;yAo3Y9IAAEWm/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNREl2T... (1.6s)
  - **Hop 4 &mdash; V2 GetAncillary (anc08):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"6ac85dca-575e-468f-923c-af5521f67c23&amp;yAo3Y9IAAEW... (2.3s)
  - **Hop 5 &mdash; V2 Book (anc08):** PASS &mdash; 200 pnr Z835PN (2.8s)
  - **Hop 6 &mdash; V2 Retrieve (anc08):** PASS &mdash; 200 pnr Z835PN (2.5s)

### TC-AIBK-SEAT-01 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with one paid seat for the adult is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR DUSY5S; total 4489 = FareConfirm 2709 + extras 1780; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 4489, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat01):** PASS &mdash; 200 offers=66 (5.1s)
  - **Hop 2 &mdash; V2 FareConfirm (seat01):** PASS &mdash; 200 {"responseId":"167654fe-2c74-4ed9-8bd5-0467cb2494b0","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (2.9s)
  - **Hop 3 &mdash; V2 AddPassenger (seat01):** PASS &mdash; 200 {"offerId":"26dcaade-4ba8-46c9-9b55-047915abba34&amp;yApUY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVFl2T... (0.7s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat01):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"26dcaade-4ba8-46c9-9b55-047915abba34&amp;yApUY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGd... (1.1s)
  - **Hop 5 &mdash; V2 Book (seat01):** PASS &mdash; 200 pnr DUSY5S (2.6s)
  - **Hop 6 &mdash; V2 Retrieve (seat01):** PASS &mdash; 200 pnr DUSY5S (0.6s)

### TC-AIBK-ANC-11 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with baggage on a round trip is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR EU7UKI; total 13426 = FareConfirm 7426 + extras 6000; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 13426, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc11):** PASS &mdash; 200 offers=200 (10.6s)
  - **Hop 2 &mdash; V2 FareConfirm (anc11):** PASS &mdash; 200 {"responseId":"f6e0b7fe-7d40-4346-8942-1c7bf2ae401f","supplier":"AirIndia","journeys":{"SVh_MTA4MX4gfn5ERUx_MT... (1.2s)
  - **Hop 3 &mdash; V2 AddPassenger (anc11):** PASS &mdash; 200 {"offerId":"fe2e30f5-dc91-40d4-8817-4cd70ad87b49&amp;yAwVY9IAAP79/iaTmZKW2ZRTVmhfTVRBNE1YNGdmbjVFUlV4X01USXZNRGt2T... (0.9s)
  - **Hop 4 &mdash; V2 GetAncillary (anc11):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"fe2e30f5-dc91-40d4-8817-4cd70ad87b49&amp;yAwVY9IAAP7... (3.2s)
  - **Hop 5 &mdash; V2 Book (anc11):** PASS &mdash; 200 pnr EU7UKI (1.7s)
  - **Hop 6 &mdash; V2 Retrieve (anc11):** PASS &mdash; 200 pnr EU7UKI (0.6s)

### TC-AIBK-SEAT-02 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with a free seat (AvailableFree) for the adult is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR U2E9XP; total 2605; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2605, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat02):** PASS &mdash; 200 offers=72 (5.8s)
  - **Hop 2 &mdash; V2 FareConfirm (seat02):** PASS &mdash; 200 {"responseId":"74a8032a-bf79-4d23-a37e-6ec441271d31","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.5s)
  - **Hop 3 &mdash; V2 AddPassenger (seat02):** PASS &mdash; 200 {"offerId":"2d54643e-9e8c-4262-9a1a-bb5ed79da6a0&amp;yAmuY9IAAEL6/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNak12T... (0.9s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat02):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"2d54643e-9e8c-4262-9a1a-bb5ed79da6a0&amp;yAmuY9IAAEL6/CaTmZGW2UhTVmhfTVRRMk5YNGd... (0.7s)
  - **Hop 5 &mdash; V2 Book (seat02):** PASS &mdash; 200 pnr U2E9XP (1.8s)
  - **Hop 6 &mdash; V2 Retrieve (seat02):** PASS &mdash; 200 pnr U2E9XP (0.6s)

### TC-AIBK-ANC-09 — PASS

- **Test Case:** [Book][GetAncillary] Verify a V2 booking DEL-BOM with a meal for each of 2 adults + 1 child + 1 infant (the infant cannot buy) is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 ancillary booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** GetAncillary offers the item; Book accepts the selection; the total equals FareConfirm plus the ancillary prices; the selection is echoed and retrievable
- **Actual:** All 6 calls matched: PNR BYEHHB; total 19212 = FareConfirm 18462 + extras 750; reconciled; 4 passengers echoed | Retrieve matches Book (pnr, token, total 19212, 4 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (anc09):** PASS &mdash; 200 offers=96 (14.0s)
  - **Hop 2 &mdash; V2 FareConfirm (anc09):** PASS &mdash; 200 {"responseId":"ac2021ef-6fb7-41b5-892f-5491109cd9a1","supplier":"AirIndia","journeys":{"SVh_MTYxN34gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (anc09):** PASS &mdash; 200 {"offerId":"0c94c69c-678c-460e-984f-85e5d5f4574a&amp;yAtzY9IAAE2q/iaTmZGW2ZRTVmhfTVRZeE4zNGdmbjVFUlV4X01URXZNalV2T... (1.9s)
  - **Hop 4 &mdash; V2 GetAncillary (anc09):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"0c94c69c-678c-460e-984f-85e5d5f4574a&amp;yAtzY9IAAE2... (4.5s)
  - **Hop 5 &mdash; V2 Book (anc09):** PASS &mdash; 200 pnr BYEHHB (3.9s)
  - **Hop 6 &mdash; V2 Retrieve (anc09):** PASS &mdash; 200 pnr BYEHHB (0.7s)

### TC-AIBK-SEAT-03 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with seats for 2 adults + 1 child is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR YZ9GRI; total 13467 = FareConfirm 8127 + extras 5340; reconciled; 3 passengers echoed | Retrieve matches Book (pnr, token, total 13467, 3 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat03):** PASS &mdash; 200 offers=67 (4.9s)
  - **Hop 2 &mdash; V2 FareConfirm (seat03):** PASS &mdash; 200 {"responseId":"21d04b60-5eb0-4b59-a4f2-e6381ca75fb1","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (seat03):** PASS &mdash; 200 {"offerId":"5a6663f1-74cc-4bd3-9e32-31a74c8f62c2&amp;yArdY9IAAEo08CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNekF2T... (1.3s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat03):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"5a6663f1-74cc-4bd3-9e32-31a74c8f62c2&amp;yArdY9IAAEo08CWTmZGW2ZRTVmhfTVRBME9YNGd... (2.1s)
  - **Hop 5 &mdash; V2 Book (seat03):** PASS &mdash; 200 pnr YZ9GRI (2.5s)
  - **Hop 6 &mdash; V2 Retrieve (seat03):** PASS &mdash; 200 pnr YZ9GRI (0.8s)

### TC-AIBK-SEAT-04 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with a seat on each leg of a connecting offer is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR YV4NNY; total 6269 = FareConfirm 2709 + extras 3560; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 6269, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat04):** PASS &mdash; 200 offers=72 (3.9s)
  - **Hop 2 &mdash; V2 FareConfirm (seat04):** PASS &mdash; 200 {"responseId":"5b82b296-c109-41a5-8d81-91697e924234","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MD... (0.8s)
  - **Hop 3 &mdash; V2 AddPassenger (seat04):** PASS &mdash; 200 {"offerId":"f290d1d5-671d-435e-9f79-58e89b431182&amp;yApQY9IAAEYx/CaTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01ERXZNRFl2T... (0.8s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat04):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"f290d1d5-671d-435e-9f79-58e89b431182&amp;yApQY9IAAEYx/CaTmZGW2ZRTVmhfTVRBME9YNGd... (1.1s)
  - **Hop 5 &mdash; V2 Book (seat04):** PASS &mdash; 200 pnr YV4NNY (2.0s)
  - **Hop 6 &mdash; V2 Retrieve (seat04):** PASS &mdash; 200 pnr YV4NNY (0.7s)

### TC-AIBK-SEAT-05 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with a seat on a direct offer is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR T1FQ8P; total 4385 = FareConfirm 2605 + extras 1780; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 4385, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat05):** PASS &mdash; 200 offers=97 (3.8s)
  - **Hop 2 &mdash; V2 FareConfirm (seat05):** PASS &mdash; 200 {"responseId":"5f64f450-1397-4de7-ac68-f33371a65e68","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.2s)
  - **Hop 3 &mdash; V2 AddPassenger (seat05):** PASS &mdash; 200 {"offerId":"9051bc1a-47e0-4e24-8a9b-639fea92e885&amp;yAmvY9IAAEL5/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01URXZNamt2T... (0.7s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat05):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"9051bc1a-47e0-4e24-8a9b-639fea92e885&amp;yAmvY9IAAEL5/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.1s)
  - **Hop 5 &mdash; V2 Book (seat05):** PASS &mdash; 200 pnr T1FQ8P (1.7s)
  - **Hop 6 &mdash; V2 Retrieve (seat05):** PASS &mdash; 200 pnr T1FQ8P (2.3s)

### TC-AIBK-SEAT-07 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with a seat deep in the cabin (nth 60) is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR WSHPRR; total 3443 = FareConfirm 2605 + extras 838; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 3443, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat07):** PASS &mdash; 200 offers=71 (6.0s)
  - **Hop 2 &mdash; V2 FareConfirm (seat07):** PASS &mdash; 200 {"responseId":"fb2752ba-de70-42ae-88af-9f88276652fd","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (seat07):** PASS &mdash; 200 {"offerId":"a29463e2-2ef4-4f4b-b159-6f50c3ef06bd&amp;yAmyY9IAAEL7/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNVE12T... (0.7s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat07):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"a29463e2-2ef4-4f4b-b159-6f50c3ef06bd&amp;yAmyY9IAAEL7/CaTmZGW2UhTVmhfTVRRMk5YNGd... (0.8s)
  - **Hop 5 &mdash; V2 Book (seat07):** PASS &mdash; 200 pnr WSHPRR (1.7s)
  - **Hop 6 &mdash; V2 Retrieve (seat07):** PASS &mdash; 200 pnr WSHPRR (0.7s)

### TC-AIBK-SEAT-06 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with seats for 2 adults on both legs of a round trip is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR JUYM2V; total 25008 = FareConfirm 17888 + extras 7120; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 25008, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat06):** PASS &mdash; 200 offers=200 (10.1s)
  - **Hop 2 &mdash; V2 FareConfirm (seat06):** PASS &mdash; 200 {"responseId":"14c7028f-7674-4618-aa24-10a5ff9fcdfb","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (1.3s)
  - **Hop 3 &mdash; V2 AddPassenger (seat06):** PASS &mdash; 200 {"offerId":"6c4590a5-aa97-4b28-9920-825053a68cc3&amp;yA0JY9IAAQL3/iaTmZKW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNRFl2T... (1.2s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat06):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"6c4590a5-aa97-4b28-9920-825053a68cc3&amp;yA0JY9IAAQL3/iaTmZKW2ZRTVmhfTVRNNU1YNGd... (3.8s)
  - **Hop 5 &mdash; V2 Book (seat06):** PASS &mdash; 200 pnr JUYM2V (2.6s)
  - **Hop 6 &mdash; V2 Retrieve (seat06):** PASS &mdash; 200 pnr JUYM2V (0.8s)

### TC-AIBK-CMB-01 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking combining base bundle + baggage + meal + seat (1 adult) is accepted, priced and retrievable.
- **Category:** Flow
- **Endpoint Name:** V2 booking: combined enrichment
- **Request:** 8 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Every selection is accepted on one Book call; the total equals FareConfirm plus bundle, ancillary and seat prices; selections echoed; Retrieve returns the same booking
- **Actual:** All 8 calls matched: PNR HUHKNI; total 10739 = FareConfirm 2709 + extras 8030; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 10739, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (cmb01):** PASS &mdash; 200 offers=69 (5.7s)
  - **Hop 2 &mdash; V2 FareConfirm (cmb01):** PASS &mdash; 200 {"responseId":"958c329a-d8d6-4fae-8685-8636856dd160","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 GetOfferBundles (cmb01):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjcvMjAyNiAxODozNX5HT1h_MTIvMjcvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.4s)
  - **Hop 4 &mdash; V2 AddPassenger (cmb01):** PASS &mdash; 200 {"offerId":"aef3e21e-acc5-48b7-9345-e99d123fdfc9&amp;yApTY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNamN2T... (0.8s)
  - **Hop 5 &mdash; V2 GetAncillary (cmb01):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"aef3e21e-acc5-48b7-9345-e99d123fdfc9&amp;yApTY9IAAEY... (2.4s)
  - **Hop 6 &mdash; V2 GetSeatMap (cmb01):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"aef3e21e-acc5-48b7-9345-e99d123fdfc9&amp;yApTY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGd... (1.0s)
  - **Hop 7 &mdash; V2 Book (cmb01):** PASS &mdash; 200 pnr HUHKNI (2.9s)
  - **Hop 8 &mdash; V2 Retrieve (cmb01):** PASS &mdash; 200 pnr HUHKNI (0.7s)

### TC-AIBK-CMB-02 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking combining paid bundle (Value Pack) + baggage + seat (1 adult) is accepted, priced and retrievable.
- **Category:** Flow
- **Endpoint Name:** V2 booking: combined enrichment
- **Request:** 8 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Every selection is accepted on one Book call; the total equals FareConfirm plus bundle, ancillary and seat prices; selections echoed; Retrieve returns the same booking
- **Actual:** All 8 calls matched: PNR C2ZR5J; total 11285 = FareConfirm 2605 + extras 8680; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 11285, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (cmb02):** PASS &mdash; 200 offers=72 (4.4s)
  - **Hop 2 &mdash; V2 FareConfirm (cmb02):** PASS &mdash; 200 {"responseId":"2cfcfe14-d585-49bc-98f2-db79c3c605fc","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (0.9s)
  - **Hop 3 &mdash; V2 GetOfferBundles (cmb02):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MDEvMDMvMjAyNyAxODoxMH5CT01_MDEvMDMvMjAyNyAyMDozMH5_":{"origin":"DEL","... (1.0s)
  - **Hop 4 &mdash; V2 AddPassenger (cmb02):** PASS &mdash; 200 {"offerId":"bdb69989-b2f1-4404-8680-7caa5f41cdbb&amp;yAmwY9IAAEL6/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNRE12T... (0.7s)
  - **Hop 5 &mdash; V2 GetAncillary (cmb02):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"bdb69989-b2f1-4404-8680-7caa5f41cdbb&amp;yAmwY9IAAEL... (1.0s)
  - **Hop 6 &mdash; V2 GetSeatMap (cmb02):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"bdb69989-b2f1-4404-8680-7caa5f41cdbb&amp;yAmwY9IAAEL6/CaTmZGW2UhTVmhfTVRRMk5YNGd... (0.9s)
  - **Hop 7 &mdash; V2 Book (cmb02):** PASS &mdash; 200 pnr C2ZR5J (2.5s)
  - **Hop 8 &mdash; V2 Retrieve (cmb02):** PASS &mdash; 200 pnr C2ZR5J (0.6s)

### TC-AIBK-CMB-06 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking combining paid bundle + free special-service item + seat is accepted, priced and retrievable.
- **Category:** Flow
- **Endpoint Name:** V2 booking: combined enrichment
- **Request:** 8 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Every selection is accepted on one Book call; the total equals FareConfirm plus bundle, ancillary and seat prices; selections echoed; Retrieve returns the same booking
- **Actual:** All 8 calls matched: PNR F2IFGZ; total 5389 = FareConfirm 2709 + extras 2680; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 5389, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (cmb06):** PASS &mdash; 200 offers=63 (7.6s)
  - **Hop 2 &mdash; V2 FareConfirm (cmb06):** PASS &mdash; 200 {"responseId":"c59dfde8-3aa6-47e4-8de8-7dac84968e1d","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 GetOfferBundles (cmb06):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMTcvMjAyNiAxODozNX5HT1h_MTIvMTcvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (3.5s)
  - **Hop 4 &mdash; V2 AddPassenger (cmb06):** PASS &mdash; 200 {"offerId":"cfdc1313-bd8b-419e-862b-18499e0f507f&amp;yApOY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... (1.2s)
  - **Hop 5 &mdash; V2 GetAncillary (cmb06):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"cfdc1313-bd8b-419e-862b-18499e0f507f&amp;yApOY9IAAEY... (2.3s)
  - **Hop 6 &mdash; V2 GetSeatMap (cmb06):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"cfdc1313-bd8b-419e-862b-18499e0f507f&amp;yApOY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGd... (1.3s)
  - **Hop 7 &mdash; V2 Book (cmb06):** PASS &mdash; 200 pnr F2IFGZ (2.9s)
  - **Hop 8 &mdash; V2 Retrieve (cmb06):** PASS &mdash; 200 pnr F2IFGZ (0.9s)

### TC-AIBK-CMB-03 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking combining baggage + meal + seat for 2 adults + 1 child + 1 infant is accepted, priced and retrievable.
- **Category:** Flow
- **Endpoint Name:** V2 booking: combined enrichment
- **Request:** 7 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Every selection is accepted on one Book call; the total equals FareConfirm plus bundle, ancillary and seat prices; selections echoed; Retrieve returns the same booking
- **Actual:** All 7 calls matched: PNR C7JJ4H; total 30302 = FareConfirm 18462 + extras 11840; reconciled; 4 passengers echoed | Retrieve matches Book (pnr, token, total 30302, 4 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (cmb03):** PASS &mdash; 200 offers=91 (14.3s)
  - **Hop 2 &mdash; V2 FareConfirm (cmb03):** PASS &mdash; 200 {"responseId":"28d12b6a-ca09-4ac9-bd99-c1985d3e741d","supplier":"AirIndia","journeys":{"SVh_MTYxN34gfn5ERUx_MT... (1.4s)
  - **Hop 3 &mdash; V2 AddPassenger (cmb03):** PASS &mdash; 200 {"offerId":"ee837f43-0b7c-4bc5-b235-b0362f1b624c&amp;yAt1Y9IAAE2i/iaTmZGW2ZRTVmhfTVRZeE4zNGdmbjVFUlV4X01URXZNall2T... (4.4s)
  - **Hop 4 &mdash; V2 GetAncillary (cmb03):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"ee837f43-0b7c-4bc5-b235-b0362f1b624c&amp;yAt1Y9IAAE2... (5.0s)
  - **Hop 5 &mdash; V2 GetSeatMap (cmb03):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"ee837f43-0b7c-4bc5-b235-b0362f1b624c&amp;yAt1Y9IAAE2i/iaTmZGW2ZRTVmhfTVRZeE4zNGd... (2.9s)
  - **Hop 6 &mdash; V2 Book (cmb03):** PASS &mdash; 200 pnr C7JJ4H (4.1s)
  - **Hop 7 &mdash; V2 Retrieve (cmb03):** PASS &mdash; 200 pnr C7JJ4H (0.7s)

### TC-AIBK-CMB-07 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking combining baggage + meal + free seat on an international route BOM-DXB is accepted, priced and retrievable.
- **Category:** Flow
- **Endpoint Name:** V2 booking: combined enrichment
- **Request:** 7 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Every selection is accepted on one Book call; the total equals FareConfirm plus bundle, ancillary and seat prices; selections echoed; Retrieve returns the same booking
- **Actual:** All 7 calls matched: PNR W5LW9D; total 38926 = FareConfirm 28176 + extras 10750; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 38926, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (cmb07):** PASS &mdash; 200 offers=31 (2.7s)
  - **Hop 2 &mdash; V2 FareConfirm (cmb07):** PASS &mdash; 200 {"responseId":"5702eed3-4f2a-4e1a-aafb-180458b00891","supplier":"AirIndia","journeys":{"SVh_MTc5N34gfn5CT01_MT... (1.4s)
  - **Hop 3 &mdash; V2 AddPassenger (cmb07):** PASS &mdash; 200 {"offerId":"c88b74b8-bac6-4519-911f-29a6b3b60df1&amp;yAtfY9IAAIbR/iaTmZGW2ZRTVmhfTVRjNU4zNGdmbjVDVDAxX01USXZNalF2T... (1.4s)
  - **Hop 4 &mdash; V2 GetAncillary (cmb07):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"c88b74b8-bac6-4519-911f-29a6b3b60df1&amp;yAtfY9IAAIb... (2.1s)
  - **Hop 5 &mdash; V2 GetSeatMap (cmb07):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"c88b74b8-bac6-4519-911f-29a6b3b60df1&amp;yAtfY9IAAIbR/iaTmZGW2ZRTVmhfTVRjNU4zNGd... (1.5s)
  - **Hop 6 &mdash; V2 Book (cmb07):** PASS &mdash; 200 pnr W5LW9D (2.5s)
  - **Hop 7 &mdash; V2 Retrieve (cmb07):** PASS &mdash; 200 pnr W5LW9D (0.8s)

### FLOW-V2-25 — FAIL

- **Test Case:** [FC-NONE-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-NONE-A]
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 11127, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-25):** PASS &mdash; 200 offers=63 (12.2s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-25):** PASS &mdash; 200 {"responseId":"1f9d2600-568d-4d26-8c3d-cc53f6bb8d42","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (FLOW-V2-25):** PASS &mdash; 200 {"offerId":"4ab221c6-4a0a-474f-8c01-2add158515c0&amp;yAtJY9IAAE2c8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNekV2T... (2.1s)
  - **Hop 4 &mdash; V2 Book (FLOW-V2-25):** PASS &mdash; 200 pnr A4QRGD (3.5s)
  - **Hop 5 &mdash; V2 Retrieve (FLOW-V2-25):** FAIL &mdash; 200 pnr A4QRGD (0.9s)

### TC-AIBK-CMB-05 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking combining everything on a round trip (bundles on both journeys, baggage, meal, seats on both legs) is accepted, priced and retrievable.
- **Category:** Flow
- **Endpoint Name:** V2 booking: combined enrichment
- **Request:** 8 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Every selection is accepted on one Book call; the total equals FareConfirm plus bundle, ancillary and seat prices; selections echoed; Retrieve returns the same booking
- **Actual:** All 8 calls matched: PNR BTYENY; total 28430 = FareConfirm 15060 + extras 13370; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 28430, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (cmb05):** PASS &mdash; 200 offers=200 (13.0s)
  - **Hop 2 &mdash; V2 FareConfirm (cmb05):** PASS &mdash; 200 {"responseId":"4ae30611-89cc-43e4-a3fe-6f29079896c7","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (1.4s)
  - **Hop 3 &mdash; V2 GetOfferBundles (cmb05):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA2N34gfn5ERUx_MTIvMTAvMjAyNiAwNjoxMH5JWEJ_MTIvMTAvMjAyNiAwODoxNX5_XklYfjE1NDd_IH5_SVh... (13.3s)
  - **Hop 4 &mdash; V2 AddPassenger (cmb05):** PASS &mdash; 200 {"offerId":"03f1cde1-ff5b-48c4-ac6a-21affb473352&amp;yAzmY9IAAQLU/SaTmZKW2ZRTVmhfTVRBMk4zNGdmbjVFUlV4X01USXZNVEF2T... (1.2s)
  - **Hop 5 &mdash; V2 GetAncillary (cmb05):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"03f1cde1-ff5b-48c4-ac6a-21affb473352&amp;yAzmY9IAAQL... (11.9s)
  - **Hop 6 &mdash; V2 GetSeatMap (cmb05):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"03f1cde1-ff5b-48c4-ac6a-21affb473352&amp;yAzmY9IAAQLU/SaTmZKW2ZRTVmhfTVRBMk4zNGd... (4.4s)
  - **Hop 7 &mdash; V2 Book (cmb05):** PASS &mdash; 200 pnr BTYENY (3.6s)
  - **Hop 8 &mdash; V2 Retrieve (cmb05):** PASS &mdash; 200 pnr BTYENY (0.6s)

### FLOW-V2-31 — FAIL

- **Test Case:** [FC-BDL-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-BDL-A]
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 21162, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-31):** PASS &mdash; 200 offers=93 (13.4s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-31):** PASS &mdash; 200 {"responseId":"c2f86b81-d7c4-4ba9-9621-b640ce282fd5","supplier":"AirIndia","journeys":{"SVh_MTYxN34gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (FLOW-V2-31):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTYxN34gfn5ERUx_MTEvMjMvMjAyNiAxMTo1MH5MS09_MTEvMjMvMjAyNiAxMzowNX5_XklYfjEzODF_IH5_TEt... (4.8s)
  - **Hop 4 &mdash; V2 AddPassenger (FLOW-V2-31):** PASS &mdash; 200 {"offerId":"104d4548-0005-49b7-bfdf-fc416b3a04aa&amp;yAtUY9IAAE2q/iaTmZGW2ZRTVmhfTVRZeE4zNGdmbjVFUlV4X01URXZNak12T... (1.8s)
  - **Hop 5 &mdash; V2 Book (FLOW-V2-31):** PASS &mdash; 200 pnr O9Y46U (2.3s)
  - **Hop 6 &mdash; V2 Retrieve (FLOW-V2-31):** FAIL &mdash; 200 pnr O9Y46U (0.7s)

### FLOW-V2-37 — FAIL

- **Test Case:** [FC-ANC-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; Book -&gt; Retrieve (FareCheck is not supported by AirIndia) completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-ANC-A]
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 24395, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-37):** PASS &mdash; 200 offers=66 (12.4s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-37):** PASS &mdash; 200 {"responseId":"314e849f-7a67-457e-a641-0b69454f9221","supplier":"AirIndia","journeys":{"SVh_MTA4MX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (FLOW-V2-37):** PASS &mdash; 200 {"offerId":"96847bfd-bbfd-46fb-a34e-95270ecc4a37&amp;yAs3Y9IAAE14/iaTmZGW2ZRTVmhfTVRBNE1YNGdmbjVFUlV4X01URXZNekF2T... (1.8s)
  - **Hop 4 &mdash; V2 GetAncillary (FLOW-V2-37):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"96847bfd-bbfd-46fb-a34e-95270ecc4a37&amp;yAs3Y9IAAE1... (5.1s)
  - **Hop 5 &mdash; V2 Book (FLOW-V2-37):** PASS &mdash; 200 pnr J6STRN (2.5s)
  - **Hop 6 &mdash; V2 Retrieve (FLOW-V2-37):** FAIL &mdash; 200 pnr J6STRN (1.0s)

### FLOW-V2-49 — FAIL

- **Test Case:** [FC-SM-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-SM-A]
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 14375, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-49):** PASS &mdash; 200 offers=70 (11.6s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-49):** PASS &mdash; 200 {"responseId":"2ae34080-fdce-4299-a6f1-bae453f66123","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (FLOW-V2-49):** PASS &mdash; 200 {"offerId":"858f292d-de0f-4682-974c-8f96e0cadabe&amp;yAqZY9IAAEdb/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNVFF2T... (1.9s)
  - **Hop 4 &mdash; V2 GetSeatMap (FLOW-V2-49):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"858f292d-de0f-4682-974c-8f96e0cadabe&amp;yAqZY9IAAEdb/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.6s)
  - **Hop 5 &mdash; V2 Book (FLOW-V2-49):** PASS &mdash; 200 pnr E5GUPQ (2.4s)
  - **Hop 6 &mdash; V2 Retrieve (FLOW-V2-49):** FAIL &mdash; 200 pnr E5GUPQ (0.6s)

### FLOW-V2-43 — FAIL

- **Test Case:** [FC-BDL+ANC-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-BDL+ANC-A]
- **Request:** 7 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 17065, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-43):** PASS &mdash; 200 offers=69 (11.4s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-43):** PASS &mdash; 200 {"responseId":"7ec6f6b7-8c16-4c40-aff9-e419ce22d095","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 GetOfferBundles (FLOW-V2-43):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMDcvMjAyNiAxODoxMH5CT01_MTIvMDcvMjAyNiAyMDozMH5_":{"origin":"DEL","... (2.7s)
  - **Hop 4 &mdash; V2 AddPassenger (FLOW-V2-43):** PASS &mdash; 200 {"offerId":"8963ad31-df9f-42c0-a9e9-aae4f8c46441&amp;yAqXY9IAAEdb/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNRGN2T... (2.2s)
  - **Hop 5 &mdash; V2 GetAncillary (FLOW-V2-43):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"8963ad31-df9f-42c0-a9e9-aae4f8c46441&amp;yAqXY9IAAEd... (3.6s)
  - **Hop 6 &mdash; V2 Book (FLOW-V2-43):** PASS &mdash; 200 pnr H4JF9D (2.2s)
  - **Hop 7 &mdash; V2 Retrieve (FLOW-V2-43):** FAIL &mdash; 200 pnr H4JF9D (0.8s)

### TC-AIBK-CMB-04 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking combining bundle + baggage + meal + seat for 3 adults + 2 children + 1 infant (6) is accepted, priced and retrievable.
- **Category:** Flow
- **Endpoint Name:** V2 booking: combined enrichment
- **Request:** 10 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, Search 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Every selection is accepted on one Book call; the total equals FareConfirm plus bundle, ancillary and seat prices; selections echoed; Retrieve returns the same booking
- **Actual:** All 10 calls matched: PNR R95RMH; total 37695 = FareConfirm 16545 + extras 21150; reconciled; 6 passengers echoed | Retrieve matches Book (pnr, token, total 37695, 6 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (cmb04):** FAIL &mdash; 200 offers=0 (15.2s)
  - **Hop 2 &mdash; V2 Search (cmb04retry1):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 3 &mdash; V2 Search (cmb04retry2):** PASS &mdash; 200 offers=78 (14.6s)
  - **Hop 4 &mdash; V2 FareConfirm (cmb04):** PASS &mdash; 200 {"responseId":"dacf52bc-b12a-4bef-b0cf-d29a3cd14d95","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 5 &mdash; V2 GetOfferBundles (cmb04):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMDMvMjAyNiAxODozNX5HT1h_MTIvMDMvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (8.4s)
  - **Hop 6 &mdash; V2 AddPassenger (cmb04):** PASS &mdash; 200 {"offerId":"50fa198b-8405-4cde-967b-c858f436f986&amp;yAuPY9IAAE7j8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNRE12T... (2.5s)
  - **Hop 7 &mdash; V2 GetAncillary (cmb04):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"50fa198b-8405-4cde-967b-c858f436f986&amp;yAuPY9IAAE7... (8.6s)
  - **Hop 8 &mdash; V2 GetSeatMap (cmb04):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"50fa198b-8405-4cde-967b-c858f436f986&amp;yAuPY9IAAE7j8CWTmZGW2ZRTVmhfTVRBME9YNGd... (2.8s)
  - **Hop 9 &mdash; V2 Book (cmb04):** PASS &mdash; 200 pnr R95RMH (4.7s)
  - **Hop 10 &mdash; V2 Retrieve (cmb04):** PASS &mdash; 200 pnr R95RMH (0.8s)

### FLOW-V2-61 — FAIL

- **Test Case:** [FC-ANC+SM-A][Response] Verify Search -&gt; FareConfirm -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-ANC+SM-A]
- **Request:** 7 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 20625, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-61):** PASS &mdash; 200 offers=71 (12.8s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-61):** PASS &mdash; 200 {"responseId":"795f000a-b6c6-4159-be5a-aa4a73e0d88a","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (FLOW-V2-61):** PASS &mdash; 200 {"offerId":"20b4c069-7b7b-441e-a2ba-90407957ebc1&amp;yAqVY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNamd2T... (1.8s)
  - **Hop 4 &mdash; V2 GetAncillary (FLOW-V2-61):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"20b4c069-7b7b-441e-a2ba-90407957ebc1&amp;yAqVY9IAAEd... (2.4s)
  - **Hop 5 &mdash; V2 GetSeatMap (FLOW-V2-61):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"20b4c069-7b7b-441e-a2ba-90407957ebc1&amp;yAqVY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.7s)
  - **Hop 6 &mdash; V2 Book (FLOW-V2-61):** PASS &mdash; 200 pnr B11VQP (2.5s)
  - **Hop 7 &mdash; V2 Retrieve (FLOW-V2-61):** FAIL &mdash; 200 pnr B11VQP (0.8s)

### FLOW-V2-55 — FAIL

- **Test Case:** [FC-BDL+SM-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetSeatMap -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-BDL+SM-A]
- **Request:** 7 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 17387, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-55):** PASS &mdash; 200 offers=70 (12.5s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-55):** PASS &mdash; 200 {"responseId":"0aac1e07-7814-4fb1-ac10-af8204d16ff8","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.3s)
  - **Hop 3 &mdash; V2 GetOfferBundles (FLOW-V2-55):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjEvMjAyNiAxODozNX5HT1h_MTIvMjEvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.2s)
  - **Hop 4 &mdash; V2 AddPassenger (FLOW-V2-55):** PASS &mdash; 200 {"offerId":"02f62e7d-dadf-4910-af39-4f4c6283abd9&amp;yAtGY9IAAE2Y8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNakV2T... (2.0s)
  - **Hop 5 &mdash; V2 GetSeatMap (FLOW-V2-55):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"02f62e7d-dadf-4910-af39-4f4c6283abd9&amp;yAtGY9IAAE2Y8CWTmZGW2ZRTVmhfTVRBME9YNGd... (1.9s)
  - **Hop 6 &mdash; V2 Book (FLOW-V2-55):** PASS &mdash; 200 pnr WS6BXE (2.5s)
  - **Hop 7 &mdash; V2 Retrieve (FLOW-V2-55):** FAIL &mdash; 200 pnr WS6BXE (0.6s)

### FLOW-V1-13 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Response] Verify FareConfirm-based, Bundle-enriched, Family-A flow #13 (SR-FC-BDL-BK-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** V1 Family A flow SR-FC-BDL-BK-RT
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Retrieve shows bookingStatus=booked; the chosen bundle is priced into Book; Book and Retrieve agree; prices reconcile
- **Actual:** V1 Book: totalBaseAmount 9738 != sum(paxBase*count) 12480; totalTaxAmount 5598 != sum(paxTax*count) 5682; totalAmount 15336 != sum(paxTotal*count) 18162 = 18162; Book total 15336 != FareConfirm 15462 + bundle 2700 = 18162 (bundle selection not priced) | V1 Retrieve: Retrieve matches Book (pnr, token, total 15336, 3 passengers); bookingStatus undefined, gdsPNR "" | bookingStatus is absent from the Retrieve response
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v113):** PASS &mdash; 200 offers=67 (3.6s)
  - **Hop 2 &mdash; V1 FareConfirm (v113):** PASS &mdash; 200 {"responseId":"a8be0642-8146-4101-a2db-dfb6ff266209","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v113):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTM5MX4gfn5ERUx_MTIvMDQvMjAyNiAyMDozMH5MS09_MTIvMDQvMjAyNiAyMTo0MH5_XklYfjEwMjd_IH5_TEt... (3.8s)
  - **Hop 4 &mdash; V1 Book (v113):** FAIL &mdash; 200 pnr I8JCGH (3.2s)
  - **Hop 5 &mdash; V1 Retrieve (v113):** FAIL &mdash; 200 pnr I8JCGH (0.8s)

### FLOW-V1-01 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve] [Response] Verify FareConfirm-based Family-A flow #1 (SR-FC-BK-RT) completes with the expected end-state.
- **Category:** Flow
- **Endpoint Name:** V1 Family A flow SR-FC-BK-RT
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Retrieve shows bookingStatus=booked; Book and Retrieve agree on offer and total; prices reconcile
- **Actual:** V1 Retrieve: Retrieve matches Book (pnr, token, total 18462, 4 passengers); bookingStatus undefined, gdsPNR "" | bookingStatus is absent from the Retrieve response
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v101):** PASS &mdash; 200 offers=95 (11.6s)
  - **Hop 2 &mdash; V1 FareConfirm (v101):** PASS &mdash; 200 {"responseId":"4b7ba201-2274-40ef-ae64-a87643d6bd1b","supplier":"AirIndia","journeys":{"SVh_MTYxN34gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v101):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTYxN34gfn5ERUx_MTEvMjcvMjAyNiAxMTo1MH5MS09_MTEvMjcvMjAyNiAxMzowNX5_XklYfjEzODF_IH5_TEt... (3.8s)
  - **Hop 4 &mdash; V1 Book (v101):** PASS &mdash; 200 pnr CUCGPV (3.5s)
  - **Hop 5 &mdash; V1 Retrieve (v101):** FAIL &mdash; 200 pnr CUCGPV (0.8s)

### FLOW-V2-67 — FAIL

- **Test Case:** [FC-BDL+ANC+SM-A][Response] Verify Search -&gt; FareConfirm -&gt; GetOfferBundles -&gt; AddPassenger -&gt; GetAncillary -&gt; GetSeatMap -&gt; Book -&gt; Retrieve completes with a booked/confirmed bookingStatus at the final Retrieve, matching Book's selectedOffer/price.
- **Category:** Flow
- **Endpoint Name:** V2 Family A flow [FC-BDL+ANC+SM-A]
- **Request:** 8 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** Bookable end to end; Retrieve shows a booked/confirmed bookingStatus; Book and Retrieve agree on offer and total; price reconciles including selections
- **Actual:** V2 Retrieve: Retrieve matches Book (pnr, token, total 20625, 4 passengers); bookingStatus "UnKnown", gdsPNR "" | bookingStatus is "UnKnown" after a successful Book (expected a booked/confirmed value)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (FLOW-V2-67):** PASS &mdash; 200 offers=72 (10.9s)
  - **Hop 2 &mdash; V2 FareConfirm (FLOW-V2-67):** PASS &mdash; 200 {"responseId":"7f31b6d1-ac74-40c6-b5bc-a553e87344d9","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (FLOW-V2-67):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MDEvMDQvMjAyNyAxODoxMH5CT01_MDEvMDQvMjAyNyAyMDozMH5_":{"origin":"DEL","... (2.3s)
  - **Hop 4 &mdash; V2 AddPassenger (FLOW-V2-67):** PASS &mdash; 200 {"offerId":"c9d3a898-5cb1-4fb9-8c7f-5241bcad8c60&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNRFF2T... (1.9s)
  - **Hop 5 &mdash; V2 GetAncillary (FLOW-V2-67):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"c9d3a898-5cb1-4fb9-8c7f-5241bcad8c60&amp;yAqWY9IAAEd... (2.1s)
  - **Hop 6 &mdash; V2 GetSeatMap (FLOW-V2-67):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"c9d3a898-5cb1-4fb9-8c7f-5241bcad8c60&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.2s)
  - **Hop 7 &mdash; V2 Book (FLOW-V2-67):** PASS &mdash; 200 pnr G5VK7N (2.8s)
  - **Hop 8 &mdash; V2 Retrieve (FLOW-V2-67):** FAIL &mdash; 200 pnr G5VK7N (0.6s)

### TC-AIBK-PAX-10 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 1 adult + 3 children completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR V57B3D; total 10836; reconciled; 4 passengers echoed | Retrieve matches Book (pnr, token, total 10836, 4 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax10):** PASS &mdash; 200 offers=86 (7.7s)
  - **Hop 2 &mdash; V2 FareConfirm (pax10):** PASS &mdash; 200 {"responseId":"0dafd108-05f6-4cd2-a380-ca3dbff249d8","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (pax10):** PASS &mdash; 200 {"offerId":"1cf3dd6c-f7d1-458d-bcb9-214c5ff1a62d&amp;yAr6Y9IAAErb8Q+TmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01ERXYEAPwDa... (1.9s)
  - **Hop 4 &mdash; V2 Book (pax10):** PASS &mdash; 200 pnr V57B3D (2.1s)
  - **Hop 5 &mdash; V2 Retrieve (pax10):** PASS &mdash; 200 pnr V57B3D (0.7s)

### TC-AIBK-PAX-08 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 9 adults completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR TV56FI; total 47475; reconciled; 9 passengers echoed | Retrieve matches Book (pnr, token, total 47475, 9 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax08):** PASS &mdash; 200 offers=80 (6.9s)
  - **Hop 2 &mdash; V2 FareConfirm (pax08):** PASS &mdash; 200 {"responseId":"db1c3b21-29f3-4722-ad7d-f3ec80965c7c","supplier":"AirIndia","journeys":{"SVh_MTA1N34gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (pax08):** PASS &mdash; 200 {"offerId":"2d17351d-4284-4ca1-aed2-1249b03df79c&amp;yAupY9IAAEtG/SaTmZGW2ZRTVmhfTVRBMU4zNGdmbjVFUlV4X01USXZNalV2T... (4.0s)
  - **Hop 4 &mdash; V2 Book (pax08):** PASS &mdash; 200 pnr TV56FI (2.0s)
  - **Hop 5 &mdash; V2 Retrieve (pax08):** PASS &mdash; 200 pnr TV56FI (0.8s)

### TC-AIBK-RTE-19 — PASS

- **Test Case:** [Book][Flow] Verify a V2 booking MAA-SIN (international, ADT+CHD) completes end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: route MAA-SIN
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR RSCQFB; total 24008; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 24008, 2 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (rteMAA-SIN):** PASS &mdash; 200 offers=6 (2.2s)
  - **Hop 2 &mdash; V2 FareConfirm (rteMAA-SIN):** PASS &mdash; 200 {"responseId":"8ff094b9-82af-40b3-a578-ae52cbd1d796","supplier":"AirIndia","journeys":{"SVh_IDYyOH4gfn5NQUF_MT... (0.8s)
  - **Hop 3 &mdash; V2 AddPassenger (rteMAA-SIN):** PASS &mdash; 200 {"offerId":"3530ab60-3d68-4891-9f13-2eb33dacc3f4&amp;yAolY9IAAEUl/SaTmZGW2UhTVmhfSURZeU9INGdmbjVOUVVGX01URXZNalF2T... (1.1s)
  - **Hop 4 &mdash; V2 Book (rteMAA-SIN):** PASS &mdash; 200 pnr RSCQFB (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (rteMAA-SIN):** PASS &mdash; 200 pnr RSCQFB (0.6s)

### TC-AIBK-PAX-06 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 3 adults + 2 children + 1 infant (6) completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR J2L2GZ; total 28090; reconciled; 6 passengers echoed | Retrieve matches Book (pnr, token, total 28090, 6 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax06):** PASS &mdash; 200 offers=82 (15.8s)
  - **Hop 2 &mdash; V2 FareConfirm (pax06):** PASS &mdash; 200 {"responseId":"c7043f22-e94e-4b31-a38e-0de4bbaa9d0e","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (pax06):** PASS &mdash; 200 {"offerId":"37dfe02f-97f2-4b1b-acad-7075c1f5aa99&amp;yAuaY9IAAE7c/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNVEV2T... (2.6s)
  - **Hop 4 &mdash; V2 Book (pax06):** PASS &mdash; 200 pnr J2L2GZ (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (pax06):** PASS &mdash; 200 pnr J2L2GZ (0.8s)

### TC-AIBK-V1-04 — PASS

- **Test Case:** [Book][Flow] Verify a V1 one-way booking DEL-BOM for 9 adults completes end to end (Search, FareConfirm, GetOfferBundles, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V1 booking: passenger mix
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR Z1KQYS; total 47475; reconciled; 9 passengers echoed | Retrieve matches Book (pnr, token, total 47475, 9 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** PASS &mdash; 200 offers=82 (3.9s)
  - **Hop 2 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"a2b2d2a4-3c9b-4373-8f4f-d1694f80a9d6","supplier":"AirIndia","journeys":{"SVh_MTA1N34gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA1N34gfn5ERUx_MTIvMTQvMjAyNiAwNjoxNX5CQkl_MTIvMTQvMjAyNiAwODozNX5_XklYfjEyNDN_IH5_QkJ... (10.0s)
  - **Hop 4 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr Z1KQYS (7.2s)
  - **Hop 5 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr Z1KQYS (0.7s)

### TC-AIBK-PAX-07 — PASS

- **Test Case:** [Book][Flow] Verify a V2 one-way booking DEL-BOM for 4 adults + 3 children + 2 infants (9, the maximum) completes end to end (Search, FareConfirm, AddPassenger, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V2 booking: passenger mix
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 6 calls matched: PNR TZQNRF; total 42925; reconciled; 9 passengers echoed | Retrieve matches Book (pnr, token, total 42925, 9 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (pax07):** FAIL &mdash; 200 offers=0 (16.4s)
  - **Hop 2 &mdash; V2 Search (pax07retry1):** PASS &mdash; 200 offers=82 (14.3s)
  - **Hop 3 &mdash; V2 FareConfirm (pax07):** PASS &mdash; 200 {"responseId":"72bafe33-299c-4ecd-b074-e98ca15ee800","supplier":"AirIndia","journeys":{"SVh_MTA1N34gfn5ERUx_MT... (1.4s)
  - **Hop 4 &mdash; V2 AddPassenger (pax07):** PASS &mdash; 200 {"offerId":"640005ff-f12c-44d8-9e5f-626f05598ab9&amp;yAv5Y9IAAFB4/SaTmZGW2ZRTVmhfTVRBMU4zNGdmbjVFUlV4X01USXZNVGd2T... (4.5s)
  - **Hop 5 &mdash; V2 Book (pax07):** PASS &mdash; 200 pnr TZQNRF (1.9s)
  - **Hop 6 &mdash; V2 Retrieve (pax07):** PASS &mdash; 200 pnr TZQNRF (0.6s)

### TC-AIBK-SEAT-08 — PASS

- **Test Case:** [Book][GetSeatMap] Verify a V2 booking with seats for 4 adults + 3 children (infants excluded) is priced, echoed and retrievable.
- **Category:** Positive
- **Endpoint Name:** V2 seat booking
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** GetSeatMap offers the seat; Book accepts the selection; the total equals FareConfirm plus the seat prices; the seat is echoed per passenger and segment and retrievable
- **Actual:** All 6 calls matched: PNR M8E46H; total 53586 = FareConfirm 41126 + extras 12460; reconciled; 9 passengers echoed | Retrieve matches Book (pnr, token, total 53586, 9 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (seat08):** PASS &mdash; 200 offers=76 (14.9s)
  - **Hop 2 &mdash; V2 FareConfirm (seat08):** PASS &mdash; 200 {"responseId":"8fbedd74-75ab-4f56-a116-4e41cb874a4c","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (1.4s)
  - **Hop 3 &mdash; V2 AddPassenger (seat08):** PASS &mdash; 200 {"offerId":"9d382855-799b-4c96-8fcb-a82da6700849&amp;yAwDY9IAAFBs/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNRGd2T... (4.4s)
  - **Hop 4 &mdash; V2 GetSeatMap (seat08):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"9d382855-799b-4c96-8fcb-a82da6700849&amp;yAwDY9IAAFBs/iaTmZGW2ZRTVmhfTVRNNU1YNGd... (4.8s)
  - **Hop 5 &mdash; V2 Book (seat08):** PASS &mdash; 200 pnr M8E46H (4.4s)
  - **Hop 6 &mdash; V2 Retrieve (seat08):** PASS &mdash; 200 pnr M8E46H (0.7s)

### TC-BOOK-VAL-01 — PASS

- **Test Case:** [Book] [Request] Validate the documented capital-S "Supplier" field is accepted, and confirm whether lowercase "supplier" is also accepted.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Run 1 (documented capital-S casing) succeeds and returns pnr/bookingToken/gdsPNR as normal -- this is the shape every saved V1 example uses (section 2.9) and must work. Run 2's outcome is UNKNOWN per SPEC section 2.9 (confirm case-insensitivity live) -- if it also succeeds, the routing layer is doing case-insensitive JSON key binding (consistent with typical .NET deserializer defaults, section 1.2's similar path-casing note); if it fails or ignores the field, this confirms Book's "Supplier" casing is a hard, non-cosmetic requirement, not a copy-paste artifact, and should be documented as such going forward.
- **Actual:** All 5 calls matched: PNR IUKT7F; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** Supplier (capital S) body variant; lowercase supplier is used by every other V1 Book in this run

  - **Hop 1 &mdash; V1 Search (capS):** PASS &mdash; 200 offers=66 (7.2s)
  - **Hop 2 &mdash; V1 FareConfirm (capS):** PASS &mdash; 200 {"responseId":"61a0bfb1-ac7b-4dfb-9a35-2aa7f6610bca","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V1 GetOfferBundles (capS):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjQvMjAyNiAxODozNX5HT1h_MTIvMjQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (2.6s)
  - **Hop 4 &mdash; V1 Book (capS):** PASS &mdash; 200 pnr IUKT7F (2.5s)
  - **Hop 5 &mdash; V1 Retrieve (capS):** PASS &mdash; 200 pnr IUKT7F (0.6s)

### TC-BOOK-POS-01 — PASS

- **Test Case:** [Book] [Request] Validate a fully-populated passengersList and contactsList (valid ADT+INF with ParentPaxRefId, resolving contactRefId) is accepted.
- **Category:** Positive
- **Endpoint Name:** Book
- **Request:** 2 call(s): V1 Book &gt; V1 Retrieve
- **Response:** Book 200, Retrieve 200
- **Expected:** Book succeeds (pnr/bookingToken/gdsPNR returned); Retrieve's passengersList echoes the submitted names/types/document numbers unchanged (section 6.3 Family A Expected passenger state); the INF entry's ParentPaxRefId correctly resolves to the ADT entry in the response; no rejection despite this shape being untested by either collection's own saved examples (every saved V1 Book request in the collection ships passengersList/contactsList empty, section 2.9 -- this test supplies the missing coverage).
- **Actual:** V1 Book ADT+INF accepted, pnr F72I9K; passengers echoed 2 of 2; infant parent reference echoed
- **Status:** PASS
- **Evidence:** OK: V1 Book ADT+INF accepted, pnr F72I9K | OK: passengers echoed 2 of 2 | OK: infant parent reference echoed

  - **Hop 1 &mdash; V1 Book (v1inf):** PASS &mdash; 200 pnr F72I9K (2.5s)
  - **Hop 2 &mdash; V1 Retrieve (v1inf):** PASS &mdash; 200 pnr F72I9K (0.7s)

### TC-BOOK-VAL-02 — PASS

- **Test Case:** [Book][Request] Validate V1 Book's capital-S Supplier field is accepted consistently despite every other V1 field using lowercase supplier.
- **Category:** Validation
- **Endpoint Name:** V1 Book field casing
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Confirm live whether field-name matching is case-insensitive; if inconsistent handling is found, flag as a copy-paste artifact worth fixing in the collection.
- **Actual:** All 5 calls matched: PNR F5KM7A; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (lowS):** PASS &mdash; 200 offers=69 (4.2s)
  - **Hop 2 &mdash; V1 FareConfirm (lowS):** PASS &mdash; 200 {"responseId":"4b3f5f56-a151-4570-85f4-96626ab0ff75","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (lowS):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjcvMjAyNiAxODozNX5HT1h_MTIvMjcvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.4s)
  - **Hop 4 &mdash; V1 Book (lowS):** PASS &mdash; 200 pnr F5KM7A (2.3s)
  - **Hop 5 &mdash; V1 Retrieve (lowS):** PASS &mdash; 200 pnr F5KM7A (1.1s)

### TC-BOOK-BIZ-01 — PASS

- **Test Case:** [Book]&amp;[Hold] [Response] Verify the price-reconciliation formula holds on the booked/held offer, matching the pre-booking FareConfirm total.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** 1 call(s): V1 Book
- **Response:** Book 200
- **Expected:** Both Book and Hold reconcile correctly per the formula (section 2.1), and neither total drifts unexpectedly from FareConfirm's pre-booking price in the standard, non-delayed positive path. This is enforced by V1's Book AND Hold scripts alike (SPEC section 2.9 Business Logic, 2.10 Business Logic -- both present, unlike V2 Book which SPEC flags as a script coverage gap).
- **Actual:** V1 Book reconciliation holds; V1 Book total 23163 equals FareConfirm 23163
- **Status:** PASS
- **Evidence:** OK: V1 Book reconciliation holds | OK: V1 Book total 23163 equals FareConfirm 23163

  - **Hop 1 &mdash; V1 Book (v1plain):** PASS &mdash; 200 pnr D53E4A (3.6s)

### TC-BOOK-POS-02 — FAIL

- **Test Case:** [Book][Request] Verify Book commits a confirmed offer to a live PNR and returns pnr/bookingToken/gdsPNR.
- **Category:** Positive
- **Endpoint Name:** BOOK
- **Request:** 2 call(s): V1 Book &gt; V2 Book
- **Response:** Book 200, Book 200
- **Expected:** HTTP 200; pnr, bookingToken, gdsPNR non-empty; voidCapability present; passengersList is echoed in the RESPONSE for V2 even though absent from the V2 request (server resolves it from AddPassenger).
- **Actual:** V1 gdsPNR is empty; V1 voidCapability missing from the Book response; V2 gdsPNR is empty; V2 voidCapability missing from the Book response
- **Status:** FAIL
- **Evidence:** OK: V1 pnr D53E4A | OK: V1 bookingToken present | FAIL: V1 gdsPNR is empty | FAIL: V1 voidCapability missing from the Book response | OK: V2 pnr CTMKHI | OK: V2 bookingToken present | FAIL: V2 gdsPNR is empty | FAIL: V2 voidCapability missing from the Book response | OK: V2 passengersList echoed in the Book response (4 of 4)

  - **Hop 1 &mdash; V2 Book (v2plain):** PASS &mdash; 200 pnr CTMKHI (1.4s)
  - **Hop 2 &mdash; V1 Book (v1plain):** PASS &mdash; 200 pnr D53E4A (3.6s)

### TC-BOOK-BIZ-03 — PASS

- **Test Case:** [Book][Response] Verify the price-reconciliation formula holds on Book's response.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** 2 call(s): V1 Book &gt; V2 Book
- **Response:** Book 200, Book 200
- **Expected:** All reconciliation checks hold.
- **Actual:** V1 Book price reconciliation holds; total 23163 equals FareConfirm 23163; V2 Book price reconciliation holds; total 25941 equals FareConfirm 25941
- **Status:** PASS
- **Evidence:** OK: V1 Book price reconciliation holds; total 23163 equals FareConfirm 23163 | OK: V2 Book price reconciliation holds; total 25941 equals FareConfirm 25941

  - **Hop 1 &mdash; V2 Book (v2plain):** PASS &mdash; 200 pnr CTMKHI (1.4s)
  - **Hop 2 &mdash; V1 Book (v1plain):** PASS &mdash; 200 pnr D53E4A (3.6s)

### TC-BOOK-POS-03 — PASS

- **Test Case:** [Book][Request] Validate Book accepts a single-passenger, single-segment passengersSelectedSeats selection and echoes it correctly.
- **Category:** Positive
- **Endpoint Name:** BOOK
- **Request:** 3 call(s): V2 GetSeatMap &gt; V2 Book &gt; V2 Retrieve
- **Response:** GetSeatMap 200, Book 200, Retrieve 200
- **Expected:** HTTP 200; pnr/bookingToken/gdsPNR returned; response top-level passengersSelectedSeats.T1.S1 == {cellCode:"12E", price:{amount,currency}}; selectedOffer.passengerFareBreakdown[].passengerSeats contains the same {cellCode,price}; selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount reflect the same price.
- **Actual:** one seat echoed in passengersSelectedSeats; echoed seat 1D is the one selected (Pax1 seg0 1D (AvailablePaid) @1780); echoed price 1780 equals map price 1780
- **Status:** PASS
- **Evidence:** OK: one seat echoed in passengersSelectedSeats | OK: echoed seat 1D is the one selected (Pax1 seg0 1D (AvailablePaid) @1780) | OK: echoed price 1780 equals map price 1780

  - **Hop 1 &mdash; V2 GetSeatMap (seat1):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"8b03e337-1714-42bd-a60b-39baa9e4ab98&amp;yApVY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGd... (1.1s)
  - **Hop 2 &mdash; V2 Book (seat1):** PASS &mdash; 200 pnr MYI9GR (1.8s)
  - **Hop 3 &mdash; V2 Retrieve (seat1):** PASS &mdash; 200 pnr MYI9GR (0.6s)

### TC-BOOK-BIZ-04 — PASS

- **Test Case:** [Book] Verify the production-booking auto-skip discipline is enforced as a manual process control before any Book/BookAfterHold execution against a production base URL.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** 1 call(s): V2 Book
- **Response:** Book 200
- **Expected:** No Book/BookAfterHold execution proceeds against a PROD baseUrl without explicit, documented authorization, regardless of Supplier_Name/Credentials_Selector configured.
- **Actual:** totalSelectedSeatsAmount 7120 equals the sum of selected seat prices 7120; totalAmount 24497 equals base + tax + ancillaries + seats = 24497
- **Status:** PASS
- **Evidence:** OK: totalSelectedSeatsAmount 7120 equals the sum of selected seat prices 7120 | OK: totalAmount 24497 equals base + tax + ancillaries + seats = 24497

  - **Hop 1 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-BOOK-INT-03 — PASS

- **Test Case:** [Book][Request] Validate Book accepts passengersSelectedSeats, PassengersSelectedAncillaries, and selectedBundles populated simultaneously on one call.
- **Category:** Integration
- **Endpoint Name:** BOOK
- **Request:** 4 call(s): V2 GetOfferBundles &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** GetOfferBundles 200, GetAncillary 200, GetSeatMap 200, Book 200
- **Expected:** UNKNOWN -- confirm live. The collection's current saved Book example carries only passengersSelectedSeats active, with selectedBundles/PassengersSelectedAncillaries left commented out -- this combination has not been directly evidenced as accepted. Record whichever outcome occurs (accepted with all three reflected in the response, partially accepted, or rejected) as the new ground truth.
- **Actual:** Book accepted selectedBundles + PassengersSelectedAncillaries + passengersSelectedSeats together, pnr NSGQXB; combined total reconciles: 24497
- **Status:** PASS
- **Evidence:** OK: Book accepted selectedBundles + PassengersSelectedAncillaries + passengersSelectedSeats together, pnr NSGQXB | OK: combined total reconciles: 24497

  - **Hop 1 &mdash; V2 GetOfferBundles (rich):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MDEvMDIvMjAyNyAxODozNX5HT1h_MDEvMDIvMjAyNyAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.1s)
  - **Hop 2 &mdash; V2 GetAncillary (rich):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"420d74eb-f738-4eeb-9774-c74d7523a4ad&amp;yAtMY9IAAE2... (5.1s)
  - **Hop 3 &mdash; V2 GetSeatMap (rich):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"420d74eb-f738-4eeb-9774-c74d7523a4ad&amp;yAtMY9IAAE2c/CaTmZGW2ZRTVmhfTVRBME9YNGd... (2.1s)
  - **Hop 4 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-BOOK-REG-02 — PASS

- **Test Case:** [Book][Response] Verify passengersSelectedSeats, selectedOffer.passengerFareBreakdown[].passengerSeats/paxTotalSeatAmount, and selectedOffer.priceDetails.totalSelectedSeats/totalSelectedSeatsAmount are present in the Book response schema going forward.
- **Category:** Regression
- **Endpoint Name:** BOOK
- **Request:** 1 call(s): V2 Book
- **Response:** Book 200
- **Expected:** All five newly-documented fields (passengersSelectedSeats, passengerSeats, paxTotalSeatAmount, totalSelectedSeats, totalSelectedSeatsAmount) are present and correctly typed whenever a seat has been selected; none of the pre-existing response fields regressed.
- **Actual:** passengerSeats present on 3 of 3 seated passengers; paxTotalSeatAmount equals the sum of passengerSeats prices; priceDetails.totalSelectedSeats lists 4 seats
- **Status:** PASS
- **Evidence:** OK: passengerSeats present on 3 of 3 seated passengers | OK: paxTotalSeatAmount equals the sum of passengerSeats prices | OK: priceDetails.totalSelectedSeats lists 4 seats

  - **Hop 1 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-BOOK-REG-03 — PASS

- **Test Case:** [Book][Response] Verify selectedOffer.passengerFareBreakdown[].passengerSeats[].price.amount equals the same passenger's paxTotalSeatAmount.amount when exactly one seat is selected.
- **Category:** Regression
- **Endpoint Name:** BOOK
- **Request:** 1 call(s): V2 Book
- **Response:** Book 200
- **Expected:** Automatable assertion: the two amounts are exactly equal (and same currency). This directly encodes the schema-discrepancy defect pattern flagged in Seat map - Seatmap.md TC-INT-BOOK-005 (its own example shows a hypothetical 50.0-vs-100.0 mismatch) -- any observed mismatch is a confirmed defect against §2.9's response schema, not an UNKNOWN.
- **Actual:** for every passenger with exactly one seat, passengerSeats[0].price equals paxTotalSeatAmount
- **Status:** PASS
- **Evidence:** OK: for every passenger with exactly one seat, passengerSeats[0].price equals paxTotalSeatAmount

  - **Hop 1 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-BOOK-BND-03 — PASS

- **Test Case:** [Book][Request] Validate passengersSelectedSeats with 0, 1, and multiple passenger/segment entries.
- **Category:** Boundary
- **Endpoint Name:** BOOK
- **Request:** 2 call(s): V2 Book
- **Response:** Book 200, Book 200
- **Expected:** (a) Book succeeds with no seat attached (passengersSelectedSeats absent/empty in the response). (b) succeeds as in TC-BOOK-POS-03. (c) UNKNOWN -- confirm live whether multiple passengers/segments nest correctly as sibling keys per SPEC.md §2.9's schema description, since only the single-passenger/single-segment shape has a directly-observed example.
- **Actual:** 1 seat entry echoed (single passenger, single segment): 1; multiple entries echoed (3 passengers on segment 1 + 1 on segment 2): 4 of 4; booking with no seat entry carries no seat echo
- **Status:** PASS
- **Evidence:** OK: 1 seat entry echoed (single passenger, single segment): 1 | OK: multiple entries echoed (3 passengers on segment 1 + 1 on segment 2): 4 of 4 | OK: booking with no seat entry carries no seat echo

  - **Hop 1 &mdash; V2 Book (seat1):** PASS &mdash; 200 pnr MYI9GR (1.8s)
  - **Hop 2 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-RETRIEVE-REG-01-SM — BLOCKED

- **Test Case:** [Retrieve][Response] Verify a selected seat still appears in Retrieve after the booking transitions from Booked to ticketed (Retrieve After Issue).
- **Category:** Regression
- **Endpoint Name:** Retrieve (seat after issue)
- **Request:** Not sent
- **Response:** n/a
- **Expected:** A selected seat still appears in Retrieve after the booking is ticketed
- **Actual:** Cannot be executed: no ticket-issuance operation exists in this API (Book leaves tickets empty), so the booking never reaches the ticketed state. The booked-state half is covered by TC-BOOK-POS-04.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BOOK-VAL-08 — PASS

- **Test Case:** [Book][Response] Verify the currency code is consistent (not a generic placeholder like "string") across every seat-price object in one Book response.
- **Category:** Validation
- **Endpoint Name:** BOOK
- **Request:** 1 call(s): V2 Book
- **Response:** Book 200
- **Expected:** Automatable assertion: every seat-related price.currency value is identical (e.g. all "EGP" or all "AED", matching the offer's overall currency) and none equals the literal string "string" or is null/empty.
- **Actual:** currency codes in the Book response: INR
- **Status:** PASS
- **Evidence:** OK: currency codes in the Book response: INR

  - **Hop 1 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-BOOK-BIZ-06 — PASS

- **Test Case:** [Book][Response] Verify an Infant (INF) passenger travelling on an Adult's lap is not charged a seat fee and requires no passengersSelectedSeats entry.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** 1 call(s): V2 Book
- **Response:** Book 200
- **Expected:** Automatable assertions: Book/Retrieve succeed; selectedOffer.passengerFareBreakdown for the INF paxRef has paxTotalSeatAmount.amount == 0 (or the field/array absent) and no passengerSeats entries; the ADT's paxTotalSeatAmount matches the selected cell's price; totalSelectedSeatsAmount equals only the ADT's seat price, not double-counted for the INF.
- **Actual:** infant fare row present; infant seat fee 0; no seat entry for the infant
- **Status:** PASS
- **Evidence:** OK: infant fare row present | OK: infant seat fee 0 | OK: no seat entry for the infant

  - **Hop 1 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-BOOK-POS-04 — PASS

- **Test Case:** [Book][Response] Verify a selected seat is committed to the booking (visible on Retrieve, priced into the offer) as soon as Book succeeds, without waiting on any ticketing/payment step.
- **Category:** Positive
- **Endpoint Name:** BOOK
- **Request:** 2 call(s): V2 Book &gt; V2 Retrieve
- **Response:** Book 200, Retrieve 200
- **Expected:** Automatable assertion: the immediate post-Book Retrieve already shows passengersSelectedSeats/passengerSeats/totalSelectedSeatsAmount populated with the selected seat, while bookingStatus/ticketStatus still reads as un-ticketed/un-issued (e.g. Booked, not Ticketed). This confirms the seat is attached to the reservation at Book time and does not depend on a later payment/ticketing step existing or completing. If bookingStatus already reads as ticketed/paid immediately post-Book with no intervening action taken, record that as a finding rather than assuming the AC's ordering holds.
- **Actual:** Retrieve right after Book shows 4 of 4 selected seats; Retrieve priceDetails.totalSelectedSeatsAmount 7120 equals 7120
- **Status:** PASS
- **Evidence:** OK: Retrieve right after Book shows 4 of 4 selected seats | OK: Retrieve priceDetails.totalSelectedSeatsAmount 7120 equals 7120

  - **Hop 1 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)
  - **Hop 2 &mdash; V2 Retrieve (rich):** PASS &mdash; 200 pnr NSGQXB (1.3s)

### TC-RETRIEVE-REG-01 — FAIL

- **Test Case:** [Retrieve] Verify V2 Retrieve has zero test-script assertions, the largest single V1/V2 coverage gap of any endpoint.
- **Category:** Regression
- **Endpoint Name:** RETRIEVE
- **Request:** 1 call(s): V2 Retrieve
- **Response:** Retrieve 200
- **Expected:** Manual testing independently supplies the price-reconciliation and bookingStatus checks for V2 Retrieve, since V2's script provides none of what V1's does automatically.
- **Actual:** V2 Retrieve bookingStatus "UnKnown"
- **Status:** FAIL
- **Evidence:** OK: V2 Retrieve price reconciliation holds (supplied manually: the V2 script has no assertions) | FAIL: V2 Retrieve bookingStatus "UnKnown"

  - **Hop 1 &mdash; V2 Retrieve (v2plain):** PASS &mdash; 200 pnr CTMKHI (0.6s)

### TC-RETRIEVE-POS-01 — FAIL

- **Test Case:** [Retrieve][Response] Verify bookingStatus reflects the correct lifecycle stage (Held after Hold, Booked after Book/BookAfterHold).
- **Category:** Positive
- **Endpoint Name:** RETRIEVE
- **Request:** 2 call(s): V1 Retrieve &gt; V2 Retrieve
- **Response:** Retrieve 200, Retrieve 200
- **Expected:** bookingStatus matches the expected lifecycle stage for the preceding action (record the actual observed string value as the regression baseline, since the full enumeration is UNKNOWN).
- **Actual:** V2 Retrieve bookingStatus after Book is "UnKnown" (expected a Booked/Confirmed value); V1 RetrieveBooking bookingStatus after Book is absent from the response
- **Status:** FAIL
- **Evidence:** FAIL: V2 Retrieve bookingStatus after Book is "UnKnown" (expected a Booked/Confirmed value) | FAIL: V1 RetrieveBooking bookingStatus after Book is absent from the response

  - **Hop 1 &mdash; V2 Retrieve (v2plain):** PASS &mdash; 200 pnr CTMKHI (0.6s)
  - **Hop 2 &mdash; V1 Retrieve (v1plain):** PASS &mdash; 200 pnr D53E4A (0.8s)

### TC-AIBK-DATA-01 — PASS

- **Test Case:** [Book][Retrieve] Verify every passenger field sent at AddPassenger (name, title, birth date, gender, nationality, passport number, expiry) is echoed unchanged in Book and Retrieve.
- **Category:** Integration
- **Endpoint Name:** Book/Retrieve passenger echo
- **Request:** 3 call(s): V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Passenger data in the Book and Retrieve responses equals what was submitted, for all four passengers
- **Actual:** all passenger fields equal in Book and Retrieve
- **Status:** PASS
- **Evidence:** OK: all passenger fields equal in Book and Retrieve

  - **Hop 1 &mdash; V2 AddPassenger (v2plain):** PASS &mdash; 200 {"offerId":"d1dee18f-db41-4e6a-b675-aac1c553e67d&amp;yAvAY9IAAIp7/CaTmZGW2ZRTVmhfTVRneE1YNGdmbjVFUlV4X01USXZNVGd2T... (1.9s)
  - **Hop 2 &mdash; V2 Book (v2plain):** PASS &mdash; 200 pnr CTMKHI (1.4s)
  - **Hop 3 &mdash; V2 Retrieve (v2plain):** PASS &mdash; 200 pnr CTMKHI (0.6s)

### TC-RETRIEVE-VAL-01 — FAIL

- **Test Case:** [Retrieve][Response] Validate bookingStatus is one of the currently-known set, or flagged as a newly-observed value rather than hard-failed.
- **Category:** Validation
- **Endpoint Name:** RETRIEVE
- **Request:** 2 call(s): V1 Retrieve &gt; V2 Retrieve
- **Response:** Retrieve 200, Retrieve 200
- **Expected:** No full enumeration exists yet (UNKNOWN per section 8.3) -- this is a first-round exploratory priority; every distinct value observed must be recorded and fed back into SPEC.md's living-document update process rather than hard-failing on an unrecognized value.
- **Actual:** V1 Retrieve carries a bookingStatus field (absent)
- **Status:** FAIL
- **Evidence:** OK: recorded V2 bookingStatus "UnKnown" for freshly booked PNRs (no hard fail on an unrecognised value) | FAIL: V1 Retrieve carries a bookingStatus field (absent)

  - **Hop 1 &mdash; V2 Retrieve (v2plain):** PASS &mdash; 200 pnr CTMKHI (0.6s)
  - **Hop 2 &mdash; V1 Retrieve (v1plain):** PASS &mdash; 200 pnr D53E4A (0.8s)

### TC-AIBK-DATA-02 — PASS

- **Test Case:** [Book][Retrieve] Verify the contact details sent at AddPassenger (email, phone, address) appear unchanged in Book and Retrieve.
- **Category:** Integration
- **Endpoint Name:** Book/Retrieve contact echo
- **Request:** 2 call(s): V2 Book &gt; V2 Retrieve
- **Response:** Book 200, Retrieve 200
- **Expected:** contacts in Book and Retrieve equal contactsList
- **Actual:** Book email ndc.qa.ai@gmail.com; Book phone 01001005747258; Retrieve email ndc.qa.ai@gmail.com; Retrieve phone 01001005747258
- **Status:** PASS
- **Evidence:** OK: Book email ndc.qa.ai@gmail.com | OK: Book phone 01001005747258 | OK: Retrieve email ndc.qa.ai@gmail.com | OK: Retrieve phone 01001005747258

  - **Hop 1 &mdash; V2 Book (v2plain):** PASS &mdash; 200 pnr CTMKHI (1.4s)
  - **Hop 2 &mdash; V2 Retrieve (v2plain):** PASS &mdash; 200 pnr CTMKHI (0.6s)

### TC-AIBK-DATA-03 — PASS

- **Test Case:** [Search][Book] Verify the booked itinerary (flight numbers, airports, times, carriers) equals the offer that was searched and confirmed.
- **Category:** Integration
- **Endpoint Name:** Book itinerary integrity
- **Request:** 2 call(s): V2 Search &gt; V2 Book
- **Response:** Search 200, Book 200
- **Expected:** Every flight segment in the Book response matches the Search offer segment for segment
- **Actual:** segments 2 vs searched 2; all searched segments present with identical times and flight numbers
- **Status:** PASS
- **Evidence:** OK: segments 2 vs searched 2 | OK: all searched segments present with identical times and flight numbers

  - **Hop 1 &mdash; V2 Search (rich):** PASS &mdash; 200 offers=56 (13.1s)
  - **Hop 2 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-AIBK-DATA-05 — FAIL

- **Test Case:** [Search][Book] Verify tax code naming is consistent across Search, FareConfirm and Book (same tax, same code).
- **Category:** Regression
- **Endpoint Name:** Tax code taxonomy
- **Request:** 3 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, Book 200
- **Expected:** The same code vocabulary is used for taxesAndFees at Search, FareConfirm and Book
- **Actual:** Search codes [3,5] vs FareConfirm [CGST,CUTE,IN,P2,PN,RCS,SGST,YQ]; Search/FareConfirm codes [3,5] vs Book codes [CGST,CUTE,IN,P2,PN,RCS,SGST,YQ]
- **Status:** FAIL
- **Evidence:** FAIL: Search codes [3,5] vs FareConfirm [CGST,CUTE,IN,P2,PN,RCS,SGST,YQ] | FAIL: Search/FareConfirm codes [3,5] vs Book codes [CGST,CUTE,IN,P2,PN,RCS,SGST,YQ]

  - **Hop 1 &mdash; V2 Search (v2plain):** PASS &mdash; 200 offers=100 (15.5s)
  - **Hop 2 &mdash; V2 FareConfirm (v2plain):** PASS &mdash; 200 {"responseId":"0b8f2dd9-b71b-473b-9434-d5398b7e6172","supplier":"AirIndia","journeys":{"SVh_MTgxMX4gfn5ERUx_MT... (1.5s)
  - **Hop 3 &mdash; V2 Book (v2plain):** PASS &mdash; 200 pnr CTMKHI (1.4s)

### TC-AIBK-DATA-07 — FAIL

- **Test Case:** [Book] Verify the Book response is complete: creationDate, tickets, emdTickets, voidCapability and gdsPNR are populated for a confirmed booking.
- **Category:** Business Rule
- **Endpoint Name:** Book response completeness
- **Request:** 1 call(s): V2 Book
- **Response:** Book 200
- **Expected:** creationDate, ticketing data, voidCapability and gdsPNR are present in the Book response for a booked PNR
- **Actual:** creationDate missing; gdsPNR empty; voidCapability missing; tickets {}, emdTickets {} (extras paid for but no EMD, no ticket)
- **Status:** FAIL
- **Evidence:** FAIL: creationDate missing | FAIL: gdsPNR empty | FAIL: voidCapability missing | FAIL: tickets {}, emdTickets {} (extras paid for but no EMD, no ticket)

  - **Hop 1 &mdash; V2 Book (rich):** PASS &mdash; 200 pnr NSGQXB (6.9s)

### TC-AIBK-DATA-08 — PASS

- **Test Case:** [Book][Retrieve] Verify the free-text diRemarks field returned by Book and Retrieve is human-readable and contains no internal or sensitive data.
- **Category:** Security
- **Endpoint Name:** Book diRemarks
- **Request:** 2 call(s): V2 Book &gt; V2 Retrieve
- **Response:** Book 200, Retrieve 200
- **Expected:** diRemarks is null or readable booking remarks; no credentials, tokens or internal ids
- **Actual:** no credential-like words in diRemarks; diRemarks observed: []
- **Status:** PASS
- **Evidence:** OK: no credential-like words in diRemarks | OK: diRemarks observed: []

  - **Hop 1 &mdash; V2 Book (v2plain):** PASS &mdash; 200 pnr CTMKHI (1.4s)
  - **Hop 2 &mdash; V2 Retrieve (v2plain):** PASS &mdash; 200 pnr CTMKHI (0.6s)

### TC-AIBK-DATA-06 — FAIL

- **Test Case:** [Retrieve] Verify two Retrieve calls on the same PNR return identical bookings (idempotent read).
- **Category:** Regression
- **Endpoint Name:** Retrieve
- **Request:** 2 call(s): V2 Retrieve
- **Response:** Retrieve 200, Retrieve 200
- **Expected:** The second Retrieve equals the first in status, price, passengers and selections
- **Actual:** V2 Retrieve: second Retrieve differs from the first
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Retrieve (rr1):** PASS &mdash; 200 pnr NSGQXB (1.8s)
  - **Hop 2 &mdash; V2 Retrieve (rr2):** FAIL &mdash; 200 pnr NSGQXB (7.3s)

### TC-VERSIONDIFF-VAL-04 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Validate refundability values are constrained to the currently-known set (the literal 'UnKnown' value observed, unusual capitalization) or flagged if a new value appears.
- **Category:** Validation
- **Endpoint Name:** VERSIONDIFF
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every observed value matches the known literal 'UnKnown' (exact casing) or is logged-and-flagged as a newly-observed value rather than hard-failed.
- **Actual:** refundability values observed: "UnKnown" (only the literal "UnKnown" is expected)
- **Status:** PASS
- **Evidence:** OK: refundability values observed: "UnKnown" (only the literal "UnKnown" is expected)

### TC-VERSIONDIFF-VAL-05 — PASS

- **Test Case:** [Book]&amp;[Hold] [Request] Validate documentType values within passengersList are constrained to the currently-known set ('PASSPORT' observed) or flagged if a new value appears.
- **Category:** Validation
- **Endpoint Name:** VERSIONDIFF
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every observed value matches 'PASSPORT' or is logged-and-flagged as a newly-observed value; likely supplier-dependent (GDS vs LCC document requirements differ) so a new value should not be hard-failed.
- **Actual:** documentType values sent/accepted by V1 Book: PASSPORT
- **Status:** PASS
- **Evidence:** OK: documentType values sent/accepted by V1 Book: PASSPORT

### TC-BOOK-BIZ-02 — BLOCKED

- **Test Case:** [Book] [Response] Verify Book against a commercially-blacklisted LCC supplier (FlyDubai) is blocked at the business layer.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Book is expected to be blocked specifically because FlyDubai is commercially blacklisted (SPEC section 4.3 LCC blacklist, section 1.8: a supplier can be technically reachable while being commercially blacklisted for booking), even though Search/FareConfirm succeed. SPEC section 7.10 calls this out explicitly: confirm it is blocked at the business layer, not just left to fail downstream at the supplier. Exact status/error shape is UNKNOWN -- confirm live and record whether the block happens at Book itself or is left to the supplier to reject.
- **Actual:** Out of scope: the V1 row books against FlyDubai; this run sends nothing to any supplier except AirIndia.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BOOK-NEG-03 — BLOCKED

- **Test Case:** [Book] [Response] Validate Book against GLC, an NDC supplier conditionally blacklisted (per request, inform us first before issuing any ticket), surfaces the conditional-block policy rather than ticketing silently.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** Not sent
- **Response:** n/a
- **Expected:** GLC is not an outright blacklist like FlyDubai -- SPEC section 4.3 marks it conditional-not-outright-blacklisted. Expected result is UNKNOWN pending live confirmation of exactly how this conditional policy is technically enforced (if at all) by the API layer versus being a purely off-system process control (team must inform the airline manually) -- confirm live whether Book technically succeeds (with the process control living outside the API) or is technically blocked, and record the finding back into SPEC section 4.3/7.10.
- **Actual:** Out of scope: the V1 row books against GLC; this run sends nothing to any supplier except AirIndia.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BOOK-SEC-01 — FAIL

- **Test Case:** [Book][Request] Verify a Book call against a commercially blacklisted supplier/airline is blocked at the business layer.
- **Category:** Security
- **Endpoint Name:** BOOK
- **Request:** 1 call(s): V2 Book
- **Response:** Book 200
- **Expected:** Blocked/rejected at the business layer even though technically reachable through Search/FareConfirm; exact rejection mechanism UNKNOWN, confirm live. GLC specifically requires 'inform us first before issuing any ticket' rather than an outright block -- do not treat it identically to the outright-blacklisted suppliers.
- **Actual:** AirIndia is listed as commercially blacklisted (SPEC 4.3) yet Book succeeded: PNR CTMKHI (non-production host; the business-layer block is not enforced here)
- **Status:** FAIL
- **Evidence:** FAIL: AirIndia is listed as commercially blacklisted (SPEC 4.3) yet Book succeeded: PNR CTMKHI (non-production host; the business-layer block is not enforced here)

  - **Hop 1 &mdash; V2 Book (v2plain):** PASS &mdash; 200 pnr CTMKHI (1.4s)

### TC-AIEGY-RET-02 — FAIL

- **Test Case:** [Retrieve][Regression] Verify V1 and V2 Retrieve return the same booking data for the same PNR (cross-version Retrieve).
- **Category:** Regression
- **Endpoint Name:** RETRIEVE
- **Request:** 2 call(s): V1 Retrieve &gt; V2 Retrieve
- **Response:** Retrieve 500, Retrieve 200
- **Expected:** Both versions return the same booking facts.
- **Actual:** V1 Retrieve: V1 Retrieve of the V2 PNR CTMKHI: 500 ServerError "Unknown error occured. Please keep the transaction id as a reference.", total undefined vs Book 25941
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Retrieve (xver):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (13.5s)
  - **Hop 2 &mdash; V2 Retrieve (xver):** PASS &mdash; 200 pnr D53E4A (0.7s)

### TC-AIBK-DATA-04 — PASS

- **Test Case:** [FareConfirm][Book] Verify taxes and fees shown at FareConfirm are all still present, with identical amounts, in the Book response on an international booking (DEL-SHJ).
- **Category:** Business Rule
- **Endpoint Name:** Book price continuity
- **Request:** 2 call(s): V2 FareConfirm &gt; V2 Book
- **Response:** FareConfirm 200, Book 200
- **Expected:** Book total, tax total and the tax-code list equal FareConfirm for the same passengers and fare (no tax dropped, no price change)
- **Actual:** Book total 32754 vs FareConfirm 32754; Book totalTaxAmount 16274 vs FareConfirm 16274; all tax codes carried over; Book rows reconcile
- **Status:** PASS
- **Evidence:** OK: Book total 32754 vs FareConfirm 32754 | OK: Book totalTaxAmount 16274 vs FareConfirm 16274 | OK: all tax codes carried over | OK: Book rows reconcile

  - **Hop 1 &mdash; V2 FareConfirm (intl):** PASS &mdash; 200 {"responseId":"064290f0-debb-44fa-9ddc-329a991ca807","supplier":"AirIndia","journeys":{"SVh_IDEzNX4gfn5ERUx_MD... (1.2s)
  - **Hop 2 &mdash; V2 Book (intl):** PASS &mdash; 200 pnr V3G7FZ (2.3s)

### TC-VERSIONDIFF-VAL-03 — FAIL

- **Test Case:** [Book]&amp;[Void] [Response] Validate voidCapability values are constrained to the currently-known set ('VoidNotAllowed' observed) or flagged if a new value appears.
- **Category:** Validation
- **Endpoint Name:** VERSIONDIFF
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every observed value is either the known 'VoidNotAllowed' or a newly-logged-and-flagged value, never a hard test failure on an unrecognized-but-possibly-valid value.
- **Actual:** voidCapability on 0 of 4 Book responses (values [null,null,null,null])
- **Status:** FAIL
- **Evidence:** FAIL: voidCapability on 0 of 4 Book responses (values [null,null,null,null])

### TC-SEATMAP-VAL-03 — PASS

- **Test Case:** [SeatMap][Response] Verify the cellID value in cellDetails.cellID round-trips correctly into Book's passengersSelectedSeats.setSegmentsSeats.cellId (casing differs: cellID vs cellId).
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 2 call(s): V2 GetSeatMap &gt; V2 Book
- **Response:** GetSeatMap 200, Book 200
- **Expected:** Book accepts the token despite the field-name casing difference between the response (cellID) and the request (cellId) and attaches the correct seat, echoed back in the response's passengersSelectedSeats/selectedOffer.passengerFareBreakdown[].passengerSeats.
- **Actual:** seat accepted and echoed; cellCode round-trips: selected Pax1 seg0 1D (AvailablePaid) @1780, echoed 1D
- **Status:** PASS
- **Evidence:** OK: seat accepted and echoed | OK: cellCode round-trips: selected Pax1 seg0 1D (AvailablePaid) @1780, echoed 1D

  - **Hop 1 &mdash; V2 GetSeatMap (seat1):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"8b03e337-1714-42bd-a60b-39baa9e4ab98&amp;yApVY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGd... (1.1s)
  - **Hop 2 &mdash; V2 Book (seat1):** PASS &mdash; 200 pnr MYI9GR (1.8s)

### TC-SEATMAP-POS-01 — PASS

- **Test Case:** [GetSeatMap][Response] Verify the seat map is returned for a seat-map-capable offer.
- **Category:** Positive
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** HTTP 200; response includes seatMapDetails per segment with rows/cells; no collection variables are auto-captured - the chosen cellCode must be manually recorded for the next Book/Hold step.
- **Actual:** HTTP 200; supplier AirIndia; flightSegments present; passengersDetails lists 4 passengers
- **Status:** PASS
- **Evidence:** OK: HTTP 200 | OK: supplier AirIndia | OK: flightSegments present | OK: passengersDetails lists 4 passengers | OK: seatMapDetails has 1 segment map(s) for 1 flight segment(s)

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-POS-02 — FAIL

- **Test Case:** [SeatMap][Response] Verify GetSeatMap now sets getSeatMapOfferId and getSeatMapResponceID collection variables and that Book consumes them as its ResponseId/selectedOfferId when SeatMap precedes it.
- **Category:** Positive
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** GetSeatMap returns HTTP 200 with a non-empty offerId/responseId; the collection variables getSeatMapOfferId and getSeatMapResponceID (note the collection's own "Responce" spelling) are populated from these; Book accepts them and returns pnr/bookingToken/gdsPNR without needing AddPassenger's IDs re-sent -- this is a behavior change from before 2026-08-10, when GetSeatMap set no variables at all and Book still read AddPassenger's IDs.
- **Actual:** GetSeatMap responseId is 00000000-0000-0000-0000-000000000000 (the all-zero GUID, never a usable id)
- **Status:** FAIL
- **Evidence:** OK: GetSeatMap offerId present | FAIL: GetSeatMap responseId is 00000000-0000-0000-0000-000000000000 (the all-zero GUID, never a usable id)

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-BND-02 — FAIL

- **Test Case:** [SeatMap][Response] Verify cellAvailability/paxCellAvailability values are limited to AvailablePaid, Blocked, and Occupied, and that Aisle-category cells carry no seatPriceDetails.
- **Category:** Boundary
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Every cellCategory value observed is one of {Seat, Aisle}; every cellAvailability/paxCellAvailability value observed is one of {AvailablePaid, Blocked, Occupied}. If a new value appears (e.g. an "available free" state), log it and flag rather than hard-failing (§8.3 policy for UNKNOWN enumerations) -- do not assume the three known values are exhaustive.
- **Actual:** cellAvailability values observed: Blocked,AvailablePaid,AvailableFree - AvailableFree is outside the documented list (AvailableFree is a live value)
- **Status:** FAIL
- **Evidence:** FAIL: cellAvailability values observed: Blocked,AvailablePaid,AvailableFree - AvailableFree is outside the documented list (AvailableFree is a live value) | OK: Aisle cells carry no cellDetails

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-BND-03 — PASS

- **Test Case:** [SeatMap][Response] Verify AvailableFree is accepted as a real cellAvailability value (confirmed via saved example) and confirm live whether AvailableAfterReservation is also real, beyond the four now-evidenced values (AvailablePaid, Blocked, Occupied, AvailableFree).
- **Category:** Boundary
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** CONFIRMED live for AvailableFree as of 2026-08-24 (see saved example above) -- update SPEC.md §2.7/§8.3's enum list to add AvailableFree to the observed set. AvailableAfterReservation remains UNKNOWN; if found, add with evidence, if never observed after a reasonably broad sample, record it as an unconfirmed QC-checklist-only candidate rather than promoting it.
- **Actual:** AvailableFree is a live value: 10 cells; AvailableAfterReservation observed: 0 cells (not offered by AirIndia)
- **Status:** PASS
- **Evidence:** OK: AvailableFree is a live value: 10 cells | OK: AvailableAfterReservation observed: 0 cells (not offered by AirIndia)

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-BIZ-02 — PASS

- **Test Case:** [SeatMap][Response] Verify seatPriceDetailsByPassenger.totalPrice reconciles to basePrice + taxesPrice for every priced cell.
- **Category:** Business Rule
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** totalPrice.amount == basePrice.amount + taxesPrice.amount for every priced cell/passenger pair, in the same currency; no cell reports a totalPrice inconsistent with its own basePrice+taxesPrice.
- **Actual:** totalPrice equals basePrice + taxesPrice on every priced cell
- **Status:** PASS
- **Evidence:** OK: totalPrice equals basePrice + taxesPrice on every priced cell

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-REG-02 — PASS

- **Test Case:** [SeatMap][Response] Verify seatMapDetails.&lt;segment&gt;.{cabinLayoutsByDeck, rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails}}} structure matches the fuller schema captured 2026-08-10, AND flag/tolerate the flat-columns supplier variant (no zones[]/zoneId) confirmed present in a saved example.
- **Category:** Regression
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Every OTHER key listed in SPEC.md §2.7 (rows[].{rowNumber,deck,cells[].{cellCategory,column,cellDetails.{cellID,cellCode,cellAvailability,name,description,seatPriceDetails,seatPriceDetailsByPassenger,cellCharacteristics}}}) is present and correctly typed. The cabinLayoutsByDeck/zoneId shape is now confirmed to vary by supplier -- do NOT hard-fail a response for lacking zones[]/zoneId if it instead provides the flat columns[] array (AirArabia-confirmed variant); do NOT hard-fail a response for lacking the flat columns[] array if it instead provides zones[]/zoneId. Treat presence of at least one of the two shapes as passing, and log which shape each supplier uses.
- **Actual:** cabinLayoutsByDeck, rows[] and cells[] carry the documented fields
- **Status:** PASS
- **Evidence:** OK: cabinLayoutsByDeck, rows[] and cells[] carry the documented fields

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-VAL-05 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCharacteristics.description text is consistent with its own padisCode across a full seatMapDetails response.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertion: for every padisCode value observed, description must not contradict the code's known meaning per the now-sourced canonical reference table. Codes still outside that table should be rare -- log any such pairing rather than asserting pass/fail.
- **Actual:** each of 4 padisCodes (L,W,A,IE) has one consistent description
- **Status:** PASS
- **Evidence:** OK: each of 4 padisCodes (L,W,A,IE) has one consistent description

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-VAL-06 — PASS

- **Test Case:** [SeatMap][Response] Verify every Aisle-category cell has column=null and cellDetails=null, and every Seat-category cell has both populated.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertion: cellCategory=Aisle implies column is null AND cellDetails is null; cellCategory=Seat implies column is non-null AND cellDetails is a populated object (per TC-SEATMAP-REG-02's field list). No cell violates this partition.
- **Actual:** 0 Aisle cells with a column or cellDetails; 0 Seat cells missing a column or cellDetails
- **Status:** PASS
- **Evidence:** OK: 0 Aisle cells with a column or cellDetails | OK: 0 Seat cells missing a column or cellDetails

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-VAL-08 — FAIL

- **Test Case:** [SeatMap][Response] Verify seatPriceDetails/seatPriceDetailsByPassenger is populated (non-null) for every AvailablePaid cell and null/absent for every Blocked or Occupied cell.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertion: every AvailablePaid cell has a non-null seatPriceDetailsByPassenger with populated totalPrice/basePrice/taxesPrice per passenger (cross-ref TC-SEATMAP-BIZ-02's reconciliation); every Blocked/Occupied cell has seatPriceDetails null (consistent with SPEC.md §2.7's observed example, which shows seatPriceDetails: null on a Blocked cell).
- **Actual:** 12 cells where price presence does not match availability, e.g. 13A:Blocked,13B:Blocked,13C:Blocked
- **Status:** FAIL
- **Evidence:** FAIL: 12 cells where price presence does not match availability, e.g. 13A:Blocked,13B:Blocked,13C:Blocked

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-VAL-09 — PASS

- **Test Case:** [SeatMap][Response] Verify cellCode is unique across all cells within one flight segment's seatMapDetails.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertion: no cellCode value repeats within the same segment. A duplicate seat code is a confirmed defect (SeatMap QC Execution Checklist.md §9's "Duplicate seat code" possible-bug), not an UNKNOWN.
- **Actual:** cellCode is unique within each segment
- **Status:** PASS
- **Evidence:** OK: cellCode is unique within each segment

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-VAL-10 — PASS

- **Test Case:** [SeatMap][Response] Verify structural uniqueness and domain constraints across decks/zones/rows/columns: rowNumber unique within a segment, zoneId unique within a deck, column values restricted to {A,B,C,D,E,F,null}.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertion: no rowNumber repeats within the segment; no zoneId repeats within the same deck; every non-null column value is one of A/B/C/D/E/F (per the observed 6-column-per-row layout, SPEC.md §2.7); null column values correspond only to Aisle-category cells (cross-ref TC-SEATMAP-VAL-06).
- **Actual:** rowNumber unique per segment and columns unique per row
- **Status:** PASS
- **Evidence:** OK: rowNumber unique per segment and columns unique per row

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-VAL-11 — PASS

- **Test Case:** [SeatMap][Response] Verify passengersSeatMapAvailability.&lt;paxRef&gt;.&lt;segmentRefId&gt; (the top-level per-passenger allow-list of cellCodes) stays internally consistent with per-cell seatPriceDetailsByPassenger entries, and verify segment-ref keys are used with consistent casing throughout the response.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertions: (1) every segmentRefId key under passengersSeatMapAvailability.&lt;paxRef&gt; matches the casing used elsewhere in the same response (flightSegments/seatMapDetails keys) -- a differently-cased key for the same logical segment (e.g. "Seg3" vs "SEG1"/"SEG2") is a confirmed defect, not an acceptable variation; (2) every cellCode listed in a passenger's allow-list corresponds to a real cell in that segment's seatMapDetails.
- **Actual:** passengersSeatMapAvailability agrees with each cell's per-passenger availability
- **Status:** PASS
- **Evidence:** OK: passengersSeatMapAvailability agrees with each cell's per-passenger availability

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-BIZ-03 — PASS

- **Test Case:** [SeatMap][Response] Verify overall cellAvailability and per-passenger seatPriceDetailsByPassenger entries are independently reported, may legitimately differ for the same cell, and are NOT required to list every passenger on the offer.
- **Category:** Business Rule
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertion (structural, not value-equality, and NOT a completeness requirement): a passenger's absence from a cell's seatPriceDetailsByPassenger is EXPECTED and valid whenever that passenger is not eligible for that cell (confirmed pattern: a CHD/INF passenger restricted from a forward/exit cell won't appear there, per this same example's passengersSeatMapAvailability showing PAX3/PAX4 with a much shorter or empty allow-list than PAX1/PAX2). Do NOT assert every passenger must appear per priced cell -- only assert internal consistency: a passenger listed in seatPriceDetailsByPassenger for a cell SHOULD also have that cell's cellCode present in their own passengersSeatMapAvailability entry (if that top-level structure is present in the response). Do not assert cellAvailability == a per-passenger equivalent for all passengers either, since SeatMap QC Execution Checklist.md §11 explicitly notes these may differ legitimately (e.g. a seat blocked for one passenger type but not another).
- **Actual:** 0 cells report a passenger-level availability different from the cell's overall availability (allowed by design)
- **Status:** PASS
- **Evidence:** OK: 0 cells report a passenger-level availability different from the cell's overall availability (allowed by design)

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-BND-04 — PASS

- **Test Case:** [SeatMap][Response] Confirm live whether any cellCategory value beyond {Seat, Aisle} (e.g. Lavatory/Bathroom, Bulkhead, Galley, Closet, ExitRow, StairsToUpperDeck, WingBox, StorageBin, RestrictedZone, NoSeat, Other, per the full backend enum) is ever returned.
- **Category:** Boundary
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** UNKNOWN -- resolve empirically. Only Seat and Aisle are confirmed as of 2026-08-24; every other member (including whichever name -- Lavatory or Bathroom -- the bathroom-equivalent category actually uses live) remains unconfirmed. Do not assume Seat/Aisle are exhaustive, and do not assume the C# enum's member names match what the API actually serializes (the Lavatory-vs-Bathroom naming discrepancy between the raw example's comment and the enum source must be resolved live, not guessed).
- **Actual:** cellCategory values observed: Seat,Aisle (no lavatory, galley or bulkhead markers)
- **Status:** PASS
- **Evidence:** OK: cellCategory values observed: Seat,Aisle (no lavatory, galley or bulkhead markers)

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-VAL-07 — PASS

- **Test Case:** [SeatMap][Response] Verify seat attributes relevant to customer-facing seat selection (window, aisle, extra legroom/exit row) are programmatically derivable from cellCharacteristics for every Seat-category cell.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 200
- **Expected:** Automatable assertion: for codes present in the now-sourced canonical reference table (NDC_Integration/Resources/SeatResources/PadisSeatCharacteristic.md), the derived classification must not contradict column position or description text. Codes outside that table are logged, not failed.
- **Actual:** window (W: 60) and extra-legroom (L: 38) seats are derivable from cellCharacteristics; codes seen: L,W,A,IE; exit-row marker: no padis code E in this map
- **Status:** PASS
- **Evidence:** OK: window (W: 60) and extra-legroom (L: 38) seats are derivable from cellCharacteristics; codes seen: L,W,A,IE | OK: exit-row marker: no padis code E in this map

  - **Hop 1 &mdash; V2 GetSeatMap (sm):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"dc7a57fb-6987-4a34-ac81-0362d52be47a&amp;yAqWY9IAAEdX/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)

### TC-SEATMAP-INT-02 — BLOCKED

- **Test Case:** [SeatMap][Response] Verify GetSeatMap returns a structurally identical normalized response shape across suppliers using different native backend protocols.
- **Category:** Integration
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: every supplier's GetSeatMap response conforms to the identical schema documented in SPEC.md §2.7 (same top-level keys, same seatMapDetails/cellDetails nesting) regardless of the supplier's native protocol -- differences are limited to data values (cellCode ranges, characteristics, pricing), never to the shape itself. A supplier whose response requires a materially different assertion path is a normalization defect in the supplier-adapter layer (§1.3), not an acceptable per-supplier variation.
- **Actual:** Out of scope: the row compares or sweeps several suppliers; this run sends nothing to any supplier except AirIndia.
- **Status:** BLOCKED
- **Evidence:** 

### TC-SEATMAP-INT-03 — BLOCKED

- **Test Case:** [SeatMap][Response] Capability-matrix sweep -- run GetSeatMap against every supplier confirmed or plausibly SeatMap-capable per SPEC.md §4.6, and record pass/fail per supplier.
- **Category:** Integration
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Every confirmed-capable supplier's GetSeatMap call succeeds with a populated seatMapDetails; every explicitly-not-capable supplier is expected to fail gracefully (cross-ref TC-SEATMAP-NEG-01's pattern) rather than silently succeed with an empty response. Build/maintain the resulting per-supplier pass/fail table as a living artifact alongside SPEC.md §4.6.
- **Actual:** Out of scope: the row compares or sweeps several suppliers; this run sends nothing to any supplier except AirIndia.
- **Status:** BLOCKED
- **Evidence:** 

### TC-SEATMAP-SEC-02 — BLOCKED

- **Test Case:** [SeatMap][Documentation] Record that supplier-side authentication security (this API's own credentials presented to the airline/GDS backend) and request/response logging are not independently verifiable through this API's black-box contract, and identify the correct verification channel for each.
- **Category:** Security
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** This case does not assert a pass/fail against the live API. It documents that: (a) User Story AC8's "securely authenticates with airline supplier APIs" describes THIS system's outbound credential handling toward suppliers -- a server-side/config concern, confirmable only via a backend credential-storage/config audit or the automation framework's own code review (PRD §7's Gap #1 already flags this as hardcoded tech debt), not via any request this Postman-collection-driven suite can send; (b) AC9's "provides logging" is confirmable only via log/observability review (PRD §7's ApiResponse logger, correlation-ID tracing), not via API response inspection. TC-SEATMAP-NEG-05 covers AC9's "handles errors gracefully" half, which IS API-observable.
- **Actual:** Not testable through the API: supplier-side authentication and log redaction are internal; the only visible leak (supplier credentials in isdebug/error bodies) is covered by the security rows.
- **Status:** BLOCKED
- **Evidence:** 

### TC-AIBK-DATA-09 — PASS

- **Test Case:** [Search][Book] Verify V1 and V2 return the same price for the same itinerary and passengers end to end (cross-version price parity).
- **Category:** Regression
- **Endpoint Name:** V1 vs V2 price parity
- **Request:** 10 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve &gt; V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200, Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Same route/date/passengers: V1 and V2 Search and Book totals are equal
- **Actual:** All 10 calls matched: PNR W4ZNJJ; total 11082; reconciled; 2 passengers echoed | Retrieve matches Book (pnr, token, total 11082, 2 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (parity):** PASS &mdash; 200 offers=97 (13.3s)
  - **Hop 2 &mdash; V2 FareConfirm (parity):** PASS &mdash; 200 {"responseId":"87636d8e-6302-48c6-a33d-e83995ac1ba9","supplier":"AirIndia","journeys":{"SVh_Mjg5Mn4gfn5CTFJ_MD... (1.2s)
  - **Hop 3 &mdash; V2 AddPassenger (parity):** PASS &mdash; 200 {"offerId":"b02e6d2b-6232-48dd-ae82-ea1f4b830a1b&amp;yAscY9IAAIZZ/SWTmZGW2ZRTVmhfTWpnNU1uNGdmbjVDVEZKX01ERXZNRGd2T... (1.8s)
  - **Hop 4 &mdash; V2 Book (parity):** PASS &mdash; 200 pnr YUNZVL (2.8s)
  - **Hop 5 &mdash; V2 Retrieve (parity):** PASS &mdash; 200 pnr YUNZVL (0.7s)
  - **Hop 6 &mdash; V1 Search (parity):** PASS &mdash; 200 offers=97 (4.5s)
  - **Hop 7 &mdash; V1 FareConfirm (parity):** PASS &mdash; 200 {"responseId":"1658d16c-f76f-4487-a0c8-ff1add1caca8","supplier":"AirIndia","journeys":{"SVh_Mjg5Mn4gfn5CTFJ_MD... (1.2s)
  - **Hop 8 &mdash; V1 GetOfferBundles (parity):** PASS &mdash; 200 {"offerJourneys":{"SVh_Mjg5Mn4gfn5CTFJ_MDEvMDgvMjAyNyAwOToxMH5JWEJ_MDEvMDgvMjAyNyAxMjowNX5_XklYfjEwODB_IH5_SVh... (2.9s)
  - **Hop 9 &mdash; V1 Book (parity):** PASS &mdash; 200 pnr W4ZNJJ (3.7s)
  - **Hop 10 &mdash; V1 Retrieve (parity):** PASS &mdash; 200 pnr W4ZNJJ (7.0s)

### TC-SEATMAP-SEC-01 — PASS

- **Test Case:** [SeatMap][Request] Apply the three universal caller-facing security checks (invalid x-api-key, invalid Client-Id, cross-tenant supplier/credentialsSelector) to GetSeatMap.
- **Category:** Security
- **Endpoint Name:** SEATMAP
- **Request:** 3 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 401, GetSeatMap 401, GetSeatMap 400
- **Expected:** All three rejected (exact status/error shape UNKNOWN, confirm live and reuse whatever envelope the same three checks produce on other endpoints, §7.14, for consistency).
- **Actual:** All 3 calls matched: altered Client-Id: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header | ids issued under EGY replayed with selector UAE: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 GetSeatMap (badkey):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (2.3s)
  - **Hop 2 &mdash; V2 GetSeatMap (badclient):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 3 &mdash; V2 GetSeatMap (xtenant):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect (0.1s)

### TC-SEATMAP-BIZ-04 — PASS

- **Test Case:** [SeatMap][Response] Exploratory -- confirm GetSeatMap reflects real-time supplier inventory rather than a cached/stale snapshot.
- **Category:** Business Rule
- **Endpoint Name:** SEATMAP
- **Request:** 9 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200, Book 200, Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200
- **Expected:** GetSeatMap reflects real-time inventory: a seat just sold on a booking is no longer shown as available for the same flight
- **Actual:** All 9 calls matched: AddPassenger returned a new offerId + responseId | same flight re-searched; seat 3D booked in PNR XZU4KS now reports Occupied
- **Status:** PASS
- **Evidence:** seat double-sell check; same flight

  - **Hop 1 &mdash; V2 Search (rt1):** PASS &mdash; 200 offers=49 (3.9s)
  - **Hop 2 &mdash; V2 FareConfirm (rt1):** PASS &mdash; 200 {"responseId":"52e19446-e3f4-4600-b447-1d79d65c7cb2","supplier":"AirIndia","journeys":{"SVh_Mjk3NX4gfn5NQUF_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (rt1):** PASS &mdash; 200 {"offerId":"50f1ce63-090c-4bdc-be97-101aca5b66bf&amp;yApYY9IAAEY7/iaTmZGW2ZRTVmhfTWprM05YNGdmbjVOUVVGX01ERXZNVFF2T... (0.8s)
  - **Hop 4 &mdash; V2 GetSeatMap (rt1):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"50f1ce63-090c-4bdc-be97-101aca5b66bf&amp;yApYY9IAAEY7/iaTmZGW2ZRTVmhfTWprM05YNGd... (1.2s)
  - **Hop 5 &mdash; V2 Book (rt1):** PASS &mdash; 200 pnr XZU4KS (2.7s)
  - **Hop 6 &mdash; V2 Search (rt2):** PASS &mdash; 200 offers=49 (3.0s)
  - **Hop 7 &mdash; V2 FareConfirm (rt2):** PASS &mdash; 200 {"responseId":"a750374f-ab8b-4e08-83ee-f77392a23b50","supplier":"AirIndia","journeys":{"SVh_Mjk3NX4gfn5NQUF_MD... (1.1s)
  - **Hop 8 &mdash; V2 AddPassenger (rt2):** PASS &mdash; 200 {"offerId":"ef2f706a-eeef-4c5e-af5a-b7dc855e2010&amp;yApcY9IAAEY//iaTmZGW2ZRTVmhfTWprM05YNGdmbjVOUVVGX01ERXZNVFF2T... (0.6s)
  - **Hop 9 &mdash; V2 GetSeatMap (rt2):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"ef2f706a-eeef-4c5e-af5a-b7dc855e2010&amp;yApcY9IAAEY//iaTmZGW2ZRTVmhfTWprM05YNGd... (1.2s)

### TC-AIEGY-FARECONFIRM-NEG-01 — FAIL

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V1 FareConfirm &gt; V2 FareConfirm
- **Response:** FareConfirm 500, FareConfirm 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 FareConfirm: never-issued ids: SERVER ERROR 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1: never-issued ids -&gt; 500 (0.4s) | V2: never-issued ids -&gt; 400 (0.1s)

  - **Hop 1 &mdash; V1 FareConfirm (neg1_neverissuedids):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.4s)
  - **Hop 2 &mdash; V2 FareConfirm (neg1_neverissuedids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)

### TC-AIEGY-ADDPASSENGER-NEG-01 — PASS

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** ADDPAX
- **Request:** 1 call(s): V2 AddPassenger
- **Response:** AddPassenger 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** Matched: never-issued ids: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again.
- **Status:** PASS
- **Evidence:** V2: never-issued ids -&gt; 400 (0.1s)

  - **Hop 1 &mdash; V2 AddPassenger (neg1_neverissuedids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)

### TC-AIEGY-GETOFFERBUNDLES-NEG-01 — FAIL

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** BUNDLE
- **Request:** 2 call(s): V1 GetOfferBundles &gt; V2 GetOfferBundles
- **Response:** GetOfferBundles 500, GetOfferBundles 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 GetOfferBundles: never-issued ids: SERVER ERROR 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1: never-issued ids -&gt; 500 (0.4s) | V2: never-issued ids -&gt; 400 (1.4s)

  - **Hop 1 &mdash; V1 GetOfferBundles (neg1_neverissuedids):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.4s)
  - **Hop 2 &mdash; V2 GetOfferBundles (neg1_neverissuedids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (1.4s)

### TC-AIEGY-FARECONFIRM-NEG-03 — FAIL

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Negative
- **Endpoint Name:** FARECONFIRM
- **Request:** 16 call(s): V1 FareConfirm &gt; V2 FareConfirm
- **Response:** FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 500, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** V1 FareConfirm: selectedOfferId = 1000 characters: SERVER ERROR 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1: searchResponseId = null -&gt; 400 (0.3s) | searchResponseId = empty -&gt; 400 (0.3s) | searchResponseId = number 12345 -&gt; 400 (0.3s) | searchResponseId = 1000 characters -&gt; 400 (0.3s) | selectedOfferId = null -&gt; 400 (0.3s) | selectedOfferId = empty -&gt; 400 (0.3s) | selectedOfferId = number 12345 -&gt; 400 (0.3s) | selectedOfferId = 1000 characters -&gt; 500 (0.6s) | V2: ResponseId = null -&gt; 400 (1.4s) | ResponseId = empty -&gt; 400 (1.4s) | ResponseId = number 12345 -&gt; 400 (2.1s) | ResponseId = 1000 characters -&gt; 400 (2.1s) | selectedOfferId = null -&gt; 400 (2.1s) | selectedOfferId = empty -&gt; 400 (2.1s) | selectedOfferId = number 12345 -&gt; 400 (1.4s) | selectedOfferId = 1000 characters -&gt; 400 (1.4s)

  - **Hop 1 &mdash; V1 FareConfirm (neg3_searchResponseIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)
  - **Hop 2 &mdash; V1 FareConfirm (neg3_searchResponseIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)
  - **Hop 3 &mdash; V1 FareConfirm (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 4 &mdash; V1 FareConfirm (neg3_searchResponseIdnumber12):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)
  - **Hop 5 &mdash; V1 FareConfirm (neg3_searchResponseId1000char):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)
  - **Hop 6 &mdash; V1 FareConfirm (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 7 &mdash; V1 FareConfirm (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.3s)
  - **Hop 8 &mdash; V1 FareConfirm (neg3_selectedOfferId1000chara):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.6s)
  - **Hop 9 &mdash; V2 FareConfirm (neg3_ResponseIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (1.4s)
  - **Hop 10 &mdash; V2 FareConfirm (neg3_ResponseIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (1.4s)
  - **Hop 11 &mdash; V2 FareConfirm (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (2.1s)
  - **Hop 12 &mdash; V2 FareConfirm (neg3_ResponseId1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (2.1s)
  - **Hop 13 &mdash; V2 FareConfirm (neg3_ResponseIdnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (2.1s)
  - **Hop 14 &mdash; V2 FareConfirm (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (1.4s)
  - **Hop 15 &mdash; V2 FareConfirm (neg3_selectedOfferId1000chara):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (1.4s)
  - **Hop 16 &mdash; V2 FareConfirm (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (2.1s)

### TC-AIEGY-GETOFFERBUNDLES-NEG-03 — FAIL

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Negative
- **Endpoint Name:** BUNDLE
- **Request:** 16 call(s): V1 GetOfferBundles &gt; V2 GetOfferBundles
- **Response:** GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 500, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** V1 GetOfferBundles: selectedOfferId = 1000 characters: SERVER ERROR 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1: fareConfirmResponseId = null -&gt; 400 (0.5s) | fareConfirmResponseId = empty -&gt; 400 (0.4s) | fareConfirmResponseId = number 12345 -&gt; 400 (0.5s) | fareConfirmResponseId = 1000 characters -&gt; 400 (0.5s) | selectedOfferId = null -&gt; 400 (0.4s) | selectedOfferId = empty -&gt; 400 (0.4s) | selectedOfferId = number 12345 -&gt; 400 (0.4s) | selectedOfferId = 1000 characters -&gt; 500 (0.4s) | V2: ResponseId = null -&gt; 400 (2.5s) | ResponseId = empty -&gt; 400 (2.5s) | ResponseId = number 12345 -&gt; 400 (2.5s) | ResponseId = 1000 characters -&gt; 400 (2.6s) | selectedOfferId = null -&gt; 400 (2.0s) | selectedOfferId = empty -&gt; 400 (2.0s) | selectedOfferId = number 12345 -&gt; 400 (1.4s) | selectedOfferId = 1000 characters -&gt; 400 (2.1s)

  - **Hop 1 &mdash; V1 GetOfferBundles (neg3_fareConfirmResponseIdemp):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.4s)
  - **Hop 2 &mdash; V1 GetOfferBundles (neg3_fareConfirmResponseIdnul):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.5s)
  - **Hop 3 &mdash; V1 GetOfferBundles (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.4s)
  - **Hop 4 &mdash; V1 GetOfferBundles (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.4s)
  - **Hop 5 &mdash; V1 GetOfferBundles (neg3_fareConfirmResponseIdnum):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.5s)
  - **Hop 6 &mdash; V1 GetOfferBundles (neg3_fareConfirmResponseId100):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.5s)
  - **Hop 7 &mdash; V1 GetOfferBundles (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (0.4s)
  - **Hop 8 &mdash; V1 GetOfferBundles (neg3_selectedOfferId1000chara):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.4s)
  - **Hop 9 &mdash; V2 GetOfferBundles (neg3_ResponseIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (2.5s)
  - **Hop 10 &mdash; V2 GetOfferBundles (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (1.4s)
  - **Hop 11 &mdash; V2 GetOfferBundles (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (2.0s)
  - **Hop 12 &mdash; V2 GetOfferBundles (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (2.0s)
  - **Hop 13 &mdash; V2 GetOfferBundles (neg3_ResponseIdnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (2.5s)
  - **Hop 14 &mdash; V2 GetOfferBundles (neg3_ResponseIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (2.5s)
  - **Hop 15 &mdash; V2 GetOfferBundles (neg3_ResponseId1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The offerBundlesRequestDto field is required. (2.6s)
  - **Hop 16 &mdash; V2 GetOfferBundles (neg3_selectedOfferId1000chara):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (2.1s)

### TC-AIEGY-ADDPASSENGER-NEG-03 — PASS

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Negative
- **Endpoint Name:** ADDPAX
- **Request:** 8 call(s): V2 AddPassenger
- **Response:** AddPassenger 400, AddPassenger 400, AddPassenger 400, AddPassenger 400, AddPassenger 400, AddPassenger 400, AddPassenger 400, AddPassenger 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 calls matched: ResponseId = number 12345: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. | ResponseId = 1000 characters: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required.
- **Status:** PASS
- **Evidence:** V2: ResponseId = null -&gt; 400 (1.1s) | ResponseId = empty -&gt; 400 (1.1s) | ResponseId = number 12345 -&gt; 400 (1.1s) | ResponseId = 1000 characters -&gt; 400 (1.1s) | selectedOfferId = null -&gt; 400 (1.1s) | selectedOfferId = empty -&gt; 400 (1.1s) | selectedOfferId = number 12345 -&gt; 400 (1.1s) | selectedOfferId = 1000 characters -&gt; 400 (1.1s)

  - **Hop 1 &mdash; V2 AddPassenger (neg3_ResponseIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (1.1s)
  - **Hop 2 &mdash; V2 AddPassenger (neg3_ResponseIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (neg3_ResponseIdnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (1.1s)
  - **Hop 4 &mdash; V2 AddPassenger (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.1s)
  - **Hop 5 &mdash; V2 AddPassenger (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.1s)
  - **Hop 6 &mdash; V2 AddPassenger (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (1.1s)
  - **Hop 7 &mdash; V2 AddPassenger (neg3_ResponseId1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (1.1s)
  - **Hop 8 &mdash; V2 AddPassenger (neg3_selectedOfferId1000chara):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (1.1s)

### TC-AIEGY-GETANCILLARY-NEG-01 — PASS

- **Test Case:** [GetAncillary][Request] Validate GetAncillary rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** ANCILLARY
- **Request:** 1 call(s): V2 GetAncillary
- **Response:** GetAncillary 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** Matched: never-issued ids: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again.
- **Status:** PASS
- **Evidence:** V2: never-issued ids -&gt; 400 (1.1s)

  - **Hop 1 &mdash; V2 GetAncillary (neg1_neverissuedids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (1.1s)

### TC-AIEGY-ADDPASSENGER-NEG-02 — PASS

- **Test Case:** [AddPassenger][Request] Validate AddPassenger rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** ADDPAX
- **Request:** 6 call(s): V2 AddPassenger
- **Response:** AddPassenger 400, AddPassenger 400, AddPassenger 400, AddPassenger 400, AddPassenger 409, AddPassenger 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** All 6 calls matched: ResponseId omitted: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Duplicate contact type 'P' detected. | selectedOfferId omitted: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
- **Status:** PASS
- **Evidence:** V2: supplier omitted -&gt; 400 (0.1s) | credentialsSelector omitted -&gt; 400 (2.3s) | ResponseId omitted -&gt; 409 (2.7s) | selectedOfferId omitted -&gt; 400 (2.7s) | passengersList omitted -&gt; 400 (2.7s) | contactsList omitted -&gt; 400 (2.7s)

  - **Hop 1 &mdash; V2 AddPassenger (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V2 AddPassenger (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (2.3s)
  - **Hop 3 &mdash; V2 AddPassenger (neg2_ResponseIdomitted):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Duplicate contact type 'P' detected. (2.7s)
  - **Hop 4 &mdash; V2 AddPassenger (neg2_contactsListomitted):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference (2.7s)
  - **Hop 5 &mdash; V2 AddPassenger (neg2_passengersListomitted):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total adult passengers count must match the count of adults in the search request. (2.7s)
  - **Hop 6 &mdash; V2 AddPassenger (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (2.7s)

### TC-AIEGY-FARECONFIRM-NEG-02 — FAIL

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** FARECONFIRM
- **Request:** 8 call(s): V1 FareConfirm &gt; V2 FareConfirm
- **Response:** FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 200, FareConfirm 400, FareConfirm 400, FareConfirm 400, FareConfirm 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** V1 FareConfirm: searchResponseId omitted: ACCEPTED (200) 200 {"responseId":"57915bc2-325b-4ae9-bc1c-868776c554dd","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... | V2 FareConfirm: ResponseId omitted: ACCEPTED (200) 200 {"responseId":"19303fb8-67b5-408e-9172-1d41b725783b","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT...
- **Status:** FAIL
- **Evidence:** V1: supplier omitted -&gt; 400 (0.3s) | credentialsSelector omitted -&gt; 400 (0.3s) | searchResponseId omitted -&gt; 200 (1.8s) | selectedOfferId omitted -&gt; 400 (0.3s) | V2: supplier omitted -&gt; 400 (2.5s) | credentialsSelector omitted -&gt; 400 (2.1s) | ResponseId omitted -&gt; 200 (4.5s) | selectedOfferId omitted -&gt; 400 (2.1s)

  - **Hop 1 &mdash; V1 FareConfirm (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.3s)
  - **Hop 2 &mdash; V1 FareConfirm (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 3 &mdash; V1 FareConfirm (neg2_searchResponseIdomitted):** FAIL &mdash; 200 {"responseId":"57915bc2-325b-4ae9-bc1c-868776c554dd","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (1.8s)
  - **Hop 4 &mdash; V1 FareConfirm (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 5 &mdash; V2 FareConfirm (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (2.1s)
  - **Hop 6 &mdash; V2 FareConfirm (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (2.5s)
  - **Hop 7 &mdash; V2 FareConfirm (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (2.1s)
  - **Hop 8 &mdash; V2 FareConfirm (neg2_ResponseIdomitted):** FAIL &mdash; 200 {"responseId":"19303fb8-67b5-408e-9172-1d41b725783b","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (4.5s)

### TC-AIEGY-GETOFFERBUNDLES-NEG-02 — FAIL

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** BUNDLE
- **Request:** 8 call(s): V1 GetOfferBundles &gt; V2 GetOfferBundles
- **Response:** GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 200, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 400, GetOfferBundles 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** V1 GetOfferBundles: fareConfirmResponseId omitted: ACCEPTED (200) 200 {"offerJourneys":{"SVh_MTA2N34gfn5ERUx_MTIvMDkvMjAyNiAwNjoxMH5JWEJ_MTIvMDkvMjAyNiAwODoxNX5_XklYfjE1NDd_IH5_SVh... | V2 GetOfferBundles: ResponseId omitted: ACCEPTED (200) 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMTMvMjAyNiAxODoxMH5CT01_MTIvMTMvMjAyNiAyMDozMH5_":{"origin":"DEL","...
- **Status:** FAIL
- **Evidence:** V1: supplier omitted -&gt; 400 (0.4s) | credentialsSelector omitted -&gt; 400 (0.5s) | fareConfirmResponseId omitted -&gt; 200 (4.4s) | selectedOfferId omitted -&gt; 400 (0.3s) | V2: supplier omitted -&gt; 400 (2.0s) | credentialsSelector omitted -&gt; 400 (2.1s) | ResponseId omitted -&gt; 200 (5.0s) | selectedOfferId omitted -&gt; 400 (2.1s)

  - **Hop 1 &mdash; V1 GetOfferBundles (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.4s)
  - **Hop 2 &mdash; V1 GetOfferBundles (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.5s)
  - **Hop 3 &mdash; V1 GetOfferBundles (neg2_fareConfirmResponseIdomi):** FAIL &mdash; 200 {"offerJourneys":{"SVh_MTA2N34gfn5ERUx_MTIvMDkvMjAyNiAwNjoxMH5JWEJ_MTIvMDkvMjAyNiAwODoxNX5_XklYfjE1NDd_IH5_SVh... (4.4s)
  - **Hop 4 &mdash; V1 GetOfferBundles (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.3s)
  - **Hop 5 &mdash; V2 GetOfferBundles (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (2.0s)
  - **Hop 6 &mdash; V2 GetOfferBundles (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (2.1s)
  - **Hop 7 &mdash; V2 GetOfferBundles (neg2_ResponseIdomitted):** FAIL &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMTMvMjAyNiAxODoxMH5CT01_MTIvMTMvMjAyNiAyMDozMH5_":{"origin":"DEL","... (5.0s)
  - **Hop 8 &mdash; V2 GetOfferBundles (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (2.1s)

### TC-AIEGY-GETANCILLARY-NEG-03 — PASS

- **Test Case:** [GetAncillary][Request] Validate GetAncillary rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Negative
- **Endpoint Name:** ANCILLARY
- **Request:** 8 call(s): V2 GetAncillary
- **Response:** GetAncillary 400, GetAncillary 400, GetAncillary 400, GetAncillary 400, GetAncillary 400, GetAncillary 400, GetAncillary 400, GetAncillary 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 calls matched: ResponseId = null: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. | ResponseId = number 12345: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required.
- **Status:** PASS
- **Evidence:** V2: ResponseId = null -&gt; 400 (1.8s) | ResponseId = empty -&gt; 400 (1.3s) | ResponseId = number 12345 -&gt; 400 (1.8s) | ResponseId = 1000 characters -&gt; 400 (1.3s) | selectedOfferId = null -&gt; 400 (1.3s) | selectedOfferId = empty -&gt; 400 (1.3s) | selectedOfferId = number 12345 -&gt; 400 (1.3s) | selectedOfferId = 1000 characters -&gt; 400 (1.3s)

  - **Hop 1 &mdash; V2 GetAncillary (neg3_ResponseIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (1.8s)
  - **Hop 2 &mdash; V2 GetAncillary (neg3_ResponseIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (1.3s)
  - **Hop 3 &mdash; V2 GetAncillary (neg3_ResponseId1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (1.3s)
  - **Hop 4 &mdash; V2 GetAncillary (neg3_ResponseIdnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (1.8s)
  - **Hop 5 &mdash; V2 GetAncillary (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ancillaryRequestDto field is required. (1.3s)
  - **Hop 6 &mdash; V2 GetAncillary (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.3s)
  - **Hop 7 &mdash; V2 GetAncillary (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.3s)
  - **Hop 8 &mdash; V2 GetAncillary (neg3_selectedOfferId1000chara):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (1.3s)

### TC-AIEGY-GETSEATMAP-NEG-01 — PASS

- **Test Case:** [GetSeatMap][Request] Validate GetSeatMap rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** Matched: never-issued ids: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again.
- **Status:** PASS
- **Evidence:** V2: never-issued ids -&gt; 400 (1.7s)

  - **Hop 1 &mdash; V2 GetSeatMap (neg1_neverissuedids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (1.7s)

### TC-AIEGY-GETSEATMAP-NEG-03 — PASS

- **Test Case:** [GetSeatMap][Request] Validate GetSeatMap rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** 8 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 400, GetSeatMap 400, GetSeatMap 400, GetSeatMap 400, GetSeatMap 400, GetSeatMap 400, GetSeatMap 400, GetSeatMap 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** All 8 calls matched: selectedOfferId = 1000 characters: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. | selectedOfferId = empty: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required.
- **Status:** PASS
- **Evidence:** V2: ResponseId = null -&gt; 400 (1.2s) | ResponseId = empty -&gt; 400 (1.2s) | ResponseId = number 12345 -&gt; 400 (1.2s) | ResponseId = 1000 characters -&gt; 400 (1.2s) | selectedOfferId = null -&gt; 400 (1.2s) | selectedOfferId = empty -&gt; 400 (1.2s) | selectedOfferId = number 12345 -&gt; 400 (1.2s) | selectedOfferId = 1000 characters -&gt; 400 (1.2s)

  - **Hop 1 &mdash; V2 GetSeatMap (neg3_ResponseIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (1.2s)
  - **Hop 2 &mdash; V2 GetSeatMap (neg3_ResponseIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (1.2s)
  - **Hop 3 &mdash; V2 GetSeatMap (neg3_ResponseIdnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (1.2s)
  - **Hop 4 &mdash; V2 GetSeatMap (neg3_ResponseId1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (1.2s)
  - **Hop 5 &mdash; V2 GetSeatMap (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SeatMapRequestDto field is required. (1.2s)
  - **Hop 6 &mdash; V2 GetSeatMap (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.2s)
  - **Hop 7 &mdash; V2 GetSeatMap (neg3_selectedOfferId1000chara):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (1.2s)
  - **Hop 8 &mdash; V2 GetSeatMap (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.2s)

### TC-AIEGY-GETANCILLARY-NEG-02 — FAIL

- **Test Case:** [GetAncillary][Request] Validate GetAncillary rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** ANCILLARY
- **Request:** 4 call(s): V2 GetAncillary
- **Response:** GetAncillary 400, GetAncillary 400, GetAncillary 400, GetAncillary 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** V2 GetAncillary: ResponseId omitted: ACCEPTED (200) 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"3d864da1-4889-422a-9b3f-10cfc37ddf4a&amp;yAqaY9IAAEd...
- **Status:** FAIL
- **Evidence:** V2: supplier omitted -&gt; 400 (1.4s) | credentialsSelector omitted -&gt; 400 (1.4s) | ResponseId omitted -&gt; 200 (3.6s) | selectedOfferId omitted -&gt; 400 (1.4s)

  - **Hop 1 &mdash; V2 GetAncillary (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (1.4s)
  - **Hop 2 &mdash; V2 GetAncillary (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (1.4s)
  - **Hop 3 &mdash; V2 GetAncillary (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.4s)
  - **Hop 4 &mdash; V2 GetAncillary (neg2_ResponseIdomitted):** FAIL &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"3d864da1-4889-422a-9b3f-10cfc37ddf4a&amp;yAqaY9IAAEd... (3.6s)

### TC-AIEGY-BOOK-NEG-01 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 2 call(s): V1 Book &gt; V2 Book
- **Response:** Book 500, Book 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** V1 Book: never-issued ids: SERVER ERROR 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1: never-issued ids -&gt; 500 (1.3s) | V2: never-issued ids -&gt; 400 (0.5s)

  - **Hop 1 &mdash; V1 Book (neg1_neverissuedids):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (1.3s)
  - **Hop 2 &mdash; V2 Book (neg1_neverissuedids):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.5s)

### TC-AIEGY-GETSEATMAP-NEG-02 — FAIL

- **Test Case:** [GetSeatMap][Request] Validate GetSeatMap rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** 4 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 400, GetSeatMap 400, GetSeatMap 400, GetSeatMap 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** V2 GetSeatMap: ResponseId omitted: ACCEPTED (200) 200 {"supplier":"AirIndia","offerId":"3d864da1-4889-422a-9b3f-10cfc37ddf4a&amp;yAqaY9IAAEdf/CaTmZGW2UhTVmhfTVRRMk5YNGd...
- **Status:** FAIL
- **Evidence:** V2: supplier omitted -&gt; 400 (1.3s) | credentialsSelector omitted -&gt; 400 (1.7s) | ResponseId omitted -&gt; 200 (3.3s) | selectedOfferId omitted -&gt; 400 (1.7s)

  - **Hop 1 &mdash; V2 GetSeatMap (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (1.3s)
  - **Hop 2 &mdash; V2 GetSeatMap (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (1.7s)
  - **Hop 3 &mdash; V2 GetSeatMap (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (1.7s)
  - **Hop 4 &mdash; V2 GetSeatMap (neg2_ResponseIdomitted):** FAIL &mdash; 200 {"supplier":"AirIndia","offerId":"3d864da1-4889-422a-9b3f-10cfc37ddf4a&amp;yAqaY9IAAEdf/CaTmZGW2UhTVmhfTVRRMk5YNGd... (3.3s)

### TC-AIEGY-BOOK-NEG-03 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 16 call(s): V1 Book &gt; V2 Book
- **Response:** Book 400, Book 400, Book 400, Book 500, Book 400, Book 400, Book 400, Book 400, Book 400, Book 400, Book 400, Book 400, Book 400, Book 400, Book 400, Book 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** V1 Book: selectedOfferId = 1000 characters: SERVER ERROR 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** V1: fareConfirmResponseId = null -&gt; 400 (1.6s) | fareConfirmResponseId = empty -&gt; 400 (1.6s) | fareConfirmResponseId = number 12345 -&gt; 400 (1.6s) | fareConfirmResponseId = 1000 characters -&gt; 400 (1.6s) | selectedOfferId = null -&gt; 400 (0.5s) | selectedOfferId = empty -&gt; 400 (0.6s) | selectedOfferId = number 12345 -&gt; 400 (0.6s) | selectedOfferId = 1000 characters -&gt; 500 (0.6s) | V2: ResponseId = null -&gt; 400 (0.5s) | ResponseId = empty -&gt; 400 (0.5s) | ResponseId = number 12345 -&gt; 400 (0.5s) | ResponseId = 1000 characters -&gt; 400 (0.5s) | selectedOfferId = null -&gt; 400 (0.5s) | selectedOfferId = empty -&gt; 400 (0.5s) | selectedOfferId = number 12345 -&gt; 400 (0.5s) | selectedOfferId = 1000 characters -&gt; 400 (0.5s)

  - **Hop 1 &mdash; V1 Book (neg3_fareConfirmResponseIdemp):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.6s)
  - **Hop 2 &mdash; V1 Book (neg3_fareConfirmResponseIdnul):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.6s)
  - **Hop 3 &mdash; V1 Book (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 4 &mdash; V1 Book (neg3_selectedOfferIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.6s)
  - **Hop 5 &mdash; V1 Book (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.6s)
  - **Hop 6 &mdash; V1 Book (neg3_fareConfirmResponseIdnum):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.6s)
  - **Hop 7 &mdash; V1 Book (neg3_fareConfirmResponseId100):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (1.6s)
  - **Hop 8 &mdash; V1 Book (neg3_selectedOfferId1000chara):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.6s)
  - **Hop 9 &mdash; V2 Book (neg3_ResponseIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.5s)
  - **Hop 10 &mdash; V2 Book (neg3_ResponseIdempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.5s)
  - **Hop 11 &mdash; V2 Book (neg3_ResponseIdnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.5s)
  - **Hop 12 &mdash; V2 Book (neg3_ResponseId1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.5s)
  - **Hop 13 &mdash; V2 Book (neg3_selectedOfferIdnull):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.5s)
  - **Hop 14 &mdash; V2 Book (neg3_selectedOfferIdnumber123):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.5s)
  - **Hop 15 &mdash; V2 Book (neg3_selectedOfferIdempty):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.5s)
  - **Hop 16 &mdash; V2 Book (neg3_selectedOfferId1000chara):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.5s)

### TC-AIEGY-CHAIN-01 — FAIL

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a genuine Search responseId paired with an offerId that Search never returned.
- **Category:** Negative
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V1 FareConfirm &gt; V2 FareConfirm
- **Response:** FareConfirm 500, FareConfirm 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx.
- **Actual:** V1 FareConfirm: SERVER ERROR - 500 ServerError "Unknown error occured. Please keep the transaction id as a reference."
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 FareConfirm (chain1):** FAIL &mdash; 500 ServerError "Unknown error occured. Please keep the transaction id as a reference." (0.5s)
  - **Hop 2 &mdash; V2 FareConfirm (chain1):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)

### TC-AIEGY-BOOK-NEG-02 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 11 call(s): V1 Book &gt; V2 Book
- **Response:** Book 400, Book 400, Book 400, Book 400, Book 400, Book 400, Book 200, Book 400, Book 400, Book 400, Book 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** V1 Book: fareConfirmResponseId omitted: ACCEPTED (200) 200 pnr WUNKJY | V2 Book: ResponseId omitted: ACCEPTED (200) 200 pnr K8NUXK
- **Status:** FAIL
- **Evidence:** V1: supplier omitted -&gt; 400 (0.9s) | credentialsSelector omitted -&gt; 400 (0.9s) | fareConfirmResponseId omitted -&gt; 200 (6.3s) | selectedOfferId omitted -&gt; 400 (0.9s) | passengersList omitted -&gt; 400 (0.9s) | contactsList omitted -&gt; 400 (0.9s) | selectedBundles omitted -&gt; 400 (2.0s) | V2: supplier omitted -&gt; 400 (0.1s) | credentialsSelector omitted -&gt; 400 (0.1s) | ResponseId omitted -&gt; 200 (2.5s) | selectedOfferId omitted -&gt; 400 (0.1s)

  - **Hop 1 &mdash; V1 Book (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.9s)
  - **Hop 2 &mdash; V1 Book (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.9s)
  - **Hop 3 &mdash; V1 Book (neg2_selectedOfferIdomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.9s)
  - **Hop 4 &mdash; V1 Book (neg2_passengersListomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The PassengersList field is required. (0.9s)
  - **Hop 5 &mdash; V1 Book (neg2_contactsListomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required. (0.9s)
  - **Hop 6 &mdash; V1 Book (neg2_fareConfirmResponseIdomi):** FAIL &mdash; 200 pnr WUNKJY (6.3s)
  - **Hop 7 &mdash; V1 Book (neg2_selectedBundlesomitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedBundles field is required. (2.0s)
  - **Hop 8 &mdash; V2 Book (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 9 &mdash; V2 Book (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.1s)
  - **Hop 10 &mdash; V2 Book (neg2_selectedOfferIdomitted):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)
  - **Hop 11 &mdash; V2 Book (neg2_ResponseIdomitted):** FAIL &mdash; 200 pnr K8NUXK (2.5s)

### TC-BOOK-NEG-05 — FAIL

- **Test Case:** [Book][Request] Validate Book rejects a selectedOfferId that does not match the fareConfirmResponseId/ResponseId supplied in the same request.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 2 call(s): V2 Book &gt; V1 Book
- **Response:** Book 200, Book 400
- **Expected:** Rejected; exact error shape UNKNOWN, confirm live.
- **Actual:** V2 Book: V2 Book with a ResponseId and a selectedOfferId from different chains was not rejected cleanly: 200 pnr KU8N3V
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Book (mix):** FAIL &mdash; 200 pnr KU8N3V (2.0s)
  - **Hop 2 &mdash; V1 Book (mix):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total children passengers count must match the count of children in the search request. (0.1s)

### TC-FARECONFIRM-NEG-01 — FAIL

- **Test Case:** [FareConfirm][Request] Validate FareConfirm rejects a responseId + selectedOfferId pair originating from two different Search calls.
- **Category:** Negative
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V2 FareConfirm &gt; V1 FareConfirm
- **Response:** FareConfirm 200, FareConfirm 200
- **Expected:** Expected to 4xx or return a supplier-level 'offer no longer available'-style error; exact behavior UNKNOWN, confirm live -- high-value negative test per section 1.7.
- **Actual:** V2 FareConfirm: V2 FareConfirm with Search-A responseId and Search-B offerId was not rejected cleanly: 200 {"responseId":"dee6e2e3-1e95-428f-95d5-a569624a990d","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... | V1 FareConfirm: V1 FareConfirm with Search-A responseId and Search-B offerId was not rejected cleanly: 200 {"responseId":"189fc854-cf26-4a31-8ba1-95d374758d93","supplier":"AirIndia","journeys":{"SVh_MTIzNX4gfn5ERUx_MT...
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (mixfc):** FAIL &mdash; 200 {"responseId":"dee6e2e3-1e95-428f-95d5-a569624a990d","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.2s)
  - **Hop 2 &mdash; V1 FareConfirm (mixfc):** FAIL &mdash; 200 {"responseId":"189fc854-cf26-4a31-8ba1-95d374758d93","supplier":"AirIndia","journeys":{"SVh_MTIzNX4gfn5ERUx_MT... (1.4s)

### TC-AIEGY-FC-SEL-01 — PASS

- **Test Case:** [FareConfirm][Negative] Verify FareConfirm rejects valid ids when sent under an inactive or unknown credentialsSelector (UAE, KSA, ZZZ).
- **Category:** Negative
- **Endpoint Name:** FARECONFIRM
- **Request:** 3 call(s): V2 FareConfirm
- **Response:** FareConfirm 400, FareConfirm 400, FareConfirm 400
- **Expected:** 4xx with a structured error envelope, no PNR, no 5xx (an id issued under EGY must not be usable under another selector).
- **Actual:** All 3 calls matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect | rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (selUAE):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect (0.1s)
  - **Hop 2 &mdash; V2 FareConfirm (selKSA):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect (0.1s)
  - **Hop 3 &mdash; V2 FareConfirm (selZZZ):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)

### FLOW-V2-25-NEG — PASS

- **Test Case:** [FC-NONE-A][Request] Validate that FareConfirm rejects an ID/context pair whose supplier or credentialsSelector does not match the one used earlier in the same chain.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: None | Terminal Family A | Negative: CROSS ID
- **Request:** 2 call(s): V2 FareConfirm &gt; V2 Book
- **Response:** FareConfirm 400, Book 400
- **Expected:** UNKNOWN exact status -- confirm live. SPEC.md 1.7/3.2 treats supplier/credentialsSelector as a stateless per-call re-check, so a chain that switches supplier/credentialsSelector mid-flow while reusing IDs from the original supplier is expected to be rejected, not silently honored.
- **Actual:** All 2 calls matched: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. | rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Booking is not available for the Supplier 'AirIndia'.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (f25n1):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 2 &mdash; V2 Book (f25n2):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Booking is not available for the Supplier 'AirIndia'. (0.1s)

### FLOW-V2-31-NEG — BLOCKED

- **Test Case:** [FC-BDL-A][Request] Validate that GetOfferBundles is rejected (or otherwise correctly refused) when called against an offer whose FareConfirm response reported haveBundles=false.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: Bundle | Terminal Family A | Negative: CAP BDL
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected or returns an empty/error bundleChoices; exact rejection shape is UNKNOWN per SPEC.md 2.4/3.2 -- confirm live. Calling a capability-gated step when the live gating flag is false must not silently succeed as if the offer were bundle-capable.
- **Actual:** No offer with haveBundles=false exists on AirIndia/EGY: every offer on every route searched reported haveBundles=true, so the scenario cannot be set up.
- **Status:** BLOCKED
- **Evidence:** 

### FLOW-V2-43-NEG — BLOCKED

- **Test Case:** [FC-BDL+ANC-A][Request] Validate that GetAncillary is rejected (or otherwise correctly refused) when called against an offer whose FareConfirm response reported offerHasAncillary=false / isAncillaryRequired=false.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: Bundle+Ancillary | Terminal Family A | Negative: CAP ANC
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected or returns an empty ancillary catalog; exact rejection shape is UNKNOWN per SPEC.md 2.6/3.2 -- confirm live.
- **Actual:** No offer with offerHasAncillary=false exists on AirIndia/EGY V2: every V2 offer reports offerHasAncillary=true, so the scenario cannot be set up.
- **Status:** BLOCKED
- **Evidence:** 

### FLOW-V2-49-NEG — BLOCKED

- **Test Case:** [FC-SM-A][Request] Validate that GetSeatMap is rejected (or otherwise correctly refused) when called against an offer whose FareConfirm response reported isSeatMapRequired=false.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: SeatMap | Terminal Family A | Negative: CAP SM
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected or returns an empty seatMapDetails; exact rejection shape is UNKNOWN per SPEC.md 2.7/3.2 -- confirm live.
- **Actual:** No offer with offerHasSeat=false exists on AirIndia/EGY V2 (isSeatMapRequired is false on all offers while seats are sold): the scenario cannot be set up.
- **Status:** BLOCKED
- **Evidence:** 

### FLOW-V1-01-NEG — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #1 (SR-FC-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BK-RT
- **Request:** 1 call(s): V1 Book
- **Response:** Book 400
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total children passengers count must match the count of children in the search request.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Book (v101n):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total children passengers count must match the count of children in the search request. (0.1s)

### TC-FARECONFIRM-VAL-01 — FAIL

- **Test Case:** [FareConfirm][Request] Validate V1's searchResponseId and V2's ResponseId field names are each accepted only under their own version's contract, not interchangeably.
- **Category:** Validation
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V1 FareConfirm &gt; V2 FareConfirm
- **Response:** FareConfirm 200, FareConfirm 409
- **Expected:** Both cross-version field-name substitutions are rejected or the field is ignored/treated as missing (exact behavior UNKNOWN, confirm live) -- this is a genuine contract difference, not a typo, and must not be treated as interchangeable.
- **Actual:** V1 FareConfirm: V1 FareConfirm with ResponseId instead of searchResponseId was not rejected cleanly: 200 {"responseId":"c5a70e1e-b80a-449c-b1b4-7f982966de45","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT...
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 FareConfirm (swapname):** FAIL &mdash; 200 {"responseId":"c5a70e1e-b80a-449c-b1b4-7f982966de45","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (2.8s)
  - **Hop 2 &mdash; V2 FareConfirm (swapname):** PASS &mdash; 409 NDC-INT-BYP-A0001 "The requested flight or class is no longer available." ctx: The requested class of service is sold out. (0.6s)

### FLOW-V1-13-NEG — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[GetOfferBundles]&amp;[Book]&amp;[Retrieve] [Request] Validate Family-A flow #13 (SR-FC-BDL-BK-RT) correctly rejects substituting a stale/mismatched selectedOfferId (captured from a different, independent Search call) at the Book hop.
- **Category:** Flow
- **Endpoint Name:** SR-FC-BDL-BK-RT
- **Request:** 1 call(s): V1 Book
- **Response:** Book 400
- **Expected:** Book is expected to reject the mismatched offer/response ID pair (SPEC section 2.9 Negative Cases, section 3.2 "Search -&gt; FareConfirm/Upselling" validation rules) rather than silently booking against the wrong offer. Exact status code is UNKNOWN -- SPEC section 7.9 flags that no error-response example exists in either collection; confirm live and record the actual behavior/status code as the new baseline rather than assuming a 4xx.
- **Actual:** Matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total children passengers count must match the count of children in the search request.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Book (v113n):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total children passengers count must match the count of children in the search request. (0.5s)

### TC-BOOK-NEG-01 — PASS

- **Test Case:** [Book] [Request] Validate an INF passenger with a missing or unresolvable ParentPaxRefId is rejected.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** 2 call(s): V1 Book
- **Response:** Book 400, Book 400
- **Expected:** Book is expected to reject the request (SPEC section 2.5 Request Rules: every INF passenger must carry a valid ParentPaxRefId pointing to an ADT entry present in the same request; section 2.5 Common Errors lists this explicitly). Exact status code is UNKNOWN -- no negative example exists in either collection (section 7.9) -- confirm live and record as baseline rather than assuming a specific 4xx.
- **Actual:** All 2 calls matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Infant passenger 'Pax3': ParentPaxRefId is required and must reference an adult (ADT) passenger. | rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Infant passenger 'Pax3': ParentPaxRefId 'Pax99' does not exist in PassengersList.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Book (noparent):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Infant passenger 'Pax3': ParentPaxRefId is required and must reference an adult (ADT) passenger. (0.2s)
  - **Hop 2 &mdash; V1 Book (badparent):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Infant passenger 'Pax3': ParentPaxRefId 'Pax99' does not exist in PassengersList. (0.1s)

### TC-AIEGY-CHAIN-02 — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[UpSelling]&amp;[GetOfferBundles]&amp;[AddPassenger]&amp;[GetAncillary]&amp;[GetSeatMap]&amp;[Book]&amp;[Hold] [Request] Validate every downstream endpoint rejects a genuine Search responseId with an invented offerId.
- **Category:** Negative
- **Endpoint Name:** CHAIN
- **Request:** 5 call(s): V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V1 GetOfferBundles
- **Response:** GetOfferBundles 200, AddPassenger 400, GetAncillary 200, GetSeatMap 200, GetOfferBundles 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx on every endpoint.
- **Actual:** V2 GetOfferBundles: V2 GetOfferBundles with a responseId and an offerId from two different chains was not rejected cleanly: 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMjEvMjAyNiAxODoxMH5CT01_MTIvMjEvMjAyNiAyMDozMH5_":{"origin":"DEL","... | V2 GetAncillary: V2 GetAncillary with a responseId and an offerId from two different chains was not rejected cleanly: 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"f5fd1af7-09f4-4fd9-baf0-b7d28a380f5b&amp;yAnuY9IAAEO... | V2 GetSeatMap: V2 GetSeatMap with a responseId and an offerId from two different chains was not rejected cleanly: 200 {"supplier":"AirIndia","offerId":"3d864da1-4889-422a-9b3f-10cfc37ddf4a&amp;yAqaY9IAAEdf/CaTmZGW2UhTVmhfTVRRMk5YNGd...
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 GetOfferBundles (chain2):** FAIL &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMjEvMjAyNiAxODoxMH5CT01_MTIvMjEvMjAyNiAyMDozMH5_":{"origin":"DEL","... (2.0s)
  - **Hop 2 &mdash; V2 AddPassenger (chain2):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total children passengers count must match the count of children in the search request. (0.1s)
  - **Hop 3 &mdash; V2 GetAncillary (chain2):** FAIL &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"f5fd1af7-09f4-4fd9-baf0-b7d28a380f5b&amp;yAnuY9IAAEO... (3.3s)
  - **Hop 4 &mdash; V2 GetSeatMap (chain2):** FAIL &mdash; 200 {"supplier":"AirIndia","offerId":"3d864da1-4889-422a-9b3f-10cfc37ddf4a&amp;yAqaY9IAAEdf/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.5s)
  - **Hop 5 &mdash; V1 GetOfferBundles (chain2):** FAIL &mdash; 200 {"offerJourneys":{"SVh_MTIzNX4gfn5ERUx_MTIvMjUvMjAyNiAyMzozMH5CT01_MTIvMjYvMjAyNiAwMTo1NX5_":{"origin":"DEL","... (1.9s)

### TC-BOOK-NEG-02 — PASS

- **Test Case:** [Book] [Request] Validate a passenger whose contactRefId does not resolve to any entry in contactsList is rejected.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** 1 call(s): V1 Book
- **Response:** Book 400
- **Expected:** Book is expected to reject the request (SPEC section 2.5 Request Rules: contactRefId must resolve to a key present in contactsList; section 2.5 Common Errors: contactRefId not found in contactsList). Exact status code/body is UNKNOWN -- no negative example exists in either collection (section 7.9) -- confirm live and record as baseline.
- **Actual:** Matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger 'Pax1': ContactRefId '77' does not exist in ContactsList.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Book (badcontact):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger 'Pax1': ContactRefId '77' does not exist in ContactsList. (0.4s)

### TC-AUTH-SEC-01 — PASS

- **Test Case:** [Search][Request] Verify request behavior with a valid x-api-key versus an invalid or missing x-api-key header.
- **Category:** Security
- **Endpoint Name:** AUTH
- **Request:** 4 call(s): V2 Book &gt; V2 Search
- **Response:** Book 400, Book 401, Book 401, Search 401
- **Expected:** Valid key succeeds normally; invalid/missing key is rejected -- exact status code UNKNOWN, confirm live and record as the baseline auth-failure shape.
- **Actual:** All 4 calls matched: missing x-api-key on Book: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header | invalid x-api-key on Search: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Book (okkey):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)
  - **Hop 2 &mdash; V2 Book (badkey):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 3 &mdash; V2 Book (nokey):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 4 &mdash; V2 Search (nokey):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)

### TC-AUTH-SEC-02 — PASS

- **Test Case:** [Search][Request] Verify request behavior with a valid Client-Id versus an invalid Client-Id header value.
- **Category:** Security
- **Endpoint Name:** AUTH
- **Request:** 2 call(s): V2 Book
- **Response:** Book 401, Book 401
- **Expected:** Valid value succeeds normally; invalid value is rejected -- exact status code UNKNOWN, confirm live.
- **Actual:** All 2 calls matched: altered Client-Id on Book: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header | missing Client-Id on Book: 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Book (cidaltered):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)
  - **Hop 2 &mdash; V2 Book (cidmissing):** PASS &mdash; 401 AuthenticationError "Authentication error. Please check your credentials." ctx: Invalid authorization header (0.1s)

### TC-BOOK-NEG-12 — PASS

- **Test Case:** [Book][Request] Validate Book rejects requests with each mandatory field individually omitted: ResponseId/fareConfirmResponseId, selectedOfferId/SelectedOfferId, supplier, credentialsSelector.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 10 call(s): V2 Book &gt; V1 Book
- **Response:** Book 409, Book 400, Book 400, Book 400, Book 409, Book 400, Book 400, Book 400, Book 400, Book 400
- **Expected:** Automatable assertion: all four runs are rejected (exact status UNKNOWN -- confirm live per §7.9); no pnr created in any run. Record the actual status/error shape once observed so this becomes a deterministic assertion for future automation.
- **Actual:** All 10 calls matched: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The PassengersList field is required. | rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Book (omit_ResponseId):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Payment method AG does not allow zero amounts (0.5s)
  - **Hop 2 &mdash; V2 Book (omit_selectedOfferId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)
  - **Hop 3 &mdash; V2 Book (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 4 &mdash; V2 Book (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.1s)
  - **Hop 5 &mdash; V1 Book (omit_fareConfirmResponseId):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Duplicate contact type 'P' detected. (0.5s)
  - **Hop 6 &mdash; V1 Book (omit_selectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 7 &mdash; V1 Book (omit_supplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.6s)
  - **Hop 8 &mdash; V1 Book (omit_credentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.1s)
  - **Hop 9 &mdash; V1 Book (omit_passengersList):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The PassengersList field is required. (0.1s)
  - **Hop 10 &mdash; V1 Book (omit_contactsList):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required. (0.1s)

### TC-AIEGY-RETRIEVE-NEG-01 — PASS

- **Test Case:** [Retrieve][Request] Validate Retrieve rejects a well-formed but never-issued ID set with a structured 4xx (no 5xx, no booking).
- **Category:** Negative
- **Endpoint Name:** RETRIEVE
- **Request:** 2 call(s): V1 Retrieve &gt; V2 Retrieve
- **Response:** Retrieve 409, Retrieve 409
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx (unknown ids must not create or change anything).
- **Actual:** All 2 calls matched: never-issued ids: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The identifier 'recordLocator' with value 'ZZZZZZ' is invalid. | never-issued ids: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The identifier 'recordLocator' with value 'ZZZZZZ' is invalid.
- **Status:** PASS
- **Evidence:** V1: never-issued ids -&gt; 409 (0.5s) | V2: never-issued ids -&gt; 409 (0.7s)

  - **Hop 1 &mdash; V1 Retrieve (neg1_neverissuedids):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The identifier 'recordLocator' with value 'ZZZZZZ' is invalid. (0.5s)
  - **Hop 2 &mdash; V2 Retrieve (neg1_neverissuedids):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The identifier 'recordLocator' with value 'ZZZZZZ' is invalid. (0.7s)

### TC-AIEGY-RETRIEVE-NEG-02 — FAIL

- **Test Case:** [Retrieve][Request] Validate Retrieve rejects a request with each mandatory field individually omitted.
- **Category:** Negative
- **Endpoint Name:** RETRIEVE
- **Request:** 10 call(s): V1 Retrieve &gt; V2 Retrieve
- **Response:** Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 200, Retrieve 200, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 200, Retrieve 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every omitted mandatory field.
- **Actual:** V1 Retrieve: bookingToken omitted: ACCEPTED (200) 200 pnr C64VUA | V1 Retrieve: gdsPnr omitted: ACCEPTED (200) 200 pnr C64VUA | V2 Retrieve: gdsPnr omitted: ACCEPTED (200) 200 pnr GV94PF
- **Status:** FAIL
- **Evidence:** V1: supplier omitted -&gt; 400 (0.1s) | credentialsSelector omitted -&gt; 400 (0.3s) | pnr omitted -&gt; 400 (0.4s) | gdsPnr omitted -&gt; 200 (1.6s) | bookingToken omitted -&gt; 200 (1.4s) | V2: supplier omitted -&gt; 400 (0.1s) | credentialsSelector omitted -&gt; 400 (0.7s) | pnr omitted -&gt; 400 (0.7s) | gdsPnr omitted -&gt; 200 (1.1s) | bookingToken omitted -&gt; 200 (1.1s)

  - **Hop 1 &mdash; V1 Retrieve (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V1 Retrieve (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.3s)
  - **Hop 3 &mdash; V1 Retrieve (neg2_pnromitted):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.4s)
  - **Hop 4 &mdash; V1 Retrieve (neg2_bookingTokenomitted):** FAIL &mdash; 200 pnr C64VUA (1.4s)
  - **Hop 5 &mdash; V1 Retrieve (neg2_gdsPnromitted):** FAIL &mdash; 200 pnr C64VUA (1.6s)
  - **Hop 6 &mdash; V2 Retrieve (neg2_supplieromitted):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 7 &mdash; V2 Retrieve (neg2_credentialsSelectoromitt):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.7s)
  - **Hop 8 &mdash; V2 Retrieve (neg2_pnromitted):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.7s)
  - **Hop 9 &mdash; V2 Retrieve (neg2_gdsPnromitted):** FAIL &mdash; 200 pnr GV94PF (1.1s)
  - **Hop 10 &mdash; V2 Retrieve (neg2_bookingTokenomitted):** FAIL &mdash; 200 pnr GV94PF (1.1s)

### TC-AIEGY-RETRIEVE-NEG-03 — FAIL

- **Test Case:** [Retrieve][Request] Validate Retrieve rejects null, empty, numeric and 1000-character values in its ID fields.
- **Category:** Negative
- **Endpoint Name:** RETRIEVE
- **Request:** 24 call(s): V1 Retrieve &gt; V2 Retrieve
- **Response:** Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 200, Retrieve 200, Retrieve 200, Retrieve 200, Retrieve 200, Retrieve 200, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 200, Retrieve 200, Retrieve 200, Retrieve 200, Retrieve 200, Retrieve 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx for every bad ID value.
- **Actual:** V1 Retrieve: gdsPnr = null: ACCEPTED (200) 200 pnr C64VUA | V1 Retrieve: bookingToken = null: ACCEPTED (200) 200 pnr C64VUA | V1 Retrieve: bookingToken = empty: ACCEPTED (200) 200 pnr C64VUA
- **Status:** FAIL
- **Evidence:** V1: pnr = null -&gt; 400 (0.4s) | pnr = empty -&gt; 400 (0.4s) | pnr = number 12345 -&gt; 400 (0.3s) | pnr = 1000 characters -&gt; 400 (0.4s) | gdsPnr = null -&gt; 200 (1.4s) | gdsPnr = empty -&gt; 200 (1.6s) | gdsPnr = number 12345 -&gt; 400 (0.4s) | gdsPnr = 1000 characters -&gt; 200 (1.7s) | bookingToken = null -&gt; 200 (1.5s) | bookingToken = empty -&gt; 200 (1.5s) | bookingToken = number 12345 -&gt; 400 (0.4s) | bookingToken = 1000 characters -&gt; 200 (1.6s) | V2: pnr = null -&gt; 400 (0.7s) | pnr = empty -&gt; 400 (0.7s) | pnr = number 12345 -&gt; 400 (0.7s) | pnr = 1000 characters -&gt; 400 (0.7s) | gdsPnr = null -&gt; 200 (1.1s) | gdsPnr = empty -&gt; 200 (1.5s) | gdsPnr = number 12345 -&gt; 400 (0.7s) | gdsPnr = 1000 characters -&gt; 200 (1.5s) | bookingToken = null -&gt; 200 (1.5s) | bookingToken = empty -&gt; 200 (1.1s) | bookingToken = number 12345 -&gt; 400 (0.7s) | bookingToken = 1000 characters -&gt; 200 (1.5s)

  - **Hop 1 &mdash; V1 Retrieve (neg3_pnrnull):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.4s)
  - **Hop 2 &mdash; V1 Retrieve (neg3_pnrempty):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.4s)
  - **Hop 3 &mdash; V1 Retrieve (neg3_pnrnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.3s)
  - **Hop 4 &mdash; V1 Retrieve (neg3_pnr1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.4s)
  - **Hop 5 &mdash; V1 Retrieve (neg3_gdsPnrnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.4s)
  - **Hop 6 &mdash; V1 Retrieve (neg3_gdsPnrnull):** FAIL &mdash; 200 pnr C64VUA (1.4s)
  - **Hop 7 &mdash; V1 Retrieve (neg3_gdsPnrempty):** FAIL &mdash; 200 pnr C64VUA (1.6s)
  - **Hop 8 &mdash; V1 Retrieve (neg3_bookingTokennumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.4s)
  - **Hop 9 &mdash; V1 Retrieve (neg3_bookingTokennull):** FAIL &mdash; 200 pnr C64VUA (1.5s)
  - **Hop 10 &mdash; V1 Retrieve (neg3_bookingTokenempty):** FAIL &mdash; 200 pnr C64VUA (1.5s)
  - **Hop 11 &mdash; V1 Retrieve (neg3_bookingToken1000characte):** FAIL &mdash; 200 pnr C64VUA (1.6s)
  - **Hop 12 &mdash; V1 Retrieve (neg3_gdsPnr1000characters):** FAIL &mdash; 200 pnr C64VUA (1.7s)
  - **Hop 13 &mdash; V2 Retrieve (neg3_pnrnull):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.7s)
  - **Hop 14 &mdash; V2 Retrieve (neg3_pnrempty):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: PNR is required (0.7s)
  - **Hop 15 &mdash; V2 Retrieve (neg3_pnrnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.7s)
  - **Hop 16 &mdash; V2 Retrieve (neg3_pnr1000characters):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Maximum length of a PNR is 9 characters (0.7s)
  - **Hop 17 &mdash; V2 Retrieve (neg3_gdsPnrnull):** FAIL &mdash; 200 pnr GV94PF (1.1s)
  - **Hop 18 &mdash; V2 Retrieve (neg3_gdsPnrempty):** FAIL &mdash; 200 pnr GV94PF (1.5s)
  - **Hop 19 &mdash; V2 Retrieve (neg3_gdsPnrnumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.7s)
  - **Hop 20 &mdash; V2 Retrieve (neg3_bookingTokennumber12345):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The retrieveBookingRequestDto field is required. (0.7s)
  - **Hop 21 &mdash; V2 Retrieve (neg3_bookingTokenempty):** FAIL &mdash; 200 pnr GV94PF (1.1s)
  - **Hop 22 &mdash; V2 Retrieve (neg3_bookingTokennull):** FAIL &mdash; 200 pnr GV94PF (1.5s)
  - **Hop 23 &mdash; V2 Retrieve (neg3_bookingToken1000characte):** FAIL &mdash; 200 pnr GV94PF (1.5s)
  - **Hop 24 &mdash; V2 Retrieve (neg3_gdsPnr1000characters):** FAIL &mdash; 200 pnr GV94PF (1.5s)

### TC-AUTH-SEC-03 — PASS

- **Test Case:** [Hold]&amp;[Retrieve] [Request] Verify a cross-tenant access attempt -- acting on a pnr/bookingToken using a different supplier/credentialsSelector pair than the one that created it -- is rejected.
- **Category:** Security
- **Endpoint Name:** AUTH
- **Request:** 4 call(s): V2 Retrieve &gt; V1 Retrieve
- **Response:** Retrieve 400, Retrieve 400, Retrieve 400, Retrieve 400
- **Expected:** UNKNOWN expected behavior -- this is a high-value test since supplier+credentialsSelector is the API's actual body-level (not header-level) authorization mechanism, re-sent and re-checked on every call in a chain per section 1.7.
- **Actual:** All 4 calls matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect | rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Retrieve (xtUAE):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect (0.1s)
  - **Hop 2 &mdash; V2 Retrieve (xtKSA):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect (0.6s)
  - **Hop 3 &mdash; V1 Retrieve (xtUAE):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect (0.4s)
  - **Hop 4 &mdash; V1 Retrieve (xtKSA):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect (0.9s)

### TC-AIEGY-RET-01 — FAIL

- **Test Case:** [Retrieve][Negative] Verify Retrieve rejects an identity set that does not belong together: real pnr with a wrong bookingToken, wrong pnr with a real token, real pnr with another booking's token, wrong gdsPNR.
- **Category:** Negative
- **Endpoint Name:** RETRIEVE
- **Request:** 4 call(s): V2 Retrieve
- **Response:** Retrieve 200, Retrieve 409, Retrieve 200, Retrieve 200
- **Expected:** 4xx with a structured error envelope, no PNR, no 5xx; never another booking's data.
- **Actual:** V2 Retrieve: real pnr + wrong token: 200 pnr GV94PF (returned pnr GV94PF) | V2 Retrieve: real pnr + another booking's token: 200 pnr GV94PF (returned pnr GV94PF)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Retrieve (ret01):** FAIL &mdash; 200 pnr GV94PF (1.2s)
  - **Hop 2 &mdash; V2 Retrieve (ret01):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The identifier 'recordLocator' with value 'ZZZZZZ' is invalid. (0.5s)
  - **Hop 3 &mdash; V2 Retrieve (ret01):** FAIL &mdash; 200 pnr GV94PF (0.8s)
  - **Hop 4 &mdash; V2 Retrieve (ret01):** PASS &mdash; 200 pnr GV94PF (0.7s)

### TC-BOOK-NEG-04 — PASS

- **Test Case:** [Book][Request] Validate behavior when booking twice with the same offer reference (double-booking attempt).
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Book 409
- **Expected:** UNKNOWN whether the second call is idempotently rejected or produces a second PNR -- confirm live; high-value negative test.
- **Actual:** All 5 calls matched: PNR H3ZKYZ; total 5493; reconciled; 1 passengers echoed | second Book rejected: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Payment method AG does not allow zero amounts
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (dbl):** PASS &mdash; 200 offers=37 (3.5s)
  - **Hop 2 &mdash; V2 FareConfirm (dbl):** PASS &mdash; 200 {"responseId":"b35839b2-ee3c-48b4-9bc9-681273132b0e","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MD... (1.2s)
  - **Hop 3 &mdash; V2 AddPassenger (dbl):** PASS &mdash; 200 {"offerId":"10dcb4fa-9049-4cf5-b7f6-fb515e3b2c4c&amp;yApoY9IAAEY1/CaTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01ERXZNREl2T... (1.2s)
  - **Hop 4 &mdash; V2 Book (dbl):** PASS &mdash; 200 pnr H3ZKYZ (2.5s)
  - **Hop 5 &mdash; V2 Book (dbl2):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Payment method AG does not allow zero amounts (0.9s)

### TC-AIEGY-RACE-01 — PASS

- **Test Case:** [Book][Negative] Verify two simultaneous Book calls for the same offer pair create at most one PNR.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 409, Book 200
- **Expected:** At most one call returns a PNR; the other is rejected or returns the same PNR.
- **Actual:** All 5 calls matched: call 2: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Attempted create of object 'Booking' has failed. Please verify this object does not already exist.; distinct PNRs created: 1 | call 1: 200 pnr W5286T
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (racechain):** PASS &mdash; 200 offers=70 (4.4s)
  - **Hop 2 &mdash; V2 FareConfirm (racechain):** PASS &mdash; 200 {"responseId":"ca360dfc-f40e-4353-9ab0-9f6d6c677341","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (racechain):** PASS &mdash; 200 {"offerId":"d45d3960-e715-41b6-bbb4-185345e4f5ca&amp;yAqvY9IAAILm/SaTmZGW2ZRTVmhfTVRBMk4zNGdmbjVFUlV4X01USXZNRGt2T... (0.9s)
  - **Hop 4 &mdash; V2 Book (race2):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Attempted create of object 'Booking' has failed. Please verify this object does not already exist. (1.1s)
  - **Hop 5 &mdash; V2 Book (race1):** PASS &mdash; 200 pnr W5286T (2.0s)

### TC-AIBK-NAME-03 — PASS

- **Test Case:** [Book][Validation] Verify a booking for a passenger with a two-word surname (Abdel Rahman) completes and the name is returned unchanged.
- **Category:** Validation
- **Endpoint Name:** V2 booking: passenger name
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** AddPassenger and Book accept the name; Book and Retrieve return it unchanged
- **Actual:** All 5 calls matched: PNR RV7ESI; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (name03):** PASS &mdash; 200 offers=63 (6.2s)
  - **Hop 2 &mdash; V2 FareConfirm (name03):** PASS &mdash; 200 {"responseId":"c3c67095-a352-41fa-bb1e-0bddadad7819","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (2.1s)
  - **Hop 3 &mdash; V2 AddPassenger (name03):** PASS &mdash; 200 {"offerId":"b31caf02-8b2c-4a7b-aa14-35a236c62904&amp;yApVY9IAAEY48CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... (0.8s)
  - **Hop 4 &mdash; V2 Book (name03):** PASS &mdash; 200 pnr RV7ESI (2.0s)
  - **Hop 5 &mdash; V2 Retrieve (name03):** PASS &mdash; 200 pnr RV7ESI (0.6s)

### TC-AIEGY-ANC-NEG-02 — PASS

- **Test Case:** [Book][Negative] Verify Book rejects invalid ancillary quantities: 0, -1, 1.5, "abc", 999 (above availableCount).
- **Category:** Negative
- **Endpoint Name:** ANCILLARY
- **Request:** 10 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 400, Book 400, Book 400, Book 400, Book 409
- **Expected:** 4xx with a structured error envelope, no PNR, no 5xx; no PNR.
- **Actual:** All 10 calls matched: Quantity "abc": rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Quantity must be a positive integer greater than zero. | Quantity "999": rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (VSDB) is restricted to 1 occurence(s) per passenger and leg.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=67 (3.8s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"0cf3752d-ed8f-475b-ad2e-c152d19291be","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"100fa839-85cb-4841-aacd-02f793a92eb8&amp;yArbY9IAAEpA/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNalV2T... (1.8s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"100fa839-85cb-4841-aacd-02f793a92eb8&amp;yArbY9IAAEp... (4.2s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"100fa839-85cb-4841-aacd-02f793a92eb8&amp;yArbY9IAAEpA/iaTmZGW2ZRTVmhfTVRNNU1YNGd... (2.7s)
  - **Hop 6 &mdash; V2 Book (bk_Quantity0):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Quantity must be a positive integer greater than zero. (0.3s)
  - **Hop 7 &mdash; V2 Book (bk_Quantity1):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Quantity must be a positive integer greater than zero. (0.1s)
  - **Hop 8 &mdash; V2 Book (bk_Quantity15):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Quantity must be a positive integer greater than zero. (0.1s)
  - **Hop 9 &mdash; V2 Book (bk_Quantityabc):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Quantity must be a positive integer greater than zero. (0.1s)
  - **Hop 10 &mdash; V2 Book (bk_Quantity999):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (VSDB) is restricted to 1 occurence(s) per passenger and leg. (0.7s)

### TC-AIEGY-ANC-NEG-03 — PASS

- **Test Case:** [Book][Negative] Verify an ancillary Quantity sent as a JSON number is accepted or rejected cleanly (documented examples send a string).
- **Category:** Negative
- **Endpoint Name:** ANCILLARY
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 400
- **Expected:** Either accepted, or rejected with a clear validation message naming the Quantity field (not a .NET type-conversion message).
- **Actual:** All 6 calls matched: seats chosen: Pax1 seg0 3A (AvailablePaid) @1780 | Pax2 seg0 3B (AvailablePaid) @1780 (expected extra 3560) | Quantity sent as the JSON number 1: 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=67 (4.6s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"4b99fce9-5750-48f0-8174-35d837670655","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"107eb888-b9df-44b7-81ab-9dc47ac8fcde&amp;yAo2Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNamt2T... (1.9s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"107eb888-b9df-44b7-81ab-9dc47ac8fcde&amp;yAo2Y9IAAEW... (2.7s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"107eb888-b9df-44b7-81ab-9dc47ac8fcde&amp;yAo2Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.8s)
  - **Hop 6 &mdash; V2 Book (bk_QuantitysentastheJSO):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.1s)

### FLOW-V2-37-NEG — PASS

- **Test Case:** [FC-ANC-A][Request] Validate that FareCheck rejects a hand-constructed AncillaryCode instead of one copied verbatim from GetAncillary's segmentsAncillariesDetails[].code.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: Ancillary | Terminal Family A | Negative: HAND CODE
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 409
- **Expected:** FareCheck rejects the fabricated code; valid AncillaryCode values are opaque gzip+base64 tokens that must originate from GetAncillary and must never be hand-built. Exact rejection shape is UNKNOWN -- confirm live per SPEC.md 2.8.
- **Actual:** All 6 calls matched: seats chosen: Pax1 seg0 1D (AvailablePaid) @1780 | Pax2 seg0 1E (AvailablePaid) @1780 (expected extra 3560) | hand-constructed AncillaryCode: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The SsrByKeysRequestv2 field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=56 (5.5s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"9d1d1ff0-0800-4a9a-8c55-85eee969996b","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"80f1c6c4-8667-4aef-905c-1fc5c78aa604&amp;yArmY9IAAEo9/CaTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01ERXZNREl2T... (1.5s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"80f1c6c4-8667-4aef-905c-1fc5c78aa604&amp;yArmY9IAAEo... (3.7s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"80f1c6c4-8667-4aef-905c-1fc5c78aa604&amp;yArmY9IAAEo9/CaTmZGW2ZRTVmhfTVRBME9YNGd... (2.1s)
  - **Hop 6 &mdash; V2 Book (bk_handconstructedAncil):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The SsrByKeysRequestv2 field is required. (0.6s)

### TC-BOOK-NEG-05-SM — PASS

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats selection whose cellCode/cellId refers to a Blocked or Occupied cell.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 409
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live per §7.9); no booking is created, or if a PNR is created it must NOT reflect the unavailable seat as attached -- either outcome should be logged precisely, since both are plausible failure modes for an unenforced availability check.
- **Actual:** All 6 calls matched: seats chosen: Pax1 seg0 3A (AvailablePaid) @1780 | Pax2 seg0 3B (AvailablePaid) @1780 (expected extra 3560) | seat on a Blocked cell: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Attempted create of object 'PassengerSeat' has failed. Please verify this object does not already exist.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=72 (4.6s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"b68e992f-a496-4a84-bfdb-ff11e521eabf","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"58ae6914-0262-4e2c-9b81-df4d934e36ed&amp;yAo0Y9IAAEWg/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNVEF2T... (1.8s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"58ae6914-0262-4e2c-9b81-df4d934e36ed&amp;yAo0Y9IAAEW... (2.4s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"58ae6914-0262-4e2c-9b81-df4d934e36ed&amp;yAo0Y9IAAEWg/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.3s)
  - **Hop 6 &mdash; V2 Book (bk_seatonaBlockedcell):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Attempted create of object 'PassengerSeat' has failed. Please verify this object does not already exist. (0.8s)

### FLOW-V2-61-NEG — PASS

- **Test Case:** [FC-ANC+SM-A][Request] Validate that FareCheck rejects a PassengersSelectedAncillaries Quantity greater than GetAncillary's reported availableCount for that code.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: Ancillary+SeatMap | Terminal Family A | Negative: QTY EXCEED
- **Request:** 7 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 409, Book 409
- **Expected:** FareCheck rejects (or otherwise flags) the over-quantity selection. Exact rejection shape is UNKNOWN -- confirm live per SPEC.md 2.8.
- **Actual:** All 7 calls matched: meal Quantity 999 (availableCount is 400): rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (VSDB) is restricted to 1 occurence(s) per passenger and leg. | baggage Quantity 51 (availableCount is 50): rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=69 (4.8s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"8bc541d6-37b8-44ff-b064-eaed7518e3a4","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"7c632c53-debc-4422-851c-e52b55278eb5&amp;yArcY9IAAEo3/CaTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01ERXZNRFl2T... (1.7s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"7c632c53-debc-4422-851c-e52b55278eb5&amp;yArcY9IAAEo... (4.1s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"7c632c53-debc-4422-851c-e52b55278eb5&amp;yArcY9IAAEo3/CaTmZGW2ZRTVmhfTVRBME9YNGd... (2.0s)
  - **Hop 6 &mdash; V2 Book (bk_mealQuantity999avail):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (VSDB) is restricted to 1 occurence(s) per passenger and leg. (0.6s)
  - **Hop 7 &mdash; V2 Book (bk_baggageQuantity51ava):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg. (0.3s)

### TC-BOOK-NEG-06 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a passengersSelectedSeats.cellId value that has been truncated or otherwise tampered with.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 8 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 400, Book 409, Book 400
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live) since the tampered token should fail whatever server-side decode/signature check the opaque cellId undergoes.
- **Actual:** All 8 calls matched: cellId with a flipped character: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Seat assignment key SVghMTQ2NSAgITYzOTM1ODkyNjAwMDAwMDAwMCFERUwhQk9NITNCIVk- is invalid. | cellId empty: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: CellId is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=72 (4.9s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"5a01cd50-7c47-41e3-8f0d-837dd38060d5","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (0.8s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"1cd09263-7109-4824-b1ad-e9140ad7bc5a&amp;yAo1Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNVGd2T... (1.3s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"1cd09263-7109-4824-b1ad-e9140ad7bc5a&amp;yAo1Y9IAAEW... (2.1s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"1cd09263-7109-4824-b1ad-e9140ad7bc5a&amp;yAo1Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.1s)
  - **Hop 6 &mdash; V2 Book (bk_cellIdtruncatedto20c):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: CellId does not match CellCode '3B' (Passenger: Pax1). (0.1s)
  - **Hop 7 &mdash; V2 Book (bk_cellIdwithaflippedch):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Seat assignment key SVghMTQ2NSAgITYzOTM1ODkyNjAwMDAwMDAwMCFERUwhQk9NITNCIVk- is invalid. (0.7s)
  - **Hop 8 &mdash; V2 Book (bk_cellIdempty):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: CellId is required. (0.1s)

### TC-BOOK-VAL-06 — PASS

- **Test Case:** [Book][Request] Validate Book's behavior when passengersSelectedSeats.cellCode does not match the cell that cellId actually encodes.
- **Category:** Validation
- **Endpoint Name:** BOOK
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 400
- **Expected:** UNKNOWN -- confirm live whether the API trusts cellId alone (ignoring/overwriting the mismatched cellCode), rejects the request outright, or books the wrong seat under the wrong displayed code. All three are plausible given cellId is described as the metadata-bearing field and cellCode as a display label.
- **Actual:** All 6 calls matched: seats chosen: Pax1 seg0 3A (AvailablePaid) @1780 | Pax2 seg0 3B (AvailablePaid) @1780 (expected extra 3560) | cellCode does not match the cell that cellId encodes: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: CellId does not match CellCode '30A' (Passenger: Pax1).
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=72 (4.6s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"dbdac3ad-e05b-49ba-923a-91692d1072d6","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (0.8s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"1d024e9d-0c29-4d6c-bdb5-701f2268ab9f&amp;yAo2Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNakl2T... (1.3s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"1d024e9d-0c29-4d6c-bdb5-701f2268ab9f&amp;yAo2Y9IAAEW... (2.1s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"1d024e9d-0c29-4d6c-bdb5-701f2268ab9f&amp;yAo2Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.4s)
  - **Hop 6 &mdash; V2 Book (bk_cellCodedoesnotmatch):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: CellId does not match CellCode '30A' (Passenger: Pax1). (0.6s)

### TC-BOOK-NEG-07 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request that assigns the same seat cell to two different passengers.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 400
- **Expected:** Automatable assertion: request rejected (candidate error code DUPLICATE_SEAT_SELECTION_IN_REQUEST, per Seat map - Seatmap.md TC-INT-BOOK-009) before any supplier round-trip; exact status UNKNOWN-confirm-live. No pnr created.
- **Actual:** All 6 calls matched: seats chosen: Pax1 seg0 3A (AvailablePaid) @1780 | Pax2 seg0 3B (AvailablePaid) @1780 (expected extra 3560) | same seat assigned to two passengers: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Seat '3A' is assigned to multiple passengers on segment 'NjM5MzY1ODM4MDAwMDAwMDAwIUlYITE0NjUhICFERUwhQk9NITg4M
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=68 (4.3s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"8b4fca4b-bff6-4f2d-b4fd-10e236ecf4fb","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"17f2b4ac-7281-4d9c-a11e-9e92d9046261&amp;yAo4Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNall2T... (1.5s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"17f2b4ac-7281-4d9c-a11e-9e92d9046261&amp;yAo4Y9IAAEW... (2.8s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"17f2b4ac-7281-4d9c-a11e-9e92d9046261&amp;yAo4Y9IAAEWj/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.3s)
  - **Hop 6 &mdash; V2 Book (bk_sameseatassignedtotw):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Seat '3A' is assigned to multiple passengers on segment 'NjM5MzY1ODM4MDAwMDAwMDAwIUlYITE0NjUhICFERUwhQk9NITg4M (0.1s)

### TC-BOOK-NEG-08 — PASS

- **Test Case:** [Book][Request] Validate Book rejects a request where the same passenger selects two different seats on the same segment.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 409
- **Expected:** UNKNOWN -- since setSegmentsSeats is keyed by segmentRefId (a JSON object, not an array), a client cannot literally submit two values under one key -- this case instead documents that constraint and verifies the last-value-wins/serialization behavior of the test client is understood, rather than asserting a specific API rejection.
- **Actual:** All 6 calls matched: seats chosen: Pax1 seg0 3A (AvailablePaid) @1780 | Pax2 seg0 3B (AvailablePaid) @1780 (expected extra 3560) | one passenger selects two different seats on the same segment: rejected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The identifier 'journeyKey' with value 'dup' is invalid.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=58 (4.1s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"80847f60-a071-41e6-ba7d-d9cc3f720492","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"5fe87c6a-1e3e-4e99-8f73-f8b56cf74f1a&amp;yAo2Y9IAAEWm/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNekF2T... (1.6s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"5fe87c6a-1e3e-4e99-8f73-f8b56cf74f1a&amp;yAo2Y9IAAEW... (2.1s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"5fe87c6a-1e3e-4e99-8f73-f8b56cf74f1a&amp;yAo2Y9IAAEWm/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.3s)
  - **Hop 6 &mdash; V2 Book (bk_onepassengerselectst):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The identifier 'journeyKey' with value 'dup' is invalid. (0.9s)

### TC-BOOK-BIZ-05 — PASS

- **Test Case:** [Book][Request] Validate a Child (CHD) passenger assigned an Exit Row seat is rejected server-side.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** 4 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200
- **Expected:** Automatable assertion: response status is an error (candidate error code RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD, per this suite's Seat map - Seatmap.md TC-INT-BOOK-008 reference) and no pnr is created for this attempt. Candidate code is UNKNOWN-confirm-live -- not yet observed in any Postman-collection saved example; record the exact code/status returned and update this row plus SPEC.md §2.9 once confirmed.
- **Actual:** exit-row seats found (12) but none is offered as available to the child passenger
- **Status:** PASS
- **Evidence:** OK: exit-row seats found (12) but none is offered as available to the child passenger

  - **Hop 1 &mdash; V2 Search (exitrow):** PASS &mdash; 200 offers=69 (3.5s)
  - **Hop 2 &mdash; V2 FareConfirm (exitrow):** PASS &mdash; 200 {"responseId":"2faa5806-ad60-4c1d-a705-d5e74524fc63","supplier":"AirIndia","journeys":{"SVh_MTIzNX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (exitrow):** PASS &mdash; 200 {"offerId":"112a223b-15ae-44f3-bfeb-00b927377471&amp;yAoPY9IAAEUD8AqTmZGW2UhTVmhfTVRJek5YNGdmbjVFUlV4EADzCXZNRGN2T... (1.2s)
  - **Hop 4 &mdash; V2 GetSeatMap (exitrow):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"112a223b-15ae-44f3-bfeb-00b927377471&amp;yAoPY9IAAEUD8AqTmZGW2UhTVmhfTVRJek5YNGd... (1.1s)

### TC-BOOK-BIZ-07 — BLOCKED

- **Test Case:** [Book][Request] Validate a designated wheelchair-accessible seat can be selected for a passenger flagged for special assistance, and the assignment is preserved.
- **Category:** Business Rule
- **Endpoint Name:** BOOK
- **Request:** 4 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetSeatMap
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetSeatMap 200
- **Expected:** UNKNOWN -- confirm live. Expect Book/Retrieve to succeed with the seat attached like any other paid/free seat; there is no evidenced SSR (special-service-request) field anywhere in the current V2 Book/AddPassenger schema (§2.5/§2.9) to carry a WCHR code alongside the seat, so if Seat map - Seatmap.md's TC-INT-BOOK-014 expectation of a linked SSR flag is correct, that would be an undocumented field this suite has not yet discovered -- treat any SSR-linkage behavior found as a new SPEC.md §2.9 finding, not something to assume exists.
- **Actual:** No wheelchair-accessible seat can be identified in the AirIndia seat map (176 cells inspected; padis codes L,W,A,IE); wheelchair assistance is sold as an Other ancillary (WCHR/WCHS/WCHC), covered by TC-AIBK-ANC-03/04
- **Status:** BLOCKED
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (wchair):** PASS &mdash; 200 offers=66 (3.8s)
  - **Hop 2 &mdash; V2 FareConfirm (wchair):** PASS &mdash; 200 {"responseId":"c6292ec1-9dfd-460d-b878-cf47967c228d","supplier":"AirIndia","journeys":{"SVh_MTEwOH4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (wchair):** PASS &mdash; 200 {"offerId":"b2041345-9d08-423d-bfc3-3ee5f73910b2&amp;yArJY9IAAIMS/iaTmZGW2ZRTVmhfTVRFd09INGdmbjVFUlV4X01USXZNVEV2T... (0.8s)
  - **Hop 4 &mdash; V2 GetSeatMap (wchair):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"b2041345-9d08-423d-bfc3-3ee5f73910b2&amp;yArJY9IAAIMS/iaTmZGW2ZRTVmhfTVRFd09INGd... (1.3s)

### TC-AIEGY-ANC-NEG-01 — FAIL

- **Test Case:** [Book][Negative] Verify Book rejects ancillary selections that were not issued for this offer: hand-built code, code from another offer, meal code under the journey key, baggage code under a segment key, unknown category.
- **Category:** Negative
- **Endpoint Name:** ANCILLARY
- **Request:** 21 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 409, Book 400, Book 400, Book 200, Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200, Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 200
- **Expected:** 4xx with a structured error envelope, no PNR, no 5xx; no PNR.
- **Actual:** V2 Book: meal code moved under the baggage segment key: ACCEPTED, PNR P7JZTN | V2 Book: ancillary under an unknown pax reference: ACCEPTED, PNR O713SA | V2 Book: ancillary under an unknown segment key: ACCEPTED, PNR V3GRWM
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=70 (4.8s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"9a728be5-9221-4879-84aa-246bd0180b72","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"d6f02f68-814b-423a-be15-37c90d6a3df6&amp;yArfY9IAAEo68CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNakV2T... (1.7s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"d6f02f68-814b-423a-be15-37c90d6a3df6&amp;yArfY9IAAEo... (4.2s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"d6f02f68-814b-423a-be15-37c90d6a3df6&amp;yArfY9IAAEo68CWTmZGW2ZRTVmhfTVRBME9YNGd... (2.4s)
  - **Hop 6 &mdash; V2 Book (bk_handbuiltancillaryco):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The SsrByKeysRequestv2 field is required. (0.5s)
  - **Hop 7 &mdash; V2 Book (bk_unknowncategorySpace):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.1s)
  - **Hop 8 &mdash; V2 Book (bk_baggagecodelabelleda):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid AdditionalServiceCategory Expected 'Baggage'. (0.1s)
  - **Hop 9 &mdash; V2 Book (bk_mealcodemovedunderth):** FAIL &mdash; 200 pnr P7JZTN (3.1s)
  - **Hop 10 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=64 (4.5s)
  - **Hop 11 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"690d6525-0b88-4635-b0e1-29e6b14a50df","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MD... (1.1s)
  - **Hop 12 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"f7f6e252-01f9-4268-a59b-112be2fdc554&amp;yArWY9IAAEo0/CaTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01ERXZNVFF2T... (1.4s)
  - **Hop 13 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"f7f6e252-01f9-4268-a59b-112be2fdc554&amp;yArWY9IAAEo... (4.1s)
  - **Hop 14 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"f7f6e252-01f9-4268-a59b-112be2fdc554&amp;yArWY9IAAEo0/CaTmZGW2ZRTVmhfTVRBME9YNGd... (2.1s)
  - **Hop 15 &mdash; V2 Book (bk_ancillaryunderanunkn):** FAIL &mdash; 200 pnr O713SA (2.4s)
  - **Hop 16 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=62 (4.8s)
  - **Hop 17 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"ad51a6a2-2201-461a-a86f-488b4b03b3ea","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (0.9s)
  - **Hop 18 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"20b47ab5-733e-4387-883f-e147a41ac893&amp;yArcY9IAAEpD/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNRE12T... (1.7s)
  - **Hop 19 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"20b47ab5-733e-4387-883f-e147a41ac893&amp;yArcY9IAAEp... (4.2s)
  - **Hop 20 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"20b47ab5-733e-4387-883f-e147a41ac893&amp;yArcY9IAAEpD/iaTmZGW2ZRTVmhfTVRNNU1YNGd... (1.9s)
  - **Hop 21 &mdash; V2 Book (bk_ancillaryunderanunkn):** FAIL &mdash; 200 pnr V3GRWM (2.7s)

### TC-SEATMAP-NEG-01 — BLOCKED

- **Test Case:** [GetSeatMap][Request] Validate calling GetSeatMap when isSeatMapRequired=false.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Behavior is UNKNOWN - confirm live whether an empty/no seatMapDetails is returned or the call is rejected outright, and record as the baseline (§2.7 Business Logic).
- **Actual:** No offer with offerHasSeat=false / isSeatMapRequired=true exists on AirIndia/EGY to set the scenario up; every offer reports isSeatMapRequired=false while GetSeatMap works.
- **Status:** BLOCKED
- **Evidence:** 

### TC-SEATMAP-NEG-02 — BLOCKED

- **Test Case:** [SeatMap][Request] Validate GetSeatMap is rejected when the request otherwise targets a valid offer but no segment of that offer's itinerary is being queried (i.e., the offer/response pair does not correspond to any real segment).
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live per §7.9); no seatMapDetails should be returned for a segment set that doesn't belong to the referenced offer.
- **Actual:** GetSeatMap takes no segment parameter (only ResponseId and selectedOfferId), so "no segment queried" cannot be sent.
- **Status:** BLOCKED
- **Evidence:** 

### TC-SEATMAP-NEG-03 — PASS

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects a stale or entirely invalid ResponseId/selectedOfferId pair.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** 1 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 400
- **Expected:** Both runs rejected (exact status UNKNOWN -- confirm live); no seatMapDetails returned for either.
- **Actual:** Matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 GetSeatMap (smneg3):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)

### TC-BOOK-NEG-10 — PASS

- **Test Case:** [Book][Request] Validate Book succeeds when passengersSelectedSeats is explicitly sent as an empty object ({}) rather than omitted.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Automatable assertion: Book succeeds (HTTP 200), no seat fee is charged (totalSelectedSeatsAmount == 0 or absent), passengersSelectedSeats in the response is empty/absent, and no 500-level error occurs from the explicit-empty-object shape (distinct from simply omitting the field, which TC-BOOK-BND-03 run (a) already covers).
- **Actual:** All 5 calls matched: PNR T96M5U; total 2709; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2709, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (emptyseat01):** PASS &mdash; 200 offers=56 (4.4s)
  - **Hop 2 &mdash; V2 FareConfirm (emptyseat01):** PASS &mdash; 200 {"responseId":"2085e538-be41-4f75-bb45-b7036d10ae0c","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (emptyseat01):** PASS &mdash; 200 {"offerId":"75d09f6a-d9ba-420e-b1c7-81f70f0f1612&amp;yApSY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGt2T... (0.6s)
  - **Hop 4 &mdash; V2 Book (emptyseat01):** PASS &mdash; 200 pnr T96M5U (3.0s)
  - **Hop 5 &mdash; V2 Retrieve (emptyseat01):** PASS &mdash; 200 pnr T96M5U (0.6s)

### TC-SEATMAP-NEG-05 — BLOCKED

- **Test Case:** [SeatMap][Request] Validate GetSeatMap fails gracefully (a structured error, not a raw 500/stack trace) when the underlying supplier call fails or times out.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion (once a forcing mechanism exists): response is a structured business-error envelope (matching this API's other confirmed error envelopes, e.g. §2.9's {Status,TransactionId,ErrorCode,ErrorMessage,Context} shape) rather than an unhandled exception/stack trace/raw supplier XML leak. No internal .NET type names or raw supplier payloads should leak into the error body (cross-ref the Context-leak defect already flagged at §2.9).
- **Actual:** A supplier timeout or failure cannot be induced from the API.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BOOK-NEG-09 — BLOCKED

- **Test Case:** [Book][Request] Validate graceful rollback (no orphaned PNR or charge) when the supplier's seat allocation call fails or times out after Book is submitted with a seat selection.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion (once a forcing mechanism exists): response is an error (candidate HTTP 422/502 per Seat map - Seatmap.md TC-INT-BOOK-012); either no pnr is returned, or if one is returned, a follow-up Retrieve shows the booking exists without the failed seat attached and without a seat fee charged. Exact behavior UNKNOWN -- confirm live and record; this is an environment-dependent exploratory case, not guaranteed reproducible on demand.
- **Actual:** A supplier seat-allocation failure after Book cannot be induced from the API, so the rollback cannot be observed.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BOOK-VAL-07 — BLOCKED

- **Test Case:** [Book][Request] Validate that submitting a second, different passengersSelectedSeats selection supersedes an earlier selection made earlier in the same test session (late seat-change-before-submission).
- **Category:** Validation
- **Endpoint Name:** BOOK
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Automatable assertion: Book succeeds and reflects cell B only -- passengersSelectedSeats/passengerSeats/totalSelectedSeats show cell B's cellCode/price; cell A does not appear anywhere in the response, and cell A's availability (per a follow-up GetSeatMap, if re-queryable) is unaffected by the abandoned selection.
- **Actual:** The row re-selects seats on an existing booking (SeatAfterHold), which is a Hold-branch operation and out of scope for this booking-flow run.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BOOK-NEG-11 — PASS

- **Test Case:** [Book][Request] Validate Book succeeds when a passenger's setSegmentsSeats is explicitly sent as an empty object.
- **Category:** Negative
- **Endpoint Name:** BOOK
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Automatable assertion: Book succeeds; no seat is attached for T1; no error is thrown by the presence of an otherwise-empty nested object.
- **Actual:** All 5 calls matched: PNR ITV1MY; total 2605; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 2605, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (emptyseat02):** PASS &mdash; 200 offers=72 (4.2s)
  - **Hop 2 &mdash; V2 FareConfirm (emptyseat02):** PASS &mdash; 200 {"responseId":"232db6ca-ad76-485e-9992-403f0ad6fcf8","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.8s)
  - **Hop 3 &mdash; V2 AddPassenger (emptyseat02):** PASS &mdash; 200 {"offerId":"894c9449-04d7-4602-b39b-1f46e122e857&amp;yAmwY9IAAEL6/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNak12T... (2.8s)
  - **Hop 4 &mdash; V2 Book (emptyseat02):** PASS &mdash; 200 pnr ITV1MY (1.6s)
  - **Hop 5 &mdash; V2 Retrieve (emptyseat02):** PASS &mdash; 200 pnr ITV1MY (0.6s)

### TC-SEATMAP-VAL-04 — PASS

- **Test Case:** [SeatMap][Request] Validate a cellID obtained from one offer's GetSeatMap response is rejected when submitted in Book for a different offer.
- **Category:** Validation
- **Endpoint Name:** SEATMAP
- **Request:** 3 call(s): V2 GetSeatMap &gt; V2 Book
- **Response:** GetSeatMap 200, GetSeatMap 200, Book 409
- **Expected:** Request is rejected (exact status UNKNOWN -- confirm live per §7.9), since cellID appears (per its base64-decoded contents) to embed the originating ResponseId/OfferId/passenger-ref metadata and is presumably bound to the offer it was issued for.
- **Actual:** All 3 calls matched: seats chosen: Pax1 seg0 3A (AvailablePaid) @1780 (expected extra 1780) | rejected as expected - 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The flight requested in the seat assignment request is not found in the journeys for the booking in state
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 GetSeatMap (xo2):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"2fa1d710-c55b-4416-834c-d88e70026c82&amp;yAmyY9IAAEL9/CaTmZGW2UhTVmhfTVRRMk5YNGd... (0.8s)
  - **Hop 2 &mdash; V2 GetSeatMap (xo1):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"5d377955-a57f-474b-ac68-00599b772a02&amp;yApRY9IAAEYw8CWTmZGW2ZRTVmhfTVRBME9YNGd... (1.2s)
  - **Hop 3 &mdash; V2 Book (xoffer):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The flight requested in the seat assignment request is not found in the journeys for the booking in state (0.8s)

### TC-SEATMAP-NEG-04 — FAIL

- **Test Case:** [SeatMap][Request] Validate GetSeatMap rejects requests with each mandatory field individually omitted: supplier, credentialsSelector, ResponseId, selectedOfferId.
- **Category:** Negative
- **Endpoint Name:** SEATMAP
- **Request:** 4 call(s): V2 GetSeatMap
- **Response:** GetSeatMap 400, GetSeatMap 400, GetSeatMap 200, GetSeatMap 400
- **Expected:** Automatable assertion: all four runs rejected (exact status UNKNOWN -- confirm live per §7.9); no seatMapDetails returned in any run.
- **Actual:** V2 GetSeatMap: ResponseId omitted: ACCEPTED (200, the seat map is returned)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 GetSeatMap (smomitsupplier):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V2 GetSeatMap (smomitcredentialsSelector):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid CredentialsSelector (0.1s)
  - **Hop 3 &mdash; V2 GetSeatMap (smomitResponseId):** FAIL &mdash; 200 {"supplier":"AirIndia","offerId":"1a9c6faa-0957-4367-9b8d-47c275f0eccd&amp;yAnuY9IAAEOg/CaTmZGW2UhTVmhfTVRRMk5YNGd... (1.0s)
  - **Hop 4 &mdash; V2 GetSeatMap (smomitselectedOfferId):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)

### TC-AIBK-SEAT-NEG-01 — FAIL

- **Test Case:** [Book][GetSeatMap] Verify Book rejects seat selections that make no sense: a seat for an infant, a seat for an unknown passenger, a seat code that is not on the map, and a seat key for an unknown segment.
- **Category:** Negative
- **Endpoint Name:** V2 Book seat selection
- **Request:** 9 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 GetSeatMap &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, GetSeatMap 200, Book 400, Book 400, Book 400, Book 200
- **Expected:** Each invalid seat selection is rejected with a structured error and creates no PNR
- **Actual:** V2 Book: seat on an unknown segment key: ACCEPTED, PNR ZYUR7R
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (selneg):** PASS &mdash; 200 offers=62 (10.8s)
  - **Hop 2 &mdash; V2 FareConfirm (selneg):** PASS &mdash; 200 {"responseId":"b7ed8373-9ce2-40b6-af36-412e2392d90d","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (2.8s)
  - **Hop 3 &mdash; V2 AddPassenger (selneg):** PASS &mdash; 200 {"offerId":"791a5d60-fa5d-4d86-ab4b-0f1e07751a88&amp;yAsBY9IAAEo//iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNVFV2T... (1.5s)
  - **Hop 4 &mdash; V2 GetAncillary (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"791a5d60-fa5d-4d86-ab4b-0f1e07751a88&amp;yAsBY9IAAEo... (3.5s)
  - **Hop 5 &mdash; V2 GetSeatMap (selneg):** PASS &mdash; 200 {"supplier":"AirIndia","offerId":"791a5d60-fa5d-4d86-ab4b-0f1e07751a88&amp;yAsBY9IAAEo//iaTmZGW2ZRTVmhfTVRNNU1YNGd... (1.5s)
  - **Hop 6 &mdash; V2 Book (bk_seatfortheinfantpass):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Seat '3A' is assigned to multiple passengers on segment 'NjM5MzI5NjM0MDAwMDAwMDAwIUlYITEzOTEhICFERUwhTEtPITg4M (0.1s)
  - **Hop 7 &mdash; V2 Book (bk_seatforanunknownpass):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Seat '3A' is assigned to multiple passengers on segment 'NjM5MzI5NjM0MDAwMDAwMDAwIUlYITEzOTEhICFERUwhTEtPITg4M (0.1s)
  - **Hop 8 &mdash; V2 Book (bk_seatcode99Zthatisnot):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: CellId does not match CellCode '99Z' (Passenger: Pax1). (0.1s)
  - **Hop 9 &mdash; V2 Book (bk_seatonanunknownsegme):** FAIL &mdash; 200 pnr ZYUR7R (2.4s)

### FLOW-V2-55-NEG — PASS

- **Test Case:** [FC-BDL+SM-A][Request] Validate that AddPassenger rejects an INF passenger whose ParentPaxRefId does not resolve to any ADT passenger in the same passengersList.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: Bundle+SeatMap | Terminal Family A | Negative: INFANT
- **Request:** 2 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 400
- **Expected:** AddPassenger rejects the request; every INF passenger must carry a ParentPaxRefId resolving to an ADT entry present in the same request (SPEC.md 2.5). Exact rejection shape is UNKNOWN -- confirm live.
- **Actual:** All 2 calls matched: INF ParentPaxRefId does not resolve to any ADT: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid infant to adult reference
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (ap_INFParentPaxRefIddoe):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid infant to adult reference (0.2s)

### FLOW-V2-67-NEG — PASS

- **Test Case:** [FC-BDL+ANC+SM-A][Request] Validate that a passengersList submitted at AddPassenger whose count/type mix does not match what was declared at Search time is rejected or flagged.
- **Category:** Flow
- **Endpoint Name:** V2 FareConfirm-based flow | Enrichment: Bundle+Ancillary+SeatMap | Terminal Family A | Negative: PAX COUNT MISMATCH
- **Request:** 2 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 400
- **Expected:** UNKNOWN exact behavior -- not verified by any script per SPEC.md 2.5; confirm live whether the supplier/adapter rejects the mismatch or silently accepts it.
- **Actual:** All 2 calls matched: passenger mix differs from Search (1 ADT only): rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total adult passengers count must match the count of adults in the search request.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (ap_passengermixdiffersf):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total adult passengers count must match the count of adults in the search request. (0.7s)

### TC-ADDPAX-POS-01 — PASS

- **Test Case:** [AddPassenger][Request] Validate a valid passenger and contact payload is accepted.
- **Category:** Positive
- **Endpoint Name:** ADDPAX
- **Request:** 2 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 200
- **Expected:** HTTP 200; response returns non-empty offerId and responseId; capture as getAddPaxOfferId, getAddPaxResponceID (note collection variable name typo "Responce"); these supersede all prior IDs for every subsequent V2 step.
- **Actual:** All 2 calls matched: AddPassenger valid payload: 200 {"offerId":"0db6d7e5-28b2-4575-8577-41574549303d&amp;yAs/Y9IAAE2Y8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... offerId+responseId returned
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (addpos):** PASS &mdash; 200 {"offerId":"0db6d7e5-28b2-4575-8577-41574549303d&amp;yAs/Y9IAAE2Y8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... (1.8s)

### TC-ADDPAX-NEG-02 — PASS

- **Test Case:** [AddPassenger][Request] Validate a contactRefId that does not resolve in contactsList is rejected.
- **Category:** Negative
- **Endpoint Name:** ADDPAX
- **Request:** 6 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400
- **Expected:** Request is rejected (expected 4xx, exact code UNKNOWN - confirm live) since contactRefId must resolve to a key present in contactsList (§2.5 Request Rules).
- **Actual:** All 6 calls matched: contactsList empty object: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference | contactRefId missing on one passenger: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (ap_contactRefId77notinc):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference (0.2s)
  - **Hop 3 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 AddPassenger (ap_contactsListemptyobj):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference (0.2s)
  - **Hop 5 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 AddPassenger (ap_contactRefIdmissingo):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger without valid contact reference (0.1s)

### TC-ADDPAX-NEG-01 — PASS

- **Test Case:** [AddPassenger][Request] Validate an INF passenger without a valid ParentPaxRefId is rejected.
- **Category:** Negative
- **Endpoint Name:** ADDPAX
- **Request:** 6 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400
- **Expected:** Request is rejected (expected 4xx, exact code UNKNOWN - confirm live per §7.9) since every INF passenger must carry a valid ParentPaxRefId resolving to an ADT entry in the same request (§2.5 Request Rules).
- **Actual:** All 6 calls matched: infant ParentPaxRefId = unknown Pax99: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid infant to adult reference | infant ParentPaxRefId points to the child: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid infant to adult reference
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (ap_infantwithoutParentP):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid infant to adult reference (1.1s)
  - **Hop 3 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 AddPassenger (ap_infantParentPaxRefId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid infant to adult reference (0.1s)
  - **Hop 5 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 AddPassenger (ap_infantParentPaxRefId):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid infant to adult reference (0.1s)

### TC-ADDPAX-VAL-01 — PASS

- **Test Case:** [AddPassenger][Request] Validate passenger count/type mix against what was declared at Search time.
- **Category:** Validation
- **Endpoint Name:** ADDPAX
- **Request:** 8 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400
- **Expected:** Behavior is UNKNOWN - not verified by any script per SPEC.md §2.5; this is a genuine coverage gap. Manually confirm live whether the mismatch is silently accepted, rejected by AddPassenger itself, or rejected later at Book/Hold, and record the result as the baseline going forward.
- **Actual:** All 8 calls matched: 5 passengers sent: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total adult passengers count must match the count of adults in the search request. | 1 passenger sent: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total adult passengers count must match the count of adults in the search request.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (ap_3passengerssentfora2):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total infants passengers count must match the count of infants in the search request. (1.1s)
  - **Hop 3 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 AddPassenger (ap_2ADT2CHDsenttypemixd):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total children passengers count must match the count of children in the search request. (0.6s)
  - **Hop 5 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 AddPassenger (ap_5passengerssent):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total adult passengers count must match the count of adults in the search request. (0.1s)
  - **Hop 7 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 8 &mdash; V2 AddPassenger (ap_1passengersent):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total adult passengers count must match the count of adults in the search request. (0.1s)

### TC-ADDPAX-BND-01 — PASS

- **Test Case:** [AddPassenger][Request] Validate handling of a non-Latin-script passenger name.
- **Category:** Boundary
- **Endpoint Name:** ADDPAX
- **Request:** 3 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, FareConfirm 200, AddPassenger 400
- **Expected:** Behavior is UNKNOWN - every observed example in the collection uses Latin-script names only (§2.5 Testing Notes); confirm live whether non-Latin names are accepted, transliterated, or rejected, and record the result. Given ~38 suppliers span many non-English-speaking home markets, this is a realistic, currently-unexercised boundary.
- **Actual:** All 3 calls matched: Arabic-script names: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only. (rejected cleanly)
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 AddPassenger (arabic):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only. (0.6s)

### TC-AIEGY-ADDPAX-VAL-02 — PASS

- **Test Case:** [AddPassenger][Validation] Verify AddPassenger rejects invalid contact data: malformed email, non-numeric phone, empty phone, missing country code.
- **Category:** Validation
- **Endpoint Name:** ADDPAX
- **Request:** 10 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400
- **Expected:** 4xx with a structured error envelope, no PNR, no 5xx for every invalid contact.
- **Actual:** All 10 calls matched: missing country dialing code: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The CountryDialingCode field is required. | email missing: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The Email field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (ap_malformedemail):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: 'Email' is not a valid email address. (0.1s)
  - **Hop 3 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 AddPassenger (ap_nonnumericphone):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: 'Phone Phone Number' is not in the correct format. (0.1s)
  - **Hop 5 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 AddPassenger (ap_emptyphone):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger contact information is invalid. (0.6s)
  - **Hop 7 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 8 &mdash; V2 AddPassenger (ap_missingcountrydialin):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The CountryDialingCode field is required. (0.1s)
  - **Hop 9 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 10 &mdash; V2 AddPassenger (ap_emailmissing):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Email field is required. (0.1s)

### TC-AIBK-NAME-01 — FAIL

- **Test Case:** [Book][Validation] Verify a booking for a passenger with a hyphenated surname (Al-Sayed) completes and the name is returned unchanged.
- **Category:** Validation
- **Endpoint Name:** V2 booking: passenger name
- **Request:** 4 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, Search 200, FareConfirm 200, AddPassenger 400
- **Expected:** AddPassenger and Book accept the name; Book and Retrieve return it unchanged
- **Actual:** V2 Search: Search returned an empty offers[] (HTTP 200) after 15.1 s; retried (setup) - see the slow/empty Search finding | V2 AddPassenger: AddPassenger failed: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only.
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (name01):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (name01retry1):** PASS &mdash; 200 offers=67 (6.9s)
  - **Hop 3 &mdash; V2 FareConfirm (name01):** PASS &mdash; 200 {"responseId":"71937191-16e1-4ed6-ac6f-d9e495c80a13","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (1.2s)
  - **Hop 4 &mdash; V2 AddPassenger (name01):** FAIL &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only. (0.1s)

### TC-AIBK-NAME-02 — FAIL

- **Test Case:** [Book][Validation] Verify a booking for a passenger with a apostrophe surname (O'Neil) completes and the name is returned unchanged.
- **Category:** Validation
- **Endpoint Name:** V2 booking: passenger name
- **Request:** 4 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, Search 200, FareConfirm 200, AddPassenger 400
- **Expected:** AddPassenger and Book accept the name; Book and Retrieve return it unchanged
- **Actual:** V2 Search: Search returned an empty offers[] (HTTP 200) after 15.1 s; retried (setup) - see the slow/empty Search finding | V2 AddPassenger: AddPassenger failed: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only.
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (name02):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (name02retry1):** PASS &mdash; 200 offers=71 (7.0s)
  - **Hop 3 &mdash; V2 FareConfirm (name02):** PASS &mdash; 200 {"responseId":"4aef9784-0936-4ed4-bd08-4ca72d704cb3","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (2.0s)
  - **Hop 4 &mdash; V2 AddPassenger (name02):** FAIL &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only. (0.1s)

### TC-AIBK-ADDPAX-REPEAT-01 — FAIL

- **Test Case:** [AddPassenger][Integration] Verify AddPassenger can be called a second time for the same FareConfirm offer (to correct a passenger detail) and the corrected data is what gets booked.
- **Category:** Integration
- **Endpoint Name:** V2 AddPassenger
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, Search 200, FareConfirm 200, AddPassenger 200, AddPassenger 409
- **Expected:** The second AddPassenger succeeds and replaces the first, or is rejected with a clear, mapped error; it must not fail with an unmapped catch-all error
- **Actual:** V2 AddPassenger: second AddPassenger on the same offer: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Duplicate contact type 'P' detected.
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 Search (srchN1):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 AddPassenger (rep1):** PASS &mdash; 200 {"offerId":"58c52adf-df92-4595-a5ee-e13bdf5c9da3&amp;yApNY9IAAEY38BKTmZGW2ZRTVmhfTVRFd09INGdmbjVFUlV4X01USXZNakEEA... (1.0s)
  - **Hop 5 &mdash; V2 AddPassenger (rep2):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Duplicate contact type 'P' detected. (0.3s)

### TC-AIEGY-ADDPAX-VAL-01 — PASS

- **Test Case:** [AddPassenger][Validation] Verify AddPassenger rejects invalid passenger data: missing name/birthDate/document number, expired passport, future birth date, child with adult birth date, infant over 2 years, invalid gender and title.
- **Category:** Validation
- **Endpoint Name:** ADDPAX
- **Request:** 20 call(s): V2 FareConfirm &gt; V2 AddPassenger
- **Response:** FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 409, FareConfirm 200, AddPassenger 409, FareConfirm 200, AddPassenger 400, FareConfirm 200, AddPassenger 400
- **Expected:** 4xx with a structured error envelope, no PNR, no 5xx for every invalid variant (a variant that is accepted would reach Book with data the airline will refuse).
- **Actual:** All 20 calls matched: invalid gender "x": rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. | invalid title "Zzz": rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 AddPassenger (ap_firstnamemissing):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The First field is required. (0.1s)
  - **Hop 3 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 AddPassenger (ap_lastnamemissing):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The Last field is required. (0.1s)
  - **Hop 5 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 AddPassenger (ap_birthDatemissing):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: 'Birth Date' must not be empty. (0.1s)
  - **Hop 7 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 8 &mdash; V2 AddPassenger (ap_documentnumbermissin):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid travel document information (0.6s)
  - **Hop 9 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 10 &mdash; V2 AddPassenger (ap_expiredpassport2020):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid travel document information (0.1s)
  - **Hop 11 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 12 &mdash; V2 AddPassenger (ap_futurebirthdate):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: 'Birth Date' must be less than '11/2/2026 12:00:00 AM'. (0.1s)
  - **Hop 13 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 14 &mdash; V2 AddPassenger (ap_childwithanadultbirt):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Laila Shawky - Age 41 : Age is not between 2 and 12 for flight on 17Dec2026 which is required for PaxType 'Chi (1.0s)
  - **Hop 15 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 16 &mdash; V2 AddPassenger (ap_infantolderthan2year):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Infant Lina Abbas age is outside the age limit of 24 month(s) for flight on 17Dec2026. (2.0s)
  - **Hop 17 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 18 &mdash; V2 AddPassenger (ap_invalidgenderx):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (0.1s)
  - **Hop 19 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 20 &mdash; V2 AddPassenger (ap_invalidtitleZzz):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The addPaxRequestDto field is required. (0.1s)

### TC-AIBK-NAME-05 — PASS

- **Test Case:** [AddPassenger][Validation] Verify duplicate passengers are handled: the same name and birth date twice, and the same passport number for two passengers.
- **Category:** Validation
- **Endpoint Name:** V2 AddPassenger
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, FareConfirm 200, AddPassenger 400, Search 200, FareConfirm 200, AddPassenger 400
- **Expected:** Duplicate passengers or a shared passport number are rejected, or accepted without a server error
- **Actual:** All 6 calls matched: same name and birth date twice: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Duplicate passengers detected | same passport number for two passengers: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid travel document information
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 AddPassenger (dup):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Duplicate passengers detected (0.1s)
  - **Hop 4 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 5 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 AddPassenger (dup):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Invalid travel document information (0.1s)

### TC-AIBK-NAME-04 — PASS

- **Test Case:** [AddPassenger][Validation] Verify invalid names are refused: digits, symbols, spaces only, empty and 100 characters.
- **Category:** Validation
- **Endpoint Name:** V2 AddPassenger
- **Request:** 15 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, FareConfirm 200, AddPassenger 400, Search 200, FareConfirm 200, AddPassenger 400, Search 200, FareConfirm 200, AddPassenger 400, Search 200, FareConfirm 200, AddPassenger 400, Search 200, FareConfirm 200, AddPassenger 400
- **Expected:** Each invalid name is rejected with a structured 4xx error
- **Actual:** All 15 calls matched: first name empty: rejected - 400 1001 "Validation errors occurred. Please check your request." ctx: The First field is required. | 100-character last name: rejected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The length of 'Name Last' must be 50 characters or fewer. You entered 100 characters.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 AddPassenger (ap_digitsinfirstnameJ0h):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only. (1.3s)
  - **Hop 4 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 5 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 6 &mdash; V2 AddPassenger (ap_symbolsinlastname):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only. (0.1s)
  - **Hop 7 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 8 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 9 &mdash; V2 AddPassenger (ap_firstnameonlyspaces):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The First field is required. (0.1s)
  - **Hop 10 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 11 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 12 &mdash; V2 AddPassenger (ap_firstnameempty):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The First field is required. (0.1s)
  - **Hop 13 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 14 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 15 &mdash; V2 AddPassenger (ap_100characterlastname):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The length of 'Name Last' must be 50 characters or fewer. You entered 100 characters. (0.1s)

### TC-AIBK-ADDPAX-BND-01 — FAIL

- **Test Case:** [AddPassenger][Boundary] Verify the age boundaries are enforced against the travel date: a child just under 12 and an infant just under 2 are accepted; a child just over 12 and an infant just over 2 are rejected.
- **Category:** Boundary
- **Endpoint Name:** V2 AddPassenger
- **Request:** 14 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, Search 200, Search 200, FareConfirm 200, AddPassenger 200, Search 200, FareConfirm 200, AddPassenger 200, Search 200, FareConfirm 200, AddPassenger 200, Search 200, FareConfirm 200, AddPassenger 409
- **Expected:** CHD born 11y11m and INF born 23m accepted; CHD born 12y1m and INF born 25m rejected with a structured error
- **Actual:** V2 AddPassenger: child aged 12 years 1 month: ACCEPTED - 200 {"offerId":"0d115c41-517f-423c-9a3e-f7f57f78c1a2&amp;yAuaY9IAAInU8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGt2T...
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 2 &mdash; V2 Search (srchN1):** PASS &mdash; 200
  - **Hop 3 &mdash; V2 Search (srchN2):** PASS &mdash; 200
  - **Hop 4 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 5 &mdash; V2 AddPassenger (age):** PASS &mdash; 200 {"offerId":"296e5f45-4666-4d29-8fc1-1b789eeadb94&amp;yAskY9IAAE0J/SaTmZGW2ZRTVmhfTVRjNE0zNGdmbjVFUlV4X01USXZNakV2T... (1.4s)
  - **Hop 6 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 7 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 8 &mdash; V2 AddPassenger (age):** PASS &mdash; 200 {"offerId":"2d908770-80c3-470c-a8a3-d1aab046c0b9&amp;yAshY9IAAEz+8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGt2T... (1.7s)
  - **Hop 9 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 10 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 11 &mdash; V2 AddPassenger (age):** FAIL &mdash; 200 {"offerId":"0d115c41-517f-423c-9a3e-f7f57f78c1a2&amp;yAuaY9IAAInU8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGt2T... (1.4s)
  - **Hop 12 &mdash; V2 Search (srchN0):** PASS &mdash; 200
  - **Hop 13 &mdash; V2 FareConfirm (fcv):** PASS &mdash; 200
  - **Hop 14 &mdash; V2 AddPassenger (age):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Infant Lina Ragab age is outside the age limit of 24 month(s) for flight on 19Dec2026. (1.3s)

### TC-SEARCH-NEG-01 — PASS

- **Test Case:** [Search][Request] Validate Search request is rejected when the supplier field is omitted.
- **Category:** Negative
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 400, Search 400
- **Expected:** Request rejected; exact status code and body shape UNKNOWN per section 7.9 -- confirm live and record as the baseline for this class of missing-required-field test.
- **Actual:** All 2 calls matched: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier | rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (neg01):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.4s)
  - **Hop 2 &mdash; V2 Search (neg01):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)

### TC-SEARCH-NEG-02 — PASS

- **Test Case:** [Search][Request] Validate Search request is rejected when searchCriteria is omitted.
- **Category:** Negative
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 400, Search 400
- **Expected:** Request rejected; exact status code/body UNKNOWN, confirm live.
- **Actual:** All 2 calls matched: rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. | rejected as expected - 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (neg02):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. (0.4s)
  - **Hop 2 &mdash; V2 Search (neg02):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. (0.7s)

### TC-AIEGY-SRCH-PAX-04 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected for an infant travelling with no adult (INF 1).
- **Category:** Negative
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 400, Search 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 calls matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. | rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (infonly):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.4s)
  - **Hop 2 &mdash; V2 Search (infonly):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.1s)

### TC-AIEGY-SRCH-PAX-05 — PASS

- **Test Case:** [Search][Request] Validate Search is rejected when there are more infants than adults (ADT 1, INF 2).
- **Category:** Negative
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 400, Search 400
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** All 2 calls matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. | rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (moreinf):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.1s)
  - **Hop 2 &mdash; V2 Search (moreinf):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: INF count must be less than or equal to ADT count. (0.1s)

### TC-AIEGY-SRCH-PAX-03 — FAIL

- **Test Case:** [Search][Request] Validate Search is rejected for a child travelling with no adult (CHD 1).
- **Category:** Negative
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** V1 Search: V1 Search for one child and no adult was not rejected cleanly: 200 offers=64 | V2 Search: V2 Search for one child and no adult was not rejected cleanly: 200 offers=64
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (chdonly):** FAIL &mdash; 200 offers=64 (5.7s)
  - **Hop 2 &mdash; V2 Search (chdonly):** FAIL &mdash; 200 offers=64 (4.4s)

### TC-SEARCH-NEG-03 — PASS

- **Test Case:** [Search][Request] Validate Search behavior for an invalid or lowercase IATA origin/destination code.
- **Category:** Negative
- **Endpoint Name:** SEARCH
- **Request:** 4 call(s): V1 Search &gt; V2 Search
- **Response:** Search 409, Search 200, Search 409, Search 200
- **Expected:** UNKNOWN whether an invalid code 4xx's or returns an empty offers[] 200; case-sensitivity of IATA codes is also UNKNOWN -- confirm both live.
- **Actual:** All 4 calls matched: V2 origin XXX: 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Station does not exist. StationCode = XXX | V2 origin del (lowercase): 200 offers=64
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (neg03):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Station does not exist. StationCode = XXX (3.0s)
  - **Hop 2 &mdash; V1 Search (neg03):** PASS &mdash; 200 offers=64 (4.3s)
  - **Hop 3 &mdash; V2 Search (neg03):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: Station does not exist. StationCode = XXX (0.5s)
  - **Hop 4 &mdash; V2 Search (neg03):** PASS &mdash; 200 offers=64 (4.3s)

### TC-SEARCH-VAL-01 — PASS

- **Test Case:** [Search][Response] Verify Search response's supplier field matches the request's supplier value verbatim.
- **Category:** Validation
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200
- **Expected:** supplier is echoed back unchanged; no silent normalization/casing change.
- **Actual:** All 2 calls matched: V1 response supplier AirIndia (sent AirIndia) | V2 response supplier AirIndia (sent AirIndia)
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (val01):** PASS &mdash; 200 offers=64 (4.7s)
  - **Hop 2 &mdash; V2 Search (val01):** PASS &mdash; 200 offers=64 (4.6s)

### TC-SEARCH-POS-01 — PASS

- **Test Case:** [Search][Request] Verify a valid multi-field Search request returns a non-empty offers array for a supported route.
- **Category:** Positive
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200
- **Expected:** HTTP 200; offers[] non-empty; every offer carries offerId, priceDetails, and haveBundles/canBeHeld/offerHasAncillary/isSeatMapRequired flags; responseId present and usable downstream as searchResponseId (V1) / ResponseId (V2)
- **Actual:** All 2 calls matched: V1: 64 offers, responseId present, 0 offers missing offerId/priceDetails/flags | V2: 64 offers, responseId present, 0 offers missing offerId/priceDetails/flags
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (pos01):** PASS &mdash; 200 offers=64 (13.4s)
  - **Hop 2 &mdash; V2 Search (pos01):** PASS &mdash; 200 offers=64 (11.4s)

### TC-SEARCH-BND-03 — FAIL

- **Test Case:** [Search][Request] Validate Search rejects a total passenger count of 10, one over the confirmed 9-passenger maximum.
- **Category:** Boundary
- **Endpoint Name:** SEARCH
- **Request:** 4 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 400, Search 200, Search 400
- **Expected:** Rejected; exact rejection point (4xx at Search itself vs accepted-then-rejected downstream) is UNKNOWN -- confirm live and record.
- **Actual:** V1 Search: V1 Search with 10 passengers (8 ADT + 1 CHD + 1 INF) was not rejected cleanly: 200 offers=0 | V2 Search: V2 Search with 10 passengers (8 ADT + 1 CHD + 1 INF) was not rejected cleanly: 200 offers=78
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (bnd03):** FAIL &mdash; 200 offers=0 (15.5s)
  - **Hop 2 &mdash; V1 Search (bnd03b):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9. (0.1s)
  - **Hop 3 &mdash; V2 Search (bnd03):** FAIL &mdash; 200 offers=78 (14.7s)
  - **Hop 4 &mdash; V2 Search (bnd03b):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Total passengers (ADT + CHD) cannot exceed 9. (0.1s)

### TC-AIEGY-SRCH-PAX-06 — FAIL

- **Test Case:** [Search][Request] Validate Search rejects a party of 10 that is over the limit only because of infants (6 ADT, 2 CHD, 2 INF).
- **Category:** Boundary
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200
- **Expected:** 4xx with a structured error envelope (ErrorCode / ErrorMessage), no PNR, no 5xx
- **Actual:** V1 Search: V1 Search for 10 passengers (6 ADT + 2 CHD + 2 INF) was not rejected cleanly: 200 offers=0 | V2 Search: V2 Search for 10 passengers (6 ADT + 2 CHD + 2 INF) was not rejected cleanly: 200 offers=0
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (ten):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (ten):** FAIL &mdash; 200 offers=0 (15.1s)

### TC-SEARCH-REG-01 — PASS

- **Test Case:** [Search][Response] Verify Search response schema matches the baseline [Observed example] shape with no unexpected field removal, rename, or retype.
- **Category:** Regression
- **Endpoint Name:** SEARCH
- **Request:** 1 call(s): V2 Search
- **Response:** Search 200
- **Expected:** Schema matches the baseline exactly; any drift (field renamed, removed, or retyped) is reported as a regression even if the flow otherwise passes.
- **Actual:** Matched: top-level keys missing [], offer keys missing []; extra offer keys: offerHasSeat,isBundleRequired,sellBundleRequiresAncillary
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (reg01):** PASS &mdash; 200 offers=64 (13.0s)

### TC-SEARCH-BIZ-02 — PASS

- **Test Case:** [Search][Response] Verify the per-passenger-type price-reconciliation formula holds on every returned Search offer.
- **Category:** Business Rule
- **Endpoint Name:** SEARCH
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200
- **Expected:** All four reconciliation checks hold for every offer and every passenger type present.
- **Actual:** All 2 calls matched: V1: 64 offers checked, 0 fail reconciliation | V2: 64 offers checked, 0 fail reconciliation
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (biz02):** PASS &mdash; 200 offers=64 (11.5s)
  - **Hop 2 &mdash; V2 Search (biz02):** PASS &mdash; 200 offers=64 (12.8s)

### TC-AIEGY-HP-SEARCH-03 — PASS

- **Test Case:** [Search][Regression] Verify V1 and V2 Search return the same offers (same count, same prices) for identical criteria.
- **Category:** Regression
- **Endpoint Name:** VERSIONDIFF
- **Request:** 2 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200
- **Expected:** Same offer count and the same multiset of total prices on both versions.
- **Actual:** All 2 calls matched: V1 64 offers | V2 64 offers vs V1 64; price lists identical
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (hp3):** PASS &mdash; 200 offers=64 (4.8s)
  - **Hop 2 &mdash; V2 Search (hp3):** PASS &mdash; 200 offers=64 (5.7s)

### TC-SEARCH-BND-02 — FAIL

- **Test Case:** [Search][Request] Validate Search accepts a total passenger count of exactly 9 (ADT+CHD+INF combined).
- **Category:** Boundary
- **Endpoint Name:** SEARCH
- **Request:** 4 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200, Search 200, Search 200
- **Expected:** HTTP 200; offers returned normally; no passenger-count rejection at the confirmed upper bound.
- **Actual:** V1 Search: V1 4 ADT + 3 CHD + 2 INF: 200 offers=0 (15.1s) | V2 Search: V2 4 ADT + 3 CHD + 2 INF: 200 offers=0 (15.1s)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (bnd02):** PASS &mdash; 200 offers=78 (6.7s)
  - **Hop 2 &mdash; V2 Search (bnd02):** PASS &mdash; 200 offers=78 (6.3s)
  - **Hop 3 &mdash; V1 Search (bnd02):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 4 &mdash; V2 Search (bnd02):** FAIL &mdash; 200 offers=0 (15.1s)

### TC-AIBK-SRCH-PERF-01 — FAIL

- **Test Case:** [Search][Reliability] Verify Search for parties with children and infants returns offers promptly and never answers a silent empty result.
- **Category:** Business Rule
- **Endpoint Name:** V2 Search
- **Request:** 12 call(s): V2 Search
- **Response:** Search 200, Search 200, Search 200, Search 200, Search 200, Search 200, Search 200, Search 200, Search 200, Search 200, Search 200, Search 200
- **Expected:** Each Search with a child and/or infant returns offers (200, non-empty) within a reasonable time, or a mapped error; no empty 200 after a fixed ~15 s stall
- **Actual:** V2 Search: 2 ADT + 1 CHD + 1 INF #2: 56 offers in 14.1s (slow) | V2 Search: 2 ADT + 1 CHD + 1 INF #1: 67 offers in 14.3s (slow) | V2 Search: 1 ADT + 1 INF #1: 70 offers in 14.5s (slow)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (perf00):** FAIL &mdash; 200 offers=0 (15.1s)
  - **Hop 2 &mdash; V2 Search (perf01):** FAIL &mdash; 200 offers=0 (15.5s)
  - **Hop 3 &mdash; V2 Search (perf02):** FAIL &mdash; 200 offers=0 (15.4s)
  - **Hop 4 &mdash; V2 Search (perf10):** FAIL &mdash; 200 offers=0 (15.3s)
  - **Hop 5 &mdash; V2 Search (perf11):** FAIL &mdash; 200 offers=0 (15.4s)
  - **Hop 6 &mdash; V2 Search (perf12):** FAIL &mdash; 200 offers=0 (15.4s)
  - **Hop 7 &mdash; V2 Search (perf21):** FAIL &mdash; 200 offers=56 (14.1s)
  - **Hop 8 &mdash; V2 Search (perf20):** FAIL &mdash; 200 offers=67 (14.3s)
  - **Hop 9 &mdash; V2 Search (perf22):** FAIL &mdash; 200 offers=69 (15.0s)
  - **Hop 10 &mdash; V2 Search (perf30):** FAIL &mdash; 200 offers=70 (14.5s)
  - **Hop 11 &mdash; V2 Search (perf31):** FAIL &mdash; 200 offers=56 (14.7s)
  - **Hop 12 &mdash; V2 Search (perf32):** FAIL &mdash; 200 offers=69 (15.4s)

### TC-AIEGY-HP-SEARCH-04 — PASS

- **Test Case:** [Search][Validation] Verify offer content integrity: unique offerIds, currency consistent across all price objects, no negative or zero fares, refundability and flags limited to known values.
- **Category:** Validation
- **Endpoint Name:** SEARCH
- **Request:** 1 call(s): V2 Search
- **Response:** Search 200
- **Expected:** offerIds unique; one currency (INR) in every price object; amounts &gt; 0; refundability in the known set ("UnKnown"); booleans typed boolean; baggageDetails/priceClasses referenced by segmentDetails exist.
- **Actual:** Matched: 64 offers: 64 unique ids, currencies INR, 0 non-positive totals, 0 dangling journey references
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (hp4):** PASS &mdash; 200 offers=64 (12.4s)

### TC-SEARCH-SEC-01 — FAIL

- **Test Case:** [Search][Request] Verify isdebug=true on Search exposes raw supplierRequest/supplierResponse fields, and confirm whether isdebug=false or omitted suppresses them.
- **Category:** Security
- **Endpoint Name:** SEARCH
- **Request:** 6 call(s): V1 Search &gt; V2 Search
- **Response:** Search 200, Search 200, Search 200, Search 200, Search 200, Search 200
- **Expected:** With isdebug=true, supplierRequest/supplierResponse are present and may contain raw upstream SOAP/XML; the AirArabia observed example's supplierResponse contained apparent live supplier SOAP credentials (wsse:Username/wsse:Password) in plaintext -- any such exposure must be flagged explicitly. Behavior of isdebug=false/omitted is UNKNOWN and must be confirmed live.
- **Actual:** V1 Search: V1 isdebug=true: supplierRequest/supplierResponse RETURNED and contain supplier credentials in plaintext (values redacted in this report) | V2 Search: V2 isdebug=true: supplierRequest/supplierResponse RETURNED and contain supplier credentials in plaintext (values redacted in this report)
- **Status:** FAIL
- **Evidence:** credential leaks in isdebug=true responses: 2 of 2

  - **Hop 1 &mdash; V1 Search (sec01isdebugtrue):** FAIL &mdash; 200 offers=64 (4.4s)
  - **Hop 2 &mdash; V2 Search (sec01isdebugtrue):** FAIL &mdash; 200 offers=64 (6.4s)
  - **Hop 3 &mdash; V1 Search (sec01isdebugfalse):** PASS &mdash; 200 offers=64 (5.2s)
  - **Hop 4 &mdash; V2 Search (sec01isdebugfalse):** PASS &mdash; 200 offers=64 (4.8s)
  - **Hop 5 &mdash; V1 Search (sec01isdebugomitted):** PASS &mdash; 200 offers=64 (4.4s)
  - **Hop 6 &mdash; V2 Search (sec01isdebugomitted):** PASS &mdash; 200 offers=64 (5.2s)

### TC-FARECONFIRM-POS-01 — PASS

- **Test Case:** [FareConfirm][Request] Verify FareConfirm returns a re-priced selectedOffer for a valid same-call responseId + selectedOfferId pair.
- **Category:** Positive
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V2 Search &gt; V2 FareConfirm
- **Response:** Search 200, FareConfirm 200
- **Expected:** HTTP 200; selectedOffer present with offerId, priceDetails, refundability; V2 additionally carries haveBundles/canBeHeld/isAncillaryRequired/offerHasAncillary/isBaggageRequired/isMealRequired/isSeatMapRequired flags not present in V1's shape.
- **Actual:** FareConfirm 200 with offerId, priceDetails, refundability "UnKnown"; V2 capability flags present on selectedOffer
- **Status:** PASS
- **Evidence:** OK: FareConfirm 200 with offerId, priceDetails, refundability "UnKnown" | OK: V2 capability flags present on selectedOffer

  - **Hop 1 &mdash; V2 Search (s5base):** PASS &mdash; 200 offers=64 (12.1s)
  - **Hop 2 &mdash; V2 FareConfirm (s5base):** PASS &mdash; 200 {"responseId":"0b5edbf7-b828-4acb-a43a-4fd516921289","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)

### TC-FARECONFIRM-BIZ-02 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify capability flags (haveBundles/canBeHeld/offerHasAncillary/isSeatMapRequired) stay consistent between Search and FareConfirm for the same offer.
- **Category:** Business Rule
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V2 Search &gt; V2 FareConfirm
- **Response:** Search 200, FareConfirm 200
- **Expected:** Flags match between the two responses for the same offer; a flag flipping between steps is itself a defect worth reporting, not expected behavior.
- **Actual:** capability flags identical between Search and FareConfirm for the same offer
- **Status:** PASS
- **Evidence:** OK: capability flags identical between Search and FareConfirm for the same offer

  - **Hop 1 &mdash; V2 Search (s5base):** PASS &mdash; 200 offers=64 (12.1s)
  - **Hop 2 &mdash; V2 FareConfirm (s5base):** PASS &mdash; 200 {"responseId":"0b5edbf7-b828-4acb-a43a-4fd516921289","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)

### TC-FARECONFIRM-INT-01 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify Search's responseId and offers[0].offerId hand off correctly into FareConfirm's required fields.
- **Category:** Integration
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V2 Search &gt; V2 FareConfirm
- **Response:** Search 200, FareConfirm 200
- **Expected:** FareConfirm succeeds using only Search's own output, with no manual field substitution beyond the documented name mapping.
- **Actual:** FareConfirm succeeded using only Search's responseId and offerId
- **Status:** PASS
- **Evidence:** OK: FareConfirm succeeded using only Search's responseId and offerId

  - **Hop 1 &mdash; V2 Search (s5base):** PASS &mdash; 200 offers=64 (12.1s)
  - **Hop 2 &mdash; V2 FareConfirm (s5base):** PASS &mdash; 200 {"responseId":"0b5edbf7-b828-4acb-a43a-4fd516921289","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)

### TC-SUPPLIER-BIZ-01 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify the generic pre-flow capability-confirmation procedure -- Search's per-offer flags re-confirmed at FareConfirm -- before scheduling any flow against a given supplier.
- **Category:** Business Rule
- **Endpoint Name:** SUPPLIER
- **Request:** 2 call(s): V2 Search &gt; V2 FareConfirm
- **Response:** Search 200, FareConfirm 200
- **Expected:** Both steps' flags agree with each other; the confirmed result is recorded before any flow from section 5 requiring that capability is scheduled against this supplier.
- **Actual:** haveBundles true (Bundle supported); offerHasAncillary true (Ancillary supported); offerHasSeat true (SeatMap supported); canBeHeld false (Hold not supported; matches the supplier matrix)
- **Status:** PASS
- **Evidence:** OK: haveBundles true (Bundle supported) | OK: offerHasAncillary true (Ancillary supported) | OK: offerHasSeat true (SeatMap supported) | OK: canBeHeld false (Hold not supported; matches the supplier matrix) | OK: Search and FareConfirm flags agree

  - **Hop 1 &mdash; V2 Search (s5base):** PASS &mdash; 200 offers=64 (12.1s)
  - **Hop 2 &mdash; V2 FareConfirm (s5base):** PASS &mdash; 200 {"responseId":"0b5edbf7-b828-4acb-a43a-4fd516921289","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (0.9s)

### TC-BUNDLE-NEG-01 — BLOCKED

- **Test Case:** [GetOfferBundles][Request] Validate GetOfferBundles behavior when called for an offer with haveBundles=false.
- **Category:** Negative
- **Endpoint Name:** BUNDLE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** UNKNOWN exact result (empty bundleChoices vs explicit error) -- confirm live; a bundle-incapable offer should not silently return usable bundle data.
- **Actual:** No offer with haveBundles=false exists on AirIndia/EGY (all offers report true), so the 409-for-non-bundle-offer behaviour cannot be exercised.
- **Status:** BLOCKED
- **Evidence:** 

### TC-BUNDLE-POS-01 — PASS

- **Test Case:** [GetOfferBundles][Request] Verify GetOfferBundles returns bundleChoices for an offer with haveBundles=true.
- **Category:** Positive
- **Endpoint Name:** BUNDLE
- **Request:** 1 call(s): V2 GetOfferBundles
- **Response:** GetOfferBundles 200
- **Expected:** bundleChoices populated with bundleCode/bundleName/bundlePrices/includedServices per bundle; offerJourneys is a map keyed by segmentRefId, each with a bundleReferences array.
- **Actual:** 4 bundleChoices; each bundle has code, name, prices and includedServices; offerJourneys references resolve to bundleChoices
- **Status:** PASS
- **Evidence:** OK: 4 bundleChoices | OK: each bundle has code, name, prices and includedServices | OK: offerJourneys references resolve to bundleChoices

  - **Hop 1 &mdash; V2 GetOfferBundles (s5base):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjQvMjAyNiAxODozNX5HT1h_MTIvMjQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.2s)

### TC-BUNDLE-REG-01 — PASS

- **Test Case:** [GetOfferBundles][Response] Verify the JourneyKey1 script variable (resp.offerJourneys.key) is undefined against the real offerJourneys shape, in both V1 and V2 collections.
- **Category:** Regression
- **Endpoint Name:** BUNDLE
- **Request:** 1 call(s): V2 GetOfferBundles
- **Response:** GetOfferBundles 200
- **Expected:** resp.offerJourneys.key evaluates to undefined since offerJourneys has no literal key property; JourneyKey1 does not appear to be consumed by any other request in either collection (likely a dead/inert variable), but the mismatch should still be reported as a script/response-shape defect.
- **Actual:** resp.offerJourneys.key is undefined against the real keyed-by-segment shape (JourneyKey1 script variable never gets a value); offerJourneys keys: 1
- **Status:** PASS
- **Evidence:** OK: resp.offerJourneys.key is undefined against the real keyed-by-segment shape (JourneyKey1 script variable never gets a value); offerJourneys keys: 1

  - **Hop 1 &mdash; V2 GetOfferBundles (s5base):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjQvMjAyNiAxODozNX5HT1h_MTIvMjQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.2s)

### TC-BUNDLE-VAL-02 — PASS

- **Test Case:** [GetOfferBundles][Response] Validate bundleChoices keys are a subset of the bundleReferences listed per journey in offerJourneys.
- **Category:** Validation
- **Endpoint Name:** BUNDLE
- **Request:** 1 call(s): V2 GetOfferBundles
- **Response:** GetOfferBundles 200
- **Expected:** Every bundleReferences code maps to a real bundleChoices entry; no orphaned references.
- **Actual:** 0 bundleReferences without a bundleChoices entry; 0 bundleChoices not referenced by any journey
- **Status:** PASS
- **Evidence:** OK: 0 bundleReferences without a bundleChoices entry | OK: 0 bundleChoices not referenced by any journey

  - **Hop 1 &mdash; V2 GetOfferBundles (s5base):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjQvMjAyNiAxODozNX5HT1h_MTIvMjQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.2s)

### TC-BUNDLE-VAL-03 — PASS

- **Test Case:** [GetOfferBundles][Response] Validate includedServices mixes machine-readable tags with free-text rule strings, and known tags remain a subset rather than an exact-match set.
- **Category:** Validation
- **Endpoint Name:** BUNDLE
- **Request:** 1 call(s): V2 GetOfferBundles
- **Response:** GetOfferBundles 200
- **Expected:** Assertion passes as long as known tags are present as a subset; the array is not asserted to equal a fixed set, since human-readable rule strings coexist in the same array.
- **Actual:** includedServices is an array on every bundle; known tags present: none; entries are free text (meal names), e.g. ["Cheddar Chives Omelette with Filter Coffee","Mini Idli with Filter Coffee"]
- **Status:** PASS
- **Evidence:** OK: includedServices is an array on every bundle | OK: known tags present: none; entries are free text (meal names), e.g. ["Cheddar Chives Omelette with Filter Coffee","Mini Idli with Filter Coffee"]

  - **Hop 1 &mdash; V2 GetOfferBundles (s5base):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjQvMjAyNiAxODozNX5HT1h_MTIvMjQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.2s)

### TC-AIEGY-BDL-01 — FAIL

- **Test Case:** [GetOfferBundles][Validation] Verify bundle data is customer-readable: bundleName differs from the raw code, base bundle is not named after an airport, every bundle lists what it includes, prices are non-negative per passenger type.
- **Category:** Validation
- **Endpoint Name:** BUNDLE
- **Request:** 1 call(s): V2 GetOfferBundles
- **Response:** GetOfferBundles 200
- **Expected:** bundleName is a human-readable product name distinct from bundleCode; no bundle is named after an IATA airport code; includedServices non-empty for a priced bundle; prices &gt;= 0, one per passenger type.
- **Actual:** 3 of 4 bundles have bundleName equal to the raw code (DEL,NCOC,VIVC); bundle named after an airport code (DEL); no bundle has a bundlePrices entry for the infant passenger type present in the party; 1 bundles list no includedServices
- **Status:** FAIL
- **Evidence:** FAIL: 3 of 4 bundles have bundleName equal to the raw code (DEL,NCOC,VIVC); bundle named after an airport code (DEL); no bundle has a bundlePrices entry for the infant passenger type present in the party; 1 bundles list no includedServices

  - **Hop 1 &mdash; V2 GetOfferBundles (s5base):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjQvMjAyNiAxODozNX5HT1h_MTIvMjQvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (4.2s)

### TC-VERSIONDIFF-NEG-02 — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book] [Response] Verify an identical invalid supplier/credentialsSelector value produces the same error shape across Search, FareConfirm, and Book.
- **Category:** Negative
- **Endpoint Name:** VERSIONDIFF
- **Request:** 3 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 Book
- **Response:** Search 400, FareConfirm 400, Book 400
- **Expected:** Error shape is consistent across the three endpoints for the same invalid input; any endpoint-specific divergence is reported as an inconsistency.
- **Actual:** All 3 calls matched: V2 FareConfirm with supplier AirIndiaX: 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. | V2 Book with supplier AirIndiaX: 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (badsup):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The airSearchRequestDto field is required. (3.9s)
  - **Hop 2 &mdash; V2 FareConfirm (badsup):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The fareConfirmRequestDto field is required. (0.1s)
  - **Hop 3 &mdash; V2 Book (badsup):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The flightBookRequestDto field is required. (0.1s)

### TC-AIEGY-FC-REPEAT-01 — PASS

- **Test Case:** [FareConfirm][Regression] Verify FareConfirm is repeatable: the same responseId/offerId pair confirmed twice returns the same price and a usable responseId both times.
- **Category:** Regression
- **Endpoint Name:** FARECONFIRM
- **Request:** 2 call(s): V2 FareConfirm
- **Response:** FareConfirm 200, FareConfirm 200
- **Expected:** Both calls 200, identical total, both responseIds distinct and non-empty.
- **Actual:** All 2 calls matched: FareConfirm again: 200 {"responseId":"890359fb-de77-480b-94dc-bb5282746412","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... | third FareConfirm of the same pair: 200 {"responseId":"73861308-f677-40e9-978a-cba1b79e1365","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT...; ids new each time
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (fcrep):** PASS &mdash; 200 {"responseId":"890359fb-de77-480b-94dc-bb5282746412","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (7.1s)
  - **Hop 2 &mdash; V2 FareConfirm (fcrep2):** PASS &mdash; 200 {"responseId":"73861308-f677-40e9-978a-cba1b79e1365","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)

### TC-VERSIONDIFF-VAL-01 — PASS

- **Test Case:** [Search]&amp;[GetOfferBundles]&amp;[BookAfterHold]&amp;[CancelAfterHold]&amp;[Void] [Request] Verify V2's inconsistent V2/v2 path casing does not affect routing.
- **Category:** Validation
- **Endpoint Name:** VERSIONDIFF
- **Request:** 3 call(s): V2 FareConfirm &gt; V2 Search &gt; V2 GetOfferBundles
- **Response:** FareConfirm 200, Search 200, GetOfferBundles 200
- **Expected:** If the routing layer is case-insensitive, the inconsistency is cosmetic only; if case-sensitive, this is a latent defect that would affect every V2 endpoint using the 'wrong' casing relative to how it's actually deployed.
- **Actual:** All 3 calls matched: V2 Search sent to api/v2/FlightSearch/Search (the other casing): 200 offers=64 | V2 GetOfferBundles sent to api/v2/bundles/GetOfferBundles (the other casing): 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMTMvMjAyNiAxODoxMH5CT01_MTIvMTMvMjAyNiAyMDozMH5_":{"origin":"DEL","...
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 FareConfirm (casing):** PASS &mdash; 200 {"responseId":"c0c666d5-ee58-48a2-8234-d737e3308792","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (0.8s)
  - **Hop 2 &mdash; V2 Search (casing):** PASS &mdash; 200 offers=64 (3.9s)
  - **Hop 3 &mdash; V2 GetOfferBundles (casing):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMTMvMjAyNiAxODoxMH5CT01_MTIvMTMvMjAyNiAyMDozMH5_":{"origin":"DEL","... (1.4s)

### TC-VERSIONDIFF-NEG-01 — PASS

- **Test Case:** Verify the actual error-response envelope shape (status code, body structure) for a representative sample of endpoints, since no negative/error example exists in either collection for any endpoint.
- **Category:** Negative
- **Endpoint Name:** VERSIONDIFF
- **Request:** 6 call(s): V1 Search &gt; V2 Search &gt; V1 FareConfirm &gt; V2 FareConfirm &gt; V1 Book &gt; V2 Book
- **Response:** Search 400, Search 400, FareConfirm 400, FareConfirm 400, Book 400, Book 400
- **Expected:** A concrete, confirmed error envelope (status code + body structure) is documented and becomes the expected-result baseline for every other negative test case in this and the other three passes going forward.
- **Actual:** All 6 calls matched: V1 Book: 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required. [camelCase envelope] | V2 Book: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. [PascalCase envelope]
- **Status:** PASS
- **Evidence:** envelope styles seen: camelCase + PascalCase

  - **Hop 1 &mdash; V1 Search (env):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: Select a valid Supplier (0.1s)
  - **Hop 2 &mdash; V2 Search (env):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SearchCriteria field is required. (0.1s)
  - **Hop 3 &mdash; V1 FareConfirm (env):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 4 &mdash; V2 FareConfirm (env):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedOfferId field is required. (0.1s)
  - **Hop 5 &mdash; V1 Book (env):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The ContactsList field is required. (0.1s)
  - **Hop 6 &mdash; V2 Book (env):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: The selected offer is invalid, expired, or could not be found. Please select a valid offer and try again. (0.1s)

### TC-AIEGY-BDL-03 — PASS

- **Test Case:** [Book][Negative] Verify V1 Book rejects malformed selectedBundles: wrong journey key, missing code, two entries for one journey, bundle code of another journey.
- **Category:** Negative
- **Endpoint Name:** BUNDLE
- **Request:** 5 call(s): V1 Book
- **Response:** Book 400, Book 400, Book 409, Book 400, Book 400
- **Expected:** 4xx with a structured error envelope, no PNR, no 5xx
- **Actual:** All 5 calls matched: rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: selectedBundles list count must match offer journeys count. | rejected as expected - 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: selectedBundles list count must match offer journeys count.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Book (bdl03):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Correct bundles must be selected for all offer journeys. (0.4s)
  - **Hop 2 &mdash; V1 Book (bdl03):** PASS &mdash; 400 1001 "Validation errors occurred. Please check your request." ctx: The SelectedBundleCode field is required. (0.9s)
  - **Hop 3 &mdash; V1 Book (bdl03):** PASS &mdash; 409 NDC-INT-UNC-Z9999 "NDC-INT-UNC-Z9999" ctx: The bundle code ZZZZ is invalid. (2.0s)
  - **Hop 4 &mdash; V1 Book (bdl03):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: selectedBundles list count must match offer journeys count. (0.2s)
  - **Hop 5 &mdash; V1 Book (bdl03):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: selectedBundles list count must match offer journeys count. (0.5s)

### TC-AIBK-BDL-MTX-01 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify bundle option #1 is sellable on every offer where GetOfferBundles advertises it (offers 1, 21, 46 and 71 of DEL-BOM).
- **Category:** Business Rule
- **Endpoint Name:** V2 bundle sellability
- **Request:** 20 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200
- **Expected:** A bundle that GetOfferBundles advertises books successfully on that offer
- **Actual:** All 20 calls matched: AddPassenger returned a new offerId + responseId | PNR U37BPM; total 6935; reconciled; 1 passengers echoed
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (mtx0_0):** PASS &mdash; 200 offers=63 (4.5s)
  - **Hop 2 &mdash; V2 FareConfirm (mtx0_0):** PASS &mdash; 200 {"responseId":"946861ca-92bf-4af7-90a7-d21f1c0f60c6","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (mtx0_0):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMTcvMjAyNiAxODozNX5HT1h_MTIvMTcvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.5s)
  - **Hop 4 &mdash; V2 AddPassenger (mtx0_0):** PASS &mdash; 200 {"offerId":"9964fc17-e25e-4f55-b6c2-b15a9e34270a&amp;yApQY9IAAEYy8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... (0.6s)
  - **Hop 5 &mdash; V2 Book (mtx0_0):** PASS &mdash; 200 pnr Y6CCGD (1.8s)
  - **Hop 6 &mdash; V2 Search (mtx0_20):** PASS &mdash; 200 offers=63 (4.3s)
  - **Hop 7 &mdash; V2 FareConfirm (mtx0_20):** PASS &mdash; 200 {"responseId":"d7b1756d-1407-4649-80a4-4f81c3a68a70","supplier":"AirIndia","journeys":{"SVh_MTA2OH4gfn5ERUx_MT... (1.0s)
  - **Hop 8 &mdash; V2 GetOfferBundles (mtx0_20):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA2OH4gfn5ERUx_MTIvMTcvMjAyNiAxMTo1NX5HT0l_MTIvMTcvMjAyNiAxNDozMH5_XklYfjEyNDF_IH5_R09... (1.6s)
  - **Hop 9 &mdash; V2 AddPassenger (mtx0_20):** PASS &mdash; 200 {"offerId":"dee0413f-d57e-44b2-900d-a94a3bcae1aa&amp;yAreY9IAAIMX/SaTmZGW2ZRTVmhfTVRBMk9INGdmbjVFUlV4X01USXZNVGN2T... (0.7s)
  - **Hop 10 &mdash; V2 Book (mtx0_20):** PASS &mdash; 200 pnr HVEM4C (2.4s)
  - **Hop 11 &mdash; V2 Search (mtx0_45):** PASS &mdash; 200 offers=63 (4.6s)
  - **Hop 12 &mdash; V2 FareConfirm (mtx0_45):** PASS &mdash; 200 {"responseId":"cd5e3693-ac22-4560-9984-d489fd4e4dc5","supplier":"AirIndia","journeys":{"SVh_MTA3Nn4gfn5ERUx_MT... (1.1s)
  - **Hop 13 &mdash; V2 GetOfferBundles (mtx0_45):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA3Nn4gfn5ERUx_MTIvMTcvMjAyNiAwOTowMH5JWEJ_MTIvMTcvMjAyNiAxMToxMH5_XklYfjE1NDd_IH5_SVh... (1.5s)
  - **Hop 14 &mdash; V2 AddPassenger (mtx0_45):** PASS &mdash; 200 {"offerId":"8ff43b68-68d0-4f7f-8849-1612400de059&amp;yApFY9IAAEYa/CaTmZGW2ZRTVmhfTVRBM05uNGdmbjVFUlV4X01USXZNVGN2T... (0.9s)
  - **Hop 15 &mdash; V2 Book (mtx0_45):** PASS &mdash; 200 pnr W4NWFW (1.7s)
  - **Hop 16 &mdash; V2 Search (mtx0_70):** PASS &mdash; 200 offers=63 (4.0s)
  - **Hop 17 &mdash; V2 FareConfirm (mtx0_70):** PASS &mdash; 200 {"responseId":"82b80386-8c9e-48f2-afa2-19ace984e269","supplier":"AirIndia","journeys":{"SVh_MTIzNX4gfn5ERUx_MT... (1.0s)
  - **Hop 18 &mdash; V2 GetOfferBundles (mtx0_70):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTIzNX4gfn5ERUx_MTIvMTcvMjAyNiAyMzozMH5CT01_MTIvMTgvMjAyNiAwMTo1NX5_":{"origin":"DEL","... (1.3s)
  - **Hop 19 &mdash; V2 AddPassenger (mtx0_70):** PASS &mdash; 200 {"offerId":"794858d7-c009-4cdf-8c4b-ec91ac7f0631&amp;yAm2Y9IAAEMC8AqTmZGW2UhTVmhfTVRJek5YNGdmbjVFUlV4EADzCXZNVGN2T... (0.7s)
  - **Hop 20 &mdash; V2 Book (mtx0_70):** PASS &mdash; 200 pnr U37BPM (1.7s)

### TC-AIBK-BDL-MTX-02 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify bundle option #2 is sellable on every offer where GetOfferBundles advertises it (offers 1, 21, 46 and 71 of DEL-BOM).
- **Category:** Business Rule
- **Endpoint Name:** V2 bundle sellability
- **Request:** 20 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200
- **Expected:** A bundle that GetOfferBundles advertises books successfully on that offer
- **Actual:** All 20 calls matched: AddPassenger returned a new offerId + responseId | PNR F3WMHW; total 7535 = FareConfirm 6935 + extras 600; reconciled; 1 passengers echoed
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (mtx1_0):** PASS &mdash; 200 offers=70 (4.7s)
  - **Hop 2 &mdash; V2 FareConfirm (mtx1_0):** PASS &mdash; 200 {"responseId":"725199ae-d2bf-4ca2-b125-9f1091596aaa","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (mtx1_0):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjEvMjAyNiAxODozNX5HT1h_MTIvMjEvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.5s)
  - **Hop 4 &mdash; V2 AddPassenger (mtx1_0):** PASS &mdash; 200 {"offerId":"91143b56-a3f9-49e0-aab6-75b0b3de0936&amp;yApXY9IAAEYz8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNakV2T... (0.6s)
  - **Hop 5 &mdash; V2 Book (mtx1_0):** PASS &mdash; 200 pnr FTJ1YL (1.8s)
  - **Hop 6 &mdash; V2 Search (mtx1_20):** PASS &mdash; 200 offers=70 (4.0s)
  - **Hop 7 &mdash; V2 FareConfirm (mtx1_20):** PASS &mdash; 200 {"responseId":"c9957449-8c3c-42d2-bfa6-e8a3e81419ee","supplier":"AirIndia","journeys":{"SVh_MTEwOH4gfn5ERUx_MT... (0.9s)
  - **Hop 8 &mdash; V2 GetOfferBundles (mtx1_20):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTEwOH4gfn5ERUx_MTIvMjEvMjAyNiAwNTowMH5HT0l_MTIvMjEvMjAyNiAwNzozMH5_XklYfjEyMTR_IH5_R09... (1.7s)
  - **Hop 9 &mdash; V2 AddPassenger (mtx1_20):** PASS &mdash; 200 {"offerId":"efb6abcf-3c4d-4748-af76-ae755339d081&amp;yAriY9IAAIMz/iaTmZGW2ZRTVmhfTVRFd09INGdmbjVFUlV4X01USXZNakV2T... (0.7s)
  - **Hop 10 &mdash; V2 Book (mtx1_20):** PASS &mdash; 200 pnr H61YSQ (2.5s)
  - **Hop 11 &mdash; V2 Search (mtx1_45):** PASS &mdash; 200 offers=70 (4.4s)
  - **Hop 12 &mdash; V2 FareConfirm (mtx1_45):** PASS &mdash; 200 {"responseId":"99e580b5-ebec-42e5-8cfd-98a0189f1c74","supplier":"AirIndia","journeys":{"SVh_MTIyNX4gfn5ERUx_MT... (1.1s)
  - **Hop 13 &mdash; V2 GetOfferBundles (mtx1_45):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTIyNX4gfn5ERUx_MTIvMjEvMjAyNiAxMjoyMH5WTlN_MTIvMjEvMjAyNiAxMzo1NX5_XklYfjI1NDd_IH5_Vk5... (1.6s)
  - **Hop 14 &mdash; V2 AddPassenger (mtx1_45):** PASS &mdash; 200 {"offerId":"8ac4eeae-d7a9-444a-9dc5-b2b858888df2&amp;yApZY9IAAEY38AqTmZGW2ZRTVmhfTVRJeU5YNGdmbjVFUlV4EAD+CXZNakV2T... (0.9s)
  - **Hop 15 &mdash; V2 Book (mtx1_45):** PASS &mdash; 200 pnr W4NPFW (1.8s)
  - **Hop 16 &mdash; V2 Search (mtx1_70):** PASS &mdash; 200 offers=70 (4.3s)
  - **Hop 17 &mdash; V2 FareConfirm (mtx1_70):** PASS &mdash; 200 {"responseId":"bbcd8089-bd7a-45fa-b1a4-5761932b06b5","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (0.9s)
  - **Hop 18 &mdash; V2 GetOfferBundles (mtx1_70):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMjEvMjAyNiAxODoxMH5CT01_MTIvMjEvMjAyNiAyMDozMH5_":{"origin":"DEL","... (1.3s)
  - **Hop 19 &mdash; V2 AddPassenger (mtx1_70):** PASS &mdash; 200 {"offerId":"fd899207-88a0-4c1e-ab93-815d5c77cec6&amp;yAmyY9IAAEMC/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNakV2T... (0.7s)
  - **Hop 20 &mdash; V2 Book (mtx1_70):** PASS &mdash; 200 pnr F3WMHW (2.1s)

### TC-ANCILLARY-POS-01 — PASS

- **Test Case:** [GetAncillary][Response] Verify available ancillary services are returned for an ancillary-capable offer.
- **Category:** Positive
- **Endpoint Name:** ANCILLARY
- **Request:** 1 call(s): V2 GetAncillary
- **Response:** GetAncillary 200
- **Expected:** HTTP 200; response includes isFareCheckRequired, offerId, responseId (captured as ANCofferId/ANCresponseId), passengersAncillariesAvailabilty, and segmentsAncillariesDetails with ancillaryCategory/price/availableCount per service.
- **Actual:** GetAncillary 200; isFareCheckRequired, offerId and responseId present (isFareCheckRequired=false); passengersAncillariesAvailabilty and segmentsAncillariesDetails present
- **Status:** PASS
- **Evidence:** OK: GetAncillary 200 | OK: isFareCheckRequired, offerId and responseId present (isFareCheckRequired=false) | OK: passengersAncillariesAvailabilty and segmentsAncillariesDetails present

  - **Hop 1 &mdash; V2 GetAncillary (s5base):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"cfa165f0-5c28-4d2e-88cb-11f29fbdbeff&amp;yAtBY9IAAE2... (3.9s)

### TC-ANCILLARY-VAL-01 — PASS

- **Test Case:** [GetAncillary][Response] Validate the misspelled passengersAncillariesAvailabilty field and ancillaryCategory taxonomy.
- **Category:** Validation
- **Endpoint Name:** ANCILLARY
- **Request:** 1 call(s): V2 GetAncillary
- **Response:** GetAncillary 200
- **Expected:** passengersAncillariesAvailabilty is present under its exact (misspelled) key - this is a genuine defect in the live API's own JSON, not a documentation typo, and assertions must match it exactly. ancillaryCategory values are constrained to the known taxonomy (Baggage, Meal, Seat, Other); an unrecognized value should be flagged, not hard-failed (§8.3).
- **Actual:** the field is spelled "passengersAncillariesAvailabilty" (defect in the live API, still present); ancillaryCategory values: Other,Baggage,Meal
- **Status:** PASS
- **Evidence:** OK: the field is spelled "passengersAncillariesAvailabilty" (defect in the live API, still present) | OK: ancillaryCategory values: Other,Baggage,Meal

  - **Hop 1 &mdash; V2 GetAncillary (s5base):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"cfa165f0-5c28-4d2e-88cb-11f29fbdbeff&amp;yAtBY9IAAE2... (3.9s)

### TC-ANCILLARY-BND-01 — PASS

- **Test Case:** [GetAncillary][Response] Validate availableCount=null is treated as unlimited, distinct from 0.
- **Category:** Boundary
- **Endpoint Name:** ANCILLARY
- **Request:** 1 call(s): V2 GetAncillary
- **Response:** GetAncillary 200
- **Expected:** availableCount=null is explicitly asserted to mean "unlimited/not tracked," distinct from availableCount=0 which means "none available" - a service with null must not be treated as unselectable.
- **Actual:** availableCount: 0 null, 0 zero, 198 positive across 198 items; no service is listed with availableCount 0
- **Status:** PASS
- **Evidence:** OK: availableCount: 0 null, 0 zero, 198 positive across 198 items | OK: no service is listed with availableCount 0

  - **Hop 1 &mdash; V2 GetAncillary (s5base):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"cfa165f0-5c28-4d2e-88cb-11f29fbdbeff&amp;yAtBY9IAAE2... (3.9s)

### TC-AIEGY-ANC-01 — PASS

- **Test Case:** [GetAncillary][Validation] Verify ancillary content integrity: every service has name, code, price, currency, category and description; prices non-negative in the offer currency; per-passenger availability references only codes that exist; infants are offered no baggage or meal.
- **Category:** Validation
- **Endpoint Name:** ANCILLARY
- **Request:** 1 call(s): V2 GetAncillary
- **Response:** GetAncillary 200
- **Expected:** All fields populated; INR; availability codes resolve; INF has no Baggage/Meal availability.
- **Actual:** 0 of 198 services missing name/code/price/currency/category/description; 0 negative prices; currencies INR
- **Status:** PASS
- **Evidence:** OK: 0 of 198 services missing name/code/price/currency/category/description | OK: 0 negative prices | OK: currencies INR

  - **Hop 1 &mdash; V2 GetAncillary (s5base):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"cfa165f0-5c28-4d2e-88cb-11f29fbdbeff&amp;yAtBY9IAAE2... (3.9s)

### TC-AIBK-BDL-MTX-04 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify bundle option #4 is sellable on every offer where GetOfferBundles advertises it (offers 1, 21, 46 and 71 of DEL-BOM).
- **Category:** Business Rule
- **Endpoint Name:** V2 bundle sellability
- **Request:** 20 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200
- **Expected:** A bundle that GetOfferBundles advertises books successfully on that offer
- **Actual:** All 20 calls matched: AddPassenger returned a new offerId + responseId | PNR DZYRYS; total 12848 = FareConfirm 11948 + extras 900; reconciled; 1 passengers echoed
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (mtx3_0):** PASS &mdash; 200 offers=67 (4.2s)
  - **Hop 2 &mdash; V2 FareConfirm (mtx3_0):** PASS &mdash; 200 {"responseId":"78f0756b-f486-4957-bf25-5bff2c108fc2","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (0.8s)
  - **Hop 3 &mdash; V2 GetOfferBundles (mtx3_0):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MTIvMjkvMjAyNiAxODoxMH5CT01_MTIvMjkvMjAyNiAyMDozMH5_":{"origin":"DEL","... (0.9s)
  - **Hop 4 &mdash; V2 AddPassenger (mtx3_0):** PASS &mdash; 200 {"offerId":"7035a0e0-3216-412e-ac49-181d4cbeaba1&amp;yAmyY9IAAEL7/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01USXZNamt2T... (0.6s)
  - **Hop 5 &mdash; V2 Book (mtx3_0):** PASS &mdash; 200 pnr ZZY9UI (1.6s)
  - **Hop 6 &mdash; V2 Search (mtx3_20):** PASS &mdash; 200 offers=67 (3.8s)
  - **Hop 7 &mdash; V2 FareConfirm (mtx3_20):** PASS &mdash; 200 {"responseId":"6ef88935-cfdc-4d00-93d4-994fc3328d41","supplier":"AirIndia","journeys":{"SVh_MTM5MX4gfn5ERUx_MT... (1.0s)
  - **Hop 8 &mdash; V2 GetOfferBundles (mtx3_20):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTM5MX4gfn5ERUx_MTIvMjkvMjAyNiAyMDozMH5MS09_MTIvMjkvMjAyNiAyMTo0MH5_XklYfjEwMjd_IH5_TEt... (1.7s)
  - **Hop 9 &mdash; V2 AddPassenger (mtx3_20):** PASS &mdash; 200 {"offerId":"8907cc1e-9339-4c08-9168-1b6cf41a72b4&amp;yAr9Y9IAAIM1/iaTmZGW2ZRTVmhfTVRNNU1YNGdmbjVFUlV4X01USXZNamt2T... (0.7s)
  - **Hop 10 &mdash; V2 Book (mtx3_20):** PASS &mdash; 200 pnr Y5LPTG (2.4s)
  - **Hop 11 &mdash; V2 Search (mtx3_45):** PASS &mdash; 200 offers=67 (4.2s)
  - **Hop 12 &mdash; V2 FareConfirm (mtx3_45):** PASS &mdash; 200 {"responseId":"b5243c96-e534-4678-9162-91ef870792d5","supplier":"AirIndia","journeys":{"SVh_MTA1OX4gfn5ERUx_MT... (1.1s)
  - **Hop 13 &mdash; V2 GetOfferBundles (mtx3_45):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA1OX4gfn5ERUx_MTIvMjkvMjAyNiAxMjoyNX5CQkl_MTIvMjkvMjAyNiAxNDo0NX5_XklYfjEwMjV_IH5_QkJ... (1.9s)
  - **Hop 14 &mdash; V2 AddPassenger (mtx3_45):** PASS &mdash; 200 {"offerId":"3d3259a4-1897-4e71-b899-ea08110ec705&amp;yApYY9IAAEY9/SaTmZGW2ZRTVmhfTVRBMU9YNGdmbjVFUlV4X01USXZNamt2T... (0.7s)
  - **Hop 15 &mdash; V2 Book (mtx3_45):** PASS &mdash; 200 pnr Y41NPZ (2.0s)
  - **Hop 16 &mdash; V2 Search (mtx3_70):** PASS &mdash; 200 offers=67 (4.7s)
  - **Hop 17 &mdash; V2 FareConfirm (mtx3_70):** PASS &mdash; 200 {"responseId":"7c40e6d9-e095-4f9e-87db-a3adcc4fe2f1","supplier":"AirIndia","journeys":{"SVh_MTA4MX4gfn5ERUx_MT... (1.0s)
  - **Hop 18 &mdash; V2 GetOfferBundles (mtx3_70):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA4MX4gfn5ERUx_MTIvMjkvMjAyNiAxNToyNX5JWEJ_MTIvMjkvMjAyNiAxNzozNX5_XklYfjE1NDd_IH5_SVh... (2.0s)
  - **Hop 19 &mdash; V2 AddPassenger (mtx3_70):** PASS &mdash; 200 {"offerId":"8bf45537-93b5-4dfc-b89e-f78b39dfe49e&amp;yArZY9IAAIMY/iaTmZGW2ZRTVmhfTVRBNE1YNGdmbjVFUlV4X01USXZNamt2T... (3.8s)
  - **Hop 20 &mdash; V2 Book (mtx3_70):** PASS &mdash; 200 pnr DZYRYS (1.6s)

### TC-AIEGY-BDL-04 — PASS

- **Test Case:** [Book][Integration] Verify a paid bundle that includes a meal combined with an extra meal ancillary is either booked or refused with a clear validation error (not a raw supplier error).
- **Category:** Integration
- **Endpoint Name:** BUNDLE
- **Request:** 6 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, GetAncillary 200, Book 200
- **Expected:** A paid bundle that includes a meal combined with an extra meal ancillary is either booked or refused with a clear, mapped message
- **Actual:** All 6 calls matched: ancillaries chosen: Meal VSDB x1 @250 pax0 (expected extra 250) | PNR Y47JWZ; total 3755 = FareConfirm 2605 + extras 1150; reconciled; 1 passengers echoed
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (bdl04):** PASS &mdash; 200 offers=72 (3.9s)
  - **Hop 2 &mdash; V2 FareConfirm (bdl04):** PASS &mdash; 200 {"responseId":"e2853e13-3ed2-4ae4-bdf7-0a248f715b4b","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (bdl04):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTQ2NX4gfn5ERUx_MDEvMDYvMjAyNyAxODoxMH5CT01_MDEvMDYvMjAyNyAyMDozMH5_":{"origin":"DEL","... (1.0s)
  - **Hop 4 &mdash; V2 AddPassenger (bdl04):** PASS &mdash; 200 {"offerId":"96e72ac2-3cb9-44a0-b3f5-134f8fea5e31&amp;yAmyY9IAAEL8/CaTmZGW2UhTVmhfTVRRMk5YNGdmbjVFUlV4X01ERXZNRFl2T... (3.9s)
  - **Hop 5 &mdash; V2 GetAncillary (bdl04):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"96e72ac2-3cb9-44a0-b3f5-134f8fea5e31&amp;yAmyY9IAAEL... (1.4s)
  - **Hop 6 &mdash; V2 Book (bdl04):** PASS &mdash; 200 pnr Y47JWZ (10.7s)

### TC-AIBK-BDL-MTX-03 — PASS

- **Test Case:** [Book][GetOfferBundles] Verify bundle option #3 is sellable on every offer where GetOfferBundles advertises it (offers 1, 21, 46 and 71 of DEL-BOM).
- **Category:** Business Rule
- **Endpoint Name:** V2 bundle sellability
- **Request:** 21 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 GetOfferBundles &gt; V2 AddPassenger &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200, Search 200, FareConfirm 200, GetOfferBundles 200, AddPassenger 200, Book 200
- **Expected:** A bundle that GetOfferBundles advertises books successfully on that offer
- **Actual:** All 21 calls matched: AddPassenger returned a new offerId + responseId | PNR B1WYNM; total 13808 = FareConfirm 13208 + extras 600; reconciled; 1 passengers echoed
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (mtx2_0):** PASS &mdash; 200 offers=70 (4.5s)
  - **Hop 2 &mdash; V2 FareConfirm (mtx2_0):** PASS &mdash; 200 {"responseId":"2395f20f-bcc3-4ace-a5ce-68bc352d31ad","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 GetOfferBundles (mtx2_0):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjUvMjAyNiAxODozNX5HT1h_MTIvMjUvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (1.6s)
  - **Hop 4 &mdash; V2 AddPassenger (mtx2_0):** PASS &mdash; 200 {"offerId":"316d706e-2903-4dd7-b801-cc0b9714a77e&amp;yApTY9IAAEYz8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNalV2T... (0.7s)
  - **Hop 5 &mdash; V2 Book (mtx2_0):** PASS &mdash; 200 pnr OV74QV (1.8s)
  - **Hop 6 &mdash; V2 Search (mtx2_20):** FAIL &mdash; 200 offers=0 (0.7s)
  - **Hop 7 &mdash; V2 Search (mtx2_20retry1):** PASS &mdash; 200 offers=69 (3.7s)
  - **Hop 8 &mdash; V2 FareConfirm (mtx2_20):** PASS &mdash; 200 {"responseId":"96b37bf5-fe99-4af5-b8a5-b20402a6592b","supplier":"AirIndia","journeys":{"SVh_MTEwOH4gfn5ERUx_MT... (1.3s)
  - **Hop 9 &mdash; V2 GetOfferBundles (mtx2_20):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTEwOH4gfn5ERUx_MTIvMjUvMjAyNiAwNTowMH5HT0l_MTIvMjUvMjAyNiAwNzozMH5_XklYfjEyNDF_IH5_R09... (1.5s)
  - **Hop 10 &mdash; V2 AddPassenger (mtx2_20):** PASS &mdash; 200 {"offerId":"7139ce96-4aea-44de-b594-02e3ad138da2&amp;yApWY9IAAEY3/iaTmZGW2ZRTVmhfTVRFd09INGdmbjVFUlV4X01USXZNalV2T... (0.8s)
  - **Hop 11 &mdash; V2 Book (mtx2_20):** PASS &mdash; 200 pnr G9BW5R (2.1s)
  - **Hop 12 &mdash; V2 Search (mtx2_45):** PASS &mdash; 200 offers=69 (3.8s)
  - **Hop 13 &mdash; V2 FareConfirm (mtx2_45):** PASS &mdash; 200 {"responseId":"b2fb5f77-6f3e-4bb4-8d2d-080dc9a8767b","supplier":"AirIndia","journeys":{"SVh_MTgyN34gfn5ERUx_MT... (1.1s)
  - **Hop 14 &mdash; V2 GetOfferBundles (mtx2_45):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTgyN34gfn5ERUx_MTIvMjUvMjAyNiAxMzozNX5WTlN_MTIvMjUvMjAyNiAxNTowNX5_XklYfjI1NDd_IH5_Vk5... (1.7s)
  - **Hop 15 &mdash; V2 AddPassenger (mtx2_45):** PASS &mdash; 200 {"offerId":"45404310-e26b-492f-9b01-f6887bd3b759&amp;yApbY9IAAEY4/SaTmZGW2ZRTVmhfTVRneU4zNGdmbjVFUlV4X01USXZNalV2T... (0.7s)
  - **Hop 16 &mdash; V2 Book (mtx2_45):** PASS &mdash; 200 pnr CZBE8P (1.9s)
  - **Hop 17 &mdash; V2 Search (mtx2_70):** PASS &mdash; 200 offers=69 (3.5s)
  - **Hop 18 &mdash; V2 FareConfirm (mtx2_70):** PASS &mdash; 200 {"responseId":"9da61bd2-dd47-419e-ad23-81da8e1ec45a","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 19 &mdash; V2 GetOfferBundles (mtx2_70):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMjUvMjAyNiAxODozNX5HT1h_MTIvMjUvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (5.1s)
  - **Hop 20 &mdash; V2 AddPassenger (mtx2_70):** PASS &mdash; 200 {"offerId":"1f351bc2-0e4a-4bd8-9844-bad5daa0ab06&amp;yAr5Y9IAAIM28CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNalV2T... (1.3s)
  - **Hop 21 &mdash; V2 Book (mtx2_70):** PASS &mdash; 200 pnr B1WYNM (12.8s)

### TC-AIEGY-ANC-IDS-01 — PASS

- **Test Case:** [Book][Integration] Verify which ResponseId/offerId pair Book accepts after GetAncillary: the AddPassenger pair, the GetAncillary pair, or both.
- **Category:** Integration
- **Endpoint Name:** ANCILLARY
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 GetAncillary &gt; V2 Book
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, GetAncillary 200, Book 200
- **Expected:** The GetAncillary pair is accepted (SPEC 2.6: ANCofferId/ANCresponseId feed the next step); record whether the AddPassenger pair also works.
- **Actual:** All 5 calls matched: ancillaries chosen: Meal VSDB x1 @250 pax0 (expected extra 250) | Book with the GetAncillary pair (ResponseId different from AddPassenger's, offerId same): 200 pnr B44ZGT
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ids):** PASS &mdash; 200 offers=63 (10.4s)
  - **Hop 2 &mdash; V2 FareConfirm (ids):** PASS &mdash; 200 {"responseId":"0cc7677c-07e2-40a4-a44a-333757b5cdfc","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (ids):** PASS &mdash; 200 {"offerId":"faecd5ea-43c4-4d92-9730-9941282adea1&amp;yApMY9IAAEYx8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... (0.9s)
  - **Hop 4 &mdash; V2 GetAncillary (ids):** PASS &mdash; 200 {"supplier":"AirIndia","isFareCheckRequired":false,"offerId":"faecd5ea-43c4-4d92-9730-9941282adea1&amp;yApMY9IAAEY... (1.7s)
  - **Hop 5 &mdash; V2 Book (idsga):** PASS &mdash; 200 pnr B44ZGT (2.8s)

### TC-AIBK-V1-BDL-MP-01 — FAIL

- **Test Case:** [Book][GetOfferBundles] Verify a V1 booking with a paid bundle for ADT+ADT is priced as FareConfirm plus the bundle fee for every passenger, with a Book price breakdown that reconciles.
- **Category:** Business Rule
- **Endpoint Name:** V1 bundle booking: multi-passenger
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Book total equals FareConfirm plus the bundle fee per adult and child; the Book price breakdown reconciles
- **Actual:** V1 Book: totalBaseAmount 6722 != sum(paxBase*count) 8522; totalTaxAmount 3324 != sum(paxTax*count) 3408; totalAmount 10046 != sum(paxTotal*count) 11930 = 11930; Book total 10046 != FareConfirm 10130 + bundle 1800 = 11930 (bundle selection not priced)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1mp01):** PASS &mdash; 200 offers=67 (10.1s)
  - **Hop 2 &mdash; V1 FareConfirm (v1mp01):** PASS &mdash; 200 {"responseId":"820dede0-599b-4539-b75b-88099097516b","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1mp01):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA2N34gfn5ERUx_MTIvMDkvMjAyNiAwNjoxMH5JWEJ_MTIvMDkvMjAyNiAwODoxNX5_XklYfjE1NDd_IH5_SVh... (2.7s)
  - **Hop 4 &mdash; V1 Book (v1mp01):** FAIL &mdash; 200 pnr Q8I25H (3.6s)
  - **Hop 5 &mdash; V1 Retrieve (v1mp01):** PASS &mdash; 200 pnr Q8I25H (0.7s)

### TC-AIBK-V1-BDL-MP-02 — FAIL

- **Test Case:** [Book][GetOfferBundles] Verify a V1 booking with a paid bundle for ADT+ADT+CHD+INF is priced as FareConfirm plus the bundle fee for every passenger, with a Book price breakdown that reconciles.
- **Category:** Business Rule
- **Endpoint Name:** V1 bundle booking: multi-passenger
- **Request:** 5 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Book total equals FareConfirm plus the bundle fee per adult and child; the Book price breakdown reconciles
- **Actual:** V1 Book: totalBaseAmount 5609 != sum(paxBase*count) 8351; totalTaxAmount 5392 != sum(paxTax*count) 5476; totalAmount 11001 != sum(paxTotal*count) 13827 = 13827; Book total 11001 != FareConfirm 11127 + bundle 2700 = 13827 (bundle selection not priced)
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1mp02):** PASS &mdash; 200 offers=69 (18.7s)
  - **Hop 2 &mdash; V1 FareConfirm (v1mp02):** PASS &mdash; 200 {"responseId":"2d236fca-d8f1-49ff-bc3d-2f1b7e974de6","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.1s)
  - **Hop 3 &mdash; V1 GetOfferBundles (v1mp02):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTA0OX4gfn5ERUx_MTIvMTMvMjAyNiAxODozNX5HT1h_MTIvMTMvMjAyNiAyMToxNX5_XklYfjEyMDl_IH5_R09... (3.6s)
  - **Hop 4 &mdash; V1 Book (v1mp02):** FAIL &mdash; 200 pnr OYM1HR (4.6s)
  - **Hop 5 &mdash; V1 Retrieve (v1mp02):** PASS &mdash; 200 pnr OYM1HR (0.7s)

### TC-AIBK-SEC-04 — PASS

- **Test Case:** [AddPassenger][Security] Verify a script payload in a passenger surname is rejected or stored inertly and never reflected unsanitized.
- **Category:** Security
- **Endpoint Name:** V2 AddPassenger
- **Request:** 3 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, FareConfirm 200, AddPassenger 400
- **Expected:** Rejected, escaped or inert; never executed or reflected unsanitized; no 5xx
- **Actual:** All 3 calls matched: FareConfirm total 2605, flags and price unchanged, reconciled | script payload in the surname: 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only.
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (inj2):** PASS &mdash; 200 offers=71 (4.6s)
  - **Hop 2 &mdash; V2 FareConfirm (inj2):** PASS &mdash; 200 {"responseId":"2164c785-cb54-43bb-9baa-59d3590e40a1","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (inj2):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: Passenger name must contain alphabetic characters only. (0.2s)

### TC-AIEGY-SEC-03 — PASS

- **Test Case:** [Book][Security] Verify passenger name, address and contact fields carrying script, SQL and path-traversal strings are rejected or stored as inert data, never reflected raw or executed.
- **Category:** Security
- **Endpoint Name:** SECURITY
- **Request:** 9 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger
- **Response:** Search 200, FareConfirm 200, AddPassenger 400, Search 200, FareConfirm 200, AddPassenger 200, Search 200, FareConfirm 200, AddPassenger 200
- **Expected:** Rejected, or accepted and echoed inertly; never a 5xx; Retrieve never returns executable markup.
- **Actual:** All 9 calls matched: FareConfirm total 2709, flags and price unchanged, reconciled | path traversal in contact address: 200 {"offerId":"12906976-c73e-4a0c-984f-fa2f8ba2c769&amp;yApTY9IAAEY98CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNakV2T... (accepted as data)
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (inj):** PASS &mdash; 200 offers=67 (4.0s)
  - **Hop 2 &mdash; V2 FareConfirm (inj):** PASS &mdash; 200 {"responseId":"23b28794-bc1a-42ea-8861-adccef099636","supplier":"AirIndia","journeys":{"SVh_MTA2N34gfn5ERUx_MT... (1.0s)
  - **Hop 3 &mdash; V2 AddPassenger (inj_scripttag):** PASS &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: 'Address Line1' is not in the correct format. (0.2s)
  - **Hop 4 &mdash; V2 Search (inj):** PASS &mdash; 200 offers=63 (4.9s)
  - **Hop 5 &mdash; V2 FareConfirm (inj):** PASS &mdash; 200 {"responseId":"5348469e-e2fa-422b-8fe7-5658210502cb","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 6 &mdash; V2 AddPassenger (inj_SQL):** PASS &mdash; 200 {"offerId":"b1fe7a48-6278-4664-92fe-c2f0898a339e&amp;yApXY9IAAEZQ8CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNVGN2T... (0.7s)
  - **Hop 7 &mdash; V2 Search (inj):** PASS &mdash; 200 offers=70 (4.6s)
  - **Hop 8 &mdash; V2 FareConfirm (inj):** PASS &mdash; 200 {"responseId":"707b7045-301b-4212-9280-fe7f8556baa1","supplier":"AirIndia","journeys":{"SVh_MTA0OX4gfn5ERUx_MT... (1.0s)
  - **Hop 9 &mdash; V2 AddPassenger (inj_pathtraversal):** PASS &mdash; 200 {"offerId":"12906976-c73e-4a0c-984f-fa2f8ba2c769&amp;yApTY9IAAEY98CWTmZGW2ZRTVmhfTVRBME9YNGdmbjVFUlV4X01USXZNakV2T... (0.8s)

### TC-AIBK-V1-03 — PASS

- **Test Case:** [Book][Flow] Verify a V1 one-way booking DEL-BOM for 4 adults + 3 children + 2 infants (9) completes end to end (Search, FareConfirm, GetOfferBundles, Book, Retrieve).
- **Category:** Flow
- **Endpoint Name:** V1 booking: passenger mix
- **Request:** 6 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 GetOfferBundles &gt; V1 Book &gt; V1 Retrieve
- **Response:** Search 200, Search 200, FareConfirm 200, GetOfferBundles 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, GetOfferBundles, Book and Retrieve succeed; prices reconcile; the Book total equals FareConfirm; Retrieve returns the same booking
- **Actual:** All 6 calls matched: PNR X1RFTC; total 24235; reconciled; 9 passengers echoed | Retrieve matches Book (pnr, token, total 24235, 9 passengers); bookingStatus undefined, gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1):** FAIL &mdash; 200 offers=0 (15.5s)
  - **Hop 2 &mdash; V1 Search (v1retry1):** PASS &mdash; 200 offers=82 (15.2s)
  - **Hop 3 &mdash; V1 FareConfirm (v1):** PASS &mdash; 200 {"responseId":"9ae92be4-4417-4671-982f-14e7025273a6","supplier":"AirIndia","journeys":{"SVh_MTIzNX4gfn5ERUx_MT... (1.0s)
  - **Hop 4 &mdash; V1 GetOfferBundles (v1):** PASS &mdash; 200 {"offerJourneys":{"SVh_MTIzNX4gfn5ERUx_MTIvMDcvMjAyNiAyMzozMH5CT01_MTIvMDgvMjAyNiAwMTo1NX5_":{"origin":"DEL","... (4.4s)
  - **Hop 5 &mdash; V1 Book (v1):** PASS &mdash; 200 pnr X1RFTC (5.8s)
  - **Hop 6 &mdash; V1 Retrieve (v1):** PASS &mdash; 200 pnr X1RFTC (0.9s)

### TC-AIEGY-ENV-01 — FAIL

- **Test Case:** [Regression][Response] Verify every 4xx error in this run uses one envelope (Status, TransactionId, ErrorCode, ErrorMessage, Context) with consistent casing and a matching HTTP status.
- **Category:** Regression
- **Endpoint Name:** ENVELOPE
- **Request:** Not sent
- **Response:** n/a
- **Expected:** A single envelope shape and casing; body Status equals the HTTP status; every error carries a TransactionId.
- **Actual:** two envelope styles in use: 144 camelCase (model binding, code 1001) and 165 PascalCase (NDC-INT-TEC-A0001 / AuthenticationError / NDC-INT-UNC-Z9999); 0 without an envelope
- **Status:** FAIL
- **Evidence:** FAIL: two envelope styles in use: 144 camelCase (model binding, code 1001) and 165 PascalCase (NDC-INT-TEC-A0001 / AuthenticationError / NDC-INT-UNC-Z9999); 0 without an envelope

### TC-AIEGY-SEC-02 — FAIL

- **Test Case:** [Security][Response] Verify an ordinary (non-debug) error response never contains OriginalSupplierRequest / OriginalSupplierResponse or supplier credentials.
- **Category:** Security
- **Endpoint Name:** SECURITY
- **Request:** Not sent
- **Response:** n/a
- **Expected:** Error bodies carry no raw supplier payload and no credentials.
- **Actual:** 55 of 317 error responses carry a non-empty OriginalSupplierRequest/OriginalSupplierResponse (values redacted in the saved artifacts)
- **Status:** FAIL
- **Evidence:** FAIL: 55 of 317 error responses carry a non-empty OriginalSupplierRequest/OriginalSupplierResponse (values redacted in the saved artifacts) | OK: 0 error responses contain a password field

### TC-AIEGY-SEC-LEAK-01 — FAIL

- **Test Case:** [Security][Response] Verify no error response from any call in this run exposes stack traces, internal class names, file paths or supplier secrets.
- **Category:** Security
- **Endpoint Name:** SECURITY
- **Request:** Not sent
- **Response:** n/a
- **Expected:** No internal detail in any response (isdebug=true excluded: covered by TC-SEARCH-SEC-01).
- **Actual:** 94 of 317 error responses expose internal detail: {"nsk:":34,"System.Guid":36,"System.String":16,"NDC.Integrations":8}
- **Status:** FAIL
- **Evidence:** FAIL: 94 of 317 error responses expose internal detail: {"nsk:":34,"System.Guid":36,"System.String":16,"NDC.Integrations":8}

### TC-AIBK-V1-BDL-EMPTY-01 — FAIL

- **Test Case:** [Book][V1] Verify a V1 Book with an empty selectedBundles list (the documented minimal body) is accepted when the offer does not require a bundle (isBundleRequired=false).
- **Category:** Validation
- **Endpoint Name:** V1 Book
- **Request:** 3 call(s): V1 Search &gt; V1 FareConfirm &gt; V1 Book
- **Response:** Search 200, FareConfirm 200, Book 400
- **Expected:** Book accepts selectedBundles: [] and books the base fare, because isBundleRequired is false
- **Actual:** V1 Book: rejected although isBundleRequired=undefined (V1 offers expose no such flag): 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: selectedBundles list count must match offer journeys count.
- **Status:** FAIL
- **Evidence:** 

  - **Hop 1 &mdash; V1 Search (v1empty):** PASS &mdash; 200 offers=58 (5.6s)
  - **Hop 2 &mdash; V1 FareConfirm (v1empty):** PASS &mdash; 200 {"responseId":"48b76ba6-51b0-4abf-8afd-d7162d4855d0","supplier":"AirIndia","journeys":{"SVh_MTQ2NX4gfn5ERUx_MD... (1.0s)
  - **Hop 3 &mdash; V1 Book (v1empty):** FAIL &mdash; 400 NDC-INT-TEC-A0001 "Invalid request. Please check the request parameters and try again." ctx: selectedBundles list count must match offer journeys count. (0.2s)

### TC-AIBK-OFR-07 — PASS

- **Test Case:** [Book][Flow] Verify a direct international offer COK-DXB books end to end.
- **Category:** Flow
- **Endpoint Name:** V2 booking: offer kind
- **Request:** 5 call(s): V2 Search &gt; V2 FareConfirm &gt; V2 AddPassenger &gt; V2 Book &gt; V2 Retrieve
- **Response:** Search 200, FareConfirm 200, AddPassenger 200, Book 200, Retrieve 200
- **Expected:** Search, FareConfirm, AddPassenger, Book and Retrieve succeed; every price reconciles; the Book total equals FareConfirm plus the selections; Retrieve returns the same booking
- **Actual:** All 5 calls matched: PNR Y9HDNX; total 12881; reconciled; 1 passengers echoed | Retrieve matches Book (pnr, token, total 12881, 1 passengers); bookingStatus "UnKnown", gdsPNR ""
- **Status:** PASS
- **Evidence:** 

  - **Hop 1 &mdash; V2 Search (ofr7):** PASS &mdash; 200 offers=8 (3.0s)
  - **Hop 2 &mdash; V2 FareConfirm (ofr7):** PASS &mdash; 200 {"responseId":"3b16e29e-ba58-4e36-bb4a-fd8ee213317c","supplier":"AirIndia","journeys":{"SVh_IDQzNX4gfn5DT0t_MT... (0.9s)
  - **Hop 3 &mdash; V2 AddPassenger (ofr7):** PASS &mdash; 200 {"offerId":"b974d88a-e11c-4e0c-92a5-a3777df0d837&amp;yAm0Y9IAAEMc/SaTmZGW2UhTVmhfSURRek5YNGdmbjVEVDB0X01USXZNVEV2T... (0.7s)
  - **Hop 4 &mdash; V2 Book (ofr7):** PASS &mdash; 200 pnr Y9HDNX (1.9s)
  - **Hop 5 &mdash; V2 Retrieve (ofr7):** PASS &mdash; 200 pnr Y9HDNX (0.6s)

## Findings

### Defects

- **[TC-AIEGY-RET-01] BUG-01 (new) &mdash; Retrieve returns the full booking (passenger names, birth dates, passport numbers, contact details) for a PNR with a wrong bookingToken, another booking's bookingToken, an empty or null token or no token at all, and with gdsPNR omitted. Only the 6-character PNR is checked, on V1 and V2** Field: `bookingToken / gdsPNR (V1 and V2 Retrieve)`. Expected: 400/404 structured error whenever pnr, gdsPNR and bookingToken do not belong to the same booking. **Impact:** Anyone holding the shared x-api-key can read any booking, including passport data, by guessing or enumerating PNR locators; bookingToken gives no protection Evidence: TC-AIEGY-RET-01 (wrong token and another booking's token returned 200 with the PNR), TC-AIEGY-RETRIEVE-NEG-02 (token or gdsPnr omitted: 200), TC-AIEGY-RETRIEVE-NEG-03 (null and empty: 200)
- **[TC-AIEGY-BOOK-NEG-02] BUG-02 (new) &mdash; The response id is never validated: Book creates a PNR when ResponseId (V2) or fareConfirmResponseId (V1) is omitted, and creates a PNR when the ResponseId and selectedOfferId come from two different chains. FareConfirm, GetOfferBundles, GetAncillary and GetSeatMap also answer 200 with the id omitted, mismatched or sent under the wrong field name (V1 FareConfirm accepts ResponseId in place of searchResponseId). Only selectedOfferId is used** Field: `ResponseId / fareConfirmResponseId / searchResponseId (Book, FareConfirm, GetOfferBundles, GetAncillary, GetSeatMap)`. Expected: 400 NDC-INT-TEC-A0001 "selected offer is invalid" whenever the response id is missing or does not belong to the offer. **Impact:** The id chain documented in SPEC 3.2 is not enforced: a booking can be created from ids that never belonged together, and integration mistakes go undetected until money is spent Evidence: TC-AIEGY-BOOK-NEG-02 (V1 PNR WUNKJY and V2 PNR K8NUXK created without a response id), TC-BOOK-NEG-05 (V2 PNR KU8N3V from mixed ids), TC-FARECONFIRM-NEG-01, TC-FARECONFIRM-VAL-01, TC-AIEGY-CHAIN-02, TC-AIEGY-FARECONFIRM-NEG-02, TC-AIEGY-GETOFFERBUNDLES-NEG-02, TC-AIEGY-GETANCILLARY-NEG-02, TC-AIEGY-GETSEATMAP-NEG-02, TC-SEATMAP-NEG-04
- **[TC-AIBK-RTE-16] BUG-03 (new) &mdash; On some India-to-UAE departures the Book response silently drops tax AB0500 (500 per passenger): priceDetails.taxesAndFees no longer lists it and totalTaxAmount and totalAmount are 500 per passenger lower than at FareConfirm, while every per-passenger taxesAndFees list still shows AB0500, so paxTotalTaxAmount does not equal its own tax list. Seen on DEL-SHJ (FareConfirm 33754, Book 32754, 2 passengers) and HYD-DXB (15934 vs 15434)** Field: `selectedOffer.priceDetails.taxesAndFees / totalTaxAmount / totalAmount (V2 Book)`. Expected: Book total equals FareConfirm total (33754) and the tax lists sum to paxTotalTaxAmount; or a price-change flag if the price really moved. **Impact:** The customer is quoted one price and the booking carries another with an internally inconsistent breakdown; reconciliation and refunds will not match Evidence: TC-AIBK-RTE-16, TC-AIBK-RTE-20 (reproduced twice; not on every date or flight: TC-AIBK-DATA-04 on another DEL-SHJ flight matched)
- **[FLOW-V1-13] BUG-04 (new) &mdash; V1 Book with a paid bundle for two or more passengers returns a priceDetails total that excludes the bundle and differs from FareConfirm, while the per-passenger rows include the bundle: two adults with bundle VLPL, FareConfirm 10130, Book total 10046 (base 6722, tax 3324) but the rows add up to 11930 (adult base 4261 and tax 1704 each). Single-passenger V1 bundle bookings are consistent. V2 prices the same bundle correctly** Field: `selectedOffer.priceDetails (V1 Book with a paid bundle, more than one passenger)`. Expected: Book total 11930 (FareConfirm 10130 plus 900 per adult), identical to the sum of the passenger rows. **Impact:** V1 clients are shown a total that is neither the quoted fare nor the sold fare; the customer may be charged for a bundle the booking total does not show Evidence: FLOW-V1-13 (2 ADT + 1 CHD), TC-AIBK-V1-BDL-MP-01 (2 ADT), TC-AIBK-V1-BDL-MP-02 (2 ADT + 1 CHD + 1 INF)
- **[TC-AIBK-V1-BDL-EMPTY-01] BUG-05 (new) &mdash; V1 Book rejects the documented minimal body (selectedBundles: []) with 400 "selectedBundles list count must match offer journeys count"; every V1 booking needs one entry per journey even though a bundle is optional (the base bundle DEL costs 0)** Field: `selectedBundles (V1 Book)`. Expected: selectedBundles: [] books the base fare, as in every saved example. **Impact:** The sample request in the collection and SPEC cannot book; integrators must call GetOfferBundles on every booking just to pick a free base bundle Evidence: TC-AIBK-V1-BDL-EMPTY-01; V1 bookings in this run pass only with selectedBundles built from GetOfferBundles
- **[TC-AIEGY-BOOK-NEG-01] BUG-06 (new) &mdash; V1 FareConfirm, V1 GetOfferBundles and V1 Book answer HTTP 500 ServerError ("Unknown error occured") for a never-issued id pair and for a 1000-character selectedOfferId; V2 answers the same input with 400 NDC-INT-TEC-A0001** Field: `V1 FareConfirm, V1 GetOfferBundles, V1 Book (unknown ids)`. Expected: 400 NDC-INT-TEC-A0001 "selected offer is invalid, expired or could not be found" (the V2 behaviour). **Impact:** A caller mistake on the booking path looks like a platform outage and cannot be told apart from a real server fault Evidence: TC-AIEGY-FARECONFIRM-NEG-01/03, TC-AIEGY-GETOFFERBUNDLES-NEG-01/03, TC-AIEGY-BOOK-NEG-01/03, TC-AIEGY-CHAIN-01
- **[TC-AIEGY-RET-02] BUG-07 (new) &mdash; V1 RetrieveBooking returns HTTP 500 ServerError for a PNR that was created through the V2 Book (the V2 Retrieve of a V1 PNR returns 200)** Field: `V1 RetrieveBooking on a V2-created PNR`. Expected: 200 with the booking, or a mapped error naming the version mismatch. **Impact:** Clients migrating between versions, or mixing them, cannot read back V2 bookings Evidence: TC-AIEGY-RET-02 (V2 PNR CTMKHI)
- **[FLOW-V2-25] BUG-08 (new) &mdash; After every successful Book, V2 Retrieve reports bookingStatus "UnKnown" and V1 RetrieveBooking has no bookingStatus field at all, so no booked/confirmed state can be read. Book and Retrieve also disagree on selectedOffer.offerId (a new GUID on every Retrieve call)** Field: `bookingStatus (V2 Retrieve) / absent field (V1 RetrieveBooking)`. Expected: bookingStatus "Booked" (or the documented confirmed value) on V2, the same field on V1, and a stable selectedOffer.offerId. **Impact:** Clients cannot tell a confirmed booking from a failed one; every Family A flow fails its end-state check Evidence: FLOW-V2-25/31/37/43/49/55/61/67, FLOW-V1-01, TC-RETRIEVE-POS-01, TC-RETRIEVE-REG-01, TC-RETRIEVE-VAL-01, TC-AIBK-DATA-06 (offerId changes between two Retrieve calls)
- **[TC-BOOK-POS-02] BUG-09 (new) &mdash; The Book response (V1 and V2) returns gdsPNR as an empty string, no voidCapability, no creationDate, tickets {} and emdTickets {} even when baggage, meals and seats were bought; V1 Book also returns holdExpirationDate (null) on a direct booking** Field: `gdsPNR, voidCapability, creationDate, tickets, emdTickets (Book and Retrieve)`. Expected: A non-empty gdsPNR, a voidCapability value, a creationDate, and EMD records for paid extras. **Impact:** Downstream steps keyed on gdsPNR/voidCapability cannot run; there is no proof that paid extras were issued Evidence: TC-BOOK-POS-02, TC-AIBK-DATA-07, TC-VERSIONDIFF-VAL-03
- **[TC-AIBK-SRCH-PERF-01] BUG-10 (new) &mdash; Search for any party containing an infant takes 13-15 s (adult-only parties: about 4 s), and when the supplier leg crosses a fixed ~15 s limit Search answers HTTP 200 with an empty offers[] instead of an error. The same party succeeds on the next attempt or on the next date** Field: `Search latency / offers[] (parties with children or infants)`. Expected: Offers within a few seconds, or a mapped timeout error (never an empty success). **Impact:** Customers travelling with infants intermittently see "no flights"; the empty 200 is indistinguishable from sold out Evidence: TC-AIBK-SRCH-PERF-01 (4 of 12 searches empty or slow), TC-SEARCH-BND-02 (4 ADT + 3 CHD + 2 INF empty after 15.1 s on V1 and V2); retried silently inside TC-AIBK-PAX-06/07, NAME-01/02 and others
- **[TC-AIEGY-SRCH-PAX-03] BUG-11 (new) &mdash; Search accepts one child with no adult (returns 64 offers) and a party of 10 that is over the limit only because of infants returns HTTP 200 with an empty offers[] after ~15 s instead of a 400, on V1 and V2; AddPassenger then accepts a child born 12 years and 1 month before travel** Field: `passengers[] validation (Search)`. Expected: 400 NDC-INT-TEC-A0001 for a child without an adult and for 10 passengers; AddPassenger rejects a 12-year-old as a child. **Impact:** Invalid parties reach the supplier and fail late; a 12-year-old can be booked at the child fare Evidence: TC-AIEGY-SRCH-PAX-03, TC-AIEGY-SRCH-PAX-06, TC-SEARCH-BND-03, TC-AIBK-ADDPAX-BND-01
- **[TC-AIEGY-ANC-NEG-01] BUG-12 (new) &mdash; Book accepts ancillary and seat selections keyed by a passenger reference or segment key that does not exist: an ancillary under an unknown pax reference is silently attached to the first passenger, ancillaries under an unknown or wrong segment key are still booked and priced, and a seat under an unknown segment key is booked on the segment encoded in its cellId** Field: `PassengersSelectedAncillaries / passengersSelectedSeats keys (V2 Book)`. Expected: Selections with unknown passenger or segment keys are rejected with a structured 400. **Impact:** A client bug moves a paid service to the wrong passenger or segment without any error Evidence: TC-AIEGY-ANC-NEG-01 (PNRs P7JZTN, O713SA, V3GRWM), TC-AIBK-SEAT-NEG-01 (PNR ZYUR7R)
- **[TC-AIBK-ANC-05] BUG-13 (new) &mdash; GetAncillary advertises availableCount 50 (baggage) and 400 (meal) but Book refuses any quantity above 1 with 409 NDC-INT-UNC-Z9999 "SSR (SBHC) is restricted to 1 occurence(s) per passenger and leg"; quantities 51 and 999 fail the same way. The limit is not published and the error code is the unmapped catch-all** Field: `availableCount / Quantity (GetAncillary and Book)`. Expected: availableCount (or a new maxPerPassengerPerLeg field) reflects the real limit, and an over-limit quantity gets a mapped 400. **Impact:** Customers who select two bags are blocked at the last step with an error integrators cannot interpret Evidence: TC-AIBK-ANC-05, FLOW-V2-61-NEG (meal 999 rejected with the SSR limit message; baggage 51 also rejected)
- **[TC-AIBK-BDL-03] BUG-14 (new) &mdash; GetOfferBundles advertises meal bundles (VIVC, NCOC) that Book then refuses with 409 NDC-INT-UNC-Z9999 "Error encountered selling SSRs for service bundle VIVC - SSR 'VIVB-0' not available on DEL-LKO", on V1 and V2. It depends on the flight: the same bundles book on other offers (TC-AIBK-BDL-MTX-01..04 passed on four other offers)** Field: `GetOfferBundles bundleChoices (meal bundles)`. Expected: Only bundles that can be sold are listed, or Book returns a mapped business error. **Impact:** A customer picks a bundle that cannot be sold and loses the booking attempt at the final step Evidence: TC-AIBK-BDL-03 (V2), TC-AIBK-BDL-12 (V1)
- **[TC-AIBK-ADDPAX-REPEAT-01] BUG-15 (new) &mdash; A second AddPassenger call for the same FareConfirm offer, for example to fix a typo, fails with 409 NDC-INT-UNC-Z9999 "Duplicate contact type 'P' detected" and cannot be repeated** Field: `AddPassenger (second call on the same offer)`. Expected: The second call replaces the passenger data, or returns a mapped error telling the caller to run FareConfirm again. **Impact:** Any correction after AddPassenger forces a full restart of the chain; the message does not say why Evidence: TC-AIBK-ADDPAX-REPEAT-01; the same message appears when AddPassenger variants share an offer
- **[TC-AIBK-NAME-01] BUG-16 (new) &mdash; Names containing a hyphen or an apostrophe (Al-Sayed, O'Neil) are rejected with "Passenger name must contain alphabetic characters only"; a two-word surname (Abdel Rahman) is accepted** Field: `passengersList.name (AddPassenger)`. Expected: Hyphens and apostrophes are accepted or stripped following the airline name rules. **Impact:** Real passengers with common surnames cannot be booked without the client rewriting their names Evidence: TC-AIBK-NAME-01, TC-AIBK-NAME-02
- **[TC-AIEGY-ENV-01] BUG-17 (new) &mdash; Client errors use two envelopes: camelCase {status, errorCode "1001"} for model binding (144 of 309 responses) and PascalCase {Status, ErrorCode "NDC-INT-TEC-A0001" / "AuthenticationError" / "NDC-INT-UNC-Z9999"} for the rest (165). Ordinary business failures (market does not exist, station unknown, duplicate contact, SSR limits, "Payment method AG does not allow zero amounts" on a second Book) all use the unmapped catch-all NDC-INT-UNC-Z9999** Field: `error envelope (status, ErrorCode, casing)`. Expected: One envelope and mapped codes for known business conditions. **Impact:** Clients need two parsers and cannot branch on error codes Evidence: TC-AIEGY-ENV-01 (census of every 4xx in this run)
- **[TC-SEARCH-SEC-01] BUG-18 (new) &mdash; Search with isdebug=true returns the raw supplier request and response, and the request contains the AirIndia supplier credentials (user name and password) in plaintext, on V1 and V2. isdebug=false and omitted return nothing** Field: `supplierRequest / supplierResponse (Search with isdebug=true)`. Expected: Raw supplier payloads are never returned, or credentials are masked. **Impact:** Anyone with the shared x-api-key can read live supplier credentials by adding isdebug=true to a Search Evidence: TC-SEARCH-SEC-01 (values redacted in every artifact of this run)
- **[TC-AIEGY-SEC-LEAK-01] BUG-19 (new) &mdash; Ordinary error responses expose internals: 55 of 317 carry a non-empty OriginalSupplierRequest/OriginalSupplierResponse, and 94 expose .NET type names (System.Guid, System.String, NDC.Integrations...), supplier internals (nsk:InvalidMarket) and parser details** Field: `OriginalSupplierRequest / context[].value (error responses)`. Expected: Neutral messages naming the field; no raw supplier payloads or type names. **Impact:** Information disclosure that fingerprints the stack and the supplier system Evidence: TC-AIEGY-SEC-02, TC-AIEGY-SEC-LEAK-01 (census; no credential found in the error-body fragments sampled on this host)
- **[TC-SEATMAP-POS-02] BUG-20 (new) &mdash; GetSeatMap returns responseId 00000000-0000-0000-0000-000000000000 on every call, although SPEC 2.7 says Book may take GetSeatMap's id pair; the offerId is real. Blocked and occupied cells also carry priced entries (amount 0) in seatPriceDetailsByPassenger instead of none** Field: `responseId (GetSeatMap)`. Expected: A real responseId; no price entries on blocked or occupied cells. **Impact:** A client that follows the documented chaining sends the all-zero id; saved Postman Book example only works because ResponseId is ignored (BUG-02) Evidence: TC-SEATMAP-POS-02, TC-SEATMAP-VAL-08
- **[TC-AIBK-DATA-05] BUG-21 (new) &mdash; Tax codes use a different vocabulary before and after booking: Search and FareConfirm show numeric codes ("3", "5"), Book shows named codes (YQ, CUTE, RCS, IN, P2, PN, CGST, SGST); totals match but the tax lines cannot be compared** Field: `taxesAndFees[].code (Search, FareConfirm vs Book)`. Expected: The same code for the same tax throughout the chain. **Impact:** Tax reporting and reconciliation across the quote and the booking needs a mapping table nobody documents Evidence: TC-AIBK-DATA-05
- **[TC-BOOK-SEC-01] BUG-22 (new) &mdash; AirIndia is listed as a commercially blacklisted supplier (SPEC 4.3) yet Book succeeds on this host for every shape tried (149 bookings created in this run)** Field: `commercial blacklist (Book)`. Expected: Book is blocked at the business layer for a blacklisted supplier, or the matrix states the block applies only in production. **Impact:** If the same configuration reaches production, blacklisted bookings go through; if not, the spec is misleading Evidence: TC-BOOK-SEC-01 and every flow in this run
- **[TC-AIEGY-BDL-01] BUG-23 (new) &mdash; Bundle data is not customer-readable: 3 of 4 bundles carry bundleName equal to the raw code (DEL, NCOC, VIVC), the base bundle is named after an airport code (DEL), and no bundle has a bundlePrices entry for the infant passenger type present in the party** Field: `bundleName / bundlePrices (GetOfferBundles)`. Expected: Readable names (for example "Value Pack") and one bundlePrices entry per passenger type present. **Impact:** Front ends must hard-code names; infant pricing is ambiguous Evidence: TC-AIEGY-BDL-01

### Unknown-resolutions

- **[TC-SUPPLIER-BIZ-01]** AirIndia / EGY on ndc-supplier-integration serves inventory on 22 routes (DEL-BOM, BOM-DEL, DEL-BLR, BLR-DEL, DEL-MAA, DEL-CCU, DEL-HYD, BOM-BLR, BOM-GOI, BOM-DXB, DXB-BOM, DEL-DXB, DXB-DEL, DEL-BKK, DEL-DOH, DEL-AUH, DEL-SHJ, DEL-KTM, BLR-SIN, MAA-SIN, HYD-DXB, COK-DXB); other markets return 409 NDC-INT-UNC-Z9999 "nsk:InvalidMarket". Every V2 offer reports haveBundles, offerHasAncillary and offerHasSeat true, canBeHeld false and isSeatMapRequired false; V1 offers carry only haveBundles and canBeHeld Evidence: Route sweep of 45 markets and all booking flows, 2026-11-02
- **[TC-AIBK-BDL-02]** Bundle booking shape confirmed: Book takes selectedBundles [{journeyKey: &lt;offerJourneys key from GetOfferBundles&gt;, selectedBundleCode}]. V2 prices the bundle as an ancillary (totalPassengersAncillaries carries the bundle code, fee per adult and child, none for infants); V1 requires exactly one entry per journey and (BUG-04) mis-prices it for more than one passenger. A paid meal bundle and an extra meal on the same passenger book together (TC-AIBK-BDL-04) Evidence: TC-AIBK-BDL-01..13, BDL-MTX-01..04, CMB-01..07
- **[TC-AIBK-ANC-01]** Ancillary booking shape confirmed: PassengersSelectedAncillaries is keyed by the pax refs of passengersAncillariesAvailabilty (base64 of "&lt;index&gt;!&lt;type&gt;"), then SetSegmentsAncillaries by the segment keys of segmentsAncillariesDetails; codes are pax-specific and must be taken from that passenger's availability list. Categories seen: Baggage, Meal, Other (wheelchair, UMNR and VIP services, some at price 0). One unit per SSR per passenger and leg (BUG-13); Book needs no FareCheck (isFareCheckRequired false; FareCheck is unsupported for AirIndia) Evidence: TC-AIBK-ANC-01..11, CMB-01..07
- **[TC-SEATMAP-BND-03]** Seat cellAvailability values live on AirIndia: AvailablePaid, AvailableFree (price 0), Blocked, Occupied; AvailableAfterReservation never appears. Seat selection key is Pax&lt;n&gt; (AddPassenger order); Book echoes seats under the internal pax ref; infants get no seat and no fee. A seat sold in one booking shows Occupied on the next search of the same flight; the cellId alone decides the seat (BUG-12) Evidence: TC-SEATMAP-BND-03, TC-SEATMAP-BIZ-04, TC-AIBK-SEAT-01..08, TC-BOOK-BIZ-06
- **[TC-BOOK-NEG-04]** Book is not idempotent: a second Book on the same ids does not create a second PNR but fails with 409 NDC-INT-UNC-Z9999 ("Payment method AG does not allow zero amounts" or "Attempted create of object 'Booking' has failed"); two simultaneous Books on one offer create exactly one PNR. AddPassenger rejects an infant older than 24 months with 409 Z9999 ("age is outside the age limit of 24 month(s)") and duplicate passengers with 400 Evidence: TC-BOOK-NEG-04, TC-AIEGY-RACE-01, TC-AIBK-ADDPAX-BND-01, TC-AIBK-NAME-05

## Proposed SPEC.md updates

- 4.6 Capability Summary Matrix (AirIndia row) &mdash; status: *pending*
  - **Old:** "AirIndia | Unknown | Unknown | Unknown | Unknown | Unknown | Conditional (2 flags set) | Unknown"
  - **New:** "AirIndia (EGY, ndc-supplier-integration) | Bundle: Supported | Ancillary: Supported (V2) | SeatMap: Supported (V2) | Hold / BookAfterHold / Void / CancelAfterHold / Upselling / FareCheck: Not supported (409 OperationNotSupported) | Book + Retrieve: Supported, V1 and V2"
  - **Correction:** Confirmed live 2026-11-02 with 149 bookings; ne-3 returned no inventory the same day.

- 2.7 GetSeatMap (cellAvailability) &mdash; status: *pending*
  - **Old:** "neither (AvailableFree, AvailableAferReservation) is observed in any saved example or collection response to date"
  - **New:** "AvailableFree is a confirmed live value (AirIndia, price 0); AvailableAfterReservation was not observed. GetSeatMap responseId is the all-zero GUID (BUG-20)."
  - **Correction:** TC-SEATMAP-BND-03

- 2.9 Book (V1 selectedBundles) &mdash; status: *pending*
  - **Old:** "selectedBundles (array, empty in every observed example)"
  - **New:** "selectedBundles: [{journeyKey (key of GetOfferBundles offerJourneys), selectedBundleCode}], exactly one entry per journey on V1 for AirIndia; an empty list is rejected with 400 "selectedBundles list count must match offer journeys count"."
  - **Correction:** TC-AIBK-V1-BDL-EMPTY-01

## Cleanup / follow-up

Live artifacts left behind this round (8):

- **needs_void_cancel** &mdash; pnr WUNKJY (TC-AIEGY-BOOK-NEG-02) &mdash; V1 booking created from a request that should have been rejected (no fareConfirmResponseId); Void and Cancel are not supported for AirIndia, so it cannot be cancelled through this API
- **needs_void_cancel** &mdash; pnr K8NUXK (TC-AIEGY-BOOK-NEG-02) &mdash; V2 booking created without a ResponseId; Void and Cancel are not supported for AirIndia, so it cannot be cancelled through this API
- **needs_void_cancel** &mdash; pnr KU8N3V (TC-BOOK-NEG-05) &mdash; V2 booking created from mixed ids; Void and Cancel are not supported for AirIndia, so it cannot be cancelled through this API
- **needs_void_cancel** &mdash; pnr P7JZTN (TC-AIEGY-ANC-NEG-01) &mdash; booking with an ancillary under a wrong segment key; Void and Cancel are not supported for AirIndia, so it cannot be cancelled through this API
- **needs_void_cancel** &mdash; pnr O713SA (TC-AIEGY-ANC-NEG-01) &mdash; booking with an ancillary under an unknown pax reference; Void and Cancel are not supported for AirIndia, so it cannot be cancelled through this API
- **needs_void_cancel** &mdash; pnr V3GRWM (TC-AIEGY-ANC-NEG-01) &mdash; booking with an ancillary under an unknown segment key; Void and Cancel are not supported for AirIndia, so it cannot be cancelled through this API
- **needs_void_cancel** &mdash; pnr ZYUR7R (TC-AIBK-SEAT-NEG-01) &mdash; booking with a seat under an unknown segment key; Void and Cancel are not supported for AirIndia, so it cannot be cancelled through this API
- **needs_void_cancel** &mdash; pnr 149 PNRs (list in 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration_PNRs.csv) (TC-AIBK-PAX-01) &mdash; All other live bookings created by the happy-path flows, the exploration before the run (LT9FHL, C2BMMZ, V5UH5Q, IU122V, A36DNW, JYD1VE) and the negative tests. Non-production host; AirIndia has no Void or Cancel in this API, so they expire or are cleaned by the supplier.

