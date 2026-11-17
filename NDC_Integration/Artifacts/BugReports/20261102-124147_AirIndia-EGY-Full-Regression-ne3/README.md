# Bug reports — 20261102-124147_AirIndia-EGY-Full-Regression-ne3

AirIndia / EGY full regression on stg-ne-3 (V1 and V2). 11 defects.

- [BUG-01](BUG-01_Search_offers.md) — [V1 and V2][AirIndia][Search] – offers Returned Empty for Every Route and Date in Search Response (Critical)
- [BUG-02](BUG-02_Search_offersHTTP200.md) — [V1 and V2][AirIndia][Search] – Supplier Failure Returned as HTTP 200 with Empty offers after a Fixed 15 s Stall in Search Response (High)
- [BUG-03](BUG-03_Search_supplierRequest.md) — [V1 and V2][AirIndia][Search] – supplierRequest Returned with Plaintext Supplier Credentials when isdebug=true in Search Response (Critical)
- [BUG-04](BUG-04_Retrieve_OriginalSupplierRequest.md) — [V1 and V2][AirIndia][Retrieve / FareConfirm] – OriginalSupplierRequest Returned with Plaintext Supplier Credentials in Ordinary Error Response (Critical)
- [BUG-05](BUG-05_FareConfirm_searchResponseId.md) — [V1][AirIndia][FareConfirm] – searchResponseId Not Validated: V1 FareConfirm and Retrieve Forward Unknown IDs to the Supplier and Hang ~135 s (High)
- [BUG-06](BUG-06_Book_ErrorCode.md) — [V1][AirIndia][Book / GetOfferBundles] – ErrorCode Returned as ServerError (HTTP 500) for Unknown or Missing IDs in V1 Book and GetOfferBundles (High)
- [BUG-07](BUG-07_Search_passengers.md) — [V1 and V2][AirIndia][Search] – passengers Accepted for a Child with No Adult and for a 10-Passenger Party Counting Infants in Search Request (Medium)
- [BUG-08](BUG-08_Search_errorenvelope.md) — [V1 and V2][AirIndia][Search / FareConfirm / Book] – Error Envelope Returned in Two Different Shapes and Casings across Client Errors (Medium)
- [BUG-09](BUG-09_Search_contextvalue.md) — [V1 and V2][AirIndia][Search (all endpoints)] – context[].value Exposes Internal .NET Type Names and Parser Positions in Validation Error Responses (Low)
- [BUG-10](BUG-10_Search_ErrorCodemulticity.md) — [V1 and V2][AirIndia][Search] – ErrorCode Returned Inconsistently for Unsupported Multi-City Search: V1 400 TEC-A0001 vs V2 409 Z9999 (Low)
- [BUG-11](BUG-11_Hold_Context0Value.md) — [V1 and V2][AirIndia][Hold / BookAfterHold / PnrReprice / CancelAfterHold / Void / Upselling / FareCheck / FareRules / SeatAfterHold] – Context[0].Value Returned as "AirIndia does not exists" for Unsupported Operations in OperationNotSupported Response (Low)
