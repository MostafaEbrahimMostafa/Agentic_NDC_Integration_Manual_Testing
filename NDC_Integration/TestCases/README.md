# TestCases layout

Test-case CSVs are grouped by feature. The supplier is in the file name. Each suite has **one master CSV**.
When a new round adds cases, append them to that suite's CSV; do not add `_RoundN_Additional` or `_Combined` copies.

| Folder | Holds |
|---|---|
| `_Generic/` | Supplier-agnostic suites: `TestCases_V1.csv`, `TestCases_V2.csv`, `TestCases_Generic.csv`, and the HTML report template `TestCases_Report.html` |
| `Availability/` | Availability / NextAvailability / SelectAvailability suites (Galileo, SabreNdc), round-trip and multi-city |
| `Regression/` | Per-supplier booking regressions and bug-verification suites (AirArabiaPlus, AirIndia, TravelportNdc UAE) |
| `Void/` | Void suites, including the cross-supplier `VoidUnified_TestCases.csv` |
| `SeatMap/` | SeatMap suite and its HTML view |
| `SharedFlights/` | Shared-flights suite |
| `PassengerNames/` | Passenger-name length rules (Amadeus) |

`AirArabiaPlus_V2_BookingCreation_TestCases.csv` uses the older `TC ID` column layout. Its 24 cases also appear in
`AirArabiaPlus_OneAPI_Regression_TestCases.csv`, but it is kept because `Harness/AirArabiaPlus/g_flows.js` and `plan.js` read it.

The QA report renderer (`.claude/Skills/Generate_QA_Report/scripts/render-html.js`) accepts a path under `TestCases/` or a bare file name.
It looks up a bare name in these folders and maps old Round/Combined names to their merged master.
