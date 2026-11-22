const R = require('../_shared/recorder');
R.init({ scope: 'AirArabiaPlus (Air Arabia One-API aggregator) full V2 regression — credentialsSelector USA', environment: 'staging', baseUrl: 'https://ndc-integration-stg-ne-6.azurewebsites.net/', supplier: 'AirArabiaPlus', credentials_selector: 'USA',
  started_at: R.now(), total_test_cases_planned: 380,
  title_line: 'AirArabiaPlus / USA — One-API supplier full regression (V2 only, ne-6)',
  scope_text: 'Full V2 regression of the new AirArabiaPlus (Air Arabia One-API) supplier with credentialsSelector USA: reference routes for G9, E5 and 3O, booking-creation matrix, V2 flow matrix (FLOW-V2-25..120), generic, SeatMap, VoidUnified and adapted passenger-name rows',
  coverage_text: 'Executed test cases are listed below; rows that cannot be executed because the supplier does not support the operation or has no inventory are BLOCKED with the live evidence (see Scope note)',
  description_text: 'Regression for the change "integrate Air Arabia One-API as a new supplier; same flows as Air Arabia, but Search is an aggregator returning results from more than one supplier"',
  environment_text: 'staging (ndc-integration-stg-ne-6)', csv_file: 'Regression/AirArabiaPlus_OneAPI_Regression_TestCases.csv', prior_runs: 'AirArabiaPlus V2 booking-creation rounds 1-3 (2026-11-08)' });
console.log('initialised', R.slug());
