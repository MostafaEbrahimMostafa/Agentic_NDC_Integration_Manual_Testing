# Supplier Index

One file per supplier with **observed** behaviour. Expected behaviour and the full 38-supplier
capability matrix are in SPEC.md §4.6 — this index does not replace it.

Load only the file for the supplier you are testing.

> **Source and evidence status (checked 2026-11-17, after the artifact restore):** these files were
> migrated from the QA owner's personal Claude run notes. Run reports were restored to
> `Artifacts/Logs/` and `Artifacts/BugReports/` **up to 2026-11-08 only**:
>
> | Evidence | Run keys |
> |---|---|
> | Log + bug folder in repo | TPN-V1, SEAT-R20, SEAT-R21, SEAT-R22, SAB-VOID, SAB-GV2, SAB-R2, SAB-VU1, SAB-VU2, TPN-VOID1, TPN-VOID2, TPN-FULL, AMD-R1, AMD-R2, AI-NE3, AI-R2 |
> | Log only (no bug folder) | AAP-R1, AAP-R3 (raw hop log) |
> | **Not in repo** (facts are "reported", not re-checkable here) | AAP-ONEAPI, AAP-BUG18, AAP-XLSX, GAL-R1, GAL-R2, GAL-R3, GAL-R4, GAL-RTMC, SAB-AV2 (AAP-SWEEP and AAP-BUG10 never had a report) |
>
> Facts backed by a missing run should be re-verified by the next live run, or the missing
> artifacts restored.

| Supplier | Selector(s) seen active | Main host(s) | Status in one line | Newest fact | File |
|---|---|---|---|---|---|
| AirArabiaPlus | USA | ne-6, stg-ne, ne-1 | V2 booking works for G9 only; no Void/Cancel | 2026-11-16 | [AirArabiaPlus.md](AirArabiaPlus.md) |
| Galileo | EGY | ne-4 | Availability + Hold + Cancel work; Book/BookAfterHold fail (FOP) | 2026-11-15 | [Galileo.md](Galileo.md) |
| SabreNdc | EGY | ne-3, ne-7 | Book/Hold/Void work; QR + AA only; no enrichment | 2026-11-12 | [SabreNdc.md](SabreNdc.md) |
| TravelportNdc | UAE, EGY | ne-3, ne-5 | V1+V2 Book/Hold/Void work; QR/EK/RJ; no bundles | 2026-11-01 | [TravelportNdc.md](TravelportNdc.md) |
| Amadeus | EGY | ne-8, ne-3 | Only V1 name rules tested; Book 500; holds can't be cancelled | 2026-11-01 | [Amadeus.md](Amadeus.md) |
| AirIndia | EGY | supplier-integration, ne-3 | Inventory only on supplier-integration; Family A only | 2026-11-02 | [AirIndia.md](AirIndia.md) |
| GulfAir | KSA | staging | SeatMap suite supplier; Book works | 2026-10-10 | [GulfAir.md](GulfAir.md) |
| FlyAdeal | EGY | supplier-integration | SeatMap + Book with bundles; no Hold | 2026-10-11 | [FlyAdeal.md](FlyAdeal.md) |
| OmanAirV17 | EGY (collection env, unverified) | stg-ne-2 (collection env) | Reissue supplier (SPEC §2.16); owner rules only, not yet called | 2026-11-22 (owner, not live) | [OmanAirV17.md](OmanAirV17.md) |
| AegeanV21 | unknown | unknown | Reissue supplier (SPEC §2.16); owner rules only, not yet called | 2026-11-22 (owner, not live) | [AegeanV21.md](AegeanV21.md) |
| Ajet | unknown (enum value unconfirmed) | unknown | Reissue supplier (SPEC §2.16); owner rules only, not yet called | 2026-11-22 (owner, not live) | [Ajet.md](Ajet.md) |

If "Newest fact" is more than 14 days old, re-check live before relying on that file.

## Suppliers with no KB file yet

Only an old capability sweep exists (2026-08-05, selector UAE, `Harness/README.md` and
`Artifacts/UnknownResolutionTracker.md`). Treat as unverified:

| Supplier | Last seen | Note |
|---|---|---|
| EgyptAir, RiyadhAir, AirCairo, FlyDubai | 2026-08-05 / UAE | Returned offers then |
| FlyNas | 2026-10-25 / EGY | 7 offers on EGY (seen during SabreNdc R2, not tested) |
| AirArabia (legacy) | 2026-08-05 / UAE | 409 |
| Indigo | 2026-08-05 / UAE | 500 |
| Emirates | 2026-08-05 | **Not a valid supplier enum value** (SPEC §1.7) |

## Adding a supplier

Copy [_TEMPLATE.md](_TEMPLATE.md) to `<Supplier>.md`, fill it from the run report, add a row above.
Every fact needs a `Last verified` line. Follow the "never write here" list in the template.
