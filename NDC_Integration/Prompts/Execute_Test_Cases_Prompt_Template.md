# Execute Test Cases — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to run test cases against a
live environment. This automatically triggers Generate_QA_Report (live persistence and the final
HTML report) and Generate_Bug_Report (for defects that pass the gate) as part of the same run — no
separate ask needed. Pipeline: `NDC_Integration/KB/03_Technical/Execution_Pipeline.md`.

---

Use Execute_Test_cases to run:

- **Scope**: `[A test-case file/set under NDC_Integration/TestCases/<folder>/, TC-IDs, an ad hoc
  endpoint (SPEC.md §2), or a flow number (SPEC.md §5.4)]`
- **Host**: **[KB short name (e.g. ne-3) or full URL — never left to a default]**
- **Supplier**: **[SupplierName]**
- **Credentials Selector**: **[Selector]**
- **Version**: **[V1 / V2 / V1 and V2]**
- **Run mode**: **[harness / postman-mcp]**
  - `postman-mcp` only: **Collection** `[name or UID]`, **Postman environment** `[name or id]`
- **Booking calls** (Book / BookAfterHold / Void / CancelAfterHold): **[allowed / not allowed]**

Execute the whole scope, in order, start to finish — never sample or stop partway to "check in"
unless I explicitly asked for a partial run. Before sending the first request, open this run's
disk artifacts via Generate_QA_Report. Report live, one test case at a time, with a running
pass/fail/blocked total after each — never batch results to the end.

When a result confirms a SPEC.md `UNKNOWN`, log a pending SPEC proposal (section, old text, new
text); it is applied only if I confirm. When a result contradicts SPEC.md, report it as a defect,
distinct from an `UNKNOWN`-confirmation.

Once the scope finishes (or the run stops early): run the defect gate, apply Generate_Bug_Report
to every defect it marks FILE, then render the QA report HTML, then summarise (counts, defects,
blocked, cleanup, links to the HTML report and bug folder).

**Hard stops — never proceed without my explicit authorization:**
- Book / BookAfterHold / Void / CancelAfterHold against a non-staging host
- a Postman environment named `Production` (MCP mode)
- printing/saving raw `supplierRequest`/`supplierResponse` debug fields or any API key
- an ambiguous supplier / host / credentialsSelector / version / run mode — ask once, then reuse
  the answer for the rest of the session

---

## Notes for filling this in

- Scope — name the test-case file under its feature folder (e.g.
  `TestCases/Void/SabreNdc_Void_TestCases.csv`), or describe the endpoint/flow directly.
- Host — always named. Whether it is staging comes from `KB/03_Technical/Environments.md`;
  `ndc-supplier-integration` is not staging.
- Run mode:
  - `harness` — one TC-ID at a time, full request/response evidence. Use it for CSV runs,
    TC-IDs, flows and anything you may file bugs from.
  - `postman-mcp` — the CSV is run through a Postman collection with one `runCollection` call
    (always the whole collection), and each TC-ID is judged on its Expected Result. Setup, IDs
    and limits: `KB/03_Technical/Postman_MCP_Guide.md`. A FAIL worth a bug is reproduced with the
    harness before it is filed.
- Family-B flow executions leave a live Held booking behind — the run's Cleanup section will
  log the `pnr`; don't skip reading it.
- After the run, if any SPEC.md proposal is still pending, run
  `Update_Spec_From_Findings_Prompt_Template.md` to reconcile it.

Example (harness):

```
Use Execute_Test_cases to run TestCases/Void/SabreNdc_Void_TestCases.csv for SabreNdc, selector EGY,
host ne-3, V1 and V2, run mode harness, booking allowed
```

Example (postman-mcp):

```
Use Execute_Test_cases to run TestCases/_Generic/TestCases_V2.csv through Postman collection
NDC_Integrations_Staging_V2 with environment STAG_ENV, run mode postman-mcp, for SabreNdc,
selector EGY, host ne-3, V2, booking not allowed
```
