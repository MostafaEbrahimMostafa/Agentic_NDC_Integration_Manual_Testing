const fs=require('fs');let s=fs.readFileSync('bugs_r4.js','utf8');
s=s.replace("'FARECONFIIRM_NP328_taxes_mismatch'.replace('FIIRM', 'FIRM')","'FARECONFIRM_NP328_taxes_mismatch'");
s=s.replace("get('BUG-12').tcs.push('TC-FARECONFIRM-BIZ-01', 'FLOW-V2-GALAVAIL-01');","// in Round 4 flows 03 and 06 ran on MS journeys (which reconcile) and fail for other bugs, so only the two cases that price NE174 carry this bug now\n  get('BUG-12').tcs = ['TC-FARECONFIRM-BIZ-01', 'FLOW-V2-GALAVAIL-01']; get('BUG-12').anchor = 'TC-FARECONFIRM-BIZ-01';");
fs.writeFileSync('bugs_r4.js',s);console.log(/anchor = 'TC-FARECONFIRM-BIZ-01'/.test(s),/NP328_taxes/.test(s));
