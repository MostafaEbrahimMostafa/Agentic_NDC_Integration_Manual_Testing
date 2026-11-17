#!/usr/bin/env node
// Repro recipe CLI.
//   node NDC_Integration/Harness/Retest/recipe.js validate [<GlobalId|FLOW-ID> ...]   (no args = every recipe)
//   node NDC_Integration/Harness/Retest/recipe.js approve <GlobalId|FLOW-ID> --by "<name>"
// Approval stores a hash of the recipe; any later edit turns it back into "changed-after-approval",
// which the runner treats like a draft until it is approved again.
const fs = require('fs');
const path = require('path');
const RCP = require('./lib/recipe');

const argv = process.argv.slice(2);
const cmd = argv[0];
const pos = [], A = {};
for (let i = 1; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); A[k] = (i + 1 < argv.length && !argv[i + 1].startsWith('--')) ? argv[++i] : true; }
  else pos.push(argv[i]);
}
const die = m => { console.error('ERROR: ' + m); process.exit(1); };
const fileOf = id => /^FLOW-/i.test(id) ? path.join(RCP.FLOWS, id + '.json') : path.join(RCP.DIR, id + '.json');

if (cmd === 'validate') {
  const ids = pos.length ? pos : [
    ...fs.readdirSync(RCP.DIR).filter(f => /^NDC-BUG-\d+\.json$/.test(f)).map(f => f.slice(0, -5)),
    ...(fs.existsSync(RCP.FLOWS) ? fs.readdirSync(RCP.FLOWS).filter(f => f.endsWith('.json')).map(f => f.slice(0, -5)) : []),
  ];
  let bad = 0;
  for (const id of ids) {
    const L = /^FLOW-/i.test(id) ? RCP.loadFlow(id) : RCP.loadBug(id);
    if (!L.exists) { console.log(`MISSING  ${id}  ${L.file}`); bad++; continue; }
    console.log(`${L.errors.length ? 'INVALID' : 'OK     '}  ${id.padEnd(14)} ${L.state.padEnd(22)} ${L.recipe.title || ''}`);
    L.errors.forEach(e => console.log('           - ' + e));
    if (L.errors.length) bad++;
  }
  process.exit(bad ? 1 : 0);
} else if (cmd === 'approve') {
  if (!pos[0]) die('give the recipe id');
  if (!A.by) die('--by "<name>" is required: approval is a human decision');
  const f = fileOf(pos[0]);
  if (!fs.existsSync(f)) die('no recipe file ' + f);
  try { const r = RCP.approve(f, A.by); console.log(`approved ${r.id} by ${r.approved.by} on ${r.approved.date} (sha ${r.approved.sha})`); }
  catch (e) { die(e.message); }
} else die('usage: recipe.js validate [ids...] | approve <id> --by "<name>"');
