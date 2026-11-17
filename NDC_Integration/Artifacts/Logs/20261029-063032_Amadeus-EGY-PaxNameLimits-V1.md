# QA Execution Report — Amadeus_PassengerNameLimits_TestCases.csv (NDC_Integration/TestCases/Amadeus_PassengerNameLimits_TestCases.csv) - Amadeus / EGY - V1 Book and Hold - 92 test cases

**Environment:** staging (ndc-integration-stg-ne-8) &middot; https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/
**Supplier:** Amadeus  **Credentials Selector:** EGY
**Started:** 2026-10-29T06:30:32.744Z
**Ended:** 2026-10-29T06:56:10.587Z
**Status:** COMPLETE
**Execution Duration:** 25m 38s ([View Time Breakdown](20261029-063032_Amadeus-EGY-PaxNameLimits-V1_TimeBreakdown.html))
**Prior runs:** see NDC_Integration/Artifacts/Logs/ (see NDC_Integration/Artifacts/Logs/)

## Summary

- Test cases logged: 99 of 92 planned
- Passed: 80
- Failed: 19
- Blocked: 0
- Failed test cases: TC-PAXNAME-VAL-19, TC-PAXNAME-POS-01, TC-PAXNAME-POS-03, TC-PAXNAME-POS-04, TC-PAXNAME-POS-05, TC-PAXNAME-BND-11, TC-PAXNAME-BND-13, TC-PAXNAME-BIZ-03, TC-PAXNAME-BIZ-04, TC-PAXNAME-BIZ-13, TC-PAXNAME-VAL-03, TC-PAXNAME-VAL-04, TC-PAXNAME-BND-17, TC-PAXNAME-VAL-09, TC-PAXNAME-VAL-11, TC-PAXNAME-POS-06, TC-PAXNAME-BIZ-17, TC-PAXNAME-BIZ-19, TC-PAXNAME-BIZ-20

## Test case results

### TC-CAPCHECK-AMD-01 — PASS

- **Test Case:** [Amadeus][Search] Verify Amadeus credentials for credentialsSelector EGY are active and return holdable offers for an ADT + INF search.
- **Category:** Positive
- **Endpoint Name:** Search -&gt; FareConfirm
- **Request:** V1 Search + FareConfirm, Amadeus/EGY, CAI-&gt;JED 2026-11-29, 1 ADT + 1 INF, isdebug=false
- **Response:** Search 200 with 69 offers (canBeHeld=true on 69, haveBundles=true on 0); FareConfirm 200.
- **Expected:** HTTP 200 on V1 Search with non-empty offers[]; canBeHeld=true on the offers used (so Hold cases are runnable); FareConfirm returns a selectedOffer. Record the offers count and the haveBundles/canBeHeld flags.
- **Actual:** Search 200 with 69 offers (canBeHeld=true on 69, haveBundles=true on 0); FareConfirm 200.
- **Status:** PASS
- **Evidence:** Search 200 with 69 offers (canBeHeld=true on 69, haveBundles=true on 0); FareConfirm 200.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200 

### TC-PAXNAME-BND-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with both first and last name at 26 characters is rejected with the 25-character limit message.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with both first and last name at 26 characters is rejected with the 25-character limit message.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Firstabcdefghijklmnopqrstu: 28 | Lastabcdefghijklmnopqrstuv : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || Th... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Firstabcdefghijklmnopqrstu: 28 | Lastabcdefghijklmnopqrstuv : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || Th... (0.2s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present (covers both names); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.2s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.2s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Firstabcdefghijklmnopqrstu: 28 | Lastabcdefghijklmnopqrstuv : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The passenger information for ADT 'Firstabcdefghijklmnopqrstu MR/Lastabcdefghijklmnopqrstuv(ADT)' tota... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Firstabcdefghijklmnopqrstu: 28 | Lastabcdefghijklmnopqrstuv : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The passenger information for ADT 'Firstabcdefghijklmnopqrstu MR/Lastabcdefghijklmnopqrstuv(ADT)' tota... (0.2s)

### TC-PAXNAME-BND-15 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of 60 characters (52 + 8, one over the maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF combined passenger string of 60 characters (52 + 8, one over the maximum) is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 52 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry (all names &lt;= 25); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)

### TC-PAXNAME-BND-16 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of 61 characters (53 + 8, the stakeholder example total) is rejected even though every name is within 25 characters.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF combined passenger string of 61 characters (53 + 8, the stakeholder example total) is rejected even though every name is with...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefghi MS/Naabcdefgh)' ) and Infant (Liabcdefghi MS/Naabcdefgh/INF) totals 53 characters ... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefghi MS/Naabcdefgh)' ) and Infant (Liabcdefghi MS/Naabcdefgh/INF) totals 53 characters ... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 53 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [53], 0.1s; Book 400 A0001, combined totals [53], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [53], 0.1s; Book 400 A0001, combined totals [53], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefghi MS/Naabcdefgh)' ) and Infant (Liabcdefghi MS/Naabcdefgh/INF) totals 53 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by A... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefghi MS/Naabcdefgh)' ) and Infant (Liabcdefghi MS/Naabcdefgh/INF) totals 53 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by A... (0.1s)

### TC-PAXNAME-VAL-19 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify the lengths reported in the 25-character message equal the actual lengths of the submitted first and last names.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Verify the lengths reported in the 25-character message equal the actual lengths of the submitted first and last names.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Firstabcdefghijklmnopqrstu: 28 | Lastnmabc : 9 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** Context[] entry reads "&lt;first&gt;: 26 | &lt;last&gt; : 9 =&gt; ..." - i.e. the figures equal the raw name lengths (26 and 9).
- **Actual:** Reported first-name length 28 (actual 26, title "Mr" = 2) and last-name length 9 (actual 9). The first-name figure includes the title; the last-name figure does not.
- **Status:** FAIL
- **Evidence:** Reported first-name length 28 (actual 26, title "Mr" = 2) and last-name length 9 (actual 9). The first-name figure includes the title; the last-name figure does not.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-19):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Firstabcdefghijklmnopqrstu: 28 | Lastnmabc : 9 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-VAL-21 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify one name-limit entry is returned per offending passenger (ADT first name and INF last name over 25 give two name entries plus the combined entry).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify one name-limit entry is returned per offending passenger (ADT first name and INF last name over 25 give two name entries plus the combined e...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Adultabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || Lina: 6 | Infantabcdef... (0.1s)
- **Expected:** Context[] has exactly two "exceeds the maximum allowed limit of 25" entries (one per offending passenger) and one combined-length entry; no duplicates.
- **Actual:** 2 name entries (expected 2) and 1 combined entry (expected 1): Adultabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || Lina: 6 | Infantabcdefghijklmnopqrst : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The combined passenger information for Adult 'Adultabcdefghijklmnopqrstu MR/Ibrahim(ADT)(INFLi...
- **Status:** PASS
- **Evidence:** 2 name entries (expected 2) and 1 combined entry (expected 1): Adultabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || Lina: 6 | Infantabcdefghijklmnopqrst : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The combined passenger information for Adult 'Adultabcdefghijklmnopqrstu MR/Ibrahim(ADT)(INFLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-21):** PASS &mdash; 400 NDC-INT-TEC-A0001 Adultabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || Lina: 6 | Infantabcdefghijklmnopqrst : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters ... (0.1s)

### TC-PAXNAME-BND-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of 26 characters (one over the maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT first name of 26 characters (one over the maximum) is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 6 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Book (TC-PAXNAME-BND-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-BND-04 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT last name of 26 characters (one over the maximum) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT last name of 26 characters (one over the maximum) is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Mostafa: 9 | Abcdefghijklmnopqrstuvwxyz : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Mostafa: 9 | Abcdefghijklmnopqrstuvwxyz : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-BND-04):** PASS &mdash; 400 NDC-INT-TEC-A0001 Mostafa: 9 | Abcdefghijklmnopqrstuvwxyz : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 6 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-BND-04):** PASS &mdash; 400 NDC-INT-TEC-A0001 Mostafa: 9 | Abcdefghijklmnopqrstuvwxyz : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-VAL-20 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the combined-length message arithmetic: total = sum of first+title+last+PTC, delimiters = 8, and the quoted adult string matches the submitted passengers.
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the combined-length message arithmetic: total = sum of first+title+last+PTC, delimiters = 8, and the quoted adult string matches the submitt...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Christopher MR/Alexandersson(ADT)(INFMaximilian MS/Alexandersson)' ) and Infant (Maximilian MS/Alexandersson/INF) totals 57 chara... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Christopher MR/Alexandersson(ADT)(INFMaximilian MS/Alexandersson)' ) and Infant (Maximilian MS/Alexandersson/INF) totals 57 chara... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] quotes "Adult '&lt;first&gt; &lt;TITLE&gt;/&lt;last&gt;(ADT)(INF&lt;first&gt; &lt;TITLE&gt;/&lt;last&gt;)'" built from the submitted data, "totals N characters" with N equal to the independently computed sum, "length 8", limit 59.
- **Actual:** Total 57 matches the independent sum; quoted string "Christopher MR/Alexandersson(ADT)(INFMaximilian MS/Alexandersson)"; delimiters 8; limit 59 on Hold and Book
- **Status:** PASS
- **Evidence:** Total 57 matches the independent sum; quoted string "Christopher MR/Alexandersson(ADT)(INFMaximilian MS/Alexandersson)"; delimiters 8; limit 59 on Hold and Book

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-VAL-20):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Christopher MR/Alexandersson(ADT)(INFMaximilian MS/Alexandersson)' ) and Infant (Maximilian MS/Alexandersson/INF) totals 57 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters se... (0.1s)
  - **Hop 7 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 8 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 9 &mdash; V1 Book (TC-PAXNAME-VAL-20):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Christopher MR/Alexandersson(ADT)(INFMaximilian MS/Alexandersson)' ) and Infant (Maximilian MS/Alexandersson/INF) totals 57 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters se... (0.1s)

### TC-PAXNAME-VAL-22 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the same invalid passengersList returns an identical error body on three consecutive calls (only TransactionId differs).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Verify the same invalid passengersList returns an identical error body on three consecutive calls (only TransactionId differs).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Hold: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Hold: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** Three calls give the same Status, ErrorCode, ErrorMessage and Context[]; only TransactionId changes.
- **Actual:** 3 consecutive calls identical (Status, ErrorCode, ErrorMessage, Context); TransactionId differs each time
- **Status:** PASS
- **Evidence:** 3 consecutive calls identical (Status, ErrorCode, ErrorMessage, Context); TransactionId differs each time

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-VAL-22):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 7 &mdash; V1 Hold (TC-PAXNAME-VAL-22):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 8 &mdash; V1 Hold (TC-PAXNAME-VAL-22):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-REG-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the originally reported over-limit scenario (27-character first name + infant, pair total 53) returns the documented two-entry Context.
- **Category:** Regression
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the originally reported over-limit scenario (27-character first name + infant, pair total 53) returns the documented two-entry Context.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 ChristopherAlexanderMaxMost: 29 | Mostafa : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The combined passenge... (0.1s) || Book: 400 NDC-INT-TEC-A0001 ChristopherAlexanderMaxMost: 29 | Mostafa : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The combined passenge... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[0] = "ChristopherAlexanderMaxMost: 29 | Mostafa : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team."; Context[1] = "The combined passenger information for Adult 'ChristopherAlexanderMaxMost MR/Mostafa(ADT)(INFLi MS/Mostafa)' ) and Infant (Li MS/Mostafa/INF) totals 53 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/INF). "; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Context[0] and Context[1] match the supplied text character for character on Hold and Book
- **Status:** PASS
- **Evidence:** Context[0] and Context[1] match the supplied text character for character on Hold and Book

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-REG-01):** PASS &mdash; 400 NDC-INT-TEC-A0001 ChristopherAlexanderMaxMost: 29 | Mostafa : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The combined passenger information for Adult 'ChristopherAlexanderMaxMost MR/Mostafa(ADT)(INFLi MS/Mostafa)' ) and Infant... (0.1s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-REG-01):** PASS &mdash; 400 NDC-INT-TEC-A0001 ChristopherAlexanderMaxMost: 29 | Mostafa : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || The combined passenger information for Adult 'ChristopherAlexanderMaxMost MR/Mostafa(ADT)(INFLi MS/Mostafa)' ) and Infant... (0.1s)

