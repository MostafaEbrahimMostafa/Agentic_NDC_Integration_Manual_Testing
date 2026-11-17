# QA Execution Report — Amadeus_PassengerNameLimits_Round2_TestCases.csv (NDC_Integration/TestCases/Amadeus_PassengerNameLimits_Round2_TestCases.csv) - Amadeus / EGY - V1 Book and Hold - 128 test cases

**Environment:** staging (ndc-integration-stg-ne-3) &middot; https://ndc-integration-stg-ne-3.azurewebsites.net/
**Supplier:** Amadeus  **Credentials Selector:** EGY
**Started:** 2026-11-01T14:39:23.131Z
**Ended:** 2026-11-01T15:04:26.933Z
**Status:** COMPLETE
**Execution Duration:** 25m 4s ([View Time Breakdown](20261101-143923_Amadeus-EGY-PaxNameLimits-V1-ne3_TimeBreakdown.html))
**Prior runs:** see NDC_Integration/Artifacts/Logs/ (see NDC_Integration/Artifacts/Logs/)

## Summary

- Test cases logged: 128 of 128 planned
- Passed: 86
- Failed: 42
- Blocked: 0
- Failed test cases: TC-PAXNAME-POS-01, TC-PAXNAME-POS-03, TC-PAXNAME-POS-04, TC-PAXNAME-POS-05, TC-PAXNAME-BND-02, TC-PAXNAME-BND-04, TC-PAXNAME-BND-06, TC-PAXNAME-BND-09, TC-PAXNAME-BND-10, TC-PAXNAME-BND-11, TC-PAXNAME-BND-12, TC-PAXNAME-BND-13, TC-PAXNAME-BND-17, TC-PAXNAME-BND-21, TC-PAXNAME-BIZ-03, TC-PAXNAME-BIZ-04, TC-PAXNAME-BIZ-13, TC-PAXNAME-NEG-14, TC-PAXNAME-VAL-02, TC-PAXNAME-VAL-03, TC-PAXNAME-VAL-04, TC-PAXNAME-VAL-05, TC-PAXNAME-VAL-09, TC-PAXNAME-VAL-11, TC-PAXNAME-VAL-18, TC-PAXNAME-VAL-19, TC-PAXNAME-VAL-20, TC-PAXNAME-VAL-21, TC-PAXNAME-VAL-22, TC-PAXNAME-REG-01, TC-PAXNAME-POS-06, TC-PAXNAME-BIZ-17, TC-PAXNAME-BIZ-19, TC-PAXNAME-BIZ-20, TC-PAXNAME-POS-09, TC-PAXNAME-BND-24, TC-PAXNAME-BND-25, TC-PAXNAME-BND-26, TC-PAXNAME-BND-29, TC-PAXNAME-BIZ-25, TC-PAXNAME-VAL-27, TC-PAXNAME-SEC-08

## Test case results

### TC-CAPCHECK-AMD-01 — PASS

- **Test Case:** [Amadeus][Search] Verify Amadeus credentials for credentialsSelector EGY are active and return holdable offers for an ADT + INF search.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm
- **Request:** V1 Search + FareConfirm, Amadeus/EGY, CAI-&gt;JED 2026-11-29, 1 ADT + 1 INF, isdebug=false
- **Response:** Search 200 with 71 offers (canBeHeld=true on 71, haveBundles=true on 0); FareConfirm 200.
- **Expected:** HTTP 200 on V1 Search with non-empty offers[]; canBeHeld=true on the offers used (so Hold cases are runnable); FareConfirm returns a selectedOffer. Record the offers count and the haveBundles/canBeHeld flags.
- **Actual:** Search 200 with 71 offers (canBeHeld=true on 71, haveBundles=true on 0); FareConfirm 200.
- **Status:** PASS
- **Evidence:** Search 200 with 71 offers (canBeHeld=true on 71, haveBundles=true on 0); FareConfirm 200.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 

### TC-PAXNAME-POS-01 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a typical ADT + INF passengersList (short names) is accepted on both Hold and Book and echoed untruncated.
- **Category:** Positive
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a typical ADT + INF passengersList (short names) is accepted on both Hold and Book and echoed untruncated.
- **Response:** Hold: 200 pnr 83MBPD (7.3s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.7s)
- **Expected:** Hold and Book both HTTP 200 with pnr/gdsPNR/bookingToken; passengersList echoes Mostafa/Ibrahim (ADT) and Lina/Ibrahim (INF) untruncated (the supplier layer upper-cases); Book additionally issues tickets. No NDC-INT-TEC-A0001.
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically | Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically | Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-01):** FAIL &mdash; 200 pnr 83MBPD (7.3s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-POS-01):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.7s)

### TC-PAXNAME-POS-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT-only passengersList (no infant) with short names is accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT-only passengersList (no infant) with short names is accepted.
- **Response:** Hold: 200 pnr 83NMNC (7.7s)
- **Expected:** HTTP 200 with pnr; ADT echoed untruncated.
- **Actual:** Hold 200 pnr 83NMNC echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NMNC echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-POS-02):** PASS &mdash; 200 pnr 83NMNC (7.7s)

### TC-PAXNAME-POS-03 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + CHD + INF passengersList with short names is accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD+INF) then POST api/FlightBooking/Hold - Validate an ADT + CHD + INF passengersList with short names is accepted.
- **Response:** Hold: 200 pnr 83MZME (8.7s)
- **Expected:** HTTP 200 with pnr; all three passengers echoed untruncated.
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-03):** FAIL &mdash; 200 pnr 83MZME (8.7s)

### TC-PAXNAME-POS-04 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate two ADT each travelling with their own INF (two short pairs) is accepted and each infant stays linked to its own adult.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold - Validate two ADT each travelling with their own INF (two short pairs) is accepted and each infant stays linked to its own adult.
- **Response:** Hold: 200 pnr 83M78O (6.9s)
- **Expected:** HTTP 200 with pnr; four passengers echoed untruncated; each INF keeps its own parent (parentPaxRefId / pairing not crossed).
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically; INF "Nour"/"Hassan" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically; INF "Nour"/"Hassan" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-04):** FAIL &mdash; 200 pnr 83M78O (6.9s)

### TC-PAXNAME-POS-05 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a six-passenger party (3 ADT + 1 CHD + 2 INF) where both ADT+INF pairs sit exactly on the 59-character limit is accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+ADT+CHD+INF+INF) then POST api/FlightBooking/Hold - Validate a six-passenger party (3 ADT + 1 CHD + 2 INF) where both ADT+INF pairs sit exactly on the 59-character limit is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, w... (0.1s)
- **Expected:** HTTP 200 with pnr; all six passengers echoed untruncated. Each pair is 51 + 8 = 59 (the limit, inclusive); the third ADT (25/25, no infant) and the CHD (25/25) are not part of any pair sum.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 59 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-05):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.1s)

### TC-PAXNAME-BND-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of exactly 25 characters (the maximum) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT first name of exactly 25 characters (the maximum) is accepted.
- **Response:** Hold: 200 pnr 83M7R4 (6.8s)
- **Expected:** HTTP 200 with pnr; first name echoed all 25 characters. (Rule R1: first name &lt;= 25.)
- **Actual:** Hold 200 pnr 83M7R4 echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83M7R4 echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-01):** PASS &mdash; 200 pnr 83M7R4 (6.8s)

### TC-PAXNAME-BND-02 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of 26 characters (one over the maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT first name of 26 characters (one over the maximum) is rejected.
- **Response:** Hold: 200 pnr 83MVWO (7.5s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.8s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 200 pnr 83MVWO | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 200 pnr 83MVWO | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-02):** FAIL &mdash; 200 pnr 83MVWO (7.5s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-02):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.8s)

### TC-PAXNAME-BND-03 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT last name of exactly 25 characters (the maximum) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT last name of exactly 25 characters (the maximum) is accepted.
- **Response:** Hold: 200 pnr 83M4KA (8.5s)
- **Expected:** HTTP 200 with pnr; last name echoed all 25 characters.
- **Actual:** Hold 200 pnr 83M4KA echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83M4KA echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-BND-03):** PASS &mdash; 200 pnr 83M4KA (8.5s)

### TC-PAXNAME-BND-04 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT last name of 26 characters (one over the maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT last name of 26 characters (one over the maximum) is rejected.
- **Response:** Hold: 200 pnr 83N2AW (8.4s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.6s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 200 pnr 83N2AW | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 200 pnr 83N2AW | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-BND-04):** FAIL &mdash; 200 pnr 83N2AW (8.4s)
  - **Hop 6 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-BND-04):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.6s)

### TC-PAXNAME-BND-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with a 25-character first name AND a 25-character last name (ADT only, no infant) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT with a 25-character first name AND a 25-character last name (ADT only, no infant) is accepted.
- **Response:** Hold: 200 pnr 83MPA2 (8.3s)
- **Expected:** HTTP 200 with pnr. Without an infant the combined 59-character rule does not apply (ADT-only string = 25+2+25+3 + 4 delimiters = 59 anyway).
- **Actual:** Hold 200 pnr 83MPA2 echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83MPA2 echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-BND-05):** PASS &mdash; 200 pnr 83MPA2 (8.3s)

### TC-PAXNAME-BND-06 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with both first and last name at 26 characters is rejected with the 25-character limit message.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with both first and last name at 26 characters is rejected with the 25-character limit message.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrstu MR Lastabcdefghijklmnopqrstuv) of type ADT has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, w... (0.2s) || Book: 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrstu MR Lastabcdefghijklmnopqrstuv) of type ADT has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, w... (0.2s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present (covers both names); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: no 25-character Context entry | Book: no 25-character Context entry
- **Status:** FAIL
- **Evidence:** Hold: no 25-character Context entry | Book: no 25-character Context entry

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-06):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrstu MR Lastabcdefghijklmnopqrstuv) of type ADT has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.2s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-06):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrstu MR Lastabcdefghijklmnopqrstuv) of type ADT has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.2s)

### TC-PAXNAME-BND-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of 24 characters with a 2-character title is accepted (the title is not counted against the 25-character first-name limit).
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT first name of 24 characters with a 2-character title is accepted (the title is not counted against the 25-character first-name limit).
- **Response:** Hold: 200 pnr 83M5TT (7.7s)
- **Expected:** HTTP 200 with pnr. 24 &lt;= 25 under rule R1 whatever the title length.
- **Actual:** Hold 200 pnr 83M5TT echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83M5TT echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-07):** PASS &mdash; 200 pnr 83M5TT (7.7s)

### TC-PAXNAME-BND-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an INF first name of exactly 25 characters (with a tiny adult so the combined limit is not hit) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an INF first name of exactly 25 characters (with a tiny adult so the combined limit is not hit) is accepted.
- **Response:** Hold: 200 pnr 83MPAZ (7.6s)
- **Expected:** HTTP 200 with pnr; infant first name echoed all 25 characters. Pair total = 9 + 37 = 46 (+8 = 54 &lt;= 59).
- **Actual:** Hold 200 pnr 83MPAZ echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83MPAZ echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-08):** PASS &mdash; 200 pnr 83MPAZ (7.6s)

### TC-PAXNAME-BND-09 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an INF first name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an INF first name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Response:** Hold: 200 pnr 83MFNW (7.9s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.2s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry for the infant; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 200 pnr 83MFNW | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 200 pnr 83MFNW | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-09):** FAIL &mdash; 200 pnr 83MFNW (7.9s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-09):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.2s)

### TC-PAXNAME-BND-10 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an INF last name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an INF last name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Response:** Hold: 200 pnr 83M6ZT (8.9s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.4s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry for the infant; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 200 pnr 83M6ZT | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 200 pnr 83M6ZT | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-10):** FAIL &mdash; 200 pnr 83M6ZT (8.9s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-10):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.4s)

### TC-PAXNAME-BND-11 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD with a 25-character first name and a 25-character last name (alongside a short ADT) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold - Validate a CHD with a 25-character first name and a 25-character last name (alongside a short ADT) is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, w... (0.1s)
- **Expected:** HTTP 200 with pnr; CHD echoed untruncated. The combined 59 rule is ADT+INF only; a CHD is not summed.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-BND-11):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.1s)

### TC-PAXNAME-BND-12 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD first name of 26 characters is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a CHD first name of 26 characters is rejected.
- **Response:** Hold: 200 pnr 83MT4B (7.3s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.2s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry for the CHD; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 200 pnr 83MT4B | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 200 pnr 83MT4B | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-BND-12):** FAIL &mdash; 200 pnr 83MT4B (7.3s)
  - **Hop 6 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-BND-12):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.2s)

### TC-PAXNAME-BND-13 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of exactly 59 characters (51 + 8 delimiters, the maximum) is accepted on Hold and Book.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF combined passenger string of exactly 59 characters (51 + 8 delimiters, the maximum) is accepted on Hold and Book.
- **Response:** Hold: 200 pnr 83NL55 (7.5s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.6s)
- **Expected:** HTTP 200 with pnr on both endpoints. 51 names/titles/PTC characters + 8 delimiters = 59 = the limit, inclusive.
- **Actual:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-13):** FAIL &mdash; 200 pnr 83NL55 (7.5s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-13):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.6s)

