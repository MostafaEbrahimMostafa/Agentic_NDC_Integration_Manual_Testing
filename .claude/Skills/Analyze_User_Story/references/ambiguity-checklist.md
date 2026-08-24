# Ambiguity checklist and worked example

Reference material for the `analyze-user-story` skill. Match this shape and level of detail; don't
copy the specifics of the worked example onto an unrelated story.

## The seven ambiguity categories

Run every atomic claim through all seven — a claim can pass some and fail others.

1. **Functional completeness** — is the claim a concrete, testable rule, or an aspiration? Words like
   "gracefully," "properly," "as needed," "appropriately" are a tell: they name an outcome without
   naming the behavior that produces it.
2. **Field/data specificity** — for any data the claim says the API returns or accepts, are the exact
   field name, type, format, and units stated (or already in SPEC.md)? "Returns seat pricing" doesn't
   say currency, per-seat vs. total, or whether it's pre- or post-tax.
3. **Quantified NFRs** — non-functional adjectives need a number before they're testable: "real time"
   → what latency bound, or is it actually synchronous request/response vs. an async callback?
   "Multiple" → exactly which ones, from which roster?
4. **Scope/entity naming** — does the claim name specific suppliers, protocols, versions, or endpoints,
   or does it gesture at a category ("airline suppliers," "common protocols/formats")? Cross-check
   named entities against SPEC.md's actual rosters (§4.5 supplier roster, §1.2 supported APIs) rather
   than accepting the story's own list at face value if one is given.
5. **Error-handling detail** — "handles errors gracefully" needs: which error conditions, what status
   code/shape is returned, is it logged, is there a retry, does the caller see a different message than
   what's logged internally.
6. **Security specifics** — "securely authenticates" needs: which scheme (compare against SPEC.md
   §1.5's actual documented scheme — is the AC describing that scheme, or asking for something SPEC.md
   doesn't already have?), where credentials are stored, whether this is per-supplier or global.
7. **Version/supplier conditionality** — does the claim apply uniformly, or does SPEC.md already show
   this capability is conditional/unsupported for some suppliers (§4.4 conflicts, §4.6 matrix) or
   version-specific (§1.10, "*(V2 only)*" endpoint markers)? A claim stated as universal that SPEC.md
   shows is actually conditional is itself a flagged ambiguity, not something to silently narrow.

## Analysis output template

```markdown
# <Story Name> — Analysis

## Source
`NDC_Integration/Resources/<file>.md`, analyzed against `NDC_Integration/SPEC.md` (§ as of this read).

## Requirement mapping

| # | Claim (atomic) | SPEC.md mapping | Status |
|---|---|---|---|
| 1 | ... | §2.7 GetSeatMap | Mapped |
| 2 | ... | §2.7 (mechanism only) | Partially mapped |
| 3 | ... | none | Gap |

## Resolved questions
(Only after the user has answered — one bullet per question, with the answer.)

## Open questions
(Anything flagged but not yet answered — grouped by category, each tied to its claim #.)

## Flagged SPEC.md gaps
(Claims with no SPEC.md counterpart — state that a SPEC.md addition is a separate task, don't guess.)

## Testable Scope (for generate-test-cases)
- Endpoint(s): ...
- Flow number/range: ...
- Supplier(s): ...
- Category emphasis: ...
- Out-of-scope / needs SPEC.md first: ...
```

## Worked example — `NDC_Integration/Resources/SeatMap_UserStory.md`

Source ACs (verbatim):

1. The API returns the seat map for the selected flight.
2. The API returns available and unavailable seats.
3. The API returns seat attributes (e.g., window, aisle, extra legroom).
4. The API returns seat pricing for paid seats, where applicable.
5. The API allows the selected seat to be added to the booking before payment.
6. The API retrieves seat map data from the airline supplier in real time.
7. The API supports multiple airline Seat Map APIs and common protocols/formats (REST, SOAP, JSON, XML).
8. The API securely authenticates with airline supplier APIs.
9. The API handles supplier API errors gracefully and provides logging.

Mapping and ambiguity pass:

| # | SPEC.md mapping | Status | Ambiguity category triggered |
|---|---|---|---|
| 1 | §2.7 GetSeatMap | Mapped | none |
| 2 | §2.7 (seat map response shape) | Partially mapped | Field/data specificity — is availability a boolean, an enum, or inferred from seat presence/absence? |
| 3 | §2.7 (seat attributes) | Partially mapped | Field/data specificity — exact attribute enum/list not confirmed |
| 4 | §2.7 (pricing fields) | Partially mapped | Field/data specificity — currency, per-seat vs. total, tax treatment |
| 5 | §2.5 AddPassenger / §2.9 Book chain | Partially mapped | Scope/entity naming — which endpoint actually carries the seat selection forward, and at which hop |
| 6 | §2.7 | Ambiguous | Quantified NFRs — "real time" undefined: synchronous call latency bound, or does it mean "not cached"? |
| 7 | §1.2 Supported APIs | Ambiguous | Scope/entity naming — "multiple," "common protocols" don't name which suppliers/protocols; cross-check against §1.2 and §4.5 roster |
| 8 | §1.5 Authentication | Partially mapped | Security specifics — does this AC describe §1.5's existing scheme, or ask for something SPEC.md doesn't document? |
| 9 | §7.9 Error Handling | Ambiguous | Error-handling detail — no error codes, retry policy, or log-content spec named |

This is the density of question a real analysis should surface — roughly one clarifying question per
2–3 ACs on a story this size, not a single generic "any questions?" pass.
