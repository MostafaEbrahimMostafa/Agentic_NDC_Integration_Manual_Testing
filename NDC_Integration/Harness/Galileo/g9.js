// Group 9: TC-RTMC-01..10 — round-trip and multi-city (continuous and non-continuous) journeys, Galileo/EGY, ne-4.
const G = require('./gl'); const F = require('./gchain'); const G7 = require('./g7');
const { tc, av, nx, sel, fcq, baseBody, nextBody, selBody, fcBody, leg, ODS, std4xx, errTxt, short, segInfo, flightKey, recon, d, sleep, segHasCode, classFor } = G; const { ok2 } = F; const { bookFlow } = G7;
const T3 = ['ADT', 'ADT', 'INF']; const C3 = { ADT: 2, INF: 1 };
const legsReq = legs => legs.map(([o, dd, n]) => leg(o, dd, n)); const fmt = legs => legs.map(l => l[0] + '-' + l[1]).join(' / ');
const nums = (j, so) => ((so && so.offerJourneys) || []).flatMap(r => ((j.journeys && j.journeys[r]) ? j.journeys[r].segmentRefIds : []).map(x => j.flightSegments[x].marketingCarrierCode + j.flightSegments[x].marketingFlightNumber));

// request/response structure of a multi-leg Availability answer
function structure(h, legs) {
  if (h.status !== 200 || !h.json) return { ok: false, text: 'HTTP ' + h.status + ': ' + short(errTxt(h), 200) };
  const j = h.json, o = ODS(j), p = [], info = [];
  if (o.length !== legs.length) p.push(`originDestinations=${o.length}, expected ${legs.length}`);
  legs.forEach(([a, b, n], i) => {
    const od = o[i]; if (!od) { p.push(`leg ${i + 1} (${a}-${b}) missing`); return; }
    if (od.origin !== a || od.destination !== b) p.push(`leg ${i + 1} answered ${od.origin}-${od.destination}, expected ${a}-${b}`);
    const js = od.journeys || []; if (!js.length) p.push(`leg ${i + 1} (${a}-${b}) has no journeys`);
    const want = d(n).slice(0, 10); let badEnds = 0, badDate = 0, noRef = 0;
    for (const jn of js) { const segs = (jn.segments || []).map(s => segInfo(j, s.segmentRefId)); if (!segs.length || segs.some(s => !s)) { noRef++; continue; } if (segs[0].origin !== a || segs[segs.length - 1].destination !== b) badEnds++; if (String(segs[0].departureDateTime).slice(0, 10) !== want) badDate++; }
    if (badEnds) p.push(`leg ${i + 1}: ${badEnds} journey(s) do not run ${a} to ${b}`); if (badDate) p.push(`leg ${i + 1}: ${badDate} journey(s) do not depart on ${want}`); if (noRef) p.push(`leg ${i + 1}: ${noRef} journey(s) with an unresolved segment reference`);
    info.push(`${a}-${b}: ${js.length} journeys, date ${String(od.departureDate).slice(0, 10)}`);
  });
  return { ok: !p.length, text: `HTTP 200 in ${h.ms} ms; originDestinations=${o.length} (${info.join('; ')}).${p.length ? ' PROBLEMS: ' + p.join('; ') : ' Every journey starts and ends at the requested airports on the requested date.'}`, hasMore: j.hasMoreResults };
}
const structCase = (id, legs) => tc(id, async ctx => { const h = await av(ctx, `Availability ${fmt(legs)} (${legs.map(l => '+' + l[2]).join(', ')})`, baseBody({ searchCriteria: legsReq(legs) })); const s = structure(h, legs); return { v: s.ok ? 'PASS' : 'FAIL', actual: s.text }; });

