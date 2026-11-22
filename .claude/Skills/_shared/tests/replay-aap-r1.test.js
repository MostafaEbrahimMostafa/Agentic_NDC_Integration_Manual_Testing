#!/usr/bin/env node
// Guardrail regression test (Enhancement Plan Step 4 "Done when"):
//   replay the AirArabiaPlus run whose BUG-01/02 were retracted and check the guardrails stop them,
//   while the real defect ADO 65507 (NDC-BUG-0002) still passes the gate.
// Plus synthetic unit cases (clearly marked) so each gate is tested on its own.
// No API calls, no writes outside the OS temp folder. Run from anywhere:
//   node .claude/Skills/_shared/tests/replay-aap-r1.test.js
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { run } = require('../scripts/verify-evidence.js');

const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const R1 = 'NDC_Integration/Artifacts/Logs/20261108-124139_AirArabiaPlus-USA-BookingCreation-ne6.jsonl';
const FIX = path.join(__dirname, 'fixtures', 'AAP-R1_guardrailed.jsonl');

let pass = 0, fail = 0;
function check(name, cond, info) {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (info ? '  -> ' + info : '')); }
}
const gateOf = (r, tc) => (r.defects.find(d => d.related_tc_id === tc) || {}).gate;

// ---------- Part A: the real R1 log, unchanged ----------
console.log('Part A - real R1 log as written (' + R1 + ')');
if (fs.existsSync(path.join(REPO, R1))) {
  const a = run(path.join(REPO, R1), {});
  check('R1 BUG-01 (OW-ANC-01) is not FILE', gateOf(a, 'OW-ANC-01') && gateOf(a, 'OW-ANC-01') !== 'FILE', gateOf(a, 'OW-ANC-01'));
  check('R1 BUG-02 (OW-BUN-01) is not FILE', gateOf(a, 'OW-BUN-01') && gateOf(a, 'OW-BUN-01') !== 'FILE', gateOf(a, 'OW-BUN-01'));
  check('missing build is warned', a.warnings.some(w => /build/.test(w)));
} else console.log('  skip (log not present)');

// ---------- Part B: the same claims logged with guardrail fields ----------
console.log('Part B - guardrailed replay (' + path.relative(REPO, FIX) + ')');
const b = run(FIX, {});
check('BUG-01 is CONTRADICTED (Baggage exists at journey level, KB L-01)', gateOf(b, 'OW-ANC-01') === 'CONTRADICTED', gateOf(b, 'OW-ANC-01'));
check('BUG-01 reason names journeysAncillariesDetails', (b.defects.find(d => d.related_tc_id === 'OW-ANC-01') || { reasons: [] }).reasons.some(x => /journeysAncillariesDetails/.test(x)));
check('BUG-01 second opinion disagreed (rule_met yes)', ((b.defects.find(d => d.related_tc_id === 'OW-ANC-01') || {}).second_opinion || {}).rule_met === 'yes');
check('BUG-02 is not FILE', gateOf(b, 'OW-BUN-01') !== 'FILE', gateOf(b, 'OW-BUN-01'));
check('BUG-02 flagged: SPEC marks the bundle rule UNKNOWN', (b.defects.find(d => d.related_tc_id === 'OW-BUN-01') || { reasons: [] }).reasons.some(x => /SPEC itself labels/.test(x)));
check('ADO 65507 (NDC-BUG-0002) is FILE', gateOf(b, 'VERIFY-65507') === 'FILE', JSON.stringify((b.defects.find(d => d.related_tc_id === 'VERIFY-65507') || {}).reasons));
check('ADO 65507 reproduced 2/2', JSON.stringify((b.defects.find(d => d.related_tc_id === 'VERIFY-65507') || {}).repro) === '{"runs":2,"reproduced":2}');
check('no secret leaks in the fixture', b.secret_leaks.length === 0);

