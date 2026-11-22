// Generic flow executor: Search -> [Upselling|FareConfirm] -> [GetOfferBundles] -> AddPassenger -> [GetAncillary] -> [SeatMap] -> [FareCheck] -> Book|Hold -> family tail.
// Returns { ctx, ok, failedAt, checks[], booking{pnr,gdsPNR,bookingToken}, totals{} } and never throws on API errors (a failed hop is a result).
const C = require('../_shared/chain');
const { amt } = require('../_shared/core');
const ok2 = h => h && h.status === 200 && h.json;
const money = x => x == null ? 'n/a' : (typeof x === 'object' ? `${x.amount} ${x.currency}` : String(x));

async function runFlow(spec) {
  const ctx = C.newCtx(spec.id, spec); const checks = []; const out = { ctx, checks, ok: false, failedAt: null, booking: null, totals: {}, sel: {} };
  const types = spec.types, en = spec.enrich || {}; const fail = (step, why) => { out.failedAt = step; out.why = why; return out; };
  const chk = (name, pass, detail) => { checks.push({ name, pass: !!pass, detail }); return pass; };
  const needFlag = of => (!en.bdl || of.haveBundles) && (!en.anc || of.offerHasAncillary) && (!en.sm || of.offerHasSeat !== false);

  // 1 Search
  const shift = (routes, d) => routes.map(([o, de, dt]) => [o, de, new Date(Date.parse(dt) + d * 864e5).toISOString().slice(0, 10)]);
  let S = null; const shifts = spec.dateShifts || [0, 4, 12, 19, -7];
  for (const d of shifts) {
    const rts = shift(spec.routes, d); S = await C.search(ctx, rts, types, { conn: spec.conn, need: needFlag, anyFit: false, tries: d === 0 ? 2 : 1 });
    if (S.offer) { spec.routesUsed = rts; if (d !== 0) ctx.notes.push('no usable offer on the planned dates; used dates shifted by ' + d + ' day(s): ' + rts.map(r => r.join(' ')).join(' / ')); break; }
    ctx.notes.push('Search for ' + spec.routes.map((r, i) => rts[i].join(' ')).join(' / ') + ' returned no usable offer (' + (S.h.status === 200 ? 'offers=[] in ' + S.h.ms + ' ms' : C.errText(S.h)) + ')'); await require('../_shared/core').sleep(3000); ctx.waiting_ms += 3000;
  }
  out.search = S;
  if (!S.offer) return fail('Search', S.h.status === 200 ? `no usable offer (offers=${((S.resp || {}).offers || []).length})` : C.errText(S.h));
  const rec = C.reconcile(S.offer, types, 0.05); chk('Search offer price reconciles (<=0.05 rounding)', rec.ok, rec.issues.join('; ')); out.totals.searchRec = rec;
  out.totals.search = amt((S.offer.priceDetails || {}).totalAmount); out.totals.currency = ((S.offer.priceDetails || {}).totalAmount || {}).currency;
  out.flags = { haveBundles: S.offer.haveBundles, canBeHeld: S.offer.canBeHeld, offerHasAncillary: S.offer.offerHasAncillary, offerHasSeat: S.offer.offerHasSeat, isSeatMapRequired: S.offer.isSeatMapRequired };
  let cur;
  // 2 FareConfirm / Upselling
  if (spec.upsell) {
    const u = await C.upsell(ctx, S); out.upsell = u;
    if (!ok2(u) || !(u.json.upsellOffers || []).length) return fail('Upselling', C.errText(u) + (ok2(u) ? ' (no upsellOffers)' : ''));
    cur = { id: u.json.responseId, off: u.json.upsellOffers[0].offerId }; out.totals.fc = amt(((u.json.upsellOffers[0] || {}).priceDetails || {}).totalAmount);
  } else {
    const f = await C.fareConfirm(ctx, S); out.fc = f;
    if (!ok2(f) || !f.json.selectedOffer) return fail('FareConfirm', C.errText(f));
    const so = f.json.selectedOffer; const r = C.reconcile(so, types, 0.05); chk('FareConfirm price reconciles (<=0.05 rounding)', r.ok, r.issues.join('; '));
    cur = { id: f.json.responseId, off: so.offerId }; out.totals.fc = amt((so.priceDetails || {}).totalAmount);
    out.flags2 = { haveBundles: so.haveBundles, canBeHeld: so.canBeHeld, offerHasAncillary: so.offerHasAncillary, offerHasSeat: so.offerHasSeat, isSeatMapRequired: so.isSeatMapRequired };
  }
  // 3 bundles
  let bundles = null;
  if (en.bdl) {
    const b = await C.getBundles(ctx, cur.id, cur.off); out.bundlesHop = b;
    if (!ok2(b)) return fail('GetOfferBundles', C.errText(b));
    const pb = C.pickBundle(b.json, types, spec.skipBundles || []);
    if (!pb) return fail('GetOfferBundles', 'no bundle code common to all journeys');
    bundles = pb; out.sel.bundle = pb.code; out.bundleResp = b.json;
    chk('bundleReferences all exist in bundleChoices', Object.values(b.json.offerJourneys).every(j => (j.bundleReferences || []).every(c => b.json.bundleChoices && b.json.bundleChoices[c])), '');
  }
  // 4 AddPassenger
  const a = await C.addPax(ctx, cur.id, cur.off, types, { seed: spec.seed }); out.addpax = a;
  if (!ok2(a) || !a.json.offerId) return fail('AddPassenger', C.errText(a));
  cur = { id: a.json.responseId, off: a.json.offerId };
  let ancIds = null, anc = null, seats = null, smIds = null;
  // 5 ancillaries (also the entry point for bundle pricing)
  if (en.anc || en.bdl) {
    let g = await C.getAnc(ctx, cur.id, cur.off, bundles && bundles.selectedBundles);
    // GetAncillary intermittently returns no Meal list; re-ask (same ids) a few times before judging the flow
    for (let k = 1; k <= 3 && ok2(g) && (en.anc || en.bdl) && C.pickAnc(g.json, { mealPaid: spec.mealPaid, mealPrice: spec.mealPrice }).miss.some(m => /Meal$/.test(m)); k++) { ctx.notes.push(`GetAncillary returned no Meal for some passenger/segment; asked again (#${k + 1})`); await require('../_shared/core').sleep(5000); ctx.waiting_ms += 5000; g = await C.getAnc(ctx, cur.id, cur.off, bundles && bundles.selectedBundles); }
    out.ancHop = g;
    if (!ok2(g)) return fail('GetAncillary', C.errText(g));
    ancIds = { id: g.json.responseId, off: g.json.offerId };
    { out.ancJson = g.json; const pa = C.pickAnc(g.json, { mealPaid: spec.mealPaid, mealPrice: spec.mealPrice }); anc = pa.sel; out.sel.anc = pa.sum;
      const allOk = pa.miss.length === 0; chk('Meal (segment) + Baggage (journey) selectable for every non-infant passenger' + (en.bdl ? '' : ''), allOk, 'missing: ' + pa.miss.join('; '));
      if (!allOk) return fail('GetAncillary', 'ancillary not selectable after retries: ' + pa.miss.join('; ')); }
  }
  // 6 seat map
  if (en.sm || en.bdl) {
    const sid = en.bdl && ancIds ? ancIds : cur;
    const s = await C.getSeat(ctx, sid.id, sid.off); out.seatHop = s;
    if (!ok2(s)) return fail('SeatMap', C.errText(s));
    smIds = { id: s.json.responseId, off: s.json.offerId };
    { let minRow = 0; if (bundles && out.bundleResp) { const inc = ((out.bundleResp.bundleChoices || {})[bundles.code] || {}).includedServices || []; const m = JSON.stringify(inc).match(/Seat[^"]*?Rows*(d+)s*onwards/i); if (m) minRow = +m[1]; out.sel.bundleSeatMinRow = minRow; }
      const ps = C.pickSeats(s.json, { minRow }); seats = ps.sel; out.sel.seats = ps.sum;
      if (!chk('A seat is selectable for every non-infant passenger on every segment', ps.miss.length === 0, 'missing: ' + ps.miss.join('; '))) return fail('SeatMap', 'seat not selectable: ' + ps.miss.join('; ')); }
  }
  // 7 FareCheck (needed whenever ancillaries/seats are priced into the booking)
  if (anc && !Object.keys(anc).length) anc = null;
  const needFC = !!(anc || seats);
  if (needFC) {
    const fid = ancIds || smIds || cur;
    let f = await C.fareCheck(ctx, fid.id, fid.off, anc, seats);
    for (let mi = 1; mi <= 4 && f.status === 409 && /Meals? .*not available/i.test(JSON.stringify(f.json || {})) && out.ancJson; mi++) { ctx.notes.push(`FareCheck rejected the chosen meal as unavailable (${(JSON.stringify(f.json).match(/[(w+)]/) || [])[1] || '?'}); re-picked meal #${mi + 1}`); out.mealRejects = (out.mealRejects || 0) + 1; const pa2 = C.pickAnc(out.ancJson, { mealIdx: mi, mealPaid: spec.mealPaid, mealPrice: spec.mealPrice }); anc = pa2.sel; out.sel.anc = pa2.sum; f = await C.fareCheck(ctx, fid.id, fid.off, anc, seats); }
    out.fcheck = f;
    if (!ok2(f) || !f.json.selectedOffer) return fail('FareCheck', C.errText(f));
    cur = { id: f.json.responseId, off: f.json.selectedOffer.offerId }; out.totals.fcheck = amt((f.json.selectedOffer.priceDetails || {}).totalAmount);
  } else if (en.bdl && ancIds) { cur = ancIds; }
  // 8 Book / Hold
  const term = spec.hold ? 'hold' : 'book';
  const bk = await C.bookLike(ctx, term, cur.id, cur.off, { bundles: bundles && bundles.selectedBundles, anc, seats }); out.bookHop = bk;
  if (!ok2(bk) || !bk.json.pnr) return fail(term === 'hold' ? 'Hold' : 'Book', C.errText(bk));
  const bj = bk.json; out.booking = { pnr: bj.pnr, gdsPNR: bj.gdsPNR, bookingToken: bj.bookingToken }; out.bookJson = bj;
  out.totals.book = amt(((bj.selectedOffer || {}).priceDetails || {}).totalAmount); out.totals.bookOffer = bj.selectedOffer;
  const rb = bj.selectedOffer ? C.reconcile(bj.selectedOffer, types, 0.05) : null; if (rb) chk(`${term === 'hold' ? 'Hold' : 'Book'} price reconciles (<=0.05 rounding)`, rb.ok, rb.issues.join('; '));
  chk('pnr, bookingToken present', bj.pnr && bj.bookingToken, `pnr=${bj.pnr} gdsPNR=${bj.gdsPNR}`);
  chk('response lists every passenger', bj.passengersList ? Object.keys(bj.passengersList).length === types.length : true, bj.passengersList ? `${Object.keys(bj.passengersList).length} of ${types.length}` : 'passengersList not echoed');
  if (needFC) chk('Book/Hold total equals FareCheck total', Math.abs(out.totals.book - out.totals.fcheck) < 0.05, `book ${out.totals.book} vs fareCheck ${out.totals.fcheck}`);
  if (bundles) chk('selectedBundles accepted by Book/Hold (200)', true, `bundle ${bundles.code}`);
  out.voidCapability = bj.voidCapability; out.holdExp = bj.holdExpirationDate || (bj.selectedOffer && bj.selectedOffer.holdExpirationDate) || null;
  if (term === 'hold') chk('holdExpirationDate present', !!out.holdExp, String(out.holdExp));
  out.ok = true; out.expect = { anc, seats, bundles };
  // family tail
  const fam = spec.family || 'A'; const tail = { A: ['retr'], B: ['reprice', 'retr'], C: ['retr', 'void', 'retr'], D: ['reprice', 'retr', 'bah', 'retr'], E: ['reprice', 'retr', 'bah', 'void', 'retr'], F: ['reprice', 'retr', 'cancel', 'retr'] }[fam];
  const B = out.booking; out.tail = []; let phase = term === 'hold' ? 'OnHold' : 'Booked';
  if (spec.family) for (const t of tail) {
    let h;
    if (t === 'retr') h = await C.retrieve(ctx, B); else if (t === 'reprice') h = await C.reprice(ctx, B); else if (t === 'bah') h = await C.bookAfterHold(ctx, B);
    else if (t === 'cancel') h = await C.cancelHold(ctx, B); else if (t === 'void') h = await C.voidIt(ctx, B);
    out.tail.push({ t, h });
    if (!ok2(h)) { out.ok = false; out.failedAt = h.endpoint; out.why = C.errText(h); break; }
    const j = h.json;
    if (j.pnr && j.pnr !== B.pnr) chk(`${h.endpoint}: same PNR`, false, `${j.pnr} vs ${B.pnr}`);
    if (j.bookingToken && j.bookingToken !== B.bookingToken) { out.notes = (out.notes || []).concat(`${h.endpoint} returned a different bookingToken`); }
    if (j.selectedOffer && j.selectedOffer.passengerFareBreakdown && t !== 'void') { const r = C.reconcile(j.selectedOffer, types, 0.05); chk(`${h.endpoint} price reconciles (<=0.05 rounding)`, r.ok, r.issues.join('; ')); }
    if (t === 'retr') {
      const expStatus = phase; const bs = j.bookingStatus;
      chk('Retrieve bookingStatus is ' + expStatus + ' at this point of the flow', bs === expStatus, 'bookingStatus=' + bs);
      const rt = amt(((j.selectedOffer || {}).priceDetails || {}).totalAmount); if (out.totals.book != null && rt != null) chk('Retrieve total equals the Book/Hold total', Math.abs(rt - out.totals.book) < 0.05, 'retrieve ' + rt + ' vs ' + out.totals.book);
      chk('Retrieve lists every passenger', !j.passengersList || Object.keys(j.passengersList).length === types.length, j.passengersList ? Object.keys(j.passengersList).length + ' of ' + types.length : 'passengersList not returned');
      if (out.voidCapability && j.voidCapability) chk('Retrieve voidCapability equals the one returned at Book/Hold', j.voidCapability === out.voidCapability, j.voidCapability + ' vs ' + out.voidCapability);
    }
    if (t === 'reprice') { const rp = amt(((j.selectedOffer || {}).priceDetails || {}).totalAmount); if (out.totals.book != null && rp != null) chk('FareConfirmAfterHold total equals the held price', Math.abs(rp - out.totals.book) < 0.05, 'reprice ' + rp + ' vs held ' + out.totals.book); }
    if (t === 'bah') { phase = 'Booked'; chk('BookAfterHold keeps the Hold PNR and bookingToken (same-PNR invariant)', j.pnr === B.pnr && (!j.bookingToken || j.bookingToken === B.bookingToken), 'pnr ' + j.pnr + ' vs ' + B.pnr + '; token ' + (j.bookingToken === B.bookingToken ? 'same' : 'different')); chk('BookAfterHold issues tickets', j.tickets && Object.keys(j.tickets).length > 0, JSON.stringify(j.tickets || {}).slice(0, 120)); }
    out['last_' + t] = j; if (j.voidCapability) out['vc_' + t] = j.voidCapability; if (j.bookingStatus) out['bs_' + t + out.tail.length] = j.bookingStatus;
  }
  return out;
}
// Bundle flows: some bundle codes cannot be completed (no Meal offered / "Invalid Bundled Service"); rotate to the next common code and keep the failed attempts as notes.
async function runFlowRetry(spec, max = 3) {
  const skip = [...(spec.skipBundles || [])]; const notes = []; let wait = 0, started = null, r;
  for (let a = 1; a <= max; a++) {
    r = await runFlow({ ...spec, skipBundles: skip });
    started = started || r.ctx.started_at; r.ctx.started_at = started; r.ctx.notes = notes.concat(r.ctx.notes); r.ctx.waiting_ms += wait;
    const bd = r.sel && r.sel.bundle;
    if (r.ok || !(spec.enrich && spec.enrich.bdl) || !bd || !['GetAncillary', 'FareCheck', 'Book', 'Hold'].includes(r.failedAt) || a === max) break;
    notes.push('attempt ' + a + ': bundle ' + bd + ' could not be completed (' + r.failedAt + ': ' + String(r.why).slice(0, 140) + '); retried the whole flow with the next bundle code'); wait = r.ctx.waiting_ms; skip.push(bd);
  }
  return r;
}
module.exports = { runFlow, runFlowRetry, ok2, money };
