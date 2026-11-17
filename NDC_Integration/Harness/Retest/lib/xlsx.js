// Minimal .xlsx reader: first worksheet -> array of rows (array of strings). Node built-ins only
// (zlib for the deflate streams), so the retest runner adds no npm dependency.
const fs = require('fs');
const zlib = require('zlib');

function unzip(buf) {
  // End Of Central Directory record: search backwards for 0x06054b50
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('Not a zip/xlsx file (no end-of-central-directory record)');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const files = {};
  for (let k = 0; k < count; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('Bad zip central directory');
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), xlen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nlen).toString('utf8');
    p += 46 + nlen + xlen + clen;
    const lnlen = buf.readUInt16LE(local + 26), lxlen = buf.readUInt16LE(local + 28);
    const start = local + 30 + lnlen + lxlen;
    const data = buf.slice(start, start + csize);
    files[name] = () => (method === 0 ? data : method === 8 ? zlib.inflateRawSync(data) : (() => { throw new Error('Unsupported zip method ' + method); })()).toString('utf8');
  }
  return files;
}

function decode(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d))).replace(/&amp;/g, '&');
}

const textOf = xml => [...xml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map(m => decode(m[1])).join('');

function colIndex(ref) {
  const letters = /^[A-Z]+/.exec(ref)[0];
  let n = 0; for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function readSheet(file) {
  const files = unzip(fs.readFileSync(file));
  const shared = files['xl/sharedStrings.xml'] ? [...files['xl/sharedStrings.xml']().matchAll(/<si>([\s\S]*?)<\/si>/g)].map(m => textOf(m[1])) : [];
  // first sheet in workbook order
  let sheetPath = 'xl/worksheets/sheet1.xml';
  if (files['xl/workbook.xml'] && files['xl/_rels/workbook.xml.rels']) {
    const wb = files['xl/workbook.xml']();
    const first = /<sheet\b[^>]*\br:id="([^"]+)"/.exec(wb);
    const rels = files['xl/_rels/workbook.xml.rels']();
    if (first) {
      const rel = new RegExp('<Relationship\\b[^>]*Id="' + first[1] + '"[^>]*Target="([^"]+)"').exec(rels) || new RegExp('<Relationship\\b[^>]*Target="([^"]+)"[^>]*Id="' + first[1] + '"').exec(rels);
      if (rel) sheetPath = rel[1].startsWith('/') ? rel[1].slice(1) : 'xl/' + rel[1].replace(/^\.\//, '');
    }
  }
  if (!files[sheetPath]) throw new Error('Worksheet not found in ' + file + ': ' + sheetPath);
  const xml = files[sheetPath]();
  const rows = [];
  for (const r of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const row = [];
    for (const c of r[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attrs = c[1], body = c[2] || '';
      const ref = /\br="([A-Z]+\d+)"/.exec(attrs);
      const idx = ref ? colIndex(ref[1]) : row.length;
      const type = (/\bt="([^"]+)"/.exec(attrs) || [])[1];
      const v = /<v>([\s\S]*?)<\/v>/.exec(body);
      let val = '';
      if (type === 's' && v) val = shared[Number(v[1])] || '';
      else if (type === 'inlineStr') val = textOf(body);
      else if (v) val = decode(v[1]);
      row[idx] = val;
    }
    for (let k = 0; k < row.length; k++) if (row[k] === undefined) row[k] = '';
    rows.push(row);
  }
  return rows;
}

module.exports = { readSheet };
