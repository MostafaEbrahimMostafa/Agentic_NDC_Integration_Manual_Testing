// Flow primitives for AirArabiaPlus/USA V2 (ne-6). Sequential, one live call at a time (supplier is flaky under parallel load).
const { hop, SUP, now, sleep, amt } = require('./core');
const P = {
  search: 'api/V2/FlightSearch/Search', fc: 'api/v2/FlightSearch/FareConfirm', up: 'api/v2/FlightSearch/UpSelling', rules: 'api/v2/FlightSearch/FareRules',
  bundles: 'api/V2/bundles/GetOfferBundles', addpax: 'api/v2/Passenger/AddPassengerDetails', anc: 'api/v2/Ancillary/GetAncillary', seat: 'api/V2/SeatMap/Seat',
  fcheck: 'api/v2/Ancillary/FareCheck', book: 'api/v2/FlightBooking/Book', hold: 'api/v2/FlightBooking/Hold', retr: 'api/v2/FlightBooking/Retrieve',
  reprice: 'api/v2/FlightBooking/PnrReprice', bah: 'api/V2/FlightBooking/BookAfterHold', cancel: 'api/V2/FlightBooking/CancelAfterHold', void: 'api/V2/FlightBooking/Void',
  seatAH: 'api/v2/SeatMap/SeatAfterHold', release: 'api/v2/FlightBooking/ReleasePnr', rquota: 'api/v2/refund/quota', refund: 'api/v2/refund'
};
const r2 = x => Math.round((x + Number.EPSILON) * 100) / 100;
const tag = () => Math.random().toString(36).slice(2, 7).toUpperCase();

// ---- passengers: types like ['ADT','CHD','INF']; INF is attached to the first ADT without an infant
const FIRST = ['Mostafa', 'Yara', 'Omar', 'Salma', 'Karim', 'Laila', 'Adam', 'Mariam', 'Youssef', 'Hana'];
function mkPassengers(types, o = {}) {
  const list = {}; const adt = []; let inf = 0;
  types.forEach((t, i) => {
    const key = 'Pax' + (i + 1); const bd = t === 'ADT' ? '1990-05-12' : t === 'CHD' ? '2018-03-10' : '2026-06-01';
    const first = FIRST[(i + (o.seed || 0)) % FIRST.length]; const last = o.last || 'Ibrahim';
    const nm = { first, middle: '', last };
    const p = { title: t === 'ADT' ? 'Mr' : 'Mstr', name: nm, nationality: 'EG', residentCountry: 'EG', birthDate: bd + 'T00:00:00.000Z', gender: 'male', passengerTypeCode: t, contactRefId: '0',
      travelDocument: { name: nm, nationality: 'EG', expirationDate: '2030-10-01T00:00:00.000Z', issuanceDate: '2023-10-01T00:00:00.000Z', documentNumber: 'A' + String(Math.floor(1e6 + Math.random() * 9e6)), documentType: 'PASSPORT', gender: 'male', birthCountry: 'EG', birthDate: bd + 'T00:00:00.000Z', issuanceCountryCode: 'EG' } };
    if (t === 'ADT') adt.push(key);
    if (t === 'INF') { p.ParentPaxRefId = adt[inf] || adt[0]; inf++; }
    list[key] = p;
  });
  return list;
}
const CONTACTS = { 0: { Email: 'NDC_CI@gmail.com', phone: { type: 'Personal', countryDialingCode: '+20', phoneNumber: '0121574236' }, Address: { Line1: 'New Cairo Maddi', Line2: 'Al Nahda Floor eight', City: 'CAIRO', CountryCode: 'EG' } } };
const counts = types => { const c = {}; types.forEach(t => c[t] = (c[t] || 0) + 1); return c; };

