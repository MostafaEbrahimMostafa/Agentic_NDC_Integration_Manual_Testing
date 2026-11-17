# Implement Oman Air Reissue — Analysis

## Source
`Resources/Re-Issue_Feature/Re-Issue_User_Story.md` (Title: "Implement Oman Air Reissue"), analyzed on 2026-11-17 against `NDC_Integration/SPEC.md` (§ as of this read).

Secondary source: `Resources/Re-Issue_Feature/OmanAir_Reissue_PRD_v0.1.pdf` (v0.1 draft, 2026-11-15, written from the same story). It defines no contract: every path, field and error code is TBD. It is used only to cross-check questions (its OQ-01..OQ-27), not as a source of expected behavior.

Other evidence:
- `Resources/supplier_matrix_template.xlsx - Supplier Feature in Our .md`: `OmanAirV17` Re-Issue = **N/A** (the same for every supplier row).
- `Resources/Supplier Routes.md`: Oman Air routes MCT–DXB, AMD–CAI, AUH–ADL.
- Neither Postman collection (V1, V2) contains any reissue request.

**Headline:** SPEC.md §1.9 and §4.6 state that Refund, Exchange and "PNR modification/re-issue outside the Void/CancelHold terminal actions" are **Not Supported (No Endpoint, any version)**. Every Reissue-specific claim in this story is therefore a SPEC.md **Gap**. Only the surrounding pre- and post-conditions (Book, Retrieve, Void, the error model, headers) map to existing SPEC.md sections.

## Requirement mapping

| # | Claim (atomic) | SPEC.md mapping | Status |
|---|---|---|---|
| 1 | Reissue is implemented for Oman Air | §4.1 `OmanAirV17` (IATA/XML/LCC/Accelya); §4.5 `OmanAirV17`/`OmainAir` name-mismatch bug | Partially mapped. The supplier exists, the capability does not. **Conflict:** the user says Reissue is a common interface, not supplier-specific (see Resolved Q3). |
| 2 | A kick-off meeting with CORE is held before implementation | none | Not testable through the API. It is a process gate (evidence: meeting minutes). |
| 3 | Reissue by **Date** (per segment/direction or whole itinerary) | none | Gap |
| 4 | Reissue by **Destination** (origin and/or destination) | none | Gap |
| 5 | Reissue by **Booking Class** (cabin + RBD, up and down) | none | Gap |
| 6 | Reissue by **Trip Type** | none | Gap. **Conflicts with the resolved answer:** a trip-type change is *not supported* (Resolved Q8). |
| 7 | Criteria can be combined in one reissue | none | Gap |
| 8 | Reissue is per ticket (individual passenger) | §2.11 Retrieve `tickets`, `passengersList` (input data only) | Gap |
| 9 | Passenger Split is supported | none | Gap |
| 10 | Multiple (repeat) reissues "where applicable" | none | Gap; the condition is undecided |
| 11 | A split creates a new PNR, and the reissue result is on the new PNR | none | Gap |
| 12 | PNR linking/updating is handled after a split | none | Gap; the link fields are undecided |
| 13 | Stage 1: Reissue Search | none (§2.1 Search is new-booking only) | Gap |
| 14 | Stage 2: Validation/Review | none | Gap |
| 15 | Stage 3: Reissue (commit), with payment in the request | none | Gap |
| 16 | Supplier reissue-penalty endpoints are integrated | none (backend-internal) | Gap. Only observable through #17. |
| 17 | Applicable penalties are returned | §2.1 `priceClasses.<ref>.rulesAndPenalties` (text) | Partially mapped. The format is confirmed as reused (Resolved Q15); the reissue response location is unknown. |
| 18 | Reissue Action is supported (Integration-layer API that NDCCore calls) | §1.5 `Client-Id: NDC-Core` only | Gap |
| 19 | Reissue Lookup (Reissue PNR lookup) | none | Gap |
| 20 | Booked PNR → Reissue → Reissue PNR lifecycle | §2.9 Book, §2.13 BookAfterHold, §2.11 Retrieve, §5.4 Families A/D (the Booked half) | Partially mapped. The Booked state is testable; the Reissue PNR state/status is a Gap. |
| 21 | Change fee is calculated and included in the reissue amount | §1.10 #4 price-reconciliation pattern only | Gap. The fee is supplier-provided (Resolved Q16). |
| 22 | Discount follows the approved Business Rule | §2.1/§2.8 `discount` field in `passengerFareBreakdown`/`priceDetails` | Partially mapped. The rule is not approved, so the rule itself is **blocked**; only "no discount applied" is testable. |
| 23 | (implied) Only ticketed Booked PNRs are eligible | §2.11 `bookingStatus`, `tickets` | Partially mapped. The eligibility signal exists; the rejection contract is a Gap. |
| 24 | (implied) Errors and auth follow the existing model; Lookup is tenant-scoped | §1.5 headers, §1.7 supplier/selector, §7.9, §7.14 | Partially mapped. The model is known; reissue-specific codes are not. |
| 25 | (implied) A reissued ticket can be voided | §2.15 Void; §4.6 Oman Air Void = Supported | Partially mapped. Void on a reissued ticket is new behavior. |