### TC-PAXNAME-BND-14 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of 58 characters (one under the maximum) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an ADT + INF combined passenger string of 58 characters (one under the maximum) is accepted.
- **Response:** Hold: 200 pnr 83MQLD (7.8s)
- **Expected:** HTTP 200 with pnr. 50 + 8 = 58.
- **Actual:** Hold 200 pnr 83MQLD echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83MQLD echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-14):** PASS &mdash; 200 pnr 83MQLD (7.8s)

### TC-PAXNAME-BND-15 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of 60 characters (52 + 8, one over the maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF combined passenger string of 60 characters (52 + 8, one over the maximum) is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.5s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.4s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 52 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry (all names &lt;= 25); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.5s; Book 400 A0001, combined totals [52], 0.4s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.5s; Book 400 A0001, combined totals [52], 0.4s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.5s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BND-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.4s)

### TC-PAXNAME-BND-16 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of 61 characters (53 + 8, the stakeholder example total) is rejected even though every name is within 25 characters.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF combined passenger string of 61 characters (53 + 8, the stakeholder example total) is rejected even though every name is with...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefghi Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 char... (0.5s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefghi Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 char... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 53 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [53], 0.5s; Book 400 A0001, combined totals [53], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [53], 0.5s; Book 400 A0001, combined totals [53], 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefghi Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (AD... (0.5s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefghi Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (AD... (0.1s)

### TC-PAXNAME-BND-17 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT-only passenger with 25-character first and last names and the 3-character title Mrs (string length 60 incl. 4 delimiters) is accepted because the combined rule is ADT+INF only.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT-only passenger with 25-character first and last names and the 3-character title Mrs (string length 60 incl. 4 delimiters) is accept...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrst MRS Lastabcdefghijklmnopqrstu) of type ADT has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, wh... (0.1s)
- **Expected:** HTTP 200 with pnr. Rule R2 is stated for an Adult and Infant pair; an ADT with no infant is not subject to it.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrst MRS Lastabcdefghijklmnopqrstu) of type ADT has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrst MRS Lastabcdefghijklmnopqrstu) of type ADT has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-17):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger (Firstabcdefghijklmnopqrst MRS Lastabcdefghijklmnopqrstu) of type ADT has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.1s)

### TC-PAXNAME-BND-18 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate the adult title is counted exactly once in the combined limit (names sum 40 with title Mrs = 51, accepted).
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate the adult title is counted exactly once in the combined limit (names sum 40 with title Mrs = 51, accepted).
- **Response:** Hold: 200 pnr 83M7DM (7.4s)
- **Expected:** HTTP 200 with pnr. 40 name chars + Mrs(3) + MS(2) + 6 PTC = 51; 51 + 8 = 59.
- **Actual:** Hold 200 pnr 83M7DM echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83M7DM echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-18):** PASS &mdash; 200 pnr 83M7DM (7.4s)

### TC-PAXNAME-BND-19 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a longer adult title (Mrs instead of Mr) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a longer adult title (Mrs instead of Mr) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 charac... (0.2s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 charac... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 52 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.2s; Book 400 A0001, combined totals [52], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.2s; Book 400 A0001, combined totals [52], 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-19):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/... (0.2s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BND-19):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/... (0.1s)

### TC-PAXNAME-BND-20 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a longer infant title (MSTR instead of MS) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a longer infant title (MSTR instead of MS) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 charac... (0.2s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 charac... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 53 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [53], 0.2s; Book 400 A0001, combined totals [53], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [53], 0.2s; Book 400 A0001, combined totals [53], 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-20):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/... (0.2s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BND-20):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/... (0.1s)

### TC-PAXNAME-BND-21 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of 1,000 characters is rejected quickly with the 25-character message.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT first name of 1,000 characters is rejected quickly with the 25-character message.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second); the response body stays small (does not echo the 1,000-character name more than once per Context entry).
- **Actual:** Hold: no 25-character Context entry | Book: no 25-character Context entry
- **Status:** FAIL
- **Evidence:** Hold: no 25-character Context entry | Book: no 25-character Context entry

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-21):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-21):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s)

### TC-PAXNAME-BIZ-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an adult with 25/25 names plus a minimal infant is rejected by the combined 59 rule (every individual name is within 25).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an adult with 25/25 names plus a minimal infant is rejected by the combined 59 rule (every individual name is within 25).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Li Wu) totals 64 characters, exceeding the maximum allowed limit... (0.9s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Li Wu) totals 64 characters, exceeding the maximum allowed limit... (0.4s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 64 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [64], 0.9s; Book 400 A0001, combined totals [64], 0.4s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [64], 0.9s; Book 400 A0001, combined totals [64], 0.4s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-01):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Li Wu) totals 64 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger ty... (0.9s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-01):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Li Wu) totals 64 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger ty... (0.4s)

### TC-PAXNAME-BIZ-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a minimal adult with an infant carrying 25/25 names is rejected by the combined 59 rule.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a minimal adult with an infant carrying 25/25 names is rejected by the combined 59 rule.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Li Wu) and Infant (Infantabcdefghijklmnopqrs Minorabcdefghijklmnopqrst) totals 64 characters, exceeding the maximum allowed limit... (0.2s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Li Wu) and Infant (Infantabcdefghijklmnopqrs Minorabcdefghijklmnopqrst) totals 64 characters, exceeding the maximum allowed limit... (0.2s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 64 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [64], 0.2s; Book 400 A0001, combined totals [64], 0.2s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [64], 0.2s; Book 400 A0001, combined totals [64], 0.2s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Li Wu) and Infant (Infantabcdefghijklmnopqrs Minorabcdefghijklmnopqrst) totals 64 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger ty... (0.2s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Li Wu) and Infant (Infantabcdefghijklmnopqrs Minorabcdefghijklmnopqrst) totals 64 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger ty... (0.2s)

### TC-PAXNAME-BIZ-03 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD is excluded from the combined sum (ADT+INF pair at 59, CHD with 25/25 names) and the booking is accepted.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD+INF) then POST api/FlightBooking/Hold - Validate a CHD is excluded from the combined sum (ADT+INF pair at 59, CHD with 25/25 names) and the booking is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, w... (0.2s)
- **Expected:** HTTP 200 with pnr. Only the ADT and its linked INF are summed (51 + 8 = 59).
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-03):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrst MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 59 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.2s)

### TC-PAXNAME-BIZ-04 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate the combined sum uses the infant's linked adult: a 25/25 adult with no infant plus a short adult carrying the infant is accepted.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold - Validate the combined sum uses the infant's linked adult: a 25/25 adult with no infant plus a short adult carrying the infant is accepted.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED / (2.2s)
- **Expected:** HTTP 200 with pnr. The infant is linked to Pax2 (short) so the pair totals 16 + 16 = 32 (+8 = 40, well under 59); Pax1 (25/25) has no infant and is only subject to R1.
- **Actual:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-04):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED / (2.2s)

### TC-PAXNAME-BIZ-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate the same party with the infant linked to the long 25/25 adult is rejected by the combined 59 rule.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate the same party with the infant linked to the long 25/25 adult is rejected by the combined 59 rule.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Lina Ibrahim) totals 71 characters, exceeding the maximum allowe... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Lina Ibrahim) totals 71 characters, exceeding the maximum allowe... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 71 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [71], 0.1s; Book 400 A0001, combined totals [71], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [71], 0.1s; Book 400 A0001, combined totals [71], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-05):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Lina Ibrahim) totals 71 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passe... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 6 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Book (TC-PAXNAME-BIZ-05):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Firstabcdefghijklmnopqrst Lastabcdefghijklmnopqrstu) and Infant (Lina Ibrahim) totals 71 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passe... (0.1s)

### TC-PAXNAME-BIZ-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate that with two ADT+INF pairs only the offending second pair is reported (one combined entry, pair 1 is clean).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate that with two ADT+INF pairs only the offending second pair is reported (one combined entry, pair 1 is clean).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult (Kaabcdefghij Saab... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult (Kaabcdefghij Saab... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has exactly one combined-length entry (total 52) and none for pair 1 (51); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult (Kaabcdefghij Saabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BIZ-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult (Kaabcdefghij Saabcdefgh) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit... (0.1s)

### TC-PAXNAME-BIZ-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate that when both ADT+INF pairs exceed 59 the response reports each offending pair (two combined entries).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate that when both ADT+INF pairs exceed 59 the response reports each offending pair (two combined entries).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has two combined-length entries (totals 52 and 53); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52,53], 0.1s; Book 400 A0001, combined totals [52,53], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52,53], 0.1s; Book 400 A0001, combined totals [52,53], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-07):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BIZ-07):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)

### TC-PAXNAME-BIZ-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate two ADT+INF pairs that each sit exactly on the 59 limit are accepted.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold - Validate two ADT+INF pairs that each sit exactly on the 59 limit are accepted.
- **Response:** Hold: 200 pnr 83MXDM (7.5s)
- **Expected:** HTTP 200 with pnr; both pairs (51 + 8 = 59 each) accepted; the limit is per pair, not summed across the party.
- **Actual:** Hold 200 pnr 83MXDM echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83MXDM echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-08):** PASS &mdash; 200 pnr 83MXDM (7.5s)

### TC-PAXNAME-BIZ-09 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an adult middle name is not added to the combined 59 sum (pair at 59 plus an 11-character adult middle name is accepted).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an adult middle name is not added to the combined 59 sum (pair at 59 plus an 11-character adult middle name is accepted).
- **Response:** Hold: 200 pnr 83N4BL (8.1s)
- **Expected:** HTTP 200 with pnr. The combined string is defined over first name, last name, title and PTC only (per the rule text), so the middle name must not push the pair over.
- **Actual:** Hold 200 pnr 83N4BL echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83N4BL echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-09):** PASS &mdash; 200 pnr 83N4BL (8.1s)

### TC-PAXNAME-BIZ-10 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 1-character infant middle name is not added to the combined 59 sum (pair at 59 plus infant middle K is accepted).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate a 1-character infant middle name is not added to the combined 59 sum (pair at 59 plus infant middle K is accepted).
- **Response:** Hold: 200 pnr 83NNU7 (7.1s)
- **Expected:** HTTP 200 with pnr; same reasoning as the adult-middle-name case.
- **Actual:** Hold 200 pnr 83NNU7 echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NNU7 echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-10):** PASS &mdash; 200 pnr 83NNU7 (7.1s)

### TC-PAXNAME-BIZ-11 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate first (13) + middle (13) totalling 26 characters is accepted because rule R1 is per field.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate first (13) + middle (13) totalling 26 characters is accepted because rule R1 is per field.
- **Response:** Hold: 200 pnr 83NRNF (8.0s)
- **Expected:** HTTP 200 with pnr; first and middle echoed untruncated. R1 limits first name and last name individually.
- **Actual:** Hold 200 pnr 83NRNF echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NRNF echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-11):** PASS &mdash; 200 pnr 83NRNF (8.0s)

### TC-PAXNAME-BIZ-12 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 30-character middle name (first and last short) is handled with a controlled outcome.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 30-character middle name (first and last short) is handled with a controlled outcome.
- **Response:** Hold: 200 pnr 83NWD6 (7.2s)
- **Expected:** Controlled outcome: HTTP 200 with the middle name echoed without silent truncation, or an HTTP 4xx validation error. Never 5xx.
- **Actual:** Controlled outcome - Hold: 200 accepted pnr 83NWD6
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 200 accepted pnr 83NWD6 | OBSERVED: Hold: 200 accepted pnr 83NWD6

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-12):** PASS &mdash; 200 pnr 83NWD6 (7.2s)

