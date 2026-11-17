// finalize.js stage1: normalise the run log (merge reporting stamps, latest line per test case, findings, SPEC proposals, scope notes).
//             stage2: add consolidated defect findings (bug_findings.json), phases, run_end; render md/html/time-breakdown.
const G = require('./gl'); const fs = require('fs'), path = require('path'), cp = require('child_process');
const R = G.R; const stage = process.argv[2]; const slug = R.slug(); const f = path.join(R.LOGS, slug + '.jsonl');
const load = () => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const save = L => fs.writeFileSync(f, L.map(x => JSON.stringify(x)).join('\n') + '\n');
const run = (script, args = []) => cp.execFileSync('node', [script, ...args], { stdio: 'pipe', maxBuffer: 1 << 28 }).toString();
const SK = path.join(R.ROOT, '.claude/skills/Generate_QA_Report/scripts');

if (stage === 'stage1') {
  let L = load();
  const stamp = {}; L.filter(x => x.type === 'reporting_stamp').forEach(s => stamp[s.tc_id] = s.reporting_ended_at);
  L = L.filter(x => x.type !== 'reporting_stamp').map(x => { if (x.type === 'test_case') { if (stamp[x.tc_id]) x.reporting_ended_at = stamp[x.tc_id]; if (!x.reporting_ended_at) x.reporting_ended_at = x.reporting_started_at; } return x; });
  const lastIdx = {}; L.forEach((x, i) => { if (x.type === 'test_case') lastIdx[x.tc_id] = i; }); L = L.filter((x, i) => x.type !== 'test_case' || lastIdx[x.tc_id] === i);
  const have = new Set(L.filter(x => x.type === 'test_case').map(x => x.tc_id)); const verdict = Object.fromEntries(L.filter(x => x.type === 'test_case').map(x => [x.tc_id, x.verdict]));
  // keep the unknown-resolution findings of test cases that still exist and whose latest verdict is not BLOCKED; drop the first-draft defect lines (replaced by BUG-NN in stage2)
  const seen = new Set(); L = L.filter(x => { if (x.type !== 'finding') return true; if (x.kind === 'defect' || x.kind === 'reconfirmed') return false; if (seen.has(x.summary)) return false; seen.add(x.summary); return !!x.related_tc_id && have.has(x.related_tc_id); });
  L = L.filter(x => !['scope_note', 'spec_update_proposed', 'run_end'].includes(x.type) && !(x.type === 'phase' && ['Test Execution', 'Bug Reporting', 'Report Generation'].includes(x.name) && x.event === 'end'));
  const lastTc = Math.max(...L.filter(x => x.type === 'test_case').map(x => Date.parse(x.timestamp))); const invStart = (L.find(x => x.type === 'phase' && x.name === 'Bug Investigation' && x.event === 'start') || {}).at;
  L.push({ type: 'phase', name: 'Test Execution', event: 'end', at: new Date(Math.min(lastTc + 1, invStart ? Date.parse(invStart) : Infinity)).toISOString() });
  { const rs = L.find(x => x.type === 'run_start'); if (rs) rs.total_test_cases_planned = G.rows.length; }
  require('./r3notes')(L, G);
  save(L); R.render(); console.log('stage1 ok; test cases', have.size, 'findings', L.filter(x => x.type === 'finding').length);
}
if (stage === 'stage2') {
  let L = load(); const bf = JSON.parse(fs.readFileSync(path.join(__dirname, 'bug_findings.json'), 'utf8'));
  const t0 = R.now(); L.push({ type: 'phase', name: 'Bug Reporting', event: 'start', at: t0 }); bf.forEach(b => L.push(b)); const t1 = R.now();
  L.push({ type: 'reporting_op', operation: 'Bug Report Generation', started_at: t0, ended_at: t1, related_tc_ids: [...new Set(bf.map(b => b.related_tc_id))] }, { type: 'phase', name: 'Bug Reporting', event: 'end', at: t1 });
  L.push(process.env.RUN_STATUS === 'interrupted' ? { type: 'run_end', status: 'interrupted', interrupted_after_tc: process.env.AFTER_TC, of_total: G.rows.length, reason: process.env.RUN_REASON, ended_at: t1 } : { type: 'run_end', status: 'complete', ended_at: t1 }); save(L);
  const g0 = R.now(); L.push({ type: 'phase', name: 'Report Generation', event: 'start', at: g0 }); save(L);
  run(path.join(SK, 'render-md.js'), [slug]); const h0 = R.now(); run(path.join(SK, 'render-html.js'), [slug]); const h1 = R.now(); L.push({ type: 'reporting_op', operation: 'Final HTML Report Generation', started_at: h0, ended_at: h1 }); save(L);
  const k0 = R.now(); run(path.join(SK, 'render-tb.js'), [slug]); const k1 = R.now(); L.push({ type: 'reporting_op', operation: 'Time Breakdown Report Generation', started_at: k0, ended_at: k1 }, { type: 'phase', name: 'Report Generation', event: 'end', at: k1 }); save(L);
  run(path.join(SK, 'render-md.js'), [slug]); run(path.join(SK, 'render-html.js'), [slug]); run(path.join(SK, 'render-tb.js'), [slug]);
  console.log('rendered', fs.readdirSync(R.LOGS).filter(x => x.startsWith(slug)).join(', '));
}
