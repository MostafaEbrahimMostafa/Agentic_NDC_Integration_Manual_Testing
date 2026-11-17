// Turns executed hops/flows into generate-qa-report test_case objects (redacted, summarized, plain-language rows).
const C = require('./chain');
const { amt } = require('./core');
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const short = (s, n = 24) => { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n) + '…' : s; };
const money = x => x == null ? 'n/a' : (typeof x === 'object' ? `${x.amount} ${x.currency}` : String(x));

const EXPECT = {
  Search: '200 with a non-empty offers[] (offerId, priceDetails, capability flags on every offer)', FareConfirm: '200 with the re-priced selectedOffer; price reconciles',
  Upselling: '200 with upsellOffers[]', GetOfferBundles: '200 with bundleChoices and offerJourneys', AddPassenger: '200 with the passenger-bound offerId/responseId',
  GetAncillary: '200 with passenger ancillary availability (meals per segment, baggage per journey)', SeatMap: '200 with seatMapDetails and per-passenger seat availability',
  FareCheck: '200 with the offer re-priced for the selected ancillaries/seats', Book: '200 with pnr, bookingToken, tickets and voidCapability', Hold: '200 with pnr, bookingToken and a future holdExpirationDate',
  Retrieve: '200 with the booking and its lifecycle bookingStatus', FareConfirmAfterHold: '200 with the held offer re-priced (no unexplained price change)', BookAfterHold: '200, same PNR, tickets issued',
  CancelAfterHold: '200, the hold is cancelled', Void: '200, the ticket is voided (only when voidCapability allows it)'
};
function reqSummary(h) {
  const b = (h.rec && h.rec.request && h.rec.request.body) || {}; const p = h.path;
  const bits = [];
  if (h.endpoint === 'Search') { bits.push((b.searchCriteria || []).map(s => `${s.origin}-${s.destination} ${s.date}`).join(' / ')); bits.push((b.passengers || []).map(x => `${x.count} ${x.passengerTypeCode}`).join('+')); }
  else if (b.pnr) bits.push(`pnr=${b.pnr}`);
  else { if (b.ResponseId || b.responseId) bits.push(`ResponseId=${short(b.ResponseId || b.responseId, 8)}`); if (b.selectedOfferId) bits.push(`selectedOfferId=${short(b.selectedOfferId, 8)}`); }
  if (b.selectedBundles) bits.push(`selectedBundles=${[...new Set(b.selectedBundles.map(x => x.selectedBundleCode))].join(',')}`);
  if (b.passengersList) bits.push(`${Object.keys(b.passengersList).length} passenger(s)`);
  const anc = b.PassengersSelectedAncillaries || b.passengersSelectedAncillaries; if (anc) bits.push(`ancillaries for ${Object.keys(anc).length} pax`);
  if (b.passengersSelectedSeats) bits.push(`seats for ${Object.keys(b.passengersSelectedSeats).length} pax`);
  return `POST /${p} — ${bits.join(', ')}; supplier AirArabiaPlus/USA`;
}
function respSummary(h) {
  const j = h.json; if (!j) return `${h.status} — ${(h.text || '').slice(0, 120)}`;
  if (j.ErrorCode || j.errorCode) return `${h.status} — ${j.ErrorCode || j.errorCode}: ${String(j.ErrorMessage || '').slice(0, 90)}${j.Context && j.Context[0] ? ' | ' + String(j.Context[0].Value).slice(0, 110) : ''}`;
  const bits = [];
  if (j.offers) { bits.push(`${j.offers.length} offer(s)`); if (j.offers[0]) bits.push(`offer[0] ${money((j.offers[0].priceDetails || {}).totalAmount)}`); }
  if (j.selectedOffer) bits.push(`total ${money((j.selectedOffer.priceDetails || {}).totalAmount)}`);
  if (j.upsellOffers) bits.push(`${j.upsellOffers.length} upsell offer(s)`);
  if (j.bundleChoices) bits.push(`bundles ${Object.keys(j.bundleChoices).join(',')}`);
  if (j.seatMapDetails) bits.push(`seat map for ${Object.keys(j.seatMapDetails).length} segment(s)`);
  if (j.passengersAncillariesAvailabilty) bits.push(`ancillaries for ${Object.keys(j.passengersAncillariesAvailabilty).length} pax`);
  if (j.pnr) bits.push(`pnr ${j.pnr}`); if (j.bookingStatus) bits.push(`status ${j.bookingStatus}`); if (j.voidCapability) bits.push(`voidCapability ${j.voidCapability}`);
  if (j.holdExpirationDate) bits.push(`holdExpirationDate ${j.holdExpirationDate}`);
  if (h.endpoint === 'AddPassenger' && j.offerId) bits.push('offerId/responseId issued');
  return `${h.status} — ${bits.join(', ') || Object.keys(j).slice(0, 6).join(',')}`;
}
// hopView: schema hop for one executed call. opts.expected overrides default, opts.verdict forces, opts.evidence adds text
function hopView(h, o = {}) {
  const ok = h.status === 200 && !(h.json && h.json.ErrorCode);
  const unsupported = h.status === 409 && h.json && h.json.ErrorCode === 'OperationNotSupported';
  const verdict = o.verdict || (ok ? 'PASS' : unsupported ? 'BLOCKED' : 'FAIL');
  const rec = h.rec || { request: {}, response: h.json };
  return { endpoint: h.endpoint, request_summary: o.request_summary || reqSummary(h), response_summary: o.response_summary || respSummary(h), expected: o.expected || EXPECT[h.endpoint] || '200 OK',
    actual: o.actual || (ok ? respSummary(h) : `${respSummary(h)}`), verdict, evidence: o.evidence || (ok ? `${h.ms} ms` : `${h.ms} ms; ${C.errText(h)}`), started_at: h.started_at, ended_at: h.ended_at,
    request_full: { method: 'POST', url: rec.request.url, headers: rec.request.headers, body: rec.request.body }, response_full: { status: h.status, body: rec.response, headers_captured: false } };
}
// ---- plain-language row builder (HTML allowed in values, text escaped)
function plain(tc) {
  const strip = s => esc(String(s || '').replace(/POST \/api\/[A-Za-z0-9\/_]+ — /g, '').replace(/ResponseId=\S+,? ?/g, '').replace(/selectedOfferId=\S+,? ?/g, ''));
  const first = t => { t = String(t || ''); return t.length > 420 ? t.slice(0, 417) + '...' : t; };
  const e = tc.plain_endpoint || tc.endpoint_or_flow;
  return { e: esc(e), q: esc(first(tc.plain_request || tc.request_summary)), s: esc(first(tc.plain_response || tc.response_summary)), x: esc(first(tc.expected)), a: esc(first(tc.actual)) };
}
const CORR = h => { const r = h && h.rec && h.rec.response; return r && (r.TransactionId || r.transactionId) || undefined; };
// ---- flow result -> test_case object. def: {id,title,category,spec,expected,family,hold,types,enrich,routes}
function flowTC(def, r, extra = {}) {
  const hops = r.ctx.hops.map(h => hopView(h));
  const tail = r.ctx.hops.find(h => ['Void', 'CancelAfterHold', 'Upselling'].includes(h.endpoint) && h.status === 409 && h.json && h.json.ErrorCode === 'OperationNotSupported');
  const failedChecks = r.checks.filter(c => !c.pass);
  let verdict, actual, evidence = [];
  const lastEnd = r.ctx.hops.length ? r.ctx.hops[r.ctx.hops.length - 1] : null;
  if (r.ok && !failedChecks.length) { verdict = 'PASS'; actual = `All ${r.ctx.hops.length} calls succeeded; booking ${r.booking ? r.booking.pnr : 'n/a'}; ${r.checks.length} checks passed.`; }
  else if (!r.ok && tail) { verdict = 'BLOCKED'; actual = `Steps before ${tail.endpoint} succeeded (${r.ctx.hops.length - 1} calls); ${tail.endpoint} refused with 409 OperationNotSupported ("This action is not currently supported by the selected supplier"), so the flow's end state could not be reached.`; evidence.push('supplier capability limit, not an environment fault: ' + tail.endpoint + ' unsupported for AirArabiaPlus'); }
  else if (!r.ok && r.failedAt === 'Search' && /no usable offer/.test(r.why || '')) { verdict = 'BLOCKED'; actual = `No usable offer from Search after retries (${r.why}); test data not available for this itinerary right now.`; }
  else { verdict = 'FAIL'; actual = r.ok ? `Flow completed but ${failedChecks.length} check(s) failed: ${failedChecks.map(c => c.name + ' [' + c.detail + ']').join(' | ')}` : `Failed at ${r.failedAt}: ${r.why}`; }
  evidence.push(`checks: ${r.checks.map(c => (c.pass ? 'PASS ' : 'FAIL ') + c.name + (c.pass ? '' : ' [' + c.detail + ']')).join('; ')}`);
  if (r.sel && Object.keys(r.sel).length) evidence.push('selection: ' + JSON.stringify(r.sel).slice(0, 500));
  if (r.ctx.notes.length) evidence.push('notes: ' + r.ctx.notes.join(' | '));
  if (r.totals) evidence.push(`totals: search ${r.totals.search}, fareConfirm ${r.totals.fc}${r.totals.fcheck ? ', fareCheck ' + r.totals.fcheck : ''}${r.totals.book ? ', book/hold ' + r.totals.book : ''} ${r.totals.currency || ''}`);
  if (r.voidCapability) evidence.push('voidCapability=' + r.voidCapability);
  if (r.holdExp) evidence.push('holdExpirationDate=' + r.holdExp);
  const first = r.ctx.hops[0]; const mid = r.ctx.hops.length > 2 ? r.ctx.hops[r.ctx.hops.length - 1] : first;
  const tc = { tc_id: def.id, title: def.title, endpoint_or_flow: def.flowName || r.ctx.hops.map(h => h.endpoint).filter((x, i, a) => a.indexOf(x) === i).join(' → '), category: def.category || 'Flow', verdict, spec_ref: def.spec || 'SPEC.md §5, §6.3, §6.4',
    request_summary: `${def.itinerary || ''} ${(def.types || []).join('+')}; ${r.ctx.hops.map(h => h.endpoint).join(' → ')}`.trim(), response_summary: lastEnd ? respSummary(lastEnd) : 'no calls', expected: def.expected, actual, evidence: evidence.join(' || ').slice(0, 3000),
    started_at: r.ctx.started_at, waiting_ms: r.ctx.waiting_ms, correlation_id: CORR(lastEnd), hops, ...extra };
  tc.plain = plain({ ...tc, plain_request: `${def.itinerary || ''} for ${(def.types || []).map(t => ({ ADT: 'adult', CHD: 'child', INF: 'infant' }[t])).join(', ')} — steps: ${r.ctx.hops.map(h => h.endpoint).join(' → ')}`, plain_response: respSummary(lastEnd || { status: 0 }) });
  return tc;
}
// ---- test_case object for a custom (non-flow) test case built from named hops
function customTC(def, res) {
  const hops = (res.hops || []).map(h => h.endpoint && h.request_summary ? h : hopView(h, h.view || {}));
  const tc = { tc_id: def.id, title: def.title, endpoint_or_flow: def.endpoint || (hops[0] && hops[0].endpoint) || '', category: def.category, verdict: res.verdict, spec_ref: def.spec || '',
    request_summary: res.request_summary || (hops[0] && hops[0].request_summary) || '', response_summary: res.response_summary || (hops.length ? hops[hops.length - 1].response_summary : ''), expected: res.expected || def.expected, actual: res.actual, evidence: String(res.evidence || '').slice(0, 3000),
    started_at: res.started_at, waiting_ms: res.waiting_ms, correlation_id: res.correlation_id };
  if (hops.length === 1) { tc.request_full = hops[0].request_full; tc.response_full = hops[0].response_full; }
  else if (hops.length > 1 && res.asAttempts) tc.attempts = hops.map((h, i) => ({ label: (res.labels && res.labels[i]) || `Attempt ${i + 1} of ${hops.length}`, request_full: h.request_full, response_full: h.response_full, started_at: h.started_at, ended_at: h.ended_at }));
  else if (hops.length > 1) tc.hops = hops;
  tc.plain = plain({ ...tc, plain_request: res.plain_request, plain_response: res.plain_response });
  return tc;
}
module.exports = { hopView, flowTC, customTC, reqSummary, respSummary, plain, EXPECT, esc };
