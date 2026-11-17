// Scope notes for finalize.js stage1 (SabreNdc/EGY Availability, ne-7, Round 1 - fresh run)
module.exports = function (L, G) {
  const done = new Set(L.filter(x => x.type === 'test_case').map(x => x.tc_id));
  const notRun = G.rows.map(r => r.ID).filter(id => !done.has(id));
  for (let i = L.length - 1; i >= 0; i--) if (L[i].type === 'cleanup' && L[i].related_tc_id === 'PROBE') L.splice(i, 1);
  L.push({ type: 'scope_note', text: 'Scope as requested: supplier SabreNdc, credentialsSelector EGY, staging ne-7 (https://ndc-integration-stg-ne-7.azurewebsites.net/), airline QR only (all routes), V2 Availability, NextAvailability, SelectAvailability, the FareConfirm hand-off and the booking flows after them. References: SabreNdc_V2_Availability_TestCases.csv and the Galileo availability Postman collection, plus additional edge, route and booking-lifecycle cases.' });
  if (notRun.length) L.push({ type: 'scope_note', text: 'Not executed: ' + notRun.length + ' cases (' + notRun.join(', ') + '). They are not counted as passed or failed.' });
};
