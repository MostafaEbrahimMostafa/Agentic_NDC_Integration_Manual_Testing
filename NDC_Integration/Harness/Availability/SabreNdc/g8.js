// Group 8 (Round 2 additions): TC-ROUTES-QR-01..08 (every QR route) and TC-FLOW-V2-SABRT-01..14 (booking lifecycle incl. Void / CancelAfterHold / negatives)
const L = require('./g8lib');
const { tc, av, nx, sel, fcq, req, baseBody, nextBody, selBody, fcBody, leg, d, SUPB, ODS, std4xx, errTxt, timedOut, short, tokenless, flightKey, segInfo, recon, R, sleep, fs, path, F, ok2, P, cnt, paxList, totalOf, pickAny, toOffer, bookOf, loc, voidReq, cancelReq, bookIt, envOf } = L;
const ADT1 = [{ passengerTypeCode: 'ADT', count: 1 }];
const ROUTES = [].concat(
  ['DOH', 'JED', 'RUH', 'DMM', 'MED', 'DXB', 'AUH', 'KWI', 'BAH', 'MCT', 'AMM', 'BEY', 'IST', 'LHR', 'CDG', 'FRA', 'JFK', 'BKK', 'NBO', 'ADD', 'CMN', 'DEL', 'BOM', 'SIN', 'KUL', 'ATH', 'FCO', 'MAD', 'LOS', 'JNB'].map(x => ['CAI', x]),
  ['DOH', 'JED', 'RUH', 'DMM', 'MED', 'DXB', 'KWI', 'LHR', 'JFK', 'IST'].map(x => [x, 'CAI']),
  [['ALY', 'DOH'], ['HRG', 'DOH'], ['SSH', 'DOH'], ['LXR', 'DOH'], ['ASW', 'DOH'], ['ALY', 'JED'], ['DOH', 'LHR'], ['DOH', 'JFK'], ['JED', 'DOH'], ['DXB', 'DOH']]);
