# Generate Test Cases — Reusable Prompt Template

Copy the block below, fill in the bracketed values, and send it to generate manual test cases
for a bounded scope against `NDC_Integration/SPEC.md`.

---

Use Generate_Test_Cases to produce test cases for:

- **Scope**: `[Endpoint name (e.g. Search, FareConfirm, Book) / Flow number or range (1-89) /
  Supplier / Test category (smoke, regression, negative, boundary, security, etc.) / Full
  matrix — pick one]`
- **Version**: **[V1 / V2 / Both]**

Apply the 8-category recipe (Positive, Negative, Boundary, Validation, Business Rule, Security,
Integration, Regression) from SPEC.md §8, plus the senior-QC coverage angles layered on top
(echo consistency, uniqueness, cross-endpoint error consistency, derived-field arithmetic,
string boundary specifics, expiry/repeat-within-window lifecycle) wherever they apply.

Always cover known findings already in SPEC.md that fall in scope: the collection defects and
security finding (§7.14/§8.4), the supplier-capability conflicts (§4.4), and any flow anomaly
touching this scope (§5.5) — flag anomalies explicitly rather than silently resolving them.

Title every case per the house Azure DevOps naming convention. Append rows to
`NDC_Integration/TestCases/TestCases_<Version>.csv` and re-run `ConvertTo-Html.ps1` for the
affected version(s) afterward so the HTML report stays in sync.

**Stop and ask me, don't guess:**
- if the scope is open-ended ("give me some test cases for the API") — don't default to the
  full matrix silently
- if something needed for a precise test case is marked `UNKNOWN` in SPEC.md — generate a case
  that *confirms* it live instead of guessing an expected value
- if the request points at a User Story file instead of a bounded scope — run
  `Analyze_User_Story_Prompt_Template.md` first
- if the requested scope falls outside SPEC.md's documented surface entirely (e.g. NBO
  back-office admin, promo codes, environment credential matrices) — flag it, don't fabricate it

---

## Notes for filling this in

- Scope must be a single bounded thing per request — one endpoint, one flow/range, one
  supplier, one category, or an explicit "full matrix" ask (large: 89 flows × up to 8
  categories each — expect a phased proposal instead of one giant output).
- Version — `Both` unless the story/feature is version-specific.
- Output defaults to CSV (the production format); only ask for a markdown table fallback for a
  quick scratch review, not a deliverable.
- This skill never calls the live API or records results — hand the output to
  `Execute_Test_Cases_Prompt_Template.md` next.