### TC-PAXNAME-BIZ-13 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 20-character title on short names is rejected by the combined 59 rule (total 53) rather than silently truncated.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 20-character title on short names is rejected by the combined 59 rule (total 53) rather than silently truncated.
- **Response:** Hold: 400  {"status":400,"transactionId":"d6d55d2f-312e-4cf8-8b56-bd40cedf8a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"91981420-a252-44eb-aa7c-e09116073429","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 53 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 400  {"status":400,"transactionId":"d6d55d2f-312e-4cf8-8b56-bd40cedf8a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"The JSON | Book: expected 400 A0001, got 400  {"status":400,"transactionId":"91981420-a252-44eb-aa7c-e09116073429","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.title","valu
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 400  {"status":400,"transactionId":"d6d55d2f-312e-4cf8-8b56-bd40cedf8a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"The JSON | Book: expected 400 A0001, got 400  {"status":400,"transactionId":"91981420-a252-44eb-aa7c-e09116073429","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.title","valu

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-13):** FAIL &mdash; 400  {"status":400,"transactionId":"d6d55d2f-312e-4cf8-8b56-bd40cedf8a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-13):** FAIL &mdash; 400  {"status":400,"transactionId":"91981420-a252-44eb-aa7c-e09116073429","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.titl... (0.1s)

### TC-PAXNAME-BIZ-14 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate pair evaluation does not depend on key order: an infant listed before its adult (Pax1=INF, Pax2=ADT) at 52 is rejected.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (INF+ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate pair evaluation does not depend on key order: an infant listed before its adult (Pax1=INF, Pax2=ADT) at 52 is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 52 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-14):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BIZ-14):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)

### TC-PAXNAME-BIZ-15 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an infant with no ParentPaxRefId and over-limit names returns a controlled 4xx.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an infant with no ParentPaxRefId and over-limit names returns a controlled 4xx.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. (0.1s)
- **Expected:** HTTP 4xx controlled validation error (exact code UNKNOWN - record whether the name rule or the missing-parent rule fires first); never 5xx; no PNR.
- **Actual:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger.; Book 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger.
- **Status:** PASS
- **Evidence:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger.; Book 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Book: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger.

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. (0.1s)

### TC-PAXNAME-BIZ-16 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an infant whose ParentPaxRefId points to a non-existent passenger (Pax9) with short names is rejected.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an infant whose ParentPaxRefId points to a non-existent passenger (Pax9) with short names is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList. (0.1s)
- **Expected:** HTTP 4xx controlled validation error; never 5xx; no PNR created with an orphan infant.
- **Actual:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList.; Book 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList.
- **Status:** PASS
- **Evidence:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList.; Book 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList. || Book: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList.

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId 'Pax9' does not exist in PassengersList. (0.1s)

### TC-PAXNAME-NEG-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty-string ADT first name is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty-string ADT first name is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"2b737e9a-b68a-4919-864d-ad9fb3cf9a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"9faf72fe-2b8e-4d67-a73b-a9e55dc3abf2","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"2b737e9a-b68a-4919-864d-ad9fb3cf9a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"9faf72fe-2b8e-4d67-a73b-a9e55dc3abf2","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"2b737e9a-b68a-4919-864d-ad9fb3cf9a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"9faf72fe-2b8e-4d67-a73b-a9e55dc3abf2","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"2b737e9a-b68a-4919-864d-ad9fb3cf9a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"9faf72fe-2b8e-4d67-a73b-a9e55dc3abf2","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-01):** PASS &mdash; 400  {"status":400,"transactionId":"2b737e9a-b68a-4919-864d-ad9fb3cf9a50","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-01):** PASS &mdash; 400  {"status":400,"transactionId":"9faf72fe-2b8e-4d67-a73b-a9e55dc3abf2","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.1s)

### TC-PAXNAME-NEG-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty-string ADT last name is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty-string ADT last name is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"aa1c40c8-5ee8-4481-bc3c-604004841a60","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"4834c528-8e19-447b-b86f-aabf1bc05a08","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"aa1c40c8-5ee8-4481-bc3c-604004841a60","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"4834c528-8e19-447b-b86f-aabf1bc05a08","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"aa1c40c8-5ee8-4481-bc3c-604004841a60","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"4834c528-8e19-447b-b86f-aabf1bc05a08","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"aa1c40c8-5ee8-4481-bc3c-604004841a60","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"4834c528-8e19-447b-b86f-aabf1bc05a08","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-02):** PASS &mdash; 400  {"status":400,"transactionId":"aa1c40c8-5ee8-4481-bc3c-604004841a60","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."},{"name":"PassengersList[0].Value.Trave... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-02):** PASS &mdash; 400  {"status":400,"transactionId":"4834c528-8e19-447b-b86f-aabf1bc05a08","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."},{"name":"PassengersList[0].Value.Trave... (0.1s)

### TC-PAXNAME-NEG-03 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a whitespace-only ADT first name is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a whitespace-only ADT first name is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"397d1bb2-222b-4f20-9115-d9dcc2cf4503","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"09376b09-11ec-47e9-9e08-d0818b47b760","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"397d1bb2-222b-4f20-9115-d9dcc2cf4503","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"09376b09-11ec-47e9-9e08-d0818b47b760","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"397d1bb2-222b-4f20-9115-d9dcc2cf4503","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"09376b09-11ec-47e9-9e08-d0818b47b760","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"397d1bb2-222b-4f20-9115-d9dcc2cf4503","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"09376b09-11ec-47e9-9e08-d0818b47b760","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-03):** PASS &mdash; 400  {"status":400,"transactionId":"397d1bb2-222b-4f20-9115-d9dcc2cf4503","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-03):** PASS &mdash; 400  {"status":400,"transactionId":"09376b09-11ec-47e9-9e08-d0818b47b760","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.1s)

### TC-PAXNAME-NEG-04 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with the name.first key omitted is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with the name.first key omitted is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"650f67d3-5f31-442f-b050-007636f27eaa","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"aee7d7c1-0693-4040-9b18-65c31c649fa5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"650f67d3-5f31-442f-b050-007636f27eaa","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"aee7d7c1-0693-4040-9b18-65c31c649fa5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"650f67d3-5f31-442f-b050-007636f27eaa","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"aee7d7c1-0693-4040-9b18-65c31c649fa5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"650f67d3-5f31-442f-b050-007636f27eaa","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"aee7d7c1-0693-4040-9b18-65c31c649fa5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-04):** PASS &mdash; 400  {"status":400,"transactionId":"650f67d3-5f31-442f-b050-007636f27eaa","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."}],"originalSupplierRequest":null,"ori... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-04):** PASS &mdash; 400  {"status":400,"transactionId":"aee7d7c1-0693-4040-9b18-65c31c649fa5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."}],"originalSupplierRequest":null,"ori... (0.1s)

### TC-PAXNAME-NEG-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with the whole name object omitted is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with the whole name object omitted is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"b1a39562-f3fb-4e5b-bc15-0efd5cd6333f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"a9c8c025-ae97-4da2-8bd3-83bb338eea73","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"b1a39562-f3fb-4e5b-bc15-0efd5cd6333f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"a9c8c025-ae97-4da2-8bd3-83bb338eea73","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"b1a39562-f3fb-4e5b-bc15-0efd5cd6333f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"a9c8c025-ae97-4da2-8bd3-83bb338eea73","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"b1a39562-f3fb-4e5b-bc15-0efd5cd6333f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"a9c8c025-ae97-4da2-8bd3-83bb338eea73","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-05):** PASS &mdash; 400  {"status":400,"transactionId":"b1a39562-f3fb-4e5b-bc15-0efd5cd6333f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name","value":"The Name field is required."}],"originalSupplierRequest":null,"originalSu... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-05):** PASS &mdash; 400  {"status":400,"transactionId":"a9c8c025-ae97-4da2-8bd3-83bb338eea73","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name","value":"The Name field is required."}],"originalSupplierRequest":null,"originalSu... (0.1s)

### TC-PAXNAME-NEG-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with name.last set to null is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with name.last set to null is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"c61112ff-88cd-44c4-8203-001421d68a0d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"97228eaf-82ae-4a88-a5ae-f32ede1f30e0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"c61112ff-88cd-44c4-8203-001421d68a0d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"97228eaf-82ae-4a88-a5ae-f32ede1f30e0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"c61112ff-88cd-44c4-8203-001421d68a0d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"97228eaf-82ae-4a88-a5ae-f32ede1f30e0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"c61112ff-88cd-44c4-8203-001421d68a0d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"97228eaf-82ae-4a88-a5ae-f32ede1f30e0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-06):** PASS &mdash; 400  {"status":400,"transactionId":"c61112ff-88cd-44c4-8203-001421d68a0d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."}],"originalSupplierRequest":null,"origi... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-06):** PASS &mdash; 400  {"status":400,"transactionId":"97228eaf-82ae-4a88-a5ae-f32ede1f30e0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."}],"originalSupplierRequest":null,"origi... (0.1s)

### TC-PAXNAME-NEG-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty-string ADT title is rejected or handled in a controlled way.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty-string ADT title is rejected or handled in a controlled way.
- **Response:** Hold: 400  {"status":400,"transactionId":"03803957-5018-48d6-b29a-aa926adbd07a","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"eaa232b9-045d-4a5c-b567-b600ff048374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** Controlled outcome: HTTP 4xx, or HTTP 200 with a defaulted title; never 5xx. UNKNOWN - confirm live.
- **Actual:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"03803957-5018-48d6-b29a-aa926adbd07a","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol... || Book: 400  {"status":400,"transactionId":"eaa232b9-045d-4a5c-b567-b600ff048374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"T...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"03803957-5018-48d6-b29a-aa926adbd07a","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol... || Book: 400  {"status":400,"transactionId":"eaa232b9-045d-4a5c-b567-b600ff048374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"T... | OBSERVED: Hold: 400  {"status":400,"transactionId":"03803957-5018-48d6-b29a-aa926adbd07a","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol... || Book: 400  {"status":400,"transactionId":"eaa232b9-045d-4a5c-b567-b600ff048374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"T...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-NEG-07):** PASS &mdash; 400  {"status":400,"transactionId":"03803957-5018-48d6-b29a-aa926adbd07a","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"... (0.1s)
  - **Hop 6 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-NEG-07):** PASS &mdash; 400  {"status":400,"transactionId":"eaa232b9-045d-4a5c-b567-b600ff048374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.titl... (0.1s)

### TC-PAXNAME-NEG-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with the title key omitted is rejected or handled in a controlled way.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with the title key omitted is rejected or handled in a controlled way.
- **Response:** Hold: 400  {"status":400,"transactionId":"a8b0a7d5-b85b-44a8-ab94-54758c0529fb","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"2b061c61-29e1-4ee4-9338-52d4e65c7a0e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** Controlled outcome: HTTP 4xx, or HTTP 200 with a defaulted title; never 5xx. UNKNOWN - confirm live.
- **Actual:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"a8b0a7d5-b85b-44a8-ab94-54758c0529fb","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... || Book: 400  {"status":400,"transactionId":"2b061c61-29e1-4ee4-9338-52d4e65c7a0e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"a8b0a7d5-b85b-44a8-ab94-54758c0529fb","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... || Book: 400  {"status":400,"transactionId":"2b061c61-29e1-4ee4-9338-52d4e65c7a0e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... | OBSERVED: Hold: 400  {"status":400,"transactionId":"a8b0a7d5-b85b-44a8-ab94-54758c0529fb","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... || Book: 400  {"status":400,"transactionId":"2b061c61-29e1-4ee4-9338-52d4e65c7a0e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-NEG-08):** PASS &mdash; 400  {"status":400,"transactionId":"a8b0a7d5-b85b-44a8-ab94-54758c0529fb","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","value":"Select a valid title"}],"originalSupplierRequest":null,"originalSupplier... (0.1s)
  - **Hop 5 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 6 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Book (TC-PAXNAME-NEG-08):** PASS &mdash; 400  {"status":400,"transactionId":"2b061c61-29e1-4ee4-9338-52d4e65c7a0e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","value":"Select a valid title"}],"originalSupplierRequest":null,"originalSupplier... (0.1s)

### TC-PAXNAME-NEG-09 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty-string INF first name (with its adult) is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty-string INF first name (with its adult) is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"9646ef19-99fc-44de-a478-4dafe178149e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.2s) || Book: 400  {"status":400,"transactionId":"519cab71-52fd-4cec-a5ce-f7cee3e15fc1","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"9646ef19-99fc-44de-a478-4dafe178149e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"519cab71-52fd-4cec-a5ce-f7cee3e15fc1","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"9646ef19-99fc-44de-a478-4dafe178149e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"519cab71-52fd-4cec-a5ce-f7cee3e15fc1","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"9646ef19-99fc-44de-a478-4dafe178149e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"519cab71-52fd-4cec-a5ce-f7cee3e15fc1","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-09):** PASS &mdash; 400  {"status":400,"transactionId":"9646ef19-99fc-44de-a478-4dafe178149e","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[1].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[1].Value.Tra... (0.2s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-09):** PASS &mdash; 400  {"status":400,"transactionId":"519cab71-52fd-4cec-a5ce-f7cee3e15fc1","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[1].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[1].Value.Tra... (0.1s)

### TC-PAXNAME-NEG-10 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty passengersList object is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty passengersList object is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers in fare confirm is mismatched... (0.1s) || Book: 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers in fare confirm is mismatched... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers...; Book 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers...
- **Status:** PASS
- **Evidence:** Hold 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers...; Book 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers in fare confirm is mismatched... || Book: 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers in fare confirm is mismatched...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-10):** PASS &mdash; 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers in fare confirm is mismatched with the request (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-10):** PASS &mdash; 400 NDC-INT-TEC-A0001 PassengersList must contain at least one passenger. || All contact info should have at least one reference to a passenger || Number of passengers in fare confirm is mismatched with the request (0.1s)

### TC-PAXNAME-NEG-11 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a null passengersList is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a null passengersList is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"2889d08b-5542-4868-b795-fcd65314081d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"baa93017-7cd0-49dc-98d0-0fa0ac6ae5dc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"2889d08b-5542-4868-b795-fcd65314081d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"baa93017-7cd0-49dc-98d0-0fa0ac6ae5dc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"2889d08b-5542-4868-b795-fcd65314081d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"baa93017-7cd0-49dc-98d0-0fa0ac6ae5dc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"2889d08b-5542-4868-b795-fcd65314081d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"baa93017-7cd0-49dc-98d0-0fa0ac6ae5dc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-11):** PASS &mdash; 400  {"status":400,"transactionId":"2889d08b-5542-4868-b795-fcd65314081d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList","value":"The PassengersList field is required."}],"originalSupplierRequest":null,"originalSuppli... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-11):** PASS &mdash; 400  {"status":400,"transactionId":"baa93017-7cd0-49dc-98d0-0fa0ac6ae5dc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList","value":"The PassengersList field is required."}],"originalSupplierRequest":null,"originalSuppli... (0.1s)

### TC-PAXNAME-NEG-12 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a numeric (non-string) name.first value is rejected without a 5xx.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a numeric (non-string) name.first value is rejected without a 5xx.
- **Response:** Hold: 400  {"status":400,"transactionId":"b3c7cb6d-d56a-403b-8088-3ee125db6832","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"29ec1613-64ee-4fa7-be0e-a4cc2bb06a5f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"b3c7cb6d-d56a-403b-8088-3ee125db6832","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"29ec1613-64ee-4fa7-be0e-a4cc2bb06a5f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"b3c7cb6d-d56a-403b-8088-3ee125db6832","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"29ec1613-64ee-4fa7-be0e-a4cc2bb06a5f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"b3c7cb6d-d56a-403b-8088-3ee125db6832","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... || Book: 400  {"status":400,"transactionId":"29ec1613-64ee-4fa7-be0e-a4cc2bb06a5f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-12):** PASS &mdash; 400  {"status":400,"transactionId":"b3c7cb6d-d56a-403b-8088-3ee125db6832","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.name.first","val... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-12):** PASS &mdash; 400  {"status":400,"transactionId":"29ec1613-64ee-4fa7-be0e-a4cc2bb06a5f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.name... (0.1s)

### TC-PAXNAME-NEG-13 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an object-typed name.first value is rejected without a 5xx.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an object-typed name.first value is rejected without a 5xx.
- **Response:** Hold: 400  {"status":400,"transactionId":"41a3764c-997b-4dea-a126-61e059872c1f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"bb78daff-a16f-4dbd-bb91-5ee09a3c1bd5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"41a3764c-997b-4dea-a126-61e059872c1f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"bb78daff-a16f-4dbd-bb91-5ee09a3c1bd5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"41a3764c-997b-4dea-a126-61e059872c1f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"bb78daff-a16f-4dbd-bb91-5ee09a3c1bd5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"41a3764c-997b-4dea-a126-61e059872c1f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... || Book: 400  {"status":400,"transactionId":"bb78daff-a16f-4dbd-bb91-5ee09a3c1bd5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-13):** PASS &mdash; 400  {"status":400,"transactionId":"41a3764c-997b-4dea-a126-61e059872c1f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.name.first","val... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-13):** PASS &mdash; 400  {"status":400,"transactionId":"bb78daff-a16f-4dbd-bb91-5ee09a3c1bd5","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.name... (0.1s)

### TC-PAXNAME-NEG-14 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 10,000-character ADT last name is rejected without a 5xx or an oversized reflected response.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 10,000-character ADT last name is rejected without a 5xx or an oversized reflected response.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s)
- **Expected:** HTTP 400 NDC-INT-TEC-A0001 with the 25-character message; never 5xx; no PNR; response body well under 100 KB.
- **Actual:** Hold: no 25-character Context entry | Book: no 25-character Context entry
- **Status:** FAIL
- **Evidence:** Hold: no 25-character Context entry | Book: no 25-character Context entry

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-14):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-14):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s)

### TC-PAXNAME-NEG-15 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit name together with an invalid fareConfirmResponseId returns a controlled 4xx and records which validation fires first.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an over-limit name together with an invalid fareConfirmResponseId returns a controlled 4xx and records which validation fires first.
- **Response:** Hold: 400  {"status":400,"transactionId":"363dbacc-2cb5-4002-aede-9fe8f0069bf8","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.2s)
- **Expected:** HTTP 4xx controlled error; never 5xx; no PNR. Record whether the name rule or the id rule is reported first (UNKNOWN).
- **Actual:** Hold 400  {"status":400,"transactionId":"363dbacc-2cb5-4002-aede-9fe8f0069bf8","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"363dbacc-2cb5-4002-aede-9fe8f0069bf8","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"363dbacc-2cb5-4002-aede-9fe8f0069bf8","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-15):** PASS &mdash; 400  {"status":400,"transactionId":"363dbacc-2cb5-4002-aede-9fe8f0069bf8","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.fareConfirmResponseId","value":"The ... (0.2s)

### TC-PAXNAME-NEG-16 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit name together with a missing contactsList returns a controlled 4xx.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an over-limit name together with a missing contactsList returns a controlled 4xx.
- **Response:** Hold: 400  {"status":400,"transactionId":"dff15fc8-8557-4c17-a5be-4c432392e592","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"ContactsList... (0.1s)
- **Expected:** HTTP 4xx controlled error; never 5xx; no PNR. Record which validation is reported first (UNKNOWN).
- **Actual:** Hold 400  {"status":400,"transactionId":"dff15fc8-8557-4c17-a5be-4c432392e592","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"dff15fc8-8557-4c17-a5be-4c432392e592","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"dff15fc8-8557-4c17-a5be-4c432392e592","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"ContactsList...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-16):** PASS &mdash; 400  {"status":400,"transactionId":"dff15fc8-8557-4c17-a5be-4c432392e592","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"ContactsList","value":"The ContactsList field is required."}],"originalSupplierRequest":null,"originalSupplierRe... (0.1s)

### TC-PAXNAME-VAL-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 25-character first name that contains an embedded space is accepted (the space counts as one of the 25).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 25-character first name that contains an embedded space is accepted (the space counts as one of the 25).
- **Response:** Hold: 200 pnr 83NH9L (7.0s)
- **Expected:** HTTP 200 with pnr; first name echoed 25 characters including the space.
- **Actual:** Hold 200 pnr 83NH9L echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NH9L echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-01):** PASS &mdash; 200 pnr 83NH9L (7.0s)

### TC-PAXNAME-VAL-02 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 26-character first name that contains an embedded space is rejected (the space is counted).
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 26-character first name that contains an embedded space is rejected (the space is counted).
- **Response:** Hold: 200 pnr 83NNAS (7.3s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.6s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 200 pnr 83NNAS | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 200 pnr 83NNAS | Book: expected 400 A0001, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-02):** FAIL &mdash; 200 pnr 83NNAS (7.3s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-02):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.6s)

### TC-PAXNAME-VAL-03 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 25-character hyphenated last name is accepted.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 25-character hyphenated last name is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-A' must only contain letters and spaces. (0.1s)
- **Expected:** HTTP 200 with pnr; last name echoed untruncated with its hyphens.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-A' must only contain letters and spaces.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-A' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-03):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-A' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-04 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 25-character last name with apostrophes (O'Connor style) is accepted.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 25-character last name with apostrophes (O'Connor style) is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Connor-O'Brien-O'Malley' must only contain letters and spaces. (0.1s)
- **Expected:** HTTP 200 with pnr; last name echoed untruncated with its apostrophes.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Connor-O'Brien-O'Malley' must only contain letters and spaces.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Connor-O'Brien-O'Malley' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-04):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Connor-O'Brien-O'Malley' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-05 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 26-character hyphenated last name is rejected.
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 26-character hyphenated last name is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: no 25-character Context entry | Book: no 25-character Context entry
- **Status:** FAIL
- **Evidence:** Hold: no 25-character Context entry | Book: no 25-character Context entry

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-05):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-05):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name of 25 letters plus one trailing space (26 raw characters) is handled consistently (trimmed or counted).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name of 25 letters plus one trailing space (26 raw characters) is handled consistently (trimmed or counted).
- **Response:** Hold: 200 pnr 83P98M (6.8s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. Preferred: trailing whitespace trimmed, 25 letters accepted.
- **Actual:** Controlled outcome - Hold: 200 accepted pnr 83P98M
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 200 accepted pnr 83P98M | OBSERVED: Hold: 200 accepted pnr 83P98M

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-VAL-06):** PASS &mdash; 200 pnr 83P98M (6.8s)

### TC-PAXNAME-VAL-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name of one leading space plus 25 letters (26 raw characters) is handled consistently (trimmed or counted).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name of one leading space plus 25 letters (26 raw characters) is handled consistently (trimmed or counted).
- **Response:** Hold: 200 pnr 83O7RJ (8.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. Preferred: leading whitespace trimmed, 25 letters accepted.
- **Actual:** Controlled outcome - Hold: 200 accepted pnr 83O7RJ
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 200 accepted pnr 83O7RJ | OBSERVED: Hold: 200 accepted pnr 83O7RJ

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-VAL-07):** PASS &mdash; 200 pnr 83O7RJ (8.1s)

### TC-PAXNAME-VAL-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name containing a digit (John2) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name containing a digit (John2) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'John2' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'John2' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'John2' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'John2' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-VAL-08):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'John2' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-09 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 5-letter Arabic first name (U+0645 U+0635 U+0637 U+0641 U+0649) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 5-letter Arabic first name (U+0645 U+0635 U+0637 U+0641 U+0649) is handled with a controlled outcome.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (1.8s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]
- **Status:** FAIL
- **Evidence:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] | OBSERVED: Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-09):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (1.8s)

### TC-PAXNAME-VAL-10 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 26-character Arabic first name is rejected (length rule applies to non-Latin names).
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 26-character Arabic first name is rejected (length rule applies to non-Latin names).
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (1.6s) || Book: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (2.6s)
- **Expected:** HTTP 400 controlled validation error (the 25-character message and/or a character-set rejection); never 5xx; no PNR.
- **Actual:** Hold 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]; Book 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]
- **Status:** PASS
- **Evidence:** Hold 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]; Book 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] | OBSERVED: Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] || Book: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-10):** PASS &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (1.6s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-VAL-10):** PASS &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (2.6s)

