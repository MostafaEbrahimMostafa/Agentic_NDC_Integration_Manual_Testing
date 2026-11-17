// patch make_bugs.js: for every evidence call, add the whole call chain that led to it (traced back through the ids each request used), full bodies from the raw store.
const fs = require('fs');
let s = fs.readFileSync('make_bugs.js', 'utf8');
if (!s.includes('traceChain')) {
  s = s.replace("const tcOf =", `// ---- chain tracing: walk back from a call through the ids (ResponseId / selectedOfferId / pnr) its request used
const T = x => Date.parse(x.started_at);
const idsOf = r => { const o = new Set(); const b = r.response; if (!b || typeof b !== 'object' || r.status !== 200) return o; ['responseId', 'offerId'].forEach(k => b[k] && o.add(b[k])); if (b.selectedOffer && b.selectedOffer.offerId) o.add(b.selectedOffer.offerId); (b.offers || []).forEach(x => x.offerId && o.add(x.offerId)); (b.upsellOffers || []).forEach(x => x.offerId && o.add(x.offerId)); return o; };
const rawSorted = raw.slice().sort((a, b) => T(a) - T(b)); const idIdx = new Map(); rawSorted.forEach(r => { r.__ids = idsOf(r); });
function prevOf(cur) {
  const rq = cur.request.body && typeof cur.request.body === 'object' ? cur.request.body : {}; const want = [rq.ResponseId, rq.responseId, rq.selectedOfferId, rq.fareConfirmResponseId].filter(Boolean);
  if (rq.pnr && rq.bookingToken) { const c = rawSorted.filter(r => T(r) < T(cur) && r.status === 200 && r.response && r.response.pnr === rq.pnr && ['Book', 'Hold', 'BookAfterHold'].includes(r.endpoint)); if (c.length) return c[c.length - 1]; }
  if (!want.length) return null;
  const rid = rq.ResponseId || rq.responseId; let c = rid ? rawSorted.filter(r => T(r) < T(cur) && r.__ids.has(rid)) : []; if (!c.length && rq.selectedOfferId) c = rawSorted.filter(r => T(r) < T(cur) && r.__ids.has(rq.selectedOfferId));
  return c.length ? c[c.length - 1] : null;
}
function traceChain(r) { const chain = [r]; let cur = r; for (let i = 0; i < 25; i++) { const p = prevOf(cur); if (!p || chain.includes(p)) break; chain.unshift(p); cur = p; } return chain; }
const tcOf =`);
  s = s.replace("const files = []; picks.forEach((p, i) => {", `// expand every evidence call into its whole chain (all endpoints, Search included), de-duplicated across picks of the same bug
  const expanded = []; const seenRaw = new Set();
  for (const p of picks) { const chain = traceChain(p.r); chain.forEach((r, k) => { if (seenRaw.has(r)) { if (r === p.r) { /* keep label of the evidence call even if already listed */ } return; } seenRaw.add(r); expanded.push({ label: r === p.r ? p.label : p.label + '__chain_step' + (k + 1) + '_' + r.endpoint, r, evidence: r === p.r }); }); }
  const files = []; expanded.forEach((p, i) => {`);
  fs.writeFileSync('make_bugs.js', s);
  console.log('patched');
} else console.log('already patched');
