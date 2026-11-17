// Builds BUG-07 (INF baggageDetailsRefId null) in the 20261116 verification folder from raw_bug07/.
const fs = require('fs'), path = require('path');
const RAW = path.join(__dirname, 'raw_bug07');
const ROOT = path.join(__dirname, '..', '..', 'Artifacts', 'BugReports', '20261116_AirArabiaPlus-USA-Verify-ne');
const dir = path.join(ROOT, 'BUG-07_Search_INF_baggageDetailsRefId'); const rr = path.join(dir, 'requests-responses'); fs.mkdirSync(rr, { recursive: true });
const recs = fs.readdirSync(RAW).filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync(path.join(RAW, f))));
const J = o => JSON.stringify(o, null, 2); const corr = r => (r.response_headers || {}).correlationid || 'Not returned by this response';
const labels = ['V2_COK-SHJ_Search_ADT-CHD-INF', 'V2_COK-SHJ_FareConfirm', 'V2_SHJ-COK_Search_ADT-INF', 'V2_AMM-SHJ_Search_ADT-INF'];
const files = [];
recs.forEach((r, i) => { const label = labels[i], k = String(i + 1).padStart(2, '0');
  fs.writeFileSync(path.join(rr, `${k}_${label}_request.json`), J({ label, method: 'POST', url: r.request.url, headers: r.request.headers, body: r.request.body }));
  fs.writeFileSync(path.join(rr, `${k}_${label}_response.json`), J({ label, status: r.status, durationMs: r.ms, requestedAtUtc: r.started_at, respondedAtUtc: r.ended_at, body: r.response }));
  files.push(`- \`${k}_${label}_request.json\` / \`${k}_${label}_response.json\` — ${label}, \`/${r.path}\`, HTTP ${r.status}, correlation \`${corr(r)}\``); });
const s1 = recs[0], fc = recs[1];
const infOf = j => (((j.offers && j.offers[0]) || j.selectedOffer).passengerFareBreakdown || []).map(p => ({ passengerTypeCode: p.passengerTypeCode, segmentDetails: p.segmentDetails.map(s => ({ segmentRefId: s.segmentRefId, baggageDetailsRefId: s.baggageDetailsRefId })) }));
const md = `# [V2][AirArabiaPlus][Search] – baggageDetailsRefId Returned as Null for INF Passenger

## 📄 Description

In the Search response (and again in FareConfirm), \`segmentDetails[].baggageDetailsRefId\` is \`null\` for the infant (INF) fare breakdown, while ADT and CHD carry \`"1"\`. The infant has no reference into the baggage details of the offer, so a consumer cannot tell what baggage allowance applies to the infant. Source row: Resources/AirArabiaPlus_bugs.xlsx (generic "[Airline]" bug), re-verified 2026-11-16 on AirArabiaPlus / USA: still reproduces on every route tried (COK-SHJ, SHJ-COK, AMM-SHJ), in all offers returned.

## 🔁 Steps to Reproduce

1. POST /api/V2/FlightSearch/Search with supplier AirArabiaPlus, credentialsSelector USA, COK → SHJ, 2026-12-12, passengers 1 ADT + 1 CHD + 1 INF.
2. In the first offer, open \`passengerFareBreakdown[]\` → \`segmentDetails[]\` and read \`baggageDetailsRefId\` for each passenger type.
3. Repeat with SHJ → COK 2026-12-14 and AMM → SHJ 2026-12-10 (1 ADT + 1 INF).
4. Send FareConfirm for the COK → SHJ offer and read the same field in \`selectedOffer.passengerFareBreakdown[]\`.

## ❌ Actual Result

\`\`\`json
${J(infOf(s1.response))}
\`\`\`

HTTP 200 in all calls. The INF value is null in Search (all 2 offers on COK-SHJ, 1 offer each on the other two routes) and in FareConfirm.

## ✅ Expected Result

\`\`\`json
[
  { "passengerTypeCode": "ADT", "segmentDetails": [ { "baggageDetailsRefId": "1" } ] },
  { "passengerTypeCode": "CHD", "segmentDetails": [ { "baggageDetailsRefId": "1" } ] },
  { "passengerTypeCode": "INF", "segmentDetails": [ { "baggageDetailsRefId": "<a reference to the infant baggage allowance, or the offer's baggage entry for INF>" } ] }
]
\`\`\`

Every passenger type in \`passengerFareBreakdown\` should reference its baggage allowance through \`baggageDetailsRefId\`. If the infant genuinely has no allowance, the contract should say so explicitly instead of returning null. This expectation is derived from the bug sheet; SPEC.md does not state the INF rule, so please confirm with the product owner.

## 🖥️ System Information

- **API Version:** \`V2\`
- **Supplier/Airline:** \`AirArabiaPlus\`
- **Base URL:** \`https://ndc-integration-stg-ne.azurewebsites.net/\`
- **API Name:** \`Search\` (also visible in \`FareConfirm\`)
- **Environment:** \`Staging (stg-ne, no host number)\`
- **Credentials Selector:** \`USA\`
- **Correlation ID:** Search \`${corr(s1)}\`, FareConfirm \`${corr(fc)}\`, SHJ-COK Search \`${corr(recs[2])}\`, AMM-SHJ Search \`${corr(recs[3])}\`
- **Verified on:** 2026-11-16 (original defect: Resources/AirArabiaPlus_bugs.xlsx)

## 📊 Severity

**Low** — The booking flow with an infant still completes (infant bookings were created in the same session); the defect is a missing reference in the response data.

## 📎 Evidence

**Actual response (redacted), COK-SHJ Search, first offer:**

\`\`\`json
${J(infOf(s1.response))}
\`\`\`

**Actual response (redacted), FareConfirm:**

\`\`\`json
${J(infOf(fc.response))}
\`\`\`

## 📁 Request / response files

Full request and response bodies (x-api-key redacted) are in the \`requests-responses/\` folder next to this file.

${files.join('\n')}

## 💥 Impact

A consumer that resolves baggage allowance per passenger through \`baggageDetailsRefId\` gets no reference for the infant and has to special-case null; it cannot display or validate the infant allowance.
`;
fs.writeFileSync(path.join(dir, 'BUG-07_Search_INF_baggageDetailsRefId.md'), md);
// README
const rp = path.join(ROOT, 'README.md'); let rd = fs.readFileSync(rp, 'utf8');
rd = rd.replace('All six defects still reproduce.', 'All six AirArabiaPlus defects still reproduce; BUG-07 (from the generic rows of the same sheet) was added later the same day.');
rd = rd.trimEnd() + `\n- [BUG-07](BUG-07_Search_INF_baggageDetailsRefId/BUG-07_Search_INF_baggageDetailsRefId.md) — [V2][AirArabiaPlus][Search] – baggageDetailsRefId Returned as Null for INF Passenger (Low) — 4 request/response pairs\n`;
fs.writeFileSync(rp, rd); console.log('done', files.length);
