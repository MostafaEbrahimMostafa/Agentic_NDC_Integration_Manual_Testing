// Verify the 12 defects in Resources/AirArabiaPlus_bugs.xlsx on AirArabiaPlus / USA. Host from NDC_BASE. Raw (scrubbed) calls go to RAW_DIR.
const fs = require('fs'), path = require('path');
const C = require('./chain'); const F = require('./flow'); const { amt, BASE, SUP } = require('./core');
const OUT = process.env.OUTDIR || 'out_xlsx'; fs.mkdirSync(OUT, { recursive: true });
const R = {}; const save = () => fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(R, null, 1));
const walk = (v, p, f) => { if (Array.isArray(v)) v.forEach((x, i) => walk(x, p + '[' + i + ']', f)); else if (v && typeof v === 'object') for (const k of Object.keys(v)) { f(k, v[k], p + '.' + k, v); walk(v[k], p + '.' + k, f); } };
const hdr = h => (h.rec.response_headers || {}).correlationid || null;
const ok = h => h && h.status === 200 && h.json;
const log = (...a) => console.log(...a);
const pfbOf = j => (((j || {}).selectedOffer || {}).passengerFareBreakdown || []);
const cnt = (o, k) => { o[k] = (o[k] || 0) + 1; };

// ---- Search-level checks: rbd values and baggageDetailsRefId by passenger type
function searchChecks(resp) {
  const rbd = {}, bag = {};
  for (const of of resp.offers || []) for (const p of of.passengerFareBreakdown || []) {
    walk(p.segmentDetails || {}, '', (k, v) => {
      if (/^rbd$/i.test(k)) cnt(rbd, JSON.stringify(v));
      if (/baggageDetailsRefId/i.test(k)) { const t = p.passengerTypeCode; bag[t] = bag[t] || {}; cnt(bag[t], JSON.stringify(v)); }
    });
  }
  return { rbd, baggageDetailsRefIdByPaxType: bag };
}
const rbdOf = j => { const o = {}; walk(j, '', (k, v) => { if (/^rbd$/i.test(k)) cnt(o, JSON.stringify(v)); }); return o; };

function seatStats(sm) {
  const smd = sm.seatMapDetails || {}, pd = sm.passengersDetails || {};
  const occ = { occupiedCells: 0, withPriceDetailsNonNull: 0, priceEntries: 0, priceEntriesOutsideAllowList: 0, zeroTotal: 0, example: null }; const status = {};
  for (const [seg, d] of Object.entries(smd)) for (const row of d.rows || []) for (const c of row.cells || []) {
    const cd = c.cellDetails; if (!cd) continue; cnt(status, cd.cellAvailability);
    if (cd.cellAvailability === 'Occupied') {
      occ.occupiedCells++; const sp = cd.seatPriceDetailsByPassenger;
      if (sp && Object.keys(sp).length) {
        occ.withPriceDetailsNonNull++; occ.example = occ.example || { cellCode: cd.cellCode, seatPriceDetailsByPassenger: sp };
        for (const [px, e] of Object.entries(sp)) {
          occ.priceEntries++;
          const allow = new Set([].concat(...Object.values((((pd[px] || {}).passengersSeatMapAvailability || {})[seg]) || {})));
          if (!allow.has(cd.cellCode)) occ.priceEntriesOutsideAllowList++;
          if (e && e.totalPrice && e.totalPrice.amount === 0) occ.zeroTotal++;
        }
      }
    }
  }
  return { cellAvailabilityCounts: status, occ };
}