// ---- price reconciliation (SPEC 2.1, extended for enriched offers). tol = allowed absolute delta per figure; returns {ok, maxDelta, issues[]}
// Before enrichment passengerFareBreakdown has one entry per passenger TYPE (x count); after ancillaries/seats/bundles it has one entry per PASSENGER (passengerRefId).
function reconcile(offer, types, tol = 0) {
  const issues = []; let maxD = 0; const cnt = counts(types); const pf = offer.passengerFareBreakdown || []; const perPax = pf.some(p => p.passengerRefId);
  const chk = (label, a, b) => { const d = Math.abs(r2(a) - r2(b)); if (d > maxD) maxD = d; if (d > tol + 1e-9) issues.push(label + ': ' + r2(a) + ' vs ' + r2(b) + ' (d=' + r2(d) + ')'); };
  let base = 0, tax = 0, tot = 0, anc = 0, bun = 0, seat = 0;
  for (const p of pf) {
    const n = perPax ? 1 : (cnt[p.passengerTypeCode] || 0);
    const t = (p.taxesAndFees || []).reduce((s, f) => s + amt(f.amount), 0);
    const tag = p.passengerTypeCode + (p.passengerRefId ? ' ' + p.passengerRefId : '');
    chk(tag + ' sum(taxesAndFees) vs paxTotalTaxAmount', t, amt(p.paxTotalTaxAmount));
    const a1 = amt(p.paxTotalAncillaryAmount) || 0, b1 = amt(p.paxTotalBundlesAmount) || 0, s1 = amt(p.paxTotalSeatAmount) || 0;
    if (p.paxTotalAmount) { const w = amt(p.paxBaseAmount) + amt(p.paxTotalTaxAmount) + a1 + b1; const alt = w + s1; chk(tag + ' paxTotalAmount vs base+tax+ancillaries+bundles (seat price is carried inside paxTotalTaxAmount)', amt(p.paxTotalAmount), Math.abs(amt(p.paxTotalAmount) - alt) < Math.abs(amt(p.paxTotalAmount) - w) ? alt : w); }
    base += amt(p.paxBaseAmount) * n; tax += amt(p.paxTotalTaxAmount) * n; tot += (p.paxTotalAmount ? amt(p.paxTotalAmount) : amt(p.paxBaseAmount) + amt(p.paxTotalTaxAmount)) * n; anc += a1 * n; bun += b1 * n; seat += s1 * n;
  }
  const pd = offer.priceDetails || {};
  if (pd.totalBaseAmount) chk('totalBaseAmount vs sum(paxBase*count)', amt(pd.totalBaseAmount), base);
  if (pd.totalTaxAmount) chk('totalTaxAmount vs sum(paxTax*count)', amt(pd.totalTaxAmount), tax);
  if (pd.totalAmount) chk('totalAmount vs sum(paxTotalAmount*count)', amt(pd.totalAmount), tot);
  if (pd.totalAncillariesAmount) chk('totalAncillariesAmount vs sum(paxTotalAncillaryAmount)', amt(pd.totalAncillariesAmount), anc);
  if (pd.totalSelectedBundlesAmount) chk('totalSelectedBundlesAmount vs sum(paxTotalBundlesAmount)', amt(pd.totalSelectedBundlesAmount), bun);
  if (pd.totalSelectedSeatsAmount) chk('totalSelectedSeatsAmount vs sum(paxTotalSeatAmount)', amt(pd.totalSelectedSeatsAmount), seat);
  const ptx = (pd.taxesAndFees || []).reduce((s, f) => s + amt(f.amount), 0); if (pd.taxesAndFees && pd.totalTaxAmount) chk('sum(priceDetails.taxesAndFees) vs totalTaxAmount', ptx, amt(pd.totalTaxAmount));
  return { ok: issues.length === 0, maxDelta: r2(maxD), issues };
}

// ---- hop recorder inside a test-case context
function newCtx(tc, meta = {}) { return { tc, meta, hops: [], ids: {}, started_at: now(), waiting_ms: 0, notes: [] }; }
async function call(ctx, endpoint, p, body, opts) {
  const h = await hop(ctx.tc, endpoint, endpoint, p, body, opts);
  const hp = { hop: ctx.hops.length + 1, endpoint, path: p, status: h.status, started_at: h.started_at, ended_at: h.ended_at, ms: h.ms, rec: h.rec, json: h.json, text: h.text };
  ctx.hops.push(hp); return hp;
}
const errText = h => { const j = h.json; if (!j) return (h.text || '').slice(0, 160); const m = j.ErrorMessage || j.errorMessage || j.message || j.title || j.detail || ''; return `${h.status} ${j.ErrorCode || j.errorCode || ''} ${String(m).slice(0, 140)}`.trim(); };

