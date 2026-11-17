# Repro recipe format

A recipe describes one bug as **data**: which test data, which calls in which order, what the
response looks like when the bug is fixed, and what it looks like when the bug is still there.
The generic runner (`NDC_Integration/Harness/Retest/runner.js`) executes it; code, not the LLM,
decides the verdict.

- Bug recipes: `NDC_Integration/Harness/recipes/<GlobalId>.json`
- Neighbour flows (regression ring): `NDC_Integration/Harness/recipes/flows/FLOW-V2-<n>.json`,
  `<n>` = the flow number in SPEC.md §5.4. They inherit supplier, selector and test data from the
  bug recipe that lists them.
- Validate: `node NDC_Integration/Harness/Retest/recipe.js validate [<id>]`
- Approve (human decision, once): `node NDC_Integration/Harness/Retest/recipe.js approve <id> --by "<name>"`

## Example

```json
{
  "id": "NDC-BUG-0004",
  "title": "[V2][AirArabiaPlus][AddPassenger] – ParentPaxRefId Is Ignored: The Infant Is Attached to the First Adult",
  "source": "Resources/AirArabiaPlus_bugs.xlsx row 5; ADO 65513",
  "supplier": "AirArabiaPlus", "selector": "USA", "version": "V2",
  "testData": "TestData/AAP_2ADT1INF_AMM-SHJ_OW.json",
  "chain": [
    { "step": "Search", "offer": { "direct": true } },
    "FareConfirm",
    { "step": "AddPassenger", "infantParents": { "Pax3": "Pax2" } },
    "Hold",
    "Retrieve"
  ],
  "preconditions": [ { "step": "Hold", "path": "$.pnr", "op": "exists" } ],
  "assert": [
    { "step": "Hold", "path": "$.selectedOffer.passengerFareBreakdown[?(@.passengerTypeCode=='INF')].passengerRefId", "op": "equals", "value": "I3/A2" }
  ],
  "reproduces": [
    { "step": "Hold", "path": "$.selectedOffer.passengerFareBreakdown[?(@.passengerTypeCode=='INF')].passengerRefId", "op": "equals", "value": "I3/A1" }
  ],
  "fixedWhen": "all asserts pass",
  "neighbours": ["FLOW-V2-26"],
  "notes": "Why this chain, where the expected value comes from, known flakiness.",
  "approved": null
}
```

## Fields

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | The registry GlobalId (`NDC-BUG-nnnn`) or `FLOW-V2-<n>` |
| `title`, `source`, `notes` | recommended | Bug title; where the bug and the expected value come from (sheet row, bug report, SPEC §, KB fact); anything a reviewer must know |
| `supplier`, `selector`, `version` | yes (bug) | `version` must be `V2` (the runner has no V1 steps yet) |
| `testData` | yes (bug) | Path under `NDC_Integration/`, a fixture in the `Validate_TestData_Search` format (`searchCriteria[].offsetDays` + `passengers`). The pre-flight checks it |
| `chain` | yes | Ordered steps (below) |
| `preconditions` | no | Assertions that must hold for the test to mean anything. Any failure → **Blocked (env/data)** |
| `assert` | yes | The **fixed** state |
| `reproduces` | yes (bug) | The **bug signature** — the negative case. Without it a weak assertion could give a false "Fixed" |
| `fixedWhen` | yes (bug) | `all asserts pass` (default) or `any assert passes` |
| `attempts` | no | Re-run the whole chain up to N times while it stops early (e.g. a flaky FareCheck). Put booking steps after the flaky step so retries leave no PNR |
| `neighbours` | no | `"FLOW-V2-26"` or `{ "flow": "FLOW-V2-67", "stepOptions": { "GetOfferBundles": { "bundle": "66624" } } }` |
| `approved` | set by `recipe.js approve` | `{by, date, sha}`; an edit after approval makes the recipe `changed-after-approval` |

## Steps

A step is a name (`"FareConfirm"`) or an object `{ "step": "...", ...options }`. Ids flow
automatically: each step uses `responseId` / offer id from the latest step that returned them, and
booking steps use the `pnr` / `gdsPNR` / `bookingToken` of the last Hold/Book.

