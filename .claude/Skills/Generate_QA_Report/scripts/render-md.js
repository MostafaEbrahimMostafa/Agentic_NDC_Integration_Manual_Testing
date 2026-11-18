// Re-renders the run's .md from its .jsonl (pure function of the JSONL).
// Usage: node render-md.js <slug> [--dir <logs folder>]      (default folder: NDC_Integration/Artifacts/Logs)
// Output contract (Enhancement Plan Step 5, ../../_shared/Output_Contracts.md): pyramid layout -
// verdict and counts first, top risks and blockers inside the first 15 lines, then details, then
// raw evidence links. Every number is computed here from the JSONL; none is typed by the LLM.
const fs = require('fs'), path = require('path');

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const oneLine = (s, n) => { const t = String(s == null ? '' : s).replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; };
const fmtDur = ms => { const s = Math.round(ms / 1000); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60; return (h ? h + 'h ' : '') + (h || m ? m + 'm ' : '') + r + 's'; };
const list3 = (items, total) => items.slice(0, 3).join('; ') + (total > 3 ? ` (+${total - 3} more)` : '');

function render(L, slug) {
  const rs = L.find(x => x.type === 'run_start') || {}, re = L.find(x => x.type === 'run_end');
  const tcs = L.filter(x => x.type === 'test_case');
  const cnt = v => tcs.filter(t => t.verdict === v).length;
  const tsAll = [];
  L.forEach(x => ['started_at', 'ended_at', 'at', 'reporting_ended_at', 'timestamp'].forEach(k => { if (x[k]) tsAll.push(Date.parse(x[k])); }));
  const maxTs = Math.max(...tsAll);
  const ended = re ? new Date(maxTs).toISOString() : null;

  // latest line wins per defect (related_tc_id + bug_id), per AI_Guardrails / log-schema
  const fd = L.filter(x => x.type === 'finding');
  const defMap = new Map();
  fd.filter(f => f.kind === 'defect').forEach(f => defMap.set(f.related_tc_id + '|' + (f.bug_id || ''), f));
  const defects = [...defMap.values()];
  // distinct defects: one per bug_id (a recurring bug seen on several test cases counts once), else one per test case
  const distinct = new Map();
  defects.forEach(f => { const k = f.bug_id || 'tc:' + f.related_tc_id; if (!distinct.has(k)) distinct.set(k, { f, tcs: new Set() }); distinct.get(k).tcs.add(f.related_tc_id); });
  const cl = L.filter(x => x.type === 'cleanup');
  const failed = tcs.filter(t => t.verdict === 'FAIL'), blocked = tcs.filter(t => t.verdict === 'BLOCKED');
  const builds = L.filter(x => x.type === 'build_change');

  // ---------- 1. Pyramid summary (must stay within the first 15 lines) ----------
  const status = !re ? 'RUNNING' : re.status === 'complete' ? 'COMPLETE' : 'INTERRUPTED after ' + re.interrupted_after_tc;
  const light = !re && !tcs.length ? '⏳' : failed.length || defects.length ? '🔴' : blocked.length || (re && re.status !== 'complete') ? '🟡' : '🟢';
  const word = light === '🔴' ? 'FAILURES FOUND' : light === '🟡' ? 'PASSED WITH BLOCKERS' : light === '🟢' ? 'ALL PASSED' : 'NOT STARTED';
  const o = [];
  o.push(`# QA Execution Report — ${rs.title_line || rs.scope || slug}`, '');
  o.push(`**Verdict:** ${light} ${word} · **Status:** ${status} · ${esc(rs.supplier)} / ${esc(rs.credentials_selector)} · build ${esc((rs.build && rs.build.label) || 'not recorded')}`, '');
  o.push('| Logged | Planned | Pass | Fail | Blocked | Defects | Cleanup |', '|---|---|---|---|---|---|---|');
  o.push(`| ${tcs.length} | ${rs.total_test_cases_planned == null ? '?' : rs.total_test_cases_planned} | ${cnt('PASS')} | ${failed.length} | ${blocked.length} | ${distinct.size} | ${cl.length} |`, '');
  const risks = [...distinct.values()].map(({ f, tcs: on }) => `${f.bug_id ? f.bug_id + ' (' + on.size + ' TC' + (on.size > 1 ? 's' : '') + ')' : f.related_tc_id}: ${esc(oneLine(f.summary, 70))}`);
  const failOnly = failed.filter(t => !defects.some(f => f.related_tc_id === t.tc_id)).map(t => `${t.tc_id} FAIL`);
  const allRisks = risks.concat(failOnly);
  o.push(`**Top risks:** ${allRisks.length ? list3(allRisks, allRisks.length) : 'none'}`);
  const blk = blocked.map(t => `${t.tc_id}: ${esc(oneLine(t.actual, 50))}`);
  if (re && re.status === 'interrupted') blk.unshift(`run interrupted: ${esc(oneLine(re.reason, 50))}`);
  if (builds.length) blk.unshift(`build changed mid-run (${builds.length}x)`);
  o.push(`**Blockers:** ${blk.length ? list3(blk, blk.length) : 'none'}`);
  o.push(`**Cleanup:** ${cl.length ? cl.length + ' live hold/PNR(s) left — see Cleanup' : 'nothing left behind'}`, '');

  // ---------- 2. Run details ----------
  o.push('## Run details', '');
  o.push(`- **Environment:** ${rs.environment_text || rs.environment || 'staging'} &middot; ${rs.baseUrl}`, `- **Supplier:** ${rs.supplier} · **Credentials Selector:** ${rs.credentials_selector}`, `- **Started:** ${rs.started_at}`);
  if (re) {
    o.push(`- **Ended:** ${ended}`);
    if (L.some(x => x.type === 'reporting_op' && /Time Breakdown/.test(x.operation))) o.push(`- **Execution Duration:** ${fmtDur(maxTs - Date.parse(rs.started_at))} ([View Time Breakdown](${slug}_TimeBreakdown.html))`);
  }
  if (rs.build) o.push(`- **Build:** ${esc(rs.build.label)} (source: ${esc(rs.build.source)})`);
  builds.forEach(b => o.push(`- **Build change** at ${b.at}: ${esc(b.from)} → ${esc(b.to)} (${esc(b.evidence)})`));
  o.push('- **Prior runs:** ' + (rs.prior_runs || 'see NDC_Integration/Artifacts/Logs/'), '');
  const sn = L.find(x => x.type === 'scope_note'); if (sn) { o.push('## Scope note', '', sn.text, ''); }
  if (failed.length || blocked.length) {
    o.push('## Failed and blocked', '');
    if (failed.length) o.push(`- **Failed (${failed.length}):** ${failed.map(t => t.tc_id).join(', ')}`);
    if (blocked.length) o.push(`- **Blocked (${blocked.length}):** ${blocked.map(t => t.tc_id).join(', ')}`);
    o.push('');
  }

  // ---------- 3. Details ----------
  o.push('## Test case results', '');
  for (const t of tcs) {
    o.push(`### ${t.tc_id} — ${t.verdict}`, '', `- **Test Case:** ${esc(t.title)}`, `- **Category:** ${esc(t.category)}`, `- **Endpoint Name:** ${esc(t.endpoint_or_flow)}`, `- **Request:** ${esc(t.request_summary)}`, `- **Response:** ${esc(t.response_summary)}`, `- **Expected:** ${esc(t.expected)}`, `- **Actual:** ${esc(t.actual)}`, `- **Status:** ${t.verdict}`, `- **Evidence:** ${esc(t.evidence)}`, '');
    if (t.hops) t.hops.forEach(h => o.push(`  - **Hop ${h.hop} &mdash; ${esc(h.endpoint)}:** ${h.verdict} &mdash; ${esc(h.response_summary)}`));
    if (t.attempts) t.attempts.forEach(a => o.push(`  - **${esc(a.label)}:** HTTP ${a.response_full ? a.response_full.status : 'not captured'}`));
    if (t.hops || t.attempts) o.push('');
  }
  o.push('## Findings', '');
  if (!fd.length) o.push('No findings logged yet.', '');
  else {
    const unk = fd.filter(f => f.kind === 'unknown_resolution'), rec = fd.filter(f => f.kind === 'reconfirmed');
    if (defects.length) { o.push('### Defects', ''); defects.forEach(f => o.push(`- **[${f.related_tc_id}] ${f.bug_id ? f.bug_id + (f.occurrence ? ` (occurrence ${f.occurrence}, not new)` : ' (new)') + ' &mdash; ' : ''}${esc(f.summary)}** Field: \`${esc(f.field_name)}\`. Expected: ${esc(f.expected_value)}. ${f.history ? '**History:** ' + esc(f.history) + ' ' : ''}**Impact:** ${esc(f.impact)} Evidence: ${esc(f.evidence)}`)); o.push(''); }
    if (unk.length) { o.push('### Unknown-resolutions', ''); unk.forEach(f => o.push(`- **[${f.related_tc_id}]** ${esc(f.summary)} Evidence: ${esc(f.evidence)}`)); o.push(''); }
    if (rec.length) { o.push('### Also re-confirmed', ''); rec.forEach(f => o.push(`- **[${f.related_tc_id}] ${f.bug_id}** &mdash; ${esc(f.summary)}`)); o.push(''); }
    const nr = L.filter(x => x.type === 'not_reproduced'); if (nr.length) { o.push('### Not reproduced', ''); nr.forEach(n => o.push(`- **${n.bug_id}** (${esc(n.short_name)}) &mdash; exercised by ${n.related_tc_ids.join(', ')}. ${esc(n.note)}`)); o.push(''); }
  }
  const ob = L.filter(x => x.type === 'observation');
  if (ob.length) { o.push('## Observations', ''); ob.forEach(x => o.push(`- ${x.related_tc_id ? '**[' + x.related_tc_id + ']** ' : ''}${esc(x.text)}`)); o.push(''); }
  o.push('## Proposed SPEC.md updates', '');
  const sp = L.filter(x => x.type === 'spec_update_proposed'); if (!sp.length) o.push('No SPEC.md updates proposed in this run.', '');
  sp.forEach(s => o.push(`- ${s.section} &mdash; status: *${s.status}*`, `  - **Old:** "${esc(s.old_text)}"`, `  - **New:** "${esc(s.new_text)}"`, ...(s.note ? [`  - **Correction:** ${esc(s.note)}`] : []), ''));
  o.push('## Cleanup / follow-up', '');
  if (!cl.length) o.push('Nothing left needing cleanup.', '');
  else { o.push(`Live artifacts left behind this round (${cl.length}):`, ''); cl.forEach(c => o.push(`- **${c.kind}** &mdash; pnr ${c.pnr} (${c.related_tc_id}) &mdash; ${esc(c.note)}`)); o.push(''); }

  // ---------- 4. Raw evidence links ----------
  o.push('## Evidence', '', `- Source log: [${slug}.jsonl](${slug}.jsonl)`, `- Guardrail check: [${slug}_evidence.md](${slug}_evidence.md) (written by verify-evidence.js)`);
  if (re) o.push(`- HTML report: [${slug}.html](${slug}.html)`);
  return o.join('\n') + '\n';
}

const readLog = file => fs.readFileSync(file, 'utf8').split('\n').filter(s => s.trim()).map(l => JSON.parse(l));

module.exports = { render, readLog };

if (require.main === module) {
  const args = process.argv.slice(2);
  const slug = args[0];
  const di = args.indexOf('--dir');
  const dir = di >= 0 ? path.resolve(args[di + 1]) : path.resolve(__dirname, '../../../..', 'NDC_Integration/Artifacts/Logs');
  if (!slug) { console.error('usage: node render-md.js <slug> [--dir <logs folder>]'); process.exit(2); }
  fs.writeFileSync(path.join(dir, slug + '.md'), render(readLog(path.join(dir, slug + '.jsonl')), slug), 'utf8');
}
