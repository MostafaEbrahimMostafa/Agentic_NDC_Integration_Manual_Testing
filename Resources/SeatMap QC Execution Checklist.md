# **Complete Seat Map & Book With Seat Map Quality Control Execution Checklist** 

Manual Testing • API Testing • Automation Assertions • Supplier Integration QC 

##### **Purpose** 

This document provides a complete Quality Control checklist covering Seat Map API Response Validation, Seat Selection Validation, Book With Seat Map Request Validation, Booking Response Validation, and End-to-End Seat Assignment Validation. 

### **Alignment Note (added 2026-08-10)**

This checklist is cross-checked against `NDC_Integration/SPEC.md` (the project's Postman-collection-derived, evidence-graded source of truth) and the live V2 Postman collection JSON. Two points in this checklist do **not** currently match the directly-inspected collection, and are flagged inline below rather than silently corrected, per this project's living-document policy (SPEC.md Appendix):

- **Part 3, §20 field names**: this checklist lists Book's mandatory fields as `fareConfirmResponseId`/`SelectedOfferId`. The live V2 collection's saved `CI_FlightBookRequest` example actually sends `ResponseId`/`selectedOfferId` (sourced from GetSeatMap's `getSeatMapResponceID`/`getSeatMapOfferId` when SeatMap precedes Book — SPEC.md §2.7/§2.9). `fareConfirmResponseId`/`SelectedOfferId` is the **V1** naming convention (and also what `Sample_API_Req&Res_V2.md`'s own "Book || Hold Request" example shows) — whether V2 also accepts these names (alias binding) or this checklist reflects a stale/V1-flavored draft is `UNKNOWN`, confirm live (SPEC.md §2.9 conflict note).
- **§10/§29 `cellAvailability` values**: this checklist lists `AvailableFree`, `Blocked`, `Occupied`, `AvailableAferReservation` (likely a typo for `AvailableAfterReservation`). Only `AvailablePaid`, `Blocked`, and `Occupied` are directly evidenced in any saved Postman-collection example to date (SPEC.md §2.7/§8.3) — `AvailableFree`/`AvailableAfterReservation` are unconfirmed candidates, not yet observed.
- This checklist has **no coverage at all** for the new `SeatAfterHold` endpoint (`api/v2/SeatMap/SeatAfterHold`, added 2026-08-10) — the Hold-branch's seat-attachment mechanism, distinct from the direct-Book `passengersSelectedSeats` field this checklist otherwise covers well. See the new **Part 3a** below.
- Corresponding automatable test cases for every checklist item below are being tracked in `NDC_Integration/TestCases/SeatMap_TestCases.csv` (cross-referenced inline where a direct mapping exists) — these are written with concrete, deterministic assertions wherever a resource in this repo supplies one, since they are intended for future test automation, not one-off manual execution.

### **Document Structure** 

- Part 1 — Seat Map Response QC Checklist 

- Part 2 — Seat Selection QC Checklist 

- Part 3 — Book With Seat Map Request QC Checklist 

- Part 3a — SeatAfterHold (Hold-Branch Seat Attachment) QC Checklist *(added 2026-08-10 — discovery checklist, no confirmed behavior yet)* 

- Part 4 — Booking Response QC Checklist 

- Part 5 — Retrieve Booking Validation 

- Part 6 — Negative Test Checklist 

- Part 7 — End-to-End Validation Flow 

- Critical Assertions Summary 

Seat Map QC Execution Checklist 

Page 1 

### **Complete Seat Map & Book With Seat Map QC Checklist** 

### **Purpose** 

This document provides a complete Quality Control checklist for: 

- G Seat Map API Response Validation 

- G Seat Selection Validation 

- G Book With Seat Map Request Validation 

- G Booking Response Validation 

- G End-to-End Seat Assignment Validation 

It can be used for Manual Testing, API Testing, Automation Assertions, and Supplier Integration QC. 

--- 

## **Part 1 - Seat Map Response QC Checklist** 

### **1. Response Level Validation** 

#### **Verify Response Structure** 

- G supplier exists. 

- G flightSegments exists. 

- G passengersDetails exists. 

- G seatMapDetails exists. 

- G seatMapDetails is not empty. 

- G Response is valid JSON. 

#### **Possible Bugs** 

- G Missing supplier 

- G Missing seatMapDetails 

- G Empty seatMapDetails 

- G Invalid JSON 

- --- 

### **2. Flight Segment Validation** 

Verify for each flight segment: 

- G origin exists. 

- G destination exists. 

- G departureDateTime exists. 

- G arrivalDateTime exists. 

- G operatingCarrierCode exists. 

- G marketingCarrierCode exists. 

- G operatingFlightNumber exists. 

- G equipment exists. 

#### **Consistency Checks** 

- G Segment matches Search/Fare Confirm response. 

- G Carrier codes are consistent. 

Seat Map QC Execution Checklist 

Page 2 

- G Flight numbers are consistent. 

#### **Possible Bugs** 

- G Missing origin/destination 

- G Invalid flight number 

- G Carrier mismatch 

- G Aircraft mismatch 

- --- 

### **3. Passenger Validation** 

Verify: 

- G passengersDetails is not empty. 

- G Passenger indexes are unique. 

- G passengerTypeCode exists for every passenger. 

- G Passenger count matches Fare Confirm. 

#### **Possible Bugs** 

- G Duplicate passenger index 

- G Missing passenger type 

- G Passenger count mismatch 

- --- 

### **4. Deck Validation** 

Verify: 

- G cabinLayoutsByDeck exists. 

- G At least one deck exists. 

- G Deck name is not null. 

- G Each deck contains zones. 

#### **Possible Bugs** 

- G Missing deck 

- G Empty deck 

- G Deck without zones 

--- 

### **5. Zone Validation** 

Verify for each zone: 

- G zoneId exists. 

- G columns exists. 

- G columns is not empty. 

- G zoneId is unique within the deck. 

#### **Possible Bugs** 

- G Duplicate zoneId 

- G Missing zoneId 

- G Empty columns 

Seat Map QC Execution Checklist 

Page 3 

--- 

### **6. Column Layout Validation** 

Allowed values: 

- G A, B, C, D, E, F, null 

Verify: 

- G null represents aisle position. 

- G No invalid column values exist. 

#### **Possible Bugs** 

- G Invalid column code 

- G Missing aisle placeholder 

--- 

### **7. Row Validation** 

Verify for each row: 

- G rowNumber exists. 

- G rowNumber > 0. 

- G deck exists. 

- G zoneId exists. 

- G cells exists. 

- G rowNumber is unique within the segment. 

#### **Possible Bugs** 

- G Duplicate row number 

- G Missing row number 

- G Empty cells 

--- 

### **8. Cell Validation** 

### **When cellCategory = Seat** 

Verify: 

- G column exists. 

- G cellDetails exists. 

### **When cellCategory = Aisle** 

Verify: 

- G column = null. 

- G cellDetails = null. 

#### **Possible Bugs** 

- G Seat without details 

- G Aisle with details 

- G Seat without column 

- --- 

Seat Map QC Execution Checklist 

Page 4 

### **9. Cell Details Validation** 

Verify: 

- G cellID exists. 

- G cellCode exists. 

- G name exists. 

- G cellAvailability exists. 

Optional: 

- G description 

#### **Possible Bugs** 

- G Missing cellID 

- G Missing cellCode 

- G Duplicate seat code 

- --- 

### **10. Seat Availability Validation** 

Allowed values (updated 2026-08-10 — see Alignment Note above): 

- G AvailablePaid — **confirmed**, directly observed in the V2 Postman collection's saved GetSeatMap example (SPEC.md §2.7). 

- G Blocked — **confirmed**, directly observed. 

- G Occupied — **confirmed**, directly observed. 

- G AvailableFree — **unconfirmed candidate**, not observed in any saved example to date; confirm live before treating as a real enum member (SPEC.md §8.3, TC-SEATMAP-BND-03). 

- G AvailableAfterReservation (corrected from this document's earlier "AvailableAferReservation") — **unconfirmed candidate**, same status as AvailableFree. 

Verify: 

- G Value belongs to allowed set. 

- G Occupied seats are not selectable. 

- G Blocked seats are not selectable. 

#### **Possible Bugs** 

- G Unknown availability value 

- G Occupied seat marked available 

- G Blocked seat selectable 

--- 

### **11. Passenger-Specific Availability Validation** 

Verify for every passenger: 

- G seatPriceDetailsByPassenger entry exists. 

- G paxCellAvailability exists. 

#### **Important Rule** 

Overall seat availability may differ from passenger-specific availability. 

#### **Possible Bugs** 

- G Missing passenger availability 

- G Passenger availability missing for a seat 

- G Incorrect passenger mapping 

--- 

Seat Map QC Execution Checklist 

Page 5 

### **12. Seat Pricing Validation** 

Verify for each passenger: 

- G totalPrice exists. 

- G basePrice exists. 

- G taxesPrice exists. 

- G Currency is not null. 

- G Amounts are non-negative. 

- G totalPrice = basePrice + taxesPrice. 

#### **Possible Bugs** 

- G Negative price 

- G Currency missing 

- G Incorrect total calculation 

- --- 

### **13. Seat Characteristics Validation** 

Verify for every characteristic: 

- G padisCode exists. 

- G description exists. 

Expected PADIS examples: 

- G A = Aisle 

- G W = Window 

- G L = Leg space 

- G CH = Extra legroom 

- G E = Exit seat 

#### **Possible Bugs** 

- G Unknown PADIS code 

- G Missing characteristic description 

--- 

### **14. Seat Description Consistency** 

Verify that description is consistent with characteristics when applicable. 

Examples: 

- G W -> Window seat 

- G A -> Aisle seat 

- G E -> Exit seat 

#### **Possible Bugs** 

- G Description contradicts characteristics 

--- 

### **15. Exit Seat Restriction Validation** 

Verify restricted passengers cannot use exit seats. 

Examples: 

Seat Map QC Execution Checklist 

Page 6 

- G CHD should be blocked when business rule requires it. 

- G INF restrictions are enforced. 

#### **Possible Bugs** 

- G Child assigned exit seat 

- G Infant assigned restricted seat 

Automated as `TC-BOOK-BIZ-05` in `SeatMap_TestCases.csv` (candidate error code `RESTRICTED_EXIT_ROW_SEAT_FOR_CHILD`, unconfirmed live). 

- --- 

## **Part 2 - Seat Selection QC Checklist** 

### **16. Seat Existence Validation** 

Verify selected seat exists in Seat Map response. 

#### **Possible Bugs** 

- G Non-existent seat selected 

- --- 

### **17. Segment Validation** 

Verify selected seat belongs to the selected segment. 

#### **Possible Bugs** 

- G Seat assigned to wrong segment 

- --- 

### **18. Passenger Eligibility Validation** 

Verify passenger-specific availability allows seat selection. 

#### **Possible Bugs** 

- G Passenger booked blocked seat 

- --- 

### **19. Duplicate Seat Validation** 

Verify: 

- G Same passenger does not select same seat twice. 

- G Two passengers do not select same seat. 

#### **Possible Bugs** 

- G Duplicate seat accepted 

- G Shared seat assignment 

Automated as `TC-BOOK-NEG-07`/`TC-BOOK-NEG-08` in `SeatMap_TestCases.csv` (candidate error code `DUPLICATE_SEAT_SELECTION_IN_REQUEST`, unconfirmed live). 

- --- 

## **Part 3 - Book With Seat Map Request QC Checklist** 

### **20. Request Level Validation** 

Verify mandatory fields — **naming conflict, see Alignment Note above**: this checklist's field names below (`fareConfirmResponseId`/`SelectedOfferId`) match V1's convention and `Sample_API_Req&Res_V2.md`'s "Book || Hold Request" example, but the live V2 Postman collection's own saved example instead sends `ResponseId`/`selectedOfferId` (SPEC.md §2.9). Confirm live which the current staging API actually accepts (TC-BOOK-NEG-12) before treating either as definitive: 

- G fareConfirmResponseId (V1-style / Sample-doc-style) — cross-check against ResponseId (V2-collection-style) 

- G SelectedOfferId (V1-style / Sample-doc-style) — cross-check against selectedOfferId (V2-collection-style) 

Seat Map QC Execution Checklist 

Page 7 

- G supplier 

- G credentialsSelector 

- G passengersSelectedSeats 

#### **Possible Bugs** 

- G Missing mandatory field 

--- 

### **21. Fare Confirm Validation** 

Verify: 

- G fareConfirmResponseId is valid. 

- G It belongs to current session. 

- G It belongs to same supplier. 

- G It has not expired. 

#### **Possible Bugs** 

- G Invalid responseId 

- G Expired responseId 

- --- 

### **22. Offer Validation** 

Verify: 

- G SelectedOfferId exists. 

- G Offer belongs to Fare Confirm response. 

- G Offer is available. 

#### **Possible Bugs** 

- G Invalid offerId 

- G Offer mismatch 

--- 

### **23. Supplier Validation** 

Verify: 

- G Supplier matches Fare Confirm supplier. 

- G Supplier supports seat booking. 

#### **Possible Bugs** 

- G Supplier mismatch 

- --- 

### **24. Credentials Validation** 

Verify: 

- G credentialsSelector is valid. 

- G Credentials belong to supplier. 

- G Credentials are authorized. 

#### **Possible Bugs** 

- G Unauthorized credentials 

- --- 

Seat Map QC Execution Checklist 

Page 8 

### **25. Bundle Validation** 

For each selected bundle verify: 

- G JourneyKey exists. 

- G SelectedBundleCode exists. 

- G Bundle belongs to journey. 

- G Bundle is available. 

#### **Possible Bugs** 

- G Invalid bundle 

- G Bundle expired 

- --- 

### **26. Passenger Validation in Booking Request** 

Verify: 

- G Passenger reference exists. 

- G Passenger exists in Fare Confirm. 

- G Passenger count matches booking. 

#### **Possible Bugs** 

- G Missing passenger 

- G Invalid passenger reference 

--- 

### **27. Segment Validation in Booking Request** 

Verify: 

- G Segment exists in booking. 

- G Segment exists in Seat Map response. 

#### **Possible Bugs** 

- G Invalid segment reference 

- --- 

### **28. Seat Metadata Validation** 

Verify: 

- G cellCode exists. 

- G cellId exists. 

- G cellId matches Seat Map response. 

- G Metadata is not modified. 

#### **Possible Bugs** 

- G Invalid metadata 

- G Modified metadata accepted 

--- 

### **29. Seat Availability Before Booking** 

Verify seat is still: 

- G AvailableFree 

Seat Map QC Execution Checklist 

Page 9 

- G AvailablePaid (if supported) 

and not: 

- G Occupied 

- G Blocked 

#### **Possible Bugs** 

- G Occupied seat booked 

- G Blocked seat booked 

- --- 

### **30. Multi-Segment Seat Validation** 

Verify: 

- G Correct seat selected for each segment. 

- G No cross-segment seat assignment. 

#### **Possible Bugs** 

- G Seat assigned to wrong segment 

- --- 

## **Part 3a — SeatAfterHold (Hold-Branch Seat Attachment) QC Checklist (added 2026-08-10)**

The direct-Book seat-selection mechanism covered by Part 3 above does **not** apply to the Hold branch (`Hold`/`FareConfirmAfterHold`/`BookAfterHold` were confirmed to carry no `passengersSelectedSeats` field — SPEC.md §2.10/§2.13). Instead, the Hold branch must call a separate endpoint, `POST api/v2/SeatMap/SeatAfterHold`, against an already-Held PNR. As of this update, this endpoint has **no saved request/response example and no test script anywhere in the Postman collection** (SPEC.md §2.7a) — this sub-checklist is therefore written as a discovery checklist, not a confirmed-behavior checklist. Do not check any box below as "passed" without first recording the actual live behavior it describes.

### **20a. Request Shape Discovery**

- G Confirm whether the documented 6-field body (`supplier`, `credentialsSelector`, `pnr`, `gdsPNR`, `bookingToken`, `surName`) is complete, or whether a seat/cell field (analogous to Book's `passengersSelectedSeats`) is required but missing from the saved example (TC-SEATAFTERHOLD-VAL-01).

- G If a seat/cell field is required, confirm its exact shape and field names — do not assume it mirrors Book's `passengersSelectedSeats` shape without evidence.

#### **Possible Bugs**

- G Incomplete/stub request example shipped in the collection

- G Undocumented required field

---

### **20b. Chain Position Discovery**

- G Confirm where `SeatAfterHold` belongs relative to `Hold` → `FareConfirmAfterHold` → `BookAfterHold` (TC-SEATAFTERHOLD-INT-04) — candidates: immediately after Hold, between FareConfirmAfterHold and BookAfterHold, or after BookAfterHold.

- G Confirm whether more than one candidate position succeeds without erroring (an under-constrained endpoint is itself a finding, not evidence either position is "the" correct one).

#### **Possible Bugs**

- G Endpoint accepts calls at an unintended point in the chain with no state validation

---

### **20c. Response Shape Discovery**

- G Confirm the actual response shape — no saved example exists to check against.

- G Confirm whether a subsequent Retrieve reflects the attached seat via `passengersSelectedSeats`/`passengerSeats`/`totalSelectedSeats` (SPEC.md §2.11), the same fields Book's branch uses.

#### **Possible Bugs**

- G Seat attached via SeatAfterHold never surfaces in Retrieve

---

### **20d. Negative/Security Coverage (once shape is confirmed)**

- G Mismatched pnr/gdsPNR/bookingToken triple rejected (TC-SEATAFTERHOLD-NEG-01).

- G Call after hold expiration rejected (TC-SEATAFTERHOLD-NEG-02).

- G Standard api-key/Client-Id/cross-tenant security checks applied (TC-SEATAFTERHOLD-SEC-02).

#### **Possible Bugs**

- G Expired-hold call silently succeeds

- G Cross-tenant pnr/credentialsSelector combination silently succeeds

---

## **Part 4 - Booking Response QC Checklist** 

### **31. Booking Status Validation** 

Verify: 

- G Booking succeeds. 

- G bookingStatus = Booked. 

#### **Possible Bugs** 

- G Booking succeeds with wrong status 

- --- 

### **32. Seat Assignment Validation** 

Verify: 

- G Seat assignment exists. 

- G Seat code matches request. 

- G Passenger-seat mapping is correct. 

- G Segment-seat mapping is correct. 

#### **Possible Bugs** 

- G Wrong seat returned 

- G Passenger-seat mismatch 

- --- 

### **33. Pricing Validation After Booking** 

Verify: 

- G Seat price appears in booking. 

- G Seat price amount is correct. 

- G Currency is correct. 

Seat Map QC Execution Checklist 

Page 10 

- G Total booking amount includes seat price once only. 

#### **Possible Bugs** 

- G Seat price missing 

- G Duplicate seat charge 

- --- 

### **34. Ancillary Preservation Validation** 

Verify seat assignment remains available in: 

- G Retrieve Booking 

- G Ticketing/Retrieve after issue 

#### **Possible Bugs** 

- G Seat disappears after booking 

- G Seat disappears after ticketing 

- --- 

## **Part 5 - Retrieve Booking Validation** 

### **35. Retrieve Booking Seat Validation** 

Verify: 

- G All selected seats appear. 

- G Seat numbers are correct. 

- G Passenger mapping is preserved. 

- G Segment mapping is preserved. 

#### **Possible Bugs** 

- G Seat missing in Retrieve 

- G Wrong passenger assignment 

--- 

## **Part 6 - Negative Test Checklist** 

Execute and verify proper error handling for: 

- G Invalid FareConfirmResponseId 

- G Expired FareConfirmResponseId 

- G Invalid SelectedOfferId 

- G Invalid JourneyKey 

- G Invalid Segment 

- G Invalid Passenger Reference 

- G Invalid cellCode 

- G Invalid cellId 

- G Occupied Seat 

- G Blocked Seat 

- G Seat from another flight 

Seat Map QC Execution Checklist 

Page 11 

- G Seat from another segment 

- G Duplicate seat selection 

- G Same seat selected for multiple passengers 

- G Child selecting Exit Seat 

- G Expired Seat Map 

- G Missing metadata 

- G Modified metadata 

- G Empty passengersSelectedSeats 

- G Empty setSegmentsSeats 

- G Missing supplier 

- G Missing credentialsSelector 

- G Missing SelectedOfferId 

- G Missing fareConfirmResponseId 

--- 

**Part 7 - End-to-End Validation Flow** Search ↓ Fare Confirm ↓ Upsell / Get Offer Bundles ↓ Seat Map ↓ Select Seat ↓ Book With Seat ↓ Retrieve Booking ↓ Verify Seat Assignment ↓ Retrieve After Issue ↓ Verify Seat Assignment Still Exists --- 

### **Critical Assertions Summary** 

- G Selected seat must equal retrieved seat. 

- G Passenger reference must equal retrieved passenger assignment. 

- G Segment reference must equal retrieved segment assignment. 

Seat Map QC Execution Checklist 

Page 12 

- G Seat price must equal Seat Map price. 

- G Booking total must include seat price exactly once. 

- G Blocked/Occupied seats must never be booked. 

- G Exit-seat restrictions must be enforced. 

- G cellId must correspond to selected cellCode. 

- G No passenger may receive another passenger's seat. 

- G No seat assignment may disappear after booking or retrieval. 

- G *(added 2026-08-10, unconfirmed — see Part 3a)* A seat attached via `SeatAfterHold` on the Hold branch must surface identically to a Book-branch seat selection at the final Retrieve (same `passengersSelectedSeats`/`passengerSeats`/`totalSelectedSeats` fields) — do not assume this without live confirmation. 

Seat Map QC Execution Checklist 

Page 13 

