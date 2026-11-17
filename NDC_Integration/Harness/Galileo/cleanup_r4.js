// Releases the Round 4 holds this run created and did not cancel itself (taken from the raw call store). Only locators listed in r4_pnr_state.json.left.
process.env.SLUG = 'probe';
const G = require('./gl'); const F = require('./gchain'); const fs = require('fs'); const { short, errTxt } = G;
const st = JSON.parse(fs.readFileSync('r4_pnr_state.json', 'utf8')); const raws = fs.readdirSync('raw').map(f => { try { return JSON.parse(fs.readFileSync('raw/' + f, 'utf8')); } catch (e) { } }).filter(Boolean);
(async () => {
  for (const loc of st.left) {
    const r = raws.find(x => x.endpoint === 'Hold' && x.status === 200 && x.response && (x.response.gdsPNR === loc || x.response.pnr === loc)); const B = { pnr: r.response.pnr, gdsPNR: r.response.gdsPNR, bookingToken: r.response.bookingToken };
    const h = await F.cancelHold({ id: 'CLEANUP', hops: [] }, B, {}); console.log(loc, h.status, h.status === 200 ? JSON.stringify({ c: h.json.cancelled, m: h.json.message }) : short(errTxt(h), 140));
  }
})();
