// Builds (1) the consolidated regression test-case CSV used by the report's "View Test Case" panels and (2) the coverage map of every source row (executed / mapped / not applicable, with the reason).
const fs = require('fs'), path = require('path');
const X = require('./fx'); const R = require('./recorder');
const GROUPS = ['g_flows', 'g_generic', 'g_v2tc', 'g_neg', 'g_void', 'g_seat', 'g_name', 'g_extra'];
const cases = []; for (const g of GROUPS) for (const c of require('./' + g).cases) cases.push(c);
const TCDIR = path.resolve(__dirname, '../../TestCases'); const ART = path.resolve(__dirname, '../../Artifacts');
const csvq = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
const HDR = ['ID', 'RowType', 'Version', 'Scope', 'Category', 'Title', 'Priority', 'Risk', 'Capabilities / Test Data', 'Preconditions', 'Steps / Endpoint Chain', 'Expected Result', 'SpecReference', 'Notes', 'Status'];
const PRE = 'Staging ne-6 (https://ndc-integration-stg-ne-6.azurewebsites.net/), supplier AirArabiaPlus, credentialsSelector USA, V2 API only, valid x-api-key/Client-Id headers. Booking-affecting calls are authorised on this URL only; PNRs are left open.';
function rowFor(c) {
  const r = c.csvRow || {}; const bk = r['TC ID'] ? r : null;
  const steps = r['Steps / Endpoint Chain'] || (c.group === 'route' ? 'Search (1 ADT) then Search (1 ADT + 1 CHD + 1 INF) on the reference route; check offers and carrier codes' : c.group === 'carrier' || c.group === 'upsellflow' ? 'Search → … (see FLOW-V2 matrix)' : c.group === 'upsell' ? 'Search → Upselling for direct, return and connecting offers' : c.run === 'flow' ? `Search → ${c.enrich && c.enrich.bdl ? 'FareConfirm → GetOfferBundles → AddPassenger → GetAncillary(selectedBundles) → SeatMap → FareCheck → ' : c.enrich && (c.enrich.anc || c.enrich.sm) ? 'FareConfirm → AddPassenger → ' + (c.enrich.anc ? 'GetAncillary → ' : '') + (c.enrich.sm ? 'SeatMap → ' : '') + 'FareCheck → ' : 'FareConfirm → AddPassenger → '}${c.hold ? 'Hold' : 'Book'}${c.family ? ' → ' + { A: 'Retrieve', B: 'FareConfirmAfterHold → Retrieve', C: 'Retrieve → Void', D: 'FareConfirmAfterHold → Retrieve → BookAfterHold', E: 'FareConfirmAfterHold → Retrieve → BookAfterHold → Void', F: 'FareConfirmAfterHold → Retrieve → CancelAfterHold' }[c.family] : ''}` : '');
  return { ID: c.id, RowType: c.src ? 'Both→V2' : 'V2', Version: 'V2', Scope: c.group, Category: c.category, Title: c.title, Priority: r.Priority || 'High', Risk: r.Risk || 'Medium', 'Capabilities / Test Data': r['Capabilities / Test Data'] || (c.itinerary ? c.itinerary + '; passengers ' + (c.types || []).join('+') : ''), Preconditions: r.Preconditions || PRE, 'Steps / Endpoint Chain': steps, 'Expected Result': c.expected || r['Expected Result'] || '', SpecReference: c.spec || r.SpecReference || '', Notes: r.Notes || '', Status: 'Not Run' };
}
function writeCsv(statusOf) {
  const out = [HDR.map(csvq).join(',')]; for (const c of cases) { const row = rowFor(c); if (statusOf) row.Status = statusOf(c.id) || row.Status; out.push(HDR.map(h => csvq(row[h])).join(',')); }
  fs.writeFileSync(path.join(TCDIR, 'AirArabiaPlus_OneAPI_Regression_TestCases.csv'), out.join('\n') + '\n', 'utf8'); return cases.length;
}
// ---------- coverage map ----------
const NA = {
  generic: id => /^TC-CAPCHECK-/.test(id) ? 'Other suppliers (AirCairo, EgyptAir, Galileo, SpiceJet, GLC, Indigo, ElJazeera, OmainAir): run scoped to AirArabiaPlus only' : id === 'TC-HOLD-NEG-02' ? 'Hold rejection for canBeHeld=false suppliers (FlyNas, GLC): AirArabiaPlus offers have canBeHeld=true' : id === 'TC-BOOK-VAL-02' ? 'V1-only field (capital-S Supplier on V1 Book); V2 only by instruction' : id === 'TC-VERSIONDIFF-VAL-05' ? null : /^TC-VERSIONDIFF-BIZ-01$/.test(id) ? null : 'V1/V2 comparison half is V1: not in scope (V2 only)',
  void: id => /^FLOW-V1-/.test(id) ? 'V1 flow: V2 only by instruction' : /^TC-VOIDCAP-POS-0[1-6]$/.test(id) ? 'Supplier-specific mapping row for another supplier (SabreNdc, TravelportNdc, GulfAir, Amadeus, FlyAdeal, EgyptAir/OmanAir/AirCairo): scoped to AirArabiaPlus' : /^TC-VOIDCAP-REG-0[1278]$|^TC-VOIDCAP-REG-09$/.test(id) ? 'Regression of another supplier / other-supplier defects: scoped to AirArabiaPlus' : id === 'TC-VOIDCAP-NEG-07' ? 'Name-mismatch suppliers (Indigo, ElJazeera, OmainAir): other suppliers' : id === 'TC-VOIDCAP-VAL-08' ? 'Compares V1 and V2 Book: V2 only by instruction' : 'Not applicable to AirArabiaPlus',
  seat: id => 'Not applicable', amd: id => /BND-(0[1-9]|1\d|2[0-3])$|BIZ-(0[1-9]|1[0-3])$|VAL-(18|19|20|21|22|23|24)$|TC-CAPCHECK-AMD-01|TC-PAXNAME-REG-01|TC-PAXNAME-POS-06|SEC-0[12]$/.test(id) ? 'Amadeus-specific rule (25-character fields, 59-character combined passenger string, Amadeus error envelope) or Amadeus-only precondition: not applicable to AirArabiaPlus' : 'Not applicable',
};
const NEGMAP = { 'FLOW-V2-33-NEG': 'TC-BOOK-NEG-04', 'FLOW-V2-36-NEG': 'TC-CANCELHOLD-NEG-01', 'FLOW-V2-54-NEG': 'TC-CANCELHOLD-NEG-01', 'FLOW-V2-72-NEG': 'TC-CANCELHOLD-NEG-01', 'FLOW-V2-37-NEG': 'TC-FARECHECK-NEG-01', 'FLOW-V2-38-NEG': 'TC-HOLD-NEG-01', 'FLOW-V2-39-NEG': 'TC-FARECHECK-BND-01', 'FLOW-V2-61-NEG': 'TC-FARECHECK-BND-01', 'FLOW-V2-65-NEG': 'TC-FARECHECK-BND-01', 'FLOW-V2-43-NEG': 'TC-ANCILLARY-NEG-01', 'FLOW-V2-45-NEG': 'TC-VOID-NEG-01', 'FLOW-V2-49-NEG': 'TC-SEATMAP-NEG-01', 'FLOW-V2-55-NEG': 'TC-ADDPAX-NEG-01', 'FLOW-V2-58-NEG': 'TC-ADDPAX-NEG-01', 'FLOW-V2-56-NEG': 'TC-ADDPAX-VAL-01', 'FLOW-V2-67-NEG': 'TC-ADDPAX-VAL-01', 'FLOW-V2-26-NEG': 'FLOW-V2-26-NEG', 'FLOW-V2-44-NEG': 'FLOW-V2-26-NEG', 'FLOW-V2-62-NEG': 'FLOW-V2-62-NEG', 'FLOW-V2-41-NEG': 'FLOW-V2-34-NEG', 'FLOW-V2-52-NEG': 'FLOW-V2-34-NEG', 'FLOW-V2-63-NEG': 'FLOW-V2-34-NEG', 'FLOW-V2-64-NEG': 'FLOW-V2-34-NEG', 'FLOW-V2-59-NEG': 'FLOW-V2-34-NEG',
  'FLOW-V2-29-NEG': 'FLOW-V2-27-NEG', 'FLOW-V2-47-NEG': 'FLOW-V2-27-NEG', 'FLOW-V2-57-NEG': 'FLOW-V2-27-NEG', 'FLOW-V2-51-NEG': 'FLOW-V2-35-NEG', 'FLOW-V2-60-NEG': 'FLOW-V2-42-NEG', 'FLOW-V2-71-NEG': 'FLOW-V2-69-NEG', 'FLOW-V2-48-NEG': 'FLOW-V2-30-NEG', 'FLOW-V2-66-NEG': 'FLOW-V2-30-NEG', 'FLOW-V2-68-NEG': 'FLOW-V2-46-NEG', 'FLOW-V2-70-NEG': 'FLOW-V2-28-NEG', 'FLOW-V2-79-NEG': 'FLOW-V2-75-NEG', 'FLOW-V2-81-NEG': 'FLOW-V2-75-NEG', 'FLOW-V2-97-NEG': 'FLOW-V2-75-NEG', 'FLOW-V2-99-NEG': 'FLOW-V2-75-NEG', 'FLOW-V2-103-NEG': 'FLOW-V2-75-NEG' };
