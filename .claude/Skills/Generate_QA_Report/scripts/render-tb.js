// Builds <slug>_TimeBreakdown.html from the .jsonl per log-schema.md's execution-time accounting rule.
const fs = require('fs'), path = require('path');
const slug = process.argv[2];
const repo = 'C:/Users/sheen/Desktop/resources/NDC Manual Testing';
const dir = repo + '/NDC_Integration/Artifacts/Logs';
const tpl = fs.readFileSync(repo + '/.claude/Skills/Generate_QA_Report/references/time-breakdown-template.html', 'utf8');
const L = fs.readFileSync(path.join(dir, slug + '.jsonl'), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rs = L.find(x => x.type === 'run_start'); const tcs = L.filter(x => x.type === 'test_case');
const T = s => Date.parse(s);
const head = tpl.slice(tpl.indexOf('<!DOCTYPE html>'), tpl.indexOf('<!-- DATA: back-link'));
const script = tpl.slice(tpl.indexOf('<div class="tb-modal')).replace(/<!--[\s\S]*?-->/g, '');
const fmtDur = ms => { const s = Math.round(ms / 1000); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60; return (h ? h + 'h ' : '') + (h || m ? m + 'm ' : '') + r + 's'; };
const fmtS = s => fmtDur(s * 1000);
const hms = ms => new Date(ms).toISOString().slice(11, 19);
const utc = ms => new Date(ms).toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
const pct = (v, tot) => (tot ? (v / tot * 100) : 0).toFixed(1);

const tsAll = []; L.forEach(x => ['started_at', 'ended_at', 'at', 'reporting_ended_at', 'timestamp'].forEach(k => { if (x[k]) tsAll.push(T(x[k])); }));
const startMs = T(rs.started_at), endMs = Math.max(...tsAll), total = endMs - startMs;

// execution = union of test-case spans + hop spans
const iv = []; tcs.forEach(t => { if (t.started_at && t.timestamp) iv.push([T(t.started_at), T(t.timestamp), t.tc_id]); (t.hops || []).forEach(h => { if (h.started_at && h.ended_at) iv.push([T(h.started_at), T(h.ended_at), t.tc_id]); }); });
iv.sort((a, b) => a[0] - b[0]);
const merged = []; iv.forEach(i => { const last = merged[merged.length - 1]; if (last && i[0] <= last[1]) { if (i[1] > last[1]) { last[1] = i[1]; last[3] = i[2]; } } else merged.push([i[0], i[1], i[2], i[2]]); });
const exec = merged.reduce((s, m) => s + (m[1] - m[0]), 0);
const wait = tcs.reduce((s, t) => s + (t.waiting_ms || 0), 0) + L.filter(x => x.type === 'wait').reduce((s, w) => s + (T(w.ended_at) - T(w.started_at)), 0);
const claude = L.filter(x => x.type === 'ai_operation').reduce((s, a) => s + (T(a.ended_at) - T(a.started_at)), 0);
const ops = L.filter(x => x.type === 'reporting_op');
const repTc = tcs.reduce((s, t) => s + ((t.reporting_started_at && t.reporting_ended_at) ? T(t.reporting_ended_at) - T(t.reporting_started_at) : 0), 0);
const repOps = ops.reduce((s, o) => s + (T(o.ended_at) - T(o.started_at)), 0);
const report = repTc + repOps;
const r = ms => Math.round(ms / 1000);
const dTot = r(total), dExec = r(exec), dWait = r(wait), dClaude = r(claude), dRep = r(report), dOver = dTot - dExec - dWait - dClaude - dRep;
const acc = dExec + dWait + dClaude + dRep + dOver;

// overhead gaps: timeline minus (exec intervals U reporting intervals)
const cover = merged.map(m => [m[0], m[1], 'exec', m[2], m[3]]);
tcs.forEach(t => { if (t.reporting_started_at && t.reporting_ended_at) cover.push([T(t.reporting_started_at), T(t.reporting_ended_at), 'rep']); });
ops.forEach(o => cover.push([T(o.started_at), T(o.ended_at), 'rep']));
cover.sort((a, b) => a[0] - b[0]);
const gaps = []; let cur = startMs, prev = null;
cover.forEach(c => { if (c[0] > cur) gaps.push({ from: cur, to: c[0], prev, next: c }); if (c[1] > cur) cur = c[1]; prev = c; });
if (endMs > cur) gaps.push({ from: cur, to: endMs, prev, next: null });

const evs = [];
tcs.forEach(t => { if (t.started_at && t.timestamp) evs.push({ s: T(t.started_at), e: T(t.timestamp), label: t.tc_id + ' (whole test case)', rank: 1 }); (t.hops || []).forEach(h => evs.push({ s: T(h.started_at), e: T(h.ended_at), label: t.tc_id + ' hop ' + h.hop + ' - ' + h.endpoint, rank: 2 })); if (t.reporting_started_at) evs.push({ s: T(t.reporting_started_at), e: T(t.reporting_ended_at), label: t.tc_id + ' log write', rank: 2 }); });
ops.forEach(o => evs.push({ s: T(o.started_at), e: T(o.ended_at), label: o.operation, rank: 2 }));
L.filter(x => x.type === 'phase').forEach(p => evs.push({ s: T(p.at), e: T(p.at), label: 'Phase "' + p.name + '" ' + (p.event === 'start' ? 'started' : 'ended'), rank: 0 }));
evs.push({ s: startMs, e: startMs, label: 'Run started (run_start)', rank: 0 });
const before = ms => { const c = evs.filter(x => Math.abs(x.e - ms) <= 60).sort((a, b) => b.rank - a.rank)[0]; return c ? (c.rank === 0 ? c.label + ' at ' + hms(c.e) : c.label + ', ended ' + hms(c.e)) : '-'; };
const after = ms => { const c = evs.filter(x => Math.abs(x.s - ms) <= 60).sort((a, b) => b.rank - a.rank)[0]; return c ? (c.rank === 0 ? c.label + ' at ' + hms(c.s) : c.label + ', started ' + hms(c.s)) : '-'; };
const details = L.filter(x => x.type === 'overhead_detail');
const big = gaps.filter(g => g.to - g.from >= 2000), small = gaps.filter(g => g.to - g.from < 2000 && g.to - g.from >= 1);
const rows = big.map(g => { const d = [...details].reverse().find(x => Math.abs(T(x.from) - g.from) <= 3000); return { from: g.from, to: g.to, len: g.to - g.from, label: d ? d.label : 'Gap after ' + before(g.from) + ' and before ' + after(g.to), steps: d ? d.steps : ['No notes were recorded for this window. It is the time between the two events shown above that no test case, wait, AI operation or reporting operation accounts for.'], before: before(g.from), after: after(g.to) }; });
if (small.length) rows.push({ from: small[0].from, to: small[small.length - 1].to, len: small.reduce((s, g) => s + (g.to - g.from), 0), label: 'Short gaps between the per-test-case log writes (' + small.length + ' gaps under 2 seconds)', steps: ["Each test case's log line and Markdown re-render ran back to back; these are the sub-2-second pauses between one render finishing and the next one starting."], before: 'the per-test-case log writes', after: 'the per-test-case log writes', agg: true });
rows.sort((a, b) => a.from - b.from);
let rowSecs = rows.map(x => Math.round(x.len / 1000)); const diff = dOver - rowSecs.reduce((a, b) => a + b, 0);
if (rows.length && diff) { let mi = rowSecs.indexOf(Math.max(...rowSecs)); rowSecs[mi] += diff; }

// phases
const phases = []; ['Test Execution', 'Bug Reporting', 'Report Generation'].forEach(n => { const s = L.find(x => x.type === 'phase' && x.name === n && x.event === 'start'), e = [...L].reverse().find(x => x.type === 'phase' && x.name === n && x.event === 'end'); if (s && e) phases.push([n, T(s.at), T(e.at)]); });

let b = '';
b += `<a class="tb-back" href="./${slug}.html">&larr; Back to QA Execution Report</a>\n\n<div class="header">\n<h1>Execution Time Breakdown</h1>\n</div>\n\n`;
b += `<div class="meta-card dashboard-card">\n<div class="field-row">\n<div class="field"><span class="k">Total Duration</span><span class="v">${fmtS(dTot)}</span></div>\n<div class="field"><span class="k">Execution Start</span><span class="v">${utc(startMs)}</span></div>\n<div class="field"><span class="k">Execution End</span><span class="v">${utc(endMs)}</span></div>\n</div>\n</div>\n\n`;
const cats = [['exec', 'Test Case Execution', 'time-exec', dExec], ['wait', 'Waiting', 'time-wait', dWait], ['claude', 'Claude / AI Processing', 'time-claude', dClaude], ['report', 'Reporting', 'time-report', dRep], ['overhead', 'Other / Overhead', 'time-overhead', dOver]];
b += `<h2 class="section-num">1. Time Breakdown</h2>\n<div class="tb-cat-cards">\n` + cats.map(c => `<div class="tb-cat-card ${c[0]} dashboard-card"><div class="val">${fmtS(c[3])}</div><div class="pct">${pct(c[3], dTot)}%</div><div class="lbl"><span class="swatch" style="background:var(--${c[2]})"></span>${c[1]}</div></div>`).join('\n') + `\n</div>\n\n`;
b += `<div class="dashboard-card">\n<div class="tb-bars">\n` + cats.map(c => `<div class="tb-bar-row"><div class="tb-bar-label"><span class="swatch" style="display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--${c[2]})"></span>${c[1]}</div><div class="tb-bar-track"><div class="tb-bar-fill" style="width:${pct(c[3], dTot)}%;background:var(--${c[2]})"></div></div><div class="tb-bar-value">${fmtS(c[3])} &middot; ${pct(c[3], dTot)}%</div></div>`).join('\n') + `\n</div>\n\n`;
b += Math.abs(acc - dTot) > 1 ? `<div class="tb-warning"><div class="w-title">&#9888; Time accounting discrepancy detected</div>\nTotal Duration: ${fmtS(dTot)}<br>Accounted Duration: ${fmtS(acc)}<br>Difference: ${fmtS(Math.abs(acc - dTot))}</div>\n` : `<div class="tb-reconcile">Accounted Time: <b>${fmtS(acc)}</b> &nbsp;=&nbsp; Total Duration: <b>${fmtS(dTot)}</b> &nbsp;&#10003;</div>\n`;
let ohBlock = ''; if (dOver > 0) ohBlock = `
<div class="tb-overhead-box">
<div class="oh-title">What's in Other / Overhead (${fmtS(dOver)}) &mdash; click a row for details</div>
<div class="tb-oh-rows">
` + rows.map((x, i) => { const det = { title: x.label, start: utc(x.from), end: utc(x.to), duration: fmtS(rowSecs[i]), share: pct(rowSecs[i] * 1000, dTot * 1000) + '% of total', before: x.before, after: x.after, steps: x.steps, note: x.agg ? 'Sum of many short gaps, spread between ' + hms(x.from) + ' and ' + hms(x.to) + '.' : 'Derived from the log timestamps: the time in this window is not covered by any test-case span, wait, AI operation or reporting operation.' }; return `<div class="tb-oh-row tb-oh-click" role="button" tabindex="0" data-detail="${esc(JSON.stringify(det)).replace(/"/g, '&quot;')}"><span class="oh-label">${esc(x.label)}</span><span class="oh-val">${fmtS(rowSecs[i])}</span><span class="oh-more">Details &rsaquo;</span></div>`; }).join('\n') + '\n</div>\n</div>\n';
b += `</div>\n\n`;
const te = phases.find(p => p[0] === 'Test Execution');
b += `<h2 class="section-num">2. Execution Phases</h2>\n${te ? `<div class="tb-phase-note">Note: "Test Execution" here is wall-clock time for the whole phase (${fmtDur(te[2] - te[1])}), including the setup/between-test-case/wrap-up gaps &mdash; it's not the same number as the "Test Case Execution" category above (${fmtS(dExec)}), which counts only the test cases' own spans. The difference between them is exactly the Overhead breakdown in section 1.</div>\n` : ''}<div class="dashboard-card tb-table-wrap">\n<table class="tb-table">\n<thead><tr><th>Phase</th><th>Start</th><th>End</th><th class="num">Duration</th><th class="num">%</th></tr></thead>\n<tbody>\n${phases.map(p => `<tr><td>${p[0]}</td><td>${hms(p[1])}</td><td>${hms(p[2])}</td><td class="num">${fmtDur(p[2] - p[1])}</td><td class="num">${pct(p[2] - p[1], total)}%</td></tr>`).join('\n')}\n</tbody>\n</table>\n</div>\n\n`;
const ai = L.filter(x => x.type === 'ai_operation');
b += `<h2 class="section-num">3. Claude / AI Operations</h2>\n<div class="dashboard-card tb-table-wrap">\n${ai.length ? `<table class="tb-table">\n<thead><tr><th>Operation</th><th>Related TC</th><th>Start</th><th>End</th><th class="num">Duration</th></tr></thead>\n<tbody>${ai.map(a => `<tr><td>${esc(a.operation)}</td><td>${a.related_tc_id || ''}</td><td>${hms(T(a.started_at))}</td><td>${hms(T(a.ended_at))}</td><td class="num">${fmtDur(T(a.ended_at) - T(a.started_at))}</td></tr>`).join('')}</tbody>\n</table>` : '<div class="empty">No AI operations recorded for this run.</div>'}\n</div>\n\n`;
b += `<h2 class="section-num">4. Reporting Breakdown</h2>\n<div class="dashboard-card tb-table-wrap">\n<table class="tb-table">\n<thead><tr><th>Operation</th><th class="num">Duration</th></tr></thead>\n<tbody>\n${ops.map(o => `<tr><td>${esc(o.operation)}</td><td class="num">${fmtDur(T(o.ended_at) - T(o.started_at))}</td></tr>`).join('\n')}\n${repTc ? `<tr><td>Per-test-case JSONL + Markdown writes (${tcs.length} test cases)</td><td class="num">${fmtDur(repTc)}</td></tr>` : ''}\n</tbody>\n<tfoot><tr><td><b>Total Reporting Time</b></td><td class="num"><b>${fmtS(dRep)}</b></td></tr></tfoot>\n</table>\n</div>\n\n`;

// per-TC rows
const slugCat = c => String(c || '').toLowerCase().replace(/[^a-z]+/g, '-');
const catList = []; tcs.forEach(t => { if (t.category && !catList.includes(t.category)) catList.push(t.category); });
const defectTcs = [...new Set(L.filter(x => x.type === 'finding' && x.kind === 'defect').map(x => x.related_tc_id))];
const opShare = (tcId) => ops.reduce((s, o) => { const ids = o.related_tc_ids || (o.operation === 'Bug Report Generation' ? defectTcs : null); if (ids && ids.includes(tcId)) return s + (T(o.ended_at) - T(o.started_at)) / ids.length; return s; }, 0);
let sumExecRows = 0, sumRepRows = 0;
const trs = tcs.map((t, i) => {
  const e = (t.started_at && t.timestamp) ? (T(t.timestamp) - T(t.started_at)) / 1000 : 0; sumExecRows += e;
  const rp = ((t.reporting_started_at && t.reporting_ended_at) ? (T(t.reporting_ended_at) - T(t.reporting_started_at)) : 0) + opShare(t.tc_id); sumRepRows += rp / 1000;
  const w = (t.waiting_ms || 0) / 1000, tot = e + w + rp / 1000;
  const title = t.title.replace(/^\[[^\]]*\]\[[^\]]*\]\s*/, '');
  return `<tr data-tcid="${t.tc_id}" data-title="${esc(title)}" data-status="${t.verdict}" data-cat="${slugCat(t.category)}">\n<td data-sort-v="${i + 1}">${i + 1}</td>\n<td>${t.tc_id}</td>\n<td>${esc(title)}</td>\n<td><span class="badge ${t.verdict}">${t.verdict}</span></td>\n<td data-sort-v="${T(t.started_at)}">${hms(T(t.started_at))}</td>\n<td data-sort-v="${T(t.timestamp)}">${t.timing === 'partial' ? '<span class="timing-partial">Timing: Partial</span>' : hms(T(t.timestamp))}</td>\n<td class="num" data-sort-v="${Math.round(e)}">${fmtS(Math.round(e))}</td>\n<td class="num" data-sort-v="${Math.round(w)}">${fmtS(Math.round(w))}</td>\n<td class="num" data-sort-v="0">0s</td>\n<td class="num" data-sort-v="${Math.round(rp / 1000)}">${fmtS(Math.round(rp / 1000))}</td>\n<td class="num" data-sort-v="${Math.round(tot)}">${fmtS(Math.round(tot))}</td>\n</tr>`;
}).join('\n');
const overlap = sumExecRows - exec / 1000;
b += `<h2 class="section-num">5. Test Case Time</h2>\n<div class="tc-toolbar dashboard-card">\n<input type="search" id="tcbSearch" placeholder="Search test case ID or title...">\n<select id="tcbStatusFilter">\n<option value="">All statuses</option>\n<option value="PASS">Passed</option>\n<option value="FAIL">Failed</option>\n<option value="BLOCKED">Blocked</option>\n</select>\n<select id="tcbCategoryFilter">\n<option value="">All categories</option>\n${catList.map(c => `<option value="${slugCat(c)}">${esc(c)}</option>`).join('\n')}\n</select>\n<button type="button" id="tcbReset">Reset</button>\n<span class="tc-count" id="tcbCount">${tcs.length} / ${tcs.length} shown</span>\n</div>\n<div class="tb-no-results js-hidden" id="tcbNoResults">No test cases match the current search/filter.</div>\n<div class="dashboard-card tb-table-wrap">\n<table class="tcb-table" id="tcbTable">\n<thead><tr>\n<th data-sort="idx" data-type="num">#</th>\n<th data-sort="tcid" data-type="text">Test Case ID</th>\n<th data-sort="title" data-type="text">Test Case</th>\n<th data-sort="status" data-type="text">Status</th>\n<th data-sort="start" data-type="num">Start</th>\n<th data-sort="end" data-type="num">End</th>\n<th data-sort="exec" data-type="num" class="num">Execution</th>\n<th data-sort="wait" data-type="num" class="num">Waiting</th>\n<th data-sort="claude" data-type="num" class="num">Claude</th>\n<th data-sort="report" data-type="num" class="num">Reporting</th>\n<th data-sort="total" data-type="num" class="num">Total</th>\n</tr></thead>\n<tbody>\n${trs}\n</tbody>\n</table>\n</div>\n`;
const runLevel = ops.filter(o => !o.related_tc_ids && o.operation !== 'Bug Report Generation').reduce((s, o) => s + (T(o.ended_at) - T(o.started_at)), 0);
b += `<div class="tb-reconcile">Execution column: rows sum to ${fmtDur(sumExecRows * 1000)}, minus ${fmtDur(overlap * 1000)} of overlap (test cases that share one live call or whose chains overlap), = ${fmtS(dExec)} Test Case Execution (section 1). Reporting column: rows sum to ${fmtDur(sumRepRows * 1000)}, plus ${fmtDur(runLevel)} of run-level reporting (final HTML and Time Breakdown, not attributable to one test case), = ${fmtS(dRep)} Reporting (section 1).</div>\n\n`;

