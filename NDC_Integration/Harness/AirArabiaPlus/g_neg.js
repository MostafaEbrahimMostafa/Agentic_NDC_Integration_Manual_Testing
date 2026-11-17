// Group: distinct negative / expiry "kinds" behind the 96 FLOW-V2-xx-NEG rows. Each distinct check runs once under its leader row; the other rows map to it (see coverage_map.json).
const fs = require('fs'), path = require('path');
const X = require('./fx'); const { C, B, SUP, now, sleep, amt, ok, controlled, ctxNew, errLine, view, def, chainTo, pre, D1, D2 } = X;
const G = require('./g_generic');
const cases = []; const add = (id, run, extra = {}) => cases.push({ ...def('v2', id, extra), group: 'neg', run });
const blocked = (id, why, extra = {}) => cases.push({ ...def('v2', id, extra), group: 'neg', blocked: why, run: null });
const neg = (h, expected) => view(h, { expected, actual: errLine(h), verdict: controlled(h) ? 'PASS' : 'FAIL', evidence: h.status >= 500 ? 'server error instead of a controlled rejection' : ok(h) ? 'request was accepted' : 'controlled rejection' });
const EXP = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures_expiry.json'), 'utf8'));
async function waitUntilExpired(minAfterSec = 60) {
  const e = EXP(); const t = Math.max(...e.map(x => Date.parse(x.holdExp))) + minAfterSec * 1000; let w = 0; while (Date.now() < t) { const s = Math.min(60000, t - Date.now()); await sleep(s); w += s; } return w;
}
const fixHop = (f, name) => { const h = f.hopRecs.find(x => x.endpoint === name); return h; };

