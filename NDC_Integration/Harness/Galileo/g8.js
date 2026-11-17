// Group 8 (Round 4 additions): TC-FLOW-V2-GALBOOK-14..16 — Hold -> Retrieve -> CancelAfterHold lifecycle and cancel negatives.
const G = require('./gl'); const F = require('./gchain'); const G7 = require('./g7');
const { tc, errTxt, short, std4xx, fs, path, R } = G; const { ok2 } = F; const { bookFlow } = G7;
const T3 = ['ADT', 'ADT', 'INF'];
const released = []; const saveRel = () => fs.writeFileSync(path.join(__dirname, 'released_r4.json'), JSON.stringify(released));
const loc = b => b && (b.pnr || b.gdsPNR);
async function cancelAndCheck(ctx, o) {
  const B = o.booking; const c = await F.cancelHold(ctx, B, {}); const cj = c.json || {};
  const cancelled = c.status === 200 && cj.cancelled === true;
  if (cancelled) { released.push(loc(B)); saveRel(); }
  const r = await F.retrieve(ctx, B, { surName: o.surname });
  let after, afterOk;
  if (ok2(r)) { after = `Retrieve HTTP 200 bookingStatus=${r.json.bookingStatus}`; afterOk = r.json.bookingStatus && !/^OnHold$/i.test(r.json.bookingStatus); }
  else { const s = std4xx(r); after = `Retrieve HTTP ${r.status}: ${short(errTxt(r), 150)}${s.ok ? '' : ' — PROBLEM: ' + s.problems.join('; ')}`; afterOk = s.ok; }
  const stillHeld = ok2(r) && /^OnHold$/i.test(r.json.bookingStatus || ''); return { c, cancelled, stillHeld, cMsg: `CancelAfterHold HTTP ${c.status}: ${c.status === 200 ? JSON.stringify({ cancelled: cj.cancelled, message: cj.message }) : short(errTxt(c), 200)}`, after, afterOk, retr: r };
}
module.exports = async function (S = {}) {
  let cancelledBooking = null;
  await tc('TC-FLOW-V2-GALBOOK-14', async ctx => {
    const o = await bookFlow(ctx, { legs: [['CAI', 'JED', 30]], types: T3, enrich: {}, hold: true, last: 'Nasser', seed: 7 });
    if (!o.booking) return { v: 'BLOCKED', actual: `Hold could not be created (flow stopped at ${o.failedAt}: ${o.why}), so CancelAfterHold could not be judged.` };
    o.surname = 'Nasser'; const x = await cancelAndCheck(ctx, o); if (x.cancelled) cancelledBooking = { b: o.booking, surname: 'Nasser' };
    const pre = o.ok ? 'Hold and Retrieve (OnHold) passed' : `Hold created (locator ${loc(o.booking)}) but the flow reported ${o.failedAt}: ${o.why}`;
    const ok = x.cancelled && x.afterOk; const m = x.cancelled && x.cj && x.cj.message;
    return { v: ok ? 'PASS' : 'FAIL', actual: `${pre}. ${x.cMsg}. After cancel: ${x.after}.${x.stillHeld ? ' The hold is still reported as OnHold after a successful cancel.' : ''}`,
      unknown: x.cancelled ? ['Galileo/EGY V2 CancelAfterHold on a held booking (pnr=null + gdsPNR + bookingToken): ' + x.cMsg + '; Retrieve afterwards: ' + x.after + '.'] : undefined };
  });
  await tc('TC-FLOW-V2-GALBOOK-15', async ctx => {
    const o = await bookFlow(ctx, { legs: [['CAI', 'JED', 30]], types: ['ADT'], enrich: {}, hold: true, last: 'Pasha', seed: 9 });
    if (!o.booking) return { v: 'BLOCKED', actual: `A live hold could not be created (flow stopped at ${o.failedAt}: ${o.why}), so the cancel variants cannot be judged.` };
    const B = o.booking, sn = 'Pasha', res = [];
    const tryIt = async (label, fn) => { const h = await fn(); const s = std4xx(h); res.push({ label, ok: s.ok, h, note: `HTTP ${h.status} ${short(errTxt(h), 150)}${s.ok ? '' : ' — PROBLEM: ' + s.problems.join('; ')}` }); return h; };
    // A: wrong bookingToken on the LIVE hold must be refused and must not cancel the hold
    const wrong = 'INVALID-TOKEN';
    const hA = await F.cancelHold(ctx, { ...B, bookingToken: wrong }, {}); const cancelledByWrong = hA.status === 200 && hA.json && hA.json.cancelled === true; const sA = std4xx(hA);
    res.push({ label: 'A bookingToken that is not a booking token (INVALID-TOKEN) on a live hold', ok: !cancelledByWrong && sA.ok, note: cancelledByWrong ? 'HTTP 200 cancelled=true — the hold was cancelled with a wrong bookingToken (token not validated)' : `HTTP ${hA.status} ${short(errTxt(hA), 150)}${sA.ok ? '' : ' — PROBLEM: ' + sA.problems.join('; ')}` });
    if (cancelledByWrong) released.push(loc(B)); else { const c = await F.cancelHold(ctx, B, {}); if (c.status === 200 && c.json && c.json.cancelled === true) released.push(loc(B)); res.push({ label: 'B proper cancel of the live hold', ok: c.status === 200 && c.json && c.json.cancelled === true, note: `HTTP ${c.status} ${c.status === 200 ? JSON.stringify({ cancelled: c.json.cancelled, message: c.json.message }) : short(errTxt(c), 150)}` }); }
    saveRel();
    await tryIt('C cancel the same booking again', () => F.cancelHold(ctx, B, {}));
    await tryIt('D no pnr and no gdsPNR', () => F.cancelHold(ctx, { bookingToken: B.bookingToken }, {}));
    await tryIt('E BookAfterHold on the cancelled hold', () => F.bookAfterHold(ctx, B, { surName: sn }));
    return { v: res.every(r => r.ok) ? 'PASS' : 'FAIL', actual: res.map(r => `[${r.label}] ${r.ok ? 'ok' : 'PROBLEM'}: ${r.note}`).join(' | ') };
  });
  await tc('TC-FLOW-V2-GALBOOK-16', async ctx => {
    const o = await bookFlow(ctx, { legs: [['CAI', 'JED', 30]], types: T3, enrich: { anc: true, seat: true }, hold: true, skipFareCheck: true, expectSel: true, last: 'Okasha', seed: 8 });
    if (!o.booking) return { v: 'BLOCKED', actual: `Hold with baggage and seats could not be created (flow stopped at ${o.failedAt}: ${o.why}), so CancelAfterHold could not be judged.` };
    o.surname = 'Okasha'; const x = await cancelAndCheck(ctx, o);
    const failedChecks = o.checks.filter(c => !c.pass).map(c => c.name);
    const ok = x.cancelled && x.afterOk;
    return { v: ok ? 'PASS' : 'FAIL', actual: `Hold with baggage (${(o.sel.anc || []).length} item(s)) and seats (${(o.sel.seats || []).length}) created, locator ${loc(o.booking)}${failedChecks.length ? '; earlier checks that failed: ' + failedChecks.join('; ') : ''}. ${x.cMsg}. After cancel: ${x.after}.` };
  });
  await tc('TC-FLOW-V2-GALBOOK-17', async ctx => {
    const keep = process.env.PREFER_CARRIER; delete process.env.PREFER_CARRIER; const rows = [];
    try {
      for (const skip of [0, 1, 2, 3]) {
        const o = await bookFlow(ctx, { legs: [['CAI', 'JED', 30]], types: ['ADT'], enrich: {}, hold: true, skip, last: 'Held' + 'abcd'[skip], seed: 30 + skip });
        const fk = (o.wantFlights || ['?']).join('+').replace(/@.*T/, ' ').replace(/:00$/, '');
        if (o.booking) { o.surname = 'Held' + 'abcd'[skip]; const x = await cancelAndCheck(ctx, o); rows.push({ fk, ok: o.ok || !!o.booking, note: 'held ' + loc(o.booking) + '; ' + x.cMsg }); }
        else rows.push({ fk, ok: false, note: 'not held: stopped at ' + o.failedAt + ': ' + short(o.why || '', 150) });
      }
    } finally { if (keep) process.env.PREFER_CARRIER = keep; }
    const bad = rows.filter(r => !r.ok);
    return { v: bad.length ? 'FAIL' : 'PASS', actual: bad.length + ' of ' + rows.length + ' offered journeys could not be held. ' + rows.map(r => '[' + r.fk + '] ' + r.note).join(' | ') };
  });
};
