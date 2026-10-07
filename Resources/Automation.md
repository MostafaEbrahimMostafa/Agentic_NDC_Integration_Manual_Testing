    public static void validateSeatMapReflectionInBookResponse(Map<String, Object> bookResponse, Map<String, Object> seatMapResponse, Map<String, Object> bookPayload, SoftAssert softAssert, String seatMapReflection) {

        validationStart("SEATMAP REFLECTION IN BOOKING RESPONSE");

        TcCounterHelper tc = new TcCounterHelper(1);

        step(seatMapReflection + " - SeatMap Reflection");

        assertSeatMapReflection(
                bookResponse,
                seatMapResponse,
                bookPayload,
                softAssert,
                tc.next("SeatMap Reflection"));

        step(seatMapReflection + " - Book Seat Integrity");

        // Shared with the Retrieve flow: Book, Hold and Retrieve publish an identical seat structure.
        validateOrderSeatIntegrity(
                bookResponse,
                bookPayload,
                softAssert,
                tc);

        step(seatMapReflection + " - SeatMap Chaining");

        assertSeatMapToBookChaining(
                bookPayload,
                seatMapResponse,
                softAssert,
                tc.next("SeatMap to Book Chaining"));

        validationEnd();
    }
--------------------------
    public static void validatePreSeatMapAssertions(Response response,
                                                    SoftAssert softAssert) {

        validationStart("PRE SEAT MAP RESPONSE");

        JsonPath jsonPath = response.jsonPath();
        Map<String, Object> seatMapResponse = safeGetMap(jsonPath, "$");

        TcCounterHelper tc = new TcCounterHelper(1);

        validateBasicSeatMapStructure(
                seatMapResponse,
                softAssert,
                tc.next("Response Structure"));

        validateCompleteSeatMapDetailsSchema(
                seatMapResponse,
                softAssert,
                tc.next("Seat Map Details Schema"));

        validateFlightSegmentDetailsAreReturned(
                seatMapResponse,
                softAssert,
                tc.next("Flight Segments"));

        validatePassengersDetailsAreReturnedCorrectly(
                seatMapResponse,
                softAssert,
                tc.next("Passenger Details"));

        validateSeatMapDetailsPerSegmentAndCellRules(
                seatMapResponse,
                softAssert,
                tc.next("Seat Map Details"));

        validateRowsAreReturnedCorrectly(
                seatMapResponse,
                softAssert,
                tc.next("Seat Rows"));

        validateEachRowContainsSeatCells(
                seatMapResponse,
                softAssert,
                tc.next("Seat Cells"));

        validateSeatCellDetails(
                seatMapResponse,
                softAssert,
                tc.next("Seat Details"));

        validateSeatAvailabilityValues(
                seatMapResponse,
                softAssert,
                tc.next("Seat Availability"));

        validateseatpricedetailsperpaxexist(
                seatMapResponse,
                softAssert,
                tc.next("Seat Price Details"));

        validateSeatPriceComponentsExist(
                seatMapResponse,
                softAssert,
                tc.next("Price Components"));

        validateSeatPriceAmountAndCurrency(
                seatMapResponse,
                softAssert,
                tc.next("Price & Currency"));

        validateSeatPriceCalculation(
                seatMapResponse,
                softAssert,
                tc.next("Price Calculation"));

        validateSeatAvailabilityAndAislePricingRules(
                seatMapResponse,
                softAssert,
                tc.next("Availability & Aisle Pricing Rules"));

        validateCellCharacteristicsDescriptionConsistency(
                seatMapResponse,
                softAssert,
                tc.next("Cell Characteristics Description"));

        validateSeatAndAisleCellStructure(
                seatMapResponse,
                softAssert,
                tc.next("Seat & Aisle Cell Structure"));

        validateSeatPriceDetailsByAvailability(
                seatMapResponse,
                softAssert,
                tc.next("Seat Price Details by Availability"));

        validateCellCodeIsUniquePerSegment(
                seatMapResponse,
                softAssert,
                tc.next("Cell Code Uniqueness"));

        validateSeatMapStructuralUniquenessAndDomain(
                seatMapResponse,
                softAssert,
                tc.next("Structural Uniqueness & Domain"));

        validateCellAvailabilityAndPaxAvailabilityAreIndependent(
                seatMapResponse,
                softAssert,
                tc.next("Cell Availability vs Pax Availability"));

        validateNormalizedSeatMapResponseStructure(
                seatMapResponse,
                softAssert,
                tc.next("GetSeatMap returns the same normalized response"));


        validationEnd();
    }