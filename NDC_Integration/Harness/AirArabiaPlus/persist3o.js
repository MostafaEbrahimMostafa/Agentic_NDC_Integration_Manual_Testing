process.env.RAW_DIR = 'raw_probe';
const { hop, SUP, sleep } = require('./core');
(async () => {
  const dates = ['2026-12-02', '2026-12-03', '2026-11-19', '2026-11-20', '2026-11-22', '2026-11-23', '2026-11-24'];
  const stats = {};
  for (let round = 1; round <= 4; round++) for (const date of dates) {
    const body = { ...SUP, isDebug: false, searchCriteria: [{ origin: 'CMN', destination: 'SAW', date }], passengers: [{ passengerTypeCode: 'ADT', count: '1' }] };
    const h = await hop('P3O', 'search', 'Search', 'api/V2/FlightSearch/Search', body); const n = ((h.json || {}).offers || []).length;
    stats[date] = stats[date] || { calls: 0, offers: 0 }; stats[date].calls++; if (n) { stats[date].offers++; console.log('OFFER', date, n, h.ms + 'ms', 'round', round); console.log(JSON.stringify(stats)); process.exit(0); }
    await sleep(3000);
  }
  console.log('no 3O offer in', JSON.stringify(stats));
})();
