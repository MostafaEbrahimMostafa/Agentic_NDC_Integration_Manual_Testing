// Generic V2 chain executor for repro recipes. One live call at a time (CLAUDE.md rule 9).
// Selection logic (bundle / ancillary / seat picking) is ported from Harness/AirArabiaPlus/chain.js,
// made supplier-agnostic: supplier + selector come from the recipe, never hard-coded.
const fs = require('fs');
const path = require('path');
const { META } = require('./steps-meta');

let LIB = null; // ../../V2/lib.js reads NDC_BASE when loaded: require it only after the runner set it
const lib = () => LIB || (LIB = require(path.join(__dirname, '..', '..', 'V2', 'lib.js')));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const RAW_KEYS = /^(supplierRequest|supplierResponse|OriginalSupplierRequest|OriginalSupplierResponse)$/i;
function scrub(v) {
  if (Array.isArray(v)) return v.map(scrub);
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = RAW_KEYS.test(k) && v[k] !== null ? '[REDACTED - raw supplier payload, per SPEC.md 7.14]' : scrub(v[k]); return o; }
  return v;
}
function merge(a, b) {
  if (!b || typeof b !== 'object' || Array.isArray(b)) return b;
  const o = Object.assign({}, a);
  for (const k of Object.keys(b)) o[k] = (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a && typeof a[k] === 'object') ? merge(a[k], b[k]) : b[k];
  return o;
}
const amt = x => x == null ? null : (typeof x === 'object' ? x.amount : x);
const safe = s => String(s).replace(/[^A-Za-z0-9_.-]/g, '_');
const errText = h => { const j = h.json; if (!j) return (h.status ? h.status + ' ' : '') + String(h.text || '').slice(0, 160); const m = j.ErrorMessage || j.errorMessage || j.message || j.title || j.detail || ''; return `${h.status} ${j.ErrorCode || j.errorCode || ''} ${String(m).slice(0, 160)}`.replace(/\s+/g, ' ').trim(); };
const localDate = (offset) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + offset); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

// ---------------------------------------------------------------- one HTTP call + evidence files
async function http(ctx, alias, stepName, body, headers) {
  const p = META[stepName].path;
  let h;
  for (let a = 1; a <= 3; a++) {          // status 0 = transport error: never a test result, retry (Harness_Guide §4)
    h = await lib().call(stepName, p, body, { headers });
    if (h.status !== 0) break;
    ctx.notes.push(`${alias}: transport error (${String(h.text).slice(0, 80)}), retried`);
    await sleep(5000);
  }
  const n = String(++ctx.seq).padStart(2, '0');
  const label = safe(alias);
  const reqFile = `${n}_${label}_request.json`, resFile = `${n}_${label}_response.json`;
  const doc = h.json ? scrub(h.json) : null;
  fs.mkdirSync(ctx.evidenceDir, { recursive: true });
  fs.writeFileSync(path.join(ctx.evidenceDir, reqFile), JSON.stringify({ label: alias, method: 'POST', url: h.request_full.url, headers: h.request_full.headers, body }, null, 2));
  fs.writeFileSync(path.join(ctx.evidenceDir, resFile), JSON.stringify({ label: alias, status: h.status, durationMs: h.ms, requestedAtUtc: h.started_at, respondedAtUtc: h.ended_at, headers: h.response_full.headers, body: doc !== null ? doc : (h.text ? h.text : '(empty body)') }, null, 2));
  const rec = { alias, step: stepName, status: h.status, ms: h.ms, json: h.json, doc, text: h.text, headers: h.response_full.headers || {}, evidence: ctx.evidenceRel + '/' + resFile, correlationId: (h.response_full.headers || {}).correlationid || null };
  ctx.hops.push({ alias, step: stepName, status: h.status, ms: h.ms, started_at: h.started_at, evidence: rec.evidence, correlationId: rec.correlationId });
  return rec;
}

