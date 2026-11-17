// Adds a full-flow/ folder to every bug folder of the current run: for each evidence call of the bug, EVERY request and response of that
// execution from the first-page Availability (Search) call up to and including the evidence call, as redacted JSON files + INDEX.md.
// Run after make_bugs.js (make_bugs recreates the folders). Idempotent.
const fs = require('fs'), path = require('path');
const G = require('./gl'); const R = G.R; const { H } = G;
const BUGS = require(process.env.BUGS || './bugs_gl'); const slug = R.slug(); const OUT = path.resolve(R.ROOT, 'NDC_Integration/Artifacts/BugReports', slug);
const load = d => { const a = []; try { for (const f of fs.readdirSync(d)) { try { a.push(JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'))); } catch (e) { } } } catch (e) { } a.sort((x, y) => (x.started_at < y.started_at ? -1 : x.started_at > y.started_at ? 1 : 0)); return a; };
const raw4 = load(path.join(__dirname, 'raw')), raw3 = load(path.join(__dirname, 'round3', 'raw'));
const safe = s => String(s).replace(/[^A-Za-z0-9_.-]/g, '_');
const redact = o => JSON.parse(JSON.stringify(o, (k, v) => /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) && v != null && String(v).length > 2 ? '[REDACTED - raw supplier payload, per SPEC.md 7.14]' : v));
const isFirstPage = r => r.endpoint === 'Availability' && r.request && r.request.body && typeof r.request.body === 'object' && r.request.body.searchCriteria;
const MARK = '<!-- full-flow -->';
const pick = c => {
  const f = r => r.tc === c.tc && (c.exact ? r.step === c.step : r.step.includes(c.step)) && (!c.has || JSON.stringify(r.response || '').includes(c.has));
  let src = raw4, m = src.filter(f); if (!m.length) { src = raw3; m = src.filter(f); } if (!m.length) return null;
  return { r: c.nth === 'first' ? m[0] : m[m.length - 1], src, round: src === raw3 ? 'Round 3 (run 20261110-145430)' : 'Round 4' };
};
const chainOf = (src, r) => {
  const same = src.filter(x => x.tc === r.tc); const i = same.findIndex(x => x.id === r.id); if (i < 0) return [r];
  let s = i; while (s > 0 && !isFirstPage(same[s])) s--; if (!isFirstPage(same[s])) s = i; // no Search call found before it: the call alone
  return same.slice(s, i + 1);
};
let totalFiles = 0, bugsWith = 0, chains = 0;
for (const b of BUGS) {
  const dirName = fs.readdirSync(OUT).find(d => d.startsWith(b.id + '_') && fs.statSync(path.join(OUT, d)).isDirectory()); if (!dirName) { console.log('no folder for', b.id); continue; }
  const dir = path.join(OUT, dirName), ff = path.join(dir, 'full-flow'); fs.rmSync(ff, { recursive: true, force: true });
  const seen = new Set(), idx = []; let cn = 0;
  for (const c of b.calls) {
    const p = pick(c); if (!p) continue; const ch = chainOf(p.src, p.r); const key = ch[0].id + '>' + ch[ch.length - 1].id; if (seen.has(key)) continue; seen.add(key);
    cn++; const cdir = path.join(ff, `chain-${String(cn).padStart(2, '0')}_${safe(c.label.replace(/_R3$/, ''))}`); fs.mkdirSync(cdir, { recursive: true });
    const rows = []; ch.forEach((r, k) => {
      const nn = String(k + 1).padStart(2, '0'); const nm = `${nn}_${safe(r.endpoint)}_HTTP${r.status}`; const hdr = { ...(r.request.headers || {}) }; if (hdr['x-api-key']) hdr['x-api-key'] = '[REDACTED]';
      fs.writeFileSync(path.join(cdir, nm + '_request.json'), JSON.stringify({ step: r.step, method: r.request.method || 'POST', url: r.request.url, headers: hdr, body: r.request.body && typeof r.request.body === 'object' ? redact(r.request.body) : r.request.body }, null, 2));
      fs.writeFileSync(path.join(cdir, nm + '_response.json'), JSON.stringify({ step: r.step, status: r.status, correlationId: (r.response_headers || {}).correlationid || (r.response && (r.response.TransactionId || r.response.transactionId)) || null, durationMs: r.ms, requestedAtUtc: r.started_at, respondedAtUtc: r.ended_at, headers: r.response_headers, body: r.response && typeof r.response === 'object' ? redact(r.response) : (r.response || '(empty body)') }, null, 2));
      rows.push(`| ${nn} | ${r.step} | ${r.endpoint} | ${(r.request.url || '').replace(G.BASE, '/')} | ${r.status} | ${r.ms} ms | \`${nm}_request.json\` / \`${nm}_response.json\` |`); totalFiles += 2;
    });
    idx.push(`### ${path.basename(cdir)}\n\nEvidence call: **${c.label.replace(/_R3$/, '')}** (test case ${c.tc}, from ${p.round}). ${ch.length} call${ch.length === 1 ? '' : 's'}, in the order they were sent, from ${isFirstPage(ch[0]) ? 'the first-page Availability (Search) call' : 'the evidence call itself (it is the first call of its flow)'} to the evidence call.\n\n| # | Step | Endpoint | Path | HTTP | Time | Files |\n|---|---|---|---|---|---|---|\n${rows.join('\n')}\n`); chains++;
  }
  const mdFile = path.join(dir, fs.readdirSync(dir).find(f => f.endsWith('.md')));
  let md = fs.readFileSync(mdFile, 'utf8'); const at = md.indexOf(MARK); if (at >= 0) md = md.slice(0, at).trimEnd() + '\n';
  if (idx.length) {
    bugsWith++;
    fs.writeFileSync(path.join(ff, 'INDEX.md'), `# Full request/response flow — ${b.id}\n\nEvery request and response of the flow behind each evidence call of this bug, from the Search (Availability) call to the failing call. x-api-key is redacted and raw supplier payloads are redacted per SPEC.md 7.14.\n\n${idx.join('\n')}`, 'utf8');
    md += `\n${MARK}\n## 🔗 Full request/response flow (Search to the failing call)\n\nAll requests and responses of the flow, in order, as JSON files: [full-flow/INDEX.md](full-flow/INDEX.md) (${cn} chain${cn === 1 ? '' : 's'}, ${fs.readdirSync(ff).filter(d => d !== 'INDEX.md').map(d => fs.readdirSync(path.join(ff, d)).length / 2).reduce((a, x) => a + x, 0)} calls).\n`;
  } else md += `\n${MARK}\n## 🔗 Full request/response flow (Search to the failing call)\n\nNo API call applies to this bug (static check of the Postman collection file), so there is no flow to list.\n`;
  fs.writeFileSync(mdFile, md, 'utf8');
}
console.log('bugs with chains', bugsWith, 'of', BUGS.length, '| chains', chains, '| json files', totalFiles);
