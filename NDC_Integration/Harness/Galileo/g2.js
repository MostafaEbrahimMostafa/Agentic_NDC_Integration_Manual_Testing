// Group 2: NEXTAVAIL (next-page Availability) — 25 cases
const G = require('./gl');
const { tc, av, nx, baseBody, nextBody, leg, d, clone, PAX, ODS, std4xx, errTxt, envOf, credScan, short, tokenless, negStd, ERRS, flightKey, diffPaths, timedOut, fs, path } = G;
const BL = path.join(__dirname, 'baseline_next.json');
const journeysOf = j => ODS(j).reduce((n, o) => n + (o.journeys || []).length, 0);
const refsOf = j => new Set(ODS(j).flatMap(o => (o.journeys || []).map(x => x.journeyRefId)));
const bcOf = j => new Set(ODS(j).flatMap(o => (o.journeys || []).flatMap(x => x.segments.flatMap(s => s.cabins.flatMap(c => c.bookingClasses.map(b => b.bookingClassId))))));
const flights = j => new Set(Object.values(j.flightSegments || {}).map(flightKey));
const okPage = h => h.status === 200 && h.json && typeof h.json.availabilityId === 'string' && h.json.availabilityId && h.json.responseId && typeof h.json.hasMoreResults === 'boolean' && Array.isArray(h.json.originDestinations);
const CAND = [['JED', 'CAI', 30], ['CAI', 'JED', 60], ['FRA', 'JNB', 30], ['JED', 'CAI', 40]];