// ---------------------------------------------------------------- passengers
const FIRST = ['Adam', 'Omar', 'Yara', 'Salma', 'Karim', 'Laila', 'Youssef', 'Hana', 'Mariam', 'Tarek'];
const LAST = 'Ibrahim';
const typesOf = fx => [].concat(...fx.passengers.map(p => Array(Number(p.count)).fill(p.passengerTypeCode)));
function mkPassengers(types, infantParents = {}) {
  const list = {}, adt = []; let inf = 0;
  types.forEach((t, i) => {
    const key = 'Pax' + (i + 1);
    const bd = t === 'ADT' ? '1990-05-12' : t === 'CHD' ? '2018-03-10' : '2026-06-01';
    const nm = { first: FIRST[i % FIRST.length], middle: '', last: LAST };
    const p = { title: t === 'ADT' ? 'Mr' : 'Mstr', name: nm, nationality: 'EG', residentCountry: 'EG', birthDate: bd + 'T00:00:00.000Z', gender: 'male', passengerTypeCode: t, contactRefId: '0',
      travelDocument: { name: nm, nationality: 'EG', expirationDate: '2030-10-01T00:00:00.000Z', issuanceDate: '2023-10-01T00:00:00.000Z', documentNumber: 'A' + String(Math.floor(1e6 + Math.random() * 9e6)), documentType: 'PASSPORT', gender: 'male', birthCountry: 'EG', birthDate: bd + 'T00:00:00.000Z', issuanceCountryCode: 'EG' } };
    if (t === 'ADT') adt.push(key);
    if (t === 'INF') { p.ParentPaxRefId = infantParents[key] || adt[inf] || adt[0]; inf++; }
    list[key] = p;
  });
  return list;
}
const CONTACTS = { 0: { Email: 'NDC_CI@gmail.com', phone: { type: 'Personal', countryDialingCode: '+20', phoneNumber: '0121574236' }, Address: { Line1: 'New Cairo Maddi', Line2: 'Al Nahda Floor eight', City: 'CAIRO', CountryCode: 'EG' } } };

