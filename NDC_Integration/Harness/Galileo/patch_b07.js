const fs=require('fs');let s=fs.readFileSync('bugs_r4.js','utf8');
s=s.replace("  // ---- new in Round 4", `  // Round 4 evidence for BUG-07 / BUG-17 (the Round 3 repro sweeps are not repeated in this run)
  get('BUG-07').calls = [
    { tc: 'TC-SELECTAVAIL-NEG-09', step: 'SelectAvailability with unknown journeyR', label: 'SELECT_unknown_journeyRefId_200', nth: 'last' },
    { tc: 'TC-SELECTAVAIL-NEG-10', step: 'SelectAvailability with unknown segmentR', label: 'SELECT_unknown_segmentRefId_200', nth: 'last' },
    { tc: 'FLOW-V2-GALAVAIL-01-NEGHOP3', step: 'SelectAvailability with a bookingClassId', label: 'SELECT_foreign_bookingClassId_200', nth: 'last' }];
  get('BUG-17').calls = get('BUG-17').calls.map(c => c.tc === 'BOOKPROBE' ? { tc: 'TC-FLOW-V2-GALBOOK-11', step: 'Hold', label: 'HOLD_with_baggage_and_seats', nth: 'last', has: 'journyesSelectedAncillaries' } : c);
  // ---- new in Round 4`);
fs.writeFileSync('bugs_r4.js',s);console.log(/get\('BUG-07'\)\.calls/.test(s));
