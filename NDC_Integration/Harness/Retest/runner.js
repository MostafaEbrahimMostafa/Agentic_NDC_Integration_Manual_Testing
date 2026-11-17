#!/usr/bin/env node
// RC Re-Test runner (plan Step 3b). One generic runner for every repro recipe - replaces the
// per-round make_*_retest.js / verify*.js / bugs_r*.js scripts.
//
//   node NDC_Integration/Harness/Retest/runner.js plan --supplier AirArabiaPlus --host <url> (--ids "65507,NDC-BUG-0003" | --sheet Resources/AirArabiaPlus_bugs.xlsx)
//   node NDC_Integration/Harness/Retest/runner.js run  ...same...  [--allow-booking] [--build "<RC label>"]
//
// Options:
//   --ids <list>            comma list: GlobalId (NDC-BUG-0042), ADO id (65507), or <run slug>:BUG-NN
//   --sheet <xlsx|csv>      bug list; matched by an ID/ADO column if present, else by Title (registry Title/AltTitles)
//   --supplier <name>       required. Recipes for another supplier are BLOCKED (out of scope) - CLAUDE.md rule 4
//   --selector <sel>        optional; when given, recipes for another selector are not run
//   --host <url>            required, full base URL (resolve short names with KB/03_Technical/Environments.md)
//   --build <label>         RC/build label to record in every verdict
//   --allow-booking         required when any chain has Hold/Book/BookAfterHold/CancelAfterHold/Void
//   --non-staging-ok        additionally required for booking steps on a non-staging host - CLAUDE.md rule 2
//   --no-neighbours         skip the regression ring
//   --no-preflight          skip the TestData pre-flight
//   --allow-draft           also run draft / changed-after-approval recipes (registry is NOT updated for them)
//   --no-registry-update    write the report only
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const REG = require('./lib/registry');
const RCP = require('./lib/recipe');
const { BOOKING_STEPS } = require('./lib/steps-meta');
const { readSheet } = require('./lib/xlsx');
const csv = require('./lib/csv');

