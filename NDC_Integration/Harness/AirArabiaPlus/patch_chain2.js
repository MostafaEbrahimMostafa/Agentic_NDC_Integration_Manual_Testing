const fs = require('fs');
let s = fs.readFileSync('make_bugs.js', 'utf8');
const a = "${f.lab.replace(/_/g, ' ')}, \\`${f.url.replace(base, '/')}\\`, HTTP ${f.status}`";
if (!s.includes(a)) throw new Error('list anchor');
s = s.replace(a, "${f.ev ? '**evidence call** ' : 'chain step '}${f.ep}, \\`${f.url.replace(base, '/')}\\`, HTTP ${f.status}`");
// chronological order of the expanded calls
s = s.replace("const files = []; expanded.forEach((p, i) => {", "expanded.sort((x, y) => Date.parse(x.r.started_at) - Date.parse(y.r.started_at));\n  const files = []; expanded.forEach((p, i) => {");
fs.writeFileSync('make_bugs.js', s);
let b = fs.readFileSync('bugs.js', 'utf8');
const rep = (x, y) => { if (!b.includes(x)) throw new Error('bugs anchor ' + x.slice(0, 40)); b = b.replace(x, y); };
rep("calls: [{ label: 'Book_bundle_with_child', tc: 'OW-BUN-02', pick: h => h.endpoint === 'Book' }, { label: 'Retrieve_same_booking', tc: 'OW-BUN-02', pick: h => h.endpoint === 'Retrieve' }] },", "calls: [{ label: 'GetOfferBundles', tc: 'OW-BUN-02', pick: h => h.endpoint === 'GetOfferBundles' }, { label: 'SeatMap', tc: 'OW-BUN-02', pick: h => h.endpoint === 'SeatMap' }, { label: 'Book_bundle_with_child', tc: 'OW-BUN-02', pick: h => h.endpoint === 'Book' }, { label: 'Retrieve_same_booking', tc: 'OW-BUN-02', pick: h => h.endpoint === 'Retrieve' }] },");
rep("calls: [{ label: 'Search_10_passengers', tc: 'TC-SEARCH-BND-03', pick: h => /10 passengers/.test(h.expected || '') || /rejected/.test(h.expected || '') }] },", "calls: [{ label: 'Search_9_passengers_baseline', tc: 'TC-SEARCH-BND-03', pick: h => /baseline/.test(h.expected || '') }, { label: 'Search_10_passengers', tc: 'TC-SEARCH-BND-03', pick: h => /10 passengers/.test(h.expected || '') || /rejected/.test(h.expected || '') }] },");
fs.writeFileSync('bugs.js', b);
console.log('ok');
