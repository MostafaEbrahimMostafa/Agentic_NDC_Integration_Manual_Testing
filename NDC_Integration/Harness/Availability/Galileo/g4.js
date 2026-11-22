// Group 4: COLLECTION (4, Postman CLI + static checks) + FLOW-V2-GALAVAIL (6)
const G = require('../gl');
const { tc, av, nx, sel, fcq, baseBody, nextBody, selBody, fcBody, leg, d, clone, ODS, std4xx, errTxt, short, tokenless, negStd, pickMap, segInfo, flightKey, recon, chain, fs, path, now, BASE } = G;
const cp = require('child_process');
const ROOT = G.R.ROOT;
const COLL = path.join(ROOT, 'Postman_Collection/Collection_V2/NDC Integrations_Ancillary Galileo avilability Copy.postman_collection.json');
const SCRATCH = process.env.SCRATCH_DIR || path.join(G.OUT, 'tmp'); fs.mkdirSync(SCRATCH, { recursive: true });
const okSel = h => h && h.status === 200 && h.json && h.json.responseId && h.json.offerId;
const okFc = h => h && h.status === 200 && h.json && h.json.selectedOffer && h.json.selectedOffer.offerId && h.json.responseId;
const okPage = h => h.status === 200 && h.json && h.json.availabilityId && h.json.originDestinations;

function runCli(file, args) {
  const t0 = now(); const r = cp.spawnSync('postman', ['collection', 'run', file, ...args, '--disable-unicode'], { cwd: ROOT, encoding: 'utf8', timeout: 150000, maxBuffer: 1 << 28 }); const t1 = now();
  return { out: (r.stdout || '') + (r.stderr || ''), t0, t1, code: r.status };
}
const clean = s => String(s).replace(/[A-Za-z0-9+\/=_&-]{100,}/g, '<id>');
function sentBody(out) { // request body lines printed by --verbose after the "^ raw" marker
  const L = out.split(/\r?\n/); const i = L.findIndex(x => /\^ raw/.test(x)); if (i < 0) return null; const buf = []; for (let k = i + 1; k < L.length; k++) { if (/^\s*- /.test(L[k])) break; buf.push(L[k].replace(/^\s*\| ?/, '')); } try { return JSON.parse(buf.join('\n')); } catch (e) { return null; }
}

