# QA Execution Report — AirArabiaPlus / USA — V2 booking creation (24 test cases, ne-6)

**Environment:** staging (ne-6) &middot; https://ndc-integration-stg-ne-6.azurewebsites.net/
**Supplier:** AirArabiaPlus  **Credentials Selector:** USA
**Started:** 2026-11-08T12:41:39.426Z
**Ended:** 2026-11-08T13:07:33.673Z
**Status:** COMPLETE
**Prior runs:** none — first run for AirArabiaPlus (see NDC_Integration/Artifacts/Logs/)

## Summary

- Test cases logged: 24 of 24 planned
- Passed: 7
- Failed: 15
- Blocked: 2
- Failed test cases: OW-ANC-01, OW-ANC-02, OW-BUN-01, OW-BUN-02, RT-ANC-01, RT-ANC-02, RT-BUN-01, OWC-ANC-01, OWC-ANC-02, OWC-BUN-01, OWC-BUN-02, RTC-ANC-01, RTC-ANC-02, RTC-BUN-01, RTC-BUN-02
- Blocked test cases: RT-BAS-01, RT-BUN-02

## Test case results

### OW-BAS-01 — PASS

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way SHJ→COK, 15 Dec 2026, basic booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** Search → FareConfirm → AddPassenger → Book, 1 ADT, SHJ-COK 2026-12-15, AirArabiaPlus/USA
- **Response:** Search 200 (1 offer, SHJ-COK G9426, total 4052.62 EGP) → FareConfirm 200 → AddPassenger 200 → Book 200, pnr 6WUOS4
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult; the response lists 1 passenger(s).
- **Actual:** Booking created, PNR 6WUOS4; all 9 checks of the run passed (Search, FareConfirm, AddPassenger and Book returned 200; PNR and booking token present; 1 passenger in the response).
- **Status:** PASS
- **Evidence:** Result line from the first run: "RESULT OW-BAS-01 pnr=6WUOS4 ... correlationId=007415b5-0798-425b-b77b-492dd2f39265 (server)". The full request/response payloads of this first run were NOT retained (the log capture was fixed afterwards); a re-run of this case later returned a Search with no offers (see Findings), so no full payload exists for this PNR.

### OW-BAS-02 — PASS

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way SHJ→COK, 15 Dec 2026, basic booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** Search → FareConfirm → AddPassenger → Book, 1 adult, 1 child and 1 infant, one-way SHJ→COK, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → Book 200; pnr 65TFMI
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult, 1 child and 1 infant; the response lists 3 passenger(s).
- **Actual:** Booking created, PNR 65TFMI; 3 passenger(s) in the response; total 8960.38 EGP.
- **Status:** PASS
- **Evidence:** Book 200, pnr 65TFMI, bookingToken present. Search offer chosen by itinerary type (journeys/segments direct).

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 8960.38 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 8960.38 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 — pnr 65TFMI, bookingToken present=true, passengers 3, total 8960.38 EGP

### OW-ANC-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way SHJ→COK, 15 Dec 2026, booking with ancillaries (seat, meal, baggage), 2 adults
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 2 adults, one-way SHJ→COK, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 6UI9JZ
- **Expected:** A booking is created for 2 adults with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 6UI9JZ, but only Meal could be selected: GetAncillary offered {"Meal":6} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":6}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 8105.24 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 8105.24 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":6}; passengers with availability: A1/ADT, A2/ADT; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 8633.88 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 6UI9JZ, bookingToken present=true, passengers 2, total 8633.88 EGP

### OW-ANC-02 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way SHJ→COK, 15 Dec 2026, booking with ancillaries (seat, meal, baggage), 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 1 adult, 1 child and 1 infant, one-way SHJ→COK, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 6ILRUZ
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 6ILRUZ, but only Meal could be selected: GetAncillary offered {"Meal":6} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":6}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 8960.38 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 8960.38 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":6}; passengers with availability: A1/ADT, C2/CHD; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 9489.02 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 6ILRUZ, bookingToken present=true, passengers 3, total 9489.02 EGP