### TC-PAXNAME-VAL-11 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate accented Latin names (José / Müller) are handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate accented Latin names (José / Müller) are handled with a controlled outcome.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)] (1.7s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. If accepted, check whether the diacritics are preserved or folded.
- **Actual:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)]
- **Status:** FAIL
- **Evidence:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)] | OBSERVED: Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-11):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)] (1.7s)

### TC-PAXNAME-VAL-12 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a decomposed-accent first name (13 x "e" + U+0301 = 13 visible letters, 26 code units) is handled consistently with the 25 limit.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a decomposed-accent first name (13 x "e" + U+0301 = 13 visible letters, 26 code units) is handled consistently with the 25 limit.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. (0.2s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. Length is measured in UTF-16 code units (26) or graphemes (13); record which.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-12):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. (0.2s)

### TC-PAXNAME-VAL-13 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name of 13 emoji (U+1F600 x 13 = 13 code points, 26 UTF-16 units) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name of 13 emoji (U+1F600 x 13 = 13 code points, 26 UTF-16 units) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. (0.2s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-13):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. (0.2s)

### TC-PAXNAME-VAL-14 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name containing the combined-string delimiter "/" (A/B) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name containing the combined-string delimiter "/" (A/B) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A/B' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A/B' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A/B' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A/B' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-VAL-14):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A/B' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-15 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a last name containing the delimiters "(" and ")" (C(ADT)) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a last name containing the delimiters "(" and ")" (C(ADT)) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'C(ADT)' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'C(ADT)' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'C(ADT)' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'C(ADT)' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-VAL-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'C(ADT)' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-16 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name containing a line break and a tab is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name containing a line break and a tab is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mos
tafa	' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mos
tafa	' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mos
tafa	' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mos
tafa	' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-VAL-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mos
tafa	' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-17 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 25-character all-lowercase first name is accepted and echoed (case does not change the length).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 25-character all-lowercase first name is accepted and echoed (case does not change the length).
- **Response:** Hold: 200 pnr 83NPJF (6.8s)
- **Expected:** HTTP 200 with pnr; name echoed 25 characters (upper-cased by the supplier layer).
- **Actual:** Hold 200 pnr 83NPJF echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NPJF echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-17):** PASS &mdash; 200 pnr 83NPJF (6.8s)

### TC-PAXNAME-VAL-18 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify the name-limit rejection envelope: Status 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage, GUID TransactionId, Context[] of {Value} objects, JSON content type.
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the name-limit rejection envelope: Status 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage, GUID TransactionId, Context[] of {Value} objects, ...
- **Response:** Hold: 200 pnr 83OAQZ (6.6s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.8s)
- **Expected:** HTTP 400; body = { Status:400, TransactionId:&lt;GUID&gt;, ErrorCode:"NDC-INT-TEC-A0001", ErrorMessage:"Invalid request. Please check the request parameters and try again.", Context:[{Value:"..."}] }; Content-Type application/json; identical on Hold and Book.
- **Actual:** Hold: Status/HTTP not 400 | Book: Status/HTTP not 400
- **Status:** FAIL
- **Evidence:** Hold: Status/HTTP not 400 | Book: Status/HTTP not 400

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-18):** FAIL &mdash; 200 pnr 83OAQZ (6.6s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-18):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.8s)

### TC-PAXNAME-VAL-19 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify the lengths reported in the 25-character message equal the actual lengths of the submitted first and last names.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Verify the lengths reported in the 25-character message equal the actual lengths of the submitted first and last names.
- **Response:** Hold: 200 pnr 83NUPG (7.2s)
- **Expected:** Context[] entry reads "&lt;first&gt;: 26 | &lt;last&gt; : 9 =&gt; ..." - i.e. the figures equal the raw name lengths (26 and 9).
- **Actual:** no parsable name entry: 200 pnr 83NUPG
- **Status:** FAIL
- **Evidence:** no parsable name entry: 200 pnr 83NUPG

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-19):** FAIL &mdash; 200 pnr 83NUPG (7.2s)

### TC-PAXNAME-VAL-20 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify the combined-length message arithmetic: total = sum of first+title+last+PTC, delimiters = 8, and the quoted adult string matches the submitted passengers.
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the combined-length message arithmetic: total = sum of first+title+last+PTC, delimiters = 8, and the quoted adult string matches the submitt...
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED / (1.8s) || Book: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED / (2.7s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] quotes "Adult '&lt;first&gt; &lt;TITLE&gt;/&lt;last&gt;(ADT)(INF&lt;first&gt; &lt;TITLE&gt;/&lt;last&gt;)'" built from the submitted data, "totals N characters" with N equal to the independently computed sum, "length 8", limit 59.
- **Actual:** Hold: no combined entry: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED / | Book: no combined entry: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: no combined entry: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED / | Book: no combined entry: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-20):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED / (1.8s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-VAL-20):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHER MR ALEXANDERSSON =&gt; ITEM TOO LONG / NOT ENTERED / (2.7s)

