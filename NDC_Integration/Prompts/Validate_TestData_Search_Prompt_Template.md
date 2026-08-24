# Validate TestData Search — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to check (and optionally
repair) every test-data fixture's ability to find live flights via V2 Search.

---

Use Validate_TestData_Search to sweep:

- **BaseUrl**: `[e.g. https://ndc-supplier-integration.azurewebsites.net/]`
- **Supplier**: `[SupplierName]`
- **CredentialsSelector**: `[Selector]`
- **Scope**: `[every *.json under NDC_Integration/TestData/ (default) / a wildcard, e.g. Hold*]`
- **Mode**: **[read-only sweep (default, no -Repair) / repair failing fixtures (-Repair)]**

Run the bundled script (`Invoke-TestDataSearchSweep.ps1`) with these parameters. For each file,
report PASS (HTTP 200 with non-empty `offers[]`) or FAIL as it completes — never batch to the
end. Treat HTTP 200 with empty `offers[]` as a FAIL, and retry (don't count as a route failure)
any request that never reaches the service at all.

If repairing: try candidates in order — shift dates (±3/7/10/14/21/28/35 days) → borrow a route
proven live elsewhere in this same sweep → fall back to
`NDC_Integration/Resources/Supplier Routes.md`. Never change trip shape or passenger mix, only
`origin`/`destination`/`offsetDays`; never collide with another fixture's itinerary. Rewrite
surgically (only the changed values, preserving formatting/BOM-free UTF-8). Re-verify with a
fresh read-only sweep afterward and confirm every file now passes.

Close with: total/passed-as-is/repaired/unresolved, a repair table with the supplier's stated
failure reason per file, and unresolved files with every candidate tried. Report paths go under
`NDC_Integration/Artifacts/SearchSweep/`.

**Stop and ask me, don't guess:**
- if every repair candidate fails for a file — leave it unchanged and report UNRESOLVED, never
  invent an unverified route
- if Search itself errors in a way SPEC.md §2.1 doesn't allow (5xx, or 4xx on a route the
  supplier demonstrably serves) — that's a defect, flag it for Generate_Bug_Report instead of
  treating it as stale data

---

## Notes for filling this in

- Run without `-Repair` first unless you've clearly asked for fixtures to be fixed.
- This skill only ever calls Search — it never Books, Holds, Voids, or Cancels, so it's safe
  against any environment without the authorization check Execute_Test_Cases requires.
- If the sweep confirms a SPEC.md `UNKNOWN` (e.g. §2.1's empty-offers-vs-4xx question), hand
  that to `Update_Spec_From_Findings_Prompt_Template.md` rather than editing SPEC.md here.
