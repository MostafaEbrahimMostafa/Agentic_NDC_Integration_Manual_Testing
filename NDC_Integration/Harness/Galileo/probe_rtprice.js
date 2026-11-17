// Diagnostic: can ANY round trip be priced? For each route, try every single carrier that has a class-Y journey on both legs (max 3 per route).
process.env.SLUG = 'probe';
const G = require('./gl'); const { av, sel, fcq, baseBody, selBody, fcBody, leg, pickMap, ODS, segInfo, segHasCode, errTxt, short, recon } = G;
const routes = [['CAI-JED/JED-CAI', [['CAI', 'JED', 30], ['JED', 'CAI', 37]]], ['CAI-DXB/DXB-CAI', [['CAI', 'DXB', 30], ['DXB', 'CAI', 37]]], ['FRA-JNB/JNB-FRA', [['FRA', 'JNB', 30], ['JNB', 'FRA', 37]]]];
const carriersOf = (j, od) => { const m = new Set(); (od.journeys || []).filter(x => (x.segments || []).length && x.segments.every(s => segHasCode(s, 'Y'))).forEach(x => { const cs = new Set(x.segments.map(s => segInfo(j, s.segmentRefId).marketingCarrierCode)); if (cs.size === 1) m.add([...cs][0]); }); return m; };
(async () => {
  for (const [name, legs] of routes) {
    const ctx = { id: 'PROBE-RTPRICE', hops: [] }; const h = await av(ctx, 'Availability ' + name, baseBody({ searchCriteria: legs.map(([o, d, n]) => leg(o, d, n)) })); if (h.status !== 200) { console.log(name, 'availability', h.status); continue; }
    const ods = ODS(h.json); const sets = ods.map(od => carriersOf(h.json, od)); const common = [...sets[0]].filter(c => sets[1].has(c)).slice(0, 3);
    console.log(name.padEnd(18), 'single-carrier candidates:', common.join(',') || 'none');
    for (const c of common) {
      const pm = pickMap(h.json, 'Y', { carrier: c }); const s = await sel(ctx, 'Select ' + c, selBody(h.json, pm.map)); if (s.status !== 200) { console.log('   ', c, 'select', s.status, short(errTxt(s), 100)); continue; }
      const f = await fcq(ctx, 'FareConfirm ' + c, fcBody(s.json)); const rc = f.status === 200 && f.json.selectedOffer ? recon(f.json, { ADT: 2, INF: 1 }) : null;
      console.log('   ', c.padEnd(3), 'FareConfirm', f.status, f.ms + 'ms', f.status === 200 ? 'priced, reconciles: ' + rc.ok : short(errTxt(f), 140));
    }
  }
})();