### TC-PAXNAME-VAL-21 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify one name-limit entry is returned per offending passenger (ADT first name and INF last name over 25 give two name entries plus the combined entry).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify one name-limit entry is returned per offending passenger (ADT first name and INF last name over 25 give two name entries plus the combined e...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Adultabcdefghijklmnopqrstu Ibrahim) and Infant (Lina Infantabcdefghijklmnopqrst) totals 73 characters, exceeding the maximum allo... (0.1s)
- **Expected:** Context[] has exactly two "exceeds the maximum allowed limit of 25" entries (one per offending passenger) and one combined-length entry; no duplicates.
- **Actual:** 0 name entries (expected 2) and 1 combined entry (expected 1): The combined passenger information for Adult (Adultabcdefghijklmnopqrstu Ibrahim) and Infant (Lina Infantabcdefghijklmnopqrst) totals 73 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/INF). When the adult and infant have the same last name, the maximum allowed is 57 characters; other...
- **Status:** FAIL
- **Evidence:** 0 name entries (expected 2) and 1 combined entry (expected 1): The combined passenger information for Adult (Adultabcdefghijklmnopqrstu Ibrahim) and Infant (Lina Infantabcdefghijklmnopqrst) totals 73 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/INF). When the adult and infant have the same last name, the maximum allowed is 57 characters; other...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-21):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Adultabcdefghijklmnopqrstu Ibrahim) and Infant (Lina Infantabcdefghijklmnopqrst) totals 73 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, pas... (0.1s)

### TC-PAXNAME-VAL-22 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify the same invalid passengersList returns an identical error body on three consecutive calls (only TransactionId differs).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Verify the same invalid passengersList returns an identical error body on three consecutive calls (only TransactionId differs).
- **Response:** Hold: 200 pnr 83OYLL (8.1s) || Hold: 200 pnr 83NYGB (6.9s) || Hold: 409 NDC-INT-BYP-A0001 EC (1.0s)
- **Expected:** Three calls give the same Status, ErrorCode, ErrorMessage and Context[]; only TransactionId changes.
- **Actual:** responses differ: 200 pnr 83OYLL || 200 pnr 83NYGB || 409 NDC-INT-BYP-A0001 EC
- **Status:** FAIL
- **Evidence:** responses differ: 200 pnr 83OYLL || 200 pnr 83NYGB || 409 NDC-INT-BYP-A0001 EC

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-22):** FAIL &mdash; 200 pnr 83OYLL (8.1s)
  - **Hop 2 &mdash; V1 Hold (TC-PAXNAME-VAL-22):** FAIL &mdash; 200 pnr 83NYGB (6.9s)
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-22):** FAIL &mdash; 409 NDC-INT-BYP-A0001 EC (1.0s)

### TC-PAXNAME-VAL-23 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the same over-limit passengersList returns the same error on Hold and Book (cross-endpoint consistency).
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the same over-limit passengersList returns the same error on Hold and Book (cross-endpoint consistency).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s)
- **Expected:** Hold and Book return the same HTTP status, ErrorCode, ErrorMessage and Context[] for the identical passengersList.
- **Actual:** Hold and Book return identical status/ErrorCode/ErrorMessage/Context
- **Status:** PASS
- **Evidence:** Hold and Book return identical status/ErrorCode/ErrorMessage/Context

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)

### TC-PAXNAME-VAL-24 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the name-limit rejection is returned before any supplier call (response under 2 seconds, three repeats, no PNR).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify the name-limit rejection is returned before any supplier call (response under 2 seconds, three repeats, no PNR).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s) || Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s) || Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 chara... (0.1s)
- **Expected:** Three consecutive rejections each return in under 2 seconds with no pnr/gdsPNR - the check runs in the integration layer, not after an Amadeus round trip (a Hold that reaches Amadeus takes ~7 s).
- **Actual:** 3 rejections in 0.1s, 0.1s, 0.1s, no PNR (a reaching-Amadeus Hold takes ~7s)
- **Status:** PASS
- **Evidence:** 3 rejections in 0.1s, 0.1s, 0.1s, no PNR (a reaching-Amadeus Hold takes ~7s)

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-24):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)
  - **Hop 2 &mdash; V1 Hold (TC-PAXNAME-VAL-24):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-24):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghi Ibabcdefghi) and Infant (Liabcdefgh Naabcdefgh) totals 52 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT... (0.1s)

### TC-PAXNAME-SEC-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit passengersList without the x-api-key header is rejected as unauthenticated, not as a name-validation error.
- **Category:** Security
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an over-limit passengersList without the x-api-key header is rejected as unauthenticated, not as a name-validation error.
- **Response:** Hold: 401 AuthenticationError Invalid authorization header (0.1s) || Book: 401 AuthenticationError Invalid authorization header (0.2s)
- **Expected:** HTTP 401/403 (authentication precedes validation); the body does not disclose the Amadeus name rules; no PNR.
- **Actual:** Hold 401 {"Status":401,"TransactionId":"ee6f8ccb-a51c-48ff-b8dd-3c40a7f690f6","ErrorCode":"AuthenticationE...; Book 401 {"Status":401,"TransactionId":"850b1191-3a82-42eb-bcc1-9cf510913fe4","ErrorCode":"AuthenticationE...
- **Status:** PASS
- **Evidence:** Hold 401 {"Status":401,"TransactionId":"ee6f8ccb-a51c-48ff-b8dd-3c40a7f690f6","ErrorCode":"AuthenticationE...; Book 401 {"Status":401,"TransactionId":"850b1191-3a82-42eb-bcc1-9cf510913fe4","ErrorCode":"AuthenticationE...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-01):** PASS &mdash; 401 AuthenticationError Invalid authorization header (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-SEC-01):** PASS &mdash; 401 AuthenticationError Invalid authorization header (0.2s)

### TC-PAXNAME-SEC-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit passengersList with an invalid x-api-key is rejected as unauthenticated.
- **Category:** Security
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an over-limit passengersList with an invalid x-api-key is rejected as unauthenticated.
- **Response:** Hold: 401 AuthenticationError Invalid authorization header (0.1s)
- **Expected:** HTTP 401/403; the body does not disclose the Amadeus name rules; no PNR.
- **Actual:** Hold 401 {"Status":401,"TransactionId":"5b80d558-06f4-4ccb-957f-ea1624d11d4b","ErrorCode":"AuthenticationE...
- **Status:** PASS
- **Evidence:** Hold 401 {"Status":401,"TransactionId":"5b80d558-06f4-4ccb-957f-ea1624d11d4b","ErrorCode":"AuthenticationE...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-02):** PASS &mdash; 401 AuthenticationError Invalid authorization header (0.1s)

### TC-PAXNAME-SEC-03 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify a script-tag payload used as an over-limit first name is rejected and reflected only as escaped JSON text.
- **Category:** Security
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify a script-tag payload used as an over-limit first name is rejected and reflected only as escaped JSON text.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Content-Type is application/json (never text/html); the payload appears only inside a JSON string (valid JSON, quotes escaped); no PNR.
- **Actual:** 400 A0001, Content-Type application/json, payload reflected only inside a valid JSON string
- **Status:** PASS
- **Evidence:** 400 A0001, Content-Type application/json, payload reflected only inside a valid JSON string

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-03):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-SEC-03):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-SEC-04 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 25-character script tag (&lt;script&gt;alert(1)&lt;/script&gt;) used as a first name is handled with a controlled outcome.
- **Category:** Security
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 25-character script tag (&lt;script&gt;alert(1)&lt;/script&gt;) used as a first name is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '&lt;script&gt;alert(1)&lt;/script&gt;' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '&lt;script&gt;alert(1)&lt;/script&gt;' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '&lt;script&gt;alert(1)&lt;/script&gt;' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '&lt;script&gt;alert(1)&lt;/script&gt;' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-SEC-04):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '&lt;script&gt;alert(1)&lt;/script&gt;' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-SEC-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an SQL-injection style last name (Robert'); DROP TABLE--) is handled with a controlled outcome.
- **Category:** Security
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an SQL-injection style last name (Robert'); DROP TABLE--) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Robert'); DROP TABLE--' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Robert'); DROP TABLE--' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Robert'); DROP TABLE--' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Robert'); DROP TABLE--' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-SEC-05):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Robert'); DROP TABLE--' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-SEC-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CRLF header-injection style first name (A\r\nX-Injected: 1) is handled with a controlled outcome and no injected response header.
- **Category:** Security
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a CRLF header-injection style first name (A\r\nX-Injected: 1) is handled with a controlled outcome and no injected response header.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A
X-Injected: 1' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. The response must not contain an X-Injected header.
- **Actual:** Controlled outcome, no injected header - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A
X-Injected: 1' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome, no injected header - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A
X-Injected: 1' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A
X-Injected: 1' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'A
X-Injected: 1' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-SEC-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a format-string style first name (%s%s%s%n{0}{1}) is handled with a controlled outcome.
- **Category:** Security
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a format-string style first name (%s%s%s%n{0}{1}) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '%s%s%s%n{0}{1}' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '%s%s%s%n{0}{1}' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '%s%s%s%n{0}{1}' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '%s%s%s%n{0}{1}' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-SEC-07):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '%s%s%s%n{0}{1}' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-REG-01 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify the originally reported over-limit scenario (27-character first name + infant, pair total 53) returns the documented two-entry Context.
- **Category:** Regression
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the originally reported over-limit scenario (27-character first name + infant, pair total 53) returns the documented two-entry Context.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED / (1.9s) || Book: 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED / (2.4s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[0] = "ChristopherAlexanderMaxMost: 29 | Mostafa : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team."; Context[1] = "The combined passenger information for Adult 'ChristopherAlexanderMaxMost MR/Mostafa(ADT)(INFLi MS/Mostafa)' ) and Infant (Li MS/Mostafa/INF) totals 53 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/INF). "; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED / | Book: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED / | Book: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-REG-01):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED / (1.9s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-REG-01):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG / NOT ENTERED / (2.4s)

### TC-PAXNAME-POS-06 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a plain ADT-only Book with short names returns HTTP 200 with a PNR and tickets (Book control case independent of the name rules).
- **Category:** Positive
- **Endpoint Name:** V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Book - Validate a plain ADT-only Book with short names returns HTTP 200 with a PNR and tickets (Book control case independent of the name rules).
- **Response:** Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.8s)
- **Expected:** HTTP 200 with pnr/gdsPNR/bookingToken and tickets; no name-validation error.
- **Actual:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Book (TC-PAXNAME-POS-06):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.8s)

### TC-PAXNAME-BND-22 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD whose first+last names make the passenger string exactly 59 characters (24 + 24 names, title Miss, 4 delimiters) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold - Validate a CHD whose first+last names make the passenger string exactly 59 characters (24 + 24 names, title Miss, 4 delimiters) is accepted.
- **Response:** Hold: 200 pnr 83P5CV (8.1s)
- **Expected:** HTTP 200 with pnr; CHD echoed untruncated. 24+4+24+3 = 55, +4 delimiters = 59 = the limit.
- **Actual:** Hold 200 pnr 83P5CV echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83P5CV echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-22):** PASS &mdash; 200 pnr 83P5CV (8.1s)

### TC-PAXNAME-BIZ-17 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify an infant with the same surname as its adult is present in the echoed passengersList.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify an infant with the same surname as its adult is present in the echoed passengersList.
- **Response:** Hold: 200 pnr 83OPG4 (7.3s)
- **Expected:** HTTP 200 with pnr; passengersList echoes BOTH Mostafa/Ibrahim (ADT) and Lina/Ibrahim (INF, linked to the ADT).
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-17):** FAIL &mdash; 200 pnr 83OPG4 (7.3s)

### TC-PAXNAME-BIZ-18 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify an infant with a different surname from its adult is present in the echoed passengersList (control for the same-surname case).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify an infant with a different surname from its adult is present in the echoed passengersList (control for the same-surname case).
- **Response:** Hold: 200 pnr 83NXM2 (7.3s)
- **Expected:** HTTP 200 with pnr; passengersList echoes both Mostafa/Ibrahim (ADT) and Lina/Hassan (INF).
- **Actual:** Hold 200 pnr 83NXM2 echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NXM2 echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-18):** PASS &mdash; 200 pnr 83NXM2 (7.3s)

### TC-PAXNAME-BIZ-19 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify ParentPaxRefId is honoured: an infant declared under the second adult is attached to the second adult, not the first.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold - Verify ParentPaxRefId is honoured: an infant declared under the second adult is attached to the second adult, not the first.
- **Response:** Hold: 200 pnr 83OHAZ (7.4s)
- **Expected:** HTTP 200 with pnr; in the echoed passengersList the INF entry points at the passenger Ahmed/Hassan (the adult declared as ParentPaxRefId = Pax2).
- **Actual:** Infant LINA/ZAKI is attached to MOSTAFA IBRAHIM (parentPaxRefId 2-ADT) although ParentPaxRefId = Pax2 (Ahmed Hassan) was sent
- **Status:** FAIL
- **Evidence:** Infant LINA/ZAKI is attached to MOSTAFA IBRAHIM (parentPaxRefId 2-ADT) although ParentPaxRefId = Pax2 (Ahmed Hassan) was sent

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-BIZ-19):** FAIL &mdash; 200 pnr 83OHAZ (7.4s)

