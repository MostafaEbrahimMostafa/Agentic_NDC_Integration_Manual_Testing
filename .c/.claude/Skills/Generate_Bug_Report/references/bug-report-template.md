<!--
  Fixed structure for a single bug report — NDC_Integration/Artifacts/BugReports/<slug>/BUG-<NN>_
  <API_NAME>_<FIELD_NAME>.md. One of these per defect (`finding` line with kind:"defect"). Populate
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

## 💥 Impact

<One paragraph tying the missing/incorrect field to what actually breaks for a consumer of this API
— a downstream system, another test case, the traveler-facing flow, manual cleanup/expiry tracking,
etc. Be concrete, not generic.>
