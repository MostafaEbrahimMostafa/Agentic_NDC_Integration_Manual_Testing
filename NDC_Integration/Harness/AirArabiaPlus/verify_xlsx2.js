// Part 2 of the xlsx verification: Search/FareConfirm rbd + baggageDetailsRefId, bundle booking ancillary amounts, cross-tenant Retrieve.
const fs = require('fs'), path = require('path');
const C = require('./chain'); const F = require('./flow'); const { amt, BASE } = require('./core');
const OUT = process.env.OUTDIR || 'out_xlsx'; fs.mkdirSync(OUT, { recursive: true });
const R = {}; const save = () => fs.writeFileSync(path.join(OUT, 'results2.json'), JSON.stringify(R, null, 1));
const walk = (v, p, f) => { if (Array.isArray(v)) v.forEach((x, i) => walk(x, p + '[' + i + ']', f)); else if (v && typeof v === 'object') for (const k of Object.keys(v)) { f(k, v[k], p + '.' + k, v); walk(v[k], p + '.' + k, f); } };
const ok = h => h && h.status === 200 && h.json;
const log = (...a) => console.log(...a);
const cnt = (o, k) => { o[k] = (o[k] || 0) + 1; };
const pfbOf = j => (((j || {}).selectedOffer || {}).passengerFareBreakdown || []);