### TC-PAXNAME-POS-01 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a typical ADT + INF passengersList (short names) is accepted on both Hold and Book and echoed untruncated.
- **Category:** Positive
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a typical ADT + INF passengersList (short names) is accepted on both Hold and Book and echoed untruncated.
- **Response:** Hold: 200 pnr 7ILJG8 (7.6s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.7s)
- **Expected:** Hold and Book both HTTP 200 with pnr/gdsPNR/bookingToken; passengersList echoes Mostafa/Ibrahim (ADT) and Lina/Ibrahim (INF) untruncated (the supplier layer upper-cases); Book additionally issues tickets. No NDC-INT-TEC-A0001.
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically | Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically | Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-01):** FAIL &mdash; 200 pnr 7ILJG8 (7.6s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-POS-01):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.7s)

### TC-PAXNAME-POS-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT-only passengersList (no infant) with short names is accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT-only passengersList (no infant) with short names is accepted.
- **Response:** Hold: 200 pnr 7ILQTY (7.0s)
- **Expected:** HTTP 200 with pnr; ADT echoed untruncated.
- **Actual:** Hold 200 pnr 7ILQTY echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7ILQTY echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-POS-02):** PASS &mdash; 200 pnr 7ILQTY (7.0s)

### TC-PAXNAME-POS-03 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + CHD + INF passengersList with short names is accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD+INF) then POST api/FlightBooking/Hold - Validate an ADT + CHD + INF passengersList with short names is accepted.
- **Response:** Hold: 200 pnr 7IM2WK (7.7s)
- **Expected:** HTTP 200 with pnr; all three passengers echoed untruncated.
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-03):** FAIL &mdash; 200 pnr 7IM2WK (7.7s)

### TC-PAXNAME-POS-04 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate two ADT each travelling with their own INF (two short pairs) is accepted and each infant stays linked to its own adult.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold - Validate two ADT each travelling with their own INF (two short pairs) is accepted and each infant stays linked to its own adult.
- **Response:** Hold: 200 pnr 7ILBAV (7.0s)
- **Expected:** HTTP 200 with pnr; four passengers echoed untruncated; each INF keeps its own parent (parentPaxRefId / pairing not crossed).
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically; INF "Nour"/"Hassan" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically; INF "Nour"/"Hassan" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-04):** FAIL &mdash; 200 pnr 7ILBAV (7.0s)

### TC-PAXNAME-POS-05 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a six-passenger party (3 ADT + 1 CHD + 2 INF) where both ADT+INF pairs sit exactly on the 59-character limit is accepted.
- **Category:** Positive
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+ADT+CHD+INF+INF) then POST api/FlightBooking/Hold - Validate a six-passenger party (3 ADT + 1 CHD + 2 INF) where both ADT+INF pairs sit exactly on the 59-character limit is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the max... (0.1s)
- **Expected:** HTTP 200 with pnr; all six passengers echoed untruncated. Each pair is 51 + 8 = 59 (the limit, inclusive); the third ADT (25/25, no infant) and the CHD (25/25) are not part of any pair sum.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 59 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-POS-05):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, t... (0.1s)

### TC-PAXNAME-BND-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of exactly 25 characters (the maximum) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT first name of exactly 25 characters (the maximum) is accepted.
- **Response:** Hold: 200 pnr 7ILBPM (7.3s)
- **Expected:** HTTP 200 with pnr; first name echoed all 25 characters. (Rule R1: first name &lt;= 25.)
- **Actual:** Hold 200 pnr 7ILBPM echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7ILBPM echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-01):** PASS &mdash; 200 pnr 7ILBPM (7.3s)

### TC-PAXNAME-BND-03 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT last name of exactly 25 characters (the maximum) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT last name of exactly 25 characters (the maximum) is accepted.
- **Response:** Hold: 200 pnr 7ILRBX (7.9s)
- **Expected:** HTTP 200 with pnr; last name echoed all 25 characters.
- **Actual:** Hold 200 pnr 7ILRBX echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7ILRBX echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-BND-03):** PASS &mdash; 200 pnr 7ILRBX (7.9s)

### TC-PAXNAME-BND-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with a 25-character first name AND a 25-character last name (ADT only, no infant) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT with a 25-character first name AND a 25-character last name (ADT only, no infant) is accepted.
- **Response:** Hold: 200 pnr 7ILXWM (7.3s)
- **Expected:** HTTP 200 with pnr. Without an infant the combined 59-character rule does not apply (ADT-only string = 25+2+25+3 + 4 delimiters = 59 anyway).
- **Actual:** Hold 200 pnr 7ILXWM echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7ILXWM echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-BND-05):** PASS &mdash; 200 pnr 7ILXWM (7.3s)

### TC-PAXNAME-BND-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of 24 characters with a 2-character title is accepted (the title is not counted against the 25-character first-name limit).
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT first name of 24 characters with a 2-character title is accepted (the title is not counted against the 25-character first-name limit).
- **Response:** Hold: 200 pnr 7IM256 (7.9s)
- **Expected:** HTTP 200 with pnr. 24 &lt;= 25 under rule R1 whatever the title length.
- **Actual:** Hold 200 pnr 7IM256 echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IM256 echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-07):** PASS &mdash; 200 pnr 7IM256 (7.9s)

### TC-PAXNAME-BND-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an INF first name of exactly 25 characters (with a tiny adult so the combined limit is not hit) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an INF first name of exactly 25 characters (with a tiny adult so the combined limit is not hit) is accepted.
- **Response:** Hold: 200 pnr 7ILP6B (7.6s)
- **Expected:** HTTP 200 with pnr; infant first name echoed all 25 characters. Pair total = 9 + 37 = 46 (+8 = 54 &lt;= 59).
- **Actual:** Hold 200 pnr 7ILP6B echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7ILP6B echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-08):** PASS &mdash; 200 pnr 7ILP6B (7.6s)

### TC-PAXNAME-BND-09 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an INF first name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an INF first name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry for the infant; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-BND-09):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 7 &mdash; V1 Book (TC-PAXNAME-BND-09):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-BND-10 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an INF last name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an INF last name of 26 characters (tiny adult, combined limit not hit) is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Lina: 6 | Infantabcdefghijklmnopqrst : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Lina: 6 | Infantabcdefghijklmnopqrst : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry for the infant; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-10):** PASS &mdash; 400 NDC-INT-TEC-A0001 Lina: 6 | Infantabcdefghijklmnopqrst : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-10):** PASS &mdash; 400 NDC-INT-TEC-A0001 Lina: 6 | Infantabcdefghijklmnopqrst : 26 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-BND-11 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD with a 25-character first name and a 25-character last name (alongside a short ADT) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold - Validate a CHD with a 25-character first name and a 25-character last name (alongside a short ADT) is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the max... (0.1s)
- **Expected:** HTTP 200 with pnr; CHD echoed untruncated. The combined 59 rule is ADT+INF only; a CHD is not summed.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-BND-11):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, t... (0.1s)

### TC-PAXNAME-BND-12 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD first name of 26 characters is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a CHD first name of 26 characters is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Childabcdefghijklmnopqrstu: 30 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Childabcdefghijklmnopqrstu: 30 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry for the CHD; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-BND-12):** PASS &mdash; 400 NDC-INT-TEC-A0001 Childabcdefghijklmnopqrstu: 30 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 6 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-BND-12):** PASS &mdash; 400 NDC-INT-TEC-A0001 Childabcdefghijklmnopqrstu: 30 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-BND-13 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of exactly 59 characters (51 + 8 delimiters, the maximum) is accepted on Hold and Book.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT + INF combined passenger string of exactly 59 characters (51 + 8 delimiters, the maximum) is accepted on Hold and Book.
- **Response:** Hold: 200 pnr 7ILZRJ (7.6s) || Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.5s)
- **Expected:** HTTP 200 with pnr on both endpoints. 51 names/titles/PTC characters + 8 delimiters = 59 = the limit, inclusive.
- **Actual:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-13):** FAIL &mdash; 200 pnr 7ILZRJ (7.6s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-13):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (8.5s)

### TC-PAXNAME-BND-14 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT + INF combined passenger string of 58 characters (one under the maximum) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an ADT + INF combined passenger string of 58 characters (one under the maximum) is accepted.
- **Response:** Hold: 200 pnr 7IN7R2 (7.3s)
- **Expected:** HTTP 200 with pnr. 50 + 8 = 58.
- **Actual:** Hold 200 pnr 7IN7R2 echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IN7R2 echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-14):** PASS &mdash; 200 pnr 7IN7R2 (7.3s)

### TC-PAXNAME-BND-21 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT first name of 1,000 characters is rejected quickly with the 25-character message.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT first name of 1,000 characters is rejected quickly with the 25-character message.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second); the response body stays small (does not echo the 1,000-character name more than once per Context entry).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BND-21):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BND-21):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First must be between 2 and 50 characters. || AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA... (0.1s)

### TC-PAXNAME-BIZ-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an adult with 25/25 names plus a minimal infant is rejected by the combined 59 rule (every individual name is within 25).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an adult with 25/25 names plus a minimal infant is rejected by the combined 59 rule (every individual name is within 25).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLi MS/Wu)' ) and Infant (Li MS/Wu/INF) totals 64 characters + Spac... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLi MS/Wu)' ) and Infant (Li MS/Wu/INF) totals 64 characters + Spac... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 64 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [64], 0.1s; Book 400 A0001, combined totals [64], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [64], 0.1s; Book 400 A0001, combined totals [64], 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-01):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLi MS/Wu)' ) and Infant (Li MS/Wu/INF) totals 64 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-01):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLi MS/Wu)' ) and Infant (Li MS/Wu/INF) totals 64 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus... (0.1s)