const SWEEP = path.join(__dirname, 'out', 'sweep_r2.json');
const med = a => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
const carriersOf = j => { const c = new Set(); Object.values(j.flightSegments || {}).forEach(s => c.add(s.marketingCarrierCode)); return c; };
const jKey = (j, jn) => jn.segments.map(s => flightKey(segInfo(j, s.segmentRefId))).join('+');
const jCount = j => ODS(j).reduce((n, o) => n + (o.journeys || []).length, 0);
const depDay = (j, jn) => { const s = segInfo(j, jn.segments[0].segmentRefId); return s ? String(s.departureDateTime).substring(0, 10) : '?'; };
module.exports = async function (S = {}) {
  S.sweep = S.sweep || (fs.existsSync(SWEEP) ? JSON.parse(fs.readFileSync(SWEEP, 'utf8')) : {});
  const saveSweep = () => fs.writeFileSync(SWEEP, JSON.stringify(Object.fromEntries(Object.entries(S.sweep).map(([k, v]) => [k, { n: v.n, more: v.more, at: v.at, json: v.json }]))));
  const page1 = async (ctx, route, force) => {
    const e = S.sweep[route]; if (e && e.json && !force && Date.now() - e.at < 8 * 60e3) return e.json;
    const [o, dd] = route.split('-'); const h = await av(ctx, `Availability ${route} +30 (fresh)`, baseBody({ searchCriteria: [leg(o, dd, 30)], passengers: ADT1 })); return ok2(h) && h.json.availabilityId ? (S.sweep[route] = { n: jCount(h.json), more: h.json.hasMoreResults, at: Date.now(), json: h.json }, h.json) : null;
  };
  // ---------------- TC-ROUTES-QR-01 ----------------
  await tc('TC-ROUTES-QR-01', async ctx => {
    const bad = [], noinv = [], inv = [], times = []; let nonQR = 0, odBad = [], journeys = 0;
    for (const [o, dd] of ROUTES) {
      const route = o + '-' + dd; const h = await av(ctx, `Availability ${route} +30`, baseBody({ searchCriteria: [leg(o, dd, 30)], passengers: ADT1 })); times.push(h.ms);
      if (!ok2(h) || !h.json.availabilityId) { bad.push(`${route}: ${short(errTxt(h), 100)}`); continue; }
      const j = h.json, n = jCount(j); S.sweep[route] = { n, more: j.hasMoreResults, at: Date.now(), json: j };
      const od = ODS(j)[0]; if (!od || od.origin !== o || od.destination !== dd) odBad.push(route);
      const cs = carriersOf(j); const nq = [...cs].filter(c => c !== 'QR'); if (nq.length) { nonQR++; bad.push(`${route}: non-QR carriers ${nq.join('/')}`); }
      journeys += n; (n ? inv : noinv).push(route + (n ? `(${n}${j.hasMoreResults ? '+' : ''})` : ''));
    }
    saveSweep(); S.inv = ROUTES.map(r => r.join('-')).filter(r => S.sweep[r] && S.sweep[r].n > 0);
    const ok = !bad.length && !odBad.length;
    return { v: ok ? 'PASS' : 'FAIL', actual: `${ROUTES.length} routes searched (+30 days, 1 ADT): ${inv.length} with inventory (${journeys} journeys on page 1), ${noinv.length} without (${noinv.join(', ') || 'none'}); median ${Math.round(med(times))} ms, max ${Math.max(...times)} ms. ${bad.length ? 'Problems: ' + bad.join(' | ') + '. ' : 'Every route HTTP 200, QR-only.'}${odBad.length ? ' originDestination mismatch on ' + odBad.join(', ') + '.' : ''} Routes with inventory ("+" = more pages): ${inv.join(', ')}.` };
  });
  // ---------------- TC-ROUTES-QR-02 ----------------
  await tc('TC-ROUTES-QR-02', async ctx => {
    const inv = S.inv || ROUTES.map(r => r.join('-')).filter(r => S.sweep[r] && S.sweep[r].n > 0); if (!inv.length) return { v: 'BLOCKED', actual: 'No route returned inventory in TC-ROUTES-QR-01.' };
    const ok = [], bad = [];
    for (const route of inv) {
      let j = await page1(ctx, route); if (!j) { bad.push(`${route}: Availability failed`); continue; }
      let pm = pickAny(j); if (pm.missing.length) { bad.push(`${route}: no journey with a booking code on every segment`); continue; }
      let s = await sel(ctx, `Select ${route}`, selBody(j, pm.map));
      if (!ok2(s) && (s.status === 404 || s.status === 409)) { j = await page1(ctx, route, true); pm = j ? pickAny(j) : null; if (pm && !pm.missing.length) s = await sel(ctx, `Select ${route} (fresh ids)`, selBody(j, pm.map)); }
      if (!ok2(s) || !s.json.offerId) { bad.push(`${route}: Select ${short(errTxt(s), 90)}`); continue; }
      const f = await fcq(ctx, `FareConfirm ${route}`, fcBody(s.json)); if (!ok2(f) || !f.json.selectedOffer) { bad.push(`${route}: FareConfirm ${short(errTxt(f), 110)}`); continue; }
      const rc = recon(f.json, { ADT: 1 }); if (!rc.ok) { bad.push(`${route}: price does not reconcile (${rc.msgs[0]})`); continue; }
      ok.push(`${route} ${pm.codes[0]} ${totalOf(f.json)} ${rc.currency}`);
    }
    return { v: bad.length ? 'FAIL' : 'PASS', actual: `${inv.length} routes with inventory: ${ok.length} selected and fare-confirmed, ${bad.length} failed.${bad.length ? ' Failures: ' + bad.join(' | ') + '.' : ''} Confirmed: ${ok.slice(0, 60).join('; ')}.` };
  });
  // ---------------- TC-ROUTES-QR-03 ----------------
  await tc('TC-ROUTES-QR-03', async ctx => {
    const more = ROUTES.map(r => r.join('-')).filter(r => S.sweep[r] && S.sweep[r].more); if (!more.length) return { v: 'BLOCKED', actual: 'No route reported hasMoreResults.' };
    const ok = [], bad = []; let timeouts = 0;
    for (const route of more) {
      let j = await page1(ctx, route); if (!j) { bad.push(`${route}: Availability failed`); continue; }
      const seen = new Set(); ODS(j).forEach(od => (od.journeys || []).forEach(jn => seen.add(jKey(j, jn)))); let cur = j, pageNo = 1, last = null, problem = null, sum = [];
      for (let p = 2; p <= 4; p++) {
        let n = await nx(ctx, `NextAvailability ${route} page ${p}`, nextBody(cur));
        if (!ok2(n) && (n.status === 404)) { j = await page1(ctx, route, true); if (j) { cur = j; n = await nx(ctx, `NextAvailability ${route} page ${p} (fresh)`, nextBody(cur)); } }
        if (!ok2(n) || !n.json.availabilityId) { if (timedOut(n)) timeouts++; problem = `page ${p}: ${short(errTxt(n), 100)}`; break; }
        const nj = n.json; let dup = 0; ODS(nj).forEach(od => (od.journeys || []).forEach(jn => { const k = jKey(nj, jn); if (seen.has(k)) dup++; seen.add(k); }));
        if (nj.pageNumber !== p) { problem = `page ${p}: pageNumber ${nj.pageNumber}`; break; } if (dup) { problem = `page ${p}: ${dup} journeys repeated from earlier pages`; break; } if (typeof nj.hasMoreResults !== 'boolean') { problem = `page ${p}: hasMoreResults not boolean`; break; }
        sum.push(jCount(nj)); last = nj; cur = nj; pageNo = p; if (!nj.hasMoreResults) break;
      }
      if (problem) { bad.push(`${route}: ${problem}`); continue; }
      if (last) { const pm = pickAny(last); if (!pm.missing.length) { const s = await sel(ctx, `Select ${route} page ${pageNo}`, selBody(last, pm.map)); if (!ok2(s) || !s.json.offerId) { bad.push(`${route}: page-${pageNo} Select ${short(errTxt(s), 90)}`); continue; } const f = await fcq(ctx, `FareConfirm ${route} page ${pageNo}`, fcBody(s.json)); if (!ok2(f) || !f.json.selectedOffer) { bad.push(`${route}: page-${pageNo} FareConfirm ${short(errTxt(f), 100)}`); continue; } } }
      ok.push(`${route} (${pageNo} pages, journeys per extra page [${sum}])`);
    }
    return { v: bad.length ? 'FAIL' : 'PASS', actual: `${more.length} routes reported hasMoreResults: ${ok.length} paged cleanly (no duplicates, page-N journey selected and fare-confirmed), ${bad.length} failed (${timeouts} supplier timeouts).${bad.length ? ' Failures: ' + bad.join(' | ') + '.' : ''} Clean: ${ok.join('; ')}.` };
  });
  // ---------------- TC-ROUTES-QR-04 ----------------
  await tc('TC-ROUTES-QR-04', async ctx => {
    const offs = [2, 7, 14, 60, 90, 180, 300], rs = [['CAI', 'JED'], ['CAI', 'DOH'], ['DOH', 'CAI'], ['CAI', 'LHR']]; const bad = [], rows = [];
    for (const [o, dd] of rs) { const cells = []; for (const n of offs) {
      const h = await av(ctx, `Availability ${o}-${dd} +${n}`, baseBody({ searchCriteria: [leg(o, dd, n)], passengers: ADT1 }));
      if (!ok2(h) || !h.json.availabilityId) { bad.push(`${o}-${dd} +${n}: ${short(errTxt(h), 90)}`); cells.push(`+${n}:ERR ${h.status}`); continue; }
      const j = h.json, want = d(n).substring(0, 10); const days = new Set(); ODS(j).forEach(od => (od.journeys || []).forEach(jn => days.add(depDay(j, jn))));
      const wrong = [...days].filter(x => x !== want); if (wrong.length) bad.push(`${o}-${dd} +${n}: journeys depart on ${wrong.join(',')} instead of ${want}`); cells.push(`+${n}:${jCount(j)}`); }
      rows.push(`${o}-${dd} [${cells.join(' ')}]`); }
    return { v: bad.length ? 'FAIL' : 'PASS', actual: `Journeys per route and offset: ${rows.join('; ')}.${bad.length ? ' Problems: ' + bad.join(' | ') + '.' : ' Every answer HTTP 200 and every journey departs on the requested date.'}` };
  });
  // ---------------- TC-ROUTES-QR-05 / 06 / 07 ----------------
  const multi = async (ctx, specs, mk) => { const ok = [], bad = []; for (const sp of specs) { const o = await toOffer(ctx, { ...sp, stopAfter: 'fc', types: sp.types || ['ADT'] }); const nm = sp.legs.map(l => l.slice(0, 2).join('-')).join('+'); const lbl = sp.name || nm;
    if (!o.ok) { bad.push(`${lbl}: ${o.failedAt} ${o.why}`); continue; } const f = o.checks.filter(c => !c.pass); if (f.length) { bad.push(`${lbl}: ${f.map(c => c.name + ' (' + short(c.detail, 120) + ')').join('; ')}`); continue; } ok.push(`${lbl} ${o.fcTotal} ${o.currency}`); } return { ok, bad }; };
  await tc('TC-ROUTES-QR-05', async ctx => { const r = await multi(ctx, ['DOH', 'JED', 'RUH', 'DXB', 'LHR', 'MED'].map(x => ({ legs: [['CAI', x, 30], [x, 'CAI', 37]] }))); return { v: r.bad.length ? 'FAIL' : 'PASS', actual: `6 round trips: ${r.ok.length} selected and fare-confirmed, ${r.bad.length} failed.${r.bad.length ? ' Failures: ' + r.bad.join(' | ') + '.' : ''} Confirmed: ${r.ok.join('; ')}.` }; });
  await tc('TC-ROUTES-QR-06', async ctx => { const r = await multi(ctx, [{ legs: [['CAI', 'DOH', 30], ['JED', 'CAI', 37]] }, { legs: [['CAI', 'JED', 30], ['DOH', 'CAI', 37]] }]); const clean = r.bad.every(b => /Select|Availability/.test(b)); return { v: r.bad.length ? 'FAIL' : 'PASS', actual: `2 multi-city requests: ${r.ok.length} fare-confirmed, ${r.bad.length} failed.${r.bad.length ? ' Failures: ' + r.bad.join(' | ') + '.' : ''} ${r.ok.join('; ')}` }; });
  await tc('TC-ROUTES-QR-07', async ctx => { const mixes = [['ADT'], ['ADT', 'ADT', 'ADT', 'ADT'], ['ADT', 'ADT', 'CHD', 'CHD'], ['ADT', 'INF'], ['ADT', 'ADT', 'ADT', 'ADT', 'ADT', 'ADT']].map(t => ({ legs: [['CAI', 'DOH', 30]], types: t, name: Object.entries(cnt(t)).map(([k, v]) => v + k).join('+') })); const r = await multi(ctx, mixes); return { v: r.bad.length ? 'FAIL' : 'PASS', actual: `5 passenger mixes: ${r.ok.length} priced and reconciled, ${r.bad.length} failed.${r.bad.length ? ' Failures: ' + r.bad.join(' | ') + '.' : ''} ${r.ok.join('; ')}` }; });
  // ---------------- TC-ROUTES-QR-08 (classic Search) ----------------
  await tc('TC-ROUTES-QR-08', async ctx => {
    const rs = [['CAI', 'DOH'], ['CAI', 'JED'], ['JED', 'CAI'], ['CAI', 'DXB'], ['CAI', 'LHR'], ['DOH', 'CAI']]; const ok = [], bad = [];
    for (const [o, dd] of rs) { const h = await req(ctx, `Search ${o}-${dd} +30`, 'Search', 'api/V2/FlightSearch/Search', { ...SUPB, isDebug: false, searchCriteria: [leg(o, dd, 30)], passengers: [{ passengerTypeCode: 'ADT', count: '1' }] });
      const j = h.json; if (!j || h.status !== 200 || !Array.isArray(j.offers)) { bad.push(`${o}-${dd}: ${short(errTxt(h), 100)}`); continue; }
      const cs = [...new Set((h.text.match(/"marketingCarrierCode"\s*:\s*"([A-Z0-9]{2})"/g) || []).map(x => x.split('"')[3]))]; const nonQR = cs.filter(c => c !== 'QR');
      if (!j.offers.length) { bad.push(`${o}-${dd}: 200 but offers[] empty`); continue; } if (!j.responseId) { bad.push(`${o}-${dd}: responseId missing`); continue; } if (nonQR.length) { bad.push(`${o}-${dd}: non-QR carriers ${nonQR.join('/')}`); continue; }
      ok.push(`${o}-${dd} ${j.offers.length} offers`); }
    return { v: bad.length ? 'FAIL' : 'PASS', actual: `Classic Search on 6 routes: ${ok.length} returned QR offers, ${bad.length} failed.${bad.length ? ' Failures: ' + bad.join(' | ') + '.' : ''} ${ok.join('; ')}.` };
  });
  // ---------------- booking lifecycle ----------------
  const VOIDED = path.join(__dirname, 'out', 'voided_r2.json'); const done = fs.existsSync(VOIDED) ? JSON.parse(fs.readFileSync(VOIDED, 'utf8')) : [];
  const markDone = (b, how) => { done.push({ pnr: loc(b), gdsPNR: b.gdsPNR, how, at: L.now() }); fs.writeFileSync(VOIDED, JSON.stringify(done)); };
  const chkAdd = (out, n, p, dtl) => { out.checks.push({ name: n, pass: !!p, detail: dtl }); return !!p; };
  const doVoid = async (ctx, out, b, last, o) => { const h = await voidReq(ctx, b, last, o); const j = h.json || {}; const good = h.status === 200 && j.voided === true; if (good) markDone(b, 'void'); return { h, good, j }; };
  const doCancel = async (ctx, out, b, last, o) => { const h = await cancelReq(ctx, b, last, o); const j = h.json || {}; const good = h.status === 200 && j.cancelled === true; if (good) markDone(b, 'cancel'); return { h, good, j }; };
  const retr = async (ctx, out, b, last, exp, label, tol = true) => { const h = await F.retrieve(ctx, b, { surName: last }); out.lastRetr = h; if (!ok2(h)) { if (exp) chkAdd(out, `${label}: Retrieve HTTP 200`, false, short(errTxt(h), 130)); return h; }
    const j = h.json; if (exp) { chkAdd(out, `${label}: same pnr`, (j.pnr || null) === (b.pnr || null) && (!j.gdsPNR || j.gdsPNR === b.gdsPNR), `${j.pnr} vs ${b.pnr}`); chkAdd(out, `${label}: bookingStatus ${exp}`, j.bookingStatus === exp, 'bookingStatus=' + j.bookingStatus);
      const rt = totalOf(j); if (out.bookTotal != null) chkAdd(out, `${label}: total equals the booked total`, rt != null && Math.abs(rt - out.bookTotal) < 0.05, `${rt} vs ${out.bookTotal}`);
      if (out.wantFlights) { const rf = j.selectedOffer && (j.selectedOffer.offerJourneys || []).flatMap(r => j.journeys && j.journeys[r] ? j.journeys[r].segmentRefIds.map(x => flightKey(j.flightSegments[x])) : []); if (rf && rf.length) chkAdd(out, `${label}: carries the selected flights`, JSON.stringify(rf) === JSON.stringify(out.wantFlights), `retrieve ${rf.join('+')}; selected ${out.wantFlights.join('+')}`); }
      if (out.types) chkAdd(out, `${label}: ${out.types.length} passenger(s)`, !j.passengersList || Object.keys(j.passengersList).length === out.types.length, j.passengersList ? Object.keys(j.passengersList).length + ' of ' + out.types.length : 'passengersList not echoed'); } return h; };
  const book = async (ctx, out, term, last) => { const b = await bookIt(ctx, out, term); if (!b) { out.ok = false; out.failedAt = term === 'hold' ? 'Hold' : 'Book'; out.why = short(errTxt(out.bookHop), 150); return null; } const bj = out.bookHop.json; out.bookTotal = totalOf(bj) != null ? totalOf(bj) : (bj.selectedOffer && bj.selectedOffer.priceDetails && bj.selectedOffer.priceDetails.totalAmount.amount);
    chkAdd(out, `${term === 'hold' ? 'Hold' : 'Book'} total equals the FareConfirm total`, out.bookTotal != null && Math.abs(out.bookTotal - out.fcTotal) < 0.05, `${out.bookTotal} vs ${out.fcTotal}`); chkAdd(out, 'pnr and bookingToken present', loc(b) && b.bookingToken, `pnr=${b.pnr} gdsPNR=${b.gdsPNR}`);
    if (term === 'hold') chkAdd(out, 'holdExpirationDate present', !!(bj.holdExpirationDate || (bj.selectedOffer && bj.selectedOffer.holdExpirationDate)), String(bj.holdExpirationDate)); return b; };
  const verdict = (out, tail) => { if (!out.ok) return { v: out.failedAt && /^(Availability)$/.test(out.failedAt) && /no usable journey/.test(out.why || '') ? 'BLOCKED' : 'FAIL', actual: `Flow stopped at ${out.failedAt}: ${out.why}. ${out.checks.filter(c => c.pass).length} check(s) passed before that.` };
    const f = out.checks.filter(c => !c.pass); const pnrs = (out.pnrs || []).join(', '); return { v: f.length ? 'FAIL' : 'PASS', actual: `${f.length ? 'Failed checks: ' + f.map(c => c.name + ' (' + short(c.detail, 150) + ')').join('; ') + '. ' : 'Every check passed. '}${out.checks.length - f.length}/${out.checks.length} checks passed. ${pnrs ? 'PNR ' + pnrs + '. ' : ''}${tail || ''}`.trim() }; };
  const T1 = ['ADT'];
  const prep = async (ctx, spec) => { const o = await toOffer(ctx, { types: T1, last: 'Sabrt', ...spec }); o.pnrs = []; if (o.ok) o.ok = true; return o; };
  const afterVoidRetr = async (ctx, o, b, last, label) => { const h = await retr(ctx, o, b, last, null, label); if (ok2(h)) { const st = h.json.bookingStatus; chkAdd(o, `${label}: voided booking is not reported as live`, !/^(Booked|OnHold)$/i.test(String(st)), `Retrieve after Void returned HTTP 200 bookingStatus=${st}`); return `Retrieve after Void: HTTP 200 bookingStatus=${st}.`; }
    const s = std4xx(h); chkAdd(o, `${label}: Retrieve after Void is a clean 4xx`, s.ok, s.ok ? '' : s.problems.join('; ')); return `Retrieve after Void: ${short(errTxt(h), 110)}.`; };

  await tc('TC-FLOW-V2-SABRT-01', async ctx => { const last = 'Sabrta'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    await retr(ctx, o, b, last, 'Booked', 'Retrieve'); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void returns voided=true with the ticket', v.good && (v.j.voidedTickets || []).length > 0, short(errTxt(v.h), 130) + (v.good ? ' voidedTickets ' + (v.j.voidedTickets || []).length : '')); o.ok = true; const t = v.good ? await afterVoidRetr(ctx, o, b, last, 'After Void') : ''; return verdict(o, `Void answered ${v.h.status} in ${v.h.ms} ms. ${t}`); });
  await tc('TC-FLOW-V2-SABRT-02', async ctx => { const last = 'Sabrtb'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const v = await doVoid(ctx, o, b, last); chkAdd(o, 'First Void succeeds', v.good, short(errTxt(v.h), 130)); o.ok = true; if (!v.good) return verdict(o); const v2 = await voidReq(ctx, b, last, { label: 'Void (second time)' }); const s = std4xx(v2); chkAdd(o, 'Second Void is a clean 4xx', s.ok, v2.status === 200 ? 'second Void answered HTTP 200 ' + JSON.stringify(v2.json).slice(0, 120) : s.problems.join('; ')); return verdict(o, `Second Void: ${short(errTxt(v2), 130)}.`); });
  await tc('TC-FLOW-V2-SABRT-03', async ctx => { const last = 'Sabrtc'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'hold', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const rp = await F.reprice(ctx, b, { surName: last }); chkAdd(o, 'PnrReprice HTTP 200', ok2(rp), short(errTxt(rp), 120)); if (ok2(rp)) { const t = totalOf(rp.json); chkAdd(o, 'PnrReprice total equals the held price', t != null && Math.abs(t - o.bookTotal) < 0.05, `${t} vs ${o.bookTotal}`); }
    await retr(ctx, o, b, last, 'OnHold', 'Retrieve (held)'); const c = await doCancel(ctx, o, b, last); chkAdd(o, 'CancelAfterHold returns cancelled=true', c.good, short(errTxt(c.h), 130) + ' ' + JSON.stringify(c.j).slice(0, 90)); o.ok = true;
    let t = ''; if (c.good) { const h = await retr(ctx, o, b, last, null, 'After CancelAfterHold'); if (ok2(h)) { chkAdd(o, 'After CancelAfterHold: the hold is not reported as OnHold', h.json.bookingStatus !== 'OnHold', `Retrieve after CancelAfterHold returned HTTP 200 bookingStatus=${h.json.bookingStatus}`); t = `Retrieve after cancel: HTTP 200 bookingStatus=${h.json.bookingStatus}.`; } else { const s = std4xx(h); chkAdd(o, 'After CancelAfterHold: Retrieve is a clean 4xx', s.ok, s.problems.join('; ')); t = `Retrieve after cancel: ${short(errTxt(h), 110)}.`; } } return verdict(o, t); });
  await tc('TC-FLOW-V2-SABRT-04', async ctx => { const last = 'Sabrtd'; const o = await prep(ctx, { legs: [['CAI', 'JED', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'hold', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const ba = await F.bookAfterHold(ctx, b, { surName: last }); chkAdd(o, 'BookAfterHold HTTP 200', ok2(ba), short(errTxt(ba), 130)); if (!ok2(ba)) { o.ok = true; const c = await doCancel(ctx, o, b, last, { label: 'CancelAfterHold (clean-up)' }); return verdict(o, `BookAfterHold failed; hold ${c.good ? 'cancelled' : 'left on hold'}.`); }
    const j = ba.json; chkAdd(o, 'BookAfterHold keeps pnr and bookingToken', (j.pnr || null) === (b.pnr || null) && (!j.bookingToken || j.bookingToken === b.bookingToken), `pnr ${j.pnr} token ${j.bookingToken}`); chkAdd(o, 'BookAfterHold issues a ticket', j.tickets && Object.keys(j.tickets).length > 0, 'tickets ' + JSON.stringify(j.tickets || null).slice(0, 100));
    await retr(ctx, o, b, last, 'Booked', 'Retrieve'); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void returns voided=true', v.good, short(errTxt(v.h), 130)); o.ok = true; return verdict(o, `Void ${v.h.status}.`); });
  await tc('TC-FLOW-V2-SABRT-05', async ctx => { const last = 'Sabrte'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30], ['DOH', 'CAI', 37]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    await retr(ctx, o, b, last, 'Booked', 'Retrieve'); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void returns voided=true', v.good, short(errTxt(v.h), 130)); o.ok = true; return verdict(o, `Void ${v.h.status}; ticket count ${(v.j.voidedTickets || []).length}.`); });
  await tc('TC-FLOW-V2-SABRT-06', async ctx => { const last = 'Sabrtf'; const o = await prep(ctx, { legs: [['CAI', 'LHR', 30]], last, connecting: true }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    chkAdd(o, 'Selected journey is connecting (2+ segments)', o.wantFlights.length > 1, `${o.wantFlights.length} segments`); await retr(ctx, o, b, last, 'Booked', 'Retrieve'); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void returns voided=true', v.good, short(errTxt(v.h), 130)); o.ok = true; return verdict(o, `Void ${v.h.status}.`); });
  await tc('TC-FLOW-V2-SABRT-07', async ctx => { const last = 'Sabrtg'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const c = await cancelReq(ctx, b, last, { label: 'CancelAfterHold on a Booked PNR' }); const s = std4xx(c); if (c.status === 200 && c.json && c.json.cancelled) markDone(b, 'cancel'); chkAdd(o, 'CancelAfterHold on a ticketed PNR is a clean 4xx', s.ok, c.status === 200 ? 'HTTP 200 ' + JSON.stringify(c.json).slice(0, 120) : s.problems.join('; '));
    const h = await retr(ctx, o, b, last, null, 'After rejected cancel'); if (ok2(h)) chkAdd(o, 'Booking still Booked after the rejected cancel', h.json.bookingStatus === 'Booked', 'bookingStatus=' + h.json.bookingStatus); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void then succeeds', v.good, short(errTxt(v.h), 120)); o.ok = true; return verdict(o, `CancelAfterHold on Booked: ${short(errTxt(c), 120)}.`); });
  await tc('TC-FLOW-V2-SABRT-08', async ctx => { const last = 'Sabrth'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const w1 = await voidReq(ctx, b, 'Wrongname', { label: 'Void (wrong surName)' }); const s1 = std4xx(w1); chkAdd(o, 'Void with a wrong surName is a clean 4xx', s1.ok, w1.status === 200 ? 'HTTP 200 ' + JSON.stringify(w1.json).slice(0, 100) : s1.problems.join('; ')); if (w1.status === 200 && w1.json && w1.json.voided) markDone(b, 'void');
    const w2 = await voidReq(ctx, { ...b, bookingToken: String(b.bookingToken).split('').reverse().join('') }, last, { label: 'Void (wrong bookingToken)' }); const s2 = std4xx(w2); chkAdd(o, 'Void with a wrong bookingToken is a clean 4xx', s2.ok, w2.status === 200 ? 'HTTP 200 ' + JSON.stringify(w2.json).slice(0, 100) : s2.problems.join('; '));
    const h = await retr(ctx, o, b, last, null, 'After rejected voids'); if (ok2(h)) chkAdd(o, 'Booking still Booked after the rejected voids', h.json.bookingStatus === 'Booked', 'bookingStatus=' + h.json.bookingStatus); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Correct Void then succeeds', v.good || (w1.status === 200 || w2.status === 200), short(errTxt(v.h), 120)); o.ok = true; return verdict(o, `Wrong surName: ${short(errTxt(w1), 110)}. Wrong token: ${short(errTxt(w2), 110)}.`); });
  await tc('TC-FLOW-V2-SABRT-09', async ctx => { const last = 'Sabrti'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const mk = async (label, bb, sn) => { const h = await F.retrieve(ctx, bb, sn); h.label = label; const s = std4xx(h); chkAdd(o, `${label} is a clean 4xx`, s.ok, h.status === 200 ? 'HTTP 200 (accepted)' : s.problems.join('; ')); return h; };
    const a1 = await mk('Retrieve (unknown pnr)', { pnr: 'ZZZZZZ', gdsPNR: 'ZZZZZZ', bookingToken: b.bookingToken }, { surName: last }); const a2 = await mk('Retrieve (wrong surName)', b, { surName: 'Wrongname' }); const a3 = await mk('Retrieve (no bookingToken)', { pnr: b.pnr, gdsPNR: b.gdsPNR }, { surName: last });
    const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void clean-up succeeds', v.good, short(errTxt(v.h), 100)); o.ok = true; return verdict(o, `Unknown pnr: ${short(errTxt(a1), 90)}. Wrong surName: ${short(errTxt(a2), 90)}. No token: ${short(errTxt(a3), 90)}.`); });
  await tc('TC-FLOW-V2-SABRT-10', async ctx => { const last = 'Sabrtj'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const h2 = await F.bookLike(ctx, 'book', o.cur.id, o.cur.off, {}); let b2 = null; if (ok2(h2) && (h2.json.pnr || h2.json.gdsPNR)) { b2 = bookOf(h2); R.cleanup({ kind: 'needs_void_cancel', pnr: loc(b2), related_tc_id: ctx.id, note: 'Created by the second Book with identical ids' }); }
    const s = std4xx(h2); const same = b2 && loc(b2) === loc(b); chkAdd(o, 'Second Book with the same ids is rejected (clean 4xx) or returns the same pnr', !b2 ? s.ok : same, b2 ? (same ? 'same pnr returned' : `a second PNR ${loc(b2)} was created for the same offer`) : s.problems.join('; '));
    const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void of the first PNR', v.good, short(errTxt(v.h), 100)); if (b2 && !same) { const v2 = await voidReq(ctx, b2, last, { label: 'Void (second PNR)' }); if (v2.status === 200 && v2.json && v2.json.voided) markDone(b2, 'void'); o.pnrs.push(loc(b2)); } o.ok = true; return verdict(o, `Second Book: ${b2 ? 'HTTP 200 pnr ' + loc(b2) : short(errTxt(h2), 130)}.`); });
  await tc('TC-FLOW-V2-SABRT-11', async ctx => { const last = 'Sabrtk'; const T = ['ADT', 'CHD', 'INF']; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last, types: T }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b)); o.types = T;
    chkAdd(o, 'Book lists 3 passengers', !o.bookHop.json.passengersList || Object.keys(o.bookHop.json.passengersList).length === 3, JSON.stringify(Object.keys(o.bookHop.json.passengersList || {}))); await retr(ctx, o, b, last, 'Booked', 'Retrieve'); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void returns voided=true', v.good, short(errTxt(v.h), 120)); o.ok = true; return verdict(o, `Tickets voided: ${(v.j.voidedTickets || []).length}.`); });
  await tc('TC-FLOW-V2-SABRT-12', async ctx => { const rs = [['CAI', 'JED'], ['CAI', 'RUH'], ['JED', 'CAI'], ['CAI', 'DXB'], ['DOH', 'CAI'], ['CAI', 'LHR'], ['CAI', 'JFK']]; const ok = [], bad = []; let i = 0;
    for (const [a, z] of rs) { i++; const last = 'Sabrtl' + String.fromCharCode(96 + i); const o = await prep(ctx, { legs: [[a, z, 30]], last, seed: i }); const nm = a + '-' + z; if (!o.ok) { bad.push(`${nm}: ${o.failedAt} ${o.why}`); continue; } const b = await book(ctx, o, 'book', last); if (!b) { bad.push(`${nm}: ${o.failedAt} ${o.why}`); continue; }
      await retr(ctx, o, b, last, 'Booked', 'Retrieve'); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void', v.good, short(errTxt(v.h), 100)); const f = o.checks.filter(c => !c.pass); if (f.length) bad.push(`${nm} (pnr ${loc(b)}): ${f.map(c => c.name + ' (' + short(c.detail, 100) + ')').join('; ')}`); else ok.push(`${nm} ${loc(b)} ${o.bookTotal} ${o.currency}`); }
    return { v: bad.length ? 'FAIL' : 'PASS', actual: `7 routes booked, retrieved and voided: ${ok.length} clean, ${bad.length} failed.${bad.length ? ' Failures: ' + bad.join(' | ') + '.' : ''} ${ok.join('; ')}.` }; });
  await tc('TC-FLOW-V2-SABRT-13', async ctx => { const last = 'Sabrtm'; const o = await prep(ctx, { legs: [['CAI', 'DOH', 30]], last }); if (!o.ok) return verdict(o); const b = await book(ctx, o, 'hold', last); if (!b) return verdict(o); o.pnrs.push(loc(b));
    const w = await voidReq(ctx, b, last, { label: 'Void on a held PNR' }); const s = std4xx(w); if (w.status === 200 && w.json && w.json.voided) markDone(b, 'void'); chkAdd(o, 'Void on an unticketed hold is a clean 4xx', s.ok, w.status === 200 ? 'HTTP 200 ' + JSON.stringify(w.json).slice(0, 100) : s.problems.join('; '));
    const c = await doCancel(ctx, o, b, last); chkAdd(o, 'CancelAfterHold then cancels the hold', c.good || (w.status === 200 && w.json && w.json.voided), short(errTxt(c.h), 120)); o.ok = true; return verdict(o, `Void on hold: ${short(errTxt(w), 130)}.`); });
  await tc('TC-FLOW-V2-SABRT-14', async ctx => { const last = 'Sabrtn'; const o = { ok: false, checks: [], pnrs: [], types: T1 }; const fail = (s, w) => { o.failedAt = s; o.why = w; return verdict(o); };
    const sr = await req(ctx, 'Search CAI-DOH +30', 'Search', 'api/V2/FlightSearch/Search', { ...SUPB, isDebug: false, searchCriteria: [leg('CAI', 'DOH', 30)], passengers: [{ passengerTypeCode: 'ADT', count: '1' }] }); if (!ok2(sr) || !Array.isArray(sr.json.offers) || !sr.json.offers.length) return fail('Search', short(errTxt(sr), 140));
    const f = await fcq(ctx, 'FareConfirm', { ...SUPB, ResponseId: sr.json.responseId, selectedOfferId: sr.json.offers[0].offerId }); if (!ok2(f) || !f.json.selectedOffer) return fail('FareConfirm', short(errTxt(f), 140));
    o.fcTotal = totalOf(f.json); const rc = recon(f.json, { ADT: 1 }); chkAdd(o, 'FareConfirm price reconciles', rc.ok, rc.msgs.join('; '));
    const a = await F.addPax(ctx, f.json.responseId, f.json.selectedOffer.offerId, T1, { seed: 1, last }); if (!ok2(a) || !a.json.offerId) return fail('AddPassengerDetails', short(errTxt(a), 140)); o.cur = { id: a.json.responseId, off: a.json.offerId };
    const b = await book(ctx, o, 'book', last); if (!b) return verdict(o); o.pnrs.push(loc(b)); await retr(ctx, o, b, last, 'Booked', 'Retrieve'); const v = await doVoid(ctx, o, b, last); chkAdd(o, 'Void returns voided=true', v.good, short(errTxt(v.h), 120)); o.ok = true; return verdict(o, `Void ${v.h.status}.`); });
};
