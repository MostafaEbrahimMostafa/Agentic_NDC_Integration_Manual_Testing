// V2 Availability engine shared by every Availability supplier (Galileo/EGY ne-4, SabreNdc/EGY ne-7): client, evaluators, fixtures and test-case logger.
// Supplier settings: ./suppliers.js. Test groups and notes: ./<Supplier>/. Run outputs: ./<Supplier>/out/.
// Reuses ../_shared/lib.js (headers/key, key never printed), ../_shared/{core,recorder,csvparse}.js (raw call store, JSONL recorder).
const fs = require('fs'), path = require('path');
const SUP = require('./suppliers').resolve(); const CFG = SUP.cfg, OUT = SUP.out, SUPDIR = SUP.dir;
fs.mkdirSync(path.join(OUT, 'raw'), { recursive: true });
process.env.NDC_BASE = CFG.baseFixed ? CFG.base : (process.env.NDC_BASE || CFG.base);
process.env.RAW_DIR = path.join(OUT, 'raw');
process.env.SLUG = process.env.SLUG || fs.readFileSync(path.join(OUT, 'slug.txt'), 'utf8').trim();
const R = require('../_shared/recorder');
const C = require('../_shared/core');
const { call, H } = require('../_shared/lib');
const parse = require('../_shared/csvparse');
const { now, sleep, BASE } = C;

const TC_DIR = path.resolve(__dirname, '../../TestCases');
const rows = CFG.csv.flatMap(f => parse(path.join(TC_DIR, f))).concat(CFG.csvOptional.flatMap(f => fs.existsSync(path.join(TC_DIR, f)) ? parse(path.join(TC_DIR, f)) : []));
const byId = Object.fromEntries(rows.map(r => [r.ID, r]));
const AV = 'api/V2/FlightSearch/Availability', SEL = 'api/V2/FlightSearch/SelectAvailability', FC = 'api/v2/FlightSearch/FareConfirm';
const SUPB = { supplier: CFG.supplier, credentialsSelector: CFG.selector };
const clone = x => JSON.parse(JSON.stringify(x));
const d = n => { const x = new Date(); x.setUTCHours(0, 0, 0, 0); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().substring(0, 10) + 'T00:00:00Z'; };
const leg = (o, dd, days) => ({ origin: o, destination: dd, date: d(days) });
const PAX = [{ passengerTypeCode: 'ADT', count: 2 }, { passengerTypeCode: 'INF', count: 1 }];
const baseBody = (over = {}) => ({ ...SUPB, searchCriteria: [leg('CAI', 'JED', 30)], passengers: clone(PAX), isDebug: false, ...over });
const nextBody = (j, over = {}) => ({ ...SUPB, availabilityId: j.availabilityId, responseId: j.responseId, isDebug: false, ...over });
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const short = (s, n = 140) => { s = String(s); return s.length > n ? s.slice(0, n - 3) + '...' : s; };
const tokenless = s => String(s).replace(/[A-Za-z0-9+\/=_&?-]{60,}/g, '<id>');

