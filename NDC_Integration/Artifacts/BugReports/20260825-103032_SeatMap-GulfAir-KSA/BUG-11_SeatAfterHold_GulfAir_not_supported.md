# [V2][GulfAir][SeatAfterHold] – SeatAfterHold Rejects GulfAir with "GulfAir does not exists" While Every Other Endpoint Accepts It

## 📄 Description

`SeatAfterHold` rejects every call made with `supplier: "GulfAir"` with HTTP 409
`OperationNotSupported`, `Context.Value: "GulfAir does not exists"` — regardless of header casing
(`gulfair`/`GULFAIR`/`GulfAIR` all produce the identical rejection) and regardless of whether the
referenced PNR/booking is genuinely Held and valid. Every other endpoint exercised in this run
(Search, FareConfirm, AddPassenger, GetSeatMap, Hold, Book, Retrieve) accepts `supplier: "GulfAir"`
normally, including a `Retrieve` call against the exact same PNR used against `SeatAfterHold`.

## 🔁 Steps to Reproduce

1. Search (GulfAir, KSA) BAH→JED → FareConfirm → AddPassenger → Hold → capture `pnr`, `bookingToken`
   (e.g. `pnr: "PCVQIO"`, `bookingToken: "TPC60517142257D2582026"`).
2. POST `SeatAfterHold` with `supplier: "GulfAir"`, `credentialsSelector: "KSA"`, `pnr`,
   `gdsPNR: ""`, `bookingToken`, `surName: ""`.
3. (Cross-check) POST `Retrieve` with the same `pnr`/`bookingToken`/`supplier: "GulfAir"` —
   succeeds normally.

## ❌ Actual Result

```json
{
  "Status": 409,
  "TransactionId": "0442b1ac-8b06-43c5-b94f-ae040a3fe1ba",
  "ErrorCode": "OperationNotSupported",
  "ErrorMessage": "This action is not currently supported by the selected supplier.",
  "Context": [{"Name": "OperationNotSupported", "Value": "GulfAir does not exists"}]
}
```

Reproduced 5 times across `surName` and header-casing variants — always the identical 409.

## ✅ Expected Result

```json
{
  "supplier": "GulfAir",
  "...": "some seat-selection response shape (endpoint is exploratory/under-specified per SPEC.md §2.7a, but should not flatly deny a supplier every other endpoint in this API accepts)"
}
```

## 🖥️ System Information

- **API Version:** `V2`
- **Supplier/Airline:** `GulfAir`
- **Base URL:** `https://ndc-integration-stg-ne-2.azurewebsites.net/`
- **API Name:** `SeatAfterHold`
- **Environment:** `staging (non-default host — user-specified)`
- **Credentials Selector:** `KSA`
- **Correlation ID:** `0442b1ac-8b06-43c5-b94f-ae040a3fe1ba` (representative; 4 additional TransactionIds recorded across casing variants)

## 📊 Severity

**Critical** — `SeatAfterHold` is the Hold branch's only documented dedicated seat-selection
mechanism (SPEC.md §2.7a); it is entirely unusable for GulfAir today. This blocks every Hold-branch
flow that needs to attach a seat for this supplier via the documented mechanism (mitigated only by
the separate, undocumented discovery in this same run that `Hold` itself already accepts
`passengersSelectedSeats` directly for GulfAir — see the paired unknown-resolution finding on
`FLOW-V2-50-SEATFIELD`).

## 📎 Evidence

**Actual response (redacted):**

```json
{"Status": 409, "ErrorCode": "OperationNotSupported", "Context": [{"Name": "OperationNotSupported", "Value": "GulfAir does not exists"}]}
```

**Expected response (redacted):**

```json
{"supplier": "GulfAir", "...": "a seat-selection response, not a supplier-not-found rejection"}
```

## 💥 Impact

Blocks `TC-SEATAFTERHOLD-VAL-01`, `VAL-02`, `NEG-01`, `NEG-02`, `INT-04`, and all three
`FLOW-V2-CANDIDATE-SM-HOLD-*` flow test cases for GulfAir outright — none of them can proceed past
the `SeatAfterHold` call. The message text itself ("GulfAir does not exists") also suggests a
supplier-registry lookup specific to this endpoint's implementation, separate from whatever registry
every other endpoint correctly consults for the same supplier string.
