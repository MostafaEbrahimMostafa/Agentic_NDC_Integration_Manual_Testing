process.env.RAW_DIR = process.env.RAW_DIR || 'raw_probe';
const C = require('./chain');
(async () => {
  const ctx = C.newCtx('P3O'); const types = ['ADT', 'CHD', 'INF'];
  const S = await C.search(ctx, [[process.env.O || 'CMN', process.env.D || 'SAW', process.env.DT || '2026-12-12']], types, { tries: 4, anyFit: true });
  console.log('search', S.h.status, ((S.resp || {}).offers || []).length, 'offer flags', S.offer && JSON.stringify({ b: S.offer.haveBundles, h: S.offer.canBeHeld, a: S.offer.offerHasAncillary, s: S.offer.offerHasSeat, sm: S.offer.isSeatMapRequired, cur: S.offer.priceDetails.totalAmount }));
  if (!S.offer) return;
  const fc = await C.fareConfirm(ctx, S); console.log('fc', fc.status, C.errText(fc)); if (fc.status !== 200) return;
  const ids = { id: fc.json.responseId, off: fc.json.selectedOffer.offerId };
  const b = await C.getBundles(ctx, ids.id, ids.off); console.log('bundles', b.status, b.status === 200 ? Object.keys(b.json.bundleChoices).join(',') : C.errText(b));
  const ap = await C.addPax(ctx, ids.id, ids.off, types, {}); console.log('addpax', ap.status, C.errText(ap)); if (ap.status !== 200) return;
  const a = { id: ap.json.responseId, off: ap.json.offerId };
  const g = await C.getAnc(ctx, a.id, a.off); console.log('anc', g.status, g.status === 200 ? Object.keys(g.json.passengersAncillariesAvailabilty || {}).length + ' pax; cats ' + [...new Set([].concat(...Object.values(g.json.segmentsAncillariesDetails || {}), ...Object.values(g.json.journeysAncillariesDetails || {})).map(x => x.ancillaryCategory))] : C.errText(g));
  const s = await C.getSeat(ctx, a.id, a.off); console.log('seat', s.status, s.status === 200 ? Object.keys(s.json.seatMapDetails || {}).length + ' segs' : C.errText(s));
  for (const [n, p] of [['up', C.P.up], ['rules', C.P.rules]]) { const u = await C.call(ctx, n, p, n === 'up' ? C.fcBody(S.resp.responseId, S.offer.offerId) : { ...require('./core').SUP, fareConfirmResponseId: ids.id, selectedOfferId: ids.off }); console.log(n, u.status, C.errText(u)); }
})();
