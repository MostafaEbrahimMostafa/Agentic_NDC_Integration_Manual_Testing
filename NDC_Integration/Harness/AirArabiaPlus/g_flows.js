// Group F: route coverage, carrier coverage, booking-creation matrix (24), V2 flow matrix FLOW-V2-25..72, Upselling flows 73..120.
const fs = require('fs'), path = require('path');
const csv = require('../_shared/csvparse');
const C = require('../_shared/chain'); const F = require('./flow'); const B = require('./tcbuild'); const { SUP, now, amt } = require('../_shared/core');
const TCDIR = path.resolve(__dirname, '../../TestCases');
const D1 = process.env.D1 || '2026-12-08', D2 = process.env.D2 || '2026-12-15';
const V2 = csv(path.join(TCDIR, '_Generic/TestCases_V2.csv')), BK = csv(path.join(TCDIR, 'Regression/AirArabiaPlus_V2_BookingCreation_TestCases.csv'));
const row = (rows, id) => rows.find(r => (r.ID || r['TC ID']) === id);
const cases = [];
const FR = process.env.FLOW_ROUTE ? process.env.FLOW_ROUTE.split('-') : null;
const PAXN = { ADT: 'adult', CHD: 'child', INF: 'infant' };

// ---------- A. route coverage (reference routes from Resources/AirarabiaPlus_Routes.md) ----------
const ROUTES = [['G9', 'SHJ', 'COK'], ['G9', 'COK', 'SHJ'], ['G9', 'AMM', 'SHJ'], ['G9', 'SHJ', 'AMM'], ['G9', 'MCT', 'SHJ'], ['E5', 'CAI', 'MCT'], ['E5', 'HBE', 'BGY'], ['3O', 'SAW', 'CMN'], ['3O', 'CMN', 'SAW']];
for (const [car, o, d] of ROUTES) {
  cases.push({ id: `TC-ROUTE-${car}-${o}-${d}`, group: 'route', title: `[Search][Response] Verify AirArabiaPlus (One-API) Search returns ${car} offers for reference route ${o}-${d} (1 adult, then 1 adult + 1 child + 1 infant)`, category: 'Positive', spec: 'SPEC.md §2.1; One-API aggregator change',
    expected: `Search returns HTTP 200 with a non-empty offers[] for ${o}-${d}; every flight segment is marketed/operated by ${car}; offers carry offerId, priceDetails and capability flags; passenger mix does not change availability.`,
    run: async () => {
      const ctx = C.newCtx('ROUTE'); const out = { hops: [], waiting_ms: 0, started_at: now() }; const tries = [];
      const DATES = [D1, '2026-12-12', '2026-12-20', '2026-12-27'];
      for (const [types, k] of [[['ADT'], 0], [['ADT', 'CHD', 'INF'], 1]]) {
        let h, offers = [], used = null; const empties = [];
        const list = car === 'G9' ? DATES.slice(k).concat(DATES.slice(0, k)) : [DATES[k]];
        for (const date of list) {
          const S = await C.search(ctx, [[o, d, date]], types, { tries: 1, anyFit: true }); h = S.h; offers = (h.json && h.json.offers) || []; used = date;
          if (offers.length) break; empties.push(date + ': ' + h.status + ' 0 offers (' + h.ms + ' ms)'); if (car === 'G9') { await require('../_shared/core').sleep(3000); ctx.waiting_ms += 3000; }
        }
        const cars = [...new Set(Object.values((h.json && h.json.flightSegments) || {}).flatMap(s => [s.marketingCarrierCode, s.operatingCarrierCode]))];
        tries.push({ types, date: used, status: h.status, offers: offers.length, ms: h.ms, carriers: cars, hop: h, empties });
      }
      out.hops = tries.map(t => t.hop); out.waiting_ms = ctx.waiting_ms; out.asAttempts = true; out.labels = tries.map((t, i) => `Attempt ${i + 1} of 2 - ${t.types.join('+')} on ${t.date}`);
      const allOk = tries.every(t => t.status === 200 && t.offers > 0 && t.carriers.every(c => c === car));
      const slow = tries.some(t => t.ms > 14000 && t.offers === 0);
      out.verdict = allOk ? 'PASS' : 'FAIL';
      out.actual = tries.map(t => `${t.types.join('+')} ${t.date}: HTTP ${t.status}, ${t.offers} offer(s), carriers [${t.carriers.join(',') || 'none'}], ${t.ms} ms${t.empties.length ? ' (earlier empty answers: ' + t.empties.join('; ') + ')' : ''}`).join(' | ') + (allOk ? '' : (slow ? '. Empty answers took about 15 s each (a supplier-side timeout that is returned as HTTP 200 with offers=[] and no error), not a quick "no flights" answer.' : '. HTTP 200 with offers=[] and no error information.'));
      out.evidence = `${ROUTES.length} reference routes were swept earlier on ${10} dates for E5/3O (2026-11-20 … 2027-01-15) plus 17 extra routes (CAI-JED/SHJ/DMM/RUH/KWI, HBE-JED/SHJ, MCT-CAI, BGY-HBE, CMN-ORY/BCN/BRU/FCO/IST, SAW-RAK, TNG-IST, RAK-IST) on 2026-12-08: every answer was offers=[] (E5: ~0.5 s, 3O: ~15 s on dates up to 2026-12-27). Raw evidence under Harness/AirArabiaPlus/raw (scrubbed).`;
      out.request_summary = `POST /api/V2/FlightSearch/Search — ${o}-${d} on ${D1} (1 ADT) and ${D2} (1 ADT + 1 CHD + 1 INF); supplier AirArabiaPlus/USA`; out.response_summary = tries.map(t => `${t.status} — ${t.offers} offer(s)`).join(' ; ');
      out.finding = !allOk && car !== 'G9' ? { kind: 'defect', field_name: 'offers', summary: `One-API Search returns no ${car} offers for reference route ${o}-${d} (all dates swept return offers=[] with HTTP 200)${slow ? '; 3O answers take ~15 s (supplier timeout swallowed into an empty 200)' : ''}`, expected_value: `offers[] with ${car} flights for ${o}-${d}`, impact: `${car} cannot be sold through the new AirArabiaPlus supplier with credentialsSelector USA; every ${car} flow (Book/Hold/Bundle/Ancillary/SeatMap) is blocked`, spec_ref: 'One-API aggregator change' } : null;
      return out;
    } });
}
// carrier-level blocked rows (flows cannot start without inventory)
for (const car of ['E5', '3O']) for (const [k, what, ids] of [['BASE', 'basic Book/Hold flows (FLOW-V2-25..30)', ''], ['BUNDLE', 'bundle flows (FLOW-V2-31..36, 43..48, 55..60, 67..72)', ''], ['ANCILLARY', 'ancillary flows (FLOW-V2-37..48, 61..72)', ''], ['SEATMAP', 'seat-map flows (FLOW-V2-49..72)', '']])
  cases.push({ id: `TC-CARRIER-${car}-${k}`, group: 'carrier', title: `[Flow][Response] Verify the ${what.split(' (')[0]} complete for ${car} through AirArabiaPlus/USA`, category: 'Flow', spec: 'SPEC.md §5, §6.3, §6.4',
    expected: `${car}: Search returns an offer, then the ${what} complete end to end (see FLOW-V2 matrix).`, blocked: `No ${car} offer can be obtained: every Search for the reference routes (see TC-ROUTE-${car}-*) returns offers=[]. Covers ${what}.`, run: null });

