# QA Execution Report — VoidUnified - SabreNdc/EGY - ne-3 - V1 and V2

**Environment:** staging (ndc-integration-stg-ne-3) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** SabreNdc  **Credentials Selector:** EGY
**Started:** 2026-11-04T14:09:09.224Z
**Ended:** 2026-11-04T15:03:07.263Z
**Status:** COMPLETE
**Execution Duration:** 53m 58s ([View Time Breakdown](20261104-140909_SabreNdc-EGY-VoidUnified-ne3_TimeBreakdown.html))
**Prior runs:** 20261025-190214_SabreNdc-EGY-V1-Round2 (V1 baseline, 2026-10-25),20261025-185428_SabreNdc-EGY-V2-Round2 (V2 baseline),20261022-093839_SabreNdc-Void-EGY-V1V2 (Void suite baseline) (see NDC_Integration/Artifacts/Logs/)

## Summary

- Test cases logged: 67 of 67 planned
- Passed: 21
- Failed: 25
- Blocked: 21
- Failed test cases: TC-VOIDCAP-VAL-05, TC-VOIDCAP-POS-01, TC-VOIDCAP-POS-07, TC-VOIDCAP-BIZ-01, TC-VOIDCAP-BIZ-03, TC-VOIDCAP-BIZ-06, TC-VOIDCAP-BND-03, TC-VOIDCAP-VAL-08, TC-VOIDCAP-VAL-09, TC-VOIDCAP-VAL-12, TC-VOIDCAP-INT-01, TC-VOIDCAP-INT-02, TC-VOIDCAP-SEC-01, TC-VOIDCAP-SEC-02, FLOW-V1-03-VOIDCAP, FLOW-V1-05-VOIDCAP, FLOW-V2-27-VOIDCAP, FLOW-V2-29-VOIDCAP, TC-VOIDCAP-VAL-03, TC-VOIDCAP-VAL-10, TC-VOIDCAP-BIZ-02, TC-VOIDCAP-INT-03, TC-VOIDCAP-SEC-06, TC-VOIDCAP-REG-09, TC-VOIDCAP-REG-11
- Blocked test cases: TC-VOIDCAP-POS-02, TC-VOIDCAP-POS-03, TC-VOIDCAP-POS-04, TC-VOIDCAP-POS-05, TC-VOIDCAP-POS-06, TC-VOIDCAP-BIZ-04, TC-VOIDCAP-VAL-07, TC-VOIDCAP-BND-05, TC-VOIDCAP-NEG-01, TC-VOIDCAP-NEG-02, TC-VOIDCAP-NEG-03, TC-VOIDCAP-NEG-05, TC-VOIDCAP-NEG-07, TC-VOIDCAP-NEG-08, TC-VOIDCAP-SEC-03, TC-VOIDCAP-SEC-05, TC-VOIDCAP-REG-02, TC-VOIDCAP-REG-07, TC-VOIDCAP-REG-08, FLOW-V1-03-VOIDCAP-UNSUP, FLOW-V2-27-VOIDCAP-UNSUP

## Test case results

### TC-CAPCHECK-VOIDCAP-01 — PASS

- **Test Case:** [Search] Verify every supplier in the Void capability matrix has an active credentialsSelector that returns offers.
- **Category:** Positive
- **Endpoint Name:** Search
- **Request:** V1 and V2 Search CAI-JED 2026-11-30, 1 ADT, SabreNdc/EGY
- **Response:** V1: 200, 4 offers; V2: 200, 4 offers
- **Expected:** HTTP 200 with non-empty offers[] for each supplier that is active. Suppliers returning the "credentials ... do not exist or are not active" 400 or no offers are listed as BLOCKED for every later row that names them.
- **Actual:** SabreNdc/EGY is active on V1 and V2 and returns offers (canBeHeld=4/4 haveBundles=0/4 offerHasAncillary=0/4 offerHasSeat=0/4 | canBeHeld=4/4 haveBundles=0/4 offerHasAncillary=0/4 offerHasSeat=0/4). Other suppliers in the matrix were not exercised (run scoped to SabreNdc/EGY).
- **Status:** PASS
- **Evidence:** SabreNdc/EGY: V1 200 4 offers; canBeHeld=4/4 haveBundles=0/4 offerHasAncillary=0/4 offerHasSeat=0/4 | V2 200 4 offers; canBeHeld=4/4 haveBundles=0/4 offerHasAncillary=0/4 offerHasSeat=0/4. TravelportNdc, GulfAir, AirIndia, Amadeus, FlyAdeal, EgyptAir, OmanAir, AirCairo, FlyNas: not sent (supplier scope).

  - **Hop 1 &mdash; V1 Search (capcheck):** PASS &mdash; 200 - 4 offers (1.1s); canBeHeld=4/4 haveBundles=0/4 offerHasAncillary=0/4 offerHasSeat=0/4
  - **Hop 2 &mdash; V2 Search (capcheck):** PASS &mdash; 200 - 4 offers (0.9s); canBeHeld=4/4 haveBundles=0/4 offerHasAncillary=0/4 offerHasSeat=0/4

### TC-CAPCHECK-VOIDCAP-02 — PASS

- **Test Case:** [Book][Response] Verify the voidCapability value each supplier returns on a ticketed Book is recorded as the per-supplier baseline.
- **Category:** Positive
- **Endpoint Name:** Book
- **Request:** V1 and V2 Search -&gt; FareConfirm -&gt; (AddPassenger) -&gt; Book, QR (CAI-JED) and AA (JFK-MIA), 1 ADT; Retrieve each
- **Response:** V1/QR: Book FullVoidOnlyAllowed, Retrieve None, tickets 1; V2/QR: Book FullVoidOnlyAllowed, Retrieve None, tickets 1; V1/AA: Book FullVoidOnlyAllowed, Retrieve None, tickets 1; V2/AA: Book FullVoidOnlyAllowed, Retrieve None, tickets 1
- **Expected:** HTTP 200 and a ticketed booking for every supplier that supports Book. The table is the baseline for the mapping cases. Reference values already seen: SabreNdc/EGY FullVoidOnlyAllowed (since the 2026-10-25 build), TravelportNdc/UAE FullVoidOnlyAllowed (QR and RJ always, EK intermittently absent), GulfAir/KSA FullVoidOnlyAllowed, AirIndia/EGY absent (2026-11-02). Do not fail this case on a missing value; the property rows below do that.
- **Actual:** All four cells ticketed (HTTP 200). Baseline table recorded: V1/QR: Book FullVoidOnlyAllowed, Retrieve None, tickets 1; V2/QR: Book FullVoidOnlyAllowed, Retrieve None, tickets 1; V1/AA: Book FullVoidOnlyAllowed, Retrieve None, tickets 1; V2/AA: Book FullVoidOnlyAllowed, Retrieve None, tickets 1
- **Status:** PASS
- **Evidence:** Baseline table (supplier x version x carrier), SabreNdc/EGY: V1/QR: Book FullVoidOnlyAllowed, Retrieve None, tickets 1 | V2/QR: Book FullVoidOnlyAllowed, Retrieve None, tickets 1 | V1/AA: Book FullVoidOnlyAllowed, Retrieve None, tickets 1 | V2/AA: Book FullVoidOnlyAllowed, Retrieve None, tickets 1. Hold values are in the Hold cases. Other suppliers not exercised (scope). Bookings are voided by TC-CAPCHECK-VOIDCAP-03.

  - **Hop 1 &mdash; V1 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (mx-QR):** FAIL &mdash; 409
  - **Hop 3 &mdash; V1 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[1] total 13026.8 EGP
  - **Hop 4 &mdash; V1 FareConfirm (mx-QR):** FAIL &mdash; 409
  - **Hop 5 &mdash; V1 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[2] total 13026.8 EGP
  - **Hop 6 &mdash; V1 FareConfirm (mx-QR):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 7 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr SJSRFP gdsPNR SJSRFP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593217"]
  - **Hop 8 &mdash; V1 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593217:Booked
  - **Hop 9 &mdash; V2 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 10 &mdash; V2 FareConfirm (mx-QR):** FAIL &mdash; 409
  - **Hop 11 &mdash; V2 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[1] total 13026.8 EGP
  - **Hop 12 &mdash; V2 FareConfirm (mx-QR):** FAIL &mdash; 409
  - **Hop 13 &mdash; V2 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[2] total 13026.8 EGP
  - **Hop 14 &mdash; V2 FareConfirm (mx-QR):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 15 &mdash; V2 AddPassenger (mx-QR):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 16 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr RPCWCU gdsPNR RPCWCU; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593218"]
  - **Hop 17 &mdash; V2 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593218:Booked
  - **Hop 18 &mdash; V1 Search (mx-AA):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 19 &mdash; V1 FareConfirm (mx-AA):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 20 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 21 &mdash; V1 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962817:Booked
  - **Hop 22 &mdash; V2 Search (mx-AA):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 23 &mdash; V2 FareConfirm (mx-AA):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 24 &mdash; V2 AddPassenger (mx-AA):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 25 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]
  - **Hop 26 &mdash; V2 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962818:Booked

### TC-CAPCHECK-VOIDCAP-03 — PASS

- **Test Case:** [Void][Response] Verify which suppliers in the matrix accept Void, partitioning them into supported and unsupported.
- **Category:** Positive
- **Endpoint Name:** Void
- **Request:** V1 and V2 Void of the four ticketed bookings from CAPCHECK-02 (voidTickets=[], real gdsPNR, surName Ibrahim)
- **Response:** V1/QR: 200 voided (9.1s); V2/QR: 200 voided (9.5s); V1/AA: 200 voided (11.7s); V2/AA: 200 voided (11.8s)
- **Expected:** Every supplier is labelled S or U with evidence; a supplier whose V1 and V2 results disagree is recorded as a defect. Reference: SabreNdc and TravelportNdc (ne-5) are S, AirIndia is U (409 OperationNotSupported). GulfAir, Amadeus, FlyAdeal, EgyptAir, OmanAir, AirCairo are UNKNOWN and decided here.
- **Actual:** SabreNdc/EGY is label S (Void supported) on V1 and V2 for QR and AA; V1 and V2 agree
- **Status:** PASS
- **Evidence:** Partition: SabreNdc/EGY = S on V1 and V2 (QR, AA). Reference said S; confirmed. GulfAir, Amadeus, FlyAdeal, EgyptAir, OmanAir, AirCairo: UNKNOWN stays UNKNOWN (supplier scope). Void durations 9.1s, 9.5s, 11.7s, 11.8s

  - **Hop 1 &mdash; V1 Void (cap3-QR):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593217","carrierCode":"QR"}]}
  - **Hop 2 &mdash; V2 Void (cap3-QR):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593218","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 3 &mdash; V1 Void (cap3-AA):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"0015763962817","carrierCode":"AA"}]}
  - **Hop 4 &mdash; V2 Void (cap3-AA):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"0015763962818","carrierCode":"AA"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-VOIDCAP-VAL-01 — PASS

- **Test Case:** [Book][Response] Validate the Void capability property is named exactly voidCapability, at the top level, for every supplier on V1 and V2.
- **Category:** Validation
- **Endpoint Name:** Book / Retrieve
- **Request:** Raw text scan of 8 Book and Retrieve responses for any key containing "void"
- **Response:** 8 responses scanned
- **Expected:** Exactly one key, spelled voidCapability (camelCase), as a direct child of the response root. No VoidCapability, void_capability, voidCapabilities, voidAllowed, isVoidable or nesting under tickets, selectedOffer or any other object.
- **Actual:** Exactly one void key, spelled voidCapability, direct child of the root, on every response
- **Status:** PASS
- **Evidence:** V1/QR Book: keys=[voidCapability] root=true | V1/QR Retrieve: keys=[voidCapability] root=true | V2/QR Book: keys=[voidCapability] root=true | V2/QR Retrieve: keys=[voidCapability] root=true | V1/AA Book: keys=[voidCapability] root=true | V1/AA Retrieve: keys=[voidCapability] root=true | V2/AA Book: keys=[voidCapability] root=true | V2/AA Retrieve: keys=[voidCapability] root=true

  - **Hop 1 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr SJSRFP gdsPNR SJSRFP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593217"]
  - **Hop 2 &mdash; V1 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593217:Booked
  - **Hop 3 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr RPCWCU gdsPNR RPCWCU; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593218"]
  - **Hop 4 &mdash; V2 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593218:Booked
  - **Hop 5 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 6 &mdash; V1 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962817:Booked
  - **Hop 7 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]
  - **Hop 8 &mdash; V2 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962818:Booked

### TC-VOIDCAP-VAL-02 — PASS

- **Test Case:** [Book][Response] Validate voidCapability is a non-empty string, never null, boolean, number, array or object.
- **Category:** Validation
- **Endpoint Name:** Book / Retrieve
- **Request:** Type and character check of voidCapability on Book and Retrieve responses
- **Response:** 8 values checked
- **Expected:** JSON type string; length &gt; 0; no surrounding whitespace; no control characters.
- **Actual:** Every value is a non-empty string without padding or control characters (the values themselves are judged in VAL-03)
- **Status:** PASS
- **Evidence:** V1/QR Book: "FullVoidOnlyAllowed" (string) | V1/QR Retrieve: "None" (string) | V2/QR Book: "FullVoidOnlyAllowed" (string) | V2/QR Retrieve: "None" (string) | V1/AA Book: "FullVoidOnlyAllowed" (string) | V1/AA Retrieve: "None" (string) | V2/AA Book: "FullVoidOnlyAllowed" (string) | V2/AA Retrieve: "None" (string)

  - **Hop 1 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr SJSRFP gdsPNR SJSRFP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593217"]
  - **Hop 2 &mdash; V1 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593217:Booked
  - **Hop 3 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr RPCWCU gdsPNR RPCWCU; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593218"]
  - **Hop 4 &mdash; V2 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593218:Booked
  - **Hop 5 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 6 &mdash; V1 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962817:Booked
  - **Hop 7 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]
  - **Hop 8 &mdash; V2 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962818:Booked

### TC-VOIDCAP-VAL-04 — PASS

- **Test Case:** [Book][Response] Validate voidCapability is present, never omitted or null, on every successful Book for every supplier.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** 3 ticketed Books per version per carrier (QR, AA), counted for missing/null voidCapability
- **Response:** 12/12 Book responses carry voidCapability
- **Expected:** Present on 100% of Book responses. A missing value on any supplier, including the intermittent TravelportNdc EK case, is a defect: a client cannot tell "Void not possible" from "capability unknown".
- **Actual:** voidCapability present on 12/12 (100%) Book responses
- **Status:** PASS
- **Evidence:** V1/QR: FullVoidOnlyAllowed, FullVoidOnlyAllowed, FullVoidOnlyAllowed | V2/QR: FullVoidOnlyAllowed, FullVoidOnlyAllowed, FullVoidOnlyAllowed | V1/AA: FullVoidOnlyAllowed, FullVoidOnlyAllowed, FullVoidOnlyAllowed | V2/AA: FullVoidOnlyAllowed, FullVoidOnlyAllowed, FullVoidOnlyAllowed

  - **Hop 1 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr SJSRFP gdsPNR SJSRFP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593217"]
  - **Hop 2 &mdash; V1 Search (v4-V1-QR-2):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 3 &mdash; V1 FareConfirm (v4-V1-QR-2):** FAIL &mdash; 409
  - **Hop 4 &mdash; V1 Search (v4-V1-QR-2):** PASS &mdash; 200 - 4 offers; picked offers[1] total 13026.8 EGP
  - **Hop 5 &mdash; V1 FareConfirm (v4-V1-QR-2):** FAIL &mdash; 409
  - **Hop 6 &mdash; V1 Search (v4-V1-QR-2):** PASS &mdash; 200 - 4 offers; picked offers[2] total 13026.8 EGP
  - **Hop 7 &mdash; V1 FareConfirm (v4-V1-QR-2):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 8 &mdash; V1 Book (v4-V1-QR-2):** PASS &mdash; 200 - pnr RUOLZH gdsPNR RUOLZH; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593219"]
  - **Hop 9 &mdash; V1 Void (v4-V1-QR-2):** PASS &mdash; 200
  - **Hop 10 &mdash; V1 Search (v4-V1-QR-3):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 11 &mdash; V1 FareConfirm (v4-V1-QR-3):** FAIL &mdash; 409
  - **Hop 12 &mdash; V1 Search (v4-V1-QR-3):** PASS &mdash; 200 - 4 offers; picked offers[1] total 13026.8 EGP
  - **Hop 13 &mdash; V1 FareConfirm (v4-V1-QR-3):** FAIL &mdash; 409
  - **Hop 14 &mdash; V1 Search (v4-V1-QR-3):** PASS &mdash; 200 - 4 offers; picked offers[2] total 13026.8 EGP
  - **Hop 15 &mdash; V1 FareConfirm (v4-V1-QR-3):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 16 &mdash; V1 Book (v4-V1-QR-3):** PASS &mdash; 200 - pnr SHNZJC gdsPNR SHNZJC; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593220"]
  - **Hop 17 &mdash; V1 Void (v4-V1-QR-3):** PASS &mdash; 200
  - **Hop 18 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr RPCWCU gdsPNR RPCWCU; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593218"]
  - **Hop 19 &mdash; V2 Search (v4-V2-QR-2):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 20 &mdash; V2 FareConfirm (v4-V2-QR-2):** FAIL &mdash; 409
  - **Hop 21 &mdash; V2 Search (v4-V2-QR-2):** PASS &mdash; 200 - 4 offers; picked offers[1] total 13026.8 EGP
  - **Hop 22 &mdash; V2 FareConfirm (v4-V2-QR-2):** FAIL &mdash; 409
  - **Hop 23 &mdash; V2 Search (v4-V2-QR-2):** PASS &mdash; 200 - 4 offers; picked offers[2] total 13026.8 EGP
  - **Hop 24 &mdash; V2 FareConfirm (v4-V2-QR-2):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 25 &mdash; V2 AddPassenger (v4-V2-QR-2):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 26 &mdash; V2 Book (v4-V2-QR-2):** PASS &mdash; 200 - pnr SFOBCR gdsPNR SFOBCR; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593221"]
  - **Hop 27 &mdash; V2 Void (v4-V2-QR-2):** PASS &mdash; 200
  - **Hop 28 &mdash; V2 Search (v4-V2-QR-3):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 29 &mdash; V2 FareConfirm (v4-V2-QR-3):** FAIL &mdash; 409
  - **Hop 30 &mdash; V2 Search (v4-V2-QR-3):** PASS &mdash; 200 - 4 offers; picked offers[1] total 13026.8 EGP
  - **Hop 31 &mdash; V2 FareConfirm (v4-V2-QR-3):** FAIL &mdash; 409
  - **Hop 32 &mdash; V2 Search (v4-V2-QR-3):** PASS &mdash; 200 - 4 offers; picked offers[2] total 13026.8 EGP
  - **Hop 33 &mdash; V2 FareConfirm (v4-V2-QR-3):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 34 &mdash; V2 AddPassenger (v4-V2-QR-3):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 35 &mdash; V2 Book (v4-V2-QR-3):** PASS &mdash; 200 - pnr RQNEFS gdsPNR RQNEFS; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593222"]
  - **Hop 36 &mdash; V2 Void (v4-V2-QR-3):** PASS &mdash; 200
  - **Hop 37 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 38 &mdash; V1 Search (v4-V1-AA-2):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 39 &mdash; V1 FareConfirm (v4-V1-AA-2):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 40 &mdash; V1 Book (v4-V1-AA-2):** PASS &mdash; 200 - pnr SHGVTX gdsPNR SHGVTX; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962819"]
  - **Hop 41 &mdash; V1 Void (v4-V1-AA-2):** PASS &mdash; 409
  - **Hop 42 &mdash; V1 Search (v4-V1-AA-3):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 43 &mdash; V1 FareConfirm (v4-V1-AA-3):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 44 &mdash; V1 Book (v4-V1-AA-3):** PASS &mdash; 200 - pnr RXEMTA gdsPNR RXEMTA; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962820"]
  - **Hop 45 &mdash; V1 Void (v4-V1-AA-3):** PASS &mdash; 200
  - **Hop 46 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]
  - **Hop 47 &mdash; V2 Search (v4-V2-AA-2):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 48 &mdash; V2 FareConfirm (v4-V2-AA-2):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 49 &mdash; V2 AddPassenger (v4-V2-AA-2):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 50 &mdash; V2 Book (v4-V2-AA-2):** PASS &mdash; 200 - pnr ROWMHW gdsPNR ROWMHW; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962821"]
  - **Hop 51 &mdash; V2 Void (v4-V2-AA-2):** PASS &mdash; 200
  - **Hop 52 &mdash; V2 Search (v4-V2-AA-3):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 53 &mdash; V2 FareConfirm (v4-V2-AA-3):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 54 &mdash; V2 AddPassenger (v4-V2-AA-3):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 55 &mdash; V2 Book (v4-V2-AA-3):** PASS &mdash; 200 - pnr SMXTJC gdsPNR SMXTJC; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962822"]
  - **Hop 56 &mdash; V2 Void (v4-V2-AA-3):** PASS &mdash; 200

### TC-VOIDCAP-VAL-05 — FAIL