// ---------- evaluators ----------
function envOf(h) {
  const j = h.json && typeof h.json === 'object' && !Array.isArray(h.json) ? h.json : {}; const keys = Object.keys(j);
  const g = k => { const key = keys.find(x => x.toLowerCase() === k); return key === undefined ? undefined : j[key]; };
  const casing = keys.includes('ErrorCode') ? 'PascalCase' : keys.includes('errorCode') ? 'camelCase' : 'none';
  return { status: g('status'), tid: g('transactionid'), code: g('errorcode'), msg: g('errormessage'), ctx: g('context'), casing, keys };
}
function leakOf(h) {
  const parts = []; let raw = false;
  (function w(x) { if (Array.isArray(x)) x.forEach(w); else if (x && typeof x === 'object') for (const k of Object.keys(x)) { if (/^(original)?supplier(request|response)$/i.test(k) && x[k] != null && String(x[k]).length > 2) { raw = true; parts.push(k); } else w(x[k]); } })(h.json);
  const e = envOf(h); const msgs = String(e.msg) + JSON.stringify(e.ctx || '') + (h.json ? '' : (h.text || ''));
  const net = /\b(System|Microsoft|Newtonsoft|Travelport|NDC)\.[A-Za-z0-9_.]+|\b[A-Za-z]+Dto\b|StackTrace|Exception\b|\bat \S+\(.*\) in \S+|\.cs:line|azurewebsites\.net|localhost/.test(msgs);
  return { raw, net, parts };
}
function credScan(h) { // booleans only - never the content
  const t = h.text || ''; return { hasRaw: /supplier(request|response)/i.test(t) && leakOf(h).raw, pwd: /password|passwd|<com:Password|wsse:|bearer |api[-_]?key|\busername\b/i.test(t.replace(/credentials for the selected supplier/gi, '')), pcc: /TargetBranch=\\?"[^"\\]+/.test(t), authBy: ((t.match(/AuthorizedBy=\\?"([^"\\]*)/) || [])[1]) };
}
function std4xx(h, o = {}) {
  const e = envOf(h), lk = leakOf(h), p = [];
  if (!(h.status >= 400 && h.status < 500)) p.push(`HTTP ${h.status} instead of a 4xx`);
  if (e.code === undefined || e.msg === undefined || e.tid === undefined || e.status === undefined) p.push('error envelope incomplete (needs Status, TransactionId, ErrorCode, ErrorMessage)');
  if (lk.raw) p.push(`raw supplier request/response in the error body (${[...new Set(lk.parts)].join('/')})`);
  if (lk.net && !o.ignoreNet) p.push('internal/.NET detail in ErrorMessage/Context');
  return { ok: !p.length, problems: p, e, lk };
}
const errTxt = h => { const e = envOf(h); return `HTTP ${h.status}${e.code !== undefined ? '; ErrorCode ' + e.code : ''}${e.msg !== undefined ? '; ErrorMessage "' + short(tokenless(e.msg), 110) + '"' : ''}${e.ctx ? '; Context ' + short(tokenless(JSON.stringify(e.ctx)), 100) : ''}; envelope ${e.casing}`; };
const timedOut = h => { const e = envOf(h); return /Z9999/.test(String(e.code)) || /TimedOut/i.test(JSON.stringify(e.ctx || '')); };
const ODS = j => (j && j.originDestinations) || [];
const segHasCode = (s, code) => (s.cabins || []).some(c => (c.bookingClasses || []).some(b => String(b.bookingCode || '').toUpperCase() === code));
const classFor = (s, code) => (s.cabins || []).flatMap(c => c.bookingClasses || []).find(b => String(b.bookingCode || '').toUpperCase() === code);
// pick, per originDestination, the first journey whose every segment offers `code` (collection rule). opts.connecting: first journey with 2+ segments. opts.skip: skip n usable journeys.
function pickMap(j, code = 'Y', opts = {}) {
  const map = {}, chosen = [], missing = [];
  ODS(j).forEach((od, i) => {
    let usable = (od.journeys || []).filter(x => (x.segments || []).length > (opts.connecting ? 1 : 0) && x.segments.every(s => segHasCode(s, code)));
    const pref = CFG.preferCarrier && (opts.carrier || process.env.PREFER_CARRIER); if (pref) { const pc = usable.filter(x => x.segments.every(s => { const si = (j.flightSegments || {})[s.segmentRefId]; return si && si.marketingCarrierCode === pref; })); if (pc.length) usable = pc; }
    const jn = usable[opts.skip || 0];
    if (!jn) { missing.push(`${od.origin}-${od.destination}`); return; }
    map[jn.journeyRefId] = {}; jn.segments.forEach(s => { map[jn.journeyRefId][s.segmentRefId] = [classFor(s, code).bookingClassId]; }); chosen.push({ od: i, journey: jn });
  });
  return { map, chosen, missing };
}
const segInfo = (j, ref) => (j.flightSegments || {})[ref];
const flightKey = s => s ? `${s.marketingCarrierCode}${s.marketingFlightNumber}@${s.departureDateTime}` : '?';
function add(out, p, t) { if (!out.has(p)) out.set(p, new Set()); out.get(p).add(t); }
function paths(v, p = '', out = new Map()) {
  if (Array.isArray(v)) { add(out, p, 'array'); v.forEach(x => paths(x, p + '[]', out)); }
  else if (v && typeof v === 'object') { add(out, p, 'object'); for (const k of Object.keys(v)) { const dict = /^\.(journeys|flightSegments|priceClasses|baggageDetails)$/.test(p); paths(v[k], p + '.' + (dict ? '*' : k), out); } }
  else add(out, p, v === null ? 'null' : typeof v);
  return out;
}
function diffPaths(a, b) { // baseline a vs current b (null is compatible with any type)
  const A = paths(a), B = paths(b), removed = [], retyped = [], added = [];
  for (const [p, t] of A) { if (!B.has(p)) { if (![...t].every(x => x === 'null')) removed.push(p); continue; } const u = B.get(p); const tt = [...t].filter(x => x !== 'null'), uu = [...u].filter(x => x !== 'null'); if (tt.length && uu.length && !tt.some(x => uu.includes(x))) retyped.push(`${p}: ${tt} -> ${uu}`); }
  for (const p of B.keys()) if (!A.has(p)) added.push(p);
  return { removed, retyped, added };
}
const sum = (a, f) => a.reduce((s, x) => s + f(x), 0), near = (a, b) => Math.abs(a - b) < 0.011;
function recon(fc, counts = { ADT: 2, INF: 1 }) { // SPEC 2.1 price-integrity contract on selectedOffer
  const o = fc.selectedOffer, pd = o.priceDetails, msgs = [], pax = o.passengerFareBreakdown || [];
  let totB = 0, totT = 0, totA = 0; const cur = new Set();
  for (const p of pax) { const n = counts[p.passengerTypeCode] || 0; const tx = sum(p.taxesAndFees || [], t => t.amount.amount); cur.add(p.paxTotalAmount.currency);
    if (!near(tx, p.paxTotalTaxAmount.amount)) msgs.push(`${p.passengerTypeCode}: sum(taxesAndFees)=${tx} != paxTotalTaxAmount=${p.paxTotalTaxAmount.amount}`);
    if (!near(p.paxBaseAmount.amount + p.paxTotalTaxAmount.amount, p.paxTotalAmount.amount)) msgs.push(`${p.passengerTypeCode}: base ${p.paxBaseAmount.amount} + tax ${p.paxTotalTaxAmount.amount} != paxTotalAmount ${p.paxTotalAmount.amount}`);
    totB += p.paxBaseAmount.amount * n; totT += p.paxTotalTaxAmount.amount * n; totA += (p.paxBaseAmount.amount + p.paxTotalTaxAmount.amount) * n; }
  if (!near(totA, pd.totalAmount.amount)) msgs.push(`sum((base+tax)*count)=${totA} != totalAmount=${pd.totalAmount.amount}`);
  if (!near(totB, pd.totalBaseAmount.amount)) msgs.push(`sum(base*count)=${totB} != totalBaseAmount=${pd.totalBaseAmount.amount}`);
  if (!near(totT, pd.totalTaxAmount.amount)) msgs.push(`sum(tax*count)=${totT} != totalTaxAmount=${pd.totalTaxAmount.amount}`);
  const ptx = sum(pd.taxesAndFees || [], t => t.amount.amount); if (!near(ptx, pd.totalTaxAmount.amount)) msgs.push(`priceDetails sum(taxesAndFees)=${ptx} != totalTaxAmount=${pd.totalTaxAmount.amount}`);
  [pd.totalAmount, pd.totalBaseAmount, pd.totalTaxAmount].forEach(a => cur.add(a.currency)); if (cur.size > 1) msgs.push('mixed currencies: ' + [...cur]);
  return { ok: !msgs.length, msgs, totals: { totA, totB, totT }, currency: [...cur].join('/') };
}
const literalNull = j => { const bad = []; (function w(x, p) { if (Array.isArray(x)) x.forEach((y, i) => w(y, p + '[' + i + ']')); else if (x && typeof x === 'object') for (const k of Object.keys(x)) w(x[k], p + '.' + k); else if (typeof x === 'string' && /^(null|none|undefined)$/i.test(x.trim())) bad.push(p); })(j, ''); return bad; };
const nk = k => (/^P\d+-[A-Z]\d+/.test(k) || (k.length >= 12 && /\d/.test(k) && /^[A-Za-z0-9+\/=_&?-]+$/.test(k))) ? '*' : k;
const nullFields = j => { const f = new Set(); (function w(x, p) { if (Array.isArray(x)) x.forEach(y => w(y, p + '[]')); else if (x && typeof x === 'object') for (const k of Object.keys(x)) { if (x[k] === null) f.add(p + '.' + nk(k)); else w(x[k], p + '.' + nk(k)); } })(j, ''); return [...f]; };

