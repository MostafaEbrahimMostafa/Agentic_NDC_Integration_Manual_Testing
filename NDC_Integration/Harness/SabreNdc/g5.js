// Group 5 (Round 3 additions): TC-AVAIL-EDGE-01..43 — Availability first-page edge cases
const G = require('./gl');
const { tc, av, req, baseBody, leg, d, clone, PAX, AV, SUPB, ODS, std4xx, errTxt, envOf, leakOf, credScan, short, tokenless, fs, path, now, sleep, BASE, call, H } = G;
const jn = j => ODS(j).reduce((n, o) => n + (o.journeys || []).length, 0);
const day = n => d(n).slice(0, 10);
const bodyWith = (over) => baseBody(over);
const withDate = v => baseBody({ searchCriteria: [{ origin: 'CAI', destination: 'JED', date: v }] });
const withPax = p => baseBody({ passengers: p });
const withLeg0 = o => baseBody({ searchCriteria: [{ origin: 'CAI', destination: 'JED', date: d(30), ...o }] });
// judges
const judgeOk = (h, extra) => { if (h.status === 200 && h.json) { const x = extra && extra(h); return { ok: !x, note: `HTTP 200, ${jn(h.json)} journeys${x ? ' — ' + x : ''}` }; } const s = std4xx(h); return { ok: s.ok, note: short(errTxt(h), 150) + (s.ok ? '' : ' — PROBLEM: ' + s.problems.join('; ')) }; };
const judge4 = h => { const s = std4xx(h); return { ok: s.ok, note: h.status === 200 ? `HTTP 200 accepted (${h.response_summary ? short(h.response_summary, 110) : ''})` : short(errTxt(h), 150) + (s.ok ? '' : ' — PROBLEM: ' + s.problems.join('; ')) }; };
// protocol-level rejection: any 4xx without a leak (framework answers need not use the app envelope)
const judgeProto = h => { const lk = leakOf(h); const is4 = h.status >= 400 && h.status < 500; if (h.status === 200 && h.json) return { ok: true, note: `HTTP 200, ${jn(h.json)} journeys (accepted)` }; return { ok: is4 && !lk.raw && !lk.net, note: `HTTP ${h.status}${h.json ? ' ' + short(tokenless(JSON.stringify(h.json)), 120) : ' ' + short(tokenless(h.text || ''), 80)}${is4 && !lk.raw && !lk.net ? '' : ' — PROBLEM: ' + (is4 ? 'leak' : 'not a 4xx')}` }; };
async function sweep(ctx, items, send, judge) {
  const out = []; for (const it of items) { const h = await send(ctx, it); const j = judge(h, it); out.push({ label: it.label, ...j, h }); }
  const bad = out.filter(o => !o.ok);
  return { v: bad.length ? 'FAIL' : 'PASS', actual: out.map(o => `[${o.label}] ${o.ok ? 'ok' : 'PROBLEM'}: ${o.note}`).join(' | '), out };
}
const sendBody = (ctx, it) => av(ctx, it.label, it.body, it.opts);
const raw = (it, s) => ({ ...it, opts: { raw: s, ...(it.opts || {}) } });
const dd = h => { const o = ODS(h.json)[0]; return o ? String(o.departureDate).slice(0, 10) : '?'; };
const BASEJSON = () => JSON.stringify(baseBody());

