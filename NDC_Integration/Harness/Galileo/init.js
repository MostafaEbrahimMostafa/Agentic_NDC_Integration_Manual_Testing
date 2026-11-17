const fs = require('fs'), path = require('path');
const t = new Date(); const p = n => String(n).padStart(2, '0');
const slug = `${t.getUTCFullYear()}${p(t.getUTCMonth() + 1)}${p(t.getUTCDate())}-${p(t.getUTCHours())}${p(t.getUTCMinutes())}${p(t.getUTCSeconds())}_Galileo-EGY-Availability-ne4-Round4`;
fs.writeFileSync(path.join(__dirname, 'slug.txt'), slug);
const G = require('./gl');
const total = +(process.env.TOTAL || G.rows.length);
G.R.init({ scope: 'ROUND 4 — Galileo / EGY — V2 Availability flow (Availability, NextAvailability, SelectAvailability) on ne-4: 143-case regression + 72 edge cases + booking flows (AddPassenger, GetAncillary, SeatMap, FareCheck, Book/Hold, Retrieve) + new Hold/CancelAfterHold cases', environment: 'staging', baseUrl: G.BASE, supplier: 'Galileo', credentials_selector: 'EGY',
  started_at: G.now(), total_test_cases_planned: total,
  title_line: 'Galileo / EGY — V2 Availability flow, Round 4 (ne-4) — regression, booking flows and hold cancellation',
  scope_text: 'Full cycle of Galileo_V2_Availability_TestCases.csv (143 cases) plus the Round 3 edge/booking cases (72) and three new Round 4 cases (Hold then CancelAfterHold, cancel negatives, hold with baggage and seats then cancel): Availability first page and paging, NextAvailability, SelectAvailability, the FareConfirm hand-off and the flow from Availability through AddPassenger, GetAncillary, SeatMap, FareCheck and Book/Hold to Retrieve and CancelAfterHold. V2 only, supplier Galileo, credentialsSelector EGY, staging ne-4.',
  coverage_text: 'All 143 original cases, the 72 Round 3 additions and the 3 Round 4 additions are executed against the live ne-4 host; a case is BLOCKED only when its data cannot be produced (reason given in the case)',
  description_text: 'Regression for the change "Galileo NDC Availability Flow Implementation": new V2 endpoints POST api/V2/FlightSearch/Availability (first page and next page) and POST api/V2/FlightSearch/SelectAvailability, handed off to FareConfirm and the booking chain',
  environment_text: 'staging (ndc-integration-stg-ne-4)', csv_file: 'Galileo_V2_Availability_Round4_Combined_TestCases.csv', prior_runs: 'Round 1 — 20261110-123507: 143 test cases 107/35/1 (BUG-01..11). Round 2 — 20261110-131903: identical. Round 3 — 20261110-145430: 215 test cases 148 PASS / 65 FAIL / 2 BLOCKED, BUG-01..22' });
console.log(slug);