// ---------- requests (every call goes to the raw store; hops of the running test case are collected in ctx.hops) ----------
const sumBody = b => { try { return short(JSON.stringify(b, (k, v) => typeof v === 'string' && v.length > 36 ? v.slice(0, 18) + '…<id>' : v), 330); } catch (e) { return ''; } };
function respSum(h) {
  const j = h.json; if (!j) return `${h.status} — ${short(tokenless(h.text), 150)}`;
  if (j.availabilityId) return `${h.status} — page ${j.pageNumber}, hasMoreResults=${j.hasMoreResults}, ${ODS(j).length} originDestinations, journeys per OD [${ODS(j).map(o => (o.journeys || []).length)}], availabilityId/responseId present`;
  if (j.offerId && !j.selectedOffer) return `${h.status} — responseId, offerId present (keys: ${Object.keys(j).join(', ')})`;
  if (j.selectedOffer) return `${h.status} — selectedOffer.offerId present, total ${j.selectedOffer.priceDetails && j.selectedOffer.priceDetails.totalAmount.amount} ${j.selectedOffer.priceDetails && j.selectedOffer.priceDetails.totalAmount.currency}`;
  return `${h.status} — ${errTxt(h)}`;
}
async function req(ctx, label, endpoint, p, body, opts = {}) {
  // CFG.taRetry (SabreNdc): "ReachedTALimit" (session cap on the account) is a supplier-side throttle, not a test result: wait and retry, log each event and the waited time.
  let h; for (let i = 0; i < 12; i++) {
    h = await C.hop(ctx.id, label, endpoint, p, body, opts);
    if (!CFG.taRetry || !(h.status === 409 && /ReachedTALimit/.test(h.text || ''))) break;
    const w = i < 2 ? 120000 : 240000; TA.push({ at: now(), tc: ctx.id, endpoint, attempt: i + 1, waited_ms: w }); ctx.wait = (ctx.wait || 0) + w;
    fs.writeFileSync(path.join(OUT, 'ta_events_' + (process.env.GROUP || 'x') + '.json'), JSON.stringify(TA)); console.log(`   ReachedTALimit on ${endpoint} (${ctx.id}); waiting ${w / 1000}s, attempt ${i + 1}`); await sleep(w);
  }
  h.label = label; h.request_summary = `POST /${p} — ${label}: ${opts.raw !== undefined ? '[raw] ' + short(opts.raw, 160) : sumBody(body)}`; h.response_summary = respSum(h);
  ctx.hops.push(h); return h;
}
async function reqGet(ctx, label, endpoint, p, opts = {}) {
  const started_at = now(), t0 = Date.now(); const hdr = { ...H }; let status = 0, text = '', rh = {};
  try { const r = await fetch(BASE + p, { method: 'GET', headers: hdr }); status = r.status; text = await r.text(); r.headers.forEach((v, k) => rh[k] = v); } catch (e) { text = 'FETCH_ERROR ' + e.message; }
  const ended_at = now(); let json = null; try { json = JSON.parse(text); } catch { }
  const rq = { ...hdr, 'x-api-key': '[REDACTED]' };
  const h = { endpoint, status, ms: Date.now() - t0, json, text, started_at, ended_at, label, request_full: { method: 'GET', url: BASE + p, headers: rq, body: null }, response_full: { status, headers: rh, body: json ? C.scrub(json) : text.slice(0, 600) } };
  h.request_summary = `GET /${p} — ${label}`; h.response_summary = json ? respSum(h) : `${status} — ${short(text, 120) || '(empty body)'}`;
  fs.writeFileSync(path.join(C.RAW, 'get_' + Date.now() + '.json'), JSON.stringify({ tc: ctx.id, step: label, endpoint, path: p, status, ms: h.ms, started_at, ended_at, request: h.request_full, response: h.response_full.body }));
  ctx.hops.push(h); return h;
}
const av = (ctx, label, body, opts) => req(ctx, label, 'Availability', AV, body, opts);
const nx = (ctx, label, body, opts) => req(ctx, label, 'NextAvailability', AV, body, opts);
// ne-7 SabreNdc Select takes bookingClassIds as a flat string list; the collection (and Galileo ne-4) send {journeyRefId:{segmentRefId:[id]}}. opts.flat flattens the map.
const flatIds = m => Array.isArray(m) ? m.flatMap(x => (x && typeof x === 'object') ? flatIds(x) : [x]) : (m && typeof m === 'object') ? Object.values(m).flatMap(v => v === null ? [] : (typeof v === 'object' ? flatIds(v) : [v])) : m;
const sel = (ctx, label, body, opts) => req(ctx, label, 'SelectAvailability', SEL, !(opts && opts.flat) || !body || body.bookingClassIds === undefined ? body : { ...body, bookingClassIds: flatIds(body.bookingClassIds) }, opts);
const fcq = (ctx, label, body, opts) => req(ctx, label, 'FareConfirm', FC, body, opts);
// CFG.selectForm 'single' (Galileo): build of 2026-11-15 (after ~08:40 UTC) rejects bookingClassIds as {journey:{segment:[id]}} (HTTP 400) and accepts {journey:{segment:id}}; SELECT_FORM=array restores the old form
const selForm = map => { if (CFG.selectForm !== 'single' || process.env.SELECT_FORM === 'array' || !map || typeof map !== 'object') return map; const o = {}; for (const [jk, segs] of Object.entries(map)) { if (!segs || typeof segs !== 'object' || Array.isArray(segs)) { o[jk] = segs; continue; } o[jk] = {}; for (const [sk, v] of Object.entries(segs)) o[jk][sk] = Array.isArray(v) && v.length === 1 ? v[0] : v; } return o; };
const selBody = (j, map, over = {}) => ({ ...SUPB, availabilityId: j.availabilityId, responseId: j.responseId, bookingClassIds: selForm(map), ...over });
const fcBody = (s, over = {}) => ({ ...SUPB, ResponseId: s.responseId, selectedOfferId: s.offerId, ...over });

