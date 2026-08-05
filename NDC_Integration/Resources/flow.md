# NDC Integration — End-to-End Flow Catalog

> **Companion documents**: `NDC_Integration/SPEC.md` (endpoint contracts, business rules, per-endpoint validation) and `NDC_Integration/Resources/supplier_matrix_template.md` (per-supplier capability data). Read **§4 "How to Use This Catalog"** before executing any flow — every flow below is a *candidate*; whether a specific supplier can actually run it depends on that supplier's live capability flags.

This catalog replaces the previous version of `flow.md`. It is **combinatorially complete** — every (Fare-Selection × Enrichment × Terminal-Outcome) combination that the API surface supports is listed exactly once, for both API versions.

| Version | Fare-Selection paths | Enrichment combinations | Terminal outcomes | Total flows |
|---|---|---|---|---|
| V1 | FareConfirm, Upselling | None, Bundle | 6 (A–F) | **24** |
| V2 | FareConfirm, Upselling | None, Bundle, Ancillary, SeatMap, Bundle+Ancillary, Bundle+SeatMap, Ancillary+SeatMap, Bundle+Ancillary+SeatMap | 6 (A–F) | **96** |
| | | | **Grand total** | **120** |

---

## Table of Contents

1. [Changelog — What Was Fixed vs. the Previous Version](#1-changelog--what-was-fixed-vs-the-previous-version)
2. [Endpoint Code Legend](#2-endpoint-code-legend)
3. [Terminal-Outcome Families (A–F)](#3-terminal-outcome-families-af)
4. [How to Use This Catalog (Supplier-Capability Gating)](#4-how-to-use-this-catalog-supplier-capability-gating)
5. [V1 Flows — 24 total](#5-v1-flows--24-total)
6. [V2 Flows — 96 total](#6-v2-flows--96-total)
7. [Quick-Reference: Capability → Flow-ID Index](#7-quick-reference-capability--flow-id-index)

---

## 1. Changelog — What Was Fixed vs. the Previous Version

| # | Gap / defect in the previous `flow.md` | Fix applied here |
|---|---|---|
| G1 | V1 "FareConfirm + Bundle" group (old #13–18) was missing the Hold→BookAfterHold→Void outcome (Family E); old #16 was a verbatim duplicate of old #14 instead | Duplicate removed; Family E added. Group is now flows **13–18**, one flow per outcome, no duplicates |
| G2 | V2 "SeatMap only" group (old #49–53) was missing the Hold→BookAfterHold→Void outcome (Family E) — only 5 of 6 outcomes existed | Family E added. Group is now flows **49–54** |
| G3 | Old #71's step text repeated `FareCheck` twice (copy-paste typo) | Collapsed to a single conditional `FareCheck` step |
| G4 | Old #37–42 ("Ancillary only") never called `FareCheck`, while every other Ancillary/SeatMap-bearing group did — an unexplained inconsistency, since `FareCheck`'s trigger (`isFareCheckRequired`) is returned by `GetAncillary` regardless of whether Bundle/SeatMap are also present | `FareCheck` (conditional — see §2) added consistently to **every** group that includes GetAncillary and/or GetSeatMap |
| G5 | Old #72–89 ("Upselling for V2") only covered the *None* and *Bundle* enrichment combinations — Ancillary, SeatMap, and their pairings/triple were never defined for the Upselling path, despite a real production defect (`TKCONNECT — Get Ancillary Returns 500 for Offer Returned from Add Pax After Upsell Flow`) proving this exact combination is exercised in practice | Full 8-combination × 6-outcome matrix built for Upselling+V2, mirroring the FareConfirm+V2 matrix exactly. This is **48 new/rebuilt flows** (old #72–89, only 18 flows, replaced by new **#73–120**, 48 flows) |
| G6 | Old #72–89 never included `AddPassenger`, even though V2's `Book`/`Hold` payloads structurally require AddPassenger-derived identity (V2 has no `passengersList` field on Book/Hold at all) | `AddPassenger` inserted into every V2 Upselling flow, exactly as it already was for every V2 FareConfirm flow |
| G7 | Old #78–83 were textually labeled under an "Upselling" section header but literally used `FareConfirm` in their step list; old #85–89 were labeled "for V1" despite sitting inside the file's declared V2 numbering range (25–89); old #81 duplicated old #79 | Both contradictions are moot under the new structure — the FareConfirm-path and Upselling-path matrices are now built independently and completely, so there is no leftover ambiguous/duplicated content to relabel |

Net effect: 89 nominally-listed flows (several invalid/duplicated) → **120 verified, non-duplicated flows**, symmetric across both fare-selection paths and both API versions.

---

## 2. Endpoint Code Legend

| Code | Endpoint | Notes |
|---|---|---|
| `SR` | Search | Entry point of every flow |
| `FC` | FareConfirm | Standard fare-selection path |
| `UP` | Upselling | Alternative fare-selection path — a flow uses **one or the other**, never both |
| `BDL` | GetOfferBundles | Requires `haveBundles = true` on the prior FareConfirm/Upselling offer |
| `AP` | AddPassenger | **V2 only.** Mandatory on every V2 flow, regardless of fare-selection or enrichment path (V1 has no equivalent step — passenger data goes directly on Book/Hold instead) |
| `ANC` | GetAncillary | **V2 only.** Requires `offerHasAncillary` / `isAncillaryRequired` on the AddPassenger-era offer |
| `SM` | GetSeatMap | **V2 only.** Requires `isSeatMapRequired` on the AddPassenger-era offer |
| `FCK` | FareCheck | **V2 only, conditional.** Run only if the immediately preceding `GetAncillary`/`GetSeatMap` response returns `isFareCheckRequired = true`. Present whenever `ANC` and/or `SM` appear in the flow |
| `BK` | Book | Direct booking |
| `HD` | Hold | Alternative to direct booking |
| `FCAH` | FareConfirmAfterHold | Re-prices a held offer |
| `BAH` | BookAfterHold | Finalizes a held booking |
| `RT` | Retrieve (`RetrieveBooking` in V1, `Retrieve` in V2) | Confirms booking state — appears once per Hold/Book milestone |
| `CXL` | CancelAfterHold (a.k.a. CancelHold) | Abandons a held booking instead of finalizing it |
| `VD` | Void | Cancels a *ticketed* booking (same-day, per supplier rules) |

---

## 3. Terminal-Outcome Families (A–F)

Every flow ends in exactly one of six shapes. Flows sharing a family share the same expected end-state and negative-path shape.

| Family | Shape | Meaning |
|---|---|---|
| **A** | `BK → RT` | Direct book, single retrieve confirms it. Simplest positive path. |
| **B** | `HD → FCAH → RT` | Hold, re-confirm, retrieve — and stop. ⚠️ Leaves a **dangling Held booking** in the target environment; clean up manually or accept it will expire per the supplier's hold window. |
| **C** | `BK → RT → VD` | Direct book, retrieve, then void the ticket (same-day only). |
| **D** | `HD → FCAH → RT → BAH → RT` | Hold branch carried through to a finalized booking, confirmed twice. |
| **E** | `HD → FCAH → RT → BAH → RT → VD` | Hold branch finalized, then voided. The most endpoint-dense positive path. |
| **F** | `HD → FCAH → RT → CXL` | Hold branch abandoned via CancelAfterHold instead of finalized. |

---

## 4. How to Use This Catalog (Supplier-Capability Gating)

A flow number is a **template**, not a guaranteed-executable test. Before scheduling any flow against a given supplier:

1. **Check the static capability matrix** (`supplier_matrix_template.md` / `suppliers.json`) for that supplier's declared Bundle / Hold / Ancillary / SeatMap support.
2. **Confirm against the live offer flags** returned by Search/FareConfirm/Upselling for the *specific* offer under test — `haveBundles`, `canBeHeld`, `offerHasAncillary`/`isAncillaryRequired`, `isSeatMapRequired`. These are per-offer, real-time, and take precedence over the static matrix when the two disagree (capability can vary by route/date/fare, not just by supplier).
3. **Skip families the supplier can't support**: if `canBeHeld = false`, only Families A and C are runnable for that supplier — skip B, D, E, F entirely (don't force a Hold call that's expected to fail).
4. **Skip enrichment groups the supplier can't support**: if `haveBundles = false`, skip every `BDL`-bearing group; if the supplier has no Ancillary/SeatMap support (V2 only), skip `ANC`/`SM`-bearing groups.
5. **Treat `FCK` as conditional, not optional-to-check**: always inspect the prior `GetAncillary`/`GetSeatMap` response for `isFareCheckRequired` — if `true`, `FareCheck` is mandatory before Book/Hold; if `false`, skip it and note that on the test result (don't silently assume one way).

The **Required Capabilities** column on every table below lists what a supplier must support (beyond the universal Search/FareConfirm-or-Upselling/Book/Retrieve, and — for V2 — AddPassenger) for that specific flow to be a valid candidate.

---

## 5. V1 Flows — 24 total

V1 has no AddPassenger, Ancillary, SeatMap, or FareCheck concept — passenger data is embedded directly in the Book/Hold payload. Only Bundle is available as an enrichment step.

### 5.1 FareConfirm path — No Enrichment (Flows 1–6)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 1 | A | Search → FareConfirm → Book → Retrieve | `SR-FC-BK-RT` | — |
| 2 | B | Search → FareConfirm → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-HD-FCAH-RT` | Hold |
| 3 | C | Search → FareConfirm → Book → Retrieve → Void | `SR-FC-BK-RT-VD` | Void |
| 4 | D | Search → FareConfirm → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-HD-FCAH-RT-BAH-RT` | Hold |
| 5 | E | Search → FareConfirm → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-HD-FCAH-RT-BAH-RT-VD` | Hold, Void |
| 6 | F | Search → FareConfirm → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-HD-FCAH-RT-CXL` | Hold, CancelHold |

### 5.2 Upselling path — No Enrichment (Flows 7–12)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 7 | A | Search → Upselling → Book → Retrieve | `SR-UP-BK-RT` | Upsell |
| 8 | B | Search → Upselling → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-HD-FCAH-RT` | Upsell, Hold |
| 9 | C | Search → Upselling → Book → Retrieve → Void | `SR-UP-BK-RT-VD` | Upsell, Void |
| 10 | D | Search → Upselling → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-HD-FCAH-RT-BAH-RT` | Upsell, Hold |
| 11 | E | Search → Upselling → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-HD-FCAH-RT-BAH-RT-VD` | Upsell, Hold, Void |
| 12 | F | Search → Upselling → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-HD-FCAH-RT-CXL` | Upsell, Hold, CancelHold |

### 5.3 FareConfirm path — Bundle (Flows 13–18)

> Flow 17 (Family E) is newly filled in — the previous version duplicated Family B here instead.

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 13 | A | Search → FareConfirm → GetOfferBundles → Book → Retrieve | `SR-FC-BDL-BK-RT` | Bundle |
| 14 | B | Search → FareConfirm → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-BDL-HD-FCAH-RT` | Bundle, Hold |
| 15 | C | Search → FareConfirm → GetOfferBundles → Book → Retrieve → Void | `SR-FC-BDL-BK-RT-VD` | Bundle, Void |
| 16 | D | Search → FareConfirm → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-BDL-HD-FCAH-RT-BAH-RT` | Bundle, Hold |
| 17 | E | Search → FareConfirm → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-BDL-HD-FCAH-RT-BAH-RT-VD` | Bundle, Hold, Void |
| 18 | F | Search → FareConfirm → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-BDL-HD-FCAH-RT-CXL` | Bundle, Hold, CancelHold |

### 5.4 Upselling path — Bundle (Flows 19–24)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 19 | A | Search → Upselling → GetOfferBundles → Book → Retrieve | `SR-UP-BDL-BK-RT` | Upsell, Bundle |
| 20 | B | Search → Upselling → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-BDL-HD-FCAH-RT` | Upsell, Bundle, Hold |
| 21 | C | Search → Upselling → GetOfferBundles → Book → Retrieve → Void | `SR-UP-BDL-BK-RT-VD` | Upsell, Bundle, Void |
| 22 | D | Search → Upselling → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-BDL-HD-FCAH-RT-BAH-RT` | Upsell, Bundle, Hold |
| 23 | E | Search → Upselling → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-BDL-HD-FCAH-RT-BAH-RT-VD` | Upsell, Bundle, Hold, Void |
| 24 | F | Search → Upselling → GetOfferBundles → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-BDL-HD-FCAH-RT-CXL` | Upsell, Bundle, Hold, CancelHold |

---

## 6. V2 Flows — 96 total

Every V2 flow includes `AddPassenger` (`AP`), inserted immediately after Bundle (if present) and before any further enrichment/booking step. `FareCheck` (`FCK`) is conditional — see §2/§4 — and appears in every group that includes Ancillary and/or SeatMap.

### 6.1 FareConfirm path (Flows 25–72)

#### 6.1.1 No Enrichment (25–30)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 25 | A | Search → FareConfirm → AddPassenger → Book → Retrieve | `SR-FC-AP-BK-RT` | — |
| 26 | B | Search → FareConfirm → AddPassenger → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-AP-HD-FCAH-RT` | Hold |
| 27 | C | Search → FareConfirm → AddPassenger → Book → Retrieve → Void | `SR-FC-AP-BK-RT-VD` | Void |
| 28 | D | Search → FareConfirm → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-AP-HD-FCAH-RT-BAH-RT` | Hold |
| 29 | E | Search → FareConfirm → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-AP-HD-FCAH-RT-BAH-RT-VD` | Hold, Void |
| 30 | F | Search → FareConfirm → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-AP-HD-FCAH-RT-CXL` | Hold, CancelHold |

#### 6.1.2 Bundle (31–36)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 31 | A | Search → FareConfirm → GetOfferBundles → AddPassenger → Book → Retrieve | `SR-FC-BDL-AP-BK-RT` | Bundle |
| 32 | B | Search → FareConfirm → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-BDL-AP-HD-FCAH-RT` | Bundle, Hold |
| 33 | C | Search → FareConfirm → GetOfferBundles → AddPassenger → Book → Retrieve → Void | `SR-FC-BDL-AP-BK-RT-VD` | Bundle, Void |
| 34 | D | Search → FareConfirm → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-BDL-AP-HD-FCAH-RT-BAH-RT` | Bundle, Hold |
| 35 | E | Search → FareConfirm → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-BDL-AP-HD-FCAH-RT-BAH-RT-VD` | Bundle, Hold, Void |
| 36 | F | Search → FareConfirm → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-BDL-AP-HD-FCAH-RT-CXL` | Bundle, Hold, CancelHold |

#### 6.1.3 Ancillary (37–42)

> `FareCheck` now added consistently (fix G4) — previously missing from this group only.

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 37 | A | Search → FareConfirm → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve | `SR-FC-AP-ANC-FCK-BK-RT` | Ancillary |
| 38 | B | Search → FareConfirm → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-AP-ANC-FCK-HD-FCAH-RT` | Ancillary, Hold |
| 39 | C | Search → FareConfirm → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve → Void | `SR-FC-AP-ANC-FCK-BK-RT-VD` | Ancillary, Void |
| 40 | D | Search → FareConfirm → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-AP-ANC-FCK-HD-FCAH-RT-BAH-RT` | Ancillary, Hold |
| 41 | E | Search → FareConfirm → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-AP-ANC-FCK-HD-FCAH-RT-BAH-RT-VD` | Ancillary, Hold, Void |
| 42 | F | Search → FareConfirm → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-AP-ANC-FCK-HD-FCAH-RT-CXL` | Ancillary, Hold, CancelHold |

*`FareCheck` conditional on `isFareCheckRequired = true` in the GetAncillary response (§2/§4).

#### 6.1.4 Bundle + Ancillary (43–48)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 43 | A | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve | `SR-FC-BDL-AP-ANC-FCK-BK-RT` | Bundle, Ancillary |
| 44 | B | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT` | Bundle, Ancillary, Hold |
| 45 | C | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve → Void | `SR-FC-BDL-AP-ANC-FCK-BK-RT-VD` | Bundle, Ancillary, Void |
| 46 | D | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT-BAH-RT` | Bundle, Ancillary, Hold |
| 47 | E | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT-BAH-RT-VD` | Bundle, Ancillary, Hold, Void |
| 48 | F | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-BDL-AP-ANC-FCK-HD-FCAH-RT-CXL` | Bundle, Ancillary, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.1.5 SeatMap (49–54)

> Flow 53 (Family E) is newly filled in — the previous version was missing this outcome entirely for this group.

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 49 | A | Search → FareConfirm → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve | `SR-FC-AP-SM-FCK-BK-RT` | SeatMap |
| 50 | B | Search → FareConfirm → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-AP-SM-FCK-HD-FCAH-RT` | SeatMap, Hold |
| 51 | C | Search → FareConfirm → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-FC-AP-SM-FCK-BK-RT-VD` | SeatMap, Void |
| 52 | D | Search → FareConfirm → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-AP-SM-FCK-HD-FCAH-RT-BAH-RT` | SeatMap, Hold |
| 53 | E | Search → FareConfirm → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-AP-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | SeatMap, Hold, Void |
| 54 | F | Search → FareConfirm → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-AP-SM-FCK-HD-FCAH-RT-CXL` | SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.1.6 Bundle + SeatMap (55–60)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 55 | A | Search → FareConfirm → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve | `SR-FC-BDL-AP-SM-FCK-BK-RT` | Bundle, SeatMap |
| 56 | B | Search → FareConfirm → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT` | Bundle, SeatMap, Hold |
| 57 | C | Search → FareConfirm → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-FC-BDL-AP-SM-FCK-BK-RT-VD` | Bundle, SeatMap, Void |
| 58 | D | Search → FareConfirm → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT-BAH-RT` | Bundle, SeatMap, Hold |
| 59 | E | Search → FareConfirm → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | Bundle, SeatMap, Hold, Void |
| 60 | F | Search → FareConfirm → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-BDL-AP-SM-FCK-HD-FCAH-RT-CXL` | Bundle, SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.1.7 Ancillary + SeatMap (61–66)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 61 | A | Search → FareConfirm → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve | `SR-FC-AP-ANC-SM-FCK-BK-RT` | Ancillary, SeatMap |
| 62 | B | Search → FareConfirm → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT` | Ancillary, SeatMap, Hold |
| 63 | C | Search → FareConfirm → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-FC-AP-ANC-SM-FCK-BK-RT-VD` | Ancillary, SeatMap, Void |
| 64 | D | Search → FareConfirm → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT` | Ancillary, SeatMap, Hold |
| 65 | E | Search → FareConfirm → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | Ancillary, SeatMap, Hold, Void |
| 66 | F | Search → FareConfirm → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-AP-ANC-SM-FCK-HD-FCAH-RT-CXL` | Ancillary, SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.1.8 Bundle + Ancillary + SeatMap (67–72)

> Fix G3: the duplicated `FareCheck` step text in the previous version's equivalent flow has been collapsed to one conditional call.

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 67 | A | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve | `SR-FC-BDL-AP-ANC-SM-FCK-BK-RT` | Bundle, Ancillary, SeatMap |
| 68 | B | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT` | Bundle, Ancillary, SeatMap, Hold |
| 69 | C | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-FC-BDL-AP-ANC-SM-FCK-BK-RT-VD` | Bundle, Ancillary, SeatMap, Void |
| 70 | D | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT` | Bundle, Ancillary, SeatMap, Hold |
| 71 | E | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | Bundle, Ancillary, SeatMap, Hold, Void |
| 72 | F | Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-FC-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-CXL` | Bundle, Ancillary, SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

---

### 6.2 Upselling path (Flows 73–120)

> Fixes G5/G6: this entire path (all 8 enrichment groups) is newly built to full parity with §6.1 — the previous version only covered *None* and *Bundle* for Upselling, and omitted `AddPassenger` throughout. A real production defect (TKConnect: `GetAncillary` 500 error on an offer returned from an Add-Pax-after-Upsell flow) is direct evidence this path is exercised in practice and needed full coverage.

#### 6.2.1 No Enrichment (73–78)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 73 | A | Search → Upselling → AddPassenger → Book → Retrieve | `SR-UP-AP-BK-RT` | Upsell |
| 74 | B | Search → Upselling → AddPassenger → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-AP-HD-FCAH-RT` | Upsell, Hold |
| 75 | C | Search → Upselling → AddPassenger → Book → Retrieve → Void | `SR-UP-AP-BK-RT-VD` | Upsell, Void |
| 76 | D | Search → Upselling → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-AP-HD-FCAH-RT-BAH-RT` | Upsell, Hold |
| 77 | E | Search → Upselling → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-AP-HD-FCAH-RT-BAH-RT-VD` | Upsell, Hold, Void |
| 78 | F | Search → Upselling → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-AP-HD-FCAH-RT-CXL` | Upsell, Hold, CancelHold |

#### 6.2.2 Bundle (79–84)

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 79 | A | Search → Upselling → GetOfferBundles → AddPassenger → Book → Retrieve | `SR-UP-BDL-AP-BK-RT` | Upsell, Bundle |
| 80 | B | Search → Upselling → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-BDL-AP-HD-FCAH-RT` | Upsell, Bundle, Hold |
| 81 | C | Search → Upselling → GetOfferBundles → AddPassenger → Book → Retrieve → Void | `SR-UP-BDL-AP-BK-RT-VD` | Upsell, Bundle, Void |
| 82 | D | Search → Upselling → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-BDL-AP-HD-FCAH-RT-BAH-RT` | Upsell, Bundle, Hold |
| 83 | E | Search → Upselling → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-BDL-AP-HD-FCAH-RT-BAH-RT-VD` | Upsell, Bundle, Hold, Void |
| 84 | F | Search → Upselling → GetOfferBundles → AddPassenger → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-BDL-AP-HD-FCAH-RT-CXL` | Upsell, Bundle, Hold, CancelHold |

#### 6.2.3 Ancillary (85–90) — *new group*

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 85 | A | Search → Upselling → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve | `SR-UP-AP-ANC-FCK-BK-RT` | Upsell, Ancillary |
| 86 | B | Search → Upselling → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-AP-ANC-FCK-HD-FCAH-RT` | Upsell, Ancillary, Hold |
| 87 | C | Search → Upselling → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve → Void | `SR-UP-AP-ANC-FCK-BK-RT-VD` | Upsell, Ancillary, Void |
| 88 | D | Search → Upselling → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-AP-ANC-FCK-HD-FCAH-RT-BAH-RT` | Upsell, Ancillary, Hold |
| 89 | E | Search → Upselling → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-AP-ANC-FCK-HD-FCAH-RT-BAH-RT-VD` | Upsell, Ancillary, Hold, Void |
| 90 | F | Search → Upselling → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-AP-ANC-FCK-HD-FCAH-RT-CXL` | Upsell, Ancillary, Hold, CancelHold |

*`FareCheck` conditional (§2/§4). This is the group directly implicated by the TKConnect "Add Pax After Upsell" production defect — prioritize it in the first execution pass.

#### 6.2.4 Bundle + Ancillary (91–96) — *new group*

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 91 | A | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve | `SR-UP-BDL-AP-ANC-FCK-BK-RT` | Upsell, Bundle, Ancillary |
| 92 | B | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-BDL-AP-ANC-FCK-HD-FCAH-RT` | Upsell, Bundle, Ancillary, Hold |
| 93 | C | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Book → Retrieve → Void | `SR-UP-BDL-AP-ANC-FCK-BK-RT-VD` | Upsell, Bundle, Ancillary, Void |
| 94 | D | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-BDL-AP-ANC-FCK-HD-FCAH-RT-BAH-RT` | Upsell, Bundle, Ancillary, Hold |
| 95 | E | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-BDL-AP-ANC-FCK-HD-FCAH-RT-BAH-RT-VD` | Upsell, Bundle, Ancillary, Hold, Void |
| 96 | F | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-BDL-AP-ANC-FCK-HD-FCAH-RT-CXL` | Upsell, Bundle, Ancillary, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.2.5 SeatMap (97–102) — *new group*

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 97 | A | Search → Upselling → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve | `SR-UP-AP-SM-FCK-BK-RT` | Upsell, SeatMap |
| 98 | B | Search → Upselling → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-AP-SM-FCK-HD-FCAH-RT` | Upsell, SeatMap, Hold |
| 99 | C | Search → Upselling → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-UP-AP-SM-FCK-BK-RT-VD` | Upsell, SeatMap, Void |
| 100 | D | Search → Upselling → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-AP-SM-FCK-HD-FCAH-RT-BAH-RT` | Upsell, SeatMap, Hold |
| 101 | E | Search → Upselling → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-AP-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | Upsell, SeatMap, Hold, Void |
| 102 | F | Search → Upselling → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-AP-SM-FCK-HD-FCAH-RT-CXL` | Upsell, SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.2.6 Bundle + SeatMap (103–108) — *new group*

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 103 | A | Search → Upselling → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve | `SR-UP-BDL-AP-SM-FCK-BK-RT` | Upsell, Bundle, SeatMap |
| 104 | B | Search → Upselling → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-BDL-AP-SM-FCK-HD-FCAH-RT` | Upsell, Bundle, SeatMap, Hold |
| 105 | C | Search → Upselling → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-UP-BDL-AP-SM-FCK-BK-RT-VD` | Upsell, Bundle, SeatMap, Void |
| 106 | D | Search → Upselling → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-BDL-AP-SM-FCK-HD-FCAH-RT-BAH-RT` | Upsell, Bundle, SeatMap, Hold |
| 107 | E | Search → Upselling → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-BDL-AP-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | Upsell, Bundle, SeatMap, Hold, Void |
| 108 | F | Search → Upselling → GetOfferBundles → AddPassenger → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-BDL-AP-SM-FCK-HD-FCAH-RT-CXL` | Upsell, Bundle, SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.2.7 Ancillary + SeatMap (109–114) — *new group*

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 109 | A | Search → Upselling → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve | `SR-UP-AP-ANC-SM-FCK-BK-RT` | Upsell, Ancillary, SeatMap |
| 110 | B | Search → Upselling → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-AP-ANC-SM-FCK-HD-FCAH-RT` | Upsell, Ancillary, SeatMap, Hold |
| 111 | C | Search → Upselling → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-UP-AP-ANC-SM-FCK-BK-RT-VD` | Upsell, Ancillary, SeatMap, Void |
| 112 | D | Search → Upselling → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT` | Upsell, Ancillary, SeatMap, Hold |
| 113 | E | Search → Upselling → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | Upsell, Ancillary, SeatMap, Hold, Void |
| 114 | F | Search → Upselling → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-AP-ANC-SM-FCK-HD-FCAH-RT-CXL` | Upsell, Ancillary, SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

#### 6.2.8 Bundle + Ancillary + SeatMap (115–120) — *new group*

| ID | Family | Step Sequence | Codes | Required Capabilities |
|---|---|---|---|---|
| 115 | A | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve | `SR-UP-BDL-AP-ANC-SM-FCK-BK-RT` | Upsell, Bundle, Ancillary, SeatMap |
| 116 | B | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve | `SR-UP-BDL-AP-ANC-SM-FCK-HD-FCAH-RT` | Upsell, Bundle, Ancillary, SeatMap, Hold |
| 117 | C | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Book → Retrieve → Void | `SR-UP-BDL-AP-ANC-SM-FCK-BK-RT-VD` | Upsell, Bundle, Ancillary, SeatMap, Void |
| 118 | D | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve | `SR-UP-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT` | Upsell, Bundle, Ancillary, SeatMap, Hold |
| 119 | E | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → BookAfterHold → Retrieve → Void | `SR-UP-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-BAH-RT-VD` | Upsell, Bundle, Ancillary, SeatMap, Hold, Void |
| 120 | F | Search → Upselling → GetOfferBundles → AddPassenger → GetAncillary → GetSeatMap → FareCheck* → Hold → FareConfirmAfterHold → Retrieve → CancelHold | `SR-UP-BDL-AP-ANC-SM-FCK-HD-FCAH-RT-CXL` | Upsell, Bundle, Ancillary, SeatMap, Hold, CancelHold |

*`FareCheck` conditional (§2/§4).

---

## 7. Quick-Reference: Capability → Flow-ID Index

Use this to pick the flow subset that matches one supplier's capability profile. Ranges are inclusive.

| If the supplier/offer... | ...then only these flows are valid candidates |
|---|---|
| Is V1 only | 1–24 |
| Is V2 only | 25–120 |
| Has `canBeHeld = false` | Family A/C only, in whichever ID ranges apply — i.e. skip every ID whose Family is B, D, E, or F |
| Has `haveBundles = false` | Skip 13–24 (V1 Bundle groups) and 31–36, 43–48, 55–60, 67–72, 79–84, 91–96, 103–108, 115–120 (V2 Bundle-bearing groups) |
| Has no Ancillary support (V2) | Skip 37–48, 61–72, 85–96, 109–120 |
| Has no SeatMap support (V2) | Skip 49–72, 97–120 |
| Supports Upselling as well as FareConfirm | Also run the mirrored flow in 7–12/19–24 (V1) or 73–120 (V2) alongside its FareConfirm-path counterpart in 1–6/13–18 (V1) or 25–72 (V2), to cross-check both fare-selection paths |
| Supports CancelAfterHold | Family F flows are runnable: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120 |
| Supports same-day Void | Family C/E flows are runnable: 3, 5, 9, 11, 15, 17, 21, 23, 27, 29, 33, 35, 39, 41, 45, 47, 51, 53, 57, 59, 63, 65, 69, 71, 75, 77, 81, 83, 87, 89, 93, 95, 99, 101, 105, 107, 111, 113, 117, 119 |

For the full endpoint-by-endpoint request/response contract behind each step, see `NDC_Integration/SPEC.md` §2. For isolated single-endpoint and endpoint-integration test design (test types 1 and 2, as distinct from this end-to-end catalog), see `NDC_Integration/SPEC.md` §6–§7.
