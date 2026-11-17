// Run recorder: appends generate-qa-report JSONL lines (schema: .claude/skills/Generate_QA_Report/references/log-schema.md) and re-renders the live .md after every test case.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '../../..');
const LOGS = process.env.LOGS_DIR || path.join(ROOT, 'NDC_Integration/Artifacts/Logs');
const RENDER = path.join(ROOT, '.claude/skills/Generate_QA_Report/scripts');
const SLUG_FILE = path.join(__dirname, 'slug.txt');
const slug = () => process.env.SLUG || fs.readFileSync(SLUG_FILE, 'utf8').trim();
const now = () => new Date().toISOString();
const file = () => path.join(LOGS, slug() + '.jsonl');

// log-schema "Additions 2026-10-10": arrays > 3 keep 2 + "__omitted__: N more items"; strings > 110 -> 60 + "...[truncated]"; objects > 14 keys keep 8 + "__omitted__"
function trunc(v) {
  if (Array.isArray(v)) return v.length > 3 ? v.slice(0, 2).map(trunc).concat(['__omitted__: ' + (v.length - 2) + ' more items']) : v.map(trunc);
  if (v && typeof v === 'object') {
    let ks = Object.keys(v); const o = {};
    const extra = ks.length > 14 ? ks.length - 8 : 0; if (extra) ks = ks.slice(0, 8);
    for (const k of ks) o[k] = /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) ? '[REDACTED - per SPEC.md 7.14]' : trunc(v[k]);
    if (extra) o.__omitted__ = extra + ' more keys';
    return o;
  }
  if (typeof v === 'string' && v.length > 110) return v.slice(0, 60) + '...[truncated]';
  return v;
}
const append = o => fs.appendFileSync(file(), JSON.stringify(o) + '\n');
const render = () => { if (process.env.NO_RENDER) return; try { cp.execFileSync('node', [path.join(RENDER, 'render-md.js'), slug()], { stdio: 'pipe' }); } catch (e) { console.error('render-md failed', String(e.stderr || e.message).slice(0, 300)); } };

function init(meta) { fs.mkdirSync(LOGS, { recursive: true }); if (!fs.existsSync(file())) { append({ type: 'run_start', ...meta }); append({ type: 'phase', name: 'Initialization', event: 'end', at: meta.started_at }); append({ type: 'phase', name: 'Test Execution', event: 'start', at: meta.started_at }); render(); } }
function hopToSchema(h, i) {
  const rq = h.request_full, rs = h.response_full;
  return { hop: i + 1, endpoint: h.endpoint, request_summary: h.request_summary, response_summary: h.response_summary, expected: h.expected, actual: h.actual, verdict: h.verdict, evidence: h.evidence,
    started_at: h.started_at, ended_at: h.ended_at, request_full: rq, response_full: rs };
}
// logTC: tc = { tc_id,title,endpoint_or_flow,category,verdict,spec_ref,request_summary,response_summary,expected,actual,evidence,plain:{e,q,s,x,a}, hops|attempts|request_full/response_full, started_at, waiting_ms, correlation_id, supplier? }
function logTC(tc) {
  const rs0 = now();
  const line = { type: 'test_case', ...tc, timestamp: tc.timestamp || now(), timing: tc.started_at ? 'complete' : undefined };
  if (line.waiting_ms === 0) delete line.waiting_ms;
  if (line.hops) line.hops = line.hops.map(hopToSchema).map(h => ({ ...h, request_full: h.request_full && { ...h.request_full, body: trunc(h.request_full.body) }, response_full: h.response_full && { ...h.response_full, body: trunc(h.response_full.body) } }));
  if (line.attempts) line.attempts = line.attempts.map(a => ({ ...a, request_full: { ...a.request_full, body: trunc(a.request_full.body) }, response_full: { ...a.response_full, body: trunc(a.response_full.body) } }));
  if (line.request_full) { line.request_full = { ...line.request_full, body: trunc(line.request_full.body) }; line.response_full = { ...line.response_full, body: trunc(line.response_full.body) }; }
  line.reporting_started_at = rs0;
  append(line); render();
  // append-only (two runners share the file): the real end of this append+render window goes in a stamp line, merged into the test_case line at finalisation
  line.reporting_ended_at = now(); append({ type: 'reporting_stamp', tc_id: line.tc_id, reporting_ended_at: line.reporting_ended_at });
  return line;
}
function finding(f) { append({ type: 'finding', ...f }); }
function cleanup(c) { append({ type: 'cleanup', ...c }); }
function spec(s) { append({ type: 'spec_update_proposed', status: 'pending', ...s }); }
function note(text) { append({ type: 'scope_note', text }); }
function raw(o) { append(o); }
module.exports = { init, logTC, finding, cleanup, spec, note, raw, trunc, slug, now, render, append, LOGS, ROOT };
