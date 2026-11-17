// Executes test-case definitions sequentially and logs each to the run's JSONL/MD.  usage: node runner.js <group[,group]> [idRegex]
const R = require('./recorder'); const B = require('./tcbuild'); const F = require('./flow'); const C = require('./chain');
const { now } = require('./core');
const groups = (process.argv[2] || '').split(','); const idRe = process.argv[3] ? new RegExp(process.argv[3]) : null;
const done = new Set(require('fs').readFileSync(R.LOGS + '/' + R.slug() + '.jsonl', 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)).filter(x => x.type === 'test_case').map(x => x.tc_id));
function logCleanup(tcid, r) {
  if (r && r.booking) R.cleanup({ kind: r.hold && !r.bookedFinal ? 'family_b_hold' : 'needs_void_cancel', pnr: r.booking.pnr, related_tc_id: tcid, note: r.cleanNote });
}
async function runOne(c) {
  const t0 = now(); let tc;
  try {
    if (c.run === 'flow') {
      const spec = { id: c.id, routes: c.routes, types: c.types, conn: c.conn, enrich: c.enrich, hold: c.hold, family: c.family, seed: 0 };
      const r = await F.runFlowRetry(spec);
      tc = B.flowTC(c, r); tc.started_at = r.ctx.started_at;
      if (r.booking) { const finalBooked = ['A', 'C', 'D', 'E'].includes(c.family); R.cleanup({ kind: finalBooked ? 'needs_void_cancel' : 'family_b_hold', pnr: r.booking.pnr, related_tc_id: c.id, note: finalBooked ? 'Ticketed booking; Void/CancelAfterHold are not supported by AirArabiaPlus (409 OperationNotSupported), so it cannot be cleaned up through the API' : 'Held, not finalized; expires at holdExpirationDate ' + (r.holdExp || '') + ' (about 75 min after Hold)' }); }
      if (tc.verdict === 'FAIL') R.finding({ kind: 'defect', related_tc_id: c.id, field_name: r.failedAt || 'checks', summary: `${c.id} fails at ${r.failedAt || 'a validation check'}: ${(r.why || r.checks.filter(x => !x.pass).map(x => x.name + ' [' + x.detail + ']').join('; ')).slice(0, 300)}`, spec_ref: c.spec, expected_value: 'step succeeds / check holds', impact: 'flow cannot complete for this enrichment/family on AirArabiaPlus', evidence: tc.evidence.slice(0, 400) });
    } else if (c.blocked) {
      tc = { tc_id: c.id, title: c.title, endpoint_or_flow: c.endpoint || 'Flow (not started)', category: c.category, verdict: 'BLOCKED', spec_ref: c.spec, request_summary: 'None sent — prerequisite not met (no request fired for this row)', response_summary: 'n/a', expected: c.expected, actual: c.blocked, evidence: c.blocked + ' No live request exists for this row, so no request/response panel is shown.', started_at: t0, timestamp: now() };
      tc.plain = B.plain({ ...tc, plain_request: 'Nothing was sent — the earlier step this check depends on is not possible.', plain_response: 'n/a' });
    } else {
      const res = await c.run(); res.started_at = res.started_at || t0;
      tc = B.customTC(c, res);
      if (res.finding) R.finding({ related_tc_id: c.id, ...res.finding });
      (res.findings || []).filter(Boolean).forEach(f => R.finding({ related_tc_id: c.id, ...f }));
      (res.cleanup || []).forEach(x => R.cleanup({ related_tc_id: c.id, ...x }));
    }
  } catch (e) {
    tc = { tc_id: c.id, title: c.title, endpoint_or_flow: c.endpoint || 'n/a', category: c.category, verdict: 'BLOCKED', spec_ref: c.spec || '', request_summary: 'runner error', response_summary: 'n/a', expected: c.expected, actual: 'Execution error in the test harness (not an API result): ' + String(e.stack || e).slice(0, 400), evidence: 'harness exception; case needs a re-run', started_at: t0 };
    tc.plain = B.plain(tc);
  }
  tc.timestamp = now();
  R.logTC(tc);
  console.log(`${tc.verdict.padEnd(7)} ${tc.tc_id}  ${String(tc.actual).slice(0, 150).replace(/\s+/g, ' ')}`);
}
(async () => {
  let all = [];
  for (const g of groups) { const m = require('./' + g); all = all.concat(m.cases); }
  const PRI = { carrier: 0, route: 1, upsell: 2, booking: 3, flow: 4, upsellflow: 9 }; const todo = all.filter(c => !done.has(c.id) && (!idRe || idRe.test(c.id))).sort((a, b) => (PRI[a.group] ?? 5) - (PRI[b.group] ?? 5));
  console.log('to run', todo.length, 'of', all.length);
  for (const c of todo) await runOne(c);
  console.log('batch complete');
})();
