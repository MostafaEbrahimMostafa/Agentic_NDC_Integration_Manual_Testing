// usage: node run.js <Supplier> <group>    e.g. node run.js Galileo g1   (groups live in Availability/<Supplier>/g*.js)
// Suppliers: see suppliers.js. ONLY=<id,id> limits the group to those test cases.
const path = require('path');
const S0 = require('./suppliers').fromArgv();
const g = process.argv[2]; process.env.GROUP = g;
if (!g) { console.error('usage: node run.js <Supplier> <group>'); process.exit(2); }
const S = {}; require(path.join(S0.dir, g))(S).then(() => { console.log('GROUP DONE', S0.name, g); process.exit(0); }).catch(e => { console.error('GROUP FAILED', e); process.exit(1); });