// ------------------------------------------------------------------ args
const argv = process.argv.slice(2);
const cmd = argv[0];
const A = {};
for (let i = 1; i < argv.length; i++) {
  const a = argv[i];
  if (!a.startsWith('--')) continue;
  const k = a.slice(2);
  if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) A[k] = argv[++i]; else A[k] = true;
}
function die(msg, code = 1) { console.error('ERROR: ' + msg); process.exit(code); }
if (!['plan', 'run'].includes(cmd)) die('usage: runner.js plan|run --supplier <S> --host <url> (--ids <list> | --sheet <file>) [options] - see the header of this file');
if (!A.supplier) die('--supplier is required (CLAUDE.md rule 5: ask, do not default)');
if (!A.host || !/^https?:\/\//.test(A.host)) die('--host must be a full base URL (see NDC_Integration/KB/03_Technical/Environments.md)');
if (!A.ids && !A.sheet) die('give --ids or --sheet');
const HOST = A.host.endsWith('/') ? A.host : A.host + '/';
process.env.NDC_BASE = HOST;                                   // before steps.js loads ../V2/lib.js

function envShort(h) {
  let m;
  if ((m = /ndc-integration-stg-ne-(\d+)/i.exec(h))) return 'ne-' + m[1];
  if (/ndc-integration-stg-ne[.-]/i.test(h)) return 'stg-ne';
  if (/supplier-integration-staging/i.test(h)) return 'supplier-integration-staging';
  if (/supplier-integration/i.test(h)) return 'supplier-integration';
  return new URL(h).hostname.split('.')[0];
}
const ENV = envShort(HOST);
const IS_STAGING = /ndc-integration-stg-|supplier-integration-staging/i.test(HOST);

// ------------------------------------------------------------------ resolve inputs
const rows = REG.load();
const inputs = [];
if (A.ids) for (const id of String(A.ids).split(',').map(s => s.trim()).filter(Boolean)) inputs.push({ label: id, res: REG.resolveId(rows, id) });
if (A.sheet) {
  const f = path.resolve(REG.REPO, A.sheet);
  if (!fs.existsSync(f)) die('sheet not found: ' + A.sheet);
  const table = /\.xlsx$/i.test(f) ? readSheet(f) : csv.parse(fs.readFileSync(f, 'utf8'));
  const head = (table[0] || []).map(h => String(h).trim());
  const idCol = head.findIndex(h => /^(global ?id|ado( id)?|id|work item id|bug id)$/i.test(h));
  const titleCol = head.findIndex(h => /^title$/i.test(h));
  if (idCol < 0 && titleCol < 0) die('sheet has neither an ID/ADO column nor a Title column');
  table.slice(1).forEach((r, i) => {
    const rowNo = i + 2, id = idCol >= 0 ? String(r[idCol] || '').trim() : '', title = titleCol >= 0 ? String(r[titleCol] || '').trim() : '';
    if (!id && !title) return;
    const label = `${path.basename(f)} row ${rowNo}${title ? ': ' + title.slice(0, 70) : ''}`;
    inputs.push({ label, res: id ? REG.resolveId(rows, id) : REG.resolveTitle(rows, title) });
  });
}

// group by GlobalId, decide what is runnable
const unresolved = [];
const byId = new Map();
for (const it of inputs) {
  if (!it.res.row) { unresolved.push({ input: it.label, reason: it.res.error + ' - add/link the bug in the registry (registry.js add|link) or draft a recipe' }); continue; }
  const g = it.res.row.GlobalId;
  if (!byId.has(g)) byId.set(g, { row: it.res.row, inputs: [] });
  byId.get(g).inputs.push(it.label);
}
const plan = [];
for (const [gid, { row, inputs: ins }] of byId) {
  const p = { globalId: gid, row, inputs: ins, recipe: null, runnable: false, reason: '' };
  plan.push(p);
  if (row.Status === 'Retracted') { p.reason = 'Retracted - not a real defect, not re-tested'; continue; }
  if (row.Supplier !== A.supplier) { p.reason = `BLOCKED (out of scope): bug is for supplier ${row.Supplier}, this run is ${A.supplier} (rule 4)`; continue; }
  const L = RCP.loadBug(gid);
  p.recipeFile = L.file;
  if (!L.exists) { p.reason = 'no recipe yet - draft one from the bug report and get it approved (Retest_Issues skill step 2)'; continue; }
  p.recipe = L.recipe; p.recipeState = L.state;
  if (L.errors.length) { p.reason = 'recipe invalid: ' + L.errors.join('; '); continue; }
  if (L.recipe.supplier !== A.supplier) { p.reason = `BLOCKED (out of scope): recipe supplier ${L.recipe.supplier}`; continue; }
  if (A.selector && L.recipe.selector !== A.selector) { p.reason = `recipe is for selector ${L.recipe.selector}, run asked for ${A.selector}`; continue; }
  if (L.state !== 'approved' && !A['allow-draft']) { p.reason = `recipe ${L.state} - approve it (recipe.js approve ${gid} --by "<name>") or pass --allow-draft for a trial run`; continue; }
  p.runnable = true;
}
// neighbours (regression ring), de-duplicated per flow + test data + step options
const ring = new Map();
if (!A['no-neighbours']) for (const p of plan.filter(x => x.runnable)) for (const n of p.recipe.neighbours || []) {
  const spec = typeof n === 'string' ? { flow: n } : n;
  const L = RCP.loadFlow(spec.flow);
  const testData = (L.recipe && L.recipe.testData) || p.recipe.testData;
  const key = spec.flow + '|' + testData + '|' + JSON.stringify(spec.stepOptions || {});
  if (!ring.has(key)) ring.set(key, { flowId: spec.flow, L, testData, stepOptions: spec.stepOptions || {}, selector: p.recipe.selector, forBugs: [] });
  ring.get(key).forBugs.push(p.globalId);
}
for (const n of ring.values()) {
  n.runnable = n.L.exists && !n.L.errors.length && (n.L.state === 'approved' || !!A['allow-draft']);
  n.reason = !n.L.exists ? 'flow recipe missing: ' + n.L.file : n.L.errors.length ? 'flow recipe invalid: ' + n.L.errors.join('; ') : n.runnable ? '' : 'flow recipe ' + n.L.state;
}

// booking authorization
const bookingSteps = chain => chain.map(RCP.stepName).filter(s => BOOKING_STEPS.includes(s));
const needsBooking = [];
plan.filter(p => p.runnable).forEach(p => { const b = bookingSteps(p.recipe.chain); if (b.length) needsBooking.push(`${p.globalId}: ${b.join(', ')}`); });
[...ring.values()].filter(n => n.runnable).forEach(n => { const b = bookingSteps(n.L.recipe.chain); if (b.length) needsBooking.push(`${n.flowId} (neighbour of ${n.forBugs.join(', ')}): ${b.join(', ')}`); });

// ------------------------------------------------------------------ plan output
function printPlan() {
  console.log(`RC Re-Test plan - ${A.supplier}${A.selector ? ' / ' + A.selector : ''} on ${ENV} (${HOST}) ${IS_STAGING ? '[staging]' : '[NOT staging]'}`);
  console.log(`Inputs: ${inputs.length} -> ${byId.size} registry bug(s), ${unresolved.length} unresolved`);
  console.log('');
  for (const p of plan) {
    const steps = p.recipe ? p.recipe.chain.map(RCP.stepAlias).join(' > ') : '';
    console.log(`${p.runnable ? 'RUN ' : 'SKIP'}  ${p.globalId}  [${p.row.Status}]  ${p.row.Title.slice(0, 90)}`);
    console.log(`        inputs: ${p.inputs.join(' | ')}`);
    if (p.recipe) console.log(`        recipe: ${p.recipeFile} (${p.recipeState})  chain: ${steps}  testData: ${p.recipe.testData}`);
    if (!p.runnable) console.log(`        reason: ${p.reason}`);
  }
  for (const u of unresolved) console.log(`SKIP  (unresolved)  ${u.input}\n        reason: ${u.reason}`);
  if (ring.size) {
    console.log('\nRegression ring:');
    for (const n of ring.values()) console.log(`${n.runnable ? 'RUN ' : 'SKIP'}  ${n.flowId}  for ${n.forBugs.join(', ')}  testData ${n.testData}${n.reason ? '  - ' + n.reason : ''}`);
  }
  console.log('\nLive booking steps (each Hold/Book leaves a PNR unless the supplier can cancel/void it):');
  console.log(needsBooking.length ? needsBooking.map(s => '  - ' + s).join('\n') : '  none');
  if (needsBooking.length) console.log(`Authorization needed: --allow-booking${IS_STAGING ? '' : ' AND --non-staging-ok (host is not staging, rule 2)'}`);
}
printPlan();
if (cmd === 'plan') process.exit(0);

// ------------------------------------------------------------------ run
if (needsBooking.length && !A['allow-booking']) die('the plan has live booking steps: re-run with --allow-booking once the user authorized them', 2);
if (needsBooking.length && !IS_STAGING && !A['non-staging-ok']) die('booking steps on a non-staging host need --non-staging-ok (explicit authorization, CLAUDE.md rule 2)', 2);
if (!plan.some(p => p.runnable)) die('nothing runnable', 3);

const { runChain, typesOf, localDate } = require('./lib/steps');
const { verdict, flowVerdict } = require('./lib/assert');
const { render } = require('./lib/report');
const lib = require('../V2/lib.js');

const pad = n => String(n).padStart(2, '0');
const d0 = new Date();
const stamp = `${d0.getFullYear()}${pad(d0.getMonth() + 1)}${pad(d0.getDate())}-${pad(d0.getHours())}${pad(d0.getMinutes())}${pad(d0.getSeconds())}`;
const slug = `${stamp}_${A.supplier}-${A.selector || plan.find(p => p.runnable).recipe.selector}-RCRetest-${ENV}`;
const OUT = path.join(REG.NDC, 'Artifacts', 'Retest', slug);
fs.mkdirSync(OUT, { recursive: true });
const JL = path.join(OUT, 'retest.jsonl');
const log = o => fs.appendFileSync(JL, JSON.stringify({ at: new Date().toISOString(), ...o }) + '\n');
const relOut = p => path.relative(REG.REPO, p).split(path.sep).join('/');

const meta = { slug, host: HOST, env: ENV, supplier: A.supplier, selector: A.selector || plan.find(p => p.runnable).recipe.selector, build: A.build || '', started: new Date().toISOString(), ended: '', buildHeaders: [], draftRun: false };
log({ type: 'run_start', ...meta, inputs: inputs.map(i => i.label), runnable: plan.filter(p => p.runnable).map(p => p.globalId), skipped: plan.filter(p => !p.runnable).map(p => ({ globalId: p.globalId, reason: p.reason })), unresolved });

const fixtureCache = {};
const loadFixture = td => fixtureCache[td] || (fixtureCache[td] = JSON.parse(fs.readFileSync(path.join(REG.NDC, td), 'utf8')));

// ---------------- pre-flight: reuse Validate_TestData_Search (read-only sweep), rule-10 re-check
const SWEEP = path.join(REG.REPO, '.claude', 'Skills', 'Validate_TestData_Search', 'scripts', 'Invoke-TestDataSearchSweep.ps1');
async function builtinSearch(fx, sel) {
  const body = { supplier: A.supplier, credentialsSelector: sel, isDebug: false, searchCriteria: fx.searchCriteria.map(l => ({ origin: l.origin, destination: l.destination, date: l.date || localDate(Number(l.offsetDays)) })), passengers: fx.passengers.map(p => ({ passengerTypeCode: p.passengerTypeCode, count: String(p.count) })) };
  const h = await lib.call('Search', 'api/V2/FlightSearch/Search', body);
  return { status: h.status, offers: h.json && Array.isArray(h.json.offers) ? h.json.offers.length : 0 };
}
async function preflight(td, sel) {
  const fx = loadFixture(td);
  let r = null, source = '';
  if (process.platform === 'win32' && fs.existsSync(SWEEP)) {
    const dir = path.join(OUT, 'preflight', path.basename(td, '.json'));
    fs.mkdirSync(dir, { recursive: true });
    const p = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', SWEEP, '-BaseUrl', HOST, '-Supplier', A.supplier, '-CredentialsSelector', sel,
      '-TestDataDir', path.join(REG.NDC, path.dirname(td)), '-Filter', path.basename(td), '-ReportDir', dir], { encoding: 'utf8', timeout: 300000 });
    const js = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /^search-sweep-.*\.json$/.test(f)) : [];
    if (js.length) {
      let data = JSON.parse(fs.readFileSync(path.join(dir, js.sort().pop()), 'utf8').replace(/^﻿/, ''));
      if (!Array.isArray(data)) data = [data];
      const row = data[0] || {};
      r = { pass: !!row.pass1, offers: row.offers, status: row.status, message: row.supplierMessage || '' }; source = 'Validate_TestData_Search sweep';
    } else {
      // e.g. antivirus/AMSI blocking scripts launched from Node: report it, do not work around it
      const why = String(p.stderr || p.error || 'no output').split(/\r?\n/).map(s => s.trim()).find(s => s && !/^(At |\+|Testing\\)/.test(s)) || 'unknown error';
      source = `sweep script could not run (${why.slice(0, 140)}); fell back to built-in Search (same PASS rule)`;
      try { fs.rmdirSync(dir); } catch {}                         // leave no empty folder behind
    }
  }
  if (!r) { const b = await builtinSearch(fx, sel); r = { pass: b.status === 200 && b.offers > 0, offers: b.offers, status: b.status }; source = source || 'built-in Search'; }
  if (!r.pass) {                                               // rule 10: one empty offers[] is not proof
    await new Promise(z => setTimeout(z, 5000));
    const b = await builtinSearch(fx, sel);
    if (b.status === 200 && b.offers > 0) { r = { pass: true, offers: b.offers, status: 200, recheck: true }; source += ' + re-check'; }
    else { r.recheck = true; source += ' + re-check (still no offers)'; }
  }
  log({ type: 'preflight', testData: td, selector: sel, ...r, source });
  console.log(`preflight ${td}: ${r.pass ? 'PASS' : 'FAIL'} (offers ${r.offers}, ${source})`);
  return r;
}

