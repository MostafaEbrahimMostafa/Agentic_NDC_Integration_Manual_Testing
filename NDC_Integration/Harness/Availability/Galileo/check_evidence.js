// Sanity check of every bug evidence call: resolves it like make_bugs/make_chains and prints status, flight(s) and any label/status mismatch.
const fs = require('fs'), path = require('path');
const BUGS = require(process.env.BUGS || './bugs_gl');
const load = d => { const a = []; try { for (const f of fs.readdirSync(d)) { try { a.push(JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'))); } catch (e) { } } } catch (e) { } a.sort((x, y) => (x.started_at < y.started_at ? -1 : x.started_at > y.started_at ? 1 : 0)); return a; };
const raw4 = load(path.join(__dirname, 'out', 'raw')), raw3 = load(path.join(__dirname, 'out', 'round3', 'raw'));
const flights = j => { try { return Object.values(j.flightSegments || {}).map(s => s.marketingCarrierCode + s.marketingFlightNumber).slice(0, 3).join('+'); } catch (e) { return ''; } };
let bad = 0;
for (const b of BUGS) for (const c of b.calls) {
  const f = r => r.tc === c.tc && (c.exact ? r.step === c.step : r.step.includes(c.step)) && (!c.has || JSON.stringify(r.response || '').includes(c.has));
  let src = 'R4', m = raw4.filter(f); if (!m.length) { src = 'R3'; m = raw3.filter(f); } const r = !m.length ? null : (c.nth === 'first' ? m[0] : m[m.length - 1]);
  if (!r) { console.log(b.id, c.label, 'NO RECORD'); bad++; continue; }
  const sm = /_(\d{3})(_|$)/.exec(c.label); const mism = sm && +sm[1] !== r.status ? ' <-- LABEL/STATUS MISMATCH' : ''; if (mism) bad++;
  console.log(b.id.padEnd(7), src, String(r.status).padEnd(4), c.label.padEnd(44), flights(r.response), mism);
}
console.log('problems', bad);
