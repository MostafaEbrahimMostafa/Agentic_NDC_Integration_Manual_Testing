<!--
  Fixed structure for a single bug report — NDC_Integration/Artifacts/BugReports/<slug>/BUG-<NN>_<API_NAME>_<FIELD_NAME>/
  BUG-<NN>_<API_NAME>_<FIELD_NAME>.md (next to a requests-responses/ folder of JSON files). One of these per defect (`finding` line with kind:"defect"). Populate
  the placeholders, don't redesign the section headings, their emojis, or their order — this is a
  fixed house format.

  Placeholder legend (see SKILL.md's "Map to the template's placeholders" for exactly where each one
  comes from):
    <API_VERSION>        e.g. V1 / V2
    <SUPPLIER>            e.g. SUP_A
    <API_NAME>            the specific endpoint, e.g. FareConfirm, Book
    <FIELD_NAME>          the exact response field at fault, e.g. holdExpirationDate
    <FLOW_STEPS>          ordered call sequence needed to reproduce
    <EXPECTED_VALUE>      an example valid value, not just "not null"
    <BASE_URL>            run_start.baseUrl
    <ENVIRONMENT>         run_start.environment
    <CREDENTIAL_SELECTOR> run_start/test_case credentials_selector
    <CORRELATION_ID>      test_case/hop correlation_id, or "Not returned by this response"
-->

# [<API_VERSION>][<SUPPLIER>][<API_NAME>] – <FIELD_NAME> Returned as Null in <API_NAME> Response

<!-- For a non-null defect, keep the same [<API_VERSION>][<SUPPLIER>][<API_NAME>] – ... prefix but
     swap the verb phrase to match what actually happened, e.g.:
     [<API_VERSION>][<SUPPLIER>][<API_NAME>] – <FIELD_NAME> Returned Incorrect Value in <API_NAME> Response
     [<API_VERSION>][<SUPPLIER>][<API_NAME>] – <FIELD_NAME> Missing from <API_NAME> Response
-->

## 📄 Description

The field `<FIELD_NAME>` is returned as `null` in the `<API_NAME>` response. This field should
contain a valid value to ensure data completeness, consistency, and accurate information for API
consumers.

## 🔁 Steps to Reproduce

1. <FLOW_STEPS>

## ❌ Actual Result

```json
"<FIELD_NAME>": null
```

<!-- Explain the concrete impact of the missing value — what breaks or can't be computed downstream
     because this field came back null. -->

## ✅ Expected Result

```json
"<FIELD_NAME>": "<EXPECTED_VALUE>"
```

<!-- Explain why this value should be returned — cite the SPEC.md section/rule it violates. -->

## 🖥️ System Information

- **API Version:** `<API_VERSION>`
- **Supplier/Airline:** `<SUPPLIER>`
- **Base URL:** `<BASE_URL>`
- **API Name:** `<API_NAME>`
- **Environment:** `<ENVIRONMENT>`
- **Credentials Selector:** `<CREDENTIAL_SELECTOR>`
- **Correlation ID:** `<CORRELATION_ID>`
- **Registry ID:** `<GLOBAL_ID>` (`NDC_Integration/Artifacts/Registry/Bug_Registry.csv`)

## 📊 Severity

**<Critical / High / Medium / Low>** — <one to two sentences on the business impact that justifies
this severity, per SKILL.md's heuristic>.

## 📎 Evidence

**Actual response (redacted):**

```json
{
  "<FIELD_NAME>": null
}
```

**Expected response (redacted):**

```json
{
  "<FIELD_NAME>": "<EXPECTED_VALUE>"
}
```

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the `requests-responses/` folder next to this file:

- `01_<label>_request.json` / `01_<label>_response.json` — <label>, `<endpoint path>`, HTTP <status>

<!-- One line per pair, in call order. Folder layout and naming are in SKILL.md, "Where output goes". -->

## 💥 Impact

<One paragraph tying the missing/incorrect field to what actually breaks for a consumer of this API
— a downstream system, another test case, the traveler-facing flow, manual cleanup/expiry tracking,
etc. Be concrete, not generic.>

<!-- OPTIONAL. Keep this section only when there is useful context that fits no section above
     (Output contract O-6). Delete it otherwise. No other extra sections are allowed. -->
## 📝 Observations

<Free text: related behaviour seen nearby, open questions for the dev team.>

<!-- Output contract (.claude/Skills/_shared/Output_Contracts.md, contracts/bug-report.contract.json):
     at most 120 lines and 40 lines per code block; no <PLACEHOLDER> or HTML comment may remain in the
     filed report. Check: node .claude/Skills/_shared/scripts/validate-output.js <run folder> -->