### OW-BUN-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way SHJ→COK, 15 Dec 2026, bundle booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book, 1 adult, one-way SHJ→COK, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → GetOfferBundles 200 → AddPassenger 200 → Book 200; pnr 6U77HE
- **Expected:** A booking is created for 1 adult with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** Booking created, PNR 6U77HE, but the selected bundle (66580, ADT 635.44 EGP) was not applied: Book total 4052.62 EGP equals the pre-bundle FareConfirm total 4052.62 EGP, and the baggage in the Book response is {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}.
- **Status:** FAIL
- **Evidence:** Bundle 66580 priced ADT 635.44 EGP (GetOfferBundles); FareConfirm total 4052.62 EGP; Book total 4052.62 EGP; Book baggageDetails {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}; Book priceClasses "Basic".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 4052.62 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 4052.62 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 — bundleChoices 66580,66589,66624
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 — pnr 6U77HE, bookingToken present=true, passengers 1, total 4052.62 EGP

### OW-BUN-02 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way SHJ→COK, 15 Dec 2026, bundle booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book, 1 adult, 1 child and 1 infant, one-way SHJ→COK, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → GetOfferBundles 200 → AddPassenger 200 → Book 200; pnr 60BE8Q
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** Booking created, PNR 60BE8Q, but the selected bundle (66580, ADT 635.44 EGP, CHD 635.44 EGP) was not applied: Book total 8960.38 EGP equals the pre-bundle FareConfirm total 8960.38 EGP, and the baggage in the Book response is {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}.
- **Status:** FAIL
- **Evidence:** Bundle 66580 priced ADT 635.44 EGP, CHD 635.44 EGP (GetOfferBundles); FareConfirm total 8960.38 EGP; Book total 8960.38 EGP; Book baggageDetails {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}; Book priceClasses "Basic".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 8960.38 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 8960.38 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 — bundleChoices 66580,66589,66624
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 — pnr 60BE8Q, bookingToken present=true, passengers 3, total 8960.38 EGP

### RT-BAS-01 — BLOCKED

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026, basic booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** POST api/V2/FlightSearch/Search — SHJ-COK 2026-12-15 / COK-SHJ 2026-12-22, 1 ADT, AirArabiaPlus/USA
- **Response:** 200 — 0 offer(s)
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult; the response lists 1 passenger(s).
- **Actual:** Search returned 200 with offers: [] — no flight to book, so the case could not run.
- **Status:** BLOCKED
- **Evidence:** Search for return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026 returned an empty offers array. Same-day probe searches showed the SHJ↔COK return pair returning no offers on 3 further attempts, while other return cases had found offers earlier in the run (availability is unstable).

### RT-BAS-02 — PASS

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026, basic booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** Search → FareConfirm → AddPassenger → Book, 1 adult, 1 child and 1 infant, return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → Book 200; pnr 6ZOUH2
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult, 1 child and 1 infant; the response lists 3 passenger(s).
- **Actual:** Booking created, PNR 6ZOUH2; 3 passenger(s) in the response; total 17315.74 EGP.
- **Status:** PASS
- **Evidence:** Book 200, pnr 6ZOUH2, bookingToken present. Search offer chosen by itinerary type (journeys/segments direct).

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 2 offer(s), offer[0] total 17315.74 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 17315.74 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 — pnr 6ZOUH2, bookingToken present=true, passengers 3, total 17315.74 EGP

### RT-ANC-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026, booking with ancillaries (seat, meal, baggage), 2 adults
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 2 adults, return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 6ICDLN
- **Expected:** A booking is created for 2 adults with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 6ICDLN, but only Meal could be selected: GetAncillary offered {"Meal":12} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":12}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 2 offer(s), offer[0] total 14838.2 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 14838.2 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":12}; passengers with availability: A1/ADT, A2/ADT; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 15895.48 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 6ICDLN, bookingToken present=true, passengers 2, total 15895.48 EGP

### RT-ANC-02 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026, booking with ancillaries (seat, meal, baggage), 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 1 adult, 1 child and 1 infant, return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 6UBF8H
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 6UBF8H, but only Meal could be selected: GetAncillary offered {"Meal":12} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":12}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 2 offer(s), offer[0] total 17315.74 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 17315.74 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":12}; passengers with availability: A1/ADT, C2/CHD; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 18373.02 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 6UBF8H, bookingToken present=true, passengers 3, total 18373.02 EGP

### RT-BUN-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026, bundle booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book, 1 adult, return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → GetOfferBundles 200 → AddPassenger 200 → Book 200; pnr 6Q71SF
- **Expected:** A booking is created for 1 adult with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** Booking created, PNR 6Q71SF, but the selected bundle (66580,66580, ADT 635.44 EGP) was not applied: Book total 7419.1 EGP equals the pre-bundle FareConfirm total 7419.1 EGP, and the baggage in the Book response is {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}.
- **Status:** FAIL
- **Evidence:** Bundle 66580,66580 priced ADT 635.44 EGP (GetOfferBundles); FareConfirm total 7419.1 EGP; Book total 7419.1 EGP; Book baggageDetails {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}; Book priceClasses "Basic".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 2 offer(s), offer[0] total 7419.1 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 7419.1 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 — bundleChoices 66580,66589,66624
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 — pnr 6Q71SF, bookingToken present=true, passengers 1, total 7419.1 EGP

