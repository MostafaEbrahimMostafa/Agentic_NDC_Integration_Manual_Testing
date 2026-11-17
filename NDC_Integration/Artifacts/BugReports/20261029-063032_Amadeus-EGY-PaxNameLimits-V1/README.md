# Bug reports — 20261029-063032_Amadeus-EGY-PaxNameLimits-V1

Amadeus / EGY, V1 Book and Hold passengersList name-length validation, staging ne-8, 2026-10-29. 6 defects (BUG-01..06, a new series for this suite).

- [BUG-01](BUG-01_Book_ErrorCode.md) — [V1][Amadeus][Book] – HTTP 500 ServerError Returned for a Valid ADT Booking Instead of a Booked PNR  (High; TC-PAXNAME-POS-06)
- [BUG-02](BUG-02_Hold_passengersList.md) — [V1][Amadeus][Hold] – Infant Sharing the Adult's Surname Missing from the Echoed passengersList  (High; TC-PAXNAME-BIZ-17)
- [BUG-03](BUG-03_Hold_parentPaxRefId.md) — [V1][Amadeus][Hold] – parentPaxRefId Ignored: Infant Attached to the First Adult and Validated Against a Different Pairing  (High; TC-PAXNAME-BIZ-19)
- [BUG-04](BUG-04_Hold_Context.md) — [V1][Amadeus][Hold] – First-Name Length in the 25-Character Error Message Includes the Title  (Low; TC-PAXNAME-VAL-19)
- [BUG-05](BUG-05_Hold_errorEnvelope.md) — [V1][Amadeus][Hold] – Two Different Error Envelopes and Internal .NET Type Name Exposed for Request-Binding Validation Errors  (Medium; TC-PAXNAME-BIZ-13)
- [BUG-06](BUG-06_Hold_ErrorCode.md) — [V1][Amadeus][Hold] – Non-ASCII Names Pass Pre-Validation, Then Fail at Amadeus as Unmapped 409 Z9999 With the Raw Supplier Request in the Body  (Medium; TC-PAXNAME-VAL-09)

Not filed as defects (rules stricter than the requirement text; need a product decision, see the run's "Newly confirmed facts" and pending SPEC proposals): the 59-character limit also applying to a single ADT or CHD, names accepting letters and spaces only (no hyphen/apostrophe), and the title being an enum checked against gender.
