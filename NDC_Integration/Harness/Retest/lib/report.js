// RC Re-Test report: summary table first, then the regression ring, human actions, cleanup, details.
// Every count in the report is computed here from the results - never typed by hand or by the LLM.
const md = s => String(s === undefined || s === null ? '' : s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
const link = (p, label) => p ? `[${label || 'evidence'}](${p})` : '';

function counts(list, key, values) { const c = {}; values.forEach(v => c[v] = 0); list.forEach(x => { c[x[key]] = (c[x[key]] || 0) + 1; }); return c; }

function render(run) {
  const { meta, bugs, neighbours, unresolved, cleanup } = run;
  const VERDICTS = ['Fixed', 'Still reproduces', 'Blocked (env/data)', 'Behaviour changed – needs review'];
  const c = counts(bugs, 'verdict', VERDICTS);
  const nc = counts(neighbours, 'verdict', ['Pass', 'Fail', 'Blocked (env/data)']);
  const L = [];
  L.push(`# RC Re-Test — ${meta.supplier} / ${meta.selector} on ${meta.env}`);
  L.push('');
  L.push(`**Result:** ${bugs.length} bug(s): **${c['Fixed']} Fixed** · **${c['Still reproduces']} Still reproduces** · ${c['Blocked (env/data)']} Blocked (env/data) · ${c['Behaviour changed – needs review']} Behaviour changed – needs review` +
    (neighbours.length ? ` | Regression ring: ${nc.Pass} pass · ${nc.Fail} fail · ${nc['Blocked (env/data)']} blocked` : ' | Regression ring: not run') +
    (unresolved.length ? ` | **${unresolved.length} input(s) not re-tested** (see below)` : ''));
  L.push('');
  L.push(`**Build under test:** ${meta.build || 'not given'} · **Build/version headers seen:** ${meta.buildHeaders.length ? meta.buildHeaders.map(md).join('; ') : 'none returned by the API'}`);
  L.push(`**Host:** \`${meta.host}\` · **Run:** \`${meta.slug}\` · ${meta.started} → ${meta.ended}${meta.draftRun ? ' · ⚠ includes DRAFT recipes (registry not updated for them)' : ''}`);
  L.push('');
  L.push('| # | Input | Global ID | ADO | Title | Severity | Verdict | Registry status | Why | Evidence |');
  L.push('|---|---|---|---|---|---|---|---|---|---|');
  bugs.forEach((b, i) => L.push(`| ${i + 1} | ${md(b.inputs.join('; '))} | ${b.globalId} | ${md(b.ado || '—')} | ${md(b.title)} | ${md(b.severity || '—')} | **${b.verdict}** | ${md(b.statusTo || b.statusFrom)}${b.statusTo && b.statusTo !== b.statusFrom ? ' (was ' + md(b.statusFrom) + ')' : ''} | ${md(b.why)} | ${link(b.keyEvidence)} |`));
  L.push('');
  if (neighbours.length) {
    L.push('## Regression ring (neighbour flows)');
    L.push('');
    L.push('| Flow | Run for | Test data | Verdict | Why | Evidence |');
    L.push('|---|---|---|---|---|---|');
    neighbours.forEach(n => L.push(`| ${n.flowId} | ${n.forBugs.join(', ')} | ${md(n.testData)} | **${n.verdict}** | ${md(n.why)} | ${link(n.keyEvidence)} |`));
    L.push('');
  }
  L.push('## Needs a human');
  L.push('');
  const pend = bugs.filter(b => b.statusTo === 'Fixed-Pending-Signoff');
  const changed = bugs.filter(b => b.verdict === 'Behaviour changed – needs review');
  if (pend.length) L.push(`- **Sign off "Fixed" (Critical/High/unrated):** ${pend.map(b => b.globalId).join(', ')} — check the evidence, then \`node NDC_Integration/Harness/Retest/registry.js signoff <GlobalId> --by "<name>"\`.`);
  if (changed.length) L.push(`- **Behaviour changed – review:** ${changed.map(b => b.globalId).join(', ')} — neither the fixed state nor the bug signature matched; decide whether the recipe or the product changed.`);
  unresolved.forEach(u => L.push(`- **Not re-tested:** ${md(u.input)} — ${md(u.reason)}`));
  if (!pend.length && !changed.length && !unresolved.length) L.push('- Nothing.');
  L.push('');
  L.push('## Cleanup (holds / bookings left open)');
  L.push('');
  if (cleanup.length) {
    L.push('| PNR | Kind | State | Created by | For |');
    L.push('|---|---|---|---|---|');
    cleanup.forEach(x => L.push(`| ${md(x.pnr)} | ${md(x.kind)} | ${md(x.state)} | ${md(x.step)} | ${md(x.for)} |`));
  } else L.push('No hold or booking was created.');
  L.push('');
  L.push('## Details');
  for (const b of bugs.concat(neighbours.map(n => ({ ...n, globalId: n.flowId, title: 'Neighbour flow for ' + n.forBugs.join(', ') })))) {
    L.push('');
    L.push(`### ${b.globalId} — ${md(b.title)}`);
    L.push('');
    L.push(`**Verdict:** ${b.verdict} — ${md(b.why)}${b.recipeFile ? ` · Recipe: \`${b.recipeFile}\` (${b.recipeState})` : ''}`);
    if (b.chain && b.chain.length) L.push(`**Chain:** ${b.chain.map(h => `${h.alias} ${h.status}`).join(' → ')}`);
    if (b.notes && b.notes.length) L.push(`**Notes:** ${b.notes.map(md).join(' · ')}`);
    const rows = [].concat((b.pre || []).map(r => ['precondition', r]), (b.fix || []).map(r => ['fixed-state', r]), (b.rep || []).map(r => ['bug signature', r]));
    if (rows.length) {
      L.push('');
      L.push('| Kind | Step | Path | Expected | Actual | Result | Evidence |');
      L.push('|---|---|---|---|---|---|---|');
      rows.forEach(([k, r]) => L.push(`| ${k} | ${r.step} | \`${md(r.path)}\` | ${md(r.expected)} | ${md(r.reason || r.actual)} | ${!r.evaluable ? 'n/a' : r.pass ? 'match' : 'no match'} | ${link(r.evidence)} |`));
    }
  }
  L.push('');
  L.push('---');
  L.push('Generated by `NDC_Integration/Harness/Retest/runner.js` from `retest.jsonl` in this folder. Verdicts come from the recipe assertions (code), not from an LLM reading the responses.');
  return L.join('\n') + '\n';
}

module.exports = { render };
