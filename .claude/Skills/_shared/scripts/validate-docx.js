#!/usr/bin/env node
// validate-docx.js - output contract check for a stakeholder Word document (Enhancement Plan Step 5).
// Rule: the .docx carries the same headings (same order), the same table cells and every text line
// of its source .md. The source is read line by line here (not through the renderer's block parser),
// so a renderer that drops content cannot pass.
//
// Usage (from the repo root):
//   node .claude/Skills/_shared/scripts/validate-docx.js <file.docx> --source <source.md> [--json]
// Exit code: 0 = passes, 1 = contract errors, 2 = usage or read error.
'use strict';
const fs = require('fs');
const { createResult, finish, parseArgs, usage } = require('./lib/result.js');
const { readZip, xmlDecode } = require('./lib/zip.js');
const { plain, stripComments, splitRow, isSep } = require('./lib/markdown.js');

const norm = s => s.replace(/\s+/g, ' ').trim();

function docxParagraphs(file) {
  const xml = readZip(fs.readFileSync(file))['word/document.xml']();
  return [...xml.matchAll(/<w:p\b[^>]*?(?:\/>|>([\s\S]*?)<\/w:p>)/g)].map(m => {
    const inner = m[1] || '';
    const style = (/<w:pStyle w:val="([^"]+)"/.exec(inner) || [])[1] || '';
    const text = [...inner.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map(t => xmlDecode(t[1])).join('');
    return { style, text };
  });
}

function validateDocx(file, source) {
  const r = createResult('docx render', file);
  let paras, md;
  try { paras = docxParagraphs(file); } catch (e) { r.error('', 'cannot read document: ' + e.message); return r; }
  try { md = stripComments(fs.readFileSync(source, 'utf8').replace(/\r\n?/g, '\n')); } catch (e) { r.error('source', 'cannot read source: ' + e.message); return r; }

  // headings, same order
  const want = [], lines = md.split('\n');
  let inFence = false;
  for (const l of lines) { if (/^```/.test(l)) inFence = !inFence; else if (!inFence && /^#{1,6}\s+/.test(l)) want.push(norm(plain(l.replace(/^#{1,6}\s+/, '')))); }
  const got = paras.filter(p => /^(Title|Heading\d)$/.test(p.style)).map(p => norm(p.text));
  if (got.join('\u0001') !== want.join('\u0001')) {
    const i = want.findIndex((h, k) => got[k] !== h);
    r.error('headings', `heading ${i + 1} differs: source "${want[i] || '(none)'}" vs docx "${got[i] || '(none)'}" (${want.length} vs ${got.length} headings)`);
  }

  // every text line and table cell of the source is in the document
  const all = norm(paras.map(p => p.text).join(' '));
  let missing = 0, checked = 0;
  inFence = false;
  lines.forEach((l, i) => {
    if (/^```/.test(l)) { inFence = !inFence; return; }
    if (!l.trim() || isSep(l) || /^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) return;
    const pieces = !inFence && /^\s*\|/.test(l) ? splitRow(l) : [l];
    for (const piece of pieces) {
      const t = inFence ? norm(piece) : norm(plain(piece.replace(/^\s*(#{1,6}\s+|[-*+]\s+|\d+[.)]\s+|>\s?)/, '')));
      if (!t) continue;
      checked++;
      if (!all.includes(t) && ++missing <= 10) r.error(`source line ${i + 1}`, `text not in the document: "${t.slice(0, 70)}"`);
    }
  });
  if (missing > 10) r.error('text', `${missing - 10} more source lines missing`);
  r.info.headings = got.length;
  r.info.lines_checked = checked;
  return r;
}

module.exports = { validateDocx };

if (require.main === module) {
  const args = parseArgs(process.argv.slice(2), ['json']);
  if (!args._[0] || !args.source) return usage('usage: node validate-docx.js <file.docx> --source <source.md> [--json]');
  finish(validateDocx(args._[0], args.source), args);
}
