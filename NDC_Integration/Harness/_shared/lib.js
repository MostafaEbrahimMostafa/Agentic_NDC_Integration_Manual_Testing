// Minimal V2 API client for the SeatMap rounds (GulfAir/KSA, staging). Node 18+.
const BASE = process.env.NDC_BASE || 'https://ndc-integration-stg-ne-3.azurewebsites.net/';
// Secrets come from the environment or the git-ignored repo-root .env (see .env.example). Never hard-code them here.
function loadEnvFile() {
  const p = require('path').join(__dirname, '..', '..', '..', '.env'); const out = {};
  try { for (const line of require('fs').readFileSync(p, 'utf8').split(/\r?\n/)) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/); if (m) out[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2'); } } catch {}
  return out;
}
const ENVF = loadEnvFile();
const API_KEY = process.env.NDC_API_KEY || ENVF.NDC_API_KEY || undefined;
const CLIENT_ID = process.env.NDC_CLIENT_ID || ENVF.NDC_CLIENT_ID || 'NDC-Core';
const H = { 'x-api-key': API_KEY, 'Client-Id': CLIENT_ID, 'Content-Type': 'application/json' };
const SUP = { supplier: 'GulfAir', credentialsSelector: 'KSA' };
const now = () => new Date().toISOString();
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Truncate large bodies before they reach the jsonl (arrays > 3 items, strings > 110 chars).
function trunc(v, d = 0) {
  if (Array.isArray(v)) return v.slice(0, 3).map(x => trunc(x, d + 1)).concat(v.length > 3 ? ['...(' + (v.length - 3) + ' more)'] : []);
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) ? '[REDACTED - per SPEC.md 7.14]' : trunc(v[k], d + 1); return o; }
  if (typeof v === 'string' && v.length > 110) return v.slice(0, 100) + '...[truncated]';
  return v;
}

// call(): one API call, returns a hop record (with real clock started_at/ended_at) plus parsed body.
async function call(endpoint, path, body, { headers, raw, label } = {}) {
  if (!API_KEY && !(headers && 'x-api-key' in headers)) throw new Error('NDC_API_KEY is not set: copy .env.example to .env at the repo root and fill it in (or export NDC_API_KEY).');
  const started_at = now(), t0 = Date.now();
  const hdr = Object.assign({}, H, headers || {});
  for (const k of Object.keys(hdr)) if (hdr[k] === null) delete hdr[k];
  let status = 0, text = '', rh = {};
  try {
    const r = await fetch(BASE + path, { method: 'POST', headers: hdr, body: raw !== undefined ? raw : JSON.stringify(body) });
    status = r.status; text = await r.text(); r.headers.forEach((v, k) => rh[k] = v);
  } catch (e) { text = 'FETCH_ERROR ' + e.message; }
  const ended_at = now();
  let json = null; try { json = JSON.parse(text); } catch {}
  const rq = Object.assign({}, hdr); if (rq['x-api-key']) rq['x-api-key'] = '[REDACTED]';
  return { endpoint: label || endpoint, status, ms: Date.now() - t0, json, text, started_at, ended_at,
    request_full: { method: 'POST', url: BASE + path, headers: rq, body: raw !== undefined ? '[raw body] ' + raw.slice(0, 400) : trunc(body) },
    response_full: { status, headers: rh, body: json ? trunc(json) : text.slice(0, 600) } };
}
module.exports = { call, H, SUP, now, sleep, trunc, BASE };
