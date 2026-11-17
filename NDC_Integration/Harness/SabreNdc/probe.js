process.env.NDC_BASE='https://ndc-integration-stg-ne-7.azurewebsites.net/';
const {call}=require('../V2/lib');
const fs=require('fs');
const d=n=>{const x=new Date();x.setUTCHours(0,0,0,0);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().substring(0,10)+'T00:00:00Z'};
(async()=>{
 const [o,dd,days,sup,pa]=[process.argv[2]||'CAI',process.argv[3]||'DOH',+(process.argv[4]||30),process.argv[5]||'SabreNdc',process.argv[6]];
 const body={supplier:sup,credentialsSelector:'EGY',searchCriteria:[{origin:o,destination:dd,date:d(days)}],passengers:[{passengerTypeCode:'ADT',count:1}],isDebug:false};
 if(pa) body.preferredAirlines=pa.split(',');
 const h=await call('Availability','api/V2/FlightSearch/Availability',body);
 console.log(h.status,h.ms+'ms');
 const j=h.json; if(!j){console.log(h.text.slice(0,500));return}
 console.log(Object.keys(j).join(','));
 if(!j.availabilityId){console.log(JSON.stringify(j).slice(0,600));return}
 console.log('more',j.hasMoreResults,'page',j.pageNumber);
 const od=(j.originDestinations||[])[0]; console.log('ODs',(j.originDestinations||[]).length,'journeys',od&&od.journeys.length);
 const fs2=j.flightSegments||{}; const car={}; 
 for(const jn of (od?od.journeys:[])){const s=(jn.segments||[]).map(x=>fs2[x.segmentRefId]);const k=s.map(x=>x&&x.marketingCarrierCode).join('+');car[k]=(car[k]||0)+1}
 console.log(JSON.stringify(car));
 fs.writeFileSync('SabreNdc/raw_probe/p_'+o+dd+'.json',JSON.stringify(j));
})();
