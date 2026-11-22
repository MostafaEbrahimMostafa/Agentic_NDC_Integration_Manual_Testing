# AirArabiaPlus / USA One-API regression — coverage map

Generated 2026-11-09T10:59:37.304Z by NDC_Integration/Harness/AirArabiaPlus/plan.js from the five source test-case sheets, the AirArabiaPlus booking-creation sheet and the cases added for the change.

Status: PASS / FAIL / BLOCKED = executed (see the QA report); MAPPED = same assertion as a case that was executed once; N/A = not applicable to AirArabiaPlus V2 (reason given).

## Totals per source

- **generic**: PASS 40, FAIL 10, BLOCKED 4, N/A 10
- **v2**: PASS 47, FAIL 4, BLOCKED 80, MAPPED 61, N/A 20
- **seat**: PASS 41, FAIL 7, BLOCKED 15
- **void**: PASS 30, FAIL 7, N/A 16, BLOCKED 14
- **amd**: N/A 45, PASS 50, FAIL 4
- **booking**: PASS 22, FAIL 2
- **added**: PASS 5, FAIL 6, BLOCKED 9

## generic

| Row | Status | Note |
|---|---|---|
| TC-SEARCH-POS-01 | PASS | executed as TC-SEARCH-POS-01 |
| TC-SEARCH-NEG-01 | PASS | executed as TC-SEARCH-NEG-01 |
| TC-SEARCH-NEG-02 | PASS | executed as TC-SEARCH-NEG-02 |
| TC-SEARCH-NEG-03 | PASS | executed as TC-SEARCH-NEG-03 |
| TC-SEARCH-BND-02 | PASS | executed as TC-SEARCH-BND-02 |
| TC-SEARCH-BND-03 | FAIL | executed as TC-SEARCH-BND-03 |
| TC-SEARCH-VAL-01 | PASS | executed as TC-SEARCH-VAL-01 |
| TC-SEARCH-BIZ-02 | PASS | executed as TC-SEARCH-BIZ-02 |
| TC-SEARCH-SEC-01 | PASS | executed as TC-SEARCH-SEC-01 |
| TC-SEARCH-REG-01 | PASS | executed as TC-SEARCH-REG-01 |
| TC-FARECONFIRM-POS-01 | PASS | executed as TC-FARECONFIRM-POS-01 |
| TC-FARECONFIRM-NEG-01 | FAIL | executed as TC-FARECONFIRM-NEG-01 |
| TC-FARECONFIRM-VAL-01 | FAIL | executed as TC-FARECONFIRM-VAL-01 |
| TC-FARECONFIRM-BIZ-02 | PASS | executed as TC-FARECONFIRM-BIZ-02 |
| TC-FARECONFIRM-INT-01 | PASS | executed as TC-FARECONFIRM-INT-01 |
| TC-FARECONFIRM-NEG-02 | BLOCKED | executed as TC-FARECONFIRM-NEG-02 |
| TC-BUNDLE-POS-01 | PASS | executed as TC-BUNDLE-POS-01 |
| TC-BUNDLE-NEG-01 | BLOCKED | executed as TC-BUNDLE-NEG-01 |
| TC-BUNDLE-REG-01 | PASS | executed as TC-BUNDLE-REG-01 |
| TC-BUNDLE-VAL-02 | PASS | executed as TC-BUNDLE-VAL-02 |
| TC-BUNDLE-VAL-03 | PASS | executed as TC-BUNDLE-VAL-03 |
| TC-BOOK-POS-02 | PASS | executed as TC-BOOK-POS-02 |
| TC-BOOK-NEG-04 | FAIL | executed as TC-BOOK-NEG-04 |
| TC-BOOK-BIZ-03 | PASS | executed as TC-BOOK-BIZ-03 |
| TC-BOOK-SEC-01 | FAIL | executed as TC-BOOK-SEC-01 |
| TC-BOOK-BIZ-04 | PASS | executed as TC-BOOK-BIZ-04 |
| TC-BOOK-NEG-05 | FAIL | executed as TC-BOOK-NEG-05 |
| TC-BOOK-VAL-02 | N/A | V1-only field (capital-S Supplier on V1 Book); V2 only by instruction |
| TC-HOLD-POS-01 | PASS | executed as TC-HOLD-POS-01 |
| TC-HOLD-NEG-02 | N/A | Hold rejection for canBeHeld=false suppliers (FlyNas, GLC): AirArabiaPlus offers have canBeHeld=true |
| TC-HOLD-BIZ-01 | PASS | executed as TC-HOLD-BIZ-01 |
| TC-HOLD-BND-01 | FAIL | executed as TC-HOLD-BND-01 |
| TC-RETRIEVE-POS-01 | PASS | executed as TC-RETRIEVE-POS-01 |
| TC-RETRIEVE-REG-01 | PASS | executed as TC-RETRIEVE-REG-01 |
| TC-RETRIEVE-VAL-01 | PASS | executed as TC-RETRIEVE-VAL-01 |
| TC-RETRIEVE-INT-01 | PASS | executed as TC-RETRIEVE-INT-01 |
| TC-FCAH-BIZ-01 | PASS | executed as TC-FCAH-BIZ-01 |
| TC-FCAH-NEG-01 | PASS | executed as TC-FCAH-NEG-01 |
| TC-BOOKAFTERHOLD-REG-01 | PASS | executed as TC-BOOKAFTERHOLD-REG-01 |
| TC-BOOKAFTERHOLD-NEG-01 | FAIL | executed as TC-BOOKAFTERHOLD-NEG-01 |
| TC-VOID-BIZ-01 | PASS | executed as TC-VOID-BIZ-01 |
| TC-VOID-NEG-02 | BLOCKED | executed as TC-VOID-NEG-02 |
| TC-CANCELHOLD-REG-01 | BLOCKED | executed as TC-CANCELHOLD-REG-01 |
| TC-CANCELHOLD-NEG-02 | PASS | executed as TC-CANCELHOLD-NEG-02 |
| TC-AUTH-SEC-01 | PASS | executed as TC-AUTH-SEC-01 |
| TC-AUTH-SEC-02 | PASS | executed as TC-AUTH-SEC-02 |
| TC-AUTH-SEC-03 | FAIL | executed as TC-AUTH-SEC-03 |
| TC-AUTH-SEC-04 | PASS | executed as TC-AUTH-SEC-04 |
| TC-SUPPLIER-BIZ-01 | PASS | executed as TC-SUPPLIER-BIZ-01 |
| TC-CAPCHECK-AirCairo-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-CAPCHECK-EgyptAir-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-CAPCHECK-Galileo-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-CAPCHECK-SpiceJet-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-CAPCHECK-GLC-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-CAPCHECK-Indigo-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-CAPCHECK-ElJazeera-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-CAPCHECK-OmainAir-01 | N/A | Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only |
| TC-VERSIONDIFF-BIZ-01 | PASS | executed as TC-VERSIONDIFF-BIZ-01 |
| TC-VERSIONDIFF-VAL-01 | PASS | executed as TC-VERSIONDIFF-VAL-01 |
| TC-VERSIONDIFF-NEG-01 | FAIL | executed as TC-VERSIONDIFF-NEG-01 |
| TC-VERSIONDIFF-NEG-02 | PASS | executed as TC-VERSIONDIFF-NEG-02 |
| TC-VERSIONDIFF-VAL-03 | PASS | executed as TC-VERSIONDIFF-VAL-03 |
| TC-VERSIONDIFF-VAL-04 | PASS | executed as TC-VERSIONDIFF-VAL-04 |
| TC-VERSIONDIFF-VAL-05 | PASS | executed as TC-VERSIONDIFF-VAL-05 |

