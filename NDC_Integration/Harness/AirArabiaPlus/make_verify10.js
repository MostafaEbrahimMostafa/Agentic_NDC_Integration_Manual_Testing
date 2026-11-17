// Writes NDC_Integration/Artifacts/BugReports/ADO-65507_BUG-10_Verify-ne1/ (verdict .md + full request/response files of the passing chain, headers incl. CorrelationId)
const fs = require('fs'), path = require('path');
const { H } = require('../V2/lib');
const OUT = path.resolve(__dirname, '../../Artifacts/BugReports/ADO-65507_BUG-10_Verify-ne1'); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(path.join(OUT, 'requests-responses'), { recursive: true });
const runs = JSON.parse(fs.readFileSync(path.join(__dirname, 'out_bug10/runs.json'), 'utf8')); const dir = path.join(__dirname, 'raw_bug10');
const raw = fs.readdirSync(dir).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
const red = o => JSON.parse(JSON.stringify(o, (k, v) => /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) && v != null ? '[REDACTED - raw supplier payload, per SPEC.md 7.14]' : v));
const main = runs.find(r => r.label === 'M264_66589_try3'); const chain = raw.filter(r => r.tc === 'VERIFY-65507-' + main.label && r.status === 200).sort((a, b) => Date.parse(a.started_at) - Date.parse(b.started_at));
const files = chain.map((r, i) => { const n = String(i + 1).padStart(2, '0'); const hdr = { ...r.request.headers }; if (hdr['x-api-key']) hdr['x-api-key'] = '[REDACTED]';
  fs.writeFileSync(path.join(OUT, 'requests-responses', `${n}_${r.endpoint}_request.json`), JSON.stringify({ label: r.endpoint, method: 'POST', url: r.request.url, headers: hdr, body: red(r.request.body) }, null, 2));
  fs.writeFileSync(path.join(OUT, 'requests-responses', `${n}_${r.endpoint}_response.json`), JSON.stringify({ label: r.endpoint, status: r.status, correlationId: (r.response_headers || {}).correlationid || null, durationMs: r.ms, requestedAtUtc: r.started_at, respondedAtUtc: r.ended_at, headers: r.response_headers, body: red(r.response) }, null, 2));
  return { n, ep: r.endpoint, url: r.request.url.replace(/^https:\/\/[^/]+/, ''), corr: (r.response_headers || {}).correlationid }; });
