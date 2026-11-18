// Small Markdown reader for the DOCX renderer/validator. Covers what the skills write: headings,
// paragraphs, bullet and numbered lists, pipe tables, fenced code, block quotes, rules, and inline
// **bold**, `code` and [text](link). HTML comments are dropped; HTML entities are decoded.
'use strict';

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', middot: '·', mdash: '—', ndash: '–', rarr: '→', larr: '←', hellip: '…', times: '×', check: '✓' };
const decodeEntities = s => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (ENT[e.toLowerCase()] !== undefined ? ENT[e.toLowerCase()] : m));

// inline -> [{ text, bold, code }]
function inline(s) {
  const runs = [];
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0, m;
  const push = (text, o) => { if (text) runs.push(Object.assign({ text: decodeEntities(text) }, o)); };
  while ((m = re.exec(s))) {
    push(s.slice(last, m.index), {});
    if (m[2] !== undefined) push(m[2], { bold: true });
    else if (m[3] !== undefined) runs.push({ text: m[3], code: true });
    else push(m[4], {});
    last = re.lastIndex;
  }
  push(s.slice(last), {});
  return runs;
}
const plain = s => inline(s).map(r => r.text).join('');

const splitRow = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
const isSep = l => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(l);

function stripComments(text) { return text.replace(/<!--[\s\S]*?-->/g, ''); }

// -> blocks: {type:'h',level,text} {type:'p',text} {type:'li',ordered,marker,text,indent}
//            {type:'code',lines} {type:'table',rows} {type:'quote',text} {type:'hr'}
function parseBlocks(text) {
  const lines = stripComments(text.replace(/\r\n?/g, '\n')).split('\n');
  const out = [];
  let para = [];
  const flush = () => { if (para.length) { out.push({ type: 'p', text: para.join(' ') }); para = []; } };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^```/.test(l)) {
      flush();
      const code = [];
      for (i++; i < lines.length && !/^```/.test(lines[i]); i++) code.push(lines[i]);
      out.push({ type: 'code', lines: code });
      continue;
    }
    if (!l.trim()) { flush(); continue; }
    let m;
    if ((m = /^(#{1,6})\s+(.*)$/.exec(l))) { flush(); out.push({ type: 'h', level: m[1].length, text: m[2].trim() }); continue; }
    if (/^\s*\|/.test(l) && i + 1 < lines.length && isSep(lines[i + 1])) {
      flush();
      const rows = [splitRow(l)];
      for (i += 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(splitRow(lines[i]));
      i--;
      out.push({ type: 'table', rows });
      continue;
    }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) { flush(); out.push({ type: 'hr' }); continue; }
    if ((m = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(l))) { flush(); out.push({ type: 'li', ordered: /\d/.test(m[2]), marker: m[2], indent: Math.floor(m[1].length / 2), text: m[3] }); continue; }
    if ((m = /^>\s?(.*)$/.exec(l))) { flush(); out.push({ type: 'quote', text: m[1] }); continue; }
    para.push(l.trim());
  }
  flush();
  return out;
}

module.exports = { parseBlocks, inline, plain, decodeEntities, stripComments, splitRow, isSep };
