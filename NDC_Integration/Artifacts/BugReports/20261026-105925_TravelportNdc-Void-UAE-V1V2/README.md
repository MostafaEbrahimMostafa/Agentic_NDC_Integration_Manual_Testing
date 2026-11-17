# Bug reports — 20261026-105925_TravelportNdc-Void-UAE-V1V2

TravelportNdc Void suite, UAE, staging ne-5, 2026-10-26. 12 defects, in the order found.

- [BUG-01](BUG-01_Book_voidCapability.md) — [V1 and V2][TravelportNdc][Book] – voidCapability Missing from Book, BookAfterHold and Retrieve Responses  (Medium; TC-CAPCHECK-TPN-02)
- [BUG-02](BUG-02_Void_ErrorCode.md) — [V1][TravelportNdc][Void] – ErrorCode Returned as OperationNotSupported for a Same-Day Ticketed Booking (V2 Void Works)  (High; TC-CAPCHECK-TPN-03)
- [BUG-03](BUG-03_Void_bookingToken.md) — [V2][TravelportNdc][Void] – bookingToken Not Validated: Missing, Empty or Foreign Token Still Voids the Booking  (High; TC-VOIDTPN-VAL-02)
- [BUG-04](BUG-04_Void_surName.md) — [V2][TravelportNdc][Void] – surName Ignored: a Surname That Matches No Passenger Still Voids the Booking  (High; TC-VOIDTPN-VAL-04)
- [BUG-05](BUG-05_Void_contextvalue.md) — [V2][TravelportNdc][Void] – Error context Value Leaks Internal .NET Type Names and Raw Travelport Payloads  (Medium; TC-VOIDTPN-VAL-07)
- [BUG-06](BUG-06_Void_passengersVoidedAncillaries.md) — [V2][TravelportNdc][Void] – passengersVoidedAncillaries Returned as Null Instead of an Empty Collection  (Low; TC-VOIDTPN-VAL-10)
- [BUG-07](BUG-07_Void_pnr.md) — [V2][TravelportNdc][Void] – pnr Accepted When Whitespace-Only: Booking Is Voided From gdsPNR  (Medium; TC-VOIDTPN-BND-01)
- [BUG-08](BUG-08_Void_voided.md) — [V2][TravelportNdc][Void] – voided Returned as false With HTTP 200 and the Held Booking Is Cancelled  (High; TC-VOIDTPN-BIZ-03)
- [BUG-09](BUG-09_Void_voidTickets.md) — [V2][TravelportNdc][Void] – voidTickets List Ignored: a Subset, Fabricated or Foreign Ticket Voids Every Ticket  (High; TC-VOIDTPN-BIZ-06)
- [BUG-10](BUG-10_Void_ErrorCodeNotFound.md) — [V2][TravelportNdc][Void] – ErrorCode Returned as Unmapped NDC-INT-UNC-Z9999 With Raw Travelport Reply for an Unknown PNR  (Medium; TC-VOIDTPN-NEG-01)
- [BUG-11](BUG-11_Void_errorenvelope.md) — [V1 and V2][TravelportNdc][Void] – Error Envelope Inconsistent: Two Casings, Unmapped Z9999 and Two Codes for "Reservation Cancelled"  (Medium; TC-VOIDTPN-NEG-05)
- [BUG-12](BUG-12_Book_serverError.md) — [V2][TravelportNdc][Book] – Book Without AddPassenger Returns HTTP 500 ServerError Instead of a Validation Error  (Medium; FLOW-V2-74-TPN)