| Step | Options |
|---|---|
| `Search` | `offer: { direct, connecting, flags: { haveBundles: true, ... }, index }` picks the offer; `tries` (default 2 on the planned date); `dateShifts` (default `[0,1,3,7]` days) |
| `FareConfirm`, `Upselling`, `FareRules` | — |
| `GetOfferBundles` | `bundle: "66589"` (must be offered on every journey, else Blocked), or `prefer: [codes]`, or `pick: false` (call only) |
| `AddPassenger` | `infantParents: { "Pax3": "Pax2" }` (default: each INF under the next ADT) |
| `GetAncillary` | `meal: true \| false \| { price: 264.32 } \| { paid: true }`, `baggage: true \| false`, `select: false`, `reask` (default 2). A requested item not offered → Blocked |
| `SeatMap` | `select: false` to only read the map (default picks a normal Available seat per non-infant) |
| `FareCheck` | sends the picked ancillaries and seats |
| `Hold`, `Book` | sends bundles / ancillaries / seats picked earlier. **Booking steps** — need `--allow-booking` |
| `Retrieve`, `PnrReprice`, `BookAfterHold`, `CancelAfterHold`, `Void` | use the last booking. The last three are booking steps |

Common options on every step: `as` (alias, required when a step repeats), `override` (deep-merged
into the request body; `supplier` is forbidden, `credentialsSelector` is allowed), `headers` (e.g.
`{ "x-api-key": null }` removes the header), `allowFail: true` (a non-2xx answer does not stop the
chain — use it on the step under test).

A non-2xx answer on a step without `allowFail` stops the chain. Search/transport/5xx-gateway
failures and "requested item not offered" count as **environment** → Blocked; anything else means
the repro path itself broke → **Behaviour changed – needs review**.

## Assertions

`{ "step": "<alias>", "path": "<JSONPath>", "op": "<op>", "value": ..., "cmp": ..., "other": { "step", "path" } }`

Paths are evaluated on the scrubbed response. Special paths: `$status` (HTTP status), `$text` (raw
body), `$header.<name>`. The Search step also exposes the offer the chain picked as
`$._selectedOffer`.

JSONPath subset: `$.a.b`, `['a']`, `[0]`, `[-1]`, `[*]`, `.*` (array items or object values, so maps
like `passengersList` and `segmentDetails` work), `..key`, `[?(@.a=='x' && @.b>1)]`
(`== != < <= > >= =~`, `@.a` exists, `!@.a` missing). A missing key is no match; a `null` value is a
match with value `null`.

| op | Passes when |
|---|---|
| `exists` / `notExists` | at least one match / no match |
| `count` | number of matches `cmp` (`== != > >= < <=`) `value` |
| `equals` / `notEquals` | ≥1 match and all equal / none equal `value` (deep) |
| `in` / `notIn` / `anyIn` | all in / none in / some in the `value` list |
| `matches` / `notMatches` | regex `"/.../flags"` on every match (objects as JSON) |
| `allNull` | every match is null (true when nothing matches — pair it with a precondition) |
| `anyNull` / `allNotNull` / `anyNotNull` | as named (`allNotNull` needs ≥1 match) |
| `gt` `gte` `lt` `lte` | numeric (amount objects compare their `amount`) |
| `equalsStep` / `notEqualsStep` | the multiset of values equals / differs from `other.step` + `other.path`. If the other side has no value → not evaluable (Blocked) |

## Writing a good recipe (checklist before asking for approval)

1. The chain is the **shortest** path that shows the bug; prefer Hold over Book when the bug shows
   on both (no ticket left).
2. Every condition the bug needs (bundle code, meal price, occupied seats, infant) is either forced
   by a step option or checked by a precondition — so "condition not available" is **Blocked**, never
   **Fixed**.
3. `reproduces` describes the bug as observed (e.g. value `"None"`, status 409 + message), not just
   "not fixed".
4. `assert` describes the expected value with its source in `notes` (SPEC §, live-confirmed KB fact,
   or "bug sheet — not in SPEC"). An `INFERRED` expectation needs the user's explicit OK (CLAUDE.md
   rule 1).
5. Check it offline when captures exist: evaluate it against saved responses from the run that found
   the bug — the signature must match there.
