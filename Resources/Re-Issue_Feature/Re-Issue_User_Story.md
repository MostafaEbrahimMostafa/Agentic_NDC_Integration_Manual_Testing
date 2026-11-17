Title : Implement Oman Air Reissue

Description : 

As: Integration Team

I want: To implement Reissue for Oman Air

So that: Agents can reissue Oman Air tickets end to end, covering all required scenarios, validations, fees, and business rules.


Acceptance Criteria : 

A kick-off meeting with the CORE team shall be held before implementation starts: to align on the Reissue scope.
Reissue shall cover Date, Destination, Booking Class, and Trip Type: the implementation should support Reissue based on these criteria.
Passenger Reissue shall be supported per Ticket, including Passenger Split and Multiple Reissues where applicable: individual passenger/ticket Reissue, Split scenarios, and repeated Reissue scenarios should be supported.
A Passenger Split shall result in a new PNR: the Reissue result should be created on the new PNR, with the required PNR Linking/Updating handled in the flow.
The Reissue flow shall cover Search, Validation/Review, and Reissue: each stage should be implemented end to end.
Supplier Reissue Penalties shall be covered: the required supplier endpoints should be integrated and applicable penalties returned.
The Reissue Action and Reissue Lookup shall be supported in NDCCore: the required API behavior and Reissue PNR lookup should be implemented.
The PNR flow shall support Booked PNR → Reissue → Reissue PNR: the full PNR lifecycle should work.
Change Fee shall be calculated as part of Reissue: applicable Change Fees should be included in the Reissue calculation.
Discount handling shall follow the approved Business Rule: the applicable Discount rule should be applied once confirmed by the Business Team.