function newCtx(sup, fixture, evDir, stepOptions) {
  return { sup, fixture, types: typesOf(fixture), seq: 0, evidenceDir: path.join(OUT, evDir), evidenceRel: evDir.split(path.sep).join('/'), notes: [], hops: [], cleanup: [], stepOptions: stepOptions || {}, ids: null };
}
// Runs a chain up to `attempts` times while it stops before the end (like the old verify10d loop).
// Evidence, hops, notes and cleanup accumulate across attempts; the last attempt's steps are judged.
async function runWithAttempts(sup, fixture, evDir, chain, attempts, stepOptions) {
  const ctx = newCtx(sup, fixture, evDir, stepOptions);
  let out;
  for (let a = 1; a <= (attempts || 1); a++) {
    Object.assign(ctx, { ids: null, booking: null, bundles: null, bundleResp: null, anc: null, seats: null, ancDone: false, searchUsed: null });
    out = await runChain(ctx, chain);
    if (!out.stop || a === (attempts || 1)) break;
    ctx.notes.push(`attempt ${a} stopped at ${out.stop.step} (${out.stop.why}); re-ran the whole chain`);
  }
  return { ctx, steps: out.steps, stop: out.stop };
}
const BUILD_HDR = /version|build|deploy|release|commit|x-app/i;
function collectBuildHeaders(steps) {
  for (const s of Object.values(steps)) for (const [k, v] of Object.entries(s.headers || {})) if (BUILD_HDR.test(k)) { const e = `${k}: ${v}`; if (!meta.buildHeaders.includes(e)) meta.buildHeaders.push(e); }
}

