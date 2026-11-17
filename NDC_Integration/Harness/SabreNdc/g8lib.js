// Round 2 helpers: Availability -> Select -> FareConfirm -> AddPassenger -> Book|Hold, plus Void / CancelAfterHold and Retrieve, with logging through gl.js req().
const G = require('./gl'); const F = require('./gchain');
const { req, av, nx, sel, fcq, baseBody, selBody, fcBody, nextBody, leg, SUPB, ODS, std4xx, errTxt, short, pickMap, flightKey, segInfo, recon, classFor, segHasCode, R, sleep, clone } = G; const { ok2, AC, P } = F;
const cnt = types => { const c = {}; types.forEach(t => c[t] = (c[t] || 0) + 1); return c; };
const paxList = types => { const c = cnt(types); return Object.keys(c).map(k => ({ passengerTypeCode: k, count: c[k] })); };
const totalOf = j => { const t = j && j.selectedOffer && j.selectedOffer.priceDetails && j.selectedOffer.priceDetails.totalAmount; return t ? t.amount : null; };
// first journey (per originDestination) with a booking code offered on every segment: prefer Y, otherwise any code common to all segments
function pickAny(j, o = {}) {
  const map = {}, chosen = [], missing = [], codes = [];
  ODS(j).forEach((od, i) => {
    let found = null;
    const js = (od.journeys || []).filter(x => (x.segments || []).length && (!o.nonstop || x.segments.length === 1) && (!o.connecting || x.segments.length > 1));
    for (const jn of js.slice(o.skip || 0)) {
      const common = (jn.segments[0].cabins || []).flatMap(c => (c.bookingClasses || []).map(b => String(b.bookingCode || '').toUpperCase())).filter(code => jn.segments.every(s => segHasCode(s, code)));
      const code = common.includes('Y') ? 'Y' : common[0]; if (code) { found = { jn, code }; break; }
    }
    if (!found) { missing.push(`${od.origin}-${od.destination}`); return; }
    map[found.jn.journeyRefId] = {}; found.jn.segments.forEach(s => { map[found.jn.journeyRefId][s.segmentRefId] = [classFor(s, found.code).bookingClassId]; }); chosen.push({ od: i, journey: found.jn, code: found.code }); codes.push(found.code);
  });
  return { map, chosen, missing, codes };
}
// availability -> select -> fareconfirm (-> addpax). Returns {ok, failedAt, why, pg, fc, cur, c, types, wantFlights, rc, checks}
async function toOffer(ctx, spec) {
  const out = { ok: false, checks: [], types: spec.types }; const c = cnt(spec.types); const chk = (n, p, d) => { out.checks.push({ name: n, pass: !!p, detail: d }); return !!p; }; const fail = (s, w) => { out.failedAt = s; out.why = w; return out; };
  const legs = spec.legs; const label = legs.map(l => l.slice(0, 2).join('-')).join(' / ');
  const pg = out.pg = await av(ctx, `Availability ${label}`, baseBody({ searchCriteria: legs.map(([o, dd, n]) => leg(o, dd, n)), passengers: paxList(spec.types) }));
  if (!ok2(pg) || !pg.json.availabilityId) return fail('Availability', short(errTxt(pg), 150));
  const pm = pickAny(pg.json, spec); if (pm.missing.length || !Object.keys(pm.map).length) return fail('Availability', 'no usable journey for ' + (pm.missing.join(', ') || label)); out.chosen = pm.chosen; out.codes = pm.codes;
  out.wantFlights = pm.chosen.flatMap(x => x.journey.segments.map(s => flightKey(segInfo(pg.json, s.segmentRefId))));
  const s = out.sel = await sel(ctx, 'SelectAvailability', selBody(pg.json, pm.map)); if (!ok2(s) || !s.json.offerId) return fail('SelectAvailability', short(errTxt(s), 150));
  const f = out.fc = await fcq(ctx, 'FareConfirm', fcBody(s.json)); if (!ok2(f) || !f.json.selectedOffer) return fail('FareConfirm', short(errTxt(f), 150));
  const rc = out.rc = recon(f.json, c); chk('FareConfirm price reconciles', rc.ok, rc.msgs.join('; ')); out.fcTotal = totalOf(f.json); out.currency = rc.currency;
  const got = (f.json.selectedOffer.offerJourneys || []).flatMap(r => f.json.journeys[r].segmentRefIds.map(x => flightKey(f.json.flightSegments[x])));
  chk('FareConfirm offer carries the selected flights', JSON.stringify(got) === JSON.stringify(out.wantFlights), `selected ${out.wantFlights.join('+')}; offer ${got.join('+')}`);
  out.flags = (() => { const so = f.json.selectedOffer; return { haveBundles: so.haveBundles, canBeHeld: so.canBeHeld, offerHasAncillary: so.offerHasAncillary, offerHasSeat: so.offerHasSeat }; })();
  out.cur = { id: f.json.responseId, off: f.json.selectedOffer.offerId };
  if (spec.stopAfter === 'fc') { out.ok = true; return out; }
  const a = out.addpax = await F.addPax(ctx, out.cur.id, out.cur.off, spec.types, { seed: spec.seed || 0, last: spec.last || 'Ibrahim' }); if (!ok2(a) || !a.json.offerId) return fail('AddPassengerDetails', short(errTxt(a), 150));
  out.cur = { id: a.json.responseId, off: a.json.offerId }; out.ok = true; return out;
}
const bookOf = h => ({ pnr: h.json.pnr, gdsPNR: h.json.gdsPNR, bookingToken: h.json.bookingToken });
const loc = b => b.pnr || b.gdsPNR;
const voidReq = (ctx, b, last, o = {}) => req(ctx, o.label || 'Void', 'Void', P.void, { ...SUPB, pnr: b.pnr, gdsPNR: b.gdsPNR || '', bookingToken: b.bookingToken, surName: last, voidTickets: o.voidTickets || [], ...(o.over || {}) });
const cancelReq = (ctx, b, last, o = {}) => req(ctx, o.label || 'CancelAfterHold', 'CancelAfterHold', P.cancel, { ...SUPB, pnr: b.pnr, gdsPNR: b.gdsPNR || '', bookingToken: b.bookingToken, surName: last, ...(o.over || {}) });
// Book or Hold on the current ids; logs a cleanup line (removed later by finalize when the PNR was voided/cancelled by this run)
async function bookIt(ctx, o, term) {
  const h = await F.bookLike(ctx, term, o.cur.id, o.cur.off, {}); o.bookHop = h;
  if (!ok2(h) || !(h.json.pnr || h.json.gdsPNR)) return null;
  const b = bookOf(h); R.cleanup({ kind: term === 'hold' ? 'family_b_hold' : 'needs_void_cancel', pnr: loc(b), related_tc_id: ctx.id, note: `${term === 'hold' ? 'Hold' : 'Book'} created on ne-7 (SabreNdc/EGY)${b.gdsPNR ? ', gdsPNR ' + b.gdsPNR : ''}` });
  (ctx.created = ctx.created || []).push({ ...b, term }); return b;
}
module.exports = { ...G, F, ok2, AC, P, cnt, paxList, totalOf, pickAny, toOffer, bookOf, loc, voidReq, cancelReq, bookIt };
