// Close the BUG-18 verification run: merge stamps, consolidate findings, scope note, phases, run_end, render md/html/time-breakdown.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const R = require('./recorder'); const f = path.join(R.LOGS, R.slug() + '.jsonl'); const slug = R.slug();
const SK = path.join(R.ROOT, '.claude/Skills/Generate_QA_Report/scripts'); const run = (s, a = []) => cp.execFileSync('node', [path.join(SK, s), ...a], { stdio: 'pipe', maxBuffer: 1 << 28 });
const save = L => fs.writeFileSync(f, L.map(x => JSON.stringify(x)).join('\n') + '\n');
let L = fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(JSON.parse);
const stamp = {}; L.filter(x => x.type === 'reporting_stamp').forEach(s => stamp[s.tc_id] = s.reporting_ended_at);
L = L.filter(x => x.type !== 'reporting_stamp').map(x => { if (x.type === 'test_case') { x.reporting_ended_at = stamp[x.tc_id] || x.reporting_ended_at || x.timestamp; } return x; });
const lastIdx = {}; L.forEach((x, i) => { if (x.type === 'test_case') lastIdx[x.tc_id] = i; }); L = L.filter((x, i) => x.type !== 'test_case' || lastIdx[x.tc_id] === i);
L = L.filter(x => !(x.type === 'finding' && x.kind === 'defect') && x.type !== 'phase' && x.type !== 'run_end');
const tcs = L.filter(x => x.type === 'test_case'); const m = tcs.filter(t => /^BUG18-C/.test(t.tc_id)); const mf = m.filter(t => t.verdict === 'FAIL');
const sum = v => tcs.filter(t => t.verdict === v).length;
const t0 = L[0].started_at, tEnd = new Date().toISOString();
L.splice(1, 0, { type: 'scope_note', text: `Scope as requested: verify the fix for BUG-18 (ADO work item 65513) on the ne-1 container app (AirArabiaPlus, credentialsSelector USA, V2, routes SHJ-COK, COK-SHJ, AMM-SHJ, SHJ-AMM, MCT-SHJ only) through AddPassenger, Book, Hold and Retrieve, plus every passenger case: 7 pax mixes x 5 routes (Hold + Retrieve on all, Book + Retrieve on 3 of them to limit un-voidable tickets: AirArabiaPlus does not support Void), 7 ParentPaxRefId validation rows and the 53-row TC-PAXNAME suite (TC-PAXNAME-BIZ-17 is covered by BUG18-C5 and not re-run). Infant linkage is read from passengersList keys, tickets keys and passengerFareBreakdown passengerRefId; expected "I<infantPaxIdx>/A<parentPaxIdx>". Pax mixes whose declared parent equals the natural sequential order (C4, C5) are controls. Rows N2/N3/N6 expectations are INFERRED (an unresolvable parent must be rejected). The ADO work item itself could not be read from this session (no authenticated access), so "root cause solved" is judged from live behaviour only.` });
L.push({ type: 'finding', kind: 'defect', related_tc_id: 'BUG18-C1-SHJCOK-HOLD', bug_id: 'BUG-18', field_name: 'passengersList.*.ParentPaxRefId -> passengerRefId', history: 'Raised 2026-11-09 on ne-6 (TC-PAXNAME-BIZ-19); re-tested 2026-11-11 on ne-1', occurrence: 2,
  summary: `BUG-18 is NOT fixed on ne-1: ParentPaxRefId is still ignored. Infants are attached to the adults in order of appearance (I3/A1, then I4/A1+I5/A2, ...) whatever parent is declared. ${mf.length} of ${m.length} pax-matrix cases fail on every route and in every operation (AddPassenger -> Hold / Book, then Retrieve); the ${m.length - mf.length} that pass are exactly the ones where the declared parent happens to equal the sequential order (infant under Pax1, single adult).`,
  expected_value: 'infant refs equal I<infantIdx>/A<declaredParentIdx>, e.g. I3/A2 for Pax3 INF with ParentPaxRefId "Pax2"', impact: 'Wrong adult responsible for the infant on the PNR and ticket (name change, check-in, lap-infant rules). Affects Hold, Book and Retrieve identically, so the wrong link is stored by AddPassenger/the supplier mapping, not produced by Retrieve.',
  evidence: `BUG18-C1-* (2 ADT + INF under Pax2): I3/A1 on SHJ-COK, COK-SHJ, AMM-SHJ, SHJ-AMM, MCT-SHJ; BUG18-C2 (Pax4->Pax3, Pax5->Pax1) came back I4/A1 + I5/A2; C6 (reversed) I4/A1, I5/A2, I6/A3; C7 I5/A1, I6/A2; TC-PAXNAME-BIZ-19 I3/A1. The AddPassenger request carried the right ParentPaxRefId (Pax3 -> Pax2) in every case.` });
L.push({ type: 'finding', kind: 'reconfirmed', related_tc_id: 'TC-PAXNAME-VAL-03', bug_id: 'BUG-17', summary: 'Hyphenated / apostrophe surnames are still rejected ("Passenger name must contain alphabetic characters only") — also TC-PAXNAME-VAL-04', occurrence: 2 });
L.push({ type: 'finding', kind: 'reconfirmed', related_tc_id: 'TC-PAXNAME-NEG-15', bug_id: 'BUG-05', summary: 'AddPassenger accepts the all-zero ResponseId (HTTP 200) — ResponseId is still not validated', occurrence: 2 });
L.splice(2, 0, { type: 'phase', name: 'Initialization', event: 'end', at: t0 }, { type: 'phase', name: 'Test Execution', event: 'start', at: t0 });
const maxT = Math.max(...tcs.map(t => Date.parse(t.timestamp))); L.push({ type: 'phase', name: 'Test Execution', event: 'end', at: new Date(maxT + 1000).toISOString() });
L.push({ type: 'run_end', status: 'complete', ended_at: new Date(maxT + 1000).toISOString() });
L[0].total_test_cases_planned = tcs.length; save(L);
const g0 = new Date().toISOString(); L.push({ type: 'phase', name: 'Report Generation', event: 'start', at: g0 }); save(L);
run('render-md.js', [slug]); const h0 = new Date().toISOString(); run('render-html.js', [slug]); const h1 = new Date().toISOString();
L.push({ type: 'reporting_op', operation: 'Final HTML Report Generation', started_at: h0, ended_at: h1 }); save(L);
const k0 = new Date().toISOString(); run('render-tb.js', [slug]); const k1 = new Date().toISOString();
L.push({ type: 'reporting_op', operation: 'Time Breakdown Report Generation', started_at: k0, ended_at: k1 }, { type: 'phase', name: 'Report Generation', event: 'end', at: k1 }); save(L);
run('render-md.js', [slug]); run('render-html.js', [slug]); run('render-tb.js', [slug]);
console.log('PASS', sum('PASS'), 'FAIL', sum('FAIL'), 'BLOCKED', sum('BLOCKED'), '|', fs.readdirSync(R.LOGS).filter(x => x.startsWith(slug)).join(', '));