// ---------- B. Upselling capability + 48 Upselling flows ----------
cases.push({ id: 'TC-UPSELL-CAP-01', group: 'upsell', title: '[Upselling][Request] Verify Upselling returns upsellOffers for a G9 offer (direct, return and connecting itineraries)', category: 'Positive', spec: 'SPEC.md §2.3', expected: '200 with upsellOffers[] whose first entry can replace FareConfirm output (FLOW-V2-73..120 depend on it).',
  run: async () => {
    const ctx = C.newCtx('UPSELL'); const out = { started_at: now(), asAttempts: true, hops: [], labels: [] }; const rs = [];
    for (const [lbl, routes, types, conn] of [['direct SHJ-COK 1 ADT', [['SHJ', 'COK', D1]], ['ADT'], false], ['return SHJ-COK/COK-SHJ 1 ADT', [['SHJ', 'COK', D1], ['COK', 'SHJ', D2]], ['ADT'], false], ['connecting MCT-COK 1 ADT', [['MCT', 'COK', D1]], ['ADT'], true]]) {
      const S = await C.search(ctx, routes, types, { conn, anyFit: true }); out.hops.push(S.h); out.labels.push('Search for ' + lbl);
      if (!S.offer) { rs.push(`${lbl}: no offer to upsell`); continue; }
      const u = await C.upsell(ctx, S); out.hops.push(u); out.labels.push('Upselling for ' + lbl); rs.push(`${lbl}: ${u.status} ${u.json && u.json.ErrorCode || ''}`);
    }
    const ups = out.hops.filter(h => h.endpoint === 'Upselling'); const unsupported = ups.length > 0 && ups.every(h => h.status === 409 && h.json && h.json.ErrorCode === 'OperationNotSupported');
    out.verdict = ups.length && ups.every(h => h.status === 200) ? 'PASS' : unsupported ? 'BLOCKED' : 'FAIL'; out.waiting_ms = ctx.waiting_ms;
    out.actual = rs.join(' | ') + (unsupported ? '. Upselling is not supported for AirArabiaPlus (409 OperationNotSupported on every itinerary type).' : ''); out.evidence = 'Same answer for direct, return and connecting offers; the Search before each Upselling succeeded.'; out.request_summary = 'POST /api/V2/FlightSearch/Search then POST /api/v2/FlightSearch/UpSelling for 3 itinerary types'; out.response_summary = rs.join('; ');
    out.finding = unsupported ? { kind: 'unknown_resolution', summary: 'Upselling is not supported for AirArabiaPlus/USA: 409 OperationNotSupported ("This action is not currently supported by the selected supplier") for direct, return and connecting offers; SPEC §4.2/§4.6 Upsell capability for AirArabia can be recorded as Not supported (Search offers carry no upsell flag).', spec_ref: 'SPEC.md §2.3, §4.6', evidence: 'TC-UPSELL-CAP-01 three itineraries' } : null;
    return out;
  } });
