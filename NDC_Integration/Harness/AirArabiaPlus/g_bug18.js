// BUG-18 verification (ParentPaxRefId ignored on AddPassenger: infant always attached to the first adult).
// Matrix: pax mix x route; each cell = Search -> FareConfirm (shared) -> AddPassenger -> Book -> Retrieve  and  AddPassenger -> Hold -> Retrieve.
// Expected infant reference (observed live in the original defect): passengerRefId "I<infantPaxIdx>/A<parentPaxIdx>", adults "A<paxIdx>".
// Linkage is read from every place the response carries it: passengersList keys, tickets keys, selectedOffer.passengerFareBreakdown[].passengerRefId.
const X = require('./fx'); const { C, SUP, sleep, ok, controlled, errLine, view, pre } = X;
const cases = [];
const ROUTES = { 'SHJ-COK': ['SHJ', 'COK', '2026-12-12'], 'COK-SHJ': ['COK', 'SHJ', '2026-12-10'], 'AMM-SHJ': ['AMM', 'SHJ', '2026-12-10'], 'SHJ-AMM': ['SHJ', 'AMM', '2026-12-10'], 'MCT-SHJ': ['MCT', 'SHJ', '2026-12-10'] };
// cfg: types, parents {infantPaxIdx: adultPaxIdx} (1-based), order optional (reorder the Pax keys), bookOn: routes that also get a Book case
const CFG = {
  C1: { name: '2 ADT + 1 INF, infant under the SECOND adult (original defect)', types: ['ADT', 'ADT', 'INF'], parents: { 3: 2 }, book: ['SHJ-COK', 'COK-SHJ'] },
  C2: { name: '3 ADT + 2 INF, parents out of order (Pax4 -> Pax3, Pax5 -> Pax1)', types: ['ADT', 'ADT', 'ADT', 'INF', 'INF'], parents: { 4: 3, 5: 1 }, book: ['COK-SHJ'] },
  C3: { name: '2 ADT + 1 CHD + 1 INF, infant under the second adult, child in between', types: ['ADT', 'ADT', 'CHD', 'INF'], parents: { 4: 2 }, book: [] },
  C4: { name: '2 ADT + 1 INF, infant under the FIRST adult (control)', types: ['ADT', 'ADT', 'INF'], parents: { 3: 1 }, book: [] },
  C5: { name: '1 ADT + 1 INF (control)', types: ['ADT', 'INF'], parents: { 2: 1 }, book: [] },
  C6: { name: '3 ADT + 3 INF, parents reversed (Pax4 -> Pax3, Pax5 -> Pax2, Pax6 -> Pax1)', types: ['ADT', 'ADT', 'ADT', 'INF', 'INF', 'INF'], parents: { 4: 3, 5: 2, 6: 1 }, book: [] },
  C7: { name: '3 ADT + 1 CHD + 2 INF (child and two infants), Pax5 -> Pax3, Pax6 -> Pax2', types: ['ADT', 'ADT', 'ADT', 'CHD', 'INF', 'INF'], parents: { 5: 3, 6: 2 }, book: [] },
};
const pax = (cfg, mut) => { const pl = C.mkPassengers(cfg.types); cfg.types.forEach((t, i) => { if (t === 'INF') pl['Pax' + (i + 1)].ParentPaxRefId = 'Pax' + cfg.parents[i + 1]; }); if (mut) mut(pl); return pl; };
const expInf = cfg => Object.entries(cfg.parents).map(([i, a]) => `I${i}/A${a}`).sort();
const expAdt = cfg => cfg.types.map((t, i) => t === 'ADT' ? 'A' + (i + 1) : null).filter(Boolean);

// ---- linkage read-out from any booking-shaped response
function linkage(j, cfg) {
  const src = {
    passengersList: Object.keys(j.passengersList || {}),
    tickets: Object.keys(j.tickets || {}),
    fareBreakdown: ((j.selectedOffer && j.selectedOffer.passengerFareBreakdown) || (j.booking && j.booking.selectedOffer && j.booking.selectedOffer.passengerFareBreakdown) || []).map(p => p.passengerRefId).filter(Boolean),
  };
  const want = expInf(cfg), wantA = expAdt(cfg), lines = []; let present = 0, bad = 0;
  for (const [k, refs] of Object.entries(src)) {
    if (!refs.length) { lines.push(`${k}: (absent)`); continue; } present++;
    const inf = refs.filter(r => /^I/.test(r)).sort(), adt = refs.filter(r => /^A/.test(r)).sort();
    const good = JSON.stringify(inf) === JSON.stringify(want) && wantA.every(a => adt.includes(a)); if (!good) bad++;
    lines.push(`${k}: infants [${inf.join(', ')}] adults [${adt.join(', ')}]${good ? ' OK' : ' MISMATCH (expected infants [' + want.join(', ') + '])'}`);
  }
  return { present, bad, lines, all: src };
}