### TC-PAXNAME-BIZ-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a minimal adult with an infant carrying 25/25 names is rejected by the combined 59 rule.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a minimal adult with an infant carrying 25/25 names is rejected by the combined 59 rule.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Li MR/Wu(ADT)(INFInfantabcdefghijklmnopqrs MS/Minorabcdefghijklmnopqrst)' ) and Infant (Infantabcdefghijklmnopqrs MS/Minorabcdefg... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Li MR/Wu(ADT)(INFInfantabcdefghijklmnopqrs MS/Minorabcdefghijklmnopqrst)' ) and Infant (Infantabcdefghijklmnopqrs MS/Minorabcdefg... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 64 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [64], 0.1s; Book 400 A0001, combined totals [64], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [64], 0.1s; Book 400 A0001, combined totals [64], 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Li MR/Wu(ADT)(INFInfantabcdefghijklmnopqrs MS/Minorabcdefghijklmnopqrst)' ) and Infant (Infantabcdefghijklmnopqrs MS/Minorabcdefghijklmnopqrst/INF) totals 64 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Li MR/Wu(ADT)(INFInfantabcdefghijklmnopqrs MS/Minorabcdefghijklmnopqrst)' ) and Infant (Infantabcdefghijklmnopqrs MS/Minorabcdefghijklmnopqrst/INF) totals 64 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum... (0.1s)

### TC-PAXNAME-BIZ-03 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD is excluded from the combined sum (ADT+INF pair at 59, CHD with 25/25 names) and the booking is accepted.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD+INF) then POST api/FlightBooking/Hold - Validate a CHD is excluded from the combined sum (ADT+INF pair at 59, CHD with 25/25 names) and the booking is accepted.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the max... (0.1s)
- **Expected:** HTTP 200 with pnr. Only the ADT and its linked INF are summed (51 + 8 = 59).
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-03):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrst MISS/Minorabcdefghijklmnopqrst(CHD)' totals 57 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, t... (0.1s)

### TC-PAXNAME-BIZ-04 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate the combined sum uses the infant's linked adult: a 25/25 adult with no infant plus a short adult carrying the infant is accepted.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold - Validate the combined sum uses the infant's linked adult: a 25/25 adult with no infant plus a short adult carrying the infant is accepted.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED / (2.0s)
- **Expected:** HTTP 200 with pnr. The infant is linked to Pax2 (short) so the pair totals 16 + 16 = 32 (+8 = 40, well under 59); Pax1 (25/25) has no infant and is only subject to R1.
- **Actual:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-04):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNOPQRST MR LASTABCDEFGHIJKLMNOPQRSTU =&gt; ITEM TOO LONG / NOT ENTERED / (2.0s)

### TC-PAXNAME-BIZ-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate the same party with the infant linked to the long 25/25 adult is rejected by the combined 59 rule.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate the same party with the infant linked to the long 25/25 adult is rejected by the combined 59 rule.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLina MS/Ibrahim)' ) and Infant (Lina MS/Ibrahim/INF) totals 71 cha... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLina MS/Ibrahim)' ) and Infant (Lina MS/Ibrahim/INF) totals 71 cha... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 71 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no 25-character entry; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [71], 0.1s; Book 400 A0001, combined totals [71], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [71], 0.1s; Book 400 A0001, combined totals [71], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-05):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLina MS/Ibrahim)' ) and Infant (Lina MS/Ibrahim/INF) totals 71 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters ... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 6 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Book (TC-PAXNAME-BIZ-05):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Firstabcdefghijklmnopqrst MR/Lastabcdefghijklmnopqrstu(ADT)(INFLina MS/Ibrahim)' ) and Infant (Lina MS/Ibrahim/INF) totals 71 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters ... (0.1s)

### TC-PAXNAME-BIZ-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate that with two ADT+INF pairs only the offending second pair is reported (one combined entry, pair 1 is clean).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate that with two ADT+INF pairs only the offending second pair is reported (one combined entry, pair 1 is clean).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult 'Kaabcdefghij MR/S... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult 'Kaabcdefghij MR/S... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has exactly one combined-length entry (total 52) and none for pair 1 (51); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult 'Kaabcdefghij MR/Saabcdefgh(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 c... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BIZ-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Duplicate passengers detected: passengers 'Pax3', 'Pax4' have the same first name, last name and birth date. || The combined passenger information for Adult 'Kaabcdefghij MR/Saabcdefgh(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 c... (0.1s)

### TC-PAXNAME-BIZ-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate that when both ADT+INF pairs exceed 59 the response reports each offending pair (two combined entries).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate that when both ADT+INF pairs exceed 59 the response reports each offending pair (two combined entries).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has two combined-length entries (totals 52 and 53); no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52,53], 0.1s; Book 400 A0001, combined totals [52,53], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52,53], 0.1s; Book 400 A0001, combined totals [52,53], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-07):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-BIZ-07):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)

### TC-PAXNAME-BIZ-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate two ADT+INF pairs that each sit exactly on the 59 limit are accepted.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF+INF) then POST api/FlightBooking/Hold - Validate two ADT+INF pairs that each sit exactly on the 59 limit are accepted.
- **Response:** Hold: 200 pnr 7IM94A (7.7s)
- **Expected:** HTTP 200 with pnr; both pairs (51 + 8 = 59 each) accepted; the limit is per pair, not summed across the party.
- **Actual:** Hold 200 pnr 7IM94A echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IM94A echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-08):** PASS &mdash; 200 pnr 7IM94A (7.7s)

### TC-PAXNAME-BIZ-09 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an adult middle name is not added to the combined 59 sum (pair at 59 plus an 11-character adult middle name is accepted).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate an adult middle name is not added to the combined 59 sum (pair at 59 plus an 11-character adult middle name is accepted).
- **Response:** Hold: 200 pnr 7IMNXO (6.9s)
- **Expected:** HTTP 200 with pnr. The combined string is defined over first name, last name, title and PTC only (per the rule text), so the middle name must not push the pair over.
- **Actual:** Hold 200 pnr 7IMNXO echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IMNXO echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-09):** PASS &mdash; 200 pnr 7IMNXO (6.9s)

### TC-PAXNAME-BIZ-10 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 1-character infant middle name is not added to the combined 59 sum (pair at 59 plus infant middle K is accepted).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate a 1-character infant middle name is not added to the combined 59 sum (pair at 59 plus infant middle K is accepted).
- **Response:** Hold: 200 pnr 7IMMPT (7.9s)
- **Expected:** HTTP 200 with pnr; same reasoning as the adult-middle-name case.
- **Actual:** Hold 200 pnr 7IMMPT echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IMMPT echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-10):** PASS &mdash; 200 pnr 7IMMPT (7.9s)

### TC-PAXNAME-BIZ-11 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate first (13) + middle (13) totalling 26 characters is accepted because rule R1 is per field.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate first (13) + middle (13) totalling 26 characters is accepted because rule R1 is per field.
- **Response:** Hold: 200 pnr 7IMO3F (7.2s)
- **Expected:** HTTP 200 with pnr; first and middle echoed untruncated. R1 limits first name and last name individually.
- **Actual:** Hold 200 pnr 7IMO3F echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IMO3F echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-11):** PASS &mdash; 200 pnr 7IMO3F (7.2s)

### TC-PAXNAME-BIZ-12 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 30-character middle name (first and last short) is handled with a controlled outcome.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 30-character middle name (first and last short) is handled with a controlled outcome.
- **Response:** Hold: 200 pnr 7ILSXZ (7.6s)
- **Expected:** Controlled outcome: HTTP 200 with the middle name echoed without silent truncation, or an HTTP 4xx validation error. Never 5xx.
- **Actual:** Controlled outcome - Hold: 200 accepted pnr 7ILSXZ
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 200 accepted pnr 7ILSXZ | OBSERVED: Hold: 200 accepted pnr 7ILSXZ

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-12):** PASS &mdash; 200 pnr 7ILSXZ (7.6s)

