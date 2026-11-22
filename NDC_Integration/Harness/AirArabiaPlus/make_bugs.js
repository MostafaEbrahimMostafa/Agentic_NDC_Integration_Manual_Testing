// Generates NDC_Integration/Artifacts/BugReports/<slug>/BUG-NN_<API>_<FIELD>/{BUG-NN_*.md, requests-responses/*.json} + README.md from bugs.js and the raw call store.
const fs = require('fs'), path = require('path');
const R = require('../_shared/recorder'); const BUGS = require('./bugs'); const { H } = require('../_shared/lib');
const slug = R.slug(); const REPRO_CORR = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'repro_corr.json'), 'utf8')).out; } catch (e) { return {}; } })(); const OUT = path.resolve(R.ROOT, 'NDC_Integration/Artifacts/BugReports', slug);
const L = fs.readFileSync(path.join(R.LOGS, slug + '.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const rs = L.find(x => x.type === 'run_start');
const rawDir = path.join(__dirname, 'out', 'raw'); const raw = []; for (const f of fs.readdirSync(rawDir)) { try { raw.push(JSON.parse(fs.readFileSync(path.join(rawDir, f), 'utf8'))); } catch (e) { } }
const safe = s => String(s).replace(/[^A-Za-z0-9_.-]/g, '_');
const stats = (() => { const st = {}; const add = dir => { for (const f of fs.readdirSync(dir)) { try { const r = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); if (r.endpoint !== 'Search' || r.status !== 200) continue; const sc = ((r.request.body || {}).searchCriteria || [])[0]; if (!sc) continue; const k = sc.origin + '-' + sc.destination; const n = ((r.response || {}).offers || []).length; st[k] = st[k] || { calls: 0, offers: 0, slow: 0 }; st[k].calls++; if (n) st[k].offers++; if (!n && r.ms > 14000) st[k].slow++; } catch (e) { } } }; add(rawDir); add(path.join(__dirname, 'out', 'raw_probe')); return st; })();
const tok = s => s.replace('{{SAWCMN}}', `${stats['SAW-CMN'].calls} calls, ${stats['SAW-CMN'].slow} of them answered empty after about 15 s`).replace('{{CMNSAW}}', `${stats['CMN-SAW'].offers} of ${stats['CMN-SAW'].calls} calls`).replace('{{E5}}', `${stats['CAI-MCT'].calls} CAI-MCT and ${stats['HBE-BGY'].calls} HBE-BGY`);
const redactSupplier = o => JSON.parse(JSON.stringify(o, (k, v) => /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) && v != null ? '[REDACTED - raw supplier payload, per SPEC.md 7.14]' : v));
const jsonish = s => /^\s*[\{\["]/.test(s);
function findRaw(t, h, nth) {
  // identity: same url + same start time when the hop carries one; otherwise same url + status + identical (truncated) request body
  const url = h.request_full && h.request_full.url; const st = h.started_at; const bodyKey = o => JSON.stringify(R.trunc(o));
  let m = st && raw.find(r => r.started_at === st && (!url || r.request.url === url)); if (m) return m;
  const want = h.request_full && bodyKey(h.request_full.body); const stat = h.response_full && h.response_full.status;
  const c = raw.filter(r => r.request.url === url && r.status === stat && bodyKey(r.request.body) === want); if (c.length) return nth === 'first' ? c[0] : c[c.length - 1];
  return null;
}
// ---- chain tracing: walk back from a call through the ids (ResponseId / selectedOfferId / pnr) its request used
const T = x => Date.parse(x.started_at);
const idsOf = r => { const o = new Set(); const b = r.response; if (!b || typeof b !== 'object' || r.status !== 200) return o; ['responseId', 'offerId'].forEach(k => b[k] && o.add(b[k])); if (b.selectedOffer && b.selectedOffer.offerId) o.add(b.selectedOffer.offerId); (b.offers || []).forEach(x => x.offerId && o.add(x.offerId)); (b.upsellOffers || []).forEach(x => x.offerId && o.add(x.offerId)); return o; };
const rawSorted = raw.slice().sort((a, b) => T(a) - T(b)); const idIdx = new Map(); rawSorted.forEach(r => { r.__ids = idsOf(r); });
function prevOf(cur) {
  const rq = cur.request.body && typeof cur.request.body === 'object' ? cur.request.body : {}; const want = [rq.ResponseId, rq.responseId, rq.selectedOfferId, rq.fareConfirmResponseId].filter(Boolean);
  if (rq.pnr && rq.bookingToken) { const c = rawSorted.filter(r => T(r) < T(cur) && r.status === 200 && r.response && r.response.pnr === rq.pnr && ['Book', 'Hold', 'BookAfterHold'].includes(r.endpoint)); if (c.length) return c[c.length - 1]; }
  if (!want.length) return null;
  const rid = rq.ResponseId || rq.responseId; let c = rid ? rawSorted.filter(r => T(r) < T(cur) && r.__ids.has(rid)) : []; if (!c.length && rq.selectedOfferId) c = rawSorted.filter(r => T(r) < T(cur) && r.__ids.has(rq.selectedOfferId));
  return c.length ? c[c.length - 1] : null;
}
function traceChain(r) { const chain = [r]; let cur = r; for (let i = 0; i < 25; i++) { const p = prevOf(cur); if (!p || chain.includes(p)) break; chain.unshift(p); cur = p; } return chain; }
const tcOf = id => L.filter(x => x.type === 'test_case' && x.tc_id === id).pop();
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const index = []; const findings = []; const usedFiles = [];
for (const b of BUGS) {
  const dirName = `${b.id}_${safe(b.api)}_${safe(b.field)}`; const dir = path.join(OUT, dirName); fs.mkdirSync(path.join(dir, 'requests-responses'), { recursive: true });
  const picks = [];
  for (const c of (b.calls || [])) {
    const t = tcOf(c.tc); if (!t) continue; const arr = t.attempts || t.hops || (t.request_full ? [{ endpoint: t.endpoint_or_flow, label: t.title, request_full: t.request_full, response_full: t.response_full, started_at: null, expected: t.expected }] : []);
    const a = arr.find(x => { try { return c.pick(x); } catch (e) { return false; } }) || arr[arr.length - 1]; if (!a) continue; const r = findRaw(t, a, c.nth); if (r) picks.push({ label: c.label, r });
  }
  for (const p of (b.rp || [])) { const r = raw.filter(x => { try { return p.test(x); } catch (e) { return false; } }).pop(); if (r) picks.push({ label: p.label, r }); }
  // expand every evidence call into its whole chain (all endpoints, Search included), de-duplicated across picks of the same bug
  const expanded = []; const seenRaw = new Set();
  for (const p of picks) { const chain = traceChain(p.r); chain.forEach((r, k) => { if (seenRaw.has(r)) { if (r === p.r) { /* keep label of the evidence call even if already listed */ } return; } seenRaw.add(r); expanded.push({ label: r === p.r ? p.label : p.label + '__chain_step' + (k + 1) + '_' + r.endpoint, r, evidence: r === p.r }); }); }
  expanded.sort((x, y) => Date.parse(x.r.started_at) - Date.parse(y.r.started_at));
  const files = []; expanded.forEach((p, i) => {
    const n = String(i + 1).padStart(2, '0'); const lab = safe(p.label); const hdr = { ...p.r.request.headers }; if (hdr['x-api-key']) hdr['x-api-key'] = '[REDACTED]';
    const reqf = { label: p.label, method: 'POST', url: p.r.request.url, headers: hdr, body: p.r.request.body && typeof p.r.request.body === 'object' ? redactSupplier(p.r.request.body) : p.r.request.body };
    const bodyCorr = p.r.response && typeof p.r.response === 'object' ? (p.r.response.TransactionId || p.r.response.transactionId || null) : null; const hdrCorr = (p.r.response_headers || {}).correlationid || null;
    const resf = { label: p.label, status: p.r.status, correlationId: hdrCorr || bodyCorr, headers: p.r.response_headers || undefined, durationMs: p.r.ms, requestedAtUtc: p.r.started_at, respondedAtUtc: p.r.ended_at, body: p.r.response && typeof p.r.response === 'object' ? redactSupplier(p.r.response) : (p.r.response || '(empty body)') };
    fs.writeFileSync(path.join(dir, 'requests-responses', `${n}_${lab}_request.json`), JSON.stringify(reqf, null, 2)); fs.writeFileSync(path.join(dir, 'requests-responses', `${n}_${lab}_response.json`), JSON.stringify(resf, null, 2));
    files.push({ n, lab, url: p.r.request.url, status: p.r.status, resf, ev: p.evidence, ep: p.r.endpoint });
  });
  // correlation ids of the evidence calls: original (error body TransactionId) or the header captured when the call was re-run
  const corrRows = []; const rmap = REPRO_CORR[b.id] || {};
  for (const f of files.filter(x => x.ev)) {
    const orig = f.resf.body && typeof f.resf.body === 'object' && (f.resf.body.TransactionId || f.resf.body.transactionId);
    const lbl = Object.keys(rmap).find(k => safe(k) === f.lab.replace(/__chain.*$/, ''));
    if (orig) corrRows.push({ label: f.lab, ep: f.ep, id: orig, src: 'original call — TransactionId of the error body (equals the CorrelationId response header)', status: f.status });
    else if (lbl && rmap[lbl].correlationId) { const rr = raw.find(x => x.id === rmap[lbl].recId); corrRows.push({ label: f.lab, ep: f.ep, id: rmap[lbl].correlationId, src: 'CorrelationId response header of the same call re-run on ' + rmap[lbl].at.slice(0, 19).replace('T', ' ') + ' UTC' + (rmap[lbl].note ? ' (' + rmap[lbl].note + ')' : '') + ' — the first run stored response bodies only, so the original id was not captured', status: rmap[lbl].status });
      if (rr) { const n = String(files.length + 1).padStart(2, '0'); const lab2 = safe('REPRO_' + lbl); const hdr = { ...rr.request.headers }; if (hdr['x-api-key']) hdr['x-api-key'] = '[REDACTED]'; fs.writeFileSync(path.join(dir, 'requests-responses', n + '_' + lab2 + '_request.json'), JSON.stringify({ label: 'REPRO ' + lbl, method: 'POST', url: rr.request.url, headers: hdr, body: rr.request.body && typeof rr.request.body === 'object' ? redactSupplier(rr.request.body) : rr.request.body }, null, 2)); fs.writeFileSync(path.join(dir, 'requests-responses', n + '_' + lab2 + '_response.json'), JSON.stringify({ label: 'REPRO ' + lbl, status: rr.status, correlationId: rmap[lbl].correlationId, durationMs: rr.ms, requestedAtUtc: rr.started_at, respondedAtUtc: rr.ended_at, headers: rr.response_headers, body: rr.response && typeof rr.response === 'object' ? redactSupplier(rr.response) : rr.response }, null, 2)); files.push({ n, lab: lab2, url: rr.request.url, status: rr.status, resf: { body: rr.response }, ev: false, ep: rr.endpoint + ' (re-run for the CorrelationId)' }); } }
    else corrRows.push({ label: f.lab, ep: f.ep, id: null, src: 'not captured', status: f.status });
  }
  const first = files.find(f => f.ev) || files[0]; const corr = null; const REPRO_CORR_USED = true;
  const base = rs.baseUrl; const fence = s => (jsonish(s) ? '```json\n' : '```text\n') + s + '\n```';
  const snippet = first ? JSON.stringify(first.resf.body, (k, v) => typeof v === 'string' && v.length > 90 ? v.slice(0, 80) + '…' : v, 2).slice(0, 1400) : '(no stored call applies)';
  const md = `# [V2][AirArabiaPlus][${b.api}] – ${tok(b.title_tail)}

## 📄 Description

${tok(b.desc)}

**Affected test cases:** ${b.tcs ? b.tcs.join(', ') : b.tc} (run \`${slug}\`).

## 🔁 Steps to Reproduce

${b.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## ❌ Actual Result

${fence(b.actual)}

${b.impact}

## ✅ Expected Result

${fence(b.expected)}

${b.why}

## 🖥️ System Information

- **API Version:** \`V2\`
- **Supplier/Airline:** \`AirArabiaPlus\` (carriers G9 / E5 / 3O through One-API)
- **Base URL:** \`${base}\`
- **API Name:** \`${b.api}\`
- **Environment:** \`${rs.environment_text || rs.environment}\`
- **Credentials Selector:** \`USA\`
- **Correlation ID (${b.api}, evidence call):** \`${(corrRows.find(c => c.id) || {}).id || 'Not captured'}\`
${corrRows.map(c => `  - ${c.ep} · ${c.label.replace(/__chain.*$/, '').replace(/_/g, ' ')} · HTTP ${c.status} · \`${c.id || 'not captured'}\` — ${c.src}`).join('\n')}

## 📊 Severity

**${b.sev}** — ${b.sevWhy}

## 📎 Evidence

**Actual response (redacted, first stored call: ${first ? first.lab : 'n/a'}):**

\`\`\`json
${snippet}
\`\`\`

**Expected response:**

${fence(b.expected)}

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the \`requests-responses/\` folder next to this file:

${files.length ? files.map(f => `- \`${f.n}_${f.lab}_request.json\` / \`${f.n}_${f.lab}_response.json\` — ${f.ev ? '**evidence call** ' : 'chain step '}${f.ep}, \`${f.url.replace(base, '/')}\`, HTTP ${f.status}`).join('\n') : 'No stored call applies.'}

