# SharedFlights — Analysis

## Source
`Resources/SharedFlights.md`, analyzed against `NDC_Integration/SPEC.md` (§ as of this read, 2026-10-07).

## Requirement mapping

| # | Claim (atomic) | SPEC.md mapping | Status |
|---|---|---|---|
| 1 | A flag exists at segment level indicating bookable / non-bookable | §2.1 / §2.2 `flightSegments{}` documents the segment object, but lists no such flag | Gap |
| 2 | The eligible segment is marked `HasSeat` | none (no `HasSeat` anywhere in SPEC.md) | Gap |
| 3 | The shared segment operated by another airline is marked non-bookable | §2.1 `operatingCarrierCode` / `marketingCarrierCode` exist (mechanism for detecting "operated by another airline") | Partially mapped |
| 4 | Only bookable segments may proceed to booking | §2.9 Book / §2.10 Hold exist, but neither documents segment-level eligibility | Partially mapped |
| 5 | Non-bookable segments are excluded from the booking process | §2.9 / §2.10 / §2.11 Retrieve (mechanism only) | Partially mapped |

## Resolved questions
- **Flag scope (AC1):** V2 only. V1 is out of scope, so V1 should be unchanged (no flag, no new rejection).
- **Flag semantics (AC2/AC3):** one field. `HasSeat` = true means bookable, `HasSeat` = false means non-bookable.
- **Shared-segment identification (AC2/AC3):** a segment is the shared/non-bookable one when its operating carrier differs from its marketing carrier (`operatingCarrierCode != marketingCarrierCode`).
- **Exclusion behavior (AC4/AC5):** Book/Hold with a non-bookable segment is rejected with a 4xx error.

## Open questions

**Field/data specificity**
- (#1, #2) The exact JSON field name and casing. Is it literally `HasSeat`, or `hasSeat`? SPEC.md V2 uses camelCase for response fields.
- (#1) The user confirmed V2 only, but not the response location. Is the flag on `flightSegments{}` entries in Search and FareConfirm, in Upselling too, or elsewhere? Is it present on every segment (true and false), or only on shared flights?

**Scope/entity naming**
- (#3) Which suppliers return shared flights? SPEC.md has no per-supplier shared-flight data.
- (#3) Is the flag value derived from the carrier-code rule, or is the carrier-code rule only how a tester identifies shared flights? If a supplier returns equal codes but HasSeat=false (or the reverse), which one wins?

**Error-handling detail**
- (#4) The exact 4xx status code, error envelope and message for rejection. Does it match the existing `OperationNotSupported` envelope (§2.4, which was a 409) or a validation-style 400?
- (#4) Which endpoints enforce it: Book, Hold, BookAfterHold, SeatAfterHold? And how does the caller indicate which segments to book? Book/Hold bodies in V2 reference `selectedOfferId`, not segments.
- (#5) For a mixed offer (one bookable segment plus one shared), is the whole offer rejected, or booked with only the HasSeat segment? "Excluded from the booking process" and "reject with 4xx" pull in different directions here.
- (#5) Must Retrieve show only the bookable segment, or both segments with the non-bookable one flagged?
- Is pricing in Search/FareConfirm affected? Does the total cover only the bookable segment?

**Version/supplier conditionality**
- Does the rule apply to both direct-Book and Hold flow families (§5.2)?

## Flagged SPEC.md gaps
A SPEC.md addition is a separate task and is not made here.
- No segment-level bookable flag or `HasSeat` field in §2.1/§2.2 response mapping.
- No shared-flight / codeshare concept anywhere in §2, §4 or §6.
- No segment-eligibility validation rule in §2.9/§2.10 or §6.
- No error contract for rejecting non-bookable segments (§2.9, §7.9).

## Testable Scope (for generate-test-cases)
- Endpoint(s): V2 Search §2.1, V2 FareConfirm §2.2 (flag presence/values on `flightSegments`); V2 Book §2.9 and V2 Hold §2.10 (rejection of non-bookable segments); V2 Retrieve §2.11 (exclusion check, pending open question).
- Flow number/range: V2 flows from §5.4 that use direct Book and Hold with no enrichment, to be selected at generation time. V1 flows only as a regression check that nothing changed.
- Supplier(s): not determined (open question); needs a supplier that returns shared flights.
- Category emphasis: positive (HasSeat=true segment books), negative (HasSeat=false segment rejected with 4xx), business-rule (operating vs marketing carrier consistency), regression (V1 unchanged), integration (Search→FareConfirm→Book/Hold flag propagation).
- Out-of-scope / needs SPEC.md first: the flag field itself, the shared-flight concept, the rejection error contract, and the mixed-offer behavior are flagged out-of-SPEC. Test cases for these must be written as `UNKNOWN`/to-confirm-live and not assert exact values until the open questions are answered.