### RT-BUN-02 — BLOCKED

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026, bundle booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** POST api/V2/FlightSearch/Search — SHJ-COK 2026-12-15 / COK-SHJ 2026-12-22, 1 ADT+1 CHD+1 INF, AirArabiaPlus/USA
- **Response:** 200 — 0 offer(s)
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** Search returned 200 with offers: [] — no flight to book, so the case could not run.
- **Status:** BLOCKED
- **Evidence:** Search for return SHJ→COK 15 Dec and COK→SHJ 22 Dec 2026 returned an empty offers array. Same-day probe searches showed the SHJ↔COK return pair returning no offers on 3 further attempts, while other return cases had found offers earlier in the run (availability is unstable).

### OWC-BAS-01 — PASS

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way connection MCT→COK via SHJ, 15 Dec 2026, basic booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** Search → FareConfirm → AddPassenger → Book, 1 adult, one-way connection MCT→COK via SHJ, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → Book 200; pnr 6CKF1V
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult; the response lists 1 passenger(s).
- **Actual:** Booking created, PNR 6CKF1V; 1 passenger(s) in the response; total 4333.16 EGP.
- **Status:** PASS
- **Evidence:** Book 200, pnr 6CKF1V, bookingToken present. Search offer chosen by itinerary type (journeys/segments connecting).

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 4333.16 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 4333.16 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 — pnr 6CKF1V, bookingToken present=true, passengers 1, total 4333.16 EGP

### OWC-BAS-02 — PASS

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way connection MCT→COK via SHJ, 15 Dec 2026, basic booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** Search → FareConfirm → AddPassenger → Book, 1 adult, 1 child and 1 infant, one-way connection MCT→COK via SHJ, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → Book 200; pnr 66IEW3
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult, 1 child and 1 infant; the response lists 3 passenger(s).
- **Actual:** Booking created, PNR 66IEW3; 3 passenger(s) in the response; total 11235.12 EGP.
- **Status:** PASS
- **Evidence:** Book 200, pnr 66IEW3, bookingToken present. Search offer chosen by itinerary type (journeys/segments connecting).

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 11235.12 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 11235.12 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 — pnr 66IEW3, bookingToken present=true, passengers 3, total 11235.12 EGP

### OWC-ANC-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way connection MCT→COK via SHJ, 15 Dec 2026, booking with ancillaries (seat, meal, baggage), 2 adults
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 2 adults, one-way connection MCT→COK via SHJ, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 6JS8IN
- **Expected:** A booking is created for 2 adults with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 6JS8IN, but only Meal could be selected: GetAncillary offered {"Meal":12} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":12}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 8666.32 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 8666.32 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":12}; passengers with availability: A1/ADT, A2/ADT; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 9723.6 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 6JS8IN, bookingToken present=true, passengers 2, total 9723.6 EGP

### OWC-ANC-02 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way connection MCT→COK via SHJ, 15 Dec 2026, booking with ancillaries (seat, meal, baggage), 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 1 adult, 1 child and 1 infant, one-way connection MCT→COK via SHJ, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 6HLOKX
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 6HLOKX, but only Meal could be selected: GetAncillary offered {"Meal":12} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":12}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 11235.12 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 11235.12 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":12}; passengers with availability: A1/ADT, C2/CHD; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 12292.4 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 6HLOKX, bookingToken present=true, passengers 3, total 12292.4 EGP

### OWC-BUN-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way connection MCT→COK via SHJ, 15 Dec 2026, bundle booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book, 1 adult, one-way connection MCT→COK via SHJ, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → GetOfferBundles 200 → AddPassenger 200 → Book 200; pnr 6IZBQ8
- **Expected:** A booking is created for 1 adult with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** Booking created, PNR 6IZBQ8, but the selected bundle (66580, ADT 635.44 EGP) was not applied: Book total 4333.16 EGP equals the pre-bundle FareConfirm total 4333.16 EGP, and the baggage in the Book response is {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}.
- **Status:** FAIL
- **Evidence:** Bundle 66580 priced ADT 635.44 EGP (GetOfferBundles); FareConfirm total 4333.16 EGP; Book total 4333.16 EGP; Book baggageDetails {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}; Book priceClasses "Basic".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 4333.16 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 4333.16 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 — bundleChoices 66580,66589,66624
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 — pnr 6IZBQ8, bookingToken present=true, passengers 1, total 4333.16 EGP