### TC-PAXNAME-BIZ-13 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 20-character title on short names is rejected by the combined 59 rule (total 53) rather than silently truncated.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 20-character title on short names is rejected by the combined 59 rule (total 53) rather than silently truncated.
- **Response:** Hold: 400  {"status":400,"transactionId":"6afd7913-78ba-4a5c-ae3d-41e29d76a115","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"ce433c03-ee2a-4e50-9f1b-ce3ee224a866","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 53 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold: expected 400 A0001, got 400  {"status":400,"transactionId":"6afd7913-78ba-4a5c-ae3d-41e29d76a115","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"The JSON | Book: expected 400 A0001, got 400  {"status":400,"transactionId":"ce433c03-ee2a-4e50-9f1b-ce3ee224a866","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.title","valu
- **Status:** FAIL
- **Evidence:** Hold: expected 400 A0001, got 400  {"status":400,"transactionId":"6afd7913-78ba-4a5c-ae3d-41e29d76a115","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"The JSON | Book: expected 400 A0001, got 400  {"status":400,"transactionId":"ce433c03-ee2a-4e50-9f1b-ce3ee224a866","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.title","valu

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-13):** FAIL &mdash; 400  {"status":400,"transactionId":"6afd7913-78ba-4a5c-ae3d-41e29d76a115","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-13):** FAIL &mdash; 400  {"status":400,"transactionId":"ce433c03-ee2a-4e50-9f1b-ce3ee224a866","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.titl... (0.1s)

### TC-PAXNAME-BIZ-14 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate pair evaluation does not depend on key order: an infant listed before its adult (Pax1=INF, Pax2=ADT) at 52 is rejected.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (INF+ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate pair evaluation does not depend on key order: an infant listed before its adult (Pax1=INF, Pax2=ADT) at 52 is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 52 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-14):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BIZ-14):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)

### TC-PAXNAME-BIZ-15 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an infant with no ParentPaxRefId and over-limit names returns a controlled 4xx.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an infant with no ParentPaxRefId and over-limit names returns a controlled 4xx.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name e... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name e... (0.1s)
- **Expected:** HTTP 4xx controlled validation error (exact code UNKNOWN - record whether the name rule or the missing-parent rule fires first); never 5xx; no PNR.
- **Actual:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 ...; Book 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 ...
- **Status:** PASS
- **Evidence:** Hold 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 ...; Book 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 ... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name e... || Book: 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name e...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-BIZ-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-BIZ-15):** PASS &mdash; 400 NDC-INT-TEC-A0001 Infant passenger 'Pax2': ParentPaxRefId is required and must reference an adult (ADT) passenger. || Infantabcdefghijklmnopqrst: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

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
- **Response:** Hold: 400  {"status":400,"transactionId":"1380b703-c4bd-4981-8a43-6874f020846b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.2s) || Book: 400  {"status":400,"transactionId":"a00e29af-0a91-4fd8-9f18-beac28e07a6b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.2s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"1380b703-c4bd-4981-8a43-6874f020846b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"a00e29af-0a91-4fd8-9f18-beac28e07a6b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"1380b703-c4bd-4981-8a43-6874f020846b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"a00e29af-0a91-4fd8-9f18-beac28e07a6b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"1380b703-c4bd-4981-8a43-6874f020846b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"a00e29af-0a91-4fd8-9f18-beac28e07a6b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-NEG-01):** PASS &mdash; 400  {"status":400,"transactionId":"1380b703-c4bd-4981-8a43-6874f020846b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.2s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-NEG-01):** PASS &mdash; 400  {"status":400,"transactionId":"a00e29af-0a91-4fd8-9f18-beac28e07a6b","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.2s)

### TC-PAXNAME-NEG-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty-string ADT last name is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty-string ADT last name is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"4135dd1e-bcd9-44a5-a113-96fb9b6b606f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"001b579b-df49-42ec-a378-396cb39dfa1c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"4135dd1e-bcd9-44a5-a113-96fb9b6b606f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"001b579b-df49-42ec-a378-396cb39dfa1c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"4135dd1e-bcd9-44a5-a113-96fb9b6b606f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"001b579b-df49-42ec-a378-396cb39dfa1c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"4135dd1e-bcd9-44a5-a113-96fb9b6b606f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"001b579b-df49-42ec-a378-396cb39dfa1c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-02):** PASS &mdash; 400  {"status":400,"transactionId":"4135dd1e-bcd9-44a5-a113-96fb9b6b606f","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."},{"name":"PassengersList[0].Value.Trave... (0.1s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-NEG-02):** PASS &mdash; 400  {"status":400,"transactionId":"001b579b-df49-42ec-a378-396cb39dfa1c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."},{"name":"PassengersList[0].Value.Trave... (0.1s)

### TC-PAXNAME-NEG-03 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a whitespace-only ADT first name is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a whitespace-only ADT first name is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"1d8a50da-6f6f-4a44-b190-bb48c93b48c0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"e0625ddd-1496-46fa-9f0c-094162613b9c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.2s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"1d8a50da-6f6f-4a44-b190-bb48c93b48c0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"e0625ddd-1496-46fa-9f0c-094162613b9c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"1d8a50da-6f6f-4a44-b190-bb48c93b48c0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"e0625ddd-1496-46fa-9f0c-094162613b9c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"1d8a50da-6f6f-4a44-b190-bb48c93b48c0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"e0625ddd-1496-46fa-9f0c-094162613b9c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-03):** PASS &mdash; 400  {"status":400,"transactionId":"1d8a50da-6f6f-4a44-b190-bb48c93b48c0","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-03):** PASS &mdash; 400  {"status":400,"transactionId":"e0625ddd-1496-46fa-9f0c-094162613b9c","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[0].Value.Tra... (0.2s)

### TC-PAXNAME-NEG-04 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with the name.first key omitted is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with the name.first key omitted is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"3bcffde7-015e-42b8-9746-5fc5e603be1d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"a5ae9d43-632f-40c8-b193-694259ba8e83","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"3bcffde7-015e-42b8-9746-5fc5e603be1d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"a5ae9d43-632f-40c8-b193-694259ba8e83","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"3bcffde7-015e-42b8-9746-5fc5e603be1d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"a5ae9d43-632f-40c8-b193-694259ba8e83","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"3bcffde7-015e-42b8-9746-5fc5e603be1d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"a5ae9d43-632f-40c8-b193-694259ba8e83","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-04):** PASS &mdash; 400  {"status":400,"transactionId":"3bcffde7-015e-42b8-9746-5fc5e603be1d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."}],"originalSupplierRequest":null,"ori... (0.1s)
  - **Hop 2 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-NEG-04):** PASS &mdash; 400  {"status":400,"transactionId":"a5ae9d43-632f-40c8-b193-694259ba8e83","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.First","value":"The First field is required."}],"originalSupplierRequest":null,"ori... (0.1s)

### TC-PAXNAME-NEG-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with the whole name object omitted is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with the whole name object omitted is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"346ad2dd-4158-455c-bfdd-67b6943fb1ca","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"f2b84466-c0ef-4987-a31c-a46b20f78255","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"346ad2dd-4158-455c-bfdd-67b6943fb1ca","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"f2b84466-c0ef-4987-a31c-a46b20f78255","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"346ad2dd-4158-455c-bfdd-67b6943fb1ca","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"f2b84466-c0ef-4987-a31c-a46b20f78255","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"346ad2dd-4158-455c-bfdd-67b6943fb1ca","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"f2b84466-c0ef-4987-a31c-a46b20f78255","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-05):** PASS &mdash; 400  {"status":400,"transactionId":"346ad2dd-4158-455c-bfdd-67b6943fb1ca","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name","value":"The Name field is required."}],"originalSupplierRequest":null,"originalSu... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-05):** PASS &mdash; 400  {"status":400,"transactionId":"f2b84466-c0ef-4987-a31c-a46b20f78255","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name","value":"The Name field is required."}],"originalSupplierRequest":null,"originalSu... (0.1s)

### TC-PAXNAME-NEG-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with name.last set to null is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with name.last set to null is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"72a22b57-b08b-4294-9914-6539d345e5d6","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"562f09ae-639d-4c7a-a878-1bdda337a585","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"72a22b57-b08b-4294-9914-6539d345e5d6","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"562f09ae-639d-4c7a-a878-1bdda337a585","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"72a22b57-b08b-4294-9914-6539d345e5d6","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"562f09ae-639d-4c7a-a878-1bdda337a585","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"72a22b57-b08b-4294-9914-6539d345e5d6","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"562f09ae-639d-4c7a-a878-1bdda337a585","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-06):** PASS &mdash; 400  {"status":400,"transactionId":"72a22b57-b08b-4294-9914-6539d345e5d6","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."}],"originalSupplierRequest":null,"origi... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-06):** PASS &mdash; 400  {"status":400,"transactionId":"562f09ae-639d-4c7a-a878-1bdda337a585","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Name.Last","value":"The Last field is required."}],"originalSupplierRequest":null,"origi... (0.1s)

### TC-PAXNAME-NEG-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty-string ADT title is rejected or handled in a controlled way.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty-string ADT title is rejected or handled in a controlled way.
- **Response:** Hold: 400  {"status":400,"transactionId":"04f8a326-2856-4613-b991-0557990cd770","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"d42ea152-ae98-48ef-8100-b31df83525bc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** Controlled outcome: HTTP 4xx, or HTTP 200 with a defaulted title; never 5xx. UNKNOWN - confirm live.
- **Actual:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"04f8a326-2856-4613-b991-0557990cd770","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol... || Book: 400  {"status":400,"transactionId":"d42ea152-ae98-48ef-8100-b31df83525bc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"T...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"04f8a326-2856-4613-b991-0557990cd770","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol... || Book: 400  {"status":400,"transactionId":"d42ea152-ae98-48ef-8100-b31df83525bc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"T... | OBSERVED: Hold: 400  {"status":400,"transactionId":"04f8a326-2856-4613-b991-0557990cd770","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The hol... || Book: 400  {"status":400,"transactionId":"d42ea152-ae98-48ef-8100-b31df83525bc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"T...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-NEG-07):** PASS &mdash; 400  {"status":400,"transactionId":"04f8a326-2856-4613-b991-0557990cd770","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"... (0.1s)
  - **Hop 6 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-NEG-07):** PASS &mdash; 400  {"status":400,"transactionId":"d42ea152-ae98-48ef-8100-b31df83525bc","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.titl... (0.1s)

### TC-PAXNAME-NEG-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT with the title key omitted is rejected or handled in a controlled way.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an ADT with the title key omitted is rejected or handled in a controlled way.
- **Response:** Hold: 400  {"status":400,"transactionId":"461b76aa-396b-4917-b592-51e1ea8625dd","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"5e3065d7-bf56-4272-906b-ffbb9fdba788","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** Controlled outcome: HTTP 4xx, or HTTP 200 with a defaulted title; never 5xx. UNKNOWN - confirm live.
- **Actual:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"461b76aa-396b-4917-b592-51e1ea8625dd","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... || Book: 400  {"status":400,"transactionId":"5e3065d7-bf56-4272-906b-ffbb9fdba788","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400  {"status":400,"transactionId":"461b76aa-396b-4917-b592-51e1ea8625dd","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... || Book: 400  {"status":400,"transactionId":"5e3065d7-bf56-4272-906b-ffbb9fdba788","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... | OBSERVED: Hold: 400  {"status":400,"transactionId":"461b76aa-396b-4917-b592-51e1ea8625dd","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","... || Book: 400  {"status":400,"transactionId":"5e3065d7-bf56-4272-906b-ffbb9fdba788","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-NEG-08):** PASS &mdash; 400  {"status":400,"transactionId":"461b76aa-396b-4917-b592-51e1ea8625dd","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","value":"Select a valid title"}],"originalSupplierRequest":null,"originalSupplier... (0.1s)
  - **Hop 5 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 6 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 7 &mdash; V1 Book (TC-PAXNAME-NEG-08):** PASS &mdash; 400  {"status":400,"transactionId":"5e3065d7-bf56-4272-906b-ffbb9fdba788","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[0].Value.Title","value":"Select a valid title"}],"originalSupplierRequest":null,"originalSupplier... (0.1s)

### TC-PAXNAME-NEG-09 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an empty-string INF first name (with its adult) is rejected.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an empty-string INF first name (with its adult) is rejected.
- **Response:** Hold: 400  {"status":400,"transactionId":"9a6f3f52-8d5a-4ce1-a2d5-3f293b99052d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"6dd34795-5197-48f8-a54e-092616e8c215","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"9a6f3f52-8d5a-4ce1-a2d5-3f293b99052d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"6dd34795-5197-48f8-a54e-092616e8c215","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"9a6f3f52-8d5a-4ce1-a2d5-3f293b99052d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"6dd34795-5197-48f8-a54e-092616e8c215","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"9a6f3f52-8d5a-4ce1-a2d5-3f293b99052d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"6dd34795-5197-48f8-a54e-092616e8c215","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-09):** PASS &mdash; 400  {"status":400,"transactionId":"9a6f3f52-8d5a-4ce1-a2d5-3f293b99052d","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[1].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[1].Value.Tra... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-09):** PASS &mdash; 400  {"status":400,"transactionId":"6dd34795-5197-48f8-a54e-092616e8c215","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList[1].Value.Name.First","value":"The First field is required."},{"name":"PassengersList[1].Value.Tra... (0.1s)

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
- **Response:** Hold: 400  {"status":400,"transactionId":"bf104a30-0f80-4317-ab11-2ca67c143040","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s) || Book: 400  {"status":400,"transactionId":"e66c6073-bf6c-4ae4-9aa4-50aa3a8f41ec","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"bf104a30-0f80-4317-ab11-2ca67c143040","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"e66c6073-bf6c-4ae4-9aa4-50aa3a8f41ec","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"bf104a30-0f80-4317-ab11-2ca67c143040","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"e66c6073-bf6c-4ae4-9aa4-50aa3a8f41ec","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"bf104a30-0f80-4317-ab11-2ca67c143040","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi... || Book: 400  {"status":400,"transactionId":"e66c6073-bf6c-4ae4-9aa4-50aa3a8f41ec","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersLi...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-11):** PASS &mdash; 400  {"status":400,"transactionId":"bf104a30-0f80-4317-ab11-2ca67c143040","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList","value":"The PassengersList field is required."}],"originalSupplierRequest":null,"originalSuppli... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-11):** PASS &mdash; 400  {"status":400,"transactionId":"e66c6073-bf6c-4ae4-9aa4-50aa3a8f41ec","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"PassengersList","value":"The PassengersList field is required."}],"originalSupplierRequest":null,"originalSuppli... (0.1s)

### TC-PAXNAME-NEG-12 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a numeric (non-string) name.first value is rejected without a 5xx.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a numeric (non-string) name.first value is rejected without a 5xx.
- **Response:** Hold: 400  {"status":400,"transactionId":"75e1c494-e0d3-4ea5-9861-8f43fd254b26","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"575fcb5c-5d77-4ce6-a740-97a47f6c72cf","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"75e1c494-e0d3-4ea5-9861-8f43fd254b26","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"575fcb5c-5d77-4ce6-a740-97a47f6c72cf","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"75e1c494-e0d3-4ea5-9861-8f43fd254b26","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"575fcb5c-5d77-4ce6-a740-97a47f6c72cf","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"75e1c494-e0d3-4ea5-9861-8f43fd254b26","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... || Book: 400  {"status":400,"transactionId":"575fcb5c-5d77-4ce6-a740-97a47f6c72cf","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-12):** PASS &mdash; 400  {"status":400,"transactionId":"75e1c494-e0d3-4ea5-9861-8f43fd254b26","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.name.first","val... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-12):** PASS &mdash; 400  {"status":400,"transactionId":"575fcb5c-5d77-4ce6-a740-97a47f6c72cf","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.name... (0.1s)

### TC-PAXNAME-NEG-13 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an object-typed name.first value is rejected without a 5xx.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an object-typed name.first value is rejected without a 5xx.
- **Response:** Hold: 400  {"status":400,"transactionId":"4819c300-6fce-493e-8c98-289576f87572","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s) || Book: 400  {"status":400,"transactionId":"ca63db29-a5ea-44d6-bf3f-e625ea382374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe... (0.1s)
- **Expected:** HTTP 400 controlled validation error (exact ErrorCode UNKNOWN - record); never 5xx; no PNR.
- **Actual:** Hold 400  {"status":400,"transactionId":"4819c300-6fce-493e-8c98-289576f87572","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"ca63db29-a5ea-44d6-bf3f-e625ea382374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"4819c300-6fce-493e-8c98-289576f87572","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...; Book 400  {"status":400,"transactionId":"ca63db29-a5ea-44d6-bf3f-e625ea382374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"4819c300-6fce-493e-8c98-289576f87572","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... || Book: 400  {"status":400,"transactionId":"ca63db29-a5ea-44d6-bf3f-e625ea382374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRe...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-13):** PASS &mdash; 400  {"status":400,"transactionId":"4819c300-6fce-493e-8c98-289576f87572","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.name.first","val... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-13):** PASS &mdash; 400  {"status":400,"transactionId":"ca63db29-a5ea-44d6-bf3f-e625ea382374","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"flightBookRequestDto","value":"The flightBookRequestDto field is required."},{"name":"$.passengersList.Pax1.name... (0.1s)

### TC-PAXNAME-NEG-14 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 10,000-character ADT last name is rejected without a 5xx or an oversized reflected response.
- **Category:** Negative
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 10,000-character ADT last name is rejected without a 5xx or an oversized reflected response.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s)
- **Expected:** HTTP 400 NDC-INT-TEC-A0001 with the 25-character message; never 5xx; no PNR; response body well under 100 KB.
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-14):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-NEG-14):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last must be between 2 and 50 characters. || Mostafa: 9 | BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB... (0.1s)

### TC-PAXNAME-NEG-15 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit name together with an invalid fareConfirmResponseId returns a controlled 4xx and records which validation fires first.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an over-limit name together with an invalid fareConfirmResponseId returns a controlled 4xx and records which validation fires first.
- **Response:** Hold: 400  {"status":400,"transactionId":"b57beab7-3be3-476b-b492-3211e446e6a9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD... (0.1s)
- **Expected:** HTTP 4xx controlled error; never 5xx; no PNR. Record whether the name rule or the id rule is reported first (UNKNOWN).
- **Actual:** Hold 400  {"status":400,"transactionId":"b57beab7-3be3-476b-b492-3211e446e6a9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"b57beab7-3be3-476b-b492-3211e446e6a9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"b57beab7-3be3-476b-b492-3211e446e6a9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestD...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-15):** PASS &mdash; 400  {"status":400,"transactionId":"b57beab7-3be3-476b-b492-3211e446e6a9","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.fareConfirmResponseId","value":"The ... (0.1s)

### TC-PAXNAME-NEG-16 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit name together with a missing contactsList returns a controlled 4xx.
- **Category:** Negative
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an over-limit name together with a missing contactsList returns a controlled 4xx.
- **Response:** Hold: 400  {"status":400,"transactionId":"d4b95ed1-cf06-41f5-b801-e375bba96aab","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"ContactsList... (0.1s)
- **Expected:** HTTP 4xx controlled error; never 5xx; no PNR. Record which validation is reported first (UNKNOWN).
- **Actual:** Hold 400  {"status":400,"transactionId":"d4b95ed1-cf06-41f5-b801-e375bba96aab","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c...
- **Status:** PASS
- **Evidence:** Hold 400  {"status":400,"transactionId":"d4b95ed1-cf06-41f5-b801-e375bba96aab","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","c... | OBSERVED: Hold: 400  {"status":400,"transactionId":"d4b95ed1-cf06-41f5-b801-e375bba96aab","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"ContactsList...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-NEG-16):** PASS &mdash; 400  {"status":400,"transactionId":"d4b95ed1-cf06-41f5-b801-e375bba96aab","errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"ContactsList","value":"The ContactsList field is required."}],"originalSupplierRequest":null,"originalSupplierRe... (0.1s)

### TC-PAXNAME-VAL-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 25-character first name that contains an embedded space is accepted (the space counts as one of the 25).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 25-character first name that contains an embedded space is accepted (the space counts as one of the 25).
- **Response:** Hold: 200 pnr 7IN6G8 (8.5s)
- **Expected:** HTTP 200 with pnr; first name echoed 25 characters including the space.
- **Actual:** Hold 200 pnr 7IN6G8 echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IN6G8 echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-01):** PASS &mdash; 200 pnr 7IN6G8 (8.5s)

### TC-PAXNAME-VAL-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 26-character first name that contains an embedded space is rejected (the space is counted).
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 26-character first name that contains an embedded space is rejected (the space is counted).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Maryabcdefgh Anneabcdefghi: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Maryabcdefgh Anneabcdefghi: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 Maryabcdefgh Anneabcdefghi: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-02):** PASS &mdash; 400 NDC-INT-TEC-A0001 Maryabcdefgh Anneabcdefghi: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-04):** FAIL &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'O'Connor-O'Brien-O'Malley' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-05 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 26-character hyphenated last name is rejected.
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 26-character hyphenated last name is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. || Mostafa: 9 | Al-Mansour-Abdel-Rahman-Al- : 27 =&gt; a first name or last name e... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. || Mostafa: 9 | Al-Mansour-Abdel-Rahman-Al- : 27 =&gt; a first name or last name e... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; "&lt;first&gt;: n | &lt;last&gt; : m =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team." entry present; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, 1 name entry, 0.1s; Book 400 A0001, 1 name entry, 0.1s

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-05):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. || Mostafa: 9 | Al-Mansour-Abdel-Rahman-Al- : 27 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-05):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.Last 'Al-Mansour-Abdel-Rahman-Al-' must only contain letters and spaces. || Mostafa: 9 | Al-Mansour-Abdel-Rahman-Al- : 27 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-VAL-06 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name of 25 letters plus one trailing space (26 raw characters) is handled consistently (trimmed or counted).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name of 25 letters plus one trailing space (26 raw characters) is handled consistently (trimmed or counted).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Trailabcdefghijklmnopqrst : 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. Preferred: trailing whitespace trimmed, 25 letters accepted.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Trailabcdefghijklmnopqrst : 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Trailabcdefghijklmnopqrst : 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Trailabcdefghijklmnopqrst : 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Hold (TC-PAXNAME-VAL-06):** PASS &mdash; 400 NDC-INT-TEC-A0001 Trailabcdefghijklmnopqrst : 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-VAL-07 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name of one leading space plus 25 letters (26 raw characters) is handled consistently (trimmed or counted).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name of one leading space plus 25 letters (26 raw characters) is handled consistently (trimmed or counted).
- **Response:** Hold: 400 NDC-INT-TEC-A0001  Leadabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. Preferred: leading whitespace trimmed, 25 letters accepted.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001  Leadabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team.
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001  Leadabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. | OBSERVED: Hold: 400 NDC-INT-TEC-A0001  Leadabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-VAL-07):** PASS &mdash; 400 NDC-INT-TEC-A0001  Leadabcdefghijklmnopqrstu: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-VAL-08):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'John2' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-10 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 26-character Arabic first name is rejected (length rule applies to non-Latin names).
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a 26-character Arabic first name is rejected (length rule applies to non-Latin names).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400 controlled validation error (the 25-character message and/or a character-set rejection); never 5xx; no PNR.
- **Actual:** Hold 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support t...; Book 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support t...
- **Status:** PASS
- **Evidence:** Hold 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support t...; Book 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support t... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. || Book: 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team.

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-10):** PASS &mdash; 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-10):** PASS &mdash; 400 NDC-INT-TEC-A0001 مممممممممممممممممممممممممم: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-VAL-12 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a decomposed-accent first name (13 x "e" + U+0301 = 13 visible letters, 26 code units) is handled consistently with the 25 limit.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a decomposed-accent first name (13 x "e" + U+0301 = 13 visible letters, 26 code units) is handled consistently with the 25 limit.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. || ééééééééééééé: 28 | Ibrahim : 7 =&gt; a first name or last name ex... (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. Length is measured in UTF-16 code units (26) or graphemes (13); record which.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. || ééééééééééééé: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum al...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. || ééééééééééééé: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum al... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. || ééééééééééééé: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum al...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-12):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'ééééééééééééé' must only contain letters and spaces. || ééééééééééééé: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-VAL-13 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a first name of 13 emoji (U+1F600 x 13 = 13 code points, 26 UTF-16 units) is handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a first name of 13 emoji (U+1F600 x 13 = 13 code points, 26 UTF-16 units) is handled with a controlled outcome.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. || 😀😀😀😀😀😀😀😀😀😀😀😀😀: 28 | Ibrahim : 7 =&gt; a first name or last name ex... (0.1s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it.
- **Actual:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. || 😀😀😀😀😀😀😀😀😀😀😀😀😀: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum al...
- **Status:** PASS
- **Evidence:** Controlled outcome - Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. || 😀😀😀😀😀😀😀😀😀😀😀😀😀: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum al... | OBSERVED: Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. || 😀😀😀😀😀😀😀😀😀😀😀😀😀: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum al...

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-13):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '😀😀😀😀😀😀😀😀😀😀😀😀😀' must only contain letters and spaces. || 😀😀😀😀😀😀😀😀😀😀😀😀😀: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-VAL-16):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First 'Mos
tafa	' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-VAL-18 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the name-limit rejection envelope: Status 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage, GUID TransactionId, Context[] of {Value} objects, JSON content type.
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the name-limit rejection envelope: Status 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage, GUID TransactionId, Context[] of {Value} objects, ...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400; body = { Status:400, TransactionId:&lt;GUID&gt;, ErrorCode:"NDC-INT-TEC-A0001", ErrorMessage:"Invalid request. Please check the request parameters and try again.", Context:[{Value:"..."}] }; Content-Type application/json; identical on Hold and Book.
- **Actual:** Envelope identical on Hold and Book: Status 400, A0001, standard message, GUID TransactionId, 1 Context entry, content-type application/json
- **Status:** PASS
- **Evidence:** Envelope identical on Hold and Book: Status 400, A0001, standard message, GUID TransactionId, 1 Context entry, content-type application/json

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-18):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-VAL-18):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-VAL-23 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the same over-limit passengersList returns the same error on Hold and Book (cross-endpoint consistency).
- **Category:** Validation
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the same over-limit passengersList returns the same error on Hold and Book (cross-endpoint consistency).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s)
- **Expected:** Hold and Book return the same HTTP status, ErrorCode, ErrorMessage and Context[] for the identical passengersList.
- **Actual:** Hold and Book return identical status/ErrorCode/ErrorMessage/Context
- **Status:** PASS
- **Evidence:** Hold and Book return identical status/ErrorCode/ErrorMessage/Context

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)
  - **Hop 4 &mdash; V1 Book (TC-PAXNAME-VAL-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)

