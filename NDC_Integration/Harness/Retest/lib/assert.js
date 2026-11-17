// Deterministic assertion engine for repro recipes: code decides pass/fail, never the LLM.
// An assertion: { step, path, op, value?, cmp?, other?: { step, path }, note? }
// Special paths: "$status" (HTTP status), "$text" (raw response text), "$header.<name>".
const { query } = require('./jsonpath');

const OPS = ['exists', 'notExists', 'count', 'equals', 'notEquals', 'in', 'notIn', 'anyIn', 'matches', 'notMatches',
  'allNull', 'anyNull', 'allNotNull', 'anyNotNull', 'gt', 'gte', 'lt', 'lte', 'equalsStep', 'notEqualsStep'];

const canon = v => JSON.stringify(v, (k, x) => (x && typeof x === 'object' && !Array.isArray(x)) ? Object.keys(x).sort().reduce((o, kk) => (o[kk] = x[kk], o), {}) : x);
const same = (a, b) => canon(a) === canon(b);
const isNull = v => v === null || v === undefined;
const re = v => v instanceof RegExp ? v : (() => { const m = /^\/(.*)\/([a-z]*)$/.exec(String(v)); return m ? new RegExp(m[1], m[2]) : new RegExp(String(v)); })();
const cmpN = (a, cmp, b) => ({ '==': a === b, '!=': a !== b, '>': a > b, '>=': a >= b, '<': a < b, '<=': a <= b })[cmp || '=='];

function valuesAt(step, p) {
  if (p === '$status') return [{ value: step.status, path: '$status' }];
  if (p === '$text') return [{ value: step.text || '', path: '$text' }];
  if (p.startsWith('$header.')) { const h = (step.headers || {})[p.slice(8).toLowerCase()]; return h === undefined ? [] : [{ value: h, path: p }]; }
  return query(step.doc, p);
}

const sample = vals => { const s = JSON.stringify(vals.slice(0, 6).map(v => v.value)); return (s.length > 300 ? s.slice(0, 297) + '...' : s) + (vals.length > 6 ? ' (+' + (vals.length - 6) + ' more)' : ''); };

// steps: { alias: { ran, status, doc, text, headers, evidence } }
function evaluate(a, steps) {
  const out = { step: a.step, path: a.path, op: a.op, expected: describe(a), evaluable: true, pass: false, matches: 0, actual: '', evidence: null };
  const st = steps[a.step];
  if (!st || !st.ran) { out.evaluable = false; out.reason = 'step "' + a.step + '" did not run'; return out; }
  out.evidence = st.evidence;
  const vals = valuesAt(st, a.path);
  const v = vals.map(x => x.value);
  out.matches = vals.length; out.actual = sample(vals);
  const n = v.length;
  switch (a.op) {
    case 'exists': out.pass = n > 0; break;
    case 'notExists': out.pass = n === 0; break;
    case 'count': out.pass = cmpN(n, a.cmp, a.value); out.actual = 'count ' + n; break;
    case 'equals': out.pass = n > 0 && v.every(x => same(x, a.value)); break;
    case 'notEquals': out.pass = n > 0 && !v.some(x => same(x, a.value)); break;
    case 'in': out.pass = n > 0 && v.every(x => a.value.some(y => same(x, y))); break;
    case 'notIn': out.pass = n > 0 && !v.some(x => a.value.some(y => same(x, y))); break;
    case 'anyIn': out.pass = v.some(x => a.value.some(y => same(x, y))); break;
    case 'matches': out.pass = n > 0 && v.every(x => re(a.value).test(typeof x === 'string' ? x : JSON.stringify(x))); break;
    case 'notMatches': out.pass = n > 0 && !v.some(x => re(a.value).test(typeof x === 'string' ? x : JSON.stringify(x))); break;
    case 'allNull': out.pass = v.every(isNull); break;          // true when nothing matches: pair it with a precondition
    case 'anyNull': out.pass = v.some(isNull); break;
    case 'allNotNull': out.pass = n > 0 && v.every(x => !isNull(x)); break;
    case 'anyNotNull': out.pass = v.some(x => !isNull(x)); break;
    case 'gt': case 'gte': case 'lt': case 'lte': {
      const c = { gt: '>', gte: '>=', lt: '<', lte: '<=' }[a.op];
      const num = x => typeof x === 'object' && x ? Number(x.amount) : Number(x);
      out.pass = n > 0 && v.every(x => cmpN(num(x), c, Number(a.value))); break;
    }
    case 'equalsStep': case 'notEqualsStep': {
      const os = steps[a.other.step];
      if (!os || !os.ran) { out.evaluable = false; out.reason = 'step "' + a.other.step + '" did not run'; return out; }
      const ov = valuesAt(os, a.other.path).map(x => x.value);
      out.actual = sample(vals) + '  vs  ' + a.other.step + ': ' + sample(ov.map(x => ({ value: x })));
      // the reference side must have values; a missing value on the checked side is a real mismatch
      if (!ov.length) { out.evaluable = false; out.reason = 'nothing to compare: ' + a.other.step + ' ' + a.other.path + ' matched nothing'; return out; }
      const eq = n > 0 && same(v.map(canon).sort(), ov.map(canon).sort());
      out.pass = a.op === 'equalsStep' ? eq : !eq; out.evidenceOther = os.evidence; break;
    }
    default: out.evaluable = false; out.reason = 'unknown op ' + a.op;
  }
  return out;
}