(async () => {
  const pf = {};
  const bugs = [], neighbours = [], cleanup = [];
  for (const p of plan.filter(x => x.runnable)) {
    const r = p.recipe, sel = r.selector;
    if (!A['no-preflight']) { const k = r.testData + '|' + sel; if (!pf[k]) pf[k] = await preflight(r.testData, sel); }
    const pre = pf[r.testData + '|' + sel];
    const base = { globalId: p.globalId, inputs: p.inputs, title: p.row.Title, ado: p.row.AdoId, severity: p.row.Severity, statusFrom: p.row.Status, recipeFile: p.recipeFile, recipeState: p.recipeState };
    let res;
    if (pre && !pre.pass) {
      res = { ...base, verdict: 'Blocked (env/data)', why: `pre-flight: ${r.testData} returned no offers (status ${pre.status}, ${pre.offers || 0} offers) - refresh it with Validate_TestData_Search -Repair`, chain: [], notes: [] };
    } else {
      console.log(`\n=== ${p.globalId} ${p.row.Title.slice(0, 80)}`);
      const { ctx, steps, stop } = await runWithAttempts({ supplier: A.supplier, credentialsSelector: sel }, loadFixture(r.testData), path.join('evidence', p.globalId), r.chain, r.attempts);
      collectBuildHeaders(steps);
      const v = verdict(r, steps, stop);
      const key = (v.rep.find(x => x.evaluable) || v.fix.find(x => x.evaluable) || {}).evidence || (ctx.hops[ctx.hops.length - 1] || {}).evidence;
      res = { ...base, verdict: v.verdict, why: v.why, pre: v.pre, fix: v.fix, rep: v.rep, chain: ctx.hops, notes: ctx.notes, keyEvidence: key ? key : null, stop };
      ctx.cleanup.forEach(c => cleanup.push({ ...c, for: p.globalId }));
    }
    if (p.recipeState !== 'approved') meta.draftRun = true;
    bugs.push(res);
    console.log(`${p.globalId}: ${res.verdict} - ${res.why}`);
    log({ type: 'retest_verdict', globalId: p.globalId, ado: p.row.AdoId, runBugIds: p.row.RunBugIds, verdict: res.verdict, why: res.why, recipe: p.recipeFile, recipeState: p.recipeState, inputs: p.inputs, chain: res.chain, assertions: { pre: res.pre, fix: res.fix, rep: res.rep }, notes: res.notes, env: ENV, host: HOST, build: meta.build });
  }
  // ---------------- regression ring
  for (const n of [...ring.values()].filter(x => x.runnable)) {
    const parentRan = bugs.some(b => n.forBugs.includes(b.globalId) && b.chain && b.chain.length);
    const fr = n.L.recipe;
    let res = { flowId: n.flowId, forBugs: n.forBugs, testData: n.testData, recipeFile: n.L.file, recipeState: n.L.state };
    const pre = pf[n.testData + '|' + n.selector];
    if (!parentRan || (pre && !pre.pass)) res = { ...res, verdict: 'Blocked (env/data)', why: !parentRan ? 'the bug(s) it guards could not run' : 'pre-flight: no offers for ' + n.testData, chain: [], notes: [] };
    else {
      console.log(`\n=== neighbour ${n.flowId} for ${n.forBugs.join(', ')}`);
      const dir = path.join('evidence', 'neighbours', n.flowId + '__' + path.basename(n.testData, '.json'));
      const { ctx, steps, stop } = await runWithAttempts({ supplier: A.supplier, credentialsSelector: n.selector }, loadFixture(n.testData), dir, fr.chain, fr.attempts, n.stepOptions);
      collectBuildHeaders(steps);
      const v = flowVerdict(fr, steps, stop);
      res = { ...res, verdict: v.verdict, why: v.why, pre: v.pre, fix: v.fix, chain: ctx.hops, notes: ctx.notes, keyEvidence: (ctx.hops[ctx.hops.length - 1] || {}).evidence };
      ctx.cleanup.forEach(c => cleanup.push({ ...c, for: n.flowId }));
    }
    neighbours.push(res);
    console.log(`${n.flowId}: ${res.verdict} - ${res.why}`);
    log({ type: 'neighbour_verdict', flowId: n.flowId, forBugs: n.forBugs, testData: n.testData, verdict: res.verdict, why: res.why, chain: res.chain, assertions: { pre: res.pre, fix: res.fix } });
  }
  cleanup.forEach(c => log({ type: 'cleanup', ...c }));
  // keyEvidence paths are relative to the report folder
  // ---------------- registry update
  const date = new Date().toISOString().slice(0, 10);
  const lastVerified = `${date}, ${ENV}, build ${meta.build || 'not given'}, ${slug}`;
  if (!A['no-registry-update']) {
    const all = REG.load();
    for (const b of bugs) {
      if (b.recipeState !== 'approved') { b.statusTo = b.statusFrom; b.registryNote = 'draft recipe - registry not updated'; continue; }
      const row = all.find(x => x.GlobalId === b.globalId);
      const from = row.Status;
      let to = from;
      if (b.verdict === 'Fixed') to = ['Medium', 'Low'].includes(row.Severity) ? 'Fixed-Verified' : 'Fixed-Pending-Signoff';
      else if (b.verdict === 'Still reproduces') { to = 'Still-Reproduces'; row.Env = REG.addListValue(row.Env, ENV); }
      else if (b.verdict === 'Blocked (env/data)') to = 'Blocked';
      row.Status = to; row.LastVerdict = b.verdict; row.LastVerified = lastVerified;
      if (!row.ReproRecipe && b.recipeFile) row.ReproRecipe = b.recipeFile;
      b.statusTo = to;
      REG.history({ type: 'retest_verdict', globalId: b.globalId, verdict: b.verdict, statusFrom: from, statusTo: to, slug, env: ENV, host: HOST, build: meta.build || null, report: relOut(path.join(OUT, 'RC_Retest_Report.md')) });
    }
    REG.save(all);
  } else bugs.forEach(b => { b.statusTo = b.statusFrom; });
  meta.ended = new Date().toISOString();
  const counts = {}; bugs.forEach(b => counts[b.verdict] = (counts[b.verdict] || 0) + 1);
  log({ type: 'run_end', counts, neighbours: neighbours.map(n => ({ flowId: n.flowId, verdict: n.verdict })), cleanup: cleanup.length, buildHeaders: meta.buildHeaders });
  const unresolvedAll = unresolved.concat(plan.filter(p => !p.runnable).map(p => ({ input: p.globalId + ' (' + p.inputs.join('; ') + ')', reason: p.reason })));
  fs.writeFileSync(path.join(OUT, 'RC_Retest_Report.md'), render({ meta, bugs, neighbours, unresolved: unresolvedAll, cleanup }));
  console.log('\nReport: ' + relOut(path.join(OUT, 'RC_Retest_Report.md')));
  console.log(JSON.stringify(counts));
})().catch(e => { console.error('FATAL', e.stack); log({ type: 'run_end', status: 'crashed', error: e.message }); process.exit(1); });
