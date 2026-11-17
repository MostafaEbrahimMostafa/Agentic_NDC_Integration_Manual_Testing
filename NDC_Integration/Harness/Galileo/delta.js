// Round 3 delta probe: re-check the Round 1/2 defects and rules before the full run. Sequential, one call at a time.
process.env.SLUG = process.env.SLUG || 'probe';
const G = require('./gl'); const fs = require('fs'), path = require('path');
const { av, nx, sel, fcq, baseBody, nextBody, selBody, fcBody, leg, ODS, errTxt, pickMap, envOf, leakOf, short, tokenless } = G;
const ctx = { id: 'DELTA', hops: [] }; const out = {}; const log = (k, v) => { out[k] = v; console.log(k.padEnd(34), typeof v === 'string' ? v : JSON.stringify(v)); };
const jn = j => ODS(j).reduce((n, o) => n + (o.journeys || []).length, 0);
(async () => {
  // 1 availability first pages
  const routes = [['CAI', 'JED', 30], ['JED', 'CAI', 30], ['CAI', 'JED', 60], ['CAI', 'DXB', 30], ['HKG', 'LHR', 30], ['FRA', 'JNB', 30]]; const pages = {};
  for (const [o, d, n] of routes) { const h = await av(ctx, `${o}-${d}+${n}`, baseBody({ searchCriteria: [leg(o, d, n)] })); pages[`${o}-${d}+${n}`] = h; log('avail ' + o + '-' + d + '+' + n, `${h.status} ${h.ms}ms journeys=${h.json && h.json.originDestinations ? jn(h.json) : '-'} more=${h.json && h.json.hasMoreResults} ${h.status !== 200 ? errTxt(h) : ''}`); }
  // 2 next pages
  for (const k of Object.keys(pages)) { const p = pages[k]; if (p.status !== 200 || !p.json.hasMoreResults) continue; const h = await nx(ctx, 'next ' + k, nextBody(p.json)); log('next ' + k, `${h.status} ${h.ms}ms ${h.status === 200 ? 'page ' + h.json.pageNumber + ' journeys=' + jn(h.json) + ' more=' + h.json.hasMoreResults : errTxt(h)}`); }
  // 3 select -> fareconfirm one-way
  const p1 = pages['CAI-JED+30']; const pm = pickMap(p1.json, 'Y'); const s = await sel(ctx, 'select', selBody(p1.json, pm.map)); log('select one-way', `${s.status} ${s.ms}ms keys=${Object.keys(s.json || {})}`);
  if (s.status === 200) {
    const f = await fcq(ctx, 'fareconfirm', fcBody(s.json)); const so = f.json && f.json.selectedOffer || {}; log('fareconfirm one-way', `${f.status} ${f.ms}ms flags haveBundles=${so.haveBundles} canBeHeld=${so.canBeHeld} offerHasAncillary=${so.offerHasAncillary} offerHasSeat=${so.offerHasSeat} isSeatMapRequired=${so.isSeatMapRequired} ${f.status !== 200 ? errTxt(f) : ''}`);
    const w = await fcq(ctx, 'fareconfirm wrong ResponseId', fcBody(s.json, { ResponseId: '00000000-0000-0000-0000-000000000000' })); log('fc wrong ResponseId (BUG-06)', `${w.status} ${w.status !== 200 ? errTxt(w) : 'accepted'}`);
    const m = { ...fcBody(s.json) }; delete m.ResponseId; const w2 = await fcq(ctx, 'fareconfirm missing ResponseId', m); log('fc missing ResponseId (BUG-06)', `${w2.status} ${w2.status !== 200 ? errTxt(w2) : 'accepted'}`);
  }
  // 4 round trip select + fc
  for (const [a, b] of [['CAI', 'JED'], ['FRA', 'JNB']]) { const h = await av(ctx, `RT ${a}-${b}`, baseBody({ searchCriteria: [leg(a, b, 30), leg(b, a, 37)] })); if (h.status !== 200) { log('rt ' + a + b, errTxt(h)); continue; } const pmr = pickMap(h.json, 'Y'); if (pmr.missing.length) { log('rt ' + a + b, 'no Y: ' + pmr.missing); continue; } const s2 = await sel(ctx, 'select RT', selBody(h.json, pmr.map)); if (s2.status !== 200) { log('rt sel ' + a + b, errTxt(s2)); continue; } const f2 = await fcq(ctx, 'fc RT', fcBody(s2.json)); log('rt FC (BUG-08) ' + a + '-' + b, `${f2.status} ${f2.ms}ms ${f2.status !== 200 ? errTxt(f2) : 'priced'}`); }
  // 5 error bodies
  const bad = await av(ctx, 'bad pax', baseBody({ passengers: [{ passengerTypeCode: 'ADT', count: 0 }] })); const e = envOf(bad); const lk = leakOf(bad); log('err body count=0', `${bad.status} ${errTxt(bad)} rawLeak=${lk.raw} netLeak=${lk.net}`);
  const mix = pages['JED-CAI+30'], other = pages['HKG-LHR+30']; if (mix && other && mix.status === 200 && other.status === 200) { const h = await nx(ctx, 'next mixed ids (BUG-05)', { ...nextBody(mix.json), responseId: other.json.responseId }); log('next mixed ids (BUG-05)', `${h.status} ${h.status === 200 ? 'accepted' : errTxt(h)}`); }
  const dbg = await av(ctx, 'isDebug true', baseBody({ isDebug: true })); const txt = JSON.stringify(dbg.json || {}); log('isDebug=true (BUG-10)', `${dbg.status} supplierRequest=${/supplierRequest/i.test(txt)} TargetBranch=${/TargetBranch/.test(txt)}`);
  const s3 = await sel(ctx, 'select refKey ignored (BUG-07)', selBody(p1.json, Object.fromEntries(Object.entries(pm.map).map(([k, v]) => ['BOGUS-' + k, Object.fromEntries(Object.entries(v).map(([a, b]) => ['BOGUS-' + a, b]))])))); log('select bogus ref keys (BUG-07)', `${s3.status} ${s3.status === 200 ? 'accepted' : errTxt(s3)}`);
  fs.writeFileSync(path.join(__dirname, 'delta_out.json'), JSON.stringify(out, null, 1)); process.exit(0);
})();
