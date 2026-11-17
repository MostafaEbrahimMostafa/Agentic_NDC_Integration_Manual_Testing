// Higher-level V2 helpers: chains (Search -> FareConfirm -> AddPassenger -> GetSeatMap), seat picking, response summaries.
const { call, SUP, sleep } = require('./lib');
let active = 0; const waiters = [];
const MAXC = +process.env.MAXC || 5;
async function slot(fn) { while (active >= MAXC) await new Promise(r => waiters.push(r)); active++; try { return await fn(); } finally { active--; const w = waiters.shift(); if (w) w(); } }

const amt = x => x == null ? null : (typeof x === 'object' ? x.amount : x);
const fa = (o, key, out = []) => { if (Array.isArray(o)) o.forEach(x => fa(x, key, out)); else if (o && typeof o === 'object') for (const k of Object.keys(o)) { if (k === key) out.push(o[k]); fa(o[k], key, out); } return out; };
const errSum = h => { const j = h.json; if (!j) return (h.text || '').slice(0, 140); const s = JSON.stringify(j); return s.length > 170 ? s.slice(0, 167) + '...' : s; };
const money = x => x == null ? 'n/a' : (typeof x === 'object' ? `${x.amount} ${x.currency}` : x);
const tix = j => { const t = j.tickets; if (!t) return 'none'; const a = Array.isArray(t) ? t : Object.values(t); return a.map(x => typeof x === 'object' ? (x.ticketNumber || x.number || JSON.stringify(x).slice(0, 20)) : x).join('/') || 'none'; };
function shortSeats(s) { const o = JSON.parse(JSON.stringify(s)); (function w(x) { if (x && typeof x === 'object') for (const k of Object.keys(x)) { if (k === 'cellId' && typeof x[k] === 'string') x[k] = x[k].slice(0, 18) + '..'; else w(x[k]); } })(o); return o; }

function cellsOf(sm) {
  const out = [];
  for (const [seg, d] of Object.entries(sm.seatMapDetails || {})) for (const r of d.rows || []) for (const c of r.cells || []) out.push({ seg, row: r.rowNumber, deck: r.deck, zone: r.zoneId, cat: c.cellCategory, col: c.column, d: c.cellDetails, raw: c });
  return out;
}
const isExit = c => c.d && /EXIT_ROW_SEAT/.test(c.d.description || '');
const isBass = c => c.d && /BASSINET/.test(c.d.description || '');
function allowList(sm, pax) { const p = sm.passengersDetails && sm.passengersDetails[pax]; const a = p && p.passengersSeatMapAvailability; const out = {}; if (a) for (const [seg, decks] of Object.entries(a)) out[seg] = [].concat(...Object.values(decks)); return out; }
function pickSeat(sm, { code, segIdx = 0, avoid = [], notExit = true, pax = 'PAX1' } = {}) {
  const seg = Object.keys(sm.seatMapDetails)[segIdx]; const al = (allowList(sm, pax)[seg]) || null;
  const ok = c => c.seg === seg && c.d && c.d.cellAvailability === 'AvailablePaid' && c.d.cellID && !avoid.includes(c.d.cellCode) && !isBass(c) && (!al || al.includes(c.d.cellCode));
  const all = cellsOf(sm).filter(ok);
  let c = code && all.find(x => x.d.cellCode === code);
  if (!c) c = all.find(x => !(notExit && isExit(x))) || all[0];
  if (!c) return null;
  const pr = c.d.seatPriceDetailsByPassenger && c.d.seatPriceDetailsByPassenger[pax] && c.d.seatPriceDetailsByPassenger[pax].totalPrice;
  return { seg, code: c.d.cellCode, cellId: c.d.cellID, price: pr ? pr.amount : null, cell: c };
}
const seatSel = m => { const o = {}; for (const [p, arr] of Object.entries(m)) { o[p] = { setSegmentsSeats: {} }; arr.forEach(s => o[p].setSegmentsSeats[s.seg] = { cellCode: s.code, cellId: s.cellId }); } return o; };
// echo(): normalise the seat-related parts of a Book/Retrieve/Hold response
function echo(j) {
  const codes = o => { const out = []; (function w(x) { if (Array.isArray(x)) x.forEach(w); else if (x && typeof x === 'object') { if (x.cellCode) out.push({ code: x.cellCode, price: amt(x.price || x.seatPrice) }); for (const k of Object.keys(x)) w(x[k]); } })(o); return out; };
  const sel = codes(j.passengersSelectedSeats), ps = [].concat(...fa(j, 'passengerSeats').map(codes)), tss = [].concat(...fa(j, 'totalSelectedSeats').map(codes));
  const pd = (fa(j, 'priceDetails')[0]) || {};
  const pfb = (fa(j, 'passengerFareBreakdown')[0]) || [];
  return { sel: sel.map(s => s.code), selFull: sel, ps: ps.map(s => s.code), psFull: ps, tss: tss.map(s => s.code), tsa: amt(pd.totalSelectedSeatsAmount), pd, totalAmount: amt(pd.totalAmount),
    pax: pfb.map(p => ({ type: p.passengerTypeCode, seatAmt: amt(p.paxTotalSeatAmount), total: amt(p.paxTotalAmount), seats: (p.passengerSeats || []).map(s => ({ code: s.cellCode, price: amt(s.price) })) })) };
}
function tag(h, req, res) { h.req = req; h.res = res; return h; }