// ---- Search (with retry for the supplier's intermittent empty/409 answers). Returns {h, resp, offer, idx}
async function search(ctx, routes, types, o = {}) {
  const c = counts(types);
  const body = { ...SUP, isDebug: false, searchCriteria: routes.map(([origin, destination, date]) => ({ origin, destination, date })), passengers: Object.keys(c).map(k => ({ passengerTypeCode: k, count: String(c[k]) })) };
  if (o.body) Object.assign(body, o.body);
  const maxTry = o.tries || 4; let h, sel = null;
  for (let a = 1; a <= maxTry; a++) {
    h = await call(ctx, 'Search', P.search, body);
    const offers = (h.json && h.json.offers) || [];
    if (h.status === 200 && offers.length) {
      const segs = of => (of.offerJourneys || []).map(j => { const jr = (h.json.journeys || {})[j]; return jr && jr.segmentRefIds ? jr.segmentRefIds.length : 1; });
      const fits = of => { const s = segs(of); return s.length >= routes.length && s.every(n => o.conn ? n >= 2 : n === 1) && (!o.need || o.need(of)); };
      const idx = offers.findIndex(fits);
      if (idx >= 0) { sel = { idx, offer: offers[idx] }; break; }
      if (o.anyFit) { sel = { idx: 0, offer: offers[0] }; break; }
    }
    if (a < maxTry) { const w = a === 1 ? 5000 : 20000; const t0 = Date.now(); await sleep(w); ctx.waiting_ms += Date.now() - t0; ctx.notes.push(`Search attempt ${a} gave ${h.status === 200 ? '0 usable offers' : errText(h)}; retried after ${w / 1000}s`); }
  }
  return { h, resp: h.json, offer: sel && sel.offer, idx: sel ? sel.idx : -1 };
}
const fcBody = (id, off, extra) => ({ ...SUP, ResponseId: id, selectedOfferId: off, ...(extra || {}) });
const fareConfirm = (ctx, S, o) => call(ctx, 'FareConfirm', P.fc, fcBody(S.resp.responseId, S.offer.offerId, o));
const upsell = (ctx, S) => call(ctx, 'Upselling', P.up, fcBody(S.resp.responseId, S.offer.offerId));
const getBundles = (ctx, id, off) => call(ctx, 'GetOfferBundles', P.bundles, fcBody(id, off));
const addPax = (ctx, id, off, types, o) => call(ctx, 'AddPassenger', P.addpax, { ...SUP, ResponseId: id, selectedOfferId: off, passengersList: mkPassengers(types, o), contactsList: CONTACTS });
const getAnc = (ctx, id, off, bundles) => call(ctx, 'GetAncillary', P.anc, { ...fcBody(id, off), ...(bundles ? { selectedBundles: bundles } : {}) });
const getSeat = (ctx, id, off) => call(ctx, 'SeatMap', P.seat, fcBody(id, off));

// ---- bundle choice: one code common to every journey; avoid known-problem code with a child
function pickBundle(resp, types, skip = []) {
  const oj = resp.offerJourneys || {}; const keys = Object.keys(oj); if (!keys.length) return null;
  const common = (oj[keys[0]].bundleReferences || []).filter(c => keys.every(k => (oj[k].bundleReferences || []).includes(c)));
  const cands = common.filter(c => !skip.includes(c) && !(types.includes('CHD') && c === '66580'));
  const code = cands[0] || common.find(c => !skip.includes(c)) || common[0];
  if (!code) return null;
  return { code, selectedBundles: keys.map(k => ({ journeyKey: k, selectedBundleCode: code })), candidates: common };
}

