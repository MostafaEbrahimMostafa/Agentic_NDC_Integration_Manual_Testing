// Per-supplier settings for the shared V2 Availability engine (gl.js, gchain.js, finalize.js, make_bugs.js, run.js).
// Everything that used to differ between the Galileo and SabreNdc copies of the engine is a field here; the
// test groups (g1..g9), init scripts, notes and bug lists stay in the supplier folder (Availability/<Supplier>/).
// Run outputs (slug.txt, raw/, results_*.json, baselines, bug_findings.json) go to Availability/<Supplier>/out/.
const path = require('path');

const SUPPLIERS = {
  Galileo: {
    supplier: 'Galileo', selector: 'EGY', host: 'ne-4',
    base: 'https://ndc-integration-stg-ne-4.azurewebsites.net/',
    baseFixed: false,                 // NDC_BASE in the environment overrides the base
    csv: ['Availability/Galileo_V2_Availability_TestCases.csv'],
    csvOptional: ['Availability/Galileo_V2_RoundTrip_MultiCity_TestCases.csv'],
    selectForm: 'single',             // build of 2026-11-15: bookingClassIds {journey:{segment:id}}; SELECT_FORM=array restores {segment:[id]}
    preferCarrier: true,              // honour opts.carrier / PREFER_CARRIER when picking journeys
    taRetry: false,
    notes: 'r4notes',                 // default for finalize stage1 (NOTES=<file> overrides)
    bugs: 'bugs_gl',                  // default bug list for make_bugs (BUGS=<file> overrides)
  },
  SabreNdc: {
    supplier: 'SabreNdc', selector: 'EGY', host: 'ne-7',
    base: 'https://ndc-integration-stg-ne-7.azurewebsites.net/',
    baseFixed: true,                  // always ne-7, NDC_BASE is ignored (as in the original SabreNdc harness)
    csv: ['Availability/SabreNdc_V2_Availability_TestCases.csv'],
    csvOptional: [],
    selectForm: 'as-is',              // bookingClassIds sent as built; sel(..., { flat: true }) flattens to a string list
    preferCarrier: false,
    taRetry: true,                    // wait and retry on 409 ReachedTALimit (account session cap)
    notes: 'r3notes',
    bugs: 'bugs_gl',
  },
};

// Supplier of this process: AVAIL_SUPPLIER, else the folder of the entry script (Availability/<Supplier>/x.js).
function resolve() {
  let name = process.env.AVAIL_SUPPLIER;
  if (!name && require.main) name = path.relative(__dirname, require.main.filename).split(path.sep)[0];
  if (!SUPPLIERS[name]) throw new Error(`Unknown Availability supplier "${name || ''}". Pass it as the first argument (node run.js <Supplier> <group>) or set AVAIL_SUPPLIER to one of: ${Object.keys(SUPPLIERS).join(', ')}`);
  process.env.AVAIL_SUPPLIER = name; // child processes inherit it
  const dir = path.join(__dirname, name);
  return { name, cfg: SUPPLIERS[name], dir, out: path.join(dir, 'out') };
}

// For engine entry scripts (run.js, finalize.js, make_bugs.js): take the supplier from argv[2] if given.
function fromArgv() {
  if (SUPPLIERS[process.argv[2]]) { process.env.AVAIL_SUPPLIER = process.argv[2]; process.argv.splice(2, 1); }
  return resolve();
}

module.exports = { SUPPLIERS, resolve, fromArgv };
