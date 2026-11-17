# Galileo NDC Availability Flow Implementation — Analysis

## Source
User story **"Galileo NDC Availability Flow Implementation"**, pasted in-session on 2026-11-10 (no `*_UserStory.md` file). Analyzed against `NDC_Integration/SPEC.md` (§ as of this read, 2026-11-10) and the one Galileo artifact in the repo: `Postman_Collection/Collection_V2/NDC Integrations_Ancillary Galileo avilability Copy.postman_collection.json` (the "prepared Postman collection", supplied by the user).

**The "documented investigation findings" the story cites were not found in the repo and were not provided.** Everything below about the availability flow's request/response behavior is read from that collection's requests and test scripts, not from a contract.

### What the collection shows (read from its requests and scripts)
| Item | Evidence |
|---|---|
| Endpoints | `POST api/V2/FlightSearch/Availability` (page 1), the same URL again for next pages, `POST api/V2/FlightSearch/SelectAvailability`, then the existing `POST api/v2/FlightSearch/FareConfirm` |
| Flow | Availability → (NextAvailability while the wanted booking code is missing and `hasMoreResults` and page < `maxPages`) → SelectAvailability → FareConfirm |
| Availability request | `supplier`, `credentialsSelector`, `searchCriteria[{origin,destination,date}]`, `passengers[{passengerTypeCode,count}]`, `isDebug` |
| Next-page request | `supplier`, `credentialsSelector`, `availabilityId`, `responseId`, `isDebug` (no `searchCriteria`/`passengers`) |
| SelectAvailability request | `supplier`, `credentialsSelector`, `availabilityId`, `responseId`, `bookingClassIds` = `{journeyRefId: {segmentRefId: [bookingClassId]}}` |
| Fields the scripts read from Availability | `availabilityId`, `responseId`, `hasMoreResults`, `originDestinations[].{origin,destination,journeys[].{journeyRefId,segments[].{segmentRefId,cabins[].bookingClasses[].{bookingCode,bookingClassId}}}}` |
| Fields read from SelectAvailability | `responseId`, `offerId` |
| FareConfirm hand-off | body `ResponseId` = SelectAvailability `responseId`, `selectedOfferId` = SelectAvailability `offerId`; script reads `selectedOffer.offerId`, `responseId` |
| Collection defaults | `Supplier_Name=Galileo`, `credentialsSelector=EGY`, `CAI→JED`, `tripType=OneWay`, `daysAhead=30`, `returnDaysAhead=37`, `ADT=2`, `CHD=0`, `INF=1`, `bookingCode=Y`, `maxPages=5` |
| Pre-request behavior | drops passengers with `count` 0; adds a return leg (swapped O/D, date +37) when `tripType=RoundTrip` and the body has one leg; removes `availabilityId`/`responseId` from a first-page body; sends `date` as `YYYY-MM-DDT00:00:00Z` (UTC midnight) |
| Assertions that exist | Availability: 200, JSON, "booking code found" (fails the run if no journey has the code on every segment after `maxPages`). SelectAvailability: 200, non-empty `offerId`. FareConfirm: 200, non-empty `selectedOffer.offerId`. **Nothing checks field mapping, pricing, ordering or error shapes.** |
| Collection defects noticed | Requests point at `{{localUrl}}` = `https://localhost:7194/` (its `baseUrl` is the old `ndc-supplier-integration` host, SPEC's staging host is `ndc-integration-stg-ne-3`). The saved examples on the Availability and SelectAvailability requests are stale **GulfAir V1 Search** responses (original request `api/FlightSearch/Search`), so no real Availability/SelectAvailability response exists anywhere. `isDebug` (camelCase) differs from Search's `isdebug`. An empty `originDestinations` is reported as "booking code not found", not as its own outcome. |

## Requirement mapping

| # | Claim (atomic) | SPEC.md mapping | Status |
|---|---|---|---|
| 1 | The Galileo availability flow is implemented per the documented investigation findings | none (findings doc not available) | Gap |
| 2 | The integration supports the **first-page availability request** | none in §1.2/§2. Request shape resembles §2.1 Search (`searchCriteria`, `passengers`, `supplier`, `credentialsSelector`) | Gap (shape only partially inferable) |
| 3 | The integration supports the **next-page availability request** (`availabilityId` + `responseId`, `hasMoreResults`) | none | Gap |
| 4 | The integration supports the **selection request** (`SelectAvailability`, `bookingClassIds`) | none | Gap |
| 5 | The integration accepts the required business inputs (route, date, pax mix, trip type, debug flag) | §2.1 request fields, §8.3 `passengerTypeCode`, 9-passenger cap (§2.1); round-trip/multi-city are `UNKNOWN` in §2.1 | Partially mapped |
| 6 | Processing steps: page until the wanted booking code is found, select, hand off to FareConfirm | §2.2 FareConfirm (V2 takes `ResponseId` + `selectedOfferId`) and §3.2 hand-off rules; paging and select steps not in SPEC | Partially mapped (FareConfirm only) |
| 7 | Auth and supplier/credential selection (static headers; `supplier`=Galileo, `credentialsSelector`=EGY) | §1.5, §1.7, §4.1 (Galileo: XML, GDS, Travelport, Offer Based + Journey based) | Mapped |
| 8 | Availability information is mapped to the Integration One **common interface** | §2.1 Search response is the nearest interface (`journeys`/`flightSegments`/`offers`), but the availability shape (`originDestinations`/`cabins`/`bookingClasses`) is different | Gap (target interface undefined for availability) |
| 9 | Results are correctly processed and returned (HTTP 200, ids returned) | scripts only; §6.2 generic "200 + parseable JSON + produced IDs present" | Partially mapped |
| 10 | Optional fields are handled | none | Gap |
| 11 | Applicable error scenarios are handled | §2.9 standard envelope `{Status, TransactionId, ErrorCode, ErrorMessage, Context}` confirmed live for TravelportNdc V1 Book only; §7.9 says error shapes are unknown elsewhere | Partially mapped |
| 12 | Galileo capability for availability | §4.6 Galileo row has no availability column; §4.4 flags Galileo as a conflicted-capability supplier | Gap |
| 13 | The flow is validated with the prepared Postman collection | collection exists; localhost-bound, stale examples, shallow assertions (see above) | Partially mapped |
| 14 | Mapped results are "aligned with expected behavior" | expected behavior undefined | Gap |

### Ambiguity pass (7 categories)
- **Functional completeness:** #8 "common interface", #9 "correctly processed", #14 "expected behavior", #11 "applicable error scenarios" name outcomes, not behaviors.
- **Field/data specificity:** `date` format (Availability sends an ISO datetime, Search uses `YYYY-MM-DD`); `isDebug` vs `isdebug`; whether `bookingClassIds` may hold several ids per segment; which response fields are optional.
- **Quantified NFRs:** page size and `maxPages` (a Postman variable, not necessarily an API limit); `availabilityId` lifetime; response-time bound. None stated.
- **Scope/entity naming:** which Galileo identifier(s) (`Galileo` vs `ProdGTWGalileo`); whether these endpoints are Galileo-only or supplier-agnostic; which host.
- **Error-handling detail:** no error codes, HTTP statuses, or message rules for invalid/expired `availabilityId`, foreign `responseId`, unknown `bookingClassIds`, no inventory, supplier timeout.
- **Security specifics:** story says nothing; SPEC §1.5/§7.14 headers and the `isDebug`/`supplierRequest` exposure risk (§7.14) still apply if these endpoints echo supplier payloads.
- **Version/supplier conditionality:** the collection hits V2 only; no V1 equivalent exists or is claimed.

## Resolved questions
**Round 1**
- **Scope (#2–#6):** V2 only. (Initially "Search only, V2 only"; superseded by round 2 once the collection showed the availability endpoints.)
- **Supplier/credentials (#7):** `supplier=Galileo`, `credentialsSelector=EGY`. `ProdGTWGalileo` is **not** in scope.
- **Sources (#1, #13):** The prepared Postman collection is the Galileo availability collection named above; no separate investigation document was supplied.
- **Common interface (#8):** The user chose "SPEC §2.1 Search response" as the reference interface, with errors in the standard envelope and exact codes captured live as baselines. Note the conflict recorded under Open questions: the availability response is not shaped like §2.1.

**Round 2**
- **Endpoints (#2–#6):** Availability (page 1), Availability with `availabilityId` (next page), SelectAvailability, **plus the FareConfirm hand-off**. Classic V2 Search is excluded.
- **Expectations (#9, #14):** Assert the shape the scripts rely on; capture all other behavior (extra fields, error codes, page size) live on the first run and record it as baseline-to-confirm.
- **Scenario dimensions:** the user selected **Round-trip + multi-city** only. The paging boundary sweep, passenger-mix/9-pax sweep and booking-class-selection sweep were **not** selected and are therefore not in the Testable Scope below (basic paging and select positive/negative cases stay, because those endpoints are in scope).
- **Host (#13):** "A different host", **but no URL was given.** Recorded as open.

## Open questions

**Scope/entity naming**
- (#13) **Which host URL** will the cases run against? The collection uses `localhost:7194`; SPEC's staging host is `ndc-integration-stg-ne-3`. Execution cannot start without this. (Test-case writing does not depend on it.)
- (#1) **Where are the investigation findings?** They define the intended request/response mapping; until supplied, mapping cases assert script-inferred fields and baselines only.
- (#12) Are Availability/SelectAvailability Galileo-only or supplier-agnostic endpoints? Affects whether cross-supplier negative cases belong here.

**Field/data specificity**
- (#5) Required `date` format: is `YYYY-MM-DD` accepted, or only the collection's `YYYY-MM-DDT00:00:00Z`? Is a time component honored or ignored?
- (#5) Is the casing `isDebug` required, or is `isdebug` (as on Search) also accepted? What does `isDebug: true` add to the response?
- (#4) Can `bookingClassIds` carry **more than one** class per segment, and more than one journey per origin-destination?
- (#10) Which Availability/SelectAvailability response fields are optional or nullable (e.g. terminals, equipment, `hasMoreResults`)?

**Quantified NFRs**
- (#3) Page size and whether a maximum page count is enforced by the API (the collection's `maxPages=5` is client-side only).
- (#3) `availabilityId`/`responseId` lifetime, and what happens when one expires.

**Error-handling detail**
- (#11) Expected HTTP status and `ErrorCode` for: missing/invalid `availabilityId`, `responseId` from a different search, unknown `bookingClassIds`, no inventory (empty `originDestinations`), supplier timeout. All baseline-to-confirm per the round-2 answer.

**Common interface**
- (#8) The chosen reference (§2.1 Search response) does not match the availability response shape (`originDestinations`/`cabins`/`bookingClasses` vs `journeys`/`flightSegments`/`offers`). Does "common interface" mean the SelectAvailability → FareConfirm output (which is Search-shaped via `selectedOffer`), or a new availability contract? Until answered, mapping assertions cover the script-inferred availability fields plus the FareConfirm `selectedOffer`.

**Version/supplier conditionality**
- (#12) §4.4 flags Galileo as having conflicting capability data; SPEC has no availability column. Does Galileo/EGY expose availability for every route, or only a subset (collection default is CAI→JED; `Supplier Routes.md` lists Galileo test routes HKG-LHR, FRA-JNB, CAI-JED)?

## Flagged SPEC.md gaps
A SPEC.md addition is a separate task (see `update-spec-from-findings`); this analysis does not patch it.
1. **No Availability endpoint** in §1.2 or §2 (#2, #3), and **no SelectAvailability endpoint** (#4). Neither appears in the endpoint table, the §3 integration chain, the §5 flow matrix, or §6 family validation.
2. **No availability response contract** or "common interface" definition (#8, #9, #14).
3. **No availability capability data** for Galileo (§4.2/§4.6 have no column) (#12).
4. **No documented error behavior** for these endpoints (#11); §7.9 already flags error shapes as unknown across the API.
5. **FareConfirm's accepted input ids** are only documented for the Search/Upselling origin (§2.2); that it also accepts a SelectAvailability `responseId`/`offerId` pair is evidenced only by the collection.

## Testable Scope (for generate-test-cases)
- **Endpoint(s):** **flagged out-of-SPEC — needs a SPEC.md addition first** for `POST api/V2/FlightSearch/Availability` (first page and next page) and `POST api/V2/FlightSearch/SelectAvailability`. In SPEC: §2.2 FareConfirm (V2) as the hand-off only.
- **Flow number/range:** no §5.4 flow covers this. Use the collection's own chain (Availability → NextAvailability → SelectAvailability → FareConfirm) as the flow definition; do not map to a numbered flow.
- **Supplier(s):** §4.1 / §4.5 `Galileo`, `credentialsSelector=EGY`, V2 only. `ProdGTWGalileo` excluded.
- **Category emphasis:** positive (one-way, round-trip, multi-city), negative (missing/invalid fields, foreign/stale ids, bad `bookingClassIds`), validation (script-inferred field presence/types, hand-off ids), integration (Availability → Next → Select → FareConfirm id propagation), security (§7.14 headers, `isDebug`, cross-tenant), regression (baseline capture). Expected codes/shapes beyond the script-inferred ones are marked baseline-to-confirm.
- **Out-of-scope / needs SPEC.md first:** classic V1/V2 Search; the paging-boundary sweep (`maxPages`/`hasMoreResults` limits), passenger-mix and 9-pax sweeps, and booking-class-selection variants beyond basic positive/negative (not selected by the user); V1; `ProdGTWGalileo`; downstream Book/Hold/ancillary steps.
- **Execution blockers:** host URL not yet supplied; investigation findings not supplied.
