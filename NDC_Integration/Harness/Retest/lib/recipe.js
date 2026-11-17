// Repro recipes: NDC_Integration/Harness/recipes/<GlobalId>.json (bug) and recipes/flows/<FLOW-ID>.json
// (regression-ring neighbour). Format: .claude/Skills/Retest_Issues/references/recipe-format.md
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { NDC } = require('./registry');
const { tokenize } = require('./jsonpath');
const { STEP_NAMES } = require('./steps-meta');
const { OPS } = require('./assert');

const DIR = path.join(NDC, 'Harness', 'recipes');
const FLOWS = path.join(DIR, 'flows');

const rel = p => path.relative(path.resolve(NDC, '..'), p).split(path.sep).join('/');

// Hash of everything except the approval block: an edit after approval invalidates the approval.
function hashOf(r) {
  const { approved, ...rest } = r;
  return crypto.createHash('sha256').update(JSON.stringify(rest)).digest('hex').slice(0, 16);
}

function approvalState(r) {
  if (!r.approved) return 'draft';
  if (r.approved.sha !== hashOf(r)) return 'changed-after-approval';
  return 'approved';
}

function stepName(s) { return typeof s === 'string' ? s : s.step; }
function stepAlias(s) { return typeof s === 'string' ? s : (s.as || s.step); }

function validate(r, kind) {
  const e = [];
  const need = (k, t) => { if (r[k] === undefined || r[k] === null || r[k] === '') e.push('missing "' + k + '"'); else if (t && !t(r[k])) e.push('bad "' + k + '"'); };
  need('id');
  if (kind === 'bug') {
    need('supplier'); need('selector'); need('testData');
    if (!/^NDC-BUG-\d{4}$/.test(r.id || '')) e.push('id must be NDC-BUG-nnnn');
  }
  need('version', v => v === 'V2');
  if (r.version && r.version !== 'V2') e.push('only V2 chains are supported by the generic runner (V1: use Execute_Test_cases)');
  need('chain', v => Array.isArray(v) && v.length > 0);
  need('assert', v => Array.isArray(v) && v.length > 0);
  if (kind === 'bug') {
    need('reproduces', v => Array.isArray(v) && v.length > 0);
    need('fixedWhen', v => ['all asserts pass', 'any assert passes'].includes(v));
  }
  const aliases = new Set();
  for (const s of r.chain || []) {
    const n = stepName(s);
    if (!STEP_NAMES.includes(n)) e.push('unknown step "' + n + '" (known: ' + STEP_NAMES.join(', ') + ')');
    const a = stepAlias(s);
    if (aliases.has(a)) e.push('duplicate step alias "' + a + '": give the repeated step an "as" name');
    aliases.add(a);
    if (typeof s === 'object' && s.override && Object.keys(s.override).some(k => /^supplier$/i.test(k))) e.push('step "' + a + '" overrides supplier: a recipe may not call another supplier (CLAUDE.md rule 4)');
  }
  const checkA = (list, label) => (list || []).forEach((a, i) => {
    if (!aliases.has(a.step)) e.push(label + '[' + i + '] refers to step "' + a.step + '" which is not in the chain');
    if (!OPS.includes(a.op)) e.push(label + '[' + i + '] unknown op "' + a.op + '"');
    try { if (!a.path.startsWith('$status') && !a.path.startsWith('$text') && !a.path.startsWith('$header.')) tokenize(a.path); } catch (x) { e.push(label + '[' + i + '] ' + x.message); }
    if (/Step$/.test(a.op || '')) {
      if (!a.other || !aliases.has(a.other.step)) e.push(label + '[' + i + '] ' + a.op + ' needs other.step from the chain');
      else try { tokenize(a.other.path); } catch (x) { e.push(label + '[' + i + '] other.path ' + x.message); }
    }
  });
  checkA(r.preconditions, 'preconditions');
  checkA(r.assert, 'assert');
  checkA(r.reproduces, 'reproduces');
  if (kind === 'bug' && r.testData && !fs.existsSync(path.join(NDC, r.testData))) e.push('testData file not found: NDC_Integration/' + r.testData);
  return e;
}

function loadBug(gid) {
  const f = path.join(DIR, gid + '.json');
  if (!fs.existsSync(f)) return { file: rel(f), exists: false };
  const r = JSON.parse(fs.readFileSync(f, 'utf8'));
  return { file: rel(f), exists: true, recipe: r, errors: validate(r, 'bug'), state: approvalState(r) };
}

function loadFlow(id) {
  const f = path.join(FLOWS, id + '.json');
  if (!fs.existsSync(f)) return { file: rel(f), exists: false };
  const r = JSON.parse(fs.readFileSync(f, 'utf8'));
  return { file: rel(f), exists: true, recipe: r, errors: validate(r, 'flow'), state: approvalState(r) };
}

function approve(file, by) {
  const r = JSON.parse(fs.readFileSync(file, 'utf8'));
  const kind = /[\\/]flows[\\/]/.test(file) ? 'flow' : 'bug';
  const errs = validate(r, kind);
  if (errs.length) throw new Error('Recipe has errors, not approved:\n - ' + errs.join('\n - '));
  r.approved = { by, date: new Date().toISOString().slice(0, 10), sha: null };
  r.approved.sha = hashOf(r);
  fs.writeFileSync(file, JSON.stringify(r, null, 2) + '\n');
  return r;
}

module.exports = { DIR, FLOWS, loadBug, loadFlow, validate, approve, approvalState, hashOf, stepName, stepAlias };