// ---- ancillary selection (Meal per segment, Baggage per journey) for every non-infant passenger
const BEV = /nescafe|black tea|\btea\b|coffee|water|juice|beverage|drink|soda|cola/i;
function pickAnc(resp, o = {}) {
  const avail = resp.passengersAncillariesAvailabilty || {}, segD = resp.segmentsAncillariesDetails || {}, jrnD = resp.journeysAncillariesDetails || {};
  const by = {}; Object.values(segD).forEach(a => (a || []).forEach(x => by[x.code] = x)); Object.values(jrnD).forEach(a => (a || []).forEach(x => by[x.code] = x));
  const sel = {}, miss = [], sum = [];
  for (const [px, p] of Object.entries(avail)) {
    if (p.passengerTypeCode === 'INF') continue;
    sel[px] = { SetSegmentsAncillaries: {}, SetJourneysAncillaries: {} };
    if (o.meal !== false) for (const [seg, codes] of Object.entries(p.segmentAncillariesAvailability || {})) {
      const el = (codes || []).map(c => by[c]).filter(a => a && a.ancillaryCategory === 'Meal' && a.availableCount !== 0 && !BEV.test(a.name || '') && (!o.mealPaid || amt(a.price) > 0) && (!o.mealPrice || amt(a.price) === o.mealPrice)); const m = el[Math.min(o.mealIdx || 0, el.length - 1)];
      if (m) { sel[px].SetSegmentsAncillaries[seg] = [{ AdditionalServiceCategory: 'Meal', AncillaryCode: m.code, Quantity: '1' }]; sum.push(`${px}/${seg.slice(0, 22)} Meal ${m.name} ${amt(m.price)}`); } else miss.push(`${px}/${seg}/Meal`);
    }
    if (o.bag !== false) for (const [jk, codes] of Object.entries(p.journeyAncillariesAvailability || {})) {
      const b = (codes || []).map(c => by[c]).find(a => a && a.ancillaryCategory === 'Baggage' && a.availableCount !== 0 && amt(a.price) > 0 && !/no bag/i.test(a.name || ''));
      if (b) { sel[px].SetJourneysAncillaries[jk] = [{ AdditionalServiceCategory: 'Baggage', AncillaryCode: b.code, Quantity: '1' }]; sum.push(`${px}/${jk.slice(0, 22)} Baggage ${b.name} ${amt(b.price)}`); } else miss.push(`${px}/${jk}/Baggage`);
    }
  }
  for (const px of Object.keys(sel)) { for (const k of Object.keys(sel[px])) if (!Object.keys(sel[px][k]).length) delete sel[px][k]; if (!Object.keys(sel[px]).length) delete sel[px]; }
  return { sel, miss, sum };
}
// ---- seat selection: distinct Available seats per non-infant pax per segment, not exit/bulkhead/bassinet
function pickSeats(sm, o = {}) {
  const smd = sm.seatMapDetails || {}, pd = sm.passengersDetails || {}; const out = {}, used = {}, miss = [], sum = []; let n = 0;
  for (const px of Object.keys(pd)) {
    if (pd[px].passengerTypeCode === 'INF') continue;
    for (const seg of Object.keys(smd)) {
      const ok = new Set([].concat(...Object.values(((pd[px].passengersSeatMapAvailability || {})[seg]) || {})));
      const cells = (smd[seg].rows || []).reduce((a, r) => a.concat(r.cells || []), []).map(c => c.cellDetails).filter(d => d && /^Available/.test(d.cellAvailability || '') && d.cellID && ok.has(d.cellCode) && !used[seg + '|' + d.cellCode] && (!o.minRow || (parseInt(d.cellCode, 10) || 0) >= o.minRow)
        && !/EXIT|BULKHEAD|BASSINET/i.test(JSON.stringify(d.cellCharacteristics || d.characteristics || d.description || '')));
      const pick = cells[Math.min(cells.length - 1, 12 + 7 * n)];
      if (pick) { used[seg + '|' + pick.cellCode] = 1; (out[px] = out[px] || { setSegmentsSeats: {} }).setSegmentsSeats[seg] = { cellCode: pick.cellCode, cellId: pick.cellID }; sum.push(`${px}/${seg.slice(0, 22)} seat ${pick.cellCode}`); } else miss.push(`${px}/${seg}`);
      n++;
    }
  }
  return { sel: out, miss, sum };
}
const lowerAnc = sel => { const o = {}; for (const [px, v] of Object.entries(sel)) { o[px] = {}; for (const [k, m] of Object.entries(v)) { const kk = k.charAt(0).toLowerCase() + k.slice(1); o[px][kk] = {}; for (const [jk, arr] of Object.entries(m)) o[px][kk][jk] = arr.map(a => ({ additionalServiceCategory: a.AdditionalServiceCategory, ancillaryCode: a.AncillaryCode, quantity: a.Quantity })); } } return o; };
const fareCheck = (ctx, id, off, anc, seats) => call(ctx, 'FareCheck', P.fcheck, { ...SUP, selectedOfferId: off, ResponseId: id, ...(anc ? { PassengersSelectedAncillaries: anc } : {}), ...(seats ? { passengersSelectedSeats: seats } : {}) });
const bookLike = (ctx, which, id, off, x = {}) => call(ctx, which === 'hold' ? 'Hold' : 'Book', which === 'hold' ? P.hold : P.book, { ResponseId: id, selectedOfferId: off, ...SUP, ...(x.bundles ? { selectedBundles: x.bundles } : {}), ...(x.anc ? { passengersSelectedAncillaries: lowerAnc(x.anc) } : {}), ...(x.seats ? { passengersSelectedSeats: x.seats } : {}) });
const pnrBody = (b, o = {}) => ({ ...SUP, pnr: b.pnr, gdsPNR: b.gdsPNR, bookingToken: b.bookingToken, ...(o.surName !== undefined ? { surName: o.surName } : {}) });
const retrieve = (ctx, b, o) => call(ctx, 'Retrieve', P.retr, pnrBody(b, o));
const reprice = (ctx, b, o) => call(ctx, 'FareConfirmAfterHold', P.reprice, pnrBody(b, { surName: 'Ibrahim', ...(o || {}) }));
const bookAfterHold = (ctx, b, o) => call(ctx, 'BookAfterHold', P.bah, pnrBody(b, { surName: 'Ibrahim', ...(o || {}) }));
const cancelHold = (ctx, b, o) => call(ctx, 'CancelAfterHold', P.cancel, pnrBody(b, { surName: 'Ibrahim', ...(o || {}) }));
const voidIt = (ctx, b, o) => call(ctx, 'Void', P.void, { ...pnrBody(b, { surName: 'Ibrahim' }), voidTickets: [], ...(o || {}) });
module.exports = { P, r2, tag, mkPassengers, CONTACTS, counts, reconcile, newCtx, call, errText, search, fareConfirm, upsell, getBundles, addPax, getAnc, getSeat, pickBundle, pickAnc, pickSeats, lowerAnc, fareCheck, bookLike, retrieve, reprice, bookAfterHold, cancelHold, voidIt, pnrBody, fcBody };