(async () => {
  log('host', BASE);
  // ---- 1. Search + FareConfirm: rbd and baggageDetailsRefId per passenger type / segment
  { const ctx = C.newCtx('XLSX2-S'); const types = ['ADT', 'CHD', 'INF']; R.S = {};
    const S = await C.search(ctx, [['COK', 'SHJ', '2026-12-12']], types, { anyFit: true, tries: 3 });
    if (!S.offer) R.S.stop = 'no offer';
    else {
      const rows = [];
      for (const p of S.offer.passengerFareBreakdown || []) for (const [segKey, sd] of Object.entries(p.segmentDetails || {})) rows.push({ pax: p.passengerTypeCode, seg: segKey.slice(0, 30), rbd: sd.rbd === undefined ? '(absent)' : sd.rbd, baggageDetailsRefId: sd.baggageDetailsRefId === undefined ? '(absent)' : sd.baggageDetailsRefId, keys: Object.keys(sd).slice(0, 14) });
      R.S.searchSelectedOffer = rows;
      const allOffersRbd = {}, allBag = {}; for (const of of S.resp.offers) for (const p of of.passengerFareBreakdown || []) walk(p.segmentDetails || {}, '', (k, v) => { if (/^rbd$/i.test(k)) cnt(allOffersRbd, p.passengerTypeCode + ':' + JSON.stringify(v)); if (/baggageDetailsRefId/i.test(k)) cnt(allBag, p.passengerTypeCode + ':' + JSON.stringify(v)); });
      R.S.allOffersRbd = allOffersRbd; R.S.allOffersBaggageRef = allBag; R.S.offerCount = S.resp.offers.length;
      const f = await C.fareConfirm(ctx, S); R.S.fareConfirmStatus = f.status;
      if (ok(f)) { const fr = []; for (const p of pfbOf(f.json)) for (const [segKey, sd] of Object.entries(p.segmentDetails || {})) fr.push({ pax: p.passengerTypeCode, seg: segKey.slice(0, 30), rbd: sd.rbd === undefined ? '(absent)' : sd.rbd, baggageDetailsRefId: sd.baggageDetailsRefId === undefined ? '(absent)' : sd.baggageDetailsRefId }); R.S.fareConfirm = fr; }
      // also search for non-bundle-fare classes: collect every distinct rbd across 3 routes
      R.S.otherRoutes = {};
      for (const rt of [['SHJ', 'COK', '2026-12-14'], ['AMM', 'SHJ', '2026-12-10'], ['MCT', 'SHJ', '2026-12-10']]) {
        const c2 = C.newCtx('XLSX2-S2'); const S2 = await C.search(c2, [rt], ['ADT', 'INF'], { anyFit: true, tries: 2 }); const o = {};
        if (S2.resp && S2.resp.offers) for (const of of S2.resp.offers) for (const p of of.passengerFareBreakdown || []) walk(p.segmentDetails || {}, '', (k, v) => { if (/^rbd$/i.test(k)) cnt(o, p.passengerTypeCode + ':' + JSON.stringify(v)); if (/baggageDetailsRefId/i.test(k)) cnt(o, p.passengerTypeCode + ':bag=' + JSON.stringify(v)); });
        R.S.otherRoutes[rt.join(' ')] = { status: S2.h.status, vals: o };
      }
    }
    save(); log('S', JSON.stringify(R.S).slice(0, 700)); }
  // ---- 2. Bundle bookings: ancillary amount consistency + cross-tenant Retrieve on the resulting booking
  R.A = { runs: [] }; let cross = null;
  const attempts = [
    { bundle: '66589', types: ['ADT', 'CHD', 'INF'], mealPaid: true }, { bundle: '66589', types: ['ADT', 'CHD', 'INF'], mealPaid: false }, { bundle: '66624', types: ['ADT', 'CHD', 'INF'], mealPaid: false },
    { bundle: '66624', types: ['ADT', 'CHD'], mealPaid: false }, { bundle: '66589', types: ['ADT'], mealPaid: true }, { bundle: '66624', types: ['ADT'], mealPaid: false },
  ];
  const all = ['66580', '66589', '66624'];
  for (const [i, at] of attempts.entries()) {
    const r = await F.runFlow({ id: 'XLSX2-A-' + (i + 1), family: 'A', seed: 50 + i, routes: [['COK', 'SHJ', '2026-12-12']], types: at.types, enrich: { bdl: true }, skipBundles: all.filter(c => c !== at.bundle), mealPaid: at.mealPaid });
    const rec = { try: i + 1, bundle: at.bundle, pax: at.types.join('+'), mealPaid: at.mealPaid, ok: r.ok, failedAt: r.failedAt, why: String(r.why || '').slice(0, 220), pnr: r.booking && r.booking.pnr };
    if (r.ok) {
      const hops = r.ctx.hops; const g = ep => hops.filter(h => h.endpoint === ep && h.json).pop();
      const fc = g('FareCheck'), bk = g('Book'), rt = g('Retrieve');
      const pf = j => pfbOf(j).map(p => [p.passengerRefId, amt(p.paxTotalAncillaryAmount), amt(p.paxTotalAmount), amt(p.paxBaseAmount), amt(p.paxTotalTaxAmount), amt(p.paxTotalBundlesAmount)]);
      const t = j => { const d = (((j || {}).selectedOffer || {}).priceDetails || {}); return [amt(d.totalAmount), amt(d.totalAncillariesAmount)]; };
      rec.meal = r.sel.anc; rec.cols = '[ref, paxTotalAncillaryAmount, paxTotalAmount, base, tax, bundles]';
      rec.farecheck = { pax: pf(fc.json), grand: t(fc.json) }; rec.book = { pax: pf(bk.json), grand: t(bk.json) }; rec.retrieve = { pax: pf(rt.json), grand: t(rt.json) };
      const key = x => JSON.stringify(x.pax.map(p => [p[0], p[1]])) + x.grand[1];
      rec.ancillaryConsistent = key(rec.farecheck) === key(rec.book) && key(rec.book) === key(rec.retrieve);
      rec.grandEqual = rec.farecheck.grand[0] === rec.book.grand[0] && rec.book.grand[0] === rec.retrieve.grand[0];
      rec.reconcile = { farecheck: [], book: [], retrieve: [] };
      for (const [nm, x] of [['farecheck', rec.farecheck], ['book', rec.book], ['retrieve', rec.retrieve]]) for (const p of x.pax) { const calc = Math.round((p[3] + p[4] + (p[1] || 0) + (p[5] || 0)) * 100) / 100; if (Math.abs(calc - p[2]) > 0.05) rec.reconcile[nm].push({ ref: p[0], calc, reported: p[2] }); }
      if (!cross) { cross = { ctx: r.ctx, B: r.booking, pnr: r.booking.pnr }; }
    }
    R.A.runs.push(rec); save(); log('A', i + 1, at.bundle, at.types.join('+'), 'ok', r.ok, r.failedAt || '', 'consistent=' + rec.ancillaryConsistent, 'grandEqual=' + rec.grandEqual, JSON.stringify(rec.reconcile || {}).slice(0, 200));
  }
  // ---- 3. cross-tenant Retrieve on the first completed booking
  if (cross) {
    R.X = { pnr: cross.pnr, results: {} };
    for (const sel of ['USA', 'EGY', 'UAE', 'KSA']) {
      const h = await C.call(cross.ctx, 'Retrieve-' + sel, C.P.retr, { ...C.pnrBody(cross.B), credentialsSelector: sel });
      R.X.results[sel] = { status: h.status, pnrReturned: (h.json && h.json.pnr) || null, bookingStatus: (h.json && h.json.bookingStatus) || null, err: h.status === 200 ? null : C.errText(h), corr: (h.rec.response_headers || {}).correlationid || null };
      log('Retrieve', sel, h.status, JSON.stringify(R.X.results[sel]).slice(0, 200));
    }
    save();
  } else R.X = { stop: 'no completed booking to test with' };
  log('DONE');
})().catch(e => { log('FATAL', e.stack); R.fatal = e.message; save(); });
