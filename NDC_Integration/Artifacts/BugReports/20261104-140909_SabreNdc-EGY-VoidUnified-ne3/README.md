# Bug reports — 20261104-140909_SabreNdc-EGY-VoidUnified-ne3

- [BUG-01](BUG-01_Retrieve_voidCapability.md) — [V1/V2][SabreNdc][Retrieve] – voidCapability Returned as "None" for a Ticketed Booking in Retrieve Response (High)
- [BUG-02](BUG-02_BookAfterHold_voidCapability.md) — [V1/V2][SabreNdc][BookAfterHold] – voidCapability Returned as "None" for a Newly Ticketed Booking in BookAfterHold Response (High)
- [BUG-03](BUG-03_Hold_voidCapability.md) — [V1/V2][SabreNdc][Hold] – voidCapability Returned as "None" Instead of VoidNotAllowed for Held and Cancelled Bookings (High)
- [BUG-04](BUG-04_PnrReprice_voidCapability.md) — [V1/V2][SabreNdc][PnrReprice] – voidCapability Missing from PnrReprice (FareConfirmAfterHold) Response (Medium)
- [BUG-05](BUG-05_Book_voidCapability.md) — [V1][SabreNdc][Book] – voidCapability Returned Incorrect Value (VoidNotAllowed) on Some AA Bookings in Book Response (High)
- [BUG-06](BUG-06_Void_voided.md) — [V1][SabreNdc][Void] – voided Returned Incorrect Value (200 with voided=false) on AA Bookings in Void Response (Medium)
- [BUG-07](BUG-07_Retrieve_HTTP_status.md) — [V1/V2][SabreNdc][Retrieve] – HTTP status Returned Incorrect Status (400) for a Voided Booking in Retrieve Response (Low)
- [BUG-08](BUG-08_Retrieve_x_api_key_Client_Id.md) — [V1/V2][SabreNdc][Retrieve] – x-api-key / Client-Id Does Not Enforce Authentication Headers in Retrieve Request (Critical)
- [BUG-09](BUG-09_Void_OriginalSupplierRequest.md) — [V1/V2][SabreNdc][Void] – OriginalSupplierRequest / OriginalSupplierResponse Exposed in Void Error Response (High)
- [BUG-10](BUG-10_Void_error_envelope.md) — [V1/V2][SabreNdc][Void] – error envelope Returned in Two Different Shapes in Error Responses (Low)
- [BUG-11](BUG-11_Retrieve_bookingStatus.md) — [V1/V2][SabreNdc][Retrieve] – bookingStatus Returned Incorrect Value (OnHold) After CancelAfterHold in Retrieve Response (Medium)
- [BUG-12](BUG-12_Book_response_time.md) — [V1/V2][SabreNdc][Book] – response time Takes About 22 Seconds, Above the 16-Second Baseline, in Book Response (Low)