### TC-PAXNAME-VAL-24 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the name-limit rejection is returned before any supplier call (response under 2 seconds, three repeats, no PNR).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify the name-limit rejection is returned before any supplier call (response under 2 seconds, three repeats, no PNR).
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s) || Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s) || Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s)
- **Expected:** Three consecutive rejections each return in under 2 seconds with no pnr/gdsPNR - the check runs in the integration layer, not after an Amadeus round trip (a Hold that reaches Amadeus takes ~7 s).
- **Actual:** 3 rejections in 0.1s, 0.1s, 0.1s, no PNR (a reaching-Amadeus Hold takes ~7s)
- **Status:** PASS
- **Evidence:** 3 rejections in 0.1s, 0.1s, 0.1s, no PNR (a reaching-Amadeus Hold takes ~7s)

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-VAL-24):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)
  - **Hop 2 &mdash; V1 Hold (TC-PAXNAME-VAL-24):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-24):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefghi(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)

### TC-PAXNAME-SEC-01 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit passengersList without the x-api-key header is rejected as unauthenticated, not as a name-validation error.
- **Category:** Security
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate an over-limit passengersList without the x-api-key header is rejected as unauthenticated, not as a name-validation error.
- **Response:** Hold: 401 AuthenticationError Invalid authorization header (0.1s) || Book: 401 AuthenticationError Invalid authorization header (0.1s)
- **Expected:** HTTP 401/403 (authentication precedes validation); the body does not disclose the Amadeus name rules; no PNR.
- **Actual:** Hold 401 {"Status":401,"TransactionId":"6535d266-0fc5-4add-955f-6882f91506b1","ErrorCode":"AuthenticationE...; Book 401 {"Status":401,"TransactionId":"87abf864-16c8-4aae-a1ea-36b06eae8da1","ErrorCode":"AuthenticationE...
- **Status:** PASS
- **Evidence:** Hold 401 {"Status":401,"TransactionId":"6535d266-0fc5-4add-955f-6882f91506b1","ErrorCode":"AuthenticationE...; Book 401 {"Status":401,"TransactionId":"87abf864-16c8-4aae-a1ea-36b06eae8da1","ErrorCode":"AuthenticationE...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-01):** PASS &mdash; 401 AuthenticationError Invalid authorization header (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-SEC-01):** PASS &mdash; 401 AuthenticationError Invalid authorization header (0.1s)

### TC-PAXNAME-SEC-02 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate an over-limit passengersList with an invalid x-api-key is rejected as unauthenticated.
- **Category:** Security
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an over-limit passengersList with an invalid x-api-key is rejected as unauthenticated.
- **Response:** Hold: 401 AuthenticationError Invalid authorization header (0.1s)
- **Expected:** HTTP 401/403; the body does not disclose the Amadeus name rules; no PNR.
- **Actual:** Hold 401 {"Status":401,"TransactionId":"59a068ab-b346-4dba-a907-68e80c661400","ErrorCode":"AuthenticationE...
- **Status:** PASS
- **Evidence:** Hold 401 {"Status":401,"TransactionId":"59a068ab-b346-4dba-a907-68e80c661400","ErrorCode":"AuthenticationE...

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-02):** PASS &mdash; 401 AuthenticationError Invalid authorization header (0.1s)

### TC-PAXNAME-SEC-03 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify a script-tag payload used as an over-limit first name is rejected and reflected only as escaped JSON text.
- **Category:** Security
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify a script-tag payload used as an over-limit first name is rejected and reflected only as escaped JSON text.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. || "&gt;&lt;img src=x onerror=alert(1)&gt;: 32 | Ibrahim : 7 =&gt; a first name or last... (0.1s) || Book: 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. || "&gt;&lt;img src=x onerror=alert(1)&gt;: 32 | Ibrahim : 7 =&gt; a first name or last... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Content-Type is application/json (never text/html); the payload appears only inside a JSON string (valid JSON, quotes escaped); no PNR.
- **Actual:** 400 A0001, Content-Type application/json, payload reflected only inside a valid JSON string
- **Status:** PASS
- **Evidence:** 400 A0001, Content-Type application/json, payload reflected only inside a valid JSON string

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-03):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. || "&gt;&lt;img src=x onerror=alert(1)&gt;: 32 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-SEC-03):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '"&gt;&lt;img src=x onerror=alert(1)&gt;' must only contain letters and spaces. || "&gt;&lt;img src=x onerror=alert(1)&gt;: 32 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-SEC-07):** PASS &mdash; 400 NDC-INT-TEC-A0001 Passenger 'Pax1': Name.First '%s%s%s%n{0}{1}' must only contain letters and spaces. (0.1s)

### TC-PAXNAME-SEC-08 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify the name-limit rejection body leaks no supplier request/response, credentials, stack trace or internal type names.
- **Category:** Security
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Verify the name-limit rejection body leaks no supplier request/response, credentials, stack trace or internal type names.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s) || Book: 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; the body contains none of: supplierRequest, supplierResponse, OriginalSupplierRequest/Response, password, Authorization, Bearer, x-api-key, stack-trace lines, .NET/Java type names.
- **Actual:** No leak tokens in the Hold 360-byte / Book 360-byte error body (keys: Status,TransactionId,ErrorCode,ErrorMessage,Context)
- **Status:** PASS
- **Evidence:** No leak tokens in the Hold 360-byte / Book 360-byte error body (keys: Status,TransactionId,ErrorCode,ErrorMessage,Context)

  - **Hop 1 &mdash; V1 Hold (TC-PAXNAME-SEC-08):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)
  - **Hop 2 &mdash; V1 Book (TC-PAXNAME-SEC-08):** PASS &mdash; 400 NDC-INT-TEC-A0001 Abcdefghijklmnopqrstuvwxyz: 28 | Ibrahim : 7 =&gt; a first name or last name exceeds the maximum allowed limit of 25 characters by Amadeus support team. (0.1s)

