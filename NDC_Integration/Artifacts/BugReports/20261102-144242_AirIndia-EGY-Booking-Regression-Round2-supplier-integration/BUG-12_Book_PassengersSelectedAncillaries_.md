# [V2][AirIndia][Book] – Unknown Passenger or Segment Keys Accepted in Book Selections

## 📄 Description

Book accepts ancillary and seat selections keyed by a passenger reference or segment key that does not exist: an ancillary under an unknown pax reference is silently attached to the first passenger, ancillaries under an unknown or wrong segment key are still booked and priced, and a seat under an unknown segment key is booked on the segment encoded in its cellId

## 🔁 Steps to Reproduce

1. Search, FareConfirm, AddPassenger, GetAncillary (and GetSeatMap) for 2 adults + 1 child.
2. Book with the ancillary keyed by "ZZZZZZZZ" instead of the real pax ref (or an unknown segment key), or the seat under segment key "QUJDRA--".

## ❌ Actual Result

```json
HTTP 200 { "pnr": "O713SA" }  with the ancillary echoed under the first passenger; seat booked on the segment encoded in cellId (PNR ZYUR7R)
```

A client bug moves a paid service to the wrong passenger or segment without any error

## ✅ Expected Result

```json
HTTP 400 NDC-INT-TEC-A0001 naming the unknown passenger reference or segment key
```

Expected per SPEC.md §2.9 and the platform's own V2 behaviour where cited. Expected value: Selections with unknown passenger or segment keys are rejected with a structured 400

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `AirIndia`
- **Base URL:** `https://ndc-supplier-integration.azurewebsites.net/`
- **API Name:** `Book`
- **Environment:** `non-production (ndc-supplier-integration)`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — A client bug silently moves a paid service to the wrong passenger or segment.

## 📎 Evidence

**Actual response (redacted):**

```json
HTTP 200 { "pnr": "O713SA" }  with the ancillary echoed under the first passenger; seat booked on the segment encoded in cellId (PNR ZYUR7R)
```

**Expected response (redacted):**

```json
HTTP 400 NDC-INT-TEC-A0001 naming the unknown passenger reference or segment key
```

Test cases: TC-AIEGY-ANC-NEG-01, TC-AIBK-SEAT-NEG-01 (run 20261102-144242_AirIndia-EGY-Booking-Regression-Round2-supplier-integration). TC-AIEGY-ANC-NEG-01 (PNRs P7JZTN, O713SA, V3GRWM), TC-AIBK-SEAT-NEG-01 (PNR ZYUR7R)

## 💥 Impact

A client bug moves a paid service to the wrong passenger or segment without any error