// first page, retried once on an empty/failed answer (supplier is slow, ids are per call)
async function page1(ctx, label = 'Availability page 1 (BASE CAI-JED, 2 ADT + 1 INF)', over = {}, opts = {}) {
  let h = await av(ctx, label, baseBody(over), opts); if (h.status !== 200 && !opts.noRetry && h.status >= 500) { await sleep(1500); h = await av(ctx, label + ' (retry)', baseBody(over), opts); } return h;
}
// Availability -> Select (-> FareConfirm); returns every step; stops at the first failed step
async function chain(ctx, o = {}) {
  const out = {}; const pre = o.label ? o.label + ' ' : '';
  const p1 = out.p1 = await av(ctx, pre + (o.p1label || 'Availability page 1'), o.body || baseBody()); if (p1.status !== 200 || !p1.json || !p1.json.availabilityId) return out;
  const pm = out.pm = pickMap(p1.json, 'Y', o.pick || {}); if (pm.missing.length || !Object.keys(pm.map).length) return out;
  if (o.until === 'p1') return out;
  const s = out.sel = await sel(ctx, pre + 'SelectAvailability', selBody(p1.json, pm.map)); if (s.status !== 200 || !s.json || !s.json.offerId) return out;
  if (o.until === 'sel') return out;
  out.fc = await fcq(ctx, pre + 'FareConfirm', fcBody(s.json)); return out;
}

