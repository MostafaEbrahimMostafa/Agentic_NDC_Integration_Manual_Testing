# Test case template and worked examples

Reference material for the `generate-test-cases` skill. Match this shape and level of detail; don't
copy the specifics.

**Two things must match exactly what the project actually produces and consumes** — verified against
`NDC_Integration/TestCases/TestCases_V1.csv` / `TestCases_V2.csv` (the real, currently-in-use
deliverables, rendered onward by `ConvertTo-Html.ps1` into the stakeholder-facing HTML report) and
`references/Sample_Test_Cases.md` (a real export of this team's Azure DevOps Test Case work items,
showing the house title convention). Generating a differently-shaped file or a differently-styled
title produces something nobody downstream can use.

## Output row schema (CSV, one row per case)

Column order, exactly as `ConvertTo-Html.ps1` expects it:

`ID, RowType, Version, Scope, Category, Title, Priority, Risk, Capabilities / Test Data,
Preconditions, Steps / Endpoint Chain, Expected Result, SpecReference, Notes, Status`

- `RowType` = `Flow` (flow-level case) or `EndpointTestCase` (endpoint-level case). The HTML converter
  splits its two report sections on this value verbatim — don't invent a third value.
- `Status` = `Not Run` for every newly generated case (execution status is out of this skill's scope —
  see `execute-test-cases`).
- `Risk` = `High` / `Medium` / `Low` / a hyphenated blend already seen in practice (`Low-Med`) — pick
  the closest single word when unsure; don't invent new risk vocabulary.
- All other columns map 1:1 to the Field list below.

## ID scheme

- **Endpoint-level** (`RowType: EndpointTestCase`): `TC-<SCOPE>-<CATEGORY>-<seq>`
  - `SCOPE` = endpoint short name (`SEARCH`, `FARECONFIRM`, `UPSELL`, `BUNDLE`, `ADDPAX`, `ANCILLARY`,
    `SEATMAP`, `FARECHECK`, `BOOK`, `HOLD`, `RETRIEVE`, `FCAH`, `BOOKAFTERHOLD`, `CANCELHOLD`, `VOID`)
    or a capability-confirmation scope (`CAPCHECK-<Supplier>`).
  - `CATEGORY` = `POS` (positive), `NEG` (negative), `BND` (boundary), `VAL` (validation), `BIZ`
    (business rule), `SEC` (security), `INT` (integration), `REG` (regression).
  - `seq` = zero-padded 2-digit sequence within that scope+category.
  - Examples: `TC-SEARCH-NEG-01`, `TC-BOOK-SEC-02`, `TC-CAPCHECK-GLC-01`.
- **Flow-level** (`RowType: Flow`): `FLOW-<Version>-<NN>` where `NN` is the flow's own zero-padded
  number from SPEC.md §5.4 (not a per-scope sequence) — this is what the existing CSVs actually use,
  e.g. `FLOW-V1-01` for flow #1, `FLOW-V2-43` for flow #43. Negative hop-variants of a flow append a
  third segment: `FLOW-V2-43-NEGHOP3` (fault injected at hop 3).

## Title naming convention (house style — see `Sample_Test_Cases.md`)

The `Title` column is what actually lands as the Azure DevOps Test Case work-item title, so it must
match the convention already used across hundreds of real entries in
[Sample_Test_Cases.md](Sample_Test_Cases.md), not free-form prose:

```
[<Scope-tag>][<Request|Response>] <Verb> <condition under test>.
```

- `Scope-tag` = the endpoint/module short name (`Search`, `FareConfirm`, `FlightBook`, `Book or hold`)
  or, for a supplier-specific case, the supplier name (`[FlyAdeal][FlightSearch] Verify ...`). Two
  tags may be chained when a case spans endpoints: `[Search]&[FareConfirm]&[Book] [Response] ...`.
- `Request|Response` = which side of the contract this case is validating — omit only when the case is
  genuinely about neither (e.g. a pure flow-chain title).
- `Verb` — pick by what's being asserted, not by habit (the historical suite mixes these inconsistently;
  don't perpetuate that):
  - **Validate** — a request-construction/input rule (what must be sent, field format, mandatory
    fields, boundary limits).
  - **Verify** — an observed response, state, or behavior (what came back, what the system did).
- No trailing brackets, no adjacent double-spacing, no meta-commentary appended to the title (the
  sample has real accumulated cruft like `# Duplicated (Need to be removed)` — that's cleanup debt to
  avoid reproducing, not a pattern to follow; if a case notes an ambiguity or anomaly, put it in
  `Notes`, never in `Title`).
- Before finalizing a batch of titles, skim them against each other (and, where feasible, against
  `Sample_Test_Cases.md`) for near-duplicates — the historical suite shows what un-caught duplication
  looks like after it accumulates.