## Resolved questions
Answers given by the user on 2026-11-17.

**Scope and entity naming**
- **Q1 — Contract (#13–19):** A Reissue API contract **exists**, but it is **not available** to QA yet. Field-level and error-code checks stay pending until it is shared.
- **Q2 — Version (#13–19):** **V2 only.**
- **Q3 — Supplier (#1):** Reissue is a **common interface**, not tied to one supplier. The supplier(s) for the first test round are **not decided** (see Open Questions). This contradicts the story's title and description ("Oman Air"); see Flagged conflicts.
- **Q4 — NDCCore (#18, #19):** **Integration layer only.** QA tests the Integration-layer endpoints that NDCCore calls, not NDCCore itself.

**Functional completeness**
- **Q5 — Date (#3):** Both are supported: a single segment/direction **or** the whole itinerary.
- **Q6 — Destination (#4):** **Origin and destination** can both change.
- **Q7 — Booking Class (#5):** Cabin **and** RBD changes, **upgrade and downgrade**.
- **Q8 — Trip Type (#6):** **A journey-type change is not supported.**
- **Q9 — Combinations (#7):** **Allowed** (any mix of the supported criteria in one reissue).
- **Q11 — Whole-PNR reissue (#20):** The result is a **new Reissue PNR**, even without a split.
- **Q12 — Split rules (#9):** **An infant moves with its adult.** An infant cannot be split alone; a child can.
- **Q13 — Eligibility (#23):** **Ticketed Booked PNRs only.** Held, voided, cancelled and partly flown bookings are rejected.

**Field/data specificity**
- **Q15 — Penalties (#17):** Returned in the existing **`rulesAndPenalties` text format** (as in `Penalty Rule: (PenaltyType => Exchange), (PenaltyApplicability => Before), ...`).
- **Q16 — Change fee (#21):** **Supplier-provided.**
- **Q17 — Discount (#22):** **Not approved yet.** Only the "no discount applied" behavior is testable.
- **Q18 — Payment (#15):** The **form of payment is sent in the Reissue request.**

**Error handling and security**
- **Q20 — Errors (#24):** Follow the **existing error model**: 400 for request validation, 409 for business or supplier conflicts (`OperationNotSupported`, `NDC-INT-UNC-Z9999`), 401 for authentication.
- **Q21 — Security (#19, #24):** **Enforce both.** Return 401 on missing or invalid `x-api-key`/`Client-Id`, and return no data on a lookup under a different `credentialsSelector` (unlike Retrieve today, defects D1/D2).

**Version / environment**
- **Q22a — Void after reissue (#25):** A reissued ticket **is voidable** (within the void window).
- **Q22b — Test environment:** Staging tickets **can be reissued repeatedly**; **clean up with Void**.

## Open questions

**Scope/entity naming**
- (#1) Which supplier(s) should the first test round target? Reissue is a common interface, but the story names Oman Air, and every supplier row in the matrix shows Re-Issue = N/A.
- (#1) Which `supplier` enum value (`OmanAirV17` vs `OmainAir`), which `credentialsSelector` and which ne-N host carry the build?
- (#13–19) When will the contract (paths, request/response fields) be shared with QA?

**Functional completeness**
- (#10) What makes a repeat reissue "applicable": fare rules, a maximum count or a time limit? (Undecided.)
- (#9, #12) What is the recovery behavior when the split succeeds but the reissue on the new PNR fails: rollback, or a consistent linked state with the original ticket still valid?
- (#14, #15) If the supplier price changes between Review and Reissue, is the commit rejected (new Review required) or re-confirmed?
- (#15) Is the commit idempotent per review id, so that a double submit does not issue a second ticket?
- (#3, #4) What happens when the requested itinerary equals the original: rejected, or no options returned?

**Field/data specificity**
- (#12, #20) Which response fields expose the original ↔ new PNR link? Which `bookingStatus` value does Retrieve show for a Reissue PNR? (Undecided.)
- (#17) Where in the V2 reissue responses does the `rulesAndPenalties` text appear (Search options, Review, or both)?
- (#21) Residual value: how is a lower new fare handled (forfeit, refund, EMD)? (Undecided.)
- (#21) Is the supplier-provided change fee shown as its own line, and in which currency? Does the breakdown reconcile (components = total)?
- (#15) What are the payment fields' names and accepted forms of payment?

**Quantified NFRs**
- (#14, #15) How long is a Review result valid before Reissue? Is there a response-time target? (Undecided.)
- (#3) Is there a supplier cut-off before departure for date changes?

**Error-handling detail**
- (#24) What are the reissue-specific error codes within the existing model (ineligible booking, unsupported change type, trip-type change attempted, infant split alone, stale/foreign review id, expired review, payment failure)?

**Version/supplier conditionality**
- (#1, #25) Once other suppliers implement the common interface, which capability flag will gate Reissue (supplier matrix / `suppliers.json`)? The `OmanAirV17`/`OmainAir` name mismatch (PRD Gap #12) affects that lookup.

## Flagged conflicts (story vs. answers)
These need the story or PRD updated by its owner; this analysis does not edit them.
1. **Supplier scope:** the story says "Implement Reissue for Oman Air"; the answer says Reissue is a common, supplier-agnostic interface.
2. **Trip Type:** AC 2 requires reissue by Trip Type; the answer says a journey-type change is not supported. Test cases will treat a trip-type change as a **negative case** (expect rejection) unless the story owner restores it.
3. **Whole-PNR result:** the PRD draft left "same PNR vs. new Reissue PNR" open; the answer fixes it as a **new Reissue PNR** in every case.

## Flagged SPEC.md gaps
A SPEC.md addition is a separate task and is not made here.
- §1.2 / §1.4: there are no Reissue endpoints (Search, Validation/Review, Reissue, Lookup) in the V2 endpoint table.
- §1.9 / §4.6: these still state Exchange/re-issue = "Not Supported (No Endpoint, any version)". They need updating once the V2 endpoints exist.
- §2: there are no endpoint specifications (request fields, response shape, penalties, change fee, payment, link fields, error codes) for the four reissue endpoints.
- §2.11: no `bookingStatus` value and no link fields for a Reissue PNR or split PNR.
- §2.15: Void on a reissued ticket is not documented (now confirmed allowed).
- §3: there is no Booked → Reissue Search → Review → Reissue → Retrieve/Lookup chain in the integration diagram or ID lifecycle table (§3.1–§3.3).
- §4.2 / §4.6: no Reissue capability column for any supplier.
- §5 / §6: no reissue flows or per-family expected states (new family needed, e.g. `...Book-Retrieve-Reissue-Retrieve`).

## Testable Scope (for generate-test-cases)
- **Endpoint(s):**
  - Reissue Search, Reissue Validation/Review, Reissue (commit), Reissue Lookup (V2): **flagged out-of-SPEC — needs a SPEC.md addition first.** The contract exists but isn't shared, so cases can be drafted at the behavior level (resolved rules above) with field names marked TBD, and field-level assertions marked BLOCKED.
  - Existing endpoints used as preconditions/verification: §2.9 Book (V2), §2.13 BookAfterHold (V2), §2.11 Retrieve (V2), §2.15 Void (V2, also cleanup).
- **Flow number/range:** §5.4 V2 Family A (`...Book-Retrieve`) and Family D (`...BookAfterHold-Retrieve`) as the arrange chains. Family C (`...Book-Retrieve-Void`) for cleanup and Void-after-reissue. The reissue extension of these chains is out-of-SPEC.
- **Supplier(s):** **Not decided.** The story names Oman Air (`OmanAirV17`, routes MCT–DXB / AMD–CAI / AUH–ADL), but Reissue is a common interface. Per the supplier-only scope rule, cross-supplier rows stay BLOCKED until a supplier list is agreed.
- **Category emphasis:**
  - Business-rule: date (segment and whole itinerary), origin/destination, cabin + RBD up/down, combinations, per-ticket reissue, split → new PNR, infant moves with its adult, whole-PNR → new Reissue PNR, ticketed Booked only, repeat reissue (condition TBD).
  - Negative: trip-type change, held/voided/cancelled/partly flown booking, infant split alone, commit without Review, foreign or stale review id, mismatched `supplier`/`credentialsSelector`.
  - Validation: 400 on missing/invalid fields, including payment.
  - Security: 401 on bad headers, Lookup tenant scoping.
  - Integration/E2E: Book → Reissue → Retrieve/Lookup, split → both PNRs, repeat reissue, Void after reissue.
  - Pricing: supplier change fee and `rulesAndPenalties` penalty present; no discount applied.
  - Regression: existing V2 Book/Hold/Retrieve/Void unchanged.
- **Out-of-scope / blocked:** the CORE kick-off (process gate); NDCCore itself; V1; discount rule logic (not approved); residual-value handling, link fields, Reissue PNR `bookingStatus`, Review validity, split-failure recovery and the repeat-reissue condition (undecided); every field-level assertion until the contract is shared.
