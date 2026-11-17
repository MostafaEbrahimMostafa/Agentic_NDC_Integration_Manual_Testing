# Decisions and Lessons

Why we do things the way we do, and the mistakes that taught us. Each entry: what happened → the
rule we keep. Run keys (e.g. `AAP-R3`) are defined in the Run history of each supplier file.
Add new entries through the KB update step of `Update_Spec_From_Findings` (human-approved).

## Retracted findings and wrong assumptions

### L-01 — AirArabiaPlus BUG-01/02 were test-script gaps, not product bugs
- **What happened:** AAP-R1 filed "GetAncillary offers Meal only, no Baggage/Seat" and "Book ignores
  selectedBundles". AAP-R3 showed baggage is **journey-level**, seats come from **SeatMap**, and
  bundles must be sent on **GetAncillary** too. Both bugs were retracted. — 2026-11-08 / ne-6 / AAP-R3
- **Rule:** before filing "the API does not offer X", read Swagger (`/swagger/index.html`) and the
  sample requests in `Resources/Sample_API_Req&Res_*.md`. A missing field in the response may be in
  a different step or a different level (journey vs segment).

### L-02 — "Book total ≠ FareCheck total" was our omission
- **What happened:** connecting ANC cases showed Book = FareCheck + seats + 5% seat tax. Sending
  `passengersSelectedSeats` on FareCheck as well made the totals equal. — 2026-11-08 / ne-6 / AAP-R3
- **Rule:** send the same selections on every step that prices them before calling a price
  mismatch a defect.

### L-03 — Galileo "seat order dependence" was a harness mistake
- **What happened:** an early suspicion that seats depend on call order was retracted; the harness
  passed the wrong step's ids. — 2026-11-10 / ne-4 / GAL-R3
- **Rule:** pass the ids of the **last** enrichment call and ids exactly as returned (e.g. trailing `~`).

### L-04 — A build changed in the middle of a run (Build A vs Build B)
- **What happened:** SabreNdc VoidUnified Round 2: ~20 s of HTTP 500 on every call, then new
  `voidCapability` behaviour. Results before and after could not be mixed. — 2026-11-05 / ne-3 / SAB-VU2
  The same happened between SabreNdc Round 1 and 2 on 2026-10-25, and Galileo changed the
  SelectAvailability body between two runs on 2026-11-15.
- **Rule:** log build/version and timestamp on every run. If a deploy happens mid-run, keep the
  earlier data as a baseline and re-run everything on the final build. Never report a "fix" without
  saying which build it was seen on.

### L-05 — VoidUnified expectations are INFERRED, not facts
- **What happened:** `VoidUnified_TestCases.csv` was generated from a pasted story without running
  Analyze_User_Story; the unified `voidCapability` contract (values for unsupported suppliers, Hold,
  post-Void Retrieve) is assumed. — 2026-11-04 / — / VoidUnified generation
- **Rule:** a FAIL against an `INFERRED` expectation is reported as a question, not filed as a
  defect, until the team confirms the rule. Same applies to Re-Issue cases (contract not shared yet).

### L-06 — One empty Search is not "no inventory"
- **What happened:** the AirArabiaPlus sweep showed ~12 false-empty dates that returned offers on
  re-check. — 2026-11-09 / ne-6 / AAP-SWEEP
- **Rule:** re-check empties (other date, short delay) before concluding. Then decide BLOCKED vs
  defect: constant ~15 s then empty on every route (AirIndia ne-3) = silent supplier failure, a defect.

### L-07 — "Round 2" on an unchanged build
- **What happened:** a re-run 1 h later gave identical verdicts (GAL-R2). — 2026-11-10 / ne-4 / GAL-R2
- **Rule:** for a same-day re-run, run a quick delta probe first; if nothing changed, say "no change"
  honestly instead of re-running everything. If a re-test was just finished, report it instead of
  re-running (re-runs add leftover bookings). — 2026-11-16 / stg-ne / AAP-XLSX

## Process decisions ("why we do X")

### D-01 — Supplier-only scope
A run for one supplier's CSV sends nothing to other suppliers; cross-supplier rows are BLOCKED
(out of scope). Origin: TravelportNdc Void Round 2 (2026-10-27) created SabreNdc bookings and FlyNas
Voids for a regression row and the user stopped it. Exception: suites designed cross-supplier
(VoidUnified) — confirm first. If scope is ambiguous, ask.

### D-02 — "V1 AND V2" is literal
When the user says V1 and V2, run both; a "Both" row passes only if both pass. (Earlier runs used
"verdict follows V2"; changed 2026-10-27, TPN-VOID2.)

### D-03 — The test case is the unit, not the hop
Counts and pass rates are per TC-ID. Hops are nested evidence. (Generate_QA_Report contract.)

### D-04 — Never loosen a check to make a run green
When asked to "make all fails pass", the only honest levers are retries, other routes/dates and
correct flows — never weaker assertions. (AAP-R3.)

### D-05 — Bug IDs are per run (for now)
Each run numbers its bugs from BUG-01, and some suppliers have several series (SabreNdc Void vs
VoidUnified, AirIndia ne-3 vs R2, SeatMap shared by GulfAir/FlyAdeal/Galileo). Always quote
`<run key> : BUG-nn`. Since 2026-11-17 every real defect also gets a permanent `NDC-BUG-nnnn` in
`Artifacts/Bug_Registry.csv` (never reused), which lists all its per-run ids; quote the Global ID
when there is one. Bugs from runs before that date get a row when they are next re-tested or filed.

### D-06 — Leftover bookings are always listed
Every hold or ticket we cannot cancel goes into the report's Cleanup section. Some suppliers cannot
cancel at all through the API (Amadeus, AirArabiaPlus, AirIndia): keep positive booking cases few.

### D-07 — Facts in the KB carry a date, a host and a run
Suppliers change between builds and hosts (see L-04, Amadeus ne-3 vs ne-8). A fact without
`Last verified` cannot be trusted; older than 14 days → re-check.

## Toolkit lessons (short)

- Parallel load creates false failures: Sabre `ReachedTALimit`, Galileo timeouts, FlyAdeal
  `NoBookingInState`, TravelportNdc "FLIGHT IS LOCKED", AirArabiaPlus empty Search.
- Two processes writing one JSONL with truncate-and-rewrite corrupted a log (AAP-ONEAPI).
- Truncated JSONL bodies are not replayable; keep raw bodies separately (AAP-R1).
- Postman CLI 1.73: no `--output`; cannot override collection variables (`--env-var` sets only
  environment scope) — use a scratch copy of the collection (GAL-R1, AAP-R1).
- Shared pre-Book fixtures get consumed when a negative test is wrongly accepted — one chain per
  variant (AI-R2).
- A run-wide fact can invalidate earlier PASS rows; re-check BIZ-style rows at the end (SAB-VU1).
- Session scratchpad toolkits are lost between sessions; anything reusable belongs in `Harness/`.
