#!/usr/bin/env node
// Output-contract regression test (Enhancement Plan Step 5).
// Every validator must PASS a contract-conforming output and FAIL each kind of violation, and every
// renderer must produce output its validator accepts. All inputs are SYNTHETIC fixtures (not real
// findings). No API calls; writes only to the OS temp folder. Run from anywhere:
//   node .claude/Skills/_shared/tests/output-contracts.test.js
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const S = path.join(__dirname, '..', 'scripts');
const { validateCsv } = require(path.join(S, 'validate-csv.js'));
const { validateJsonl } = require(path.join(S, 'validate-jsonl.js'));
const { validateReport } = require(path.join(S, 'validate-report.js'));
const { validateBugReports } = require(path.join(S, 'validate-bug-report.js'));
const { validateXlsx } = require(path.join(S, 'validate-xlsx.js'));
const { validateDocx } = require(path.join(S, 'validate-docx.js'));
const { renderXlsx } = require(path.join(S, 'render-xlsx.js'));
const { renderDocx } = require(path.join(S, 'render-docx.js'));
const { render, readLog } = require(path.join(__dirname, '..', '..', 'Generate_QA_Report', 'scripts', 'render-md.js'));

const FX = path.join(__dirname, 'fixtures', 'output');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ndc-output-contracts-'));
let pass = 0, fail = 0;
function check(name, cond, info) {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (info ? '  -> ' + info : '')); }
}
const has = (r, re) => r.errors.some(e => re.test(e.where + ' ' + e.msg));
const errs = r => r.errors.map(e => e.where + ': ' + e.msg).join(' | ');

// ---------- CSV ----------
console.log('Test-case CSV (validate-csv.js)');
const gc = validateCsv(path.join(FX, 'good_testcases.csv'), { new: true });
check('conforming CSV passes (incl. --new)', gc.errors.length === 0 && gc.warnings.length === 0, errs(gc) || JSON.stringify(gc.warnings));
const bc = validateCsv(path.join(FX, 'bad_testcases.csv'), { new: true });
check('duplicate ID', has(bc, /duplicate ID/));
check('ninth category (Performance)', has(bc, /Category "Performance"/));
check('placeholder Expected Result (TBD)', has(bc, /placeholder/));
check('§ section not in SPEC.md (§9.9)', has(bc, /§9\.9/));
check('bare "2.9" reference', has(bc, /no § section/));
check('bad Version / Priority', has(bc, /Version "V3"/) && has(bc, /Priority "Urgent"/));
check('Status must be Not Run in a new file', has(bc, /must be "Not Run"/));
check('Flow ID on an EndpointTestCase row', has(bc, /FLOW-V2-44.*pattern/));
check('row with an extra field', has(bc, /has 16 fields/));
check('title house style is a warning, not an error', bc.warnings.some(w => /house convention/.test(w.msg)));
fs.writeFileSync(path.join(TMP, 'cols.csv'), fs.readFileSync(path.join(FX, 'good_testcases.csv'), 'utf8').replace('"Risk",', '').replace(/"High","High"/g, '"High"'));
check('wrong column set fails early', has(validateCsv(path.join(TMP, 'cols.csv')), /columns must be exactly/));

// ---------- JSONL ----------
console.log('Run log JSONL (validate-jsonl.js)');
const gj = validateJsonl(path.join(FX, 'good_run.jsonl'));
check('conforming log passes', gj.errors.length === 0, errs(gj));
check('size-budget clean (truncated arrays)', gj.warnings.length === 0, JSON.stringify(gj.warnings));
const bj = validateJsonl(path.join(FX, 'bad_run.jsonl'));
check('first line must be run_start', has(bj, /first line must be run_start/));
check('run_start.build required (G-4)', has(bj, /build: required/));
check('verdict enum', has(bj, /verdict: must be one of/));
check('ISO timestamp', has(bj, /timestamp: not an ISO-8601/));
check('duplicate test_case per TC-ID', has(bj, /duplicate test_case/));
check('x-api-key not redacted (any casing, value not printed)', has(bj, /X-Api-Key is not "\[REDACTED\]"/) && !errs(bj).includes('SYNTHETIC-NOT-A-REAL-KEY'));
check('raw supplier payload', has(bj, /raw supplier payload/));
check('hops and attempts together', has(bj, /both hops and attempts/));
check('defect without required fields', has(bj, /field_name: required/) && has(bj, /expectation_source: required/));
check('finding points at a missing test case', has(bj, /TC-NOPE has no test_case/));
check('invalid JSON line', has(bj, /not valid JSON/));
check('interrupted run_end needs reason', has(bj, /interrupted_after_tc: required/));

