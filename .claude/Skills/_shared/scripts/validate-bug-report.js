#!/usr/bin/env node
// validate-bug-report.js - output contract check for bug reports (Enhancement Plan Step 5).
// Contract: ../contracts/bug-report.contract.json. Template: Generate_Bug_Report/references/bug-report-template.md.
//
// Checks: folder/file naming, title format, required sections present and in order, no template
// placeholders left, severity value, System Information fields, Registry ID exists in the registry,
// every request/response file named in the .md exists and is valid JSON with the agreed keys,
// redaction in those files, README index entry, and the size budget (120 lines, 40-line JSON blocks).
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/validate-bug-report.js <run folder | bug folder | bug .md> [...] [--registry <csv>] [--json]
//   --registry defaults to NDC_Integration/Artifacts/Registry/Bug_Registry.csv (tests pass a temp one).
//   A run folder is NDC_Integration/Artifacts/BugReports/<slug>/ (every BUG-* folder in it is checked).
// Exit code: 0 = passes, 1 = contract errors, 2 = usage or read error.
'use strict';
const fs = require('fs');
const path = require('path');
const { REPO, createResult, finish, parseArgs, usage } = require('./lib/result.js');
const { parseObjects } = require(path.join(REPO, 'NDC_Integration', 'Harness', 'Retest', 'lib', 'csv.js'));
const C = require('../contracts/bug-report.contract.json');

const RAW = new RegExp('^(' + C.redactedPayloadKeys.join('|') + ')$', 'i');
const headingName = h => h.replace(/^#+\s*/, '').replace(/[^\p{L}\p{N}/ ]/gu, '').trim();

function registryIds(file) {
  const f = file ? path.resolve(file) : path.join(REPO, C.registryFile);
  if (!fs.existsSync(f)) return null;
  return new Set(parseObjects(fs.readFileSync(f, 'utf8')).records.map(r => r.GlobalId));
}

function walk(v, at, fn) {
  if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${at}[${i}]`, fn));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { fn(k, x, `${at}.${k}`); walk(x, `${at}.${k}`, fn); }
}

function validateOne(mdFile, reg) {
  const r = createResult('bug report', mdFile);
  const folder = path.dirname(mdFile), folderName = path.basename(folder);
  if (!new RegExp(C.folderPattern).test(folderName)) r.error('folder', `"${folderName}" does not match ${C.folderPattern} (one folder per bug)`);
  if (path.basename(mdFile, '.md') !== folderName) r.error('file', `the .md must be named after its folder (${folderName}.md)`);
  const text = fs.readFileSync(mdFile, 'utf8').replace(/\r\n/g, '\n');
  const lines = text.split('\n');

  // title
  if (!new RegExp(C.titlePattern, 'u').test(lines[0] || '')) r.error('line 1', 'title must be "# [V1|V2][<Supplier>][<API>] – <what happened>"');

  // sections in order
  const heads = lines.map((l, i) => ({ l, i })).filter(x => /^## /.test(x.l)).map(x => ({ name: headingName(x.l), line: x.i + 1 }));
  let last = -1;
  for (const s of C.sections) {
    const h = heads.find(x => x.name === s);
    if (!h) { r.error('sections', `missing section "${s}"`); continue; }
    if (h.line < last) r.error(`line ${h.line}`, `section "${s}" is out of order (template order: ${C.sections.join(' → ')})`);
    last = Math.max(last, h.line);
  }
  heads.filter(h => !C.sections.includes(h.name) && !C.optionalSections.includes(h.name)).forEach(h => r.error(`line ${h.line}`, `unexpected section "${h.name}" (put free text under "Observations")`));
  const obs = heads.find(h => h.name === 'Observations'), imp = heads.find(h => h.name === 'Impact');
  if (obs && imp && obs.line < imp.line) r.error(`line ${obs.line}`, 'Observations must come after Impact');

  // leftovers from the template
  const ph = text.match(new RegExp(C.placeholderPattern, 'g'));
  if (ph) r.error('placeholders', `template placeholders left: ${[...new Set(ph)].join(', ')}`);
  if (/<!--[\s\S]*?-->/.test(text)) r.error('placeholders', 'template HTML comments left in the report');

  // severity
  const sevIdx = heads.find(h => h.name === 'Severity');
  if (sevIdx) {
    const body = lines.slice(sevIdx.line, sevIdx.line + 4).join(' ');
    const m = /\*\*(\w+)\*\*/.exec(body);
    if (!m || !C.severity.includes(m[1])) r.error('Severity', `must start with **${C.severity.join('|')}**`);
  }

  // system information
  for (const f of C.systemInfoFields) if (!new RegExp('\\*\\*' + f.replace(/[/]/g, '\\/') + ':\\*\\*').test(text)) r.error('System Information', `missing "${f}" line`);
  const regLine = lines.find(l => /\*\*Registry ID:\*\*/.test(l)) || '';
  const gid = (new RegExp(C.registryIdPattern).exec(regLine) || [])[0];
  if (regLine && !gid) r.error('Registry ID', `no ${C.registryIdPattern} id on the Registry ID line (registry.js add prints it)`);
  if (gid && reg && !reg.has(gid)) r.error('Registry ID', `${gid} is not in ${C.registryFile}`);

  // request / response files
  const rrDir = path.join(folder, 'requests-responses');
  const named = [...new Set([...text.matchAll(/`(\d{2,}_[A-Za-z0-9_.-]+_(?:request|response)\.json)`/g)].map(m => m[1]))];
  const noCall = /No stored call applies/i.test(text);
  if (!fs.existsSync(rrDir)) r.error('requests-responses', 'folder missing');
  if (!named.length && !noCall) r.error('Request / response files', 'lists no NN_<label>_request.json / _response.json file (or say "No stored call applies")');
  for (const f of named) {
    const p = path.join(rrDir, f);
    if (!fs.existsSync(p)) { r.error(f, 'named in the report but missing on disk'); continue; }
    let j;
    try { j = JSON.parse(fs.readFileSync(p, 'utf8').replace(/^﻿/, '')); } catch (e) { r.error(f, 'not valid JSON: ' + e.message); continue; }
    const keys = /_request\.json$/.test(f) ? C.requestFileKeys : C.responseFileKeys;
    keys.forEach(k => { if (j[k] === undefined) r.error(f, `missing "${k}"`); });
    walk(j, '$', (k, v, at) => {
      if (/^x-api-key$/i.test(k) && !(typeof v === 'string' && v.startsWith('[REDACTED'))) r.error(f, `${at} is not redacted (value not printed)`);
      if (RAW.test(k) && v !== null && !(typeof v === 'string' && /^\[REDACTED/.test(v))) r.error(f, `${at} carries a raw supplier payload (SPEC.md 7.14)`);
    });
    const pair = f.replace(/_(request|response)\.json$/, (_, s) => s === 'request' ? '_response.json' : '_request.json');
    if (!fs.existsSync(path.join(rrDir, pair))) r.warn(f, `has no matching ${pair}`);
  }
  if (fs.existsSync(rrDir)) fs.readdirSync(rrDir).filter(f => f.endsWith('.json') && !named.includes(f)).forEach(f => r.warn(f, 'is on disk but not listed in the report'));

  // README index
  const readme = path.join(path.dirname(folder), 'README.md');
  if (!fs.existsSync(readme)) r.error('README.md', 'run folder has no README.md index');
  else if (!fs.readFileSync(readme, 'utf8').includes(folderName + '/')) r.error('README.md', `does not link ${folderName}/`);

  // size budget
  const n = lines.filter((l, i) => !(i === lines.length - 1 && l === '')).length;
  if (n > C.sizeBudget.maxLines) r.error('size', `${n} lines (budget ${C.sizeBudget.maxLines}); excerpt large JSON to the relevant path and link the full file`);
  let inBlock = false, start = 0;
  lines.forEach((l, i) => {
    if (/^```/.test(l)) {
      if (!inBlock) { inBlock = true; start = i; }
      else { inBlock = false; if (i - start - 1 > C.sizeBudget.maxJsonBlockLines) r.error(`line ${start + 1}`, `code block of ${i - start - 1} lines (budget ${C.sizeBudget.maxJsonBlockLines})`); }
    }
  });
  r.info.lines = n;
  r.info.files = named.length;
  if (gid) r.info.registry = gid;
  return r;
}