// Availability -> Select -> FareConfirm for a multi-leg party, through the shared booking-flow primitive
const flowCase = (id, legs, seed, allowRefusal) => tc(id, async ctx => {
  const o = await bookFlow(ctx, { legs, types: T3, stopAfter: 'fc', last: 'Journeyx', seed, carrier: 'auto' });
  const cu = o.carrierUsed ? 'one carrier on every leg (' + o.carrierUsed + ')' : 'no single carrier covers every leg, so the first class-Y journey of each leg';
  if (!o.ok && allowRefusal && o.failedAt === 'FareConfirm' && o.fc && o.fc.status === 409) { const e = G.envOf(o.fc), txt = errTxt(o.fc); const classified = e.code && !/NDC-INT-UNC-Z9999/.test(String(e.code)); const says = /ticket|separate|surface|sector|carrier|combination/i.test(JSON.stringify((o.fc.json && (o.fc.json.Context || o.fc.json.context)) || '') + ' ' + String(e.msg || '')); return { v: classified && says ? 'PASS' : 'FAIL', actual: `FareConfirm refused the combination (${cu}; ${(o.wantFlights || []).map(k => k.split('@')[0]).join(' + ')}): ${short(txt, 230)}. ${classified && says ? 'The refusal is a classified business error that says why.' : 'The refusal is not a classified business error that says why: the code is the unclassified NDC-INT-UNC-Z9999 and the reason is only inside Context.'}` }; }
  if (!o.ok) return { v: 'FAIL', actual: `Chain stopped at ${o.failedAt} (${cu}): ${o.why}${o.wantFlights ? ' Selected flights: ' + o.wantFlights.map(k => k.split('@')[0]).join(' + ') + '.' : ''}` };
  const so = o.fc.json.selectedOffer; const nj = (so.offerJourneys || []).length; o.checks.push({ name: `FareConfirm offer has ${legs.length} journeys`, pass: nj === legs.length, detail: `offerJourneys=${nj}` });
  const bad = o.checks.filter(c => !c.pass); const nonMS = o.wantFlights.some(k => !/^MS/.test(k)); const taxBug = bad.some(c => /sum\(taxesAndFees\)/.test(c.detail || '')) ? ' The tax lines mismatch is the one of BUG-12 (CancelFee/ChangeFee listed as taxes on non-MS carriers).' : '';
  return { v: bad.length ? 'FAIL' : 'PASS', actual: `Availability ${fmt(legs)}, SelectAvailability and FareConfirm HTTP 200 (FareConfirm ${o.totals.fc} ${o.totals.currency}); selected flights ${o.wantFlights.map(k => k.split('@')[0]).join(' + ')} (${cu}); ${o.checks.length} checks, ${o.checks.length - bad.length} passed${bad.length ? ', failed: ' + bad.map(c => c.name + ' (' + c.detail + ')').join('; ') : ''}.${bad.length && nonMS ? taxBug : ''}` };
});