## v2

| Row | Status | Note |
|---|---|---|
| FLOW-V2-25 | PASS | executed as FLOW-V2-25 |
| FLOW-V2-25-NEG | PASS | executed as FLOW-V2-25-NEG |
| FLOW-V2-26 | PASS | executed as FLOW-V2-26 |
| FLOW-V2-26-NEG | FAIL | executed as FLOW-V2-26-NEG |
| FLOW-V2-27 | BLOCKED | executed as FLOW-V2-27 |
| FLOW-V2-27-NEG | PASS | executed as FLOW-V2-27-NEG |
| FLOW-V2-28 | PASS | executed as FLOW-V2-28 |
| FLOW-V2-28-NEG | FAIL | executed as FLOW-V2-28-NEG |
| FLOW-V2-29 | BLOCKED | executed as FLOW-V2-29 |
| FLOW-V2-29-NEG | MAPPED | same assertion as FLOW-V2-27-NEG (executed once) |
| FLOW-V2-30 | BLOCKED | executed as FLOW-V2-30 |
| FLOW-V2-30-NEG | BLOCKED | executed as FLOW-V2-30-NEG |
| FLOW-V2-31 | FAIL | executed as FLOW-V2-31 |
| FLOW-V2-31-NEG | BLOCKED | executed as FLOW-V2-31-NEG |
| FLOW-V2-32 | PASS | executed as FLOW-V2-32 |
| FLOW-V2-32-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-33 | BLOCKED | executed as FLOW-V2-33 |
| FLOW-V2-33-NEG | MAPPED | same assertion as TC-BOOK-NEG-04 (executed once) |
| FLOW-V2-34 | PASS | executed as FLOW-V2-34 |
| FLOW-V2-34-NEG | FAIL | executed as FLOW-V2-34-NEG |
| FLOW-V2-35 | BLOCKED | executed as FLOW-V2-35 |
| FLOW-V2-35-NEG | BLOCKED | executed as FLOW-V2-35-NEG |
| FLOW-V2-36 | BLOCKED | executed as FLOW-V2-36 |
| FLOW-V2-36-NEG | MAPPED | same assertion as TC-CANCELHOLD-NEG-01 (executed once) |
| FLOW-V2-37 | PASS | executed as FLOW-V2-37 |
| FLOW-V2-37-NEG | MAPPED | same assertion as TC-FARECHECK-NEG-01 (executed once) |
| FLOW-V2-38 | PASS | executed as FLOW-V2-38 |
| FLOW-V2-38-NEG | MAPPED | same assertion as TC-HOLD-NEG-01 (executed once) |
| FLOW-V2-39 | BLOCKED | executed as FLOW-V2-39 |
| FLOW-V2-39-NEG | MAPPED | same assertion as TC-FARECHECK-BND-01 (executed once) |
| FLOW-V2-40 | PASS | executed as FLOW-V2-40 |
| FLOW-V2-40-NEG | PASS | executed as FLOW-V2-40-NEG |
| FLOW-V2-41 | BLOCKED | executed as FLOW-V2-41 |
| FLOW-V2-41-NEG | MAPPED | same assertion as FLOW-V2-34-NEG (executed once) |
| FLOW-V2-42 | BLOCKED | executed as FLOW-V2-42 |
| FLOW-V2-42-NEG | BLOCKED | executed as FLOW-V2-42-NEG |
| FLOW-V2-43 | PASS | executed as FLOW-V2-43 |
| FLOW-V2-43-NEG | MAPPED | same assertion as TC-ANCILLARY-NEG-01 (executed once) |
| FLOW-V2-44 | PASS | executed as FLOW-V2-44 |
| FLOW-V2-44-NEG | MAPPED | same assertion as FLOW-V2-26-NEG (executed once) |
| FLOW-V2-45 | BLOCKED | executed as FLOW-V2-45 |
| FLOW-V2-45-NEG | MAPPED | same assertion as TC-VOID-NEG-01 (executed once) |
| FLOW-V2-46 | PASS | executed as FLOW-V2-46 |
| FLOW-V2-46-NEG | PASS | executed as FLOW-V2-46-NEG |
| FLOW-V2-47 | BLOCKED | executed as FLOW-V2-47 |
| FLOW-V2-47-NEG | MAPPED | same assertion as FLOW-V2-27-NEG (executed once) |
| FLOW-V2-48 | BLOCKED | executed as FLOW-V2-48 |
| FLOW-V2-48-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-49 | PASS | executed as FLOW-V2-49 |
| FLOW-V2-49-NEG | MAPPED | same assertion as TC-SEATMAP-NEG-01 (executed once) |
| FLOW-V2-50 | PASS | executed as FLOW-V2-50 |
| FLOW-V2-50-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-51 | BLOCKED | executed as FLOW-V2-51 |
| FLOW-V2-51-NEG | MAPPED | same assertion as FLOW-V2-35-NEG (executed once) |
| FLOW-V2-52 | PASS | executed as FLOW-V2-52 |
| FLOW-V2-52-NEG | MAPPED | same assertion as FLOW-V2-34-NEG (executed once) |
| FLOW-V2-53 | BLOCKED | executed as FLOW-V2-53 |
| FLOW-V2-53-NEG | BLOCKED | executed as FLOW-V2-53-NEG |
| FLOW-V2-54 | BLOCKED | executed as FLOW-V2-54 |
| FLOW-V2-54-NEG | MAPPED | same assertion as TC-CANCELHOLD-NEG-01 (executed once) |
| FLOW-V2-55 | PASS | executed as FLOW-V2-55 |
| FLOW-V2-55-NEG | MAPPED | same assertion as TC-ADDPAX-NEG-01 (executed once) |
| FLOW-V2-56 | PASS | executed as FLOW-V2-56 |
| FLOW-V2-56-NEG | MAPPED | same assertion as TC-ADDPAX-VAL-01 (executed once) |
| FLOW-V2-57 | BLOCKED | executed as FLOW-V2-57 |
| FLOW-V2-57-NEG | MAPPED | same assertion as FLOW-V2-27-NEG (executed once) |
| FLOW-V2-58 | PASS | executed as FLOW-V2-58 |
| FLOW-V2-58-NEG | MAPPED | same assertion as TC-ADDPAX-NEG-01 (executed once) |
| FLOW-V2-59 | BLOCKED | executed as FLOW-V2-59 |
| FLOW-V2-59-NEG | MAPPED | same assertion as FLOW-V2-34-NEG (executed once) |
| FLOW-V2-60 | BLOCKED | executed as FLOW-V2-60 |
| FLOW-V2-60-NEG | MAPPED | same assertion as FLOW-V2-42-NEG (executed once) |
| FLOW-V2-61 | PASS | executed as FLOW-V2-61 |
| FLOW-V2-61-NEG | MAPPED | same assertion as TC-FARECHECK-BND-01 (executed once) |
| FLOW-V2-62 | PASS | executed as FLOW-V2-62 |
| FLOW-V2-62-NEG | PASS | executed as FLOW-V2-62-NEG |
| FLOW-V2-63 | BLOCKED | executed as FLOW-V2-63 |
| FLOW-V2-63-NEG | MAPPED | same assertion as FLOW-V2-34-NEG (executed once) |
| FLOW-V2-64 | PASS | executed as FLOW-V2-64 |
| FLOW-V2-64-NEG | MAPPED | same assertion as FLOW-V2-34-NEG (executed once) |
| FLOW-V2-65 | BLOCKED | executed as FLOW-V2-65 |
| FLOW-V2-65-NEG | MAPPED | same assertion as TC-FARECHECK-BND-01 (executed once) |
| FLOW-V2-66 | BLOCKED | executed as FLOW-V2-66 |
| FLOW-V2-66-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-67 | PASS | executed as FLOW-V2-67 |
| FLOW-V2-67-NEG | MAPPED | same assertion as TC-ADDPAX-VAL-01 (executed once) |
| FLOW-V2-68 | PASS | executed as FLOW-V2-68 |
| FLOW-V2-68-NEG | MAPPED | same assertion as FLOW-V2-46-NEG (executed once) |
| FLOW-V2-69 | BLOCKED | executed as FLOW-V2-69 |
| FLOW-V2-69-NEG | BLOCKED | executed as FLOW-V2-69-NEG |
| FLOW-V2-70 | PASS | executed as FLOW-V2-70 |
| FLOW-V2-70-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-71 | BLOCKED | executed as FLOW-V2-71 |
| FLOW-V2-71-NEG | MAPPED | same assertion as FLOW-V2-69-NEG (executed once) |
| FLOW-V2-72 | BLOCKED | executed as FLOW-V2-72 |
| FLOW-V2-72-NEG | MAPPED | same assertion as TC-CANCELHOLD-NEG-01 (executed once) |
| FLOW-V2-73 | BLOCKED | executed as FLOW-V2-73 |
| FLOW-V2-73-NEG | N/A | Premise is the FlyCham supplier: other supplier |
| FLOW-V2-74 | BLOCKED | executed as FLOW-V2-74 |
| FLOW-V2-74-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-75 | BLOCKED | executed as FLOW-V2-75 |
| FLOW-V2-75-NEG | PASS | executed as FLOW-V2-75-NEG |
| FLOW-V2-76 | BLOCKED | executed as FLOW-V2-76 |
| FLOW-V2-76-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-77 | BLOCKED | executed as FLOW-V2-77 |
| FLOW-V2-77-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-78 | BLOCKED | executed as FLOW-V2-78 |
| FLOW-V2-78-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-79 | BLOCKED | executed as FLOW-V2-79 |
| FLOW-V2-79-NEG | MAPPED | same assertion as FLOW-V2-75-NEG (executed once) |
| FLOW-V2-80 | BLOCKED | executed as FLOW-V2-80 |
| FLOW-V2-80-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-81 | BLOCKED | executed as FLOW-V2-81 |
| FLOW-V2-81-NEG | MAPPED | same assertion as FLOW-V2-75-NEG (executed once) |
| FLOW-V2-82 | BLOCKED | executed as FLOW-V2-82 |
| FLOW-V2-82-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-83 | BLOCKED | executed as FLOW-V2-83 |
| FLOW-V2-83-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-84 | BLOCKED | executed as FLOW-V2-84 |
| FLOW-V2-84-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-85 | BLOCKED | executed as FLOW-V2-85 |
| FLOW-V2-85-NEG | MAPPED | same assertion as TC-FARECHECK-NEG-01 (executed once) |
| FLOW-V2-86 | BLOCKED | executed as FLOW-V2-86 |
| FLOW-V2-86-NEG | MAPPED | same assertion as FLOW-V2-46-NEG (executed once) |
| FLOW-V2-87 | BLOCKED | executed as FLOW-V2-87 |
| FLOW-V2-87-NEG | MAPPED | same assertion as TC-FARECHECK-NEG-01 (executed once) |
| FLOW-V2-88 | BLOCKED | executed as FLOW-V2-88 |
| FLOW-V2-88-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-89 | BLOCKED | executed as FLOW-V2-89 |
| FLOW-V2-89-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-90 | BLOCKED | executed as FLOW-V2-90 |
| FLOW-V2-90-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-91 | BLOCKED | executed as FLOW-V2-91 |
| FLOW-V2-91-NEG | N/A | Premise is the FlyCham supplier: other supplier |
| FLOW-V2-92 | BLOCKED | executed as FLOW-V2-92 |
| FLOW-V2-92-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-93 | BLOCKED | executed as FLOW-V2-93 |
| FLOW-V2-93-NEG | MAPPED | same assertion as TC-FARECHECK-NEG-01 (executed once) |
| FLOW-V2-94 | BLOCKED | executed as FLOW-V2-94 |
| FLOW-V2-94-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-95 | BLOCKED | executed as FLOW-V2-95 |
| FLOW-V2-95-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-96 | BLOCKED | executed as FLOW-V2-96 |
| FLOW-V2-96-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-97 | BLOCKED | executed as FLOW-V2-97 |
| FLOW-V2-97-NEG | MAPPED | same assertion as FLOW-V2-75-NEG (executed once) |
| FLOW-V2-98 | BLOCKED | executed as FLOW-V2-98 |
| FLOW-V2-98-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-99 | BLOCKED | executed as FLOW-V2-99 |
| FLOW-V2-99-NEG | MAPPED | same assertion as FLOW-V2-75-NEG (executed once) |
| FLOW-V2-100 | BLOCKED | executed as FLOW-V2-100 |
| FLOW-V2-100-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-101 | BLOCKED | executed as FLOW-V2-101 |
| FLOW-V2-101-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-102 | BLOCKED | executed as FLOW-V2-102 |
| FLOW-V2-102-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-103 | BLOCKED | executed as FLOW-V2-103 |
| FLOW-V2-103-NEG | MAPPED | same assertion as FLOW-V2-75-NEG (executed once) |
| FLOW-V2-104 | BLOCKED | executed as FLOW-V2-104 |
| FLOW-V2-104-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-105 | BLOCKED | executed as FLOW-V2-105 |
| FLOW-V2-105-NEG | N/A | Premise is the FlyCham supplier: other supplier |
| FLOW-V2-106 | BLOCKED | executed as FLOW-V2-106 |
| FLOW-V2-106-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-107 | BLOCKED | executed as FLOW-V2-107 |
| FLOW-V2-107-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-108 | BLOCKED | executed as FLOW-V2-108 |
| FLOW-V2-108-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-109 | BLOCKED | executed as FLOW-V2-109 |
| FLOW-V2-109-NEG | MAPPED | same assertion as TC-FARECHECK-NEG-01 (executed once) |
| FLOW-V2-110 | BLOCKED | executed as FLOW-V2-110 |
| FLOW-V2-110-NEG | MAPPED | same assertion as FLOW-V2-46-NEG (executed once) |
| FLOW-V2-111 | BLOCKED | executed as FLOW-V2-111 |
| FLOW-V2-111-NEG | MAPPED | same assertion as TC-FARECHECK-NEG-01 (executed once) |
| FLOW-V2-112 | BLOCKED | executed as FLOW-V2-112 |
| FLOW-V2-112-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-113 | BLOCKED | executed as FLOW-V2-113 |
| FLOW-V2-113-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-114 | BLOCKED | executed as FLOW-V2-114 |
| FLOW-V2-114-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| FLOW-V2-115 | BLOCKED | executed as FLOW-V2-115 |
| FLOW-V2-115-NEG | N/A | Premise is the FlyCham supplier: other supplier |
| FLOW-V2-116 | BLOCKED | executed as FLOW-V2-116 |
| FLOW-V2-116-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-117 | BLOCKED | executed as FLOW-V2-117 |
| FLOW-V2-117-NEG | MAPPED | same assertion as TC-FARECHECK-NEG-01 (executed once) |
| FLOW-V2-118 | BLOCKED | executed as FLOW-V2-118 |
| FLOW-V2-118-NEG | MAPPED | same assertion as FLOW-V2-28-NEG (executed once) |
| FLOW-V2-119 | BLOCKED | executed as FLOW-V2-119 |
| FLOW-V2-119-NEG | N/A | Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true |
| FLOW-V2-120 | BLOCKED | executed as FLOW-V2-120 |
| FLOW-V2-120-NEG | MAPPED | same assertion as FLOW-V2-30-NEG (executed once) |
| TC-ADDPAX-POS-01 | PASS | executed as TC-ADDPAX-POS-01 |
| TC-ADDPAX-NEG-01 | PASS | executed as TC-ADDPAX-NEG-01 |
| TC-ADDPAX-NEG-02 | PASS | executed as TC-ADDPAX-NEG-02 |
| TC-ADDPAX-VAL-01 | PASS | executed as TC-ADDPAX-VAL-01 |
| TC-ADDPAX-BND-01 | PASS | executed as TC-ADDPAX-BND-01 |
| TC-ANCILLARY-POS-01 | PASS | executed as TC-ANCILLARY-POS-01 |
| TC-ANCILLARY-NEG-01 | BLOCKED | executed as TC-ANCILLARY-NEG-01 |
| TC-ANCILLARY-VAL-01 | PASS | executed as TC-ANCILLARY-VAL-01 |
| TC-ANCILLARY-BND-01 | PASS | executed as TC-ANCILLARY-BND-01 |
| TC-SEATMAP-POS-01 | PASS | executed as TC-SEATMAP-POS-01 |
| TC-SEATMAP-NEG-01 | PASS | executed as TC-SEATMAP-NEG-01 |
| TC-SEATMAP-VAL-01 | PASS | executed as TC-SEATMAP-VAL-01 |
| TC-FARECHECK-POS-01 | PASS | executed as TC-FARECHECK-POS-01 |
| TC-FARECHECK-NEG-01 | PASS | executed as TC-FARECHECK-NEG-01 |
| TC-FARECHECK-INT-01 | PASS | executed as TC-FARECHECK-INT-01 |
| TC-FARECHECK-BND-01 | PASS | executed as TC-FARECHECK-BND-01 |
| TC-HOLD-NEG-01 | PASS | executed as TC-HOLD-NEG-01 |
| TC-CANCELHOLD-NEG-01 | PASS | executed as TC-CANCELHOLD-NEG-01 |
| TC-VOID-NEG-01 | BLOCKED | executed as TC-VOID-NEG-01 |
| TC-BUNDLE-VAL-01 | PASS | executed as TC-BUNDLE-VAL-01 |

