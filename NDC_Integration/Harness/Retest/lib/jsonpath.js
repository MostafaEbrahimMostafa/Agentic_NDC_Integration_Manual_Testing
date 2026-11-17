// Minimal JSONPath subset for repro-recipe assertions. No dependencies.
//
// Supported:
//   $                 root
//   .key  ['key']     child by name
//   [n]  [-1]         array index (negative = from the end)
//   .*  [*]           every child (array items, or object values - so maps like passengersList work)
//   ..key             recursive descent: every "key" at any depth
//   ..*  ..[...]      every node at any depth, then the bracket applies
//   [?(<expr>)]       filter over children. <expr> is one or more terms joined by && or ||
//                     (no parentheses). A term is:
//                       @.a.b <op> <literal>   op: == != < <= > >= =~ (=~ takes /regex/flags)
//                       @.a.b                  true when the value exists and is not null
//                       !@.a.b                 true when the value is missing or null
//                     Literals: 'text' "text" 123 true false null
//
// query(doc, path) returns [{ value, path }] - one entry per match. A missing key is no match;
// a key whose value is null IS a match (value null). That is what lets assertions tell
// "field absent" from "field null".

function parseLiteral(s) {
  s = s.trim();
  if (/^'.*'$/.test(s) || /^".*"$/.test(s)) return s.slice(1, -1);
  if (s === 'null') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  const m = /^\/(.*)\/([a-z]*)$/.exec(s);
  if (m) return new RegExp(m[1], m[2]);
  throw new Error('Bad literal in JSONPath filter: ' + s);
}

function parseTerm(t) {
  t = t.trim();
  let neg = false;
  if (t.startsWith('!')) { neg = true; t = t.slice(1).trim(); }
  const m = /^@((?:\.[A-Za-z0-9_$-]+)*)\s*(==|!=|<=|>=|=~|<|>)?\s*(.*)$/.exec(t);
  if (!m) throw new Error('Bad JSONPath filter term: ' + t);
  const keys = m[1] ? m[1].slice(1).split('.') : [];
  if (!m[2]) return { keys, op: neg ? 'missing' : 'present' };
  if (neg) throw new Error('"!" only works on a bare @.path term: ' + t);
  return { keys, op: m[2], lit: parseLiteral(m[3]) };
}

function parseFilter(expr) {
  // OR of ANDs, no parentheses
  return expr.split('||').map(or => or.split('&&').map(parseTerm));
}

function getKeys(v, keys) {
  let cur = v;
  for (const k of keys) {
    if (cur === null || typeof cur !== 'object' || !(k in cur)) return { found: false };
    cur = cur[k];
  }
  return { found: true, value: cur };
}

function testTerm(node, term) {
  const r = getKeys(node, term.keys);
  switch (term.op) {
    case 'present': return r.found && r.value !== null && r.value !== undefined;
    case 'missing': return !r.found || r.value === null || r.value === undefined;
  }
  if (!r.found) return false;
  const a = r.value, b = term.lit;
  switch (term.op) {
    case '==': return a === b;
    case '!=': return a !== b;
    case '<': return typeof a === 'number' && a < b;
    case '<=': return typeof a === 'number' && a <= b;
    case '>': return typeof a === 'number' && a > b;
    case '>=': return typeof a === 'number' && a >= b;
    case '=~': return b instanceof RegExp && b.test(String(a));
  }
  return false;
}

function testFilter(node, ors) {
  return ors.some(ands => ands.every(t => testTerm(node, t)));
}

function tokenize(path) {
  if (typeof path !== 'string' || !path.startsWith('$')) throw new Error('JSONPath must start with $: ' + path);
  const toks = [];
  let i = 1;
  const name = s => /^[A-Za-z0-9_$-]+/.exec(s);
  while (i < path.length) {
    const c = path[i];
    if (c === '.') {
      if (path[i + 1] === '.') {
        i += 2;
        if (path[i] === '*') { toks.push({ t: 'descAll' }); i++; continue; }
        if (path[i] === '[') { toks.push({ t: 'descAll' }); continue; }
        const m = name(path.slice(i));
        if (!m) throw new Error('Bad JSONPath after "..": ' + path);
        toks.push({ t: 'desc', key: m[0] }); i += m[0].length; continue;
      }
      i++;
      if (path[i] === '*') { toks.push({ t: 'wild' }); i++; continue; }
      const m = name(path.slice(i));
      if (!m) throw new Error('Bad JSONPath at position ' + i + ': ' + path);
      toks.push({ t: 'key', key: m[0] }); i += m[0].length; continue;
    }
    if (c === '[') {
      let depth = 0, j = i, q = null;
      for (; j < path.length; j++) {
        const ch = path[j];
        if (q) { if (ch === q) q = null; continue; }
        if (ch === "'" || ch === '"') { q = ch; continue; }
        if (ch === '[') depth++;
        else if (ch === ']') { depth--; if (depth === 0) break; }
      }
      if (j >= path.length) throw new Error('Unclosed [ in JSONPath: ' + path);
      const inner = path.slice(i + 1, j).trim();
      i = j + 1;
      if (inner === '*') toks.push({ t: 'wild' });
      else if (/^-?\d+$/.test(inner)) toks.push({ t: 'idx', n: Number(inner) });
      else if (/^'.*'$/.test(inner) || /^".*"$/.test(inner)) toks.push({ t: 'key', key: inner.slice(1, -1) });
      else if (inner.startsWith('?(') && inner.endsWith(')')) toks.push({ t: 'filter', ors: parseFilter(inner.slice(2, -1)) });
      else throw new Error('Unsupported JSONPath bracket [' + inner + '] in ' + path);
      continue;
    }
    throw new Error('Bad JSONPath at position ' + i + ': ' + path);
  }
  return toks;
}

function children(n) {
  const v = n.value;
  if (Array.isArray(v)) return v.map((x, i) => ({ value: x, path: n.path + '[' + i + ']' }));
  if (v && typeof v === 'object') return Object.keys(v).map(k => ({ value: v[k], path: n.path + '.' + k }));
  return [];
}

function descendants(n, out = []) {
  out.push(n);
  for (const c of children(n)) descendants(c, out);
  return out;
}

function query(doc, path) {
  let cur = [{ value: doc, path: '$' }];
  for (const tok of tokenize(path)) {
    const next = [];
    for (const n of cur) {
      const v = n.value;
      switch (tok.t) {
        case 'key':
          if (v && typeof v === 'object' && !Array.isArray(v) && Object.prototype.hasOwnProperty.call(v, tok.key)) next.push({ value: v[tok.key], path: n.path + '.' + tok.key });
          break;
        case 'idx':
          if (Array.isArray(v)) { const k = tok.n < 0 ? v.length + tok.n : tok.n; if (k >= 0 && k < v.length) next.push({ value: v[k], path: n.path + '[' + k + ']' }); }
          break;
        case 'wild':
          next.push(...children(n));
          break;
        case 'desc':
          for (const d of descendants(n)) {
            const dv = d.value;
            if (dv && typeof dv === 'object' && !Array.isArray(dv) && Object.prototype.hasOwnProperty.call(dv, tok.key)) next.push({ value: dv[tok.key], path: d.path + '.' + tok.key });
          }
          break;
        case 'descAll':
          next.push(...descendants(n));
          break;
        case 'filter':
          for (const c of children(n)) if (testFilter(c.value, tok.ors)) next.push(c);
          break;
      }
    }
    cur = next;
  }
  return cur;
}

module.exports = { query, tokenize };