// ---------------------------------------------------------------- selection helpers
function pickOffer(resp, o, legCount) {
  const offers = resp.offers || [];
  const segs = of => (of.offerJourneys || []).map(j => { const jr = (resp.journeys || {})[j]; return jr && jr.segmentRefIds ? jr.segmentRefIds.length : null; });
  const fits = of => {
    const s = segs(of);
    if (o.direct && s.some(n => n !== null && n !== 1)) return false;
    if (o.connecting && !s.some(n => n !== null && n >= 2)) return false;
    if (s.length && s.length < legCount) return false;
    for (const [k, v] of Object.entries(o.flags || {})) if (of[k] !== v) return false;
    return true;
  };
  if (Number.isInteger(o.index)) return o.index < offers.length && fits(offers[o.index]) ? o.index : -1;
  return offers.findIndex(fits);
}
function pickBundle(resp, o) {
  const oj = resp.offerJourneys || {}; const keys = Object.keys(oj); if (!keys.length) return { why: 'no offerJourneys in GetOfferBundles response' };
  const common = (oj[keys[0]].bundleReferences || []).filter(c => keys.every(k => (oj[k].bundleReferences || []).includes(c)));
  let code;
  if (o.bundle) { if (!common.includes(o.bundle)) return { why: `bundle ${o.bundle} not offered on every journey (offered: ${common.join(', ') || 'none'})` }; code = o.bundle; }
  else code = (o.prefer || []).find(c => common.includes(c)) || common.find(c => !(o.skip || []).includes(c));
  if (!code) return { why: 'no bundle code common to all journeys' };
  return { code, selectedBundles: keys.map(k => ({ journeyKey: k, selectedBundleCode: code })), candidates: common };
}
const BEV = /nescafe|black tea|\btea\b|coffee|water|juice|beverage|drink|soda|cola/i;
function pickAnc(resp, o) {
  const avail = resp.passengersAncillariesAvailabilty || resp.passengersAncillariesAvailability || {}, segD = resp.segmentsAncillariesDetails || {}, jrnD = resp.journeysAncillariesDetails || {};
  const by = {}; Object.values(segD).forEach(a => (a || []).forEach(x => by[x.code] = x)); Object.values(jrnD).forEach(a => (a || []).forEach(x => by[x.code] = x));
  const meal = o.meal === undefined ? true : o.meal, bag = o.baggage === undefined ? true : o.baggage;
  const sel = {}, miss = [], sum = [];
  for (const [px, p] of Object.entries(avail)) {
    if (p.passengerTypeCode === 'INF') continue;
    sel[px] = { SetSegmentsAncillaries: {}, SetJourneysAncillaries: {} };
    if (meal) for (const [seg, codes] of Object.entries(p.segmentAncillariesAvailability || {})) {
      const el = (codes || []).map(c => by[c]).filter(a => a && a.ancillaryCategory === 'Meal' && a.availableCount !== 0 && !BEV.test(a.name || '') && (!meal.paid || amt(a.price) > 0) && (meal.price === undefined || amt(a.price) === meal.price));
      const m = el[0];
      if (m) { sel[px].SetSegmentsAncillaries[seg] = [{ AdditionalServiceCategory: 'Meal', AncillaryCode: m.code, Quantity: '1' }]; sum.push(`${px} Meal ${m.code} ${amt(m.price)}`); } else miss.push(`${px}/${seg}/Meal${meal.price !== undefined ? ' @' + meal.price : ''}`);
    }
    if (bag) for (const [jk, codes] of Object.entries(p.journeyAncillariesAvailability || {})) {
      const b = (codes || []).map(c => by[c]).find(a => a && a.ancillaryCategory === 'Baggage' && a.availableCount !== 0 && amt(a.price) > 0 && !/no bag/i.test(a.name || ''));
      if (b) { sel[px].SetJourneysAncillaries[jk] = [{ AdditionalServiceCategory: 'Baggage', AncillaryCode: b.code, Quantity: '1' }]; sum.push(`${px} Baggage ${b.code} ${amt(b.price)}`); } else miss.push(`${px}/${jk}/Baggage`);
    }
  }
  for (const px of Object.keys(sel)) { for (const k of Object.keys(sel[px])) if (!Object.keys(sel[px][k]).length) delete sel[px][k]; if (!Object.keys(sel[px]).length) delete sel[px]; }
  return { sel, miss, sum };
}
function pickSeats(sm, o) {
  const smd = sm.seatMapDetails || {}, pd = sm.passengersDetails || {}; const out = {}, used = {}, miss = [], sum = []; let n = 0;
  for (const px of Object.keys(pd)) {
    if (pd[px].passengerTypeCode === 'INF') continue;
    for (const seg of Object.keys(smd)) {
      const ok = new Set([].concat(...Object.values(((pd[px].passengersSeatMapAvailability || {})[seg]) || {})));
      const cells = (smd[seg].rows || []).reduce((a, r) => a.concat(r.cells || []), []).map(c => c.cellDetails).filter(d => d && /^Available/.test(d.cellAvailability || '') && d.cellID && ok.has(d.cellCode) && !used[seg + '|' + d.cellCode] && (!o.minRow || (parseInt(d.cellCode, 10) || 0) >= o.minRow)
        && !/EXIT|BULKHEAD|BASSINET/i.test(JSON.stringify(d.cellCharacteristics || d.characteristics || d.description || '')));
      const pick = cells[Math.min(cells.length - 1, 12 + 7 * n)];
      if (pick) { used[seg + '|' + pick.cellCode] = 1; (out[px] = out[px] || { setSegmentsSeats: {} }).setSegmentsSeats[seg] = { cellCode: pick.cellCode, cellId: pick.cellID }; sum.push(`${px} seat ${pick.cellCode}`); } else miss.push(`${px}/${seg}`);
      n++;
    }
  }
  return { sel: out, miss, sum };
}
const lowerAnc = sel => { const o = {}; for (const [px, v] of Object.entries(sel)) { o[px] = {}; for (const [k, m] of Object.entries(v)) { const kk = k.charAt(0).toLowerCase() + k.slice(1); o[px][kk] = {}; for (const [jk, arr] of Object.entries(m)) o[px][kk][jk] = arr.map(a => ({ additionalServiceCategory: a.AdditionalServiceCategory, ancillaryCode: a.AncillaryCode, quantity: a.Quantity })); } } return o; };