### OWC-BUN-02 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — one-way connection MCT→COK via SHJ, 15 Dec 2026, bundle booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book, 1 adult, 1 child and 1 infant, one-way connection MCT→COK via SHJ, 15 Dec 2026
- **Response:** Search 200 → FareConfirm 200 → GetOfferBundles 200 → AddPassenger 200 → Book 200; pnr 656AT7
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** Booking created, PNR 656AT7, but the selected bundle (66580, ADT 635.44 EGP, CHD 635.44 EGP) was not applied: Book total 11235.12 EGP equals the pre-bundle FareConfirm total 11235.12 EGP, and the baggage in the Book response is {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}.
- **Status:** FAIL
- **Evidence:** Bundle 66580 priced ADT 635.44 EGP, CHD 635.44 EGP (GetOfferBundles); FareConfirm total 11235.12 EGP; Book total 11235.12 EGP; Book baggageDetails {"carryOnBaggage":"10 Kg (7 Kg bag + 3 Kg personal item)","checkInBaggage":"No Checked baggage"}; Book priceClasses "Basic".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 11235.12 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 11235.12 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; GetOfferBundles:** PASS &mdash; 200 — bundleChoices 66580,66589,66624
  - **Hop 4 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 5 &mdash; Book:** FAIL &mdash; 200 — pnr 656AT7, bookingToken present=true, passengers 3, total 11235.12 EGP

### RTC-BAS-01 — PASS

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ, basic booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** Search → FareConfirm → AddPassenger → Book, 1 adult, return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → Book 200; pnr 6ANQFS
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult; the response lists 1 passenger(s).
- **Actual:** Booking created, PNR 6ANQFS; 1 passenger(s) in the response; total 7943 EGP.
- **Status:** PASS
- **Evidence:** Book 200, pnr 6ANQFS, bookingToken present. Search offer chosen by itinerary type (journeys/segments connecting).

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 7943 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 7943 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 — pnr 6ANQFS, bookingToken present=true, passengers 1, total 7943 EGP

### RTC-BAS-02 — PASS

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ, basic booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → Book
- **Request:** Search → FareConfirm → AddPassenger → Book, 1 adult, 1 child and 1 infant, return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → Book 200; pnr 6CBVXR
- **Expected:** A booking is created (PNR and booking token returned) for 1 adult, 1 child and 1 infant; the response lists 3 passenger(s).
- **Actual:** Booking created, PNR 6CBVXR; 3 passenger(s) in the response; total 21672.56 EGP.
- **Status:** PASS
- **Evidence:** Book 200, pnr 6CBVXR, bookingToken present. Search offer chosen by itinerary type (journeys/segments connecting).

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 21672.56 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 21672.56 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; Book:** PASS &mdash; 200 — pnr 6CBVXR, bookingToken present=true, passengers 3, total 21672.56 EGP

### RTC-ANC-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ, booking with ancillaries (seat, meal, baggage), 2 adults
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 2 adults, return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 6O58T0
- **Expected:** A booking is created for 2 adults with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 6O58T0, but only Meal could be selected: GetAncillary offered {"Meal":24} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":24}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 15886 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 15886 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":24}; passengers with availability: A1/ADT, A2/ADT; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 18000.54 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 6O58T0, bookingToken present=true, passengers 2, total 18000.54 EGP

### RTC-ANC-02 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ, booking with ancillaries (seat, meal, baggage), 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book
- **Request:** Search → FareConfirm → AddPassenger → GetAncillary → FareCheck → Book, 1 adult, 1 child and 1 infant, return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ
- **Response:** Search 200 → FareConfirm 200 → AddPassenger 200 → GetAncillary 200 → FareCheck 200 → Book 200; pnr 67R2WD
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with a seat, a meal and baggage selected for each passenger and segment; the Book response echoes the selected ancillaries.
- **Actual:** Booking created, PNR 67R2WD, but only Meal could be selected: GetAncillary offered {"Meal":24} and no Baggage or Seat items, so the requested seat + meal + baggage combination could not be booked.
- **Status:** FAIL
- **Evidence:** GetAncillary categories offered (all segments): {"Meal":24}. FareConfirm said offerHasAncillary=true, offerHasSeat=true. Meal-only selection was sent to FareCheck (200) and Book (200). Failed check: "Baggage, Meal and Seat all selectable for every passenger/segment".

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 21672.56 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 21672.56 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; AddPassenger:** PASS &mdash; 200 — responseId/offerId issued
  - **Hop 4 &mdash; GetAncillary:** FAIL &mdash; 200 — categories offered (all segments): {"Meal":24}; passengers with availability: A1/ADT, C2/CHD; isFareCheckRequired=true
  - **Hop 5 &mdash; FareCheck:** PASS &mdash; 200 — selectedOffer total 23787.1 EGP
  - **Hop 6 &mdash; Book:** PASS &mdash; 200 — pnr 67R2WD, bookingToken present=true, passengers 3, total 23787.1 EGP

