# [V1][Amadeus][Hold] – parentPaxRefId Ignored: Infant Attached to the First Adult and Validated Against a Different Pairing

## 📄 Description

`ParentPaxRefId` on an INF is honoured by the combined-length pre-check but not by the request sent to Amadeus. An infant declared under the second adult (`Pax2`) is attached to the first adult in the booking. As a result a request whose declared pairing is well under the 59-character limit is rejected by Amadeus with an unmapped `409 NDC-INT-UNC-Z9999` "ITEM TOO LONG / NOT ENTERED" when the first adult has long names.

## 🔁 Steps to Reproduce

1. POST `api/FlightSearch/Search` with `supplier: "Amadeus"`, `credentialsSelector: "EGY"`, one-way CAI -> JED on 2026-11-29 (any date >= 7 days out), passengers 2 ADT + 1 INF.
2. POST `api/FlightSearch/FareConfirm` with `searchResponseId` and the `offerId` of an offer with `canBeHeld: true` (if FareConfirm returns 409 `NDC-INT-BYP-A0001`, take the next offer).
3. POST `api/FlightBooking/Hold` with Pax1 ADT `Mr Mostafa Ibrahim`, Pax2 ADT `Mr Ahmed Hassan`, Pax3 INF `MS Lina Zaki` with `ParentPaxRefId: "Pax2"`. Read the INF entry in the response.
4. Repeat with Pax1 = `Mr` first `Firstabcdefghijklmno` (20) last `Lastabcdefghijklmnop` (20) and the same Pax2/Pax3.

## ❌ Actual Result

Step 3 (TC-PAXNAME-BIZ-19): the infant is attached to Mostafa Ibrahim.

```json
"2-INF": { "name": { "first": "LINA", "last": "ZAKI" }, "parentPaxRefId": "2-ADT" }   // 2-ADT = MOSTAFA IBRAHIM; Ahmed is 4-ADT
```

Step 4 (TC-PAXNAME-BIZ-20, also BIZ-04): HTTP 409

```json
{ "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context": [ { "Name": "1902", "Value": "Passenger : FIRSTABCDEFGHIJKLMNO MR LASTABCDEFGHIJKLMNOP => ITEM TOO LONG / NOT ENTERED /" } ] }
```

The pre-check passed (declared pair Pax2 + infant = 29 characters); Amadeus rejected the first adult because the infant was attached to the first adult (45 + 13 + 8 = 66 > 59). The mirror case (infant under Pax1, long adult as Pax2, no infant) is accepted (probe P12), and a long adult with no infant is accepted (probe P6/P7), confirming the infant link is what changes.

## ✅ Expected Result

```json
"2-INF": { "name": { "first": "LINA", "last": "ZAKI" }, "parentPaxRefId": "<key of Ahmed Hassan>" }
```

SPEC.md §2.5: an INF's `ParentPaxRefId` links it to the named ADT. The pairing used for validation and the pairing sent to the supplier must be the same, and a rule violation must be reported as 400 `NDC-INT-TEC-A0001`.

## 🖥️ System Information

- **API Version:** `V1`
- **Supplier/Airline:** `Amadeus`
- **Base URL:** `https://ndc-integration-stg-ne-8-eze0f5cecchhesa7.northeurope-01.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging`
- **Credentials Selector:** `EGY`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**High** — the infant is recorded under the wrong adult, and valid-by-validation bookings are refused by the supplier with an unmapped error.

## 📎 Evidence

**Actual:** as above. Transaction ids: BIZ-19 `Not returned by this response`, BIZ-20 `64234b19-0a2a-4426-84d6-355c8a6a9841`, BIZ-04 `028a8320-eb69-4d9b-9317-7e3d4b0f299e`. The BIZ-20 and BIZ-04 bodies also contain `OriginalSupplierRequest` / `OriginalSupplierResponse` (see BUG-06; redacted here).

**Expected:** 200 with the infant attached to Ahmed Hassan.

## 💥 Impact

Wrong infant/adult association on the PNR affects ticketing and check-in for the family, and callers cannot predict which bookings will be refused because the validation they are told about is not the check that actually runs.
