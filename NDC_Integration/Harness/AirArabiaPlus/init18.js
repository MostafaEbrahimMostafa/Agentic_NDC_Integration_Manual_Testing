// Initialise the BUG-18 verification run (slug passed via SLUG env). ne-1 container app, AirArabiaPlus / USA.
const R = require('../_shared/recorder');
const base = process.env.NDC_BASE || 'https://ndc-integration-stg-ne-1.calmplant-96dd21b3.northeurope.azurecontainerapps.io/';
R.init({ scope: 'BUG-18 (ADO 65513) fix verification — AirArabiaPlus, credentialsSelector USA: ParentPaxRefId through AddPassenger, Book, Hold and Retrieve + the passenger-name suite', environment: 'staging', baseUrl: base, supplier: 'AirArabiaPlus', credentials_selector: 'USA',
  started_at: R.now(), total_test_cases_planned: 100,
  title_line: 'AirArabiaPlus / USA — BUG-18 ParentPaxRefId fix verification (ne-1)',
  scope_text: 'Routes SHJ-COK, COK-SHJ, AMM-SHJ, SHJ-AMM, MCT-SHJ. Pax matrix (infant under 2nd adult, out-of-order parents, child in between, 3 infants, controls) through AddPassenger -> Book/Hold -> Retrieve, ParentPaxRefId validation rows, and the TC-PAXNAME passenger suite on COK-SHJ',
  coverage_text: 'Linkage read from passengersList keys, tickets keys and passengerFareBreakdown passengerRefId; expected infant ref I<infantIdx>/A<parentIdx>',
  description_text: 'Verifies that the fix for BUG-18 (infant attached to the first adult regardless of ParentPaxRefId) holds on every pax combination and in every booking operation',
  environment_text: 'staging (ndc-integration-stg-ne-1, Azure Container Apps)', csv_file: 'Regression/AirArabiaPlus_OneAPI_Regression_TestCases.csv', prior_runs: '20261109-084356_AirArabiaPlus-USA-OneAPI-Regression-ne6 (BUG-18 raised)' });
console.log('initialised', R.slug());
