// Round 4 diagnostic: does CancelAfterHold validate bookingToken? Own hold, cancelled at the end.
process.env.SLUG = 'probe'; process.env.PREFER_CARRIER = 'MS';
const G = require('./gl'); const F = require('./gchain'); const { bookFlow } = require('./g7'); const { short, errTxt } = G;
(async () => {
  const ctx = { id: 'PROBE10', hops: [] };
  const o = await bookFlow(ctx, { legs: [['CAI', 'JED', 30]], types: ['ADT'], enrich: {}, hold: true, last: 'Tokenprobe', seed: 40 });
  if (!o.booking) return console.log('no hold', o.failedAt, o.why);
  const B = o.booking; console.log('hold', B.gdsPNR, 'tokenLen', (B.bookingToken || '').length);
  for (const [label, tok] of [['invalid text', 'INVALID-TOKEN'], ['empty string', ''], ['token of a different format (base64 of "x")', 'eA==']]) {
    const h = await F.cancelHold(ctx, { ...B, bookingToken: tok }, {}); console.log(label.padEnd(44), h.status, h.status === 200 ? JSON.stringify({ c: h.json.cancelled, m: h.json.message }) : short(errTxt(h), 160));
    if (h.status === 200) { console.log('hold was cancelled by an invalid token; stopping'); const r = await F.retrieve(ctx, B, { surName: 'Tokenprobe' }); console.log('retrieve', r.status, r.json && r.json.bookingStatus || short(errTxt(r), 100)); return; }
  }
  const r0 = await F.retrieve(ctx, B, { surName: 'Tokenprobe' }); console.log('retrieve before proper cancel', r0.status, r0.json && r0.json.bookingStatus);
  const c = await F.cancelHold(ctx, B, {}); console.log('proper cancel', c.status, JSON.stringify({ c: c.json && c.json.cancelled, m: c.json && c.json.message }));
})();