### TC-PAXNAME-BIZ-20 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate that a long first adult with a short second adult carrying the infant is accepted when the declared pairing keeps every pair under 59 (20/20 first adult).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold - Validate that a long first adult with a short second adult carrying the infant is accepted when the declared pairing keeps every pair under 59 (20/...
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED / (2.1s)
- **Expected:** HTTP 200 with pnr. Declared pair (Pax2 + infant) = 16 + 13 = 29; the 20/20 adult has no infant (45 + 4 = 49).
- **Actual:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-BIZ-20):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED / (2.1s)

### TC-PAXNAME-POS-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate non-sequential passenger keys (Pax1, Pax3, Pax7) with the infant pointing at Pax3 are accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold - Validate non-sequential passenger keys (Pax1, Pax3, Pax7) with the infant pointing at Pax3 are accepted.
- **Response:** Hold: 200 pnr 83OM8B (7.2s)
- **Expected:** HTTP 200 with pnr; all three passengers echoed untruncated; the name rules do not depend on the key being PaxN-sequential.
- **Actual:** Hold 200 pnr 83OM8B echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83OM8B echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-07):** PASS &mdash; 200 pnr 83OM8B (7.2s)

### TC-PAXNAME-POS-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a nine-passenger party (4 ADT + 4 INF + 1 CHD) with every ADT+INF pair exactly on the limit is accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+ADT+ADT+CHD+INF+INF+INF+INF) then POST api/FlightBooking/Hold - Validate a nine-passenger party (4 ADT + 4 INF + 1 CHD) with every ADT+INF pair exactly on the limit is accepted.
- **Response:** Hold: 200 pnr 83NQIC (7.7s)
- **Expected:** HTTP 200 with pnr; all nine passengers echoed untruncated; each of the four pairs is 51 of content (+8 delimiters = 59, inclusive limit).
- **Actual:** Hold 200 pnr 83NQIC echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NQIC echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 59 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-08):** PASS &mdash; 200 pnr 83NQIC (7.7s)

### TC-PAXNAME-POS-09 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a rejected over-limit Hold can be corrected and re-submitted on the same fareConfirmResponseId and is then accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate a rejected over-limit Hold can be corrected and re-submitted on the same fareConfirmResponseId and is then accepted.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : ABCDEFGHIJKLMNOPQRSTUVWXYZ MR IBRAHIM =&gt; ITEM TOO LONG / NOT ENTERED / (2.0s) || Hold retry: 200 pnr 83O5BD (7.3s)
- **Expected:** Attempt 1: HTTP 400 NDC-INT-TEC-A0001 with the 25-character message and no pnr. Attempt 2 (same fareConfirmResponseId and selectedOfferId, corrected short names): HTTP 200 with pnr; the pre-supplier rejection must not consume or invalidate the fare confirmation.
- **Actual:** attempt 1 expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : ABCDEFGHIJKLMNOPQRSTUVWXYZ MR IBRAHIM =&gt; ITEM TOO LONG / NOT ENTERED / | echo: INF "Lina"/"Ibrahim" not echoed identically
- **Status:** FAIL
- **Evidence:** attempt 1 expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : ABCDEFGHIJKLMNOPQRSTUVWXYZ MR IBRAHIM =&gt; ITEM TOO LONG / NOT ENTERED / | echo: INF "Lina"/"Ibrahim" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-09):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : ABCDEFGHIJKLMNOPQRSTUVWXYZ MR IBRAHIM =&gt; ITEM TOO LONG / NOT ENTERED / (2.0s)
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-POS-09_retry):** FAIL &mdash; 200 pnr 83O5BD (7.3s)

### TC-PAXNAME-POS-10 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an all-uppercase 25-character first name and last name (ADT only) is accepted and echoed.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an all-uppercase 25-character first name and last name (ADT only) is accepted and echoed.
- **Response:** Hold: 200 pnr 83NPDM (7.6s)
- **Expected:** HTTP 200 with pnr; both names echoed all 25 characters.
- **Actual:** Hold 200 pnr 83NPDM echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 83NPDM echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-10):** PASS &mdash; 200 pnr 83NPDM (7.6s)

### TC-PAXNAME-BND-24 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF pair sharing the same surname with names+titles+PTC of exactly 51 (the requirement limit, 59 with delimiters) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an ADT + INF pair sharing the same surname with names+titles+PTC of exactly 51 (the requirement limit, 59 with delimiters) is accepted.
- **Response:** Hold: 200 pnr 83O6KX (7.3s)
- **Expected:** HTTP 200 with pnr; both passengers echoed untruncated. 51 + 8 delimiters = 59 = the stated limit (inclusive).
- **Actual:** Hold: echo: INF "Liabcdef"/"Shabcdefghij" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Liabcdef"/"Shabcdefghij" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-24):** FAIL &mdash; 200 pnr 83O6KX (7.3s)

### TC-PAXNAME-BND-25 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF pair sharing the same surname with a total of 52 (one over the requirement limit) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF pair sharing the same surname with a total of 52 (one over the requirement limit) is rejected.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (2.0s) || Book: 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (2.6s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has the combined-length entry with total 52 exceeding the maximum; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / | Book: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / | Book: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-25):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (2.0s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-25):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (2.6s)

### TC-PAXNAME-BND-26 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF pair sharing the same surname with a total of 57 is rejected per the requirement (59-character limit, 51 of content).
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF pair sharing the same surname with a total of 57 is rejected per the requirement (59-character limit, 51 of content).
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (4.2s) || Book: 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (2.4s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has the combined-length entry with total 57 exceeding the maximum; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / | Book: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / | Book: expected 400 A0001, got 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-26):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (4.2s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-26):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : MOABCDEFGHIJ MR SHABCDEFGHIJ =&gt; ITEM TOO LONG / NOT ENTERED / (2.4s)

### TC-PAXNAME-BND-27 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF pair sharing the same surname with a total of 58 is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF pair sharing the same surname with a total of 58 is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghij Shabcdefghij) and Infant (Liabcdefghij Shabcdefghij) totals 58 characters, exceeding the maximum allowed limit of 57... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghij Shabcdefghij) and Infant (Liabcdefghij Shabcdefghij) totals 58 characters, exceeding the maximum allowed limit of 57... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has the combined-length entry with total 58 exceeding the maximum; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [58], 0.1s; Book 400 A0001, combined totals [58], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [58], 0.1s; Book 400 A0001, combined totals [58], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-27):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghij Shabcdefghij) and Infant (Liabcdefghij Shabcdefghij) totals 58 characters, exceeding the maximum allowed limit of 57 characters set by Amadeus. This total includes the first name, last name, title, passenger type cod... (0.1s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-27):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Moabcdefghij Shabcdefghij) and Infant (Liabcdefghij Shabcdefghij) totals 58 characters, exceeding the maximum allowed limit of 57 characters set by Amadeus. This total includes the first name, last name, title, passenger type cod... (0.1s)

### TC-PAXNAME-BND-28 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate single-character first and last names (A / B) on an ADT are handled with a controlled outcome.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate single-character first and last names (A / B) on an ADT are handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Passenger Pax1's first and last name e... (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Passenger Pax1's first and last name each must consist of ...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Passenger Pax1's first and last name each must consist of ... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Passenger Pax1's first and last name each must consist of ...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-28):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Passenger Pax1's first and last name each must consist of two or more characters (0.1s)

### TC-PAXNAME-BND-29 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 13-character first name of the German sharp-s (U+00DF), which upper-cases to 26 characters at the supplier, is handled with a controlled outcome.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 13-character first name of the German sharp-s (U+00DF), which upper-cases to 26 characters at the supplier, is handled with a controlled...
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (2.5s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]
- **Status:** FAIL
- **Evidence:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] | OBSERVED: Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-29):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (2.5s)

### TC-PAXNAME-BIZ-21 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate two infants declared under the same adult (2 ADT + 2 INF, both ParentPaxRefId = Pax1) are handled with a controlled outcome.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold - Validate two infants declared under the same adult (2 ADT + 2 INF, both ParentPaxRefId = Pax1) are handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Infant passengers 'Pax3' and 'Pax4' both reference adult passenger 'Pax1'. Each adult can accompany only one infant. (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Infant passengers 'Pax3' and 'Pax4' both reference adult passenger 'Pax1'. Each adult can accompany only one infant.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Infant passengers 'Pax3' and 'Pax4' both reference adult passenger 'Pax1'. Each adult can accompany only one infant. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Infant passengers 'Pax3' and 'Pax4' both reference adult passenger 'Pax1'. Each adult can accompany only one infant.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-21):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passengers 'Pax3' and 'Pax4' both reference adult passenger 'Pax1'. Each adult can accompany only one infant. (0.1s)

### TC-PAXNAME-BIZ-22 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an infant whose ParentPaxRefId points to a child (CHD) instead of an adult is rejected with a controlled 4xx.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD+INF) then POST api/FlightBooking/Hold - Validate an infant whose ParentPaxRefId points to a child (CHD) instead of an adult is rejected with a controlled 4xx.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax3': parent passenger 'Pax2' is of type CHD, but an infant's parent must be an adult (ADT). (0.1s)
- **Expected:** Controlled 4xx (no 5xx, no 200) and no pnr: an infant cannot be linked to a child passenger.
- **Actual:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax3': parent passenger 'Pax2' is of type CHD, but an infant's parent must be an adult (ADT).
- **Status:** PASS
- **Evidence:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax3': parent passenger 'Pax2' is of type CHD, but an infant's parent must be an adult (ADT). | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax3': parent passenger 'Pax2' is of type CHD, but an infant's parent must be an adult (ADT).

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-22):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passenger 'Pax3': parent passenger 'Pax2' is of type CHD, but an infant's parent must be an adult (ADT). (0.1s)

### TC-PAXNAME-BIZ-23 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate lower-case passengerTypeCode values (adt / inf) cannot be used to bypass the combined-length rule on an over-limit pair.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate lower-case passengerTypeCode values (adt / inf) cannot be used to bypass the combined-length rule on an over-limit pair.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Chabcdefghi Maabcdefghi) and Infant (Liabcdefghi Moabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 char... (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect. Specifically the over-limit pair (total 53) must NOT reach Amadeus as ITEM TOO LONG.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Chabcdefghi Maabcdefghi) and Infant (Liabcdefghi Moabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeu...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Chabcdefghi Maabcdefghi) and Infant (Liabcdefghi Moabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeu... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Chabcdefghi Maabcdefghi) and Infant (Liabcdefghi Moabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeu...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult (Chabcdefghi Maabcdefghi) and Infant (Liabcdefghi Moabcdefgh) totals 53 characters, exceeding the maximum allowed limit of 51 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (AD... (0.1s)

### TC-PAXNAME-BIZ-24 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate two adults with identical first and last names (duplicate passenger) are handled with a controlled outcome.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT) then POST api/FlightBooking/Hold - Validate two adults with identical first and last names (duplicate passenger) are handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2' have the same first name, last name and birth date. (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2' have the same first name, last name and birth date.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2' have the same first name, last name and birth date. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2' have the same first name, last name and birth date.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-BIZ-24):** PASS &mdash; 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2' have the same first name, last name and birth date. (0.1s)

### TC-PAXNAME-BIZ-25 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an infant carrying exactly the same first and last name as its adult is handled with a controlled outcome.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an infant carrying exactly the same first and last name as its adult is handled with a controlled outcome.
- **Response:** Hold: 200 pnr 83ONEC (7.4s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Hold: accepted but altered: INF "Ahmed"/"Hassan" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: accepted but altered: INF "Ahmed"/"Hassan" not echoed identically | OBSERVED: Hold: 200 accepted pnr 83ONEC

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-25):** FAIL &mdash; 200 pnr 83ONEC (7.4s)

### TC-PAXNAME-BIZ-26 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an adult title that contradicts the gender (title Mr with gender female) is handled with a controlled outcome.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an adult title that contradicts the gender (title Mr with gender female) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Title MR does not match Gender Female. (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Title MR does not match Gender Female.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Title MR does not match Gender Female. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Title MR does not match Gender Female.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-BIZ-26):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Title MR does not match Gender Female. (0.1s)

### TC-PAXNAME-BIZ-27 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a travel-document name of 26 characters while the passengersList name is short is handled with a controlled outcome.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a travel-document name of 26 characters while the passengersList name is short is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger Pax1's Name must match those in their travel docs (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger Pax1's Name must match those in their travel docs
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger Pax1's Name must match those in their travel docs | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger Pax1's Name must match those in their travel docs

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-27):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger Pax1's Name must match those in their travel docs (0.1s)