## 💥 Impact

${b.impact}
`;
  fs.writeFileSync(path.join(dir, `${b.id}_${safe(b.api)}_${safe(b.field)}.md`), md, 'utf8');
  index.push(`- [${b.id}](${dirName}/${b.id}_${safe(b.api)}_${safe(b.field)}.md) — [V2][AirArabiaPlus][${b.api}] – ${tok(b.title_tail)} (${b.sev}) — ${files.length} request/response pair${files.length === 1 ? '' : 's'}`);
  findings.push({ type: 'finding', kind: 'defect', related_tc_id: b.tc, bug_id: b.id, field_name: b.field, summary: `${b.api}: ${tok(b.title_tail)} (also: ${(b.tcs || [b.tc]).filter(x => x !== b.tc).join(', ') || 'no other test case'})`, spec_ref: b.spec, expected_value: b.expected.slice(0, 200), impact: b.impact.slice(0, 400), evidence: tok(b.desc).slice(0, 500), severity: b.sev });
  files.forEach(f => usedFiles.push(path.join(dir, 'requests-responses')));
}
fs.writeFileSync(path.join(OUT, 'README.md'), `# Bug reports — AirArabiaPlus / USA One-API regression (${slug})\n\n${BUGS.length} consolidated defects (one folder each, many share a root cause across several failing test cases). Severity heuristic: Critical = state/security corruption or full block, High = core booking/identity/financial integrity, Medium = non-blocking but breaks a consumer, Low = cosmetic.\n\n${index.join('\n')}\n`, 'utf8');
// safety: the real API key must appear nowhere in the generated folders
const key = H['x-api-key']; let leaked = 0; (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (fs.readFileSync(p, 'utf8').includes(key)) { leaked++; console.log('KEY FOUND IN', p); } } })(OUT);
console.log('bug folders', BUGS.length, 'api-key occurrences:', leaked);
fs.writeFileSync(path.join(__dirname, 'out', 'bug_findings.json'), JSON.stringify(findings));
