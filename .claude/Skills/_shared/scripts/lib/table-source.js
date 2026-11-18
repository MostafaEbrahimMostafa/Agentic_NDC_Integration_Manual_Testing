// Reads the tabular source of a stakeholder file: a CSV (same columns as the file) or a run log
// JSONL (the fixed results columns of report.contract.json). Shared by render-xlsx.js and
// validate-xlsx.js so both sides read the source the same way.
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO } = require('./result.js');
const { normalizeText } = require('./zip.js');
const { parse } = require(path.join(REPO, 'NDC_Integration', 'Harness', 'Retest', 'lib', 'csv.js'));
const C = require('../../contracts/report.contract.json');

function readTable(file) {
  const text = fs.readFileSync(file, 'utf8');
  if (/\.csv$/i.test(file)) {
    const rows = parse(text).map(r => r.map(normalizeText));
    if (!rows.length) throw new Error('CSV is empty');
    rows[0] = rows[0].map(h => h.trim());
    return { kind: 'csv', rows };
  }
  if (/\.jsonl$/i.test(file)) {
    const L = text.split(/\r?\n/).filter(s => s.trim()).map(s => JSON.parse(s));
    const rs = L.find(x => x.type === 'run_start') || {};
    const rows = [C.resultsColumns.map(c => c.header)];
    for (const t of L.filter(x => x.type === 'test_case')) {
      rows.push(C.resultsColumns.map(c => normalizeText(c.field === 'supplier' ? (t.supplier || rs.supplier) : t[c.field])));
    }
    return { kind: 'jsonl', rows };
  }
  throw new Error('source must be a .csv or a .jsonl run log');
}

module.exports = { readTable };
