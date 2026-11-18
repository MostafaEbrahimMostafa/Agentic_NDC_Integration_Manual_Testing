// Shared result collector for the output-contract validators (Enhancement Plan Step 5).
// Every validator returns the same shape, prints the verdict and counts first (pyramid rule),
// and uses the same exit codes: 0 = passes the contract, 1 = contract errors, 2 = usage/read error.
'use strict';
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..', '..', '..', '..');
const rel = p => { const r = path.relative(REPO, path.resolve(p)); return (r.startsWith('..') ? path.resolve(p) : r).split(path.sep).join('/'); };

function createResult(kind, file) {
  const r = { kind, file: rel(file), errors: [], warnings: [], info: {} };
  r.error = (where, msg) => { r.errors.push({ where, msg }); };
  r.warn = (where, msg) => { r.warnings.push({ where, msg }); };
  return r;
}

const MAX_SHOWN = 40;

function format(r) {
  const verdict = r.errors.length ? 'FAIL' : 'PASS';
  const out = [`${verdict}  ${r.kind}  ${r.file}  (errors: ${r.errors.length}, warnings: ${r.warnings.length})`];
  const infos = Object.entries(r.info).map(([k, v]) => `${k}=${v}`);
  if (infos.length) out.push('  ' + infos.join('  '));
  const list = (label, arr) => {
    arr.slice(0, MAX_SHOWN).forEach(e => out.push(`  ${label} ${e.where ? e.where + ': ' : ''}${e.msg}`));
    if (arr.length > MAX_SHOWN) out.push(`  ${label} ... ${arr.length - MAX_SHOWN} more`);
  };
  list('ERROR', r.errors);
  list('warn ', r.warnings);
  return out.join('\n');
}

function plain(r) {
  return { kind: r.kind, file: r.file, verdict: r.errors.length ? 'FAIL' : 'PASS', errors: r.errors, warnings: r.warnings, info: r.info };
}

// Common CLI tail: print (text or --json) and exit with the contract exit code.
function finish(results, args) {
  const arr = Array.isArray(results) ? results : [results];
  if (args && args.json) console.log(JSON.stringify(arr.map(plain), null, 2));
  else console.log(arr.map(format).join('\n'));
  process.exitCode = arr.some(r => r.errors.length) ? 1 : 0;
}

function parseArgs(argv, flags) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t.startsWith('--')) {
      const k = t.slice(2);
      if ((flags || []).includes(k)) a[k] = true; else a[k] = argv[++i];
    } else a._.push(t);
  }
  return a;
}

function usage(text) {
  console.error(text);
  process.exitCode = 2;
}

module.exports = { REPO, rel, createResult, format, plain, finish, parseArgs, usage };
