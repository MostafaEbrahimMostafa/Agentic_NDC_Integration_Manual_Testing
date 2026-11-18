#!/usr/bin/env node
// render-xlsx.js - stakeholder spreadsheet rendered by script from its source (Enhancement Plan Step 5).
// The LLM never retypes a spreadsheet: this script copies every cell from the source.
//   .csv   -> same columns, same order, same cells (test cases, Bug_Registry.csv, ...)
//   .jsonl -> one row per test_case, columns from ../contracts/report.contract.json resultsColumns
// Every cell is written as text (no formulas, no number coercion), the header row is bold, frozen and
// filtered. Output is byte-stable for the same input (diff-friendly rule).
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/render-xlsx.js <source.csv|run.jsonl> [--out <file.xlsx>] [--sheet <name>]
// Default --out: the source path with .xlsx. Then check it: validate-xlsx.js <file.xlsx> --source <source>.
'use strict';
const fs = require('fs');
const path = require('path');
const { parseArgs, usage, rel } = require('./lib/result.js');
const { writeZip, xmlEscape } = require('./lib/zip.js');
const { readTable } = require('./lib/table-source.js');

const EXCEL_CELL_LIMIT = 32767;

function colName(i) { let s = ''; i++; while (i) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }

function buildXlsx(rows, sheetName) {
  const width = rows[0].length;
  rows.forEach((r, i) => r.forEach((c, k) => { if (c.length > EXCEL_CELL_LIMIT) throw new Error(`row ${i + 1} column ${k + 1}: ${c.length} chars exceeds the Excel cell limit`); }));
  const widths = rows[0].map((_, k) => Math.min(60, Math.max(8, ...rows.slice(0, 200).map(r => Math.min(60, String(r[k] || '').split('\n')[0].length + 2)))));
  const sheetRows = rows.map((r, i) => {
    const cells = r.map((v, k) => v === '' ? '' : `<c r="${colName(k)}${i + 1}" t="inlineStr"${i === 0 ? ' s="1"' : ' s="2"'}><is><t xml:space="preserve">${xmlEscape(v)}</t></is></c>`).join('');
    return `<row r="${i + 1}">${cells}</row>`;
  }).join('');
  const last = `${colName(width - 1)}${rows.length}`;
  const sheet = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    '<cols>' + widths.map((w, k) => `<col min="${k + 1}" max="${k + 1}" width="${w}" customWidth="1"/>`).join('') + '</cols>' +
    `<sheetData>${sheetRows}</sheetData><autoFilter ref="A1:${last}"/></worksheet>`;
  const styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
    '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
    '<fill><patternFill patternType="solid"><fgColor rgb="FFDDEBF7"/><bgColor indexed="64"/></patternFill></fill></fills>' +
    '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
    '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
    '<cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
    '<xf numFmtId="49" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyNumberFormat="1"/>' +
    '<xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs>' +
    '</styleSheet>';
  const name = xmlEscape(String(sheetName || 'Sheet1').replace(/[\\/?*[\]:]/g, '_').slice(0, 31));
  return writeZip([
    { name: '[Content_Types].xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>' },
    { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
    { name: 'xl/workbook.xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${name}" sheetId="1" r:id="rId1"/></sheets><definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">'${name.replace(/'/g, "''")}'!$A$1:$${colName(width - 1)}$${rows.length}</definedName></definedNames></workbook>` },
    { name: 'xl/_rels/workbook.xml.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>' },
    { name: 'xl/worksheets/sheet1.xml', data: sheet },
    { name: 'xl/styles.xml', data: styles }
  ]);
}

function renderXlsx(source, out, sheet) {
  const { kind, rows } = readTable(source);
  out = out || source.replace(/\.(csv|jsonl)$/i, '.xlsx');
  fs.writeFileSync(out, buildXlsx(rows, sheet || (kind === 'jsonl' ? 'Results' : path.basename(source).replace(/\.csv$/i, ''))));
  return { out, rows: rows.length - 1, columns: rows[0].length };
}

module.exports = { renderXlsx, buildXlsx };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), []);
  if (!args._[0]) return usage('usage: node render-xlsx.js <source.csv|run.jsonl> [--out <file.xlsx>] [--sheet <name>]');
  try {
    const r = renderXlsx(args._[0], args.out, args.sheet);
    console.log(`rendered ${rel(r.out)}  (${r.rows} rows x ${r.columns} columns). Check: node .claude/Skills/_shared/scripts/validate-xlsx.js ${rel(r.out)} --source ${rel(args._[0])}`);
  } catch (e) { console.error('render-xlsx: ' + e.message); process.exitCode = 2; }
}
