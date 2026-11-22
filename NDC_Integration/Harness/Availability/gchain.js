// V2 booking-flow primitives for the Availability suppliers: Availability -> Select -> FareConfirm -> AddPassenger -> GetAncillary -> SeatMap -> FareCheck -> Book|Hold -> Retrieve.
// Reuses the _shared/chain.js pickers/reconcile (same V2 shapes) but sends every call through gl.js req() so hops are logged like the Availability cases.
const G = require('./gl'); const AC = require('../_shared/chain');
const { req, SUPB, errTxt, short, tokenless } = G; const { amt } = require('../_shared/core');
const P = { addpax: 'api/v2/Passenger/AddPassengerDetails', anc: 'api/v2/Ancillary/GetAncillary', seat: 'api/V2/SeatMap/Seat', fcheck: 'api/v2/Ancillary/FareCheck', book: 'api/v2/FlightBooking/Book', hold: 'api/v2/FlightBooking/Hold', retr: 'api/v2/FlightBooking/Retrieve', reprice: 'api/v2/FlightBooking/PnrReprice', bah: 'api/V2/FlightBooking/BookAfterHold', cancel: 'api/V2/FlightBooking/CancelAfterHold', void: 'api/V2/FlightBooking/Void' };
const ok2 = h => h && h.status === 200 && h.json;
const idb = (id, off, extra) => ({ ...SUPB, ResponseId: id, selectedOfferId: off, ...(extra || {}) });
const addPax = (ctx, id, off, types, o) => req(ctx, 'AddPassenger', 'AddPassenger', P.addpax, { ...SUPB, ResponseId: id, selectedOfferId: off, passengersList: AC.mkPassengers(types, o), contactsList: AC.CONTACTS });
const getAnc = (ctx, id, off) => req(ctx, 'GetAncillary', 'GetAncillary', P.anc, idb(id, off));
const getSeat = (ctx, id, off) => req(ctx, 'SeatMap', 'SeatMap', P.seat, idb(id, off));
const fareCheck = (ctx, id, off, anc, seats) => req(ctx, 'FareCheck', 'FareCheck', P.fcheck, { ...SUPB, selectedOfferId: off, ResponseId: id, ...(anc ? { PassengersSelectedAncillaries: anc } : {}), ...(seats ? { passengersSelectedSeats: seats } : {}) });
const bookLike = (ctx, which, id, off, x = {}) => req(ctx, which === 'hold' ? 'Hold' : 'Book', which === 'hold' ? 'Hold' : 'Book', which === 'hold' ? P.hold : P.book, { ResponseId: id, selectedOfferId: off, ...SUPB, ...(x.anc ? { passengersSelectedAncillaries: AC.lowerAnc(x.anc) } : {}), ...(x.seats ? { passengersSelectedSeats: x.seats } : {}) });
const pnrBody = (b, o = {}) => ({ ...SUPB, pnr: b.pnr, gdsPNR: b.gdsPNR, bookingToken: b.bookingToken, ...(o.surName !== undefined ? { surName: o.surName } : {}) });
const retrieve = (ctx, b, o) => req(ctx, 'Retrieve', 'Retrieve', P.retr, pnrBody(b, o));
const reprice = (ctx, b, o) => req(ctx, 'PnrReprice (FareConfirmAfterHold)', 'PnrReprice', P.reprice, pnrBody(b, { surName: 'Ibrahim', ...(o || {}) }));
const bookAfterHold = (ctx, b, o) => req(ctx, 'BookAfterHold', 'BookAfterHold', P.bah, pnrBody(b, { surName: 'Ibrahim', ...(o || {}) }));
const cancelHold = (ctx, b, o) => req(ctx, 'CancelAfterHold', 'CancelAfterHold', P.cancel, pnrBody(b, o));
module.exports = { cancelHold, bookAfterHold, P, ok2, idb, addPax, getAnc, getSeat, fareCheck, bookLike, retrieve, reprice, pnrBody, AC, amt };
