// usage: node run.js <group> [ids...]   groups: g1 g2 g3 g4
const g = process.argv[2]; process.env.GROUP = g;
const only = process.argv.slice(3);
if (only.length) { const G = require('./gl'); const orig = G.tc; }
const S = {}; require('./' + g)(S).then(() => { console.log('GROUP DONE', g); process.exit(0); }).catch(e => { console.error('GROUP FAILED', e); process.exit(1); });
