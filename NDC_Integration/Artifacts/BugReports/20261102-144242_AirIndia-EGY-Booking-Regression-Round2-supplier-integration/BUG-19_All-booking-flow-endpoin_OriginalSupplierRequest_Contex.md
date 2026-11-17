# [V1/V2][AirIndia][All booking-flow endpoints] – Error Responses Expose Raw Supplier Payloads and Internal Type Names

## 📄 Description

Ordinary error responses expose internals: 55 of 317 carry a non-empty OriginalSupplierRequest/OriginalSupplierResponse, and 94 expose .NET type names (System.Guid, System.String, NDC.Integrations...), supplier internals (nsk:InvalidMarket) and parser details

## 🔁 Steps to Reproduce

1. Send any invalid request, for example Retrieve with pnr "ZZZZZZ", Search with origin XXX, or a Book with a non-GUID id.

## ❌ Actual Result

```json
"OriginalSupplierRequest": "<non-empty raw supplier payload>",  "Context": [ { "Name": "nsk:InvalidMarket" } ]   and  "The value '12345' is not valid for System.Guid"
```

Information disclosure that fingerprints the stack and the supplier system

## ✅ Expected Result

```json
"OriginalSupplierRequest": null and neutral messages such as "ResponseId must be a valid identifier"
```

Expected per SPEC.md §7.14 and the platform's own V2 behaviour where cited. Expected value: Neutral messages naming the field; no raw supplier payloads or type names

## 🖥️ System Information

- **API Version:** `V1/V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `All booking-flow endpoints`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Information disclosure that fingerprints the stack and the supplier system.

## 📎 Evidence

**Actual response (redacted):**

```json
"OriginalSupplierRequest": "<non-empty raw supplier payload>",  "Context": [ { "Name": "nsk:InvalidMarket" } ]   and  "The value '12345' is not valid for System.Guid"
```

**Expected response (redacted):**

```json
"OriginalSupplierRequest": null and neutral messages such as "ResponseId must be a valid identifier"
```

Test cases: TC-AIEGY-SEC-02, TC-AIEGY-SEC-LEAK-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-SEC-02, TC-AIEGY-SEC-LEAK-01 (census; no credential found in the error-body fragments sampled on this host)

## 💥 Impact

Information disclosure that fingerprints the stack and the supplier system