// ---- shared Search + FareConfirm per (route, cfg)
const FX = {};
async function fxFor(route, ck) {
  const key = route + '|' + ck; if (FX[key] && Date.now() - FX[key].t < 7 * 60 * 1000) return FX[key].v;
  const cfg = CFG[ck]; const ctx = C.newCtx('FX'); const v = { ctx, ok: false };
  const S = await X.sFind(ctx, [ROUTES[route]], cfg.types); v.S = S;
  if (!S.offer) { v.why = 'Search: no usable offer (' + (S.h.status === 200 ? 'offers=[]' : errLine(S.h)) + ')'; return (FX[key] = { t: Date.now(), v }).v; }
  const f = await C.fareConfirm(ctx, S); v.fc = f; if (!ok(f)) { v.why = 'FareConfirm: ' + errLine(f); return (FX[key] = { t: Date.now(), v }).v; }
  v.ids = { id: f.json.responseId, off: f.json.selectedOffer.offerId }; v.ok = true; return (FX[key] = { t: Date.now(), v }).v;
}
const apBody = (v, cfg, mut) => ({ ...SUP, ResponseId: v.ids.id, selectedOfferId: v.ids.off, passengersList: pax(cfg, mut), contactsList: C.CONTACTS });

for (const ck of Object.keys(CFG)) for (const rk of Object.keys(ROUTES)) for (const path of ['HOLD', 'BOOK']) {
  const cfg = CFG[ck]; if (path === 'BOOK' && !(cfg.book === 'all' || cfg.book.includes(rk))) continue;
  const id = `BUG18-${ck}-${rk.replace('-', '')}-${path}`;
  cases.push({ id, group: 'bug18', category: 'Business Rule', endpoint: `AddPassenger / ${path === 'BOOK' ? 'Book' : 'Hold'} / Retrieve`, spec: 'BUG-18 (ADO 65513); SPEC.md §2.5, §2.9',
    title: `[V2][AirArabiaPlus][AddPassenger → ${path === 'BOOK' ? 'Book' : 'Hold'} → Retrieve] ${rk}: ${cfg.name} — infant linked to the declared ParentPaxRefId`,
    expected: `After ${path === 'BOOK' ? 'Book' : 'Hold'} and again after Retrieve, every infant is attached to the adult named in ParentPaxRefId: infant refs [${expInf(cfg).join(', ')}]; passengersList, tickets (Book) and passengerFareBreakdown agree.`,
    run: async () => {
      const v = await fxFor(rk, ck); if (!v.ok) return X.blockedNoData(null, v.why);
      const ctx = v.ctx; const ap = await C.call(ctx, 'AddPassenger', C.P.addpax, apBody(v, cfg)); const hs = [...pre(v).slice(-2), ap];
      view(ap, { expected: '200 with offerId/responseId', actual: ok(ap) ? 'HTTP 200' : errLine(ap), verdict: ok(ap) ? 'PASS' : 'FAIL' });
      if (!ok(ap)) return { verdict: 'FAIL', hops: hs, actual: 'AddPassenger rejected a valid family: ' + errLine(ap), evidence: '', finding: { kind: 'defect', field_name: 'passengersList', summary: `${id}: AddPassenger rejects a valid infant/adult list (${errLine(ap)})`, expected_value: '200', impact: 'family booking cannot be created', spec_ref: 'SPEC.md §2.5', evidence: id } };
      const bk = await C.bookLike(ctx, path === 'BOOK' ? 'book' : 'hold', ap.json.responseId, ap.json.offerId, {}); hs.push(bk);
      view(bk, { expected: '200 with pnr', actual: ok(bk) ? 'HTTP 200 pnr ' + bk.json.pnr : errLine(bk), verdict: ok(bk) ? 'PASS' : 'FAIL' });
      if (!ok(bk)) return { verdict: 'FAIL', hops: hs, actual: `${path} failed: ${errLine(bk)}`, evidence: '', finding: { kind: 'defect', field_name: path, summary: `${id}: ${path} fails after a valid AddPassenger (${errLine(bk)})`, expected_value: '200', impact: 'family cannot be ' + (path === 'BOOK' ? 'ticketed' : 'held'), spec_ref: 'SPEC.md §2.9', evidence: id } };
      const j = bk.json; const L1 = linkage(j, cfg); const exp = j.holdExpirationDate || (j.hold && j.hold.holdExpirationDate) || '';
      await sleep(1500); const rt = await C.retrieve(ctx, j); hs.push(rt);
      const L2 = ok(rt) ? linkage(rt.json, cfg) : { present: 0, bad: 0, lines: ['Retrieve: ' + errLine(rt)] };
      const g1 = L1.present > 0 && L1.bad === 0, g2 = ok(rt) && L2.present > 0 && L2.bad === 0;
      view(rt, { expected: `Retrieve shows infants [${expInf(cfg).join(', ')}]`, actual: L2.lines.join(' | '), verdict: g2 ? 'PASS' : 'FAIL' });
      const verdict = g1 && g2 ? 'PASS' : (L1.present === 0 && !L2.present ? 'BLOCKED' : 'FAIL');
      const cleanup = [{ kind: path === 'BOOK' ? 'needs_void_cancel' : 'family_b_hold', pnr: j.pnr, note: path === 'BOOK' ? 'ticketed test booking; Void is not supported by AirArabiaPlus' : 'held test booking, expires ' + exp }];
      return { verdict, hops: hs, asAttempts: false, actual: `${path} pnr ${j.pnr} — after ${path}: ${L1.lines.join(' | ')} || after Retrieve: ${L2.lines.join(' | ')}`, evidence: `expected infants [${expInf(cfg).join(', ')}]; correlation: ${(bk.rec.response_headers || {}).correlationid || ''}`, cleanup,
        finding: verdict === 'FAIL' ? { kind: 'defect', field_name: 'passengerRefId / ParentPaxRefId', summary: `${id}: infant not attached to its declared parent adult — ${L1.bad ? 'after ' + path + ': ' + L1.lines.filter(l => /MISMATCH/.test(l)).join('; ') : ''}${g2 ? '' : ' after Retrieve: ' + L2.lines.filter(l => /MISMATCH|Retrieve:/.test(l)).join('; ')}`, expected_value: expInf(cfg).join(', '), impact: 'wrong adult responsible for the infant (name change / check-in)', spec_ref: 'BUG-18', evidence: id } : null };
    } });
}

