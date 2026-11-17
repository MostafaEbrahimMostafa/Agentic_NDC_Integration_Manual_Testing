#!/usr/bin/env node
// verify-evidence.js - AI guardrail check (Enhancement Plan Step 4, rules in ../AI_Guardrails.md).
//
// The LLM writes verdicts and citations; this script (not the LLM) checks them against what was
// really saved. For one run log (NDC_Integration/Artifacts/Logs/<slug>.jsonl) it:
//   1. Re-evaluates every cited evidence ref (evidence_refs[]) against the saved response it points
//      to (a JSONL line + hop/attempt, or a raw call record / bug-report response file) with the same
//      deterministic engine the repro recipes use (Harness/Retest/lib/assert.js).
//   2. Re-checks every ABSENCE claim (notExists / allNull / notIn / notMatches / count 0) over the
//      WHOLE response: "X is missing" is contradicted when X exists elsewhere (KB L-01).
//   3. Checks the SPEC citation: the section exists, the quoted rule is really in it (no invented
//      rules), and SPEC itself does not label that rule INFERRED / UNKNOWN.
//   4. Applies the defect gate: expectation source label, two reproductions, fresh second opinion.
//   5. Scans the log for leaked secrets (x-api-key values, raw supplier payloads).
// It never calls the API and never edits the run log.
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/verify-evidence.js <run.jsonl> [--tc <TC-ID>] [--out <dir>]
//        [--spec NDC_Integration/SPEC.md] [--no-write] [--json] [--no-fail] [--today YYYY-MM-DD]
// Writes <out>/<slug>_evidence.json and <slug>_evidence.md (default out = the log's folder).
// Exit code: 0 = every defect in scope is FILE and nothing is contradicted or leaked;
//            1 = at least one defect is held / contradicted / a secret leaked; 2 = usage or read error.

'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const { evaluate } = require(path.join(REPO, 'NDC_Integration', 'Harness', 'Retest', 'lib', 'assert.js'));
const { query } = require(path.join(REPO, 'NDC_Integration', 'Harness', 'Retest', 'lib', 'jsonpath.js'));

// ---------- args ----------
function parseArgs(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--no-write' || t === '--json' || t === '--no-fail' || t === '--quiet') a[t.slice(2)] = true;
    else if (t.startsWith('--')) a[t.slice(2)] = argv[++i];
    else a._.push(t);
  }
  return a;
}

// ---------- file helpers ----------
const cache = new Map();
function resolvePath(p, baseDir) {
  if (path.isAbsolute(p)) return p;
  const fromRepo = path.join(REPO, p);
  if (fs.existsSync(fromRepo)) return fromRepo;
  return path.join(baseDir || REPO, p);
}
function readText(abs) {
  if (!cache.has(abs)) cache.set(abs, fs.readFileSync(abs, 'utf8'));
  return cache.get(abs);
}
function readJsonl(abs) {
  return readText(abs).split(/\r?\n/).map((s, i) => {
    if (!s.trim()) return null;
    try { return { n: i + 1, obj: JSON.parse(s) }; } catch (e) { return { n: i + 1, bad: e.message }; }
  }).filter(Boolean);
}
const rel = abs => path.relative(REPO, abs).split(path.sep).join('/');

// ---------- evidence records ----------
const MARK = /__omitted__|\.\.\.\[truncated\]/;
const LOG_TYPES = new Set(['test_case', 'finding', 'run_start']);

// Load the record a ref points to. Returns { rec, where } or { error }.
function loadRecord(ref, ctx) {
  const src = ref.source ? resolvePath(ref.source, ctx.logDir) : ctx.logAbs;
  if (!fs.existsSync(src)) return { error: 'source file not found: ' + (ref.source || ctx.logRel) };
  let rec, where = rel(src);
  if (/\.jsonl$/i.test(src)) {
    let line = ref.line;
    if (!line && !ref.source && ctx.defaultLine) line = ctx.defaultLine;
    if (!line) return { error: 'a .jsonl source needs "line" (1-based)' };
    const L = readJsonl(src).find(x => x.n === Number(line));
    if (!L) return { error: 'line ' + line + ' not found in ' + where };
    if (L.bad) return { error: 'line ' + line + ' of ' + where + ' is not valid JSON' };
    rec = L.obj; where += ':' + line;
  } else {
    try { rec = JSON.parse(readText(src)); } catch (e) { return { error: 'not valid JSON: ' + where }; }
  }
  if (ref.hop !== undefined) {
    const h = (rec.hops || []).find(x => Number(x.hop) === Number(ref.hop));
    if (!h) return { error: 'hop ' + ref.hop + ' not found in ' + where };
    rec = h; where += ' hop ' + ref.hop;
  } else if (ref.attempt !== undefined) {
    const at = (rec.attempts || [])[Number(ref.attempt) - 1];
    if (!at) return { error: 'attempt ' + ref.attempt + ' not found in ' + where };
    rec = at; where += ' attempt ' + ref.attempt;
  }
  return { rec, where };
}

