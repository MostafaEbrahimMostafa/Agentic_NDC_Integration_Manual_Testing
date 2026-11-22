#!/usr/bin/env node
// Bug Registry CLI (plan Step 3a). The registry is NDC_Integration/Artifacts/Registry/Bug_Registry.csv; every
// change is also appended to Bug_Registry_History.jsonl.
//
//   node NDC_Integration/Harness/Retest/registry.js list [--supplier S] [--status S] [--grep text]
//   node NDC_Integration/Harness/Retest/registry.js show <GlobalId|ADO|slug:BUG-NN>
//   node NDC_Integration/Harness/Retest/registry.js resolve <id> [<id> ...]
//   node NDC_Integration/Harness/Retest/registry.js add --title "..." --supplier S --env E --selector C --version V2
//          --severity High --run "<slug>:BUG-NN" [--ado 65507] [--status Open]            -> prints the new GlobalId
//   node NDC_Integration/Harness/Retest/registry.js link <GlobalId> [--run "<slug>:BUG-NN"] [--ado N] [--alt-title "..."] [--env E]
//   node NDC_Integration/Harness/Retest/registry.js set-status <GlobalId> <Status> --note "why" [--by name]
//   node NDC_Integration/Harness/Retest/registry.js signoff <GlobalId> --by "<name>"     (Fixed-Pending-Signoff -> Fixed-Verified)
const R = require('./lib/registry');
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const cmd = argv[0];
const pos = [], A = {};
for (let i = 1; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); A[k] = (i + 1 < argv.length && !argv[i + 1].startsWith('--')) ? argv[++i] : true; }
  else pos.push(argv[i]);
}
const die = m => { console.error('ERROR: ' + m); process.exit(1); };
const rows = R.load();
const short = r => `${r.GlobalId}  ${(r.AdoId || '-').padEnd(6)}  ${r.Supplier.padEnd(14)}  ${r.Status.padEnd(21)}  ${(r.Severity || '-').padEnd(8)}  ${r.Title.slice(0, 90)}`;
const resolve = id => { const x = R.resolveId(rows, id); if (!x.row) die(id + ': ' + x.error); return x.row; };

switch (cmd) {
  case 'list': {
    let r = rows;
    if (A.supplier) r = r.filter(x => x.Supplier.toLowerCase() === String(A.supplier).toLowerCase());
    if (A.status) r = r.filter(x => x.Status === A.status);
    if (A.grep) { const g = R.norm(A.grep); r = r.filter(x => R.norm(Object.values(x).join(' ')).includes(g)); }
    r.forEach(x => console.log(short(x)));
    console.log(`${r.length} row(s)`);
    break;
  }
  case 'show': { const r = resolve(pos[0]); for (const c of R.COLUMNS) console.log(c.padEnd(13) + r[c]); break; }
  case 'resolve': for (const id of pos) { const x = R.resolveId(rows, id); console.log(`${id} -> ${x.row ? x.row.GlobalId + '  ' + x.row.Title.slice(0, 80) : 'UNRESOLVED: ' + x.error}`); } break;
  case 'add': {
    for (const k of ['title', 'supplier', 'env', 'selector', 'version']) if (!A[k]) die('--' + k + ' is required');
    if (A.severity && !R.SEVERITIES.includes(A.severity)) die('--severity must be one of ' + R.SEVERITIES.filter(Boolean).join(', '));
    const status = A.status || 'Open';
    if (!R.STATUSES.includes(status)) die('--status must be one of ' + R.STATUSES.join(', '));
    if (A.ado && rows.some(r => R.list(r.AdoId).includes(String(A.ado)))) die('ADO ' + A.ado + ' already on ' + rows.find(r => R.list(r.AdoId).includes(String(A.ado))).GlobalId + ' - use link');
    if (A.run && rows.some(r => R.list(r.RunBugIds).includes(A.run))) die(A.run + ' already on ' + rows.find(r => R.list(r.RunBugIds).includes(A.run)).GlobalId);
    const gid = R.nextId(rows);
    const row = { GlobalId: gid, AdoId: A.ado ? String(A.ado) : '', Title: A.title, AltTitles: A['alt-title'] || '', Supplier: A.supplier, Env: A.env, Selector: A.selector, Version: A.version,
      Severity: A.severity || '', RunBugIds: A.run || '', ReproRecipe: fs.existsSync(path.join(R.NDC, 'Harness', 'recipes', gid + '.json')) ? 'NDC_Integration/Harness/recipes/' + gid + '.json' : '', Status: status, LastVerdict: '', LastVerified: A['last-verified'] || '' };
    rows.push(row); R.save(rows);
    R.history({ type: 'registry_add', globalId: gid, run: A.run || null, ado: A.ado || null, by: A.by || null });
    console.log(gid);
    break;
  }
  case 'link': {
    const r = resolve(pos[0]);
    if (A.run) { const other = rows.find(x => x !== r && R.list(x.RunBugIds).includes(A.run)); if (other) die(A.run + ' is already on ' + other.GlobalId); r.RunBugIds = R.addListValue(r.RunBugIds, A.run); }
    if (A.ado) r.AdoId = R.addListValue(r.AdoId, String(A.ado));
    if (A.env) r.Env = R.addListValue(r.Env, A.env);
    if (A['alt-title']) r.AltTitles = r.AltTitles ? r.AltTitles + ' | ' + A['alt-title'] : A['alt-title'];
    if (A.recipe) r.ReproRecipe = A.recipe;
    R.save(rows);
    R.history({ type: 'registry_link', globalId: r.GlobalId, run: A.run || null, ado: A.ado || null, env: A.env || null, by: A.by || null });
    console.log(short(r));
    break;
  }
  case 'set-status': {
    const r = resolve(pos[0]); const st = pos[1];
    if (!R.STATUSES.includes(st)) die('status must be one of ' + R.STATUSES.join(', '));
    if (!A.note) die('--note is required (why the status changes)');
    const from = r.Status; r.Status = st; R.save(rows);
    R.history({ type: 'registry_status', globalId: r.GlobalId, statusFrom: from, statusTo: st, note: A.note, by: A.by || null });
    console.log(short(r));
    break;
  }
  case 'signoff': {
    const r = resolve(pos[0]);
    if (!A.by) die('--by "<name>" is required: a human signs off on Fixed');
    if (r.Status !== 'Fixed-Pending-Signoff') die(r.GlobalId + ' is ' + r.Status + ', not Fixed-Pending-Signoff');
    r.Status = 'Fixed-Verified'; R.save(rows);
    R.history({ type: 'registry_signoff', globalId: r.GlobalId, statusFrom: 'Fixed-Pending-Signoff', statusTo: 'Fixed-Verified', by: A.by, note: A.note || null });
    console.log(short(r));
    break;
  }
  default: die('usage: registry.js list|show|resolve|add|link|set-status|signoff (see the header of this file)');
}
