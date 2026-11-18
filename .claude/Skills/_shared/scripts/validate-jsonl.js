#!/usr/bin/env node
// validate-jsonl.js - output contract check for a run log (Enhancement Plan Step 5).
// Contract: ../contracts/run-log.schema.json (one JSON-schema per line type).
// Field meanings: Generate_QA_Report/references/log-schema.md.
//
// Shape only. Whether the cited evidence really holds is verify-evidence.js's job (Step 4); this
// script checks that every line has the agreed shape, so scripts downstream (renderers, the
// evidence gate, Step 6 metrics) can read it without guessing.
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/validate-jsonl.js <run.jsonl> [more.jsonl ...] [--json]
// Exit code: 0 = passes, 1 = contract errors, 2 = usage or read error.
'use strict';
const fs = require('fs');
const { createResult, finish, parseArgs, usage } = require('./lib/result.js');
const { validate } = require('./lib/schema.js');
const SCHEMA = require('../contracts/run-log.schema.json');

const RAW_PAYLOAD = /^(original)?supplier(request|response)$/i;
const BUDGET = { arrayItems: 3, stringChars: 110, lineBytes: 100 * 1024 };

// Walk a value; call fn(key, value, pathString) for every property.
function walk(v, at, fn) {
  if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${at}[${i}]`, fn));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { fn(k, x, `${at}.${k}`); walk(x, `${at}.${k}`, fn); }
}

function sizeIssues(body, at) {
  const out = [];
  const visit = (v, p) => {
    if (Array.isArray(v)) {
      const marked = v.some(x => typeof x === 'string' && x.startsWith('__omitted__'));
      if (v.length > BUDGET.arrayItems && !marked) out.push(`${p} has ${v.length} items (keep 2 + "__omitted__: N more items")`);
      v.forEach((x, i) => visit(x, `${p}[${i}]`));
    } else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) visit(x, `${p}.${k}`);
    } else if (typeof v === 'string' && v.length > BUDGET.stringChars && !v.endsWith('...[truncated]') && !v.startsWith('[REDACTED')) {
      out.push(`${p} is a ${v.length}-char string (cut to 60 + "...[truncated]")`);
    }
  };
  visit(body, at);
  return out;
}

function validateJsonl(file) {
  const r = createResult('run log JSONL', file);
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch (e) { r.error('', 'cannot read file: ' + e.message); return r; }
  if (text.charCodeAt(0) === 0xfeff) { r.error('line 1', 'file starts with a UTF-8 BOM; JSONL readers expect none'); text = text.slice(1); }

  const lines = [];
  text.split(/\r?\n/).forEach((s, i) => {
    if (!s.trim()) return;
    const n = i + 1;
    if (Buffer.byteLength(s) > BUDGET.lineBytes) r.warn(`line ${n}`, `line is ${Math.round(Buffer.byteLength(s) / 1024)} KB (truncate bodies per log-schema.md)`);
    try { lines.push({ n, o: JSON.parse(s) }); } catch (e) { r.error(`line ${n}`, 'not valid JSON: ' + e.message); }
  });
  if (!lines.length) { r.error('', 'log has no lines'); return r; }

  const counts = {}, tcIds = new Map(), unknownTypes = new Set();
  let sizeWarn = 0;
  for (const { n, o } of lines) {
    const where = `line ${n}`;
    if (!o || typeof o !== 'object' || Array.isArray(o)) { r.error(where, 'line is not a JSON object'); continue; }
    const type = o.type;
    if (!type) { r.error(where, 'missing "type"'); continue; }
    counts[type] = (counts[type] || 0) + 1;
    const def = SCHEMA.$defs[type];
    if (!def || ['iso', 'text', 'verdict', 'expectationSource', 'evidenceRef', 'evidenceRefs', 'requestFull', 'responseFull', 'hop', 'attempt'].includes(type)) {
      unknownTypes.add(type);
    } else {
      const label = o.tc_id || o.related_tc_id;
      validate(def, o, SCHEMA, '$').forEach(e => r.error(`${where} ${type}${label ? ' ' + label : ''}`, `${e.path.replace(/^\$\.?/, '') || type}: ${e.msg}`));
    }

    if (type === 'test_case' && o.tc_id) {
      if (tcIds.has(o.tc_id)) r.error(`${where} test_case ${o.tc_id}`, `duplicate test_case for this TC-ID (first at line ${tcIds.get(o.tc_id)}); the countable unit is one test case`);
      else tcIds.set(o.tc_id, n);
      if (o.hops && o.attempts) r.error(`${where} test_case ${o.tc_id}`, 'has both hops and attempts (log-schema.md: never combine)');
      if (o.started_at && o.timestamp && Date.parse(o.started_at) > Date.parse(o.timestamp)) r.error(`${where} test_case ${o.tc_id}`, 'started_at is after timestamp');
      if (o.verdict === 'FAIL' && !o.expectation_source) r.warn(`${where} test_case ${o.tc_id}`, 'FAIL without expectation_source (AI_Guardrails G-3)');
    }

    // redaction: x-api-key must be "[REDACTED]", raw supplier payloads must be null or a redaction note
    walk(o, '$', (k, v, at) => {
      if (/^x-api-key$/i.test(k) && v !== '[REDACTED]' && v !== null) r.error(where, `${at} is not "[REDACTED]" (value not printed)`);
      if (RAW_PAYLOAD.test(k) && v !== null && !(typeof v === 'string' && /^\[REDACTED/.test(v))) r.error(where, `${at} carries a raw supplier payload; replace with "[REDACTED - ... per SPEC.md 7.14]"`);
    });

    // size budget for captured bodies (warnings, counted)
    const bodies = [];
    const pushBodies = (x, p) => { if (x && x.request_full) bodies.push([x.request_full.body, `${p}.request_full.body`]); if (x && x.response_full) bodies.push([x.response_full.body, `${p}.response_full.body`]); };
    pushBodies(o, '$');
    if (Array.isArray(o.hops)) o.hops.forEach((h, i) => pushBodies(h, `$.hops[${i}]`));
    if (Array.isArray(o.attempts)) o.attempts.forEach((a, i) => pushBodies(a, `$.attempts[${i}]`));
    for (const [b, p] of bodies) {
      const issues = sizeIssues(b, p);
      sizeWarn += issues.length;
      if (issues.length) r.warn(where, `${issues.length} body field(s) over the size budget, e.g. ${issues[0]}`);
    }
  }

  // cross-line rules
  if (lines[0].o.type !== 'run_start') r.error('line 1', 'first line must be run_start');
  if ((counts.run_start || 0) !== 1) r.error('file', `exactly one run_start required (found ${counts.run_start || 0})`);
  if ((counts.run_end || 0) > 1) r.error('file', `at most one run_end allowed (found ${counts.run_end})`);
  const tcById = new Map(lines.filter(x => x.o.type === 'test_case').map(x => [x.o.tc_id, x.o]));
  for (const { n, o } of lines) {
    if (o.type === 'finding' && o.related_tc_id && !tcIds.has(o.related_tc_id)) r.error(`line ${n} finding`, `related_tc_id ${o.related_tc_id} has no test_case line`);
    // AI_Guardrails G-1: a defect cites evidence on the finding or on its test case (verify-evidence.js reads either)
    if (o.type === 'finding' && o.kind === 'defect' && tcById.has(o.related_tc_id)) {
      const has = x => Array.isArray(x.evidence_refs) && x.evidence_refs.length > 0;
      if (!has(o) && !has(tcById.get(o.related_tc_id))) r.error(`line ${n} finding ${o.related_tc_id}`, 'defect has no evidence_refs (on the finding or its test_case)');
    }
    if (o.type === 'cleanup' && o.related_tc_id && !tcIds.has(o.related_tc_id)) r.warn(`line ${n} cleanup`, `related_tc_id ${o.related_tc_id} has no test_case line`);
  }
  unknownTypes.forEach(t => r.warn('file', `line type "${t}" is not in run-log.schema.json (add it to log-schema.md and the schema if it is real)`));

  const rs = lines[0].o.type === 'run_start' ? lines[0].o : {};
  r.info.lines = lines.length;
  r.info.test_cases = tcIds.size;
  if (Number.isInteger(rs.total_test_cases_planned)) r.info.planned = rs.total_test_cases_planned;
  if (sizeWarn) r.info.size_budget_issues = sizeWarn;
  return r;
}

module.exports = { validateJsonl };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), ['json']);
  if (!args._.length) return usage('usage: node validate-jsonl.js <run.jsonl> [more.jsonl ...] [--json]');
  finish(args._.map(f => validateJsonl(f)), args);
}