// Turn a record into the { ran, status, doc, text, headers } shape assert.evaluate() reads.
// Handles: test_case/hop/attempt response_full, R3-style hop {response:{status,headers,body}},
// raw harness call records {status, response:<body>, response_headers}, bug-report response files
// {label,status,body}. A body saved as a JSON string is parsed.
function toStep(rec) {
  if (!rec || typeof rec !== 'object') return { error: 'empty record' };
  let R = rec.response_full !== undefined ? rec.response_full : rec.response;
  if (R === undefined) {
    if (LOG_TYPES.has(rec.type) || rec.hop !== undefined) return { error: 'this log record has no saved response (response_full); cite the raw call capture instead' };
    R = rec;
  }
  let body = R, status = rec.status, headers = rec.response_headers || rec.headers;
  if (R && typeof R === 'object' && !Array.isArray(R) && 'body' in R && ('status' in R || 'headers' in R || 'label' in R)) {
    body = R.body; status = R.status !== undefined ? R.status : status; headers = R.headers || headers;
  }
  let doc = body, text;
  if (typeof body === 'string') { text = body; try { doc = JSON.parse(body); } catch (e) { doc = body; } }
  else text = JSON.stringify(body);
  const h = {};
  Object.keys(headers || {}).forEach(k => { h[k.toLowerCase()] = headers[k]; });
  return { ran: true, status, doc, text: text || '', headers: h, truncated: MARK.test(text || '') };
}

const ABSENCE = new Set(['notExists', 'allNull', 'notIn', 'notMatches']);
const isAbsence = r => ABSENCE.has(r.op) || (r.op === 'count' && Number(r.value) === 0 && (!r.cmp || r.cmp === '==' || r.cmp === '<='));
function lastKey(p) {
  const names = [...String(p).matchAll(/\.\.?([A-Za-z0-9_$-]+)|\[['"]([^'"\]]+)['"]\]/g)].map(m => m[1] || m[2]);
  return names.length ? names[names.length - 1] : null;
}
const toRe = v => v instanceof RegExp ? v : (() => { const m = /^\/(.*)\/([a-z]*)$/.exec(String(v)); return m ? new RegExp(m[1], m[2]) : new RegExp(String(v)); })();
const canon = v => JSON.stringify(v);