### TC-PAXNAME-BND-17 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate an ADT-only passenger with 25-character first and last names and the 3-character title Mrs (string length 60 incl. 4 delimiters) is accepted because the combined rule is ADT+INF only.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate an ADT-only passenger with 25-character first and last names and the 3-character title Mrs (string length 60 incl. 4 delimiters) is accept...
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger information for ADT 'Firstabcdefghijklmnopqrst MRS/Lastabcdefghijklmnopqrstu(ADT)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maxi... (0.1s)
- **Expected:** HTTP 200 with pnr. Rule R2 is stated for an Adult and Infant pair; an ADT with no infant is not subject to it.
- **Actual:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for ADT 'Firstabcdefghijklmnopqrst MRS/Lastabcdefghijklmnopqrstu(ADT)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 400 NDC-INT-TEC-A0001 The passenger information for ADT 'Firstabcdefghijklmnopqrst MRS/Lastabcdefghijklmnopqrstu(ADT)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, title, passenger type code (ADT/CHD). Delimiters and spaces are also counted in the total length. Please shorten the names or remove optional details to proceed.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-17):** FAIL &mdash; 400 NDC-INT-TEC-A0001 The passenger information for ADT 'Firstabcdefghijklmnopqrst MRS/Lastabcdefghijklmnopqrstu(ADT)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, ti... (0.1s)

### TC-PAXNAME-BND-18 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate the adult title is counted exactly once in the combined limit (names sum 40 with title Mrs = 51, accepted).
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Validate the adult title is counted exactly once in the combined limit (names sum 40 with title Mrs = 51, accepted).
- **Response:** Hold: 200 pnr 7INSRD (7.6s)
- **Expected:** HTTP 200 with pnr. 40 name chars + Mrs(3) + MS(2) + 6 PTC = 51; 51 + 8 = 59.
- **Actual:** Hold 200 pnr 7INSRD echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7INSRD echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-18):** PASS &mdash; 200 pnr 7INSRD (7.6s)

### TC-PAXNAME-BND-19 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a longer adult title (Mrs instead of Mr) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a longer adult title (Mrs instead of Mr) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MRS/Ibabcdefgh(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MRS/Ibabcdefgh(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + ... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 52 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [52], 0.1s; Book 400 A0001, combined totals [52], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-19):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MRS/Ibabcdefgh(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-19):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MRS/Ibabcdefgh(ADT)(INFLiabcdefgh MS/Naabcdefgh)' ) and Infant (Liabcdefgh MS/Naabcdefgh/INF) totals 52 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Ama... (0.1s)

### TC-PAXNAME-BND-20 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a longer infant title (MSTR instead of MS) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a longer infant title (MSTR instead of MS) on names that sit on the limit pushes the combined string over 59 and is rejected.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefgh(ADT)(INFLiabcdefgh MSTR/Naabcdefgh)' ) and Infant (Liabcdefgh MSTR/Naabcdefgh/INF) totals 53 characters... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefgh(ADT)(INFLiabcdefgh MSTR/Naabcdefgh)' ) and Infant (Liabcdefgh MSTR/Naabcdefgh/INF) totals 53 characters... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The combined passenger information for Adult '...' and Infant (...) totals 53 characters + Space and Delimiters '/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no pnr/gdsPNR/bookingToken is returned and nothing is created at the supplier (rejection is pre-supplier, sub-second).
- **Actual:** Hold 400 A0001, combined totals [53], 0.1s; Book 400 A0001, combined totals [53], 0.1s
- **Status:** PASS
- **Evidence:** Hold 400 A0001, combined totals [53], 0.1s; Book 400 A0001, combined totals [53], 0.1s

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-20):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefgh(ADT)(INFLiabcdefgh MSTR/Naabcdefgh)' ) and Infant (Liabcdefgh MSTR/Naabcdefgh/INF) totals 53 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by ... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 6 &mdash; V1 Book (TC-PAXNAME-BND-20):** PASS &mdash; 400 NDC-INT-TEC-A0001 The combined passenger information for Adult 'Moabcdefghi MR/Ibabcdefgh(ADT)(INFLiabcdefgh MSTR/Naabcdefgh)' ) and Infant (Liabcdefgh MSTR/Naabcdefgh/INF) totals 53 characters + Space and Delimiters'/)(' length 8 , exceeding the maximum allowed limit of 59 characters set by ... (0.1s)

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

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-09):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName] [Error = Wrong data format (an, n, etc)] (1.8s)

### TC-PAXNAME-VAL-11 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate accented Latin names (José / Müller) are handled with a controlled outcome.
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate accented Latin names (José / Müller) are handled with a controlled outcome.
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)] (1.5s)
- **Expected:** Controlled outcome: HTTP 200 with the name echoed without silent truncation, or an HTTP 4xx validation error; never 5xx. UNKNOWN which - confirm live and record it. If accepted, check whether the diacritics are preserved or folded.
- **Actual:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)]
- **Status:** FAIL
- **Evidence:** Hold: passed the integration pre-check then failed at the supplier as unmapped 409 Z9999: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)] | OBSERVED: Hold: 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-11):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = surname] [Error = Wrong data format (an, n, etc)] (1.5s)