// ---- validation rows around ParentPaxRefId (AddPassenger only, COK-SHJ, 2 ADT + 1 INF)
const NEG = [
  ['N1', 'infant WITHOUT ParentPaxRefId', 'baseline', pl => { delete pl.Pax3.ParentPaxRefId; }],
  ['N2', 'ParentPaxRefId points to a passenger that does not exist ("Pax9")', 'reject', pl => { pl.Pax3.ParentPaxRefId = 'Pax9'; }],
  ['N3', 'ParentPaxRefId points to the infant itself ("Pax3")', 'reject', pl => { pl.Pax3.ParentPaxRefId = 'Pax3'; }],
  ['N4', 'ParentPaxRefId is an empty string', 'baseline', pl => { pl.Pax3.ParentPaxRefId = ''; }],
  ['N5', 'ParentPaxRefId in lower case ("pax2")', 'baseline', pl => { pl.Pax3.ParentPaxRefId = 'pax2'; }],
  ['N6', 'ParentPaxRefId is a number (2)', 'reject', pl => { pl.Pax3.ParentPaxRefId = 2; }],
  ['N7', 'ParentPaxRefId set on an ADULT (Pax1 -> Pax2)', 'baseline', pl => { pl.Pax1.ParentPaxRefId = 'Pax2'; }],
];
for (const [n, what, kind, mut] of NEG) {
  const id = `BUG18-${n}-COKSHJ-ADDPAX`; const cfg = CFG.C1;
  cases.push({ id, group: 'bug18', category: 'Validation', endpoint: 'AddPassenger', spec: 'BUG-18 (ADO 65513); SPEC.md §2.5',
    title: `[V2][AirArabiaPlus][AddPassenger] 2 ADT + 1 INF: ${what}`, expected: kind === 'reject' ? 'Rejected with a controlled 4xx (never a 5xx, never accepted).' : 'Handled with a controlled outcome (accepted or rejected, never a 5xx); the live behaviour is the baseline.',
    run: async () => {
      const v = await fxFor('COK-SHJ', 'C1'); if (!v.ok) return X.blockedNoData(null, v.why);
      const h = await C.call(v.ctx, 'AddPassenger', C.P.addpax, apBody(v, cfg, mut)); const good = kind === 'reject' ? controlled(h) : h.status < 500;
      view(h, { expected: kind === 'reject' ? '4xx' : 'no 5xx', actual: ok(h) ? 'HTTP 200 accepted' : errLine(h), verdict: good ? 'PASS' : 'FAIL' });
      return { verdict: good ? 'PASS' : 'FAIL', hops: [...pre(v).slice(-2), h], actual: ok(h) ? 'HTTP 200 — accepted' : errLine(h), evidence: kind === 'reject' ? 'expectation INFERRED (an unresolvable parent must not be accepted)' : 'recorded baseline',
        finding: !good ? { kind: 'defect', field_name: 'passengersList.ParentPaxRefId', summary: `${id}: ${what} — ${ok(h) ? 'ACCEPTED (200)' : errLine(h)}`, expected_value: '4xx', impact: 'infant can be created without a valid parent adult', spec_ref: 'BUG-18', evidence: id } : (kind === 'baseline' ? { kind: 'unknown_resolution', summary: `${id}: ${what} -> ${ok(h) ? 'accepted' : errLine(h)}`, spec_ref: 'SPEC.md §2.5', evidence: id } : null) };
    } });
}
module.exports = { cases };
