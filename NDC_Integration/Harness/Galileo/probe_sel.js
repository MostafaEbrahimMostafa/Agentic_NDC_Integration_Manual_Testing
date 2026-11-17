// Diagnostic: does SelectAvailability still accept bookingClassIds as {journey:{segment:[id]}} (array)? Compare with the string form. One-way CAI-JED.
process.env.SLUG = 'probe';
const G = require('./gl'); const { av, sel, baseBody, leg, pickMap, selBody, errTxt, short } = G;
(async () => {
  const ctx = { id: 'PROBE-SEL', hops: [] }; const h = await av(ctx, 'Availability CAI-JED', baseBody({ searchCriteria: [leg('CAI', 'JED', 30)] })); console.log('availability', h.status, h.ms + 'ms', Object.keys(h.json || {}).join(','), 'availabilityId type', typeof (h.json && h.json.availabilityId), 'len', String(h.json && h.json.availabilityId).length); const pm = pickMap(h.json, 'Y');
  const s1 = await sel(ctx, 'Select array form', selBody(h.json, pm.map)); console.log('array form  ', s1.status, s1.status === 200 ? 'offerId ' + String(s1.json.offerId).slice(0, 12) : short(errTxt(s1), 260));
  const str = {}; for (const [j, segs] of Object.entries(pm.map)) { str[j] = {}; for (const [k, v] of Object.entries(segs)) str[j][k] = v[0]; }
  const s2 = await sel(ctx, 'Select string form', selBody(h.json, str)); console.log('string form ', s2.status, s2.status === 200 ? 'offerId ' + String(s2.json.offerId).slice(0, 12) : short(errTxt(s2), 260));
  console.log('build header hints:', JSON.stringify(Object.fromEntries(Object.entries(s1.response_headers || s1.headers || {}).filter(([k]) => /server|date|x-|version|build/i.test(k)))).slice(0, 300));
})();
