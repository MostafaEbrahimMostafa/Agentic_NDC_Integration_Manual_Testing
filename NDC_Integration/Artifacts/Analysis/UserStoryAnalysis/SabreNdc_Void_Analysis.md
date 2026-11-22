# SabreNdc Void Implementation — Analysis

## Source
User story **"SabreNdc – Void Implementation" (Q4-CORE, INTI-WT1-T3230-035)**, pasted in-session on 2026-10-22 (no `*_UserStory.md` file). Analyzed against `NDC_Integration/SPEC.md` (§ as of this read, 2026-10-22).

Relevant SPEC.md surface: §1.2 #15 Void endpoint, §1.7 supplier concept, §2.9 Book (`voidCapability`), §2.11 Retrieve, §2.13 BookAfterHold, §2.15 Void, §3.2 "Book/BookAfterHold → Retrieve → Void", §4.1/§4.2/§4.6 SabreNDC rows, §5.4 Families C/E, §6.3 Family C/E, §6.5 void window, §7.14 security.

Relevant live history: on 2026-08-05 `SabreNDC` + `credentialsSelector=UAE` returned *"The credentials for the selected supplier do not exist or are not active"*. The only live Void baseline is TravelportNdc, where Void returns HTTP 409 `OperationNotSupported`.

## Requirement mapping