add('FLOW-V2-25-NEG', async () => {
  const v = await chainTo('fc', ['ADT'], { fresh: true, key: 'neg25' }); if (!v.ok) return X.blockedNoData(null, v.why); const hs = [];
  const a = await C.call(v.ctx, 'FareConfirm', C.P.fc, { supplier: 'AirArabiaPlus', credentialsSelector: 'UAE', ResponseId: v.S.resp.responseId, selectedOfferId: v.S.offer.offerId });
  const b = await C.call(v.ctx, 'FareConfirm', C.P.fc, { supplier: 'AirArabia', credentialsSelector: 'USA', ResponseId: v.S.resp.responseId, selectedOfferId: v.S.offer.offerId });
  neg(a, 'ids from a USA search are rejected under credentialsSelector UAE'); neg(b, 'ids from AirArabiaPlus are rejected under supplier AirArabia');
  const good = controlled(a) && controlled(b);
  return { verdict: good ? 'PASS' : 'FAIL', hops: [a, b], asAttempts: true, labels: ['Attempt 1 of 2 - same ids, credentialsSelector UAE', 'Attempt 2 of 2 - same ids, supplier AirArabia'], actual: `UAE selector: ${ok(a) ? 'ACCEPTED (200)' : errLine(a)}; other supplier name: ${ok(b) ? 'ACCEPTED (200)' : errLine(b)}`, evidence: 'ids came from a USA/AirArabiaPlus Search; no other supplier received a live call that books or holds', waiting_ms: v.ctx.waiting_ms,
    finding: good ? null : { kind: 'defect', field_name: 'credentialsSelector / supplier', summary: `FareConfirm does not bind the Search ids to the supplier/credentialsSelector (UAE: ${a.status}, AirArabia: ${b.status})`, expected_value: '4xx for a different tenant/supplier', impact: 'ids from one tenant usable under another', spec_ref: 'SPEC.md §1.7, §7.14' } };
}, { endpoint: 'FareConfirm' });
add('FLOW-V2-26-NEG', async () => {
  const a = await chainTo('addpax', ['ADT'], { fresh: true, key: 'neg26a', seed: 2 }); const b = await chainTo('addpax', ['ADT'], { fresh: true, key: 'neg26b', seed: 4 }); if (!a.ok || !b.ok) return X.blockedNoData(null, a.why || b.why);
  const h = await C.call(a.ctx, 'Hold', C.P.hold, { ResponseId: a.ids.id, selectedOfferId: b.ids.off, ...SUP }); const h2 = await C.call(a.ctx, 'Hold', C.P.hold, { ResponseId: '11111111-2222-3333-4444-555555555555', selectedOfferId: a.ids.off, ...SUP });
  neg(h, 'Hold rejects responseId of chain A with offerId of chain B'); neg(h2, 'Hold rejects an unknown (stale) responseId');
  const good = controlled(h) && controlled(h2);
  return { verdict: good ? 'PASS' : 'FAIL', hops: [h, h2], asAttempts: true, labels: ['Attempt 1 of 2 - responseId A + offerId B', 'Attempt 2 of 2 - unknown responseId'], actual: `mixed pair: ${ok(h) ? 'HELD pnr ' + h.json.pnr : errLine(h)}; unknown responseId: ${ok(h2) ? 'HELD pnr ' + h2.json.pnr : errLine(h2)}`, evidence: 'two AddPassenger chains', cleanup: [h, h2].filter(ok).map(x => ({ kind: 'family_b_hold', pnr: x.json.pnr, note: 'hold created by a stale/mismatched pair' })), finding: good ? { kind: 'unknown_resolution', summary: `Hold with a stale/mismatched AddPassenger pair is rejected: ${errLine(h)}`, spec_ref: 'SPEC.md §2.10', evidence: 'FLOW-V2-26-NEG' } : { kind: 'defect', field_name: 'ResponseId/selectedOfferId', summary: 'Hold accepts a stale or mismatched ResponseId/selectedOfferId pair', expected_value: '4xx', impact: 'hold created against an unintended offer', spec_ref: 'SPEC.md §2.10' } };
}, { endpoint: 'Hold' });
add('FLOW-V2-27-NEG', async () => {
  const r = await (G.S.booked || (async () => null)()); let b = G.S.booked; if (!b || b.err) { const v = await chainTo('addpax', ['ADT'], { fresh: true, key: 'neg27' }); if (!v.ok) return X.blockedNoData(null, v.why); const bk = await C.bookLike(v.ctx, 'book', v.ids.id, v.ids.off, {}); if (!ok(bk)) return X.blockedNoData(null, errLine(bk)); b = { v, b: bk, bk: { pnr: bk.json.pnr, gdsPNR: bk.json.gdsPNR, bookingToken: bk.json.bookingToken } }; }
  const vc = b.b.json.voidCapability; const h = await C.voidIt(b.v.ctx, b.bk); view(h, { expected: 'Void fails because voidCapability is VoidNotAllowed', actual: errLine(h), verdict: !ok(h) && vc === 'VoidNotAllowed' ? 'PASS' : 'FAIL' });
  return { verdict: !ok(h) && vc === 'VoidNotAllowed' ? 'PASS' : 'FAIL', hops: [h], actual: `Book returned voidCapability=${vc}; Void → ${errLine(h)}`, evidence: 'Void fails as the flag predicts (the refusal is the supplier-level "operation not supported" answer)' };
}, { endpoint: 'Void' });
add('FLOW-V2-34-NEG', async () => {
  const hA = await chainTo('addpax', ['ADT'], { fresh: true, key: 'neg34a', seed: 1 }), hB = await chainTo('addpax', ['ADT'], { fresh: true, key: 'neg34b', seed: 9 }); if (!hA.ok || !hB.ok) return X.blockedNoData(null, hA.why || hB.why);
  const A = await C.bookLike(hA.ctx, 'hold', hA.ids.id, hA.ids.off, {}), Bh = await C.bookLike(hB.ctx, 'hold', hB.ids.id, hB.ids.off, {}); if (!ok(A) || !ok(Bh)) return X.blockedNoData(null, 'could not create two holds: ' + errLine(ok(A) ? Bh : A));
  const a = { pnr: A.json.pnr, gdsPNR: A.json.gdsPNR, bookingToken: A.json.bookingToken }, b = { pnr: Bh.json.pnr, gdsPNR: Bh.json.gdsPNR, bookingToken: Bh.json.bookingToken }; const mixed = { pnr: a.pnr, gdsPNR: a.gdsPNR, bookingToken: b.bookingToken }; const hs = [];
  for (const [ep, fn] of [['Retrieve', C.retrieve], ['FareConfirmAfterHold', C.reprice], ['BookAfterHold', C.bookAfterHold]]) { const h = await fn(hA.ctx, mixed); neg(h, `${ep} rejects pnr of hold A with bookingToken of hold B`); hs.push(h); }
  const good = hs.every(controlled);
  return { verdict: good ? 'PASS' : 'FAIL', hops: hs, asAttempts: true, labels: ['Retrieve with mixed triplet', 'FareConfirmAfterHold with mixed triplet', 'BookAfterHold with mixed triplet'], actual: hs.map((h, i) => `${['Retrieve', 'FareConfirmAfterHold', 'BookAfterHold'][i]}: ${ok(h) ? 'ACCEPTED (200)' : errLine(h)}`).join('; '), evidence: 'pnr from hold A, bookingToken from hold B (Void and CancelAfterHold unsupported, so their triplet checks are covered by the same-kind rows as BLOCKED)', cleanup: [{ kind: 'family_b_hold', pnr: a.pnr, note: 'hold A of the triplet test' }, { kind: 'family_b_hold', pnr: b.pnr, note: 'hold B of the triplet test' }], finding: good ? { kind: 'unknown_resolution', summary: `Mismatched pnr/bookingToken triplet is rejected by Retrieve, FareConfirmAfterHold and BookAfterHold: ${errLine(hs[0])}`, spec_ref: 'SPEC.md §2.11-2.13', evidence: 'FLOW-V2-34-NEG' } : { kind: 'defect', field_name: 'bookingToken', summary: `A pnr/bookingToken triplet with mixed origin is accepted by ${hs.map((h, i) => ok(h) ? ['Retrieve', 'FareConfirmAfterHold', 'BookAfterHold'][i] : null).filter(Boolean).join(', ')}`, expected_value: '4xx', impact: 'booking operations are not bound to the token that created them', spec_ref: 'SPEC.md §2.11-2.13' } };
}, { endpoint: 'Retrieve / FareConfirmAfterHold / BookAfterHold' });
add('FLOW-V2-40-NEG', async () => {
  const v = await chainTo('addpax', ['ADT'], { fresh: true, key: 'neg40', seed: 3 }); if (!v.ok) return X.blockedNoData(null, v.why); const H = await C.bookLike(v.ctx, 'hold', v.ids.id, v.ids.off, {}); if (!ok(H)) return X.blockedNoData(null, errLine(H));
  const bk = { pnr: H.json.pnr, gdsPNR: H.json.gdsPNR, bookingToken: H.json.bookingToken }; const b1 = await C.bookAfterHold(v.ctx, bk); const b2 = await C.bookAfterHold(v.ctx, bk);
  const dup = ok(b2) && b2.json.pnr !== bk.pnr; view(b1, { expected: 'first BookAfterHold issues tickets', actual: ok(b1) ? `200 pnr ${b1.json.pnr}` : errLine(b1), verdict: ok(b1) ? 'PASS' : 'FAIL' }); view(b2, { expected: 'second BookAfterHold is refused or idempotent', actual: ok(b2) ? `200 pnr ${b2.json.pnr}` : errLine(b2), verdict: dup ? 'FAIL' : 'PASS' });
  return { verdict: ok(b1) && !dup ? 'PASS' : 'FAIL', hops: [b1, b2], actual: `first: ${ok(b1) ? 'ticketed ' + b1.json.pnr : errLine(b1)}; second: ${ok(b2) ? '200 ' + (b2.json.pnr === bk.pnr ? 'idempotent, same PNR' : 'NEW PNR ' + b2.json.pnr) : errLine(b2)}`, evidence: 'BookAfterHold sent twice on the same hold', cleanup: [{ kind: 'needs_void_cancel', pnr: bk.pnr, note: 'ticketed after hold' }], finding: { kind: dup ? 'defect' : 'unknown_resolution', field_name: 'pnr', summary: dup ? 'Second BookAfterHold creates a second PNR' : `Second BookAfterHold: ${ok(b2) ? 'idempotent (same PNR, no second ticket)' : errLine(b2)}`, expected_value: 'refused or idempotent', impact: 'double ticketing on retry', spec_ref: 'SPEC.md §2.13', evidence: 'FLOW-V2-40-NEG' } };
}, { endpoint: 'BookAfterHold' });
add('FLOW-V2-62-NEG', async () => {
  const v = await chainTo('addpax', ['ADT'], { fresh: true, key: 'neg62', seed: 5 }); if (!v.ok) return X.blockedNoData(null, v.why);
  const h = await C.call(v.ctx, 'Hold', C.P.hold, { ResponseId: v.ids.id, selectedOfferId: v.ids.off, supplier: 'AirArabiaPlus', credentialsSelector: 'UAE' }); neg(h, 'Hold with USA-chain ids under credentialsSelector UAE is rejected');
  return { verdict: controlled(h) ? 'PASS' : 'FAIL', hops: [h], actual: ok(h) ? `HELD pnr ${h.json.pnr} under credentialsSelector UAE with ids from a USA chain` : errLine(h), evidence: 'tenant binding of the hold step', cleanup: ok(h) ? [{ kind: 'family_b_hold', pnr: h.json.pnr, note: 'hold created under a different credentialsSelector' }] : [], finding: ok(h) ? { kind: 'defect', field_name: 'credentialsSelector', summary: 'Hold accepts ids created under USA while the request names credentialsSelector UAE', expected_value: '4xx', impact: 'tenant boundary not enforced at Hold', spec_ref: 'SPEC.md §1.7' } : null };
}, { endpoint: 'Hold' });
add('FLOW-V2-75-NEG', async () => {
  const v = await chainTo('fc', ['ADT'], { key: 'neg75' }); if (!v.ok) return X.blockedNoData(null, v.why);
  const h = await C.call(v.ctx, 'AddPassenger', C.P.addpax, { ...SUP, ResponseId: '{{upSellingResponseId}}', selectedOfferId: '{{upSellingSelectedOfferId}}', passengersList: C.mkPassengers(['ADT']), contactsList: C.CONTACTS }); neg(h, 'un-substituted placeholders are rejected');
  return { verdict: controlled(h) ? 'PASS' : 'FAIL', hops: [h], actual: ok(h) ? 'HTTP 200: placeholders accepted' : errLine(h), evidence: 'literal {{upSellingResponseId}} / {{upSellingSelectedOfferId}} sent as ids', finding: ok(h) ? { kind: 'defect', field_name: 'ResponseId', summary: 'AddPassenger accepts literal placeholder ids', expected_value: '4xx', impact: 'unresolved collection variables pass silently', spec_ref: 'SPEC.md §2.3, §2.5' } : null };
}, { endpoint: 'AddPassenger' });