### TC-PAXNAME-NEG-17 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate passengersList sent as a JSON array instead of an object is rejected with a controlled 4xx.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate passengersList sent as a JSON array instead of an object is rejected with a controlled 4xx.
- **Response:** Hold: 400  {"status":400,"transactionId":"f646bdac-0d31-42fe-9ab7-9b5501bb5800","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s)
- **Expected:** Controlled 4xx (no 5xx, no 200) and no pnr.
- **Actual:** Hold 400  {"status":400,"transactionId":"f646bdac-0d31-42fe-9ab7-9b5501bb5800","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"f646bdac-0d31-42fe-9ab7-9b5501bb5800","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"f646bdac-0d31-42fe-9ab7-9b5501bb5800","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-17):** PASS &mdash; 400  {"status":400,"transactionId":"f646bdac-0d31-42fe-9ab7-9b5501bb5800","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList","value":"The JSON va... (0.1s)

### TC-PAXNAME-NEG-18 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with the name.middle key omitted is handled with a controlled outcome.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT with the name.middle key omitted is handled with a controlled outcome.
- **Response:** Hold: 400  {"status":400,"transactionId":"27e10df1-77f6-43a9-b3d7-47d9d614cf30","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"27e10df1-77f6-43a9-b3d7-47d9d614cf30","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Mid...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"27e10df1-77f6-43a9-b3d7-47d9d614cf30","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Mid... | OBSERVED: Hold: 400  {"status":400,"transactionId":"27e10df1-77f6-43a9-b3d7-47d9d614cf30","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Mid...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-NEG-18):** PASS &mdash; 400  {"status":400,"transactionId":"27e10df1-77f6-43a9-b3d7-47d9d614cf30","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Middle","value":"The Middle field is required."}],"originalSupplierRequest":null,"o... (0.1s)

### TC-PAXNAME-NEG-19 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an adult title outside the supported list (Sir) is rejected or handled in a controlled way.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an adult title outside the supported list (Sir) is rejected or handled in a controlled way.
- **Response:** Hold: 400  {"status":400,"transactionId":"3669c27e-8087-4ac5-b308-3f777c66faf9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"3669c27e-8087-4ac5-b308-3f777c66faf9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"3669c27e-8087-4ac5-b308-3f777c66faf9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol... | OBSERVED: Hold: 400  {"status":400,"transactionId":"3669c27e-8087-4ac5-b308-3f777c66faf9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-NEG-19):** PASS &mdash; 400  {"status":400,"transactionId":"3669c27e-8087-4ac5-b308-3f777c66faf9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"... (0.1s)

### TC-PAXNAME-NEG-20 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a lower-case adult title (mr) is rejected or handled in a controlled way.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a lower-case adult title (mr) is rejected or handled in a controlled way.
- **Response:** Hold: 200 pnr 83OLZ5 (6.6s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 200 accepted pnr 83OLZ5
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 200 accepted pnr 83OLZ5 | OBSERVED: Hold: 200 accepted pnr 83OLZ5

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-NEG-20):** PASS &mdash; 200 pnr 83OLZ5 (6.6s)

### TC-PAXNAME-VAL-25 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name of 24 letters plus an embedded zero-width space (U+200B, 25 code points but 24 visible) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name of 24 letters plus an embedded zero-width space (U+200B, 25 code points but 24 visible) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Abcdefghijkl​Zzabcdefghij' must only contain letters and spaces. (0.2s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Abcdefghijkl​Zzabcdefghij' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Abcdefghijkl​Zzabcdefghij' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Abcdefghijkl​Zzabcdefghij' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-VAL-25):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Abcdefghijkl​Zzabcdefghij' must only contain letters and spaces. (0.2s)

### TC-PAXNAME-VAL-26 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a last name containing a non-breaking space (U+00A0) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a last name containing a non-breaking space (U+00A0) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abdel Rahman' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abdel Rahman' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abdel Rahman' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abdel Rahman' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-VAL-26):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abdel Rahman' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-27 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name containing a Cyrillic homoglyph (U+0430 in place of Latin a) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name containing a Cyrillic homoglyph (U+0430 in place of Latin a) is handled with a controlled outcome.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (1.7s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]
- **Status:** FAIL
- **Evidence:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] | OBSERVED: Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-VAL-27):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (1.7s)

### TC-PAXNAME-VAL-28 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name containing a right-to-left override character (U+202E) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name containing a right-to-left override character (U+202E) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mo‮stafa' must only contain letters and spaces. (0.2s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mo‮stafa' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mo‮stafa' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mo‮stafa' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-28):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mo‮stafa' must only contain letters and spaces. (0.2s)

### TC-PAXNAME-VAL-29 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a short last name with an apostrophe (O'Neil) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a short last name with an apostrophe (O'Neil) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Neil' must only contain letters and spaces. (0.2s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Neil' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Neil' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Neil' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-29):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Neil' must only contain letters and spaces. (0.2s)

### TC-PAXNAME-VAL-30 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a short hyphenated first name (Mary-Anne) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a short hyphenated first name (Mary-Anne) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mary-Anne' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mary-Anne' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mary-Anne' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mary-Anne' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-30):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mary-Anne' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-31 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a last name containing a double quote and a backslash (Abd"el\Rahman) is handled with a controlled outcome and valid JSON back.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a last name containing a double quote and a backslash (Abd"el\Rahman) is handled with a controlled outcome and valid JSON back.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abd"el\Rahman' must only contain letters and spaces. (0.1s)
- **Expected:** Controlled outcome only: either HTTP 200 with a pnr and the names echoed intact, or a controlled 4xx (NDC-INT-TEC-A0001 style) with no pnr. A 5xx, a transport failure, or an unmapped 409 NDC-INT-UNC-Z9999 raised by the supplier AFTER the integration pre-check passed is a defect.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abd"el\Rahman' must only contain letters and spaces.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abd"el\Rahman' must only contain letters and spaces. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abd"el\Rahman' must only contain letters and spaces.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-31):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Abd"el\Rahman' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-SEC-09 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a passengersList carrying 200 passenger entries is rejected quickly with a controlled 4xx.
- **Category:** Security
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a passengersList carrying 200 passenger entries is rejected quickly with a controlled 4xx.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2', 'Pax3', 'Pax4', 'Pax5', 'Pax6', 'Pax7', 'Pax8', 'Pax9', 'Pax10', 'Pax11', 'Pax12', 'Pax13', 'Pax14', 'Pax15', 'Pax16'... (0.3s)
- **Expected:** Controlled 4xx (no 5xx, no 200) and no pnr, returned quickly; the over-limit passenger count must not be forwarded to Amadeus.
- **Actual:** Hold 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2', 'Pax3', 'Pax4', 'Pax5', 'Pax6', 'Pax7', 'Pax8', 'Pax9', 'Pax10', 'Pax11', 'Pax12', 'Pax...
- **Status:** PASS
- **Evidence:** Hold 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2', 'Pax3', 'Pax4', 'Pax5', 'Pax6', 'Pax7', 'Pax8', 'Pax9', 'Pax10', 'Pax11', 'Pax12', 'Pax... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2', 'Pax3', 'Pax4', 'Pax5', 'Pax6', 'Pax7', 'Pax8', 'Pax9', 'Pax10', 'Pax11', 'Pax12', 'Pax13', 'Pax14', 'Pax15', 'Pax16'...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-09):** PASS &mdash; 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax1', 'Pax2', 'Pax3', 'Pax4', 'Pax5', 'Pax6', 'Pax7', 'Pax8', 'Pax9', 'Pax10', 'Pax11', 'Pax12', 'Pax13', 'Pax14', 'Pax15', 'Pax16', 'Pax17', 'Pax18', 'Pax19', 'Pax20', 'Pax21', 'Pax22', 'Pax23', 'Pax24', 'Pax25', 'Pax26', 'Pax27',... (0.3s)

### TC-PAXNAME-SEC-08 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify the name-limit rejection body leaks no supplier request/response, credentials, stack trace or internal type names.
- **Category:** Security
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the name-limit rejection body leaks no supplier request/response, credentials, stack trace or internal type names.
- **Response:** Hold: 200 pnr 83QB78 (7.8s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.7s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; the body contains none of: supplierRequest, supplierResponse, OriginalSupplierRequest/Response, password, Authorization, Bearer, x-api-key, stack-trace lines, .NET/Java type names.
- **Actual:** No name-limit rejection was produced to inspect: the over-limit passengersList was accepted (Hold 200 with a PNR) and Book returned 500, so the case premise (a rejection body free of supplier data) could not be met. The 200 and 500 bodies contain no supplier payload.
- **Status:** FAIL
- **Evidence:** No name-limit rejection was produced to inspect: the over-limit passengersList was accepted (Hold 200 with a PNR) and Book returned 500, so the case premise (a rejection body free of supplier data) could not be met. The 200 and 500 bodies contain no supplier payload.

  - **Hop 1 &mdash; V1 Search:** FAIL &mdash; 200 - 71 offers
  - **Hop 2 &mdash; V1 FareConfirm:** FAIL &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** FAIL &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-SEC-08):** FAIL &mdash; 200 pnr 83QB78 (7.8s)
  - **Hop 5 &mdash; V1 Search:** FAIL &mdash; 200 - 71 offers
  - **Hop 6 &mdash; V1 FareConfirm:** FAIL &mdash; 200
  - **Hop 7 &mdash; V1 Book (TC-PAXNAME-SEC-08):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.7s)

### TC-PAXNAME-BND-23 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD passenger string of 60 characters (24 + 25 names, title Miss, 4 delimiters) is rejected with the single-passenger 59-character message.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a CHD passenger string of 60 characters (24 + 25 names, title Miss, 4 delimiters) is rejected with the single-passenger 59-character message.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrs MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, wh... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrs MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, wh... (0.6s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The passenger information for CHD ... totals 56 characters + Space and Delimiters length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no PNR.
- **Actual:** Hold 400 A0001, single-passenger total []; Book 400 A0001, single-passenger total []
- **Status:** PASS
- **Evidence:** Hold 400 A0001, single-passenger total []; Book 400 A0001, single-passenger total []

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrs MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 6 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-BND-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The passenger (Childabcdefghijklmnopqrs MISS Minorabcdefghijklmnopqrst) of type CHD has a total length of 58 characters for (FirstName + LastName  +Title) including spaces, which exceeds the maximum allowed limit of 57 characters by Amadeus. (0.6s)

## Findings

### Defects