module.exports = async function (S = {}) {
  // ===================== COLLECTION =====================
  await tc('TC-COLLECTION-VAL-01', async ctx => {
    const r = runCli(COLL, ['--env-var', 'localUrl=' + BASE, '-i', 'CI_FlightAvailabilityRequest', '-i', 'CI_FlightNextAvailabilityRequest', '-i', 'CI_FlightSelectAvailabilityRequest', '-i', 'CI_FareConfirmRequest']);
    const names = ['Availability returns 200', 'Booking code Y found on page 1', 'SelectAvailability returns 200', 'SelectAvailability returns an offerId', 'FareConfirm returns 200', 'FareConfirm returns a selected offer'];
    const pass = names.filter(n => new RegExp('Pass\\s+' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(r.out)); const failed = (r.out.match(/\bFail\b[^\n]*/g) || []); const reqs = (r.out.match(/\|\s+requests\s+\|\s+(\d+)\s+\|\s+(\d+)/) || []); const asserts = (r.out.match(/\|\s+assertions\s+\|\s+(\d+)\s+\|\s+(\d+)/) || []);
    const reachedUpsell = /CI_Upselling|api\/v2\/FlightSearch\/Upselling/i.test(r.out); const ok = pass.length === 6 && !failed.length && !reachedUpsell;
    S.cliOut = r.out; return { v: ok ? 'PASS' : 'FAIL', req: `postman collection run "NDC Integrations_Ancillary Galileo avilability Copy" --env-var localUrl=<ne-4> -i CI_FlightAvailabilityRequest -i CI_FlightNextAvailabilityRequest -i CI_FlightSelectAvailabilityRequest -i CI_FareConfirmRequest`, resp: `${pass.length}/6 named assertions pass, ${failed.length} failed; requests executed ${reqs[1]} (failed ${reqs[2]}), assertions ${asserts[1]} (failed ${asserts[2]}).`,
      actual: `Run with {{localUrl}} overridden to ne-4 (the saved value is localhost, see VAL-02): requests executed ${reqs[1]} (Availability, SelectAvailability, FareConfirm — NextAvailability was skipped because Y was found on page 1), failed ${reqs[2]}; assertions ${asserts[1]}, failed ${asserts[2]}. Named assertions passed: ${pass.length}/6 [${pass.join('; ')}]. Run continued into Upselling: ${reachedUpsell}. Postman CLI notes: postman.setNextRequest is reported as deprecated (use pm.execution.setNextRequest); the run needs no login.` };
  });
  await tc('TC-COLLECTION-VAL-02', async ctx => {
    const c = JSON.parse(fs.readFileSync(COLL, 'utf8')); const v = Object.fromEntries((c.variable || []).filter(x => !/key/i.test(x.key)).map(x => [x.key, x.value])); const urls = [];
    (function w(items) { for (const i of items) { if (i.item) w(i.item); else if (/^(CI_FlightAvailabilityRequest|CI_FlightNextAvailabilityRequest|CI_FlightSelectAvailabilityRequest|CI_FareConfirmRequest)$/.test(i.name)) urls.push(`${i.name}: ${i.request.url.raw}`); } })(c.item);
    const r = runCli(COLL, ['-i', 'CI_FlightAvailabilityRequest']); const sent = (r.out.match(/POST (https?:\/\/\S+)/) || [])[1]; const ok = sent && sent.startsWith(BASE);
    return { v: ok ? 'PASS' : 'FAIL', req: 'Static read of the collection file + one CLI run of CI_FlightAvailabilityRequest without overriding {{localUrl}}', resp: `request URL resolved to ${sent || 'n/a'}`,
      actual: `As saved, the collection resolves the Availability/NextAvailability/SelectAvailability/FareConfirm requests (${urls.map(u => u.split(': ')[1]).join(', ')}) against {{localUrl}} = ${v.localUrl}; {{baseUrl}} = ${v.baseUrl} (the old ndc-supplier-integration host). Neither is the supplied host ${BASE}. A CLI run without an override sent POST ${sent || '(no request)'}${/ECONNREFUSED|errored|getaddrinfo/i.test(r.out) ? ' which errored (no listener on localhost)' : ''}. The tester must override {{localUrl}} before every run (SPEC §1.6 warns about stale hosts).` };
  });
  await tc('TC-COLLECTION-VAL-03', async ctx => {
    const one = runCli(COLL, ['--env-var', 'localUrl=' + BASE, '-i', 'CI_FlightAvailabilityRequest', '--verbose']); const b1 = sentBody(one.out); const d30 = d(30).slice(0, 10), d37 = d(37).slice(0, 10);
    // Postman CLI cannot override collection variables; use a scratch copy of the collection with tripType=RoundTrip and CHD_Count=0 (repo copy untouched)
    const c = JSON.parse(fs.readFileSync(COLL, 'utf8')); c.variable.forEach(x => { if (x.key === 'tripType') x.value = 'RoundTrip'; if (x.key === 'CHD_Count') x.value = '0'; }); const tmp = path.join(SCRATCH, 'galileo_roundtrip_copy.postman_collection.json'); fs.writeFileSync(tmp, JSON.stringify(c));
    const rt = runCli(tmp, ['--env-var', 'localUrl=' + BASE, '-i', 'CI_FlightAvailabilityRequest', '--verbose']); const b2 = sentBody(rt.out); fs.unlinkSync(tmp);
    const saved = fs.readFileSync(COLL, 'utf8').includes('"count": {{CHD_Count}}') || /\{\{CHD_Count\}\}/.test(fs.readFileSync(COLL, 'utf8'));
    const p1 = b1 && b1.passengers.map(p => p.passengerTypeCode + p.count).join(','), p2 = b2 && b2.passengers.map(p => p.passengerTypeCode + p.count).join(',');
    const okOne = b1 && b1.searchCriteria.length === 1 && b1.searchCriteria[0].date === d30 + 'T00:00:00Z' && !b1.passengers.some(p => p.passengerTypeCode === 'CHD') && !('availabilityId' in b1) && !('responseId' in b1);
    const okRt = b2 && b2.searchCriteria.length === 2 && b2.searchCriteria[1].origin === b2.searchCriteria[0].destination && b2.searchCriteria[1].destination === b2.searchCriteria[0].origin && b2.searchCriteria[1].date === d37 + 'T00:00:00Z';
    return { v: okOne && okRt && saved ? 'PASS' : 'FAIL', req: 'postman collection run ... -i CI_FlightAvailabilityRequest --verbose (one-way, then a scratch copy with tripType=RoundTrip and CHD_Count=0)', resp: `one-way body ${okOne ? 'as documented' : 'differs'}; round-trip body ${okRt ? 'as documented' : 'differs'}`,
      actual: `OneWay sent body: ${b1 ? b1.searchCriteria.map(l => `${l.origin}-${l.destination} ${l.date}`).join(' | ') : 'not parsed'}; passengers sent [${p1}] (the CHD entry with count 0 is stripped before sending); no availabilityId/responseId: ${b1 && !('availabilityId' in b1)}. RoundTrip sent body (scratch copy with tripType=RoundTrip, CHD_Count=0): ${b2 ? b2.searchCriteria.map(l => `${l.origin}-${l.destination} ${l.date}`).join(' | ') : 'not parsed'}; second leg swapped O/D with date today+37: ${okRt}. Saved collection body still uses the {{CHD_Count}} placeholder (unchanged): ${saved}.` };
  });
  await tc('TC-COLLECTION-VAL-04', async ctx => {
    const c = JSON.parse(fs.readFileSync(COLL, 'utf8')); const ex = [];
    (function w(items) { for (const i of items) { if (i.item) w(i.item); else if (/^(CI_FlightAvailabilityRequest|CI_FlightSelectAvailabilityRequest)$/.test(i.name)) (i.response || []).forEach(e => { let keys = []; try { keys = Object.keys(JSON.parse(e.body)); } catch (x) { } ex.push({ req: i.name, name: e.name, orig: e.originalRequest && e.originalRequest.url && e.originalRequest.url.raw, keys }); }); } })(c.item);
    const need = { CI_FlightAvailabilityRequest: ['availabilityId', 'responseId', 'hasMoreResults', 'originDestinations'], CI_FlightSelectAvailabilityRequest: ['responseId', 'offerId'] }; const bad = [];
    for (const e of ex) { const miss = need[e.req].filter(k => !e.keys.includes(k)); if (miss.length || !/Availability/.test(e.orig || '')) bad.push(`${e.req}: saved example "${e.name}" was captured from ${e.orig}, top-level keys [${e.keys.join(', ')}], missing [${miss.join(', ')}]`); }
    return { v: bad.length || !ex.length ? 'FAIL' : 'PASS', req: 'Static read of the saved examples in the collection file', resp: `${ex.length} saved examples checked`, actual: ex.length ? (bad.length ? 'Stale examples: ' + bad.join(' || ') + '. The live Availability response has availabilityId/responseId/hasMoreResults/originDestinations and the SelectAvailability response responseId/offerId (captured in this run).' : 'Saved examples carry the documented fields.') : 'No saved examples found.' };
  });

  // ===================== FLOWS =====================
  const validate = (c, counts) => { const f = c.fc; if (!okFc(f)) return 'FareConfirm failed'; const o = f.json.selectedOffer; const probs = []; const r = recon(f.json, counts); if (!r.ok) probs.push('reconciliation: ' + r.msgs.join('; '));
    const want = c.pm.chosen.flatMap(x => x.journey.segments.map(s => flightKey(segInfo(c.p1.json, s.segmentRefId)))); const got = (o.offerJourneys || []).flatMap(r => f.json.journeys[r].segmentRefIds.map(s => flightKey(f.json.flightSegments[s])));
    if (JSON.stringify(want) !== JSON.stringify(got)) probs.push(`flights differ: selected ${want} vs offer ${got}`); const rbd = [...new Set((o.passengerFareBreakdown || []).flatMap(p => (p.segmentDetails || []).map(s => s.rbd)))]; if (rbd.length !== 1 || rbd[0] !== 'Y') probs.push('rbd [' + rbd + '] != Y');
    const types = (o.passengerFareBreakdown || []).map(p => p.passengerTypeCode).sort().join(','); if (types !== 'ADT,INF') probs.push('priced passenger types [' + types + '] != ADT,INF'); return probs.join('; '); };
  const flow = (id, o) => tc(id, async ctx => {
    const c = await chain(ctx, { body: o.body, p1label: o.p1label }); const names = ['Availability', 'SelectAvailability', 'FareConfirm'];
    const st = [c.p1, c.sel, c.fc]; let broke = st.findIndex(x => !x || x.status !== 200);
    if (c.p1 && c.p1.status !== 200) { const s = std4xx(c.p1); return o.rejectOk ? { v: s.ok ? 'PASS' : 'FAIL', actual: `Rejected at hop 1 (Availability): ${errTxt(c.p1)}. ${s.ok ? 'Documented clean rejection, no later hop attempted.' : s.problems.join('; ')}`, unknown: s.ok ? [`Multi-city flow: rejected at hop 1 (Availability): ${errTxt(c.p1)}`] : [] } : { v: 'FAIL', actual: 'Hop 1 Availability failed: ' + errTxt(c.p1) }; }
    if (c.pm && c.pm.missing.length) return { v: 'BLOCKED', actual: 'No journey with Y on every segment on: ' + c.pm.missing.join(', ') };
    if (broke >= 0) return { v: 'FAIL', actual: `Hop ${broke + 1} (${names[broke]}) failed: ${st[broke] ? errTxt(st[broke]) : 'not reached'}.` };
    const p = validate(c, { ADT: 2, INF: 1 }); c.p1.act = 'ids produced'; return { v: p ? 'FAIL' : 'PASS', actual: `Availability ${c.p1.ms} ms -> (NextAvailability not needed: Y found on page 1) -> SelectAvailability ${c.sel.ms} ms -> FareConfirm ${c.fc.ms} ms, every hop HTTP 200 with its ids non-empty. ${p ? 'Validation problems: ' + p : 'Offer flights and RBD (Y) match the selection, priced mix is ADT+INF, taxes/base/total reconcile (total ' + c.fc.json.selectedOffer.priceDetails.totalAmount.amount + ' ' + c.fc.json.selectedOffer.priceDetails.totalAmount.currency + ').'}` };
  });
  await flow('FLOW-V2-GALAVAIL-01', {});
  await flow('FLOW-V2-GALAVAIL-02', { body: baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('JED', 'CAI', 37)] }), p1label: 'Availability page 1 round trip' });
  await flow('FLOW-V2-GALAVAIL-03', { body: baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('JED', 'CAI', 33), leg('CAI', 'JED', 37)] }), p1label: 'Availability page 1 multi-city (3 legs)', rejectOk: true });
  await tc('FLOW-V2-GALAVAIL-01-NEGHOP2', async ctx => {
    const route = [leg('JED', 'CAI', 30)]; const A = await av(ctx, 'Availability search A (JED-CAI +30)', baseBody({ searchCriteria: route })); const B = await av(ctx, 'Availability search B (JED-CAI +30)', baseBody({ searchCriteria: route }));
    if (!okPage(A) || !okPage(B)) return { v: 'BLOCKED', actual: 'Could not create two searches.' };
    return negStd(ctx, 'NextAvailability with availabilityId of A and responseId of B', (c, l) => nx(c, l, nextBody(A.json, { responseId: B.json.responseId })), { extra: h => h.status === 200 ? 'mismatched ids accepted and a page returned' : '' });
  });
  await tc('FLOW-V2-GALAVAIL-01-NEGHOP3', async ctx => {
    const c = await chain(ctx, { until: 'p1' }); const A = pickMap(c.p1.json, 'Y', { skip: 0 }), B = pickMap(c.p1.json, 'Y', { skip: 1 }); if (!A.chosen[0] || !B.chosen[0]) return { v: 'BLOCKED', actual: 'Fewer than two Y journeys.' };
    const ja = A.chosen[0].journey, jb = B.chosen[0].journey; const foreign = B.map[jb.journeyRefId][jb.segments[0].segmentRefId][0];
    return negStd(ctx, `SelectAvailability with a bookingClassId taken from segment ${jb.segments[0].segmentRefId} under ${ja.segments[0].segmentRefId}`, (cc, l) => sel(cc, l, selBody(c.p1.json, { [ja.journeyRefId]: { [ja.segments[0].segmentRefId]: [foreign] } })), { extra: h => h.status === 200 ? 'foreign bookingClassId accepted; an offer was returned' : '' });
  });
  await tc('FLOW-V2-GALAVAIL-01-NEGHOP4', async ctx => {
    const c = await chain(ctx, { until: 'sel' }); if (!c.sel || !okSel(c.sel)) return { v: 'BLOCKED', actual: 'No SelectAvailability offer.' };
    return negStd(ctx, 'FareConfirm with the availability responseId as ResponseId', (cc, l) => fcq(cc, l, fcBody(c.sel.json, { ResponseId: c.p1.json.responseId })), { extra: h => h.status === 200 ? 'availability responseId accepted by FareConfirm' : '' });
  });
  return S;
};