- **Test Case:** [Book]&amp;[Hold]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Validate one definition of voidCapability (name, type, location) across every endpoint that returns a booking.
- **Category:** Validation
- **Endpoint Name:** Book / Hold / PnrReprice / BookAfterHold / Retrieve
- **Request:** Direct Book-&gt;Retrieve and Hold-&gt;PnrReprice-&gt;Retrieve-&gt;BookAfterHold-&gt;Retrieve per version; name/type/location of voidCapability on each response
- **Response:** 14 responses inspected
- **Expected:** Identical name, string type and root-level position in every response that returns a booking (Book, Hold, PnrReprice, BookAfterHold, Retrieve) on V1 and V2.
- **Actual:** voidCapability is not defined the same way on every endpoint. Missing/odd: V1 PnrReprice, V2 PnrReprice
- **Status:** FAIL
- **Evidence:** V1 Book: "FullVoidOnlyAllowed" (string, root) | V1 Retrieve(ticketed): "None" (string, root) | V1 Hold: "None" (string, root) | V1 Retrieve(held): "None" (string, root) | V1 PnrReprice: ABSENT | V1 BookAfterHold: "None" (string, root) | V1 Retrieve(after BAH): "None" (string, root) | V2 Book: "FullVoidOnlyAllowed" (string, root) | V2 Retrieve(ticketed): "None" (string, root) | V2 Hold: "None" (string, root) | V2 Retrieve(held): "None" (string, root) | V2 PnrReprice: ABSENT | V2 BookAfterHold: "None" (string, root) | V2 Retrieve(after BAH): "None" (string, root)

  - **Hop 1 &mdash; V1 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm (hold):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 5 &mdash; V1 Hold (hold):** PASS &mdash; 200 - pnr RXHHXI gdsPNR RXHHXI; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 6 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 7 &mdash; V1 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 8 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 9 &mdash; V1 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593223:Booked
  - **Hop 10 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593223:Booked
  - **Hop 11 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593223","carrierCode":"QR"}]}
  - **Hop 12 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr SJSRFP gdsPNR SJSRFP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593217"]
  - **Hop 13 &mdash; V1 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593217:Booked
  - **Hop 14 &mdash; V2 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 15 &mdash; V2 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 16 &mdash; V2 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 17 &mdash; V2 FareConfirm (hold):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 18 &mdash; V2 AddPassenger (hold):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 19 &mdash; V2 Hold (hold):** PASS &mdash; 200 - pnr RRQDDA gdsPNR RRQDDA; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 20 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 21 &mdash; V2 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 22 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 23 &mdash; V2 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593224:Booked
  - **Hop 24 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus Booked; tickets 1572141593224:Booked
  - **Hop 25 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593224","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 26 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr RPCWCU gdsPNR RPCWCU; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593218"]
  - **Hop 27 &mdash; V2 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593218:Booked

### TC-VOIDCAP-VAL-06 — PASS

- **Test Case:** [Book][Response] Validate the response carries no duplicate voidCapability key and no supplier-native void attribute beside the unified property.
- **Category:** Validation
- **Endpoint Name:** Book / Retrieve
- **Request:** Raw body text of each Book and Retrieve scanned for duplicate keys and other void-related keys
- **Response:** 8 responses scanned
- **Expected:** voidCapability appears once. No extra supplier-native void fields. If one is genuinely needed, it is identical in name and meaning across suppliers.
- **Actual:** voidCapability appears exactly once and there are no other void keys
- **Status:** PASS
- **Evidence:** V1/QR Book: voidCapability x1, other void keys [] | V1/QR Retrieve: voidCapability x1, other void keys [] | V2/QR Book: voidCapability x1, other void keys [] | V2/QR Retrieve: voidCapability x1, other void keys [] | V1/AA Book: voidCapability x1, other void keys [] | V1/AA Retrieve: voidCapability x1, other void keys [] | V2/AA Book: voidCapability x1, other void keys [] | V2/AA Retrieve: voidCapability x1, other void keys []

  - **Hop 1 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr SJSRFP gdsPNR SJSRFP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593217"]
  - **Hop 2 &mdash; V1 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593217:Booked
  - **Hop 3 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr RPCWCU gdsPNR RPCWCU; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593218"]
  - **Hop 4 &mdash; V2 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593218:Booked
  - **Hop 5 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 6 &mdash; V1 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962817:Booked
  - **Hop 7 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]
  - **Hop 8 &mdash; V2 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962818:Booked

### TC-VOIDCAP-POS-01 — FAIL

- **Test Case:** [SabreNdc][Book][Response] Verify SabreNdc maps a ticketed Book to FullVoidOnlyAllowed and Void then succeeds, on V1 and V2.
- **Category:** Positive
- **Endpoint Name:** Book / Retrieve / Void
- **Request:** Book (QR, plus the AA booking from CAPCHECK-02), Retrieve, Void on V1 and V2
- **Response:** V1 QR: Book FullVoidOnlyAllowed, Retrieve None, Void 200 voided; V1 AA: Book FullVoidOnlyAllowed, Retrieve None; V2 QR: Book FullVoidOnlyAllowed, Retrieve None, Void 200 voided; V2 AA: Book FullVoidOnlyAllowed, Retrieve None
- **Expected:** Book voidCapability = FullVoidOnlyAllowed. Retrieve of the ticketed booking carries the same value. Void returns 200 {voided, voidedTickets[]}.
- **Actual:** Mismatch: V1 Retrieve None != Book FullVoidOnlyAllowed; V1 AA Retrieve None != Book; V2 Retrieve None != Book FullVoidOnlyAllowed; V2 AA Retrieve None != Book
- **Status:** FAIL
- **Evidence:** V1 QR: Book FullVoidOnlyAllowed, Retrieve None, Void 200 voided | V1 AA: Book FullVoidOnlyAllowed, Retrieve None | V2 QR: Book FullVoidOnlyAllowed, Retrieve None, Void 200 voided | V2 AA: Book FullVoidOnlyAllowed, Retrieve None | Void 200 {voided,voidedTickets[]} on both versions

  - **Hop 1 &mdash; V1 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (life):** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm (life):** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm (life):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 5 &mdash; V1 Book (life):** PASS &mdash; 200 - pnr SCGCDS gdsPNR SCGCDS; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593225"]
  - **Hop 6 &mdash; V1 Retrieve (life):** PASS &mdash; voidCapability=None
  - **Hop 7 &mdash; V1 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593225","carrierCode":"QR"}]}
  - **Hop 8 &mdash; V1 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"5cbdba99-87fb-4416-8e44-6e300b8eaf9c","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 9 &mdash; V1 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"d8d75ffc-163f-432e-9431-7bdb7afc64ce","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr
  - **Hop 10 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 11 &mdash; V1 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962817:Booked
  - **Hop 12 &mdash; V2 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 13 &mdash; V2 FareConfirm (life):** PASS &mdash; 409
  - **Hop 14 &mdash; V2 FareConfirm (life):** PASS &mdash; 409
  - **Hop 15 &mdash; V2 FareConfirm (life):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 16 &mdash; V2 AddPassenger (life):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 17 &mdash; V2 Book (life):** PASS &mdash; 200 - pnr SJGHKX gdsPNR SJGHKX; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593226"]
  - **Hop 18 &mdash; V2 Retrieve (life):** PASS &mdash; voidCapability=None
  - **Hop 19 &mdash; V2 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593226","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 20 &mdash; V2 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"e2eec83e-0a4c-4208-a56c-16e46b14bcc3","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 21 &mdash; V2 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"24f109a8-c971-4239-b688-525d985d8a7c","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr
  - **Hop 22 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]
  - **Hop 23 &mdash; V2 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962818:Booked

### TC-VOIDCAP-POS-02 — BLOCKED

- **Test Case:** [TravelportNdc][Book][Response] Verify TravelportNdc maps a ticketed Book on QR, RJ and EK to FullVoidOnlyAllowed and Void then succeeds.
- **Category:** Positive
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - TravelportNdc is out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** FullVoidOnlyAllowed on Book and on the ticketed Retrieve for every carrier and version; Void returns 200.
- **Actual:** Blocked: TravelportNdc is out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** TravelportNdc is out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-POS-03 — BLOCKED

- **Test Case:** [GulfAir][Book][Response] Verify GulfAir maps a ticketed Book to FullVoidOnlyAllowed and record whether Void is accepted.
- **Category:** Positive
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - GulfAir is out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** Book voidCapability = FullVoidOnlyAllowed (baseline 2026-09-06 to 2026-10-10). Void returns 200. If Void returns 409 OperationNotSupported while the flag says FullVoidOnlyAllowed, that is a defect: the mapping advertises a capability the supplier does not have.
- **Actual:** Blocked: GulfAir is out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** GulfAir is out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-POS-04 — BLOCKED

- **Test Case:** [Amadeus][Book][Response] Verify Amadeus maps voidCapability consistently with its actual Void behaviour.
- **Category:** Positive
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - Amadeus is out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** FullVoidOnlyAllowed and Void 2xx, or VoidNotAllowed and Void refused with OperationNotSupported. Any other pairing is a defect.
- **Actual:** Blocked: Amadeus is out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** Amadeus is out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-POS-05 — BLOCKED

- **Test Case:** [FlyAdeal][Book][Response] Verify FlyAdeal (LCC) maps voidCapability consistently with its actual Void behaviour.
- **Category:** Positive
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - FlyAdeal is out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** Same pairing rule as TC-VOIDCAP-POS-04. The LCC supplier type must still return a unified value, not an absent field.
- **Actual:** Blocked: FlyAdeal is out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** FlyAdeal is out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-POS-06 — BLOCKED

- **Test Case:** [EgyptAir]&amp;[OmanAir]&amp;[AirCairo][Book][Response] Verify the suppliers SPEC lists as Void-supported return FullVoidOnlyAllowed and accept Void.
- **Category:** Positive
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - EgyptAir, OmanAir and AirCairo are out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** voidCapability = FullVoidOnlyAllowed and Void 2xx. A supplier whose static matrix says Void=Yes but whose live behaviour is OperationNotSupported is a matrix/mapping conflict to report.
- **Actual:** Blocked: EgyptAir, OmanAir and AirCairo are out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** EgyptAir, OmanAir and AirCairo are out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-POS-07 — FAIL

- **Test Case:** [Hold]&amp;[BookAfterHold] [Response] Verify a held booking maps to VoidNotAllowed and the same PNR maps to FullVoidOnlyAllowed after BookAfterHold.
- **Category:** Positive
- **Endpoint Name:** Hold / BookAfterHold
- **Request:** Hold -&gt; PnrReprice -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void on V1 and V2 (QR CAI-JED)
- **Response:** V1: Hold None, PnrReprice (absent), BookAfterHold None, Retrieve after None, same pnr/gdsPNR/token true; V2: Hold None, PnrReprice (absent), BookAfterHold None, Retrieve after None, same pnr/gdsPNR/token true
- **Expected:** Hold: VoidNotAllowed (no ticket exists yet). After BookAfterHold and on the following Retrieve: FullVoidOnlyAllowed. pnr, gdsPNR, bookingToken unchanged across the hand-off. Void then succeeds.
- **Actual:** Not as expected: V1 Hold None (expected VoidNotAllowed); V1 BookAfterHold None (expected FullVoidOnlyAllowed); V1 Retrieve after BAH None; V2 Hold None (expected VoidNotAllowed); V2 BookAfterHold None (expected FullVoidOnlyAllowed); V2 Retrieve after BAH None
- **Status:** FAIL
- **Evidence:** V1: Hold None, PnrReprice (absent), BookAfterHold None, Retrieve after None, same pnr/gdsPNR/token true | V2: Hold None, PnrReprice (absent), BookAfterHold None, Retrieve after None, same pnr/gdsPNR/token true

  - **Hop 1 &mdash; V1 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm (hold):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 5 &mdash; V1 Hold (hold):** PASS &mdash; 200 - pnr RXHHXI gdsPNR RXHHXI; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 6 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 7 &mdash; V1 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 8 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 9 &mdash; V1 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593223:Booked
  - **Hop 10 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593223:Booked
  - **Hop 11 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593223","carrierCode":"QR"}]}
  - **Hop 12 &mdash; V2 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 13 &mdash; V2 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 14 &mdash; V2 FareConfirm (hold):** PASS &mdash; 409
  - **Hop 15 &mdash; V2 FareConfirm (hold):** PASS &mdash; 200 - total 13026.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 16 &mdash; V2 AddPassenger (hold):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 17 &mdash; V2 Hold (hold):** PASS &mdash; 200 - pnr RRQDDA gdsPNR RRQDDA; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 18 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 19 &mdash; V2 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 20 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 21 &mdash; V2 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593224:Booked
  - **Hop 22 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus Booked; tickets 1572141593224:Booked
  - **Hop 23 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593224","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-VOIDCAP-BIZ-01 — FAIL

- **Test Case:** [Book]&amp;[Void] [Response] Verify the voidCapability flag agrees with the Void endpoint outcome for every supplier.
- **Category:** Business Rule
- **Endpoint Name:** Book / Void
- **Request:** Read voidCapability on Book, then Void, per version and carrier
- **Response:** V1 QR: flag FullVoidOnlyAllowed -&gt; Void 200 voided=true; V1 AA: flag FullVoidOnlyAllowed -&gt; Void 200 voided (CAPCHECK-03); V2 QR: flag FullVoidOnlyAllowed -&gt; Void 200 voided=true; V2 AA: flag FullVoidOnlyAllowed -&gt; Void 200 voided (CAPCHECK-03)
- **Expected:** FullVoidOnlyAllowed =&gt; Void 2xx with voided=true. VoidNotAllowed =&gt; Void refused with a mapped error. Absent flag =&gt; defect (VAL-04). Any mismatch (flag allowed but Void refused, or flag not allowed but Void succeeds) is a High defect.
- **Actual:** The flag disagrees with the Void outcome: 4 of 11 V1 AA Book responses said VoidNotAllowed, yet Void succeeded (voided=true) on 2 of them, returned 200 with voided=false on 1, and gave 409 (supplier error) then 200 voided=false on the last
- **Status:** FAIL
- **Evidence:** QR (V1 20/20, V2 23/23) and V2 AA (8/8): Book FullVoidOnlyAllowed and Void 200 voided=true. V1 AA Books returning VoidNotAllowed: SJJNJF (Void 200 voided=false, then 409 "already voided"), ROMSRX (Void 200 voided=true), RPUKGE (Void 409 supplier error, then 200 voided=false, then 409 "no active order items"), SGZIEG (Void 409 supplier error, then 200 voided=true). Hold bookings: flag None, Void refused 400 (consistent).

  - **Hop 1 &mdash; V1 Book (life):** PASS &mdash; 200 - pnr SCGCDS gdsPNR SCGCDS; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593225"]
  - **Hop 2 &mdash; V1 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593225","carrierCode":"QR"}]}
  - **Hop 3 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 4 &mdash; V2 Book (life):** PASS &mdash; 200 - pnr SJGHKX gdsPNR SJGHKX; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593226"]
  - **Hop 5 &mdash; V2 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593226","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 6 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]

### TC-VOIDCAP-BIZ-03 — FAIL

- **Test Case:** [Book][Response] Verify the marketing carrier on a multi-carrier supplier does not change the voidCapability mapping.
- **Category:** Business Rule
- **Endpoint Name:** Book
- **Request:** Book QR and AA bookings per version, compare voidCapability and the Void outcome (CAPCHECK-03: both voided 200)
- **Response:** V1: QR Book FullVoidOnlyAllowed/Retrieve None; AA Book FullVoidOnlyAllowed/Retrieve None (tickets QR[QR] AA[AA]); V2: QR Book FullVoidOnlyAllowed/Retrieve None; AA Book FullVoidOnlyAllowed/Retrieve None (tickets QR[QR] AA[AA])
- **Expected:** Same unified value and same Void outcome for every carrier on one supplier. A carrier-specific difference (EK absent) is a defect unless the supplier genuinely cannot void that carrier, in which case the value must be VoidNotAllowed.
- **Actual:** The mapping depends on the carrier: V1 QR is always FullVoidOnlyAllowed (20 of 20) but V1 AA returned VoidNotAllowed on 4 of 11 Books; V2 AA is always FullVoidOnlyAllowed (8 of 8)
- **Status:** FAIL
- **Evidence:** V1 AA VoidNotAllowed on fare class B (two JFK-MIA fare variants) and on others (SJJNJF, ROMSRX, RPUKGE, SGZIEG); the Void outcome on those bookings is not "refused". Detected across the whole run after the earlier QR vs AA comparison (which passed on its single pair) had been logged.

  - **Hop 1 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr SJSRFP gdsPNR SJSRFP; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593217"]
  - **Hop 2 &mdash; V1 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593217:Booked
  - **Hop 3 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SKEGRI gdsPNR SKEGRI; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962817"]
  - **Hop 4 &mdash; V1 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962817:Booked
  - **Hop 5 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr RPCWCU gdsPNR RPCWCU; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593218"]
  - **Hop 6 &mdash; V2 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593218:Booked
  - **Hop 7 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RPPURY gdsPNR RPPURY; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962818"]
  - **Hop 8 &mdash; V2 Retrieve (mx-AA):** PASS &mdash; 200 - voidCapability=None; tickets 0015763962818:Booked

### TC-VOIDCAP-BIZ-04 — BLOCKED

- **Test Case:** [Retrieve][Response] Verify voidCapability turns to VoidNotAllowed once the booking is outside the void window.
- **Category:** Business Rule
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - it needs ticketed bookings created the previous day and left un-voided; none exist (every earlier SabreNdc booking was voided the same day) and leaving live tickets overnight was not authorised
- **Response:** No request sent
- **Expected:** voidCapability = VoidNotAllowed, and Void refused with a mapped business error. The flag is a live, per-booking value (SPEC 4.2/2.15), not a static supplier flag.
- **Actual:** Blocked: it needs ticketed bookings created the previous day and left un-voided; none exist (every earlier SabreNdc booking was voided the same day) and leaving live tickets overnight was not authorised
- **Status:** BLOCKED
- **Evidence:** it needs ticketed bookings created the previous day and left un-voided; none exist (every earlier SabreNdc booking was voided the same day) and leaving live tickets overnight was not authorised

### TC-VOIDCAP-BIZ-05 — PASS

- **Test Case:** [Void][Request] Verify FullVoidOnlyAllowed means whole-PNR void: a partial voidTickets list is rejected or voids all, and the response says which.
- **Category:** Business Rule
- **Endpoint Name:** Void
- **Request:** Book 2 ADT, Void with voidTickets naming only the first ticket (V1 and V2), then Retrieve
- **Response:** V1: 2 ADT tickets [1572141593228,1572141593227], Void([1572141593228]) -&gt; 200 voided all (2 listed); Retrieve after: 400; V2: 2 ADT tickets [1572141593230,1572141593229], Void([1572141593230]) -&gt; 200 voided all (2 listed); Retrieve after: 400
- **Expected:** Either a mapped 4xx rejection with both tickets still active, or a 200 whose voidedTickets lists every ticket actually voided. Never a response that lists only the named ticket while all were voided.
- **Actual:** Either a mapped rejection or a 200 listing every ticket actually voided
- **Status:** PASS
- **Evidence:** V1: 2 ADT tickets [1572141593228,1572141593227], Void([1572141593228]) -&gt; 200 voided all (2 listed); Retrieve after: 400 | V2: 2 ADT tickets [1572141593230,1572141593229], Void([1572141593230]) -&gt; 200 voided all (2 listed); Retrieve after: 400

  - **Hop 1 &mdash; V1 Search (part):** PASS &mdash; 200 - 4 offers; picked offers[0] total 25765.6 EGP
  - **Hop 2 &mdash; V1 FareConfirm (part):** PASS &mdash; 200 - total 25765.6 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (part):** PASS &mdash; 200 - pnr SDBTAB gdsPNR SDBTAB; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593228","1572141593227"]
  - **Hop 4 &mdash; V1 Void (part):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Retrieve (part):** PASS &mdash; 400
  - **Hop 6 &mdash; V2 Search (part):** PASS &mdash; 200 - 4 offers; picked offers[0] total 25765.6 EGP
  - **Hop 7 &mdash; V2 FareConfirm (part):** PASS &mdash; 200 - total 25765.6 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 8 &mdash; V2 AddPassenger (part):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 9 &mdash; V2 Book (part):** PASS &mdash; 200 - pnr RXZGHN gdsPNR RXZGHN; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593230","1572141593229"]
  - **Hop 10 &mdash; V2 Void (part):** PASS &mdash; 200
  - **Hop 11 &mdash; V2 Retrieve (part):** PASS &mdash; 400

### TC-VOIDCAP-BIZ-06 — FAIL

