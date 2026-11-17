const C = require('./chain'); const F = require('./flow'); const { sleep } = require('./core');
(async () => {
  const r = await F.runFlow({ id: 'MISC', routes: [['SHJ', 'COK', '2026-12-01']], types: ['ADT'], hold: true, family: 'B' });
  console.log('flow ok', r.ok, r.failedAt, r.why || '');
  if (!r.booking) return;
  const ctx = r.ctx, B = r.booking;
  const show = (n, h) => console.log(n, h.status, C.errText(h), h.json && !h.json.ErrorCode ? Object.keys(h.json).slice(0, 12).join(',') : '');
  show('SeatAfterHold', await C.call(ctx, 'SeatAfterHold', C.P.seatAH, { ...C.pnrBody(B, { surName: 'Ibrahim' }) }));
  show('FareRules', await C.call(ctx, 'FareRules', C.P.rules, { ...require('./core').SUP, fareConfirmResponseId: r.fc.json.responseId, selectedOfferId: r.fc.json.selectedOffer.offerId }));
  show('RefundQuota(held)', await C.call(ctx, 'RefundQuota', C.P.rquota, { ...C.pnrBody(B, { surName: 'Ibrahim' }) }));
  show('ReleasePnr', await C.call(ctx, 'ReleasePnr', C.P.release, { ...C.pnrBody(B, { surName: 'Ibrahim' }) }));
  show('Retrieve after Release', await C.retrieve(ctx, B));
  console.log('holdExp', r.holdExp, 'bookHop ended', r.ctx.hops.find(h => h.endpoint === 'Hold').ended_at);
})();