### RTC-BUN-01 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ, bundle booking, 1 adult
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book, 1 adult, return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ
- **Response:** Search 200 → FareConfirm 200 → GetOfferBundles 409
- **Expected:** A booking is created for 1 adult with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** GetOfferBundles returned 409: [{"Name":"ServiceBundleError","Value":"No Available Bundles For the Selected Criteria"}] even though FareConfirm reported haveBundles=true. No booking was made.
- **Status:** FAIL
- **Evidence:** GetOfferBundles 409 body: {"Status":409,"TransactionId":"1a89ffb8-7268-455d-841a-6229cbef40bd","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ServiceBundleError","Value":"No Available Bundles For the Selected Criteria"}]}. ErrorCode and ErrorMessage are both "NDC-INT-UNC-Z9999". FareConfirm flags: haveBundles=true.

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 7943 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 7943 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; GetOfferBundles:** FAIL &mdash; 409 {"Status":409,"TransactionId":"1a89ffb8-7268-455d-841a-6229cbef40bd","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ServiceBundleError","Value":"No Available Bundles For the Selected Criteria"}]}

### RTC-BUN-02 — FAIL

- **Test Case:** [V2][AirArabiaPlus] Booking creation — return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ, bundle booking, 1 adult, 1 child and 1 infant
- **Category:** Flow
- **Endpoint Name:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book
- **Request:** Search → FareConfirm → GetOfferBundles → AddPassenger → Book, 1 adult, 1 child and 1 infant, return connection MCT→COK 15 Dec and COK→MCT 22 Dec 2026, via SHJ
- **Response:** Search 200 → FareConfirm 200 → GetOfferBundles 409
- **Expected:** A booking is created for 1 adult, 1 child and 1 infant with the selected bundle applied: the Book price includes the bundle price and the baggage/entitlements reflect the bundle.
- **Actual:** GetOfferBundles returned 409: [{"Name":"ServiceBundleError","Value":"No Available Bundles For the Selected Criteria"}] even though FareConfirm reported haveBundles=true. No booking was made.
- **Status:** FAIL
- **Evidence:** GetOfferBundles 409 body: {"Status":409,"TransactionId":"71a72288-3f30-4cda-9f33-8b75e04094ce","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ServiceBundleError","Value":"No Available Bundles For the Selected Criteria"}]}. ErrorCode and ErrorMessage are both "NDC-INT-UNC-Z9999". FareConfirm flags: haveBundles=true.

  - **Hop 1 &mdash; Search:** PASS &mdash; 200 — 1 offer(s), offer[0] total 21672.56 EGP
  - **Hop 2 &mdash; FareConfirm:** PASS &mdash; 200 — selectedOffer total 21672.56 EGP, haveBundles=true, offerHasAncillary=true, offerHasSeat=true
  - **Hop 3 &mdash; GetOfferBundles:** FAIL &mdash; 409 {"Status":409,"TransactionId":"71a72288-3f30-4cda-9f33-8b75e04094ce","ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ServiceBundleError","Value":"No Available Bundles For the Selected Criteria"}]}

## Findings

### Defects