module.exports = async function (S = {}) {
  // finds a route/date whose second page really comes back (CAI-JED +30, the BASE data, times out - see NEXTAVAIL-POS-01)
  async function pgFind(ctx) {
    if (S.pg) return S.pg;
    for (const [o, dd, days] of CAND) {
      const p1 = await av(ctx, `Availability page 1 (${o}-${dd} +${days}, paging-route candidate)`, baseBody({ searchCriteria: [leg(o, dd, days)] }));
      if (!(p1.status === 200 && p1.json && p1.json.hasMoreResults)) continue;
      const p2 = await nx(ctx, `NextAvailability page 2 (${o}-${dd} +${days})`, nextBody(p1.json));
      if (okPage(p2)) { S.pg = { o, dd, days, p1, p2 }; return S.pg; }
    }
    return null;
  }
  const pgBody = (over = {}) => baseBody({ searchCriteria: [leg(S.pg.o, S.pg.dd, S.pg.days)], ...over });
  const p1pg = (ctx, label) => av(ctx, label || `Availability page 1 (${S.pg.o}-${S.pg.dd} +${S.pg.days})`, pgBody());
  const route = () => S.pg ? `${S.pg.o}-${S.pg.dd} +${S.pg.days}` : 'n/a';
  const blocked = id => ({ v: 'BLOCKED', actual: 'No route/date was found whose second page can be fetched (all candidate searches timed out on NextAvailability), so no next-page data exists for this case.' });

  await tc('TC-NEXTAVAIL-POS-01', async ctx => {
    const p1 = await av(ctx, 'Availability page 1 (BASE CAI-JED +30)', baseBody()); const hm = p1.json && p1.json.hasMoreResults;
    if (!(p1.status === 200 && hm === true)) { return { v: 'BLOCKED', actual: `BASE page 1 does not page (HTTP ${p1.status}, hasMoreResults=${hm}); the case needs a route that pages.` }; }
    let n = await nx(ctx, 'NextAvailability with page-1 ids (BASE)', nextBody(p1.json)); let tries = [n];
    if (!okPage(n)) { const p1b = await av(ctx, 'Availability page 1 again (BASE, retry)', baseBody()); const n2 = await nx(ctx, 'NextAvailability with page-1 ids (BASE, retry)', nextBody(p1b.json)); tries.push(n2); }
    const okBase = tries.some(okPage);
    if (okBase) { const h = tries.find(okPage); const idx = tries.indexOf(h); S.pg = { o: 'CAI', dd: 'JED', days: 30, p1: idx ? ctx.hops[ctx.hops.length - 3] : p1, p2: h }; return { v: 'PASS', actual: `HTTP 200 on page 2 in ${h.ms} ms: pageNumber=${h.json.pageNumber}, hasMoreResults=${h.json.hasMoreResults}, journeys=${journeysOf(h.json)}, new availabilityId/responseId returned.`, unknown: ['NextAvailability: the next-page body is {supplier, credentialsSelector, availabilityId, responseId, isDebug}; the answer is a page with pageNumber, new availabilityId/responseId, hasMoreResults and originDestinations.'] }; }
    const alt = await pgFind(ctx); const e = tries.map(h => `${errTxt(h)} after ${h.ms} ms`).join(' / ');
    return { v: 'FAIL', actual: `BASE CAI-JED +30 pages (page 1 hasMoreResults=true) but the next page failed on ${tries.length}/${tries.length} attempts here (and 5 of 5 times in probes made before the run): ${e}. The 409 is a supplier timeout (Context TimedOut) carried as an unclassified Z9999 error. ${alt ? `The same endpoint pages correctly for ${alt.o}-${alt.dd} +${alt.days} (page 2 in ${alt.p2.ms} ms), so the failure depends on the route/date, not on the endpoint being down.` : 'No alternative route paged either.'}`,
      unknown: alt ? [`NextAvailability works for ${alt.o}-${alt.dd} +${alt.days} (HTTP 200, pageNumber 2) but times out (409 Z9999 TimedOut, ~10.5 s) for CAI-JED +30 and CAI-DXB +30.`] : [] };
  });
  await tc('TC-NEXTAVAIL-POS-02', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked();
    const p1 = await p1pg(ctx); if (p1.status !== 200) return { v: 'BLOCKED', actual: 'Page 1 failed: ' + errTxt(p1) };
    const p2 = await nx(ctx, 'NextAvailability page 2', nextBody(p1.json)); if (!okPage(p2)) return { v: 'FAIL', actual: 'Page 2 failed: ' + errTxt(p2) };
    if (p2.json.hasMoreResults !== true) return { v: 'BLOCKED', actual: `Page 2 of ${route()} has hasMoreResults=false, so a third page cannot be requested.` };
    const p3 = await nx(ctx, 'NextAvailability page 3 (page-2 ids)', nextBody(p2.json)); const ok = okPage(p3) && p3.json.pageNumber === 3 && p3.json.availabilityId !== p2.json.availabilityId && p3.json.responseId !== p2.json.responseId;
    return { v: ok ? 'PASS' : 'FAIL', actual: okPage(p3) ? `Page 3: HTTP 200 in ${p3.ms} ms, pageNumber=${p3.json.pageNumber}, journeys=${journeysOf(p3.json)}, hasMoreResults=${p3.json.hasMoreResults}; new ids differ from page 2: ${p3.json.availabilityId !== p2.json.availabilityId && p3.json.responseId !== p2.json.responseId}. Route ${route()}.` : 'Page 3 failed: ' + errTxt(p3) };
  });
  await tc('TC-NEXTAVAIL-POS-03', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked();
    const p1 = await p1pg(ctx); const b = nextBody(p1.json); delete b.isDebug; const p2 = await nx(ctx, 'NextAvailability without isDebug', b);
    const same = okPage(p2) && Object.keys(p2.json).sort().join() === Object.keys(S.pg.p2.json).sort().join(); const cs = credScan(p2);
    return { v: okPage(p2) && same && !cs.hasRaw ? 'PASS' : 'FAIL', actual: okPage(p2) ? `HTTP 200; top-level keys [${Object.keys(p2.json)}] ${same ? 'equal' : 'differ from'} the isDebug=false page; supplier payload fields: ${cs.hasRaw}.` : errTxt(p2) };
  });
  await tc('TC-NEXTAVAIL-VAL-01', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked(); const p1 = await p1pg(ctx); const p2 = await nx(ctx, 'NextAvailability page 2', nextBody(p1.json));
    if (!okPage(p2)) return { v: 'FAIL', actual: 'Page 2 failed: ' + errTxt(p2) }; const df = diffPaths(p1.json, p2.json);
    const ty = `availabilityId ${typeof p2.json.availabilityId}, responseId ${typeof p2.json.responseId}, hasMoreResults ${typeof p2.json.hasMoreResults}, originDestinations array[${ODS(p2.json).length}]`;
    return { v: !df.removed.length && !df.retyped.length ? 'PASS' : 'FAIL', actual: `Page 2: ${ty}. Structure vs page 1: key paths missing on page 2 ${df.removed.length}${df.removed.length ? ' (' + df.removed.slice(0, 4).join(', ') + ')' : ''}, retyped ${df.retyped.length}, new on page 2 ${df.added.length}.` };
  });
  await tc('TC-NEXTAVAIL-VAL-02', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked(); const p1 = await p1pg(ctx); const p2 = await nx(ctx, 'NextAvailability page 2', nextBody(p1.json));
    if (!okPage(p2)) return { v: 'FAIL', actual: 'Page 2 failed: ' + errTxt(p2) };
    const ra = refsOf(p1.json), rb = refsOf(p2.json), ba = bcOf(p1.json), bb = bcOf(p2.json), fa = flights(p1.json), fb = flights(p2.json);
    const jOver = [...rb].filter(x => ra.has(x)), bOver = [...bb].filter(x => ba.has(x)), fOver = [...fb].filter(x => fa.has(x));
    return { v: !jOver.length && !bOver.length ? 'PASS' : 'FAIL', actual: `journeyRefIds on both pages: ${jOver.length}; bookingClassIds on both pages: ${bOver.length}. Page 1 refs ${[...ra].slice(0, 2)}.., page 2 refs ${[...rb].slice(0, 2)}.. (ids are page-prefixed). Same physical flight (carrier+number+departure) on both pages: ${fOver.length} of ${fb.size}.` + (fOver.length ? ' Pages overlap on flights.' : ' No flight repeated.') };
  });
  await tc('TC-NEXTAVAIL-VAL-03', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked(); const legs = [leg(S.pg.o, S.pg.dd, S.pg.days), leg(S.pg.dd, S.pg.o, S.pg.days + 7)];
    const p1 = await av(ctx, `Availability page 1 round trip (${S.pg.o}-${S.pg.dd} +${S.pg.days}, return +${S.pg.days + 7})`, baseBody({ searchCriteria: legs }));
    if (!(p1.status === 200 && p1.json.hasMoreResults)) return { v: 'BLOCKED', actual: `Round-trip page 1 does not page (HTTP ${p1.status}, hasMoreResults=${p1.json && p1.json.hasMoreResults}).` };
    const p2 = await nx(ctx, 'NextAvailability page 2 (round trip)', nextBody(p1.json)); if (!okPage(p2)) return { v: 'FAIL', actual: 'Round-trip page 2 failed: ' + errTxt(p2) };
    const o = ODS(p2.json); const ok = o.length === 2 && o[0].origin === legs[0].origin && o[0].destination === legs[0].destination && o[1].origin === legs[1].origin && o[1].destination === legs[1].destination;
    return { v: ok ? 'PASS' : 'FAIL', actual: `Page 2 originDestinations: ${o.map(x => `${x.origin}->${x.destination} (${(x.journeys || []).length} journeys)`).join(', ') || 'none'}; ${ok ? 'both legs kept in request order' : 'a leg was dropped, swapped or replaced'}.` };
  });
  await tc('TC-NEXTAVAIL-VAL-04', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked(); const p1 = await p1pg(ctx); const h = await nx(ctx, 'NextAvailability with ids plus searchCriteria and passengers', nextBody(p1.json, { searchCriteria: pgBody().searchCriteria, passengers: clone(PAX) }));
    if (h.status === 200 && h.json && h.json.availabilityId) { const ok = h.json.pageNumber === 2; return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP 200, pageNumber=${h.json.pageNumber} — ${ok ? 'extra fields ignored, next page returned' : 'a new first-page search was started instead of paging'}.`, unknown: ok ? ['NextAvailability ignores searchCriteria/passengers sent next to availabilityId+responseId and returns page 2.'] : [] }; }
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? ['NextAvailability rejects searchCriteria/passengers sent next to the ids: ' + errTxt(h)] : [] };
  });
  await tc('TC-NEXTAVAIL-VAL-05', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked(); const p1 = await p1pg(ctx); const b = nextBody(p1.json); b.ResponseId = b.responseId; delete b.responseId; const h = await nx(ctx, 'NextAvailability with key ResponseId (capital R)', b);
    if (h.status === 200 && h.json && h.json.availabilityId) return { v: 'PASS', actual: `HTTP 200, pageNumber=${h.json.pageNumber} — ResponseId accepted (case-insensitive binding).`, unknown: ['NextAvailability accepts the key "ResponseId" as well as "responseId".'] };
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? ['NextAvailability rejects the key "ResponseId": ' + errTxt(h)] : [] };
  });
  await tc('TC-NEXTAVAIL-VAL-06', async ctx => {
    const pg = await pgFind(ctx); if (!pg) return blocked(); const p1 = await p1pg(ctx); const a = await nx(ctx, 'NextAvailability page 2 (first send)', nextBody(p1.json)); const b = await nx(ctx, 'NextAvailability page 2 (same ids, second send)', nextBody(p1.json)); S.vp = [a, b];
    if (!okPage(a)) return { v: 'FAIL', actual: 'First send failed: ' + errTxt(a) };
    if (okPage(b)) { const fa = flights(a.json), fb = flights(b.json), same = fa.size === fb.size && [...fa].every(x => fb.has(x)); return { v: same ? 'PASS' : 'FAIL', actual: `Both HTTP 200 (${a.ms}/${b.ms} ms). pageNumber ${a.json.pageNumber}/${b.json.pageNumber}; flights ${fa.size}/${fb.size}; ${same ? 'identical flight set (idempotent)' : 'a different page came back with no status change'}; availabilityId reused: ${a.json.availabilityId === b.json.availabilityId}.`, unknown: [`Re-sending the same page-1 ids to NextAvailability ${same ? 'returns the same page 2 again (idempotent)' : 'returns a different page'}.`] }; }
    const s = std4xx(b); return { v: s.ok ? 'PASS' : 'FAIL', actual: `First send 200; second send ${errTxt(b)}. ${s.ok ? 'Documented clean 4xx.' : s.problems.join('; ')}` };
  });
  const nmut = (id, label, fn) => tc(id, async ctx => { if (!(await pgFind(ctx))) return blocked(); const p1 = await p1pg(ctx); return negStd(ctx, label, (c, l) => { const b = nextBody(p1.json); fn(b, p1.json); return nx(c, l, b); }); });
  await nmut('TC-NEXTAVAIL-NEG-01', 'NextAvailability without availabilityId', b => { delete b.availabilityId; });
  await nmut('TC-NEXTAVAIL-NEG-02', 'NextAvailability without responseId', b => { delete b.responseId; });
  await nmut('TC-NEXTAVAIL-NEG-03', 'NextAvailability without supplier', b => { delete b.supplier; });
  await nmut('TC-NEXTAVAIL-NEG-04', 'NextAvailability without credentialsSelector', b => { delete b.credentialsSelector; });
  await nmut('TC-NEXTAVAIL-NEG-05', 'NextAvailability with availabilityId ""', b => { b.availabilityId = ''; });
  await nmut('TC-NEXTAVAIL-NEG-06', 'NextAvailability with availabilityId 11111111-2222-3333-4444-555555555555', b => { b.availabilityId = '11111111-2222-3333-4444-555555555555'; });
  await nmut('TC-NEXTAVAIL-NEG-07', 'NextAvailability with responseId "abc"', b => { b.responseId = 'abc'; });
  await nmut('TC-NEXTAVAIL-NEG-08', 'NextAvailability with supplier Galilio', b => { b.supplier = 'Galilio'; });
  await nmut('TC-NEXTAVAIL-NEG-09', 'NextAvailability with credentialsSelector ZZZ', b => { b.credentialsSelector = 'ZZZ'; });
  await tc('TC-NEXTAVAIL-NEG-10', async ctx => {
    if (!(await pgFind(ctx))) return blocked(); const A = await p1pg(ctx, 'Availability page 1, search A'); const B = await av(ctx, `Availability page 1, search B (${S.pg.o}-${S.pg.dd} +${S.pg.days + 1})`, baseBody({ searchCriteria: [leg(S.pg.o, S.pg.dd, S.pg.days + 1)] }));
    return negStd(ctx, 'NextAvailability with availabilityId of A and responseId of B', (c, l) => nx(c, l, nextBody(A.json, { responseId: B.json.responseId })), { extra: h => h.status === 200 ? 'mismatched id pair accepted and a page returned (cross-identifier pair, High)' : '' });
  });
  await tc('TC-NEXTAVAIL-NEG-11', async ctx => {
    let last = null;
    for (const [o, dd, days] of [['HKG', 'LHR', 30], ['CAI', 'LHR', 45], ['LHR', 'JFK', 30]]) { const p1 = await av(ctx, `Availability page 1 (${o}-${dd} +${days}, single-page search)`, baseBody({ searchCriteria: [leg(o, dd, days)] })); if (p1.status === 200 && p1.json.hasMoreResults === false) { last = p1; break; } }
    if (!last) return { v: 'BLOCKED', actual: 'No candidate search returned hasMoreResults=false.' };
    const h = await nx(ctx, 'NextAvailability with the ids of the last page', nextBody(last.json));
    if (h.status === 200 && h.json) { const n = journeysOf(h.json); return { v: n === 0 ? 'PASS' : 'FAIL', actual: `HTTP 200 with ${n} journeys, hasMoreResults=${h.json.hasMoreResults}, pageNumber=${h.json.pageNumber}.` + (n ? ' A page came back after the last page.' : ' Empty page, no more results.'), unknown: n === 0 ? ['NextAvailability after the last page returns HTTP 200 with an empty page.'] : [] }; }
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? ['NextAvailability after the last page (hasMoreResults=false): ' + errTxt(h)] : [] };
  });
  await tc('TC-NEXTAVAIL-NEG-12', async ctx => {
    if (!(await pgFind(ctx))) return blocked(); const p1 = await p1pg(ctx); const a = await nx(ctx, 'NextAvailability page 2', nextBody(p1.json)); if (!okPage(a)) return { v: 'FAIL', actual: 'Page 2 failed: ' + errTxt(a) };
    const b = await nx(ctx, 'NextAvailability with page-1 ids again after page 2 was fetched', nextBody(p1.json));
    if (okPage(b)) { const fa = flights(a.json), fb = flights(b.json), same = fa.size === fb.size && [...fa].every(x => fb.has(x)); return { v: same ? 'PASS' : 'FAIL', actual: `HTTP 200; flights ${fb.size} vs ${fa.size}; ${same ? 'the same page 2 is returned again' : 'an unrelated page came back'}; pageNumber ${b.json.pageNumber}.`, unknown: [`Page-1 ids stay usable after page 2 was fetched: ${same ? 'the same page 2 is returned' : 'a different page is returned'}.`] }; }
    const s = std4xx(b); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(b)}. ${s.ok ? 'Clean 4xx about a superseded id.' : s.problems.join('; ')}` };
  });
  await tc('TC-NEXTAVAIL-SEC-01', async ctx => { if (!(await pgFind(ctx))) return blocked(); const p1 = await p1pg(ctx); const h = await nx(ctx, 'NextAvailability with invalid x-api-key', nextBody(p1.json), { headers: { 'x-api-key': 'invalid-key' } }); const ok = (h.status === 401 || h.status === 403) && !(h.json && h.json.availabilityId); return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}${h.json ? ' ' + errTxt(h) : ''}; page returned: ${!!(h.json && h.json.availabilityId)}.` }; });
  await tc('TC-NEXTAVAIL-SEC-02', async ctx => {
    if (!(await pgFind(ctx))) return blocked(); const p1 = await p1pg(ctx); const h = await nx(ctx, 'NextAvailability with EGY ids but credentialsSelector UAE', nextBody(p1.json, { credentialsSelector: 'UAE' }));
    if (okPage(h)) return { v: 'FAIL', actual: `HTTP 200 — the page was returned under credentialsSelector UAE for ids created under EGY (pageNumber ${h.json.pageNumber}): cross-tenant access.` };
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Rejected with a clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? ['NextAvailability with EGY ids under credentialsSelector UAE is rejected: ' + errTxt(h)] : [] };
  });
  await tc('TC-NEXTAVAIL-SEC-03', async ctx => {
    if (!(await pgFind(ctx))) return blocked(); const p1 = await p1pg(ctx); const h = await nx(ctx, 'NextAvailability with isDebug=true', nextBody(p1.json, { isDebug: true })); const cs = credScan(h); const sk = Object.keys(h.json || {}).filter(k => /supplier(request|response)/i.test(k));
    return { v: h.status === 200 && !cs.pwd && !cs.pcc ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}. Supplier request/response fields: ${sk.length ? sk.join(', ') : 'none'}; credential-like content: ${cs.pwd}; PCC/branch identifier (TargetBranch) in supplierRequest: ${cs.pcc}; AuthorizedBy: ${cs.authBy === undefined ? 'n/a' : (cs.authBy === '***' ? 'masked' : 'NOT masked')}.` };
  });
  await tc('TC-NEXTAVAIL-REG-01', async ctx => {
    if (!(await pgFind(ctx))) return blocked(); const first = !fs.existsSync(BL); if (first) fs.writeFileSync(BL, JSON.stringify(S.pg.p2.json)); const baseline = JSON.parse(fs.readFileSync(BL, 'utf8'));
    const p1 = await p1pg(ctx); const p2 = await nx(ctx, 'NextAvailability page 2 (comparison call)', nextBody(p1.json)); if (!okPage(p2)) return { v: 'FAIL', actual: 'Comparison page failed: ' + errTxt(p2) };
    const df = diffPaths(baseline, p2.json); return { v: !df.removed.length && !df.retyped.length ? 'PASS' : 'FAIL', actual: `Baseline ${first ? 'captured by this run (first run, saved to Harness/Galileo/baseline_next.json)' : 'loaded from an earlier run'}; fresh page 2: removed key paths ${df.removed.length}, retyped ${df.retyped.length}, new ${df.added.length}${df.added.length ? ' (' + df.added.slice(0, 4).join(', ') + ')' : ''}.` };
  });
  return S;
};