Examples pulled from real entries: `[Search] [Request] Check for Missing "credentialsSelector" Field.`,
`[Book or hold][Request] Validate mandatory and data type of "fareConfirmResponseId" field.`,
`[FlyAdeal][FlightSearch] Verify response when origin and destination are the same`.

## Field list (per case)

| Field | Notes |
|---|---|
| ID | Per the ID scheme above. |
| Title | Per the naming convention above — states the condition under test, tagged by scope and side. |
| Category | One of the eight from SPEC.md §8.1/§8.2. |
| SpecReference | Section(s) this case is derived from — e.g. `§2.1`, `§5.4 #43`, `§4.4`. |
| Version | V1 / V2 / Both. |
| Priority | High/Medium/Low, per SPEC.md §8.4's ordering (defects+security first, smoke second, capability-conflict confirmations third, etc.). |
| Risk | High/Medium/Low (or a hyphenated blend already in use, e.g. `Low-Med`) — impact if this case's assertion silently fails in production. |
| Preconditions | Supplier/credentialsSelector chosen and capability-confirmed (§4.7) if needed; environment; any required prior state (e.g. a live `pnr` from a prior Hold). |
| Capabilities / Test Data | Concrete request body/fields — reuse the collections' saved example values as a base (§2.*n*) and state exactly what's changed for this case; for flow rows, the capability(ies) the flow exercises (`Hold`, `Bundle`, `Void`, ...). |
| Steps / Endpoint Chain | Numbered steps (endpoint-level) or an arrow-chained endpoint sequence (flow-level, e.g. `Search -> FareConfirm -> Book -> Retrieve`). |
| Expected Result | Concrete: status code (or `UNKNOWN — confirm live` if SPEC.md marks it so, per §7.9), response fields/values, per §2.*n* Response Validation Rules or §6.3/§6.4 state checks. |
| Notes | Postcondition/cleanup (e.g. "leaves a live Held booking — log `pnr` per §6.3 Family B test-hygiene note"), flagged anomalies (§5.5), or any ambiguity the executor should see rather than have silently resolved. |
| Status | Always `Not Run` for newly generated cases. |

## Worked example 1 — endpoint-level negative case

**TC-SEARCH-NEG-03**
- **RowType**: EndpointTestCase
- **Title**: `[Search][Request] Validate total passenger count of 10 (one over the confirmed 9-passenger maximum) is rejected.`
- **Category**: Negative / Boundary (dual-tagged — this is the primary boundary case for the rule in §2.1)
- **SpecReference**: §2.1 Request Rules/Validation ("Total passenger count ... must not exceed 9")
- **Version**: Both (V1 and V2 Search)
- **Priority**: High (confirmed business rule, currently `UNKNOWN` enforcement point — first-round exploratory per §7.9)
- **Risk**: High (an unenforced passenger cap is a pricing/inventory integrity risk, not just a validation nicety)
- **Preconditions**: Valid `Supplier_Name`/`Credentials_Selector` pair confirmed reachable via a prior plain Search.
- **Capabilities / Test Data**: Same body shape as the collection's saved Search request, with `passengers` set to
  `[{"passengerTypeCode":"ADT","count":8},{"passengerTypeCode":"CHD","count":1},{"passengerTypeCode":"INF","count":1}]`
  (10 total).
- **Steps / Endpoint Chain**:
  1. POST the Search request (V1: `api/FlightSearch/Search`; V2: `api/V2/FlightSearch/Search`) with the above body.
  2. Record the raw status code and response body.
- **Expected Result**: Request is rejected (`UNKNOWN` exact status — confirm live and record it; do not assume 400 without evidence). If accepted, that is itself a defect to report against the confirmed 9-passenger rule.
- **Notes**: No booking created, nothing to clean up. Feed the confirmed status code back into SPEC.md §2.1 once observed.
- **Status**: Not Run

CSV row: `"TC-SEARCH-NEG-03","EndpointTestCase","Both","Search","Negative","[Search][Request] Validate total passenger count of 10 (one over the confirmed 9-passenger maximum) is rejected.","High","High","passengers: 8 ADT + 1 CHD + 1 INF (10 total)","Valid Supplier_Name/Credentials_Selector pair confirmed reachable via a prior plain Search","1. POST Search with the above body 2. Record raw status + body","Request rejected (UNKNOWN exact status - confirm live); acceptance is itself a defect against the confirmed 9-passenger rule","§2.1","No booking created; feed confirmed status back into SPEC.md §2.1 once observed","Not Run"`

## Worked example 2 — flow-level positive case