- **[OW-ANC-01] BUG-01 (new) &mdash; GetAncillary returns only Meal items — no Baggage and no Seat — for every AirArabiaPlus/USA offer tested** Field: `segmentsAncillariesDetails (Baggage and Seat categories)`. Expected: segmentsAncillariesDetails.&lt;segment&gt; includes items with ancillaryCategory "Baggage" and "Seat" as well as "Meal". **Impact:** Seat and baggage ancillaries cannot be booked through GetAncillary although FareConfirm reports offerHasAncillary=true and offerHasSeat=true; the 8 ancillary booking cases cannot be completed as specified Evidence: All 8 ancillary cases (OW-ANC-01, OW-ANC-02, RT-ANC-01, RT-ANC-02, OWC-ANC-01, OWC-ANC-02, RTC-ANC-01, RTC-ANC-02): categories offered = Meal only (6 items per segment).
- **[OW-BUN-01] BUG-02 (new) &mdash; Book accepts selectedBundles but does not apply the bundle: price and baggage are unchanged** Field: `selectedOffer.priceDetails.totalAmount / baggageDetails (selectedBundles not applied)`. Expected: totalAmount = pre-bundle total + bundle price (e.g. 4052.62 + 635.44 = 4688.06 EGP for bundle 66580) and checked baggage 20/30 Kg per the bundle. **Impact:** A customer who selected a paid bundle is booked on the Basic fare with no checked baggage, and the bundle fee is not charged — pricing and entitlements are wrong in the PNR Evidence: Same result in all 5 booked bundle cases (OW-BUN-01, OW-BUN-02, RT-BUN-01, OWC-BUN-01, OWC-BUN-02). OW-BUN-01: {"sel":["66580"],"bundlePrice":"ADT 635.44 EGP","fcTotal":"4052.62 EGP","bookTotal":"4052.62 EGP","bookBaggage":"{\"carryOnBaggage\":\"10 Kg (7 Kg bag + 3 Kg personal item)\",\"checkInBaggage\":\"No Checked baggage\"}","applied":false}.
- **[RTC-BUN-01] BUG-03 (new) &mdash; GetOfferBundles returns 409 "No Available Bundles" for return-connection offers whose FareConfirm reports haveBundles=true; ErrorCode equals ErrorMessage** Field: `bundleChoices`. Expected: bundleChoices populated, or haveBundles=false on FareConfirm for an offer that has no bundles; ErrorMessage a readable sentence instead of repeating the code. **Impact:** Bundle booking is impossible for return-connection itineraries (MCT↔COK via SHJ), and the capability flag cannot be trusted to gate the call; the error text gives a client nothing to show Evidence: RTC-BUN-01 and RTC-BUN-02: FareConfirm haveBundles=true, then GetOfferBundles 409 {"ErrorCode":"NDC-INT-UNC-Z9999","ErrorMessage":"NDC-INT-UNC-Z9999","Context":[{"Name":"ServiceBundleError","Value":"No Available Bundles For the Selected Criteria"}]}.

### Unknown-resolutions

- **[OW-BAS-02]** Search/FareConfirm/... responses carry a server-issued CorrelationId in a response header (not in the JSON body); the client-sent CorrelationId is replaced by it for the rest of the flow. Exact header name not recorded. Evidence: Collection script reported correlationSource=server on every run; Search response bodies contain no CorrelationId key.
- **[RT-BAS-01]** Search availability for SHJ↔COK is not stable: identical requests returned offers for some cases and an empty offers array for others (OW-BAS-01 returned 1 offer on its first run and none on re-run; RT-BAS-01 and RT-BUN-02 returned none twice; 3 further probe searches returned none). Evidence: Search 200 with offers: [] — not an error response.
- **[OW-ANC-02]** GetAncillary lists availability only for the adult and child passengers; the infant (INF) has no entry in passengersAncillariesAvailabilty. Evidence: OW-ANC-02: passengers with availability A1/ADT, C2/CHD only.

## Proposed SPEC.md updates

No SPEC.md updates proposed this round (Round 11's pending proposals are unchanged).

## Cleanup / follow-up

Live artifacts left behind this round (20):

- **needs_void_cancel** &mdash; pnr 6WUOS4 (OW-BAS-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 65TFMI (OW-BAS-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6UI9JZ (OW-ANC-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6ILRUZ (OW-ANC-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6U77HE (OW-BUN-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 60BE8Q (OW-BUN-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6ZOUH2 (RT-BAS-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6ICDLN (RT-ANC-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6UBF8H (RT-ANC-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6Q71SF (RT-BUN-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6CKF1V (OWC-BAS-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 66IEW3 (OWC-BAS-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6JS8IN (OWC-ANC-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6HLOKX (OWC-ANC-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6IZBQ8 (OWC-BUN-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 656AT7 (OWC-BUN-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6ANQFS (RTC-BAS-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6CBVXR (RTC-BAS-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 6O58T0 (RTC-ANC-01) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run
- **needs_void_cancel** &mdash; pnr 67R2WD (RTC-ANC-02) &mdash; Live staging booking (AirArabiaPlus/USA) left open; no Void/Cancel was run

