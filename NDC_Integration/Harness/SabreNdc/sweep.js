process.env.NDC_BASE='https://ndc-integration-stg-ne-7.azurewebsites.net/';
const {call}=require('../V2/lib');const fs=require('fs');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
const EG=['HRG','LXR','SSH','ASW','SPX'], GULF=['DOH','JED','RUH','DMM','MED'];
const routes=[["HRG","DOH"],["LXR","DOH"],["SSH","DOH"],["JED","CAI"],["RUH","CAI"],["DMM","CAI"],["MED","CAI"],["DOH","CAI"],["CAI","LHR"],["CAI","JFK"],["CAI","BKK"],["CAI","DXB"],["CAI","AMM"],["CAI","IST"],["DOH","LHR"],["CAI","KWI"],["CAI","BAH"],["CAI","CMN"],["CAI","NBO"],["CAI","ADD"],["CAI","CDG"],["CAI","FRA"]];
const days=(process.env.DAYS||'30').split(',').map(Number);
(async()=>{const out=[];for(const dy of days)for(const [o,dd] of routes){
 const body={supplier:'SabreNdc',credentialsSelector:'EGY',searchCriteria:[{origin:o,destination:dd,date:d(dy)}],passengers:[{passengerTypeCode:'ADT',count:1}],isDebug:false};
 const h=await call('Availability','api/V2/FlightSearch/Availability',body);const j=h.json||{};let n=0,qr=0,con=0,pages=j.hasMoreResults;const car=new Set();
 if(j.availabilityId){const od=(j.originDestinations||[])[0]||{journeys:[]};for(const jn of od.journeys){n++;const cs=jn.segments.map(s=>(j.flightSegments[s.segmentRefId]||{}).marketingCarrierCode);cs.forEach(c=>car.add(c));if(cs.every(c=>c==='QR'))qr++;if(jn.segments.length>1)con++}}
 const r={route:o+'-'+dd,day:dy,status:h.status,ms:h.ms,journeys:n,qrOnly:qr,connecting:con,more:pages,carriers:[...car].join('/'),err:j.availabilityId?'':(j.ErrorCode||j.errorCode||'')+' '+String(j.ErrorMessage||j.errorMessage||h.text).slice(0,80)};
 out.push(r);console.log(JSON.stringify(r));}
 fs.writeFileSync('sweep_out_'+days.join('_')+'.json',JSON.stringify(out,null,1));})();