// ---------- test-case execution + logging ----------
const RES = {}, ERRS = {}, DEF = [], UNK = new Set(), TA = [];
const epOf = id => /^TC-RTMC-(01|05|07|10)$/.test(id) ? 'Availability' : /^TC-RTMC-04$/.test(id) ? 'NextAvailability' : /^TC-RTMC-03$/.test(id) ? 'SelectAvailability' : /^TC-RTMC/.test(id) ? 'Round trip / multi-city flow' : /^TC-CAPCHECK/.test(id) ? 'Availability' : /^TC-AVAIL/.test(id) ? 'Availability' : /^TC-NEXTAVAIL/.test(id) ? 'NextAvailability' : /^TC-SELECTAVAIL/.test(id) ? 'SelectAvailability' : /^TC-FARECONFIRM/.test(id) ? 'FareConfirm' : /^TC-COLLECTION/.test(id) ? 'Postman collection' : /^TC-FLOW-V2-(GALBOOK|SABBOOK)/.test(id) ? 'Flow (Availability → … → Book/Hold → Retrieve)' : 'Flow (Availability → Select → FareConfirm)';
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null;
async function tc(id, fn) {
  if (ONLY && !ONLY.has(id)) return { v: 'SKIPPED' };
  const row = byId[id]; if (!row) throw new Error('no CSV row ' + id);
  const ctx = { id, hops: [] }; const started_at = now(); let r;
  try { r = await fn(ctx); } catch (e) { r = { v: 'BLOCKED', actual: 'Harness error before a verdict was reached: ' + e.message }; }
  const hops = ctx.hops; const last = hops[hops.length - 1]; const ep = epOf(id);
  const line = { tc_id: id, title: row.Title, endpoint_or_flow: ep, category: row.RowType === 'Flow' ? 'Flow' : row.Category, verdict: r.v, spec_ref: row.SpecReference,
    request_summary: hops.length ? (hops.length === 1 ? hops[0].request_summary : hops.map((h, i) => `${i + 1}. ${h.label}`).join(' → ')) : (r.req || 'No API request (static check)'),
    response_summary: hops.length ? (hops.length === 1 ? hops[0].response_summary : hops.map((h, i) => `${i + 1}. ${h.status}`).join(' → ') + ' — ' + last.response_summary) : (r.resp || 'n/a'),
    expected: row['Expected Result'], actual: r.actual, evidence: r.evidence || r.actual, started_at, timestamp: now() };
  if (hops.length) { const hdrs = last.response_full && last.response_full.headers || {}; const ck = Object.keys(hdrs).find(k => /correlation/i.test(k)); if (ck) line.correlation_id = hdrs[ck]; }
  line.plain = { e: ep, q: r.q || (hops.length ? `Sent ${hops.length} request${hops.length > 1 ? 's' : ''}: ` + hops.map(h => h.label).join(' → ') : 'Nothing was sent — static check of the Postman collection file.'), s: hops.length ? hops.map(h => h.status).join(' → ') : 'n/a', x: short(row['Expected Result'], 330), a: esc(r.actual) };
  if (hops.length === 1) { line.request_full = hops[0].request_full; line.response_full = hops[0].response_full; }
  else if (hops.length > 1) line.hops = hops.map((h, i) => ({ endpoint: h.endpoint, request_summary: h.request_summary, response_summary: h.response_summary, expected: h.exp || '', actual: h.act || h.response_summary, verdict: h.v || (i === hops.length - 1 ? r.v : (h.status < 400 ? 'PASS' : 'FAIL')), evidence: h.ev || '', started_at: h.started_at, ended_at: h.ended_at, request_full: h.request_full, response_full: h.response_full }));
  if (r.waiting_ms) line.waiting_ms = r.waiting_ms;
  if (ctx.wait) line.waiting_ms = (line.waiting_ms || 0) + ctx.wait;
  line.timestamp = hops.length ? last.ended_at : line.timestamp;
  R.logTC(line);
  for (const u of r.unknown || []) if (!UNK.has(u)) { UNK.add(u); R.finding({ kind: 'unknown_resolution', related_tc_id: id, summary: u, spec_ref: row.SpecReference, evidence: short(r.actual, 600) }); }
  if (r.v === 'FAIL') DEF.push({ tc: id, actual: r.actual, hops: hops.map(h => h.rec && h.rec.id).filter(Boolean) });
  fs.writeFileSync(path.join(OUT, 'results_' + (process.env.GROUP || 'x') + '.json'), JSON.stringify({ RES, ERRS, DEF }, null, 1));
  RES[id] = r.v; console.log(`${r.v.padEnd(7)} ${id.padEnd(30)} ${short(r.actual, 170)}`);
  return r;
}
// negative family helper: expects a clean 4xx envelope. ok -> PASS.  extra(h) may add a non-envelope problem.
async function negStd(ctx, label, send, o = {}) {
  const h = await send(ctx, label); const s = std4xx(h, o); const probs = [...s.problems]; if (o.extra) { const x = o.extra(h); if (x) probs.push(x); }
  ERRS[ctx.id] = { ep: h.endpoint, status: h.status, code: s.e.code, msg: short(tokenless(s.e.msg), 160), casing: s.e.casing, ok: s.ok };
  const ok = !probs.length; let a = `${errTxt(h)}. ${ok ? 'Clean 4xx standard envelope, nothing leaked.' : 'Problems: ' + probs.join('; ') + '.'}`;
  if (o.ignoreNet && s.lk.net && ok) a += ' Note: the Context exposes internal type/DTO names (assessed separately in TC-AVAIL-SEC-07).'; if (h.status === 200 && h.json) a = `HTTP 200 — the request was accepted (${short(respSum(h), 160)}). Problems: ${probs.join('; ')}.`;
  return { v: ok ? 'PASS' : 'FAIL', actual: a, h };
}
module.exports = { fs, path, R, C, call, H, parse, now, sleep, BASE, rows, byId, AV, SEL, FC, SUPB, clone, d, leg, PAX, baseBody, nextBody, selBody, fcBody, esc, short, tokenless,
  envOf, leakOf, credScan, std4xx, errTxt, timedOut, ODS, segHasCode, classFor, pickMap, segInfo, flightKey, paths, diffPaths, recon, literalNull, nullFields,
  req, reqGet, flatIds, av, nx, sel, fcq, page1, chain, tc, negStd, RES, ERRS, DEF, UNK, sum, near, CFG, OUT, SUPDIR, SUPPLIER: SUP.name };
