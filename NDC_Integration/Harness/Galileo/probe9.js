// Round 4 diagnostic: which journeys can be held now? Any hold created is cancelled at once with CancelAfterHold.
process.env.SLUG = 'probe';
const G = require('./gl'); const F = require('./gchain'); const { bookFlow } = require('./g7'); const { short, errTxt } = G;
const T3 = ['ADT', 'ADT', 'INF']; const out = [];
(async () => {
  const routes = [[[['CAI', 'JED', 30]], 'CAI-JED+30'], [[['JED', 'CAI', 30]], 'JED-CAI+30'], [[['CAI', 'JED', 45]], 'CAI-JED+45']];
  for (const [legs, name] of routes) for (const skip of [0, 1, 2]) {
    const ctx = { id: 'PROBE', hops: [] };
    const o = await bookFlow(ctx, { legs, types: T3, enrich: {}, hold: true, skip, last: 'Probe' + 'abcdefghi'[skip], seed: 20 + skip });
    const fk = (o.wantFlights || []).join('+'); const fcTax = (o.checks.find(c => /reconciles/.test(c.name) && /FareConfirm/.test(c.name)) || {}).detail;
    let cancel = null;
    if (o.booking) { const c = await F.cancelHold(ctx, o.booking, {}); cancel = `cancel HTTP ${c.status} ${c.status === 200 ? JSON.stringify({ cancelled: c.json.cancelled, message: c.json.message }) : short(errTxt(c), 120)}`;
      const r = await F.retrieve(ctx, o.booking, { surName: 'Probe' + 'abcdefghi'[skip] }); cancel += ` | retrieve after: HTTP ${r.status} ${r.json && r.json.bookingStatus || short(errTxt(r), 100)}`; }
    const line = `${name} skip${skip} flights=${fk} ok=${o.ok} failedAt=${o.failedAt} why=${short(o.why || '', 110)} recon=${(fcTax || 'ok').slice(0, 90)} hold=${o.booking ? o.booking.gdsPNR : '-'} ${cancel || ''}`;
    console.log(line); out.push(line);
  }
})().catch(e => console.error('ERR', e));
