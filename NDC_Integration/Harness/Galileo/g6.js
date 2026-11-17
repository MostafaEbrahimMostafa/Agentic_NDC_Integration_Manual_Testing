// Group 6 (Round 3 additions): TC-NEXTAVAIL-EDGE-01..06 and TC-SELECTAVAIL-EDGE-01..10
const G = require('./gl');
const { tc, av, nx, sel, fcq, baseBody, nextBody, selBody, fcBody, leg, d, clone, ODS, std4xx, errTxt, short, tokenless, pickMap, segInfo, flightKey, fs, path, sleep } = G;
const jn = j => ODS(j).reduce((n, o) => n + (o.journeys || []).length, 0);
const okPage = h => h && h.status === 200 && h.json && h.json.availabilityId;
const okSel = h => h && h.status === 200 && h.json && h.json.offerId;
const okFc = h => h && h.status === 200 && h.json && h.json.selectedOffer;
const judgeOk = h => { if (h.status === 200 && h.json) return { ok: true, note: `HTTP 200 (${h.response_summary ? short(h.response_summary, 100) : ''})` }; const s = std4xx(h); return { ok: s.ok, note: short(errTxt(h), 150) + (s.ok ? '' : ' — PROBLEM: ' + s.problems.join('; ')) }; };
const judge4 = h => { const s = std4xx(h); return { ok: s.ok, note: h.status === 200 ? `HTTP 200 accepted (${short(h.response_summary || '', 100)})` : short(errTxt(h), 150) + (s.ok ? '' : ' — PROBLEM: ' + s.problems.join('; ')) }; };
async function sweep(ctx, items, send, judge) { const out = []; for (const it of items) { const h = await send(ctx, it); const j = judge(h, it); out.push({ label: it.label, ...j, h }); } const bad = out.filter(o => !o.ok); return { v: bad.length ? 'FAIL' : 'PASS', actual: out.map(o => `[${o.label}] ${o.ok ? 'ok' : 'PROBLEM'}: ${o.note}`).join(' | '), out }; }
const keysOfPage = j => ODS(j).flatMap(o => (o.journeys || []).map(x => x.segments.map(s => flightKey(j.flightSegments[s.segmentRefId])).join('+')));
const classesOf = s => (s.cabins || []).flatMap(c => (c.bookingClasses || []).map(b => ({ ...b, cabin: c.cabin })));

