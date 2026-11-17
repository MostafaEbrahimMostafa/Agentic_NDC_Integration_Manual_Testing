// BUG-07 evidence: INF baggageDetailsRefId null in Search/FareConfirm, AirArabiaPlus/USA. Host from NDC_BASE, raw calls to RAW_DIR.
const fs = require('fs'), path = require('path');
const C = require('./chain'); const { BASE } = require('./core');
const OUT = process.env.OUTDIR || 'out_bug07'; fs.mkdirSync(OUT, { recursive: true });
const R = { host: BASE, routes: [] };
(async () => {
  for (const [rt, types] of [[['COK', 'SHJ', '2026-12-12'], ['ADT', 'CHD', 'INF']], [['SHJ', 'COK', '2026-12-14'], ['ADT', 'INF']], [['AMM', 'SHJ', '2026-12-10'], ['ADT', 'INF']]]) {
    const ctx = C.newCtx('BUG07-' + rt.join('-')); const S = await C.search(ctx, [rt], types, { anyFit: true, tries: 3 });
    const row = { route: rt.join(' '), pax: types.join('+'), status: S.h.status, offers: ((S.resp || {}).offers || []).length, bag: {} };
    for (const of of (S.resp || {}).offers || []) for (const p of of.passengerFareBreakdown || []) for (const sd of Object.values(p.segmentDetails || {})) { const k = p.passengerTypeCode + ':' + JSON.stringify(sd.baggageDetailsRefId); row.bag[k] = (row.bag[k] || 0) + 1; }
    if (rt[0] === 'COK' && S.offer) { const f = await C.fareConfirm(ctx, S); row.fareConfirm = f.status; row.fcBag = {}; for (const p of (((f.json || {}).selectedOffer || {}).passengerFareBreakdown || [])) for (const sd of Object.values(p.segmentDetails || {})) row.fcBag[p.passengerTypeCode] = sd.baggageDetailsRefId; }
    R.routes.push(row); console.log(JSON.stringify(row));
  }
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(R, null, 1));
})().catch(e => console.log('FATAL', e.stack));
