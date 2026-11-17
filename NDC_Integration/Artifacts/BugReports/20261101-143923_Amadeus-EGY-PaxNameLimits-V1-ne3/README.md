# Bug reports — 20261101-143923_Amadeus-EGY-PaxNameLimits-V1-ne3

Amadeus / EGY, V1 Book and Hold passengersList name validation, staging ne-3, 2026-11-01. 9 defects (BUG-01..09, a new series for this run). BUG-01, 05, 06 and 08 are repeats of the same defects seen on ne-8 (2026-10-29); BUG-02, 03, 04 and 07 are new or changed behaviour on ne-3.

- [BUG-01](BUG-01_Book_ErrorCode.md) — [V1][Amadeus][Book] – HTTP 500 ServerError Returned for Every Valid Booking Instead of a Booked PNR  (High; TC-PAXNAME-POS-06)
- [BUG-02](BUG-02_Hold_nameLimit.md) — [V1][Amadeus][Hold] – 25-Character First/Last Name Limit Not Enforced: Over-Limit Names Create PNRs or Fail at Amadeus as 409 Z9999  (High; TC-PAXNAME-BND-02)
- [BUG-03](BUG-03_Hold_sameSurnamePair.md) — [V1][Amadeus][Hold] – Same-Surname ADT + INF Pairs of 52–57 Pass the Pre-Check Then Fail at Amadeus as 409 Z9999 ITEM TOO LONG  (High; TC-PAXNAME-BND-25)
- [BUG-04](BUG-04_Hold_supplierPayloadLeak.md) — [V1][Amadeus][Hold] – Raw Amadeus SOAP Request and Response (Passenger Data, Passport Numbers, Office ID) Returned in Every Supplier 409 Error Body  (High; TC-PAXNAME-BND-25)
- [BUG-05](BUG-05_Hold_passengersList.md) — [V1][Amadeus][Hold] – Infant Sharing the Adult's Surname Missing from the Echoed passengersList  (High; TC-PAXNAME-BIZ-17)
- [BUG-06](BUG-06_Hold_parentPaxRefId.md) — [V1][Amadeus][Hold] – ParentPaxRefId Ignored: Infant Attached to the First Adult and Validated Against a Different Pairing  (High; TC-PAXNAME-BIZ-19)
- [BUG-07](BUG-07_Hold_nonAsciiNames.md) — [V1][Amadeus][Hold] – Non-ASCII Names Pass the Letters-Only Pre-Check Then Fail at Amadeus as Unmapped 409 Z9999  (Medium; TC-PAXNAME-VAL-09)
- [BUG-08](BUG-08_Hold_errorEnvelope.md) — [V1][Amadeus][Hold] – Two Different Error Envelopes and Internal .NET Type Name Exposed for Request-Binding Validation Errors  (Medium; TC-PAXNAME-BIZ-13)
- [BUG-09](BUG-09_Hold_reflectedName.md) — [V1][Amadeus][Hold] – Name Validation Error Echoes the Full Submitted Name Twice (10,000-Character Name Returns a ~20 KB Error Body)  (Low; TC-PAXNAME-NEG-14)

Not filed as defects (rule differences that need a product decision, see the run's "Newly confirmed facts" and pending SPEC proposals): the single ADT/CHD limit of 57 (a CHD with two 25-character names is rejected), names accepting letters and spaces only (no hyphen/apostrophe), the 2-50 character name length rule replacing the 25-character rule, the surname-dependent pair limit text, and the changed message wording versus the requirement text.
