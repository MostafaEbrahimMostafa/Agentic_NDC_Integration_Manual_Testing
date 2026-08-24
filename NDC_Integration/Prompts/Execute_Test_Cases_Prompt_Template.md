# Execute Test Cases — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to run test cases against a
live environment. This automatically triggers Generate_QA_Report (live persistence) and
Generate_Bug_Report (for any defects) as part of the same run — no separate ask needed.

---

Use Execute_Test_cases to run:

- **Scope**: `[A test-case file/set under NDC_Integration/TestCases/, an ad hoc endpoint
  (SPEC.md §2), or a flow number (SPEC.md §5.4)]`
- **Environment**: **[staging (default) / other — name it explicitly]**
- **Supplier**: **[SupplierName]**
- **Credentials Selector**: **[Selector]**

Execute the whole scope, in order, start to finish — never sample or stop partway to "check in"
unless I explicitly asked for a partial run. Before sending the first request, open this run's
disk artifacts via Generate_QA_Report. Report live, one step/test case at a time, with a
running pass/fail/blocked total after each — never batch results to the end.

When a result confirms a SPEC.md `UNKNOWN`, propose the exact edit (section, old text, new
text) and apply only if I confirm. When a result contradicts SPEC.md, report it as a defect,
distinct from an `UNKNOWN`-confirmation.

Once the full scope finishes (or the run stops early), close out Findings /
"SPEC.md updates proposed" / Cleanup, then apply Generate_Bug_Report to every defect found.

**Hard stops — never proceed without my explicit authorization:**
- Book / BookAfterHold / Void / CancelAfterHold against a non-staging `baseUrl`
- printing/saving raw `supplierRequest`/`supplierResponse` debug fields anywhere shared
- an ambiguous supplier / environment / credentialsSelector — ask once, then reuse the answer
  for the rest of the session

---

## Notes for filling this in

- Scope — name the test-case file/folder if one already exists (from Generate_Test_Cases), or
  describe the ad hoc endpoint/flow directly.
- Environment — leave as staging unless you're explicitly authorizing a different target; this
  changes which hard-safety-rule checks apply.
- Family-B flow executions leave a live Held booking behind — the run's Cleanup section will
  log the `pnr`; don't skip reading it.
- After the run, if any SPEC.md proposal is still pending, run
  `Update_Spec_From_Findings_Prompt_Template.md` to reconcile it.