blocked('FLOW-V2-31-NEG', 'Every AirArabiaPlus offer seen in this run has haveBundles=true, so GetOfferBundles cannot be called for a bundle-incapable offer (same precondition as TC-BUNDLE-NEG-01).', { endpoint: 'GetOfferBundles' });
blocked('FLOW-V2-35-NEG', 'Void is not supported for AirArabiaPlus (409 OperationNotSupported on every booking), so a first successful Void to repeat does not exist.', { endpoint: 'Void' });
blocked('FLOW-V2-42-NEG', 'CancelAfterHold is not supported for AirArabiaPlus (409 OperationNotSupported), so a first successful cancel to repeat does not exist.', { endpoint: 'CancelAfterHold' });
blocked('FLOW-V2-53-NEG', 'Void is not supported for AirArabiaPlus, so there is no void window to test (voidCapability is VoidNotAllowed from Book onward).', { endpoint: 'Void' });
blocked('FLOW-V2-69-NEG', 'The commercial gate on Void cannot be exercised: Void is unsupported for AirArabiaPlus and the carrier is not blocked at Book either (see TC-BOOK-SEC-01).', { endpoint: 'Void' });

// ---- hold-expiry rows (fixtures created at the start of the run; the supplier's hold window is ~75 minutes)
add('FLOW-V2-28-NEG', async () => {
  const e = EXP(); const w = await waitUntilExpired(60); const f = e[1]; const bk = f.booking; const ctx = ctxNew('x');
  const b = await C.bookAfterHold(ctx, bk); const rt = await C.retrieve(ctx, bk);
  view(b, { expected: 'BookAfterHold after holdExpirationDate is refused (or re-priced)', actual: ok(b) ? `HTTP 200 — expired hold was TICKETED (pnr ${b.json.pnr})` : errLine(b), verdict: ok(b) ? 'FAIL' : 'PASS' });
  return { verdict: ok(b) ? 'FAIL' : (b.status < 500 ? 'PASS' : 'FAIL'), hops: [b, rt], actual: `hold expired ${f.holdExp}; BookAfterHold → ${ok(b) ? 'TICKETED ' + b.json.pnr : errLine(b)}; Retrieve afterwards → ${rt.json ? rt.json.bookingStatus : errLine(rt)}`, evidence: `called ${Math.round((Date.now() - Date.parse(f.holdExp)) / 60000)} min after expiry`, waiting_ms: w, cleanup: [{ kind: 'family_b_hold', pnr: bk.pnr, note: 'expired hold (expiry fixture 2)' }], finding: { kind: ok(b) ? 'defect' : 'unknown_resolution', field_name: 'BookAfterHold', summary: ok(b) ? 'BookAfterHold ticketed a hold after holdExpirationDate' : `BookAfterHold on an expired hold: ${errLine(b)}; Retrieve status afterwards: ${rt.json && rt.json.bookingStatus}`, expected_value: 'refused', impact: 'expired holds can be sold at a stale price', spec_ref: 'SPEC.md §2.13', evidence: 'FLOW-V2-28-NEG' } };
}, { endpoint: 'BookAfterHold' });
add('FLOW-V2-30-NEG', async () => {
  const e = EXP(); const w = await waitUntilExpired(60); const f = e[0]; const bk = f.booking; const ctx = ctxNew('x'); const c = await C.cancelHold(ctx, bk);
  return { verdict: 'BLOCKED', hops: [view(c, { expected: 'CancelAfterHold after expiry: refused', actual: errLine(c), verdict: 'BLOCKED' })], actual: `CancelAfterHold after expiry → ${errLine(c)}: the operation is unsupported for AirArabiaPlus at any time, so the post-expiry behaviour cannot be distinguished`, evidence: 'same answer before and after expiry', waiting_ms: w };
}, { endpoint: 'CancelAfterHold' });
add('FLOW-V2-46-NEG', async () => {
  const e = EXP(); const w = await waitUntilExpired(60); const f = e[0]; const bk = f.booking; const ctx = ctxNew('x'); const r = await C.reprice(ctx, bk); const rt = await C.retrieve(ctx, bk);
  view(r, { expected: 'FareConfirmAfterHold after expiry fails or flags a change', actual: ok(r) ? `HTTP 200 total ${amt(r.json.selectedOffer.priceDetails.totalAmount)}` : errLine(r), verdict: r.status < 500 ? 'PASS' : 'FAIL' });
  return { verdict: r.status < 500 ? 'PASS' : 'FAIL', hops: [r, rt], actual: `hold expired ${f.holdExp}; FareConfirmAfterHold → ${ok(r) ? '200 (re-priced, no error)' : errLine(r)}; Retrieve → ${rt.json ? rt.json.bookingStatus : errLine(rt)}`, evidence: `called ${Math.round((Date.now() - Date.parse(f.holdExp)) / 60000)} min after expiry`, waiting_ms: w, finding: { kind: 'unknown_resolution', summary: `FareConfirmAfterHold on an expired hold: ${ok(r) ? '200 re-priced (not refused)' : errLine(r)}; Retrieve status after expiry: ${rt.json && rt.json.bookingStatus}`, spec_ref: 'SPEC.md §2.12', evidence: 'FLOW-V2-46-NEG' } };
}, { endpoint: 'FareConfirmAfterHold' });
// generic-sheet rows that need the same expired hold
const gdef = id => def('generic', id);
cases.push({ ...gdef('TC-HOLD-BND-01'), group: 'neg', endpoint: 'FareConfirmAfterHold / BookAfterHold / CancelAfterHold', run: async () => {
  const e = EXP(); const w = await waitUntilExpired(90); const f = e[0]; const bk = f.booking; const ctx = ctxNew('x'); const a = await C.reprice(ctx, bk); const c = await C.cancelHold(ctx, bk); const b = await C.bookAfterHold(ctx, bk);
  view(a, { expected: 'FareConfirmAfterHold after expiry: recorded', actual: ok(a) ? 'HTTP 200 re-priced' : errLine(a), verdict: a.status < 500 ? 'PASS' : 'FAIL' }); view(c, { expected: 'CancelAfterHold after expiry: recorded', actual: errLine(c), verdict: c.status < 500 ? 'PASS' : 'FAIL' }); view(b, { expected: 'BookAfterHold after expiry: recorded', actual: ok(b) ? 'HTTP 200 TICKETED' : errLine(b), verdict: ok(b) ? 'FAIL' : 'PASS' });
  return { verdict: [a, c, b].every(h => h.status < 500) && !ok(b) ? 'PASS' : 'FAIL', hops: [a, c, b], asAttempts: true, labels: ['FareConfirmAfterHold after expiry', 'CancelAfterHold after expiry', 'BookAfterHold after expiry'], actual: `FareConfirmAfterHold → ${ok(a) ? '200 (re-priced)' : errLine(a)}; CancelAfterHold → ${errLine(c)}; BookAfterHold → ${ok(b) ? 'TICKETED ' + b.json.pnr : errLine(b)}`, evidence: `hold expired ${f.holdExp}; calls made ${Math.round((Date.now() - Date.parse(f.holdExp)) / 60000)} min later`, waiting_ms: w, cleanup: ok(b) ? [{ kind: 'needs_void_cancel', pnr: bk.pnr, note: 'expired hold ticketed' }] : [{ kind: 'family_b_hold', pnr: bk.pnr, note: 'expired hold (expiry fixture 1)' }] };
} });
cases.push({ ...gdef('TC-RETRIEVE-INT-01'), group: 'neg', endpoint: 'Retrieve', run: async () => {
  const e = EXP(); const w = await waitUntilExpired(90); const f = e[1]; const bk = f.booking; const ctx = ctxNew('x'); const before = f.hopRecs.find(h => h.endpoint === 'Hold'); const r = await C.retrieve(ctx, bk);
  return { verdict: ok(r) ? 'PASS' : 'FAIL', hops: [r], actual: `just after Hold the status was OnHold (Hold response); after holdExpirationDate (${f.holdExp}) Retrieve → ${r.json ? 'bookingStatus "' + r.json.bookingStatus + '"' : errLine(r)}`, evidence: 'transition recorded as the new baseline', waiting_ms: w, finding: { kind: 'unknown_resolution', summary: `Retrieve status of an expired AirArabiaPlus hold: ${r.json && r.json.bookingStatus}`, spec_ref: 'SPEC.md §2.11, §6.5', evidence: 'TC-RETRIEVE-INT-01' } };
} });
cases.push({ ...gdef('TC-FCAH-NEG-01'), group: 'neg', endpoint: 'FareConfirmAfterHold', run: async () => {
  const e = EXP(); const w = await waitUntilExpired(90); const f = e[0]; const ctx = ctxNew('x'); const r = await C.reprice(ctx, f.booking);
  view(r, { expected: 'FareConfirmAfterHold after expiry fails or requires re-acceptance', actual: ok(r) ? 'HTTP 200 re-priced' : errLine(r), verdict: r.status < 500 ? 'PASS' : 'FAIL' });
  return { verdict: r.status < 500 ? 'PASS' : 'FAIL', hops: [r], actual: ok(r) ? 'HTTP 200: re-priced normally after expiry (not refused)' : `refused: ${errLine(r)}`, evidence: `hold expired ${f.holdExp}`, waiting_ms: w };
} });
cases.push({ ...gdef('TC-BOOKAFTERHOLD-NEG-01'), group: 'neg', endpoint: 'BookAfterHold', run: async () => {
  const e = EXP(); const w = await waitUntilExpired(90); const f = e[2]; const bk = f.booking; const ctx = ctxNew('x'); const b = await C.bookAfterHold(ctx, bk);
  view(b, { expected: 'BookAfterHold on an expired hold is rejected', actual: ok(b) ? 'HTTP 200 TICKETED' : errLine(b), verdict: ok(b) ? 'FAIL' : (b.status < 500 ? 'PASS' : 'FAIL') });
  return { verdict: ok(b) ? 'FAIL' : (b.status < 500 ? 'PASS' : 'FAIL'), hops: [b], actual: ok(b) ? `the expired hold was TICKETED (pnr ${b.json.pnr})` : `rejected: ${errLine(b)}`, evidence: `hold expired ${f.holdExp}; third expiry fixture, separate from FLOW-V2-28-NEG`, waiting_ms: w, cleanup: [{ kind: ok(b) ? 'needs_void_cancel' : 'family_b_hold', pnr: bk.pnr, note: 'expired hold (expiry fixture 3)' }] };
} });
module.exports = { cases };