// ---------- Part C: synthetic unit cases (NOT real findings) ----------
console.log('Part C - synthetic unit cases (each gate on its own)');
const lines = fs.readFileSync(FIX, 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const real = lines.find(l => l.type === 'finding' && l.related_tc_id === 'VERIFY-65507');
const realTc = lines.find(l => l.type === 'test_case' && l.tc_id === 'VERIFY-65507');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'guardrail-test-'));
function variant(name, mutateTc, mutateF) {
  const tc = JSON.parse(JSON.stringify(realTc)), f = JSON.parse(JSON.stringify(real));
  tc.tc_id = f.related_tc_id = 'SYN-' + name;
  mutateTc && mutateTc(tc); mutateF && mutateF(f);
  const file = path.join(tmp, 'SYN-' + name + '.jsonl');
  fs.writeFileSync(file, [lines[0], tc, f].map(x => JSON.stringify(x)).join('\n') + '\n');
  return run(file, {});
}
// 1. Fully evidenced, reproduced and agreed - but the expectation is the UNKNOWN bundle rule -> QUESTION
const BDL = lines.find(l => l.tc_id === 'OW-BUN-01').expectation_quote;
let r = variant('inferred-spec', null, f => { f.spec_ref = '§6.4'; f.expectation_quote = BDL; });
check('SPEC rule marked UNKNOWN -> QUESTION even with full evidence', gateOf(r, 'SYN-inferred-spec') === 'QUESTION', gateOf(r, 'SYN-inferred-spec'));
r = variant('labelled-inferred', null, f => { f.expectation_source = 'INFERRED'; });
check('expectation_source INFERRED -> QUESTION', gateOf(r, 'SYN-labelled-inferred') === 'QUESTION');
// 2. Invented SPEC rule -> UNVERIFIED
r = variant('invented-rule', null, f => { f.expectation_quote = 'Retrieve must always re-price ancillaries to the FareCheck amount within one second'; });
check('invented SPEC quote -> UNVERIFIED', gateOf(r, 'SYN-invented-rule') === 'UNVERIFIED');
// 3. Wrong observed value -> CONTRADICTED
r = variant('wrong-value', tc => { tc.evidence_refs[1].value = 399.52; });
check('cited value not in saved response -> CONTRADICTED', gateOf(r, 'SYN-wrong-value') === 'CONTRADICTED');
// 4. Only one reproduction -> HOLD
r = variant('one-repro', null, f => { f.repro.records = f.repro.records.slice(0, 1); });
check('reproduced once -> HOLD', gateOf(r, 'SYN-one-repro') === 'HOLD');
// 5. Second run did not reproduce -> FILE + FLAKY
r = variant('flaky', null, f => { f.repro.records[0].reproduced = false; });
check('reproduced 1/2 -> FILE with FLAKY flag', gateOf(r, 'SYN-flaky') === 'FILE' && r.defects[0].flags.some(x => /FLAKY 1\/2/.test(x)));
// 6. No second opinion -> HOLD ; reviewer cannot tell -> NEEDS-HUMAN
r = variant('no-2nd', null, f => { delete f.second_opinion; });
check('no second opinion -> HOLD', gateOf(r, 'SYN-no-2nd') === 'HOLD');
r = variant('2nd-unclear', null, f => { f.second_opinion.rule_met = 'cannot_tell'; });
check('second opinion cannot_tell -> NEEDS-HUMAN', gateOf(r, 'SYN-2nd-unclear') === 'NEEDS-HUMAN');
// 7. Missing evidence file / wrong SPEC section -> UNVERIFIED
r = variant('missing-file', tc => { tc.evidence_refs[0].source = 'NDC_Integration/Harness/AirArabiaPlus/out/raw_xlsx/does_not_exist.json'; });
check('evidence file missing -> UNVERIFIED', gateOf(r, 'SYN-missing-file') === 'UNVERIFIED');
r = variant('wrong-section', null, f => { f.spec_ref = '§2.1'; });
check('quote not in the cited section -> UNVERIFIED', gateOf(r, 'SYN-wrong-section') === 'UNVERIFIED');
// 8. Leaked key in the log -> exit 1
r = variant('leak', tc => { tc.request_full = { headers: { 'x-api-key': 'SYNTHETIC-NOT-A-REAL-KEY-123' } }; });
check('non-redacted x-api-key -> leak reported, exit 1', r.secret_leaks.length === 1 && r.exit === 1);
fs.rmSync(tmp, { recursive: true, force: true });

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
