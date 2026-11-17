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
  const ACI = ['ADT', 'CHD', 'INF']; const all = ['66580', '66589', '66624']; let okc = {};
  runs.push(...(fs.existsSync(path.join(OUTDIR, 'runs.json')) ? JSON.parse(fs.readFileSync(path.join(OUTDIR, 'runs.json'))) : []));
  for (const code of ['66589', '66580']) for (let a = 1; a <= 5 && (okc[code] || 0) < 2; a++) for (const rt of [[['COK', 'SHJ', '2026-12-12']], [['COK', 'SHJ', '2026-12-16']]]) { if ((okc[code] || 0) >= 2) break; const r = await one('B_' + code + '_try' + a + '_' + rt[0][2], { routes: rt, types: ACI, enrich: { bdl: true }, skipBundles: all.filter(c => c !== code), seed: 10 + a }); if (r.ok) okc[code] = (okc[code] || 0) + 1; break; }
  console.log('verify10b done', JSON.stringify(okc));
})();
