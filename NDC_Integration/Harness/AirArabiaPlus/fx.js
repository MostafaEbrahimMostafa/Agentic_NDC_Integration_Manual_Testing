// Shared helpers + memoised fixtures for single-endpoint test groups.
const path = require('path');
const C = require('../_shared/chain'); const B = require('./tcbuild'); const { SUP, now, sleep, amt } = require('../_shared/core');
const csv = require('../_shared/csvparse');
const TCDIR = path.resolve(__dirname, '../../TestCases');
const D1 = process.env.D1 || '2026-12-08', D2 = process.env.D2 || '2026-12-15';
const ok = h => h && h.status === 200 && h.json && !h.json.ErrorCode && !h.json.errorCode;
const structured = h => !!(h && h.json && (h.json.ErrorCode || h.json.errorCode || h.json.title || h.json.errors));
// a controlled rejection: 4xx with a structured error body (never 5xx, never a silent 200)
const controlled = h => h && h.status >= 400 && h.status < 500 && structured(h);
const ctxNew = id => C.newCtx(id);
const errLine = h => h ? (h.json ? `${h.status} ${h.json.ErrorCode || h.json.errorCode || h.json.title || ''} ${String(h.json.ErrorMessage || h.json.detail || '').slice(0, 100)}${h.json.Context && h.json.Context[0] ? ' | ' + String(h.json.Context[0].Value).slice(0, 140) : ''}`.trim() : `${h.status} ${(h.text || '').slice(0, 100)}`) : 'no response';
const view = (h, v) => { h.view = v; return h; };

// ---- CSV rows (titles/expected/spec) -> definitions
const SRC = { generic: csv(path.join(TCDIR, '_Generic/TestCases_Generic.csv')), v2: csv(path.join(TCDIR, '_Generic/TestCases_V2.csv')), seat: csv(path.join(TCDIR, 'SeatMap/SeatMap_TestCases.csv')), void: csv(path.join(TCDIR, 'Void/VoidUnified_TestCases.csv')), amd: csv(path.join(TCDIR, 'PassengerNames/Amadeus_PassengerNameLimits_TestCases.csv')) };
const catOf = r => { const c = (r.Category || r.RowType || '').toUpperCase(); const id = r.ID || ''; const m = { POS: 'Positive', NEG: 'Negative', VAL: 'Validation', BND: 'Boundary', BIZ: 'Business Rule', REG: 'Regression', SEC: 'Security', INT: 'Integration', CAPCHECK: 'Business Rule' };
  if (/^FLOW/.test(id)) return 'Flow'; const k = (id.match(/-(POS|NEG|VAL|BND|BIZ|REG|SEC|INT|CAPCHECK)(-|$)/) || [])[1]; return m[k] || m[c] || 'Business Rule'; };
