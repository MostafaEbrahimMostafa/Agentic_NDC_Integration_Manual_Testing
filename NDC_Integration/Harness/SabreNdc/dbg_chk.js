process.env.NDC_BASE='https://ndc-integration-stg-ne-7.azurewebsites.net/';
const {call}=require('../V2/lib');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
(async()=>{const h=await call('Availability','api/V2/FlightSearch/Availability',{supplier:'SabreNdc',credentialsSelector:'EGY',searchCriteria:[{origin:'CAI',destination:'JED',date:d(30)}],passengers:[{passengerTypeCode:'ADT',count:1}],isDebug:true});
 console.log(h.status);const j=h.json||{};const t=h.text;
 const pats={password:/password|passwd/i,wsseTag:/wsse:|<com:Password/i,bearer:/bearer /i,apikey:/api[-_]?key/i,username:/\busername\b/i,TargetBranch:/TargetBranch/i,AuthorizedBy:/AuthorizedBy/i,Security:/Security/i};
  {const m=t.match(/<wsse:Password>([^<]*)</);console.log('passwordValueAllAsterisks',!!m&&/^[*]+$/.test(m[1]),'len',m&&m[1].length)}
 for(const[k,re]of Object.entries(pats)){const m=t.match(new RegExp('.{0,50}'+re.source+'.{0,50}','i'));console.log(k,!!m,m?m[0].replace(/[A-Za-z0-9+\/=_-]{24,}/g,'<masked>').replace(/\\"/g,'"'):'')}
 for(const k of ['supplierRequest','supplierResponse'])console.log(k,typeof j[k],String(j[k]).length, String(j[k]).slice(0,120).replace(/[A-Za-z0-9+\/=_-]{24,}/g,'<masked>'));
 const h2=await call('Availability','api/V2/FlightSearch/Availability',{supplier:'SabreNdc',credentialsSelector:'EGY',searchCriteria:[{origin:'CAI',destination:'JED',date:d(30)}],passengers:[{passengerTypeCode:'ADT',count:1}],isDebug:false});
 console.log('isDebug=false keys',Object.keys(h2.json||{}).join(','));
})();
