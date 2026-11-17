// Builds the six AirArabiaPlus/USA bug-report folders (house template) from the raw captures in raw_xlsx/.
const fs = require('fs'), path = require('path');
const RAW = path.join(__dirname, 'raw_xlsx');
const ROOT = path.join(__dirname, '..', '..', 'Artifacts', 'BugReports', '20261116_AirArabiaPlus-USA-Verify-ne');
const BASE_URL = 'https://ndc-integration-stg-ne.azurewebsites.net/';
const ENVIRONMENT = 'Staging (stg-ne, no host number)';
const recs = fs.readdirSync(RAW).filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync(path.join(RAW, f))));
const of = tc => recs.filter(r => r.tc === tc);
const noSearch = a => a.filter(r => r.endpoint !== 'Search');
const corr = r => (r.response_headers || {}).correlationid || 'Not returned by this response';
const J = o => JSON.stringify(o, null, 2);
const amt = x => x == null ? null : (typeof x === 'object' ? x.amount : x);
const clean = s => s.replace(/[^A-Za-z0-9_.-]/g, '_');

function writeBug(n, folderName, b) {
  const nn = String(n).padStart(2, '0'); const dir = path.join(ROOT, `BUG-${nn}_${folderName}`); const rr = path.join(dir, 'requests-responses');
  fs.mkdirSync(rr, { recursive: true }); const files = [];
  b.calls.forEach((r, i) => {
    const label = clean((b.labels && b.labels[i]) || `V2_${r.endpoint}`); const k = String(i + 1).padStart(2, '0');
    fs.writeFileSync(path.join(rr, `${k}_${label}_request.json`), J({ label, method: 'POST', url: r.request.url, headers: r.request.headers, body: r.request.body }));
    fs.writeFileSync(path.join(rr, `${k}_${label}_response.json`), J({ label, status: r.status, durationMs: r.ms, requestedAtUtc: r.started_at, respondedAtUtc: r.ended_at, body: r.response }));
    files.push(`- \`${k}_${label}_request.json\` / \`${k}_${label}_response.json\` — ${label}, \`/${r.path}\`, HTTP ${r.status}`);
  });
  const md = `# ${b.title}

## 📄 Description

${b.description}

## 🔁 Steps to Reproduce

${b.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## ❌ Actual Result

\`\`\`json
${b.actual}
\`\`\`

${b.actualNote}

## ✅ Expected Result

\`\`\`json
${b.expected}
\`\`\`

${b.expectedNote}

## 🖥️ System Information

- **API Version:** \`V2\`
- **Supplier/Airline:** \`AirArabiaPlus\`
- **Base URL:** \`${BASE_URL}\`
- **API Name:** \`${b.api}\`
- **Environment:** \`${ENVIRONMENT}\`
- **Credentials Selector:** \`USA\`
- **Correlation ID:** ${b.corr}
- **Verified on:** 2026-11-16 (original defect: run 20261109-084356_AirArabiaPlus-USA-OneAPI-Regression-ne6, Resources/AirArabiaPlus_bugs.xlsx)

## 📊 Severity

**${b.severity}** — ${b.severityWhy}

## 📎 Evidence

**Actual response (redacted):**

\`\`\`json
${b.evidenceActual}
\`\`\`

**Expected response (redacted):**

\`\`\`json
${b.evidenceExpected}
\`\`\`

## 📁 Request / response files

Full request and response bodies (x-api-key redacted; raw supplier payloads redacted per SPEC.md 7.14) are in the \`requests-responses/\` folder next to this file. Search is left out (its response is large and is not the evidence); the search criteria are in the steps.

${files.join('\n')}

## 💥 Impact

${b.impact}
`;
  fs.writeFileSync(path.join(dir, `BUG-${nn}_${folderName}.md`), md);
  return { nn, folder: `BUG-${nn}_${folderName}`, title: b.title.replace(/^#\s*/, ''), severity: b.severity, pairs: b.calls.length };
}

const idx = [];
// ---------- BUG-01 cross-tenant Retrieve ----------
{
  const c = noSearch(of('XLSX2-A-3')); const x = c.filter(r => /^Retrieve-/.test(r.endpoint)); const egy = x.find(r => r.endpoint === 'Retrieve-EGY'), usa = x.find(r => r.endpoint === 'Retrieve-USA');
  idx.push(writeBug(1, 'Retrieve_credentialsSelector', {
    title: '[V2][AirArabiaPlus][Retrieve] – credentialsSelector Not Enforced: A Booking Created Under USA Is Returned When Retrieved Under EGY',
    description: `A booking created with \`credentialsSelector\` USA is returned by \`Retrieve\` (HTTP 200, full booking) when the same \`pnr\`/\`gdsPNR\`/\`bookingToken\` is sent with \`credentialsSelector\` EGY, which is also an active AirArabiaPlus selector. UAE and KSA are rejected (HTTP 400) only because they are not configured for this supplier, not because the booking belongs to another tenant. Re-verified 2026-11-16: still reproduces.`,
    steps: ['Search AirArabiaPlus / USA, COK → SHJ, 2026-12-12, 1 ADT + 1 CHD + 1 INF.', 'FareConfirm → GetOfferBundles (bundle 66624) → AddPassenger → GetAncillary(selectedBundles) → SeatMap → FareCheck → Book (PNR ' + egy.response.pnr + ').', 'POST /api/v2/FlightBooking/Retrieve with the booking\'s pnr, gdsPNR, bookingToken and credentialsSelector USA — HTTP 200 (control).', 'Repeat step 3 with credentialsSelector EGY.', 'Repeat step 3 with credentialsSelector UAE and KSA for comparison.'],
    actual: `{\n  "status": 200,\n  "pnr": "${egy.response.pnr}",\n  "bookingStatus": "${egy.response.bookingStatus}"\n}`,
    actualNote: `Retrieve with credentialsSelector EGY returns the complete booking created under USA (HTTP ${egy.status}, same PNR ${egy.response.pnr}). UAE and KSA return HTTP 400 NDC-INT-TEC-A0001.`,
    expected: `{\n  "Status": 4xx\n}`,
    expectedNote: 'The booking belongs to credentials selector USA, so a Retrieve sent under another selector must be rejected. SPEC.md §1.7: supplier + credentialsSelector is the body-level tenant boundary and must be re-checked on every call.',
    api: 'Retrieve', corr: `\`${corr(egy)}\` (Retrieve, EGY). USA control: \`${corr(usa)}\`.`,
    severity: 'High', severityWhy: 'Cross-tenant data exposure of passenger and booking data for any supplier with more than one active selector; the booking flow itself is not blocked.',
    evidenceActual: `{\n  "request": { "supplier": "AirArabiaPlus", "credentialsSelector": "EGY", "pnr": "${egy.response.pnr}", "gdsPNR": "<same>", "bookingToken": "<same>" },\n  "response": { "HTTP": 200, "pnr": "${egy.response.pnr}", "bookingStatus": "${egy.response.bookingStatus}" }\n}`,
    evidenceExpected: `{\n  "request": { "supplier": "AirArabiaPlus", "credentialsSelector": "EGY", "pnr": "${egy.response.pnr}" },\n  "response": { "HTTP": "4xx", "reason": "booking belongs to another credentials selector" }\n}`,
    impact: 'Any consumer holding a booking reference (or a leaked token) for one selector can read bookings of another selector of the same supplier, including passenger names, documents and contact data. The same behaviour was already seen on SeatMap for other suppliers in earlier rounds, which points to a shared missing tenant check rather than a supplier-specific mapping issue.',
    calls: c, labels: c.map((r, i) => `V2_COK-SHJ_${r.endpoint.replace('Retrieve-', 'Retrieve_selector_')}`)
  }));
}
// ---------- BUG-02 paxTotalAncillaryAmount ----------
{
  const c = noSearch(of('XLSX2-A-5')); const g = e => c.filter(r => r.endpoint === e && r.status === 200).pop(); const fc = g('FareCheck'), bk = g('Book'), rt = g('Retrieve');
  const p = r => r.response.selectedOffer.passengerFareBreakdown[0]; const d = r => r.response.selectedOffer.priceDetails;
  idx.push(writeBug(2, 'Book_paxTotalAncillaryAmount', {
    title: '[V2][AirArabiaPlus][Book] – paxTotalAncillaryAmount Differs Between FareCheck/Book and Retrieve for the Same Booking',
    description: `For a bundle booking (bundle 66589 + paid meal 264.32 + baggage 135.20), FareCheck and Book report \`paxTotalAncillaryAmount\` ${amt(p(bk).paxTotalAncillaryAmount)} while Retrieve reports ${amt(p(rt).paxTotalAncillaryAmount)} for the same booking. The grand total (${amt(d(bk).totalAmount)}) is identical in all three, and \`paxTotalAmount\` (${amt(p(bk).paxTotalAmount)}) only adds up with the Retrieve figure. Re-verified 2026-11-16: still reproduces, and it also reproduces without a child (1 ADT only). It does not occur with bundle 66624.`,
    steps: ['Search AirArabiaPlus / USA, COK → SHJ, 2026-12-12, 1 ADT.', 'FareConfirm → GetOfferBundles (select bundle 66589) → AddPassenger → GetAncillary(selectedBundles) → SeatMap.', 'FareCheck with Meal "Vegetable Biryani" (264.32), Baggage "30 Kg Total in 2 Piece Discounted" (135.20) and a seat (the first FareCheck attempt was rejected with 409 and was repeated with another meal — see call 6).', 'Book, then Retrieve with the returned pnr / gdsPNR / bookingToken.', 'Compare passengerFareBreakdown[].paxTotalAncillaryAmount and priceDetails.totalAncillariesAmount in the FareCheck, Book and Retrieve responses.'],
    actual: `FareCheck / Book: "paxTotalAncillaryAmount": ${amt(p(bk).paxTotalAncillaryAmount)}, "totalAncillariesAmount": ${amt(d(bk).totalAncillariesAmount)}\nRetrieve:        "paxTotalAncillaryAmount": ${amt(p(rt).paxTotalAncillaryAmount)}, "totalAncillariesAmount": ${amt(d(rt).totalAncillariesAmount)}`,
    actualNote: `Reconciliation per passenger: base ${amt(p(bk).paxBaseAmount)} + tax ${amt(p(bk).paxTotalTaxAmount)} + ancillary + bundle ${amt(p(bk).paxTotalBundlesAmount)} must equal paxTotalAmount ${amt(p(bk).paxTotalAmount)}. With 399.52 the sum is 5658.01 (off by 102.08); with 297.44 it is 5555.93 (matches). Grand total ${amt(d(bk).totalAmount)} is the same in all three responses.`,
    expected: `"paxTotalAncillaryAmount": ${amt(p(rt).paxTotalAncillaryAmount)}   // or 399.52 — the same value in FareCheck, Book and Retrieve`,
    expectedNote: 'The same ancillary amount in every response for the same booking, and paxTotalAmount = base + tax + ancillary + bundle (SPEC.md §2.1 reconciliation: per-passenger parts must add up to paxTotalAmount).',
    api: 'Book', corr: `FareCheck \`${corr(fc)}\`, Book \`${corr(bk)}\`, Retrieve \`${corr(rt)}\`.`,
    severity: 'High', severityWhy: 'A core financial breakdown field is inconsistent across responses for the same booking; the flow completes and the wrong figure propagates into invoices and receipts.',
    evidenceActual: `{\n  "Book.selectedOffer.passengerFareBreakdown[0]": { "paxBaseAmount": ${amt(p(bk).paxBaseAmount)}, "paxTotalTaxAmount": ${amt(p(bk).paxTotalTaxAmount)}, "paxTotalAncillaryAmount": ${amt(p(bk).paxTotalAncillaryAmount)}, "paxTotalBundlesAmount": ${amt(p(bk).paxTotalBundlesAmount)}, "paxTotalAmount": ${amt(p(bk).paxTotalAmount)} },\n  "Retrieve.selectedOffer.passengerFareBreakdown[0]": { "paxBaseAmount": ${amt(p(rt).paxBaseAmount)}, "paxTotalTaxAmount": ${amt(p(rt).paxTotalTaxAmount)}, "paxTotalAncillaryAmount": ${amt(p(rt).paxTotalAncillaryAmount)}, "paxTotalBundlesAmount": ${amt(p(rt).paxTotalBundlesAmount)}, "paxTotalAmount": ${amt(p(rt).paxTotalAmount)} }\n}`,
    evidenceExpected: `{\n  "Book.selectedOffer.passengerFareBreakdown[0].paxTotalAncillaryAmount": ${amt(p(rt).paxTotalAncillaryAmount)},\n  "Retrieve.selectedOffer.passengerFareBreakdown[0].paxTotalAncillaryAmount": ${amt(p(rt).paxTotalAncillaryAmount)}\n}`,
    impact: 'Invoices and receipts built from the passenger breakdown disagree with the total, and price-reconciliation checks fail in FareCheck and Book. A consumer that shows the Book response to the traveller shows an ancillary amount that is 102.08 higher than what Retrieve later reports for the same booking.',
    calls: c, labels: c.map((r, i) => `V2_COK-SHJ_${r.endpoint}`)
  }));
}
// ---------- BUG-03 occupied seats carry price details ----------
{
  const c = noSearch(of('XLSX-C')); const sm = c.find(r => r.endpoint === 'SeatMap'); const pd = sm.response.passengersDetails || {};
  let occ = 0, ent = 0, outside = 0, zero = 0, nonzero = null, ex = null; const status = {};
  for (const [seg, dd] of Object.entries(sm.response.seatMapDetails || {})) for (const row of dd.rows || []) for (const cell of row.cells || []) { const cd = cell.cellDetails; if (!cd) continue; status[cd.cellAvailability] = (status[cd.cellAvailability] || 0) + 1;
    if (cd.cellAvailability === 'Occupied') { occ++; const sp = cd.seatPriceDetailsByPassenger; if (sp) { ex = ex || { cellCode: cd.cellCode, sp }; for (const [px, e] of Object.entries(sp)) { ent++; const allow = new Set([].concat(...Object.values(((pd[px] || {}).passengersSeatMapAvailability || {})[seg] || {}))); if (!allow.has(cd.cellCode)) outside++; if (amt(e.totalPrice) === 0) zero++; else nonzero = nonzero || { cellCode: cd.cellCode, px, e }; } } } }
  idx.push(writeBug(3, 'SeatMap_seatPriceDetailsByPassenger', {
    title: '[V2][AirArabiaPlus][SeatMap] – Occupied Seats Carry Per-Passenger Price Details (seatPriceDetailsByPassenger Should Be Null)',
    description: `In a SeatMap response with ${occ} Occupied cells, every Occupied cell still carries \`seatPriceDetailsByPassenger\` for each non-infant passenger (${ent} price entries in total), although the passengers' allow-lists do not contain these seats (${outside} of ${ent} entries refer to seats outside the allow-list). ${zero} of the ${ent} entries are priced 0.00 EGP and ${ent - zero} carry a non-zero amount. Re-verified 2026-11-16: still reproduces.`,
    steps: ['Search AirArabiaPlus / USA, COK → SHJ, 2026-12-12, 2 ADT + 1 CHD + 1 INF.', 'FareConfirm → AddPassenger → SeatMap.', 'Inspect every seatMapDetails[*].rows[*].cells[*].cellDetails with cellAvailability "Occupied".'],
    actual: `"cellCode": "${ex.cellCode}",\n"cellAvailability": "Occupied",\n"seatPriceDetailsByPassenger": ${J(ex.sp).replace(/\n/g, '\n')}`,
    actualNote: `Cell counts in this response: ${JSON.stringify(status)}. Consumers must filter on cellAvailability; the price entries for Occupied seats are misleading (a 0.00 total can read as a free selectable seat).${nonzero ? ` Example of a non-zero Occupied entry: cell ${nonzero.cellCode}, passenger ${nonzero.px}: ${JSON.stringify(nonzero.e.totalPrice)}.` : ''}`,
    expected: `"cellAvailability": "Occupied",\n"seatPriceDetailsByPassenger": null`,
    expectedNote: 'Occupied (and Blocked) cells are not sellable, so no per-passenger price should be returned; null (or omitted) is the consistent shape.',
    api: 'SeatMap', corr: `\`${corr(sm)}\` (SeatMap).`,
    severity: 'Medium', severityWhy: 'Non-blocking, but it breaks consumers that treat any cell with price details as selectable, and the response is inflated with entries that cannot be used.',
    evidenceActual: `{\n  "cellCode": "${ex.cellCode}",\n  "cellAvailability": "Occupied",\n  "seatPriceDetailsByPassenger": ${J(ex.sp).replace(/\n/g, '\n  ')}\n}`,
    evidenceExpected: `{\n  "cellCode": "${ex.cellCode}",\n  "cellAvailability": "Occupied",\n  "seatPriceDetailsByPassenger": null\n}`,
    impact: `A seat-selection UI that renders a price for every cell with seatPriceDetailsByPassenger shows prices (including 0.00 EGP) on seats that are already taken; ${ent} price entries per seat map have to be filtered out by the consumer.`,
    calls: c, labels: c.map(r => `V2_COK-SHJ_2ADT-1CHD-1INF_${r.endpoint}`)
  }));
}
// ---------- BUG-04 ParentPaxRefId ----------
{
  const c = noSearch(of('XLSX-D')); const ap = c.find(r => r.endpoint === 'AddPassenger'), bk = c.find(r => r.endpoint === 'Book'), rt = c.find(r => r.endpoint === 'Retrieve');
  const refs = r => (r.response.selectedOffer.passengerFareBreakdown || []).map(p => p.passengerRefId);
  idx.push(writeBug(4, 'AddPassenger_ParentPaxRefId', {
    title: '[V2][AirArabiaPlus][AddPassenger] – ParentPaxRefId Is Ignored: The Infant Is Attached to the First Adult',
    description: `With two adults and an infant declared under Pax2 (the second adult) in AddPassenger, the booking attaches the infant to the first adult: the fare-breakdown, passengersList and tickets references are \`I3/A1\` in both Book and Retrieve. Re-verified 2026-11-16: still reproduces (PNR ${bk.response.pnr}).`,
    steps: ['Search AirArabiaPlus / USA, COK → SHJ, 2026-12-12, 2 ADT + 1 INF.', 'FareConfirm.', 'AddPassenger with Pax1 ADT, Pax2 ADT, Pax3 INF with `"ParentPaxRefId": "Pax2"`.', 'Book, then Retrieve; read selectedOffer.passengerFareBreakdown[].passengerRefId and the keys of passengersList and tickets.'],
    actual: `"passengerRefId": "I3/A1"`,
    actualNote: `Book: fare-breakdown refs [${refs(bk).join(', ')}], passengersList keys [${Object.keys(bk.response.passengersList || {}).join(', ')}], tickets keys [${Object.keys(bk.response.tickets || {}).join(', ')}]. Retrieve returns the same: [${refs(rt).join(', ')}]. The wrong adult is responsible for the infant.`,
    expected: `"passengerRefId": "I3/A2"`,
    expectedNote: 'The infant must be linked to the adult named in ParentPaxRefId (Pax2 → A2).',
    api: 'AddPassenger', corr: `AddPassenger \`${corr(ap)}\`, Book \`${corr(bk)}\`, Retrieve \`${corr(rt)}\`. The defect is visible in the Book and Retrieve responses.`,
    severity: 'High', severityWhy: 'An identity/linkage field is wrong on a booking that completes, so the wrong adult carries the infant into name changes, check-in and manifests.',
    evidenceActual: `{\n  "sentInAddPassenger": { "Pax3": { "passengerTypeCode": "INF", "ParentPaxRefId": "Pax2" } },\n  "Book.selectedOffer.passengerFareBreakdown[].passengerRefId": ${JSON.stringify(refs(bk))},\n  "Retrieve.selectedOffer.passengerFareBreakdown[].passengerRefId": ${JSON.stringify(refs(rt))}\n}`,
    evidenceExpected: `{\n  "Book.selectedOffer.passengerFareBreakdown[].passengerRefId": ["A2", "A1", "I3/A2"],\n  "Retrieve.selectedOffer.passengerFareBreakdown[].passengerRefId": ["A2", "A1", "I3/A2"]\n}`,
    impact: 'The infant is always attached to the first adult regardless of the declared parent, so a family travelling with the infant on the second adult gets a booking where the wrong adult is responsible for the infant; this can cause name-change and check-in problems at the airline.',
    calls: c, labels: c.map(r => `V2_COK-SHJ_2ADT-1INF_${r.endpoint}`)
  }));
}
// ---------- BUG-05 voidCapability ----------
{
  const c = noSearch(of('XLSX-E')).filter(r => r.endpoint !== 'CancelAfterHold'); const f = noSearch(of('XLSX-F')).find(r => r.endpoint === 'FareConfirmAfterHold');
  const g = e => c.find(r => r.endpoint === e); const hold = g('Hold'), rp = g('FareConfirmAfterHold'), rt = g('Retrieve');
  const calls = [...c, f]; const labels = [...c.map(r => `V2_COK-SHJ_1ADT_${r.endpoint}`), 'V2_SHJ-COK_1ADT-1CHD-1INF_FareConfirmAfterHold'];
  idx.push(writeBug(5, 'FareConfirmAfterHold_voidCapability', {
    title: '[V2][AirArabiaPlus][FareConfirmAfterHold] – voidCapability Returned as "None" Instead of "VoidNotAllowed" in FareConfirmAfterHold (PnrReprice) Response',
    description: `The PnrReprice (FareConfirmAfterHold) response returns \`"voidCapability": "None"\`, while Hold and Retrieve return \`"VoidNotAllowed"\` for the same booking. In the original run (20261109) the key was \`null\`; on 2026-11-16 it is the string "None", so the defect is still present in a different form. Reproduced on two bookings (${hold.response.pnr} 1 ADT, and a 1 ADT + 1 CHD + 1 INF hold).`,
    steps: ['Search AirArabiaPlus / USA, COK → SHJ, 2026-12-12, 1 ADT.', 'FareConfirm → AddPassenger → Hold.', 'POST /api/v2/FlightBooking/PnrReprice with the hold\'s pnr, gdsPNR, bookingToken and surName.', 'Retrieve the same booking and compare voidCapability across Hold, PnrReprice and Retrieve.'],
    actual: `"voidCapability": "None"`,
    actualNote: `Hold: "${hold.response.voidCapability}" · FareConfirmAfterHold: "${rp.response.voidCapability}" · Retrieve: "${rt.response.voidCapability}". The re-price step reports a value that is not part of the voidCapability definition used by the other responses.`,
    expected: `"voidCapability": "VoidNotAllowed"`,
    expectedNote: 'VoidUnified: one definition of voidCapability in every response that returns a booking (Hold, BookAfterHold, Book, Retrieve already return "VoidNotAllowed" for this booking).',
    api: 'FareConfirmAfterHold', corr: `FareConfirmAfterHold \`${corr(rp)}\` (Hold \`${corr(hold)}\`, Retrieve \`${corr(rt)}\`).`,
    severity: 'Medium', severityWhy: 'Non-blocking, but the void capability cannot be used from the re-price step and the mapping is inconsistent with the other booking responses.',
    evidenceActual: `{\n  "Hold.voidCapability": "${hold.response.voidCapability}",\n  "FareConfirmAfterHold.voidCapability": "${rp.response.voidCapability}",\n  "Retrieve.voidCapability": "${rt.response.voidCapability}"\n}`,
    evidenceExpected: `{\n  "Hold.voidCapability": "VoidNotAllowed",\n  "FareConfirmAfterHold.voidCapability": "VoidNotAllowed",\n  "Retrieve.voidCapability": "VoidNotAllowed"\n}`,
    impact: 'A consumer that decides whether a Void button/flow is allowed from the voidCapability of the latest response gets "None" after re-pricing a hold and a different value after the next Retrieve; any logic that switches on the enumerated values must special-case this response.',
    calls, labels
  }));
}
// ---------- BUG-06 FareCheck rejects offered services ----------
{
  const b80 = of('XLSX-Bb-66580'), b89 = of('XLSX-Bb-66589'), b24 = of('XLSX-Bb-66624'); const s80 = noSearch(b80.slice(0, 7)), s89 = noSearch(b89.slice(7, 14)), ok24 = b24.slice(7, 14).filter(r => r.endpoint === 'FareCheck');
  const calls = [...s80, ...s89, ...ok24]; const labels = [...s80.map(r => `V2_COK-SHJ_66580_1ADT_${r.endpoint}`), ...s89.map(r => `V2_COK-SHJ_66589_1ADT-1CHD-1INF_${r.endpoint}`), 'V2_COK-SHJ_66624_1ADT-1CHD-1INF_FareCheck_works'];
  const f80 = s80.find(r => r.endpoint === 'FareCheck'), f89 = s89.find(r => r.endpoint === 'FareCheck');
  const ctxv = r => ((r.response.Context || [])[0] || {}).Value;
  idx.push(writeBug(6, 'FareCheck_ServicesNotAvailable', {
    title: '[V2][AirArabiaPlus][FareCheck] – Services Offered by GetAncillary/SeatMap Are Rejected as "Not Available" at FareCheck (Bundle Flows Fail Depending on the Bundle Code)',
    description: `Items that GetAncillary and SeatMap just offered are rejected by FareCheck with HTTP 409 \`NDC-INT-UNC-Z9999\` (generic code, the reason is only in \`Context[].Value\`). On 2026-11-16: bundle 66580 (1 ADT) → "Selected Meals are not available at the moment [LKRRC]"; bundle 66589 (1 ADT + 1 CHD + 1 INF, no seat requested for the infant) → "Passenger type not supported [Seat is not available for infants]", reproduced on 3 of 3 attempts; in another run FareCheck rejected the first chosen meal of 66589 (1 ADT) and succeeded only after re-picking a different meal. Bundle 66624 completes (control, last call). The original run recorded 19 such failures.`,
    steps: ['Search AirArabiaPlus / USA, COK → SHJ, 2026-12-12 (1 ADT, or 1 ADT + 1 CHD + 1 INF).', 'FareConfirm → GetOfferBundles → select bundle 66580 or 66589 → AddPassenger → GetAncillary(selectedBundles) → SeatMap.', 'FareCheck with the first meal, baggage and seat returned by GetAncillary/SeatMap (no seat for the infant).', 'Repeat with bundle 66624 for comparison — it succeeds.'],
    actual: `{\n  "Status": 409,\n  "ErrorCode": "NDC-INT-UNC-Z9999",\n  "ErrorMessage": "NDC-INT-UNC-Z9999",\n  "Context": [ { "Name": "...", "Value": "${ctxv(f80).split(' Trace Id')[0]}" } ]\n}`,
    actualNote: `Bundle 66589 with an infant returns "${ctxv(f89).split(' Trace Id')[0]}" for a request that contains no infant seat. The generic Z9999 code hides why.`,
    expected: `Only sellable meals, baggage and seats are returned by GetAncillary/SeatMap, and a rejected selection carries a classified error code (not NDC-INT-UNC-Z9999).`,
    expectedNote: 'GetAncillary is the source of truth for what can be selected (SPEC.md §2.6); a selection taken from it must be accepted by FareCheck.',
    api: 'FareCheck', corr: `66580: \`${corr(f80)}\`; 66589 + INF: \`${corr(f89)}\`.`,
    severity: 'High', severityWhy: 'Valid ancillary/bundle selections cannot be priced or booked for some bundle codes, so those bundle sales are lost; the generic error code makes the cause impossible to see from the API.',
    evidenceActual: `{\n  "bundle 66580 (1 ADT)": { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context[0].Value": "${ctxv(f80).split(' Trace Id')[0]}" },\n  "bundle 66589 (1 ADT+1 CHD+1 INF)": { "Status": 409, "ErrorCode": "NDC-INT-UNC-Z9999", "Context[0].Value": "${ctxv(f89).split(' Trace Id')[0]}" }\n}`,
    evidenceExpected: `{\n  "FareCheck": { "Status": 200, "selectedOffer": "<priced with the selected meal, baggage and seats>" }\n}`,
    impact: 'Bundle conversion is lost: some bundle codes (66580, and 66589 for itineraries with an infant) cannot be completed even though the services were offered, so the consumer must retry with another bundle or drop the ancillaries. The generic Z9999 code does not let the caller tell a supplier stock-out from a mapping error.',
    calls, labels
  }));
}
// ---------- README ----------
fs.writeFileSync(path.join(ROOT, 'README.md'), `# AirArabiaPlus / USA — bugs re-verified on stg-ne (2026-11-16)

Source: \`Resources/AirArabiaPlus_bugs.xlsx\` (AirArabiaPlus rows), re-verified live on ${BASE_URL} with credentialsSelector USA. All six defects still reproduce. Request/response files are the full captures of this round (x-api-key and raw supplier payloads redacted).

${idx.map(i => `- [BUG-${i.nn}](${i.folder}/${i.folder}.md) — ${i.title} (${i.severity}) — ${i.pairs} request/response pairs`).join('\n')}
`);
console.log(JSON.stringify(idx, null, 1));