## seat

| Row | Status | Note |
|---|---|---|
| TC-SEATMAP-POS-02 | PASS | executed as TC-SEATMAP-POS-02 |
| TC-SEATMAP-VAL-03 | PASS | executed as TC-SEATMAP-VAL-03 |
| TC-SEATMAP-VAL-04 | FAIL | executed as TC-SEATMAP-VAL-04 |
| TC-SEATMAP-BND-02 | PASS | executed as TC-SEATMAP-BND-02 |
| TC-SEATMAP-BIZ-02 | PASS | executed as TC-SEATMAP-BIZ-02 |
| TC-SEATMAP-REG-02 | PASS | executed as TC-SEATMAP-REG-02 |
| TC-BOOK-POS-03 | PASS | executed as TC-BOOK-POS-03 |
| TC-BOOK-NEG-05 | FAIL | executed as TC-BOOK-NEG-05 |
| TC-BOOK-NEG-06 | PASS | executed as TC-BOOK-NEG-06 |
| TC-BOOK-VAL-06 | PASS | executed as TC-BOOK-VAL-06 |
| TC-BOOK-BIZ-04 | PASS | executed as TC-BOOK-BIZ-04 |
| TC-BOOK-INT-03 | PASS | executed as TC-BOOK-INT-03 |
| TC-BOOK-BND-03 | PASS | executed as TC-BOOK-BND-03 |
| TC-BOOK-REG-02 | PASS | executed as TC-BOOK-REG-02 |
| TC-SEATAFTERHOLD-POS-01 | BLOCKED | executed as TC-SEATAFTERHOLD-POS-01 |
| TC-SEATAFTERHOLD-VAL-01 | BLOCKED | executed as TC-SEATAFTERHOLD-VAL-01 |
| TC-SEATAFTERHOLD-NEG-01 | BLOCKED | executed as TC-SEATAFTERHOLD-NEG-01 |
| TC-SEATAFTERHOLD-NEG-02 | BLOCKED | executed as TC-SEATAFTERHOLD-NEG-02 |
| TC-SEATAFTERHOLD-SEC-02 | BLOCKED | executed as TC-SEATAFTERHOLD-SEC-02 |
| TC-SEATAFTERHOLD-INT-04 | BLOCKED | executed as TC-SEATAFTERHOLD-INT-04 |
| FLOW-V2-49-SEATFIELD | PASS | executed as FLOW-V2-49-SEATFIELD |
| FLOW-V2-50-SEATFIELD | PASS | executed as FLOW-V2-50-SEATFIELD |
| FLOW-V2-CANDIDATE-SM-HOLD-01 | BLOCKED | executed as FLOW-V2-CANDIDATE-SM-HOLD-01 |
| FLOW-V2-CANDIDATE-SM-HOLD-02 | BLOCKED | executed as FLOW-V2-CANDIDATE-SM-HOLD-02 |
| FLOW-V2-CANDIDATE-SM-HOLD-03 | BLOCKED | executed as FLOW-V2-CANDIDATE-SM-HOLD-03 |
| FLOW-V2-CANDIDATE-SM-HOLD-01-NEG | BLOCKED | executed as FLOW-V2-CANDIDATE-SM-HOLD-01-NEG |
| TC-BOOK-BIZ-05 | PASS | executed as TC-BOOK-BIZ-05 |
| TC-BOOK-NEG-07 | PASS | executed as TC-BOOK-NEG-07 |
| TC-BOOK-NEG-08 | PASS | executed as TC-BOOK-NEG-08 |
| TC-BOOK-BIZ-06 | PASS | executed as TC-BOOK-BIZ-06 |
| TC-BOOK-NEG-09 | BLOCKED | executed as TC-BOOK-NEG-09 |
| TC-BOOK-VAL-07 | PASS | executed as TC-BOOK-VAL-07 |
| TC-BOOK-BIZ-07 | BLOCKED | executed as TC-BOOK-BIZ-07 |
| TC-BOOK-VAL-08 | PASS | executed as TC-BOOK-VAL-08 |
| TC-BOOK-REG-03 | PASS | executed as TC-BOOK-REG-03 |
| TC-BOOK-NEG-10 | PASS | executed as TC-BOOK-NEG-10 |
| TC-BOOK-NEG-11 | PASS | executed as TC-BOOK-NEG-11 |
| TC-BOOK-NEG-12 | FAIL | executed as TC-BOOK-NEG-12 |
| TC-SEATMAP-VAL-05 | PASS | executed as TC-SEATMAP-VAL-05 |
| TC-SEATMAP-BND-03 | PASS | executed as TC-SEATMAP-BND-03 |
| TC-SEATMAP-VAL-06 | PASS | executed as TC-SEATMAP-VAL-06 |
| TC-RETRIEVE-REG-01 | PASS | executed as TC-RETRIEVE-REG-01 |
| TC-BOOK-INT-04 | PASS | executed as TC-BOOK-INT-04 |
| TC-SEATAFTERHOLD-VAL-02 | BLOCKED | executed as TC-SEATAFTERHOLD-VAL-02 |
| TC-SEATMAP-POS-01 | PASS | executed as TC-SEATMAP-POS-01 |
| TC-SEATMAP-NEG-01 | PASS | executed as TC-SEATMAP-NEG-01 |
| TC-SEATMAP-NEG-02 | PASS | executed as TC-SEATMAP-NEG-02 |
| TC-SEATMAP-NEG-03 | FAIL | executed as TC-SEATMAP-NEG-03 |
| TC-SEATMAP-NEG-04 | FAIL | executed as TC-SEATMAP-NEG-04 |
| TC-SEATMAP-NEG-05 | BLOCKED | executed as TC-SEATMAP-NEG-05 |
| TC-SEATMAP-VAL-07 | PASS | executed as TC-SEATMAP-VAL-07 |
| TC-SEATMAP-VAL-08 | FAIL | executed as TC-SEATMAP-VAL-08 |
| TC-SEATMAP-VAL-09 | PASS | executed as TC-SEATMAP-VAL-09 |
| TC-SEATMAP-VAL-10 | PASS | executed as TC-SEATMAP-VAL-10 |
| TC-SEATMAP-BIZ-03 | FAIL | executed as TC-SEATMAP-BIZ-03 |
| TC-SEATMAP-BIZ-04 | PASS | executed as TC-SEATMAP-BIZ-04 |
| TC-SEATMAP-SEC-01 | PASS | executed as TC-SEATMAP-SEC-01 |
| TC-SEATMAP-SEC-02 | PASS | executed as TC-SEATMAP-SEC-02 |
| TC-SEATMAP-INT-02 | BLOCKED | executed as TC-SEATMAP-INT-02 |
| TC-SEATMAP-INT-03 | PASS | executed as TC-SEATMAP-INT-03 |
| TC-SEATMAP-VAL-11 | PASS | executed as TC-SEATMAP-VAL-11 |
| TC-SEATMAP-BND-04 | PASS | executed as TC-SEATMAP-BND-04 |
| TC-BOOK-POS-04 | PASS | executed as TC-BOOK-POS-04 |