// ---------- report (.md rendered, pyramid) ----------
console.log('Run report .md (render-md.js + validate-report.js)');
const slug = 'FIXTURE-run';
const jl = path.join(TMP, slug + '.jsonl');
fs.copyFileSync(path.join(FX, 'good_run.jsonl'), jl);
const md = render(readLog(jl), slug);
fs.writeFileSync(path.join(TMP, slug + '.md'), md);
const head = md.split('\n').slice(0, 15).join('\n');
check('verdict, counts, top risks, blockers within 15 lines', /\*\*Verdict:\*\* 🔴/.test(head) && /\| 3 \| 3 \| 1 \| 1 \| 1 \| 1 \| 1 \|/.test(head) && /\*\*Top risks:\*\* BUG-01/.test(head) && /\*\*Blockers:\*\* TC-HOLD-POS-01/.test(head), head);
check('observation rendered in its own section', /## Observations\n\n- \*\*\[TC-BOOK-VAL-02\]\*\*/.test(md));
check('evidence links at the end', /## Evidence\n\n- Source log: \[FIXTURE-run\.jsonl\]/.test(md));
const gr = validateReport(jl);
check('freshly rendered .md passes', gr.errors.length === 0, errs(gr));
fs.writeFileSync(path.join(TMP, slug + '.md'), md.replace('| 3 | 3 | 1 | 1 | 1 |', '| 3 | 3 | 2 | 0 | 1 |'));
check('hand-edited number in .md fails', has(validateReport(jl), /differs from a fresh render/));
const running = render([readLog(jl)[0]], 'x');
check('pyramid holds for a run with no test cases yet', /\*\*Verdict:\*\* ⏳ NOT STARTED · \*\*Status:\*\* RUNNING/.test(running) && /\*\*Blockers:\*\* none/.test(running));

// ---------- bug report ----------
console.log('Bug report (validate-bug-report.js)');
const run = path.join(TMP, 'BugReports', 'FIXTURE-run'), name = 'BUG-01_Book_paxTotalAncillaryAmount';
const bug = path.join(run, name), rr = path.join(bug, 'requests-responses');
fs.mkdirSync(rr, { recursive: true });
const reg = path.join(TMP, 'Bug_Registry.csv');
fs.writeFileSync(reg, 'GlobalId,AdoId,Title\nNDC-BUG-9999,,SYNTHETIC\n');
fs.writeFileSync(path.join(run, 'README.md'), `- [BUG-01](${name}/${name}.md) — NDC-BUG-9999 — SYNTHETIC (Medium) — 1 request/response pair\n`);
fs.writeFileSync(path.join(rr, '01_V2_Book_request.json'), JSON.stringify({ label: 'V2_Book', method: 'POST', url: 'https://example.invalid/api/v2/FlightBooking/Book', headers: { 'x-api-key': '[REDACTED]' }, body: { supplier: 'SUP_A' } }));
fs.writeFileSync(path.join(rr, '01_V2_Book_response.json'), JSON.stringify({ label: 'V2_Book', status: 200, durationMs: 900, body: { pnr: 'ZZZ222', supplierResponse: '[REDACTED - raw supplier payload, per SPEC.md 7.14]' } }));
const goodBug = [
  '# [V2][SUP_A][Book] – paxTotalAncillaryAmount Missing from Book Response', '',
  '## 📄 Description', '', 'SYNTHETIC fixture. The field is missing.', '',
  '## 🔁 Steps to Reproduce', '', '1. FareConfirm', '2. Book', '',
  '## ❌ Actual Result', '', '```json', '{ "pnr": "ZZZ222" }', '```', '',
  '## ✅ Expected Result', '', '```json', '"paxTotalAncillaryAmount": { "amount": 12.5 }', '```', '',
  '## 🖥️ System Information', '', '- **API Version:** `V2`', '- **Supplier/Airline:** `SUP_A`', '- **Base URL:** `https://example.invalid/`',
  '- **API Name:** `Book`', '- **Environment:** `staging`', '- **Credentials Selector:** `SUP_A_DEFAULT`', '- **Correlation ID:** `Not returned by this response`',
  '- **Registry ID:** `NDC-BUG-9999` (`NDC_Integration/Artifacts/Bug_Registry.csv`)', '',
  '## 📊 Severity', '', '**Medium** — SYNTHETIC.', '',
  '## 📎 Evidence', '', 'Gate: FILE (verify-evidence.js).', '',
  '## 📁 Request / response files', '', '- `01_V2_Book_request.json` / `01_V2_Book_response.json` — V2 Book, `api/v2/FlightBooking/Book`, HTTP 200', '',
  '## 💥 Impact', '', 'SYNTHETIC.', '',
  '## 📝 Observations', '', 'Free text is allowed here.', ''
].join('\n');
const mdPath = path.join(bug, name + '.md');
fs.writeFileSync(mdPath, goodBug);
const gb = validateBugReports([run], { registry: reg });
check('conforming bug report passes', gb.length === 1 && gb[0].errors.length === 0 && gb[0].warnings.length === 0, gb.map(errs).join(' / ') + JSON.stringify(gb[0].warnings));
const bugCase = (label, text, re) => { fs.writeFileSync(mdPath, text); const r = validateBugReports([bug], { registry: reg })[0]; check(label, has(r, re), errs(r)); };
bugCase('missing section', goodBug.replace(/## 💥 Impact\n\nSYNTHETIC.\n\n/, ''), /missing section "Impact"/);
bugCase('sections out of order', goodBug.replace('## 📊 Severity', '## TMP').replace('## 📎 Evidence', '## 📊 Severity').replace('## TMP', '## 📎 Evidence'), /out of order/);
bugCase('template placeholder left', goodBug.replace('SYNTHETIC fixture.', '<FIELD_NAME> is null.'), /placeholders left/);
bugCase('Registry ID not in the registry', goodBug.replace('NDC-BUG-9999', 'NDC-BUG-0000'), /not in/);
bugCase('listed file missing on disk', goodBug.replace(/01_V2_Book_(request|response)\.json/g, '02_V2_Book_$1.json'), /missing on disk/);
bugCase('severity value', goodBug.replace('**Medium**', '**Major**'), /Severity/);
bugCase('over the 120-line budget', goodBug.replace('SYNTHETIC fixture. The field is missing.', Array(120).fill('line').join('\n')), /budget 120/);
bugCase('bad title', goodBug.replace(/^# .*/, '# Book is broken'), /title must be/);
fs.writeFileSync(mdPath, goodBug);
fs.writeFileSync(path.join(rr, '01_V2_Book_request.json'), JSON.stringify({ label: 'x', method: 'POST', url: 'u', headers: { 'X-API-KEY': 'SYNTHETIC-NOT-A-REAL-KEY' }, body: {} }));
const leak = validateBugReports([bug], { registry: reg })[0];
check('unredacted key in a request file (value not printed)', has(leak, /not redacted/) && !errs(leak).includes('SYNTHETIC-NOT-A-REAL-KEY'));

// ---------- xlsx ----------
console.log('Stakeholder XLSX (render-xlsx.js + validate-xlsx.js)');
const x1 = renderXlsx(path.join(FX, 'good_testcases.csv'), path.join(TMP, 'tc.xlsx')).out;
check('CSV -> XLSX passes (same columns and cells)', validateXlsx(x1, path.join(FX, 'good_testcases.csv')).errors.length === 0);
const x2 = renderXlsx(jl, path.join(TMP, 'run.xlsx')).out;
check('JSONL -> XLSX passes (results columns)', validateXlsx(x2, jl).errors.length === 0);
check('render is byte-stable', Buffer.compare(fs.readFileSync(x1), fs.readFileSync(renderXlsx(path.join(FX, 'good_testcases.csv'), path.join(TMP, 'tc2.xlsx')).out)) === 0);
const edited = path.join(TMP, 'edited.csv');
fs.writeFileSync(edited, fs.readFileSync(path.join(FX, 'good_testcases.csv'), 'utf8').replace('no PNR created', 'PNR created'));
check('XLSX that differs from its source fails', has(validateXlsx(x1, edited), /cell differs/));

// ---------- docx ----------
console.log('Stakeholder DOCX (render-docx.js + validate-docx.js)');
fs.writeFileSync(path.join(TMP, slug + '.md'), md); // undo the hand edit above
const d1 = renderDocx(path.join(TMP, slug + '.md'), path.join(TMP, 'run.docx'));
check('report .md -> DOCX passes (headings, tables, text)', validateDocx(d1, path.join(TMP, slug + '.md')).errors.length === 0, errs(validateDocx(d1, path.join(TMP, slug + '.md'))));
fs.writeFileSync(mdPath, goodBug);
const d2 = renderDocx(mdPath, path.join(TMP, 'bug.docx'));
check('bug report .md -> DOCX passes', validateDocx(d2, mdPath).errors.length === 0, errs(validateDocx(d2, mdPath)));
const more = path.join(TMP, 'more.md');
fs.writeFileSync(more, md + '\n## Extra section\n\nA line the document does not have.\n');
const dm = validateDocx(d1, more);
check('DOCX missing a heading and a line fails', has(dm, /heading/) && has(dm, /not in the document/));

fs.rmSync(TMP, { recursive: true, force: true });
console.log(`\n${fail ? 'FAILED' : 'PASSED'}: ${pass} passed, ${fail} failed`);
process.exitCode = fail ? 1 : 0;
