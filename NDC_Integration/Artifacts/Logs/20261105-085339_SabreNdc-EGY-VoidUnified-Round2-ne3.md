# QA Execution Report — VoidUnified - SabreNdc/EGY - ne-3 - V1 and V2 - Round 2 (SV and QR)

**Environment:** staging (ndc-integration-stg-ne-3) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** SabreNdc  **Credentials Selector:** EGY
**Started:** 2026-11-05T08:53:39.571Z
**Ended:** 2026-11-05T11:46:49.411Z
**Status:** COMPLETE
**Execution Duration:** 2h 53m 10s ([View Time Breakdown](20261105-085339_SabreNdc-EGY-VoidUnified-Round2-ne3_TimeBreakdown.html))
**Prior runs:** 20261104-140909_SabreNdc-EGY-VoidUnified-ne3 (Round 1, 2026-11-04: 21 pass / 25 fail / 21 blocked) (see NDC_Integration/Artifacts/Logs/)

## Summary

- Test cases logged: 67 of 67 planned
- Passed: 21
- Failed: 24
- Blocked: 22
- Failed test cases: TC-VOIDCAP-VAL-03, TC-VOIDCAP-VAL-05, TC-VOIDCAP-POS-01, TC-VOIDCAP-POS-07, TC-VOIDCAP-BIZ-01, TC-VOIDCAP-BIZ-02, TC-VOIDCAP-BND-03, TC-VOIDCAP-BND-04, TC-VOIDCAP-VAL-08, TC-VOIDCAP-VAL-09, TC-VOIDCAP-VAL-10, TC-VOIDCAP-VAL-12, TC-VOIDCAP-INT-02, TC-VOIDCAP-INT-03, TC-VOIDCAP-SEC-01, TC-VOIDCAP-SEC-02, TC-VOIDCAP-SEC-06, TC-VOIDCAP-REG-01, TC-VOIDCAP-REG-05, TC-VOIDCAP-REG-09, TC-VOIDCAP-REG-11, FLOW-V1-05-VOIDCAP, FLOW-V2-27-VOIDCAP, FLOW-V2-29-VOIDCAP
- Blocked test cases: TC-VOIDCAP-VAL-07, TC-VOIDCAP-POS-02, TC-VOIDCAP-POS-03, TC-VOIDCAP-POS-04, TC-VOIDCAP-POS-05, TC-VOIDCAP-POS-06, TC-VOIDCAP-BIZ-03, TC-VOIDCAP-BIZ-04, TC-VOIDCAP-BND-05, TC-VOIDCAP-NEG-01, TC-VOIDCAP-NEG-02, TC-VOIDCAP-NEG-03, TC-VOIDCAP-NEG-05, TC-VOIDCAP-NEG-07, TC-VOIDCAP-NEG-08, TC-VOIDCAP-SEC-03, TC-VOIDCAP-SEC-05, TC-VOIDCAP-REG-02, TC-VOIDCAP-REG-07, TC-VOIDCAP-REG-08, FLOW-V1-03-VOIDCAP-UNSUP, FLOW-V2-27-VOIDCAP-UNSUP

## Test case results

### TC-CAPCHECK-VOIDCAP-01 — PASS

- **Test Case:** [Search] Verify every supplier in the Void capability matrix has an active credentialsSelector that returns offers.
- **Category:** Positive
- **Endpoint Name:** Search
- **Request:** V1 and V2 Search SabreNdc/EGY, 1 ADT, one-way, 2026-12-05: 20 QR routes x 2 versions (plus a 880-route V1 discovery sweep)
- **Response:** All 80 V1/V2 Searches HTTP 200 with offers. Discovery sweep: 880 routes searched, 106 returned offers; offers by marketing carrier: QR 385, AA 1435, RJ 3, ME 1, BA 35; SV: 0. FareConfirm flags: canBeHeld 612/612 (V1) and 605/605 (V2), haveBundles 0, offerHasAncillary 0, offerHasSeat 0
- **Expected:** HTTP 200 with non-empty offers[] for each supplier that is active. Suppliers returning the "credentials ... do not exist or are not active" 400 or no offers are listed as BLOCKED for every later row that names them.
- **Actual:** SabreNdc/EGY is active on V1 and V2 and returns offers on 20 QR routes. No other supplier was queried (out of scope). SV has no inventory: 0 SV offers in 880 routes x 1 date plus 224 more searches over 7 dates and 16 SV-type routes (also with preferredAirlines SV)
- **Status:** PASS
- **Evidence:** Offer counts per route in the matrix; carrier tally QR 385, AA 1435, RJ 3, ME 1, BA 35. The SV requirement of this round cannot be exercised (see finding). | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; Route discovery sweep and SV probes (V1/V2 Search):** PASS &mdash; HTTP 200 on every search; 106/880 routes returned offers; carriers QR 385, AA 1435, RJ 3, ME 1, BA 35; SV 0
  - **Hop 2 &mdash; V1 Search CAI-JED:** PASS &mdash; HTTP 200, 20 offers (20 QR-only)
  - **Hop 3 &mdash; V2 Search CAI-JED:** PASS &mdash; HTTP 200, 20 offers (20 QR-only)

### TC-CAPCHECK-VOIDCAP-02 — PASS

- **Test Case:** [Book][Response] Verify the voidCapability value each supplier returns on a ticketed Book is recorded as the per-supplier baseline.
- **Category:** Positive
- **Endpoint Name:** Book
- **Request:** V1 Search-FareConfirm-Book and V2 Search-FareConfirm-AddPassenger-Book, 1 ADT, every QR offer
- **Response:** V1/QR: Book FullVoidOnlyAllowed 171, Retrieve FullVoidOnlyAllowed 170, tickets 1 171 (n=171) | V2/QR: Book FullVoidOnlyAllowed 171, VoidNotAllowed 1, Retrieve FullVoidOnlyAllowed 172, tickets 1 172 (n=172)
- **Expected:** HTTP 200 and a ticketed booking for every supplier that supports Book. The table is the baseline for the mapping cases. Reference values already seen: SabreNdc/EGY FullVoidOnlyAllowed (since the 2026-10-25 build), TravelportNdc/UAE FullVoidOnlyAllowed (QR and RJ always, EK intermittently absent), GulfAir/KSA FullVoidOnlyAllowed, AirIndia/EGY absent (2026-11-02). Do not fail this case on a missing value; the property rows below do that.
- **Actual:** All cells ticketed (HTTP 200). Baseline table: V1/QR: Book FullVoidOnlyAllowed 171, Retrieve FullVoidOnlyAllowed 170, tickets 1 171 (n=171) | V2/QR: Book FullVoidOnlyAllowed 171, VoidNotAllowed 1, Retrieve FullVoidOnlyAllowed 172, tickets 1 172 (n=172). SV: no inventory, no cell. AA is out of scope this round
- **Status:** PASS
- **Evidence:** V1/QR: Book FullVoidOnlyAllowed 171, Retrieve FullVoidOnlyAllowed 170, tickets 1 171 (n=171) | V2/QR: Book FullVoidOnlyAllowed 171, VoidNotAllowed 1, Retrieve FullVoidOnlyAllowed 172, tickets 1 172 (n=172) | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; Build A (earlier build) direct-Book matrix, before the 09:51 redeploy:** PASS &mdash; 290 chains {"FullVoidOnlyAllowed":290} Book; Retrieve {"None":290}; Retrieve after Void {"400":290}; Void 290 ok
  - **Hop 2 &mdash; Build B (final build) direct-Book matrix (every QR offer, V1 and V2):** PASS &mdash; 348 direct-Book chains (343 ticketed, 5 failed at {"FareConfirm":3,"Book":2}) over 20 routes; 343/343 Voids succeeded; PNRs left live: 0; median Book 21.2 s (V1) / 21.2 s (V2), Void 9.2 s / 9.1 s
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 3.1 s
  - **Hop 4 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 5 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 6 &mdash; V1 Void:** PASS &mdash; HTTP 200, 8.8 s
  - **Hop 7 &mdash; V1 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.2 s
  - **Hop 8 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 3.5 s
  - **Hop 9 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 10 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 11 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s
  - **Hop 12 &mdash; V2 Void:** PASS &mdash; HTTP 200, 9.9 s
  - **Hop 13 &mdash; V2 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.5 s

### TC-CAPCHECK-VOIDCAP-03 — PASS

- **Test Case:** [Void][Response] Verify which suppliers in the matrix accept Void, partitioning them into supported and unsupported.
- **Category:** Positive
- **Endpoint Name:** Void
- **Request:** POST V1 and V2 Void for every ticketed booking of the matrix (voidTickets [])
- **Response:** Void HTTP 200 voided=true: V1 170/171, V2 171/172
- **Expected:** Every supplier is labelled S or U with evidence; a supplier whose V1 and V2 results disagree is recorded as a defect. Reference: SabreNdc and TravelportNdc (ne-5) are S, AirIndia is U (409 OperationNotSupported). GulfAir, Amadeus, FlyAdeal, EgyptAir, OmanAir, AirCairo are UNKNOWN and decided here.
- **Actual:** SabreNdc/EGY is labelled S (Void supported) on V1 and V2 for QR: 343 of 343 voids succeeded
- **Status:** PASS
- **Evidence:** Void success V1 170/171, V2 171/172; V1 and V2 agree | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Void:** PASS &mdash; HTTP 200, 8.8 s
  - **Hop 2 &mdash; V2 Void:** PASS &mdash; HTTP 200, 9.9 s

### TC-VOIDCAP-VAL-01 — PASS

- **Test Case:** [Book][Response] Validate the Void capability property is named exactly voidCapability, at the top level, for every supplier on V1 and V2.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Raw text of every Book, Retrieve, Hold and BookAfterHold response (V1 and V2) searched for any key containing "void"
- **Response:** Keys found: voidCapability:1 2013 over 2014 responses
- **Expected:** Exactly one key, spelled voidCapability (camelCase), as a direct child of the response root. No VoidCapability, void_capability, voidCapabilities, voidAllowed, isVoidable or nesting under tickets, selectedOffer or any other object.
- **Actual:** Exactly one void key, spelled voidCapability, direct child of the response root, in every response that has one
- **Status:** PASS
- **Evidence:** raw-text key scan: voidCapability:1 2013 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 3 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 4 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s

### TC-VOIDCAP-VAL-02 — PASS

- **Test Case:** [Book][Response] Validate voidCapability is a non-empty string, never null, boolean, number, array or object.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Type and characters of voidCapability on every ticketed Book response
- **Response:** 343 Book responses: JSON type string, non-empty, no padding
- **Expected:** JSON type string; length &gt; 0; no surrounding whitespace; no control characters.
- **Actual:** Every value is a non-empty string without padding or control characters (the values themselves are judged in VAL-03)
- **Status:** PASS
- **Evidence:** types: string 343; values: FullVoidOnlyAllowed 342, VoidNotAllowed 1 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s

### TC-VOIDCAP-VAL-03 — FAIL

- **Test Case:** [Book]&amp;[Retrieve] [Response] Validate voidCapability uses only values from the unified enumeration and never a supplier-native value.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Every distinct voidCapability value collected from Book, Hold, BookAfterHold and Retrieve responses this run, compared with {FullVoidOnlyAllowed, VoidNotAllowed}
- **Response:** FullVoidOnlyAllowed: V1 Book, V1 Retrieve(ticketed), V2 Book, V2 Retrieve(ticketed), V1 BookAfterHold, V1 Retrieve(ticketed after BAH), V2 BookAfterHold, V2 Retrieve(ticketed after BAH) | null: V1 Retrieve(ticketed), V1 PnrReprice, V2 PnrReprice | VoidNotAllowed: V2 Book, V2 BookAfterHold, V1 BookAfterHold | None: V1 Hold, V1 Retrieve(held), V2 Hold, V2 Retrieve(held), V1 Retrieve(cancelled), V2 Retrieve(cancelled)
- **Expected:** Every value is one of the two known values with exact casing. A new value is logged and flagged for review, not hard-failed. Native or ad-hoc values (Y, N, true, ALLOWED, VOIDABLE, VoidNotAllowed in lower case, airline or GDS codes) are a defect because they bypass the mapping.
- **Actual:** Value(s) outside the unified enumeration: null, None (returned by V1 Retrieve(ticketed), V1 PnrReprice, V2 PnrReprice)
- **Status:** FAIL
- **Evidence:** FullVoidOnlyAllowed: V1 Book, V1 Retrieve(ticketed), V2 Book, V2 Retrieve(ticketed), V1 BookAfterHold, V1 Retrieve(ticketed after BAH), V2 BookAfterHold, V2 Retrieve(ticketed after BAH) | null: V1 Retrieve(ticketed), V1 PnrReprice, V2 PnrReprice | VoidNotAllowed: V2 Book, V2 BookAfterHold, V1 BookAfterHold | None: V1 Hold, V1 Retrieve(held), V2 Hold, V2 Retrieve(held), V1 Retrieve(cancelled), V2 Retrieve(cancelled) | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 2 &mdash; V1 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 3 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 4 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 5 &mdash; V2 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 6 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s

### TC-VOIDCAP-VAL-04 — PASS

- **Test Case:** [Book][Response] Validate voidCapability is present, never omitted or null, on every successful Book for every supplier.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Count voidCapability on every successful ticketed Book (343 Books: V1 171, V2 172; QR, 20 routes)
- **Response:** voidCapability present on 343/343 Book responses (V1 171/171, V2 172/172)
- **Expected:** Present on 100% of Book responses. A missing value on any supplier, including the intermittent TravelportNdc EK case, is a defect: a client cannot tell "Void not possible" from "capability unknown".
- **Actual:** voidCapability present on 343/343 (100%) Book responses; SV: no inventory
- **Status:** PASS
- **Evidence:** present V1 171/171, V2 172/172 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s

### TC-VOIDCAP-VAL-05 — FAIL

- **Test Case:** [Book]&amp;[Hold]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Validate one definition of voidCapability (name, type, location) across every endpoint that returns a booking.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** One booking through Hold -&gt; PnrReprice -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve and a direct Book -&gt; Retrieve, V1 and V2 (every QR offer)
- **Response:** Hold V1 None 168; V2 None 164; PnrReprice V1 null 167; V2 null 164; Retrieve(held) V1 None 168; V2 None 164; BookAfterHold V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1; Retrieve(ticketed) V1 FullVoidOnlyAllowed 168; V2 FullVoidOnlyAllowed 164; Book V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1
- **Expected:** Identical name, string type and root-level position in every response that returns a booking (Book, Hold, PnrReprice, BookAfterHold, Retrieve) on V1 and V2.
- **Actual:** voidCapability is not defined the same way on every endpoint: Hold V1 None 168; V2 None 164, PnrReprice V1 null 167; V2 null 164 (key present but not a string), Retrieve(held) V1 None 168; V2 None 164; Book, BookAfterHold and Retrieve(ticketed) are correct
- **Status:** FAIL
- **Evidence:** Hold V1 None 168; V2 None 164 | PnrReprice V1 null 167; V2 null 164 | Retrieve(held) V1 None 168; V2 None 164 | BookAfterHold V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 1.9 s
  - **Hop 2 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 3 &mdash; V1 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 4 &mdash; V1 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 5 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 6 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 2.0 s
  - **Hop 7 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 8 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 9 &mdash; V2 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 12.8 s
  - **Hop 10 &mdash; V2 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 11 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s

### TC-VOIDCAP-VAL-06 — PASS

- **Test Case:** [Book][Response] Validate the response carries no duplicate voidCapability key and no supplier-native void attribute beside the unified property.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Raw text of Book and Retrieve responses: count of the key voidCapability and of any other key containing "void"
- **Response:** 2014 raw responses: voidCapability appears once each; other void keys: none
- **Expected:** voidCapability appears once. No extra supplier-native void fields. If one is genuinely needed, it is identical in name and meaning across suppliers.
- **Actual:** voidCapability appears exactly once and there are no other void keys
- **Status:** PASS
- **Evidence:** 2014 raw bodies scanned | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 3 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 4 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s

### TC-VOIDCAP-VAL-07 — BLOCKED

- **Test Case:** [Book][Response] Validate the published API contract documents voidCapability with its type and allowed values.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** GET 9 documentation paths on the staging host
- **Response:** swagger/index.html: 200; swagger/v1/swagger.json: 404; swagger/v2/swagger.json: 404; swagger/swagger.json: 404; swagger.json: 404; openapi.json: 404; api-docs: 404; v1/swagger.json: 404; swagger/NDC/swagger.json: 404
- **Expected:** The property is documented once, as a string with the enumeration {FullVoidOnlyAllowed, VoidNotAllowed}, with a description of each value. If no contract is exposed the case is BLOCKED.
- **Actual:** Blocked: the staging host serves only the Swagger UI page (swagger/index.html, 3044 bytes); the OpenAPI JSON it loads is not at any standard path (all 404), so the voidCapability schema cannot be read
- **Status:** BLOCKED
- **Evidence:** swagger/index.html: 200; swagger/v1/swagger.json: 404; swagger/v2/swagger.json: 404; swagger/swagger.json: 404; swagger.json: 404; openapi.json: 404; api-docs: 404; v1/swagger.json: 404; swagger/NDC/swagger.json: 404 | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-POS-01 — FAIL

