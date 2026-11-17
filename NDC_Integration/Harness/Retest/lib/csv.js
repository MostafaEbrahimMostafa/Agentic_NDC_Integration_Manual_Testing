// RFC 4180 CSV read/write (quoted fields, embedded commas, quotes and newlines). No dependencies.

function parse(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let row = [], field = '', i = 0, q = false;
  while (i < text.length) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i += 2; continue; } q = false; i++; continue; }
      field += c; i++; continue;
    }
    if (c === '"') { q = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => !(r.length === 1 && r[0] === ''));
}

// Returns { header: [...], records: [{col: value}] }
function parseObjects(text) {
  const rows = parse(text);
  if (!rows.length) return { header: [], records: [] };
  const header = rows[0].map(h => h.trim());
  const records = rows.slice(1).map(r => { const o = {}; header.forEach((h, k) => { o[h] = r[k] === undefined ? '' : r[k]; }); return o; });
  return { header, records };
}

function cell(v) {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function stringify(header, records) {
  const lines = [header.map(cell).join(',')];
  for (const r of records) lines.push(header.map(h => cell(r[h])).join(','));
  return lines.join('\r\n') + '\r\n';
}

module.exports = { parse, parseObjects, stringify };
