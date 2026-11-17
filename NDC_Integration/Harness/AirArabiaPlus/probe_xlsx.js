const C = require('./chain'); const fs = require('fs');
const walk = (v, p, f) => { if (Array.isArray(v)) v.forEach((x, i) => walk(x, p + '[' + i + ']', f)); else if (v && typeof v === 'object') for (const k of Object.keys(v)) { f(k, v[k], p + '.' + k); walk(v[k], p + '.' + k, f); } };
(async () => {
  const ctx = C.newCtx('PROBE'); const types = ['ADT', 'CHD', 'INF'];
  const S = await C.search(ctx, [['COK', 'SHJ', '2026-12-12']], types, { anyFit: true });
  console.log('search status', S.h.status, 'offers', ((S.resp || {}).offers || []).length, 'host', require('./core').BASE);
  if (!S.offer) return;
  fs.writeFileSync('out_xlsx/search_sample.json', JSON.stringify(S.resp).slice(0, 400000));
  const c = {}; walk(S.resp, '', (k, v, p) => { if (/^rbd$/i.test(k) || /baggageDetailsRefId/i.test(k)) { const kk = k + '=' + JSON.stringify(v); c[kk] = (c[kk] || 0) + 1; } });
  console.log(c);
  const o = S.offer; console.log(Object.keys(o)); 
  const pf = o.passengerFareBreakdown || []; console.log(JSON.stringify(pf.map(p => ({ t: p.passengerTypeCode, keys: Object.keys(p), bag: p.baggageDetailsRefId })), null, 0).slice(0, 1500));
})();