(async () => {
  log('host', BASE);
  const all = ['66580', '66589', '66624']; R.A = { runs: [] };
  // ===== A: bundle booking with ADT+CHD+INF
  let main = null;
  for (let a = 1; a <= 6 && !main; a++) {
    const bundle = a <= 4 ? '66589' : '66624';
    const r = await F.runFlow({ id: 'XLSX-A-' + a, family: 'A', seed: 40 + a, routes: [['COK', 'SHJ', a % 2 ? '2026-12-12' : '2026-12-16']], types: ['ADT', 'CHD', 'INF'], enrich: { bdl: true }, skipBundles: all.filter(c => c !== bundle), mealPaid: true, mealPrice: a <= 4 ? 264.32 : undefined });
    const hops = r.ctx.hops;
    const rec = { try: a, bundleWanted: bundle, ok: r.ok, failedAt: r.failedAt, why: String(r.why || '').slice(0, 200), pnr: r.booking && r.booking.pnr, calls: hops.map(h => ({ ep: h.endpoint, st: h.status, corr: hdr(h) })) };
    R.A.runs.push(rec); save(); log('A try', a, 'ok', r.ok, r.failedAt || '', rec.why.slice(0, 100));
    if (r.ok) main = r;
  }
  if (main) {
    const hops = main.ctx.hops; const g = ep => hops.filter(h => h.endpoint === ep && h.json).pop();
    const fc = g('FareCheck'), bk = g('Book'), rt = g('Retrieve'), sm = g('SeatMap'), fcn = g('FareConfirm');
    const pf = j => pfbOf(j).map(p => ({ ref: p.passengerRefId, anc: amt(p.paxTotalAncillaryAmount), total: amt(p.paxTotalAmount), base: amt(p.paxBaseAmount), tax: amt(p.paxTotalTaxAmount), bun: amt(p.paxTotalBundlesAmount) }));
    const tot = j => { const d = (((j || {}).selectedOffer || {}).priceDetails || {}); return { total: amt(d.totalAmount), anc: amt(d.totalAncillariesAmount) }; };
    const b2 = { pnr: main.booking.pnr, bundle: main.sel.bundle, meal: main.sel.anc, farecheck: { pax: pf(fc.json), t: tot(fc.json) }, book: { pax: pf(bk.json), t: tot(bk.json) }, retrieve: { pax: pf(rt.json), t: tot(rt.json) } };
    const same = (x, y) => JSON.stringify(x.pax.map(p => [p.ref, p.anc])) === JSON.stringify(y.pax.map(p => [p.ref, p.anc])) && x.t.anc === y.t.anc;
    b2.consistent = same(b2.farecheck, b2.book) && same(b2.book, b2.retrieve); R.A.bug2_ancillaryAmount = b2;
    R.A.search = searchChecks(main.search.resp); R.A.fareConfirmRbd = rbdOf(fcn.json); R.A.fareConfirmSegmentSample = null;
    R.A.seatMap_bundleFlow = seatStats(sm.json);
    const ctx = main.ctx; const B = main.booking; R.A.crossTenant = {};
    for (const sel of ['USA', 'EGY', 'UAE', 'KSA']) {
      const h = await C.call(ctx, 'Retrieve-' + sel, C.P.retr, { ...C.pnrBody(B), credentialsSelector: sel });
      R.A.crossTenant[sel] = { status: h.status, pnrReturned: (h.json && h.json.pnr) || null, bookingStatus: (h.json && h.json.bookingStatus) || null, err: h.status === 200 ? null : C.errText(h), corr: hdr(h) };
      log('Retrieve', sel, h.status);
    }
    save();
  }
  // ===== B: GetOfferBundles stability + per-bundle-code FareCheck rejections (no booking)
  R.B = { rows: [], bundleAttempts: [] };
  for (const [lbl, types, route] of [['ADT', ['ADT'], ['COK', 'SHJ', '2026-12-12']], ['ADT+CHD+INF', ['ADT', 'CHD', 'INF'], ['SHJ', 'COK', '2026-12-14']], ['ADT+CHD+INF', ['ADT', 'CHD', 'INF'], ['COK', 'SHJ', '2026-12-18']]]) {
    const ctx = C.newCtx('XLSX-B-' + lbl); const S = await C.search(ctx, [route], types, { need: of => of.haveBundles, tries: 3 });
    const row = { pax: lbl, route: route.join(' '), search: S.h.status, offer: !!S.offer };
    if (S.offer) {
      const f = await C.fareConfirm(ctx, S); row.fareConfirm = f.status;
      if (ok(f)) { const b = await C.getBundles(ctx, f.json.responseId, f.json.selectedOffer.offerId); row.getOfferBundles = b.status; row.getOfferBundlesErr = ok(b) ? null : C.errText(b); const pb = ok(b) ? C.pickBundle(b.json, types, []) : null; row.codes = pb ? pb.candidates : null; }
      else row.err = C.errText(f);
    }
    R.B.rows.push(row); save(); log('B', JSON.stringify(row).slice(0, 220));
  }
  for (const code of all) for (const types of [['ADT'], ['ADT', 'CHD', 'INF']]) {
    const ctx = C.newCtx('XLSX-Bb-' + code); const att = { code, pax: types.join('+') };
    try {
      const S = await C.search(ctx, [['COK', 'SHJ', '2026-12-12']], types, { need: of => of.haveBundles, tries: 3 }); if (!S.offer) { att.stop = 'Search no offer'; R.B.bundleAttempts.push(att); continue; }
      const f = await C.fareConfirm(ctx, S); if (!ok(f)) { att.stop = 'FareConfirm ' + C.errText(f); R.B.bundleAttempts.push(att); continue; }
      const b = await C.getBundles(ctx, f.json.responseId, f.json.selectedOffer.offerId); if (!ok(b)) { att.stop = 'GetOfferBundles ' + C.errText(b); R.B.bundleAttempts.push(att); continue; }
      const pb = C.pickBundle(b.json, types, all.filter(c => c !== code)); if (!pb || pb.code !== code) { att.stop = 'bundle ' + code + ' not offered'; R.B.bundleAttempts.push(att); continue; }
      const a = await C.addPax(ctx, f.json.responseId, f.json.selectedOffer.offerId, types, { seed: 3 }); if (!ok(a) || !a.json.offerId) { att.stop = 'AddPassenger ' + C.errText(a); R.B.bundleAttempts.push(att); continue; }
      const g = await C.getAnc(ctx, a.json.responseId, a.json.offerId, pb.selectedBundles); att.getAncillary = g.status; if (!ok(g)) { att.stop = 'GetAncillary ' + C.errText(g) + ' | ' + (((g.json || {}).Context || []).map(c => c.Value).join('; ')).slice(0, 160); R.B.bundleAttempts.push(att); continue; }
      const pa = C.pickAnc(g.json, {}); att.missingAnc = pa.miss.slice(0, 4);
      const s = await C.getSeat(ctx, g.json.responseId, g.json.offerId); att.seatMap = s.status; if (!ok(s)) { att.stop = 'SeatMap ' + C.errText(s); R.B.bundleAttempts.push(att); continue; }
      const ps = C.pickSeats(s.json, {}); att.missingSeat = ps.miss.slice(0, 4);
      const fcheck = await C.fareCheck(ctx, g.json.responseId, g.json.offerId, pa.sel, ps.sel); att.fareCheck = fcheck.status;
      att.fareCheckErr = ok(fcheck) ? null : C.errText(fcheck) + ' | ' + (((fcheck.json || {}).Context || []).map(c => c.Value).join('; ')).slice(0, 160);
    } catch (e) { att.stop = 'exception ' + e.message; }
    R.B.bundleAttempts.push(att); save(); log('Bb', JSON.stringify(att).slice(0, 260));
  }
  // ===== C: seat map for 2 ADT + 1 CHD + 1 INF
  { const ctx = C.newCtx('XLSX-C'); const types = ['ADT', 'ADT', 'CHD', 'INF']; R.C = {};
    const S = await C.search(ctx, [['COK', 'SHJ', '2026-12-12']], types, { need: of => of.offerHasSeat !== false, tries: 3 });
    if (!S.offer) R.C.stop = 'Search no offer';
    else {
      const f = await C.fareConfirm(ctx, S);
      if (!ok(f)) R.C.stop = 'FareConfirm ' + C.errText(f);
      else {
        const a = await C.addPax(ctx, f.json.responseId, f.json.selectedOffer.offerId, types, { seed: 5 });
        if (!ok(a) || !a.json.offerId) R.C.stop = 'AddPassenger ' + C.errText(a);
        else { const s = await C.getSeat(ctx, a.json.responseId, a.json.offerId); R.C.seatMapStatus = s.status; if (!ok(s)) R.C.stop = 'SeatMap ' + C.errText(s); else Object.assign(R.C, seatStats(s.json)); }
      }
    }
    save(); log('C', JSON.stringify(R.C).slice(0, 300)); }
  // ===== D: ParentPaxRefId: 2 ADT + 1 INF, infant declared under Pax2 -> Book -> Retrieve
  { const ctx = C.newCtx('XLSX-D'); const types = ['ADT', 'ADT', 'INF']; R.D = {};
    const S = await C.search(ctx, [['COK', 'SHJ', '2026-12-12']], types, { tries: 3 });
    if (!S.offer) R.D.stop = 'Search no offer';
    else {
      const f = await C.fareConfirm(ctx, S);
      if (!ok(f)) R.D.stop = 'FareConfirm ' + C.errText(f);
      else {
        const pl = C.mkPassengers(types, { seed: 9 }); pl.Pax3.ParentPaxRefId = 'Pax2';
        const a = await C.call(ctx, 'AddPassenger', C.P.addpax, { ...SUP, ResponseId: f.json.responseId, selectedOfferId: f.json.selectedOffer.offerId, passengersList: pl, contactsList: C.CONTACTS });
        if (!ok(a) || !a.json.offerId) R.D.stop = 'AddPassenger ' + C.errText(a);
        else {
          R.D.sentParent = pl.Pax3.ParentPaxRefId; const b = await C.bookLike(ctx, 'book', a.json.responseId, a.json.offerId, {});
          if (!ok(b) || !b.json.pnr) R.D.stop = 'Book ' + C.errText(b);
          else {
            const bj = b.json; R.D.pnr = bj.pnr; const rt = await C.retrieve(ctx, { pnr: bj.pnr, gdsPNR: bj.gdsPNR, bookingToken: bj.bookingToken });
            const lk = j => ({ fareBreakdownRefs: pfbOf(j).map(p => p.passengerRefId), passengersListKeys: Object.keys(j.passengersList || {}), ticketsKeys: Object.keys(j.tickets || {}) });
            R.D.book = lk(bj); R.D.retrieve = ok(rt) ? lk(rt.json) : { err: C.errText(rt) };
          }
        }
      }
    }
    save(); log('D', JSON.stringify(R.D).slice(0, 400)); }
  // ===== E/F: Hold -> FareConfirmAfterHold (PnrReprice) -> Retrieve -> CancelAfterHold; voidCapability in every response
  for (const [key, types, route, seed] of [['E', ['ADT'], ['COK', 'SHJ', '2026-12-12'], 11], ['F', ['ADT', 'CHD', 'INF'], ['SHJ', 'COK', '2026-12-14'], 12]]) {
    const r = await F.runFlow({ id: 'XLSX-' + key, family: 'F', hold: true, seed, routes: [route], types, enrich: {} });
    const eps = r.ctx.hops.map(h => ({ ep: h.endpoint, st: h.status, vc: h.json && Object.prototype.hasOwnProperty.call(h.json, 'voidCapability') ? h.json.voidCapability : '(key absent)', corr: hdr(h) }));
    R[key] = { ok: r.ok, failedAt: r.failedAt, why: String(r.why || '').slice(0, 200), pnr: r.booking && r.booking.pnr, hops: eps }; save(); log(key, JSON.stringify(eps.map(e => e.ep + ':' + e.st + ':' + e.vc)));
  }
  log('DONE');
})().catch(e => { log('FATAL', e.stack); R.fatal = e.message; save(); });
