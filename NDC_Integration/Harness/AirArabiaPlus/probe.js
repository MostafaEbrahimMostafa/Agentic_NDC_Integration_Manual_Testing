const { hop, SUP, sleep } = require('./core');
const routes = [['SHJ','COK'],['COK','SHJ'],['AMM','SHJ'],['SHJ','AMM'],['MCT','SHJ'],['CAI','MCT'],['HBE','BGY'],['SAW','CMN'],['CMN','SAW']];
const dates = (process.env.DATES || '2026-12-05').split(',');
(async () => {
  for (const [o, d] of routes) for (const date of dates) {
    const body = { ...SUP, isDebug: false, searchCriteria: [{ origin: o, destination: d, date }], passengers: [{ passengerTypeCode: 'ADT', count: '1' }] };
    const h = await hop('PROBE', 'search', 'Search', 'api/V2/FlightSearch/Search', body);
    const offs = (h.json && h.json.offers) || [];
    const keys = h.json ? Object.keys(h.json).join(',') : '';
    console.log(`${o}-${d} ${date} -> ${h.status} offers=${offs.length} ${h.ms}ms ${h.status !== 200 ? (h.text || '').slice(0, 160) : ''}`);
    await sleep(2500);
  }
})();