// ---------------------------------------------------------------- step implementations
// Each returns { rec, stop?: { kind: 'env'|'product', step, why } }. 'env' -> Blocked; 'product' -> the chain broke.
const ENV_STATUS = s => s === 0 || s === 502 || s === 503 || s === 504;
const fail = (rec, alias, why, kind) => ({ rec, stop: { kind: kind || (ENV_STATUS(rec.status) ? 'env' : 'product'), step: alias, why } });

async function stepSearch(ctx, alias, o) {
  const fx = ctx.fixture, legs = fx.searchCriteria;
  const shifts = o.dateShifts || [0, 1, 3, 7];
  let rec = null;
  for (const d of shifts) {
    const dates = legs.map(l => l.date || localDate(Number(l.offsetDays) + d));
    let body = { ...ctx.sup, isDebug: false, searchCriteria: legs.map((l, i) => ({ origin: l.origin, destination: l.destination, date: dates[i] })), passengers: fx.passengers.map(p => ({ passengerTypeCode: p.passengerTypeCode, count: String(p.count) })) };
    if (o.override) body = merge(body, o.override);
    const tries = d === shifts[0] ? (o.tries || 2) : 1;      // rule 10: one empty offers[] is not proof
    for (let a = 1; a <= tries; a++) {
      rec = await http(ctx, alias + (d || a > 1 ? `_try${ctx.seq + 1}` : ''), 'Search', body, o.headers);
      const offers = rec.json && Array.isArray(rec.json.offers) ? rec.json.offers : [];
      if (rec.status === 200 && offers.length) {
        const idx = pickOffer(rec.json, o.offer || {}, legs.length);
        if (idx >= 0) {
          if (d) ctx.notes.push(`Search: planned dates had no usable offer; used dates shifted by ${d} day(s): ${dates.join(' / ')}`);
          const off = rec.json.offers[idx];
          ctx.ids = { responseId: rec.json.responseId, offerId: off.offerId };
          rec.doc = Object.assign({}, rec.doc, { _selectedOffer: scrub(off) });
          ctx.searchUsed = { dates, offerIndex: idx, offers: offers.length };
          return { rec };
        }
        ctx.notes.push(`Search ${dates.join('/')}: ${offers.length} offer(s), none matches ${JSON.stringify(o.offer || {})}`);
      } else ctx.notes.push(`Search ${dates.join('/')} attempt ${a}: ${rec.status === 200 ? 'offers=[]' : errText(rec)}`);
      await sleep(a === 1 ? 5000 : 20000);
    }
  }
  return fail(rec, alias, 'no usable offer on the fixture dates or shifts ' + shifts.join(',') + ' (last: ' + (rec.status === 200 ? 'offers=[] or no fitting offer' : errText(rec)) + ')', 'env');
}

const idBody = ctx => ({ ...ctx.sup, ResponseId: ctx.ids.responseId, selectedOfferId: ctx.ids.offerId });
const pnrBody = (ctx, sur) => ({ ...ctx.sup, pnr: ctx.booking.pnr, gdsPNR: ctx.booking.gdsPNR, bookingToken: ctx.booking.bookingToken, ...(sur ? { surName: LAST } : {}) });

