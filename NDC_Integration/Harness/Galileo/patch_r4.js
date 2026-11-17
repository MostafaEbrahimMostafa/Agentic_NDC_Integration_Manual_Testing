const fs=require('fs');let s=fs.readFileSync('bugs_gl.js','utf8');
s=s.replace(/module\.exports\.forEach\(b => \{ b\.desc = '\*\*Round 3 status:[^\n]*\n/, "// (Round status prefix is added in bugs_r4.js)\n");
if(!/bugs_r4/.test(s)) s=s.replace("module.exports.push(...require('./bugs_r3'));","module.exports.push(...require('./bugs_r3'));\nrequire('./bugs_r4')(module.exports);");
fs.writeFileSync('bugs_gl.js',s);
let m=fs.readFileSync('make_bugs.js','utf8');
if(!/raw3/.test(m)){
 m=m.replace("raw.sort((a, b) => (a.started_at < b.started_at ? -1 : 1));","raw.sort((a, b) => (a.started_at < b.started_at ? -1 : 1));\nconst raw3 = []; try { const d3 = path.join(__dirname, 'round3', 'raw'); for (const f of fs.readdirSync(d3)) { try { raw3.push(JSON.parse(fs.readFileSync(path.join(d3, f), 'utf8'))); } catch (e) { } } raw3.sort((a, b) => (a.started_at < b.started_at ? -1 : 1)); } catch (e) { }");
 m=m.replace("const m = raw.filter(r => r.tc === c.tc && r.step.includes(c.step) && (!c.has || JSON.stringify(r.response || '').includes(c.has))); const r = c.nth === 'first' ? m[0] : m[m.length - 1];","let m = raw.filter(r => r.tc === c.tc && r.step.includes(c.step) && (!c.has || JSON.stringify(r.response || '').includes(c.has))); let fromR3 = false; if (!m.length) { m = raw3.filter(r => r.tc === c.tc && r.step.includes(c.step) && (!c.has || JSON.stringify(r.response || '').includes(c.has))); fromR3 = m.length > 0; } const r = c.nth === 'first' ? m[0] : m[m.length - 1]; if (r && fromR3) c.label = c.label + '_R3';");
}
fs.writeFileSync('make_bugs.js',m);
console.log(/raw3/.test(m), /bugs_r4/.test(s), /Round status prefix/.test(s));