- **Test Case:** [Retrieve]&amp;[Void] [Response] Verify a booking that was voided reports VoidNotAllowed or a terminal state and a second Void is refused.
- **Category:** Business Rule
- **Endpoint Name:** Retrieve / Void
- **Request:** Retrieve then second Void on a booking voided minutes earlier (V1 and V2)
- **Response:** V1: Retrieve after Void 400 (NDC-INT-TEC-A0001 This Trip Is Already Cancelled), flag (absent); second Void 409; V2: Retrieve after Void 400 (NDC-INT-TEC-A0001 This Trip Is Already Cancelled), flag (absent); second Void 409
- **Expected:** Retrieve returns VoidNotAllowed or a terminal 409 (TravelportNdc returned 409 on Retrieve after Void). Second Void is refused with a mapped error, not 200.
- **Actual:** Not as expected: V1 Retrieve after Void returned 400 (expected VoidNotAllowed or a terminal 409); V2 Retrieve after Void returned 400 (expected VoidNotAllowed or a terminal 409)
- **Status:** FAIL
- **Evidence:** V1: Retrieve after Void 400 (NDC-INT-TEC-A0001 This Trip Is Already Cancelled), flag (absent); second Void 409 | V2: Retrieve after Void 400 (NDC-INT-TEC-A0001 This Trip Is Already Cancelled), flag (absent); second Void 409

  - **Hop 1 &mdash; V1 Book (life):** PASS &mdash; 200 - pnr SCGCDS gdsPNR SCGCDS; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593225"]
  - **Hop 2 &mdash; V1 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593225","carrierCode":"QR"}]}
  - **Hop 3 &mdash; V1 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"5cbdba99-87fb-4416-8e44-6e300b8eaf9c","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 4 &mdash; V1 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"d8d75ffc-163f-432e-9431-7bdb7afc64ce","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr
  - **Hop 5 &mdash; V2 Book (life):** PASS &mdash; 200 - pnr SJGHKX gdsPNR SJGHKX; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593226"]
  - **Hop 6 &mdash; V2 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593226","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"e2eec83e-0a4c-4208-a56c-16e46b14bcc3","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 8 &mdash; V2 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"24f109a8-c971-4239-b688-525d985d8a7c","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr

### TC-VOIDCAP-BND-02 — PASS

- **Test Case:** [Book][Response] Verify voidCapability is the same for a next-day departure and a far-future departure.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** Book at D+1 and at the furthest date with offers (D+250) on V1 and V2
- **Response:** V1: D+1 (2026-11-05) FullVoidOnlyAllowed, D+250 (2027-07-12) FullVoidOnlyAllowed; V2: D+1 (2026-11-05) FullVoidOnlyAllowed, D+250 (2027-07-12) FullVoidOnlyAllowed
- **Expected:** Same value regardless of departure date. The void window is anchored on ticketing time, not on departure time.
- **Actual:** Same voidCapability regardless of departure date
- **Status:** PASS
- **Evidence:** V1: D+1 (2026-11-05) FullVoidOnlyAllowed, D+250 (2027-07-12) FullVoidOnlyAllowed | V2: D+1 (2026-11-05) FullVoidOnlyAllowed, D+250 (2027-07-12) FullVoidOnlyAllowed | furthest probe: 2027-02-02:3, 2027-04-03:9, 2027-05-23:10, 2027-07-02:3, 2027-08-11:0, 2027-07-12:1, 2027-07-22:0

  - **Hop 1 &mdash; V2 Search (bnd2-probe):** PASS &mdash; 2027-02-02: 200, 3 offers
  - **Hop 2 &mdash; V2 Search (bnd2-probe):** PASS &mdash; 2027-04-03: 200, 9 offers
  - **Hop 3 &mdash; V2 Search (bnd2-probe):** PASS &mdash; 2027-05-23: 200, 10 offers
  - **Hop 4 &mdash; V2 Search (bnd2-probe):** PASS &mdash; 2027-07-02: 200, 3 offers
  - **Hop 5 &mdash; V2 Search (bnd2-probe):** PASS &mdash; 2027-08-11: 200, 0 offers
  - **Hop 6 &mdash; V2 Search (bnd2-probe):** PASS &mdash; 2027-07-12: 200, 1 offers
  - **Hop 7 &mdash; V2 Search (bnd2-probe):** PASS &mdash; 2027-07-22: 200, 0 offers
  - **Hop 8 &mdash; V1 Search (near):** PASS &mdash; 200 - 6 offers; picked offers[0] total 12882.8 EGP
  - **Hop 9 &mdash; V1 FareConfirm (near):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 10 &mdash; V1 Book (near):** PASS &mdash; 200 - pnr RWQUYE gdsPNR RWQUYE; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593231"]
  - **Hop 11 &mdash; V1 Void (nd1V1):** PASS &mdash; 200
  - **Hop 12 &mdash; V1 Search (far):** PASS &mdash; 200 - 1 offers; picked offers[0] total 13159.8 EGP
  - **Hop 13 &mdash; V1 FareConfirm (far):** PASS &mdash; 200 - total 13159.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 14 &mdash; V1 Book (far):** PASS &mdash; 200 - pnr SGPVQN gdsPNR SGPVQN; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593232"]
  - **Hop 15 &mdash; V1 Void (farV1):** PASS &mdash; 200
  - **Hop 16 &mdash; V2 Search (near):** PASS &mdash; 200 - 6 offers; picked offers[0] total 12882.8 EGP
  - **Hop 17 &mdash; V2 FareConfirm (near):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 18 &mdash; V2 AddPassenger (near):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 19 &mdash; V2 Book (near):** PASS &mdash; 200 - pnr RNUZNC gdsPNR RNUZNC; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593233"]
  - **Hop 20 &mdash; V2 Void (nd1V2):** PASS &mdash; 200
  - **Hop 21 &mdash; V2 Search (far):** PASS &mdash; 200 - 1 offers; picked offers[0] total 13159.8 EGP
  - **Hop 22 &mdash; V2 FareConfirm (far):** PASS &mdash; 200 - total 13159.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 23 &mdash; V2 AddPassenger (far):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 24 &mdash; V2 Book (far):** PASS &mdash; 200 - pnr RPEBMX gdsPNR RPEBMX; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593234"]
  - **Hop 25 &mdash; V2 Void (farV2):** PASS &mdash; 200

### TC-VOIDCAP-VAL-07 — BLOCKED

- **Test Case:** [Book][Response] Validate the published API contract documents voidCapability with its type and allowed values.
- **Category:** Validation
- **Endpoint Name:** Documentation
- **Request:** GET on swagger/index.html, swagger/v1/swagger.json, swagger.json, openapi.json, api-docs, docs, swagger/v2/swagger.json
- **Response:** swagger/index.html: 200; swagger/v1/swagger.json: 404; swagger.json: 404; openapi.json: 404; api-docs: 404; docs: 404; swagger/v2/swagger.json: 404
- **Expected:** The property is documented once, as a string with the enumeration {FullVoidOnlyAllowed, VoidNotAllowed}, with a description of each value. If no contract is exposed the case is BLOCKED.
- **Actual:** Blocked: the staging host serves only the Swagger UI page (swagger/index.html, 3 KB); the OpenAPI JSON it loads is not at any standard path (all return 404), so the voidCapability schema cannot be read
- **Status:** BLOCKED
- **Evidence:** swagger/index.html:200 | swagger/v1/swagger.json:404 | swagger.json:404 | openapi.json:404 | api-docs:404 | docs:404 | swagger/v2/swagger.json:404

  - **Hop 1 &mdash; GET swagger/index.html:** PASS &mdash; 200 (3044 bytes)
  - **Hop 2 &mdash; GET swagger/v1/swagger.json:** PASS &mdash; 404 (0 bytes)
  - **Hop 3 &mdash; GET swagger.json:** PASS &mdash; 404 (0 bytes)
  - **Hop 4 &mdash; GET openapi.json:** PASS &mdash; 404 (0 bytes)
  - **Hop 5 &mdash; GET api-docs:** PASS &mdash; 404 (0 bytes)
  - **Hop 6 &mdash; GET docs:** PASS &mdash; 404 (0 bytes)
  - **Hop 7 &mdash; GET swagger/v2/swagger.json:** PASS &mdash; 404 (0 bytes)

### TC-VOIDCAP-BND-01 — PASS

- **Test Case:** [Book][Response] Verify voidCapability is the same for 1 passenger and for the 9-passenger maximum including an infant.
- **Category:** Boundary
- **Endpoint Name:** Book / Void
- **Request:** 1-passenger vs 9-passenger (5 ADT + 2 CHD + 2 INF) Book and Void on V1 and V2
- **Response:** V1: 1 ADT flag FullVoidOnlyAllowed; 9 pax (5 ADT, 2 CHD, 2 INF) flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9 ticket(s), Book 64.9s; V2: 1 ADT flag FullVoidOnlyAllowed; 9 pax (5 ADT, 2 CHD, 2 INF) flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9 ticket(s), Book 66.8s
- **Expected:** Same voidCapability for both parties; Void voids every ticket including the infant ticket.
- **Actual:** Same voidCapability for 1 and 9 passengers; Void voids every ticket
- **Status:** PASS
- **Evidence:** V1: 1 ADT flag FullVoidOnlyAllowed; 9 pax (5 ADT, 2 CHD, 2 INF) flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9 ticket(s), Book 64.9s | V2: 1 ADT flag FullVoidOnlyAllowed; 9 pax (5 ADT, 2 CHD, 2 INF) flag FullVoidOnlyAllowed, tickets 9, Void 200 listing 9 ticket(s), Book 66.8s

  - **Hop 1 &mdash; V1 Search (nine):** PASS &mdash; 200 - 4 offers; picked offers[0] total 98715.2 EGP
  - **Hop 2 &mdash; V1 FareConfirm (nine):** PASS &mdash; 200 - total 98715.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (nine):** PASS &mdash; 200 - pnr SHYCWF gdsPNR SHYCWF; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593241","1572141593236","1572141593238","1572141593237","1572141593240","1572141593239","1572141593242","1572141593243","1572141593244"]
  - **Hop 4 &mdash; V1 Void (nineV1):** PASS &mdash; 200
  - **Hop 5 &mdash; V2 Search (nine):** PASS &mdash; 200 - 4 offers; picked offers[0] total 98715.2 EGP
  - **Hop 6 &mdash; V2 FareConfirm (nine):** PASS &mdash; 200 - total 98715.2 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger (nine):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Book (nine):** PASS &mdash; 200 - pnr SKBYCL gdsPNR SKBYCL; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593251","1572141593246","1572141593248","1572141593247","1572141593250","1572141593249","1572141593252","1572141593253","1572141593254"]
  - **Hop 9 &mdash; V2 Void (nineV2):** PASS &mdash; 200

### TC-VOIDCAP-BND-03 — FAIL

- **Test Case:** [Book][Response] Verify voidCapability does not vary with cabin, fare class or refundability.
- **Category:** Boundary
- **Endpoint Name:** Book
- **Request:** Book AA offers with different cabin/RBD fare keys on V1 and V2 (JFK-MIA), compare voidCapability
- **Response:** V1 ECONOMY:B+ECONOMY:B refundability UnKnown: VoidNotAllowed, Void 200; V1 ECONOMY:B refundability UnKnown: VoidNotAllowed, Void 409; V1 ECONOMY:G+ECONOMY:G refundability UnKnown: FullVoidOnlyAllowed, Void 200; V2 ECONOMY:B+ECONOMY:B refundability UnKnown: FullVoidOnlyAllowed, Void 200; V2 ECONOMY:B refundability UnKnown: FullVoidOnlyAllowed, Void 200; V2 ECONOMY:G+ECONOMY:G refundability UnKnown: FullVoidOnlyAllowed, Void 200
- **Expected:** The same unified value for every fare type; no fare-class-specific native value leaks through.
- **Actual:** Problem: V1 ECONOMY:B+ECONOMY:B VoidNotAllowed; V1 ECONOMY:B VoidNotAllowed
- **Status:** FAIL
- **Evidence:** V1 ECONOMY:B+ECONOMY:B refundability UnKnown: VoidNotAllowed, Void 200 | V1 ECONOMY:B refundability UnKnown: VoidNotAllowed, Void 409 | V1 ECONOMY:G+ECONOMY:G refundability UnKnown: FullVoidOnlyAllowed, Void 200 | V2 ECONOMY:B+ECONOMY:B refundability UnKnown: FullVoidOnlyAllowed, Void 200 | V2 ECONOMY:B refundability UnKnown: FullVoidOnlyAllowed, Void 200 | V2 ECONOMY:G+ECONOMY:G refundability UnKnown: FullVoidOnlyAllowed, Void 200 | No business or refundable fares were returned by SabreNdc/EGY; only economy RBD variants could be compared.

  - **Hop 1 &mdash; V1 Search (bnd3):** PASS &mdash; 47 offers; AA-only fare keys: ECONOMY:B+ECONOMY:B, ECONOMY:B, ECONOMY:G+ECONOMY:G, ECONOMY:V+ECONOMY:V, ECONOMY:L+ECONOMY:L, ECONOMY:M+ECONOMY:M, ECONOMY:V+ECONOMY:S, ECONOMY:V+ECONOMY:G, ECONOMY:K+ECONOMY:K, ECONOMY:L+ECONOMY:G, ECONOMY:S+ECONOMY:S, ECONOMY:S+ECONOMY:L, ECONOMY:M+ECONOMY:G, ECONOMY:L+ECONOMY:V
  - **Hop 2 &mdash; V1 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 3 &mdash; V1 FareConfirm (fare):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 4 &mdash; V1 Book (fare):** PASS &mdash; 200 - pnr ROMSRX gdsPNR ROMSRX; voidCapability=VoidNotAllowed; tickets ["0015763962824"]
  - **Hop 5 &mdash; V1 Void (fare-V1-ECONOMY:B+ECONOMY:B):** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[1] total 16282 EGP
  - **Hop 7 &mdash; V1 FareConfirm (fare):** PASS &mdash; 200 - total 16282 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 8 &mdash; V1 Book (fare):** FAIL &mdash; 409
  - **Hop 9 &mdash; V1 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[2] total 16282 EGP
  - **Hop 10 &mdash; V1 FareConfirm (fare):** PASS &mdash; 200 - total 16282 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 11 &mdash; V1 Book (fare):** PASS &mdash; 200 - pnr RPUKGE gdsPNR RPUKGE; voidCapability=VoidNotAllowed; tickets ["0015763962826"]
  - **Hop 12 &mdash; V1 Void (fare-V1-ECONOMY:B):** PASS &mdash; 409
  - **Hop 13 &mdash; V1 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[16] total 20156 EGP
  - **Hop 14 &mdash; V1 FareConfirm (fare):** PASS &mdash; 200 - total 20156 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 15 &mdash; V1 Book (fare):** FAIL &mdash; 409
  - **Hop 16 &mdash; V1 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[17] total 20156 EGP
  - **Hop 17 &mdash; V1 FareConfirm (fare):** PASS &mdash; 200 - total 20156 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 18 &mdash; V1 Book (fare):** PASS &mdash; 200 - pnr RRKDYK gdsPNR RRKDYK; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962827"]
  - **Hop 19 &mdash; V1 Void (fare-V1-ECONOMY:G+ECONOMY:G):** PASS &mdash; 200
  - **Hop 20 &mdash; V2 Search (bnd3):** PASS &mdash; 47 offers; AA-only fare keys: ECONOMY:B+ECONOMY:B, ECONOMY:B, ECONOMY:G+ECONOMY:G, ECONOMY:V+ECONOMY:V, ECONOMY:L+ECONOMY:L, ECONOMY:M+ECONOMY:M, ECONOMY:V+ECONOMY:S, ECONOMY:V+ECONOMY:G, ECONOMY:K+ECONOMY:K, ECONOMY:L+ECONOMY:G, ECONOMY:S+ECONOMY:S, ECONOMY:S+ECONOMY:L, ECONOMY:M+ECONOMY:G, ECONOMY:L+ECONOMY:V
  - **Hop 21 &mdash; V2 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[0] total 13697 EGP
  - **Hop 22 &mdash; V2 FareConfirm (fare):** PASS &mdash; 200 - total 13697 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 23 &mdash; V2 AddPassenger (fare):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 24 &mdash; V2 Book (fare):** PASS &mdash; 200 - pnr RPJKRA gdsPNR RPJKRA; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962828"]
  - **Hop 25 &mdash; V2 Void (fare-V2-ECONOMY:B+ECONOMY:B):** PASS &mdash; 200
  - **Hop 26 &mdash; V2 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[1] total 16282 EGP
  - **Hop 27 &mdash; V2 FareConfirm (fare):** PASS &mdash; 200 - total 16282 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 28 &mdash; V2 AddPassenger (fare):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 29 &mdash; V2 Book (fare):** PASS &mdash; 200 - pnr RRQZWL gdsPNR RRQZWL; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962829"]
  - **Hop 30 &mdash; V2 Void (fare-V2-ECONOMY:B):** PASS &mdash; 200
  - **Hop 31 &mdash; V2 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[16] total 20156 EGP
  - **Hop 32 &mdash; V2 FareConfirm (fare):** PASS &mdash; 200 - total 20156 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 33 &mdash; V2 AddPassenger (fare):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 34 &mdash; V2 Book (fare):** FAIL &mdash; 409
  - **Hop 35 &mdash; V2 Search (fare):** PASS &mdash; 200 - 47 offers; picked offers[17] total 20156 EGP
  - **Hop 36 &mdash; V2 FareConfirm (fare):** PASS &mdash; 200 - total 20156 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 37 &mdash; V2 AddPassenger (fare):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 38 &mdash; V2 Book (fare):** PASS &mdash; 200 - pnr SCCUDV gdsPNR SCCUDV; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962830"]
  - **Hop 39 &mdash; V2 Void (fare-V2-ECONOMY:G+ECONOMY:G):** PASS &mdash; 200

### TC-VOIDCAP-BND-04 — PASS

- **Test Case:** [Book][Response] Verify voidCapability is the same for one-way, round-trip and multi-segment itineraries.
- **Category:** Boundary
- **Endpoint Name:** Book / Void
- **Request:** Book one-way direct (CAI-DOH), one-way connecting (CAI-JED) and round-trip (CAI-JED + JED-CAI) on V1 and V2, then Void
- **Response:** V1 direct: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1; V1 connecting: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1; V1 round-trip: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1; V2 direct: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1; V2 connecting: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1; V2 round-trip: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1
- **Expected:** Same value and same Void outcome; the response still covers every ticket of the PNR.
- **Actual:** Same value and same Void outcome for all itinerary shapes
- **Status:** PASS
- **Evidence:** V1 direct: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1 | V1 connecting: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1 | V1 round-trip: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1 | V2 direct: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1 | V2 connecting: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1 | V2 round-trip: flag FullVoidOnlyAllowed, tickets 1, Void 200 listing 1

  - **Hop 1 &mdash; V1 Search (direct):** PASS &mdash; 200 - 5 offers; picked [0]
  - **Hop 2 &mdash; V1 FareConfirm (direct):** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Book (direct):** PASS &mdash; 200 - pnr RTFPHH; voidCapability=FullVoidOnlyAllowed; tickets 1572141593256:Booked
  - **Hop 4 &mdash; V1 Void (shape-V1-direct):** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Search (connecting):** PASS &mdash; 200 - 4 offers; picked [0]
  - **Hop 6 &mdash; V1 FareConfirm (connecting):** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Book (connecting):** PASS &mdash; 200 - pnr RNZERT; voidCapability=FullVoidOnlyAllowed; tickets 1572141593257:Booked
  - **Hop 8 &mdash; V1 Void (shape-V1-connecting):** PASS &mdash; 200
  - **Hop 9 &mdash; V1 Search (round-trip):** PASS &mdash; 200 - 100 offers; picked [0]
  - **Hop 10 &mdash; V1 FareConfirm (round-trip):** PASS &mdash; 200
  - **Hop 11 &mdash; V1 Book (round-trip):** PASS &mdash; 200 - pnr SCSIYG; voidCapability=FullVoidOnlyAllowed; tickets 1572141593258:Booked
  - **Hop 12 &mdash; V1 Void (shape-V1-round-trip):** PASS &mdash; 200
  - **Hop 13 &mdash; V2 Search (direct):** PASS &mdash; 200 - 5 offers; picked [0]
  - **Hop 14 &mdash; V2 FareConfirm (direct):** PASS &mdash; 200
  - **Hop 15 &mdash; V2 AddPassenger (direct):** PASS &mdash; 200
  - **Hop 16 &mdash; V2 Book (direct):** PASS &mdash; 200 - pnr RWPLQW; voidCapability=FullVoidOnlyAllowed; tickets 1572141593259:Booked
  - **Hop 17 &mdash; V2 Void (shape-V2-direct):** PASS &mdash; 200
  - **Hop 18 &mdash; V2 Search (connecting):** PASS &mdash; 200 - 4 offers; picked [0]
  - **Hop 19 &mdash; V2 FareConfirm (connecting):** PASS &mdash; 200
  - **Hop 20 &mdash; V2 AddPassenger (connecting):** PASS &mdash; 200
  - **Hop 21 &mdash; V2 Book (connecting):** PASS &mdash; 200 - pnr SLPZSA; voidCapability=FullVoidOnlyAllowed; tickets 1572141593260:Booked
  - **Hop 22 &mdash; V2 Void (shape-V2-connecting):** PASS &mdash; 200
  - **Hop 23 &mdash; V2 Search (round-trip):** PASS &mdash; 200 - 100 offers; picked [0]
  - **Hop 24 &mdash; V2 FareConfirm (round-trip):** PASS &mdash; 200
  - **Hop 25 &mdash; V2 AddPassenger (round-trip):** PASS &mdash; 200
  - **Hop 26 &mdash; V2 Book (round-trip):** PASS &mdash; 200 - pnr SDQGII; voidCapability=FullVoidOnlyAllowed; tickets 1572141593261:Booked
  - **Hop 27 &mdash; V2 Void (shape-V2-round-trip):** PASS &mdash; 200