module.exports = async function (S = {}) {
  await tc('TC-AVAIL-EDGE-01', async ctx => {
    const r = await sweep(ctx, [90, 180, 330, 364].map(n => ({ label: '+' + n, body: baseBody({ searchCriteria: [leg('CAI', 'JED', n)] }) })), sendBody, h => judgeOk(h));
    const withInv = r.out.filter(o => o.h.status === 200 && jn(o.h.json) > 0).map(o => o.label); r.unknown = ['Availability horizon for CAI-JED: inventory returned for ' + (withInv.join(', ') || 'none of +90/+180/+330/+364') + '.'];
    return r;
  });
  await tc('TC-AVAIL-EDGE-02', async ctx => {
    const D = day(30); return sweep(ctx, [{ label: 'T23:59:59Z', v: D + 'T23:59:59Z' }, { label: '+02:00', v: D + 'T00:00:00+02:00' }, { label: '-05:00', v: D + 'T00:00:00-05:00' }].map(x => ({ ...x, body: withDate(x.v) })), sendBody, (h, it) => judgeOk(h, h2 => dd(h2) === D ? null : `searched ${dd(h2)} instead of ${D}`));
  });
  await tc('TC-AVAIL-EDGE-03', async ctx => sweep(ctx, ['2026-02-30T00:00:00Z', '2026-13-01T00:00:00Z', '2026-00-10T00:00:00Z', '0000-00-00T00:00:00Z'].map(v => ({ label: v.slice(0, 10), body: withDate(v) })), sendBody, judge4));
  await tc('TC-AVAIL-EDGE-04', async ctx => {
    const t = new Date(Date.now() + 30 * 864e5), p2 = n => String(n).padStart(2, '0'); const Y = t.getUTCFullYear(), M = t.getUTCMonth() + 1, Dn = t.getUTCDate(); const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][M - 1];
    const items = [{ label: 'DD/MM/YYYY', v: `${p2(Dn)}/${p2(M)}/${Y}`, want: day(30) }, { label: 'YYYYMMDD', v: `${Y}${p2(M)}${p2(Dn)}`, want: day(30) }, { label: 'Mon DD YYYY', v: `${mon} ${Dn} ${Y}`, want: day(30) }, { label: 'epoch number', v: 1800000000, want: new Date(1800000000 * 1000).toISOString().slice(0, 10) }];
    return sweep(ctx, items.map(x => ({ ...x, body: withDate(x.v) })), sendBody, (h, it) => judgeOk(h, h2 => dd(h2) === it.want ? null : `accepted but searched ${dd(h2)} instead of ${it.want}`));
  });
  await tc('TC-AVAIL-EDGE-05', async ctx => sweep(ctx, [[null, 'null'], ['', 'empty string'], ['   ', 'whitespace'], [0, 'number 0']].map(([v, l]) => ({ label: l, body: withDate(v) })), sendBody, judge4));
  await tc('TC-AVAIL-EDGE-06', async ctx => sweep(ctx, ['9999-12-31T00:00:00Z', '0001-01-01T00:00:00Z'].map(v => ({ label: v.slice(0, 10), body: withDate(v) })), sendBody, judge4));
  await tc('TC-AVAIL-EDGE-07', async ctx => {
    const r = await sweep(ctx, [{ label: '9 ADT', body: withPax([{ passengerTypeCode: 'ADT', count: 9 }]), n: 9 }, { label: '10 ADT', body: withPax([{ passengerTypeCode: 'ADT', count: 10 }]), n: 10 }], sendBody, (h, it) => it.n === 9 ? judgeOk(h) : { ...judge4(h), ok: judge4(h).ok && /1 and 9|between 1/i.test(JSON.stringify(h.json || '')) });
    return r;
  });
  await tc('TC-AVAIL-EDGE-08', async ctx => sweep(ctx, [{ label: '6 ADT + 4 CHD', body: withPax([{ passengerTypeCode: 'ADT', count: 6 }, { passengerTypeCode: 'CHD', count: 4 }]) }], sendBody, h => judgeOk(h)).then(r => { r.unknown = ['Aggregate party of 10 (6 ADT + 4 CHD): ' + r.out[0].note + '.']; return r; }));
  await tc('TC-AVAIL-EDGE-09', async ctx => sweep(ctx, [{ label: '1 ADT + 2 INF', body: withPax([{ passengerTypeCode: 'ADT', count: 1 }, { passengerTypeCode: 'INF', count: 2 }]) }], sendBody, h => judgeOk(h)).then(r => { r.unknown = ['Infants exceeding adults (1 ADT + 2 INF) on Availability: ' + r.out[0].note + '.']; return r; }));
  await tc('TC-AVAIL-EDGE-10', async ctx => sweep(ctx, [{ label: 'INF only', body: withPax([{ passengerTypeCode: 'INF', count: 1 }]) }, { label: 'CHD only', body: withPax([{ passengerTypeCode: 'CHD', count: 2 }]) }], sendBody, h => judgeOk(h)).then(r => { r.unknown = ['Parties without an adult on Availability: ' + r.out.map(o => `${o.label} -> ${o.note}`).join('; ') + '.']; return r; }));
  await tc('TC-AVAIL-EDGE-11', async ctx => sweep(ctx, ['adt', 'Adt', ' ADT'].map(c => ({ label: JSON.stringify(c), body: withPax([{ passengerTypeCode: c, count: 2 }]) })), sendBody, h => judgeOk(h)));
  await tc('TC-AVAIL-EDGE-12', async ctx => sweep(ctx, [{ label: 'ADT 1 + ADT 1', body: withPax([{ passengerTypeCode: 'ADT', count: 1 }, { passengerTypeCode: 'ADT', count: 1 }]) }], sendBody, h => judgeOk(h)));
  await tc('TC-AVAIL-EDGE-13', async ctx => sweep(ctx, [[1.5, '1.5'], [2147483648, '2147483648'], [null, 'null'], ['', 'empty string']].map(([v, l]) => ({ label: l, body: withPax([{ passengerTypeCode: 'ADT', count: v }]) })), sendBody, judge4));
  await tc('TC-AVAIL-EDGE-14', async ctx => sweep(ctx, [[[null], '[null]'], [{}, '{}'], ['ADT', '"ADT"'], [[{}], '[{}]']].map(([v, l]) => ({ label: l, body: withPax(v) })), sendBody, judge4));
  await tc('TC-AVAIL-EDGE-15', async ctx => sweep(ctx, ['YTH', 'SRC', 'STU', 'CNN'].map(c => ({ label: c, body: withPax([{ passengerTypeCode: 'ADT', count: 1 }, { passengerTypeCode: c, count: 1 }]) })), sendBody, h => judgeOk(h)).then(r => { r.unknown = ['Other passenger codes on Availability (with 1 ADT): ' + r.out.map(o => `${o.label} -> ${o.note}`).join('; ') + '.']; return r; }));
  await tc('TC-AVAIL-EDGE-16', async ctx => sweep(ctx, [' CAI ', 'Cai'].map(c => ({ label: JSON.stringify(c), body: withLeg0({ origin: c }) })), sendBody, h => judgeOk(h, h2 => { const o = ODS(h2.json)[0]; return o && o.origin === 'CAI' ? null : `origin echoed as ${JSON.stringify(o && o.origin)}`; })));
  await tc('TC-AVAIL-EDGE-17', async ctx => sweep(ctx, ['C1I', '123', 'C-I'].map(c => ({ label: c, body: withLeg0({ origin: c }) })), sendBody, judge4));
  await tc('TC-AVAIL-EDGE-18', async ctx => sweep(ctx, ['LON', 'NYC', 'PAR'].map(c => ({ label: 'CAI-' + c, body: withLeg0({ destination: c }) })), sendBody, h => judgeOk(h)).then(r => { r.unknown = ['Metropolitan city codes as destination: ' + r.out.map(o => `${o.label} -> ${o.note}`).join('; ') + '.']; return r; }));
  await tc('TC-AVAIL-EDGE-19', async ctx => sweep(ctx, [[null, 'null'], ['', 'empty'], ['   ', 'blank']].map(([v, l]) => ({ label: l, body: withLeg0({ origin: v }) })), sendBody, judge4));
  await tc('TC-AVAIL-EDGE-20', async ctx => sweep(ctx, [{ label: 'origin Arabic', body: withLeg0({ origin: 'كايرو' }) }, { label: 'origin ÇAI', body: withLeg0({ origin: 'ÇAI' }) }, { label: 'supplier emoji', body: baseBody({ supplier: 'SabreNdc😀' }) }, { label: 'selector RTL mark', body: baseBody({ credentialsSelector: 'EGY‮' }) }], sendBody, judge4));
  await tc('TC-AVAIL-EDGE-21', async ctx => sweep(ctx, [{ label: 'CAI-JED / DXB-CAI', body: baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('DXB', 'CAI', 37)] }) }], sendBody, h => judgeOk(h, h2 => { const o = ODS(h2.json); return o.length === 2 && o[0].origin === 'CAI' && o[0].destination === 'JED' && o[1].origin === 'DXB' && o[1].destination === 'CAI' ? null : 'originDestinations do not match the legs'; })));
  await tc('TC-AVAIL-EDGE-22', async ctx => sweep(ctx, [{ label: 'CAI-JED twice', body: baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('CAI', 'JED', 30)] }) }], sendBody, h => judgeOk(h)));
  await tc('TC-AVAIL-EDGE-23', async ctx => sweep(ctx, [{ label: 'RT return +360', body: baseBody({ searchCriteria: [leg('CAI', 'JED', 30), leg('JED', 'CAI', 360)] }) }], sendBody, h => judgeOk(h)));
  await tc('TC-AVAIL-EDGE-24', async ctx => sweep(ctx, [{ label: 'text/plain', opts: { raw: BASEJSON(), headers: { 'Content-Type': 'text/plain' } } }, { label: 'x-www-form-urlencoded', opts: { raw: BASEJSON(), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } }, { label: 'no Content-Type', opts: { raw: BASEJSON(), headers: { 'Content-Type': null } } }], (ctx2, it) => av(ctx2, it.label, null, it.opts), judgeProto));
  await tc('TC-AVAIL-EDGE-25', async ctx => sweep(ctx, [['', 'empty body'], ['null', 'null'], ['[]', '[]'], ['"x"', '"x"'], ['{}', '{}']].map(([r, l]) => ({ label: l, opts: { raw: r } })), (ctx2, it) => av(ctx2, it.label, null, it.opts), judge4));
  await tc('TC-AVAIL-EDGE-26', async ctx => sweep(ctx, [{ label: 'extra fields', opts: { raw: BASEJSON().replace(/}$/, ',"$type":"System.Object","__proto__":{"x":1},"constructor":{"x":1},"unknown":"zzzReflectMe"}') } }], (c2, it) => av(c2, it.label, null, it.opts), (h) => { const refl = /zzzReflectMe/.test(h.text || ''); const j = judgeOk(h); return { ok: j.ok && !refl, note: j.note + (refl ? ' — PROBLEM: extra value reflected' : '') }; }));
  await tc('TC-AVAIL-EDGE-27', async ctx => { const t0 = Date.now(); const r = await sweep(ctx, [{ label: '2 MB padding', opts: { raw: JSON.stringify({ ...baseBody(), padding: 'A'.repeat(2000000) }) } }], (c2, it) => av(c2, it.label, null, it.opts), judgeProto); r.actual += ` (${Date.now() - t0} ms)`; return r; });
  await tc('TC-AVAIL-EDGE-28', async ctx => { const j = BASEJSON(); return sweep(ctx, [{ label: 'trailing comma', r: j.replace(/\}$/, ',}') }, { label: 'comment', r: '// c\n' + j }, { label: 'single quotes', r: j.replace(/"/g, "'") }, { label: 'UTF-8 BOM', r: '﻿' + j }].map(x => ({ label: x.label, opts: { raw: x.r } })), (c2, it) => av(c2, it.label, null, it.opts), (h, it) => it.label === 'UTF-8 BOM' ? judgeOk(h) : judge4(h)); });
  await tc('TC-AVAIL-EDGE-29', async ctx => sweep(ctx, [{ label: 'supplier "SabreNdc "', body: baseBody({ supplier: 'SabreNdc ' }) }, { label: 'supplier " SabreNdc"', body: baseBody({ supplier: ' SabreNdc' }) }, { label: 'selector "egy"', body: baseBody({ credentialsSelector: 'egy' }) }, { label: 'selector " EGY "', body: baseBody({ credentialsSelector: ' EGY ' }) }], sendBody, h => judgeOk(h)));
  await tc('TC-AVAIL-EDGE-30', async ctx => sweep(ctx, [['"false"', 'false'], ['0', 0], ['1', 1], ['null', null]].map(([l, v]) => ({ label: 'isDebug=' + l, body: baseBody({ isDebug: v === 'false' ? 'false' : v }) })), sendBody, h => judgeOk(h, h2 => credScan(h2).hasRaw ? 'supplier payload present while isDebug is not true' : null)));
  await tc('TC-AVAIL-EDGE-31', async ctx => {
    const b = JSON.stringify(baseBody()); const rest = b.replace(/^\{"supplier":"SabreNdc",/, ''); if (rest === b) return { v: 'BLOCKED', actual: 'Could not build the duplicate-key body.' };
    const r = await sweep(ctx, [{ label: 'SabreNdc then Galilio', r: '{"supplier":"SabreNdc","supplier":"Galilio",' + rest }, { label: 'Galilio then SabreNdc', r: '{"supplier":"Galilio","supplier":"SabreNdc",' + rest }].map(x => ({ label: x.label, opts: { raw: x.r } })), (c2, it) => av(c2, it.label, null, it.opts), h => judgeOk(h));
    r.unknown = ['Duplicate JSON key supplier: ' + r.out.map(o => `${o.label} -> ${o.h.status === 200 ? 'first value won (HTTP 200)' : 'last value won / rejected (HTTP ' + o.h.status + ')'}`).join('; ') + '.']; return r;
  });
  // other HTTP methods / URL variants / Accept / headers use their own senders
  const sendM = async (ctx, label, method, p, headers) => {
    const started_at = now(), t0 = Date.now(); let status = 0, text = '', rh = {}; const hdr = { ...H, ...(headers || {}) };
    try { const r = await fetch(BASE + p, { method, headers: hdr, body: ['GET', 'HEAD'].includes(method) ? undefined : BASEJSON() }); status = r.status; text = await r.text(); r.headers.forEach((v, k) => rh[k] = v); } catch (e) { text = 'FETCH_ERROR ' + e.message; }
    let json = null; try { json = JSON.parse(text); } catch { } const ended_at = now(); const rq = { ...hdr, 'x-api-key': '[REDACTED]' };
    const h = { endpoint: 'Availability', status, ms: Date.now() - t0, json, text, started_at, ended_at, label, request_summary: `${method} /${p} — ${label}`, response_summary: `${status} — ${short(tokenless(text || '(empty body)'), 120)}`, request_full: { method, url: BASE + p, headers: rq, body: ['GET', 'HEAD'].includes(method) ? null : '(BASE body)' }, response_full: { status, headers: rh, body: json || text.slice(0, 400) } };
    ctx.hops.push(h); return h;
  };
  await tc('TC-AVAIL-EDGE-32', async ctx => sweep(ctx, ['PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].map(m => ({ label: m })), (c2, it) => sendM(c2, it.label, it.label, AV), h => ({ ok: h.status >= 400 && h.status < 500, note: `HTTP ${h.status}${h.text ? ' ' + short(tokenless(h.text), 80) : ''}` })));
  await tc('TC-AVAIL-EDGE-33', async ctx => sweep(ctx, [{ label: 'trailing slash', p: AV + '/' }, { label: 'lower-case path', p: 'api/v2/flightsearch/availability' }, { label: 'double slash', p: 'api//V2/FlightSearch/Availability' }, { label: '?debug=true', p: AV + '?debug=true' }], (c2, it) => sendM(c2, it.label, 'POST', it.p), (h, it) => ({ ok: h.status < 500 && !(it.label === '?debug=true' && credScan(h).hasRaw), note: `HTTP ${h.status}${h.json && h.json.availabilityId ? ' (served)' : ''}` })));
  await tc('TC-AVAIL-EDGE-34', async ctx => sweep(ctx, [{ label: 'Accept application/xml', a: 'application/xml' }, { label: 'Accept text/html', a: 'text/html' }], (c2, it) => av(c2, it.label, baseBody(), { headers: { Accept: it.a } }), h => ({ ok: h.status < 500, note: `HTTP ${h.status}, Content-Type ${((h.response_full || {}).headers || {})['content-type'] || '?'}` })));
  await tc('TC-AVAIL-EDGE-35', async ctx => {
    const h = await av(ctx, 'Availability BASE (header inspection)', baseBody()); const hd = (h.response_full || {}).headers || {}; const bad = ['x-powered-by', 'x-aspnet-version', 'x-aspnetmvc-version'].filter(k => hd[k] !== undefined); const keep = ['server', 'access-control-allow-origin', 'strict-transport-security', 'x-content-type-options', 'content-type', 'cache-control'].map(k => `${k}: ${hd[k] === undefined ? '(absent)' : hd[k]}`);
    return { v: bad.length ? 'FAIL' : 'PASS', actual: `HTTP ${h.status}. Disclosing headers present: ${bad.join(', ') || 'none'}. Recorded: ${keep.join('; ')}.`, unknown: ['Availability response headers (baseline): ' + keep.join('; ') + '.'] };
  });
  await tc('TC-AVAIL-EDGE-36', async ctx => {
    const r = await sweep(ctx, [['CAI', 'JED'], ['JED', 'CAI'], ['CAI', 'DOH']].map(([o, dst]) => ({ label: `${o}-${dst}`, body: baseBody({ searchCriteria: [leg(o, dst, 30)] }) })), sendBody, h => ({ ok: h.status === 200 && h.ms <= 20000, note: `HTTP ${h.status} in ${h.ms} ms` })); return r;
  });
  await tc('TC-AVAIL-EDGE-37', async ctx => {
    const hs = await Promise.all([1, 2, 3].map(i => av(ctx, 'parallel #' + i, baseBody()))); const ids = hs.map(h => h.json && h.json.availabilityId), rs = hs.map(h => h.json && h.json.responseId), counts = hs.map(h => h.json && h.json.originDestinations ? jn(h.json) : -1);
    const all200 = hs.every(h => h.status === 200), ok200 = hs.filter(h => h.status === 200);
    const idsOk = ok200.map(h => h.json.availabilityId), rsOk = ok200.map(h => h.json.responseId), distinct = new Set(idsOk).size === idsOk.length && new Set(rsOk).size === rsOk.length, eq = new Set(ok200.map(h => jn(h.json))).size <= 1;
    const clean = hs.every(h => h.status === 200 || std4xx(h).ok);
    return { v: clean && distinct && eq ? 'PASS' : 'FAIL', actual: `Statuses ${hs.map(h => h.status)}, times ${hs.map(h => h.ms + ' ms')}, distinct availabilityIds ${new Set(ids.filter(Boolean)).size}/${ids.filter(Boolean).length}, distinct responseIds ${new Set(rs.filter(Boolean)).size}/${rs.filter(Boolean).length}, journeys per call [${counts}]${!distinct ? ' — PROBLEM: ids shared between parallel calls' : ''}${!eq ? ' — PROBLEM: calls returned different numbers of journeys' : ''}${!all200 ? ' — not all calls returned 200: ' + hs.filter(h => h.status !== 200).map(h => short(errTxt(h), 120)).join('; ') : ''}.` };
  });
  // ----- data quality -----
  const pages = {}; const page = async (ctx, o, dst, n) => { const k = `${o}-${dst}+${n}`; if (!pages[k]) pages[k] = await av(ctx, `Availability ${o}-${dst} +${n}`, baseBody({ searchCriteria: [leg(o, dst, n)] })); else ctx.hops.push(pages[k]); return pages[k]; };
  const minutes = s => Date.parse(String(s).slice(0, 19) + 'Z') / 60000;
  const journeysOf = j => ODS(j).flatMap(o => (o.journeys || []).map(x => ({ od: o, jn: x })));
  await tc('TC-AVAIL-EDGE-38', async ctx => {
    const probs = []; let nJ = 0, nS = 0, nC = 0;
    for (const [o, dst] of [['CAI', 'JED'], ['JED', 'CAI'], ['CAI', 'MED']]) {
      const h = await page(ctx, o, dst, 30); if (h.status !== 200) { probs.push(`${o}-${dst}: ${errTxt(h)}`); continue; } const j = h.json;
      for (const { od, jn: x } of journeysOf(j)) { nJ++; const segs = x.segments.map(s => ({ ref: s.segmentRefId, f: j.flightSegments[s.segmentRefId] })); const tag = `${o}-${dst} ${x.journeyRefId}`;
        if (segs.some(s => !s.f)) { probs.push(`${tag}: segment missing in flightSegments`); continue; } nS += segs.length;
        if (segs[0].f.origin !== od.origin) probs.push(`${tag}: starts at ${segs[0].f.origin}, leg origin ${od.origin}`); if (segs[segs.length - 1].f.destination !== od.destination) probs.push(`${tag}: ends at ${segs[segs.length - 1].f.destination}, leg destination ${od.destination}`);
        const jd = j.journeys[x.journeyRefId]; if (jd && jd.numberOfStops !== segs.length - 1) probs.push(`${tag}: numberOfStops ${jd.numberOfStops} with ${segs.length} segments`);
        segs.forEach((s, i) => { if (!(s.f.flightTime > 0)) probs.push(`${tag} seg ${i}: flightTime ${s.f.flightTime}`); if (i > 0) { nC++; const p = segs[i - 1].f; if (p.destination !== s.f.origin) probs.push(`${tag}: connection ${p.destination} -> ${s.f.origin} not contiguous`); const lay = minutes(s.f.departureDateTime) - minutes(p.arrivalDateTime); if (lay < 20 || lay > 1440) probs.push(`${tag}: layover ${lay} min at ${s.f.origin}`); } });
      }
    }
    return { v: probs.length ? 'FAIL' : 'PASS', actual: `Checked ${nJ} journeys / ${nS} segments / ${nC} connections on CAI-JED, JED-CAI, CAI-MED (+30). ${probs.length ? probs.length + ' problem(s): ' + short(probs.slice(0, 8).join(' | '), 600) : 'Segments contiguous, flightTime positive, layovers 20 min - 24 h, numberOfStops = segments - 1 everywhere.'}` };
  });
  await tc('TC-AVAIL-EDGE-39', async ctx => {
    const h = await page(ctx, 'CAI', 'JED', 30); if (h.status !== 200) return { v: 'FAIL', actual: errTxt(h) }; const probs = []; let n = 0; const ids = new Set(), cabins = new Set(); let minSeats = 99, maxSeats = 0;
    for (const { jn: x } of journeysOf(h.json)) for (const s of x.segments) for (const c of s.cabins || []) { cabins.add(c.cabin); for (const b of c.bookingClasses || []) { n++; if (!/^[A-Z]$/.test(b.bookingCode)) probs.push(`bookingCode ${JSON.stringify(b.bookingCode)}`); if (!Number.isInteger(b.seatsAvailable) || b.seatsAvailable < 1 || b.seatsAvailable > 9) probs.push(`seatsAvailable ${b.seatsAvailable} for ${b.bookingCode}`); else { minSeats = Math.min(minSeats, b.seatsAvailable); maxSeats = Math.max(maxSeats, b.seatsAvailable); } if (!b.bookingClassId) probs.push('empty bookingClassId'); if (ids.has(b.bookingClassId)) probs.push('duplicate bookingClassId'); ids.add(b.bookingClassId); } }
    return { v: probs.length ? 'FAIL' : 'PASS', actual: `Checked ${n} bookingClasses on CAI-JED +30; cabins [${[...cabins]}]; seatsAvailable range ${minSeats}-${maxSeats}. ${probs.length ? probs.length + ' problem(s): ' + short([...new Set(probs)].slice(0, 8).join(' | '), 400) : 'All well formed.'}` };
  });
  await tc('TC-AVAIL-EDGE-40', async ctx => {
    const h = await page(ctx, 'CAI', 'JED', 30); if (h.status !== 200) return { v: 'FAIL', actual: errTxt(h) }; const j = h.json; const keys = journeysOf(j).map(({ jn: x }) => x.segments.map(s => { const f = j.flightSegments[s.segmentRefId]; return `${f.marketingCarrierCode}${f.marketingFlightNumber}@${f.departureDateTime}`; }).join('+')); const dup = keys.filter((k, i) => keys.indexOf(k) !== i);
    const deps = journeysOf(j).map(({ jn: x }) => minutes(j.flightSegments[x.segments[0].segmentRefId].departureDateTime)); const sorted = deps.every((v, i) => i === 0 || v >= deps[i - 1]);
    return { v: dup.length ? 'FAIL' : 'PASS', actual: `${keys.length} journeys on page 1, ${dup.length} duplicate flight sequence(s)${dup.length ? ': ' + short(dup.join(', '), 200) : ''}. Sorted by departure time: ${sorted}.`, unknown: ['Page 1 journeys are ' + (sorted ? '' : 'not ') + 'sorted by departure time.'] };
  });
  await tc('TC-AVAIL-EDGE-41', async ctx => {
    const probs = []; let n = 0; for (const [o, dst] of [['CAI', 'JED'], ['JED', 'CAI']]) { const h = await page(ctx, o, dst, 30); if (h.status !== 200) { probs.push(`${o}-${dst}: ${errTxt(h)}`); continue; } for (const { od, jn: x } of journeysOf(h.json)) { n++; const f = h.json.flightSegments[x.segments[0].segmentRefId]; if (String(f.departureDateTime).slice(0, 10) !== day(30)) probs.push(`${o}-${dst} ${x.journeyRefId}: departs ${f.departureDateTime}`); if (String(od.departureDate).slice(0, 10) !== day(30)) probs.push(`${o}-${dst}: OD departureDate ${od.departureDate}`); } }
    return { v: probs.length ? 'FAIL' : 'PASS', actual: `${n} journeys checked against ${day(30)}. ${probs.length ? probs.length + ' problem(s): ' + short(probs.slice(0, 6).join(' | '), 400) : 'Every first segment departs on the requested day.'}` };
  });
  await tc('TC-AVAIL-EDGE-42', async ctx => {
    const h = await page(ctx, 'CAI', 'JED', 30); if (h.status !== 200) return { v: 'FAIL', actual: errTxt(h) }; const j = h.json; const usedJ = new Set(), usedS = new Set(); journeysOf(j).forEach(({ jn: x }) => { usedJ.add(x.journeyRefId); x.segments.forEach(s => usedS.add(s.segmentRefId)); });
    const missJ = [...usedJ].filter(k => !j.journeys[k]), missS = [...usedS].filter(k => !j.flightSegments[k]), orphJ = Object.keys(j.journeys).filter(k => !usedJ.has(k)), orphS = Object.keys(j.flightSegments).filter(k => !usedS.has(k));
    return { v: missJ.length || missS.length || orphJ.length || orphS.length ? 'FAIL' : 'PASS', actual: `Referenced journeys ${usedJ.size}, segments ${usedS.size}; dictionary journeys ${Object.keys(j.journeys).length}, flightSegments ${Object.keys(j.flightSegments).length}. Dangling refs: journeys ${missJ.length}, segments ${missS.length}; unused entries: journeys ${orphJ.length}, segments ${orphS.length}${orphS.length ? ' (' + orphS.slice(0, 5).join(', ') + ')' : ''}.` };
  });
  await tc('TC-AVAIL-EDGE-43', async ctx => {
    const h = await av(ctx, 'Availability 9 ADT', withPax([{ passengerTypeCode: 'ADT', count: 9 }])); if (h.status !== 200) { const s = std4xx(h); return { v: s.ok ? 'PASS' : 'FAIL', actual: errTxt(h) + (s.ok ? '' : ' — ' + s.problems.join('; ')) }; }
    let min = 99, below = 0, n = 0, nul = 0; journeysOf(h.json).forEach(({ jn: x }) => x.segments.forEach(s => (s.cabins || []).forEach(c => (c.bookingClasses || []).forEach(b => { n++; if (b.seatsAvailable == null) { nul++; return; } min = Math.min(min, b.seatsAvailable); if (b.seatsAvailable < 9) below++; }))));
    return { v: 'PASS', actual: `HTTP 200, ${jn(h.json)} journeys, ${n} booking classes; minimum non-null seatsAvailable ${min}; ${below} classes show fewer than 9 seats; ${nul} classes have seatsAvailable null.`, unknown: [`Availability for a 9-passenger party ${below ? 'does not filter' : 'filters'} booking classes by party size (${below} of ${n} classes show fewer than 9 seats; ${nul} have seatsAvailable null).`] };
  });
};
