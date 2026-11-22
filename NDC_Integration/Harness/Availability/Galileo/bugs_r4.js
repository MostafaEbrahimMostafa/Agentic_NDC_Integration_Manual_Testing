// Round 4: status prefix for every bug, Round 4 extensions of BUG-12/16/17/18 and the new BUG-23/24. Mutates the shared list from bugs_gl.js.
const RUN1 = '20261110-123507_Galileo-EGY-Availability-ne4', RUN3 = '20261110-145430_Galileo-EGY-Availability-ne4-Round3';
module.exports = function (B) {
  const get = id => B.find(b => b.id === id);
  const add = (id, text) => { const b = get(id); b.desc += ' **Round 4:** ' + text; };
  add('BUG-12', 'the first journey with class Y on CAI-JED +30 is now NE174 (00:20), so the 143-case suite meets the defect too: TC-FARECONFIRM-BIZ-01 and FLOW-V2-GALAVAIL-01 now fail the reconciliation (NE174 ADT 470 vs 350, INF 290 vs 170). The same happens for SV386 (ADT 910 vs 260, INF 820 vs 170), SV309 (ADT 800 vs 320, INF 490 vs 10) and NP328 (ADT 1690 vs 1570, INF 440 vs 320); the gap is 120 for NE and NP but 650 / 480 for the two SV flights, so SV adds more than the two penalty lines. MS673, MS644, MS668 and MS665 reconcile in every call.');
  // in Round 4 flows 03 and 06 ran on MS journeys (which reconcile) and fail for other bugs, so only the two cases that price NE174 carry this bug now
  get('BUG-12').tcs = ['TC-FARECONFIRM-BIZ-01', 'FLOW-V2-GALAVAIL-01']; get('BUG-12').anchor = 'TC-FARECONFIRM-BIZ-01';
  // Round 4 reran the booking flows with MS journeys (which reconcile), so the Round 3 NE172/NE171 evidence calls no longer show the defect: use the calls that do
  get('BUG-12').calls = [
    { tc: 'TC-FARECONFIRM-BIZ-01', step: 'FareConfirm', label: 'FARECONFIRM_NE174_taxes_mismatch', nth: 'last' },
    { tc: 'PROBE', step: 'FareConfirm', exact: true, label: 'FARECONFIRM_SV386_taxes_mismatch', nth: 'last', has: '"marketingFlightNumber":"386"' },
    { tc: 'PROBE', step: 'FareConfirm', exact: true, label: 'FARECONFIRM_SV309_taxes_mismatch', nth: 'last', has: '"marketingFlightNumber":"309"' },
    { tc: 'PROBE', step: 'FareConfirm', exact: true, label: 'FARECONFIRM_NP328_taxes_mismatch', nth: 'last', has: '"marketingFlightNumber":"328"' }];
  add('BUG-16', 'reproduced on 2026-12-15: MS673 is shown 00:50 by Availability/FareConfirm and 01:05 by Hold and Retrieve in flows 05, 11 and 16 and in the probe holds.');
  get('BUG-16').tcs.push('TC-FLOW-V2-GALBOOK-11', 'TC-FLOW-V2-GALBOOK-16');
  add('BUG-17', 'reproduced in flows 05, 11 and 16 (Hold pnr=null, gdsPNR set; Retrieve returns a pnr such as 7DXPXQ / 7DXUD9 for them).');
  get('BUG-17').tcs.push('TC-FLOW-V2-GALBOOK-11', 'TC-FLOW-V2-GALBOOK-16');
  add('BUG-18', 'the problem is wider than NE172. On 2026-12-15 the first journey on page 1 of CAI-JED (NE174 00:20) is offered with class Y, priced by FareConfirm and accepted by AddPassengerDetails, but Hold answers HTTP 409 NDC-INT-BYP-A0001 "The requested flight or class is no longer available." with Context 3000 "*0 AVAIL/WL CLOSED*". On JED-CAI +30 the NP328 01:00 journey fails Hold with 409 NDC-INT-UNC-Z9999, Context 3000 "*UNABLE - FLIGHT NOT FOUND IN VENDOR SYSTEM*". Of the first four Y journeys on CAI-JED +30 (TC-FLOW-V2-GALBOOK-17) one cannot be held; MS673, SV386 and the second SV386 journey can. Because NE174 is first on the page, the first execution of booking flows 01-06, 11 and 12 failed at Book/Hold until MS journeys were chosen.');
  get('BUG-18').tcs.push('TC-FLOW-V2-GALBOOK-17');
  get('BUG-18').calls.push({ tc: 'TC-FLOW-V2-GALBOOK-17', step: 'Hold', label: 'HOLD_NE174_avail_wl_closed', nth: 'first', has: 'AVAIL/WL CLOSED' });

  // Round 4 evidence for BUG-07 / BUG-17 (the Round 3 repro sweeps are not repeated in this run)
  get('BUG-07').calls = [
    { tc: 'TC-SELECTAVAIL-NEG-09', step: 'SelectAvailability with unknown journeyR', label: 'SELECT_unknown_journeyRefId_200', nth: 'last' },
    { tc: 'TC-SELECTAVAIL-NEG-10', step: 'SelectAvailability with unknown segmentR', label: 'SELECT_unknown_segmentRefId_200', nth: 'last' },
    { tc: 'FLOW-V2-GALAVAIL-01-NEGHOP3', step: 'SelectAvailability with a bookingClassId', label: 'SELECT_foreign_bookingClassId_200', nth: 'last' }];
  get('BUG-17').calls = get('BUG-17').calls.map(c => c.tc === 'BOOKPROBE' ? { tc: 'TC-FLOW-V2-GALBOOK-11', step: 'Hold', label: 'HOLD_with_baggage_and_seats', nth: 'last', has: 'journyesSelectedAncillaries' } : c);
  // ---- new in Round 4
  B.push({
    id: 'BUG-23', api: 'CancelAfterHold', field: 'bookingToken', sev: 'High', anchor: 'TC-FLOW-V2-GALBOOK-15', tcs: ['TC-FLOW-V2-GALBOOK-15'],
    spec: 'SPEC.md §2.14 CancelAfterHold required fields pnr, gdsPNR, bookingToken',
    title_tail: 'bookingToken Is Not Validated: a Live Hold Is Cancelled When the Request Carries bookingToken "INVALID-TOKEN"',
    desc: 'CancelAfterHold (POST api/V2/FlightBooking/CancelAfterHold) documents pnr, gdsPNR and bookingToken as required fields. With a live Galileo hold, a request that keeps the real gdsPNR (pnr null) but sends bookingToken "INVALID-TOKEN" answers HTTP 200 {"cancelled": true, "message": "Cancelled finished Successfully"} and the hold is gone (a Retrieve afterwards answers "This PNR has been cancelled"). The same happened when only the last six characters of the real token were replaced (JJ41TD) and in a separate probe (JJ41TJ); three of three attempts cancelled the hold. The token the API issues at Hold time is therefore not checked, and the locator alone is enough to cancel. The call still needs the x-api-key and Client-Id headers. Found in Round 4 by the new test TC-FLOW-V2-GALBOOK-15.',
    steps: ['Availability CAI-JED today+30 (1 ADT), pick the first journey with class Y that can be held (MS673), SelectAvailability, FareConfirm, AddPassengerDetails, Hold: note gdsPNR (pnr is null) and bookingToken.', 'POST api/V2/FlightBooking/CancelAfterHold with {supplier:"Galileo", credentialsSelector:"EGY", pnr:null, gdsPNR:<locator of the hold>, bookingToken:"INVALID-TOKEN"}.', 'The answer is HTTP 200 cancelled=true; Retrieve of the same locator then answers 409 "This PNR has been cancelled".'],
    actual: 'HTTP 200 {"cancelled": true, "message": "Cancelled finished Successfully"} for bookingToken "INVALID-TOKEN"; the hold is cancelled.',
    expected: 'A 4xx validation error (for example 400 NDC-INT-TEC-A0001 "bookingToken is invalid") and the hold stays OnHold; only the token returned by Hold/Retrieve for that booking cancels it.',
    why: "The bookingToken is the only per-booking value the API issues besides the supplier locator; ignoring it means any authenticated caller that knows or guesses a locator can cancel someone else's hold. The locators issued in this run are close together (JJ41RL ... JJ41TK).",
    impact: 'A held booking can be cancelled without proving ownership; whether other calls that take the token (Retrieve, BookAfterHold) ignore it too was not tested in this round.',
    sevWhy: 'Ownership/authorization check missing on a destructive call; reproduced three times.',
    calls: [{ tc: 'TC-FLOW-V2-GALBOOK-15', step: 'Hold', label: 'HOLD_live_booking', nth: 'last', has: 'bookingToken' }, { tc: 'TC-FLOW-V2-GALBOOK-15', step: 'CancelAfterHold', label: 'CANCEL_invalid_token_200', nth: 'last', has: 'Cancelled finished Successfully' }]
  });
  B.push({
    id: 'BUG-24', api: 'Retrieve', field: 'bookingStatus', sev: 'Medium', anchor: 'TC-FLOW-V2-GALBOOK-14', tcs: ['TC-FLOW-V2-GALBOOK-14', 'TC-FLOW-V2-GALBOOK-15', 'TC-FLOW-V2-GALBOOK-16'],
    spec: 'SPEC.md §2.10 Retrieve, §2.14 CancelAfterHold ("Common Errors": cancelling twice)',
    title_tail: 'A Cancelled Hold Is Reported as HTTP 409 NDC-INT-UNC-Z9999 With Raw Supplier Payload by Retrieve, Repeated Cancel and BookAfterHold',
    desc: 'After CancelAfterHold succeeds, every later call on the same booking fails the same way: Retrieve, a second CancelAfterHold and BookAfterHold answer HTTP 409 NDC-INT-UNC-Z9999 with ErrorMessage equal to the code ("NDC-INT-UNC-Z9999"), the only readable text in Context 200 "This PNR has been cancelled", and OriginalSupplierRequest/OriginalSupplierResponse in the body (see BUG-02, BUG-03). Retrieve never returns a booking with a Cancelled status, so a client cannot read the cancelled state from the booking itself. Seen in TC-FLOW-V2-GALBOOK-14, 15 and 16.',
    steps: ['Create a hold (Availability, Select, FareConfirm, AddPassengerDetails, Hold) and cancel it with CancelAfterHold (HTTP 200, cancelled=true).', 'POST api/v2/FlightBooking/Retrieve with pnr:null, gdsPNR, bookingToken, surName of the cancelled hold.', 'Repeat CancelAfterHold and send BookAfterHold for the same booking.'],
    actual: 'Retrieve, the second CancelAfterHold and BookAfterHold: HTTP 409, ErrorCode "NDC-INT-UNC-Z9999", ErrorMessage "NDC-INT-UNC-Z9999", Context [{"Name":"200","Value":"This PNR has been cancelled"}], plus OriginalSupplierRequest/OriginalSupplierResponse.',
    expected: 'Retrieve answers 200 with bookingStatus "Cancelled" (or a classified 404/409 with a specific code and message); a repeated cancel and BookAfterHold answer a classified business error ("booking already cancelled") without raw supplier payloads.',
    why: 'SPEC.md lists cancelling twice as a common error and expects the API to return a usable answer; the unclassified code and the raw payload make the case impossible to handle without parsing Context.',
    impact: 'Clients cannot tell "cancelled" from a supplier outage (both are 409 Z9999) and the raw supplier request/response of a cancelled booking is exposed.',
    sevWhy: 'Non-blocking, but breaks the cancel lifecycle for consumers and repeats the raw-payload exposure of BUG-02.',
    calls: [{ tc: 'TC-FLOW-V2-GALBOOK-14', step: 'Retrieve', label: 'RETRIEVE_after_cancel_409', nth: 'last', has: 'This PNR has been cancelled' }, { tc: 'TC-FLOW-V2-GALBOOK-15', step: 'CancelAfterHold', label: 'CANCEL_again_409', nth: 'last', has: 'This PNR has been cancelled' }, { tc: 'TC-FLOW-V2-GALBOOK-15', step: 'BookAfterHold', label: 'BOOKAFTERHOLD_cancelled_409', nth: 'last', has: 'This PNR has been cancelled' }]
  });
  B.forEach(b => {
    const n = +b.id.slice(4);
    const first = n <= 11 ? `first reported in Round 1, run ${RUN1}; unchanged in Rounds 2 and 3` : `first reported in Round 3, run ${RUN3}`;
    b.desc = (n >= 23 ? '**Round 4 status: new.** ' : `**Round 4 status: still open, reproduced (${first}).** `) + b.desc;
  });
};
