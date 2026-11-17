# Bug reports — 20261022-093839_SabreNdc-Void-EGY-V1V2

SabreNdc Void, EGY, V1 + V2, staging.

- [BUG-01](BUG-01_Void_surName.md) — **High** — [Void] surName Not Validated - Void Succeeds With a Surname Not on the Booking (TC-VOID-VAL-04 (also TC-VOID-SEC-04))
- [BUG-02](BUG-02_Void_voidTickets.md) — **High** — [Void] voidTickets With a Ticket Not on the PNR Voids Every Ticket Instead of Being Rejected (TC-VOID-NEG-03)
- [BUG-03](BUG-03_Book_voidCapability.md) — **Medium** — [Book] voidCapability Missing from Book Response (TC-CAPCHECK-SABRENDC-02 (also TC-VOID-BIZ-05))
- [BUG-04](BUG-04_Void_voided.md) — **Medium** — [Void] Repeat Void Returns voided true Instead of an Already-Voided Error (TC-VOID-BIZ-02)
- [BUG-05](BUG-05_Void_ErrorCode.md) — **Medium** — [Void] Unknown Order Returns Unmapped NDC-INT-UNC-Z9999 and the Raw Sabre Payload in Void Response (TC-VOID-NEG-01 (also TC-VOID-VAL-06))
- [BUG-06](BUG-06_Retrieve_bookingStatus.md) — **Medium** — [Retrieve] bookingStatus Returned Incorrect Value (OnHold) in Retrieve Response After CancelAfterHold (TC-VOID-BIZ-04)
- [BUG-07](BUG-07_Void_errorenvelope.md) — **Low** — [Void] Error Envelope Inconsistent Across Void Failures (PascalCase vs camelCase, Generic Code for Business Rules) (TC-VOID-NEG-05)
- [BUG-08](BUG-08_Void_contextvalue.md) — **Low** — [Void] context Exposes Internal .NET Type Name in Void Validation Error (TC-VOID-NEG-03 (also TC-VOID-VAL-06))