- **Test Case:** [SabreNdc][Book][Response] Verify SabreNdc maps a ticketed Book to FullVoidOnlyAllowed and Void then succeeds, on V1 and V2.
- **Category:** Positive
- **Endpoint Name:** SabreNdc / Book
- **Request:** Book -&gt; Retrieve -&gt; Void on every QR offer (343 bookings, V1 and V2); SV: no inventory
- **Response:** Book V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1; Retrieve V1 FullVoidOnlyAllowed 170; V2 FullVoidOnlyAllowed 172; Void 343/343 voided=true
- **Expected:** Book voidCapability = FullVoidOnlyAllowed. Retrieve of the ticketed booking carries the same value. Void returns 200 {voided, voidedTickets[]}.
- **Actual:** Book returned VoidNotAllowed on 1 of 343 Books (V2 ALY-RUH #2) although Void then succeeded; on the other 342 Book = Retrieve = FullVoidOnlyAllowed
- **Status:** FAIL
- **Evidence:** Book FullVoidOnlyAllowed 342/343; Retrieve not FullVoidOnlyAllowed 0/342; Void ok 343/343 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 3.1 s
  - **Hop 2 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 3 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 4 &mdash; V1 Void:** PASS &mdash; HTTP 200, 8.8 s
  - **Hop 5 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 3.5 s
  - **Hop 6 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 7 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 8 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s
  - **Hop 9 &mdash; V2 Void:** PASS &mdash; HTTP 200, 9.9 s

### TC-VOIDCAP-POS-02 — BLOCKED

- **Test Case:** [TravelportNdc][Book][Response] Verify TravelportNdc maps a ticketed Book on QR, RJ and EK to FullVoidOnlyAllowed and Void then succeeds.
- **Category:** Positive
- **Endpoint Name:** TravelportNdc / Book
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** FullVoidOnlyAllowed on Book and on the ticketed Retrieve for every carrier and version; Void returns 200.
- **Actual:** Blocked: TravelportNdc is out of scope for this round (SabreNdc/EGY only, carriers SV and QR)
- **Status:** BLOCKED
- **Evidence:** Blocked: TravelportNdc is out of scope for this round (SabreNdc/EGY only, carriers SV and QR) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-POS-03 — BLOCKED

- **Test Case:** [GulfAir][Book][Response] Verify GulfAir maps a ticketed Book to FullVoidOnlyAllowed and record whether Void is accepted.
- **Category:** Positive
- **Endpoint Name:** GulfAir / Book
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Book voidCapability = FullVoidOnlyAllowed (baseline 2026-09-06 to 2026-10-10). Void returns 200. If Void returns 409 OperationNotSupported while the flag says FullVoidOnlyAllowed, that is a defect: the mapping advertises a capability the supplier does not have.
- **Actual:** Blocked: GulfAir is out of scope for this round (SabreNdc/EGY only, carriers SV and QR)
- **Status:** BLOCKED
- **Evidence:** Blocked: GulfAir is out of scope for this round (SabreNdc/EGY only, carriers SV and QR) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-POS-04 — BLOCKED

- **Test Case:** [Amadeus][Book][Response] Verify Amadeus maps voidCapability consistently with its actual Void behaviour.
- **Category:** Positive
- **Endpoint Name:** Amadeus / Book
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** FullVoidOnlyAllowed and Void 2xx, or VoidNotAllowed and Void refused with OperationNotSupported. Any other pairing is a defect.
- **Actual:** Blocked: Amadeus is out of scope for this round (SabreNdc/EGY only, carriers SV and QR)
- **Status:** BLOCKED
- **Evidence:** Blocked: Amadeus is out of scope for this round (SabreNdc/EGY only, carriers SV and QR) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-POS-05 — BLOCKED

- **Test Case:** [FlyAdeal][Book][Response] Verify FlyAdeal (LCC) maps voidCapability consistently with its actual Void behaviour.
- **Category:** Positive
- **Endpoint Name:** FlyAdeal / Book
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Same pairing rule as TC-VOIDCAP-POS-04. The LCC supplier type must still return a unified value, not an absent field.
- **Actual:** Blocked: FlyAdeal is out of scope for this round (SabreNdc/EGY only, carriers SV and QR)
- **Status:** BLOCKED
- **Evidence:** Blocked: FlyAdeal is out of scope for this round (SabreNdc/EGY only, carriers SV and QR) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-POS-06 — BLOCKED

- **Test Case:** [EgyptAir]&amp;[OmanAir]&amp;[AirCairo][Book][Response] Verify the suppliers SPEC lists as Void-supported return FullVoidOnlyAllowed and accept Void.
- **Category:** Positive
- **Endpoint Name:** EgyptAir
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** voidCapability = FullVoidOnlyAllowed and Void 2xx. A supplier whose static matrix says Void=Yes but whose live behaviour is OperationNotSupported is a matrix/mapping conflict to report.
- **Actual:** Blocked: EgyptAir, OmanAir and AirCairo is out of scope for this round (SabreNdc/EGY only, carriers SV and QR)
- **Status:** BLOCKED
- **Evidence:** Blocked: EgyptAir, OmanAir and AirCairo is out of scope for this round (SabreNdc/EGY only, carriers SV and QR) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-POS-07 — FAIL

- **Test Case:** [Hold]&amp;[BookAfterHold] [Response] Verify a held booking maps to VoidNotAllowed and the same PNR maps to FullVoidOnlyAllowed after BookAfterHold.
- **Category:** Positive
- **Endpoint Name:** Hold
- **Request:** Hold -&gt; PnrReprice -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void on every QR offer (332 chains, V1 and V2)
- **Response:** Hold V1 None 168; V2 None 164; BookAfterHold V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1; Retrieve after V1 FullVoidOnlyAllowed 168; V2 FullVoidOnlyAllowed 164; ids unchanged 332/332; Void 332/332; unbookable offers (409, code 911): 27
- **Expected:** Hold: VoidNotAllowed (no ticket exists yet). After BookAfterHold and on the following Retrieve: FullVoidOnlyAllowed. pnr, gdsPNR, bookingToken unchanged across the hand-off. Void then succeeds.
- **Actual:** Not as expected: Hold flag expected VoidNotAllowed, got V1 None 168; V2 None 164 (332/332 wrong); BookAfterHold expected FullVoidOnlyAllowed, wrong on 2/332; Retrieve after BookAfterHold correct; same pnr/gdsPNR/bookingToken 332/332; Void then succeeded 332/332. Also 27 offers returned by Search could not be held or booked (409 from the supplier, e.g. NOT AVAILABLE IN THIS CONNECTION / No offers match)
- **Status:** FAIL
- **Evidence:** holdNot 332/332; bahNot 2/332; tickNot 0; sameIds 332/332 | Offers returned by Search that the supplier then refuses: 27 of 702 chains (22 on the Hold path, 5 on the direct Book path) fail with HTTP 409 NDC-INT-UNC-Z9999 [FareConfirm: NDC-INT-UNC-Z9999 [{"Value":"No offers match."}] x4; Book: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x1; Book: NDC-INT-UNC-Z9999 [{"Name":"050007","Value":"Error while invoking external client: [Not all requeste x1; Hold: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x9; FareConfirm: NDC-INT-UNC-Z9999 [{"Name":"SupplierServerError","Value":"Resource Not Found (404)"}] x12]: RUH-CAI QR1173+QR1303 (book V1 #5, hold V2 #5); RUH-CAI QR1169+QR1303 (book V2 #10, hold V1 #10); RUH-CAI QR1165+QR1303 (book V1 #14, hold V2 #14); RUH-CAI QR1169+QR1301 (book V1 #17); DMM-CAI QR1151+QR1307 (book V1 #1); DMM-CAI QR1155+QR1303 (hold V2 #12); DMM-CAI QR1151+QR1303 (hold V2 #13); JED-CAI QR1189+QR1303 (hold V2 #10); JED-CAI QR1187+QR1303 (hold V2 #11, hold V1 #11); JED-CAI QR1249+QR1303 (hold V1 #17); CAI-RUH QR1310+QR1168 (hold V1 #15, hold V2 #15); CAI-RUH QR1308+QR1164 (hold V2 #14); CAI-RUH QR1310+QR1172 (hold V1 #16, hold V2 #16); CAI-RUH QR1302+QR1166 (hold V1 #17, hold V2 #17); CAI-RUH QR1304+QR1166 (hold V1 #18, hold V2 #18); CAI-RUH QR1308+QR1166 (hold V1 #19, hold V2 #19); RUH-CAI QR1167+QR1303 (hold V1 #19); DMM-CAI QR1157+QR1301 (hold V2 #10) | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; Build A (earlier build) Hold matrix, before the 09:51 redeploy:** PASS &mdash; 227 chains: Hold {"None":227}; PnrReprice {"(absent)":227}; BookAfterHold {"None":226}; Retrieve after BAH {"None":226}; Void 226 ok
  - **Hop 2 &mdash; Build B (final build) Hold matrix (every QR offer, V1 and V2):** PASS &mdash; 354 Hold chains (332 held, 22 failed) over 20 routes; 332/332 Voids after BookAfterHold succeeded; PNRs left live: 0; median Hold 7.8 s (V1) / 7.8 s (V2)
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 1.9 s
  - **Hop 4 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 5 &mdash; V1 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 6 &mdash; V1 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 7 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 8 &mdash; V1 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.1 s
  - **Hop 9 &mdash; V1 Void:** PASS &mdash; HTTP 200, 9.1 s
  - **Hop 10 &mdash; V1 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.4 s
  - **Hop 11 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 2.0 s
  - **Hop 12 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 13 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 14 &mdash; V2 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 12.8 s
  - **Hop 15 &mdash; V2 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 16 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s
  - **Hop 17 &mdash; V2 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 18 &mdash; V2 Void:** PASS &mdash; HTTP 200, 10.0 s
  - **Hop 19 &mdash; V2 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.4 s

### TC-VOIDCAP-BIZ-01 — FAIL

- **Test Case:** [Book]&amp;[Void] [Response] Verify the voidCapability flag agrees with the Void endpoint outcome for every supplier.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** Book flag vs Void outcome for every ticketed QR booking (343, V1 and V2)
- **Response:** Book FullVoidOnlyAllowed 342/343; first Void attempt 200 voided=true 340/343; first attempt refused with 409 1; first attempt HTTP 500 2 (the booking had in fact been voided: the retry answered "already voided"); every booking ended voided 343/343
- **Expected:** FullVoidOnlyAllowed =&gt; Void 2xx with voided=true. VoidNotAllowed =&gt; Void refused with a mapped error. Absent flag =&gt; defect (VAL-04). Any mismatch (flag allowed but Void refused, or flag not allowed but Void succeeds) is a High defect.
- **Actual:** The flag allowed Void (FullVoidOnlyAllowed) but the first Void attempt did not succeed on 3 of 343 bookings (1 refused with HTTP 409 "oops, something went seriously wrong", 2 answered HTTP 500 although the booking was voided); all of them ended voided; also the flag itself was wrong on 3 responses: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed
- **Status:** FAIL
- **Evidence:** Book FullVoidOnlyAllowed 342/343; first Void attempt 200 voided=true 340/343; first attempt refused with 409 1; first attempt HTTP 500 2 (the booking had in fact been voided: the retry answered "already voided"); every booking ended voided 343/343 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 3.1 s
  - **Hop 2 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 3 &mdash; V1 Void:** PASS &mdash; HTTP 200, 8.8 s
  - **Hop 4 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 3.5 s
  - **Hop 5 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 6 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 7 &mdash; V2 Void:** PASS &mdash; HTTP 200, 9.9 s

### TC-VOIDCAP-BIZ-02 — FAIL

- **Test Case:** [Book]&amp;[Hold]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify the mapping coverage matrix has no empty cell for any supplier.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** Matrix supplier x version x endpoint built from this round's responses (final build)
- **Response:** Book: V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1 | Retrieve (ticketed): V1 FullVoidOnlyAllowed 170; V2 FullVoidOnlyAllowed 172 | Hold: V1 None 168; V2 None 164 | PnrReprice: V1 null 167; V2 null 164 | Retrieve (held): V1 None 168; V2 None 164 | BookAfterHold: V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Retrieve (after BAH): V1 FullVoidOnlyAllowed 168; V2 FullVoidOnlyAllowed 164
- **Expected:** Every endpoint that returns a booking has a unified value; the only N/A cells are endpoints the supplier does not support (409 OperationNotSupported). Absent cells are listed as defects with the supplier and endpoint.
- **Actual:** Cells without an agreed value: Hold, PnrReprice, Retrieve (held)
- **Status:** FAIL
- **Evidence:** Book: V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1 | Retrieve (ticketed): V1 FullVoidOnlyAllowed 170; V2 FullVoidOnlyAllowed 172 | Hold: V1 None 168; V2 None 164 | PnrReprice: V1 null 167; V2 null 164 | Retrieve (held): V1 None 168; V2 None 164 | BookAfterHold: V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Retrieve (after BAH): V1 FullVoidOnlyAllowed 168; V2 FullVoidOnlyAllowed 164 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 1.9 s
  - **Hop 2 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 3 &mdash; V1 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 4 &mdash; V1 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 5 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 6 &mdash; V1 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.1 s
  - **Hop 7 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 2.0 s
  - **Hop 8 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 9 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 10 &mdash; V2 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 12.8 s
  - **Hop 11 &mdash; V2 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 12 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s
  - **Hop 13 &mdash; V2 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s

### TC-VOIDCAP-BIZ-03 — BLOCKED

- **Test Case:** [Book][Response] Verify the marketing carrier on a multi-carrier supplier does not change the voidCapability mapping.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Same unified value and same Void outcome for every carrier on one supplier. A carrier-specific difference (EK absent) is a defect unless the supplier genuinely cannot void that carrier, in which case the value must be VoidNotAllowed.
- **Actual:** Blocked: the case compares carriers on one supplier (QR vs AA); SV has no inventory on SabreNdc/EGY (0 offers in 1,100+ searches) and AA is excluded by the instruction to test SV and QR only, so only one carrier can be exercised. QR alone is consistent across all routes
- **Status:** BLOCKED
- **Evidence:** Blocked: the case compares carriers on one supplier (QR vs AA); SV has no inventory on SabreNdc/EGY (0 offers in 1,100+ searches) and AA is excluded by the instruction to test SV and QR only, so only one carrier can be exercised. QR alone is consistent across all routes | Round 1 (2026-11-04): FAIL

### TC-VOIDCAP-BIZ-04 — BLOCKED

- **Test Case:** [Retrieve][Response] Verify voidCapability turns to VoidNotAllowed once the booking is outside the void window.
- **Category:** Business Rule
- **Endpoint Name:** Retrieve
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** voidCapability = VoidNotAllowed, and Void refused with a mapped business error. The flag is a live, per-booking value (SPEC 4.2/2.15), not a static supplier flag.
- **Actual:** Blocked: it needs ticketed bookings created the previous day and left un-voided; none exist (every earlier SabreNdc booking was voided the same day) and leaving live tickets overnight was not authorised
- **Status:** BLOCKED
- **Evidence:** Blocked: it needs ticketed bookings created the previous day and left un-voided; none exist (every earlier SabreNdc booking was voided the same day) and leaving live tickets overnight was not authorised | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-BIZ-05 — PASS

- **Test Case:** [Void][Request] Verify FullVoidOnlyAllowed means whole-PNR void: a partial voidTickets list is rejected or voids all, and the response says which.
- **Category:** Business Rule
- **Endpoint Name:** Void
- **Request:** Book 2 ADT, Void with voidTickets naming only the first ticket (V1 and V2), then Retrieve
- **Response:** V1: 2 ADT tickets [1572141659100,1572141659099], Void([1572141659100]) -&gt; 200 voided=true, lists 2 ticket(s); Retrieve after: 200; V2: 2 ADT tickets [1572141659109,1572141659110], Void([1572141659109]) -&gt; 200 voided=true, lists 2 ticket(s); Retrieve after: 200
- **Expected:** Either a mapped 4xx rejection with both tickets still active, or a 200 whose voidedTickets lists every ticket actually voided. Never a response that lists only the named ticket while all were voided.
- **Actual:** Either a mapped rejection or a 200 listing every ticket actually voided: both tickets voided and both listed
- **Status:** PASS
- **Evidence:** V1: 2 ADT tickets [1572141659100,1572141659099], Void([1572141659100]) -&gt; 200 voided=true, lists 2 ticket(s); Retrieve after: 200 | V2: 2 ADT tickets [1572141659109,1572141659110], Void([1572141659109]) -&gt; 200 voided=true, lists 2 ticket(s); Retrieve after: 200 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; HTTP 200
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 4 &mdash; V1 Void-partial:** PASS &mdash; HTTP 200
  - **Hop 5 &mdash; V1 Retrieve-after:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed
  - **Hop 6 &mdash; V2 Search:** PASS &mdash; HTTP 200
  - **Hop 7 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200
  - **Hop 8 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200
  - **Hop 9 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 10 &mdash; V2 Void-partial:** PASS &mdash; HTTP 200
  - **Hop 11 &mdash; V2 Retrieve-after:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed

### TC-VOIDCAP-BIZ-06 — PASS

- **Test Case:** [Retrieve]&amp;[Void] [Response] Verify a booking that was voided reports VoidNotAllowed or a terminal state and a second Void is refused.
- **Category:** Business Rule
- **Endpoint Name:** Retrieve
- **Request:** Book -&gt; Void -&gt; Retrieve -&gt; Void again on V1 and V2 (QR CAI-JED)
- **Response:** V1 Retrieve after Void 200 VoidNotAllowed; repeat Void 409; V2 Retrieve after Void 200 VoidNotAllowed FullyCanceled; repeat Void 409
- **Expected:** Retrieve returns VoidNotAllowed or a terminal 409 (TravelportNdc returned 409 on Retrieve after Void). Second Void is refused with a mapped error, not 200.
- **Actual:** The booking reports VoidNotAllowed after Void (V2 also bookingStatus FullyCanceled), and the second Void is refused: V1 409, V2 409
- **Status:** PASS
- **Evidence:** V1 Retrieve after Void 200 VoidNotAllowed; repeat Void 409 | V2 Retrieve after Void 200 VoidNotAllowed FullyCanceled; repeat Void 409 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; HTTP 200
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200
  - **Hop 3 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 4 &mdash; V1 Retrieve-before-void:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 5 &mdash; V1 Void:** PASS &mdash; HTTP 200
  - **Hop 6 &mdash; V1 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed
  - **Hop 7 &mdash; V1 Void-repeat:** PASS &mdash; HTTP 409, NDC-INT-TEC-A0001 [{"Name":"VoidBookingError","Value":"The PNR has already been voided. Repeating the void operation is not allowed."}]
  - **Hop 8 &mdash; V2 Search:** PASS &mdash; HTTP 200
  - **Hop 9 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200
  - **Hop 10 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200
  - **Hop 11 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 12 &mdash; V2 Retrieve-before-void:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 13 &mdash; V2 Void:** PASS &mdash; HTTP 200
  - **Hop 14 &mdash; V2 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed
  - **Hop 15 &mdash; V2 Void-repeat:** PASS &mdash; HTTP 409, NDC-INT-TEC-A0001 [{"Name":"VoidBookingError","Value":"The PNR has already been voided. Repeating the void operation is not allowed."}]

### TC-VOIDCAP-BND-01 — PASS

- **Test Case:** [Book][Response] Verify voidCapability is the same for 1 passenger and for the 9-passenger maximum including an infant.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** 1 ADT vs 9 passengers (5 ADT, 2 CHD, 2 INF) Book and Void on V1 and V2 (QR CAI-JED 2026-12-05)
- **Response:** V1 1 ADT: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1, Book 21.4 s; V1 9 pax (5 ADT, 2 CHD, 2 INF): flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9, Book 62.5 s; V2 1 ADT: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1, Book 20.8 s; V2 9 pax (5 ADT, 2 CHD, 2 INF): flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9, Book 133.4 s
- **Expected:** Same voidCapability for both parties; Void voids every ticket including the infant ticket.
- **Actual:** Same voidCapability for 1 and 9 passengers; Void voids every ticket (9 listed)
- **Status:** PASS
- **Evidence:** V1 1 ADT: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1, Book 21.4 s | V1 9 pax (5 ADT, 2 CHD, 2 INF): flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9, Book 62.5 s | V2 1 ADT: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1, Book 20.8 s | V2 9 pax (5 ADT, 2 CHD, 2 INF): flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9, Book 133.4 s | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 1 pax FareConfirm:** PASS &mdash; HTTP 200, 1.8 s
  - **Hop 2 &mdash; V1 1 pax Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.4 s
  - **Hop 3 &mdash; V1 1 pax Void:** PASS &mdash; HTTP 200, 9.5 s
  - **Hop 4 &mdash; V1 9 pax FareConfirm:** PASS &mdash; HTTP 200, 3.7 s
  - **Hop 5 &mdash; V1 9 pax Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 62.5 s
  - **Hop 6 &mdash; V1 9 pax Void:** PASS &mdash; HTTP 200, 25.8 s
  - **Hop 7 &mdash; V2 1 pax FareConfirm:** PASS &mdash; HTTP 200, 1.8 s
  - **Hop 8 &mdash; V2 1 pax AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 9 &mdash; V2 1 pax Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 20.8 s
  - **Hop 10 &mdash; V2 1 pax Void:** PASS &mdash; HTTP 200, 9.0 s
  - **Hop 11 &mdash; V2 9 pax FareConfirm:** PASS &mdash; HTTP 200, 2.4 s
  - **Hop 12 &mdash; V2 9 pax AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 13 &mdash; V2 9 pax Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 133.4 s
  - **Hop 14 &mdash; V2 9 pax Void:** PASS &mdash; HTTP 200, 22.0 s

### TC-VOIDCAP-BND-02 — PASS

- **Test Case:** [Book][Response] Verify voidCapability is the same for a next-day departure and a far-future departure.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** Book at D+1 (2026-11-06) and at the furthest date with QR offers (2027-07-22) on V1 and V2 (CAI-JED)
- **Response:** V1 near (2026-11-06): FullVoidOnlyAllowed, Void true; V1 far (2027-07-22): FullVoidOnlyAllowed, Void true; V2 near (2026-11-06): FullVoidOnlyAllowed, Void true; V2 far (2027-07-22): FullVoidOnlyAllowed, Void true
- **Expected:** Same value regardless of departure date. The void window is anchored on ticketing time, not on departure time.
- **Actual:** Same voidCapability regardless of departure date
- **Status:** PASS
- **Evidence:** V1 near (2026-11-06): FullVoidOnlyAllowed, Void true | V1 far (2027-07-22): FullVoidOnlyAllowed, Void true | V2 near (2026-11-06): FullVoidOnlyAllowed, Void true | V2 far (2027-07-22): FullVoidOnlyAllowed, Void true | probes: 2027-07-22:19 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 near Search:** PASS &mdash; HTTP 200
  - **Hop 2 &mdash; V1 near Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 3 &mdash; V1 near Void:** PASS &mdash; HTTP 200
  - **Hop 4 &mdash; V1 far Search:** PASS &mdash; HTTP 200
  - **Hop 5 &mdash; V1 far Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 6 &mdash; V1 far Void:** PASS &mdash; HTTP 200
  - **Hop 7 &mdash; V2 near Search:** PASS &mdash; HTTP 200
  - **Hop 8 &mdash; V2 near Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 9 &mdash; V2 near Void:** PASS &mdash; HTTP 200
  - **Hop 10 &mdash; V2 far Search:** PASS &mdash; HTTP 200
  - **Hop 11 &mdash; V2 far Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 12 &mdash; V2 far Void:** PASS &mdash; HTTP 200

### TC-VOIDCAP-BND-03 — FAIL

- **Test Case:** [Book][Response] Verify voidCapability does not vary with cabin, fare class or refundability.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** voidCapability grouped by cabin and booking class across all 343 ticketed QR bookings (V1 and V2)
- **Response:** ECONOMY RBD M: 10 bookings, FullVoidOnlyAllowed 10; ECONOMY RBD N: 278 bookings, FullVoidOnlyAllowed 277, VoidNotAllowed 1; ECONOMY RBD H: 8 bookings, FullVoidOnlyAllowed 8; ECONOMY RBD V: 7 bookings, FullVoidOnlyAllowed 7; ECONOMY RBD K: 5 bookings, FullVoidOnlyAllowed 5; ECONOMY RBD S: 8 bookings, FullVoidOnlyAllowed 8; ECONOMY RBD O: 21 bookings, FullVoidOnlyAllowed 21; ECONOMY RBD T: 6 bookings, FullVoidOnlyAllowed 6
- **Expected:** The same unified value for every fare type; no fare-class-specific native value leaks through.
- **Actual:** Variation: ECONOMY RBD M: 10 bookings, FullVoidOnlyAllowed 10; ECONOMY RBD N: 278 bookings, FullVoidOnlyAllowed 277, VoidNotAllowed 1; ECONOMY RBD H: 8 bookings, FullVoidOnlyAllowed 8; ECONOMY RBD V: 7 bookings, FullVoidOnlyAllowed 7; ECONOMY RBD K: 5 bookings, FullVoidOnlyAllowed 5; ECONOMY RBD S: 8 bookings, FullVoidOnlyAllowed 8; ECONOMY RBD O: 21 bookings, FullVoidOnlyAllowed 21; ECONOMY RBD T: 6 bookings, FullVoidOnlyAllowed 6. The only exception is V2 ALY-RUH #2 (ECONOMY:N, connecting), so the value does not depend on fare class or shape; it is an intermittent wrong value (BUG-05)
- **Status:** FAIL
- **Evidence:** ECONOMY RBD M: 10 bookings, FullVoidOnlyAllowed 10 | ECONOMY RBD N: 278 bookings, FullVoidOnlyAllowed 277, VoidNotAllowed 1 | ECONOMY RBD H: 8 bookings, FullVoidOnlyAllowed 8 | ECONOMY RBD V: 7 bookings, FullVoidOnlyAllowed 7 | ECONOMY RBD K: 5 bookings, FullVoidOnlyAllowed 5 | ECONOMY RBD S: 8 bookings, FullVoidOnlyAllowed 8 | ECONOMY RBD O: 21 bookings, FullVoidOnlyAllowed 21 | ECONOMY RBD T: 6 bookings, FullVoidOnlyAllowed 6 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s

### TC-VOIDCAP-BND-04 — FAIL

- **Test Case:** [Book][Response] Verify voidCapability is the same for one-way, round-trip and multi-segment itineraries.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** One-way direct and connecting from the matrix (343 bookings), plus a round-trip CAI-JED + JED-CAI per version
- **Response:** direct (1 segment): 26 bookings, FullVoidOnlyAllowed 26; connecting (2+ segments): 317 bookings, FullVoidOnlyAllowed 316, VoidNotAllowed 1; V1 round-trip: FullVoidOnlyAllowed, tickets 1, Void true, listing 1; V2 round-trip: FullVoidOnlyAllowed, tickets 1, Void true, listing 1
- **Expected:** Same value and same Void outcome; the response still covers every ticket of the PNR.
- **Actual:** Differences: direct (1 segment): 26 bookings, FullVoidOnlyAllowed 26; connecting (2+ segments): 317 bookings, FullVoidOnlyAllowed 316, VoidNotAllowed 1; V1 round-trip: FullVoidOnlyAllowed, tickets 1, Void true, listing 1; V2 round-trip: FullVoidOnlyAllowed, tickets 1, Void true, listing 1. The only exception is V2 ALY-RUH #2 (ECONOMY:N, connecting), so the value does not depend on fare class or shape; it is an intermittent wrong value (BUG-05)
- **Status:** FAIL
- **Evidence:** direct (1 segment): 26 bookings, FullVoidOnlyAllowed 26 | connecting (2+ segments): 317 bookings, FullVoidOnlyAllowed 316, VoidNotAllowed 1 | V1 round-trip: FullVoidOnlyAllowed, tickets 1, Void true, listing 1; V2 round-trip: FullVoidOnlyAllowed, tickets 1, Void true, listing 1 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 direct Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 2 &mdash; V1 direct Void:** PASS &mdash; HTTP 200
  - **Hop 3 &mdash; V1 connecting Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 4 &mdash; V1 connecting Void:** PASS &mdash; HTTP 200
  - **Hop 5 &mdash; V1 round-trip Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 6 &mdash; V1 round-trip Void:** PASS &mdash; HTTP 200
  - **Hop 7 &mdash; V2 direct Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 8 &mdash; V2 direct Void:** PASS &mdash; HTTP 200
  - **Hop 9 &mdash; V2 connecting Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 10 &mdash; V2 connecting Void:** PASS &mdash; HTTP 200
  - **Hop 11 &mdash; V2 round-trip Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 12 &mdash; V2 round-trip Void:** PASS &mdash; HTTP 200

### TC-VOIDCAP-BND-05 — BLOCKED

- **Test Case:** [Book][Response] Verify bundles, ancillaries and seats on a booking do not change the voidCapability mapping.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** V2 FareConfirm + AddPassenger + GetOfferBundles / GetAncillary / SeatMap on a QR offer
- **Response:** GetOfferBundles: 409 OperationNotSupported; GetAncillary: 409 OperationNotSupported; SeatMap: 409 OperationNotSupported; offer flags {"haveBundles":false,"offerHasAncillary":false,"offerHasSeat":false,"isSeatMapRequired":false,"isBundleRequired":false}
- **Expected:** Same voidCapability as the plain booking. For a Void-supported supplier, enriched Void returns the V2 shape with ancillaries and EMDs listed when present.
- **Actual:** Blocked: SabreNdc/EGY has no bundle, ancillary or seat enrichment (GetOfferBundles 409, GetAncillary 409, SeatMap 409; every offer has haveBundles/offerHasAncillary/offerHasSeat false), and the other suppliers named by the case are out of scope
- **Status:** BLOCKED
- **Evidence:** GetOfferBundles: 409 OperationNotSupported [{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}] | GetAncillary: 409 OperationNotSupported [{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}] | SeatMap: 409 OperationNotSupported [{"Name":"OperationNotSupported","Value":"SabreNdc does not exists"}] | Round 1 (2026-11-04): BLOCKED

  - **FareConfirm (HTTP 200):** HTTP 200
  - **AddPassenger (HTTP 200):** HTTP 200
  - **GetOfferBundles (HTTP 409):** HTTP 409
  - **GetAncillary (HTTP 409):** HTTP 409
  - **SeatMap (HTTP 409):** HTTP 409

### TC-VOIDCAP-NEG-01 — BLOCKED

- **Test Case:** [Book][Response] Verify a Book for a Void-unsupported supplier returns an explicit voidCapability of VoidNotAllowed.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** voidCapability = VoidNotAllowed on both versions. An absent or null value is a defect: unsupported suppliers must be represented, not left blank.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Status:** BLOCKED
- **Evidence:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-NEG-02 — BLOCKED

- **Test Case:** [Void][Response] Verify Void for a Void-unsupported supplier is refused with HTTP 409 OperationNotSupported and a correct, supplier-specific message.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** HTTP 409 with ErrorCode OperationNotSupported in the standard envelope on both versions; Context names the actual supplier, not a misleading text such as "TravelportNdc does not exists"; no raw supplier request/response, no stack or .NET type name.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Status:** BLOCKED
- **Evidence:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-NEG-03 — BLOCKED

- **Test Case:** [Retrieve][Response] Verify a refused Void on an unsupported supplier leaves the booking and its voidCapability unchanged.
- **Category:** Negative
- **Endpoint Name:** Retrieve
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** No field changed: same tickets, same status, voidCapability still VoidNotAllowed. No 5xx.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Status:** BLOCKED
- **Evidence:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-NEG-04 — PASS

- **Test Case:** [Void][Response] Verify Void on a held (VoidNotAllowed) booking of a Void-supported supplier is refused, with the hold left intact.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** Hold, then Void on the held booking, Retrieve, CancelAfterHold (V1 and V2, 2 each; QR CAI-JED)
- **Response:** V1#1: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0; CancelAfterHold 200; V1#2: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0; CancelAfterHold 200; V2#1: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0 OnHold; CancelAfterHold 200; V2#2: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0 OnHold; CancelAfterHold 200
- **Expected:** Void refused with a mapped business error in the standard envelope; Retrieve still shows the hold; CancelAfterHold then succeeds. The error code is identical for every S supplier (record it; do not assume).
- **Actual:** Void refused in the standard envelope (HTTP 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided."), hold intact (0 tickets), CancelAfterHold succeeded
- **Status:** PASS
- **Evidence:** V1#1: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0; CancelAfterHold 200 | V1#2: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0; CancelAfterHold 200 | V2#1: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0 OnHold; CancelAfterHold 200 | V2#2: Hold flag None; Void on hold 400 NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]; Retrieve 200 tickets 0 OnHold; CancelAfterHold 200 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; HTTP 200
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 4 &mdash; V1 Void-on-held:** PASS &mdash; HTTP 400, NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]
  - **Hop 5 &mdash; V1 Retrieve-after-void-on-held:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 6 &mdash; V1 CancelAfterHold:** PASS &mdash; HTTP 200
  - **Hop 7 &mdash; V1 Retrieve-after-cancel:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 8 &mdash; V1 Search:** PASS &mdash; HTTP 200
  - **Hop 9 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200
  - **Hop 10 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 11 &mdash; V1 Void-on-held:** PASS &mdash; HTTP 400, NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]
  - **Hop 12 &mdash; V1 Retrieve-after-void-on-held:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 13 &mdash; V1 CancelAfterHold:** PASS &mdash; HTTP 200
  - **Hop 14 &mdash; V1 Retrieve-after-cancel:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 15 &mdash; V2 Search:** PASS &mdash; HTTP 200
  - **Hop 16 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200
  - **Hop 17 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200
  - **Hop 18 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 19 &mdash; V2 Void-on-held:** PASS &mdash; HTTP 400, NDC-INT-TEC-A0001 [{"Value":"Only fulfilled, ticketed orders can be voided."}]
  - **Hop 20 &mdash; V2 Retrieve-after-void-on-held:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 21 &mdash; V2 CancelAfterHold:** PASS &mdash; HTTP 200
  - **Hop 22 &mdash; V2 Retrieve-after-cancel:** PASS &mdash; HTTP 200, voidCapability None

### TC-VOIDCAP-NEG-05 — BLOCKED

- **Test Case:** [Void][Response] Verify every Void-unsupported supplier returns the same error shape, code and casing on V1 and V2.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Identical status (409) and ErrorCode (OperationNotSupported); identical envelope key casing (a single casing, not the two seen in earlier runs); only supplier-specific Context values differ.
- **Actual:** Blocked: it compares the error shape of several Void-unsupported suppliers and none is in scope
- **Status:** BLOCKED
- **Evidence:** Blocked: it compares the error shape of several Void-unsupported suppliers and none is in scope | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-NEG-06 — PASS

- **Test Case:** [Void][Request] Verify an unknown supplier or an inactive credentialsSelector is rejected as a validation error, not as OperationNotSupported.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** Void with an unknown supplier and with SabreNdc + inactive selectors KSA and UAE, V1 and V2 (dummy ids)
- **Response:** V1 NoSuchSupplier/EGY: 400 1001; V1 SabreNdc/KSA: 400 NDC-INT-TEC-A0001; V1 SabreNdc/UAE: 400 NDC-INT-TEC-A0001; V2 NoSuchSupplier/EGY: 400 1001; V2 SabreNdc/KSA: 400 NDC-INT-TEC-A0001; V2 SabreNdc/UAE: 400 NDC-INT-TEC-A0001
- **Expected:** HTTP 400 ValidationError (credentials not active / supplier not found), distinct from the 409 OperationNotSupported returned for a real supplier without Void.
- **Actual:** HTTP 400 validation errors (credentials not active / unknown supplier), distinct from 409 OperationNotSupported
- **Status:** PASS
- **Evidence:** V1 NoSuchSupplier/EGY: 400 1001 | V1 SabreNdc/KSA: 400 NDC-INT-TEC-A0001 | V1 SabreNdc/UAE: 400 NDC-INT-TEC-A0001 | V2 NoSuchSupplier/EGY: 400 1001 | V2 SabreNdc/KSA: 400 NDC-INT-TEC-A0001 | V2 SabreNdc/UAE: 400 NDC-INT-TEC-A0001 | Round 1 (2026-11-04): PASS

  - **V1 NoSuchSupplier/EGY (HTTP 400):** HTTP 400
  - **V1 SabreNdc/KSA (HTTP 400):** HTTP 400
  - **V1 SabreNdc/UAE (HTTP 400):** HTTP 400
  - **V2 NoSuchSupplier/EGY (HTTP 400):** HTTP 400
  - **V2 SabreNdc/KSA (HTTP 400):** HTTP 400
  - **V2 SabreNdc/UAE (HTTP 400):** HTTP 400

### TC-VOIDCAP-NEG-07 — BLOCKED

- **Test Case:** [Book]&amp;[Void] [Response] Verify suppliers hit by the known capability-lookup name mismatch (Indigo, ElJazeera, OmainAir) do not silently report VoidNotAllowed or lose the field.
- **Category:** Negative
- **Endpoint Name:** Book
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Flag and Void outcome agree (as TC-VOIDCAP-BIZ-01). A flag of VoidNotAllowed for a supplier that actually voids, or an absent flag, is a defect caused by the lookup mismatch.
- **Actual:** Blocked: Indigo, ElJazeera and OmainAir are out of scope for this round (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** Blocked: Indigo, ElJazeera and OmainAir are out of scope for this round (SabreNdc/EGY only) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-NEG-08 — BLOCKED

- **Test Case:** [Void][Request] Verify error precedence is uniform when an unsupported-supplier Void also has an invalid field.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** Void with pnr omitted on the S supplier (SabreNdc) only, V1 and V2
- **Response:** V1 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 [{"Name":"NotEmptyValidator","Value":"PNR is required."}]; V2 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 [{"Name":"NotEmptyValidator","Value":"PNR is required."}]
- **Expected:** Both suppliers return the same kind of error for the same invalid request (either 400 ValidationError first for both, or 409 first for both). Record which; a split is a consistency defect.
- **Actual:** Blocked: the case compares the S supplier with a U supplier (no Void-unsupported supplier is in scope), so a split cannot be judged. The S-supplier half is recorded: V1 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 [{"Name":"NotEmptyValidator","Value":"PNR is required."}]; V2 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 [{"Name":"NotEmptyValidator","Value":"PNR is required."}]
- **Status:** BLOCKED
- **Evidence:** V1 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 [{"Name":"NotEmptyValidator","Value":"PNR is required."}] | V2 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 [{"Name":"NotEmptyValidator","Value":"PNR is required."}] | Round 1 (2026-11-04): BLOCKED

  - **V1 S supplier, pnr omitted (HTTP 400):** HTTP 400
  - **V2 S supplier, pnr omitted (HTTP 400):** HTTP 400

### TC-VOIDCAP-VAL-08 — FAIL

- **Test Case:** [Book][Response] Verify V1 and V2 Book return the identical voidCapability for the same supplier, offer and state.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Book the same offers on V1 and V2 (20 routes, 343 Books) and compare the flag
- **Response:** V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1; routes with a V1/V2 difference: ALY-RUH
- **Expected:** Identical values for every supplier. A version-dependent value is a defect.
- **Actual:** Differs: the same offers return FullVoidOnlyAllowed on both versions except V2 ALY-RUH #2 returned VoidNotAllowed, where the other version returned FullVoidOnlyAllowed
- **Status:** FAIL
- **Evidence:** V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s

### TC-VOIDCAP-VAL-09 — FAIL

- **Test Case:** [Book]&amp;[Retrieve]&amp;[BookAfterHold] [Response] Verify Book, Retrieve and BookAfterHold return the same voidCapability for the same booking state.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Book vs Retrieve (342 pairs) and BookAfterHold vs Retrieve (332 pairs), V1 and V2
- **Response:** Book != Retrieve on 1/342; BookAfterHold != following Retrieve on 2/332
- **Expected:** Same value in each pair. A flag that appears on Book and disappears on Retrieve is a defect.
- **Actual:** Mismatch: Book != Retrieve on 1 of 343 (Book said VoidNotAllowed, Retrieve said FullVoidOnlyAllowed); BookAfterHold != Retrieve on 2 of 332 (BookAfterHold said VoidNotAllowed, Retrieve said FullVoidOnlyAllowed); otherwise identical (BUG-01 and BUG-02 of the earlier build are fixed)
- **Status:** FAIL
- **Evidence:** Book V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1 | Retrieve V1 FullVoidOnlyAllowed 170; V2 FullVoidOnlyAllowed 172 | BookAfterHold V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Retrieve after V1 FullVoidOnlyAllowed 168; V2 FullVoidOnlyAllowed 164 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 3 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 4 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s

### TC-VOIDCAP-VAL-10 — FAIL

- **Test Case:** [Book][Response] Verify all suppliers use the identical literal for the same state (casing, spelling, no suffix or whitespace).
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Group the literals by state across endpoints and compare the strings byte for byte
- **Response:** ticketed and voidable (Book): FullVoidOnlyAllowed 342, VoidNotAllowed 1; ticketed (read-back): FullVoidOnlyAllowed 342; ticketed after BookAfterHold: FullVoidOnlyAllowed 330, VoidNotAllowed 2; held (Hold): None 332; held (read-back): None 332; held (PnrReprice): null 331
- **Expected:** One literal per state across all suppliers: ticketed-and-voidable = FullVoidOnlyAllowed; not voidable = VoidNotAllowed.
- **Actual:** Not one literal per state: the ticketed state is consistent (FullVoidOnlyAllowed), but the held state reports "None" (Hold, Retrieve) or null (PnrReprice) instead of VoidNotAllowed
- **Status:** FAIL
- **Evidence:** ticketed and voidable (Book): FullVoidOnlyAllowed 342, VoidNotAllowed 1 | ticketed (read-back): FullVoidOnlyAllowed 342 | ticketed after BookAfterHold: FullVoidOnlyAllowed 330, VoidNotAllowed 2 | held (Hold): None 332 | held (read-back): None 332 | held (PnrReprice): null 331 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 1.9 s
  - **Hop 2 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 3 &mdash; V1 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 4 &mdash; V1 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 5 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 6 &mdash; V1 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.1 s
  - **Hop 7 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 2.0 s
  - **Hop 8 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 9 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 10 &mdash; V2 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 12.8 s
  - **Hop 11 &mdash; V2 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 12 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s
  - **Hop 13 &mdash; V2 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s

### TC-VOIDCAP-VAL-11 — PASS

- **Test Case:** [Retrieve][Response] Verify repeated Retrieve calls return a stable voidCapability.
- **Category:** Validation
- **Endpoint Name:** Retrieve
- **Request:** 5 Retrieve calls within about a minute, then one after about 10 minutes, on one ticketed booking per version
- **Response:** V1 reads: FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed; V2 reads: FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed
- **Expected:** The same value every time while the state does not change. No flapping between present and absent.
- **Actual:** The value is the same on all 6 reads per version (no flapping between present and absent). Note the stable value is "None", which VAL-03/VAL-09 judge separately
- **Status:** PASS
- **Evidence:** V1 reads: FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | V2 reads: FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | FullVoidOnlyAllowed | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 2 &mdash; V1 Retrieve-1:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 3 &mdash; V1 Retrieve-2:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 4 &mdash; V1 Retrieve-3:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 5 &mdash; V1 Retrieve-4:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 6 &mdash; V1 Retrieve-5:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 7 &mdash; V1 Retrieve-after-10min:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 8 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 9 &mdash; V2 Retrieve-1:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 10 &mdash; V2 Retrieve-2:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 11 &mdash; V2 Retrieve-3:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 12 &mdash; V2 Retrieve-4:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 13 &mdash; V2 Retrieve-5:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 14 &mdash; V2 Retrieve-after-10min:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed

### TC-VOIDCAP-VAL-12 — FAIL

- **Test Case:** [Hold]&amp;[PnrReprice] [Response] Verify Hold and FareConfirmAfterHold (PnrReprice) return the same voidCapability for the same held booking.
- **Category:** Validation
- **Endpoint Name:** Hold
- **Request:** Hold vs PnrReprice for 332 held bookings (V1 and V2)
- **Response:** Hold V1 None 168; V2 None 164; PnrReprice V1 null 167; V2 null 164
- **Expected:** Same value on both (VoidNotAllowed expected, INFERRED). Both present, none absent.
- **Actual:** Mismatch: Hold "None" vs PnrReprice null on 331 of 331 held bookings; neither is the expected VoidNotAllowed
- **Status:** FAIL
- **Evidence:** Hold V1 None 168; V2 None 164 | PnrReprice V1 null 167; V2 null 164 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 2 &mdash; V1 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 3 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 4 &mdash; V2 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 12.8 s

### TC-VOIDCAP-INT-01 — PASS

- **Test Case:** [Book]&amp;[Retrieve]&amp;[Void] [Response] Verify the voidCapability lifecycle Book -&gt; Retrieve -&gt; Void -&gt; Retrieve on every Void-supported supplier.
- **Category:** Integration
- **Endpoint Name:** Book
- **Request:** Book -&gt; Retrieve -&gt; Void -&gt; Retrieve lifecycle on all 343 bookings
- **Response:** Retrieve before Void V1 FullVoidOnlyAllowed 170; V2 FullVoidOnlyAllowed 172; Void 343/343; Retrieve after Void 200 VoidNotAllowed 171, 200 VoidNotAllowed FullyCanceled 172
- **Expected:** FullVoidOnlyAllowed before Void; Void 2xx; after Void either VoidNotAllowed or a terminal 409. Same lifecycle on every S supplier.
- **Actual:** FullVoidOnlyAllowed before Void on 342/342; Void 2xx on 343/343; after Void the Retrieve returns 200 with VoidNotAllowed (V2 bookingStatus FullyCanceled) on 343/343
- **Status:** PASS
- **Evidence:** after Void: 200 VoidNotAllowed 171, 200 VoidNotAllowed FullyCanceled 172 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 2 &mdash; V1 Retrieve-before-void:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 3 &mdash; V1 Void:** PASS &mdash; HTTP 200
  - **Hop 4 &mdash; V1 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed
  - **Hop 5 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 6 &mdash; V2 Retrieve-before-void:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 7 &mdash; V2 Void:** PASS &mdash; HTTP 200
  - **Hop 8 &mdash; V2 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed

### TC-VOIDCAP-INT-02 — FAIL

- **Test Case:** [Hold]&amp;[CancelAfterHold]&amp;[Retrieve] [Response] Verify the voidCapability of a held booking after CancelAfterHold.
- **Category:** Integration
- **Endpoint Name:** Hold
- **Request:** Hold -&gt; CancelAfterHold -&gt; Retrieve on V1 and V2 (2 each)
- **Response:** V1#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null; V1#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null; V2#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold; V2#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold
- **Expected:** A cancelled hold reports VoidNotAllowed or a terminal error; never FullVoidOnlyAllowed. Same behaviour across suppliers.
- **Actual:** Not as expected: Retrieve after a successful CancelAfterHold returns 200 with voidCapability "None" (expected VoidNotAllowed or a terminal error); V2 still reports bookingStatus OnHold
- **Status:** FAIL
- **Evidence:** V1#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null | V1#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null | V2#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold | V2#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 2 &mdash; V1 CancelAfterHold:** PASS &mdash; HTTP 200
  - **Hop 3 &mdash; V1 Retrieve-after-cancel:** FAIL &mdash; HTTP 200, voidCapability None
  - **Hop 4 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None
  - **Hop 5 &mdash; V2 CancelAfterHold:** PASS &mdash; HTTP 200
  - **Hop 6 &mdash; V2 Retrieve-after-cancel:** FAIL &mdash; HTTP 200, voidCapability None

### TC-VOIDCAP-INT-03 — FAIL

- **Test Case:** [Book]&amp;[Void] [Request] Verify a client that gates Void on the flag has no unexpected failures across suppliers.
- **Category:** Integration
- **Endpoint Name:** Book
- **Request:** Gate Void on the flag across the run: Book flag, Retrieve flag, BookAfterHold flag vs the actual Void outcome (675 bookings)
- **Response:** Book FullVoidOnlyAllowed =&gt; Void ok 343/343 (0 failures after the flag allowed); Retrieve(ticketed) not FullVoidOnlyAllowed 0/342; BookAfterHold not FullVoidOnlyAllowed 2/332; Void on held refused true (held flag "None")
- **Expected:** Zero Void failures after the flag allows it; zero successful Voids on bookings the flag blocked (the second check is run once on one S supplier with VoidNotAllowed from TC-VOIDCAP-NEG-04).
- **Actual:** Gate unreliable: a client voiding only when the flag says FullVoidOnlyAllowed would have wrongly skipped 3 voidable bookings (V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed); Retrieve is correct on 342/342
- **Status:** FAIL
- **Evidence:** afterAllow 0; retNot 0/342; bahNot 2/332; held Void refused true | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 3 &mdash; V1 Void:** PASS &mdash; HTTP 200, 8.8 s
  - **Hop 4 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 5 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s
  - **Hop 6 &mdash; V2 Void:** PASS &mdash; HTTP 200, 9.9 s

### TC-VOIDCAP-SEC-01 — FAIL

- **Test Case:** [Book]&amp;[Retrieve]&amp;[Void] [Request] Validate a missing or invalid x-api-key is rejected and no voidCapability is disclosed.
- **Category:** Security
- **Endpoint Name:** Book
- **Request:** Book, Retrieve and Void with a missing or invalid x-api-key on a real ticketed booking (V1 and V2)
- **Response:** Retrieve: 200 4; Void: 401 4; Book: 401 4
- **Expected:** 401 or 403 (exact status UNKNOWN, record it); no booking data and no voidCapability in the body; the booking is not voided.
- **Actual:** Problem: Retrieve with a missing or invalid x-api-key returned HTTP 200 with the full booking and voidCapability on 4 of 4 calls (Void and Book were refused with 401 and nothing was voided)
- **Status:** FAIL
- **Evidence:** Retrieve: 200 4; Void: 401 4; Book: 401 4 | Round 1 (2026-11-04): FAIL

  - **V1 Retrieve - no x-api-key (HTTP 200):** HTTP 200
  - **V1 Retrieve - invalid x-api-key (HTTP 200):** HTTP 200
  - **V1 Void - no x-api-key (HTTP 401):** HTTP 401
  - **V1 Void - invalid x-api-key (HTTP 401):** HTTP 401
  - **V1 Book - no x-api-key (HTTP 401):** HTTP 401
  - **V1 Book - invalid x-api-key (HTTP 401):** HTTP 401
  - **V2 Retrieve - no x-api-key (HTTP 200):** HTTP 200
  - **V2 Retrieve - invalid x-api-key (HTTP 200):** HTTP 200
  - **V2 Void - no x-api-key (HTTP 401):** HTTP 401
  - **V2 Void - invalid x-api-key (HTTP 401):** HTTP 401
  - **V2 Book - no x-api-key (HTTP 401):** HTTP 401
  - **V2 Book - invalid x-api-key (HTTP 401):** HTTP 401

### TC-VOIDCAP-SEC-02 — FAIL

- **Test Case:** [Book]&amp;[Retrieve]&amp;[Void] [Request] Validate a missing or invalid Client-Id is rejected and no voidCapability is disclosed.
- **Category:** Security
- **Endpoint Name:** Book
- **Request:** Book, Retrieve and Void with a missing or invalid Client-Id on a real ticketed booking (V1 and V2)
- **Response:** Retrieve: 200 6; Void: 401 6; Book: 401 2
- **Expected:** Same rejection as SEC-01; nothing disclosed or voided.
- **Actual:** Problem: Retrieve with a missing or invalid Client-Id returned HTTP 200 with the full booking and voidCapability on 6 of 6 calls (Void and Book were refused with 401 and nothing was voided)
- **Status:** FAIL
- **Evidence:** Retrieve: 200 6; Void: 401 6; Book: 401 2 | Round 1 (2026-11-04): FAIL

  - **V1 Retrieve - no Client-Id (HTTP 200):** HTTP 200
  - **V1 Retrieve - invalid Client-Id (HTTP 200):** HTTP 200
  - **V1 Retrieve - lower-case client-id invalid (HTTP 200):** HTTP 200
  - **V1 Void - no Client-Id (HTTP 401):** HTTP 401
  - **V1 Void - invalid Client-Id (HTTP 401):** HTTP 401
  - **V1 Void - lower-case client-id invalid (HTTP 401):** HTTP 401
  - **V1 Book - no Client-Id (HTTP 401):** HTTP 401
  - **V2 Retrieve - no Client-Id (HTTP 200):** HTTP 200
  - **V2 Retrieve - invalid Client-Id (HTTP 200):** HTTP 200
  - **V2 Retrieve - lower-case client-id invalid (HTTP 200):** HTTP 200
  - **V2 Void - no Client-Id (HTTP 401):** HTTP 401
  - **V2 Void - invalid Client-Id (HTTP 401):** HTTP 401
  - **V2 Void - lower-case client-id invalid (HTTP 401):** HTTP 401
  - **V2 Book - no Client-Id (HTTP 401):** HTTP 401

### TC-VOIDCAP-SEC-03 — BLOCKED

- **Test Case:** [Retrieve]&amp;[Void] [Request] Validate a booking created under one supplier/credentialsSelector cannot be read or voided under another.
- **Category:** Security
- **Endpoint Name:** Retrieve
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Both calls rejected (status UNKNOWN, record it) without disclosing voidCapability or ticket data; original booking still ticketed. Another supplier's credentials never act on the PNR.
- **Actual:** Blocked: its core step sends a SabreNdc booking's ids to TravelportNdc/UAE, which is out of scope for this round (the only other SabreNdc selectors, KSA and UAE, are inactive: see NEG-06)
- **Status:** BLOCKED
- **Evidence:** Blocked: its core step sends a SabreNdc booking's ids to TravelportNdc/UAE, which is out of scope for this round (the only other SabreNdc selectors, KSA and UAE, are inactive: see NEG-06) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-SEC-04 — PASS

- **Test Case:** [Book]&amp;[Void] [Request] Validate a voidCapability value sent in the request body is ignored.
- **Category:** Security
- **Endpoint Name:** Book
- **Request:** Book and Void bodies with an extra "voidCapability" field (VoidNotAllowed and FullVoidOnlyAllowed), V1 and V2
- **Response:** V1 injected "VoidNotAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true; V1 injected "FullVoidOnlyAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true; V2 injected "VoidNotAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true; V2 injected "FullVoidOnlyAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true
- **Expected:** Responses identical to the calls without the field: the flag is derived by the server, not accepted from the client; the U-supplier Void is still refused.
- **Actual:** The extra field is ignored: the flag is still FullVoidOnlyAllowed and Void still works
- **Status:** PASS
- **Evidence:** V1 injected "VoidNotAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true | V1 injected "FullVoidOnlyAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true | V2 injected "VoidNotAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true | V2 injected "FullVoidOnlyAllowed": Book flag FullVoidOnlyAllowed, Void 200 voided=true | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book (sent VoidNotAllowed):** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 2 &mdash; V1 Void-with-extra-field (sent VoidNotAllowed):** PASS &mdash; HTTP 200
  - **Hop 3 &mdash; V1 Book (sent FullVoidOnlyAllowed):** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 4 &mdash; V1 Void-with-extra-field (sent FullVoidOnlyAllowed):** PASS &mdash; HTTP 200
  - **Hop 5 &mdash; V2 Book (sent VoidNotAllowed):** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 6 &mdash; V2 Void-with-extra-field (sent VoidNotAllowed):** PASS &mdash; HTTP 200

### TC-VOIDCAP-SEC-05 — BLOCKED

- **Test Case:** [Void][Request] Validate injection payloads in surName on a Void-unsupported supplier are not reflected and do not change the outcome.
- **Category:** Security
- **Endpoint Name:** Void
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** The same 409 OperationNotSupported as for a clean surName, with the payload not echoed back and no 5xx.
- **Actual:** Blocked: it needs a Void-unsupported supplier so that no booking is consumed; none is in scope
- **Status:** BLOCKED
- **Evidence:** Blocked: it needs a Void-unsupported supplier so that no booking is consumed; none is in scope | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-SEC-06 — FAIL

- **Test Case:** [Void][Response] Verify Void-related error responses expose no supplier credentials, raw supplier payload or internal type names.
- **Category:** Security
- **Endpoint Name:** Void
- **Request:** Scan of 615 error bodies collected in this round (plus two unknown-order Voids) for credentials, raw supplier payloads, .NET type names, stack traces
- **Response:** error key sets: PascalCase 609, camelCase 6; leaks: NDC.Integrations. | Void 400 x6; OriginalSupplierRequest | Void 409 x5; OriginalSupplierResponse | Void 409 x5; OriginalSupplierRequest | FareConfirm 409 x34; OriginalSupplierResponse | FareConfirm 409 x34; OriginalSupplierRequest | Hold 409 x13; OriginalSupplierResponse | Hold 409 x13; OriginalSupplierRequest | Book 409 x3; OriginalSupplierResponse | Book 409 x3
- **Expected:** None present; error bodies contain only the standard envelope (Status, TransactionId, ErrorCode, ErrorMessage, Context).
- **Actual:** Leaks found: NDC.Integrations. | Void 400 x6; OriginalSupplierRequest | Void 409 x5; OriginalSupplierResponse | Void 409 x5; OriginalSupplierRequest | FareConfirm 409 x34; OriginalSupplierResponse | FareConfirm 409 x34; OriginalSupplierRequest | Hold 409 x13; OriginalSupplierResponse | Hold 409 x13; OriginalSupplierRequest | Book 409 x3; OriginalSupplierResponse | Book 409 x3
- **Status:** FAIL
- **Evidence:** forbidden strings searched: OriginalSupplierRequest, OriginalSupplierResponse, supplierRequest, supplierResponse, wsse, Username, Password, System., StackTrace, at Ndc, Exception, NDC.Integrations. | examples: NDC.Integrations. | Void 400 -&gt; 00031_neg6_v1_NoSuchSupplier_EGY; OriginalSupplierRequest | Void 409 -&gt; 00094_sec6_v1_unknown; OriginalSupplierResponse | Void 409 -&gt; 00094_sec6_v1_unknown; OriginalSupplierRequest | FareConfirm 409 -&gt; 00383_book_v2_CAI-JED_17_FareConfirm; OriginalSupplierResponse | FareConfirm 409 -&gt; 00383_book_v2_CAI-JED_17_FareConfirm; OriginalSupplierRequest | Hold 409 -&gt; 01081_hold_v2_RUH-CAI_5_Hold; OriginalSupplierResponse | Hold 409 -&gt; 01081_hold_v2_RUH-CAI_5_Hold; OriginalSupplierRequest | Book 409 -&gt; 01620_book_v1_MED-CAI_8_Book; OriginalSupplierResponse | Book 409 -&gt; 01620_book_v1_MED-CAI_8_Book | envelope casings: PascalCase 609, camelCase 6 | Round 1 (2026-11-04): FAIL

  - **V1 Void unknown order (HTTP 409):** HTTP 409
  - **V2 Void unknown order (HTTP 409):** HTTP 409

### TC-VOIDCAP-REG-01 — FAIL

- **Test Case:** [SabreNdc][Void][Response] Verify the SabreNdc Void success contract is unchanged by the unified mapping.
- **Category:** Regression
- **Endpoint Name:** SabreNdc / Void
- **Request:** Void response shape across all 343 Voids vs the 2026-10-22/11-04 baseline
- **Response:** key sets: v1:voided,voidedTickets x169; v2:voided,voidedTickets,passengersVoidedAncillaries,emdTickets x171; voided=true 343/343; HTTP 500 on first Void 2; median V1 9.2 s, V2 9.1 s
- **Expected:** Same keys and types as the baseline; Void still takes about 10 s; voided=true.
- **Actual:** Shape is unchanged on 340 successful Voids, but 2 Void(s) answered HTTP 500 (after about 9.4 s) although the booking was in fact voided (the retry said "already voided"); 1 Void(s) were refused on the first attempt with HTTP 409 "oops, something went seriously wrong" (BUG-06) and succeeded on retry
- **Status:** FAIL
- **Evidence:** key sets: v1:voided,voidedTickets x169; v2:voided,voidedTickets,passengersVoidedAncillaries,emdTickets x171; voided=true 343/343; HTTP 500 on first Void 2; median V1 9.2 s, V2 9.1 s | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Void:** PASS &mdash; HTTP 200, 8.8 s
  - **Hop 2 &mdash; V2 Void:** PASS &mdash; HTTP 200, 9.9 s

### TC-VOIDCAP-REG-02 — BLOCKED

- **Test Case:** [TravelportNdc][Void][Response] Verify the TravelportNdc Void success contract is unchanged by the unified mapping.
- **Category:** Regression
- **Endpoint Name:** TravelportNdc / Void
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Same shape as the baseline, V1 and V2 behave identically.
- **Actual:** Blocked: TravelportNdc is out of scope for this round (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** Blocked: TravelportNdc is out of scope for this round (SabreNdc/EGY only) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-REG-03 — PASS

- **Test Case:** [Book][Response] Verify the only change in the Book response schema of each supplier is the voidCapability normalisation.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Book response key sets and price reconciliation across 343 Books (V1 and V2) vs the 2026-11-04 capture
- **Response:** Book key sets vs Build A: V1 added [] removed []; V2 added [] removed []; total = base + tax on 343/343; Book total = FareConfirm total on 343/343
- **Expected:** No field added, removed, renamed or retyped other than voidCapability. Price reconciliation passes exactly as before (known baseline defects aside).
- **Actual:** No field added, removed, renamed or retyped other than voidCapability (identical key sets before and after the redeploy); price reconciliation passes exactly as before
- **Status:** PASS
- **Evidence:** Book key sets vs Build A: V1 added [] removed []; V2 added [] removed []; total = base + tax on 343/343; Book total = FareConfirm total on 343/343 | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 2 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s

### TC-VOIDCAP-REG-04 — PASS

- **Test Case:** [Retrieve][Response] Verify the Retrieve response schema of each supplier is unchanged apart from voidCapability.
- **Category:** Regression
- **Endpoint Name:** Retrieve
- **Request:** Retrieve response key sets across 343 ticketed and 332 held Retrieves vs the 2026-11-04 capture
- **Response:** Retrieve key sets vs Build A: V1 added [] removed []; V2 added [] removed []
- **Expected:** Same fields and types; bookingStatus, tickets, passengersList, selectedOffer unchanged.
- **Actual:** Retrieve schema unchanged on V1 and V2 for ticketed and held bookings; the only difference from the 2026-10-25 baseline is the voidCapability field
- **Status:** PASS
- **Evidence:** Retrieve key sets vs Build A: V1 added [] removed []; V2 added [] removed [] | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 2 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s

### TC-VOIDCAP-REG-05 — FAIL

- **Test Case:** [Hold]&amp;[PnrReprice]&amp;[BookAfterHold]&amp;[CancelAfterHold] [Response] Verify the Hold branch of Hold-capable suppliers behaves as before.
- **Category:** Regression
- **Endpoint Name:** Hold
- **Request:** Hold -&gt; PnrReprice -&gt; BookAfterHold (332 chains) and Hold -&gt; CancelAfterHold (4 chains)
- **Response:** same-PNR invariant 332/332; holdExpirationDate present 332/332; CancelAfterHold ok 4/4; HTTP 5xx: BookAfterHold 500, RetrieveBooking 500, Void 500, Book 500, Hold 500, Void 500, PnrReprice 500, Hold 500; unbookable offers (409, code 911): 27
- **Expected:** Same results as the baseline suites: same-PNR invariant holds; holdExpirationDate present; CancelAfterHold succeeds.
- **Actual:** Not as expected: 5 hold-branch call(s) returned HTTP 500 ServerError (BookAfterHold at 09:08:26; RetrieveBooking at 09:08:26; Hold at 10:06:26; PnrReprice at 10:06:21; Hold at 10:06:24); otherwise as baseline: Same results as the baseline suites: same-PNR invariant holds, holdExpirationDate present, CancelAfterHold succeeds. Also 27 offers returned by Search could not be held or booked (409 from the supplier, e.g. NOT AVAILABLE IN THIS CONNECTION / No offers match)
- **Status:** FAIL
- **Evidence:** sameIds 332/332; holdExp 332/332 | isolated 5xx: 00020_hold_v2_JED-CAI_0_BookAfterHold 500 tx 103d8f4c-13a5-4c88-bc70-5b233cc12a6b; 00021_hold_v1_CAI-JED_0_Retrieve-held 500 tx 1f69ebf7-13cd-4219-b8ae-8a496d38b067; 00239_book_v2_DOH-CAI_2_Void 500 tx null; 00240_book_v1_CAI-DOH_3_Book 500 tx null; 00272_hold_v2_MED-CAI_6_Hold 500 tx null; 00241_book_v1_DOH-CAI_2_Void 500 tx null; 00273_hold_v1_MED-CAI_7_PnrReprice 500 tx null; 00274_hold_v1_CAI-MED_5_Hold 500 tx null | a separate 20 s platform-wide outage (09:51:06-09:51:25 UTC, 125 calls, HTTP 500 with an empty body) hit every chain; the affected routes were re-run | Offers returned by Search that the supplier then refuses: 27 of 702 chains (22 on the Hold path, 5 on the direct Book path) fail with HTTP 409 NDC-INT-UNC-Z9999 [FareConfirm: NDC-INT-UNC-Z9999 [{"Value":"No offers match."}] x4; Book: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x1; Book: NDC-INT-UNC-Z9999 [{"Name":"050007","Value":"Error while invoking external client: [Not all requeste x1; Hold: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x9; FareConfirm: NDC-INT-UNC-Z9999 [{"Name":"SupplierServerError","Value":"Resource Not Found (404)"}] x12]: RUH-CAI QR1173+QR1303 (book V1 #5, hold V2 #5); RUH-CAI QR1169+QR1303 (book V2 #10, hold V1 #10); RUH-CAI QR1165+QR1303 (book V1 #14, hold V2 #14); RUH-CAI QR1169+QR1301 (book V1 #17); DMM-CAI QR1151+QR1307 (book V1 #1); DMM-CAI QR1155+QR1303 (hold V2 #12); DMM-CAI QR1151+QR1303 (hold V2 #13); JED-CAI QR1189+QR1303 (hold V2 #10); JED-CAI QR1187+QR1303 (hold V2 #11, hold V1 #11); JED-CAI QR1249+QR1303 (hold V1 #17); CAI-RUH QR1310+QR1168 (hold V1 #15, hold V2 #15); CAI-RUH QR1308+QR1164 (hold V2 #14); CAI-RUH QR1310+QR1172 (hold V1 #16, hold V2 #16); CAI-RUH QR1302+QR1166 (hold V1 #17, hold V2 #17); CAI-RUH QR1304+QR1166 (hold V1 #18, hold V2 #18); CAI-RUH QR1308+QR1166 (hold V1 #19, hold V2 #19); RUH-CAI QR1167+QR1303 (hold V1 #19); DMM-CAI QR1157+QR1301 (hold V2 #10) | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 1.9 s
  - **Hop 2 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 3 &mdash; V1 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 4 &mdash; V1 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 5 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 6 &mdash; V1 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.1 s
  - **Hop 7 &mdash; V1 Void:** PASS &mdash; HTTP 200, 9.1 s
  - **Hop 8 &mdash; V1 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.4 s
  - **Hop 9 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 2.0 s
  - **Hop 10 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 11 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 12 &mdash; V2 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 12.8 s
  - **Hop 13 &mdash; V2 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 14 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s
  - **Hop 15 &mdash; V2 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 16 &mdash; V2 Void:** PASS &mdash; HTTP 200, 10.0 s
  - **Hop 17 &mdash; V2 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.4 s

### TC-VOIDCAP-REG-06 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify the offer-level capability flags (canBeHeld, haveBundles, offerHasAncillary, offerHasSeat) are unchanged.
- **Category:** Regression
- **Endpoint Name:** Search
- **Request:** Offer-level flags on 612 V1 and 605 V2 FareConfirm responses
- **Response:** canBeHeld 612/612 (V1), 605/605 (V2); haveBundles 0; offerHasAncillary 0; offerHasSeat 0; isSeatMapRequired 0
- **Expected:** Same flag values per supplier (SabreNdc all canBeHeld; TravelportNdc canBeHeld all true and haveBundles false; AirIndia haveBundles true and canBeHeld false).
- **Actual:** Same flags as the baseline: every offer canBeHeld, no bundles, no ancillary, no seats
- **Status:** PASS
- **Evidence:** {"v1":{"n":612,"canBeHeld":612,"haveBundles":0},"v2":{"n":605,"canBeHeld":605,"haveBundles":0,"offerHasAncillary":0,"offerHasSeat":0,"isSeatMapRequired":0}} | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 3.1 s
  - **Hop 2 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 3.5 s

### TC-VOIDCAP-REG-07 — BLOCKED

- **Test Case:** [AirIndia][Response] Verify every other unsupported AirIndia operation still returns 409 OperationNotSupported after the change.
- **Category:** Regression
- **Endpoint Name:** AirIndia
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** 409 OperationNotSupported for each, uniform with the Void refusal from TC-VOIDCAP-NEG-02. Nothing created or changed.
- **Actual:** Blocked: AirIndia is out of scope for this round (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** Blocked: AirIndia is out of scope for this round (SabreNdc/EGY only) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-REG-08 — BLOCKED

- **Test Case:** [FlyAdeal]&amp;[GulfAir] [Response] Verify existing supplier-specific flows (FlyAdeal bundle, GulfAir SeatMap) still book and price correctly.
- **Category:** Regression
- **Endpoint Name:** FlyAdeal
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Same results as the earlier FlyAdeal bundle and GulfAir SeatMap suites; voidCapability present with a unified value.
- **Actual:** Blocked: FlyAdeal and GulfAir are out of scope for this round (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** Blocked: FlyAdeal and GulfAir are out of scope for this round (SabreNdc/EGY only) | Round 1 (2026-11-04): BLOCKED

### TC-VOIDCAP-REG-09 — FAIL

- **Test Case:** [Book]&amp;[Retrieve] [Response] Verify the previously filed voidCapability defects are re-checked, not lost.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Re-run the exact condition of each tracked SabreNdc voidCapability defect (TravelportNdc and AirIndia items are out of scope), on the final build
- **Response:** BUG-01 Retrieve returns "None" for a ticketed booking: fixed (Retrieve not FullVoidOnlyAllowed on 0/342); BUG-02 BookAfterHold returns "None": fixed (BookAfterHold "None" on 0/332); BUG-03 Hold/held Retrieve return "None" instead of VoidNotAllowed: still reproducing (Hold wrong on 332/332, held Retrieve wrong on 332/332); BUG-04 PnrReprice omits the flag: changed but not fixed (key now present with value null) (PnrReprice null 331); BUG-05 Book/BookAfterHold labels a voidable booking VoidNotAllowed: still reproducing (now on QR, intermittent) (3 of 675 bookings)
- **Expected:** Each defect is closed by the unified mapping. A defect still reproducing is a recurrence of the original bug, referenced by its id.
- **Actual:** Not closed by the unified mapping: BUG-03, BUG-04, BUG-05. Closed: BUG-01, BUG-02
- **Status:** FAIL
- **Evidence:** BUG-01 Retrieve returns "None" for a ticketed booking: fixed (Retrieve not FullVoidOnlyAllowed on 0/342) | BUG-02 BookAfterHold returns "None": fixed (BookAfterHold "None" on 0/332) | BUG-03 Hold/held Retrieve return "None" instead of VoidNotAllowed: still reproducing (Hold wrong on 332/332, held Retrieve wrong on 332/332) | BUG-04 PnrReprice omits the flag: changed but not fixed (key now present with value null) (PnrReprice null 331) | BUG-05 Book/BookAfterHold labels a voidable booking VoidNotAllowed: still reproducing (now on QR, intermittent) (3 of 675 bookings) | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; Build A (earlier build) one-off scenarios:** PASS &mdash; See the individual cases for the final-build results; the earlier-build results are summarised in the Findings
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 1.9 s
  - **Hop 3 &mdash; V1 Hold:** PASS &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 4 &mdash; V1 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 5 &mdash; V1 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 6 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 7 &mdash; V1 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.1 s
  - **Hop 8 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 2.0 s
  - **Hop 9 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 10 &mdash; V2 Hold:** PASS &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 11 &mdash; V2 PnrReprice:** PASS &mdash; HTTP 200, voidCapability null, 12.8 s
  - **Hop 12 &mdash; V2 Retrieve-held:** PASS &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 13 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s
  - **Hop 14 &mdash; V2 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s

### TC-VOIDCAP-REG-10 — PASS

- **Test Case:** [Book][Request] Verify existing clients keep working: the Book and Void request contracts are unchanged and no new field is required.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Replay the unchanged Book and Void request shapes from the earlier SabreNdc suites (fresh ids; Void with gdsPNR "" and voidTickets [])
- **Response:** V1: Book 200 flag FullVoidOnlyAllowed; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided=true; V2: Book 200 flag FullVoidOnlyAllowed; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided=true
- **Expected:** HTTP 200 as before for Book and, on S suppliers, Void; no new required field, no change in the required-field validation messages.
- **Actual:** HTTP 200 as before, no new required field
- **Status:** PASS
- **Evidence:** V1: Book 200 flag FullVoidOnlyAllowed; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided=true | V2: Book 200 flag FullVoidOnlyAllowed; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided=true | Round 1 (2026-11-04): PASS

  - **Hop 1 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 2 &mdash; V1 Void-saved-shape:** PASS &mdash; HTTP 200
  - **Hop 3 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed
  - **Hop 4 &mdash; V2 Void-saved-shape:** PASS &mdash; HTTP 200

### TC-VOIDCAP-REG-11 — FAIL

- **Test Case:** [Book][Response] Verify the mapping does not slow Book or Void beyond the known per-supplier baseline.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** 3 sequential Book + Void runs per version (QR CAI-JED), no other traffic; compare with the baseline Book ~16 s, Void ~10 s
- **Response:** Sequential run, no parallel load, 3 per version: V1 Book 21.7 s, 21.5 s, 21.6 s (median 21.6 s), Void median 9.7 s; V2 Book 21.7 s, 21.2 s, 21.4 s (median 21.4 s), Void median 9.2 s
- **Expected:** Median duration within 20% of the baseline (threshold chosen for this case; no SLA is documented in SPEC).
- **Actual:** Slower than 120% of the baseline: V1 Book median 21.6 s, V2 21.4 s (&gt; 19.2 s)
- **Status:** FAIL
- **Evidence:** Sequential run, no parallel load, 3 per version: V1 Book 21.7 s, 21.5 s, 21.6 s (median 21.6 s), Void median 9.7 s; V2 Book 21.7 s, 21.2 s, 21.4 s (median 21.4 s), Void median 9.2 s | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 run 1 Book:** FAIL &mdash; HTTP 200, 21.7 s
  - **Hop 2 &mdash; V1 run 1 Void:** PASS &mdash; HTTP 200, 9.7 s
  - **Hop 3 &mdash; V1 run 2 Book:** FAIL &mdash; HTTP 200, 21.5 s
  - **Hop 4 &mdash; V1 run 2 Void:** PASS &mdash; HTTP 200, 9.9 s
  - **Hop 5 &mdash; V1 run 3 Book:** FAIL &mdash; HTTP 200, 21.6 s
  - **Hop 6 &mdash; V1 run 3 Void:** PASS &mdash; HTTP 200, 9.2 s
  - **Hop 7 &mdash; V2 run 1 Book:** FAIL &mdash; HTTP 200, 21.7 s
  - **Hop 8 &mdash; V2 run 1 Void:** PASS &mdash; HTTP 200, 9.2 s
  - **Hop 9 &mdash; V2 run 2 Book:** FAIL &mdash; HTTP 200, 21.2 s
  - **Hop 10 &mdash; V2 run 2 Void:** PASS &mdash; HTTP 200, 9.3 s
  - **Hop 11 &mdash; V2 run 3 Book:** FAIL &mdash; HTTP 200, 21.4 s
  - **Hop 12 &mdash; V2 run 3 Void:** PASS &mdash; HTTP 200, 9.0 s

### FLOW-V1-03-VOIDCAP — PASS

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #3 completes with a consistent voidCapability for every Void-supported supplier.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #3 (Book, Retrieve, Void)
- **Request:** Search -&gt; FareConfirm -&gt; Book -&gt; Retrieve -&gt; Void -&gt; Retrieve (V1, every QR offer on 20 routes)
- **Response:** Book FullVoidOnlyAllowed 171; Retrieve FullVoidOnlyAllowed 170; Void 171/171; final Retrieve 200 VoidNotAllowed 171
- **Expected:** Every hop 2xx; Book and Retrieve return the same FullVoidOnlyAllowed; Void succeeds; final Retrieve shows the voided state.
- **Actual:** Every hop 2xx; Book and Retrieve both FullVoidOnlyAllowed; Void succeeds; the final Retrieve shows the voided state (VoidNotAllowed) on 171/171 bookings
- **Status:** PASS
- **Evidence:** Book FullVoidOnlyAllowed 171; Retrieve FullVoidOnlyAllowed 170; Void 171/171; final Retrieve 200 VoidNotAllowed 171 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 3.1 s
  - **Hop 2 &mdash; V1 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.3 s
  - **Hop 3 &mdash; V1 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 4 &mdash; V1 Void:** PASS &mdash; HTTP 200, 8.8 s
  - **Hop 5 &mdash; V1 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.2 s

### FLOW-V1-05-VOIDCAP — FAIL

- **Test Case:** [Hold]&amp;[FareConfirmAfterHold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #5 maps VoidNotAllowed at Hold and FullVoidOnlyAllowed after BookAfterHold for every Hold-capable S supplier.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #5 (Hold, BookAfterHold, Void)
- **Request:** Search -&gt; FareConfirm -&gt; Hold -&gt; PnrReprice -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void (V1, every QR offer)
- **Response:** Hold None 168; PnrReprice null 168; BookAfterHold FullVoidOnlyAllowed 167, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 168; ids unchanged 168/168; Void 168/168
- **Expected:** Hold and PnrReprice: VoidNotAllowed. BookAfterHold and the next Retrieve: FullVoidOnlyAllowed. pnr, gdsPNR, bookingToken unchanged; Void succeeds.
- **Actual:** Not as expected: Hold expected VoidNotAllowed, got None 168; PnrReprice expected VoidNotAllowed, got null 168; BookAfterHold wrong; same ids true; Void true
- **Status:** FAIL
- **Evidence:** Hold None 168; PnrReprice null 168; BookAfterHold FullVoidOnlyAllowed 167, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 168; ids unchanged 168/168; Void 168/168 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V1 FareConfirm:** PASS &mdash; HTTP 200, 1.9 s
  - **Hop 2 &mdash; V1 Hold:** FAIL &mdash; HTTP 200, voidCapability None, 8.1 s
  - **Hop 3 &mdash; V1 PnrReprice:** FAIL &mdash; HTTP 200, voidCapability null, 13.4 s
  - **Hop 4 &mdash; V1 Retrieve-held:** FAIL &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 5 &mdash; V1 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.2 s
  - **Hop 6 &mdash; V1 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.1 s
  - **Hop 7 &mdash; V1 Void:** PASS &mdash; HTTP 200, 9.1 s
  - **Hop 8 &mdash; V1 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.4 s

### FLOW-V2-27-VOIDCAP — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify V2 Family-C flow #27 completes with a consistent voidCapability for every Void-supported supplier.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #27 (AddPassenger, Book, Retrieve, Void)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Book -&gt; Retrieve -&gt; Void -&gt; Retrieve (V2, every QR offer on 20 routes)
- **Response:** Book FullVoidOnlyAllowed 171, VoidNotAllowed 1; Retrieve FullVoidOnlyAllowed 172; Void 172/172; final Retrieve 200 VoidNotAllowed FullyCanceled 172
- **Expected:** Same expectations as FLOW-V1-03-VOIDCAP; V2 Void returns passengersVoidedAncillaries and emdTickets; voidCapability identical to the V1 flow for the same supplier.
- **Actual:** Not as expected: Book FullVoidOnlyAllowed 171, VoidNotAllowed 1; Retrieve FullVoidOnlyAllowed 172; Void 172/172; final Retrieve 200 VoidNotAllowed FullyCanceled 172
- **Status:** FAIL
- **Evidence:** Book FullVoidOnlyAllowed 171, VoidNotAllowed 1; Retrieve FullVoidOnlyAllowed 172; Void 172/172; final Retrieve 200 VoidNotAllowed FullyCanceled 172 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 3.5 s
  - **Hop 2 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 3 &mdash; V2 Book:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 21.0 s
  - **Hop 4 &mdash; V2 Retrieve:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.5 s
  - **Hop 5 &mdash; V2 Void:** PASS &mdash; HTTP 200, 9.9 s
  - **Hop 6 &mdash; V2 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.5 s

### FLOW-V2-29-VOIDCAP — FAIL

- **Test Case:** [Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify V2 Family-E flow #29 maps VoidNotAllowed at Hold and FullVoidOnlyAllowed after BookAfterHold.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #29 (Hold, BookAfterHold, Void)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; PnrReprice -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void (V2, every QR offer)
- **Response:** Hold None 164; PnrReprice null 164; BookAfterHold FullVoidOnlyAllowed 163, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 164; ids unchanged 164/164; Void 164/164
- **Expected:** Same expectations as FLOW-V1-05-VOIDCAP on V2.
- **Actual:** Not as expected: Hold expected VoidNotAllowed, got None 164; PnrReprice expected VoidNotAllowed, got null 164; BookAfterHold wrong; same ids true; Void true
- **Status:** FAIL
- **Evidence:** Hold None 164; PnrReprice null 164; BookAfterHold FullVoidOnlyAllowed 163, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 164; ids unchanged 164/164; Void 164/164 | Round 1 (2026-11-04): FAIL

  - **Hop 1 &mdash; V2 FareConfirm:** PASS &mdash; HTTP 200, 2.0 s
  - **Hop 2 &mdash; V2 AddPassenger:** PASS &mdash; HTTP 200, 0.1 s
  - **Hop 3 &mdash; V2 Hold:** FAIL &mdash; HTTP 200, voidCapability None, 7.6 s
  - **Hop 4 &mdash; V2 PnrReprice:** FAIL &mdash; HTTP 200, voidCapability null, 12.8 s
  - **Hop 5 &mdash; V2 Retrieve-held:** FAIL &mdash; HTTP 200, voidCapability None, 1.2 s
  - **Hop 6 &mdash; V2 BookAfterHold:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 14.0 s
  - **Hop 7 &mdash; V2 Retrieve-ticketed:** PASS &mdash; HTTP 200, voidCapability FullVoidOnlyAllowed, 6.3 s
  - **Hop 8 &mdash; V2 Void:** PASS &mdash; HTTP 200, 10.0 s
  - **Hop 9 &mdash; V2 Retrieve-after-void:** PASS &mdash; HTTP 200, voidCapability VoidNotAllowed, 1.4 s

### FLOW-V1-03-VOIDCAP-UNSUP — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #3 for a Void-unsupported supplier reports VoidNotAllowed and the Void hop is refused with OperationNotSupported.
- **Category:** Flow - Negative
- **Endpoint Name:** Flow #3 (unsupported supplier)
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Hops 1 to 4 are 2xx with voidCapability = VoidNotAllowed on Book and Retrieve. Void returns 409 OperationNotSupported in the standard envelope; the final Retrieve equals the first.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope
- **Status:** BLOCKED
- **Evidence:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope | Round 1 (2026-11-04): BLOCKED

### FLOW-V2-27-VOIDCAP-UNSUP — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify V2 flow #27 for a Void-unsupported supplier reports VoidNotAllowed and the Void hop is refused.
- **Category:** Flow - Negative
- **Endpoint Name:** Flow #27 (unsupported supplier)
- **Request:** None - blocked before any request
- **Response:** Not executed (no request sent)
- **Expected:** Same expectations as FLOW-V1-03-VOIDCAP-UNSUP on V2; voidCapability identical to the V1 flow.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope
- **Status:** BLOCKED
- **Evidence:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope | Round 1 (2026-11-04): BLOCKED

## Findings

### Defects

- **[TC-VOIDCAP-VAL-03] BUG-03 (occurrence 4, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: FullVoidOnlyAllowed: V1 Book, V1 Retrieve(ticketed), V2 Book, V2 Retrieve(ticketed), V1 BookAfterHold, V1 Retrieve(ticketed after BAH), V2 BookAfterHold, V2 Retrieve(ticketed after BAH) | null: V1 Retrieve(ticketed), V1 PnrReprice, V2 PnrReprice | VoidNotAllowed: V2 Book, V2 BookAfterHold, V1 BookAfterHold | None: V1 Hold, V1 Retrieve(held), V2 Hold, V2 Retrieve(held), V1 Retrieve(cancelled), V2 Retrieve(cancelled) | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-VAL-03] BUG-04 (occurrence 4, not new) &mdash; PnrReprice (FareConfirmAfterHold) returns the voidCapability key with the value null on V1 and V2 (the earlier build omitted the key), so it still carries no usable value** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: "voidCapability": "VoidNotAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client cannot read a value after repricing a hold; null is neither of the two allowed values (and VAL-02 forbids null) Evidence: FullVoidOnlyAllowed: V1 Book, V1 Retrieve(ticketed), V2 Book, V2 Retrieve(ticketed), V1 BookAfterHold, V1 Retrieve(ticketed after BAH), V2 BookAfterHold, V2 Retrieve(ticketed after BAH) | null: V1 Retrieve(ticketed), V1 PnrReprice, V2 PnrReprice | VoidNotAllowed: V2 Book, V2 BookAfterHold, V1 BookAfterHold | None: V1 Hold, V1 Retrieve(held), V2 Hold, V2 Retrieve(held), V1 Retrieve(cancelled), V2 Retrieve(cancelled) | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-VAL-05] BUG-03 (occurrence 5, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Hold V1 None 168; V2 None 164 | PnrReprice V1 null 167; V2 null 164 | Retrieve(held) V1 None 168; V2 None 164 | BookAfterHold V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-VAL-05] BUG-04 (occurrence 5, not new) &mdash; PnrReprice (FareConfirmAfterHold) returns the voidCapability key with the value null on V1 and V2 (the earlier build omitted the key), so it still carries no usable value** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: "voidCapability": "VoidNotAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client cannot read a value after repricing a hold; null is neither of the two allowed values (and VAL-02 forbids null) Evidence: Hold V1 None 168; V2 None 164 | PnrReprice V1 null 167; V2 null 164 | Retrieve(held) V1 None 168; V2 None 164 | BookAfterHold V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-POS-01] BUG-05 (occurrence 5, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-POS-07] BUG-03 (occurrence 6, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: holdNot 332/332; bahNot 2/332; tickNot 0; sameIds 332/332 | Offers returned by Search that the supplier then refuses: 27 of 702 chains (22 on the Hold path, 5 on the direct Book path) fail with HTTP 409 NDC-INT-UNC-Z9999 [FareConfirm: NDC-INT-UNC-Z9999 [{"Value":"No offers match."}] x4; Book: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x1; Book: NDC-INT-UNC-Z9999 [{"Name":"050007","Value":"Error while invoking external client: [Not all requeste x1; Hold: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x9; FareConfirm: NDC-INT-UNC-Z9999 [{"Name":"SupplierServerError","Value":"Resource Not Found (404)"}] x12]: RUH-CAI QR1173+QR1303 (book V1 #5, hold V2 #5); RUH-CAI QR1169+QR1303 (book V2 #10, hold V1 #10); RUH-CAI QR1165+QR1303 (book V1 #14, hold V2 #14); RUH-CAI QR1169+QR1301 (boo
- **[TC-VOIDCAP-POS-07] BUG-05 (occurrence 6, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-POS-07] BUG-15 (new) &mdash; Some offers returned by Search cannot be held or booked: the supplier answers HTTP 409 NDC-INT-UNC-Z9999 "External service returned error in orderViewRS (code: [911] message: [NOT AVAILABLE IN THIS CONNECTION])" and the body carries the raw supplier request and response** Field: `Search offers (bookability)`. Expected: Only offers that can be sold are returned by Search, or the failure is a mapped error with a specific code and no supplier payload. **Impact:** A caller that shows or lets the traveller pick such an offer hits a dead end at Hold/Book (after FareConfirm succeeded); the 409 body also exposes the raw supplier request (BUG-09) Evidence: Offers returned by Search that the supplier then refuses: 27 of 702 chains (22 on the Hold path, 5 on the direct Book path) fail with HTTP 409 NDC-INT-UNC-Z9999 [FareConfirm: NDC-INT-UNC-Z9999 [{"Value":"No offers match."}] x4; Book: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x1; Book: NDC-INT-UNC-Z9999 [{"Name":"050007","Value":"Error while invoking external client: [Not all requeste x1; Hold: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x9; FareConfirm: NDC-INT-UNC-Z9999 [{"Name":"SupplierServerError","Value":"Resource Not Found (404)"}] x12]: RUH-CAI QR1173+QR1303 (book V1 #5, hold V2 #5); RUH-CAI QR1169+QR1303 (book V2 #10, hold V1 #10); RUH-CAI QR1165+QR1303 (book V1 #14, hold V2 #14); RUH-CAI QR1169+QR1301 (book V1 #17); DMM-CAI QR1151+QR1307 (book V1 #1); DMM-CAI QR1155+QR1303 (hold V2 #12); DMM-CAI QR1151+QR1303 (hold V2 #13); JED-CAI QR1189+QR1303 (hold V2 #10); JED-CAI QR1187+QR1303 (hold V2 #11, hold V1 #11); JED-CAI QR1249+QR1303 (hold V1 #17); CAI-RUH QR1310+QR1168 (hold V1 #15, hold V2 #15); CAI-RUH QR1308+QR1164 (hold V2 #14); CAI-RUH QR1310+QR1172 (hold V1 #16, hold V2 #16); CAI-RUH QR1302+QR1166 (hold V1 #17, hold V2 #17); CAI-RUH QR1304+QR1166 (hold V1 #18, hold V2 #18); CAI-RUH QR1308+QR1166 (hold V1 #19, hold V2 #19); RUH-CAI QR1167+QR1303 (hold V1 #19); DMM-CAI QR1157+QR1301 (hold V2 #10)
- **[TC-VOIDCAP-BIZ-01] BUG-06 (occurrence 3, not new) &mdash; Void intermittently fails on QR bookings: 1 of 343 first Void attempts were refused with HTTP 409 NDC-INT-UNC-Z9999 "oops, something went seriously wrong" (a retry succeeded); first seen on AA in Round 1** Field: `voided`. Expected: 200 { "voided": true, "voidedTickets": [ ... ] }. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 2 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** The caller must retry a Void that should have worked; the 409 body also carries the raw supplier request and response (BUG-09) Evidence: V1 CAI-JED #10: Void 409 NDC-INT-UNC-Z9999 [{"Name":"500","Value":"oops, something went seriously wrong"}]; retry 200 voided=true
- **[TC-VOIDCAP-BIZ-01] BUG-14 (new) &mdash; Hold-branch calls (Retrieve of a held booking, BookAfterHold) intermittently return HTTP 500 ErrorCode ServerError "Unknown error occured. Please keep the transaction id as a reference." with an empty Context, and for about 20 seconds (09:51:06-09:51:25 UTC) every call from the parallel chains returned HTTP 500 with an empty body** Field: `HTTP status (ServerError)`. Expected: HTTP 200 with the booking, or a mapped 4xx/409 error with a specific ErrorCode and message. **Impact:** The caller cannot tell whether the hold was ticketed or not; the booking state has to be re-read, and a retry of BookAfterHold risks a duplicate. Seen only while several chains ran in parallel, so it may be load related Evidence: V2 DOH-CAI #2: Void HTTP 500 after 9.4 s with an empty body; retry 409 | V1 DOH-CAI #2: Void HTTP 500 after 9.4 s with an empty body; retry 409
- **[TC-VOIDCAP-BIZ-01] BUG-05 (occurrence 7, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-BIZ-02] BUG-03 (occurrence 7, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Book: V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1 | Retrieve (ticketed): V1 FullVoidOnlyAllowed 170; V2 FullVoidOnlyAllowed 172 | Hold: V1 None 168; V2 None 164 | PnrReprice: V1 null 167; V2 null 164 | Retrieve (held): V1 None 168; V2 None 164 | BookAfterHold: V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Retrieve (after BAH): V1 FullVoidOnlyAllowed 168; V2 FullVoidOnlyAllowed 164 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-BIZ-02] BUG-04 (occurrence 6, not new) &mdash; PnrReprice (FareConfirmAfterHold) returns the voidCapability key with the value null on V1 and V2 (the earlier build omitted the key), so it still carries no usable value** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: "voidCapability": "VoidNotAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client cannot read a value after repricing a hold; null is neither of the two allowed values (and VAL-02 forbids null) Evidence: Book: V1 FullVoidOnlyAllowed 171; V2 FullVoidOnlyAllowed 171, VoidNotAllowed 1 | Retrieve (ticketed): V1 FullVoidOnlyAllowed 170; V2 FullVoidOnlyAllowed 172 | Hold: V1 None 168; V2 None 164 | PnrReprice: V1 null 167; V2 null 164 | Retrieve (held): V1 None 168; V2 None 164 | BookAfterHold: V1 FullVoidOnlyAllowed 167, VoidNotAllowed 1; V2 FullVoidOnlyAllowed 163, VoidNotAllowed 1 | Retrieve (after BAH): V1 FullVoidOnlyAllowed 168; V2 FullVoidOnlyAllowed 164 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-BND-03] BUG-05 (occurrence 8, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-BND-04] BUG-05 (occurrence 9, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-VAL-08] BUG-05 (occurrence 10, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-VAL-09] BUG-05 (occurrence 11, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-VAL-10] BUG-03 (occurrence 8, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: ticketed and voidable (Book): FullVoidOnlyAllowed 342, VoidNotAllowed 1 | ticketed (read-back): FullVoidOnlyAllowed 342 | ticketed after BookAfterHold: FullVoidOnlyAllowed 330, VoidNotAllowed 2 | held (Hold): None 332 | held (read-back): None 332 | held (PnrReprice): null 331 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-VAL-12] BUG-04 (occurrence 7, not new) &mdash; PnrReprice (FareConfirmAfterHold) returns the voidCapability key with the value null on V1 and V2 (the earlier build omitted the key), so it still carries no usable value** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: "voidCapability": "VoidNotAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client cannot read a value after repricing a hold; null is neither of the two allowed values (and VAL-02 forbids null) Evidence: Hold V1 None 168; V2 None 164 | PnrReprice V1 null 167; V2 null 164 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-VAL-12] BUG-03 (occurrence 9, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Hold V1 None 168; V2 None 164 | PnrReprice V1 null 167; V2 null 164 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-INT-02] BUG-03 (occurrence 10, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: V1#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null | V1#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null | V2#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold | V2#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-INT-02] BUG-11 (occurrence 2, not new) &mdash; Retrieve after CancelAfterHold still returns 200 (V2 bookingStatus OnHold) with voidCapability "None"** Field: `Retrieve after CancelAfterHold`. Expected: A terminal error or a cancelled status with VoidNotAllowed. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 1 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A cancelled hold looks live to a client. Recurrence of the 2026-10-22 behaviour. Evidence: V1#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null | V1#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus null | V2#1: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold | V2#2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-INT-03] BUG-05 (occurrence 12, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-SEC-01] BUG-08 (occurrence 3, not new) &mdash; Retrieve ignores a missing or invalid x-api-key and Client-Id and returns the full booking** Field: `Retrieve authentication (x-api-key, Client-Id)`. Expected: 401 (as Search, Book and Void return) with no booking data. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 2 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** Anyone who knows a PNR, gdsPNR and bookingToken can read passenger and price data without credentials. A real ticketed booking was returned with no key on V1 and V2. Evidence: Retrieve: 200 4; Void: 401 4; Book: 401 4 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-SEC-02] BUG-08 (occurrence 4, not new) &mdash; Retrieve ignores a missing or invalid x-api-key and Client-Id and returns the full booking** Field: `Retrieve authentication (x-api-key, Client-Id)`. Expected: 401 (as Search, Book and Void return) with no booking data. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 2 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** Anyone who knows a PNR, gdsPNR and bookingToken can read passenger and price data without credentials. A real ticketed booking was returned with no key on V1 and V2. Evidence: Retrieve: 200 6; Void: 401 6; Book: 401 2 | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-SEC-06] BUG-09 (occurrence 2, not new) &mdash; Void on an unknown order returns 409 NDC-INT-UNC-Z9999 with the raw supplier request and response in the body** Field: `Void error body (OriginalSupplierRequest / OriginalSupplierResponse)`. Expected: Standard envelope only (Status, TransactionId, ErrorCode, ErrorMessage, Context), no supplier payload. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 1 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** Supplier payloads (and, per SPEC 7.14, potentially internal identifiers) are exposed to API clients. Seen also on AA Void supplier errors. Evidence: forbidden strings searched: OriginalSupplierRequest, OriginalSupplierResponse, supplierRequest, supplierResponse, wsse, Username, Password, System., StackTrace, at Ndc, Exception, NDC.Integrations. | examples: NDC.Integrations. | Void 400 -&gt; 00031_neg6_v1_NoSuchSupplier_EGY; OriginalSupplierRequest | Void 409 -&gt; 00094_sec6_v1_unknown; OriginalSupplierResponse | Void 409 -&gt; 00094_sec6_v1_unknown; OriginalSupplierRequest | FareConfirm 409 -&gt; 00383_book_v2_CAI-JED_17_FareConfirm; OriginalSupplierResponse | FareConfirm 409 -&gt; 00383_book_v2_CAI-JED_17_FareConfirm; OriginalSupplierRequest | Hold 409 -&gt; 01081_hold_v2_RUH-CAI_5_Hold; OriginalSupplierResponse | Hold 409 -&gt; 01081_hold_v2_RUH-CAI_5_Hold; OriginalSupplierRequest | Book 409 -&gt; 01620_book_v1_MED-CAI_8_Book; OriginalSupplierResponse | Book 409 -&gt; 01620_book_v1_MED-CAI_8_Book | envelope casings: PascalCase 609, camelCase 6 | Round 1 (20
- **[TC-VOIDCAP-SEC-06] BUG-10 (occurrence 2, not new) &mdash; Two error envelope shapes: PascalCase (Status, ErrorCode, ...) and camelCase (status, errorCode, ..., originalSupplierRequest: null) depending on the failing layer** Field: `Error envelope key casing`. Expected: One envelope and one key casing for every error. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 1 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** Clients must parse two shapes; validation errors also carry empty originalSupplier* keys. Evidence: forbidden strings searched: OriginalSupplierRequest, OriginalSupplierResponse, supplierRequest, supplierResponse, wsse, Username, Password, System., StackTrace, at Ndc, Exception, NDC.Integrations. | examples: NDC.Integrations. | Void 400 -&gt; 00031_neg6_v1_NoSuchSupplier_EGY; OriginalSupplierRequest | Void 409 -&gt; 00094_sec6_v1_unknown; OriginalSupplierResponse | Void 409 -&gt; 00094_sec6_v1_unknown; OriginalSupplierRequest | FareConfirm 409 -&gt; 00383_book_v2_CAI-JED_17_FareConfirm; OriginalSupplierResponse | FareConfirm 409 -&gt; 00383_book_v2_CAI-JED_17_FareConfirm; OriginalSupplierRequest | Hold 409 -&gt; 01081_hold_v2_RUH-CAI_5_Hold; OriginalSupplierResponse | Hold 409 -&gt; 01081_hold_v2_RUH-CAI_5_Hold; OriginalSupplierRequest | Book 409 -&gt; 01620_book_v1_MED-CAI_8_Book; OriginalSupplierResponse | Book 409 -&gt; 01620_book_v1_MED-CAI_8_Book | envelope casings: PascalCase 609, camelCase 6 | Round 1 (20
- **[TC-VOIDCAP-SEC-06] BUG-13 (new) &mdash; A Void (and any request) with an unknown supplier name returns HTTP 400 whose message exposes the internal .NET type name NDC.Integrations.Application.Dtos.Api.Supplier, the JSON path and byte position** Field: `errors[].value (unknown supplier)`. Expected: {"status":400,"errorCode":"1001","errorMessage":"Validation errors occurred.","context":[{"name":"supplier","value":"The supplier value is not valid."}]}. **Impact:** Internal namespace and class names leave the API boundary in an ordinary validation error, which helps an attacker map the code base (SEC-06 forbids internal type names) Evidence: Void with supplier NoSuchSupplier (V1 and V2) -&gt; HTTP 400 context value "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Supplier. Path: $.supplier | LineNumber: 0 | BytePositionInLine: 28."
- **[TC-VOIDCAP-REG-01] BUG-14 (new) &mdash; Hold-branch calls (Retrieve of a held booking, BookAfterHold) intermittently return HTTP 500 ErrorCode ServerError "Unknown error occured. Please keep the transaction id as a reference." with an empty Context, and for about 20 seconds (09:51:06-09:51:25 UTC) every call from the parallel chains returned HTTP 500 with an empty body** Field: `HTTP status (ServerError)`. Expected: HTTP 200 with the booking, or a mapped 4xx/409 error with a specific ErrorCode and message. **Impact:** The caller cannot tell whether the hold was ticketed or not; the booking state has to be re-read, and a retry of BookAfterHold risks a duplicate. Seen only while several chains ran in parallel, so it may be load related Evidence: V2 DOH-CAI #2: Void HTTP 500 after 9.4 s; retry 409 NDC-INT-TEC-A0001 [{"Name":"VoidBookingError","Value":"The PNR has already been voided. Re | V1 DOH-CAI #2: Void HTTP 500 after 9.4 s; retry 409 NDC-INT-TEC-A0001 [{"Name":"VoidBookingError","Value":"The PNR has already been voided. Re
- **[TC-VOIDCAP-REG-01] BUG-06 (occurrence 4, not new) &mdash; Void intermittently fails on QR bookings: 1 of 343 first Void attempts were refused with HTTP 409 NDC-INT-UNC-Z9999 "oops, something went seriously wrong" (a retry succeeded); first seen on AA in Round 1** Field: `voided`. Expected: 200 { "voided": true, "voidedTickets": [ ... ] }. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 2 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** The caller must retry a Void that should have worked; the 409 body also carries the raw supplier request and response (BUG-09) Evidence: V1 CAI-JED #10: NDC-INT-UNC-Z9999 [{"Name":"500","Value":"oops, something went seriously wrong"}]
- **[TC-VOIDCAP-REG-05] BUG-14 (new) &mdash; Hold-branch calls (Retrieve of a held booking, BookAfterHold) intermittently return HTTP 500 ErrorCode ServerError "Unknown error occured. Please keep the transaction id as a reference." with an empty Context, and for about 20 seconds (09:51:06-09:51:25 UTC) every call from the parallel chains returned HTTP 500 with an empty body** Field: `HTTP status (ServerError)`. Expected: HTTP 200 with the booking, or a mapped 4xx/409 error with a specific ErrorCode and message. **Impact:** The caller cannot tell whether the hold was ticketed or not; the booking state has to be re-read, and a retry of BookAfterHold risks a duplicate. Seen only while several chains ran in parallel, so it may be load related Evidence: 00020_hold_v2_JED-CAI_0_BookAfterHold: HTTP 500 Unknown error occured. Please keep the transaction id as a reference. (transaction 103d8f4c-13a5-4c88-bc70-5b233cc12a6b, 618 ms) | 00021_hold_v1_CAI-JED_0_Retrieve-held: HTTP 500 Unknown error occured. Please keep the transaction id as a reference. (transaction 1f69ebf7-13cd-4219-b8ae-8a496d38b067, 576 ms) | 00239_book_v2_DOH-CAI_2_Void: HTTP 500 null (transaction null, 9391 ms) | 00240_book_v1_CAI-DOH_3_Book: HTTP 500 null (transaction null, 4803 ms) | 00272_hold_v2_MED-CAI_6_Hold: HTTP 500 null (transaction null, 1852 ms) | 00241_book_v1_DOH-CAI_2_Void: HTTP 500 null (transaction null, 9427 ms) | 00273_hold_v1_MED-CAI_7_PnrReprice: HTTP 500 null (transaction null, 6861 ms) | 00274_hold_v1_CAI-MED_5_Hold: HTTP 500 null (transaction null, 4228 ms) | Also: between 09:51:06 and 09:51:25 UTC 125 of 127 calls from all parallel chains returned HTTP 500 with an empty body (no error envelope), then service resumed; 5 PNRs (2 ticketed, 3 held) were left open and closed afterwards.
- **[TC-VOIDCAP-REG-05] BUG-15 (new) &mdash; Some offers returned by Search cannot be held or booked: the supplier answers HTTP 409 NDC-INT-UNC-Z9999 "External service returned error in orderViewRS (code: [911] message: [NOT AVAILABLE IN THIS CONNECTION])" and the body carries the raw supplier request and response** Field: `Search offers (bookability)`. Expected: Only offers that can be sold are returned by Search, or the failure is a mapped error with a specific code and no supplier payload. **Impact:** A caller that shows or lets the traveller pick such an offer hits a dead end at Hold/Book (after FareConfirm succeeded); the 409 body also exposes the raw supplier request (BUG-09) Evidence: Offers returned by Search that the supplier then refuses: 27 of 702 chains (22 on the Hold path, 5 on the direct Book path) fail with HTTP 409 NDC-INT-UNC-Z9999 [FareConfirm: NDC-INT-UNC-Z9999 [{"Value":"No offers match."}] x4; Book: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x1; Book: NDC-INT-UNC-Z9999 [{"Name":"050007","Value":"Error while invoking external client: [Not all requeste x1; Hold: NDC-INT-UNC-Z9999 [{"Name":"050002","Value":"External service returned error in orderViewRS (code: [ x9; FareConfirm: NDC-INT-UNC-Z9999 [{"Name":"SupplierServerError","Value":"Resource Not Found (404)"}] x12]: RUH-CAI QR1173+QR1303 (book V1 #5, hold V2 #5); RUH-CAI QR1169+QR1303 (book V2 #10, hold V1 #10); RUH-CAI QR1165+QR1303 (book V1 #14, hold V2 #14); RUH-CAI QR1169+QR1301 (book V1 #17); DMM-CAI QR1151+QR1307 (book V1 #1); DMM-CAI QR1155+QR1303 (hold V2 #12); DMM-CAI QR1151+QR1303 (hold V2 #13); JED-CAI QR1189+QR1303 (hold V2 #10); JED-CAI QR1187+QR1303 (hold V2 #11, hold V1 #11); JED-CAI QR1249+QR1303 (hold V1 #17); CAI-RUH QR1310+QR1168 (hold V1 #15, hold V2 #15); CAI-RUH QR1308+QR1164 (hold V2 #14); CAI-RUH QR1310+QR1172 (hold V1 #16, hold V2 #16); CAI-RUH QR1302+QR1166 (hold V1 #17, hold V2 #17); CAI-RUH QR1304+QR1166 (hold V1 #18, hold V2 #18); CAI-RUH QR1308+QR1166 (hold V1 #19, hold V2 #19); RUH-CAI QR1167+QR1303 (hold V1 #19); DMM-CAI QR1157+QR1301 (hold V2 #10)
- **[TC-VOIDCAP-REG-09] BUG-03 (occurrence 11, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: BUG-01 Retrieve returns "None" for a ticketed booking: fixed (Retrieve not FullVoidOnlyAllowed on 0/342) | BUG-02 BookAfterHold returns "None": fixed (BookAfterHold "None" on 0/332) | BUG-03 Hold/held Retrieve return "None" instead of VoidNotAllowed: still reproducing (Hold wrong on 332/332, held Retrieve wrong on 332/332) | BUG-04 PnrReprice omits the flag: changed but not fixed (key now present with value null) (PnrReprice null 331) | BUG-05 Book/BookAfterHold labels a voidable booking VoidNotAllowed: still reproducing (now on QR, intermittent) (3 of 675 bookings) | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-REG-09] BUG-04 (occurrence 8, not new) &mdash; PnrReprice (FareConfirmAfterHold) returns the voidCapability key with the value null on V1 and V2 (the earlier build omitted the key), so it still carries no usable value** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: "voidCapability": "VoidNotAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client cannot read a value after repricing a hold; null is neither of the two allowed values (and VAL-02 forbids null) Evidence: BUG-01 Retrieve returns "None" for a ticketed booking: fixed (Retrieve not FullVoidOnlyAllowed on 0/342) | BUG-02 BookAfterHold returns "None": fixed (BookAfterHold "None" on 0/332) | BUG-03 Hold/held Retrieve return "None" instead of VoidNotAllowed: still reproducing (Hold wrong on 332/332, held Retrieve wrong on 332/332) | BUG-04 PnrReprice omits the flag: changed but not fixed (key now present with value null) (PnrReprice null 331) | BUG-05 Book/BookAfterHold labels a voidable booking VoidNotAllowed: still reproducing (now on QR, intermittent) (3 of 675 bookings) | Round 1 (2026-11-04): FAIL
- **[TC-VOIDCAP-REG-09] BUG-05 (occurrence 13, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: V2 ALY-RUH #2 Book VoidNotAllowed; V2 CAI-JED #12 BookAfterHold VoidNotAllowed; V1 RUH-CAI #13 BookAfterHold VoidNotAllowed - Void then succeeded on every one of them
- **[TC-VOIDCAP-REG-11] BUG-12 (occurrence 2, not new) &mdash; Median Book time is about 21.6 s (V1 21.6 s, V2 21.4 s) in a sequential run with no other traffic, against the 16 s SabreNdc baseline** Field: `Book latency`. Expected: Median within 20% of 16 s (at most 19.2 s). **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 1 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** About 38% slower than the baseline; supplier latency may account for it, no mapping-specific cause could be isolated. Evidence: Sequential run, no parallel load, 3 per version: V1 Book 21.7 s, 21.5 s, 21.6 s (median 21.6 s), Void median 9.7 s; V2 Book 21.7 s, 21.2 s, 21.4 s (median 21.4 s), Void median 9.2 s | Round 1 (2026-11-04): FAIL
- **[FLOW-V1-05-VOIDCAP] BUG-03 (occurrence 12, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Hold None 168; PnrReprice null 168; BookAfterHold FullVoidOnlyAllowed 167, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 168; ids unchanged 168/168; Void 168/168 | Round 1 (2026-11-04): FAIL
- **[FLOW-V1-05-VOIDCAP] BUG-04 (occurrence 9, not new) &mdash; PnrReprice (FareConfirmAfterHold) returns the voidCapability key with the value null on V1 and V2 (the earlier build omitted the key), so it still carries no usable value** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: "voidCapability": "VoidNotAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client cannot read a value after repricing a hold; null is neither of the two allowed values (and VAL-02 forbids null) Evidence: Hold None 168; PnrReprice null 168; BookAfterHold FullVoidOnlyAllowed 167, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 168; ids unchanged 168/168; Void 168/168 | Round 1 (2026-11-04): FAIL
- **[FLOW-V1-05-VOIDCAP] BUG-05 (occurrence 14, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: Hold None 168; PnrReprice null 168; BookAfterHold FullVoidOnlyAllowed 167, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 168; ids unchanged 168/168; Void 168/168 | Round 1 (2026-11-04): FAIL
- **[FLOW-V2-27-VOIDCAP] BUG-05 (occurrence 15, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: Book FullVoidOnlyAllowed 171, VoidNotAllowed 1; Retrieve FullVoidOnlyAllowed 172; Void 172/172; final Retrieve 200 VoidNotAllowed FullyCanceled 172 | Round 1 (2026-11-04): FAIL
- **[FLOW-V2-29-VOIDCAP] BUG-03 (occurrence 13, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Hold None 164; PnrReprice null 164; BookAfterHold FullVoidOnlyAllowed 163, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 164; ids unchanged 164/164; Void 164/164 | Round 1 (2026-11-04): FAIL
- **[FLOW-V2-29-VOIDCAP] BUG-04 (occurrence 10, not new) &mdash; PnrReprice (FareConfirmAfterHold) returns the voidCapability key with the value null on V1 and V2 (the earlier build omitted the key), so it still carries no usable value** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: "voidCapability": "VoidNotAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 3 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client cannot read a value after repricing a hold; null is neither of the two allowed values (and VAL-02 forbids null) Evidence: Hold None 164; PnrReprice null 164; BookAfterHold FullVoidOnlyAllowed 163, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 164; ids unchanged 164/164; Void 164/164 | Round 1 (2026-11-04): FAIL
- **[FLOW-V2-29-VOIDCAP] BUG-05 (occurrence 16, not new) &mdash; A voidable QR booking is intermittently labelled VoidNotAllowed although Void then succeeds: 1 of 343 Book responses and 2 of 332 BookAfterHold responses (first seen on V1 AA Book in Round 1, now also on QR, on V1 and V2)** Field: `voidCapability`. Expected: "voidCapability": "FullVoidOnlyAllowed". **History:** First observed Round 1 (2026-11-04, 20261104-140909_SabreNdc-EGY-VoidUnified-ne3, 4 occurrence(s)); reproducing in Round 2 (2026-11-05) **Impact:** A client that gates Void on the flag skips a Void that would have worked; the failure is random so it cannot be worked around Evidence: Hold None 164; PnrReprice null 164; BookAfterHold FullVoidOnlyAllowed 163, VoidNotAllowed 1; Retrieve after FullVoidOnlyAllowed 164; ids unchanged 164/164; Void 164/164 | Round 1 (2026-11-04): FAIL

### Unknown-resolutions

- **[TC-CAPCHECK-VOIDCAP-01]** SabreNdc/EGY on ne-3 has no SV (Saudia) inventory: 0 SV offers in 880 routes (V1, 2026-12-05) plus 224 searches over 7 dates and 16 routes (V2, with and without preferredAirlines SV). Offers exist for QR, AA, BA, RJ and ME only. Evidence: carrier tally {"QR":385,"AA":1435,"RJ":3,"ME":1,"BA":35}; QR-only offers on 20 routes (346 offers per version)
- **[TC-CAPCHECK-VOIDCAP-02]** A new build went live during the run: the service answered HTTP 500 to every call from 09:51:06 to about 09:51:25 UTC (redeploy), and behaved differently from about 09:54:46 UTC. Before (Build A, 290 direct-Book and 227 Hold chains): Retrieve {"None":290}, BookAfterHold {"None":226}, Retrieve after Void HTTP {"400":290}, PnrReprice {"(absent)":227}, Hold {"None":227}. After (Build B, 343 and 332 chains): Retrieve V1 {"FullVoidOnlyAllowed":170} V2 {"FullVoidOnlyAllowed":172}, BookAfterHold V1 {"FullVoidOnlyAllowed":167,"VoidNotAllowed":1} V2 {"FullVoidOnlyAllowed":163,"VoidNotAllowed":1}, Retrieve after Void {"200":343} (VoidNotAllowed; V2 bookingStatus FullyCanceled), PnrReprice V1 {"null":167} V2 {"null":164} (key now present, value null), Hold V1 {"None":168} V2 {"None":164} (unchanged). Evidence: Chains grouped by completion time in the matrix logs: the last Build A chain finished 09:51:05 UTC, the first Build B Retrieve with a valid flag was at 09:54:46 UTC. All verdicts of this report are on Build B; the Build A results are kept as the baseline.
- **[TC-CAPCHECK-VOIDCAP-02]** Every QR-only offer found was booked once per path and version: Build B 348 direct-Book and 354 Hold chains over 20 routes (346 offers per version per path); Book FullVoidOnlyAllowed on 343 of 343 ticketed bookings; QR codeshare offers (QR marketed together with AA/BA) were excluded because the instruction was SV and QR only. Evidence: 348 direct-Book chains (343 ticketed, 5 failed at {"FareConfirm":3,"Book":2}) over 20 routes; 343/343 Voids succeeded; PNRs left live: 0; median Book 21.2 s (V1) / 21.2 s (V2), Void 9.2 s / 9.1 s
- **[TC-VOIDCAP-BND-02]** SabreNdc/EGY returns QR offers up to at least 2027-07-22 (D+260 from 2026-11-05). Evidence: BND-02 far-date probe
- **[TC-VOIDCAP-REG-03]** FareConfirm confirms a lower price than Search for 12 of 343 QR offers (about 3 percent, the same offers on V1 and V2, for example CAI-DOH 26467.8 -&gt; 23974.8, DOH-CAI 25173 -&gt; 21979, JED-CAI 23840 -&gt; 20023); Book then charges exactly the FareConfirm total on 343 of 343 bookings. Evidence: Search vs FareConfirm total per offer
- **[TC-VOIDCAP-BIZ-05]** Void with voidTickets naming one of two tickets (as ticket objects {ticketNumber, carrierCode, ticketStatus}) voids both tickets and lists both (V1 and V2). A voidTickets array of plain ticket-number strings is rejected with HTTP 400 "The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.SharedTypes.TicketType". Evidence: BIZ-05, both attempts
- **[TC-VOIDCAP-SEC-06]** With about 8 parallel booking chains, FareConfirm answers HTTP 409 NDC-INT-UNC-Z9999 "Too Many Requests Processing" (2 times this round; a retry after 1.5 s succeeded each time), and the 409 body carries OriginalSupplierRequest / OriginalSupplierResponse (BUG-09 also on FareConfirm). Evidence: 00383_book_v2_CAI-JED_17_FareConfirm, 00449_hold_v2_CAI-JED_13_FareConfirm

### Not reproduced

- **BUG-01** (Retrieve returns "None" for a ticketed booking) &mdash; exercised by TC-VOIDCAP-POS-01, TC-VOIDCAP-VAL-09, TC-VOIDCAP-INT-01. Fixed on Build B: Retrieve of a ticketed booking returns FullVoidOnlyAllowed on V1 170, V2 172 bookings (it returned "None" on 290 of 290 on the earlier build). Recommend closing after a regression pass.
- **BUG-02** (BookAfterHold returns "None" for a newly ticketed booking) &mdash; exercised by TC-VOIDCAP-POS-07, TC-VOIDCAP-VAL-09, FLOW-V1-05-VOIDCAP. Fixed on Build B: BookAfterHold returns FullVoidOnlyAllowed (V1 167, V2 163). Recommend closing after a regression pass.
- **BUG-07** (Retrieve of a voided booking returns HTTP 400) &mdash; exercised by TC-VOIDCAP-BIZ-06, TC-VOIDCAP-INT-01. Fixed on Build B: Retrieve after Void returns HTTP 200 with voidCapability VoidNotAllowed (V2 also bookingStatus FullyCanceled): {"200":343}. The earlier build returned 400 on 290 of 290.

## Proposed SPEC.md updates

- 4.1 (Sabre / NDC routes) &mdash; status: *pending*
  - **Old:** "Sabre / NDC | Unknown | Unknown | Supported | Supported | Unknown | Unknown | Unknown (no carrier inventory recorded)"
  - **New:** "SabreNdc/EGY on ne-3 (2026-11-05): offers for QR (20 routes between Cairo/Alexandria and JED, RUH, DMM, MED, DOH), AA (US domestic and US-Saudi/Doha routes), BA, RJ and ME; no SV offer on any of 880 routes x 1 date plus 224 more searches over 7 dates; 106 of 880 routes returned any offer."
  - **Correction:** Evidence: Round 2 route sweep and SV probes.

- 7 (rate limiting / concurrency) &mdash; status: *pending*
  - **Old:** "(no entry: rate limiting and parallel-request behaviour not documented)"
  - **New:** "SabreNdc/EGY (ne-3, 2026-11-05): with about 8 parallel booking chains the API occasionally answers FareConfirm with HTTP 409 NDC-INT-UNC-Z9999 "Too Many Requests Processing" (retry succeeds) and, rarely, HTTP 500 ServerError on Retrieve and BookAfterHold; the 409 body carries OriginalSupplierRequest/OriginalSupplierResponse (see BUG-09)."
  - **Correction:** Evidence: Round 2 matrix run.

## Cleanup / follow-up

Live artifacts left behind this round (4):

- **family_b_hold** &mdash; pnr unknown (no PNR returned) (TC-VOIDCAP-POS-07) &mdash; Hold answered HTTP 500 (2026-11-05T09:51:06.206Z, after 3 s) so the booking state is unknown; V1 DMM-CAI QR1155+QR1303 2026-12-05, passenger surname Farouk. A silent ticket cannot be excluded; the same offer was later booked and closed normally under another PNR. Search the GDS by surname if needed.
- **needs_void_cancel** &mdash; pnr unknown (no PNR returned) (TC-CAPCHECK-VOIDCAP-02) &mdash; Book answered HTTP 500 (2026-11-05T10:06:23.964Z, after 5 s) so the booking state is unknown; V1 CAI-DOH QR1310 2026-12-05, passenger surname Nasser. A silent ticket cannot be excluded; the same offer was later booked and closed normally under another PNR. Search the GDS by surname if needed.
- **family_b_hold** &mdash; pnr unknown (no PNR returned) (TC-VOIDCAP-POS-07) &mdash; Hold answered HTTP 500 (2026-11-05T10:06:26.921Z, after 2 s) so the booking state is unknown; V2 MED-CAI QR1177+QR1305 2026-12-05, passenger surname Naguib. A silent ticket cannot be excluded; the same offer was later booked and closed normally under another PNR. Search the GDS by surname if needed.
- **family_b_hold** &mdash; pnr unknown (no PNR returned) (TC-VOIDCAP-POS-07) &mdash; Hold answered HTTP 500 (2026-11-05T10:06:24.580Z, after 4 s) so the booking state is unknown; V1 CAI-MED QR1306+QR1178 2026-12-05, passenger surname Zaki. A silent ticket cannot be excluded; the same offer was later booked and closed normally under another PNR. Search the GDS by surname if needed.

