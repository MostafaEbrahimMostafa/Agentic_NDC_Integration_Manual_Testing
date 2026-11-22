// Bug Registry: NDC_Integration/Artifacts/Registry/Bug_Registry.csv (one row per real defect, GlobalId never
// reused) + NDC_Integration/Artifacts/Registry/Bug_Registry_History.jsonl (append-only event log).
// Writes keep row order and only change the touched row, so git diffs stay one line per bug.
const fs = require('fs');
const path = require('path');
const csv = require('./csv');

const NDC = path.resolve(__dirname, '..', '..', '..');            // NDC_Integration/
const REPO = path.resolve(NDC, '..');
const REG = path.join(NDC, 'Artifacts', 'Registry', 'Bug_Registry.csv');
const HIST = path.join(NDC, 'Artifacts', 'Registry', 'Bug_Registry_History.jsonl');

const COLUMNS = ['GlobalId', 'AdoId', 'Title', 'AltTitles', 'Supplier', 'Env', 'Selector', 'Version', 'Severity',
  'RunBugIds', 'ReproRecipe', 'Status', 'LastVerdict', 'LastVerified'];
const STATUSES = ['Open', 'Still-Reproduces', 'Fixed-Pending-Signoff', 'Fixed-Verified', 'Blocked', 'Retracted'];
const SEVERITIES = ['Critical', 'High', 'Medium', 'Low', ''];

function load() {
  if (!fs.existsSync(REG)) return [];
  const { header, records } = csv.parseObjects(fs.readFileSync(REG, 'utf8'));
  const missing = COLUMNS.filter(c => !header.includes(c));
  if (missing.length) throw new Error('Bug_Registry.csv is missing columns: ' + missing.join(', '));
  return records;
}

function save(rows) {
  const tmp = REG + '.tmp';
  fs.writeFileSync(tmp, csv.stringify(COLUMNS, rows));
  fs.renameSync(tmp, REG);
}

function history(ev) {
  fs.appendFileSync(HIST, JSON.stringify({ at: new Date().toISOString(), ...ev }) + '\n');
}

const norm = s => String(s || '').toLowerCase().replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/[‒-―−]/g, '-').replace(/["'`]/g, '').replace(/\s+/g, ' ').trim();
// RunBugIds / AdoId / Env are ';'-separated; AltTitles is '|'-separated (titles may contain ';').
const list = s => String(s || '').split(/\s*;\s*/).filter(Boolean);
const titles = s => String(s || '').split(/\s*\|\s*/).filter(Boolean);

function nextId(rows) {
  const max = rows.reduce((m, r) => Math.max(m, Number((/^NDC-BUG-(\d+)$/.exec(r.GlobalId) || [])[1] || 0)), 0);
  // ids that ever appeared in the history also count, so a deleted row's id is never reused
  let hmax = 0;
  if (fs.existsSync(HIST)) for (const line of fs.readFileSync(HIST, 'utf8').split('\n')) { const m = /"globalId":"NDC-BUG-(\d+)"/.exec(line); if (m) hmax = Math.max(hmax, Number(m[1])); }
  return 'NDC-BUG-' + String(Math.max(max, hmax) + 1).padStart(4, '0');
}

// Resolve one input token. Returns { input, kind, row|null, error? }
function resolveId(rows, input) {
  const s = String(input).trim();
  if (/^NDC-BUG-\d{4}$/i.test(s)) {
    const row = rows.find(r => r.GlobalId.toUpperCase() === s.toUpperCase());
    return { input: s, kind: 'global', row: row || null, error: row ? undefined : 'no registry row with this GlobalId' };
  }
  const ado = /^(?:ADO[\s#-]*)?(\d{4,7})$/i.exec(s);
  if (ado) {
    const hits = rows.filter(r => list(r.AdoId).includes(ado[1]));
    return { input: s, kind: 'ado', row: hits[0] || null, error: hits.length === 0 ? 'no registry row with AdoId ' + ado[1] : hits.length > 1 ? 'AdoId on more than one row: ' + hits.map(h => h.GlobalId).join(', ') : undefined };
  }
  const run = /^(.+?)\s*:\s*(BUG-\d+)$/i.exec(s);
  if (run) {
    const key = run[1] + ':' + run[2].toUpperCase();
    const hits = rows.filter(r => list(r.RunBugIds).some(x => x.replace(/\s*:\s*/, ':').toUpperCase() === key.toUpperCase()));
    return { input: s, kind: 'run', row: hits[0] || null, error: hits.length === 0 ? 'no registry row lists run bug id ' + key + ' (use the full run slug, e.g. 20261116_AirArabiaPlus-USA-Verify-ne:BUG-07)' : undefined };
  }
  if (/^BUG-\d+$/i.test(s)) return { input: s, kind: 'bare', row: null, error: 'bare run bug id is ambiguous: bug ids restart in every run - give it as <run slug>:' + s.toUpperCase() };
  return { input: s, kind: 'unknown', row: null, error: 'not a GlobalId, ADO id or <run slug>:BUG-NN' };
}

function resolveTitle(rows, title) {
  const t = norm(title);
  const hits = rows.filter(r => norm(r.Title) === t || titles(r.AltTitles).some(a => norm(a) === t));
  return { input: title, kind: 'title', row: hits[0] || null, error: hits.length === 0 ? 'no registry row with this Title/AltTitle' : hits.length > 1 ? 'title matches several rows: ' + hits.map(h => h.GlobalId).join(', ') : undefined };
}

function get(rows, gid) {
  const r = rows.find(x => x.GlobalId === gid);
  if (!r) throw new Error('No registry row ' + gid);
  return r;
}

function addListValue(cur, v) { const a = list(cur); if (v && !a.includes(v)) a.push(v); return a.join('; '); }

module.exports = { NDC, REPO, REG, HIST, COLUMNS, STATUSES, SEVERITIES, load, save, history, nextId, resolveId, resolveTitle, get, norm, list, addListValue };