### TC-VOIDCAP-BND-05 — BLOCKED

- **Test Case:** [Book][Response] Verify bundles, ancillaries and seats on a booking do not change the voidCapability mapping.
- **Category:** Boundary
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - SabreNdc/EGY has no bundle, ancillary or seat enrichment (those endpoints return 409 OperationNotSupported, confirmed 2026-10-25), and the other suppliers named by the case are out of scope
- **Response:** No request sent
- **Expected:** Same voidCapability as the plain booking. For a Void-supported supplier, enriched Void returns the V2 shape with ancillaries and EMDs listed when present.
- **Actual:** Blocked: SabreNdc/EGY has no bundle, ancillary or seat enrichment (those endpoints return 409 OperationNotSupported, confirmed 2026-10-25), and the other suppliers named by the case are out of scope
- **Status:** BLOCKED
- **Evidence:** SabreNdc/EGY has no bundle, ancillary or seat enrichment (those endpoints return 409 OperationNotSupported, confirmed 2026-10-25), and the other suppliers named by the case are out of scope

### TC-VOIDCAP-NEG-01 — BLOCKED

- **Test Case:** [Book][Response] Verify a Book for a Void-unsupported supplier returns an explicit voidCapability of VoidNotAllowed.
- **Category:** Negative
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Response:** No request sent
- **Expected:** voidCapability = VoidNotAllowed on both versions. An absent or null value is a defect: unsupported suppliers must be represented, not left blank.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Status:** BLOCKED
- **Evidence:** it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void

### TC-VOIDCAP-NEG-02 — BLOCKED

- **Test Case:** [Void][Response] Verify Void for a Void-unsupported supplier is refused with HTTP 409 OperationNotSupported and a correct, supplier-specific message.
- **Category:** Negative
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Response:** No request sent
- **Expected:** HTTP 409 with ErrorCode OperationNotSupported in the standard envelope on both versions; Context names the actual supplier, not a misleading text such as "TravelportNdc does not exists"; no raw supplier request/response, no stack or .NET type name.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Status:** BLOCKED
- **Evidence:** it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void

### TC-VOIDCAP-NEG-03 — BLOCKED

- **Test Case:** [Retrieve][Response] Verify a refused Void on an unsupported supplier leaves the booking and its voidCapability unchanged.
- **Category:** Negative
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Response:** No request sent
- **Expected:** No field changed: same tickets, same status, voidCapability still VoidNotAllowed. No 5xx.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void
- **Status:** BLOCKED
- **Evidence:** it needs a Void-unsupported supplier (AirIndia) and none is in scope; SabreNdc/EGY supports Void

### TC-VOIDCAP-NEG-04 — PASS

