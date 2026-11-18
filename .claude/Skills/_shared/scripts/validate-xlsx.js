#!/usr/bin/env node
// validate-xlsx.js - output contract check for a stakeholder spreadsheet (Enhancement Plan Step 5).
// Rule: same columns and same cells as the source (CSV, or the JSONL results columns). The file is
// read back with the retest harness's independent .xlsx reader (Harness/Retest/lib/xlsx.js), so a
// writer bug cannot hide itself.
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/validate-xlsx.js <file.xlsx> --source <source.csv|run.jsonl> [--json]
// Exit code: 0 = passes, 1 = contract errors, 2 = usage or read error.
'use strict';
const path = require('path');
const { REPO, createResult, finish, parseArgs, usage } = require('./lib/result.js');
const { readTable } = require('./lib/table-source.js');
const { readSheet } = require(path.join(REPO, 'NDC_Integration', 'Harness', 'Retest', 'lib', 'xlsx.js'));

function validateXlsx(file, source) {
  const r = createResult('xlsx render', file);
  let got, want;
  try { got = readSheet(file); } catch (e) { r.error('', 'cannot read workbook: ' + e.message); return r; }
  try { want = readTable(source).rows; } catch (e) { r.error('source', 'cannot read source: ' + e.message); return r; }
  const width = want[0].length;
  const pad = row => { const a = row.slice(0, Math.max(width, row.length)); while (a.length < width) a.push(''); return a; };
  if (pad(got[0] || []).join('\u0001') !== want[0].join('\u0001')) r.error('header', `columns differ from the source: [${(got[0] || []).join(', ')}] vs [${want[0].join(', ')}]`);
  if (got.length !== want.length) r.error('rows', `${got.length - 1} data rows, source has ${want.length - 1}`);
  let diffs = 0;
  for (let i = 1; i < Math.min(got.length, want.length); i++) {
    const g = pad(got[i]), w = want[i];
    if (g.length > width) r.error(`row ${i + 1}`, `has ${g.length} columns, source has ${width}`);
    for (let k = 0; k < width; k++) if (g[k] !== w[k]) {
      if (++diffs <= 10) r.error(`row ${i + 1} "${want[0][k]}"`, 'cell differs from the source (re-render with render-xlsx.js; never edit by hand)');
    }
  }
  if (diffs > 10) r.error('cells', `${diffs - 10} more cell differences`);
  r.info.rows = got.length - 1;
  r.info.columns = width;
  r.info.source = path.relative(REPO, path.resolve(source)).split(path.sep).join('/');
  return r;
}

module.exports = { validateXlsx };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), ['json']);
  if (!args._[0] || !args.source) return usage('usage: node validate-xlsx.js <file.xlsx> --source <source.csv|run.jsonl> [--json]');
  finish(validateXlsx(args._[0], args.source), args);
}
