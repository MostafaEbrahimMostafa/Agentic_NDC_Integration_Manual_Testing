// Scans the Round 4 report artifacts for the API key, a literal Galileo TargetBranch value and un-redacted raw supplier payload fields.
const { H } = require('../V2/lib'); const fs = require('fs'), path = require('path');
const key = H['x-api-key']; const L = path.resolve(__dirname, '../../Artifacts/Logs'), B = path.resolve(__dirname, '../../Artifacts/BugReports/' + (process.env.SLUG || '20261115-075426_Galileo-EGY-Availability-ne4-Round4'));
let hits = 0, files = 0;
const chk = p => {
  const t = fs.readFileSync(p, 'utf8'); files++;
  if (t.includes(key)) { hits++; console.log('KEY in', p); }
  if (/TargetBranch=\\?"[A-Z0-9]{3,}/.test(t)) { hits++; console.log('TargetBranch value in', p); }
  const m = t.match(/OriginalSupplier(Request|Response)\\?":\s*\\?"([^"\\]{0,40})/g) || [];
  const bad = m.filter(x => !/REDACTED/.test(x)); if (bad.length) { hits++; console.log('raw supplier field in', p, bad.slice(0, 2)); }
};
fs.readdirSync(L).filter(f => f.includes(process.env.SLUG || 'Round4')).forEach(f => chk(path.join(L, f)));
(function w(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); f.isDirectory() ? w(p) : chk(p); } })(B);
console.log('files scanned', files, 'hits', hits);