- **Test Case:** [Void][Response] Verify Void on a held (VoidNotAllowed) booking of a Void-supported supplier is refused, with the hold left intact.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** Hold, then Void on the held booking, Retrieve, CancelAfterHold (V1 and V2)
- **Response:** V1: Hold flag None; Void of the hold -&gt; 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided."; envelope true; Retrieve after: 200  tickets 0; CancelAfterHold 200; V2: Hold flag None; Void of the hold -&gt; 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided."; envelope true; Retrieve after: 200 OnHold tickets 0; CancelAfterHold 200
- **Expected:** Void refused with a mapped business error in the standard envelope; Retrieve still shows the hold; CancelAfterHold then succeeds. The error code is identical for every S supplier (record it; do not assume).
- **Actual:** Void refused in the standard envelope, hold intact, CancelAfterHold succeeded
- **Status:** PASS
- **Evidence:** V1: Hold flag None; Void of the hold -&gt; 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided."; envelope true; Retrieve after: 200  tickets 0; CancelAfterHold 200 | V2: Hold flag None; Void of the hold -&gt; 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided."; envelope true; Retrieve after: 200 OnHold tickets 0; CancelAfterHold 200 | Recorded error: SabreNdc returns HTTP 400 NDC-INT-TEC-A0001 for Void-on-hold and 409 NDC-INT-TEC-A0001 for a repeat Void; TravelportNdc ne-5 returned 409 Z9999 (baseline only, not re-run).

  - **Hop 1 &mdash; V1 Search (hc):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (hc):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (hc):** PASS &mdash; 200 - pnr SETDUJ gdsPNR SETDUJ; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 4 &mdash; V1 Void (hc):** PASS &mdash; 400 {"Status":400,"TransactionId":"64abf708-7668-4a25-88a1-71c4ee4ec776","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"Only fulfilled, ticketed orders c
  - **Hop 5 &mdash; V1 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None
  - **Hop 6 &mdash; V1 CancelAfterHold (hc):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 7 &mdash; V1 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None
  - **Hop 8 &mdash; V2 Search (hc):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 9 &mdash; V2 FareConfirm (hc):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 10 &mdash; V2 AddPassenger (hc):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 11 &mdash; V2 Hold (hc):** PASS &mdash; 200 - pnr RWEZQF gdsPNR RWEZQF; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 12 &mdash; V2 Void (hc):** PASS &mdash; 400 {"Status":400,"TransactionId":"df16c675-b2b6-4123-80a3-6ae117446f48","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"Only fulfilled, ticketed orders c
  - **Hop 13 &mdash; V2 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold
  - **Hop 14 &mdash; V2 CancelAfterHold (hc):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}
  - **Hop 15 &mdash; V2 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold

### TC-VOIDCAP-NEG-05 — BLOCKED

- **Test Case:** [Void][Response] Verify every Void-unsupported supplier returns the same error shape, code and casing on V1 and V2.
- **Category:** Negative
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - it compares the error shape of several Void-unsupported suppliers and none is in scope
- **Response:** No request sent
- **Expected:** Identical status (409) and ErrorCode (OperationNotSupported); identical envelope key casing (a single casing, not the two seen in earlier runs); only supplier-specific Context values differ.
- **Actual:** Blocked: it compares the error shape of several Void-unsupported suppliers and none is in scope
- **Status:** BLOCKED
- **Evidence:** it compares the error shape of several Void-unsupported suppliers and none is in scope

### TC-VOIDCAP-NEG-06 — PASS

- **Test Case:** [Void][Request] Verify an unknown supplier or an inactive credentialsSelector is rejected as a validation error, not as OperationNotSupported.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** Void with an unknown supplier and with SabreNdc + inactive selectors KSA and UAE, V1 and V2 (dummy ids)
- **Response:** V1 NoSuchSupplier/EGY: 400  ""; V1 SabreNdc/KSA: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect"; V1 SabreNdc/UAE: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect"; V2 NoSuchSupplier/EGY: 400  ""; V2 SabreNdc/KSA: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect"; V2 SabreNdc/UAE: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect"
- **Expected:** HTTP 400 ValidationError (credentials not active / supplier not found), distinct from the 409 OperationNotSupported returned for a real supplier without Void.
- **Actual:** HTTP 400 validation errors, distinct from 409 OperationNotSupported
- **Status:** PASS
- **Evidence:** V1 NoSuchSupplier/EGY: 400  "" | V1 SabreNdc/KSA: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect" | V1 SabreNdc/UAE: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect" | V2 NoSuchSupplier/EGY: 400  "" | V2 SabreNdc/KSA: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect" | V2 SabreNdc/UAE: 400 NDC-INT-TEC-A0001 "The credentials for the selected supplier do not exist or are not active. Please verify the 'credentialsSelect"

  - **Hop 1 &mdash; V1 Void (neg6):** PASS &mdash; 400 {"status":400,"transactionId":"d467c917-07ba-48a0-8766-1f7f54075d95","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"voidRequestDto","value":"The voidRequestDto field is required."},{"name":"$.supp
  - **Hop 2 &mdash; V1 Void (neg6):** PASS &mdash; 400 {"Status":400,"TransactionId":"319bb774-efe0-415a-83dd-97b00e0d9727","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"PredicateValidator","Value":"The credentials for the s
  - **Hop 3 &mdash; V1 Void (neg6):** PASS &mdash; 400 {"Status":400,"TransactionId":"918ed788-cb8d-4ccf-a396-8e828116fce9","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"PredicateValidator","Value":"The credentials for the s
  - **Hop 4 &mdash; V2 Void (neg6):** PASS &mdash; 400 {"status":400,"transactionId":"a63d3cf6-d7c7-4f66-ae4a-da0fc83074d1","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"voidRequestDto","value":"The voidRequestDto field is required."},{"name":"$.supp
  - **Hop 5 &mdash; V2 Void (neg6):** PASS &mdash; 400 {"Status":400,"TransactionId":"93478e0a-16ac-4819-9f04-252c047c3e15","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"PredicateValidator","Value":"The credentials for the s
  - **Hop 6 &mdash; V2 Void (neg6):** PASS &mdash; 400 {"Status":400,"TransactionId":"dd68e9b6-eab7-412d-8c1b-661cbc6559f2","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"PredicateValidator","Value":"The credentials for the s

### TC-VOIDCAP-NEG-07 — BLOCKED

- **Test Case:** [Book]&amp;[Void] [Response] Verify suppliers hit by the known capability-lookup name mismatch (Indigo, ElJazeera, OmainAir) do not silently report VoidNotAllowed or lose the field.
- **Category:** Negative
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - Indigo, ElJazeera and OmainAir are out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** Flag and Void outcome agree (as TC-VOIDCAP-BIZ-01). A flag of VoidNotAllowed for a supplier that actually voids, or an absent flag, is a defect caused by the lookup mismatch.
- **Actual:** Blocked: Indigo, ElJazeera and OmainAir are out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** Indigo, ElJazeera and OmainAir are out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-NEG-08 — BLOCKED

- **Test Case:** [Void][Request] Verify error precedence is uniform when an unsupported-supplier Void also has an invalid field.
- **Category:** Negative
- **Endpoint Name:** Void
- **Request:** Void with pnr omitted on the S supplier (SabreNdc) only
- **Response:** V1 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 "PNR is required."; V2 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 "PNR is required."
- **Expected:** Both suppliers return the same kind of error for the same invalid request (either 400 ValidationError first for both, or 409 first for both). Record which; a split is a consistency defect.
- **Actual:** Blocked: the case compares the S supplier with a U supplier (no Void-unsupported supplier is in scope), so a split cannot be judged. The S-supplier half is recorded: V1 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 "PNR is required."; V2 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 "PNR is required."
- **Status:** BLOCKED
- **Evidence:** V1 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 "PNR is required." | V2 S supplier, pnr omitted: 400 NDC-INT-TEC-A0001 "PNR is required."

  - **Hop 1 &mdash; V1 Void (neg8):** PASS &mdash; 400 {"Status":400,"TransactionId":"07e66bdd-c868-45d1-ac64-8901f18c19a9","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"NotEmptyValidator","Value":"PNR is
  - **Hop 2 &mdash; V2 Void (neg8):** PASS &mdash; 400 {"Status":400,"TransactionId":"829ffaa7-fbde-439c-9ddb-970cfe182fda","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"NotEmptyValidator","Value":"PNR is

### TC-VOIDCAP-VAL-08 — FAIL

- **Test Case:** [Book][Response] Verify V1 and V2 Book return the identical voidCapability for the same supplier, offer and state.
- **Category:** Validation
- **Endpoint Name:** Book
- **Request:** Compare V1 and V2 Book voidCapability for the same supplier, fare and cabin
- **Response:** QR: V1 FullVoidOnlyAllowed / V2 FullVoidOnlyAllowed; AA: V1 VoidNotAllowed / V2 FullVoidOnlyAllowed; QR (lifecycle bookings): V1 FullVoidOnlyAllowed / V2 FullVoidOnlyAllowed
- **Expected:** Identical values for every supplier. A version-dependent value is a defect.
- **Actual:** Differs: AA differs
- **Status:** FAIL
- **Evidence:** QR: V1 FullVoidOnlyAllowed / V2 FullVoidOnlyAllowed | AA: V1 VoidNotAllowed / V2 FullVoidOnlyAllowed | QR (lifecycle bookings): V1 FullVoidOnlyAllowed / V2 FullVoidOnlyAllowed

  - **Hop 1 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr RPRBRK gdsPNR RPRBRK; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593245"]
  - **Hop 2 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr SFRZFJ gdsPNR SFRZFJ; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593255"]
  - **Hop 3 &mdash; V1 Book (mx-AA):** PASS &mdash; 200 - pnr SGZIEG gdsPNR SGZIEG; voidCapability=VoidNotAllowed; tickets ["0015763962831"]
  - **Hop 4 &mdash; V2 Book (mx-AA):** PASS &mdash; 200 - pnr RTCQRD gdsPNR RTCQRD; voidCapability=FullVoidOnlyAllowed; tickets ["0015763962832"]
  - **Hop 5 &mdash; V1 Book (life):** PASS &mdash; 200 - pnr RSRQTM gdsPNR RSRQTM; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593262"]
  - **Hop 6 &mdash; V2 Book (life):** PASS &mdash; 200 - pnr RVHWJT gdsPNR RVHWJT; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593263"]

### TC-VOIDCAP-VAL-09 — FAIL

- **Test Case:** [Book]&amp;[Retrieve]&amp;[BookAfterHold] [Response] Verify Book, Retrieve and BookAfterHold return the same voidCapability for the same booking state.
- **Category:** Validation
- **Endpoint Name:** Book / Retrieve / BookAfterHold
- **Request:** Book vs Retrieve, and BookAfterHold vs Retrieve, on one ticketed booking per version
- **Response:** V1: Book FullVoidOnlyAllowed vs Retrieve None; BookAfterHold None vs Retrieve None; V2: Book FullVoidOnlyAllowed vs Retrieve None; BookAfterHold None vs Retrieve None
- **Expected:** Same value in each pair. A flag that appears on Book and disappears on Retrieve is a defect.
- **Actual:** Mismatch: V1 Book FullVoidOnlyAllowed != Retrieve None; V2 Book FullVoidOnlyAllowed != Retrieve None
- **Status:** FAIL
- **Evidence:** V1: Book FullVoidOnlyAllowed vs Retrieve None; BookAfterHold None vs Retrieve None | V2: Book FullVoidOnlyAllowed vs Retrieve None; BookAfterHold None vs Retrieve None

  - **Hop 1 &mdash; V1 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (life):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (life):** PASS &mdash; 200 - pnr RSRQTM gdsPNR RSRQTM; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593262"]
  - **Hop 4 &mdash; V1 Retrieve (life):** PASS &mdash; voidCapability=None
  - **Hop 5 &mdash; V1 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593262","carrierCode":"QR"}]}
  - **Hop 6 &mdash; V1 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"375458b2-85e5-4cbd-99d1-bd2c9e6af2fc","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 7 &mdash; V1 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"c1746d1c-9cd7-4bc9-a0f7-e858a7ed8160","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr
  - **Hop 8 &mdash; V1 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 9 &mdash; V1 FareConfirm (hold):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 10 &mdash; V1 Hold (hold):** PASS &mdash; 200 - pnr RWWXMZ gdsPNR RWWXMZ; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 11 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 12 &mdash; V1 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 13 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 14 &mdash; V1 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593264:Booked
  - **Hop 15 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593264:Booked
  - **Hop 16 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593264","carrierCode":"QR"}]}
  - **Hop 17 &mdash; V2 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 18 &mdash; V2 FareConfirm (life):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 19 &mdash; V2 AddPassenger (life):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 20 &mdash; V2 Book (life):** PASS &mdash; 200 - pnr RVHWJT gdsPNR RVHWJT; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593263"]
  - **Hop 21 &mdash; V2 Retrieve (life):** PASS &mdash; voidCapability=None
  - **Hop 22 &mdash; V2 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593263","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 23 &mdash; V2 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"cfd723b2-032a-48b1-945e-35d9dd4e209b","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 24 &mdash; V2 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"6d809684-add6-42fc-8384-08288b4fee06","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr
  - **Hop 25 &mdash; V2 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 26 &mdash; V2 FareConfirm (hold):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 27 &mdash; V2 AddPassenger (hold):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 28 &mdash; V2 Hold (hold):** PASS &mdash; 200 - pnr TXQGZK gdsPNR TXQGZK; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 29 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 30 &mdash; V2 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 31 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 32 &mdash; V2 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593265:Booked
  - **Hop 33 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus Booked; tickets 1572141593265:Booked
  - **Hop 34 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593265","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-VOIDCAP-VAL-11 — PASS

- **Test Case:** [Retrieve][Response] Verify repeated Retrieve calls return a stable voidCapability.
- **Category:** Validation
- **Endpoint Name:** Retrieve
- **Request:** 5 Retrieve calls within about a minute, then one about 10 minutes later, on one ticketed V2 booking
- **Response:** values: None, None, None, None, None, None
- **Expected:** The same value every time while the state does not change. No flapping between present and absent.
- **Actual:** The value is the same on all 6 reads (no flapping between present and absent)
- **Status:** PASS
- **Evidence:** reads None | None | None | None | None | None | elapsed since first read 1166s. Note the stable value is "None", which VAL-03/VAL-09 judge separately.

  - **Hop 1 &mdash; V2 Search (stab):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V2 FareConfirm (stab):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 3 &mdash; V2 AddPassenger (stab):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 4 &mdash; V2 Book (stab):** PASS &mdash; 200 - pnr SHFMQW gdsPNR SHFMQW; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593235"]
  - **Hop 5 &mdash; V2 Retrieve (stab):** PASS &mdash; 200 - voidCapability=None
  - **Hop 6 &mdash; V2 Retrieve (stab):** PASS &mdash; 200 - voidCapability=None
  - **Hop 7 &mdash; V2 Retrieve (stab):** PASS &mdash; 200 - voidCapability=None
  - **Hop 8 &mdash; V2 Retrieve (stab):** PASS &mdash; 200 - voidCapability=None
  - **Hop 9 &mdash; V2 Retrieve (stab):** PASS &mdash; 200 - voidCapability=None
  - **Hop 10 &mdash; V2 Retrieve (stab-late):** PASS &mdash; 200 - voidCapability=None
  - **Hop 11 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593235","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-VOIDCAP-VAL-12 — FAIL

- **Test Case:** [Hold]&amp;[PnrReprice] [Response] Verify Hold and FareConfirmAfterHold (PnrReprice) return the same voidCapability for the same held booking.
- **Category:** Validation
- **Endpoint Name:** Hold / PnrReprice
- **Request:** Hold and FareConfirmAfterHold (PnrReprice) on the same held booking, V1 and V2
- **Response:** V1: Hold None, PnrReprice (absent); V2: Hold None, PnrReprice (absent)
- **Expected:** Same value on both (VoidNotAllowed expected, INFERRED). Both present, none absent.
- **Actual:** Mismatch/absent: V1 Hold None vs PnrReprice (absent); V2 Hold None vs PnrReprice (absent)
- **Status:** FAIL
- **Evidence:** V1: Hold None, PnrReprice (absent) | V2: Hold None, PnrReprice (absent)

  - **Hop 1 &mdash; V1 Hold (hold):** PASS &mdash; 200 - pnr RWWXMZ gdsPNR RWWXMZ; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 2 &mdash; V1 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 3 &mdash; V2 Hold (hold):** PASS &mdash; 200 - pnr TXQGZK gdsPNR TXQGZK; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 4 &mdash; V2 PnrReprice (hold):** PASS &mdash; 200 - voidCapability=(absent); tickets none

### TC-VOIDCAP-INT-01 — FAIL

- **Test Case:** [Book]&amp;[Retrieve]&amp;[Void] [Response] Verify the voidCapability lifecycle Book -&gt; Retrieve -&gt; Void -&gt; Retrieve on every Void-supported supplier.
- **Category:** Integration
- **Endpoint Name:** Book / Retrieve / Void
- **Request:** Book -&gt; Retrieve -&gt; Void -&gt; Retrieve with voidCapability recorded at every hop (V1 and V2)
- **Response:** V1: Book FullVoidOnlyAllowed -&gt; Retrieve None -&gt; Void 200 -&gt; Retrieve 400 ((absent)); V2: Book FullVoidOnlyAllowed -&gt; Retrieve None -&gt; Void 200 -&gt; Retrieve 400 ((absent))
- **Expected:** FullVoidOnlyAllowed before Void; Void 2xx; after Void either VoidNotAllowed or a terminal 409. Same lifecycle on every S supplier.
- **Actual:** Not as expected: V1 Retrieve before Void None; V1 Retrieve after Void 400 (expected VoidNotAllowed or terminal 409); V2 Retrieve before Void None; V2 Retrieve after Void 400 (expected VoidNotAllowed or terminal 409)
- **Status:** FAIL
- **Evidence:** V1: Book FullVoidOnlyAllowed -&gt; Retrieve None -&gt; Void 200 -&gt; Retrieve 400 ((absent)) | V2: Book FullVoidOnlyAllowed -&gt; Retrieve None -&gt; Void 200 -&gt; Retrieve 400 ((absent))

  - **Hop 1 &mdash; V1 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (life):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (life):** PASS &mdash; 200 - pnr RSRQTM gdsPNR RSRQTM; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593262"]
  - **Hop 4 &mdash; V1 Retrieve (life):** FAIL &mdash; voidCapability=None
  - **Hop 5 &mdash; V1 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593262","carrierCode":"QR"}]}
  - **Hop 6 &mdash; V1 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"375458b2-85e5-4cbd-99d1-bd2c9e6af2fc","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 7 &mdash; V1 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"c1746d1c-9cd7-4bc9-a0f7-e858a7ed8160","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr
  - **Hop 8 &mdash; V2 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 9 &mdash; V2 FareConfirm (life):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 10 &mdash; V2 AddPassenger (life):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 11 &mdash; V2 Book (life):** PASS &mdash; 200 - pnr RVHWJT gdsPNR RVHWJT; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593263"]
  - **Hop 12 &mdash; V2 Retrieve (life):** FAIL &mdash; voidCapability=None
  - **Hop 13 &mdash; V2 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593263","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 14 &mdash; V2 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"cfd723b2-032a-48b1-945e-35d9dd4e209b","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 15 &mdash; V2 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"6d809684-add6-42fc-8384-08288b4fee06","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr

### TC-VOIDCAP-INT-02 — FAIL

- **Test Case:** [Hold]&amp;[CancelAfterHold]&amp;[Retrieve] [Response] Verify the voidCapability of a held booking after CancelAfterHold.
- **Category:** Integration
- **Endpoint Name:** Retrieve
- **Request:** Hold -&gt; CancelAfterHold -&gt; Retrieve on V1 and V2
- **Response:** V1: after CancelAfterHold Retrieve 200, voidCapability None; V2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold
- **Expected:** A cancelled hold reports VoidNotAllowed or a terminal error; never FullVoidOnlyAllowed. Same behaviour across suppliers.
- **Actual:** Not as expected: V1 Retrieve 200 shows a live booking with voidCapability None (not VoidNotAllowed, not a terminal error); V2 Retrieve 200 shows OnHold with voidCapability None (not VoidNotAllowed, not a terminal error)
- **Status:** FAIL
- **Evidence:** V1: after CancelAfterHold Retrieve 200, voidCapability None | V2: after CancelAfterHold Retrieve 200, voidCapability None, bookingStatus OnHold

  - **Hop 1 &mdash; V1 Search (hc):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (hc):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (hc):** PASS &mdash; 200 - pnr SETDUJ gdsPNR SETDUJ; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 4 &mdash; V1 Void (hc):** PASS &mdash; 400 {"Status":400,"TransactionId":"64abf708-7668-4a25-88a1-71c4ee4ec776","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"Only fulfilled, ticketed orders c
  - **Hop 5 &mdash; V1 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None
  - **Hop 6 &mdash; V1 CancelAfterHold (hc):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 7 &mdash; V1 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None
  - **Hop 8 &mdash; V2 Search (hc):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 9 &mdash; V2 FareConfirm (hc):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 10 &mdash; V2 AddPassenger (hc):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 11 &mdash; V2 Hold (hc):** PASS &mdash; 200 - pnr RWEZQF gdsPNR RWEZQF; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 12 &mdash; V2 Void (hc):** PASS &mdash; 400 {"Status":400,"TransactionId":"df16c675-b2b6-4123-80a3-6ae117446f48","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"Only fulfilled, ticketed orders c
  - **Hop 13 &mdash; V2 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold
  - **Hop 14 &mdash; V2 CancelAfterHold (hc):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}
  - **Hop 15 &mdash; V2 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold

### TC-VOIDCAP-SEC-01 — FAIL

- **Test Case:** [Book]&amp;[Retrieve]&amp;[Void] [Request] Validate a missing or invalid x-api-key is rejected and no voidCapability is disclosed.
- **Category:** Security
- **Endpoint Name:** Book / Retrieve / Void
- **Request:** Book, Retrieve, Void with x-api-key omitted and then invalid (V1 and V2)
- **Response:** V1 Book no x-api-key: 401; V1 Book invalid x-api-key: 401; V1 Retrieve no x-api-key: 200; V1 Retrieve invalid x-api-key: 200; V1 Void no x-api-key: 401; V1 Void invalid x-api-key: 401; V2 Book no x-api-key: 401; V2 Book invalid x-api-key: 401; V2 Retrieve no x-api-key: 200; V2 Retrieve invalid x-api-key: 200; V2 Void no x-api-key: 401; V2 Void invalid x-api-key: 401
- **Expected:** 401 or 403 (exact status UNKNOWN, record it); no booking data and no voidCapability in the body; the booking is not voided.
- **Actual:** Problem: V1 Retrieve no x-api-key -&gt; 200 (data in body); V1 Retrieve invalid x-api-key -&gt; 200 (data in body); V2 Retrieve no x-api-key -&gt; 200 (data in body); V2 Retrieve invalid x-api-key -&gt; 200 (data in body)
- **Status:** FAIL
- **Evidence:** V1 Book no x-api-key: 401 | V1 Book invalid x-api-key: 401 | V1 Retrieve no x-api-key: 200 | V1 Retrieve invalid x-api-key: 200 | V1 Void no x-api-key: 401 | V1 Void invalid x-api-key: 401 | V2 Book no x-api-key: 401 | V2 Book invalid x-api-key: 401 | V2 Retrieve no x-api-key: 200 | V2 Retrieve invalid x-api-key: 200 | V2 Void no x-api-key: 401 | V2 Void invalid x-api-key: 401

  - **Hop 1 &mdash; V1 Search (sec):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (sec):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"c48f461c-147e-41ef-9675-08259c9299ee","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 4 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"f015bb8d-97ed-430d-814d-20c27f7438e2","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 5 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"dd9111ad-7aff-4876-9527-1cff3af8b928","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 6 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"ff314301-44c8-46a9-8d49-ae6cd78418b7","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 7 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"a7d46bdd-9513-476d-be4e-9cf7df750833","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 8 &mdash; V1 Book (sec):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"202
  - **Hop 9 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 10 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 11 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 12 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 13 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 14 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"
  - **Hop 15 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"3449227d-4853-41be-9a77-b4f64fdd8fcc","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 16 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"58be1ee2-1965-435f-b781-3af214da3648","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 17 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"fa848a69-3fb7-4b07-b8a0-041a36d01a53","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 18 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"9f8ab321-22f5-47ea-ae02-5c6a0c954be0","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 19 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"aa616511-abd9-4877-88f8-99c0ef02dd0f","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 20 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 tickets 1572141593266:Booked
  - **Hop 21 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593266","carrierCode":"QR"}]}
  - **Hop 22 &mdash; V2 Search (sec):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 23 &mdash; V2 FareConfirm (sec):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 24 &mdash; V2 AddPassenger (sec):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 25 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"d34ecc22-535e-4f5d-9877-61ecd94a2080","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 26 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"2cc41ad7-d80f-43ab-a4b1-29759af328a2","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 27 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"5498fb11-c4d8-4ba2-85a9-d17a33436f3a","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 28 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"a0b8e6c9-25fe-4d08-886d-b75da1ddbb57","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 29 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"35912a7f-69cd-4cdb-90cb-8caa5be47aea","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 30 &mdash; V2 Book (sec):** PASS &mdash; 200 {"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL4Z3F","voidCapability":"FullVoidOnlyAllowed","creationDate":"2026-11-04T00:00:0
  - **Hop 31 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 32 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 33 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 34 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 35 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 36 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,
  - **Hop 37 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"7463ac06-fbd2-4d39-a2e4-b460943a4548","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 38 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"ed21ccda-431a-4f80-b278-e997ccafc22b","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 39 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"b1511a2a-1e78-4f94-81d5-56979a0894ab","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 40 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"59c6ba59-64a0-4998-9032-340a7994af93","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 41 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"4a7fd7e5-be58-49ac-85f2-4f68a3a6f26b","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 42 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 tickets 1572141593267:Booked
  - **Hop 43 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593267","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-VOIDCAP-SEC-02 — FAIL

- **Test Case:** [Book]&amp;[Retrieve]&amp;[Void] [Request] Validate a missing or invalid Client-Id is rejected and no voidCapability is disclosed.
- **Category:** Security
- **Endpoint Name:** Book / Retrieve / Void
- **Request:** Book, Retrieve, Void with Client-Id omitted and then invalid, in both header casings (V1 and V2)
- **Response:** V1 Book no Client-Id: 401; V1 Book invalid Client-Id: 401; V1 Book invalid client-id (lower-case header): 401; V1 Retrieve no Client-Id: 200; V1 Retrieve invalid Client-Id: 200; V1 Retrieve invalid client-id (lower-case header): 200; V1 Void no Client-Id: 401; V1 Void invalid Client-Id: 401; V1 Void invalid client-id (lower-case header): 401; V1 valid Client-Id sent as lower-case header: 200; V2 Book no Client-Id: 401; V2 Book invalid Client-Id: 401; V2 Book invalid client-id (lower-case header): 401; V2 Retrieve no Client-Id: 200; V2 Retrieve invalid Client-Id: 200; V2 Retrieve invalid client-id (lower-case header): 200; V2 Void no Client-Id: 401; V2 Void invalid Client-Id: 401; V2 Void invalid client-id (lower-case header): 401; V2 valid Client-Id sent as lower-case header: 200
- **Expected:** Same rejection as SEC-01; nothing disclosed or voided.
- **Actual:** Problem: V1 Retrieve no Client-Id -&gt; 200 (data in body); V1 Retrieve invalid Client-Id -&gt; 200 (data in body); V1 Retrieve invalid client-id (lower-case header) -&gt; 200 (data in body); V2 Retrieve no Client-Id -&gt; 200 (data in body); V2 Retrieve invalid Client-Id -&gt; 200 (data in body); V2 Retrieve invalid client-id (lower-case header) -&gt; 200 (data in body)
- **Status:** FAIL
- **Evidence:** V1 Book no Client-Id: 401 | V1 Book invalid Client-Id: 401 | V1 Book invalid client-id (lower-case header): 401 | V1 Retrieve no Client-Id: 200 | V1 Retrieve invalid Client-Id: 200 | V1 Retrieve invalid client-id (lower-case header): 200 | V1 Void no Client-Id: 401 | V1 Void invalid Client-Id: 401 | V1 Void invalid client-id (lower-case header): 401 | V1 valid Client-Id sent as lower-case header: 200 | V2 Book no Client-Id: 401 | V2 Book invalid Client-Id: 401 | V2 Book invalid client-id (lower-case header): 401 | V2 Retrieve no Client-Id: 200 | V2 Retrieve invalid Client-Id: 200 | V2 Retrieve invalid client-id (lower-case header): 200 | V2 Void no Client-Id: 401 | V2 Void invalid Client-Id: 401 | V2 Void invalid client-id (lower-case header): 401 | V2 valid Client-Id sent as lower-case header: 200

  - **Hop 1 &mdash; V1 Search (sec):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (sec):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"c48f461c-147e-41ef-9675-08259c9299ee","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 4 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"f015bb8d-97ed-430d-814d-20c27f7438e2","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 5 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"dd9111ad-7aff-4876-9527-1cff3af8b928","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 6 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"ff314301-44c8-46a9-8d49-ae6cd78418b7","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 7 &mdash; V1 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"a7d46bdd-9513-476d-be4e-9cf7df750833","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 8 &mdash; V1 Book (sec):** PASS &mdash; 200 {"voidCapability":"FullVoidOnlyAllowed","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"202
  - **Hop 9 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 10 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 11 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 12 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 13 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"QR"}},"creationDate":"2026-11-04T00:00:00","ticketingDate":"2026-11-04T00:00:00"
  - **Hop 14 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 {"voidCapability":"None","tickets":{"Passenger1":{"ticketStatus":"Booked","ticketNumber":"1572141593266","carrierCode":"
  - **Hop 15 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"3449227d-4853-41be-9a77-b4f64fdd8fcc","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 16 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"58be1ee2-1965-435f-b781-3af214da3648","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 17 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"fa848a69-3fb7-4b07-b8a0-041a36d01a53","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 18 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"9f8ab321-22f5-47ea-ae02-5c6a0c954be0","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 19 &mdash; V1 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"aa616511-abd9-4877-88f8-99c0ef02dd0f","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 20 &mdash; V1 Retrieve (sec):** PASS &mdash; 200 tickets 1572141593266:Booked
  - **Hop 21 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593266","carrierCode":"QR"}]}
  - **Hop 22 &mdash; V2 Search (sec):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 23 &mdash; V2 FareConfirm (sec):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 24 &mdash; V2 AddPassenger (sec):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 25 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"d34ecc22-535e-4f5d-9877-61ecd94a2080","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 26 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"2cc41ad7-d80f-43ab-a4b1-29759af328a2","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 27 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"5498fb11-c4d8-4ba2-85a9-d17a33436f3a","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 28 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"a0b8e6c9-25fe-4d08-886d-b75da1ddbb57","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 29 &mdash; V2 Book (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"35912a7f-69cd-4cdb-90cb-8caa5be47aea","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 30 &mdash; V2 Book (sec):** PASS &mdash; 200 {"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL4Z3F","voidCapability":"FullVoidOnlyAllowed","creationDate":"2026-11-04T00:00:0
  - **Hop 31 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 32 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 33 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 34 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 35 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,"supplier":"SabreNdc","pnr":"TQRZVX","gdsPNR":"TQRZVX","bookingToken":"1SXXXC9EL
  - **Hop 36 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 {"fareType":"Published","bookedCredentialsSelector":"EGY","holdExpirationDate":null,"bookingStatus":"Booked","pcc":null,
  - **Hop 37 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"7463ac06-fbd2-4d39-a2e4-b460943a4548","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 38 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"ed21ccda-431a-4f80-b278-e997ccafc22b","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 39 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"b1511a2a-1e78-4f94-81d5-56979a0894ab","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 40 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"59c6ba59-64a0-4998-9032-340a7994af93","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 41 &mdash; V2 Void (sec):** PASS &mdash; 401 {"Status":401,"TransactionId":"4a7fd7e5-be58-49ac-85f2-4f68a3a6f26b","ErrorCode":"AuthenticationError","ErrorMessage":"Authentication error. Please check your credentials.","Context":[{"Name":"Authent
  - **Hop 42 &mdash; V2 Retrieve (sec):** PASS &mdash; 200 tickets 1572141593267:Booked
  - **Hop 43 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593267","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-VOIDCAP-SEC-03 — BLOCKED

- **Test Case:** [Retrieve]&amp;[Void] [Request] Validate a booking created under one supplier/credentialsSelector cannot be read or voided under another.
- **Category:** Security
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - its core step sends a SabreNdc booking's ids to TravelportNdc/UAE, which is out of scope for this run (the only other SabreNdc selectors, KSA and UAE, are inactive: see NEG-06)
- **Response:** No request sent
- **Expected:** Both calls rejected (status UNKNOWN, record it) without disclosing voidCapability or ticket data; original booking still ticketed. Another supplier's credentials never act on the PNR.
- **Actual:** Blocked: its core step sends a SabreNdc booking's ids to TravelportNdc/UAE, which is out of scope for this run (the only other SabreNdc selectors, KSA and UAE, are inactive: see NEG-06)
- **Status:** BLOCKED
- **Evidence:** its core step sends a SabreNdc booking's ids to TravelportNdc/UAE, which is out of scope for this run (the only other SabreNdc selectors, KSA and UAE, are inactive: see NEG-06)

### TC-VOIDCAP-SEC-04 — PASS

- **Test Case:** [Book]&amp;[Void] [Request] Validate a voidCapability value sent in the request body is ignored.
- **Category:** Security
- **Endpoint Name:** Book / Void
- **Request:** Book and Void bodies with an extra "voidCapability":"VoidNotAllowed" field (SabreNdc, V1 and V2)
- **Response:** V1: Book body with "voidCapability":"VoidNotAllowed" -&gt; 200, flag FullVoidOnlyAllowed; Void body with the same extra field -&gt; 200 voided; V2: Book body with "voidCapability":"VoidNotAllowed" -&gt; 200, flag FullVoidOnlyAllowed; Void body with the same extra field -&gt; 200 voided
- **Expected:** Responses identical to the calls without the field: the flag is derived by the server, not accepted from the client; the U-supplier Void is still refused.
- **Actual:** The extra field is ignored: flag is still FullVoidOnlyAllowed and Void still works
- **Status:** PASS
- **Evidence:** V1: Book body with "voidCapability":"VoidNotAllowed" -&gt; 200, flag FullVoidOnlyAllowed; Void body with the same extra field -&gt; 200 voided | V2: Book body with "voidCapability":"VoidNotAllowed" -&gt; 200, flag FullVoidOnlyAllowed; Void body with the same extra field -&gt; 200 voided | The Void-unsupported-supplier leg of this case was not run (no U supplier in scope); the S-supplier legs show the server derives the flag itself.

  - **Hop 1 &mdash; V1 Search (sec4):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (sec4):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (sec4):** PASS &mdash; 200 - pnr TSOOGO gdsPNR TSOOGO; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593268"]
  - **Hop 4 &mdash; V1 Void (sec4):** PASS &mdash; 200
  - **Hop 5 &mdash; V2 Search (sec4):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 6 &mdash; V2 FareConfirm (sec4):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger (sec4):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Book (sec4):** PASS &mdash; 200 - pnr TXSSCT gdsPNR TXSSCT; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593269"]
  - **Hop 9 &mdash; V2 Void (sec4):** PASS &mdash; 200

### TC-VOIDCAP-SEC-05 — BLOCKED

- **Test Case:** [Void][Request] Validate injection payloads in surName on a Void-unsupported supplier are not reflected and do not change the outcome.
- **Category:** Security
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - it needs a Void-unsupported supplier so that no booking is consumed; none is in scope
- **Response:** No request sent
- **Expected:** The same 409 OperationNotSupported as for a clean surName, with the payload not echoed back and no 5xx.
- **Actual:** Blocked: it needs a Void-unsupported supplier so that no booking is consumed; none is in scope
- **Status:** BLOCKED
- **Evidence:** it needs a Void-unsupported supplier so that no booking is consumed; none is in scope

### TC-VOIDCAP-REG-01 — PASS

- **Test Case:** [SabreNdc][Void][Response] Verify the SabreNdc Void success contract is unchanged by the unified mapping.
- **Category:** Regression
- **Endpoint Name:** Void
- **Request:** Void success shape on V1 and V2 compared with the 2026-10-25 baseline capture
- **Response:** V1: 9.1s, voided=true, keys voided,voidedTickets, shape diff vs 2026-10-25 baseline: Status: number -&gt; undefined; TransactionId: string -&gt; undefined; ErrorCode: string -&gt; undefined; ErrorMessage: string -&gt; undefined; Context: array -&gt; undefined; voided: undefined -&gt; boolean; voidedTickets: undefined -&gt; array; voidedTickets[].ticketStatus: undefined -&gt; string; voidedTickets[].ticketNumber: undefined -&gt; string; voidedTickets[].carrierCode: undefined -&gt; string; V2: 9.2s, voided=true, keys voided,voidedTickets,passengersVoidedAncillaries,emdTickets, shape diff vs 2026-10-25 baseline: Status: number -&gt; undefined; TransactionId: string -&gt; undefined; ErrorCode: string -&gt; undefined; ErrorMessage: string -&gt; undefined; Context: array -&gt; undefined; voided: undefined -&gt; boolean; voidedTickets: undefined -&gt; array; passengersVoidedAncillaries: undefined -&gt; object; emdTickets: undefined -&gt; object; voidedTickets[].ticketStatus: undefined -&gt; string; voidedTickets[].ticketNumber: undefined -&gt; string; voidedTickets[].carrierCode: undefined -&gt; string
- **Expected:** Same keys and types as the baseline; Void still takes about 10 s; voided=true.
- **Actual:** Same keys and types as the 2026-10-25 baseline on V1 and V2 (checked across all 66 successful Voids of this run); voided=true; median about 10 s (V1 9.9 s, V2 9.7 s)
- **Status:** PASS
- **Evidence:** V1: keys voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]; V2: adds passengersVoidedAncillaries {} and emdTickets {}. Shape diff vs baseline: none on 32 V1 and 34 V2 Voids. (First-pass verdict FAIL was a comparison against an error-response file; corrected after re-checking.) Note: a Void on a V1 AA booking returned 200 with voided=false in 2 cases, see BIZ-01.

  - **Hop 1 &mdash; V1 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593262","carrierCode":"QR"}]}
  - **Hop 2 &mdash; V2 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593263","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### TC-VOIDCAP-REG-02 — BLOCKED

- **Test Case:** [TravelportNdc][Void][Response] Verify the TravelportNdc Void success contract is unchanged by the unified mapping.
- **Category:** Regression
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - TravelportNdc is out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** Same shape as the baseline, V1 and V2 behave identically.
- **Actual:** Blocked: TravelportNdc is out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** TravelportNdc is out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-REG-03 — PASS

- **Test Case:** [Book][Response] Verify the only change in the Book response schema of each supplier is the voidCapability normalisation.
- **Category:** Regression
- **Endpoint Name:** Book
- **Request:** Book response schema diff against the last saved SabreNdc Book of 2026-10-25 plus price reconciliation (V1 and V2)
- **Response:** V1: shape diff vs 2026-10-25 Book baseline: none; price check OK: all checks hold; total 12882.8 EGP; V2: shape diff vs 2026-10-25 Book baseline: none; price check OK: all checks hold; total 12882.8 EGP
- **Expected:** No field added, removed, renamed or retyped other than voidCapability. Price reconciliation passes exactly as before (known baseline defects aside).
- **Actual:** No field added, removed, renamed or retyped other than voidCapability; price reconciliation as before
- **Status:** PASS
- **Evidence:** V1: shape diff vs 2026-10-25 Book baseline: none; price check OK: all checks hold; total 12882.8 EGP | V2: shape diff vs 2026-10-25 Book baseline: none; price check OK: all checks hold; total 12882.8 EGP

  - **Hop 1 &mdash; V1 Book (mx-QR):** PASS &mdash; 200 - pnr RPRBRK gdsPNR RPRBRK; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593245"]
  - **Hop 2 &mdash; V2 Book (mx-QR):** PASS &mdash; 200 - pnr SFRZFJ gdsPNR SFRZFJ; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593255"]

### TC-VOIDCAP-REG-04 — PASS

- **Test Case:** [Retrieve][Response] Verify the Retrieve response schema of each supplier is unchanged apart from voidCapability.
- **Category:** Regression
- **Endpoint Name:** Retrieve
- **Request:** Retrieve schema diff (ticketed and held) against the 2026-10-25 baseline, V1 and V2
- **Response:** V1 ticketed: voidCapability: absent -&gt; string; V1 held: voidCapability: absent -&gt; string; journeys.*: absent -&gt; object; journeys.*.origin: absent -&gt; string; journeys.*.destination: absent -&gt; string; journeys.*.numberOfStops: absent -&gt; number; journeys.*.segmentRefIds: absent -&gt; array; journeys.*.segmentRefIds[]: absent -&gt; string; flightSegments.*: absent -&gt; object; flightSegments.*.origin: absent -&gt; string; flightSegments.*.destination: absent -&gt; string; flightSegments.*.departureDateTime: absent -&gt; string; flightSegments.*.arrivalDateTime: absent -&gt; string; flightSegments.*.departureTerminal: absent -&gt; string; flightSegments.*.flightTime: absent -&gt; number; flightSegments.*.operatingCarrierCode: absent -&gt; string; flightSegments.*.operatingFlightNumber: absent -&gt; string; flightSegments.*.marketingCarrierCode: absent -&gt; string; flightSegments.*.marketingFlightNumber: absent -&gt; string; flightSegments.*.equipment: absent -&gt; string; priceClasses.*: absent -&gt; object; priceClasses.*.priceClassName: absent -&gt; string; priceClasses.*.fareDescription: absent -&gt; string; priceClasses.*.rulesAndPenalties: absent -&gt; array; baggageDetails.*: absent -&gt; object; baggageDetails.*.carryOnBaggage: absent -&gt; string; baggageDetails.*.checkInBaggage: absent -&gt; string; selectedOffer.offerJourneys[]: absent -&gt; string; selectedOffer.passengerFareBreakdown[]: absent -&gt; object; selectedOffer.passengerFareBreakdown[].passengerTypeCode: absent -&gt; string; selectedOffer.passengerFareBreakdown[].paxTotalTaxAmount: absent -&gt; object; selectedOffer.passengerFareBreakdown[].paxTotalTaxAmount.amount: absent -&gt; number; selectedOffer.passengerFareBreakdown[].paxTotalTaxAmount.currency: absent -&gt; string; selectedOffer.passengerFareBreakdown[].paxBaseAmount: absent -&gt; object; selectedOffer.passengerFareBreakdown[].paxBaseAmount.amount: absent -&gt; number; selectedOffer.passengerFareBreakdown[].paxBaseAmount.currency: absent -&gt; string; selectedOffer.passengerFareBreakdown[].taxesAndFees: absent -&gt; array; selectedOffer.passengerFareBreakdown[].taxesAndFees[]: absent -&gt; object; selectedOffer.passengerFareBreakdown[].taxesAndFees[].code: absent -&gt; string; selectedOffer.passengerFareBreakdown[].taxesAndFees[].amount: absent -&gt; object; selectedOffer.passengerFareBreakdown[].segmentDetails: absent -&gt; array; selectedOffer.passengerFareBreakdown[].segmentDetails[]: absent -&gt; object; selectedOffer.passengerFareBreakdown[].segmentDetails[].segmentRefId: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].priceClassRefId: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].baggageDetailsRefId: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].cabinCode: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].rbd: absent -&gt; string; selectedOffer.priceDetails.taxesAndFees[]: absent -&gt; object; selectedOffer.priceDetails.taxesAndFees[].code: absent -&gt; string; selectedOffer.priceDetails.taxesAndFees[].amount: absent -&gt; object; selectedOffer.priceDetails.taxesAndFees[].amount.amount: absent -&gt; number; selectedOffer.priceDetails.taxesAndFees[].amount.currency: absent -&gt; string; V2 ticketed: voidCapability: absent -&gt; string; V2 held: voidCapability: absent -&gt; string; journeys.*: absent -&gt; object; journeys.*.origin: absent -&gt; string; journeys.*.destination: absent -&gt; string; journeys.*.numberOfStops: absent -&gt; number; journeys.*.segmentRefIds: absent -&gt; array; journeys.*.segmentRefIds[]: absent -&gt; string; flightSegments.*: absent -&gt; object; flightSegments.*.origin: absent -&gt; string; flightSegments.*.destination: absent -&gt; string; flightSegments.*.departureDateTime: absent -&gt; string; flightSegments.*.arrivalDateTime: absent -&gt; string; flightSegments.*.departureTerminal: absent -&gt; string; flightSegments.*.flightTime: absent -&gt; number; flightSegments.*.operatingCarrierCode: absent -&gt; string; flightSegments.*.operatingFlightNumber: absent -&gt; string; flightSegments.*.marketingCarrierCode: absent -&gt; string; flightSegments.*.marketingFlightNumber: absent -&gt; string; flightSegments.*.equipment: absent -&gt; string; priceClasses.*: absent -&gt; object; priceClasses.*.priceClassName: absent -&gt; string; priceClasses.*.fareDescription: absent -&gt; string; priceClasses.*.rulesAndPenalties: absent -&gt; array; baggageDetails.*: absent -&gt; object; baggageDetails.*.carryOnBaggage: absent -&gt; string; baggageDetails.*.checkInBaggage: absent -&gt; string; selectedOffer.offerJourneys[]: absent -&gt; string; selectedOffer.passengerFareBreakdown[]: absent -&gt; object; selectedOffer.passengerFareBreakdown[].passengerRefId: absent -&gt; string; selectedOffer.passengerFareBreakdown[].paxTotalAmount: absent -&gt; object; selectedOffer.passengerFareBreakdown[].paxTotalAmount.amount: absent -&gt; number; selectedOffer.passengerFareBreakdown[].paxTotalAmount.currency: absent -&gt; string; selectedOffer.passengerFareBreakdown[].passengerTypeCode: absent -&gt; string; selectedOffer.passengerFareBreakdown[].paxTotalTaxAmount: absent -&gt; object; selectedOffer.passengerFareBreakdown[].paxTotalTaxAmount.amount: absent -&gt; number; selectedOffer.passengerFareBreakdown[].paxTotalTaxAmount.currency: absent -&gt; string; selectedOffer.passengerFareBreakdown[].paxBaseAmount: absent -&gt; object; selectedOffer.passengerFareBreakdown[].paxBaseAmount.amount: absent -&gt; number; selectedOffer.passengerFareBreakdown[].paxBaseAmount.currency: absent -&gt; string; selectedOffer.passengerFareBreakdown[].taxesAndFees: absent -&gt; array; selectedOffer.passengerFareBreakdown[].taxesAndFees[]: absent -&gt; object; selectedOffer.passengerFareBreakdown[].taxesAndFees[].code: absent -&gt; string; selectedOffer.passengerFareBreakdown[].taxesAndFees[].amount: absent -&gt; object; selectedOffer.passengerFareBreakdown[].segmentDetails: absent -&gt; array; selectedOffer.passengerFareBreakdown[].segmentDetails[]: absent -&gt; object; selectedOffer.passengerFareBreakdown[].segmentDetails[].segmentRefId: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].priceClassRefId: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].baggageDetailsRefId: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].cabinCode: absent -&gt; string; selectedOffer.passengerFareBreakdown[].segmentDetails[].rbd: absent -&gt; string; selectedOffer.priceDetails.taxesAndFees[]: absent -&gt; object; selectedOffer.priceDetails.taxesAndFees[].code: absent -&gt; string; selectedOffer.priceDetails.taxesAndFees[].amount: absent -&gt; object; selectedOffer.priceDetails.taxesAndFees[].amount.amount: absent -&gt; number; selectedOffer.priceDetails.taxesAndFees[].amount.currency: absent -&gt; string
- **Expected:** Same fields and types; bookingStatus, tickets, passengersList, selectedOffer unchanged.
- **Actual:** Retrieve schema unchanged on V1 and V2 for ticketed and held bookings; the only difference from the 2026-10-25 baseline is the new voidCapability field
- **Status:** PASS
- **Evidence:** ticketed V1: voidCapability absent -&gt; string; ticketed V2: voidCapability absent -&gt; string; held V1: voidCapability absent -&gt; string; held V2: voidCapability absent -&gt; string. (First-pass verdict FAIL compared against a cancelled-hold stub; corrected after re-checking with a real held baseline.)

  - **Hop 1 &mdash; V1 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593245:Booked
  - **Hop 2 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 3 &mdash; V2 Retrieve (mx-QR):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593255:Booked
  - **Hop 4 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none

### TC-VOIDCAP-REG-05 — PASS

- **Test Case:** [Hold]&amp;[PnrReprice]&amp;[BookAfterHold]&amp;[CancelAfterHold] [Response] Verify the Hold branch of Hold-capable suppliers behaves as before.
- **Category:** Regression
- **Endpoint Name:** Hold / PnrReprice / BookAfterHold / CancelAfterHold
- **Request:** Hold -&gt; PnrReprice -&gt; BookAfterHold and Hold -&gt; CancelAfterHold on V1 and V2
- **Response:** V1: same pnr after BookAfterHold true; holdExpirationDate 2026-11-09T21:59:00; hold price 12882.8 -&gt; ticketed price 12882.8; CancelAfterHold 200 cancelled=true; V2: same pnr after BookAfterHold true; holdExpirationDate 2026-11-09T21:59:00+02:00; hold price 12882.8 -&gt; ticketed price 12882.8; CancelAfterHold 200 cancelled=true
- **Expected:** Same results as the baseline suites: same-PNR invariant holds; holdExpirationDate present; CancelAfterHold succeeds.
- **Actual:** Same-PNR invariant holds, holdExpirationDate present, price unchanged, CancelAfterHold succeeds
- **Status:** PASS
- **Evidence:** V1: same pnr after BookAfterHold true; holdExpirationDate 2026-11-09T21:59:00; hold price 12882.8 -&gt; ticketed price 12882.8; CancelAfterHold 200 cancelled=true | V2: same pnr after BookAfterHold true; holdExpirationDate 2026-11-09T21:59:00+02:00; hold price 12882.8 -&gt; ticketed price 12882.8; CancelAfterHold 200 cancelled=true

  - **Hop 1 &mdash; V1 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (hold):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (hold):** PASS &mdash; 200 - pnr RWWXMZ gdsPNR RWWXMZ; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 4 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 5 &mdash; V1 PnrReprice (hold):** FAIL &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 6 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 7 &mdash; V1 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593264:Booked
  - **Hop 8 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593264:Booked
  - **Hop 9 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593264","carrierCode":"QR"}]}
  - **Hop 10 &mdash; V1 Search (hc):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 11 &mdash; V1 FareConfirm (hc):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 12 &mdash; V1 Hold (hc):** PASS &mdash; 200 - pnr SETDUJ gdsPNR SETDUJ; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 13 &mdash; V1 Void (hc):** PASS &mdash; 400 {"Status":400,"TransactionId":"64abf708-7668-4a25-88a1-71c4ee4ec776","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"Only fulfilled, ticketed orders c
  - **Hop 14 &mdash; V1 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None
  - **Hop 15 &mdash; V1 CancelAfterHold (hc):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled"}
  - **Hop 16 &mdash; V1 Retrieve (hc):** FAIL &mdash; 200 - voidCapability=None
  - **Hop 17 &mdash; V2 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 18 &mdash; V2 FareConfirm (hold):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 19 &mdash; V2 AddPassenger (hold):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 20 &mdash; V2 Hold (hold):** PASS &mdash; 200 - pnr TXQGZK gdsPNR TXQGZK; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 21 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 22 &mdash; V2 PnrReprice (hold):** FAIL &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 23 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 24 &mdash; V2 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593265:Booked
  - **Hop 25 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus Booked; tickets 1572141593265:Booked
  - **Hop 26 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593265","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 27 &mdash; V2 Search (hc):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 28 &mdash; V2 FareConfirm (hc):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 29 &mdash; V2 AddPassenger (hc):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 30 &mdash; V2 Hold (hc):** PASS &mdash; 200 - pnr RWEZQF gdsPNR RWEZQF; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 31 &mdash; V2 Void (hc):** PASS &mdash; 400 {"Status":400,"TransactionId":"df16c675-b2b6-4123-80a3-6ae117446f48","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"Only fulfilled, ticketed orders c
  - **Hop 32 &mdash; V2 Retrieve (hc):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold
  - **Hop 33 &mdash; V2 CancelAfterHold (hc):** PASS &mdash; 200 {"cancelled":true,"message":"Held Order Is Cancelled","passengersCancelledAncillaries":null}
  - **Hop 34 &mdash; V2 Retrieve (hc):** FAIL &mdash; 200 - voidCapability=None; bookingStatus OnHold

### TC-VOIDCAP-REG-06 — PASS

- **Test Case:** [Search]&amp;[FareConfirm] [Response] Verify the offer-level capability flags (canBeHeld, haveBundles, offerHasAncillary, offerHasSeat) are unchanged.
- **Category:** Regression
- **Endpoint Name:** Search / FareConfirm
- **Request:** Offer-level capability flags on Search and FareConfirm (V1 and V2)
- **Response:** V1 Search: canBeHeld 4/4, haveBundles 0/4, offerHasAncillary 0/4, offerHasSeat 0/4; FareConfirm selectedOffer: canBeHeld=true haveBundles=false; V2 Search: canBeHeld 4/4, haveBundles 0/4, offerHasAncillary 0/4, offerHasSeat 0/4; FareConfirm selectedOffer: canBeHeld=true haveBundles=false
- **Expected:** Same flag values per supplier (SabreNdc all canBeHeld; TravelportNdc canBeHeld all true and haveBundles false; AirIndia haveBundles true and canBeHeld false).
- **Actual:** Same flags as the baseline: every offer canBeHeld, no bundles, no ancillary, no seats
- **Status:** PASS
- **Evidence:** V1 Search: canBeHeld 4/4, haveBundles 0/4, offerHasAncillary 0/4, offerHasSeat 0/4; FareConfirm selectedOffer: canBeHeld=true haveBundles=false | V2 Search: canBeHeld 4/4, haveBundles 0/4, offerHasAncillary 0/4, offerHasSeat 0/4; FareConfirm selectedOffer: canBeHeld=true haveBundles=false

  - **Hop 1 &mdash; V1 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (mx-QR):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V2 Search (mx-QR):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 4 &mdash; V2 FareConfirm (mx-QR):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false

### TC-VOIDCAP-REG-07 — BLOCKED

- **Test Case:** [AirIndia][Response] Verify every other unsupported AirIndia operation still returns 409 OperationNotSupported after the change.
- **Category:** Regression
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - AirIndia is out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** 409 OperationNotSupported for each, uniform with the Void refusal from TC-VOIDCAP-NEG-02. Nothing created or changed.
- **Actual:** Blocked: AirIndia is out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** AirIndia is out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-REG-08 — BLOCKED

- **Test Case:** [FlyAdeal]&amp;[GulfAir] [Response] Verify existing supplier-specific flows (FlyAdeal bundle, GulfAir SeatMap) still book and price correctly.
- **Category:** Regression
- **Endpoint Name:** VOIDCAP
- **Request:** Not sent - FlyAdeal and GulfAir are out of scope for this run (SabreNdc/EGY only)
- **Response:** No request sent
- **Expected:** Same results as the earlier FlyAdeal bundle and GulfAir SeatMap suites; voidCapability present with a unified value.
- **Actual:** Blocked: FlyAdeal and GulfAir are out of scope for this run (SabreNdc/EGY only)
- **Status:** BLOCKED
- **Evidence:** FlyAdeal and GulfAir are out of scope for this run (SabreNdc/EGY only)

### TC-VOIDCAP-REG-10 — PASS

- **Test Case:** [Book][Request] Verify existing clients keep working: the Book and Void request contracts are unchanged and no new field is required.
- **Category:** Regression
- **Endpoint Name:** Book / Void
- **Request:** Replay the unchanged Book and Void request shapes from the earlier SabreNdc suites (fresh ids; V2 Void with gdsPNR "" and voidTickets [])
- **Response:** V1: Book 200 with the saved request shape; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided; V2: Book 200 with the saved request shape; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided
- **Expected:** HTTP 200 as before for Book and, on S suppliers, Void; no new required field, no change in the required-field validation messages.
- **Actual:** HTTP 200 as before, no new required field
- **Status:** PASS
- **Evidence:** V1: Book 200 with the saved request shape; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided | V2: Book 200 with the saved request shape; Void with gdsPNR "" and voidTickets [] -&gt; 200 voided | Ids and dates in saved bodies are stale by design, so the same request shapes were rebuilt with fresh ids.

  - **Hop 1 &mdash; V1 Search (reg10):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (reg10):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (reg10):** PASS &mdash; 200 - pnr TPPHLJ gdsPNR TPPHLJ; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593270"]
  - **Hop 4 &mdash; V1 Void (reg10):** PASS &mdash; 200
  - **Hop 5 &mdash; V2 Search (reg10):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 6 &mdash; V2 FareConfirm (reg10):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 7 &mdash; V2 AddPassenger (reg10):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 8 &mdash; V2 Book (reg10):** PASS &mdash; 200 - pnr TQQNQE gdsPNR TQQNQE; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593271"]
  - **Hop 9 &mdash; V2 Void (reg10):** PASS &mdash; 200

### FLOW-V1-03-VOIDCAP — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #3 completes with a consistent voidCapability for every Void-supported supplier.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #3 (Book, Retrieve, Void)
- **Request:** Search -&gt; FareConfirm -&gt; Book -&gt; Retrieve -&gt; Void -&gt; Retrieve (V1, SabreNdc/EGY, CAI-JED)
- **Response:** Book FullVoidOnlyAllowed; Retrieve None; Void 200 voided; final Retrieve 400
- **Expected:** Every hop 2xx; Book and Retrieve return the same FullVoidOnlyAllowed; Void succeeds; final Retrieve shows the voided state.
- **Actual:** Not as expected: Retrieve None != Book FullVoidOnlyAllowed; final Retrieve 400 is not a voided state (409 / VoidNotAllowed)
- **Status:** FAIL
- **Evidence:** Book FullVoidOnlyAllowed; Retrieve None; Void 200 voided; final Retrieve 400

  - **Hop 1 &mdash; V1 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (life):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Book (life):** PASS &mdash; 200 - pnr RSRQTM gdsPNR RSRQTM; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593262"]
  - **Hop 4 &mdash; V1 Retrieve (life):** FAIL &mdash; voidCapability=None
  - **Hop 5 &mdash; V1 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593262","carrierCode":"QR"}]}
  - **Hop 6 &mdash; V1 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"375458b2-85e5-4cbd-99d1-bd2c9e6af2fc","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 7 &mdash; V1 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"c1746d1c-9cd7-4bc9-a0f7-e858a7ed8160","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr

### FLOW-V1-05-VOIDCAP — FAIL

- **Test Case:** [Hold]&amp;[FareConfirmAfterHold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify Family-E flow #5 maps VoidNotAllowed at Hold and FullVoidOnlyAllowed after BookAfterHold for every Hold-capable S supplier.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #5 (Hold, BookAfterHold, Void)
- **Request:** Search -&gt; FareConfirm -&gt; Hold -&gt; PnrReprice -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void (V1)
- **Response:** Hold None; PnrReprice (absent); BookAfterHold None; Retrieve None; same ids true; Void 200
- **Expected:** Hold and PnrReprice: VoidNotAllowed. BookAfterHold and the next Retrieve: FullVoidOnlyAllowed. pnr, gdsPNR, bookingToken unchanged; Void succeeds.
- **Actual:** Not as expected: Hold None; PnrReprice (absent); BookAfterHold None; Retrieve after BAH None
- **Status:** FAIL
- **Evidence:** Hold None; PnrReprice (absent); BookAfterHold None; Retrieve None; same ids true; Void 200

  - **Hop 1 &mdash; V1 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V1 FareConfirm (hold):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=undefined isSeatMapRequired=undefined
  - **Hop 3 &mdash; V1 Hold (hold):** PASS &mdash; 200 - pnr RWWXMZ gdsPNR RWWXMZ; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00
  - **Hop 4 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 5 &mdash; V1 PnrReprice (hold):** FAIL &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 6 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets none
  - **Hop 7 &mdash; V1 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593264:Booked
  - **Hop 8 &mdash; V1 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593264:Booked
  - **Hop 9 &mdash; V1 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593264","carrierCode":"QR"}]}

### FLOW-V2-27-VOIDCAP — FAIL

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify V2 Family-C flow #27 completes with a consistent voidCapability for every Void-supported supplier.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #27 (Book, Retrieve, Void)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Book -&gt; Retrieve -&gt; Void -&gt; Retrieve (V2, SabreNdc/EGY, CAI-JED)
- **Response:** Book FullVoidOnlyAllowed; Retrieve None; Void 200 voided; final Retrieve 400
- **Expected:** Same expectations as FLOW-V1-03-VOIDCAP; V2 Void returns passengersVoidedAncillaries and emdTickets; voidCapability identical to the V1 flow for the same supplier.
- **Actual:** Not as expected: Retrieve None != Book FullVoidOnlyAllowed; final Retrieve 400 is not a voided state (409 / VoidNotAllowed)
- **Status:** FAIL
- **Evidence:** Book FullVoidOnlyAllowed; Retrieve None; Void 200 voided; final Retrieve 400

  - **Hop 1 &mdash; V2 Search (life):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V2 FareConfirm (life):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 3 &mdash; V2 AddPassenger (life):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 4 &mdash; V2 Book (life):** PASS &mdash; 200 - pnr RVHWJT gdsPNR RVHWJT; voidCapability=FullVoidOnlyAllowed; tickets ["1572141593263"]
  - **Hop 5 &mdash; V2 Retrieve (life):** FAIL &mdash; voidCapability=None
  - **Hop 6 &mdash; V2 Void (life):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593263","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}
  - **Hop 7 &mdash; V2 Retrieve (life):** PASS &mdash; 400 {"Status":400,"TransactionId":"cfd723b2-032a-48b1-945e-35d9dd4e209b","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Value":"This Trip Is 
  - **Hop 8 &mdash; V2 Void (life):** PASS &mdash; 409 {"Status":409,"TransactionId":"6d809684-add6-42fc-8384-08288b4fee06","ErrorCode":"NDC-INT-TEC-A0001","ErrorMessage":"Invalid request. Please check the request parameters and try again.","Context":[{"Name":"VoidBookingErr

### FLOW-V2-29-VOIDCAP — FAIL

- **Test Case:** [Hold]&amp;[BookAfterHold]&amp;[Void] [Response] Verify V2 Family-E flow #29 maps VoidNotAllowed at Hold and FullVoidOnlyAllowed after BookAfterHold.
- **Category:** Flow - Positive
- **Endpoint Name:** Flow #29 (Hold, BookAfterHold, Void)
- **Request:** Search -&gt; FareConfirm -&gt; AddPassenger -&gt; Hold -&gt; PnrReprice -&gt; Retrieve -&gt; BookAfterHold -&gt; Retrieve -&gt; Void (V2)
- **Response:** Hold None; PnrReprice (absent); BookAfterHold None; Retrieve None; same ids true; Void 200
- **Expected:** Same expectations as FLOW-V1-05-VOIDCAP on V2.
- **Actual:** Not as expected: Hold None; PnrReprice (absent); BookAfterHold None; Retrieve after BAH None
- **Status:** FAIL
- **Evidence:** Hold None; PnrReprice (absent); BookAfterHold None; Retrieve None; same ids true; Void 200

  - **Hop 1 &mdash; V2 Search (hold):** PASS &mdash; 200 - 4 offers; picked offers[0] total 12882.8 EGP
  - **Hop 2 &mdash; V2 FareConfirm (hold):** PASS &mdash; 200 - total 12882.8 EGP; canBeHeld=true haveBundles=false offerHasAncillary=false isSeatMapRequired=false
  - **Hop 3 &mdash; V2 AddPassenger (hold):** PASS &mdash; 200 - offerId + responseId returned
  - **Hop 4 &mdash; V2 Hold (hold):** PASS &mdash; 200 - pnr TXQGZK gdsPNR TXQGZK; voidCapability=None; tickets none; holdExpirationDate 2026-11-09T21:59:00+02:00
  - **Hop 5 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 6 &mdash; V2 PnrReprice (hold):** FAIL &mdash; 200 - voidCapability=(absent); tickets none
  - **Hop 7 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus OnHold; tickets none
  - **Hop 8 &mdash; V2 BookAfterHold (hold):** PASS &mdash; 200 - voidCapability=None; tickets 1572141593265:Booked
  - **Hop 9 &mdash; V2 Retrieve (hold):** PASS &mdash; 200 - voidCapability=None; bookingStatus Booked; tickets 1572141593265:Booked
  - **Hop 10 &mdash; V2 Void (cleanup):** PASS &mdash; 200 {"voided":true,"voidedTickets":[{"ticketStatus":"Voided","ticketNumber":"1572141593265","carrierCode":"QR"}],"passengersVoidedAncillaries":{},"emdTickets":{}}

### FLOW-V1-03-VOIDCAP-UNSUP — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify Family-C flow #3 for a Void-unsupported supplier reports VoidNotAllowed and the Void hop is refused with OperationNotSupported.
- **Category:** Flow - Negative
- **Endpoint Name:** SR-FC-BK-RT-VD
- **Request:** Not sent - it needs a Void-unsupported supplier (AirIndia) and none is in scope
- **Response:** No request sent
- **Expected:** Hops 1 to 4 are 2xx with voidCapability = VoidNotAllowed on Book and Retrieve. Void returns 409 OperationNotSupported in the standard envelope; the final Retrieve equals the first.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope
- **Status:** BLOCKED
- **Evidence:** it needs a Void-unsupported supplier (AirIndia) and none is in scope

### FLOW-V2-27-VOIDCAP-UNSUP — BLOCKED

- **Test Case:** [Search]&amp;[FareConfirm]&amp;[AddPassenger]&amp;[Book]&amp;[Retrieve]&amp;[Void] [Response] Verify V2 flow #27 for a Void-unsupported supplier reports VoidNotAllowed and the Void hop is refused.
- **Category:** Flow - Negative
- **Endpoint Name:** SR-FC-AP-BK-RT-VD
- **Request:** Not sent - it needs a Void-unsupported supplier (AirIndia) and none is in scope
- **Response:** No request sent
- **Expected:** Same expectations as FLOW-V1-03-VOIDCAP-UNSUP on V2; voidCapability identical to the V1 flow.
- **Actual:** Blocked: it needs a Void-unsupported supplier (AirIndia) and none is in scope
- **Status:** BLOCKED
- **Evidence:** it needs a Void-unsupported supplier (AirIndia) and none is in scope

### TC-VOIDCAP-VAL-03 — FAIL

- **Test Case:** [Book]&amp;[Retrieve] [Response] Validate voidCapability uses only values from the unified enumeration and never a supplier-native value.
- **Category:** Validation
- **Endpoint Name:** Book / Hold / BookAfterHold / Retrieve
- **Request:** Every distinct voidCapability value collected across this run, compared case-sensitively to {FullVoidOnlyAllowed, VoidNotAllowed}
- **Response:** distinct values: FullVoidOnlyAllowed, None, VoidNotAllowed, (absent)
- **Expected:** Every value is one of the two known values with exact casing. A new value is logged and flagged for review, not hard-failed. Native or ad-hoc values (Y, N, true, ALLOWED, VOIDABLE, VoidNotAllowed in lower case, airline or GDS codes) are a defect because they bypass the mapping.
- **Actual:** Value(s) outside the unified enumeration: None (returned by V2 Retrieve(ticketed), V1 Retrieve(ticketed), V1 Hold(held), V1 Retrieve(held), V1 Retrieve(cancelled), V2 Hold(held), V2 Retrieve(held), V2 Retrieve(cancelled), V1 BookAfterHold(ticketed), V2 BookAfterHold(ticketed), V1 Retrieve(sec), V2 Retrieve(sec))
- **Status:** FAIL
- **Evidence:** FullVoidOnlyAllowed: V2 Book(ticketed), V1 Book(ticketed) | None: V2 Retrieve(ticketed), V1 Retrieve(ticketed), V1 Hold(held), V1 Retrieve(held), V1 Retrieve(cancelled), V2 Hold(held), V2 Retrieve(held), V2 Retrieve(cancelled), V1 BookAfterHold(ticketed), V2 BookAfterHold(ticketed), V1 Retrieve(sec), V2 Retrieve(sec) | VoidNotAllowed: V1 Book(ticketed) | (absent): V1 PnrReprice(held), V2 PnrReprice(held)

### TC-VOIDCAP-VAL-10 — FAIL

- **Test Case:** [Book][Response] Verify all suppliers use the identical literal for the same state (casing, spelling, no suffix or whitespace).
- **Category:** Validation
- **Endpoint Name:** Book / Hold / BookAfterHold / Retrieve
- **Request:** Values grouped by booking state across the run (ticketed-voidable, held, cancelled), compared byte for byte
- **Response:** ticketed/Book: FullVoidOnlyAllowed|VoidNotAllowed; ticketed/Retrieve: None; held/Hold: None; held/Retrieve: None; cancelled/Retrieve: None; ticketed/BookAfterHold: None
- **Expected:** One literal per state across all suppliers: ticketed-and-voidable = FullVoidOnlyAllowed; not voidable = VoidNotAllowed.
- **Actual:** Not one literal per state: the same state (ticketed and voidable) has several literals: FullVoidOnlyAllowed, VoidNotAllowed, None; no endpoint reports VoidNotAllowed for a not-voidable (held/cancelled) booking; got None
- **Status:** FAIL
- **Evidence:** ticketed/Book: FullVoidOnlyAllowed|VoidNotAllowed | ticketed/Retrieve: None | held/Hold: None | held/Retrieve: None | cancelled/Retrieve: None | ticketed/BookAfterHold: None

### TC-VOIDCAP-BIZ-02 — FAIL

- **Test Case:** [Book]&amp;[Hold]&amp;[BookAfterHold]&amp;[Retrieve] [Response] Verify the mapping coverage matrix has no empty cell for any supplier.
- **Category:** Business Rule
- **Endpoint Name:** Book / Hold / PnrReprice / BookAfterHold / Retrieve
- **Request:** Coverage matrix of voidCapability for SabreNdc/EGY, supplier x version x endpoint, built from this run's responses
- **Response:** V1 Book(ticketed): FullVoidOnlyAllowed|VoidNotAllowed; V1 Hold(held): None; V1 PnrReprice(held): (absent); V1 BookAfterHold(ticketed): None; V1 Retrieve(ticketed): None; V1 Retrieve(held): None; V2 Book(ticketed): FullVoidOnlyAllowed; V2 Hold(held): None; V2 PnrReprice(held): (absent); V2 BookAfterHold(ticketed): None; V2 Retrieve(ticketed): None; V2 Retrieve(held): None
- **Expected:** Every endpoint that returns a booking has a unified value; the only N/A cells are endpoints the supplier does not support (409 OperationNotSupported). Absent cells are listed as defects with the supplier and endpoint.
- **Actual:** Empty (absent) cells: V1 PnrReprice(held), V2 PnrReprice(held)
- **Status:** FAIL
- **Evidence:** V1 Book(ticketed): FullVoidOnlyAllowed|VoidNotAllowed | V1 Hold(held): None | V1 PnrReprice(held): (absent) | V1 BookAfterHold(ticketed): None | V1 Retrieve(ticketed): None | V1 Retrieve(held): None | V2 Book(ticketed): FullVoidOnlyAllowed | V2 Hold(held): None | V2 PnrReprice(held): (absent) | V2 BookAfterHold(ticketed): None | V2 Retrieve(ticketed): None | V2 Retrieve(held): None | Matrix covers SabreNdc/EGY only (scope).

### TC-VOIDCAP-INT-03 — FAIL

- **Test Case:** [Book]&amp;[Void] [Request] Verify a client that gates Void on the flag has no unexpected failures across suppliers.
- **Category:** Integration
- **Endpoint Name:** Book / Retrieve / Void
- **Request:** Gate Void on the flag across the run: Book flag, Retrieve flag, BookAfterHold flag vs the actual Void outcome
- **Response:** 27 ticketed Books, 20 Voids, 14 ticketed Retrieves, held-Void attempts 2 (all refused: true)
- **Expected:** Zero Void failures after the flag allows it; zero successful Voids on bookings the flag blocked (the second check is run once on one S supplier with VoidNotAllowed from TC-VOIDCAP-NEG-04).
- **Actual:** Gate unreliable: 1 Void(s) failed after the flag allowed it; 14 of 14 Retrieve responses of ticketed, voidable bookings do not report FullVoidOnlyAllowed (a client gating on Retrieve would block a Void that succeeds); 2 BookAfterHold responses on newly ticketed bookings do not report FullVoidOnlyAllowed
- **Status:** FAIL
- **Evidence:** Book flag FullVoidOnlyAllowed on 24/27; Void failed after Book flag allowed: 1; Retrieve(ticketed) not FullVoidOnlyAllowed: 14/14; held Void refused true

### TC-VOIDCAP-SEC-06 — FAIL

- **Test Case:** [Void][Response] Verify Void-related error responses expose no supplier credentials, raw supplier payload or internal type names.
- **Category:** Security
- **Endpoint Name:** Void (error responses)
- **Request:** Scan of 37 error bodies collected in this run (plus two unknown-order Voids) for credentials, raw supplier payloads, .NET type names, stack traces
- **Response:** 37 error bodies
- **Expected:** None present; error bodies contain only the standard envelope (Status, TransactionId, ErrorCode, ErrorMessage, Context).
- **Actual:** Leaks found: V1 Void 409: OriginalSupplierRequest; V1 Void 409: OriginalSupplierResponse; V2 Void 409: OriginalSupplierRequest; V2 Void 409: OriginalSupplierResponse
- **Status:** FAIL
- **Evidence:** forbidden strings searched: OriginalSupplierRequest, OriginalSupplierResponse, supplierRequest, supplierResponse, wsse, Username, Password, System., StackTrace, at Ndc, Exception; error key sets: Context,ErrorCode,ErrorMessage,OriginalSupplierRequest,OriginalSupplierResponse,Status,TransactionId | Context,ErrorCode,ErrorMessage,Status,TransactionId | context,errorCode,errorMessage,originalSupplierRequest,originalSupplierResponse,status,transactionId

  - **Hop 1 &mdash; V1 Void (sec6):** PASS &mdash; 409 {"Status":409,"TransactionId":"84f8f0c9-cf5d-40a3-916c-95667786f684","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"060004","Value":"Order not found: orderId=[unknown]"}],"OriginalSupplierRequest":"{\
  - **Hop 2 &mdash; V2 Void (sec6):** PASS &mdash; 409 {"Status":409,"TransactionId":"58af6845-4c22-4809-995e-9cc8874d875b","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"060004","Value":"Order not found: orderId=[unknown]"}],"OriginalSupplierRequest":"{\

### TC-VOIDCAP-REG-09 — FAIL

- **Test Case:** [Book]&amp;[Retrieve] [Response] Verify the previously filed voidCapability defects are re-checked, not lost.
- **Category:** Regression
- **Endpoint Name:** BookAfterHold / PnrReprice / Retrieve
- **Request:** Re-run of the SabreNdc defect conditions (BookAfterHold, PnrReprice, Retrieve omitting voidCapability); TravelportNdc and AirIndea defects not re-checked (scope)
- **Response:** V1 BookAfterHold: None; V1 PnrReprice: (absent); V1 Retrieve: None; V2 BookAfterHold: None; V2 PnrReprice: (absent); V2 Retrieve: None
- **Expected:** Each defect is closed by the unified mapping. A defect still reproducing is a recurrence of the original bug, referenced by its id.
- **Actual:** Not closed by the unified mapping: V1 BookAfterHold: None; V1 PnrReprice: (absent); V1 Retrieve: None; V2 BookAfterHold: None; V2 PnrReprice: (absent); V2 Retrieve: None
- **Status:** FAIL
- **Evidence:** V1 BookAfterHold: None | V1 PnrReprice: (absent) | V1 Retrieve: None | V2 BookAfterHold: None | V2 PnrReprice: (absent) | V2 Retrieve: None | Earlier state: all three omitted the field (2026-10-25). Now BookAfterHold and Retrieve return "None" and PnrReprice still omits it. TravelportNdc Hold/EK and AirIndia Book omissions: not exercised (supplier scope).

### TC-VOIDCAP-REG-11 — FAIL

- **Test Case:** [Book][Response] Verify the mapping does not slow Book or Void beyond the known per-supplier baseline.
- **Category:** Regression
- **Endpoint Name:** Book / Void (timing)
- **Request:** Durations of every QR Book and every Void in this run vs the SabreNdc baseline (Book ~16 s, Void ~10 s, tolerance 20%)
- **Response:** V1: Book (QR, n=9) median 22.1s vs baseline 16s (38%); Void (n=9) median 9.4s vs baseline 10s (-6%); V2: Book (QR, n=10) median 22.3s vs baseline 16s (39%); Void (n=10) median 10.7s vs baseline 10s (7%)
- **Expected:** Median duration within 20% of the baseline (threshold chosen for this case; no SLA is documented in SPEC).
- **Actual:** Slower than 120% of the baseline: V1 Book median 22.1s (&gt; 19.2s); V2 Book median 22.3s (&gt; 19.2s)
- **Status:** FAIL
- **Evidence:** V1: Book (QR, n=9) median 22.1s vs baseline 16s (38%); Void (n=9) median 9.4s vs baseline 10s (-6%) | V2: Book (QR, n=10) median 22.3s vs baseline 16s (39%); Void (n=10) median 10.7s vs baseline 10s (7%) | Supplier latency varies; no mapping-specific timing could be isolated.

## Findings

### Defects

- **[TC-VOIDCAP-POS-01] BUG-01 (new) &mdash; Retrieve of a ticketed, voidable booking returns voidCapability "None" while Book returned FullVoidOnlyAllowed and Void succeeds** Field: `voidCapability (Retrieve)`. Expected: FullVoidOnlyAllowed (same value as the Book response for the same booking state). **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: High. **Impact:** A client that reads the flag on an existing booking (Retrieve) concludes Void is not possible and hides or blocks a Void that works; 14 of 14 ticketed Retrieves in this run returned "None". Evidence: V1 and V2, QR and AA: Book FullVoidOnlyAllowed, Retrieve of the same booking "None", Void 200 voided=true.
- **[TC-VOIDCAP-VAL-09] BUG-01 (occurrence 2, not new) &mdash; Retrieve of a ticketed, voidable booking returns voidCapability "None" while Book returned FullVoidOnlyAllowed and Void succeeds** Field: `voidCapability (Retrieve)`. Expected: FullVoidOnlyAllowed (same value as the Book response for the same booking state). **History:** Seen again in this run; first at TC-VOIDCAP-POS-01. Severity: High. **Impact:** A client that reads the flag on an existing booking (Retrieve) concludes Void is not possible and hides or blocks a Void that works; 14 of 14 ticketed Retrieves in this run returned "None". Evidence: V1 and V2, QR and AA: Book FullVoidOnlyAllowed, Retrieve of the same booking "None", Void 200 voided=true.
- **[TC-VOIDCAP-INT-01] BUG-01 (occurrence 3, not new) &mdash; Retrieve of a ticketed, voidable booking returns voidCapability "None" while Book returned FullVoidOnlyAllowed and Void succeeds** Field: `voidCapability (Retrieve)`. Expected: FullVoidOnlyAllowed (same value as the Book response for the same booking state). **History:** Seen again in this run; first at TC-VOIDCAP-POS-01. Severity: High. **Impact:** A client that reads the flag on an existing booking (Retrieve) concludes Void is not possible and hides or blocks a Void that works; 14 of 14 ticketed Retrieves in this run returned "None". Evidence: V1 and V2, QR and AA: Book FullVoidOnlyAllowed, Retrieve of the same booking "None", Void 200 voided=true.
- **[FLOW-V1-03-VOIDCAP] BUG-01 (occurrence 4, not new) &mdash; Retrieve of a ticketed, voidable booking returns voidCapability "None" while Book returned FullVoidOnlyAllowed and Void succeeds** Field: `voidCapability (Retrieve)`. Expected: FullVoidOnlyAllowed (same value as the Book response for the same booking state). **History:** Seen again in this run; first at TC-VOIDCAP-POS-01. Severity: High. **Impact:** A client that reads the flag on an existing booking (Retrieve) concludes Void is not possible and hides or blocks a Void that works; 14 of 14 ticketed Retrieves in this run returned "None". Evidence: V1 and V2, QR and AA: Book FullVoidOnlyAllowed, Retrieve of the same booking "None", Void 200 voided=true.
- **[FLOW-V2-27-VOIDCAP] BUG-01 (occurrence 5, not new) &mdash; Retrieve of a ticketed, voidable booking returns voidCapability "None" while Book returned FullVoidOnlyAllowed and Void succeeds** Field: `voidCapability (Retrieve)`. Expected: FullVoidOnlyAllowed (same value as the Book response for the same booking state). **History:** Seen again in this run; first at TC-VOIDCAP-POS-01. Severity: High. **Impact:** A client that reads the flag on an existing booking (Retrieve) concludes Void is not possible and hides or blocks a Void that works; 14 of 14 ticketed Retrieves in this run returned "None". Evidence: V1 and V2, QR and AA: Book FullVoidOnlyAllowed, Retrieve of the same booking "None", Void 200 voided=true.
- **[TC-VOIDCAP-INT-03] BUG-01 (occurrence 6, not new) &mdash; Retrieve of a ticketed, voidable booking returns voidCapability "None" while Book returned FullVoidOnlyAllowed and Void succeeds** Field: `voidCapability (Retrieve)`. Expected: FullVoidOnlyAllowed (same value as the Book response for the same booking state). **History:** Seen again in this run; first at TC-VOIDCAP-POS-01. Severity: High. **Impact:** A client that reads the flag on an existing booking (Retrieve) concludes Void is not possible and hides or blocks a Void that works; 14 of 14 ticketed Retrieves in this run returned "None". Evidence: V1 and V2, QR and AA: Book FullVoidOnlyAllowed, Retrieve of the same booking "None", Void 200 voided=true.
- **[TC-VOIDCAP-POS-07] BUG-02 (new) &mdash; BookAfterHold returns voidCapability "None" for a booking that has just been ticketed** Field: `voidCapability (BookAfterHold)`. Expected: FullVoidOnlyAllowed (the booking is ticketed and Void then succeeds). **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: High. **Impact:** Same as BUG-01 for the Hold -&gt; BookAfterHold path: the response that creates the ticket tells the client Void is not possible, but Void succeeds right after. Evidence: V1 and V2: BookAfterHold voidCapability "None", ticket status Booked, Void 200 voided=true.
- **[FLOW-V1-05-VOIDCAP] BUG-02 (occurrence 2, not new) &mdash; BookAfterHold returns voidCapability "None" for a booking that has just been ticketed** Field: `voidCapability (BookAfterHold)`. Expected: FullVoidOnlyAllowed (the booking is ticketed and Void then succeeds). **History:** Seen again in this run; first at TC-VOIDCAP-POS-07. Severity: High. **Impact:** Same as BUG-01 for the Hold -&gt; BookAfterHold path: the response that creates the ticket tells the client Void is not possible, but Void succeeds right after. Evidence: V1 and V2: BookAfterHold voidCapability "None", ticket status Booked, Void 200 voided=true.
- **[FLOW-V2-29-VOIDCAP] BUG-02 (occurrence 3, not new) &mdash; BookAfterHold returns voidCapability "None" for a booking that has just been ticketed** Field: `voidCapability (BookAfterHold)`. Expected: FullVoidOnlyAllowed (the booking is ticketed and Void then succeeds). **History:** Seen again in this run; first at TC-VOIDCAP-POS-07. Severity: High. **Impact:** Same as BUG-01 for the Hold -&gt; BookAfterHold path: the response that creates the ticket tells the client Void is not possible, but Void succeeds right after. Evidence: V1 and V2: BookAfterHold voidCapability "None", ticket status Booked, Void 200 voided=true.
- **[TC-VOIDCAP-REG-09] BUG-02 (occurrence 4, not new) &mdash; BookAfterHold returns voidCapability "None" for a booking that has just been ticketed** Field: `voidCapability (BookAfterHold)`. Expected: FullVoidOnlyAllowed (the booking is ticketed and Void then succeeds). **History:** Seen again in this run; first at TC-VOIDCAP-POS-07. Severity: High. **Impact:** Same as BUG-01 for the Hold -&gt; BookAfterHold path: the response that creates the ticket tells the client Void is not possible, but Void succeeds right after. Evidence: V1 and V2: BookAfterHold voidCapability "None", ticket status Booked, Void 200 voided=true.
- **[TC-VOIDCAP-INT-02] BUG-03 (new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: High. **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Observed "None" on Hold (V1, V2), held Retrieve, cancelled Retrieve, BookAfterHold and ticketed Retrieve; VoidNotAllowed was seen only on some V1 AA Book responses (BUG-05).
- **[TC-VOIDCAP-VAL-03] BUG-03 (occurrence 2, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** Seen again in this run; first at TC-VOIDCAP-INT-02. Severity: High. **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Observed "None" on Hold (V1, V2), held Retrieve, cancelled Retrieve, BookAfterHold and ticketed Retrieve; VoidNotAllowed was seen only on some V1 AA Book responses (BUG-05).
- **[TC-VOIDCAP-VAL-10] BUG-03 (occurrence 3, not new) &mdash; The unified enumeration is not respected: "None" is returned for held and cancelled bookings instead of VoidNotAllowed** Field: `voidCapability (Hold, held and cancelled Retrieve)`. Expected: VoidNotAllowed for every state where Void is not possible (held, cancelled); only FullVoidOnlyAllowed or VoidNotAllowed may be returned. **History:** Seen again in this run; first at TC-VOIDCAP-INT-02. Severity: High. **Impact:** A third, undocumented literal ("None") leaks through the Common Interface, so clients cannot rely on a two-value enumeration and no endpoint ever reports VoidNotAllowed for a held booking. Evidence: Observed "None" on Hold (V1, V2), held Retrieve, cancelled Retrieve, BookAfterHold and ticketed Retrieve; VoidNotAllowed was seen only on some V1 AA Book responses (BUG-05).
- **[TC-VOIDCAP-VAL-05] BUG-04 (new) &mdash; PnrReprice (FareConfirmAfterHold) response omits voidCapability** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: voidCapability present with the same value as the Hold response. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: Medium. **Impact:** One of five endpoints that return a booking has no value at all, so a client cannot tell "capability unknown" from "not allowed" at that step. Recurrence of the 2026-10-25 omission (BookAfterHold and Retrieve now return "None" instead, see BUG-01/02). Evidence: V1 and V2 PnrReprice responses contain no voidCapability key.
- **[TC-VOIDCAP-VAL-12] BUG-04 (occurrence 2, not new) &mdash; PnrReprice (FareConfirmAfterHold) response omits voidCapability** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: voidCapability present with the same value as the Hold response. **History:** Seen again in this run; first at TC-VOIDCAP-VAL-05. Severity: Medium. **Impact:** One of five endpoints that return a booking has no value at all, so a client cannot tell "capability unknown" from "not allowed" at that step. Recurrence of the 2026-10-25 omission (BookAfterHold and Retrieve now return "None" instead, see BUG-01/02). Evidence: V1 and V2 PnrReprice responses contain no voidCapability key.
- **[TC-VOIDCAP-BIZ-02] BUG-04 (occurrence 3, not new) &mdash; PnrReprice (FareConfirmAfterHold) response omits voidCapability** Field: `voidCapability (PnrReprice / FareConfirmAfterHold)`. Expected: voidCapability present with the same value as the Hold response. **History:** Seen again in this run; first at TC-VOIDCAP-VAL-05. Severity: Medium. **Impact:** One of five endpoints that return a booking has no value at all, so a client cannot tell "capability unknown" from "not allowed" at that step. Recurrence of the 2026-10-25 omission (BookAfterHold and Retrieve now return "None" instead, see BUG-01/02). Evidence: V1 and V2 PnrReprice responses contain no voidCapability key.
- **[TC-VOIDCAP-BIZ-01] BUG-05 (new) &mdash; V1 Book returns VoidNotAllowed on some AA bookings although Void then works; the mapping differs by version and carrier** Field: `voidCapability (Book, V1, AA)`. Expected: The same value (FullVoidOnlyAllowed) for every ticketed Book of the same supplier, and a flag that agrees with the Void outcome. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: High. **Impact:** 4 of 11 V1 AA Books (fare class B and others) said VoidNotAllowed; Void succeeded (voided=true) on 2 of them. V1 QR (20 of 20), V2 QR and V2 AA (8 of 8) always said FullVoidOnlyAllowed. A client gating on the flag would wrongly refuse to Void. Evidence: PNRs SJJNJF, ROMSRX, RPUKGE, SGZIEG (V1 AA, flag VoidNotAllowed): Void outcomes 200 voided=false; 200 voided=true; 409 then 200 voided=false; 409 then 200 voided=true.
- **[TC-VOIDCAP-BIZ-03] BUG-05 (occurrence 2, not new) &mdash; V1 Book returns VoidNotAllowed on some AA bookings although Void then works; the mapping differs by version and carrier** Field: `voidCapability (Book, V1, AA)`. Expected: The same value (FullVoidOnlyAllowed) for every ticketed Book of the same supplier, and a flag that agrees with the Void outcome. **History:** Seen again in this run; first at TC-VOIDCAP-BIZ-01. Severity: High. **Impact:** 4 of 11 V1 AA Books (fare class B and others) said VoidNotAllowed; Void succeeded (voided=true) on 2 of them. V1 QR (20 of 20), V2 QR and V2 AA (8 of 8) always said FullVoidOnlyAllowed. A client gating on the flag would wrongly refuse to Void. Evidence: PNRs SJJNJF, ROMSRX, RPUKGE, SGZIEG (V1 AA, flag VoidNotAllowed): Void outcomes 200 voided=false; 200 voided=true; 409 then 200 voided=false; 409 then 200 voided=true.
- **[TC-VOIDCAP-BND-03] BUG-05 (occurrence 3, not new) &mdash; V1 Book returns VoidNotAllowed on some AA bookings although Void then works; the mapping differs by version and carrier** Field: `voidCapability (Book, V1, AA)`. Expected: The same value (FullVoidOnlyAllowed) for every ticketed Book of the same supplier, and a flag that agrees with the Void outcome. **History:** Seen again in this run; first at TC-VOIDCAP-BIZ-01. Severity: High. **Impact:** 4 of 11 V1 AA Books (fare class B and others) said VoidNotAllowed; Void succeeded (voided=true) on 2 of them. V1 QR (20 of 20), V2 QR and V2 AA (8 of 8) always said FullVoidOnlyAllowed. A client gating on the flag would wrongly refuse to Void. Evidence: PNRs SJJNJF, ROMSRX, RPUKGE, SGZIEG (V1 AA, flag VoidNotAllowed): Void outcomes 200 voided=false; 200 voided=true; 409 then 200 voided=false; 409 then 200 voided=true.
- **[TC-VOIDCAP-VAL-08] BUG-05 (occurrence 4, not new) &mdash; V1 Book returns VoidNotAllowed on some AA bookings although Void then works; the mapping differs by version and carrier** Field: `voidCapability (Book, V1, AA)`. Expected: The same value (FullVoidOnlyAllowed) for every ticketed Book of the same supplier, and a flag that agrees with the Void outcome. **History:** Seen again in this run; first at TC-VOIDCAP-BIZ-01. Severity: High. **Impact:** 4 of 11 V1 AA Books (fare class B and others) said VoidNotAllowed; Void succeeded (voided=true) on 2 of them. V1 QR (20 of 20), V2 QR and V2 AA (8 of 8) always said FullVoidOnlyAllowed. A client gating on the flag would wrongly refuse to Void. Evidence: PNRs SJJNJF, ROMSRX, RPUKGE, SGZIEG (V1 AA, flag VoidNotAllowed): Void outcomes 200 voided=false; 200 voided=true; 409 then 200 voided=false; 409 then 200 voided=true.
- **[TC-VOIDCAP-BIZ-01] BUG-06 (new) &mdash; Void on AA bookings sometimes returns HTTP 200 with voided=false and ticketStatus "None", or an intermittent 409 supplier error "Cannot perform cancellation", and the booking state afterwards is inconsistent** Field: `Void response (V1, AA)`. Expected: 200 with voided=true, or a mapped error; never a 200 that says the ticket was not voided; Retrieve afterwards consistent with the Void result. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: Medium. **Impact:** A client reading HTTP 200 as success sees a booking that was not (or only later) voided; PNR RPUKGE showed Retrieve ticketStatus "Booked" while a second Void said "no active order items". Evidence: SJJNJF and RPUKGE: Void 200 {"voided":false,"voidedTickets":[{"ticketStatus":"None"}]}; SHGVTX, RPUKGE, SGZIEG: first Void 409 External service error (code 325), retry succeeded or reported no active order items.
- **[TC-VOIDCAP-BND-03] BUG-06 (occurrence 2, not new) &mdash; Void on AA bookings sometimes returns HTTP 200 with voided=false and ticketStatus "None", or an intermittent 409 supplier error "Cannot perform cancellation", and the booking state afterwards is inconsistent** Field: `Void response (V1, AA)`. Expected: 200 with voided=true, or a mapped error; never a 200 that says the ticket was not voided; Retrieve afterwards consistent with the Void result. **History:** Seen again in this run; first at TC-VOIDCAP-BIZ-01. Severity: Medium. **Impact:** A client reading HTTP 200 as success sees a booking that was not (or only later) voided; PNR RPUKGE showed Retrieve ticketStatus "Booked" while a second Void said "no active order items". Evidence: SJJNJF and RPUKGE: Void 200 {"voided":false,"voidedTickets":[{"ticketStatus":"None"}]}; SHGVTX, RPUKGE, SGZIEG: first Void 409 External service error (code 325), retry succeeded or reported no active order items.
- **[TC-VOIDCAP-BIZ-06] BUG-07 (new) &mdash; Retrieve of a voided booking returns HTTP 400 "Invalid request" (This Trip Is Already Cancelled), not a terminal 409 or a VoidNotAllowed value** Field: `Retrieve after Void (HTTP status)`. Expected: HTTP 409 (terminal state) as TravelportNdc returns, or 200 with voidCapability VoidNotAllowed. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: Low. **Impact:** The same terminal state maps to different statuses per supplier, and 400 suggests a malformed request; second Void correctly returns 409. Evidence: V1 and V2: Retrieve after Void 400 NDC-INT-TEC-A0001 "This Trip Is Already Cancelled"; second Void 409 NDC-INT-TEC-A0001 "The PNR has already been voided".
- **[TC-VOIDCAP-SEC-01] BUG-08 (new) &mdash; Retrieve ignores a missing or invalid x-api-key and Client-Id and returns the full booking** Field: `Retrieve authentication (x-api-key, Client-Id)`. Expected: 401 (as Search, Book and Void return) with no booking data. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: Critical. **Impact:** Anyone who knows a PNR, gdsPNR and bookingToken can read passenger and price data without credentials. A real ticketed booking was returned with no key on V1 and V2. Evidence: Book and Void without the headers: 401. Retrieve without x-api-key, with an invalid key, without Client-Id, with an invalid Client-Id (both casings): 200 with booking data (V1 and V2). A Retrieve with dummy ids and no key reached the supplier (409), confirming no gate.
- **[TC-VOIDCAP-SEC-02] BUG-08 (occurrence 2, not new) &mdash; Retrieve ignores a missing or invalid x-api-key and Client-Id and returns the full booking** Field: `Retrieve authentication (x-api-key, Client-Id)`. Expected: 401 (as Search, Book and Void return) with no booking data. **History:** Seen again in this run; first at TC-VOIDCAP-SEC-01. Severity: Critical. **Impact:** Anyone who knows a PNR, gdsPNR and bookingToken can read passenger and price data without credentials. A real ticketed booking was returned with no key on V1 and V2. Evidence: Book and Void without the headers: 401. Retrieve without x-api-key, with an invalid key, without Client-Id, with an invalid Client-Id (both casings): 200 with booking data (V1 and V2). A Retrieve with dummy ids and no key reached the supplier (409), confirming no gate.
- **[TC-VOIDCAP-SEC-06] BUG-09 (new) &mdash; Void on an unknown order returns 409 NDC-INT-UNC-Z9999 with the raw supplier request and response in the body** Field: `Void error body (OriginalSupplierRequest / OriginalSupplierResponse)`. Expected: Standard envelope only (Status, TransactionId, ErrorCode, ErrorMessage, Context), no supplier payload. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: High. **Impact:** Supplier payloads (and, per SPEC 7.14, potentially internal identifiers) are exposed to API clients. Seen also on AA Void supplier errors. Evidence: V1 and V2 Void with an unknown pnr: 409 with OriginalSupplierRequest and OriginalSupplierResponse populated (content redacted in this report).
- **[TC-VOIDCAP-SEC-06] BUG-10 (new) &mdash; Two error envelope shapes: PascalCase (Status, ErrorCode, ...) and camelCase (status, errorCode, ..., originalSupplierRequest: null) depending on the failing layer** Field: `Error envelope key casing`. Expected: One envelope and one key casing for every error. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: Low. **Impact:** Clients must parse two shapes; validation errors also carry empty originalSupplier* keys. Evidence: Key sets seen: [Context,ErrorCode,ErrorMessage,Status,TransactionId], [... + OriginalSupplierRequest, OriginalSupplierResponse], and the camelCase set from the AddPassenger/NoSuchSupplier validation errors.
- **[TC-VOIDCAP-INT-02] BUG-11 (new) &mdash; Retrieve after CancelAfterHold still returns 200 (V2 bookingStatus OnHold) with voidCapability "None"** Field: `Retrieve after CancelAfterHold`. Expected: A terminal error or a cancelled status with VoidNotAllowed. **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: Medium. **Impact:** A cancelled hold looks live to a client. Recurrence of the 2026-10-22 behaviour. Evidence: V1 and V2: CancelAfterHold 200 cancelled=true, then Retrieve 200 (V2 OnHold).
- **[TC-VOIDCAP-REG-11] BUG-12 (new) &mdash; Median Book time is about 22 s (V1 22.1 s, V2 22.3 s) against the 16 s SabreNdc baseline** Field: `Book latency`. Expected: Within 20% of 16 s (19.2 s). **History:** First observed in this run (SabreNdc/EGY, ne-3, 2026-11-04). Severity: Low. **Impact:** About 38% slower than the baseline; supplier latency may account for it, no mapping-specific cause could be isolated. Evidence: Median of every QR Book in this run; Void median unchanged at about 10 s.

### Unknown-resolutions

- **[TC-CAPCHECK-VOIDCAP-03]** SabreNdc/EGY Void is confirmed supported on V1 and V2 for QR and AA; a repeat Void now returns 409 "The PNR has already been voided" (the earlier build returned 200). Evidence: See the test case.
- **[TC-VOIDCAP-NEG-04]** Void on a held (not ticketed) SabreNdc booking is refused with HTTP 400 NDC-INT-TEC-A0001 "Only fulfilled, ticketed orders can be voided"; the hold stays intact and CancelAfterHold then succeeds. Evidence: See the test case.
- **[TC-VOIDCAP-NEG-06]** Void with an inactive selector (SabreNdc/KSA, SabreNdc/UAE) or an unknown supplier returns 400 (credentials not active / validation), distinct from 409 OperationNotSupported. Evidence: See the test case.
- **[TC-VOIDCAP-BND-01]** A 9-passenger SabreNdc booking (5 ADT, 2 CHD, 2 INF) tickets 9 tickets in about 65 s on V1 and V2 and Void lists all 9 tickets. Evidence: See the test case.
- **[TC-VOIDCAP-BND-02]** SabreNdc/EGY returns offers up to about 250 days ahead (2027-07-12); beyond about 280 days there are none. Evidence: See the test case.
- **[TC-VOIDCAP-BIZ-05]** Void with voidTickets naming one of two tickets voids both and the response lists both tickets (V1 and V2). Evidence: See the test case.
- **[TC-VOIDCAP-VAL-07]** The staging host exposes only the Swagger UI page; no OpenAPI JSON is reachable at the standard paths. Evidence: See the test case.

## Proposed SPEC.md updates

- 4.6 (Void column, SabreNdc) &mdash; status: *pending*
  - **Old:** "SabreNdc: Void Supported"
  - **New:** "SabreNdc/EGY Void confirmed live on V1 and V2 for QR and AA (2026-11-04, ne-3); Book returns voidCapability=FullVoidOnlyAllowed, Retrieve/Hold/BookAfterHold return "None", PnrReprice omits it."
  - **Correction:** confirmed live

- 8.3 (voidCapability) &mdash; status: *pending*
  - **Old:** "`VoidNotAllowed` (observed); others `UNKNOWN` (presumably a "void allowed" counterpart)"
  - **New:** "`FullVoidOnlyAllowed` (ticketed Book, SabreNdc/EGY on V1 and V2, confirmed 2026-11-04) and `VoidNotAllowed` (intermittent on SabreNdc V1 Book of AA fares); SabreNdc Hold, BookAfterHold and Retrieve return `"None"`, which is outside the unified enumeration and is logged as a defect (VoidUnified run 2026-11-04)."
  - **Correction:** Evidence: SabreNdc/EGY VoidUnified run, 2026-11-04.

- 2.15 (Void, SabreNdc) &mdash; status: *pending*
  - **Old:** "Expected Success Response: `UNKNOWN` for a void-eligible booking"
  - **New:** "SabreNdc/EGY: 200 {voided, voidedTickets[{ticketStatus, ticketNumber, carrierCode}]} (V2 adds passengersVoidedAncillaries {} and emdTickets {}), about 10 s; Void on a held booking: 400 NDC-INT-TEC-A0001; repeat Void: 409 NDC-INT-TEC-A0001; Retrieve after Void: 400 "This Trip Is Already Cancelled"."
  - **Correction:** Evidence: SabreNdc/EGY VoidUnified run, 2026-11-04.

- 1.5 / 7.14 (authentication) &mdash; status: *pending*
  - **Old:** "x-api-key and Client-Id are required on every request"
  - **New:** "Retrieve (V1 and V2) does not enforce x-api-key or Client-Id (200 with booking data); Search, Book and Void return 401 (BUG-08 of the VoidUnified run)."
  - **Correction:** Confirm with the developers before folding into the spec; this is a defect, not intended behaviour.

## Cleanup / follow-up

Nothing left needing cleanup.

