// Round 3 capability probe for the booking flow (no Book/Hold): Availability -> Select -> FareConfirm -> AddPassenger -> GetAncillary -> SeatMap -> FareCheck
process.env.SLUG = process.env.SLUG || 'probe';
const G = require('./gl'); const F = require('./gchain'); const fs = require('fs'), path = require('path');
const { av, sel, fcq, baseBody, selBody, fcBody, leg, ODS, errTxt, pickMap, short, tokenless } = G; const { ok2 } = F;
const route = process.argv[2] || 'CAI-JED', days = +(process.argv[3] || 30), code = process.argv[4] || 'Y', types = (process.argv[5] || 'ADT,ADT,INF').split(',');
const cnt = {}; types.forEach(t => cnt[t] = (cnt[t] || 0) + 1);
(async () => {
  const ctx = { id: 'FLOWPROBE', hops: [] }; const [o, d] = route.split('-');
  const a = await av(ctx, 'avail', baseBody({ searchCriteria: [leg(o, d, days)], passengers: Object.keys(cnt).map(k => ({ passengerTypeCode: k, count: cnt[k] })) })); console.log('avail', a.status, a.ms); if (!ok2(a)) return console.log(errTxt(a));
  const pm = pickMap(a.json, code); if (pm.missing.length) return console.log('no class', code);
  const jn = pm.chosen[0].journey; console.log('journey segs', jn.segments.length, jn.segments.map(s => { const si = a.json.flightSegments[s.segmentRefId]; return si && `${si.marketingCarrierCode}${si.marketingFlightNumber} ${si.origin}-${si.destination}` }));
  const s = await sel(ctx, 'select', selBody(a.json, pm.map)); console.log('select', s.status, s.ms); if (!ok2(s)) return console.log(errTxt(s));
  const f = await fcq(ctx, 'fc', fcBody(s.json)); console.log('fc', f.status, f.ms); if (!ok2(f)) return console.log(errTxt(f));
  const so = f.json.selectedOffer; console.log('flags', ['haveBundles', 'canBeHeld', 'offerHasAncillary', 'offerHasSeat', 'isSeatMapRequired'].map(k => k + '=' + so[k]).join(' '), 'total', JSON.stringify(so.priceDetails.totalAmount));
  const ap = await F.addPax(ctx, f.json.responseId, so.offerId, types); console.log('addpax', ap.status, ap.ms, ok2(ap) ? Object.keys(ap.json) : errTxt(ap)); if (!ok2(ap)) return;
  fs.writeFileSync(path.join(__dirname, 'raw_probe', 'addpax.json'), JSON.stringify(ap.json));
  let cur = { id: ap.json.responseId, off: ap.json.offerId };
  const g = await F.getAnc(ctx, cur.id, cur.off); console.log('getAnc', g.status, g.ms, ok2(g) ? Object.keys(g.json) : errTxt(g)); if (ok2(g)) { fs.writeFileSync(path.join(__dirname, 'raw_probe', 'anc.json'), JSON.stringify(g.json)); const pa = F.AC.pickAnc(g.json); console.log('pickAnc miss', pa.miss, 'sum', pa.sum.slice(0, 6)); }
  const sm = await F.getSeat(ctx, cur.id, cur.off); console.log('seat', sm.status, sm.ms, ok2(sm) ? Object.keys(sm.json) : errTxt(sm)); if (ok2(sm)) { fs.writeFileSync(path.join(__dirname, 'raw_probe', 'seat.json'), JSON.stringify(sm.json)); const ps = F.AC.pickSeats(sm.json); console.log('pickSeats miss', ps.miss, ps.sum.slice(0, 6)); }
  process.exit(0);
})();