| # | Claim (atomic) | SPEC.md mapping | Status |
|---|---|---|---|
| 1 | The integration builds and sends a Void request to SabreNdc | §2.15 (request fields `supplier`, `credentialsSelector`, `pnr`, `gdsPNR`, `bookingToken`, `surName`, `voidTickets`); §4.1 lists SabreNdc as IATA/JSON/GDS | Partially mapped. The endpoint exists, but SPEC.md has no SabreNdc-specific request requirements (e.g. whether `gdsPNR` is needed for GDS suppliers; §2.15 Testing Note). |
| 2 | Void applies only to an **eligible** booking | §2.9 `voidCapability` (per-booking live flag); §3.2 Void input dependency | Partially mapped. The eligibility criteria (ticketed, not already voided/cancelled, `voidCapability`) are only `INFERRED`. |
| 3 | Void follows SabreNdc's supported business rules | §4.2/§4.6: SabreNDC Void = **Unknown** | Gap. No SabreNdc rule set is documented. |
| 4 | Void is allowed only within the allowed voiding period | §6.5 void window = `UNKNOWN`; §6.3 Family C | Partially mapped. Mechanism only; resolved below (same calendar day). |
| 5 | The integration determines whether Void succeeded or failed from the supplier response | §2.15 "Business Logic: `UNKNOWN`", "Expected Success Response: `UNKNOWN`" | Gap. No success example exists for any supplier. |
| 6 | The Void result is mapped to the existing integration response contract | §2.15 "Response Mapping: none"; §2.14 CancelAfterHold ack `{cancelled, message}` is the nearest analogue | Gap. SPEC.md has no documented Void response contract. |
| 7 | Supplier errors are handled and returned appropriately | Standard error envelope `{Status, TransactionId, ErrorCode, ErrorMessage, Context}` (§2.9, §2.15) | Partially mapped. The envelope is known; Sabre error → `ErrorCode`/HTTP mapping is not. |
| 8 | Unsuccessful (non-error) Void responses are handled and returned | §2.15 Common Errors (outside window, `VoidNotAllowed`, wrong `surName`) | Partially mapped. Conditions are listed, but expected codes are not. |
| 9 | (implicit) Post-Void booking state is observable | §3.2/§6.3: Retrieve "should show voided `bookingStatus`", but §2.11 confirms `bookingStatus` does **not exist** in V1 Retrieve | Partially mapped, with a contradiction. The voided-state signal is undefined. |
| 10 | (implicit) Void works for both direct-Book and Hold→BookAfterHold bookings | §5.4 Family C (#3, #27) and Family E (#5, #29) | Mapped (flow chains). Family E depends on SabreNDC Hold = Supported (§4.6). |

## Resolved questions
- **Version scope (#1, #10):** Both **V1** (`api/FlightBooking/Void`) and **V2** (`api/V2/FlightBooking/Void`).
- **Allowed voiding period (#4):** **Same calendar day**. Void is allowed until midnight of the ticket-issue day and rejected from the next calendar day on.
- **Staging credentials (#1):** SabreNdc tests use **`credentialsSelector = EGY`**.
- **Result/error mapping (#5, #6, #7):** **Unknown, to be confirmed live.** Test cases capture the actual success shape, HTTP status codes and `ErrorCode` values as baselines rather than asserting fixed values.

## Open questions

**Quantified NFRs / business rule detail**
- (#4) Which clock defines the calendar day: Sabre pseudo-city (PCC) local time, airline/point-of-sale local time, UTC, or the integration server's time zone? This sets the midnight boundary test.
- (#4) Does the integration enforce the window itself, or pass the request through and rely on Sabre's rejection? This decides whether a too-late Void reaches Sabre at all.

**Field/data specificity**
- (#1) Is `gdsPNR` mandatory for SabreNdc Void? The V2 saved example sends `""` (§2.15 Testing Note, existing `TC-VOID-NEG-01`).
- (#1) Is `surName` validated against the booking for SabreNdc, and is it mandatory?
- (#1) `voidTickets` semantics: does `[]` mean "void all tickets"? Is a partial void (a subset of ticket numbers) supported by SabreNdc?
- (#9) After a successful Void, what does Retrieve return: HTTP 200 with `tickets[].ticketStatus = Voided` (or similar), `voidCapability = VoidNotAllowed`, or an HTTP 409 terminal error like a cancelled PNR (§2.14)?

**Functional completeness / eligibility**
- (#2) What makes a SabreNdc booking eligible? Must it be ticketed? Is a Held, unticketed PNR rejected by Void (and directed to CancelAfterHold), or voided anyway?
- (#2) Which `voidCapability` enum values mean "void allowed" (only `VoidNotAllowed` is observed)?

**Error-handling detail**
- (#7, #8) The exact HTTP status and `ErrorCode` for: out-of-window, already voided, not ticketed, `VoidNotAllowed`, wrong `surName`, unknown PNR, and a raw Sabre fault. Is a Sabre-side failure surfaced as 409, 422, 502 or a mapped 4xx?
- (#7) Is the Sabre error text passed through in `Context`, or normalized? (The `Context` field already leaks .NET DTO names, a known defect in §2.9.)

**Version/supplier conditionality**
- (#3) Is Void enabled for every SabreNdc credential set (EGY/UAE/KSA), or only EGY?
- (#10) Is the Void response shape identical between V1 and V2?

## Flagged SPEC.md gaps
A SPEC.md addition is a separate task and is not made here.
- §4.2/§4.6: SabreNDC Void = Unknown. Should be updated after the first live confirmation.
- §2.15: no Void success response contract, no business logic, no response mapping for any supplier.
- §6.5: void window is `UNKNOWN`. The "same calendar day" answer and its time-zone basis need recording.
- §3.2/§6.3 Family C reference a voided `bookingStatus` that §2.11 confirms doesn't exist. The post-Void verification signal is undefined.
- §2.15: no SabreNdc-specific required-field rules (`gdsPNR`, `surName`, `voidTickets`).

## Testable Scope (for generate-test-cases)
- **Endpoint(s):** §2.15 Void (V1 + V2), plus §2.9 Book / §2.13 BookAfterHold as Void's ID source and §2.11 Retrieve as post-Void verification.
- **Flow number/range:** §5.4 #3 and #5 (V1), #27 and #29 (V2), meaning Families C and E with no enrichment. Enrichment variants (#15, #33, #39, #51…) are excluded until SabreNDC Bundle/Ancillary/SeatMap capability is confirmed (all Unknown in §4.6).
- **Supplier(s):** §4.6 `SabreNDC`, `credentialsSelector=EGY`, with a §4.7 capability/credential confirmation prerequisite. TravelportNdc is used only as a regression baseline (Void stays `OperationNotSupported`).
- **Category emphasis:** positive (same-day Void, V1/V2, direct Book and Hold→BAH), business rule/boundary (calendar-day window, `voidCapability`, double Void, unticketed PNR), validation (required fields, `gdsPNR`/`surName`/`voidTickets`), negative/error handling (Sabre errors normalized to the standard envelope), security (§7.14 trio plus `surName` injection), integration (Book→Void→Retrieve), regression (other suppliers unchanged, V1/V2 parity).
- **Out-of-scope / needs SPEC.md first:** exact success contract, exact error codes and the post-Void Retrieve signal. Cases for these are written as **confirm live** and assert no fixed values.
