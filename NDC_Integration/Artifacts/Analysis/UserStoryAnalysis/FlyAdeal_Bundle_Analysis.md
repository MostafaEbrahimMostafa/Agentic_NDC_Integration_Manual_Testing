# FlyAdeal Bundle Coverage — Analysis

## Source
No dedicated user-story file exists for this scope. Analyzed directly against `NDC_Integration/SPEC.md`
§2.4 (GetOfferBundles contract), §4.1/§4.2/§4.3/§4.6 (FlyAdeal capability + commercial-blacklist rows),
and `NDC_Integration/Resources/Supplier Routes.md` (FlyAdeal's documented routes).

Request scope: Supplier `FlyAdeal`, Credentials Selector `EGY`, target host
`https://ndc-supplier-integration.azurewebsites.net/` (explicitly requested as-is — flagged to the user
as SPEC.md §1.6's stale/unmaintained V1-only fallback host, distinct from the current documented staging
host `https://ndc-integration-stg-ne-3.azurewebsites.net/`; user confirmed proceeding with the given host).

## Requirement mapping

| # | Claim (atomic) | SPEC.md mapping | Status |
|---|---|---|---|
| 1 | GetOfferBundles retrieves bundle options for a confirmed offer, V1 (`api/bundles/GetOfferBundles`) and V2 (`api/V2/bundles/GetOfferBundles`) | §2.4 | Mapped |
| 2 | Must follow FareConfirm (or Upselling); requires `fareConfirmResponseId`/`selectedOfferId` (V1) or `ResponseId`/`selectedOfferId` (V2) | §2.4, §2.2, §2.3 | Mapped |
| 3 | For an offer with `haveBundles=false`, returns HTTP 409 with `OperationNotSupported` envelope | §2.4 Business Logic | Partially mapped — confirmed live only for TravelportNdc (bundle-*incapable*); never confirmed live for a bundle-*capable* supplier like FlyAdeal |
| 4 | FlyAdeal supports Bundle | §4.6 (Supported), §4.2 (Yes) | Mapped, but static-doc-only — no live confirmation exists for FlyAdeal specifically (§4.2's reading note: cross-source, not live-verified) |
| 5 | Success response shape: `offerJourneys` keyed by segmentRefId, `bundleChoices` keyed by bundleCode, `includedServices` mixes enum tags + free-text | §2.4 Expected Success Response | Mapped (V2 observed example) — no V1 example captured |
| 6 | `bundleChoices` keys ⊆ `offerJourneys.*.bundleReferences`; `bundlePrices` has one entry per passenger type present | §2.4 Response Validation Rules | Mapped |
| 7 | `JourneyKey1` script bug: reads `resp.offerJourneys.key`, which doesn't exist on the real map-shaped response → always `undefined` | §2.4 Response Mapping | Mapped — known, evidenced defect; worth its own isolated confirmation test regardless of supplier |
| 8 | Chosen bundle code must be threaded manually into next step's `selectedBundles[]` | §2.4 IDs Generated/Required | Partially mapped — the *mechanism* (a `selectedBundles` array on Book/Hold) is documented, but its exact object shape is `UNKNOWN` (no non-empty example in either collection) |
| 9 | FlyAdeal is commercially blacklisted (LCC) for booking/ticketing in production credentials | §4.3 | Mapped — but this gates **Book**, not GetOfferBundles/Search/FareConfirm (§1.8: blacklist is a business gate on booking, independent of technical capability) |
| 10 | credentialsSelector `EGY` for FlyAdeal | Not present anywhere in SPEC.md or Supplier Routes.md | Gap — FlyAdeal's only documented routes are Saudi-domestic (JED-RUH, RUH-DMM, JED-AMM); no Egypt-region pairing is documented for this supplier |
| 11 | Target host `ndc-supplier-integration.azurewebsites.net` | §1.6 | Mapped, but explicitly flagged as the stale/unmaintained V1-only fallback host, not the current STAG_ENV staging host |

## Resolved questions

- **credentialsSelector EGY, undocumented for FlyAdeal**: user confirmed proceeding with `EGY` as given —
  treat as an unconfirmed pairing to be resolved by the live result (success / empty offers / rejection),
  per SPEC.md §4.4's own "trust the live flag over either static document" doctrine.
- **No existing FlyAdeal Search fixture in `TestData/`**: user confirmed building one from
  `Supplier Routes.md`'s FlyAdeal routes (JED-RUH, RUH-DMM, or JED-AMM), to be validated live before use.
- **Target host**: user confirmed using `https://ndc-supplier-integration.azurewebsites.net/` exactly as
  given, despite SPEC.md flagging it as the stale/unmaintained fallback rather than the current staging
  host.
- **Scope entry point**: user confirmed skipping a dedicated user-story file — SPEC.md's own §2.4 contract
  plus §4 FlyAdeal capability rows serve as the analyzed source for this cycle.

## Open questions

None outstanding — the two ambiguities raised (credentialsSelector pairing, missing test-data fixture)
were resolved above. The remaining `UNKNOWN`s below are pre-existing SPEC.md gaps, not blocking
ambiguities in this scope: they are exactly the kind of thing this test run is expected to confirm live,
not something requiring a decision before test cases can be written.

## Flagged SPEC.md gaps

- **`selectedBundles[]` object shape is `UNKNOWN`** (§2.4 IDs Generated) — no observed example in either
  collection carries a non-empty bundle selection into Book/Hold. This run's positive Bundle test cases
  will select a bundle from a live `bundleChoices` response and attempt to thread it forward on a best-
  effort basis (per the plausible shape implied by `bundleCode`), explicitly logging the actual
  accepted/rejected behavior as a live confirmation candidate for `Update_Spec_From_Findings` — not
  guessed at silently.
- **FlyAdeal's `haveBundles=false` → 409 behavior is unconfirmed live** — §2.4's only live confirmation of
  the 409/`OperationNotSupported` envelope is for TravelportNdc, a bundle-*incapable* supplier. Whether a
  bundle-*capable* supplier like FlyAdeal ever actually surfaces `haveBundles=false` on some offers (and
  behaves the same way) is unconfirmed — flagged as a live-confirmation target, not assumed either way.
- **FlyAdeal+EGY as a valid credential pairing is unconfirmed** — proceeding per the resolved decision
  above; the live result itself is the confirmation mechanism.

## Testable Scope (for Generate_Test_Cases)

- **Endpoint(s)**: §2.4 GetOfferBundles, both V1 (`api/bundles/GetOfferBundles`) and V2
  (`api/V2/bundles/GetOfferBundles`), plus its required upstream chain §2.1 Search → §2.2 FareConfirm
  (Upselling §2.3 out of scope unless a FareConfirm-only chain proves insufficient live).
- **Supplier**: FlyAdeal.
- **Credentials Selector**: EGY.
- **Category emphasis**: positive (bundle-capable success response, response-shape/validation-rule
  checks), negative (stale `fareConfirmResponseId`, non-bundle-capable-style rejection if any FlyAdeal
  offer surfaces `haveBundles=false`), and one dedicated defect-confirmation case for the `JourneyKey1`
  script bug (§2.4 Response Mapping) — isolated so it's not masked by a longer chain's own error handling.
- **Out-of-scope / needs separate handling**: Book/Hold/ticketing against FlyAdeal — commercially
  blacklisted per §4.3/§1.8; any negative test that exercises this must confirm a business-layer
  rejection, not attempt an actual booking. `selectedBundles[]` downstream shape is a live-confirmation
  target, not a blocking gap for GetOfferBundles-level test cases themselves.