### TC-PAXNAME-VAL-17 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a 25-character all-lowercase first name is accepted and echoed (case does not change the length).
- **Category:** Validation
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Hold - Validate a 25-character all-lowercase first name is accepted and echoed (case does not change the length).
- **Response:** Hold: 200 pnr 7IO28E (7.3s)
- **Expected:** HTTP 200 with pnr; name echoed 25 characters (upper-cased by the supplier layer).
- **Actual:** Hold 200 pnr 7IO28E echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7IO28E echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-VAL-17):** PASS &mdash; 200 pnr 7IO28E (7.3s)

### TC-PAXNAME-POS-06 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate a plain ADT-only Book with short names returns HTTP 200 with a PNR and tickets (Book control case independent of the name rules).
- **Category:** Positive
- **Endpoint Name:** V1 Book
- **Request:** V1 Search+FareConfirm (ADT) then POST api/FlightBooking/Book - Validate a plain ADT-only Book with short names returns HTTP 200 with a PNR and tickets (Book control case independent of the name rules).
- **Response:** Book: 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.2s)
- **Expected:** HTTP 200 with pnr/gdsPNR/bookingToken and tickets; no name-validation error.
- **Actual:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.
- **Status:** FAIL
- **Evidence:** Book: expected 200+pnr, got 500 ServerError Unknown error occured. Please keep the transaction id as a reference.

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Book (TC-PAXNAME-POS-06):** FAIL &mdash; 500 ServerError Unknown error occured. Please keep the transaction id as a reference. (7.2s)

### TC-PAXNAME-BND-22 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD whose first+last names make the passenger string exactly 59 characters (24 + 24 names, title Miss, 4 delimiters) is accepted.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold - Validate a CHD whose first+last names make the passenger string exactly 59 characters (24 + 24 names, title Miss, 4 delimiters) is accepted.
- **Response:** Hold: 200 pnr 7INBMC (8.1s)
- **Expected:** HTTP 200 with pnr; CHD echoed untruncated. 24+4+24+3 = 55, +4 delimiters = 59 = the limit.
- **Actual:** Hold 200 pnr 7INBMC echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7INBMC echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-22):** PASS &mdash; 200 pnr 7INBMC (8.1s)

### TC-PAXNAME-BND-23 — PASS

- **Test Case:** [Amadeus][Book or hold][Request] Validate a CHD passenger string of 60 characters (24 + 25 names, title Miss, 4 delimiters) is rejected with the single-passenger 59-character message.
- **Category:** Boundary
- **Endpoint Name:** V1 Hold / V1 Book
- **Request:** V1 Search+FareConfirm (ADT+CHD) then POST api/FlightBooking/Hold and api/FlightBooking/Book - Validate a CHD passenger string of 60 characters (24 + 25 names, title Miss, 4 delimiters) is rejected with the single-passenger 59-character message.
- **Response:** Hold: 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrs MISS/Minorabcdefghijklmnopqrst(CHD)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maxi... (0.1s) || Book: 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrs MISS/Minorabcdefghijklmnopqrst(CHD)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maxi... (0.1s)
- **Expected:** HTTP 400, ErrorCode NDC-INT-TEC-A0001, ErrorMessage "Invalid request. Please check the request parameters and try again."; Context[] has "The passenger information for CHD ... totals 56 characters + Space and Delimiters length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus"; no PNR.
- **Actual:** Hold 400 A0001, single-passenger total [56]; Book 400 A0001, single-passenger total [56]
- **Status:** PASS
- **Evidence:** Hold 400 A0001, single-passenger total [56]; Book 400 A0001, single-passenger total [56]

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BND-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrs MISS/Minorabcdefghijklmnopqrst(CHD)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, ti... (0.1s)
  - **Hop 4 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 5 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 6 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 7 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 8 &mdash; V1 Book (TC-PAXNAME-BND-23):** PASS &mdash; 400 NDC-INT-TEC-A0001 The passenger information for CHD 'Childabcdefghijklmnopqrs MISS/Minorabcdefghijklmnopqrst(CHD)' totals 56 characters + Space and Delimiters'/)(' length 4 , exceeding the maximum allowed limit of 59 characters set by Amadeus. This total includes the first name, last name, ti... (0.1s)

### TC-PAXNAME-BIZ-17 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify an infant with the same surname as its adult is present in the echoed passengersList.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify an infant with the same surname as its adult is present in the echoed passengersList.
- **Response:** Hold: 200 pnr 7IOCE9 (8.3s)
- **Expected:** HTTP 200 with pnr; passengersList echoes BOTH Mostafa/Ibrahim (ADT) and Lina/Ibrahim (INF, linked to the ADT).
- **Actual:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically
- **Status:** FAIL
- **Evidence:** Hold: echo: INF "Lina"/"Ibrahim" not echoed identically

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 4 &mdash; V1 Hold (TC-PAXNAME-BIZ-17):** FAIL &mdash; 200 pnr 7IOCE9 (8.3s)

### TC-PAXNAME-BIZ-18 — PASS

- **Test Case:** [Amadeus][Book or hold][Response] Verify an infant with a different surname from its adult is present in the echoed passengersList (control for the same-surname case).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+INF) then POST api/FlightBooking/Hold - Verify an infant with a different surname from its adult is present in the echoed passengersList (control for the same-surname case).
- **Response:** Hold: 200 pnr 7INABL (7.2s)
- **Expected:** HTTP 200 with pnr; passengersList echoes both Mostafa/Ibrahim (ADT) and Lina/Hassan (INF).
- **Actual:** Hold 200 pnr 7INABL echoed untruncated
- **Status:** PASS
- **Evidence:** Hold 200 pnr 7INABL echoed untruncated

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 3 &mdash; V1 Hold (TC-PAXNAME-BIZ-18):** PASS &mdash; 200 pnr 7INABL (7.2s)

### TC-PAXNAME-BIZ-19 — FAIL

- **Test Case:** [Amadeus][Book or hold][Response] Verify ParentPaxRefId is honoured: an infant declared under the second adult is attached to the second adult, not the first.
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold - Verify ParentPaxRefId is honoured: an infant declared under the second adult is attached to the second adult, not the first.
- **Response:** Hold: 200 pnr 7IOFG5 (7.5s)
- **Expected:** HTTP 200 with pnr; in the echoed passengersList the INF entry points at the passenger Ahmed/Hassan (the adult declared as ParentPaxRefId = Pax2).
- **Actual:** Infant LINA/ZAKI is attached to MOSTAFA IBRAHIM (parentPaxRefId 2-ADT) although ParentPaxRefId = Pax2 (Ahmed Hassan) was sent
- **Status:** FAIL
- **Evidence:** Infant LINA/ZAKI is attached to MOSTAFA IBRAHIM (parentPaxRefId 2-ADT) although ParentPaxRefId = Pax2 (Ahmed Hassan) was sent

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-BIZ-19):** FAIL &mdash; 200 pnr 7IOFG5 (7.5s)

### TC-PAXNAME-BIZ-20 — FAIL

