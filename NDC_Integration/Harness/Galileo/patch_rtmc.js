const fs=require('fs');
let l=fs.readFileSync('gl.js','utf8');
if(!/CSV4/.test(l)){
  l=l.replace(/const rows = parse\(CSV\)\.concat\(fs\.existsSync\(CSV2\) \? parse\(CSV2\) : \[\]\)\.concat\(fs\.existsSync\(CSV3\) \? parse\(CSV3\) : \[\]\);/,
   'const CSV4 = path.resolve(__dirname, "../../TestCases/Galileo_V2_RoundTrip_MultiCity_TestCases.csv");\nconst rows = parse(CSV).concat(fs.existsSync(CSV2) ? parse(CSV2) : []).concat(fs.existsSync(CSV3) ? parse(CSV3) : []).concat(fs.existsSync(CSV4) ? parse(CSV4) : []);');
}
l=l.replace("const epOf = id => /^TC-CAPCHECK/.test(id)","const epOf = id => /^TC-RTMC-(01|05|07|10)$/.test(id) ? 'Availability' : /^TC-RTMC-04$/.test(id) ? 'NextAvailability' : /^TC-RTMC-03$/.test(id) ? 'SelectAvailability' : /^TC-RTMC/.test(id) ? 'Round trip / multi-city flow' : /^TC-CAPCHECK/.test(id)");
fs.writeFileSync('gl.js',l);
let f=fs.readFileSync('finalize.js','utf8');
f=f.replace("require('./r4notes')(L, G);","require(process.env.NOTES || './r4notes')(L, G);").replace("rs.total_test_cases_planned = G.rows.length;","rs.total_test_cases_planned = +(process.env.TOTAL || G.rows.length);");
fs.writeFileSync('finalize.js',f);
let m=fs.readFileSync('make_bugs.js','utf8'); m=m.replace("require('./bugs_gl')","require(process.env.BUGS || './bugs_gl')"); fs.writeFileSync('make_bugs.js',m);
console.log(/CSV4/.test(l),/RTMC/.test(l),/process\.env\.NOTES/.test(f),/process\.env\.TOTAL/.test(f),/process\.env\.BUGS/.test(m));