// Evaluate one evidence ref. status: OK | FAILED | UNRESOLVED | TRUNCATED | ELSEWHERE | SCOPED_ELSEWHERE | NO_ALSO_CHECKED
function checkRef(ref, ctx) {
  const out = { ref: describeRef(ref), status: 'OK', detail: '' };
  if (!ref || !ref.path || !ref.op) { out.status = 'UNRESOLVED'; out.detail = 'an evidence ref needs path and op'; return out; }
  const A = loadRecord(ref, ctx);
  if (A.error) { out.status = 'UNRESOLVED'; out.detail = A.error; return out; }
  const sa = toStep(A.rec);
  if (sa.error) { out.status = 'UNRESOLVED'; out.detail = A.where + ': ' + sa.error; return out; }
  sa.evidence = A.where; out.where = A.where;
  const steps = { A: sa };
  const a = { step: 'A', path: ref.path, op: ref.op, value: ref.value, cmp: ref.cmp };
  if (ref.other) {
    const B = loadRecord(Object.assign({ line: ref.line, source: ref.source }, ref.other), ctx);
    if (B.error) { out.status = 'UNRESOLVED'; out.detail = 'other: ' + B.error; return out; }
    const sb = toStep(B.rec);
    if (sb.error) { out.status = 'UNRESOLVED'; out.detail = 'other: ' + B.where + ': ' + sb.error; return out; }
    sb.evidence = B.where; steps.B = sb; a.other = { step: 'B', path: ref.other.path };
    if (sb.truncated) sa.truncated = true;
  }
  const r = evaluate(a, steps);
  out.actual = r.actual;
  if (!r.evaluable) { out.status = sa.truncated ? 'TRUNCATED' : 'UNRESOLVED'; out.detail = r.reason; return out; }
  if (!r.pass) {
    out.status = (sa.truncated && (r.matches === 0 || MARK.test(String(r.actual)))) ? 'TRUNCATED' : 'FAILED';
    out.detail = out.status === 'TRUNCATED' ? 'the saved body is truncated at this path; cite the raw capture' : 'cited observation is not true in the saved response (expected ' + r.expected + ', actual ' + r.actual + ')';
    return out;
  }
  // Absence claims: re-check over the whole response (KB L-01).
  if (isAbsence(ref) && sa.doc && typeof sa.doc === 'object') {
    const key = lastKey(ref.path);
    if (key) {
      const wide = query(sa.doc, '$..' + key);
      let hits = [];
      if (ref.op === 'notExists' || ref.op === 'count') hits = wide;
      else if (ref.op === 'allNull') hits = wide.filter(x => x.value !== null && x.value !== undefined);
      else if (ref.op === 'notIn') hits = wide.filter(x => (ref.value || []).some(y => canon(y) === canon(x.value)));
      else if (ref.op === 'notMatches') hits = wide.filter(x => toRe(ref.value).test(typeof x.value === 'string' ? x.value : JSON.stringify(x.value)));
      if (hits.length) {
        const paths = hits.slice(0, 4).map(x => x.path + ' = ' + JSON.stringify(x.value).slice(0, 60));
        out.elsewhere = paths;
        out.status = ref.scoped ? 'SCOPED_ELSEWHERE' : 'ELSEWHERE';
        out.detail = 'the absent thing exists elsewhere in the same response: ' + paths.join('; ') + (hits.length > 4 ? ' (+' + (hits.length - 4) + ' more)' : '');
        return out;
      }
    }
    if (!ref.also_checked || (Array.isArray(ref.also_checked) && !ref.also_checked.length)) {
      out.status = 'NO_ALSO_CHECKED';
      out.detail = 'absence claim without also_checked (other steps / levels / Swagger checked, KB L-01)';
      return out;
    }
  }
  return out;
}
function describeRef(r) {
  if (!r) return '(none)';
  const src = (r.source || 'this log') + (r.line ? ':' + r.line : '') + (r.hop !== undefined ? ' hop ' + r.hop : '') + (r.attempt !== undefined ? ' attempt ' + r.attempt : '');
  const v = r.other ? ' ' + (r.other.source || '') + (r.other.line ? ':' + r.other.line : '') + ' ' + r.other.path : (r.value !== undefined ? ' ' + JSON.stringify(r.value) : '');
  return src + ' ' + r.path + ' ' + r.op + v;
}

