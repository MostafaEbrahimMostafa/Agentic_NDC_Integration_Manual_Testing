// Diagnostic: next page of one-way vs round-trip searches, and the airports of the DXB-LHR journeys.
process.env.SLUG = 'probe';
const G = require('./gl'); const { av, nx, baseBody, nextBody, leg, ODS, segInfo, errTxt, short } = G;
(async () => {
  const cases = [['one-way JED-CAI +30', [['JED', 'CAI', 30]]], ['RT CAI-DXB/DXB-CAI', [['CAI', 'DXB', 30], ['DXB', 'CAI', 37]]], ['RT FRA-JNB/JNB-FRA', [['FRA', 'JNB', 30], ['JNB', 'FRA', 37]]], ['RT CAI-JED/JED-CAI', [['CAI', 'JED', 30], ['JED', 'CAI', 37]]], ['MC CAI-DXB/DXB-LHR', [['CAI', 'DXB', 30], ['DXB', 'LHR', 35]]]];
  for (const [name, legs] of cases) {
    const ctx = { id: 'PROBE-NEXT', hops: [] }; const h = await av(ctx, name, baseBody({ searchCriteria: legs.map(([o, d, n]) => leg(o, d, n)) }));
    if (h.status !== 200) { console.log(name, 'availability', h.status); continue; }
    const n = await nx(ctx, 'next ' + name, nextBody(h.json)); console.log(name.padEnd(24), 'page1', h.status, 'page2', n.status, n.ms + 'ms', n.status === 200 ? 'ODs ' + ODS(n.json).map(o => o.origin + '-' + o.destination + ':' + (o.journeys || []).length).join(' ') : short(errTxt(n), 130));
    if (/DXB-LHR/.test(name)) { const od = ODS(h.json)[1]; const set = {}; (od.journeys || []).forEach(jn => { const s = jn.segments.map(x => segInfo(h.json, x.segmentRefId)); const k = s[0].origin + '>' + s[s.length - 1].destination; set[k] = (set[k] || 0) + 1; }); console.log('  DXB-LHR leg journeys by first-origin>last-destination:', JSON.stringify(set)); }
  }
})();
