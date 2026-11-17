const { hop, SUP, sleep } = require('./core');
const routes = (process.env.ROUTES || 'CAI-MCT,HBE-BGY,SAW-CMN,CMN-SAW,SHJ-COK').split(',').map(r => r.split('-'));
const dates = (process.env.DATES || '').split(',').filter(Boolean);
(async () => {
  for (const [o, d] of routes) for (const date of dates) {
    const body = { ...SUP, isDebug: false, searchCriteria: [{ origin: o, destination: d, date }], passengers: [{ passengerTypeCode: 'ADT', count: '1' }] };
    const h = await hop('SWEEP', 'search', 'Search', 'api/V2/FlightSearch/Search', body);
    const offs = (h.json && h.json.offers) || [];
    const car = [...new Set(Object.values((h.json && h.json.flightSegments) || {}).map(s => s.marketingCarrierCode + '/' + s.operatingCarrierCode))].join(' ');
    console.log(`${o}-${d} ${date} ${h.status} offers=${offs.length} ${car} ${h.ms}ms ${h.status !== 200 ? (h.text || '').slice(0, 140) : ''}`);
    await sleep(2000);
  }
})();
