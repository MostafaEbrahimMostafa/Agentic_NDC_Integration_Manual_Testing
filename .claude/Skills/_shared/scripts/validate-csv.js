#!/usr/bin/env node
// validate-csv.js - output contract check for test-case CSVs (Enhancement Plan Step 5).
// Contract: ../contracts/testcase-csv.contract.json. Template: Generate_Test_Cases/references/test-case-template.md.
//
// Checks (code decides, not the LLM): exact column set and order, field count per row, required
// cells, duplicate IDs, ID pattern per RowType, allowed values, empty/placeholder Expected Result,
// SPEC references that really exist in SPEC.md, title house style, size budget.
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/validate-csv.js <file.csv> [more.csv ...] [--new] [--spec NDC_Integration/SPEC.md] [--json]
//   --new   the file was just generated: every Status must be "Not Run".
// Exit code: 0 = passes, 1 = contract errors, 2 = usage or read error.
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, createResult, finish, parseArgs, usage } = require('./lib/result.js');
const { parse } = require(path.join(REPO, 'NDC_Integration', 'Harness', 'Retest', 'lib', 'csv.js'));

const C = require('../contracts/testcase-csv.contract.json');

function specSections(specFile) {
  const re = new RegExp(C.specRef.specHeadingPattern);
  const set = new Set();
  for (const line of fs.readFileSync(specFile, 'utf8').split(/\r?\n/)) { const m = re.exec(line); if (m) set.add(m[1]); }
  return set;
}

