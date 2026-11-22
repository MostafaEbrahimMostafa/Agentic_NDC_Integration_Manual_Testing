# Unknown-Resolution Tracker — TravelportNdc V1 Run (20260805-140642)

Source: `NDC_Integration/Artifacts/Logs/20260805-140642_TestCases_V1.jsonl`
Collected: all `finding` lines with `"kind":"unknown_resolution"`.

For each item below, fill in **Status** and **Action** once resolved with the team, per:

| Status | Action |
| --- | --- |
| Confirmed Expected | Close as Expected Behavior |
| Confirmed Bug | Open Defect |
| Environment Issue | Register as Environment Limitation |
| Spec Incomplete | Request Specification Update |

---

## 1. Related TC: FLOW-V1-01-NEG (§7.9, §2.9)
**Summary:** V1 error-response envelope confirmed live: HTTP 400 with Status, TransactionId, ErrorCode=ValidationError, ErrorMessage and Context[{Value}]; a mismatched fareConfirmResponseId/selectedOfferId pair is rejected, not silently booked.
**Status:**
**Action:**
**Notes:**

## 2. Related TC: (run-wide 4.7 capability confirmation) (§4.6, §4.7)
**Summary:** Live SPEC 4.7 capability sweep (CAI→JED, credentialsSelector=UAE): only 5 of the 9 suppliers named by V1 test cases are usable, and NO supplier returns a single bundle-capable offer.
**Status:**
**Action:**
**Notes:**

## 3. Related TC: (run-wide 4.7 capability confirmation) (§1.7)
**Summary:** Supplier-name matching is case-INSENSITIVE, contradicting SPEC 1.7's inference that it is exact and case-sensitive with no fuzzy fallback.
**Status:**
**Action:**
**Notes:**

## 4. Related TC: (run-wide 4.7 capability confirmation) (§1.5, §7)
**Summary:** Two structurally different error envelopes coexist on the same V1 API: a PascalCase one and a camelCase one, so a client cannot parse errors with one shape.
**Status:**
**Action:**
**Notes:**

## 5. Related TC: FLOW-V1-02 (§2.10)
**Summary:** Hold returns a populated holdExpirationDate and an empty tickets object, giving a ~5-day hold window on TravelportNdc/UAE.
**Status:**
**Action:**
**Notes:**

## 6. Related TC: FLOW-V1-03 (§2.15)
**Summary:** Void is NOT supported for TravelportNdc: the endpoint returns HTTP 409 ErrorCode=OperationNotSupported, establishing the first live baseline for Void's previously-undocumented response.
**Status:**
**Action:**
**Notes:**

## 7. Related TC: FLOW-V1-04 (§2.11, §2.13, §6.3)
**Summary:** The held-to-booked transition IS observable without bookingStatus: tickets goes empty → populated and holdExpirationDate goes set → cleared across BookAfterHold, and the same-PNR invariant holds exactly.
**Status:**
**Action:**
**Notes:**

## 8. Related TC: FLOW-V1-06 (§2.14)
**Summary:** CancelAfterHold's response shape is now confirmed live for the first time: HTTP 200 with the compact body {cancelled:true, message:'Reservation cancelled successfully.'} — closing the single biggest documentation gap in the collection.
**Status:**
**Action:**
**Notes:**

## 9. Related TC: FLOW-V1-06 (§2.11)
**Summary:** A cancelled reservation CANNOT be retrieved: Retrieve returns 409 NDC-INT-BYP-A0003 'Reservation is already cancelled', contradicting SPEC 2.11's inference that it would still succeed and report a terminal status.
**Status:**
**Action:**
**Notes:**

## 10. Related TC: FLOW-V1-07 (§2.3)
**Summary:** Upselling's real V1 contract confirmed: responseId plus a 3-tier upsellOffers[] ladder whose prices all reconcile correctly, including the per-pax tax itemization that Search omits.
**Status:**
**Action:**
**Notes:**

## 11. Related TC: FLOW-V1-13 (§2.4, §4.6)
**Summary:** GetOfferBundles is NOT supported for TravelportNdc: it returns HTTP 409 ErrorCode=OperationNotSupported, which independently confirms the haveBundles=false flag seen on all 67 offers and makes all 12 bundle-based V1 flows unexercisable on this supplier.
**Status:**
**Action:**
**Notes:**

## 12. Related TC: TC-SEARCH-BND-01 (§2.1, §7.8)
**Summary:** The 9-passenger maximum IS enforced, but at the SUPPLIER layer rather than by the API's own request validation: a 10-passenger Search returns HTTP 409 with Context 'MORE THAN 9 PAX IS NOT SUPPORTED'.
**Status:**
**Action:**
**Notes:**

## 13. Related TC: FLOW-V1-24-NEG (§2.4, §3.2)
**Summary:** GetOfferBundles against a haveBundles=false offer is rejected with an explicit HTTP 409, NOT an empty bundleChoices — closing SPEC 2.4's UNKNOWN, but with a confound: on TravelportNdc the bundle capability is absent entirely, so a per-offer-flag rejection and a per-supplier-capability rejection are indistinguishable here.
**Status:**
**Action:**
**Notes:**

## 14. Related TC: FLOW-V1-24 (§2.14, §2.11, §6.3-Family-F)
**Summary:** CancelAfterHold's response shape is now confirmed REPRODUCIBLE, not a one-off: a second independent Family-F run returned a byte-for-byte identical body, and the post-cancel Retrieve 409 also reproduced exactly — upgrading SPEC 2.14 from 'first observation' to a dependable baseline.
**Status:**
**Action:**
**Notes:**

## 15. Related TC: FLOW-V1-23 (§6.3-Family-E, §6.3-Family-F, §2.13, §2.15)
**Summary:** Across all six terminal families, Family F (cancel-terminated) is the ONLY one that closes cleanly on TravelportNdc — Family E's 9-hop chain executes fully but can never reach its voided end-state, so every Void-terminated family is permanently open on this supplier.
**Status:**
**Action:**
**Notes:**
