// Group 1: CAPCHECK + AVAIL (first-page Availability) — 65 cases
const G = require('./gl');
const { tc, av, nx, sel, fcq, req, reqGet, baseBody, nextBody, selBody, fcBody, leg, d, clone, PAX, AV, SUPB, ODS, std4xx, errTxt, envOf, leakOf, credScan, short, tokenless, pickMap, segInfo, flightKey, paths, diffPaths, nullFields, literalNull, negStd, ERRS, chain, fs, path } = G;
const BL = path.join(__dirname, 'baseline_avail.json');

const topChecks = j => { const o = {}; o.availabilityId = typeof j.availabilityId === 'string' && j.availabilityId.length > 0; o.responseId = typeof j.responseId === 'string' && j.responseId.length > 0; o.hasMoreResults = typeof j.hasMoreResults === 'boolean'; o.originDestinations = Array.isArray(j.originDestinations) && j.originDestinations.length > 0; return o; };
const journeysOf = j => ODS(j).reduce((n, o) => n + (o.journeys || []).length, 0);
const depDates = j => [...new Set(Object.values(j.flightSegments || {}).map(s => String(s.departureDateTime).slice(0, 10)))];
const flightSet = j => new Set(Object.values(j.flightSegments || {}).map(flightKey));
// "accepted with inventory, or a clean 4xx; 5xx or leak is a defect"
function acceptOr4xx(h, okCheck) {
  if (h.status === 200 && h.json) { const r = okCheck ? okCheck(h.json) : { ok: true, msg: '' }; return { v: r.ok ? 'PASS' : 'FAIL', actual: `HTTP 200 — accepted. ${r.msg}`, mode: 'accepted' }; }
  const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx envelope, nothing leaked.' : 'Problems: ' + s.problems.join('; ') + '.'}`, mode: 'rejected' };
}
const withInv = j => { const n = journeysOf(j); return { ok: n > 0, msg: `${ODS(j).length} originDestinations, ${n} journeys.` }; };

