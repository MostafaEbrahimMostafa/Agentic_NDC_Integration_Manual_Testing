// Creates two Held bookings now so hold-expiry tests (Hold window ~75 min) can run later. Not test cases; their hops are attached as preconditions by the expiry TCs.
const F = require('./flow'); const fs = require('fs'), path = require('path'); const EXPF = path.join(__dirname, 'out', 'fixtures_expiry.json');
(async () => {
  const out = fs.existsSync(EXPF) ? JSON.parse(fs.readFileSync(EXPF)) : [];
  for (let i = 0; i < 3; i++) {
    if (out[i] && out[i].ok) continue;
    const r = await F.runFlow({ id: 'FIXTURE-EXPIRY-' + (i + 1), routes: [['SHJ', 'COK', '2026-12-' + ['20', '12', '27'][i]]], types: ['ADT'], hold: true, seed: 3 + i });
    const hold = r.ctx.hops.find(h => h.endpoint === 'Hold');
    out[i] = ({ ok: r.ok, failedAt: r.failedAt, booking: r.booking, holdExp: r.holdExp, heldAt: hold && hold.ended_at, hopRecs: r.ctx.hops.map(h => ({ endpoint: h.endpoint, status: h.status, started_at: h.started_at, ended_at: h.ended_at, ms: h.ms, rec: h.rec })) });
    console.log('fixture', i + 1, r.ok, r.booking && r.booking.pnr, r.holdExp);
  }
  fs.writeFileSync(EXPF, JSON.stringify(out));
})();
