#!/usr/bin/env node
// validate-report.js - output contract check for a run report (Enhancement Plan Step 5).
// Contract: ../contracts/report.contract.json.
//
// 1. "Rendered, never hand-written": the <slug>.md on disk must equal a fresh render of <slug>.jsonl
//    by Generate_QA_Report/scripts/render-md.js. Any difference means someone typed into the report.
// 2. Pyramid rule: verdict, counts, top risks and blockers appear within the first 15 lines.
// 3. After run_end: the .html and the guardrail <slug>_evidence.md exist and are not older than the log.
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/validate-report.js <run.jsonl> [more.jsonl ...] [--json]
// Exit code: 0 = passes, 1 = contract errors, 2 = usage or read error.
'use strict';
const fs = require('fs');
const path = require('path');
const { createResult, finish, parseArgs, usage } = require('./lib/result.js');
const { render, readLog } = require('../../Generate_QA_Report/scripts/render-md.js');
const C = require('../contracts/report.contract.json');

function firstDiff(a, b) {
  const x = a.split('\n'), y = b.split('\n');
  for (let i = 0; i < Math.max(x.length, y.length); i++) if (x[i] !== y[i]) return { line: i + 1, disk: x[i], render: y[i] };
  return null;
}

function validateReport(jsonlFile) {
  const r = createResult('run report', jsonlFile);
  const dir = path.dirname(jsonlFile), slug = path.basename(jsonlFile).replace(/\.jsonl$/, '');
  let L;
  try { L = readLog(jsonlFile); } catch (e) { r.error('', 'cannot read the log: ' + e.message + ' (run validate-jsonl.js first)'); return r; }
  const expected = render(L, slug);

  // pyramid rule, checked on the render (the contract the renderer must meet)
  const head = expected.split('\n').slice(0, C.summaryWithinLines).join('\n');
  C.summaryMarkers.forEach(m => { if (!head.includes(m)) r.error('summary', `"${m}" is not within the first ${C.summaryWithinLines} lines`); });

  const mdFile = path.join(dir, slug + '.md');
  if (!fs.existsSync(mdFile)) r.error(slug + '.md', 'missing; render it: node .claude/Skills/Generate_QA_Report/scripts/render-md.js ' + slug);
  else {
    const disk = fs.readFileSync(mdFile, 'utf8').replace(/\r\n/g, '\n');
    const d = firstDiff(disk, expected);
    if (d) r.error(slug + '.md', `differs from a fresh render of the JSONL at line ${d.line} (hand-edited or stale). Re-render; put corrections in the JSONL as appended lines. disk: "${String(d.disk).slice(0, 80)}" | render: "${String(d.render).slice(0, 80)}"`);
  }

  const ended = L.some(x => x.type === 'run_end');
  const logTime = fs.statSync(jsonlFile).mtimeMs;
  if (ended) {
    for (const [f, why] of [[slug + '.html', 'final HTML report'], [slug + '_evidence.md', 'guardrail check (verify-evidence.js)']]) {
      const p = path.join(dir, f);
      if (!fs.existsSync(p)) r.warn(f, `missing ${why}`);
      else if (fs.statSync(p).mtimeMs + 1000 < logTime) r.warn(f, `older than the log; re-render the ${why}`);
    }
  }
  const tcs = L.filter(x => x.type === 'test_case');
  r.info.test_cases = tcs.length;
  r.info.status = ended ? 'ended' : 'running';
  return r;
}

module.exports = { validateReport };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), ['json']);
  if (!args._.length) return usage('usage: node validate-report.js <run.jsonl> [more.jsonl ...] [--json]');
  finish(args._.map(f => validateReport(path.resolve(f))), args);
}