function describe(a) {
  if (/Step$/.test(a.op)) return a.op + ' ' + a.other.step + ' ' + a.other.path;
  if (a.op === 'count') return 'count ' + (a.cmp || '==') + ' ' + a.value;
  return a.op + (a.value !== undefined ? ' ' + JSON.stringify(a.value) : '');
}

// The four verdicts of plan Step 3.
const V = { FIXED: 'Fixed', STILL: 'Still reproduces', BLOCKED: 'Blocked (env/data)', CHANGED: 'Behaviour changed – needs review' };

function verdict(recipe, steps, chainStop) {
  const pre = (recipe.preconditions || []).map(a => evaluate(a, steps));
  const fix = recipe.assert.map(a => evaluate(a, steps));
  const rep = (recipe.reproduces || []).map(a => evaluate(a, steps));
  const res = { pre, fix, rep };
  if (chainStop && chainStop.kind === 'env') return { ...res, verdict: V.BLOCKED, why: chainStop.why };
  const badPre = pre.find(r => !r.evaluable || !r.pass);
  if (badPre) return { ...res, verdict: V.BLOCKED, why: 'precondition not met: ' + badPre.step + ' ' + badPre.path + ' ' + badPre.expected + (badPre.reason ? ' (' + badPre.reason + ')' : ' (actual ' + badPre.actual + ')') };
  if (chainStop && chainStop.kind === 'product') {
    const unevaluable = fix.concat(rep).filter(r => !r.evaluable);
    if (unevaluable.length) return { ...res, verdict: V.CHANGED, why: 'repro chain broke at ' + chainStop.step + ': ' + chainStop.why };
  }
  const notEval = fix.concat(rep).find(r => !r.evaluable);
  if (notEval) return { ...res, verdict: V.BLOCKED, why: 'cannot evaluate ' + notEval.step + ' ' + notEval.path + ': ' + notEval.reason };
  const fixed = recipe.fixedWhen === 'any assert passes' ? fix.some(r => r.pass) : fix.every(r => r.pass);
  const repro = rep.every(r => r.pass);
  if (fixed && !repro) return { ...res, verdict: V.FIXED, why: 'all fixed-state assertions pass and the bug signature is absent' };
  if (repro && !fixed) return { ...res, verdict: V.STILL, why: 'bug signature matched' };
  return { ...res, verdict: V.CHANGED, why: fixed && repro ? 'fixed-state assertions AND bug signature both match - recipe or behaviour needs a look' : 'neither the fixed state nor the bug signature matched' };
}

// Neighbour flows: Pass / Fail / Blocked
function flowVerdict(recipe, steps, chainStop) {
  const pre = (recipe.preconditions || []).map(a => evaluate(a, steps));
  const fix = recipe.assert.map(a => evaluate(a, steps));
  if (chainStop && chainStop.kind === 'env') return { pre, fix, verdict: 'Blocked (env/data)', why: chainStop.why };
  const badPre = pre.find(r => !r.evaluable || !r.pass);
  if (badPre) return { pre, fix, verdict: 'Blocked (env/data)', why: 'precondition not met: ' + badPre.step + ' ' + badPre.path };
  if (chainStop && chainStop.kind === 'product') return { pre, fix, verdict: 'Fail', why: chainStop.step + ': ' + chainStop.why };
  const bad = fix.find(r => !r.evaluable || !r.pass);
  if (bad) return { pre, fix, verdict: 'Fail', why: bad.step + ' ' + bad.path + ' ' + bad.expected + ' (actual ' + (bad.reason || bad.actual) + ')' };
  return { pre, fix, verdict: 'Pass', why: 'all checks pass' };
}

module.exports = { OPS, evaluate, verdict, flowVerdict, V, same };