## void

| Row | Status | Note |
|---|---|---|
| TC-CAPCHECK-VOIDCAP-01 | PASS | executed as TC-CAPCHECK-VOIDCAP-01 |
| TC-CAPCHECK-VOIDCAP-02 | PASS | executed as TC-CAPCHECK-VOIDCAP-02 |
| TC-CAPCHECK-VOIDCAP-03 | PASS | executed as TC-CAPCHECK-VOIDCAP-03 |
| TC-VOIDCAP-VAL-01 | PASS | executed as TC-VOIDCAP-VAL-01 |
| TC-VOIDCAP-VAL-02 | PASS | executed as TC-VOIDCAP-VAL-02 |
| TC-VOIDCAP-VAL-03 | PASS | executed as TC-VOIDCAP-VAL-03 |
| TC-VOIDCAP-VAL-04 | PASS | executed as TC-VOIDCAP-VAL-04 |
| TC-VOIDCAP-VAL-05 | FAIL | executed as TC-VOIDCAP-VAL-05 |
| TC-VOIDCAP-VAL-06 | PASS | executed as TC-VOIDCAP-VAL-06 |
| TC-VOIDCAP-VAL-07 | PASS | executed as TC-VOIDCAP-VAL-07 |
| TC-VOIDCAP-POS-01 | N/A | Supplier-specific mapping row for another supplier (SabreNdc, TravelportNdc, GulfAir, Amadeus, FlyAdeal, EgyptAir/OmanAir/AirCairo): scoped to AirArabiaPlus |
| TC-VOIDCAP-POS-02 | N/A | Supplier-specific mapping row for another supplier (SabreNdc, TravelportNdc, GulfAir, Amadeus, FlyAdeal, EgyptAir/OmanAir/AirCairo): scoped to AirArabiaPlus |
| TC-VOIDCAP-POS-03 | N/A | Supplier-specific mapping row for another supplier (SabreNdc, TravelportNdc, GulfAir, Amadeus, FlyAdeal, EgyptAir/OmanAir/AirCairo): scoped to AirArabiaPlus |
| TC-VOIDCAP-POS-04 | N/A | Supplier-specific mapping row for another supplier (SabreNdc, TravelportNdc, GulfAir, Amadeus, FlyAdeal, EgyptAir/OmanAir/AirCairo): scoped to AirArabiaPlus |
| TC-VOIDCAP-POS-05 | N/A | Supplier-specific mapping row for another supplier (SabreNdc, TravelportNdc, GulfAir, Amadeus, FlyAdeal, EgyptAir/OmanAir/AirCairo): scoped to AirArabiaPlus |
| TC-VOIDCAP-POS-06 | N/A | Supplier-specific mapping row for another supplier (SabreNdc, TravelportNdc, GulfAir, Amadeus, FlyAdeal, EgyptAir/OmanAir/AirCairo): scoped to AirArabiaPlus |
| TC-VOIDCAP-POS-07 | BLOCKED | executed as TC-VOIDCAP-POS-07 |
| TC-VOIDCAP-BIZ-01 | PASS | executed as TC-VOIDCAP-BIZ-01 |
| TC-VOIDCAP-BIZ-02 | FAIL | executed as TC-VOIDCAP-BIZ-02 |
| TC-VOIDCAP-BIZ-03 | BLOCKED | executed as TC-VOIDCAP-BIZ-03 |
| TC-VOIDCAP-BIZ-04 | PASS | executed as TC-VOIDCAP-BIZ-04 |
| TC-VOIDCAP-BIZ-05 | BLOCKED | executed as TC-VOIDCAP-BIZ-05 |
| TC-VOIDCAP-BIZ-06 | BLOCKED | executed as TC-VOIDCAP-BIZ-06 |
| TC-VOIDCAP-BND-01 | PASS | executed as TC-VOIDCAP-BND-01 |
| TC-VOIDCAP-BND-02 | PASS | executed as TC-VOIDCAP-BND-02 |
| TC-VOIDCAP-BND-03 | BLOCKED | executed as TC-VOIDCAP-BND-03 |
| TC-VOIDCAP-BND-04 | PASS | executed as TC-VOIDCAP-BND-04 |
| TC-VOIDCAP-BND-05 | PASS | executed as TC-VOIDCAP-BND-05 |
| TC-VOIDCAP-NEG-01 | PASS | executed as TC-VOIDCAP-NEG-01 |
| TC-VOIDCAP-NEG-02 | FAIL | executed as TC-VOIDCAP-NEG-02 |
| TC-VOIDCAP-NEG-03 | PASS | executed as TC-VOIDCAP-NEG-03 |
| TC-VOIDCAP-NEG-04 | BLOCKED | executed as TC-VOIDCAP-NEG-04 |
| TC-VOIDCAP-NEG-05 | BLOCKED | executed as TC-VOIDCAP-NEG-05 |
| TC-VOIDCAP-NEG-06 | PASS | executed as TC-VOIDCAP-NEG-06 |
| TC-VOIDCAP-NEG-07 | N/A | Name-mismatch suppliers (Indigo, ElJazeera, OmainAir): other suppliers |
| TC-VOIDCAP-NEG-08 | BLOCKED | executed as TC-VOIDCAP-NEG-08 |
| TC-VOIDCAP-VAL-08 | N/A | Compares V1 and V2 Book: V2 only by instruction |
| TC-VOIDCAP-VAL-09 | PASS | executed as TC-VOIDCAP-VAL-09 |
| TC-VOIDCAP-VAL-10 | PASS | executed as TC-VOIDCAP-VAL-10 |
| TC-VOIDCAP-VAL-11 | PASS | executed as TC-VOIDCAP-VAL-11 |
| TC-VOIDCAP-VAL-12 | FAIL | executed as TC-VOIDCAP-VAL-12 |
| TC-VOIDCAP-INT-01 | BLOCKED | executed as TC-VOIDCAP-INT-01 |
| TC-VOIDCAP-INT-02 | BLOCKED | executed as TC-VOIDCAP-INT-02 |
| TC-VOIDCAP-INT-03 | PASS | executed as TC-VOIDCAP-INT-03 |
| TC-VOIDCAP-SEC-01 | FAIL | executed as TC-VOIDCAP-SEC-01 |
| TC-VOIDCAP-SEC-02 | FAIL | executed as TC-VOIDCAP-SEC-02 |
| TC-VOIDCAP-SEC-03 | FAIL | executed as TC-VOIDCAP-SEC-03 |
| TC-VOIDCAP-SEC-04 | PASS | executed as TC-VOIDCAP-SEC-04 |
| TC-VOIDCAP-SEC-05 | PASS | executed as TC-VOIDCAP-SEC-05 |
| TC-VOIDCAP-SEC-06 | PASS | executed as TC-VOIDCAP-SEC-06 |
| TC-VOIDCAP-REG-01 | N/A | Regression of another supplier / other-supplier defects: scoped to AirArabiaPlus |
| TC-VOIDCAP-REG-02 | N/A | Regression of another supplier / other-supplier defects: scoped to AirArabiaPlus |
| TC-VOIDCAP-REG-03 | PASS | executed as TC-VOIDCAP-REG-03 |
| TC-VOIDCAP-REG-04 | PASS | executed as TC-VOIDCAP-REG-04 |
| TC-VOIDCAP-REG-05 | BLOCKED | executed as TC-VOIDCAP-REG-05 |
| TC-VOIDCAP-REG-06 | PASS | executed as TC-VOIDCAP-REG-06 |
| TC-VOIDCAP-REG-07 | N/A | Regression of another supplier / other-supplier defects: scoped to AirArabiaPlus |
| TC-VOIDCAP-REG-08 | N/A | Regression of another supplier / other-supplier defects: scoped to AirArabiaPlus |
| TC-VOIDCAP-REG-09 | N/A | Regression of another supplier / other-supplier defects: scoped to AirArabiaPlus |
| TC-VOIDCAP-REG-10 | PASS | executed as TC-VOIDCAP-REG-10 |
| TC-VOIDCAP-REG-11 | BLOCKED | executed as TC-VOIDCAP-REG-11 |
| FLOW-V1-03-VOIDCAP | N/A | V1 flow: V2 only by instruction |
| FLOW-V1-05-VOIDCAP | N/A | V1 flow: V2 only by instruction |
| FLOW-V2-27-VOIDCAP | BLOCKED | executed as FLOW-V2-27-VOIDCAP |
| FLOW-V2-29-VOIDCAP | BLOCKED | executed as FLOW-V2-29-VOIDCAP |
| FLOW-V1-03-VOIDCAP-UNSUP | N/A | V1 flow: V2 only by instruction |
| FLOW-V2-27-VOIDCAP-UNSUP | PASS | executed as FLOW-V2-27-VOIDCAP-UNSUP |