module.exports = async function (S = {}) {
  await structCase('TC-RTMC-01', [['CAI', 'JED', 30], ['JED', 'CAI', 37]]);
  // every single-carrier round trip (up to three carriers) offered on page 1 of CAI-DXB / DXB-CAI is selected and priced
  await tc('TC-RTMC-02', async ctx => {
    const legs = [['CAI', 'DXB', 30], ['DXB', 'CAI', 37]]; const pg = await av(ctx, 'Availability ' + fmt(legs), baseBody({ searchCriteria: legsReq(legs) }));
    if (!ok2(pg)) return { v: 'BLOCKED', actual: 'Availability failed: ' + short(errTxt(pg), 160) }; const j = pg.json, ods = ODS(j);
    const cset = od => { const m = new Set(); (od.journeys || []).filter(x => (x.segments || []).length && x.segments.every(s => segHasCode(s, 'Y'))).forEach(x => { const cs = new Set(x.segments.map(s => segInfo(j, s.segmentRefId).marketingCarrierCode)); if (cs.size === 1) m.add([...cs][0]); }); return m; };
    const a = cset(ods[0]), b = cset(ods[1]); const cands = [...a].filter(c => b.has(c)).slice(0, 3); if (!cands.length) return { v: 'BLOCKED', actual: 'No carrier has a class-Y journey on both legs.' };
    const rows = [];
    for (const c of cands) {
      const pm = G.pickMap(j, 'Y', { carrier: c }); const want = pm.chosen.flatMap(x => x.journey.segments.map(s => flightKey(segInfo(j, s.segmentRefId)))); const names = want.map(k => k.split('@')[0]).join(' + ');
      const s = await sel(ctx, 'SelectAvailability (' + c + ')', selBody(j, pm.map)); if (!ok2(s) || !s.json.offerId) { rows.push({ c, ok: false, t: `${names}: Select failed: ${short(errTxt(s), 140)}` }); continue; }
      const f = await fcq(ctx, 'FareConfirm (' + c + ')', fcBody(s.json));
      if (ok2(f) && f.json.selectedOffer) { const rc = recon(f.json, C3); const got = (f.json.selectedOffer.offerJourneys || []).flatMap(r => f.json.journeys[r].segmentRefIds.map(x => flightKey(f.json.flightSegments[x]))); const same = JSON.stringify(got) === JSON.stringify(want); const two = (f.json.selectedOffer.offerJourneys || []).length === 2; rows.push({ c, ok: rc.ok && same && two, t: `${names}: priced ${f.json.selectedOffer.priceDetails.totalAmount.amount}; both flights carried: ${same}; two journeys: ${two}; reconciles: ${rc.ok}${rc.ok ? '' : ' (' + rc.msgs.join('; ') + ')'}` }); }
      else { const fe = G.envOf(f); const classified = !!fe.code && !/NDC-INT-UNC-Z9999/.test(String(fe.code)); const says = /carrier|airline|interline|fare|combination/i.test(JSON.stringify((f.json && (f.json.Context || f.json.context)) || '') + ' ' + String(fe.msg || '')); rows.push({ c, ok: classified && says, t: `${names}: FareConfirm refused: ${short(errTxt(f), 170)}${classified ? '' : ' - unclassified NDC-INT-UNC-Z9999, reason only in Context'}` }); }
    }
    const bad = rows.filter(r => !r.ok); return { v: bad.length ? 'FAIL' : 'PASS', actual: `Round trip ${fmt(legs)}, ${cands.length} single-carrier offer(s) tried (${cands.join(', ')}): ${rows.length - bad.length} priced cleanly, ${bad.length} not. ` + rows.map(r => `[${r.c}] ${r.ok ? 'ok' : 'PROBLEM'}: ${r.t}`).join(' | ') };
  });

  await tc('TC-RTMC-03', async ctx => {
    const legs = [['CAI', 'DXB', 30], ['DXB', 'CAI', 37]]; const pg = await av(ctx, 'Availability CAI-DXB / DXB-CAI', baseBody({ searchCriteria: legsReq(legs) }));
    if (!ok2(pg)) return { v: 'BLOCKED', actual: 'Availability failed: ' + short(errTxt(pg), 160) }; const j = pg.json, ods = ODS(j);
    const carriers = jn => [...new Set(jn.segments.map(s => segInfo(j, s.segmentRefId).marketingCarrierCode))]; const usable = od => (od.journeys || []).filter(x => (x.segments || []).length && x.segments.every(s => segHasCode(s, 'Y')));
    const a = usable(ods[0])[0]; const ca = a ? carriers(a) : []; const b = usable(ods[1]).find(x => !carriers(x).some(c => ca.includes(c)));
    if (!a || !b) return { v: 'BLOCKED', actual: 'No outbound/return pair with different carriers and class Y on page 1 (outbound carriers ' + ca.join('+') + ').' };
    const map = {}; [a, b].forEach(jn => { map[jn.journeyRefId] = {}; jn.segments.forEach(s => { map[jn.journeyRefId][s.segmentRefId] = [classFor(s, 'Y').bookingClassId]; }); });
    const want = [a, b].flatMap(jn => jn.segments.map(s => flightKey(segInfo(j, s.segmentRefId)))); const names = want.map(k => k.split('@')[0]).join(' + ');
    const s = await sel(ctx, 'SelectAvailability (outbound ' + carriers(a).join('+') + ', return ' + carriers(b).join('+') + ')', selBody(j, map)); if (!ok2(s) || !s.json.offerId) { const e = std4xx(s); return { v: 'FAIL', actual: `Select of mixed carriers ${names} failed: ${short(errTxt(s), 200)}${e.ok ? '' : ' — ' + e.problems.join('; ')}` }; }
    const f = await fcq(ctx, 'FareConfirm', fcBody(s.json));
    if (ok2(f) && f.json.selectedOffer) { const rc = recon(f.json, C3); const got = (f.json.selectedOffer.offerJourneys || []).flatMap(r => f.json.journeys[r].segmentRefIds.map(x => flightKey(f.json.flightSegments[x]))); const same = JSON.stringify(got) === JSON.stringify(want); const ok = rc.ok && same;
      return { v: ok ? 'PASS' : 'FAIL', actual: `Mixed carriers ${names}: Select and FareConfirm HTTP 200; offer carries the selected flights: ${same}; price reconciles: ${rc.ok}${rc.ok ? '' : ' (' + rc.msgs.join('; ') + (/NE|SV|NP/.test(names) ? ' - BUG-12' : '') + ')'}.` }; }
    const fe = G.envOf(f); const classified = !!fe.code && !/NDC-INT-UNC-Z9999/.test(String(fe.code)); const says = /carrier|airline|interline|mixed|same/i.test(JSON.stringify((f.json && (f.json.Context || f.json.context)) || '') + ' ' + String(fe.msg || ''));
    return { v: classified && says ? 'PASS' : 'FAIL', actual: `Mixed carriers ${names}: FareConfirm refused: ${short(errTxt(f), 220)}. ${classified && says ? 'The refusal is a classified business error that names the cause.' : 'The refusal is not a classified business error that says why (expected a clear message about mixed carriers).'}` };
  });

  await tc('TC-RTMC-04', async ctx => {
    const legs = [['CAI', 'DXB', 30], ['DXB', 'CAI', 37]]; const p1 = await av(ctx, 'Availability page 1 CAI-DXB / DXB-CAI', baseBody({ searchCriteria: legsReq(legs) }));
    if (!ok2(p1) || !p1.json.hasMoreResults) return { v: 'BLOCKED', actual: 'Page 1 not available or has no further pages: ' + (ok2(p1) ? 'hasMoreResults=' + p1.json.hasMoreResults : short(errTxt(p1), 160)) };
    let n = await nx(ctx, 'NextAvailability page 2', nextBody(p1.json)); let retried = false; if (n.status === 409) { await sleep(3000); retried = true; n = await nx(ctx, 'NextAvailability page 2 (retry)', nextBody(p1.json)); }
    if (!ok2(n)) return { v: 'FAIL', actual: `Page 2 of the round trip failed${retried ? ' twice' : ''}: ${short(errTxt(n), 200)}` };
    const o2 = ODS(n.json), p = []; if (o2.length !== 2) p.push('originDestinations=' + o2.length); else if (o2[0].origin !== 'CAI' || o2[0].destination !== 'DXB' || o2[1].origin !== 'DXB' || o2[1].destination !== 'CAI') p.push('legs answered ' + o2.map(x => x.origin + '-' + x.destination).join(','));
    if (n.json.pageNumber !== 2) p.push('pageNumber=' + n.json.pageNumber); const k1 = new Set(Object.values(p1.json.flightSegments || {}).map(flightKey)); const dup = Object.values(n.json.flightSegments || {}).map(flightKey).filter(k => k1.has(k)); if (dup.length) p.push(dup.length + ' flight(s) repeated from page 1: ' + dup.slice(0, 3).join(', '));
    return { v: p.length ? 'FAIL' : 'PASS', actual: `Page 2 HTTP 200 in ${n.ms} ms${retried ? ' (after one retry)' : ''}; pageNumber ${n.json.pageNumber}; ${o2.map(x => `${x.origin}-${x.destination}: ${(x.journeys || []).length} journeys`).join('; ')}.${p.length ? ' PROBLEMS: ' + p.join('; ') : ' Both legs kept, no flight repeated from page 1.'}` };
  });

  await structCase('TC-RTMC-05', [['CAI', 'DXB', 30], ['DXB', 'LHR', 35]]);
  await flowCase('TC-RTMC-06', [['CAI', 'JED', 30], ['JED', 'DXB', 35]], 62);
  await structCase('TC-RTMC-07', [['CAI', 'JED', 30], ['DXB', 'LHR', 35]]);
  await flowCase('TC-RTMC-08', [['CAI', 'DXB', 30], ['JED', 'LHR', 35]], 63, true);

  await tc('TC-RTMC-09', async ctx => {
    const legs = [['CAI', 'JED', 30], ['JED', 'DXB', 35]]; const o = await bookFlow(ctx, { legs, types: ['ADT'], enrich: {}, hold: true, last: 'Journeyfar', seed: 64, carrier: 'auto' });
    const want = (o.wantFlights || []).map(k => k.split('@')[0]).sort(); const names = want.join(' + ');
    if (!o.booking) return { v: 'FAIL', actual: `Hold was not created: flow stopped at ${o.failedAt}: ${o.why}. Selected flights ${names || 'n/a'}.` };
    const hn = nums(o.bookJson, o.bookJson.selectedOffer).sort(), rj = o.retrieveJson, rn = rj ? nums(rj, rj.selectedOffer).sort() : null; const eq = (x, y) => JSON.stringify(x) === JSON.stringify(y);
    const c = await F.cancelHold(ctx, o.booking, {}); const cancelled = c.status === 200 && c.json && c.json.cancelled === true; const p = [];
    if (!eq(hn, want)) p.push(`Hold carries ${hn.join('+')} instead of ${names}`); if (!rj) p.push('Retrieve did not return the booking (' + ((o.tail.find(t => t.t === 'retr') || {}).h || {}).status + ')'); else { if (!eq(rn, want)) p.push(`Retrieve carries ${rn.join('+')} instead of ${names}`); if (rj.bookingStatus !== 'OnHold') p.push('Retrieve bookingStatus=' + rj.bookingStatus); }
    if (!cancelled) p.push('CancelAfterHold HTTP ' + c.status + ' ' + short(errTxt(c), 120));
    return { v: p.length ? 'FAIL' : 'PASS', actual: `Continuous multi-city ${fmt(legs)} with ${names} (${o.carrierUsed ? 'carrier ' + o.carrierUsed : 'no common carrier'}): Hold HTTP 200 (gdsPNR ${o.booking.gdsPNR}), Retrieve ${rj ? 'HTTP 200 ' + rj.bookingStatus : 'not returned'}, CancelAfterHold ${c.status}${cancelled ? ' cancelled=true' : ''}.${p.length ? ' PROBLEMS: ' + p.join('; ') : ' Both legs are on the Hold and on Retrieve; the hold was released.'}` };
  });

  await tc('TC-RTMC-10', async ctx => {
    const V = [['A continuous (CAI-JED, JED-DXB, DXB-LHR)', [['CAI', 'JED', 30], ['JED', 'DXB', 35], ['DXB', 'LHR', 40]]], ['B non-continuous (CAI-JED, DXB-LHR, FRA-JNB)', [['CAI', 'JED', 30], ['DXB', 'LHR', 35], ['FRA', 'JNB', 40]]]]; const res = [];
    for (const [label, legs] of V) { const h = await av(ctx, 'Availability 3 legs ' + label, baseBody({ searchCriteria: legsReq(legs) })); const e = std4xx(h); const txt = JSON.stringify(h.json || {}) + (h.text || ''); const msg = /SearchCriteria/i.test(txt) && /1 or 2/.test(txt); const ok = h.status === 400 && e.ok && msg;
      res.push(`[${label}] ${ok ? 'ok' : 'PROBLEM'}: HTTP ${h.status}; message names the limit: ${msg}; ${short(errTxt(h), 150)}${e.ok ? '' : ' — ' + e.problems.join('; ')}`); res[res.length - 1] = { ok, t: res[res.length - 1] }; }
    return { v: res.every(r => r.ok) ? 'PASS' : 'FAIL', actual: res.map(r => r.t).join(' | ') };
  });
};
