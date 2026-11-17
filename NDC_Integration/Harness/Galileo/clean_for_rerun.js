// Removes the stage-2 lines (bug reporting, report generation, run_end, defect findings) from the Round 4 log so stage1 -> make_bugs -> stage2 can be run again without duplicates.
const fs = require('fs'), path = require('path'); const slug = fs.readFileSync(path.join(__dirname, 'slug.txt'), 'utf8').trim(); const f = path.resolve(__dirname, '../../Artifacts/Logs', slug + '.jsonl');
const L = fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(JSON.parse); const n0 = L.length;
const K = L.filter(x => !(x.type === 'run_end' || (x.type === 'phase' && ['Bug Reporting', 'Report Generation'].includes(x.name)) || (x.type === 'reporting_op' && /Bug Report Generation|Final HTML Report Generation|Time Breakdown Report Generation/.test(x.operation)) || (x.type === 'finding' && x.kind === 'defect')));
fs.writeFileSync(f, K.map(x => JSON.stringify(x)).join('\n') + '\n'); console.log('lines', n0, '->', K.length);