function collect(target) {
  const p = path.resolve(target);
  if (!fs.existsSync(p)) return { error: 'not found: ' + target };
  if (fs.statSync(p).isFile()) return { files: [p] };
  const own = path.join(p, path.basename(p) + '.md');
  if (fs.existsSync(own)) return { files: [own] };
  const files = fs.readdirSync(p).filter(d => /^BUG-/.test(d) && fs.statSync(path.join(p, d)).isDirectory())
    .map(d => path.join(p, d, d + '.md'));
  return { files };
}

function validateBugReports(targets, opts) {
  const reg = registryIds(opts && opts.registry);
  const out = [];
  for (const t of targets) {
    const c = collect(t);
    if (c.error) { const r = createResult('bug report', t); r.error('', c.error); out.push(r); continue; }
    if (!c.files.length) { const r = createResult('bug report', t); r.error('', 'no BUG-* folders found'); out.push(r); continue; }
    for (const f of c.files) {
      if (!fs.existsSync(f)) { const r = createResult('bug report', f); r.error('', 'bug folder has no .md named after it'); out.push(r); continue; }
      out.push(validateOne(f, reg));
    }
  }
  return out;
}

module.exports = { validateBugReports };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), ['json']);
  if (!args._.length) return usage('usage: node validate-bug-report.js <run folder | bug folder | bug .md> [...] [--registry <Bug_Registry.csv>] [--json]');
  finish(validateBugReports(args._, args), args);
}
