const fs = require('fs'), path = require('path');
const t = new Date(); const p = n => String(n).padStart(2, '0');
const slug = `${t.getUTCFullYear()}${p(t.getUTCMonth() + 1)}${p(t.getUTCDate())}-${p(t.getUTCHours())}${p(t.getUTCMinutes())}${p(t.getUTCSeconds())}_SabreNdc-EGY-Availability-QR-Round1-ne7`;
fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true }); fs.writeFileSync(path.join(__dirname, 'out', 'slug.txt'), slug);
// The suite is one merged CSV: TestCases/Availability/SabreNdc_V2_Availability_TestCases.csv (base + Round 2 + Round 3 additions).
const G = require('../gl');
const total = +(process.env.TOTAL || G.rows.length);
G.R.init({ scope: 'SabreNdc / EGY — V2 Availability flow (Availability, NextAvailability, SelectAvailability, FareConfirm hand-off) for the QR airline, all routes, on ne-7, plus the booking chain (AddPassenger, GetAncillary, SeatMap, FareCheck, Hold, Book, Retrieve, PnrReprice, BookAfterHold, CancelAfterHold, Void)', environment: 'staging', baseUrl: G.BASE, supplier: 'SabreNdc', credentials_selector: 'EGY',
  started_at: G.now(), total_test_cases_planned: total,
  title_line: 'SabreNdc / EGY — V2 Availability flow (QR only) on ne-7 — availability, selection and booking flows',
  scope_text: 'SabreNdc_V2_Availability_TestCases.csv (143 cases ported from the Galileo Availability suite) plus SabreNdc_V2_Availability_Round3_Additional_TestCases.csv (72 edge and booking-flow cases): Availability first page and paging, NextAvailability, SelectAvailability, the FareConfirm hand-off and the flow from Availability through AddPassenger, GetAncillary, SeatMap, FareCheck and Book/Hold to Retrieve. V2 only, supplier SabreNdc, credentialsSelector EGY, QR airline only (every journey returned for EGY is QR-marketed), staging ne-7.',
  coverage_text: 'All ported cases are executed against the live ne-7 host; a case is BLOCKED only when its data cannot be produced (reason given in the case)',
  description_text: 'Regression for the change "Sabre NDC Availability Flow Implementation": V2 endpoints POST api/V2/FlightSearch/Availability (first page and next page) and POST api/V2/FlightSearch/SelectAvailability, handed off to FareConfirm and the booking chain',
  environment_text: 'staging (ndc-integration-stg-ne-7)', csv_file: 'Availability/SabreNdc_V2_Availability_TestCases.csv', prior_runs: 'None - fresh run, judged only on its own results.' });
console.log(slug);
