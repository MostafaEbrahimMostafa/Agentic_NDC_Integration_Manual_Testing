# Bug reports — 20261027-061359_TravelportNdc-Void-UAE-V1V2-Round2

TravelportNdc Void suite ROUND 2, UAE, staging ne-5, 2026-10-27. 12 defects. Numbering follows Round 1 (`20261026-105925_TravelportNdc-Void-UAE-V1V2`) for recurrences (BUG-01, 03, 04, 05, 06, 09, 10, 11, 12 are Round 1 bugs seen again, several narrowed by fixes) and continues it for new defects (BUG-13, 14) and for the V1 Upselling defect first recorded in other series (BUG-15). Round 1 bugs not reproduced this round: BUG-02 (V1 Void unsupported), BUG-07 (whitespace pnr), BUG-08 (void of a held booking cancels it).

- [BUG-01](BUG-01_Hold_voidCapability.md) — [V1 and V2][TravelportNdc][Hold] – voidCapability Missing from Hold, PnrReprice and Held-Retrieve Responses  (Medium; TC-VOIDTPN-BIZ-05)
- [BUG-03](BUG-03_Void_bookingToken.md) — [V1 and V2][TravelportNdc][Void] – bookingToken Only Checked for Presence: Upper-Cased, 1000-Character or Another Booking's Token Still Voids the Booking  (High; TC-VOIDTPN-BND-01)
- [BUG-04](BUG-04_Void_surName.md) — [V1 and V2][TravelportNdc][Void] – surName Ignored: a Surname That Matches No Passenger Still Voids the Booking  (High; TC-VOIDTPN-VAL-04)
- [BUG-05](BUG-05_Void_ContextvalueOriginalSupplierRequestOrigi.md) — [V1 and V2][TravelportNdc][Void] – Error Responses Leak Raw Travelport Payloads and Internal .NET Type Names  (Medium; TC-VOIDTPN-VAL-07)
- [BUG-06](BUG-06_Void_passengersVoidedAncillaries.md) — [V2][TravelportNdc][Void] – passengersVoidedAncillaries Returned as Null Instead of an Empty Collection  (Low; TC-VOIDTPN-VAL-10)
- [BUG-09](BUG-09_Void_voidTickets.md) — [V1 and V2][TravelportNdc][Void] – voidTickets List Ignored: a Subset, Fabricated or Foreign Ticket Voids Every Ticket  (High; TC-VOIDTPN-BIZ-06)
- [BUG-10](BUG-10_Void_ErrorCode.md) — [V1 and V2][TravelportNdc][Void] – ErrorCode Returned as Unmapped NDC-INT-UNC-Z9999 With the Raw Travelport Reply for an Unknown PNR  (Medium; TC-VOIDTPN-NEG-01)
- [BUG-11](BUG-11_Void_errorenvelopeErrorCodeErrorMessage.md) — [V1 and V2][TravelportNdc][Void] – Error Envelope Inconsistent: Two Casings and an Unmapped Z9999 Code Used for Four Different Conditions  (Medium; TC-VOIDTPN-NEG-05)
- [BUG-12](BUG-12_Book_BookwithoutAddPassenger.md) — [V2][TravelportNdc][Book] – Book Without AddPassenger Returns HTTP 500 ServerError Instead of a Validation Error  (Medium; FLOW-V2-74-TPN)
- [BUG-13](BUG-13_Book_bookingToken.md) — [V1 and V2][TravelportNdc][Book] – bookingToken Returned Identical for Two Different Bookings  (Medium; TC-CAPCHECK-TPN-02)
- [BUG-14](BUG-14_Void_ErrorCodeTEMPORARYsuppliererror.md) — [V2][TravelportNdc][Void] – Transient Emirates Errors Returned as Unmapped 409 Z9999 With the Raw Supplier Reply and No Retry Signal  (Medium; FLOW-V2-76-TPN)
- [BUG-15](BUG-15_Upselling_selectedOffer.md) — [V1][TravelportNdc][Upselling] – selectedOffer Missing from Upselling Response (Not a Drop-In for FareConfirm)  (High; FLOW-V1-09-TPN)