function def(src, id, extra = {}) {
  const r = SRC[src].find(x => x.ID === id); if (!r) throw new Error('row not found ' + src + ' ' + id);
  return { id, src, title: r.Title.replace(/\s+$/, ''), category: catOf(r), spec: r.SpecReference || '', expected: r['Expected Result'], csvRow: r, ...extra };
}
// Search that shifts the dates when the supplier has no inventory on the planned ones
async function sFind(ctx, routes, types, o = {}) {
  const shift = (rs, d) => rs.map(([a, b, dt]) => [a, b, new Date(Date.parse(dt) + d * 864e5).toISOString().slice(0, 10)]);
  let S = null; for (const d of [0, 4, 12, 19, -7]) { S = await C.search(ctx, shift(routes, d), types, { ...o, tries: d ? 1 : 2 }); S.shiftDays = d; S.routesUsed = shift(routes, d); if (S.offer) { if (d) ctx.notes.push('dates shifted by ' + d + ' day(s) to find inventory'); return S; } await sleep(2000); }
  return S;
}
// ---- raw call store (full, scrubbed request/response of every call made by this run) - used instead of the truncated JSONL when a check needs whole bodies
let rawCache = null;
function rawItems() {
  if (rawCache && Date.now() - rawCache.t < 20000) return rawCache.v; const dir = path.join(__dirname, 'out', 'raw'); const v = [];
  for (const f of require('fs').readdirSync(dir)) { try { const r = JSON.parse(require('fs').readFileSync(path.join(dir, f), 'utf8')); v.push({ tc: r.tc, endpoint: r.endpoint, status: r.status, started_at: r.started_at, ended_at: r.ended_at, ms: r.ms, req: r.request && r.request.body, res: r.response, leak: r.leak }); } catch (e) { } }
  v.sort((a, b) => Date.parse(a.started_at) - Date.parse(b.started_at)); rawCache = { t: Date.now(), v }; return v;
}
const rawOk = r => r.status === 200 && r.res && typeof r.res === 'object' && !r.res.ErrorCode && !r.res.errorCode;
const rawOf = (tc, endpoint) => rawItems().filter(r => r.tc === tc && r.endpoint === endpoint && rawOk(r)).pop();
// ---- memoised fixtures: Search -> FareConfirm -> AddPassenger -> GetAncillary -> SeatMap. TTL 6 min; every hop is kept as precondition evidence.
const memo = {};
async function chainTo(level, types = ['ADT'], o = {}) {
  const key = level + '|' + types.join('+') + '|' + (o.key || '') ; const m = memo[key];
  if (m && !o.fresh && Date.now() - m.t < 6 * 60 * 1000) return m.v;
  const ctx = ctxNew('FX'); const v = { ctx, types, ok: false };
  const routes = o.routes || [['COK', 'SHJ', D1]];
  const shift = (rs, d) => rs.map(([a, b, dt]) => [a, b, new Date(Date.parse(dt) + d * 864e5).toISOString().slice(0, 10)]);
  let S = null; for (const d of [0, 4, 12, 19, -7]) { S = await C.search(ctx, shift(routes, d), types, { conn: o.conn, anyFit: false, need: o.need, tries: d === 0 ? 2 : 1 }); if (S.offer) { if (d) ctx.notes.push('dates shifted by ' + d + ' day(s) to find inventory'); break; } await sleep(2000); } v.S = S;
  if (!S.offer) { v.why = 'Search: no usable offer (' + (S.h.status === 200 ? 'offers=[]' : errLine(S.h)) + ')'; return v; }
  if (level === 'search') { v.ok = true; return (memo[key] = { t: Date.now(), v }).v; }
  const f = await C.fareConfirm(ctx, S); v.fc = f; if (!ok(f)) { v.why = 'FareConfirm: ' + errLine(f); return v; }
  v.ids = { id: f.json.responseId, off: f.json.selectedOffer.offerId }; v.offer = f.json.selectedOffer;
  if (level === 'fc') { v.ok = true; return (memo[key] = { t: Date.now(), v }).v; }
  const a = await C.addPax(ctx, v.ids.id, v.ids.off, types, { seed: o.seed }); v.ap = a; if (!ok(a)) { v.why = 'AddPassenger: ' + errLine(a); return v; }
  v.ids = { id: a.json.responseId, off: a.json.offerId };
  if (level === 'addpax') { v.ok = true; return (memo[key] = { t: Date.now(), v }).v; }
  const g = await C.getAnc(ctx, v.ids.id, v.ids.off); v.anc = g; if (!ok(g)) { v.why = 'GetAncillary: ' + errLine(g); return v; }
  v.ancIds = { id: g.json.responseId, off: g.json.offerId };
  if (level === 'anc') { v.ok = true; return (memo[key] = { t: Date.now(), v }).v; }
  const s = await C.getSeat(ctx, v.ids.id, v.ids.off); v.seat = s; if (!ok(s)) { v.why = 'SeatMap: ' + errLine(s); return v; }
  v.smIds = { id: s.json.responseId, off: s.json.offerId };
  v.ok = true; return (memo[key] = { t: Date.now(), v }).v;
}
// precondition hops: raw hops from the fixture, flagged in evidence
const pre = v => v.ctx.hops.map(h => { if (!h.view) h.view = { evidence: 'precondition (fixture chain) — ' + h.ms + ' ms' }; return h; });
const blockedNoData = (def, why) => ({ verdict: 'BLOCKED', actual: 'Could not build the precondition chain: ' + why, evidence: why, hops: [] });
module.exports = { rawItems, rawOf, rawOk, sFind, C, B, SUP, now, sleep, amt, ok, structured, controlled, ctxNew, errLine, view, SRC, def, chainTo, pre, blockedNoData, D1, D2, TCDIR };
