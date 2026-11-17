# [V1 and V2][TravelportNdc][Hold] – holdExpirationDate Returned With Different UTC Offsets on V1 and V2 for the Same Flight

## 📄 Description

For the same QR flight, V1 returns `2026-11-04T20:59:00Z` and V2 returns `2026-11-04T20:59:00+02:00` (an instant two hours earlier). All 13 V1 holds end in Z and all 12 V2 holds in +02:00.

Found by: TC-TPNREG-HOLD-01, QA run `20261101-084001_TravelportNdc-UAE-Full-Regression-ne3` (2026-11-01).

## 🔁 Steps to Reproduce

1. V1 Search/FareConfirm/Hold on QR DOH-DXB (flight QR1022 or the first listed).
2. V2 Search/FareConfirm/AddPassenger/Hold on the same flight.
3. Compare holdExpirationDate.

## ❌ Actual Result

```json
// V1
"holdExpirationDate": "2026-11-04T20:59:00Z"
// V2
"holdExpirationDate": "2026-11-04T20:59:00+02:00"
```

Hold on QR DOH-DXB (same flight) V1 vs V2; all 13 V1 holds end in Z and all 12 V2 holds in +02:00

## ✅ Expected Result

```json
Same instant and same offset convention on both versions
```

TC-TPNREG-HOLD-01; SPEC.md 2.10.

## 🖥️ System Information

- **API Version:** `V1 and V2`
- **Supplier/Airline:** `TravelportNdc`
- **Base URL:** `https://ndc-integration-stg-ne-3.azurewebsites.net/`
- **API Name:** `Hold`
- **Environment:** `staging (ndc-integration-stg-ne-3)`
- **Credentials Selector:** `UAE`
- **Correlation ID:** `Not returned by this response`

## 📊 Severity

**Medium** — Two hours of difference in a deadline can make a client ticket late or clean up early.

## 📎 Evidence

**Actual response (redacted):**

```json
// V1
"holdExpirationDate": "2026-11-04T20:59:00Z"
// V2
"holdExpirationDate": "2026-11-04T20:59:00+02:00"
```

**Expected response (redacted):**

```json
Same instant and same offset convention on both versions
```

## 💥 Impact

Expiry-driven logic (BookAfterHold window, cleanup) is wrong by two hours on one version. A client computing hold expiry from V2 sees the hold last two hours less than V1 reports, so BookAfterHold may be attempted late or cleanup scheduled wrongly
