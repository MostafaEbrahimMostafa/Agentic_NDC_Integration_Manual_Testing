// AirArabiaPlus/USA V2 regression client (ne-6). Reuses header/key handling from ../V2/lib.js (key never printed).
process.env.NDC_BASE = process.env.NDC_BASE || 'https://ndc-integration-stg-ne-6.azurewebsites.net/';
const fs = require('fs'), path = require('path');
const { call, now, sleep, BASE } = require('../V2/lib');
const SUP = { supplier: 'AirArabiaPlus', credentialsSelector: 'USA' };
const RAW = process.env.RAW_DIR || path.join(__dirname, 'raw');
fs.mkdirSync(RAW, { recursive: true });
let seq = 0;
// strip supplier debug payloads before anything is persisted
function scrub(v) { if (Array.isArray(v)) return v.map(scrub); if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) ? '[REDACTED - per SPEC.md 7.14]' : scrub(v[k]); return o; } return v; }
// leakInfo(): booleans only (never the content) - does the body carry raw supplier request/response, and do they look like they hold credentials?
function leakInfo(v) { const o = { raw: false, cred: false, keys: [] }; (function w(x) { if (Array.isArray(x)) x.forEach(w); else if (x && typeof x === 'object') for (const k of Object.keys(x)) { if (/supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) && x[k] != null && String(x[k]).length > 2) { o.raw = true; o.keys.push(k); if (/password|passwd|wsse:|secret|api[-_]?key|authorization|bearer /i.test(String(x[k]))) o.cred = true; } else w(x[k]); } })(v); return o; }
// hop(): one API call; persists the full (scrubbed) request/response to raw/<n>.json and returns a record
async function hop(tc, step, endpoint, p, body, opts = {}) {
  const h = await call(endpoint, p, body, opts);
  const id = String(++seq).padStart(5, '0') + '_' + Date.now();
  const leak = h.json ? leakInfo(h.json) : { raw: false, cred: false, keys: [] };
  const rec = { id, tc, step, endpoint, path: p, leak, status: h.status, ms: h.ms, started_at: h.started_at, ended_at: h.ended_at,
    request: { url: BASE + p, headers: h.request_full.headers, body: opts.raw !== undefined ? '[raw] ' + String(opts.raw).slice(0, 400) : body },
    response_headers: h.response_full && h.response_full.headers, response: h.json ? scrub(h.json) : h.text.slice(0, 1500) };
  fs.writeFileSync(path.join(RAW, id + '.json'), JSON.stringify(rec));
  h.rec = rec; return h;
}
const amt = x => x == null ? null : (typeof x === 'object' ? x.amount : x);
module.exports = { hop, SUP, now, sleep, BASE, amt, scrub, RAW };