function validateCsv(file, opts) {
  opts = opts || {};
  const r = createResult('test-case CSV', file);
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch (e) { r.error('', 'cannot read file: ' + e.message); return r; }
  const sections = specSections(opts.spec || path.join(REPO, 'NDC_Integration', 'SPEC.md'));
  const rows = parse(text);
  if (!rows.length) { r.error('', 'file is empty'); return r; }

  // 1. columns: exact names, exact order
  const header = rows[0].map(h => h.trim());
  if (header.join('|') !== C.columns.join('|')) {
    const missing = C.columns.filter(c => !header.includes(c)), extra = header.filter(c => !C.columns.includes(c));
    r.error('header', `columns must be exactly [${C.columns.join(', ')}] in that order` +
      (missing.length ? `; missing: ${missing.join(', ')}` : '') + (extra.length ? `; unexpected: ${extra.join(', ')}` : '') +
      (!missing.length && !extra.length ? '; order differs' : ''));
    r.info.rows = rows.length - 1;
    return r; // every later check depends on the columns
  }
  if (/\r\n/.test(text) && /[^\r]\n/.test(text.replace(/"(?:[^"]|"")*"/g, ''))) r.warn('file', 'mixed CRLF and LF line endings (diff-friendly rule: pick one)');

  const col = Object.fromEntries(C.columns.map((c, i) => [c, i]));
  const ids = new Map(), titles = new Map(), prioSchemes = new Set();
  const sectionRe = new RegExp(C.specRef.sectionPattern, 'g');
  const idRe = Object.fromEntries(Object.entries(C.idPattern).map(([k, v]) => [k, new RegExp(v)]));
  const titleRe = new RegExp(C.titlePattern);
  const placeholders = new Set(C.placeholderValues.map(s => s.toLowerCase()));
  let counted = 0;

  rows.slice(1).forEach((row, i) => {
    const n = i + 2; // 1-based file row incl. header
    const where = `row ${n}`;
    if (row.length !== C.columns.length) { r.error(where, `has ${row.length} fields, expected ${C.columns.length} (unquoted comma or newline?)`); return; }
    counted++;
    const v = k => (row[col[k]] || '').trim();
    const id = v('ID');
    const w = id ? `${where} ${id}` : where;

    for (const k of C.required) if (!v(k)) r.error(w, `"${k}" is empty`);

    // IDs
    if (id) {
      if (ids.has(id)) r.error(w, `duplicate ID (first at row ${ids.get(id)})`); else ids.set(id, n);
      const rt = v('RowType');
      if (idRe[rt] && !idRe[rt].test(id)) r.error(w, `ID does not match the ${rt} pattern ${C.idPattern[rt]}`);
    }

    // allowed values
    for (const [k, allowed] of Object.entries(C.allowed)) {
      const val = v(k);
      if (!val) continue;
      if (k === 'Category') {
        const flowCat = v('RowType') === 'Flow' && (C.flowOnlyCategories.includes(val) || val.startsWith(C.flowCategoryPrefix));
        if (!allowed.includes(val) && !flowCat) r.error(w, `Category "${val}" is not one of the eight SPEC §8.1 categories` + (v('RowType') === 'Flow' ? ` (Flow rows may also use "Flow" or "${C.flowCategoryPrefix}...")` : ''));
      } else if (!allowed.includes(val)) r.error(w, `${k} "${val}" is not one of: ${allowed.join(' | ')}`);
    }
    const p = v('Priority');
    C.prioritySchemes.forEach((s, k) => { if (s.includes(p)) prioSchemes.add(k); });
    if (opts.new && v('Status') && v('Status') !== C.newFileStatus) r.error(w, `Status must be "${C.newFileStatus}" in a newly generated file`);

    // expected result must be concrete
    const exp = v('Expected Result');
    if (exp && placeholders.has(exp.toLowerCase())) r.error(w, `Expected Result is a placeholder ("${exp}")`);

    // SPEC references must exist
    const ref = v('SpecReference');
    if (ref) {
      const cited = [...ref.matchAll(sectionRe)].map(m => m[1]);
      const unknown = cited.filter(s => !sections.has(s));
      if (unknown.length) r.error(w, `SpecReference cites section(s) not in SPEC.md: ${[...new Set(unknown)].map(s => '§' + s).join(', ')}`);
      if (!cited.length && !C.specRef.nonSpecMarkers.some(mk => ref.includes(mk))) r.error(w, `SpecReference "${ref.slice(0, 60)}" has no § section, AC-nn or out-of-SPEC marker (write "§2.1", not "2.1")`);
    }

    // title house style (warnings: style, not correctness)
    const t = v('Title');
    if (t) {
      if (!titleRe.test(t)) r.warn(w, 'Title does not start with [Scope-tag][Request|Response] (house convention)');
      C.titleAntiPatterns.forEach(a => { if (t.includes(a)) r.warn(w, `Title contains "${a === '  ' ? 'double space' : a}"`); });
      if (t.length > C.sizeBudget.maxTitleChars) r.warn(w, `Title longer than ${C.sizeBudget.maxTitleChars} characters`);
      const key = t.toLowerCase().replace(/\s+/g, ' ');
      if (titles.has(key)) r.warn(w, `same Title as row ${titles.get(key)}`); else titles.set(key, n);
    }

    // size budget
    row.forEach((cell, k) => {
      if (cell.length > C.sizeBudget.excelCellLimit) r.error(w, `"${C.columns[k]}" exceeds the Excel cell limit (${cell.length} chars)`);
      else if (cell.length > C.sizeBudget.maxCellChars) r.warn(w, `"${C.columns[k]}" is ${cell.length} chars (budget ${C.sizeBudget.maxCellChars}); move detail to Notes or a linked file`);
    });
  });

  if (prioSchemes.size > 1) r.warn('file', 'Priority mixes High/Medium/Low and P0-P3 in one file; use one scheme');
  r.info.rows = counted;
  r.info.ids = ids.size;
  return r;
}

module.exports = { validateCsv, specSections };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), ['new', 'json']);
  if (!args._.length) return usage('usage: node validate-csv.js <file.csv> [more.csv ...] [--new] [--spec <SPEC.md>] [--json]');
  finish(args._.map(f => validateCsv(f, args)), args);
}
