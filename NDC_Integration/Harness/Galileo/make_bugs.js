// Generates NDC_Integration/Artifacts/BugReports/<slug>/BUG-NN_<API>_<FIELD>/{BUG-NN_*.md, requests-responses/*.json} + README.md from bugs_gl.js and the raw call store.
const G = require('./gl'); const fs = require('fs'), path = require('path'); const R = G.R; const { H } = G;
const BUGS = require(process.env.BUGS || './bugs_gl'); const slug = R.slug(); const OUT = path.resolve(R.ROOT, 'NDC_Integration/Artifacts/BugReports', slug);
const L = fs.readFileSync(path.join(R.LOGS, slug + '.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)); const rs = L.find(x => x.type === 'run_start');
const rawDir = path.join(__dirname, 'raw'); const raw = []; for (const f of fs.readdirSync(rawDir)) { try { raw.push(JSON.parse(fs.readFileSync(path.join(rawDir, f), 'utf8'))); } catch (e) { } }
raw.sort((a, b) => (a.started_at < b.started_at ? -1 : 1));
const raw3 = []; try { const d3 = path.join(__dirname, 'round3', 'raw'); for (const f of fs.readdirSync(d3)) { try { raw3.push(JSON.parse(fs.readFileSync(path.join(d3, f), 'utf8'))); } catch (e) { } } raw3.sort((a, b) => (a.started_at < b.started_at ? -1 : 1)); } catch (e) { }
const safe = s => String(s).replace(/[^A-Za-z0-9_.-]/g, '_');
const redact = o => JSON.parse(JSON.stringify(o, (k, v) => /supplierRequest|supplierResponse|OriginalSupplier(Request|Response)/i.test(k) && v != null && String(v).length > 2 ? '[REDACTED - raw supplier payload, per SPEC.md 7.14]' : v));
const fence = s => (/^\s*[\{\["]/.test(s) ? '```json\n' : '```text\n') + s + '\n```';
const tcOf = id => L.filter(x => x.type === 'test_case' && x.tc_id === id).pop();
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const index = [], findings = [];
for (const b of BUGS) {
  const dirName = `${b.id}_${safe(b.api)}_${safe(b.field)}`; const dir = path.join(OUT, dirName); fs.mkdirSync(path.join(dir, 'requests-responses'), { recursive: true });
  const files = []; let n = 0;
  for (const c of b.calls) {
    let m = raw.filter(r => r.tc === c.tc && (c.exact ? r.step === c.step : r.step.includes(c.step)) && (!c.has || JSON.stringify(r.response || '').includes(c.has))); let fromR3 = false; if (!m.length) { m = raw3.filter(r => r.tc === c.tc && (c.exact ? r.step === c.step : r.step.includes(c.step)) && (!c.has || JSON.stringify(r.response || '').includes(c.has))); fromR3 = m.length > 0; } const r = c.nth === 'first' ? m[0] : m[m.length - 1]; if (r && fromR3) c.label = c.label + '_R3'; if (!r) { console.log('NO RAW CALL for', b.id, c.tc, c.step); continue; }
    n++; const nn = String(n).padStart(2, '0'); const lab = safe(c.label); const hdr = { ...r.request.headers }; if (hdr['x-api-key']) hdr['x-api-key'] = '[REDACTED]';
    fs.writeFileSync(path.join(dir, 'requests-responses', `${nn}_${lab}_request.json`), JSON.stringify({ label: c.label, method: r.request.method || 'POST', url: r.request.url, headers: hdr, body: r.request.body && typeof r.request.body === 'object' ? redact(r.request.body) : r.request.body }, null, 2));
    const resf = { label: c.label, status: r.status, correlationId: (r.response_headers || {}).correlationid || (r.response && (r.response.TransactionId || r.response.transactionId)) || null, durationMs: r.ms, requestedAtUtc: r.started_at, respondedAtUtc: r.ended_at, headers: r.response_headers, body: r.response && typeof r.response === 'object' ? redact(r.response) : (r.response || '(empty body)') };
    fs.writeFileSync(path.join(dir, 'requests-responses', `${nn}_${lab}_response.json`), JSON.stringify(resf, null, 2)); files.push({ nn, lab, url: r.request.url, status: r.status, ep: r.endpoint, resf, tc: c.tc });
  }
  const first = files[0]; const base = rs.baseUrl; const corr = first && first.resf.correlationId;
  const snippet = first ? JSON.stringify(first.resf.body, (k, v) => typeof v === 'string' && v.length > 90 ? v.slice(0, 80) + '…' : v, 2).slice(0, 1500) : '(no stored call applies: static check of the collection file)';
  const md = `# [V2][Galileo][${b.api}] – ${b.title_tail}

## 📄 Description

${b.desc}

**Affected test cases:** ${b.tcs.join(', ')} (run \`${slug}\`).

## 🔁 Steps to Reproduce

${b.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## ❌ Actual Result

${fence(b.actual)}

${b.impact}

## ✅ Expected Result

${fence(b.expected)}

${b.why}

## 🖥️ System Information

- **API Version:** \`V2\`
- **Supplier/Airline:** \`Galileo\`
- **Base URL:** \`${base}\`
- **API Name:** \`${b.api}\`
- **Environment:** \`${rs.environment_text || rs.environment}\`
- **Credentials Selector:** \`EGY\`
- **Correlation ID:** \`${corr || 'Not returned by this response'}\`${first ? ` (CorrelationId response header of the evidence call \`${first.lab}\`)` : ''}

## 📊 Severity

**${b.sev}** — ${b.sevWhy}

## 📎 Evidence

**Actual response (redacted${first ? ', first stored call: ' + first.lab : ''}):**

\`\`\`json
${snippet}
\`\`\`

**Expected response:**

${fence(b.expected)}

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the \`requests-responses/\` folder next to this file. The page-1 Availability call each chain starts with is not stored here (its response is large and not the evidence); its search criteria are in the steps above.

${files.length ? files.map(f => `- \`${f.nn}_${f.lab}_request.json\` / \`${f.nn}_${f.lab}_response.json\` — ${f.ep}, \`${f.url.replace(base, '/')}\`, HTTP ${f.status}`).join('\n') : 'No stored call applies (static check of the collection file; see Steps).'}

## 💥 Impact

${b.impact}
`;
  const file = `${b.id}_${safe(b.api)}_${safe(b.field)}.md`; fs.writeFileSync(path.join(dir, file), md, 'utf8');
  index.push(`- [${b.id}](${dirName}/${file}) — [V2][Galileo][${b.api}] – ${b.title_tail} (${b.sev}) — ${files.length} request/response pair${files.length === 1 ? '' : 's'}`);
  if (!tcOf(b.anchor) || tcOf(b.anchor).verdict !== 'FAIL') console.log('WARNING anchor not FAIL', b.id, b.anchor, tcOf(b.anchor) && tcOf(b.anchor).verdict);
  findings.push({ type: 'finding', kind: 'defect', related_tc_id: b.anchor, bug_id: b.id, field_name: b.field, summary: `${b.api}: ${b.title_tail} (also: ${b.tcs.filter(x => x !== b.anchor).join(', ') || 'no other test case'})`, spec_ref: b.spec, expected_value: b.expected.slice(0, 220), impact: b.impact.slice(0, 400), evidence: b.desc.slice(0, 500), severity: b.sev });
}
fs.writeFileSync(path.join(OUT, 'README.md'), `# Bug reports — Galileo / EGY V2 Availability flow, ne-4 (${slug})\n\n${BUGS.length} consolidated defects (one folder each; several share a root cause across failing test cases). Severity heuristic: Critical = state/security corruption or full block, High = core booking/identity/financial integrity or a whole trip type blocked, Medium = non-blocking but breaks a consumer, Low = cosmetic or test asset.\n\n${index.join('\n')}\n`, 'utf8');
// safety: the real API key must appear nowhere in the generated folders
const key = H['x-api-key']; let leaked = 0; (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else { const t = fs.readFileSync(p, 'utf8'); if (t.includes(key)) { leaked++; console.log('KEY FOUND IN', p); } if (/TargetBranch=/.test(t)) { leaked++; console.log('SUPPLIER XML FOUND IN', p); } } } })(OUT);
console.log('bug folders', BUGS.length, 'leak hits:', leaked);
fs.writeFileSync(path.join(__dirname, 'bug_findings.json'), JSON.stringify(findings));