const row = (o, k) => o[k].pax.map(p => `${p.ref}: ${p.anc}`).join(', ') + ` (total ancillaries ${o[k].pd.anc}, grand total ${o[k].pd.total})`;
const good = runs.filter(r => r.farecheck && r.ok && r.label !== main.label);
const md = `# ADO 65507 / BUG-10 — verification on ne-1 (AirArabiaPlus / USA)

**Verdict: NOT SOLVED on ne-1 (reproduced).** With the same meal that triggered the defect on ne-6 (priced 264.32), FareCheck and Book still report paxTotalAncillaryAmount 399.52 per passenger (799.04 in total) while Retrieve reports 297.44 (594.88). The grand total is identical in all three; the per-passenger breakdown does not add up in FareCheck and Book (1352 + 2419.29 + 399.52 + 811.2 = 4982.01, reported paxTotalAmount 4879.93, difference 102.08). This is exactly the ne-6 behaviour of 2026-11-09.

**Correction:** an earlier version of this file said SOLVED. That was based on runs whose chosen meal cost 0 or 162.24, which never triggered the defect; the check with the 264.32 meal shows it is still open.

- **Environment:** https://ndc-integration-stg-ne-1.calmplant-96dd21b3.northeurope.azurecontainerapps.io/ · V2 · supplier AirArabiaPlus · credentialsSelector USA · verified 2026-11-15
- **Scenario (as in the bug):** COK→SHJ 2026-12-12, 1 ADT + 1 CHD + 1 INF → Search → FareConfirm → GetOfferBundles → AddPassenger → GetAncillary(selectedBundles) → SeatMap → FareCheck → Book → Retrieve. Bundle 66589 ("Ultimate", the bundle of the original failure) with the 264.32 meal and the 135.2 baggage selected for adult and child — the condition under which the figures diverged on ne-6.

## Result of the main run (PNR ${main.pnr})

| Response | paxTotalAncillaryAmount per passenger | totals |
|---|---|---|
| FareCheck | ${main.farecheck.pax.map(p => p.ref + ' ' + p.anc).join(', ')} | ancillaries ${main.farecheck.pd.anc}, bundle ${main.farecheck.pd.bun}, total ${main.farecheck.pd.total} |
| Book | ${main.book.pax.map(p => p.ref + ' ' + p.anc).join(', ')} | ancillaries ${main.book.pd.anc}, bundle ${main.book.pd.bun}, total ${main.book.pd.total} |
| Retrieve | ${main.retrieve.pax.map(p => p.ref + ' ' + p.anc).join(', ')} | ancillaries ${main.retrieve.pd.anc}, bundle ${main.retrieve.pd.bun}, total ${main.retrieve.pd.total} |

Per-passenger reconciliation (base + tax + ancillary + bundle vs paxTotalAmount, tolerance 0.05): **fails in FareCheck and Book** (adult and child: calculated 4982.01, reported 4879.93, difference 102.08), passes in Retrieve (1352 + 2419.29 + 297.44 + 811.2 = 4879.93).

## Other full chains on ne-1 (these do NOT trigger the defect: the chosen meal costs 0 or 162.24)

${good.map(o => `- \`${o.label}\` — bundle ${o.bundle}, ${o.route}, PNR ${o.pnr}: FareCheck ${row(o, 'farecheck')}; Book ${row(o, 'book')}; Retrieve ${row(o, 'retrieve')} → ancillary identical across the three responses: **${o.sameAncillaryAcrossResponses}**, reconciliation issues: **${['farecheck', 'book', 'retrieve'].reduce((n, k) => n + o.reconcileIssues[k].length, 0)}**`).join('\n')}

Runs that did **not** reach Retrieve (not bug-related, supplier answers on ne-1): ${runs.filter(r => !r.ok).length} of ${runs.length} attempts stopped earlier — ${[...new Set(runs.filter(r => !r.ok).map(r => r.failedAt))].join(', ')} (409 \`NDC-INT-UNC-Z9999\` "Selected Meals are not available" / "Invalid Bundled Service Selected", or GetAncillary offering no meal for bundle 66580/66624 — the separate defect BUG-22). Bundle 66580 with a child never completed, so it could not be compared; bundle 66624 passed once with a free meal and bundle 66589 passed twice (free meal, paid meal).

## Correlation IDs of the main run (CorrelationId response header)

${files.map(f => `- ${f.n} ${f.ep} (\`${f.url}\`): \`${f.corr}\``).join('\n')}

## Files

Full requests and responses (x-api-key redacted, raw supplier payloads redacted per SPEC.md 7.14; response files carry the headers and \`correlationId\`) are in \`requests-responses/\`: ${files.map(f => `\`${f.n}_${f.ep}\``).join(', ')}.

## Limits of this verification

Staging data only; the original defect was seen in 2 of the bundle test cases of the ne-6 run, and on ne-1 only 3 full chains could be completed because the supplier often rejects meal/baggage/seat choices (BUG-22). The other three completed chains pass because they do not trigger the case; ADO 65507 should stay open. Pattern: the mismatch appears only when the selected meal costs 264.32 on bundle Ultimate; meals costing 0 or 162.24, and the Corporate bundle with free meals, are consistent in all three responses.
`;
fs.writeFileSync(path.join(OUT, 'ADO-65507_BUG-10_Verify-ne1.md'), md, 'utf8');
const key = H['x-api-key']; let leak = 0; (function w(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) w(p); else if (fs.readFileSync(p, 'utf8').includes(key)) leak++; } })(OUT);
console.log('written', files.length, 'calls; api-key occurrences', leak);
