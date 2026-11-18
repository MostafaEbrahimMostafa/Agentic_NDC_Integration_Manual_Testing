#!/usr/bin/env node
// validate-output.js - one entry point for every output contract (Enhancement Plan Step 5).
// Picks the validator from the path, runs it, prints verdict and counts first.
//
//   <file>.csv                         -> validate-csv.js           (add --new for a just-generated file)
//   <slug>.jsonl                       -> validate-jsonl.js + validate-report.js (the .md must equal a fresh render)
//   BugReports/<slug>/ or BUG-*/ or BUG-*.md -> validate-bug-report.js
//   <file>.xlsx --source <csv|jsonl>   -> validate-xlsx.js
//   <file>.docx --source <md>          -> validate-docx.js
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/validate-output.js <path> [<path> ...] [--new] [--source <src>] [--json]
// Exit code: 0 = every output passes its contract, 1 = contract errors, 2 = usage or read error.
'use strict';
const fs = require('fs');
const path = require('path');
const { createResult, finish, parseArgs, usage } = require('./lib/result.js');
const { validateCsv } = require('./validate-csv.js');
const { validateJsonl } = require('./validate-jsonl.js');
const { validateReport } = require('./validate-report.js');
const { validateBugReports } = require('./validate-bug-report.js');
const { validateXlsx } = require('./validate-xlsx.js');
const { validateDocx } = require('./validate-docx.js');

function dispatch(p, args) {
  const abs = path.resolve(p);
  if (!fs.existsSync(abs)) { const r = createResult('output', p); r.error('', 'not found'); return [r]; }
  const isDir = fs.statSync(abs).isDirectory();
  if (isDir || /(^|[\\/])BUG-[^\\/]*\.md$/i.test(abs)) return validateBugReports([abs], args);
  if (/\.csv$/i.test(abs)) return [validateCsv(abs, args)];
  if (/\.jsonl$/i.test(abs)) {
    const shape = validateJsonl(abs);
    return shape.errors.length ? [shape] : [shape, validateReport(abs)];
  }
  const needSource = kind => { const r = createResult(kind, p); r.error('', 'needs --source <file> (the file it was rendered from)'); return [r]; };
  if (/\.xlsx$/i.test(abs)) return args.source ? [validateXlsx(abs, args.source)] : needSource('xlsx render');
  if (/\.docx$/i.test(abs)) return args.source ? [validateDocx(abs, args.source)] : needSource('docx render');
  const r = createResult('output', p); r.error('', 'no output contract for this file type (csv, jsonl, bug report, xlsx, docx)'); return [r];
}

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), ['new', 'json']);
  if (!args._.length) return usage('usage: node validate-output.js <path> [<path> ...] [--new] [--source <src>] [--json]');
  const results = args._.flatMap(p => dispatch(p, args));
  if (!args.json && results.length > 1) {
    const bad = results.filter(r => r.errors.length).length;
    console.log(`${bad ? 'FAIL' : 'PASS'}  ${results.length - bad} of ${results.length} output(s) meet their contract\n`);
  }
  finish(results, args);
}

module.exports = { dispatch };