const A = {
  async search(routes, pax) { // routes: [[o,d,date]], pax: ['ADT','CHD']
    const cnt = {}; pax.forEach(p => cnt[p] = (cnt[p] || 0) + 1);
    const body = { ...SUP, isDebug: false, searchCriteria: routes.map(([origin, destination, date]) => ({ origin, destination, date })), passengers: Object.keys(cnt).map(k => ({ passengerTypeCode: k, count: String(cnt[k]) })) };
    const h = await slot(() => call('Search', 'api/V2/FlightSearch/Search', body));
    const n = h.json && h.json.offers ? h.json.offers.length : 0;
    const o0 = n ? h.json.offers[0] : null;
    return tag(h, `POST api/V2/FlightSearch/Search - ${routes.map(r => r[0] + '-' + r[1] + ' ' + r[2]).join(' / ')}, ${Object.keys(cnt).map(k => cnt[k] + ' ' + k).join('+')}, supplier GulfAir/KSA`,
      h.status === 200 ? `200 - ${n} offers${o0 ? ', offer[0] totalAmount ' + money(o0.priceDetails && o0.priceDetails.totalAmount) : ''}` : `${h.status} ${errSum(h)}`);
  },
  async fc(search) {
    const body = { ...SUP, ResponseId: search.json.responseId, selectedOfferId: search.json.offers[0].offerId };
    const h = await slot(() => call('FareConfirm', 'api/v2/FlightSearch/FareConfirm', body));
    return tag(h, 'POST api/v2/FlightSearch/FareConfirm - ResponseId/selectedOfferId from the Search offer', h.status === 200 ? `200 - selectedOffer.totalAmount ${money(h.json.selectedOffer.priceDetails && h.json.selectedOffer.priceDetails.totalAmount)}` : `${h.status} ${errSum(h)}`);
  },
  async addpax(fc, pax) {
    const mk = (type, i) => {
      const bd = type === 'ADT' ? '2000-02-15' : type === 'CHD' ? '2018-03-10' : '2026-06-01';
      const first = ['Mostafa', 'Yara', 'Omar', 'Salma'][i % 4];
      const nm = { first, middle: '', last: 'Ibrahim' };
      return { title: type === 'ADT' ? 'Mr' : 'Mstr', name: nm, nationality: 'EG', residentCountry: 'EG', birthDate: bd + 'T00:00:00.000Z', gender: 'male', passengerTypeCode: type, contactRefId: '0',
        travelDocument: { name: nm, nationality: 'EG', expirationDate: '2029-10-01T00:00:00.000Z', issuanceDate: '2023-10-01T00:00:00.000Z', documentNumber: 'A12345' + (60 + i), documentType: 'PASSPORT', gender: 'male', birthCountry: 'EG', birthDate: bd + 'T00:00:00.000Z', issuanceCountryCode: 'EG' } };
    };
    const passengersList = {}; pax.forEach((t, i) => passengersList['Pax' + (i + 1)] = mk(t, i));
    const body = { ...SUP, ResponseId: fc.json.responseId, selectedOfferId: fc.json.selectedOffer.offerId,
      contactsList: { 0: { Email: 'NDC_CI@gmail.com', phone: { countryDialingCode: '+20', phoneNumber: '0121574236', type: 'Personal' }, Address: { CountryCode: 'EG', Line2: 'Al Nahda Floor eight', Line1: 'New Cairo Maddi', City: 'CAIRO' } } }, passengersList };
    const h = await slot(() => call('AddPassenger', 'api/v2/Passenger/AddPassengerDetails', body));
    return tag(h, `POST api/v2/Passenger/AddPassengerDetails - ${pax.length} passenger(s) (${pax.join('+')}), ResponseId/selectedOfferId from FareConfirm`, h.status === 200 ? '200 - offerId/responseId issued' : `${h.status} ${errSum(h)}`);
  },
  async seat(ids, label, headers, over) {
    const body = over !== undefined ? over : { ...SUP, ResponseId: ids.ResponseId, selectedOfferId: ids.selectedOfferId };
    const h = await slot(() => call('GetSeatMap', 'api/V2/SeatMap/Seat', body, { headers }));
    const nc = h.json && h.json.seatMapDetails ? cellsOf(h.json).filter(c => c.cat === 'Seat').length : 0;
    return tag(h, `POST api/V2/SeatMap/Seat - ${label || 'ResponseId/selectedOfferId from the chain\'s AddPassenger'}`, h.status === 200 && h.json && h.json.seatMapDetails ? `200 - seatMapDetails ${Object.keys(h.json.seatMapDetails).length} segment(s), ${nc} seat cells` : `${h.status} ${errSum(h)}`);
  },
  async book(body, label, opts) {
    const h = await slot(() => call('Book', 'api/v2/FlightBooking/Book', body, opts));
    const j = h.json || {};
    return tag(h, `POST api/v2/FlightBooking/Book - ${label ? label + ': ' : ''}${body && body.passengersSelectedSeats !== undefined ? 'passengersSelectedSeats ' + JSON.stringify(shortSeats(body.passengersSelectedSeats)).slice(0, 190) : 'no passengersSelectedSeats field'}`,
      h.status === 200 && j.pnr ? `200 - pnr ${j.pnr}, bookingToken ${j.bookingToken}, tickets ${tix(j)} (${(h.ms / 1000).toFixed(1)}s)` : `${h.status} ${errSum(h)} (${(h.ms / 1000).toFixed(1)}s)`);
  },
  async hold(body) {
    const h = await slot(() => call('Hold', 'api/v2/FlightBooking/Hold', body));
    const j = h.json || {};
    return tag(h, `POST api/v2/FlightBooking/Hold - fareConfirmResponseId/selectedOfferId from AddPassenger${body.passengersSelectedSeats ? ', plus passengersSelectedSeats' : ''}`, h.status === 200 && j.pnr ? `200 - pnr ${j.pnr}, holdExpirationDate ${j.holdExpirationDate == null ? 'null' : j.holdExpirationDate}` : `${h.status} ${errSum(h)}`);
  },
  async post(path, body, label, req, headers) { // SeatAfterHold, PnrReprice, BookAfterHold, Retrieve
    const h = await slot(() => call(label, path, body, { headers }));
    const j = h.json || {};
    return tag(h, `POST ${path} - ${req}`, h.status === 200 ? '200 - ' + (j.pnr ? `pnr ${j.pnr}, ` : '') + (j.bookingStatus ? 'bookingStatus ' + j.bookingStatus + ', ' : '') + (j.bookingToken ? 'bookingToken ' + j.bookingToken + ', ' : '') + `tickets ${tix(j)}` : `${h.status} ${errSum(h)}`);
  },
  sah: (id, label, over, headers) => A.post('api/v2/SeatMap/SeatAfterHold', over || { ...SUP, pnr: id.pnr, gdsPNR: '', bookingToken: id.bookingToken, surName: 'Ibrahim' }, 'SeatAfterHold' + (label ? ' (' + label + ')' : ''), over ? 'custom body' : `pnr ${id.pnr}, surName Ibrahim`, headers),
  reprice: id => A.post('api/v2/FlightBooking/PnrReprice', { ...SUP, pnr: id.pnr, gdsPNR: '', bookingToken: id.bookingToken, surName: 'Ibrahim' }, 'PnrReprice', `pnr ${id.pnr}, surName Ibrahim`),
  bah: id => A.post('api/V2/FlightBooking/BookAfterHold', { ...SUP, pnr: id.pnr, gdsPnr: '', bookingToken: id.bookingToken }, 'BookAfterHold', `pnr ${id.pnr}`),
  retrieve: async (id, label) => { const h = await A.post('api/v2/FlightBooking/Retrieve', { ...SUP, pnr: id.pnr, gdsPNR: '', bookingToken: id.bookingToken }, 'Retrieve' + (label ? ' (' + label + ')' : ''), `pnr ${id.pnr}`); if (h.status === 200 && h.json) h.res = `200 - pnr ${h.json.pnr}, bookingStatus ${h.json.bookingStatus}, seats ${JSON.stringify(echo(h.json).sel)}`; return h; },
};
module.exports = { A, amt, fa, errSum, money, cellsOf, isExit, isBass, allowList, pickSeat, seatSel, echo, tix, sleep, SUP, call, slot };
