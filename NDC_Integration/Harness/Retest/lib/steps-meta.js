// V2 endpoint paths per step name, and which steps create or destroy live bookings.
// Paths match Harness/_shared/chain.js (proven live) and SPEC.md §2.
const META = {
  Search:          { path: 'api/V2/FlightSearch/Search' },
  FareConfirm:     { path: 'api/v2/FlightSearch/FareConfirm' },
  Upselling:       { path: 'api/v2/FlightSearch/UpSelling' },
  FareRules:       { path: 'api/v2/FlightSearch/FareRules' },
  GetOfferBundles: { path: 'api/V2/bundles/GetOfferBundles' },
  AddPassenger:    { path: 'api/v2/Passenger/AddPassengerDetails' },
  GetAncillary:    { path: 'api/v2/Ancillary/GetAncillary' },
  SeatMap:         { path: 'api/V2/SeatMap/Seat' },
  FareCheck:       { path: 'api/v2/Ancillary/FareCheck' },
  Hold:            { path: 'api/v2/FlightBooking/Hold', creates: 'hold' },
  Book:            { path: 'api/v2/FlightBooking/Book', creates: 'ticket' },
  Retrieve:        { path: 'api/v2/FlightBooking/Retrieve' },
  PnrReprice:      { path: 'api/v2/FlightBooking/PnrReprice' },
  BookAfterHold:   { path: 'api/V2/FlightBooking/BookAfterHold', creates: 'ticket' },
  CancelAfterHold: { path: 'api/V2/FlightBooking/CancelAfterHold', destructive: true },
  Void:            { path: 'api/V2/FlightBooking/Void', destructive: true },
};
const STEP_NAMES = Object.keys(META);
// Steps that need explicit authorization (--allow-booking): they create or change a live booking.
const BOOKING_STEPS = STEP_NAMES.filter(n => META[n].creates || META[n].destructive);
module.exports = { META, STEP_NAMES, BOOKING_STEPS };