- **[TC-PAXNAME-POS-06] BUG-01: V1 Book returns HTTP 500 ServerError for Amadeus/EGY on every call that reaches the supplier (12 of 12 calls, 0 successes), including a plain ADT-only booking, while the identical request on Hold returns 200 with a PNR.** Field: `HTTP status / ErrorCode (V1 Book)`. Expected: 200 with pnr, gdsPNR, bookingToken and tickets[]. **Impact:** Book is unusable for Amadeus/EGY on ne-3 (also on ne-8, 2026-10-29). The generic 500 has an empty Context, so it cannot be told whether a PNR/ticket was created at Amadeus, and Retrieve is not usable for Amadeus. Evidence: POS-06 Book ADT Mostafa/Ibrahim -&gt; 500 ServerError in ~7.5 s (txn 17038341-a520-4fb5-8044-be90ab2539ee); POS-01, BND-13 and the Book leg of every other accepted case shows the same 500.
- **[TC-PAXNAME-BND-02] BUG-02: The 25-character limit on first name and last name is not enforced by the integration layer on ne-3. A 26-character name is not rejected with 400 NDC-INT-TEC-A0001; it is forwarded to Amadeus and either creates a PNR with the 26-character name (200) or fails as an unmapped 409 NDC-INT-UNC-Z9999 "ITEM TOO LONG / NOT ENTERED". The stakeholder sample (27-character first name + infant) now returns 409 Z9999 instead of the documented two-entry 400.** Field: `passengersList[].name.first / name.last (V1 Hold, Book)`. Expected: 400 NDC-INT-TEC-A0001 with Context[] "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." and no PNR. **Impact:** Over-limit names reach Amadeus: bookings are created with names that violate the supplier limit (ADT first name of 26 echoed in full, PNR 83MVWO) or fail with an opaque supplier error. The same input is non-deterministic (VAL-22: 200, 200, then 409). Evidence: BND-02 ADT first name 26 -&gt; Hold 200 pnr 83MVWO, echoed ABCDEFGHIJKLMNOPQRSTUVWXYZ; BND-04 last 26 -&gt; 200; BND-09/10/12 (INF/CHD 26) -&gt; 200; REG-01 and VAL-20 -&gt; 409 Z9999 "CHRISTOPHERALEXANDERMAXMOST MR MOSTAFA =&gt; ITEM TOO LONG"; the same rule was enforced on ne-8 (BND-02 rejected 0.1 s).
- **[TC-PAXNAME-BND-25] BUG-03: ne-3 applies a looser combined limit of 57 when adult and infant share a surname (51 otherwise), but Amadeus itself rejects same-surname pairs well below 57: a pair of 52 and a pair of 57 pass the integration pre-check and then fail with unmapped 409 NDC-INT-UNC-Z9999 "ITEM TOO LONG / NOT ENTERED" (Amadeus error 1902).** Field: `combined ADT+INF limit (same surname)`. Expected: Either a pre-check limit equal to what Amadeus accepts (51 of content, i.e. the stated 59 with delimiters) returning 400 NDC-INT-TEC-A0001 for 52, or a PNR. **Impact:** Any same-surname family with a combined 52-57 characters (a normal case: infants share the family name) passes validation and then fails at the supplier after 2-4 s with a raw supplier error; the published 57 limit is wrong for Amadeus. Evidence: BND-24 same-surname 51 -&gt; 200 pnr; BND-25 same-surname 52 -&gt; 409 Z9999 "MOABCDEFG MR SHABCDEFGHIJ =&gt; ITEM TOO LONG" (Hold and Book); BND-26 same-surname 57 -&gt; 409 Z9999; BND-27 same-surname 58 -&gt; 400 A0001 (pre-check).
- **[TC-PAXNAME-BND-25] BUG-04: Every unmapped supplier 409 (NDC-INT-UNC-Z9999, and NDC-INT-BYP-A0001 "no longer available") carries the full raw Amadeus SOAP request and response in the body: passenger names, passport numbers (SSR DOCS), email, phone, address, Amadeus office id (CAIEG28WT), IATA number, session id and endpoint node (78 such responses in this run).** Field: `OriginalSupplierRequest / OriginalSupplierResponse (409 bodies)`. Expected: OriginalSupplierRequest / OriginalSupplierResponse absent or null in a consumer response (SPEC.md section 7.14 tracked leak class). **Impact:** Supplier credentials context and traveller PII are returned to every API consumer on a routine error; combined with BUG-02/BUG-03 the leak is reachable with an ordinary over-limit name. Evidence: BND-25 Hold txn 440c05c9-b993-433e-a6b1-91ed69f33c4f; VAL-22 third call txn 54f02f96-7d8c-49f5-8fcd-ba0eea754ec8 (BYP-A0001). Bodies are redacted in this log.
- **[TC-PAXNAME-BIZ-17] BUG-05: An infant that shares its adult's surname is missing from the echoed passengersList of the Hold 200 response; with a different surname the infant is echoed.** Field: `passengersList (Hold response)`. Expected: passengersList contains the ADT MOSTAFA/IBRAHIM and an INF LINA/IBRAHIM linked to it. **Impact:** Same-surname family bookings are the common case; the response gives no sign the infant is on the booking, and Retrieve cannot confirm it for Amadeus. Evidence: POS-01, POS-03, POS-04 (both infants lost), BND-24, BIZ-17, BIZ-25, POS-09 echo only the ADT; BIZ-18 (different surname) echoes ADT and INF. Same defect as BUG-02 on ne-8 (2026-10-29).
- **[TC-PAXNAME-BIZ-19] BUG-06: ParentPaxRefId is ignored when the request is sent to Amadeus: an infant declared under Pax2 is attached to the first adult, while the combined-length pre-check pairs by the declared parent, so requests that pass validation fail at the supplier as 409 Z9999 "ITEM TOO LONG".** Field: `passengersList[INF].ParentPaxRefId`. Expected: INF Lina/Zaki attached to Ahmed/Hassan (ParentPaxRefId = Pax2). **Impact:** The infant is recorded under the wrong adult, and valid-by-validation bookings are rejected by Amadeus (BIZ-04, BIZ-20). Evidence: BIZ-19 echo shows the infant under Mostafa Ibrahim (Pax1); BIZ-04 and BIZ-20 -&gt; 409 Z9999 for the first 20/20 adult although the infant was declared under the short second adult.
- **[TC-PAXNAME-VAL-09] BUG-07: The letters-only pre-check rejects decomposed accents and emoji but lets Arabic, precomposed accented Latin (José, Müller), Cyrillic look-alike letters and the German sharp-s through; Amadeus then rejects them as an unmapped 409 NDC-INT-UNC-Z9999 "18|Presentation|Serializing/Deserializing error ... Wrong data format" carrying the raw SOAP.** Field: `name.first / name.last (non-ASCII letters)`. Expected: 400 NDC-INT-TEC-A0001 "Name.&lt;field&gt; must only contain letters and spaces" before any supplier call (or a successful booking with transliteration). **Impact:** Legitimate non-ASCII names cannot be booked and fail late with an opaque supplier error; the pre-check and the supplier disagree on what a "letter" is. Evidence: VAL-09 (Arabic), VAL-11 (José/Müller), VAL-27 (Cyrillic a), BND-29 (13 x U+00DF) -&gt; 409 Z9999; VAL-12 (decomposed e) and VAL-13 (emoji) -&gt; 400 A0001 pre-check.
- **[TC-PAXNAME-BIZ-13] BUG-08: Request-binding validation errors (unknown title value, missing name, null list, wrong types) use a second envelope (camelCase keys, errorCode "1001", a spurious "holdRequestDto field is required" entry) and expose the internal .NET type NDC.Integrations.Application.Dtos.Api.Title; name-rule errors use the PascalCase NDC-INT-TEC-A0001 envelope.** Field: `error envelope (model-binding validation errors)`. Expected: One envelope {Status, TransactionId, ErrorCode:"NDC-INT-TEC-A0001", ErrorMessage, Context[{Value}]} and no internal type names. **Impact:** Clients must parse two shapes for one endpoint and internal class names are disclosed. Evidence: BIZ-13 (20-character title) -&gt; 400 {"status":400,"errorCode":"1001",...,"value":"The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Title ..."}; NEG-01..NEG-13 (except NEG-10) return the same 1001 envelope. Same as BUG-05 on ne-8.
- **[TC-PAXNAME-NEG-14] BUG-09: The name-rejection message echoes the full submitted name twice: a 10,000-character last name returns a ~20 KB error body (10,119 and 10,200 character Context entries); a 1,000-character first name is echoed the same way.** Field: `Context[].Value (length-validation message)`. Expected: Rejection message that does not reflect an unbounded caller-supplied string (truncate the value). **Impact:** Response amplification (2x the request) and reflected attacker-controlled content in an error body. Evidence: NEG-14 Hold txn 5a084546-d837-4587-801f-17d07c761cfd -&gt; 400 A0001, Context[0] "Name.Last must be between 2 and 50 characters", Context[1] and [2] contain the 10,000-character name; BND-21 (1,000 characters) txn e5362e08-7da2-43a4-90e0-f8e874163942.

### Unknown-resolutions

- **[TC-PAXNAME-BND-11]** ne-3 enforces a single-passenger limit on every ADT and CHD (not only pairs): first + title + last + 2 spaces + 3 (PTC) &lt;= 57. ADT 25/25 with Mr (57) is accepted (BND-05), with Mrs (58) rejected (BND-17); CHD 25/25 with Miss (59) rejected (BND-11, POS-05, BIZ-03); CHD 24/24 (57) accepted (BND-22); CHD 24/25 (58) rejected (BND-23). This is stricter than the requirement (names up to 25 each), so a CHD with two 25-character names cannot be booked. Evidence: BND-05, BND-11, BND-17, BND-22, BND-23, BIZ-03, POS-05; message "The passenger (&lt;first&gt; &lt;TITLE&gt; &lt;last&gt;) of type CHD has a total length of N characters ... exceeds the maximum allowed limit of 57 characters by Amadeus."
- **[TC-PAXNAME-BND-28]** ne-3 validates each name length as 2..50 characters (LengthValidator) and letters-plus-spaces only (RegularExpressionValidator): single-character names are rejected (BND-28); hyphens and apostrophes are rejected even in short names (VAL-29, VAL-30, VAL-03, VAL-04); there is NO per-name 25-character check (BUG-02). Evidence: BND-28, BND-21, NEG-14, VAL-03, VAL-04, VAL-29, VAL-30, VAL-31.
- **[TC-PAXNAME-BND-24]** Combined ADT+INF limit on ne-3: the message states 51 (different surnames) or 57 (same surname); total counted = names + titles + PTC with no delimiters. Different-surname pairs behave as before (51 accepted: BND-13; 52 rejected: BND-15; 53: BND-16; 71: BIZ-05). For a same-surname pair 51 is accepted (BND-24) but Amadeus rejects 52 and 57 (BND-25, BND-26); 58 is rejected by the pre-check (BND-27). The pre-check is case-insensitive on passengerTypeCode (BIZ-23). Evidence: BND-13, BND-15, BND-24..BND-27, BIZ-05, BIZ-23.
- **[TC-PAXNAME-BIZ-21]** Additional pre-supplier rules confirmed on ne-3 (all 400 NDC-INT-TEC-A0001, ~0.1 s): one infant per adult (BIZ-21), an infant parent must be an ADT (BIZ-22), duplicate passengers by first+last+birth date (BIZ-24, SEC-09), title must match gender (BIZ-26), travelDocument name must equal the passenger name (BIZ-27). A lower-case title (mr) is accepted (NEG-20); a 9-passenger party of four 51-character pairs and a CHD is accepted (POS-08). Evidence: BIZ-21, BIZ-22, BIZ-24, BIZ-26, BIZ-27, NEG-20, POS-08, SEC-09.
- **[TC-PAXNAME-POS-01]** Amadeus/EGY on ne-3: Hold works (200, ~7-8 s) and returns a PNR; Book returns 500 for every call (BUG-01). CancelAfterHold and Retrieve were not retried in this round (ne-8: 409 OperationNotSupported / 500), so the live PNRs listed under Cleanup are assumed not releasable through the API. Evidence: 46 Hold calls returned 200 with a PNR; 0 of 12 Book calls succeeded.

## Proposed SPEC.md updates

- §2.5 &mdash; status: *pending*
  - **Old:** "- Every `INF` passenger must carry a valid `ParentPaxRefId` pointing to an `ADT` entry present in the same request."
  - **New:** "- Every `INF` passenger must carry a valid `ParentPaxRefId` pointing to an `ADT` entry present in the same request.
- Amadeus name rules (live-observed 2026-11-01, V1 Book/Hold, ne-3, Amadeus/EGY; differs from ne-8 2026-10-29): each name 2-50 letters/spaces; a single ADT or CHD string (first + title + last + 2 spaces + 3 PTC) &lt;= 57; ADT+INF pair (names + titles + PTC) &lt;= 51, or &lt;= 57 when the surnames are equal (but Amadeus rejects same-surname pairs above 51 - BUG-03); one infant per adult, parent must be ADT, title must match gender. There is no separate 25-character limit on ne-3 (BUG-02). Violations return 400 `NDC-INT-TEC-A0001` with the reason in `Context[].Value`."
  - **Correction:** Pending a product decision on which rule set is intended; the ne-8 rule set (25 / 59) and the ne-3 set conflict.

- §4.6 &mdash; status: *pending*
  - **Old:** "| Amadeus / AmadeusNDC / UAEAmadeusNDC | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |"
  - **New:** "| Amadeus / AmadeusNDC / UAEAmadeusNDC | Unknown | Unknown | Supported (Hold 200); **Book fails** (V1 Book -&gt; 500 ServerError on ne-3 and ne-8, Amadeus/EGY) | Unknown | Unknown | Unknown | Unknown |"
  - **Correction:** BUG-01; 12 of 12 Book calls on ne-3 returned 500.

## Cleanup / follow-up

Live artifacts left behind this round (46):

- **family_b_hold** &mdash; pnr 83MBPD (TC-PAXNAME-POS-01) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NMNC (TC-PAXNAME-POS-02) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MZME (TC-PAXNAME-POS-03) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83M78O (TC-PAXNAME-POS-04) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83M7R4 (TC-PAXNAME-BND-01) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MVWO (TC-PAXNAME-BND-02) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83M4KA (TC-PAXNAME-BND-03) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83N2AW (TC-PAXNAME-BND-04) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MPA2 (TC-PAXNAME-BND-05) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83M5TT (TC-PAXNAME-BND-07) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MPAZ (TC-PAXNAME-BND-08) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MFNW (TC-PAXNAME-BND-09) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83M6ZT (TC-PAXNAME-BND-10) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MT4B (TC-PAXNAME-BND-12) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NL55 (TC-PAXNAME-BND-13) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MQLD (TC-PAXNAME-BND-14) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83M7DM (TC-PAXNAME-BND-18) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MXDM (TC-PAXNAME-BIZ-08) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83N4BL (TC-PAXNAME-BIZ-09) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NNU7 (TC-PAXNAME-BIZ-10) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NRNF (TC-PAXNAME-BIZ-11) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NWD6 (TC-PAXNAME-BIZ-12) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NH9L (TC-PAXNAME-VAL-01) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NNAS (TC-PAXNAME-VAL-02) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83P98M (TC-PAXNAME-VAL-06) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83O7RJ (TC-PAXNAME-VAL-07) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NPJF (TC-PAXNAME-VAL-17) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83OAQZ (TC-PAXNAME-VAL-18) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NUPG (TC-PAXNAME-VAL-19) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83OYLL (TC-PAXNAME-VAL-22) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NYGB (TC-PAXNAME-VAL-22) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83P5CV (TC-PAXNAME-BND-22) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83OPG4 (TC-PAXNAME-BIZ-17) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NXM2 (TC-PAXNAME-BIZ-18) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83OHAZ (TC-PAXNAME-BIZ-19) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83OM8B (TC-PAXNAME-POS-07) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NQIC (TC-PAXNAME-POS-08) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83O5BD (TC-PAXNAME-POS-09) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83NPDM (TC-PAXNAME-POS-10) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83O6KX (TC-PAXNAME-BND-24) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83ONEC (TC-PAXNAME-BIZ-25) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83OLZ5 (TC-PAXNAME-NEG-20) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83QB78 (TC-PAXNAME-SEC-08) &mdash; Hold at Amadeus; not releasable through the API (CancelAfterHold unsupported for Amadeus on ne-8, not re-tested on ne-3); expires at the supplier.
- **family_b_hold** &mdash; pnr 83LWLV (null) &mdash; Hold, calibration probe (short ADT+INF) (not a logged test case); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MMFE (null) &mdash; Hold, calibration probe (ADT 25/25) (not a logged test case); expires at the supplier.
- **family_b_hold** &mdash; pnr 83MRAD (null) &mdash; Hold, calibration probe (INF 26-character first name) (not a logged test case); expires at the supplier.

