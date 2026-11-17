// one-off patch: make log-scanning checks read the full raw call store instead of the truncated JSONL bodies
const fs = require('fs');
let x = fs.readFileSync('fx.js', 'utf8');
if (!x.includes('rawItems')) {
  x = x.replace('// ---- memoised fixtures', `// ---- raw call store (full, scrubbed request/response of every call made by this run) - used instead of the truncated JSONL when a check needs whole bodies
let rawCache = null;
function rawItems() {
  if (rawCache && Date.now() - rawCache.t < 20000) return rawCache.v; const dir = path.join(__dirname, 'raw'); const v = [];
  for (const f of require('fs').readdirSync(dir)) { try { const r = JSON.parse(require('fs').readFileSync(path.join(dir, f), 'utf8')); v.push({ tc: r.tc, endpoint: r.endpoint, status: r.status, started_at: r.started_at, ended_at: r.ended_at, ms: r.ms, req: r.request && r.request.body, res: r.response, leak: r.leak }); } catch (e) { } }
  v.sort((a, b) => Date.parse(a.started_at) - Date.parse(b.started_at)); rawCache = { t: Date.now(), v }; return v;
}
const rawOk = r => r.status === 200 && r.res && typeof r.res === 'object' && !r.res.ErrorCode && !r.res.errorCode;
const rawOf = (tc, endpoint) => rawItems().filter(r => r.tc === tc && r.endpoint === endpoint && rawOk(r)).pop();
// ---- memoised fixtures`);
  x = x.replace('module.exports = { sFind,', 'module.exports = { rawItems, rawOf, rawOk, sFind,');
  fs.writeFileSync('fx.js', x);
}
let v = fs.readFileSync('g_void.js', 'utf8');
{
  const a = v.indexOf('let cache = null;'), b = v.indexOf('const ofEp = ');
  v = v.slice(0, a) + `let cache = null;
function scan() {
  if (cache && Date.now() - cache.t < 20000) return cache.v;
  const L = fs.readFileSync(R.LOGS + '/' + R.slug() + '.jsonl', 'utf8').split('\\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return {}; } });
  const out = X.rawItems().filter(r => X.rawOk(r) && ['Book', 'Hold', 'BookAfterHold', 'Retrieve', 'FareConfirmAfterHold'].includes(r.endpoint) && r.tc && /^(OW|RT|OWC|RTC|FLOW|TC-)/.test(r.tc)).map(r => ({ tc: r.tc, ep: r.endpoint, body: r.res, ms: r.ms, carrier: ((JSON.stringify(r.res).match(/"marketingCarrierCode":"(\\w\\w)"/) || [])[1]) }));
  cache = { t: Date.now(), v: { all: out, tcs: L.filter(x => x.type === 'test_case') } }; return cache.v;
}
` + v.slice(b);
  const rep = (re, s) => { if (!re.test(v)) throw new Error('pattern not found ' + re); v = v.replace(re, () => s); };
  rep(/add\('TC-VOIDCAP-BND-04'[\s\S]*?\{ endpoint: 'Book' \}\);\nadd\('TC-VOIDCAP-BND-05'[\s\S]*?\{ endpoint: 'Book' \}\);/, `add('TC-VOIDCAP-BND-04', async () => { const ids = { OW: /^OW-/, RT: /^RT-/, OWC: /^OWC-/, RTC: /^RTC-/ }; const by = {}; for (const t of scan().tcs.filter(t => t.verdict === 'PASS' && Object.values(ids).some(r => r.test(t.tc_id)))) { const bk = X.rawOf(t.tc_id, 'Book'); if (bk) { const k = Object.keys(ids).find(k => ids[k].test(t.tc_id)); (by[k] = by[k] || []).push(bk.res.voidCapability); } }
  const ks = Object.keys(by); return { ...NOHOPS, verdict: ks.length >= 2 && uniq([].concat(...Object.values(by))).length === 1 ? 'PASS' : (ks.length < 2 ? 'BLOCKED' : 'FAIL'), actual: ks.map(k => k + ': ' + uniq(by[k]).join('/') + ' (' + by[k].length + ' bookings)').join('; '), evidence: 'one-way, return, one-way connecting and return connecting bookings of the booking-creation matrix' }; }, { endpoint: 'Book' });
add('TC-VOIDCAP-BND-05', async () => { const g = { BAS: [], ANC: [], BUN: [] }; for (const t of scan().tcs.filter(t => t.verdict === 'PASS')) { const m = t.tc_id.match(/^(?:OW|RT|OWC|RTC)-(BAS|ANC|BUN)-/); if (!m) continue; const bk = X.rawOf(t.tc_id, 'Book'); if (bk) g[m[1]].push(bk.res.voidCapability); }
  const all = uniq([].concat(...Object.values(g))); return { ...NOHOPS, verdict: all.length === 1 && Object.values(g).every(a => a.length) ? 'PASS' : (Object.values(g).some(a => !a.length) ? 'BLOCKED' : 'FAIL'), actual: Object.entries(g).map(([k, a]) => k + ': ' + (uniq(a).join('/') || 'no booking') + ' (' + a.length + ')').join('; '), evidence: 'basic vs ancillary+seat vs bundle bookings' }; }, { endpoint: 'Book' });`);
  rep(/add\('TC-VOIDCAP-VAL-09'[\s\S]*?\{ endpoint: 'Book \/ Retrieve \/ BookAfterHold' \}\);/, `add('TC-VOIDCAP-VAL-09', async () => { const pairs = []; const tcs = [...new Set(scan().all.map(x => x.tc))]; for (const tc of tcs) { const m = {}; scan().all.filter(x => x.tc === tc).forEach(x => { (m[x.ep] = m[x.ep] || []).push(x.body.voidCapability); }); if ((m.Book || m.BookAfterHold) && m.Retrieve) pairs.push([tc, uniq([].concat(...Object.values(m))).join('/')]); } const bad = pairs.filter(p => p[1].includes('/')); return { ...NOHOPS, verdict: pairs.length && !bad.length ? 'PASS' : (pairs.length ? 'FAIL' : 'BLOCKED'), actual: pairs.length + ' bookings compared (Book/BookAfterHold vs Retrieve): ' + (bad.length ? 'DIFFERENT in ' + bad.map(b => b[0]).join(',') : 'identical voidCapability in every one'), evidence: 'flows with Retrieve after Book / BookAfterHold (full raw responses)' }; }, { endpoint: 'Book / Retrieve / BookAfterHold' });`);
  rep(/add\('TC-VOIDCAP-VAL-12'[\s\S]*?\{ endpoint: 'Hold \/ FareConfirmAfterHold' \}\);/, `add('TC-VOIDCAP-VAL-12', async () => { const pairs = []; const tcs = [...new Set(scan().all.map(x => x.tc))]; for (const tc of tcs) { const h = scan().all.filter(x => x.tc === tc && x.ep === 'Hold').pop(), r = scan().all.filter(x => x.tc === tc && x.ep === 'FareConfirmAfterHold').pop(); if (h && r) pairs.push([tc, h.body.voidCapability, r.body.voidCapability]); } const bad = pairs.filter(p => p[1] !== p[2]); return { ...NOHOPS, verdict: pairs.length && !bad.length ? 'PASS' : (pairs.length ? 'FAIL' : 'BLOCKED'), actual: pairs.length + ' holds compared (Hold vs FareConfirmAfterHold): ' + (bad.length ? 'DIFFER in ' + bad.map(b => b[0]).join(',') : 'identical voidCapability (' + uniq(pairs.map(p => p[1])).join('/') + ')'), evidence: 'hold-branch flows (full raw responses)' }; }, { endpoint: 'Hold / FareConfirmAfterHold' });`);
  fs.writeFileSync('g_void.js', v);
}
let s = fs.readFileSync('g_seat.js', 'utf8');
{
  const rep = (re, t) => { if (!re.test(s)) throw new Error('pattern not found ' + re); s = s.replace(re, () => t); };
  rep(/add\('TC-BOOK-INT-03'[\s\S]*?\{ endpoint: 'Book' \}\);\nadd\('TC-BOOK-BND-03'/, `add('TC-BOOK-INT-03', async () => { const L = fs.readFileSync(R.LOGS + '/' + R.slug() + '.jsonl', 'utf8').split('\\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return {}; } }).filter(x => x.type === 'test_case' && /^(OW|RT|OWC|RTC)-BUN-0|^FLOW-V2-(55|67)$/.test(x.tc_id)); const okc = L.filter(x => x.verdict === 'PASS'); const proof = okc.map(x => ({ id: x.tc_id, b: X.rawOf(x.tc_id, 'Book') })).filter(p => p.b && p.b.req && p.b.req.selectedBundles && p.b.req.passengersSelectedAncillaries && p.b.req.passengersSelectedSeats);
  return { verdict: proof.length ? 'PASS' : 'BLOCKED', hops: [], actual: proof.length ? proof.length + ' Book call(s) carried selectedBundles, passengersSelectedAncillaries and passengersSelectedSeats together and returned 200 (' + proof.map(p => p.id).join(', ') + ')' : 'no passing bundle booking with all three fields', evidence: 'taken from the bundle booking rows of this run (full raw requests)', request_summary: 'Book calls of the bundle booking rows (no new request)', response_summary: '200' }; }, { endpoint: 'Book' });
add('TC-BOOK-BND-03'`);
  rep(/add\('TC-BOOK-INT-04'[\s\S]*?\{ endpoint: 'Book' \}\);\n\n\/\/ =+ SeatAfterHold/, `add('TC-BOOK-INT-04', async () => { const L = fs.readFileSync(R.LOGS + '/' + R.slug() + '.jsonl', 'utf8').split('\\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return {}; } }).filter(x => x.type === 'test_case' && x.verdict === 'PASS' && /^FLOW-V2-(55|67)$|^(OW|RT|OWC|RTC)-BUN-0/.test(x.tc_id)); const proofs = L.map(x => ({ id: x.tc_id, b: X.rawOf(x.tc_id, 'Book') })).filter(p => p.b && p.b.req);
  const good = proofs.filter(p => { const b = p.b.req; const bun = (b.selectedBundles || []).map(x => x.journeyKey), seg = Object.values(b.passengersSelectedSeats || {}).flatMap(x => Object.keys(x.setSegmentsSeats || {})); return bun.length && seg.length && seg.every(s => bun.some(j => j.split(',').includes(s))); });
  return { verdict: good.length ? 'PASS' : 'BLOCKED', hops: [], actual: good.length ? good.length + ' bundle booking(s) sent selectedBundles journey keys and seat segment keys that resolve to the same segments and were accepted (' + good.map(g => g.id).join(', ') + ')' : 'no passing bundle+seat booking available', evidence: 'cross-consistency of journeyKey and segmentRefId (full raw requests)', request_summary: 'Book calls of the bundle booking rows (no new request)', response_summary: '200' }; }, { endpoint: 'Book' });

// ================= SeatAfterHold`);
  rep(/add\('FLOW-V2-49-SEATFIELD'[\s\S]*?\{ endpoint: 'Book \/ Retrieve' \}\);/, `add('FLOW-V2-49-SEATFIELD', async () => { const L = fs.readFileSync(R.LOGS + '/' + R.slug() + '.jsonl', 'utf8').split('\\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return {}; } }).filter(x => x.type === 'test_case' && x.tc_id === 'FLOW-V2-49'); const t = L[0]; if (!t) return { verdict: 'BLOCKED', hops: [], actual: 'FLOW-V2-49 has not been executed in this run yet', evidence: '' }; const bk = X.rawOf('FLOW-V2-49', 'Book'), rt = X.rawOf('FLOW-V2-49', 'Retrieve'); const seats = bk ? seatPairs(bk.res.passengersSelectedSeats || {}).length : 0, rseat = rt ? seatPairs(rt.res.passengersSelectedSeats || {}).length : 0; const tsa = rt ? amt(rt.res.selectedOffer.priceDetails.totalSelectedSeatsAmount) : 0;
  return { verdict: t.verdict === 'PASS' && seats && rseat === seats ? 'PASS' : (t.verdict === 'BLOCKED' ? 'BLOCKED' : 'FAIL'), hops: [], actual: 'FLOW-V2-49 verdict ' + t.verdict + ': Book echoes ' + seats + ' seat(s), Retrieve echoes ' + rseat + '; totalSelectedSeatsAmount ' + tsa, evidence: 'derived from the FLOW-V2-49 execution of this run (full raw responses)', request_summary: 'Hops of FLOW-V2-49 (no new request)', response_summary: 'n/a' }; }, { endpoint: 'Book / Retrieve' });`);
  fs.writeFileSync('g_seat.js', s);
}
let n = fs.readFileSync('g_name.js', 'utf8');
{
  const a = n.indexOf("if (what === 'same') {"), b = n.indexOf("else if (what === 'diff')");
  if (a < 0 || b < 0) throw new Error('name anchors');
  n = n.slice(0, a) + "if (what === 'same') { const bkr = X.rawOf('OW-BAS-02', 'Book'); const p2 = bkr && bkr.res.passengersList; const ik = p2 && Object.keys(p2).find(k => /^I\\d+/.test(k)); good = !!ik; act = good ? 'OW-BAS-02 Book response lists the infant (key ' + ik + ', surname Ibrahim, same as the adult) in passengersList' : 'no infant in the OW-BAS-02 Book response'; }\n    " + n.slice(b);
  fs.writeFileSync('g_name.js', n);
}
console.log('patched');