// ---------- SPEC ----------
function loadSpec(abs) {
  const lines = readText(abs).split(/\r?\n/);
  const heads = [];
  lines.forEach((l, i) => {
    const m = /^(#{2,4})\s+(\d+(?:\.\d+)*[a-z]?)\.?\s/.exec(l);
    if (m) heads.push({ id: m[2], depth: m[1].length, start: i });
    else if (/^#{1,4}\s/.test(l)) heads.push({ id: null, depth: /^#+/.exec(l)[0].length, start: i });
  });
  const sections = {};
  heads.forEach((h, k) => {
    if (!h.id) return;
    let end = lines.length;
    for (let j = k + 1; j < heads.length; j++) if (heads[j].depth <= h.depth) { end = heads[j].start; break; }
    sections[h.id] = { start: h.start, end };
  });
  return { lines, sections };
}
const specIds = s => [...String(s || '').matchAll(/(\d+(?:\.\d+)*[a-z]?)/g)].map(m => m[1].replace(/\.$/, ''));
const norm = s => String(s).replace(/[`*_]/g, '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();

// Find a quote inside the given sections. Returns { found, section, lines:[i..], markers:[] }.
function findQuote(spec, ids, quote) {
  const q = norm(quote);
  if (q.length < 12) return { found: false, tooShort: true };
  for (const id of ids) {
    const s = spec.sections[id];
    if (!s) continue;
    const parts = [], starts = [];
    let off = 0;
    for (let i = s.start; i < s.end; i++) { const n = norm(spec.lines[i]); starts.push([off, i]); parts.push(n); off += n.length + 1; }
    const joined = parts.join(' ');
    const at = joined.indexOf(q);
    if (at < 0) continue;
    const end = at + q.length;
    const hit = starts.filter(([o, i], k) => { const next = k + 1 < starts.length ? starts[k + 1][0] : off; return o < end && next > at; }).map(([, i]) => i);
    const markers = [];
    hit.forEach(i => { const m = spec.lines[i].match(/\b(INFERRED|UNKNOWN)\b/g); if (m) markers.push({ line: i + 1, labels: [...new Set(m)] }); });
    return { found: true, section: id, lines: hit.map(i => i + 1), markers };
  }
  return { found: false };
}
function findQuoteAnywhere(spec, quote) {
  return findQuote(spec, Object.keys(spec.sections).filter(id => !id.includes('.')), quote);
}

// ---------- secrets ----------
const RAW_KEYS = /^(supplierrequest|supplierresponse|originalsupplierrequest|originalsupplierresponse)$/i;
function scanSecrets(entries, logText) {
  const leaks = [];
  let envKey = null;
  try {
    const env = readText(path.join(REPO, '.env'));
    const m = /^\s*NDC_API_KEY\s*=\s*(.+?)\s*$/m.exec(env);
    if (m && m[1] && m[1].length >= 8) envKey = m[1].replace(/^['"]|['"]$/g, '');
  } catch (e) { /* no .env: skip the exact-key check */ }
  const walk = (v, n, trail) => {
    if (!v || typeof v !== 'object') return;
    for (const k of Object.keys(v)) {
      const x = v[k];
      if (/^x-api-key$/i.test(k) && typeof x === 'string' && x && !/^\[REDACTED/i.test(x)) leaks.push({ line: n, what: 'x-api-key value not redacted at ' + trail + '.' + k });
      else if (RAW_KEYS.test(k) && x !== null && x !== undefined && !(typeof x === 'string' && /^\[REDACTED/i.test(x))) leaks.push({ line: n, what: 'raw supplier payload not redacted at ' + trail + '.' + k + ' (SPEC 7.14)' });
      else walk(x, n, trail + '.' + k);
    }
  };
  entries.forEach(e => { if (e.obj) walk(e.obj, e.n, '$'); });
  if (envKey) logText.split(/\r?\n/).forEach((l, i) => { if (l.includes(envKey)) leaks.push({ line: i + 1, what: 'the real API key from .env appears in this line' }); });
  return leaks;
}

// ---------- gate ----------
const RANK = { CONTRADICTED: 6, UNVERIFIED: 5, QUESTION: 4, 'NEEDS-HUMAN': 3, HOLD: 2, FILE: 1 };
const worst = arr => arr.reduce((w, g) => (RANK[g] > RANK[w] ? g : w), 'FILE');

function checkExpectation(item, ctx, reasons, gates) {
  const src = String(item.expectation_source || '').toUpperCase();
  const spec = ctx.spec;
  const ids = specIds(item.spec_ref);
  if (!ids.length) { gates.push('UNVERIFIED'); reasons.push('no spec_ref'); }
  const missing = ids.filter(id => !spec.sections[id]);
  if (missing.length) { gates.push('UNVERIFIED'); reasons.push('spec_ref section(s) not in SPEC.md: ' + missing.map(x => '§' + x).join(', ')); }
  if (!src) { gates.push('UNVERIFIED'); reasons.push('no expectation_source (SPEC / LIVE-CONFIRMED / INFERRED)'); return; }
  if (src === 'INFERRED') { gates.push('QUESTION'); reasons.push('expectation is INFERRED: ask the user, never file (CLAUDE.md rule 1, KB L-05)'); return; }
  if (src === 'SPEC') {
    if (!item.expectation_quote) { gates.push('UNVERIFIED'); reasons.push('expectation_source SPEC without expectation_quote (the rule text, verbatim)'); return; }
    const f = findQuote(spec, ids.filter(id => spec.sections[id]), item.expectation_quote);
    if (f.tooShort) { gates.push('UNVERIFIED'); reasons.push('expectation_quote too short to verify (min 12 chars)'); return; }
    if (!f.found) {
      const any = findQuoteAnywhere(spec, item.expectation_quote);
      gates.push('UNVERIFIED');
      reasons.push(any.found ? 'quoted rule is in §' + any.section + ' (lines ' + any.lines.join(',') + '), not in the cited spec_ref' : 'quoted rule not found anywhere in SPEC.md (invented rule?)');
      return;
    }
    if (f.markers.length) {
      gates.push('QUESTION');
      reasons.push('SPEC itself labels this rule ' + f.markers.map(m => m.labels.join('/') + ' (line ' + m.line + ')').join(', ') + ': treat as INFERRED and ask');
    }
    return { quoteLines: f.lines, section: f.section };
  }
  if (src === 'LIVE-CONFIRMED') {
    const c = item.expectation_cite;
    if (!c || !c.file) { gates.push('UNVERIFIED'); reasons.push('LIVE-CONFIRMED without expectation_cite {file, quote|line}'); return; }
    const abs = resolvePath(c.file, ctx.logDir);
    if (!fs.existsSync(abs)) { gates.push('UNVERIFIED'); reasons.push('expectation_cite file not found: ' + c.file); return; }
    const text = readText(abs);
    if (c.quote) {
      const lines = text.split(/\r?\n/);
      const i = lines.findIndex(l => norm(l).includes(norm(c.quote)));
      if (i < 0) { gates.push('UNVERIFIED'); reasons.push('expectation_cite quote not found in ' + c.file); return; }
      const d = /(\d{4}-\d{2}-\d{2})/.exec(lines[i]);
      if (d && ctx.today) {
        const age = (Date.parse(ctx.today) - Date.parse(d[1])) / 864e5;
        if (age > 14) ctx.warnings.push((item.related_tc_id || item.tc_id || '?') + ': LIVE-CONFIRMED fact dated ' + d[1] + ' is ' + Math.round(age) + ' days old; re-check it live (KB D-07)');
      }
    } else if (c.line) {
      if (text.split(/\r?\n/).length < Number(c.line)) { gates.push('UNVERIFIED'); reasons.push('expectation_cite line out of range'); }
    } else { gates.push('UNVERIFIED'); reasons.push('expectation_cite needs quote or line'); }
    return;
  }
  gates.push('UNVERIFIED'); reasons.push('unknown expectation_source "' + item.expectation_source + '"');
}

function gateDefect(f, tc, ctx) {
  const reasons = [], gates = [], flags = [];
  const refs = (f.evidence_refs && f.evidence_refs.length ? f.evidence_refs : (tc && tc.obj.evidence_refs) || []);
  const refCtx = Object.assign({}, ctx, { defaultLine: tc ? tc.n : undefined });
  const checked = refs.map(r => checkRef(r, refCtx));
  if (!refs.length) { gates.push('UNVERIFIED'); reasons.push('no evidence_refs (no machine-checkable citation of a saved response)'); }
  checked.forEach(c => {
    if (c.status === 'FAILED' || c.status === 'ELSEWHERE') { gates.push('CONTRADICTED'); reasons.push(c.detail); }
    else if (c.status === 'UNRESOLVED' || c.status === 'TRUNCATED') { gates.push('UNVERIFIED'); reasons.push(c.detail); }
    else if (c.status === 'SCOPED_ELSEWHERE') { gates.push('NEEDS-HUMAN'); reasons.push('scoped absence claim, but ' + c.detail); }
    else if (c.status === 'NO_ALSO_CHECKED') { gates.push('HOLD'); reasons.push(c.detail); }
  });
  const merged = Object.assign({}, tc ? { spec_ref: tc.obj.spec_ref, expectation_source: tc.obj.expectation_source, expectation_quote: tc.obj.expectation_quote, expectation_cite: tc.obj.expectation_cite } : {}, pick(f, ['spec_ref', 'expectation_source', 'expectation_quote', 'expectation_cite', 'related_tc_id']));
  checkExpectation(merged, ctx, reasons, gates);

  // Two reproductions (non-determinism). Counted by this script from repro.records, never typed.
  const recs = (f.repro && f.repro.records) || [];
  const recChecks = recs.map(r => {
    if (!r.source) return { ok: false, why: 'record without source' };
    const L = loadRecord(r, ctx);
    return L.error ? { ok: false, why: L.error } : { ok: true, reproduced: r.reproduced === true, host: r.host, at: r.at };
  });
  const bad = recChecks.filter(x => !x.ok);
  if (bad.length) { gates.push('UNVERIFIED'); reasons.push('repro record(s) not found: ' + bad.map(b => b.why).join('; ')); }
  const runs = recChecks.filter(x => x.ok).length, reproduced = recChecks.filter(x => x.ok && x.reproduced).length;
  if (runs < 2) { gates.push('HOLD'); reasons.push('reproduction run ' + runs + ' time(s); run it twice before filing'); }
  else if (reproduced === 0) { gates.push('CONTRADICTED'); reasons.push('0 of ' + runs + ' reproduction runs showed the defect'); }
  else if (reproduced < runs) flags.push('FLAKY ' + reproduced + '/' + runs);

  // Fresh second opinion (reasoning + confirmation bias).
  const so = f.second_opinion;
  let soChecks = [];
  if (!so) { gates.push('HOLD'); reasons.push('no second_opinion from a fresh sub-agent (_shared/second-opinion-prompt.md)'); }
  else {
    const rm = String(so.rule_met || '').toLowerCase();
    if (rm === 'yes') { gates.push('NEEDS-HUMAN'); reasons.push('second opinion says the rule IS met (disagrees): ' + (so.summary || '')); }
    else if (rm !== 'no') { gates.push('NEEDS-HUMAN'); reasons.push('second opinion could not tell: ' + (so.summary || '')); }
    soChecks = (so.evidence_refs || []).map(r => checkRef(r, refCtx));
    soChecks.filter(c => c.status !== 'OK' && c.status !== 'NO_ALSO_CHECKED').forEach(c => { gates.push('NEEDS-HUMAN'); reasons.push('second opinion cites evidence that does not hold: ' + c.detail); });
  }
  if (!ctx.build) flags.push('NO BUILD RECORDED');
  const gate = worst(gates.length ? gates : ['FILE']);
  return {
    related_tc_id: f.related_tc_id, bug_id: f.bug_id || null, field_name: f.field_name || null,
    summary: f.summary, gate, flags, reasons: [...new Set(reasons)],
    evidence: checked, repro: { runs, reproduced }, second_opinion: so ? { rule_met: so.rule_met, by: so.by, checks: soChecks } : null,
  };
}
const pick = (o, ks) => ks.reduce((a, k) => (o[k] !== undefined ? (a[k] = o[k], a) : a), {});

function checkTestCase(t, ctx) {
  const o = t.obj, notes = [];
  const refs = o.evidence_refs || [];
  const checked = refs.map(r => checkRef(r, Object.assign({}, ctx, { defaultLine: t.n })));
  const saved = !!(o.response_full || (o.attempts || []).some(a => a.response_full) || (o.hops || []).some(h => h.response_full));
  (o.hops || []).forEach(h => { if (h.verdict && !h.response_full && !h.evidence_refs) notes.push('hop ' + h.hop + ' (' + h.endpoint + ') has a verdict but no saved response'); });
  let status;
  if (checked.some(c => c.status === 'FAILED' || c.status === 'ELSEWHERE')) status = 'CONTRADICTED';
  else if (refs.length && checked.every(c => c.status === 'OK' || c.status === 'NO_ALSO_CHECKED' || c.status === 'SCOPED_ELSEWHERE')) status = 'VERIFIED';
  else if (saved) status = 'CAPTURED';
  else status = 'UNVERIFIED';
  checked.filter(c => c.status !== 'OK').forEach(c => notes.push(c.status + ': ' + c.detail));
  if (!specIds(o.spec_ref).length) notes.push('no spec_ref');
  else { const miss = specIds(o.spec_ref).filter(id => !ctx.spec.sections[id]); if (miss.length) notes.push('spec_ref not in SPEC.md: ' + miss.join(', ')); }
  if (status === 'VERIFIED' && notes.some(n => /spec_ref/.test(n))) status = 'UNVERIFIED';
  if (o.verdict === 'FAIL' && !o.expectation_source) notes.push('FAIL without expectation_source');
  return { tc_id: o.tc_id, verdict: o.verdict, status, notes };
}

// ---------- render ----------
function renderMd(r) {
  const s = r.summary, o = [];
  const held = s.defects.total - s.defects.FILE;
  o.push('# Evidence check — ' + r.slug, '');
  o.push('**Result:** ' + (r.exit === 0 ? 'PASS' : 'HOLD') + ' | Defects: ' + s.defects.total + ' (file ' + s.defects.FILE + ', held ' + held + ')' +
    ' | Test cases: ' + s.test_cases.total + ' (verified ' + s.test_cases.VERIFIED + ', captured ' + s.test_cases.CAPTURED + ', unverified ' + s.test_cases.UNVERIFIED + ', contradicted ' + s.test_cases.CONTRADICTED + ')' +
    ' | Secret leaks: ' + s.secret_leaks + ' | Evidence coverage: ' + s.evidence_coverage_pct + '%', '');
  o.push('Checked ' + r.checked_at + ' by `.claude/Skills/_shared/scripts/verify-evidence.js` against `' + r.log + '`. Build: ' + (r.build ? '`' + JSON.stringify(r.build) + '`' : '**not recorded**') + '. Rules: `.claude/Skills/_shared/AI_Guardrails.md`.', '');
  o.push('## Defect gate', '');
  if (!r.defects.length) o.push('No `finding kind:"defect"` lines in scope.', '');
  else {
    o.push('| Test case | Bug | Gate | Flags | Repro | 2nd opinion | Why |', '|---|---|---|---|---|---|---|');
    r.defects.forEach(d => o.push('| ' + [d.related_tc_id, d.bug_id || '', '**' + d.gate + '**', d.flags.join(', '), d.repro.reproduced + '/' + d.repro.runs,
      d.second_opinion ? String(d.second_opinion.rule_met) : '—', (d.reasons.join('<br>') || 'all checks pass').replace(/\|/g, '\\|')].join(' | ') + ' |'));
    o.push('');
  }
  o.push('Gates: **FILE** may be filed · **HOLD** finish the missing step (reproduce twice, second opinion, also_checked) · **NEEDS-HUMAN** reviewer disagreed or scope unclear: ask the user · **QUESTION** expectation is INFERRED: ask, never file · **UNVERIFIED** evidence or SPEC rule missing · **CONTRADICTED** the saved response says otherwise.', '');
  if (r.warnings.length) { o.push('## Warnings', ''); r.warnings.forEach(w => o.push('- ' + w)); o.push(''); }
  if (r.secret_leaks.length) { o.push('## Secret leaks (values not shown)', ''); r.secret_leaks.forEach(l => o.push('- line ' + l.line + ': ' + l.what)); o.push(''); }
  const nonVer = r.test_cases.filter(t => t.status !== 'VERIFIED');
  o.push('## Test cases without verified evidence (' + nonVer.length + ' of ' + r.test_cases.length + ')', '');
  if (nonVer.length) {
    o.push('| TC | Verdict | Evidence | Notes |', '|---|---|---|---|');
    nonVer.forEach(t => o.push('| ' + [t.tc_id, t.verdict, t.status, (t.notes.join('<br>') || '').replace(/\|/g, '\\|')].join(' | ') + ' |'));
    o.push('');
  }
  o.push('## Defect evidence detail', '');
  r.defects.forEach(d => {
    o.push('### ' + d.related_tc_id + (d.bug_id ? ' / ' + d.bug_id : '') + ' — ' + d.gate, '', d.summary || '', '');
    d.evidence.forEach(c => o.push('- `' + c.status + '` ' + c.ref.replace(/\|/g, '\\|') + (c.detail ? ' — ' + c.detail : '')));
    o.push('');
  });
  return o.join('\n');
}

// ---------- main ----------
function run(logArg, opts) {
  const logAbs = resolvePath(logArg, process.cwd());
  if (!fs.existsSync(logAbs)) throw new Error('log not found: ' + logArg);
  const specAbs = resolvePath(opts.spec || 'NDC_Integration/SPEC.md', process.cwd());
  const entries = readJsonl(logAbs);
  const ctx = {
    logAbs, logRel: rel(logAbs), logDir: path.dirname(logAbs), spec: loadSpec(specAbs), warnings: [],
    today: opts.today || new Date().toISOString().slice(0, 10),
  };
  entries.filter(e => e.bad).forEach(e => ctx.warnings.push('line ' + e.n + ' is not valid JSON: ' + e.bad));
  const ok = entries.filter(e => e.obj);
  const rs = (ok.find(e => e.obj.type === 'run_start') || {}).obj || {};
  ctx.build = rs.build || null;
  if (!ctx.build) ctx.warnings.push('run_start has no "build": build/version and timestamp must be logged on every run (KB L-04)');
  ok.filter(e => e.obj.type === 'build_change').forEach(e => ctx.warnings.push('build changed mid-run at ' + (e.obj.at || '?') + ' (' + (e.obj.from || '?') + ' -> ' + (e.obj.to || '?') + '): re-confirm earlier defects on the final build (KB L-04)'));

  // latest line wins per test case / finding key
  const tcMap = new Map();
  ok.filter(e => e.obj.type === 'test_case').forEach(e => tcMap.set(e.obj.tc_id, e));
  const fMap = new Map();
  ok.filter(e => e.obj.type === 'finding' && e.obj.kind === 'defect').forEach(e => fMap.set(e.obj.related_tc_id + '|' + (e.obj.bug_id || e.obj.field_name || ''), e));
  let findings = [...fMap.values()];
  let tcs = [...tcMap.values()];
  if (opts.tc) { findings = findings.filter(e => e.obj.related_tc_id === opts.tc); tcs = tcs.filter(e => e.obj.tc_id === opts.tc); }

  const test_cases = tcs.map(t => checkTestCase(t, ctx));
  const defects = findings.map(f => gateDefect(f.obj, tcMap.get(f.obj.related_tc_id), ctx));
  const secret_leaks = scanSecrets(ok, readText(logAbs));

  const cnt = (arr, k, vals) => vals.reduce((a, v) => (a[v] = arr.filter(x => x[k] === v).length, a), { total: arr.length });
  const summary = {
    test_cases: cnt(test_cases, 'status', ['VERIFIED', 'CAPTURED', 'UNVERIFIED', 'CONTRADICTED']),
    defects: cnt(defects, 'gate', ['FILE', 'HOLD', 'NEEDS-HUMAN', 'QUESTION', 'UNVERIFIED', 'CONTRADICTED']),
    secret_leaks: secret_leaks.length,
  };
  summary.evidence_coverage_pct = test_cases.length ? Math.round(1000 * summary.test_cases.VERIFIED / test_cases.length) / 10 : 0;
  const exit = (summary.defects.FILE < summary.defects.total || secret_leaks.length || summary.test_cases.CONTRADICTED) ? 1 : 0;
  const slug = path.basename(logAbs).replace(/\.jsonl$/i, '');
  return { slug, log: ctx.logRel, checked_at: new Date().toISOString(), build: ctx.build, summary, defects, test_cases, secret_leaks, warnings: ctx.warnings, exit };
}

module.exports = { run, checkRef, findQuote, loadSpec, renderMd };

if (require.main === module) {
  const a = parseArgs(process.argv.slice(2));
  if (!a._[0]) { console.error('usage: node verify-evidence.js <run.jsonl> [--tc <TC-ID>] [--out <dir>] [--spec <SPEC.md>] [--no-write] [--json] [--no-fail]'); process.exit(2); }
  let r;
  try { r = run(a._[0], a); } catch (e) { console.error('verify-evidence: ' + e.message); process.exit(2); }
  const md = renderMd(r);
  if (!a['no-write']) {
    const outDir = a.out ? resolvePath(a.out, process.cwd()) : path.dirname(resolvePath(a._[0], process.cwd()));
    fs.mkdirSync(outDir, { recursive: true });
    const base = path.join(outDir, r.slug + (a.tc ? '_' + a.tc.replace(/[^A-Za-z0-9_.-]/g, '_') : '') + '_evidence');
    fs.writeFileSync(base + '.json', JSON.stringify(r, null, 1));
    fs.writeFileSync(base + '.md', md);
    if (!a.quiet) console.error('wrote ' + rel(base) + '.json / .md');
  }
  if (a.json) console.log(JSON.stringify(r, null, 1));
  else if (!a.quiet) console.log(md.split('\n').slice(0, 40).join('\n'));
  process.exit(a['no-fail'] ? 0 : r.exit);
}
