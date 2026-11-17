// Verify BUG-10 (ADO 65507): paxTotalAncillaryAmount must be identical in FareCheck, Book and Retrieve and paxTotalAmount = base + tax + ancillary + bundle.
const fs = require('fs'), path = require('path');
const F = require('./flow'); const C = require('./chain'); const { amt } = require('./core');
const OUTDIR = process.env.OUTDIR; fs.mkdirSync(OUTDIR, { recursive: true });
const hdrCorr = h => (h.rec.response_headers || {}).correlationid || null;
const pfb = (j, label) => (((j || {}).selectedOffer || {}).passengerFareBreakdown || []).map(p => ({ ref: p.passengerRefId, type: p.passengerTypeCode, base: amt(p.paxBaseAmount), tax: amt(p.paxTotalTaxAmount), anc: amt(p.paxTotalAncillaryAmount), bun: amt(p.paxTotalBundlesAmount), seat: amt(p.paxTotalSeatAmount), total: amt(p.paxTotalAmount) }));
const pd = j => { const d = ((j || {}).selectedOffer || {}).priceDetails || {}; return { total: amt(d.totalAmount), anc: amt(d.totalAncillariesAmount), bun: amt(d.totalSelectedBundlesAmount), seat: amt(d.totalSelectedSeatsAmount) }; };
const runs = [];
async function one(label, spec) {
  const sp = { id: 'VERIFY-65507-' + label, family: 'A', seed: 7, ...spec }; const r = await F.runFlow(sp);
  const hops = r.ctx.hops; const g = ep => hops.filter(h => h.endpoint === ep && h.json).pop();
  const fc = g('FareCheck'), bk = g('Book'), rt = g('Retrieve');
  const o = { label, ok: r.ok, failedAt: r.failedAt, why: r.why, bundle: r.sel && r.sel.bundle, types: spec.types, route: (sp.routesUsed || spec.routes).map(x => x.join(' ')).join(' / '), pnr: r.booking && r.booking.pnr, calls: hops.map(h => ({ n: h.hop, endpoint: h.endpoint, status: h.status, correlationId: hdrCorr(h), recId: h.rec.id })) };
  if (fc && bk && rt) {
    o.farecheck = { pax: pfb(fc.json), pd: pd(fc.json) }; o.book = { pax: pfb(bk.json), pd: pd(bk.json) }; o.retrieve = { pax: pfb(rt.json), pd: pd(rt.json) };
    const cmp = (a, b) => JSON.stringify(a.pax.map(p => [p.ref, p.anc, p.total])) === JSON.stringify(b.pax.map(p => [p.ref, p.anc, p.total])) && a.pd.anc === b.pd.anc;
    o.sameAncillaryAcrossResponses = cmp(o.farecheck, o.book) && cmp(o.book, o.retrieve);
    const recon = x => x.pax.map(p => ({ ref: p.ref, calc: Math.round((p.base + p.tax + (p.anc || 0) + (p.bun || 0)) * 100) / 100, reported: p.total })).filter(p => Math.abs(p.calc - p.reported) > 0.05);
    o.reconcileIssues = { farecheck: recon(o.farecheck), book: recon(o.book), retrieve: recon(o.retrieve) };
    o.totalsEqual = o.farecheck.pd.total === o.book.pd.total && o.book.pd.total === o.retrieve.pd.total;
  }
  runs.push(o); fs.writeFileSync(path.join(OUTDIR, 'runs.json'), JSON.stringify(runs, null, 1));
  console.log(label, 'ok=' + o.ok, 'bundle', o.bundle, 'pnr', o.pnr, o.failedAt ? 'failedAt ' + o.failedAt + ' ' + String(o.why).slice(0, 100) : 'sameAnc=' + o.sameAncillaryAcrossResponses + ' totalsEqual=' + o.totalsEqual + ' recon=' + JSON.stringify(o.reconcileIssues).slice(0, 160));
  return r;
}
(async () => {
  const route = [['COK', 'SHJ', '2026-12-12']], route2 = [['SHJ', 'COK', '2026-12-12']];
  const ACI = ['ADT', 'CHD', 'INF'];
  // 1) the exact scenario of the bug, first available bundle code
  const r1 = await one('A1_COK-SHJ_ADT+CHD+INF_firstBundle', { routes: route, types: ACI, enrich: { bdl: true } });
  const cands = (r1.bundleResp && Object.keys(r1.bundleResp.bundleChoices || {})) || []; console.log('bundle codes offered:', cands.join(','));
  // 2) every other bundle code with the same party
  for (const code of cands.filter(c => c !== r1.sel.bundle && c !== '66580')) await one('A2_COK-SHJ_ADT+CHD+INF_bundle' + code, { routes: route, types: ACI, enrich: { bdl: true }, skipBundles: cands.filter(c => c !== code) });
  // 3) opposite direction
  await one('A3_SHJ-COK_ADT+CHD+INF', { routes: route2, types: ACI, enrich: { bdl: true } });
  // 4) control: no child
  await one('C1_COK-SHJ_ADT+ADT', { routes: route, types: ['ADT', 'ADT'], enrich: { bdl: true } });
  console.log('verify done');
})();