## amd

| Row | Status | Note |
|---|---|---|
| TC-CAPCHECK-AMD-01 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-POS-01 | PASS | executed as TC-PAXNAME-POS-01 |
| TC-PAXNAME-POS-02 | PASS | executed as TC-PAXNAME-POS-02 |
| TC-PAXNAME-POS-03 | PASS | executed as TC-PAXNAME-POS-03 |
| TC-PAXNAME-POS-04 | PASS | executed as TC-PAXNAME-POS-04 |
| TC-PAXNAME-POS-05 | PASS | executed as TC-PAXNAME-POS-05 |
| TC-PAXNAME-BND-01 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-02 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-03 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-04 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-05 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-06 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-07 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-08 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-09 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-10 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-11 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-12 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-13 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-14 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-15 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-16 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-17 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-18 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-19 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-20 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-21 | PASS | executed as TC-PAXNAME-BND-21 |
| TC-PAXNAME-BIZ-01 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-02 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-03 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-04 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-05 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-06 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-07 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-08 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-09 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-10 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-11 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-12 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-13 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-14 | PASS | executed as TC-PAXNAME-BIZ-14 |
| TC-PAXNAME-BIZ-15 | PASS | executed as TC-PAXNAME-BIZ-15 |
| TC-PAXNAME-BIZ-16 | PASS | executed as TC-PAXNAME-BIZ-16 |
| TC-PAXNAME-NEG-01 | PASS | executed as TC-PAXNAME-NEG-01 |
| TC-PAXNAME-NEG-02 | PASS | executed as TC-PAXNAME-NEG-02 |
| TC-PAXNAME-NEG-03 | PASS | executed as TC-PAXNAME-NEG-03 |
| TC-PAXNAME-NEG-04 | PASS | executed as TC-PAXNAME-NEG-04 |
| TC-PAXNAME-NEG-05 | PASS | executed as TC-PAXNAME-NEG-05 |
| TC-PAXNAME-NEG-06 | PASS | executed as TC-PAXNAME-NEG-06 |
| TC-PAXNAME-NEG-07 | PASS | executed as TC-PAXNAME-NEG-07 |
| TC-PAXNAME-NEG-08 | PASS | executed as TC-PAXNAME-NEG-08 |
| TC-PAXNAME-NEG-09 | PASS | executed as TC-PAXNAME-NEG-09 |
| TC-PAXNAME-NEG-10 | PASS | executed as TC-PAXNAME-NEG-10 |
| TC-PAXNAME-NEG-11 | PASS | executed as TC-PAXNAME-NEG-11 |
| TC-PAXNAME-NEG-12 | PASS | executed as TC-PAXNAME-NEG-12 |
| TC-PAXNAME-NEG-13 | PASS | executed as TC-PAXNAME-NEG-13 |
| TC-PAXNAME-NEG-14 | PASS | executed as TC-PAXNAME-NEG-14 |
| TC-PAXNAME-NEG-15 | FAIL | executed as TC-PAXNAME-NEG-15 |
| TC-PAXNAME-NEG-16 | PASS | executed as TC-PAXNAME-NEG-16 |
| TC-PAXNAME-VAL-01 | PASS | executed as TC-PAXNAME-VAL-01 |
| TC-PAXNAME-VAL-02 | PASS | executed as TC-PAXNAME-VAL-02 |
| TC-PAXNAME-VAL-03 | FAIL | executed as TC-PAXNAME-VAL-03 |
| TC-PAXNAME-VAL-04 | FAIL | executed as TC-PAXNAME-VAL-04 |
| TC-PAXNAME-VAL-05 | PASS | executed as TC-PAXNAME-VAL-05 |
| TC-PAXNAME-VAL-06 | PASS | executed as TC-PAXNAME-VAL-06 |
| TC-PAXNAME-VAL-07 | PASS | executed as TC-PAXNAME-VAL-07 |
| TC-PAXNAME-VAL-08 | PASS | executed as TC-PAXNAME-VAL-08 |
| TC-PAXNAME-VAL-09 | PASS | executed as TC-PAXNAME-VAL-09 |
| TC-PAXNAME-VAL-10 | PASS | executed as TC-PAXNAME-VAL-10 |
| TC-PAXNAME-VAL-11 | PASS | executed as TC-PAXNAME-VAL-11 |
| TC-PAXNAME-VAL-12 | PASS | executed as TC-PAXNAME-VAL-12 |
| TC-PAXNAME-VAL-13 | PASS | executed as TC-PAXNAME-VAL-13 |
| TC-PAXNAME-VAL-14 | PASS | executed as TC-PAXNAME-VAL-14 |
| TC-PAXNAME-VAL-15 | PASS | executed as TC-PAXNAME-VAL-15 |
| TC-PAXNAME-VAL-16 | PASS | executed as TC-PAXNAME-VAL-16 |
| TC-PAXNAME-VAL-17 | PASS | executed as TC-PAXNAME-VAL-17 |
| TC-PAXNAME-VAL-18 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-VAL-19 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-VAL-20 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-VAL-21 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-VAL-22 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-VAL-23 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-VAL-24 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-SEC-01 | PASS | executed as TC-PAXNAME-SEC-01 |
| TC-PAXNAME-SEC-02 | PASS | executed as TC-PAXNAME-SEC-02 |
| TC-PAXNAME-SEC-03 | PASS | executed as TC-PAXNAME-SEC-03 |
| TC-PAXNAME-SEC-04 | PASS | executed as TC-PAXNAME-SEC-04 |
| TC-PAXNAME-SEC-05 | PASS | executed as TC-PAXNAME-SEC-05 |
| TC-PAXNAME-SEC-06 | PASS | executed as TC-PAXNAME-SEC-06 |
| TC-PAXNAME-SEC-07 | PASS | executed as TC-PAXNAME-SEC-07 |
| TC-PAXNAME-SEC-08 | PASS | executed as TC-PAXNAME-SEC-08 |
| TC-PAXNAME-REG-01 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-POS-06 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-22 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BND-23 | N/A | Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus |
| TC-PAXNAME-BIZ-17 | PASS | executed as TC-PAXNAME-BIZ-17 |
| TC-PAXNAME-BIZ-18 | PASS | executed as TC-PAXNAME-BIZ-18 |
| TC-PAXNAME-BIZ-19 | FAIL | executed as TC-PAXNAME-BIZ-19 |
| TC-PAXNAME-BIZ-20 | PASS | executed as TC-PAXNAME-BIZ-20 |