async function run(ctx, s) {
  const name = typeof s === 'string' ? s : s.step;
  const alias = typeof s === 'string' ? s : (s.as || s.step);
  const o = Object.assign({}, typeof s === 'string' ? {} : s, (ctx.stepOptions || {})[name] || {});
  if (name === 'Search') return stepSearch(ctx, alias, o);
  if (!ctx.ids && name !== 'Search') return { rec: null, stop: { kind: 'env', step: alias, why: 'no offer ids from an earlier step' } };
  const needBooking = ['Retrieve', 'PnrReprice', 'BookAfterHold', 'CancelAfterHold', 'Void'].includes(name);
  if (needBooking && !ctx.booking) return { rec: null, stop: { kind: 'env', step: alias, why: 'no booking from an earlier step' } };
  let body;
  switch (name) {
    case 'FareConfirm': case 'Upselling': case 'FareRules': body = idBody(ctx); break;
    case 'GetOfferBundles': body = idBody(ctx); break;
    case 'AddPassenger': body = { ...idBody(ctx), passengersList: mkPassengers(ctx.types, o.infantParents), contactsList: CONTACTS }; break;
    case 'GetAncillary': body = { ...idBody(ctx), ...(ctx.bundles ? { selectedBundles: ctx.bundles.selectedBundles } : {}) }; break;
    case 'SeatMap': body = idBody(ctx); break;
    case 'FareCheck': body = { ...ctx.sup, selectedOfferId: ctx.ids.offerId, ResponseId: ctx.ids.responseId, ...(ctx.anc ? { PassengersSelectedAncillaries: ctx.anc } : {}), ...(ctx.seats ? { passengersSelectedSeats: ctx.seats } : {}) }; break;
    case 'Hold': case 'Book': body = { ResponseId: ctx.ids.responseId, selectedOfferId: ctx.ids.offerId, ...ctx.sup, ...(ctx.bundles ? { selectedBundles: ctx.bundles.selectedBundles } : {}), ...(ctx.anc ? { passengersSelectedAncillaries: lowerAnc(ctx.anc) } : {}), ...(ctx.seats ? { passengersSelectedSeats: ctx.seats } : {}) }; break;
    case 'Retrieve': body = pnrBody(ctx, false); break;
    case 'PnrReprice': case 'BookAfterHold': case 'CancelAfterHold': body = pnrBody(ctx, true); break;
    case 'Void': body = { ...pnrBody(ctx, true), voidTickets: [] }; break;
    default: throw new Error('no implementation for step ' + name);
  }
  if (o.override) body = merge(body, o.override);
  let rec = await http(ctx, alias, name, body, o.headers);
  const ok = rec.status >= 200 && rec.status < 300 && rec.json;
  if (!ok) return o.allowFail ? { rec } : fail(rec, alias, errText(rec));
  const j = rec.json;
  switch (name) {
    case 'FareConfirm':
      if (!j.selectedOffer) return o.allowFail ? { rec } : fail(rec, alias, '200 without selectedOffer', 'product');
      ctx.ids = { responseId: j.responseId, offerId: j.selectedOffer.offerId }; break;
    case 'Upselling':
      if (!(j.upsellOffers || []).length) return o.allowFail ? { rec } : fail(rec, alias, '200 without upsellOffers', 'product');
      ctx.ids = { responseId: j.responseId, offerId: j.upsellOffers[0].offerId }; break;
    case 'GetOfferBundles':
      if (o.pick !== false) { const b = pickBundle(j, o); if (!b.code) return fail(rec, alias, b.why, 'env'); ctx.bundles = b; ctx.bundleResp = j; ctx.notes.push(`GetOfferBundles: picked bundle ${b.code} (common: ${b.candidates.join(', ')})`); }
      break;
    case 'AddPassenger':
      if (!j.offerId) return o.allowFail ? { rec } : fail(rec, alias, '200 without offerId', 'product');
      ctx.ids = { responseId: j.responseId, offerId: j.offerId }; break;
    case 'GetAncillary': {
      if (o.select === false) { ctx.ids = { responseId: j.responseId, offerId: j.offerId }; ctx.ancDone = true; break; }
      let pa = pickAnc(j, o);
      for (let k = 1; k <= (o.reask === undefined ? 2 : o.reask) && pa.miss.some(m => /Meal/.test(m)); k++) {
        ctx.notes.push(`${alias}: no matching Meal for ${pa.miss.join('; ')}; asked again (#${k + 1})`);
        await sleep(5000); rec = await http(ctx, alias + '_reask' + k, name, body, o.headers);
        if (!(rec.status === 200 && rec.json)) return fail(rec, alias, errText(rec));
        pa = pickAnc(rec.json, o);
      }
      if (pa.miss.length) return fail(rec, alias, 'requested ancillary not offered: ' + pa.miss.join('; '), 'env');
      ctx.anc = Object.keys(pa.sel).length ? pa.sel : null; ctx.ancDone = true;
      ctx.ids = { responseId: rec.json.responseId, offerId: rec.json.offerId };
      ctx.notes.push(`${alias}: selected ${pa.sum.join(', ') || 'nothing'}`); break;
    }
    case 'SeatMap': {
      if (o.select !== false) {
        let minRow = 0;
        if (ctx.bundles && ctx.bundleResp) { const inc = ((ctx.bundleResp.bundleChoices || {})[ctx.bundles.code] || {}).includedServices || []; const m = JSON.stringify(inc).match(/Seat[^"]*?Rows*(\d+)\s*onwards/i); if (m) minRow = Number(m[1]); }
        const ps = pickSeats(j, { minRow });
        if (ps.miss.length) return fail(rec, alias, 'no selectable seat for ' + ps.miss.join('; '), 'env');
        ctx.seats = ps.sel; ctx.notes.push(`${alias}: selected ${ps.sum.join(', ')}`);
      }
      if (!ctx.ancDone && j.responseId) ctx.ids = { responseId: j.responseId, offerId: j.offerId || ctx.ids.offerId };
      break;
    }
    case 'FareCheck':
      if (!j.selectedOffer) return o.allowFail ? { rec } : fail(rec, alias, '200 without selectedOffer', 'product');
      ctx.ids = { responseId: j.responseId, offerId: j.selectedOffer.offerId }; break;
    case 'Hold': case 'Book':
      if (!j.pnr) return o.allowFail ? { rec } : fail(rec, alias, '200 without pnr', 'product');
      ctx.booking = { pnr: j.pnr, gdsPNR: j.gdsPNR, bookingToken: j.bookingToken };
      ctx.cleanup.push({ pnr: j.pnr, kind: name === 'Hold' ? 'hold' : 'ticketed booking', state: name === 'Hold' ? 'OnHold (left open)' : 'Booked (left open)', step: alias });
      break;
    case 'BookAfterHold': { const c = ctx.cleanup.find(x => x.pnr === ctx.booking.pnr); if (c) { c.kind = 'ticketed booking'; c.state = 'Booked after hold (left open)'; } break; }
    case 'CancelAfterHold': { const c = ctx.cleanup.find(x => x.pnr === ctx.booking.pnr); if (c) c.state = 'Cancelled by ' + alias; break; }
    case 'Void': { const c = ctx.cleanup.find(x => x.pnr === ctx.booking.pnr); if (c) c.state = 'Voided by ' + alias; break; }
  }
  return { rec };
}

// Runs a whole chain. Returns { steps: {alias: rec+ran}, stop }
async function runChain(ctx, chain) {
  const steps = {};
  for (const s of chain) {
    const alias = typeof s === 'string' ? s : (s.as || s.step);
    const r = await run(ctx, s);
    if (r.rec) steps[alias] = { ran: true, status: r.rec.status, doc: r.rec.doc, text: r.rec.text, headers: r.rec.headers, evidence: r.rec.evidence, correlationId: r.rec.correlationId };
    if (r.stop) return { steps, stop: r.stop };
  }
  return { steps, stop: null };
}

module.exports = { runChain, typesOf, scrub, errText, localDate };