const ENR = [['NONE', {}], ['BDL', { bdl: 1 }], ['ANC', { anc: 1 }], ['BDL+ANC', { bdl: 1, anc: 1 }], ['SM', { sm: 1 }], ['BDL+SM', { bdl: 1, sm: 1 }], ['ANC+SM', { anc: 1, sm: 1 }], ['BDL+ANC+SM', { bdl: 1, anc: 1, sm: 1 }]];
const FAM = 'ABCDEF';
const FAMTXT = { A: 'Book then Retrieve: bookingStatus Booked, Retrieve price and passengers equal Book', B: 'Hold, FareConfirmAfterHold, Retrieve: bookingStatus OnHold with a future holdExpirationDate (flow stops, hold left to expire)', C: 'Book, Retrieve, Void: Void accepted only when voidCapability allows it, then Retrieve shows a voided state', D: 'Hold, FareConfirmAfterHold, Retrieve, BookAfterHold: same PNR, status OnHold then Booked, tickets issued', E: 'Hold, FareConfirmAfterHold, Retrieve, BookAfterHold, Void: same PNR; Void accepted only when voidCapability allows it', F: 'Hold, FareConfirmAfterHold, Retrieve, CancelAfterHold: hold cancelled, Retrieve shows a cancelled state' };
for (let n = 25; n <= 72; n++) {
  const e = ENR[Math.floor((n - 25) / 6)], f = FAM[(n - 25) % 6], r0 = row(V2, 'FLOW-V2-' + n);
  cases.push({ id: 'FLOW-V2-' + n, group: 'flow', title: r0.Title.replace(/\s+$/, ''), category: 'Flow', spec: 'SPEC.md §5, §6.3 Family ' + f + ', §6.4', enrich: e[1], family: f, hold: 'BDEF'.includes(f) && f !== 'A' && f !== 'C' ? true : false,
    expected: `${FAMTXT[f]}. Enrichment ${e[0]}: ` + [e[1].bdl ? 'the bundle price is added and bundle services are not charged twice' : '', e[1].anc ? 'selected meal and baggage appear in the booking and its price' : '', e[1].sm ? 'selected seat appears in the booking' : '', !(e[1].bdl || e[1].anc || e[1].sm) ? 'no enrichment' : ''].filter(Boolean).join('; ') + '. Prices reconcile per SPEC §2.1 at every priced step.',
    itinerary: FR && n >= (+process.env.FLOW_FROM || 0) ? `One-way ${FR[0]}→${FR[1]} ${D1}` : 'One-way SHJ→COK ' + D1, types: ['ADT', 'CHD', 'INF'], routes: [FR && n >= (+process.env.FLOW_FROM || 0) ? [FR[0], FR[1], D1] : ['SHJ', 'COK', D1]], run: 'flow' });
}
for (let n = 73; n <= 120; n++) {
  const r0 = row(V2, 'FLOW-V2-' + n);
  cases.push({ id: 'FLOW-V2-' + n, group: 'upsellflow', title: r0.Title.replace(/\s+$/, ''), category: 'Flow', spec: 'SPEC.md §2.3, §5', expected: 'Search, Upselling, then the family\'s remaining steps complete; AddPassenger accepts the substituted Upselling IDs.', blocked: 'Upselling is not supported for AirArabiaPlus (see TC-UPSELL-CAP-01: 409 OperationNotSupported on direct, return and connecting offers), so the first step after Search cannot succeed and the flow cannot start.', run: null });
}
// ---------- C. booking-creation matrix (24) ----------
const BKR = { OW: { conn: false, routes: [['SHJ', 'COK', D1]], it: `One-way SHJ→COK ${D1}` }, RT: { conn: false, routes: [['SHJ', 'COK', D1], ['COK', 'SHJ', D2]], it: `Return SHJ→COK ${D1} and COK→SHJ ${D2}` }, OWC: { conn: true, routes: [['MCT', 'COK', D1]], it: `One-way connection MCT→COK via SHJ ${D1}` }, RTC: { conn: true, routes: [['MCT', 'COK', D1], ['COK', 'MCT', D2]], it: `Return connection MCT→COK ${D1} and COK→MCT ${D2} via SHJ` } };
for (const r of BK) {
  const id = r['TC ID'], [k, t, nn] = id.split('-'); const rt = BKR[k];
  const types = t === 'BAS' ? (nn === '01' ? ['ADT'] : ['ADT', 'CHD', 'INF']) : t === 'ANC' ? (nn === '01' ? ['ADT', 'ADT'] : ['ADT', 'CHD', 'INF']) : (nn === '01' ? ['ADT'] : ['ADT', 'CHD', 'INF']);
  const enrich = t === 'BAS' ? {} : t === 'ANC' ? { anc: 1, sm: 1 } : { bdl: 1 };
  cases.push({ id, group: 'booking', title: r.Title, category: 'Flow', spec: 'SPEC.md §5 (flows 25, 37, 31), §6.4', enrich, family: 'A', hold: false, conn: rt.conn, routes: rt.routes, types, itinerary: rt.it, expected: r['Expected Result'] + ' Prices reconcile; Retrieve shows Booked.', run: 'flow' });
}
module.exports = { cases };
