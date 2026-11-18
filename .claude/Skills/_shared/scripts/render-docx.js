#!/usr/bin/env node
// render-docx.js - stakeholder Word document rendered by script from a Markdown output (Enhancement Plan Step 5).
// The LLM never retypes a document: this script converts the .md the skills already produced
// (run report, bug report, analysis, RC re-test report) into .docx with the same headings, text and tables.
// Output is byte-stable for the same input (diff-friendly rule).
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/render-docx.js <source.md> [--out <file.docx>]
// Default --out: the source path with .docx. Then check it: validate-docx.js <file.docx> --source <source.md>.
'use strict';
const fs = require('fs');
const { parseArgs, usage, rel } = require('./lib/result.js');
const { writeZip, xmlEscape } = require('./lib/zip.js');
const { parseBlocks, inline } = require('./lib/markdown.js');

const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';

function runs(text, extraBold) {
  return inline(text).map(r => {
    const pr = (r.bold || extraBold ? '<w:b/>' : '') + (r.code ? '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/>' : '');
    return `<w:r>${pr ? '<w:rPr>' + pr + '</w:rPr>' : ''}<w:t xml:space="preserve">${xmlEscape(r.text)}</w:t></w:r>`;
  }).join('');
}
const para = (body, style, ppr) => `<w:p>${style || ppr ? '<w:pPr>' + (style ? `<w:pStyle w:val="${style}"/>` : '') + (ppr || '') + '</w:pPr>' : ''}${body}</w:p>`;

function table(rows) {
  const n = Math.max(...rows.map(r => r.length));
  const border = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(b => `<w:${b} w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/>`).join('');
  const tr = (r, head) => '<w:tr>' + (head ? '<w:trPr><w:tblHeader/></w:trPr>' : '') +
    Array.from({ length: n }, (_, k) => `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/>${head ? '<w:shd w:val="clear" w:color="auto" w:fill="DDEBF7"/>' : ''}</w:tcPr>${para(runs(r[k] || '', head), 'TableText')}</w:tc>`).join('') + '</w:tr>';
  return `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${border}</w:tblBorders><w:tblLayout w:type="autofit"/></w:tblPr>` +
    `<w:tblGrid>${Array.from({ length: n }, () => '<w:gridCol/>').join('')}</w:tblGrid>` +
    rows.map((r, i) => tr(r, i === 0)).join('') + '</w:tbl>' + para('', null, '<w:spacing w:after="0"/>');
}

function buildDocx(md) {
  const body = parseBlocks(md).map(b => {
    switch (b.type) {
      case 'h': return para(runs(b.text), b.level === 1 ? 'Title' : 'Heading' + Math.min(4, b.level - 1));
      case 'p': return para(runs(b.text));
      case 'li': {
        const ind = 360 + b.indent * 360;
        return para(`<w:r><w:t xml:space="preserve">${b.ordered ? xmlEscape(b.marker) + ' ' : '• '}</w:t></w:r>` + runs(b.text), null, `<w:ind w:left="${ind}" w:hanging="300"/><w:spacing w:after="40"/>`);
      }
      case 'code': return b.lines.map(l => para(`<w:r><w:t xml:space="preserve">${xmlEscape(l)}</w:t></w:r>`, 'CodeBlock')).join('') || para('', 'CodeBlock');
      case 'table': return table(b.rows);
      case 'quote': return para(runs(b.text), 'Quote');
      case 'hr': return para('', null, '<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="A6A6A6"/></w:pBdr>');
      default: return '';
    }
  }).join('');
  const doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${W}><w:body>${body}` +
    '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>';
  const st = (id, name, rpr, ppr, type) => `<w:style w:type="${type || 'paragraph'}" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/><w:qFormat/>${ppr ? '<w:pPr>' + ppr + '</w:pPr>' : ''}${rpr ? '<w:rPr>' + rpr + '</w:rPr>' : ''}</w:style>`;
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${W}>` +
    '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri" w:eastAsia="Calibri"/><w:sz w:val="21"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="100" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>' +
    st('Title', 'Title', '<w:b/><w:sz w:val="34"/><w:color w:val="1F3864"/>', '<w:spacing w:after="160"/><w:outlineLvl w:val="0"/>') +
    st('Heading1', 'heading 1', '<w:b/><w:sz w:val="28"/><w:color w:val="1F3864"/>', '<w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="0"/>') +
    st('Heading2', 'heading 2', '<w:b/><w:sz w:val="24"/><w:color w:val="2F5496"/>', '<w:keepNext/><w:spacing w:before="200" w:after="60"/><w:outlineLvl w:val="1"/>') +
    st('Heading3', 'heading 3', '<w:b/><w:sz w:val="22"/>', '<w:keepNext/><w:spacing w:before="160" w:after="40"/><w:outlineLvl w:val="2"/>') +
    st('Heading4', 'heading 4', '<w:b/><w:i/><w:sz w:val="21"/>', '<w:keepNext/><w:outlineLvl w:val="3"/>') +
    st('CodeBlock', 'Code Block', '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/><w:sz w:val="18"/>', '<w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/><w:spacing w:after="0" w:line="240" w:lineRule="auto"/>') +
    st('Quote', 'Quote', '<w:i/><w:color w:val="595959"/>', '<w:ind w:left="360"/>') +
    st('TableText', 'Table Text', '<w:sz w:val="19"/>', '<w:spacing w:after="0"/>') +
    '</w:styles>';
  return writeZip([
    { name: '[Content_Types].xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>' },
    { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>' },
    { name: 'word/_rels/document.xml.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>' },
    { name: 'word/document.xml', data: doc },
    { name: 'word/styles.xml', data: styles }
  ]);
}

function renderDocx(source, out) {
  out = out || source.replace(/\.md$/i, '.docx');
  fs.writeFileSync(out, buildDocx(fs.readFileSync(source, 'utf8')));
  return out;
}

module.exports = { renderDocx, buildDocx };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), []);
  if (!args._[0] || !/\.md$/i.test(args._[0])) return usage('usage: node render-docx.js <source.md> [--out <file.docx>]');
  try {
    const out = renderDocx(args._[0], args.out);
    console.log(`rendered ${rel(out)}. Check: node .claude/Skills/_shared/scripts/validate-docx.js ${rel(out)} --source ${rel(args._[0])}`);
  } catch (e) { console.error('render-docx: ' + e.message); process.exitCode = 2; }
}
