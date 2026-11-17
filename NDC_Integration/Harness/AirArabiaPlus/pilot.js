// Pilot: node pilot.js '<json spec>'  -> runs one flow, prints a compact hop-by-hop result (no secrets, no raw payloads)
const { runFlow } = require('./flow');
const C = require('./chain');
const spec = JSON.parse(process.argv[2] || '{}');
spec.id = spec.id || 'PILOT';
(async () => {
  const r = await runFlow(spec);
  for (const h of r.ctx.hops) {
    const j = h.json || {}; const extra = [];
    if (j.pnr) extra.push('pnr=' + j.pnr); if (j.bookingStatus) extra.push('status=' + j.bookingStatus); if (j.voidCapability) extra.push('void=' + j.voidCapability);
    if (j.holdExpirationDate) extra.push('holdExp=' + j.holdExpirationDate);
    if (j.selectedOffer) extra.push('total=' + JSON.stringify((j.selectedOffer.priceDetails || {}).totalAmount));
    if (h.endpoint === 'Search') extra.push('offers=' + ((j.offers || []).length));
    console.log(`#${h.hop} ${h.endpoint} ${h.status} ${h.ms}ms ${h.status !== 200 ? C.errText(h) : ''} ${extra.join(' ')}`);
  }
  console.log('OK=', r.ok, 'failedAt=', r.failedAt, r.why || '');
  console.log('checks:', r.checks.map(c => (c.pass ? 'PASS ' : 'FAIL ') + c.name + (c.pass ? '' : ' :: ' + c.detail)).join('\n        '));
  console.log('totals', JSON.stringify({ search: r.totals.search, fc: r.totals.fc, fcheck: r.totals.fcheck, book: r.totals.book, cur: r.totals.currency }), 'flags', JSON.stringify(r.flags2 || r.flags), 'sel', JSON.stringify(r.sel).slice(0, 600));
  console.log('notes', r.ctx.notes.join(' | '), 'wait_ms', r.ctx.waiting_ms);
  if (r.booking) console.log('BOOKING', JSON.stringify(r.booking));
  if (r.bookJson) console.log('bookKeys', Object.keys(r.bookJson).join(','), '| tickets', String(JSON.stringify(r.bookJson.tickets)).slice(0, 200));
})();