module.exports = async function (S = {}) {
  // ---------------- CAPCHECK ----------------
  await tc('TC-CAPCHECK-GALILEO-POS-01', async ctx => {
    const h = await av(ctx, 'Availability BASE (CAI-JED +30, 2 ADT + 1 INF)', baseBody()); const j = h.json || {}; const t = topChecks(j); const od = ODS(j)[0] || {};
    const ok = h.status === 200 && Object.values(t).every(Boolean) && od.origin === 'CAI' && od.destination === 'JED';
    const extra = Object.keys(j).filter(k => !['availabilityId', 'responseId', 'hasMoreResults', 'originDestinations'].includes(k));
    return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status} in ${h.ms} ms. availabilityId/responseId non-empty strings, hasMoreResults=${j.hasMoreResults} (${typeof j.hasMoreResults}), originDestinations=${ODS(j).length} (first ${od.origin}->${od.destination}), journeys=${(od.journeys || []).length}, pageNumber=${j.pageNumber}. Endpoint is deployed on ne-4. Extra top-level keys beyond what the collection reads: ${extra.join(', ')}.`,
      unknown: ['Galileo/EGY exposes Availability on ne-4: HTTP 200 for CAI-JED one-way. The response carries, besides availabilityId/responseId/hasMoreResults/originDestinations, the Search-style common-interface fields supplier, pageNumber, journeys{refId->{origin,destination,numberOfStops,segmentRefIds}} and flightSegments{refId->flight data}; originDestinations[].journeys[].segments[].cabins[].bookingClasses[] hold bookingCode/bookingClassId/seatsAvailable.'] };
  });
  await tc('TC-CAPCHECK-GALILEO-POS-02', async ctx => {
    const out = [];
    for (const [o, dd] of [['CAI', 'JED'], ['JED', 'CAI'], ['HKG', 'LHR'], ['FRA', 'JNB']]) {
      const h = await av(ctx, `Availability ${o}-${dd} +30`, baseBody({ searchCriteria: [leg(o, dd, 30)] })); const j = h.json || {};
      const js = ODS(j)[0] ? ODS(j)[0].journeys || [] : []; out.push({ r: `${o}-${dd}`, st: h.status, n: js.length, conn: js.filter(x => x.segments.length > 1).length, more: j.hasMoreResults, ms: h.ms, err: h.status !== 200 ? errTxt(h) : '' });
    }
    S.routes = out;
    const good = out.filter(x => x.st === 200 && x.n > 0);
    return { v: good.length ? 'PASS' : 'FAIL', actual: 'Route table (+30 days, 2 ADT + 1 INF): ' + out.map(x => `${x.r}: HTTP ${x.st}, ${x.n} journeys (${x.conn} connecting), hasMoreResults=${x.more}, ${x.ms} ms${x.err ? ' ' + x.err : ''}`).join(' | ') + `. Routes with inventory: ${good.map(x => x.r).join(', ') || 'none'}.` };
  });

  // ---------------- AVAIL positive ----------------
  await tc('TC-AVAIL-POS-01', async ctx => {
    const h = await av(ctx, 'Availability BASE', baseBody()); const j = h.json || {}; const t = topChecks(j); const od = ODS(j)[0] || {};
    const ok = h.status === 200 && Object.values(t).every(Boolean) && ODS(j).length === 1 && od.origin === 'CAI' && od.destination === 'JED' && (od.journeys || []).length > 0;
    return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}; ids non-empty strings; hasMoreResults=${j.hasMoreResults}; originDestinations=${ODS(j).length} (${od.origin}->${od.destination}); journeys=${(od.journeys || []).length}.` };
  });
  await tc('TC-AVAIL-POS-02', async ctx => {
    const h = await av(ctx, 'Availability round trip (CAI-JED +30, JED-CAI +37)', baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('JED', 'CAI', 37)] })); const j = h.json || {}; const o = ODS(j);
    const ok = h.status === 200 && o.length === 2 && o[0].origin === 'CAI' && o[0].destination === 'JED' && o[1].origin === 'JED' && o[1].destination === 'CAI' && o.every(x => (x.journeys || []).length > 0);
    return { v: ok ? 'PASS' : 'FAIL', actual: h.status === 200 ? `HTTP 200; originDestinations=${o.length}: ${o.map(x => `${x.origin}->${x.destination} (${(x.journeys || []).length} journeys, ${String(x.departureDate).slice(0, 10)})`).join(', ')}.` : errTxt(h),
      unknown: ok ? ['Round-trip (two searchCriteria legs) is supported by Availability: HTTP 200, one originDestinations entry per leg in request order, each with its own journeys[] (SPEC §2.1 listed round-trip as UNKNOWN).'] : [] };
  });
  await tc('TC-AVAIL-POS-03', async ctx => {
    const legs = [leg('CAI', 'JED', 30), leg('JED', 'CAI', 33), leg('CAI', 'JED', 37)];
    const h = await av(ctx, 'Availability multi-city (CAI-JED +30, JED-CAI +33, CAI-JED +37)', baseBody({ searchCriteria: legs })); const j = h.json || {}; const o = ODS(j);
    if (h.status === 200) { const ok = o.length === 3 && o.every((x, i) => x.origin === legs[i].origin && x.destination === legs[i].destination); return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP 200; originDestinations=${o.length}: ${o.map(x => `${x.origin}->${x.destination} (${(x.journeys || []).length})`).join(', ')}.`, unknown: ok ? ['Multi-city with 3 searchCriteria legs is supported by Availability: HTTP 200 with 3 originDestinations in request order (SPEC §2.1 listed multi-city 3+ as UNKNOWN).'] : [] }; }
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx — multi-city rejected.' : s.problems.join('; ')}`, unknown: s.ok ? ['Multi-city with 3 legs is rejected by Availability: ' + errTxt(h)] : [] };
  });
  await tc('TC-AVAIL-POS-04', async ctx => {
    const a = await av(ctx, 'Availability with isDebug=false', baseBody()); const b0 = baseBody(); delete b0.isDebug; const b = await av(ctx, 'Availability with isDebug omitted', b0);
    const ka = Object.keys(a.json || {}).sort().join(','), kb = Object.keys(b.json || {}).sort().join(','); const cs = credScan(b);
    const ok = a.status === 200 && b.status === 200 && ka === kb && !cs.hasRaw;
    return { v: ok ? 'PASS' : 'FAIL', actual: `isDebug=false: HTTP ${a.status}, top keys [${ka}]; isDebug omitted: HTTP ${b.status}, top keys [${kb}]. Same keys: ${ka === kb}; supplier payload fields in response: ${cs.hasRaw}.` };
  });
  await tc('TC-AVAIL-POS-05', async ctx => {
    const h = await av(ctx, 'Availability 1 ADT', baseBody({ passengers: [{ passengerTypeCode: 'ADT', count: 1 }] })); const j = h.json || {};
    const ok = h.status === 200 && (ODS(j)[0] && (ODS(j)[0].journeys || []).length > 0) && Object.keys(j).includes('availabilityId');
    return { v: ok ? 'PASS' : 'FAIL', actual: h.status === 200 ? `HTTP 200; journeys=${ODS(j)[0] ? (ODS(j)[0].journeys || []).length : 0}; same shape as POS-01 (keys: ${Object.keys(j).join(', ')}).` : errTxt(h) };
  });

  // ---------------- AVAIL validation ----------------
  await tc('TC-AVAIL-VAL-01', async ctx => {
    const h = await av(ctx, 'Availability BASE', baseBody()); const j = h.json || {};
    const ty = { availabilityId: typeof j.availabilityId + (j.availabilityId ? '' : '(empty)'), responseId: typeof j.responseId + (j.responseId ? '' : '(empty)'), hasMoreResults: j.hasMoreResults === null ? 'null' : typeof j.hasMoreResults, originDestinations: Array.isArray(j.originDestinations) ? 'array[' + j.originDestinations.length + ']' : typeof j.originDestinations };
    const ok = h.status === 200 && Object.values(topChecks(j)).every(Boolean);
    return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}. Types: ${Object.entries(ty).map(([k, v]) => k + '=' + v).join(', ')}. Additional top-level keys recorded as baseline: ${Object.keys(j).filter(k => !ty[k]).map(k => `${k}:${Array.isArray(j[k]) ? 'array' : j[k] === null ? 'null' : typeof j[k]}`).join(', ')}.` };
  });
  await tc('TC-AVAIL-VAL-02', async ctx => {
    const legs1 = [leg('CAI', 'JED', 30)], legs2 = [leg('CAI', 'JED', 30), leg('JED', 'CAI', 37)];
    const a = await av(ctx, 'Availability one-way', baseBody({ searchCriteria: legs1 })); const b = await av(ctx, 'Availability round trip', baseBody({ searchCriteria: legs2 }));
    const bad = []; [[a, legs1], [b, legs2]].forEach(([h, L], k) => { const o = ODS(h.json); if (h.status !== 200) return bad.push(`call ${k + 1} HTTP ${h.status}`); L.forEach((l, i) => { if (!o[i] || o[i].origin !== l.origin || o[i].destination !== l.destination) bad.push(`call ${k + 1} leg ${i}: got ${o[i] && o[i].origin}-${o[i] && o[i].destination}`); else if (String(o[i].departureDate).slice(0, 10) !== l.date.slice(0, 10)) bad.push(`call ${k + 1} leg ${i}: departureDate ${o[i].departureDate} != ${l.date}`); }); });
    const sup = [a, b].map(h => (h.json || {}).supplier), cs = [a, b].map(h => Object.keys(h.json || {}).includes('credentialsSelector'));
    return { v: bad.length || sup.some(s => s !== 'Galileo') ? 'FAIL' : 'PASS', actual: bad.length ? 'Mismatch: ' + bad.join('; ') : `origin/destination (and departureDate) echo the request legs byte-for-byte and in order for the one-way and the 2-leg search. Response echoes supplier='${sup[0]}'; credentialsSelector echoed: ${cs[0]}.`, unknown: ['Availability echoes supplier ("Galileo") at the top level; credentialsSelector is not echoed.'] };
  });
  await tc('TC-AVAIL-VAL-03', async ctx => {
    const h = await av(ctx, 'Availability BASE', baseBody()); const bad = []; let nJ = 0, nS = 0;
    ODS(h.json).forEach(od => (od.journeys || []).forEach(jn => { nJ++; if (typeof jn.journeyRefId !== 'string' || !jn.journeyRefId) bad.push('journey without journeyRefId'); if (!Array.isArray(jn.segments) || jn.segments.length < 1) bad.push(jn.journeyRefId + ' has no segments'); (jn.segments || []).forEach(s => { nS++; if (typeof s.segmentRefId !== 'string' || !s.segmentRefId) bad.push(jn.journeyRefId + ' segment without segmentRefId'); }); }));
    return { v: h.status === 200 && nJ > 0 && !bad.length ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}; ${nJ} journeys, ${nS} segments checked; ${bad.length ? 'violations: ' + bad.slice(0, 5).join('; ') : 'every journey has a non-empty journeyRefId and >=1 segment with a non-empty segmentRefId'}.` };
  });
  await tc('TC-AVAIL-VAL-04', async ctx => {
    const h = await av(ctx, 'Availability BASE', baseBody()); const bad = [], noBC = []; let nB = 0; const fmt = new Set(), cabins = new Set();
    ODS(h.json).forEach(od => (od.journeys || []).forEach(jn => (jn.segments || []).forEach(s => { if (!Array.isArray(s.cabins) || !s.cabins.length) return bad.push(s.segmentRefId + ': no cabins'); let any = false; s.cabins.forEach(c => { cabins.add(c.cabin); (c.bookingClasses || []).forEach(b => { any = true; nB++; if (typeof b.bookingCode !== 'string' || !b.bookingCode) bad.push(s.segmentRefId + ': bad bookingCode'); else fmt.add(/^[A-Z]$/.test(b.bookingCode) ? 'single letter' : b.bookingCode); if (typeof b.bookingClassId !== 'string' || !b.bookingClassId) bad.push(s.segmentRefId + ': bad bookingClassId'); }); }); if (!any) noBC.push(s.segmentRefId); })));
    return { v: h.status === 200 && nB > 0 && !bad.length ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}; ${nB} booking classes checked; cabins [${[...cabins]}]; bookingCode format [${[...fmt]}]; segments without booking classes: ${noBC.length}; ${bad.length ? 'violations: ' + bad.slice(0, 5).join('; ') : 'every segment has cabins[] with bookingClasses[] carrying non-empty bookingCode and bookingClassId'}.` };
  });
  await tc('TC-AVAIL-VAL-05', async ctx => {
    const h = await av(ctx, 'Availability BASE', baseBody()); const bad = []; const bcs = new Map(); const segAcross = new Map();
    ODS(h.json).forEach(od => { const js = new Set(); (od.journeys || []).forEach(jn => { if (js.has(jn.journeyRefId)) bad.push('duplicate journeyRefId ' + jn.journeyRefId); js.add(jn.journeyRefId); const ss = new Set(); (jn.segments || []).forEach(s => { if (ss.has(s.segmentRefId)) bad.push('duplicate segmentRefId ' + s.segmentRefId + ' in ' + jn.journeyRefId); ss.add(s.segmentRefId); segAcross.set(s.segmentRefId, (segAcross.get(s.segmentRefId) || 0) + 1); (s.cabins || []).forEach(c => (c.bookingClasses || []).forEach(b => { const k = b.bookingClassId; if (bcs.has(k)) bad.push('bookingClassId shared by ' + bcs.get(k) + ' and ' + s.segmentRefId + '/' + b.bookingCode); bcs.set(k, s.segmentRefId + '/' + b.bookingCode); })); }); }); });
    const rep = [...segAcross.values()].filter(n => n > 1).length;
    return { v: h.status === 200 && !bad.length ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}; ${bcs.size} distinct bookingClassIds; ${bad.length ? 'duplicates: ' + bad.slice(0, 5).join('; ') : 'no duplicate journeyRefId within an origin-destination, no duplicate segmentRefId within a journey, no shared bookingClassId'}. segmentRefIds repeated across journeys: ${rep}.` };
  });
  await tc('TC-AVAIL-VAL-06', async ctx => {
    const h = await av(ctx, 'Availability BASE', baseBody()); const nf = nullFields(h.json || {}), ln = literalNull(h.json || {});
    return { v: h.status === 200 && h.json && !ln.length ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}, valid JSON. Fields that are null for some objects (baseline): ${nf.join(', ') || 'none'}. Literal 'null'/'None' strings: ${ln.length ? ln.join(', ') : 'none'}.`, unknown: nf.length ? ['Availability response nullable fields observed: ' + nf.join(', ')] : [] };
  });
  await tc('TC-AVAIL-VAL-07', async ctx => {
    const a = await av(ctx, 'Availability BASE (date with T00:00:00Z)', baseBody()); const day = d(30).slice(0, 10);
    const h = await av(ctx, `Availability date as plain ${day}`, baseBody({ searchCriteria: [{ origin: 'CAI', destination: 'JED', date: day }] }));
    const r = acceptOr4xx(h, j => { const dd = depDates(j); const same = flightSet(j).size === flightSet(a.json || {}).size; return { ok: withInv(j).ok && dd.every(x => x === day), msg: `departure day(s) ${dd}; flights ${flightSet(j).size} vs ${flightSet(a.json || {}).size} with T00:00:00Z (${same ? 'same count' : 'count differs, live inventory'}).` }; });
    return { v: r.v, actual: r.actual, unknown: [`Availability date field: plain YYYY-MM-DD is ${r.mode} (${h.status}).`] };
  });
  await tc('TC-AVAIL-VAL-08', async ctx => {
    const day = d(30).slice(0, 10); const h = await av(ctx, 'Availability date with T15:30:00Z', baseBody({ searchCriteria: [{ origin: 'CAI', destination: 'JED', date: day + 'T15:30:00Z' }] }));
    const r = acceptOr4xx(h, j => { const dd = depDates(j); const early = Object.values(j.flightSegments || {}).filter(s => String(s.departureDateTime).slice(11, 16) < '15:30').length; return { ok: withInv(j).ok && dd.every(x => x === day), msg: `departure day(s) ${dd} (requested ${day}); ${early} segments depart before 15:30, so the time part is ${early ? 'ignored' : 'honoured'}.` }; });
    return { v: r.v, actual: r.actual, unknown: [`Availability date with a non-midnight time (T15:30:00Z): ${r.mode} (${h.status}).`] };
  });
  await tc('TC-AVAIL-VAL-09', async ctx => {
    const b = baseBody(); delete b.isDebug; b.isdebug = false; const h = await av(ctx, 'Availability with key isdebug (lowercase)', b);
    const r = acceptOr4xx(h, j => { const cs = credScan(h); return { ok: !cs.hasRaw, msg: `supplier payload echoed: ${cs.hasRaw}.` }; });
    return { v: r.v, actual: r.actual, unknown: [`Availability request key 'isdebug' (lowercase) is ${r.mode}.`] };
  });
  await tc('TC-AVAIL-VAL-10', async ctx => {
    const h = await av(ctx, 'Availability with CHD count 0', baseBody({ passengers: [{ passengerTypeCode: 'ADT', count: 2 }, { passengerTypeCode: 'CHD', count: 0 }, { passengerTypeCode: 'INF', count: 1 }] }));
    const r = acceptOr4xx(h, withInv); return { v: r.v, actual: r.actual, unknown: [`Availability with a zero-count passenger entry (CHD count 0) sent directly: ${r.mode} (${h.status}); the API ${r.mode === 'accepted' ? 'does not rely on' : 'relies on'} the collection pre-request script to strip it.`] };
  });
  await tc('TC-AVAIL-VAL-11', async ctx => {
    const h = await av(ctx, "Availability with supplier 'galileo'", baseBody({ supplier: 'galileo' })); const j = h.json || {};
    const ok = h.status === 200 && withInv(j).ok; return { v: ok ? 'PASS' : 'FAIL', actual: ok ? `HTTP 200; same shape as POS-01 (${withInv(j).msg}) — supplier matched case-insensitively.` : `${errTxt(h)} — rejected, a divergence from Search (SPEC §1.7).` };
  });
  await tc('TC-AVAIL-VAL-12', async ctx => {
    const b = { Supplier: 'Galileo', CredentialsSelector: 'EGY', SearchCriteria: [leg('CAI', 'JED', 30)], Passengers: clone(PAX), IsDebug: false };
    const h = await av(ctx, 'Availability with PascalCase property names', b); const r = acceptOr4xx(h, withInv);
    return { v: r.v, actual: r.actual, unknown: [`Availability request property names in PascalCase are ${r.mode} (${h.status}).`] };
  });
  await tc('TC-AVAIL-VAL-13', async ctx => {
    const a = await av(ctx, 'Availability BASE (call A)', baseBody()); const b = await av(ctx, 'Availability BASE (call B)', baseBody()); S.A = a.json; S.B = b.json;
    const fa = flightSet(a.json || {}), fb = flightSet(b.json || {}); const inter = [...fa].filter(x => fb.has(x)).length;
    const ok = a.status === 200 && b.status === 200 && a.json.availabilityId !== b.json.availabilityId && a.json.responseId !== b.json.responseId;
    return { v: ok ? 'PASS' : 'FAIL', actual: `A: ${a.status} in ${a.ms} ms; B: ${b.status} in ${b.ms} ms. availabilityId differs: ${a.json && b.json && a.json.availabilityId !== b.json.availabilityId}; responseId differs: ${a.json && b.json && a.json.responseId !== b.json.responseId}. Flights A=${fa.size}, B=${fb.size}, common=${inter}.` };
  });

  // ---------------- AVAIL negative ----------------
  const mut = (id, label, fn, o) => tc(id, ctx => negStd(ctx, label, (c, l) => { const b = baseBody(); fn(b); return av(c, l, b); }, o));
  await mut('TC-AVAIL-NEG-01', 'Availability without supplier', b => { delete b.supplier; });
  await mut('TC-AVAIL-NEG-02', 'Availability without credentialsSelector', b => { delete b.credentialsSelector; });
  await mut('TC-AVAIL-NEG-03', 'Availability without searchCriteria', b => { delete b.searchCriteria; });
  await mut('TC-AVAIL-NEG-04', 'Availability without passengers', b => { delete b.passengers; });
  await mut('TC-AVAIL-NEG-05', 'Availability without searchCriteria[0].origin', b => { delete b.searchCriteria[0].origin; });
  await mut('TC-AVAIL-NEG-06', 'Availability without searchCriteria[0].destination', b => { delete b.searchCriteria[0].destination; });
  await mut('TC-AVAIL-NEG-07', 'Availability without searchCriteria[0].date', b => { delete b.searchCriteria[0].date; });
  await mut('TC-AVAIL-NEG-08', 'Availability with searchCriteria=[]', b => { b.searchCriteria = []; });
  await mut('TC-AVAIL-NEG-09', 'Availability with passengers=[]', b => { b.passengers = []; });
  await mut('TC-AVAIL-NEG-10', 'Availability with passengers[0].count as string "2"', b => { b.passengers[0].count = '2'; });
  await mut('TC-AVAIL-NEG-11', 'Availability with passengers[0].count=-1', b => { b.passengers[0].count = -1; });
  await mut('TC-AVAIL-NEG-12', 'Availability with passengerTypeCode XYZ', b => { b.passengers[0].passengerTypeCode = 'XYZ'; });
  await mut('TC-AVAIL-NEG-13', 'Availability with every passenger count 0', b => { b.passengers = [{ passengerTypeCode: 'ADT', count: 0 }, { passengerTypeCode: 'CHD', count: 0 }, { passengerTypeCode: 'INF', count: 0 }]; });
  await tc('TC-AVAIL-NEG-14', async ctx => {
    const b = baseBody(); b.searchCriteria[0].origin = 'XXX'; const h = await av(ctx, 'Availability with origin XXX', b);
    if (h.status === 200 && h.json) { const n = journeysOf(h.json); return { v: n === 0 ? 'PASS' : 'FAIL', actual: `HTTP 200 with ${n} journeys (${ODS(h.json).length} originDestinations).` + (n === 0 ? ' Empty result for an unknown origin.' : ' Inventory returned for an unknown IATA code.'), unknown: n === 0 ? ['Unknown origin IATA code (XXX) on Availability returns HTTP 200 with empty journeys.'] : [] }; }
    const s = std4xx(h); ERRS[ctx.id] = { ep: 'Availability', status: h.status, code: s.e.code, msg: short(tokenless(s.e.msg), 160), casing: s.e.casing, ok: s.ok };
    return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? ['Unknown origin IATA code (XXX) on Availability: ' + errTxt(h)] : [] };
  });
  await tc('TC-AVAIL-NEG-15', async ctx => {
    const b = baseBody(); b.searchCriteria[0].origin = 'cai'; const h = await av(ctx, 'Availability with origin "cai"', b);
    const r = acceptOr4xx(h, withInv); return { v: r.v, actual: r.actual, unknown: [`Availability IATA codes are ${r.mode === 'accepted' ? 'case-insensitive (lowercase "cai" accepted)' : 'case-sensitive (lowercase "cai" rejected)'}.`] };
  });
  await mut('TC-AVAIL-NEG-16', 'Availability with origin = destination (CAI-CAI)', b => { b.searchCriteria[0].destination = 'CAI'; });
  await mut('TC-AVAIL-NEG-17', 'Availability with yesterday as date', b => { b.searchCriteria[0].date = d(-1); });
  await mut('TC-AVAIL-NEG-18', 'Availability with date "tomorrow"', b => { b.searchCriteria[0].date = 'tomorrow'; });
  await mut('TC-AVAIL-NEG-19', 'Availability with supplier "Galilio"', b => { b.supplier = 'Galilio'; }, { ignoreNet: true });
  await mut('TC-AVAIL-NEG-20', 'Availability with credentialsSelector ZZZ', b => { b.credentialsSelector = 'ZZZ'; }, { ignoreNet: true });
  await tc('TC-AVAIL-NEG-21', async ctx => {
    const Z = '00000000-0000-0000-0000-000000000000'; const h = await av(ctx, 'Availability BASE plus zero-GUID availabilityId/responseId', baseBody({ availabilityId: Z, responseId: Z })); const j = h.json || {};
    if (h.status === 200 && j.availabilityId) { const fresh = j.availabilityId !== Z && j.pageNumber === 1; return { v: fresh ? 'PASS' : 'FAIL', actual: `HTTP 200 — extra ids ignored: a fresh first page (pageNumber ${j.pageNumber}, new ids, ${journeysOf(j)} journeys).`, unknown: ['Availability with availabilityId/responseId (zero GUIDs) next to searchCriteria: the extra ids are ignored and a fresh first page is returned.'] }; }
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? ['Availability with availabilityId/responseId next to searchCriteria is rejected: ' + errTxt(h)] : [] };
  });
  await tc('TC-AVAIL-NEG-22', async ctx => {
    const cand = [['CAI', 'ULN'], ['JED', 'OOL'], ['ADD', 'FNJ']]; const seen = [];
    for (const [o, dd] of cand) {
      const h = await av(ctx, `Availability ${o}-${dd} +30 (unserved-pair candidate)`, baseBody({ searchCriteria: [leg(o, dd, 30)] }));
      if (h.status === 200 && h.json && journeysOf(h.json) > 0) { seen.push(`${o}-${dd}: ${journeysOf(h.json)} journeys`); continue; }
      if (h.status === 200) return { v: 'PASS', actual: `${o}-${dd}: HTTP 200 with empty journeys (${ODS(h.json).length} originDestinations) in ${h.ms} ms — clean empty result, no error body.`, unknown: [`A valid IATA pair with no Galileo inventory (${o}-${dd}) returns HTTP 200 with empty journeys.`] };
      const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${o}-${dd}: ${errTxt(h)}. ${s.ok ? 'Clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? [`A valid IATA pair with no Galileo inventory (${o}-${dd}): ` + errTxt(h)] : [] };
    }
    return { v: 'BLOCKED', actual: `No unserved pair found: all candidate pairs returned inventory (${seen.join('; ')}).` };
  });
  await tc('TC-AVAIL-NEG-23', async ctx => {
    const raw = JSON.stringify(baseBody()).replace(/\}$/, ',}'); const h = await av(ctx, 'Availability with malformed JSON (trailing comma)', null, { raw });
    const s = std4xx(h); ERRS[ctx.id] = { ep: 'Availability', status: h.status, code: s.e.code, msg: short(tokenless(s.e.msg), 160), casing: s.e.casing, ok: s.ok, malformed: true };
    const nb = !h.json && h.text ? ` Body is not a JSON envelope: "${short(h.text, 120)}".` : '';
    return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}.${nb} ${s.ok ? 'Clean 4xx standard envelope.' : 'Problems: ' + s.problems.join('; ') + '.'}` };
  });
  await tc('TC-AVAIL-NEG-24', async ctx => {
    const h = await reqGet(ctx, 'GET on the Availability URL (no body)', 'Availability', AV);
    const ok = h.status === 405 || h.status === 404; return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}${h.json ? ' ' + errTxt(h) : ''}. ${ok ? 'GET is not served.' : 'Expected 405/404.'}` };
  });
  const crossEndpoints = (id, over, name) => tc(id, async ctx => {
    const c = await chain(ctx, { until: 'sel', label: 'setup:' }); if (!c.sel || c.sel.status !== 200) return { v: 'BLOCKED', actual: 'Could not build valid ids (Availability -> Select) to reuse; ' + (c.p1 ? c.p1.response_summary : '') };
    const p1 = c.p1.json, s = c.sel.json, pm = c.pm;
    const A = await av(ctx, `Availability with ${name}`, baseBody(over)); const N = await nx(ctx, `NextAvailability with ${name}`, nextBody(p1, over));
    const S2 = await sel(ctx, `SelectAvailability with ${name}`, selBody(p1, pm.map, over)); const F = await fcq(ctx, `FareConfirm with ${name}`, fcBody(s, over));
    const rs = [A, N, S2, F].map(h => ({ h, s: std4xx(h, { ignoreNet: true }), e: envOf(h) })); const names = ['Availability', 'NextAvailability', 'SelectAvailability', 'FareConfirm'];
    rs.forEach((x, i) => { ERRS[id + ':' + names[i]] = { ep: names[i], status: x.h.status, code: x.e.code, msg: short(tokenless(x.e.msg), 160), casing: x.e.casing, ok: x.s.ok }; });
    const probs = []; rs.forEach((x, i) => { if (!x.s.ok) probs.push(`${names[i]}: ${x.s.problems.join(', ')}`); });
    const codes = new Set(rs.map(x => String(x.e.code))), msgs = new Set(rs.map(x => String(x.e.msg))), cas = new Set(rs.map(x => x.e.casing));
    if (codes.size > 1) probs.push('ErrorCode differs: ' + rs.map((x, i) => `${names[i]}=${x.e.code}`).join(', ')); if (msgs.size > 1) probs.push('ErrorMessage wording differs between endpoints'); if (cas.size > 1) probs.push('envelope casing differs: ' + rs.map((x, i) => `${names[i]}=${x.e.casing}`).join(', '));
    return { v: probs.length ? 'FAIL' : 'PASS', actual: rs.map((x, i) => `${names[i]}: ${errTxt(x.h)}`).join(' | ') + (probs.length ? '. Problems: ' + probs.join('; ') + '.' : '. All four return the same envelope, ErrorCode and wording.') };
  });
  await crossEndpoints('TC-AVAIL-NEG-25', { supplier: 'Galilio' }, 'supplier Galilio');
  await crossEndpoints('TC-AVAIL-NEG-26', { credentialsSelector: 'ZZZ' }, 'credentialsSelector ZZZ');

  // ---------------- AVAIL boundary ----------------
  await tc('TC-AVAIL-BND-01', async ctx => { const h = await av(ctx, 'Availability for today', baseBody({ searchCriteria: [leg('CAI', 'JED', 0)] })); const r = acceptOr4xx(h, j => ({ ok: true, msg: `${journeysOf(j)} journeys, departure day(s) ${depDates(j)}.` })); return { v: r.v, actual: r.actual, unknown: [`Availability for today's date: ${r.mode} (${h.status}).`] }; });
  await tc('TC-AVAIL-BND-02', async ctx => { const h = await av(ctx, 'Availability 365 days ahead', baseBody({ searchCriteria: [leg('CAI', 'JED', 365)] })); const r = acceptOr4xx(h, j => ({ ok: true, msg: `${journeysOf(j)} journeys.` })); return { v: r.v, actual: r.actual, unknown: [`Availability 365 days ahead: ${r.mode} (${h.status}${h.status === 200 ? ', ' + journeysOf(h.json) + ' journeys' : ''}).`] }; });
  await tc('TC-AVAIL-BND-03', async ctx => { const h = await av(ctx, 'Availability round trip with return on the outbound day', baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('JED', 'CAI', 30)] })); const r = acceptOr4xx(h, j => ({ ok: ODS(j).length === 2, msg: `${ODS(j).length} originDestinations, journeys [${ODS(j).map(o => (o.journeys || []).length)}].` })); return { v: r.v, actual: r.actual, unknown: [`Availability round trip with the same-day return: ${r.mode} (${h.status}).`] }; });
  await tc('TC-AVAIL-BND-04', async ctx => {
    const h = await av(ctx, 'Availability round trip with return (+30) before outbound (+37)', baseBody({ searchCriteria: [leg('CAI', 'JED', 37), leg('JED', 'CAI', 30)] }));
    if (h.status === 200) return { v: 'FAIL', actual: `HTTP 200 with ${journeysOf(h.json)} journeys — a return date before the outbound date was accepted.` };
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx rejection.' : s.problems.join('; ')}`, unknown: s.ok ? ['Availability return date before outbound date: ' + errTxt(h)] : [] };
  });
  await tc('TC-AVAIL-BND-05', async ctx => {
    const legs = [leg('CAI', 'JED', 37), leg('JED', 'CAI', 30), leg('CAI', 'JED', 33)]; const h = await av(ctx, 'Availability multi-city with dates +37, +30, +33', baseBody({ searchCriteria: legs }));
    const r = acceptOr4xx(h, j => { const o = ODS(j); const inOrder = o.length === 3 && o.every((x, i) => x.origin === legs[i].origin && x.destination === legs[i].destination && String(x.departureDate).slice(0, 10) === legs[i].date.slice(0, 10)); return { ok: inOrder, msg: `originDestinations ${o.map(x => `${x.origin}->${x.destination} ${String(x.departureDate).slice(0, 10)}`).join(', ')} — ${inOrder ? 'request order kept' : 'order or count differs from the request (re-ordered/dropped)'}.` }; });
    return { v: r.v, actual: r.actual, unknown: [`Availability multi-city with non-chronological legs: ${r.mode} (${h.status}).`] };
  });
  await tc('TC-AVAIL-BND-06', async ctx => {
    const L = [['CAI', 'JED', 30], ['JED', 'CAI', 32], ['CAI', 'JED', 34], ['JED', 'CAI', 36], ['CAI', 'JED', 38], ['JED', 'CAI', 40]]; let acc = 0; const rej = [];
    for (const n of [6, 4, 3, 2]) {
      const h = await av(ctx, `Availability with ${n} legs`, baseBody({ searchCriteria: L.slice(0, n).map(x => leg(...x)) }));
      if (h.status === 200 && ODS(h.json).length === n) { acc = n; break; }
      if (h.status >= 500 || h.ms > 60000) return { v: 'FAIL', actual: `${n} legs: ${errTxt(h)} in ${h.ms} ms — 5xx/timeout.` };
      const s = std4xx(h); rej.push(`${n} legs: ${errTxt(h)}${s.ok ? '' : ' [PROBLEMS: ' + s.problems.join(', ') + ']'}`); if (!s.ok) return { v: 'FAIL', actual: rej.join(' | ') };
    }
    return { v: acc ? 'PASS' : 'FAIL', actual: acc ? `Largest accepted leg count: ${acc} (tried 6, 4, 3, 2). Rejected cleanly: ${rej.join(' | ')}` : 'No leg count accepted (6, 4, 3, 2 all rejected): ' + rej.join(' | '), unknown: acc ? [`Availability accepts at most ${acc} searchCriteria legs; 3 or more are rejected with HTTP 400 NDC-INT-TEC-A0001 "SearchCriteria must contain 1 or 2 entries." (SPEC §2.1 listed multi-city 3+ as UNKNOWN).`] : [] };
  });
  await mut('TC-AVAIL-BND-07', 'Availability with origin "CA"', b => { b.searchCriteria[0].origin = 'CA'; });
  await mut('TC-AVAIL-BND-08', 'Availability with origin "CAIR"', b => { b.searchCriteria[0].origin = 'CAIR'; });

  // ---------------- AVAIL security ----------------
  await tc('TC-AVAIL-SEC-01', async ctx => { const h = await av(ctx, 'Availability without x-api-key', baseBody(), { headers: { 'x-api-key': null } }); const ok = (h.status === 401 || h.status === 403) && !(h.json && h.json.availabilityId); return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}${h.json ? ' ' + errTxt(h) : ''}; inventory returned: ${!!(h.json && h.json.availabilityId)}.` }; });
  await tc('TC-AVAIL-SEC-02', async ctx => { const h = await av(ctx, 'Availability with invalid x-api-key', baseBody(), { headers: { 'x-api-key': 'invalid-key' } }); const echo = (h.text || '').includes('invalid-key'); const ok = (h.status === 401 || h.status === 403) && !(h.json && h.json.availabilityId) && !echo; return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}${h.json ? ' ' + errTxt(h) : ''}; inventory returned: ${!!(h.json && h.json.availabilityId)}; key echoed: ${echo}.` }; });
  await tc('TC-AVAIL-SEC-03', async ctx => { const h = await av(ctx, 'Availability without Client-Id', baseBody(), { headers: { 'Client-Id': null } }); const acc = h.status === 200; return { v: acc ? 'FAIL' : (std4xx(h).ok || h.status === 401 || h.status === 403 ? 'PASS' : 'FAIL'), actual: acc ? `HTTP 200 — accepted without Client-Id (${withInv(h.json).msg}). Other V2 endpoints reject this (SPEC §1.5/§7.14).` : `${errTxt(h)} — rejected.`, unknown: [`Availability without a Client-Id header is ${acc ? 'accepted (HTTP 200)' : 'rejected (' + h.status + ')'}.`] }; });
  await tc('TC-AVAIL-SEC-04', async ctx => { const h = await av(ctx, "Availability with Client-Id 'Invalid-Client'", baseBody(), { headers: { 'Client-Id': 'Invalid-Client' } }); const acc = h.status === 200; return { v: acc ? 'FAIL' : (std4xx(h).ok || h.status === 401 || h.status === 403 ? 'PASS' : 'FAIL'), actual: acc ? `HTTP 200 — accepted with an invalid Client-Id (${withInv(h.json).msg}).` : `${errTxt(h)} — rejected.`, unknown: [`Availability with an invalid Client-Id is ${acc ? 'accepted (HTTP 200)' : 'rejected (' + h.status + ')'}.`] }; });
  await tc('TC-AVAIL-SEC-05', async ctx => {
    const h = await av(ctx, 'Availability with isDebug=true', baseBody({ isDebug: true })); const cs = credScan(h); const j = h.json || {};
    const sk = Object.keys(j).filter(k => /supplier(request|response)/i.test(k));
    const ok = h.status === 200 && !cs.pwd && !cs.pcc; return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}. Supplier request/response fields in the body: ${sk.length ? sk.join(', ') : 'none'}; credential-like content (password/WSSE/api key/username): ${cs.pwd}; PCC/branch identifier (TargetBranch) in supplierRequest: ${cs.pcc}; AuthorizedBy value: ${cs.authBy === undefined ? 'n/a' : (cs.authBy === '***' ? 'masked (***)' : 'NOT masked')}.`, unknown: [`Availability with isDebug=true ${sk.length ? 'adds ' + sk.join('/') : 'adds no supplier payload fields'}.`] };
  });
  await tc('TC-AVAIL-SEC-06', async ctx => { const r = await negStd(ctx, "Availability with origin \"CAI'; DROP TABLE x;--\"", (c, l) => { const b = baseBody(); b.searchCriteria[0].origin = "CAI'; DROP TABLE x;--"; return av(c, l, b); }, { extra: h => /DROP TABLE/i.test(h.text || '') ? 'injected string echoed in the response' : '' }); return r; });
  await tc('TC-AVAIL-SEC-07', async ctx => {
    const mk = async (label, over, raw) => { const h = await av(ctx, label, raw ? null : baseBody(over), raw ? { raw } : {}); return { h, s: std4xx(h), lk: leakOf(h) }; };
    const x = [await mk('malformed JSON', null, JSON.stringify(baseBody()).replace(/\}$/, ',}')), await mk('invalid supplier Galilio', { supplier: 'Galilio' }), await mk('invalid credentialsSelector ZZZ', { credentialsSelector: 'ZZZ' })];
    const bad = []; x.forEach((r, i) => { if (r.lk.raw) bad.push(`#${i + 1} raw supplier fragment`); if (r.lk.net) bad.push(`#${i + 1} internal/.NET detail`); if (/\bat \S+\(.*\) in |StackTrace/.test(r.h.text || '')) bad.push(`#${i + 1} stack trace`); });
    return { v: bad.length ? 'FAIL' : 'PASS', actual: `Inspected ${x.map((r, i) => `#${i + 1}: HTTP ${r.h.status}`).join(', ')} bodies for .NET type names, stack traces, raw supplier fragments and internal hosts: ${bad.length ? bad.join('; ') : 'none found'}.` };
  });

  // ---------------- AVAIL regression ----------------
  await tc('TC-AVAIL-REG-01', async ctx => {
    const a = S.A ? null : await av(ctx, 'Availability BASE (baseline capture)', baseBody()); const base = S.A || a.json; const first = !fs.existsSync(BL);
    if (first) fs.writeFileSync(BL, JSON.stringify(base)); const baseline = JSON.parse(fs.readFileSync(BL, 'utf8'));
    const b = await av(ctx, 'Availability BASE (comparison call)', baseBody()); const df = diffPaths(baseline, b.json || {});
    const ok = b.status === 200 && !df.removed.length && !df.retyped.length;
    return { v: ok ? 'PASS' : 'FAIL', actual: `Baseline ${first ? 'captured by this run (first Galileo Availability run - no earlier baseline exists), saved to Harness/Galileo/baseline_avail.json' : 'loaded from an earlier run'}; compared with a fresh response: removed key paths ${df.removed.length}, retyped ${df.retyped.length}, new key paths ${df.added.length}${df.added.length ? ' (' + df.added.slice(0, 4).join(', ') + ')' : ''}.` };
  });
  return S;
};
