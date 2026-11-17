process.env.RAW_DIR = 'raw_probe';
const C = require('./chain');
(async () => {
  const ctx = C.newCtx('RT');
  for (const [lbl, routes, types] of [
    ['RT 1ADT 12-08/12-15', [['SHJ', 'COK', '2026-12-08'], ['COK', 'SHJ', '2026-12-15']], ['ADT']],
    ['RT 2ADT 12-08/12-15', [['SHJ', 'COK', '2026-12-08'], ['COK', 'SHJ', '2026-12-15']], ['ADT', 'ADT']],
    ['RT ADT+CHD+INF 12-08/12-15', [['SHJ', 'COK', '2026-12-08'], ['COK', 'SHJ', '2026-12-15']], ['ADT', 'CHD', 'INF']],
    ['RT ADT+CHD+INF 12-12/12-20', [['SHJ', 'COK', '2026-12-12'], ['COK', 'SHJ', '2026-12-20']], ['ADT', 'CHD', 'INF']],
    ['RT 1ADT 12-12/12-20', [['SHJ', 'COK', '2026-12-12'], ['COK', 'SHJ', '2026-12-20']], ['ADT']],
    ['RTC MCT-COK 12-08 / COK-MCT 12-15 1ADT', [['MCT', 'COK', '2026-12-08'], ['COK', 'MCT', '2026-12-15']], ['ADT']],
  ]) { const S = await C.search(ctx, routes, types, { tries: 1, anyFit: true }); const o = (S.resp && S.resp.offers) || []; console.log(lbl, S.h.status, o.length, S.h.ms + 'ms', o[0] ? 'journeys/offer ' + (o[0].offerJourneys || []).length : '', S.h.status !== 200 ? C.errText(S.h) : ''); await require('./core').sleep(2500); }
})();