**FLOW-V2-43**
- **RowType**: Flow
- **Title**: `[Flow 43][Response] Verify Search-to-Retrieve completes for a Bundle+Ancillary-capable supplier (FareConfirm + Bundle + Ancillary, Family A).`
- **Category**: End-to-End (Positive, full chain)
- **SpecReference**: §5.4 row #43; §6.3 Family A; §6.4 BDL and ANC additions; §2.1–§2.9, §2.4–§2.6, §2.8 for the individual hops
- **Version**: V2
- **Priority**: Medium (per §8.4 item 5 — full flow matrix, after smoke/defect/capability-conflict priorities)
- **Risk**: High (Family A finalizes a real booking with bundle + ancillary pricing composed across four endpoints — the highest-surface-area chain for a silent price/state drift)
- **Preconditions**: Supplier confirmed live-capable for both Bundle and Ancillary per §4.7 (e.g. run against a supplier not in the §4.4 conflict list first, such as `FlyNas` for Bundle — cross-check Ancillary support separately, since FlyNas's ancillary support is confirmed full per §4.6).
- **Capabilities / Test Data**: Bundle, Ancillary. Chained IDs only — no fixed values; each step's IDs come from the previous step's response per §6.2's propagation table.
- **Steps / Endpoint Chain**: `Search -> FareConfirm -> GetOfferBundles -> AddPassenger -> GetAncillary -> FareCheck -> Book -> Retrieve`
  1. Search → capture `searchResponseId`, `offerId`.
  2. FareConfirm → capture `fareConfirmResponseId`, `selectedOfferId`; assert `haveBundles: true` and `offerHasAncillary: true` (§2.2) before proceeding — if either is false, stop and report a capability mismatch rather than forcing the chain.
  3. GetOfferBundles → select a bundle code.
  4. AddPassenger → capture `getAddPaxOfferId`, `getAddPaxResponceID` (note the collection's own typo'd variable name, §2.5).
  5. GetAncillary → capture `ANCofferId`, `ANCresponseId`; check `isFareCheckRequired` (§2.6).
  6. FareCheck → select ancillary code(s) from step 5's catalog; capture `fareCheckOfferId`.
  7. Book → assert price reconciliation (§2.1 formula) against FareCheck's re-priced total, not the pre-ancillary FareConfirm total (§6.4 FCK note).
  8. Retrieve → assert `bookingStatus` = booked/confirmed; assert `passengersSelectedAncillaries` matches step 6's selections exactly (§6.4 ANC note); assert bundle-included services aren't double-charged as separate ancillary lines (§6.4 BDL note).
- **Expected Result**: All eight steps return 200 with the field-level assertions above holding; final Retrieve reflects a fully booked, correctly-priced, ancillary-and-bundle-consistent state.
- **Notes**: Booking is finalized (not held) — no cleanup required, but log the `pnr` if the team wants to void it for environment hygiene.
- **Status**: Not Run

## Worked example 3 — endpoint-level cross-field consistency case (senior-QC addendum pattern)

This is the kind of case the historical suite (`Sample_Test_Cases.md`) is full of that SPEC.md §8.1's
recipe doesn't call out by name — the response must echo the request's own values back unchanged, not
just be schema-valid. File it under **Validation**, since it derives from a Request/Response
round-trip rule rather than a value range or a security boundary.

**TC-SEARCH-VAL-04**
- **RowType**: EndpointTestCase
- **Title**: `[Search][Response] Verify supplier name and credentialsSelector in the response match what was sent in the request.`
- **Category**: Validation (request/response echo-consistency)
- **SpecReference**: §2.1 Response Validation Rules; §7.11 Data Validation
- **Version**: Both
- **Priority**: Medium
- **Risk**: Medium (a silent echo mismatch would misattribute offers to the wrong supplier/credentials downstream — FareConfirm, Book — without ever surfacing as an error)
- **Preconditions**: Valid `Supplier_Name`/`Credentials_Selector` pair confirmed reachable via a prior plain Search.
- **Capabilities / Test Data**: Standard saved Search request body; note the exact `supplier` and `credentialsSelector` values sent.
- **Steps / Endpoint Chain**:
  1. POST the Search request with a specific, known `supplier`/`credentialsSelector` pair.
  2. Compare the response's echoed `supplier`/`credentialsSelector` fields against what was sent, field-for-field (not just presence).
- **Expected Result**: Response values are byte-identical to the request values; no case-folding, truncation, or default-substitution.
- **Notes**: If a mismatch is found, treat it as a defect against §2.1, not an `UNKNOWN` to shrug off — this is exactly the class of bug the historical suite (`Sample_Test_Cases.md` #7811/#7812) was written to catch.
- **Status**: Not Run