## booking

| Row | Status | Note |
|---|---|---|
| OW-BAS-01 | PASS | executed as OW-BAS-01 |
| OW-BAS-02 | PASS | executed as OW-BAS-02 |
| OW-ANC-01 | PASS | executed as OW-ANC-01 |
| OW-ANC-02 | PASS | executed as OW-ANC-02 |
| OW-BUN-01 | PASS | executed as OW-BUN-01 |
| OW-BUN-02 | FAIL | executed as OW-BUN-02 |
| RT-BAS-01 | PASS | executed as RT-BAS-01 |
| RT-BAS-02 | PASS | executed as RT-BAS-02 |
| RT-ANC-01 | PASS | executed as RT-ANC-01 |
| RT-ANC-02 | PASS | executed as RT-ANC-02 |
| RT-BUN-01 | FAIL | executed as RT-BUN-01 |
| RT-BUN-02 | PASS | executed as RT-BUN-02 |
| OWC-BAS-01 | PASS | executed as OWC-BAS-01 |
| OWC-BAS-02 | PASS | executed as OWC-BAS-02 |
| OWC-ANC-01 | PASS | executed as OWC-ANC-01 |
| OWC-ANC-02 | PASS | executed as OWC-ANC-02 |
| OWC-BUN-01 | PASS | executed as OWC-BUN-01 |
| OWC-BUN-02 | PASS | executed as OWC-BUN-02 |
| RTC-BAS-01 | PASS | executed as RTC-BAS-01 |
| RTC-BAS-02 | PASS | executed as RTC-BAS-02 |
| RTC-ANC-01 | PASS | executed as RTC-ANC-01 |
| RTC-ANC-02 | PASS | executed as RTC-ANC-02 |
| RTC-BUN-01 | PASS | executed as RTC-BUN-01 |
| RTC-BUN-02 | PASS | executed as RTC-BUN-02 |

## added

| Row | Status | Note |
|---|---|---|
| TC-ROUTE-G9-SHJ-COK | PASS | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-G9-COK-SHJ | PASS | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-G9-AMM-SHJ | PASS | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-G9-SHJ-AMM | PASS | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-G9-MCT-SHJ | PASS | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-E5-CAI-MCT | FAIL | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-E5-HBE-BGY | FAIL | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-3O-SAW-CMN | FAIL | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-ROUTE-3O-CMN-SAW | FAIL | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-E5-BASE | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-E5-BUNDLE | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-E5-ANCILLARY | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-E5-SEATMAP | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-3O-BASE | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-3O-BUNDLE | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-3O-ANCILLARY | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-CARRIER-3O-SEATMAP | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-UPSELL-CAP-01 | BLOCKED | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-AUTH-SEC-05 | FAIL | added for the One-API change (reference routes / carriers / Upselling capability) |
| TC-AUTH-SEC-06 | FAIL | added for the One-API change (reference routes / carriers / Upselling capability) |
