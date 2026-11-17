// Group 3: SELECTAVAIL (27) + FARECONFIRM (14)
const G = require('./gl');
const { tc, av, nx, sel, fcq, baseBody, nextBody, selBody, fcBody, leg, d, clone, PAX, ODS, std4xx, errTxt, envOf, credScan, short, tokenless, negStd, ERRS, flightKey, diffPaths, recon, literalNull, nullFields, pickMap, segInfo, chain, timedOut, fs, path } = G;
const BLS = path.join(__dirname, 'baseline_select.json'), BLF = path.join(__dirname, 'baseline_fareconfirm.json');
const okSel = h => h.status === 200 && h.json && typeof h.json.responseId === 'string' && h.json.responseId && typeof h.json.offerId === 'string' && h.json.offerId;
const okFc = h => h.status === 200 && h.json && h.json.selectedOffer && typeof h.json.selectedOffer.offerId === 'string' && h.json.selectedOffer.offerId && typeof h.json.responseId === 'string' && h.json.responseId;
const okPage = h => h.status === 200 && h.json && h.json.availabilityId && h.json.originDestinations;
const RT = () => baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('JED', 'CAI', 37)] });
const FRA = () => baseBody({ searchCriteria: [leg('FRA', 'JNB', 30)] });
const CAND = [['JED', 'CAI', 30], ['CAI', 'JED', 60], ['FRA', 'JNB', 30], ['JED', 'CAI', 40]];

