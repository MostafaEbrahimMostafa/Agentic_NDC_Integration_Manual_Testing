// Writes the requests-responses files for the BUG-18 re-test bug folder from the raw capture (raw_bug18). Full bodies, x-api-key redacted, supplier payloads redacted.
const fs = require('fs'), path = require('path');
const RAW = path.join(__dirname, 'raw_bug18'); const slug = fs.readFileSync(path.join(__dirname, 'slug18.txt'), 'utf8').trim();
const OUT = path.join(__dirname, '../../Artifacts/BugReports', slug, 'BUG-18_AddPassenger_ParentPaxRefId', 'requests-responses'); fs.mkdirSync(OUT, { recursive: true });
const all = fs.readdirSync(RAW).map(f => JSON.parse(fs.readFileSync(path.join(RAW, f), 'utf8'))).sort((a, b) => Date.parse(a.started_at) - Date.parse(b.started_at));
const ok = r => r.status === 200; const red = v => { if (Array.isArray(v)) return v.map(red); if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) ? (v[k] == null ? null : '[REDACTED - raw supplier payload, per SPEC.md 7.14]') : red(v[k]); return o; } return v; };
const holdBook = (pnr, ep) => all.find(r => r.endpoint === ep && ok(r) && r.response && r.response.pnr === pnr);
const before = (ep, t, filt = () => true) => all.filter(r => r.endpoint === ep && Date.parse(r.started_at) <= Date.parse(t) && filt(r)).pop();
const chains = [
  { pnr: '6C7ADE', ep: 'Book', tag: 'SHJ-COK_2ADT-INF-Pax2', withFC: true }, { pnr: '6A9DOI', ep: 'Hold', tag: 'SHJ-COK_2ADT-INF-Pax2', withFC: false },
  { pnr: '6CXQB9', ep: 'Book', tag: 'COK-SHJ_3ADT-2INF-Pax4toPax3_Pax5toPax1' }, { pnr: '6UBF92', ep: 'Hold', tag: 'AMM-SHJ_3ADT-3INF-reversed' }, { pnr: '6C89C3', ep: 'Hold', tag: 'COK-SHJ_CONTROL_2ADT-INF-Pax1' },
];
let n = 0; const index = [];
const put = (label, r) => {
  n++; const nn = String(n).padStart(2, '0'); const lab = label.replace(/[^A-Za-z0-9_.-]/g, '_'); const h = Object.assign({}, r.request.headers); if (h['x-api-key'] !== undefined) h['x-api-key'] = '[REDACTED]';
  fs.writeFileSync(path.join(OUT, `${nn}_${lab}_request.json`), JSON.stringify({ label, method: 'POST', url: r.request.url, headers: h, body: red(r.request.body) }, null, 2));
  fs.writeFileSync(path.join(OUT, `${nn}_${lab}_response.json`), JSON.stringify({ label, status: r.status, correlationId: (r.response_headers || {}).correlationid || null, durationMs: r.ms, requestedAtUtc: r.started_at, respondedAtUtc: r.ended_at, body: red(r.response) }, null, 2));
  index.push({ nn, label, status: r.status, path: '/' + r.path, corr: (r.response_headers || {}).correlationid || null }); };
for (const c of chains) {
  const hb = holdBook(c.pnr, c.ep); if (!hb) throw new Error('missing ' + c.pnr);
  const ap = before('AddPassenger', hb.started_at, r => ok(r)); const rt = all.find(r => r.endpoint === 'Retrieve' && ok(r) && r.response && r.response.pnr === c.pnr);
  if (c.withFC) { const fc = before('FareConfirm', ap.started_at, ok); put(`${c.tag}_chain_FareConfirm`, fc); }
  put(`${c.tag}_AddPassenger`, ap); put(`${c.tag}_${c.ep}_${c.pnr}`, hb); put(`${c.tag}_Retrieve_${c.pnr}`, rt);
}
fs.writeFileSync(path.join(__dirname, 'bug18_index.json'), JSON.stringify(index, null, 1)); console.log(index.map(i => `${i.nn} ${i.label} ${i.status} ${i.path} ${i.corr || ''}`).join('\n'));
const txt = fs.readdirSync(OUT).map(f => fs.readFileSync(path.join(OUT, f), 'utf8')).join('\n'); const k0 = require('../V2/lib').H['x-api-key']; const key = k0 ? [null, k0] : null;
console.log('real key present in output:', key ? txt.includes(key[1]) : 'n/a (pattern not found)', '| unredacted supplier payload keys:', /"(supplierRequest|supplierResponse|OriginalSupplierRequest|OriginalSupplierResponse)":\s*"(?!\[REDACTED)[^"]{3,}/i.test(txt));