// earliest stored first-page response of a previous run (ids at least ~60 min old)
function agedIds() {
  const dir = path.join(__dirname, 'round2', 'raw'); if (!fs.existsSync(dir)) return null; let best = null;
  for (const f of fs.readdirSync(dir)) { if (!f.endsWith('.json') || f.startsWith('get_')) continue; let r; try { r = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch { continue; }
    const resp = r.response; if (!resp || typeof resp !== 'object' || !resp.availabilityId || !resp.responseId || !resp.originDestinations) continue; if (!best || String(r.started_at) < String(best.r.started_at)) best = { r, f }; }
  if (!best) return null; const resp = best.r.response; const od = resp.originDestinations[0], jr = od.journeys[0], sg = jr.segments[0], bc = classesOf(sg)[0];
  return { availabilityId: resp.availabilityId, responseId: resp.responseId, journeyRefId: jr.journeyRefId, segmentRefId: sg.segmentRefId, bookingClassId: bc && bc.bookingClassId, started_at: best.r.started_at, file: best.f };
}
let P1 = null; const page1 = async ctx => { if (P1 && okPage(P1)) { ctx.hops.push(P1); return P1; } P1 = await av(ctx, 'Availability page 1 (BASE CAI-JED, 2 ADT + 1 INF)', baseBody()); return P1; };
const nonstopWith = (j, pred) => { for (const o of ODS(j)) for (const x of o.journeys || []) if (x.segments.length === 1) { const cl = classesOf(x.segments[0]); const hit = pred(cl); if (hit) return { jn: x, seg: x.segments[0], cl, hit }; } return null; };

module.exports = async function (S = {}) {
  // ===================== NextAvailability =====================
  await tc('TC-NEXTAVAIL-EDGE-01', async ctx => {
    let h = await av(ctx, 'Availability page 1 (JED-CAI +30)', baseBody({ searchCriteria: [leg('JED', 'CAI', 30)] })); if (!okPage(h)) return { v: 'FAIL', actual: errTxt(h) };
    const seen = new Set(keysOfPage(h.json)), probs = []; let pages = 1, last = h.json, prevNo = h.json.pageNumber; const log = [`p${h.json.pageNumber}: ${jn(h.json)} journeys, more=${h.json.hasMoreResults}`];
    while (last.hasMoreResults && pages < 8) {
      let n = await nx(ctx, `NextAvailability page ${pages + 1}`, nextBody(last)); if (n.status === 409) { await sleep(3000); n = await nx(ctx, `NextAvailability page ${pages + 1} (retry)`, nextBody(last)); }
      if (!okPage(n)) { probs.push(`page ${pages + 1}: ${short(errTxt(n), 140)}`); break; }
      if (n.json.pageNumber !== prevNo + 1) probs.push(`pageNumber ${n.json.pageNumber} after ${prevNo}`); prevNo = n.json.pageNumber; const ks = keysOfPage(n.json), dup = ks.filter(k => seen.has(k)); if (dup.length) probs.push(`page ${n.json.pageNumber}: ${dup.length} journey(s) already seen`); ks.forEach(k => seen.add(k));
      pages++; last = n.json; log.push(`p${n.json.pageNumber}: ${jn(n.json)} journeys, more=${n.json.hasMoreResults}`);
    }
    const done = last.hasMoreResults === false;
    return { v: probs.length ? 'FAIL' : 'PASS', actual: `${log.join('; ')}. Distinct journeys over ${pages} page(s): ${seen.size}. ${done ? 'Chain ended with hasMoreResults=false.' : 'Stopped at the 8-page cap with hasMoreResults still true.'}${probs.length ? ' Problems: ' + probs.join('; ') : ''}`, unknown: [`JED-CAI +30 pages through ${pages} page(s) ${done ? 'until hasMoreResults=false' : '(8-page cap reached, still more)'} with ${seen.size} distinct journeys.`] };
  });
  await tc('TC-NEXTAVAIL-EDGE-02', async ctx => {
    const h = await av(ctx, 'Availability page 1 (JED-CAI +30)', baseBody({ searchCriteria: [leg('JED', 'CAI', 30)] })); if (!okPage(h)) return { v: 'FAIL', actual: errTxt(h) };
    const rs = await Promise.all([1, 2].map(i => nx(ctx, 'NextAvailability parallel #' + i, nextBody(h.json)))); const ok2 = rs.filter(okPage), clean = rs.every(r => okPage(r) || std4xx(r).ok);
    const same = ok2.length < 2 || JSON.stringify(keysOfPage(ok2[0].json)) === JSON.stringify(keysOfPage(ok2[1].json));
    return { v: clean && same ? 'PASS' : 'FAIL', actual: `Statuses ${rs.map(r => r.status)} (${rs.map(r => r.ms + ' ms')}); ${ok2.length} returned page 2${ok2.length === 2 ? ', same journeys: ' + same : ''}${rs.filter(r => !okPage(r)).map(r => '; ' + short(errTxt(r), 130)).join('')}.` };
  });
  await tc('TC-NEXTAVAIL-EDGE-03', async ctx => {
    const h = await av(ctx, 'Availability page 1 (JED-CAI +30)', baseBody({ searchCriteria: [leg('JED', 'CAI', 30)] })); if (!okPage(h)) return { v: 'FAIL', actual: errTxt(h) }; const id = h.json.availabilityId;
    const vs = [{ label: 'upper case', v: id.toUpperCase() }, { label: 'lower case', v: id.toLowerCase() }, { label: 'padded', v: ' ' + id + ' ' }, { label: 'braces', v: '{' + id + '}' }, { label: 'no dashes', v: id.replace(/-/g, '') }];
    return sweep(ctx, vs, (c2, it) => nx(c2, 'Next with availabilityId ' + it.label, nextBody(h.json, { availabilityId: it.v })), judgeOk);
  });
  await tc('TC-NEXTAVAIL-EDGE-04', async ctx => {
    const h = await av(ctx, 'Availability page 1 (JED-CAI +30)', baseBody({ searchCriteria: [leg('JED', 'CAI', 30)] })); if (!okPage(h)) return { v: 'FAIL', actual: errTxt(h) };
    return sweep(ctx, [{ label: 'galileo / egy' }], (c2, it) => nx(c2, 'Next with lower-case supplier and selector', nextBody(h.json, { supplier: 'galileo', credentialsSelector: 'egy' })), judgeOk);
  });
  await tc('TC-NEXTAVAIL-EDGE-05', async ctx => {
    const a = agedIds(); if (!a) return { v: 'BLOCKED', actual: 'No stored first-page response with ids from the previous run was found in Harness/Galileo/round2/raw.' };
    const ageMin = Math.round((Date.now() - Date.parse(a.started_at)) / 60000);
    const h = await nx(ctx, `NextAvailability with ids ${ageMin} min old`, { ...G.SUPB, availabilityId: a.availabilityId, responseId: a.responseId, isDebug: false }); const r = judge4(h);
    return { v: r.ok ? 'PASS' : 'FAIL', actual: `Ids captured ${ageMin} minutes ago (${a.started_at}). ${r.note}`, unknown: [`Next-page call with first-page ids ${ageMin} minutes old: ${short(errTxt(h), 120)}${h.status === 200 ? ' (ids still valid)' : ''}.`] };
  });
  await tc('TC-NEXTAVAIL-EDGE-06', async ctx => {
    const h = await page1(ctx); if (!okPage(h)) return { v: 'FAIL', actual: errTxt(h) }; const tries = [];
    for (let k = 1; k <= 3; k++) { const n = await nx(ctx, `NextAvailability attempt ${k}`, nextBody(h.json)); tries.push(n.status === 200 ? `#${k}: 200 in ${n.ms} ms` : `#${k}: ${short(errTxt(n), 90)} in ${n.ms} ms`); if (n.status === 200) break; await sleep(5000); }
    const good = tries.some(t => /: 200 /.test(t)); return { v: good ? 'PASS' : 'FAIL', actual: `CAI-JED +30 next page: ${tries.join(' | ')}. ${good ? '' : 'Every attempt failed - the page-2 call does not recover on retry (BUG-01).'}` };
  });

  // ===================== SelectAvailability =====================
  await tc('TC-SELECTAVAIL-EDGE-01', async ctx => {
    const p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) };
    const f = nonstopWith(p.json, cl => { const y = cl.find(b => b.bookingCode === 'Y'), o = cl.find(b => b.bookingCode !== 'Y'); return y && o ? { y, o } : null; }); if (!f) return { v: 'BLOCKED', actual: 'No nonstop journey with Y and a second class on page 1.' };
    const jr = f.jn.journeyRefId, map = { [jr]: { [f.seg.segmentRefId]: [f.hit.y.bookingClassId, f.hit.o.bookingClassId] } };
    const h = await sel(ctx, `Select two classes (${f.hit.y.bookingCode}+${f.hit.o.bookingCode}) in one segment`, selBody(p.json, map)); const r = judge4(h);
    return { v: r.ok ? 'PASS' : 'FAIL', actual: r.note + (h.status === 200 ? ' — PROBLEM: two booking classes for one segment were accepted' : '') };
  });
  await tc('TC-SELECTAVAIL-EDGE-02', async ctx => {
    const p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) }; const pm = pickMap(p.json, 'Y'); if (pm.missing.length) return { v: 'BLOCKED', actual: 'No journey with Y on page 1.' };
    const jr = Object.keys(pm.map)[0], sg = Object.keys(pm.map[jr])[0]; const map = clone(pm.map); map[jr][sg] = [map[jr][sg][0], map[jr][sg][0]];
    const h = await sel(ctx, 'Select [Y, Y] on the first segment', selBody(p.json, map)); const r = judgeOk(h); return { v: r.ok ? 'PASS' : 'FAIL', actual: r.note };
  });
  await tc('TC-SELECTAVAIL-EDGE-03', async ctx => {
    let p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) }; let pick = null; const find = pg => { for (const o of ODS(pg.json)) for (const x of o.journeys || []) if (!pick && x.segments.length >= 2) { const c1 = classesOf(x.segments[0]).find(b => b.bookingCode === 'Y'), c2 = classesOf(x.segments[1]).find(b => b.bookingCode !== 'Y'); if (c1 && c2) pick = { x, c1, c2 }; } };
    find(p); if (!pick) { p = await av(ctx, 'Availability FRA-JNB +30 (connecting journeys)', baseBody({ searchCriteria: [leg('FRA', 'JNB', 30)] })); if (okPage(p)) find(p); }
    if (!pick) return { v: 'BLOCKED', actual: 'No connecting journey with Y on segment 1 and another class on segment 2 on CAI-JED or FRA-JNB page 1.' };
    const map = { [pick.x.journeyRefId]: { [pick.x.segments[0].segmentRefId]: [pick.c1.bookingClassId], [pick.x.segments[1].segmentRefId]: [pick.c2.bookingClassId] } };
    const s = await sel(ctx, `Select ${pick.c1.bookingCode} + ${pick.c2.bookingCode} on a connecting journey`, selBody(p.json, map));
    if (okSel(s)) { const f = await fcq(ctx, 'FareConfirm of the mixed-code offer', fcBody(s.json)); const r = okFc(f) ? { ok: true, note: 'priced' } : judgeOk(f); return { v: r.ok ? 'PASS' : 'FAIL', actual: `Select accepted ${pick.c1.bookingCode}+${pick.c2.bookingCode}; FareConfirm: ${okFc(f) ? 'HTTP 200 priced, rbd [' + [...new Set((f.json.selectedOffer.passengerFareBreakdown || []).flatMap(q => (q.segmentDetails || []).map(z => z.rbd)))] + ']' : r.note}`, unknown: ['Mixed booking codes on a connecting journey: Select accepted; FareConfirm ' + (okFc(f) ? 'priced it.' : 'answered ' + short(errTxt(f), 100) + '.')] }; }
    const r = judge4(s); return { v: r.ok ? 'PASS' : 'FAIL', actual: 'Select: ' + r.note, unknown: ['Mixed booking codes on a connecting journey rejected by Select: ' + short(errTxt(s), 100) + '.'] };
  });
  await tc('TC-SELECTAVAIL-EDGE-04', async ctx => {
    const p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) }; let pick = null;
    for (const o of ODS(p.json)) for (const x of o.journeys || []) if (!pick && x.segments.every(s => classesOf(s).some(b => /BUSINESS/i.test(b.cabin)))) pick = x;
    if (!pick) return { v: 'BLOCKED', actual: 'No journey with a business-cabin class on every segment on page 1.' };
    const want = pick.segments.map(s => classesOf(s).find(b => /BUSINESS/i.test(b.cabin))); const map = { [pick.journeyRefId]: Object.fromEntries(pick.segments.map((s, i) => [s.segmentRefId, [want[i].bookingClassId]])) };
    const s = await sel(ctx, `Select business classes [${want.map(b => b.bookingCode)}]`, selBody(p.json, map)); if (!okSel(s)) return { v: 'FAIL', actual: 'Select: ' + short(errTxt(s), 160) };
    const f = await fcq(ctx, 'FareConfirm of the business offer', fcBody(s.json)); if (!okFc(f)) return { v: 'FAIL', actual: 'FareConfirm: ' + short(errTxt(f), 160) };
    const rbds = [...new Set((f.json.selectedOffer.passengerFareBreakdown || []).flatMap(q => (q.segmentDetails || []).map(z => z.rbd)))], cabins = [...new Set((f.json.selectedOffer.passengerFareBreakdown || []).flatMap(q => (q.segmentDetails || []).map(z => z.cabin || z.cabinClass)))];
    const ok = rbds.length === new Set(want.map(b => b.bookingCode)).size && rbds.every(r => want.some(b => b.bookingCode === r));
    return { v: ok ? 'PASS' : 'FAIL', actual: `Selected business booking codes [${want.map(b => b.bookingCode)}]; FareConfirm rbd [${rbds}]${cabins.filter(Boolean).length ? ', cabin [' + cabins.filter(Boolean) + ']' : ''}, total ${f.json.selectedOffer.priceDetails.totalAmount.amount} ${f.json.selectedOffer.priceDetails.totalAmount.currency}. ${ok ? 'Same RBD as selected.' : 'RBD differs from the selection.'}` };
  });
  await tc('TC-SELECTAVAIL-EDGE-05', async ctx => {
    const p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) };
    const f = nonstopWith(p.json, cl => cl.find(b => b.seatsAvailable === 1)); if (!f) { let mn = 99; ODS(p.json).forEach(o => (o.journeys || []).forEach(x => x.segments.forEach(sg => classesOf(sg).forEach(b => { if (b.seatsAvailable != null) mn = Math.min(mn, b.seatsAvailable); })))); return { v: 'BLOCKED', actual: `Page 1 holds no booking class with seatsAvailable=1 for this party: the smallest seat count offered is ${mn} (party of 2 ADT + 1 INF), so Availability only lists classes that can seat the party and the case cannot be constructed.`, unknown: [`Availability lists only booking classes with at least the party size of seats (smallest seatsAvailable ${mn} for 2 ADT + 1 INF; 9 for 9 ADT), so a too-small class cannot be selected from a search made for the party.`] }; }
    const map = { [f.jn.journeyRefId]: { [f.seg.segmentRefId]: [f.hit.bookingClassId] } }; const s = await sel(ctx, `Select class ${f.hit.bookingCode} (seatsAvailable 1) for a party of 2 ADT + 1 INF`, selBody(p.json, map));
    if (!okSel(s)) { const r = judge4(s); return { v: r.ok ? 'PASS' : 'FAIL', actual: 'Select rejected: ' + r.note, unknown: ['Select with a 1-seat class for 2 ADT: rejected (' + short(errTxt(s), 100) + ').'] }; }
    const fc = await fcq(ctx, 'FareConfirm of the 1-seat offer', fcBody(s.json)); if (okFc(fc)) return { v: 'FAIL', actual: `Select accepted class ${f.hit.bookingCode} with 1 seat and FareConfirm priced it for 2 ADT + 1 INF (total ${fc.json.selectedOffer.priceDetails.totalAmount.amount}) — the party does not fit the seats shown.`, unknown: ['A class with seatsAvailable 1 is accepted by Select and priced by FareConfirm for 2 ADT.'] };
    const r = judge4(fc); return { v: r.ok ? 'PASS' : 'FAIL', actual: `Select accepted; FareConfirm: ${r.note}`, unknown: ['A class with seatsAvailable 1 is accepted by Select and rejected by FareConfirm for 2 ADT: ' + short(errTxt(fc), 100) + '.'] };
  });
  await tc('TC-SELECTAVAIL-EDGE-06', async ctx => {
    const h = await av(ctx, 'Availability round trip (FRA-JNB +30 / JNB-FRA +37)', baseBody({ searchCriteria: [leg('FRA', 'JNB', 30), leg('JNB', 'FRA', 37)] })); if (!okPage(h)) return { v: 'FAIL', actual: errTxt(h) };
    const pm = pickMap(h.json, 'Y'); if (pm.missing.length) return { v: 'BLOCKED', actual: 'No Y journey for ' + pm.missing.join(', ') };
    const rev = Object.fromEntries(Object.entries(pm.map).reverse()); const s = await sel(ctx, 'Select with the return journey listed first', selBody(h.json, rev)); const r = judgeOk(s);
    return { v: r.ok ? 'PASS' : 'FAIL', actual: r.note + (okSel(s) ? ' — offerId returned, same as normal order.' : '') };
  });
  await tc('TC-SELECTAVAIL-EDGE-07', async ctx => {
    const p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) }; const a = pickMap(p.json, 'Y'), b = pickMap(p.json, 'Y', { skip: 1 }); if (a.missing.length || b.missing.length) return { v: 'BLOCKED', actual: 'Fewer than two Y journeys on page 1.' };
    const s = await sel(ctx, 'Select two CAI-JED journeys in a one-way', selBody(p.json, { ...a.map, ...b.map })); const r = judge4(s); return { v: r.ok ? 'PASS' : 'FAIL', actual: r.note + (s.status === 200 ? ' — PROBLEM: two journeys of one leg were accepted' : '') };
  });
  await tc('TC-SELECTAVAIL-EDGE-08', async ctx => {
    const p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) }; const a = pickMap(p.json, 'Y'), b = pickMap(p.json, 'Y', { skip: 2 }); if (a.missing.length || b.missing.length) return { v: 'BLOCKED', actual: 'Fewer than three Y journeys on page 1.' };
    const s1 = await sel(ctx, 'Select journey A', selBody(p.json, a.map)), s2 = await sel(ctx, 'Select journey B', selBody(p.json, b.map)); if (!okSel(s1) || !okSel(s2)) return { v: 'FAIL', actual: `Select A ${s1.status}, Select B ${s2.status}: ${short(errTxt(okSel(s1) ? s2 : s1), 140)}` };
    const f1 = await fcq(ctx, 'FareConfirm A', fcBody(s1.json)), f2 = await fcq(ctx, 'FareConfirm B', fcBody(s2.json)); if (!okFc(f1) || !okFc(f2)) return { v: 'FAIL', actual: `FareConfirm A ${f1.status}, B ${f2.status}: ${short(errTxt(okFc(f1) ? f2 : f1), 140)}` };
    const fl = (f, want) => { const got = (f.json.selectedOffer.offerJourneys || []).flatMap(r => f.json.journeys[r].segmentRefIds.map(s => flightKey(f.json.flightSegments[s]))); return { got, ok: JSON.stringify(got) === JSON.stringify(want) }; };
    const wa = a.chosen[0].journey.segments.map(s => flightKey(segInfo(p.json, s.segmentRefId))), wb = b.chosen[0].journey.segments.map(s => flightKey(segInfo(p.json, s.segmentRefId))); const ra = fl(f1, wa), rb = fl(f2, wb);
    const ok = s1.json.offerId !== s2.json.offerId && ra.ok && rb.ok;
    return { v: ok ? 'PASS' : 'FAIL', actual: `offerIds distinct: ${s1.json.offerId !== s2.json.offerId}; A priced ${ra.got.join('+')} (selected ${wa.join('+')}) match=${ra.ok}; B priced ${rb.got.join('+')} (selected ${wb.join('+')}) match=${rb.ok}.` };
  });
  await tc('TC-SELECTAVAIL-EDGE-09', async ctx => {
    const p = await page1(ctx); if (!okPage(p)) return { v: 'FAIL', actual: errTxt(p) }; const pm = pickMap(p.json, 'Y'); const jr = Object.keys(pm.map)[0], sg = Object.keys(pm.map[jr])[0];
    return sweep(ctx, [{ label: '{"journey":null}', v: { [jr]: null } }, { label: '{"journey":{"segment":null}}', v: { [jr]: { [sg]: null } } }, { label: '[]', v: [] }, { label: '""', v: '' }], (c2, it) => sel(c2, 'Select bookingClassIds ' + it.label, selBody(p.json, it.v)), judge4);
  });
  await tc('TC-SELECTAVAIL-EDGE-10', async ctx => {
    const a = agedIds(); if (!a || !a.bookingClassId) return { v: 'BLOCKED', actual: 'No stored first-page response with ids from the previous run was found in Harness/Galileo/round2/raw.' };
    const ageMin = Math.round((Date.now() - Date.parse(a.started_at)) / 60000);
    const h = await sel(ctx, `Select with ids ${ageMin} min old`, { ...G.SUPB, availabilityId: a.availabilityId, responseId: a.responseId, bookingClassIds: { [a.journeyRefId]: { [a.segmentRefId]: [a.bookingClassId] } } }); const r = judge4(h);
    return { v: r.ok ? 'PASS' : 'FAIL', actual: `Ids captured ${ageMin} minutes ago. ${r.note}`, unknown: [`Select with first-page ids ${ageMin} minutes old: ${short(errTxt(h), 120)}${h.status === 200 ? ' (ids still valid)' : ''}.`] };
  });
};