module.exports = async function (S = {}) {
  async function pg2(ctx) { // a page-1 + page-2 pair from a route whose second page works (one retry on a supplier timeout)
    for (const [o, dd, days] of CAND) {
      const p1 = await av(ctx, `Availability page 1 (${o}-${dd} +${days})`, baseBody({ searchCriteria: [leg(o, dd, days)] })); if (!(p1.status === 200 && p1.json.hasMoreResults)) continue;
      let p2 = await nx(ctx, `NextAvailability page 2 (${o}-${dd} +${days})`, nextBody(p1.json)); if (!okPage(p2) && timedOut(p2)) p2 = await nx(ctx, `NextAvailability page 2 (retry)`, nextBody(p1.json));
      if (okPage(p2)) return { p1, p2 };
    } return null;
  }
  const bcid = (map, j, s) => map[j][s][0];

  // ===================== SelectAvailability positive =====================
  await tc('TC-SELECTAVAIL-POS-01', async ctx => {
    const c = await chain(ctx, { until: 'sel' }); if (!c.sel) return { v: 'BLOCKED', actual: 'No Y-bookable journey: ' + (c.p1 ? c.p1.response_summary : '') };
    S.sel1 = c.sel.json; const ch = c.pm.chosen[0].journey; const ok = okSel(c.sel);
    return { v: ok ? 'PASS' : 'FAIL', actual: ok ? `HTTP 200 in ${c.sel.ms} ms; responseId and offerId are non-empty strings (offerId length ${c.sel.json.offerId.length}, opaque token). Selected journey ${ch.journeyRefId} (${ch.segments.length} segment, bookingCode Y).` : errTxt(c.sel),
      unknown: ['SelectAvailability: body {supplier, credentialsSelector, availabilityId, responseId, bookingClassIds{journeyRefId:{segmentRefId:[bookingClassId]}}} returns HTTP 200 {responseId, supplier, offerId}; offerId is an opaque token ("<guid>&<base64>"), not a GUID.'] };
  });
  await tc('TC-SELECTAVAIL-POS-02', async ctx => {
    const c = await chain(ctx, { until: 'sel', body: RT() }); if (!c.pm) return { v: 'BLOCKED', actual: 'Round-trip Availability failed: ' + (c.p1 ? errTxt(c.p1) : '') }; if (c.pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey on: ' + c.pm.missing.join(', ') };
    S.selRT = c.sel; const ok = c.sel && okSel(c.sel);
    return { v: ok ? 'PASS' : 'FAIL', actual: ok ? `HTTP 200; one journey per leg selected (${Object.keys(c.pm.map).join(', ')}); responseId and offerId non-empty.` : errTxt(c.sel) };
  });
  await tc('TC-SELECTAVAIL-POS-03', async ctx => {
    const legs = [leg('CAI', 'JED', 30), leg('JED', 'CAI', 33), leg('CAI', 'JED', 37)]; const h = await av(ctx, 'Availability multi-city (3 legs) — prerequisite', baseBody({ searchCriteria: legs }));
    if (h.status === 200) return { v: 'BLOCKED', actual: 'Multi-city Availability was accepted this time; the multi-city selection was not built in this run.' };
    return { v: 'BLOCKED', actual: `Multi-city availability itself is rejected, so there is nothing to select: ${errTxt(h)}.` };
  });
  await tc('TC-SELECTAVAIL-POS-04', async ctx => {
    const p = await pg2(ctx); if (!p) return { v: 'BLOCKED', actual: 'No route whose page 2 can be fetched (NextAvailability timed out on every candidate).' };
    const pm = pickMap(p.p2.json); if (pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey on page 2.' };
    const s = await sel(ctx, 'SelectAvailability with page-2 ids and a page-2 journey', selBody(p.p2.json, pm.map)); const ok = okSel(s);
    return { v: ok ? 'PASS' : 'FAIL', actual: ok ? `HTTP 200; offer built from journey ${pm.chosen[0].journey.journeyRefId} (page 2); responseId and offerId non-empty.` : errTxt(s) };
  });
  await tc('TC-SELECTAVAIL-POS-05', async ctx => {
    const c = await chain(ctx, { until: 'sel', body: FRA(), pick: { connecting: true }, p1label: 'Availability page 1 (FRA-JNB +30)' }); if (!c.pm || c.pm.missing.length) return { v: 'BLOCKED', actual: 'No connecting journey (2+ segments) with Y on every segment in the FRA-JNB sample: ' + (c.p1 ? c.p1.response_summary : '') };
    const jn = c.pm.chosen[0].journey; const ok = c.sel && okSel(c.sel);
    return { v: ok ? 'PASS' : 'FAIL', actual: ok ? `HTTP 200; connecting journey ${jn.journeyRefId} (${jn.segments.length} segments, all mapped to Y); responseId and offerId non-empty.` : (c.sel ? errTxt(c.sel) : 'no select') };
  });

  // ===================== SelectAvailability validation =====================
  await tc('TC-SELECTAVAIL-VAL-01', async ctx => {
    const c = await chain(ctx, { until: 'sel' }); if (!c.sel) return { v: 'BLOCKED', actual: 'No selection could be made.' }; const j = c.sel.json;
    return { v: okSel(c.sel) ? 'PASS' : 'FAIL', actual: `HTTP ${c.sel.status}; responseId ${typeof j.responseId} (${j.responseId ? 'non-empty' : 'empty'}), offerId ${typeof j.offerId} (length ${String(j.offerId).length}). responseId differs from the availability responseId sent: ${j.responseId !== c.p1.json.responseId}. Other keys: ${Object.keys(j).filter(k => !['responseId', 'offerId'].includes(k)).join(', ') || 'none'}.` };
  });
  await tc('TC-SELECTAVAIL-VAL-02', async ctx => {
    const c = await chain(ctx, { until: 'sel' }); if (!c.sel) return { v: 'BLOCKED', actual: 'No selection could be made.' }; const j = c.sel.json; const ln = literalNull(j), nf = nullFields(j);
    return { v: c.sel.status === 200 && c.sel.json && !ln.length ? 'PASS' : 'FAIL', actual: `HTTP ${c.sel.status}, valid JSON, keys [${Object.keys(j)}]. Null fields: ${nf.join(', ') || 'none'}. Literal 'null'/'None' strings: ${ln.length ? ln.join(', ') : 'none'}.` };
  });
  await tc('TC-SELECTAVAIL-VAL-03', async ctx => {
    const c = await chain(ctx, { until: 'p1' }); if (!c.pm || c.pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey.' };
    const b = selBody(c.p1.json, c.pm.map); const r1 = await sel(ctx, 'SelectAvailability (first send)', b); const r2 = await sel(ctx, 'SelectAvailability (same body, second send)', b); if (!okSel(r1)) return { v: 'FAIL', actual: 'First send failed: ' + errTxt(r1) };
    if (okSel(r2)) { const f = await fcq(ctx, 'FareConfirm with the first send\'s ids (after the second send)', fcBody(r1.json)); const ok = okFc(f); return { v: ok ? 'PASS' : 'FAIL', actual: `Both sends HTTP 200 (offerId ${r1.json.offerId === r2.json.offerId ? 'identical' : 'different'}, responseId ${r1.json.responseId === r2.json.responseId ? 'identical' : 'different'}). FareConfirm with the first send's ids after the second send: ${ok ? 'HTTP 200' : errTxt(f)}.`, unknown: [`Repeating the same SelectAvailability returns a ${r1.json.offerId === r2.json.offerId ? 'identical' : 'new'} offerId; the first offer ${ok ? 'still works' : 'stops working'} in FareConfirm.`] }; }
    const s = std4xx(r2); return { v: s.ok ? 'PASS' : 'FAIL', actual: `First send 200; second send ${errTxt(r2)}. ${s.ok ? 'Documented 4xx.' : s.problems.join('; ')}` };
  });

  // ===================== SelectAvailability negative =====================
  const smut = (id, label, fn, o = {}) => tc(id, async ctx => {
    const c = await chain(ctx, { until: 'p1', body: o.body, pick: o.pick, p1label: o.p1label }); if (!c.pm || c.pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey to build the selection from: ' + (c.p1 ? c.p1.response_summary : '') };
    const r = await negStd(ctx, label, (cc, l) => { const b = selBody(c.p1.json, clone(c.pm.map)); fn(b, c); return sel(cc, l, b); }, { extra: o.extra }); return r;
  });
  const first = c => { const j = Object.keys(c.pm.map)[0]; const s = Object.keys(c.pm.map[j])[0]; return { j, s, b: c.pm.map[j][s][0] }; };
  await smut('TC-SELECTAVAIL-NEG-01', 'SelectAvailability without availabilityId', b => { delete b.availabilityId; });
  await smut('TC-SELECTAVAIL-NEG-02', 'SelectAvailability without responseId', b => { delete b.responseId; });
  await smut('TC-SELECTAVAIL-NEG-03', 'SelectAvailability without bookingClassIds', b => { delete b.bookingClassIds; });
  await smut('TC-SELECTAVAIL-NEG-04', 'SelectAvailability without supplier', b => { delete b.supplier; });
  await smut('TC-SELECTAVAIL-NEG-05', 'SelectAvailability without credentialsSelector', b => { delete b.credentialsSelector; });
  await smut('TC-SELECTAVAIL-NEG-06', 'SelectAvailability with bookingClassIds {}', b => { b.bookingClassIds = {}; });
  await smut('TC-SELECTAVAIL-NEG-07', 'SelectAvailability with a journey that has no segments', (b, c) => { b.bookingClassIds = { [first(c).j]: {} }; });
  await smut('TC-SELECTAVAIL-NEG-08', 'SelectAvailability with a segment whose bookingClassId array is empty', (b, c) => { const f = first(c); b.bookingClassIds = { [f.j]: { [f.s]: [] } }; });
  await smut('TC-SELECTAVAIL-NEG-09', 'SelectAvailability with unknown journeyRefId P1-J999', (b, c) => { const f = first(c); b.bookingClassIds = { 'P1-J999': { [f.s]: [f.b] } }; });
  await smut('TC-SELECTAVAIL-NEG-10', 'SelectAvailability with unknown segmentRefId P1-S999 under a valid journey', (b, c) => { const f = first(c); b.bookingClassIds = { [f.j]: { 'P1-S999': [f.b] } }; });
  await smut('TC-SELECTAVAIL-NEG-11', 'SelectAvailability with an unknown bookingClassId', (b, c) => { const f = first(c); b.bookingClassIds = { [f.j]: { [f.s]: ['P1-B99&notARealBookingClassId'] } }; });
  await tc('TC-SELECTAVAIL-NEG-12', async ctx => {
    const c = await chain(ctx, { until: 'p1' }); const A = pickMap(c.p1.json, 'Y', { skip: 0 }), B = pickMap(c.p1.json, 'Y', { skip: 1 }); if (!A.chosen[0] || !B.chosen[0]) return { v: 'BLOCKED', actual: 'Fewer than two Y journeys.' };
    const ja = A.chosen[0].journey, jb = B.chosen[0].journey; const foreign = B.map[jb.journeyRefId][jb.segments[0].segmentRefId][0];
    return negStd(ctx, `SelectAvailability with ${jb.segments[0].segmentRefId}'s bookingClassId under segment ${ja.segments[0].segmentRefId}`, (cc, l) => sel(cc, l, selBody(c.p1.json, { [ja.journeyRefId]: { [ja.segments[0].segmentRefId]: [foreign] } })), { extra: h => h.status === 200 ? 'a bookingClassId of another segment was accepted for this segment' : '' });
  });
  await smut('TC-SELECTAVAIL-NEG-13', 'SelectAvailability with only the first segment of a connecting journey', (b, c) => { const j = Object.keys(c.pm.map)[0]; const s0 = Object.keys(c.pm.map[j])[0]; b.bookingClassIds = { [j]: { [s0]: c.pm.map[j][s0] } }; }, { body: FRA(), pick: { connecting: true }, p1label: 'Availability page 1 (FRA-JNB +30)', extra: h => h.status === 200 ? 'partial connecting journey accepted' : '' });
  await smut('TC-SELECTAVAIL-NEG-14', 'SelectAvailability for a round trip with only the outbound journey', (b, c) => { const j = Object.keys(c.pm.map)[0]; b.bookingClassIds = { [j]: c.pm.map[j] }; }, { body: RT(), p1label: 'Availability page 1 round trip', extra: h => h.status === 200 ? 'one-leg selection accepted for a two-leg search' : '' });
  await smut('TC-SELECTAVAIL-NEG-15', 'SelectAvailability with bookingClassIds as a JSON string', b => { b.bookingClassIds = JSON.stringify(b.bookingClassIds); });
  await smut('TC-SELECTAVAIL-NEG-16', 'SelectAvailability with a numeric bookingClassId', (b, c) => { const f = first(c); b.bookingClassIds = { [f.j]: { [f.s]: [12345] } }; });
  await smut('TC-SELECTAVAIL-NEG-17', 'SelectAvailability with supplier Galilio', b => { b.supplier = 'Galilio'; });
  await smut('TC-SELECTAVAIL-NEG-18', 'SelectAvailability with credentialsSelector ZZZ', b => { b.credentialsSelector = 'ZZZ'; });
  await tc('TC-SELECTAVAIL-NEG-19', async ctx => {
    const A = await av(ctx, 'Availability page 1, search A', baseBody()); const B = await av(ctx, 'Availability page 1, search B (+31)', baseBody({ searchCriteria: [leg('CAI', 'JED', 31)] })); const pm = pickMap(A.json);
    return negStd(ctx, 'SelectAvailability with availabilityId of A and responseId of B', (cc, l) => sel(cc, l, selBody(A.json, pm.map, { responseId: B.json.responseId })), { extra: h => h.status === 200 ? 'mismatched id pair accepted and an offer returned (cross-identifier pair, High)' : '' });
  });
  await tc('TC-SELECTAVAIL-NEG-20', async ctx => {
    const p = await pg2(ctx); if (!p) return { v: 'BLOCKED', actual: 'No route whose page 2 can be fetched.' }; const pm = pickMap(p.p1.json); if (pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey on page 1.' };
    const h = await sel(ctx, 'SelectAvailability with page-1 ids and a page-1 journey after page 2 was fetched', selBody(p.p1.json, pm.map));
    if (okSel(h)) return { v: 'PASS', actual: 'HTTP 200 — page-1 ids stay selectable after a newer page was fetched.', unknown: ['After NextAvailability page 2 was fetched, the page-1 availabilityId/responseId can still be used in SelectAvailability (HTTP 200).'] };
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx about a superseded id.' : s.problems.join('; ')}`, unknown: s.ok ? ['After a newer page was fetched, page-1 ids are rejected by SelectAvailability: ' + errTxt(h)] : [] };
  });

  // ===================== SelectAvailability security / regression =====================
  await tc('TC-SELECTAVAIL-SEC-01', async ctx => { const c = await chain(ctx, { until: 'p1' }); if (!c.pm || c.pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey.' }; const h = await sel(ctx, 'SelectAvailability with invalid x-api-key', selBody(c.p1.json, c.pm.map), { headers: { 'x-api-key': 'invalid-key' } }); const ok = (h.status === 401 || h.status === 403) && !(h.json && h.json.offerId); return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP ${h.status}${h.json ? ' ' + errTxt(h) : ''}; offer returned: ${!!(h.json && h.json.offerId)}.` }; });
  await tc('TC-SELECTAVAIL-SEC-02', async ctx => {
    const c = await chain(ctx, { until: 'p1' }); if (!c.pm || c.pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey.' }; const h = await sel(ctx, 'SelectAvailability with EGY ids but credentialsSelector UAE', selBody(c.p1.json, c.pm.map, { credentialsSelector: 'UAE' }));
    if (okSel(h)) return { v: 'FAIL', actual: 'HTTP 200 — an offer was returned under credentialsSelector UAE for ids created under EGY: cross-tenant access.' };
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Rejected with a clean 4xx.' : s.problems.join('; ')}` };
  });
  await tc('TC-SELECTAVAIL-SEC-03', async ctx => {
    const c = await chain(ctx, { until: 'p1' }); if (!c.pm || c.pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey.' }; const f = first(c);
    return negStd(ctx, "SelectAvailability with injection string as bookingClassId", (cc, l) => sel(cc, l, selBody(c.p1.json, { [f.j]: { [f.s]: ["x'; DROP TABLE y;--"] } })), { extra: h => /DROP TABLE/i.test(h.text || '') ? 'injected string echoed in the response' : '' });
  });
  await tc('TC-SELECTAVAIL-REG-01', async ctx => {
    const c = await chain(ctx, { until: 'sel' }); if (!c.sel || !okSel(c.sel)) return { v: 'BLOCKED', actual: 'No selection response to compare.' };
    const firstRun = !fs.existsSync(BLS); if (firstRun) fs.writeFileSync(BLS, JSON.stringify(S.sel1 || c.sel.json)); const base = JSON.parse(fs.readFileSync(BLS, 'utf8')); const df = diffPaths(base, c.sel.json);
    return { v: !df.removed.length && !df.retyped.length ? 'PASS' : 'FAIL', actual: `Baseline ${firstRun ? 'captured by this run (first run, Harness/Galileo/baseline_select.json)' : 'loaded from an earlier run'}; fresh response: removed key paths ${df.removed.length}, retyped ${df.retyped.length}, new ${df.added.length}. Keys: [${Object.keys(c.sel.json)}].` };
  });

  // ===================== FareConfirm =====================
  const fcOK = async (ctx, o) => { const c = await chain(ctx, o); if (!c.sel || !okSel(c.sel)) return { c, bad: { v: 'BLOCKED', actual: 'No SelectAvailability offer to confirm: ' + (c.sel ? errTxt(c.sel) : c.p1 ? c.p1.response_summary : 'no search') } }; return { c }; };
  await tc('TC-FARECONFIRM-INT-01', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const f = c.fc; S.fc1 = f.json; S.fcChain = c; const ok = okFc(f);
    return { v: ok ? 'PASS' : 'FAIL', actual: ok ? `HTTP 200 in ${f.ms} ms; selectedOffer.offerId non-empty (length ${f.json.selectedOffer.offerId.length}), responseId non-empty. Top-level keys: ${Object.keys(f.json).join(', ')}.` : errTxt(f),
      unknown: ok ? ['FareConfirm (v2) accepts the SelectAvailability pair: ResponseId = SelectAvailability responseId, selectedOfferId = SelectAvailability offerId, and returns the Search-shaped offer (journeys, flightSegments, priceClasses, baggageDetails, selectedOffer).'] : [] };
  });
  await tc('TC-FARECONFIRM-INT-02', async ctx => {
    const { c, bad } = await fcOK(ctx, { body: RT(), p1label: 'Availability page 1 round trip' }); if (bad) return bad; const f = c.fc; if (!okFc(f)) return { v: 'FAIL', actual: errTxt(f) };
    const o = f.json.selectedOffer, js = o.offerJourneys || []; const jd = js.map(r => f.json.journeys[r]); const ok = js.length === 2 && jd[0] && jd[1] && jd[0].origin === 'CAI' && jd[0].destination === 'JED' && jd[1].origin === 'JED' && jd[1].destination === 'CAI';
    return { v: ok ? 'PASS' : 'FAIL', actual: `HTTP 200; selectedOffer.offerJourneys=${js.length}: ${jd.map(x => x && `${x.origin}->${x.destination}`).join(', ')}; offerId non-empty.` };
  });
  await tc('TC-FARECONFIRM-INT-03', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const f = c.fc; if (!okFc(f)) return { v: 'FAIL', actual: errTxt(f) };
    const sel1 = c.pm.chosen[0].journey; const want = sel1.segments.map(s => flightKey(segInfo(c.p1.json, s.segmentRefId))); const o = f.json.selectedOffer;
    const got = (o.offerJourneys || []).flatMap(r => f.json.journeys[r].segmentRefIds.map(s => flightKey(f.json.flightSegments[s]))); const rbds = [...new Set((o.passengerFareBreakdown || []).flatMap(p => (p.segmentDetails || []).map(s => s.rbd)))];
    const ok = JSON.stringify(want) === JSON.stringify(got) && rbds.length === 1 && rbds[0] === 'Y';
    return { v: ok ? 'PASS' : 'FAIL', actual: `Selected ${want.join(' + ')}; FareConfirm offer has ${got.join(' + ')}; rbd values in the offer [${rbds}] (selected bookingCode Y). ${ok ? 'Same flights, same order, RBD Y.' : 'Mismatch.'}` };
  });
  await tc('TC-FARECONFIRM-INT-04', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const f = c.fc; if (!okFc(f)) return { v: 'FAIL', actual: errTxt(f) };
    const pb = f.json.selectedOffer.passengerFareBreakdown || []; const types = pb.map(p => p.passengerTypeCode); const r = recon(f.json); const adt = pb.find(p => p.passengerTypeCode === 'ADT'), inf = pb.find(p => p.passengerTypeCode === 'INF');
    const expectTotal = adt && inf ? (adt.paxTotalAmount.amount * 2 + inf.paxTotalAmount.amount) : null; const ok = types.length === 2 && adt && inf && !types.includes('CHD') && expectTotal === f.json.selectedOffer.priceDetails.totalAmount.amount;
    return { v: ok ? 'PASS' : 'FAIL', actual: `passengerFareBreakdown types [${types}] (no CHD: ${!types.includes('CHD')}); per-passenger ADT ${adt && adt.paxTotalAmount.amount} x 2 + INF ${inf && inf.paxTotalAmount.amount} x 1 = ${expectTotal}; priceDetails.totalAmount ${f.json.selectedOffer.priceDetails.totalAmount.amount} ${r.currency}. ${ok ? 'The priced mix is 2 ADT + 1 INF.' : 'The priced mix does not match 2 ADT + 1 INF.'}` };
  });
  await tc('TC-FARECONFIRM-INT-05', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const f = c.fc; if (!okFc(f)) return { v: 'FAIL', actual: errTxt(f) }; const o = f.json.selectedOffer;
    const flags = ['haveBundles', 'canBeHeld', 'offerHasAncillary', 'offerHasSeat', 'isSeatMapRequired', 'isAncillaryRequired', 'isBaggageRequired', 'isMealRequired', 'isBundleRequired']; const bad2 = flags.filter(k => typeof o[k] !== 'boolean');
    return { v: bad2.length ? 'FAIL' : 'PASS', actual: `Flags: ${flags.map(k => `${k}=${o[k]}`).join(', ')}. ${bad2.length ? 'Not boolean: ' + bad2.join(', ') : 'All present as booleans.'}`, unknown: [`Galileo/EGY capability flags from FareConfirm (CAI-JED, SelectAvailability offer): ${flags.slice(0, 5).map(k => `${k}=${o[k]}`).join(', ')} (SPEC §4.7 step 2).`] };
  });
  await tc('TC-FARECONFIRM-INT-06', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const a = c.fc; const b = await fcq(ctx, 'FareConfirm (same ids, second send)', fcBody(c.sel.json)); if (!okFc(a)) return { v: 'FAIL', actual: errTxt(a) };
    if (okFc(b)) { const pa = a.json.selectedOffer.priceDetails.totalAmount.amount, pb = b.json.selectedOffer.priceDetails.totalAmount.amount; return { v: pa === pb ? 'PASS' : 'FAIL', actual: `Both HTTP 200; total ${pa} vs ${pb} ${pa === pb ? '(same price)' : '(price changed with no status change)'}; offerId ${a.json.selectedOffer.offerId === b.json.selectedOffer.offerId ? 'identical' : 'different'}.`, unknown: ['Repeating FareConfirm with the same SelectAvailability ids returns HTTP 200 again with the same price.'] }; }
    const s = std4xx(b); return { v: s.ok ? 'PASS' : 'FAIL', actual: `First 200; second ${errTxt(b)}. ${s.ok ? 'Documented 4xx.' : s.problems.join('; ')}` };
  });
  await tc('TC-FARECONFIRM-BIZ-01', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const f = c.fc; if (!okFc(f)) return { v: 'FAIL', actual: errTxt(f) }; const r = recon(f.json);
    return { v: r.ok ? 'PASS' : 'FAIL', actual: r.ok ? `All four reconciliations hold: sum(base*count)=${r.totals.totB}, sum(tax*count)=${r.totals.totT}, sum((base+tax)*count)=${r.totals.totA} equal priceDetails base/tax/total; per-passenger taxesAndFees sums equal paxTotalTaxAmount; currency ${r.currency} on every amount.` : 'Reconciliation failed: ' + r.msgs.join('; ') };
  });
  await tc('TC-FARECONFIRM-BIZ-02', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const f = c.fc; if (!okFc(f)) return { v: 'FAIL', actual: errTxt(f) }; const ln = literalNull(f.json), nf = nullFields(f.json);
    return { v: !ln.length ? 'PASS' : 'FAIL', actual: `HTTP 200, valid JSON. Null fields (baseline): ${nf.join(', ') || 'none'}. Literal 'null'/'None' strings: ${ln.length ? ln.join(', ') : 'none'}.` };
  });
  const fneg = (id, label, fn, o = {}) => tc(id, async ctx => {
    const { c, bad } = await fcOK(ctx, { until: 'sel' }); if (bad) return bad;
    return negStd(ctx, label, (cc, l) => { const b = fcBody(c.sel.json); fn(b, c); return fcq(cc, l, b); }, o);
  });
  await fneg('TC-FARECONFIRM-NEG-01', 'FareConfirm with the availability responseId as ResponseId', (b, c) => { b.ResponseId = c.p1.json.responseId; }, { extra: h => h.status === 200 ? 'availability responseId accepted in place of the SelectAvailability responseId' : '' });
  await fneg('TC-FARECONFIRM-NEG-02', 'FareConfirm with the availabilityId as selectedOfferId', (b, c) => { b.selectedOfferId = c.p1.json.availabilityId; }, { extra: h => h.status === 200 ? 'availabilityId accepted as an offerId' : '' });
  await tc('TC-FARECONFIRM-NEG-03', async ctx => {
    const c = await chain(ctx, { until: 'p1' }); const A = pickMap(c.p1.json, 'Y', { skip: 0 }), B = pickMap(c.p1.json, 'Y', { skip: 1 }); if (!A.chosen[0] || !B.chosen[0]) return { v: 'BLOCKED', actual: 'Fewer than two Y journeys.' };
    const sa = await sel(ctx, 'SelectAvailability selection A', selBody(c.p1.json, A.map)); const sb = await sel(ctx, 'SelectAvailability selection B (different journey)', selBody(c.p1.json, B.map)); if (!okSel(sa) || !okSel(sb)) return { v: 'BLOCKED', actual: 'Could not build two selections.' };
    return negStd(ctx, 'FareConfirm with ResponseId of A and selectedOfferId of B', (cc, l) => fcq(cc, l, fcBody(sb.json, { ResponseId: sa.json.responseId })), { extra: h => h.status === 200 ? 'cross-offer pair accepted (High)' : '' });
  });
  await fneg('TC-FARECONFIRM-NEG-04', 'FareConfirm without ResponseId', b => { delete b.ResponseId; }, { extra: h => h.status === 200 ? 'missing mandatory ResponseId was not enforced' : '' });
  await tc('TC-FARECONFIRM-VAL-01', async ctx => {
    const { c, bad } = await fcOK(ctx, { until: 'sel' }); if (bad) return bad; const b = fcBody(c.sel.json); b.responseId = b.ResponseId; delete b.ResponseId; const h = await fcq(ctx, 'FareConfirm with key responseId (lowercase)', b);
    if (okFc(h)) return { v: 'PASS', actual: 'HTTP 200 — responseId accepted (case-insensitive binding).', unknown: ['FareConfirm accepts "responseId" as well as "ResponseId".'] };
    const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: `${errTxt(h)}. ${s.ok ? 'Clean 4xx.' : s.problems.join('; ')}`, unknown: s.ok ? ['FareConfirm rejects the key "responseId" (lowercase): ' + errTxt(h)] : [] };
  });
  await tc('TC-FARECONFIRM-REG-01', async ctx => {
    const { c, bad } = await fcOK(ctx, {}); if (bad) return bad; const f = c.fc; if (!okFc(f)) return { v: 'FAIL', actual: errTxt(f) };
    const firstRun = !fs.existsSync(BLF); if (firstRun) fs.writeFileSync(BLF, JSON.stringify(S.fc1 || f.json)); const base = JSON.parse(fs.readFileSync(BLF, 'utf8')); const df = diffPaths(base, f.json);
    return { v: !df.removed.length && !df.retyped.length ? 'PASS' : 'FAIL', actual: `Baseline ${firstRun ? 'captured by this run (first run, Harness/Galileo/baseline_fareconfirm.json)' : 'loaded from an earlier run'}; fresh FareConfirm: removed key paths ${df.removed.length}, retyped ${df.retyped.length}, new ${df.added.length}${df.added.length ? ' (' + df.added.slice(0, 4).join(', ') + ')' : ''}.` };
  });
  return S;
};