for (let n of [76, 83, 89, 94, 100, 107, 113, 118]) NEGMAP[`FLOW-V2-${n}-NEG`] = 'FLOW-V2-28-NEG';
for (let n of [78, 84, 90, 96, 102, 108, 114, 120]) NEGMAP[`FLOW-V2-${n}-NEG`] = 'FLOW-V2-30-NEG';
for (let n of [86, 110]) NEGMAP[`FLOW-V2-${n}-NEG`] = 'FLOW-V2-46-NEG';
for (let n of [85, 87, 93, 109, 111, 117]) NEGMAP[`FLOW-V2-${n}-NEG`] = 'TC-FARECHECK-NEG-01';
function coverage(verdicts) {
  const ids = new Set(cases.map(c => c.id)); const lines = []; const tally = {};
  const add = (src, id, status, why) => { lines.push({ src, id, status, why }); tally[src] = tally[src] || {}; tally[src][status] = (tally[src][status] || 0) + 1; };
  for (const [src, rows] of Object.entries(X.SRC)) for (const r of rows) {
    const id = r.ID; const alt = id + '@SEAT'; const ex = ids.has(id) ? id : (src === 'seat' && ids.has(alt) ? alt : null);
    if (src === 'v2' && /^FLOW-V2-\d+-NEG$/.test(id) && !ex) { const m = NEGMAP[id]; if (m && ids.has(m)) { add(src, id, 'MAPPED', 'same assertion as ' + m + ' (executed once)'); continue; } const n = +id.match(/\d+/)[0]; const why = /Hold is rejected for a supplier without confirmed Hold support|canBeHeld=false/.test(r.Title) ? 'Premise is a supplier without Hold support (FlyNas / canBeHeld=false): AirArabiaPlus offers have canBeHeld=true' : /FlyCham/.test(r.Title) ? 'Premise is the FlyCham supplier: other supplier' : 'Not applicable to AirArabiaPlus'; add(src, id, 'N/A', why); continue; }
    if (ex) { add(src, id, verdicts[ex] || 'PLANNED', 'executed as ' + ex); continue; }
    if (src === 'v2' && /^FLOW-V2-\d+$/.test(id)) { add(src, id, 'N/A', 'not in plan'); continue; }
    const f = NA[src]; const why = f ? f(id) : 'Not applicable'; add(src, id, 'N/A', why || 'executed elsewhere');
  }
  for (const r of X.SRC.generic) {} // (kept for symmetry)
  const bk = require('./csvparse')(path.join(TCDIR, 'AirArabiaPlus_V2_BookingCreation_TestCases.csv')); for (const r of bk) add('booking', r['TC ID'], verdicts[r['TC ID']] || 'PLANNED', 'executed as ' + r['TC ID']);
  const extra = cases.filter(c => ['route', 'carrier', 'upsell'].includes(c.group) || c.added); for (const c of extra) add('added', c.id, verdicts[c.id] || 'PLANNED', 'added for the One-API change (reference routes / carriers / Upselling capability)');
  return { lines, tally };
}
function writeCoverage(verdicts) {
  const { lines, tally } = coverage(verdicts); const o = ['# AirArabiaPlus / USA One-API regression — coverage map', '', `Generated ${new Date().toISOString()} by NDC_Integration/Harness/AirArabiaPlus/plan.js from the five source test-case sheets, the AirArabiaPlus booking-creation sheet and the cases added for the change.`, '', 'Status: PASS / FAIL / BLOCKED = executed (see the QA report); MAPPED = same assertion as a case that was executed once; N/A = not applicable to AirArabiaPlus V2 (reason given).', '', '## Totals per source', ''];
  for (const [s, t] of Object.entries(tally)) o.push(`- **${s}**: ` + Object.entries(t).map(([k, v]) => `${k} ${v}`).join(', '));
  o.push('');
  for (const s of Object.keys(tally)) { o.push(`## ${s}`, '', '| Row | Status | Note |', '|---|---|---|'); lines.filter(l => l.src === s).forEach(l => o.push(`| ${l.id} | ${l.status} | ${String(l.why).replace(/\|/g, '/')} |`)); o.push(''); }
  fs.mkdirSync(ART, { recursive: true }); fs.writeFileSync(path.join(ART, 'AirArabiaPlus_Regression_CoverageMap.md'), o.join('\n'), 'utf8'); return tally;
}
module.exports = { cases, writeCsv, writeCoverage, coverage };
if (require.main === module) { console.log('cases', writeCsv()); const v = {}; try { const L = fs.readFileSync(R.LOGS + '/' + R.slug() + '.jsonl', 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)); L.filter(x => x.type === 'test_case').forEach(t => v[t.tc_id] = t.verdict); } catch (e) { } console.log(JSON.stringify(writeCoverage(v))); }