- **Test Case:** [Amadeus][Book or hold][Request] Validate that a long first adult with a short second adult carrying the infant is accepted when the declared pairing keeps every pair under 59 (20/20 first adult).
- **Category:** Business Rule
- **Endpoint Name:** V1 Hold
- **Request:** V1 Search+FareConfirm (ADT+ADT+INF) then POST api/FlightBooking/Hold - Validate that a long first adult with a short second adult carrying the infant is accepted when the declared pairing keeps every pair under 59 (20/...
- **Response:** Hold: 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED / (1.9s)
- **Expected:** HTTP 200 with pnr. Declared pair (Pax2 + infant) = 16 + 13 = 29; the 20/20 adult has no infant (45 + 4 = 49).
- **Actual:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED /
- **Status:** FAIL
- **Evidence:** Hold: expected 200+pnr, got 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED /

  - **Hop 1 &mdash; V1 Search:** PASS &mdash; 200 - 69 offers
  - **Hop 2 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 3 &mdash; V1 FareConfirm:** PASS &mdash; 409
  - **Hop 4 &mdash; V1 FareConfirm:** PASS &mdash; 200
  - **Hop 5 &mdash; V1 Hold (TC-PAXNAME-BIZ-20):** FAIL &mdash; 409 NDC-INT-UNC-Z9999 Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP =&gt; ITEM TOO LONG / NOT ENTERED / (1.9s)

## Findings

### Defects

- **[TC-PAXNAME-POS-06] BUG-01: V1 Book returns HTTP 500 ServerError for a valid ADT-only passenger on Amadeus/EGY (3 of 3 Book calls: POS-01, BND-13, POS-06), while the identical request on Hold returns 200 with a PNR.** Field: `HTTP status / ErrorCode (V1 Book)`. Expected: 200 with pnr, gdsPNR, bookingToken and tickets[]. **Impact:** Book is unusable for Amadeus/EGY on this build, and because the 500 is generic (no Context, ~7.5 s like a Hold) it cannot be told whether a PNR/ticket was created at Amadeus; Retrieve is also unusable (HTTP 500), so a possibly orphaned booking cannot be checked. Evidence: POS-06 Book ADT Mostafa/Ibrahim -&gt; 500 {"ErrorCode":"ServerError","ErrorMessage":"Unknown error occured. Please keep the transaction id as a reference.","Context":[]} in 7-8 s; same names on Hold -&gt; 200 pnr.
- **[TC-PAXNAME-BIZ-17] BUG-02: An infant that has the same surname as its adult is missing from the echoed passengersList (Hold 200); with a different surname the infant is echoed.** Field: `passengersList (Hold response)`. Expected: passengersList contains both "2-ADT" MOSTAFA/IBRAHIM and an INF entry LINA/IBRAHIM linked to it. **Impact:** Same-surname family bookings are the common case; the response gives no sign the infant is on the booking, and Retrieve is unusable on Amadeus (HTTP 500), so the infant cannot be verified. If the infant is truly not on the PNR the traveller has no infant record/ticket. Evidence: ADT Mostafa/Ibrahim + INF Lina/Ibrahim -&gt; echo only 2-ADT (POS-01, POS-03, POS-04, BIZ-17, probe P1); ADT Mostafa/Ibrahim + INF Lina/Hassan -&gt; echo 2-ADT and 2-INF (BIZ-18, probe P2). POS-04 lost BOTH infants (Ibrahim and Hassan families).
- **[TC-PAXNAME-BIZ-19] BUG-03: ParentPaxRefId is ignored when the request goes to Amadeus: an infant declared under Pax2 is attached to the first adult; the combined-length pre-check still pairs by the declared parent, so valid-by-validation bookings fail at the supplier.** Field: `passengersList[INF].parentPaxRefId`. Expected: INF Lina/Zaki attached to Ahmed/Hassan (ParentPaxRefId = Pax2). **Impact:** The infant is recorded under the wrong adult (wrong ticket/travel record), and a request that passes the 59-character pre-check can be rejected by Amadeus with an unmapped 409 Z9999 "ITEM TOO LONG / NOT ENTERED" (BIZ-04, BIZ-20) because the real pairing differs from the validated one. Evidence: BIZ-19: Pax1 Mostafa/Ibrahim, Pax2 Ahmed/Hassan, INF Lina/Zaki parent Pax2 -&gt; echo INF parentPaxRefId = 2-ADT (Mostafa). BIZ-20: Pax1 20/20 long adult, Pax2 short, INF parent Pax2 -&gt; 409 Z9999 "FIRSTABC..MR LASTABC.. =&gt; ITEM TOO LONG" (the long first adult was paired with the infant).
- **[TC-PAXNAME-VAL-19] BUG-04: The first-name length reported in the 25-character message includes the title (26-character first name + Mr is reported as 28) while the last-name figure is the raw length; the limit itself is applied to the raw name.** Field: `Context[].Value (25-character message)`. Expected: "Firstabcdefghijklmnopqrstuvw: 26 | Lastnm : 9 =&gt; ..." (raw lengths). **Impact:** Diagnostic only, but the reported 28 contradicts the 25-character limit text and misleads whoever shortens the name (a 24-character first name is accepted although the message logic would report 26). Evidence: First name 26 chars + title Mr -&gt; "...: 28 | &lt;last&gt; : 9". The stakeholder sample ("ChristopherAlexanderMaxMost: 29") shows the same title-inclusive figure for a 27-character name.
- **[TC-PAXNAME-BIZ-13] BUG-05: Request-binding validation errors (invalid title value, missing name, null list ...) use a second, different error envelope (camelCase keys, errorCode "1001", a spurious "holdRequestDto field is required" entry) and expose the internal .NET type NDC.Integrations.Application.Dtos.Api.Title; name-rule errors use the PascalCase NDC-INT-TEC-A0001 envelope.** Field: `error envelope (model-binding validation errors)`. Expected: One envelope: {Status, TransactionId, ErrorCode:"NDC-INT-TEC-A0001", ErrorMessage, Context[{Value}]} and no internal type names. **Impact:** Clients must parse two shapes for the same endpoint, and internal class names are disclosed. Also the title domain is an undocumented enum, so a long/unknown title cannot reach the length rule. Evidence: Hold with a 20-character title -&gt; 400 {"status":400,"errorCode":"1001","errorMessage":"Validation errors occurred. Please check your request.","context":[{"name":"holdRequestDto","value":"The holdRequestDto field is required."},{"name":"$.passengersList.Pax1.title","value":"The JSON value could not be converted to NDC.Integrations.Application.Dtos.Api.Title. ..."}],"originalSupplierRequest":null,"originalSupplierResponse":null}. NEG-01..NEG-16 return the same 1001 envelope.
- **[TC-PAXNAME-VAL-09] BUG-06: Non-ASCII letters (Arabic, accented Latin) and some pairings pass the integration name pre-check, are rejected by Amadeus, and surface as an unmapped HTTP 409 NDC-INT-UNC-Z9999 whose body carries the raw supplier SOAP request (including the Amadeus Security header UserID/OfficeId) and response.** Field: `ErrorCode / OriginalSupplierRequest (supplier-side name rejection)`. Expected: 400 NDC-INT-TEC-A0001 "...must only contain letters and spaces (A-Z)" with no OriginalSupplierRequest/Response. **Impact:** Legitimate names such as Jose/Muller cannot be booked and the failure is reported as an unmapped supplier error; every Z9999 409 leaks supplier request/response and account identifiers (tracked leak class, §7.14). Evidence: VAL-09 (Arabic first name) and VAL-11 (José / Müller) -&gt; 409 Z9999 "18|Presentation|Serializing/Deserializing error: [type = DataElement] [name = firstName|surname] [Error = Wrong data format (an, n, etc)]"; BIZ-04/BIZ-20 -&gt; 409 Z9999 "ITEM TOO LONG / NOT ENTERED". Bodies contain OriginalSupplierRequest/Response (redacted in this log).

### Unknown-resolutions

- **[TC-PAXNAME-POS-05]** The 59-character limit is not only an ADT+INF pair rule: a single ADT or CHD is also checked ("The passenger information for CHD ... totals N characters + Space and Delimiters length 4 ..."): first+title+last+PTC+4 &lt;= 59. A CHD with 25/25 names (57+4) and an ADT with 25/25 names and title Mrs (56+4) are rejected; 25/25 with Mr (55+4 = 59) and a CHD at 24/24 are accepted (BND-05, BND-22), 24/25 is rejected (BND-23). Evidence: POS-05, BND-11, BIZ-03, BND-17 rejected with this message; BND-22 accepted at exactly 59; BND-23 rejected at 60.
- **[TC-PAXNAME-VAL-03]** Names accept letters and spaces only: hyphens (Al-Mansour), apostrophes (O'Connor), digits, "/", parentheses, tabs/newlines, emoji and decomposed accents are rejected with 400 A0001 "Name.&lt;field&gt; '&lt;value&gt;' must only contain letters and spaces." Leading/trailing spaces are counted, not trimmed (26 raw characters reported as 28). Evidence: VAL-03, VAL-04 (rejected), VAL-06/07 (untrimmed), VAL-08, VAL-12..16, SEC-04..07 (all 400 A0001). Embedded spaces count toward the 25 (VAL-01 accepted at 25, VAL-02 rejected at 26).
- **[TC-PAXNAME-BIZ-13]** title is an enumerated value (NDC.Integrations.Application.Dtos.Api.Title); an unknown value is rejected at model binding. The title is checked against gender ("Title MRS does not match Gender Male"), and the title counts toward the combined length (Mrs +1 and MSTR +2 versus Mr/MS push a 59 pair over: BND-19, BND-20; Mrs on names summing 40 lands exactly on 59 and is accepted: BND-18). Evidence: BIZ-13; the gender error was seen on the first (male-adult) attempts of BND-17/BND-18, which were replaced by corrected re-runs with a female adult; BND-18..BND-20.
- **[TC-PAXNAME-BIZ-12]** Middle name is not length-checked and not part of the combined sum: a 30-character middle name (BIZ-12) and an 11-character adult middle name on a 59 pair (BIZ-09) are accepted. Evidence: BIZ-09, BIZ-10, BIZ-11, BIZ-12 accepted (Hold 200).
- **[TC-PAXNAME-POS-01]** Amadeus/EGY on ne-8: Hold works (200, ~7 s), but CancelAfterHold returns 409 OperationNotSupported ("Amadeus does not exists"), Retrieve returns 500 ServerError, and Book returns 500 (BUG-01). Held PNRs therefore cannot be released or inspected through this API; they are listed under Cleanup. Evidence: CancelAfterHold on 8 Amadeus holds -&gt; 409 OperationNotSupported; Retrieve on 3 holds -&gt; 500 ServerError.
- **[TC-PAXNAME-VAL-17]** Transient supplier error: the first attempt of VAL-17 (25-character lowercase first name) returned HTTP 409 Z9999 "55|Application|IGNORE AND RE-ENTER" on a fresh offer; four immediate retries (probes P3, P4, P5 and the VAL-17 re-run) returned 200. That first-attempt result was replaced by the passing retry in this log. Evidence: Probes P3/P4/P5 (200) and the VAL-17 re-run (200, PNR 7IO28E).
- **[TC-PAXNAME-REG-01]** Combined-length semantics confirmed live: 51 name+title+PTC characters plus 8 delimiters = 59 is accepted, 52 is rejected (BND-13/BND-15); the message "totals N" excludes the delimiters; the stakeholder sample reproduces character for character, including "ChristopherAlexanderMaxMost: 29" for a 27-character first name (title counted). Evidence: BND-13, BND-14, BND-15, BND-16, REG-01.

## Proposed SPEC.md updates

- §2.5 &mdash; status: *pending*
  - **Old:** "- Every `INF` passenger must carry a valid `ParentPaxRefId` pointing to an `ADT` entry present in the same request."
  - **New:** "- Every `INF` passenger must carry a valid `ParentPaxRefId` pointing to an `ADT` entry present in the same request.
- Amadeus name rules (live-confirmed 2026-10-29, V1 Book/Hold, ne-8, Amadeus/EGY): `name.first` and `name.last` each at most 25 characters; the passenger string `&lt;first&gt; &lt;TITLE&gt;/&lt;last&gt;(&lt;PTC&gt;)` must be at most 59 characters including delimiters (ADT or CHD alone: first+title+last+3 plus 4 delimiters; ADT with INF: both strings plus 8 delimiters); names accept letters and spaces only (no hyphen, apostrophe, digits); `title` is an enumerated value checked against `gender`. Violations return 400 `NDC-INT-TEC-A0001` with the reason in `Context[].Value`."
  - **Correction:** Confirmed by TC-PAXNAME-BND-*, VAL-* and POS-05; product should confirm the stricter-than-stated parts (single ADT/CHD limit, letters-only).

- §4.6 &mdash; status: *pending*
  - **Old:** "| Amadeus / AmadeusNDC / UAEAmadeusNDC | Unknown | Unknown | Supported | Unknown | Unknown | Unknown | Unknown |"
  - **New:** "| Amadeus / AmadeusNDC / UAEAmadeusNDC | Unknown | Unknown | Supported | **Not supported** (V1 CancelAfterHold -&gt; 409 `OperationNotSupported`, ne-8 2026-10-29, Amadeus/EGY) | Unknown | Unknown | Unknown |"
  - **Correction:** Also seen on the same build: V1 Book and Retrieve return HTTP 500 for Amadeus/EGY (BUG-01).

## Cleanup / follow-up

Live artifacts left behind this round (40):

- **family_b_hold** &mdash; pnr 7IJLQO (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IKIOB (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IKELZ (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IL4H5 (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IKD59 (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IKVW3 (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IKW9Y (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IKPNA (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILJG8 (TC-PAXNAME-POS-01) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILQTY (TC-PAXNAME-POS-02) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IM2WK (TC-PAXNAME-POS-03) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILBAV (TC-PAXNAME-POS-04) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILBPM (TC-PAXNAME-BND-01) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILRBX (TC-PAXNAME-BND-03) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILXWM (TC-PAXNAME-BND-05) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IM256 (TC-PAXNAME-BND-07) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILP6B (TC-PAXNAME-BND-08) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILZRJ (TC-PAXNAME-BND-13) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IN7R2 (TC-PAXNAME-BND-14) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IM94A (TC-PAXNAME-BIZ-08) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IMNXO (TC-PAXNAME-BIZ-09) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IMMPT (TC-PAXNAME-BIZ-10) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IMO3F (TC-PAXNAME-BIZ-11) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7ILSXZ (TC-PAXNAME-BIZ-12) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IN6G8 (TC-PAXNAME-VAL-01) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IMV4N (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7INGEA (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IN22Z (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7INU6G (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IOFO7 (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IO8H9 (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7INLKY (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IO97E (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7INSHK (null) &mdash; Hold at Amadeus (calibration/probe, not a logged test case); CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7INSRD (TC-PAXNAME-BND-18) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IO28E (TC-PAXNAME-VAL-17) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7INBMC (TC-PAXNAME-BND-22) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IOCE9 (TC-PAXNAME-BIZ-17) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7INABL (TC-PAXNAME-BIZ-18) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.
- **family_b_hold** &mdash; pnr 7IOFG5 (TC-PAXNAME-BIZ-19) &mdash; Hold at Amadeus; CancelAfterHold is unsupported for Amadeus (409) so it cannot be released through the API and expires at the supplier.

