// Round-trip / multi-city data probe: which 2-leg combinations return journeys with class Y on every leg?
process.env.SLUG = 'probe';
const G = require('./gl'); const { av, baseBody, leg, ODS, errTxt, short, pickMap } = G;
const combos = [
  ['RT CAI-JED/JED-CAI', [['CAI', 'JED', 30], ['JED', 'CAI', 37]]], ['RT FRA-JNB/JNB-FRA', [['FRA', 'JNB', 30], ['JNB', 'FRA', 37]]], ['RT CAI-DXB/DXB-CAI', [['CAI', 'DXB', 30], ['DXB', 'CAI', 37]]],
  ['MC cont CAI-JED/JED-DXB', [['CAI', 'JED', 30], ['JED', 'DXB', 35]]], ['MC cont CAI-DXB/DXB-LHR', [['CAI', 'DXB', 30], ['DXB', 'LHR', 35]]], ['MC cont CAI-JED/JED-LHR', [['CAI', 'JED', 30], ['JED', 'LHR', 35]]],
  ['MC non-cont CAI-JED/DXB-LHR', [['CAI', 'JED', 30], ['DXB', 'LHR', 35]]], ['MC non-cont CAI-JED/DXB-CAI', [['CAI', 'JED', 30], ['DXB', 'CAI', 36]]], ['MC non-cont CAI-DXB/JED-LHR', [['CAI', 'DXB', 30], ['JED', 'LHR', 35]]],
];
(async () => {
  for (const [name, legs] of combos) {
    const ctx = { id: 'PROBE-RTMC', hops: [] }; const h = await av(ctx, name, baseBody({ searchCriteria: legs.map(([o, d, n]) => leg(o, d, n)) }));
    if (h.status !== 200) { console.log(name.padEnd(30), h.status, h.ms + 'ms', short(errTxt(h), 140)); continue; }
    const pm = pickMap(h.json, 'Y'); console.log(name.padEnd(30), h.status, h.ms + 'ms', 'ODs', ODS(h.json).map(o => `${o.origin}-${o.destination}:${(o.journeys || []).length}`).join(' '), 'more', h.json.hasMoreResults, 'Y missing:', pm.missing.join(',') || 'none');
  }
})();