// timeline
const tl = []; L.filter(x => x.type === 'phase').forEach(p => { if (p.name === 'Initialization') return; tl.push([T(p.at), `<b>${p.name}</b> ${p.event === 'start' ? 'started' : 'ended'}`]); }); tcs.forEach(t => tl.push([T(t.started_at), `${t.tc_id} started`])); tl.sort((a, c) => a[0] - c[0]); tl.push([endMs, 'Execution completed']);
b += `<h2 class="section-num">6. Timeline</h2>\n<div class="dashboard-card">\n<div class="tb-timeline">\n${tl.map(x => `<div class="tb-tl-row"><div class="tb-tl-time">${hms(x[0])}</div><div class="tb-tl-label">${x[1]}</div></div>`).join('\n')}\n</div>\n</div>\n\n`;
if (ohBlock) b += '<h2 class="section-num">7. Other / Overhead</h2>\n<div class="dashboard-card">' + ohBlock + '</div>\n\n';
b = b.replace(/<h2 class="section-num">([2-7]\. [^<]*)<\/h2>([\s\S]*?)(?=<h2 class="section-num">|$)/g, (m, title, body) => '<details class="tb-sec" open><summary>' + title + '</summary>' + body + '</details>\n');
b = b.replace('<details class="tb-sec" open>', '<div class="tc-actions">\n<button type="button" id="tbExpandAll">Expand all</button>\n<button type="button" id="tbCollapseAll">Collapse all</button>\n</div>\n<details class="tb-sec" open>');
fs.writeFileSync(path.join(dir, slug + '_TimeBreakdown.html'), head + b + script, 'utf8');
console.log(JSON.stringify({ total: dTot, exec: dExec, rep: dRep, over: dOver, acc, rows: rows.length, rowSum: rowSecs.reduce((a, b) => a + b, 0), overlap: Math.round(overlap) }));
