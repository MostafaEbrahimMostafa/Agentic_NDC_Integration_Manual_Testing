# Domain Glossary

Plain definitions for the words used in tickets, test cases and reports. Where SPEC.md defines the
contract, the SPEC section is linked; this file does not restate field rules.

## Airline / travel terms

| Term | Meaning in this project | SPEC |
|---|---|---|
| **NDC** | New Distribution Capability, the IATA XML/JSON standard airlines use to sell offers directly. Here also the name of the API under test, which hides NDC, EDIFACT, Navitaire and GDS protocols behind one JSON contract. | §1.1, §1.3 |
| **GDS** | Global Distribution System (Amadeus, Sabre, Galileo/Travelport). A supplier that resells many airlines. | §4.1 |
| **Supplier** | The back end the API routes to, chosen by the `supplier` body field (e.g. `SabreNdc`, `Galileo`, `AirArabiaPlus`). Name matching is case-insensitive but spelling-exact. | §1.7 |
| **Carrier** | The airline that flies or markets the segment (2-letter code: QR, EK, MS, G9...). One supplier can serve several carriers. | — |
| **credentialsSelector** (selector) | Which credential/region set the supplier uses (`UAE`, `EGY`, `KSA`, `USA`). A supplier can be active under one selector and inactive (400) under another. | §1.7 |
| **Offer** | One priced option returned by Search (journeys + fare + flags). Identified by `offerId`. | §2.1 |
| **Journey / Segment** | Journey = one direction (OD); segment = one flight leg inside it. Connecting journey = 2+ segments. | §2.1 |
| **OW / RT / MC** | One-way, round-trip, multi-city. `OWC`/`RTC` = with a connection. | — |
| **PTC** | Passenger type code: `ADT` adult, `CHD` child, `INF` infant (on an adult's lap). | §2.5 |
| **ParentPaxRefId** | Links an infant to the adult who carries it. | §2.5 |
| **RBD / booking class** | Reservation booking designator, the one-letter fare class (Y, P, N...). | §2.1 |
| **PNR** | Passenger Name Record, the booking reference. `pnr` is the API's locator, `gdsPNR` the supplier/GDS locator; they may be equal or differ. | §2.9, §3.3 |
| **bookingToken** | Opaque token returned on Book/Hold; required with the PNR for later calls. | §3.3 |
| **Ticket / ticketing** | Issuing the e-ticket that makes the booking paid and final. Book tickets; Hold does not. | §2.9 |
| **EMD** | Electronic Miscellaneous Document, the "ticket" for paid ancillaries (bags, seats). | §2.15 |
| **Ancillary** | Extra service: baggage, meal, seat, other. V2 only (`GetAncillary`). | §2.6 |
| **Bundle** | A fare family package (e.g. "Value", "Ultimate") that adds services for one price. `GetOfferBundles`, then `selectedBundles`. | §2.4 |
| **Upsell** | Offer a higher fare family for the same flights (`Upselling`). | §2.3 |
| **Seat map / cellId / cellCode** | V2 seat layout; a chosen seat is sent as `{cellCode, cellId}`. | §2.7 |
| **PADIS seat characteristic** | Industry code on a seat (E exit row, K bulkhead...). Infant-carrying adults may not sit in E/K seats. | `Resources/SeatResources/` |
| **Hold** | Reserve seats without paying/ticketing. Has an expiry (`holdExpirationDate`). | §2.10 |
| **FareConfirmAfterHold / PnrReprice** | Re-price a held booking before paying. | §2.12 |
| **BookAfterHold** | Pay and ticket a held booking. | §2.13 |
| **CancelAfterHold / CancelHold** | Release a hold without ticketing. | §2.14 |
| **Void** | Cancel a *ticketed* booking inside the void window (usually same day) with no penalty. | §2.15 |
| **voidCapability** | Field saying whether Void is allowed: `FullVoidOnlyAllowed` or `VoidNotAllowed` (only these two are valid; `"None"` is a known defect). | §2.9, §2.15 |
| **Re-Issue** | Change a ticketed booking (date/route) and issue a new ticket. Not in the current API; test cases are in `TestCases/Reissue/`. | §1.9 |
| **Refund / Exchange** | Not implemented in either API version. | §1.9 |
| **FOP** | Form of payment. Ticketing fails if the supplier account's FOP is not authorized for the carrier. | — |
| **TA limit** | Travel-agency session cap at a supplier (Sabre `ReachedTALimit`). | — |

## API / QA terms

| Term | Meaning |
|---|---|
| **V1 / V2** | Two separate API contracts chosen by URL path. V2 adds AddPassenger, ancillaries, seat maps, FareCheck. Not interchangeable. SPEC §1.4. |
| **Flow** | A numbered endpoint chain (1-89) gated by supplier capability. SPEC §5.4. |
| **Family A-F** | The terminal state a flow ends in (Book, Hold, Void, BookAfterHold, Cancel...). SPEC §5.2. |
| **Enrichment** | Optional V2 steps between FareConfirm and Book: bundle, ancillary, seat map, FareCheck. SPEC §5.3. |
| **ResponseId** | Id of the previous step's response that the next call must carry. Several suppliers do not validate it (known defect pattern). |
| **isDebug** | Request flag that adds raw supplier payloads to the response. Those payloads can contain credentials: never commit them. |
| **Error envelope** | Shape of an error body. Two coexist: camelCase `1001` (binding/validation) and PascalCase `NDC-INT-*` (business). `NDC-INT-UNC-Z9999` = unmapped supplier error. See [../03_Technical/Architecture.md](../03_Technical/Architecture.md). |
| **OperationNotSupported** | 409 returned when the supplier adapter has no implementation for that endpoint. |
| **Run / slug** | One execution session; its slug names every artifact (`Logs/<slug>.*`, `BugReports/<slug>/`). |
| **Round** | A repeat of the same suite on a later build, compared with the previous round. |
| **PASS / FAIL / BLOCKED** | BLOCKED = could not run (no inventory, unsupported op, out of scope, needs overnight/expiry). Never count BLOCKED as PASS. |
| **UNKNOWN / INFERRED / LIVE-CONFIRMED** | Source labels for an expectation: not known / reasoned but unconfirmed / observed live. |
| **Leftovers / Cleanup** | Live holds or bookings a run did not cancel; always listed in the report. |
| **Golden rule** | Nothing is guessed. |
