// make_bugs.js: add the server CorrelationId of every evidence call to each bug report (and to the saved response files).
const fs = require('fs');
let s = fs.readFileSync('make_bugs.js', 'utf8');
if (s.includes('REPRO_CORR')) { console.log('already'); process.exit(0); }
const must = (a) => { if (!s.includes(a)) throw new Error('anchor: ' + a.slice(0, 60)); };
// 1. load repro map + raw by id
must("const slug = R.slug();");
s = s.replace("const slug = R.slug();", "const slug = R.slug(); const REPRO_CORR = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'repro_corr.json'), 'utf8')).out; } catch (e) { return {}; } })();");
// 2. response file gets correlationId when the original body carries it (error bodies: TransactionId == CorrelationId header)
must("body: p.r.response && typeof p.r.response === 'object'");
s = s.replace("const resf = { label: p.label, status: p.r.status,", "const bodyCorr = p.r.response && typeof p.r.response === 'object' ? (p.r.response.TransactionId || p.r.response.transactionId || null) : null; const hdrCorr = (p.r.response_headers || {}).correlationid || null;\n    const resf = { label: p.label, status: p.r.status, correlationId: hdrCorr || bodyCorr, headers: p.r.response_headers || undefined,");
// 3. extra reproduction pairs for evidence calls whose original response had no id
must("const first = files.find(f => f.ev) || files[0];");
s = s.replace("const first = files.find(f => f.ev) || files[0];", `// correlation ids of the evidence calls: original (error body TransactionId) or the header captured when the call was re-run
  const corrRows = []; const rmap = REPRO_CORR[b.id] || {};
  for (const f of files.filter(x => x.ev)) {
    const orig = f.resf.body && typeof f.resf.body === 'object' && (f.resf.body.TransactionId || f.resf.body.transactionId);
    const lbl = Object.keys(rmap).find(k => safe(k) === f.lab.replace(/__chain.*$/, ''));
    if (orig) corrRows.push({ label: f.lab, ep: f.ep, id: orig, src: 'original call — TransactionId of the error body (equals the CorrelationId response header)', status: f.status });
    else if (lbl && rmap[lbl].correlationId) { const rr = raw.find(x => x.id === rmap[lbl].recId); corrRows.push({ label: f.lab, ep: f.ep, id: rmap[lbl].correlationId, src: 'CorrelationId response header of the same call re-run on ' + rmap[lbl].at.slice(0, 19).replace('T', ' ') + ' UTC' + (rmap[lbl].note ? ' (' + rmap[lbl].note + ')' : '') + ' — the first run stored response bodies only, so the original id was not captured', status: rmap[lbl].status });
      if (rr) { const n = String(files.length + 1).padStart(2, '0'); const lab2 = safe('REPRO_' + lbl); const hdr = { ...rr.request.headers }; if (hdr['x-api-key']) hdr['x-api-key'] = '[REDACTED]'; fs.writeFileSync(path.join(dir, 'requests-responses', n + '_' + lab2 + '_request.json'), JSON.stringify({ label: 'REPRO ' + lbl, method: 'POST', url: rr.request.url, headers: hdr, body: rr.request.body && typeof rr.request.body === 'object' ? redactSupplier(rr.request.body) : rr.request.body }, null, 2)); fs.writeFileSync(path.join(dir, 'requests-responses', n + '_' + lab2 + '_response.json'), JSON.stringify({ label: 'REPRO ' + lbl, status: rr.status, correlationId: rmap[lbl].correlationId, durationMs: rr.ms, requestedAtUtc: rr.started_at, respondedAtUtc: rr.ended_at, headers: rr.response_headers, body: rr.response && typeof rr.response === 'object' ? redactSupplier(rr.response) : rr.response }, null, 2)); files.push({ n, lab: lab2, url: rr.request.url, status: rr.status, resf: { body: rr.response }, ev: false, ep: rr.endpoint + ' (re-run for the CorrelationId)' }); } }
    else corrRows.push({ label: f.lab, ep: f.ep, id: null, src: 'not captured', status: f.status });
  }
  const first = files.find(f => f.ev) || files[0];`);
// 4. System Information block
must("- **Correlation ID:** \\`${corr || 'Not returned by this response'}\\`");
s = s.replace("- **Correlation ID:** \\`${corr || 'Not returned by this response'}\\`", "- **Correlation ID (${b.api}, evidence call):** \\`${(corrRows.find(c => c.id) || {}).id || 'Not captured'}\\`\n${corrRows.map(c => `  - ${c.ep} · ${c.label.replace(/__chain.*$/, '').replace(/_/g, ' ')} · HTTP ${c.status} · \\`${c.id || 'not captured'}\\` — ${c.src}`).join('\\n')}");
s = s.replace("const corr = first && first.resf.body && (first.resf.body.TransactionId || first.resf.body.transactionId);", "const corr = null; const REPRO_CORR_USED = true;");
fs.writeFileSync('make_bugs.js', s); console.log('patched');
